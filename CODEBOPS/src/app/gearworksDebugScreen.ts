/**
 * Gearworks debug screen — Phase 11: advanced debugging (Broken Machine).
 *
 * The machine comes PRE-LOADED with a buggy program. The child runs it,
 * watches the Think Trail show exactly where it goes wrong, sees the
 * culprit tile spotlighted (Glitch Replay), reads a state comparison
 * (expected vs got), then edits the plan and re-runs. Fixing all three
 * broken machines earns the three stars — one detective badge each.
 */
import { Stage } from '../engine/stage';
import { CAMERA_PRESETS } from '../rendering/gearworks/cameraPresets';
import { GarageScene } from '../rendering/gearworks/garageScene';
import { JamMachineRig } from '../rendering/gearworks/jamMachineRig';
import { SpriteCharacter } from '../rendering/spriteCharacter';
import { TopBar } from '../ui/topBar';
import { ThinkTrailPanel, ThinkTrailStep } from '../ui/gearworks/statePanel';
import { MachineDeck } from '../ui/gearworks/machineDeck';
import { showBrief, showCelebration, showSettings } from '../ui/dialogs';
import { sharedSfx } from '../audio/sfx';
import { SaveStore } from '../storage/saveStore';
import { el } from '../ui/dom';
import type { GearworksDebugLevel, DebugPuzzle } from '../data/gearworks/levels';
import { debugBugIndex } from '../data/gearworks/levels';
import { GW_JAM_TILES } from '../data/gearworks/world';
import { runJam, jamGoalMet, GjEvent, GjStep } from '../gameplay/gearworks/jamMachine';
import { peekForLevel } from '../ui/codePeek';

const STEP_MS = 520;

export class GearworksDebugScreen {
  private stage!: Stage;
  private scene!: GarageScene;
  private rig!: JamMachineRig;
  private zip!: SpriteCharacter;
  private mixy!: SpriteCharacter;
  private trail!: ThinkTrailPanel;
  private deck: MachineDeck<GjStep['cmd']> | null = null;
  private topBar!: TopBar;
  private banner!: HTMLElement;
  private charLayer!: HTMLElement;
  private ui!: HTMLElement;
  private disposers: Array<() => void> = [];
  private running = false;
  private calm = false;
  private puzzleIdx = 0;

  constructor(
    private readonly root: HTMLElement,
    private readonly level: GearworksDebugLevel,
    private readonly events: {
      onExit: () => void;
      onNext?: () => void;
      hasNext: boolean;
      store: SaveStore;
    },
  ) {}

  private get puzzle(): DebugPuzzle { return this.level.puzzles[this.puzzleIdx]; }
  private get isLast(): boolean { return this.puzzleIdx === this.level.puzzles.length - 1; }

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
    // 1.22 = fill 22% more of the frame. A workbench is a small
    // object in a big room, so fitting it the way a whole board is
    // fitted left it looking like something across the garage rather
    // than something you are standing at.
    this.stage.frameArea(this.scene.frameCenter(), this.scene.frameCorners(), 1.22);

    this.rig = new JamMachineRig();
    this.rig.group.position.copy(this.scene.benchAnchor());
    this.stage.scene.add(this.rig.group);

    this.zip = new SpriteCharacter({ who: 'zip', height: 2.35, name: 'zip' }, this.charLayer, this.stage.camera, wrap);
    this.zip.addToScene(this.stage.scene);
    this.zip.placeAt(this.scene.zipSpot());
    this.zip.look('right');
    this.addNameChip(this.zip, 'Zip');

    this.mixy = new SpriteCharacter({ who: 'mixy', height: 2.1, name: 'mixy' }, this.charLayer, this.stage.camera, wrap);
    this.mixy.addToScene(this.stage.scene);
    this.mixy.placeAt(this.scene.mixySpot());
    this.mixy.look('left');
    this.addNameChip(this.mixy, 'GlitchBop');

    this.topBar = new TopBar(this.ui, `${this.level.title} · ${this.level.shortTitle}`, {
      onBack: this.events.onExit,
      onSettings: () => showSettings(this.ui, this.events.store, sharedSfx, () => this.applySettings()),
    });
    this.topBar.setStars(this.events.store.stars[this.level.id] ?? 0);
    this.banner = el('div', 'gw-mission-banner', this.ui);
    this.trail = new ThinkTrailPanel(this.ui);
    this.trail.setMachineLine('🔎 Run it to find the bug…');

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

    void showBrief(this.ui, this.level, sharedSfx).then(() => this.startPuzzle(0));
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

  // ---------- puzzle ladder ----------

  private startPuzzle(index: number): void {
    this.puzzleIdx = index;
    const p = this.puzzle;
    this.rig.reset();
    this.renderBanner();
    this.trail.setEmpty();
    this.trail.setMachineLine('🔎 Run it to find the bug…');

    this.deck?.root.remove();
    this.deck = new MachineDeck<GjStep['cmd']>(this.ui, p.commands, p.maxSlots, {
      onChange: () => { /* live edits */ },
      onBop: () => void this.onBop(),
      onClear: () => { this.rig.reset(); this.trail.setEmpty(); },
    }, {
      tiles: GW_JAM_TILES,
      badges: { jmRepeat: { min: 2, max: 4, def: 2, aria: 'How many times the loop repeats: 2, 3, or 4' } },
      loopCmds: ['jmRepeat'],
      initial: p.program as GjStep[],
    });

    this.showPuzzleBrief(p);
  }

  private renderBanner(): void {
    this.banner.innerHTML = '';
    const head = el('div', 'gw-mb-head', this.banner);
    el('span', 'gw-mb-emoji', head, '🔧');
    el('span', 'gw-mb-title', head, `Bug ${this.puzzle.n}/${this.level.puzzles.length} · ${this.puzzle.title}`);
    const pips = el('div', 'gw-mb-pips', this.banner);
    this.level.puzzles.forEach((_, i) => {
      const cls = i < this.puzzleIdx ? 'done' : i === this.puzzleIdx ? 'current' : '';
      el('span', `gw-mb-pip ${cls}`, pips);
    });
    el('div', 'gw-mb-goal', this.banner, '🔎 Find the bug, fix the plan, BOP again!');
  }

  private showPuzzleBrief(p: DebugPuzzle): void {
    const scrim = el('div', 'dialog-scrim', this.ui);
    const d = el('div', 'dialog', scrim);
    d.setAttribute('role', 'dialog');
    d.setAttribute('aria-modal', 'true');
    el('div', 'intro-emoji', d, '🔧');
    el('h2', undefined, d, `Broken Machine ${p.n}: ${p.title}`);
    el('p', undefined, d, p.brief);
    const go = el('button', 'mini-btn', d, '🔎 Let me look!');
    go.addEventListener('click', () => { sharedSfx.play('bop'); scrim.remove(); });
    go.focus();
  }

  private showFixed(next: () => void): void {
    const scrim = el('div', 'dialog-scrim', this.ui);
    const d = el('div', 'dialog', scrim);
    d.setAttribute('role', 'dialog');
    d.setAttribute('aria-modal', 'true');
    el('div', 'intro-emoji', d, '🛠️');
    el('h2', undefined, d, `Bug ${this.puzzle.n} fixed!`);
    el('p', undefined, d, this.isLast ? 'You fixed them all — machine detective!' : 'Great debugging! On to the next broken machine.');
    const go = el('button', 'mini-btn', d, '➜ Next machine');
    go.addEventListener('click', () => { sharedSfx.play('tap'); scrim.remove(); next(); });
    go.focus();
    sharedSfx.play('star');
  }

  // ---------- run + playback ----------

  private async onBop(): Promise<void> {
    if (this.running || !this.deck) return;
    this.running = true;
    this.deck.setRunning(true);
    this.deck.clearSpotlight();
    this.rig.reset();
    this.zip.setMood('thinking');

    const program = this.deck.getProgram() as GjStep[];
    const result = runJam(program);
    const stepMs = this.calm ? 330 : STEP_MS;
    const steps: ThinkTrailStep[] = [];
    let jam = 0;

    for (const ev of result.events) {
      if (ev.type === 'done') continue;
      if (ev.type === 'commandStart') { this.deck.highlightSlot(ev.index); await this.delay(stepMs * 0.26); continue; }
      switch (ev.type) {
        case 'motorOn': this.rig.setMotor(true); sharedSfx.play('bop'); break;
        case 'motorOff': this.rig.setMotor(false); sharedSfx.play('drop'); break;
        case 'conveyorOn': this.rig.setConveyor(true); sharedSfx.play('loop'); break;
        case 'conveyorOff': this.rig.setConveyor(false); sharedSfx.play('remove'); break;
        case 'conveyorNoPower': sharedSfx.play('bump'); break;
        case 'berryArrive': this.rig.berryArrive(); sharedSfx.play('predictRight'); break;
        case 'waitStuck': sharedSfx.play('remove'); break;
        case 'pressed': jam = ev.jam; this.rig.lower(); this.rig.addJam(ev.jam); sharedSfx.play('grab'); window.setTimeout(() => this.rig.raise(), 380); break;
        case 'pressMiss': sharedSfx.play('bump'); break;
        case 'pressUp': this.rig.raise(); sharedSfx.play('place'); break;
        default: break;
      }
      const step = this.trailStepFor(ev, steps.length + 1, jam);
      if (step) { steps.push(step); this.trail.setSteps(steps.slice(-8)); }
      const beat = ev.type === 'berryArrive' ? 0.9 : ev.type === 'pressed' ? 0.85 : ev.type === 'loopIter' ? 0.3 : 0.55;
      await this.delay(stepMs * beat);
    }
    this.deck.highlightSlot(-1);
    this.deck.setRunning(false);
    this.running = false;

    if (jamGoalMet(this.puzzle.goal, result)) {
      const stars = this.puzzleIdx + 1;
      const prev = this.events.store.stars[this.level.id] ?? 0;
      this.events.store.setStars(this.level.id, Math.max(prev, stars));
    this.events.store.recordRun(this.level.id, Math.max(prev, stars), this.level.shortTitle, this.deck?.peekSteps() ?? []);
      this.topBar.setStars(Math.max(prev, stars));
      void this.zip.celebrate();
      if (this.isLast) this.finishLevel();
      else this.showFixed(() => this.startPuzzle(this.puzzleIdx + 1));
    } else {
      // Glitch Replay: spotlight the culprit + state comparison
      const bug = debugBugIndex(this.puzzle, program);
      if (bug >= 0) this.deck.spotlight(bug);
      const want = this.puzzle.goal.minJam ?? 1;
      void this.mixy.glitchWobble(0.9);
      this.mixy.flashMood('surprised', 1600);
      sharedSfx.play('glitch');
      this.trail.setMachineLine(`Expected ${want} jar${want === 1 ? '' : 's'} · got ${result.finalState.jam} 🔎`);
      this.trail.setSteps(
        [...steps.slice(-5), { n: 1, icon: '🐞', text: 'Found the bug — see the red tile!', verdict: 'no' }],
        this.puzzle.coachHint,
      );
      this.toast('🐞 There is the bug! Fix the red tile and BOP again.');
    }
  }

  private finishLevel(): void {
    const stars = 3;
    const prev = this.events.store.stars[this.level.id] ?? 0;
    this.events.store.setStars(this.level.id, Math.max(prev, stars));
    this.events.store.recordRun(this.level.id, Math.max(prev, stars), this.level.shortTitle, this.deck?.peekSteps() ?? []);
    this.topBar.setStars(stars);
    sharedSfx.play('celebrate');
    showCelebration(this.ui, {
      stars,
      starNames: ['Bug 1 fixed!', 'Bug 2 fixed!', 'Master machine detective!'],
      predictedCorrectly: null,
      peek: peekForLevel(this.level.id, this.level.shortTitle, this.deck?.peekSteps() ?? []),
    }, sharedSfx, {
      onReplay: () => this.startPuzzle(this.level.puzzles.length - 1),
      onContinue: () => (this.events.hasNext && this.events.onNext ? this.events.onNext() : this.events.onExit()),
    });
  }

  private trailStepFor(ev: GjEvent, n: number, jam: number): ThinkTrailStep | null {
    switch (ev.type) {
      case 'motorOn': return { n, icon: '⚡', text: 'Motor ON', verdict: 'ok' };
      case 'motorOff': return { n, icon: '🛑', text: 'Motor OFF', verdict: 'ok' };
      case 'conveyorOn': return { n, icon: '🛤️', text: 'Belt running', verdict: 'ok' };
      case 'conveyorOff': return { n, icon: '⏹️', text: 'Belt stopped', verdict: 'ok' };
      case 'conveyorNoPower': return { n, icon: '🔌', text: 'Belt has NO power!', verdict: 'no' };
      case 'berryArrive': return { n, icon: '🍓', text: 'Strawberry arrived', verdict: 'ok' };
      case 'waitStuck': return { n, icon: '😴', text: 'Waited… no berry came!', verdict: 'no' };
      case 'pressed': return { n, icon: '🍯', text: `Jar ${jam} of jam!`, verdict: 'ok' };
      case 'pressMiss': return { n, icon: '😅', text: 'Press hit nothing!', verdict: 'no' };
      case 'pressUp': return { n, icon: '⬆️', text: 'Press up', verdict: 'ok' };
      case 'loopStart': return { n, icon: '🔁', text: `Loop — ${ev.count} times`, verdict: 'ok' };
      case 'loopEnd': return { n, icon: '✅', text: 'Loop done', verdict: 'ok' };
      default: return null;
    }
  }

  private delay(ms: number): Promise<void> { return new Promise((r) => window.setTimeout(r, ms)); }

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
