/**
 * Renderer abstraction.
 * Reports WebGPU capability; renders through Three.js WebGLRenderer (WebGL 2).
 * The scene code is renderer-agnostic so a WebGPURenderer path can slot in later.
 */
import * as THREE from 'three';

export interface RendererInfo {
  backend: 'webgl2' | 'webgpu';
  webgpuSupported: boolean;
  pixelRatio: number;
}

const MAX_PIXEL_RATIO = 2;

export function createRenderer(canvas: HTMLCanvasElement): { renderer: THREE.WebGLRenderer; info: RendererInfo } {
  const webgpuSupported = typeof (navigator as { gpu?: unknown }).gpu !== 'undefined';

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: false,
    powerPreference: 'high-performance',
  });
  const pixelRatio = Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO);
  renderer.setPixelRatio(pixelRatio);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.06;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const info: RendererInfo = { backend: 'webgl2', webgpuSupported, pixelRatio };
  if (import.meta.env.DEV) {
    console.info(
      `[CodeBops] renderer=${info.backend} (WebGPU ${webgpuSupported ? 'available, WebGL2 chosen for this phase' : 'unavailable'}) dpr=${pixelRatio}`,
    );
  }
  return { renderer, info };
}
