/**
 * Robot Town — World 4, a friendly robo-city at dusk. Brushed-metal
 * puzzle tiles, neon circuit lanes, slowly turning gears, batteries to
 * collect, charging-pad goals, and glass domes only Bolt can roll under.
 */
import * as THREE from 'three';
import type { LevelDef } from '../data/schemas/level';
import { createDrone } from './worldFactories';

export const TILE = 1.6;
export const STEP = 1.72;
export const TILE_TOP = 0.42;

function toon(color: string, emissive = '#000000', intensity = 0): THREE.MeshToonMaterial {
  return new THREE.MeshToonMaterial({ color, emissive, emissiveIntensity: intensity });
}

function mesh(geo: THREE.BufferGeometry, mat: THREE.Material, cast = true, receive = true): THREE.Mesh {
  const m = new THREE.Mesh(geo, mat);
  m.castShadow = cast;
  m.receiveShadow = receive;
  return m;
}

/** A collectable battery 🔋. */
export function createBattery(): THREE.Group {
  const g = new THREE.Group();
  const body = mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.42, 12), toon('#58d68d', '#2ecc71', 0.25));
  body.position.y = 0.26;
  g.add(body);
  const band = mesh(new THREE.CylinderGeometry(0.165, 0.165, 0.1, 12), toon('#eafaf1', '#b8ffd9', 0.5), false, false);
  band.position.y = 0.3;
  g.add(band);
  const tip = mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.08, 8), toon('#b8c4d6'));
  tip.position.y = 0.51;
  g.add(tip);
  const bolt = mesh(new THREE.OctahedronGeometry(0.09), toon('#fff7ad', '#ffd23e', 1.2), false, false);
  bolt.position.y = 0.68;
  bolt.name = 'battBolt';
  g.add(bolt);
  return g;
}

/** Charging pad — the goal ⚡. */
function createChargePad(): THREE.Group {
  const g = new THREE.Group();
  const base = mesh(new THREE.CylinderGeometry(0.62, 0.7, 0.12, 24), toon('#3d4b63'));
  base.position.y = 0.06;
  g.add(base);
  const ring = mesh(new THREE.TorusGeometry(0.46, 0.045, 8, 32), toon('#ffd23e', '#ffb700', 1.0), false, false);
  ring.rotation.x = -Math.PI / 2;
  ring.position.y = 0.13;
  g.add(ring);
  const bolt = mesh(new THREE.OctahedronGeometry(0.18), toon('#fff7ad', '#ffd23e', 1.4), false, false);
  bolt.position.y = 0.7;
  bolt.name = 'goalStar';
  g.add(bolt);
  return g;
}

/** Riveted metal floor tile. */
function createMetalTile(tint: string): THREE.Group {
  const g = new THREE.Group();
  const top = mesh(new THREE.BoxGeometry(TILE, TILE_TOP, TILE), toon(tint));
  top.position.y = -TILE_TOP / 2;
  g.add(top);
  for (const [dx, dz] of [[-0.6, -0.6], [0.6, -0.6], [-0.6, 0.6], [0.6, 0.6]] as const) {
    const rivet = mesh(new THREE.SphereGeometry(0.05, 6, 4), toon('#5b6b8c'), false, false);
    rivet.position.set(dx, 0.02, dz);
    g.add(rivet);
  }
  return g;
}

/** A big friendly gear that turns forever. */
function createGear(radius: number, color: string): THREE.Group {
  const g = new THREE.Group();
  g.add(mesh(new THREE.TorusGeometry(radius, radius * 0.28, 10, 24), toon(color)));
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    const tooth = mesh(new THREE.BoxGeometry(radius * 0.32, radius * 0.34, radius * 0.3), toon(color));
    tooth.position.set(Math.cos(a) * radius * 1.18, Math.sin(a) * radius * 1.18, 0);
    tooth.rotation.z = a;
    g.add(tooth);
  }
  const hub = mesh(new THREE.CylinderGeometry(radius * 0.3, radius * 0.3, 0.24, 12), toon('#ffd23e', '#ffb700', 0.4));
  hub.rotation.x = Math.PI / 2;
  g.add(hub);
  return g;
}

/** Distant robo-city skyline with lit windows. */
function createSkyline(): THREE.Group {
  const g = new THREE.Group();
  const specs: Array<[number, number, number, number, string]> = [
    [-9, 3.2, 2.2, -12, '#2b3a55'], [-5.5, 4.6, 2.6, -13, '#24344e'], [-1.5, 3.4, 2.0, -12.5, '#2b3a55'],
    [2.5, 5.2, 2.8, -13.5, '#24344e'], [6.5, 3.8, 2.4, -12.2, '#2b3a55'], [10, 4.4, 2.4, -13, '#24344e'],
  ];
  for (const [x, h, w, z, c] of specs) {
    const b = mesh(new THREE.BoxGeometry(w, h, w), toon(c), false, false);
    b.position.set(x, h / 2 - 0.4, z);
    g.add(b);
    // lit windows
    for (let wy = 0; wy < Math.floor(h); wy++) {
      for (let wx = 0; wx < 2; wx++) {
        if ((wy * 3 + wx + Math.round(x)) % 3 === 0) continue;
        const win = mesh(new THREE.PlaneGeometry(0.28, 0.32), toon('#ffe9a3', '#ffd23e', 0.9), false, false);
        win.position.set(x - w / 4 + wx * (w / 2.2), wy * 0.9 + 0.4, z + w / 2 + 0.01);
        g.add(win);
      }
    }
  }
  return g;
}

export class RobotTown {
  readonly group = new THREE.Group();
  readonly itemNodes = new Map<string, THREE.Object3D>();
  private gears: THREE.Group[] = [];
  private bolts: THREE.Object3D[] = [];
  private neon: THREE.MeshToonMaterial[] = [];
  private readonly drones: THREE.Group[] = [];
  private readonly puffs: THREE.Mesh[] = [];
  private beaconMat: THREE.MeshToonMaterial | null = null;
  private readonly originX: number;
  private readonly originZ: number;

  constructor(level: LevelDef) {
    this.group.name = 'robot-town';
    this.originX = -((level.cols - 1) * STEP) / 2;
    this.originZ = -((level.rows - 1) * STEP) / 2;

    // City floor
    const slab = mesh(new THREE.CylinderGeometry(16, 18, 0.6, 40), toon('#232f47'), false, true);
    slab.position.y = -0.3;
    slab.scale.z = 0.75;
    this.group.add(slab);
    this.group.add(createSkyline());

    // Metal puzzle tiles
    for (let row = 0; row < level.rows; row++) {
      for (let col = 0; col < level.cols; col++) {
        const tint = (row + col) % 2 === 0 ? '#8fa3c8' : '#8298bd';
        const tile = createMetalTile(tint);
        const p = this.cellToWorld(col, row);
        tile.position.set(p.x, TILE_TOP, p.z);
        this.group.add(tile);
      }
    }

    // Neon circuit lanes along the tile rows
    for (let row = 0; row < level.rows; row++) {
      const laneMat = toon('#54e6ff', '#54e6ff', 1.1);
      const lane = mesh(new THREE.BoxGeometry(level.cols * STEP + 0.6, 0.03, 0.09), laneMat, false, false);
      const p = this.cellToWorld((level.cols - 1) / 2, row);
      lane.position.set(p.x, TILE_TOP + 0.02, p.z + TILE / 2 + 0.12);
      this.neon.push(laneMat);
      this.group.add(lane);
    }

    // Blocked cells → chunky pipe blocks (with lazy steam puffs)
    for (const b of level.blocked) {
      const p = this.cellToWorld(b.col, b.row);
      const pipe = new THREE.Group();
      pipe.add(mesh(new THREE.CylinderGeometry(0.42, 0.5, 0.9, 14), toon('#5b6b8c')));
      const cap = mesh(new THREE.TorusGeometry(0.42, 0.07, 8, 18), toon('#ff8f5f', '#ff6b35', 0.4));
      cap.rotation.x = Math.PI / 2;
      cap.position.y = 0.45;
      pipe.add(cap);
      pipe.position.set(p.x, TILE_TOP + 0.45, p.z);
      this.group.add(pipe);
      // two steam puffs per pipe, offset in their rise cycle
      for (let k = 0; k < 2; k++) {
        const puff = new THREE.Mesh(
          new THREE.SphereGeometry(0.16, 8, 6),
          new THREE.MeshToonMaterial({ color: '#dfe9ff', transparent: true, opacity: 0 }),
        );
        puff.castShadow = puff.receiveShadow = false;
        puff.userData = { ox: p.x, oy: TILE_TOP + 0.95, oz: p.z, t: k * 0.5, speed: 0.32 + Math.random() * 0.14 };
        this.puffs.push(puff);
        this.group.add(puff);
      }
    }

    // Glass domes (zipBlocked) — Bolt rolls through, Zip bonks
    for (const zb of level.zipBlocked ?? []) {
      const p = this.cellToWorld(zb.col, zb.row);
      const dome = new THREE.Mesh(
        new THREE.SphereGeometry(0.72, 18, 12, 0, Math.PI * 2, 0, Math.PI / 2),
        new THREE.MeshToonMaterial({ color: '#bfeaff', transparent: true, opacity: 0.32, emissive: '#54c6ff', emissiveIntensity: 0.25 }),
      );
      dome.position.set(p.x, TILE_TOP, p.z);
      this.group.add(dome);
      const rim = mesh(new THREE.TorusGeometry(0.72, 0.05, 8, 28), toon('#9fd8ff', '#54c6ff', 0.8), false, false);
      rim.rotation.x = -Math.PI / 2;
      rim.position.set(p.x, TILE_TOP + 0.02, p.z);
      this.group.add(rim);
    }

    // Items: batteries
    for (const item of level.items) {
      if (item.kind === 'battery') {
        const node = createBattery();
        const p = this.cellToWorld(item.col, item.row);
        node.position.set(p.x, TILE_TOP, p.z);
        const bolt = node.getObjectByName('battBolt');
        if (bolt) this.bolts.push(bolt);
        this.group.add(node);
        this.itemNodes.set(item.id, node);
      }
    }

    // Charging-pad goals (all of them)
    for (const goal of level.goals) {
      const pad = createChargePad();
      const gp = this.cellToWorld(goal.col, goal.row);
      pad.position.set(gp.x, TILE_TOP, gp.z);
      const star = pad.getObjectByName('goalStar');
      if (star) this.bolts.push(star);
      this.group.add(pad);
    }

    // Gears on the skyline + beside the board
    const gearSpecs: Array<[number, number, number, number, string]> = [
      [-6.8, 2.6, -5.5, 1.1, '#3d5a80'], [7.2, 3.4, -6, 1.4, '#5b6b8c'], [-7.6, 1.4, 2.5, 0.7, '#4a6fa5'],
    ];
    for (const [x, y, z, s, c] of gearSpecs) {
      const gear = createGear(s, c);
      gear.position.set(x, y, z);
      this.gears.push(gear);
      this.group.add(gear);
    }

    // Mixy's lookout — a rooftop perch
    const perch = mesh(new THREE.BoxGeometry(1.4, 1.1, 1.4), toon('#3d4b63'));
    perch.position.set(4.9, 0.55, -1.8);
    this.group.add(perch);
    const antenna = mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.9, 6), toon('#9fb4d8'));
    antenna.position.set(4.9, 1.55, -1.8);
    this.group.add(antenna);
    const beaconMat = toon('#ff5fa2', '#ff5fa2', 1.2);
    const beacon = mesh(new THREE.SphereGeometry(0.09, 8, 6), beaconMat, false, false);
    beacon.position.set(4.9, 2.0, -1.8);
    this.beaconMat = beaconMat;
    this.group.add(beacon);

    // Two patrol drones circling the board
    const droneA = createDrone(1);
    droneA.userData = { cx: 0, cz: 0, r: 5.6, h: 3.4, speed: 0.42, phase: 0 };
    this.drones.push(droneA);
    this.group.add(droneA);
    const droneB = createDrone(0.75);
    droneB.userData = { cx: 0.8, cz: -0.4, r: 4.2, h: 2.6, speed: -0.55, phase: 2.4 };
    this.drones.push(droneB);
    this.group.add(droneB);
  }

  cellToWorld(col: number, row: number): THREE.Vector3 {
    return new THREE.Vector3(this.originX + col * STEP, TILE_TOP, this.originZ + row * STEP);
  }

  /** Mixy's rooftop perch. */
  mixyLookout(): THREE.Vector3 {
    return new THREE.Vector3(4.9, 1.15, -1.8);
  }

  update(dt: number, elapsed: number): void {
    for (let i = 0; i < this.gears.length; i++) {
      this.gears[i].rotation.z += dt * (i % 2 === 0 ? 0.5 : -0.35);
    }
    for (const b of this.bolts) {
      b.rotation.y += dt * 1.8;
    }
    const pulse = 0.75 + Math.sin(elapsed * 2.4) * 0.35;
    for (const m of this.neon) m.emissiveIntensity = pulse;

    // Drones circle lazily, rotors whirring
    for (const d of this.drones) {
      const u = d.userData as { cx: number; cz: number; r: number; h: number; speed: number; phase: number };
      const a = elapsed * u.speed + u.phase;
      d.position.set(u.cx + Math.cos(a) * u.r, u.h + Math.sin(elapsed * 1.5 + u.phase) * 0.16, u.cz + Math.sin(a) * u.r);
      d.rotation.y = Math.atan2(-Math.cos(a) * u.speed, -Math.sin(a) * u.speed);
      const rotor = d.getObjectByName('rotor');
      if (rotor) rotor.rotation.z += dt * 18;
    }

    // Steam puffs rise, swell, fade, respawn
    for (const puff of this.puffs) {
      const u = puff.userData as { ox: number; oy: number; oz: number; t: number; speed: number };
      u.t = (u.t + dt * u.speed) % 1;
      puff.position.set(u.ox + Math.sin(u.t * Math.PI * 2) * 0.08, u.oy + u.t * 1.1, u.oz);
      puff.scale.setScalar(0.5 + u.t * 1.4);
      (puff.material as THREE.MeshToonMaterial).opacity = u.t < 0.15 ? u.t / 0.15 * 0.5 : 0.5 * (1 - u.t);
    }

    // Beacon blinks
    if (this.beaconMat) this.beaconMat.emissiveIntensity = 0.7 + (Math.sin(elapsed * 3.4) > 0 ? 0.9 : 0.1);
  }
}
