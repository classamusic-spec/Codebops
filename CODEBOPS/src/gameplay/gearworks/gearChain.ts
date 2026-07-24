/**
 * Gear chain logic — Phase 3: gears, axles, and belts.
 *
 * Pure TypeScript, zero THREE/DOM imports. A machine chain is a row of
 * NODES (axles that can hold a gear/wheel) joined by LINKS:
 *
 *   'mesh'     — gear teeth touching. Passes power, REVERSES direction.
 *   'beltSlot' — a belt the child can stretch. Passes power, KEEPS
 *                direction (that's the whole lesson vs. meshed gears).
 *
 * Node 0 is the motor's drive gear (always present, spins clockwise).
 * The last node drives the target machine (press / bell). Power flows
 * left → right and stops at the first missing gear or belt.
 */

export type ChainLinkKind = 'mesh' | 'beltSlot';
export type SpinDir = 'cw' | 'ccw';

export interface ChainSpec {
  /** Per node: is the gear/wheel pre-installed (motor + target are)? */
  readonly nodes: ReadonlyArray<{ readonly fixed: boolean }>;
  /** links[i] joins node i and node i+1 — length = nodes.length - 1. */
  readonly links: readonly ChainLinkKind[];
}

export interface ChainPlacement {
  /** Per node: gear present (fixed nodes are always true). */
  readonly gears: readonly boolean[];
  /** Per link: for beltSlot links, belt present; mesh links ignore this. */
  readonly belts: readonly boolean[];
}

export function emptyPlacement(spec: ChainSpec): ChainPlacement {
  return {
    gears: spec.nodes.map((n) => n.fixed),
    belts: spec.links.map(() => false),
  };
}

/** Immutable helpers for the screen layer. */
export function withGear(p: ChainPlacement, node: number, placed: boolean): ChainPlacement {
  return { gears: p.gears.map((g, i) => (i === node ? placed : g)), belts: p.belts };
}
export function withBelt(p: ChainPlacement, link: number, placed: boolean): ChainPlacement {
  return { gears: p.gears, belts: p.belts.map((b, i) => (i === link ? placed : b)) };
}

export interface ChainFlow {
  /** Per node: spinning? */
  readonly turning: readonly boolean[];
  /** Per node: spin direction while turning (null when still). */
  readonly dirs: ReadonlyArray<SpinDir | null>;
  /** Index of the first link that fails to pass power (-1 = none). */
  readonly firstBrokenLink: number;
  /** Does power reach the last node (the target machine)? */
  readonly reachesTarget: boolean;
}

/** Deterministic power/direction propagation from the motor. */
export function propagate(spec: ChainSpec, placement: ChainPlacement, motorOn: boolean): ChainFlow {
  const n = spec.nodes.length;
  const turning: boolean[] = new Array(n).fill(false);
  const dirs: Array<SpinDir | null> = new Array(n).fill(null);
  let firstBrokenLink = -1;

  let powered = motorOn && placement.gears[0];
  let dir: SpinDir = 'cw';
  if (powered) {
    turning[0] = true;
    dirs[0] = dir;
  }
  for (let i = 0; i < spec.links.length; i++) {
    if (!powered) break;
    const link = spec.links[i];
    const nextHasGear = placement.gears[i + 1];
    const linkOk = link === 'mesh' ? nextHasGear : placement.belts[i] && nextHasGear;
    if (!linkOk) {
      firstBrokenLink = i;
      powered = false;
      break;
    }
    dir = link === 'mesh' ? (dir === 'cw' ? 'ccw' : 'cw') : dir;
    turning[i + 1] = true;
    dirs[i + 1] = dir;
  }

  return { turning, dirs, firstBrokenLink, reachesTarget: turning[n - 1] === true };
}

/** The direction the LAST node will spin once the chain is complete. */
export function finalDirection(spec: ChainSpec): SpinDir {
  let dir: SpinDir = 'cw';
  for (const link of spec.links) {
    if (link === 'mesh') dir = dir === 'cw' ? 'ccw' : 'cw';
  }
  return dir;
}

/** How many placeable pieces the chain needs (gears, belts). */
export function neededPieces(spec: ChainSpec): { gears: number; belts: number } {
  return {
    gears: spec.nodes.filter((n) => !n.fixed).length,
    belts: spec.links.filter((l) => l === 'beltSlot').length,
  };
}

export function chainComplete(spec: ChainSpec, p: ChainPlacement): boolean {
  return spec.nodes.every((n, i) => n.fixed || p.gears[i])
    && spec.links.every((l, i) => l !== 'beltSlot' || p.belts[i]);
}

/** Kid-facing explanation of why power stops (drives the Think Trail). */
export function chainMisses(spec: ChainSpec, p: ChainPlacement): string[] {
  const flow = propagate(spec, p, true);
  if (flow.reachesTarget) return [];
  const i = flow.firstBrokenLink;
  if (i < 0) return ['The motor gear is missing!'];
  const link = spec.links[i];
  if (link === 'beltSlot' && !p.belts[i]) {
    return [`Power stops after wheel ${i + 1} — stretch a BELT to the next wheel!`];
  }
  return [`Anchor ${i + 1} is empty — tap it to place a gear!`];
}
