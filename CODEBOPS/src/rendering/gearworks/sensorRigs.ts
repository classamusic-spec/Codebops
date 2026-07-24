/**
 * Phase 5 rigs — machines with SENSES.
 *
 * BerryLineRig: conveyor + eye sensor + grabber claw + basket. The eye
 * is the sensor made visible (spec rule: light + shape + icon + pulse):
 * grey and half-lidded when it sees nothing, wide green and pulsing the
 * moment the berry arrives. The claw opens/closes with real timing —
 * snapping on air is its own little show.
 *
 * WorkshopRig: the boolean-input machine. A big crank gear the child
 * TAPS to set spinning or still, an eye sensor watching it, a boom gate
 * that opens, and a red warning dome that flashes. Input state is
 * always visible: the gear either turns or it doesn't, and the sensor
 * lamp agrees.
 *
 * Rendering only — truth lives in gameplay/gearworks/sensorMachine.ts.
 */
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { toonMat } from '../materials/toon';
import { createGear } from './gearMesh';

function mesh(geo: THREE.BufferGeometry, mat: THREE.Material, x = 0, y = 0, z = 0, cast = true, receive = true): THREE.Mesh {
  const m = new THREE.Mesh(geo, mat);
  m.position.set(x, y, z);
  m.castShadow = cast;
  m.receiveShadow = receive;
  return m;
}

function makeBerry(): THREE.Group {
  const berry = new THREE.Group();
  berry.add(mesh(new THREE.SphereGeometry(0.34, 14, 12), toonMat('#e8384f'), 0, 0, 0));
  const leaf = mesh(new THREE.ConeGeometry(0.16, 0.22, 8), toonMat('#57c14e'), 0, 0.38, 0, false, false);
  berry.add(leaf);
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2;
    berry.add(mesh(new THREE.SphereGeometry(0.03, 6, 6), toonMat('#ffd97a'),
      Math.cos(a) * 0.22, Math.sin(a * 1.7) * 0.15, 0.28, false, false));
  }
  return berry;
}

/** Eye sensor on a post: grey/lidded off, wide green + pulse on. */
class EyeSensor {
  readonly group = new THREE.Group();
  private readonly iris: THREE.Mesh;
  private readonly lid: THREE.Mesh;
  private on = false;
  private pulse = 0;

  constructor() {
    const ball = mesh(new THREE.SphereGeometry(0.42, 16, 12), toonMat('#fff6e3'), 0, 0, 0);
    this.group.add(ball);
    this.iris = mesh(
      new THREE.SphereGeometry(0.2, 12, 10),
      new THREE.MeshToonMaterial({ color: '#5a6285', emissive: '#000000', emissiveIntensity: 0 }),
      0, -0.02, 0.3, false, false,
    );
    this.group.add(this.iris);
    this.lid = mesh(new THREE.SphereGeometry(0.44, 16, 8, 0, Math.PI * 2, 0, Math.PI * 0.42), toonMat('#39406e'), 0, 0.02, 0, false, false);
    this.group.add(this.lid);
  }

  set(onNow: boolean): void {
    if (onNow && !this.on) this.pulse = 1;
    this.on = onNow;
    const m = this.iris.material as THREE.MeshToonMaterial;
    if (onNow) {
      m.color.set('#3ed35f');
      m.emissive.set('#2bb44b');
      m.emissiveIntensity = 1.0;
    } else {
      m.color.set('#5a6285');
      m.emissive.set('#000000');
      m.emissiveIntensity = 0;
    }
  }

  update(dt: number, elapsed: number): void {
    const lidTarget = this.on ? -0.34 : 0.02; // lifts wide open when seeing
    this.lid.position.y += (lidTarget - this.lid.position.y) * Math.min(1, dt * 8);
    if (this.pulse > 0) {
      this.pulse = Math.max(0, this.pulse - dt * 1.6);
      this.group.scale.setScalar(1 + Math.sin(elapsed * 16) * 0.08 * this.pulse);
    } else if (this.on) {
      this.group.scale.setScalar(1 + Math.sin(elapsed * 3) * 0.03);
    } else {
      this.group.scale.setScalar(1);
    }
  }
}

// ==================================================================
// BerryLineRig
// ==================================================================

const BELT_LEFT = -3.1;
const SENSOR_X = 0.7;
const BELT_RIGHT = 2.6;
const BELT_TOP = 1.02;

export class BerryLineRig {
  readonly group = new THREE.Group();
  private readonly eye = new EyeSensor();
  private readonly clawL: THREE.Mesh;
  private readonly clawR: THREE.Mesh;
  private readonly clawArm: THREE.Group;
  private readonly berry: THREE.Group;
  private readonly basketBerries: THREE.Group;
  private readonly stripes: THREE.Mesh[] = [];
  private beltOn = false;
  private berryMode: 'hidden' | 'entering' | 'waiting' | 'leaving' | 'toBasket' = 'hidden';
  private berryT = 0;
  private clawClose = 0; // 0 open, 1 closed
  private clawTarget = 0;
  private snapT = 0;

  constructor() {
    this.group.name = 'berry-line-rig';

    // base + conveyor bed
    this.group.add(mesh(new RoundedBoxGeometry(8.2, 0.3, 2.8, 2, 0.1), toonMat('#1b2664'), 0, 0.15, 0));
    this.group.add(mesh(new RoundedBoxGeometry(6.4, 0.5, 1.6, 2, 0.12), toonMat('#39406e'), -0.25, 0.75, 0));
    // rollers
    for (let x = BELT_LEFT + 0.4; x <= BELT_RIGHT - 0.2; x += 1.1) {
      const roller = mesh(new THREE.CylinderGeometry(0.16, 0.16, 1.5, 10), toonMat('#aab3c8'), x, 0.62, 0);
      roller.rotation.x = Math.PI / 2;
      this.group.add(roller);
    }
    // belt top with moving stripes
    this.group.add(mesh(new RoundedBoxGeometry(6.2, 0.14, 1.4, 1, 0.05), toonMat('#2c3f8f'), -0.25, BELT_TOP - 0.08, 0, false, true));
    for (let i = 0; i < 7; i++) {
      const stripe = mesh(new RoundedBoxGeometry(0.16, 0.05, 1.2, 1, 0.02), toonMat('#4a72dd'), BELT_LEFT + 0.5 + i * 0.9, BELT_TOP, 0, false, false);
      this.group.add(stripe);
      this.stripes.push(stripe);
    }

    // eye sensor on a post, looking down at the belt
    this.group.add(mesh(new RoundedBoxGeometry(0.24, 2.1, 0.34, 1, 0.08), toonMat('#2c3f8f'), SENSOR_X + 1.0, 1.35, -0.75));
    this.eye.group.position.set(SENSOR_X + 0.55, 2.5, -0.35);
    this.eye.group.rotation.y = -0.22;
    this.eye.group.rotation.x = 0.28;
    this.group.add(this.eye.group);

    // grabber claw on an arch over the sensor spot
    this.group.add(mesh(new RoundedBoxGeometry(0.3, 3.2, 0.4, 1, 0.08), toonMat('#c9843c'), SENSOR_X - 1.4, 1.9, -0.6));
    this.group.add(mesh(new RoundedBoxGeometry(1.9, 0.26, 0.36, 1, 0.08), toonMat('#c9843c'), SENSOR_X - 0.55, 3.45, -0.6));
    this.clawArm = new THREE.Group();
    this.clawArm.add(mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.9, 10), toonMat('#aab3c8'), 0, 0.45, 0));
    const fingerGeo = new RoundedBoxGeometry(0.14, 0.75, 0.3, 1, 0.05);
    this.clawL = mesh(fingerGeo, toonMat('#e05a3a'), -0.3, -0.32, 0);
    this.clawR = mesh(fingerGeo, toonMat('#e05a3a'), 0.3, -0.32, 0);
    this.clawArm.add(this.clawL, this.clawR);
    this.clawArm.position.set(SENSOR_X, 2.6, 0);
    this.group.add(this.clawArm);

    // basket at the end of the line
    const basket = new THREE.Group();
    basket.add(mesh(new THREE.CylinderGeometry(0.65, 0.5, 0.62, 14), toonMat('#c9843c'), 0, 0.31, 0));
    basket.add(mesh(new THREE.TorusGeometry(0.62, 0.07, 8, 18), toonMat('#a86a2c'), 0, 0.62, 0, false, false));
    basket.position.set(3.35, 0.3, 0.3);
    this.group.add(basket);
    this.basketBerries = new THREE.Group();
    this.basketBerries.position.copy(basket.position);
    this.group.add(this.basketBerries);

    // the traveling berry
    this.berry = makeBerry();
    this.berry.visible = false;
    this.group.add(this.berry);
  }

  setBelt(on: boolean): void {
    this.beltOn = on;
  }

  setSensor(on: boolean): void {
    this.eye.set(on);
  }

  /** Berry slides in from the left toward the claw (arrival beat). */
  berryEnter(): void {
    this.berry.visible = true;
    this.berry.position.set(BELT_LEFT, BELT_TOP + 0.36, 0);
    this.berryMode = 'entering';
    this.berryT = 0;
  }

  /** Un-grabbed berry rides off the right end. */
  berryLeave(): void {
    if (this.berryMode === 'hidden') return;
    this.berryMode = 'leaving';
    this.berryT = 0;
  }

  /** Claw closes on the berry and drops it in the basket. */
  grab(total: number): void {
    this.clawTarget = 1;
    this.berryMode = 'toBasket';
    this.berryT = 0;
    const kept = makeBerry();
    kept.scale.setScalar(0.8);
    const n = this.basketBerries.children.length;
    kept.position.set((n % 2) * 0.3 - 0.15, 0.62 + Math.floor(n / 2) * 0.2, 0);
    window.setTimeout(() => this.basketBerries.add(kept), 520);
    void total;
  }

  /** Claw closes on air — quick snap + shake. */
  snap(): void {
    this.clawTarget = 1;
    this.snapT = 1;
    window.setTimeout(() => { this.clawTarget = 0; }, 420);
  }

  openClaw(): void {
    this.clawTarget = 0;
  }

  reset(): void {
    this.beltOn = false;
    this.berry.visible = false;
    this.berryMode = 'hidden';
    this.clawTarget = 0;
    this.snapT = 0;
    this.eye.set(false);
    this.basketBerries.clear();
  }

  update(dt: number, elapsed: number): void {
    // belt stripes crawl while on
    if (this.beltOn) {
      for (const s of this.stripes) {
        s.position.x += dt * 1.1;
        if (s.position.x > BELT_RIGHT) s.position.x = BELT_LEFT + 0.3;
      }
    }
    // berry travel
    if (this.berryMode === 'entering') {
      this.berryT = Math.min(1, this.berryT + dt * 1.4);
      this.berry.position.x = BELT_LEFT + (SENSOR_X - BELT_LEFT) * this.berryT;
      if (this.berryT >= 1) this.berryMode = 'waiting';
    } else if (this.berryMode === 'leaving') {
      this.berryT = Math.min(1, this.berryT + dt * 1.2);
      this.berry.position.x = SENSOR_X + (BELT_RIGHT + 1.2 - SENSOR_X) * this.berryT;
      if (this.berryT > 0.75) this.berry.position.y -= dt * 3; // tumbles off
      if (this.berryT >= 1) { this.berry.visible = false; this.berryMode = 'hidden'; }
    } else if (this.berryMode === 'toBasket') {
      this.berryT = Math.min(1, this.berryT + dt * 2.2);
      const t = this.berryT;
      this.berry.position.x = SENSOR_X + (3.35 - SENSOR_X) * t;
      this.berry.position.y = BELT_TOP + 0.36 + Math.sin(t * Math.PI) * 1.6;
      if (t >= 1) {
        this.berry.visible = false;
        this.berryMode = 'hidden';
        this.clawTarget = 0;
      }
    }
    // claw fingers pinch
    this.clawClose += (this.clawTarget - this.clawClose) * Math.min(1, dt * 10);
    this.clawL.position.x = -0.3 + this.clawClose * 0.17;
    this.clawR.position.x = 0.3 - this.clawClose * 0.17;
    this.clawL.rotation.z = -this.clawClose * 0.25;
    this.clawR.rotation.z = this.clawClose * 0.25;
    if (this.snapT > 0) {
      this.snapT = Math.max(0, this.snapT - dt * 2.4);
      this.clawArm.position.x = SENSOR_X + Math.sin(elapsed * 30) * 0.05 * this.snapT;
    }
    this.eye.update(dt, elapsed);
  }
}

// ==================================================================
// WorkshopRig
// ==================================================================

export class WorkshopRig {
  readonly group = new THREE.Group();
  private readonly gear: THREE.Group;
  private readonly eye = new EyeSensor();
  private readonly boom: THREE.Group;
  private readonly warnDome: THREE.Mesh;
  private readonly cart: THREE.Group;
  private turning = false;
  private gateOpenT = 0;
  private gateTarget = 0;
  private warnT = 0;
  private cartT = -1;

  constructor() {
    this.group.name = 'workshop-rig';

    // base
    this.group.add(mesh(new RoundedBoxGeometry(8.6, 0.3, 2.8, 2, 0.1), toonMat('#1b2664'), 0, 0.15, 0));

    // the INPUT: a big tappable gear on a stand
    this.group.add(mesh(new RoundedBoxGeometry(0.5, 1.7, 0.62, 1, 0.1), toonMat('#39406e'), -2.7, 1.15, -0.3));
    this.gear = createGear({ color: '#ff9f2e', radius: 1.15, teeth: 14 });
    this.gear.position.set(-2.7, 2.1, 0.1);
    this.gear.traverse((o) => { o.userData.gwInput = true; });
    this.group.add(this.gear);
    // tap hint ring behind the gear
    const hint = new THREE.Mesh(
      new THREE.TorusGeometry(1.45, 0.06, 8, 32),
      new THREE.MeshToonMaterial({ color: '#7fc4ff', emissive: '#3d8fe0', emissiveIntensity: 0.5, transparent: true, opacity: 0.5 }),
    );
    hint.position.set(-2.7, 2.1, -0.15);
    hint.userData.gwInput = true;
    this.group.add(hint);

    // eye sensor watching the gear
    this.group.add(mesh(new RoundedBoxGeometry(0.24, 2.3, 0.34, 1, 0.08), toonMat('#2c3f8f'), -0.7, 1.45, -0.6));
    this.eye.group.position.set(-0.7, 2.75, -0.25);
    this.eye.group.rotation.y = -0.7;
    this.group.add(this.eye.group);

    // boom gate (railway style — reads as open/closed at a glance)
    this.group.add(mesh(new RoundedBoxGeometry(0.5, 1.5, 0.6, 1, 0.1), toonMat('#2c3f8f'), 1.6, 1.05, -0.2));
    this.boom = new THREE.Group();
    const arm = mesh(new RoundedBoxGeometry(2.6, 0.22, 0.3, 1, 0.08), toonMat('#e8384f'), 1.3, 0, 0);
    for (let i = 0; i < 3; i++) {
      arm.add(mesh(new RoundedBoxGeometry(0.42, 0.23, 0.31, 1, 0.08), toonMat('#fff6e3'), -0.85 + i * 0.85, 0, 0.001, false, false));
    }
    this.boom.add(arm);
    this.boom.position.set(1.6, 1.8, -0.2);
    this.group.add(this.boom);

    // warning light on a pole
    this.group.add(mesh(new THREE.CylinderGeometry(0.09, 0.11, 1.9, 10), toonMat('#aab3c8'), 0.6, 1.25, -0.7));
    this.warnDome = mesh(
      new THREE.SphereGeometry(0.32, 14, 10),
      new THREE.MeshToonMaterial({ color: '#8a5560', emissive: '#000000', emissiveIntensity: 0 }),
      0.6, 2.35, -0.7, false, false,
    );
    this.group.add(this.warnDome);

    // berry cart waiting at the gate (rolls through when it opens)
    this.cart = new THREE.Group();
    this.cart.add(mesh(new RoundedBoxGeometry(1.1, 0.5, 0.8, 2, 0.1), toonMat('#38b6ff'), 0, 0.55, 0));
    for (const wx of [-0.35, 0.35]) {
      const wheel = mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.12, 12), toonMat('#16225c'), wx, 0.22, 0.42);
      wheel.rotation.x = Math.PI / 2;
      this.cart.add(wheel);
    }
    const load = makeBerry();
    load.scale.setScalar(0.7);
    load.position.set(0, 0.95, 0);
    this.cart.add(load);
    this.cart.position.set(3.6, 0.3, 0.35);
    this.group.add(this.cart);

    this.setTurning(false);
  }

  /** Raycast targets for the tap-the-gear input. */
  inputTargets(): THREE.Object3D[] {
    return [this.gear];
  }

  setTurning(turning: boolean): void {
    this.turning = turning;
    this.eye.set(turning);
  }

  isTurning(): boolean {
    return this.turning;
  }

  openGate(): void {
    this.gateTarget = 1;
    this.cartT = 0;
  }

  warn(): void {
    this.warnT = 3.2;
  }

  reset(): void {
    this.gateTarget = 0;
    this.gateOpenT = 0;
    this.boom.rotation.z = 0;
    this.warnT = 0;
    this.cartT = -1;
    this.cart.position.x = 3.6;
    const m = this.warnDome.material as THREE.MeshToonMaterial;
    m.emissiveIntensity = 0;
    m.color.set('#8a5560');
  }

  update(dt: number, elapsed: number): void {
    if (this.turning) this.gear.rotation.z -= dt * 1.6;
    // boom swings up to ~80° when open
    this.gateOpenT += (this.gateTarget - this.gateOpenT) * Math.min(1, dt * 5);
    this.boom.rotation.z = this.gateOpenT * 1.35;
    // cart rolls through once the boom is mostly up
    if (this.cartT >= 0 && this.gateOpenT > 0.7) {
      this.cartT = Math.min(1, this.cartT + dt * 0.55);
      this.cart.position.x = 3.6 - this.cartT * 5.4;
    }
    // warning dome flash
    if (this.warnT > 0) {
      this.warnT = Math.max(0, this.warnT - dt);
      const m = this.warnDome.material as THREE.MeshToonMaterial;
      const blink = Math.sin(elapsed * 10) > 0;
      m.color.set(blink ? '#ff5f6d' : '#8a5560');
      m.emissive.set('#e8384f');
      m.emissiveIntensity = blink ? 1.2 : 0.1;
      if (this.warnT === 0) {
        m.emissiveIntensity = 0;
        m.color.set('#8a5560');
      }
    }
    this.eye.update(dt, elapsed);
  }
}
