/** Glowing dotted path preview — shows where the current plan will go. */
import * as THREE from 'three';
import { previewPath } from '../gameplay/commands/interpreter';
import type { LevelDef } from '../data/schemas/level';
import type { ProgramStep } from '../gameplay/commands/interpreter';
import type { SparkleMeadow } from './sparkleMeadow';
import { TILE_TOP } from './sparkleMeadow';
import { toonMat } from './materials/toon';

export class PathPreview {
  private readonly group = new THREE.Group();
  // One geometry for every dot, for the preview's whole life.
  private readonly geo = new THREE.SphereGeometry(0.11, 10, 8);

  constructor(
    parent: THREE.Object3D,
    private readonly world: Pick<SparkleMeadow, 'cellToWorld'>,
    private readonly level: LevelDef,
  ) {
    this.group.name = 'path-preview';
    parent.add(this.group);
  }

  update(program: readonly ProgramStep[]): void {
    this.group.clear();
    if (program.length === 0) return;
    const steps = previewPath(this.level, program);
    const geo = this.geo;
    for (const step of steps) {
      const color = step.kind === 'goal' ? '#ffd23e' : step.kind === 'bump' ? '#ff8a8a' : '#ffffff';
      const dot = new THREE.Mesh(geo, toonMat(color));
      const p = this.world.cellToWorld(step.cell.col, step.cell.row);
      dot.position.set(p.x, TILE_TOP + 0.08, p.z);
      this.group.add(dot);
    }
  }

  clear(): void {
    this.group.clear();
  }
}
