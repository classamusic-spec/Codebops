/**
 * Gearworks Garage screen — Phase 1 world shell.
 *
 * Mounts the toy-diorama workshop (bench camera preset, indoor lighting),
 * the shared top bar, the mission card, the Think Trail shell, a command-
 * area shell with the first Gearworks tiles, and Zip + Mixy flanking the
 * bench at floor level with name chips — matching the reference art.
 *
 * No machine simulation yet: BOP! is parked until Phase 2's machine
 * interpreter, and tapping a tile explains that honestly and playfully.
 */
import { Stage } from '../engine/stage';
import { CAMERA_PRESETS } from '../rendering/gearworks/cameraPresets';
import { GarageScene } from '../rendering/gearworks/garageScene';
import { SpriteCharacter } from '../rendering/spriteCharacter';
import { TopBar } from '../ui/topBar';
import { GoalCard } from '../ui/goalCard';
import { ThinkTrailPanel } from '../ui/gearworks/statePanel';
import { showBrief, showSettings } from '../ui/dialogs';
import { sharedSfx } from '../audio/sfx';
import { SaveStore } from '../storage/saveStore';
import { el } from '../ui/dom';
import type { GearworksLevelShell } from '../data/gearworks/world';
import { GEARWORKS_TRAY_SHELL } from '../data/gearworks/world';

export class GearworksScreen {
  private stage!: Stage;
  private scene!: GarageScene;
  private zip!: SpriteCharacter;
  private mixy!: SpriteCharacter;
  private trail!: ThinkTrailPanel;
  private charLayer!: HTMLElement;
  private disposers: Array<() => void> = [];

  constructor(
    private readonly root: HTMLElement,
    private readonly level: GearworksLevelShell,
    private readonly events: { onExit: () => void; store: SaveStore },
  ) {}

  enter(): void {
    const wrap = el('div', '', this.root);
    wrap.id = 'world-canvas-wrap';
    this.charLayer = el('div', '', this.root);
    this.charLayer.id = 'char-layer';
    const ui = el('div', 'ui-layer', this.root);

    // --- stage with the bench diorama camera + indoor light rig ---
    const preset = CAMERA_PRESETS.bench;
    this.stage = new Stage(wrap, { viewDir: preset.viewDir, fovFor: preset.fovFor, indoor: true });
    this.stage.setSky('#141c4a', 40, 90);
    this.scene = new GarageScene();
    this.stage.scene.add(this.scene.group);
    this.stage.frameArea(this.scene.frameCenter(), this.scene.frameCorners());

    // --- mascots flanking the bench, with name chips ---
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

    // --- UI chrome (same muscle memory as every other world) ---
    const topBar = new TopBar(ui, `${this.level.title} · ${this.level.shortTitle}`, {
      onBack: this.events.onExit,
      onSettings: () => showSettings(ui, this.events.store, sharedSfx, () => { /* live */ }),
    });
    topBar.setStars(0);

    new GoalCard(ui, this.level.goalText, this.level.emoji);
    this.trail = new ThinkTrailPanel(ui);

    // --- command-area shell ---
    this.buildDeckShell(ui);

    // --- animation ---
    const calm = this.events.store.settings.calmMode;
    this.zip.setCalm(calm);
    this.mixy.setCalm(calm);
    this.disposers.push(this.stage.onTick((dt, elapsed) => {
      if (!calm) this.scene.update(dt, elapsed);
      this.zip.update(dt, elapsed);
      this.mixy.update(dt, elapsed);
    }));
    this.stage.startLoop();

    // --- welcome brief ---
    void showBrief(ui, this.level, sharedSfx).then(() => {
      this.zip.setMood('happy');
      window.setTimeout(() => this.zip.setMood('idle'), 1800);
    });
  }

  private addNameChip(sprite: SpriteCharacter, name: string): void {
    // Wait for the SVG inline (it replaces the sprite element's innerHTML).
    void sprite.whenReady().then(() => {
      const chip = el('span', 'gw-name-chip', sprite.el, name);
      chip.setAttribute('aria-hidden', 'true');
    });
  }

  private buildDeckShell(ui: HTMLElement): void {
    const deck = el('div', 'bottom-deck', ui);
    const panel = el('div', 'deck-panel', deck);

    const tray = el('div', 'deck-tray', panel);
    for (const tile of GEARWORKS_TRAY_SHELL) {
      const btn = el('button', 'tile gw-tile') as HTMLButtonElement;
      btn.type = 'button';
      btn.dataset.gwTone = tile.tone;
      btn.setAttribute('aria-label', `${tile.label} — this machine wakes up soon`);
      el('span', 'sheen', btn);
      const ico = el('span', 'ico', btn);
      ico.innerHTML = `<svg class="cmd-ico" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">${tile.icon}</svg>`;
      el('span', 'lbl', btn, tile.label);
      btn.addEventListener('click', () => {
        sharedSfx.play('tap');
        this.mixy.flashMood('excited', 1200);
        this.toast('🔧 Zip is still wiring this machine — next update!');
      });
      tray.appendChild(btn);
    }

    el('div', 'deck-divider', panel);
    const seq = el('div', 'deck-sequence', panel);
    seq.setAttribute('aria-label', 'Your machine program (coming soon)');
    for (let i = 0; i < 5; i++) el('div', 'slot', seq);

    const bopWrap = el('div', 'bop-wrap', deck);
    const bop = el('button', 'bop-btn empty', bopWrap) as HTMLButtonElement;
    bop.type = 'button';
    bop.setAttribute('aria-label', 'BOP! The machines arrive in the next update.');
    bop.append('BOP!');
    el('span', 'tri', bop);
    bop.addEventListener('click', () => {
      sharedSfx.play('glitch');
      void this.mixy.glitchWobble(0.7);
      this.toast('⚙️ The Great Bop Machine wakes up in the next update!');
    });
  }

  private toast(text: string): void {
    this.root.querySelector('.gw-toast')?.remove();
    const t = el('div', 'toast gw-toast', this.root, text);
    window.setTimeout(() => t.remove(), 2400);
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
