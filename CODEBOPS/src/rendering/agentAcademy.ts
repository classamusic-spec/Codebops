/**
 * Agent Academy — World 5, a sunny training campus. Chalk-marked courtyard
 * tiles, a columned academy hall behind, swaying bunting, golden badge
 * pickups, training-cone obstacles, and a big shiny trophy podium goal.
 */
import * as THREE from 'three';
import type { LevelDef } from '../data/schemas/level';
import { createMushroom } from './patternForest';

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

/** A golden training badge 🎖️. */
export function createBadge(): THREE.Group {
  const g = new THREE.Group();
  const ribbon = mesh(new THREE.ConeGeometry(0.12, 0.22, 4), toon('#ff5f6b'), false, false);
  ribbon.rotation.z = Math.PI;
  ribbon.position.y = 0.1;
  g.add(ribbon);
  const medal = mesh(new THREE.CylinderGeometry(0.17, 0.17, 0.06, 20), toon('#ffd23e', '#ffb700', 0.35));
  medal.rotation.x = Math.PI / 2;
  medal.position.y = 0.34;
  g.add(medal);
  const star = mesh(new THREE.OctahedronGeometry(0.09), toon('#fff7ad', '#ffd23e', 0.9), false, false);
  star.position.set(0, 0.34, 0.05);
  g.add(star);
  return g;
}

/** Trophy podium — the goal 🏆. */
function createPodium(): THREE.Group {
  const g = new THREE.Group();
  const base = mesh(new THREE.CylinderGeometry(0.6, 0.68, 0.22, 24), toon('#4a5fc9'));
  base.position.y = 0.11;
  g.add(base);
  const trim = mesh(new THREE.TorusGeometry(0.6, 0.035, 8, 32), toon('#ffd23e', '#ffb700', 0.7), false, false);
  trim.rotation.x = -Math.PI / 2;
  trim.position.y = 0.23;
  g.add(trim);
  // the trophy
  const cup = mesh(new THREE.SphereGeometry(0.2, 14, 10, 0, Math.PI * 2, 0, Math.PI / 1.8), toon('#ffd23e', '#ffb700', 0.45));
  cup.scale.set(1, 0.9, 1);
  cup.rotation.x = Math.PI;
  cup.position.y = 0.62;
  g.add(cup);
  const stem = mesh(new THREE.CylinderGeometry(0.05, 0.08, 0.16, 8), toon('#ffb700', '#ff9f1c', 0.3));
  stem.position.y = 0.5;
  g.add(stem);
  const foot = mesh(new THREE.CylinderGeometry(0.14, 0.16, 0.06, 12), toon('#b7791f'));
  foot.position.y = 0.26;
  g.add(foot);
  for (const side of [-1, 1] as const) {
    const handle = mesh(new THREE.TorusGeometry(0.1, 0.025, 6, 14, Math.PI), toon('#ffd23e', '#ffb700', 0.3), false, false);
    handle.position.set(side * 0.2, 0.66, 0);
    handle.rotation.z = side * Math.PI / 2;
    g.add(handle);
  }
  const star = mesh(new THREE.OctahedronGeometry(0.13), toon('#fff7ad', '#ffd23e', 1.5), false, false);
  star.position.y = 1.05;
  star.name = 'goalStar';
  g.add(star);
  return g;
}

/** Academy hall facade with columns + banner. */
function createHall(): THREE.Group {
  const g = new THREE.Group();
  const wall = mesh(new THREE.BoxGeometry(11, 3.6, 1), toon('#f2e3c6'), false, false);
  wall.position.set(0, 1.8, -8.6);
  g.add(wall);
  const roof = mesh(new THREE.ConeGeometry(6.6, 1.6, 4), toon('#e2725b'), false, false);
  roof.rotation.y = Math.PI / 4;
  roof.scale.z = 0.28;
  roof.position.set(0, 4.4, -8.6);
  g.add(roof);
  for (let i = -2; i <= 2; i++) {
    const col = mesh(new THREE.CylinderGeometry(0.28, 0.32, 3.4, 12), toon('#fbf3e0'), false, false);
    col.position.set(i * 2.1, 1.7, -8.0);
    g.add(col);
  }
  const door = mesh(new THREE.BoxGeometry(1.6, 2.2, 0.2), toon('#7a4f2b'), false, false);
  door.position.set(0, 1.1, -7.95);
  g.add(door);
  // banner
  const banner = mesh(new THREE.BoxGeometry(3.4, 0.7, 0.08), toon('#4a5fc9', '#2f3fa0', 0.25), false, false);
  banner.position.set(0, 3.1, -7.9);
  g.add(banner);
  const a = mesh(new THREE.OctahedronGeometry(0.26), toon('#ffd23e', '#ffb700', 0.8), false, false);
  a.position.set(0, 3.1, -7.8);
  g.add(a);
  return g;
}

/** Bunting line of little swaying flags between two poles. */
function createBunting(y: number, z: number, width: number): THREE.Group {
  const g = new THREE.Group();
  const lineGeo = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(-width / 2, y + 0.3, z), new THREE.Vector3(width / 2, y + 0.3, z),
  ]);
  g.add(new THREE.Line(lineGeo, new THREE.LineBasicMaterial({ color: '#8a5a2b' })));
  const colors = ['#ff5f6b', '#ffd23e', '#4a5fc9', '#3ec6d8', '#ff8fb0'];
  for (let i = 0; i < 9; i++) {
    const flag = mesh(new THREE.ConeGeometry(0.16, 0.34, 4), toon(colors[i % colors.length]), false, false);
    flag.rotation.z = Math.PI;
    flag.position.set(-width / 2 + (i + 0.5) * (width / 9), y + 0.12, z);
    flag.name = 'bunt';
    g.add(flag);
  }
  return g;
}

/** Training cone (blocked cell). */
function createCone(): THREE.Group {
  const g = new THREE.Group();
  const cone = mesh(new THREE.ConeGeometry(0.34, 0.8, 14), toon('#ff8f3d'));
  cone.position.y = 0.4;
  g.add(cone);
  const stripe = mesh(new THREE.CylinderGeometry(0.2, 0.24, 0.12, 14), toon('#fff3e0'), false, false);
  stripe.position.y = 0.42;
  g.add(stripe);
  const base = mesh(new THREE.BoxGeometry(0.66, 0.08, 0.66), toon('#e2722b'));
  base.position.y = 0.04;
  g.add(base);
  return g;
}

export class AgentAcademy {
  readonly group = new THREE.Group();
  readonly itemNodes = new Map<string, THREE.Object3D>();
  private goalStars: THREE.Object3D[] = [];
  private buntFlags: THREE.Object3D[] = [];
  private birds = new THREE.Group();
  private flags: THREE.Object3D[] = [];
  private readonly originX: number;
  private readonly originZ: number;

  constructor(level: LevelDef) {
    this.group.name = 'agent-academy';
    this.originX = -((level.cols - 1) * STEP) / 2;
    this.originZ = -((level.rows - 1) * STEP) / 2;

    // Lawn + running-track ring around the courtyard
    const lawn = mesh(new THREE.CylinderGeometry(16, 18, 0.6, 40), toon('#7cc25e'), false, true);
    lawn.position.y = -0.3;
    lawn.scale.z = 0.75;
    this.group.add(lawn);
    const track = mesh(new THREE.RingGeometry(6.9, 8.6, 40), toon('#e2725b'), false, true);
    track.rotation.x = -Math.PI / 2;
    track.position.y = 0.02;
    track.scale.y = 0.75;
    this.group.add(track);

    this.group.add(createHall());
    const bunt = createBunting(3.0, -5.2, 12);
    bunt.traverse((o) => { if (o.name === 'bunt') this.buntFlags.push(o); });
    this.group.add(bunt);

    // Courtyard tiles with chalk marks
    for (let row = 0; row < level.rows; row++) {
      for (let col = 0; col < level.cols; col++) {
        const even = (row + col) % 2 === 0;
        const tile = new THREE.Group();
        const top = mesh(new THREE.BoxGeometry(TILE, TILE_TOP, TILE), toon(even ? '#f2e3c6' : '#ecd9b6'));
        top.position.y = -TILE_TOP / 2;
        tile.add(top);
        const chalk = mesh(new THREE.RingGeometry(0.42, 0.5, 24), toon('#ffffff', '#ffffff', 0.15), false, false);
        chalk.rotation.x = -Math.PI / 2;
        chalk.position.y = 0.012;
        tile.add(chalk);
        const p = this.cellToWorld(col, row);
        tile.position.set(p.x, TILE_TOP, p.z);
        this.group.add(tile);
      }
    }

    // Training cones
    for (const b of level.blocked) {
      const p = this.cellToWorld(b.col, b.row);
      const cone = createCone();
      cone.position.set(p.x, TILE_TOP, p.z);
      this.group.add(cone);
    }

    // Items: badges + decoy mushrooms
    for (const item of level.items) {
      const node = item.kind === 'badge' ? createBadge() : createMushroom(1);
      const p = this.cellToWorld(item.col, item.row);
      node.position.set(p.x, TILE_TOP, p.z);
      this.group.add(node);
      this.itemNodes.set(item.id, node);
    }

    // Trophy podiums (all goals)
    for (const goal of level.goals) {
      const podium = createPodium();
      const gp = this.cellToWorld(goal.col, goal.row);
      podium.position.set(gp.x, TILE_TOP, gp.z);
      const star = podium.getObjectByName('goalStar');
      if (star) this.goalStars.push(star);
      this.group.add(podium);
    }

    // Corner flags on the lawn
    for (const [x, z] of [[-6.4, -2.8], [6.4, -2.8], [-6.4, 3.2], [6.4, 3.2]] as const) {
      const pole = mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.7, 6), toon('#8a5a2b'), false, false);
      pole.position.set(x, 0.85, z);
      this.group.add(pole);
      const flag = mesh(new THREE.PlaneGeometry(0.55, 0.34), toon('#4a5fc9', '#2f3fa0', 0.2), false, false);
      flag.position.set(x + 0.28, 1.5, z);
      flag.name = 'cornerFlag';
      this.flags.push(flag);
      this.group.add(flag);
    }

    // Mixy's lookout — on the hall steps
    const steps = mesh(new THREE.BoxGeometry(2.2, 0.5, 1), toon('#e8d5ae'), false, false);
    steps.position.set(5.2, 0.25, -5.6);
    this.group.add(steps);

    // Distant birds
    for (let i = 0; i < 2; i++) {
      const bird = new THREE.Group();
      const body = mesh(new THREE.ConeGeometry(0.09, 0.3, 6), toon('#4a4a68'), false, false);
      body.rotation.x = Math.PI / 2;
      bird.add(body);
      for (const side of [-1, 1] as const) {
        const wing = mesh(new THREE.PlaneGeometry(0.42, 0.16), toon('#4a4a68'), false, false);
        wing.position.x = side * 0.22;
        wing.name = side < 0 ? 'wl' : 'wr';
        bird.add(wing);
      }
      bird.position.set(i * 4 - 2, 5.5 + i, -9.5);
      this.birds.add(bird);
    }
    this.group.add(this.birds);
  }

  cellToWorld(col: number, row: number): THREE.Vector3 {
    return new THREE.Vector3(this.originX + col * STEP, TILE_TOP, this.originZ + row * STEP);
  }

  /** Mixy watches from the hall steps. */
  mixyLookout(): THREE.Vector3 {
    return new THREE.Vector3(5.2, 0.55, -5.6);
  }

  update(dt: number, elapsed: number): void {
    for (const s of this.goalStars) {
      s.rotation.y += dt * 1.8;
      s.position.y = 1.05 + Math.sin(elapsed * 2.2) * 0.07;
    }
    this.buntFlags.forEach((f, i) => {
      f.rotation.y = Math.sin(elapsed * 1.8 + i * 0.7) * 0.35;
    });
    this.flags.forEach((f, i) => {
      f.rotation.y = Math.sin(elapsed * 2.2 + i * 1.3) * 0.3;
    });
    // birds glide across the sky
    this.birds.children.forEach((bird, i) => {
      bird.position.x += dt * (0.8 + i * 0.3);
      if (bird.position.x > 10) bird.position.x = -10;
      const wl = bird.getObjectByName('wl');
      const wr = bird.getObjectByName('wr');
      const flap = Math.sin(elapsed * 6 + i) * 0.5;
      if (wl) wl.rotation.y = flap;
      if (wr) wr.rotation.y = -flap;
    });
  }
}
