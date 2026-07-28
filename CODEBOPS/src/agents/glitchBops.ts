/**
 * The GlitchBops (§17) — friendly names for understandable mistakes.
 *
 * The important design decision: **a GlitchBop is DETECTED from a real
 * run, never authored into a level.** A level that declares "Forgetti
 * appears here" would be a cutscene, and the child would learn that
 * Forgetti is a character rather than a shape their own plan can have.
 * Detected, it turns up because of something they actually built — which
 * is the only version that transfers.
 *
 * They are not enemies. Every phrase below describes the PLAN, never the
 * child, and every one is followed by something to try.
 */
import type { AgentDecisionTrace } from './types';
import type { AgentMission } from './mission';
import { missionGaps } from './mission';
import type { ExampleSet } from './examples';
import { inspectExamples } from './examples';

export type GlitchBopId =
  | 'mixy' | 'copycat' | 'forever-fred' | 'maybe' | 'bossy'
  | 'forgetti' | 'echo' | 'shortcut' | 'guessy' | 'example-mixer';

export interface GlitchBopDefinition {
  readonly id: GlitchBopId;
  readonly name: string;
  readonly icon: string;
  /** What went wrong, in the child's words. Always about the plan. */
  readonly childFacingPhrase: string;
  /** The grown-up name for the underlying design problem. */
  readonly formalProblem: string;
  /** What to try. Never the answer — a direction to look. */
  readonly childFacingFix: string;
}

export const GLITCH_BOPS: readonly GlitchBopDefinition[] = [
  {
    id: 'mixy', name: 'Mixy', icon: '🌀',
    childFacingPhrase: 'These steps got mixed up.',
    formalProblem: 'Instructions in the wrong order',
    childFacingFix: 'Which step should come first?',
  },
  {
    id: 'copycat', name: 'Copycat', icon: '🐾',
    childFacingPhrase: 'It kept doing the same thing.',
    formalProblem: 'Repetition without re-checking whether it still helps',
    childFacingFix: 'What should it check before doing it again?',
  },
  {
    id: 'forever-fred', name: 'Forever Fred', icon: '♾️',
    childFacingPhrase: 'It needs to know when to stop.',
    formalProblem: 'No stopping condition',
    childFacingFix: 'When would you want it to stop?',
  },
  {
    id: 'maybe', name: 'Maybe', icon: '🤔',
    childFacingPhrase: 'It is not sure yet.',
    formalProblem: 'Low confidence or missing information',
    childFacingFix: 'What could help it be more sure?',
  },
  {
    id: 'bossy', name: 'Bossy', icon: '📣',
    childFacingPhrase: 'Every helper got the same job.',
    formalProblem: 'Incorrect delegation',
    childFacingFix: 'Could they each do a different part?',
  },
  {
    id: 'forgetti', name: 'Forgetti', icon: '🍝',
    childFacingPhrase: 'It forgot what already happened.',
    formalProblem: 'Missing, wrong or stale memory',
    childFacingFix: 'What would be useful to remember?',
  },
  {
    id: 'echo', name: 'Echo', icon: '📢',
    childFacingPhrase: 'It copied the words, but did not check the job.',
    formalProblem: 'Repeating an instruction without checking context',
    childFacingFix: 'Does this rule still make sense for this one?',
  },
  {
    id: 'shortcut', name: 'Shortcut', icon: '✂️',
    childFacingPhrase: 'It rushed past a check.',
    formalProblem: 'An important check is skipped or unreachable',
    childFacingFix: 'Is there a rule that never gets a turn?',
  },
  {
    id: 'guessy', name: 'Guessy', icon: '🎲',
    childFacingPhrase: 'It guessed instead of looking.',
    formalProblem: 'Acting without evidence',
    childFacingFix: 'What could it look at first?',
  },
  {
    id: 'example-mixer', name: 'Example Mixer', icon: '🧺',
    childFacingPhrase: 'It needs more kinds of examples.',
    formalProblem: 'Incomplete or unbalanced example set',
    childFacingFix: 'Can you show it a different one?',
  },
];

const BY_ID = new Map(GLITCH_BOPS.map((g) => [g.id, g]));

export function glitchBop(id: GlitchBopId): GlitchBopDefinition {
  const g = BY_ID.get(id);
  if (!g) throw new Error(`[glitchBops] Unknown GlitchBop "${id}"`);
  return g;
}

export interface GlitchSighting {
  readonly bop: GlitchBopDefinition;
  /** Which decision it showed up at, when that is knowable. */
  readonly atStep?: number;
  /** Which rule to point at, when that is knowable. */
  readonly ruleId?: string;
}

export interface GlitchInputs {
  readonly trace: readonly AgentDecisionTrace[];
  readonly mission?: AgentMission;
  readonly examples?: ExampleSet;
  readonly stoppedBecause?: string;
}

/**
 * Who turned up in this run?
 *
 * At most ONE of each, and ordered by how actionable they are. A run
 * that summons six GlitchBops at once has told a child nothing — the
 * point of a friendly face is that it names one thing to go and look at.
 */
export function detectGlitchBops(inputs: GlitchInputs): readonly GlitchSighting[] {
  const found: GlitchSighting[] = [];
  const { trace } = inputs;

  // Forever Fred: ran out of budget rather than finishing.
  if (inputs.stoppedBecause === 'stepLimit' || inputs.stoppedBecause === 'actionLimit') {
    found.push({ bop: glitchBop('forever-fred') });
  }

  // Shortcut: a rule that can never get a turn. Read off the mission
  // rather than the trace, because a rule that never fires leaves no
  // trace at all — which is exactly why it is hard to spot by playing.
  if (inputs.mission) {
    for (const gap of missionGaps(inputs.mission)) {
      if (gap.kind === 'ruleNeverRuns') {
        found.push({ bop: glitchBop('shortcut'), ruleId: gap.ruleId });
        break;
      }
    }
  }

  // Guessy: acted on something it could not see clearly.
  const guessed = trace.find((t) =>
    t.outcome.kind === 'acted' && t.observations.some((o) => !o.clear));
  if (guessed) found.push({ bop: glitchBop('guessy'), atStep: guessed.step });

  // Forgetti: did the same job to the same subject more than once.
  const actedOn = new Map<string, number>();
  let repeated: AgentDecisionTrace | undefined;
  for (const t of trace) {
    if (t.outcome.kind !== 'acted') continue;
    for (const o of t.observations) {
      const n = (actedOn.get(o.subjectId) ?? 0) + 1;
      actedOn.set(o.subjectId, n);
      if (n > 1 && !repeated) repeated = t;
    }
  }
  if (repeated) found.push({ bop: glitchBop('forgetti'), atStep: repeated.step });

  // Copycat: every single decision fired the same rule, with no branch
  // anywhere. Only interesting once there is enough of a run to judge.
  const ruleIds = trace.map((t) => t.selectedRuleId).filter((r): r is string => !!r);
  if (ruleIds.length >= 4 && new Set(ruleIds).size === 1) {
    found.push({ bop: glitchBop('copycat'), ruleId: ruleIds[0] });
  }

  // Echo: a rule matched and ran on something it was not written for —
  // the catch-all firing on a subject whose own rule sits below it.
  const echoed = trace.find((t) =>
    t.candidateRules.length > 1 && t.outcome.kind === 'acted'
    && t.selectedRuleId === t.candidateRules[0]
    && t.confidence === 'maybe');
  if (echoed) found.push({ bop: glitchBop('echo'), atStep: echoed.step });

  // Maybe: never actually sure of anything.
  if (trace.length > 0 && trace.every((t) => t.confidence !== 'confident')) {
    found.push({ bop: glitchBop('maybe') });
  }

  // Example Mixer: the examples themselves are the problem.
  if (inputs.examples) {
    const problems = inspectExamples(inputs.examples);
    if (problems.some((p) => p.kind === 'oneSided' || p.kind === 'tooFew' || p.kind === 'conflict')) {
      found.push({ bop: glitchBop('example-mixer') });
    }
  }

  // Mixy: nothing matched anything, over and over. The order-of-steps
  // GlitchBop, in a rule-shaped world: the plan does not fit the job.
  const missed = trace.filter((t) => t.outcome.kind === 'noRuleMatched').length;
  if (trace.length > 0 && missed === trace.length) {
    found.push({ bop: glitchBop('mixy') });
  }

  return dedupe(found);
}

function dedupe(sightings: readonly GlitchSighting[]): readonly GlitchSighting[] {
  const seen = new Set<GlitchBopId>();
  return sightings.filter((s) => {
    if (seen.has(s.bop.id)) return false;
    seen.add(s.bop.id);
    return true;
  });
}

/**
 * The one to actually show.
 *
 * A run can genuinely have several problems, and saying so all at once
 * is how a child stops reading. The first sighting is the most
 * actionable, because `detectGlitchBops` builds the list in that order.
 */
export function headlineGlitch(sightings: readonly GlitchSighting[]): GlitchSighting | null {
  return sightings[0] ?? null;
}
