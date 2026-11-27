// QA pass: internal links, structured data, meta hygiene, page inventory.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(__dirname, '..', 'dist');
const errors = [];
const warnings = [];

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

const files = walk(DIST);
const html = files.filter((f) => f.endsWith('.html'));
const rel = (f) => '/' + path.relative(DIST, f).split(path.sep).join('/');

let linkCount = 0;
const ldTypes = new Map();

for (const file of html) {
  const src = fs.readFileSync(file, 'utf8');
  const url = rel(file).replace(/\/index\.html$/, '/');

  // links + assets
  for (const m of src.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const href = m[1];
    if (/^(https?:|mailto:|tel:|#|data:)/.test(href)) continue;
    if (href.startsWith('//')) continue;
    linkCount++;
    const clean = href.split('#')[0].split('?')[0];
    if (!clean) continue;
    const target = path.join(DIST, clean);
    const ok =
      fs.existsSync(target) ||
      fs.existsSync(path.join(target, 'index.html')) ||
      fs.existsSync(clean.endsWith('.html') ? target : target + '.html');
    if (!ok) errors.push(`${url} → broken link ${href}`);
  }

  // structured data
  for (const m of src.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      const data = JSON.parse(m[1]);
      const t = Array.isArray(data['@type']) ? data['@type'].join('+') : data['@type'];
      ldTypes.set(t, (ldTypes.get(t) || 0) + 1);
    } catch (e) {
      errors.push(`${url} → invalid JSON-LD: ${e.message}`);
    }
  }

  // meta hygiene
  if (!/<link rel="canonical" href="https?:\/\//.test(src)) errors.push(`${url} → missing canonical`);
  const title = src.match(/<title>([^<]*)<\/title>/)?.[1] || '';
  if (title.length > 70) warnings.push(`${url} → title ${title.length} chars`);
  if (title.length < 15) warnings.push(`${url} → title too short (${title.length})`);
  const desc = src.match(/<meta name="description" content="([^"]*)"/)?.[1] || '';
  if (desc.length < 80) warnings.push(`${url} → description ${desc.length} chars`);
  if (desc.length > 175) warnings.push(`${url} → description ${desc.length} chars`);
  const h1s = (src.match(/<h1[\s>]/g) || []).length;
  if (h1s !== 1) errors.push(`${url} → ${h1s} h1 tags`);
  if (!/<html lang="en-US">/.test(src)) errors.push(`${url} → wrong lang`);
  if (/TODO|undefined|\[object Object\]|NaN/.test(src)) errors.push(`${url} → suspicious token in output`);
}

const pedia = html.filter((f) => rel(f).includes('/pedia/') && !rel(f).endsWith('/pedia/index.html'));
const products = html.filter((f) => rel(f).includes('/caps/'));

console.log(`pages: ${html.length}  (products ${products.length}, pedia ${pedia.length})`);
console.log(`internal links checked: ${linkCount}`);
console.log('JSON-LD types:', [...ldTypes.entries()].map(([k, v]) => `${k}×${v}`).join(', '));
if (warnings.length) console.log('\nWARNINGS:\n' + warnings.map((w) => '  · ' + w).join('\n'));
if (errors.length) {
  console.log('\nERRORS:\n' + errors.map((e) => '  × ' + e).join('\n'));
  process.exitCode = 1;
} else {
  console.log('\n✓ no broken links, structured data parses, meta present');
}
