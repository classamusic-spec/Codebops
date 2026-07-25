/**
 * The app's front door to codebops-rig.
 *
 * The vendored package under src/vendor/codebops-rig is kept VERBATIM so
 * updating it is a clean re-copy. Everything this app needs on top of it —
 * lazy loading, a shared raster cache, calm mode, disposal, sizing, and a
 * call shape that suits the screens — lives here.
 *
 * Two things this module exists to get right:
 *
 * LOADING ONCE. The engine and the two character files are ~128KB of JS,
 * so they are imported dynamically and only when a character is actually
 * needed. A child who never opens a screen with Zip on it never downloads
 * him.
 *
 * RASTERISING ONCE. createRig() rasterises every layer of the character
 * from SVG into its own canvas at 2.2x — 34 layers for Zip, 41 for Mixy.
 * That is the expensive part, it does not depend on the instance, and the
 * app puts characters on screen constantly: two on the title, two in the
 * garden, two in every one of seventeen play screens. So the rasters are
 * built once per character and every rig after the first is instant. This
 * is why the module hands out rigs rather than letting callers reach for
 * createRig themselves.
 */
import type {
  CharacterRig, AnimationName, FaceName, Character, RigOptions,
} from '../vendor/codebops-rig/codebops-rig.js';

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

type Engine = typeof import('../vendor/codebops-rig/codebops-rig.js');
/** What buildRasters returns: the per-layer canvases, keyed by layer id. */
type Rasters = Awaited<ReturnType<Engine['buildRasters']>>;

let enginePromise: Promise<Engine> | null = null;
const characterPromises = new Map<MascotName, Promise<Character>>();
const rasterPromises = new Map<MascotName, Promise<Rasters>>();

function engine(): Promise<Engine> {
  enginePromise ??= import('../vendor/codebops-rig/codebops-rig.js');
  return enginePromise;
}

function characterData(who: MascotName): Promise<Character> {
  let p = characterPromises.get(who);
  if (!p) {
    p = who === 'zip'
      ? import('../vendor/codebops-rig/characters/zip.js').then((m) => m.default)
      : import('../vendor/codebops-rig/characters/mixy.js').then((m) => m.default);
    characterPromises.set(who, p);
  }
  return p;
}

function rastersFor(who: MascotName): Promise<Rasters> {
  let p = rasterPromises.get(who);
  if (!p) {
    p = (async () => {
      const [{ buildRasters }, character] = await Promise.all([engine(), characterData(who)]);
      return buildRasters(character);
    })();
    rasterPromises.set(who, p);
  }
  return p;
}

/**
 * A rig sharing the cached rasters.
 *
 * createRig() would rasterise again; CharacterRig's constructor takes the
 * rasters as an argument, which is exactly the seam this needs. The
 * package's .d.ts declares the class without its constructor — the one
 * cast below names that signature rather than editing vendored types,
 * which would turn the next update into a merge.
 */
export async function makeRig(who: MascotName, opts: RigOptions = {}): Promise<CharacterRig> {
  const [mod, character, rasters] = await Promise.all([
    engine(), characterData(who), rastersFor(who),
  ]);
  type RigConstructor = new (c: Character, r: Rasters, o: RigOptions) => CharacterRig;
  const Rig = mod.CharacterRig as unknown as RigConstructor;
  return new Rig(character, rasters, opts);
}

/**
 * Warm the cache without putting anything on screen. Called when a screen
 * knows a character is about to be needed, so the rasterise does not land
 * in the middle of a level opening.
 */
export function preloadMascot(who: MascotName): void {
  void rastersFor(who).catch(() => { /* mountMascot reports it if it matters */ });
}

/** Reported once per character; a repeated warning helps nobody. */
const warned = new Set<string>();
function warnOnce(who: MascotName, err: unknown): void {
  if (warned.has(who)) return;
  warned.add(who);
  // A mascot is decoration, so this never throws — but a silent failure is
  // how "the character just doesn't show up" becomes unexplainable.
  console.warn(`[CodeBops] ${who}'s rig could not load; the screen carries on without it.`, err);
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

  // A backgrounded tab still services rAF on some engines, and a rig that
  // keeps posing forty layers behind a locked phone screen is pure battery.
  const onVisibility = (): void => {
    if (!rig) return;
    if (document.hidden) rig.stop(); else rig.start();
  };

  void (async () => {
    try {
      const built = await makeRig(who, {
        canvas,
        autoBlink: true,
        reducedMotion: options.calm === true ? true : 'auto',
        ...(options.fit === undefined ? {} : { fit: options.fit }),
      });
      if (destroyed) { built.destroy(); return; }
      host.appendChild(canvas);
      // The canvas backing store is read from its CSS size, so it has to be
      // in the document before the rig measures it.
      built.resize();
      rig = built;
      if (options.face) built.setFace(options.face);
      if (options.start) built.play(options.start);
      if (options.followPointer) built.followPointer(host);
      built.start();
      if (typeof ResizeObserver !== 'undefined') {
        observer = new ResizeObserver(() => { if (!destroyed) built.resize(); });
        observer.observe(canvas);
      }
      document.addEventListener('visibilitychange', onVisibility);
      for (const fn of queued) fn(built);
      queued.length = 0;
      host.classList.add('mascot-ready');
    } catch (err) {
      // A mascot is decoration. If the rig cannot load — an old WebView, a
      // failed decode — the screen carries on without it rather than
      // breaking, which is why nothing here rethrows.
      warnOnce(who, err);
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
      document.removeEventListener('visibilitychange', onVisibility);
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
