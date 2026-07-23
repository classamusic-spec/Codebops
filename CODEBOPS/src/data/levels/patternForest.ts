import type { LevelDef } from '../schemas/level';

/**
 * World 3 · Pattern Forest — conditions.
 *
 * The IF tile guards the NEXT tile: "if you see a flower, grab it" —
 * otherwise the next tile is skipped. Yucky mushrooms spoil a fairy ring
 * if dropped on it, so careful picking matters (the fairy-ring rule).
 *
 * Teaching arc:
 *  pf-1  — IF always succeeds (safe introduction)
 *  pf-2  — IF distinguishes flowers from mushrooms
 *  pf-3  — the elegant pattern: [step, IF, grab] inside a loop
 *  pf-debug — Copycat's blind grabs poisoned the ring; rebuild with IF
 *  pf-creative — open grove, two rings, bonus star for using IF
 */
const BASE = ['moveUp', 'moveDown', 'moveLeft', 'moveRight', 'grab', 'drop'] as const;

/** Guided 1 — meet the IF tile. It always sees a flower here. */
export const PATTERN_FOREST_1: LevelDef = {
  id: 'pf-1',
  worldId: 'pattern-forest',
  title: 'World 3: Pattern Forest',
  shortTitle: 'If You See a Flower',
  goalText: 'Pick the flower for the fairy ring!',
  cols: 5,
  rows: 3,
  start: { col: 0, row: 1, dir: 'E' },
  blocked: [],
  items: [{ id: 'flower', kind: 'flower', col: 2, row: 1 }],
  goals: [{ col: 4, row: 1, accepts: 'flower' }],
  availableCommands: [...BASE, 'ifFlower'],
  maxSlots: 8,
  par: 7,
  brief: {
    title: 'If You See a Flower',
    text: 'New tile! 🌸 IF checks the tile Zip stands on: "If there IS a flower, do the next tile!" Try it: walk, IF 🌸, grab!',
    emoji: '🌸',
  },
  prediction: {
    prompt: 'What happens at the IF tile?',
    choices: [
      { id: 'deliver', emoji: '🌸', label: 'Zip sees a flower and grabs it!', correct: true },
      { id: 'oops', emoji: '🙈', label: 'Zip walks right past it…', correct: false },
    ],
  },
};

/** Guided 2 — mushrooms everywhere; only flowers may touch the ring. */
export const PATTERN_FOREST_2: LevelDef = {
  id: 'pf-2',
  worldId: 'pattern-forest',
  title: 'World 3: Pattern Forest',
  shortTitle: 'Mushroom Mix-Up',
  goalText: 'Only flowers for the fairy ring — yuck mushrooms!',
  cols: 5,
  rows: 3,
  start: { col: 0, row: 1, dir: 'E' },
  blocked: [],
  items: [
    { id: 'mushroom-1', kind: 'mushroom', col: 1, row: 1 },
    { id: 'flower', kind: 'flower', col: 2, row: 1 },
    { id: 'mushroom-2', kind: 'mushroom', col: 3, row: 1 },
  ],
  goals: [{ col: 4, row: 1, accepts: 'flower' }],
  availableCommands: [...BASE, 'ifFlower'],
  maxSlots: 12,
  par: 9,
  brief: {
    title: 'Mushroom Mix-Up',
    text: 'Yucky mushrooms spoil the fairy ring! Tiptoe past them: step, IF 🌸, grab — the IF tile skips the grab when it sees a mushroom.',
    emoji: '🍄',
  },
  prediction: {
    prompt: 'What lands on the fairy ring?',
    choices: [
      { id: 'deliver', emoji: '🌸', label: 'Just the pretty flower!', correct: true },
      { id: 'oops', emoji: '🍄', label: 'A yucky mushroom — oh no!', correct: false },
    ],
  },
};

/** Guided 3 — the elegant pattern: [step, IF, grab] × loop. */
export const PATTERN_FOREST_3: LevelDef = {
  id: 'pf-3',
  worldId: 'pattern-forest',
  title: 'World 3: Pattern Forest',
  shortTitle: 'Firefly Rows',
  goalText: 'Gather both flowers for the ring!',
  cols: 6,
  rows: 3,
  start: { col: 0, row: 1, dir: 'E' },
  blocked: [],
  items: [
    { id: 'flower-1', kind: 'flower', col: 1, row: 1 },
    { id: 'mushroom-1', kind: 'mushroom', col: 2, row: 1 },
    { id: 'flower-2', kind: 'flower', col: 3, row: 1 },
    { id: 'mushroom-2', kind: 'mushroom', col: 4, row: 1 },
  ],
  goals: [{ col: 5, row: 1, accepts: 'flower' }],
  availableCommands: [...BASE, 'ifFlower', 'repeat'],
  maxSlots: 8,
  par: 6,
  brief: {
    title: 'Firefly Rows',
    text: 'A long row of flowers AND mushrooms! Loop your pattern — step, IF 🌸, grab, Repeat ×4 — and watch Zip pick perfectly, every time.',
    emoji: '✨',
  },
  prediction: {
    prompt: 'What does your pattern collect?',
    choices: [
      { id: 'deliver', emoji: '🌸🌸', label: 'Both flowers, zero mushrooms!', correct: true },
      { id: 'oops', emoji: '🍄', label: 'Something yucky sneaks in…', correct: false },
    ],
  },
};

/** Debugging — Copycat grabbed everything blindly. Rebuild with IF! */
export const PATTERN_FOREST_DEBUG: LevelDef = {
  id: 'pf-debug',
  worldId: 'pattern-forest',
  title: 'World 3: Pattern Forest',
  shortTitle: 'Copycat’s Poison Ring',
  goalText: 'Fix the plan so only flowers reach the ring!',
  cols: 6,
  rows: 3,
  start: { col: 0, row: 1, dir: 'E' },
  blocked: [],
  items: [
    { id: 'flower-1', kind: 'flower', col: 1, row: 1 },
    { id: 'mushroom-1', kind: 'mushroom', col: 2, row: 1 },
    { id: 'flower-2', kind: 'flower', col: 3, row: 1 },
    { id: 'mushroom-2', kind: 'mushroom', col: 4, row: 1 },
  ],
  goals: [{ col: 5, row: 1, accepts: 'flower' }],
  availableCommands: [...BASE, 'ifFlower', 'repeat'],
  maxSlots: 8,
  par: 6,
  prefill: [
    { cmd: 'moveRight' },
    { cmd: 'grab' },
    { cmd: 'repeat', arg: 4 },
    { cmd: 'moveRight' },
    { cmd: 'drop' },
  ],
  brief: {
    title: 'Copycat’s Poison Ring',
    text: 'Copycat grabbed EVERYTHING — even the yucky mushrooms! Clear the plan and rebuild it with an IF 🌸 before the grab.',
    emoji: '🐾',
  },
  prediction: {
    prompt: 'Did your fix save the ring?',
    choices: [
      { id: 'deliver', emoji: '🎉', label: 'Only flowers — the ring is happy!', correct: true },
      { id: 'oops', emoji: '🍄', label: 'Still a little yucky…', correct: false },
    ],
  },
};

/** Creative — open grove, two rings, bonus star for using an IF tile. */
export const PATTERN_FOREST_CREATIVE: LevelDef = {
  id: 'pf-creative',
  worldId: 'pattern-forest',
  title: 'World 3: Pattern Forest',
  shortTitle: 'Grove of Wonders',
  goalText: 'Fill BOTH fairy rings — IF tiles earn a bonus star!',
  cols: 6,
  rows: 3,
  start: { col: 0, row: 1, dir: 'E' },
  blocked: [],
  items: [
    { id: 'mushroom-1', kind: 'mushroom', col: 2, row: 0 },
    { id: 'flower-1', kind: 'flower', col: 3, row: 1 },
    { id: 'mushroom-2', kind: 'mushroom', col: 2, row: 2 },
    { id: 'mushroom-3', kind: 'mushroom', col: 4, row: 1 },
    { id: 'flower-2', kind: 'flower', col: 4, row: 2 },
  ],
  goals: [
    { col: 5, row: 1, accepts: 'flower' },
    { col: 5, row: 2, accepts: 'flower' },
  ],
  availableCommands: [...BASE, 'ifFlower', 'ifMushroom', 'repeat', 'repeatUntil'],
  maxSlots: 14,
  par: 13,
  bonusStar: 'condition',
  brief: {
    title: 'Grove of Wonders',
    text: 'A whole glowing grove to explore! Two fairy rings are hungry for flowers. Any plan works — IF tiles make it elegant.',
    emoji: '🌳',
  },
  prediction: {
    prompt: 'Will both rings get their flowers?',
    choices: [
      { id: 'deliver', emoji: '🏆', label: 'Two happy rings, coming up!', correct: true },
      { id: 'oops', emoji: '🤔', label: 'Let’s see what happens…', correct: false },
    ],
  },
};

export const PATTERN_FOREST_LEVELS: readonly LevelDef[] = [
  PATTERN_FOREST_1, PATTERN_FOREST_2, PATTERN_FOREST_3, PATTERN_FOREST_DEBUG, PATTERN_FOREST_CREATIVE,
];
