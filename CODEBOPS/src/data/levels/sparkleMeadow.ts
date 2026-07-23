import type { LevelDef } from '../schemas/level';

/**
 * World 1 · Sparkle Meadow — guided fundamentals.
 * Layout mirrors the World 1 reference mockup (4 × 3 grass island).
 *
 * Command model: absolute screen arrows (⬆️ ⬇️ ⬅️ ➡️) — what you see is
 * where Zip goes.
 */
const ARROWS = ['moveUp', 'moveDown', 'moveLeft', 'moveRight', 'grab', 'drop'] as const;

export const SPARKLE_MEADOW_1: LevelDef = {
  id: 'sm-1',
  worldId: 'sparkle-meadow',
  title: 'World 1: Sparkle Meadow',
  shortTitle: 'Berry Hello!',
  goalText: 'Bring the fruit to our friend!',
  cols: 4,
  rows: 3,
  start: { col: 0, row: 0, dir: 'E' },
  blocked: [
    { col: 1, row: 1 },
    { col: 0, row: 2 },
  ],
  items: [{ id: 'strawberry', kind: 'strawberry', col: 2, row: 0 }],
  goals: [{ col: 3, row: 2, accepts: 'strawberry' }],
  availableCommands: ARROWS,
  maxSlots: 8,
  par: 7,
  brief: {
    title: 'Berry Hello!',
    text: 'Zip is hungry for adventure! Use the arrow tiles to walk Zip to the strawberry, grab it, and bring it to the star pad.',
    emoji: '🍓',
  },
  prediction: {
    prompt: 'What will Zip do with your plan?',
    choices: [
      { id: 'deliver', emoji: '🍓', label: 'Deliver the strawberry to the star pad!', correct: true },
      { id: 'oops', emoji: '🌳', label: 'Get a little lost on the way…', correct: false },
    ],
  },
};

export const SPARKLE_MEADOW_2: LevelDef = {
  id: 'sm-2',
  worldId: 'sparkle-meadow',
  title: 'World 1: Sparkle Meadow',
  shortTitle: 'Around the Bushes',
  goalText: 'Zip around the bushes to deliver the berry!',
  cols: 4,
  rows: 3,
  start: { col: 1, row: 2, dir: 'N' },
  blocked: [
    { col: 0, row: 1 },
    { col: 2, row: 1 },
  ],
  items: [{ id: 'strawberry', kind: 'strawberry', col: 1, row: 0 }],
  goals: [{ col: 3, row: 2, accepts: 'strawberry' }],
  availableCommands: ARROWS,
  maxSlots: 10,
  par: 8,
  brief: {
    title: 'Around the Bushes',
    text: 'The path is twistier this time. Plan your arrows carefully, helper!',
    emoji: '🌳',
  },
  prediction: {
    prompt: 'Where will the strawberry end up?',
    choices: [
      { id: 'deliver', emoji: '⭐', label: 'Right on the star pad!', correct: true },
      { id: 'oops', emoji: '🫢', label: 'Zip might bump a bush…', correct: false },
    ],
  },
};

export const SPARKLE_MEADOW_LEVELS: readonly LevelDef[] = [SPARKLE_MEADOW_1, SPARKLE_MEADOW_2];
