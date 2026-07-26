/**
 * Background music — one track, looping, sitting under everything else.
 *
 * Two things make this more than `<audio loop>`:
 *
 * 1. It loops SEAMLESSLY. An MP3 carries encoder padding at both ends, so
 *    a browser's own `loop` restarts with an audible hiccup — every couple
 *    of minutes, forever, in a game a child leaves running. Two elements
 *    take turns instead: while one plays out its last second the other
 *    starts from the top, and their volumes cross. The seam lands in the
 *    middle of a fade where there is nothing to hear.
 *
 * 2. It fades. Music that snaps on when a screen opens, or off when a
 *    grown-up hits the toggle, is startling; every start and stop here is
 *    a short ramp.
 *
 * Deliberately NOT routed through the Sfx AudioContext. Browsers cap live
 * contexts at about six and the game already spends one; `<audio>` volume
 * is enough for a music bed and costs no context at all. It also streams,
 * where decoding two minutes of 48kHz stereo into an AudioBuffer would
 * hold ~47MB resident on a tablet that has better uses for it.
 */
const TRACK = './audio/paper-moon-hop.mp3';

/** Music sits under the sound effects, never level with them. */
const VOLUME = 0.34;
/** Seconds of overlap between the outgoing loop and the incoming one. */
const CROSSFADE = 1.1;
/** Seconds to ramp in or out when starting, stopping or toggling. */
const FADE = 0.7;
/** How often the crossfade watcher checks how close the end is. */
const WATCH_MS = 100;

export class Music {
  private a: HTMLAudioElement | null = null;
  private b: HTMLAudioElement | null = null;
  /** Which element is currently the one being heard. */
  private live: HTMLAudioElement | null = null;
  private watcher: number | null = null;
  private fades = new WeakMap<HTMLAudioElement, number>();
  /**
   * Has the APP asked for music? Separate from `enabled`, which is what
   * the grown-up asked for, and the two must not be conflated: folding
   * them together meant switching the setting off cleared the app's
   * request as well, so switching it back on left silence.
   */
  private wanted = false;
  private _enabled = true;

  get enabled(): boolean { return this._enabled; }

  /**
   * The setting. Off fades out but remembers that the app wanted music,
   * so on picks it straight back up.
   */
  set enabled(on: boolean) {
    if (on === this._enabled) return;
    this._enabled = on;
    if (!on) this.silence();
    else if (this.wanted) this.start();
  }

  /**
   * Ask for music. Safe to call on every screen — a second call while it
   * is already playing does nothing, so navigating does not restart the
   * track or stack a second copy of it.
   */
  start(): void {
    this.wanted = true;
    if (!this._enabled || this.live) return;
    this.a ??= this.makeElement();
    this.b ??= this.makeElement();
    this.live = this.a;
    this.live.currentTime = 0;
    this.live.volume = 0;
    void this.play(this.live);
    this.fadeTo(this.live, VOLUME, FADE);
    this.watch();
  }

  /** The app no longer wants music at all. Survives a settings toggle. */
  stop(): void {
    this.wanted = false;
    this.silence();
  }

  /** Fade out and park, without forgetting that music was wanted. */
  private silence(): void {
    this.fadeOutAndPark(this.a);
    this.fadeOutAndPark(this.b);
    this.live = null;
    if (this.watcher !== null) {
      window.clearInterval(this.watcher);
      this.watcher = null;
    }
  }

  /** Drop everything. For teardown, not for pausing. */
  dispose(): void {
    this.stop();
    for (const e of [this.a, this.b]) {
      if (!e) continue;
      e.pause();
      e.removeAttribute('src');
      e.load();
      e.remove();
    }
    this.a = this.b = null;
  }

  private makeElement(): HTMLAudioElement {
    const e = new Audio();
    e.src = TRACK;
    e.preload = 'auto';
    // NOT `loop`. The crossfade owns the seam; leaving the browser's own
    // loop on would restart the element underneath us mid-fade.
    e.loop = false;
    e.volume = 0;
    // In the document, hidden and with no controls. A detached element
    // plays perfectly well, but nothing outside this file can then see
    // whether music is running — not a test, not a developer with the
    // inspector open. There is no cost to attaching it.
    e.className = 'bg-music';
    e.hidden = true;
    e.setAttribute('aria-hidden', 'true');
    // Backstop. The watcher normally hands over a second before the end,
    // but it is a timer, and a timer sharing a thread with a render loop
    // can be starved past its window — at which point the track would
    // simply stop and the game would go quiet for good. If an element
    // reaches the end while it is the live one, hand over immediately.
    e.addEventListener('ended', () => {
      if (this.live === e && this.wanted && this._enabled) this.handover(0.08);
    });
    document.body.appendChild(e);
    return e;
  }

  /**
   * Autoplay is blocked until a page has been interacted with, and a
   * rejected play() is a promise nobody is awaiting — so swallow it here
   * rather than let it surface as an unhandled rejection in the console.
   * `attachFirstGesture` below is what actually gets it going.
   */
  private async play(e: HTMLAudioElement): Promise<void> {
    try { await e.play(); } catch { /* blocked until a gesture; retried then */ }
  }

  /** Is the music actually audible right now? */
  get playing(): boolean {
    return this.live !== null && !this.live.paused;
  }

  /**
   * Ramp one element's volume over `seconds`.
   *
   * Progress comes from the CLOCK, never from counting ticks. A timer set
   * to 40ms only fires every 40ms on an idle page; sharing a main thread
   * with a Three.js render loop on a software renderer it was measured
   * firing every ~600ms, which turned a 0.7s fade into an 11s one and left
   * music audibly playing long after a grown-up had switched it off. Read
   * the clock and a starved timer just makes the same fade in coarser
   * steps, finishing on time either way.
   */
  private fadeTo(e: HTMLAudioElement, to: number, seconds: number, then?: () => void): void {
    const existing = this.fades.get(e);
    if (existing !== undefined) window.clearInterval(existing);
    const from = e.volume;
    const t0 = performance.now();
    const ms = Math.max(1, seconds * 1000);
    const id = window.setInterval(() => {
      const t = Math.min(1, (performance.now() - t0) / ms);
      e.volume = Math.max(0, Math.min(1, from + (to - from) * t));
      if (t >= 1) {
        window.clearInterval(id);
        this.fades.delete(e);
        then?.();
      }
    }, 40);
    this.fades.set(e, id);
  }

  private fadeOutAndPark(e: HTMLAudioElement | null): void {
    if (!e || e.paused) return;
    this.fadeTo(e, 0, FADE, () => { e.pause(); e.currentTime = 0; });
  }

  /**
   * Watch the playing element and hand over before it runs out.
   *
   * `duration` is NaN until enough of the file has loaded, which is
   * exactly the window in which a naive check would think the track had
   * ended and thrash the handover — hence the isFinite guard.
   */
  private watch(): void {
    if (this.watcher !== null) window.clearInterval(this.watcher);
    this.watcher = window.setInterval(() => {
      const cur = this.live;
      if (!cur || cur.paused) return;
      const dur = cur.duration;
      if (!Number.isFinite(dur) || dur <= 0) return;
      if (dur - cur.currentTime > CROSSFADE) return;
      this.handover(CROSSFADE);
    }, WATCH_MS);
  }

  /**
   * Bring the other element in and take this one out.
   *
   * `fade` is the overlap: a whole crossfade when the watcher catches the
   * end coming, and near-instant when the `ended` backstop fires, because
   * by then there is nothing left of the outgoing track to fade.
   */
  private handover(fade: number): void {
    const cur = this.live;
    if (!cur) return;
    const next = cur === this.a ? this.b : this.a;
    if (!next || !next.paused) return;
    next.currentTime = 0;
    next.volume = 0;
    void this.play(next);
    this.fadeTo(next, VOLUME, fade);
    this.fadeTo(cur, 0, fade, () => { cur.pause(); cur.currentTime = 0; });
    this.live = next;
  }
}

/**
 * One app-wide player. A per-screen instance would start the track over
 * on every navigation, which is the single most obvious way to make a
 * background track annoying.
 */
export const sharedMusic = new Music();

/**
 * Start the music on the first thing the child touches.
 *
 * Every browser blocks audio until a page has been interacted with, so
 * the track cannot simply begin at boot — and asking a three-year-old to
 * press a speaker button first is not a design. The first tap or key
 * anywhere is the gesture; after that this unhooks itself.
 */
export function attachFirstGesture(target: EventTarget = window): () => void {
  const events = ['pointerdown', 'keydown', 'touchstart'] as const;
  const go = (): void => {
    sharedMusic.start();
    off();
  };
  const off = (): void => {
    for (const ev of events) target.removeEventListener(ev, go);
  };
  for (const ev of events) target.addEventListener(ev, go, { passive: true });
  return off;
}
