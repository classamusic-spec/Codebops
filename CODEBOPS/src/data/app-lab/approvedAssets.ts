/**
 * The approved asset shelf for Zip's App Lab.
 *
 * A project may only ever name an id from this file. There are no URLs, no
 * uploads and no asset search: if a thing is not on this shelf, a child
 * cannot put it in an app.
 *
 * Art note (Phase 0 finding): only Zip and Mixy exist as drawn SVGs today.
 * The rest of the shelf is emoji/procedural stand-ins that match the art
 * canon's silhouettes. `svg` is set only where real art exists, so the
 * renderer can prefer it and fall back to the glyph everywhere else.
 */
import type { MiniAppComponentType, MiniAppColorToken } from '../../creator/miniAppTypes';

export interface ApprovedAsset {
  readonly id: string;
  readonly label: string;
  /** Emoji stand-in — always present, so nothing ever renders blank. */
  readonly glyph: string;
  /** Real drawn art, where it exists. */
  readonly svg?: string;
  /** Component roles this asset may fill. */
  readonly roles: readonly MiniAppComponentType[];
  /** Sorting properties, for kits that compare "what things are like". */
  readonly color?: MiniAppColorToken;
  readonly shape?: 'round' | 'square' | 'star' | 'leaf';
  readonly itemType?: 'berry' | 'bolt' | 'flower' | 'shell' | 'block' | 'star' | 'creature';
}

const a = (
  id: string, label: string, glyph: string, roles: MiniAppComponentType[],
  extra: Partial<ApprovedAsset> = {},
): ApprovedAsset => ({ id, label, glyph, roles, ...extra });

export const APPROVED_ASSETS: readonly ApprovedAsset[] = [
  // ---- characters (drawn art) ----
  a('zip', 'Zip', '🐰', ['character', 'player', 'helperTool'], { svg: './art/characters/zip/zip.svg' }),
  a('mixy', 'Mixy', '👾', ['character', 'player'], { svg: './art/characters/mixy/mixy.svg' }),

  // ---- props and collectibles ----
  a('flower', 'Flower', '🌸', ['prop', 'imageObject', 'collectible'], { color: 'pink', shape: 'round', itemType: 'flower' }),
  a('berry', 'Berry', '🍓', ['prop', 'imageObject', 'collectible'], { color: 'red', shape: 'round', itemType: 'berry' }),
  a('blueberry', 'Blueberry', '🫐', ['prop', 'imageObject', 'collectible'], { color: 'blue', shape: 'round', itemType: 'berry' }),
  a('bolt', 'Bolt', '🔩', ['prop', 'imageObject', 'collectible'], { color: 'navy', shape: 'square', itemType: 'bolt' }),
  a('shell', 'Shell', '🐚', ['prop', 'imageObject', 'collectible'], { color: 'cream', shape: 'round', itemType: 'shell' }),
  a('block', 'Block', '🟦', ['prop', 'imageObject', 'collectible'], { color: 'blue', shape: 'square', itemType: 'block' }),
  a('star', 'Star', '⭐', ['prop', 'imageObject', 'collectible', 'goal'], { color: 'yellow', shape: 'star', itemType: 'star' }),
  a('leaf', 'Leaf', '🍃', ['prop', 'imageObject'], { color: 'green', shape: 'leaf' }),
  a('cloud', 'Cloud', '☁️', ['prop', 'imageObject'], { color: 'cream' }),

  // ---- containers and targets ----
  a('basket-red', 'Red Basket', '🧺', ['basket', 'goal'], { color: 'red' }),
  a('basket-blue', 'Blue Basket', '🪣', ['basket', 'goal'], { color: 'blue' }),
  a('crate', 'Crate', '📦', ['basket', 'goal'], { color: 'orange', shape: 'square' }),
  a('dock', 'Dock', '🛶', ['goal'], { color: 'navy' }),
  a('star-pad', 'Star Pad', '✨', ['goal'], { color: 'yellow', shape: 'star' }),

  // ---- controls ----
  a('button-green', 'Green Button', '🟢', ['button'], { color: 'green', shape: 'round' }),
  a('button-purple', 'Purple Button', '🟣', ['button'], { color: 'purple', shape: 'round' }),
  a('button-star', 'Star Button', '🌟', ['button'], { color: 'yellow', shape: 'star' }),
  a('start-flag', 'Start', '🚩', ['button'], { color: 'green' }),
  a('reset-arrow', 'Reset', '↩️', ['button'], { color: 'purple' }),
  a('choice-left', 'This Way', '⬅️', ['choiceCard'], { color: 'blue' }),
  a('choice-right', 'That Way', '➡️', ['choiceCard'], { color: 'orange' }),

  // ---- readouts ----
  a('counter-wheel', 'Counter', '🔢', ['counter', 'memoryContainer'], { color: 'navy' }),
  a('memory-crystal', 'Memory Crystal', '💎', ['memoryContainer'], { color: 'purple' }),
  a('lamp', 'Lamp', '💡', ['light'], { color: 'yellow' }),
  a('eye-sensor', 'Eye Sensor', '👁️', ['sensor'], { color: 'blue', shape: 'round' }),
  a('speech', 'Speech Bubble', '💬', ['speechBubble'], { color: 'cream' }),
  a('win-card', 'Win Card', '🏆', ['goal'], { color: 'yellow' }),
  a('scene-door', 'Scene Door', '🚪', ['scenePortal'], { color: 'orange' }),

  // ---- instruments and pads ----
  a('drum-pad', 'Drum', '🥁', ['soundPad', 'instrument'], { color: 'red' }),
  a('bell-pad', 'Bell', '🔔', ['soundPad', 'instrument'], { color: 'yellow' }),
  a('xylo-pad', 'Xylophone', '🎵', ['soundPad', 'instrument'], { color: 'blue' }),
  a('shaker-pad', 'Shaker', '🪇', ['soundPad', 'instrument'], { color: 'green' }),
  a('gear-chime', 'Gear Chime', '⚙️', ['soundPad', 'instrument'], { color: 'orange' }),

  // ---- helper tools ----
  a('watering-can', 'Watering Can', '🪣', ['helperTool'], { color: 'blue' }),
  a('sorting-claw', 'Sorting Claw', '🦾', ['helperTool'], { color: 'navy' }),
  a('food-bowl', 'Food Bowl', '🥣', ['helperTool'], { color: 'orange' }),
  a('coat-hook', 'Coat Hook', '🧥', ['helperTool'], { color: 'purple' }),

  // ---- friendly obstacles (never hazards) ----
  a('bush', 'Bush', '🌳', ['friendlyObstacle'], { color: 'green' }),
  a('puddle', 'Puddle', '💧', ['friendlyObstacle'], { color: 'blue' }),
  a('sleepy-bop', 'Sleepy Bop', '😴', ['friendlyObstacle', 'character'], { color: 'purple', itemType: 'creature' }),
];

const BY_ID = new Map(APPROVED_ASSETS.map((x) => [x.id, x]));

export function approvedAsset(id: string): ApprovedAsset | null {
  return BY_ID.get(id) ?? null;
}

export function isApprovedAsset(id: string): boolean {
  return BY_ID.has(id);
}

/** Assets that may fill a given component role. */
export function assetsForRole(role: MiniAppComponentType): ApprovedAsset[] {
  return APPROVED_ASSETS.filter((x) => x.roles.includes(role));
}

// ---------------------------------------------------------------------
// Themes — the seven CodeBops worlds, reused as App Lab backdrops (§7).
// ---------------------------------------------------------------------

export interface AppLabTheme {
  readonly id: string;
  readonly label: string;
  readonly glyph: string;
  /** Sky/backdrop colour, from the locked palette. */
  readonly sky: string;
  /**
   * A reward id from creatorRewards that opens this sky (§13). The seven
   * world skies have none and are always there — earning a new one only
   * ever ADDS to the shelf, it never takes a sky away.
   */
  readonly unlockedBy?: string;
}

export const APP_LAB_THEMES: readonly AppLabTheme[] = [
  { id: 'sparkle-meadow', label: 'Sparkle Meadow', glyph: '🌼', sky: '#7ec8ff' },
  { id: 'bubble-bay', label: 'Bubble Bay', glyph: '🐚', sky: '#5fd0d8' },
  { id: 'pattern-forest', label: 'Pattern Forest', glyph: '🌸', sky: '#8fd67a' },
  { id: 'robot-town', label: 'Robot Town', glyph: '🤖', sky: '#9aa7e8' },
  { id: 'gearworks-garage', label: 'Gearworks Garage', glyph: '⚙️', sky: '#2a2158' },
  { id: 'agent-academy', label: 'Agent Academy', glyph: '🎓', sky: '#b48ce8' },
  { id: 'imagination-island', label: 'Imagination Island', glyph: '🏝️', sky: '#ffc46b' },
  // ---- earned skies (§13). Approved from the start, so an app saved
  // with one still validates even if progress is later reset. ----
  { id: 'starlight', label: 'Starlight', glyph: '🌙', sky: '#3b3f8f', unlockedBy: 'theme-starlight' },
  { id: 'candy-lane', label: 'Candy Lane', glyph: '🍬', sky: '#ffb3d9', unlockedBy: 'theme-candy-lane' },
  { id: 'deep-sea', label: 'Deep Sea', glyph: '🌊', sky: '#1f6f8f', unlockedBy: 'theme-deep-sea' },
];

export function isApprovedTheme(id: string): boolean {
  return APP_LAB_THEMES.some((t) => t.id === id);
}
