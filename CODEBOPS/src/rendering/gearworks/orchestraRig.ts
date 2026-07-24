/**
 * Phase 13 rig — the Robot Orchestra.
 *
 * A row of little instrument robots on the bench, one per track. Each is
 * a rounded body + a coloured "instrument" head. When its track hits on a
 * beat, the robot does a springy bounce (and its head flashes bright).
 * Rendering only — the pattern + timing come from beatMachine.ts, and the
 * screen calls hit(trackIndex) as each note fires.
 */
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { toonMat } from '../materials/toon';

interface Bot {
  readonly group: THREE.Group;
  readonly head: THREE.Mesh;
  readonly headMat: THREE.MeshToonMaterial;
  readonly baseColor: THREE.Color;
  readonly baseY: number;
  bounce: number; // 0 → 1 decaying
}

export class OrchestraRig {
  readonly group = new THREE.Group();
  private readonly bots: Bot[] = [];

  constructor(tracks: ReadonlyArray<{ color: string }>) {
    const n = tracks.length;
    const spacing = 2.15;
    const x0 = -((n - 1) * spacing) / 2;

    // Shared stage plinth so the band reads as one unit.
    const plinth = new THREE.Mesh(
      new RoundedBoxGeometry(n * spacing + 1.4, 0.5, 2.4, 4, 0.22),
      toonMat('#2b2f63'),
    );
    plinth.position.set(0, 0.25, 0);
    plinth.receiveShadow = true;
    this.group.add(plinth);

    tracks.forEach((track, i) => {
      const g = new THREE.Group();
      g.position.set(x0 + i * spacing, 0.5, 0);

      // body
      const body = new THREE.Mesh(new RoundedBoxGeometry(1.4, 1.3, 1.2, 4, 0.28), toonMat('#e8ecff'));
      body.position.y = 0.9;
      body.castShadow = true;
      body.receiveShadow = true;
      g.add(body);

      // feet
      for (const fx of [-0.4, 0.4]) {
        const foot = new THREE.Mesh(new RoundedBoxGeometry(0.5, 0.28, 0.7, 3, 0.12), toonMat('#3b3f7a'));
        foot.position.set(fx, 0.16, 0.15);
        foot.castShadow = true;
        g.add(foot);
      }

      // eyes
      const eyeMat = toonMat('#1b1f45');
      for (const ex of [-0.28, 0.28]) {
        const eye = new THREE.Mesh(new THREE.SphereGeometry(0.13, 16, 16), eyeMat);
        eye.position.set(ex, 1.0, 0.62);
        g.add(eye);
      }

      // instrument head (the coloured part that flashes on a hit)
      const headMat = toonMat(track.color);
      const head = new THREE.Mesh(new RoundedBoxGeometry(1.15, 0.6, 1.1, 4, 0.2), headMat);
      head.position.y = 1.9;
      head.castShadow = true;
      g.add(head);
      // a little knob on top
      const knob = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.34, 12), toonMat('#fff6e3'));
      knob.position.set(0, 2.32, 0);
      g.add(knob);
      const ball = new THREE.Mesh(new THREE.SphereGeometry(0.17, 16, 16), headMat);
      ball.position.set(0, 2.55, 0);
      g.add(ball);

      this.group.add(g);
      this.bots.push({
        group: g,
        head,
        headMat,
        baseColor: new THREE.Color(track.color),
        baseY: g.position.y,
        bounce: 0,
      });
    });
  }

  /** Kick a robot: springy bounce + head flash. */
  hit(trackIndex: number): void {
    const bot = this.bots[trackIndex];
    if (bot) bot.bounce = 1;
  }

  /** Playhead pulse — a gentle full-band shimmer on every step. */
  step(): void {
    // (kept intentionally light; per-hit bounce carries the energy)
  }

  reset(): void {
    for (const bot of this.bots) {
      bot.bounce = 0;
      bot.group.position.y = bot.baseY;
      bot.group.scale.set(1, 1, 1);
      bot.headMat.color.copy(bot.baseColor);
    }
  }

  update(dt: number): void {
    for (const bot of this.bots) {
      if (bot.bounce <= 0) continue;
      bot.bounce = Math.max(0, bot.bounce - dt * 3.4);
      const e = bot.bounce; // 1 → 0
      const lift = Math.sin(e * Math.PI) * 0.55;
      bot.group.position.y = bot.baseY + lift;
      const squash = 1 + Math.sin(e * Math.PI) * 0.12;
      bot.group.scale.set(2 - squash, squash, 2 - squash);
      // flash the head toward white at the peak, ease back to base colour
      const mix = Math.sin(e * Math.PI);
      bot.headMat.color.copy(bot.baseColor).lerp(new THREE.Color('#ffffff'), mix * 0.7);
      if (bot.bounce === 0) {
        bot.group.position.y = bot.baseY;
        bot.group.scale.set(1, 1, 1);
        bot.headMat.color.copy(bot.baseColor);
      }
    }
  }
}
