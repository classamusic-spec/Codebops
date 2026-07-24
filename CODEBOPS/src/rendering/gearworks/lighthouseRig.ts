/**
 * Phase 14 rig — the Lighthouse.
 *
 * A striped tower with a glass lamp room on top. When the rule says
 * SHINE, the lamp sphere glows bright and a rotating beam sweeps out;
 * when it says dark, the lamp dims to a cold grey. A little sea sits at
 * the base. Rendering only — whether the lamp should be on comes from
 * logicMachine.ts, and the screen calls setLamp(on) per sky.
 */
import * as THREE from 'three';
import { toonMat } from '../materials/toon';

function stripeTexture(): THREE.CanvasTexture {
  const c = document.createElement('canvas');
  c.width = 64; c.height = 256;
  const ctx = c.getContext('2d')!;
  const bands = 7;
  for (let i = 0; i < bands; i++) {
    ctx.fillStyle = i % 2 === 0 ? '#f4f6ff' : '#ff5a6a';
    ctx.fillRect(0, (i * c.height) / bands, c.width, c.height / bands + 1);
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export class LighthouseRig {
  readonly group = new THREE.Group();
  private readonly lamp: THREE.Mesh;
  private readonly lampMat: THREE.MeshToonMaterial;
  private readonly beam: THREE.Mesh;
  private readonly beamMat: THREE.MeshBasicMaterial;
  private readonly light: THREE.PointLight;
  private on = false;
  private glow = 0; // eased 0→1
  private spin = 0;
  private flash = 0;
  private flashOk = true;

  constructor() {
    // sea base
    const sea = new THREE.Mesh(new THREE.CylinderGeometry(3.4, 3.4, 0.5, 32), toonMat('#2e6bd6'));
    sea.position.y = 0.25;
    sea.receiveShadow = true;
    this.group.add(sea);

    // rocky plinth
    const rock = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.9, 0.9, 12), toonMat('#5a6079'));
    rock.position.y = 0.7;
    rock.castShadow = true; rock.receiveShadow = true;
    this.group.add(rock);

    // striped tower (tapered)
    const towerMat = new THREE.MeshToonMaterial({ map: stripeTexture() });
    const tower = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 1.2, 4.2, 24), towerMat);
    tower.position.y = 3.1;
    tower.castShadow = true; tower.receiveShadow = true;
    this.group.add(tower);

    // gallery ring
    const ring = new THREE.Mesh(new THREE.CylinderGeometry(1.05, 1.05, 0.35, 24), toonMat('#3b3f7a'));
    ring.position.y = 5.35;
    ring.castShadow = true;
    this.group.add(ring);

    // lamp room glass
    const glass = new THREE.Mesh(
      new THREE.CylinderGeometry(0.8, 0.8, 1.1, 16),
      new THREE.MeshToonMaterial({ color: '#bfe6ff', transparent: true, opacity: 0.5 }),
    );
    glass.position.y = 6.0;
    this.group.add(glass);

    // the lamp itself (emissive)
    this.lampMat = new THREE.MeshToonMaterial({ color: '#6b7088', emissive: new THREE.Color('#3a3f55') });
    this.lamp = new THREE.Mesh(new THREE.SphereGeometry(0.5, 20, 20), this.lampMat);
    this.lamp.position.y = 6.0;
    this.group.add(this.lamp);

    // rotating beam (a soft additive wedge)
    this.beamMat = new THREE.MeshBasicMaterial({
      color: '#fff3b0', transparent: true, opacity: 0, side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending, depthWrite: false,
    });
    const beamGeo = new THREE.ConeGeometry(1.5, 7, 4, 1, true);
    this.beam = new THREE.Mesh(beamGeo, this.beamMat);
    this.beam.rotation.z = Math.PI / 2; // point sideways
    this.beam.position.y = 6.0;
    this.group.add(this.beam);

    // conical roof
    const roof = new THREE.Mesh(new THREE.ConeGeometry(1.0, 1.1, 20), toonMat('#e0453f'));
    roof.position.y = 7.1;
    roof.castShadow = true;
    this.group.add(roof);
    const knob = new THREE.Mesh(new THREE.SphereGeometry(0.16, 12, 12), toonMat('#ffd84a'));
    knob.position.y = 7.75;
    this.group.add(knob);

    // point light co-located with the lamp
    this.light = new THREE.PointLight(0xfff0b0, 0, 16, 2);
    this.light.position.set(0, 6.0, 0);
    this.group.add(this.light);
  }

  setLamp(on: boolean): void {
    this.on = on;
  }

  /** Flash a green/red halo after a sky is judged. */
  flashResult(correct: boolean): void {
    this.flash = 1;
    this.flashOk = correct;
  }

  reset(): void {
    this.on = false;
    this.glow = 0;
    this.flash = 0;
  }

  update(dt: number): void {
    // ease the glow toward the target
    const target = this.on ? 1 : 0;
    this.glow += (target - this.glow) * Math.min(1, dt * 6);
    const g = this.glow;

    // lamp brightness
    this.lampMat.emissive.setRGB(0.23 + g * 0.77, 0.25 + g * 0.7, 0.33 + g * 0.4);
    this.lampMat.color.setRGB(0.42 + g * 0.55, 0.44 + g * 0.5, 0.53 + g * 0.4);
    this.light.intensity = g * 2.4;

    // beam sweeps while lit
    this.spin += dt * (1.2 + g * 1.6);
    this.beam.rotation.y = this.spin;
    this.beamMat.opacity = g * 0.28;

    // result flash tints the sea light briefly
    if (this.flash > 0) {
      this.flash = Math.max(0, this.flash - dt * 1.6);
      const c = this.flashOk ? new THREE.Color('#8be04a') : new THREE.Color('#ff6a6a');
      this.light.color.lerpColors(new THREE.Color('#fff0b0'), c, this.flash * 0.8);
      this.light.intensity = Math.max(this.light.intensity, this.flash * 2.2);
    } else {
      this.light.color.setHex(0xfff0b0);
    }
  }
}
