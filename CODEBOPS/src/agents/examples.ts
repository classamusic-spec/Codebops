/**
 * Teach by example (§7, §8).
 *
 * A child shows Pixel a strawberry and says "berry", a blueberry and says
 * "berry", a bolt and says "not a berry". Pixel then has a go at a new
 * object. The child can agree, correct it, or show it another one.
 *
 * The honest bit, and the reason this file is careful: **classification
 * here is nearest-token matching over an approved list, and nothing
 * more.** It is not learning in any sense a computer scientist would
 * defend. What it teaches is true and worth teaching — that examples
 * shape answers, that too few examples give bad answers, that
 * contradictory examples confuse a system, and that similar-looking
 * things can belong to different groups. §7 requires that every learned
 * classification stays scoped to the current level, helper or project,
 * so `ExampleSet` is a plain value the caller owns and stores; nothing
 * here is global and nothing persists by itself.
 */
import type { AgentToken, ConfidenceState, TrainingExample } from './types';

export interface ExampleSet {
  readonly id: string;
  /** The labels this set is allowed to use. Closed, so no free text. */
  readonly labels: readonly AgentToken[];
  readonly examples: readonly TrainingExample[];
}

/** What is wrong with a set of examples, in a form a child can act on. */
export type ExampleProblem =
  | { readonly kind: 'tooFew'; readonly have: number; readonly need: number }
  | { readonly kind: 'labelMissing'; readonly label: AgentToken }
  | { readonly kind: 'conflict'; readonly inputToken: AgentToken; readonly labels: readonly AgentToken[] }
  | { readonly kind: 'oneSided'; readonly label: AgentToken };

/**
 * Below this, a set cannot be confident about anything.
 *
 * Two is the smallest number that can show a contrast — one example of
 * one label teaches "everything is a berry", which is exactly the mistake
 * Example Mixer exists to dramatise.
 */
export const MINIMUM_EXAMPLES = 2;

/**
 * Everything wrong with a set, worst first.
 *
 * Reported, never blocked. A child mid-teaching always has an incomplete
 * set, and refusing to run would remove the very feedback that shows why
 * the set needs more work.
 */
export function inspectExamples(set: ExampleSet): readonly ExampleProblem[] {
  const problems: ExampleProblem[] = [];

  if (set.examples.length < MINIMUM_EXAMPLES) {
    problems.push({ kind: 'tooFew', have: set.examples.length, need: MINIMUM_EXAMPLES });
  }

  // The same object taught two different answers. Nothing downstream can
  // resolve this, so it is the most important thing to say.
  const byInput = new Map<AgentToken, Set<AgentToken>>();
  for (const ex of set.examples) {
    const seen = byInput.get(ex.inputToken) ?? new Set<AgentToken>();
    seen.add(ex.labelToken);
    byInput.set(ex.inputToken, seen);
  }
  for (const [inputToken, labels] of byInput) {
    if (labels.size > 1) {
      problems.push({ kind: 'conflict', inputToken, labels: [...labels].sort() });
    }
  }

  const used = new Set(set.examples.map((e) => e.labelToken));
  for (const label of set.labels) {
    if (!used.has(label)) problems.push({ kind: 'labelMissing', label });
  }

  // Everything it has ever seen was the same answer, but it has been
  // TOLD there are others. "Pixel only saw red berries."
  if (used.size === 1 && set.labels.length > 1 && set.examples.length >= MINIMUM_EXAMPLES) {
    problems.push({ kind: 'oneSided', label: [...used][0] });
  }

  const rank = { conflict: 0, tooFew: 1, oneSided: 2, labelMissing: 3 } as const;
  return problems.sort((a, b) => rank[a.kind] - rank[b.kind]);
}

export interface Classification {
  readonly label: AgentToken | null;
  readonly confidence: ConfidenceState;
  /** The examples that decided it — what BopLens shows. */
  readonly basis: readonly TrainingExample[];
}

/**
 * Guess the label for a new object.
 *
 * Exact-token match against the examples, and a vote when several agree.
 * No embeddings, no similarity metric, no model: the child's mental
 * model has to be "it looks for one it has seen before", and any
 * cleverness here would make the helper's answers unexplainable at
 * exactly the moment a child asks why.
 */
export function classify(set: ExampleSet, inputToken: AgentToken): Classification {
  const matches = set.examples.filter((e) => e.inputToken === inputToken);
  const problems = inspectExamples(set);
  const conflicted = problems.some(
    (p) => p.kind === 'conflict' && p.inputToken === inputToken,
  );

  // Never seen it. This is the honest "I don't know", and §9 says the
  // right move is to say so rather than to pick the nearest thing.
  if (matches.length === 0) {
    return { label: null, confidence: 'unsure', basis: [] };
  }

  // Seen it, but taught two different answers for it.
  if (conflicted) {
    return { label: null, confidence: 'unsure', basis: matches };
  }

  const label = matches[0].labelToken;

  // Seen it, but the set as a whole is too thin or one-sided to trust.
  const weak = problems.some((p) => p.kind === 'tooFew' || p.kind === 'oneSided');
  if (weak) return { label, confidence: 'maybe', basis: matches };

  // A single example is a fact about one object, not a pattern.
  if (matches.length === 1) return { label, confidence: 'maybe', basis: matches };

  return { label, confidence: 'confident', basis: matches };
}

/** Add an example, replacing any earlier answer for the same object. */
export function addExample(set: ExampleSet, example: TrainingExample): ExampleSet {
  if (!set.labels.includes(example.labelToken)) return set;
  const kept = set.examples.filter(
    (e) => !(e.inputToken === example.inputToken && e.source === example.source),
  );
  return { ...set, examples: [...kept, example] };
}

/**
 * The child says "no, that one is a bolt".
 *
 * A correction wins over a starter example rather than sitting beside
 * it, so the contradiction disappears instead of becoming a conflict the
 * child then has to hunt down. Correcting should feel like fixing.
 */
export function correctExample(
  set: ExampleSet,
  inputToken: AgentToken,
  labelToken: AgentToken,
  id: string,
): ExampleSet {
  if (!set.labels.includes(labelToken)) return set;
  const kept = set.examples.filter((e) => e.inputToken !== inputToken);
  return {
    ...set,
    examples: [...kept, { id, inputToken, labelToken, source: 'child-corrected' }],
  };
}

export function removeExample(set: ExampleSet, exampleId: string): ExampleSet {
  return { ...set, examples: set.examples.filter((e) => e.id !== exampleId) };
}

/** What a child is told about a problem (§8: no technical vocabulary). */
export function describeProblem(problem: ExampleProblem): string {
  switch (problem.kind) {
    case 'tooFew':
      return 'I have only seen a couple of things. Show me some more!';
    case 'conflict':
      return 'These two examples have different answers. Can we check them?';
    case 'oneSided':
      return 'Everything I have seen was the same. Can you show me a different one?';
    case 'labelMissing':
      return 'I have never seen one of those. Can you show me?';
  }
}
