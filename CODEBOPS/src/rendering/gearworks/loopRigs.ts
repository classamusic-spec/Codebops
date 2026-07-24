/**
 * Phase 4 rigs — the two loop machines.
 *
 * GearBellRig: a crank gear that visibly WINDS the bell (power lamp
 * charges amber) and a bell that spends the wind with a DING — plus a
 * row of note lamps counting rings toward the goal.
 *
 * LiftRig: a toy elevator — tower rails, floor plates with number
 * badges, a platform carrying the berry basket, and the delivery bell
 * at the top. One floor per LIFT UP; gentle bounce when it bumps the
 * ends of the track.
 *
 * Rendering only — loop truth lives in gameplay/gearworks/loopMachine.
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

function makeBell(): { group: THREE.Group; dome: THREE.Group } {
  const group = new THREE.Group();
  const dome = new THREE.Group();
  const cup = new THREE.Mesh(new THREE.SphereGeometry(0.5, 18, 12, 0, Math.PI * 2, 0, Math.PI / 2), toonMat('#ffd23e'));
  cup.rotation.x = Math.PI;
  cup.position.y = -0.1;
  cup.castShadow = true;
  dome.add(cup);
  dome.add(mesh(new THREE.SphereGeometry(0.12, 10, 8), toonMat('#ff9f2e'), 0, 0.04, 0, false, false));
  dome.add(mesh(new THREE.SphereGeometry(0.11, 10, 8), toonMat('#39406e'), 0, -0.48, 0, false, false));
  group.add(dome);
  return { group, dome };
}

// ==================================================================
// GearBellRig
// ==================================================================

export class GearBellRig {
  readonly group = new THREE.Group();
  private readonly gear: THREE.Group;
  private readonly windLamp: THREE.Mesh;
  private readonly bellDome: THREE.Group;
  private readonly noteLamps: THREE.Mesh[] = [];
  private spinBurst = 0;
  private ringT = 0;
  private clunkT = 0;

  constructor(ringGoal: number) {
    this.group.name = 'gear-bell-rig';

    // base
    this.group.add(mesh(new RoundedBoxGeometry(7.6, 0.3, 2.6, 2, 0.1), toonMat('#1b2664'), 0, 0.15, 0));

    // crank gear on a stand (the winder)
    this.group.add(mesh(new RoundedBoxGeometry(0.44, 1.5, 0.6, 1, 0.1), toonMat('#39406e'), -2.1, 1.05, -0.35));
    this.gear = createGear({ color: '#ff9f2e', radius: 1.05, teeth: 13 });
    this.gear.position.set(-2.1, 1.85, 0.05);
    this.group.add(this.gear);
    // crank handle knob on the gear face
    const knob = mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.3, 10), toonMat('#e05a3a'), 0, 0.62, 0.24);
    knob.rotation.x = Math.PI / 2;
    this.gear.add(knob);

    // wind lamp between gear and bell — glows amber when the bell has power
    this.windLamp = mesh(
      new THREE.SphereGeometry(0.22, 12, 10),
      new THREE.MeshToonMaterial({ color: '#8a94ad', emissive: '#000000', emissiveIntensity: 0 }),
      -0.35, 1.5, 0.15, false, false,
    );
    this.group.add(this.windLamp);
    this.group.add(mesh(new RoundedBoxGeometry(0.3, 1.0, 0.3, 1, 0.08), toonMat('#39406e'), -0.35, 0.8, 0.05));

    // bell on an arch
    this.group.add(mesh(new RoundedBoxGeometry(0.3, 2.9, 0.4, 1, 0.08), toonMat('#c9843c'), 2.6, 1.45, -0.4));
    this.group.add(mesh(new RoundedBoxGeometry(1.5, 0.26, 0.36, 1, 0.08), toonMat('#c9843c'), 1.92, 2.9, -0.4));
    const bell = makeBell();
    bell.group.position.set(1.35, 2.62, -0.35);
    this.bellDome = bell.dome;
    this.group.add(bell.group);

    // note lamps — one per goal ring, light up as the count climbs
    for (let i = 0; i < ringGoal; i++) {
      const lamp = mesh(
        new THREE.SphereGeometry(0.17, 10, 8),
        new THREE.MeshToonMaterial({ color: '#5a6285', emissive: '#000000', emissiveIntensity: 0 }),
        -1.05 + i * 0.7, 0.55, 1.05, false, false,
      );
      this.group.add(lamp);
      this.noteLamps.push(lamp);
    }
  }

  setWound(wound: boolean): void {
    const m = this.windLamp.material as THREE.MeshToonMaterial;
    if (wound) {
      m.color.set('#ffd97a');
      m.emissive.set('#ffb020');
      m.emissiveIntensity = 1.0;
    } else {
      m.color.set('#8a94ad');
      m.emissive.set('#000000');
      m.emissiveIntensity = 0;
    }
  }

  gearTurn(): void {
    this.spinBurst = 1;
    this.setWound(true);
  }

  ring(total: number): void {
    this.ringT = 1;
    this.setWound(false);
    for (let i = 0; i < Math.min(total, this.noteLamps.length); i++) {
      const m = this.noteLamps[i].material as THREE.MeshToonMaterial;
      m.color.set('#7dee8e');
      m.emissive.set('#3ed35f');
      m.emissiveIntensity = 0.9;
    }
  }

  clunk(): void {
    this.clunkT = 1;
  }

  reset(): void {
    this.setWound(false);
    this.spinBurst = 0;
    this.ringT = 0;
    this.clunkT = 0;
    for (const lamp of this.noteLamps) {
      const m = lamp.material as THREE.MeshToonMaterial;
      m.color.set('#5a6285');
      m.emissive.set('#000000');
      m.emissiveIntensity = 0;
    }
  }

  update(dt: number, elapsed: number): void {
    if (this.spinBurst > 0) {
      this.gear.rotation.z -= dt * this.spinBurst * 7;
      this.spinBurst = Math.max(0, this.spinBurst - dt * 1.6);
    }
    if (this.ringT > 0) {
      this.ringT = Math.max(0, this.ringT - dt * 1.1);
      this.bellDome.rotation.z = Math.sin(elapsed * 18) * 0.16 * this.ringT;
    }
    if (this.clunkT > 0) {
      this.clunkT = Math.max(0, this.clunkT - dt * 2.2);
      this.bellDome.position.x = Math.sin(elapsed * 30) * 0.035 * this.clunkT;
    }
  }
}

// ==================================================================
// LiftRig
// ==================================================================

const FLOOR_H = 1.0; // world units per floor

export class LiftRig {
  readonly group = new THREE.Group();
  private readonly platform: THREE.Group;
  private readonly bellDome: THREE.Group;
  private readonly floorLamps: THREE.Mesh[] = [];
  private targetY = 0;
  private bumpT = 0;
  private ringT = 0;

  constructor(topFloor: number) {
    this.group.name = 'lift-rig';
    const towerH = FLOOR_H * topFloor + 1.6;

    // base
    this.group.add(mesh(new RoundedBoxGeometry(6.4, 0.3, 2.6, 2, 0.1), toonMat('#1b2664'), 0, 0.15, 0));

    // tower rails (bright toy steel so they pop off the brick wall)
    for (const rx of [-1.15, 1.15]) {
      this.group.add(mesh(new RoundedBoxGeometry(0.3, towerH, 0.44, 1, 0.08), toonMat('#5b8df0'), rx, towerH / 2 + 0.3, -0.55));
      this.group.add(mesh(new RoundedBoxGeometry(0.38, 0.5, 0.5, 1, 0.08), toonMat('#ffd23e'), rx, 0.5, -0.55));
    }
    this.group.add(mesh(new RoundedBoxGeometry(2.9, 0.34, 0.52, 1, 0.1), toonMat('#ffd23e'), 0, towerH + 0.35, -0.55));

    // floor plates + number badges + lamps (right side)
    for (let f = 0; f <= topFloor; f++) {
      const y = 0.3 + f * FLOOR_H;
      if (f > 0) {
        this.group.add(mesh(new RoundedBoxGeometry(0.5, 0.14, 1.2, 1, 0.05), toonMat('#aab3c8'), 1.62, y, 0.1, false, true));
      }
      const plate = mesh(new RoundedBoxGeometry(0.62, 0.62, 0.16, 1, 0.06), toonMat(f === topFloor ? '#ffd23e' : '#fff6e3'), 2.35, y + 0.42, 0.1, false, false);
      this.group.add(plate);
      const lamp = mesh(
        new THREE.SphereGeometry(0.12, 10, 8),
        new THREE.MeshToonMaterial({ color: '#5a6285', emissive: '#000000', emissiveIntensity: 0 }),
        2.35, y + 0.95, 0.1, false, false,
      );
      this.group.add(lamp);
      this.floorLamps.push(lamp);
      // floor number as simple stacked dots (f dots — readable pre-readers)
      for (let d = 0; d < f; d++) {
        this.group.add(mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.06, 8), toonMat('#16225c'),
          2.35 - 0.18 + (d % 2) * 0.36, y + 0.3 + Math.floor(d / 2) * 0.24, 0.19, false, false));
      }
    }

    // the platform + berry basket
    this.platform = new THREE.Group();
    this.platform.add(mesh(new RoundedBoxGeometry(1.9, 0.22, 1.5, 2, 0.08), toonMat('#ffb020'), 0, 0, 0.1));
    this.platform.add(mesh(new RoundedBoxGeometry(2.1, 0.5, 0.2, 1, 0.06), toonMat('#e8a010'), 0, 0.18, -0.62));
    const basket = new THREE.Group();
    basket.add(mesh(new THREE.CylinderGeometry(0.5, 0.38, 0.5, 14), toonMat('#c9843c'), 0, 0.36, 0));
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * Math.PI * 2;
      basket.add(mesh(new THREE.SphereGeometry(0.13, 10, 8), toonMat('#e8384f'),
        Math.cos(a) * 0.2, 0.62 + (i % 2) * 0.1, Math.sin(a) * 0.2, false, false));
    }
    basket.position.set(0, 0.1, 0.15);
    this.platform.add(basket);
    this.platform.position.set(0, 0.55, 0);
    this.group.add(this.platform);

    // delivery bell at the top
    this.group.add(mesh(new RoundedBoxGeometry(1.2, 0.24, 0.34, 1, 0.08), toonMat('#c9843c'), -2.0, towerH + 0.2, 0.0));
    this.group.add(mesh(new RoundedBoxGeometry(0.26, 1.0, 0.34, 1, 0.08), toonMat('#c9843c'), -2.55, towerH - 0.3, 0.0));
    const bell = makeBell();
    bell.group.position.set(-1.7, towerH - 0.1, 0.05);
    this.bellDome = bell.dome;
    this.group.add(bell.group);

    this.setFloor(0, true);
  }

  /** Move the platform to a floor (snap = no animation, for resets). */
  setFloor(floor: number, snap = false): void {
    this.targetY = 0.55 + floor * FLOOR_H;
    if (snap) this.platform.position.y = this.targetY;
    for (let f = 0; f < this.floorLamps.length; f++) {
      const m = this.floorLamps[f].material as THREE.MeshToonMaterial;
      if (f === floor) {
        m.color.set('#7dee8e');
        m.emissive.set('#3ed35f');
        m.emissiveIntensity = 0.9;
      } else {
        m.color.set('#5a6285');
        m.emissive.set('#000000');
        m.emissiveIntensity = 0;
      }
    }
  }

  bump(): void {
    this.bumpT = 1;
  }

  ring(): void {
    this.ringT = 1;
  }

  reset(): void {
    this.setFloor(0, true);
    this.bumpT = 0;
    this.ringT = 0;
  }

  update(dt: number, elapsed: number): void {
    // smooth glide toward the target floor
    const dy = this.targetY - this.platform.position.y;
    this.platform.position.y += dy * Math.min(1, dt * 6);
    if (this.bumpT > 0) {
      this.bumpT = Math.max(0, this.bumpT - dt * 2);
      this.platform.position.x = Math.sin(elapsed * 26) * 0.04 * this.bumpT;
    } else {
      this.platform.position.x = 0;
    }
    if (this.ringT > 0) {
      this.ringT = Math.max(0, this.ringT - dt * 1.1);
      this.bellDome.rotation.z = Math.sin(elapsed * 18) * 0.16 * this.ringT;
    }
  }
}
