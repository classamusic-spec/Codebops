/**
 * Bubble Bay — the second 2.5D world (Phase 10).
 * Tropical docks over sparkling water: sand puzzle island, wooden dock,
 * boat, palm trees, shells, a treasure chest goal, and rising bubbles.
 */
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import type { LevelDef } from '../data/schemas/level';
import { toonMat, waterTexture } from './materials/toon';
import {
  createGroundTile, createCloud, createFlowerPatch, createRockCluster,
  createBird, updateBird, createFish,
} from './worldFactories';

export const TILE = 1.6;
export const STEP = 1.72;
export const TILE_TOP = 0.42;

function mesh(
  geo: THREE.BufferGeometry,
  mat: THREE.Material,
  x = 0, y = 0, z = 0,
  castShadow = true,
  receiveShadow = true,
): THREE.Mesh {
  const m = new THREE.Mesh(geo, mat);
  m.position.set(x, y, z);
  m.castShadow = castShadow;
  m.receiveShadow = receiveShadow;
  return m;
}

/** Cartoon palm tree with drooping fronds + coconuts. */
function createPalm(scale = 1): THREE.Group {
  const g = new THREE.Group();
  const trunk = mesh(new THREE.CylinderGeometry(0.14 * scale, 0.22 * scale, 2.2 * scale, 7), toonMat('#a06a3b'), 0, 1.1 * scale, 0);
  trunk.rotation.z = 0.12;
  g.add(trunk);
  const top = new THREE.Group();
  top.position.set(0.26 * scale, 2.2 * scale, 0);
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2;
    const frond = mesh(new THREE.SphereGeometry(0.62 * scale, 8, 6), toonMat(i % 2 ? '#3faf5a' : '#4fc46a'));
    frond.scale.set(1.35, 0.22, 0.5);
    frond.position.set(Math.cos(a) * 0.62 * scale, 0.05, Math.sin(a) * 0.62 * scale);
    frond.rotation.y = -a;
    frond.rotation.z = -0.28;
    top.add(frond);
  }
  for (let i = 0; i < 3; i++) {
    top.add(mesh(new THREE.SphereGeometry(0.11 * scale, 8, 6), toonMat('#8d5a2b'), (i - 1) * 0.18 * scale, -0.14 * scale, 0.08 * i * scale));
  }
  g.add(top);
  return g;
}

/** Treasure chest goal (closed lid, gold trim). */
function createTreasureChest(): THREE.Group {
  const g = new THREE.Group();
  const wood = toonMat('#8d5a2b');
  const woodDeep = toonMat('#6e421f');
  const gold = toonMat('#ffd23e');
  g.add(mesh(new RoundedBoxGeometry(0.95, 0.55, 0.62, 3, 0.08), wood, 0, 0.28, 0));
  const lid = mesh(new THREE.CylinderGeometry(0.31, 0.31, 0.95, 12, 1, false, 0, Math.PI), woodDeep, 0, 0.55, 0);
  lid.rotation.z = Math.PI / 2;
  g.add(lid);
  for (const sx of [-0.28, 0.28]) {
    g.add(mesh(new THREE.BoxGeometry(0.08, 0.62, 0.64), gold, sx, 0.32, 0));
  }
  g.add(mesh(new RoundedBoxGeometry(0.16, 0.2, 0.1, 2, 0.03), gold, 0, 0.42, 0.32));
  return g;
}

/** Pearl resting in an open shell. */
function createPearl(): THREE.Group {
  const g = new THREE.Group();
  const shellMat = toonMat('#f7b8d9');
  const bottom = mesh(new THREE.SphereGeometry(0.26, 12, 8, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), shellMat, 0, 0.1, 0);
  bottom.scale.set(1.15, 0.7, 1);
  const top = mesh(new THREE.SphereGeometry(0.26, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2), shellMat, 0, 0.12, -0.12);
  top.scale.set(1.15, 0.7, 1);
  top.rotation.x = -0.9;
  g.add(bottom, top);
  g.add(mesh(new THREE.SphereGeometry(0.15, 14, 12), new THREE.MeshToonMaterial({ color: '#ffffff', gradientMap: null }), 0, 0.2, 0.02));
  return g;
}

/** Little wooden sailboat bobbing on the bay. */
function createBoat(): THREE.Group {
  const g = new THREE.Group();
  const hull = mesh(new RoundedBoxGeometry(2.2, 0.7, 1.0, 3, 0.2), toonMat('#b5773f'), 0, 0.35, 0);
  hull.scale.set(1, 1, 1);
  g.add(hull);
  g.add(mesh(new THREE.CylinderGeometry(0.05, 0.06, 1.9, 6), toonMat('#8d5a2b'), 0, 1.4, 0));
  const sailShape = new THREE.Shape();
  sailShape.moveTo(0, 0);
  sailShape.lineTo(0.85, 0.55);
  sailShape.lineTo(0, 1.3);
  sailShape.closePath();
  const sail = mesh(new THREE.ShapeGeometry(sailShape), new THREE.MeshToonMaterial({ color: '#fff6e3', side: THREE.DoubleSide }), 0.06, 0.9, 0, false, false);
  g.add(sail);
  const flag = mesh(new THREE.BoxGeometry(0.28, 0.16, 0.02), toonMat('#ff5fa2'), 0.15, 2.3, 0, false, false);
  g.add(flag);
  return g;
}

export class BubbleBay {
  readonly group = new THREE.Group();
  readonly itemNodes = new Map<string, THREE.Object3D>();
  readonly goalNode: THREE.Group;
  private waterTex: THREE.CanvasTexture;
  private bubbles: THREE.Points;
  private bubbleSpeeds: Float32Array;
  private boat: THREE.Group;
  private readonly clouds: THREE.Group[] = [];
  private readonly gulls: THREE.Group[] = [];
  private readonly fish: THREE.Group[] = [];
  private readonly originX: number;
  private readonly originZ: number;

  constructor(private readonly level: LevelDef) {
    this.group.name = 'bubble-bay';
    this.originX = -1.2 - ((level.cols - 1) * STEP) / 2;
    this.originZ = -0.3 - ((level.rows - 1) * STEP) / 2;

    // The bay itself — animated painted water
    this.waterTex = waterTexture();
    this.waterTex.repeat.set(5, 4);
    const seaMat = new THREE.MeshToonMaterial({ map: this.waterTex });
    const sea = new THREE.Mesh(new RoundedBoxGeometry(34, 1.4, 24, 4, 0.55), seaMat);
    sea.position.y = -0.78;
    sea.receiveShadow = true;
    this.group.add(sea);

    // Sand puzzle island
    for (let row = 0; row < level.rows; row++) {
      for (let col = 0; col < level.cols; col++) {
        const tint = (row + col) % 2 === 0 ? '#f7e3a1' : '#f2d98c';
        const tile = createGroundTile(TILE, tint);
        const p = this.cellToWorld(col, row);
        tile.position.set(p.x, TILE_TOP, p.z);
        this.group.add(tile);
      }
    }

    // Wooden dock skirting the island's front edge
    const dockZ = this.cellToWorld(0, level.rows - 1).z + STEP * 0.72;
    const plankCount = level.cols + 2;
    for (let i = 0; i < plankCount; i++) {
      const px = this.originX - STEP * 0.75 + i * (STEP * (level.cols + 0.4) / plankCount);
      this.group.add(mesh(new RoundedBoxGeometry(STEP * 0.82, 0.18, 0.9, 2, 0.05), toonMat('#b5773f'), px, 0.16, dockZ));
      this.group.add(mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.7, 6), toonMat('#8d5a2b'), px, -0.1, dockZ + 0.38));
    }

    // Items (pearls)
    for (const item of level.items) {
      if (item.kind === 'pearl') {
        const node = createPearl();
        const p = this.cellToWorld(item.col, item.row);
        node.position.set(p.x, TILE_TOP, p.z);
        this.group.add(node);
        this.itemNodes.set(item.id, node);
      }
    }

    // Treasure chest goal
    const goal = this.level.goals[0];
    this.goalNode = createTreasureChest();
    const gp = this.cellToWorld(goal.col, goal.row);
    this.goalNode.position.set(gp.x, TILE_TOP, gp.z);
    this.group.add(this.goalNode);

    // Palms framing the bay
    const palmL = createPalm(1.15);
    palmL.position.set(-5.6, 0, -1.6);
    this.group.add(palmL);
    const palmL2 = createPalm(0.85);
    palmL2.position.set(-4.6, 0, 2.6);
    palmL2.rotation.y = 1.2;
    this.group.add(palmL2);
    const palmR = createPalm(1.0);
    palmR.position.set(6.0, 0, -2.4);
    palmR.rotation.y = -0.6;
    this.group.add(palmR);

    // Boat on the right
    this.boat = createBoat();
    this.boat.position.set(4.25, -0.05, 2.55);
    this.boat.rotation.y = -0.5;
    this.group.add(this.boat);

    // Shells + rocks scattered on the sandbar
    const shells = createRockCluster(3, 1.0);
    shells.position.set(-4.9, 0, 4.2);
    this.group.add(shells);
    const flowers = createFlowerPatch(4, 1.2);
    flowers.position.set(4.4, 0, -4.2);
    this.group.add(flowers);

    // Backdrop: tropical islets + clouds
    const islets: Array<[number, number, number, number, string]> = [
      [-10, -0.5, -11, 5.5, '#7ed0b8'], [9.5, -0.6, -12, 6.5, '#8fdcae'], [0, -1.0, -14, 8, '#a7e6c3'],
    ];
    for (const [x, y, z, r, c] of islets) {
      const isl = mesh(new THREE.SphereGeometry(r, 18, 12), toonMat(c), x, y, z, false, true);
      isl.scale.y = 0.32;
      this.group.add(isl);
    }
    const cloudSpecs: Array<[number, number, number, number]> = [
      [-7, 6.6, -9, 1.3], [4.5, 7.4, -10, 1.7], [9, 6.2, -7, 1.0],
    ];
    for (const [x, y, z, s] of cloudSpecs) {
      const c = createCloud(s);
      c.position.set(x, y, z);
      this.clouds.push(c);
      this.group.add(c);
    }

    // Rising bubbles
    const count = 40;
    const pos = new Float32Array(count * 3);
    this.bubbleSpeeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 22;
      pos[i * 3 + 1] = Math.random() * 0.4;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 16;
      this.bubbleSpeeds[i] = 0.25 + Math.random() * 0.5;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const mat = new THREE.PointsMaterial({
      color: '#dff6ff', size: 0.16, transparent: true, opacity: 0.85,
      depthWrite: false, sizeAttenuation: true,
    });
    this.bubbles = new THREE.Points(geo, mat);
    this.group.add(this.bubbles);

    // Seagulls wheeling over the bay
    const gullA = createBird('#f4f7fb', 1.35);
    gullA.position.set(-8, 6.8, -7);
    this.gulls.push(gullA);
    this.group.add(gullA);
    const gullB = createBird('#e8edf6', 1.0);
    gullB.position.set(2, 7.8, -9);
    this.gulls.push(gullB);
    this.group.add(gullB);

    // Fish playing in the shallows near the dock
    const fishA = createFish('#ff8f5f', 1.0);
    fishA.userData = { cx: -3.4, cz: 4.9, r: 1.1, speed: 0.9, phase: 0 };
    this.fish.push(fishA);
    this.group.add(fishA);
    const fishB = createFish('#5fc9ff', 0.8);
    fishB.userData = { cx: 3.2, cz: 5.4, r: 0.85, speed: -1.2, phase: 2.1 };
    this.fish.push(fishB);
    this.group.add(fishB);
  }

  cellToWorld(col: number, row: number): THREE.Vector3 {
    return new THREE.Vector3(this.originX + col * STEP, TILE_TOP, this.originZ + row * STEP);
  }

  /** Mixy's lookout — the boat deck. */
  mixyLookout(): THREE.Vector3 {
    return new THREE.Vector3(4.25, 0.72, 2.55);
  }

  update(dt: number, elapsed: number): void {
    this.waterTex.offset.x = (elapsed * 0.02) % 1;
    this.waterTex.offset.y = (elapsed * 0.03) % 1;
    this.boat.position.y = -0.05 + Math.sin(elapsed * 1.1) * 0.07;
    this.boat.rotation.z = Math.sin(elapsed * 0.9) * 0.03;
    for (let i = 0; i < this.clouds.length; i++) {
      const c = this.clouds[i];
      c.position.x += dt * (0.07 + i * 0.02);
      if (c.position.x > 13) c.position.x = -13;
    }
    const attr = this.bubbles.geometry.getAttribute('position') as THREE.BufferAttribute;
    for (let i = 0; i < attr.count; i++) {
      let y = attr.getY(i) + this.bubbleSpeeds[i] * dt;
      if (y > 2.6) y = 0;
      attr.setY(i, y);
    }
    attr.needsUpdate = true;

    this.gulls.forEach((g, i) => {
      g.position.y += Math.sin(elapsed * 0.9 + i * 2.8) * dt * 0.3;
      updateBird(g, dt, elapsed, 0.9 + i * 0.35, i * 1.4, 14);
    });
    // Fish swim lazy circles, tails wiggling, half-breaking the surface
    for (const f of this.fish) {
      const u = f.userData as { cx: number; cz: number; r: number; speed: number; phase: number };
      const a = elapsed * u.speed + u.phase;
      f.position.set(u.cx + Math.cos(a) * u.r, -0.05 + Math.sin(elapsed * 2 + u.phase) * 0.03, u.cz + Math.sin(a) * u.r);
      f.rotation.y = Math.atan2(-Math.cos(a) * u.speed, -Math.sin(a) * u.speed); // face swim direction
      const tail = f.getObjectByName('tail');
      if (tail) tail.rotation.y = Math.sin(elapsed * 8 + u.phase) * 0.45;
    }
  }
}
