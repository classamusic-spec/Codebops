/**
 * Sparkle Meadow — the first 2.5D world.
 * Composes factories into the fixed three-quarter storybook scene
 * from the World 1 reference: grass puzzle island, winding stream,
 * arched bridge, big trees, flower meadows, distant hills + cottage.
 *
 * Composition rules this scene follows (and every other world copies):
 *
 *  1. The PUZZLE is the focal point. Nothing tall is placed where it
 *     would sit in front of the board or crowd its corners, and the
 *     camera frame is the board plus Mixy and nothing else.
 *  2. Mixy stands just off the board's right edge, derived from the grid
 *     rather than pinned to a fixed world point. She used to sit at a
 *     fixed x=4.45, which on a four-column level meant the frame had to
 *     be 38% wider than the board to include her — so the board rendered
 *     at 62% of the frame. Deriving her spot puts it at 78%.
 *  3. Empty ground is dead space. The open grass a portrait phone shows
 *     is filled with flat detail (clover, pebbles) and low life (tufts,
 *     flowers) that never breaks the board's silhouette.
 *  4. Everything soft moves. Trees, bushes and grass are registered with
 *     one WindField so the whole meadow leans together on a shared gust
 *     without moving in lockstep.
 */
import * as THREE from 'three';
import type { LevelDef } from '../data/schemas/level';
import {
  createGroundSlab, createGroundTile, createRoundedTree, createWoodenBridge,
  createStream, createRockCluster, createBush, createFlowerPatch,
  createGoalMarker, createStrawberry, createCloud, createDistantHills, createSparkles,
  createBird, updateBird, createPetalDrift, updatePetalDrift,
  createGrassTuft, createGroundDetail, createButterfly, updateButterfly, WindField,
} from './worldFactories';

/** Tile face and pitch. The gap between tiles is STEP - TILE. */
export const TILE = 1.68;
export const STEP = 1.78;
export const TILE_TOP = 0.42;

export class SparkleMeadow {
  readonly group = new THREE.Group();
  readonly itemNodes = new Map<string, THREE.Object3D>();
  readonly goalNode: THREE.Group;
  private readonly clouds: THREE.Group[] = [];
  private waterTex: THREE.CanvasTexture | null = null;
  private sparkles: THREE.Points | null = null;
  private goalStar: THREE.Object3D | null = null;
  private petals: THREE.Group | null = null;
  private readonly birds: THREE.Group[] = [];
  private readonly butterflies: THREE.Group[] = [];
  private readonly wind = new WindField();
  private readonly originX: number;
  private readonly originZ: number;
  /** Mixy's stone, right of the board — see rule 2 in the file comment. */
  private readonly perch: THREE.Vector3;

  constructor(private readonly level: LevelDef) {
    this.group.name = 'sparkle-meadow';
    // Centred board. The old -1.35 nudge existed to make room for scenery
    // on the right; that room now comes from moving the scenery, not the
    // puzzle, so the board sits where the eye expects it.
    this.originX = -((level.cols - 1) * STEP) / 2;
    this.originZ = -((level.rows - 1) * STEP) / 2;
    const boardRight = this.originX + (level.cols - 1) * STEP;
    const boardMidZ = this.originZ + ((level.rows - 1) * STEP) / 2;
    this.perch = new THREE.Vector3(boardRight + STEP * 0.92, 0.25, boardMidZ - STEP * 0.22);

    // Base ground + backdrop
    this.group.add(createGroundSlab());
    this.group.add(createDistantHills());

    // Puzzle island tiles
    for (let row = 0; row < level.rows; row++) {
      for (let col = 0; col < level.cols; col++) {
        const tint = (row + col) % 2 === 0 ? '#79d455' : '#6cc94a';
        const tile = createGroundTile(TILE, tint);
        const p = this.cellToWorld(col, row);
        tile.position.set(p.x, TILE_TOP, p.z);
        this.group.add(tile);
      }
    }

    // Blocked cells → bushes
    for (const b of level.blocked) {
      const p = this.cellToWorld(b.col, b.row);
      const bush = createBush(1.05);
      bush.position.set(p.x, TILE_TOP, p.z);
      this.group.add(bush);
      this.wind.add(bush, 0.035);
    }

    // Items
    for (const item of level.items) {
      if (item.kind === 'strawberry') {
        const node = createStrawberry();
        const p = this.cellToWorld(item.col, item.row);
        node.position.set(p.x, TILE_TOP, p.z);
        this.group.add(node);
        this.itemNodes.set(item.id, node);
      }
    }

    // Goal marker
    const goal = this.level.goals[0];
    this.goalNode = createGoalMarker();
    const gp = this.cellToWorld(goal.col, goal.row);
    this.goalNode.position.set(gp.x, TILE_TOP - 0.42, gp.z);
    this.goalStar = this.goalNode.getObjectByName('goalStar') ?? null;
    this.group.add(this.goalNode);

    // Stream, now hugging the right side just beyond Mixy's stone rather
    // than sitting far out where it dragged the whole frame with it.
    const sx = this.perch.x + 1.15;
    const streamPts = [
      new THREE.Vector3(sx + 0.9, 0, -11),
      new THREE.Vector3(sx - 0.3, 0, -5.5),
      new THREE.Vector3(sx + 0.3, 0, -1),
      new THREE.Vector3(sx - 0.5, 0, 3.5),
      new THREE.Vector3(sx + 0.7, 0, 8.5),
    ];
    const stream = createStream(streamPts, 1.8);
    this.waterTex = stream.texture;
    this.group.add(stream.group);

    // Bridge crossing the stream, front-right
    const bridge = createWoodenBridge(1.9, 3.2);
    // Pushed back and out: at boardMidZ + 3.9 it read as a stray brown lump
    // in the lower right of a portrait shot.
    bridge.position.set(sx + 0.15, 0.02, boardMidZ + 5.6);
    bridge.rotation.y = 0.35;
    this.group.add(bridge);

    // ---- trees: back and far sides only ----
    // The old scene had a tree at (-5.4, 2.4) — front-left, level with the
    // board — which crowded the bottom-left corner of the shot and sat over
    // the deck. Trees now live BEHIND the board's front edge, so the lower
    // third of the frame stays open and the puzzle keeps its silhouette.
    const treeSpecs: Array<[number, number, number, string, string]> = [
      [-6.4, -2.2, 1.5, '#3faf5a', '#2f9247'],
      [-7.3, -5.4, 1.15, '#45b25e', '#2f9247'],
      [-4.9, -6.8, 0.95, '#3faf5a', '#2f9247'],
      [sx + 2.0, -3.4, 1.35, '#45b25e', '#2f9247'],
      [sx + 3.1, -7.0, 1.05, '#3faf5a', '#2f9247'],
      [-8.6, -0.4, 1.25, '#37a24e', '#2f9247'],
    ];
    for (const [x, z, scale, leaf, dark] of treeSpecs) {
      const tree = createRoundedTree(scale, leaf, dark);
      tree.position.set(x, 0, z);
      this.group.add(tree);
      this.wind.add(tree, 0.022);
    }

    // ---- bushes: a low hedge ringing the open grass ----
    const bushSpecs: Array<[number, number, number]> = [
      [-5.9, 1.2, 0.9], [-7.1, -3.6, 1.05], [-3.4, -7.4, 0.85],
      [-6.6, 3.8, 0.8], [-2.2, 5.9, 0.9], [1.4, 6.4, 0.85],
      [sx + 1.2, 1.6, 0.95], [sx + 2.4, -1.2, 0.8], [-8.0, 2.6, 0.85],
    ];
    for (const [x, z, scale] of bushSpecs) {
      const bush = createBush(scale);
      bush.position.set(x, 0, z);
      this.group.add(bush);
      this.wind.add(bush, 0.03);
    }

    // Rocks along the stream
    const rocks1 = createRockCluster(3, 0.9);
    rocks1.position.set(sx + 0.9, 0, 0.8);
    this.group.add(rocks1);
    const rocks2 = createRockCluster(2, 0.6);
    rocks2.position.set(-4.2, 0, 4.9);
    this.group.add(rocks2);

    // Mixy's lookout stone, derived from the board
    const stone = new THREE.Mesh(
      new THREE.CylinderGeometry(0.85, 1.05, 0.5, 12),
      new THREE.MeshToonMaterial({ color: '#9aa7bd' }),
    );
    stone.position.set(this.perch.x, 0.25, this.perch.z);
    stone.castShadow = stone.receiveShadow = true;
    this.group.add(stone);

    // ---- flowers: a ring around the board, denser in the open front ----
    const patchPositions: Array<[number, number, number]> = [
      [-5.6, 4.6, 7], [-2.6, 5.4, 5], [0.6, 4.8, 4],
      [-6.8, -4.6, 5], [sx + 1.9, 2.2, 5], [-3.9, 6.6, 6],
      [2.9, 5.6, 5], [-7.6, 0.9, 4], [sx + 1.4, -5.2, 4],
    ];
    for (const [x, z, n] of patchPositions) {
      const patch = createFlowerPatch(n, 1.6);
      patch.position.set(x, 0, z);
      this.group.add(patch);
      this.wind.addChildren(patch, 0.07);
    }

    // ---- grass tufts and flat detail: the anti-negative-space pass ----
    // Portrait shows a lot of ground below the board, so that band gets the
    // most attention. Nothing here is taller than a flower.
    const tuftSpots: Array<[number, number, number]> = [
      [-4.6, 3.2, 1], [-1.8, 4.2, 1.1], [1.9, 3.9, 0.95], [-6.2, 2.0, 0.9],
      [4.1, 4.4, 1], [-3.1, 7.4, 1.05], [0.2, 7.0, 0.95], [-5.2, -2.8, 0.9],
      [3.2, -5.6, 0.85], [-1.2, -6.4, 0.9], [sx + 0.4, 5.4, 1], [-7.8, 5.0, 0.95],
    ];
    for (const [x, z, scale] of tuftSpots) {
      const tuft = createGrassTuft(scale);
      tuft.position.set(x, 0, z);
      this.group.add(tuft);
      this.wind.addChildren(tuft, 0.1);
    }
    for (const [x, z, n, spread] of [
      [-2.5, 4.6, 14, 6], [2.6, 5.2, 12, 5], [-6.0, 1.4, 10, 4],
      [0, 7.6, 12, 8], [-5.0, -4.0, 9, 5], [4.6, 1.0, 8, 4],
    ] as Array<[number, number, number, number]>) {
      const detail = createGroundDetail(n, spread);
      detail.position.set(x, 0, z);
      this.group.add(detail);
    }

    // ---- the portrait back-fill ----
    // A phone in portrait fits the board by WIDTH, which leaves deep empty
    // bands above and below it. Anything at x beyond about ±3.5 is off-frame
    // there, so this pass places scenery INSIDE that column: a tree line
    // well behind the board, and low cover in front of it.
    // Close enough to read as a tree line rather than as dots on the
    // horizon, far enough behind the board never to touch its silhouette.
    const backLine: Array<[number, number, number]> = [
      [-2.9, -5.8, 1.15], [0.6, -6.6, 1.3], [3.0, -5.6, 1.1],
      [-1.4, -8.2, 1.0], [2.0, -8.8, 0.95], [-3.4, -9.6, 0.85], [0.2, -10.4, 0.8],
    ];
    for (const [x, z, scale] of backLine) {
      const tree = createRoundedTree(scale, '#37a24e', '#2b8a41');
      tree.position.set(x, 0, z);
      this.group.add(tree);
      this.wind.add(tree, 0.018);
    }
    for (const [x, z, scale] of [
      [-2.2, -4.2, 0.85], [1.8, -4.4, 0.8], [-0.3, -5.0, 0.75], [3.1, -3.6, 0.7],
      [-3.3, -3.4, 0.75],
      [-2.8, 3.4, 0.8], [2.4, 3.6, 0.75], [-0.6, 8.2, 0.85], [2.9, 7.6, 0.7],
    ] as Array<[number, number, number]>) {
      const bush = createBush(scale);
      bush.position.set(x, 0, z);
      this.group.add(bush);
      this.wind.add(bush, 0.03);
    }

    // Clouds
    const cloudSpecs: Array<[number, number, number, number]> = [
      [-7, 6.4, -9, 1.4], [3.5, 7.2, -10, 1.8], [8.5, 6.1, -7, 1.1], [-1.5, 7.8, -12, 1.5],
    ];
    for (const [x, y, z, s] of cloudSpecs) {
      const c = createCloud(s);
      c.position.set(x, y, z);
      this.clouds.push(c);
      this.group.add(c);
    }

    this.sparkles = createSparkles(30, 13);
    this.group.add(this.sparkles);

    // Blossom petals drifting down from the trees
    this.petals = createPetalDrift(18, 14);
    this.group.add(this.petals);

    // ---- butterflies over the flowers, on short leashes ----
    const flySpots: Array<[number, number, number, string]> = [
      [-3.4, 0.95, 4.6, '#ff8fc0'],
      [2.6, 1.15, 4.2, '#ffd23e'],
      [-5.8, 0.85, -1.2, '#c79bff'],
    ];
    for (const [x, y, z, color] of flySpots) {
      const b = createButterfly(color, 1);
      (b.userData.home as THREE.Vector3).set(x, y, z);
      b.position.set(x, y, z);
      this.butterflies.push(b);
      this.group.add(b);
    }

    // Two little birds crossing the sky
    const birdA = createBird('#5a5f8a', 1.1);
    birdA.position.set(-6, 6.2, -8);
    this.birds.push(birdA);
    this.group.add(birdA);
    const birdB = createBird('#8a5f7a', 0.85);
    birdB.position.set(3, 7.4, -10);
    this.birds.push(birdB);
    this.group.add(birdB);
  }

  /** World position of a grid cell's floor (top of tile). */
  cellToWorld(col: number, row: number): THREE.Vector3 {
    return new THREE.Vector3(this.originX + col * STEP, TILE_TOP, this.originZ + row * STEP);
  }

  /** Mixy's lookout — just off the board's right edge, always in frame. */
  mixyLookout(): THREE.Vector3 {
    return new THREE.Vector3(this.perch.x, 0.5, this.perch.z);
  }

  update(dt: number, elapsed: number, windStrength = 1): void {
    if (this.waterTex) this.waterTex.offset.y = (elapsed * 0.12) % 1;
    for (let i = 0; i < this.clouds.length; i++) {
      const c = this.clouds[i];
      c.position.x += dt * (0.08 + i * 0.02);
      if (c.position.x > 12) c.position.x = -12;
    }
    if (this.goalStar) {
      this.goalStar.rotation.y = elapsed * 1.4;
      this.goalStar.position.y = 0.86 + Math.sin(elapsed * 2.2) * 0.07;
    }
    if (this.sparkles) {
      const mat = this.sparkles.material as THREE.PointsMaterial;
      mat.opacity = 0.55 + Math.sin(elapsed * 2.6) * 0.35;
    }
    if (this.petals) updatePetalDrift(this.petals, dt, elapsed);
    this.birds.forEach((b, i) => {
      b.position.y += Math.sin(elapsed * 1.2 + i * 2.4) * dt * 0.25;
      updateBird(b, dt, elapsed, 0.55 + i * 0.25, i * 1.9);
    });
    // Calm mode holds them still rather than deleting them: the meadow
    // still has butterflies in it, they just stop darting about.
    if (windStrength > 0) {
      this.butterflies.forEach((b, i) => updateButterfly(b, elapsed, i * 2.1, 1.2, 0.55));
    }
    this.wind.update(elapsed, windStrength);
  }
}
