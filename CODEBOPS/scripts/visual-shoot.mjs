/**
 * Deterministic screenshot harness.
 *
 * Three separate sources of run-to-run noise had to be removed before a
 * pixel diff meant anything, and each was found by measuring, not guessing:
 *
 *   1. CSS animations caught mid-flight  -> FREEZE (below).  Splash and
 *      picker went to 0.000% after this; the play screens did not.
 *   2. The 3D render loop still running  -> PAUSE_RENDER, which fakes a
 *      hidden tab so the Stage's own visibilitychange path stops it.
 *      rAF/sec went 2 -> 0, and the play screens still differed by 16.5%.
 *   3. The characters' *elapsed* animation time.  The loop advances by
 *      wall-clock delta, so two runs that took slightly different amounts
 *      of real time to reach the screenshot show different poses.  Pinning
 *      the random seeds did not fix this (21.8% remained).
 *
 * The fix for (3) is `?cbtest=1`, which makes each tick exactly 1/60s and
 * publishes the frame number, so this harness waits for FRAMES rather than
 * for milliseconds.  Same frame number, same instant of the same animation.
 *
 * Usage: npm run visual -- <outDir>   (a preview server must be running)
 */
import { chromium } from 'playwright-core';
import { mkdirSync } from 'node:fs';

const OUT = process.argv[2];
if (!OUT) { console.error('need an output dir'); process.exit(1); }
mkdirSync(OUT, { recursive: true });

const PAUSE_RENDER = () => {
  Object.defineProperty(document, 'hidden', { configurable: true, get: () => true });
  Object.defineProperty(document, 'visibilityState', { configurable: true, get: () => 'hidden' });
  document.dispatchEvent(new Event('visibilitychange'));
};

const FREEZE = `
  *, *::before, *::after {
    animation-play-state: paused !important;
    animation-delay: -1s !important;
    animation-duration: 0.001s !important;
    animation-iteration-count: 1 !important;
    animation-fill-mode: forwards !important;
    transition: none !important;
  }
`;

const VPS = [
  ['tablet1366', { width: 1366, height: 1024 }],
  ['tablet1280', { width: 1280, height: 800 }],
  ['desktop1920', { width: 1920, height: 1200 }],
  ['phoneL844', { width: 844, height: 390, deviceScaleFactor: 2 }],
  ['phoneP390', { width: 390, height: 844, deviceScaleFactor: 2 }],
];

const SAVE = JSON.stringify({
  schemaVersion: 2,
  stars: { 'sm-1': 3, 'sm-2': 3, 'sm-3': 2, 'bb-1': 3, 'gw-motor-start': 3, 'gw-motor-programmer': 3 },
  settings: { sound: false, music: false, calmMode: false, highContrast: false, leftHanded: false },
  daily: { lastCompleted: null, streak: 0, totalCompleted: 0 }, playSeconds: 0,
});

/**
 * Wait until the render loop has advanced `n` more frames.
 *
 * Falls back to a plain sleep when no stage is mounted (splash and picker
 * are pure DOM, so `__cbFrames` may never appear); those screens are
 * already stable under FREEZE alone.
 */
async function frames(p, n, fallbackMs) {
  const seen = await p.evaluate(() => window.__cbFrames ?? null);
  if (seen === null) { await p.waitForTimeout(fallbackMs); return; }
  // Absolute, not relative: `cbframes` makes the loop stop itself at N
  // frames since the screen mounted, so this just waits for it to arrive.
  await p
    .waitForFunction((t) => (window.__cbFrames ?? 0) >= t, n, { timeout: 40000 })
    .catch(() => {});
}

/** Settle: pause the loop, freeze CSS, and let the last paint land. */
async function settle(p) {
  await p.evaluate(PAUSE_RENDER);
  await p.addStyleTag({ content: FREEZE });
  await p.waitForTimeout(400);
}

const b = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell',
  args: ['--no-sandbox', '--use-gl=swiftshader', '--enable-unsafe-swiftshader'],
});

async function dismiss(p) {
  for (let i = 0; i < 3; i++) {
    const d = await p.$('.dialog .mini-btn');
    if (d && await d.isVisible()) { await d.click({ force: true }); await p.waitForTimeout(500); continue; }
    const rh = await p.$('.rh-anyway');
    if (rh && await rh.isVisible()) { await rh.click({ force: true }); await p.waitForTimeout(500); continue; }
    break;
  }
}

for (const [name, vp] of VPS) {
  const p = await b.newPage({ viewport: vp });
  await p.addInitScript((s) => localStorage.setItem('codebops.save.v1', s), SAVE);
  await p.goto('http://localhost:4173/?cbtest=1&cbframes=60', { waitUntil: 'domcontentloaded' });
  await p.waitForTimeout(3800);          // let every entrance animation finish
  await settle(p);
  await p.screenshot({ path: `${OUT}/01-splash-${name}.png` });

  await p.click('.btn-play', { force: true });
  await p.waitForTimeout(2200);
  await settle(p);
  await p.screenshot({ path: `${OUT}/02-picker-${name}.png` });

  const cards = await p.$$('.sel2-card:not(.st-locked):not(.st-soon)');
  if (cards.length) {
    await cards[0].click({ force: true });
    await p.waitForTimeout(3000);
    await dismiss(p);
    // From here the canvas is live, so count frames rather than seconds.
    await frames(p, 60, 1600);
    await settle(p);
    await p.screenshot({ path: `${OUT}/03-play-${name}.png` });

    // settings dialog — exercises scrim, toggles, panels
    const gear = await p.$('.circle-btn.blue');
    if (gear) {
      await gear.click({ force: true });
      await p.waitForTimeout(900);
      await settle(p);
      await p.screenshot({ path: `${OUT}/04-settings-${name}.png` });
    }
  }
  await p.close();
}
await b.close();
console.log('shots written to', OUT);
