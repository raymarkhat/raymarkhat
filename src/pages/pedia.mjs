import { site } from '../site.config.mjs';
import { page, esc, ctaBand, crumbs, icon, productCard, waLink } from '../lib/render.mjs';
import { collectionSchema, articleSchema, breadcrumbSchema, faqSchema } from '../lib/seo.mjs';
import { renderSections, inline } from '../lib/blocks.mjs';
import { products } from '../data/products.mjs';

const catOrder = ['Ordering', 'Sizing & Fit', 'Decoration', 'Construction', 'Materials', 'Logistics', 'Care'];

export function pediaIndexPage(articles) {
  const byCat = {};
  for (const a of articles) (byCat[a.category] ||= []).push(a);
  const cats = catOrder.filter((c) => byCat[c]);

  const body = `
<section class="phero">
  <div class="wrap">
    ${crumbs([{ label: 'Home', href: '/' }, { label: 'Pedia' }])}
    <h1>The cap pedia.</h1>
    <p class="lede">Nine reference pages written for people who have to buy headwear and defend the decision: sizes, thread counts, MOQ math, freight, care. No fluff, no "contact us for details".</p>
    <div class="flex mt-3">
      ${cats.map((c) => `<span class="pill">${esc(c)}</span>`).join('')}
    </div>
  </div>
</section>

<section class="section--tight">
  <div class="wrap">
    <div class="grid g3">
      ${articles
        .map(
          (a) => `<a class="art-card" href="/pedia/${a.slug}/">
            <span class="art-card__cat">${esc(a.category)}</span>
            <h3>${esc(a.title)}</h3>
            <p>${esc(a.tldr[0])}</p>
            <span class="art-card__meta"><span>${a.readMinutes} min read</span><span>Updated ${esc(a.updated)}</span></span>
          </a>`
        )
        .join('')}
    </div>
  </div>
</section>

<section class="section section--paper2">
  <div class="wrap">
    <div class="grid g2" style="gap:56px">
      <div>
        <span class="eyebrow">How we write</span>
        <h2 style="margin-bottom:16px">Numbers, not adjectives.</h2>
        <p>Every page here is maintained by the Raymark product team in Heze, Shandong. Where a figure is a standard we publish our own, we give it — MOQ 10 pcs, samples 5–7 days, bulk 12–18. Where a figure depends on your order (freight, duty, decoration upcharges) we say so and tell you what to ask for.</p>
        <p class="muted">If a page is out of date, tell us and we will fix it. That is cheaper for us than answering the same email twice.</p>
        <a class="btn btn--outline mt-2" href="/contact/">Ask a question ${icon.arrow}</a>
      </div>
      <div>
        <div class="facts">
          <div class="fact"><b>50</b><span>pcs MOQ</span></div>
          <div class="fact"><b>12</b><span>thread colors</span></div>
          <div class="fact"><b>12–18</b><span>day bulk</span></div>
          <div class="fact"><b>5–7</b><span>day samples</span></div>
        </div>
        <div class="notice mt-3">
          <span>${icon.check}</span>
          <span>Written from our own production data — not scraped from a supplier directory.</span>
        </div>
      </div>
    </div>
  </div>
</section>

${ctaBand({ title: 'Read enough?<br />Send the logo.', text: 'A quote takes 24 hours and costs nothing. Include your quantity, colorway and deadline and you will get a priced mockup back — not a catalog PDF.' })}
`;

  return page({
    url: '/pedia/',
    title: `Cap Pedia: Sizing, MOQ, Embroidery & Shipping Guides | ${site.brand}`,
    description:
      'Reference guides for buying baseball caps: size charts, MOQ and pricing math, embroidery vs print, fabric weights, artwork prep, U.S. shipping and care.',
    active: 'Pedia',
    body,
    jsonLd: [
      collectionSchema('Raymark Cap Pedia', articles.map((a) => ({ name: a.title, url: `/pedia/${a.slug}/` })), '/pedia/'),
      breadcrumbSchema([{ label: 'Home', href: '/' }, { label: 'Pedia', href: '/pedia/' }]),
    ],
  });
}

export function articlePage(a, all) {
  const words = countWords(a);
  const relatedArticles = a.related.map((s) => all.find((x) => x.slug === s)).filter(Boolean).slice(0, 3);
  const relatedProducts = products.filter((p) => a.related.includes(p.slug)).slice(0, 2);
  const fallbackProducts = relatedProducts.length ? relatedProducts : products.slice(0, 2);

  const body = `
<article class="section--tight">
  <div class="wrap">
    ${crumbs([{ label: 'Home', href: '/' }, { label: 'Pedia', href: '/pedia/' }, { label: a.category }])}
    <div class="article">
      <div>
        <span class="eyebrow">${esc(a.category)}</span>
        <h1 style="font-size:clamp(1.9rem,3.6vw,2.9rem);max-width:24ch">${esc(a.h1)}</h1>
        <div class="meta-line mt-2">
          <span>Updated ${esc(a.updated)}</span>
          <span>${a.readMinutes} min read</span>
          <span>${words} words</span>
          <span>Raymark product team</span>
        </div>

        <div class="tldr">
          <h2>Short answer</h2>
          <ul>${a.tldr.map((t) => `<li>${inline(t)}</li>`).join('')}</ul>
        </div>

        <div class="prose">
          <p class="lede">${inline(a.intro)}</p>
          ${a.keyFacts?.length ? `<div class="facts" style="margin:26px 0 34px">${a.keyFacts.slice(0, 4).map((k) => `<div class="fact"><b>${inline(k.value)}</b><span>${inline(k.label)}</span></div>`).join('')}</div>` : ''}
          ${renderSections(a)}

          ${a.faqs?.length ? `<div class="faq"><h2 style="margin-top:44px">Frequently asked</h2>${a.faqs.map((f) => `<details><summary>${inline(f.q)}</summary><p>${inline(f.a)}</p></details>`).join('')}</div>` : ''}

          <div class="callout callout--note" style="margin-top:36px">
            <span class="callout__title">About this page</span>
            Written and maintained by the Raymark product team in ${esc(site.city)}, ${esc(site.region)}, based on our own production and shipping data. Correct as of ${esc(a.updated)}. Questions, corrections or a quote: <a href="/contact/">contact the team</a> or WhatsApp ${esc(site.phoneDisplay)}.
          </div>
        </div>
      </div>

      <aside class="aside">
        <div class="aside-card" style="background:var(--ink);color:var(--cream);border-color:var(--ink)">
          <h3 style="color:#fff">Need a price?</h3>
          <p class="small" style="color:#c9c3b4">Send a logo and a quantity. You get a priced mockup in 24 hours, MOQ 10 pcs.</p>
          <a class="btn btn--red btn--sm btn--block" href="/contact/">Get a quote</a>
          <a class="btn btn--ghost btn--sm btn--block mt-1" style="--fg:#f7f2e6;--bd:#4a545c" href="${waLink('Hi Raymark, I read your pedia article and have a question.')}" target="_blank" rel="noopener">${icon.wa} WhatsApp</a>
        </div>
        <div class="aside-card">
          <h3>In this guide</h3>
          <ul style="list-style:none;padding:0;display:grid;gap:8px;font-size:.86rem">
            ${a.sections.map((s) => `<li><a href="#${slugifyHref(s.h2)}" style="text-decoration:none">${esc(s.h2)}</a></li>`).join('')}
          </ul>
        </div>
        ${relatedArticles.length ? `<div class="aside-card"><h3>Keep reading</h3><ul style="list-style:none;padding:0;display:grid;gap:9px;font-size:.86rem">${relatedArticles.map((r) => `<li><a href="/pedia/${r.slug}/" style="text-decoration:none">${esc(r.title)}</a></li>`).join('')}</ul></div>` : ''}
      </aside>
    </div>
  </div>
</article>

<section class="section section--paper2">
  <div class="wrap">
    <div class="sec-head">
      <div><span class="eyebrow">Shop</span><h2>Caps referenced in this guide.</h2></div>
      <a class="link-arrow sec-head__link" href="/shop/all/">All styles ${icon.arrow}</a>
    </div>
    <div class="card-grid card-grid--3">${fallbackProducts.map((p) => productCard(p)).join('')}</div>
  </div>
</section>

${ctaBand()}
`;

  return page({
    url: `/pedia/${a.slug}/`,
    title: a.title,
    description: a.description,
    active: 'Pedia',
    body,
    jsonLd: [
      articleSchema({ ...a, wordCount: words }, `/pedia/${a.slug}/`),
      breadcrumbSchema([{ label: 'Home', href: '/' }, { label: 'Pedia', href: '/pedia/' }, { label: a.category, href: '/pedia/' }]),
      a.faqs?.length ? faqSchema(a.faqs) : null,
    ],
  });
}

const slugifyHref = (s) =>
  String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60);

function countWords(a) {
  let text = [a.intro, ...a.sections.flatMap((s) => s.blocks.flatMap(blockText))].join(' ');
  return text.split(/\s+/).filter(Boolean).length;
}
function blockText(b) {
  if (b.text) return [b.text];
  if (b.items) return b.items.map((i) => (typeof i === 'string' ? i : `${i.title} ${i.text || ''}`));
  if (b.rows) return b.rows.flat();
  return [];
}
