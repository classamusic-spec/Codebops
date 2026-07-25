/**
 * What a maker collects (App Lab §13).
 *
 * Everything here is a thing a child HAS, never a thing they lack. There
 * are no ranks, no percentages, no comparisons, no streaks and nothing
 * that expires — a badge earned on Tuesday is still there in March, and a
 * badge not yet earned reads as an invitation rather than a gap.
 *
 * Rewards are DERIVED, not stored. A badge is earned because the evidence
 * log says the child did the thing; there is no separate list to fall out
 * of step with what actually happened. That also means resetting progress
 * cannot leave orphaned trophies behind.
 *
 * Pure: no DOM, no storage, no clock.
 */
import type { MiniAppType } from '../../creator/miniAppTypes';
import type { EvidenceLog } from '../../data/curriculum/mastery';
import { APP_KITS } from './appLabDefinition';

/** What a child has made so far, read off the evidence log. */
export interface MakerRecord {
  readonly appsSaved: number;
  /** Kits they have actually built something in. */
  readonly kitsBuilt: readonly MiniAppType[];
  /** Requirement ids shown in a child's OWN app, not in a level. */
  readonly requirementsShown: readonly string[];
  /** Distinct apps that have been run. */
  readonly appsRun: number;
}

const APPLAB_PREFIX = 'applab:';

/**
 * Read the record out of the evidence log plus the library's index. Only
 * evidence filed against an app counts here — clearing a level a hundred
 * times never earns a maker badge.
 */
export function makerRecord(
  evidence: EvidenceLog,
  saved: ReadonlyArray<{ readonly type: MiniAppType }>,
): MakerRecord {
  const mine = evidence.filter((e) => e.levelId.startsWith(APPLAB_PREFIX));
  return {
    appsSaved: saved.length,
    kitsBuilt: [...new Set(saved.map((s) => s.type))],
    requirementsShown: [...new Set(mine.map((e) => e.requirement))],
    appsRun: new Set(mine.map((e) => e.levelId)).size,
  };
}

export type CreatorRewardKind = 'badge' | 'theme' | 'decoration' | 'frame';

export interface CreatorReward {
  readonly id: string;
  readonly kind: CreatorRewardKind;
  readonly name: string;
  readonly glyph: string;
  /** Said to the child at the moment it is earned. */
  readonly childLine: string;
  /** Shown before it is earned — an invitation, never a scolding. */
  readonly invitation: string;
  /** Zip cheers making; Mixy cheers fixing. */
  readonly cheeredBy: 'zip' | 'mixy';
  readonly earned: (r: MakerRecord) => boolean;
}

/** Shorthand: earned when a requirement shows up in the child's own app. */
const shown = (requirement: string) =>
  (r: MakerRecord): boolean => r.requirementsShown.includes(requirement);

export const CREATOR_REWARDS: readonly CreatorReward[] = [
  // ---- badges: one per big idea a child put into something of their own ----
  {
    id: 'maker', kind: 'badge', name: 'Maker', glyph: '🏅', cheeredBy: 'zip',
    childLine: 'You made an app that runs. You are a maker!',
    invitation: 'Build an app and run it.',
    earned: (r) => r.appsRun >= 1,
  },
  {
    id: 'loop-weaver', kind: 'badge', name: 'Loop Weaver', glyph: '🔁', cheeredBy: 'zip',
    childLine: 'You used a loop instead of writing the same step again!',
    invitation: 'Put a loop in one of your apps.',
    earned: shown('loop-replace'),
  },
  {
    id: 'two-way-thinker', kind: 'badge', name: 'Two-Way Thinker', glyph: '🔀', cheeredBy: 'zip',
    childLine: 'Your app knows two different ways to go!',
    invitation: 'Give one of your apps an "if… or else…".',
    earned: shown('ifelse-two'),
  },
  {
    id: 'number-keeper', kind: 'badge', name: 'Number Keeper', glyph: '🔢', cheeredBy: 'zip',
    childLine: 'Your app remembers a number and changes it!',
    invitation: 'Make an app that counts something.',
    earned: shown('var-update'),
  },
  {
    id: 'signal-sender', kind: 'badge', name: 'Signal Sender', glyph: '📨', cheeredBy: 'zip',
    childLine: 'One part of your app told another part something!',
    invitation: 'Have one thing in your app send a message.',
    earned: shown('msg-send'),
  },
  {
    id: 'job-saver', kind: 'badge', name: 'Job Saver', glyph: '🧰', cheeredBy: 'zip',
    childLine: 'You saved a job once and used it again!',
    invitation: 'Save a job in one of your apps and use it twice.',
    earned: shown('fn-reuse'),
  },
  {
    id: 'scene-changer', kind: 'badge', name: 'Scene Changer', glyph: '🎬', cheeredBy: 'zip',
    childLine: 'You split your app into separate little jobs!',
    invitation: 'Make an app with more than one scene, or three jobs.',
    earned: shown('dec-split'),
  },
  {
    id: 'careful-helper', kind: 'badge', name: 'Careful Helper', glyph: '🤝', cheeredBy: 'zip',
    childLine: 'Your helper asks a grown-up before it acts. That is careful building!',
    invitation: 'Build a helper that asks first.',
    earned: shown('agent-approval'),
  },
  {
    id: 'repairer', kind: 'badge', name: 'Repairer', glyph: '🛠️', cheeredBy: 'mixy',
    childLine: 'You watched it run, changed it, and tried again. That is what fixing is!',
    invitation: 'Run an app, change something, and run it again.',
    earned: shown('dbg-change'),
  },
  {
    id: 'lab-explorer', kind: 'badge', name: 'Lab Explorer', glyph: '🧪', cheeredBy: 'zip',
    childLine: 'You have built something at every station in the Lab!',
    invitation: 'Build something at each of the six stations.',
    earned: (r) => APP_KITS.every((k) => r.kitsBuilt.includes(k.type)),
  },

  // ---- extra themes: purely additional, nothing is ever taken away ----
  {
    id: 'theme-starlight', kind: 'theme', name: 'Starlight Sky', glyph: '🌙', cheeredBy: 'zip',
    childLine: 'A new sky for your apps: Starlight!',
    invitation: 'A new sky, once you have made three apps.',
    earned: (r) => r.appsRun >= 3,
  },
  {
    id: 'theme-candy-lane', kind: 'theme', name: 'Candy Lane', glyph: '🍬', cheeredBy: 'zip',
    childLine: 'A new sky for your apps: Candy Lane!',
    invitation: 'A new sky, once your app knows two ways to go.',
    earned: shown('ifelse-two'),
  },
  {
    id: 'theme-deep-sea', kind: 'theme', name: 'Deep Sea', glyph: '🌊', cheeredBy: 'mixy',
    childLine: 'A new sky for your apps: Deep Sea!',
    invitation: 'A new sky, once you have fixed something.',
    earned: shown('dbg-change'),
  },

  // ---- decorations for the Lab wall ----
  {
    id: 'decor-bunting', kind: 'decoration', name: 'Lab Bunting', glyph: '🎏', cheeredBy: 'zip',
    childLine: 'Zip hung bunting up in the Lab for you!',
    invitation: 'Something for the Lab wall, once you have made an app.',
    earned: (r) => r.appsRun >= 1,
  },
  {
    id: 'decor-lamp', kind: 'decoration', name: 'Idea Lamp', glyph: '💡', cheeredBy: 'zip',
    childLine: 'An idea lamp for the Lab. It glows when you are building!',
    invitation: 'Something for the Lab wall, once you have built in three stations.',
    earned: (r) => r.kitsBuilt.length >= 3,
  },
  {
    id: 'decor-toolbox', kind: 'decoration', name: "Mixy's Toolbox", glyph: '🧰', cheeredBy: 'mixy',
    childLine: 'Mixy left their toolbox in your Lab. For fixing things!',
    invitation: 'Something for the Lab wall, once you have fixed something.',
    earned: shown('dbg-change'),
  },

  // ---- frames for the cards in My Apps ----
  {
    id: 'frame-gold', kind: 'frame', name: 'Sunny Frame', glyph: '🌟', cheeredBy: 'zip',
    childLine: 'Your apps get a sunny frame!',
    invitation: 'A frame for your app cards, once you have saved two apps.',
    earned: (r) => r.appsSaved >= 2,
  },
  {
    id: 'frame-rainbow', kind: 'frame', name: 'Rainbow Frame', glyph: '🌈', cheeredBy: 'zip',
    childLine: 'Your apps get a rainbow frame!',
    invitation: 'A frame for your app cards, once five big ideas show up in your apps.',
    earned: (r) => r.requirementsShown.length >= 5,
  },
];

const BY_ID = new Map(CREATOR_REWARDS.map((r) => [r.id, r]));

export function creatorReward(id: string): CreatorReward | null {
  return BY_ID.get(id) ?? null;
}

/** Every reward earned by this record, in the order they are listed. */
export function earnedRewards(record: MakerRecord): CreatorReward[] {
  return CREATOR_REWARDS.filter((r) => r.earned(record));
}

export function rewardsOfKind(record: MakerRecord, kind: CreatorRewardKind): CreatorReward[] {
  return earnedRewards(record).filter((r) => r.kind === kind);
}

/**
 * What is new between two records — the thing to celebrate. Rewards are
 * never lost, so this only ever grows; a shrinking record (after a reset)
 * simply returns nothing rather than announcing a loss.
 */
export function newlyEarned(before: MakerRecord, after: MakerRecord): CreatorReward[] {
  const had = new Set(earnedRewards(before).map((r) => r.id));
  return earnedRewards(after).filter((r) => !had.has(r.id));
}

/**
 * The frame a single app's card wears — the biggest idea IT shows, not a
 * rank against the others. Two apps can wear the same frame happily.
 */
export const APP_FRAMES: ReadonlyArray<{
  readonly requirement: string; readonly frame: string; readonly label: string;
}> = [
  { requirement: 'agent-approval', frame: 'careful', label: 'asks first' },
  { requirement: 'fn-reuse', frame: 'job', label: 'saves a job' },
  { requirement: 'msg-send', frame: 'signal', label: 'sends a signal' },
  { requirement: 'ifelse-two', frame: 'twoway', label: 'two ways to go' },
  { requirement: 'loop-replace', frame: 'loop', label: 'has a loop' },
  { requirement: 'var-update', frame: 'count', label: 'counts something' },
];

/** Which frame this app's own evidence earns it, or null for the plain one. */
export function frameForApp(
  evidence: EvidenceLog, projectId: string,
): { frame: string; label: string } | null {
  const mine = new Set(
    evidence.filter((e) => e.levelId === `${APPLAB_PREFIX}${projectId}`).map((e) => e.requirement),
  );
  const hit = APP_FRAMES.find((f) => mine.has(f.requirement));
  return hit ? { frame: hit.frame, label: hit.label } : null;
}
