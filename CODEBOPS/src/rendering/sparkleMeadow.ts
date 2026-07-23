/**
 * Sparkle Meadow — the first 2.5D world.
 * Composes factories into the fixed three-quarter storybook scene
 * from the World 1 reference: grass puzzle island, winding stream,
 * arched bridge, big trees, flower meadows, distant hills + cottage.
 */
import * as THREE from 'three';
import type { LevelDef } from '../data/schemas/level';
import {
  createGroundSlab, createGroundTile, createRoundedTree, createWoodenBridge,
  createStream, createRockCluster, createBush, createFlowerPatch,
  createGoalMarker, createStrawberry, createCloud, createDistantHills, createSparkles,
  createBird, updateBird, createPetalDrift, updatePetalDrift,
} from './worldFactories';

export const TILE = 1.6;
export const STEP = 1.72;
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
  private readonly originX: number;
  private readonly originZ: number;

  constructor(private readonly level: LevelDef) {
    this.group.name = 'sparkle-meadow';
    this.originX = -1.35 - ((level.cols - 1) * STEP) / 2;
    this.originZ = -0.35 - ((level.rows - 1) * STEP) / 2;

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

    // Stream winding down the right side
    const streamPts = [
      new THREE.Vector3(5.2, 0, -11),
      new THREE.Vector3(4.0, 0, -5.5),
      new THREE.Vector3(4.6, 0, -1),
      new THREE.Vector3(3.8, 0, 3.5),
      new THREE.Vector3(5.0, 0, 8.5),
    ];
    const stream = createStream(streamPts, 1.8);
    this.waterTex = stream.texture;
    this.group.add(stream.group);

    // Bridge crossing the stream, front-right (as in the reference)
    const bridge = createWoodenBridge(1.9, 3.2);
    bridge.position.set(4.15, 0.02, 3.6);
    bridge.rotation.y = 0.35;
    this.group.add(bridge);

    // Trees framing the scene
    const treeL = createRoundedTree(1.5, '#3faf5a', '#2f9247');
    treeL.position.set(-6.4, 0, -2.2);
    this.group.add(treeL);
    const treeL2 = createRoundedTree(1.0);
    treeL2.position.set(-5.4, 0, 2.4);
    this.group.add(treeL2);
    const treeR = createRoundedTree(1.35, '#45b25e', '#2f9247');
    treeR.position.set(6.6, 0, -3.4);
    this.group.add(treeR);

    // Rocks along the stream
    const rocks1 = createRockCluster(3, 0.9);
    rocks1.position.set(5.2, 0, 0.8);
    this.group.add(rocks1);
    const rocks2 = createRockCluster(2, 0.6);
    rocks2.position.set(2.2, 0, 6.2);
    this.group.add(rocks2);

    // Mixy's lookout stone across the stream
    const stone = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 1.05, 0.5, 12), new THREE.MeshToonMaterial({ color: '#9aa7bd' }));
    stone.position.set(4.45, 0.25, -0.6);
    stone.castShadow = stone.receiveShadow = true;
    this.group.add(stone);

    // Flower patches
    const patchPositions: Array<[number, number, number, number]> = [
      [-5.6, 0, 4.6, 7], [-2.6, 0, 5.4, 5], [0.6, 0, 4.8, 4],
      [-6.8, 0, -4.6, 5], [6.9, 0, 2.2, 5], [1.8, 0, -4.4, 4],
    ];
    for (const [x, y, z, n] of patchPositions) {
      const patch = createFlowerPatch(n, 1.5);
      patch.position.set(x, y, z);
      this.group.add(patch);
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
    this.petals = createPetalDrift(16, 14);
    this.group.add(this.petals);

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

  /** Mixy's lookout position (beside the stream, off-grid). */
  mixyLookout(): THREE.Vector3 {
    return new THREE.Vector3(4.45, 0.5, -0.6);
  }

  update(dt: number, elapsed: number): void {
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
  }
}
