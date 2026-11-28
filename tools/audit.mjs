// Full-site SEO/GEO audit: crawls every URL in the sitemap and reports
// measurable signals (titles, descriptions, headings, schema, alt coverage,
// word counts, internal links, duplicates).
//
//   node tools/audit.mjs [baseUrl]
//
// Writes _audit/audit.json and prints a summary.

import fs from 'node:fs';
import path from 'node:path';

const BASE = (process.argv[2] || 'https://raymarkhat.com').replace(/\/$/, '');
const CONCURRENCY = 6;

const get = async (url, tries = 3) => {
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(url, { headers: { 'user-agent': 'RaymarkAudit/1.0' } });
      return { status: res.status, body: await res.text(), headers: res.headers };
    } catch (err) {
      if (i === tries - 1) return { status: 0, body: '', error: String(err.message) };
      await new Promise((r) => setTimeout(r, 400 * (i + 1)));
    }
  }
};

const textOf = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const count = (s, re) => (s.match(re) || []).length;

function analyse(url, html, status) {
  const head = (html.match(/<head[\s\S]*?<\/head>/i) || [''])[0];
  const body = html.replace(head, '');
  const title = (head.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [, ''])[1].trim();
  const desc = (head.match(/<meta\s+name="description"\s+content="([^"]*)"/i) || [, ''])[1];
  const canonical = (head.match(/<link\s+rel="canonical"\s+href="([^"]*)"/i) || [, ''])[1];
  const robots = (head.match(/<meta\s+name="robots"\s+content="([^"]*)"/i) || [, ''])[1];
  const lang = (html.match(/<html[^>]*lang="([^"]*)"/i) || [, ''])[1];
  const h1s = [...body.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) => textOf(m[1]));
  const h2s = [...body.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map((m) => textOf(m[1]));
  const h3s = [...body.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/gi)].map((m) => textOf(m[1]));
  const imgs = [...body.matchAll(/<img\b[^>]*>/gi)].map((m) => m[0]);
  const imgsWithAlt = imgs.filter((t) => /\balt="[^"]+"/i.test(t)).length;
  const links = [...body.matchAll(/<a\b[^>]*href="([^"]*)"/gi)].map((m) => m[1]);
  const internal = links.filter((h) => h.startsWith('/') || h.includes('raymarkhat.com'));
  const external = links.filter((h) => /^https?:\/\//.test(h) && !h.includes('raymarkhat.com'));
  const jsonld = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)].map((m) => m[1]);
  const schemaTypes = [];
  for (const raw of jsonld) {
    try {
      const j = JSON.parse(raw);
      const t = j['@type'];
      if (Array.isArray(t)) schemaTypes.push(...t);
      else if (t) schemaTypes.push(t);
    } catch {}
  }
  const text = textOf(body);
  return {
    url,
    status,
    title,
    titleLen: title.length,
    desc,
    descLen: desc.length,
    canonical,
    robots,
    lang,
    h1: h1s,
    h1Count: h1s.length,
    h2Count: h2s.length,
    h3Count: h3s.length,
    words: text.split(' ').filter(Boolean).length,
    imgs: imgs.length,
    imgsWithAlt,
    internal: internal.length,
    external: external.length,
    tables: count(body, /<table/gi),
    dt: count(body, /<dt>/gi),
    details: count(body, /<details/gi),
    schemaTypes,
    htmlKB: Math.round(html.length / 1024),
  };
}

const sm = await get(`${BASE}/sitemap.xml`);
const urls = [...sm.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
console.log(`sitemap: ${urls.length} URLs`);

const results = [];
let idx = 0;
const worker = async () => {
  while (idx < urls.length) {
    const i = idx++;
    const u = urls[i];
    const r = await get(u);
    results.push(analyse(u, r.body, r.status));
    if ((i + 1) % 20 === 0) console.log(`  ${i + 1}/${urls.length}`);
  }
};
await Promise.all(Array.from({ length: CONCURRENCY }, worker));

// ---------- aggregate ----------
const byPath = (p) => results.filter((r) => new URL(r.url).pathname === p);
const dupes = (key) => {
  const map = new Map();
  for (const r of results) {
    const v = r[key];
    if (!v) continue;
    map.set(v, (map.get(v) || 0) + 1);
  }
  return [...map.entries()].filter(([, n]) => n > 1);
};

const stat = (arr) => {
  const s = [...arr].sort((a, b) => a - b);
  return { min: s[0], p25: s[Math.floor(s.length * 0.25)], median: s[Math.floor(s.length / 2)], max: s[s.length - 1] };
};

const summary = {
  crawled: results.length,
  non200: results.filter((r) => r.status !== 200).map((r) => [r.url, r.status]),
  missingTitle: results.filter((r) => !r.title).length,
  titleLens: stat(results.map((r) => r.titleLen)),
  longTitles: results.filter((r) => r.titleLen > 62).length,
  shortTitles: results.filter((r) => r.titleLen < 30).length,
  dupTitles: dupes('title'),
  missingDesc: results.filter((r) => !r.desc).length,
  descLens: stat(results.filter((r) => r.desc).map((r) => r.descLen)),
  longDescs: results.filter((r) => r.descLen > 165).length,
  dupDescs: dupes('desc'),
  h1Problems: results.filter((r) => r.h1Count !== 1).map((r) => [r.url, r.h1Count]),
  wordStats: stat(results.map((r) => r.words)),
  thinPages: results.filter((r) => r.words < 350).map((r) => [new URL(r.url).pathname, r.words]),
  altCoverage: (() => {
    const total = results.reduce((n, r) => n + r.imgs, 0);
    const withAlt = results.reduce((n, r) => n + r.imgsWithAlt, 0);
    return { total, withAlt, pct: total ? Math.round((withAlt / total) * 100) : 0 };
  })(),
  schemaCoverage: (() => {
    const map = new Map();
    for (const r of results) for (const t of r.schemaTypes) map.set(t, (map.get(t) || 0) + 1);
    return [...map.entries()].sort((a, b) => b[1] - a[1]);
  })(),
  pagesWithNoSchema: results.filter((r) => r.schemaTypes.length === 0).map((r) => new URL(r.url).pathname),
  avgInternalLinks: Math.round(results.reduce((n, r) => n + r.internal, 0) / results.length),
  orphanRisk: results.filter((r) => r.internal < 15).map((r) => [new URL(r.url).pathname, r.internal]),
  canonicalMismatch: results.filter((r) => r.canonical.replace(/\/$/, '') !== r.url.replace(/\/$/, '')).map((r) => [r.url, r.canonical]),
  noindex: results.filter((r) => /noindex/i.test(r.robots)).map((r) => r.url),
  langMismatch: results.filter((r) => r.lang !== 'en-US' && r.lang !== 'en').map((r) => [r.url, r.lang]),
  tablesTotal: results.reduce((n, r) => n + r.tables, 0),
  htmlKB: stat(results.map((r) => r.htmlKB)),
};

fs.mkdirSync('_audit', { recursive: true });
fs.writeFileSync('_audit/audit.json', JSON.stringify({ summary, results }, null, 2));

console.log('\n===== SUMMARY =====');
console.log(JSON.stringify(summary, null, 2).slice(0, 6000));
