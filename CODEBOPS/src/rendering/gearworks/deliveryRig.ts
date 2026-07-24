/**
 * Phase 15 rig — the Delivery Depot.
 *
 * A row of houses (each numbered, with a mailbox slot that lights when a
 * parcel lands), a LINE of parcels waiting their turn, and a little truck
 * that drives between the houses carrying one parcel at a time. The queue
 * is drawn as a literal line so "first in, first out" is visible: LOAD
 * always lifts the parcel at the front.
 *
 * Rendering only — the truth (who's next, where each parcel belongs)
 * lives in deliveryMachine.ts; the screen calls loadFront / deliverAt /
 * driveTo as the program runs.
 */
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { toonMat } from '../materials/toon';

const HOUSE_GAP = 3.0;
const PARCEL_COLORS = ['#ff7a4d', '#ffcf3e', '#7ad0ff', '#c79bff', '#8be04a'];

function emojiTexture(emoji: string, bg: string): THREE.CanvasTexture {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const ctx = c.getContext('2d')!;
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, 128, 128);
  ctx.font = '82px system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(emoji, 64, 72);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function numberTexture(n: number): THREE.CanvasTexture {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const ctx = c.getContext('2d')!;
  ctx.fillStyle = '#fff6e3';
  ctx.fillRect(0, 0, 128, 128);
  ctx.fillStyle = '#16225c';
  ctx.font = '800 84px system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(String(n), 64, 70);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

interface House {
  readonly slot: THREE.Mesh;
  readonly slotMat: THREE.MeshToonMaterial;
  readonly x: number;
}

interface Parcel {
  readonly group: THREE.Group;
  delivered: boolean;
}

export class DeliveryRig {
  readonly group = new THREE.Group();
  private readonly houses: House[] = [];
  private readonly parcels: Parcel[] = [];
  private readonly truck: THREE.Group;
  private truckX = 0;
  private truckTargetX = 0;
  private held: Parcel | null = null;
  private readonly queueBaseX: number;
  private readonly queueZ = 2.4;
  private t = 0;

  constructor(
    houseCount: number,
    queue: ReadonlyArray<{ emoji: string; dest: number }>,
  ) {
    const x0 = -((houseCount - 1) * HOUSE_GAP) / 2;

    // ground strip / road
    const road = new THREE.Mesh(new RoundedBoxGeometry(houseCount * HOUSE_GAP + 3, 0.3, 2.2, 3, 0.1), toonMat('#3a3f66'));
    road.position.set(0, 0.15, 0);
    road.receiveShadow = true;
    this.group.add(road);

    // houses
    for (let i = 0; i < houseCount; i++) {
      const x = x0 + i * HOUSE_GAP;
      const g = new THREE.Group();
      g.position.set(x, 0, -1.4);

      const body = new THREE.Mesh(new RoundedBoxGeometry(1.9, 1.7, 1.6, 4, 0.14), toonMat('#f2efe6'));
      body.position.y = 1.15;
      body.castShadow = true; body.receiveShadow = true;
      g.add(body);

      const roof = new THREE.Mesh(new THREE.ConeGeometry(1.55, 1.0, 4), toonMat(PARCEL_COLORS[i % PARCEL_COLORS.length]));
      roof.position.y = 2.5;
      roof.rotation.y = Math.PI / 4;
      roof.castShadow = true;
      g.add(roof);

      // number plate
      const plate = new THREE.Mesh(
        new THREE.PlaneGeometry(0.7, 0.7),
        new THREE.MeshBasicMaterial({ map: numberTexture(i + 1) }),
      );
      plate.position.set(0, 1.4, 0.81);
      g.add(plate);

      // mailbox slot (lights when a parcel lands)
      const slotMat = toonMat('#2a2f52');
      const slot = new THREE.Mesh(new RoundedBoxGeometry(0.9, 0.5, 0.3, 3, 0.08), slotMat);
      slot.position.set(0, 0.55, 0.9);
      g.add(slot);

      this.group.add(g);
      this.houses.push({ slot, slotMat, x });
    }

    // parcels waiting in line (front of line nearest the first house)
    this.queueBaseX = x0 - 1.6;
    queue.forEach((q, i) => {
      const g = new THREE.Group();
      const color = PARCEL_COLORS[i % PARCEL_COLORS.length];
      const box = new THREE.Mesh(new RoundedBoxGeometry(0.9, 0.9, 0.9, 3, 0.1), toonMat(color));
      box.castShadow = true;
      g.add(box);
      // emoji face on top
      const face = new THREE.Mesh(
        new THREE.PlaneGeometry(0.7, 0.7),
        new THREE.MeshBasicMaterial({ map: emojiTexture(q.emoji, color) }),
      );
      face.rotation.x = -Math.PI / 2;
      face.position.y = 0.46;
      g.add(face);
      // ribbon
      const ribbon = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.92, 0.92), toonMat('#ffffff'));
      g.add(ribbon);
      this.group.add(g);
      this.parcels.push({ group: g, delivered: false });
    });

    // truck
    this.truck = new THREE.Group();
    const cab = new THREE.Mesh(new RoundedBoxGeometry(1.0, 0.9, 1.3, 3, 0.12), toonMat('#ff5a6a'));
    cab.position.set(-0.7, 0.85, 0);
    cab.castShadow = true;
    this.truck.add(cab);
    const bed = new THREE.Mesh(new RoundedBoxGeometry(1.5, 0.5, 1.4, 3, 0.1), toonMat('#c53a49'));
    bed.position.set(0.6, 0.6, 0);
    bed.castShadow = true;
    this.truck.add(bed);
    for (const wx of [-0.8, 0.2, 0.9]) {
      const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.25, 16), toonMat('#22263f'));
      wheel.rotation.x = Math.PI / 2;
      wheel.position.set(wx, 0.3, 0.72);
      this.truck.add(wheel);
      const wheel2 = wheel.clone();
      wheel2.position.z = -0.72;
      this.truck.add(wheel2);
    }
    this.truck.position.set(x0, 0, 0);
    this.truckX = this.truckTargetX = x0;
    this.group.add(this.truck);

    this.layoutQueue();
  }

  /** Line the waiting parcels up behind the depot. */
  private layoutQueue(): void {
    let slot = 0;
    for (const p of this.parcels) {
      if (p.delivered || p === this.held) continue;
      p.group.position.set(this.queueBaseX - slot * 1.1, 0.55, this.queueZ);
      slot++;
    }
  }

  /** Lift the front waiting parcel onto the truck bed. */
  loadFront(): void {
    const p = this.parcels.find((q) => !q.delivered && q !== this.held);
    if (!p) return;
    this.held = p;
    this.layoutQueue();
  }

  /** Drop the held parcel at a house; light its slot green/red. */
  deliverAt(houseIndex: number, correct: boolean): void {
    const house = this.houses[houseIndex];
    if (this.held && house) {
      this.held.delivered = true;
      this.held.group.position.set(house.x, 0.55, 0.7);
      house.slotMat.color.set(correct ? '#8be04a' : '#ff5a6a');
      house.slotMat.emissive = new THREE.Color(correct ? '#2e5a1a' : '#5a1a1a');
    }
    this.held = null;
  }

  /** Send the truck to a house index (eased in update). */
  driveTo(houseIndex: number): void {
    const house = this.houses[Math.max(0, Math.min(this.houses.length - 1, houseIndex))];
    if (house) this.truckTargetX = house.x;
  }

  reset(): void {
    this.held = null;
    for (const p of this.parcels) p.delivered = false;
    for (const h of this.houses) { h.slotMat.color.set('#2a2f52'); h.slotMat.emissive = new THREE.Color('#000000'); }
    this.truckTargetX = this.houses[0]?.x ?? 0;
    this.truckX = this.truckTargetX;
    this.truck.position.x = this.truckX;
    this.layoutQueue();
  }

  update(dt: number): void {
    this.t += dt;
    // ease the truck toward its target house
    this.truckX += (this.truckTargetX - this.truckX) * Math.min(1, dt * 5);
    this.truck.position.x = this.truckX;
    this.truck.position.y = Math.abs(this.truckTargetX - this.truckX) > 0.02 ? Math.sin(this.t * 20) * 0.03 : 0;

    // the held parcel rides on the truck bed
    if (this.held) {
      this.held.group.position.set(this.truckX + 0.6, 1.1 + Math.sin(this.t * 6) * 0.03, 0);
    }
    // gently bob the waiting line
    let slot = 0;
    for (const p of this.parcels) {
      if (p.delivered || p === this.held) continue;
      p.group.position.y = 0.55 + Math.sin(this.t * 3 + slot) * 0.04;
      slot++;
    }
  }
}
