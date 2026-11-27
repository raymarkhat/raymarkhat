import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { products as baseProducts } from '../data/products.mjs';
import { parents, children, childBySlug, parentBySlug, programShapes } from '../data/taxonomy.mjs';
import { photoIndex } from './photos.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const catalogDir = path.join(here, '..', 'data', 'catalog');

/* base catalogue → category assignment (the 16 original SKUs) */
const BASE_CATS = {
  'signature-6-panel-cap': 'classic-baseball-cap',
  'leather-patch-cap': 'classic-baseball-cap',
  'camp-5-panel-cap': 'classic-baseball-cap',
  'classic-dad-hat': 'dad-hats',
  'washed-vintage-cap': 'dad-hats',
  'corduroy-cap': 'dad-hats',
  'huddle-dad-hat': 'dad-hats',
  'pro-fit-fitted-cap': 'fitted-caps',
  'flat-brim-snapback': 'snapback-caps',
  'rope-cap': 'snapback-caps',
  'trucker-mesh-cap': 'trucker-caps',
  'performance-golf-cap': 'golf-caps',
  'gridiron-snapback': 'nfl-colorways',
  'end-zone-camo-cap': 'nfl-colorways',
  'turf-trucker': 'nfl-colorways',
  'saturday-rope-cap': 'nba-colorways',
};

function loadExtra() {
  if (!fs.existsSync(catalogDir)) return [];
  return fs
    .readdirSync(catalogDir)
    .filter((f) => f.endsWith('.json'))
    .sort()
    .flatMap((f) => {
      const raw = fs.readFileSync(path.join(catalogDir, f), 'utf8').replace(/^\uFEFF/, '');
      try {
        return JSON.parse(raw);
      } catch (err) {
        throw new Error(`Invalid JSON in ${f}: ${err.message}`);
      }
    });
}

const extra = loadExtra();

export const products = [...baseProducts, ...extra].map((p) => {
  const cat = p.cat || BASE_CATS[p.slug];
  if (!cat) throw new Error(`product ${p.slug} has no category (add it to BASE_CATS or the JSON)`);
  if (!childBySlug[cat]) throw new Error(`product ${p.slug} points at unknown category "${cat}"`);
  const shape = p.shape || p.art?.shape || 'baseball';
  return {
    ...p,
    cat,
    shape,
    art: { ...p.art, shape },
    parent: childBySlug[cat].parent,
  };
});

export const bySlug = Object.fromEntries(products.map((p) => [p.slug, p]));

export const productsIn = (childSlug) => products.filter((p) => p.cat === childSlug);

export const productsUnder = (parentSlug) =>
  products.filter((p) => p.parent === parentSlug);

/** items shown on a custom program page */
export function productsForProgram(childSlug) {
  const shapes = programShapes[childSlug] || ['baseball'];
  const pool = products.filter((p) => shapes.includes(p.shape));
  // prefer SKUs already tagged for that program, then the cheapest representatives
  const tagged = pool.filter((p) => (p.tags || []).includes(childSlug));
  const rest = pool.filter((p) => !tagged.includes(p));
  return [...tagged, ...rest].slice(0, 6);
}

/** sibling categories for the "related" strip */
export const siblingsOf = (childSlug) => {
  const child = childBySlug[childSlug];
  if (!child) return [];
  return parents
    .find((p) => p.slug === child.parent)
    .children.filter((s) => s !== childSlug)
    .map((s) => childBySlug[s]);
};

/** representative SKU for a category card (program parents borrow from their children) */
export const heroFor = (parentSlug) => {
  const own = products.find((x) => x.parent === parentSlug);
  if (own) return own;
  for (const k of parentBySlug[parentSlug]?.children || []) {
    const p = productsForProgram(k)[0];
    if (p) return p;
  }
  return products[0];
};

export const viewsFor = (p) => {
  const photos = photoIndex()[p.slug];
  if (photos && Object.keys(photos).length) {
    const order = ['front', 'side', 'top', 'detail'];
    return order.filter((v) => photos[v]).concat(photos.front ? [] : ['front']);
  }
  return p.shape === 'baseball' ? ['front', 'side', 'top'] : ['front', 'detail'];
};

export { parents, children, childBySlug, parentBySlug };
