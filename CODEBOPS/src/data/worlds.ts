/**
 * The world registry — one list, for the whole app.
 *
 * This used to live inside `levelSelectScreen.ts`, which meant a UI file
 * owned a fact the curriculum also had an opinion about. The two lists
 * had already drifted: the picker knew five worlds, `stages.ts` named
 * eight, and nothing compared them. Gearworks Garage, Zip's App Lab and
 * Imagination Island were reachable in the app while being invisible to
 * every question the curriculum could answer about worlds.
 *
 * So worlds live here now, in data, and the picker reads them. The
 * curriculum validator checks that the two agree (see validate.ts), so
 * the next world that gets added cannot quietly exist in only one of
 * them.
 *
 * Pure data. No DOM, no THREE.
 */
import type { WorldId } from './curriculum/stages';
import type { LearningLayerId } from './curriculum/layers';

export interface WorldDefinition {
  readonly id: WorldId;
  readonly emoji: string;
  readonly name: string;
  /** CSS theme suffix — `.sel2-med-disc.th-<theme>` and friends. */
  readonly theme: string;
  /** Order on the learning journey. Lower comes first. */
  readonly order: number;
  /**
   * Which of the four learning layers this world mainly serves (§3).
   * A world can practise ideas from earlier layers; this is where it
   * does its TEACHING.
   */
  readonly layer: LearningLayerId;
  /**
   * True when the world appears as a stone on the main level-select
   * trail. Gearworks, App Lab and Imagination Island are reached their
   * own way, but they are still worlds and still carry curriculum.
   */
  readonly onMainTrail: boolean;
  /**
   * What a child walks away holding (§2: "every major learning journey
   * should produce something meaningful"). Null for worlds that are
   * pure practice.
   */
  readonly capstone: string | null;
}

export const WORLDS: readonly WorldDefinition[] = [
  {
    id: 'sparkle-meadow', emoji: '🌼', name: 'Sparkle Meadow', theme: 'meadow',
    order: 1, layer: 'follow', onMainTrail: true,
    capstone: 'A meadow with every berry delivered',
  },
  {
    id: 'bubble-bay', emoji: '🐚', name: 'Bubble Bay', theme: 'bay',
    order: 2, layer: 'follow', onMainTrail: true,
    capstone: 'A shell collection gathered with one loop',
  },
  {
    id: 'pattern-forest', emoji: '🌸', name: 'Pattern Forest', theme: 'forest',
    order: 3, layer: 'follow', onMainTrail: true,
    capstone: 'A forest sorted by looking before choosing',
  },
  {
    id: 'robot-town', emoji: '🤖', name: 'Robot Town', theme: 'town',
    order: 4, layer: 'remember', onMainTrail: true,
    capstone: 'Two Bops finishing a job together',
  },
  {
    id: 'gearworks-garage', emoji: '⚙️', name: 'Gearworks Garage', theme: 'garage',
    order: 5, layer: 'remember', onMainTrail: false,
    capstone: 'A machine you built and programmed',
  },
  {
    id: 'agent-academy', emoji: '🎓', name: 'Agent Academy', theme: 'academy',
    order: 6, layer: 'train', onMainTrail: true,
    capstone: 'A helper you taught to choose carefully',
  },
  {
    id: 'app-lab', emoji: '🧪', name: "Zip's App Lab", theme: 'applab',
    order: 7, layer: 'build', onMainTrail: false,
    capstone: 'A small app of your own',
  },
  {
    id: 'imagination-island', emoji: '🏝️', name: 'Imagination Island', theme: 'island',
    order: 8, layer: 'build', onMainTrail: false,
    capstone: 'Anything you can make from what you have learned',
  },
];

const BY_ID = new Map(WORLDS.map((w) => [w.id, w]));

export function world(id: WorldId): WorldDefinition {
  const w = BY_ID.get(id);
  if (!w) throw new Error(`[worlds] Unknown world "${id}"`);
  return w;
}

export function isWorldId(id: string): id is WorldId {
  return BY_ID.has(id as WorldId);
}

/** Worlds shown as stones on the main trail, in journey order. */
export function trailWorlds(): readonly WorldDefinition[] {
  return WORLDS.filter((w) => w.onMainTrail);
}

/** Every world in a given learning layer. */
export function worldsInLayer(layer: LearningLayerId): readonly WorldDefinition[] {
  return WORLDS.filter((w) => w.layer === layer);
}
