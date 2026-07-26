/**
 * Hints — what to say to a child who is stuck.
 *
 * A hint is worked out from the level AND from what the child has actually
 * built, not written down in advance. A fixed sentence per level says the
 * same thing to a child who has done nothing and to a child who is one
 * tile from winning, and it is exactly the second child who most needs
 * telling something specific. So the level's own program is run through
 * the real interpreter, the result is read, and the hint describes THAT.
 *
 * Two tiers, and only two:
 *
 *   1. A NUDGE — a question that points attention somewhere. It never
 *      says what to do; it says where to look.
 *   2. A STEP — exactly one tile to try next, found by walking the grid.
 *
 * There is deliberately no third tier that fills in the whole program. A
 * child who learns that the ? button finishes levels stops reading it as
 * help and starts reading it as the answer key, and then the game is
 * doing the part that was theirs to do.
 */
import type { LevelDef, ItemKind } from '../data/schemas/level';
import type { CommandId, ProgramStep, GameState } from './commands/interpreter';
import type { Cell } from './grid/grid';
import { runProgram, initialState } from './commands/interpreter';
import { cellKey, inBounds } from './grid/grid';
import { COMMAND_DEFS } from '../data/commands/commandDefs';
import type { HelperRule } from './commands/interpreter';

export interface Hint {
  readonly emoji: string;
  /** Short heading on the card. */
  readonly title: string;
  /** One or two sentences, in words a five-year-old hears every day. */
  readonly text: string;
}

/** What a child calls the thing they are carrying. */
const ITEM_WORD: Record<ItemKind, string> = {
  strawberry: 'strawberry',
  pearl: 'pearl',
  flower: 'flower',
  mushroom: 'mushroom',
  battery: 'battery',
  badge: 'badge',
};

const ITEM_EMOJI: Record<ItemKind, string> = {
  strawberry: '🍓', pearl: '🫧', flower: '🌸',
  mushroom: '🍄', battery: '🔋', badge: '🏅',
};

/** The four screen-arrow tiles, and the step each one takes. */
const STEPS: ReadonlyArray<{ cmd: CommandId; dc: number; dr: number }> = [
  { cmd: 'moveRight', dc: 1, dr: 0 },
  { cmd: 'moveLeft', dc: -1, dr: 0 },
  { cmd: 'moveDown', dc: 0, dr: 1 },
  { cmd: 'moveUp', dc: 0, dr: -1 },
];

function tileName(cmd: CommandId): string {
  return COMMAND_DEFS[cmd]?.label ?? cmd;
}

/**
 * Shortest walk from `from` to `to`, as a list of arrow tiles.
 *
 * Plain breadth-first search over the open cells. It respects the same
 * walls the interpreter does — including the glass domes only bots may
 * cross — so a hint can never point a child at a step that would bump.
 * Returns null when there is genuinely no way through, which is a level
 * design problem rather than something to tell a child about.
 */
function walkTo(state: GameState, from: Cell, to: Cell): CommandId[] | null {
  if (from.col === to.col && from.row === to.row) return [];
  const seen = new Set<string>([cellKey(from)]);
  const queue: Array<{ at: Cell; path: CommandId[] }> = [{ at: from, path: [] }];
  while (queue.length > 0) {
    const { at, path } = queue.shift()!;
    for (const step of STEPS) {
      const next = { col: at.col + step.dc, row: at.row + step.dr };
      const k = cellKey(next);
      if (seen.has(k)) continue;
      if (!inBounds(next, state.cols, state.rows)) continue;
      if (state.blocked.has(k) || state.zipBlocked.has(k)) continue;
      seen.add(k);
      const nextPath = [...path, step.cmd];
      if (next.col === to.col && next.row === to.row) return nextPath;
      queue.push({ at: next, path: nextPath });
    }
  }
  return null;
}

/** Which way `to` lies from `from`, in the words on the tiles. */
function heading(from: Cell, to: Cell): string {
  const parts: string[] = [];
  if (to.row < from.row) parts.push('up');
  if (to.row > from.row) parts.push('down');
  if (to.col < from.col) parts.push('left');
  if (to.col > from.col) parts.push('right');
  return parts.length === 0 ? 'nowhere — Zip is already there' : parts.join(' and ');
}

function squares(n: number): string {
  return n === 1 ? '1 square' : `${n} squares`;
}

/** Where an item is right now, if it is still somewhere on the grid. */
function itemCell(state: GameState, id: string): Cell | null {
  const where = state.items[id];
  if (!where || 'carriedBy' in where || 'delivered' in where) return null;
  return where;
}

/**
 * The hints for a level, given the program the child has built so far.
 *
 * Always returns at least one hint, so the ? button is never a dead end.
 */
export function levelHints(
  level: LevelDef,
  program: readonly ProgramStep[],
  rule: HelperRule | null = null,
): Hint[] {
  const hints: Hint[] = [];

  // Run what they have actually built. Everything below reads the result
  // of the real interpreter rather than guessing at it, so the hint agrees
  // with what pressing BOP would do.
  const result = runProgram(level, program, rule);
  const state = result.finalState;
  const zip = state.actors[0];
  const bumped = result.events.some((e) => e.type === 'bump');
  const carried = level.items.find((it) => {
    const w = state.items[it.id];
    return w !== undefined && 'carriedBy' in w;
  });

  // What are they trying to reach next? The thing they carry wants its
  // pad; otherwise the nearest item a pad will accept.
  const wantedKinds = new Set(level.goals.map((g) => g.accepts));
  const target = carried
    ? level.goals.find((g) => g.accepts === carried.kind) ?? level.goals[0]
    : level.items.find((it) => wantedKinds.has(it.kind) && itemCell(state, it.id) !== null);
  const targetCell: Cell | null = target
    ? ('accepts' in target ? { col: target.col, row: target.row } : itemCell(state, target.id))
    : null;
  // What the child is walking TOWARD. Once Zip is carrying something the
  // destination is the pad, not the thing in his hands — saying "the
  // strawberry is 3 squares away" while he is holding the strawberry is
  // the kind of small wrongness that makes a hint untrustworthy.
  const goingTo = carried ? 'star pad' : target && 'kind' in target ? ITEM_WORD[target.kind] : 'goal';
  // ...whereas the nudges talk about the thing itself, which is what a
  // child is looking at when they are still trying to reach it.
  const noun = carried ? ITEM_WORD[carried.kind] : goingTo;
  const emoji = carried ? ITEM_EMOJI[carried.kind] : target && 'kind' in target ? ITEM_EMOJI[target.kind] : '💡';

  // ---- tier 1: the nudge ----
  // A level may hand-write this one. The wording of a question is the part
  // a person is better at than a rule, and the step below stays derived
  // either way, so an override never goes stale.
  if (level.hint) {
    hints.push({ emoji: '💡', title: 'A little clue', text: level.hint });
  } else if (program.length === 0) {
    hints.push({
      emoji,
      title: 'Where is it?',
      text: `Look at Zip, then look at the ${noun}. How many squares apart are they — and which way?`,
    });
  } else if (bumped) {
    hints.push({
      emoji: '🌳',
      title: 'Something is in the way',
      text: 'Zip bumped into something. Follow your plan with your finger and find the square where Zip gets stuck.',
    });
  } else if (result.overflowed) {
    hints.push({
      emoji: '🔁',
      title: 'Round and round',
      text: 'That loop never stops! What would have to be TRUE for Zip to finish and move on?',
    });
  } else if (carried) {
    hints.push({
      emoji: '⭐',
      title: 'Zip has it!',
      text: `Zip is carrying the ${noun}. Now — where is the star pad, and which way is it from Zip?`,
    });
  } else if (targetCell && (zip.col !== targetCell.col || zip.row !== targetCell.row)) {
    hints.push({
      emoji,
      title: 'Not there yet',
      text: `Your plan stops Zip ${squares(Math.abs(zip.col - targetCell.col) + Math.abs(zip.row - targetCell.row))} away from the ${noun}. Count the squares between them.`,
    });
  } else {
    hints.push({
      emoji: '✋',
      title: 'Standing on it',
      text: `Zip is right on the ${noun}! GRAB only works when Zip is standing on it — is a GRAB tile in your plan yet?`,
    });
  }

  // ---- tier 2: one concrete step ----
  // Exactly one tile, never the rest of the plan.
  if (targetCell) {
    const path = walkTo(state, { col: zip.col, row: zip.row }, targetCell);
    if (path && path.length > 0) {
      hints.push({
        emoji: '👉',
        title: 'Try this next',
        text: `From where your plan leaves Zip, the next tile is ${tileName(path[0]).toUpperCase()}. `
          + `The ${goingTo} is ${squares(path.length)} away going ${heading({ col: zip.col, row: zip.row }, targetCell)}.`,
      });
    } else if (path && path.length === 0) {
      const need: CommandId = carried ? 'drop' : 'grab';
      hints.push({
        emoji: '👉',
        title: 'Try this next',
        text: `Zip is already on the right square. The tile you need now is ${tileName(need).toUpperCase()}.`,
      });
    }
  }

  return hints;
}

/**
 * Hints for the Gearworks benches.
 *
 * Those levels are not grids, so there is nothing to walk — but every one
 * of them already carries a `coachHint` written for the Think Trail, which
 * is exactly a nudge, plus a goal line that makes a fine second tier.
 */
export function benchHints(level: {
  goalText: string;
  coachHint?: string;
  bonusText?: string;
  emoji?: string;
}): Hint[] {
  // Goal first, coach hint second — and that order matters. `coachHint`
  // was written for the Think Trail, which a child only reaches after a
  // run has already gone wrong, so some of them name the tiles outright
  // ("START, then WAIT, then STOP"). That is the right thing to say to
  // someone who has just failed and the wrong thing to open with, so it
  // sits behind "Show me more" where the concrete step belongs.
  const hints: Hint[] = [{
    emoji: level.emoji ?? '🔧',
    title: 'What are we making?',
    text: level.goalText,
  }];
  if (level.coachHint) {
    hints.push({ emoji: '👉', title: 'Try this next', text: level.coachHint });
  }
  return hints;
}

/** True when a level can offer anything at all. Used to hide a dead button. */
export function hasHints(hints: readonly Hint[]): boolean {
  return hints.length > 0;
}

export { initialState };
