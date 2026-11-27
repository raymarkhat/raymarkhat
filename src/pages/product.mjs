import { site, money } from '../site.config.mjs';
import { page, esc, productCard, ctaBand, crumbs, icon, tiersFor, waLink, imgSrc } from '../lib/render.mjs';
import { productSchema, breadcrumbSchema, faqSchema } from '../lib/seo.mjs';
import { bySlug, childBySlug, parentBySlug, viewsFor } from '../lib/catalog.mjs';

function metaDescription(p, first, tiers) {
  const last = tiers[tiers.length - 1].price;
  const full = `${p.blurb} ${p.moq} pcs min, $${first.price}–$${last} per piece. Free digital proof, DDP shipping to the U.S.`;
  if (full.length <= 160) return full;
  const short = `${p.blurb} ${p.moq} pcs min. From $${first.price} per piece. Free proof, DDP to the U.S.`;
  if (short.length <= 160) return short;
  return `${short.slice(0, 156).trimEnd()}...`;
}

export function productPage(p) {
  const tiers = tiersFor(p);
  const first = tiers[0];
  const related = p.related.map((s) => bySlug[s]).filter(Boolean);
  const quoteText = `Hi Raymark, I'm interested in the ${p.name} (${p.moq} pcs min). Please send a quote and a digital proof.`;

  const body = `
<div class="wrap" style="padding-top:22px">
  ${crumbs([
    { label: 'Home', href: '/' },
    { label: parentBySlug[p.parent].name, href: `/${p.parent}/` },
    { label: childBySlug[p.cat].name, href: `/${p.parent}/${p.cat}/` },
    { label: p.name },
  ])}</div>

<section class="section--tight" style="padding-top:8px">
  <div class="wrap pdp">
    <div class="gallery">
      <div class="gallery__main">
        <img data-gallery-main src="${imgSrc(p.slug, 'front')}" width="900" height="760" alt="${esc(p.name)} — front view, ${esc(p.colors[0].name)}" fetchpriority="high" />
      </div>
      <div class="gallery__thumbs" role="group" aria-label="Product views">
        ${viewsFor(p)
          .map(
            (v, i) => `<button class="thumb" type="button" data-view="${v}" aria-pressed="${i === 0}">
          <img src="${imgSrc(p.slug, v)}" width="900" height="760" alt="${esc(p.name)} — ${v} view" loading="lazy" />
        </button>`
          )
          .join('')}
      </div>
      <div style="border:1px solid var(--line);border-radius:var(--r-md);padding:16px 18px;background:var(--cream)">
        <span class="mono" style="color:var(--muted)">Lead time &amp; shipping</span>
        <div style="display:grid;gap:7px;margin-top:10px;font-size:.86rem">
          <span>Sample: <strong>5–7 days</strong></span>
          <span>Bulk production: <strong>${site.leadTime}</strong> after proof approval</span>
          <span>DDP air to the U.S.: <strong>8–12 days</strong></span>
        </div>
      </div>
    </div>

    <div class="pdp__body">
      <span class="eyebrow">${esc(p.eyebrow)}</span>
      <h1>${esc(p.name)}</h1>
      <p class="lede" style="max-width:48ch">${esc(p.tagline)}</p>

      <div class="pdp__price">
        <b>$${first.price}</b><span>per piece at ${p.moq}+ · USD, ex-works</span>
      </div>
      <table class="tier-table">
        <thead><tr><th>Quantity</th><th>Per piece</th></tr></thead>
        <tbody>
          ${tiers
            .map(
              (t, i) =>
                `<tr${i === 0 ? ' data-active="true"' : ''}><td>${t.qty === 1000 ? '1,000+' : `${t.qty}${i === tiers.length - 1 && t.qty !== 1000 ? '+' : ''} pcs`}</td><td>$${t.price}</td></tr>`
            )
            .join('')}
        </tbody>
      </table>

      <div class="opt-group">
        <span class="opt-label">Colorway <span class="muted" data-color-name>${esc(p.colors[0].name)}</span></span>
        <div class="swatches" data-opt-color>
          ${p.colors
            .map(
              (c, i) =>
                `<button class="swatch" type="button" aria-pressed="${i === 0}" data-color="${esc(c.name)}"><i style="background:${c.hex}"></i>${esc(c.name)}</button>`
            )
            .join('')}
        </div>
      </div>

      <div class="opt-group">
        <span class="opt-label">Size</span>
        <div class="sizes" data-opt-size>
          ${p.sizes
            .map((s, i) => `<button class="size" type="button" aria-pressed="${i === 0}" data-size="${esc(s)}">${esc(s)}</button>`)
            .join('')}
        </div>
      </div>

      <div class="buybox" data-buybox data-base="${p.price}" data-moq="${p.moq}">
        <div class="buybox__row">
          <div class="qty">
            <button type="button" data-qty="-1" aria-label="Decrease quantity">−</button>
            <input type="number" value="${p.moq}" min="${p.moq}" step="1" inputmode="numeric" aria-label="Quantity" data-qty-input />
            <button type="button" data-qty="1" aria-label="Increase quantity">+</button>
          </div>
          <div class="buybox__total"><b data-total>$${money(p.price * p.moq)}</b><span data-unit>$${first.price} / pc</span></div>
        </div>
        <button class="btn btn--red btn--block mt-2" type="button"
          data-add data-slug="${p.slug}" data-name="${esc(p.name)}" data-image="/assets/img/caps/${p.slug}-front.svg">
          Add to quote request ${icon.cart}
        </button>
        <div class="flex mt-2" style="justify-content:space-between">
          <a class="link-arrow" href="${waLink(quoteText)}" target="_blank" rel="noopener" style="font-size:.82rem">${icon.wa} Ask on WhatsApp</a>
          <a class="link-arrow" href="/contact/" style="font-size:.82rem">Request a proof</a>
        </div>
        <p class="form-note mt-2 mb-0">No payment online. Adding caps builds a quote request you can send by WhatsApp or email.</p>
      </div>

      <div class="notice">
        <span>${icon.check}</span>
        <span><strong>${p.moq} pcs minimum</strong> per colorway, mixed sizes. Bulk in ${site.leadTime} after proof approval, DDP delivery available to the U.S.</span>
      </div>

      <div class="mt-3">
        <h2 style="font-size:1.1rem;margin-bottom:10px">About this cap</h2>
        ${p.intro.map((t) => `<p style="font-size:.95rem;color:var(--ink-soft)">${esc(t)}</p>`).join('')}
      </div>
    </div>
  </div>
</section>

<section class="section section--paper2">
  <div class="wrap">
    <div class="grid g2" style="gap:56px;align-items:start">
      <div>
        <h2 style="font-size:clamp(1.5rem,2.4vw,1.9rem);margin-bottom:22px">Specification</h2>
        <dl class="spec-list">
          ${p.specs.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}
        </dl>
        <h3 class="mt-4" style="font-size:1rem">Decoration options</h3>
        <div class="pill-row mt-1">${p.decoration.map((d) => `<span class="pill">${esc(d)}</span>`).join('')}</div>
      </div>
      <div>
        <h2 style="font-size:clamp(1.5rem,2.4vw,1.9rem);margin-bottom:22px">Why buyers pick it</h2>
        <div class="stack">
          ${p.features
            .map(
              (f) => `<div style="border-top:1px solid var(--line);padding-top:16px">
                <h3 style="font-size:1rem;margin-bottom:5px">${esc(f.title)}</h3>
                <p class="small muted mb-0">${esc(f.text)}</p>
              </div>`
            )
            .join('')}
        </div>
      </div>
    </div>
    <div class="faq">
      <h2 style="font-size:clamp(1.5rem,2.4vw,1.9rem);margin:0 0 8px">${esc(p.name)} questions</h2>
      ${p.faqs.map((f) => `<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join('')}
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="sec-head">
      <div><span class="eyebrow">Pairs well with</span><h2>More caps in this range.</h2></div>
      <a class="link-arrow sec-head__link" href="/shop/all/">All styles ${icon.arrow}</a>
    </div>
    <div class="card-grid card-grid--3">${related.map((r) => productCard(r)).join('')}</div>
  </div>
</section>

${ctaBand()}
`;
  return page({
    url: `/caps/${p.slug}/`,
    title: `${p.name} — $${first.price}/pc at ${p.moq} Pcs | ${site.brand}`,
    description: metaDescription(p, first, tiers),
    active: 'Shop',
    body,
    ogImage: `/assets/img/caps/${p.slug}-front.svg`,
    jsonLd: [
      productSchema(p, childBySlug[p.cat]?.name),
      breadcrumbSchema([{ label: 'Home', href: '/' }, { label: 'Shop', href: '/shop/' }, { label: p.name, href: `/caps/${p.slug}/` }]),
      faqSchema(p.faqs),
    ],
  });
}
