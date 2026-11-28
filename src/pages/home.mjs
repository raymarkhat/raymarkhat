import { site, money } from '../site.config.mjs';
import { page, esc, productCard, sectionHead, ctaBand, trustRow, icon, waLink } from '../lib/render.mjs';
import { orgSchema, websiteSchema, faqSchema, collectionSchema } from '../lib/seo.mjs';
import { products, parents, heroFor } from '../lib/catalog.mjs';

const quickAnswers = [
  {
    q: 'What is the minimum order for custom caps?',
    a: '10 pieces per style and colorway, mixable across sizes. Stock pro-colorways also start at 10 pieces. Samples of 1–2 pieces are available first.',
  },
  {
    q: 'How long does a custom cap order take?',
    a: 'Samples take 5 days. Bulk production runs 12–18 days after you approve the digital proof, plus transit: 5–8 days by express, 8–12 by air, 30–40 by sea.',
  },
  {
    q: 'How much does a custom cap cost?',
    a: 'Our caps start at $6.20 per piece at 10–49 pcs and drop to about $4.85 at 1,000 pcs, with one front logo in up to 12 thread colors included.',
  },
  {
    q: 'Do you ship to the U.S. door?',
    a: 'Yes. DDP delivery is available on air and sea freight, so the price you approve includes freight, duties and delivery to your address. You need no customs broker of your own.',
  },
];

export function homePage(pedia = {}) {
  const best = ['signature-6-panel-cap', 'classic-dad-hat', 'leather-patch-cap', 'gridiron-snapback'].map(
    (s) => products.find((p) => p.slug === s)
  );
  const body = `
<section class="hero">
  <div class="wrap hero__grid">
    <div>
      <span class="eyebrow">Heze, Shandong → United States</span>
      <h1><span class="line">Headwear</span><span class="line">programs,</span><span class="line hl">from 10 pcs.</span></h1>
      <p class="hero__sub">Custom 6-panels, dad hats, truckers and pro-colorway caps — embroidered, patched and shipped factory-direct to U.S. brands, shops and team dealers. No container loads required.</p>
      <div class="hero__ctas">
        <a class="btn btn--red" href="/shop/">Shop the catalog ${icon.arrow}</a>
        <a class="btn btn--outline" href="/contact/">Get a quote</a>
      </div>
      <div class="hero__stats">
        <div class="hero__stat"><b>10 pcs</b><span>per colorway</span></div>
        <div class="hero__stat"><b>12–18</b><span>day bulk lead</span></div>
        <div class="hero__stat"><b>12</b><span>thread colors</span></div>
        <div class="hero__stat"><b>DDP</b><span>to your door</span></div>
      </div>
    </div>
    <div class="hero__visual">
      <div class="hero__stage">
        <div class="hero__caps">
          <div class="hero__cap hero__cap--main"><img src="/assets/img/caps/hero-signature-6-panel-cap.svg" width="900" height="760" alt="Custom navy six-panel baseball cap with embroidered wordmark" fetchpriority="high" /></div>
          <div class="hero__cap hero__cap--left"><img src="/assets/img/caps/hero-leather-patch-cap.svg" width="900" height="760" alt="Olive cap with laser-etched leather patch" loading="lazy" /></div>
          <div class="hero__cap hero__cap--right"><img src="/assets/img/caps/hero-gridiron-snapback.svg" width="900" height="760" alt="Navy and silver pro-colorway snapback, side view" loading="lazy" /></div>
        </div>
        <div class="hero__sticker"><b>$${money(products.find((p) => p.slug === 'signature-6-panel-cap').price)}</b><span>from / pc</span></div>
        <div class="hero__note">Free digital proof · <b>24h reply</b></div>
      </div>
    </div>
  </div>
</section>
${trustRow()}

<section class="section">
  <div class="wrap">
    ${sectionHead({
      eyebrow: 'The catalogue',
      title: 'Seven categories,<br />one workshop.',
      text: 'Baseball caps, sport and outdoor, bucket hats, fashion hats, kids, pro colourways and the custom program — all cut and sewn in the same place, so a mixed order ships in one carton.',
    })}
    <div class="cat-grid" style="grid-template-columns:repeat(4,minmax(0,1fr))">
      ${parents
        .map((cat) => {
          const list = products.filter((x) => x.parent === cat.slug);
          return `<a class="cat-card" href="/${cat.slug}/">
            <img src="/assets/img/caps/${heroFor(cat.slug).slug}-front.svg" width="900" height="760" alt="" loading="lazy" />
            <span><h3>${esc(cat.name)}</h3><span>${list.length ? `${list.length} styles` : `${cat.children.length} programs`}</span></span>
          </a>`;
        })
        .join('')}
    </div>
  </div>
</section>
<section class="section section--paper2">
  <div class="wrap">
    ${sectionHead({
      eyebrow: 'Catalog',
      title: 'The caps buyers reorder.',
      text: 'Prices are per piece in USD, include one front logo, and drop with quantity. Every product page carries its full tier table.',
      link: '/shop/all/',
      linkLabel: 'All Styles',
    })}
    <div class="card-grid">${best.map((p) => productCard(p)).join('')}</div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    ${sectionHead({ eyebrow: 'How it works', title: 'From logo file to cartons in four steps.' })}
    <div class="steps">
      <div class="step">
        <span class="step__n">01</span>
        <h3>Send artwork</h3>
        <p>Email a logo (AI, EPS, PDF, SVG or a clean PNG), a quantity, a colorway idea and your deadline.</p>
      </div>
      <div class="step">
        <span class="step__n">02</span>
        <h3>Get a priced proof</h3>
        <p>A digital mockup with size, placement and thread colors, plus a firm per-piece price and lead time. Free.</p>
      </div>
      <div class="step">
        <span class="step__n">03</span>
        <h3>Sample or run bulk</h3>
        <p>Approve a 1–2 pc sample in 5 days, or go straight to bulk if the proof is final. 30% deposit to start.</p>
      </div>
      <div class="step">
        <span class="step__n">04</span>
        <h3>Ship DDP</h3>
        <p>We QC, photograph cartons and ship door-to-door. 12–18 days production, 5–12 days transit.</p>
      </div>
    </div>
  </div>
</section>

<section class="section section--tight">
  <div class="wrap">
    <div class="grid g2" style="gap:48px;align-items:start">
      <div>
        <span class="eyebrow">Why buyers switch</span>
        <h2 style="margin-bottom:18px">One factory.<br />One contact.<br />No sourcing maze.</h2>
        <p class="lede">Sourcing caps usually means three trading companies, two sample rounds and a freight quote that lands after you have already promised your customer a date. We quote the cap, the decoration and the delivery in one number.</p>
        <ul class="checklist mt-3">
          <li>One English-speaking contact on WhatsApp from quote to delivery</li>
          <li>Artwork kept confidential — no reuse of your mark</li>
          <li>Carton photos before the balance is due</li>
          <li>Reorder by SKU, same fabric lot when you order within 60 days</li>
        </ul>
      </div>
      <div>
        <table class="data" style="background:var(--cream);border:1px solid var(--line);border-radius:8px;overflow:hidden">
          <caption class="small" style="text-align:left;padding:14px 16px;color:var(--muted);border-bottom:1px solid var(--line)">Example: a 6-panel custom cap, one front logo</caption>
          <thead><tr><th>Quantity</th><th>Per piece</th><th>Per 100</th></tr></thead>
          <tbody>
            <tr><td>10–49</td><td>$${money(6.8 * 1.25)}</td><td>—</td></tr>
            <tr><td>50–99</td><td>$${money(6.8)}</td><td>—</td></tr>
            <tr><td>100–499</td><td>$${money(6.8 * 0.95)}</td><td>$${money(6.8 * 0.95 * 100)}</td></tr>
            <tr><td>500–999</td><td>$${money(6.8 * 0.86)}</td><td>$${money(6.8 * 0.86 * 100)}</td></tr>
            <tr><td>1,000+</td><td>$${money(6.8 * 0.78)}</td><td>$${money(6.8 * 0.78 * 100)}</td></tr>
          </tbody>
        </table>
        <p class="small muted mt-2">Ex-works pricing shown. DDP freight is quoted per order by weight and destination — air is usually the cheapest choice under 300 kg.</p>
      </div>
    </div>
  </div>
</section>

<section class="section section--paper2">
  <div class="wrap">
    ${sectionHead({
      eyebrow: 'Cap shapes compared',
      title: 'Which cap shape fits the program?',
      link: { href: '/shop/', label: 'Browse all styles' },
    })}
    <div style="overflow-x:auto">
      <table class="data" style="min-width:860px;background:var(--cream)">
        <caption class="small" style="text-align:left;padding:14px 16px;color:var(--muted);border-bottom:1px solid var(--line)">
          Shapes sold side by side by Raymark. All five are available from 10 pcs per colorway, one front logo included.
        </caption>
        <thead>
          <tr><th scope="col">Shape</th><th scope="col">Crown</th><th scope="col">Usually bought by</th><th scope="col">Decoration that works best</th><th scope="col">Min.</th></tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row"><a href="/baseball-caps/classic-baseball-cap/">Classic 6-panel</a></th>
            <td>Structured, mid-to-high profile</td>
            <td>Promo and corporate programs, retail blanks</td>
            <td>Flat embroidery, 3D puff, woven patch</td>
            <td>10 pcs</td>
          </tr>
          <tr>
            <th scope="row"><a href="/baseball-caps/dad-hats/">Dad hat / 6-panel unstructured</a></th>
            <td>Soft, low profile, pre-curved</td>
            <td>DTC brands, coffee and lifestyle retail</td>
            <td>Flat embroidery, small chest-style logo</td>
            <td>10 pcs</td>
          </tr>
          <tr>
            <th scope="row"><a href="/baseball-caps/fitted-caps/">Fitted cap</a></th>
            <td>Structured, blocked to half sizes</td>
            <td>Team dealers, on-field uniform programs</td>
            <td>3D puff front, side embroidery</td>
            <td>10 pcs</td>
          </tr>
          <tr>
            <th scope="row"><a href="/baseball-caps/trucker-caps/">Trucker / mesh back</a></th>
            <td>Foam or twill front, mesh back</td>
            <td>Events, agriculture, outdoor and beer brands</td>
            <td>Screen print, chenille patch</td>
            <td>10 pcs</td>
          </tr>
          <tr>
            <th scope="row"><a href="/bucket-hats/">Bucket hat</a></th>
            <td>Unstructured, all-round brim</td>
            <td>Resorts, festivals, fishing and kids lines</td>
            <td>Flat embroidery, woven label, print</td>
            <td>10 pcs</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p class="small muted mt-2">
      Not sure which one converts? Send the end use and a target landed cost —
      <a href="/contact/">we will come back with two shapes and a proof</a>, usually within 24 hours.
      The <a href="/pedia/custom-cap-moq-guide/">MOQ guide</a> explains how the 10-pc floor works per colorway.
    </p>
  </div>
</section>

<section class="section section--ink">
  <div class="wrap">
    ${sectionHead({ eyebrow: 'Straight answers', title: 'What buyers ask first.' })}
    <div class="grid g2" style="gap:26px">
      ${quickAnswers
        .map(
          (f) => `<div style="border-top:1px solid #39434a;padding-top:18px">
            <h3 style="font-size:1.1rem;margin-bottom:8px;text-transform:none">${esc(f.q)}</h3>
            <p class="muted" style="font-size:.94rem;margin:0">${esc(f.a)}</p>
          </div>`
        )
        .join('')}
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    ${sectionHead({
      eyebrow: 'Pedia',
      title: 'Buy headwear like you have done it before.',
      text: 'Sizing tables, thread counts, freight math and MOQ reality — the reference pages our buyers keep open during a launch.',
      link: '/pedia/',
      linkLabel: 'All articles',
    })}
    <div class="grid g3">
      ${['baseball-cap-size-guide', 'how-to-order-custom-caps', 'custom-cap-moq-guide']
        .map((slug) => pedia[slug])
        .filter(Boolean)
        .map(
          (a) => `<a class="art-card" href="/pedia/${a.slug}/">
            <span class="art-card__cat">${esc(a.category)}</span>
            <h3>${esc(a.title)}</h3>
            <p>${esc(a.tldr[0])}</p>
            <span class="art-card__meta"><span>${a.readMinutes} min read</span><span>${icon.arrow}</span></span>
          </a>`
        )
        .join('')}
    </div>
  </div>
</section>

${ctaBand()}
`;
  return page({
    url: '/',
    title: `Custom Baseball Caps, Factory-Direct | ${site.brand}`,
    description:
      'Factory-direct custom baseball caps and pro-team colorway caps from 10 pcs. 12-color embroidery, free digital proof, 12–18 day lead time, DDP delivery to the U.S.',
    active: 'Home',
    body,
    jsonLd: [
      orgSchema,
      websiteSchema,
      faqSchema(quickAnswers),
      collectionSchema('Raymark cap catalog', products.map((p) => ({ name: p.name, url: `/caps/${p.slug}/` })), '/shop/'),
    ],
  });
}
