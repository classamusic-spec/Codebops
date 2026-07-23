/** Typed level schema + development-time validation. */
import { cellKey, inBounds } from '../../gameplay/grid/grid';
import type { CommandId, ProgramStep } from '../../gameplay/commands/interpreter';

export type ItemKind = 'strawberry' | 'pearl' | 'flower' | 'mushroom' | 'battery' | 'badge';
export type WorldId = 'sparkle-meadow' | 'bubble-bay' | 'pattern-forest' | 'robot-town' | 'agent-academy';

/** A helper rule the kid can activate: "WHEN you see a <trigger>, GRAB it!" */
export interface HelperRuleChoice {
  readonly trigger: ItemKind;
  readonly action: 'grab';
}

export interface LevelDef {
  readonly id: string;
  readonly worldId: WorldId;
  readonly title: string;
  readonly shortTitle: string;
  readonly goalText: string;
  readonly cols: number;
  readonly rows: number;
  readonly start: { col: number; row: number; dir: 'N' | 'E' | 'S' | 'W' };
  /** Robot Town: second bot's start (adds the Swap tile mechanic). */
  readonly botStart?: { col: number; row: number; dir: 'N' | 'E' | 'S' | 'W' };
  readonly blocked: ReadonlyArray<{ col: number; row: number }>;
  /** Glass-domed cells: bots roll through, Zip bumps. */
  readonly zipBlocked?: ReadonlyArray<{ col: number; row: number }>;
  readonly items: ReadonlyArray<{ id: string; kind: ItemKind; col: number; row: number }>;
  readonly goals: ReadonlyArray<{ col: number; row: number; accepts: string }>;
  readonly availableCommands: readonly CommandId[];
  readonly maxSlots: number;
  /** Program length at or under this earns the "It Is Clever" star. */
  readonly par: number;
  /** Pre-filled program (debugging levels). */
  readonly prefill?: readonly ProgramStep[];
  /** Intro briefing shown before the level starts. */
  readonly brief: { readonly title: string; readonly text: string; readonly emoji: string };
  /** Bonus star rule: use a tile of this family in the winning program. */
  readonly bonusStar?: 'loop' | 'condition' | 'swap' | 'rule';
  /** Agent Academy: helper-rule choices the kid can switch between. */
  readonly ruleChoices?: readonly HelperRuleChoice[];
  /** When true, EVERY item of a goal-accepted kind must be delivered to win. */
  readonly collectAll?: boolean;
  readonly prediction: {
    readonly prompt: string;
    readonly choices: ReadonlyArray<{ id: string; emoji: string; label: string; correct: boolean }>;
  };
}

export function validateLevel(level: LevelDef): string[] {
  const errors: string[] = [];
  const { cols, rows } = level;
  if (cols < 1 || rows < 1) errors.push('Level grid must be at least 1×1.');
  if (!inBounds(level.start, cols, rows)) errors.push(`Start ${cellKey(level.start)} out of bounds.`);
  const blockedKeys = new Set(level.blocked.map(cellKey));
  if (blockedKeys.has(cellKey(level.start))) errors.push('Start cell is blocked.');
  for (const b of level.blocked) {
    if (!inBounds(b, cols, rows)) errors.push(`Blocked cell ${cellKey(b)} out of bounds.`);
  }
  if (level.botStart) {
    if (!inBounds(level.botStart, cols, rows)) errors.push('botStart out of bounds.');
    if (blockedKeys.has(cellKey(level.botStart))) errors.push('botStart is blocked.');
    if (!level.availableCommands.includes('swap')) errors.push('botStart level must offer the swap tile.');
  }
  for (const zb of level.zipBlocked ?? []) {
    if (!inBounds(zb, cols, rows)) errors.push(`zipBlocked ${cellKey(zb)} out of bounds.`);
  }
  const itemIds = new Set<string>();
  const itemKinds = new Set<string>();
  for (const item of level.items) {
    if (!inBounds(item, cols, rows)) errors.push(`Item "${item.id}" out of bounds.`);
    if (blockedKeys.has(cellKey(item))) errors.push(`Item "${item.id}" sits on a blocked cell.`);
    if (itemIds.has(item.id)) errors.push(`Duplicate item id "${item.id}".`);
    itemIds.add(item.id);
    itemKinds.add(item.kind);
  }
  for (const goal of level.goals) {
    if (!inBounds(goal, cols, rows)) errors.push(`Goal ${cellKey(goal)} out of bounds.`);
    if (!itemKinds.has(goal.accepts)) errors.push(`Goal accepts unknown item kind "${goal.accepts}".`);
  }
  if (level.maxSlots < 1) errors.push('maxSlots must be ≥ 1.');
  if (level.availableCommands.length === 0) errors.push('Level offers no commands.');
  for (const rc of level.ruleChoices ?? []) {
    if (!itemKinds.has(rc.trigger)) errors.push(`Rule trigger "${rc.trigger}" has no matching item in the level.`);
  }
  if ((level.prefill?.length ?? 0) > level.maxSlots) errors.push('Prefill exceeds maxSlots.');
  const correct = level.prediction.choices.filter((c) => c.correct);
  if (correct.length !== 1) errors.push('Prediction needs exactly one correct choice.');
  return errors;
}

export function assertLevelValid(level: LevelDef): void {
  const errors = validateLevel(level);
  if (errors.length > 0) {
    throw new Error(`[CodeBops] Invalid level "${level.id}":\n - ${errors.join('\n - ')}`);
  }
}
