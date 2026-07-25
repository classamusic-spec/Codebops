/**
 * Scene layouts — the fixed placement slots a child drops components into
 * (spec §9.3). Big named zones, never free coordinates: nothing in App Lab
 * requires precision dragging, and a saved project can only ever mention a
 * slot that its layout actually has.
 */

export interface LayoutSlot {
  readonly id: string;
  readonly label: string;
  /** Grid position in the builder's slot board, 1-based. */
  readonly col: number;
  readonly row: number;
  /** A wide slot spans two columns (baskets, choice rows). */
  readonly wide?: boolean;
}

export interface SceneLayoutTemplate {
  readonly id: string;
  readonly label: string;
  readonly cols: number;
  readonly rows: number;
  readonly slots: readonly LayoutSlot[];
}

const s = (id: string, label: string, col: number, row: number, wide = false): LayoutSlot =>
  wide ? { id, label, col, row, wide } : { id, label, col, row };

export const SCENE_LAYOUTS: readonly SceneLayoutTemplate[] = [
  {
    id: 'single-stage',
    label: 'One Big Stage',
    cols: 3, rows: 2,
    slots: [
      s('stage-left', 'Left', 1, 1),
      s('stage-center', 'Middle', 2, 1),
      s('stage-right', 'Right', 3, 1),
      s('stage-front', 'Front', 2, 2),
      s('stage-corner', 'Corner', 3, 2),
    ],
  },
  {
    id: 'sort-bench',
    label: 'Sorting Bench',
    cols: 4, rows: 3,
    slots: [
      s('tray-1', 'Tray 1', 1, 1),
      s('tray-2', 'Tray 2', 2, 1),
      s('tray-3', 'Tray 3', 3, 1),
      s('tray-4', 'Tray 4', 4, 1),
      s('basket-left', 'Left Basket', 1, 2, true),
      s('basket-right', 'Right Basket', 3, 2, true),
      s('score-slot', 'Score', 1, 3),
      s('cast-slot', 'Helper', 4, 3),
    ],
  },
  {
    id: 'story-stage',
    label: 'Story Stage',
    cols: 3, rows: 2,
    slots: [
      s('cast-left', 'Left', 1, 1),
      s('cast-center', 'Middle', 2, 1),
      s('cast-right', 'Right', 3, 1),
      s('choice-a', 'Choice A', 1, 2, true),
      s('choice-b', 'Choice B', 3, 2),
    ],
  },
  {
    id: 'music-desk',
    label: 'Music Desk',
    cols: 3, rows: 3,
    slots: [
      s('pad-1', 'Pad 1', 1, 1),
      s('pad-2', 'Pad 2', 2, 1),
      s('pad-3', 'Pad 3', 3, 1),
      s('pad-4', 'Pad 4', 1, 2),
      s('pad-5', 'Pad 5', 2, 2),
      s('pad-6', 'Pad 6', 3, 2),
      s('play-slot', 'Play', 1, 3),
      s('stop-slot', 'Stop', 3, 3),
    ],
  },
  {
    id: 'helper-yard',
    label: 'Helper Yard',
    cols: 4, rows: 2,
    slots: [
      s('plot-1', 'Plot 1', 1, 1),
      s('plot-2', 'Plot 2', 2, 1),
      s('plot-3', 'Plot 3', 3, 1),
      s('plot-4', 'Plot 4', 4, 1),
      s('helper-slot', 'Helper', 1, 2),
      s('tool-slot', 'Tool', 2, 2),
      s('tool-slot-2', 'Second Tool', 3, 2),
      s('memory-slot', 'Memory', 4, 2),
    ],
  },
  {
    id: 'game-board',
    label: 'Game Board',
    cols: 4, rows: 3,
    slots: [
      s('cell-1', 'Cell 1', 1, 1),
      s('cell-2', 'Cell 2', 2, 1),
      s('cell-3', 'Cell 3', 3, 1),
      s('cell-4', 'Cell 4', 4, 1),
      s('cell-5', 'Cell 5', 1, 2),
      s('cell-6', 'Cell 6', 2, 2),
      s('goal-slot', 'Goal', 4, 2),
      s('player-slot', 'Player', 1, 3),
      s('counter-slot', 'Counter', 3, 3),
      s('start-slot', 'Start', 4, 3),
    ],
  },
];

const BY_ID = new Map(SCENE_LAYOUTS.map((l) => [l.id, l]));

export function sceneLayout(id: string): SceneLayoutTemplate | null {
  return BY_ID.get(id) ?? null;
}

export function layoutHasSlot(layoutId: string, slotId: string): boolean {
  return sceneLayout(layoutId)?.slots.some((x) => x.id === slotId) ?? false;
}
