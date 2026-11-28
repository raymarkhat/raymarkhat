import fs from 'node:fs';
import crypto from 'node:crypto';
import { site, nav, money } from '../site.config.mjs';
import { parents, childBySlug } from '../data/taxonomy.mjs';
import { photoSrc } from './photos.mjs';

/* content hash so a redeploy busts the CDN/browser cache for css + js */
const assetVersion = (rel) => {
  try {
    const file = new URL(`../assets/${rel}`, import.meta.url);
    return crypto.createHash('sha1').update(fs.readFileSync(file)).digest('hex').slice(0, 8);
  } catch {
    return Date.now().toString(36);
  }
};
const CSS_V = assetVersion('site.css');
const JS_V = assetVersion('app.js');
/** product image: real photo when one exists, otherwise the generated SVG */
export const imgSrc = (slug, view = 'front') => photoSrc(slug, view) || `/assets/img/caps/${slug}-${view}.svg`;

export const esc = (s = '') =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

export const abs = (p = '/') => site.url.replace(/\/$/, '') + p;

/* ------------------------------------------------------------------ pricing */
export function tiersFor(p) {
  const steps = [10, 50, 100, 500, 1000];
  const factors = [1.25, 1, 0.95, 0.86, 0.78];
  return steps.map((qty, i) => ({ qty, price: money(p.price * factors[i]) }));
}
export const priceAt = (p, qty) => {
  const t = tiersFor(p).filter((x) => qty >= x.qty).pop();
  return t ? t.price : tiersFor(p)[0].price;
};

/* -------------------------------------------------------------------- icons */
export const icon = {
  cart: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.6L21 8H6"/><circle cx="10" cy="20" r="1.3"/><circle cx="18" cy="20" r="1.3"/></svg>`,
  arrow: `<svg class="btn__arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6"/></svg>`,
  wa: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.5 15.2L2 22l4.9-1.4A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-2.9.8.8-2.8-.2-.3A8 8 0 1 1 12 20Zm4.5-5.9c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1-.6.8-.7.9-.3.2-.5.1a6.5 6.5 0 0 1-1.9-1.2 7.2 7.2 0 0 1-1.3-1.7c-.1-.2 0-.4.1-.5l.4-.4.2-.4v-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5a1 1 0 0 0-.7.3c-.2.2-.8.8-.8 2a3.5 3.5 0 0 0 .7 1.9 8 8 0 0 0 3 2.6c1.8.7 2.2.6 2.6.5a2.2 2.2 0 0 0 1.5-1 1.8 1.8 0 0 0 .1-1c0-.1-.2-.2-.5-.3Z"/></svg>`,
  mail: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2.5" y="5" width="19" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>`,
  phone: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 3h3l2 5-2.2 1.4a12 12 0 0 0 5.8 5.8L15 13l5 2v3a2 2 0 0 1-2.2 2A17 17 0 0 1 3 5.2 2 2 0 0 1 5 3Z"/></svg>`,
  check: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m4 12.5 5.5 5.5L20 6.5"/></svg>`,
  pin: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s7-6.4 7-12A7 7 0 0 0 5 10c0 5.6 7 12 7 12Z"/><circle cx="12" cy="10" r="2.6"/></svg>`,
  cap: `<svg viewBox="0 0 48 48" fill="none" aria-hidden="true"><path d="M10.5 29.5V25a13.5 13.5 0 0 1 27 0v4.5" stroke="currentColor" stroke-width="3.2" stroke-linejoin="round"/><path d="M4.5 29.6h39c0 5.2-8.6 8.4-19.5 8.4S4.5 34.8 4.5 29.6Z" fill="currentColor" opacity=".32"/><path d="M7 29.6h34" stroke="currentColor" stroke-width="3.2" stroke-linecap="round"/><circle cx="24" cy="11" r="2.6" fill="currentColor"/></svg>`,
};

export const waLink = (text) =>
  `https://wa.me/${site.phoneWhatsApp}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
export const mailLink = (subject, body) =>
  `mailto:${site.email}?subject=${encodeURIComponent(subject || 'Cap inquiry')}${
    body ? `&body=${encodeURIComponent(body)}` : ''
  }`;

/* ------------------------------------------------------------------- chrome */
function announceBar() {
  const items = [
    'MOQ 10 pcs per colorway',
    '12-color embroidery included',
    '12–18 day bulk lead time',
    'DDP to your U.S. door',
    'Free digital proof before you pay',
    'No online payment — every order starts with a quote',
  ];
  const row = items.map((t) => `<span>${esc(t)}</span>`).join('');
  return `<div class="announce" aria-hidden="true"><div class="announce__track">${row}${row}</div></div>`;
}

function megaMenu() {
  return `<div class="mega">
        ${parents
          .map(
            (p) => `<div class="mega__col">
            <a class="mega__head" href="/${p.slug}/">${esc(p.name)}</a>
            ${p.children.map((s) => `<a href="/${p.slug}/${s}/">${esc(childBySlug[s].name)}</a>`).join('')}
          </div>`
          )
          .join('')}
      </div>`;
}

function header(active = '') {
  const links = nav
    .map((n) => {
      const current = n.label === active ? ' aria-current="page"' : '';
      if (n.label === 'Shop') {
        return `<div class="nav-item"><a href="/shop/"${current} aria-haspopup="true">Shop</a>${megaMenu()}</div>`;
      }
      return `<a href="${n.href}"${current}>${esc(n.label)}</a>`;
    })
    .join('');

  return `${announceBar()}
<header class="head" id="siteHead">
  <div class="wrap head__inner">
    <a class="brand" href="/" aria-label="${esc(site.name)} home">
      <span class="brand__mark">${icon.cap}</span>
      <span class="brand__word">
        <span class="brand__name">${esc(site.brand)}</span>
        <span class="brand__sub">Custom cap works</span>
      </span>
    </a>
    <nav class="nav" aria-label="Primary">${links}</nav>
    <div class="head__actions">
      <a class="cart-btn" href="/cart/" data-cart-link>
        ${icon.cart}<span>Cart</span><span class="cart-btn__count" data-cart-count data-empty="true">0</span>
      </a>
      <a class="btn btn--red btn--sm" href="/contact/">Get a quote</a>
      <button class="nav-toggle" type="button" aria-label="Open menu" aria-expanded="false" data-nav-toggle><span></span></button>
    </div>
  </div>
</header>
<div class="drawer" id="drawer" hidden>
  <div class="drawer__scrim" data-drawer-close></div>
  <div class="drawer__panel" role="dialog" aria-modal="true" aria-label="Menu">
    <button class="drawer__close" type="button" data-drawer-close aria-label="Close menu">&times;</button>
    ${nav.map((n) => `<a class="drawer__link" href="${n.href}">${esc(n.label)}</a>`).join('')}
    <a class="drawer__link" href="/cart/">Cart</a>
    <div class="drawer__cats">
      <span class="mono muted">Shop by category</span>
      ${parents.map((p) => `<a href="/${p.slug}/">${esc(p.name)}</a>`).join('')}
    </div>
    <div class="drawer__foot">
      <a class="btn btn--red btn--block" href="/contact/">Get a quote ${icon.arrow}</a>
      <a class="btn btn--ghost btn--block" href="${waLink('Hi Raymark, I would like a quote for custom caps.')}" rel="noopener" target="_blank">${icon.wa} WhatsApp us</a>
      <p class="small muted mb-0">${esc(site.phoneDisplay)} · ${esc(site.email)}</p>
    </div>
  </div>
</div>`;
}
function footer() {
  return `<footer class="foot">
  <div class="wrap">
    <div class="foot__grid">
      <div>
        <a class="brand" href="/" aria-label="${esc(site.name)} home">
          <span class="brand__mark" style="color:#f7f2e6">${icon.cap}</span>
          <span class="brand__word">
            <span class="brand__name">${esc(site.brand)}</span>
            <span class="brand__sub">Custom cap works</span>
          </span>
        </a>
        <p class="mt-2">Factory-direct custom baseball caps and pro-colorway caps. Low minimums, free digital proofs, DDP delivery to the United States.</p>
        <div class="foot__contact">
          <a href="${waLink('Hi Raymark, I have a question about caps.')}" target="_blank" rel="noopener">${icon.wa} ${esc(site.phoneDisplay)}</a>
          <a href="mailto:${site.email}">${icon.mail} ${esc(site.email)}</a>
          <span class="small">${icon.pin} ${esc(site.legalName)}, ${esc(site.city)}, ${esc(site.region)}, ${esc(site.countryName)}</span>
        </div>
      </div>
      <div>
        <h4>Shop</h4>
        <ul>
          <li><a href="/baseball-caps/">Baseball caps</a></li>
          <li><a href="/sports-outdoor-caps/">Sport &amp; outdoor caps</a></li>
          <li><a href="/bucket-hats/">Bucket hats</a></li>
          <li><a href="/fashion-hats/">Fashion hats</a></li>
          <li><a href="/kids-hats/">Kids hats</a></li>
          <li><a href="/brand-section/">Team colourways</a></li>
          <li><a href="/custom-hat/">Custom hat program</a></li>
        </ul>
      </div>
      <div>
        <h4>Pedia</h4>
        <ul>
          <li><a href="/pedia/baseball-cap-size-guide/">Cap size guide</a></li>
          <li><a href="/pedia/how-to-order-custom-caps/">How ordering works</a></li>
          <li><a href="/pedia/custom-cap-moq-guide/">MOQ explained</a></li>
          <li><a href="/pedia/embroidery-vs-print/">Embroidery vs print</a></li>
          <li><a href="/pedia/cap-fabric-guide/">Fabric guide</a></li>
          <li><a href="/pedia/shipping-caps-to-usa/">Shipping to the U.S.</a></li>
          <li><a href="/pedia/">All articles</a></li>
        </ul>
      </div>
      <div>
        <h4>Talk to a human</h4>
        <ul>
          <li><a href="/contact/">Contact &amp; quote form</a></li>
          <li><a href="/cart/">Your quote request</a></li>
          <li><a href="tel:+8615954358307">${esc(site.phoneDisplay)}</a></li>
          <li><a href="mailto:${site.email}">${esc(site.email)}</a></li>
        </ul>
        <p class="small mt-2" style="color:#8f8879">${esc(site.hoursShort)}<br />${esc(site.hours)}</p>
      </div>
    </div>
    <div class="foot__bottom">
      <p>&copy; ${new Date().getFullYear()} ${esc(site.legalName)}. All rights reserved.</p>
      <p class="foot__legal">Team colorways are original Raymark colorways inspired by professional football palettes. We are not affiliated with, endorsed by, or licensed by the National Football League or any team. Team names and logos are trademarks of their respective owners. We sell blank and custom-decorated caps only; no third-party logos are applied.</p>
    </div>
  </div>
</footer>`;
}

/* -------------------------------------------------------------------- shell */

// SERP titles get truncated around 60 characters. Shorten in a predictable order:
//   1. drop the "10 Pcs Min" boilerplate (MOQ is already in the description)
//   2. drop the descriptor after an em dash
//   3. hard-trim on a word boundary
const TITLE_MAX = 60;
function fitTitle(raw) {
  const suffix = ` | ${site.brand}`;
  let full = raw.includes(site.brand) ? raw : raw + suffix;
  if (full.length <= TITLE_MAX) return full;

  const noMoq = full
    .replace(/,\s*10 Pcs Min(?=\s*\|)/i, '')
    .replace(/,\s*10 Pcs(?=\s*\|)/i, '');
  if (noMoq.length <= TITLE_MAX) return noMoq;

  const dash = noMoq.indexOf(' — ');
  if (dash > 0) {
    const candidate = `${noMoq.slice(0, dash)}${suffix}`;
    if (candidate.length <= TITLE_MAX) return candidate;
  }

  const budget = TITLE_MAX - suffix.length;
  const head = noMoq.split(' | ')[0].slice(0, budget);
  const cut = head.slice(0, head.lastIndexOf(' '));
  return `${cut}${suffix}`;
}

export function page({ url = '/', title, description, body, active = '', jsonLd = [], ogImage = '/assets/img/og-default.png', noindex = false, bodyClass = '' }) {
  const fullTitle = fitTitle(title);
  const ld = (Array.isArray(jsonLd) ? jsonLd : [jsonLd])
    .filter(Boolean)
    .map((o) => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, '\\u003c')}</script>`)
    .join('\n  ');
  return `<!doctype html>
<html lang="en-US">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${esc(fullTitle)}</title>
  <meta name="description" content="${esc(description)}" />
  <link rel="canonical" href="${abs(url)}" />
  ${noindex ? '<meta name="robots" content="noindex, follow" />' : '<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />'}
  ${site.verification?.google ? `<meta name="google-site-verification" content="${site.verification.google}" />` : ""}
  ${site.verification?.bing ? `<meta name="msvalidate.01" content="${site.verification.bing}" />` : ""}
  <meta name="theme-color" content="#12181d" />
  <meta name="generator" content="Raymark static build" />
  <link rel="icon" href="/favicon.ico" sizes="any" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <link rel="icon" href="/assets/img/favicon-32.png" sizes="32x32" type="image/png" />
  <link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png" />
  <link rel="manifest" href="/site.webmanifest" />
  <link rel="alternate" type="application/rss+xml" title="${esc(site.name)} — Pedia" href="/feed.xml" />
  <link rel="preload" as="style" href="/assets/site.css?v=${CSS_V}" />
  <link rel="stylesheet" href="/assets/site.css?v=${CSS_V}" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="${esc(site.name)}" />
  <meta property="og:locale" content="en_US" />
  <meta property="og:title" content="${esc(fullTitle)}" />
  <meta property="og:description" content="${esc(description)}" />
  <meta property="og:url" content="${abs(url)}" />
  <meta property="og:image" content="${abs(ogImage)}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${esc(fullTitle)}" />
  <meta name="twitter:description" content="${esc(description)}" />
  <meta name="twitter:image" content="${abs(ogImage)}" />
  ${ld}
</head>
<body class="${bodyClass}">
  <a class="skip" href="#main">Skip to content</a>
  ${header(active)}
  <main id="main">${body}</main>
  ${footer()}
  <script src="/assets/app.js?v=${JS_V}" defer></script>
</body>
</html>`;
}

/* ---------------------------------------------------------------- components */
export function productCard(p, opts = {}) {
  const t = tiersFor(p)[0];
  const badge = p.badges?.[0];
  return `<a class="pcard" href="/caps/${p.slug}/" ${opts.attrs || ''}>
    <div class="pcard__media">
      ${badge ? `<span class="pcard__badge${badge === 'Best seller' || badge === 'New' ? ' pcard__badge--red' : ''}">${esc(badge)}</span>` : ''}
      <img src="${imgSrc(p.slug, 'front')}" width="900" height="760" alt="${esc(p.name)} — ${esc(p.colors[0].name)} colorway" loading="${opts.eager ? 'eager' : 'lazy'}" decoding="async" />
    </div>
    <div class="pcard__body">
      <span class="pcard__cat">${esc(p.eyebrow)}</span>
      <h3 class="pcard__name">${esc(p.name)}</h3>
      <p class="pcard__desc">${esc(p.blurb)}</p>
      <div class="pcard__foot">
        <span class="pcard__price">From $${t.price}<small>per pc, ${p.moq}+</small></span>
        <span class="pcard__moq">${p.moq} pcs min</span>
      </div>
    </div>
  </a>`;
}

export function sectionHead({ eyebrow, title, text, link, linkLabel }) {
  return `<div class="sec-head">
    <div>
      ${eyebrow ? `<span class="eyebrow">${esc(eyebrow)}</span>` : ''}
      <h2>${title}</h2>
      ${text ? `<p class="lede">${text}</p>` : ''}
    </div>
    ${link ? `<a class="link-arrow sec-head__link" href="${link}">${esc(linkLabel || 'See all')} ${icon.arrow}</a>` : ''}
  </div>`;
}

export function ctaBand({ title, text, primary = true } = {}) {
  return `<section class="cta-band">
    <div class="wrap cta-band__inner">
      <div>
        <h2>${title || 'Send artwork today.<br />Hold a proof in 24 hours.'}</h2>
        <p>${text || 'Email a logo, a quantity and a deadline. You get a priced digital mockup, a firm lead time and a shipped-to-your-door quote — no account, no card, no obligation.'}</p>
      </div>
      <div class="cta-band__actions">
        ${primary ? `<a class="btn btn--light" href="${waLink("Hi Raymark, I'd like a quote for custom caps. My logo is ready.")}" target="_blank" rel="noopener">${icon.wa} WhatsApp: ${esc(site.phoneDisplay)}</a>` : ''}
        <a class="btn btn--outline" style="--fg:#fff;--bd:#fff" href="/contact/">Get a quote ${icon.arrow}</a>
      </div>
    </div>
  </section>`;
}

export function faqBlock(faqs, { title = 'Questions buyers ask' } = {}) {
  return `<div class="faq">
    <h2 style="font-size:clamp(1.5rem,2.6vw,2rem);margin:0 0 8px">${esc(title)}</h2>
    ${faqs
      .map(
        (f) => `<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`
      )
      .join('\n')}
  </div>`;
}

export function crumbs(items) {
  return `<nav class="crumbs" aria-label="Breadcrumb">${items
    .map((it, i) =>
      i === items.length - 1
        ? `<span aria-current="page">${esc(it.label)}</span>`
        : `<a href="${it.href}">${esc(it.label)}</a><span>/</span>`
    )
    .join('')}</nav>`;
}

export function trustRow() {
  return `<div class="proof"><div class="wrap proof__inner">
    <span class="proof__label">Caps made for</span>
    <div class="proof__items">
      <span>Apparel brands</span><span>Promo distributors</span><span>Team dealers</span>
      <span>Golf shops</span><span>Colleges &amp; clubs</span><span>Gyms</span>
    </div>
  </div></div>`;
}
