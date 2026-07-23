import type { LevelDef } from '../schemas/level';

/**
 * World 5 · Agent Academy — rule-based helpers + the BopLens.
 *
 * A HELPER RULE is always-on: "WHEN you step on a badge, GRAB it!" The kid
 * picks the rule once; it then fires automatically on every matching tile.
 * The BopLens (🔍) peeks at the courtyard and sparkles every tile the rule
 * can see. Teaching arc:
 *  aa-1 — meet the rule (it grabs for you!)
 *  aa-2 — choosing the RIGHT rule (badge vs mushroom)
 *  aa-3 — rule + loops on the running track
 *  aa-debug — Copycat left a blind-grab plan; the rule replaces it
 *  aa-creative — open finals, bonus star for firing the rule
 */
const ARROWS = ['moveUp', 'moveDown', 'moveLeft', 'moveRight', 'grab', 'drop'] as const;

/** Guided 1 — the rule does the grabbing. */
export const AGENT_ACADEMY_1: LevelDef = {
  id: 'aa-1',
  worldId: 'agent-academy',
  title: 'World 5: Agent Academy',
  shortTitle: 'Meet the Rule',
  goalText: 'Collect every badge for the trophy!',
  cols: 5,
  rows: 3,
  start: { col: 0, row: 1, dir: 'E' },
  blocked: [],
  items: [
    { id: 'badge-1', kind: 'badge', col: 1, row: 1 },
    { id: 'badge-2', kind: 'badge', col: 2, row: 1 },
    { id: 'badge-3', kind: 'badge', col: 3, row: 1 },
  ],
  goals: [{ col: 4, row: 1, accepts: 'badge' }],
  availableCommands: [...ARROWS, 'repeat'],
  maxSlots: 8,
  par: 5,
  collectAll: true,
  ruleChoices: [{ trigger: 'badge', action: 'grab' }],
  brief: {
    title: 'Meet the Rule',
    text: 'Your first HELPER RULE! “WHEN you step on a badge 🎖️ → grab it.” It works all by itself — just walk Zip to the trophy and drop!',
    emoji: '🎖️',
  },
  prediction: {
    prompt: 'What does the helper rule do?',
    choices: [
      { id: 'deliver', emoji: '🎖️', label: 'Grabs every badge as Zip walks by!', correct: true },
      { id: 'oops', emoji: '💤', label: 'Nothing — rules are sleepy…', correct: false },
    ],
  },
};

/** Guided 2 — pick the right rule (mushrooms are decoys). */
export const AGENT_ACADEMY_2: LevelDef = {
  id: 'aa-2',
  worldId: 'agent-academy',
  title: 'World 5: Agent Academy',
  shortTitle: 'Pick the Right Rule',
  goalText: 'Badges only — mushrooms spoil the trophy!',
  cols: 5,
  rows: 3,
  start: { col: 0, row: 1, dir: 'E' },
  blocked: [],
  items: [
    { id: 'badge-1', kind: 'badge', col: 1, row: 1 },
    { id: 'mushroom-1', kind: 'mushroom', col: 2, row: 1 },
    { id: 'badge-2', kind: 'badge', col: 3, row: 1 },
  ],
  goals: [{ col: 4, row: 1, accepts: 'badge' }],
  availableCommands: [...ARROWS, 'repeat'],
  maxSlots: 8,
  par: 5,
  collectAll: true,
  ruleChoices: [
    { trigger: 'badge', action: 'grab' },
    { trigger: 'mushroom', action: 'grab' },
  ],
  brief: {
    title: 'Pick the Right Rule',
    text: 'Two rules to choose from! “Grab badges 🎖️” or “Grab mushrooms 🍄”? Choose wisely — the trophy only loves badges.',
    emoji: '🤔',
  },
  prediction: {
    prompt: 'With the badge rule, what reaches the trophy?',
    choices: [
      { id: 'deliver', emoji: '🏆', label: 'Only shiny badges!', correct: true },
      { id: 'oops', emoji: '🍄', label: 'A sneaky mushroom…', correct: false },
    ],
  },
};

/** Guided 3 — laps around the track with a rule + loop. */
export const AGENT_ACADEMY_3: LevelDef = {
  id: 'aa-3',
  worldId: 'agent-academy',
  title: 'World 5: Agent Academy',
  shortTitle: 'Campus Laps',
  goalText: 'Lap the track, collect the badges!',
  cols: 6,
  rows: 3,
  start: { col: 0, row: 0, dir: 'E' },
  blocked: [],
  items: [
    { id: 'badge-1', kind: 'badge', col: 1, row: 0 },
    { id: 'mushroom-1', kind: 'mushroom', col: 2, row: 0 },
    { id: 'badge-2', kind: 'badge', col: 3, row: 0 },
    { id: 'mushroom-2', kind: 'mushroom', col: 4, row: 0 },
    { id: 'badge-3', kind: 'badge', col: 5, row: 0 },
  ],
  goals: [{ col: 5, row: 2, accepts: 'badge' }],
  availableCommands: [...ARROWS, 'repeat'],
  maxSlots: 8,
  par: 6,
  collectAll: true,
  ruleChoices: [
    { trigger: 'badge', action: 'grab' },
    { trigger: 'mushroom', action: 'grab' },
  ],
  brief: {
    title: 'Campus Laps',
    text: 'Badges AND mushrooms line the track. Your rule picks perfectly every lap — loop the walk and glide down to the trophy!',
    emoji: '🏟️',
  },
  prediction: {
    prompt: 'How does the lap go?',
    choices: [
      { id: 'deliver', emoji: '🎖️🎖️🎖️', label: 'Three badges, zero mushrooms!', correct: true },
      { id: 'oops', emoji: '🍄', label: 'Something yucky tags along…', correct: false },
    ],
  },
};

/** Debugging — Copycat's blind-grab plan; the rule makes grab unneeded. */
export const AGENT_ACADEMY_DEBUG: LevelDef = {
  id: 'aa-debug',
  worldId: 'agent-academy',
  title: 'World 5: Agent Academy',
  shortTitle: 'Copycat’s Blind Grab',
  goalText: 'Fix the plan — let the rule do the work!',
  cols: 5,
  rows: 3,
  start: { col: 0, row: 1, dir: 'E' },
  blocked: [],
  items: [
    { id: 'badge-1', kind: 'badge', col: 1, row: 1 },
    { id: 'mushroom-1', kind: 'mushroom', col: 2, row: 1 },
    { id: 'badge-2', kind: 'badge', col: 3, row: 1 },
  ],
  goals: [{ col: 4, row: 1, accepts: 'badge' }],
  availableCommands: [...ARROWS, 'repeat'],
  maxSlots: 8,
  par: 5,
  collectAll: true,
  ruleChoices: [{ trigger: 'badge', action: 'grab' }],
  prefill: [
    { cmd: 'moveRight' },
    { cmd: 'grab' },
    { cmd: 'repeat', arg: 3 },
    { cmd: 'moveRight' },
    { cmd: 'drop' },
  ],
  brief: {
    title: 'Copycat’s Blind Grab',
    text: 'Copycat grabs EVERYTHING — even the mushroom! Secret: your helper rule grabs badges for you. Take the grab tile OUT and let the rule shine!',
    emoji: '🐾',
  },
  prediction: {
    prompt: 'Did the rule save the trophy?',
    choices: [
      { id: 'deliver', emoji: '🎉', label: 'Badges only — shiny and clean!', correct: true },
      { id: 'oops', emoji: '🍄', label: 'Still a bit yucky…', correct: false },
    ],
  },
};

/** Creative — the finals: open campus, bonus star for firing the rule. */
export const AGENT_ACADEMY_CREATIVE: LevelDef = {
  id: 'aa-creative',
  worldId: 'agent-academy',
  title: 'World 5: Agent Academy',
  shortTitle: 'Academy Finals',
  goalText: 'Collect every badge — fire your rule for a bonus star!',
  cols: 6,
  rows: 3,
  start: { col: 0, row: 0, dir: 'E' },
  blocked: [{ col: 2, row: 1 }],
  items: [
    { id: 'badge-1', kind: 'badge', col: 1, row: 0 },
    { id: 'mushroom-1', kind: 'mushroom', col: 2, row: 0 },
    { id: 'badge-2', kind: 'badge', col: 3, row: 0 },
    { id: 'badge-3', kind: 'badge', col: 5, row: 0 },
    { id: 'badge-4', kind: 'badge', col: 4, row: 2 },
    { id: 'mushroom-2', kind: 'mushroom', col: 3, row: 2 },
    { id: 'badge-5', kind: 'badge', col: 2, row: 2 },
  ],
  goals: [{ col: 5, row: 2, accepts: 'badge' }],
  availableCommands: [...ARROWS, 'repeat'],
  maxSlots: 12,
  par: 11, // loop-chain route: [R×3][R×2] rights, [D×2], [L×4], [R×4], drop = 11 tiles
  collectAll: true,
  bonusStar: 'rule',
  ruleChoices: [
    { trigger: 'badge', action: 'grab' },
    { trigger: 'mushroom', action: 'grab' },
  ],
  brief: {
    title: 'Academy Finals',
    text: 'The big exam! Badges hide all over campus. Plan your route, loop it, and let your rule scoop them all for the trophy!',
    emoji: '🏆',
  },
  prediction: {
    prompt: 'Graduation day — do you pass?',
    choices: [
      { id: 'deliver', emoji: '🎓', label: 'Every badge on the trophy!', correct: true },
      { id: 'oops', emoji: '📚', label: 'Back to studying…', correct: false },
    ],
  },
};

export const AGENT_ACADEMY_LEVELS: readonly LevelDef[] = [
  AGENT_ACADEMY_1, AGENT_ACADEMY_2, AGENT_ACADEMY_3, AGENT_ACADEMY_DEBUG, AGENT_ACADEMY_CREATIVE,
];
