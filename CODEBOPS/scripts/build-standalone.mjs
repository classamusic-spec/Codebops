/**
 * Bundle the built app into ONE self-contained HTML file that runs the real
 * game by double-click (file://) — no server, no external files.
 *
 * How: inline the built CSS + JS, embed every /art SVG as a data-URI + text
 * registry, shim `fetch` to serve those SVGs, and sweep <img>/mask URLs that
 * point at ./art so they resolve to the embedded copies.
 *
 * Run via `npm run build:standalone`, which builds dist-standalone/ first.
 * That build folds the lazily-loaded character rig back into the entry
 * chunk — on file:// a dynamic import has nothing to fetch from, so a
 * split build would boot with no mascots and no error worth the name.
 */
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist-standalone');
if (!existsSync(dist)) {
  throw new Error('Run `npm run build:standalone` — dist-standalone/ is missing.');
}

// Take the entry names from the built index.html, never by scanning the
// directory: a stale bundle left over from an earlier build sorts first
// just as easily as the current one, and silently ships old game code.
const indexHtml = readFileSync(join(dist, 'index.html'), 'utf8');
const jsName = indexHtml.match(/assets\/([^"']+\.js)/)?.[1];
const cssName = indexHtml.match(/assets\/([^"']+\.css)/)?.[1];
if (!jsName || !cssName) throw new Error('Build first: dist/index.html names no bundle.');
// Nothing else may be in there. A leftover chunk would mean the build did
// not actually inline its dynamic imports, and the file would ship a
// mascot the browser can never load.
const assets = readdirSync(join(dist, 'assets'));
const extra = assets.filter((f) => f !== jsName && f !== cssName);
if (extra.length > 0) {
  throw new Error(`[standalone] ${extra.length} un-inlined chunk(s): ${extra.join(', ')}`);
}

const js = readFileSync(join(dist, 'assets', jsName), 'utf8');
const css = readFileSync(join(dist, 'assets', cssName), 'utf8');

// Fold the self-hosted webfonts in as data URIs.
//
// A single file has no siblings, so `url(./fonts/x.woff2)` resolves to
// nothing over file:// and the whole point of self-hosting is lost at the
// last step. Base64 costs about a third more bytes than the raw woff2 —
// roughly 170 KB against a file already past two megabytes — which is a
// fair price for the build actually looking like the game.
const fontDir = join(dist, 'fonts');
let fontCss = '';
if (existsSync(join(fontDir, 'fonts.css'))) {
  fontCss = readFileSync(join(fontDir, 'fonts.css'), 'utf8').replace(
    /url\(\.\/([^)]+\.woff2)\)/g,
    (whole, file) => {
      const p = join(fontDir, file);
      if (!existsSync(p)) return whole;
      return `url(data:font/woff2;base64,${readFileSync(p).toString('base64')})`;
    },
  );
  const n = (fontCss.match(/data:font\/woff2/g) || []).length;
  console.log(`[standalone] embedding ${n} font face(s)`);
} else {
  // Not fatal: the stacks in tokens.css still name a rounded system face.
  console.warn('[standalone] no self-hosted fonts found — run scripts/fetch-fonts.mjs');
}

// Embed every art SVG the game can load at runtime.
//
// This used to be a hand-written list, and adding a new piece of art
// meant remembering to add it here too. Nobody did, so the splash logo
// shipped in a single file that then tried to fetch it over file:// —
// which browsers refuse. Walk the directory instead: an asset that
// exists is an asset that gets embedded.
function svgsUnder(dir, prefix = '') {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isDirectory()) out.push(...svgsUnder(join(dir, entry.name), rel));
    else if (entry.name.endsWith('.svg')) out.push(rel);
  }
  return out;
}
const artFiles = svgsUnder(join(dist, 'art')).map((rel) => `art/${rel}`);
if (artFiles.length === 0) throw new Error('[standalone] no art SVGs found to embed.');
console.log(`[standalone] embedding ${artFiles.length} art file(s): ${artFiles.join(', ')}`);
const art = {};
for (const rel of artFiles) {
  art[`./${rel}`] = readFileSync(join(dist, rel), 'utf8');
}
const artData = {};
for (const [k, v] of Object.entries(art)) {
  artData[k] = `data:image/svg+xml;base64,${Buffer.from(v).toString('base64')}`;
}

// The background music, same idea as the art: a file:// page cannot fetch
// a sibling file, so the track rides inside the HTML as a data URI. It is
// the single biggest thing in here by some margin, which is the price of a
// one-file build that plays music with no server and no network.
const audioData = {};
const audioDir = join(dist, 'audio');
if (existsSync(audioDir)) {
  for (const name of readdirSync(audioDir)) {
    if (!name.endsWith('.mp3')) continue;
    const bytes = readFileSync(join(audioDir, name));
    audioData[`./audio/${name}`] = `data:audio/mpeg;base64,${bytes.toString('base64')}`;
    console.log(`[standalone] embedding audio: audio/${name} (${(bytes.length / 1024).toFixed(0)} KB)`);
  }
}
if (Object.keys(audioData).length === 0) {
  throw new Error('[standalone] no audio found to embed — the music would be silent.');
}

// Boot-loader markup lifted from index.html so the first paint matches.
const bootLoader = readFileSync(join(dist, 'index.html'), 'utf8')
  .match(/<div\s+id="app">[\s\S]*?<\/div>\s*<\/body>/)[0]
  .replace(/<\/body>/, '');

const shim = `
(function () {
  var ART = ${JSON.stringify(art)};
  var ARTDATA = ${JSON.stringify(artData)};
  var AUDIO = ${JSON.stringify(audioData)};
  function key(u) {
    try { u = String(u); } catch (e) { return null; }
    var i = u.indexOf('art/');
    if (i < 0) return null;
    return './' + u.slice(i);
  }
  function audioKey(u) {
    try { u = String(u); } catch (e) { return null; }
    var i = u.indexOf('audio/');
    if (i < 0) return null;
    return './' + u.slice(i);
  }
  // 0) audio src — the music player builds an Audio element and assigns a
  // relative path, which over file:// resolves to a sibling the browser
  // will not read. Swap in the embedded copy at set-time. This has to be
  // HTMLMediaElement, not HTMLImageElement: they are separate prototypes
  // and the img interception below never sees an audio element.
  try {
    var mProto = HTMLMediaElement.prototype;
    var mDesc = Object.getOwnPropertyDescriptor(mProto, 'src');
    Object.defineProperty(mProto, 'src', {
      configurable: true,
      get: function () { return mDesc.get.call(this); },
      set: function (v) { var k = audioKey(v); mDesc.set.call(this, (k && AUDIO[k]) ? AUDIO[k] : v); },
    });
  } catch (e) { /* music simply stays silent rather than breaking the app */ }
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
<!-- The fonts are embedded, not linked. This file is meant to be opened
     from a USB stick with no network, so a remote request would both fail
     and send a child's IP to a third party for nothing. Until the faces
     were self-hosted this build had no choice but to fall back to the
     platform's rounded UI face; now it looks like the real game. -->
<style>${fontCss}</style>
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
