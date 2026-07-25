/**
 * Stage — owns the renderer, camera rig, lights, resize handling,
 * page-visibility pause, the single animation loop, and disposal.
 */
import * as THREE from 'three';
import { createRenderer, RendererInfo } from './renderer';

export type TickHandler = (dt: number, elapsed: number) => void;

/** Optional per-world camera/lighting override (Gearworks bench views). */
export interface StageViewConfig {
  /** Normalized direction from look-target toward the camera. */
  readonly viewDir?: { x: number; y: number; z: number };
  /** FOV per aspect (defaults to the meadow worlds' curve). */
  readonly fovFor?: (aspect: number) => number;
  /** Indoor lighting rig (warmer key, cooler bounce) for the garage. */
  readonly indoor?: boolean;
}

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
  /**
   * UI chrome that overlays the canvas (top bar, goal card, Think Trail,
   * command deck). The puzzle is framed into the space these LEAVE, not
   * the whole canvas — otherwise it is sized for room it does not have
   * and ends up small and half-hidden behind the panels.
   */
  private chromeHost: HTMLElement | null = null;
  private insets = { top: 0, right: 0, bottom: 0, left: 0 };
  /** Free-area half-extents in NDC (1 = the whole canvas). */
  private fitX = 1;
  private fitY = 1;
  /** View direction (normalized) — the classic three-quarter storybook angle. */
  private static readonly VIEW_DIR = new THREE.Vector3(0.02, 0.62, 0.782).normalize();
  /** Active view direction (defaults to VIEW_DIR; presets may override). */
  private readonly viewDir: THREE.Vector3;
  private readonly fovFor: (aspect: number) => number;
  private onVisibility = (): void => {
    if (document.hidden) this.stopLoop();
    else this.startLoop();
  };

  constructor(wrap: HTMLElement, view: StageViewConfig = {}) {
    this.wrap = wrap;
    this.canvas = document.createElement('canvas');
    this.canvas.setAttribute('aria-label', 'CodeBops 3D world');
    wrap.appendChild(this.canvas);

    const { renderer, info } = createRenderer(this.canvas);
    this.renderer = renderer;
    this.info = info;

    this.viewDir = view.viewDir
      ? new THREE.Vector3(view.viewDir.x, view.viewDir.y, view.viewDir.z).normalize()
      : Stage.VIEW_DIR.clone();
    this.fovFor = view.fovFor ?? ((aspect) => (aspect >= 1.4 ? 34 : aspect >= 1.0 ? 40 : 46));

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color('#6fc7ff');
    this.scene.fog = new THREE.Fog('#a8dcff', 50, 130);

    // Fixed three-quarter camera, restrained perspective.
    this.camera = new THREE.PerspectiveCamera(34, 16 / 9, 0.1, 120);
    this.camera.position.set(0.2, 8.8, 10.8);
    this.camera.lookAt(0.1, 0.2, 0.1);

    // Soft theatrical lighting (indoor rig: warm lamp key, cool bounce).
    const hemi = view.indoor
      ? new THREE.HemisphereLight('#a8b6e8', '#39406e', 0.95)
      : new THREE.HemisphereLight('#cfeaff', '#79c95f', 1.15);
    this.scene.add(hemi);
    const sun = view.indoor
      ? new THREE.DirectionalLight('#ffe1b0', 1.7)
      : new THREE.DirectionalLight('#fff3d6', 2.1);
    if (view.indoor) sun.position.set(3, 10, 12);
    else sun.position.set(7, 14, 8);
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
   * Watch a UI layer and keep the puzzle clear of its chrome. Call once
   * after the screen's panels exist; re-measured on every resize, so it
   * stays right across breakpoints without per-screen tuning.
   */
  observeChrome(host: HTMLElement): void {
    this.chromeHost = host;
    this.resize();
  }

  /** Chrome selectors, by the edge they occupy. */
  private static readonly CHROME = {
    top: ['.top-bar', '.gw-sky-board', '.gw-queue-strip', '.gw-state-map'],
    bottom: ['.bottom-deck', '.beat-seq'],
    left: ['.goal-card', '.gw-jobcard', '.gw-paint-board'],
    right: ['.gw-trail'],
  };

  private measureChrome(): void {
    const host = this.chromeHost;
    if (!host) return;
    const box = host.getBoundingClientRect();
    if (box.width <= 0 || box.height <= 0) return;
    const next = { top: 0, right: 0, bottom: 0, left: 0 };
    const intrude = (sel: string[], edge: 'top' | 'right' | 'bottom' | 'left'): void => {
      for (const s of sel) {
        for (const node of Array.from(host.querySelectorAll(s))) {
          const r = (node as HTMLElement).getBoundingClientRect();
          if (r.width <= 0 || r.height <= 0) continue;
          const d = edge === 'top' ? r.bottom - box.top
            : edge === 'bottom' ? box.bottom - r.top
              : edge === 'left' ? r.right - box.left
                : box.right - r.left;
          // Weight by how much of that edge the panel actually spans: a
          // full-width bar blocks the view completely, but a small corner
          // card only clips a corner — reserving its full width would
          // shove the puzzle off-centre for no reason.
          const cover = (edge === 'top' || edge === 'bottom')
            ? r.width / box.width
            : r.height / box.height;
          next[edge] = Math.max(next[edge], d * Math.min(1, cover));
        }
      }
    };
    intrude(Stage.CHROME.top, 'top');
    intrude(Stage.CHROME.bottom, 'bottom');
    intrude(Stage.CHROME.left, 'left');
    intrude(Stage.CHROME.right, 'right');
    next.top = Math.round(next.top);
    next.bottom = Math.round(next.bottom);
    next.left = Math.round(next.left);
    next.right = Math.round(next.right);
    // Never let chrome claim so much that nothing is left to play in.
    next.top = Math.min(next.top, box.height * 0.32);
    next.bottom = Math.min(next.bottom, box.height * 0.42);
    next.left = Math.min(next.left, box.width * 0.26);
    next.right = Math.min(next.right, box.width * 0.26);
    this.insets = next;
  }

  /**
   * Fit-by-projection: place the camera along the view direction, project
   * every frame point, and dolly out until all of them land inside the
   * viewport with margin. Iterative (4 passes converge) and aspect-proof.
   */
  private applyFrame(): void {
    // Chrome is reserved via insets now, so this is just breathing room
    // for idle bobs and shadows — keep it tight so the toy reads BIG.
    const margin = 1.04;
    let dist = 11;
    const cam = this.camera;
    for (let pass = 0; pass < 4; pass++) {
      cam.position.copy(this.frameCenter).addScaledVector(this.viewDir, dist);
      // Vertical centering follows the caller's frame center (grid worlds
      // pass y=0.2 for ground focus; the Gearworks bench passes bench height).
      cam.lookAt(this.frameCenter.x, this.frameCenter.y, this.frameCenter.z);
      cam.updateMatrixWorld(true);
      cam.updateProjectionMatrix();
      let worst = 0;
      for (const pt of this.framePoints) {
        const p = pt.clone().project(cam);
        // Measure against the FREE area, not the whole canvas.
        worst = Math.max(worst, Math.abs(p.x) / this.fitX, Math.abs(p.y) / this.fitY);
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
    this.camera.fov = this.fovFor(aspect);
    // Re-measure the chrome, then centre the puzzle in the space it
    // leaves. A positive offset slides the frustum window, which moves
    // the image the other way — so we push AWAY from the heavier edges.
    this.measureChrome();
    const { top, right, bottom, left } = this.insets;
    this.fitX = Math.max(0.25, (w - left - right) / w);
    this.fitY = Math.max(0.25, (h - top - bottom) / h);
    const offX = Math.round((right - left) / 2);
    const offY = Math.round((bottom - top) / 2);
    if (offX !== 0 || offY !== 0) this.camera.setViewOffset(w, h, offX, offY, w, h);
    else this.camera.clearViewOffset();
    this.camera.updateProjectionMatrix();
    this.applyFrame();
    if (!this.running) this.renderer.render(this.scene, this.camera);
  }

  dispose(): void {
    this.stopLoop();
    this.resizeObserver.disconnect();
    document.removeEventListener('visibilitychange', this.onVisibility);
    // Anything that owns GPU memory, not just meshes. The worlds are full
    // of THREE.Points — sparkles, petals, bubbles, fireflies, spores — and
    // a Points is not a Mesh, so every one of them used to survive the
    // level it belonged to.
    this.scene.traverse((obj) => {
      const holder = obj as Partial<THREE.Mesh> & THREE.Object3D;
      if (holder.geometry) holder.geometry.dispose();
      if (!holder.material) return;
      const mats = Array.isArray(holder.material) ? holder.material : [holder.material];
      for (const m of mats) {
        // Cached toon materials + gradient/shadow textures outlive the
        // stage — disposing them would poison every later level.
        if (m.userData?.shared) continue;
        for (const v of Object.values(m)) {
          if (v instanceof THREE.Texture && !v.userData?.shared) v.dispose();
        }
        m.dispose();
      }
    });
    this.scene.clear();
    this.renderer.dispose();
    // dispose() frees what Three uploaded; it does NOT release the WebGL
    // context, which lives on the canvas until something collects it. A
    // browser allows about sixteen, and this app builds a new stage for
    // every level a child opens — so without this the console starts
    // announcing "Too many active WebGL contexts. Oldest context will be
    // lost", and eventually a level opens to a blank screen.
    this.renderer.forceContextLoss();
    this.canvas.remove();
  }
}
