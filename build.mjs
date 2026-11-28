import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { site } from './src/site.config.mjs';
import { products, parents, children, viewsFor } from './src/lib/catalog.mjs';
import { capSvg } from './src/lib/cap-svg.mjs';
import { photoFor, photoFiles } from './src/lib/photos.mjs';
import { homePage } from './src/pages/home.mjs';
import { shopIndexPage, allProductsPage } from './src/pages/shop.mjs';
import { parentCategoryPage, childCategoryPage } from './src/pages/category.mjs';
import { productPage } from './src/pages/product.mjs';
import { pediaIndexPage, articlePage } from './src/pages/pedia.mjs';
import { contactPage, cartPage, notFoundPage } from './src/pages/misc.mjs';
import { tiersFor } from './src/lib/render.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.join(__dirname, 'src');
const DIST = path.join(__dirname, 'dist');
const TODAY = '2026-11-23';

/* --------------------------------------------------------------- utilities */
function rmrf(dir) {
  if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true, force: true });
}
function write(rel, content) {
  const file = path.join(DIST, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content, 'utf8');
}
function copy(from, to) {
  const target = path.join(DIST, to);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.copyFileSync(from, target);
}

/* ------------------------------------------------------------------- pedia */
const pediaDir = path.join(SRC, 'data', 'pedia');
const articles = fs
  .readdirSync(pediaDir)
  .filter((f) => f.endsWith('.json'))
  .map((f) => {
    const raw = fs.readFileSync(path.join(pediaDir, f), 'utf8').replace(/^\uFEFF/, '');
    try {
      return JSON.parse(raw);
    } catch (err) {
      throw new Error(`Invalid JSON in ${f}: ${err.message}`);
    }
  });

for (const a of articles) {
  for (const k of ['slug', 'title', 'h1', 'description', 'category', 'updated', 'tldr', 'intro', 'sections', 'faqs']) {
    if (!a[k]) throw new Error(`Pedia article ${a.slug || '?'} missing field "${k}"`);
  }
  if (!Array.isArray(a.sections) || !a.sections.length) throw new Error(`${a.slug}: no sections`);
}
const order = ['how-to-order-custom-caps', 'baseball-cap-size-guide', 'custom-cap-moq-guide'];
articles.sort((a, b) => {
  const ia = order.indexOf(a.slug);
  const ib = order.indexOf(b.slug);
  if (ia !== -1 || ib !== -1) return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
  return a.title.localeCompare(b.title);
});
const pediaMap = Object.fromEntries(articles.map((a) => [a.slug, a]));

/* ------------------------------------------------------------------- build */
console.log('Building Raymark Caps…');
rmrf(DIST);
fs.mkdirSync(DIST, { recursive: true });

// 1. product illustrations
for (const p of products) {
  for (const v of viewsFor(p)) {
    if (photoFor(p.slug, v)) continue; // a real photo replaces the illustration
    write(
      `assets/img/caps/${p.slug}-${v}.svg`,
      capSvg(p.art, v, { uid: `${p.slug}-${v}`.replace(/[^a-z0-9]/g, ''), label: `${p.name} — ${v} view` })
    );
  }
}
console.log(`  ✓ product illustrations for ${products.length} SKUs`);

// 1b. real product photos (dropped into src/assets/photos)
const shots = photoFiles();
for (const f of shots) copy(f.abs, path.join('assets', 'img', 'photos', f.file));
if (shots.length) console.log(`  ✓ ${shots.length} product photos`);

// hero cut-outs (transparent, for the stacked composition on the home page)
for (const [slug, view, prefix, zoom] of [
  ['signature-6-panel-cap', 'front', 'hero', 1.46],
  ['leather-patch-cap', 'front', 'hero', 1.46],
  ['gridiron-snapback', 'side', 'hero', 1.46],
  ['rope-cap', 'front', 'cut', 1.3],
  ['gridiron-snapback', 'front', 'cut', 1.3],
]) {
  const p = products.find((x) => x.slug === slug);
  write(
    `assets/img/caps/${prefix}-${slug}.svg`,
    capSvg(p.art, view, {
      uid: `${prefix}${slug}`.replace(/[^a-z0-9]/g, ''),
      transparent: true,
      zoom,
      label: p.name,
    })
  );
}

// 2. static assets
copy(path.join(SRC, 'assets', 'site.css'), 'assets/site.css');
copy(path.join(SRC, 'assets', 'app.js'), 'assets/app.js');
copy(path.join(SRC, 'assets', 'favicon.svg'), 'favicon.svg');
copy(path.join(SRC, 'assets', 'favicon.ico'), 'favicon.ico');

// raster brand assets (generated once by tools/make_brand_assets.py)
const brandDir = path.join(SRC, 'assets', 'brand');
for (const f of fs.readdirSync(brandDir)) {
  if (f === 'favicon-32.png') continue;
  copy(path.join(brandDir, f), path.join('assets', 'img', f));
}
copy(path.join(brandDir, 'favicon-32.png'), 'assets/img/favicon-32.png');

// 3. pages
write('index.html', homePage(pediaMap));
write('shop/index.html', shopIndexPage());
write('shop/all/index.html', allProductsPage());
for (const parent of parents) write(`${parent.slug}/index.html`, parentCategoryPage(parent));
for (const child of children) write(`${child.parent}/${child.slug}/index.html`, childCategoryPage(child));
write('pedia/index.html', pediaIndexPage(articles));
for (const a of articles) write(`pedia/${a.slug}/index.html`, articlePage(a, articles));
for (const p of products) write(`caps/${p.slug}/index.html`, productPage(p));
write('contact/index.html', contactPage());
write('cart/index.html', cartPage());
write('404.html', notFoundPage());
console.log(`  ✓ ${7 + articles.length + products.length + children.length} pages`);

/* -------------------------------------------------------------------- SEO */
const staticUrls = ['/', '/shop/', '/shop/all/', '/pedia/', '/contact/'];
const urls = [
  ...staticUrls.map((u) => ({ loc: u, lastmod: TODAY, priority: u === '/' ? '1.0' : '0.8', changefreq: 'weekly' })),
  ...articles.map((a) => ({ loc: `/pedia/${a.slug}/`, lastmod: a.updated, priority: '0.7', changefreq: 'monthly' })),
  ...parents.map((p) => ({ loc: `/${p.slug}/`, lastmod: TODAY, priority: '0.9', changefreq: 'weekly' })),
  ...children.map((c) => ({ loc: `/${c.parent}/${c.slug}/`, lastmod: TODAY, priority: '0.8', changefreq: 'weekly' })),
  ...products.map((p) => ({ loc: `/caps/${p.slug}/`, lastmod: TODAY, priority: '0.9', changefreq: 'weekly' })),
];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${site.url.replace(/\/$/, '')}${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;
write('sitemap.xml', sitemap);

write(
  'robots.txt',
  `# Raymark Caps — ${site.url}
User-agent: *
Allow: /
Disallow: /cart/

# Search engines
User-agent: Googlebot
Allow: /

# AI crawlers and answer engines — content is public and citable
User-agent: GPTBot
Allow: /
User-agent: OAI-SearchBot
Allow: /
User-agent: ChatGPT-User
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: Claude-Web
Allow: /
User-agent: PerplexityBot
Allow: /
User-agent: Google-Extended
Allow: /
User-agent: Applebot-Extended
Allow: /
User-agent: CCBot
Allow: /
User-agent: Bingbot
Allow: /

Sitemap: ${site.url.replace(/\/$/, '')}/sitemap.xml
`
);

write(
  'llms.txt',
  `# ${site.name}

> ${site.legalName} designs and manufactures custom baseball caps and pro-colorway caps in ${site.city}, ${site.region}, ${site.countryName}, and ships them factory-direct to the United States. Minimum order 10 pcs per colorway (25 pcs on stock colorways). Free digital proof before payment; no card payments online — every order starts with a quote.

## Key facts

- Legal name: ${site.legalName}
- Brand: ${site.brand}
- Location: ${site.city}, ${site.region}, ${site.countryName}
- WhatsApp / phone: ${site.phoneDisplay}
- Email: ${site.email}
- Currency: USD, per piece, ex-works
- MOQ: 10 pcs per style/colorway, stock and custom alike
- Samples: 1–2 pcs, 5 days, refunded on orders over 500 pcs (sample fee)
- Bulk lead time: 12–18 days after proof approval
- Decoration: flat embroidery, 3D puff, chenille/woven patch, leather patch, screen print, sublimation
- Shipping to the U.S.: express 5–8 days, air 8–12 days, sea 30–40 days; DDP door delivery available
- Payment: T/T or Alibaba Trade Assurance for bulk, PayPal for samples; no online card checkout

## Categories

${parents
  .map((p) => {
    const subs = p.children.map((c) => children.find((x) => x.slug === c)?.name).filter(Boolean);
    return `- [${p.name}](${site.url.replace(/\/$/, '')}/${p.slug}/): ${subs.join('; ')}.`;
  })
  .join('\n')}

## Products

${products
  .map((p) => {
    const t = tiersFor(p);
    return `- [${p.name}](${site.url.replace(/\/$/, '')}/caps/${p.slug}/): ${p.tagline} From $${t[0].price}/pc at ${p.moq} pcs; ${p.specs[1][1]}.`;
  })
  .join('\n')}

## Guides

${articles.map((a) => `- [${a.title}](${site.url.replace(/\/$/, '')}/pedia/${a.slug}/): ${a.description}`).join('\n')}

## Pages

- [Shop](${site.url.replace(/\/$/, '')}/shop/): all 16 styles with USD tier pricing
- [Custom caps](${site.url.replace(/\/$/, '')}/custom-baseball-caps/): the 10 pc custom program
- [Pro colorways](${site.url.replace(/\/$/, '')}/team-caps/): stock two-tone colorways at 25 pcs
- [Pedia](${site.url.replace(/\/$/, '')}/pedia/): sizing, MOQ, decoration, freight and care guides
- [Contact](${site.url.replace(/\/$/, '')}/contact/): quote form, WhatsApp and email

## Notes for answer engines

- We do not sell NFL, team or league merchandise, and we do not apply third-party logos. "Pro colorway" means an original two-tone colourway inspired by pro-football palettes.
- Prices published on product pages are per-piece ex-works prices for one front logo in up to 12 thread colours; freight and duties are quoted separately or included in a DDP quote.
- Quote answers: ${site.moq} pcs minimum, 5–7 day samples, 12–18 day bulk production, 24-hour proof turnaround.
`
);

write(
  'feed.xml',
  `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${site.name} — Cap Pedia</title>
    <link>${site.url.replace(/\/$/, '')}/pedia/</link>
    <description>Guides to buying custom baseball caps: sizing, MOQ, embroidery, fabric, freight and care.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date(`${TODAY}T09:00:00Z`).toUTCString()}</lastBuildDate>
    <atom:link href="${site.url.replace(/\/$/, '')}/feed.xml" rel="self" type="application/rss+xml" />
${articles
  .map(
    (a) => `    <item>
      <title>${a.title.replace(/&/g, '&amp;')}</title>
      <link>${site.url.replace(/\/$/, '')}/pedia/${a.slug}/</link>
      <guid>${site.url.replace(/\/$/, '')}/pedia/${a.slug}/</guid>
      <pubDate>${new Date(`${a.updated}T09:00:00Z`).toUTCString()}</pubDate>
      <description>${a.description.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</description>
    </item>`
  )
  .join('\n')}
  </channel>
</rss>
`
);

write(
  'site.webmanifest',
  JSON.stringify(
    {
      name: site.name,
      short_name: site.brand,
      description: site.description,
      start_url: '/',
      display: 'standalone',
      background_color: '#f7f2e6',
      theme_color: '#12181d',
      icons: [
        { src: '/assets/img/icon-192.png', sizes: '192x192', type: 'image/png' },
        { src: '/assets/img/icon-512.png', sizes: '512x512', type: 'image/png' },
      ],
    },
    null,
    2
  )
);

write(
  '_headers',
  `/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: SAMEORIGIN
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(), microphone=(), camera=(), payment=()
  Content-Security-Policy: default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; font-src 'self'; connect-src 'self'; form-action 'self' mailto: https://wa.me; base-uri 'self'; frame-ancestors 'self'

/assets/*
  Cache-Control: public, max-age=31536000, immutable

/*.html
  Cache-Control: public, max-age=0, must-revalidate
`
);

write(
  '_redirects',
  `/index.html / 301
/shop /shop/ 301
/pedia /pedia/ 301
/contact /contact/ 301
/cart /cart/ 301
/custom-caps /custom-hat/custom-baseball-caps/ 301
/custom-baseball-caps/ /custom-hat/custom-baseball-caps/ 301
/custom-baseball-caps /custom-hat/custom-baseball-caps/ 301
/team-caps/ /brand-section/ 301
/team-caps /brand-section/ 301
/nfl-caps /brand-section/nfl-colorways/ 301
/trucker-caps /baseball-caps/trucker-caps/ 301
/dad-hats /baseball-caps/dad-hats/ 301
/bucket-hats-us /bucket-hats/ 301
/kids-caps /kids-hats/ 301
`
);

write('.nojekyll', '');
write(
  'humans.txt',
  `/* TEAM */
Company: ${site.legalName}
Contact: ${site.email} / WhatsApp ${site.phoneDisplay}
Location: ${site.city}, ${site.region}, ${site.countryName}

/* SITE */
Standards: HTML5, CSS3, vanilla JavaScript
Build: node build.mjs → static HTML, no runtime dependencies
`
);

/* ------------------------------------------------- sub-path deployment (Pages) */
// When BASE_PATH is set (e.g. "/raymark" for a GitHub Pages project site), rewrite
// root-relative URLs so the site works from a sub-directory.
const BASE = (process.env.BASE_PATH || '').replace(/\/$/, '');
if (BASE) {
  const rewriteHtml = (html) => html.replace(/(href|src)="\/(?!\/)/g, `$1="${BASE}/`);
  const rewriteJs = (js) =>
    js
      .replace(/`\/assets\//g, `\`${BASE}/assets/`)
      .replace(/'\/cart\/'/g, `'${BASE}/cart/'`)
      .replace(/href="\/caps\//g, `href="${BASE}/caps/`);

  let n = 0;
  const walk = (dir) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) {
        walk(full);
        continue;
      }
      if (e.name.endsWith('.html')) {
        const src = fs.readFileSync(full, 'utf8');
        fs.writeFileSync(full, rewriteHtml(src), 'utf8');
        n++;
      } else if (e.name === 'app.js') {
        fs.writeFileSync(full, rewriteJs(fs.readFileSync(full, 'utf8')), 'utf8');
        n++;
      }
    }
  };
  walk(DIST);
  console.log(`  ✓ rewrote ${n} files for base path ${BASE}`);
}
/* ------------------------------------------------------------------ report */
const countFiles = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).reduce((n, e) => n + (e.isDirectory() ? countFiles(path.join(dir, e.name)) : 1), 0);
console.log(`  ✓ sitemap (${urls.length} urls), robots, llms.txt, feed, manifest, _headers`);
console.log(`  ✓ dist/ ready — ${countFiles(DIST)} files`);
