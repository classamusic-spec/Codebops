/**
 * Game screen controller — wires the deterministic interpreter to the
 * dimensional world, the traced SVG characters, and the tablet UI.
 *
 * Multi-bot: Zip is always actor 0; Robot Town levels add Bolt (actor 1),
 * a hue-shifted robot CodeBop. Every interpreter event names its actor.
 */
import * as THREE from 'three';
import { Stage } from '../engine/stage';
import { SparkleMeadow, TILE_TOP } from '../rendering/sparkleMeadow';
import { BubbleBay } from '../rendering/bubbleBay';
import { PatternForest } from '../rendering/patternForest';
import { RobotTown } from '../rendering/robotTown';
import { AgentAcademy } from '../rendering/agentAcademy';
import { SpriteCharacter } from '../rendering/spriteCharacter';
import { PathPreview } from '../rendering/pathPreview';
import { TopBar } from '../ui/topBar';
import { GoalCard } from '../ui/goalCard';
import { ProgramDeck } from '../ui/programDeck';
import {
  showPrediction, showCelebration, showGlitchReplay, showSettings,
  showToast, showBrief, showFredDialog,
} from '../ui/dialogs';
import { sharedSfx } from '../audio/sfx';
import { SaveStore } from '../storage/saveStore';
import { assertLevelValid } from '../data/schemas/level';
import type { LevelDef } from '../data/schemas/level';
import { runProgram, ExecEvent, RunResult } from '../gameplay/commands/interpreter';
import type { ProgramStep } from '../gameplay/commands/interpreter';
import { el } from '../ui/dom';
import { wait } from '../rendering/tween';

type WorldEnv = SparkleMeadow | BubbleBay | PatternForest | RobotTown | AgentAcademy;

const ITEM_EMOJI: Record<string, string> = {
  strawberry: '🍓', pearl: '🦪', flower: '🌸', mushroom: '🍄', battery: '🔋', badge: '🎖️',
};
const BOT_NAMES = ['Zip', 'Bolt'];
const WORLD_SKY: Record<string, string> = {
  'sparkle-meadow': '#6fc7ff',
  'bubble-bay': '#5fd4f0',
  'pattern-forest': '#241b3d',
  'robot-town': '#1b2340',
  'agent-academy': '#ffb86b',
};

export class GameScreen {
  private stage!: Stage;
  private world!: WorldEnv;
  private zip!: SpriteCharacter;
  private bolt: SpriteCharacter | null = null;
  private mixy!: SpriteCharacter;
  private preview!: PathPreview;
  private deck!: ProgramDeck;
  private topBar!: TopBar;
  private charLayer!: HTMLElement;
  private readonly sfx = sharedSfx;
  private readonly store: SaveStore;
  private program: ProgramStep[] = [];
  private running = false;
  private predictedSuccess: boolean | null = null;
  private disposers: Array<() => void> = [];
  private playAccum = 0;
  /** Agent Academy: the active helper rule + BopLens state. */
  private selectedRule: { trigger: string; action: 'grab' } | null = null;
  private lensGroup: THREE.Group | null = null;
  private lensOn = false;
  private ruleCardEls: HTMLElement[] = [];
  private runHadRuleFire = false;

  constructor(
    private readonly root: HTMLElement,
    private readonly level: LevelDef,
    private readonly events: {
      onExit: () => void;
      onNextLevel: () => void;
      hasNext: boolean;
      /** Fired once when the level is completed (Daily Bop hooks in here). */
      onSuccess?: () => void;
      /** Shared save store — one instance app-wide so writes never clobber. */
      store?: SaveStore;
    },
  ) {
    this.store = events.store ?? new SaveStore();
    assertLevelValid(level);
  }

  private bot(i: number): SpriteCharacter {
    return i === 1 && this.bolt ? this.bolt : this.zip;
  }

  enter(): void {
    const wrap = el('div', '', this.root);
    wrap.id = 'world-canvas-wrap';
    this.charLayer = el('div', '', this.root);
    this.charLayer.id = 'char-layer';
    const ui = el('div', 'ui-layer', this.root);

    // --- 3D stage + world ---
    this.stage = new Stage(wrap);
    this.world =
      this.level.worldId === 'bubble-bay' ? new BubbleBay(this.level)
      : this.level.worldId === 'pattern-forest' ? new PatternForest(this.level)
      : this.level.worldId === 'robot-town' ? new RobotTown(this.level)
      : this.level.worldId === 'agent-academy' ? new AgentAcademy(this.level)
      : new SparkleMeadow(this.level);
    this.stage.scene.add(this.world.group);
    this.stage.setSky(WORLD_SKY[this.level.worldId] ?? '#6fc7ff');

    // --- characters (traced canon SVGs) ---
    this.zip = new SpriteCharacter(
      { svgUrl: './art/characters/zip/zip.svg', height: 1.78, name: 'zip' },
      this.charLayer, this.stage.camera, wrap,
    );
    this.zip.addToScene(this.stage.scene);
    const start = this.world.cellToWorld(this.level.start.col, this.level.start.row);
    this.zip.placeAt(start);

    if (this.level.botStart) {
      this.bolt = new SpriteCharacter(
        { svgUrl: './art/characters/zip/zip.svg', height: 1.62, name: 'bolt', extraClass: 'robot-bop' },
        this.charLayer, this.stage.camera, wrap,
      );
      this.bolt.addToScene(this.stage.scene);
      this.bolt.placeAt(this.world.cellToWorld(this.level.botStart.col, this.level.botStart.row));
    }

    this.mixy = new SpriteCharacter(
      { svgUrl: './art/characters/mixy/mixy.svg', height: 1.55, name: 'mixy', mixy: true },
      this.charLayer, this.stage.camera, wrap,
    );
    this.mixy.addToScene(this.stage.scene);
    this.mixy.placeAt(this.world.mixyLookout());
    this.mixy.look('left');

    // Keep the whole puzzle framed on every screen, from widescreen
    // monitors to portrait phones.
    {
      const l = this.level;
      const pad = 0.65;
      const framePts = [
        this.world.cellToWorld(-pad, -pad),
        this.world.cellToWorld(l.cols - 1 + pad, -pad),
        this.world.cellToWorld(-pad, l.rows - 1 + pad),
        this.world.cellToWorld(l.cols - 1 + pad, l.rows - 1 + pad),
      ];
      const center = this.world.cellToWorld((l.cols - 1) / 2, (l.rows - 1) / 2);
      center.y = 0.2;
      // GlitchBop watches from a perch off the grid. Pull the framing most
      // of the way toward that perch so the cast (and the scenery around
      // it) reads as part of the scene instead of being cropped away.
      const perch = this.world.mixyLookout().clone();
      perch.y = 0.2;
      framePts.push(center.clone().lerp(perch, 0.82));
      this.stage.frameArea(center, framePts);
    }

    this.preview = new PathPreview(this.world.group, this.world, this.level);

    // --- UI ---
    this.topBar = new TopBar(ui, `${this.level.title} · ${this.level.shortTitle}`, {
      onBack: this.events.onExit,
      onSettings: () => showSettings(ui, this.store, this.sfx, () => this.applySettings()),
    });
    this.topBar.setStars(this.store.stars[this.level.id] ?? 0);
    new GoalCard(ui, this.level.goalText, ITEM_EMOJI[this.level.items[0]?.kind ?? 'strawberry']);

    this.deck = new ProgramDeck(ui, this.level.availableCommands, this.level.maxSlots, {
      onProgramChange: (program) => {
        this.program = program;
        this.preview.update(program);
      },
      onBop: () => void this.onBop(ui),
      onRewind: () => this.rewind(),
    }, this.sfx);

    // --- Agent Academy: helper-rule bar + BopLens ---
    if (this.level.ruleChoices && this.level.ruleChoices.length > 0) {
      const bar = el('div', 'rule-bar', ui);
      el('span', 'rule-label', bar, '⚡ HELPER RULE');
      for (const choice of this.level.ruleChoices) {
        const card = el('button', 'rule-card', bar) as HTMLButtonElement;
        card.type = 'button';
        card.innerHTML = `WHEN ${ITEM_EMOJI[choice.trigger]} → ✋`;
        card.setAttribute('aria-label', `Rule: when you see a ${choice.trigger}, grab it`);
        card.addEventListener('click', () => {
          this.sfx.play('tap');
          this.selectedRule = this.selectedRule?.trigger === choice.trigger ? null : { ...choice };
          this.refreshRuleBar();
        });
        this.ruleCardEls.push(card);
      }
      const lens = el('button', 'rule-lens', bar, '🔍 BopLens') as HTMLButtonElement;
      lens.type = 'button';
      lens.addEventListener('click', () => {
        this.sfx.play('tap');
        this.lensOn = !this.lensOn;
        lens.classList.toggle('on', this.lensOn);
        this.refreshLens();
      });
      // First rule starts selected so kids see it fire immediately
      this.selectedRule = { ...this.level.ruleChoices[0] };
      this.refreshRuleBar();
    }

    // --- keyboard helpers (desktop testing + accessibility) ---
    // Arrow keys add tiles, Backspace undoes, Enter/Space presses BOP!
    const onKey = (ev: KeyboardEvent): void => {
      if (this.running) return;
      if (document.querySelector('.dialog-scrim')) return;
      const offers = (c: string) => this.level.availableCommands.includes(c as never);
      const keyCmd: Record<string, 'moveLeft' | 'moveRight' | 'moveUp' | 'moveDown'> = {
        ArrowLeft: 'moveLeft', ArrowRight: 'moveRight', ArrowUp: 'moveUp', ArrowDown: 'moveDown',
      };
      const cmd = keyCmd[ev.key];
      if (cmd && offers(cmd)) {
        ev.preventDefault();
        this.deck.addCommand(cmd);
        this.sfx.play('tap');
      } else if (ev.key === 'Backspace') {
        ev.preventDefault();
        this.deck.removeAt(this.program.length - 1);
      } else if ((ev.key === 'Enter' || ev.key === ' ') && this.program.length > 0) {
        ev.preventDefault();
        void this.onBop(ui);
      }
    };
    window.addEventListener('keydown', onKey);
    this.disposers.push(() => window.removeEventListener('keydown', onKey));

    // --- tick ---
    const offTick = this.stage.onTick((dt, elapsed) => {
      this.world.update(dt, elapsed);
      this.zip.update(dt, elapsed);
      this.bolt?.update(dt, elapsed);
      this.mixy.update(dt, elapsed);
      // BopLens rings breathe so trigger cells feel alive
      if (this.lensGroup) {
        const pulse = 1 + Math.sin(elapsed * 4) * 0.12;
        for (const child of this.lensGroup.children) {
          child.scale.setScalar(pulse);
          child.rotation.z = elapsed * 0.9;
        }
      }
      // Playtime accounting for the Grown-Up Campfire (flush every 20s)
      this.playAccum += dt;
      if (this.playAccum >= 20) {
        this.store.addPlaySeconds(this.playAccum);
        this.playAccum = 0;
      }
    });
    this.disposers.push(offTick);
    this.stage.startLoop();
    // Frame the puzzle into the space the UI chrome leaves, not the whole canvas.
    this.stage.observeChrome(ui);

    this.applySettings();

    // Briefing, then (for debug levels) load the broken program
    void showBrief(ui, this.level, this.sfx).then(() => {
      if (this.level.prefill) {
        this.deck.setProgram(this.level.prefill);
        showToast(ui, 'Copycat left a broken plan — can you fix it? 🐾');
      } else {
        showToast(ui, 'Build a plan, then press BOP!');
      }
    });
  }

  private applySettings(): void {
    const s = this.store.settings;
    this.sfx.enabled = s.sound;
    document.body.classList.toggle('calm-mode', s.calmMode);
    document.body.classList.toggle('high-contrast', s.highContrast);
    document.body.classList.toggle('left-handed', s.leftHanded);
    this.zip?.setCalm(s.calmMode);
    this.bolt?.setCalm(s.calmMode);
    this.mixy?.setCalm(s.calmMode);
  }

  /** Highlight the selected rule card; keep the lens in sync. */
  private refreshRuleBar(): void {
    this.ruleCardEls.forEach((card, i) => {
      const choice = this.level.ruleChoices![i];
      card.classList.toggle('selected', this.selectedRule?.trigger === choice.trigger);
    });
    this.refreshLens();
  }

  /** BopLens: sparkle rings over every tile the current rule can see. */
  private refreshLens(): void {
    if (this.lensGroup) {
      this.lensGroup.removeFromParent();
      this.lensGroup.traverse((o) => {
        if (o instanceof THREE.Mesh) {
          o.geometry.dispose();
          (o.material as THREE.Material).dispose();
        }
      });
      this.lensGroup = null;
    }
    if (!this.lensOn || !this.selectedRule) return;
    const group = new THREE.Group();
    const mat = new THREE.MeshToonMaterial({
      color: '#7ff3ff', emissive: '#54e6ff', emissiveIntensity: 1.3,
      transparent: true, opacity: 0.9,
    });
    const ringGeo = new THREE.TorusGeometry(0.62, 0.05, 8, 28);
    for (const item of this.level.items) {
      if (item.kind !== this.selectedRule.trigger) continue;
      const ring = new THREE.Mesh(ringGeo, mat);
      ring.rotation.x = -Math.PI / 2;
      const p = this.world.cellToWorld(item.col, item.row);
      ring.position.set(p.x, TILE_TOP + 0.04, p.z);
      ring.name = 'lensRing';
      group.add(ring);
    }
    this.lensGroup = group;
    this.world.group.add(group);
  }

  private rewind(): void {
    const start = this.world.cellToWorld(this.level.start.col, this.level.start.row);
    this.zip.placeAt(start);
    this.zip.look(null);
    this.zip.setMood('idle');
    if (this.bolt && this.level.botStart) {
      this.bolt.placeAt(this.world.cellToWorld(this.level.botStart.col, this.level.botStart.row));
      this.bolt.look(null);
      this.bolt.setMood('idle');
    }
    for (const item of this.level.items) {
      const node = this.world.itemNodes.get(item.id);
      if (node) {
        node.removeFromParent();
        const p = this.world.cellToWorld(item.col, item.row);
        node.position.set(p.x, TILE_TOP, p.z);
        node.scale.setScalar(1);
        this.world.group.add(node);
      }
    }
    this.preview.update(this.program);
  }

  /** Slot indices forming the loop block above loop slot `index`. */
  private blockIndices(index: number): number[] {
    const out: number[] = [];
    for (let j = index - 1; j >= 0; j--) {
      const c = this.program[j]?.cmd;
      if (c === 'repeat' || c === 'repeatUntil') break;
      out.unshift(j);
    }
    return out;
  }

  private async onBop(ui: HTMLElement): Promise<void> {
    if (this.running || this.program.length === 0) return;
    this.running = true;
    this.deck.setRunning(true);
    this.preview.clear();

    // 1 — Predict (agency-preserving: the plan is never changed)
    this.zip.setMood('thinking');
    this.zip.look('up');
    const { predictedSuccess } = await showPrediction(ui, this.level, this.sfx);
    this.predictedSuccess = predictedSuccess;
    this.zip.setMood('idle');
    this.zip.look(null);

    // 2 — Run the deterministic program (with the chosen helper rule)
    this.rewind();
    const result = runProgram(this.level, this.program, this.selectedRule);
    this.runHadRuleFire = result.events.some((e) => e.type === 'ruleFire');

    // 3 — Visualize the execution events
    await this.playback(result.events);

    // 4 — Inspect: celebrate, Fred, or glitch-replay
    if (result.success) {
      this.celebrate(ui);
    } else if (result.overflowed) {
      await this.mixy.glitchWobble(0.7);
      this.sfx.play('glitch');
      showFredDialog(ui, this.sfx, () => {
        this.rewind();
        this.preview.update(this.program);
        showToast(ui, 'Give your Until loop a way to stop! 🛑');
      });
    } else {
      await this.mixyGlitch(ui, result);
    }

    this.running = false;
    this.deck.setRunning(false);
  }

  private async playback(events: ExecEvent[]): Promise<void> {
    const speed = this.store.settings.calmMode ? 1.35 : 1;
    const carriedByBot: THREE.Object3D[][] = [[], []];

    for (const e of events) {
      switch (e.type) {
        case 'commandStart':
          this.deck.highlightSlot(e.index, e.iter);
          await wait(0.14 / speed);
          break;
        case 'move': {
          const bot = this.bot(e.actor);
          this.sfx.play('hop');
          const to = this.world.cellToWorld(e.to.col, e.to.row);
          this.faceDirection(bot, e.dir);
          await bot.hopTo(to, 0.34 / speed);
          break;
        }
        case 'bump': {
          const bot = this.bot(e.actor);
          this.sfx.play('bump');
          bot.flashMood('surprised', 700);
          await bot.bumpShake();
          break;
        }
        case 'turn': {
          const bot = this.bot(e.actor);
          this.faceDirection(bot, e.to);
          await bot.turnWiggle();
          break;
        }
        case 'swap': {
          const bot = this.bot(e.to);
          this.sfx.play('grab');
          bot.flashMood('excited', 900);
          void bot.hopTo(bot.root.position.clone(), 0.3 / speed);
          showToast(this.root, e.to === 1 ? 'Bolt is listening! 🤖' : 'Zip is listening! 🐰');
          await wait(0.25 / speed);
          break;
        }
        case 'ruleFire': {
          // The helper rule fires — flash the rule card + ⚡ over the bot.
          const bot = this.bot(e.actor);
          bot.flashMood('excited', 700);
          this.sfx.play('loop');
          this.ruleCardEls.forEach((c) => {
            c.classList.remove('fired');
            void (c as HTMLElement).offsetWidth;
            c.classList.add('fired');
          });
          const r = bot.el.getBoundingClientRect();
          const pop = el('div', 'rule-pop', document.body, '⚡');
          pop.style.left = `${r.left + r.width / 2 - 16}px`;
          pop.style.top = `${r.top - 8}px`;
          window.setTimeout(() => pop.remove(), 800);
          await wait(0.15 / speed);
          break;
        }
        case 'grab': {
          const bot = this.bot(e.actor);
          this.sfx.play('grab');
          bot.flashMood('happy', 900);
          const node = this.world.itemNodes.get(e.item);
          if (node) {
            node.removeFromParent();
            bot.carryAnchor.add(node);
            const stack = carriedByBot[e.actor] ?? carriedByBot[0];
            node.position.set(-0.06 * stack.length, 0.13 * stack.length, 0);
            node.scale.setScalar(0.8);
            stack.push(node);
          }
          await wait(0.2 / speed);
          break;
        }
        case 'grabFail': {
          const bot = this.bot(e.actor);
          this.sfx.play('bump');
          bot.flashMood('surprised', 700);
          await bot.turnWiggle();
          break;
        }
        case 'drop': {
          const bot = this.bot(e.actor);
          this.sfx.play('drop');
          const stack = carriedByBot[e.actor] ?? carriedByBot[0];
          const node = stack.shift();
          if (node) {
            node.removeFromParent();
            const p = this.world.cellToWorld(e.at.col, e.at.row);
            node.position.set(
              p.x + (e.onGoal ? 0 : (Math.random() - 0.5) * 0.3),
              TILE_TOP + (e.onGoal ? 0.62 : 0),
              p.z + (e.onGoal ? 0.1 : (Math.random() - 0.5) * 0.3),
            );
            node.scale.setScalar(e.onGoal ? 0.85 : 1);
            this.world.group.add(node);
          }
          if (e.onGoal) bot.flashMood('happy', 1200);
          await wait(0.24 / speed);
          break;
        }
        case 'dropFail': {
          const bot = this.bot(e.actor);
          this.sfx.play('bump');
          bot.flashMood('surprised', 800);
          showToast(this.root, `${BOT_NAMES[e.actor]}'s hands are empty! 👐`);
          await bot.turnWiggle();
          break;
        }
        case 'condition': {
          const me = this.bot(0);
          me.flashMood('thinking', 800);
          this.deck.highlightSlot(e.index);
          this.sfx.play(e.ok ? 'loop' : 'tap');
          this.deck.showCondBubble(e.index, e.kind === 'flower' ? '🌸' : '🍄', e.ok);
          await wait(0.3 / speed);
          break;
        }
        case 'condSkip':
          this.deck.flashSkipped(e.index);
          this.sfx.play('tap');
          await wait(0.18 / speed);
          break;
        case 'loopStart': {
          this.deck.markLoopSource(this.blockIndices(e.index));
          if (e.kind === 'count') this.deck.showLoopBubble(e.index, 0, e.count ?? '∞');
          break;
        }
        case 'loopIter':
          this.sfx.play('loop');
          this.deck.showLoopBubble(e.index, e.iter, e.count ?? '∞');
          await wait(0.1 / speed);
          break;
        case 'loopEnd':
          this.deck.clearLoopBubble();
          this.deck.clearRunningHighlight();
          break;
        case 'loopOverflow':
          this.deck.clearLoopBubble();
          break;
        case 'loopFail':
          showToast(this.root, 'That loop has nothing to repeat! ↻');
          await wait(0.3);
          break;
        case 'done':
          break;
      }
    }
  }

  /** The bot glances toward its travel direction. */
  private faceDirection(bot: SpriteCharacter, dir: 'N' | 'E' | 'S' | 'W'): void {
    bot.look(dir === 'E' ? 'right' : dir === 'W' ? 'left' : dir === 'N' ? 'up' : null);
  }

  private celebrate(ui: HTMLElement): void {
    void this.zip.celebrate();
    void this.bolt?.celebrate();
    this.sfx.play('celebrate');
    this.events.onSuccess?.();

    const stars: string[] = ['It Works!'];
    if (this.program.length <= this.level.par) stars.push('It Is Clever!');
    const usedLoop = this.program.some((s) => s.cmd === 'repeat' || s.cmd === 'repeatUntil');
    const usedCondition = this.program.some((s) => s.cmd === 'ifFlower' || s.cmd === 'ifMushroom');
    const usedSwap = this.program.some((s) => s.cmd === 'swap');
    const creative =
      this.level.bonusStar === 'loop' ? usedLoop
      : this.level.bonusStar === 'condition' ? usedCondition
      : this.level.bonusStar === 'swap' ? usedSwap
      : this.level.bonusStar === 'rule' ? this.runHadRuleFire
      : this.predictedSuccess === true;
    if (creative) stars.push('It Is Creative!');
    this.store.setStars(this.level.id, stars.length);

    showCelebration(ui, {
      stars: stars.length,
      starNames: stars,
      predictedCorrectly: this.predictedSuccess,
    }, this.sfx, {
      onReplay: () => {
        this.topBar.setStars(stars.length);
        this.rewind();
        this.preview.update(this.program);
      },
      onContinue: () => {
        this.topBar.setStars(stars.length);
        if (this.events.hasNext) this.events.onNextLevel();
        else this.events.onExit(); // back to the level map to admire the stars
      },
    });

    // Stars fly up into the progress pill
    window.setTimeout(() => this.flyStarsToPill(stars.length), 1900);
  }

  private flyStarsToPill(count: number): void {
    const pill = this.root.querySelector('.stars-pill');
    if (!pill || count === 0) return;
    const target = pill.getBoundingClientRect();
    const startX = window.innerWidth / 2;
    const startY = window.innerHeight / 2 - 60;
    for (let i = 0; i < count; i++) {
      const star = el('div', 'fly-star', document.body, '★');
      star.style.left = `${startX + (i - 1) * 54}px`;
      star.style.top = `${startY}px`;
      window.setTimeout(() => {
        star.style.transform = `translate(${target.left + target.width / 2 - startX - (i - 1) * 54}px, ${target.top + target.height / 2 - startY}px) scale(.45)`;
        star.style.opacity = '0.2';
      }, 60 + i * 140);
      window.setTimeout(() => star.remove(), 1000 + i * 140);
    }
    window.setTimeout(() => this.topBar.setStars(count), 1100 + count * 140);
  }

  private async mixyGlitch(ui: HTMLElement, result: RunResult): Promise<void> {
    this.sfx.play('glitch');
    this.zip.setMood('thinking');
    await this.mixy.glitchWobble(0.7);
    showGlitchReplay(ui, result.events, this.sfx, {
      onScrub: (stepIndex) => {
        const state = result.actorTrail[Math.min(stepIndex, result.actorTrail.length - 1)];
        if (state) {
          state.actors.forEach((a, i) => {
            const bot = this.bot(i);
            bot.placeAt(this.world.cellToWorld(a.col, a.row));
            this.faceDirection(bot, a.dir);
          });
        }
      },
      onTryAgain: () => {
        this.zip.setMood('idle');
        this.rewind();
        this.preview.update(this.program);
        showToast(ui, 'Fix a step and BOP again! 💪');
      },
    });
  }

  dispose(): void {
    if (this.playAccum > 0) this.store.addPlaySeconds(this.playAccum);
    this.playAccum = 0;
    this.disposers.forEach((d) => d());
    this.disposers = [];
    this.zip?.dispose();
    this.bolt?.dispose();
    this.mixy?.dispose();
    this.stage?.dispose();
    this.root.innerHTML = '';
  }
}
