/**
 * Phase 17 rig — the Story Studio stage.
 *
 * A little actor on a spotlit stage. Its FACE (a big emoji) and BODY
 * COLOUR show the current STATE; every transition pops the actor with a
 * bounce and repaints the face. Rendering only — the state and the
 * transitions come from storyMachine.ts; the screen calls setState.
 */
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { toonMat } from '../materials/toon';

export class StoryRig {
  readonly group = new THREE.Group();
  private readonly actor: THREE.Group;
  private readonly bodyMat: THREE.MeshToonMaterial;
  private readonly faceCanvas: HTMLCanvasElement;
  private readonly faceCtx: CanvasRenderingContext2D;
  private readonly faceTex: THREE.CanvasTexture;
  private readonly spot: THREE.PointLight;
  private pop = 1;
  private t = 0;

  constructor() {
    // stage floor
    const stage = new THREE.Mesh(new THREE.CylinderGeometry(3.2, 3.6, 0.5, 40), toonMat('#3a2f6a'));
    stage.position.y = 0.25;
    stage.receiveShadow = true;
    this.group.add(stage);
    const rim = new THREE.Mesh(new THREE.TorusGeometry(3.2, 0.12, 12, 40), toonMat('#ffcf3e'));
    rim.rotation.x = Math.PI / 2;
    rim.position.y = 0.5;
    this.group.add(rim);

    // back curtains
    for (const side of [-1, 1]) {
      const curtain = new THREE.Mesh(new RoundedBoxGeometry(1.7, 6.4, 0.4, 3, 0.2), toonMat('#b32d4d'));
      curtain.position.set(side * 3.0, 3.7, -2.2);
      curtain.castShadow = true;
      this.group.add(curtain);
    }
    const valance = new THREE.Mesh(new RoundedBoxGeometry(7.6, 1.3, 0.4, 3, 0.2), toonMat('#e0453f'));
    valance.position.set(0, 6.4, -2.2);
    this.group.add(valance);

    // actor
    this.actor = new THREE.Group();
    this.actor.position.y = 0.5;
    this.bodyMat = toonMat('#6f7bd6');
    const body = new THREE.Mesh(new RoundedBoxGeometry(1.7, 1.7, 1.5, 5, 0.36), this.bodyMat);
    body.position.y = 1.15;
    body.castShadow = true;
    this.actor.add(body);
    for (const fx of [-0.5, 0.5]) {
      const foot = new THREE.Mesh(new RoundedBoxGeometry(0.6, 0.32, 0.8, 3, 0.14), toonMat('#2c2f5a'));
      foot.position.set(fx, 0.18, 0.2);
      foot.castShadow = true;
      this.actor.add(foot);
    }
    // antenna
    const stalk = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.5, 8), toonMat('#2c2f5a'));
    stalk.position.set(0, 2.3, 0);
    this.actor.add(stalk);
    const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.16, 12, 12), toonMat('#ffe14a'));
    bulb.position.set(0, 2.6, 0);
    this.actor.add(bulb);

    // face plane (canvas emoji)
    this.faceCanvas = document.createElement('canvas');
    this.faceCanvas.width = this.faceCanvas.height = 256;
    this.faceCtx = this.faceCanvas.getContext('2d')!;
    this.faceTex = new THREE.CanvasTexture(this.faceCanvas);
    this.faceTex.colorSpace = THREE.SRGBColorSpace;
    const face = new THREE.Mesh(
      new THREE.PlaneGeometry(1.3, 1.3),
      new THREE.MeshBasicMaterial({ map: this.faceTex, transparent: true }),
    );
    face.position.set(0, 1.25, 0.79);
    this.actor.add(face);
    this.group.add(this.actor);
    this.drawFace('😴');

    // spotlight
    this.spot = new THREE.PointLight(0xfff2c4, 1.4, 20, 2);
    this.spot.position.set(0, 6, 3);
    this.group.add(this.spot);
  }

  private drawFace(emoji: string): void {
    const ctx = this.faceCtx;
    ctx.clearRect(0, 0, 256, 256);
    ctx.font = '180px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(emoji, 128, 140);
    this.faceTex.needsUpdate = true;
  }

  setState(emoji: string, colorHex: string, pop = true): void {
    this.drawFace(emoji);
    this.bodyMat.color.set(colorHex);
    if (pop) this.pop = 0;
  }

  reset(emoji: string, colorHex: string): void {
    this.setState(emoji, colorHex, false);
    this.pop = 1;
  }

  update(dt: number): void {
    this.t += dt;
    if (this.pop < 1) this.pop = Math.min(1, this.pop + dt * 3.2);
    const e = this.pop;
    const bounce = e < 1 ? Math.sin(e * Math.PI) : 0;
    this.actor.position.y = 0.5 + bounce * 0.5 + Math.sin(this.t * 2) * 0.04;
    const squash = 1 + bounce * 0.15;
    this.actor.scale.set(2 - squash, squash, 2 - squash);
    this.actor.rotation.y = Math.sin(this.t * 1.4) * 0.06;
    this.spot.intensity = 1.4 + bounce * 0.8;
  }
}
