/**
 * Many right answers (§13, §14).
 *
 * Three programs move three berries: three MOVE tiles, a REPEAT 3, or a
 * REPEAT UNTIL BASKET IS FULL. All three work. The addendum is explicit
 * that all three earn "IT WORKS", and that the differences between them
 * are described, never scored.
 *
 * The app's current star rule is the thing this exists to correct. It
 * awards "It Is Clever!" for `program.length <= par`, which quietly says
 * shorter is better — and shorter is NOT better when the short plan is
 * the one that breaks the moment the basket size changes. §14 asks for
 * tradeoffs instead: fast versus careful, short versus adaptable, and no
 * declaration that either wins.
 *
 * So nothing here returns a score, a rank, or a best. It returns
 * observations, and the UI shows them side by side.
 */
import type { CurriculumStageId } from '../data/curriculum/stages';

/** One solution, described by what it contains rather than by its text. */
export interface SolutionShape {
  readonly worksAgainstGoal: boolean;
  readonly commandCount: number;
  readonly usesLoop: boolean;
  readonly usesFunction: boolean;
  readonly usesCondition: boolean;
  readonly hasStoppingRule: boolean;
  readonly usesApproval: boolean;
  readonly usesMemory: boolean;
  /** Edge-case ids this solution was tried against and survived. */
  readonly handlesEdgeCases: readonly string[];
}

export interface SolutionEvaluation extends SolutionShape {
  readonly works: boolean;
  /** Neutral, comparative sentences. Never a verdict. */
  readonly explanationTokens: readonly SolutionTrait[];
  readonly conceptsShown: readonly CurriculumStageId[];
}

/**
 * The traits a solution can have.
 *
 * A closed list, deliberately: it stops anyone later adding "inefficient"
 * or "suboptimal" and quietly reintroducing a ranking through the back
 * door. Every one of these is something a plan IS, not something it
 * failed to be.
 */
export type SolutionTrait =
  | 'direct' | 'clever' | 'adaptable' | 'careful' | 'reusable'
  | 'checks-first' | 'remembers' | 'tested';

export const TRAIT_PHRASE: Readonly<Record<SolutionTrait, string>> = {
  direct: 'You gave every step.',
  clever: 'You used a loop.',
  adaptable: 'Your plan keeps checking.',
  careful: 'Your plan asks before the big moments.',
  reusable: 'You saved a job to use again.',
  'checks-first': 'Your plan looks before it acts.',
  remembers: 'Your plan remembers what it already did.',
  tested: 'Your plan still worked when things changed.',
};

/**
 * How each trait helps. Shown when two solutions are compared, so the
 * child sees a reason rather than a preference.
 */
export const TRAIT_STRENGTH: Readonly<Record<SolutionTrait, string>> = {
  direct: 'Easy to read — you can see exactly what happens.',
  clever: 'Fewer tiles to place.',
  adaptable: 'Still works if the amount changes.',
  careful: 'A person decides the important bits.',
  reusable: 'Build it once, use it anywhere.',
  'checks-first': 'Does not act on something it has not looked at.',
  remembers: 'Does not do the same job twice.',
  tested: 'You know it works in more than one situation.',
};

export function evaluateSolution(shape: SolutionShape): SolutionEvaluation {
  const traits: SolutionTrait[] = [];
  const concepts: CurriculumStageId[] = [];

  if (!shape.usesLoop && shape.commandCount > 0) traits.push('direct');
  if (shape.usesLoop) { traits.push('clever'); concepts.push('loops'); }
  if (shape.hasStoppingRule) { traits.push('adaptable'); concepts.push('loops'); }
  if (shape.usesApproval) { traits.push('careful'); concepts.push('agents'); }
  if (shape.usesFunction) { traits.push('reusable'); concepts.push('functions'); }
  if (shape.usesCondition) { traits.push('checks-first'); concepts.push('conditions'); }
  if (shape.usesMemory) { traits.push('remembers'); concepts.push('variables'); }
  if (shape.handlesEdgeCases.length > 0) traits.push('tested');
  if (shape.commandCount > 0) concepts.push('sequence');

  return {
    ...shape,
    works: shape.worksAgainstGoal,
    explanationTokens: traits,
    conceptsShown: [...new Set(concepts)],
  };
}

export interface SolutionComparison {
  /** True when both solutions reach the goal — the usual case (§13). */
  readonly bothWork: boolean;
  /** Traits only the first has. */
  readonly onlyFirst: readonly SolutionTrait[];
  readonly onlySecond: readonly SolutionTrait[];
  readonly shared: readonly SolutionTrait[];
  /** One sentence a child hears. Comparative, never a winner. */
  readonly childFacingSummary: string;
}

/**
 * Put two working plans beside each other.
 *
 * There is no `better` field and there will not be one. §14: "avoid
 * declaring one approach universally best". If a caller wants to
 * recommend something, it has to say why in a specific situation, which
 * is the actual skill being taught.
 */
export function compareSolutions(
  a: SolutionEvaluation,
  b: SolutionEvaluation,
): SolutionComparison {
  const first = new Set(a.explanationTokens);
  const second = new Set(b.explanationTokens);
  const onlyFirst = [...first].filter((t) => !second.has(t));
  const onlySecond = [...second].filter((t) => !first.has(t));
  const shared = [...first].filter((t) => second.has(t));
  const bothWork = a.works && b.works;

  return {
    bothWork,
    onlyFirst,
    onlySecond,
    shared,
    childFacingSummary: summarise(a, b, bothWork, onlyFirst, onlySecond),
  };
}

function summarise(
  a: SolutionEvaluation,
  b: SolutionEvaluation,
  bothWork: boolean,
  onlyFirst: readonly SolutionTrait[],
  onlySecond: readonly SolutionTrait[],
): string {
  if (!bothWork) return 'One of these reaches the goal. Shall we look at the other?';
  if (onlyFirst.length === 0 && onlySecond.length === 0) {
    return 'Both plans work, in much the same way.';
  }
  if (a.commandCount !== b.commandCount) {
    const shorter = a.commandCount < b.commandCount ? 'first' : 'second';
    return `Both plans work. The ${shorter} one uses fewer tiles — and they may be good at different things.`;
  }
  return 'Both plans work, and each one is good at something different.';
}

/**
 * The tradeoff cards from §14.
 *
 * Each one is a genuine pair where the answer really is "it depends",
 * which is why none of them has a right-hand side marked correct.
 */
export interface TradeoffCard {
  readonly id: string;
  readonly question: string;
  readonly optionA: { readonly label: string; readonly whenBetter: string };
  readonly optionB: { readonly label: string; readonly whenBetter: string };
}

export const TRADEOFF_CARDS: readonly TradeoffCard[] = [
  {
    id: 'short-vs-adaptable',
    question: 'Fewer tiles, or keeps checking?',
    optionA: { label: 'Fewer tiles', whenBetter: 'When you know exactly how many there are.' },
    optionB: { label: 'Keeps checking', whenBetter: 'When the number might change.' },
  },
  {
    id: 'fast-vs-careful',
    question: 'Go fast, or ask first?',
    optionA: { label: 'Go fast', whenBetter: 'When nothing can go wrong.' },
    optionB: { label: 'Ask first', whenBetter: 'When something might break.' },
  },
  {
    id: 'one-vs-many',
    question: 'One Bop, or share the jobs?',
    optionA: { label: 'One Bop', whenBetter: 'When the job is small.' },
    optionB: { label: 'Share the jobs', whenBetter: 'When there is a lot to do at once.' },
  },
  {
    id: 'remember-vs-check',
    question: 'Remember it, or look again?',
    optionA: { label: 'Remember it', whenBetter: 'When it will not have changed.' },
    optionB: { label: 'Look again', whenBetter: 'When it might have changed since.' },
  },
];
