/**
 * Turning a decision into something a five-year-old can read (§18, §19).
 *
 * The engine produces `AgentDecisionTrace` rows, which are complete and
 * unreadable. This turns them into the four lines BopLens shows:
 *
 *   I SAW → I REMEMBERED → I CHOSE → THIS HAPPENED
 *
 * Two rules govern every sentence here.
 *
 * §19 bans language implying the helper is conscious. "The Bop wanted",
 * "believed", "understood" are out. The helper checked, used, remembered,
 * chose from its rules. This is not pedantry for its own sake — a child
 * being taught to direct a system has to know it is a system.
 *
 * §4 says essential reasoning must not hide inside animations. So every
 * row survives as text, readable after the fact, with no replay needed.
 */
import type {
  AgentDecisionTrace, AgentMemoryRead, AgentValue, ConfidenceState,
} from './types';
import { SAFE_STOP_PHRASE } from './limits';
import { CONFIDENCE_FACE, CONFIDENCE_LABEL } from './confidence';

/** The four-line explanation for one decision. */
export interface LensCard {
  readonly step: number;
  readonly iSaw: string;
  readonly iRemembered: string;
  readonly iChose: string;
  readonly thisHappened: string;
  readonly confidence: ConfidenceState;
  readonly confidenceFace: string;
  readonly confidenceLabel: string;
  /** Optional expandable rows (§19). Absent when there is nothing to add. */
  readonly details: readonly LensDetail[];
}

export interface LensDetail {
  readonly label: string;
  readonly value: string;
}

export function toLensCard(
  trace: AgentDecisionTrace,
  names: TokenNames = {},
): LensCard {
  const details: LensDetail[] = [];
  if (trace.goalId) details.push({ label: 'My goal', value: name(names, trace.goalId) });
  if (trace.selectedToolId) details.push({ label: 'The tool I used', value: name(names, trace.selectedToolId) });
  if (trace.selectedRuleId) details.push({ label: 'The rule I checked', value: name(names, trace.selectedRuleId) });
  details.push({ label: 'How sure I was', value: CONFIDENCE_LABEL[trace.confidence] });
  if (trace.approvalRequested) {
    details.push({ label: 'Why I asked', value: 'This one needed a person to say yes.' });
  }
  if (trace.outcome.kind === 'stoppedSafely') {
    details.push({ label: 'Why I stopped', value: SAFE_STOP_PHRASE[trace.outcome.reason] });
  }
  // Rules that matched but lost. This is what makes "why did it do THAT
  // one?" answerable, and it is where Bossy and Shortcut become visible.
  if (trace.candidateRules.length > 1) {
    const losers = trace.candidateRules.filter((r) => r !== trace.selectedRuleId);
    details.push({
      label: 'Other rules that matched',
      value: losers.map((r) => name(names, r)).join(', '),
    });
  }

  return {
    step: trace.step,
    iSaw: describeSaw(trace, names),
    iRemembered: describeRemembered(trace.memoryRead, names),
    iChose: describeChose(trace, names),
    thisHappened: describeHappened(trace, names),
    confidence: trace.confidence,
    confidenceFace: CONFIDENCE_FACE[trace.confidence],
    confidenceLabel: CONFIDENCE_LABEL[trace.confidence],
    details,
  };
}

export type TokenNames = Readonly<Record<string, string>>;

function name(names: TokenNames, token: string): string {
  return names[token] ?? token;
}

function describeSaw(trace: AgentDecisionTrace, names: TokenNames): string {
  const [first] = trace.observations;
  if (!first) return 'Nothing to look at.';
  if (!first.clear) return `Something I couldn't see properly.`;
  const attribute = first.attributes[0];
  const thing = name(names, first.kind);
  return attribute ? `A ${name(names, attribute)} ${thing}.` : `A ${thing}.`;
}

function describeRemembered(reads: readonly AgentMemoryRead[], names: TokenNames): string {
  const meaningful = reads.filter((r) => hasContent(r.value));
  if (meaningful.length === 0) return 'Nothing yet.';
  return meaningful
    .map((r) => `${name(names, r.memoryId)}: ${describeValue(r.value)}`)
    .join(' · ');
}

/** Is this worth saying out loud? Zero and empty are not news. */
function hasContent(v: AgentValue | undefined): boolean {
  if (v === undefined) return false;
  if (Array.isArray(v)) return v.length > 0;
  if (typeof v === 'number') return v !== 0;
  if (typeof v === 'boolean') return v;
  return v !== '';
}

function describeValue(v: AgentValue | undefined): string {
  if (v === undefined) return 'nothing';
  if (Array.isArray(v)) return v.length === 1 ? '1 thing' : `${v.length} things`;
  if (typeof v === 'boolean') return v ? 'yes' : 'no';
  return String(v);
}

function describeChose(trace: AgentDecisionTrace, names: TokenNames): string {
  if (!trace.action) return 'Nothing — no rule matched this one.';
  switch (trace.action.kind) {
    case 'useTool': return `To use the ${name(names, trace.action.toolId)}.`;
    case 'remember': return 'To remember this one.';
    case 'forget': return 'To clear what I remembered.';
    case 'count': return 'To count this one.';
    case 'setFlag': return 'To make a note.';
    case 'skip': return 'To leave this one alone.';
    case 'askForHelp': return 'To ask for help.';
    case 'stopSafely': return 'To stop and wait.';
  }
}

function describeHappened(trace: AgentDecisionTrace, names: TokenNames): string {
  switch (trace.outcome.kind) {
    case 'acted':
      return trace.outcome.toolId ? `I used the ${name(names, trace.outcome.toolId)}.` : 'I did it.';
    case 'remembered': return 'I wrote it down.';
    case 'skipped': return 'I left it as it was.';
    case 'askedForHelp': return 'I asked for help.';
    case 'waitingForApproval': return "I'm waiting for you to say yes.";
    case 'stoppedSafely': return SAFE_STOP_PHRASE[trace.outcome.reason];
    case 'noRuleMatched': return 'I walked past it.';
  }
}

/** Think Trail rows — the compact list (§18). */
export interface TrailRow {
  readonly n: number;
  readonly icon: string;
  readonly text: string;
  readonly verdict?: 'ok' | 'no';
}

/** Shaped to match the existing ThinkTrailPanel, so it just plugs in. */
export function toTrailRows(
  trace: readonly AgentDecisionTrace[],
  names: TokenNames = {},
): readonly TrailRow[] {
  return trace.map((t) => {
    const card = toLensCard(t, names);
    return {
      n: t.step,
      icon: iconFor(t),
      text: `${card.iSaw} ${card.thisHappened}`,
      verdict: verdictFor(t),
    };
  });
}

function iconFor(t: AgentDecisionTrace): string {
  switch (t.outcome.kind) {
    case 'acted': return '✅';
    case 'remembered': return '💎';
    case 'skipped': return '⏭️';
    case 'askedForHelp': return '🙋';
    case 'waitingForApproval': return '✋';
    case 'stoppedSafely': return '🛑';
    case 'noRuleMatched': return '❔';
  }
}

/**
 * A tick or a cross — and asking is a tick.
 *
 * §25 forbids rewarding blind action over careful uncertainty, so
 * `askedForHelp` and a safe stop must not draw the same mark as a
 * genuine miss. The only cross is "nothing matched", which is the one
 * case where the child has something to add.
 */
function verdictFor(t: AgentDecisionTrace): 'ok' | 'no' | undefined {
  if (t.outcome.kind === 'noRuleMatched') return 'no';
  if (t.outcome.kind === 'waitingForApproval') return undefined;
  return 'ok';
}
