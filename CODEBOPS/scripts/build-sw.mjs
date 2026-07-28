/**
 * Write the service worker's precache list from the REAL build output.
 *
 * A hand-kept list goes stale the first time a bundler hash changes, and
 * the failure is quiet and nasty: the app installs, then boots offline
 * with no JavaScript and no way to say why. Walking dist/ means an asset
 * that exists is an asset that gets precached.
 *
 * Run after `vite build`, as part of `npm run build`.
 */
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
if (!existsSync(dist)) throw new Error('[sw] run vite build first — dist/ is missing.');

/** Everything a cold offline start needs, and nothing it does not. */
const WANTED = /\.(js|css|html|svg|png|mp3|webmanifest|woff2?)$/i;
/** The worker must never cache itself: it would never be able to update. */
const SKIP = /^sw\.js$/;

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

const all = walk(dist)
  .map((f) => relative(dist, f).split(/[\\/]/).join('/'))
  .filter((f) => WANTED.test(f) && !SKIP.test(f));

/**
 * Only the bundles this build actually produced.
 *
 * `emptyOutDir` is false — the standalone single-file build writes into
 * dist/ too and must not be wiped by a normal build — so dist/assets/
 * accumulates every hashed bundle ever emitted. Walking the directory
 * therefore precached the whole history: the payload grew from 9.5 MB to
 * 11.7 MB over three builds of identical source, and a child on a phone
 * would have downloaded every dead copy before the app could open offline.
 *
 * So assets are taken by reachability from index.html rather than by
 * existence. Everything outside assets/ was copied verbatim from public/
 * and is current by definition, so it is kept as-is.
 *
 * References are resolved relative to the file that makes them, which is
 * the whole trick. index.html says `assets/index-x.js`, but inside that
 * bundle a lazy chunk is `import("./zip-y.js")` — no `assets/` anywhere,
 * because the bundle already lives there. Matching only on the `assets/`
 * form silently dropped all four character and rig chunks: the offline
 * splash still worked, so the omission looked like success, and the app
 * would only have failed once a child opened an actual level.
 */
const REF = /["'(](\.{0,2}\/)?((?:[A-Za-z0-9._-]+\/)*[A-Za-z0-9._-]+\.(?:js|css|woff2?|svg|png|mp3))["')]/g;

const reachable = new Set();
const queue = ['index.html'];
while (queue.length) {
  const f = queue.shift();
  if (reachable.has(f) || !existsSync(join(dist, f))) continue;
  reachable.add(f);
  if (!/\.(html|js|css)$/i.test(f)) continue;
  const here = f.includes('/') ? f.slice(0, f.lastIndexOf('/')) : '';
  const text = readFileSync(join(dist, f), 'utf8');
  for (const m of text.matchAll(REF)) {
    const raw = m[2];
    // Root-relative wins; otherwise resolve against the referring file.
    const candidates = m[1] === '/' ? [raw] : [here ? `${here}/${raw}` : raw, raw];
    for (const c of candidates) {
      if (!reachable.has(c) && existsSync(join(dist, c))) { queue.push(c); break; }
    }
  }
}

const files = all
  .filter((f) => (f.startsWith('assets/') ? reachable.has(f) : true))
  .sort();

const stale = all.filter((f) => f.startsWith('assets/') && !reachable.has(f)).length;
if (stale) console.log(`[sw] skipped ${stale} stale asset(s) left in dist/ by earlier builds`);

// './' as well as './index.html' — a navigation to the origin root is a
// different cache key from the file it serves.
const precache = ['./', ...files.map((f) => `./${f}`)];

const swPath = join(dist, 'sw.js');
const src = readFileSync(swPath, 'utf8');
const banner = `self.__CB_PRECACHE__ = ${JSON.stringify(precache, null, 0)};\n`;
writeFileSync(swPath, banner + src);

const bytes = files.reduce((n, f) => n + statSync(join(dist, f)).size, 0);
console.log(`[sw] precaching ${precache.length} files (${(bytes / 1024 / 1024).toFixed(1)} MB)`);
