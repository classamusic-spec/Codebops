/**
 * The app's front door to codebops-rig.
 *
 * The vendored package under src/vendor/codebops-rig is kept VERBATIM so
 * updating it is a clean re-copy. Everything this app needs on top of it —
 * lazy loading, calm mode, disposal, sizing, and a call shape that matches
 * the `inlineSvgInto` it replaces — lives here.
 *
 * Why a wrapper rather than calling createRig at each site:
 *  - the engine and the two character files are ~128KB of JS, so they are
 *    imported dynamically and only when a mascot is actually mounted. A
 *    child who never opens a screen with Zip on it never downloads him.
 *  - every screen in this app already has a dispose(), and a rig holds a
 *    rAF loop and canvases. One handle with one destroy() keeps that
 *    honest.
 *  - calm mode and prefers-reduced-motion are app-wide settings; the rig
 *    takes them per-instance, so they are applied here once.
 */
import type { CharacterRig, AnimationName, FaceName } from '../vendor/codebops-rig/codebops-rig.js';

export type MascotName = 'zip' | 'mixy';

export interface MascotOptions {
  /** Damp the motion. Pass the calm-mode setting. */
  readonly calm?: boolean;
  /** Eyes follow the pointer over the host element. */
  readonly followPointer?: boolean;
  /** Clip to play once the rig is ready. Defaults to idle. */
  readonly start?: AnimationName;
  /** Face to hold. */
  readonly face?: FaceName;
  /** Art units across the shorter axis. Smaller = the character fills more. */
  readonly fit?: number;
}

export interface MascotHandle {
  /** Null until the rig has loaded and rasterised. */
  readonly rig: CharacterRig | null;
  play(name: AnimationName): void;
  setFace(name: FaceName): void;
  look(x: number, y?: number): void;
  setCalm(calm: boolean): void;
  destroy(): void;
}

/**
 * The engine and character data, fetched once and shared. Two mascots on
 * one screen must not pull 128KB twice.
 */
let enginePromise: Promise<typeof import('../vendor/codebops-rig/codebops-rig.js')> | null = null;
const characterPromises = new Map<MascotName, Promise<unknown>>();

function engine(): Promise<typeof import('../vendor/codebops-rig/codebops-rig.js')> {
  enginePromise ??= import('../vendor/codebops-rig/codebops-rig.js');
  return enginePromise;
}

function characterData(who: MascotName): Promise<unknown> {
  let p = characterPromises.get(who);
  if (!p) {
    p = who === 'zip'
      ? import('../vendor/codebops-rig/characters/zip.js').then((m) => m.default)
      : import('../vendor/codebops-rig/characters/mixy.js').then((m) => m.default);
    characterPromises.set(who, p);
  }
  return p;
}

/**
 * Put a live mascot into `host`. Returns immediately with a handle whose
 * calls queue until the rig is ready, so a caller never has to await.
 *
 * The host keeps whatever it had until the canvas arrives, which means a
 * screen that mounts a mascot mid-layout does not reflow twice.
 */
export function mountMascot(
  host: HTMLElement, who: MascotName, options: MascotOptions = {},
): MascotHandle {
  let rig: CharacterRig | null = null;
  let destroyed = false;
  let observer: ResizeObserver | null = null;
  /** Calls made before the rig loaded, replayed in order once it has. */
  const queued: Array<(r: CharacterRig) => void> = [];
  const apply = (fn: (r: CharacterRig) => void): void => {
    if (rig) fn(rig); else queued.push(fn);
  };

  const canvas = document.createElement('canvas');
  canvas.className = 'mascot-canvas';
  // Decorative: the surrounding element carries the label, and a mascot is
  // never the only way to learn anything.
  canvas.setAttribute('aria-hidden', 'true');

  void (async () => {
    try {
      const [{ createRig }, character] = await Promise.all([engine(), characterData(who)]);
      if (destroyed) return;
      host.appendChild(canvas);
      const built = await createRig(character as never, {
        canvas,
        autoBlink: true,
        reducedMotion: options.calm === true ? true : 'auto',
        ...(options.fit === undefined ? {} : { fit: options.fit }),
      });
      if (destroyed) { built.destroy(); return; }
      rig = built;
      if (options.face) built.setFace(options.face);
      if (options.start) built.play(options.start);
      if (options.followPointer) built.followPointer(host);
      built.start();
      // The canvas backing store follows its CSS size, so it has to be told
      // when the layout moves it.
      if (typeof ResizeObserver !== 'undefined') {
        observer = new ResizeObserver(() => { if (!destroyed) built.resize(); });
        observer.observe(canvas);
      }
      for (const fn of queued) fn(built);
      queued.length = 0;
      host.classList.add('mascot-ready');
    } catch {
      // A mascot is decoration. If the rig cannot load — an old WebView, a
      // failed decode — the screen carries on without it rather than
      // breaking, which is why nothing here rethrows.
      canvas.remove();
    }
  })();

  return {
    get rig(): CharacterRig | null { return rig; },
    play(name) { apply((r) => { if (r.animations.includes(name)) r.play(name, { restart: true }); }); },
    setFace(name) { apply((r) => r.setFace(name)); },
    look(x, y = 0) { apply((r) => r.look(x, y)); },
    setCalm(calm) { apply((r) => r.setReducedMotion(calm)); },
    destroy() {
      destroyed = true;
      observer?.disconnect();
      observer = null;
      queued.length = 0;
      rig?.destroy();
      rig = null;
      canvas.remove();
      host.classList.remove('mascot-ready');
    },
  };
}
