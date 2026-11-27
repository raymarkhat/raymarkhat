import { esc } from './render.mjs';
import { parents } from '../data/taxonomy.mjs';

/**
 * Sticky category bar.
 *
 * Row 1 — every top-level category, with an optional back button to the parent.
 * Row 2 — (category pages only) the sub-categories of the current category.
 *
 * A parent already named on the back button is never repeated inside the rows.
 */
export function categoryBar({ active = null, backHref = null, backLabel = null, subs = null } = {}) {
  const back =
    backHref && backLabel
      ? `<a class="catnav__link catnav__back" href="${backHref}"><span aria-hidden="true">←</span> ${esc(
          backLabel
        )}</a><span class="catnav__sep" aria-hidden="true"></span>`
      : '';

  const links = parents
    .map((p) => {
      const current = p.slug === active ? ' aria-current="page"' : '';
      return `<a class="catnav__link" href="/${p.slug}/"${current}>${esc(p.name)}</a>`;
    })
    .join('');

  const subRow =
    subs && subs.length
      ? `<div class="catnav__inner catnav__inner--sub" aria-label="Sub-categories">
          ${subs
            .map(
              (s) =>
                `<a class="catnav__link catnav__sublink"${
                  s.active ? ' aria-current="page"' : ''
                } href="${s.href}">${esc(s.name)}</a>`
            )
            .join('')}
        </div>`
      : '';

  return `<nav class="catnav" aria-label="Shop categories">
    <div class="wrap">
      <div class="catnav__inner">${back}${links}</div>
      ${subRow}
    </div>
  </nav>`;
}
