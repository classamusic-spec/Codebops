/**
 * Gearworks maker screen — Phase 18: Maker Workshop (parameters).
 *
 * Build the MAKE gadget's body on the side card (PLACE, then REPEAT the
 * input), then the main deck CALLS it with a number dial. The same
 * gadget builds towers of different heights — one function, many inputs.
 * Stars ladder up abstraction: works / clever (one call per tower) /
 * creative (the gadget actually reads its input).
 */
import { Stage } from '../engine/stage';
import { CAMERA_PRESETS } from '../rendering/gearworks/cameraPresets';
import { GarageScene } from '../rendering/gearworks/garageScene';
import { MakerRig } from '../rendering/gearworks/makerRig';
import { SpriteCharacter } from '../rendering/spriteCharacter';
import { TopBar } from '../ui/topBar';
import { GoalCard } from '../ui/goalCard';
import { ThinkTrailPanel, ThinkTrailStep } from '../ui/gearworks/statePanel';
import { MachineDeck } from '../ui/gearworks/machineDeck';
import { GadgetCardEditor } from '../ui/gearworks/gadgetCard';
import { showBrief, showCelebration, showSettings, showHintCard } from '../ui/dialogs';
import { benchHints } from '../gameplay/hints';
import { sharedSfx } from '../audio/sfx';
import { SaveStore } from '../storage/saveStore';
import { el } from '../ui/dom';
import type { GearworksMakerLevel } from '../data/gearworks/levels';
import { makerGoalOf, makerStars } from '../data/gearworks/levels';
import { GW_MAKER_TILES } from '../data/gearworks/world';
import {
  runMaker, makerMisses, MkBodyStep, MkCall, MkEvent, MK_ARG_MIN, MK_ARG_MAX,
} from '../gameplay/gearworks/makerMachine';
import { peekForLevel } from '../ui/codePeek';

const STEP_MS = 460;

export class GearworksMakerScreen {
  private stage!: Stage;
  private scene!: GarageScene;
  private rig!: MakerRig;
  private zip!: SpriteCharacter;
  private mixy!: SpriteCharacter;
  private trail!: ThinkTrailPanel;
  private deck!: MachineDeck<'mkMake'>;
  private gadget!: GadgetCardEditor;
  private topBar!: TopBar;
  private charLayer!: HTMLElement;
  private ui!: HTMLElement;
  private disposers: Array<() => void> = [];
  private running = false;
  private calm = false;
  private body: MkBodyStep[] = [];

  constructor(
    private readonly root: HTMLElement,
    private readonly level: GearworksMakerLevel,
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
    this.stage.setSky('#141c4a', 40, 100);
    this.scene = new GarageScene('motorLab');
    this.stage.scene.add(this.scene.group);
    // 1.22 = fill 22% more of the frame. A workbench is a small
    // object in a big room, so fitting it the way a whole board is
    // fitted left it looking like something across the garage rather
    // than something you are standing at.
    this.stage.frameArea(this.scene.frameCenter(), this.scene.frameCorners(), 1.22);

    this.rig = new MakerRig(this.level.target.length, MK_ARG_MAX, this.level.target);
    this.rig.group.scale.setScalar(0.72);
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
    this.trail.setMachineLine(this.statusLine());

    this.gadget = new GadgetCardEditor(this.ui, {
      name: this.level.gadgetName,
      icon: '🛠️',
      prims: this.level.bodyPrims,
      slots: this.level.gadgetSlots,
      tiles: GW_MAKER_TILES,
    }, (body) => { this.body = body; });

    this.deck = new MachineDeck<'mkMake'>(this.ui, ['mkMake'], this.level.maxSlots, {
      onChange: () => { /* live plan */ },
      onBop: () => void this.onBop(),
      onClear: () => this.resetBuild(),
    }, {
      tiles: GW_MAKER_TILES,
      badges: { mkMake: { min: MK_ARG_MIN, max: MK_ARG_MAX, def: 2, prefix: '', aria: 'Set the tower height for this Make: 1 up to 4' } },
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


  private statusLine(): string {
    return `🏙️ Build this skyline: ${this.level.target.join('-')}`;
  }

  private resetBuild(): void {
    this.rig.reset();
    this.trail.setEmpty();
    this.trail.setMachineLine(this.statusLine());
  }

  // ---------- run + playback ----------

  private toCalls(): MkCall[] {
    return this.deck.getProgram().map((s) => ({ arg: s.arg ?? 1 }));
  }

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
    this.gadget.setRunning(true);
    this.rig.reset();
    this.zip.setMood('thinking');
    const main = this.toCalls();
    const goal = makerGoalOf(this.level);
    const result = runMaker(this.body, main, goal);
    const stepMs = this.calm ? STEP_MS * 0.6 : STEP_MS;
    const steps: ThinkTrailStep[] = [];

    for (const ev of result.events) {
      const trailStep = this.applyEvent(ev);
      if (trailStep) { steps.push(trailStep); this.trail.setSteps(steps.slice(-7)); }
      const beat = ev.type === 'callStart' ? 0.7 : ev.type === 'place' ? 0.6 : ev.type === 'towerDone' ? 0.5 : 0.3;
      await this.delay(stepMs * beat);
    }

    this.deck.highlightSlot(-1);
    this.deck.setRunning(false);
    this.gadget.setRunning(false);
    this.running = false;
    this.stage.zoomTo(1.22, 0.5);

    if (result.match) {
      this.celebrate(main);
      if (!result.usesParam) this.toast('💡 Nice! Now make your gadget REPEAT the input — one gadget, every size!');
    } else {
      this.coach(makerMisses(this.body, main, goal), steps);
    }
  }

  private applyEvent(ev: MkEvent): ThinkTrailStep | null {
    switch (ev.type) {
      case 'callStart':
        this.deck.highlightSlot(ev.index);
        this.gadget.pulse();
        sharedSfx.play('grab');
        return { n: ev.index + 1, icon: '🛠️', text: `MAKE ${ev.input} → build tower ${ev.tower + 1}`, verdict: 'ok' };
      case 'place':
        this.rig.placeBlock(ev.tower, ev.block);
        sharedSfx.play('place');
        return null;
      case 'towerDone': {
        this.rig.markTower(ev.tower, ev.correct);
        sharedSfx.play(ev.correct ? 'star' : 'bump');
        return ev.correct
          ? { n: ev.tower + 1, icon: '🏢', text: `Tower ${ev.tower + 1} is ${ev.height} tall — just right!`, verdict: 'ok' }
          : { n: ev.tower + 1, icon: '🔍', text: `Tower ${ev.tower + 1} is ${ev.height}, but needs ${ev.want}`, verdict: 'no' };
      }
      default:
        return null;
    }
  }

  private celebrate(main: readonly MkCall[]): void {
    const r = runMaker(this.body, main, makerGoalOf(this.level));
    const stars = makerStars(this.level, this.body, main);
    const starNames = ['You built the skyline!'];
    if (r.callCount === this.level.target.length) starNames.push('Clever — one call per tower!');
    if (r.usesParam) starNames.push(`Creative: ${this.level.bonus.text}!`);
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
      onReplay: () => this.resetBuild(),
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
    this.toast('🛠️ Almost! Build the gadget body, set each MAKE dial, and BOP again!');
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
