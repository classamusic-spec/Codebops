/**
 * Gearworks loop screen — Phase 4: loops and lifts.
 *
 * Gear Loop Challenge (crank + bell) and Loop Lift (berry elevator).
 * The deck gains the REPEAT ×n tile: tiles before it are its body
 * (tinted as a group), and during playback the loop tile counts its
 * turns live (k/n) while every body tile lights up again on each pass —
 * the loop made visible.
 *
 * The spec's efficiency beat drives the stars: the long plan and the
 * loop plan BOTH work. Winning the long way coaches "now try Repeat";
 * winning both ways in one sitting earns the creative star, and the
 * celebration compares tile counts (8 tiles → 3 tiles!).
 */
import { Stage } from '../engine/stage';
import { CAMERA_PRESETS } from '../rendering/gearworks/cameraPresets';
import { GarageScene } from '../rendering/gearworks/garageScene';
import { GearBellRig, LiftRig } from '../rendering/gearworks/loopRigs';
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
import type { GearworksLoopLevel } from '../data/gearworks/levels';
import { GW_LOOP_TILES } from '../data/gearworks/world';
import {
  runLoopMachine, loopGoalMisses, GwLoopEvent, GwLoopStep,
  GL_REPEAT_MIN, GL_REPEAT_MAX,
} from '../gameplay/gearworks/loopMachine';
import { peekForLevel } from '../ui/codePeek';

const STEP_MS = 600;

export class GearworksLoopScreen {
  private stage!: Stage;
  private scene!: GarageScene;
  private bellRig: GearBellRig | null = null;
  private liftRig: LiftRig | null = null;
  private zip!: SpriteCharacter;
  private mixy!: SpriteCharacter;
  private trail!: ThinkTrailPanel;
  private deck!: MachineDeck<GwLoopStep['cmd']>;
  private topBar!: TopBar;
  private charLayer!: HTMLElement;
  private ui!: HTMLElement;
  private disposers: Array<() => void> = [];
  private running = false;
  private calm = false;
  /** Efficiency beat: has each style of plan won this sitting? */
  private wonLongWay = false;
  private wonLoopWay = false;
  /**
   * Stars accumulate across runs in a sitting — on Loop Lift the par plan
   * (3 tiles) and the round trip (5+ tiles) are different runs by design,
   * so a run that earns a new star never loses one already won.
   */
  private everPar = false;
  private everBonus = false;

  constructor(
    private readonly root: HTMLElement,
    private readonly level: GearworksLoopLevel,
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
    const lift = this.level.machine === 'lift';
    this.scene = new GarageScene(lift ? 'liftBay' : 'motorLab');
    this.stage.scene.add(this.scene.group);
    // 1.22 = fill 22% more of the frame. A workbench is a small
    // object in a big room, so fitting it the way a whole board is
    // fitted left it looking like something across the garage rather
    // than something you are standing at.
    this.stage.frameArea(this.scene.frameCenter(), this.scene.frameCorners(), 1.22);

    if (lift) {
      this.liftRig = new LiftRig(this.level.goal.topFloor ?? 3);
      this.liftRig.group.position.set(0, 0.05, -1.5);
      this.stage.scene.add(this.liftRig.group);
    } else {
      this.bellRig = new GearBellRig(this.level.goal.needRings ?? 4);
      this.bellRig.group.position.copy(this.scene.benchAnchor());
      this.stage.scene.add(this.bellRig.group);
    }

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

    this.deck = new MachineDeck<GwLoopStep['cmd']>(this.ui, this.level.commands, this.level.maxSlots, {
      onChange: () => { /* live program */ },
      onBop: () => void this.onBop(),
      onClear: () => this.resetMachine(),
    }, {
      tiles: GW_LOOP_TILES,
      badges: {
        glRepeat: {
          min: GL_REPEAT_MIN, max: GL_REPEAT_MAX, def: GL_REPEAT_MIN,
          aria: 'Change how many times the loop repeats: 2, 3, or 4',
        },
      },
      loopCmds: ['glRepeat'],
    });

    // --- animation loop ---
    this.applySettings();
    this.disposers.push(this.stage.onTick((dt, elapsed) => {
      if (!this.calm) this.scene.update(dt, elapsed);
      this.bellRig?.update(dt, elapsed);
      this.liftRig?.update(dt, elapsed);
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


  private statusLine(rings = 0, floor = 0): string {
    return this.level.machine === 'gearBell'
      ? `Bell: ${rings} of ${this.level.goal.needRings ?? 0} rings 🔔`
      : `Lift: floor ${floor} of ${this.level.goal.topFloor ?? 0} 🛗`;
  }

  private resetMachine(): void {
    this.bellRig?.reset();
    this.liftRig?.reset();
    this.trail.setEmpty();
    this.trail.setMachineLine(this.statusLine());
  }

  // ---------- run + playback ----------

  private async onBop(): Promise<void> {
    if (this.running) return;
    this.running = true;
    this.deck.setRunning(true);
    this.resetMachine();
    this.zip.setMood('thinking');

    const program = this.deck.getProgram() as GwLoopStep[];
    const result = runLoopMachine(program, this.level.goal, this.level.machine);

    const stepMs = this.calm ? 360 : STEP_MS;
    const steps: ThinkTrailStep[] = [];
    let activeLoopSlot = -1;
    let stepIndex = -1;
    let rings = 0;
    let floor = 0;

    for (const ev of result.events) {
      if (ev.type === 'done' || ev.type === 'overflow') continue;
      const trailStep = this.trailStepFor(ev, steps.length + 1);
      switch (ev.type) {
        case 'commandStart':
          stepIndex = ev.index;
          this.deck.highlightSlot(ev.index);
          await this.delay(stepMs * 0.3);
          continue;
        case 'loopStart':
          activeLoopSlot = ev.index;
          this.deck.highlightSlot(ev.index);
          sharedSfx.play('loop');
          break;
        case 'loopIter':
          this.deck.setIterBadge(ev.index, `${ev.iter}/${ev.count}`);
          await this.delay(stepMs * 0.25);
          break;
        case 'loopEnd':
        case 'loopFail':
          if (activeLoopSlot >= 0) this.deck.setIterBadge(activeLoopSlot, null);
          activeLoopSlot = -1;
          if (ev.type === 'loopFail') sharedSfx.play('bump');
          break;
        case 'gearTurn':
          this.bellRig?.gearTurn();
          sharedSfx.play('loop');
          break;
        case 'bellRing':
          rings = ev.total;
          this.bellRig?.ring(ev.total);
          this.liftRig?.ring();
          sharedSfx.play('star');
          break;
        case 'bellClunk':
          this.bellRig?.clunk();
          sharedSfx.play('bump');
          break;
        case 'liftMove':
          floor = ev.to;
          this.liftRig?.setFloor(ev.to);
          sharedSfx.play(ev.dir === 'up' ? 'hop' : 'drop');
          break;
        case 'liftBump':
          this.liftRig?.bump();
          sharedSfx.play('bump');
          break;
      }
      if (trailStep) {
        steps.push(trailStep);
        this.trail.setSteps(steps);
        this.trail.setMachineLine(this.statusLine(rings, floor));
      }
      await this.delay(stepMs * (ev.type === 'loopStart' ? 0.45 : 0.65));
      if (stepIndex >= 0) this.deck.highlightSlot(activeLoopSlot >= 0 ? activeLoopSlot : -1);
    }

    this.deck.setRunning(false);
    this.running = false;

    if (result.success) {
      if (result.usedLoop) this.wonLoopWay = true;
      else this.wonLongWay = true;
      if (program.length <= this.level.par) this.everPar = true;
      const bonusNow = this.level.bonus.kind === 'bothWays'
        ? this.wonLongWay && this.wonLoopWay
        : result.finalState.floor === 0; // roundTrip: delivered at the top, ended home
      if (bonusNow) this.everBonus = true;
      // Name only the EARNED stars, in earned order (creative can land
      // without clever — the label must match the star, not the slot).
      const starNames = ['It works!'];
      if (this.everPar) starNames.push('Loop-short and clever!');
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
      // Efficiency beat: nudge toward (or celebrate) the comparison.
      if (this.level.bonus.kind === 'bothWays') {
        if (!result.usedLoop && !this.wonLoopWay) {
          this.toast(`💡 ${result.actionsRun} actions in ${program.length} tiles — a REPEAT tile can do it in ${this.level.par}!`);
        } else if (this.wonLongWay && this.wonLoopWay) {
          this.toast(`🔁 Same machine, ${program.length} tiles instead of ${longTiles(this.level)} — loops are SHORT!`);
        }
      } else if (!this.everBonus) {
        this.toast('🚚 Delivered! Creative idea: bring the lift back DOWN for the next load!');
      }
    } else {
      const misses = loopGoalMisses(this.level.goal, result.finalState);
      if (result.overflowed) misses.push('Whoa — that plan hit the safety limit! Shorter plans are safer.');
      void this.mixy.glitchWobble(0.8);
      this.mixy.flashMood('surprised', 1600);
      sharedSfx.play('glitch');
      this.trail.setSteps(
        [...steps.slice(-6), ...misses.map((m, i) => ({ n: i + 1, icon: '🔍', text: m, verdict: 'no' as const }))],
        this.level.coachHint,
      );
      this.toast('🛠️ Almost! Check the Think Trail, fix your plan, and BOP again!');
    }
  }

  private trailStepFor(ev: GwLoopEvent, n: number): ThinkTrailStep | null {
    switch (ev.type) {
      case 'gearTurn': return { n, icon: '⚙️', text: 'Gear turned — bell wound up!', verdict: 'ok' };
      case 'bellRing': return { n, icon: '🔔', text: this.level.machine === 'gearBell'
        ? `DING! (${ev.total} of ${this.level.goal.needRings ?? 0})`
        : `DING! Rung on floor ${ev.floor}`, verdict: 'ok' };
      case 'bellClunk': return { n, icon: '😅', text: 'Clunk… no power! Turn the gear first.', verdict: 'no' };
      case 'liftMove': return { n, icon: ev.dir === 'up' ? '⬆️' : '⬇️', text: `Lift ${ev.dir === 'up' ? 'rose' : 'lowered'} to floor ${ev.to}`, verdict: 'ok' };
      case 'liftBump': return { n, icon: '💥', text: ev.at === 'top' ? 'Bump — already at the top!' : 'Bump — already at the bottom!', verdict: 'no' };
      case 'loopStart': return { n, icon: '🔁', text: `Loop starts — ${ev.count} times!`, verdict: 'ok' };
      case 'loopIter': return ev.iter > 1 ? { n, icon: '🔁', text: `Loop turn ${ev.iter} of ${ev.count}` } : null;
      case 'loopEnd': return { n, icon: '✅', text: 'Loop finished!', verdict: 'ok' };
      case 'loopFail': return { n, icon: '🤔', text: 'The Repeat tile had nothing before it to repeat!', verdict: 'no' };
      default: return null;
    }
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

function longTiles(level: GearworksLoopLevel): number {
  return level.machine === 'gearBell' ? (level.goal.needRings ?? 2) * 2 : (level.goal.topFloor ?? 2) + 1;
}
