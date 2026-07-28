/**
 * Gearworks paint screen — Phase 16: Paint Parade (nested loops).
 *
 * STAMP a dot, STEP along, REPEAT ROW makes a line; NEW ROW drops down
 * and REPEAT PARADE repeats the whole design — a loop inside a loop. A
 * DOM "make this" grid mirrors the 3-D easel so the pattern fills in
 * both places as the nested loop runs.
 */
import { Stage } from '../engine/stage';
import { CAMERA_PRESETS } from '../rendering/gearworks/cameraPresets';
import { GarageScene } from '../rendering/gearworks/garageScene';
import { PaintRig } from '../rendering/gearworks/paintRig';
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
import type { GearworksPaintLevel } from '../data/gearworks/levels';
import { paintGoalOf, paintStars } from '../data/gearworks/levels';
import { GW_PAINT_TILES } from '../data/gearworks/world';
import {
  runPaint, paintMisses, PpStep, PpEvent, PP_PALETTE, PP_REPEAT_MIN, PP_REPEAT_MAX, cellKey,
} from '../gameplay/gearworks/paintMachine';
import { peekForLevel } from '../ui/codePeek';

const STEP_MS = 300;

export class GearworksPaintScreen {
  private stage!: Stage;
  private scene!: GarageScene;
  private rig!: PaintRig;
  private zip!: SpriteCharacter;
  private mixy!: SpriteCharacter;
  private trail!: ThinkTrailPanel;
  private deck!: MachineDeck<PpStep['cmd']>;
  private topBar!: TopBar;
  private charLayer!: HTMLElement;
  private ui!: HTMLElement;
  private board!: HTMLElement;
  private cellEls = new Map<string, HTMLElement>();
  private disposers: Array<() => void> = [];
  private running = false;
  private calm = false;
  private curRow = 0;

  constructor(
    private readonly root: HTMLElement,
    private readonly level: GearworksPaintLevel,
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
    this.stage.setSky('#171b46', 40, 100);
    this.scene = new GarageScene('motorLab');
    this.stage.scene.add(this.scene.group);
    // 1.22 = fill 22% more of the frame. A workbench is a small
    // object in a big room, so fitting it the way a whole board is
    // fitted left it looking like something across the garage rather
    // than something you are standing at.
    this.stage.frameArea(this.scene.frameCenter(), this.scene.frameCorners(), 1.22);

    this.rig = new PaintRig(this.level.cols, this.level.rows);
    this.rig.group.scale.setScalar(0.62);
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
    this.trail.setMachineLine(this.statusLine(0));

    this.buildBoard();

    this.deck = new MachineDeck<PpStep['cmd']>(this.ui, this.level.commands, this.level.maxSlots, {
      onChange: () => { /* live plan */ },
      onBop: () => void this.onBop(),
      onClear: () => this.resetBoard(),
    }, {
      tiles: GW_PAINT_TILES,
      badges: {
        ppRepeatRow: { min: PP_REPEAT_MIN, max: PP_REPEAT_MAX, def: PP_REPEAT_MIN, aria: 'Change how many dots in the row: 2, 3 or 4' },
        ppRepeatParade: { min: PP_REPEAT_MIN, max: PP_REPEAT_MAX, def: PP_REPEAT_MIN, aria: 'Change how many rows in the parade: 2, 3 or 4' },
      },
      loopCmds: ['ppRepeatRow', 'ppRepeatParade'],
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


  private statusLine(painted: number): string {
    return `🎨 Dots: ${painted}/${this.level.cols * this.level.rows}`;
  }

  // ---------- target board (make this!) ----------

  private buildBoard(): void {
    this.board = el('div', 'gw-paint-board', this.ui);
    this.board.setAttribute('aria-label', 'Banner to paint');
    el('div', 'pb-title', this.board, 'MAKE THIS');
    const grid = el('div', 'pb-grid', this.board);
    grid.style.setProperty('--cols', String(this.level.cols));
    for (let r = 0; r < this.level.rows; r++) {
      for (let c = 0; c < this.level.cols; c++) {
        const cell = el('span', 'pb-cell', grid);
        cell.dataset.k = cellKey(c, r);
        this.cellEls.set(cellKey(c, r), cell);
      }
    }
  }

  private resetBoardCells(): void {
    for (const cell of this.cellEls.values()) {
      cell.classList.remove('on');
      cell.style.removeProperty('--dot');
    }
  }

  private resetBoard(): void {
    this.rig.reset();
    this.resetBoardCells();
    this.curRow = 0;
    this.trail.setEmpty();
    this.trail.setMachineLine(this.statusLine(0));
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
    this.rig.reset();
    this.resetBoardCells();
    this.curRow = 0;
    this.zip.setMood('thinking');
    const program = this.deck.getProgram() as PpStep[];
    const goal = paintGoalOf(this.level);
    const result = runPaint(program, goal);
    const stepMs = this.calm ? STEP_MS * 0.6 : STEP_MS;
    const steps: ThinkTrailStep[] = [];
    let painted = 0;

    for (const ev of result.events) {
      if (ev.type === 'done') continue;
      this.deck.highlightSlot(ev.source);
      const trailStep = this.applyEvent(ev, () => painted, (n) => { painted = n; });
      if (trailStep) { steps.push(trailStep); this.trail.setSteps(steps.slice(-7)); }
      this.trail.setMachineLine(this.statusLine(painted));
      const beat = ev.type === 'stamp' ? 0.9 : ev.type === 'newRow' ? 0.8 : 0.45;
      await this.delay(stepMs * beat);
    }

    this.deck.highlightSlot(-1);
    this.deck.setRunning(false);
    this.running = false;
    this.stage.zoomTo(1.22, 0.5);

    if (result.success) {
      this.celebrate(program);
      if (!(result.usedRowLoop && result.usedParadeLoop)) {
        this.toast(result.usedRowLoop || result.usedParadeLoop
          ? '💡 Nice! Now nest them — a REPEAT PARADE around your row loop paints it all!'
          : '💡 That works! Try REPEAT ROW to make a line, then REPEAT PARADE to stack the rows!');
      }
    } else {
      this.coach(paintMisses(program, goal), steps);
    }
  }

  private applyEvent(ev: PpEvent, getPainted: () => number, setPainted: (n: number) => void): ThinkTrailStep | null {
    const n = getPainted() + 1;
    switch (ev.type) {
      case 'stamp': {
        const hex = PP_PALETTE[ev.colorIndex];
        this.rig.paintCell(ev.col, ev.row, hex);
        this.rig.moveBrush(ev.col, ev.row);
        const cell = this.cellEls.get(cellKey(ev.col, ev.row));
        if (cell && !cell.classList.contains('on')) {
          cell.classList.add('on');
          cell.style.setProperty('--dot', hex);
          setPainted(getPainted() + 1);
        }
        sharedSfx.play('place');
        return { n, icon: '🎨', text: `Stamped a dot at row ${ev.row + 1}, spot ${ev.col + 1}`, verdict: 'ok' };
      }
      case 'strayStamp':
        sharedSfx.play('bump');
        return { n, icon: '🔍', text: 'A dot went off the banner — the loop counted too high!', verdict: 'no' };
      case 'step':
        this.rig.moveBrush(ev.col, this.curRow);
        sharedSfx.play('tap');
        return null;
      case 'newRow':
        this.curRow = ev.row;
        this.rig.moveBrush(0, ev.row);
        sharedSfx.play('hop');
        return { n, icon: '↩️', text: `New row — down to row ${ev.row + 1}`, verdict: 'ok' };
      default:
        return null;
    }
  }

  private celebrate(program: readonly PpStep[]): void {
    const r = runPaint(program, paintGoalOf(this.level));
    const stars = paintStars(this.level, program);
    const starNames = ['The banner is full!'];
    if (r.usedRowLoop || r.usedParadeLoop) starNames.push('Clever — you used a loop!');
    if (r.usedRowLoop && r.usedParadeLoop) starNames.push(`Creative: ${this.level.bonus.text}!`);
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
      onReplay: () => this.resetBoard(),
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
    this.toast('🛠️ Almost! Check the banner, fix your loops, and BOP again!');
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
