/**
 * Imagination Island — kid-built levels, persisted locally.
 * Separate key from the main save so resetting progress never eats creations.
 */
import type { LevelDef } from '../data/schemas/level';

const KEY = 'codebops.custom.v1';

export function loadCustomLevels(): LevelDef[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as LevelDef[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveCustomLevel(level: LevelDef): void {
  const all = loadCustomLevels().filter((l) => l.id !== level.id);
  all.push(level);
  try { localStorage.setItem(KEY, JSON.stringify(all)); } catch { /* storage full */ }
}

export function deleteCustomLevel(id: string): void {
  try { localStorage.setItem(KEY, JSON.stringify(loadCustomLevels().filter((l) => l.id !== id))); } catch { /* noop */ }
}

/** Build a playable LevelDef from the editor's grid state. */
export function editorLevel(
  name: string,
  start: { col: number; row: number },
  blocked: Array<{ col: number; row: number }>,
  items: Array<{ col: number; row: number }>,
  goals: Array<{ col: number; row: number }>,
): LevelDef {
  return {
    id: `custom-${Date.now()}`,
    worldId: 'sparkle-meadow',
    title: 'Imagination Island',
    shortTitle: name,
    goalText: 'Deliver every berry to a star pad!',
    cols: 5,
    rows: 3,
    start: { ...start, dir: 'E' },
    blocked,
    items: items.map((c, i) => ({ id: `strawberry-${i + 1}`, kind: 'strawberry' as const, ...c })),
    goals: goals.map((c) => ({ ...c, accepts: 'strawberry' })),
    availableCommands: ['moveUp', 'moveDown', 'moveLeft', 'moveRight', 'grab', 'drop'],
    maxSlots: 12,
    par: 12,
    brief: {
      title: name,
      text: 'A level built by YOU! Guide Zip to every berry and stack them on the star pads.',
      emoji: '🏝️',
    },
    prediction: {
      prompt: 'Will your creation work?',
      choices: [
        { id: 'deliver', emoji: '🏆', label: 'Every berry delivered!', correct: true },
        { id: 'oops', emoji: '🤔', label: 'Let’s see what happens…', correct: false },
      ],
    },
  };
}
