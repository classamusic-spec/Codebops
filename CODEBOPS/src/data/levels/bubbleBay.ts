import type { LevelDef } from '../schemas/level';

/**
 * World 2 · Bubble Bay — counted loops, repetition, repeat-until,
 * stopping conditions and loop efficiency (Phase 10).
 *
 * Loop model (ages 3–7): a Repeat tile repeats the block of commands
 * above it (since the previous loop tile). Repeat-Until stops on a bump,
 * a successful grab, or reaching the goal — and Forever Fred shows up
 * if a loop never finds its stopping condition.
 */

/** Guided 1 — counted loop across the dock. */
export const BUBBLE_BAY_1: LevelDef = {
  id: 'bb-1',
  worldId: 'bubble-bay',
  title: 'World 2: Bubble Bay',
  shortTitle: 'Loopy Dock',
  goalText: 'Bring the pearl to the treasure chest!',
  cols: 5,
  rows: 3,
  start: { col: 0, row: 1, dir: 'E' },
  blocked: [],
  items: [{ id: 'pearl', kind: 'pearl', col: 3, row: 1 }],
  goals: [{ col: 4, row: 1, accepts: 'pearl' }],
  availableCommands: ['moveUp', 'moveDown', 'moveLeft', 'moveRight', 'grab', 'drop', 'repeat'],
  maxSlots: 6,
  par: 5,
  brief: {
    title: 'Loopy Dock',
    text: 'Meet the Repeat tile! It runs the commands above it again — three steps in one tap. Loop-de-loop!',
    emoji: '↻',
  },
  prediction: {
    prompt: 'What will your loop do?',
    choices: [
      { id: 'deliver', emoji: '🦪', label: 'Zip zooms down the dock to the chest!', correct: true },
      { id: 'oops', emoji: '💦', label: 'Zip might splash into the bay…', correct: false },
    ],
  },
};

/** Guided 2 — repeat a grab-block to collect many pearls. */
export const BUBBLE_BAY_2: LevelDef = {
  id: 'bb-2',
  worldId: 'bubble-bay',
  title: 'World 2: Bubble Bay',
  shortTitle: 'Pearl Parade',
  goalText: 'Collect every pearl and reach the chest!',
  cols: 5,
  rows: 3,
  start: { col: 0, row: 1, dir: 'E' },
  blocked: [],
  items: [
    { id: 'pearl-1', kind: 'pearl', col: 1, row: 1 },
    { id: 'pearl-2', kind: 'pearl', col: 2, row: 1 },
    { id: 'pearl-3', kind: 'pearl', col: 3, row: 1 },
  ],
  goals: [{ col: 4, row: 1, accepts: 'pearl' }],
  availableCommands: ['moveUp', 'moveDown', 'moveLeft', 'moveRight', 'grab', 'drop', 'repeat'],
  maxSlots: 6,
  par: 5,
  brief: {
    title: 'Pearl Parade',
    text: 'Three pearls in a row! Repeat a step + grab block to scoop them all up like a pro looper.',
    emoji: '🫧',
  },
  prediction: {
    prompt: 'How many pearls will Zip carry to the chest?',
    choices: [
      { id: 'deliver', emoji: '😄', label: 'All three — what a haul!', correct: true },
      { id: 'oops', emoji: '🥲', label: 'Maybe just one…', correct: false },
    ],
  },
};

/** Guided 3 — repeat-until with a real stopping condition. */
export const BUBBLE_BAY_3: LevelDef = {
  id: 'bb-3',
  worldId: 'bubble-bay',
  title: 'World 2: Bubble Bay',
  shortTitle: 'Until You Get There',
  goalText: 'Loop until the pearl, then to the chest!',
  cols: 5,
  rows: 3,
  start: { col: 0, row: 0, dir: 'E' },
  blocked: [],
  items: [{ id: 'pearl', kind: 'pearl', col: 3, row: 0 }],
  goals: [{ col: 4, row: 0, accepts: 'pearl' }],
  availableCommands: ['moveUp', 'moveDown', 'moveLeft', 'moveRight', 'grab', 'drop', 'repeat', 'repeatUntil'],
  maxSlots: 6,
  par: 5,
  brief: {
    title: 'Until You Get There',
    text: 'The Until tile loops your step + grab block and stops all by itself when the pearl is scooped. Magic!',
    emoji: '🔁',
  },
  prediction: {
    prompt: 'When will the Until loop stop?',
    choices: [
      { id: 'deliver', emoji: '🦪', label: 'Right at the pearl — smart loop!', correct: true },
      { id: 'oops', emoji: '🌀', label: 'It might loop forever…', correct: false },
    ],
  },
};

/** Debugging — Copycat repeats too many times. Fix the count! */
export const BUBBLE_BAY_DEBUG: LevelDef = {
  id: 'bb-debug',
  worldId: 'bubble-bay',
  title: 'World 2: Bubble Bay',
  shortTitle: 'Copycat’s Oopsie',
  goalText: 'Fix Copycat’s loop so Zip stops at the pearl!',
  cols: 4,
  rows: 3,
  start: { col: 0, row: 1, dir: 'E' },
  blocked: [],
  items: [{ id: 'pearl', kind: 'pearl', col: 2, row: 1 }],
  goals: [{ col: 3, row: 1, accepts: 'pearl' }],
  availableCommands: ['moveUp', 'moveDown', 'moveLeft', 'moveRight', 'grab', 'drop', 'repeat'],
  maxSlots: 5,
  par: 5,
  prefill: [
    { cmd: 'moveRight' },
    { cmd: 'repeat', arg: 4 },
    { cmd: 'grab' },
    { cmd: 'moveRight' },
    { cmd: 'drop' },
  ],
  brief: {
    title: 'Copycat’s Oopsie',
    text: 'Copycat copied the loop one time too many — Zip splashes off the dock! Tap the ↻ badge to fix the count, then BOP!',
    emoji: '🐾',
  },
  prediction: {
    prompt: 'Did the fix work?',
    choices: [
      { id: 'deliver', emoji: '🎉', label: 'Perfect loop — pearl delivered!', correct: true },
      { id: 'oops', emoji: '💦', label: 'Still splashy…', correct: false },
    ],
  },
};

/** Creative — open delivery; bonus star for using a loop. */
export const BUBBLE_BAY_CREATIVE: LevelDef = {
  id: 'bb-creative',
  worldId: 'bubble-bay',
  title: 'World 2: Bubble Bay',
  shortTitle: 'Loop Lagoon',
  goalText: 'Deliver the pearl YOUR way — loops earn a bonus star!',
  cols: 5,
  rows: 3,
  start: { col: 0, row: 2, dir: 'E' },
  blocked: [
    { col: 2, row: 1 },
  ],
  items: [{ id: 'pearl', kind: 'pearl', col: 2, row: 2 }],
  goals: [{ col: 4, row: 0, accepts: 'pearl' }],
  availableCommands: ['moveUp', 'moveDown', 'moveLeft', 'moveRight', 'grab', 'drop', 'repeat', 'repeatUntil'],
  maxSlots: 10,
  par: 9,
  bonusStar: 'loop',
  brief: {
    title: 'Loop Lagoon',
    text: 'A whole lagoon to play in! Deliver the pearl any way you like — use a loop tile for a bonus star.',
    emoji: '🌊',
  },
  prediction: {
    prompt: 'What’s your master plan?',
    choices: [
      { id: 'deliver', emoji: '🏆', label: 'Pearl to the chest, easy!', correct: true },
      { id: 'oops', emoji: '🤔', label: 'Let’s see what happens…', correct: false },
    ],
  },
};

export const BUBBLE_BAY_LEVELS: readonly LevelDef[] = [
  BUBBLE_BAY_1, BUBBLE_BAY_2, BUBBLE_BAY_3, BUBBLE_BAY_DEBUG, BUBBLE_BAY_CREATIVE,
];
