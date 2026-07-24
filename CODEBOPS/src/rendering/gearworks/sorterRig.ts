/**
 * SorterRig — Phase 6: the sorting junction.
 *
 * A conveyor carries items to a paddle junction. The upcoming batch is
 * VISIBLE, queued at the left end of the belt (classification starts
 * with looking!). At the junction an eye sensor reads the item and an
 * overhead card shows what it sees (color chip + shape chip — the data,
 * made explicit). The paddle swings to push the item left or right into
 * its basket; un-sent items ride straight through into the pass crate.
 *
 * Wrong-bin drops flash the basket red; correct drops sparkle the lid.
 * Rendering only — truth lives in gameplay/gearworks/sorterMachine.ts.
 */
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { toonMat } from '../materials/toon';
import type { SortItem } from '../../gameplay/gearworks/sorterMachine';

const JUNCTION_X = 0.6;
const BELT_LEFT = -3.4;
const BELT_TOP = 1.02;

function mesh(geo: THREE.BufferGeometry, mat: THREE.Material, x = 0, y = 0, z = 0, cast = true, receive = true): THREE.Mesh {
  const m = new THREE.Mesh(geo, mat);
  m.position.set(x, y, z);
  m.castShadow = cast;
  m.receiveShadow = receive;
  return m;
}

function makeItem(item: SortItem): THREE.Group {
  const g = new THREE.Group();
  const color = item.color === 'red' ? '#e8384f' : '#3d7ff0';
  if (item.shape === 'round') {
    g.add(mesh(new THREE.SphereGeometry(0.32, 14, 12), toonMat(color), 0, 0, 0));
    g.add(mesh(new THREE.ConeGeometry(0.15, 0.2, 8), toonMat('#57c14e'), 0, 0.36, 0, false, false));
  } else {
    g.add(mesh(new RoundedBoxGeometry(0.56, 0.56, 0.56, 2, 0.09), toonMat(color), 0, 0, 0));
    g.add(mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.1, 10), toonMat('#ffd97a'), 0, 0.33, 0, false, false));
  }
  return g;
}

class Basket {
  readonly group = new THREE.Group();
  private readonly ring: THREE.Mesh;
  private flashT = 0;
  private flashGood = true;
  private count = 0;

  constructor(color: string) {
    this.group.add(mesh(new THREE.CylinderGeometry(0.68, 0.52, 0.66, 14), toonMat(color), 0, 0.33, 0));
    this.ring = mesh(new THREE.TorusGeometry(0.66, 0.08, 8, 18), toonMat('#fff6e3'), 0, 0.66, 0, false, false);
    this.ring.rotation.x = Math.PI / 2;
    this.group.add(this.ring);
  }

  drop(item: SortItem, correct: boolean): void {
    const kept = makeItem(item);
    kept.scale.setScalar(0.7);
    kept.position.set((this.count % 2) * 0.34 - 0.17, 0.72 + Math.floor(this.count / 2) * 0.22, 0);
    this.group.add(kept);
    this.count++;
    this.flashT = 1.2;
    this.flashGood = correct;
  }

  clearItems(): void {
    while (this.group.children.length > 2) this.group.remove(this.group.children[2]);
    this.count = 0;
    this.flashT = 0;
    (this.ring.material as THREE.MeshToonMaterial).color.set('#fff6e3');
  }

  update(dt: number, elapsed: number): void {
    if (this.flashT > 0) {
      this.flashT = Math.max(0, this.flashT - dt);
      const blink = Math.sin(elapsed * 12) > 0;
      (this.ring.material as THREE.MeshToonMaterial).color.set(
        this.flashGood ? (blink ? '#7dee8e' : '#fff6e3') : (blink ? '#ff5f6d' : '#fff6e3'),
      );
      if (this.flashT === 0) (this.ring.material as THREE.MeshToonMaterial).color.set('#fff6e3');
    }
  }
}

export class SorterRig {
  readonly group = new THREE.Group();
  private readonly stripes: THREE.Mesh[] = [];
  private readonly queue: THREE.Group[] = [];
  private readonly leftBasket = new Basket('#c9382a');
  private readonly rightBasket = new Basket('#2d5fc9');
  private readonly paddle: THREE.Group;
  private readonly iris: THREE.Mesh;
  private readonly cardColor: THREE.Mesh;
  private readonly cardShape: THREE.Mesh;
  private readonly card: THREE.Group;
  private active: THREE.Group | null = null;
  private activeMode: 'idle' | 'enter' | 'toLeft' | 'toRight' | 'toPass' = 'idle';
  private activeT = 0;
  private activeItem: SortItem | null = null;
  private paddleTarget = 0; // -1 left, 0 straight, +1 right
  private beltOn = false;

  constructor() {
    this.group.name = 'sorter-rig';

    // base + belt bed running left → junction → pass crate
    this.group.add(mesh(new RoundedBoxGeometry(9.2, 0.3, 3.4, 2, 0.1), toonMat('#1b2664'), 0, 0.15, 0.2));
    this.group.add(mesh(new RoundedBoxGeometry(7.6, 0.5, 1.5, 2, 0.12), toonMat('#39406e'), -0.1, 0.75, 0));
    this.group.add(mesh(new RoundedBoxGeometry(7.4, 0.14, 1.3, 1, 0.05), toonMat('#2c3f8f'), -0.1, BELT_TOP - 0.08, 0, false, true));
    for (let i = 0; i < 8; i++) {
      const stripe = mesh(new RoundedBoxGeometry(0.15, 0.05, 1.1, 1, 0.02), toonMat('#4a72dd'), BELT_LEFT + 0.4 + i * 0.9, BELT_TOP, 0, false, false);
      this.group.add(stripe);
      this.stripes.push(stripe);
    }

    // eye sensor over the junction
    this.group.add(mesh(new RoundedBoxGeometry(0.24, 2.2, 0.34, 1, 0.08), toonMat('#2c3f8f'), JUNCTION_X + 1.0, 1.4, -0.8));
    const eyeBall = mesh(new THREE.SphereGeometry(0.36, 16, 12), toonMat('#fff6e3'), JUNCTION_X + 0.6, 2.5, -0.4);
    this.group.add(eyeBall);
    this.iris = mesh(
      new THREE.SphereGeometry(0.17, 12, 10),
      new THREE.MeshToonMaterial({ color: '#5a6285', emissive: '#000000', emissiveIntensity: 0 }),
      JUNCTION_X + 0.48, 2.42, -0.12, false, false,
    );
    this.group.add(this.iris);

    // the "what I see" card above the junction (color chip + shape chip)
    this.card = new THREE.Group();
    this.card.add(mesh(new RoundedBoxGeometry(1.5, 0.9, 0.12, 2, 0.06), toonMat('#fff6e3'), 0, 0, 0, false, false));
    this.cardColor = mesh(new THREE.SphereGeometry(0.24, 12, 10), toonMat('#8a94ad'), -0.35, 0, 0.14, false, false);
    this.card.add(this.cardColor);
    this.cardShape = mesh(new THREE.TorusGeometry(0.2, 0.07, 8, 18), toonMat('#39406e'), 0.35, 0, 0.14, false, false);
    this.card.add(this.cardShape);
    this.card.position.set(JUNCTION_X - 1.7, 2.75, 0.1);
    this.card.visible = false;
    this.group.add(this.card);

    // sorting paddle at the junction
    this.paddle = new THREE.Group();
    const blade = mesh(new RoundedBoxGeometry(0.16, 0.55, 1.15, 1, 0.06), toonMat('#ffd23e'), 0, 0, -0.45);
    this.paddle.add(blade);
    this.paddle.add(mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.75, 10), toonMat('#c9843c'), 0, 0.1, 0));
    this.paddle.position.set(JUNCTION_X, 1.35, 0.55);
    this.group.add(this.paddle);

    // chutes + baskets
    for (const side of [-1, 1] as const) {
      const chute = mesh(new RoundedBoxGeometry(0.9, 0.14, 1.6, 1, 0.05), toonMat('#aab3c8'), JUNCTION_X + side * 0.1, 0.9, 1.15, false, true);
      chute.rotation.x = -0.35;
      chute.rotation.z = side * 0.5;
      chute.position.x = JUNCTION_X + side * 0.85;
      this.group.add(chute);
    }
    this.leftBasket.group.position.set(JUNCTION_X - 1.85, 0.3, 1.7);
    this.rightBasket.group.position.set(JUNCTION_X + 1.85, 0.3, 1.7);
    this.group.add(this.leftBasket.group, this.rightBasket.group);

    // pass-through crate at the end of the belt
    const crate = new THREE.Group();
    crate.add(mesh(new RoundedBoxGeometry(1.3, 0.9, 1.2, 2, 0.08), toonMat('#c9843c'), 0, 0.45, 0));
    crate.add(mesh(new RoundedBoxGeometry(1.4, 0.16, 1.3, 1, 0.05), toonMat('#a86a2c'), 0, 0.9, 0));
    crate.position.set(4.0, 0.3, 0);
    this.group.add(crate);
  }

  /** Show the upcoming batch queued at the left end of the belt. */
  setQueue(items: readonly SortItem[]): void {
    for (const q of this.queue) this.group.remove(q);
    this.queue.length = 0;
    items.forEach((item, i) => {
      const g = makeItem(item);
      g.position.set(BELT_LEFT - 0.2 - i * 0.85, BELT_TOP + 0.34, 0);
      g.scale.setScalar(Math.max(0.55, 1 - i * 0.1));
      this.group.add(g);
      this.queue.push(g);
    });
  }

  setBelt(on: boolean): void {
    this.beltOn = on;
  }

  /** Next queued item rides to the junction; the card shows its data. */
  itemEnter(item: SortItem): void {
    const g = this.queue.shift();
    if (g) this.group.remove(g);
    this.queue.forEach((q, i) => {
      q.position.x = BELT_LEFT - 0.2 - i * 0.85;
      q.scale.setScalar(Math.max(0.55, 1 - i * 0.1));
    });
    this.active = makeItem(item);
    this.active.position.set(BELT_LEFT, BELT_TOP + 0.34, 0);
    this.group.add(this.active);
    this.activeItem = item;
    this.activeMode = 'enter';
    this.activeT = 0;
    // eye + card read the item
    const m = this.iris.material as THREE.MeshToonMaterial;
    m.color.set('#3ed35f');
    m.emissive.set('#2bb44b');
    m.emissiveIntensity = 1;
    this.card.visible = true;
    (this.cardColor.material as THREE.MeshToonMaterial).color.set(item.color === 'red' ? '#e8384f' : '#3d7ff0');
    this.cardShape.geometry.dispose();
    this.cardShape.geometry = item.shape === 'round'
      ? new THREE.TorusGeometry(0.2, 0.07, 8, 18)
      : new THREE.BoxGeometry(0.36, 0.36, 0.12);
  }

  /** Paddle pushes the current item into a basket. */
  send(dir: 'left' | 'right', correct: boolean): void {
    this.paddleTarget = dir === 'left' ? -1 : 1;
    this.activeMode = dir === 'left' ? 'toLeft' : 'toRight';
    this.activeT = 0;
    const basket = dir === 'left' ? this.leftBasket : this.rightBasket;
    const item = this.activeItem;
    window.setTimeout(() => { if (item) basket.drop(item, correct); }, 620);
  }

  /** Nobody sent it — the item rides through to the pass crate. */
  pass(): void {
    this.activeMode = 'toPass';
    this.activeT = 0;
  }

  itemDone(): void {
    const m = this.iris.material as THREE.MeshToonMaterial;
    m.color.set('#5a6285');
    m.emissive.set('#000000');
    m.emissiveIntensity = 0;
    this.card.visible = false;
    this.paddleTarget = 0;
  }

  reset(): void {
    if (this.active) this.group.remove(this.active);
    this.active = null;
    this.activeMode = 'idle';
    this.leftBasket.clearItems();
    this.rightBasket.clearItems();
    this.itemDone();
    this.beltOn = false;
    for (const q of this.queue) this.group.remove(q);
    this.queue.length = 0;
  }

  update(dt: number, elapsed: number): void {
    if (this.beltOn || this.activeMode === 'enter') {
      for (const s of this.stripes) {
        s.position.x += dt * 1.2;
        if (s.position.x > 3.2) s.position.x = BELT_LEFT + 0.2;
      }
    }
    // paddle swing
    this.paddle.rotation.y += ((this.paddleTarget * 0.85) - this.paddle.rotation.y) * Math.min(1, dt * 7);

    if (this.active) {
      if (this.activeMode === 'enter') {
        this.activeT = Math.min(1, this.activeT + dt * 1.5);
        this.active.position.x = BELT_LEFT + (JUNCTION_X - BELT_LEFT) * this.activeT;
        if (this.activeT >= 1) this.activeMode = 'idle';
      } else if (this.activeMode === 'toLeft' || this.activeMode === 'toRight') {
        this.activeT = Math.min(1, this.activeT + dt * 1.9);
        const side = this.activeMode === 'toLeft' ? -1 : 1;
        const t = this.activeT;
        this.active.position.x = JUNCTION_X + side * 1.85 * t;
        this.active.position.z = 1.7 * t;
        this.active.position.y = BELT_TOP + 0.34 + Math.sin(t * Math.PI) * 0.7 - t * 0.3;
        if (t >= 1) { this.group.remove(this.active); this.active = null; }
      } else if (this.activeMode === 'toPass') {
        this.activeT = Math.min(1, this.activeT + dt * 1.4);
        this.active.position.x = JUNCTION_X + (4.0 - JUNCTION_X) * this.activeT;
        if (this.activeT > 0.8) this.active.position.y -= dt * 2.2;
        if (this.activeT >= 1) { this.group.remove(this.active); this.active = null; }
      }
    }
    this.leftBasket.update(dt, elapsed);
    this.rightBasket.update(dt, elapsed);
  }
}
