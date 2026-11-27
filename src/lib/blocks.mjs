import { esc } from './render.mjs';

/** Inline formatting for pedia JSON copy: **bold**, *italic*, [text](url) */
export function inline(text = '') {
  let s = esc(text);
  s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (m, label, href) => {
    const safe = /^(https?:\/\/|\/)/.test(href) ? href : '#';
    const ext = /^https?:/.test(safe) ? ' target="_blank" rel="noopener"' : '';
    return `<a href="${safe}"${ext}>${label}</a>`;
  });
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/(^|[\s(])\*([^*]+)\*(?=[\s.,;:!?)]|$)/g, '$1<em>$2</em>');
  return s;
}

function table(b) {
  return `<div class="table-wrap"><table class="data">
    ${b.caption ? `<caption class="small" style="text-align:left;padding:12px 18px 0;color:var(--muted)">${inline(b.caption)}</caption>` : ''}
    <thead><tr>${b.head.map((h) => `<th scope="col">${inline(h)}</th>`).join('')}</tr></thead>
    <tbody>${b.rows.map((r) => `<tr>${r.map((c, i) => (i === 0 ? `<th scope="row">${inline(c)}</th>` : `<td>${inline(c)}</td>`)).join('')}</tr>`).join('')}</tbody>
  </table></div>`;
}

function block(b) {
  switch (b.type) {
    case 'p':
      return `<p>${inline(b.text)}</p>`;
    case 'h3':
      return `<h3>${inline(b.text)}</h3>`;
    case 'ul':
      return `<ul>${b.items.map((i) => `<li>${inline(i)}</li>`).join('')}</ul>`;
    case 'ol':
      return `<ol>${b.items.map((i) => `<li>${inline(i)}</li>`).join('')}</ol>`;
    case 'steps':
      return `<ol class="steps-list">${b.items
        .map((s) => `<li><b>${inline(s.title)}</b>${s.text ? ` ${inline(s.text)}` : ''}</li>`)
        .join('')}</ol>`;
    case 'table':
      return table(b);
    case 'callout':
      return `<aside class="callout callout--${b.tone || 'note'}">
        ${b.title ? `<span class="callout__title">${inline(b.title)}</span>` : ''}
        ${inline(b.text)}
      </aside>`;
    case 'quote':
      return `<blockquote class="callout callout--note">${inline(b.text)}</blockquote>`;
    default:
      return '';
  }
}

export function renderSections(article) {
  return article.sections
    .map(
      (s) => `<section id="${esc(slugify(s.h2))}">
        <h2>${inline(s.h2)}</h2>
        ${s.blocks.map(block).join('\n')}
      </section>`
    )
    .join('\n');
}

export const slugify = (s) =>
  String(s)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60);
