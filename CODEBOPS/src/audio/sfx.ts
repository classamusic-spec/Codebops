/**
 * Tiny WebAudio synth for UI + gameplay feedback.
 * Architecture hooks only — final audio files can replace these later.
 */
export type SfxName =
  | 'tap' | 'place' | 'remove' | 'bop' | 'hop' | 'bump' | 'grab' | 'drop'
  | 'predictRight' | 'predictWrong' | 'star' | 'celebrate' | 'glitch' | 'loop'
  // Phase 13 — Robot Orchestra instrument voices
  | 'insDrum' | 'insBell' | 'insXylo' | 'insShaker' | 'insChime';

export class Sfx {
  private ctx: AudioContext | null = null;
  enabled = true;

  private ensure(): AudioContext | null {
    if (!this.enabled) return null;
    if (!this.ctx) {
      const AC = window.AudioContext ?? (window as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AC) return null;
      this.ctx = new AC();
    }
    if (this.ctx.state === 'suspended') void this.ctx.resume();
    return this.ctx;
  }

  private tone(freq: number, dur: number, type: OscillatorType, gain = 0.16, when = 0, slideTo?: number): void {
    const ctx = this.ensure();
    if (!ctx) return;
    const t0 = ctx.currentTime + when;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t0);
    if (slideTo) osc.frequency.exponentialRampToValueAtTime(slideTo, t0 + dur);
    g.gain.setValueAtTime(0, t0);
    g.gain.linearRampToValueAtTime(gain, t0 + 0.012);
    g.gain.exponentialRampToValueAtTime(0.001, t0 + dur);
    osc.connect(g).connect(ctx.destination);
    osc.start(t0);
    osc.stop(t0 + dur + 0.05);
  }

  play(name: SfxName): void {
    if (!this.enabled) return;
    switch (name) {
      case 'tap': this.tone(520, 0.07, 'triangle', 0.12); break;
      case 'place': this.tone(440, 0.09, 'triangle', 0.14); this.tone(660, 0.09, 'triangle', 0.12, 0.06); break;
      case 'remove': this.tone(330, 0.08, 'triangle', 0.1); break;
      case 'bop': this.tone(392, 0.1, 'square', 0.1); this.tone(523, 0.1, 'square', 0.1, 0.08); this.tone(784, 0.16, 'square', 0.1, 0.16); break;
      case 'hop': this.tone(300, 0.12, 'sine', 0.1, 0, 520); break;
      case 'bump': this.tone(140, 0.14, 'sawtooth', 0.08, 0, 90); break;
      case 'grab': this.tone(700, 0.08, 'triangle', 0.12); this.tone(900, 0.1, 'triangle', 0.1, 0.05); break;
      case 'drop': this.tone(600, 0.08, 'triangle', 0.12); this.tone(420, 0.12, 'triangle', 0.1, 0.06); break;
      case 'loop': this.tone(500, 0.07, 'sine', 0.1); this.tone(640, 0.08, 'sine', 0.09, 0.05); break;
      case 'predictRight': this.tone(523, 0.1, 'triangle', 0.13); this.tone(784, 0.14, 'triangle', 0.12, 0.08); break;
      case 'predictWrong': this.tone(260, 0.16, 'triangle', 0.1); this.tone(330, 0.14, 'triangle', 0.1, 0.1); break;
      case 'star': this.tone(880, 0.12, 'sine', 0.14); this.tone(1320, 0.2, 'sine', 0.1, 0.07); break;
      case 'celebrate':
        [523, 659, 784, 1047].forEach((f, i) => this.tone(f, 0.16, 'triangle', 0.13, i * 0.09));
        this.tone(1319, 0.3, 'sine', 0.1, 0.4);
        break;
      case 'glitch':
        this.tone(220, 0.07, 'square', 0.07); this.tone(180, 0.07, 'square', 0.07, 0.06);
        this.tone(260, 0.09, 'square', 0.07, 0.12);
        break;
      // --- Phase 13 instrument voices (one clear note per tap) ---
      case 'insDrum': this.tone(150, 0.16, 'sine', 0.2, 0, 62); break;
      case 'insBell': this.tone(880, 0.34, 'sine', 0.13); this.tone(1320, 0.3, 'sine', 0.07, 0.02); break;
      case 'insXylo': this.tone(1046, 0.22, 'triangle', 0.14); this.tone(2093, 0.14, 'sine', 0.05, 0.01); break;
      case 'insShaker': this.tone(5200, 0.05, 'triangle', 0.06); this.tone(3800, 0.05, 'square', 0.04, 0.02); break;
      case 'insChime': this.tone(1568, 0.4, 'sine', 0.1); this.tone(2349, 0.36, 'sine', 0.05, 0.03); break;
    }
  }
}

/**
 * One app-wide Sfx (and one AudioContext). Browsers cap live contexts at
 * ~6; a per-screen instance leaks one per navigation until audio dies.
 */
export const sharedSfx = new Sfx();
