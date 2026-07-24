/**
 * Sorter machine interpreter — Phase 6: conditions and sorting.
 *
 * Pure TypeScript, zero THREE/DOM imports. A conveyor delivers a stream
 * of ITEMS to a junction, one at a time. The child's program is a RULE
 * that runs once for EVERY item — a per-item event handler, the big
 * conceptual step of this phase.
 *
 * Guard semantics (extends the app-wide IF rule):
 *  - An IF tile guards the very next tile.
 *  - A SKIPPED IF takes its guarded tile with it — so two IFs in a row
 *    read as AND: [If Red, If Round, Send Left] sends only red AND
 *    round items left. (The skip cascades through consecutive guards.)
 *  - The FIRST send wins: once an item is sent, later send tiles do
 *    nothing. That makes a trailing unguarded send a natural ELSE:
 *    [If Red, Send Left, Send Right] — reds go left, everything else
 *    right. Discovering that trick is the Sensor Sorter creative star.
 *  - An item nobody sends rides straight through to the PASS crate —
 *    a real third destination, not a failure by itself.
 */

export type GtCommandId =
  | 'gtIfRed' | 'gtIfBlue' | 'gtIfRound' | 'gtIfSquare'
  | 'gtSendLeft' | 'gtSendRight' | 'gtSendUp';

export interface GtStep {
  cmd: GtCommandId;
}

export type ItemColor = 'red' | 'blue';
export type ItemShape = 'round' | 'square';

export interface SortItem {
  readonly color: ItemColor;
  readonly shape: ItemShape;
}

/** 'up' is the third bin (Basket C), added for the Conveyor Factory set. */
export type SortDest = 'left' | 'right' | 'up' | 'pass';
export type SendDir = 'left' | 'right' | 'up';

const SEND_DIR: Readonly<Record<string, SendDir>> = {
  gtSendLeft: 'left', gtSendRight: 'right', gtSendUp: 'up',
};

/** First-match routing rule (the level's answer key). */
export interface RouteRule {
  readonly match: { readonly color?: ItemColor; readonly shape?: ItemShape };
  readonly dest: SortDest;
}

export function correctDest(rules: readonly RouteRule[], item: SortItem): SortDest {
  for (const r of rules) {
    if (r.match.color !== undefined && r.match.color !== item.color) continue;
    if (r.match.shape !== undefined && r.match.shape !== item.shape) continue;
    return r.dest;
  }
  return 'pass';
}

/** Kid-facing name for an item ("red berry", "blue berry", "red block"). */
export function itemName(item: SortItem): string {
  return `${item.color} ${item.shape === 'round' ? 'berry' : 'block'}`;
}

export type GtSorterEvent =
  | { type: 'itemEnter'; itemIndex: number; item: SortItem }
  | { type: 'commandStart'; index: number }
  | { type: 'guard'; index: number; cond: GtCommandId; holds: boolean }
  | { type: 'skipped'; index: number }
  | { type: 'send'; index: number; dir: SendDir; item: SortItem; correct: boolean }
  | { type: 'alreadySorted'; index: number }
  | { type: 'itemPass'; item: SortItem; correct: boolean }
  | { type: 'itemDone'; itemIndex: number }
  | { type: 'done' };

export interface GtSorterResult {
  readonly events: readonly GtSorterEvent[];
  /** Where each item actually ended up. */
  readonly placements: readonly SortDest[];
  readonly wrongCount: number;
  readonly allCorrect: boolean;
}

function guardHolds(cmd: GtCommandId, item: SortItem): boolean {
  switch (cmd) {
    case 'gtIfRed': return item.color === 'red';
    case 'gtIfBlue': return item.color === 'blue';
    case 'gtIfRound': return item.shape === 'round';
    case 'gtIfSquare': return item.shape === 'square';
    default: return true;
  }
}

const isGuard = (cmd: GtCommandId): boolean =>
  cmd === 'gtIfRed' || cmd === 'gtIfBlue' || cmd === 'gtIfRound' || cmd === 'gtIfSquare';

export function runSorter(
  program: readonly GtStep[],
  stream: readonly SortItem[],
  rules: readonly RouteRule[],
): GtSorterResult {
  const events: GtSorterEvent[] = [];
  const placements: SortDest[] = [];
  let wrongCount = 0;

  stream.forEach((item, itemIndex) => {
    events.push({ type: 'itemEnter', itemIndex, item });
    let sent: SortDest | null = null;
    let skipNext = false;

    for (let i = 0; i < program.length; i++) {
      const step = program[i];
      if (skipNext) {
        // a skipped IF drags its own guarded tile along (AND semantics)
        skipNext = isGuard(step.cmd);
        events.push({ type: 'skipped', index: i });
        continue;
      }
      events.push({ type: 'commandStart', index: i });
      if (isGuard(step.cmd)) {
        const holds = guardHolds(step.cmd, item);
        events.push({ type: 'guard', index: i, cond: step.cmd, holds });
        if (!holds) skipNext = true;
        continue;
      }
      // send tile
      const dir = SEND_DIR[step.cmd];
      if (sent !== null) {
        events.push({ type: 'alreadySorted', index: i });
        continue;
      }
      sent = dir;
      const correct = correctDest(rules, item) === dir;
      events.push({ type: 'send', index: i, dir, item, correct });
    }

    const dest: SortDest = sent ?? 'pass';
    if (sent === null) {
      const correct = correctDest(rules, item) === 'pass';
      events.push({ type: 'itemPass', item, correct });
      if (!correct) wrongCount++;
    } else if (correctDest(rules, item) !== dest) {
      wrongCount++;
    }
    placements.push(dest);
    events.push({ type: 'itemDone', itemIndex });
  });

  events.push({ type: 'done' });
  return {
    events, placements, wrongCount,
    allCorrect: wrongCount === 0 && stream.length > 0,
  };
}

/** Kid-facing near-miss report for a failed batch. */
export function sorterMisses(
  program: readonly GtStep[],
  stream: readonly SortItem[],
  rules: readonly RouteRule[],
): string[] {
  const r = runSorter(program, stream, rules);
  const misses: string[] = [];
  stream.forEach((item, i) => {
    const want = correctDest(rules, item);
    const got = r.placements[i];
    if (want === got) return;
    const name = itemName(item);
    if (got === 'pass') {
      misses.push(`The ${name} rode straight past — nothing sent it ${want}!`);
    } else if (want === 'pass') {
      misses.push(`The ${name} should ride straight through, but it was sent ${got}!`);
    } else {
      misses.push(`A ${name} landed in the ${got.toUpperCase()} basket — it belongs ${want.toUpperCase()}!`);
    }
  });
  if (misses.length > 3) return [...misses.slice(0, 3), `…and ${misses.length - 3} more mixed-up items.`];
  return misses;
}
