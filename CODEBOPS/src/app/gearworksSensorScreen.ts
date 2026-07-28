/**
 * Gearworks sensor screen — Phase 5: sensors and waiting.
 *
 * Wait for the Berry: the belt brings a berry on ITS schedule — the eye
 * sensor goes green on arrival, WAIT UNTIL sleeps exactly that long,
 * and the claw needs the timing right. Grabbing air and letting the
 * berry ride away are both first-class, fully animated near-misses.
 *
 * Sensor Workshop: the child TAPS the big gear to set the machine's
 * input (spinning / still) before pressing BOP — boolean state you can
 * poke. IF TURNING / IF STILL guard the next tile; the creative star is
 * testing BOTH inputs, i.e. covering both branches.
 */
import * as THREE from 'three';
import { Stage } from '../engine/stage';
import { CAMERA_PRESETS } from '../rendering/gearworks/cameraPresets';
import { GarageScene } from '../rendering/gearworks/garageScene';
import { BerryLineRig, WorkshopRig } from '../rendering/gearworks/sensorRigs';
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
import type { GearworksSensorLevel } from '../data/gearworks/levels';
import { GW_SENSOR_TILES } from '../data/gearworks/world';
import {
  runSensorMachine, berryGoalMet, berryGoalMisses, workshopRunCorrect, workshopRunMisses,
  GwSensorEvent, GwSensorStep,
} from '../gameplay/gearworks/sensorMachine';
import { peekForLevel } from '../ui/codePeek';

const STEP_MS = 640;

export class GearworksSensorScreen {
  private stage!: Stage;
  private scene!: GarageScene;
  private berryRig: BerryLineRig | null = null;
  private shopRig: WorkshopRig | null = null;
  private zip!: SpriteCharacter;
  private mixy!: SpriteCharacter;
  private trail!: ThinkTrailPanel;
  private deck!: MachineDeck<GwSensorStep['cmd']>;
  private topBar!: TopBar;
  private charLayer!: HTMLElement;
  private ui!: HTMLElement;
  private disposers: Array<() => void> = [];
  private running = false;
  private calm = false;
  /** Stars accumulate across runs in a sitting (like Phase 4). */
  private everPar = false;
  private everBonus = false;
  /** Workshop: which inputs have run correctly so far. */
  private okTurning = false;
  private okStill = false;

  constructor(
    private readonly root: HTMLElement,
    private readonly level: GearworksSensorLevel,
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
    // 1.22 = fill 22% more of the frame. A workbench is a small
    // object in a big room, so fitting it the way a whole board is
    // fitted left it looking like something across the garage rather
    // than something you are standing at.
    this.stage.frameArea(this.scene.frameCenter(), this.scene.frameCorners(), 1.22);

    if (this.level.machine === 'berry') {
      this.berryRig = new BerryLineRig();
      this.berryRig.group.position.copy(this.scene.benchAnchor());
      this.stage.scene.add(this.berryRig.group);
    } else {
      this.shopRig = new WorkshopRig();
      this.shopRig.group.position.copy(this.scene.benchAnchor());
      this.stage.scene.add(this.shopRig.group);

      // Discover beat: tap the gear to flip the machine's input
      const ray = new THREE.Raycaster();
      const tap = (e: PointerEvent): void => {
        if (this.running || !this.shopRig) return;
        const r = wrap.getBoundingClientRect();
        const p = new THREE.Vector2(
          ((e.clientX - r.left) / r.width) * 2 - 1,
          -((e.clientY - r.top) / r.height) * 2 + 1,
        );
        ray.setFromCamera(p, this.stage.camera);
        if (ray.intersectObjects(this.shopRig.inputTargets(), true).length > 0) {
          const next = !this.shopRig.isTurning();
          this.shopRig.setTurning(next);
          sharedSfx.play(next ? 'loop' : 'drop');
          this.trail.setMachineLine(this.statusLine());
          this.zip.flashMood('excited', 900);
          this.toast(next ? '⚙️ The gear is TURNING — the eye sees it!' : '🛑 The gear is STILL — the eye went grey.');
        }
      };
      wrap.addEventListener('pointerdown', tap);
      this.disposers.push(() => wrap.removeEventListener('pointerdown', tap));
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

    this.deck = new MachineDeck<GwSensorStep['cmd']>(this.ui, this.level.commands, this.level.maxSlots, {
      onChange: () => { /* live program */ },
      onBop: () => void this.onBop(),
      onClear: () => this.resetMachine(),
    }, { tiles: GW_SENSOR_TILES, initial: this.level.prefill?.map((s) => ({ ...s })) });

    // --- animation loop ---
    this.applySettings();
    this.disposers.push(this.stage.onTick((dt, elapsed) => {
      if (!this.calm) this.scene.update(dt, elapsed);
      this.berryRig?.update(dt, elapsed);
      this.shopRig?.update(dt, elapsed);
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
    if (this.level.machine === 'berry') {
      return 'Eye: sees nothing 👁️';
    }
    return this.shopRig?.isTurning()
      ? 'Input: gear TURNING ⚙️ (tap to change)'
      : 'Input: gear STILL 🛑 (tap to change)';
  }

  private resetMachine(): void {
    this.berryRig?.reset();
    if (this.shopRig) {
      const keep = this.shopRig.isTurning();
      this.shopRig.reset();
      this.shopRig.setTurning(keep);
    }
    this.trail.setEmpty();
    this.trail.setMachineLine(this.statusLine());
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
    this.resetMachine();
    this.zip.setMood('thinking');

    const program = this.deck.getProgram() as GwSensorStep[];
    const turning = this.shopRig?.isTurning() ?? false;
    const result = runSensorMachine(program, this.level.machine, { gearTurning: turning });

    const stepMs = this.calm ? 380 : STEP_MS;
    const steps: ThinkTrailStep[] = [];

    for (const ev of result.events) {
      if (ev.type === 'done' || ev.type === 'overflow') continue;
      if (ev.type === 'commandStart') {
        this.deck.highlightSlot(ev.index);
        await this.delay(stepMs * 0.3);
        continue;
      }
      this.applyEventVisual(ev);
      const trailStep = this.trailStepFor(ev, steps.length + 1);
      if (trailStep) {
        steps.push(trailStep);
        this.trail.setSteps(steps);
      }
      await this.delay(stepMs * this.eventBeat(ev));
    }
    this.deck.highlightSlot(-1);

    const success = this.level.machine === 'berry'
      ? berryGoalMet(this.level.berryGoal ?? { needBerries: 1 }, result.finalState)
      : workshopRunCorrect(result.finalState, turning);

    this.deck.setRunning(false);
    this.running = false;
    this.stage.zoomTo(1.22, 0.5);

    if (success) {
      if (program.length <= this.level.par) this.everPar = true;
      if (this.level.bonus.kind === 'noWaste') {
        // Every berry accounted for: none snapped at, none ridden by.
        if (result.finalState.snaps === 0 && result.finalState.missed === 0) this.everBonus = true;
      } else if (this.level.bonus.kind === 'secondBerry') {
        if (result.finalState.berriesGrabbed >= 2) this.everBonus = true;
      } else {
        if (turning) this.okTurning = true;
        else this.okStill = true;
        if (this.okTurning && this.okStill) this.everBonus = true;
      }
      // Name only the EARNED stars, in earned order (creative can land
      // without clever — the label must match the star, not the slot).
      const starNames = ['It works!'];
      if (this.everPar) starNames.push('Sensor-smart and clever!');
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
      if (!this.everBonus) {
        this.toast(
          this.level.bonus.kind === 'secondBerry'
            ? '🍓 The belt keeps rolling — can you grab TWO berries in one plan?'
            : this.level.bonus.kind === 'noWaste'
              ? '🍓 It works! Now catch all three with no snaps and none ridden by.'
              : `🚦 Now tap the gear ${turning ? 'STILL' : 'TURNING'} and BOP again — test the other branch!`);
      }
    } else {
      const misses = this.level.machine === 'berry'
        ? berryGoalMisses(this.level.berryGoal ?? { needBerries: 1 }, result.finalState)
        : workshopRunMisses(result.finalState, turning);
      if (result.overflowed) misses.push('That plan hit the safety limit — shorter plans are safer!');
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

  /** Longer beats for the events that carry the lesson. */
  private eventBeat(ev: GwSensorEvent): number {
    switch (ev.type) {
      case 'berryArrive': return 1.0;
      case 'waitUntilMet': return 0.9;
      case 'grab': return 1.0;
      case 'grabSnap': return 1.0;
      case 'berryMissed': return 1.0;
      case 'waitTick': return 0.55;
      default: return 0.65;
    }
  }

  private applyEventVisual(ev: GwSensorEvent): void {
    switch (ev.type) {
      case 'beltStart': this.berryRig?.setBelt(true); sharedSfx.play('bop'); break;
      case 'berryArrive':
        this.berryRig?.berryEnter();
        this.berryRig?.setSensor(true);
        sharedSfx.play('predictRight');
        break;
      case 'berryMissed':
        this.berryRig?.berryLeave();
        this.berryRig?.setSensor(false);
        sharedSfx.play('bump');
        break;
      case 'grab':
        this.berryRig?.grab(ev.total);
        this.berryRig?.setSensor(false);
        sharedSfx.play('grab');
        break;
      case 'grabSnap': this.berryRig?.snap(); sharedSfx.play('bump'); break;
      case 'waitUntilStart': sharedSfx.play('tap'); break;
      case 'waitUntilMet': sharedSfx.play('place'); break;
      case 'waitUntilGaveUp': sharedSfx.play('glitch'); break;
      case 'waitTick': sharedSfx.play('tap'); break;
      case 'guard': sharedSfx.play(ev.holds ? 'predictRight' : 'remove'); break;
      case 'gateOpen': this.shopRig?.openGate(); sharedSfx.play(ev.wrong ? 'glitch' : 'celebrate'); break;
      case 'warnLight': this.shopRig?.warn(); sharedSfx.play(ev.wrong ? 'glitch' : 'drop'); break;
      default: break;
    }
  }

  private trailStepFor(ev: GwSensorEvent, n: number): ThinkTrailStep | null {
    switch (ev.type) {
      case 'beltStart': return { n, icon: '🛤️', text: 'Belt ON — a berry is on its way!', verdict: 'ok' };
      case 'noop': return { n, icon: '💭', text: 'The belt was already on.' };
      case 'waitTick': return { n, icon: '⏳', text: ev.sensorOn ? 'Waited… the eye sees the berry!' : 'Waited one tick… nothing yet.', verdict: ev.sensorOn ? 'ok' : undefined };
      case 'waitUntilStart': return { n, icon: '👁️', text: 'Watching the eye sensor…' };
      case 'berryArrive': return { n, icon: '🍓', text: 'The berry ARRIVED — the eye turned green!', verdict: 'ok' };
      case 'waitUntilMet': return { n, icon: '✨', text: `Slept exactly ${ev.slept} tick${ev.slept === 1 ? '' : 's'} — no counting needed!`, verdict: 'ok' };
      case 'waitUntilGaveUp': return { n, icon: '😴', text: 'Waited and waited… nothing ever came. Is the belt on?', verdict: 'no' };
      case 'grab': return { n, icon: '🦾', text: `Grabbed the berry! (${ev.total})`, verdict: 'ok' };
      case 'grabSnap': return { n, icon: '😅', text: 'SNAP — the claw closed on air!', verdict: 'no' };
      case 'berryMissed': return { n, icon: '💨', text: 'The berry rode right past the claw!', verdict: 'no' };
      case 'guard': return {
        n, icon: ev.cond === 'turning' ? '⚙️' : '🛑',
        text: ev.holds
          ? `The gear IS ${ev.cond} — do the next tile!`
          : `The gear is NOT ${ev.cond} — skip the next tile.`,
        verdict: 'ok',
      };
      case 'skipped': return { n, icon: '⏭️', text: 'Skipped.' };
      case 'gateOpen': return { n, icon: '🚧', text: ev.wrong ? 'The gate opened… with no power?!' : 'Gate OPEN — the cart rolls through!', verdict: ev.wrong ? 'no' : 'ok' };
      case 'warnLight': return { n, icon: '🚨', text: ev.wrong ? 'False alarm — the gear was running fine!' : 'Warning light ON — everyone knows it stopped!', verdict: ev.wrong ? 'no' : 'ok' };
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
