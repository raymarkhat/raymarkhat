import { site } from '../site.config.mjs';
import { page, esc, productCard, ctaBand, crumbs, icon, faqBlock, tiersFor, waLink, imgSrc } from '../lib/render.mjs';
import { categoryBar } from '../lib/catnav.mjs';
import { collectionSchema, breadcrumbSchema, faqSchema } from '../lib/seo.mjs';
import { childBySlug, parentBySlug, productsIn, productsUnder, productsForProgram, siblingsOf } from '../lib/catalog.mjs';

const childUrl = (c) => `/${c.parent}/${c.slug}/`;
const parentUrl = (p) => `/${p.slug}/`;

function catCard(child, imgSlug, count) {
  return `<a class="cat-card" href="${childUrl(child)}">
    <img src="${imgSrc(imgSlug, 'front')}" width="900" height="760" alt="" loading="lazy" />
    <span>
      <h3>${esc(child.name)}</h3>
      <span>${count} ${count === 1 ? 'style' : 'styles'}</span>
    </span>
  </a>`;
}

/* ------------------------------------------------------------------ parent */
export function parentCategoryPage(parent) {
  const items = productsUnder(parent.slug);
  const kids = parent.children.map((slug) => childBySlug[slug]).filter(Boolean);
  const isBrand = parent.slug === 'brand-section';
  const isProgramParent = items.length === 0;
  const heroItem = items[0] || productsForProgram(kids[0].slug)[0] || products[0];

  const childTile = (k) => {
    const list = k.kind === 'program' ? productsForProgram(k.slug) : productsIn(k.slug);
    const meta =
      k.kind === 'program' ? 'Custom program' : `${list.length} ${list.length === 1 ? 'style' : 'styles'}`;
    return `<a class="cat-tile" href="${childUrl(k)}">
      <div class="cat-tile__media"><img src="${imgSrc(list[0]?.slug || heroItem.slug, 'front')}" width="900" height="760" alt="" loading="lazy" /></div>
      <div class="cat-tile__body">
        <span class="cat-tile__meta">${esc(meta)}</span>
        <h3>${esc(k.name)}</h3>
        <p>${esc(k.intro[0].split('. ')[0])}.</p>
        <span class="cat-tile__go">View ${esc(k.name)} ${icon.arrow}</span>
      </div>
    </a>`;
  };

  const body = `
<section class="phero">
  <div class="wrap">
    ${crumbs([{ label: 'Home', href: '/' }, { label: 'Shop', href: '/shop/' }, { label: parent.name }])}
    <h1>${esc(parent.h1)}</h1>
    <p class="lede">${esc(parent.intro[0])}</p>
    <div class="flex mt-3">
      <span class="pill pill--ink">${kids.length} ${isProgramParent ? 'programs' : 'sub-categories'}</span>
      <span class="pill">${isProgramParent ? 'Any shape' : `${items.length} styles`}</span>
      <span class="pill">From $${tiersFor(heroItem)[0].price} / pc</span>
      <span class="pill">MOQ 25–50</span>
      ${
        isProgramParent
          ? ''
          : `<a class="link-arrow" style="margin-left:6px" href="/shop/all/?cat=${parent.slug}">All ${items.length} ${esc(
              parent.name
            )} styles ${icon.arrow}</a>`
      }
    </div>
  </div>
</section>

<section class="section--tight">
  <div class="wrap">
    <div class="cat-tiles">${kids.map(childTile).join('')}</div>
  </div>
</section>

${isBrand ? brandDisclaimer() : ''}

<section class="section">
  <div class="wrap narrow-copy">
    <p class="lede">${esc(parent.intro[1])}</p>
  </div>
</section>

${ctaBand()}
`;

  return page({
    url: parentUrl(parent),
    title: `${parent.title} | ${site.brand}`,
    description: parent.description,
    active: 'Shop',
    body,
    jsonLd: [
      collectionSchema(
        `${parent.name} — Raymark`,
        kids.map((k) => ({ name: k.name, url: childUrl(k) })),
        parentUrl(parent)
      ),
      breadcrumbSchema([
        { label: 'Home', href: '/' },
        { label: 'Shop', href: '/shop/' },
        { label: parent.name, href: parentUrl(parent) },
      ]),
    ],
  });
}
/* ------------------------------------------------------------------- child */
export function childCategoryPage(child) {
  const parent = parentBySlug[child.parent];
  const isProgram = child.kind === 'program';
  const isLeague = child.kind === 'league';
  const items = isProgram ? productsForProgram(child.slug) : productsIn(child.slug);
  const siblings = siblingsOf(child.slug);
  const lead = items[0];
  // keep the grid visually full: borrow siblings' SKUs when a category has fewer than four
  const filler =
    items.length >= 4
      ? []
      : productsUnder(child.parent)
          .filter((p) => !items.some((x) => x.slug === p.slug))
          .slice(0, 4 - items.length);
  const grid = [...items, ...filler];

  const body = `
<section class="phero">
  <div class="wrap">
    ${crumbs([
      { label: 'Home', href: '/' },
      { label: 'Shop', href: '/shop/' },
      { label: parent.name, href: parentUrl(parent) },
      { label: child.name },
    ])}
    <h1>${esc(child.h1)}</h1>
    <p class="lede">${esc(child.intro[0])}</p>
    <div class="flex mt-3">
      <span class="pill pill--ink">${items.length} styles</span>
      ${lead ? `<span class="pill">From $${tiersFor(lead)[0].price} / pc</span>` : ''}
      <span class="pill">MOQ ${lead?.moq || 50} pcs</span>
      <span class="pill">12–18 day bulk</span>
    </div>
  </div>
</section>

<div class="wrap">
  <nav class="subnav" aria-label="Related categories">
    <a class="chip" href="${parentUrl(parent)}">← ${esc(parent.name)}</a>
    ${siblings.map((s) => `<a class="chip" href="${childUrl(s)}">${esc(s.name)}</a>`).join('')}
  </nav>
</div>

${isLeague ? brandDisclaimer() : ''}

${isProgram ? programPanel() : ''}

<section class="section--tight">
  <div class="wrap">
    ${
      items.length
        ? `<div class="card-grid">${grid.map((p) => productCard(p)).join('')}</div>`
        : `<p class="muted">Stock for this shape is quoted per order — <a href="/contact/">send your spec</a> and we will price it.</p>`
    }
  </div>
</section>

<section class="section section--paper2">
  <div class="wrap">
    <div class="grid g2" style="gap:56px;align-items:start">
      <div>
        <h2 style="font-size:clamp(1.4rem,2.4vw,1.9rem);margin-bottom:16px">${esc(child.name)}: what to know</h2>
        <p class="lede">${esc(child.intro[1])}</p>
        <div class="flex mt-3">
          <a class="btn btn--red" href="/contact/">Get a quote ${icon.arrow}</a>
          <a class="btn btn--ghost" href="${waLink(`Hi Raymark, I'm interested in ${child.name}.`)}" target="_blank" rel="noopener">${icon.wa} WhatsApp</a>
        </div>
      </div>
      <div class="summary" style="position:static">
        <h3 style="font-size:1rem;margin-bottom:12px">Typical terms on this category</h3>
        <dl class="spec-list" style="grid-template-columns:1fr">
          <div><dt>Minimum order</dt><dd>${lead?.moq || 50} pcs per colourway</dd></div>
          <div><dt>Sample</dt><dd>1–2 pcs, 5–7 days</dd></div>
          <div><dt>Bulk lead time</dt><dd>12–18 days after proof</dd></div>
          <div><dt>Decoration</dt><dd>Flat / 3D puff, patch, print</dd></div>
          <div><dt>Shipping</dt><dd>DDP air 8–12 days to the U.S.</dd></div>
        </dl>
      </div>
    </div>
    ${
      child.faqs?.length
        ? `<div class="faq" style="margin-top:56px"><h2 style="font-size:clamp(1.4rem,2.4vw,1.9rem);margin:0 0 8px">${esc(
            child.name
          )} questions</h2>${child.faqs
            .map((f) => `<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`)
            .join('')}</div>`
        : ''
    }
  </div>
</section>

${ctaBand()}
`;

  return page({
    url: childUrl(child),
    title: `${child.title} | ${site.brand}`,
    description: child.description,
    active: 'Shop',
    body,
    jsonLd: [
      collectionSchema(
        `${child.name} — Raymark`,
        items.map((p) => ({ name: p.name, url: `/caps/${p.slug}/` })),
        childUrl(child)
      ),
      breadcrumbSchema([
        { label: 'Home', href: '/' },
        { label: parent.name, href: parentUrl(parent) },
        { label: child.name, href: childUrl(child) },
      ]),
      child.faqs?.length ? faqSchema(child.faqs) : null,
    ],
  });
}

function brandDisclaimer() {
  return `<section class="section--tight">
    <div class="wrap">
      <div class="notice notice--warn" style="display:block">
        <strong>Not licensed merchandise.</strong> Caps in this section are blank stock bodies or original
        two-tone colourways inspired by professional league palettes. We are not affiliated with, endorsed
        by, or licensed by the NFL, NBA, MLB, NHL or any team, and we do not apply team names, team logos or
        league marks. Team names and logos are trademarks of their respective owners.
      </div>
    </div>
  </section>`;
}

function programPanel() {
  return `<section class="section--tight">
    <div class="wrap">
      <div class="grid g2" style="gap:24px">
        <div class="summary" style="position:static">
          <h3 style="font-size:1rem;margin-bottom:10px">Included in the price</h3>
          <ul class="checklist" style="font-size:.9rem">
            <li>One front logo, flat or 3D puff, up to 12 colours</li>
            <li>Digital proof and one revision round</li>
            <li>Pre-production photo before bulk</li>
            <li>Poly bag and export carton</li>
          </ul>
        </div>
        <div class="summary" style="position:static">
          <h3 style="font-size:1rem;margin-bottom:10px">What we need from you</h3>
          <ul class="checklist" style="font-size:.9rem">
            <li>Vector logo (AI, EPS, PDF, SVG) or 300 dpi PNG</li>
            <li>Quantity per size and colourway</li>
            <li>Ship-to address and in-hand date</li>
            <li>Pantone references if you have them</li>
          </ul>
        </div>
      </div>
    </div>
  </section>`;
}
