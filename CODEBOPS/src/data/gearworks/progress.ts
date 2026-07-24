/**
 * Gearworks progress — Phase 19: the Inventor's Trophy Room.
 *
 * Pure logic that recaps the whole journey. Every playable Gearworks
 * level belongs to a CONCEPT (grouped by its screen kind); a concept is
 * "mastered" when all its levels are 3-starred. These helpers roll the
 * save-store stars up into per-concept and garage-wide totals, and decide
 * when the Inventor's Diploma is earned. Zero THREE/DOM imports.
 */
import { GEARWORKS_SEQUENCE, gwEntryId } from './world';
import type { GearworksLevelEntry } from './world';

export type GearworksKind = GearworksLevelEntry['kind'];

export interface ConceptDef {
  readonly id: string;
  /** The idea the child learned (kid-facing). */
  readonly title: string;
  readonly blurb: string;
  readonly emoji: string;
  /** Screen kinds that make up this concept. */
  readonly kinds: readonly GearworksKind[];
}

/** The learning journey, in order — one badge per concept. */
export const GEARWORKS_CONCEPTS: readonly ConceptDef[] = [
  { id: 'machines', title: 'Machines & Motors', blurb: 'Start, stop and steer a machine in order', emoji: '🔧', kinds: ['machine'] },
  { id: 'gears', title: 'Gear Chains', blurb: 'Connect gears so power travels along', emoji: '⚙️', kinds: ['chain'] },
  { id: 'loops', title: 'Loops', blurb: 'Repeat tiles instead of copying them', emoji: '🔁', kinds: ['loop'] },
  { id: 'sensors', title: 'Sensors & Waiting', blurb: 'Wait for the world before acting', emoji: '👁️', kinds: ['sensor'] },
  { id: 'conditions', title: 'Conditions & Sorting', blurb: 'If this, then that — sort by rules', emoji: '🔀', kinds: ['sorter'] },
  { id: 'counters', title: 'Counters & Safe Loops', blurb: 'Remember a number; stop a loop safely', emoji: '🔢', kinds: ['counter'] },
  { id: 'events', title: 'The Jam Machine', blurb: 'Compose it all into one big machine', emoji: '🍓', kinds: ['jam'] },
  { id: 'functions', title: 'Functions', blurb: 'Name a job and reuse it', emoji: '📋', kinds: ['job'] },
  { id: 'signals', title: 'Teamwork & Signals', blurb: 'Two machines working in parallel', emoji: '📡', kinds: ['signal'] },
  { id: 'debugging', title: 'Debugging', blurb: 'Find the broken tile and fix it', emoji: '🔍', kinds: ['debug'] },
  { id: 'rhythm', title: 'Music & Rhythm', blurb: 'Build beats that play together', emoji: '🥁', kinds: ['orchestra'] },
  { id: 'logic', title: 'Logic', blurb: 'Combine conditions with AND, OR, NOT', emoji: '🗼', kinds: ['lighthouse'] },
  { id: 'queues', title: 'Queues', blurb: 'First in, first out — drain a line', emoji: '📦', kinds: ['delivery'] },
  { id: 'nested', title: 'Nested Loops', blurb: 'A loop inside a loop', emoji: '🎨', kinds: ['painter'] },
  { id: 'state', title: 'State Machines', blurb: 'Scenes that change with events', emoji: '📖', kinds: ['story'] },
  { id: 'parameters', title: 'Functions with Inputs', blurb: 'One gadget, many inputs', emoji: '🛠️', kinds: ['maker'] },
];

export type StarMap = Readonly<Record<string, number>>;

export function conceptLevels(concept: ConceptDef): GearworksLevelEntry[] {
  return GEARWORKS_SEQUENCE.filter((e) => concept.kinds.includes(e.kind));
}

export interface ConceptProgress {
  readonly earned: number;
  readonly total: number;
  readonly complete: boolean;
  readonly started: boolean;
}

export function conceptProgress(concept: ConceptDef, stars: StarMap): ConceptProgress {
  const levels = conceptLevels(concept);
  const total = levels.length * 3;
  const earned = levels.reduce((sum, e) => sum + Math.min(3, stars[gwEntryId(e)] ?? 0), 0);
  return { earned, total, complete: total > 0 && earned === total, started: earned > 0 };
}

export interface GarageTotals {
  readonly earned: number;
  readonly total: number;
  readonly conceptsComplete: number;
  readonly conceptsTotal: number;
  readonly conceptsStarted: number;
  readonly allComplete: boolean;
}

export function garageTotals(stars: StarMap): GarageTotals {
  let earned = 0;
  let total = 0;
  let conceptsComplete = 0;
  let conceptsStarted = 0;
  for (const c of GEARWORKS_CONCEPTS) {
    const p = conceptProgress(c, stars);
    earned += p.earned;
    total += p.total;
    if (p.complete) conceptsComplete++;
    if (p.started) conceptsStarted++;
  }
  return {
    earned, total, conceptsComplete, conceptsStarted,
    conceptsTotal: GEARWORKS_CONCEPTS.length,
    allComplete: total > 0 && earned === total,
  };
}

/** The next concept the child hasn't fully mastered (for a "keep going" nudge). */
export function nextConcept(stars: StarMap): ConceptDef | null {
  return GEARWORKS_CONCEPTS.find((c) => !conceptProgress(c, stars).complete) ?? null;
}

/** Diploma is earned once every concept is mastered. */
export function diplomaEarned(stars: StarMap): boolean {
  return garageTotals(stars).allComplete;
}
