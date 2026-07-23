/**
 * Premium command-tile icons — hand-authored inline SVG glyphs styled after
 * the CodeBops icon sheet: chunky white shapes with round joins, sitting on
 * the toy-button colored tiles. Replaces the old emoji glyphs so every
 * command reads crisp at any size and feels like a molded plastic toy key.
 *
 * Note: `grab` is a CLOSED FIST (take it), `drop` is an OPEN HAND (let it go).
 */
import type { CommandId } from '../../gameplay/commands/interpreter';

/** Block arrow pointing in a screen direction (chunky, filled). */
const ARROW: Record<'up' | 'down' | 'left' | 'right', string> = {
  up: '<path d="M12 2.6 L21.4 12 H16.4 V21.4 H7.6 V12 H2.6 Z"/>',
  down: '<path d="M12 21.4 L2.6 12 H7.6 V2.6 H16.4 V12 H21.4 Z"/>',
  left: '<path d="M2.6 12 L12 2.6 V7.6 H21.4 V16.4 H12 V21.4 Z"/>',
  right: '<path d="M21.4 12 L12 21.4 V16.4 H2.6 V7.6 H12 V2.6 Z"/>',
};

/** Closed fist — grab / take. */
const FIST = `
<g>
  <path d="M6 12 C6 9.5 8 8.4 10 8.4 L15 8.4 C17.2 8.4 19 10 19 12.6 L19 16.4 C19 18.6 17.2 20.2 15 20.2 L9.6 20.2 C7.4 20.2 6 18.6 6 16.6 Z"/>
  <circle cx="8.2" cy="9.2" r="2.2"/><circle cx="11.2" cy="8.4" r="2.4"/><circle cx="14.2" cy="8.4" r="2.4"/><circle cx="16.8" cy="9.4" r="2.1"/>
  <path d="M6.4 12.6 C4 12 3 14 3.8 15.8 C4.5 17.4 6.4 17.4 7.4 16.6 L7.4 12.8 Z"/>
  <g stroke="rgba(20,30,70,.3)" stroke-width="1.2" stroke-linecap="round" fill="none">
    <path d="M9.4 11.2 V15.2"/><path d="M12.4 10.6 V15.4"/><path d="M15.2 11 V15.2"/>
  </g>
</g>`;

/** Open hand — drop / let go. */
const OPEN_HAND = `
<g>
  <rect x="6" y="11.5" width="12" height="8.7" rx="4.2"/>
  <rect x="7.1" y="4" width="2.4" height="10" rx="1.2"/>
  <rect x="9.9" y="3" width="2.4" height="11" rx="1.2"/>
  <rect x="12.7" y="4" width="2.4" height="10" rx="1.2"/>
  <rect x="15.4" y="5.6" width="2.2" height="8.6" rx="1.1"/>
  <rect x="3.7" y="11.8" width="2.4" height="6.4" rx="1.2" transform="rotate(-38 4.9 15)"/>
</g>`;

/** Circular two-arrow loop (sync). */
const REPEAT = `
<g fill="none" stroke="currentColor" stroke-width="2.7" stroke-linecap="round">
  <path d="M6.2 9.4 A7.2 7.2 0 0 1 18.4 8.2"/>
  <path d="M17.8 14.6 A7.2 7.2 0 0 1 5.6 15.8"/>
</g>
<path d="M19.6 4.4 L19.9 9.4 L14.9 8.7 Z"/>
<path d="M4.4 19.6 L4.1 14.6 L9.1 15.3 Z"/>`;

/** Loop with an ∞ heart — repeat until. */
const REPEAT_UNTIL = `
${REPEAT}
<g transform="translate(12 12) scale(.44)" fill="none" stroke="currentColor" stroke-width="4.4" stroke-linecap="round">
  <path d="M-5 0 A3.4 3.4 0 1 1 0 0 A3.4 3.4 0 1 0 5 0"/>
</g>`;

/** Swap which bot follows — two chasing arrows. */
const SWAP = `
<g fill="none" stroke="currentColor" stroke-width="2.7" stroke-linecap="round" stroke-linejoin="round">
  <path d="M5.5 9.5 H16"/>
  <path d="M18.5 14.5 H8"/>
</g>
<path d="M18.8 9.5 L13.8 6.6 V12.4 Z"/>
<path d="M5.2 14.5 L10.2 11.6 V17.4 Z"/>`;

/** Flower — if-flower condition. */
const FLOWER = `
<g>
  <ellipse cx="12" cy="5.4" rx="3" ry="3.4"/>
  <ellipse cx="18.2" cy="9.9" rx="3.4" ry="3"/>
  <ellipse cx="15.8" cy="17.2" rx="3" ry="3.4"/>
  <ellipse cx="8.2" cy="17.2" rx="3" ry="3.4"/>
  <ellipse cx="5.8" cy="9.9" rx="3.4" ry="3"/>
  <circle cx="12" cy="11.4" r="3.5" fill="#ffe08a"/>
</g>`;

/** Mushroom — if-mushroom condition. */
const MUSHROOM = `
<g>
  <path d="M4 12.4 C4 7.2 7.6 4 12 4 C16.4 4 20 7.2 20 12.4 C20 13.4 19.2 13.9 18.2 13.9 H5.8 C4.8 13.9 4 13.4 4 12.4 Z"/>
  <rect x="9.3" y="13.6" width="5.4" height="7.2" rx="2.5"/>
  <circle cx="9.6" cy="9.2" r="1.5" fill="#e46a8b"/>
  <circle cx="14.4" cy="8.4" r="1.7" fill="#e46a8b"/>
  <circle cx="12.4" cy="11" r="1.2" fill="#e46a8b"/>
</g>`;

/** Curved turn arrows (legacy relative moves). */
const TURN_RIGHT = `
<g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
  <path d="M7 20 V12.5 A4.5 4.5 0 0 1 11.5 8 H15.5"/>
</g>
<path d="M14.5 3.6 L20.5 8 L14.5 12.4 Z"/>`;
const TURN_LEFT = `
<g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
  <path d="M17 20 V12.5 A4.5 4.5 0 0 0 12.5 8 H8.5"/>
</g>
<path d="M9.5 3.6 L3.5 8 L9.5 12.4 Z"/>`;

const ICONS: Record<CommandId, string> = {
  moveUp: ARROW.up,
  moveDown: ARROW.down,
  moveLeft: ARROW.left,
  moveRight: ARROW.right,
  move: ARROW.up,
  grab: FIST,
  drop: OPEN_HAND,
  repeat: REPEAT,
  repeatUntil: REPEAT_UNTIL,
  ifFlower: FLOWER,
  ifMushroom: MUSHROOM,
  swap: SWAP,
  turnRight: TURN_RIGHT,
  turnLeft: TURN_LEFT,
};

/** Full inline `<svg>` markup for a command icon. */
export function iconMarkup(cmd: CommandId): string {
  return `<svg class="cmd-ico" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">${ICONS[cmd] ?? ARROW.up}</svg>`;
}

/** Render a command icon into a fresh `.ico` span (used by deck + dialogs). */
export function renderCommandIcon(cmd: CommandId): HTMLSpanElement {
  const span = document.createElement('span');
  span.className = 'ico';
  span.innerHTML = iconMarkup(cmd);
  return span;
}
