/**
 * Learning evidence and mastery — the app tracks what a child has SHOWN,
 * not merely which levels they finished.
 *
 * Two vocabularies on purpose:
 *  - formal states (grown-up facing, used in parent reports)
 *  - a growing-plant metaphor (child facing)
 *
 * Deliberately non-punitive: states describe what has been seen so far.
 * There is no "behind", no rank, no percentage, and no comparison
 * between children anywhere in this model.
 */
import type { CurriculumStageId, LearningPhase } from './stages';
import { CURRICULUM_STAGES, LEARNING_PHASES, stage } from './stages';

export type MasteryState =
  | 'not-introduced' | 'discovered' | 'guided'
  | 'practiced' | 'demonstrated' | 'applied-creatively';

/** Grown-up wording for a report. */
export const MASTERY_LABEL: Readonly<Record<MasteryState, string>> = {
  'not-introduced': 'Not introduced yet',
  discovered: 'Has met this idea',
  guided: 'Can do it with help',
  practiced: 'Practising independently',
  demonstrated: 'Shows it reliably',
  'applied-creatively': 'Uses it in their own ideas',
};

/** What the child sees — a seed growing. Never a grade. */
export interface ChildTier { readonly key: string; readonly label: string; readonly icon: string; }

export function childTier(state: MasteryState): ChildTier {
  switch (state) {
    case 'not-introduced': return { key: 'seed', label: 'Seed', icon: '🌰' };
    case 'discovered':
    case 'guided': return { key: 'sprout', label: 'Sprout', icon: '🌱' };
    case 'practiced':
    case 'demonstrated': return { key: 'bloom', label: 'Bloom', icon: '🌸' };
    case 'applied-creatively': return { key: 'shining', label: 'Shining Bloom', icon: '🌟' };
  }
}

/** One observed act, recorded as it happens. */
export interface EvidenceEvent {
  readonly stage: CurriculumStageId;
  /** Matches an EvidenceRequirement id on the stage. */
  readonly requirement: string;
  readonly phase: LearningPhase;
  readonly levelId: string;
  /** A sentence a grown-up can read verbatim. */
  readonly note: string;
}

export type EvidenceLog = readonly EvidenceEvent[];

export interface StageMastery {
  readonly stage: CurriculumStageId;
  readonly state: MasteryState;
  /** Distinct evidence requirements met, out of the stage's total. */
  readonly metRequirements: readonly string[];
  readonly totalRequirements: number;
  /** Which of discover/guide/build/debug/create have been seen. */
  readonly phasesSeen: readonly LearningPhase[];
}

/**
 * Mastery is derived from the phases a child has actually been through
 * and the distinct evidence they produced — never from level count.
 *
 * A concept is not "learned" because one guided level was completed:
 * reaching `demonstrated` requires an unaided BUILD plus a repair, and
 * `applied-creatively` requires using the idea in a new context.
 */
export function stageMastery(stageId: CurriculumStageId, log: EvidenceLog): StageMastery {
  const def = stage(stageId);
  const mine = log.filter((e) => e.stage === stageId);
  const met = [...new Set(mine.map((e) => e.requirement))]
    .filter((r) => def.evidenceRequirements.some((x) => x.id === r));
  const phases = LEARNING_PHASES.filter((p) => mine.some((e) => e.phase === p));
  const has = (p: LearningPhase): boolean => phases.includes(p);

  let state: MasteryState = 'not-introduced';
  if (mine.length > 0) state = 'discovered';
  if (has('guide')) state = 'guided';
  if (has('build')) state = 'practiced';
  // Reliable = built it unaided AND repaired a broken one.
  if (has('build') && has('debug') && met.length >= Math.min(2, def.evidenceRequirements.length)) {
    state = 'demonstrated';
  }
  if (state === 'demonstrated' && has('create')) state = 'applied-creatively';

  return {
    stage: stageId,
    state,
    metRequirements: met,
    totalRequirements: def.evidenceRequirements.length,
    phasesSeen: phases,
  };
}

export function allMastery(log: EvidenceLog): StageMastery[] {
  return CURRICULUM_STAGES.map((s) => stageMastery(s.id, log));
}

/** True once the child has met the idea at all — used for gentle gating. */
export function isIntroduced(stageId: CurriculumStageId, log: EvidenceLog): boolean {
  return stageMastery(stageId, log).state !== 'not-introduced';
}

/**
 * Whether a stage is ready to be introduced. Prerequisites must have been
 * MET, not mastered — the addendum is explicit that progression must not
 * be rigid or punitive, so a single wobbly attempt never blocks anyone.
 */
export function isStageAvailable(stageId: CurriculumStageId, log: EvidenceLog): boolean {
  return stage(stageId).prerequisites.every((p) => isIntroduced(p, log));
}

/** The next idea worth offering, or null when all fourteen are underway. */
export function nextStage(log: EvidenceLog): CurriculumStageId | null {
  const notYet = CURRICULUM_STAGES.find((s) => !isIntroduced(s.id, log) && isStageAvailable(s.id, log));
  return notYet?.id ?? null;
}
