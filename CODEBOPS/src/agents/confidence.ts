/**
 * Confidence and uncertainty (§9).
 *
 * The inspection found `agent-confidence` sitting in the curriculum as
 * something a child could demonstrate, with nothing in the app able to
 * produce it. This file is what makes that claim true.
 *
 * The load-bearing decision: **confidence is DERIVED, never authored.**
 * A level cannot mark a moment "unsure". If it could, confidence would
 * be a cutscene — the helper would look worried on cue and the child
 * would learn nothing about why. Deriving it means a child who adds a
 * good example can WATCH the meter move, which is the whole lesson.
 *
 * Three inputs, all things a child can see and change:
 *   1. Can it see clearly?           (observation)
 *   2. Has it seen this before?      (examples)
 *   3. Do its rules agree?           (rules)
 */
import type {
  AgentObservation, AgentRuleDefinition, AgentMemoryState, ConfidenceState,
} from './types';
import { matchRules } from './rules';
import type { ExampleSet } from './examples';
import { classify } from './examples';

/** Worst wins. A helper is only as sure as its least certain input. */
const RANK: Readonly<Record<ConfidenceState, number>> = {
  confident: 0, maybe: 1, unsure: 2,
};

export function weakest(states: readonly ConfidenceState[]): ConfidenceState {
  if (states.length === 0) return 'confident';
  return states.reduce((worst, s) => (RANK[s] > RANK[worst] ? s : worst), 'confident' as ConfidenceState);
}

export interface ConfidenceInputs {
  readonly subject: AgentObservation | null;
  readonly rules: readonly AgentRuleDefinition[];
  readonly memory: AgentMemoryState;
  /** Only when the helper is classifying something. */
  readonly examples?: ExampleSet;
}

export interface ConfidenceAssessment {
  readonly state: ConfidenceState;
  /**
   * Why, in the child's words. One line per contributing reason, so
   * BopLens can show the actual cause and not a generic shrug.
   */
  readonly reasons: readonly string[];
}

export function assessConfidence(inputs: ConfidenceInputs): ConfidenceAssessment {
  const parts: ConfidenceState[] = [];
  const reasons: string[] = [];

  // 1. Seeing. A helper that cannot see properly is never confident,
  //    whatever its rules say — this outranks everything else.
  if (inputs.subject !== null && !inputs.subject.clear) {
    parts.push('unsure');
    reasons.push("I can't see this one properly.");
  }

  // 2. Examples, when the decision rests on recognising something.
  if (inputs.examples && inputs.subject) {
    const guess = classify(inputs.examples, inputs.subject.kind);
    parts.push(guess.confidence);
    if (guess.label === null) reasons.push("I haven't seen one of these before.");
    else if (guess.confidence === 'maybe') reasons.push('I have only seen a few like this.');
  }

  // 3. Rules. No rule at all is the clearest kind of not-knowing.
  const match = matchRules(inputs.rules, inputs.subject, inputs.memory);
  if (match.candidates.length === 0) {
    parts.push('unsure');
    reasons.push("I don't have a rule for this.");
  } else if (match.candidates.length > 1) {
    // Priority WILL pick one, so this is not indecision — it is a true
    // statement that more than one rule wanted this, which is worth
    // saying out loud before the child is surprised by which won.
    parts.push('maybe');
    reasons.push('More than one of my rules matches this.');
  }

  const state = weakest(parts);
  if (reasons.length === 0) reasons.push('I know what to do.');
  return { state, reasons };
}

/** What the helper says out loud (§9). */
export const CONFIDENCE_PHRASE: Readonly<Record<ConfidenceState, string>> = {
  confident: 'I know what to do.',
  maybe: 'I think this is right.',
  unsure: 'I need more information.',
};

/**
 * The face. Never colour alone (§30, and the app's own a11y rules) —
 * shape, face and words all carry it, so it survives a colour-blind
 * child, a greyscale screen and high-contrast mode.
 */
export const CONFIDENCE_FACE: Readonly<Record<ConfidenceState, string>> = {
  confident: '😊', maybe: '🤔', unsure: '😯',
};

export const CONFIDENCE_LABEL: Readonly<Record<ConfidenceState, string>> = {
  confident: 'Sure', maybe: 'Maybe', unsure: 'Not sure',
};

/**
 * What a helper may do when it is not certain (§9).
 *
 * `stopSafely` is always offered, including when confident, because
 * stopping is never the wrong move — and `try` disappears once the
 * helper is properly unsure, which is the mechanic doing the teaching:
 * the child has to give it something, not just tell it to have a go.
 */
export type UncertaintyAction =
  | 'try' | 'lookAgain' | 'checkAnotherExample' | 'askTheChild' | 'askAGrownUp' | 'stopSafely';

export function actionsFor(state: ConfidenceState): readonly UncertaintyAction[] {
  switch (state) {
    case 'confident':
      return ['try', 'stopSafely'];
    case 'maybe':
      return ['try', 'lookAgain', 'checkAnotherExample', 'askTheChild', 'stopSafely'];
    case 'unsure':
      return ['lookAgain', 'checkAnotherExample', 'askTheChild', 'askAGrownUp', 'stopSafely'];
  }
}

export const UNCERTAINTY_LABEL: Readonly<Record<UncertaintyAction, string>> = {
  try: 'Try it',
  lookAgain: 'Look again',
  checkAnotherExample: 'Show me another one',
  askTheChild: 'Ask me',
  askAGrownUp: 'Ask a grown-up',
  stopSafely: 'Stop and wait',
};
