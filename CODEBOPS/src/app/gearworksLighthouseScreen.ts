/**
 * Gearworks lighthouse screen — Phase 14: Lighthouse Logic.
 *
 * The child builds ONE rule from condition + AND/OR/NOT tiles, then the
 * lighthouse tests it against a whole SKY BOARD (the truth table). The
 * lamp shines sky by sky; a rule wins only when the lamp is right for
 * every sky. Doing it a second way — the conditions in the other order —
 * is the creative "you really understand it" star.
 */
import { Stage } from '../engine/stage';
import { CAMERA_PRESETS } from '../rendering/gearworks/cameraPresets';
import { GarageScene } from '../rendering/gearworks/garageScene';
import { LighthouseRig } from '../rendering/gearworks/lighthouseRig';
import { SpriteCharacter } from '../rendering/spriteCharacter';
import { TopBar } from '../ui/topBar';
import { GoalCard } from '../ui/goalCard';
import { ThinkTrailPanel, ThinkTrailStep } from '../ui/gearworks/statePanel';
import { MachineDeck } from '../ui/gearworks/machineDeck';
import { showBrief, showCelebration, showSettings, showHintCard } from '../ui/dialogs';
import { benchHints } from '../gameplay/hints';
import { sharedSfx } from '../audio/sfx';
import { SaveStore } from '../storage/saveStore';
import { el } from '../ui/dom';
import type { GearworksLighthouseLevel } from '../data/gearworks/levels';
import { lighthouseStars } from '../data/gearworks/levels';
import { GW_LIGHTHOUSE_TILES } from '../data/gearworks/world';
import {
  runLighthouse, lighthouseMisses, condOrder, LlStep, LlEvent, LighthouseScenario,
} from '../gameplay/gearworks/logicMachine';
import { peekForLevel } from '../ui/codePeek';

const STEP_MS = 620;

export class GearworksLighthouseScreen {
  private stage!: Stage;
  private scene!: GarageScene;
  private rig!: LighthouseRig;
  private zip!: SpriteCharacter;
  private mixy!: SpriteCharacter;
  private trail!: ThinkTrailPanel;
  private deck!: MachineDeck<LlStep['cmd']>;
  private topBar!: TopBar;
  private charLayer!: HTMLElement;
  private ui!: HTMLElement;
  private skyBoard!: HTMLElement;
  private skyChips: HTMLElement[] = [];
  private disposers: Array<() => void> = [];
  private running = false;
  private calm = false;
  private everPar = false;
  /** Distinct condition-orders that have WON — 2+ earns the creative star. */
  private winningOrders = new Set<string>();

  constructor(
    private readonly root: HTMLElement,
    private readonly level: GearworksLighthouseLevel,
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

    const preset = CAMERA_PRESETS.workshop;
    this.stage = new Stage(wrap, { viewDir: preset.viewDir, fovFor: preset.fovFor, indoor: true });
    this.stage.setSky('#0d1745', 40, 100);
    this.scene = new GarageScene('motorLab');
    this.stage.scene.add(this.scene.group);
    // 1.22 = fill 22% more of the frame. A workbench is a small
    // object in a big room, so fitting it the way a whole board is
    // fitted left it looking like something across the garage rather
    // than something you are standing at.
    this.stage.frameArea(this.scene.frameCenter(), this.scene.frameCorners(), 1.22);

    this.rig = new LighthouseRig();
    this.rig.group.scale.setScalar(0.5);
    this.rig.group.position.copy(this.scene.benchAnchor());
    this.stage.scene.add(this.rig.group);

    // --- mascots ---
    this.zip = new SpriteCharacter(
      { who: 'zip', height: 2.35, name: 'zip' },
      this.charLayer, this.stage.camera, wrap,
    );
    this.zip.addToScene(this.stage.scene);
    this.zip.placeAt(this.scene.zipSpot());
    this.zip.look('right');
    this.zip.setName('Zip');

    this.mixy = new SpriteCharacter(
      { who: 'mixy', height: 2.1, name: 'mixy' },
      this.charLayer, this.stage.camera, wrap,
    );
    this.mixy.addToScene(this.stage.scene);
    this.mixy.placeAt(this.scene.mixySpot());
    this.mixy.look('left');
    this.mixy.setName('GlitchBop');

    // --- UI chrome ---
    this.topBar = new TopBar(this.ui, `${this.level.title} · ${this.level.shortTitle}`, {
      onBack: this.events.onExit,
      onSettings: () => showSettings(this.ui, this.events.store, sharedSfx, () => this.applySettings()),
      // Same ? button as every other level. The bench levels are not
      // grids, so there is nothing to walk — but each one already
      // carries a coach hint written for the Think Trail, which is
      // exactly the nudge this wants.
      onHint: () => showHintCard(this.ui, sharedSfx, benchHints(this.level)),
    });
    this.topBar.setStars(this.events.store.stars[this.level.id] ?? 0);
    new GoalCard(this.ui, this.level.goalText, this.level.emoji);
    this.trail = new ThinkTrailPanel(this.ui);
    this.trail.setMachineLine('Build a rule, then BOP to test every sky! 🗼');

    this.buildSkyBoard();

    this.deck = new MachineDeck<LlStep['cmd']>(this.ui, this.level.commands, this.level.maxSlots, {
      onChange: () => { /* live plan */ },
      onBop: () => void this.onBop(),
      onClear: () => this.resetBoard(),
    }, {
      tiles: GW_LIGHTHOUSE_TILES,
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


  // ---------- sky board (the truth table, made visible) ----------

  private buildSkyBoard(): void {
    this.skyBoard = el('div', 'gw-sky-board', this.ui);
    this.skyBoard.setAttribute('aria-label', 'Skies to test');
    el('div', 'sky-title', this.skyBoard, 'SKIES');
    const row = el('div', 'sky-row', this.skyBoard);
    this.skyChips = this.level.scenarios.map((sc) => this.makeSkyChip(sc, row));
  }

  private makeSkyChip(sc: LighthouseScenario, parent: HTMLElement): HTMLElement {
    const chip = el('div', 'sky-chip', parent);
    chip.dataset.want = sc.want ? 'on' : 'off';
    el('span', 'sky-emoji', chip, sc.emoji);
    el('span', 'sky-label', chip, sc.label);
    const lamp = el('span', 'sky-lamp', chip);
    lamp.setAttribute('aria-label', sc.want ? 'lamp should shine' : 'lamp should stay dark');
    el('span', 'sky-mark', chip, '');
    return chip;
  }

  private resetSkyBoard(): void {
    this.skyChips.forEach((c) => {
      c.classList.remove('active', 'lit', 'pass', 'fail');
      const mark = c.querySelector('.sky-mark');
      if (mark) mark.textContent = '';
    });
  }

  private resetBoard(): void {
    this.rig.reset();
    this.resetSkyBoard();
    this.trail.setEmpty();
    this.trail.setMachineLine('Build a rule, then BOP to test every sky! 🗼');
  }

  // ---------- run + playback ----------

  private async onBop(): Promise<void> {
    if (this.running) return;
    this.running = true;
    // Lean in on the machine while it works — a child pressed BOP to
    // watch the gears, not to watch the room. A fifth closer is enough to
    // feel like leaning forward; a half again cropped both bops off the
    // ends of the bench and read as claustrophobic. Eased, and only for
    // the length of the run.
    this.stage.zoomTo(1.46, 0.55);
    this.deck.setRunning(true);
    this.rig.reset();
    this.resetSkyBoard();
    this.zip.setMood('thinking');
    const program = this.deck.getProgram() as LlStep[];
    const result = runLighthouse(program, this.level.scenarios);
    const stepMs = this.calm ? STEP_MS * 0.6 : STEP_MS;
    const steps: ThinkTrailStep[] = [];
    let curSky = -1;

    for (const ev of result.events) {
      if (ev.type === 'done') continue;
      if (ev.type === 'scenarioEnter') {
        curSky = ev.index;
        this.skyChips.forEach((c, i) => c.classList.toggle('active', i === ev.index));
        this.rig.setLamp(false);
        sharedSfx.play('tap');
        this.trail.setMachineLine(`Testing: ${ev.scenario.label} ${ev.scenario.emoji}`);
        await this.delay(stepMs * 0.5);
        continue;
      }
      if (ev.type === 'token') {
        this.deck.highlightSlot(ev.slot);
        await this.delay(stepMs * 0.28);
        continue;
      }
      if (ev.type === 'lamp') {
        this.deck.highlightSlot(-1);
        this.rig.setLamp(ev.on);
        const chip = this.skyChips[curSky];
        chip?.classList.toggle('lit', ev.on);
        await this.delay(stepMs * 0.5);
        this.rig.flashResult(ev.correct);
        chip?.classList.add(ev.correct ? 'pass' : 'fail');
        const mark = chip?.querySelector('.sky-mark');
        if (mark) mark.textContent = ev.correct ? '✓' : '✗';
        sharedSfx.play(ev.correct ? 'predictRight' : 'predictWrong');
        steps.push(this.skyTrailStep(ev, this.level.scenarios[curSky], steps.length + 1));
        this.trail.setSteps(steps.slice(-6));
        await this.delay(stepMs * 0.55);
        continue;
      }
    }

    this.deck.highlightSlot(-1);
    this.deck.setRunning(false);
    this.running = false;
    this.stage.zoomTo(1.22, 0.5);

    if (result.allCorrect) {
      if (program.length <= this.level.par) this.everPar = true;
      this.winningOrders.add(condOrder(program).join('>'));
      this.celebrate(program);
      if (this.winningOrders.size < 2) {
        this.toast(`💡 Try it again the OTHER way — ${this.level.bonus.text}!`);
      }
    } else {
      this.coach(lighthouseMisses(program, this.level.scenarios), steps);
    }
  }

  private skyTrailStep(ev: Extract<LlEvent, { type: 'lamp' }>, sc: LighthouseScenario, n: number): ThinkTrailStep {
    if (ev.correct) {
      return { n, icon: ev.on ? '💡' : '🌑', text: `${sc.label}: lamp ${ev.on ? 'shines' : 'stays dark'} — right!`, verdict: 'ok' };
    }
    return { n, icon: '🔍', text: `${sc.label}: lamp is ${ev.on ? 'ON' : 'off'} but should be ${ev.want ? 'ON' : 'off'}`, verdict: 'no' };
  }

  private celebrate(program: readonly LlStep[]): void {
    const everBoth = this.winningOrders.size >= 2;
    const stars = lighthouseStars(this.level, program, this.everPar, everBoth);
    const starNames = ['Every sky is right!'];
    if (this.everPar) starNames.push('Clever — the tidy rule!');
    if (everBoth) starNames.push(`Creative: ${this.level.bonus.text}!`);
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
    this.toast('🛠️ Close! Check which sky came out wrong, fix your rule, and BOP again!');
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
