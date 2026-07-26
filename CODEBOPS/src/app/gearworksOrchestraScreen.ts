/**
 * Gearworks orchestra screen — Phase 13: Robot Orchestra.
 *
 * A CREATIVE tool, not a puzzle. A grid of instrument robots plays your
 * beat in parallel, left to right, looped. There is no wrong song: any
 * beat earns the works star, two-plus instruments the clever star, and
 * looping it into a bar the creative star. BOP plays it; Save keeps one
 * local song so a child's tune survives between sittings.
 */
import { Stage } from '../engine/stage';
import { CAMERA_PRESETS } from '../rendering/gearworks/cameraPresets';
import { GarageScene } from '../rendering/gearworks/garageScene';
import { OrchestraRig } from '../rendering/gearworks/orchestraRig';
import { SpriteCharacter } from '../rendering/spriteCharacter';
import { TopBar } from '../ui/topBar';
import { GoalCard } from '../ui/goalCard';
import { ThinkTrailPanel } from '../ui/gearworks/statePanel';
import { BeatSequencer } from '../ui/gearworks/beatSequencer';
import { showBrief, showCelebration, showSettings } from '../ui/dialogs';
import { sharedSfx } from '../audio/sfx';
import { SaveStore } from '../storage/saveStore';
import { el } from '../ui/dom';
import type { GearworksOrchestraLevel } from '../data/gearworks/levels';
import { orchestraStarterPattern, orchestraStars, orchestraTrackIds } from '../data/gearworks/levels';
import {
  runBeats, beatStats, serializePattern, deserializePattern,
} from '../gameplay/gearworks/beatMachine';

const STEP_MS = 360;
const SONG_KEY = 'codebops.song.v1';

export class GearworksOrchestraScreen {
  private stage!: Stage;
  private scene!: GarageScene;
  private rig!: OrchestraRig;
  private zip!: SpriteCharacter;
  private mixy!: SpriteCharacter;
  private trail!: ThinkTrailPanel;
  private seq!: BeatSequencer;
  private topBar!: TopBar;
  private charLayer!: HTMLElement;
  private ui!: HTMLElement;
  private disposers: Array<() => void> = [];
  private running = false;
  private calm = false;
  /** Best star tier already celebrated this sitting (avoids re-popping). */
  private celebratedStars = 0;

  constructor(
    private readonly root: HTMLElement,
    private readonly level: GearworksOrchestraLevel,
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

    this.rig = new OrchestraRig(this.level.tracks);
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
    });
    this.topBar.setStars(this.events.store.stars[this.level.id] ?? 0);
    new GoalCard(this.ui, this.level.goalText, this.level.emoji);
    this.trail = new ThinkTrailPanel(this.ui);

    this.seq = new BeatSequencer(this.ui, this.level.tracks, this.level.steps, {
      onPlay: () => void this.onBop(),
      onClear: () => this.refreshReadout(),
      onChange: () => this.refreshReadout(),
      onLoops: () => this.refreshReadout(),
      onSave: () => this.saveSong(),
      onLoad: () => this.loadSong(),
    });
    // Preload the friendly starter groove — the stage is never blank.
    this.seq.setPattern(orchestraStarterPattern(this.level), 1);
    this.seq.setLoadEnabled(this.hasSavedSong());
    this.refreshReadout();

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

  private addNameChip(sprite: SpriteCharacter, name: string): void {
    void sprite.whenReady().then(() => {
      const chip = el('span', 'gw-name-chip', sprite.el, name);
      chip.setAttribute('aria-hidden', 'true');
    });
  }

  private refreshReadout(): void {
    const stats = beatStats(this.seq.getPattern(), orchestraTrackIds(this.level));
    const loops = this.seq.getLoops();
    if (stats.totalBeats === 0) {
      this.trail.setMachineLine('Tap the squares to add a beat! 🎶');
      return;
    }
    const inst = stats.instrumentsUsed === 1 ? '1 instrument' : `${stats.instrumentsUsed} instruments`;
    const loopBit = loops >= 2 ? ` · looped ×${loops}` : '';
    this.trail.setMachineLine(`🎶 ${stats.totalBeats} beats · ${inst}${loopBit}`);
  }

  // ---------- local song save ----------

  private hasSavedSong(): boolean {
    try { return !!window.localStorage.getItem(SONG_KEY); } catch { return false; }
  }

  private saveSong(): void {
    try {
      window.localStorage.setItem(SONG_KEY, serializePattern(this.seq.getPattern(), this.seq.getLoops()));
      this.seq.setLoadEnabled(true);
      this.toast('💾 Song saved! Tap Load to bring it back any time.');
    } catch {
      this.toast('😅 Could not save the song this time.');
    }
  }

  private loadSong(): void {
    let json: string | null = null;
    try { json = window.localStorage.getItem(SONG_KEY); } catch { json = null; }
    const restored = json ? deserializePattern(json, orchestraTrackIds(this.level), this.level.steps) : null;
    if (!restored) { this.toast('📂 No saved song yet — make one and tap Save!'); return; }
    this.seq.setPattern(restored.pattern, restored.loops);
    this.toast('📂 Your saved song is back!');
  }

  // ---------- run + playback ----------

  private async onBop(): Promise<void> {
    if (this.running) return;
    const pattern = this.seq.getPattern();
    const trackIds = orchestraTrackIds(this.level);
    const loops = this.seq.getLoops();
    const result = runBeats(pattern, trackIds, loops);

    if (result.totalHits === 0) {
      this.mixy.flashMood('surprised', 1200);
      this.toast('🎵 Tap a square first, then BOP to hear the band!');
      return;
    }

    this.running = true;
    this.seq.setRunning(true);
    this.rig.reset();
    this.zip.setMood('happy');
    const stepMs = this.calm ? 240 : STEP_MS;

    for (const ev of result.events) {
      if (ev.type === 'done') break;
      if (ev.type === 'stepStart') {
        this.seq.highlightStep(ev.step);
        this.rig.step();
        await this.delay(stepMs);
        continue;
      }
      // hit — fire the instrument voice + bounce its robot + pulse the cell
      const idx = trackIds.indexOf(ev.track);
      const track = this.level.tracks[idx];
      if (track) {
        sharedSfx.play(track.sound);
        this.rig.hit(idx);
        this.seq.pulseCell(ev.track, ev.step);
      }
    }

    this.seq.highlightStep(-1);
    this.seq.setRunning(false);
    this.running = false;

    const stars = orchestraStars(this.level, pattern, loops);
    const prev = this.events.store.stars[this.level.id] ?? 0;
    this.events.store.setStars(this.level.id, Math.max(prev, stars));
    this.events.store.recordRun(this.level.id, Math.max(prev, stars), this.level.shortTitle);
    this.topBar.setStars(Math.max(prev, stars));

    if (stars > this.celebratedStars) {
      this.celebratedStars = stars;
      this.celebrate(stars);
    } else {
      this.encore(stars, loops);
    }
  }

  private celebrate(stars: number): void {
    const starNames = ['It makes music!'];
    if (stars >= 2) starNames.push('A whole band — 2+ instruments!');
    if (stars >= 3) starNames.push(`Creative: ${this.level.bonus.text}!`);
    void this.zip.celebrate();
    sharedSfx.play('celebrate');
    showCelebration(this.ui, {
      stars,
      starNames,
      predictedCorrectly: null,
    }, sharedSfx, {
      onReplay: () => { /* keep the beat — jam some more */ this.zip.setMood('idle'); },
      onContinue: () => (this.events.hasNext && this.events.onNext ? this.events.onNext() : this.events.onExit()),
    });
  }

  /** Already celebrated the top tier this sitting — just cheer and keep jamming. */
  private encore(stars: number, loops: number): void {
    void this.zip.celebrate();
    const hints = [
      stars < 2 ? '🎶 Nice beat! Add a second instrument for another star.' : '',
      stars >= 2 && loops < 2 ? '🔁 Tap the loop dial (×2) to turn it into a real song!' : '',
    ].filter(Boolean);
    this.toast(hints[0] ?? '🎶 The robot band loves it — keep jamming!');
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
