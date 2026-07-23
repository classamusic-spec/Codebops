import type { LevelDef } from '../schemas/level';

/**
 * World 4 · Robot Town — teamwork with two bots.
 *
 * The Swap tile switches which bot follows the plan: Zip 🐰 or Bolt 🤖.
 * Bots may share tiles (they are very polite). Glass-domed pads
 * (zipBlocked) stop Zip — only Bolt can roll beneath them.
 */
const ARROWS = ['moveUp', 'moveDown', 'moveLeft', 'moveRight', 'grab', 'drop', 'swap'] as const;

/** Guided 1 — meet Bolt; one delivery each. */
export const ROBOT_TOWN_1: LevelDef = {
  id: 'rt-1',
  worldId: 'robot-town',
  title: 'World 4: Robot Town',
  shortTitle: 'Two Little Helpers',
  goalText: 'Both batteries to their charging pads!',
  cols: 6,
  rows: 3,
  start: { col: 0, row: 1, dir: 'E' },
  botStart: { col: 3, row: 1, dir: 'E' },
  blocked: [],
  items: [
    { id: 'battery-a', kind: 'battery', col: 1, row: 1 },
    { id: 'battery-b', kind: 'battery', col: 4, row: 1 },
  ],
  goals: [
    { col: 2, row: 1, accepts: 'battery' },
    { col: 5, row: 1, accepts: 'battery' },
  ],
  availableCommands: ARROWS,
  maxSlots: 10,
  par: 9,
  brief: {
    title: 'Two Little Helpers',
    text: 'Meet Bolt the robot! The 👥 Swap tile switches who listens: plan Zip’s delivery, tap Swap, then plan Bolt’s!',
    emoji: '🤖',
  },
  prediction: {
    prompt: 'How many batteries get charged?',
    choices: [
      { id: 'deliver', emoji: '🔋🔋', label: 'Both — teamwork makes the dream work!', correct: true },
      { id: 'oops', emoji: '🔋', label: 'Maybe only one…', correct: false },
    ],
  },
};

/** Guided 2 — two rows, two crossings. */
export const ROBOT_TOWN_2: LevelDef = {
  id: 'rt-2',
  worldId: 'robot-town',
  title: 'World 4: Robot Town',
  shortTitle: 'Battery Boulevards',
  goalText: 'Charge both pads across the boulevards!',
  cols: 6,
  rows: 3,
  start: { col: 0, row: 2, dir: 'N' },
  botStart: { col: 5, row: 2, dir: 'N' },
  blocked: [
    { col: 1, row: 1 },
    { col: 4, row: 1 },
  ],
  items: [
    { id: 'battery-a', kind: 'battery', col: 0, row: 0 },
    { id: 'battery-b', kind: 'battery', col: 5, row: 0 },
  ],
  goals: [
    { col: 2, row: 0, accepts: 'battery' },
    { col: 3, row: 0, accepts: 'battery' },
  ],
  availableCommands: ARROWS,
  maxSlots: 14,
  par: 13,
  brief: {
    title: 'Battery Boulevards',
    text: 'Zip takes the left side, Bolt takes the right. Watch the pipes — and don’t forget who’s listening after a Swap!',
    emoji: '🏙️',
  },
  prediction: {
    prompt: 'Both pads humming?',
    choices: [
      { id: 'deliver', emoji: '⚡', label: 'Fully charged, both of them!', correct: true },
      { id: 'oops', emoji: '🪫', label: 'Someone ends up powerless…', correct: false },
    ],
  },
};

/** Guided 3 — loops for both bots. */
export const ROBOT_TOWN_3: LevelDef = {
  id: 'rt-3',
  worldId: 'robot-town',
  title: 'World 4: Robot Town',
  shortTitle: 'Charge Together',
  goalText: 'Loop both bots to their pads!',
  cols: 6,
  rows: 3,
  start: { col: 0, row: 1, dir: 'E' },
  botStart: { col: 4, row: 2, dir: 'W' },
  blocked: [],
  items: [
    { id: 'battery-a', kind: 'battery', col: 2, row: 1 },
    { id: 'battery-b', kind: 'battery', col: 3, row: 2 },
  ],
  goals: [
    { col: 4, row: 1, accepts: 'battery' },
    { col: 1, row: 2, accepts: 'battery' },
  ],
  availableCommands: [...ARROWS, 'repeat'],
  maxSlots: 12,
  par: 12,
  brief: {
    title: 'Charge Together',
    text: 'Zip loops east, Bolt loops west. Repeat tiles work for both of them — one plan, two happy bots!',
    emoji: '⚡',
  },
  prediction: {
    prompt: 'How do the loops go?',
    choices: [
      { id: 'deliver', emoji: '🎉', label: 'Zip zips east, Bolt bolts west!', correct: true },
      { id: 'oops', emoji: '🌀', label: 'Loopy confusion ahead…', correct: false },
    ],
  },
};

/** Debugging — Copycat forgot the Swap; Zip bumps the glass dome. */
export const ROBOT_TOWN_DEBUG: LevelDef = {
  id: 'rt-debug',
  worldId: 'robot-town',
  title: 'World 4: Robot Town',
  shortTitle: 'Bolt’s Glass Garden',
  goalText: 'Fix the plan — only Bolt rolls under glass!',
  cols: 3,
  rows: 3,
  start: { col: 0, row: 1, dir: 'E' },
  botStart: { col: 0, row: 2, dir: 'E' },
  blocked: [],
  zipBlocked: [{ col: 2, row: 2 }],
  items: [
    { id: 'battery-a', kind: 'battery', col: 1, row: 1 },
    { id: 'battery-b', kind: 'battery', col: 1, row: 2 },
  ],
  goals: [
    { col: 2, row: 1, accepts: 'battery' },
    { col: 2, row: 2, accepts: 'battery' },
  ],
  availableCommands: ARROWS,
  maxSlots: 10,
  par: 9,
  prefill: [
    { cmd: 'moveRight' },
    { cmd: 'grab' },
    { cmd: 'moveRight' },
    { cmd: 'drop' },
    { cmd: 'moveDown' },
    { cmd: 'moveLeft' },
    { cmd: 'grab' },
    { cmd: 'moveRight' },
    { cmd: 'drop' },
  ],
  brief: {
    title: 'Bolt’s Glass Garden',
    text: 'Copycat sent ZIP under the glass dome — bonk! Only Bolt fits. Fix it: Swap to Bolt before the second delivery!',
    emoji: '🐾',
  },
  prediction: {
    prompt: 'Did the Swap save the day?',
    choices: [
      { id: 'deliver', emoji: '🎉', label: 'Bolt rolls under the glass — done!', correct: true },
      { id: 'oops', emoji: '🔔', label: 'Still bonking the dome…', correct: false },
    ],
  },
};

/** Creative — open town, one domed pad, bonus star for swapping. */
export const ROBOT_TOWN_CREATIVE: LevelDef = {
  id: 'rt-creative',
  worldId: 'robot-town',
  title: 'World 4: Robot Town',
  shortTitle: 'Teamwork Towers',
  goalText: 'Charge both towers your way — Swap earns a bonus star!',
  cols: 6,
  rows: 3,
  start: { col: 0, row: 1, dir: 'E' },
  botStart: { col: 3, row: 1, dir: 'E' },
  blocked: [],
  zipBlocked: [{ col: 5, row: 2 }],
  items: [
    { id: 'battery-a', kind: 'battery', col: 1, row: 0 },
    { id: 'battery-b', kind: 'battery', col: 4, row: 2 },
  ],
  goals: [
    { col: 5, row: 0, accepts: 'battery' },
    { col: 5, row: 2, accepts: 'battery' },
  ],
  availableCommands: [...ARROWS, 'repeat'],
  maxSlots: 14,
  par: 13,
  bonusStar: 'swap',
  brief: {
    title: 'Teamwork Towers',
    text: 'Two towers need power — one hides under glass. Split the work between Zip and Bolt however you like!',
    emoji: '🗼',
  },
  prediction: {
    prompt: 'Will the towers light up?',
    choices: [
      { id: 'deliver', emoji: '🏆', label: 'Both towers glowing tonight!', correct: true },
      { id: 'oops', emoji: '🤔', label: 'Let’s see what happens…', correct: false },
    ],
  },
};

export const ROBOT_TOWN_LEVELS: readonly LevelDef[] = [
  ROBOT_TOWN_1, ROBOT_TOWN_2, ROBOT_TOWN_3, ROBOT_TOWN_DEBUG, ROBOT_TOWN_CREATIVE,
];
