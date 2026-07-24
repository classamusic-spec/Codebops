/**
 * Phase 7 rigs — variables and safe loops.
 *
 * CounterWheelRig: a berry jar wired to a big COUNTER WHEEL — the
 * variable made visible. A canvas panel shows the current number (and
 * the goal), and the jar fills/empties with berries to match. Setting,
 * adding, and subtracting all move the same wheel.
 *
 * PressLineRig: a stamping press over a row of jars, a "filled / target"
 * readout, and Forever Fred — a little gear-gremlin who spins up when a
 * loop forgets to stop (the debugging beat, paired with the DOM dialog).
 *
 * Numbers are drawn to CanvasTextures so they read cleanly at the toy
 * bench camera. Rendering only — truth lives in counterMachine.ts.
 */
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { toonMat } from '../materials/toon';

function mesh(geo: THREE.BufferGeometry, mat: THREE.Material, x = 0, y = 0, z = 0, cast = true, receive = true): THREE.Mesh {
  const m = new THREE.Mesh(geo, mat);
  m.position.set(x, y, z);
  m.castShadow = cast;
  m.receiveShadow = receive;
  return m;
}

/** A canvas panel that shows a big number over a small label. */
class NumberPanel {
  readonly texture: THREE.CanvasTexture;
  private readonly ctx: CanvasRenderingContext2D;
  private readonly size = 256;

  constructor(private readonly label: string, private readonly accent = '#16225c') {
    const c = document.createElement('canvas');
    c.width = c.height = this.size;
    this.ctx = c.getContext('2d')!;
    this.texture = new THREE.CanvasTexture(c);
    this.texture.colorSpace = THREE.SRGBColorSpace;
    this.set('0');
  }

  set(main: string): void {
    const s = this.size;
    const ctx = this.ctx;
    ctx.clearRect(0, 0, s, s);
    // face
    ctx.fillStyle = '#fff6e3';
    ctx.beginPath();
    ctx.roundRect(10, 10, s - 20, s - 20, 34);
    ctx.fill();
    ctx.lineWidth = 10;
    ctx.strokeStyle = this.accent;
    ctx.stroke();
    // label
    ctx.fillStyle = this.accent;
    ctx.font = '700 40px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.label, s / 2, 56);
    // big number
    ctx.font = '800 150px system-ui, sans-serif';
    ctx.fillText(main, s / 2, 158);
    this.texture.needsUpdate = true;
  }
}

// ==================================================================
// CounterWheelRig
// ==================================================================

export class CounterWheelRig {
  readonly group = new THREE.Group();
  private readonly wheel: NumberPanel;
  private readonly jarBerries: THREE.Group;
  private readonly wheelMesh: THREE.Mesh;
  private pulseT = 0;

  constructor(target: number, start = 0) {
    this.group.name = 'counter-wheel-rig';

    // base
    this.group.add(mesh(new RoundedBoxGeometry(7.4, 0.3, 2.6, 2, 0.1), toonMat('#1b2664'), 0, 0.15, 0));

    // big counter wheel display housing
    this.group.add(mesh(new RoundedBoxGeometry(2.7, 2.7, 0.5, 3, 0.14), toonMat('#2c3f8f'), -2.0, 2.0, -0.2));
    this.wheel = new NumberPanel('COUNT', '#1f79df');
    this.wheelMesh = mesh(new THREE.PlaneGeometry(2.2, 2.2), new THREE.MeshBasicMaterial({ map: this.wheel.texture }), -2.0, 2.0, 0.08, false, false);
    this.group.add(this.wheelMesh);
    // a couple of decorative dial knobs
    for (const dy of [-1.0, 1.0]) {
      const knob = mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.3, 12), toonMat('#ffd23e'), -3.55, 2.0 + dy, 0);
      knob.rotation.x = Math.PI / 2;
      this.group.add(knob);
    }

    // goal placard
    this.group.add(mesh(new RoundedBoxGeometry(1.7, 1.7, 0.4, 2, 0.1), toonMat('#39406e'), 2.9, 2.4, -0.2));
    const goalPanel = new NumberPanel('GOAL', '#e0a020');
    goalPanel.set(String(target));
    this.group.add(mesh(new THREE.PlaneGeometry(1.35, 1.35), new THREE.MeshBasicMaterial({ map: goalPanel.texture }), 2.9, 2.4, 0.03, false, false));

    // the berry jar
    const jar = new THREE.Mesh(
      new THREE.CylinderGeometry(0.72, 0.6, 1.7, 20, 1, true),
      new THREE.MeshToonMaterial({ color: '#cfeeff', transparent: true, opacity: 0.4 }),
    );
    jar.position.set(0.6, 1.15, 0.3);
    this.group.add(jar);
    this.group.add(mesh(new THREE.CylinderGeometry(0.74, 0.74, 0.14, 20), toonMat('#39406e'), 0.6, 0.35, 0.3, true, false));
    this.jarBerries = new THREE.Group();
    this.jarBerries.position.set(0.6, 0.45, 0.3);
    this.group.add(this.jarBerries);

    this.setValue(start, true);
  }

  private berryAt(i: number): THREE.Group {
    const b = new THREE.Group();
    const a = (i * 2.399);
    const ring = i % 3;
    b.add(mesh(new THREE.SphereGeometry(0.19, 12, 10), toonMat('#e8384f'),
      Math.cos(a) * 0.28 * (ring / 2), 0, Math.sin(a) * 0.28 * (ring / 2), false, false));
    b.position.y = 0.16 + Math.floor(i / 3) * 0.34;
    return b;
  }

  setValue(v: number, snap = false): void {
    this.wheel.set(String(v));
    if (!snap) this.pulseT = 1;
    // rebuild jar berries to match the value
    while (this.jarBerries.children.length > v) this.jarBerries.remove(this.jarBerries.children[this.jarBerries.children.length - 1]);
    while (this.jarBerries.children.length < v) this.jarBerries.add(this.berryAt(this.jarBerries.children.length));
  }

  reset(start: number): void {
    this.setValue(start, true);
    this.pulseT = 0;
  }

  update(dt: number): void {
    if (this.pulseT > 0) {
      this.pulseT = Math.max(0, this.pulseT - dt * 2.4);
      const s = 1 + this.pulseT * 0.08;
      this.wheelMesh.scale.setScalar(s);
    } else {
      this.wheelMesh.scale.setScalar(1);
    }
  }
}

// ==================================================================
// PressLineRig
// ==================================================================

export class PressLineRig {
  readonly group = new THREE.Group();
  private readonly plunger: THREE.Group;
  private readonly jars: THREE.Group[] = [];
  private readonly readout: NumberPanel;
  private readonly fred: THREE.Group;
  private pressT = 0;
  private fredT = 0;
  private filled = 0;

  constructor(private readonly target: number) {
    this.group.name = 'press-line-rig';

    // base + belt bed
    this.group.add(mesh(new RoundedBoxGeometry(8.2, 0.3, 2.6, 2, 0.1), toonMat('#1b2664'), 0, 0.15, 0));
    this.group.add(mesh(new RoundedBoxGeometry(6.6, 0.4, 1.4, 2, 0.1), toonMat('#2c3f8f'), -0.4, 0.7, 0, false, true));

    // empty jars in a row (fill up as the press stamps)
    for (let i = 0; i < target; i++) {
      const jar = new THREE.Group();
      jar.add(mesh(new THREE.CylinderGeometry(0.34, 0.28, 0.7, 14, 1, true), new THREE.MeshToonMaterial({ color: '#cfeeff', transparent: true, opacity: 0.4 }), 0, 0.35, 0));
      jar.add(mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.1, 14), toonMat('#39406e'), 0, 0.02, 0, false, false));
      jar.position.set(-2.6 + i * 0.95, 0.9, 0.2);
      this.group.add(jar);
      this.jars.push(jar);
    }

    // press: two posts + a top bar + a plunger that slams down
    for (const px of [-1.05, 1.05]) {
      this.group.add(mesh(new RoundedBoxGeometry(0.3, 3.0, 0.4, 1, 0.08), toonMat('#c9843c'), -1.9 + px, 2.2, -0.4));
    }
    this.group.add(mesh(new RoundedBoxGeometry(3.0, 0.4, 0.5, 1, 0.1), toonMat('#c9843c'), -1.9, 3.6, -0.4));
    this.plunger = new THREE.Group();
    this.plunger.add(mesh(new THREE.CylinderGeometry(0.18, 0.18, 1.1, 12), toonMat('#aab3c8'), 0, 0.55, 0));
    this.plunger.add(mesh(new RoundedBoxGeometry(0.9, 0.4, 0.6, 1, 0.1), toonMat('#e05a3a'), 0, 0, 0));
    this.plunger.position.set(-1.9, 2.55, -0.4);
    this.group.add(this.plunger);

    // filled / target readout
    this.group.add(mesh(new RoundedBoxGeometry(1.9, 1.4, 0.4, 2, 0.1), toonMat('#39406e'), 3.1, 2.2, -0.2));
    this.readout = new NumberPanel('FILLED', '#2bb44b');
    this.group.add(mesh(new THREE.PlaneGeometry(1.55, 1.55), new THREE.MeshBasicMaterial({ map: this.readout.texture }), 3.1, 2.25, 0.03, false, false));
    this.setFilled(0);

    // Forever Fred — a gear-gremlin hiding until a loop runs away
    this.fred = new THREE.Group();
    const body = mesh(new THREE.SphereGeometry(0.5, 16, 12), toonMat('#a06bff'), 0, 0, 0);
    this.fred.add(body);
    // frantic spinning gear ring
    const ring = mesh(new THREE.TorusGeometry(0.62, 0.1, 8, 8), toonMat('#ff5fa2'), 0, 0, 0.1, false, false);
    ring.name = 'fredRing';
    this.fred.add(ring);
    // googly eyes
    for (const ex of [-0.18, 0.18]) {
      this.fred.add(mesh(new THREE.SphereGeometry(0.14, 10, 8), toonMat('#ffffff'), ex, 0.12, 0.42, false, false));
      this.fred.add(mesh(new THREE.SphereGeometry(0.06, 8, 6), toonMat('#16225c'), ex, 0.12, 0.52, false, false));
    }
    this.fred.position.set(-1.9, 2.4, 0.6);
    this.fred.scale.setScalar(0);
    this.group.add(this.fred);
  }

  /** Stamp: plunger slams down, and (if room) the next jar fills. */
  press(jars: number): void {
    this.pressT = 1;
    if (jars <= this.jars.length && jars > this.filled) {
      const jar = this.jars[jars - 1];
      if (jar && jar.children.length < 3) {
        for (let i = 0; i < 3; i++) {
          jar.add(mesh(new THREE.SphereGeometry(0.11, 8, 6), toonMat('#e8384f'), (i - 1) * 0.14, 0.2 + (i % 2) * 0.12, 0, false, false));
        }
      }
    }
    this.setFilled(Math.min(jars, this.jars.length));
  }

  setFilled(n: number): void {
    this.filled = n;
    this.readout.set(`${n}/${this.target}`);
  }

  showFred(): void {
    this.fredT = 1;
  }

  reset(): void {
    this.pressT = 0;
    this.fredT = 0;
    this.fred.scale.setScalar(0);
    for (const jar of this.jars) {
      while (jar.children.length > 2) jar.remove(jar.children[jar.children.length - 1]);
    }
    this.setFilled(0);
  }

  update(dt: number, elapsed: number): void {
    // plunger bob
    if (this.pressT > 0) {
      this.pressT = Math.max(0, this.pressT - dt * 3.2);
      this.plunger.position.y = 2.55 - (1 - Math.abs(this.pressT - 0.5) * 2) * 0.8;
    } else {
      this.plunger.position.y = 2.55;
    }
    // Fred pops in and spins frantically
    const targetScale = this.fredT > 0 ? 1 : 0;
    this.fred.scale.x += (targetScale - this.fred.scale.x) * Math.min(1, dt * 6);
    this.fred.scale.y = this.fred.scale.z = this.fred.scale.x;
    if (this.fredT > 0) {
      const ring = this.fred.getObjectByName('fredRing');
      if (ring) ring.rotation.z += dt * 14;
      this.fred.position.y = 2.4 + Math.sin(elapsed * 12) * 0.1;
    }
  }
}
