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

export function loadSvg(url: string): Promise<string> {
  let p = svgCache.get(url);
  if (!p) {
    p = fetch(url).then((r) => {
      if (!r.ok) throw new Error(`[CodeBops] Failed to load ${url}`);
      return r.text();
    });
    svgCache.set(url, p);
  }
  return p;
}

/** Inline an SVG into a DOM container (shared with title/select screens). */
export async function inlineSvgInto(container: HTMLElement, url: string): Promise<SVGSVGElement | null> {
  const text = await loadSvg(url);
  container.innerHTML = text;
  return container.querySelector('svg');
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

export class SpriteCharacter {
  readonly root = new THREE.Group();
  readonly carryAnchor = new THREE.Object3D();
  readonly tweener = new Tweener();
  readonly el: HTMLDivElement;
  private shadow: THREE.Mesh;
  private svg: SVGSVGElement | null = null;
  private bobPhase = Math.random() * Math.PI * 2;
  private calm = false;
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

  private blink(): void {
    const s = this.svg;
    if (!s || this.calm) return;
    s.classList.add('blink');
    window.setTimeout(() => s.classList.remove('blink'), 150);
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

    const p = this.root.position.clone().project(this.camera);
    const p2 = this.root.position.clone().add(UP).project(this.camera);
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
    const bob = this.calm ? 0 : Math.sin(elapsed * 2.4 + this.bobPhase) * pxH * 0.022;
    this.el.style.transform = `translate(${sx.toFixed(1)}px, ${(sy + bob).toFixed(1)}px) translate(-50%, -100%)`;
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
