/** Toon-style material helpers for the storybook paper-world look. */
import * as THREE from 'three';

let gradientMap: THREE.DataTexture | null = null;

/** Shared 4-step toon gradient. */
export function toonGradient(): THREE.DataTexture {
  if (gradientMap) return gradientMap;
  const data = new Uint8Array([90, 150, 210, 255]);
  gradientMap = new THREE.DataTexture(data, 4, 1, THREE.RedFormat);
  gradientMap.minFilter = THREE.NearestFilter;
  gradientMap.magFilter = THREE.NearestFilter;
  gradientMap.needsUpdate = true;
  gradientMap.userData.shared = true;
  return gradientMap;
}

const cache = new Map<string, THREE.MeshToonMaterial>();

export function toonMat(color: string | number): THREE.MeshToonMaterial {
  const key = String(color);
  let m = cache.get(key);
  if (!m) {
    m = new THREE.MeshToonMaterial({ color, gradientMap: toonGradient() });
    // Cached + reused across levels — Stage.dispose must not destroy it.
    m.userData.shared = true;
    cache.set(key, m);
  }
  return m;
}

let contactShadow: THREE.Texture | null = null;

/** Radial soft contact-shadow texture (shared). */
export function contactShadowTexture(): THREE.Texture {
  if (contactShadow) return contactShadow;
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 6, size / 2, size / 2, size / 2);
  g.addColorStop(0, 'rgba(13,20,55,0.42)');
  g.addColorStop(0.6, 'rgba(13,20,55,0.18)');
  g.addColorStop(1, 'rgba(13,20,55,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.userData.shared = true;
  contactShadow = tex;
  return tex;
}

/** Wavy water-stripes texture for the stream. */
export function waterTexture(): THREE.CanvasTexture {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#37b6f6';
  ctx.fillRect(0, 0, size, size);
  ctx.strokeStyle = 'rgba(255,255,255,0.5)';
  ctx.lineWidth = 5;
  ctx.lineCap = 'round';
  for (let row = 0; row < 6; row++) {
    ctx.beginPath();
    const y = 20 + row * 42;
    for (let x = -20; x <= size + 20; x += 8) {
      const yy = y + Math.sin((x / size) * Math.PI * 3 + row * 1.7) * 7;
      if (x === -20) ctx.moveTo(x, yy);
      else ctx.lineTo(x, yy);
    }
    ctx.stroke();
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(2.2, 2.2);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}
