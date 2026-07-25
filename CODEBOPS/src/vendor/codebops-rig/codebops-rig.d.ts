/** codebops-rig — layered vector character rigs for Zip and Mixy. Zero dependencies. */

export type AnimationName =
  | 'idle' | 'happy' | 'talk' | 'bounce' | 'hop' | 'thinking' | 'surprised'
  | 'glitch' | 'error';                       // glitch/error: Mixy only
export type FaceName = 'neutral' | 'happy' | 'talk' | 'thinking' | 'surprised' | 'glitched' | 'error';
export type MouthPose = 'closed' | 'small' | 'medium' | 'wide' | 'smile' | 'round' | 'auto';
export type GroupName =
  | 'ears' | 'crest' | 'headFill' | 'facePatch' | 'eyes' | 'pupils'
  | 'highlights' | 'brows' | 'mouth' | 'shadow' | 'effects' | 'glitch';

/** 2x3 affine in SVG order: [a, b, c, d, e, f]. */
export type Matrix2x3 = [number, number, number, number, number, number];

export interface Pose { [channel: string]: number }

export interface NodeTransform {
  /** offset from the node pivot, art units, +y down */ dx: number; dy: number;
  /** z rotation, radians, clockwise on screen */ rot: number;
  /** scale about the node pivot */ sx: number; sy: number;
  /** y rotation; non-zero on headRoot only */ yaw: number;
}

export interface Layer {
  id: string; label: string; group: GroupName; node: string;
  order: number; depth: number; side: number; hidden: boolean;
  pad: number; box: [number, number, number, number] | null; svg: string;
}

export interface Character {
  id: 'zip' | 'mixy';
  name: string;
  fit: number;
  viewBox: { x: number; y: number; width: number; height: number };
  palette: Record<string, string>;
  defs: string;
  nodes: Record<string, { parent: string | null; pivot: [number, number] }>;
  layers: Layer[];
  pupil: { limit: { x: number; y: number }; rest: { x: number; y: number }; travel: { x: number; y: number } };
  animations: AnimationName[];
  faces: FaceName[];
}

export interface PoseDescriptor {
  base?: AnimationName; baseT?: number;
  basePrev?: AnimationName | null; basePrevT?: number; baseBlend?: number;
  face?: FaceName; facePrev?: FaceName | null; faceBlend?: number;
  look?: { x: number; y: number };
  /** 0 = open, 1 = fully closed */ blink?: number;
  talk?: number; talkT?: number; mouthPose?: MouthPose;
  /** -1 = three-quarter left, 1 = three-quarter right */ turn?: number;
  reduced?: boolean;
  springs?: { ear: number; crest: number } | null;
}

export interface LayerDraw {
  id: string; layerId: string; group: GroupName; node: string;
  order: number; depth: number;
  matrix: Matrix2x3; opacity: number;
  image: HTMLCanvasElement | null;
  box: { x: number; y: number; w: number; h: number } | null;
  svg: string;
}

export interface RigOptions {
  canvas?: HTMLCanvasElement;
  /** 'none' skips the built-in Canvas2D renderer so you can drive your own */
  renderer?: 'canvas2d' | 'none';
  autoBlink?: boolean;
  reducedMotion?: boolean | 'auto';
  speed?: number;
  /** art units framed across the shorter canvas axis (default 1240) */
  fit?: number;
  pixelRatio?: number;
  /** raster resolution multiplier (default 2.2) */
  scale?: number;
  maxTexture?: number;
  onProgress?: (progress: number) => void;
  onFrame?: (pose: Pose, rig: CharacterRig) => void;
}

export declare class CharacterRig {
  readonly character: Character;
  readonly animations: AnimationName[];
  pose: Pose;
  canvas: HTMLCanvasElement | null;
  layerState: Record<string, { visible: boolean; opacity: number }>;
  rasters: Record<string, { canvas: HTMLCanvasElement; box: { x: number; y: number; w: number; h: number } }>;

  play(name: AnimationName, opts?: { restart?: boolean; face?: FaceName }): this;
  hop(): this;
  jump(): this;
  glitch(): this;
  error(): this;
  setFace(name: FaceName): this;
  blink(): this;
  look(x: number, y?: number, holdSeconds?: number): this;
  setTurn(t: number): this;
  setTalk(v: number): this;
  setMouth(pose: MouthPose): this;
  setSpeed(v: number): this;
  setPaused(v: boolean): this;
  setReducedMotion(v: boolean): this;
  setAutoBlink(v: boolean): this;

  setLayerVisible(id: string, visible: boolean): this;
  setGroupVisible(group: GroupName, visible: boolean): this;
  isolate(group: GroupName | null): this;
  resetLayers(): this;

  followPointer(el?: HTMLElement): this;
  unfollowPointer(): this;

  update(dt: number): Pose;
  render(): this;
  drawInto(ctx: CanvasRenderingContext2D, w: number, h: number, pose?: Pose, fitUnits?: number): this;
  resize(w?: number, h?: number): this;
  start(): this;
  stop(): this;
  destroy(): this;

  getLayerDraws(pose?: Pose): LayerDraw[];
  getNodeTransforms(pose?: Pose): Record<string, NodeTransform>;
  toSVG(size?: number, viewBox?: [number, number, number, number]): string;
  toPNG(size?: number): string;
}

export declare function createRig(character: Character, opts?: RigOptions): Promise<CharacterRig>;
export declare function buildPose(d: PoseDescriptor, character: Character): Pose;
export declare function poseToNodes(pose: Pose, character: Character): Record<string, NodeTransform>;
export declare function layerMatrix(layer: Layer, nodes: Record<string, NodeTransform>, character: Character): Matrix2x3;
export declare function renderSVG(pose: Pose, character: Character, opts?: {
  layerState?: Record<string, { visible: boolean; opacity: number }>;
  isolate?: GroupName | null; size?: number; viewBox?: [number, number, number, number];
}): string;
export declare function restPose(): Pose;
export declare function defaultLayerState(character: Character): Record<string, { visible: boolean; opacity: number }>;
export declare function buildRasters(character: Character, opts?: { scale?: number; maxTexture?: number; onProgress?: (p: number) => void }): Promise<any>;
export declare function glitchStep(t: number, seed: number, hz: number): number;

export declare const VERSION: string;
export declare const FACES: Record<FaceName, Partial<Pose>>;
export declare const MOUTH_POSES: Record<Exclude<MouthPose, 'auto'>, { sx: number; sy: number; y: number; tongue: number }>;
export declare const MOUTH_ORDER: string[];
export declare const PHONEME_LABEL: Record<string, string>;
export declare const CLIP_DURATION: Record<string, number>;
export declare const CLIP_LOOP: Record<string, number>;
export declare const TURN_MAX_DEGREES: number;
export declare const BLINK_DURATION: number;
