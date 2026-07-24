/**
 * Beat machine — Phase 13: Robot Orchestra.
 *
 * Pure TypeScript, zero THREE/DOM/audio imports. A PATTERN is a grid of
 * instrument tracks × beat steps (each cell on/off). All tracks play in
 * PARALLEL: on every step the playhead fires every lit cell at once.
 * A loop count repeats the whole bar. This is a creative tool, not a
 * puzzle — any pattern with a beat "works"; more instruments and a loop
 * light the other stars.
 */

export type BeatPattern = {
  readonly steps: number;
  /** trackId → row of on/off cells (length === steps). */
  readonly tracks: Readonly<Record<string, readonly boolean[]>>;
};

export const BEAT_LOOP_MIN = 1;
export const BEAT_LOOP_MAX = 4;

export function emptyPattern(trackIds: readonly string[], steps: number): BeatPattern {
  const tracks: Record<string, boolean[]> = {};
  for (const id of trackIds) tracks[id] = new Array(steps).fill(false);
  return { steps, tracks };
}

export function toggleCell(pattern: BeatPattern, track: string, step: number): BeatPattern {
  const row = pattern.tracks[track];
  if (!row || step < 0 || step >= pattern.steps) return pattern;
  const next = row.map((v, i) => (i === step ? !v : v));
  return { steps: pattern.steps, tracks: { ...pattern.tracks, [track]: next } };
}

export type BeatEvent =
  | { type: 'stepStart'; loop: number; step: number }
  | { type: 'hit'; track: string; step: number; loop: number }
  | { type: 'done' };

export interface BeatResult {
  readonly events: readonly BeatEvent[];
  readonly totalHits: number;
}

/** Expand a pattern into a deterministic, in-time event stream. */
export function runBeats(pattern: BeatPattern, trackIds: readonly string[], loops: number): BeatResult {
  const events: BeatEvent[] = [];
  let totalHits = 0;
  const n = Math.max(BEAT_LOOP_MIN, Math.min(BEAT_LOOP_MAX, loops));
  for (let loop = 0; loop < n; loop++) {
    for (let step = 0; step < pattern.steps; step++) {
      events.push({ type: 'stepStart', loop, step });
      for (const id of trackIds) {
        if (pattern.tracks[id]?.[step]) {
          events.push({ type: 'hit', track: id, step, loop });
          totalHits++;
        }
      }
    }
  }
  events.push({ type: 'done' });
  return { events, totalHits };
}

export interface BeatStats {
  readonly totalBeats: number;
  readonly instrumentsUsed: number;
}

export function beatStats(pattern: BeatPattern, trackIds: readonly string[]): BeatStats {
  let totalBeats = 0;
  let instrumentsUsed = 0;
  for (const id of trackIds) {
    const row = pattern.tracks[id] ?? [];
    const hits = row.filter(Boolean).length;
    if (hits > 0) instrumentsUsed++;
    totalBeats += hits;
  }
  return { totalBeats, instrumentsUsed };
}

/** works (any beat) / clever (an ensemble) / creative (a looped song). */
export function beatStars(pattern: BeatPattern, trackIds: readonly string[], loops: number): number {
  const { totalBeats, instrumentsUsed } = beatStats(pattern, trackIds);
  if (totalBeats < 1) return 0;
  return 1 + (instrumentsUsed >= 2 ? 1 : 0) + (loops >= 2 ? 1 : 0);
}

/** Serialize / restore a saved song (local song save). */
export function serializePattern(pattern: BeatPattern, loops: number): string {
  const rows: Record<string, string> = {};
  for (const [id, row] of Object.entries(pattern.tracks)) rows[id] = row.map((v) => (v ? '1' : '0')).join('');
  return JSON.stringify({ steps: pattern.steps, loops, rows });
}

export function deserializePattern(json: string, trackIds: readonly string[], steps: number): { pattern: BeatPattern; loops: number } | null {
  try {
    const data = JSON.parse(json) as { steps: number; loops: number; rows: Record<string, string> };
    if (data.steps !== steps) return null;
    const tracks: Record<string, boolean[]> = {};
    for (const id of trackIds) {
      const s = data.rows[id] ?? '';
      tracks[id] = Array.from({ length: steps }, (_, i) => s[i] === '1');
    }
    return { pattern: { steps, tracks }, loops: Math.max(BEAT_LOOP_MIN, Math.min(BEAT_LOOP_MAX, data.loops || 1)) };
  } catch {
    return null;
  }
}
