/**
 * Curriculum validation — the enforcement half of the addendum.
 *
 * These checks run in the logic test suite, so a level that references
 * an unknown concept, assesses something never introduced, or carries no
 * learning objective fails during development rather than reaching a
 * child.
 */
import type { CurriculumStageId } from './stages';
import { CURRICULUM_STAGES, isStageId, stage, allPrerequisites } from './stages';
import type { LevelCurriculumMetadata } from './levelMeta';
import { LEVEL_CURRICULUM, levelsForStage, phasesForStage } from './levelMeta';

export interface CurriculumIssue {
  readonly where: string;
  readonly problem: string;
}

const err = (where: string, problem: string): CurriculumIssue => ({ where, problem });

/** Structural checks on the fourteen stages themselves. */
export function validateStages(): CurriculumIssue[] {
  const issues: CurriculumIssue[] = [];
  const seen = new Set<CurriculumStageId>();
  CURRICULUM_STAGES.forEach((s, i) => {
    if (s.order !== i + 1) issues.push(err(s.id, `order ${s.order} does not match position ${i + 1}`));
    if (seen.has(s.id)) issues.push(err(s.id, 'duplicate stage id'));
    seen.add(s.id);
    if (!s.childFacingLanguage.trim()) issues.push(err(s.id, 'missing child-facing language'));
    if (s.evidenceRequirements.length === 0) issues.push(err(s.id, 'has no evidence requirements'));
    if (s.introductoryWorlds.length === 0) issues.push(err(s.id, 'is never introduced in any world'));
    // A prerequisite must come EARLIER in the official order.
    for (const p of s.prerequisites) {
      if (!isStageId(p)) { issues.push(err(s.id, `unknown prerequisite "${p}"`)); continue; }
      if (stage(p).order >= s.order) issues.push(err(s.id, `prerequisite "${p}" is not earlier in the curriculum`));
    }
    const dupEv = s.evidenceRequirements.map((e) => e.id)
      .filter((id, k, arr) => arr.indexOf(id) !== k);
    if (dupEv.length) issues.push(err(s.id, `duplicate evidence ids: ${dupEv.join(', ')}`));
  });
  return issues;
}

/** Per-level checks. */
export function validateLevelMeta(l: LevelCurriculumMetadata): CurriculumIssue[] {
  const issues: CurriculumIssue[] = [];
  const where = l.levelId;
  const all = [...l.introducedConcepts, ...l.practicedConcepts, ...l.assessedConcepts];

  for (const c of [...all, ...l.prerequisites]) {
    if (!isStageId(c)) issues.push(err(where, `references unknown concept "${c}"`));
  }
  // "A level has no learning objective."
  if (all.length === 0) issues.push(err(where, 'has no learning objective (no concepts at all)'));
  if (!l.childFacingLearningPhrase.trim()) issues.push(err(where, 'missing child-facing learning phrase'));

  // "An assessed concept has never been introduced."
  for (const c of l.assessedConcepts) {
    if (!isStageId(c)) continue;
    const introducedSomewhere = LEVEL_CURRICULUM.some((x) => x.introducedConcepts.includes(c));
    const taughtHere = l.introducedConcepts.includes(c) || l.practicedConcepts.includes(c);
    if (!introducedSomewhere && !taughtHere) {
      issues.push(err(where, `assesses "${c}" but it is never introduced anywhere`));
    }
  }
  // "A prerequisite is missing." — everything this level leans on must be
  // covered by its declared prerequisites (closed over the graph).
  for (const c of all) {
    if (!isStageId(c)) continue;
    if (l.introducedConcepts.includes(c)) continue;   // being taught right here
    for (const need of stage(c).prerequisites) {
      const covered = l.prerequisites.includes(need)
        || l.prerequisites.some((p) => isStageId(p) && allPrerequisites(p).includes(need))
        || all.includes(need);
      if (!covered) issues.push(err(where, `uses "${c}" without declaring prerequisite "${need}"`));
    }
  }
  // Evidence ids must exist on a concept the level actually touches.
  for (const e of l.evidenceEvents) {
    const owner = CURRICULUM_STAGES.find((s) => s.evidenceRequirements.some((r) => r.id === e));
    if (!owner) { issues.push(err(where, `unknown evidence event "${e}"`)); continue; }
    if (!all.includes(owner.id)) {
      issues.push(err(where, `evidence "${e}" belongs to "${owner.id}", which this level does not cover`));
    }
  }
  // "Parent-report evidence cannot be produced."
  if (l.assessedConcepts.length > 0 && l.evidenceEvents.length === 0) {
    issues.push(err(where, 'assesses concepts but produces no evidence for parent reports'));
  }
  // "A creative level has no supported concept set."
  if (l.difficulty === 'create' && l.practicedConcepts.length === 0 && l.assessedConcepts.length === 0) {
    issues.push(err(where, 'is a creative level with no supported concepts'));
  }
  return issues;
}

/** Whole-curriculum coverage checks. */
export function validateCoverage(): CurriculumIssue[] {
  const issues: CurriculumIssue[] = [];
  const ids = LEVEL_CURRICULUM.map((l) => l.levelId);
  const dup = ids.filter((id, i) => ids.indexOf(id) !== i);
  if (dup.length) issues.push(err('registry', `duplicate level metadata: ${[...new Set(dup)].join(', ')}`));

  for (const s of CURRICULUM_STAGES) {
    const levels = levelsForStage(s.id);
    if (levels.length === 0) { issues.push(err(s.id, 'no level teaches or practises this stage')); continue; }
    if (!levels.some((l) => l.introducedConcepts.includes(s.id))) {
      issues.push(err(s.id, 'is practised but never formally introduced'));
    }
    // Debugging must appear in every world that has levels (section 8).
    if (s.id === 'debugging') {
      const worldsWithLevels = [...new Set(LEVEL_CURRICULUM.map((l) => l.world))];
      for (const w of worldsWithLevels) {
        if (!levels.some((l) => l.world === w)) issues.push(err('debugging', `never practised in "${w}"`));
      }
    }
  }
  return issues;
}

/** Everything, for the test suite. */
export function validateCurriculum(): CurriculumIssue[] {
  return [
    ...validateStages(),
    ...LEVEL_CURRICULUM.flatMap(validateLevelMeta),
    ...validateCoverage(),
  ];
}

/**
 * Stages that do not yet offer the full Discover → Create ladder.
 * Reported (not failed) so the curriculum can grow honestly: it tells us
 * where content is still missing instead of pretending coverage is done.
 */
export function incompleteLadders(): Array<{ stage: CurriculumStageId; missing: string[] }> {
  const want = ['discover', 'guide', 'build', 'debug', 'create'];
  return CURRICULUM_STAGES.map((s) => {
    const have = phasesForStage(s.id) as string[];
    return { stage: s.id, missing: want.filter((p) => !have.includes(p)) };
  }).filter((x) => x.missing.length > 0);
}
