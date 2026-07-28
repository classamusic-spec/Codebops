/**
 * Service-worker registration.
 *
 * Deliberately quiet. A child must never see an update prompt, a
 * "reload for the new version" bar, or an install banner — those are
 * grown-up concepts and a three-year-old will tap whatever appears.
 * A new build is picked up the next time the app is opened, which for
 * this audience is soon and is enough.
 */

/** file:// has no service worker, and the single-file build IS the offline copy. */
function supported(): boolean {
  return 'serviceWorker' in navigator && location.protocol.startsWith('http');
}

export function registerServiceWorker(): void {
  if (!supported()) return;
  // After load, not during: registration competes with the first paint
  // and the first paint is what a child is waiting for.
  window.addEventListener('load', () => {
    void navigator.serviceWorker.register('./sw.js').catch(() => {
      // No offline shell this session. The app is fully playable online,
      // so there is nothing worth interrupting anyone about.
    });
  });
}
