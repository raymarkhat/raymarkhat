// Photo workflow CLI.
//
//   node tools/photos.mjs list                 → every required filename (copy/paste into your rename sheet)
//   node tools/photos.mjs list --csv > names.csv
//   node tools/photos.mjs check                → what is missing, undersized or too heavy
//   node tools/photos.mjs import <folder>      → match by slug, normalise names, copy into src/assets/photos
//   node tools/photos.mjs import <folder> --move --view front
//   node tools/photos.mjs clear                → remove all imported photos (back to illustrations)
//
// Naming convention: <product-slug>-<view>.<ext>   e.g. signature-6-panel-cap-front.jpg
// Any file whose name contains the slug is matched, so "Signature 6-Panel (1).JPG" works too.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(here, '..');
const PHOTO_DIR = path.join(root, 'src', 'assets', 'photos');

const { products } = await import(new URL('../src/lib/catalog.mjs', import.meta.url).href);

const args = process.argv.slice(2);
const cmd = args[0] || 'list';
const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

fs.mkdirSync(PHOTO_DIR, { recursive: true });

/* --------------------------------------------------------------------- list */
if (cmd === 'list') {
  const csv = args.includes('--csv');
  if (csv) console.log('filename,product,category');
  for (const p of products) {
    const name = `${p.slug}-front.jpg`;
    if (csv) console.log(`${name},"${p.name}",${p.cat}`);
    else console.log(`${name.padEnd(48)} ${p.name}`);
  }
  if (!csv) {
    console.log(`\n${products.length} products. Optional extra views: -side, -top, -detail`);
  }
  process.exit(0);
}

/* -------------------------------------------------------------------- check */
if (cmd === 'check') {
  const files = fs.existsSync(PHOTO_DIR) ? fs.readdirSync(PHOTO_DIR) : [];
  const found = new Map();
  for (const f of files) {
    const m = f.match(/^(.+)-(front|side|top|detail)\.(webp|jpe?g|png)$/i);
    if (m) found.set(`${m[1]}|${m[2].toLowerCase()}`, f);
  }
  const missing = products.filter((p) => !found.has(`${p.slug}|front`));
  console.log(`photos present: ${found.size}   products covered: ${products.length - missing.length}/${products.length}`);
  if (missing.length) {
    console.log(`\nmissing front photo (${missing.length}):`);
    for (const p of missing) console.log(`  ${p.slug}-front.jpg   ${p.name}`);
  }
  // size sanity
  for (const [key, file] of found) {
    const { size } = fs.statSync(path.join(PHOTO_DIR, file));
    if (size > 400 * 1024) console.log(`  ⚠ ${file} is ${(size / 1024).toFixed(0)} KB — aim for < 300 KB`);
  }
  process.exit(0);
}

/* ------------------------------------------------------------------- import */
if (cmd === 'import') {
  const src = args[1];
  if (!src) {
    console.error('usage: node tools/photos.mjs import <folder> [--move] [--view front]');
    process.exit(1);
  }
  const move = args.includes('--move');
  const viewArg = args.indexOf('--view');
  const view = viewArg > -1 ? args[viewArg + 1] : 'front';
  const dir = path.resolve(src);
  if (!fs.existsSync(dir)) {
    console.error(`folder not found: ${dir}`);
    process.exit(1);
  }

  const bySlug = [...products]
    .map((p) => ({ p, key: p.slug, loose: slugify(p.name) }))
    .sort((a, b) => b.key.length - a.key.length);

  const files = fs.readdirSync(dir).filter((f) => /\.(webp|jpe?g|png)$/i.test(f));
  let matched = 0;
  const unmatched = [];

  for (const file of files) {
    const base = slugify(path.parse(file).name);
    // exact slug first, then slug inside the name, then the product name slugified
    const hit =
      bySlug.find((x) => base === x.key) ||
      bySlug.find((x) => base.startsWith(x.key)) ||
      bySlug.find((x) => base.includes(x.key)) ||
      bySlug.find((x) => base.includes(x.loose));
    if (!hit) {
      unmatched.push(file);
      continue;
    }
    const ext = path.extname(file).toLowerCase().replace('.jpeg', '.jpg');
    const target = path.join(PHOTO_DIR, `${hit.p.slug}-${view}${ext}`);
    if (move) fs.renameSync(path.join(dir, file), target);
    else fs.copyFileSync(path.join(dir, file), target);
    matched++;
    console.log(`  ✓ ${file}  →  ${hit.p.slug}-${view}${ext}`);
  }

  console.log(`\nmatched ${matched}/${files.length}`);
  if (unmatched.length) {
    console.log(`unmatched (rename to <slug>-${view}.jpg):`);
    for (const f of unmatched.slice(0, 30)) console.log(`  ${f}`);
  }
  console.log(`\nnext: npm run build:pages`);
  process.exit(0);
}

/* -------------------------------------------------------------------- clear */
if (cmd === 'clear') {
  const files = fs.existsSync(PHOTO_DIR) ? fs.readdirSync(PHOTO_DIR).filter((f) => /\.(webp|jpe?g|png)$/i.test(f)) : [];
  for (const f of files) fs.unlinkSync(path.join(PHOTO_DIR, f));
  console.log(`removed ${files.length} photos — the site falls back to illustrations`);
  process.exit(0);
}

console.error(`unknown command "${cmd}" — use list | check | import | clear`);
process.exit(1);
