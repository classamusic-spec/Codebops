/**
 * The approved component shelf — what a child may place on a screen, and
 * what each one is FOR in child-facing words (spec §10).
 *
 * A component type here is a role: "this is a thing that counts", "this is
 * a thing you tap". The asset shelf decides what it looks like.
 */
import type { MiniAppComponentType } from '../../creator/miniAppTypes';

export interface ApprovedComponentDef {
  readonly type: MiniAppComponentType;
  readonly label: string;
  readonly glyph: string;
  /** One child-readable line, shown in the component tray. */
  readonly blurb: string;
  /** Can a child tap it in Play Mode? Drives the default a11y label. */
  readonly tappable: boolean;
  /** Can it be dragged into a slot? */
  readonly draggable: boolean;
}

const c = (
  type: MiniAppComponentType, label: string, glyph: string, blurb: string,
  tappable = false, draggable = false,
): ApprovedComponentDef => ({ type, label, glyph, blurb, tappable, draggable });

export const APPROVED_COMPONENTS: readonly ApprovedComponentDef[] = [
  c('character', 'Character', '🐰', 'A Bop who can move, wave and speak.', true),
  c('button', 'Button', '🟢', 'Something to tap that makes things happen.', true),
  c('imageObject', 'Picture', '🖼️', 'A picture that can show, hide or change.'),
  c('prop', 'Prop', '🌸', 'A thing that sits in the scene.', true),
  c('counter', 'Counter', '🔢', 'Shows a number the app remembers.'),
  c('basket', 'Basket', '🧺', 'Somewhere to put things.', false, false),
  c('goal', 'Goal', '⭐', 'The place or thing that finishes the job.'),
  c('light', 'Light', '💡', 'Turns on and off.', true),
  c('soundPad', 'Sound Pad', '🥁', 'Tap it to play a sound.', true),
  c('choiceCard', 'Choice', '🔀', 'Two ways the story can go.', true),
  c('scenePortal', 'Scene Door', '🚪', 'Takes the story to the next scene.', true),
  c('collectible', 'Collectible', '🍓', 'Something to collect.', true, true),
  c('player', 'Player', '🐰', 'The one the child moves.', true),
  c('friendlyObstacle', 'Friendly Blocker', '🌳', 'Something in the way. Never scary.'),
  c('speechBubble', 'Speech Bubble', '💬', 'Shows a prepared thing to say.'),
  c('instrument', 'Instrument', '🎵', 'A Bop that plays one sound.', true),
  c('sensor', 'Sensor', '👁️', 'Notices something and tells the app.'),
  c('helperTool', 'Helper Tool', '🪣', 'A tool your helper is allowed to use.'),
  c('memoryContainer', 'Memory', '💎', 'Where your helper remembers things.'),
];

const BY_TYPE = new Map(APPROVED_COMPONENTS.map((x) => [x.type, x]));

export function approvedComponent(type: MiniAppComponentType): ApprovedComponentDef | null {
  return BY_TYPE.get(type) ?? null;
}

/** A sensible accessibility label when a child has not been asked for one. */
export function defaultAccessibilityLabel(
  type: MiniAppComponentType, assetLabel: string,
): string {
  const def = approvedComponent(type);
  if (!def) return assetLabel;
  return def.tappable ? `${assetLabel} — tap it` : assetLabel;
}
