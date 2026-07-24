/**
 * Gearworks Job screen — Phase 9: functions and job cards.
 *
 * The child builds a JOB card ("Make Jam" = FETCH, PRESS) on the left,
 * then writes a MAIN program on the deck that DOES the job. The Think
 * Trail shows the execution trace: a call line, then the job's inner
 * steps indented — you can watch the function run. Stars ladder up the
 * abstraction: works (3 jars) / clever (used the job) / creative
 * (refactored the calls into a loop).
 *
 * The jam is shown on the Phase 8 machine, reused: FETCH slides a berry
 * to the press, PRESS squishes it into a jar.
 */
import { Stage } from '../engine/stage';
import { CAMERA_PRESETS } from '../rendering/gearworks/cameraPresets';
import { GarageScene } from '../rendering/gearworks/garageScene';
import { JamMachineRig } from '../rendering/gearworks/jamMachineRig';
import { SpriteCharacter } from '../rendering/spriteCharacter';
import { TopBar } from '../ui/topBar';
import { ThinkTrailPanel, ThinkTrailStep } from '../ui/gearworks/statePanel';
import { MachineDeck } from '../ui/gearworks/machineDeck';
import { JobCardEditor } from '../ui/gearworks/jobCard';
import { showBrief, showCelebration, showSettings } from '../ui/dialogs';
import { sharedSfx } from '../audio/sfx';
import { SaveStore } from '../storage/saveStore';
import { el } from '../ui/dom';
import type { GearworksJobLevel } from '../data/gearworks/levels';
import { jobStars } from '../data/gearworks/levels';
import { GW_JOB_TILES } from '../data/gearworks/world';
import {
  runJobProgram, jobMisses, GbEvent, JobStep, JOB_REPEAT_MIN, JOB_REPEAT_MAX,
} from '../gameplay/gearworks/jobMachine';
import { peekForLevel } from '../ui/codePeek';

const STEP_MS = 560;

export class GearworksJobScreen {
  private stage!: Stage;
  private scene!: GarageScene;
  private rig!: JamMachineRig;
  private zip!: SpriteCharacter;
  private mixy!: SpriteCharacter;
  private trail!: ThinkTrailPanel;
  private deck!: MachineDeck<JobStep['cmd']>;
  private jobCard!: JobCardEditor;
  private topBar!: TopBar;
  private charLayer!: HTMLElement;
  private ui!: HTMLElement;
  private disposers: Array<() => void> = [];
  private running = false;
  private calm = false;
  private everStars = 0;

  constructor(
    private readonly root: HTMLElement,
    private readonly level: GearworksJobLevel,
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

    this.rig = new JamMachineRig();
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

    // Job card (left) with the objective on top
    const goal = el('div', 'gw-job-goal', this.ui);
    el('span', 'gw-job-goal-emoji', goal, this.level.emoji);
    el('span', undefined, goal, this.level.goalText);
    this.jobCard = new JobCardEditor(this.ui, {
      name: this.level.jobName, icon: this.level.jobIcon, prims: this.level.jobPrims,
      slots: this.level.jobSlots, tiles: GW_JOB_TILES,
    }, () => { /* live job body */ });

    this.trail = new ThinkTrailPanel(this.ui);
    this.trail.setMachineLine(`Jam: 0 of ${this.level.target} 🍯`);

    this.deck = new MachineDeck<JobStep['cmd']>(this.ui, this.level.mainCommands, this.level.maxSlots, {
      onChange: () => { /* live plan */ },
      onBop: () => void this.onBop(),
      onClear: () => { this.rig.reset(); this.trail.setEmpty(); this.trail.setMachineLine(`Jam: 0 of ${this.level.target} 🍯`); },
    }, {
      tiles: GW_JOB_TILES,
      badges: { jbRepeat: { min: JOB_REPEAT_MIN, max: JOB_REPEAT_MAX, def: 3, aria: 'How many times the loop repeats: 2, 3, or 4' } },
      loopCmds: ['jbRepeat'],
      initial: this.level.prefill?.map((s) => ({ ...s })),
    });

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
    this.jobCard.setRunning(true);
    this.rig.reset();
    this.rig.setMotor(true);
    this.rig.setConveyor(true);
    this.zip.setMood('thinking');

    const jobBody = this.jobCard.getBody();
    const main = this.deck.getProgram() as JobStep[];
    const result = runJobProgram(jobBody, main, { target: this.level.target });
    const stepMs = this.calm ? 350 : STEP_MS;
    const steps: ThinkTrailStep[] = [];
    let jam = 0, jobStepIdx = 0, activeLoop = -1;

    for (const ev of result.events) {
      if (ev.type === 'done') continue;
      switch (ev.type) {
        case 'commandStart':
          if (ev.inJob) { this.jobCard.highlightStep(jobStepIdx); jobStepIdx++; }
          else this.deck.highlightSlot(ev.index);
          await this.delay(stepMs * 0.28);
          continue;
        case 'jobCallStart':
          jobStepIdx = 0;
          this.deck.highlightSlot(ev.index);
          sharedSfx.play('tap');
          break;
        case 'jobCallEnd':
          this.jobCard.highlightStep(-1);
          break;
        case 'callEmpty': sharedSfx.play('bump'); break;
        case 'fetch': this.rig.berryArrive(); sharedSfx.play('predictRight'); break;
        case 'fetchEmpty': sharedSfx.play('remove'); break;
        case 'press':
          jam = ev.jars; this.rig.lower(); this.rig.addJam(ev.jars); sharedSfx.play('grab');
          window.setTimeout(() => this.rig.raise(), 380);
          break;
        case 'pressMiss': sharedSfx.play('bump'); break;
        case 'loopStart': activeLoop = ev.index; this.deck.highlightSlot(ev.index); sharedSfx.play('loop'); break;
        case 'loopIter': this.deck.setIterBadge(ev.index, `${ev.iter}/${ev.count}`); break;
        case 'loopEnd': if (activeLoop >= 0) this.deck.setIterBadge(activeLoop, null); activeLoop = -1; break;
        case 'loopFail': sharedSfx.play('bump'); break;
        default: break;
      }
      const step = this.trailStepFor(ev, steps.length + 1, jam);
      if (step) { steps.push(step); this.trail.setSteps(steps.slice(-8)); }
      this.trail.setMachineLine(`Jam: ${jam} of ${this.level.target} 🍯`);
      const beat = ev.type === 'fetch' ? 0.85 : ev.type === 'press' ? 0.95 : ev.type === 'jobCallStart' ? 0.5 : ev.type === 'loopIter' ? 0.3 : 0.55;
      await this.delay(stepMs * beat);
    }
    this.deck.highlightSlot(-1);
    this.jobCard.highlightStep(-1);
    this.deck.setRunning(false);
    this.jobCard.setRunning(false);
    this.running = false;

    if (result.success) {
      const stars = jobStars(this.level, jobBody, main);
      this.everStars = Math.max(this.everStars, stars);
      const starNames = ['3 jars of jam!'];
      if (this.everStars >= 2) starNames.push('You saved a JOB — reuse!');
      if (this.everStars >= 3) starNames.push('Refactored with a loop!');
      const prev = this.events.store.stars[this.level.id] ?? 0;
      this.events.store.setStars(this.level.id, Math.max(prev, this.everStars));
    this.events.store.recordRun(this.level.id, Math.max(prev, this.everStars), this.level.shortTitle, this.deck?.peekSteps() ?? []);
      this.topBar.setStars(Math.max(prev, this.everStars));
      void this.zip.celebrate();
      sharedSfx.play('celebrate');
      showCelebration(this.ui, { stars: this.everStars, starNames, predictedCorrectly: null, peek: peekForLevel(this.level.id, this.level.shortTitle, this.deck.peekSteps()) }, sharedSfx, {
        onReplay: () => { this.rig.reset(); this.trail.setEmpty(); },
        onContinue: () => (this.events.hasNext && this.events.onNext ? this.events.onNext() : this.events.onExit()),
      });
      if (this.everStars < 3) {
        this.toast(result.usedJob
          ? '🔁 Refactor it: put DO MAKE JAM before a REPEAT ×3 — one call, looped!'
          : '💡 Save tiles: fill the Make Jam job, then DO it instead of repeating steps!');
      }
    } else {
      void this.mixy.glitchWobble(0.8);
      this.mixy.flashMood('surprised', 1600);
      sharedSfx.play('glitch');
      this.trail.setSteps(
        [...steps.slice(-5), ...jobMisses(jobBody, main, { target: this.level.target }).map((mm, i) => ({ n: i + 1, icon: '🔍', text: mm, verdict: 'no' as const }))],
        this.level.coachHint,
      );
      this.toast('🛠️ Almost! Check the Think Trail, fix your plan, and BOP again!');
    }
  }

  private trailStepFor(ev: GbEvent, n: number, jam: number): ThinkTrailStep | null {
    switch (ev.type) {
      case 'jobCallStart': return { n, icon: '📇', text: '▶ Do "Make Jam"…', verdict: 'ok' };
      case 'fetch': return { n, icon: ev.inJob ? '↳🍓' : '🍓', text: `${ev.inJob ? '   ' : ''}Fetched a strawberry`, verdict: 'ok' };
      case 'fetchEmpty': return { n, icon: '💨', text: 'No strawberries left!', verdict: 'no' };
      case 'press': return { n, icon: ev.inJob ? '↳🍯' : '🍯', text: `${ev.inJob ? '   ' : ''}Pressed — jar ${jam}!`, verdict: 'ok' };
      case 'pressMiss': return { n, icon: '😅', text: 'Pressed nothing — fetch first!', verdict: 'no' };
      case 'callEmpty': return { n, icon: '🤔', text: 'The Make Jam job is empty!', verdict: 'no' };
      case 'loopStart': return { n, icon: '🔁', text: `Loop — ${ev.count} times!` };
      case 'loopEnd': return { n, icon: '✅', text: 'Loop finished!', verdict: 'ok' };
      case 'loopFail': return { n, icon: '🤔', text: 'The Repeat had nothing before it!', verdict: 'no' };
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
