/**
 * Phase 18 rig — the Maker Workshop build pad.
 *
 * A row of platforms, one per tower. When the MAKE gadget runs a call,
 * blocks pop up on that platform to the height the input asked for. A
 * ghost outline on each platform shows the target height. Rendering
 * only — heights come from makerMachine.ts; the screen calls placeBlock.
 */
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { toonMat } from '../materials/toon';

const GAP = 2.2;
const BLOCK = 0.95;
const COLORS = ['#ff7a4d', '#ffcf3e', '#7ad0ff', '#c79bff', '#8be04a'];

interface Block {
  readonly mesh: THREE.Mesh;
  pop: number; // <0 hidden
}

export class MakerRig {
  readonly group = new THREE.Group();
  private readonly towers: Block[][] = [];
  private readonly pads: THREE.Mesh[] = [];
  private readonly padMats: THREE.MeshToonMaterial[] = [];

  constructor(towerCount: number, maxHeight: number, target: readonly number[]) {
    const x0 = -((towerCount - 1) * GAP) / 2;

    const base = new THREE.Mesh(new RoundedBoxGeometry(towerCount * GAP + 1.4, 0.5, 2.4, 4, 0.2), toonMat('#2b2f63'));
    base.position.set(0, 0.25, 0);
    base.receiveShadow = true;
    this.group.add(base);

    for (let t = 0; t < towerCount; t++) {
      const x = x0 + t * GAP;
      const padMat = toonMat('#3b3f7a');
      const pad = new THREE.Mesh(new RoundedBoxGeometry(1.3, 0.3, 1.3, 3, 0.1), padMat);
      pad.position.set(x, 0.55, 0);
      pad.receiveShadow = true;
      this.group.add(pad);
      this.pads.push(pad);
      this.padMats.push(padMat);

      // ghost target outline
      const want = target[t] ?? 0;
      if (want > 0) {
        const ghost = new THREE.Mesh(
          new THREE.BoxGeometry(BLOCK + 0.12, want * BLOCK, BLOCK + 0.12),
          new THREE.MeshBasicMaterial({ color: '#ffffff', wireframe: true, transparent: true, opacity: 0.22 }),
        );
        ghost.position.set(x, 0.7 + (want * BLOCK) / 2, 0);
        this.group.add(ghost);
      }

      const blocks: Block[] = [];
      for (let h = 0; h < maxHeight; h++) {
        const mat = toonMat(COLORS[t % COLORS.length]);
        const mesh = new THREE.Mesh(new RoundedBoxGeometry(BLOCK, BLOCK, BLOCK, 3, 0.12), mat);
        mesh.position.set(x, 0.7 + h * BLOCK + BLOCK / 2, 0);
        mesh.scale.setScalar(0.001);
        mesh.castShadow = true;
        this.group.add(mesh);
        blocks.push({ mesh, pop: -1 });
      }
      this.towers.push(blocks);
    }
  }

  /** Pop the block at height `blockIndex` (1-based) on a tower. */
  placeBlock(tower: number, blockIndex: number): void {
    const b = this.towers[tower]?.[blockIndex - 1];
    if (b) b.pop = 0;
  }

  markTower(tower: number, correct: boolean): void {
    const mat = this.padMats[tower];
    if (mat) { mat.color.set(correct ? '#8be04a' : '#ff5a6a'); mat.emissive = new THREE.Color(correct ? '#2e5a1a' : '#5a1a1a'); }
  }

  reset(): void {
    for (const tower of this.towers) for (const b of tower) { b.pop = -1; b.mesh.scale.setScalar(0.001); }
    this.padMats.forEach((m) => { m.color.set('#3b3f7a'); m.emissive = new THREE.Color('#000000'); });
  }

  update(dt: number): void {
    for (const tower of this.towers) {
      for (const b of tower) {
        if (b.pop < 0) continue;
        if (b.pop < 1) b.pop = Math.min(1, b.pop + dt * 5);
        const e = b.pop;
        const s = e < 0.6 ? (e / 0.6) * 1.2 : 1.2 - (e - 0.6) / 0.4 * 0.2;
        b.mesh.scale.setScalar(Math.max(0.001, s));
      }
    }
  }
}
