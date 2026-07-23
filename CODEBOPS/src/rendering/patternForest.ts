/**
 * Pattern Forest — World 3, a moonlit grove of glowing mushrooms and
 * fireflies. Mossy puzzle tiles, pickable flowers, yucky (but adorable)
 * mushrooms, and fairy-ring goals that sparkle for a delivery.
 */
import * as THREE from 'three';
import type { LevelDef } from '../data/schemas/level';
import { createGroundTile, createBush, createSparkles, createSpores } from './worldFactories';

export const TILE = 1.6;
export const STEP = 1.72;
export const TILE_TOP = 0.42;

function toon(color: string, emissive = '#000000', intensity = 0): THREE.MeshToonMaterial {
  return new THREE.MeshToonMaterial({ color, emissive, emissiveIntensity: intensity });
}

function mesh(geo: THREE.BufferGeometry, mat: THREE.Material, cast = true, receive = true): THREE.Mesh {
  const m = new THREE.Mesh(geo, mat);
  m.castShadow = cast;
  m.receiveShadow = receive;
  return m;
}

/** A pickable forest flower — stem, leaves, five glowing petals. */
export function createFlower(): THREE.Group {
  const g = new THREE.Group();
  const stem = mesh(new THREE.CylinderGeometry(0.035, 0.05, 0.5, 6), toon('#3f9e4d'));
  stem.position.y = 0.25;
  g.add(stem);
  const leaf = mesh(new THREE.SphereGeometry(0.09, 6, 4), toon('#4cc25e'));
  leaf.scale.set(1.6, 0.35, 0.8);
  leaf.position.set(0.09, 0.18, 0);
  leaf.rotation.z = -0.5;
  g.add(leaf);
  const petals = new THREE.Group();
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2;
    const p = mesh(new THREE.SphereGeometry(0.105, 8, 6), toon('#ff8fc7', '#ff5fa2', 0.35));
    p.scale.set(1, 0.45, 1);
    p.position.set(Math.cos(a) * 0.14, 0, Math.sin(a) * 0.14);
    petals.add(p);
  }
  petals.position.y = 0.52;
  g.add(petals);
  const heart = mesh(new THREE.SphereGeometry(0.085, 8, 6), toon('#ffe066', '#ffd23e', 0.8));
  heart.position.y = 0.55;
  g.add(heart);
  return g;
}

/** A yucky-but-cute glowing mushroom (do NOT deliver!). */
export function createMushroom(scale = 1, capColor = '#b47dff', glow = '#8a4fff'): THREE.Group {
  const g = new THREE.Group();
  const stem = mesh(new THREE.CylinderGeometry(0.11, 0.15, 0.3, 8), toon('#efe6f7'));
  stem.position.y = 0.15;
  g.add(stem);
  const cap = mesh(new THREE.SphereGeometry(0.26, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2), toon(capColor, glow, 0.45));
  cap.position.y = 0.28;
  g.add(cap);
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI * 2 + 0.4;
    const dot = mesh(new THREE.SphereGeometry(0.035, 6, 4), toon('#f7effc', '#ffffff', 0.5), false, false);
    dot.position.set(Math.cos(a) * 0.15, 0.4, Math.sin(a) * 0.15);
    g.add(dot);
  }
  g.scale.setScalar(scale);
  return g;
}

/** Fairy ring — the goal: a glowing ring of tiny mushrooms + sparkles. */
function createFairyRing(): THREE.Group {
  const g = new THREE.Group();
  const pad = mesh(new THREE.CylinderGeometry(0.62, 0.68, 0.1, 24), toon('#274a5e', '#3ec6d8', 0.35));
  pad.position.y = 0.05;
  g.add(pad);
  const ringGlow = mesh(new THREE.TorusGeometry(0.5, 0.035, 8, 32), toon('#7ff3ff', '#54e6ff', 1.2), false, false);
  ringGlow.rotation.x = -Math.PI / 2;
  ringGlow.position.y = 0.11;
  ringGlow.name = 'ringGlow';
  g.add(ringGlow);
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2;
    const m = createMushroom(0.42, '#5fc9ff', '#3ec6d8');
    m.position.set(Math.cos(a) * 0.5, 0.1, Math.sin(a) * 0.5);
    g.add(m);
  }
  const star = mesh(new THREE.OctahedronGeometry(0.16), toon('#fff7ad', '#ffd23e', 1.4), false, false);
  star.position.y = 0.75;
  star.name = 'goalStar';
  g.add(star);
  return g;
}

/** Giant background mushroom the size of a tree. */
function giantMushroom(scale: number, capColor: string): THREE.Group {
  const g = new THREE.Group();
  const stem = mesh(new THREE.CylinderGeometry(0.35, 0.55, 2.2, 10), toon('#cfc4e8'));
  stem.position.y = 1.1;
  g.add(stem);
  const cap = mesh(new THREE.SphereGeometry(1.35, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2.2), toon(capColor, capColor, 0.25));
  cap.position.y = 2.1;
  cap.scale.set(1.25, 0.85, 1.25);
  cap.name = 'gmCap';
  g.add(cap);
  g.scale.setScalar(scale);
  return g;
}

export class PatternForest {
  readonly group = new THREE.Group();
  readonly itemNodes = new Map<string, THREE.Object3D>();
  private fireflies: THREE.Points;
  private fireflyBase: Float32Array;
  private glowStars: THREE.Object3D[] = [];
  private spores: THREE.Points | null = null;
  private sporeSpeeds: Float32Array = new Float32Array(0);
  private readonly giantCaps: THREE.Object3D[] = [];
  private readonly originX: number;
  private readonly originZ: number;

  constructor(level: LevelDef) {
    this.group.name = 'pattern-forest';
    this.originX = -((level.cols - 1) * STEP) / 2;
    this.originZ = -((level.rows - 1) * STEP) / 2;

    // Midnight forest floor
    const slab = mesh(new THREE.CylinderGeometry(16, 18, 0.6, 40), toon('#1d3b4a'), false, true);
    slab.position.y = -0.3;
    slab.scale.z = 0.75;
    this.group.add(slab);

    // Mossy puzzle tiles with a faint glow checker
    for (let row = 0; row < level.rows; row++) {
      for (let col = 0; col < level.cols; col++) {
        const even = (row + col) % 2 === 0;
        const tile = createGroundTile(TILE, even ? '#3f7d5c' : '#37714f');
        tile.traverse((o) => {
          if (o instanceof THREE.Mesh) {
            const m = o.material as THREE.MeshToonMaterial;
            m.emissive = new THREE.Color(even ? '#123b2a' : '#0e3222');
            m.emissiveIntensity = 0.5;
          }
        });
        const p = this.cellToWorld(col, row);
        tile.position.set(p.x, TILE_TOP, p.z);
        this.group.add(tile);
      }
    }

    // Blocked cells → moonlit brambles
    for (const b of level.blocked) {
      const p = this.cellToWorld(b.col, b.row);
      const bush = createBush(1.05);
      bush.position.set(p.x, TILE_TOP, p.z);
      this.group.add(bush);
    }

    // Items: flowers + mushrooms
    for (const item of level.items) {
      const node = item.kind === 'flower' ? createFlower() : createMushroom(1);
      const p = this.cellToWorld(item.col, item.row);
      node.position.set(p.x, TILE_TOP, p.z);
      this.group.add(node);
      this.itemNodes.set(item.id, node);
    }

    // Fairy-ring goals (all of them)
    for (const goal of level.goals) {
      const ring = createFairyRing();
      const gp = this.cellToWorld(goal.col, goal.row);
      ring.position.set(gp.x, TILE_TOP, gp.z);
      const star = ring.getObjectByName('goalStar');
      if (star) this.glowStars.push(star);
      this.group.add(ring);
    }

    // Giant glowing mushrooms framing the grove
    const giants: Array<[number, number, number, string]> = [
      [-6.2, -2.6, 1.25, '#7d4fd4'], [6.4, -3.2, 1.5, '#4f8fd4'], [-5.6, 3.4, 0.95, '#d44f9e'], [6.0, 3.6, 1.1, '#7d4fd4'],
    ];
    for (const [x, z, s, c] of giants) {
      const gm = giantMushroom(s, c);
      gm.position.set(x, 0, z);
      const cap = gm.getObjectByName('gmCap');
      if (cap) this.giantCaps.push(cap);
      this.group.add(gm);
    }

    // Sleeping moon flower where Mixy watches
    const moonCap = giantMushroom(0.55, '#d44f9e');
    moonCap.position.set(4.55, 0, -1.4);
    this.group.add(moonCap);

    // Fireflies — additive points that drift and twinkle
    const count = 70;
    this.fireflyBase = new Float32Array(count * 3);
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      this.fireflyBase[i * 3] = (Math.random() - 0.5) * 15;
      this.fireflyBase[i * 3 + 1] = 0.6 + Math.random() * 2.6;
      this.fireflyBase[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    pos.set(this.fireflyBase);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    this.fireflies = new THREE.Points(geo, new THREE.PointsMaterial({
      color: '#d6ff7a', size: 0.14, transparent: true, opacity: 0.95,
      blending: THREE.AdditiveBlending, depthWrite: false,
    }));
    this.group.add(this.fireflies);

    this.group.add(createSparkles(24, 12));

    // Glowing spores drifting up from the grove floor
    this.spores = createSpores(26, 14);
    this.sporeSpeeds = new Float32Array(26);
    for (let i = 0; i < 26; i++) this.sporeSpeeds[i] = 0.12 + Math.random() * 0.22;
    this.group.add(this.spores);
  }

  cellToWorld(col: number, row: number): THREE.Vector3 {
    return new THREE.Vector3(this.originX + col * STEP, TILE_TOP, this.originZ + row * STEP);
  }

  /** Mixy's lookout — atop the moon flower's cap. */
  mixyLookout(): THREE.Vector3 {
    return new THREE.Vector3(4.55, 1.15, -1.4);
  }

  update(dt: number, elapsed: number): void {
    const attr = this.fireflies.geometry.getAttribute('position') as THREE.BufferAttribute;
    for (let i = 0; i < attr.count; i++) {
      const bx = this.fireflyBase[i * 3];
      const by = this.fireflyBase[i * 3 + 1];
      const bz = this.fireflyBase[i * 3 + 2];
      attr.setXYZ(
        i,
        bx + Math.sin(elapsed * 0.5 + i * 1.7) * 0.5,
        by + Math.sin(elapsed * 0.9 + i * 2.3) * 0.3,
        bz + Math.cos(elapsed * 0.4 + i) * 0.5,
      );
    }
    attr.needsUpdate = true;
    (this.fireflies.material as THREE.PointsMaterial).opacity = 0.6 + Math.sin(elapsed * 2.2) * 0.3;
    for (const s of this.glowStars) {
      s.rotation.y += dt * 1.6;
      s.position.y = 0.75 + Math.sin(elapsed * 2) * 0.06;
    }
    // Spores rise gently and wrap
    if (this.spores) {
      const sattr = this.spores.geometry.getAttribute('position') as THREE.BufferAttribute;
      for (let i = 0; i < sattr.count; i++) {
        let y = sattr.getY(i) + this.sporeSpeeds[i] * dt;
        if (y > 3.8) y = 0.25;
        sattr.setY(i, y);
        sattr.setX(i, sattr.getX(i) + Math.sin(elapsed * 0.8 + i) * dt * 0.12);
      }
      sattr.needsUpdate = true;
      (this.spores.material as THREE.PointsMaterial).opacity = 0.5 + Math.sin(elapsed * 1.6) * 0.25;
    }
    // Giant mushroom caps slowly breathe
    this.giantCaps.forEach((cap, i) => {
      const b = 1 + Math.sin(elapsed * 0.8 + i * 1.6) * 0.035;
      cap.scale.set(1.25 * b, 0.85 / b, 1.25 * b);
    });
  }
}
