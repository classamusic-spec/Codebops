/**
 * Gearworks delivery screen — Phase 15: Delivery Depot (queues).
 *
 * The parcels wait in a LINE. LOAD lifts the one at the FRONT, DELIVER
 * drops it at the house ahead, DRIVE rolls to the next house — and a
 * REPEAT loop drains the whole queue. A little DOM queue strip makes
 * "first in, first out" visible while the 3-D truck runs the round.
 */
import { Stage } from '../engine/stage';
import { CAMERA_PRESETS } from '../rendering/gearworks/cameraPresets';
import { GarageScene } from '../rendering/gearworks/garageScene';
import { DeliveryRig } from '../rendering/gearworks/deliveryRig';
import { SpriteCharacter } from '../rendering/spriteCharacter';
import { TopBar } from '../ui/topBar';
import { GoalCard } from '../ui/goalCard';
import { ThinkTrailPanel, ThinkTrailStep } from '../ui/gearworks/statePanel';
import { MachineDeck } from '../ui/gearworks/machineDeck';
import { showBrief, showCelebration, showSettings } from '../ui/dialogs';
import { sharedSfx } from '../audio/sfx';
import { SaveStore } from '../storage/saveStore';
import { el } from '../ui/dom';
import type { GearworksDeliveryLevel } from '../data/gearworks/levels';
import { deliveryGoalOf, deliveryStars } from '../data/gearworks/levels';
import { GW_DELIVERY_TILES } from '../data/gearworks/world';
import {
  runDelivery, deliveryMisses, DvStep, DvEvent, DV_REPEAT_MIN, DV_REPEAT_MAX,
} from '../gameplay/gearworks/deliveryMachine';

const STEP_MS = 560;

export class GearworksDeliveryScreen {
  private stage!: Stage;
  private scene!: GarageScene;
  private rig!: DeliveryRig;
  private zip!: SpriteCharacter;
  private mixy!: SpriteCharacter;
  private trail!: ThinkTrailPanel;
  private deck!: MachineDeck<DvStep['cmd']>;
  private topBar!: TopBar;
  private charLayer!: HTMLElement;
  private ui!: HTMLElement;
  private queueStrip!: HTMLElement;
  private queueChips: HTMLElement[] = [];
  private disposers: Array<() => void> = [];
  private running = false;
  private calm = false;
  /** front pointer mirror for the DOM strip during playback. */
  private loadingIdx = -1;

  constructor(
    private readonly root: HTMLElement,
    private readonly level: GearworksDeliveryLevel,
    private readonly events: {
      onExit: () => void;
      onNext?: () => void;
      hasNext: boolean;
      store: SaveStore;
    },
  ) {}

  enter(): void {
    const wrap = el('div', '', this.root);
    wrap.id = 'world-canvas-wrap';
    this.charLayer = el('div', '', this.root);
    this.charLayer.id = 'char-layer';
    this.ui = el('div', 'ui-layer', this.root);

    const preset = CAMERA_PRESETS.factory;
    this.stage = new Stage(wrap, { viewDir: preset.viewDir, fovFor: preset.fovFor, indoor: true });
    this.stage.setSky('#12244a', 40, 110);
    this.scene = new GarageScene('motorLab');
    this.stage.scene.add(this.scene.group);
    this.stage.frameArea(this.scene.frameCenter(), this.scene.frameCorners());

    this.rig = new DeliveryRig(this.level.houses, this.level.queue);
    this.rig.group.scale.setScalar(0.8);
    this.rig.group.position.copy(this.scene.benchAnchor());
    this.stage.scene.add(this.rig.group);

    // --- mascots ---
    this.zip = new SpriteCharacter(
      { svgUrl: './art/characters/zip/zip.svg', height: 2.35, name: 'zip' },
      this.charLayer, this.stage.camera, wrap,
    );
    this.zip.addToScene(this.stage.scene);
    this.zip.placeAt(this.scene.zipSpot());
    this.zip.look('right');
    this.addNameChip(this.zip, 'Zip');

    this.mixy = new SpriteCharacter(
      { svgUrl: './art/characters/mixy/mixy.svg', height: 2.1, name: 'mixy', mixy: true },
      this.charLayer, this.stage.camera, wrap,
    );
    this.mixy.addToScene(this.stage.scene);
    this.mixy.placeAt(this.scene.mixySpot());
    this.mixy.look('left');
    this.addNameChip(this.mixy, 'GlitchBop');

    // --- UI chrome ---
    this.topBar = new TopBar(this.ui, `${this.level.title} · ${this.level.shortTitle}`, {
      onBack: this.events.onExit,
      onSettings: () => showSettings(this.ui, this.events.store, sharedSfx, () => this.applySettings()),
    });
    this.topBar.setStars(this.events.store.stars[this.level.id] ?? 0);
    new GoalCard(this.ui, this.level.goalText, this.level.emoji);
    this.trail = new ThinkTrailPanel(this.ui);
    this.trail.setMachineLine(this.statusLine(0));

    this.buildQueueStrip();

    this.deck = new MachineDeck<DvStep['cmd']>(this.ui, this.level.commands, this.level.maxSlots, {
      onChange: () => { /* live plan */ },
      onBop: () => void this.onBop(),
      onClear: () => this.resetBoard(),
    }, {
      tiles: GW_DELIVERY_TILES,
      badges: { dvRepeat: { min: DV_REPEAT_MIN, max: DV_REPEAT_MAX, def: DV_REPEAT_MIN, aria: 'Change how many times to repeat: 2, 3 or 4' } },
      loopCmds: ['dvRepeat'],
    });

    // --- animation loop ---
    this.applySettings();
    this.disposers.push(this.stage.onTick((dt, elapsed) => {
      if (!this.calm) this.scene.update(dt, elapsed);
      this.rig.update(dt);
      this.zip.update(dt, elapsed);
      this.mixy.update(dt, elapsed);
    }));
    this.stage.startLoop();

    void showBrief(this.ui, this.level, sharedSfx).then(() => {
      this.zip.setMood('happy');
      window.setTimeout(() => this.zip.setMood('idle'), 1600);
    });
  }

  private applySettings(): void {
    this.calm = this.events.store.settings.calmMode;
    sharedSfx.enabled = this.events.store.settings.sound;
    this.zip.setCalm(this.calm);
    this.mixy.setCalm(this.calm);
    document.body.classList.toggle('calm-mode', this.calm);
    document.body.classList.toggle('high-contrast', this.events.store.settings.highContrast);
    document.body.classList.toggle('left-handed', this.events.store.settings.leftHanded);
  }

  private addNameChip(sprite: SpriteCharacter, name: string): void {
    void sprite.whenReady().then(() => {
      const chip = el('span', 'gw-name-chip', sprite.el, name);
      chip.setAttribute('aria-hidden', 'true');
    });
  }

  private statusLine(delivered: number): string {
    return `📦 Line: ${this.level.queue.length} · Delivered ${delivered}/${this.level.queue.length}`;
  }

  // ---------- queue strip (first in, first out — made visible) ----------

  private buildQueueStrip(): void {
    this.queueStrip = el('div', 'gw-queue-strip', this.ui);
    this.queueStrip.setAttribute('aria-label', 'Parcel queue, front first');
    el('span', 'queue-front', this.queueStrip, 'FRONT →');
    const row = el('div', 'queue-row', this.queueStrip);
    this.queueChips = this.level.queue.map((p) => {
      const chip = el('div', 'queue-chip', row);
      el('span', 'q-emoji', chip, p.emoji);
      el('span', 'q-house', chip, `🏠${p.dest + 1}`);
      const mark = el('span', 'q-mark', chip, '');
      mark.setAttribute('aria-hidden', 'true');
      return chip;
    });
  }

  private resetQueueStrip(): void {
    this.loadingIdx = -1;
    this.queueChips.forEach((c) => {
      c.classList.remove('on-truck', 'gone', 'ok', 'bad');
      const m = c.querySelector('.q-mark');
      if (m) m.textContent = '';
    });
  }

  private resetBoard(): void {
    this.rig.reset();
    this.resetQueueStrip();
    this.trail.setEmpty();
    this.trail.setMachineLine(this.statusLine(0));
  }

  // ---------- run + playback ----------

  private async onBop(): Promise<void> {
    if (this.running) return;
    this.running = true;
    this.deck.setRunning(true);
    this.rig.reset();
    this.resetQueueStrip();
    this.zip.setMood('thinking');
    const program = this.deck.getProgram() as DvStep[];
    const goal = deliveryGoalOf(this.level);
    const result = runDelivery(program, goal);
    const stepMs = this.calm ? STEP_MS * 0.6 : STEP_MS;
    const steps: ThinkTrailStep[] = [];
    let delivered = 0;
    let repeatSlot = -1;

    for (const ev of result.events) {
      if (ev.type === 'done') continue;
      if (ev.type === 'commandStart') { this.deck.highlightSlot(ev.index); await this.delay(stepMs * 0.28); continue; }
      const step = this.applyEvent(ev, () => delivered, (n) => { delivered = n; });
      if (ev.type === 'loopStart') repeatSlot = ev.index;
      if (ev.type === 'loopIter' && repeatSlot >= 0) this.deck.setIterBadge(repeatSlot, `${ev.iter}/${ev.count}`);
      if (ev.type === 'loopEnd' && repeatSlot >= 0) this.deck.setIterBadge(repeatSlot, null);
      if (step) { steps.push(step); this.trail.setSteps(steps.slice(-7)); }
      this.trail.setMachineLine(this.statusLine(delivered));
      const beat = ev.type === 'drive' ? 0.9 : ev.type === 'deliver' ? 0.85 : ev.type === 'load' ? 0.7 : 0.4;
      await this.delay(stepMs * beat);
    }

    this.deck.highlightSlot(-1);
    this.deck.setRunning(false);
    this.running = false;

    if (result.allCorrect) {
      this.celebrate(program);
      if (!result.usedLoop) this.toast('💡 That works! Now try a REPEAT loop — LOAD, DELIVER, DRIVE, then Repeat!');
    } else {
      this.coach(deliveryMisses(program, goal), steps);
    }
  }

  private applyEvent(ev: DvEvent, getDelivered: () => number, setDelivered: (n: number) => void): ThinkTrailStep | null {
    const n = getDelivered() + 1;
    switch (ev.type) {
      case 'load': {
        this.rig.loadFront();
        this.loadingIdx += 1;
        const chip = this.queueChips[this.loadingIdx];
        chip?.classList.add('on-truck');
        sharedSfx.play('grab');
        return { n, icon: '📦', text: `Loaded ${ev.pkg.emoji} from the FRONT of the line`, verdict: 'ok' };
      }
      case 'loadNoop':
        sharedSfx.play('bump');
        return { n, icon: '🤔', text: ev.reason === 'full' ? 'Truck is full — deliver first!' : 'The line is empty now.' };
      case 'deliver': {
        this.rig.deliverAt(ev.house, ev.correct);
        const chip = this.queueChips[this.loadingIdx];
        chip?.classList.remove('on-truck');
        chip?.classList.add('gone', ev.correct ? 'ok' : 'bad');
        const mark = chip?.querySelector('.q-mark');
        if (mark) mark.textContent = ev.correct ? '✓' : '✗';
        sharedSfx.play(ev.correct ? 'drop' : 'bump');
        if (ev.correct) setDelivered(getDelivered() + 1);
        return ev.correct
          ? { n, icon: '🏠', text: `Delivered ${ev.pkg.emoji} to house ${ev.house + 1}!`, verdict: 'ok' }
          : { n, icon: '🔍', text: `${ev.pkg.emoji} went to house ${ev.house + 1} — wrong address!`, verdict: 'no' };
      }
      case 'deliverNoop':
        sharedSfx.play('bump');
        return { n, icon: '🤔', text: 'Nothing on the truck to deliver — LOAD first!' };
      case 'drive':
        this.rig.driveTo(ev.house);
        sharedSfx.play('hop');
        return { n, icon: '🚚', text: `Drove to house ${ev.house + 1}`, verdict: 'ok' };
      case 'driveEnd':
        return null;
      case 'loopStart':
        sharedSfx.play('loop');
        return { n, icon: '🔁', text: `Repeat ×${ev.count} — the loop drains the line!` };
      case 'loopFail':
        sharedSfx.play('bump');
        return { n, icon: '🤔', text: 'The loop had nothing before it to repeat!', verdict: 'no' };
      default:
        return null;
    }
  }

  private celebrate(program: readonly DvStep[]): void {
    const r = runDelivery(program, deliveryGoalOf(this.level));
    const stars = deliveryStars(this.level, program);
    const starNames = ['Every parcel delivered!'];
    if (r.usedLoop) starNames.push('Clever — you used a loop!');
    if (program.length <= this.level.par) starNames.push(`Creative: ${this.level.bonus.text}!`);
    const prev = this.events.store.stars[this.level.id] ?? 0;
    this.events.store.setStars(this.level.id, Math.max(prev, stars));
    this.topBar.setStars(Math.max(prev, stars));
    void this.zip.celebrate();
    sharedSfx.play('celebrate');
    showCelebration(this.ui, {
      stars,
      starNames,
      predictedCorrectly: null,
    }, sharedSfx, {
      onReplay: () => this.resetBoard(),
      onContinue: () => (this.events.hasNext && this.events.onNext ? this.events.onNext() : this.events.onExit()),
    });
  }

  private coach(misses: string[], steps: ThinkTrailStep[]): void {
    void this.mixy.glitchWobble(0.8);
    this.mixy.flashMood('surprised', 1600);
    sharedSfx.play('glitch');
    this.trail.setSteps(
      [...steps.slice(-4), ...misses.map((m, i) => ({ n: i + 1, icon: '🔍', text: m, verdict: 'no' as const }))],
      this.level.coachHint,
    );
    this.toast('🛠️ Almost! Check the queue, fix your plan, and BOP again!');
  }

  private delay(ms: number): Promise<void> {
    return new Promise((r) => window.setTimeout(r, ms));
  }

  private toast(text: string): void {
    this.root.querySelector('.gw-toast')?.remove();
    const t = el('div', 'toast gw-toast', this.root, text);
    window.setTimeout(() => t.remove(), 3400);
  }

  dispose(): void {
    this.disposers.forEach((d) => d());
    this.disposers = [];
    this.trail?.dispose();
    this.zip?.dispose();
    this.mixy?.dispose();
    this.stage?.dispose();
    this.root.innerHTML = '';
  }
}
