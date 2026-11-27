// Vector cap illustrations — generated, no stock photography, no licensing risk.
// Views: front | side | top | detail

const clamp = (n) => Math.max(0, Math.min(255, Math.round(n)));

function hexToRgb(hex) {
  const h = hex.replace('#', '');
  const v = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  return [parseInt(v.slice(0, 2), 16), parseInt(v.slice(2, 4), 16), parseInt(v.slice(4, 6), 16)];
}
const rgbToHex = (r, g, b) =>
  '#' + [r, g, b].map((n) => clamp(n).toString(16).padStart(2, '0')).join('');

/** amt > 0 lightens, amt < 0 darkens (0-1) */
export function shade(hex, amt) {
  const [r, g, b] = hexToRgb(hex);
  const t = amt < 0 ? 0 : 255;
  const p = Math.abs(amt);
  return rgbToHex(r + (t - r) * p, g + (t - g) * p, b + (t - b) * p);
}

/* ---------------------------------------------------------- silhouettes */
const CROWN =
  'M 228 468 C 224 404 240 330 292 288 C 330 256 570 256 608 288 C 660 330 676 404 672 468 Z';
const VISOR = 'M 186 460 C 296 446 604 446 714 460 C 706 520 620 560 450 560 C 280 560 194 520 186 460 Z';
const VISOR_EDGE = 'M 186 460 C 194 520 280 560 450 560 C 620 560 706 520 714 460';
const VISOR_STITCH = [
  'M 210 474 C 268 526 632 526 690 474',
  'M 234 488 C 288 536 612 536 666 488',
  'M 258 502 C 308 546 592 546 642 502',
];

const SIDE_CROWN =
  'M 240 462 C 238 356 302 252 412 244 C 512 238 574 302 592 384 C 597 412 599 440 598 462 Z';
const SIDE_BRIM = 'M 588 398 C 676 388 774 398 818 428 C 806 458 730 476 644 470 C 600 466 584 440 588 398 Z';
const SIDE_BRIM_EDGE = 'M 588 398 C 676 388 774 398 818 428 C 806 458 730 476 644 470';

function patternDefs(art, uid) {
  const out = [];
  if (art.camo) {
    const b = art.crown;
    out.push(`<pattern id="camo-${uid}" width="118" height="104" patternUnits="userSpaceOnUse">
      <rect width="118" height="104" fill="${b}"/>
      <path d="M2 18c10-14 34-16 46-6s6 24-8 28-30 2-36-8c-4-6-4-10-2-14z" fill="${shade(b, -0.15)}"/>
      <path d="M58 2c14-6 34 0 40 12 5 10-4 20-16 21-14 1-28-8-28-19 0-6 2-11 4-14z" fill="${shade(b, 0.1)}"/>
      <path d="M62 56c12-8 34-4 40 8 5 11-5 24-20 24-14 0-26-9-24-20 1-5 2-9 4-12z" fill="${shade(b, -0.27)}"/>
      <path d="M8 58c12-10 30-8 36 4 5 10-4 22-17 23-12 1-23-7-22-17 0-4 1-7 3-10z" fill="${shade(b, 0.19)}"/>
      <path d="M100 40c10-6 22 0 22 10s-10 16-19 16-16-7-14-15c1-5 5-9 11-11z" fill="${shade(b, -0.09)}"/>
      <path d="M32 30c8-5 18-1 19 7 1 8-6 14-15 13-9-1-13-8-11-14 1-3 3-5 7-6z" fill="${shade(b, 0.24)}"/>
    </pattern>`);
  }
  if (art.cord) {
    out.push(`<pattern id="cord-${uid}" width="9" height="9" patternUnits="userSpaceOnUse">
      <rect width="9" height="9" fill="none"/>
      <path d="M2.5 0v9M6.5 0v9" stroke="${shade(art.crown, -0.34)}" stroke-width="2.2" opacity=".45"/>
    </pattern>`);
  }
  if (art.mesh) {
    out.push(`<pattern id="mesh-${uid}" width="15" height="15" patternUnits="userSpaceOnUse">
      <rect width="15" height="15" fill="${art.mesh}"/>
      <circle cx="4" cy="4" r="1.8" fill="${shade(art.mesh, -0.26)}"/>
      <circle cx="11.5" cy="11.5" r="1.8" fill="${shade(art.mesh, -0.26)}"/>
    </pattern>`);
  }
  if (art.perf) {
    out.push(`<pattern id="perf-${uid}" width="24" height="24" patternUnits="userSpaceOnUse">
      <circle cx="6" cy="6" r="2.6" fill="${shade(art.crown, -0.3)}"/>
      <circle cx="18" cy="18" r="2.6" fill="${shade(art.crown, -0.3)}"/>
    </pattern>`);
  }
  return out.join('\n');
}

function baseDefs(art, uid) {
  return `<defs>
    <linearGradient id="shade-${uid}" x1="0.1" y1="0" x2="0.6" y2="1">
      <stop offset="0" stop-color="#ffffff" stop-opacity=".2"/>
      <stop offset=".42" stop-color="#ffffff" stop-opacity=".02"/>
      <stop offset="1" stop-color="#000000" stop-opacity=".16"/>
    </linearGradient>
    <linearGradient id="cyl-${uid}" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#000000" stop-opacity=".26"/>
      <stop offset=".12" stop-color="#000000" stop-opacity=".1"/>
      <stop offset=".34" stop-color="#ffffff" stop-opacity=".1"/>
      <stop offset=".55" stop-color="#ffffff" stop-opacity=".02"/>
      <stop offset=".78" stop-color="#000000" stop-opacity=".08"/>
      <stop offset="1" stop-color="#000000" stop-opacity=".28"/>
    </linearGradient>
    <linearGradient id="brimface-${uid}" x1="0.5" y1="0" x2="0.5" y2="1">
      <stop offset="0" stop-color="#ffffff" stop-opacity=".14"/>
      <stop offset=".45" stop-color="#ffffff" stop-opacity="0"/>
      <stop offset="1" stop-color="#000000" stop-opacity=".2"/>
    </linearGradient>
    <radialGradient id="shadow-${uid}" cx=".5" cy=".5" r=".5">
      <stop offset="0" stop-color="#1a1408" stop-opacity=".32"/>
      <stop offset="1" stop-color="#1a1408" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="bgg-${uid}" x1="0" y1="0" x2="0.4" y2="1">
      <stop offset="0" stop-color="${shade(art.bg, 0.18)}"/>
      <stop offset="1" stop-color="${shade(art.bg, -0.09)}"/>
    </linearGradient>
    ${patternDefs(art, uid)}
  </defs>`;
}

const dash = (d, color, op = 0.4, w = 1.8, arr = '4 8') =>
  `<path d="${d}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round" stroke-dasharray="${arr}" opacity="${op}"/>`;

function markText(art, x, y, size, color) {
  if (!art.mark) return '';
  const s = size * (art.markScale || 1);
  const len = art.mark.length;
  const tracking = Math.max(1, Math.round(s * 0.11));
  const w = len * s * 0.64 + tracking * (len - 1);
  const t = Math.min(1, 236 / Math.max(w, 1));
  return `<text x="${x}" y="${y}" text-anchor="middle" font-family="Arial Black, Arial, Helvetica, sans-serif"
    font-weight="900" font-size="${(s * t).toFixed(1)}" letter-spacing="${(tracking * t).toFixed(1)}"
    fill="${color}">${art.mark}</text>`;
}

/* --------------------------------------------------------------- front */
function frontBody(art, uid) {
  const { crown, brim, accent, stitch } = art;
  const out = [];

  // visor first — the crown overlaps its rear half
  out.push(`<path d="${VISOR}" fill="${brim}"/>`);
  out.push(`<path d="${VISOR}" fill="url(#brimface-${uid})"/>`);
  out.push(`<path d="${VISOR_EDGE}" fill="none" stroke="${shade(brim, -0.5)}" stroke-width="2.6" opacity=".26"/>`);
  VISOR_STITCH.forEach((d, i) =>
    out.push(dash(d, stitch, (0.36 - i * 0.07).toFixed(2), 1.7, '6 9'))
  );

  // crown
  out.push(`<path d="${CROWN}" fill="${art.mesh ? `url(#mesh-${uid})` : crown}"/>`);
  if (art.mesh) {
    out.push(`<path d="M 292 468 C 288 344 336 246 450 242 C 564 246 612 344 608 468 Z" fill="${crown}"/>`);
  }
  if (art.camo) out.push(`<path d="${CROWN}" fill="url(#camo-${uid})"/>`);
  if (art.cord) out.push(`<path d="${CROWN}" fill="url(#cord-${uid})"/>`);
  out.push(`<path d="${CROWN}" fill="url(#shade-${uid})"/>`);
  out.push(`<path d="${CROWN}" fill="url(#cyl-${uid})"/>`);
  out.push(`<path d="${CROWN}" fill="none" stroke="${shade(crown, -0.55)}" stroke-width="2" opacity=".2"/>`);

  // contact shadow where the crown meets the visor
  out.push(`<ellipse cx="450" cy="470" rx="216" ry="18" fill="#000000" opacity=".2"/>`);

  // seams
  const seams = art.fivePanel
    ? ['M 450 262 C 438 334 420 414 402 468', 'M 450 262 C 462 334 480 414 498 468']
    : ['M 450 262 L 450 468', 'M 450 262 C 424 334 398 414 374 468', 'M 450 262 C 476 334 502 414 526 468'];
  for (const s of seams) {
    out.push(`<path d="${s}" fill="none" stroke="${shade(crown, -0.45)}" stroke-width="1.8" opacity=".2"/>`);
    out.push(dash(s, stitch, 0.2, 1.3, '3 8'));
  }

  // rope trim
  if (art.rope) {
    out.push(`<path d="M 238 458 C 320 476 580 476 662 458" fill="none" stroke="${art.rope}" stroke-width="13" stroke-linecap="round"/>`);
    out.push(`<path d="M 238 458 C 320 476 580 476 662 458" fill="none" stroke="${shade(art.rope, -0.4)}" stroke-width="13"
      stroke-linecap="round" stroke-dasharray="4 7" opacity=".5"/>`);
  }

  // button
  out.push(`<ellipse cx="450" cy="262" rx="14" ry="8" fill="${shade(crown, -0.32)}"/>`);
  out.push(`<ellipse cx="450" cy="262" rx="14" ry="8" fill="none" stroke="${shade(crown, 0.45)}" stroke-width="1.3" opacity=".28"/>`);

  // mark
  if (art.patch) {
    out.push(`<rect x="340" y="308" width="220" height="112" rx="14" fill="${art.patch}"/>`);
    out.push(`<rect x="340" y="308" width="220" height="112" rx="14" fill="url(#shade-${uid})" opacity=".45"/>`);
    out.push(
      `<rect x="352" y="320" width="196" height="88" rx="9" fill="none" stroke="${stitch}" stroke-width="2.2"
        stroke-dasharray="6 6" opacity=".8"/>`
    );
    out.push(markText(art, 450, 377, 44, accent));
  } else {
    out.push(markText(art, 450, 408, art.puff ? 51 : 46, accent));
  }
  return out.join('\n');
}

/* ---------------------------------------------------------------- side */
function sideBody(art, uid) {
  const { crown, brim, accent, stitch } = art;
  const out = [];
  out.push(`<path d="${SIDE_CROWN}" fill="${art.mesh ? `url(#mesh-${uid})` : crown}"/>`);
  if (art.mesh) out.push(`<path d="M 590 462 C 594 372 556 270 486 246 C 532 284 558 358 564 462 Z" fill="${crown}"/>`);
  if (art.camo) out.push(`<path d="${SIDE_CROWN}" fill="url(#camo-${uid})"/>`);
  if (art.cord) out.push(`<path d="${SIDE_CROWN}" fill="url(#cord-${uid})"/>`);
  out.push(`<path d="${SIDE_CROWN}" fill="url(#shade-${uid})"/>`);
  out.push(`<path d="${SIDE_CROWN}" fill="url(#cyl-${uid})" opacity=".7"/>`);

  for (const s of ['M 412 246 C 376 326 352 400 344 462', 'M 412 246 C 468 302 534 352 580 424']) {
    out.push(`<path d="${s}" fill="none" stroke="${shade(crown, -0.45)}" stroke-width="1.8" opacity=".2"/>`);
    out.push(dash(s, stitch, 0.16, 1.3, '3 8'));
  }

  // rear strap
  out.push(`<path d="M 242 448 c -20 5 -24 13 -3 17" fill="none" stroke="${shade(crown, -0.45)}" stroke-width="8" stroke-linecap="round" opacity=".8"/>`);

  out.push(`<path d="${SIDE_BRIM}" fill="${brim}"/>`);
  out.push(`<path d="${SIDE_BRIM}" fill="url(#brimface-${uid})"/>`);
  out.push(`<path d="${SIDE_BRIM_EDGE}" fill="none" stroke="${shade(brim, -0.5)}" stroke-width="2.2" opacity=".26"/>`);
  out.push(dash('M 620 414 C 700 405 774 414 798 428 C 782 448 714 456 646 452', stitch, 0.3, 1.7, '6 9'));

  if (art.rope) {
    out.push(`<path d="M 250 456 C 334 470 496 474 584 466" fill="none" stroke="${art.rope}" stroke-width="13" stroke-linecap="round"/>`);
  }

  out.push(`<ellipse cx="412" cy="246" rx="14" ry="8" fill="${shade(crown, -0.32)}"/>`);
  out.push(markText({ ...art, mark: art.mark ? art.mark.slice(0, 4) : '' }, 480, 410, 29, accent));
  return out.join('\n');
}

/* ----------------------------------------------------------------- top */
function topBody(art, uid) {
  const { crown, brim, accent, stitch } = art;
  const out = [];
  out.push(`<ellipse cx="450" cy="418" rx="244" ry="104" fill="${brim}"/>`);
  out.push(`<ellipse cx="450" cy="418" rx="244" ry="104" fill="url(#brimface-${uid})"/>`);
  out.push(`<ellipse cx="450" cy="418" rx="244" ry="104" fill="none" stroke="${shade(brim, -0.5)}" stroke-width="2" opacity=".22"/>`);
  out.push(
    `<path d="M 224 452 C 296 540 604 540 676 452" fill="none" stroke="${stitch}" stroke-width="1.7"
      stroke-dasharray="6 9" opacity=".4"/>`
  );
  out.push(`<ellipse cx="450" cy="286" rx="200" ry="164" fill="${crown}"/>`);
  if (art.camo) out.push(`<ellipse cx="450" cy="286" rx="200" ry="164" fill="url(#camo-${uid})"/>`);
  if (art.cord) out.push(`<ellipse cx="450" cy="286" rx="200" ry="164" fill="url(#cord-${uid})"/>`);
  if (art.mesh) out.push(`<ellipse cx="450" cy="286" rx="200" ry="164" fill="url(#mesh-${uid})" opacity=".6"/>`);
  out.push(`<ellipse cx="450" cy="286" rx="200" ry="164" fill="url(#shade-${uid})"/>`);
  out.push(`<ellipse cx="450" cy="286" rx="200" ry="164" fill="url(#cyl-${uid})" opacity=".55"/>`);
  const n = art.fivePanel ? 5 : 6;
  for (let i = 0; i < n; i++) {
    const a = (Math.PI * 2 * i) / n + Math.PI / 2;
    const x = 450 + 200 * Math.cos(a);
    const y = 286 + 164 * Math.sin(a);
    out.push(`<path d="M 450 286 L ${x.toFixed(1)} ${y.toFixed(1)}" stroke="${shade(crown, -0.45)}" stroke-width="1.7" opacity=".24"/>`);
  }
  out.push(`<circle cx="450" cy="286" r="17" fill="${shade(crown, -0.3)}" stroke="${shade(crown, 0.45)}" stroke-width="1.4" opacity=".9"/>`);
  out.push(markText(art, 450, 410, 33, accent));
  return out.join('\n');
}

/* ============================================================ other shapes */

const BUCKET_CROWN = 'M 276 438 C 276 352 334 284 450 284 C 566 284 624 352 624 438 Z';
const BUCKET_BRIM =
  'M 300 428 C 244 458 196 506 182 556 C 280 590 620 590 718 556 C 704 506 656 458 600 428 Z';

function bucketBody(art, uid) {
  const { crown, brim, accent, stitch } = art;
  const out = [];
  out.push(`<path d="${BUCKET_BRIM}" fill="${brim}"/>`);
  out.push(`<path d="${BUCKET_BRIM}" fill="url(#brimface-${uid})"/>`);
  out.push(`<path d="${BUCKET_BRIM}" fill="none" stroke="${shade(brim, -0.45)}" stroke-width="2.4" opacity=".28"/>`);
  ['M 196 506 C 268 542 632 542 704 506', 'M 220 522 C 288 552 612 552 680 522'].forEach((d, i) =>
    out.push(dash(d, stitch, (0.4 - i * 0.08).toFixed(2), 1.7, '6 9'))
  );
  out.push(`<path d="${BUCKET_CROWN}" fill="${crown}"/>`);
  if (art.camo) out.push(`<path d="${BUCKET_CROWN}" fill="url(#camo-${uid})"/>`);
  if (art.cord) out.push(`<path d="${BUCKET_CROWN}" fill="url(#cord-${uid})"/>`);
  if (art.mesh) out.push(`<path d="${BUCKET_CROWN}" fill="url(#mesh-${uid})" opacity=".85"/>`);
  out.push(`<path d="${BUCKET_CROWN}" fill="url(#shade-${uid})"/>`);
  out.push(`<path d="${BUCKET_CROWN}" fill="url(#cyl-${uid})"/>`);
  out.push(`<path d="${BUCKET_CROWN}" fill="none" stroke="${shade(crown, -0.5)}" stroke-width="2" opacity=".2"/>`);
  out.push(`<ellipse cx="450" cy="432" rx="150" ry="14" fill="#000000" opacity=".16"/>`);
  // panel seams: bucket crowns are usually 4 or 6 panel
  for (const s of ['M 450 302 L 450 428', 'M 450 302 C 406 350 376 396 366 428', 'M 450 302 C 494 350 524 396 534 428']) {
    out.push(`<path d="${s}" fill="none" stroke="${shade(crown, -0.42)}" stroke-width="1.6" opacity=".16"/>`);
  }
  for (const [cx, cy] of [
    [356, 360],
    [544, 360],
  ]) {
    out.push(`<circle cx="${cx}" cy="${cy}" r="5" fill="${shade(crown, -0.55)}" opacity=".45"/>`);
  }
  out.push(markText(art, 450, 400, art.puff ? 46 : 42, accent));
  return out.join('\n');
}

const VISOR_BAND =
  'M 258 470 C 258 386 330 320 450 320 C 570 320 642 386 642 470 L 584 470 C 584 400 526 368 450 368 C 374 368 316 400 316 470 Z';
const VISOR_BRIM =
  'M 250 468 C 330 456 570 456 650 468 C 700 505 620 588 450 588 C 280 588 200 505 250 468 Z';

function visorBody(art, uid) {
  const { crown, brim, accent, stitch } = art;
  const out = [];
  // open-top band first (evenodd creates the hole), brim overlaps its base
  out.push(`<path d="${VISOR_BAND}" fill="${crown}" fill-rule="evenodd"/>`);
  out.push(`<path d="${VISOR_BAND}" fill="url(#shade-${uid})" fill-rule="evenodd"/>`);
  out.push(`<path d="${VISOR_BAND}" fill="none" stroke="${shade(crown, -0.4)}" stroke-width="2" opacity=".26"/>`);
  out.push(`<path d="${VISOR_BRIM}" fill="${brim}"/>`);
  out.push(`<path d="${VISOR_BRIM}" fill="url(#brimface-${uid})"/>`);
  out.push(`<path d="${VISOR_BRIM}" fill="none" stroke="${shade(brim, -0.45)}" stroke-width="2.4" opacity=".26"/>`);
  ['M 208 476 C 298 524 602 524 692 476', 'M 234 494 C 316 536 584 536 666 494'].forEach((d, i) =>
    out.push(dash(d, stitch, (0.38 - i * 0.08).toFixed(2), 1.7, '6 9'))
  );
  out.push(
    `<path d="M 300 462 C 360 446 540 446 600 462" fill="none" stroke="${shade(crown, -0.45)}" stroke-width="2" opacity=".18"/>`
  );
  out.push(markText(art, 450, 432, art.puff ? 34 : 31, accent));
  return out.join('\n');
}

const BERET_DISC =
  'M 170 410 C 178 356 300 330 452 330 C 606 330 700 356 708 410 C 712 440 698 458 658 462 L 244 462 C 204 458 168 440 170 410 Z';
const BERET_BAND = 'M 330 458 L 570 458 L 566 498 C 520 514 380 514 334 498 Z';

function beretBody(art, uid) {
  const { crown, brim, accent } = art;
  const out = [];
  // band peeking under the disc
  out.push(`<path d="${BERET_BAND}" fill="${brim}"/>`);
  out.push(`<path d="${BERET_BAND}" fill="url(#shade-${uid})"/>`);
  out.push(`<path d="${BERET_DISC}" fill="${crown}"/>`);
  out.push(`<path d="${BERET_DISC}" fill="url(#shade-${uid})"/>`);
  out.push(`<path d="${BERET_DISC}" fill="url(#cyl-${uid})" opacity=".55"/>`);
  // soft fold highlight across the disc
  out.push(
    `<path d="M 240 386 C 300 350 380 338 450 338 C 520 338 600 350 656 384" fill="none"
      stroke="${shade(crown, 0.35)}" stroke-width="2.4" opacity=".2" stroke-linecap="round"/>`
  );
  out.push(`<path d="${BERET_DISC}" fill="none" stroke="${shade(crown, -0.5)}" stroke-width="2" opacity=".2"/>`);
  // stem
  out.push(`<path d="M 450 334 l 0 -12" stroke="${shade(crown, -0.35)}" stroke-width="5" stroke-linecap="round" opacity=".7"/>`);
  out.push(`<circle cx="450" cy="318" r="5" fill="${shade(crown, -0.25)}"/>`);
  out.push(markText(art, 450, 424, art.puff ? 38 : 34, accent));
  return out.join('\n');
}
const COWBOY_BRIM =
  'M 116 400 C 250 448 650 448 784 400 C 800 452 748 512 630 536 C 552 552 348 552 270 536 C 152 512 100 452 116 400 Z';
const COWBOY_CROWN =
  'M 306 442 C 306 344 334 288 366 278 C 396 270 424 306 450 306 C 476 306 504 270 534 278 C 566 288 594 344 594 442 Z';

function cowboyBody(art, uid) {
  const { crown, brim, accent, stitch } = art;
  const out = [];
  out.push(`<path d="${COWBOY_BRIM}" fill="${brim}"/>`);
  out.push(`<path d="${COWBOY_BRIM}" fill="url(#brimface-${uid})"/>`);
  out.push(`<path d="${COWBOY_BRIM}" fill="none" stroke="${shade(brim, -0.45)}" stroke-width="2.6" opacity=".26"/>`);
  out.push(dash('M 150 470 C 260 508 640 508 750 470', stitch, 0.34, 1.7, '6 10'));
  out.push(`<path d="${COWBOY_CROWN}" fill="${crown}"/>`);
  out.push(`<path d="${COWBOY_CROWN}" fill="url(#shade-${uid})"/>`);
  out.push(`<path d="${COWBOY_CROWN}" fill="url(#cyl-${uid})" opacity=".7"/>`);
  out.push(`<path d="${COWBOY_CROWN}" fill="none" stroke="${shade(crown, -0.5)}" stroke-width="2" opacity=".22"/>`);
  // crown crease
  out.push(
    `<path d="M 366 284 C 400 320 420 330 450 330 C 480 330 500 320 534 284" fill="none"
      stroke="${shade(crown, -0.5)}" stroke-width="3" opacity=".22" stroke-linecap="round"/>`
  );
  // hat band + buckle
  out.push(`<path d="M 310 400 C 350 414 550 414 590 400 L 588 428 C 550 442 350 442 312 428 Z" fill="${brim}"/>`);
  out.push(`<path d="M 310 400 C 350 414 550 414 590 400 L 588 428 C 550 442 350 442 312 428 Z" fill="url(#shade-${uid})"/>`);
  out.push(`<rect x="432" y="402" width="36" height="30" rx="3" fill="${accent}" opacity=".9"/>`);
  out.push(markText(art, 450, 372, art.puff ? 34 : 30, accent));
  return out.join('\n');
}

export function capSvg(art, view = 'front', opts = {}) {
  const uid = opts.uid || Math.random().toString(36).slice(2, 8);
  const bg = opts.transparent
    ? ''
    : `<rect width="900" height="760" fill="url(#bgg-${uid})"/>
    <g opacity=".14" stroke="${shade(art.bg, -0.5)}" stroke-width="1">
      ${[0, 1, 2, 3, 4, 5, 6, 7]
        .map((i) => `<line x1="${i * 128}" y1="0" x2="${i * 128 - 220}" y2="760"/>`)
        .join('')}
    </g>`;

  const shadow = opts.transparent ? '' : `<ellipse cx="452" cy="606" rx="280" ry="24" fill="url(#shadow-${uid})"/>`;

  const shape = art.shape || 'baseball';
  const shapeBody = {
    bucket: bucketBody,
    visor: visorBody,
    beret: beretBody,
    cowboy: cowboyBody,
  }[shape];
  // non-baseball shapes are only modelled from the front
  const v = shapeBody && (view === 'side' || view === 'top') ? 'front' : view;

  let body;
  if (shapeBody && v !== 'detail') {
    body = `${bg}${shadow}${shapeBody(art, uid)}`;
  } else if (v === 'side') body = `${bg}${shadow}${sideBody(art, uid)}`;
  else if (v === 'top') body = `${bg}${shadow}${topBody(art, uid)}`;
  else if (v === 'detail') {
    const inner = shapeBody ? shapeBody(art, uid) : frontBody(art, uid);
    body = `${bg}<g transform="translate(-375,-215) scale(1.85)">
        <rect x="200" y="110" width="1000" height="580" fill="${shade(art.bg, 0.05)}"/>
        ${inner}
      </g>`;
  } else body = `${bg}${shadow}${frontBody(art, uid)}`;

  const shapeZoom = { cowboy: 0.94, bucket: 1.02, beret: 1, visor: 1.05 }[shape] ?? 1.14;
  const zoom = opts.zoom ?? (opts.transparent ? 1 : shapeZoom);
  const framed =
    zoom === 1
      ? body
      : `<g transform="translate(450 386) scale(${zoom}) translate(-450 -386)">${body}</g>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 760" width="900" height="760" role="img" aria-label="${opts.label || 'Baseball cap'}">
  ${baseDefs(art, uid)}
  ${framed}
</svg>`;
}
