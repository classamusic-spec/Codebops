/*!
 * codebops-rig — layered vector character rigs for Zip and Mixy (Glitch Bop)
 * Zero dependencies. ES module. Browser + Node (SVG output works headless).
 *
 *   import { createRig } from './codebops-rig.js';
 *   import ZIP from './characters/zip.js';
 *
 *   const rig = await createRig(ZIP, { canvas: document.querySelector('#zip') });
 *   rig.start();
 *   rig.play('hop');
 *
 * Artwork lives in the character modules; this file is the engine. Both
 * characters share every animation except `glitch` and `error`, which only
 * Mixy declares (they need the ghost/chip/scanline layers she carries).
 */

export const VERSION = '1.1.0';

const clamp = (v,a,b)=> v<a?a : v>b?b : v;

/* ============================================================ */
/* EASING + TRACKS                                              */
/* ============================================================ */

const EASE = {
  linear:      t=>t,
  quadIn:      t=>t*t,
  quadOut:     t=>t*(2-t),
  quadInOut:   t=> t<0.5 ? 2*t*t : -1+(4-2*t)*t,
  cubicIn:     t=>t*t*t,
  cubicOut:    t=>{ const u=t-1; return u*u*u+1; },
  cubicInOut:  t=> t<0.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1,
  sineInOut:   t=> 0.5-0.5*Math.cos(Math.PI*t),
  sineOut:     t=> Math.sin(t*Math.PI/2),
  backOut:     t=>{ const c=1.70158, u=t-1; return 1+(c+1)*u*u*u+c*u*u; },
  elasticOut:  t=> (t===0||t===1) ? t : Math.pow(2,-9*t)*Math.sin((t*10-0.75)*(2*Math.PI/3))+1,
  bounceOut:   t=>{ const n=7.5625, d=2.75;
                    if(t<1/d)   return n*t*t;
                    if(t<2/d){  t-=1.5/d;   return n*t*t+0.75; }
                    if(t<2.5/d){t-=2.25/d;  return n*t*t+0.9375; }
                    t-=2.625/d; return n*t*t+0.984375; }
};

/* Keyframe track. The easing named on a key describes the segment ENDING there.
   Sampling outside the authored range clamps, so it is safe at any time. */
function track(t, kfs){
  if(t<=kfs[0][0]) return kfs[0][1];
  const last = kfs[kfs.length-1];
  if(t>=last[0]) return last[1];
  for(let i=1;i<kfs.length;i++){
    if(t<=kfs[i][0]){
      const a=kfs[i-1], b=kfs[i], span=b[0]-a[0];
      const u = span<=1e-9 ? 1 : (t-a[0])/span;
      return a[1] + (b[1]-a[1])*(EASE[b[2]] || EASE.quadInOut)(u);
    }
  }
  return last[1];
}

/* Every "random" beat is seeded, so a given time always yields the same pose.
   That is what lets sprite atlases and SVG frames reproduce the live rig. */
function mulberry32(seed){
  let a = seed>>>0;
  return function(){
    a = (a + 0x6D2B79F5)|0;
    let t = Math.imul(a ^ (a>>>15), 1|a);
    t = (t + Math.imul(t ^ (t>>>7), 61|t)) ^ t;
    return ((t ^ (t>>>14))>>>0) / 4294967296;
  };
}

/* Stepped seeded noise. Holding a value for 1/hz of a second is what makes a
   glitch read as digital corruption instead of smooth wobble. */
export function glitchStep(t, seed, hz){
  const k = Math.floor(t*hz);
  let a = ((k*2654435761) ^ (seed*40503)) >>> 0;
  a = Math.imul(a ^ (a>>>15), 1|a);
  a = (a + Math.imul(a ^ (a>>>7), 61|a)) ^ a;
  return (((a ^ (a>>>14))>>>0) / 4294967296) * 2 - 1;
}

/* ============================================================ */
/* BLINK / GAZE SCHEDULES                                       */
/* ============================================================ */

export const BLINK_DURATION = 0.14;
const BLINK_SCHEDULE = (()=>{
  const r = mulberry32(0x5A17BEE), out = [];
  let t = 1.35;
  for(let i=0;i<600;i++){ out.push(t); t += 2.3 + r()*3.6; if(r()<0.14) t -= 1.9; }
  return out;
})();
function blinkCurve(u){
  return track(u, [[0,0],[0.26,0.72,'quadIn'],[0.36,1,'quadIn'],[0.48,1,'linear'],[0.72,0.45,'quadOut'],[1,0,'quadOut']]);
}
function scheduledBlink(t){
  if(t<0) return 0;
  let lo=0, hi=BLINK_SCHEDULE.length-1, k=-1;
  while(lo<=hi){ const m=(lo+hi)>>1; if(BLINK_SCHEDULE[m]<=t){ k=m; lo=m+1; } else hi=m-1; }
  if(k<0) return 0;
  const d = t - BLINK_SCHEDULE[k];
  return d<BLINK_DURATION ? blinkCurve(d/BLINK_DURATION) : 0;
}
const SACCADES = (()=>{
  const r = mulberry32(0x2C0FFEE), out=[];
  let t = 0.9;
  for(let i=0;i<400;i++){ out.push({ t, x:(r()*2-1)*0.7, y:(r()*2-1)*0.45, hold:0.55+r()*1.9 }); t += 1.1 + r()*2.6; }
  return out;
})();
function saccadeAt(t){
  if(t<SACCADES[0].t) return {x:0,y:0};
  let lo=0, hi=SACCADES.length-1, k=0;
  while(lo<=hi){ const m=(lo+hi)>>1; if(SACCADES[m].t<=t){ k=m; lo=m+1; } else hi=m-1; }
  const s = SACCADES[k], d = t - s.t;
  const w = EASE.quadOut(clamp(d/0.12,0,1)) * (1 - EASE.quadInOut(clamp((d-s.hold)/0.3,0,1)));
  return { x:s.x*w, y:s.y*w };
}

/* ============================================================ */
/* MOUTH POSES                                                  */
/* ============================================================ */

/* Six phoneme shapes, produced by scaling and offsetting the one measured mouth
   artwork rather than by shipping six extra textures. */
export const MOUTH_POSES = {
  closed: { sx:1.04, sy:0.11, y:-8,  tongue:0.00 },
  small:  { sx:0.80, sy:0.44, y:-2,  tongue:0.50 },
  medium: { sx:0.92, sy:0.76, y:2,   tongue:0.85 },
  wide:   { sx:1.03, sy:1.20, y:9,   tongue:1.00 },
  smile:  { sx:1.00, sy:1.00, y:0,   tongue:1.00 },
  round:  { sx:0.58, sy:0.94, y:5,   tongue:0.70 }
};
export const MOUTH_ORDER = ['closed','small','medium','wide','smile','round'];
export const PHONEME_LABEL = { closed:'M / B / P', small:'E / I', medium:'EH / R', wide:'A / AH', smile:'rest', round:'O / U / W' };
const PHONEMES = (()=>{
  const r = mulberry32(0x7A1C0DE), seq=[], pool=['small','medium','wide','closed','medium','round','small','wide'];
  for(let i=0;i<64;i++) seq.push(pool[Math.floor(r()*pool.length)]);
  return seq;
})();

/* ============================================================ */
/* POSE                                                         */
/* ============================================================ */

/** A pose is a flat bag of named scalar channels. */
export function restPose(){
  return {
    rootX:0, rootY:0, rootRot:0, rootSX:1, rootSY:1,
    headX:0, headY:0, headRot:0, headSX:1, headSY:1, headYaw:0,
    earX:0, earY:0, earRot:0, earSX:1, earSY:1,
    crestX:0, crestY:0, crestRot:0, crestSX:1, crestSY:1,
    eyeX:0, eyeY:0, eyeSX:1, eyeSY:1, eyeOpen:1,
    pupilX:0, pupilY:0, pupilS:1,
    browOn:0, browY:0, browRot:0,
    mouthX:0, mouthY:0, mouthSX:1, mouthSY:1, mouthRot:0, tongue:1,
    shadowSX:1, shadowOpacity:1, sparkle:0,
    glitchAmt:0, glitchT:0, ghostOn:0, sliceX:0, scanOn:0, scanY:0, errorOn:0, chipScatter:0
  };
}
const POSE_KEYS = Object.keys(restPose());
const REST_POSE = restPose();
function lerpInto(p, q, w){ for(const k of POSE_KEYS) p[k] = p[k] + (q[k]-p[k])*w; }

/* ============================================================ */
/* BASE CLIPS                                                   */
/* ============================================================ */

const BASE = {};

BASE.idle = function(t,p){
  const a = t*(2*Math.PI/3.2), b = t*(2*Math.PI/4.7);
  p.rootY   = Math.sin(a)*7;
  p.headY   = Math.sin(a+0.55)*5;
  p.headX   = Math.sin(b)*4;
  p.headRot = Math.sin(b+1.1)*0.017;
  const breath = Math.sin(a*0.5)*0.012;
  p.headSX = 1+breath; p.headSY = 1-breath;
  p.earRot   = Math.sin(a-0.75)*0.06;
  p.earY     = Math.sin(a-0.4)*2.5;
  p.crestRot = Math.sin(a-0.95)*0.075;
  p.crestY   = Math.sin(a-0.6)*3.5;
  const lift = Math.sin(a);
  p.shadowSX = 1 - lift*0.055;
  p.shadowOpacity = 1 - lift*0.14;
};

BASE.happy = function(t,p){
  BASE.idle(t*0.35, p);
  const s = Math.min(t, 2.0);
  p.rootY += track(s,[[0,0],[0.11,24,'quadOut'],[0.30,-58,'cubicOut'],[0.52,0,'quadIn'],
                      [0.66,-32,'cubicOut'],[0.84,0,'quadIn'],[0.97,-13,'quadOut'],
                      [1.10,0,'quadIn'],[1.30,0,'sineInOut'],[2.0,0,'linear']]);
  const wide = track(s,[[0,1],[0.11,1.13,'quadOut'],[0.30,0.91,'quadOut'],[0.52,1.10,'quadIn'],
                        [0.63,0.97,'quadOut'],[0.84,1.06,'quadIn'],[0.94,0.99,'quadOut'],
                        [1.20,1,'elasticOut'],[2.0,1,'linear']]);
  p.headSX *= wide; p.headSY *= (2-wide);
  p.headRot  += track(s,[[0,0],[0.34,0.06,'sineInOut'],[0.70,-0.05,'sineInOut'],[1.15,0,'sineInOut'],[2.0,0,'linear']]);
  p.earRot   += track(s,[[0,0],[0.20,0.30,'backOut'],[0.62,-0.14,'sineInOut'],[1.10,0,'elasticOut'],[2.0,0,'linear']]);
  p.crestRot += track(s,[[0,0],[0.24,0.26,'backOut'],[0.66,-0.12,'sineInOut'],[1.15,0,'elasticOut'],[2.0,0,'linear']]);
  p.sparkle   = track(s,[[0,0],[0.16,0,'linear'],[0.36,1,'quadOut'],[1.15,1,'linear'],[1.7,0,'quadIn'],[2.0,0,'linear']]);
  p.shadowSX *= track(s,[[0,1],[0.30,0.74,'quadOut'],[0.52,1.06,'quadIn'],[1.2,1,'sineInOut'],[2.0,1,'linear']]);
  p.shadowOpacity *= track(s,[[0,1],[0.30,0.62,'quadOut'],[0.52,1.04,'quadIn'],[1.2,1,'sineInOut'],[2.0,1,'linear']]);
};

BASE.bounce = function(t,p){
  BASE.idle(t*0.3, p);
  const s = Math.min(t, 1.75);
  p.rootY += track(s,[[0,0],[0.16,34,'quadOut'],[0.24,10,'quadIn'],[0.46,-96,'cubicOut'],
                      [0.72,0,'cubicIn'],[0.82,20,'quadOut'],[1.05,0,'elasticOut'],[1.75,0,'linear']]);
  const wide = track(s,[[0,1],[0.16,1.20,'quadOut'],[0.26,0.86,'quadOut'],[0.46,0.93,'sineInOut'],
                        [0.70,0.90,'quadIn'],[0.80,1.19,'quadOut'],[1.10,1,'elasticOut'],[1.75,1,'linear']]);
  p.headSX *= wide; p.headSY *= (2-wide);
  p.earRot   += track(s,[[0,0],[0.20,-0.24,'quadOut'],[0.50,0.34,'quadOut'],[0.82,-0.18,'quadOut'],[1.25,0,'elasticOut'],[1.75,0,'linear']]);
  p.crestRot += track(s,[[0,0],[0.22,-0.20,'quadOut'],[0.52,0.30,'quadOut'],[0.86,-0.15,'quadOut'],[1.30,0,'elasticOut'],[1.75,0,'linear']]);
  p.shadowSX *= track(s,[[0,1],[0.16,1.06,'quadOut'],[0.46,0.58,'quadOut'],[0.74,1.10,'quadIn'],[1.1,1,'sineInOut'],[1.75,1,'linear']]);
  p.shadowOpacity *= track(s,[[0,1],[0.46,0.46,'quadOut'],[0.74,1.06,'quadIn'],[1.1,1,'sineInOut'],[1.75,1,'linear']]);
};

/* HOP — a light travelling jump: crouch, launch, air tilt, land, settle.
   Distinct from bounce, which is a heavier in-place squash. */
BASE.hop = function(t,p){
  BASE.idle(t*0.3, p);
  const s = Math.min(t, 1.3);
  p.rootY  += track(s,[[0,0],[0.10,26,'quadOut'],[0.18,6,'quadIn'],[0.44,-122,'cubicOut'],
                       [0.68,0,'cubicIn'],[0.76,15,'quadOut'],[0.98,0,'elasticOut'],[1.3,0,'linear']]);
  p.rootX  += track(s,[[0,0],[0.10,-7,'quadOut'],[0.44,12,'sineInOut'],[0.72,5,'sineInOut'],[1.05,0,'sineInOut'],[1.3,0,'linear']]);
  p.rootRot+= track(s,[[0,0],[0.18,-0.055,'quadOut'],[0.46,0.045,'sineInOut'],[0.72,-0.02,'sineInOut'],[1.05,0,'sineInOut'],[1.3,0,'linear']]);
  const wide = track(s,[[0,1],[0.10,1.17,'quadOut'],[0.21,0.87,'quadOut'],[0.44,0.94,'sineInOut'],
                        [0.66,0.89,'quadIn'],[0.76,1.16,'quadOut'],[1.04,1,'elasticOut'],[1.3,1,'linear']]);
  p.headSX *= wide; p.headSY *= (2-wide);
  p.headY  += track(s,[[0,0],[0.44,10,'sineInOut'],[0.76,-6,'quadOut'],[1.05,0,'elasticOut'],[1.3,0,'linear']]);
  p.earRot += track(s,[[0,0],[0.22,-0.30,'quadOut'],[0.52,0.38,'quadOut'],[0.80,-0.20,'quadOut'],[1.15,0,'elasticOut'],[1.3,0,'linear']]);
  p.crestRot+=track(s,[[0,0],[0.24,-0.26,'quadOut'],[0.55,0.33,'quadOut'],[0.84,-0.16,'quadOut'],[1.20,0,'elasticOut'],[1.3,0,'linear']]);
  p.shadowSX      *= track(s,[[0,1],[0.10,1.07,'quadOut'],[0.44,0.52,'quadOut'],[0.70,1.12,'quadIn'],[1.0,1,'sineInOut'],[1.3,1,'linear']]);
  p.shadowOpacity *= track(s,[[0,1],[0.44,0.40,'quadOut'],[0.70,1.08,'quadIn'],[1.0,1,'sineInOut'],[1.3,1,'linear']]);
};

/* GLITCH — looping corruption: stepped jitter, channel-split ghosts,
   scattering chips and a scanline band sweeping down the head. */
BASE.glitch = function(t,p){
  BASE.idle(t*0.8, p);
  const g = 0.58 + 0.42*Math.sin(t*3.1);
  p.glitchAmt = g; p.glitchT = t; p.chipScatter = g;
  p.headX   += glitchStep(t, 11, 14)*18*g;
  p.rootY   += glitchStep(t, 23, 11)*7*g;
  p.headRot += glitchStep(t, 31, 9)*0.022*g;
  p.headSX  *= 1 + glitchStep(t, 61, 13)*0.035*g;
  p.ghostOn  = 0.52*g;
  p.sliceX   = glitchStep(t, 41, 16)*22*g;
  p.scanOn   = 0.8;
  p.scanY    = ((t*0.9) % 1)*620 - 60;
  p.earRot  += glitchStep(t, 71, 15)*0.10*g;
  p.crestRot+= glitchStep(t, 83, 12)*0.13*g;
};

/* ERROR — a hard fault: violent shudder, eyes replaced by crosses, chips
   thrown clear of the head, then a recovery back to rest. */
BASE.error = function(t,p){
  BASE.idle(t*0.2, p);
  const s = Math.min(t, 2.4);
  const g = track(s,[[0,0],[0.05,1,'quadOut'],[1.55,1,'linear'],[2.05,0.18,'quadIn'],[2.4,0,'linear']]);
  p.glitchAmt = g; p.glitchT = t*1.7; p.chipScatter = g*1.6;
  p.headX   += glitchStep(t, 7, 20)*30*g;
  p.headY   += glitchStep(t, 17, 17)*16*g;
  p.rootRot += glitchStep(t, 29, 13)*0.045*g;
  p.headSX  *= 1 + glitchStep(t, 37, 15)*0.075*g;
  p.headSY  *= 1 - glitchStep(t, 47, 15)*0.055*g;
  p.ghostOn  = 0.8*g;
  p.sliceX   = glitchStep(t, 43, 22)*40*g;
  p.scanOn   = g;
  p.scanY    = ((t*1.8) % 1)*650 - 60;
  p.errorOn  = track(s,[[0,0],[0.10,1,'linear'],[1.65,1,'linear'],[1.95,0,'linear'],[2.4,0,'linear']]);
  p.eyeOpen *= 1 - 0.92*p.errorOn;
  p.earRot  += glitchStep(t, 91, 18)*0.22*g;
  p.crestRot+= glitchStep(t, 97, 16)*0.26*g;
  p.shadowOpacity *= 1 - 0.3*g;
};

BASE.talk = function(t,p){
  BASE.idle(t,p);
  p.headY   += Math.sin(t*7.4)*2.6 + Math.sin(t*3.05)*1.4;
  p.headRot += Math.sin(t*7.4+0.6)*0.013;
  p.headX   += Math.sin(t*2.2)*2.0;
};

BASE.thinking = function(t,p){
  BASE.idle(t*0.75,p);
  const a = t*(2*Math.PI/5.4);
  p.headRot += 0.085 + Math.sin(a)*0.022;
  p.headX   += 9 + Math.sin(a)*4;
  p.headY   += 3;
  p.earRot  += -0.10 + Math.sin(a-0.5)*0.05;
  p.crestRot+= -0.13 + Math.sin(a-0.7)*0.05;
};

BASE.surprised = function(t,p){
  BASE.idle(t*0.35,p);
  const s = Math.min(t,1.6);
  p.rootY += track(s,[[0,0],[0.09,-34,'cubicOut'],[0.30,-10,'quadIn'],[0.62,0,'elasticOut'],[1.6,0,'linear']]);
  const wide = track(s,[[0,1],[0.09,0.88,'quadOut'],[0.28,1.05,'quadIn'],[0.60,1,'elasticOut'],[1.6,1,'linear']]);
  p.headSX *= wide; p.headSY *= (2-wide);
  p.earRot   += track(s,[[0,0],[0.10,-0.34,'quadOut'],[0.46,0.10,'sineInOut'],[0.90,0,'elasticOut'],[1.6,0,'linear']]);
  p.crestRot += track(s,[[0,0],[0.10,-0.30,'quadOut'],[0.48,0.09,'sineInOut'],[0.95,0,'elasticOut'],[1.6,0,'linear']]);
};

export const CLIP_DURATION = { happy:2.0, bounce:1.75, hop:1.3, surprised:1.6, error:2.4 };
export const CLIP_LOOP     = { idle:3.2, talk:3.2, thinking:5.4, glitch:2.03 };

/* Facial states are partial poses: only the channels they name are taken over,
   and they crossfade so expressions never pop. */
export const FACES = {
  neutral:   { eyeSX:1.00, eyeSY:1.00, browOn:0, browY:0,   browRot:0,     mouthSX:1.00, mouthSY:1.00, mouthY:0,  tongue:1.0,  pupilS:1.00 },
  happy:     { eyeSX:1.06, eyeSY:0.93, browOn:0, browY:0,   browRot:0,     mouthSX:1.12, mouthSY:1.20, mouthY:5,  tongue:1.0,  pupilS:1.04 },
  talk:      { eyeSX:1.01, eyeSY:0.99, browOn:0, browY:0,   browRot:0,     pupilS:1.00 },
  thinking:  { eyeSX:0.97, eyeSY:0.84, browOn:1, browY:-10, browRot:0.22,  mouthSX:0.60, mouthSY:0.40, mouthY:-6, tongue:0.35, pupilS:0.96 },
  surprised: { eyeSX:1.13, eyeSY:1.19, browOn:1, browY:-30, browRot:-0.07, mouthSX:0.66, mouthSY:1.24, mouthY:9,  tongue:0.80, pupilS:0.80 },
  glitched:  { eyeSX:1.08, eyeSY:1.04, browOn:1, browY:-14, browRot:0.10,  mouthSX:1.06, mouthSY:0.86, mouthY:2,  tongue:0.70, pupilS:0.88 },
  error:     { eyeSX:1.02, eyeSY:1.00, browOn:1, browY:-4,  browRot:-0.18, mouthSX:1.20, mouthSY:0.32, mouthY:3,  tongue:0.12, pupilS:0.70 }
};
const ANIM_FACE = { idle:'neutral', happy:'happy', talk:'talk', bounce:'happy', hop:'happy',
                    thinking:'thinking', surprised:'surprised', glitch:'glitched', error:'error' };

const GAZE = { eyeX:16, eyeY:10 };
export const TURN_MAX_DEGREES = 25;
const TURN_MAX = TURN_MAX_DEGREES*Math.PI/180;

const SPARK_SPOTS = [
  { x:-330, y:-190, rot: 0.00, gain:1.00 },
  { x: 318, y:-236, rot: 0.55, gain:0.82 },
  { x:-268, y:  86, rot:-0.40, gain:0.68 }
];
function sparkTransform(i, amt){
  const sp = SPARK_SPOTS[i];
  return { x:sp.x, y:sp.y, rot:sp.rot + (1-amt)*0.7, s:0.35 + amt*0.85*sp.gain,
           o:clamp(amt*sp.gain*1.15, 0, 1) };
}

/* ============================================================ */
/* POSE -> NODE TRANSFORMS                                      */
/* ============================================================ */

/**
 * Per-node transform records in ART space.
 *   dx,dy  offset from the node pivot (+y down)
 *   rot    z rotation, radians, clockwise on screen
 *   sx,sy  scale about the pivot
 *   yaw    y rotation (headRoot only)
 * Nodes a character does not define are simply skipped.
 */
export function poseToNodes(pose, character){
  const has = character.nodes;
  const yaw = pose.headYaw || 0;
  const a   = clamp(Math.abs(yaw)/TURN_MAX, 0, 1);
  const sgn = yaw>=0 ? 1 : -1;          /* +1 => RIGHT-hand layers are the far side */
  const N = {};
  const put = (id,dx,dy,rot,sx,sy,yw)=>{
    if(!has[id]) return;
    N[id] = { dx:dx||0, dy:dy||0, rot:rot||0,
              sx:(sx===undefined?1:sx), sy:(sy===undefined?1:sy), yaw:yw||0 };
  };

  put('zipRoot',    pose.rootX, pose.rootY, pose.rootRot, pose.rootSX, pose.rootSY);
  put('shadowNode', 0, -pose.rootY, 0, pose.shadowSX, 1);      /* stays on the ground */
  put('headRoot',   pose.headX, pose.headY, pose.headRot, pose.headSX, pose.headSY, yaw);
  put('headBase',   0,0,0,1,1);
  put('faceRoot',   pose.sliceX||0, 0, 0, 1, 1);               /* slice tear */
  put('effects',    0,0,0,1,1);
  put('debugLayer', 0,0,0,1,1);

  for(const sd of ['L','R']){
    const isRight = (sd==='R');
    const far     = isRight ? (sgn>0) : (sgn<0);
    const dir     = isRight ? 1 : -1;
    const inward  = -dir;
    put('earPivot'+sd,
        pose.earX*dir + (far ? 14*a*inward : 5*a*dir), pose.earY, pose.earRot*dir,
        pose.earSX*(far ? 1-0.30*a : 1+0.07*a), pose.earSY);
    put('eyeRoot'+sd,
        pose.eyeX + (far ? 9*a*inward : 4*a*dir), pose.eyeY, 0,
        pose.eyeSX*(far ? 1-0.13*a : 1+0.06*a),
        pose.eyeSY*pose.eyeOpen*(far ? 1-0.03*a : 1));
    put('pupilRoot'+sd, pose.pupilX,     pose.pupilY,     0, pose.pupilS, pose.pupilS);
    put('hiRoot'+sd,    pose.pupilX*0.6, pose.pupilY*0.6, 0, 1, 1);
    put('shineRoot'+sd, pose.pupilX*0.3, pose.pupilY*0.3, 0, 1, 1);
    put('brow'+sd,      pose.eyeX*0.5,   pose.browY,      pose.browRot*dir*-1, 1, 1);
  }

  put('crestPivot', pose.crestX - sgn*7*a,  pose.crestY, pose.crestRot + sgn*0.05*a, pose.crestSX, pose.crestSY);
  put('mouthRoot',  pose.mouthX - sgn*11*a, pose.mouthY, pose.mouthRot, pose.mouthSX, pose.mouthSY);
  put('tongueRoot', 0,0,0,1,1);

  /* glitch rig — present on Mixy, absent (and skipped) on Zip */
  const gA = pose.glitchAmt||0, gT = pose.glitchT||0;
  put('ghostC', -(8 + 20*gA), -2*gA, 0, 1, 1);
  put('ghostP',  (8 + 20*gA),  2*gA, 0, 1, 1);
  const scat = (pose.chipScatter!==undefined ? pose.chipScatter : gA);
  for(let i=0;i<5;i++){
    put('chip'+i, glitchStep(gT, 101+i*13, 12)*74*scat,
                  glitchStep(gT, 211+i*17, 12)*48*scat, 0, 1, 1);
  }
  put('chipLime', glitchStep(gT, 307, 10)*28*gA, glitchStep(gT, 401, 10)*20*gA, 0, 1, 1);
  put('scanRoot', 0, pose.scanY||0, 0, 1, 1);
  return N;
}

/**
 * Pure pose assembly. Identical descriptors always produce identical poses.
 * @param {object} d {base, baseT, basePrev, basePrevT, baseBlend, face, facePrev,
 *                    faceBlend, look:{x,y}, blink, talk, talkT, mouthPose, turn,
 *                    reduced, springs}
 * @param {object} character supplies the pupil clamp geometry
 */
export function buildPose(d, character){
  const PL = character.pupil.limit, PR = character.pupil.rest, PT = character.pupil.travel;
  const p = restPose();

  (BASE[d.base] || BASE.idle)(d.baseT || 0, p);
  if(d.basePrev && d.baseBlend < 1){
    const q = restPose();
    (BASE[d.basePrev] || BASE.idle)(d.basePrevT || 0, q);
    lerpInto(p, q, 1 - d.baseBlend);
  }

  if(d.reduced){
    for(const k of ['rootX','rootY','rootRot','headX','headY','headRot','earRot','earY','crestRot','crestY'])
      p[k] = REST_POSE[k] + (p[k]-REST_POSE[k])*0.22;
    for(const k of ['headSX','headSY']) p[k] = 1 + (p[k]-1)*0.3;
  }

  const fB = FACES[d.face] || FACES.neutral;
  const fA = d.facePrev ? (FACES[d.facePrev] || FACES.neutral) : null;
  const w  = (d.faceBlend===undefined) ? 1 : clamp(d.faceBlend,0,1);
  const keys = fA ? Object.keys(fA).concat(Object.keys(fB)) : Object.keys(fB);
  const seen = {};
  for(const k of keys){
    if(seen[k]) continue; seen[k]=1;
    const va = fA ? (fA[k]!==undefined ? fA[k] : p[k]) : p[k];
    const vb = (fB[k]!==undefined) ? fB[k] : p[k];
    p[k] = va + (vb-va)*w;
  }

  let mp = d.mouthPose || 'auto', mw = 1;
  if(mp === 'auto'){
    mp = null;
    if((d.talk||0) > 0.005){
      const idx = Math.floor((d.talkT||0)*7.5);
      mp = PHONEMES[((idx % PHONEMES.length) + PHONEMES.length) % PHONEMES.length];
      mw = clamp(d.talk,0,1);
    }
  }
  if(mp && MOUTH_POSES[mp]){
    const m = MOUTH_POSES[mp];
    p.mouthSX += (m.sx     - p.mouthSX)*mw;
    p.mouthSY += (m.sy     - p.mouthSY)*mw;
    p.mouthY  += (m.y      - p.mouthY )*mw;
    p.tongue  += (m.tongue - p.tongue )*mw;
  }

  const bl = clamp(d.blink||0, 0, 1);
  p.eyeOpen *= (1 - bl*0.965);
  p.eyeY    += bl*5;

  const lx = clamp((d.look&&d.look.x)||0, -1, 1);
  const ly = clamp((d.look&&d.look.y)||0, -1, 1);
  p.eyeX   += lx*GAZE.eyeX;
  p.eyeY   += ly*GAZE.eyeY;
  p.pupilX += lx*PT.x;
  p.pupilY += ly*PT.y;
  p.pupilX  = clamp(p.pupilX, -PT.x, PT.x);
  p.pupilY  = clamp(p.pupilY, -PT.y, PT.y);
  /* Elliptical clamp: a per-axis clamp alone lets a diagonal look overshoot by
     √2, so scale the total offset back onto the socket/pupil difference ellipse. */
  let tx = PR.x + p.pupilX, ty = PR.y + p.pupilY;
  const rr = Math.hypot(tx/PL.x, ty/PL.y);
  if(rr > 1){ tx /= rr; ty /= rr; }
  p.pupilX = tx - PR.x;
  p.pupilY = ty - PR.y;

  if(d.springs){ p.earRot += d.springs.ear; p.crestRot += d.springs.crest; }
  p.headYaw = clamp(d.turn||0, -1, 1)*TURN_MAX;
  return p;
}

/* ============================================================ */
/* TRANSFORMS                                                   */
/* ============================================================ */

const matI = [1,0,0,1,0,0];
const matT = (x,y)=>[1,0,0,1,x,y];
const matS = (x,y)=>[x,0,0,y,0,0];
const matR = (r)=>{ const c=Math.cos(r), s=Math.sin(r); return [c,s,-s,c,0,0]; };
function matMul(m,n){
  return [ m[0]*n[0]+m[2]*n[1], m[1]*n[0]+m[3]*n[1],
           m[0]*n[2]+m[2]*n[3], m[1]*n[2]+m[3]*n[3],
           m[0]*n[4]+m[2]*n[5]+m[4], m[1]*n[4]+m[3]*n[5]+m[5] ];
}
function nodeChains(character){
  if(character._chains) return character._chains;
  const out = {};
  for(const id in character.nodes){
    const chain = []; let c = id;
    while(c){ chain.unshift(c); c = character.nodes[c].parent; }
    out[id] = chain;
  }
  character._chains = out;
  return out;
}

/* An orthographic Y-rotation of a plane at depth z is exactly a scaleX of
   cos(yaw) about the pivot plus a translate of sin(yaw)·z — no perspective term
   to approximate. That is why this 2D output matches a 3D renderer exactly. */
function nodeMatrix(id, N, depth, character){
  const def = character.nodes[id];
  const r = N[id] || { dx:0, dy:0, rot:0, sx:1, sy:1, yaw:0 };
  const px = def.pivot[0], py = def.pivot[1];
  let m = matT(px + r.dx, py + r.dy);
  m = matMul(m, matR(r.rot));
  if(r.yaw){
    m = matMul(m, matT(Math.sin(r.yaw)*(depth||0), 0));
    m = matMul(m, matS(Math.cos(r.yaw), 1));
  }
  m = matMul(m, matS(r.sx, r.sy));
  return matMul(m, matT(-px, -py));
}
/** 2x3 affine placing a layer's artwork into art space. */
export function layerMatrix(layer, N, character){
  let m = matI;
  for(const id of nodeChains(character)[layer.node]) m = matMul(m, nodeMatrix(id, N, layer.depth, character));
  return m;
}

const fmt = (v)=> (Math.abs(v) < 1e-6 ? 0 : +v.toFixed(5));

/* One visibility/opacity rule shared by the live renderer and every exporter,
   so a frame looks the same on screen, in SVG and in the sprite atlas. */
function glitchOpacity(layer, pose){
  const id = layer.id;
  if(id === 'ghostCyan' || id === 'ghostPink') return clamp(pose.ghostOn||0, 0, 1);
  if(id === 'scanlines') return clamp(pose.scanOn||0, 0, 1);
  if(id === 'errorXL' || id === 'errorXR') return clamp(pose.errorOn||0, 0, 1);
  if(id.indexOf('chip') === 0){
    const g = pose.glitchAmt||0;
    if(g < 0.02) return 1;
    const f = glitchStep((pose.glitchT||0), 500 + id.length*7, 15);
    return clamp(1 - g*0.55*(0.5 + 0.5*f), 0, 1);
  }
  return 1;
}
function styleFor(layer, pose, layerState, isolate){
  const ls = layerState[layer.id] || { visible:!layer.hidden, opacity:1 };
  let o = ls.opacity, vis = ls.visible;
  if(layer.group === 'brows'){ o *= pose.browOn; vis = vis && pose.browOn > 0.02; }
  if(layer.id === 'tongue' || layer.id === 'tonguePink'){ o *= pose.tongue; vis = vis && pose.tongue > 0.02; }
  if(layer.id === 'shadow'){ o *= clamp(pose.shadowOpacity,0,1); }
  if(layer.id === 'sparkle'){ o *= clamp(pose.sparkle,0,1); vis = vis && pose.sparkle > 0.02; }
  if(layer.group === 'glitch'){ const g = glitchOpacity(layer, pose); o *= g; vis = vis && g > 0.02; }
  if(isolate) o *= (layer.group === isolate ? 1 : 0.07);
  return { o, vis: vis && o > 0.004 };
}

function drawList(pose, character, layerState, isolate){
  const N = poseToNodes(pose, character);
  const out = [];
  const ordered = character.layers.slice().sort((a,b)=> a.order - b.order || (a.side||0) - (b.side||0));
  for(const l of ordered){
    const st = styleFor(l, pose, layerState, isolate);
    if(!st.vis) continue;
    const base = layerMatrix(l, N, character);
    if(l.id === 'sparkle'){
      for(let i=0;i<SPARK_SPOTS.length;i++){
        const tr = sparkTransform(i, clamp(pose.sparkle,0,1));
        const m = matMul(base, matMul(matT(512+tr.x, 512+tr.y),
                  matMul(matR(tr.rot), matMul(matS(tr.s,tr.s), matT(-512,-512)))));
        if(st.o*tr.o > 0.004) out.push({ layer:l, matrix:m, opacity:st.o*tr.o, suffix:'-'+i });
      }
    } else {
      out.push({ layer:l, matrix:base, opacity:st.o, suffix:'' });
    }
  }
  return out;
}

export function defaultLayerState(character){
  const s = {};
  for(const l of character.layers) s[l.id] = { visible: !l.hidden, opacity:1 };
  return s;
}

/**
 * Render one pose as a standalone SVG document. Works in Node — nothing here
 * touches the DOM, so you can bake frames server-side.
 */
export function renderSVG(pose, character, opts){
  opts = opts || {};
  const layerState = opts.layerState || defaultLayerState(character);
  let body = '';
  for(const d of drawList(pose, character, layerState, opts.isolate || null)){
    body += `<g id="${character.id}-${d.layer.id}${d.suffix}" data-group="${d.layer.group}" ` +
            `transform="matrix(${d.matrix.map(fmt).join(' ')})"` +
            (d.opacity < 0.999 ? ` opacity="${fmt(d.opacity)}"` : '') + `>${d.layer.svg}</g>\n`;
  }
  const size = opts.size || 1024;
  const vb = opts.viewBox || [0,0,1024,1024];   /* widen for clips that travel, e.g. hop */
  const ar = vb[3] ? vb[2]/vb[3] : 1;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb.join(' ')}" ` +
         `width="${size}" height="${Math.round(size/ar)}">\n` +
         character.defs + '\n' + body + `</svg>\n`;
}

/* ============================================================ */
/* RASTERISER (browser)                                         */
/* ============================================================ */

function decodeToCanvas(src, w, h){
  return new Promise((resolve,reject)=>{
    const cv = document.createElement('canvas');
    cv.width = w; cv.height = h;
    const c = cv.getContext('2d');
    const img = new Image();
    let settled = false;
    const timer = setTimeout(()=>{ if(!settled){ settled = true; reject(new Error('decode timed out')); } }, 8000);
    img.onload = ()=>{
      if(settled) return; settled = true; clearTimeout(timer);
      try { c.clearRect(0,0,w,h); c.drawImage(img,0,0,w,h); resolve(cv); }
      catch(err){ reject(err); }
    };
    img.onerror = ()=>{ if(settled) return; settled = true; clearTimeout(timer); reject(new Error('image decode failed')); };
    img.src = src;
  });
}
/* Some in-app WebViews never fire load/error for SVG data URIs, so each decode
   is bounded by a timeout and retried through a blob URL before giving up. */
async function rasterise(svgText, w, h){
  const uri = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgText);
  try { return await decodeToCanvas(uri, w, h); }
  catch(err){
    const url = URL.createObjectURL(new Blob([svgText], { type:'image/svg+xml' }));
    try { return await decodeToCanvas(url, w, h); }
    finally { URL.revokeObjectURL(url); }
  }
}
function measureBox(layer, character, probe){
  if(layer.box) return { x:layer.box[0], y:layer.box[1], w:layer.box[2], h:layer.box[3] };
  try {
    const g = document.createElementNS('http://www.w3.org/2000/svg','g');
    g.innerHTML = character.defs + layer.svg;
    probe.appendChild(g);
    const b = g.getBBox();
    probe.removeChild(g);
    if(b && b.width > 0 && b.height > 0) return { x:b.x, y:b.y, w:b.width, h:b.height };
  } catch(err){ /* getBBox is unreliable in hidden subtrees on some engines */ }
  return { x:0, y:0, w:1024, h:1024 };
}

/** Rasterise every layer once. Returns { id: {canvas, box} }. */
export async function buildRasters(character, opts){
  opts = opts || {};
  const scale = opts.scale || 2.2, max = opts.maxTexture || 2048;
  const host = document.createElement('div');
  host.setAttribute('aria-hidden','true');
  host.style.cssText = 'position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);';
  document.body.appendChild(host);
  const probe = document.createElementNS('http://www.w3.org/2000/svg','svg');
  probe.setAttribute('viewBox','0 0 1024 1024');
  probe.setAttribute('width','1024'); probe.setAttribute('height','1024');
  probe.style.cssText = 'position:absolute;opacity:0;pointer-events:none';
  host.appendChild(probe);

  const rasters = {}; const failed = []; let done = 0;
  try {
    for(const layer of character.layers){
      const pad = (layer.pad===undefined ? 10 : layer.pad);
      const raw = measureBox(layer, character, probe);
      const box = { x:raw.x-pad, y:raw.y-pad, w:raw.w+pad*2, h:raw.h+pad*2 };
      let tw = Math.round(box.w*scale), th = Math.round(box.h*scale);
      const m = Math.max(tw,th);
      if(m > max){ const k = max/m; tw = Math.round(tw*k); th = Math.round(th*k); }
      tw = Math.max(8,tw); th = Math.max(8,th);
      const doc = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${box.x} ${box.y} ${box.w} ${box.h}" ` +
                  `width="${tw}" height="${th}">${character.defs}${layer.svg}</svg>`;
      try { rasters[layer.id] = { canvas: await rasterise(doc, tw, th), box }; }
      catch(err){ failed.push(layer.id + ': ' + err.message); }
      if(opts.onProgress) opts.onProgress(++done / character.layers.length);
    }
  } finally { host.remove(); }
  if(!Object.keys(rasters).length)
    throw new Error('No layer could be rasterised — inline SVG images are unavailable here. ' + failed.join('; '));
  rasters.__failed = failed;
  return rasters;
}

/* ============================================================ */
/* RIG INSTANCE                                                 */
/* ============================================================ */

export class CharacterRig {
  constructor(character, rasters, opts){
    opts = opts || {};
    this.character = character;
    this.rasters = rasters;
    this.canvas = opts.canvas || null;
    this.ctx = (this.canvas && opts.renderer !== 'none') ? this.canvas.getContext('2d') : null;
    this.fit = opts.fit || character.fit || 1240;
    this.dpr = opts.pixelRatio || (typeof window !== 'undefined' ? Math.min(window.devicePixelRatio||1,2) : 1);
    this.layerState = defaultLayerState(character);
    this.isolateGroup = null;
    this.onFrame = opts.onFrame || null;
    this._raf = 0; this._last = 0; this._pointerEl = null;

    this.s = {
      time:0, speed:opts.speed || 1, paused:false,
      reduced: opts.reducedMotion === true || (opts.reducedMotion !== false && prefersReducedMotion()),
      base:'idle', baseT:0, basePrev:null, basePrevT:0, baseBlend:1, blendDur:0.30,
      face:'neutral', facePrev:null, faceBlend:1, faceBlendDur:0.24,
      look:{x:0,y:0}, lookTarget:{x:0,y:0}, lookHold:0,
      autoBlink: opts.autoBlink !== false, blinkAt:-99,
      talk:0, talkT:0, mouthPose:'smile',
      turn:0, turnTarget:0,
      springs:{ ear:0, earV:0, crest:0, crestV:0 },
      lastHeadX:0, lastHeadRot:0
    };
    this.pose = buildPose(this._descriptor(), character);
    if(this.canvas) this.resize();
  }

  get animations(){ return this.character.animations.slice(); }

  /* ---- playback ---- */
  play(name, opts){
    opts = opts || {};
    if(this.character.animations.indexOf(name) < 0) return this;
    const s = this.s;
    if(s.base !== name || opts.restart){
      s.basePrev = s.base; s.basePrevT = s.baseT; s.baseBlend = 0;
      s.base = name; s.baseT = 0;
    }
    const face = opts.face || ANIM_FACE[name] || 'neutral';
    if(s.face !== face){ s.facePrev = s.face; s.faceBlend = 0; s.face = face; }
    if(name === 'talk'){ s.talk = Math.max(s.talk, 1); s.mouthPose = 'auto'; }
    return this;
  }
  hop(){ return this.play('hop', { restart:true }); }
  jump(){ return this.hop(); }
  glitch(){ return this.play('glitch', { restart:true }); }
  error(){ return this.play('error', { restart:true }); }
  setFace(name){
    const s = this.s;
    if(FACES[name] && s.face !== name){ s.facePrev = s.face; s.faceBlend = 0; s.face = name; }
    return this;
  }
  blink(){ this.s.blinkAt = this.s.time; return this; }
  look(x, y, holdSeconds){
    this.s.lookTarget.x = clamp(x,-1,1);
    this.s.lookTarget.y = clamp(y||0,-1,1);
    this.s.lookHold = (holdSeconds===undefined) ? 0 : holdSeconds;
    return this;
  }
  setTurn(t){ this.s.turnTarget = clamp(t,-1,1); return this; }
  setTalk(v){ this.s.talk = clamp(v,0,1); if(v>0.01) this.s.mouthPose='auto'; return this; }
  setMouth(pose){ this.s.mouthPose = pose; return this; }
  setSpeed(v){ this.s.speed = Math.max(0, v); return this; }
  setPaused(v){ this.s.paused = !!v; return this; }
  setReducedMotion(v){ this.s.reduced = !!v; return this; }
  setAutoBlink(v){ this.s.autoBlink = !!v; return this; }

  /* ---- layers ---- */
  setLayerVisible(id, v){ if(this.layerState[id]) this.layerState[id].visible = !!v; return this; }
  setGroupVisible(group, v){
    for(const l of this.character.layers) if(l.group === group) this.layerState[l.id].visible = !!v;
    return this;
  }
  isolate(group){ this.isolateGroup = group || null; return this; }
  resetLayers(){ this.layerState = defaultLayerState(this.character); this.isolateGroup = null; return this; }

  /* ---- pointer ---- */
  followPointer(el){
    this.unfollowPointer();
    el = el || this.canvas; if(!el) return this;
    this._pointerEl = el;
    this._onPointer = (ev)=>{
      const r = el.getBoundingClientRect();
      this.look(((ev.clientX-r.left)/r.width)*2-1, ((ev.clientY-r.top)/r.height)*2-1);
    };
    this._onLeave = ()=> this.look(0,0);
    el.addEventListener('pointermove', this._onPointer);
    el.addEventListener('pointerleave', this._onLeave);
    return this;
  }
  unfollowPointer(){
    if(this._pointerEl && this._onPointer){
      this._pointerEl.removeEventListener('pointermove', this._onPointer);
      this._pointerEl.removeEventListener('pointerleave', this._onLeave);
    }
    this._pointerEl = null; this._onPointer = null;
    return this;
  }

  /* ---- frame ---- */
  _descriptor(){
    const s = this.s;
    let blink = 0;
    if(s.autoBlink) blink = scheduledBlink(s.time);
    const d = s.time - s.blinkAt;
    if(d >= 0 && d < BLINK_DURATION) blink = Math.max(blink, blinkCurve(d/BLINK_DURATION));
    return {
      base:s.base, baseT:s.baseT, basePrev:s.basePrev, basePrevT:s.basePrevT, baseBlend:s.baseBlend,
      face:s.face, facePrev:s.facePrev, faceBlend:s.faceBlend,
      look:s.look, blink, talk:s.talk, talkT:s.talkT, mouthPose:s.mouthPose,
      turn:s.turn, reduced:s.reduced, springs:s.springs
    };
  }

  /** Advance by dt seconds without drawing. */
  update(dt){
    const s = this.s;
    const step = s.paused ? 0 : dt * s.speed;
    s.time += step; s.baseT += step; s.basePrevT += step;

    const dur = CLIP_DURATION[s.base];
    if(dur && s.baseT >= dur) this.play('idle');
    if(s.baseBlend < 1) s.baseBlend = Math.min(1, s.baseBlend + step/s.blendDur);
    if(s.faceBlend < 1) s.faceBlend = Math.min(1, s.faceBlend + step/s.faceBlendDur);
    if(s.baseBlend >= 1) s.basePrev = null;
    if(s.faceBlend >= 1) s.facePrev = null;

    if(s.base === 'talk'){ s.talk = Math.min(1, s.talk + step*4); s.talkT += step; }
    else s.talk = Math.max(0, s.talk - step*3);

    if(s.lookHold > 0) s.lookHold -= step;
    else if(!this._pointerEl){
      const sc = saccadeAt(s.time);
      s.lookTarget.x = sc.x; s.lookTarget.y = sc.y;
    }
    const k = 1 - Math.pow(0.0016, Math.max(step,0));
    s.look.x += (s.lookTarget.x - s.look.x)*k;
    s.look.y += (s.lookTarget.y - s.look.y)*k;
    s.turn += (s.turnTarget - s.turn)*(1 - Math.pow(0.002, Math.max(step,0)));

    /* spring lag so the ears and crest trail the head */
    const sdt = Math.max(dt, 1e-4);
    const vx = (this.pose.headX - s.lastHeadX)/sdt, vr = (this.pose.headRot - s.lastHeadRot)/sdt;
    s.lastHeadX = this.pose.headX; s.lastHeadRot = this.pose.headRot;
    const drive = clamp(-vx*0.0016 - vr*0.55, -0.5, 0.5);
    const sp = s.springs;
    const spring = (val, vel, target, freq, damp)=>{
      const w = 2*Math.PI*freq;
      vel += (w*w*(target-val) - 2*damp*w*vel)*sdt;
      return [val + vel*sdt, vel];
    };
    [sp.ear,   sp.earV  ] = spring(sp.ear,   sp.earV,   drive,      2.6, 0.55);
    [sp.crest, sp.crestV] = spring(sp.crest, sp.crestV, drive*0.85, 2.2, 0.5 );

    this.pose = buildPose(this._descriptor(), this.character);
    if(this.onFrame) this.onFrame(this.pose, this);
    return this.pose;
  }

  resize(w, h){
    if(!this.canvas) return this;
    const cw = w || this.canvas.clientWidth || this.canvas.width  || 512;
    const ch = h || this.canvas.clientHeight|| this.canvas.height || 512;
    this.canvas.width  = Math.max(1, Math.round(cw*this.dpr));
    this.canvas.height = Math.max(1, Math.round(ch*this.dpr));
    return this;
  }

  render(){
    if(!this.ctx) return this;
    this.drawInto(this.ctx, this.canvas.width, this.canvas.height, this.pose);
    return this;
  }

  drawInto(ctx, w, h, pose, fitUnits){
    pose = pose || this.pose;
    ctx.setTransform(1,0,0,1,0,0);
    ctx.clearRect(0,0,w,h);
    const k = Math.min(w,h)/(fitUnits || this.fit);
    ctx.save();
    ctx.translate(w/2, h/2); ctx.scale(k,k); ctx.translate(-512,-512);
    for(const d of drawList(pose, this.character, this.layerState, this.isolateGroup)){
      const r = this.rasters[d.layer.id]; if(!r) continue;
      const m = d.matrix;
      ctx.save();
      ctx.globalAlpha = clamp(d.opacity,0,1);
      ctx.transform(m[0],m[1],m[2],m[3],m[4],m[5]);
      ctx.drawImage(r.canvas, r.box.x, r.box.y, r.box.w, r.box.h);
      ctx.restore();
    }
    ctx.restore();
    return this;
  }

  start(){
    if(this._raf) return this;
    this._last = now();
    const tick = ()=>{
      this._raf = requestAnimationFrame(tick);
      const t = now(), dt = Math.min(0.05, (t - this._last)/1000);
      this._last = t;
      this.update(dt);
      this.render();
    };
    this._raf = requestAnimationFrame(tick);
    return this;
  }
  stop(){ if(this._raf){ cancelAnimationFrame(this._raf); this._raf = 0; } return this; }
  destroy(){ this.stop(); this.unfollowPointer(); this.rasters = null; this.ctx = null; return this; }

  /* ---- output ---- */
  /** Everything an external renderer needs for the current pose. */
  getLayerDraws(pose){
    return drawList(pose || this.pose, this.character, this.layerState, this.isolateGroup).map(d=>({
      id: d.layer.id + d.suffix, layerId: d.layer.id, group: d.layer.group, node: d.layer.node,
      order: d.layer.order, depth: d.layer.depth, matrix: d.matrix, opacity: d.opacity,
      image: this.rasters ? (this.rasters[d.layer.id]||{}).canvas : null,
      box:   this.rasters ? (this.rasters[d.layer.id]||{}).box : null,
      svg: d.layer.svg
    }));
  }
  getNodeTransforms(pose){ return poseToNodes(pose || this.pose, this.character); }
  toSVG(size, viewBox){
    return renderSVG(this.pose, this.character,
      { layerState:this.layerState, isolate:this.isolateGroup, size, viewBox });
  }
  toPNG(size){
    size = size || 1024;
    const cv = document.createElement('canvas');
    cv.width = cv.height = size;
    this.drawInto(cv.getContext('2d'), size, size, this.pose, 1220);
    return cv.toDataURL('image/png');
  }
}

function now(){ return (typeof performance !== 'undefined' ? performance.now() : Date.now()); }
function prefersReducedMotion(){
  return (typeof window !== 'undefined' && window.matchMedia)
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;
}

/**
 * Build a rig. Rasterises every layer once, then returns a ready instance.
 * @param {object} character imported from ./characters/zip.js or ./characters/mixy.js
 * @param {object} [opts] see README
 */
export async function createRig(character, opts){
  opts = opts || {};
  const rasters = await buildRasters(character, opts);
  return new CharacterRig(character, rasters, opts);
}

export default { createRig, CharacterRig, buildPose, poseToNodes, renderSVG, restPose,
                 layerMatrix, defaultLayerState, buildRasters, glitchStep,
                 FACES, MOUTH_POSES, MOUTH_ORDER, PHONEME_LABEL,
                 CLIP_DURATION, CLIP_LOOP, TURN_MAX_DEGREES, BLINK_DURATION, VERSION };
