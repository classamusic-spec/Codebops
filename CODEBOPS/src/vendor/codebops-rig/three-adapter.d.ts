/**
 * Sibling declarations for the vendored three-adapter.
 *
 * The adapter is deliberately Three-agnostic — it imports nothing and takes
 * the THREE namespace as an argument — so its types are described here
 * rather than in the .js, which stays verbatim for the next re-copy.
 */
import type * as THREE from 'three';
import type { CharacterRig, Pose } from './codebops-rig.js';

export interface ThreeCharacterView {
  /** Scene graph root. Art units are scaled by 0.01. */
  readonly root: THREE.Object3D;
  readonly nodes: Readonly<Record<string, THREE.Object3D>>;
  readonly meshes: Readonly<Record<string, THREE.Mesh>>;
  /** Push the rig's current pose (or a given one) onto the scene graph. */
  sync(pose?: Pose): void;
  dispose(): void;
}

export declare function attachThree(
  three: typeof THREE,
  rig: CharacterRig,
  opts?: { scene?: THREE.Object3D },
): ThreeCharacterView;
