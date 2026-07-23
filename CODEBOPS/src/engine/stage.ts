/**
 * Stage — owns the renderer, camera rig, lights, resize handling,
 * page-visibility pause, the single animation loop, and disposal.
 */
import * as THREE from 'three';
import { createRenderer, RendererInfo } from './renderer';

export type TickHandler = (dt: number, elapsed: number) => void;

export class Stage {
  readonly renderer: THREE.WebGLRenderer;
  readonly info: RendererInfo;
  readonly scene: THREE.Scene;
  readonly camera: THREE.PerspectiveCamera;
  private readonly wrap: HTMLElement;
  private readonly canvas: HTMLCanvasElement;
  private readonly clock = new THREE.Clock();
  private handlers = new Set<TickHandler>();
  private rafId = 0;
  private running = false;
  private lastTickAt = 0;
  private watchdog: number | null = null;
  private resizeObserver: ResizeObserver;
  /** World-space points the camera must always keep in frame. */
  private frameCenter = new THREE.Vector3(0.1, 0.2, 0.1);
  private framePoints: THREE.Vector3[] = [];
  /** View direction (normalized) — the classic three-quarter storybook angle. */
  private static readonly VIEW_DIR = new THREE.Vector3(0.02, 0.62, 0.782).normalize();
  private onVisibility = (): void => {
    if (document.hidden) this.stopLoop();
    else this.startLoop();
  };

  constructor(wrap: HTMLElement) {
    this.wrap = wrap;
    this.canvas = document.createElement('canvas');
    this.canvas.setAttribute('aria-label', 'CodeBops 3D world');
    wrap.appendChild(this.canvas);

    const { renderer, info } = createRenderer(this.canvas);
    this.renderer = renderer;
    this.info = info;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color('#6fc7ff');
    this.scene.fog = new THREE.Fog('#a8dcff', 50, 130);

    // Fixed three-quarter camera, restrained perspective.
    this.camera = new THREE.PerspectiveCamera(34, 16 / 9, 0.1, 120);
    this.camera.position.set(0.2, 8.8, 10.8);
    this.camera.lookAt(0.1, 0.2, 0.1);

    // Soft theatrical lighting.
    const hemi = new THREE.HemisphereLight('#cfeaff', '#79c95f', 1.15);
    this.scene.add(hemi);
    const sun = new THREE.DirectionalLight('#fff3d6', 2.1);
    sun.position.set(7, 14, 8);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    sun.shadow.camera.left = -14;
    sun.shadow.camera.right = 14;
    sun.shadow.camera.top = 14;
    sun.shadow.camera.bottom = -14;
    sun.shadow.camera.far = 45;
    sun.shadow.bias = -0.0004;
    sun.shadow.radius = 6;
    this.scene.add(sun);
    const fill = new THREE.DirectionalLight('#bcd6ff', 0.55);
    fill.position.set(-6, 8, -4);
    this.scene.add(fill);

    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(this.wrap);
    document.addEventListener('visibilitychange', this.onVisibility);
    this.resize();
  }

  onTick(handler: TickHandler): () => void {
    this.handlers.add(handler);
    return () => this.handlers.delete(handler);
  }

  startLoop(): void {
    if (this.running) return;
    this.running = true;
    this.clock.getDelta();
    const step = (): void => {
      this.lastTickAt = performance.now();
      // Clamp keeps tweens stable on hitches while still progressing in
      // degraded (software-rendered / throttled) frame environments.
      const dt = Math.min(this.clock.getDelta(), 0.25);
      this.handlers.forEach((h) => h(dt, this.clock.elapsedTime));
      this.renderer.render(this.scene, this.camera);
    };
    const loop = (): void => {
      if (!this.running) return;
      this.rafId = requestAnimationFrame(loop);
      step();
    };
    this.rafId = requestAnimationFrame(loop);
    // Watchdog: keeps gameplay + animations advancing if rAF ever stalls
    // (throttled/headless contexts). Normally rAF wins and this stays idle.
    this.watchdog = window.setInterval(() => {
      if (this.running && performance.now() - this.lastTickAt > 250) step();
    }, 100);
  }

  stopLoop(): void {
    this.running = false;
    cancelAnimationFrame(this.rafId);
    if (this.watchdog !== null) {
      clearInterval(this.watchdog);
      this.watchdog = null;
    }
  }

  /**
   * Declare the world area that must stay visible (grid corners, goals,
   * lookout spots). Re-applied automatically on every resize, so the whole
   * puzzle fits any screen — widescreen monitor to portrait phone.
   */
  frameArea(center: THREE.Vector3, points: THREE.Vector3[]): void {
    this.frameCenter.copy(center);
    this.framePoints = points.map((p) => p.clone());
    this.applyFrame();
  }

  /**
   * Fit-by-projection: place the camera along the view direction, project
   * every frame point, and dolly out until all of them land inside the
   * viewport with margin. Iterative (4 passes converge) and aspect-proof.
   */
  private applyFrame(): void {
    const aspect = this.camera.aspect;
    // Breathing room for UI chrome + idle bobs; portrait needs less
    // horizontal slack (the deck sits below, the view is already shifted up).
    const margin = aspect < 1 ? 1.08 : 1.2;
    let dist = 11;
    const cam = this.camera;
    for (let pass = 0; pass < 4; pass++) {
      cam.position.copy(this.frameCenter).addScaledVector(Stage.VIEW_DIR, dist);
      cam.lookAt(this.frameCenter.x, 0.2, this.frameCenter.z);
      cam.updateMatrixWorld(true);
      cam.updateProjectionMatrix();
      let worst = 0;
      for (const pt of this.framePoints) {
        const p = pt.clone().project(cam);
        worst = Math.max(worst, Math.abs(p.x), Math.abs(p.y));
      }
      const need = worst * margin;
      if (need <= 1 || this.framePoints.length === 0) break;
      dist *= need;
    }
  }

  /** Per-world sky (background + matching distance fog for depth). */
  setSky(color: string, fogNear = 26, fogFar = 62): void {
    this.scene.background = new THREE.Color(color);
    this.scene.fog = new THREE.Fog(color, fogNear, fogFar);
    if (!this.running) this.renderer.render(this.scene, this.camera);
  }

  resize(): void {
    const w = Math.max(1, this.wrap.clientWidth);
    const h = Math.max(1, this.wrap.clientHeight);
    // Re-apply DPR: browser zoom or monitor moves change devicePixelRatio.
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    // Widen the lens a touch as screens narrow; distance fitting handles
    // the rest via applyFrame.
    const aspect = w / h;
    this.camera.fov = aspect >= 1.4 ? 34 : aspect >= 1.0 ? 40 : 46;
    // Portrait phones: shift the scene upward so the bottom command deck
    // never covers the puzzle (sprites project through the same matrix,
    // so characters stay glued to their tiles).
    if (aspect < 1) this.camera.setViewOffset(w, h, 0, Math.round(h * 0.085), w, h);
    else this.camera.clearViewOffset();
    this.camera.updateProjectionMatrix();
    this.applyFrame();
    if (!this.running) this.renderer.render(this.scene, this.camera);
  }

  dispose(): void {
    this.stopLoop();
    this.resizeObserver.disconnect();
    document.removeEventListener('visibilitychange', this.onVisibility);
    this.scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        obj.geometry.dispose();
        const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
        for (const m of mats) {
          // Cached toon materials + gradient/shadow textures outlive the
          // stage — disposing them would poison every later level.
          if (m.userData?.shared) continue;
          for (const v of Object.values(m)) {
            if (v instanceof THREE.Texture && !v.userData?.shared) v.dispose();
          }
          m.dispose();
        }
      }
    });
    this.renderer.dispose();
    this.canvas.remove();
  }
}
