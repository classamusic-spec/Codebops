/**
 * Gearworks counter screen — Phase 7: variables and safe loops.
 *
 * Berry Counter (counter machine): a variable you can watch. SET VALUE
 * spins the wheel straight to a number; ADD 1 / SUBTRACT 1 nudge it.
 * The creative star is reaching the target BOTH by setting and by
 * counting — a variable is its value, not the path you took there.
 *
 * Safe Stop (safeStop machine): REPEAT UNTIL FULL stamps jars until the
 * counter hits the target, then stops itself. Plain REPEAT never stops:
 * it runs away and wakes Forever Fred (the DOM dialog + a spinning
 * gremlin on the bench). The creative star is meeting Fred and then
 * fixing the loop — real debugging.
 */
import { Stage } from '../engine/stage';
import { CAMERA_PRESETS } from '../rendering/gearworks/cameraPresets';
import { GarageScene } from '../rendering/gearworks/garageScene';
import { CounterWheelRig, PressLineRig } from '../rendering/gearworks/counterRigs';
import { SpriteCharacter } from '../rendering/spriteCharacter';
import { TopBar } from '../ui/topBar';
import { GoalCard } from '../ui/goalCard';
import { ThinkTrailPanel, ThinkTrailStep } from '../ui/gearworks/statePanel';
import { MachineDeck } from '../ui/gearworks/machineDeck';
import { showBrief, showCelebration, showSettings, showFredDialog } from '../ui/dialogs';
import { sharedSfx } from '../audio/sfx';
import { SaveStore } from '../storage/saveStore';
import { el } from '../ui/dom';
import type { GearworksCounterLevel } from '../data/gearworks/levels';
import { GW_COUNTER_TILES } from '../data/gearworks/world';
import {
  runCounter, counterMisses, runSafeStop, safeStopMisses, CN_MAX,
  GcCounterEvent, GcSafeEvent, GcStep,
} from '../gameplay/gearworks/counterMachine';
import { peekForLevel } from '../ui/codePeek';

const STEP_MS = 600;

export class GearworksCounterScreen {
  private stage!: Stage;
  private scene!: GarageScene;
  private counterRig: CounterWheelRig | null = null;
  private pressRig: PressLineRig | null = null;
  private zip!: SpriteCharacter;
  private mixy!: SpriteCharacter;
  private trail!: ThinkTrailPanel;
  private deck!: MachineDeck<GcStep['cmd']>;
  private topBar!: TopBar;
  private charLayer!: HTMLElement;
  private ui!: HTMLElement;
  private disposers: Array<() => void> = [];
  private running = false;
  private calm = false;
  /** Stars accumulate across runs in a sitting. */
  private everPar = false;
  private everBonus = false;
  /** Berry Counter bothWays: won by SET and by counting. */
  private wonBySet = false;
  private wonByCount = false;
  /** Safe Stop debugFred: met Fred, then won safely. */
  private metFred = false;

  constructor(
    private readonly root: HTMLElement,
    private readonly level: GearworksCounterLevel,
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

    if (this.level.machine === 'counter') {
      this.counterRig = new CounterWheelRig(this.level.target, this.level.start ?? 0);
      this.counterRig.group.position.copy(this.scene.benchAnchor());
      this.stage.scene.add(this.counterRig.group);
    } else {
      this.pressRig = new PressLineRig(this.level.target);
      this.pressRig.group.position.copy(this.scene.benchAnchor());
      this.stage.scene.add(this.pressRig.group);
    }

    // --- mascots ---
    this.zip = new SpriteCharacter(
      { who: 'zip', height: 2.35, name: 'zip' },
      this.charLayer, this.stage.camera, wrap,
    );
    this.zip.addToScene(this.stage.scene);
    this.zip.placeAt(this.scene.zipSpot());
    this.zip.look('right');
    this.addNameChip(this.zip, 'Zip');

    this.mixy = new SpriteCharacter(
      { who: 'mixy', height: 2.1, name: 'mixy' },
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
    this.trail.setMachineLine(this.statusLine(this.level.start ?? 0, 0));

    this.deck = new MachineDeck<GcStep['cmd']>(this.ui, this.level.commands, this.level.maxSlots, {
      onChange: () => { /* live plan */ },
      onBop: () => void this.onBop(),
      onClear: () => this.resetMachine(),
    }, {
      tiles: GW_COUNTER_TILES,
      badges: {
        gcSet: { min: 0, max: CN_MAX, def: 0, prefix: '=', aria: 'Set the counter value: tap to pick 0 up to 9' },
      },
      loopCmds: ['ssRepeat', 'ssRepeatUntilFull'],
      initial: this.level.prefill?.map((s) => ({ ...s })),
    });

    // --- animation loop ---
    this.applySettings();
    this.disposers.push(this.stage.onTick((dt, elapsed) => {
      if (!this.calm) this.scene.update(dt, elapsed);
      this.counterRig?.update(dt);
      this.pressRig?.update(dt, elapsed);
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

  private statusLine(value: number, jars: number): string {
    return this.level.machine === 'counter'
      ? `Counter: ${value} · Goal ${this.level.target} 🔢`
      : `Jars: ${jars} of ${this.level.target} 🫙`;
  }

  private resetMachine(): void {
    this.counterRig?.reset(this.level.start ?? 0);
    this.pressRig?.reset();
    this.trail.setEmpty();
    this.trail.setMachineLine(this.statusLine(this.level.start ?? 0, 0));
  }

  // ---------- run + playback ----------

  private async onBop(): Promise<void> {
    if (this.running) return;
    this.running = true;
    this.deck.setRunning(true);
    this.resetMachine();
    this.zip.setMood('thinking');
    const program = this.deck.getProgram() as GcStep[];
    if (this.level.machine === 'counter') await this.runCounterPlan(program);
    else await this.runSafePlan(program);
  }

  private async runCounterPlan(program: GcStep[]): Promise<void> {
    const goal = { target: this.level.target };
    const result = runCounter(program, goal, this.level.start ?? 0);
    const stepMs = this.calm ? 360 : STEP_MS;
    const steps: ThinkTrailStep[] = [];
    let idx = -1;

    for (const ev of result.events) {
      if (ev.type === 'done') continue;
      if (ev.type === 'commandStart') {
        idx = ev.index;
        this.deck.highlightSlot(ev.index);
        await this.delay(stepMs * 0.3);
        continue;
      }
      const value = this.applyCounterVisual(ev);
      if (value !== null) {
        this.counterRig?.setValue(value);
        this.trail.setMachineLine(this.statusLine(value, 0));
      }
      const step = this.counterTrailStep(ev, steps.length + 1);
      if (step) { steps.push(step); this.trail.setSteps(steps.slice(-7)); }
      await this.delay(stepMs * 0.7);
    }
    this.deck.highlightSlot(-1);
    void idx;

    this.deck.setRunning(false);
    this.running = false;

    if (result.success) {
      if (program.length <= this.level.par) this.everPar = true;
      if (result.usedSet) this.wonBySet = true; else this.wonByCount = true;
      if (this.wonBySet && this.wonByCount) this.everBonus = true;
      this.celebrate(program.length, 'Counter-smart and clever!');
      if (!this.everBonus) {
        this.toast(result.usedSet
          ? '💡 Now reach 5 the OTHER way — count up with ADD 1!'
          : '💡 Now try SET VALUE — jump straight to 5 in one tile!');
      }
    } else {
      this.coach(counterMisses(goal, result.finalValue), steps);
    }
  }

  private async runSafePlan(program: GcStep[]): Promise<void> {
    const goal = { target: this.level.target };
    const result = runSafeStop(program, goal);
    const stepMs = this.calm ? 340 : STEP_MS;
    const steps: ThinkTrailStep[] = [];
    let ranawayHit = false;

    for (const ev of result.events) {
      if (ev.type === 'done' || ev.type === 'overflow') continue;
      if (ev.type === 'commandStart') {
        this.deck.highlightSlot(ev.index);
        await this.delay(stepMs * 0.25);
        continue;
      }
      if (ev.type === 'loopStart') { this.deck.highlightSlot(ev.index); }
      const jars = this.applySafeVisual(ev);
      if (jars !== null) this.trail.setMachineLine(this.statusLine(0, jars));
      const step = this.safeTrailStep(ev, steps.length + 1);
      if (step) { steps.push(step); this.trail.setSteps(steps.slice(-7)); }
      if (ev.type === 'loopRunaway') ranawayHit = true;
      // Presses past the target are the runaway — play them fast & frantic
      const overshoot = (ev.type === 'press' || ev.type === 'loopIter') && jars !== null && jars >= this.level.target;
      const beat = overshoot ? 0.14 : ev.type === 'loopIter' ? 0.5 : 0.7;
      await this.delay(stepMs * beat);
    }
    this.deck.highlightSlot(-1);

    this.deck.setRunning(false);
    this.running = false;

    if (result.success) {
      if (program.length <= this.level.par) this.everPar = true;
      if (this.metFred) this.everBonus = true;
      this.celebrate(program.length, 'Loop-safe and clever!');
      if (!this.everBonus) {
        this.toast('🤔 Curious? Swap in plain REPEAT (no "until") and BOP — meet Forever Fred!');
      }
    } else {
      if (ranawayHit) {
        this.metFred = true;
        sharedSfx.play('glitch');
        void this.mixy.glitchWobble(1);
        this.pressRig?.showFred();
        showFredDialog(this.ui, sharedSfx, () => { /* child fixes the plan */ });
      }
      this.coach(safeStopMisses(goal, result), steps);
    }
  }

  private applyCounterVisual(ev: GcCounterEvent): number | null {
    switch (ev.type) {
      case 'setValue': sharedSfx.play('place'); return ev.value;
      case 'add': sharedSfx.play('hop'); return ev.value;
      case 'sub': sharedSfx.play('drop'); return ev.value;
      case 'noop': sharedSfx.play('bump'); return null;
      default: return null;
    }
  }

  private counterTrailStep(ev: GcCounterEvent, n: number): ThinkTrailStep | null {
    switch (ev.type) {
      case 'setValue': return { n, icon: '🎯', text: `Set the wheel to ${ev.value}!`, verdict: 'ok' };
      case 'add': return { n, icon: '➕', text: `Added one — now ${ev.value}`, verdict: 'ok' };
      case 'sub': return { n, icon: '➖', text: `Took one off — now ${ev.value}`, verdict: 'ok' };
      case 'noop': return { n, icon: '💭', text: ev.reason === 'atMax' ? 'The wheel is full — it stops at 9!' : 'The jar is empty — it stops at 0!' };
      default: return null;
    }
  }

  private applySafeVisual(ev: GcSafeEvent): number | null {
    switch (ev.type) {
      case 'press': this.pressRig?.press(ev.jars); sharedSfx.play('bop'); return ev.jars;
      case 'loopStart': sharedSfx.play('loop'); return null;
      case 'loopIter': return ev.jars;
      case 'loopStopped': sharedSfx.play('star'); return ev.jars;
      case 'loopRunaway': sharedSfx.play('glitch'); return null;
      default: return null;
    }
  }

  private safeTrailStep(ev: GcSafeEvent, n: number): ThinkTrailStep | null {
    switch (ev.type) {
      case 'press':
        if (ev.jars > this.level.target) return { n, icon: '😵', text: 'Still stamping — it won\'t stop!!', verdict: 'no' };
        return { n, icon: '🔨', text: ev.jars >= this.level.target ? `Stamped jar ${ev.jars} — full!` : `Stamped jar ${ev.jars}`, verdict: 'ok' };
      case 'loopStart': return { n, icon: ev.safe ? '🔁' : '♾️', text: ev.safe ? 'Repeat until full — it will stop when done!' : 'Plain repeat — with no way to stop…' };
      case 'loopStopped': return { n, icon: '🛑', text: `Jar full at ${ev.jars} — the loop STOPPED. Safe!`, verdict: 'ok' };
      case 'loopRunaway': return { n, icon: '♾️', text: 'It never stopped — FOREVER FRED!', verdict: 'no' };
      case 'loopFail': return { n, icon: '🤔', text: 'The loop had nothing before it to repeat!', verdict: 'no' };
      default: return null;
    }
  }

  private celebrate(planLength: number, cleverName: string): void {
    void planLength;
    const starNames = ['It works!'];
    if (this.everPar) starNames.push(cleverName);
    if (this.everBonus) starNames.push(`Creative: ${this.level.bonus.text}!`);
    const stars = starNames.length;
    const prev = this.events.store.stars[this.level.id] ?? 0;
    this.events.store.setStars(this.level.id, Math.max(prev, stars));
    this.events.store.recordRun(this.level.id, Math.max(prev, stars), this.level.shortTitle, this.deck?.peekSteps() ?? []);
    this.topBar.setStars(Math.max(prev, stars));
    void this.zip.celebrate();
    sharedSfx.play('celebrate');
    showCelebration(this.ui, {
      stars,
      starNames,
      predictedCorrectly: null,
      peek: peekForLevel(this.level.id, this.level.shortTitle, this.deck.peekSteps()),
    }, sharedSfx, {
      onReplay: () => this.resetMachine(),
      onContinue: () => (this.events.hasNext && this.events.onNext ? this.events.onNext() : this.events.onExit()),
    });
  }

  private coach(misses: string[], steps: ThinkTrailStep[]): void {
    void this.mixy.glitchWobble(0.8);
    this.mixy.flashMood('surprised', 1600);
    if (!this.metFred) sharedSfx.play('glitch');
    this.trail.setSteps(
      [...steps.slice(-5), ...misses.map((m, i) => ({ n: i + 1, icon: '🔍', text: m, verdict: 'no' as const }))],
      this.level.coachHint,
    );
    this.toast('🛠️ Almost! Check the Think Trail, fix your plan, and BOP again!');
  }

  private delay(ms: number): Promise<void> {
    return new Promise((r) => window.setTimeout(r, ms));
  }

  private toast(text: string): void {
    this.root.querySelector('.gw-toast')?.remove();
    const t = el('div', 'toast gw-toast', this.root, text);
    window.setTimeout(() => t.remove(), 3200);
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
