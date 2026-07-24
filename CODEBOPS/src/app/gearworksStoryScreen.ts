/**
 * Gearworks story screen — Phase 17: Story Studio (state machines).
 *
 * The actor is always in ONE scene. Each event tile only moves it if a
 * transition leaves the current scene — the same tile can do different
 * things, or nothing. A DOM STATE MAP shows every scene, the target, and
 * where the actor is right now while the 3-D actor changes face + colour.
 */
import { Stage } from '../engine/stage';
import { CAMERA_PRESETS } from '../rendering/gearworks/cameraPresets';
import { GarageScene } from '../rendering/gearworks/garageScene';
import { StoryRig } from '../rendering/gearworks/storyRig';
import { SpriteCharacter } from '../rendering/spriteCharacter';
import { TopBar } from '../ui/topBar';
import { GoalCard } from '../ui/goalCard';
import { ThinkTrailPanel, ThinkTrailStep } from '../ui/gearworks/statePanel';
import { MachineDeck } from '../ui/gearworks/machineDeck';
import { showBrief, showCelebration, showSettings } from '../ui/dialogs';
import { sharedSfx } from '../audio/sfx';
import { SaveStore } from '../storage/saveStore';
import { el } from '../ui/dom';
import type { GearworksStoryLevel, StoryStateDef } from '../data/gearworks/levels';
import { storyDef, storyStateLabel, storyStars } from '../data/gearworks/levels';
import { GW_STORY_TILES } from '../data/gearworks/world';
import {
  runStory, storyMisses, takenPath, StoryStep, StoryEvent,
} from '../gameplay/gearworks/storyMachine';

const STEP_MS = 720;

export class GearworksStoryScreen {
  private stage!: Stage;
  private scene!: GarageScene;
  private rig!: StoryRig;
  private zip!: SpriteCharacter;
  private mixy!: SpriteCharacter;
  private trail!: ThinkTrailPanel;
  private deck!: MachineDeck<StoryStep['cmd']>;
  private topBar!: TopBar;
  private charLayer!: HTMLElement;
  private ui!: HTMLElement;
  private stateMap!: HTMLElement;
  private stateChips = new Map<string, HTMLElement>();
  private disposers: Array<() => void> = [];
  private running = false;
  private calm = false;
  /** Distinct winning transition-paths this sitting — 2+ earns creative. */
  private winningPaths = new Set<string>();

  constructor(
    private readonly root: HTMLElement,
    private readonly level: GearworksStoryLevel,
    private readonly events: {
      onExit: () => void;
      onNext?: () => void;
      hasNext: boolean;
      store: SaveStore;
    },
  ) {}

  private stateOf(id: string): StoryStateDef {
    return this.level.states.find((s) => s.id === id) ?? this.level.states[0];
  }

  enter(): void {
    const wrap = el('div', '', this.root);
    wrap.id = 'world-canvas-wrap';
    this.charLayer = el('div', '', this.root);
    this.charLayer.id = 'char-layer';
    this.ui = el('div', 'ui-layer', this.root);

    const preset = CAMERA_PRESETS.bench;
    this.stage = new Stage(wrap, { viewDir: preset.viewDir, fovFor: preset.fovFor, indoor: true });
    this.stage.setSky('#1a1140', 40, 100);
    this.scene = new GarageScene('motorLab');
    this.stage.scene.add(this.scene.group);
    this.stage.frameArea(this.scene.frameCenter(), this.scene.frameCorners());

    this.rig = new StoryRig();
    this.rig.group.scale.setScalar(0.62);
    this.rig.group.position.copy(this.scene.benchAnchor());
    this.stage.scene.add(this.rig.group);
    const s0 = this.stateOf(this.level.start);
    this.rig.reset(s0.emoji, s0.color);

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
    this.trail.setMachineLine(this.statusLine(this.level.start));

    this.buildStateMap();

    this.deck = new MachineDeck<StoryStep['cmd']>(this.ui, this.level.commands, this.level.maxSlots, {
      onChange: () => { /* live plan */ },
      onBop: () => void this.onBop(),
      onClear: () => this.resetStory(),
    }, {
      tiles: GW_STORY_TILES,
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

  private statusLine(state: string): string {
    return `🎭 ${this.level.actorName} is ${storyStateLabel(this.level, state)} · Goal: ${storyStateLabel(this.level, this.level.target)}`;
  }

  // ---------- state map ----------

  private buildStateMap(): void {
    this.stateMap = el('div', 'gw-state-map', this.ui);
    this.stateMap.setAttribute('aria-label', 'Story scenes');
    el('div', 'sm-title', this.stateMap, 'SCENES');
    const row = el('div', 'sm-row', this.stateMap);
    for (const st of this.level.states) {
      const chip = el('div', 'sm-chip', row);
      chip.style.setProperty('--scene', st.color);
      if (st.id === this.level.target) chip.classList.add('target');
      el('span', 'sm-emoji', chip, st.emoji);
      el('span', 'sm-label', chip, st.label);
      if (st.id === this.level.target) el('span', 'sm-flag', chip, '🎯');
      this.stateChips.set(st.id, chip);
    }
    this.markCurrent(this.level.start);
  }

  private markCurrent(state: string): void {
    this.stateChips.forEach((chip, id) => chip.classList.toggle('here', id === state));
  }

  private resetStateMap(): void {
    this.stateChips.forEach((chip) => chip.classList.remove('here', 'visited'));
    this.markCurrent(this.level.start);
  }

  private resetStory(): void {
    const s0 = this.stateOf(this.level.start);
    this.rig.reset(s0.emoji, s0.color);
    this.resetStateMap();
    this.trail.setEmpty();
    this.trail.setMachineLine(this.statusLine(this.level.start));
  }

  // ---------- run + playback ----------

  private async onBop(): Promise<void> {
    if (this.running) return;
    this.running = true;
    this.deck.setRunning(true);
    this.resetStateMap();
    const s0 = this.stateOf(this.level.start);
    this.rig.reset(s0.emoji, s0.color);
    this.zip.setMood('thinking');
    const program = this.deck.getProgram() as StoryStep[];
    const def = storyDef(this.level);
    const result = runStory(program, def);
    const stepMs = this.calm ? STEP_MS * 0.6 : STEP_MS;
    const steps: ThinkTrailStep[] = [];

    for (const ev of result.events) {
      const trailStep = this.applyEvent(ev);
      if (trailStep) { steps.push(trailStep); this.trail.setSteps(steps.slice(-7)); }
      if (ev.type === 'transition' || ev.type === 'blocked') {
        this.deck.highlightSlot(ev.index);
        await this.delay(stepMs);
      } else {
        await this.delay(stepMs * 0.4);
      }
    }
    this.deck.highlightSlot(-1);
    this.deck.setRunning(false);
    this.running = false;

    if (result.finalState === this.level.target) {
      this.winningPaths.add(takenPath(program, def).join('>'));
      this.celebrate(program);
      if (this.winningPaths.size < 2) {
        this.toast(`💡 You did it! Now reach ${storyStateLabel(this.level, this.level.target)} a DIFFERENT way — ${this.level.bonus.text}!`);
      }
    } else {
      this.coach(storyMisses(program, def, this.level.target, (id) => storyStateLabel(this.level, id)), steps);
    }
  }

  private applyEvent(ev: StoryEvent): ThinkTrailStep | null {
    switch (ev.type) {
      case 'start': {
        this.markCurrent(ev.state);
        this.stateChips.get(ev.state)?.classList.add('visited');
        this.trail.setMachineLine(this.statusLine(ev.state));
        return null;
      }
      case 'transition': {
        const to = this.stateOf(ev.to);
        this.rig.setState(to.emoji, to.color);
        this.markCurrent(ev.to);
        this.stateChips.get(ev.to)?.classList.add('visited');
        this.trail.setMachineLine(this.statusLine(ev.to));
        sharedSfx.play('hop');
        return { n: ev.index + 1, icon: to.emoji, text: `${GW_STORY_TILES[ev.event].label} → now ${to.label}!`, verdict: 'ok' };
      }
      case 'blocked': {
        const chip = this.stateChips.get(ev.state);
        if (chip) { chip.classList.remove('shake'); void chip.offsetWidth; chip.classList.add('shake'); }
        void this.mixy.glitchWobble(0.4);
        sharedSfx.play('bump');
        return { n: ev.index + 1, icon: '🚫', text: `${GW_STORY_TILES[ev.event].label} doesn't work while ${storyStateLabel(this.level, ev.state)}`, verdict: 'no' };
      }
      default:
        return null;
    }
  }

  private celebrate(program: readonly StoryStep[]): void {
    const everBoth = this.winningPaths.size >= 2;
    const stars = storyStars(this.level, program, everBoth);
    const starNames = ['You told the story!'];
    if (program.length <= this.level.par && runStory(program, storyDef(this.level)).blockedCount === 0) starNames.push('Clever — a tidy story!');
    if (everBoth) starNames.push(`Creative: ${this.level.bonus.text}!`);
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
      onReplay: () => this.resetStory(),
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
    this.toast('🛠️ Almost! Watch which scene the actor is in — some events only work from the right scene!');
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
