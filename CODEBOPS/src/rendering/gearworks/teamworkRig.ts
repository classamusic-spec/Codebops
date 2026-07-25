/**
 * TeamworkRig — Phase 10. Two machines side by side: the PACKER (left)
 * fills a crate with a gift, the MAILER (right) ships it to a delivery
 * shelf. A signal "radio wave" arcs from the Packer's antenna to the
 * Mailer's when a message is sent — the dependency made visible — and
 * the Mailer's antenna lamp pulses amber while it WAITS.
 *
 * Rendering only — truth lives in gameplay/gearworks/signalMachine.ts.
 */
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { toonMat } from '../materials/toon';

function mesh(geo: THREE.BufferGeometry, mat: THREE.Material, x = 0, y = 0, z = 0, cast = true, receive = true): THREE.Mesh {
  const m = new THREE.Mesh(geo, mat);
  m.position.set(x, y, z);
  m.castShadow = cast;
  m.receiveShadow = receive;
  return m;
}

function makeGift(scale = 1): THREE.Group {
  const g = new THREE.Group();
  g.add(mesh(new RoundedBoxGeometry(0.5, 0.5, 0.5, 2, 0.08), toonMat('#e8384f'), 0, 0, 0));
  g.add(mesh(new RoundedBoxGeometry(0.54, 0.12, 0.54, 1, 0.04), toonMat('#ffd23e'), 0, 0, 0, false, false));
  g.add(mesh(new RoundedBoxGeometry(0.12, 0.54, 0.54, 1, 0.04), toonMat('#ffd23e'), 0, 0, 0, false, false));
  g.add(mesh(new THREE.TorusGeometry(0.12, 0.05, 6, 12), toonMat('#ffd23e'), 0, 0.3, 0, false, false));
  g.scale.setScalar(scale);
  return g;
}

const PACK_X = -3.2;
const MAIL_X = 2.6;
const CRATE_Y = 1.15;

export class TeamworkRig {
  readonly group = new THREE.Group();
  private readonly crate: THREE.Group;
  private readonly crateGift: THREE.Group;
  private readonly heldGift: THREE.Group;
  private readonly shelf: THREE.Group;
  private readonly packLamp: THREE.Mesh;
  private readonly mailLamp: THREE.Mesh;
  private readonly wave: THREE.Group;
  private waveT = 0;
  private waitPulse = false;
  private cratePhase: 'idle' | 'toMailer' | 'toShelf' = 'idle';
  private crateT = 0;
  private delivered = 0;

  constructor() {
    this.group.name = 'teamwork-rig';
    this.group.add(mesh(new RoundedBoxGeometry(10.6, 0.3, 2.8, 2, 0.1), toonMat('#1b2664'), 0, 0.15, 0.1));

    // ---- Packer machine (left) ----
    const packer = this.machineBlock('#2f6fe0', '#4a8cf0');
    packer.position.set(PACK_X - 1.0, 0.3, -0.4);
    this.group.add(packer);
    this.packLamp = packer.getObjectByName('lamp') as THREE.Mesh;
    // held gift (pops up when fetched)
    this.heldGift = makeGift(0.8);
    this.heldGift.position.set(PACK_X - 1.0, 2.3, 0.2);
    this.heldGift.visible = false;
    this.group.add(this.heldGift);

    // ---- Mailer machine (right) ----
    const mailer = this.machineBlock('#8b4ddb', '#a06bff');
    mailer.position.set(MAIL_X + 1.2, 0.3, -0.4);
    this.group.add(mailer);
    this.mailLamp = mailer.getObjectByName('lamp') as THREE.Mesh;

    // ---- crate on a little track between them ----
    this.group.add(mesh(new RoundedBoxGeometry(6.0, 0.16, 1.1, 1, 0.05), toonMat('#39406e'), -0.3, 0.85, 0.1, false, true));
    this.crate = new THREE.Group();
    this.crate.add(mesh(new RoundedBoxGeometry(0.95, 0.7, 0.85, 2, 0.08), toonMat('#c9843c'), 0, 0.35, 0));
    this.crate.add(mesh(new RoundedBoxGeometry(1.0, 0.14, 0.9, 1, 0.05), toonMat('#a86a2c'), 0, 0.7, 0, false, false));
    this.crateGift = makeGift(0.62);
    this.crateGift.position.set(0, 0.55, 0);
    this.crateGift.visible = false;
    this.crate.add(this.crateGift);
    this.crate.position.set(PACK_X + 0.4, CRATE_Y, 0.1);
    this.group.add(this.crate);

    // ---- delivery shelf (far right) ----
    this.group.add(mesh(new RoundedBoxGeometry(2.2, 0.24, 1.2, 1, 0.06), toonMat('#d9a45c'), 4.4, 0.9, 0.2));
    this.shelf = new THREE.Group();
    this.shelf.position.set(4.4, 1.05, 0.2);
    this.group.add(this.shelf);

    // ---- signal wave (packer antenna → mailer antenna) ----
    this.wave = new THREE.Group();
    for (let i = 0; i < 3; i++) {
      const ring = mesh(
        new THREE.TorusGeometry(0.3 + i * 0.18, 0.05, 6, 16, Math.PI),
        new THREE.MeshToonMaterial({ color: '#7dee8e', emissive: '#3ed35f', emissiveIntensity: 0.8, transparent: true, opacity: 0 }),
        0, 0, 0, false, false,
      );
      ring.rotation.z = -Math.PI / 2;
      this.wave.add(ring);
    }
    this.wave.position.set(PACK_X - 0.4, 3.3, 0.2);
    this.group.add(this.wave);
  }

  private machineBlock(body: string, top: string): THREE.Group {
    const g = new THREE.Group();
    g.add(mesh(new RoundedBoxGeometry(1.8, 1.7, 1.4, 3, 0.22), toonMat(body), 0, 1.05, 0));
    g.add(mesh(new THREE.CylinderGeometry(0.5, 0.56, 0.4, 16), toonMat(top), 0, 2.0, 0, true, false));
    // antenna + lamp
    g.add(mesh(new THREE.CylinderGeometry(0.06, 0.06, 1.1, 8), toonMat('#aab3c8'), 0.5, 2.6, 0.2, false, false));
    const lamp = mesh(new THREE.SphereGeometry(0.2, 12, 10), new THREE.MeshToonMaterial({ color: '#8a94ad', emissive: '#000000', emissiveIntensity: 0 }), 0.5, 3.2, 0.2, false, false);
    lamp.name = 'lamp';
    g.add(lamp);
    return g;
  }

  fetch(): void {
    this.heldGift.visible = true;
    this.heldGift.position.y = 2.3;
    this.setLamp(this.packLamp, '#7dee8e');
  }

  pack(): void {
    this.heldGift.visible = false;
    this.crateGift.visible = true;
    this.setLamp(this.packLamp, '#7dee8e');
  }

  signalWave(): void {
    this.waveT = 1;
    this.setLamp(this.packLamp, '#7dee8e');
  }

  setWaiting(on: boolean): void {
    this.waitPulse = on;
    if (!on) this.setLamp(this.mailLamp, '#8a94ad');
  }

  signalReceived(): void {
    this.waitPulse = false;
    this.setLamp(this.mailLamp, '#7dee8e');
  }

  /** The crate rolls to the mailer, then a gift lands on the shelf. */
  deliver(): void {
    this.cratePhase = 'toMailer';
    this.crateT = 0;
  }

  emptyShip(): void {
    // crate jiggles and nothing comes out
    this.cratePhase = 'toMailer';
    this.crateT = 0;
    this.crateGift.visible = false;
  }

  reset(): void {
    this.heldGift.visible = false;
    this.crateGift.visible = false;
    this.crate.position.set(PACK_X + 0.4, CRATE_Y, 0.1);
    this.cratePhase = 'idle';
    this.crateT = 0;
    this.waveT = 0;
    this.waitPulse = false;
    this.delivered = 0;
    this.shelf.clear();
    this.setLamp(this.packLamp, '#8a94ad');
    this.setLamp(this.mailLamp, '#8a94ad');
  }

  private setLamp(lamp: THREE.Mesh, color: string): void {
    const m = lamp.material as THREE.MeshToonMaterial;
    if (color === '#8a94ad') { m.color.set(color); m.emissive.set('#000000'); m.emissiveIntensity = 0; }
    else { m.color.set(color); m.emissive.set(color === '#7dee8e' ? '#3ed35f' : '#c99a20'); m.emissiveIntensity = 1; }
  }

  update(dt: number, elapsed: number): void {
    // signal wave travels + fades
    if (this.waveT > 0) {
      this.waveT = Math.max(0, this.waveT - dt * 1.3);
      const p = 1 - this.waveT;
      this.wave.position.x = (PACK_X - 0.4) + (MAIL_X + 1.7 - (PACK_X - 0.4)) * p;
      for (const r of this.wave.children) {
        const mat = (r as THREE.Mesh).material as THREE.MeshToonMaterial | undefined;
        if (mat) mat.opacity = Math.sin(this.waveT * Math.PI);
      }
    } else {
      for (const r of this.wave.children) (((r as THREE.Mesh).material) as THREE.MeshToonMaterial).opacity = 0;
    }
    // waiting lamp pulse
    if (this.waitPulse) {
      const m = this.mailLamp.material as THREE.MeshToonMaterial;
      m.color.set('#ffd97a'); m.emissive.set('#c99a20');
      m.emissiveIntensity = 0.5 + Math.abs(Math.sin(elapsed * 6)) * 0.9;
    }
    // crate transit
    if (this.cratePhase === 'toMailer') {
      this.crateT = Math.min(1, this.crateT + dt * 1.5);
      this.crate.position.x = (PACK_X + 0.4) + (MAIL_X - (PACK_X + 0.4)) * this.crateT;
      if (this.crateT >= 1) {
        if (this.crateGift.visible) { this.cratePhase = 'toShelf'; this.crateT = 0; }
        else { this.cratePhase = 'idle'; window.setTimeout(() => { this.crate.position.x = PACK_X + 0.4; }, 200); }
      }
    } else if (this.cratePhase === 'toShelf') {
      this.crateT = Math.min(1, this.crateT + dt * 2.4);
      const t = this.crateT;
      // fling the gift onto the shelf
      if (t >= 1) {
        this.crateGift.visible = false;
        const kept = makeGift(0.7);
        const n = this.delivered;
        kept.position.set(-0.6 + n * 0.7, 0.35, 0);
        this.shelf.add(kept);
        this.delivered++;
        this.cratePhase = 'idle';
        this.crate.position.x = PACK_X + 0.4;
      } else {
        this.crateGift.position.set(0, 0.55 + Math.sin(t * Math.PI) * 1.2, 0);
      }
    }
  }
}
