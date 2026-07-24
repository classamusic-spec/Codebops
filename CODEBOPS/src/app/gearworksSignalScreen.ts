/**
 * Gearworks signal screen — Phase 10: signals and parallelism.
 *
 * Two lanes, one BOP. The deterministic scheduler advances both the
 * Packer and the Mailer in lockstep; playback lights the running tile
 * in each lane on every tick, arcs a signal wave from the Packer to the
 * Mailer when a message passes (and pulses the receiving tile), and
 * pulses the Mailer's antenna while it WAITS. The Think Trail shows both
 * lanes tick by tick. Stars: works (1 gift) / clever (both gifts) /
 * creative (looped both lanes).
 */
import { Stage } from '../engine/stage';
import { CAMERA_PRESETS } from '../rendering/gearworks/cameraPresets';
import { GarageScene } from '../rendering/gearworks/garageScene';
import { TeamworkRig } from '../rendering/gearworks/teamworkRig';
import { SpriteCharacter } from '../rendering/spriteCharacter';
import { TopBar } from '../ui/topBar';
import { ThinkTrailPanel, ThinkTrailStep } from '../ui/gearworks/statePanel';
import { ParallelDeck } from '../ui/gearworks/parallelDeck';
import { showBrief, showCelebration, showSettings } from '../ui/dialogs';
import { sharedSfx } from '../audio/sfx';
import { SaveStore } from '../storage/saveStore';
import { el } from '../ui/dom';
import type { GearworksSignalLevel } from '../data/gearworks/levels';
import { signalStars } from '../data/gearworks/levels';
import { GW_SIGNAL_TILES } from '../data/gearworks/world';
import {
  runParallel, signalMisses, SgEvent,
} from '../gameplay/gearworks/signalMachine';

const TICK_MS = 720;

export class GearworksSignalScreen {
  private stage!: Stage;
  private scene!: GarageScene;
  private rig!: TeamworkRig;
  private zip!: SpriteCharacter;
  private mixy!: SpriteCharacter;
  private trail!: ThinkTrailPanel;
  private deck!: ParallelDeck;
  private topBar!: TopBar;
  private charLayer!: HTMLElement;
  private ui!: HTMLElement;
  private disposers: Array<() => void> = [];
  private running = false;
  private calm = false;
  private everStars = 0;

  constructor(
    private readonly root: HTMLElement,
    private readonly level: GearworksSignalLevel,
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

    const preset = CAMERA_PRESETS.bench;
    this.stage = new Stage(wrap, { viewDir: preset.viewDir, fovFor: preset.fovFor, indoor: true });
    this.stage.setSky('#141c4a', 40, 90);
    this.scene = new GarageScene('motorLab');
    this.stage.scene.add(this.scene.group);
    this.stage.frameArea(this.scene.frameCenter(), this.scene.frameCorners());

    this.rig = new TeamworkRig();
    this.rig.group.position.copy(this.scene.benchAnchor());
    this.stage.scene.add(this.rig.group);

    // --- mascots ---
    this.zip = new SpriteCharacter({ svgUrl: './art/characters/zip/zip.svg', height: 2.35, name: 'zip' }, this.charLayer, this.stage.camera, wrap);
    this.zip.addToScene(this.stage.scene);
    this.zip.placeAt(this.scene.zipSpot());
    this.zip.look('right');
    this.addNameChip(this.zip, 'Zip');

    this.mixy = new SpriteCharacter({ svgUrl: './art/characters/mixy/mixy.svg', height: 2.1, name: 'mixy', mixy: true }, this.charLayer, this.stage.camera, wrap);
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

    const goal = el('div', 'gw-job-goal', this.ui);
    el('span', 'gw-job-goal-emoji', goal, this.level.emoji);
    el('span', undefined, goal, this.level.goalText);

    this.trail = new ThinkTrailPanel(this.ui);
    this.trail.setMachineLine(`Delivered: 0 of ${this.level.target} 🎁`);

    this.deck = new ParallelDeck(this.ui, {
      packer: { id: 'packer', ...this.level.lanes.packer },
      mailer: { id: 'mailer', ...this.level.lanes.mailer },
    }, GW_SIGNAL_TILES, {
      onBop: () => void this.onBop(),
      onClear: () => { this.rig.reset(); this.trail.setEmpty(); this.trail.setMachineLine(`Delivered: 0 of ${this.level.target} 🎁`); },
    }, () => { /* live plans */ });
    // A guide level ships one lane already written (§ curriculum ladder).
    if (this.level.prefill) this.deck.setPrograms(this.level.prefill);

    // --- animation loop ---
    this.applySettings();
    this.disposers.push(this.stage.onTick((dt, elapsed) => {
      if (!this.calm) this.scene.update(dt, elapsed);
      this.rig.update(dt, elapsed);
      this.zip.update(dt, elapsed);
      this.mixy.update(dt, elapsed);
    }));
    this.stage.startLoop();
    // Frame the puzzle into the space the UI chrome leaves, not the whole canvas.
    this.stage.observeChrome(this.ui);

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

  // ---------- run + playback ----------

  private async onBop(): Promise<void> {
    if (this.running) return;
    this.running = true;
    this.deck.setRunning(true);
    this.rig.reset();
    this.zip.setMood('thinking');

    const programs = this.deck.getPrograms();
    const result = runParallel(programs, { target: this.level.target });
    const tickMs = this.calm ? 460 : TICK_MS;
    const steps: ThinkTrailStep[] = [];
    let delivered = 0;
    let lastSendIndex = -1;

    for (const ev of result.events) {
      if (ev.type === 'done') continue;
      switch (ev.type) {
        case 'tick':
          await this.delay(tickMs * 0.15);
          break;
        case 'step':
          this.deck.highlightStep(ev.lane, ev.index);
          if (ev.cmd === 'sgSendSignal') lastSendIndex = ev.index;
          break;
        case 'fetched': this.rig.fetch(); sharedSfx.play('place'); break;
        case 'packed': this.rig.pack(); sharedSfx.play('grab'); break;
        case 'packFail': sharedSfx.play('bump'); break;
        case 'signalSent':
          this.rig.signalWave(); sharedSfx.play('loop');
          if (lastSendIndex >= 0) this.deck.flashSignal('packer', lastSendIndex);
          break;
        case 'signalReceived':
          this.deck.highlightStep('mailer', ev.index);
          this.deck.flashSignal('mailer', ev.index);
          this.rig.signalReceived(); sharedSfx.play('predictRight');
          break;
        case 'waiting':
          this.deck.highlightStep('mailer', ev.index);
          this.rig.setWaiting(true);
          break;
        case 'delivered': delivered = ev.total; this.rig.deliver(); sharedSfx.play('star'); break;
        case 'emptySend': this.rig.emptyShip(); sharedSfx.play('bump'); break;
        case 'deadlock': sharedSfx.play('glitch'); break;
        default: break;
      }
      const step = this.trailStepFor(ev, steps.length + 1);
      if (step) { steps.push(step); this.trail.setSteps(steps.slice(-8)); }
      this.trail.setMachineLine(`Delivered: ${delivered} of ${this.level.target} 🎁`);
      const beat = ev.type === 'tick' ? 0.15 : ev.type === 'delivered' || ev.type === 'signalSent' ? 0.9 : ev.type === 'waiting' ? 0.5 : 0.6;
      await this.delay(tickMs * beat);
      if (ev.type === 'signalReceived') this.rig.setWaiting(false);
    }
    this.deck.highlightStep('packer', -1);
    this.deck.highlightStep('mailer', -1);
    this.deck.setRunning(false);
    this.running = false;

    if (result.success) {
      const stars = signalStars(this.level, programs);
      this.everStars = Math.max(this.everStars, stars);
      const starNames = ['A gift delivered!'];
      if (this.everStars >= 2) starNames.push('Both gifts — great teamwork!');
      if (this.everStars >= 3) {
        starNames.push(this.level.target > 1 ? 'Looped both lanes!' : 'You sent it again — the signal always works!');
      }
      const prev = this.events.store.stars[this.level.id] ?? 0;
      this.events.store.setStars(this.level.id, Math.max(prev, this.everStars));
    this.events.store.recordRun(this.level.id, Math.max(prev, this.everStars), this.level.shortTitle);
      this.topBar.setStars(Math.max(prev, this.everStars));
      void this.zip.celebrate();
      sharedSfx.play('celebrate');
      showCelebration(this.ui, { stars: this.everStars, starNames, predictedCorrectly: null }, sharedSfx, {
        onReplay: () => { this.rig.reset(); this.trail.setEmpty(); },
        onContinue: () => (this.events.hasNext && this.events.onNext ? this.events.onNext() : this.events.onExit()),
      });
      if (this.everStars < 3) {
        this.toast(this.level.target === 1
          ? '📣 One message, one gift! Now do the whole hand-off AGAIN for a second one.'
          : this.everStars < 2
            ? '🎁 Now deliver the SECOND gift — do the hand-off twice!'
            : '🔁 Compact it: end each lane with a REPEAT ×2 loop!');
      }
    } else {
      void this.mixy.glitchWobble(0.8);
      this.mixy.flashMood('surprised', 1600);
      sharedSfx.play('glitch');
      this.trail.setSteps(
        [...steps.slice(-5), ...signalMisses(programs, { target: this.level.target }).map((mm, i) => ({ n: i + 1, icon: '🔍', text: mm, verdict: 'no' as const }))],
        this.level.coachHint,
      );
      this.toast('🛠️ Almost! Check the Think Trail, fix the teamwork, and BOP again!');
    }
  }

  private trailStepFor(ev: SgEvent, n: number): ThinkTrailStep | null {
    switch (ev.type) {
      case 'fetched': return { n, icon: '🎁', text: 'Packer: fetched a gift', verdict: 'ok' };
      case 'packed': return { n, icon: '📦', text: 'Packer: packed the crate', verdict: 'ok' };
      case 'packFail': return { n, icon: '😅', text: ev.reason === 'noGift' ? 'Packer: no gift to pack — fetch first!' : 'Packer: the crate is still full!', verdict: 'no' };
      case 'signalSent': return { n, icon: '📡', text: 'Packer: SENT a signal →', verdict: 'ok' };
      case 'signalReceived': return { n, icon: '📶', text: '→ Mailer: GOT the signal!', verdict: 'ok' };
      case 'waiting': return { n, icon: '⏳', text: 'Mailer: waiting for the signal…' };
      case 'delivered': return { n, icon: '🚚', text: `Mailer: shipped gift ${ev.total}!`, verdict: 'ok' };
      case 'emptySend': return { n, icon: '📭', text: 'Mailer: shipped an EMPTY crate!', verdict: 'no' };
      case 'deadlock': return { n, icon: '🔒', text: 'Stuck! The signal never came.', verdict: 'no' };
      default: return null;
    }
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
