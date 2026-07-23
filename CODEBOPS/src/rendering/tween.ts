/** Tiny promise-based tween helper shared by characters and props. */

export type EaseName = 'linear' | 'out' | 'inOut' | 'bounce' | 'back';

const easings: Record<EaseName, (t: number) => number> = {
  linear: (t) => t,
  out: (t) => 1 - Math.pow(1 - t, 3),
  inOut: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
  bounce: (t) => {
    const n = 7.5625;
    const d = 2.75;
    if (t < 1 / d) return n * t * t;
    if (t < 2 / d) return n * (t -= 1.5 / d) * t + 0.75;
    if (t < 2.5 / d) return n * (t -= 2.25 / d) * t + 0.9375;
    return n * (t -= 2.625 / d) * t + 0.984375;
  },
  back: (t) => {
    const c = 1.70158;
    return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2);
  },
};

interface ActiveTween {
  duration: number;
  elapsed: number;
  ease: (t: number) => number;
  update: (k: number) => void;
  resolve: () => void;
}

export class Tweener {
  private active: ActiveTween[] = [];

  tween(duration: number, update: (k: number) => void, ease: EaseName = 'inOut'): Promise<void> {
    return new Promise((resolve) => {
      this.active.push({ duration, elapsed: 0, ease: easings[ease], update, resolve });
    });
  }

  update(dt: number): void {
    for (let i = this.active.length - 1; i >= 0; i--) {
      const tw = this.active[i];
      tw.elapsed += dt;
      const t = Math.min(1, tw.elapsed / tw.duration);
      tw.update(tw.ease(t));
      if (t >= 1) {
        this.active.splice(i, 1);
        tw.resolve();
      }
    }
  }

  clear(): void {
    for (const tw of this.active) tw.resolve();
    this.active.length = 0;
  }
}

export function wait(seconds: number): Promise<void> {
  return new Promise((r) => setTimeout(r, seconds * 1000));
}
