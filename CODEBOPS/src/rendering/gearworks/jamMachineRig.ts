/**
 * JamMachineRig — Phase 8 hero machine. The whole strawberry line in
 * one diorama: a motor (power lamp), a conveyor that carries berries in
 * from the left, an eye sensor over the press, a slamming press, and a
 * shelf of jam jars that fill as jam is made. Each earlier phase's part
 * shows up here, assembled.
 *
 * Rendering only — truth lives in gameplay/gearworks/jamMachine.ts.
 */
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { toonMat } from '../materials/toon';

const BELT_LEFT = -4.2;
const PRESS_X = 0.4;
const BELT_TOP = 1.05;

function mesh(geo: THREE.BufferGeometry, mat: THREE.Material, x = 0, y = 0, z = 0, cast = true, receive = true): THREE.Mesh {
  const m = new THREE.Mesh(geo, mat);
  m.position.set(x, y, z);
  m.castShadow = cast;
  m.receiveShadow = receive;
  return m;
}

function makeBerry(): THREE.Group {
  const g = new THREE.Group();
  g.add(mesh(new THREE.SphereGeometry(0.32, 14, 12), toonMat('#e8384f'), 0, 0, 0));
  g.add(mesh(new THREE.ConeGeometry(0.15, 0.2, 8), toonMat('#57c14e'), 0, 0.36, 0, false, false));
  return g;
}

export class JamMachineRig {
  readonly group = new THREE.Group();
  private readonly lamp: THREE.Mesh;
  private readonly iris: THREE.Mesh;
  private readonly plunger: THREE.Group;
  private readonly stripes: THREE.Mesh[] = [];
  private readonly jamJars: THREE.Group[] = [];
  private readonly berry: THREE.Group;
  private motorOn = false;
  private conveyorOn = false;
  private berryMode: 'hidden' | 'arriving' | 'atPress' | 'leaving' = 'hidden';
  private berryT = 0;
  private pressTarget = 0; // 0 up, 1 down

  constructor(jarCount = 5) {
    this.group.name = 'jam-machine-rig';

    // base
    this.group.add(mesh(new RoundedBoxGeometry(10.4, 0.3, 2.8, 2, 0.1), toonMat('#1b2664'), 0, 0.15, 0.1));

    // ---- motor block (left) ----
    const motor = new THREE.Group();
    motor.add(mesh(new RoundedBoxGeometry(1.7, 1.4, 1.3, 3, 0.22), toonMat('#2f6fe0'), 0, 0.95, 0));
    motor.add(mesh(new THREE.CylinderGeometry(0.5, 0.56, 0.45, 16), toonMat('#4a8cf0'), 0, 1.8, 0, true, false));
    const boltShape = new THREE.Shape();
    boltShape.moveTo(0.09, 0.3); boltShape.lineTo(-0.12, -0.02); boltShape.lineTo(0.0, -0.02);
    boltShape.lineTo(-0.09, -0.3); boltShape.lineTo(0.14, 0.06); boltShape.lineTo(0.02, 0.06); boltShape.closePath();
    const bolt = new THREE.Mesh(new THREE.ExtrudeGeometry(boltShape, { depth: 0.05, bevelEnabled: false }), toonMat('#ffd23e'));
    bolt.scale.setScalar(1.3); bolt.position.set(0, 0.95, 0.68); motor.add(bolt);
    this.lamp = mesh(new THREE.SphereGeometry(0.2, 14, 10), new THREE.MeshToonMaterial({ color: '#8a94ad', emissive: '#000000', emissiveIntensity: 0 }), 0.5, 1.8, 0.3, false, false);
    motor.add(this.lamp);
    motor.position.set(BELT_LEFT - 1.1, 0.3, 0);
    this.group.add(motor);

    // ---- conveyor bed + rollers + stripes ----
    this.group.add(mesh(new RoundedBoxGeometry(6.4, 0.5, 1.5, 2, 0.12), toonMat('#39406e'), -1.1, 0.75, 0));
    for (let x = BELT_LEFT + 0.2; x <= PRESS_X + 0.6; x += 1.05) {
      const roller = mesh(new THREE.CylinderGeometry(0.16, 0.16, 1.4, 10), toonMat('#aab3c8'), x, 0.62, 0);
      roller.rotation.x = Math.PI / 2;
      this.group.add(roller);
    }
    this.group.add(mesh(new RoundedBoxGeometry(6.2, 0.14, 1.3, 1, 0.05), toonMat('#2c3f8f'), -1.1, BELT_TOP - 0.08, 0, false, true));
    for (let i = 0; i < 7; i++) {
      const stripe = mesh(new RoundedBoxGeometry(0.15, 0.05, 1.1, 1, 0.02), toonMat('#4a72dd'), BELT_LEFT + 0.4 + i * 0.85, BELT_TOP, 0, false, false);
      this.group.add(stripe);
      this.stripes.push(stripe);
    }

    // ---- eye sensor over the press ----
    this.group.add(mesh(new RoundedBoxGeometry(0.24, 2.0, 0.34, 1, 0.08), toonMat('#2c3f8f'), PRESS_X + 1.05, 1.3, -0.7));
    this.group.add(mesh(new THREE.SphereGeometry(0.34, 16, 12), toonMat('#fff6e3'), PRESS_X + 0.62, 2.35, -0.3));
    this.iris = mesh(new THREE.SphereGeometry(0.16, 12, 10), new THREE.MeshToonMaterial({ color: '#5a6285', emissive: '#000000', emissiveIntensity: 0 }), PRESS_X + 0.5, 2.28, 0.0, false, false);
    this.group.add(this.iris);

    // ---- press arch + plunger ----
    for (const px of [-0.95, 0.95]) {
      this.group.add(mesh(new RoundedBoxGeometry(0.32, 3.0, 0.42, 1, 0.08), toonMat('#c9843c'), PRESS_X + px, 2.15, -0.45));
    }
    this.group.add(mesh(new RoundedBoxGeometry(2.5, 0.4, 0.5, 1, 0.1), toonMat('#c9843c'), PRESS_X, 3.5, -0.45));
    this.plunger = new THREE.Group();
    this.plunger.add(mesh(new THREE.CylinderGeometry(0.18, 0.18, 1.0, 12), toonMat('#aab3c8'), 0, 0.55, 0));
    this.plunger.add(mesh(new RoundedBoxGeometry(0.95, 0.44, 0.7, 1, 0.1), toonMat('#e05a3a'), 0, 0, 0));
    this.plunger.position.set(PRESS_X, 2.7, 0);
    this.group.add(this.plunger);

    // ---- jam jar shelf (right) ----
    this.group.add(mesh(new RoundedBoxGeometry(3.6, 0.24, 1.2, 1, 0.06), toonMat('#d9a45c'), 3.5, 0.9, 0.2));
    for (let i = 0; i < jarCount; i++) {
      const jar = new THREE.Group();
      jar.add(mesh(new THREE.CylinderGeometry(0.26, 0.24, 0.62, 14, 1, true), new THREE.MeshToonMaterial({ color: '#cfeeff', transparent: true, opacity: 0.4 }), 0, 0.32, 0));
      const jam = mesh(new THREE.CylinderGeometry(0.22, 0.2, 0.44, 14), toonMat('#c9382a'), 0, 0.24, 0, false, false);
      jam.name = 'jam';
      jam.visible = false;
      jar.add(jam);
      jar.add(mesh(new THREE.CylinderGeometry(0.27, 0.27, 0.08, 14), toonMat('#e0a020'), 0, 0.64, 0, false, false));
      jar.position.set(2.2 + i * 0.62, 1.05, 0.2);
      this.group.add(jar);
      this.jamJars.push(jar);
    }

    // ---- the travelling strawberry ----
    this.berry = makeBerry();
    this.berry.visible = false;
    this.group.add(this.berry);
  }

  setMotor(on: boolean): void {
    this.motorOn = on;
    const m = this.lamp.material as THREE.MeshToonMaterial;
    if (on) { m.color.set('#7dee8e'); m.emissive.set('#3ed35f'); m.emissiveIntensity = 1; }
    else { m.color.set('#8a94ad'); m.emissive.set('#000000'); m.emissiveIntensity = 0; }
  }

  setConveyor(on: boolean): void {
    this.conveyorOn = on;
  }

  private setSensor(on: boolean): void {
    const m = this.iris.material as THREE.MeshToonMaterial;
    if (on) { m.color.set('#3ed35f'); m.emissive.set('#2bb44b'); m.emissiveIntensity = 1; }
    else { m.color.set('#5a6285'); m.emissive.set('#000000'); m.emissiveIntensity = 0; }
  }

  berryArrive(): void {
    this.berry.visible = true;
    this.berry.position.set(BELT_LEFT, BELT_TOP + 0.34, 0);
    this.berry.scale.setScalar(1);
    this.berryMode = 'arriving';
    this.berryT = 0;
    this.setSensor(true);
  }

  lower(): void {
    this.pressTarget = 1;
  }

  raise(): void {
    this.pressTarget = 0;
    this.berryMode = 'leaving';
    this.berryT = 0;
    this.setSensor(false);
  }

  /** Fill jam jar number `n` (1-based). */
  addJam(n: number): void {
    const jar = this.jamJars[n - 1];
    const jam = jar?.getObjectByName('jam');
    if (jam) jam.visible = true;
  }

  reset(): void {
    this.setMotor(false);
    this.setConveyor(false);
    this.setSensor(false);
    this.berry.visible = false;
    this.berryMode = 'hidden';
    this.pressTarget = 0;
    for (const jar of this.jamJars) {
      const jam = jar.getObjectByName('jam');
      if (jam) jam.visible = false;
    }
  }

  update(dt: number, elapsed: number): void {
    // belt stripes crawl while running
    if (this.conveyorOn && this.motorOn) {
      for (const s of this.stripes) {
        s.position.x += dt * 1.2;
        if (s.position.x > PRESS_X + 0.9) s.position.x = BELT_LEFT + 0.2;
      }
    }
    // berry travel
    if (this.berryMode === 'arriving') {
      this.berryT = Math.min(1, this.berryT + dt * 1.6);
      this.berry.position.x = BELT_LEFT + (PRESS_X - BELT_LEFT) * this.berryT;
      if (this.berryT >= 1) this.berryMode = 'atPress';
    } else if (this.berryMode === 'leaving') {
      this.berryT = Math.min(1, this.berryT + dt * 1.5);
      this.berry.position.x = PRESS_X + (PRESS_X + 3.4 - PRESS_X) * this.berryT;
      this.berry.scale.setScalar(Math.max(0.2, 1 - this.berryT)); // squished away
      if (this.berryT >= 1) { this.berry.visible = false; this.berryMode = 'hidden'; }
    }
    // press slam / lift + squish the berry when down
    const py = this.pressTarget === 1 ? 2.7 - 1.15 : 2.7;
    this.plunger.position.y += (py - this.plunger.position.y) * Math.min(1, dt * 12);
    if (this.pressTarget === 1 && this.berryMode === 'atPress') {
      const squish = Math.max(0.35, 1 - (2.7 - this.plunger.position.y) / 1.3);
      this.berry.scale.y = squish;
    }
    // motor lamp breathing
    if (this.motorOn) (this.lamp.material as THREE.MeshToonMaterial).emissiveIntensity = 0.85 + Math.sin(elapsed * 4) * 0.2;
  }
}
