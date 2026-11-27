// Fast GitHub uploader: creates ONE commit with all files via the Git Data API.
// No git binary, no per-file rate limits (tree API accepts up to 100k entries).
//
//   GITHUB_TOKEN=... node tools/upload-tree.mjs --dir ./dist --repo owner/name --branch main --message "deploy"

import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const arg = (n, d = '') => {
  const i = args.indexOf(`--${n}`);
  return i === -1 ? d : args[i + 1] ?? d;
};
const token = process.env.GITHUB_TOKEN || '';
const dir = path.resolve(arg('dir', '.'));
const repo = arg('repo');
const branch = arg('branch', 'main');
const message = arg('message', 'Update site');
const dry = args.includes('--dry');
const fresh = args.includes('--fresh'); // replace the whole tree (deletes files not present locally)

if (!repo) {
  console.error('missing --repo owner/name');
  process.exit(1);
}
if (!token && !dry) {
  console.error('missing GITHUB_TOKEN');
  process.exit(1);
}

const API = 'https://api.github.com';
const headers = {
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
  'User-Agent': 'raymark-tree',
  Authorization: `Bearer ${token}`,
};

async function api(method, url, body) {
  const res = await fetch(API + url, {
    method,
    headers: { ...headers, ...(body ? { 'Content-Type': 'application/json' } : {}) },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let json = null;
  try {
    json = JSON.parse(text);
  } catch {
    /* ignore */
  }
  if (!res.ok) throw new Error(`${method} ${url} → ${res.status} ${json?.message || text.slice(0, 200)}`);
  return json;
}

function walk(d, base = d, out = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const full = path.join(d, e.name);
    if (e.isDirectory()) walk(full, base, out);
    else out.push({ abs: full, rel: path.relative(base, full).split(path.sep).join('/') });
  }
  return out;
}

const BINARY = new Set(['.png', '.jpg', '.jpeg', '.gif', '.ico', '.webp', '.zip', '.woff', '.woff2', '.pdf']);

const files = walk(dir).sort((a, b) => a.rel.localeCompare(b.rel));
console.log(`${files.length} files from ${dir}`);
if (dry) {
  for (const f of files.slice(0, 10)) console.log('  ·', f.rel);
  console.log(`  … (${files.length} total)`);
  process.exit(0);
}

// an empty repository has no ref yet — handle that case
let parentSha = null;
let baseTree = null;
try {
  const ref = await api('GET', `/repos/${repo}/git/ref/heads/${branch}`);
  parentSha = ref.object.sha;
  const parent = await api('GET', `/repos/${repo}/git/commits/${parentSha}`);
  baseTree = parent.tree.sha;
  console.log(`parent commit: ${parentSha.slice(0, 10)} (tree ${baseTree.slice(0, 10)})`);
} catch (err) {
  if (!String(err.message).includes('404')) throw err;
  console.log(`repository is empty — this will be the first commit on ${branch}`);
}

// binary files need blobs; text files go inline in the tree
const blobs = [];
for (const f of files) {
  if (!BINARY.has(path.extname(f.rel).toLowerCase())) continue;
  const content = fs.readFileSync(f.abs).toString('base64');
  const blob = await api('POST', `/repos/${repo}/git/blobs`, { content, encoding: 'base64' });
  blobs.push({ path: f.rel, mode: '100644', type: 'blob', sha: blob.sha });
}
console.log(`uploaded ${blobs.length} binary blobs`);

const treeEntries = [
  ...blobs,
  ...files
    .filter((f) => !BINARY.has(path.extname(f.rel).toLowerCase()))
    .map((f) => ({
      path: f.rel,
      mode: '100644',
      type: 'blob',
      content: fs.readFileSync(f.abs, 'utf8'),
    })),
];

const treePayload = { tree: treeEntries };
if (!fresh && baseTree) treePayload.base_tree = baseTree;
const tree = await api('POST', `/repos/${repo}/git/trees`, treePayload);
console.log(`tree created: ${tree.sha.slice(0, 10)} (${treeEntries.length} entries)`);

const commit = await api('POST', `/repos/${repo}/git/commits`, {
  message,
  tree: tree.sha,
  parents: parentSha ? [parentSha] : [],
});
console.log(`commit created: ${commit.sha.slice(0, 10)}`);

if (parentSha) {
  await api('PATCH', `/repos/${repo}/git/refs/heads/${branch}`, { sha: commit.sha, force: false });
} else {
  await api('POST', `/repos/${repo}/git/refs`, { ref: `refs/heads/${branch}`, sha: commit.sha });
}
console.log(`✓ ${branch} now at ${commit.sha.slice(0, 10)}`);
