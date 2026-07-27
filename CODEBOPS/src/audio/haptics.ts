/**
 * Haptics — the small taps a tablet can give back.
 *
 * Three rules, and they are about children rather than about hardware:
 *
 *   1. Never as punishment. A wrong drop gets no buzz. A child who feels
 *      the device flinch when they make a mistake learns to stop trying
 *      things, which is the opposite of what this game is for.
 *   2. Small for a snap, medium for a success, nothing for anything else.
 *      A device that buzzes constantly is a device a grown-up turns off.
 *   3. Optional, and off wherever sound is off — a parent silencing the
 *      game in a waiting room means all of it, not just the speaker.
 *
 * `navigator.vibrate` is unsupported on iOS entirely and is gated behind
 * a user gesture elsewhere, so every call here is best-effort and silent
 * when it fails. This is a hook, not a guarantee.
 */
export type Haptic = 'snap' | 'success' | 'select';

/** Milliseconds per pattern. Deliberately short — these are taps, not alerts. */
const PATTERNS: Record<Haptic, number | number[]> = {
  /** A tile landing in a slot. The most common one, so the gentlest. */
  select: 8,
  snap: 14,
  /** A goal reached. Two light taps read as "yes" where one reads as "ok". */
  success: [18, 40, 24],
};

class Haptics {
  enabled = true;

  private get available(): boolean {
    return this.enabled && typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function';
  }

  play(kind: Haptic): void {
    if (!this.available) return;
    try {
      navigator.vibrate(PATTERNS[kind]);
    } catch {
      // A browser may throw rather than return false when vibration is
      // blocked by policy. Either way there is nothing to do about it.
    }
  }

  /** Stop anything in flight — used when a screen tears down mid-pattern. */
  stop(): void {
    if (!this.available) return;
    try { navigator.vibrate(0); } catch { /* as above */ }
  }
}

export const sharedHaptics = new Haptics();

/**
 * Can this device buzz at all?
 *
 * Used to hide the setting where it would do nothing. A switch that has
 * no effect is worse than no switch: a grown-up flips it, nothing
 * changes, and now they distrust the other settings too. iOS Safari has
 * no Vibration API at all, so this is false on every iPad.
 */
export function hapticsAvailable(): boolean {
  return typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function';
}
