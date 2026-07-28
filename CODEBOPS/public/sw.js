/*
 * CodeBops service worker — the offline shell.
 *
 * The manifest has advertised an installable app since the beginning
 * with nothing behind it: install CodeBops, go into a tunnel, and you
 * get a browser error page. A child does not understand "you are
 * offline"; they understand that the game is broken now.
 *
 * Strategy, and why each part is what it is:
 *
 *   PRECACHE   the shell — HTML, JS, CSS, art, audio, icons. Everything
 *              needed for a cold start with no network. It is a fixed
 *              list written at build time, because a wildcard cannot be
 *              enumerated from inside a worker.
 *
 *   NAVIGATE   network first, falling back to the cached shell. First
 *              because a deployed update should be picked up on the next
 *              visit rather than a visit after that; falling back
 *              because being offline must not be a dead end.
 *
 *   ASSETS     cache first. They are content-hashed by the bundler, so a
 *              hit is always correct and a miss is always a new file.
 *              The 970KB music track is the reason this matters — it
 *              should be fetched once in a lifetime, not once a session.
 *
 * There is deliberately NO runtime caching of anything cross-origin.
 * The only third-party request the app makes is the Google Fonts
 * stylesheet, and caching a child's font request through a worker is
 * both pointless (the fallback stack is a rounded system face) and one
 * more place their IP ends up.
 */

/* global self, caches, fetch */

// Bumped by the build. Changing it retires every older cache on
// activate, which is what makes a deploy actually take effect.
const VERSION = 'codebops-v1';
const SHELL = `${VERSION}-shell`;
const RUNTIME = `${VERSION}-runtime`;

/**
 * Written by scripts/build-sw.mjs from the real build output — a
 * hand-kept list goes stale the first time a filename hash changes, and
 * then the app boots offline with no JavaScript and no explanation.
 */
const PRECACHE = self.__CB_PRECACHE__ || ['./', './index.html'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(SHELL)
      // addAll is atomic: one 404 and nothing is cached, which is the
      // behaviour we want. A half-populated shell fails in a way that is
      // far harder to diagnose than an empty one.
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((k) => k !== SHELL && k !== RUNTIME).map((k) => caches.delete(k)),
      ))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  // Same origin only — see the note at the top about fonts.
  if (url.origin !== self.location.origin) return;

  // Navigations: network first, shell as the safety net.
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          void caches.open(SHELL).then((c) => c.put('./index.html', copy));
          return res;
        })
        .catch(() => caches.match('./index.html').then((r) => r || caches.match('./'))),
    );
    return;
  }

  // Everything else: cache first, then network, then remember it.
  event.respondWith(
    caches.match(req).then((hit) => hit || fetch(req).then((res) => {
      // Only store real, complete responses. An opaque or partial
      // response cached here would be served forever and could not be
      // told apart from a good one.
      if (res.ok && res.type === 'basic') {
        const copy = res.clone();
        void caches.open(RUNTIME).then((c) => c.put(req, copy));
      }
      return res;
    })),
  );
});

/** Lets the page ask a waiting worker to take over immediately. */
self.addEventListener('message', (event) => {
  if (event.data === 'cb-skip-waiting') void self.skipWaiting();
});
