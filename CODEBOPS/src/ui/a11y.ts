/**
 * Getting there for everybody (App Lab §14).
 *
 * One place for the things every screen needs: the body classes that
 * carry calm mode / high contrast / left-handed layout, a polite live
 * region so something that only happened visually can still be heard,
 * a speech helper for children who cannot read yet, and the one knob
 * that decides how fast a test run plays.
 *
 * Speech here is OUTPUT only — the browser reading text aloud on the
 * device. Nothing is recorded, no microphone is opened, and no audio ever
 * leaves the machine. That is a different thing from voice input, which
 * the App Lab does not have anywhere.
 */
import type { SaveData } from '../storage/saveStore';

export type AppSettings = SaveData['settings'];

/** How long a beat lasts while a child watches their app run (§14). */
export type TestSpeed = 'gentle' | 'normal' | 'quick';

export const TEST_SPEEDS: ReadonlyArray<{
  readonly id: TestSpeed; readonly label: string; readonly glyph: string;
  /** Multiplier on the base beat — bigger is slower. */
  readonly factor: number;
}> = [
  { id: 'gentle', label: 'Gentle', glyph: '🐢', factor: 1.8 },
  { id: 'normal', label: 'Just right', glyph: '🚶', factor: 1 },
  { id: 'quick', label: 'Quick', glyph: '🐇', factor: 0.6 },
];

export function speedFactor(speed: TestSpeed | undefined): number {
  return TEST_SPEEDS.find((s) => s.id === speed)?.factor ?? 1;
}

export function isTestSpeed(value: unknown): value is TestSpeed {
  return TEST_SPEEDS.some((s) => s.id === value);
}

/**
 * Carry the accessibility settings on <body>, so every screen inherits
 * them instead of each one remembering to. Called on every screen change.
 */
export function applyAccessibility(settings: AppSettings): void {
  const body = document.body;
  body.classList.toggle('calm-mode', settings.calmMode);
  body.classList.toggle('high-contrast', settings.highContrast);
  body.classList.toggle('left-handed', settings.leftHanded);
}

// ---------------------------------------------------------------------
// A polite live region: things that happened only in pictures, said once.
// ---------------------------------------------------------------------

let liveRegion: HTMLElement | null = null;

function ensureLiveRegion(): HTMLElement {
  if (liveRegion && liveRegion.isConnected) return liveRegion;
  const node = document.createElement('div');
  node.className = 'sr-only';
  node.setAttribute('role', 'status');
  node.setAttribute('aria-live', 'polite');
  node.setAttribute('aria-atomic', 'true');
  document.body.appendChild(node);
  liveRegion = node;
  return node;
}

/**
 * Say something to a screen reader without showing it on screen. Kept
 * deliberately quiet: it replaces its own last message rather than
 * queueing, so a fast run cannot bury a child in announcements.
 */
export function announce(text: string): void {
  const region = ensureLiveRegion();
  // Clearing first makes a repeat of the same sentence announce again.
  region.textContent = '';
  region.textContent = text;
}

// ---------------------------------------------------------------------
// Reading instructions aloud, on this device, for children who can't read
// ---------------------------------------------------------------------

interface SpeechLike {
  speak(utterance: unknown): void;
  cancel(): void;
}

function synth(): SpeechLike | null {
  const s = (window as unknown as { speechSynthesis?: SpeechLike }).speechSynthesis;
  const Utterance = (window as unknown as { SpeechSynthesisUtterance?: unknown })
    .SpeechSynthesisUtterance;
  return s && Utterance ? s : null;
}

export function speechAvailable(): boolean {
  return synth() !== null;
}

/**
 * Read one line aloud. A no-op when the browser has no speech, when the
 * setting is off, or when the text is empty — never an error a child
 * would see.
 */
export function speak(text: string, enabled: boolean | undefined): void {
  if (!enabled || !text.trim()) return;
  const s = synth();
  if (!s) return;
  const Utterance = (window as unknown as {
    SpeechSynthesisUtterance: new (t: string) => { rate: number; pitch: number };
  }).SpeechSynthesisUtterance;
  const u = new Utterance(text);
  // A little slower and a little higher: closer to how a grown-up reads
  // to a small child than to a satnav.
  u.rate = 0.9;
  u.pitch = 1.1;
  s.cancel();
  s.speak(u);
}

export function stopSpeaking(): void {
  synth()?.cancel();
}
