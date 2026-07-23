/**
 * Reusable world factories — Sparkle Meadow building blocks.
 * Rounded low-poly geometry, toon shading, bright storybook colors.
 */
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { toonMat, waterTexture } from './materials/toon';

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

/** Big rolling ground slab the world sits on. */
export function createGroundSlab(): THREE.Mesh {
  const geo = new RoundedBoxGeometry(30, 1.4, 22, 4, 0.55);
  const m = mesh(geo, toonMat('#5fc94e'), 0, -0.72, 0, false, true);
  return m;
}

/** Thickness of a puzzle tile — kept slim so the star pad, bushes, berries
 * and path dots always sit clearly proud of the board. */
export const TILE_THICK = 0.28;

/**
 * One tile of the puzzle island: a slim rounded slab whose TOP FACE sits at
 * the group's origin (y = 0). Callers place the group at TILE_TOP so the
 * board surface lands exactly where items, goals and characters rest — the
 * slab extrudes downward only, never burying anything on top.
 */
export function createGroundTile(size: number, tint: string): THREE.Group {
  const g = new THREE.Group();
  const geo = new RoundedBoxGeometry(size, TILE_THICK, size, 3, 0.1);
  g.add(mesh(geo, toonMat(tint), 0, -TILE_THICK / 2, 0));
  return g;
}

/** Puffy rounded storybook tree. */
export function createRoundedTree(scale = 1, leaf = '#3faf5a', leafDark = '#2f9247'): THREE.Group {
  const g = new THREE.Group();
  const trunk = mesh(new THREE.CylinderGeometry(0.22 * scale, 0.3 * scale, 1.4 * scale, 8), toonMat('#8d5a2b'), 0, 0.7 * scale, 0);
  g.add(trunk);
  const blobs: Array<[number, number, number, number, string]> = [
    [0, 1.85, 0, 1.0, leaf],
    [-0.62, 1.45, 0.12, 0.72, leafDark],
    [0.6, 1.5, -0.1, 0.78, leaf],
    [0.05, 1.4, 0.55, 0.6, leafDark],
  ];
  for (const [x, y, z, r, c] of blobs) {
    g.add(mesh(new THREE.SphereGeometry(r * scale, 14, 12), toonMat(c), x * scale, y * scale, z * scale));
  }
  return g;
}

/** Arched wooden bridge over the stream. */
export function createWoodenBridge(width = 2.2, span = 3.4): THREE.Group {
  const g = new THREE.Group();
  const plankCount = 9;
  const wood = toonMat('#b5773f');
  const woodDeep = toonMat('#8d5a2b');
  for (let i = 0; i < plankCount; i++) {
    const t = i / (plankCount - 1) - 0.5;
    const plank = mesh(new THREE.BoxGeometry(width, 0.1, span / plankCount - 0.045), wood);
    plank.position.set(0, Math.cos(t * Math.PI) * 0.42 + 0.12, t * span);
    plank.rotation.x = -Math.sin(t * Math.PI) * 0.45;
    g.add(plank);
  }
  // low curved side rails
  for (const side of [-1, 1]) {
    const rail = mesh(new THREE.TorusGeometry(span * 0.42, 0.05, 6, 20, Math.PI * 0.72), woodDeep, side * (width / 2), 0.34, 0);
    rail.rotation.y = Math.PI / 2;
    rail.rotation.z = Math.PI * 0.14;
    g.add(rail);
    for (const pt of [-span / 2 + 0.15, 0, span / 2 - 0.15]) {
      g.add(mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.42, 6), woodDeep, side * (width / 2), 0.3, pt));
    }
  }
  return g;
}

/** Gentle animated stream with painted wave stripes. */
export function createStream(points: THREE.Vector3[], width = 1.9): { group: THREE.Group; texture: THREE.CanvasTexture } {
  const curve = new THREE.CatmullRomCurve3(points);
  const tex = waterTexture();
  const group = new THREE.Group();
  const geo = new THREE.TubeGeometry(curve, 40, width / 2, 10, false);
  const mat = new THREE.MeshToonMaterial({ map: tex, gradientMap: null });
  const body = new THREE.Mesh(geo, mat);
  body.scale.y = 0.12;
  body.position.y = 0.06;
  body.receiveShadow = true;
  group.add(body);
  // foam rim
  const rim = new THREE.Mesh(new THREE.TubeGeometry(curve, 40, width / 2 + 0.16, 10, false), toonMat('#bfeaff'));
  rim.scale.y = 0.07;
  rim.position.y = 0.02;
  group.add(rim);
  return { group, texture: tex };
}

/** Cluster of smooth gray rocks. */
export function createRockCluster(count = 3, spread = 0.7): THREE.Group {
  const g = new THREE.Group();
  for (let i = 0; i < count; i++) {
    const r = 0.22 + Math.random() * 0.2;
    const rock = mesh(new THREE.IcosahedronGeometry(r, 1), toonMat(i % 2 ? '#9aa7bd' : '#b3bfd2'));
    rock.position.set((Math.random() - 0.5) * spread, r * 0.55, (Math.random() - 0.5) * spread);
    rock.scale.y = 0.72;
    rock.rotation.set(Math.random(), Math.random() * Math.PI, Math.random() * 0.4);
    g.add(rock);
  }
  return g;
}

/** Leafy bush blob (also used as grid blocker). */
export function createBush(scale = 1): THREE.Group {
  const g = new THREE.Group();
  const greens = ['#2f9247', '#3faf5a', '#37a24e'];
  const blobs: Array<[number, number, number, number]> = [
    [0, 0.34, 0, 0.42], [-0.3, 0.26, 0.08, 0.3], [0.3, 0.28, -0.04, 0.32], [0.02, 0.3, 0.3, 0.26],
  ];
  blobs.forEach(([x, y, z, r], i) => {
    g.add(mesh(new THREE.SphereGeometry(r * scale, 12, 10), toonMat(greens[i % greens.length]), x * scale, y * scale, z * scale));
  });
  // tiny blossoms
  for (let i = 0; i < 3; i++) {
    g.add(mesh(
      new THREE.SphereGeometry(0.06 * scale, 8, 6),
      toonMat(['#ff8fc0', '#ffd23e', '#ffffff'][i]),
      (Math.random() - 0.5) * 0.5 * scale, (0.4 + Math.random() * 0.25) * scale, (Math.random() - 0.5) * 0.5 * scale,
      false, false,
    ));
  }
  return g;
}

/** Patch of cartoon flowers. */
export function createFlowerPatch(count = 5, spread = 1.1): THREE.Group {
  const g = new THREE.Group();
  const petals = ['#ff8fc0', '#ffd23e', '#7dd7ff', '#c79bff', '#ffffff', '#ff9f7a'];
  for (let i = 0; i < count; i++) {
    const f = new THREE.Group();
    const px = (Math.random() - 0.5) * spread;
    const pz = (Math.random() - 0.5) * spread;
    const h = 0.26 + Math.random() * 0.16;
    f.add(mesh(new THREE.CylinderGeometry(0.02, 0.03, h, 5), toonMat('#2f9247'), 0, h / 2, 0, false, false));
    const color = petals[Math.floor(Math.random() * petals.length)];
    for (let p = 0; p < 5; p++) {
      const a = (p / 5) * Math.PI * 2;
      f.add(mesh(new THREE.SphereGeometry(0.055, 8, 6), toonMat(color), Math.cos(a) * 0.09, h, Math.sin(a) * 0.09, false, false));
    }
    f.add(mesh(new THREE.SphereGeometry(0.05, 8, 6), toonMat('#ffb703'), 0, h + 0.01, 0, false, false));
    f.position.set(px, 0, pz);
    g.add(f);
  }
  return g;
}

/** Star-shaped marker for the goal pad. */
export function createGoalMarker(): THREE.Group {
  const g = new THREE.Group();
  const pad = mesh(new THREE.CylinderGeometry(0.62, 0.72, 0.16, 24), toonMat('#8b4ddb'), 0, 0.5, 0);
  const padTop = mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.06, 24), toonMat('#a06bff'), 0, 0.6, 0);
  g.add(pad, padTop);

  const shape = new THREE.Shape();
  const spikes = 5;
  for (let i = 0; i < spikes * 2; i++) {
    const r = i % 2 === 0 ? 0.34 : 0.15;
    const a = (i / (spikes * 2)) * Math.PI * 2 - Math.PI / 2;
    const x = Math.cos(a) * r;
    const y = Math.sin(a) * r;
    if (i === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  }
  shape.closePath();
  const starGeo = new THREE.ExtrudeGeometry(shape, { depth: 0.12, bevelEnabled: true, bevelSize: 0.03, bevelThickness: 0.03, bevelSegments: 2 });
  starGeo.center();
  const star = mesh(starGeo, toonMat('#ffd23e'), 0, 0.86, 0);
  star.rotation.x = -1.05; // lie back on the pad, facing the camera
  star.name = 'goalStar';
  g.add(star);
  return g;
}

/** Juicy low-poly strawberry. */
export function createStrawberry(): THREE.Group {
  const g = new THREE.Group();
  const body = mesh(new THREE.SphereGeometry(0.24, 14, 12), toonMat('#ff4757'), 0, 0.24, 0);
  body.scale.set(1, 0.92, 0.94);
  g.add(body);
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI * 2;
    const leaf = mesh(new THREE.ConeGeometry(0.07, 0.16, 5), toonMat('#3faf5a'), Math.cos(a) * 0.09, 0.44, Math.sin(a) * 0.09);
    leaf.rotation.set(Math.cos(a) * 0.9, 0, -Math.sin(a) * 0.9);
    g.add(leaf);
  }
  g.add(mesh(new THREE.CylinderGeometry(0.02, 0.03, 0.1, 5), toonMat('#2f9247'), 0, 0.5, 0));
  // seed dots
  for (let i = 0; i < 10; i++) {
    const a = (i / 10) * Math.PI * 2;
    const y = 0.14 + (i % 3) * 0.08;
    const rr = 0.21 * Math.cos((y - 0.24) * 1.6);
    g.add(mesh(new THREE.SphereGeometry(0.018, 6, 4), toonMat('#ffe9a8'), Math.cos(a) * rr, y, Math.sin(a) * rr, false, false));
  }
  return g;
}

/** Puffy drifting cloud. */
export function createCloud(scale = 1): THREE.Group {
  const g = new THREE.Group();
  const mat = new THREE.MeshToonMaterial({ color: '#ffffff', gradientMap: null, transparent: true, opacity: 0.96 });
  const blobs: Array<[number, number, number, number]> = [[0, 0, 0, 0.55], [-0.55, -0.06, 0.05, 0.38], [0.55, -0.04, -0.03, 0.42], [0.1, 0.22, 0, 0.4]];
  for (const [x, y, z, r] of blobs) {
    const m = new THREE.Mesh(new THREE.SphereGeometry(r * scale, 12, 10), mat);
    m.position.set(x * scale, y * scale, z * scale);
    g.add(m);
  }
  return g;
}

/** Layered distant hills + a tiny purple cottage (reference backdrop). */
export function createDistantHills(): THREE.Group {
  const g = new THREE.Group();
  const layers: Array<[number, number, number, number, string]> = [
    [-9, -0.4, -10.5, 6.5, '#8fdc6f'],
    [8.5, -0.6, -11, 7.5, '#a2e57f'],
    [0, -0.9, -13, 9, '#b7ec92'],
  ];
  for (const [x, y, z, r, c] of layers) {
    const hill = mesh(new THREE.SphereGeometry(r, 20, 14), toonMat(c), x, y, z, false, true);
    hill.scale.y = 0.42;
    g.add(hill);
  }
  // cottage
  const house = new THREE.Group();
  house.add(mesh(new THREE.BoxGeometry(1.1, 0.9, 1), toonMat('#c79bff'), 0, 0.45, 0, false, false));
  const roof = mesh(new THREE.ConeGeometry(0.95, 0.7, 4), toonMat('#8b4ddb'), 0, 1.25, 0, false, false);
  roof.rotation.y = Math.PI / 4;
  house.add(roof);
  house.position.set(8.6, 1.1, -11.2);
  g.add(house);
  return g;
}

/** Twinkling sparkle points scattered over the meadow. */
export function createSparkles(count = 26, area = 12): THREE.Points {
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    pos[i * 3] = (Math.random() - 0.5) * area;
    pos[i * 3 + 1] = 0.6 + Math.random() * 2.6;
    pos[i * 3 + 2] = (Math.random() - 0.5) * area;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const mat = new THREE.PointsMaterial({
    color: '#fff7c0', size: 0.14, transparent: true, opacity: 0.9,
    blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true,
  });
  const pts = new THREE.Points(geo, mat);
  pts.name = 'sparkles';
  return pts;
}

/** Simple flapping bird — wings named 'wl'/'wr' for animation. */
export function createBird(color = '#4a4a68', scale = 1): THREE.Group {
  const g = new THREE.Group();
  const body = mesh(new THREE.ConeGeometry(0.09 * scale, 0.3 * scale, 6), toonMat(color), 0, 0, 0, false, false);
  body.rotation.x = Math.PI / 2;
  g.add(body);
  const wingMat = new THREE.MeshToonMaterial({ color, side: THREE.DoubleSide });
  for (const side of [-1, 1] as const) {
    const wing = mesh(new THREE.PlaneGeometry(0.42 * scale, 0.16 * scale), wingMat, side * 0.22 * scale, 0, 0, false, false);
    wing.name = side < 0 ? 'wl' : 'wr';
    g.add(wing);
  }
  return g;
}

/** Fly + flap a bird group; wraps at x bounds. */
export function updateBird(bird: THREE.Group, dt: number, elapsed: number, speed: number, phase = 0, bound = 12): void {
  bird.position.x += dt * speed;
  if (bird.position.x > bound) bird.position.x = -bound;
  const wl = bird.getObjectByName('wl');
  const wr = bird.getObjectByName('wr');
  const flap = Math.sin(elapsed * 6 + phase) * 0.5;
  if (wl) wl.rotation.y = flap;
  if (wr) wr.rotation.y = -flap;
}

/** Drifting blossom petals — animate with updatePetalDrift(). */
export function createPetalDrift(count = 14, area = 12): THREE.Group {
  const g = new THREE.Group();
  const colors = ['#ffd6ec', '#fff0f7', '#ffe9a8'];
  for (let i = 0; i < count; i++) {
    const petal = mesh(
      new THREE.CircleGeometry(0.055 + Math.random() * 0.03, 6),
      new THREE.MeshToonMaterial({ color: colors[i % colors.length], side: THREE.DoubleSide, transparent: true, opacity: 0.95 }),
      (Math.random() - 0.5) * area, 0.5 + Math.random() * 3.4, (Math.random() - 0.5) * area,
      false, false,
    );
    petal.scale.y = 0.6;
    petal.userData.phase = Math.random() * Math.PI * 2;
    petal.userData.fall = 0.25 + Math.random() * 0.3;
    g.add(petal);
  }
  g.name = 'petals';
  return g;
}

/** Petals tumble slowly down and wrap back to the top. */
export function updatePetalDrift(g: THREE.Group, dt: number, elapsed: number, top = 3.8): void {
  for (const p of g.children) {
    p.position.y -= (p.userData.fall as number) * dt;
    p.position.x += Math.sin(elapsed * 1.4 + (p.userData.phase as number)) * dt * 0.5;
    p.rotation.x = elapsed * 2 + (p.userData.phase as number);
    p.rotation.y = elapsed * 1.3 + (p.userData.phase as number);
    if (p.position.y < 0.1) p.position.y = top;
  }
}

/** Little cartoon fish — tail named 'tail' for wiggling. */
export function createFish(color = '#ff8f5f', scale = 1): THREE.Group {
  const g = new THREE.Group();
  const body = mesh(new THREE.SphereGeometry(0.16 * scale, 10, 8), toonMat(color), 0, 0, 0, false, false);
  body.scale.set(1.4, 0.9, 0.7);
  g.add(body);
  const tail = mesh(new THREE.ConeGeometry(0.09 * scale, 0.18 * scale, 4), toonMat(color), -0.26 * scale, 0, 0, false, false);
  tail.rotation.z = -Math.PI / 2;
  tail.name = 'tail';
  g.add(tail);
  g.add(mesh(new THREE.SphereGeometry(0.03 * scale, 6, 4), toonMat('#22223a'), 0.12 * scale, 0.04 * scale, 0.1 * scale, false, false));
  return g;
}

/** Tiny hovering patrol drone — rotor ring named 'rotor'. */
export function createDrone(scale = 1): THREE.Group {
  const g = new THREE.Group();
  g.add(mesh(new RoundedBoxGeometry(0.34 * scale, 0.2 * scale, 0.34 * scale, 2, 0.06), toonMat('#5b6b8c'), 0, 0, 0, false, false));
  const eye = mesh(
    new THREE.SphereGeometry(0.06 * scale, 8, 6),
    new THREE.MeshToonMaterial({ color: '#54e6ff', emissive: '#54e6ff', emissiveIntensity: 1.4 }),
    0, 0, 0.18 * scale, false, false,
  );
  g.add(eye);
  const rotor = mesh(new THREE.TorusGeometry(0.24 * scale, 0.03 * scale, 6, 18), toonMat('#9fb4d8'), 0, 0.14 * scale, 0, false, false);
  rotor.rotation.x = Math.PI / 2;
  rotor.name = 'rotor';
  g.add(rotor);
  return g;
}

/** Slow-rising glowing spores (additive points). */
export function createSpores(count = 24, area = 13, color = '#c9a0ff'): THREE.Points {
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    pos[i * 3] = (Math.random() - 0.5) * area;
    pos[i * 3 + 1] = 0.3 + Math.random() * 3;
    pos[i * 3 + 2] = (Math.random() - 0.5) * area;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const pts = new THREE.Points(geo, new THREE.PointsMaterial({
    color, size: 0.2, transparent: true, opacity: 0.7,
    blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true,
  }));
  pts.name = 'spores';
  return pts;
}
