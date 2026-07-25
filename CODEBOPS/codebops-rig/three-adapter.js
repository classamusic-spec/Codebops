/*!
 * codebops-rig/three-adapter — optional Three.js renderer.
 * Import Three yourself and pass it in; this file imports nothing but the engine.
 *
 *   import * as THREE from 'three';
 *   import { createRig } from './codebops-rig.js';
 *   import MIXY from './characters/mixy.js';
 *   import { attachThree } from './three-adapter.js';
 *
 *   const rig  = await createRig(MIXY, { renderer: 'none' });
 *   const view = attachThree(THREE, rig, { scene });
 *   // loop:  rig.update(dt); view.sync(); renderer.render(scene, camera);
 *
 * Use an ORTHOGRAPHIC camera. Layers sit at z = depth * 0.01, which is what
 * gives the three-quarter turn its parallax.
 */
import { poseToNodes } from './codebops-rig.js';

const S = 0.01;
const A2W = (ax, ay) => [(ax - 512) * S, (512 - ay) * S];

export function attachThree(THREE, rig, opts = {}) {
  const CH = rig.character;
  const root = new THREE.Object3D();
  const nodes = {};

  for (const id in CH.nodes) { nodes[id] = new THREE.Object3D(); nodes[id].name = id; }
  for (const id in CH.nodes) {
    const def = CH.nodes[id], g = nodes[id];
    const [x, y] = A2W(def.pivot[0], def.pivot[1]);
    if (def.parent) {
      const [px, py] = A2W(CH.nodes[def.parent].pivot[0], CH.nodes[def.parent].pivot[1]);
      g.position.set(x - px, y - py, 0);
      nodes[def.parent].add(g);
    } else { g.position.set(x, y, 0); root.add(g); }
    g.userData.base = g.position.clone();
    g.rotation.order = 'ZYX';            /* yaw composes inside the z tilt */
  }

  const meshes = {};
  for (const layer of CH.layers) {
    const r = rig.rasters[layer.id]; if (!r) continue;
    const tex = new THREE.CanvasTexture(r.canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.minFilter = THREE.LinearMipmapLinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.needsUpdate = true;
    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(r.box.w * S, r.box.h * S),
      /* depthTest off + explicit renderOrder = exact painter order, no z-fighting */
      new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthTest: false,
                                    depthWrite: false, toneMapped: false })
    );
    mesh.name = layer.id;
    mesh.renderOrder = layer.order * 10 + (layer.side === 1 ? 1 : 0);
    const pivot = CH.nodes[layer.node].pivot;
    const cx = r.box.x + r.box.w / 2, cy = r.box.y + r.box.h / 2;
    mesh.position.set((cx - pivot[0]) * S, -(cy - pivot[1]) * S, layer.depth * S);
    nodes[layer.node].add(mesh);
    meshes[layer.id] = mesh;
  }

  if (opts.scene) opts.scene.add(root);

  function sync(pose) {
    const N = poseToNodes(pose || rig.pose, CH);
    for (const id in N) {
      const g = nodes[id], t = N[id]; if (!g) continue;
      const b = g.userData.base;
      g.position.set(b.x + t.dx * S, b.y - t.dy * S, b.z);
      g.rotation.set(0, t.yaw, -t.rot);
      g.scale.set(t.sx, t.sy, 1);
    }
    for (const id in meshes) meshes[id].visible = false;
    for (const d of rig.getLayerDraws(pose)) {
      const m = meshes[d.layerId]; if (!m) continue;
      m.visible = true; m.material.opacity = d.opacity;
    }
  }

  return { root, nodes, meshes, sync,
    dispose() {
      for (const id in meshes) {
        meshes[id].geometry.dispose();
        if (meshes[id].material.map) meshes[id].material.map.dispose();
        meshes[id].material.dispose();
      }
      root.removeFromParent();
    } };
}
