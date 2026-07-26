/**
 * Gearworks sorter screen — Phase 6: conditions and sorting.
 *
 * The child's plan is a RULE that runs again for every item in the
 * batch. Branch highlighting is everywhere: the guard tile lights as it
 * checks, a failed guard greys out the tile it skips (skip-flash), and
 * the Think Trail says why ("blue berry → not red, skip Send Left").
 *
 * Creative stars:
 *  Sensor Sorter — the ELSE trick: sort perfectly with ≤3 tiles, the
 *  trailing unguarded send catching everything the guard let through.
 *  Conveyor Factory — the MEGA batch: after winning the standard batch,
 *  the same rule must survive a 7-item shipment.
 */
import { Stage } from '../engine/stage';
import { CAMERA_PRESETS } from '../rendering/gearworks/cameraPresets';
import { GarageScene } from '../rendering/gearworks/garageScene';
import { SorterRig } from '../rendering/gearworks/sorterRig';
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
import type { GearworksSorterLevel } from '../data/gearworks/levels';
import { GW_SORTER_TILES } from '../data/gearworks/world';
import {
  runSorter, sorterMisses, itemName, GtStep, SortItem,
} from '../gameplay/gearworks/sorterMachine';
import { peekForLevel } from '../ui/codePeek';

const STEP_MS = 560;

export class GearworksSorterScreen {
  private stage!: Stage;
  private scene!: GarageScene;
  private rig!: SorterRig;
  private zip!: SpriteCharacter;
  private mixy!: SpriteCharacter;
  private trail!: ThinkTrailPanel;
  private deck!: MachineDeck<GtStep['cmd']>;
  private topBar!: TopBar;
  private charLayer!: HTMLElement;
  private ui!: HTMLElement;
  private disposers: Array<() => void> = [];
  private running = false;
  private calm = false;
  private everPar = false;
  private everBonus = false;
  /** megaBatch levels: standard batch won → next runs sort the mega one. */
  private useMega = false;

  constructor(
    private readonly root: HTMLElement,
    private readonly level: GearworksSorterLevel,
    private readonly events: {
      onExit: () => void;
      onNext?: () => void;
      hasNext: boolean;
      store: SaveStore;
    },
  ) {}

  private currentStream(): readonly SortItem[] {
    return this.useMega && this.level.megaStream ? this.level.megaStream : this.level.stream;
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
    // 1.22 = fill 22% more of the frame. A workbench is a small
    // object in a big room, so fitting it the way a whole board is
    // fitted left it looking like something across the garage rather
    // than something you are standing at.
    this.stage.frameArea(this.scene.frameCenter(), this.scene.frameCorners(), 1.22);

    this.rig = new SorterRig();
    this.rig.group.position.copy(this.scene.benchAnchor());
    this.stage.scene.add(this.rig.group);
    this.rig.enableUpBin(this.level.commands.includes('gtSendUp'));
    this.rig.setQueue(this.currentStream());

    // --- mascots ---
    this.zip = new SpriteCharacter(
      { who: 'zip', height: 2.35, name: 'zip' },
      this.charLayer, this.stage.camera, wrap,
    );
    this.zip.addToScene(this.stage.scene);
    this.zip.placeAt(this.scene.zipSpot());
    this.zip.look('right');
    this.addNameChip(this.zip, 'Zip');

    this.mixy = new SpriteCharacter(
      { who: 'mixy', height: 2.1, name: 'mixy' },
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
      // Same ? button as every other level. The bench levels are not
      // grids, so there is nothing to walk — but each one already
      // carries a coach hint written for the Think Trail, which is
      // exactly the nudge this wants.
      onHint: () => showHintCard(this.ui, sharedSfx, benchHints(this.level)),
    });
    this.topBar.setStars(this.events.store.stars[this.level.id] ?? 0);
    new GoalCard(this.ui, this.level.goalText, this.level.emoji);
    this.trail = new ThinkTrailPanel(this.ui);
    this.trail.setMachineLine(this.statusLine(0));

    this.deck = new MachineDeck<GtStep['cmd']>(this.ui, this.level.commands, this.level.maxSlots, {
      onChange: () => { /* live rule */ },
      onBop: () => void this.onBop(),
      onClear: () => this.resetMachine(),
    }, { tiles: GW_SORTER_TILES, initial: this.level.prefill?.map((s) => ({ ...s })) });

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

  private statusLine(done: number): string {
    const total = this.currentStream().length;
    const mega = this.useMega ? ' MEGA' : '';
    // Data counters: live bin tallies (three-bin Factory levels show all three)
    if (this.level.binLabels.up) {
      const c = this.rig.binCounts();
      const b = this.level.binLabels;
      return `${b.left} ${c.left} · ${b.right} ${c.right} · ${b.up} ${c.up} 🧺`;
    }
    return `Batch${mega}: ${done} of ${total} sorted 🧺`;
  }

  private resetMachine(): void {
    this.rig.reset();
    this.rig.setQueue(this.currentStream());
    this.trail.setEmpty();
    this.trail.setMachineLine(this.statusLine(0));
  }

  // ---------- run + playback ----------

  private async onBop(): Promise<void> {
    if (this.running) return;
    this.running = true;
    this.deck.setRunning(true);
    this.resetMachine();
    this.zip.setMood('thinking');
    this.rig.setBelt(true);

    const program = this.deck.getProgram() as GtStep[];
    const stream = this.currentStream();
    const result = runSorter(program, stream, this.level.rules);

    const stepMs = this.calm ? 340 : STEP_MS;
    const steps: ThinkTrailStep[] = [];
    let itemsDone = 0;
    let currentItem: SortItem | null = null;

    for (const ev of result.events) {
      if (ev.type === 'done') continue;
      switch (ev.type) {
        case 'itemEnter':
          currentItem = ev.item;
          this.rig.itemEnter(ev.item);
          sharedSfx.play('hop');
          steps.push({ n: steps.length + 1, icon: ev.item.color === 'red' ? '🔴' : '🔵', text: `Item ${ev.itemIndex + 1}: a ${itemName(ev.item)}!`, verdict: 'ok' });
          this.trail.setSteps(steps.slice(-7));
          await this.delay(stepMs * 1.5);
          break;
        case 'commandStart':
          this.deck.highlightSlot(ev.index);
          await this.delay(stepMs * 0.3);
          break;
        case 'guard': {
          sharedSfx.play(ev.holds ? 'predictRight' : 'remove');
          const what = ev.cond === 'gtIfRed' ? 'red' : ev.cond === 'gtIfBlue' ? 'blue' : ev.cond === 'gtIfRound' ? 'round' : 'square';
          steps.push({
            n: steps.length + 1, icon: ev.holds ? '✅' : '↷',
            text: ev.holds ? `It IS ${what} — do the next tile!` : `Not ${what} — skip the next tile.`,
          });
          this.trail.setSteps(steps.slice(-7));
          await this.delay(stepMs * 0.55);
          break;
        }
        case 'skipped':
          this.deck.flashSkip(ev.index);
          await this.delay(stepMs * 0.35);
          break;
        case 'send': {
          this.rig.send(ev.dir, ev.correct);
          sharedSfx.play(ev.correct ? 'grab' : 'glitch');
          const label = ev.dir === 'left' ? this.level.binLabels.left
            : ev.dir === 'right' ? this.level.binLabels.right
            : (this.level.binLabels.up ?? 'back');
          const icon = ev.dir === 'left' ? '⬅️' : ev.dir === 'right' ? '➡️' : '⬆️';
          steps.push({
            n: steps.length + 1, icon,
            text: ev.correct
              ? `${itemName(ev.item)} → ${label} basket!`
              : `Uh-oh — the ${itemName(ev.item)} landed in the ${label} basket!`,
            verdict: ev.correct ? 'ok' : 'no',
          });
          this.trail.setSteps(steps.slice(-7));
          if (this.level.binLabels.up) this.trail.setMachineLine(this.statusLine(itemsDone));
          await this.delay(stepMs * 1.3);
          break;
        }
        case 'alreadySorted':
          steps.push({ n: steps.length + 1, icon: '💭', text: 'Already sorted — the item is gone!' });
          this.trail.setSteps(steps.slice(-7));
          await this.delay(stepMs * 0.4);
          break;
        case 'itemPass': {
          this.rig.pass();
          sharedSfx.play(ev.correct ? 'place' : 'bump');
          steps.push({
            n: steps.length + 1, icon: '➡',
            text: ev.correct
              ? `The ${itemName(ev.item)} rides through to ${this.level.binLabels.pass} — just right!`
              : `The ${itemName(ev.item)} rode away un-sorted!`,
            verdict: ev.correct ? 'ok' : 'no',
          });
          this.trail.setSteps(steps.slice(-7));
          await this.delay(stepMs * 1.3);
          break;
        }
        case 'itemDone':
          this.rig.itemDone();
          itemsDone++;
          this.trail.setMachineLine(this.statusLine(itemsDone));
          this.deck.highlightSlot(-1);
          if (currentItem) await this.delay(stepMs * 0.4);
          break;
      }
    }
    this.rig.setBelt(false);

    this.deck.setRunning(false);
    this.running = false;

    if (result.allCorrect) {
      if (program.length <= this.level.par) this.everPar = true;
      const wasMega = this.useMega;
      if (this.level.bonus.kind === 'elseTrick') {
        if (program.length <= 3) this.everBonus = true;
      } else if (wasMega) {
        this.everBonus = true;
      }
      // Name only the EARNED stars, in earned order.
      const starNames = ['It works!'];
      if (this.everPar) starNames.push('Rule-smart and clever!');
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
        if (this.level.bonus.kind === 'elseTrick') {
          this.toast('💡 Shortcut: one IF and a bare send can sort it all — try 3 tiles!');
        } else if (this.level.megaStream) {
          this.useMega = true;
          this.toast('🏭 MEGA batch unlocked — BOP again and sort all 7!');
        }
      }
    } else {
      const misses = sorterMisses(program, stream, this.level.rules);
      void this.mixy.glitchWobble(0.8);
      this.mixy.flashMood('surprised', 1600);
      sharedSfx.play('glitch');
      this.trail.setSteps(
        [...steps.slice(-5), ...misses.map((m, i) => ({ n: i + 1, icon: '🔍', text: m, verdict: 'no' as const }))],
        this.level.coachHint,
      );
      this.toast('🛠️ Some items got mixed up! Check the Think Trail and BOP again!');
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
