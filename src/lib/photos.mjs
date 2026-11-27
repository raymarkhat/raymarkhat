// Photo registry: real product photos override the generated SVG illustrations.
//
// Drop files into src/assets/photos/ named  <product-slug>-<view>.<ext>
//   signature-6-panel-cap-front.jpg
//   cotton-twill-bucket-hat-front.webp
//   cotton-twill-bucket-hat-side.jpg
//
// views: front | side | top | detail      ext: webp | jpg | jpeg | png
// Anything missing falls back to the generated SVG, so a partial set is fine.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
export const PHOTO_DIR = path.join(here, '..', 'assets', 'photos');

const EXT_RANK = ['.webp', '.jpg', '.jpeg', '.png'];
let cache = null;

function buildIndex() {
  const index = {};
  if (!fs.existsSync(PHOTO_DIR)) return index;
  for (const file of fs.readdirSync(PHOTO_DIR)) {
    const m = file.match(/^(.+)-(front|side|top|detail)\.(webp|jpe?g|png)$/i);
    if (!m) continue;
    const slug = m[1];
    const view = m[2].toLowerCase();
    const ext = '.' + m[3].toLowerCase();
    const prev = index[slug]?.[view];
    // prefer webp > jpg > png when several files exist for the same slot
    if (!prev || EXT_RANK.indexOf(ext) < EXT_RANK.indexOf(prev.ext)) {
      (index[slug] ||= {})[view] = { file, ext };
    }
  }
  return index;
}

export function photoIndex() {
  if (!cache) cache = buildIndex();
  return cache;
}

export const photoFor = (slug, view = 'front') => photoIndex()[slug]?.[view] || null;

export const hasPhotos = (slug) => Object.keys(photoIndex()[slug] || {}).length > 0;

/** public URL for a photo, or null when there is none */
export function photoSrc(slug, view = 'front') {
  const p = photoFor(slug, view);
  return p ? `/assets/img/photos/${slug}-${view}${p.ext}` : null;
}

/** every product photo file, for the build copy step */
export function photoFiles() {
  return Object.values(photoIndex())
    .flatMap((views) => Object.values(views))
    .map((v) => ({ file: v.file, abs: path.join(PHOTO_DIR, v.file) }));
}
