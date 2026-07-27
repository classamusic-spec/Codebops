/**
 * MotorRig — the Phase 2 hero machine: a toy motor driving one big gear,
 * with every piece of machine state visible at a glance (spec §7):
 *
 *   ON/OFF   → dome power lamp (green glow / grey) + spinning
 *   DIRECTION→ big arrow badge over the gear, flips with cw/ccw
 *   SPEED    → gauge with a needle (Slow / Medium / Fast) + spin rate
 *
 * Rendering VISUALIZES state — gameplay state lives in machine.ts.
 */
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { toonMat } from '../materials/toon';
import { createGear } from './gearMesh';
import type { MotorDir, MotorSpeed } from '../../gameplay/gearworks/machine';

function mesh(geo: THREE.BufferGeometry, mat: THREE.Material, x = 0, y = 0, z = 0, cast = true, receive = true): THREE.Mesh {
  const m = new THREE.Mesh(geo, mat);
  m.position.set(x, y, z);
  m.castShadow = cast;
  m.receiveShadow = receive;
  return m;
}

export class MotorRig {
  readonly group = new THREE.Group();
  private readonly gear: THREE.Group;
  private readonly lamp: THREE.Mesh;
  private readonly needle: THREE.Group;
  private readonly arrow: THREE.Group;
  /** Pulley on the gauge end of the drive, so power visibly reaches it. */
  private takeoff!: THREE.Group;
  private on = false;
  private dir: MotorDir = 'cw';
  private speed: MotorSpeed = 2;
  /** Extra spin burst while a WAIT step plays (the machine "working"). */
  private workBoost = 0;

  constructor() {
    this.group.name = 'motor-rig';

    // ---- base plate ----
    this.group.add(mesh(new RoundedBoxGeometry(7.4, 0.3, 2.4, 2, 0.1), toonMat('#1b2664'), 0, 0.15, 0));

    // ---- motor body ----
    const motor = new THREE.Group();
    motor.add(mesh(new RoundedBoxGeometry(2.1, 1.6, 1.4, 3, 0.24), toonMat('#2f6fe0'), 0, 1.05, 0));
    motor.add(mesh(new THREE.CylinderGeometry(0.62, 0.68, 0.5, 18), toonMat('#4a8cf0'), 0, 2.0, 0, true, false));
    // lightning badge
    const boltShape = new THREE.Shape();
    boltShape.moveTo(0.09, 0.3); boltShape.lineTo(-0.12, -0.02); boltShape.lineTo(0.0, -0.02);
    boltShape.lineTo(-0.09, -0.3); boltShape.lineTo(0.14, 0.06); boltShape.lineTo(0.02, 0.06);
    boltShape.closePath();
    const bolt = new THREE.Mesh(new THREE.ExtrudeGeometry(boltShape, { depth: 0.05, bevelEnabled: false }), toonMat('#ffd23e'));
    bolt.scale.setScalar(1.6);
    bolt.position.set(0, 1.05, 0.74);
    motor.add(bolt);
    // snout axle toward the gear
    const snout = mesh(new THREE.CylinderGeometry(0.2, 0.2, 1.0, 12), toonMat('#aab3c8'), 1.55, 1.05, 0);
    snout.rotation.z = Math.PI / 2;
    motor.add(snout);
    // power lamp dome
    this.lamp = mesh(
      new THREE.SphereGeometry(0.26, 14, 10),
      new THREE.MeshToonMaterial({ color: '#8a94ad', emissive: '#000000', emissiveIntensity: 0 }),
      -0.6, 2.05, 0.35, false, false,
    );
    motor.add(this.lamp);
    motor.position.set(-2.2, 0.3, 0);
    this.group.add(motor);

    // ---- the big gear on a stand ----
    const stand = mesh(new RoundedBoxGeometry(0.44, 1.5, 0.6, 1, 0.1), toonMat('#39406e'), 0.9, 1.0, -0.25);
    this.group.add(stand);
    this.gear = createGear({ color: '#ff9f2e', radius: 1.15, teeth: 14 });
    this.gear.position.set(0.9, 1.75, 0.12);
    this.group.add(this.gear);

    // ---- direction arrow badge (flips for ccw) ----
    this.arrow = new THREE.Group();
    const arc = new THREE.Mesh(
      new THREE.TorusGeometry(0.52, 0.09, 8, 24, Math.PI * 1.2),
      new THREE.MeshToonMaterial({ color: '#ffffff', emissive: '#7fc4ff', emissiveIntensity: 0.3 }),
    );
    this.arrow.add(arc);
    const tip = new THREE.Mesh(new THREE.ConeGeometry(0.2, 0.42, 10), arc.material);
    tip.position.set(Math.cos(Math.PI * 1.2) * 0.52, Math.sin(Math.PI * 1.2) * 0.52, 0);
    tip.rotation.z = Math.PI * 1.2 - Math.PI / 2;
    this.arrow.add(tip);
    this.arrow.position.set(0.9, 3.16, 0.1);
    this.arrow.scale.x = -1; // cw reading for a viewer
    this.group.add(this.arrow);

    // ---- speed gauge (half-disc dial facing the camera) ----
    const gauge = new THREE.Group();
    const face = new THREE.Mesh(new THREE.CircleGeometry(0.62, 24, 0, Math.PI), toonMat('#fff6e3'));
    face.castShadow = false;
    gauge.add(face);
    const rim = new THREE.Mesh(new THREE.TorusGeometry(0.62, 0.07, 8, 24, Math.PI), toonMat('#39406e'));
    gauge.add(rim);
    // tick marks: slow / medium / fast
    for (const [angle, color] of [[Math.PI * 0.83, '#57c14e'], [Math.PI * 0.5, '#ffd23e'], [Math.PI * 0.17, '#e8384f']] as const) {
      const tick = mesh(new RoundedBoxGeometry(0.1, 0.2, 0.06, 1, 0.02), toonMat(color), Math.cos(angle) * 0.48, Math.sin(angle) * 0.48, 0.06, false, false);
      tick.rotation.z = angle - Math.PI / 2;
      gauge.add(tick);
    }
    this.needle = new THREE.Group();
    const nd = mesh(new RoundedBoxGeometry(0.07, 0.5, 0.05, 1, 0.02), toonMat('#16225c'), 0, 0.22, 0, false, false);
    this.needle.add(nd);
    this.needle.add(mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.08, 10), toonMat('#16225c'), 0, 0, 0.02, false, false));
    this.needle.position.z = 0.06;
    gauge.add(this.needle);
    const gaugeMount = new THREE.Group();
    gaugeMount.add(gauge);
    gauge.rotation.x = 0; // face the camera
    gaugeMount.position.set(3.15, 1.15, 0.2);
    gaugeMount.add(mesh(new RoundedBoxGeometry(1.5, 0.9, 0.3, 2, 0.08), toonMat('#2c3f8f'), 0, -0.32, -0.12));
    this.group.add(gaugeMount);

    // ---- the drive link from the gear to the gauge ----
    //
    // Without this the gauge is a dial sitting on the bench near a gear,
    // and a child watching the needle move has no reason to believe the
    // gear moved it. The chain has to be visible end to end:
    //
    //     motor -> snout -> GEAR -> takeoff pulley -> shaft -> gauge
    //
    // The pulley turns with the gear, so the eye can follow motion along
    // the whole run rather than seeing two things happen separately.
    this.takeoff = new THREE.Group();
    this.takeoff.add(mesh(new THREE.CylinderGeometry(0.34, 0.34, 0.26, 16), toonMat('#c8d2e8'), 0, 0, 0, true, false));
    this.takeoff.add(mesh(new THREE.TorusGeometry(0.34, 0.05, 8, 18), toonMat('#8a94ad'), 0, 0, 0.15, false, false));
    (this.takeoff.children[0] as THREE.Mesh).rotation.x = Math.PI / 2;
    this.takeoff.position.set(2.12, 1.5, 0.12);
    this.group.add(this.takeoff);

    const shaft = mesh(new THREE.CylinderGeometry(0.13, 0.13, 1.0, 12), toonMat('#aab3c8'), 2.62, 1.5, 0.12);
    shaft.rotation.z = Math.PI / 2;
    this.group.add(shaft);
    // A collar where the shaft meets the dial housing, so the join reads
    // as a fitting rather than as two shapes that happen to touch.
    this.group.add(mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.18, 12), toonMat('#39406e'), 3.1, 1.5, 0.12, false, false));
    (this.group.children[this.group.children.length - 1] as THREE.Mesh).rotation.z = Math.PI / 2;

    this.applySpeedNeedle();
    this.applyLamp();
  }

  setOn(on: boolean): void {
    this.on = on;
    this.applyLamp();
  }

  setDir(dir: MotorDir): void {
    this.dir = dir;
    this.arrow.scale.x = dir === 'cw' ? -1 : 1;
  }

  setSpeed(speed: MotorSpeed): void {
    this.speed = speed;
    this.applySpeedNeedle();
  }

  reset(): void {
    this.setOn(false);
    this.setDir('cw');
    this.setSpeed(2);
    this.workBoost = 0;
  }

  /** A WAIT step is playing — the machine visibly works hard. */
  workPulse(): void {
    this.workBoost = 1;
  }

  /** Discover beat: tapping the machine gives it a friendly nudge. */
  tapNudge(): void {
    this.workBoost = Math.max(this.workBoost, 0.55);
  }

  private applyLamp(): void {
    const mat = this.lamp.material as THREE.MeshToonMaterial;
    if (this.on) {
      mat.color.set('#7dee8e');
      mat.emissive.set('#3ed35f');
      mat.emissiveIntensity = 1.0;
    } else {
      mat.color.set('#8a94ad');
      mat.emissive.set('#000000');
      mat.emissiveIntensity = 0;
    }
  }

  private applySpeedNeedle(): void {
    // gauge angles: slow left → fast right
    const angle = this.speed === 1 ? Math.PI * 0.33 : this.speed === 2 ? 0 : -Math.PI * 0.33;
    this.needle.rotation.z = angle;
  }

  update(dt: number): void {
    const idle = this.on ? 1 : 0;
    const rate = (idle * this.speed * 1.4 + this.workBoost * this.speed * 3.2) * (this.dir === 'cw' ? -1 : 1);
    this.gear.rotation.z += dt * rate;
    // The takeoff pulley turns WITH the gear — faster, because it is
    // smaller, which is also the first gearing lesson in this world. A
    // link that does not move is scenery; a link that moves is the reason
    // the needle moves.
    this.takeoff.rotation.z += dt * rate * (1.15 / 0.34);
    this.workBoost = Math.max(0, this.workBoost - dt * 1.4);
    // lamp breathing while on
    if (this.on) {
      const mat = this.lamp.material as THREE.MeshToonMaterial;
      mat.emissiveIntensity = 0.85 + Math.sin(performance.now() / 240) * 0.2;
    }
  }
}
