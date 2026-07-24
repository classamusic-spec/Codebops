/**
 * Phase 16 rig — the Paint Parade easel.
 *
 * A banner grid on an easel; each cell holds a hidden dot that pops in,
 * coloured, when the robot stamps it. A little brush marker glides to the
 * active cell. Rendering only — the pattern and stamp order come from
 * paintMachine.ts; the screen calls paintCell / moveBrush as ops play.
 */
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { toonMat } from '../materials/toon';

const CELL = 1.05;

interface Dot {
  readonly mesh: THREE.Mesh;
  readonly mat: THREE.MeshToonMaterial;
  pop: number; // <0 hidden, ramps 0→1 when painted
}

export class PaintRig {
  readonly group = new THREE.Group();
  private readonly dots: Dot[][] = [];
  private readonly brush: THREE.Group;
  private brushPos = new THREE.Vector3();
  private brushTarget = new THREE.Vector3();

  constructor(private readonly cols: number, private readonly rows: number) {
    const gw = cols * CELL;
    const gh = rows * CELL;

    // easel board
    const board = new THREE.Mesh(
      new RoundedBoxGeometry(gw + 1.1, gh + 1.1, 0.4, 4, 0.2),
      toonMat('#20264f'),
    );
    board.position.set(0, gh / 2 + 0.6, 0);
    board.receiveShadow = true;
    this.group.add(board);
    // frame trim
    const frame = new THREE.Mesh(
      new RoundedBoxGeometry(gw + 1.4, gh + 1.4, 0.25, 4, 0.22),
      toonMat('#c79bff'),
    );
    frame.position.set(0, gh / 2 + 0.6, -0.12);
    this.group.add(frame);

    // legs
    for (const lx of [-(gw / 2 + 0.2), gw / 2 + 0.2]) {
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.16, gh / 2 + 1.4, 10), toonMat('#7a4bd0'));
      leg.position.set(lx, (gh / 2 + 1.4) / 2, 0.1);
      leg.rotation.z = lx < 0 ? 0.12 : -0.12;
      leg.castShadow = true;
      this.group.add(leg);
    }

    // dot cells (hidden until painted)
    for (let r = 0; r < rows; r++) {
      const rowArr: Dot[] = [];
      for (let c = 0; c < cols; c++) {
        const mat = toonMat('#3a3f66');
        const mesh = new THREE.Mesh(new THREE.SphereGeometry(0.4, 20, 20), mat);
        mesh.position.copy(this.cellPos(c, r));
        mesh.scale.setScalar(0.001);
        mesh.castShadow = true;
        this.group.add(mesh);
        rowArr.push({ mesh, mat, pop: -1 });
      }
      this.dots.push(rowArr);
    }

    // brush marker
    this.brush = new THREE.Group();
    const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 1.1, 10), toonMat('#ffcf3e'));
    handle.position.y = 0.7;
    handle.rotation.z = 0.5;
    this.brush.add(handle);
    const tip = new THREE.Mesh(new THREE.ConeGeometry(0.22, 0.5, 12), toonMat('#ff5a7a'));
    tip.position.set(-0.28, 0.16, 0);
    tip.rotation.z = -0.9;
    this.brush.add(tip);
    this.group.add(this.brush);
    this.brushPos.copy(this.cellPos(0, 0));
    this.brushTarget.copy(this.brushPos);
    this.brush.position.copy(this.brushPos);
  }

  private cellPos(col: number, row: number): THREE.Vector3 {
    const gw = this.cols * CELL;
    const gh = this.rows * CELL;
    const x = -gw / 2 + col * CELL + CELL / 2;
    const y = gh / 2 + 0.6 + (gh / 2 - row * CELL - CELL / 2);
    return new THREE.Vector3(x, y, 0.35);
  }

  paintCell(col: number, row: number, hex: string): void {
    const dot = this.dots[row]?.[col];
    if (!dot) return;
    dot.mat.color.set(hex);
    dot.pop = 0;
  }

  /** Move the brush to a cell (clamped to the board for display). */
  moveBrush(col: number, row: number): void {
    const c = Math.max(0, Math.min(this.cols - 1, col));
    const r = Math.max(0, Math.min(this.rows - 1, row));
    this.brushTarget.copy(this.cellPos(c, r));
    this.brushTarget.z += 0.5;
  }

  reset(): void {
    for (const row of this.dots) for (const d of row) { d.pop = -1; d.mesh.scale.setScalar(0.001); d.mat.color.set('#3a3f66'); }
    this.brushTarget.copy(this.cellPos(0, 0));
    this.brushTarget.z += 0.5;
  }

  update(dt: number): void {
    // ease the brush toward its target cell
    this.brushPos.lerp(this.brushTarget, Math.min(1, dt * 8));
    this.brush.position.copy(this.brushPos);

    for (const row of this.dots) {
      for (const d of row) {
        if (d.pop < 0) continue;
        if (d.pop < 1) d.pop = Math.min(1, d.pop + dt * 5);
        // overshoot bounce: scale peaks >1 then settles
        const e = d.pop;
        const s = e < 0.6 ? (e / 0.6) * 1.25 : 1.25 - (e - 0.6) / 0.4 * 0.25;
        d.mesh.scale.setScalar(Math.max(0.001, s));
      }
    }
  }
}
