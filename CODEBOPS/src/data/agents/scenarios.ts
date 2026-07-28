/**
 * The little worlds a helper is tried against (§15.7).
 *
 * Each goal gets a NORMAL scenario — the one the child pictures — and
 * the edge-case library supplies the surprises on top. Keeping the
 * normal case here rather than generating it matters: a child's first
 * test should show them the situation they had in mind, so that when it
 * changes they can tell it changed.
 *
 * Deterministic and hand-written. No random worlds: two runs of the same
 * helper must be comparable, or "did my fix work?" is unanswerable.
 */
import type { AgentObservation } from '../../agents/types';
import type { AgentWorld } from '../../agents/engine';

const s = (
  subjectId: string, kind: string, attributes: string[], clear = true,
): AgentObservation => ({ subjectId, kind, attributes, clear });

/**
 * The everyday version of each goal's world.
 *
 * Deliberately mixed: some things need doing and some do not. A world
 * where every subject matches would let a rule of "every time, use the
 * tool" look correct, and the child would learn nothing about checking.
 */
export const NORMAL_SCENARIOS: Readonly<Record<string, AgentWorld>> = {
  'flowers-healthy': {
    subjects: [
      s('flower-1', 'flower', ['droopy']),
      s('flower-2', 'flower', ['happy']),
      s('flower-3', 'flower', ['droopy']),
      s('flower-4', 'flower', ['happy']),
    ],
  },
  'sort-recycling': {
    subjects: [
      s('item-1', 'item', ['metal']),
      s('item-2', 'item', ['paper']),
      s('item-3', 'item', ['metal']),
      s('item-4', 'item', ['squishy']),
    ],
  },
  'deliver-packages': {
    subjects: [
      s('parcel-1', 'parcel', ['small']),
      s('parcel-2', 'parcel', ['fragile']),
      s('parcel-3', 'parcel', ['heavy']),
    ],
  },
  'lighthouse-working': {
    subjects: [
      s('cloud-1', 'cloud', ['dark']),
      s('ship-1', 'ship', ['far']),
      s('ship-2', 'ship', ['near']),
    ],
  },
  'pack-picnic': {
    subjects: [
      s('snack-1', 'snack', ['sweet']),
      s('snack-2', 'snack', ['crunchy']),
      s('snack-3', 'snack', ['squishy']),
      s('snack-4', 'snack', ['sweet']),
    ],
  },
  'care-for-pet': {
    subjects: [
      s('pet-1', 'pet', ['hungry']),
      s('pet-2', 'pet', ['sleepy']),
    ],
  },
  'organise-tools': {
    subjects: [
      s('tool-1', 'tool', ['sharp']),
      s('tool-2', 'tool', ['round']),
      s('tool-3', 'tool', ['long']),
    ],
  },
  'prepare-party': {
    subjects: [
      s('balloon-1', 'balloon', ['popped']),
      s('balloon-2', 'balloon', ['clean']),
      s('plate-1', 'plate', ['dirty']),
      s('plate-2', 'plate', ['clean']),
    ],
  },
};

export function scenarioFor(goalId: string): AgentWorld {
  const w = NORMAL_SCENARIOS[goalId];
  if (!w) throw new Error(`[scenarios] No scenario for goal "${goalId}"`);
  // A copy, so a run can never leave a mark on the shared fixture.
  return { subjects: w.subjects.map((x) => ({ ...x, attributes: [...x.attributes] })) };
}

/** Names for the tokens, so BopLens says "flower" and not "flower-1". */
export const SCENARIO_NAMES: Readonly<Record<string, string>> = {
  flower: 'flower', item: 'thing', parcel: 'package', ship: 'ship', cloud: 'cloud',
  snack: 'snack', pet: 'pet', tool: 'tool', balloon: 'balloon', plate: 'plate',
  mystery: 'mystery thing',
  droopy: 'droopy', happy: 'happy', metal: 'metal', paper: 'paper', squishy: 'squishy',
  fragile: 'fragile', heavy: 'heavy', small: 'small', near: 'near', far: 'far',
  dark: 'dark', foggy: 'foggy', sweet: 'sweet', crunchy: 'crunchy', hungry: 'hungry',
  sleepy: 'sleepy', playful: 'playful', sharp: 'sharp', round: 'round', long: 'long',
  popped: 'popped', clean: 'clean', dirty: 'dirty', new: 'new',
};
