/**
 * Deterministic mode, for visual regression testing.
 *
 * The spec asks for screenshot tests that catch accidental changes to
 * logo proportions, panel hierarchy, BOP placement and so on. That is
 * impossible on any screen holding a 3D canvas as long as the characters
 * seed themselves randomly — and they do, deliberately: `bobPhase` and
 * `hopClock` are randomised per instance precisely so the two bops never
 * breathe or hop in lockstep, which is the difference between two
 * characters and one character drawn twice.
 *
 * Measured: two runs of the SAME build differed by 18.6% of pixels on a
 * play screen. Freezing CSS did not help (the canvas is not CSS) and
 * pausing the render loop did not help either (it stops the motion but
 * not the divergence — each run had already simulated a different number
 * of frames, from a different random start).
 *
 * So: `?cbtest=1` replaces those seeds with fixed values. It changes
 * nothing a child can reach — the parameter has to be typed into the URL
 * — and it is the smallest hook that makes the regression suite
 * meaningful rather than decorative.
 */

let cached: boolean | null = null;

/** True when the page was opened with `?cbtest=1`. */
export function deterministic(): boolean {
  if (cached === null) {
    try {
      cached = new URLSearchParams(location.search).get('cbtest') === '1';
    } catch {
      cached = false;
    }
  }
  return cached;
}

/**
 * `Math.random()`, or a fixed value when a test is watching.
 *
 * The fixed value is per-CALLER rather than a single constant: handing
 * every character the same phase would make them move in lockstep, which
 * is the very thing the randomness exists to prevent, and a regression
 * suite that only ever sees synchronised characters would not notice if
 * they became synchronised for real.
 */
let seq = 0x9e3779b9;
export function jitter(): number {
  if (!deterministic()) return Math.random();
  // mulberry32. A fixed increment (seq += 0.28) was tried first and is
  // wrong for scenery: consecutive draws are consumed as x and z, so a
  // constant step lands every rock and every flower on the same diagonal
  // lattice. The layout would be stable but it would not be a layout, and
  // a regression suite that only ever photographs a lattice cannot notice
  // when the real scattering breaks. This is stable AND unpatterned.
  seq = (seq + 0x6d2b79f5) >>> 0;
  let t = seq;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

/** Reset the sequence — called when a screen tears down, so runs match. */
export function resetJitter(): void {
  seq = 0x9e3779b9;
}

/**
 * A frame is 1/60s in deterministic mode, no matter how long it took.
 *
 * Fixed seeds alone were not enough, and measuring proved it: with the
 * seeds pinned, two runs still differed by 21.8% on a play screen. The
 * remaining divergence is not the starting phase but the elapsed one —
 * the render loop advances by wall-clock delta, so a run that spent 4.61s
 * getting to the screenshot has simulated a different amount of breathing
 * than a run that spent 4.68s. Under swiftshader that spread is large.
 *
 * So in deterministic mode the clock is counted, not read: every tick
 * advances exactly 1/60s and the frame number is published on `window`.
 * A test then waits for *frame 300* rather than *five seconds*, and the
 * two runs are looking at the same instant of the same animation.
 */
export const FIXED_DT = 1 / 60;

let frames = 0;

/** Advance the deterministic clock one frame; returns the new elapsed time. */
export function tickFrame(): number {
  frames += 1;
  // Published so a test can wait on frames instead of on wall time. Only
  // in deterministic mode — nothing is attached to a child's window.
  (window as unknown as Record<string, unknown>).__cbFrames = frames;
  return frames * FIXED_DT;
}

/** Frames rendered since the current screen was mounted. */
export function frameCount(): number {
  return frames;
}

/**
 * Restart the frame count — called when a screen tears down.
 *
 * Character poses are a function of frames since *that character* was
 * built, not since page load, so the count has to be anchored to the
 * screen and not to the session. Without this a run that reached the
 * level a few frames later than its twin showed a different pose even
 * with a fixed step.
 */
export function resetFrames(): void {
  frames = 0;
  (window as unknown as Record<string, unknown>).__cbFrames = 0;
}

/**
 * Frame at which the render loop should stop itself, from `?cbframes=N`.
 *
 * The last of the three noise sources, and the subtlest. Waiting from the
 * outside for "frame 240, then pause" cannot be exact: the wait resolves
 * on a poll, the pause is another round trip, and between the two the loop
 * keeps ticking a variable number of frames. Measured, that slop alone was
 * worth 13% of the pixels on a play screen. So the loop stops itself, from
 * the inside, on the exact frame — the only place where "exact" is
 * available. Zero when the parameter is absent, which means never stop.
 *
 * Keep the number small. Software rendering in a headless container turns
 * out about 3.6 frames a second, so a limit of 240 is nearly a minute of
 * waiting per screen and a test that gives up early photographs a random
 * moment — the exact failure this was built to remove. 60 frames is one
 * second of animation and about seventeen of patience.
 */
let limit: number | null = null;
export function frameLimit(): number {
  if (limit === null) {
    let n = 0;
    try {
      n = Number(new URLSearchParams(location.search).get('cbframes')) || 0;
    } catch {
      n = 0;
    }
    limit = deterministic() && n > 0 ? n : 0;
  }
  return limit;
}
