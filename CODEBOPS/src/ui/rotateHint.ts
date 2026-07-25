/**
 * "Turn your phone sideways" — for play screens on a narrow portrait
 * screen.
 *
 * Why this exists, measured rather than guessed: on a 390×844 phone the
 * chrome a play screen needs (top bar, goal card, the command deck) leaves
 * the 3D stage a band 505px tall — and in portrait that band is far wider
 * than it is deep, so the fit-by-projection camera has to dolly a long way
 * out to get the puzzle inside it. The result is a toy that reads as small
 * and far away. Turned sideways, the same puzzle fills the frame.
 *
 * Three rules it keeps:
 *  - It NEVER blocks. A child in a car seat, or on a device with rotation
 *    locked, taps "Play like this" and carries on. Nothing is withheld.
 *  - The choice sticks for the session, so it asks once, not every level.
 *  - It only appears on screens narrow enough for it to be true. A tablet
 *    in portrait has room and is left alone.
 */
import { el } from './dom';
import { sharedSfx } from '../audio/sfx';
import { announce } from './a11y';

/** Narrow AND portrait. A tablet in portrait has the height to spare. */
const QUERY = '(orientation: portrait) and (max-width: 700px)';

/** Answered once per session — asking at every level would be nagging. */
let dismissed = false;

export interface RotateHintHandle {
  dispose(): void;
}

/**
 * Watch for narrow portrait while a play screen is up, and offer the hint.
 * Returns a handle the screen disposes on the way out.
 */
export function watchOrientation(parent: HTMLElement): RotateHintHandle {
  let overlay: HTMLElement | null = null;
  const mq = window.matchMedia(QUERY);

  const hide = (): void => {
    overlay?.remove();
    overlay = null;
  };

  const show = (): void => {
    if (overlay || dismissed) return;
    overlay = el('div', 'rotate-hint', parent);
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-label', 'Turn your device sideways to play');

    const card = el('div', 'rh-card', overlay);
    const art = el('div', 'rh-art', card);
    art.setAttribute('aria-hidden', 'true');
    el('span', 'rh-phone', art, '📱');
    el('span', 'rh-turn', art, '↻');

    el('h2', undefined, card, 'Turn me sideways!');
    el('p', undefined, card, 'The puzzle is much bigger when your screen is wide.');

    const anyway = el('button', 'mini-btn rh-anyway', card, 'Play like this') as HTMLButtonElement;
    anyway.type = 'button';
    anyway.addEventListener('click', () => {
      sharedSfx.play('tap');
      dismissed = true;
      hide();
    });
    announce('Turn your device sideways for a bigger view, or choose play like this.');
  };

  const sync = (): void => {
    if (mq.matches) show(); else hide();
  };

  sync();
  // `change` on the query covers rotation and resize on every browser that
  // matters; `resize` is the belt-and-braces for older WebKit.
  mq.addEventListener('change', sync);
  window.addEventListener('resize', sync);

  return {
    dispose(): void {
      mq.removeEventListener('change', sync);
      window.removeEventListener('resize', sync);
      hide();
    },
  };
}

/** Test seam: forget the "play like this" choice. */
export function resetRotateHint(): void {
  dismissed = false;
}
