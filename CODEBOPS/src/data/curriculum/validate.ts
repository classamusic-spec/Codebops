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
import { LEARNING_LAYERS, layerOfStage } from './layers';
import { AGENT_PROGRESSION, AGENT_CONCEPTS } from './agentProgression';
import { TRANSFER_CHALLENGES } from './transfer';
import { WORLDS, isWorldId } from '../worlds';

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

/**
 * The four-layer model (§3), the world registry, the agent ladder and
 * the transfer registry — all checked against the same fourteen stages.
 *
 * These four files are each a second opinion about the curriculum, and a
 * second opinion is only useful while it is forced to agree with the
 * first. The inspection found exactly what happens otherwise: the level
 * picker knew five worlds and the curriculum named eight, for months,
 * with nothing to notice.
 */
export function validateAlignment(): CurriculumIssue[] {
  const issues: CurriculumIssue[] = [];

  // --- layers: every stage in exactly one, no strays ---
  const placed = new Map<CurriculumStageId, string>();
  for (const l of LEARNING_LAYERS) {
    if (l.stages.length === 0) issues.push(err(l.id, 'layer teaches no stages'));
    if (!l.childFacingIdea.trim()) issues.push(err(l.id, 'layer has no child-facing idea'));
    for (const st of l.stages) {
      if (!isStageId(st)) { issues.push(err(l.id, `unknown stage "${st}"`)); continue; }
      const already = placed.get(st);
      if (already) issues.push(err(st, `is in two layers: "${already}" and "${l.id}"`));
      placed.set(st, l.id);
    }
  }
  for (const s of CURRICULUM_STAGES) {
    if (!placed.has(s.id)) issues.push(err(s.id, 'is in no learning layer'));
  }
  LEARNING_LAYERS.forEach((l, i) => {
    if (l.order !== i + 1) issues.push(err(l.id, `layer order ${l.order} does not match position ${i + 1}`));
  });

  // --- worlds: the registry and the curriculum name the same places ---
  const registryIds = new Set(WORLDS.map((w) => w.id));
  const curriculumWorlds = new Set<string>();
  for (const s of CURRICULUM_STAGES) {
    for (const w of [...s.introductoryWorlds, ...s.practiceWorlds, ...s.transferWorlds]) {
      curriculumWorlds.add(w);
    }
  }
  for (const w of curriculumWorlds) {
    if (!registryIds.has(w as never)) issues.push(err('worlds', `curriculum names world "${w}" that the registry does not`));
  }
  for (const l of LEVEL_CURRICULUM) {
    if (!isWorldId(l.world)) issues.push(err(l.levelId, `unknown world "${l.world}"`));
  }
  const orders = WORLDS.map((w) => w.order);
  if (new Set(orders).size !== orders.length) issues.push(err('worlds', 'two worlds share a journey order'));
  for (const w of WORLDS) {
    if (!w.name.trim() || !w.emoji.trim()) issues.push(err(w.id, 'world is missing a name or emoji'));
  }

  // --- agent ladder: every world placed, ideas introduced before reuse ---
  const conceptIds = new Set(AGENT_CONCEPTS.map((c) => c.id));
  const covered = new Set(AGENT_PROGRESSION.map((p) => p.world));
  for (const w of WORLDS) {
    if (!covered.has(w.id)) issues.push(err(w.id, 'world has no agent-concept progression'));
  }
  const introducedSoFar = new Set<string>();
  const byOrder = [...AGENT_PROGRESSION].sort((a, b) => worldOrder(a.world) - worldOrder(b.world));
  for (const p of byOrder) {
    for (const c of p.introduces) {
      if (!conceptIds.has(c)) issues.push(err(p.world, `unknown agent concept "${c}"`));
      if (introducedSoFar.has(c)) issues.push(err(p.world, `agent concept "${c}" was already introduced earlier`));
      introducedSoFar.add(c);
    }
    for (const c of p.revisits) {
      if (!introducedSoFar.has(c)) {
        issues.push(err(p.world, `revisits agent concept "${c}" before anything introduces it`));
      }
    }
    if (!p.childFacingExample.trim()) issues.push(err(p.world, 'agent progression has no child-facing example'));
  }
  for (const c of AGENT_CONCEPTS) {
    if (!introducedSoFar.has(c.id)) issues.push(err('agents', `concept "${c.id}" is never introduced by any world`));
  }

  // --- transfer: real stages, real worlds, and genuinely more than one ---
  for (const t of TRANSFER_CHALLENGES) {
    if (!isStageId(t.stage)) { issues.push(err('transfer', `unknown stage "${t.stage}"`)); continue; }
    if (t.sites.length < 2) issues.push(err(t.stage, 'transfer challenge names fewer than two worlds'));
    if (!t.childFacingPrompt.trim()) issues.push(err(t.stage, 'transfer challenge has no prompt'));
    for (const site of t.sites) {
      if (!isWorldId(site.world)) issues.push(err(t.stage, `transfer names unknown world "${site.world}"`));
      if (!site.childFacingForm.trim()) issues.push(err(t.stage, `transfer site "${site.world}" has no description`));
    }
    const worldsNamed = t.sites.map((s) => s.world);
    if (new Set(worldsNamed).size !== worldsNamed.length) {
      issues.push(err(t.stage, 'transfer names the same world twice'));
    }
  }

  return issues;
}

function worldOrder(id: string): number {
  return WORLDS.find((w) => w.id === id)?.order ?? Number.MAX_SAFE_INTEGER;
}

/**
 * Stages taught in only one place.
 *
 * Reported rather than failed: §21 wants ideas to travel, but a stage
 * with one home is a fact about how much content exists, not a mistake
 * in this file. Failing here would just pressure someone into writing a
 * transfer entry that names a world where the idea does not really live.
 */
export function stagesWithoutTransfer(): readonly CurriculumStageId[] {
  const covered = new Set(TRANSFER_CHALLENGES.filter((t) => t.sites.length > 1).map((t) => t.stage));
  return CURRICULUM_STAGES.filter((s) => !covered.has(s.id)).map((s) => s.id);
}

/** Which layer a stage belongs to — re-exported so callers need one import. */
export { layerOfStage };

/** Everything, for the test suite. */
export function validateCurriculum(): CurriculumIssue[] {
  return [
    ...validateStages(),
    ...LEVEL_CURRICULUM.flatMap(validateLevelMeta),
    ...validateCoverage(),
    ...validateAlignment(),
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
