/**
 * The button family.
 *
 * Before this, buttons were built by hand at 126 call sites using 63
 * distinct class strings that collapsed onto about eleven real visual
 * treatments. The Back arrow alone existed in nine independent copies,
 * BOP in five, Clear in four — so a change to any of them had to be made
 * nine, five or four times, and in practice was made once.
 *
 * The variants below are the semantic families from the design system,
 * not a palette. Pick by what the button DOES:
 *
 *   go       green    run, play, continue  — the thing you came here for
 *   nav      blue     back, home, neutral utilities
 *   revise   purple   rewind, undo, edit   — changing your mind
 *   help     yellow   hints, explanations
 *   danger   red      destructive removal, and nothing else
 *
 * Red is never failure feedback. A program that misses the goal is
 * something to investigate, not an error — see Glitch Replay.
 */
import { el } from '../dom';

export type ButtonVariant = 'go' | 'nav' | 'revise' | 'help' | 'danger';
export type ButtonShape = 'pill' | 'circle' | 'square';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'hero';

export interface ButtonSpec {
  /** Visible text. Omit for icon-only controls, which then NEED `label`. */
  readonly text?: string;
  /** Inline SVG markup for the icon. Preferred over a text glyph. */
  readonly icon?: string;
  /** Accessible name. Required when there is no visible text. */
  readonly label?: string;
  readonly variant?: ButtonVariant;
  readonly shape?: ButtonShape;
  readonly size?: ButtonSize;
  /** Extra classes for the rare case a component needs its own hook. */
  readonly className?: string;
  readonly onClick?: (ev: MouseEvent) => void;
}

/**
 * Build a button.
 *
 * Always sets `type="button"`. That was inconsistent before and is a real
 * bug waiting inside any form: a button with no type is a submit button.
 */
export function button(parent: HTMLElement, spec: ButtonSpec): HTMLButtonElement {
  const variant = spec.variant ?? 'nav';
  const shape = spec.shape ?? 'pill';
  const size = spec.size ?? 'md';
  const classes = ['cb-btn', `v-${variant}`, `s-${shape}`, `z-${size}`];
  if (spec.className) classes.push(spec.className);

  const b = el('button', classes.join(' '), parent) as HTMLButtonElement;
  b.type = 'button';

  if (spec.icon) {
    const i = el('span', 'cb-btn-icon', b);
    i.innerHTML = spec.icon;
    i.setAttribute('aria-hidden', 'true');
  }
  if (spec.text) el('span', 'cb-btn-text', b, spec.text);

  // An icon-only button is invisible to a screen reader without this, and
  // a labelled one reads better than "button, left arrow".
  const name = spec.label ?? spec.text;
  if (name) b.setAttribute('aria-label', name);

  if (spec.onClick) b.addEventListener('click', spec.onClick);
  return b;
}

/* ---------------- the shapes that were duplicated most ---------------- */

/** Chevron pointing left. Replaces the `←` character in nine places. */
export const ICON_BACK = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
  stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
  <path d="M14.5 5.5 L8 12 L14.5 18.5"/></svg>`;

/**
 * Cog. Replaces the ⚙️ emoji, which renders differently on every OS.
 *
 * Drawn as a ring with eight spokes rather than as a filled twelve-point
 * star with a hole punched in it. The star version read as a small white
 * sunburst on a real phone — the silhouette of a gear is its teeth, and
 * filled points at icon size just look spiky.
 *
 * Drawn as a solid toothed disc rather than a circle with spokes: at the
 * 30-odd pixels this actually renders at, spokes read as a sun. Silhouette
 * beats detail at icon sizes.
 */
export const ICON_SETTINGS = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
  stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="3.4"/>
  <path d="M12 2.6v2.6M12 18.8v2.6M21.4 12h-2.6M5.2 12H2.6M18.6 5.4l-1.8 1.8M7.2 16.8l-1.8 1.8M18.6 18.6l-1.8-1.8M7.2 7.2 5.4 5.4"/>
  </svg>`;

/** Question mark for the hint button. */
export const ICON_HELP = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
  stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M8.4 8.8a3.7 3.7 0 1 1 4.8 3.5c-1 .35-1.4 1.05-1.4 2v.5"/>
  <circle cx="11.8" cy="19" r="1.7" fill="currentColor" stroke="none"/></svg>`;

/** Solid triangle. The run/play mark on BOP and Play. */
export const ICON_PLAY = `<svg viewBox="0 0 24 24" fill="currentColor">
  <path d="M7 4.6 20 12 7 19.4Z"/></svg>`;

/** Cross — clear, close, dismiss. */
export const ICON_CLEAR = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
  stroke-width="3.4" stroke-linecap="round"><path d="M6 6 18 18M18 6 6 18"/></svg>`;

/** Five-pointed star, for progress. */
export const ICON_STAR = `<svg viewBox="0 0 24 24" fill="currentColor">
  <path d="M12 2.6 15 9.2l7.2.7-5.4 4.8 1.6 7-6.4-3.7-6.4 3.7 1.6-7L1.8 9.9 9 9.2Z"/></svg>`;

/** Footprints climbing — the Think Trail's own mark. */
export const ICON_TRAIL = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
  stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
  <path d="M3 19h4v-4H3zM10 15h4v-4h-4zM17 11h4V7h-4z"/></svg>`;

/**
 * The back arrow, once.
 *
 * Nine screens built this themselves. The label matters: a child's
 * grown-up hears it, and "Back" alone does not say back to what.
 */
export function backButton(
  parent: HTMLElement,
  onClick: () => void,
  label = 'Go back',
): HTMLButtonElement {
  return button(parent, {
    icon: ICON_BACK, label, variant: 'nav', shape: 'circle', size: 'md', onClick,
  });
}

/** The settings cog, once. */
export function settingsButton(parent: HTMLElement, onClick: () => void): HTMLButtonElement {
  return button(parent, {
    icon: ICON_SETTINGS, label: 'Settings', variant: 'nav', shape: 'circle', size: 'md', onClick,
  });
}

/** The hint button, once. */
export function hintButton(parent: HTMLElement, onClick: () => void): HTMLButtonElement {
  return button(parent, {
    icon: ICON_HELP, label: 'Stuck? Get a hint',
    variant: 'help', shape: 'circle', size: 'md', className: 'cb-hint', onClick,
  });
}
