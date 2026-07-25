/**
 * Bundle the built app into ONE self-contained HTML file that runs the real
 * game by double-click (file://) — no server, no external files.
 *
 * How: inline the built CSS + JS, embed every /art SVG as a data-URI + text
 * registry, shim `fetch` to serve those SVGs, and sweep <img>/mask URLs that
 * point at ./art so they resolve to the embedded copies.
 *
 * Run after `npm run build`:  node scripts/build-standalone.mjs
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');

// Take the entry names from the built index.html, never by scanning the
// directory: a stale bundle left over from an earlier build sorts first
// just as easily as the current one, and silently ships old game code.
const indexHtml = readFileSync(join(dist, 'index.html'), 'utf8');
const jsName = indexHtml.match(/assets\/([^"']+\.js)/)?.[1];
const cssName = indexHtml.match(/assets\/([^"']+\.css)/)?.[1];
if (!jsName || !cssName) throw new Error('Build first: dist/index.html names no bundle.');
const assets = readdirSync(join(dist, 'assets'));
const stale = assets.filter((f) => f !== jsName && f !== cssName);
if (stale.length > 0) {
  console.warn(`[standalone] ignoring ${stale.length} stale asset(s) in dist/assets: ${stale.join(', ')}`);
}

const js = readFileSync(join(dist, 'assets', jsName), 'utf8');
const css = readFileSync(join(dist, 'assets', cssName), 'utf8');

// Embed the art SVGs the game loads at runtime.
const artFiles = [
  'art/characters/zip/zip.svg',
  'art/characters/mixy/mixy.svg',
  'art/logo.svg',
];
const art = {};
for (const rel of artFiles) {
  art[`./${rel}`] = readFileSync(join(dist, rel), 'utf8');
}
const artData = {};
for (const [k, v] of Object.entries(art)) {
  artData[k] = `data:image/svg+xml;base64,${Buffer.from(v).toString('base64')}`;
}

// Boot-loader markup lifted from index.html so the first paint matches.
const bootLoader = readFileSync(join(dist, 'index.html'), 'utf8')
  .match(/<div\s+id="app">[\s\S]*?<\/div>\s*<\/body>/)[0]
  .replace(/<\/body>/, '');

const shim = `
(function () {
  var ART = ${JSON.stringify(art)};
  var ARTDATA = ${JSON.stringify(artData)};
  function key(u) {
    try { u = String(u); } catch (e) { return null; }
    var i = u.indexOf('art/');
    if (i < 0) return null;
    return './' + u.slice(i);
  }
  // 1) fetch shim — serve embedded SVGs to loadSvg()/inlineSvgInto().
  var realFetch = window.fetch ? window.fetch.bind(window) : null;
  window.fetch = function (input, init) {
    var u = typeof input === 'string' ? input : (input && input.url);
    var k = key(u);
    if (k && ART[k]) {
      return Promise.resolve(new Response(ART[k], { status: 200, headers: { 'Content-Type': 'image/svg+xml' } }));
    }
    return realFetch ? realFetch(input, init) : Promise.reject(new Error('no network in standalone'));
  };
  // 2a) intercept <img>.src at set-time so no stray file:// load is attempted.
  try {
    var proto = HTMLImageElement.prototype;
    var desc = Object.getOwnPropertyDescriptor(proto, 'src');
    Object.defineProperty(proto, 'src', {
      configurable: true,
      get: function () { return desc.get.call(this); },
      set: function (v) { var k = key(v); desc.set.call(this, (k && ARTDATA[k]) ? ARTDATA[k] : v); },
    });
    var setAttr = proto.setAttribute;
    proto.setAttribute = function (name, value) {
      if (name === 'src') { var k = key(value); if (k && ARTDATA[k]) value = ARTDATA[k]; }
      return setAttr.call(this, name, value);
    };
  } catch (e) { /* fall back to the sweep below */ }
  // 2a2) rewrite ./art url()s the moment a mask/background style is assigned.
  function rewriteCss(v) {
    if (typeof v !== 'string' || v.indexOf('art/') < 0) return v;
    return v.replace(/url\\((['"]?)\\.?\\/?art\\/([^)'"]+)\\1\\)/g, function (m, q, path) {
      var kk = './art/' + path;
      return ARTDATA[kk] ? 'url("' + ARTDATA[kk] + '")' : m;
    });
  }
  try {
    var cssProto = CSSStyleDeclaration.prototype;
    var setProp = cssProto.setProperty;
    cssProto.setProperty = function (n, v, prio) { return setProp.call(this, n, rewriteCss(v), prio); };
    ['webkitMaskImage', 'maskImage', 'backgroundImage', 'webkitMask', 'mask'].forEach(function (prop) {
      var d = Object.getOwnPropertyDescriptor(cssProto, prop);
      if (!d || !d.set) return;
      Object.defineProperty(cssProto, prop, {
        configurable: true,
        get: function () { return d.get.call(this); },
        set: function (v) { d.set.call(this, rewriteCss(v)); },
      });
    });
  } catch (e) { /* observer sweep still corrects it */ }
  // 2b) sweep <img src> and inline mask/background URLs pointing at ./art.
  function fix(node) {
    if (node.nodeType !== 1) return;
    var el = node;
    if (el.tagName === 'IMG') {
      var s = el.getAttribute('src');
      var k = s && key(s);
      if (k && ARTDATA[k] && el.src !== ARTDATA[k]) el.src = ARTDATA[k];
    }
    var st = el.getAttribute && el.getAttribute('style');
    if (st && st.indexOf('art/') >= 0) {
      var fixed = st.replace(/url\((['"]?)\\.?\\/?art\\/([^)'"]+)\\1\)/g, function (m, q, path) {
        var kk = './art/' + path;
        return ARTDATA[kk] ? 'url("' + ARTDATA[kk] + '")' : m;
      });
      if (fixed !== st) el.setAttribute('style', fixed);
    }
  }
  function sweep(rootEl) {
    fix(rootEl);
    if (rootEl.querySelectorAll) rootEl.querySelectorAll('img,[style]').forEach(fix);
  }
  var mo = new MutationObserver(function (muts) {
    for (var i = 0; i < muts.length; i++) {
      var m = muts[i];
      if (m.type === 'attributes') fix(m.target);
      else for (var j = 0; j < m.addedNodes.length; j++) sweep(m.addedNodes[j]);
    }
  });
  // Observe from the very start so a mask/src is rewritten before the
  // browser tries to load it (no stray 404 in the console).
  mo.observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ['src', 'style'] });
  document.addEventListener('DOMContentLoaded', function () { sweep(document.body); });
})();
`;

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover, user-scalable=no" />
<meta name="theme-color" content="#16225c" />
<title>CodeBops — Playable Test Build</title>
<!-- No webfont link here, deliberately. This file is meant to be opened
     from a USB stick with no network, and a remote font request would both
     break that and send a child's IP to a third party for nothing. The
     font stacks in tokens.css fall back to the platform's rounded UI
     face, which is what the design wanted anyway. -->
<style>${css}</style>
<script>${shim}</script>
</head>
<body>
${bootLoader}
<script type="module">${js}</script>
</body>
</html>
`;

const out = join(root, 'codebops-playable.html');
writeFileSync(out, html);
console.log(`Wrote ${out} (${(html.length / 1024).toFixed(0)} KB)`);
