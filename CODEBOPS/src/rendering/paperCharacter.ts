/**
 * PaperCharacter — a flat illustrated character on a camera-facing plane
 * living inside the dimensional world (paper-cutout style).
 *
 * TEMPORARY IMPLEMENTATION: uses the full-character reference art on a
 * single plane. Architecture allows later replacement with separated
 * layered SVG/PNG parts (eyes, arms, feet) for richer animation.
 */
import * as THREE from 'three';
import { contactShadowTexture } from './materials/toon';
import { Tweener } from './tween';

export interface PaperCharacterOptions {
  textureUrl: string;
  height: number;
  name: string;
}

export class PaperCharacter {
  readonly group = new THREE.Group();
  readonly carryAnchor = new THREE.Object3D();
  readonly tweener = new Tweener();
  private plane: THREE.Mesh | null = null;
  private baseY: number;
  private height: number;
  private idlePhase = Math.random() * Math.PI * 2;
  private calm = false;
  private ready: Promise<void>;

  constructor(opts: PaperCharacterOptions) {
    this.baseY = 0;
    this.height = opts.height;
    this.group.name = opts.name;

    // Soft contact shadow
    const shadow = new THREE.Mesh(
      new THREE.PlaneGeometry(1.3, 1.3),
      new THREE.MeshBasicMaterial({ map: contactShadowTexture(), transparent: true, depthWrite: false }),
    );
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = 0.02;
    shadow.renderOrder = 1;
    this.group.add(shadow);

    this.carryAnchor.position.set(-0.42, this.height * 0.62, 0.1);
    this.group.add(this.carryAnchor);

    this.ready = new Promise((resolve) => {
      new THREE.TextureLoader().load(opts.textureUrl, (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.anisotropy = 4;
        const aspect = tex.image.width / tex.image.height;
        const geo = new THREE.PlaneGeometry(this.height * aspect, this.height);
        const mat = new THREE.MeshBasicMaterial({
          map: tex, transparent: true, alphaTest: 0.05, side: THREE.DoubleSide,
        });
        this.plane = new THREE.Mesh(geo, mat);
        this.plane.position.y = this.height / 2;
        this.plane.castShadow = false;
        this.group.add(this.plane);
        resolve();
      });
    });
  }

  whenReady(): Promise<void> {
    return this.ready;
  }

  setCalm(calm: boolean): void {
    this.calm = calm;
  }

  placeAt(pos: THREE.Vector3): void {
    this.group.position.copy(pos);
    this.baseY = pos.y;
  }

  /** Hop along an arc to a new cell. */
  async hopTo(to: THREE.Vector3, duration = 0.34): Promise<void> {
    const from = this.group.position.clone();
    const jump = this.calm ? 0.08 : 0.42;
    await this.tweener.tween(duration, (k) => {
      this.group.position.lerpVectors(from, to, k);
      this.group.position.y = THREE.MathUtils.lerp(from.y, to.y, k) + Math.sin(k * Math.PI) * jump;
      const squash = this.calm ? 1 : 1 + Math.sin(k * Math.PI * 2) * 0.06;
      this.group.scale.set(2 - squash, squash, 1);
    }, 'inOut');
    this.baseY = to.y;
    this.group.scale.set(1, 1, 1);
  }

  /** Paper-flip turn. */
  async turnWiggle(): Promise<void> {
    if (this.calm) return;
    const plane = this.plane;
    if (!plane) return;
    await this.tweener.tween(0.22, (k) => {
      plane.rotation.y = Math.sin(k * Math.PI) * 0.9;
      const s = 1 + Math.sin(k * Math.PI) * 0.08;
      this.group.scale.set(s, s, 1);
    }, 'out');
    plane.rotation.y = 0;
    this.group.scale.set(1, 1, 1);
  }

  /** Bonk reaction for blocked movement. */
  async bumpShake(): Promise<void> {
    const x0 = this.group.position.x;
    const amp = this.calm ? 0.04 : 0.12;
    await this.tweener.tween(0.3, (k) => {
      this.group.position.x = x0 + Math.sin(k * Math.PI * 6) * amp * (1 - k);
    }, 'linear');
    this.group.position.x = x0;
  }

  /** Celebration hop + spin. */
  async celebrate(): Promise<void> {
    if (this.calm) {
      await this.tweener.tween(0.4, (k) => {
        const s = 1 + Math.sin(k * Math.PI) * 0.06;
        this.group.scale.set(s, s, 1);
      });
      this.group.scale.set(1, 1, 1);
      return;
    }
    const y0 = this.baseY;
    const plane = this.plane;
    await this.tweener.tween(0.9, (k) => {
      this.group.position.y = y0 + Math.abs(Math.sin(k * Math.PI * 2)) * 0.55;
      if (plane) plane.rotation.y = k * Math.PI * 4;
      const s = 1 + Math.sin(k * Math.PI * 4) * 0.07;
      this.group.scale.set(s, 2 - s, 1);
    }, 'out');
    if (plane) plane.rotation.y = 0;
    this.group.position.y = y0;
    this.group.scale.set(1, 1, 1);
  }

  /** Mixy's friendly glitch wobble. */
  async glitchWobble(duration = 0.8): Promise<void> {
    const plane = this.plane;
    const x0 = this.group.position.x;
    await this.tweener.tween(duration, () => {
      const jitter = this.calm ? 0.015 : 0.05;
      this.group.position.x = x0 + (Math.random() - 0.5) * jitter * 2;
      if (plane) {
        plane.rotation.z = (Math.random() - 0.5) * 0.12;
        const mat = plane.material as THREE.MeshBasicMaterial;
        mat.opacity = 0.75 + Math.random() * 0.25;
      }
    }, 'linear');
    this.group.position.x = x0;
    if (plane) {
      plane.rotation.z = 0;
      (plane.material as THREE.MeshBasicMaterial).opacity = 1;
    }
  }

  /** Idle bounce + gentle sway, driven by the stage tick. */
  update(dt: number, elapsed: number): void {
    this.tweener.update(dt);
    if (this.calm) return;
    const bob = Math.sin(elapsed * 2.4 + this.idlePhase) * 0.045;
    const sway = Math.sin(elapsed * 1.1 + this.idlePhase) * 0.02;
    if (this.plane) this.plane.rotation.z = sway;
    this.group.position.y = this.baseY + bob;
  }
}
