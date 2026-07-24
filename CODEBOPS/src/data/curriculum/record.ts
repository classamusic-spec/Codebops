/**
 * Turning play into learning evidence.
 *
 * A level declares what it CAN demonstrate (levelMeta.ts); this decides
 * what a particular run actually demonstrated. Deliberately not "finished
 * the level, tick everything": how much a run earns depends on how well
 * it went, and the learning PHASE always comes from the level's own
 * design. So a child who scrapes one star on a build level does not
 * arrive at "demonstrated", and "applied creatively" can only come from
 * levels that genuinely ask for transfer.
 */
import type { EvidenceEvent } from './mastery';
import type { CurriculumStageId } from './stages';
import { stage } from './stages';
import { levelCurriculum } from './levelMeta';

/** How many of a level's evidence items a run of this quality earns. */
function creditCount(total: number, stars: number): number {
  if (total === 0) return 0;
  if (stars >= 3) return total;
  if (stars >= 2) return Math.max(1, Math.ceil(total * 0.6));
  if (stars >= 1) return 1;
  return 0;
}

/** Human sentence for a parent report, e.g. "In Loop Lift: Chooses a useful repetition count." */
function noteFor(requirementId: string, levelTitle: string): string {
  const owner = findRequirement(requirementId);
  if (!owner) return `In ${levelTitle}: showed something new.`;
  return `In ${levelTitle}: ${owner.req.description}.`;
}

/** The shape Code Peek already produces — repeated here so storage never imports UI. */
export interface RunStep {
  readonly label: string;
  readonly arg?: number;
  readonly isLoop?: boolean;
}

/**
 * A concrete sentence about the program the child actually placed, so a
 * report can say "noticed four repeated Lift steps could be one Repeat 4"
 * instead of only quoting the curriculum. Returns null when the program
 * shows nothing specific — nothing is invented to fill the gap.
 */
export function programObservation(
  steps: readonly RunStep[],
): { stage: CurriculumStageId; text: string } | null {
  const loopAt = steps.findIndex((s) => s.isLoop);
  if (loopAt > 0) {
    const loop = steps[loopAt];
    const body = steps.slice(0, loopAt);
    const n = loop.arg ?? 2;
    const text = body.length === 1
      ? `noticed ${n} repeated ${body[0].label} steps could be one Repeat ${n}`
      : `wrapped ${body.length} steps in a single Repeat ${n}`;
    return { stage: 'loops', text };
  }
  if (steps.length >= 3 && !steps.some((s) => s.isLoop)) {
    return { stage: 'sequence', text: `ordered ${steps.length} steps to reach the goal` };
  }
  return null;
}

function findRequirement(id: string): { stageId: CurriculumStageId; req: { id: string; description: string } } | null {
  // Requirement ids are unique across the curriculum (validated in tests).
  const prefixes: CurriculumStageId[] = [
    'sequence', 'events', 'loops', 'conditions', 'if-else', 'functions', 'variables',
    'state', 'messages', 'parallelism', 'debugging', 'decomposition', 'data', 'agents',
  ];
  for (const sid of prefixes) {
    const req = stage(sid).evidenceRequirements.find((r) => r.id === id);
    if (req) return { stageId: sid, req };
  }
  return null;
}

/**
 * Evidence produced by finishing `levelId` with `stars`.
 * Returns [] for levels with no curriculum metadata (nothing is invented).
 */
export function evidenceForRun(
  levelId: string, stars: number, levelTitle: string, steps: readonly RunStep[] = [],
): EvidenceEvent[] {
  const meta = levelCurriculum(levelId);
  if (!meta || stars <= 0) return [];
  const take = creditCount(meta.evidenceEvents.length, stars);
  const observed = programObservation(steps);
  // The concrete sentence describes the program once; the remaining
  // requirements keep their own wording so a report never repeats itself.
  let observationUsed = false;
  const out: EvidenceEvent[] = [];
  const useObservation = (stageId: CurriculumStageId): boolean => {
    if (observationUsed || !observed || observed.stage !== stageId) return false;
    observationUsed = true;
    return true;
  };
  for (const reqId of meta.evidenceEvents.slice(0, take)) {
    const found = findRequirement(reqId);
    if (!found) continue;
    out.push({
      stage: found.stageId,
      requirement: reqId,
      phase: meta.difficulty,
      levelId,
      note: useObservation(found.stageId) ? `In ${levelTitle}, ${observed!.text}.` : noteFor(reqId, levelTitle),
    });
  }
  return out;
}
