/**
 * Gearworks camera presets — the "toy diorama" viewing angles.
 *
 * Gear rotation direction is a core learning objective, and rotation is only
 * legible when the gear face is parallel to the picture plane. So Gearworks
 * families use LOW-pitch front-elevation views (machines face the camera,
 * axles point at the viewer), unlike the meadow worlds' 3/4 aerial view.
 *
 * Pure data — no Three.js / DOM imports so unit tests can verify the math.
 */

export interface Vec3Like {
  readonly x: number;
  readonly y: number;
  readonly z: number;
}

export interface GearworksCameraPreset {
  readonly id: string;
  /** Downward pitch in degrees (0 = level with the bench). */
  readonly pitchDeg: number;
  /** Normalized camera direction (from look-target toward the camera). */
  readonly viewDir: Vec3Like;
  /** Field of view per aspect ratio (lower = flatter, toy-model look). */
  readonly fovFor: (aspect: number) => number;
}

function fromPitch(id: string, pitchDeg: number, fovWide: number, fovTall: number): GearworksCameraPreset {
  const rad = (pitchDeg * Math.PI) / 180;
  return {
    id,
    pitchDeg,
    viewDir: { x: 0, y: Math.sin(rad), z: Math.cos(rad) },
    fovFor: (aspect: number) => (aspect >= 1.2 ? fovWide : aspect >= 0.9 ? fovWide + 4 : fovTall),
  };
}

/**
 * bench    — Gear Train, Orchestra, Debugging, Jam Machine: near-frontal so
 *            gear faces and direction arrows read perfectly.
 * workshop — Sensor Workshop, Lighthouse: slight top view for item positions
 *            on a single conveyor.
 * factory  — Conveyor Factory, Delivery Network: higher view separating
 *            parallel lanes in depth.
 */
export const CAMERA_PRESETS: Readonly<Record<'bench' | 'workshop' | 'factory', GearworksCameraPreset>> = {
  bench: fromPitch('bench', 14, 30, 40),
  workshop: fromPitch('workshop', 25, 32, 42),
  factory: fromPitch('factory', 33, 36, 46),
};

/** |viewDir| must be 1 (Stage scales camera distance along it). */
export function presetIsNormalized(p: GearworksCameraPreset): boolean {
  const { x, y, z } = p.viewDir;
  return Math.abs(Math.hypot(x, y, z) - 1) < 1e-6;
}
