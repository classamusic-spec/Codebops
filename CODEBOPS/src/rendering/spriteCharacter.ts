/**
 * SpriteCharacter — Zip, Mixy and Bolt standing inside the 3D world.
 *
 * They used to be flat `<div>`s holding an inline SVG, floated over the
 * canvas by projecting a 3D anchor to screen coordinates every frame. That
 * looked passable and was wrong in ways a child can feel: the character
 * could never go behind a tree, never took the world's fog, never scaled
 * by real perspective (a px-per-unit approximation stood in for it), and
 * its face was animated by CSS classes toggled on paths that a heuristic
 * had *guessed* were eyes.
 *
 * Now each character is a real object in the scene, built by codebops-rig's
 * Three adapter: one textured plane per art layer, parented to the rig's
 * node hierarchy, at z = depth x 0.01. That last part is what makes this
 * genuinely dimensional rather than a picture on a card — when the head
 * yaws for a three-quarter turn, the near ear swings wide, the far ear
 * narrows and the face slides across the skull, because those layers are
 * actually at different depths.
 *
 * What is deliberately NOT 3D: the character faces the camera. The art is
 * a flat vector illustration and it stays one — no lighting, no tone
 * mapping, so the Zip in the world is pixel-for-pixel the Zip on the title
 * screen. The dimension comes from parallax, occlusion, fog and
 * perspective scale, not from pretending the drawing is a model.
 */
import * as THREE from 'three';
import { contactShadowTexture } from './materials/toon';
import { Tweener } from './tween';
import { makeRig } from './mascotRig';
import type { MascotName } from './mascotRig';
import type { ThreeCharacterView } from '../vendor/codebops-rig/three-adapter.js';
import type { CharacterRig } from '../vendor/codebops-rig/codebops-rig.js';

export type Mood = 'idle' | 'happy' | 'excited' | 'surprised' | 'thinking';
export type LookDir = 'left' | 'right' | 'up' | null;

export interface SpriteCharacterOptions {
  /** Which rig to build. Bolt is Zip in a different finish. */
  who: MascotName;
  /** Character height in world units. */
  height: number;
  name: string;
  /** Tint multiplied over the art — Bolt's steel-green finish. */
  tint?: string;
}

/** The adapter's art-unit scale: 1024 art units span 10.24 world units. */
const ART_SCALE = 0.01;

/**
 * The adapter takes the Three namespace as an argument rather than
 * importing it, so it works with whatever copy the host app has. Handing
 * it `import * as THREE` would work — and would cost 168KB, because a
 * bundler that sees the whole namespace object escape into a function call
 * can no longer prove which exports are unused and has to keep all of
 * them. So it gets exactly the eight symbols it touches.
 *
 * A test walks the adapter's source for `THREE.x` and fails if this list
 * has fallen behind it, which is the only way a rig update could break
 * this quietly.
 */
const THREE_FOR_ADAPTER = {
  Object3D: THREE.Object3D,
  Mesh: THREE.Mesh,
  PlaneGeometry: THREE.PlaneGeometry,
  MeshBasicMaterial: THREE.MeshBasicMaterial,
  CanvasTexture: THREE.CanvasTexture,
  SRGBColorSpace: THREE.SRGBColorSpace,
  LinearMipmapLinearFilter: THREE.LinearMipmapLinearFilter,
  LinearFilter: THREE.LinearFilter,
} as unknown as typeof THREE;

/**
 * Moods map onto the rig's clips. `excited` and `happy` share the happy
 * clip but not the face, so a celebration reads bigger than a smile.
 */
const MOOD_FACE = {
  idle: 'neutral', happy: 'happy', excited: 'happy',
  surprised: 'surprised', thinking: 'thinking',
} as const;

const UP = new THREE.Vector3(0, 1, 0);
// Scratch objects reused every frame (avoids per-frame GC churn).
const SCRATCH_A = new THREE.Vector3();
const SCRATCH_B = new THREE.Vector3();
const SCRATCH_FWD = new THREE.Vector3();

export class SpriteCharacter {
  readonly root = new THREE.Group();
  readonly carryAnchor = new THREE.Object3D();
  readonly tweener = new Tweener();
  /**
   * Screen-space anchor for the name chip. The character itself is in the
   * scene now; this element exists only so a DOM label can ride along with
   * it, which is the one thing the 3D scene cannot do well (crisp text at
   * any distance, selectable by a screen reader).
   */
  readonly el: HTMLDivElement;

  /** Faces the camera; everything the rig draws hangs under it. */
  private readonly billboard = new THREE.Group();
  private readonly shadow: THREE.Mesh;
  private rig: CharacterRig | null = null;
  private view: ThreeCharacterView | null = null;
  private disposed = false;
  private calm = false;
  private bobPhase = Math.random() * Math.PI * 2;
  /**
   * Seconds of animation still owed. In calm mode the rig is only stepped
   * while this is positive, which is what turns "damped" into "still":
   * the character holds a pose until something actually happens to it,
   * then plays that change through and settles again. Outside calm mode
   * it is ignored and the rig runs every frame.
   */
  private settle = 0;
  private lookClock = 5 + Math.random() * 4;
  /** Art-box width / height, so the label anchor matches the silhouette. */
  private aspect = 1;
  private readonly ready: Promise<void>;

  constructor(
    private readonly opts: SpriteCharacterOptions,
    layer: HTMLElement,
    private readonly camera: THREE.PerspectiveCamera,
    private readonly viewport: HTMLElement,
  ) {
    this.root.name = opts.name;
    this.root.add(this.billboard);

    this.shadow = new THREE.Mesh(
      new THREE.PlaneGeometry(1.25, 1.25),
      new THREE.MeshBasicMaterial({ map: contactShadowTexture(), transparent: true, depthWrite: false }),
    );
    this.shadow.rotation.x = -Math.PI / 2;
    this.shadow.renderOrder = 1;

    this.carryAnchor.position.set(-0.4, opts.height * 0.55, 0.12);
    this.root.add(this.carryAnchor);

    this.el = document.createElement('div');
    this.el.className = 'char-label';
    this.el.dataset.bop = opts.name;
    this.el.setAttribute('aria-hidden', 'true');
    layer.appendChild(this.el);

    this.ready = this.build();
  }

  private async build(): Promise<void> {
    let rig: CharacterRig;
    let attachThree: typeof import('../vendor/codebops-rig/three-adapter.js').attachThree;
    try {
      // renderer 'none': nothing draws to a 2D canvas. The stage's own loop
      // drives update(), and the adapter turns the pose into scene graph.
      // The adapter is imported here rather than at the top of the file so
      // that pulling it in does not drag the rig engine into the main
      // bundle — the whole point of loading the rig on demand.
      [rig, { attachThree }] = await Promise.all([
        makeRig(this.opts.who, { renderer: 'none', autoBlink: true }),
        import('../vendor/codebops-rig/three-adapter.js'),
      ]);
    } catch (err) {
      // The world is still playable without a face on it. Everything that
      // moves the character moves this.root, which exists regardless.
      console.warn(`[CodeBops] ${this.opts.name}'s rig failed to load.`, err);
      return;
    }
    if (this.disposed) { rig.destroy(); return; }
    rig.setReducedMotion(this.calm);
    rig.setAutoBlink(!this.calm);

    const view = attachThree(THREE_FOR_ADAPTER, rig);
    this.fitToHeight(view, rig);
    this.dressMaterials(view);
    this.billboard.add(view.root);
    this.rig = rig;
    this.view = view;
    view.sync();
  }

  /**
   * Scale and seat the rig so the character is `height` world units tall
   * and standing ON the ground rather than centred in the air.
   *
   * The art box is measured from the rasters actually built, not assumed
   * from the 1024 artboard: the bops occupy about two thirds of it, so
   * scaling by the artboard would make every character a third too small.
   * Effects layers are excluded — a sparkle burst must not shrink him.
   */
  private fitToHeight(view: ThreeCharacterView, rig: CharacterRig): void {
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const layer of rig.character.layers) {
      if (layer.group === 'effects' || layer.group === 'glitch') continue;
      const r = rig.rasters?.[layer.id];
      if (!r) continue;
      minX = Math.min(minX, r.box.x); maxX = Math.max(maxX, r.box.x + r.box.w);
      minY = Math.min(minY, r.box.y); maxY = Math.max(maxY, r.box.y + r.box.h);
    }
    if (!Number.isFinite(minY) || maxY <= minY) return;   // nothing rasterised

    this.aspect = (maxX - minX) / (maxY - minY);
    const scale = this.opts.height / ((maxY - minY) * ART_SCALE);
    view.root.scale.setScalar(scale);
    // The adapter maps art (ax, ay) to world ((ax - 512) * S, (512 - ay) * S).
    // Put the art box's bottom-centre on the group's origin, which is the
    // point placeAt() drops on the ground.
    const centreX = ((minX + maxX) / 2 - 512) * ART_SCALE;
    const bottomY = (512 - maxY) * ART_SCALE;
    view.root.position.set(-centreX * scale, -bottomY * scale, 0);
  }

  /**
   * The adapter draws with depth testing OFF so its own layers can never
   * z-fight. That also means nothing in the world could ever cover the
   * character. Testing is switched back on — the layers keep their painter
   * order through renderOrder and depthWrite stays off, so they still
   * composite exactly, but now a tree in front of Zip is in front of Zip.
   */
  private dressMaterials(view: ThreeCharacterView): void {
    const tint = this.opts.tint ? new THREE.Color(this.opts.tint) : null;
    for (const id of Object.keys(view.meshes)) {
      const mat = view.meshes[id].material as THREE.MeshBasicMaterial;
      mat.depthTest = true;
      // Distance haze applies, so a character far up the board sits in the
      // same air as the scenery around it.
      mat.fog = true;
      if (tint) mat.color.copy(tint);
      mat.needsUpdate = true;
    }
  }

  whenReady(): Promise<void> {
    return this.ready;
  }

  addToScene(scene: THREE.Scene): void {
    scene.add(this.root);
    scene.add(this.shadow);
  }

  /** Something changed: let the rig animate it through, even in calm mode. */
  private touch(seconds = 1.2): void {
    this.settle = Math.max(this.settle, seconds);
  }

  setCalm(calm: boolean): void {
    this.calm = calm;
    this.touch();
    // The rig's own reduced motion damps locomotion and keeps expression,
    // which is the right shape. Two things it deliberately keeps are the
    // twitchiest motions on screen — the blink schedule and the idle eye
    // saccades — so calm mode stops those as well and leaves a character
    // that still smiles, frowns and looks surprised when something
    // happens, but never fidgets. Pausing the rig outright is not an
    // option: with the clock stopped a face change never finishes its
    // blend, and the expression would freeze along with everything else.
    this.rig?.setReducedMotion(calm);
    this.rig?.setAutoBlink(!calm);
    if (calm) { this.rig?.look(0, 0); this.rig?.setTurn(0); }
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
    const rig = this.rig;
    if (!rig) return;
    this.touch(2.0);
    rig.setFace(MOOD_FACE[mood]);
    if (mood === 'thinking') rig.play('thinking');
    else if (mood === 'surprised') rig.play('surprised');
    else if (mood === 'excited') rig.play('happy', { restart: true });
    else if (mood === 'idle') rig.play('idle');
  }

  /**
   * A glance. The rig moves the eyes AND turns the head — the turn is what
   * the old CSS could not do, and it is why a bop facing its direction of
   * travel now reads as facing it rather than squinting that way.
   */
  look(dir: LookDir): void {
    const rig = this.rig;
    if (!rig) return;
    this.touch();
    const x = dir === 'left' ? -1 : dir === 'right' ? 1 : 0;
    rig.look(x, dir === 'up' ? -0.8 : 0);
    rig.setTurn(this.calm ? 0 : x * 0.85);
  }

  wave(times = 3): void {
    if (this.calm) return;
    // The happy clip is a squash and two hops — the rig's own celebration.
    this.touch(2.2);
    this.rig?.play('happy', { restart: true });
    void times;
  }

  // ---------- moves ----------

  async hopTo(to: THREE.Vector3, duration = 0.34): Promise<void> {
    const from = this.root.position.clone();
    const jump = this.calm ? 0.06 : 0.4;
    // The clip supplies the air tilt and the landing squash; the tween
    // supplies the travel. Together they read as one jump.
    this.touch(duration + 1.4);
    if (!this.calm) this.rig?.play('hop', { restart: true });
    await this.tweener.tween(duration, (k) => {
      this.root.position.lerpVectors(from, to, k);
      this.root.position.y = THREE.MathUtils.lerp(from.y, to.y, k) + Math.sin(k * Math.PI) * jump;
      this.syncShadow();
    }, 'inOut');
  }

  async bumpShake(): Promise<void> {
    this.flashMood('surprised', 900);
    this.touch(1.8);
    this.rig?.play('surprised', { restart: true });
    await new Promise((r) => setTimeout(r, 320));
  }

  async turnWiggle(): Promise<void> {
    if (this.calm) return;
    const rig = this.rig;
    if (!rig) return;
    this.touch(1.0);
    // A look right, then left, then back: the head genuinely turns, so the
    // layers slide past each other and it reads as a shake of the head.
    rig.setTurn(0.9);
    await new Promise((r) => setTimeout(r, 110));
    rig.setTurn(-0.9);
    await new Promise((r) => setTimeout(r, 130));
    rig.setTurn(0);
    await new Promise((r) => setTimeout(r, 60));
  }

  async celebrate(): Promise<void> {
    this.setMood('excited');
    await new Promise((r) => setTimeout(r, this.calm ? 400 : 1600));
    this.setMood('idle');
  }

  async glitchWobble(duration = 0.8): Promise<void> {
    // Mixy has real corruption clips — channel split, chip scatter, a
    // scanline band. Zip has none, and shouldn't: he does not glitch.
    const rig = this.rig;
    this.touch(duration + 1.2);
    if (rig?.animations.includes('glitch')) rig.play('glitch', { restart: true });
    await new Promise((r) => setTimeout(r, duration * 1000));
    rig?.play('idle');
  }

  private moodTimer = 0;
  flashMood(mood: Mood, ms: number): void {
    this.setMood(mood);
    window.clearTimeout(this.moodTimer);
    this.moodTimer = window.setTimeout(() => this.setMood('idle'), ms);
  }

  /**
   * Per-frame: advance the rig, face the camera, and drag the name chip
   * along to wherever the character ended up on screen.
   */
  update(dt: number, elapsed: number): void {
    this.tweener.update(dt);

    // Occasional glances, so a resting bop is never a statue. Calm mode
    // is exactly the case where a statue is what was asked for.
    if (!this.calm) this.lookClock -= dt;
    if (this.lookClock <= 0 && !this.calm) {
      const dirs: LookDir[] = ['left', 'right', null, 'up'];
      this.look(dirs[Math.floor(Math.random() * dirs.length)]);
      this.lookClock = 4 + Math.random() * 5;
    }

    if (this.rig && this.view) {
      if (this.settle > 0) this.settle -= dt;
      // Calm mode steps the rig only while a change is still playing out.
      // Damping alone left the idle float, the breath and the ear sway
      // running, which measured as much motion with the setting on as
      // with it off.
      if (!this.calm || this.settle > 0) {
        // Clamp exactly as the rig's own loop does. This is not belt and
        // braces: the ear and crest springs are stiff and integrated
        // explicitly, so ONE long frame — a level opening while textures
        // upload, a tab coming back — is enough to make them diverge, and
        // they never recover. Left unclamped it put Zip's ear rotation at
        // -649618 radians and hid both ears inside his head.
        this.rig.update(Math.min(0.05, dt > 0 ? dt : 0));
        this.view.sync();
      }
      // Face the camera. The art is a flat illustration; turning it edge-on
      // would only ever show it disappearing.
      this.billboard.quaternion.copy(this.camera.quaternion);
      // ...and stand a hair proud of the ground, so the bottom row of
      // pixels never z-fights with the tile the character is standing on.
      this.camera.getWorldDirection(SCRATCH_FWD);
      this.billboard.position.copy(SCRATCH_FWD).multiplyScalar(-0.05);
      // A slow breath on the whole body. The rig breathes the head; this is
      // the shift of weight underneath it, and calm mode stills it.
      this.billboard.position.y += this.calm ? 0
        : Math.sin(elapsed * 2.2 + this.bobPhase) * this.opts.height * 0.012;
    }

    this.syncLabel();
  }

  /**
   * Track the character's screen box with the label anchor.
   *
   * The anchor is empty and invisible, and it is kept the size of the
   * character on purpose: a name chip positions itself against it (bottom
   * centre, just below the feet), and it is the only handle a test has on
   * where a character actually ended up on screen now that the character
   * is pixels in a WebGL canvas rather than an element.
   */
  private syncLabel(): void {
    const w = this.viewport.clientWidth;
    const h = this.viewport.clientHeight;
    if (w === 0 || h === 0) return;

    const p = SCRATCH_A.copy(this.root.position).project(this.camera);
    if (p.z > 1) { this.el.style.visibility = 'hidden'; return; }
    this.el.style.visibility = 'visible';
    const p2 = SCRATCH_B.copy(this.root.position).add(UP).project(this.camera);
    const sx = (p.x * 0.5 + 0.5) * w;
    const sy = (-p.y * 0.5 + 0.5) * h;
    const sy2 = (-p2.y * 0.5 + 0.5) * h;
    const pxPerUnit = Math.max(1, Math.abs(sy - sy2));
    const pxH = pxPerUnit * this.opts.height;
    this.el.style.width = `${(pxH * this.aspect).toFixed(1)}px`;
    this.el.style.height = `${pxH.toFixed(1)}px`;
    // Bottom-centre on the character's feet, which is where the old
    // sprite element sat and therefore where the chip expects to be.
    this.el.style.transform =
      `translate(${sx.toFixed(1)}px, ${sy.toFixed(1)}px) translate(-50%, -100%)`;
  }

  dispose(): void {
    this.disposed = true;
    this.tweener.clear();
    window.clearTimeout(this.moodTimer);
    this.el.remove();
    this.view?.dispose();
    this.view = null;
    this.rig?.destroy();
    this.rig = null;
    this.shadow.geometry.dispose();
    (this.shadow.material as THREE.Material).dispose();
    this.root.removeFromParent();
    this.shadow.removeFromParent();
  }
}
