/**
 * ChainRig — Phase 3 buildable machine: a motor at one end, a bell at the
 * other, and a row of axle posts between them. The child taps glowing
 * ghost anchors to snap gears in, taps a dashed belt slot to stretch a
 * belt, then BOPs the motor and watches power (and spin DIRECTION — the
 * curriculum) travel down the chain.
 *
 * Rendering only — chain truth lives in gameplay/gearworks/gearChain.ts.
 * Every tappable part carries userData { gwNode } or { gwBelt } so the
 * screen can raycast without knowing mesh internals.
 */
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { toonMat } from '../materials/toon';
import { createGear } from './gearMesh';
import type { ChainSpec, ChainPlacement, ChainFlow } from '../../gameplay/gearworks/gearChain';

const GEAR_COLORS = ['#ff9f2e', '#57c14e', '#a06bff', '#38b6ff', '#ff5fa2'];
const MESH_OVERLAP = 0.16; // teeth interlock depth between meshed gears
const BELT_SPAN = 2.6; // axle distance across a belt link (too far for teeth!)
const AXLE_Y = 1.5; // axle height above the rig base

function mesh(geo: THREE.BufferGeometry, mat: THREE.Material, x = 0, y = 0, z = 0, cast = true, receive = true): THREE.Mesh {
  const m = new THREE.Mesh(geo, mat);
  m.position.set(x, y, z);
  m.castShadow = cast;
  m.receiveShadow = receive;
  return m;
}

/** Flat stadium ring (a toy rubber band stretched around two pulleys). */
function beltGeometry(span: number, radius: number, band = 0.16, depth = 0.2): THREE.ExtrudeGeometry {
  const stadium = (r: number): THREE.Shape => {
    const s = new THREE.Shape();
    const h = span / 2;
    s.moveTo(-h, r);
    s.lineTo(h, r);
    s.absarc(h, 0, r, Math.PI / 2, -Math.PI / 2, true);
    s.lineTo(-h, -r);
    s.absarc(-h, 0, r, -Math.PI / 2, Math.PI / 2, true);
    return s;
  };
  const shape = stadium(radius);
  const hole = stadium(radius - band);
  shape.holes.push(new THREE.Path(hole.getPoints(24)));
  const geo = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: true, bevelThickness: 0.03, bevelSize: 0.03, bevelSegments: 1 });
  geo.center();
  return geo;
}

/** Point on the stadium mid-line at param t ∈ [0,1), for belt rivets. */
function stadiumPoint(t: number, span: number, r: number): { x: number; y: number } {
  const straight = span;
  const arc = Math.PI * r;
  const per = 2 * straight + 2 * arc;
  let d = ((t % 1) + 1) % 1 * per;
  const h = span / 2;
  if (d < straight) return { x: -h + d, y: r }; // top, left→right
  d -= straight;
  if (d < arc) {
    const a = Math.PI / 2 - (d / arc) * Math.PI; // right cap, top→bottom
    return { x: h + Math.cos(a) * r, y: Math.sin(a) * r };
  }
  d -= arc;
  if (d < straight) return { x: h - d, y: -r }; // bottom, right→left
  d -= straight;
  const a = -Math.PI / 2 - (d / arc) * Math.PI; // left cap, bottom→top
  return { x: -h + Math.cos(a) * r, y: Math.sin(a) * r };
}

interface NodeRig {
  readonly x: number;
  readonly radius: number;
  readonly gear: THREE.Group; // real gear (visible when placed)
  readonly ghost: THREE.Group | null; // tap target (placeable nodes only)
  readonly arrow: THREE.Group; // spin-direction badge, shown while turning
  spinning: boolean;
  spinSign: number; // -1 = cw (screen-wise), +1 = ccw
}

interface BeltRig {
  readonly slot: THREE.Group; // dashed hint + tap target
  readonly belt: THREE.Group; // stadium band (visible when placed)
  readonly rivets: THREE.Mesh[];
  readonly span: number;
  readonly radius: number;
  travel: number;
  moving: boolean;
  moveSign: number;
}

export class ChainRig {
  readonly group = new THREE.Group();
  private readonly nodes: NodeRig[] = [];
  private readonly belts = new Map<number, BeltRig>();
  private readonly lamp: THREE.Mesh;
  private readonly bell: THREE.Group;
  private readonly spark: THREE.Mesh;
  private motorOn = false;
  private bellRing = 0;
  private pulse = 0;

  constructor(private readonly spec: ChainSpec) {
    this.group.name = 'chain-rig';

    // ---- node layout: meshed gears almost touch, belt gaps are wide ----
    const radii = this.spec.nodes.map((_, i) =>
      i === 0 ? 0.95 : i === this.spec.nodes.length - 1 ? 0.8 : 0.7);
    const xs: number[] = [0];
    for (let i = 0; i < this.spec.links.length; i++) {
      const gap = this.spec.links[i] === 'mesh'
        ? radii[i] + radii[i + 1] - MESH_OVERLAP
        : BELT_SPAN;
      xs.push(xs[i] + gap);
    }
    const width = xs[xs.length - 1];
    const x0 = -width / 2; // center the whole rig on the bench

    // ---- base plate ----
    this.group.add(mesh(
      new RoundedBoxGeometry(width + 4.2, 0.3, 2.6, 2, 0.1),
      toonMat('#1b2664'), 0, 0.15, 0,
    ));

    // ---- motor block feeding node 0 ----
    const motor = new THREE.Group();
    motor.add(mesh(new RoundedBoxGeometry(1.7, 1.4, 1.3, 3, 0.22), toonMat('#2f6fe0'), 0, 0.95, 0));
    motor.add(mesh(new THREE.CylinderGeometry(0.5, 0.56, 0.45, 16), toonMat('#4a8cf0'), 0, 1.8, 0, true, false));
    const boltShape = new THREE.Shape();
    boltShape.moveTo(0.09, 0.3); boltShape.lineTo(-0.12, -0.02); boltShape.lineTo(0.0, -0.02);
    boltShape.lineTo(-0.09, -0.3); boltShape.lineTo(0.14, 0.06); boltShape.lineTo(0.02, 0.06);
    boltShape.closePath();
    const bolt = new THREE.Mesh(new THREE.ExtrudeGeometry(boltShape, { depth: 0.05, bevelEnabled: false }), toonMat('#ffd23e'));
    bolt.scale.setScalar(1.35);
    bolt.position.set(0, 0.95, 0.68);
    motor.add(bolt);
    this.lamp = mesh(
      new THREE.SphereGeometry(0.22, 14, 10),
      new THREE.MeshToonMaterial({ color: '#8a94ad', emissive: '#000000', emissiveIntensity: 0 }),
      0.5, 1.85, 0.3, false, false,
    );
    motor.add(this.lamp);
    motor.position.set(x0 - 1.6, 0.3, -0.4);
    this.group.add(motor);

    // ---- nodes: stand + gear (or ghost anchor) + direction arrow ----
    for (let i = 0; i < this.spec.nodes.length; i++) {
      const x = x0 + xs[i];
      const r = radii[i];
      const fixed = this.spec.nodes[i].fixed;
      const color = GEAR_COLORS[i % GEAR_COLORS.length];

      const stand = mesh(new RoundedBoxGeometry(0.38, AXLE_Y - 0.3, 0.55, 1, 0.08), toonMat('#39406e'), x, 0.3 + (AXLE_Y - 0.3) / 2, -0.55);
      this.group.add(stand);
      const axle = mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.9, 10), toonMat('#aab3c8'), x, 0.3 + AXLE_Y, -0.15);
      axle.rotation.x = Math.PI / 2;
      this.group.add(axle);

      const gear = createGear({ color, radius: r, teeth: Math.max(8, Math.round(r * 13)) });
      gear.position.set(x, 0.3 + AXLE_Y, 0.14);
      // stagger tooth phase so meshed teeth interlock instead of clashing
      gear.rotation.z = i * 0.28;
      gear.traverse((o) => { o.userData.gwNode = i; });
      gear.visible = fixed;
      this.group.add(gear);
      this.nodes.push({ x, radius: r, gear, ghost: fixed ? null : this.makeGhost(x, r, i), arrow: this.makeArrow(x, r), spinning: false, spinSign: -1 });
    }

    // ---- belt slots ----
    for (let i = 0; i < this.spec.links.length; i++) {
      if (this.spec.links[i] !== 'beltSlot') continue;
      this.belts.set(i, this.makeBeltRig(i, x0 + xs[i], x0 + xs[i + 1], radii[i], radii[i + 1]));
    }

    // ---- the bell over the last node (the machine's payoff) ----
    this.bell = new THREE.Group();
    const post = mesh(new RoundedBoxGeometry(0.3, 3.3, 0.4, 1, 0.08), toonMat('#c9843c'), 0, 1.65, 0);
    this.bell.add(post);
    const armBar = mesh(new RoundedBoxGeometry(1.6, 0.26, 0.36, 1, 0.08), toonMat('#c9843c'), -0.72, 3.3, 0);
    this.bell.add(armBar);
    const dome = new THREE.Group();
    const cup = new THREE.Mesh(new THREE.SphereGeometry(0.5, 18, 12, 0, Math.PI * 2, 0, Math.PI / 2), toonMat('#ffd23e'));
    cup.rotation.x = Math.PI; // open side down
    cup.position.y = -0.1;
    cup.castShadow = true;
    dome.add(cup);
    dome.add(mesh(new THREE.SphereGeometry(0.12, 10, 8), toonMat('#ff9f2e'), 0, 0.04, 0, false, false));
    dome.add(mesh(new THREE.SphereGeometry(0.11, 10, 8), toonMat('#39406e'), 0, -0.48, 0, false, false)); // clapper
    dome.position.set(-1.3, 3.02, 0);
    this.bell.add(dome);
    const last = this.nodes[this.nodes.length - 1];
    this.bell.position.set(last.x + 1.3, 0.3, -0.55);
    this.group.add(this.bell);

    // ---- spark marker: shows WHERE power stops on a broken run ----
    this.spark = mesh(
      new THREE.SphereGeometry(0.2, 10, 8),
      new THREE.MeshToonMaterial({ color: '#ffd23e', emissive: '#ffb020', emissiveIntensity: 1.2, transparent: true, opacity: 0 }),
      0, 0, 0, false, false,
    );
    this.group.add(this.spark);
  }

  /** Ghost anchor: translucent pulsing gear + a "+" badge, tap to place. */
  private makeGhost(x: number, r: number, nodeIndex: number): THREE.Group {
    const ghost = new THREE.Group();
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(r * 0.82, 0.07, 8, 28),
      new THREE.MeshToonMaterial({ color: '#7fc4ff', emissive: '#3d8fe0', emissiveIntensity: 0.8, transparent: true, opacity: 0.75 }),
    );
    ghost.add(ring);
    // dashed tooth hints around the ring
    for (let t = 0; t < 8; t++) {
      const a = (t / 8) * Math.PI * 2;
      const dash = mesh(
        new RoundedBoxGeometry(0.16, 0.09, 0.09, 1, 0.03),
        ring.material, Math.cos(a) * r * 1.02, Math.sin(a) * r * 1.02, 0, false, false,
      );
      dash.rotation.z = a + Math.PI / 2;
      ghost.add(dash);
    }
    const plus = new THREE.Group();
    const plusMat = new THREE.MeshToonMaterial({ color: '#ffffff', emissive: '#bfe4ff', emissiveIntensity: 0.6 });
    plus.add(mesh(new RoundedBoxGeometry(0.34, 0.1, 0.08, 1, 0.03), plusMat, 0, 0, 0, false, false));
    plus.add(mesh(new RoundedBoxGeometry(0.1, 0.34, 0.08, 1, 0.03), plusMat, 0, 0, 0.01, false, false));
    ghost.add(plus);
    // big invisible tap pad so little fingers can't miss
    const pad = new THREE.Mesh(
      new THREE.CircleGeometry(r * 1.25, 16),
      new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false }),
    );
    ghost.add(pad);
    ghost.position.set(x, 0.3 + AXLE_Y, 0.14);
    ghost.traverse((o) => { o.userData.gwNode = nodeIndex; });
    this.group.add(ghost);
    return ghost;
  }

  /** Direction badge above a node — the lesson made visible. */
  private makeArrow(x: number, r: number): THREE.Group {
    const arrow = new THREE.Group();
    const mat = new THREE.MeshToonMaterial({ color: '#ffffff', emissive: '#7fc4ff', emissiveIntensity: 0.35 });
    const arc = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.06, 8, 20, Math.PI * 1.2), mat);
    arrow.add(arc);
    const tip = new THREE.Mesh(new THREE.ConeGeometry(0.13, 0.28, 10), mat);
    tip.position.set(Math.cos(Math.PI * 1.2) * 0.3, Math.sin(Math.PI * 1.2) * 0.3, 0);
    tip.rotation.z = Math.PI * 1.2 - Math.PI / 2;
    arrow.add(tip);
    arrow.position.set(x, 0.3 + AXLE_Y + r + 0.55, 0.14);
    arrow.scale.x = -1; // reads clockwise
    arrow.visible = false;
    this.group.add(arrow);
    return arrow;
  }

  private makeBeltRig(link: number, xa: number, xb: number, ra: number, rb: number): BeltRig {
    const span = xb - xa;
    const radius = Math.min(ra, rb) * 0.52; // belt rides the hubs
    const cx = (xa + xb) / 2;
    const cy = 0.3 + AXLE_Y;

    // dashed "stretch a belt here" hint + tap pad
    const slot = new THREE.Group();
    const hintMat = new THREE.MeshToonMaterial({ color: '#ffd23e', emissive: '#c99a20', emissiveIntensity: 0.7, transparent: true, opacity: 0.8 });
    for (let d = 0; d < 5; d++) {
      const t = (d + 0.5) / 5;
      slot.add(mesh(new RoundedBoxGeometry(0.22, 0.09, 0.09, 1, 0.03), hintMat, -span / 2 + t * span, radius, 0, false, false));
      slot.add(mesh(new RoundedBoxGeometry(0.22, 0.09, 0.09, 1, 0.03), hintMat, -span / 2 + t * span, -radius, 0, false, false));
    }
    const pad = new THREE.Mesh(
      new THREE.PlaneGeometry(span * 0.9, radius * 4),
      new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false }),
    );
    slot.add(pad);
    slot.position.set(cx, cy, 0.15);
    slot.traverse((o) => { o.userData.gwBelt = link; });
    this.group.add(slot);

    // the belt itself
    const belt = new THREE.Group();
    const band = new THREE.Mesh(beltGeometry(span, radius), toonMat('#e8536b'));
    band.castShadow = true;
    belt.add(band);
    const rivets: THREE.Mesh[] = [];
    for (let rv = 0; rv < 6; rv++) {
      const rivet = mesh(new RoundedBoxGeometry(0.12, 0.12, 0.1, 1, 0.03), toonMat('#fff2d9'), 0, 0, 0.12, false, false);
      belt.add(rivet);
      rivets.push(rivet);
    }
    belt.position.set(cx, cy, 0.34);
    belt.visible = false;
    belt.traverse((o) => { o.userData.gwBelt = link; });
    this.group.add(belt);

    const rig: BeltRig = { slot, belt, rivets, span, radius: radius - 0.08, travel: 0, moving: false, moveSign: -1 };
    this.layoutRivets(rig);
    return rig;
  }

  private layoutRivets(rig: BeltRig): void {
    rig.rivets.forEach((rivet, i) => {
      const p = stadiumPoint(rig.travel + i / rig.rivets.length, rig.span, rig.radius);
      rivet.position.set(p.x, p.y, 0.12);
    });
  }

  /**
   * Currently tappable parts (call fresh on every tap — visibility moves
   * with placement): visible ghosts place a gear, visible placed gears
   * remove one; same for belt slots/belts. Fixed gears are not tappable.
   */
  tapTargets(): THREE.Object3D[] {
    const targets: THREE.Object3D[] = [];
    this.nodes.forEach((n, i) => {
      if (!n.ghost) return; // fixed node
      if (n.ghost.visible) targets.push(n.ghost);
      else if (this.spec.nodes[i].fixed === false && n.gear.visible) targets.push(n.gear);
    });
    for (const b of this.belts.values()) {
      targets.push(b.slot.visible ? b.slot : b.belt);
    }
    return targets;
  }

  /** Show/hide gears, ghosts, belts, and slot hints to match placement. */
  setPlacement(p: ChainPlacement): void {
    this.nodes.forEach((n, i) => {
      n.gear.visible = p.gears[i];
      if (n.ghost) n.ghost.visible = !p.gears[i];
    });
    for (const [link, rig] of this.belts) {
      rig.belt.visible = p.belts[link];
      rig.slot.visible = !p.belts[link];
    }
  }

  /** Animate the propagated flow (null = machine at rest). */
  setFlow(flow: ChainFlow | null): void {
    this.nodes.forEach((n, i) => {
      const turning = flow?.turning[i] === true;
      n.spinning = turning;
      n.spinSign = flow?.dirs[i] === 'ccw' ? 1 : -1;
      n.arrow.visible = turning;
      n.arrow.scale.x = flow?.dirs[i] === 'ccw' ? 1 : -1;
    });
    for (const [link, rig] of this.belts) {
      const moving = flow !== null && flow.turning[link] && flow.turning[link + 1];
      rig.moving = moving;
      rig.moveSign = flow?.dirs[link] === 'ccw' ? 1 : -1;
    }
  }

  /** Reveal power up to (and including) `count` nodes — playback beat. */
  partialFlow(flow: ChainFlow, count: number): void {
    const clipped = {
      ...flow,
      turning: flow.turning.map((t, i) => t && i < count),
      dirs: flow.dirs.map((d, i) => (i < count ? d : null)),
    };
    this.setFlow(clipped);
  }

  setMotorOn(on: boolean): void {
    this.motorOn = on;
    const mat = this.lamp.material as THREE.MeshToonMaterial;
    if (on) {
      mat.color.set('#7dee8e');
      mat.emissive.set('#3ed35f');
      mat.emissiveIntensity = 1.0;
    } else {
      mat.color.set('#8a94ad');
      mat.emissive.set('#000000');
      mat.emissiveIntensity = 0;
    }
  }

  /** Sad little spark where power stops (broken link i → between nodes). */
  showBreakSpark(link: number): void {
    const a = this.nodes[link];
    const b = this.nodes[link + 1];
    this.spark.position.set((a.x + b.x) / 2, 0.3 + AXLE_Y, 0.6);
    (this.spark.material as THREE.MeshToonMaterial).opacity = 1;
    this.pulse = 1.6;
  }

  hideSpark(): void {
    (this.spark.material as THREE.MeshToonMaterial).opacity = 0;
    this.pulse = 0;
  }

  /** The bell rings! Kicks a rocking animation decay. */
  ringBell(): void {
    this.bellRing = 1;
  }

  update(dt: number, elapsed: number): void {
    // gears spin — smaller gears spin faster, like real trains
    for (const n of this.nodes) {
      if (n.spinning && this.motorOn) {
        n.gear.rotation.z += dt * n.spinSign * (1.9 * (0.8 / n.radius));
      }
      if (n.ghost?.visible) {
        const s = 1 + Math.sin(elapsed * 2.6 + n.x) * 0.06;
        n.ghost.scale.setScalar(s);
      }
    }
    // belts crawl their rivets around the loop
    for (const rig of this.belts.values()) {
      if (rig.moving && this.motorOn) {
        rig.travel += dt * rig.moveSign * -0.22;
        this.layoutRivets(rig);
      }
      if (rig.slot.visible) {
        const s = 1 + Math.sin(elapsed * 2.2) * 0.05;
        rig.slot.scale.setScalar(s);
      }
    }
    // spark blink + fade
    if (this.pulse > 0) {
      this.pulse = Math.max(0, this.pulse - dt);
      const m = this.spark.material as THREE.MeshToonMaterial;
      m.opacity = Math.min(1, this.pulse) * (0.6 + Math.sin(elapsed * 14) * 0.4);
    }
    // bell rock decay
    if (this.bellRing > 0) {
      this.bellRing = Math.max(0, this.bellRing - dt * 0.5);
      this.bell.rotation.z = Math.sin(elapsed * 16) * 0.09 * this.bellRing;
    }
    // motor lamp breathing
    if (this.motorOn) {
      (this.lamp.material as THREE.MeshToonMaterial).emissiveIntensity = 0.85 + Math.sin(elapsed * 4.2) * 0.2;
    }
  }
}
