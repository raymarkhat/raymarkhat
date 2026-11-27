import { site, money } from '../site.config.mjs';
import { page, esc, productCard, sectionHead, ctaBand, crumbs, icon, tiersFor, imgSrc } from '../lib/render.mjs';
import { categoryBar } from '../lib/catnav.mjs';
import { collectionSchema, faqSchema, breadcrumbSchema } from '../lib/seo.mjs';
import { products, parents, heroFor, childBySlug } from '../lib/catalog.mjs';

const shopFaqs = [
  {
    q: 'Are the prices on this site final?',
    a: 'They are our standard ex-works prices per piece for one front logo. Freight, duties, extra decoration positions and rush production are quoted separately, and DDP delivery is quoted as one all-in number.',
  },
  {
    q: 'Can I mix styles to reach the minimum?',
    a: 'No. The minimum applies per style and colourway because each one is a separate cutting and embroidery setup. You can mix sizes freely inside it.',
  },
  {
    q: 'Do you take payment on the website?',
    a: 'No. Every order starts with a quote. Approved quotes are paid by T/T or Alibaba Trade Assurance, with PayPal accepted for samples.',
  },
  {
    q: 'Which category should I start with?',
    a: 'If you are testing a logo, start with Baseball Caps or Custom Hat. If you sell into outdoor retail, Bucket Hats convert best. If you need a fast stock colourway, Brand Section ships in 7–10 days.',
  },
];

const catUrl = (p) => `/${p.slug}/`;
const allUrl = (cat) => (cat ? `/shop/all/?cat=${cat}` : '/shop/all/');

function catTile(parent, imgSlug, meta, text) {
  return `<a class="cat-tile" href="${catUrl(parent)}">
    <div class="cat-tile__media"><img src="${imgSrc(imgSlug, 'front')}" width="900" height="760" alt="" loading="lazy" /></div>
    <div class="cat-tile__body">
      <span class="cat-tile__meta">${esc(meta)}</span>
      <h3>${esc(parent.name)}</h3>
      <p>${esc(text)}</p>
      <span class="cat-tile__go">Browse ${esc(parent.name)} ${icon.arrow}</span>
    </div>
  </a>`;
}

/* --------------------------------------------------- /shop/ — category index */
export function shopIndexPage() {
  const body = `
<section class="phero">
  <div class="wrap">
    ${crumbs([{ label: 'Home', href: '/' }, { label: 'Shop' }])}
    <h1>Shop by<br />category.</h1>
    <p class="lede">Seven categories, ${products.length} styles. Pick a category to see its shapes, then a shape to see prices and specs. Every price is USD per piece and includes one front logo.</p>
    <div class="flex mt-3">
      <a class="btn btn--red" href="${allUrl()}">See all ${products.length} styles ${icon.arrow}</a>
      <span class="pill">${icon.check} No online payment</span>
      <span class="pill">MOQ 25–50</span>
    </div>
  </div>
</section>

${categoryBar()}

<section class="section">
  <div class="wrap">
    <div class="cat-tiles">
      ${parents
        .map((p) => {
          const list = products.filter((x) => x.parent === p.slug);
          const meta = list.length
            ? `${p.children.length} sub-categories · ${list.length} styles`
            : `${p.children.length} custom programs`;
          return catTile(p, heroFor(p.slug).slug, meta, p.short);
        })
        .join('')}
    </div>
  </div>
</section>

<section class="section--tight">
  <div class="wrap">
    <div class="grid g2" style="gap:24px">
      <a class="tile" href="${allUrl('baseball-caps')}">
        <div class="tile__body">
          <span class="mono" style="color:var(--red)">Flat view</span>
          <h3>All ${products.length} styles<br />in one grid.</h3>
          <p class="muted small">Prefer to scan everything at once? The full catalogue has every SKU with a category filter and a price sort.</p>
          <span class="link-arrow">Open the full catalogue ${icon.arrow}</span>
        </div>
        <div class="tile__media"><img src="/assets/img/caps/${heroFor('baseball-caps').slug}-front.svg" width="900" height="760" alt="" loading="lazy" /></div>
      </a>
      <a class="tile tile--ink" href="/custom-hat/">
        <div class="tile__body">
          <span class="mono" style="color:var(--gold)">Custom program</span>
          <h3>Your logo on<br />any shape.</h3>
          <p class="small" style="color:#c9c3b4">Seven custom programs — caps, dad hats, truckers, buckets, golf, kids and special shapes. 50 pcs minimum.</p>
          <span class="link-arrow">Start a custom order ${icon.arrow}</span>
        </div>
        <div class="tile__media"><img src="/assets/img/caps/${heroFor('custom-hat').slug}-front.svg" width="900" height="760" alt="" loading="lazy" /></div>
      </a>
    </div>
  </div>
</section>

<section class="section section--paper2">
  <div class="wrap">
    <div class="grid g2" style="gap:56px;align-items:start">
      <div>
        ${sectionHead({ eyebrow: 'Pricing', title: 'How the tiers work.' })}
        <p>Every style has four price breaks. The price on a product page is the price at its minimum order quantity; the per-piece cost falls as the order grows because the setup and cutting are amortised over more pieces.</p>
        <table class="data mt-3" style="background:var(--cream);border:1px solid var(--line);border-radius:8px;overflow:hidden">
          <thead><tr><th>Order size</th><th>Typical band</th><th>Best for</th></tr></thead>
          <tbody>
            <tr><td>25–49 pcs</td><td>$${money(7.4)}–$${money(14.5)}</td><td>Stock colourways, single event</td></tr>
            <tr><td>50–99 pcs</td><td>$4.90–$16.00</td><td>Testing a shape or colourway</td></tr>
            <tr><td>100–499 pcs</td><td>$4.65–$15.20</td><td>Seasonal drop, team program</td></tr>
            <tr><td>500+ pcs</td><td>$3.80–$12.50</td><td>Distributor stock, private label</td></tr>
          </tbody>
        </table>
        <p class="small muted mt-2">Bands reflect the current catalogue at one front logo in up to 12 thread colours. Extra decoration positions add roughly $0.35–$0.60 each.</p>
      </div>
      <div>
        ${sectionHead({ eyebrow: 'Included', title: 'What the price covers.' })}
        <ul class="checklist">
          <li>One front logo, flat or 3D puff, up to 12 thread colours</li>
          <li>Digital proof and one revision round</li>
          <li>Pre-production photo of your actual hat before bulk</li>
          <li>Individual poly bag and export carton</li>
          <li>Carton photos and packing list before balance payment</li>
        </ul>
        <h3 class="mt-4" style="font-size:1.05rem">Not included</h3>
        <p class="small muted">Freight and duties, additional decoration positions, custom interior taping, hang tags and retail packaging, rush production under 10 days.</p>
        <a class="btn btn--red mt-2" href="/contact/">Price my order ${icon.arrow}</a>
      </div>
    </div>
    <div class="faq" style="margin-top:56px">
      ${shopFaqs.map((f) => `<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join('')}
    </div>
  </div>
</section>

${ctaBand({ title: 'Not sure which shape<br />fits your logo?', text: 'Send the artwork. We will tell you which crown, fabric and decoration method reproduce it cleanly — and price two options so you can compare.' })}
`;
  return page({
    url: '/shop/',
    title: `Shop by Category — 7 Categories, ${products.length} Hat Styles | ${site.brand}`,
    description:
      'Browse by category: baseball caps, sport and outdoor, bucket hats, fashion hats, kids, brand colourways and the custom program. Live USD pricing from 25–50 pcs.',
    active: 'Shop',
    body,
    jsonLd: [
      collectionSchema(
        'Shop by category',
        parents.map((p) => ({ name: p.name, url: catUrl(p) })),
        '/shop/'
      ),
      breadcrumbSchema([{ label: 'Home', href: '/' }, { label: 'Shop', href: '/shop/' }]),
      faqSchema(shopFaqs),
    ],
  });
}

/* --------------------------------------- /shop/all/ — flat catalogue + filters */
const cardAttrs = (p) =>
  `data-shop-item data-cat="${p.parent}" data-price="${tiersFor(p)[0].price}" data-moq="${p.moq}" data-name="${esc(
    p.name.toLowerCase()
  )}"`;

export function allProductsPage() {
  const body = `
<section class="phero">
  <div class="wrap">
    ${crumbs([{ label: 'Home', href: '/' }, { label: 'Shop', href: '/shop/' }, { label: 'All styles' }])}
    <h1>All ${products.length} styles.</h1>
    <p class="lede">Every SKU in one grid — filter by category, sort by price. Each card shows the entry price at its minimum order quantity.</p>
    <div class="flex mt-3">
      <span class="pill pill--ink">${products.length} styles</span>
      <span class="pill">7 categories</span>
      <span class="pill">MOQ 25–50</span>
      <span class="pill">Free digital proof</span>
    </div>
  </div>
</section>

<div class="wrap">
  <div class="shop-bar" data-shop-bar>
    <div class="filters" role="group" aria-label="Filter by category">
      <button class="chip" type="button" data-filter="all" aria-pressed="true">All</button>
      ${parents
        .map(
          (p) =>
            `<button class="chip" type="button" data-filter="${p.slug}" aria-pressed="false">${esc(p.name)}</button>`
        )
        .join('')}
    </div>
    <div class="shop-bar__side">
      <span class="shop-count"><span data-shop-count>${products.length}</span> styles</span>
      <label class="sr-only" for="sort">Sort products</label>
      <select id="sort" class="chip" data-sort style="padding:8px 12px;border-radius:999px">
        <option value="featured">Featured</option>
        <option value="price-asc">Price: low to high</option>
        <option value="price-desc">Price: high to low</option>
        <option value="moq">Lowest MOQ</option>
      </select>
    </div>
  </div>
</div>

<section class="section--tight" style="padding-top:28px">
  <div class="wrap">
    <div class="card-grid" data-shop-grid>
      ${products.map((p) => productCard(p, { attrs: cardAttrs(p) })).join('\n')}
    </div>
    <p class="small muted mt-3" data-shop-empty hidden>Nothing in that category. <button class="cart-remove" type="button" data-filter="all">Show all</button></p>
  </div>
</section>

${ctaBand({ title: 'Found a shape?<br />Send the logo.', text: 'A quote takes 24 hours and costs nothing. Include quantity, colourway and your deadline and you get a priced mockup back — not a catalogue PDF.' })}
`;
  return page({
    url: '/shop/all/',
    title: `All Hat Styles — ${products.length} SKUs, USD Pricing | ${site.brand}`,
    description:
      'The full catalogue in one grid: 52 hat styles with category filters and live USD pricing from 25–50 pcs. Baseball caps, bucket hats, golf caps, kids hats and more.',
    active: 'Shop',
    body,
    jsonLd: [
      collectionSchema(
        'All styles',
        products.map((p) => ({ name: p.name, url: `/caps/${p.slug}/` })),
        '/shop/all/'
      ),
      breadcrumbSchema([
        { label: 'Home', href: '/' },
        { label: 'Shop', href: '/shop/' },
        { label: 'All styles', href: '/shop/all/' },
      ]),
    ],
  });
}
