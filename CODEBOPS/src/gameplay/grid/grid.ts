/** Grid model — pure logic, no rendering dependencies. */

export interface Cell {
  readonly col: number;
  readonly row: number;
}

export type Direction = 'N' | 'E' | 'S' | 'W';

export const DIRECTIONS: readonly Direction[] = ['N', 'E', 'S', 'W'];

/** Unit vector for a direction. Rows increase "south" (toward camera). */
export function dirDelta(dir: Direction): { dc: number; dr: number } {
  switch (dir) {
    case 'N': return { dc: 0, dr: -1 };
    case 'E': return { dc: 1, dr: 0 };
    case 'S': return { dc: 0, dr: 1 };
    case 'W': return { dc: -1, dr: 0 };
  }
}

export function turnLeft(dir: Direction): Direction {
  const i = DIRECTIONS.indexOf(dir);
  return DIRECTIONS[(i + 3) % 4];
}

export function turnRight(dir: Direction): Direction {
  const i = DIRECTIONS.indexOf(dir);
  return DIRECTIONS[(i + 1) % 4];
}

export function cellKey(cell: Cell): string {
  return `${cell.col},${cell.row}`;
}

export function sameCell(a: Cell, b: Cell): boolean {
  return a.col === b.col && a.row === b.row;
}

export function inBounds(cell: Cell, cols: number, rows: number): boolean {
  return cell.col >= 0 && cell.col < cols && cell.row >= 0 && cell.row < rows;
}
