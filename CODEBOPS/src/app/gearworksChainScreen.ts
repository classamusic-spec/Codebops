/**
 * Gearworks chain screen — Phase 3: the child BUILDS the machine.
 *
 * Gear Train / Belt Builder levels: tap glowing anchors on the bench to
 * snap gears in, tap the dashed slot to stretch a belt, then BOP the
 * motor. Power (and spin direction — the curriculum) travels node by
 * node down the chain while the Think Trail explains each hand-off:
 * meshed teeth FLIP the direction, belts KEEP it. Power stopping at a
 * gap is a first-class beat (spark + coaching), and testing an
 * unfinished machine on purpose earns the creative star.
 *
 * Stars: works (bell rings) / clever (direction prediction right) /
 * creative (tested the machine before it was finished).
 */
import * as THREE from 'three';
import { Stage } from '../engine/stage';
import { CAMERA_PRESETS } from '../rendering/gearworks/cameraPresets';
import { GarageScene } from '../rendering/gearworks/garageScene';
import { ChainRig } from '../rendering/gearworks/chainRig';
import { SpriteCharacter } from '../rendering/spriteCharacter';
import { TopBar } from '../ui/topBar';
import { GoalCard } from '../ui/goalCard';
import { ThinkTrailPanel, ThinkTrailStep } from '../ui/gearworks/statePanel';
import { PartsShelf } from '../ui/gearworks/partsShelf';
import { showBrief, showCelebration, showPrediction, showSettings } from '../ui/dialogs';
import { sharedSfx } from '../audio/sfx';
import { SaveStore } from '../storage/saveStore';
import { el } from '../ui/dom';
import type { GearworksChainLevel } from '../data/gearworks/levels';
import { chainPredictionChoices } from '../data/gearworks/levels';
import {
  ChainPlacement, chainComplete, chainMisses, emptyPlacement, neededPieces,
  propagate, withBelt, withGear,
} from '../gameplay/gearworks/gearChain';

const NODE_MS = 700;

export class GearworksChainScreen {
  private stage!: Stage;
  private scene!: GarageScene;
  private rig!: ChainRig;
  private zip!: SpriteCharacter;
  private mixy!: SpriteCharacter;
  private trail!: ThinkTrailPanel;
  private shelf!: PartsShelf;
  private topBar!: TopBar;
  private charLayer!: HTMLElement;
  private ui!: HTMLElement;
  private disposers: Array<() => void> = [];
  private placement!: ChainPlacement;
  private running = false;
  private calm = false;
  /** Creative star: the child BOPped an unfinished machine and saw why. */
  private testedEarly = false;
  private predicted: boolean | null = null;

  constructor(
    private readonly root: HTMLElement,
    private readonly level: GearworksChainLevel,
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

    this.rig = new ChainRig(this.level.chain);
    this.rig.group.position.copy(this.scene.benchAnchor());
    this.stage.scene.add(this.rig.group);
    this.placement = emptyPlacement(this.level.chain);
    this.rig.setPlacement(this.placement);
    this.rig.setFlow(null);

    // --- tap-to-build: raycast ghosts/slots, toggle placement ---
    const ray = new THREE.Raycaster();
    const tap = (e: PointerEvent): void => {
      if (this.running) return;
      const r = wrap.getBoundingClientRect();
      const p = new THREE.Vector2(
        ((e.clientX - r.left) / r.width) * 2 - 1,
        -((e.clientY - r.top) / r.height) * 2 + 1,
      );
      ray.setFromCamera(p, this.stage.camera);
      const hits = ray.intersectObjects(this.rig.tapTargets(), true);
      if (hits.length === 0) return;
      const data = hits[0].object.userData;
      if (typeof data.gwNode === 'number') this.toggleGear(data.gwNode);
      else if (typeof data.gwBelt === 'number') this.toggleBelt(data.gwBelt);
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
    this.trail.setMachineLine(this.buildLine());

    this.shelf = new PartsShelf(this.ui, neededPieces(this.level.chain), {
      onBop: () => void this.onBop(),
      onReset: () => this.resetBuild(),
    });
    this.refreshShelf();

    // --- animation loop ---
    this.applySettings();
    this.disposers.push(this.stage.onTick((dt, elapsed) => {
      if (!this.calm) this.scene.update(dt, elapsed);
      this.rig.update(dt, elapsed);
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

  // ---------- building ----------

  private toggleGear(node: number): void {
    const placed = this.placement.gears[node];
    if (!placed && this.remaining().gears <= 0) return;
    this.placement = withGear(this.placement, node, !placed);
    sharedSfx.play(placed ? 'remove' : 'place');
    this.afterBuildChange();
  }

  private toggleBelt(link: number): void {
    const placed = this.placement.belts[link];
    if (!placed && this.remaining().belts <= 0) return;
    this.placement = withBelt(this.placement, link, !placed);
    sharedSfx.play(placed ? 'remove' : 'place');
    this.afterBuildChange();
  }

  private afterBuildChange(): void {
    this.rig.setPlacement(this.placement);
    this.rig.setFlow(null);
    this.rig.setMotorOn(false);
    this.rig.hideSpark();
    this.refreshShelf();
    this.trail.setMachineLine(this.buildLine());
    if (chainComplete(this.level.chain, this.placement)) {
      this.zip.flashMood('excited', 1200);
      this.toast('✨ The machine looks ready — BOP it!');
    }
  }

  private remaining(): { gears: number; belts: number } {
    const need = neededPieces(this.level.chain);
    const placedGears = this.level.chain.nodes.filter((n, i) => !n.fixed && this.placement.gears[i]).length;
    const placedBelts = this.placement.belts.filter(Boolean).length;
    return { gears: need.gears - placedGears, belts: need.belts - placedBelts };
  }

  private refreshShelf(): void {
    this.shelf.setRemaining(this.remaining());
  }

  private buildLine(): string {
    const r = this.remaining();
    if (r.gears === 0 && r.belts === 0) return 'Machine: ready to test! 🔧✅';
    const parts: string[] = [];
    if (r.gears > 0) parts.push(`${r.gears} gear${r.gears === 1 ? '' : 's'}`);
    if (r.belts > 0) parts.push(`${r.belts} belt${r.belts === 1 ? '' : 's'}`);
    return `Machine: needs ${parts.join(' + ')}`;
  }

  private resetBuild(): void {
    this.placement = emptyPlacement(this.level.chain);
    this.afterBuildChange();
    this.trail.setEmpty();
    this.trail.setMachineLine(this.buildLine());
  }

  // ---------- run ----------

  private async onBop(): Promise<void> {
    if (this.running) return;
    const complete = chainComplete(this.level.chain, this.placement);

    // First complete run: direction quiz → the clever star.
    if (complete && this.predicted === null) {
      const { predictedSuccess } = await showPrediction(
        this.ui,
        { prediction: { prompt: this.level.prediction.prompt, choices: chainPredictionChoices(this.level) } },
        sharedSfx,
      );
      this.predicted = predictedSuccess;
      sharedSfx.play(predictedSuccess ? 'predictRight' : 'predictWrong');
    }

    this.running = true;
    this.shelf.setRunning(true);
    this.rig.hideSpark();
    this.zip.setMood('thinking');

    const flow = propagate(this.level.chain, this.placement, true);
    const nodeMs = this.calm ? 420 : NODE_MS;
    const steps: ThinkTrailStep[] = [];

    // Motor wakes up…
    this.rig.setMotorOn(true);
    sharedSfx.play('bop');
    await this.delay(nodeMs * 0.6);

    // …then power walks the chain, one hand-off at a time.
    const lit = flow.turning.filter(Boolean).length;
    for (let count = 1; count <= lit; count++) {
      this.rig.partialFlow(flow, count);
      const i = count - 1;
      steps.push(this.handOffStep(i, flow.dirs[i] === 'ccw'));
      this.trail.setSteps(steps);
      sharedSfx.play(i === 0 ? 'loop' : this.level.chain.links[i - 1] === 'mesh' ? 'tap' : 'place');
      await this.delay(nodeMs);
    }

    if (flow.reachesTarget) {
      this.rig.ringBell();
      sharedSfx.play('celebrate');
      steps.push({ n: steps.length + 1, icon: '🔔', text: `Power made it — ${this.level.targetName} RINGS!`, verdict: 'ok' });
      this.trail.setSteps(steps);
      await this.delay(nodeMs * 1.4);
      this.rig.setMotorOn(false);
      this.rig.setFlow(null);
      this.finishSuccess();
    } else {
      // Power stops — spark it, explain it, coach it. Never punitive.
      if (flow.firstBrokenLink >= 0) this.rig.showBreakSpark(flow.firstBrokenLink);
      sharedSfx.play('glitch');
      void this.mixy.glitchWobble(0.8);
      this.mixy.flashMood('surprised', 1600);
      if (!complete) this.testedEarly = true;
      const misses = chainMisses(this.level.chain, this.placement);
      this.trail.setSteps(
        [...steps, ...misses.map((m, i) => ({ n: steps.length + i + 1, icon: '🔍', text: m, verdict: 'no' as const }))],
        this.level.coachHint,
      );
      await this.delay(nodeMs * 1.2);
      this.rig.setMotorOn(false);
      this.rig.setFlow(null);
      this.toast(complete
        ? '🛠️ Hmm! Check the Think Trail and BOP again!'
        : '🔍 See where the power stops? Finish the chain and BOP again!');
      this.running = false;
      this.shelf.setRunning(false);
    }
  }

  private handOffStep(node: number, ccw: boolean): ThinkTrailStep {
    const n = node + 1;
    const dirIcon = ccw ? '⟲' : '⟳';
    if (node === 0) return { n, icon: '⚡', text: `Motor gear spins ${dirIcon}`, verdict: 'ok' };
    const viaBelt = this.level.chain.links[node - 1] === 'beltSlot';
    const isTarget = node === this.level.chain.nodes.length - 1;
    const who = isTarget ? 'the bell gear' : `wheel ${n}`;
    return viaBelt
      ? { n, icon: '🔗', text: `The belt keeps ${who} spinning the SAME way ${dirIcon}`, verdict: 'ok' }
      : { n, icon: '⚙️', text: `Teeth push ${who} the OTHER way ${dirIcon}`, verdict: 'ok' };
  }

  private finishSuccess(): void {
    this.running = false;
    this.shelf.setRunning(false);
    const stars = 1 + (this.predicted === true ? 1 : 0) + (this.testedEarly ? 1 : 0);
    this.events.store.setStars(this.level.id, stars);
    this.topBar.setStars(stars);
    void this.zip.celebrate();
    showCelebration(this.ui, {
      stars,
      starNames: ['It works!', 'Great prediction!', `Creative: ${this.level.bonusText}!`],
      predictedCorrectly: this.predicted,
    }, sharedSfx, {
      onReplay: () => { this.predicted = null; this.resetBuild(); },
      onContinue: () => (this.events.hasNext && this.events.onNext ? this.events.onNext() : this.events.onExit()),
    });
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
