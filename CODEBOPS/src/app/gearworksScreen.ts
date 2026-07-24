/**
 * Gearworks Garage screen — Phase 2: playable motor levels.
 *
 * The child builds a machine program on the deck, presses BOP!, and the
 * deterministic machine interpreter runs it. Playback then animates the
 * typed event stream on the MotorRig (lamp, gauge needle, direction
 * arrow, spinning gear) while the Think Trail narrates every step and a
 * live state line shows ON/OFF · direction · speed. Success awards the
 * three stars (works / clever / creative) through the shared save store.
 *
 * DISCOVER beat: tapping the machine before programming nudges it — the
 * child sees cause and effect before writing a single instruction.
 */
import * as THREE from 'three';
import { Stage } from '../engine/stage';
import { CAMERA_PRESETS } from '../rendering/gearworks/cameraPresets';
import { GarageScene } from '../rendering/gearworks/garageScene';
import { MotorRig } from '../rendering/gearworks/motorRig';
import { SpriteCharacter } from '../rendering/spriteCharacter';
import { TopBar } from '../ui/topBar';
import { GoalCard } from '../ui/goalCard';
import { ThinkTrailPanel, ThinkTrailStep } from '../ui/gearworks/statePanel';
import { MachineDeck } from '../ui/gearworks/machineDeck';
import { showBrief, showCelebration, showSettings } from '../ui/dialogs';
import { sharedSfx } from '../audio/sfx';
import { SaveStore } from '../storage/saveStore';
import { el } from '../ui/dom';
import type { GearworksMachineLevel } from '../data/gearworks/levels';
import { bonusMet } from '../data/gearworks/levels';
import { GW_SPEED_NAMES } from '../data/gearworks/world';
import {
  runMachine, GearworksEvent, MachineState, initialMachine,
} from '../gameplay/gearworks/machine';
import { goalMisses } from '../gameplay/gearworks/machine';

const STEP_MS = 620;

export class GearworksScreen {
  private stage!: Stage;
  private scene!: GarageScene;
  private rig!: MotorRig;
  private zip!: SpriteCharacter;
  private mixy!: SpriteCharacter;
  private trail!: ThinkTrailPanel;
  private deck!: MachineDeck;
  private topBar!: TopBar;
  private charLayer!: HTMLElement;
  private ui!: HTMLElement;
  private disposers: Array<() => void> = [];
  private running = false;
  private calm = false;

  constructor(
    private readonly root: HTMLElement,
    private readonly level: GearworksMachineLevel,
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

    // --- stage: bench diorama + indoor light rig ---
    const preset = CAMERA_PRESETS.bench;
    this.stage = new Stage(wrap, { viewDir: preset.viewDir, fovFor: preset.fovFor, indoor: true });
    this.stage.setSky('#141c4a', 40, 90);
    this.scene = new GarageScene('motorLab');
    this.stage.scene.add(this.scene.group);
    this.stage.frameArea(this.scene.frameCenter(), this.scene.frameCorners());

    // --- the machine ---
    this.rig = new MotorRig();
    this.rig.group.position.copy(this.scene.benchAnchor());
    this.stage.scene.add(this.rig.group);

    // Discover beat: tap the machine → friendly nudge
    const ray = new THREE.Raycaster();
    const tap = (e: PointerEvent): void => {
      if (this.running) return;
      const r = wrap.getBoundingClientRect();
      const p = new THREE.Vector2(
        ((e.clientX - r.left) / r.width) * 2 - 1,
        -((e.clientY - r.top) / r.height) * 2 + 1,
      );
      ray.setFromCamera(p, this.stage.camera);
      if (ray.intersectObject(this.rig.group, true).length > 0) {
        this.rig.tapNudge();
        sharedSfx.play('loop');
        this.zip.flashMood('excited', 900);
      }
    };
    wrap.addEventListener('pointerdown', tap);
    this.disposers.push(() => wrap.removeEventListener('pointerdown', tap));

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
    this.trail.setMachineLine(this.stateLine(initialMachine()));

    this.deck = new MachineDeck(this.ui, this.level.commands, this.level.maxSlots, {
      onChange: () => { /* live program */ },
      onBop: () => void this.onBop(),
      onClear: () => this.resetMachine(),
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

  private resetMachine(): void {
    this.rig.reset();
    this.trail.setEmpty();
    this.trail.setMachineLine(this.stateLine(initialMachine()));
  }

  private stateLine(s: MachineState): string {
    const m = s.motor;
    return `Motor: ${m.on ? 'ON' : 'OFF'} · ${m.dir === 'cw' ? '⟳' : '⟲'} · ${GW_SPEED_NAMES[m.speed]}`;
  }

  // ---------- run + playback ----------

  private async onBop(): Promise<void> {
    if (this.running) return;
    this.running = true;
    this.deck.setRunning(true);
    this.resetMachine();
    this.zip.setMood('thinking');

    const program = this.deck.getProgram();
    const result = runMachine(program, this.level.goal);

    // Play the event stream step by step
    const stepMs = this.calm ? 380 : STEP_MS;
    const steps: ThinkTrailStep[] = [];
    this.narrated = steps;
    let stepIndex = -1;
    for (const ev of result.events) {
      if (ev.type === 'commandStart') {
        stepIndex = ev.index;
        this.deck.highlightSlot(ev.index);
        await this.delay(stepMs * 0.35);
        continue;
      }
      if (ev.type === 'done' || ev.type === 'overflow') continue;
      this.applyEventVisual(ev);
      const trailStep = this.trailStepFor(ev, stepIndex);
      if (trailStep) {
        steps.push(trailStep);
        this.trail.setSteps(steps);
      }
      if (stepIndex >= 0 && result.trail[stepIndex]) {
        this.trail.setMachineLine(this.stateLine(result.trail[stepIndex]));
      }
      await this.delay(stepMs * 0.65);
    }

    this.deck.setRunning(false);
    this.running = false;

    if (result.success) {
      const runTicks = result.finalState.motor.ranDir.cw + result.finalState.motor.ranDir.ccw;
      // Name only the EARNED stars, in earned order.
      const starNames = ['It works!'];
      if (program.length <= this.level.par) starNames.push('It is clever!');
      if (bonusMet(this.level.bonus, result.finalState.motor.ranAt, runTicks)) {
        starNames.push(`Creative: ${this.level.bonus.text}!`);
      }
      const stars = starNames.length;
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
        onReplay: () => this.resetMachine(),
        onContinue: () => (this.events.hasNext && this.events.onNext ? this.events.onNext() : this.events.onExit()),
      });
    } else {
      // Friendly near-miss coaching — never punitive
      const misses = goalMisses(this.level.goal, result.finalState);
      void this.mixy.glitchWobble(0.8);
      this.mixy.flashMood('surprised', 1600);
      sharedSfx.play('glitch');
      this.trail.setSteps(
        [...this.narrated.slice(-6), ...misses.map((m, i) => ({ n: i + 1, icon: '🔍', text: m, verdict: 'no' as const }))],
        this.level.coachHint,
      );
      this.toast('🛠️ Almost! Check the Think Trail, fix your plan, and BOP again!');
    }
  }

  /** Steps narrated during the last run (miss report appends to them). */
  private narrated: ThinkTrailStep[] = [];

  private trailStepFor(ev: GearworksEvent, index: number): ThinkTrailStep | null {
    const n = index + 1;
    let step: ThinkTrailStep | null = null;
    switch (ev.type) {
      case 'motorOn': step = { n, icon: '⚡', text: 'Motor ON!', verdict: 'ok' }; break;
      case 'motorOff': step = { n, icon: '🛑', text: 'Motor OFF — safe stop!', verdict: 'ok' }; break;
      case 'motorDir': step = { n, icon: ev.dir === 'cw' ? '⟳' : '⟲', text: ev.dir === 'cw' ? 'Now spinning forward' : 'Now spinning BACK', verdict: 'ok' }; break;
      case 'motorSpeed': step = { n, icon: '🎛️', text: `Speed set to ${GW_SPEED_NAMES[ev.speed]}`, verdict: 'ok' }; break;
      case 'spin': step = { n, icon: ev.dir === 'cw' ? '⚙️' : '🔄', text: `The gear turned (${GW_SPEED_NAMES[ev.speed]})`, verdict: 'ok' }; break;
      case 'waitIdle': step = { n, icon: '😴', text: 'Waited… but the motor was OFF', verdict: 'no' }; break;
      case 'noop': {
        const text = ev.reason === 'alreadyOn' ? 'It was already on!'
          : ev.reason === 'alreadyOff' ? 'It was already off!'
          : ev.reason === 'sameDir' ? 'Already spinning that way!'
          : 'Speed stayed the same.';
        step = { n, icon: '💭', text };
        break;
      }
      default: return null;
    }
    return step;
  }

  private applyEventVisual(ev: GearworksEvent): void {
    switch (ev.type) {
      case 'motorOn': this.rig.setOn(true); sharedSfx.play('bop'); break;
      case 'motorOff': this.rig.setOn(false); sharedSfx.play('drop'); break;
      case 'motorDir': this.rig.setDir(ev.dir); sharedSfx.play('tap'); break;
      case 'motorSpeed': this.rig.setSpeed(ev.speed); sharedSfx.play('place'); break;
      case 'spin': this.rig.workPulse(); sharedSfx.play('loop'); break;
      case 'waitIdle': sharedSfx.play('remove'); break;
      case 'noop': break;
      default: break;
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise((r) => window.setTimeout(r, ms));
  }

  private toast(text: string): void {
    this.root.querySelector('.gw-toast')?.remove();
    const t = el('div', 'toast gw-toast', this.root, text);
    window.setTimeout(() => t.remove(), 2600);
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
