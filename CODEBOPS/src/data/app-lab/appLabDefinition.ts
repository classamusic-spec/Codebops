/**
 * Zip's App Lab — world registration and the six-kit roster (spec §1, §6, §9.1).
 *
 * Kit unlocking is deliberately gentle: a kit opens once the ideas it needs
 * have been MET (there is evidence the child has played with them), not
 * mastered. Nothing here uses streaks, scores or ranks, and a grown-up can
 * open every kit by hand. A locked card still says what it will be about,
 * so it reads as "coming next", never as "you failed".
 */
import type { MiniAppType } from '../../creator/miniAppTypes';
import type { CurriculumStageId } from '../curriculum/stages';
import type { EvidenceLog } from '../curriculum/mastery';
import { stageMastery } from '../curriculum/mastery';
import { stage } from '../curriculum/stages';

export const APP_LAB_WORLD_ID = 'app-lab' as const;

export interface AppLabWorldMeta {
  readonly id: typeof APP_LAB_WORLD_ID;
  readonly glyph: string;
  readonly name: string;
  readonly tagline: string;
}

export const APP_LAB_WORLD: AppLabWorldMeta = {
  id: APP_LAB_WORLD_ID,
  glyph: '🧪',
  name: "Zip's App Lab",
  tagline: 'Build it. Teach it. Try it.',
};

/**
 * The grown-up override id. Stored in the same manually-opened list the
 * Campfire already uses for worlds, so there is one mechanism, not two.
 */
export const APP_LAB_ALL_KITS = 'app-lab:all-kits';

export interface AppKitDefinition {
  readonly id: string;
  readonly type: MiniAppType;
  /** Child-facing name from the spec. */
  readonly name: string;
  readonly glyph: string;
  /** One line on the station card. */
  readonly blurb: string;
  /** What it will be about, shown even while locked. */
  readonly lockedBlurb: string;
  /** 1-based suggested order (spec §6). */
  readonly order: number;
  /** Ideas that must have been met first. */
  readonly prerequisites: readonly CurriculumStageId[];
}

export const APP_KITS: readonly AppKitDefinition[] = [
  {
    id: 'tap-magic', type: 'tap-react', name: 'Tap Magic', glyph: '✨', order: 1,
    blurb: 'Tap something and make it react.',
    lockedBlurb: 'Coming soon: make things happen when you tap them.',
    prerequisites: ['sequence', 'events'],
  },
  {
    id: 'sort-and-match', type: 'sorting', name: 'Sort and Match', glyph: '🧺', order: 2,
    blurb: 'Build a sorting or matching game.',
    lockedBlurb: 'Coming soon: build a game that checks things and sorts them.',
    prerequisites: ['conditions', 'if-else', 'data'],
  },
  {
    id: 'story-stage', type: 'story', name: 'Story Stage', glyph: '📖', order: 3,
    blurb: 'Tell a story with scenes and choices.',
    lockedBlurb: 'Coming soon: tell a story where the Bops talk to each other.',
    prerequisites: ['sequence', 'events', 'messages'],
  },
  {
    id: 'music-maker', type: 'music', name: 'Music Maker', glyph: '🥁', order: 4,
    blurb: 'Make a soundboard or a looping song.',
    lockedBlurb: 'Coming soon: build a song out of loops and pattern cards.',
    prerequisites: ['events', 'loops', 'functions'],
  },
  {
    id: 'tiny-game-maker', type: 'mini-game', name: 'Tiny Game Maker', glyph: '🎮', order: 5,
    blurb: 'Make a small game with a score and a win.',
    lockedBlurb: 'Coming soon: build a real little game with a score.',
    prerequisites: ['variables', 'state', 'conditions', 'events'],
  },
  {
    id: 'helper-builder', type: 'helper', name: 'Helper Builder', glyph: '🤝', order: 6,
    blurb: 'Teach a helper a goal, tools and rules.',
    lockedBlurb: 'Coming soon: build a helper that follows rules you choose.',
    prerequisites: ['agents', 'conditions', 'state', 'data'],
  },
];

const BY_ID = new Map(APP_KITS.map((k) => [k.id, k]));
const BY_TYPE = new Map(APP_KITS.map((k) => [k.type, k]));

export function appKit(id: string): AppKitDefinition | null {
  return BY_ID.get(id) ?? null;
}

export function appKitForType(type: MiniAppType): AppKitDefinition | null {
  return BY_TYPE.get(type) ?? null;
}

export interface KitAvailability {
  readonly unlocked: boolean;
  /** Prerequisite ideas not met yet — used for the "coming next" line. */
  readonly waitingOn: readonly CurriculumStageId[];
  /** True when a grown-up opened everything by hand. */
  readonly openedByGrownUp: boolean;
}

/**
 * Has this kit opened? A prerequisite counts as met the moment there is any
 * evidence for it — playful practice is enough, exactly as the curriculum
 * addendum's non-punitive unlocking requires.
 */
export function kitAvailability(
  kit: AppKitDefinition, log: EvidenceLog, allKitsOpen = false,
): KitAvailability {
  const waitingOn = kit.prerequisites.filter(
    (p) => stageMastery(p, log).state === 'not-introduced',
  );
  return {
    unlocked: allKitsOpen || waitingOn.length === 0,
    waitingOn,
    openedByGrownUp: allKitsOpen,
  };
}

/** Child-facing sentence for a locked card. Never a deficit statement. */
export function waitingSentence(waitingOn: readonly CurriculumStageId[]): string {
  if (waitingOn.length === 0) return '';
  const phrases = waitingOn.map((id) => stage(id).childFacingLanguage);
  if (phrases.length === 1) return `First we will play with: ${phrases[0]}`;
  return `First we will play with: ${phrases.slice(0, 2).join(' and ')}`;
}

/** The kit a child should meet next — the first still-locked one in order. */
export function nextKit(log: EvidenceLog, allKitsOpen = false): AppKitDefinition | null {
  return [...APP_KITS]
    .sort((a, b) => a.order - b.order)
    .find((k) => !kitAvailability(k, log, allKitsOpen).unlocked) ?? null;
}
