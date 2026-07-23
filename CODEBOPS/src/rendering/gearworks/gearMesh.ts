/**
 * Procedural toy gear geometry — fat rounded teeth, center hub hole,
 * extruded with a soft bevel so it reads like a premium plastic part.
 * Built once per (teeth, radius) and cached; shared across all machines.
 */
import * as THREE from 'three';
import { toonMat } from '../materials/toon';

const geoCache = new Map<string, THREE.ExtrudeGeometry>();

export function gearGeometry(teeth: number, radius: number, depth = 0.22): THREE.ExtrudeGeometry {
  const key = `${teeth}:${radius}:${depth}`;
  const cached = geoCache.get(key);
  if (cached) return cached;

  const toothH = radius * 0.22; // tooth height
  const inner = radius - toothH; // root circle
  const shape = new THREE.Shape();
  const steps = teeth * 4; // root→flank→tip→flank per tooth
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const a = t * Math.PI * 2;
    const phase = (i % 4);
    // 0: root, 1: rising flank, 2-3: tip — squarish teeth with soft corners
    const r = phase === 0 ? inner : phase === 1 ? radius : phase === 2 ? radius : inner;
    const x = Math.cos(a) * r;
    const y = Math.sin(a) * r;
    if (i === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  }
  shape.closePath();
  // center hub hole
  const hole = new THREE.Path();
  hole.absarc(0, 0, radius * 0.18, 0, Math.PI * 2, true);
  shape.holes.push(hole);

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelThickness: 0.035,
    bevelSize: 0.035,
    bevelSegments: 2,
  });
  geo.center();
  geoCache.set(key, geo);
  return geo;
}

export interface GearMeshOptions {
  teeth?: number;
  radius?: number;
  color?: string;
  hubColor?: string;
}

/**
 * A complete toy gear: extruded body + contrasting hub cap + face dot
 * (the dot makes rotation visible even in reduced-motion screenshots).
 * The returned group's Z axis is the axle (faces the bench camera).
 */
export function createGear(opts: GearMeshOptions = {}): THREE.Group {
  const { teeth = 10, radius = 0.7, color = '#ff9f2e', hubColor = '#fff2d9' } = opts;
  const g = new THREE.Group();

  const body = new THREE.Mesh(gearGeometry(teeth, radius), toonMat(color));
  body.castShadow = body.receiveShadow = true;
  body.name = 'gearBody';
  g.add(body);

  const hub = new THREE.Mesh(new THREE.CylinderGeometry(radius * 0.3, radius * 0.3, 0.3, 20), toonMat(hubColor));
  hub.rotation.x = Math.PI / 2;
  hub.castShadow = true;
  g.add(hub);

  const dot = new THREE.Mesh(new THREE.CylinderGeometry(radius * 0.085, radius * 0.085, 0.06, 10), toonMat('#16225c'));
  dot.rotation.x = Math.PI / 2;
  dot.position.set(0, radius * 0.55, 0.17);
  g.add(dot);

  return g;
}
