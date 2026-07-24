/**
 * SpriteCharacter — the canon SVG mascots living in the dimensional world.
 *
 * The character is an inline SVG inside a DOM overlay; a hidden 3D anchor
 * tracks its world position, and every frame the sprite is projected onto
 * the screen with correct perspective scale. Because the SVG is real DOM,
 * the traced mascot parts (eyes, lids, mouth, arms, fragments) animate with
 * crisp CSS state changes: blink, look, star-eyes, smiles, surprise,
 * thinking, waving, celebration and Mixy's glitch — the "layered paper"
 * architecture from the art direction, using the traced canon art.
 */
import * as THREE from 'three';
import { contactShadowTexture } from './materials/toon';
import { Tweener } from './tween';

export type Mood = 'idle' | 'happy' | 'excited' | 'surprised' | 'thinking';
export type LookDir = 'left' | 'right' | 'up' | null;

export interface SpriteCharacterOptions {
  svgUrl: string;
  /** Character height in world units. */
  height: number;
  name: string;
  mixy?: boolean;
  /** Extra CSS class on the sprite element (e.g. 'robot-bop' for Bolt). */
  extraClass?: string;
}

const svgCache = new Map<string, Promise<string>>();

/**
 * The exported art all uses generic `.cls-0`, `.cls-1`, … class names with
 * per-file colours. We inline several of these SVGs into ONE document
 * (Zip, GlitchBop, the logo), so their <style> blocks would collide and
 * the last one loaded would repaint every other mascot. Scope each file's
 * classes to itself before inlining.
 */
function scopeSvgClasses(text: string, url: string): string {
  if (!text.includes('.cls-')) return text;
  const tag = `s${Math.abs([...url].reduce((h, c) => (h * 31 + c.charCodeAt(0)) | 0, 7)).toString(36)}`;
  return text
    .replace(/\.cls-(\d+)/g, (_m, n) => `.${tag}-cls${n}`)
    .replace(/class="([^"]*)"/g, (_m, list: string) =>
      `class="${list.split(/\s+/).map((c) => (/^cls-\d+$/.test(c) ? `${tag}-cls${c.slice(4)}` : c)).join(' ')}"`);
}

export function loadSvg(url: string): Promise<string> {
  let p = svgCache.get(url);
  if (!p) {
    p = fetch(url).then((r) => {
      if (!r.ok) throw new Error(`[CodeBops] Failed to load ${url}`);
      return r.text();
    }).then((text) => scopeSvgClasses(text, url));
    svgCache.set(url, p);
  }
  return p;
}

/** Inline an SVG into a DOM container (shared with title/select screens). */
export async function inlineSvgInto(container: HTMLElement, url: string): Promise<SVGSVGElement | null> {
  const text = await loadSvg(url);
  container.innerHTML = text;
  const svg = container.querySelector('svg');
  if (svg) rigMascotParts(svg);
  return svg;
}

/**
 * Tag the mascot's face parts so they can be animated.
 *
 * The art is exported as flat, unnamed paths — no ids, no semantic
 * classes — so we identify parts by MEASURING them: each shape's
 * bounding box (normalised against the viewBox) plus its fill. That is
 * far more reliable than reading path data, and it self-corrects if the
 * art is re-exported, since it reasons about where things actually are.
 *
 * Tags applied: cb-eye (whites + pupils), cb-pupil, cb-shine, cb-mouth,
 * cb-ear, cb-crest (tuft / lightning bolt), cb-glitch (GlitchBop's
 * scattered pixels). Anything unrecognised is simply left alone.
 */
export function rigMascotParts(svg: SVGSVGElement): void {
  if (svg.dataset.cbRigged === '1') return;
  const vb = svg.viewBox?.baseVal;
  if (!vb || vb.width <= 0 || vb.height <= 0) return;

  const shapes = Array.from(svg.querySelectorAll<SVGGraphicsElement>('path,circle,ellipse,rect,polygon'));
  type Part = { el: SVGGraphicsElement; cx: number; cy: number; rw: number; rh: number; rgb: [number, number, number] | null };
  const parts: Part[] = [];
  for (const el of shapes) {
    let bb: DOMRect;
    try { bb = el.getBBox(); } catch { continue; }          // not rendered yet
    if (bb.width <= 0 || bb.height <= 0) continue;
    const fill = getComputedStyle(el).fill;
    const m = /rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(fill);
    parts.push({
      el,
      cx: (bb.x + bb.width / 2 - vb.x) / vb.width,
      cy: (bb.y + bb.height / 2 - vb.y) / vb.height,
      rw: bb.width / vb.width,
      rh: bb.height / vb.height,
      rgb: m ? [+m[1], +m[2], +m[3]] : null,
    });
  }
  if (parts.length === 0) return;

  const isWhite = (p: Part): boolean => !!p.rgb && p.rgb.every((c) => c > 232);
  const isDark = (p: Part): boolean => !!p.rgb && p.rgb[0] + p.rgb[1] + p.rgb[2] < 260;
  const isRed = (p: Part): boolean => !!p.rgb && p.rgb[0] > 150 && p.rgb[1] < 120;
  const offCentre = (p: Part): number => Math.abs(p.cx - 0.5);

  for (const p of parts) {
    if (p.rw > 0.6) continue;                               // the head/body itself

    // --- eyes: a left/right pair on the face, whites + dark pupils ---
    if (p.cy > 0.5 && p.cy < 0.84 && offCentre(p) > 0.09 && offCentre(p) < 0.32) {
      if (p.rw < 0.075 && isWhite(p)) { p.el.classList.add('cb-shine'); continue; }
      if (isWhite(p) && p.rw > 0.08) { p.el.classList.add('cb-eye', 'cb-eyewhite'); continue; }
      if (isDark(p) && p.rw > 0.08) { p.el.classList.add('cb-eye', 'cb-pupil'); continue; }
    }
    // --- mouth: centred, low on the face ---
    if (p.cy > 0.70 && offCentre(p) < 0.09 && p.rw < 0.22 && (isRed(p) || isDark(p))) {
      p.el.classList.add('cb-mouth');
      continue;
    }
    // --- ears: high and wide of the head ---
    if (p.cy < 0.42 && offCentre(p) > 0.26) {
      p.el.classList.add('cb-ear', p.cx < 0.5 ? 'cb-ear-l' : 'cb-ear-r');
      continue;
    }
    // --- crest: the tuft / lightning bolt above the face ---
    if (p.cy < 0.46 && offCentre(p) < 0.2 && p.rw > 0.07) {
      p.el.classList.add('cb-crest');
      continue;
    }
    // --- GlitchBop's scattered pixels: tiny, saturated, off to the sides ---
    if (p.rw < 0.07 && p.rh < 0.07 && offCentre(p) > 0.3) {
      p.el.classList.add('cb-glitch-bit');
    }
  }

  // The art has no star-eye artwork, so build it: drop a star over each
  // pupil, hidden until the mascot is excited.
  addStarEyes(parts.filter((p) => p.el.classList.contains('cb-pupil')));
  svg.dataset.cbRigged = '1';
}

/** Five-pointed star path centred on (cx, cy). */
function starPath(cx: number, cy: number, r: number): string {
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const rad = i % 2 === 0 ? r : r * 0.44;
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    pts.push(`${(cx + Math.cos(a) * rad).toFixed(2)},${(cy + Math.sin(a) * rad).toFixed(2)}`);
  }
  return `M${pts.join('L')}Z`;
}

function addStarEyes(pupils: Array<{ el: SVGGraphicsElement }>): void {
  const NS = 'http://www.w3.org/2000/svg';
  for (const p of pupils) {
    let bb: DOMRect;
    try { bb = p.el.getBBox(); } catch { continue; }
    const star = document.createElementNS(NS, 'path');
    star.setAttribute('d', starPath(bb.x + bb.width / 2, bb.y + bb.height / 2, Math.max(bb.width, bb.height) * 0.62));
    star.setAttribute('fill', '#FFD23E');
    star.setAttribute('stroke', '#FF9E1B');
    star.setAttribute('stroke-width', String(Math.max(0.6, bb.width * 0.07)));
    star.setAttribute('stroke-linejoin', 'round');
    star.setAttribute('class', 'cb-star');
    p.el.parentNode?.insertBefore(star, p.el.nextSibling);
  }
}

/**
 * Give an inlined mascot SVG ambient life (blink + glances) outside the
 * 3D world — used on the title screen. Returns a stop function.
 */
export function startMascotLife(svg: SVGSVGElement): () => void {
  let alive = true;
  const blink = (): void => {
    if (!alive) return;
    svg.classList.add('blink');
    window.setTimeout(() => svg.classList.remove('blink'), 150);
    window.setTimeout(blink, 1800 + Math.random() * 2600);
  };
  const glance = (): void => {
    if (!alive) return;
    svg.classList.remove('look-left', 'look-right', 'look-up');
    const dirs = ['look-left', 'look-right', 'look-up', ''];
    const pick = dirs[Math.floor(Math.random() * dirs.length)];
    if (pick) svg.classList.add(pick);
    window.setTimeout(glance, 3200 + Math.random() * 3600);
  };
  window.setTimeout(blink, 900 + Math.random() * 1200);
  window.setTimeout(glance, 2200);
  return () => { alive = false; };
}

const UP = new THREE.Vector3(0, 1, 0);
// Scratch vectors reused every frame (avoids per-frame GC churn).
const SCRATCH_A = new THREE.Vector3();
const SCRATCH_B = new THREE.Vector3();

export class SpriteCharacter {
  readonly root = new THREE.Group();
  readonly carryAnchor = new THREE.Object3D();
  readonly tweener = new Tweener();
  readonly el: HTMLDivElement;
  private shadow: THREE.Mesh;
  private svg: SVGSVGElement | null = null;
  private bobPhase = Math.random() * Math.PI * 2;
  private calm = false;
  /** Idle-hop state: -1 = resting, 0..1 = mid-hop. */
  private hopT = -1;
  private hopDur = 0.5;
  private hopWait = 0.6 + Math.random() * 1.6;
  /**
   * Each bop hops with its own personality: Zip is a steady, confident
   * bouncer; GlitchBop is twitchier — shorter gaps, snappier, higher.
   */
  private hopStyle = { dur: 0.52, height: 0.16, gap: 1.5, jitter: 1.7 };
  private blinkClock = 1.2 + Math.random() * 2.2;
  private lookClock = 5 + Math.random() * 4;
  private ready: Promise<void>;

  constructor(
    private readonly opts: SpriteCharacterOptions,
    layer: HTMLElement,
    private readonly camera: THREE.PerspectiveCamera,
    private readonly viewport: HTMLElement,
  ) {
    this.root.name = opts.name;
    // GlitchBop is the twitchy one — hops more often, snappier and higher.
    if (opts.mixy) this.hopStyle = { dur: 0.44, height: 0.2, gap: 0.9, jitter: 1.2 };

    this.shadow = new THREE.Mesh(
      new THREE.PlaneGeometry(1.25, 1.25),
      new THREE.MeshBasicMaterial({ map: contactShadowTexture(), transparent: true, depthWrite: false }),
    );
    this.shadow.rotation.x = -Math.PI / 2;
    this.shadow.renderOrder = 1;

    this.carryAnchor.position.set(-0.4, opts.height * 0.55, 0.12);
    this.root.add(this.carryAnchor);

    this.el = document.createElement('div');
    this.el.className = `char-sprite ${opts.mixy ? 'mixy-sprite' : 'zip-sprite'}${opts.extraClass ? ` ${opts.extraClass}` : ''}`;
    this.el.setAttribute('aria-hidden', 'true');
    layer.appendChild(this.el);

    this.ready = inlineSvgInto(this.el, opts.svgUrl).then((svg) => {
      this.svg = svg;
    });
  }

  whenReady(): Promise<void> {
    return this.ready;
  }

  addToScene(scene: THREE.Scene): void {
    scene.add(this.root);
    scene.add(this.shadow);
  }

  setCalm(calm: boolean): void {
    this.calm = calm;
    this.el.classList.toggle('calm', calm);
  }

  placeAt(pos: THREE.Vector3): void {
    this.root.position.copy(pos);
    this.syncShadow();
  }

  private syncShadow(): void {
    this.shadow.position.set(this.root.position.x, 0.44, this.root.position.z);
  }

  // ---------- moods & expressions ----------

  setMood(mood: Mood): void {
    const s = this.svg;
    if (!s) return;
    s.classList.toggle('excited', mood === 'excited');
    s.classList.toggle('surprised', mood === 'surprised');
    s.classList.toggle('thinking', mood === 'thinking');
    s.classList.toggle('mouth-smile-on', mood === 'happy');
    this.el.classList.toggle('mood-thinking', mood === 'thinking');
    this.el.classList.toggle('mood-happy', mood === 'happy');
  }

  look(dir: LookDir): void {
    const s = this.svg;
    if (!s) return;
    s.classList.toggle('look-left', dir === 'left');
    s.classList.toggle('look-right', dir === 'right');
    s.classList.toggle('look-up', dir === 'up');
  }

  wave(times = 3): void {
    if (!this.svg || this.calm) return;
    this.el.classList.remove('waving');
    // restart the CSS animation
    void this.el.offsetWidth;
    this.el.style.setProperty('--wave-count', String(times));
    this.el.classList.add('waving');
    window.setTimeout(() => this.el.classList.remove('waving'), times * 560 + 100);
  }

  // ---------- moves ----------

  async hopTo(to: THREE.Vector3, duration = 0.34): Promise<void> {
    const from = this.root.position.clone();
    const jump = this.calm ? 0.06 : 0.4;
    this.el.classList.add('hop');
    await this.tweener.tween(duration, (k) => {
      this.root.position.lerpVectors(from, to, k);
      this.root.position.y = THREE.MathUtils.lerp(from.y, to.y, k) + Math.sin(k * Math.PI) * jump;
      this.syncShadow();
    }, 'inOut');
    this.el.classList.remove('hop');
  }

  async bumpShake(): Promise<void> {
    this.flashMood('surprised', 900);
    this.el.classList.add('bump');
    await new Promise((r) => setTimeout(r, 320));
    this.el.classList.remove('bump');
  }

  async turnWiggle(): Promise<void> {
    if (this.calm) return;
    this.el.classList.add('turn');
    await new Promise((r) => setTimeout(r, 300));
    this.el.classList.remove('turn');
  }

  async celebrate(): Promise<void> {
    this.setMood('excited');
    this.wave(3);
    this.el.classList.add('celebrate');
    await new Promise((r) => setTimeout(r, this.calm ? 400 : 1600));
    this.el.classList.remove('celebrate');
  }

  async glitchWobble(duration = 0.8): Promise<void> {
    this.el.classList.add('glitching');
    await new Promise((r) => setTimeout(r, duration * 1000));
    this.el.classList.remove('glitching');
  }

  private moodTimer = 0;
  flashMood(mood: Mood, ms: number): void {
    this.setMood(mood);
    window.clearTimeout(this.moodTimer);
    this.moodTimer = window.setTimeout(() => this.setMood('idle'), ms);
  }

  /** One blink — and now and then a quick double, which reads as alive. */
  private blink(): void {
    const s = this.svg;
    if (!s || this.calm) return;
    const once = (delay: number): void => {
      window.setTimeout(() => {
        if (!this.svg) return;
        s.classList.remove('blink');
        void s.getBoundingClientRect();     // restart the keyframe
        s.classList.add('blink');
        window.setTimeout(() => s.classList.remove('blink'), 200);
      }, delay);
    };
    once(0);
    if (Math.random() < 0.3) once(280);
  }

  /** Per-frame: project the 3D anchor to screen + idle life. */
  update(dt: number, elapsed: number): void {
    this.tweener.update(dt);

    // blink + occasional glances
    this.blinkClock -= dt;
    if (this.blinkClock <= 0) {
      this.blink();
      this.blinkClock = 2.2 + Math.random() * 2.6;
    }
    this.lookClock -= dt;
    if (this.lookClock <= 0) {
      const dirs: LookDir[] = ['left', 'right', null, 'up'];
      this.look(dirs[Math.floor(Math.random() * dirs.length)]);
      this.lookClock = 4 + Math.random() * 5;
    }

    if (!this.svg) return;
    const w = this.viewport.clientWidth;
    const h = this.viewport.clientHeight;
    if (w === 0 || h === 0) return;

    const p = SCRATCH_A.copy(this.root.position).project(this.camera);
    const p2 = SCRATCH_B.copy(this.root.position).add(UP).project(this.camera);
    if (p.z > 1) {
      this.el.style.visibility = 'hidden';
      return;
    }
    this.el.style.visibility = 'visible';
    const sx = (p.x * 0.5 + 0.5) * w;
    const sy = (-p.y * 0.5 + 0.5) * h;
    const sy2 = (-p2.y * 0.5 + 0.5) * h;
    const pxPerUnit = Math.max(1, Math.abs(sy - sy2));
    const pxH = pxPerUnit * this.opts.height;
    this.el.style.height = `${pxH.toFixed(1)}px`;
    const { lift, sqx, sqy } = this.idleHop(dt, elapsed, pxH);
    this.el.style.transform =
      `translate(${sx.toFixed(1)}px, ${(sy - lift).toFixed(1)}px) translate(-50%, -100%)`
      + ` scale(${sqx.toFixed(3)}, ${sqy.toFixed(3)})`;
  }

  /**
   * Idle life: a springy little HOP instead of a flat float. The bops are
   * heads with ears and no legs, so the whole body has to carry the
   * motion — anticipation squash, a stretch on launch, a floaty apex, then
   * a landing squash that settles. Between hops they breathe.
   *
   * Returns a vertical lift in px plus squash/stretch scales (applied
   * about the base, so they never look like they leave the ground).
   */
  private idleHop(dt: number, elapsed: number, pxH: number): { lift: number; sqx: number; sqy: number } {
    if (this.calm) return { lift: 0, sqx: 1, sqy: 1 };

    if (this.hopT >= 0) {
      this.hopT += dt / this.hopDur;
      if (this.hopT >= 1) { this.hopT = -1; this.hopWait = this.nextHopWait(); }
    } else {
      this.hopWait -= dt;
      if (this.hopWait <= 0) { this.hopT = 0; this.hopDur = this.hopStyle.dur; }
    }

    // Resting breath — tiny, so the hop reads as the big beat.
    const breath = Math.sin(elapsed * 2.2 + this.bobPhase) * pxH * 0.012;
    if (this.hopT < 0) return { lift: breath, sqx: 1, sqy: 1 };

    const t = this.hopT;
    const A = 0.18;            // anticipation (crouch)
    const L = 0.30;            // launch
    const D = 0.82;            // land
    let lift = 0;
    let sqy = 1;
    if (t < A) {                                   // crouch: squash down
      const k = t / A;
      sqy = 1 - 0.14 * Math.sin(k * Math.PI * 0.5);
    } else if (t < D) {                            // airborne arc
      const k = (t - A) / (D - A);
      lift = Math.sin(k * Math.PI) * pxH * this.hopStyle.height;
      // stretch just after launch, neutral at apex, stretch again on fall
      sqy = t < L ? 1 + 0.12 * (1 - (t - A) / (L - A)) : 1 + 0.06 * Math.abs(Math.cos(k * Math.PI));
    } else {                                       // landing squash + settle
      const k = (t - D) / (1 - D);
      sqy = 1 - 0.16 * Math.sin(k * Math.PI) * (1 - k * 0.4);
    }
    // Volume-preserving-ish: widen as it squashes, narrow as it stretches.
    return { lift: lift + breath * 0.3, sqx: 1 + (1 - sqy) * 0.55, sqy };
  }

  private nextHopWait(): number {
    const s = this.hopStyle;
    return s.gap + Math.random() * s.jitter;
  }

  dispose(): void {
    this.tweener.clear();
    window.clearTimeout(this.moodTimer);
    this.el.remove();
    this.shadow.geometry.dispose();
    (this.shadow.material as THREE.Material).dispose();
    this.root.removeFromParent();
    this.shadow.removeFromParent();
  }
}
