import { site } from '../site.config.mjs';
import { page, esc, ctaBand, crumbs, icon, waLink, mailLink } from '../lib/render.mjs';
import { breadcrumbSchema, faqSchema, orgSchema } from '../lib/seo.mjs';

const contactFaqs = [
  {
    q: 'How fast do you reply?',
    a: 'Within 12 hours, seven days a week. Quotes with a digital proof usually land inside 24 hours on weekdays.',
  },
  {
    q: 'Do I need to pay anything to get a quote?',
    a: 'No. Quotes and digital proofs are free. Payment starts only when you approve a written quote — 30% deposit for bulk, or a sample fee that is refunded on orders over 500 pcs.',
  },
  {
    q: 'Can you invoice a U.S. company?',
    a: 'Yes. We invoice in USD to your company name and address, and can ship DDP so you do not need your own customs broker.',
  },
  {
    q: 'Is my artwork safe?',
    a: 'Yes. Files are used only for your order and your proof, and are not shown to other buyers or reused. Ask for a simple NDA if your process requires one.',
  },
];

export function contactPage() {
  const body = `
<section class="phero">
  <div class="wrap">
    ${crumbs([{ label: 'Home', href: '/' }, { label: 'Contact' }])}
    <h1>Tell us what<br />you need made.</h1>
    <p class="lede">A logo file, a quantity and a date is enough to start. You will get a priced digital proof, not a catalog PDF.</p>
  </div>
</section>

<section class="section--tight">
  <div class="wrap">
    <div class="grid g2" style="gap:52px;align-items:start">
      <div>
        <h2 style="font-size:1.5rem;margin-bottom:16px">Quote request</h2>
        <form data-quote-form data-kind="contact" novalidate>
          <div class="form-grid">
            <div class="field"><label for="c-name">Name</label><input id="c-name" name="name" autocomplete="name" required /></div>
            <div class="field"><label for="c-company">Company</label><input id="c-company" name="company" autocomplete="organization" /></div>
          </div>
          <div class="form-grid">
            <div class="field"><label for="c-email">Email</label><input id="c-email" name="email" type="email" autocomplete="email" required /></div>
            <div class="field"><label for="c-phone">Phone / WhatsApp</label><input id="c-phone" name="phone" autocomplete="tel" /></div>
          </div>
          <div class="form-grid">
            <div class="field">
              <label for="c-interest">What do you need?</label>
              <select id="c-interest" name="interest">
                <option>Custom caps (my logo)</option>
                <option>Pro colorway caps</option>
                <option>Samples first</option>
                <option>Reorder an existing cap</option>
                <option>Something else</option>
              </select>
            </div>
            <div class="field"><label for="c-qty">Quantity</label><input id="c-qty" name="qty" inputmode="numeric" placeholder="e.g. 150" /></div>
          </div>
          <div class="field"><label for="c-message">Logo, deadline, colorway notes</label><textarea id="c-message" name="message" placeholder="6-panel, navy crown, cream embroidery, need 200 pcs delivered to Austin TX by March 10."></textarea></div>
          <div class="flex">
            <button class="btn btn--red" type="submit" data-send="wa">${icon.wa} Send on WhatsApp</button>
            <button class="btn btn--outline" type="submit" data-send="mail">${icon.mail} Send by email</button>
          </div>
          <p class="form-note mt-2">This form does not store anything on the site. It composes a message and opens WhatsApp or your email app — whichever you choose. Logo files can be attached in the chat or sent to ${esc(site.email)}.</p>
        </form>
      </div>

      <div>
        <div class="summary" style="position:static">
          <h2 style="font-size:1.2rem;margin-bottom:16px">Direct lines</h2>
          <div class="foot__contact" style="color:var(--ink)">
            <a href="${waLink('Hi Raymark, I would like a quote for custom caps.')}" target="_blank" rel="noopener" style="display:flex;gap:10px;align-items:center;text-decoration:none;font-weight:600">
              ${icon.wa} ${esc(site.phoneDisplay)} <span class="small muted">(WhatsApp)</span>
            </a>
            <a href="mailto:${site.email}" style="display:flex;gap:10px;align-items:center;text-decoration:none;font-weight:600">${icon.mail} ${esc(site.email)}</a>
          </div>
          <hr style="margin:20px 0" />
          <dl class="spec-list" style="grid-template-columns:1fr">
            <div><dt>Company</dt><dd>${esc(site.legalName)}</dd></div>
            <div><dt>Location</dt><dd>${esc(site.city)}, ${esc(site.region)}, ${esc(site.countryName)}</dd></div>
            <div><dt>Hours</dt><dd>Mon–Sat, 09:00–21:00 UTC+8</dd></div>
            <div><dt>Reply time</dt><dd>Within 12 hours</dd></div>
            <div><dt>Languages</dt><dd>English, Chinese</dd></div>
          </dl>
          <div class="notice notice--ink mt-3">
            <span>${icon.check}</span>
            <span>${esc(site.hoursShort)}. If you are in the U.S., our morning is your evening — we usually answer overnight U.S. time.</span>
          </div>
        </div>
      </div>
    </div>

    <div class="faq" style="margin-top:56px">
      ${contactFaqs.map((f) => `<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join('')}
    </div>
  </div>
</section>

${ctaBand({ title: 'Prefer to skip the form?', text: 'Message the number directly. Send a logo, a quantity and a deadline and you will have a price the same day.' })}
`;
  return page({
    url: '/contact/',
    title: `Contact — Custom Cap Quotes in 24h | ${site.brand}`,
    description:
      'Request a custom baseball cap quote: WhatsApp +86 159 5435 8307, email info@raymarkhat.com. MOQ 50 pcs, free digital proof, replies within 12 hours.',
    active: 'Contact',
    body,
    jsonLd: [
      orgSchema,
      breadcrumbSchema([{ label: 'Home', href: '/' }, { label: 'Contact', href: '/contact/' }]),
      faqSchema(contactFaqs),
    ],
  });
}

export function cartPage() {
  const body = `
<section class="phero">
  <div class="wrap">
    ${crumbs([{ label: 'Home', href: '/' }, { label: 'Quote request' }])}
    <h1>Your quote<br />request.</h1>
    <p class="lede">There is no checkout here — this page builds a message with your caps, sizes and quantities so we can price it properly and send a proof.</p>
  </div>
</section>

<section class="section--tight">
  <div class="wrap">
    <div class="cart-layout">
      <div>
        <div class="cart-list" data-cart-list></div>
        <div class="cart-empty" data-cart-empty hidden>
          <p style="font-family:var(--ff-display);font-size:1.2rem;text-transform:uppercase">Nothing added yet</p>
          <p class="muted small">Pick a few caps from the shop and they will appear here.</p>
          <a class="btn btn--red" href="/shop/">Browse caps ${icon.arrow}</a>
        </div>
        <div class="mt-4" data-cart-form-wrap hidden>
          <h2 style="font-size:1.2rem;margin-bottom:14px">Who should the quote go to?</h2>
          <div class="form-grid">
            <div class="field"><label for="q-name">Name</label><input id="q-name" name="name" autocomplete="name" /></div>
            <div class="field"><label for="q-company">Company</label><input id="q-company" name="company" autocomplete="organization" /></div>
            <div class="field"><label for="q-email">Email</label><input id="q-email" name="email" type="email" autocomplete="email" /></div>
            <div class="field"><label for="q-phone">Phone / WhatsApp</label><input id="q-phone" name="phone" autocomplete="tel" /></div>
            <div class="field"><label for="q-ship">Ship-to city / state / ZIP</label><input id="q-ship" name="ship" placeholder="Austin, TX 78701" /></div>
            <div class="field"><label for="q-deadline">Needed by</label><input id="q-deadline" name="deadline" type="date" /></div>
          </div>
          <div class="field"><label for="q-notes">Notes (artwork, colorway, decoration)</label><textarea id="q-notes" name="notes" placeholder="Navy crown, cream embroidery, side mark, hang tags."></textarea></div>
          <button class="btn btn--red btn--block" type="button" data-build-quote>Build my quote message ${icon.arrow}</button>
          <p class="form-note mt-2">Nothing is sent automatically. You review the message, then send it by WhatsApp or email.</p>
        </div>
      </div>

      <div class="summary">
        <h2 style="font-size:1.1rem;margin-bottom:8px">Summary</h2>
        <div class="summary__row"><span>Caps</span><span data-sum-qty>0</span></div>
        <div class="summary__row"><span>Estimated total</span><span data-sum-total>$0.00</span></div>
        <div class="summary__row" style="border-bottom:0"><span>Shipping</span><span class="muted">Quoted separately</span></div>
        <div class="summary__row summary__row--total"><span>Est.</span><span data-sum-total2>$0.00</span></div>
        <p class="small muted">Estimates use our per-piece tier price for each quantity. Freight, duties and decoration add-ons are confirmed on the quote.</p>
        <div data-quote-out-wrap hidden>
          <label class="mono" for="quote-out" style="display:block;margin:14px 0 6px;color:var(--muted)">Your message</label>
          <textarea class="quote-out" id="quote-out" data-quote-out readonly></textarea>
          <div class="flex mt-2">
            <a class="btn btn--red btn--sm" data-send-wa href="${waLink('')}" target="_blank" rel="noopener">${icon.wa} WhatsApp</a>
            <a class="btn btn--outline btn--sm" data-send-mail href="mailto:${site.email}">${icon.mail} Email</a>
            <button class="btn btn--ghost btn--sm" type="button" data-copy>Copy</button>
          </div>
        </div>
        <hr style="margin:18px 0" />
        <p class="small"><strong>${site.moq} pcs minimum</strong> per colorway. Need help choosing? <a href="/contact/">Ask us</a>.</p>
      </div>
    </div>
  </div>
</section>
`;
  return page({
    url: '/cart/',
    title: `Quote request | ${site.brand}`,
    description: 'Review the caps in your quote request, then send it to Raymark by WhatsApp or email for pricing and a free digital proof.',
    active: '',
    body,
    noindex: true,
    jsonLd: [breadcrumbSchema([{ label: 'Home', href: '/' }, { label: 'Quote request', href: '/cart/' }])],
  });
}

export function notFoundPage() {
  const body = `
<section class="section" style="min-height:52vh;display:grid;place-items:center">
  <div class="wrap center" style="max-width:640px">
    <span class="eyebrow" style="justify-content:center">404</span>
    <h1 style="margin-bottom:16px">Off the brim.</h1>
    <p class="lede" style="margin-inline:auto">That page does not exist. The catalog, the cap pedia and the quote form all do.</p>
    <div class="flex mt-3" style="justify-content:center">
      <a class="btn btn--red" href="/shop/">Shop caps ${icon.arrow}</a>
      <a class="btn btn--outline" href="/pedia/">Cap pedia</a>
      <a class="btn btn--ghost" href="/contact/">Contact</a>
    </div>
  </div>
</section>`;
  return page({
    url: '/404.html',
    title: 'Page not found',
    description: 'That page does not exist. Browse custom and pro-colorway baseball caps, or send a quote request.',
    body,
    noindex: true,
  });
}
