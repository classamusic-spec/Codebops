/**
 * Gearworks Jam Machine screen — Phase 8: the hero level.
 *
 * One machine, six progressive missions. Each mission unlocks one more
 * tile (motor → belt → sensor → press → loop → the whole program) and
 * shows its own brief and goal. Finishing a mission advances the ladder;
 * finishing the sixth runs the FULL machine and awards the three stars:
 * it works (3 jars) / it is clever (a loop within par) / it is SAFE
 * (a clean shutdown — the safe-stopping-rules lesson made a star).
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
import type { GearworksJamLevel, JamMission } from '../data/gearworks/levels';
import { jamFinalStars } from '../data/gearworks/levels';
import { GW_JAM_TILES } from '../data/gearworks/world';
import {
  runJam, jamGoalMet, jamMisses, GjEvent, GjStep, JM_REPEAT_MIN, JM_REPEAT_MAX,
} from '../gameplay/gearworks/jamMachine';
import { peekForLevel } from '../ui/codePeek';

const STEP_MS = 540;

export class GearworksJamScreen {
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
  private missionIdx = 0;

  constructor(
    private readonly root: HTMLElement,
    private readonly level: GearworksJamLevel,
    private readonly events: {
      onExit: () => void;
      onNext?: () => void;
      hasNext: boolean;
      store: SaveStore;
    },
  ) {}

  private get mission(): JamMission {
    return this.level.missions[this.missionIdx];
  }

  private get isLastMission(): boolean {
    return this.missionIdx === this.level.missions.length - 1;
  }

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

    // --- UI chrome ---
    this.topBar = new TopBar(this.ui, `${this.level.title} · ${this.level.shortTitle}`, {
      onBack: this.events.onExit,
      onSettings: () => showSettings(this.ui, this.events.store, sharedSfx, () => this.applySettings()),
    });
    this.topBar.setStars(this.events.store.stars[this.level.id] ?? 0);
    this.banner = el('div', 'gw-mission-banner', this.ui);
    this.trail = new ThinkTrailPanel(this.ui);
    this.trail.setMachineLine(this.stateLine(false, false, 0));

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

    void showBrief(this.ui, this.level, sharedSfx).then(() => this.startMission(0));
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

  private stateLine(motor: boolean, belt: boolean, jam: number): string {
    return `Motor ${motor ? 'ON' : 'OFF'} · Belt ${belt ? 'ON' : 'OFF'} · Jam ${jam} 🍯`;
  }

  // ---------- mission ladder ----------

  private startMission(index: number): void {
    this.missionIdx = index;
    const m = this.mission;
    this.rig.reset();
    this.renderBanner();
    this.trail.setEmpty();
    this.trail.setMachineLine(this.stateLine(false, false, 0));

    // fresh deck with this mission's unlocked tiles
    this.deck?.root.remove();
    this.deck = new MachineDeck<GjStep['cmd']>(this.ui, m.commands, m.maxSlots, {
      onChange: () => { /* live plan */ },
      onBop: () => void this.onBop(),
      onClear: () => { this.rig.reset(); this.trail.setEmpty(); this.trail.setMachineLine(this.stateLine(false, false, 0)); },
    }, {
      tiles: GW_JAM_TILES,
      badges: { jmRepeat: { min: JM_REPEAT_MIN, max: JM_REPEAT_MAX, def: 3, aria: 'How many times the loop repeats: 2, 3, or 4' } },
      loopCmds: ['jmRepeat'],
    });

    this.showMissionBrief(m);
  }

  private renderBanner(): void {
    this.banner.innerHTML = '';
    const head = el('div', 'gw-mb-head', this.banner);
    el('span', 'gw-mb-emoji', head, this.level.emoji);
    el('span', 'gw-mb-title', head, `Mission ${this.mission.n}/6 · ${this.mission.title}`);
    const pips = el('div', 'gw-mb-pips', this.banner);
    this.level.missions.forEach((_, i) => {
      const cls = i < this.missionIdx ? 'done' : i === this.missionIdx ? 'current' : '';
      el('span', `gw-mb-pip ${cls}`, pips);
    });
    el('div', 'gw-mb-goal', this.banner, this.mission.goalText);
  }

  private showMissionBrief(m: JamMission): void {
    const scrim = el('div', 'dialog-scrim', this.ui);
    const d = el('div', 'dialog', scrim);
    d.setAttribute('role', 'dialog');
    d.setAttribute('aria-modal', 'true');
    el('div', 'intro-emoji', d, this.level.emoji);
    el('h2', undefined, d, `Mission ${m.n}: ${m.title}`);
    el('p', undefined, d, m.brief);
    const go = el('button', 'mini-btn', d, m.n === 1 ? "🔧 Let's build!" : '🔧 Next mission!');
    go.addEventListener('click', () => { sharedSfx.play('bop'); scrim.remove(); });
    go.focus();
  }

  private showMissionComplete(next: () => void): void {
    const scrim = el('div', 'dialog-scrim', this.ui);
    const d = el('div', 'dialog', scrim);
    d.setAttribute('role', 'dialog');
    d.setAttribute('aria-modal', 'true');
    el('div', 'intro-emoji', d, '✅');
    el('h2', undefined, d, `Mission ${this.mission.n} complete!`);
    el('p', undefined, d, this.missionIdx === 4
      ? 'The loop did all three! One mission to go — the whole machine!'
      : 'Nice work — a new tile is unlocked for the next mission!');
    const go = el('button', 'mini-btn', d, '➜ Keep Going');
    go.addEventListener('click', () => { sharedSfx.play('tap'); scrim.remove(); next(); });
    go.focus();
    sharedSfx.play('star');
  }

  // ---------- run + playback ----------

  private async onBop(): Promise<void> {
    if (this.running || !this.deck) return;
    this.running = true;
    this.deck.setRunning(true);
    this.rig.reset();
    this.zip.setMood('thinking');

    const program = this.deck.getProgram() as GjStep[];
    const result = runJam(program);
    const stepMs = this.calm ? 340 : STEP_MS;
    const steps: ThinkTrailStep[] = [];
    let motor = false, belt = false, jam = 0, activeLoop = -1;

    for (const ev of result.events) {
      if (ev.type === 'done') continue;
      if (ev.type === 'commandStart') {
        this.deck.highlightSlot(ev.index);
        await this.delay(stepMs * 0.28);
        continue;
      }
      switch (ev.type) {
        case 'motorOn': this.rig.setMotor(true); motor = true; sharedSfx.play('bop'); break;
        case 'motorOff': this.rig.setMotor(false); motor = false; belt = false; sharedSfx.play('drop'); break;
        case 'conveyorOn': this.rig.setConveyor(true); belt = true; sharedSfx.play('loop'); break;
        case 'conveyorOff': this.rig.setConveyor(false); belt = false; sharedSfx.play('remove'); break;
        case 'conveyorNoPower': sharedSfx.play('bump'); break;
        case 'berryArrive': this.rig.berryArrive(); sharedSfx.play('predictRight'); break;
        case 'waitStuck': sharedSfx.play('remove'); break;
        case 'pressed': jam = ev.jam; this.rig.lower(); this.rig.addJam(ev.jam); sharedSfx.play('grab'); break;
        case 'pressMiss': sharedSfx.play('bump'); break;
        case 'pressUp': this.rig.raise(); sharedSfx.play('place'); break;
        case 'pressUpEmpty': break;
        case 'loopStart': activeLoop = ev.index; this.deck.highlightSlot(ev.index); sharedSfx.play('loop'); break;
        case 'loopIter': this.deck.setIterBadge(ev.index, `${ev.iter}/${ev.count}`); break;
        case 'loopEnd': if (activeLoop >= 0) this.deck.setIterBadge(activeLoop, null); activeLoop = -1; break;
        case 'loopFail': sharedSfx.play('bump'); break;
        default: break;
      }
      const step = this.trailStepFor(ev, steps.length + 1, jam);
      if (step) { steps.push(step); this.trail.setSteps(steps.slice(-8)); }
      this.trail.setMachineLine(this.stateLine(motor, belt, jam));
      const beat = ev.type === 'berryArrive' ? 1.1 : ev.type === 'pressed' || ev.type === 'pressUp' ? 0.95 : ev.type === 'loopIter' ? 0.35 : 0.6;
      await this.delay(stepMs * beat);
    }
    this.deck.highlightSlot(-1);
    this.deck.setRunning(false);
    this.running = false;

    if (jamGoalMet(this.mission.goal, result)) {
      if (this.isLastMission) this.finishLevel(program);
      else { void this.zip.celebrate(); this.showMissionComplete(() => this.startMission(this.missionIdx + 1)); }
    } else {
      void this.mixy.glitchWobble(0.8);
      this.mixy.flashMood('surprised', 1600);
      sharedSfx.play('glitch');
      this.trail.setSteps(
        [...steps.slice(-5), ...jamMisses(this.mission.goal, result).map((mm, i) => ({ n: i + 1, icon: '🔍', text: mm, verdict: 'no' as const }))],
        this.mission.brief,
      );
      this.toast('🛠️ Almost! Check the Think Trail, fix your plan, and BOP again!');
    }
  }

  private finishLevel(program: GjStep[]): void {
    const stars = jamFinalStars(this.level, program);
    const starNames = ['It works — 3 jars of jam!'];
    if (stars >= 2) starNames.push('Clever — you looped it!');
    if (stars >= 3) starNames.push('SAFE — a clean shutdown!');
    const prev = this.events.store.stars[this.level.id] ?? 0;
    this.events.store.setStars(this.level.id, Math.max(prev, stars));
    this.events.store.recordRun(this.level.id, Math.max(prev, stars), this.level.shortTitle, this.deck?.peekSteps() ?? []);
    this.topBar.setStars(Math.max(prev, stars));
    void this.zip.celebrate();
    sharedSfx.play('celebrate');
    showCelebration(this.ui, { stars, starNames, predictedCorrectly: null, peek: peekForLevel(this.level.id, this.level.shortTitle, this.deck?.peekSteps() ?? []) }, sharedSfx, {
      onReplay: () => this.startMission(this.level.missions.length - 1),
      onContinue: () => (this.events.hasNext && this.events.onNext ? this.events.onNext() : this.events.onExit()),
    });
    if (stars < 3) {
      this.toast('🌟 For the last star: shut the machine down safely — STOP the belt and motor at the end!');
    }
  }

  private trailStepFor(ev: GjEvent, n: number, jam: number): ThinkTrailStep | null {
    switch (ev.type) {
      case 'motorOn': return { n, icon: '⚡', text: 'Motor ON — power!', verdict: 'ok' };
      case 'motorOff': return { n, icon: '🛑', text: 'Motor OFF — safe!', verdict: 'ok' };
      case 'motorNoop': return { n, icon: '💭', text: ev.on ? 'Motor was already on.' : 'Motor was already off.' };
      case 'conveyorOn': return { n, icon: '🛤️', text: 'Belt running — berries incoming!', verdict: 'ok' };
      case 'conveyorOff': return { n, icon: '⏹️', text: 'Belt stopped.', verdict: 'ok' };
      case 'conveyorNoPower': return { n, icon: '🔌', text: 'The belt has no power — start the motor first!', verdict: 'no' };
      case 'berryArrive': return { n, icon: '🍓', text: 'A strawberry reached the press!', verdict: 'ok' };
      case 'waitStuck': return { n, icon: '😴', text: ev.reason === 'noPower' ? 'Waiting… but the belt is not running.' : 'Waiting… no berries left.', verdict: 'no' };
      case 'pressed': return { n, icon: '🍯', text: `Squish! Jar ${jam} of jam!`, verdict: 'ok' };
      case 'pressMiss': return { n, icon: '😅', text: ev.reason === 'noBerry' ? 'The press hit nothing — wait for a berry!' : ev.reason === 'down' ? 'The press was already down!' : 'No power to press!', verdict: 'no' };
      case 'pressUp': return { n, icon: '⬆️', text: 'Press up — the jar rolls away!', verdict: 'ok' };
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
