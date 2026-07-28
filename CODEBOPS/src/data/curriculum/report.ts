/**
 * Parent reporting (addendum §10).
 *
 * A report is built ONLY from recorded evidence. Every sentence a
 * grown-up reads is something the child actually did in a named level —
 * never a score, a percentage, a rank, or a comparison with other
 * children. If nothing has been observed for a concept, the report says
 * so plainly rather than inventing progress.
 *
 * Grown-up wording throughout: this is the formal half of the two
 * vocabularies (the child sees Seed / Sprout / Bloom / Shining Bloom).
 */
import type { CurriculumStageId, LearningPhase } from './stages';
import { CURRICULUM_STAGES } from './stages';
import type { EvidenceLog, MasteryState } from './mastery';
import { MASTERY_LABEL, stageMastery } from './mastery';

export interface StageReport {
  readonly stage: CurriculumStageId;
  /** Formal name a grown-up would recognise, e.g. "Loops / Iteration". */
  readonly codingName: string;
  readonly state: MasteryState;
  /** Grown-up label for the state, e.g. "Shows it reliably". */
  readonly label: string;
  readonly description: string;
  /** What was actually observed, one sentence each. May be empty. */
  readonly observations: readonly string[];
  /** A forward-looking suggestion. Never a deficit statement. */
  readonly nextStep: string;
}

export interface ParentReport {
  /** One or two sentences a grown-up can read at a glance. */
  readonly summary: string;
  readonly stages: readonly StageReport[];
  /** Stages with at least one observation, most developed first. */
  readonly active: readonly StageReport[];
}

/** Phase order used when suggesting what to look for next. */
const PHASE_STEP: ReadonlyArray<{ phase: LearningPhase; suggestion: string }> = [
  { phase: 'discover', suggestion: 'A first playful meeting with this idea is coming up.' },
  { phase: 'guide', suggestion: 'Next they will try it with the game guiding them.' },
  { phase: 'build', suggestion: 'Next they will build something with it on their own.' },
  { phase: 'debug', suggestion: 'Next they will repair a program that uses it — the step that shows real understanding.' },
  { phase: 'create', suggestion: 'Next they will use it inside an idea of their own.' },
];

function nextStepFor(seen: readonly LearningPhase[], state: MasteryState): string {
  if (state === 'applied-creatively') {
    return 'They have used this in their own ideas — worth asking them to explain how it works.';
  }
  // Look FORWARD from the furthest phase reached. Suggesting a phase the
  // child has already passed reads as a step backwards, which the
  // addendum's non-punitive rule rules out.
  let furthest = -1;
  PHASE_STEP.forEach((p, i) => { if (seen.includes(p.phase)) furthest = i; });
  const next = PHASE_STEP.slice(furthest + 1).find((p) => !seen.includes(p.phase));
  return next ? next.suggestion : 'Keep playing — more evidence for this idea is on the way.';
}

/**
 * Evidence notes for one stage, newest first, without repeating the same
 * sentence twice (a replayed level re-records the same observation).
 */
function observationsFor(stageId: CurriculumStageId, log: EvidenceLog): string[] {
  const out: string[] = [];
  for (let i = log.length - 1; i >= 0; i--) {
    const e = log[i];
    if (e.stage !== stageId) continue;
    if (!out.includes(e.note)) out.push(e.note);
  }
  return out;
}

export function buildParentReport(log: EvidenceLog): ParentReport {
  const stages: StageReport[] = CURRICULUM_STAGES.map((def) => {
    const m = stageMastery(def.id, log);
    return {
      stage: def.id,
      codingName: def.codingName,
      state: m.state,
      label: MASTERY_LABEL[m.state],
      description: def.description,
      observations: observationsFor(def.id, log),
      nextStep: nextStepFor(m.phasesSeen, m.state),
    };
  });

  const met = stages.filter((s) => s.state !== 'not-introduced');
  const reliable = stages.filter(
    (s) => s.state === 'demonstrated' || s.state === 'applied-creatively',
  );

  const summary = met.length === 0
    ? 'No learning has been recorded yet. Play a level together and this page will fill with what your builder actually did.'
    : `Your builder has met ${met.length} of ${stages.length} big ideas so far`
      + (reliable.length > 0
        ? `, and shows ${reliable.length} of them reliably without help.`
        : '. Keep playing — the ideas they are meeting will grow as they build and repair programs.');

  const active = met.slice().sort((a, b) => b.observations.length - a.observations.length);
  return { summary, stages, active };
}

/**
 * A single headline sentence for the top of the Campfire — the most
 * recent thing observed, or an invitation if nothing has been yet.
 */
export function latestObservation(log: EvidenceLog): string | null {
  const last = log[log.length - 1];
  return last ? last.note : null;
}

