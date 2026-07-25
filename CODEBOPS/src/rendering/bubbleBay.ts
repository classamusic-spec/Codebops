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
  createGrassTuft, createGroundDetail, createButterfly, updateButterfly, WindField,
} from './worldFactories';

export const TILE = 1.68;
export const STEP = 1.78;
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
  private readonly butterflies: THREE.Group[] = [];
  private readonly buoys: THREE.Group[] = [];
  private readonly wind = new WindField();
  private readonly originX: number;
  private readonly originZ: number;
  /** The boat Mixy stands on, derived from the board — see sparkleMeadow. */
  private readonly perch: THREE.Vector3;

  constructor(private readonly level: LevelDef) {
    this.group.name = 'bubble-bay';
    // Centred board: the room on the right now comes from moving the boat
    // and the palms, not from shoving the puzzle left.
    this.originX = -((level.cols - 1) * STEP) / 2;
    this.originZ = -((level.rows - 1) * STEP) / 2;
    const boardRight = this.originX + (level.cols - 1) * STEP;
    const boardMidZ = this.originZ + ((level.rows - 1) * STEP) / 2;
    this.perch = new THREE.Vector3(boardRight + STEP * 0.98, 0.72, boardMidZ + STEP * 0.28);

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

    // ---- palms: back and far sides, never in front of the board ----
    // A palm used to stand at (-4.6, 2.6) — front-left, level with the
    // island — which crowded the lower-left of the shot. Fronds now sit
    // behind the island's front edge so the sandbar reads clear.
    const palmSpecs: Array<[number, number, number, number]> = [
      [-5.9, -1.6, 1.15, 0],
      [-6.8, -5.2, 0.95, 0.8],
      [-4.2, -7.4, 0.8, -0.4],
      [this.perch.x + 2.1, -2.4, 1.0, -0.6],
      [this.perch.x + 3.0, -6.4, 0.85, 0.3],
      [-8.4, 1.4, 0.9, 1.5],
    ];
    for (const [x, z, scale, ry] of palmSpecs) {
      const palm = createPalm(scale);
      palm.position.set(x, 0, z);
      palm.rotation.y = ry;
      this.group.add(palm);
      this.wind.add(palm, 0.03);
    }

    // Boat on the right — Mixy's deck, now beside the island
    this.boat = createBoat();
    this.boat.position.set(this.perch.x, -0.05, this.perch.z);
    this.boat.rotation.y = -0.5;
    this.group.add(this.boat);

    // ---- sandbar dressing: the anti-negative-space pass ----
    for (const [x, z, n, spread] of [
      [-4.9, 4.2, 3, 1.0], [3.9, 4.8, 3, 1.2], [-2.4, 6.6, 2, 0.9], [5.4, -1.4, 2, 0.8],
    ] as Array<[number, number, number, number]>) {
      const rocks = createRockCluster(n, spread);
      rocks.position.set(x, 0, z);
      this.group.add(rocks);
    }
    for (const [x, z, n] of [
      [4.4, -4.2, 4], [-6.2, 2.6, 5], [-1.6, -6.8, 4],
    ] as Array<[number, number, number]>) {
      const flowers = createFlowerPatch(n, 1.4);
      flowers.position.set(x, 0, z);
      this.group.add(flowers);
      this.wind.addChildren(flowers, 0.07);
    }
    // Seaweed, but only hugging the island — a tuft of grass standing in
    // open water reads as a mistake, so these stay on the shallow shelf.
    for (const [x, z, scale] of [
      [-3.2, 2.6, 0.9], [1.9, 3.0, 0.95], [-2.0, -2.6, 0.85], [2.6, -2.4, 0.8],
    ] as Array<[number, number, number]>) {
      const weed = createGrassTuft(scale, '#4fae86');
      weed.position.set(x, 0, z);
      this.group.add(weed);
      this.wind.addChildren(weed, 0.14);
    }
    // Foam and ripple flecks rather than pebbles: the same anti-empty pass
    // as the meadow, in the only material the bay actually has.
    for (const [x, z, n, spread] of [
      [-2.5, 5.0, 16, 7], [2.6, 5.6, 14, 6], [0, 8.4, 14, 9], [-5.8, -3.4, 10, 6],
      [4.4, 2.4, 10, 5],
    ] as Array<[number, number, number, number]>) {
      const foam = createGroundDetail(n, spread, ['#bfeaff', '#a8dff5', '#dff6ff']);
      foam.position.set(x, 0.02, z);
      this.group.add(foam);
    }
    // Mooring buoys bobbing in the shallows.
    for (const [x, z, color] of [
      [-3.9, 5.8, '#ff8f5f'], [3.4, 6.6, '#ffd23e'], [-1.4, 8.6, '#7dd7ff'],
    ] as Array<[number, number, string]>) {
      const buoy = new THREE.Group();
      buoy.add(mesh(new THREE.SphereGeometry(0.3, 12, 10), toonMat(color), 0, 0.16, 0));
      buoy.add(mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.34, 6), toonMat('#3d4b63'), 0, 0.5, 0, false, false));
      buoy.position.set(x, 0, z);
      buoy.userData.bob = Math.random() * Math.PI * 2;
      this.buoys.push(buoy);
      this.group.add(buoy);
    }

    // ---- the portrait back-fill (see sparkleMeadow) ----
    for (const [x, z, scale, ry] of [
      [-2.8, -5.6, 1.05, 0.4], [0.6, -6.4, 1.15, -0.7], [3.0, -5.4, 1.0, 1.1],
      [-1.3, -8.0, 0.85, 0.2], [2.1, -8.8, 0.8, -0.3],
    ] as Array<[number, number, number, number]>) {
      const palm = createPalm(scale);
      palm.position.set(x, 0, z);
      palm.rotation.y = ry;
      this.group.add(palm);
      this.wind.add(palm, 0.028);
    }
    for (const [x, z, n, spread] of [
      [-2.2, -6.6, 3, 1.1], [1.8, -6.9, 2, 0.9], [-0.6, 8.0, 3, 1.2], [2.6, 7.4, 2, 1.0],
    ] as Array<[number, number, number, number]>) {
      const rocks = createRockCluster(n, spread);
      rocks.position.set(x, 0, z);
      this.group.add(rocks);
    }
    for (const [x, z, scale] of [
      [-2.6, 3.6, 0.95], [2.2, 3.8, 0.9], [-0.4, 8.6, 1.0], [-2.9, -7.6, 0.85],
    ] as Array<[number, number, number]>) {
      const tuft = createGrassTuft(scale, '#7bc98f');
      tuft.position.set(x, 0, z);
      this.group.add(tuft);
      this.wind.addChildren(tuft, 0.11);
    }

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
    const fishC = createFish('#ffd23e', 0.7);
    fishC.userData = { cx: -0.4, cz: 6.6, r: 1.3, speed: 0.7, phase: 4.2 };
    this.fish.push(fishC);
    this.group.add(fishC);

    // Dragonflies over the shallows — the beach equivalent of butterflies.
    for (const [x, y, z, color] of [
      [-3.0, 0.95, 3.8, '#7dd7ff'], [3.4, 1.1, 3.2, '#c79bff'],
    ] as Array<[number, number, number, string]>) {
      const b = createButterfly(color, 0.9);
      (b.userData.home as THREE.Vector3).set(x, y, z);
      b.position.set(x, y, z);
      this.butterflies.push(b);
      this.group.add(b);
    }
  }

  cellToWorld(col: number, row: number): THREE.Vector3 {
    return new THREE.Vector3(this.originX + col * STEP, TILE_TOP, this.originZ + row * STEP);
  }

  /** Mixy's lookout — the boat deck, right of the board and always in frame. */
  mixyLookout(): THREE.Vector3 {
    return this.perch.clone();
  }

  update(dt: number, elapsed: number, windStrength = 1): void {
    this.waterTex.offset.x = (elapsed * 0.02) % 1;
    this.waterTex.offset.y = (elapsed * 0.03) % 1;
    this.boat.position.y = -0.05 + Math.sin(elapsed * 1.1) * 0.07;
    this.wind.update(elapsed, windStrength);
    if (windStrength > 0) {
      this.butterflies.forEach((b, i) => updateButterfly(b, elapsed, i * 2.6, 1.15, 0.62));
    }
    for (const buoy of this.buoys) {
      const phase = buoy.userData.bob as number;
      buoy.position.y = Math.sin(elapsed * 1.3 + phase) * 0.08;
      buoy.rotation.z = Math.sin(elapsed * 1.1 + phase) * 0.14;
    }
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
