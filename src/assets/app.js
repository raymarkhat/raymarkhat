/* Raymark Caps — client behaviour. No framework, no dependencies. */
(() => {
  'use strict';

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const STORE = 'rm_cart_v2';

  const money = (n) => `$${(Math.round(n * 100) / 100).toFixed(2)}`;

  /* ------------------------------------------------------------ pricing */
  const stepsFor = (moq) => (moq <= 25 ? [25, 50, 100, 500] : [50, 100, 500, 1000]);
  const FACTORS = [1, 0.95, 0.86, 0.78];
  function unitPrice(base, moq, qty) {
    const steps = stepsFor(moq);
    let idx = 0;
    steps.forEach((s, i) => {
      if (qty >= s) idx = i;
    });
    return Math.round(base * FACTORS[idx] * 20) / 20;
  }

  /* --------------------------------------------------------------- cart */
  const cart = {
    read() {
      try {
        const raw = JSON.parse(localStorage.getItem(STORE) || '[]');
        return Array.isArray(raw) ? raw : [];
      } catch {
        return [];
      }
    },
    write(items) {
      localStorage.setItem(STORE, JSON.stringify(items));
      paintCount(items);
      document.dispatchEvent(new CustomEvent('cart:change', { detail: items }));
    },
    add(item) {
      const items = cart.read();
      const key = `${item.slug}|${item.color}|${item.size}`;
      const found = items.find((i) => i.key === key);
      if (found) {
        found.qty += item.qty;
        found.unit = unitPrice(found.base, found.moq, found.qty);
      } else {
        items.push({ ...item, key });
      }
      cart.write(items);
    },
    update(key, qty) {
      const items = cart.read();
      const it = items.find((i) => i.key === key);
      if (!it) return;
      if (qty <= 0) return cart.remove(key);
      it.qty = qty;
      it.unit = unitPrice(it.base, it.moq, qty);
      cart.write(items);
    },
    remove(key) {
      cart.write(cart.read().filter((i) => i.key !== key));
    },
    clear() {
      cart.write([]);
    },
    count() {
      return cart.read().reduce((n, i) => n + i.qty, 0);
    },
    total() {
      return cart.read().reduce((n, i) => n + i.qty * i.unit, 0);
    },
  };

  function paintCount(items) {
    const list = items || cart.read();
    const n = list.reduce((s, i) => s + i.qty, 0);
    $$('[data-cart-count]').forEach((el) => {
      el.textContent = n;
      el.dataset.empty = n === 0 ? 'true' : 'false';
    });
  }

  /* ------------------------------------------------------------- header */
  const head = $('#siteHead');
  if (head) {
    const onScroll = () => head.classList.toggle('is-stuck', window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  const drawer = $('#drawer');
  const toggle = $('[data-nav-toggle]');
  const openDrawer = (open) => {
    if (!drawer) return;
    drawer.hidden = !open;
    drawer.classList.toggle('is-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
    if (toggle) toggle.setAttribute('aria-expanded', String(open));
  };
  if (toggle) toggle.addEventListener('click', () => openDrawer(drawer?.hidden !== false));
  $$('[data-drawer-close]').forEach((el) => el.addEventListener('click', () => openDrawer(false)));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') openDrawer(false);
  });

  /* --------------------------------------------------------- product page */
  const galleryMain = $('[data-gallery-main]');
  $$('[data-view]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const view = btn.dataset.view;
      const slug = location.pathname.split('/').filter(Boolean).pop();
      if (galleryMain) galleryMain.src = `/assets/img/caps/${slug}-${view}.svg`;
      $$('[data-view]').forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
    });
  });

  const buybox = $('[data-buybox]');
  if (buybox) {
    const base = Number(buybox.dataset.base);
    const moq = Number(buybox.dataset.moq);
    const input = $('[data-qty-input]', buybox);
    const unitEl = $('[data-unit]', buybox);
    const totalEl = $('[data-total]', buybox);

    const recalc = () => {
      const qty = Math.max(moq, Number(input.value) || moq);
      const unit = unitPrice(base, moq, qty);
      if (unitEl) unitEl.textContent = `${money(unit)} / pc`;
      if (totalEl) totalEl.textContent = money(unit * qty);
    };
    input?.addEventListener('input', recalc);
    $$('[data-qty]', buybox).forEach((b) =>
      b.addEventListener('click', () => {
        input.value = Math.max(moq, (Number(input.value) || moq) + Number(b.dataset.qty));
        recalc();
      })
    );
    recalc();

    $$('[data-opt-color] .swatch').forEach((b) =>
      b.addEventListener('click', () => {
        $$('[data-opt-color] .swatch').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
        const name = $('[data-color-name]');
        if (name) name.textContent = b.dataset.color;
      })
    );
    $$('[data-opt-size] .size').forEach((b) =>
      b.addEventListener('click', () => {
        $$('[data-opt-size] .size').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      })
    );

    $('[data-add]')?.addEventListener('click', () => {
      const btn = $('[data-add]');
      const color = $('[data-opt-color] .swatch[aria-pressed="true"]')?.dataset.color || 'Default';
      const size = $('[data-opt-size] .size[aria-pressed="true"]')?.dataset.size || 'One size';
      const qty = Math.max(moq, Number(input.value) || moq);
      cart.add({
        slug: btn.dataset.slug,
        name: btn.dataset.name,
        image: btn.dataset.image,
        color,
        size,
        qty,
        base,
        moq,
        unit: unitPrice(base, moq, qty),
      });
      btn.textContent = 'Added to quote request ✓';
      window.setTimeout(() => {
        window.location.href = '/cart/';
      }, 650);
    });
  }

  /* --------------------------------------------------------------- shop */
  const grid = $('[data-shop-grid]');
  if (grid) {
    const items = $$('[data-shop-item]', grid);
    const chips = $$('[data-filter]');
    const countEl = $('[data-shop-count]');
    const emptyEl = $('[data-shop-empty]');
    const sortEl = $('[data-sort]');
    let filter = 'all';
    const initial = new URLSearchParams(location.search).get('cat');
    if (initial && chips.some((b) => b.dataset.filter === initial)) filter = initial;

    const apply = () => {
      let shown = 0;
      items.forEach((el) => {
        // filter value is a top-level category slug, or "all"
        const ok = filter === 'all' || el.dataset.cat === filter;
        el.hidden = !ok;
        if (ok) shown++;
      });
      if (countEl) countEl.textContent = shown;
      if (emptyEl) emptyEl.hidden = shown !== 0;
    };

    chips.forEach((btn) => btn.setAttribute('aria-pressed', String(btn.dataset.filter === filter)));
    chips.forEach((btn) =>
      btn.addEventListener('click', () => {
        filter = btn.dataset.filter;
        chips.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
        apply();
      })
    );

    if (sortEl) {
      sortEl.addEventListener('change', () => {
        const mode = sortEl.value;
        const sorted = items.slice().sort((a, b) => {
          if (mode === 'price-asc') return Number(a.dataset.price) - Number(b.dataset.price);
          if (mode === 'price-desc') return Number(b.dataset.price) - Number(a.dataset.price);
          if (mode === 'moq') return Number(a.dataset.moq) - Number(b.dataset.moq);
          return 0;
        });
        sorted.forEach((el) => grid.appendChild(el));
      });
    }
    apply();
  }

  /* --------------------------------------------------------------- cart page */
  const cartList = $('[data-cart-list]');
  function renderCart() {
    if (!cartList) return;
    const items = cart.read();
    const empty = $('[data-cart-empty]');
    const formWrap = $('[data-cart-form-wrap]');
    const sumQty = $$('[data-sum-qty]');
    const sumTotal = $$('[data-sum-total], [data-sum-total2]');

    cartList.innerHTML = items
      .map(
        (i) => `<div class="cart-row">
        <div class="cart-row__img"><img src="${i.image}" width="180" height="152" alt="" loading="lazy" /></div>
        <div>
          <a class="cart-row__name" href="/caps/${i.slug}/" style="text-decoration:none">${i.name}</a>
          <div class="cart-row__meta">${i.color} · ${i.size}</div>
          <div class="cart-row__meta"><div class="qty" style="margin-top:8px;transform:scale(.9);transform-origin:left">
            <button type="button" data-line-qty="-1" data-key="${i.key}" aria-label="Decrease">−</button>
            <input value="${i.qty}" inputmode="numeric" data-line-input data-key="${i.key}" aria-label="Quantity for ${i.name}" />
            <button type="button" data-line-qty="1" data-key="${i.key}" aria-label="Increase">+</button>
          </div></div>
        </div>
        <div class="cart-row__right">
          <span class="cart-row__price">${money(i.unit * i.qty)}</span>
          <span class="cart-row__meta">${money(i.unit)} / pc</span>
          <button class="cart-remove" type="button" data-line-remove data-key="${i.key}">Remove</button>
        </div>
      </div>`
      )
      .join('');

    if (empty) empty.hidden = items.length > 0;
    if (formWrap) formWrap.hidden = items.length === 0;

    const qty = items.reduce((n, i) => n + i.qty, 0);
    const total = items.reduce((n, i) => n + i.unit * i.qty, 0);
    sumQty.forEach((el) => (el.textContent = qty));
    sumTotal.forEach((el) => (el.textContent = money(total)));

    $$('[data-line-qty]', cartList).forEach((btn) =>
      btn.addEventListener('click', () => {
        const it = cart.read().find((i) => i.key === btn.dataset.key);
        if (!it) return;
        cart.update(btn.dataset.key, it.qty + Number(btn.dataset.lineQty));
        renderCart();
      })
    );
    $$('[data-line-input]', cartList).forEach((inp) =>
      inp.addEventListener('change', () => {
        cart.update(inp.dataset.key, Math.max(0, Number(inp.value) || 0));
        renderCart();
      })
    );
    $$('[data-line-remove]', cartList).forEach((btn) =>
      btn.addEventListener('click', () => {
        cart.remove(btn.dataset.key);
        renderCart();
      })
    );
  }

  function buildQuoteText() {
    const items = cart.read();
    const val = (id) => ($(id)?.value || '').trim();
    const lines = ['RAYMARK — QUOTE REQUEST', ''];
    if (val('#q-name')) lines.push(`Name: ${val('#q-name')}`);
    if (val('#q-company')) lines.push(`Company: ${val('#q-company')}`);
    if (val('#q-email')) lines.push(`Email: ${val('#q-email')}`);
    if (val('#q-phone')) lines.push(`Phone: ${val('#q-phone')}`);
    if (val('#q-ship')) lines.push(`Ship to: ${val('#q-ship')}`);
    if (val('#q-deadline')) lines.push(`Needed by: ${val('#q-deadline')}`);
    lines.push('', 'CAPS');
    items.forEach((i, n) => {
      lines.push(
        `${n + 1}) ${i.name}`,
        `   ${i.color} / ${i.size}`,
        `   ${i.qty} pcs x ${money(i.unit)} = ${money(i.qty * i.unit)}`
      );
    });
    const total = items.reduce((s, i) => s + i.qty * i.unit, 0);
    lines.push('', `Est. total: ${money(total)} (ex-works, freight quoted separately)`);
    if (val('#q-notes')) lines.push('', `Notes: ${val('#q-notes')}`);
    lines.push('', 'Please confirm price, proof and lead time.');
    return lines.join('\n');
  }

  $('[data-build-quote]')?.addEventListener('click', () => {
    const out = $('[data-quote-out]');
    const wrap = $('[data-quote-out-wrap]');
    if (!out) return;
    const text = buildQuoteText();
    out.value = text;
    if (wrap) wrap.hidden = false;
    const wa = $('[data-send-wa]');
    const mail = $('[data-send-mail]');
    if (wa) wa.href = `https://wa.me/8615954358307?text=${encodeURIComponent(text)}`;
    if (mail)
      mail.href = `mailto:info@pmbanner.com?subject=${encodeURIComponent('Quote request — Raymark caps')}&body=${encodeURIComponent(text)}`;
    out.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  $('[data-copy]')?.addEventListener('click', async (e) => {
    const out = $('[data-quote-out]');
    if (!out) return;
    try {
      await navigator.clipboard.writeText(out.value);
      e.currentTarget.textContent = 'Copied ✓';
      setTimeout(() => (e.currentTarget.textContent = 'Copy'), 1600);
    } catch {
      out.select();
      document.execCommand('copy');
    }
  });

  if (cartList || $('[data-cart-count]')) {
    renderCart();
    paintCount();
    document.addEventListener('cart:change', renderCart);
    window.addEventListener('storage', (e) => {
      if (e.key === STORE) {
        paintCount();
        renderCart();
      }
    });
  }

  /* --------------------------------------------------------- contact form */
  const quoteForm = $('[data-quote-form]');
  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const mode = e.submitter?.dataset.send || 'wa';
      const get = (n) => (quoteForm.querySelector(`[name="${n}"]`)?.value || '').trim();
      const lines = [
        'RAYMARK — QUOTE REQUEST',
        '',
        `Name: ${get('name') || '—'}`,
        get('company') ? `Company: ${get('company')}` : '',
        `Email: ${get('email') || '—'}`,
        get('phone') ? `Phone: ${get('phone')}` : '',
        `Need: ${get('interest')}`,
        get('qty') ? `Quantity: ${get('qty')}` : '',
        '',
        get('message') || '(details in the attached artwork)',
      ].filter(Boolean);
      const body = lines.join('\n');
      if (mode === 'mail') {
        location.href = `mailto:info@pmbanner.com?subject=${encodeURIComponent(
          `Cap quote — ${get('company') || get('name') || 'new inquiry'}`
        )}&body=${encodeURIComponent(body)}`;
      } else {
        window.open(`https://wa.me/8615954358307?text=${encodeURIComponent(body)}`, '_blank', 'noopener');
      }
    });
  }

  /* ---------------------------------------------------------------- misc */
  paintCount();
})();
