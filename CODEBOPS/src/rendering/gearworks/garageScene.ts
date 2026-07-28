/**
 * Gearworks Garage — workshop environment shell (Phase 1).
 *
 * A toy-diorama interior matched to the reference art: bright blue brick
 * wall, navy wainscot, blueprint posters, wooden pegboard with toy tools,
 * warm hanging lamps, and a big wooden workbench holding placeholder
 * machines (motor → gear train → strawberry press). No simulation yet —
 * the machines are scenery until Phase 2 brings the machine interpreter.
 */
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { toonMat } from '../materials/toon';
import { createGear } from './gearMesh';

function mesh(
  geo: THREE.BufferGeometry,
  mat: THREE.Material,
  x = 0, y = 0, z = 0,
  cast = true, receive = true,
): THREE.Mesh {
  const m = new THREE.Mesh(geo, mat);
  m.position.set(x, y, z);
  m.castShadow = cast;
  m.receiveShadow = receive;
  return m;
}

/** Blue tiled floor with soft grout lines. */
function floorTexture(): THREE.CanvasTexture {
  const s = 256;
  const c = document.createElement('canvas');
  c.width = c.height = s;
  const ctx = c.getContext('2d')!;
  ctx.fillStyle = '#3a55b8';
  ctx.fillRect(0, 0, s, s);
  ctx.strokeStyle = 'rgba(22,30,80,0.45)';
  ctx.lineWidth = 5;
  for (let i = 0; i <= 2; i++) {
    ctx.beginPath(); ctx.moveTo(0, i * 128); ctx.lineTo(s, i * 128); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(i * 128, 0); ctx.lineTo(i * 128, s); ctx.stroke();
  }
  // subtle tile sheen
  ctx.fillStyle = 'rgba(255,255,255,0.05)';
  ctx.fillRect(6, 6, 116, 56);
  ctx.fillRect(134, 134, 116, 56);
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(7, 5);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/** Bright blue brick wall. */
function brickTexture(): THREE.CanvasTexture {
  const w = 256, h = 128;
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const ctx = c.getContext('2d')!;
  ctx.fillStyle = '#2c3f8f'; // mortar
  ctx.fillRect(0, 0, w, h);
  const bw = 62, bh = 28, gap = 6;
  for (let row = 0; row < 4; row++) {
    const off = row % 2 === 0 ? 0 : -(bw + gap) / 2;
    for (let col = -1; col < 5; col++) {
      const x = off + col * (bw + gap) + gap / 2;
      const y = row * (bh + gap) + gap / 2;
      ctx.fillStyle = (row + col) % 3 === 0 ? '#4a72dd' : '#4168d2';
      ctx.beginPath();
      ctx.roundRect(x, y, bw, bh, 5);
      ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.14)';
      ctx.beginPath();
      ctx.roundRect(x + 3, y + 3, bw - 6, 8, 4);
      ctx.fill();
    }
  }
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(6, 4);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/** Navy blueprint poster with light-blue gear doodles. */
function blueprintTexture(): THREE.CanvasTexture {
  const w = 256, h = 128;
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const ctx = c.getContext('2d')!;
  ctx.fillStyle = '#1d2f7d';
  ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = 'rgba(127,196,255,0.75)';
  ctx.lineWidth = 3;
  const gear = (cx: number, cy: number, r: number, teeth: number): void => {
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.arc(cx, cy, r * 0.35, 0, Math.PI * 2); ctx.stroke();
    for (let i = 0; i < teeth; i++) {
      const a = (i / teeth) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
      ctx.lineTo(cx + Math.cos(a) * (r + 7), cy + Math.sin(a) * (r + 7));
      ctx.stroke();
    }
  };
  gear(52, 62, 26, 8);
  gear(120, 50, 18, 7);
  gear(180, 74, 30, 9);
  // music note doodle
  ctx.beginPath(); ctx.arc(228, 84, 6, 0, Math.PI * 2); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(234, 84); ctx.lineTo(234, 48); ctx.lineTo(246, 52); ctx.stroke();
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export type GarageLayout = 'showcase' | 'motorLab' | 'liftBay';

export class GarageScene {
  readonly group = new THREE.Group();
  private readonly spinners: Array<{ node: THREE.Object3D; speed: number }> = [];
  private readonly lampGlows: THREE.Mesh[] = [];

  constructor(private readonly layout: GarageLayout = 'showcase') {
    this.group.name = 'gearworks-garage';

    // ---- floor ----
    const floor = mesh(
      new THREE.BoxGeometry(30, 0.5, 18),
      new THREE.MeshToonMaterial({ map: floorTexture() }),
      0, -0.25, 2, false, true,
    );
    this.group.add(floor);

    // ---- back wall: brick + navy wainscot + trim ----
    const wall = mesh(
      new THREE.BoxGeometry(30, 10, 0.5),
      new THREE.MeshToonMaterial({ map: brickTexture() }),
      0, 5, -6.5, false, true,
    );
    this.group.add(wall);
    this.group.add(mesh(new RoundedBoxGeometry(30, 2.2, 0.7, 2, 0.1), toonMat('#1b2664'), 0, 1.0, -6.35, false, true));
    this.group.add(mesh(new THREE.BoxGeometry(30, 0.28, 0.75), toonMat('#39406e'), 0, 2.2, -6.3, false, false));

    // ---- blueprint posters ----
    const bp1 = mesh(new THREE.BoxGeometry(5.4, 2.7, 0.12), new THREE.MeshToonMaterial({ map: blueprintTexture() }), -1.2, 6.2, -6.2, false, false);
    this.group.add(bp1);
    this.group.add(mesh(new RoundedBoxGeometry(5.8, 3.1, 0.1, 2, 0.05), toonMat('#c9a45c'), -1.2, 6.2, -6.26, false, false));
    const bp2 = mesh(new THREE.BoxGeometry(3.4, 1.9, 0.12), new THREE.MeshToonMaterial({ map: blueprintTexture() }), 9.4, 6.0, -6.2, false, false);
    bp2.rotation.z = -0.03;
    this.group.add(bp2);

    // ---- pegboard with toy tools ----
    const board = mesh(new RoundedBoxGeometry(4.6, 3.0, 0.2, 2, 0.08), toonMat('#d9a45c'), -8.6, 5.9, -6.2, false, false);
    this.group.add(board);
    // wrench (simple silhouette)
    const tool = toonMat('#aab3c8');
    const wrench = new THREE.Group();
    wrench.add(mesh(new RoundedBoxGeometry(0.3, 1.5, 0.14, 1, 0.06), tool, 0, 0, 0, false, false));
    wrench.add(mesh(new THREE.TorusGeometry(0.3, 0.12, 8, 14, Math.PI * 1.4), tool, 0, 0.85, 0, false, false));
    wrench.position.set(-9.6, 5.9, -6.05);
    wrench.rotation.z = 0.2;
    this.group.add(wrench);
    // screwdrivers
    for (const [dx, color] of [[-0.2, '#e05a3a'], [0.6, '#8b4ddb']] as const) {
      const s = new THREE.Group();
      s.add(mesh(new THREE.CylinderGeometry(0.07, 0.07, 1.0, 8), tool, 0, -0.3, 0, false, false));
      s.add(mesh(new RoundedBoxGeometry(0.26, 0.7, 0.2, 1, 0.08), toonMat(color), 0, 0.45, 0, false, false));
      s.position.set(-8.0 + dx, 5.9, -6.05);
      this.group.add(s);
    }

    // ---- hanging lamps with warm pools of light ----
    for (const lx of [-6.5, 6.5]) {
      const lamp = new THREE.Group();
      lamp.add(mesh(new THREE.CylinderGeometry(0.06, 0.06, 3.6, 6), toonMat('#39406e'), 0, 7.4, 0, false, false));
      const shade = mesh(new THREE.ConeGeometry(0.9, 0.8, 18, 1, true), toonMat('#2e7ce6'), 0, 5.4, 0, false, false);
      lamp.add(shade);
      const bulb = mesh(
        new THREE.SphereGeometry(0.3, 12, 8),
        new THREE.MeshToonMaterial({ color: '#ffe9a8', emissive: '#ffd23e', emissiveIntensity: 1.1 }),
        0, 5.15, 0, false, false,
      );
      lamp.add(bulb);
      this.lampGlows.push(bulb);
      const glow = new THREE.PointLight('#ffd9a0', 14, 12, 2);
      glow.position.set(0, 4.9, 0.6);
      lamp.add(glow);
      lamp.position.set(lx, 0, -3.5);
      this.group.add(lamp);
    }

    // ---- workbench (lift bay keeps the floor clear for the tower) ----
    if (this.layout !== 'liftBay') {
      const bench = new THREE.Group();
      bench.add(mesh(new RoundedBoxGeometry(13.5, 0.7, 5.2, 3, 0.18), toonMat('#d9a45c'), 0, 1.55, 0));
      bench.add(mesh(new RoundedBoxGeometry(13.9, 0.32, 5.6, 2, 0.12), toonMat('#39406e'), 0, 1.15, 0));
      for (const [lx, lz] of [[-6.2, -2.1], [6.2, -2.1], [-6.2, 2.1], [6.2, 2.1]] as const) {
        bench.add(mesh(new RoundedBoxGeometry(0.55, 1.2, 0.55, 1, 0.1), toonMat('#2c3f8f'), lx, 0.55, lz));
      }
      bench.position.set(0, 0, -1.5);
      this.group.add(bench);
    }

    // ---- bench contents depend on the layout ----
    const benchTop = 1.9;
    if (this.layout === 'showcase') this.buildShowcase(benchTop);

    // loose gears on the floor (storytelling clutter, matches key art)
    for (const [gx, gz, r] of [[-8.2, 2.8, 0.5], [7.6, 3.4, 0.42]] as const) {
      const loose = createGear({ color: '#8a94ad', radius: r, teeth: 9, hubColor: '#c3c9d4' });
      loose.rotation.x = -Math.PI / 2;
      loose.position.set(gx, 0.14, gz);
      this.group.add(loose);
    }

    // toy crate
    const crate = new THREE.Group();
    crate.add(mesh(new RoundedBoxGeometry(1.4, 0.9, 1.0, 2, 0.08), toonMat('#c9843c'), 0, 0.45, 0));
    crate.add(mesh(new RoundedBoxGeometry(1.5, 0.16, 1.1, 1, 0.05), toonMat('#a86a2c'), 0, 0.9, 0));
    crate.position.set(9.6, 0, 0.4);
    crate.rotation.y = -0.3;
    this.group.add(crate);
  }


  /** Showcase bench (Phase 1 shell): motor, gear train, strawberry press. */
  private buildShowcase(benchTop: number): void {
    // Motor: blue rounded body + snout + lightning badge
    const motor = new THREE.Group();
    motor.add(mesh(new RoundedBoxGeometry(1.7, 1.3, 1.2, 3, 0.22), toonMat('#2f6fe0'), 0, 0.75, 0));
    motor.add(mesh(new THREE.CylinderGeometry(0.5, 0.55, 0.5, 16), toonMat('#4a8cf0'), 0, 1.55, 0, true, false));
    const snout = mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.8, 12), toonMat('#aab3c8'), 1.05, 0.75, 0);
    snout.rotation.z = Math.PI / 2;
    motor.add(snout);
    motor.add(mesh(new RoundedBoxGeometry(2.0, 0.24, 1.5, 1, 0.1), toonMat('#1b2664'), 0, 0.06, 0));
    // lightning badge
    const boltShape = new THREE.Shape();
    boltShape.moveTo(0.09, 0.3); boltShape.lineTo(-0.12, -0.02); boltShape.lineTo(0.0, -0.02);
    boltShape.lineTo(-0.09, -0.3); boltShape.lineTo(0.14, 0.06); boltShape.lineTo(0.02, 0.06);
    boltShape.closePath();
    const bolt = new THREE.Mesh(new THREE.ExtrudeGeometry(boltShape, { depth: 0.05, bevelEnabled: false }), toonMat('#ffd23e'));
    bolt.scale.setScalar(1.4);
    bolt.position.set(0, 0.8, 0.63);
    motor.add(bolt);
    motor.position.set(-4.6, benchTop, -1.5);
    this.group.add(motor);

    // Gear train: three toy gears on stands (idle-spin scenery)
    const gearSpecs: Array<[number, string, number, number]> = [
      [-2.2, '#ff9f2e', 0.72, 1], // x, color, radius, spin dir
      [-0.6, '#57c14e', 0.62, -1],
      [0.9, '#a06bff', 0.78, 1],
    ];
    for (const [gx, color, radius, dir] of gearSpecs) {
      const stand = mesh(new RoundedBoxGeometry(0.34, 1.1, 0.5, 1, 0.08), toonMat('#39406e'), gx, benchTop + 0.55, -1.72);
      this.group.add(stand);
      const gear = createGear({ color, radius, teeth: Math.round(radius * 14) });
      gear.position.set(gx, benchTop + 1.15, -1.4);
      this.group.add(gear);
      this.spinners.push({ node: gear, speed: dir * 0.6 * (0.7 / radius) });
    }

    // Strawberry press: red arch + jar of berries
    const press = new THREE.Group();
    press.add(mesh(new RoundedBoxGeometry(0.5, 2.2, 0.8, 2, 0.14), toonMat('#e04a3a'), -0.85, 1.1, 0));
    press.add(mesh(new RoundedBoxGeometry(0.5, 2.2, 0.8, 2, 0.14), toonMat('#e04a3a'), 0.85, 1.1, 0));
    press.add(mesh(new RoundedBoxGeometry(2.3, 0.55, 0.9, 2, 0.14), toonMat('#c9382a'), 0, 2.35, 0));
    press.add(mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.9, 10), toonMat('#aab3c8'), 0, 1.75, 0));
    press.add(mesh(new THREE.CylinderGeometry(0.45, 0.45, 0.22, 16), toonMat('#39406e'), 0, 1.3, 0));
    // glass jar with berries
    const jar = new THREE.Mesh(
      new THREE.CylinderGeometry(0.52, 0.46, 0.7, 18, 1, true),
      new THREE.MeshToonMaterial({ color: '#cfeeff', transparent: true, opacity: 0.4 }),
    );
    jar.position.set(0, 0.55, 0);
    press.add(jar);
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * Math.PI * 2;
      press.add(mesh(new THREE.SphereGeometry(0.14, 10, 8), toonMat('#e8384f'), Math.cos(a) * 0.22, 0.32 + (i % 2) * 0.16, Math.sin(a) * 0.22, false, false));
    }
    // wheel on top
    const wheel = new THREE.Mesh(new THREE.TorusGeometry(0.4, 0.09, 8, 18), toonMat('#39406e'));
    wheel.rotation.x = Math.PI / 2;
    wheel.position.set(0, 2.75, 0);
    press.add(wheel);
    this.spinners.push({ node: wheel, speed: 0.35 });
    press.position.set(3.6, benchTop, -1.5);
    this.group.add(press);
  }

  /** Where a playable machine rig sits on the bench. */
  benchAnchor(): THREE.Vector3 {
    return new THREE.Vector3(-0.4, 1.9, -1.5);
  }

  /** World-space anchor points the camera must keep framed. */
  frameCorners(): THREE.Vector3[] {
    return [
      new THREE.Vector3(-7.6, 0.3, 2.6),
      new THREE.Vector3(7.6, 0.3, 2.6),
      new THREE.Vector3(-7.6, 5.0, -1.5),
      new THREE.Vector3(7.6, 5.0, -1.5),
    ];
  }

  frameCenter(): THREE.Vector3 {
    return new THREE.Vector3(0, 2.3, -0.6);
  }

  /** Floor spots where the mascots stand (DOM sprites project from here). */
  /**
   * Where the two of them stand.
   *
   * They used to be at x = -5.6 and 6.0 — as wide as the garage. Once the
   * bench view moved in close enough to be a bench you are standing AT,
   * that put Zip behind the goal card and Mixy under the Think Trail. In
   * from the walls and forward of the bench, so the closer framing keeps
   * both of them clear of the panels.
   */
  /**
   * Where the bops stand.
   *
   * ON the bench, not on the floor in front of it. Standing at floor
   * level they were behind the bench from the camera's angle, so the
   * front edge sliced across their bodies and only their heads showed —
   * they read as peering over it rather than working at it. The bench top
   * is 13.5 wide and 5.2 deep centred at z = -1.5, so its front edge is
   * z = 1.1; standing them just inside that, out at the ends, keeps them
   * clear of the machine in the middle.
   *
   * The lift bay has no bench, so there they stay on the floor.
   */
  private static readonly BENCH_TOP_Y = 1.9;

  zipSpot(): THREE.Vector3 {
    return this.layout === 'liftBay'
      ? new THREE.Vector3(-3.5, 0.05, 4.3)
      : new THREE.Vector3(-4.9, GarageScene.BENCH_TOP_Y, 0.2);
  }

  mixySpot(): THREE.Vector3 {
    return this.layout === 'liftBay'
      ? new THREE.Vector3(3.9, 0.05, 4.3)
      : new THREE.Vector3(4.9, GarageScene.BENCH_TOP_Y, 0.2);
  }

  update(dt: number, elapsed: number): void {
    for (const s of this.spinners) s.node.rotation.z += dt * s.speed;
    for (let i = 0; i < this.lampGlows.length; i++) {
      const m = this.lampGlows[i].material as THREE.MeshToonMaterial;
      m.emissiveIntensity = 1.0 + Math.sin(elapsed * 1.6 + i * 2.1) * 0.15;
    }
  }
}
