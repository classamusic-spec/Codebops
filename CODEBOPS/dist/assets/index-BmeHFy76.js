(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();function I(i,t,e,n){const s=document.createElement(i);return t&&(s.className=t),n!==void 0&&(s.textContent=n),e&&e.appendChild(s),s}const fh=[{ch:"C",color:"#38b6ff"},{ch:"o",color:"#7de08a"},{ch:"d",color:"#ffd23e"},{ch:"e",color:"#5ee8c7"},{ch:"B",color:"#ff5fa2"},{ch:"o",color:"#ff9f2e"},{ch:"p",color:"#a06bff"},{ch:"s",color:"#7de08a"}];function ac(i,t){const e=I("div",t,i);return e.setAttribute("aria-label","CodeBops"),fh.forEach(({ch:n,color:s},r)=>{const o=I("span",void 0,e,n);o.style.setProperty("--c",s),o.style.setProperty("--i",String(r+1))}),e}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const ua="171",ph=0,Va=1,mh=2,lc=1,cc=2,Mn=3,Hn=0,Ge=1,Qe=2,kn=0,Oi=1,ds=2,Wa=3,Xa=4,gh=5,ri=100,_h=101,vh=102,xh=103,yh=104,bh=200,Mh=201,Sh=202,wh=203,bo=204,Mo=205,Eh=206,Th=207,Ah=208,Rh=209,Ch=210,Ph=211,Lh=212,Dh=213,Ih=214,So=0,wo=1,Eo=2,zi=3,To=4,Ao=5,Ro=6,Co=7,hc=0,Uh=1,Nh=2,zn=0,Fh=1,Oh=2,Bh=3,uc=4,kh=5,zh=6,Gh=7,dc=300,Gi=301,Hi=302,Po=303,Lo=304,Ar=306,mr=1e3,ai=1001,Do=1002,Be=1003,Hh=1004,Cs=1005,fn=1006,Fr=1007,li=1008,An=1009,fc=1010,pc=1011,fs=1012,da=1013,ci=1014,wn=1015,xs=1016,fa=1017,pa=1018,Vi=1020,mc=35902,gc=1021,_c=1022,cn=1023,vc=1024,xc=1025,Bi=1026,Wi=1027,ma=1028,ga=1029,yc=1030,_a=1031,va=1033,lr=33776,cr=33777,hr=33778,ur=33779,Io=35840,Uo=35841,No=35842,Fo=35843,Oo=36196,Bo=37492,ko=37496,zo=37808,Go=37809,Ho=37810,Vo=37811,Wo=37812,Xo=37813,Yo=37814,qo=37815,$o=37816,jo=37817,Zo=37818,Jo=37819,Ko=37820,Qo=37821,dr=36492,ta=36494,ea=36495,bc=36283,na=36284,ia=36285,sa=36286,Vh=3200,Wh=3201,Mc=0,Xh=1,Bn="",Oe="srgb",Xi="srgb-linear",gr="linear",le="srgb",gi=7680,Ya=519,Yh=512,qh=513,$h=514,Sc=515,jh=516,Zh=517,Jh=518,Kh=519,qa=35044,$a="300 es",En=2e3,_r=2001;class qi{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const s=this._listeners[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}}const Le=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let ja=1234567;const as=Math.PI/180,ps=180/Math.PI;function fi(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Le[i&255]+Le[i>>8&255]+Le[i>>16&255]+Le[i>>24&255]+"-"+Le[t&255]+Le[t>>8&255]+"-"+Le[t>>16&15|64]+Le[t>>24&255]+"-"+Le[e&63|128]+Le[e>>8&255]+"-"+Le[e>>16&255]+Le[e>>24&255]+Le[n&255]+Le[n>>8&255]+Le[n>>16&255]+Le[n>>24&255]).toLowerCase()}function Wt(i,t,e){return Math.max(t,Math.min(e,i))}function xa(i,t){return(i%t+t)%t}function Qh(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function tu(i,t,e){return i!==t?(e-i)/(t-i):0}function ls(i,t,e){return(1-e)*i+e*t}function eu(i,t,e,n){return ls(i,t,1-Math.exp(-e*n))}function nu(i,t=1){return t-Math.abs(xa(i,t*2)-t)}function iu(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function su(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function ru(i,t){return i+Math.floor(Math.random()*(t-i+1))}function ou(i,t){return i+Math.random()*(t-i)}function au(i){return i*(.5-Math.random())}function lu(i){i!==void 0&&(ja=i);let t=ja+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function cu(i){return i*as}function hu(i){return i*ps}function uu(i){return(i&i-1)===0&&i!==0}function du(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function fu(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function pu(i,t,e,n,s){const r=Math.cos,o=Math.sin,a=r(e/2),l=o(e/2),c=r((t+n)/2),h=o((t+n)/2),u=r((t-n)/2),d=o((t-n)/2),p=r((n-t)/2),g=o((n-t)/2);switch(s){case"XYX":i.set(a*h,l*u,l*d,a*c);break;case"YZY":i.set(l*d,a*h,l*u,a*c);break;case"ZXZ":i.set(l*u,l*d,a*h,a*c);break;case"XZX":i.set(a*h,l*g,l*p,a*c);break;case"YXY":i.set(l*p,a*h,l*g,a*c);break;case"ZYZ":i.set(l*g,l*p,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Di(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Ne(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const mu={DEG2RAD:as,RAD2DEG:ps,generateUUID:fi,clamp:Wt,euclideanModulo:xa,mapLinear:Qh,inverseLerp:tu,lerp:ls,damp:eu,pingpong:nu,smoothstep:iu,smootherstep:su,randInt:ru,randFloat:ou,randFloatSpread:au,seededRandom:lu,degToRad:cu,radToDeg:hu,isPowerOfTwo:uu,ceilPowerOfTwo:du,floorPowerOfTwo:fu,setQuaternionFromProperEuler:pu,normalize:Ne,denormalize:Di};class at{constructor(t=0,e=0){at.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Wt(this.x,t.x,e.x),this.y=Wt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Wt(this.x,t,e),this.y=Wt(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Wt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Wt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Gt{constructor(t,e,n,s,r,o,a,l,c){Gt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,l,c)}set(t,e,n,s,r,o,a,l,c){const h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],p=n[5],g=n[8],x=s[0],m=s[3],f=s[6],b=s[1],v=s[4],_=s[7],P=s[2],A=s[5],E=s[8];return r[0]=o*x+a*b+l*P,r[3]=o*m+a*v+l*A,r[6]=o*f+a*_+l*E,r[1]=c*x+h*b+u*P,r[4]=c*m+h*v+u*A,r[7]=c*f+h*_+u*E,r[2]=d*x+p*b+g*P,r[5]=d*m+p*v+g*A,r[8]=d*f+p*_+g*E,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*o*h-e*a*c-n*r*h+n*a*l+s*r*c-s*o*l}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=h*o-a*c,d=a*l-h*r,p=c*r-o*l,g=e*u+n*d+s*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/g;return t[0]=u*x,t[1]=(s*c-h*n)*x,t[2]=(a*n-s*o)*x,t[3]=d*x,t[4]=(h*e-s*l)*x,t[5]=(s*r-a*e)*x,t[6]=p*x,t[7]=(n*l-c*e)*x,t[8]=(o*e-n*r)*x,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+t,-s*c,s*l,-s*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Or.makeScale(t,e)),this}rotate(t){return this.premultiply(Or.makeRotation(-t)),this}translate(t,e){return this.premultiply(Or.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Or=new Gt;function wc(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function vr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function gu(){const i=vr("canvas");return i.style.display="block",i}const Za={};function Ii(i){i in Za||(Za[i]=!0,console.warn(i))}function _u(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function vu(i){const t=i.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function xu(i){const t=i.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const Ja=new Gt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ka=new Gt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function yu(){const i={enabled:!0,workingColorSpace:Xi,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===le&&(s.r=Tn(s.r),s.g=Tn(s.g),s.b=Tn(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===le&&(s.r=ki(s.r),s.g=ki(s.g),s.b=ki(s.b))),s},fromWorkingColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},toWorkingColorSpace:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Bn?gr:this.spaces[s].transfer},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Xi]:{primaries:t,whitePoint:n,transfer:gr,toXYZ:Ja,fromXYZ:Ka,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Oe},outputColorSpaceConfig:{drawingBufferColorSpace:Oe}},[Oe]:{primaries:t,whitePoint:n,transfer:le,toXYZ:Ja,fromXYZ:Ka,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Oe}}}),i}const Qt=yu();function Tn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function ki(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let _i;class bu{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{_i===void 0&&(_i=vr("canvas")),_i.width=t.width,_i.height=t.height;const n=_i.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=_i}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=vr("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Tn(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Tn(e[n]/255)*255):e[n]=Tn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Mu=0;class Ec{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Mu++}),this.uuid=fi(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Br(s[o].image)):r.push(Br(s[o]))}else r=Br(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function Br(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?bu.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Su=0;class Ce extends qi{constructor(t=Ce.DEFAULT_IMAGE,e=Ce.DEFAULT_MAPPING,n=ai,s=ai,r=fn,o=li,a=cn,l=An,c=Ce.DEFAULT_ANISOTROPY,h=Bn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Su++}),this.uuid=fi(),this.name="",this.source=new Ec(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new at(0,0),this.repeat=new at(1,1),this.center=new at(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Gt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==dc)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case mr:t.x=t.x-Math.floor(t.x);break;case ai:t.x=t.x<0?0:1;break;case Do:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case mr:t.y=t.y-Math.floor(t.y);break;case ai:t.y=t.y<0?0:1;break;case Do:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Ce.DEFAULT_IMAGE=null;Ce.DEFAULT_MAPPING=dc;Ce.DEFAULT_ANISOTROPY=1;class xe{constructor(t=0,e=0,n=0,s=1){xe.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const l=t.elements,c=l[0],h=l[4],u=l[8],d=l[1],p=l[5],g=l[9],x=l[2],m=l[6],f=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-x)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+x)<.1&&Math.abs(g+m)<.1&&Math.abs(c+p+f-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const v=(c+1)/2,_=(p+1)/2,P=(f+1)/2,A=(h+d)/4,E=(u+x)/4,C=(g+m)/4;return v>_&&v>P?v<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(v),s=A/n,r=E/n):_>P?_<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(_),n=A/s,r=C/s):P<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(P),n=E/r,s=C/r),this.set(n,s,r,e),this}let b=Math.sqrt((m-g)*(m-g)+(u-x)*(u-x)+(d-h)*(d-h));return Math.abs(b)<.001&&(b=1),this.x=(m-g)/b,this.y=(u-x)/b,this.z=(d-h)/b,this.w=Math.acos((c+p+f-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Wt(this.x,t.x,e.x),this.y=Wt(this.y,t.y,e.y),this.z=Wt(this.z,t.z,e.z),this.w=Wt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Wt(this.x,t,e),this.y=Wt(this.y,t,e),this.z=Wt(this.z,t,e),this.w=Wt(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Wt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class wu extends qi{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new xe(0,0,t,e),this.scissorTest=!1,this.viewport=new xe(0,0,t,e);const s={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:fn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new Ce(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,s=t.textures.length;n<s;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Ec(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class hi extends wu{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Tc extends Ce{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Be,this.minFilter=Be,this.wrapR=ai,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Eu extends Ce{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Be,this.minFilter=Be,this.wrapR=ai,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ys{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let l=n[s+0],c=n[s+1],h=n[s+2],u=n[s+3];const d=r[o+0],p=r[o+1],g=r[o+2],x=r[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=d,t[e+1]=p,t[e+2]=g,t[e+3]=x;return}if(u!==x||l!==d||c!==p||h!==g){let m=1-a;const f=l*d+c*p+h*g+u*x,b=f>=0?1:-1,v=1-f*f;if(v>Number.EPSILON){const P=Math.sqrt(v),A=Math.atan2(P,f*b);m=Math.sin(m*A)/P,a=Math.sin(a*A)/P}const _=a*b;if(l=l*m+d*_,c=c*m+p*_,h=h*m+g*_,u=u*m+x*_,m===1-a){const P=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=P,c*=P,h*=P,u*=P}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,s,r,o){const a=n[s],l=n[s+1],c=n[s+2],h=n[s+3],u=r[o],d=r[o+1],p=r[o+2],g=r[o+3];return t[e]=a*g+h*u+l*p-c*d,t[e+1]=l*g+h*d+c*u-a*p,t[e+2]=c*g+h*p+a*d-l*u,t[e+3]=h*g-a*u-l*d-c*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(s/2),u=a(r/2),d=l(n/2),p=l(s/2),g=l(r/2);switch(o){case"XYZ":this._x=d*h*u+c*p*g,this._y=c*p*u-d*h*g,this._z=c*h*g+d*p*u,this._w=c*h*u-d*p*g;break;case"YXZ":this._x=d*h*u+c*p*g,this._y=c*p*u-d*h*g,this._z=c*h*g-d*p*u,this._w=c*h*u+d*p*g;break;case"ZXY":this._x=d*h*u-c*p*g,this._y=c*p*u+d*h*g,this._z=c*h*g+d*p*u,this._w=c*h*u-d*p*g;break;case"ZYX":this._x=d*h*u-c*p*g,this._y=c*p*u+d*h*g,this._z=c*h*g-d*p*u,this._w=c*h*u+d*p*g;break;case"YZX":this._x=d*h*u+c*p*g,this._y=c*p*u+d*h*g,this._z=c*h*g-d*p*u,this._w=c*h*u-d*p*g;break;case"XZY":this._x=d*h*u-c*p*g,this._y=c*p*u-d*h*g,this._z=c*h*g+d*p*u,this._w=c*h*u+d*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],h=e[6],u=e[10],d=n+a+u;if(d>0){const p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(h-l)*p,this._y=(r-c)*p,this._z=(o-s)*p}else if(n>a&&n>u){const p=2*Math.sqrt(1+n-a-u);this._w=(h-l)/p,this._x=.25*p,this._y=(s+o)/p,this._z=(r+c)/p}else if(a>u){const p=2*Math.sqrt(1+a-n-u);this._w=(r-c)/p,this._x=(s+o)/p,this._y=.25*p,this._z=(l+h)/p}else{const p=2*Math.sqrt(1+u-n-a);this._w=(o-s)/p,this._x=(r+c)/p,this._y=(l+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Wt(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+o*a+s*c-r*l,this._y=s*h+o*l+r*a-n*c,this._z=r*h+o*c+n*l-s*a,this._w=o*h-n*a-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,s=this._y,r=this._z,o=this._w;let a=o*t._w+n*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const p=1-e;return this._w=p*o+e*this._w,this._x=p*n+e*this._x,this._y=p*s+e*this._y,this._z=p*r+e*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-e)*h)/c,d=Math.sin(e*h)/c;return this._w=o*u+this._w*d,this._x=n*u+this._x*d,this._y=s*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class D{constructor(t=0,e=0,n=0){D.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Qa.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Qa.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*s-a*n),h=2*(a*e-r*s),u=2*(r*n-o*e);return this.x=e+l*c+o*u-a*h,this.y=n+l*h+a*c-r*u,this.z=s+l*u+r*h-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Wt(this.x,t.x,e.x),this.y=Wt(this.y,t.y,e.y),this.z=Wt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Wt(this.x,t,e),this.y=Wt(this.y,t,e),this.z=Wt(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Wt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=s*l-r*a,this.y=r*o-n*l,this.z=n*a-s*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return kr.copy(this).projectOnVector(t),this.sub(kr)}reflect(t){return this.sub(kr.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Wt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const kr=new D,Qa=new ys;class bs{constructor(t=new D(1/0,1/0,1/0),e=new D(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(sn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(sn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=sn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,sn):sn.fromBufferAttribute(r,o),sn.applyMatrix4(t.matrixWorld),this.expandByPoint(sn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Ps.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ps.copy(n.boundingBox)),Ps.applyMatrix4(t.matrixWorld),this.union(Ps)}const s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,sn),sn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Ji),Ls.subVectors(this.max,Ji),vi.subVectors(t.a,Ji),xi.subVectors(t.b,Ji),yi.subVectors(t.c,Ji),Pn.subVectors(xi,vi),Ln.subVectors(yi,xi),$n.subVectors(vi,yi);let e=[0,-Pn.z,Pn.y,0,-Ln.z,Ln.y,0,-$n.z,$n.y,Pn.z,0,-Pn.x,Ln.z,0,-Ln.x,$n.z,0,-$n.x,-Pn.y,Pn.x,0,-Ln.y,Ln.x,0,-$n.y,$n.x,0];return!zr(e,vi,xi,yi,Ls)||(e=[1,0,0,0,1,0,0,0,1],!zr(e,vi,xi,yi,Ls))?!1:(Ds.crossVectors(Pn,Ln),e=[Ds.x,Ds.y,Ds.z],zr(e,vi,xi,yi,Ls))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,sn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(sn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(gn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),gn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),gn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),gn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),gn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),gn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),gn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),gn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(gn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const gn=[new D,new D,new D,new D,new D,new D,new D,new D],sn=new D,Ps=new bs,vi=new D,xi=new D,yi=new D,Pn=new D,Ln=new D,$n=new D,Ji=new D,Ls=new D,Ds=new D,jn=new D;function zr(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){jn.fromArray(i,r);const a=s.x*Math.abs(jn.x)+s.y*Math.abs(jn.y)+s.z*Math.abs(jn.z),l=t.dot(jn),c=e.dot(jn),h=n.dot(jn);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const Tu=new bs,Ki=new D,Gr=new D;class Ms{constructor(t=new D,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Tu.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Ki.subVectors(t,this.center);const e=Ki.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Ki,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Gr.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Ki.copy(t.center).add(Gr)),this.expandByPoint(Ki.copy(t.center).sub(Gr))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const _n=new D,Hr=new D,Is=new D,Dn=new D,Vr=new D,Us=new D,Wr=new D;class ya{constructor(t=new D,e=new D(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,_n)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=_n.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(_n.copy(this.origin).addScaledVector(this.direction,e),_n.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Hr.copy(t).add(e).multiplyScalar(.5),Is.copy(e).sub(t).normalize(),Dn.copy(this.origin).sub(Hr);const r=t.distanceTo(e)*.5,o=-this.direction.dot(Is),a=Dn.dot(this.direction),l=-Dn.dot(Is),c=Dn.lengthSq(),h=Math.abs(1-o*o);let u,d,p,g;if(h>0)if(u=o*l-a,d=o*a-l,g=r*h,u>=0)if(d>=-g)if(d<=g){const x=1/h;u*=x,d*=x,p=u*(u+o*d+2*a)+d*(o*u+d+2*l)+c}else d=r,u=Math.max(0,-(o*d+a)),p=-u*u+d*(d+2*l)+c;else d=-r,u=Math.max(0,-(o*d+a)),p=-u*u+d*(d+2*l)+c;else d<=-g?(u=Math.max(0,-(-o*r+a)),d=u>0?-r:Math.min(Math.max(-r,-l),r),p=-u*u+d*(d+2*l)+c):d<=g?(u=0,d=Math.min(Math.max(-r,-l),r),p=d*(d+2*l)+c):(u=Math.max(0,-(o*r+a)),d=u>0?r:Math.min(Math.max(-r,-l),r),p=-u*u+d*(d+2*l)+c);else d=o>0?-r:r,u=Math.max(0,-(o*d+a)),p=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(Hr).addScaledVector(Is,d),p}intersectSphere(t,e){_n.subVectors(t.center,this.origin);const n=_n.dot(this.direction),s=_n.dot(_n)-n*n,r=t.radius*t.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(t.min.x-d.x)*c,s=(t.max.x-d.x)*c):(n=(t.max.x-d.x)*c,s=(t.min.x-d.x)*c),h>=0?(r=(t.min.y-d.y)*h,o=(t.max.y-d.y)*h):(r=(t.max.y-d.y)*h,o=(t.min.y-d.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(t.min.z-d.z)*u,l=(t.max.z-d.z)*u):(a=(t.max.z-d.z)*u,l=(t.min.z-d.z)*u),n>l||a>s)||((a>n||n!==n)&&(n=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,_n)!==null}intersectTriangle(t,e,n,s,r){Vr.subVectors(e,t),Us.subVectors(n,t),Wr.crossVectors(Vr,Us);let o=this.direction.dot(Wr),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Dn.subVectors(this.origin,t);const l=a*this.direction.dot(Us.crossVectors(Dn,Us));if(l<0)return null;const c=a*this.direction.dot(Vr.cross(Dn));if(c<0||l+c>o)return null;const h=-a*Dn.dot(Wr);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ue{constructor(t,e,n,s,r,o,a,l,c,h,u,d,p,g,x,m){ue.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,l,c,h,u,d,p,g,x,m)}set(t,e,n,s,r,o,a,l,c,h,u,d,p,g,x,m){const f=this.elements;return f[0]=t,f[4]=e,f[8]=n,f[12]=s,f[1]=r,f[5]=o,f[9]=a,f[13]=l,f[2]=c,f[6]=h,f[10]=u,f[14]=d,f[3]=p,f[7]=g,f[11]=x,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ue().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/bi.setFromMatrixColumn(t,0).length(),r=1/bi.setFromMatrixColumn(t,1).length(),o=1/bi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const d=o*h,p=o*u,g=a*h,x=a*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=p+g*c,e[5]=d-x*c,e[9]=-a*l,e[2]=x-d*c,e[6]=g+p*c,e[10]=o*l}else if(t.order==="YXZ"){const d=l*h,p=l*u,g=c*h,x=c*u;e[0]=d+x*a,e[4]=g*a-p,e[8]=o*c,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=p*a-g,e[6]=x+d*a,e[10]=o*l}else if(t.order==="ZXY"){const d=l*h,p=l*u,g=c*h,x=c*u;e[0]=d-x*a,e[4]=-o*u,e[8]=g+p*a,e[1]=p+g*a,e[5]=o*h,e[9]=x-d*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){const d=o*h,p=o*u,g=a*h,x=a*u;e[0]=l*h,e[4]=g*c-p,e[8]=d*c+x,e[1]=l*u,e[5]=x*c+d,e[9]=p*c-g,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){const d=o*l,p=o*c,g=a*l,x=a*c;e[0]=l*h,e[4]=x-d*u,e[8]=g*u+p,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-c*h,e[6]=p*u+g,e[10]=d-x*u}else if(t.order==="XZY"){const d=o*l,p=o*c,g=a*l,x=a*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=d*u+x,e[5]=o*h,e[9]=p*u-g,e[2]=g*u-p,e[6]=a*h,e[10]=x*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Au,t,Ru)}lookAt(t,e,n){const s=this.elements;return We.subVectors(t,e),We.lengthSq()===0&&(We.z=1),We.normalize(),In.crossVectors(n,We),In.lengthSq()===0&&(Math.abs(n.z)===1?We.x+=1e-4:We.z+=1e-4,We.normalize(),In.crossVectors(n,We)),In.normalize(),Ns.crossVectors(We,In),s[0]=In.x,s[4]=Ns.x,s[8]=We.x,s[1]=In.y,s[5]=Ns.y,s[9]=We.y,s[2]=In.z,s[6]=Ns.z,s[10]=We.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],p=n[13],g=n[2],x=n[6],m=n[10],f=n[14],b=n[3],v=n[7],_=n[11],P=n[15],A=s[0],E=s[4],C=s[8],S=s[12],y=s[1],L=s[5],k=s[9],O=s[13],W=s[2],Y=s[6],X=s[10],K=s[14],H=s[3],lt=s[7],gt=s[11],Mt=s[15];return r[0]=o*A+a*y+l*W+c*H,r[4]=o*E+a*L+l*Y+c*lt,r[8]=o*C+a*k+l*X+c*gt,r[12]=o*S+a*O+l*K+c*Mt,r[1]=h*A+u*y+d*W+p*H,r[5]=h*E+u*L+d*Y+p*lt,r[9]=h*C+u*k+d*X+p*gt,r[13]=h*S+u*O+d*K+p*Mt,r[2]=g*A+x*y+m*W+f*H,r[6]=g*E+x*L+m*Y+f*lt,r[10]=g*C+x*k+m*X+f*gt,r[14]=g*S+x*O+m*K+f*Mt,r[3]=b*A+v*y+_*W+P*H,r[7]=b*E+v*L+_*Y+P*lt,r[11]=b*C+v*k+_*X+P*gt,r[15]=b*S+v*O+_*K+P*Mt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],h=t[2],u=t[6],d=t[10],p=t[14],g=t[3],x=t[7],m=t[11],f=t[15];return g*(+r*l*u-s*c*u-r*a*d+n*c*d+s*a*p-n*l*p)+x*(+e*l*p-e*c*d+r*o*d-s*o*p+s*c*h-r*l*h)+m*(+e*c*u-e*a*p-r*o*u+n*o*p+r*a*h-n*c*h)+f*(-s*a*h-e*l*u+e*a*d+s*o*u-n*o*d+n*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=t[9],d=t[10],p=t[11],g=t[12],x=t[13],m=t[14],f=t[15],b=u*m*c-x*d*c+x*l*p-a*m*p-u*l*f+a*d*f,v=g*d*c-h*m*c-g*l*p+o*m*p+h*l*f-o*d*f,_=h*x*c-g*u*c+g*a*p-o*x*p-h*a*f+o*u*f,P=g*u*l-h*x*l-g*a*d+o*x*d+h*a*m-o*u*m,A=e*b+n*v+s*_+r*P;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const E=1/A;return t[0]=b*E,t[1]=(x*d*r-u*m*r-x*s*p+n*m*p+u*s*f-n*d*f)*E,t[2]=(a*m*r-x*l*r+x*s*c-n*m*c-a*s*f+n*l*f)*E,t[3]=(u*l*r-a*d*r-u*s*c+n*d*c+a*s*p-n*l*p)*E,t[4]=v*E,t[5]=(h*m*r-g*d*r+g*s*p-e*m*p-h*s*f+e*d*f)*E,t[6]=(g*l*r-o*m*r-g*s*c+e*m*c+o*s*f-e*l*f)*E,t[7]=(o*d*r-h*l*r+h*s*c-e*d*c-o*s*p+e*l*p)*E,t[8]=_*E,t[9]=(g*u*r-h*x*r-g*n*p+e*x*p+h*n*f-e*u*f)*E,t[10]=(o*x*r-g*a*r+g*n*c-e*x*c-o*n*f+e*a*f)*E,t[11]=(h*a*r-o*u*r-h*n*c+e*u*c+o*n*p-e*a*p)*E,t[12]=P*E,t[13]=(h*x*s-g*u*s+g*n*d-e*x*d-h*n*m+e*u*m)*E,t[14]=(g*a*s-o*x*s-g*n*l+e*x*l+o*n*m-e*a*m)*E,t[15]=(o*u*s-h*a*s+h*n*l-e*u*l-o*n*d+e*a*d)*E,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,l=t.z,c=r*o,h=r*a;return this.set(c*o+n,c*a-s*l,c*l+s*a,0,c*a+s*l,h*a+n,h*l-s*o,0,c*l-s*a,h*l+s*o,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,h=o+o,u=a+a,d=r*c,p=r*h,g=r*u,x=o*h,m=o*u,f=a*u,b=l*c,v=l*h,_=l*u,P=n.x,A=n.y,E=n.z;return s[0]=(1-(x+f))*P,s[1]=(p+_)*P,s[2]=(g-v)*P,s[3]=0,s[4]=(p-_)*A,s[5]=(1-(d+f))*A,s[6]=(m+b)*A,s[7]=0,s[8]=(g+v)*E,s[9]=(m-b)*E,s[10]=(1-(d+x))*E,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let r=bi.set(s[0],s[1],s[2]).length();const o=bi.set(s[4],s[5],s[6]).length(),a=bi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],rn.copy(this);const c=1/r,h=1/o,u=1/a;return rn.elements[0]*=c,rn.elements[1]*=c,rn.elements[2]*=c,rn.elements[4]*=h,rn.elements[5]*=h,rn.elements[6]*=h,rn.elements[8]*=u,rn.elements[9]*=u,rn.elements[10]*=u,e.setFromRotationMatrix(rn),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,s,r,o,a=En){const l=this.elements,c=2*r/(e-t),h=2*r/(n-s),u=(e+t)/(e-t),d=(n+s)/(n-s);let p,g;if(a===En)p=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===_r)p=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=En){const l=this.elements,c=1/(e-t),h=1/(n-s),u=1/(o-r),d=(e+t)*c,p=(n+s)*h;let g,x;if(a===En)g=(o+r)*u,x=-2*u;else if(a===_r)g=r*u,x=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=x,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const bi=new D,rn=new ue,Au=new D(0,0,0),Ru=new D(1,1,1),In=new D,Ns=new D,We=new D,tl=new ue,el=new ys;class Rn{constructor(t=0,e=0,n=0,s=Rn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],h=s[9],u=s[2],d=s[6],p=s[10];switch(e){case"XYZ":this._y=Math.asin(Wt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Wt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Wt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,p),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Wt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Wt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-Wt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return tl.makeRotationFromQuaternion(t),this.setFromRotationMatrix(tl,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return el.setFromEuler(this),this.setFromQuaternion(el,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Rn.DEFAULT_ORDER="XYZ";class Ac{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Cu=0;const nl=new D,Mi=new ys,vn=new ue,Fs=new D,Qi=new D,Pu=new D,Lu=new ys,il=new D(1,0,0),sl=new D(0,1,0),rl=new D(0,0,1),ol={type:"added"},Du={type:"removed"},Si={type:"childadded",child:null},Xr={type:"childremoved",child:null};class Se extends qi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Cu++}),this.uuid=fi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Se.DEFAULT_UP.clone();const t=new D,e=new Rn,n=new ys,s=new D(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ue},normalMatrix:{value:new Gt}}),this.matrix=new ue,this.matrixWorld=new ue,this.matrixAutoUpdate=Se.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Se.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ac,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Mi.setFromAxisAngle(t,e),this.quaternion.multiply(Mi),this}rotateOnWorldAxis(t,e){return Mi.setFromAxisAngle(t,e),this.quaternion.premultiply(Mi),this}rotateX(t){return this.rotateOnAxis(il,t)}rotateY(t){return this.rotateOnAxis(sl,t)}rotateZ(t){return this.rotateOnAxis(rl,t)}translateOnAxis(t,e){return nl.copy(t).applyQuaternion(this.quaternion),this.position.add(nl.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(il,t)}translateY(t){return this.translateOnAxis(sl,t)}translateZ(t){return this.translateOnAxis(rl,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(vn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Fs.copy(t):Fs.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Qi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?vn.lookAt(Qi,Fs,this.up):vn.lookAt(Fs,Qi,this.up),this.quaternion.setFromRotationMatrix(vn),s&&(vn.extractRotation(s.matrixWorld),Mi.setFromRotationMatrix(vn),this.quaternion.premultiply(Mi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(ol),Si.child=t,this.dispatchEvent(Si),Si.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Du),Xr.child=t,this.dispatchEvent(Xr),Xr.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),vn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),vn.multiply(t.parent.matrixWorld)),t.applyMatrix4(vn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(ol),Si.child=t,this.dispatchEvent(Si),Si.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Qi,t,Pu),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Qi,Lu,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];r(t.shapes,u)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];s.animations.push(r(t.animations,l))}}if(e){const a=o(t.geometries),l=o(t.materials),c=o(t.textures),h=o(t.images),u=o(t.shapes),d=o(t.skeletons),p=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}Se.DEFAULT_UP=new D(0,1,0);Se.DEFAULT_MATRIX_AUTO_UPDATE=!0;Se.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const on=new D,xn=new D,Yr=new D,yn=new D,wi=new D,Ei=new D,al=new D,qr=new D,$r=new D,jr=new D,Zr=new xe,Jr=new xe,Kr=new xe;class ln{constructor(t=new D,e=new D,n=new D){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),on.subVectors(t,e),s.cross(on);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){on.subVectors(s,e),xn.subVectors(n,e),Yr.subVectors(t,e);const o=on.dot(on),a=on.dot(xn),l=on.dot(Yr),c=xn.dot(xn),h=xn.dot(Yr),u=o*c-a*a;if(u===0)return r.set(0,0,0),null;const d=1/u,p=(c*l-a*h)*d,g=(o*h-a*l)*d;return r.set(1-p-g,g,p)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,yn)===null?!1:yn.x>=0&&yn.y>=0&&yn.x+yn.y<=1}static getInterpolation(t,e,n,s,r,o,a,l){return this.getBarycoord(t,e,n,s,yn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,yn.x),l.addScaledVector(o,yn.y),l.addScaledVector(a,yn.z),l)}static getInterpolatedAttribute(t,e,n,s,r,o){return Zr.setScalar(0),Jr.setScalar(0),Kr.setScalar(0),Zr.fromBufferAttribute(t,e),Jr.fromBufferAttribute(t,n),Kr.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(Zr,r.x),o.addScaledVector(Jr,r.y),o.addScaledVector(Kr,r.z),o}static isFrontFacing(t,e,n,s){return on.subVectors(n,e),xn.subVectors(t,e),on.cross(xn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return on.subVectors(this.c,this.b),xn.subVectors(this.a,this.b),on.cross(xn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return ln.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return ln.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return ln.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return ln.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return ln.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let o,a;wi.subVectors(s,n),Ei.subVectors(r,n),qr.subVectors(t,n);const l=wi.dot(qr),c=Ei.dot(qr);if(l<=0&&c<=0)return e.copy(n);$r.subVectors(t,s);const h=wi.dot($r),u=Ei.dot($r);if(h>=0&&u<=h)return e.copy(s);const d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return o=l/(l-h),e.copy(n).addScaledVector(wi,o);jr.subVectors(t,r);const p=wi.dot(jr),g=Ei.dot(jr);if(g>=0&&p<=g)return e.copy(r);const x=p*c-l*g;if(x<=0&&c>=0&&g<=0)return a=c/(c-g),e.copy(n).addScaledVector(Ei,a);const m=h*g-p*u;if(m<=0&&u-h>=0&&p-g>=0)return al.subVectors(r,s),a=(u-h)/(u-h+(p-g)),e.copy(s).addScaledVector(al,a);const f=1/(m+x+d);return o=x*f,a=d*f,e.copy(n).addScaledVector(wi,o).addScaledVector(Ei,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Rc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Un={h:0,s:0,l:0},Os={h:0,s:0,l:0};function Qr(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class Xt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Oe){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Qt.toWorkingColorSpace(this,e),this}setRGB(t,e,n,s=Qt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Qt.toWorkingColorSpace(this,s),this}setHSL(t,e,n,s=Qt.workingColorSpace){if(t=xa(t,1),e=Wt(e,0,1),n=Wt(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=Qr(o,r,t+1/3),this.g=Qr(o,r,t),this.b=Qr(o,r,t-1/3)}return Qt.toWorkingColorSpace(this,s),this}setStyle(t,e=Oe){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Oe){const n=Rc[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Tn(t.r),this.g=Tn(t.g),this.b=Tn(t.b),this}copyLinearToSRGB(t){return this.r=ki(t.r),this.g=ki(t.g),this.b=ki(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Oe){return Qt.fromWorkingColorSpace(De.copy(this),t),Math.round(Wt(De.r*255,0,255))*65536+Math.round(Wt(De.g*255,0,255))*256+Math.round(Wt(De.b*255,0,255))}getHexString(t=Oe){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Qt.workingColorSpace){Qt.fromWorkingColorSpace(De.copy(this),e);const n=De.r,s=De.g,r=De.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let l,c;const h=(a+o)/2;if(a===o)l=0,c=0;else{const u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case n:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-n)/u+2;break;case r:l=(n-s)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=Qt.workingColorSpace){return Qt.fromWorkingColorSpace(De.copy(this),e),t.r=De.r,t.g=De.g,t.b=De.b,t}getStyle(t=Oe){Qt.fromWorkingColorSpace(De.copy(this),t);const e=De.r,n=De.g,s=De.b;return t!==Oe?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Un),this.setHSL(Un.h+t,Un.s+e,Un.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Un),t.getHSL(Os);const n=ls(Un.h,Os.h,e),s=ls(Un.s,Os.s,e),r=ls(Un.l,Os.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const De=new Xt;Xt.NAMES=Rc;let Iu=0;class pi extends qi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Iu++}),this.uuid=fi(),this.name="",this.type="Material",this.blending=Oi,this.side=Hn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=bo,this.blendDst=Mo,this.blendEquation=ri,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Xt(0,0,0),this.blendAlpha=0,this.depthFunc=zi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ya,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=gi,this.stencilZFail=gi,this.stencilZPass=gi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Oi&&(n.blending=this.blending),this.side!==Hn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==bo&&(n.blendSrc=this.blendSrc),this.blendDst!==Mo&&(n.blendDst=this.blendDst),this.blendEquation!==ri&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==zi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ya&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==gi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==gi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==gi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(e){const r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class ba extends pi{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Xt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Rn,this.combine=hc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Me=new D,Bs=new at;class He{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=qa,this.updateRanges=[],this.gpuType=wn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Bs.fromBufferAttribute(this,e),Bs.applyMatrix3(t),this.setXY(e,Bs.x,Bs.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Me.fromBufferAttribute(this,e),Me.applyMatrix3(t),this.setXYZ(e,Me.x,Me.y,Me.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Me.fromBufferAttribute(this,e),Me.applyMatrix4(t),this.setXYZ(e,Me.x,Me.y,Me.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Me.fromBufferAttribute(this,e),Me.applyNormalMatrix(t),this.setXYZ(e,Me.x,Me.y,Me.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Me.fromBufferAttribute(this,e),Me.transformDirection(t),this.setXYZ(e,Me.x,Me.y,Me.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Di(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Ne(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Di(e,this.array)),e}setX(t,e){return this.normalized&&(e=Ne(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Di(e,this.array)),e}setY(t,e){return this.normalized&&(e=Ne(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Di(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Ne(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Di(e,this.array)),e}setW(t,e){return this.normalized&&(e=Ne(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Ne(e,this.array),n=Ne(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=Ne(e,this.array),n=Ne(n,this.array),s=Ne(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=Ne(e,this.array),n=Ne(n,this.array),s=Ne(s,this.array),r=Ne(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==qa&&(t.usage=this.usage),t}}class Cc extends He{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Pc extends He{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class jt extends He{constructor(t,e,n){super(new Float32Array(t),e,n)}}let Uu=0;const Ze=new ue,to=new Se,Ti=new D,Xe=new bs,ts=new bs,Te=new D;class pe extends qi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Uu++}),this.uuid=fi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(wc(t)?Pc:Cc)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Gt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Ze.makeRotationFromQuaternion(t),this.applyMatrix4(Ze),this}rotateX(t){return Ze.makeRotationX(t),this.applyMatrix4(Ze),this}rotateY(t){return Ze.makeRotationY(t),this.applyMatrix4(Ze),this}rotateZ(t){return Ze.makeRotationZ(t),this.applyMatrix4(Ze),this}translate(t,e,n){return Ze.makeTranslation(t,e,n),this.applyMatrix4(Ze),this}scale(t,e,n){return Ze.makeScale(t,e,n),this.applyMatrix4(Ze),this}lookAt(t){return to.lookAt(t),to.updateMatrix(),this.applyMatrix4(to.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ti).negate(),this.translate(Ti.x,Ti.y,Ti.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,r=t.length;s<r;s++){const o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new jt(n,3))}else{const n=Math.min(t.length,e.count);for(let s=0;s<n;s++){const r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new bs);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new D(-1/0,-1/0,-1/0),new D(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];Xe.setFromBufferAttribute(r),this.morphTargetsRelative?(Te.addVectors(this.boundingBox.min,Xe.min),this.boundingBox.expandByPoint(Te),Te.addVectors(this.boundingBox.max,Xe.max),this.boundingBox.expandByPoint(Te)):(this.boundingBox.expandByPoint(Xe.min),this.boundingBox.expandByPoint(Xe.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ms);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new D,1/0);return}if(t){const n=this.boundingSphere.center;if(Xe.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];ts.setFromBufferAttribute(a),this.morphTargetsRelative?(Te.addVectors(Xe.min,ts.min),Xe.expandByPoint(Te),Te.addVectors(Xe.max,ts.max),Xe.expandByPoint(Te)):(Xe.expandByPoint(ts.min),Xe.expandByPoint(ts.max))}Xe.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)Te.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Te));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Te.fromBufferAttribute(a,c),l&&(Ti.fromBufferAttribute(t,c),Te.add(Ti)),s=Math.max(s,n.distanceToSquared(Te))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new He(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let C=0;C<n.count;C++)a[C]=new D,l[C]=new D;const c=new D,h=new D,u=new D,d=new at,p=new at,g=new at,x=new D,m=new D;function f(C,S,y){c.fromBufferAttribute(n,C),h.fromBufferAttribute(n,S),u.fromBufferAttribute(n,y),d.fromBufferAttribute(r,C),p.fromBufferAttribute(r,S),g.fromBufferAttribute(r,y),h.sub(c),u.sub(c),p.sub(d),g.sub(d);const L=1/(p.x*g.y-g.x*p.y);isFinite(L)&&(x.copy(h).multiplyScalar(g.y).addScaledVector(u,-p.y).multiplyScalar(L),m.copy(u).multiplyScalar(p.x).addScaledVector(h,-g.x).multiplyScalar(L),a[C].add(x),a[S].add(x),a[y].add(x),l[C].add(m),l[S].add(m),l[y].add(m))}let b=this.groups;b.length===0&&(b=[{start:0,count:t.count}]);for(let C=0,S=b.length;C<S;++C){const y=b[C],L=y.start,k=y.count;for(let O=L,W=L+k;O<W;O+=3)f(t.getX(O+0),t.getX(O+1),t.getX(O+2))}const v=new D,_=new D,P=new D,A=new D;function E(C){P.fromBufferAttribute(s,C),A.copy(P);const S=a[C];v.copy(S),v.sub(P.multiplyScalar(P.dot(S))).normalize(),_.crossVectors(A,S);const L=_.dot(l[C])<0?-1:1;o.setXYZW(C,v.x,v.y,v.z,L)}for(let C=0,S=b.length;C<S;++C){const y=b[C],L=y.start,k=y.count;for(let O=L,W=L+k;O<W;O+=3)E(t.getX(O+0)),E(t.getX(O+1)),E(t.getX(O+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new He(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,p=n.count;d<p;d++)n.setXYZ(d,0,0,0);const s=new D,r=new D,o=new D,a=new D,l=new D,c=new D,h=new D,u=new D;if(t)for(let d=0,p=t.count;d<p;d+=3){const g=t.getX(d+0),x=t.getX(d+1),m=t.getX(d+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,x),o.fromBufferAttribute(e,m),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,x),c.fromBufferAttribute(n,m),a.add(h),l.add(h),c.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(x,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,p=e.count;d<p;d+=3)s.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),o.fromBufferAttribute(e,d+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Te.fromBufferAttribute(t,e),Te.normalize(),t.setXYZ(e,Te.x,Te.y,Te.z)}toNonIndexed(){function t(a,l){const c=a.array,h=a.itemSize,u=a.normalized,d=new c.constructor(l.length*h);let p=0,g=0;for(let x=0,m=l.length;x<m;x++){a.isInterleavedBufferAttribute?p=l[x]*a.data.stride+a.offset:p=l[x]*h;for(let f=0;f<h;f++)d[g++]=c[p++]}return new He(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new pe,n=this.index.array,s=this.attributes;for(const a in s){const l=s[a],c=t(l,n);e.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let h=0,u=c.length;h<u;h++){const d=c[h],p=t(d,n);l.push(p)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){const p=c[u];h.push(p.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const s=t.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(e))}const r=t.morphAttributes;for(const c in r){const h=[],u=r[c];for(let d=0,p=u.length;d<p;d++)h.push(u[d].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let c=0,h=o.length;c<h;c++){const u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const ll=new ue,Zn=new ya,ks=new Ms,cl=new D,zs=new D,Gs=new D,Hs=new D,eo=new D,Vs=new D,hl=new D,Ws=new D;class he extends Se{constructor(t=new pe,e=new ba){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(r&&a){Vs.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=a[l],u=r[l];h!==0&&(eo.fromBufferAttribute(u,t),o?Vs.addScaledVector(eo,h):Vs.addScaledVector(eo.sub(e),h))}e.add(Vs)}return e}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ks.copy(n.boundingSphere),ks.applyMatrix4(r),Zn.copy(t.ray).recast(t.near),!(ks.containsPoint(Zn.origin)===!1&&(Zn.intersectSphere(ks,cl)===null||Zn.origin.distanceToSquared(cl)>(t.far-t.near)**2))&&(ll.copy(r).invert(),Zn.copy(t.ray).applyMatrix4(ll),!(n.boundingBox!==null&&Zn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Zn)))}_computeIntersections(t,e,n){let s;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,p=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,x=d.length;g<x;g++){const m=d[g],f=o[m.materialIndex],b=Math.max(m.start,p.start),v=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let _=b,P=v;_<P;_+=3){const A=a.getX(_),E=a.getX(_+1),C=a.getX(_+2);s=Xs(this,f,t,n,c,h,u,A,E,C),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,p.start),x=Math.min(a.count,p.start+p.count);for(let m=g,f=x;m<f;m+=3){const b=a.getX(m),v=a.getX(m+1),_=a.getX(m+2);s=Xs(this,o,t,n,c,h,u,b,v,_),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,x=d.length;g<x;g++){const m=d[g],f=o[m.materialIndex],b=Math.max(m.start,p.start),v=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let _=b,P=v;_<P;_+=3){const A=_,E=_+1,C=_+2;s=Xs(this,f,t,n,c,h,u,A,E,C),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,p.start),x=Math.min(l.count,p.start+p.count);for(let m=g,f=x;m<f;m+=3){const b=m,v=m+1,_=m+2;s=Xs(this,o,t,n,c,h,u,b,v,_),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}}function Nu(i,t,e,n,s,r,o,a){let l;if(t.side===Ge?l=n.intersectTriangle(o,r,s,!0,a):l=n.intersectTriangle(s,r,o,t.side===Hn,a),l===null)return null;Ws.copy(a),Ws.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(Ws);return c<e.near||c>e.far?null:{distance:c,point:Ws.clone(),object:i}}function Xs(i,t,e,n,s,r,o,a,l,c){i.getVertexPosition(a,zs),i.getVertexPosition(l,Gs),i.getVertexPosition(c,Hs);const h=Nu(i,t,e,n,zs,Gs,Hs,hl);if(h){const u=new D;ln.getBarycoord(hl,zs,Gs,Hs,u),s&&(h.uv=ln.getInterpolatedAttribute(s,a,l,c,u,new at)),r&&(h.uv1=ln.getInterpolatedAttribute(r,a,l,c,u,new at)),o&&(h.normal=ln.getInterpolatedAttribute(o,a,l,c,u,new D),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a,b:l,c,normal:new D,materialIndex:0};ln.getNormal(zs,Gs,Hs,d.normal),h.face=d,h.barycoord=u}return h}class ye extends pe{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],h=[],u=[];let d=0,p=0;g("z","y","x",-1,-1,n,e,t,o,r,0),g("z","y","x",1,-1,n,e,-t,o,r,1),g("x","z","y",1,1,t,n,e,s,o,2),g("x","z","y",1,-1,t,n,-e,s,o,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new jt(c,3)),this.setAttribute("normal",new jt(h,3)),this.setAttribute("uv",new jt(u,2));function g(x,m,f,b,v,_,P,A,E,C,S){const y=_/E,L=P/C,k=_/2,O=P/2,W=A/2,Y=E+1,X=C+1;let K=0,H=0;const lt=new D;for(let gt=0;gt<X;gt++){const Mt=gt*L-O;for(let kt=0;kt<Y;kt++){const ne=kt*y-k;lt[x]=ne*b,lt[m]=Mt*v,lt[f]=W,c.push(lt.x,lt.y,lt.z),lt[x]=0,lt[m]=0,lt[f]=A>0?1:-1,h.push(lt.x,lt.y,lt.z),u.push(kt/E),u.push(1-gt/C),K+=1}}for(let gt=0;gt<C;gt++)for(let Mt=0;Mt<E;Mt++){const kt=d+Mt+Y*gt,ne=d+Mt+Y*(gt+1),j=d+(Mt+1)+Y*(gt+1),st=d+(Mt+1)+Y*gt;l.push(kt,ne,st),l.push(ne,j,st),H+=6}a.addGroup(p,H,S),p+=H,d+=K}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ye(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Yi(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function Fe(i){const t={};for(let e=0;e<i.length;e++){const n=Yi(i[e]);for(const s in n)t[s]=n[s]}return t}function Fu(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Lc(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Qt.workingColorSpace}const Ou={clone:Yi,merge:Fe};var Bu=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,ku=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Vn extends pi{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Bu,this.fragmentShader=ku,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Yi(t.uniforms),this.uniformsGroups=Fu(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Dc extends Se{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ue,this.projectionMatrix=new ue,this.projectionMatrixInverse=new ue,this.coordinateSystem=En}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Nn=new D,ul=new at,dl=new at;class Ke extends Dc{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=ps*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(as*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return ps*2*Math.atan(Math.tan(as*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Nn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Nn.x,Nn.y).multiplyScalar(-t/Nn.z),Nn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Nn.x,Nn.y).multiplyScalar(-t/Nn.z)}getViewSize(t,e){return this.getViewBounds(t,ul,dl),e.subVectors(dl,ul)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(as*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,e-=o.offsetY*n/c,s*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Ai=-90,Ri=1;class zu extends Se{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Ke(Ai,Ri,t,e);s.layers=this.layers,this.add(s);const r=new Ke(Ai,Ri,t,e);r.layers=this.layers,this.add(r);const o=new Ke(Ai,Ri,t,e);o.layers=this.layers,this.add(o);const a=new Ke(Ai,Ri,t,e);a.layers=this.layers,this.add(a);const l=new Ke(Ai,Ri,t,e);l.layers=this.layers,this.add(l);const c=new Ke(Ai,Ri,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,l]=e;for(const c of e)this.remove(c);if(t===En)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===_r)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,o),t.setRenderTarget(n,2,s),t.render(e,a),t.setRenderTarget(n,3,s),t.render(e,l),t.setRenderTarget(n,4,s),t.render(e,c),n.texture.generateMipmaps=x,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(u,d,p),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Ic extends Ce{constructor(t,e,n,s,r,o,a,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:Gi,super(t,e,n,s,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Gu extends hi{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new Ic(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:fn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new ye(5,5,5),r=new Vn({name:"CubemapFromEquirect",uniforms:Yi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ge,blending:kn});r.uniforms.tEquirect.value=e;const o=new he(s,r),a=e.minFilter;return e.minFilter===li&&(e.minFilter=fn),new zu(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,s){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}}class cs{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new Xt(t),this.near=e,this.far=n}clone(){return new cs(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Hu extends Se{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Rn,this.environmentIntensity=1,this.environmentRotation=new Rn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class Vu extends Ce{constructor(t=null,e=1,n=1,s,r,o,a,l,c=Be,h=Be,u,d){super(null,o,a,l,c,h,s,r,u,d),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const no=new D,Wu=new D,Xu=new Gt;class ni{constructor(t=new D(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=no.subVectors(n,e).cross(Wu.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(no),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Xu.getNormalMatrix(t),s=this.coplanarPoint(no).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Jn=new Ms,Ys=new D;class Ma{constructor(t=new ni,e=new ni,n=new ni,s=new ni,r=new ni,o=new ni){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=En){const n=this.planes,s=t.elements,r=s[0],o=s[1],a=s[2],l=s[3],c=s[4],h=s[5],u=s[6],d=s[7],p=s[8],g=s[9],x=s[10],m=s[11],f=s[12],b=s[13],v=s[14],_=s[15];if(n[0].setComponents(l-r,d-c,m-p,_-f).normalize(),n[1].setComponents(l+r,d+c,m+p,_+f).normalize(),n[2].setComponents(l+o,d+h,m+g,_+b).normalize(),n[3].setComponents(l-o,d-h,m-g,_-b).normalize(),n[4].setComponents(l-a,d-u,m-x,_-v).normalize(),e===En)n[5].setComponents(l+a,d+u,m+x,_+v).normalize();else if(e===_r)n[5].setComponents(a,u,x,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Jn.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Jn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Jn)}intersectsSprite(t){return Jn.center.set(0,0,0),Jn.radius=.7071067811865476,Jn.applyMatrix4(t.matrixWorld),this.intersectsSphere(Jn)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(Ys.x=s.normal.x>0?t.max.x:t.min.x,Ys.y=s.normal.y>0?t.max.y:t.min.y,Ys.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Ys)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Uc extends pi{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Xt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const xr=new D,yr=new D,fl=new ue,es=new ya,qs=new Ms,io=new D,pl=new D;class Yu extends Se{constructor(t=new pe,e=new Uc){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)xr.fromBufferAttribute(e,s-1),yr.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=xr.distanceTo(yr);t.setAttribute("lineDistance",new jt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),qs.copy(n.boundingSphere),qs.applyMatrix4(s),qs.radius+=r,t.ray.intersectsSphere(qs)===!1)return;fl.copy(s).invert(),es.copy(t.ray).applyMatrix4(fl);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){const p=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let x=p,m=g-1;x<m;x+=c){const f=h.getX(x),b=h.getX(x+1),v=$s(this,t,es,l,f,b);v&&e.push(v)}if(this.isLineLoop){const x=h.getX(g-1),m=h.getX(p),f=$s(this,t,es,l,x,m);f&&e.push(f)}}else{const p=Math.max(0,o.start),g=Math.min(d.count,o.start+o.count);for(let x=p,m=g-1;x<m;x+=c){const f=$s(this,t,es,l,x,x+1);f&&e.push(f)}if(this.isLineLoop){const x=$s(this,t,es,l,g-1,p);x&&e.push(x)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function $s(i,t,e,n,s,r){const o=i.geometry.attributes.position;if(xr.fromBufferAttribute(o,s),yr.fromBufferAttribute(o,r),e.distanceSqToSegment(xr,yr,io,pl)>n)return;io.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(io);if(!(l<t.near||l>t.far))return{distance:l,point:pl.clone().applyMatrix4(i.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:i}}class Ss extends pi{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Xt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const ml=new ue,ra=new ya,js=new Ms,Zs=new D;class Rr extends Se{constructor(t=new pe,e=new Ss){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),js.copy(n.boundingSphere),js.applyMatrix4(s),js.radius+=r,t.ray.intersectsSphere(js)===!1)return;ml.copy(s).invert(),ra.copy(t.ray).applyMatrix4(ml);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,u=n.attributes.position;if(c!==null){const d=Math.max(0,o.start),p=Math.min(c.count,o.start+o.count);for(let g=d,x=p;g<x;g++){const m=c.getX(g);Zs.fromBufferAttribute(u,m),gl(Zs,m,l,s,t,e,this)}}else{const d=Math.max(0,o.start),p=Math.min(u.count,o.start+o.count);for(let g=d,x=p;g<x;g++)Zs.fromBufferAttribute(u,g),gl(Zs,g,l,s,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function gl(i,t,e,n,s,r,o){const a=ra.distanceSqToPoint(i);if(a<e){const l=new D;ra.closestPointToPoint(i,l),l.applyMatrix4(n);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}class Ct extends Se{constructor(){super(),this.isGroup=!0,this.type="Group"}}class Nc extends Ce{constructor(t,e,n,s,r,o,a,l,c){super(t,e,n,s,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Fc extends Ce{constructor(t,e,n,s,r,o,a,l,c,h=Bi){if(h!==Bi&&h!==Wi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Bi&&(n=ci),n===void 0&&h===Wi&&(n=Vi),super(null,s,r,o,a,l,h,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:Be,this.minFilter=l!==void 0?l:Be,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class pn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let s=0;const r=n.length;let o;e?o=e:o=t*n[r-1];let a=0,l=r-1,c;for(;a<=l;)if(s=Math.floor(a+(l-a)/2),c=n[s]-o,c<0)a=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===o)return s/(r-1);const h=n[s],d=n[s+1]-h,p=(o-h)/d;return(s+p)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);const o=this.getPoint(s),a=this.getPoint(r),l=e||(o.isVector2?new at:new D);return l.copy(a).sub(o).normalize(),l}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new D,s=[],r=[],o=[],a=new D,l=new ue;for(let p=0;p<=t;p++){const g=p/t;s[p]=this.getTangentAt(g,new D)}r[0]=new D,o[0]=new D;let c=Number.MAX_VALUE;const h=Math.abs(s[0].x),u=Math.abs(s[0].y),d=Math.abs(s[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let p=1;p<=t;p++){if(r[p]=r[p-1].clone(),o[p]=o[p-1].clone(),a.crossVectors(s[p-1],s[p]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(Wt(s[p-1].dot(s[p]),-1,1));r[p].applyMatrix4(l.makeRotationAxis(a,g))}o[p].crossVectors(s[p],r[p])}if(e===!0){let p=Math.acos(Wt(r[0].dot(r[t]),-1,1));p/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(p=-p);for(let g=1;g<=t;g++)r[g].applyMatrix4(l.makeRotationAxis(s[g],p*g)),o[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class Sa extends pn{constructor(t=0,e=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(t,e=new at){const n=e,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);const a=this.aStartAngle+t*r;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,p=c-this.aY;l=d*h-p*u+this.aX,c=d*u+p*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class qu extends Sa{constructor(t,e,n,s,r,o){super(t,e,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function wa(){let i=0,t=0,e=0,n=0;function s(r,o,a,l){i=r,t=a,e=-3*r+3*o-2*a-l,n=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){s(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,h,u){let d=(o-r)/c-(a-r)/(c+h)+(a-o)/h,p=(a-o)/h-(l-o)/(h+u)+(l-a)/u;d*=h,p*=h,s(o,a,d,p)},calc:function(r){const o=r*r,a=o*r;return i+t*r+e*o+n*a}}}const Js=new D,so=new wa,ro=new wa,oo=new wa;class Oc extends pn{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new D){const n=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,h;this.closed||a>0?c=s[(a-1)%r]:(Js.subVectors(s[0],s[1]).add(s[0]),c=Js);const u=s[a%r],d=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:(Js.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=Js),this.curveType==="centripetal"||this.curveType==="chordal"){const p=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(u),p),x=Math.pow(u.distanceToSquared(d),p),m=Math.pow(d.distanceToSquared(h),p);x<1e-4&&(x=1),g<1e-4&&(g=x),m<1e-4&&(m=x),so.initNonuniformCatmullRom(c.x,u.x,d.x,h.x,g,x,m),ro.initNonuniformCatmullRom(c.y,u.y,d.y,h.y,g,x,m),oo.initNonuniformCatmullRom(c.z,u.z,d.z,h.z,g,x,m)}else this.curveType==="catmullrom"&&(so.initCatmullRom(c.x,u.x,d.x,h.x,this.tension),ro.initCatmullRom(c.y,u.y,d.y,h.y,this.tension),oo.initCatmullRom(c.z,u.z,d.z,h.z,this.tension));return n.set(so.calc(l),ro.calc(l),oo.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new D().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function _l(i,t,e,n,s){const r=(n-t)*.5,o=(s-e)*.5,a=i*i,l=i*a;return(2*e-2*n+r+o)*l+(-3*e+3*n-2*r-o)*a+r*i+e}function $u(i,t){const e=1-i;return e*e*t}function ju(i,t){return 2*(1-i)*i*t}function Zu(i,t){return i*i*t}function hs(i,t,e,n){return $u(i,t)+ju(i,e)+Zu(i,n)}function Ju(i,t){const e=1-i;return e*e*e*t}function Ku(i,t){const e=1-i;return 3*e*e*i*t}function Qu(i,t){return 3*(1-i)*i*i*t}function td(i,t){return i*i*i*t}function us(i,t,e,n,s){return Ju(i,t)+Ku(i,e)+Qu(i,n)+td(i,s)}class Bc extends pn{constructor(t=new at,e=new at,n=new at,s=new at){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new at){const n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(us(t,s.x,r.x,o.x,a.x),us(t,s.y,r.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class ed extends pn{constructor(t=new D,e=new D,n=new D,s=new D){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new D){const n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(us(t,s.x,r.x,o.x,a.x),us(t,s.y,r.y,o.y,a.y),us(t,s.z,r.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class kc extends pn{constructor(t=new at,e=new at){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new at){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new at){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class nd extends pn{constructor(t=new D,e=new D){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new D){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new D){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class zc extends pn{constructor(t=new at,e=new at,n=new at){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new at){const n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(hs(t,s.x,r.x,o.x),hs(t,s.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Gc extends pn{constructor(t=new D,e=new D,n=new D){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new D){const n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(hs(t,s.x,r.x,o.x),hs(t,s.y,r.y,o.y),hs(t,s.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Hc extends pn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new at){const n=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,l=s[o===0?o:o-1],c=s[o],h=s[o>s.length-2?s.length-1:o+1],u=s[o>s.length-3?s.length-1:o+2];return n.set(_l(a,l.x,c.x,h.x,u.x),_l(a,l.y,c.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new at().fromArray(s))}return this}}var br=Object.freeze({__proto__:null,ArcCurve:qu,CatmullRomCurve3:Oc,CubicBezierCurve:Bc,CubicBezierCurve3:ed,EllipseCurve:Sa,LineCurve:kc,LineCurve3:nd,QuadraticBezierCurve:zc,QuadraticBezierCurve3:Gc,SplineCurve:Hc});class id extends pn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new br[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=n){const o=s[r]-n,a=this.curves[r],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let s=0,r=this.curves;s<r.length;s++){const o=r[s],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,l=o.getPoints(a);for(let c=0;c<l.length;c++){const h=l[c];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(new br[s.type]().fromJSON(s))}return this}}class vl extends id{constructor(t){super(),this.type="Path",this.currentPoint=new at,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new kc(this.currentPoint.clone(),new at(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){const r=new zc(this.currentPoint.clone(),new at(t,e),new at(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,o){const a=new Bc(this.currentPoint.clone(),new at(t,e),new at(n,s),new at(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new Hc(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,o){const a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+a,e+l,n,s,r,o),this}absarc(t,e,n,s,r,o){return this.absellipse(t,e,n,n,s,r,o),this}ellipse(t,e,n,s,r,o,a,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,n,s,r,o,a,l),this}absellipse(t,e,n,s,r,o,a,l){const c=new Sa(t,e,n,s,r,o,a,l);if(this.curves.length>0){const u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class Ea extends pe{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);const r=[],o=[],a=[],l=[],c=new D,h=new at;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let u=0,d=3;u<=e;u++,d+=3){const p=n+u/e*s;c.x=t*Math.cos(p),c.y=t*Math.sin(p),o.push(c.x,c.y,c.z),a.push(0,0,1),h.x=(o[d]/t+1)/2,h.y=(o[d+1]/t+1)/2,l.push(h.x,h.y)}for(let u=1;u<=e;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new jt(o,3)),this.setAttribute("normal",new jt(a,3)),this.setAttribute("uv",new jt(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ea(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class qt extends pe{constructor(t=1,e=1,n=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const h=[],u=[],d=[],p=[];let g=0;const x=[],m=n/2;let f=0;b(),o===!1&&(t>0&&v(!0),e>0&&v(!1)),this.setIndex(h),this.setAttribute("position",new jt(u,3)),this.setAttribute("normal",new jt(d,3)),this.setAttribute("uv",new jt(p,2));function b(){const _=new D,P=new D;let A=0;const E=(e-t)/n;for(let C=0;C<=r;C++){const S=[],y=C/r,L=y*(e-t)+t;for(let k=0;k<=s;k++){const O=k/s,W=O*l+a,Y=Math.sin(W),X=Math.cos(W);P.x=L*Y,P.y=-y*n+m,P.z=L*X,u.push(P.x,P.y,P.z),_.set(Y,E,X).normalize(),d.push(_.x,_.y,_.z),p.push(O,1-y),S.push(g++)}x.push(S)}for(let C=0;C<s;C++)for(let S=0;S<r;S++){const y=x[S][C],L=x[S+1][C],k=x[S+1][C+1],O=x[S][C+1];(t>0||S!==0)&&(h.push(y,L,O),A+=3),(e>0||S!==r-1)&&(h.push(L,k,O),A+=3)}c.addGroup(f,A,0),f+=A}function v(_){const P=g,A=new at,E=new D;let C=0;const S=_===!0?t:e,y=_===!0?1:-1;for(let k=1;k<=s;k++)u.push(0,m*y,0),d.push(0,y,0),p.push(.5,.5),g++;const L=g;for(let k=0;k<=s;k++){const W=k/s*l+a,Y=Math.cos(W),X=Math.sin(W);E.x=S*X,E.y=m*y,E.z=S*Y,u.push(E.x,E.y,E.z),d.push(0,y,0),A.x=Y*.5+.5,A.y=X*.5*y+.5,p.push(A.x,A.y),g++}for(let k=0;k<s;k++){const O=P+k,W=L+k;_===!0?h.push(W,W+1,O):h.push(W+1,W,O),C+=3}c.addGroup(f,C,_===!0?1:2),f+=C}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new qt(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class hn extends qt{constructor(t=1,e=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new hn(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Cr extends pe{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};const r=[],o=[];a(s),c(n),h(),this.setAttribute("position",new jt(r,3)),this.setAttribute("normal",new jt(r.slice(),3)),this.setAttribute("uv",new jt(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(b){const v=new D,_=new D,P=new D;for(let A=0;A<e.length;A+=3)p(e[A+0],v),p(e[A+1],_),p(e[A+2],P),l(v,_,P,b)}function l(b,v,_,P){const A=P+1,E=[];for(let C=0;C<=A;C++){E[C]=[];const S=b.clone().lerp(_,C/A),y=v.clone().lerp(_,C/A),L=A-C;for(let k=0;k<=L;k++)k===0&&C===A?E[C][k]=S:E[C][k]=S.clone().lerp(y,k/L)}for(let C=0;C<A;C++)for(let S=0;S<2*(A-C)-1;S++){const y=Math.floor(S/2);S%2===0?(d(E[C][y+1]),d(E[C+1][y]),d(E[C][y])):(d(E[C][y+1]),d(E[C+1][y+1]),d(E[C+1][y]))}}function c(b){const v=new D;for(let _=0;_<r.length;_+=3)v.x=r[_+0],v.y=r[_+1],v.z=r[_+2],v.normalize().multiplyScalar(b),r[_+0]=v.x,r[_+1]=v.y,r[_+2]=v.z}function h(){const b=new D;for(let v=0;v<r.length;v+=3){b.x=r[v+0],b.y=r[v+1],b.z=r[v+2];const _=m(b)/2/Math.PI+.5,P=f(b)/Math.PI+.5;o.push(_,1-P)}g(),u()}function u(){for(let b=0;b<o.length;b+=6){const v=o[b+0],_=o[b+2],P=o[b+4],A=Math.max(v,_,P),E=Math.min(v,_,P);A>.9&&E<.1&&(v<.2&&(o[b+0]+=1),_<.2&&(o[b+2]+=1),P<.2&&(o[b+4]+=1))}}function d(b){r.push(b.x,b.y,b.z)}function p(b,v){const _=b*3;v.x=t[_+0],v.y=t[_+1],v.z=t[_+2]}function g(){const b=new D,v=new D,_=new D,P=new D,A=new at,E=new at,C=new at;for(let S=0,y=0;S<r.length;S+=9,y+=6){b.set(r[S+0],r[S+1],r[S+2]),v.set(r[S+3],r[S+4],r[S+5]),_.set(r[S+6],r[S+7],r[S+8]),A.set(o[y+0],o[y+1]),E.set(o[y+2],o[y+3]),C.set(o[y+4],o[y+5]),P.copy(b).add(v).add(_).divideScalar(3);const L=m(P);x(A,y+0,b,L),x(E,y+2,v,L),x(C,y+4,_,L)}}function x(b,v,_,P){P<0&&b.x===1&&(o[v]=b.x-1),_.x===0&&_.z===0&&(o[v]=P/2/Math.PI+.5)}function m(b){return Math.atan2(b.z,-b.x)}function f(b){return Math.atan2(-b.y,Math.sqrt(b.x*b.x+b.z*b.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Cr(t.vertices,t.indices,t.radius,t.details)}}class Pr extends vl{constructor(t){super(t),this.uuid=fi(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,s=this.holes.length;n<s;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(new vl().fromJSON(s))}return this}}const sd={triangulate:function(i,t,e=2){const n=t&&t.length,s=n?t[0]*e:i.length;let r=Vc(i,0,s,e,!0);const o=[];if(!r||r.next===r.prev)return o;let a,l,c,h,u,d,p;if(n&&(r=cd(i,t,r,e)),i.length>80*e){a=c=i[0],l=h=i[1];for(let g=e;g<s;g+=e)u=i[g],d=i[g+1],u<a&&(a=u),d<l&&(l=d),u>c&&(c=u),d>h&&(h=d);p=Math.max(c-a,h-l),p=p!==0?32767/p:0}return ms(r,o,e,a,l,p,0),o}};function Vc(i,t,e,n,s){let r,o;if(s===yd(i,t,e,n)>0)for(r=t;r<e;r+=n)o=xl(r,i[r],i[r+1],o);else for(r=e-n;r>=t;r-=n)o=xl(r,i[r],i[r+1],o);return o&&Lr(o,o.next)&&(_s(o),o=o.next),o}function ui(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(Lr(e,e.next)||fe(e.prev,e,e.next)===0)){if(_s(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function ms(i,t,e,n,s,r,o){if(!i)return;!o&&r&&pd(i,n,s,r);let a=i,l,c;for(;i.prev!==i.next;){if(l=i.prev,c=i.next,r?od(i,n,s,r):rd(i)){t.push(l.i/e|0),t.push(i.i/e|0),t.push(c.i/e|0),_s(i),i=c.next,a=c.next;continue}if(i=c,i===a){o?o===1?(i=ad(ui(i),t,e),ms(i,t,e,n,s,r,2)):o===2&&ld(i,t,e,n,s,r):ms(ui(i),t,e,n,s,r,1);break}}}function rd(i){const t=i.prev,e=i,n=i.next;if(fe(t,e,n)>=0)return!1;const s=t.x,r=e.x,o=n.x,a=t.y,l=e.y,c=n.y,h=s<r?s<o?s:o:r<o?r:o,u=a<l?a<c?a:c:l<c?l:c,d=s>r?s>o?s:o:r>o?r:o,p=a>l?a>c?a:c:l>c?l:c;let g=n.next;for(;g!==t;){if(g.x>=h&&g.x<=d&&g.y>=u&&g.y<=p&&Ni(s,a,r,l,o,c,g.x,g.y)&&fe(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function od(i,t,e,n){const s=i.prev,r=i,o=i.next;if(fe(s,r,o)>=0)return!1;const a=s.x,l=r.x,c=o.x,h=s.y,u=r.y,d=o.y,p=a<l?a<c?a:c:l<c?l:c,g=h<u?h<d?h:d:u<d?u:d,x=a>l?a>c?a:c:l>c?l:c,m=h>u?h>d?h:d:u>d?u:d,f=oa(p,g,t,e,n),b=oa(x,m,t,e,n);let v=i.prevZ,_=i.nextZ;for(;v&&v.z>=f&&_&&_.z<=b;){if(v.x>=p&&v.x<=x&&v.y>=g&&v.y<=m&&v!==s&&v!==o&&Ni(a,h,l,u,c,d,v.x,v.y)&&fe(v.prev,v,v.next)>=0||(v=v.prevZ,_.x>=p&&_.x<=x&&_.y>=g&&_.y<=m&&_!==s&&_!==o&&Ni(a,h,l,u,c,d,_.x,_.y)&&fe(_.prev,_,_.next)>=0))return!1;_=_.nextZ}for(;v&&v.z>=f;){if(v.x>=p&&v.x<=x&&v.y>=g&&v.y<=m&&v!==s&&v!==o&&Ni(a,h,l,u,c,d,v.x,v.y)&&fe(v.prev,v,v.next)>=0)return!1;v=v.prevZ}for(;_&&_.z<=b;){if(_.x>=p&&_.x<=x&&_.y>=g&&_.y<=m&&_!==s&&_!==o&&Ni(a,h,l,u,c,d,_.x,_.y)&&fe(_.prev,_,_.next)>=0)return!1;_=_.nextZ}return!0}function ad(i,t,e){let n=i;do{const s=n.prev,r=n.next.next;!Lr(s,r)&&Wc(s,n,n.next,r)&&gs(s,r)&&gs(r,s)&&(t.push(s.i/e|0),t.push(n.i/e|0),t.push(r.i/e|0),_s(n),_s(n.next),n=i=r),n=n.next}while(n!==i);return ui(n)}function ld(i,t,e,n,s,r){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&_d(o,a)){let l=Xc(o,a);o=ui(o,o.next),l=ui(l,l.next),ms(o,t,e,n,s,r,0),ms(l,t,e,n,s,r,0);return}a=a.next}o=o.next}while(o!==i)}function cd(i,t,e,n){const s=[];let r,o,a,l,c;for(r=0,o=t.length;r<o;r++)a=t[r]*n,l=r<o-1?t[r+1]*n:i.length,c=Vc(i,a,l,n,!1),c===c.next&&(c.steiner=!0),s.push(gd(c));for(s.sort(hd),r=0;r<s.length;r++)e=ud(s[r],e);return e}function hd(i,t){return i.x-t.x}function ud(i,t){const e=dd(i,t);if(!e)return t;const n=Xc(e,i);return ui(n,n.next),ui(e,e.next)}function dd(i,t){let e=t,n=-1/0,s;const r=i.x,o=i.y;do{if(o<=e.y&&o>=e.next.y&&e.next.y!==e.y){const d=e.x+(o-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(d<=r&&d>n&&(n=d,s=e.x<e.next.x?e:e.next,d===r))return s}e=e.next}while(e!==t);if(!s)return null;const a=s,l=s.x,c=s.y;let h=1/0,u;e=s;do r>=e.x&&e.x>=l&&r!==e.x&&Ni(o<c?r:n,o,l,c,o<c?n:r,o,e.x,e.y)&&(u=Math.abs(o-e.y)/(r-e.x),gs(e,i)&&(u<h||u===h&&(e.x>s.x||e.x===s.x&&fd(s,e)))&&(s=e,h=u)),e=e.next;while(e!==a);return s}function fd(i,t){return fe(i.prev,i,t.prev)<0&&fe(t.next,i,i.next)<0}function pd(i,t,e,n){let s=i;do s.z===0&&(s.z=oa(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,md(s)}function md(i){let t,e,n,s,r,o,a,l,c=1;do{for(e=i,i=null,r=null,o=0;e;){for(o++,n=e,a=0,t=0;t<c&&(a++,n=n.nextZ,!!n);t++);for(l=c;a>0||l>0&&n;)a!==0&&(l===0||!n||e.z<=n.z)?(s=e,e=e.nextZ,a--):(s=n,n=n.nextZ,l--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;e=n}r.nextZ=null,c*=2}while(o>1);return i}function oa(i,t,e,n,s){return i=(i-e)*s|0,t=(t-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function gd(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function Ni(i,t,e,n,s,r,o,a){return(s-o)*(t-a)>=(i-o)*(r-a)&&(i-o)*(n-a)>=(e-o)*(t-a)&&(e-o)*(r-a)>=(s-o)*(n-a)}function _d(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!vd(i,t)&&(gs(i,t)&&gs(t,i)&&xd(i,t)&&(fe(i.prev,i,t.prev)||fe(i,t.prev,t))||Lr(i,t)&&fe(i.prev,i,i.next)>0&&fe(t.prev,t,t.next)>0)}function fe(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function Lr(i,t){return i.x===t.x&&i.y===t.y}function Wc(i,t,e,n){const s=Qs(fe(i,t,e)),r=Qs(fe(i,t,n)),o=Qs(fe(e,n,i)),a=Qs(fe(e,n,t));return!!(s!==r&&o!==a||s===0&&Ks(i,e,t)||r===0&&Ks(i,n,t)||o===0&&Ks(e,i,n)||a===0&&Ks(e,t,n))}function Ks(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function Qs(i){return i>0?1:i<0?-1:0}function vd(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&Wc(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function gs(i,t){return fe(i.prev,i,i.next)<0?fe(i,t,i.next)>=0&&fe(i,i.prev,t)>=0:fe(i,t,i.prev)<0||fe(i,i.next,t)<0}function xd(i,t){let e=i,n=!1;const s=(i.x+t.x)/2,r=(i.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function Xc(i,t){const e=new aa(i.i,i.x,i.y),n=new aa(t.i,t.x,t.y),s=i.next,r=t.prev;return i.next=t,t.prev=i,e.next=s,s.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function xl(i,t,e,n){const s=new aa(i,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function _s(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function aa(i,t,e){this.i=i,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function yd(i,t,e,n){let s=0;for(let r=t,o=e-n;r<e;r+=n)s+=(i[o]-i[r])*(i[r+1]+i[o+1]),o=r;return s}class Gn{static area(t){const e=t.length;let n=0;for(let s=e-1,r=0;r<e;s=r++)n+=t[s].x*t[r].y-t[r].x*t[s].y;return n*.5}static isClockWise(t){return Gn.area(t)<0}static triangulateShape(t,e){const n=[],s=[],r=[];yl(t),bl(n,t);let o=t.length;e.forEach(yl);for(let l=0;l<e.length;l++)s.push(o),o+=e[l].length,bl(n,e[l]);const a=sd.triangulate(n,s);for(let l=0;l<a.length;l+=3)r.push(a.slice(l,l+3));return r}}function yl(i){const t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function bl(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}class Ta extends pe{constructor(t=new Pr([new at(.5,.5),new at(-.5,.5),new at(-.5,-.5),new at(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];const n=this,s=[],r=[];for(let a=0,l=t.length;a<l;a++){const c=t[a];o(c)}this.setAttribute("position",new jt(s,3)),this.setAttribute("uv",new jt(r,2)),this.computeVertexNormals();function o(a){const l=[],c=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,u=e.depth!==void 0?e.depth:1;let d=e.bevelEnabled!==void 0?e.bevelEnabled:!0,p=e.bevelThickness!==void 0?e.bevelThickness:.2,g=e.bevelSize!==void 0?e.bevelSize:p-.1,x=e.bevelOffset!==void 0?e.bevelOffset:0,m=e.bevelSegments!==void 0?e.bevelSegments:3;const f=e.extrudePath,b=e.UVGenerator!==void 0?e.UVGenerator:bd;let v,_=!1,P,A,E,C;f&&(v=f.getSpacedPoints(h),_=!0,d=!1,P=f.computeFrenetFrames(h,!1),A=new D,E=new D,C=new D),d||(m=0,p=0,g=0,x=0);const S=a.extractPoints(c);let y=S.shape;const L=S.holes;if(!Gn.isClockWise(y)){y=y.reverse();for(let J=0,it=L.length;J<it;J++){const R=L[J];Gn.isClockWise(R)&&(L[J]=R.reverse())}}const O=Gn.triangulateShape(y,L),W=y;for(let J=0,it=L.length;J<it;J++){const R=L[J];y=y.concat(R)}function Y(J,it,R){return it||console.error("THREE.ExtrudeGeometry: vec does not exist"),J.clone().addScaledVector(it,R)}const X=y.length,K=O.length;function H(J,it,R){let Tt,tt,vt;const rt=J.x-it.x,Dt=J.y-it.y,pt=R.x-J.x,T=R.y-J.y,M=rt*rt+Dt*Dt,B=rt*T-Dt*pt;if(Math.abs(B)>Number.EPSILON){const q=Math.sqrt(M),Q=Math.sqrt(pt*pt+T*T),$=it.x-Dt/q,Et=it.y+rt/q,ht=R.x-T/Q,_t=R.y+pt/Q,Yt=((ht-$)*T-(_t-Et)*pt)/(rt*T-Dt*pt);Tt=$+rt*Yt-J.x,tt=Et+Dt*Yt-J.y;const nt=Tt*Tt+tt*tt;if(nt<=2)return new at(Tt,tt);vt=Math.sqrt(nt/2)}else{let q=!1;rt>Number.EPSILON?pt>Number.EPSILON&&(q=!0):rt<-Number.EPSILON?pt<-Number.EPSILON&&(q=!0):Math.sign(Dt)===Math.sign(T)&&(q=!0),q?(Tt=-Dt,tt=rt,vt=Math.sqrt(M)):(Tt=rt,tt=Dt,vt=Math.sqrt(M/2))}return new at(Tt/vt,tt/vt)}const lt=[];for(let J=0,it=W.length,R=it-1,Tt=J+1;J<it;J++,R++,Tt++)R===it&&(R=0),Tt===it&&(Tt=0),lt[J]=H(W[J],W[R],W[Tt]);const gt=[];let Mt,kt=lt.concat();for(let J=0,it=L.length;J<it;J++){const R=L[J];Mt=[];for(let Tt=0,tt=R.length,vt=tt-1,rt=Tt+1;Tt<tt;Tt++,vt++,rt++)vt===tt&&(vt=0),rt===tt&&(rt=0),Mt[Tt]=H(R[Tt],R[vt],R[rt]);gt.push(Mt),kt=kt.concat(Mt)}for(let J=0;J<m;J++){const it=J/m,R=p*Math.cos(it*Math.PI/2),Tt=g*Math.sin(it*Math.PI/2)+x;for(let tt=0,vt=W.length;tt<vt;tt++){const rt=Y(W[tt],lt[tt],Tt);ot(rt.x,rt.y,-R)}for(let tt=0,vt=L.length;tt<vt;tt++){const rt=L[tt];Mt=gt[tt];for(let Dt=0,pt=rt.length;Dt<pt;Dt++){const T=Y(rt[Dt],Mt[Dt],Tt);ot(T.x,T.y,-R)}}}const ne=g+x;for(let J=0;J<X;J++){const it=d?Y(y[J],kt[J],ne):y[J];_?(E.copy(P.normals[0]).multiplyScalar(it.x),A.copy(P.binormals[0]).multiplyScalar(it.y),C.copy(v[0]).add(E).add(A),ot(C.x,C.y,C.z)):ot(it.x,it.y,0)}for(let J=1;J<=h;J++)for(let it=0;it<X;it++){const R=d?Y(y[it],kt[it],ne):y[it];_?(E.copy(P.normals[J]).multiplyScalar(R.x),A.copy(P.binormals[J]).multiplyScalar(R.y),C.copy(v[J]).add(E).add(A),ot(C.x,C.y,C.z)):ot(R.x,R.y,u/h*J)}for(let J=m-1;J>=0;J--){const it=J/m,R=p*Math.cos(it*Math.PI/2),Tt=g*Math.sin(it*Math.PI/2)+x;for(let tt=0,vt=W.length;tt<vt;tt++){const rt=Y(W[tt],lt[tt],Tt);ot(rt.x,rt.y,u+R)}for(let tt=0,vt=L.length;tt<vt;tt++){const rt=L[tt];Mt=gt[tt];for(let Dt=0,pt=rt.length;Dt<pt;Dt++){const T=Y(rt[Dt],Mt[Dt],Tt);_?ot(T.x,T.y+v[h-1].y,v[h-1].x+R):ot(T.x,T.y,u+R)}}}j(),st();function j(){const J=s.length/3;if(d){let it=0,R=X*it;for(let Tt=0;Tt<K;Tt++){const tt=O[Tt];At(tt[2]+R,tt[1]+R,tt[0]+R)}it=h+m*2,R=X*it;for(let Tt=0;Tt<K;Tt++){const tt=O[Tt];At(tt[0]+R,tt[1]+R,tt[2]+R)}}else{for(let it=0;it<K;it++){const R=O[it];At(R[2],R[1],R[0])}for(let it=0;it<K;it++){const R=O[it];At(R[0]+X*h,R[1]+X*h,R[2]+X*h)}}n.addGroup(J,s.length/3-J,0)}function st(){const J=s.length/3;let it=0;wt(W,it),it+=W.length;for(let R=0,Tt=L.length;R<Tt;R++){const tt=L[R];wt(tt,it),it+=tt.length}n.addGroup(J,s.length/3-J,1)}function wt(J,it){let R=J.length;for(;--R>=0;){const Tt=R;let tt=R-1;tt<0&&(tt=J.length-1);for(let vt=0,rt=h+m*2;vt<rt;vt++){const Dt=X*vt,pt=X*(vt+1),T=it+Tt+Dt,M=it+tt+Dt,B=it+tt+pt,q=it+Tt+pt;Ft(T,M,B,q)}}}function ot(J,it,R){l.push(J),l.push(it),l.push(R)}function At(J,it,R){It(J),It(it),It(R);const Tt=s.length/3,tt=b.generateTopUV(n,s,Tt-3,Tt-2,Tt-1);Zt(tt[0]),Zt(tt[1]),Zt(tt[2])}function Ft(J,it,R,Tt){It(J),It(it),It(Tt),It(it),It(R),It(Tt);const tt=s.length/3,vt=b.generateSideWallUV(n,s,tt-6,tt-3,tt-2,tt-1);Zt(vt[0]),Zt(vt[1]),Zt(vt[3]),Zt(vt[1]),Zt(vt[2]),Zt(vt[3])}function It(J){s.push(l[J*3+0]),s.push(l[J*3+1]),s.push(l[J*3+2])}function Zt(J){r.push(J.x),r.push(J.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return Md(e,n,t)}static fromJSON(t,e){const n=[];for(let r=0,o=t.shapes.length;r<o;r++){const a=e[t.shapes[r]];n.push(a)}const s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new br[s.type]().fromJSON(s)),new Ta(n,t.options)}}const bd={generateTopUV:function(i,t,e,n,s){const r=t[e*3],o=t[e*3+1],a=t[n*3],l=t[n*3+1],c=t[s*3],h=t[s*3+1];return[new at(r,o),new at(a,l),new at(c,h)]},generateSideWallUV:function(i,t,e,n,s,r){const o=t[e*3],a=t[e*3+1],l=t[e*3+2],c=t[n*3],h=t[n*3+1],u=t[n*3+2],d=t[s*3],p=t[s*3+1],g=t[s*3+2],x=t[r*3],m=t[r*3+1],f=t[r*3+2];return Math.abs(a-h)<Math.abs(o-c)?[new at(o,1-l),new at(c,1-u),new at(d,1-g),new at(x,1-f)]:[new at(a,1-l),new at(h,1-u),new at(p,1-g),new at(m,1-f)]}};function Md(i,t,e){if(e.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){const r=i[n];e.shapes.push(r.uuid)}else e.shapes.push(i.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}class Aa extends Cr{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Aa(t.radius,t.detail)}}class Xn extends Cr{constructor(t=1,e=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,s,t,e),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Xn(t.radius,t.detail)}}class Cn extends pe{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,o=e/2,a=Math.floor(n),l=Math.floor(s),c=a+1,h=l+1,u=t/a,d=e/l,p=[],g=[],x=[],m=[];for(let f=0;f<h;f++){const b=f*d-o;for(let v=0;v<c;v++){const _=v*u-r;g.push(_,-b,0),x.push(0,0,1),m.push(v/a),m.push(1-f/l)}}for(let f=0;f<l;f++)for(let b=0;b<a;b++){const v=b+c*f,_=b+c*(f+1),P=b+1+c*(f+1),A=b+1+c*f;p.push(v,_,A),p.push(_,P,A)}this.setIndex(p),this.setAttribute("position",new jt(g,3)),this.setAttribute("normal",new jt(x,3)),this.setAttribute("uv",new jt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Cn(t.width,t.height,t.widthSegments,t.heightSegments)}}class Mr extends pe{constructor(t=.5,e=1,n=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:o},n=Math.max(3,n),s=Math.max(1,s);const a=[],l=[],c=[],h=[];let u=t;const d=(e-t)/s,p=new D,g=new at;for(let x=0;x<=s;x++){for(let m=0;m<=n;m++){const f=r+m/n*o;p.x=u*Math.cos(f),p.y=u*Math.sin(f),l.push(p.x,p.y,p.z),c.push(0,0,1),g.x=(p.x/e+1)/2,g.y=(p.y/e+1)/2,h.push(g.x,g.y)}u+=d}for(let x=0;x<s;x++){const m=x*(n+1);for(let f=0;f<n;f++){const b=f+m,v=b,_=b+n+1,P=b+n+2,A=b+1;a.push(v,_,A),a.push(_,P,A)}}this.setIndex(a),this.setAttribute("position",new jt(l,3)),this.setAttribute("normal",new jt(c,3)),this.setAttribute("uv",new jt(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Mr(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class Ra extends pe{constructor(t=new Pr([new at(0,.5),new at(-.5,-.5),new at(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};const n=[],s=[],r=[],o=[];let a=0,l=0;if(Array.isArray(t)===!1)c(t);else for(let h=0;h<t.length;h++)c(t[h]),this.addGroup(a,l,h),a+=l,l=0;this.setIndex(n),this.setAttribute("position",new jt(s,3)),this.setAttribute("normal",new jt(r,3)),this.setAttribute("uv",new jt(o,2));function c(h){const u=s.length/3,d=h.extractPoints(e);let p=d.shape;const g=d.holes;Gn.isClockWise(p)===!1&&(p=p.reverse());for(let m=0,f=g.length;m<f;m++){const b=g[m];Gn.isClockWise(b)===!0&&(g[m]=b.reverse())}const x=Gn.triangulateShape(p,g);for(let m=0,f=g.length;m<f;m++){const b=g[m];p=p.concat(b)}for(let m=0,f=p.length;m<f;m++){const b=p[m];s.push(b.x,b.y,0),r.push(0,0,1),o.push(b.x,b.y)}for(let m=0,f=x.length;m<f;m++){const b=x[m],v=b[0]+u,_=b[1]+u,P=b[2]+u;n.push(v,_,P),l+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes;return Sd(e,t)}static fromJSON(t,e){const n=[];for(let s=0,r=t.shapes.length;s<r;s++){const o=e[t.shapes[s]];n.push(o)}return new Ra(n,t.curveSegments)}}function Sd(i,t){if(t.shapes=[],Array.isArray(i))for(let e=0,n=i.length;e<n;e++){const s=i[e];t.shapes.push(s.uuid)}else t.shapes.push(i.uuid);return t}class ee extends pe{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(o+a,Math.PI);let c=0;const h=[],u=new D,d=new D,p=[],g=[],x=[],m=[];for(let f=0;f<=n;f++){const b=[],v=f/n;let _=0;f===0&&o===0?_=.5/e:f===n&&l===Math.PI&&(_=-.5/e);for(let P=0;P<=e;P++){const A=P/e;u.x=-t*Math.cos(s+A*r)*Math.sin(o+v*a),u.y=t*Math.cos(o+v*a),u.z=t*Math.sin(s+A*r)*Math.sin(o+v*a),g.push(u.x,u.y,u.z),d.copy(u).normalize(),x.push(d.x,d.y,d.z),m.push(A+_,1-v),b.push(c++)}h.push(b)}for(let f=0;f<n;f++)for(let b=0;b<e;b++){const v=h[f][b+1],_=h[f][b],P=h[f+1][b],A=h[f+1][b+1];(f!==0||o>0)&&p.push(v,_,A),(f!==n-1||l<Math.PI)&&p.push(_,P,A)}this.setIndex(p),this.setAttribute("position",new jt(g,3)),this.setAttribute("normal",new jt(x,3)),this.setAttribute("uv",new jt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ee(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class tn extends pe{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);const o=[],a=[],l=[],c=[],h=new D,u=new D,d=new D;for(let p=0;p<=n;p++)for(let g=0;g<=s;g++){const x=g/s*r,m=p/n*Math.PI*2;u.x=(t+e*Math.cos(m))*Math.cos(x),u.y=(t+e*Math.cos(m))*Math.sin(x),u.z=e*Math.sin(m),a.push(u.x,u.y,u.z),h.x=t*Math.cos(x),h.y=t*Math.sin(x),d.subVectors(u,h).normalize(),l.push(d.x,d.y,d.z),c.push(g/s),c.push(p/n)}for(let p=1;p<=n;p++)for(let g=1;g<=s;g++){const x=(s+1)*p+g-1,m=(s+1)*(p-1)+g-1,f=(s+1)*(p-1)+g,b=(s+1)*p+g;o.push(x,m,b),o.push(m,f,b)}this.setIndex(o),this.setAttribute("position",new jt(a,3)),this.setAttribute("normal",new jt(l,3)),this.setAttribute("uv",new jt(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new tn(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class Sr extends pe{constructor(t=new Gc(new D(-1,-1,0),new D(-1,1,0),new D(1,1,0)),e=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:s,closed:r};const o=t.computeFrenetFrames(e,r);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;const a=new D,l=new D,c=new at;let h=new D;const u=[],d=[],p=[],g=[];x(),this.setIndex(g),this.setAttribute("position",new jt(u,3)),this.setAttribute("normal",new jt(d,3)),this.setAttribute("uv",new jt(p,2));function x(){for(let v=0;v<e;v++)m(v);m(r===!1?e:0),b(),f()}function m(v){h=t.getPointAt(v/e,h);const _=o.normals[v],P=o.binormals[v];for(let A=0;A<=s;A++){const E=A/s*Math.PI*2,C=Math.sin(E),S=-Math.cos(E);l.x=S*_.x+C*P.x,l.y=S*_.y+C*P.y,l.z=S*_.z+C*P.z,l.normalize(),d.push(l.x,l.y,l.z),a.x=h.x+n*l.x,a.y=h.y+n*l.y,a.z=h.z+n*l.z,u.push(a.x,a.y,a.z)}}function f(){for(let v=1;v<=e;v++)for(let _=1;_<=s;_++){const P=(s+1)*(v-1)+(_-1),A=(s+1)*v+(_-1),E=(s+1)*v+_,C=(s+1)*(v-1)+_;g.push(P,A,C),g.push(A,E,C)}}function b(){for(let v=0;v<=e;v++)for(let _=0;_<=s;_++)c.x=v/e,c.y=_/s,p.push(c.x,c.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new Sr(new br[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}}class Ie extends pi{constructor(t){super(),this.isMeshToonMaterial=!0,this.defines={TOON:""},this.type="MeshToonMaterial",this.color=new Xt(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Xt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Mc,this.normalScale=new at(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.gradientMap=t.gradientMap,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.alphaMap=t.alphaMap,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}class wd extends pi{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Vh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Ed extends pi{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class Yc extends Se{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Xt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class Td extends Yc{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Se.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Xt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const ao=new ue,Ml=new D,Sl=new D;class Ad{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new at(512,512),this.map=null,this.mapPass=null,this.matrix=new ue,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ma,this._frameExtents=new at(1,1),this._viewportCount=1,this._viewports=[new xe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Ml.setFromMatrixPosition(t.matrixWorld),e.position.copy(Ml),Sl.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Sl),e.updateMatrixWorld(),ao.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ao),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(ao)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class qc extends Dc{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,o=n+t,a=s+e,l=s-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class Rd extends Ad{constructor(){super(new qc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class wl extends Yc{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Se.DEFAULT_UP),this.updateMatrix(),this.target=new Se,this.shadow=new Rd}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class Cd extends Ke{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class Pd{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=El(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=El();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function El(){return performance.now()}function Tl(i,t,e,n){const s=Ld(n);switch(e){case gc:return i*t;case vc:return i*t;case xc:return i*t*2;case ma:return i*t/s.components*s.byteLength;case ga:return i*t/s.components*s.byteLength;case yc:return i*t*2/s.components*s.byteLength;case _a:return i*t*2/s.components*s.byteLength;case _c:return i*t*3/s.components*s.byteLength;case cn:return i*t*4/s.components*s.byteLength;case va:return i*t*4/s.components*s.byteLength;case lr:case cr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case hr:case ur:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Uo:case Fo:return Math.max(i,16)*Math.max(t,8)/4;case Io:case No:return Math.max(i,8)*Math.max(t,8)/2;case Oo:case Bo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case ko:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case zo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Go:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Ho:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case Vo:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case Wo:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case Xo:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Yo:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case qo:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case $o:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case jo:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Zo:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Jo:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Ko:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Qo:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case dr:case ta:case ea:return Math.ceil(i/4)*Math.ceil(t/4)*16;case bc:case na:return Math.ceil(i/4)*Math.ceil(t/4)*8;case ia:case sa:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Ld(i){switch(i){case An:case fc:return{byteLength:1,components:1};case fs:case pc:case xs:return{byteLength:2,components:1};case fa:case pa:return{byteLength:2,components:4};case ci:case da:case wn:return{byteLength:4,components:1};case mc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ua}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ua);/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function $c(){let i=null,t=!1,e=null,n=null;function s(r,o){e(r,o),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function Dd(i){const t=new WeakMap;function e(a,l){const c=a.array,h=a.usage,u=c.byteLength,d=i.createBuffer();i.bindBuffer(l,d),i.bufferData(l,c,h),a.onUploadCallback();let p;if(c instanceof Float32Array)p=i.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=i.SHORT;else if(c instanceof Uint32Array)p=i.UNSIGNED_INT;else if(c instanceof Int32Array)p=i.INT;else if(c instanceof Int8Array)p=i.BYTE;else if(c instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,l,c){const h=l.array,u=l.updateRanges;if(i.bindBuffer(c,a),u.length===0)i.bufferSubData(c,0,h);else{u.sort((p,g)=>p.start-g.start);let d=0;for(let p=1;p<u.length;p++){const g=u[d],x=u[p];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++d,u[d]=x)}u.length=d+1;for(let p=0,g=u.length;p<g;p++){const x=u[p];i.bufferSubData(c,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=t.get(a);l&&(i.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}var Id=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Ud=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Nd=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Fd=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Od=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Bd=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,kd=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,zd=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Gd=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Hd=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Vd=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Wd=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Xd=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Yd=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,qd=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,$d=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,jd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Zd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Jd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Kd=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Qd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,tf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,ef=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,nf=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,sf=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,rf=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,of=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,af=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,lf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,cf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,hf="gl_FragColor = linearToOutputTexel( gl_FragColor );",uf=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,df=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,ff=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,pf=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,mf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,gf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,_f=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,vf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,xf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,yf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,bf=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Mf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Sf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,wf=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Ef=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Tf=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Af=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Rf=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Cf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Pf=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Lf=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Df=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,If=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Uf=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Nf=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Ff=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Of=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Bf=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,kf=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,zf=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Gf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Hf=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Vf=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Wf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Xf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Yf=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,qf=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,$f=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,jf=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Zf=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Jf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Kf=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Qf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,tp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ep=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,np=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,ip=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,sp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,rp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,op=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,ap=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,lp=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,cp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,hp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,up=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,fp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,pp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,mp=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,gp=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,_p=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,vp=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,xp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,yp=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,bp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Mp=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Sp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,wp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Ep=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Tp=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Ap=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Rp=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Cp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Pp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Lp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Dp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Ip=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Up=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Np=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Fp=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Op=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Bp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,kp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,zp=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Gp=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Hp=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Vp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Wp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Xp=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Yp=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,qp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,$p=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,jp=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Zp=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Jp=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Kp=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Qp=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,tm=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,em=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,nm=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,im=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,sm=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,rm=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,om=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,am=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,lm=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,cm=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,hm=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,um=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,dm=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Vt={alphahash_fragment:Id,alphahash_pars_fragment:Ud,alphamap_fragment:Nd,alphamap_pars_fragment:Fd,alphatest_fragment:Od,alphatest_pars_fragment:Bd,aomap_fragment:kd,aomap_pars_fragment:zd,batching_pars_vertex:Gd,batching_vertex:Hd,begin_vertex:Vd,beginnormal_vertex:Wd,bsdfs:Xd,iridescence_fragment:Yd,bumpmap_pars_fragment:qd,clipping_planes_fragment:$d,clipping_planes_pars_fragment:jd,clipping_planes_pars_vertex:Zd,clipping_planes_vertex:Jd,color_fragment:Kd,color_pars_fragment:Qd,color_pars_vertex:tf,color_vertex:ef,common:nf,cube_uv_reflection_fragment:sf,defaultnormal_vertex:rf,displacementmap_pars_vertex:of,displacementmap_vertex:af,emissivemap_fragment:lf,emissivemap_pars_fragment:cf,colorspace_fragment:hf,colorspace_pars_fragment:uf,envmap_fragment:df,envmap_common_pars_fragment:ff,envmap_pars_fragment:pf,envmap_pars_vertex:mf,envmap_physical_pars_fragment:Tf,envmap_vertex:gf,fog_vertex:_f,fog_pars_vertex:vf,fog_fragment:xf,fog_pars_fragment:yf,gradientmap_pars_fragment:bf,lightmap_pars_fragment:Mf,lights_lambert_fragment:Sf,lights_lambert_pars_fragment:wf,lights_pars_begin:Ef,lights_toon_fragment:Af,lights_toon_pars_fragment:Rf,lights_phong_fragment:Cf,lights_phong_pars_fragment:Pf,lights_physical_fragment:Lf,lights_physical_pars_fragment:Df,lights_fragment_begin:If,lights_fragment_maps:Uf,lights_fragment_end:Nf,logdepthbuf_fragment:Ff,logdepthbuf_pars_fragment:Of,logdepthbuf_pars_vertex:Bf,logdepthbuf_vertex:kf,map_fragment:zf,map_pars_fragment:Gf,map_particle_fragment:Hf,map_particle_pars_fragment:Vf,metalnessmap_fragment:Wf,metalnessmap_pars_fragment:Xf,morphinstance_vertex:Yf,morphcolor_vertex:qf,morphnormal_vertex:$f,morphtarget_pars_vertex:jf,morphtarget_vertex:Zf,normal_fragment_begin:Jf,normal_fragment_maps:Kf,normal_pars_fragment:Qf,normal_pars_vertex:tp,normal_vertex:ep,normalmap_pars_fragment:np,clearcoat_normal_fragment_begin:ip,clearcoat_normal_fragment_maps:sp,clearcoat_pars_fragment:rp,iridescence_pars_fragment:op,opaque_fragment:ap,packing:lp,premultiplied_alpha_fragment:cp,project_vertex:hp,dithering_fragment:up,dithering_pars_fragment:dp,roughnessmap_fragment:fp,roughnessmap_pars_fragment:pp,shadowmap_pars_fragment:mp,shadowmap_pars_vertex:gp,shadowmap_vertex:_p,shadowmask_pars_fragment:vp,skinbase_vertex:xp,skinning_pars_vertex:yp,skinning_vertex:bp,skinnormal_vertex:Mp,specularmap_fragment:Sp,specularmap_pars_fragment:wp,tonemapping_fragment:Ep,tonemapping_pars_fragment:Tp,transmission_fragment:Ap,transmission_pars_fragment:Rp,uv_pars_fragment:Cp,uv_pars_vertex:Pp,uv_vertex:Lp,worldpos_vertex:Dp,background_vert:Ip,background_frag:Up,backgroundCube_vert:Np,backgroundCube_frag:Fp,cube_vert:Op,cube_frag:Bp,depth_vert:kp,depth_frag:zp,distanceRGBA_vert:Gp,distanceRGBA_frag:Hp,equirect_vert:Vp,equirect_frag:Wp,linedashed_vert:Xp,linedashed_frag:Yp,meshbasic_vert:qp,meshbasic_frag:$p,meshlambert_vert:jp,meshlambert_frag:Zp,meshmatcap_vert:Jp,meshmatcap_frag:Kp,meshnormal_vert:Qp,meshnormal_frag:tm,meshphong_vert:em,meshphong_frag:nm,meshphysical_vert:im,meshphysical_frag:sm,meshtoon_vert:rm,meshtoon_frag:om,points_vert:am,points_frag:lm,shadow_vert:cm,shadow_frag:hm,sprite_vert:um,sprite_frag:dm},ct={common:{diffuse:{value:new Xt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Gt},alphaMap:{value:null},alphaMapTransform:{value:new Gt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Gt}},envmap:{envMap:{value:null},envMapRotation:{value:new Gt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Gt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Gt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Gt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Gt},normalScale:{value:new at(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Gt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Gt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Gt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Gt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Xt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Xt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Gt},alphaTest:{value:0},uvTransform:{value:new Gt}},sprite:{diffuse:{value:new Xt(16777215)},opacity:{value:1},center:{value:new at(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Gt},alphaMap:{value:null},alphaMapTransform:{value:new Gt},alphaTest:{value:0}}},dn={basic:{uniforms:Fe([ct.common,ct.specularmap,ct.envmap,ct.aomap,ct.lightmap,ct.fog]),vertexShader:Vt.meshbasic_vert,fragmentShader:Vt.meshbasic_frag},lambert:{uniforms:Fe([ct.common,ct.specularmap,ct.envmap,ct.aomap,ct.lightmap,ct.emissivemap,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.fog,ct.lights,{emissive:{value:new Xt(0)}}]),vertexShader:Vt.meshlambert_vert,fragmentShader:Vt.meshlambert_frag},phong:{uniforms:Fe([ct.common,ct.specularmap,ct.envmap,ct.aomap,ct.lightmap,ct.emissivemap,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.fog,ct.lights,{emissive:{value:new Xt(0)},specular:{value:new Xt(1118481)},shininess:{value:30}}]),vertexShader:Vt.meshphong_vert,fragmentShader:Vt.meshphong_frag},standard:{uniforms:Fe([ct.common,ct.envmap,ct.aomap,ct.lightmap,ct.emissivemap,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.roughnessmap,ct.metalnessmap,ct.fog,ct.lights,{emissive:{value:new Xt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Vt.meshphysical_vert,fragmentShader:Vt.meshphysical_frag},toon:{uniforms:Fe([ct.common,ct.aomap,ct.lightmap,ct.emissivemap,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.gradientmap,ct.fog,ct.lights,{emissive:{value:new Xt(0)}}]),vertexShader:Vt.meshtoon_vert,fragmentShader:Vt.meshtoon_frag},matcap:{uniforms:Fe([ct.common,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.fog,{matcap:{value:null}}]),vertexShader:Vt.meshmatcap_vert,fragmentShader:Vt.meshmatcap_frag},points:{uniforms:Fe([ct.points,ct.fog]),vertexShader:Vt.points_vert,fragmentShader:Vt.points_frag},dashed:{uniforms:Fe([ct.common,ct.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Vt.linedashed_vert,fragmentShader:Vt.linedashed_frag},depth:{uniforms:Fe([ct.common,ct.displacementmap]),vertexShader:Vt.depth_vert,fragmentShader:Vt.depth_frag},normal:{uniforms:Fe([ct.common,ct.bumpmap,ct.normalmap,ct.displacementmap,{opacity:{value:1}}]),vertexShader:Vt.meshnormal_vert,fragmentShader:Vt.meshnormal_frag},sprite:{uniforms:Fe([ct.sprite,ct.fog]),vertexShader:Vt.sprite_vert,fragmentShader:Vt.sprite_frag},background:{uniforms:{uvTransform:{value:new Gt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Vt.background_vert,fragmentShader:Vt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Gt}},vertexShader:Vt.backgroundCube_vert,fragmentShader:Vt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Vt.cube_vert,fragmentShader:Vt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Vt.equirect_vert,fragmentShader:Vt.equirect_frag},distanceRGBA:{uniforms:Fe([ct.common,ct.displacementmap,{referencePosition:{value:new D},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Vt.distanceRGBA_vert,fragmentShader:Vt.distanceRGBA_frag},shadow:{uniforms:Fe([ct.lights,ct.fog,{color:{value:new Xt(0)},opacity:{value:1}}]),vertexShader:Vt.shadow_vert,fragmentShader:Vt.shadow_frag}};dn.physical={uniforms:Fe([dn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Gt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Gt},clearcoatNormalScale:{value:new at(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Gt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Gt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Gt},sheen:{value:0},sheenColor:{value:new Xt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Gt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Gt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Gt},transmissionSamplerSize:{value:new at},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Gt},attenuationDistance:{value:0},attenuationColor:{value:new Xt(0)},specularColor:{value:new Xt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Gt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Gt},anisotropyVector:{value:new at},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Gt}}]),vertexShader:Vt.meshphysical_vert,fragmentShader:Vt.meshphysical_frag};const tr={r:0,b:0,g:0},Kn=new Rn,fm=new ue;function pm(i,t,e,n,s,r,o){const a=new Xt(0);let l=r===!0?0:1,c,h,u=null,d=0,p=null;function g(v){let _=v.isScene===!0?v.background:null;return _&&_.isTexture&&(_=(v.backgroundBlurriness>0?e:t).get(_)),_}function x(v){let _=!1;const P=g(v);P===null?f(a,l):P&&P.isColor&&(f(P,1),_=!0);const A=i.xr.getEnvironmentBlendMode();A==="additive"?n.buffers.color.setClear(0,0,0,1,o):A==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||_)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(v,_){const P=g(_);P&&(P.isCubeTexture||P.mapping===Ar)?(h===void 0&&(h=new he(new ye(1,1,1),new Vn({name:"BackgroundCubeMaterial",uniforms:Yi(dn.backgroundCube.uniforms),vertexShader:dn.backgroundCube.vertexShader,fragmentShader:dn.backgroundCube.fragmentShader,side:Ge,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(A,E,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),Kn.copy(_.backgroundRotation),Kn.x*=-1,Kn.y*=-1,Kn.z*=-1,P.isCubeTexture&&P.isRenderTargetTexture===!1&&(Kn.y*=-1,Kn.z*=-1),h.material.uniforms.envMap.value=P,h.material.uniforms.flipEnvMap.value=P.isCubeTexture&&P.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(fm.makeRotationFromEuler(Kn)),h.material.toneMapped=Qt.getTransfer(P.colorSpace)!==le,(u!==P||d!==P.version||p!==i.toneMapping)&&(h.material.needsUpdate=!0,u=P,d=P.version,p=i.toneMapping),h.layers.enableAll(),v.unshift(h,h.geometry,h.material,0,0,null)):P&&P.isTexture&&(c===void 0&&(c=new he(new Cn(2,2),new Vn({name:"BackgroundMaterial",uniforms:Yi(dn.background.uniforms),vertexShader:dn.background.vertexShader,fragmentShader:dn.background.fragmentShader,side:Hn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=P,c.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,c.material.toneMapped=Qt.getTransfer(P.colorSpace)!==le,P.matrixAutoUpdate===!0&&P.updateMatrix(),c.material.uniforms.uvTransform.value.copy(P.matrix),(u!==P||d!==P.version||p!==i.toneMapping)&&(c.material.needsUpdate=!0,u=P,d=P.version,p=i.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null))}function f(v,_){v.getRGB(tr,Lc(i)),n.buffers.color.setClear(tr.r,tr.g,tr.b,_,o)}function b(){h!==void 0&&(h.geometry.dispose(),h.material.dispose()),c!==void 0&&(c.geometry.dispose(),c.material.dispose())}return{getClearColor:function(){return a},setClearColor:function(v,_=1){a.set(v),l=_,f(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(v){l=v,f(a,l)},render:x,addToRenderList:m,dispose:b}}function mm(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null);let r=s,o=!1;function a(y,L,k,O,W){let Y=!1;const X=u(O,k,L);r!==X&&(r=X,c(r.object)),Y=p(y,O,k,W),Y&&g(y,O,k,W),W!==null&&t.update(W,i.ELEMENT_ARRAY_BUFFER),(Y||o)&&(o=!1,_(y,L,k,O),W!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(W).buffer))}function l(){return i.createVertexArray()}function c(y){return i.bindVertexArray(y)}function h(y){return i.deleteVertexArray(y)}function u(y,L,k){const O=k.wireframe===!0;let W=n[y.id];W===void 0&&(W={},n[y.id]=W);let Y=W[L.id];Y===void 0&&(Y={},W[L.id]=Y);let X=Y[O];return X===void 0&&(X=d(l()),Y[O]=X),X}function d(y){const L=[],k=[],O=[];for(let W=0;W<e;W++)L[W]=0,k[W]=0,O[W]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:k,attributeDivisors:O,object:y,attributes:{},index:null}}function p(y,L,k,O){const W=r.attributes,Y=L.attributes;let X=0;const K=k.getAttributes();for(const H in K)if(K[H].location>=0){const gt=W[H];let Mt=Y[H];if(Mt===void 0&&(H==="instanceMatrix"&&y.instanceMatrix&&(Mt=y.instanceMatrix),H==="instanceColor"&&y.instanceColor&&(Mt=y.instanceColor)),gt===void 0||gt.attribute!==Mt||Mt&&gt.data!==Mt.data)return!0;X++}return r.attributesNum!==X||r.index!==O}function g(y,L,k,O){const W={},Y=L.attributes;let X=0;const K=k.getAttributes();for(const H in K)if(K[H].location>=0){let gt=Y[H];gt===void 0&&(H==="instanceMatrix"&&y.instanceMatrix&&(gt=y.instanceMatrix),H==="instanceColor"&&y.instanceColor&&(gt=y.instanceColor));const Mt={};Mt.attribute=gt,gt&&gt.data&&(Mt.data=gt.data),W[H]=Mt,X++}r.attributes=W,r.attributesNum=X,r.index=O}function x(){const y=r.newAttributes;for(let L=0,k=y.length;L<k;L++)y[L]=0}function m(y){f(y,0)}function f(y,L){const k=r.newAttributes,O=r.enabledAttributes,W=r.attributeDivisors;k[y]=1,O[y]===0&&(i.enableVertexAttribArray(y),O[y]=1),W[y]!==L&&(i.vertexAttribDivisor(y,L),W[y]=L)}function b(){const y=r.newAttributes,L=r.enabledAttributes;for(let k=0,O=L.length;k<O;k++)L[k]!==y[k]&&(i.disableVertexAttribArray(k),L[k]=0)}function v(y,L,k,O,W,Y,X){X===!0?i.vertexAttribIPointer(y,L,k,W,Y):i.vertexAttribPointer(y,L,k,O,W,Y)}function _(y,L,k,O){x();const W=O.attributes,Y=k.getAttributes(),X=L.defaultAttributeValues;for(const K in Y){const H=Y[K];if(H.location>=0){let lt=W[K];if(lt===void 0&&(K==="instanceMatrix"&&y.instanceMatrix&&(lt=y.instanceMatrix),K==="instanceColor"&&y.instanceColor&&(lt=y.instanceColor)),lt!==void 0){const gt=lt.normalized,Mt=lt.itemSize,kt=t.get(lt);if(kt===void 0)continue;const ne=kt.buffer,j=kt.type,st=kt.bytesPerElement,wt=j===i.INT||j===i.UNSIGNED_INT||lt.gpuType===da;if(lt.isInterleavedBufferAttribute){const ot=lt.data,At=ot.stride,Ft=lt.offset;if(ot.isInstancedInterleavedBuffer){for(let It=0;It<H.locationSize;It++)f(H.location+It,ot.meshPerAttribute);y.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=ot.meshPerAttribute*ot.count)}else for(let It=0;It<H.locationSize;It++)m(H.location+It);i.bindBuffer(i.ARRAY_BUFFER,ne);for(let It=0;It<H.locationSize;It++)v(H.location+It,Mt/H.locationSize,j,gt,At*st,(Ft+Mt/H.locationSize*It)*st,wt)}else{if(lt.isInstancedBufferAttribute){for(let ot=0;ot<H.locationSize;ot++)f(H.location+ot,lt.meshPerAttribute);y.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=lt.meshPerAttribute*lt.count)}else for(let ot=0;ot<H.locationSize;ot++)m(H.location+ot);i.bindBuffer(i.ARRAY_BUFFER,ne);for(let ot=0;ot<H.locationSize;ot++)v(H.location+ot,Mt/H.locationSize,j,gt,Mt*st,Mt/H.locationSize*ot*st,wt)}}else if(X!==void 0){const gt=X[K];if(gt!==void 0)switch(gt.length){case 2:i.vertexAttrib2fv(H.location,gt);break;case 3:i.vertexAttrib3fv(H.location,gt);break;case 4:i.vertexAttrib4fv(H.location,gt);break;default:i.vertexAttrib1fv(H.location,gt)}}}}b()}function P(){C();for(const y in n){const L=n[y];for(const k in L){const O=L[k];for(const W in O)h(O[W].object),delete O[W];delete L[k]}delete n[y]}}function A(y){if(n[y.id]===void 0)return;const L=n[y.id];for(const k in L){const O=L[k];for(const W in O)h(O[W].object),delete O[W];delete L[k]}delete n[y.id]}function E(y){for(const L in n){const k=n[L];if(k[y.id]===void 0)continue;const O=k[y.id];for(const W in O)h(O[W].object),delete O[W];delete k[y.id]}}function C(){S(),o=!0,r!==s&&(r=s,c(r.object))}function S(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:C,resetDefaultState:S,dispose:P,releaseStatesOfGeometry:A,releaseStatesOfProgram:E,initAttributes:x,enableAttribute:m,disableUnusedAttributes:b}}function gm(i,t,e){let n;function s(c){n=c}function r(c,h){i.drawArrays(n,c,h),e.update(h,n,1)}function o(c,h,u){u!==0&&(i.drawArraysInstanced(n,c,h,u),e.update(h,n,u))}function a(c,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let p=0;for(let g=0;g<u;g++)p+=h[g];e.update(p,n,1)}function l(c,h,u,d){if(u===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<c.length;g++)o(c[g],h[g],d[g]);else{p.multiDrawArraysInstancedWEBGL(n,c,0,h,0,d,0,u);let g=0;for(let x=0;x<u;x++)g+=h[x]*d[x];e.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function _m(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const E=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(E.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(E){return!(E!==cn&&n.convert(E)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(E){const C=E===xs&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(E!==An&&n.convert(E)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&E!==wn&&!C)}function l(E){if(E==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";E="mediump"}return E==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=e.logarithmicDepthBuffer===!0,d=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),f=i.getParameter(i.MAX_VERTEX_ATTRIBS),b=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),v=i.getParameter(i.MAX_VARYING_VECTORS),_=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),P=g>0,A=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:u,reverseDepthBuffer:d,maxTextures:p,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:b,maxVaryings:v,maxFragmentUniforms:_,vertexTextures:P,maxSamples:A}}function vm(i){const t=this;let e=null,n=0,s=!1,r=!1;const o=new ni,a=new Gt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const p=u.length!==0||d||n!==0||s;return s=d,n=u.length,p},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){e=h(u,d,0)},this.setState=function(u,d,p){const g=u.clippingPlanes,x=u.clipIntersection,m=u.clipShadows,f=i.get(u);if(!s||g===null||g.length===0||r&&!m)r?h(null):c();else{const b=r?0:n,v=b*4;let _=f.clippingState||null;l.value=_,_=h(g,d,v,p);for(let P=0;P!==v;++P)_[P]=e[P];f.clippingState=_,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=b}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,d,p,g){const x=u!==null?u.length:0;let m=null;if(x!==0){if(m=l.value,g!==!0||m===null){const f=p+x*4,b=d.matrixWorldInverse;a.getNormalMatrix(b),(m===null||m.length<f)&&(m=new Float32Array(f));for(let v=0,_=p;v!==x;++v,_+=4)o.copy(u[v]).applyMatrix4(b,a),o.normal.toArray(m,_),m[_+3]=o.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,m}}function xm(i){let t=new WeakMap;function e(o,a){return a===Po?o.mapping=Gi:a===Lo&&(o.mapping=Hi),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===Po||a===Lo)if(t.has(o)){const l=t.get(o).texture;return e(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new Gu(l.height);return c.fromEquirectangularTexture(i,o),t.set(o,c),o.addEventListener("dispose",s),e(c.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}const Fi=4,Al=[.125,.215,.35,.446,.526,.582],oi=20,lo=new qc,Rl=new Xt;let co=null,ho=0,uo=0,fo=!1;const ii=(1+Math.sqrt(5))/2,Ci=1/ii,Cl=[new D(-ii,Ci,0),new D(ii,Ci,0),new D(-Ci,0,ii),new D(Ci,0,ii),new D(0,ii,-Ci),new D(0,ii,Ci),new D(-1,1,-1),new D(1,1,-1),new D(-1,1,1),new D(1,1,1)];class Pl{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100){co=this._renderer.getRenderTarget(),ho=this._renderer.getActiveCubeFace(),uo=this._renderer.getActiveMipmapLevel(),fo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Il(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Dl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(co,ho,uo),this._renderer.xr.enabled=fo,t.scissorTest=!1,er(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Gi||t.mapping===Hi?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),co=this._renderer.getRenderTarget(),ho=this._renderer.getActiveCubeFace(),uo=this._renderer.getActiveMipmapLevel(),fo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:fn,minFilter:fn,generateMipmaps:!1,type:xs,format:cn,colorSpace:Xi,depthBuffer:!1},s=Ll(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ll(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=ym(r)),this._blurMaterial=bm(r,t,e)}return s}_compileMaterial(t){const e=new he(this._lodPlanes[0],t);this._renderer.compile(e,lo)}_sceneToCubeUV(t,e,n,s){const a=new Ke(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(Rl),h.toneMapping=zn,h.autoClear=!1;const p=new ba({name:"PMREM.Background",side:Ge,depthWrite:!1,depthTest:!1}),g=new he(new ye,p);let x=!1;const m=t.background;m?m.isColor&&(p.color.copy(m),t.background=null,x=!0):(p.color.copy(Rl),x=!0);for(let f=0;f<6;f++){const b=f%3;b===0?(a.up.set(0,l[f],0),a.lookAt(c[f],0,0)):b===1?(a.up.set(0,0,l[f]),a.lookAt(0,c[f],0)):(a.up.set(0,l[f],0),a.lookAt(0,0,c[f]));const v=this._cubeSize;er(s,b*v,f>2?v:0,v,v),h.setRenderTarget(s),x&&h.render(g,a),h.render(t,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=d,h.autoClear=u,t.background=m}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===Gi||t.mapping===Hi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Il()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Dl());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new he(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;const l=this._cubeSize;er(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(o,lo)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Cl[(s-r-1)%Cl.length];this._blur(t,r-1,r,o,a)}e.autoClear=n}_blur(t,e,n,s,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,s,"latitudinal",r),this._halfBlur(o,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new he(this._lodPlanes[s],c),d=c.uniforms,p=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*oi-1),x=r/g,m=isFinite(r)?1+Math.floor(h*x):oi;m>oi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${oi}`);const f=[];let b=0;for(let E=0;E<oi;++E){const C=E/x,S=Math.exp(-C*C/2);f.push(S),E===0?b+=S:E<m&&(b+=2*S)}for(let E=0;E<f.length;E++)f[E]=f[E]/b;d.envMap.value=t.texture,d.samples.value=m,d.weights.value=f,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:v}=this;d.dTheta.value=g,d.mipInt.value=v-n;const _=this._sizeLods[s],P=3*_*(s>v-Fi?s-v+Fi:0),A=4*(this._cubeSize-_);er(e,P,A,3*_,2*_),l.setRenderTarget(e),l.render(u,lo)}}function ym(i){const t=[],e=[],n=[];let s=i;const r=i-Fi+1+Al.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);e.push(a);let l=1/a;o>i-Fi?l=Al[o-i+Fi-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],p=6,g=6,x=3,m=2,f=1,b=new Float32Array(x*g*p),v=new Float32Array(m*g*p),_=new Float32Array(f*g*p);for(let A=0;A<p;A++){const E=A%3*2/3-1,C=A>2?0:-1,S=[E,C,0,E+2/3,C,0,E+2/3,C+1,0,E,C,0,E+2/3,C+1,0,E,C+1,0];b.set(S,x*g*A),v.set(d,m*g*A);const y=[A,A,A,A,A,A];_.set(y,f*g*A)}const P=new pe;P.setAttribute("position",new He(b,x)),P.setAttribute("uv",new He(v,m)),P.setAttribute("faceIndex",new He(_,f)),t.push(P),s>Fi&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Ll(i,t,e){const n=new hi(i,t,e);return n.texture.mapping=Ar,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function er(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function bm(i,t,e){const n=new Float32Array(oi),s=new D(0,1,0);return new Vn({name:"SphericalGaussianBlur",defines:{n:oi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Ca(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:kn,depthTest:!1,depthWrite:!1})}function Dl(){return new Vn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ca(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:kn,depthTest:!1,depthWrite:!1})}function Il(){return new Vn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ca(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:kn,depthTest:!1,depthWrite:!1})}function Ca(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Mm(i){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===Po||l===Lo,h=l===Gi||l===Hi;if(c||h){let u=t.get(a);const d=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return e===null&&(e=new Pl(i)),u=c?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{const p=a.image;return c&&p&&p.height>0||h&&p&&s(p)?(e===null&&(e=new Pl(i)),u=c?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function s(a){let l=0;const c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function r(a){const l=a.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function Sm(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&Ii("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function wm(i,t,e,n){const s={},r=new WeakMap;function o(u){const d=u.target;d.index!==null&&t.remove(d.index);for(const g in d.attributes)t.remove(d.attributes[g]);d.removeEventListener("dispose",o),delete s[d.id];const p=r.get(d);p&&(t.remove(p),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function a(u,d){return s[d.id]===!0||(d.addEventListener("dispose",o),s[d.id]=!0,e.memory.geometries++),d}function l(u){const d=u.attributes;for(const p in d)t.update(d[p],i.ARRAY_BUFFER)}function c(u){const d=[],p=u.index,g=u.attributes.position;let x=0;if(p!==null){const b=p.array;x=p.version;for(let v=0,_=b.length;v<_;v+=3){const P=b[v+0],A=b[v+1],E=b[v+2];d.push(P,A,A,E,E,P)}}else if(g!==void 0){const b=g.array;x=g.version;for(let v=0,_=b.length/3-1;v<_;v+=3){const P=v+0,A=v+1,E=v+2;d.push(P,A,A,E,E,P)}}else return;const m=new(wc(d)?Pc:Cc)(d,1);m.version=x;const f=r.get(u);f&&t.remove(f),r.set(u,m)}function h(u){const d=r.get(u);if(d){const p=u.index;p!==null&&d.version<p.version&&c(u)}else c(u);return r.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function Em(i,t,e){let n;function s(d){n=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function l(d,p){i.drawElements(n,p,r,d*o),e.update(p,n,1)}function c(d,p,g){g!==0&&(i.drawElementsInstanced(n,p,r,d*o,g),e.update(p,n,g))}function h(d,p,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,p,0,r,d,0,g);let m=0;for(let f=0;f<g;f++)m+=p[f];e.update(m,n,1)}function u(d,p,g,x){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let f=0;f<d.length;f++)c(d[f]/o,p[f],x[f]);else{m.multiDrawElementsInstancedWEBGL(n,p,0,r,d,0,x,0,g);let f=0;for(let b=0;b<g;b++)f+=p[b]*x[b];e.update(f,n,1)}}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function Tm(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function Am(i,t,e){const n=new WeakMap,s=new xe;function r(o,a,l){const c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let d=n.get(a);if(d===void 0||d.count!==u){let y=function(){C.dispose(),n.delete(a),a.removeEventListener("dispose",y)};var p=y;d!==void 0&&d.texture.dispose();const g=a.morphAttributes.position!==void 0,x=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,f=a.morphAttributes.position||[],b=a.morphAttributes.normal||[],v=a.morphAttributes.color||[];let _=0;g===!0&&(_=1),x===!0&&(_=2),m===!0&&(_=3);let P=a.attributes.position.count*_,A=1;P>t.maxTextureSize&&(A=Math.ceil(P/t.maxTextureSize),P=t.maxTextureSize);const E=new Float32Array(P*A*4*u),C=new Tc(E,P,A,u);C.type=wn,C.needsUpdate=!0;const S=_*4;for(let L=0;L<u;L++){const k=f[L],O=b[L],W=v[L],Y=P*A*4*L;for(let X=0;X<k.count;X++){const K=X*S;g===!0&&(s.fromBufferAttribute(k,X),E[Y+K+0]=s.x,E[Y+K+1]=s.y,E[Y+K+2]=s.z,E[Y+K+3]=0),x===!0&&(s.fromBufferAttribute(O,X),E[Y+K+4]=s.x,E[Y+K+5]=s.y,E[Y+K+6]=s.z,E[Y+K+7]=0),m===!0&&(s.fromBufferAttribute(W,X),E[Y+K+8]=s.x,E[Y+K+9]=s.y,E[Y+K+10]=s.z,E[Y+K+11]=W.itemSize===4?s.w:1)}}d={count:u,texture:C,size:new at(P,A)},n.set(a,d),a.addEventListener("dispose",y)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];const x=a.morphTargetsRelative?1:1-g;l.getUniforms().setValue(i,"morphTargetBaseInfluence",x),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",d.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function Rm(i,t,e,n){let s=new WeakMap;function r(l){const c=n.render.frame,h=l.geometry,u=t.get(l,h);if(s.get(u)!==c&&(t.update(u),s.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;s.get(d)!==c&&(d.update(),s.set(d,c))}return u}function o(){s=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:o}}const jc=new Ce,Ul=new Fc(1,1),Zc=new Tc,Jc=new Eu,Kc=new Ic,Nl=[],Fl=[],Ol=new Float32Array(16),Bl=new Float32Array(9),kl=new Float32Array(4);function $i(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=Nl[s];if(r===void 0&&(r=new Float32Array(s),Nl[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function we(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Ee(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Dr(i,t){let e=Fl[t];e===void 0&&(e=new Int32Array(t),Fl[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Cm(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function Pm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(we(e,t))return;i.uniform2fv(this.addr,t),Ee(e,t)}}function Lm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(we(e,t))return;i.uniform3fv(this.addr,t),Ee(e,t)}}function Dm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(we(e,t))return;i.uniform4fv(this.addr,t),Ee(e,t)}}function Im(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(we(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Ee(e,t)}else{if(we(e,n))return;kl.set(n),i.uniformMatrix2fv(this.addr,!1,kl),Ee(e,n)}}function Um(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(we(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Ee(e,t)}else{if(we(e,n))return;Bl.set(n),i.uniformMatrix3fv(this.addr,!1,Bl),Ee(e,n)}}function Nm(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(we(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Ee(e,t)}else{if(we(e,n))return;Ol.set(n),i.uniformMatrix4fv(this.addr,!1,Ol),Ee(e,n)}}function Fm(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Om(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(we(e,t))return;i.uniform2iv(this.addr,t),Ee(e,t)}}function Bm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(we(e,t))return;i.uniform3iv(this.addr,t),Ee(e,t)}}function km(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(we(e,t))return;i.uniform4iv(this.addr,t),Ee(e,t)}}function zm(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function Gm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(we(e,t))return;i.uniform2uiv(this.addr,t),Ee(e,t)}}function Hm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(we(e,t))return;i.uniform3uiv(this.addr,t),Ee(e,t)}}function Vm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(we(e,t))return;i.uniform4uiv(this.addr,t),Ee(e,t)}}function Wm(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Ul.compareFunction=Sc,r=Ul):r=jc,e.setTexture2D(t||r,s)}function Xm(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||Jc,s)}function Ym(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||Kc,s)}function qm(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Zc,s)}function $m(i){switch(i){case 5126:return Cm;case 35664:return Pm;case 35665:return Lm;case 35666:return Dm;case 35674:return Im;case 35675:return Um;case 35676:return Nm;case 5124:case 35670:return Fm;case 35667:case 35671:return Om;case 35668:case 35672:return Bm;case 35669:case 35673:return km;case 5125:return zm;case 36294:return Gm;case 36295:return Hm;case 36296:return Vm;case 35678:case 36198:case 36298:case 36306:case 35682:return Wm;case 35679:case 36299:case 36307:return Xm;case 35680:case 36300:case 36308:case 36293:return Ym;case 36289:case 36303:case 36311:case 36292:return qm}}function jm(i,t){i.uniform1fv(this.addr,t)}function Zm(i,t){const e=$i(t,this.size,2);i.uniform2fv(this.addr,e)}function Jm(i,t){const e=$i(t,this.size,3);i.uniform3fv(this.addr,e)}function Km(i,t){const e=$i(t,this.size,4);i.uniform4fv(this.addr,e)}function Qm(i,t){const e=$i(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function tg(i,t){const e=$i(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function eg(i,t){const e=$i(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function ng(i,t){i.uniform1iv(this.addr,t)}function ig(i,t){i.uniform2iv(this.addr,t)}function sg(i,t){i.uniform3iv(this.addr,t)}function rg(i,t){i.uniform4iv(this.addr,t)}function og(i,t){i.uniform1uiv(this.addr,t)}function ag(i,t){i.uniform2uiv(this.addr,t)}function lg(i,t){i.uniform3uiv(this.addr,t)}function cg(i,t){i.uniform4uiv(this.addr,t)}function hg(i,t,e){const n=this.cache,s=t.length,r=Dr(e,s);we(n,r)||(i.uniform1iv(this.addr,r),Ee(n,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||jc,r[o])}function ug(i,t,e){const n=this.cache,s=t.length,r=Dr(e,s);we(n,r)||(i.uniform1iv(this.addr,r),Ee(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||Jc,r[o])}function dg(i,t,e){const n=this.cache,s=t.length,r=Dr(e,s);we(n,r)||(i.uniform1iv(this.addr,r),Ee(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||Kc,r[o])}function fg(i,t,e){const n=this.cache,s=t.length,r=Dr(e,s);we(n,r)||(i.uniform1iv(this.addr,r),Ee(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||Zc,r[o])}function pg(i){switch(i){case 5126:return jm;case 35664:return Zm;case 35665:return Jm;case 35666:return Km;case 35674:return Qm;case 35675:return tg;case 35676:return eg;case 5124:case 35670:return ng;case 35667:case 35671:return ig;case 35668:case 35672:return sg;case 35669:case 35673:return rg;case 5125:return og;case 36294:return ag;case 36295:return lg;case 36296:return cg;case 35678:case 36198:case 36298:case 36306:case 35682:return hg;case 35679:case 36299:case 36307:return ug;case 35680:case 36300:case 36308:case 36293:return dg;case 36289:case 36303:case 36311:case 36292:return fg}}class mg{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=$m(e.type)}}class gg{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=pg(e.type)}}class _g{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(t,e[a.id],n)}}}const po=/(\w+)(\])?(\[|\.)?/g;function zl(i,t){i.seq.push(t),i.map[t.id]=t}function vg(i,t,e){const n=i.name,s=n.length;for(po.lastIndex=0;;){const r=po.exec(n),o=po.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){zl(e,c===void 0?new mg(a,i,t):new gg(a,i,t));break}else{let u=e.map[a];u===void 0&&(u=new _g(a),zl(e,u)),e=u}}}class fr{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);vg(r,o,this)}}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){const a=e[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const o=t[s];o.id in e&&n.push(o)}return n}}function Gl(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const xg=37297;let yg=0;function bg(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}const Hl=new Gt;function Mg(i){Qt._getMatrix(Hl,Qt.workingColorSpace,i);const t=`mat3( ${Hl.elements.map(e=>e.toFixed(4))} )`;switch(Qt.getTransfer(i)){case gr:return[t,"LinearTransferOETF"];case le:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Vl(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),s=i.getShaderInfoLog(t).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+bg(i.getShaderSource(t),o)}else return s}function Sg(i,t){const e=Mg(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function wg(i,t){let e;switch(t){case Fh:e="Linear";break;case Oh:e="Reinhard";break;case Bh:e="Cineon";break;case uc:e="ACESFilmic";break;case zh:e="AgX";break;case Gh:e="Neutral";break;case kh:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const nr=new D;function Eg(){Qt.getLuminanceCoefficients(nr);const i=nr.x.toFixed(4),t=nr.y.toFixed(4),e=nr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Tg(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(os).join(`
`)}function Ag(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Rg(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),o=r.name;let a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function os(i){return i!==""}function Wl(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Xl(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Cg=/^[ \t]*#include +<([\w\d./]+)>/gm;function la(i){return i.replace(Cg,Lg)}const Pg=new Map;function Lg(i,t){let e=Vt[t];if(e===void 0){const n=Pg.get(t);if(n!==void 0)e=Vt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return la(e)}const Dg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Yl(i){return i.replace(Dg,Ig)}function Ig(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function ql(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function Ug(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===lc?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===cc?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Mn&&(t="SHADOWMAP_TYPE_VSM"),t}function Ng(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Gi:case Hi:t="ENVMAP_TYPE_CUBE";break;case Ar:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Fg(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Hi:t="ENVMAP_MODE_REFRACTION";break}return t}function Og(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case hc:t="ENVMAP_BLENDING_MULTIPLY";break;case Uh:t="ENVMAP_BLENDING_MIX";break;case Nh:t="ENVMAP_BLENDING_ADD";break}return t}function Bg(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function kg(i,t,e,n){const s=i.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const l=Ug(e),c=Ng(e),h=Fg(e),u=Og(e),d=Bg(e),p=Tg(e),g=Ag(r),x=s.createProgram();let m,f,b=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(os).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(os).join(`
`),f.length>0&&(f+=`
`)):(m=[ql(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(os).join(`
`),f=[ql(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==zn?"#define TONE_MAPPING":"",e.toneMapping!==zn?Vt.tonemapping_pars_fragment:"",e.toneMapping!==zn?wg("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Vt.colorspace_pars_fragment,Sg("linearToOutputTexel",e.outputColorSpace),Eg(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(os).join(`
`)),o=la(o),o=Wl(o,e),o=Xl(o,e),a=la(a),a=Wl(a,e),a=Xl(a,e),o=Yl(o),a=Yl(a),e.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",e.glslVersion===$a?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===$a?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const v=b+m+o,_=b+f+a,P=Gl(s,s.VERTEX_SHADER,v),A=Gl(s,s.FRAGMENT_SHADER,_);s.attachShader(x,P),s.attachShader(x,A),e.index0AttributeName!==void 0?s.bindAttribLocation(x,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function E(L){if(i.debug.checkShaderErrors){const k=s.getProgramInfoLog(x).trim(),O=s.getShaderInfoLog(P).trim(),W=s.getShaderInfoLog(A).trim();let Y=!0,X=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(Y=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,x,P,A);else{const K=Vl(s,P,"vertex"),H=Vl(s,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+k+`
`+K+`
`+H)}else k!==""?console.warn("THREE.WebGLProgram: Program Info Log:",k):(O===""||W==="")&&(X=!1);X&&(L.diagnostics={runnable:Y,programLog:k,vertexShader:{log:O,prefix:m},fragmentShader:{log:W,prefix:f}})}s.deleteShader(P),s.deleteShader(A),C=new fr(s,x),S=Rg(s,x)}let C;this.getUniforms=function(){return C===void 0&&E(this),C};let S;this.getAttributes=function(){return S===void 0&&E(this),S};let y=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=s.getProgramParameter(x,xg)),y},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=yg++,this.cacheKey=t,this.usedTimes=1,this.program=x,this.vertexShader=P,this.fragmentShader=A,this}let zg=0;class Gg{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new Hg(t),e.set(t,n)),n}}class Hg{constructor(t){this.id=zg++,this.code=t,this.usedTimes=0}}function Vg(i,t,e,n,s,r,o){const a=new Ac,l=new Gg,c=new Set,h=[],u=s.logarithmicDepthBuffer,d=s.vertexTextures;let p=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(S){return c.add(S),S===0?"uv":`uv${S}`}function m(S,y,L,k,O){const W=k.fog,Y=O.geometry,X=S.isMeshStandardMaterial?k.environment:null,K=(S.isMeshStandardMaterial?e:t).get(S.envMap||X),H=K&&K.mapping===Ar?K.image.height:null,lt=g[S.type];S.precision!==null&&(p=s.getMaxPrecision(S.precision),p!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",p,"instead."));const gt=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,Mt=gt!==void 0?gt.length:0;let kt=0;Y.morphAttributes.position!==void 0&&(kt=1),Y.morphAttributes.normal!==void 0&&(kt=2),Y.morphAttributes.color!==void 0&&(kt=3);let ne,j,st,wt;if(lt){const re=dn[lt];ne=re.vertexShader,j=re.fragmentShader}else ne=S.vertexShader,j=S.fragmentShader,l.update(S),st=l.getVertexShaderID(S),wt=l.getFragmentShaderID(S);const ot=i.getRenderTarget(),At=i.state.buffers.depth.getReversed(),Ft=O.isInstancedMesh===!0,It=O.isBatchedMesh===!0,Zt=!!S.map,J=!!S.matcap,it=!!K,R=!!S.aoMap,Tt=!!S.lightMap,tt=!!S.bumpMap,vt=!!S.normalMap,rt=!!S.displacementMap,Dt=!!S.emissiveMap,pt=!!S.metalnessMap,T=!!S.roughnessMap,M=S.anisotropy>0,B=S.clearcoat>0,q=S.dispersion>0,Q=S.iridescence>0,$=S.sheen>0,Et=S.transmission>0,ht=M&&!!S.anisotropyMap,_t=B&&!!S.clearcoatMap,Yt=B&&!!S.clearcoatNormalMap,nt=B&&!!S.clearcoatRoughnessMap,yt=Q&&!!S.iridescenceMap,Lt=Q&&!!S.iridescenceThicknessMap,Ut=$&&!!S.sheenColorMap,bt=$&&!!S.sheenRoughnessMap,$t=!!S.specularMap,Ht=!!S.specularColorMap,ce=!!S.specularIntensityMap,U=Et&&!!S.transmissionMap,ut=Et&&!!S.thicknessMap,V=!!S.gradientMap,Z=!!S.alphaMap,mt=S.alphaTest>0,ft=!!S.alphaHash,zt=!!S.extensions;let me=zn;S.toneMapped&&(ot===null||ot.isXRRenderTarget===!0)&&(me=i.toneMapping);const Pe={shaderID:lt,shaderType:S.type,shaderName:S.name,vertexShader:ne,fragmentShader:j,defines:S.defines,customVertexShaderID:st,customFragmentShaderID:wt,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:p,batching:It,batchingColor:It&&O._colorsTexture!==null,instancing:Ft,instancingColor:Ft&&O.instanceColor!==null,instancingMorph:Ft&&O.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:ot===null?i.outputColorSpace:ot.isXRRenderTarget===!0?ot.texture.colorSpace:Xi,alphaToCoverage:!!S.alphaToCoverage,map:Zt,matcap:J,envMap:it,envMapMode:it&&K.mapping,envMapCubeUVHeight:H,aoMap:R,lightMap:Tt,bumpMap:tt,normalMap:vt,displacementMap:d&&rt,emissiveMap:Dt,normalMapObjectSpace:vt&&S.normalMapType===Xh,normalMapTangentSpace:vt&&S.normalMapType===Mc,metalnessMap:pt,roughnessMap:T,anisotropy:M,anisotropyMap:ht,clearcoat:B,clearcoatMap:_t,clearcoatNormalMap:Yt,clearcoatRoughnessMap:nt,dispersion:q,iridescence:Q,iridescenceMap:yt,iridescenceThicknessMap:Lt,sheen:$,sheenColorMap:Ut,sheenRoughnessMap:bt,specularMap:$t,specularColorMap:Ht,specularIntensityMap:ce,transmission:Et,transmissionMap:U,thicknessMap:ut,gradientMap:V,opaque:S.transparent===!1&&S.blending===Oi&&S.alphaToCoverage===!1,alphaMap:Z,alphaTest:mt,alphaHash:ft,combine:S.combine,mapUv:Zt&&x(S.map.channel),aoMapUv:R&&x(S.aoMap.channel),lightMapUv:Tt&&x(S.lightMap.channel),bumpMapUv:tt&&x(S.bumpMap.channel),normalMapUv:vt&&x(S.normalMap.channel),displacementMapUv:rt&&x(S.displacementMap.channel),emissiveMapUv:Dt&&x(S.emissiveMap.channel),metalnessMapUv:pt&&x(S.metalnessMap.channel),roughnessMapUv:T&&x(S.roughnessMap.channel),anisotropyMapUv:ht&&x(S.anisotropyMap.channel),clearcoatMapUv:_t&&x(S.clearcoatMap.channel),clearcoatNormalMapUv:Yt&&x(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:nt&&x(S.clearcoatRoughnessMap.channel),iridescenceMapUv:yt&&x(S.iridescenceMap.channel),iridescenceThicknessMapUv:Lt&&x(S.iridescenceThicknessMap.channel),sheenColorMapUv:Ut&&x(S.sheenColorMap.channel),sheenRoughnessMapUv:bt&&x(S.sheenRoughnessMap.channel),specularMapUv:$t&&x(S.specularMap.channel),specularColorMapUv:Ht&&x(S.specularColorMap.channel),specularIntensityMapUv:ce&&x(S.specularIntensityMap.channel),transmissionMapUv:U&&x(S.transmissionMap.channel),thicknessMapUv:ut&&x(S.thicknessMap.channel),alphaMapUv:Z&&x(S.alphaMap.channel),vertexTangents:!!Y.attributes.tangent&&(vt||M),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!Y.attributes.uv&&(Zt||Z),fog:!!W,useFog:S.fog===!0,fogExp2:!!W&&W.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:At,skinning:O.isSkinnedMesh===!0,morphTargets:Y.morphAttributes.position!==void 0,morphNormals:Y.morphAttributes.normal!==void 0,morphColors:Y.morphAttributes.color!==void 0,morphTargetsCount:Mt,morphTextureStride:kt,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:S.dithering,shadowMapEnabled:i.shadowMap.enabled&&L.length>0,shadowMapType:i.shadowMap.type,toneMapping:me,decodeVideoTexture:Zt&&S.map.isVideoTexture===!0&&Qt.getTransfer(S.map.colorSpace)===le,decodeVideoTextureEmissive:Dt&&S.emissiveMap.isVideoTexture===!0&&Qt.getTransfer(S.emissiveMap.colorSpace)===le,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===Qe,flipSided:S.side===Ge,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:zt&&S.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(zt&&S.extensions.multiDraw===!0||It)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return Pe.vertexUv1s=c.has(1),Pe.vertexUv2s=c.has(2),Pe.vertexUv3s=c.has(3),c.clear(),Pe}function f(S){const y=[];if(S.shaderID?y.push(S.shaderID):(y.push(S.customVertexShaderID),y.push(S.customFragmentShaderID)),S.defines!==void 0)for(const L in S.defines)y.push(L),y.push(S.defines[L]);return S.isRawShaderMaterial===!1&&(b(y,S),v(y,S),y.push(i.outputColorSpace)),y.push(S.customProgramCacheKey),y.join()}function b(S,y){S.push(y.precision),S.push(y.outputColorSpace),S.push(y.envMapMode),S.push(y.envMapCubeUVHeight),S.push(y.mapUv),S.push(y.alphaMapUv),S.push(y.lightMapUv),S.push(y.aoMapUv),S.push(y.bumpMapUv),S.push(y.normalMapUv),S.push(y.displacementMapUv),S.push(y.emissiveMapUv),S.push(y.metalnessMapUv),S.push(y.roughnessMapUv),S.push(y.anisotropyMapUv),S.push(y.clearcoatMapUv),S.push(y.clearcoatNormalMapUv),S.push(y.clearcoatRoughnessMapUv),S.push(y.iridescenceMapUv),S.push(y.iridescenceThicknessMapUv),S.push(y.sheenColorMapUv),S.push(y.sheenRoughnessMapUv),S.push(y.specularMapUv),S.push(y.specularColorMapUv),S.push(y.specularIntensityMapUv),S.push(y.transmissionMapUv),S.push(y.thicknessMapUv),S.push(y.combine),S.push(y.fogExp2),S.push(y.sizeAttenuation),S.push(y.morphTargetsCount),S.push(y.morphAttributeCount),S.push(y.numDirLights),S.push(y.numPointLights),S.push(y.numSpotLights),S.push(y.numSpotLightMaps),S.push(y.numHemiLights),S.push(y.numRectAreaLights),S.push(y.numDirLightShadows),S.push(y.numPointLightShadows),S.push(y.numSpotLightShadows),S.push(y.numSpotLightShadowsWithMaps),S.push(y.numLightProbes),S.push(y.shadowMapType),S.push(y.toneMapping),S.push(y.numClippingPlanes),S.push(y.numClipIntersection),S.push(y.depthPacking)}function v(S,y){a.disableAll(),y.supportsVertexTextures&&a.enable(0),y.instancing&&a.enable(1),y.instancingColor&&a.enable(2),y.instancingMorph&&a.enable(3),y.matcap&&a.enable(4),y.envMap&&a.enable(5),y.normalMapObjectSpace&&a.enable(6),y.normalMapTangentSpace&&a.enable(7),y.clearcoat&&a.enable(8),y.iridescence&&a.enable(9),y.alphaTest&&a.enable(10),y.vertexColors&&a.enable(11),y.vertexAlphas&&a.enable(12),y.vertexUv1s&&a.enable(13),y.vertexUv2s&&a.enable(14),y.vertexUv3s&&a.enable(15),y.vertexTangents&&a.enable(16),y.anisotropy&&a.enable(17),y.alphaHash&&a.enable(18),y.batching&&a.enable(19),y.dispersion&&a.enable(20),y.batchingColor&&a.enable(21),S.push(a.mask),a.disableAll(),y.fog&&a.enable(0),y.useFog&&a.enable(1),y.flatShading&&a.enable(2),y.logarithmicDepthBuffer&&a.enable(3),y.reverseDepthBuffer&&a.enable(4),y.skinning&&a.enable(5),y.morphTargets&&a.enable(6),y.morphNormals&&a.enable(7),y.morphColors&&a.enable(8),y.premultipliedAlpha&&a.enable(9),y.shadowMapEnabled&&a.enable(10),y.doubleSided&&a.enable(11),y.flipSided&&a.enable(12),y.useDepthPacking&&a.enable(13),y.dithering&&a.enable(14),y.transmission&&a.enable(15),y.sheen&&a.enable(16),y.opaque&&a.enable(17),y.pointsUvs&&a.enable(18),y.decodeVideoTexture&&a.enable(19),y.decodeVideoTextureEmissive&&a.enable(20),y.alphaToCoverage&&a.enable(21),S.push(a.mask)}function _(S){const y=g[S.type];let L;if(y){const k=dn[y];L=Ou.clone(k.uniforms)}else L=S.uniforms;return L}function P(S,y){let L;for(let k=0,O=h.length;k<O;k++){const W=h[k];if(W.cacheKey===y){L=W,++L.usedTimes;break}}return L===void 0&&(L=new kg(i,y,S,r),h.push(L)),L}function A(S){if(--S.usedTimes===0){const y=h.indexOf(S);h[y]=h[h.length-1],h.pop(),S.destroy()}}function E(S){l.remove(S)}function C(){l.dispose()}return{getParameters:m,getProgramCacheKey:f,getUniforms:_,acquireProgram:P,releaseProgram:A,releaseShaderCache:E,programs:h,dispose:C}}function Wg(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,l){i.get(o)[a]=l}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function Xg(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function $l(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function jl(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(u,d,p,g,x,m){let f=i[t];return f===void 0?(f={id:u.id,object:u,geometry:d,material:p,groupOrder:g,renderOrder:u.renderOrder,z:x,group:m},i[t]=f):(f.id=u.id,f.object=u,f.geometry=d,f.material=p,f.groupOrder=g,f.renderOrder=u.renderOrder,f.z=x,f.group=m),t++,f}function a(u,d,p,g,x,m){const f=o(u,d,p,g,x,m);p.transmission>0?n.push(f):p.transparent===!0?s.push(f):e.push(f)}function l(u,d,p,g,x,m){const f=o(u,d,p,g,x,m);p.transmission>0?n.unshift(f):p.transparent===!0?s.unshift(f):e.unshift(f)}function c(u,d){e.length>1&&e.sort(u||Xg),n.length>1&&n.sort(d||$l),s.length>1&&s.sort(d||$l)}function h(){for(let u=t,d=i.length;u<d;u++){const p=i[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:a,unshift:l,finish:h,sort:c}}function Yg(){let i=new WeakMap;function t(n,s){const r=i.get(n);let o;return r===void 0?(o=new jl,i.set(n,[o])):s>=r.length?(o=new jl,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function qg(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new D,color:new Xt};break;case"SpotLight":e={position:new D,direction:new D,color:new Xt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new D,color:new Xt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new D,skyColor:new Xt,groundColor:new Xt};break;case"RectAreaLight":e={color:new Xt,position:new D,halfWidth:new D,halfHeight:new D};break}return i[t.id]=e,e}}}function $g(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new at};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new at};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new at,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let jg=0;function Zg(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function Jg(i){const t=new qg,e=$g(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new D);const s=new D,r=new ue,o=new ue;function a(c){let h=0,u=0,d=0;for(let S=0;S<9;S++)n.probe[S].set(0,0,0);let p=0,g=0,x=0,m=0,f=0,b=0,v=0,_=0,P=0,A=0,E=0;c.sort(Zg);for(let S=0,y=c.length;S<y;S++){const L=c[S],k=L.color,O=L.intensity,W=L.distance,Y=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)h+=k.r*O,u+=k.g*O,d+=k.b*O;else if(L.isLightProbe){for(let X=0;X<9;X++)n.probe[X].addScaledVector(L.sh.coefficients[X],O);E++}else if(L.isDirectionalLight){const X=t.get(L);if(X.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const K=L.shadow,H=e.get(L);H.shadowIntensity=K.intensity,H.shadowBias=K.bias,H.shadowNormalBias=K.normalBias,H.shadowRadius=K.radius,H.shadowMapSize=K.mapSize,n.directionalShadow[p]=H,n.directionalShadowMap[p]=Y,n.directionalShadowMatrix[p]=L.shadow.matrix,b++}n.directional[p]=X,p++}else if(L.isSpotLight){const X=t.get(L);X.position.setFromMatrixPosition(L.matrixWorld),X.color.copy(k).multiplyScalar(O),X.distance=W,X.coneCos=Math.cos(L.angle),X.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),X.decay=L.decay,n.spot[x]=X;const K=L.shadow;if(L.map&&(n.spotLightMap[P]=L.map,P++,K.updateMatrices(L),L.castShadow&&A++),n.spotLightMatrix[x]=K.matrix,L.castShadow){const H=e.get(L);H.shadowIntensity=K.intensity,H.shadowBias=K.bias,H.shadowNormalBias=K.normalBias,H.shadowRadius=K.radius,H.shadowMapSize=K.mapSize,n.spotShadow[x]=H,n.spotShadowMap[x]=Y,_++}x++}else if(L.isRectAreaLight){const X=t.get(L);X.color.copy(k).multiplyScalar(O),X.halfWidth.set(L.width*.5,0,0),X.halfHeight.set(0,L.height*.5,0),n.rectArea[m]=X,m++}else if(L.isPointLight){const X=t.get(L);if(X.color.copy(L.color).multiplyScalar(L.intensity),X.distance=L.distance,X.decay=L.decay,L.castShadow){const K=L.shadow,H=e.get(L);H.shadowIntensity=K.intensity,H.shadowBias=K.bias,H.shadowNormalBias=K.normalBias,H.shadowRadius=K.radius,H.shadowMapSize=K.mapSize,H.shadowCameraNear=K.camera.near,H.shadowCameraFar=K.camera.far,n.pointShadow[g]=H,n.pointShadowMap[g]=Y,n.pointShadowMatrix[g]=L.shadow.matrix,v++}n.point[g]=X,g++}else if(L.isHemisphereLight){const X=t.get(L);X.skyColor.copy(L.color).multiplyScalar(O),X.groundColor.copy(L.groundColor).multiplyScalar(O),n.hemi[f]=X,f++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ct.LTC_FLOAT_1,n.rectAreaLTC2=ct.LTC_FLOAT_2):(n.rectAreaLTC1=ct.LTC_HALF_1,n.rectAreaLTC2=ct.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;const C=n.hash;(C.directionalLength!==p||C.pointLength!==g||C.spotLength!==x||C.rectAreaLength!==m||C.hemiLength!==f||C.numDirectionalShadows!==b||C.numPointShadows!==v||C.numSpotShadows!==_||C.numSpotMaps!==P||C.numLightProbes!==E)&&(n.directional.length=p,n.spot.length=x,n.rectArea.length=m,n.point.length=g,n.hemi.length=f,n.directionalShadow.length=b,n.directionalShadowMap.length=b,n.pointShadow.length=v,n.pointShadowMap.length=v,n.spotShadow.length=_,n.spotShadowMap.length=_,n.directionalShadowMatrix.length=b,n.pointShadowMatrix.length=v,n.spotLightMatrix.length=_+P-A,n.spotLightMap.length=P,n.numSpotLightShadowsWithMaps=A,n.numLightProbes=E,C.directionalLength=p,C.pointLength=g,C.spotLength=x,C.rectAreaLength=m,C.hemiLength=f,C.numDirectionalShadows=b,C.numPointShadows=v,C.numSpotShadows=_,C.numSpotMaps=P,C.numLightProbes=E,n.version=jg++)}function l(c,h){let u=0,d=0,p=0,g=0,x=0;const m=h.matrixWorldInverse;for(let f=0,b=c.length;f<b;f++){const v=c[f];if(v.isDirectionalLight){const _=n.directional[u];_.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(m),u++}else if(v.isSpotLight){const _=n.spot[p];_.position.setFromMatrixPosition(v.matrixWorld),_.position.applyMatrix4(m),_.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(m),p++}else if(v.isRectAreaLight){const _=n.rectArea[g];_.position.setFromMatrixPosition(v.matrixWorld),_.position.applyMatrix4(m),o.identity(),r.copy(v.matrixWorld),r.premultiply(m),o.extractRotation(r),_.halfWidth.set(v.width*.5,0,0),_.halfHeight.set(0,v.height*.5,0),_.halfWidth.applyMatrix4(o),_.halfHeight.applyMatrix4(o),g++}else if(v.isPointLight){const _=n.point[d];_.position.setFromMatrixPosition(v.matrixWorld),_.position.applyMatrix4(m),d++}else if(v.isHemisphereLight){const _=n.hemi[x];_.direction.setFromMatrixPosition(v.matrixWorld),_.direction.transformDirection(m),x++}}}return{setup:a,setupView:l,state:n}}function Zl(i){const t=new Jg(i),e=[],n=[];function s(h){c.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function o(h){n.push(h)}function a(){t.setup(e)}function l(h){t.setupView(e,h)}const c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function Kg(i){let t=new WeakMap;function e(s,r=0){const o=t.get(s);let a;return o===void 0?(a=new Zl(i),t.set(s,[a])):r>=o.length?(a=new Zl(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}const Qg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,t0=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function e0(i,t,e){let n=new Ma;const s=new at,r=new at,o=new xe,a=new wd({depthPacking:Wh}),l=new Ed,c={},h=e.maxTextureSize,u={[Hn]:Ge,[Ge]:Hn,[Qe]:Qe},d=new Vn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new at},radius:{value:4}},vertexShader:Qg,fragmentShader:t0}),p=d.clone();p.defines.HORIZONTAL_PASS=1;const g=new pe;g.setAttribute("position",new He(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new he(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=lc;let f=this.type;this.render=function(A,E,C){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||A.length===0)return;const S=i.getRenderTarget(),y=i.getActiveCubeFace(),L=i.getActiveMipmapLevel(),k=i.state;k.setBlending(kn),k.buffers.color.setClear(1,1,1,1),k.buffers.depth.setTest(!0),k.setScissorTest(!1);const O=f!==Mn&&this.type===Mn,W=f===Mn&&this.type!==Mn;for(let Y=0,X=A.length;Y<X;Y++){const K=A[Y],H=K.shadow;if(H===void 0){console.warn("THREE.WebGLShadowMap:",K,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;s.copy(H.mapSize);const lt=H.getFrameExtents();if(s.multiply(lt),r.copy(H.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/lt.x),s.x=r.x*lt.x,H.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/lt.y),s.y=r.y*lt.y,H.mapSize.y=r.y)),H.map===null||O===!0||W===!0){const Mt=this.type!==Mn?{minFilter:Be,magFilter:Be}:{};H.map!==null&&H.map.dispose(),H.map=new hi(s.x,s.y,Mt),H.map.texture.name=K.name+".shadowMap",H.camera.updateProjectionMatrix()}i.setRenderTarget(H.map),i.clear();const gt=H.getViewportCount();for(let Mt=0;Mt<gt;Mt++){const kt=H.getViewport(Mt);o.set(r.x*kt.x,r.y*kt.y,r.x*kt.z,r.y*kt.w),k.viewport(o),H.updateMatrices(K,Mt),n=H.getFrustum(),_(E,C,H.camera,K,this.type)}H.isPointLightShadow!==!0&&this.type===Mn&&b(H,C),H.needsUpdate=!1}f=this.type,m.needsUpdate=!1,i.setRenderTarget(S,y,L)};function b(A,E){const C=t.update(x);d.defines.VSM_SAMPLES!==A.blurSamples&&(d.defines.VSM_SAMPLES=A.blurSamples,p.defines.VSM_SAMPLES=A.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new hi(s.x,s.y)),d.uniforms.shadow_pass.value=A.map.texture,d.uniforms.resolution.value=A.mapSize,d.uniforms.radius.value=A.radius,i.setRenderTarget(A.mapPass),i.clear(),i.renderBufferDirect(E,null,C,d,x,null),p.uniforms.shadow_pass.value=A.mapPass.texture,p.uniforms.resolution.value=A.mapSize,p.uniforms.radius.value=A.radius,i.setRenderTarget(A.map),i.clear(),i.renderBufferDirect(E,null,C,p,x,null)}function v(A,E,C,S){let y=null;const L=C.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(L!==void 0)y=L;else if(y=C.isPointLight===!0?l:a,i.localClippingEnabled&&E.clipShadows===!0&&Array.isArray(E.clippingPlanes)&&E.clippingPlanes.length!==0||E.displacementMap&&E.displacementScale!==0||E.alphaMap&&E.alphaTest>0||E.map&&E.alphaTest>0){const k=y.uuid,O=E.uuid;let W=c[k];W===void 0&&(W={},c[k]=W);let Y=W[O];Y===void 0&&(Y=y.clone(),W[O]=Y,E.addEventListener("dispose",P)),y=Y}if(y.visible=E.visible,y.wireframe=E.wireframe,S===Mn?y.side=E.shadowSide!==null?E.shadowSide:E.side:y.side=E.shadowSide!==null?E.shadowSide:u[E.side],y.alphaMap=E.alphaMap,y.alphaTest=E.alphaTest,y.map=E.map,y.clipShadows=E.clipShadows,y.clippingPlanes=E.clippingPlanes,y.clipIntersection=E.clipIntersection,y.displacementMap=E.displacementMap,y.displacementScale=E.displacementScale,y.displacementBias=E.displacementBias,y.wireframeLinewidth=E.wireframeLinewidth,y.linewidth=E.linewidth,C.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const k=i.properties.get(y);k.light=C}return y}function _(A,E,C,S,y){if(A.visible===!1)return;if(A.layers.test(E.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&y===Mn)&&(!A.frustumCulled||n.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(C.matrixWorldInverse,A.matrixWorld);const O=t.update(A),W=A.material;if(Array.isArray(W)){const Y=O.groups;for(let X=0,K=Y.length;X<K;X++){const H=Y[X],lt=W[H.materialIndex];if(lt&&lt.visible){const gt=v(A,lt,S,y);A.onBeforeShadow(i,A,E,C,O,gt,H),i.renderBufferDirect(C,null,O,gt,A,H),A.onAfterShadow(i,A,E,C,O,gt,H)}}}else if(W.visible){const Y=v(A,W,S,y);A.onBeforeShadow(i,A,E,C,O,Y,null),i.renderBufferDirect(C,null,O,Y,A,null),A.onAfterShadow(i,A,E,C,O,Y,null)}}const k=A.children;for(let O=0,W=k.length;O<W;O++)_(k[O],E,C,S,y)}function P(A){A.target.removeEventListener("dispose",P);for(const C in c){const S=c[C],y=A.target.uuid;y in S&&(S[y].dispose(),delete S[y])}}}const n0={[So]:wo,[Eo]:Ro,[To]:Co,[zi]:Ao,[wo]:So,[Ro]:Eo,[Co]:To,[Ao]:zi};function i0(i,t){function e(){let U=!1;const ut=new xe;let V=null;const Z=new xe(0,0,0,0);return{setMask:function(mt){V!==mt&&!U&&(i.colorMask(mt,mt,mt,mt),V=mt)},setLocked:function(mt){U=mt},setClear:function(mt,ft,zt,me,Pe){Pe===!0&&(mt*=me,ft*=me,zt*=me),ut.set(mt,ft,zt,me),Z.equals(ut)===!1&&(i.clearColor(mt,ft,zt,me),Z.copy(ut))},reset:function(){U=!1,V=null,Z.set(-1,0,0,0)}}}function n(){let U=!1,ut=!1,V=null,Z=null,mt=null;return{setReversed:function(ft){if(ut!==ft){const zt=t.get("EXT_clip_control");ut?zt.clipControlEXT(zt.LOWER_LEFT_EXT,zt.ZERO_TO_ONE_EXT):zt.clipControlEXT(zt.LOWER_LEFT_EXT,zt.NEGATIVE_ONE_TO_ONE_EXT);const me=mt;mt=null,this.setClear(me)}ut=ft},getReversed:function(){return ut},setTest:function(ft){ft?ot(i.DEPTH_TEST):At(i.DEPTH_TEST)},setMask:function(ft){V!==ft&&!U&&(i.depthMask(ft),V=ft)},setFunc:function(ft){if(ut&&(ft=n0[ft]),Z!==ft){switch(ft){case So:i.depthFunc(i.NEVER);break;case wo:i.depthFunc(i.ALWAYS);break;case Eo:i.depthFunc(i.LESS);break;case zi:i.depthFunc(i.LEQUAL);break;case To:i.depthFunc(i.EQUAL);break;case Ao:i.depthFunc(i.GEQUAL);break;case Ro:i.depthFunc(i.GREATER);break;case Co:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Z=ft}},setLocked:function(ft){U=ft},setClear:function(ft){mt!==ft&&(ut&&(ft=1-ft),i.clearDepth(ft),mt=ft)},reset:function(){U=!1,V=null,Z=null,mt=null,ut=!1}}}function s(){let U=!1,ut=null,V=null,Z=null,mt=null,ft=null,zt=null,me=null,Pe=null;return{setTest:function(re){U||(re?ot(i.STENCIL_TEST):At(i.STENCIL_TEST))},setMask:function(re){ut!==re&&!U&&(i.stencilMask(re),ut=re)},setFunc:function(re,en,mn){(V!==re||Z!==en||mt!==mn)&&(i.stencilFunc(re,en,mn),V=re,Z=en,mt=mn)},setOp:function(re,en,mn){(ft!==re||zt!==en||me!==mn)&&(i.stencilOp(re,en,mn),ft=re,zt=en,me=mn)},setLocked:function(re){U=re},setClear:function(re){Pe!==re&&(i.clearStencil(re),Pe=re)},reset:function(){U=!1,ut=null,V=null,Z=null,mt=null,ft=null,zt=null,me=null,Pe=null}}}const r=new e,o=new n,a=new s,l=new WeakMap,c=new WeakMap;let h={},u={},d=new WeakMap,p=[],g=null,x=!1,m=null,f=null,b=null,v=null,_=null,P=null,A=null,E=new Xt(0,0,0),C=0,S=!1,y=null,L=null,k=null,O=null,W=null;const Y=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let X=!1,K=0;const H=i.getParameter(i.VERSION);H.indexOf("WebGL")!==-1?(K=parseFloat(/^WebGL (\d)/.exec(H)[1]),X=K>=1):H.indexOf("OpenGL ES")!==-1&&(K=parseFloat(/^OpenGL ES (\d)/.exec(H)[1]),X=K>=2);let lt=null,gt={};const Mt=i.getParameter(i.SCISSOR_BOX),kt=i.getParameter(i.VIEWPORT),ne=new xe().fromArray(Mt),j=new xe().fromArray(kt);function st(U,ut,V,Z){const mt=new Uint8Array(4),ft=i.createTexture();i.bindTexture(U,ft),i.texParameteri(U,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(U,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let zt=0;zt<V;zt++)U===i.TEXTURE_3D||U===i.TEXTURE_2D_ARRAY?i.texImage3D(ut,0,i.RGBA,1,1,Z,0,i.RGBA,i.UNSIGNED_BYTE,mt):i.texImage2D(ut+zt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,mt);return ft}const wt={};wt[i.TEXTURE_2D]=st(i.TEXTURE_2D,i.TEXTURE_2D,1),wt[i.TEXTURE_CUBE_MAP]=st(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),wt[i.TEXTURE_2D_ARRAY]=st(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),wt[i.TEXTURE_3D]=st(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ot(i.DEPTH_TEST),o.setFunc(zi),tt(!1),vt(Va),ot(i.CULL_FACE),R(kn);function ot(U){h[U]!==!0&&(i.enable(U),h[U]=!0)}function At(U){h[U]!==!1&&(i.disable(U),h[U]=!1)}function Ft(U,ut){return u[U]!==ut?(i.bindFramebuffer(U,ut),u[U]=ut,U===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=ut),U===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=ut),!0):!1}function It(U,ut){let V=p,Z=!1;if(U){V=d.get(ut),V===void 0&&(V=[],d.set(ut,V));const mt=U.textures;if(V.length!==mt.length||V[0]!==i.COLOR_ATTACHMENT0){for(let ft=0,zt=mt.length;ft<zt;ft++)V[ft]=i.COLOR_ATTACHMENT0+ft;V.length=mt.length,Z=!0}}else V[0]!==i.BACK&&(V[0]=i.BACK,Z=!0);Z&&i.drawBuffers(V)}function Zt(U){return g!==U?(i.useProgram(U),g=U,!0):!1}const J={[ri]:i.FUNC_ADD,[_h]:i.FUNC_SUBTRACT,[vh]:i.FUNC_REVERSE_SUBTRACT};J[xh]=i.MIN,J[yh]=i.MAX;const it={[bh]:i.ZERO,[Mh]:i.ONE,[Sh]:i.SRC_COLOR,[bo]:i.SRC_ALPHA,[Ch]:i.SRC_ALPHA_SATURATE,[Ah]:i.DST_COLOR,[Eh]:i.DST_ALPHA,[wh]:i.ONE_MINUS_SRC_COLOR,[Mo]:i.ONE_MINUS_SRC_ALPHA,[Rh]:i.ONE_MINUS_DST_COLOR,[Th]:i.ONE_MINUS_DST_ALPHA,[Ph]:i.CONSTANT_COLOR,[Lh]:i.ONE_MINUS_CONSTANT_COLOR,[Dh]:i.CONSTANT_ALPHA,[Ih]:i.ONE_MINUS_CONSTANT_ALPHA};function R(U,ut,V,Z,mt,ft,zt,me,Pe,re){if(U===kn){x===!0&&(At(i.BLEND),x=!1);return}if(x===!1&&(ot(i.BLEND),x=!0),U!==gh){if(U!==m||re!==S){if((f!==ri||_!==ri)&&(i.blendEquation(i.FUNC_ADD),f=ri,_=ri),re)switch(U){case Oi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case ds:i.blendFunc(i.ONE,i.ONE);break;case Wa:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Xa:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case Oi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case ds:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Wa:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Xa:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}b=null,v=null,P=null,A=null,E.set(0,0,0),C=0,m=U,S=re}return}mt=mt||ut,ft=ft||V,zt=zt||Z,(ut!==f||mt!==_)&&(i.blendEquationSeparate(J[ut],J[mt]),f=ut,_=mt),(V!==b||Z!==v||ft!==P||zt!==A)&&(i.blendFuncSeparate(it[V],it[Z],it[ft],it[zt]),b=V,v=Z,P=ft,A=zt),(me.equals(E)===!1||Pe!==C)&&(i.blendColor(me.r,me.g,me.b,Pe),E.copy(me),C=Pe),m=U,S=!1}function Tt(U,ut){U.side===Qe?At(i.CULL_FACE):ot(i.CULL_FACE);let V=U.side===Ge;ut&&(V=!V),tt(V),U.blending===Oi&&U.transparent===!1?R(kn):R(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),o.setFunc(U.depthFunc),o.setTest(U.depthTest),o.setMask(U.depthWrite),r.setMask(U.colorWrite);const Z=U.stencilWrite;a.setTest(Z),Z&&(a.setMask(U.stencilWriteMask),a.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),a.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),Dt(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?ot(i.SAMPLE_ALPHA_TO_COVERAGE):At(i.SAMPLE_ALPHA_TO_COVERAGE)}function tt(U){y!==U&&(U?i.frontFace(i.CW):i.frontFace(i.CCW),y=U)}function vt(U){U!==ph?(ot(i.CULL_FACE),U!==L&&(U===Va?i.cullFace(i.BACK):U===mh?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):At(i.CULL_FACE),L=U}function rt(U){U!==k&&(X&&i.lineWidth(U),k=U)}function Dt(U,ut,V){U?(ot(i.POLYGON_OFFSET_FILL),(O!==ut||W!==V)&&(i.polygonOffset(ut,V),O=ut,W=V)):At(i.POLYGON_OFFSET_FILL)}function pt(U){U?ot(i.SCISSOR_TEST):At(i.SCISSOR_TEST)}function T(U){U===void 0&&(U=i.TEXTURE0+Y-1),lt!==U&&(i.activeTexture(U),lt=U)}function M(U,ut,V){V===void 0&&(lt===null?V=i.TEXTURE0+Y-1:V=lt);let Z=gt[V];Z===void 0&&(Z={type:void 0,texture:void 0},gt[V]=Z),(Z.type!==U||Z.texture!==ut)&&(lt!==V&&(i.activeTexture(V),lt=V),i.bindTexture(U,ut||wt[U]),Z.type=U,Z.texture=ut)}function B(){const U=gt[lt];U!==void 0&&U.type!==void 0&&(i.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function q(){try{i.compressedTexImage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Q(){try{i.compressedTexImage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function $(){try{i.texSubImage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Et(){try{i.texSubImage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ht(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function _t(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Yt(){try{i.texStorage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function nt(){try{i.texStorage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function yt(){try{i.texImage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Lt(){try{i.texImage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ut(U){ne.equals(U)===!1&&(i.scissor(U.x,U.y,U.z,U.w),ne.copy(U))}function bt(U){j.equals(U)===!1&&(i.viewport(U.x,U.y,U.z,U.w),j.copy(U))}function $t(U,ut){let V=c.get(ut);V===void 0&&(V=new WeakMap,c.set(ut,V));let Z=V.get(U);Z===void 0&&(Z=i.getUniformBlockIndex(ut,U.name),V.set(U,Z))}function Ht(U,ut){const Z=c.get(ut).get(U);l.get(ut)!==Z&&(i.uniformBlockBinding(ut,Z,U.__bindingPointIndex),l.set(ut,Z))}function ce(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},lt=null,gt={},u={},d=new WeakMap,p=[],g=null,x=!1,m=null,f=null,b=null,v=null,_=null,P=null,A=null,E=new Xt(0,0,0),C=0,S=!1,y=null,L=null,k=null,O=null,W=null,ne.set(0,0,i.canvas.width,i.canvas.height),j.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:ot,disable:At,bindFramebuffer:Ft,drawBuffers:It,useProgram:Zt,setBlending:R,setMaterial:Tt,setFlipSided:tt,setCullFace:vt,setLineWidth:rt,setPolygonOffset:Dt,setScissorTest:pt,activeTexture:T,bindTexture:M,unbindTexture:B,compressedTexImage2D:q,compressedTexImage3D:Q,texImage2D:yt,texImage3D:Lt,updateUBOMapping:$t,uniformBlockBinding:Ht,texStorage2D:Yt,texStorage3D:nt,texSubImage2D:$,texSubImage3D:Et,compressedTexSubImage2D:ht,compressedTexSubImage3D:_t,scissor:Ut,viewport:bt,reset:ce}}function s0(i,t,e,n,s,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new at,h=new WeakMap;let u;const d=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(T,M){return p?new OffscreenCanvas(T,M):vr("canvas")}function x(T,M,B){let q=1;const Q=pt(T);if((Q.width>B||Q.height>B)&&(q=B/Math.max(Q.width,Q.height)),q<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){const $=Math.floor(q*Q.width),Et=Math.floor(q*Q.height);u===void 0&&(u=g($,Et));const ht=M?g($,Et):u;return ht.width=$,ht.height=Et,ht.getContext("2d").drawImage(T,0,0,$,Et),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+$+"x"+Et+")."),ht}else return"data"in T&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),T;return T}function m(T){return T.generateMipmaps}function f(T){i.generateMipmap(T)}function b(T){return T.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?i.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function v(T,M,B,q,Q=!1){if(T!==null){if(i[T]!==void 0)return i[T];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let $=M;if(M===i.RED&&(B===i.FLOAT&&($=i.R32F),B===i.HALF_FLOAT&&($=i.R16F),B===i.UNSIGNED_BYTE&&($=i.R8)),M===i.RED_INTEGER&&(B===i.UNSIGNED_BYTE&&($=i.R8UI),B===i.UNSIGNED_SHORT&&($=i.R16UI),B===i.UNSIGNED_INT&&($=i.R32UI),B===i.BYTE&&($=i.R8I),B===i.SHORT&&($=i.R16I),B===i.INT&&($=i.R32I)),M===i.RG&&(B===i.FLOAT&&($=i.RG32F),B===i.HALF_FLOAT&&($=i.RG16F),B===i.UNSIGNED_BYTE&&($=i.RG8)),M===i.RG_INTEGER&&(B===i.UNSIGNED_BYTE&&($=i.RG8UI),B===i.UNSIGNED_SHORT&&($=i.RG16UI),B===i.UNSIGNED_INT&&($=i.RG32UI),B===i.BYTE&&($=i.RG8I),B===i.SHORT&&($=i.RG16I),B===i.INT&&($=i.RG32I)),M===i.RGB_INTEGER&&(B===i.UNSIGNED_BYTE&&($=i.RGB8UI),B===i.UNSIGNED_SHORT&&($=i.RGB16UI),B===i.UNSIGNED_INT&&($=i.RGB32UI),B===i.BYTE&&($=i.RGB8I),B===i.SHORT&&($=i.RGB16I),B===i.INT&&($=i.RGB32I)),M===i.RGBA_INTEGER&&(B===i.UNSIGNED_BYTE&&($=i.RGBA8UI),B===i.UNSIGNED_SHORT&&($=i.RGBA16UI),B===i.UNSIGNED_INT&&($=i.RGBA32UI),B===i.BYTE&&($=i.RGBA8I),B===i.SHORT&&($=i.RGBA16I),B===i.INT&&($=i.RGBA32I)),M===i.RGB&&B===i.UNSIGNED_INT_5_9_9_9_REV&&($=i.RGB9_E5),M===i.RGBA){const Et=Q?gr:Qt.getTransfer(q);B===i.FLOAT&&($=i.RGBA32F),B===i.HALF_FLOAT&&($=i.RGBA16F),B===i.UNSIGNED_BYTE&&($=Et===le?i.SRGB8_ALPHA8:i.RGBA8),B===i.UNSIGNED_SHORT_4_4_4_4&&($=i.RGBA4),B===i.UNSIGNED_SHORT_5_5_5_1&&($=i.RGB5_A1)}return($===i.R16F||$===i.R32F||$===i.RG16F||$===i.RG32F||$===i.RGBA16F||$===i.RGBA32F)&&t.get("EXT_color_buffer_float"),$}function _(T,M){let B;return T?M===null||M===ci||M===Vi?B=i.DEPTH24_STENCIL8:M===wn?B=i.DEPTH32F_STENCIL8:M===fs&&(B=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===ci||M===Vi?B=i.DEPTH_COMPONENT24:M===wn?B=i.DEPTH_COMPONENT32F:M===fs&&(B=i.DEPTH_COMPONENT16),B}function P(T,M){return m(T)===!0||T.isFramebufferTexture&&T.minFilter!==Be&&T.minFilter!==fn?Math.log2(Math.max(M.width,M.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?M.mipmaps.length:1}function A(T){const M=T.target;M.removeEventListener("dispose",A),C(M),M.isVideoTexture&&h.delete(M)}function E(T){const M=T.target;M.removeEventListener("dispose",E),y(M)}function C(T){const M=n.get(T);if(M.__webglInit===void 0)return;const B=T.source,q=d.get(B);if(q){const Q=q[M.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&S(T),Object.keys(q).length===0&&d.delete(B)}n.remove(T)}function S(T){const M=n.get(T);i.deleteTexture(M.__webglTexture);const B=T.source,q=d.get(B);delete q[M.__cacheKey],o.memory.textures--}function y(T){const M=n.get(T);if(T.depthTexture&&(T.depthTexture.dispose(),n.remove(T.depthTexture)),T.isWebGLCubeRenderTarget)for(let q=0;q<6;q++){if(Array.isArray(M.__webglFramebuffer[q]))for(let Q=0;Q<M.__webglFramebuffer[q].length;Q++)i.deleteFramebuffer(M.__webglFramebuffer[q][Q]);else i.deleteFramebuffer(M.__webglFramebuffer[q]);M.__webglDepthbuffer&&i.deleteRenderbuffer(M.__webglDepthbuffer[q])}else{if(Array.isArray(M.__webglFramebuffer))for(let q=0;q<M.__webglFramebuffer.length;q++)i.deleteFramebuffer(M.__webglFramebuffer[q]);else i.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&i.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&i.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let q=0;q<M.__webglColorRenderbuffer.length;q++)M.__webglColorRenderbuffer[q]&&i.deleteRenderbuffer(M.__webglColorRenderbuffer[q]);M.__webglDepthRenderbuffer&&i.deleteRenderbuffer(M.__webglDepthRenderbuffer)}const B=T.textures;for(let q=0,Q=B.length;q<Q;q++){const $=n.get(B[q]);$.__webglTexture&&(i.deleteTexture($.__webglTexture),o.memory.textures--),n.remove(B[q])}n.remove(T)}let L=0;function k(){L=0}function O(){const T=L;return T>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+s.maxTextures),L+=1,T}function W(T){const M=[];return M.push(T.wrapS),M.push(T.wrapT),M.push(T.wrapR||0),M.push(T.magFilter),M.push(T.minFilter),M.push(T.anisotropy),M.push(T.internalFormat),M.push(T.format),M.push(T.type),M.push(T.generateMipmaps),M.push(T.premultiplyAlpha),M.push(T.flipY),M.push(T.unpackAlignment),M.push(T.colorSpace),M.join()}function Y(T,M){const B=n.get(T);if(T.isVideoTexture&&rt(T),T.isRenderTargetTexture===!1&&T.version>0&&B.__version!==T.version){const q=T.image;if(q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{j(B,T,M);return}}e.bindTexture(i.TEXTURE_2D,B.__webglTexture,i.TEXTURE0+M)}function X(T,M){const B=n.get(T);if(T.version>0&&B.__version!==T.version){j(B,T,M);return}e.bindTexture(i.TEXTURE_2D_ARRAY,B.__webglTexture,i.TEXTURE0+M)}function K(T,M){const B=n.get(T);if(T.version>0&&B.__version!==T.version){j(B,T,M);return}e.bindTexture(i.TEXTURE_3D,B.__webglTexture,i.TEXTURE0+M)}function H(T,M){const B=n.get(T);if(T.version>0&&B.__version!==T.version){st(B,T,M);return}e.bindTexture(i.TEXTURE_CUBE_MAP,B.__webglTexture,i.TEXTURE0+M)}const lt={[mr]:i.REPEAT,[ai]:i.CLAMP_TO_EDGE,[Do]:i.MIRRORED_REPEAT},gt={[Be]:i.NEAREST,[Hh]:i.NEAREST_MIPMAP_NEAREST,[Cs]:i.NEAREST_MIPMAP_LINEAR,[fn]:i.LINEAR,[Fr]:i.LINEAR_MIPMAP_NEAREST,[li]:i.LINEAR_MIPMAP_LINEAR},Mt={[Yh]:i.NEVER,[Kh]:i.ALWAYS,[qh]:i.LESS,[Sc]:i.LEQUAL,[$h]:i.EQUAL,[Jh]:i.GEQUAL,[jh]:i.GREATER,[Zh]:i.NOTEQUAL};function kt(T,M){if(M.type===wn&&t.has("OES_texture_float_linear")===!1&&(M.magFilter===fn||M.magFilter===Fr||M.magFilter===Cs||M.magFilter===li||M.minFilter===fn||M.minFilter===Fr||M.minFilter===Cs||M.minFilter===li)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(T,i.TEXTURE_WRAP_S,lt[M.wrapS]),i.texParameteri(T,i.TEXTURE_WRAP_T,lt[M.wrapT]),(T===i.TEXTURE_3D||T===i.TEXTURE_2D_ARRAY)&&i.texParameteri(T,i.TEXTURE_WRAP_R,lt[M.wrapR]),i.texParameteri(T,i.TEXTURE_MAG_FILTER,gt[M.magFilter]),i.texParameteri(T,i.TEXTURE_MIN_FILTER,gt[M.minFilter]),M.compareFunction&&(i.texParameteri(T,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(T,i.TEXTURE_COMPARE_FUNC,Mt[M.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===Be||M.minFilter!==Cs&&M.minFilter!==li||M.type===wn&&t.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||n.get(M).__currentAnisotropy){const B=t.get("EXT_texture_filter_anisotropic");i.texParameterf(T,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,s.getMaxAnisotropy())),n.get(M).__currentAnisotropy=M.anisotropy}}}function ne(T,M){let B=!1;T.__webglInit===void 0&&(T.__webglInit=!0,M.addEventListener("dispose",A));const q=M.source;let Q=d.get(q);Q===void 0&&(Q={},d.set(q,Q));const $=W(M);if($!==T.__cacheKey){Q[$]===void 0&&(Q[$]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,B=!0),Q[$].usedTimes++;const Et=Q[T.__cacheKey];Et!==void 0&&(Q[T.__cacheKey].usedTimes--,Et.usedTimes===0&&S(M)),T.__cacheKey=$,T.__webglTexture=Q[$].texture}return B}function j(T,M,B){let q=i.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(q=i.TEXTURE_2D_ARRAY),M.isData3DTexture&&(q=i.TEXTURE_3D);const Q=ne(T,M),$=M.source;e.bindTexture(q,T.__webglTexture,i.TEXTURE0+B);const Et=n.get($);if($.version!==Et.__version||Q===!0){e.activeTexture(i.TEXTURE0+B);const ht=Qt.getPrimaries(Qt.workingColorSpace),_t=M.colorSpace===Bn?null:Qt.getPrimaries(M.colorSpace),Yt=M.colorSpace===Bn||ht===_t?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,M.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,M.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Yt);let nt=x(M.image,!1,s.maxTextureSize);nt=Dt(M,nt);const yt=r.convert(M.format,M.colorSpace),Lt=r.convert(M.type);let Ut=v(M.internalFormat,yt,Lt,M.colorSpace,M.isVideoTexture);kt(q,M);let bt;const $t=M.mipmaps,Ht=M.isVideoTexture!==!0,ce=Et.__version===void 0||Q===!0,U=$.dataReady,ut=P(M,nt);if(M.isDepthTexture)Ut=_(M.format===Wi,M.type),ce&&(Ht?e.texStorage2D(i.TEXTURE_2D,1,Ut,nt.width,nt.height):e.texImage2D(i.TEXTURE_2D,0,Ut,nt.width,nt.height,0,yt,Lt,null));else if(M.isDataTexture)if($t.length>0){Ht&&ce&&e.texStorage2D(i.TEXTURE_2D,ut,Ut,$t[0].width,$t[0].height);for(let V=0,Z=$t.length;V<Z;V++)bt=$t[V],Ht?U&&e.texSubImage2D(i.TEXTURE_2D,V,0,0,bt.width,bt.height,yt,Lt,bt.data):e.texImage2D(i.TEXTURE_2D,V,Ut,bt.width,bt.height,0,yt,Lt,bt.data);M.generateMipmaps=!1}else Ht?(ce&&e.texStorage2D(i.TEXTURE_2D,ut,Ut,nt.width,nt.height),U&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,nt.width,nt.height,yt,Lt,nt.data)):e.texImage2D(i.TEXTURE_2D,0,Ut,nt.width,nt.height,0,yt,Lt,nt.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){Ht&&ce&&e.texStorage3D(i.TEXTURE_2D_ARRAY,ut,Ut,$t[0].width,$t[0].height,nt.depth);for(let V=0,Z=$t.length;V<Z;V++)if(bt=$t[V],M.format!==cn)if(yt!==null)if(Ht){if(U)if(M.layerUpdates.size>0){const mt=Tl(bt.width,bt.height,M.format,M.type);for(const ft of M.layerUpdates){const zt=bt.data.subarray(ft*mt/bt.data.BYTES_PER_ELEMENT,(ft+1)*mt/bt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,V,0,0,ft,bt.width,bt.height,1,yt,zt)}M.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,V,0,0,0,bt.width,bt.height,nt.depth,yt,bt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,V,Ut,bt.width,bt.height,nt.depth,0,bt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ht?U&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,V,0,0,0,bt.width,bt.height,nt.depth,yt,Lt,bt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,V,Ut,bt.width,bt.height,nt.depth,0,yt,Lt,bt.data)}else{Ht&&ce&&e.texStorage2D(i.TEXTURE_2D,ut,Ut,$t[0].width,$t[0].height);for(let V=0,Z=$t.length;V<Z;V++)bt=$t[V],M.format!==cn?yt!==null?Ht?U&&e.compressedTexSubImage2D(i.TEXTURE_2D,V,0,0,bt.width,bt.height,yt,bt.data):e.compressedTexImage2D(i.TEXTURE_2D,V,Ut,bt.width,bt.height,0,bt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ht?U&&e.texSubImage2D(i.TEXTURE_2D,V,0,0,bt.width,bt.height,yt,Lt,bt.data):e.texImage2D(i.TEXTURE_2D,V,Ut,bt.width,bt.height,0,yt,Lt,bt.data)}else if(M.isDataArrayTexture)if(Ht){if(ce&&e.texStorage3D(i.TEXTURE_2D_ARRAY,ut,Ut,nt.width,nt.height,nt.depth),U)if(M.layerUpdates.size>0){const V=Tl(nt.width,nt.height,M.format,M.type);for(const Z of M.layerUpdates){const mt=nt.data.subarray(Z*V/nt.data.BYTES_PER_ELEMENT,(Z+1)*V/nt.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Z,nt.width,nt.height,1,yt,Lt,mt)}M.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,nt.width,nt.height,nt.depth,yt,Lt,nt.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Ut,nt.width,nt.height,nt.depth,0,yt,Lt,nt.data);else if(M.isData3DTexture)Ht?(ce&&e.texStorage3D(i.TEXTURE_3D,ut,Ut,nt.width,nt.height,nt.depth),U&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,nt.width,nt.height,nt.depth,yt,Lt,nt.data)):e.texImage3D(i.TEXTURE_3D,0,Ut,nt.width,nt.height,nt.depth,0,yt,Lt,nt.data);else if(M.isFramebufferTexture){if(ce)if(Ht)e.texStorage2D(i.TEXTURE_2D,ut,Ut,nt.width,nt.height);else{let V=nt.width,Z=nt.height;for(let mt=0;mt<ut;mt++)e.texImage2D(i.TEXTURE_2D,mt,Ut,V,Z,0,yt,Lt,null),V>>=1,Z>>=1}}else if($t.length>0){if(Ht&&ce){const V=pt($t[0]);e.texStorage2D(i.TEXTURE_2D,ut,Ut,V.width,V.height)}for(let V=0,Z=$t.length;V<Z;V++)bt=$t[V],Ht?U&&e.texSubImage2D(i.TEXTURE_2D,V,0,0,yt,Lt,bt):e.texImage2D(i.TEXTURE_2D,V,Ut,yt,Lt,bt);M.generateMipmaps=!1}else if(Ht){if(ce){const V=pt(nt);e.texStorage2D(i.TEXTURE_2D,ut,Ut,V.width,V.height)}U&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,yt,Lt,nt)}else e.texImage2D(i.TEXTURE_2D,0,Ut,yt,Lt,nt);m(M)&&f(q),Et.__version=$.version,M.onUpdate&&M.onUpdate(M)}T.__version=M.version}function st(T,M,B){if(M.image.length!==6)return;const q=ne(T,M),Q=M.source;e.bindTexture(i.TEXTURE_CUBE_MAP,T.__webglTexture,i.TEXTURE0+B);const $=n.get(Q);if(Q.version!==$.__version||q===!0){e.activeTexture(i.TEXTURE0+B);const Et=Qt.getPrimaries(Qt.workingColorSpace),ht=M.colorSpace===Bn?null:Qt.getPrimaries(M.colorSpace),_t=M.colorSpace===Bn||Et===ht?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,M.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,M.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,_t);const Yt=M.isCompressedTexture||M.image[0].isCompressedTexture,nt=M.image[0]&&M.image[0].isDataTexture,yt=[];for(let Z=0;Z<6;Z++)!Yt&&!nt?yt[Z]=x(M.image[Z],!0,s.maxCubemapSize):yt[Z]=nt?M.image[Z].image:M.image[Z],yt[Z]=Dt(M,yt[Z]);const Lt=yt[0],Ut=r.convert(M.format,M.colorSpace),bt=r.convert(M.type),$t=v(M.internalFormat,Ut,bt,M.colorSpace),Ht=M.isVideoTexture!==!0,ce=$.__version===void 0||q===!0,U=Q.dataReady;let ut=P(M,Lt);kt(i.TEXTURE_CUBE_MAP,M);let V;if(Yt){Ht&&ce&&e.texStorage2D(i.TEXTURE_CUBE_MAP,ut,$t,Lt.width,Lt.height);for(let Z=0;Z<6;Z++){V=yt[Z].mipmaps;for(let mt=0;mt<V.length;mt++){const ft=V[mt];M.format!==cn?Ut!==null?Ht?U&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,mt,0,0,ft.width,ft.height,Ut,ft.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,mt,$t,ft.width,ft.height,0,ft.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ht?U&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,mt,0,0,ft.width,ft.height,Ut,bt,ft.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,mt,$t,ft.width,ft.height,0,Ut,bt,ft.data)}}}else{if(V=M.mipmaps,Ht&&ce){V.length>0&&ut++;const Z=pt(yt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,ut,$t,Z.width,Z.height)}for(let Z=0;Z<6;Z++)if(nt){Ht?U&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,yt[Z].width,yt[Z].height,Ut,bt,yt[Z].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,$t,yt[Z].width,yt[Z].height,0,Ut,bt,yt[Z].data);for(let mt=0;mt<V.length;mt++){const zt=V[mt].image[Z].image;Ht?U&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,mt+1,0,0,zt.width,zt.height,Ut,bt,zt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,mt+1,$t,zt.width,zt.height,0,Ut,bt,zt.data)}}else{Ht?U&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,Ut,bt,yt[Z]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,$t,Ut,bt,yt[Z]);for(let mt=0;mt<V.length;mt++){const ft=V[mt];Ht?U&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,mt+1,0,0,Ut,bt,ft.image[Z]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,mt+1,$t,Ut,bt,ft.image[Z])}}}m(M)&&f(i.TEXTURE_CUBE_MAP),$.__version=Q.version,M.onUpdate&&M.onUpdate(M)}T.__version=M.version}function wt(T,M,B,q,Q,$){const Et=r.convert(B.format,B.colorSpace),ht=r.convert(B.type),_t=v(B.internalFormat,Et,ht,B.colorSpace),Yt=n.get(M),nt=n.get(B);if(nt.__renderTarget=M,!Yt.__hasExternalTextures){const yt=Math.max(1,M.width>>$),Lt=Math.max(1,M.height>>$);Q===i.TEXTURE_3D||Q===i.TEXTURE_2D_ARRAY?e.texImage3D(Q,$,_t,yt,Lt,M.depth,0,Et,ht,null):e.texImage2D(Q,$,_t,yt,Lt,0,Et,ht,null)}e.bindFramebuffer(i.FRAMEBUFFER,T),vt(M)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,q,Q,nt.__webglTexture,0,tt(M)):(Q===i.TEXTURE_2D||Q>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,q,Q,nt.__webglTexture,$),e.bindFramebuffer(i.FRAMEBUFFER,null)}function ot(T,M,B){if(i.bindRenderbuffer(i.RENDERBUFFER,T),M.depthBuffer){const q=M.depthTexture,Q=q&&q.isDepthTexture?q.type:null,$=_(M.stencilBuffer,Q),Et=M.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ht=tt(M);vt(M)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ht,$,M.width,M.height):B?i.renderbufferStorageMultisample(i.RENDERBUFFER,ht,$,M.width,M.height):i.renderbufferStorage(i.RENDERBUFFER,$,M.width,M.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Et,i.RENDERBUFFER,T)}else{const q=M.textures;for(let Q=0;Q<q.length;Q++){const $=q[Q],Et=r.convert($.format,$.colorSpace),ht=r.convert($.type),_t=v($.internalFormat,Et,ht,$.colorSpace),Yt=tt(M);B&&vt(M)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Yt,_t,M.width,M.height):vt(M)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Yt,_t,M.width,M.height):i.renderbufferStorage(i.RENDERBUFFER,_t,M.width,M.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function At(T,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,T),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const q=n.get(M.depthTexture);q.__renderTarget=M,(!q.__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),Y(M.depthTexture,0);const Q=q.__webglTexture,$=tt(M);if(M.depthTexture.format===Bi)vt(M)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Q,0,$):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Q,0);else if(M.depthTexture.format===Wi)vt(M)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Q,0,$):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Q,0);else throw new Error("Unknown depthTexture format")}function Ft(T){const M=n.get(T),B=T.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==T.depthTexture){const q=T.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),q){const Q=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,q.removeEventListener("dispose",Q)};q.addEventListener("dispose",Q),M.__depthDisposeCallback=Q}M.__boundDepthTexture=q}if(T.depthTexture&&!M.__autoAllocateDepthBuffer){if(B)throw new Error("target.depthTexture not supported in Cube render targets");At(M.__webglFramebuffer,T)}else if(B){M.__webglDepthbuffer=[];for(let q=0;q<6;q++)if(e.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer[q]),M.__webglDepthbuffer[q]===void 0)M.__webglDepthbuffer[q]=i.createRenderbuffer(),ot(M.__webglDepthbuffer[q],T,!1);else{const Q=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,$=M.__webglDepthbuffer[q];i.bindRenderbuffer(i.RENDERBUFFER,$),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,$)}}else if(e.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=i.createRenderbuffer(),ot(M.__webglDepthbuffer,T,!1);else{const q=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Q=M.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,Q),i.framebufferRenderbuffer(i.FRAMEBUFFER,q,i.RENDERBUFFER,Q)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function It(T,M,B){const q=n.get(T);M!==void 0&&wt(q.__webglFramebuffer,T,T.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),B!==void 0&&Ft(T)}function Zt(T){const M=T.texture,B=n.get(T),q=n.get(M);T.addEventListener("dispose",E);const Q=T.textures,$=T.isWebGLCubeRenderTarget===!0,Et=Q.length>1;if(Et||(q.__webglTexture===void 0&&(q.__webglTexture=i.createTexture()),q.__version=M.version,o.memory.textures++),$){B.__webglFramebuffer=[];for(let ht=0;ht<6;ht++)if(M.mipmaps&&M.mipmaps.length>0){B.__webglFramebuffer[ht]=[];for(let _t=0;_t<M.mipmaps.length;_t++)B.__webglFramebuffer[ht][_t]=i.createFramebuffer()}else B.__webglFramebuffer[ht]=i.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){B.__webglFramebuffer=[];for(let ht=0;ht<M.mipmaps.length;ht++)B.__webglFramebuffer[ht]=i.createFramebuffer()}else B.__webglFramebuffer=i.createFramebuffer();if(Et)for(let ht=0,_t=Q.length;ht<_t;ht++){const Yt=n.get(Q[ht]);Yt.__webglTexture===void 0&&(Yt.__webglTexture=i.createTexture(),o.memory.textures++)}if(T.samples>0&&vt(T)===!1){B.__webglMultisampledFramebuffer=i.createFramebuffer(),B.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let ht=0;ht<Q.length;ht++){const _t=Q[ht];B.__webglColorRenderbuffer[ht]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,B.__webglColorRenderbuffer[ht]);const Yt=r.convert(_t.format,_t.colorSpace),nt=r.convert(_t.type),yt=v(_t.internalFormat,Yt,nt,_t.colorSpace,T.isXRRenderTarget===!0),Lt=tt(T);i.renderbufferStorageMultisample(i.RENDERBUFFER,Lt,yt,T.width,T.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ht,i.RENDERBUFFER,B.__webglColorRenderbuffer[ht])}i.bindRenderbuffer(i.RENDERBUFFER,null),T.depthBuffer&&(B.__webglDepthRenderbuffer=i.createRenderbuffer(),ot(B.__webglDepthRenderbuffer,T,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if($){e.bindTexture(i.TEXTURE_CUBE_MAP,q.__webglTexture),kt(i.TEXTURE_CUBE_MAP,M);for(let ht=0;ht<6;ht++)if(M.mipmaps&&M.mipmaps.length>0)for(let _t=0;_t<M.mipmaps.length;_t++)wt(B.__webglFramebuffer[ht][_t],T,M,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ht,_t);else wt(B.__webglFramebuffer[ht],T,M,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ht,0);m(M)&&f(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Et){for(let ht=0,_t=Q.length;ht<_t;ht++){const Yt=Q[ht],nt=n.get(Yt);e.bindTexture(i.TEXTURE_2D,nt.__webglTexture),kt(i.TEXTURE_2D,Yt),wt(B.__webglFramebuffer,T,Yt,i.COLOR_ATTACHMENT0+ht,i.TEXTURE_2D,0),m(Yt)&&f(i.TEXTURE_2D)}e.unbindTexture()}else{let ht=i.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(ht=T.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(ht,q.__webglTexture),kt(ht,M),M.mipmaps&&M.mipmaps.length>0)for(let _t=0;_t<M.mipmaps.length;_t++)wt(B.__webglFramebuffer[_t],T,M,i.COLOR_ATTACHMENT0,ht,_t);else wt(B.__webglFramebuffer,T,M,i.COLOR_ATTACHMENT0,ht,0);m(M)&&f(ht),e.unbindTexture()}T.depthBuffer&&Ft(T)}function J(T){const M=T.textures;for(let B=0,q=M.length;B<q;B++){const Q=M[B];if(m(Q)){const $=b(T),Et=n.get(Q).__webglTexture;e.bindTexture($,Et),f($),e.unbindTexture()}}}const it=[],R=[];function Tt(T){if(T.samples>0){if(vt(T)===!1){const M=T.textures,B=T.width,q=T.height;let Q=i.COLOR_BUFFER_BIT;const $=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Et=n.get(T),ht=M.length>1;if(ht)for(let _t=0;_t<M.length;_t++)e.bindFramebuffer(i.FRAMEBUFFER,Et.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+_t,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,Et.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+_t,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,Et.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Et.__webglFramebuffer);for(let _t=0;_t<M.length;_t++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(Q|=i.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(Q|=i.STENCIL_BUFFER_BIT)),ht){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Et.__webglColorRenderbuffer[_t]);const Yt=n.get(M[_t]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Yt,0)}i.blitFramebuffer(0,0,B,q,0,0,B,q,Q,i.NEAREST),l===!0&&(it.length=0,R.length=0,it.push(i.COLOR_ATTACHMENT0+_t),T.depthBuffer&&T.resolveDepthBuffer===!1&&(it.push($),R.push($),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,R)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,it))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ht)for(let _t=0;_t<M.length;_t++){e.bindFramebuffer(i.FRAMEBUFFER,Et.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+_t,i.RENDERBUFFER,Et.__webglColorRenderbuffer[_t]);const Yt=n.get(M[_t]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,Et.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+_t,i.TEXTURE_2D,Yt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Et.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&l){const M=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[M])}}}function tt(T){return Math.min(s.maxSamples,T.samples)}function vt(T){const M=n.get(T);return T.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function rt(T){const M=o.render.frame;h.get(T)!==M&&(h.set(T,M),T.update())}function Dt(T,M){const B=T.colorSpace,q=T.format,Q=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||B!==Xi&&B!==Bn&&(Qt.getTransfer(B)===le?(q!==cn||Q!==An)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",B)),M}function pt(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(c.width=T.naturalWidth||T.width,c.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(c.width=T.displayWidth,c.height=T.displayHeight):(c.width=T.width,c.height=T.height),c}this.allocateTextureUnit=O,this.resetTextureUnits=k,this.setTexture2D=Y,this.setTexture2DArray=X,this.setTexture3D=K,this.setTextureCube=H,this.rebindTextures=It,this.setupRenderTarget=Zt,this.updateRenderTargetMipmap=J,this.updateMultisampleRenderTarget=Tt,this.setupDepthRenderbuffer=Ft,this.setupFrameBufferTexture=wt,this.useMultisampledRTT=vt}function r0(i,t){function e(n,s=Bn){let r;const o=Qt.getTransfer(s);if(n===An)return i.UNSIGNED_BYTE;if(n===fa)return i.UNSIGNED_SHORT_4_4_4_4;if(n===pa)return i.UNSIGNED_SHORT_5_5_5_1;if(n===mc)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===fc)return i.BYTE;if(n===pc)return i.SHORT;if(n===fs)return i.UNSIGNED_SHORT;if(n===da)return i.INT;if(n===ci)return i.UNSIGNED_INT;if(n===wn)return i.FLOAT;if(n===xs)return i.HALF_FLOAT;if(n===gc)return i.ALPHA;if(n===_c)return i.RGB;if(n===cn)return i.RGBA;if(n===vc)return i.LUMINANCE;if(n===xc)return i.LUMINANCE_ALPHA;if(n===Bi)return i.DEPTH_COMPONENT;if(n===Wi)return i.DEPTH_STENCIL;if(n===ma)return i.RED;if(n===ga)return i.RED_INTEGER;if(n===yc)return i.RG;if(n===_a)return i.RG_INTEGER;if(n===va)return i.RGBA_INTEGER;if(n===lr||n===cr||n===hr||n===ur)if(o===le)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===lr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===cr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===hr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===ur)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===lr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===cr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===hr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===ur)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Io||n===Uo||n===No||n===Fo)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Io)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Uo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===No)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Fo)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Oo||n===Bo||n===ko)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Oo||n===Bo)return o===le?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===ko)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===zo||n===Go||n===Ho||n===Vo||n===Wo||n===Xo||n===Yo||n===qo||n===$o||n===jo||n===Zo||n===Jo||n===Ko||n===Qo)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===zo)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Go)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Ho)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Vo)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Wo)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Xo)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Yo)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===qo)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===$o)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===jo)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Zo)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Jo)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Ko)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Qo)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===dr||n===ta||n===ea)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===dr)return o===le?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===ta)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===ea)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===bc||n===na||n===ia||n===sa)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===dr)return r.COMPRESSED_RED_RGTC1_EXT;if(n===na)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===ia)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===sa)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Vi?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}const o0={type:"move"};class mo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ct,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ct,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new D,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new D),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ct,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new D,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new D),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(const x of t.hand.values()){const m=e.getJointPose(x,n),f=this._getHandJoint(c,x);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),p=.02,g=.005;c.inputState.pinching&&d>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&d<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(o0)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Ct;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const a0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,l0=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class c0{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const s=new Ce,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Vn({vertexShader:a0,fragmentShader:l0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new he(new Cn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class h0 extends qi{constructor(t,e){super();const n=this;let s=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,d=null,p=null,g=null;const x=new c0,m=e.getContextAttributes();let f=null,b=null;const v=[],_=[],P=new at;let A=null;const E=new Ke;E.viewport=new xe;const C=new Ke;C.viewport=new xe;const S=[E,C],y=new Cd;let L=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let st=v[j];return st===void 0&&(st=new mo,v[j]=st),st.getTargetRaySpace()},this.getControllerGrip=function(j){let st=v[j];return st===void 0&&(st=new mo,v[j]=st),st.getGripSpace()},this.getHand=function(j){let st=v[j];return st===void 0&&(st=new mo,v[j]=st),st.getHandSpace()};function O(j){const st=_.indexOf(j.inputSource);if(st===-1)return;const wt=v[st];wt!==void 0&&(wt.update(j.inputSource,j.frame,c||o),wt.dispatchEvent({type:j.type,data:j.inputSource}))}function W(){s.removeEventListener("select",O),s.removeEventListener("selectstart",O),s.removeEventListener("selectend",O),s.removeEventListener("squeeze",O),s.removeEventListener("squeezestart",O),s.removeEventListener("squeezeend",O),s.removeEventListener("end",W),s.removeEventListener("inputsourceschange",Y);for(let j=0;j<v.length;j++){const st=_[j];st!==null&&(_[j]=null,v[j].disconnect(st))}L=null,k=null,x.reset(),t.setRenderTarget(f),p=null,d=null,u=null,s=null,b=null,ne.stop(),n.isPresenting=!1,t.setPixelRatio(A),t.setSize(P.width,P.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){r=j,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){a=j,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(j){c=j},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(j){if(s=j,s!==null){if(f=t.getRenderTarget(),s.addEventListener("select",O),s.addEventListener("selectstart",O),s.addEventListener("selectend",O),s.addEventListener("squeeze",O),s.addEventListener("squeezestart",O),s.addEventListener("squeezeend",O),s.addEventListener("end",W),s.addEventListener("inputsourceschange",Y),m.xrCompatible!==!0&&await e.makeXRCompatible(),A=t.getPixelRatio(),t.getSize(P),s.renderState.layers===void 0){const st={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,e,st),s.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),b=new hi(p.framebufferWidth,p.framebufferHeight,{format:cn,type:An,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let st=null,wt=null,ot=null;m.depth&&(ot=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,st=m.stencil?Wi:Bi,wt=m.stencil?Vi:ci);const At={colorFormat:e.RGBA8,depthFormat:ot,scaleFactor:r};u=new XRWebGLBinding(s,e),d=u.createProjectionLayer(At),s.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),b=new hi(d.textureWidth,d.textureHeight,{format:cn,type:An,depthTexture:new Fc(d.textureWidth,d.textureHeight,wt,void 0,void 0,void 0,void 0,void 0,void 0,st),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),ne.setContext(s),ne.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function Y(j){for(let st=0;st<j.removed.length;st++){const wt=j.removed[st],ot=_.indexOf(wt);ot>=0&&(_[ot]=null,v[ot].disconnect(wt))}for(let st=0;st<j.added.length;st++){const wt=j.added[st];let ot=_.indexOf(wt);if(ot===-1){for(let Ft=0;Ft<v.length;Ft++)if(Ft>=_.length){_.push(wt),ot=Ft;break}else if(_[Ft]===null){_[Ft]=wt,ot=Ft;break}if(ot===-1)break}const At=v[ot];At&&At.connect(wt)}}const X=new D,K=new D;function H(j,st,wt){X.setFromMatrixPosition(st.matrixWorld),K.setFromMatrixPosition(wt.matrixWorld);const ot=X.distanceTo(K),At=st.projectionMatrix.elements,Ft=wt.projectionMatrix.elements,It=At[14]/(At[10]-1),Zt=At[14]/(At[10]+1),J=(At[9]+1)/At[5],it=(At[9]-1)/At[5],R=(At[8]-1)/At[0],Tt=(Ft[8]+1)/Ft[0],tt=It*R,vt=It*Tt,rt=ot/(-R+Tt),Dt=rt*-R;if(st.matrixWorld.decompose(j.position,j.quaternion,j.scale),j.translateX(Dt),j.translateZ(rt),j.matrixWorld.compose(j.position,j.quaternion,j.scale),j.matrixWorldInverse.copy(j.matrixWorld).invert(),At[10]===-1)j.projectionMatrix.copy(st.projectionMatrix),j.projectionMatrixInverse.copy(st.projectionMatrixInverse);else{const pt=It+rt,T=Zt+rt,M=tt-Dt,B=vt+(ot-Dt),q=J*Zt/T*pt,Q=it*Zt/T*pt;j.projectionMatrix.makePerspective(M,B,q,Q,pt,T),j.projectionMatrixInverse.copy(j.projectionMatrix).invert()}}function lt(j,st){st===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(st.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(s===null)return;let st=j.near,wt=j.far;x.texture!==null&&(x.depthNear>0&&(st=x.depthNear),x.depthFar>0&&(wt=x.depthFar)),y.near=C.near=E.near=st,y.far=C.far=E.far=wt,(L!==y.near||k!==y.far)&&(s.updateRenderState({depthNear:y.near,depthFar:y.far}),L=y.near,k=y.far),E.layers.mask=j.layers.mask|2,C.layers.mask=j.layers.mask|4,y.layers.mask=E.layers.mask|C.layers.mask;const ot=j.parent,At=y.cameras;lt(y,ot);for(let Ft=0;Ft<At.length;Ft++)lt(At[Ft],ot);At.length===2?H(y,E,C):y.projectionMatrix.copy(E.projectionMatrix),gt(j,y,ot)};function gt(j,st,wt){wt===null?j.matrix.copy(st.matrixWorld):(j.matrix.copy(wt.matrixWorld),j.matrix.invert(),j.matrix.multiply(st.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(st.projectionMatrix),j.projectionMatrixInverse.copy(st.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=ps*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(d===null&&p===null))return l},this.setFoveation=function(j){l=j,d!==null&&(d.fixedFoveation=j),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=j)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(y)};let Mt=null;function kt(j,st){if(h=st.getViewerPose(c||o),g=st,h!==null){const wt=h.views;p!==null&&(t.setRenderTargetFramebuffer(b,p.framebuffer),t.setRenderTarget(b));let ot=!1;wt.length!==y.cameras.length&&(y.cameras.length=0,ot=!0);for(let Ft=0;Ft<wt.length;Ft++){const It=wt[Ft];let Zt=null;if(p!==null)Zt=p.getViewport(It);else{const it=u.getViewSubImage(d,It);Zt=it.viewport,Ft===0&&(t.setRenderTargetTextures(b,it.colorTexture,d.ignoreDepthValues?void 0:it.depthStencilTexture),t.setRenderTarget(b))}let J=S[Ft];J===void 0&&(J=new Ke,J.layers.enable(Ft),J.viewport=new xe,S[Ft]=J),J.matrix.fromArray(It.transform.matrix),J.matrix.decompose(J.position,J.quaternion,J.scale),J.projectionMatrix.fromArray(It.projectionMatrix),J.projectionMatrixInverse.copy(J.projectionMatrix).invert(),J.viewport.set(Zt.x,Zt.y,Zt.width,Zt.height),Ft===0&&(y.matrix.copy(J.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),ot===!0&&y.cameras.push(J)}const At=s.enabledFeatures;if(At&&At.includes("depth-sensing")){const Ft=u.getDepthInformation(wt[0]);Ft&&Ft.isValid&&Ft.texture&&x.init(t,Ft,s.renderState)}}for(let wt=0;wt<v.length;wt++){const ot=_[wt],At=v[wt];ot!==null&&At!==void 0&&At.update(ot,st,c||o)}Mt&&Mt(j,st),st.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:st}),g=null}const ne=new $c;ne.setAnimationLoop(kt),this.setAnimationLoop=function(j){Mt=j},this.dispose=function(){}}}const Qn=new Rn,u0=new ue;function d0(i,t){function e(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function n(m,f){f.color.getRGB(m.fogColor.value,Lc(i)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function s(m,f,b,v,_){f.isMeshBasicMaterial||f.isMeshLambertMaterial?r(m,f):f.isMeshToonMaterial?(r(m,f),u(m,f)):f.isMeshPhongMaterial?(r(m,f),h(m,f)):f.isMeshStandardMaterial?(r(m,f),d(m,f),f.isMeshPhysicalMaterial&&p(m,f,_)):f.isMeshMatcapMaterial?(r(m,f),g(m,f)):f.isMeshDepthMaterial?r(m,f):f.isMeshDistanceMaterial?(r(m,f),x(m,f)):f.isMeshNormalMaterial?r(m,f):f.isLineBasicMaterial?(o(m,f),f.isLineDashedMaterial&&a(m,f)):f.isPointsMaterial?l(m,f,b,v):f.isSpriteMaterial?c(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,e(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,e(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===Ge&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,e(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===Ge&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,e(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,e(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,e(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);const b=t.get(f),v=b.envMap,_=b.envMapRotation;v&&(m.envMap.value=v,Qn.copy(_),Qn.x*=-1,Qn.y*=-1,Qn.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(Qn.y*=-1,Qn.z*=-1),m.envMapRotation.value.setFromMatrix4(u0.makeRotationFromEuler(Qn)),m.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,e(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,e(f.aoMap,m.aoMapTransform))}function o(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,e(f.map,m.mapTransform))}function a(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function l(m,f,b,v){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*b,m.scale.value=v*.5,f.map&&(m.map.value=f.map,e(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function c(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,e(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function h(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function u(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function d(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,e(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,e(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,b){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,e(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,e(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,e(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,e(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,e(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Ge&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,e(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,e(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=b.texture,m.transmissionSamplerSize.value.set(b.width,b.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,e(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,e(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,e(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,e(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,e(f.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,f){f.matcap&&(m.matcap.value=f.matcap)}function x(m,f){const b=t.get(f).light;m.referencePosition.value.setFromMatrixPosition(b.matrixWorld),m.nearDistance.value=b.shadow.camera.near,m.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function f0(i,t,e,n){let s={},r={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(b,v){const _=v.program;n.uniformBlockBinding(b,_)}function c(b,v){let _=s[b.id];_===void 0&&(g(b),_=h(b),s[b.id]=_,b.addEventListener("dispose",m));const P=v.program;n.updateUBOMapping(b,P);const A=t.render.frame;r[b.id]!==A&&(d(b),r[b.id]=A)}function h(b){const v=u();b.__bindingPointIndex=v;const _=i.createBuffer(),P=b.__size,A=b.usage;return i.bindBuffer(i.UNIFORM_BUFFER,_),i.bufferData(i.UNIFORM_BUFFER,P,A),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,v,_),_}function u(){for(let b=0;b<a;b++)if(o.indexOf(b)===-1)return o.push(b),b;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(b){const v=s[b.id],_=b.uniforms,P=b.__cache;i.bindBuffer(i.UNIFORM_BUFFER,v);for(let A=0,E=_.length;A<E;A++){const C=Array.isArray(_[A])?_[A]:[_[A]];for(let S=0,y=C.length;S<y;S++){const L=C[S];if(p(L,A,S,P)===!0){const k=L.__offset,O=Array.isArray(L.value)?L.value:[L.value];let W=0;for(let Y=0;Y<O.length;Y++){const X=O[Y],K=x(X);typeof X=="number"||typeof X=="boolean"?(L.__data[0]=X,i.bufferSubData(i.UNIFORM_BUFFER,k+W,L.__data)):X.isMatrix3?(L.__data[0]=X.elements[0],L.__data[1]=X.elements[1],L.__data[2]=X.elements[2],L.__data[3]=0,L.__data[4]=X.elements[3],L.__data[5]=X.elements[4],L.__data[6]=X.elements[5],L.__data[7]=0,L.__data[8]=X.elements[6],L.__data[9]=X.elements[7],L.__data[10]=X.elements[8],L.__data[11]=0):(X.toArray(L.__data,W),W+=K.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,k,L.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(b,v,_,P){const A=b.value,E=v+"_"+_;if(P[E]===void 0)return typeof A=="number"||typeof A=="boolean"?P[E]=A:P[E]=A.clone(),!0;{const C=P[E];if(typeof A=="number"||typeof A=="boolean"){if(C!==A)return P[E]=A,!0}else if(C.equals(A)===!1)return C.copy(A),!0}return!1}function g(b){const v=b.uniforms;let _=0;const P=16;for(let E=0,C=v.length;E<C;E++){const S=Array.isArray(v[E])?v[E]:[v[E]];for(let y=0,L=S.length;y<L;y++){const k=S[y],O=Array.isArray(k.value)?k.value:[k.value];for(let W=0,Y=O.length;W<Y;W++){const X=O[W],K=x(X),H=_%P,lt=H%K.boundary,gt=H+lt;_+=lt,gt!==0&&P-gt<K.storage&&(_+=P-gt),k.__data=new Float32Array(K.storage/Float32Array.BYTES_PER_ELEMENT),k.__offset=_,_+=K.storage}}}const A=_%P;return A>0&&(_+=P-A),b.__size=_,b.__cache={},this}function x(b){const v={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(v.boundary=4,v.storage=4):b.isVector2?(v.boundary=8,v.storage=8):b.isVector3||b.isColor?(v.boundary=16,v.storage=12):b.isVector4?(v.boundary=16,v.storage=16):b.isMatrix3?(v.boundary=48,v.storage=48):b.isMatrix4?(v.boundary=64,v.storage=64):b.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",b),v}function m(b){const v=b.target;v.removeEventListener("dispose",m);const _=o.indexOf(v.__bindingPointIndex);o.splice(_,1),i.deleteBuffer(s[v.id]),delete s[v.id],delete r[v.id]}function f(){for(const b in s)i.deleteBuffer(s[b]);o=[],s={},r={}}return{bind:l,update:c,dispose:f}}class p0{constructor(t={}){const{canvas:e=gu(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:d=!1}=t;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=o;const g=new Uint32Array(4),x=new Int32Array(4);let m=null,f=null;const b=[],v=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Oe,this.toneMapping=zn,this.toneMappingExposure=1;const _=this;let P=!1,A=0,E=0,C=null,S=-1,y=null;const L=new xe,k=new xe;let O=null;const W=new Xt(0);let Y=0,X=e.width,K=e.height,H=1,lt=null,gt=null;const Mt=new xe(0,0,X,K),kt=new xe(0,0,X,K);let ne=!1;const j=new Ma;let st=!1,wt=!1;const ot=new ue,At=new ue,Ft=new D,It=new xe,Zt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let J=!1;function it(){return C===null?H:1}let R=n;function Tt(w,N){return e.getContext(w,N)}try{const w={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${ua}`),e.addEventListener("webglcontextlost",Z,!1),e.addEventListener("webglcontextrestored",mt,!1),e.addEventListener("webglcontextcreationerror",ft,!1),R===null){const N="webgl2";if(R=Tt(N,w),R===null)throw Tt(N)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(w){throw console.error("THREE.WebGLRenderer: "+w.message),w}let tt,vt,rt,Dt,pt,T,M,B,q,Q,$,Et,ht,_t,Yt,nt,yt,Lt,Ut,bt,$t,Ht,ce,U;function ut(){tt=new Sm(R),tt.init(),Ht=new r0(R,tt),vt=new _m(R,tt,t,Ht),rt=new i0(R,tt),vt.reverseDepthBuffer&&d&&rt.buffers.depth.setReversed(!0),Dt=new Tm(R),pt=new Wg,T=new s0(R,tt,rt,pt,vt,Ht,Dt),M=new xm(_),B=new Mm(_),q=new Dd(R),ce=new mm(R,q),Q=new wm(R,q,Dt,ce),$=new Rm(R,Q,q,Dt),Ut=new Am(R,vt,T),nt=new vm(pt),Et=new Vg(_,M,B,tt,vt,ce,nt),ht=new d0(_,pt),_t=new Yg,Yt=new Kg(tt),Lt=new pm(_,M,B,rt,$,p,l),yt=new e0(_,$,vt),U=new f0(R,Dt,vt,rt),bt=new gm(R,tt,Dt),$t=new Em(R,tt,Dt),Dt.programs=Et.programs,_.capabilities=vt,_.extensions=tt,_.properties=pt,_.renderLists=_t,_.shadowMap=yt,_.state=rt,_.info=Dt}ut();const V=new h0(_,R);this.xr=V,this.getContext=function(){return R},this.getContextAttributes=function(){return R.getContextAttributes()},this.forceContextLoss=function(){const w=tt.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){const w=tt.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return H},this.setPixelRatio=function(w){w!==void 0&&(H=w,this.setSize(X,K,!1))},this.getSize=function(w){return w.set(X,K)},this.setSize=function(w,N,z=!0){if(V.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}X=w,K=N,e.width=Math.floor(w*H),e.height=Math.floor(N*H),z===!0&&(e.style.width=w+"px",e.style.height=N+"px"),this.setViewport(0,0,w,N)},this.getDrawingBufferSize=function(w){return w.set(X*H,K*H).floor()},this.setDrawingBufferSize=function(w,N,z){X=w,K=N,H=z,e.width=Math.floor(w*z),e.height=Math.floor(N*z),this.setViewport(0,0,w,N)},this.getCurrentViewport=function(w){return w.copy(L)},this.getViewport=function(w){return w.copy(Mt)},this.setViewport=function(w,N,z,G){w.isVector4?Mt.set(w.x,w.y,w.z,w.w):Mt.set(w,N,z,G),rt.viewport(L.copy(Mt).multiplyScalar(H).round())},this.getScissor=function(w){return w.copy(kt)},this.setScissor=function(w,N,z,G){w.isVector4?kt.set(w.x,w.y,w.z,w.w):kt.set(w,N,z,G),rt.scissor(k.copy(kt).multiplyScalar(H).round())},this.getScissorTest=function(){return ne},this.setScissorTest=function(w){rt.setScissorTest(ne=w)},this.setOpaqueSort=function(w){lt=w},this.setTransparentSort=function(w){gt=w},this.getClearColor=function(w){return w.copy(Lt.getClearColor())},this.setClearColor=function(){Lt.setClearColor.apply(Lt,arguments)},this.getClearAlpha=function(){return Lt.getClearAlpha()},this.setClearAlpha=function(){Lt.setClearAlpha.apply(Lt,arguments)},this.clear=function(w=!0,N=!0,z=!0){let G=0;if(w){let F=!1;if(C!==null){const et=C.texture.format;F=et===va||et===_a||et===ga}if(F){const et=C.texture.type,dt=et===An||et===ci||et===fs||et===Vi||et===fa||et===pa,xt=Lt.getClearColor(),St=Lt.getClearAlpha(),Nt=xt.r,Ot=xt.g,Rt=xt.b;dt?(g[0]=Nt,g[1]=Ot,g[2]=Rt,g[3]=St,R.clearBufferuiv(R.COLOR,0,g)):(x[0]=Nt,x[1]=Ot,x[2]=Rt,x[3]=St,R.clearBufferiv(R.COLOR,0,x))}else G|=R.COLOR_BUFFER_BIT}N&&(G|=R.DEPTH_BUFFER_BIT),z&&(G|=R.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),R.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",Z,!1),e.removeEventListener("webglcontextrestored",mt,!1),e.removeEventListener("webglcontextcreationerror",ft,!1),Lt.dispose(),_t.dispose(),Yt.dispose(),pt.dispose(),M.dispose(),B.dispose(),$.dispose(),ce.dispose(),U.dispose(),Et.dispose(),V.dispose(),V.removeEventListener("sessionstart",Fa),V.removeEventListener("sessionend",Oa),Yn.stop()};function Z(w){w.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),P=!0}function mt(){console.log("THREE.WebGLRenderer: Context Restored."),P=!1;const w=Dt.autoReset,N=yt.enabled,z=yt.autoUpdate,G=yt.needsUpdate,F=yt.type;ut(),Dt.autoReset=w,yt.enabled=N,yt.autoUpdate=z,yt.needsUpdate=G,yt.type=F}function ft(w){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function zt(w){const N=w.target;N.removeEventListener("dispose",zt),me(N)}function me(w){Pe(w),pt.remove(w)}function Pe(w){const N=pt.get(w).programs;N!==void 0&&(N.forEach(function(z){Et.releaseProgram(z)}),w.isShaderMaterial&&Et.releaseShaderCache(w))}this.renderBufferDirect=function(w,N,z,G,F,et){N===null&&(N=Zt);const dt=F.isMesh&&F.matrixWorld.determinant()<0,xt=lh(w,N,z,G,F);rt.setMaterial(G,dt);let St=z.index,Nt=1;if(G.wireframe===!0){if(St=Q.getWireframeAttribute(z),St===void 0)return;Nt=2}const Ot=z.drawRange,Rt=z.attributes.position;let Jt=Ot.start*Nt,ie=(Ot.start+Ot.count)*Nt;et!==null&&(Jt=Math.max(Jt,et.start*Nt),ie=Math.min(ie,(et.start+et.count)*Nt)),St!==null?(Jt=Math.max(Jt,0),ie=Math.min(ie,St.count)):Rt!=null&&(Jt=Math.max(Jt,0),ie=Math.min(ie,Rt.count));const be=ie-Jt;if(be<0||be===1/0)return;ce.setup(F,G,xt,z,St);let ge,Kt=bt;if(St!==null&&(ge=q.get(St),Kt=$t,Kt.setIndex(ge)),F.isMesh)G.wireframe===!0?(rt.setLineWidth(G.wireframeLinewidth*it()),Kt.setMode(R.LINES)):Kt.setMode(R.TRIANGLES);else if(F.isLine){let Pt=G.linewidth;Pt===void 0&&(Pt=1),rt.setLineWidth(Pt*it()),F.isLineSegments?Kt.setMode(R.LINES):F.isLineLoop?Kt.setMode(R.LINE_LOOP):Kt.setMode(R.LINE_STRIP)}else F.isPoints?Kt.setMode(R.POINTS):F.isSprite&&Kt.setMode(R.TRIANGLES);if(F.isBatchedMesh)if(F._multiDrawInstances!==null)Kt.renderMultiDrawInstances(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount,F._multiDrawInstances);else if(tt.get("WEBGL_multi_draw"))Kt.renderMultiDraw(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount);else{const Pt=F._multiDrawStarts,Ae=F._multiDrawCounts,se=F._multiDrawCount,nn=St?q.get(St).bytesPerElement:1,mi=pt.get(G).currentProgram.getUniforms();for(let Ve=0;Ve<se;Ve++)mi.setValue(R,"_gl_DrawID",Ve),Kt.render(Pt[Ve]/nn,Ae[Ve])}else if(F.isInstancedMesh)Kt.renderInstances(Jt,be,F.count);else if(z.isInstancedBufferGeometry){const Pt=z._maxInstanceCount!==void 0?z._maxInstanceCount:1/0,Ae=Math.min(z.instanceCount,Pt);Kt.renderInstances(Jt,be,Ae)}else Kt.render(Jt,be)};function re(w,N,z){w.transparent===!0&&w.side===Qe&&w.forceSinglePass===!1?(w.side=Ge,w.needsUpdate=!0,Rs(w,N,z),w.side=Hn,w.needsUpdate=!0,Rs(w,N,z),w.side=Qe):Rs(w,N,z)}this.compile=function(w,N,z=null){z===null&&(z=w),f=Yt.get(z),f.init(N),v.push(f),z.traverseVisible(function(F){F.isLight&&F.layers.test(N.layers)&&(f.pushLight(F),F.castShadow&&f.pushShadow(F))}),w!==z&&w.traverseVisible(function(F){F.isLight&&F.layers.test(N.layers)&&(f.pushLight(F),F.castShadow&&f.pushShadow(F))}),f.setupLights();const G=new Set;return w.traverse(function(F){if(!(F.isMesh||F.isPoints||F.isLine||F.isSprite))return;const et=F.material;if(et)if(Array.isArray(et))for(let dt=0;dt<et.length;dt++){const xt=et[dt];re(xt,z,F),G.add(xt)}else re(et,z,F),G.add(et)}),v.pop(),f=null,G},this.compileAsync=function(w,N,z=null){const G=this.compile(w,N,z);return new Promise(F=>{function et(){if(G.forEach(function(dt){pt.get(dt).currentProgram.isReady()&&G.delete(dt)}),G.size===0){F(w);return}setTimeout(et,10)}tt.get("KHR_parallel_shader_compile")!==null?et():setTimeout(et,10)})};let en=null;function mn(w){en&&en(w)}function Fa(){Yn.stop()}function Oa(){Yn.start()}const Yn=new $c;Yn.setAnimationLoop(mn),typeof self<"u"&&Yn.setContext(self),this.setAnimationLoop=function(w){en=w,V.setAnimationLoop(w),w===null?Yn.stop():Yn.start()},V.addEventListener("sessionstart",Fa),V.addEventListener("sessionend",Oa),this.render=function(w,N){if(N!==void 0&&N.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),V.enabled===!0&&V.isPresenting===!0&&(V.cameraAutoUpdate===!0&&V.updateCamera(N),N=V.getCamera()),w.isScene===!0&&w.onBeforeRender(_,w,N,C),f=Yt.get(w,v.length),f.init(N),v.push(f),At.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),j.setFromProjectionMatrix(At),wt=this.localClippingEnabled,st=nt.init(this.clippingPlanes,wt),m=_t.get(w,b.length),m.init(),b.push(m),V.enabled===!0&&V.isPresenting===!0){const et=_.xr.getDepthSensingMesh();et!==null&&Ur(et,N,-1/0,_.sortObjects)}Ur(w,N,0,_.sortObjects),m.finish(),_.sortObjects===!0&&m.sort(lt,gt),J=V.enabled===!1||V.isPresenting===!1||V.hasDepthSensing()===!1,J&&Lt.addToRenderList(m,w),this.info.render.frame++,st===!0&&nt.beginShadows();const z=f.state.shadowsArray;yt.render(z,w,N),st===!0&&nt.endShadows(),this.info.autoReset===!0&&this.info.reset();const G=m.opaque,F=m.transmissive;if(f.setupLights(),N.isArrayCamera){const et=N.cameras;if(F.length>0)for(let dt=0,xt=et.length;dt<xt;dt++){const St=et[dt];ka(G,F,w,St)}J&&Lt.render(w);for(let dt=0,xt=et.length;dt<xt;dt++){const St=et[dt];Ba(m,w,St,St.viewport)}}else F.length>0&&ka(G,F,w,N),J&&Lt.render(w),Ba(m,w,N);C!==null&&(T.updateMultisampleRenderTarget(C),T.updateRenderTargetMipmap(C)),w.isScene===!0&&w.onAfterRender(_,w,N),ce.resetDefaultState(),S=-1,y=null,v.pop(),v.length>0?(f=v[v.length-1],st===!0&&nt.setGlobalState(_.clippingPlanes,f.state.camera)):f=null,b.pop(),b.length>0?m=b[b.length-1]:m=null};function Ur(w,N,z,G){if(w.visible===!1)return;if(w.layers.test(N.layers)){if(w.isGroup)z=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(N);else if(w.isLight)f.pushLight(w),w.castShadow&&f.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||j.intersectsSprite(w)){G&&It.setFromMatrixPosition(w.matrixWorld).applyMatrix4(At);const dt=$.update(w),xt=w.material;xt.visible&&m.push(w,dt,xt,z,It.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||j.intersectsObject(w))){const dt=$.update(w),xt=w.material;if(G&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),It.copy(w.boundingSphere.center)):(dt.boundingSphere===null&&dt.computeBoundingSphere(),It.copy(dt.boundingSphere.center)),It.applyMatrix4(w.matrixWorld).applyMatrix4(At)),Array.isArray(xt)){const St=dt.groups;for(let Nt=0,Ot=St.length;Nt<Ot;Nt++){const Rt=St[Nt],Jt=xt[Rt.materialIndex];Jt&&Jt.visible&&m.push(w,dt,Jt,z,It.z,Rt)}}else xt.visible&&m.push(w,dt,xt,z,It.z,null)}}const et=w.children;for(let dt=0,xt=et.length;dt<xt;dt++)Ur(et[dt],N,z,G)}function Ba(w,N,z,G){const F=w.opaque,et=w.transmissive,dt=w.transparent;f.setupLightsView(z),st===!0&&nt.setGlobalState(_.clippingPlanes,z),G&&rt.viewport(L.copy(G)),F.length>0&&As(F,N,z),et.length>0&&As(et,N,z),dt.length>0&&As(dt,N,z),rt.buffers.depth.setTest(!0),rt.buffers.depth.setMask(!0),rt.buffers.color.setMask(!0),rt.setPolygonOffset(!1)}function ka(w,N,z,G){if((z.isScene===!0?z.overrideMaterial:null)!==null)return;f.state.transmissionRenderTarget[G.id]===void 0&&(f.state.transmissionRenderTarget[G.id]=new hi(1,1,{generateMipmaps:!0,type:tt.has("EXT_color_buffer_half_float")||tt.has("EXT_color_buffer_float")?xs:An,minFilter:li,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Qt.workingColorSpace}));const et=f.state.transmissionRenderTarget[G.id],dt=G.viewport||L;et.setSize(dt.z,dt.w);const xt=_.getRenderTarget();_.setRenderTarget(et),_.getClearColor(W),Y=_.getClearAlpha(),Y<1&&_.setClearColor(16777215,.5),_.clear(),J&&Lt.render(z);const St=_.toneMapping;_.toneMapping=zn;const Nt=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),f.setupLightsView(G),st===!0&&nt.setGlobalState(_.clippingPlanes,G),As(w,z,G),T.updateMultisampleRenderTarget(et),T.updateRenderTargetMipmap(et),tt.has("WEBGL_multisampled_render_to_texture")===!1){let Ot=!1;for(let Rt=0,Jt=N.length;Rt<Jt;Rt++){const ie=N[Rt],be=ie.object,ge=ie.geometry,Kt=ie.material,Pt=ie.group;if(Kt.side===Qe&&be.layers.test(G.layers)){const Ae=Kt.side;Kt.side=Ge,Kt.needsUpdate=!0,za(be,z,G,ge,Kt,Pt),Kt.side=Ae,Kt.needsUpdate=!0,Ot=!0}}Ot===!0&&(T.updateMultisampleRenderTarget(et),T.updateRenderTargetMipmap(et))}_.setRenderTarget(xt),_.setClearColor(W,Y),Nt!==void 0&&(G.viewport=Nt),_.toneMapping=St}function As(w,N,z){const G=N.isScene===!0?N.overrideMaterial:null;for(let F=0,et=w.length;F<et;F++){const dt=w[F],xt=dt.object,St=dt.geometry,Nt=G===null?dt.material:G,Ot=dt.group;xt.layers.test(z.layers)&&za(xt,N,z,St,Nt,Ot)}}function za(w,N,z,G,F,et){w.onBeforeRender(_,N,z,G,F,et),w.modelViewMatrix.multiplyMatrices(z.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),F.onBeforeRender(_,N,z,G,w,et),F.transparent===!0&&F.side===Qe&&F.forceSinglePass===!1?(F.side=Ge,F.needsUpdate=!0,_.renderBufferDirect(z,N,G,F,w,et),F.side=Hn,F.needsUpdate=!0,_.renderBufferDirect(z,N,G,F,w,et),F.side=Qe):_.renderBufferDirect(z,N,G,F,w,et),w.onAfterRender(_,N,z,G,F,et)}function Rs(w,N,z){N.isScene!==!0&&(N=Zt);const G=pt.get(w),F=f.state.lights,et=f.state.shadowsArray,dt=F.state.version,xt=Et.getParameters(w,F.state,et,N,z),St=Et.getProgramCacheKey(xt);let Nt=G.programs;G.environment=w.isMeshStandardMaterial?N.environment:null,G.fog=N.fog,G.envMap=(w.isMeshStandardMaterial?B:M).get(w.envMap||G.environment),G.envMapRotation=G.environment!==null&&w.envMap===null?N.environmentRotation:w.envMapRotation,Nt===void 0&&(w.addEventListener("dispose",zt),Nt=new Map,G.programs=Nt);let Ot=Nt.get(St);if(Ot!==void 0){if(G.currentProgram===Ot&&G.lightsStateVersion===dt)return Ha(w,xt),Ot}else xt.uniforms=Et.getUniforms(w),w.onBeforeCompile(xt,_),Ot=Et.acquireProgram(xt,St),Nt.set(St,Ot),G.uniforms=xt.uniforms;const Rt=G.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(Rt.clippingPlanes=nt.uniform),Ha(w,xt),G.needsLights=hh(w),G.lightsStateVersion=dt,G.needsLights&&(Rt.ambientLightColor.value=F.state.ambient,Rt.lightProbe.value=F.state.probe,Rt.directionalLights.value=F.state.directional,Rt.directionalLightShadows.value=F.state.directionalShadow,Rt.spotLights.value=F.state.spot,Rt.spotLightShadows.value=F.state.spotShadow,Rt.rectAreaLights.value=F.state.rectArea,Rt.ltc_1.value=F.state.rectAreaLTC1,Rt.ltc_2.value=F.state.rectAreaLTC2,Rt.pointLights.value=F.state.point,Rt.pointLightShadows.value=F.state.pointShadow,Rt.hemisphereLights.value=F.state.hemi,Rt.directionalShadowMap.value=F.state.directionalShadowMap,Rt.directionalShadowMatrix.value=F.state.directionalShadowMatrix,Rt.spotShadowMap.value=F.state.spotShadowMap,Rt.spotLightMatrix.value=F.state.spotLightMatrix,Rt.spotLightMap.value=F.state.spotLightMap,Rt.pointShadowMap.value=F.state.pointShadowMap,Rt.pointShadowMatrix.value=F.state.pointShadowMatrix),G.currentProgram=Ot,G.uniformsList=null,Ot}function Ga(w){if(w.uniformsList===null){const N=w.currentProgram.getUniforms();w.uniformsList=fr.seqWithValue(N.seq,w.uniforms)}return w.uniformsList}function Ha(w,N){const z=pt.get(w);z.outputColorSpace=N.outputColorSpace,z.batching=N.batching,z.batchingColor=N.batchingColor,z.instancing=N.instancing,z.instancingColor=N.instancingColor,z.instancingMorph=N.instancingMorph,z.skinning=N.skinning,z.morphTargets=N.morphTargets,z.morphNormals=N.morphNormals,z.morphColors=N.morphColors,z.morphTargetsCount=N.morphTargetsCount,z.numClippingPlanes=N.numClippingPlanes,z.numIntersection=N.numClipIntersection,z.vertexAlphas=N.vertexAlphas,z.vertexTangents=N.vertexTangents,z.toneMapping=N.toneMapping}function lh(w,N,z,G,F){N.isScene!==!0&&(N=Zt),T.resetTextureUnits();const et=N.fog,dt=G.isMeshStandardMaterial?N.environment:null,xt=C===null?_.outputColorSpace:C.isXRRenderTarget===!0?C.texture.colorSpace:Xi,St=(G.isMeshStandardMaterial?B:M).get(G.envMap||dt),Nt=G.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,Ot=!!z.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),Rt=!!z.morphAttributes.position,Jt=!!z.morphAttributes.normal,ie=!!z.morphAttributes.color;let be=zn;G.toneMapped&&(C===null||C.isXRRenderTarget===!0)&&(be=_.toneMapping);const ge=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,Kt=ge!==void 0?ge.length:0,Pt=pt.get(G),Ae=f.state.lights;if(st===!0&&(wt===!0||w!==y)){const Ue=w===y&&G.id===S;nt.setState(G,w,Ue)}let se=!1;G.version===Pt.__version?(Pt.needsLights&&Pt.lightsStateVersion!==Ae.state.version||Pt.outputColorSpace!==xt||F.isBatchedMesh&&Pt.batching===!1||!F.isBatchedMesh&&Pt.batching===!0||F.isBatchedMesh&&Pt.batchingColor===!0&&F.colorTexture===null||F.isBatchedMesh&&Pt.batchingColor===!1&&F.colorTexture!==null||F.isInstancedMesh&&Pt.instancing===!1||!F.isInstancedMesh&&Pt.instancing===!0||F.isSkinnedMesh&&Pt.skinning===!1||!F.isSkinnedMesh&&Pt.skinning===!0||F.isInstancedMesh&&Pt.instancingColor===!0&&F.instanceColor===null||F.isInstancedMesh&&Pt.instancingColor===!1&&F.instanceColor!==null||F.isInstancedMesh&&Pt.instancingMorph===!0&&F.morphTexture===null||F.isInstancedMesh&&Pt.instancingMorph===!1&&F.morphTexture!==null||Pt.envMap!==St||G.fog===!0&&Pt.fog!==et||Pt.numClippingPlanes!==void 0&&(Pt.numClippingPlanes!==nt.numPlanes||Pt.numIntersection!==nt.numIntersection)||Pt.vertexAlphas!==Nt||Pt.vertexTangents!==Ot||Pt.morphTargets!==Rt||Pt.morphNormals!==Jt||Pt.morphColors!==ie||Pt.toneMapping!==be||Pt.morphTargetsCount!==Kt)&&(se=!0):(se=!0,Pt.__version=G.version);let nn=Pt.currentProgram;se===!0&&(nn=Rs(G,N,F));let mi=!1,Ve=!1,Zi=!1;const de=nn.getUniforms(),$e=Pt.uniforms;if(rt.useProgram(nn.program)&&(mi=!0,Ve=!0,Zi=!0),G.id!==S&&(S=G.id,Ve=!0),mi||y!==w){rt.buffers.depth.getReversed()?(ot.copy(w.projectionMatrix),vu(ot),xu(ot),de.setValue(R,"projectionMatrix",ot)):de.setValue(R,"projectionMatrix",w.projectionMatrix),de.setValue(R,"viewMatrix",w.matrixWorldInverse);const ke=de.map.cameraPosition;ke!==void 0&&ke.setValue(R,Ft.setFromMatrixPosition(w.matrixWorld)),vt.logarithmicDepthBuffer&&de.setValue(R,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&de.setValue(R,"isOrthographic",w.isOrthographicCamera===!0),y!==w&&(y=w,Ve=!0,Zi=!0)}if(F.isSkinnedMesh){de.setOptional(R,F,"bindMatrix"),de.setOptional(R,F,"bindMatrixInverse");const Ue=F.skeleton;Ue&&(Ue.boneTexture===null&&Ue.computeBoneTexture(),de.setValue(R,"boneTexture",Ue.boneTexture,T))}F.isBatchedMesh&&(de.setOptional(R,F,"batchingTexture"),de.setValue(R,"batchingTexture",F._matricesTexture,T),de.setOptional(R,F,"batchingIdTexture"),de.setValue(R,"batchingIdTexture",F._indirectTexture,T),de.setOptional(R,F,"batchingColorTexture"),F._colorsTexture!==null&&de.setValue(R,"batchingColorTexture",F._colorsTexture,T));const je=z.morphAttributes;if((je.position!==void 0||je.normal!==void 0||je.color!==void 0)&&Ut.update(F,z,nn),(Ve||Pt.receiveShadow!==F.receiveShadow)&&(Pt.receiveShadow=F.receiveShadow,de.setValue(R,"receiveShadow",F.receiveShadow)),G.isMeshGouraudMaterial&&G.envMap!==null&&($e.envMap.value=St,$e.flipEnvMap.value=St.isCubeTexture&&St.isRenderTargetTexture===!1?-1:1),G.isMeshStandardMaterial&&G.envMap===null&&N.environment!==null&&($e.envMapIntensity.value=N.environmentIntensity),Ve&&(de.setValue(R,"toneMappingExposure",_.toneMappingExposure),Pt.needsLights&&ch($e,Zi),et&&G.fog===!0&&ht.refreshFogUniforms($e,et),ht.refreshMaterialUniforms($e,G,H,K,f.state.transmissionRenderTarget[w.id]),fr.upload(R,Ga(Pt),$e,T)),G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(fr.upload(R,Ga(Pt),$e,T),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&de.setValue(R,"center",F.center),de.setValue(R,"modelViewMatrix",F.modelViewMatrix),de.setValue(R,"normalMatrix",F.normalMatrix),de.setValue(R,"modelMatrix",F.matrixWorld),G.isShaderMaterial||G.isRawShaderMaterial){const Ue=G.uniformsGroups;for(let ke=0,Nr=Ue.length;ke<Nr;ke++){const qn=Ue[ke];U.update(qn,nn),U.bind(qn,nn)}}return nn}function ch(w,N){w.ambientLightColor.needsUpdate=N,w.lightProbe.needsUpdate=N,w.directionalLights.needsUpdate=N,w.directionalLightShadows.needsUpdate=N,w.pointLights.needsUpdate=N,w.pointLightShadows.needsUpdate=N,w.spotLights.needsUpdate=N,w.spotLightShadows.needsUpdate=N,w.rectAreaLights.needsUpdate=N,w.hemisphereLights.needsUpdate=N}function hh(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return E},this.getRenderTarget=function(){return C},this.setRenderTargetTextures=function(w,N,z){pt.get(w.texture).__webglTexture=N,pt.get(w.depthTexture).__webglTexture=z;const G=pt.get(w);G.__hasExternalTextures=!0,G.__autoAllocateDepthBuffer=z===void 0,G.__autoAllocateDepthBuffer||tt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),G.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(w,N){const z=pt.get(w);z.__webglFramebuffer=N,z.__useDefaultFramebuffer=N===void 0},this.setRenderTarget=function(w,N=0,z=0){C=w,A=N,E=z;let G=!0,F=null,et=!1,dt=!1;if(w){const St=pt.get(w);if(St.__useDefaultFramebuffer!==void 0)rt.bindFramebuffer(R.FRAMEBUFFER,null),G=!1;else if(St.__webglFramebuffer===void 0)T.setupRenderTarget(w);else if(St.__hasExternalTextures)T.rebindTextures(w,pt.get(w.texture).__webglTexture,pt.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){const Rt=w.depthTexture;if(St.__boundDepthTexture!==Rt){if(Rt!==null&&pt.has(Rt)&&(w.width!==Rt.image.width||w.height!==Rt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");T.setupDepthRenderbuffer(w)}}const Nt=w.texture;(Nt.isData3DTexture||Nt.isDataArrayTexture||Nt.isCompressedArrayTexture)&&(dt=!0);const Ot=pt.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(Ot[N])?F=Ot[N][z]:F=Ot[N],et=!0):w.samples>0&&T.useMultisampledRTT(w)===!1?F=pt.get(w).__webglMultisampledFramebuffer:Array.isArray(Ot)?F=Ot[z]:F=Ot,L.copy(w.viewport),k.copy(w.scissor),O=w.scissorTest}else L.copy(Mt).multiplyScalar(H).floor(),k.copy(kt).multiplyScalar(H).floor(),O=ne;if(rt.bindFramebuffer(R.FRAMEBUFFER,F)&&G&&rt.drawBuffers(w,F),rt.viewport(L),rt.scissor(k),rt.setScissorTest(O),et){const St=pt.get(w.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_CUBE_MAP_POSITIVE_X+N,St.__webglTexture,z)}else if(dt){const St=pt.get(w.texture),Nt=N||0;R.framebufferTextureLayer(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,St.__webglTexture,z||0,Nt)}S=-1},this.readRenderTargetPixels=function(w,N,z,G,F,et,dt){if(!(w&&w.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let xt=pt.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&dt!==void 0&&(xt=xt[dt]),xt){rt.bindFramebuffer(R.FRAMEBUFFER,xt);try{const St=w.texture,Nt=St.format,Ot=St.type;if(!vt.textureFormatReadable(Nt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!vt.textureTypeReadable(Ot)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=w.width-G&&z>=0&&z<=w.height-F&&R.readPixels(N,z,G,F,Ht.convert(Nt),Ht.convert(Ot),et)}finally{const St=C!==null?pt.get(C).__webglFramebuffer:null;rt.bindFramebuffer(R.FRAMEBUFFER,St)}}},this.readRenderTargetPixelsAsync=async function(w,N,z,G,F,et,dt){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let xt=pt.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&dt!==void 0&&(xt=xt[dt]),xt){const St=w.texture,Nt=St.format,Ot=St.type;if(!vt.textureFormatReadable(Nt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!vt.textureTypeReadable(Ot))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(N>=0&&N<=w.width-G&&z>=0&&z<=w.height-F){rt.bindFramebuffer(R.FRAMEBUFFER,xt);const Rt=R.createBuffer();R.bindBuffer(R.PIXEL_PACK_BUFFER,Rt),R.bufferData(R.PIXEL_PACK_BUFFER,et.byteLength,R.STREAM_READ),R.readPixels(N,z,G,F,Ht.convert(Nt),Ht.convert(Ot),0);const Jt=C!==null?pt.get(C).__webglFramebuffer:null;rt.bindFramebuffer(R.FRAMEBUFFER,Jt);const ie=R.fenceSync(R.SYNC_GPU_COMMANDS_COMPLETE,0);return R.flush(),await _u(R,ie,4),R.bindBuffer(R.PIXEL_PACK_BUFFER,Rt),R.getBufferSubData(R.PIXEL_PACK_BUFFER,0,et),R.deleteBuffer(Rt),R.deleteSync(ie),et}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(w,N=null,z=0){w.isTexture!==!0&&(Ii("WebGLRenderer: copyFramebufferToTexture function signature has changed."),N=arguments[0]||null,w=arguments[1]);const G=Math.pow(2,-z),F=Math.floor(w.image.width*G),et=Math.floor(w.image.height*G),dt=N!==null?N.x:0,xt=N!==null?N.y:0;T.setTexture2D(w,0),R.copyTexSubImage2D(R.TEXTURE_2D,z,0,0,dt,xt,F,et),rt.unbindTexture()};const uh=R.createFramebuffer(),dh=R.createFramebuffer();this.copyTextureToTexture=function(w,N,z=null,G=null,F=0,et=null){w.isTexture!==!0&&(Ii("WebGLRenderer: copyTextureToTexture function signature has changed."),G=arguments[0]||null,w=arguments[1],N=arguments[2],et=arguments[3]||0,z=null),et===null&&(F!==0?(Ii("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),et=F,F=0):et=0);let dt,xt,St,Nt,Ot,Rt,Jt,ie,be;const ge=w.isCompressedTexture?w.mipmaps[et]:w.image;if(z!==null)dt=z.max.x-z.min.x,xt=z.max.y-z.min.y,St=z.isBox3?z.max.z-z.min.z:1,Nt=z.min.x,Ot=z.min.y,Rt=z.isBox3?z.min.z:0;else{const je=Math.pow(2,-F);dt=Math.floor(ge.width*je),xt=Math.floor(ge.height*je),w.isDataArrayTexture?St=ge.depth:w.isData3DTexture?St=Math.floor(ge.depth*je):St=1,Nt=0,Ot=0,Rt=0}G!==null?(Jt=G.x,ie=G.y,be=G.z):(Jt=0,ie=0,be=0);const Kt=Ht.convert(N.format),Pt=Ht.convert(N.type);let Ae;N.isData3DTexture?(T.setTexture3D(N,0),Ae=R.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?(T.setTexture2DArray(N,0),Ae=R.TEXTURE_2D_ARRAY):(T.setTexture2D(N,0),Ae=R.TEXTURE_2D),R.pixelStorei(R.UNPACK_FLIP_Y_WEBGL,N.flipY),R.pixelStorei(R.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),R.pixelStorei(R.UNPACK_ALIGNMENT,N.unpackAlignment);const se=R.getParameter(R.UNPACK_ROW_LENGTH),nn=R.getParameter(R.UNPACK_IMAGE_HEIGHT),mi=R.getParameter(R.UNPACK_SKIP_PIXELS),Ve=R.getParameter(R.UNPACK_SKIP_ROWS),Zi=R.getParameter(R.UNPACK_SKIP_IMAGES);R.pixelStorei(R.UNPACK_ROW_LENGTH,ge.width),R.pixelStorei(R.UNPACK_IMAGE_HEIGHT,ge.height),R.pixelStorei(R.UNPACK_SKIP_PIXELS,Nt),R.pixelStorei(R.UNPACK_SKIP_ROWS,Ot),R.pixelStorei(R.UNPACK_SKIP_IMAGES,Rt);const de=w.isDataArrayTexture||w.isData3DTexture,$e=N.isDataArrayTexture||N.isData3DTexture;if(w.isDepthTexture){const je=pt.get(w),Ue=pt.get(N),ke=pt.get(je.__renderTarget),Nr=pt.get(Ue.__renderTarget);rt.bindFramebuffer(R.READ_FRAMEBUFFER,ke.__webglFramebuffer),rt.bindFramebuffer(R.DRAW_FRAMEBUFFER,Nr.__webglFramebuffer);for(let qn=0;qn<St;qn++)de&&(R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,pt.get(w).__webglTexture,F,Rt+qn),R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,pt.get(N).__webglTexture,et,be+qn)),R.blitFramebuffer(Nt,Ot,dt,xt,Jt,ie,dt,xt,R.DEPTH_BUFFER_BIT,R.NEAREST);rt.bindFramebuffer(R.READ_FRAMEBUFFER,null),rt.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else if(F!==0||w.isRenderTargetTexture||pt.has(w)){const je=pt.get(w),Ue=pt.get(N);rt.bindFramebuffer(R.READ_FRAMEBUFFER,uh),rt.bindFramebuffer(R.DRAW_FRAMEBUFFER,dh);for(let ke=0;ke<St;ke++)de?R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,je.__webglTexture,F,Rt+ke):R.framebufferTexture2D(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,je.__webglTexture,F),$e?R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,Ue.__webglTexture,et,be+ke):R.framebufferTexture2D(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,Ue.__webglTexture,et),F!==0?R.blitFramebuffer(Nt,Ot,dt,xt,Jt,ie,dt,xt,R.COLOR_BUFFER_BIT,R.NEAREST):$e?R.copyTexSubImage3D(Ae,et,Jt,ie,be+ke,Nt,Ot,dt,xt):R.copyTexSubImage2D(Ae,et,Jt,ie,Nt,Ot,dt,xt);rt.bindFramebuffer(R.READ_FRAMEBUFFER,null),rt.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else $e?w.isDataTexture||w.isData3DTexture?R.texSubImage3D(Ae,et,Jt,ie,be,dt,xt,St,Kt,Pt,ge.data):N.isCompressedArrayTexture?R.compressedTexSubImage3D(Ae,et,Jt,ie,be,dt,xt,St,Kt,ge.data):R.texSubImage3D(Ae,et,Jt,ie,be,dt,xt,St,Kt,Pt,ge):w.isDataTexture?R.texSubImage2D(R.TEXTURE_2D,et,Jt,ie,dt,xt,Kt,Pt,ge.data):w.isCompressedTexture?R.compressedTexSubImage2D(R.TEXTURE_2D,et,Jt,ie,ge.width,ge.height,Kt,ge.data):R.texSubImage2D(R.TEXTURE_2D,et,Jt,ie,dt,xt,Kt,Pt,ge);R.pixelStorei(R.UNPACK_ROW_LENGTH,se),R.pixelStorei(R.UNPACK_IMAGE_HEIGHT,nn),R.pixelStorei(R.UNPACK_SKIP_PIXELS,mi),R.pixelStorei(R.UNPACK_SKIP_ROWS,Ve),R.pixelStorei(R.UNPACK_SKIP_IMAGES,Zi),et===0&&N.generateMipmaps&&R.generateMipmap(Ae),rt.unbindTexture()},this.copyTextureToTexture3D=function(w,N,z=null,G=null,F=0){return w.isTexture!==!0&&(Ii("WebGLRenderer: copyTextureToTexture3D function signature has changed."),z=arguments[0]||null,G=arguments[1]||null,w=arguments[2],N=arguments[3],F=arguments[4]||0),Ii('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(w,N,z,G,F)},this.initRenderTarget=function(w){pt.get(w).__webglFramebuffer===void 0&&T.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?T.setTextureCube(w,0):w.isData3DTexture?T.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?T.setTexture2DArray(w,0):T.setTexture2D(w,0),rt.unbindTexture()},this.resetState=function(){A=0,E=0,C=null,rt.reset(),ce.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return En}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=Qt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Qt._getUnpackColorSpace()}}const m0=2;function g0(i){const t=typeof navigator.gpu<"u",e=new p0({canvas:i,antialias:!0,alpha:!1,powerPreference:"high-performance"}),n=Math.min(window.devicePixelRatio||1,m0);return e.setPixelRatio(n),e.outputColorSpace=Oe,e.toneMapping=uc,e.toneMappingExposure=1.06,e.shadowMap.enabled=!0,e.shadowMap.type=cc,{renderer:e,info:{backend:"webgl2",webgpuSupported:t,pixelRatio:n}}}class Pa{renderer;info;scene;camera;wrap;canvas;clock=new Pd;handlers=new Set;rafId=0;running=!1;lastTickAt=0;watchdog=null;resizeObserver;frameCenter=new D(.1,.2,.1);framePoints=[];static VIEW_DIR=new D(.02,.62,.782).normalize();onVisibility=()=>{document.hidden?this.stopLoop():this.startLoop()};constructor(t){this.wrap=t,this.canvas=document.createElement("canvas"),this.canvas.setAttribute("aria-label","CodeBops 3D world"),t.appendChild(this.canvas);const{renderer:e,info:n}=g0(this.canvas);this.renderer=e,this.info=n,this.scene=new Hu,this.scene.background=new Xt("#6fc7ff"),this.scene.fog=new cs("#6fc7ff",26,60),this.scene.fog=new cs("#a8dcff",50,130),this.camera=new Ke(34,16/9,.1,120),this.camera.position.set(.2,8.8,10.8),this.camera.lookAt(.1,.2,.1);const s=new Td("#cfeaff","#79c95f",1.15);this.scene.add(s);const r=new wl("#fff3d6",2.1);r.position.set(7,14,8),r.castShadow=!0,r.shadow.mapSize.set(2048,2048),r.shadow.camera.left=-14,r.shadow.camera.right=14,r.shadow.camera.top=14,r.shadow.camera.bottom=-14,r.shadow.camera.far=45,r.shadow.bias=-4e-4,r.shadow.radius=6,this.scene.add(r);const o=new wl("#bcd6ff",.55);o.position.set(-6,8,-4),this.scene.add(o),this.resizeObserver=new ResizeObserver(()=>this.resize()),this.resizeObserver.observe(this.wrap),document.addEventListener("visibilitychange",this.onVisibility),this.resize()}onTick(t){return this.handlers.add(t),()=>this.handlers.delete(t)}startLoop(){if(this.running)return;this.running=!0,this.clock.getDelta();const t=()=>{this.lastTickAt=performance.now();const n=Math.min(this.clock.getDelta(),.25);this.handlers.forEach(s=>s(n,this.clock.elapsedTime)),this.renderer.render(this.scene,this.camera)},e=()=>{this.running&&(this.rafId=requestAnimationFrame(e),t())};this.rafId=requestAnimationFrame(e),this.watchdog=window.setInterval(()=>{this.running&&performance.now()-this.lastTickAt>250&&t()},100)}stopLoop(){this.running=!1,cancelAnimationFrame(this.rafId),this.watchdog!==null&&(clearInterval(this.watchdog),this.watchdog=null)}frameArea(t,e){this.frameCenter.copy(t),this.framePoints=e.map(n=>n.clone()),this.applyFrame()}applyFrame(){const e=this.camera.aspect<1?1.08:1.2;let n=11;const s=this.camera;for(let r=0;r<4;r++){s.position.copy(this.frameCenter).addScaledVector(Pa.VIEW_DIR,n),s.lookAt(this.frameCenter.x,.2,this.frameCenter.z),s.updateMatrixWorld(!0),s.updateProjectionMatrix();let o=0;for(const l of this.framePoints){const c=l.clone().project(s);o=Math.max(o,Math.abs(c.x),Math.abs(c.y))}const a=o*e;if(a<=1||this.framePoints.length===0)break;n*=a}}setSky(t,e=26,n=62){this.scene.background=new Xt(t),this.scene.fog=new cs(t,e,n),this.running||this.renderer.render(this.scene,this.camera)}resize(){const t=Math.max(1,this.wrap.clientWidth),e=Math.max(1,this.wrap.clientHeight);this.renderer.setSize(t,e,!1),this.camera.aspect=t/e;const n=t/e;this.camera.fov=n>=1.4?34:n>=1?40:46,n<1?this.camera.setViewOffset(t,e,0,Math.round(e*.085),t,e):this.camera.clearViewOffset(),this.camera.updateProjectionMatrix(),this.applyFrame(),this.running||this.renderer.render(this.scene,this.camera)}dispose(){this.stopLoop(),this.resizeObserver.disconnect(),document.removeEventListener("visibilitychange",this.onVisibility),this.scene.traverse(t=>{if(t instanceof he){t.geometry.dispose();const e=Array.isArray(t.material)?t.material:[t.material];for(const n of e){for(const s of Object.values(n))s instanceof Ce&&s.dispose();n.dispose()}}}),this.renderer.dispose(),this.canvas.remove()}}const ns=new D;function Je(i,t,e,n,s,r){const o=2*Math.PI*s/4,a=Math.max(r-2*s,0),l=Math.PI/4;ns.copy(t),ns[n]=0,ns.normalize();const c=.5*o/(o+a),h=1-ns.angleTo(i)/l;return Math.sign(ns[e])===1?h*c:a/(o+a)+c+c*(1-h)}class Wn extends ye{constructor(t=1,e=1,n=1,s=2,r=.1){if(s=s*2+1,r=Math.min(t/2,e/2,n/2,r),super(1,1,1,s,s,s),s===1)return;const o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;const a=new D,l=new D,c=new D(t,e,n).divideScalar(2).subScalar(r),h=this.attributes.position.array,u=this.attributes.normal.array,d=this.attributes.uv.array,p=h.length/6,g=new D,x=.5/s;for(let m=0,f=0;m<h.length;m+=3,f+=2)switch(a.fromArray(h,m),l.copy(a),l.x-=Math.sign(l.x)*x,l.y-=Math.sign(l.y)*x,l.z-=Math.sign(l.z)*x,l.normalize(),h[m+0]=c.x*Math.sign(a.x)+l.x*r,h[m+1]=c.y*Math.sign(a.y)+l.y*r,h[m+2]=c.z*Math.sign(a.z)+l.z*r,u[m+0]=l.x,u[m+1]=l.y,u[m+2]=l.z,Math.floor(m/p)){case 0:g.set(1,0,0),d[f+0]=Je(g,l,"z","y",r,n),d[f+1]=1-Je(g,l,"y","z",r,e);break;case 1:g.set(-1,0,0),d[f+0]=1-Je(g,l,"z","y",r,n),d[f+1]=1-Je(g,l,"y","z",r,e);break;case 2:g.set(0,1,0),d[f+0]=1-Je(g,l,"x","z",r,t),d[f+1]=Je(g,l,"z","x",r,n);break;case 3:g.set(0,-1,0),d[f+0]=1-Je(g,l,"x","z",r,t),d[f+1]=1-Je(g,l,"z","x",r,n);break;case 4:g.set(0,0,1),d[f+0]=1-Je(g,l,"x","y",r,t),d[f+1]=1-Je(g,l,"y","x",r,e);break;case 5:g.set(0,0,-1),d[f+0]=Je(g,l,"x","y",r,t),d[f+1]=1-Je(g,l,"y","x",r,e);break}}}let ti=null;function _0(){if(ti)return ti;const i=new Uint8Array([90,150,210,255]);return ti=new Vu(i,4,1,ma),ti.minFilter=Be,ti.magFilter=Be,ti.needsUpdate=!0,ti}const Jl=new Map;function Bt(i){const t=String(i);let e=Jl.get(t);return e||(e=new Ie({color:i,gradientMap:_0()}),Jl.set(t,e)),e}function v0(){const t=document.createElement("canvas");t.width=t.height=128;const e=t.getContext("2d"),n=e.createRadialGradient(128/2,128/2,6,128/2,128/2,128/2);n.addColorStop(0,"rgba(13,20,55,0.42)"),n.addColorStop(.6,"rgba(13,20,55,0.18)"),n.addColorStop(1,"rgba(13,20,55,0)"),e.fillStyle=n,e.fillRect(0,0,128,128);const s=new Nc(t);return s.colorSpace=Oe,s}function Qc(){const t=document.createElement("canvas");t.width=t.height=256;const e=t.getContext("2d");e.fillStyle="#37b6f6",e.fillRect(0,0,256,256),e.strokeStyle="rgba(255,255,255,0.5)",e.lineWidth=5,e.lineCap="round";for(let s=0;s<6;s++){e.beginPath();const r=20+s*42;for(let o=-20;o<=276;o+=8){const a=r+Math.sin(o/256*Math.PI*3+s*1.7)*7;o===-20?e.moveTo(o,a):e.lineTo(o,a)}e.stroke()}const n=new Nc(t);return n.wrapS=n.wrapT=mr,n.repeat.set(2.2,2.2),n.colorSpace=Oe,n}function te(i,t,e=0,n=0,s=0,r=!0,o=!0){const a=new he(i,t);return a.position.set(e,n,s),a.castShadow=r,a.receiveShadow=o,a}function x0(){const i=new Wn(30,1.4,22,4,.55);return te(i,Bt("#5fc94e"),0,-.72,0,!1,!0)}function La(i,t){const e=new Wn(i,.42,i,3,.12);return te(e,Bt(t),0,.21,0)}function go(i=1,t="#3faf5a",e="#2f9247"){const n=new Ct,s=te(new qt(.22*i,.3*i,1.4*i,8),Bt("#8d5a2b"),0,.7*i,0);n.add(s);const r=[[0,1.85,0,1,t],[-.62,1.45,.12,.72,e],[.6,1.5,-.1,.78,t],[.05,1.4,.55,.6,e]];for(const[o,a,l,c,h]of r)n.add(te(new ee(c*i,14,12),Bt(h),o*i,a*i,l*i));return n}function y0(i=2.2,t=3.4){const e=new Ct,n=9,s=Bt("#b5773f"),r=Bt("#8d5a2b");for(let o=0;o<n;o++){const a=o/(n-1)-.5,l=te(new ye(i,.1,t/n-.045),s);l.position.set(0,Math.cos(a*Math.PI)*.42+.12,a*t),l.rotation.x=-Math.sin(a*Math.PI)*.45,e.add(l)}for(const o of[-1,1]){const a=te(new tn(t*.42,.05,6,20,Math.PI*.72),r,o*(i/2),.34,0);a.rotation.y=Math.PI/2,a.rotation.z=Math.PI*.14,e.add(a);for(const l of[-t/2+.15,0,t/2-.15])e.add(te(new qt(.06,.06,.42,6),r,o*(i/2),.3,l))}return e}function b0(i,t=1.9){const e=new Oc(i),n=Qc(),s=new Ct,r=new Sr(e,40,t/2,10,!1),o=new Ie({map:n,gradientMap:null}),a=new he(r,o);a.scale.y=.12,a.position.y=.06,a.receiveShadow=!0,s.add(a);const l=new he(new Sr(e,40,t/2+.16,10,!1),Bt("#bfeaff"));return l.scale.y=.07,l.position.y=.02,s.add(l),{group:s,texture:n}}function ca(i=3,t=.7){const e=new Ct;for(let n=0;n<i;n++){const s=.22+Math.random()*.2,r=te(new Aa(s,1),Bt(n%2?"#9aa7bd":"#b3bfd2"));r.position.set((Math.random()-.5)*t,s*.55,(Math.random()-.5)*t),r.scale.y=.72,r.rotation.set(Math.random(),Math.random()*Math.PI,Math.random()*.4),e.add(r)}return e}function th(i=1){const t=new Ct,e=["#2f9247","#3faf5a","#37a24e"];[[0,.34,0,.42],[-.3,.26,.08,.3],[.3,.28,-.04,.32],[.02,.3,.3,.26]].forEach(([s,r,o,a],l)=>{t.add(te(new ee(a*i,12,10),Bt(e[l%e.length]),s*i,r*i,o*i))});for(let s=0;s<3;s++)t.add(te(new ee(.06*i,8,6),Bt(["#ff8fc0","#ffd23e","#ffffff"][s]),(Math.random()-.5)*.5*i,(.4+Math.random()*.25)*i,(Math.random()-.5)*.5*i,!1,!1));return t}function eh(i=5,t=1.1){const e=new Ct,n=["#ff8fc0","#ffd23e","#7dd7ff","#c79bff","#ffffff","#ff9f7a"];for(let s=0;s<i;s++){const r=new Ct,o=(Math.random()-.5)*t,a=(Math.random()-.5)*t,l=.26+Math.random()*.16;r.add(te(new qt(.02,.03,l,5),Bt("#2f9247"),0,l/2,0,!1,!1));const c=n[Math.floor(Math.random()*n.length)];for(let h=0;h<5;h++){const u=h/5*Math.PI*2;r.add(te(new ee(.055,8,6),Bt(c),Math.cos(u)*.09,l,Math.sin(u)*.09,!1,!1))}r.add(te(new ee(.05,8,6),Bt("#ffb703"),0,l+.01,0,!1,!1)),r.position.set(o,0,a),e.add(r)}return e}function M0(){const i=new Ct,t=te(new qt(.62,.72,.16,24),Bt("#8b4ddb"),0,.5,0),e=te(new qt(.5,.5,.06,24),Bt("#a06bff"),0,.6,0);i.add(t,e);const n=new Pr,s=5;for(let a=0;a<s*2;a++){const l=a%2===0?.34:.15,c=a/(s*2)*Math.PI*2-Math.PI/2,h=Math.cos(c)*l,u=Math.sin(c)*l;a===0?n.moveTo(h,u):n.lineTo(h,u)}n.closePath();const r=new Ta(n,{depth:.12,bevelEnabled:!0,bevelSize:.03,bevelThickness:.03,bevelSegments:2});r.center();const o=te(r,Bt("#ffd23e"),0,.86,0);return o.rotation.x=-1.05,o.name="goalStar",i.add(o),i}function S0(){const i=new Ct,t=te(new ee(.24,14,12),Bt("#ff4757"),0,.24,0);t.scale.set(1,.92,.94),i.add(t);for(let e=0;e<4;e++){const n=e/4*Math.PI*2,s=te(new hn(.07,.16,5),Bt("#3faf5a"),Math.cos(n)*.09,.44,Math.sin(n)*.09);s.rotation.set(Math.cos(n)*.9,0,-Math.sin(n)*.9),i.add(s)}i.add(te(new qt(.02,.03,.1,5),Bt("#2f9247"),0,.5,0));for(let e=0;e<10;e++){const n=e/10*Math.PI*2,s=.14+e%3*.08,r=.21*Math.cos((s-.24)*1.6);i.add(te(new ee(.018,6,4),Bt("#ffe9a8"),Math.cos(n)*r,s,Math.sin(n)*r,!1,!1))}return i}function nh(i=1){const t=new Ct,e=new Ie({color:"#ffffff",gradientMap:null,transparent:!0,opacity:.96}),n=[[0,0,0,.55],[-.55,-.06,.05,.38],[.55,-.04,-.03,.42],[.1,.22,0,.4]];for(const[s,r,o,a]of n){const l=new he(new ee(a*i,12,10),e);l.position.set(s*i,r*i,o*i),t.add(l)}return t}function w0(){const i=new Ct,t=[[-9,-.4,-10.5,6.5,"#8fdc6f"],[8.5,-.6,-11,7.5,"#a2e57f"],[0,-.9,-13,9,"#b7ec92"]];for(const[s,r,o,a,l]of t){const c=te(new ee(a,20,14),Bt(l),s,r,o,!1,!0);c.scale.y=.42,i.add(c)}const e=new Ct;e.add(te(new ye(1.1,.9,1),Bt("#c79bff"),0,.45,0,!1,!1));const n=te(new hn(.95,.7,4),Bt("#8b4ddb"),0,1.25,0,!1,!1);return n.rotation.y=Math.PI/4,e.add(n),e.position.set(8.6,1.1,-11.2),i.add(e),i}function ih(i=26,t=12){const e=new Float32Array(i*3);for(let o=0;o<i;o++)e[o*3]=(Math.random()-.5)*t,e[o*3+1]=.6+Math.random()*2.6,e[o*3+2]=(Math.random()-.5)*t;const n=new pe;n.setAttribute("position",new He(e,3));const s=new Ss({color:"#fff7c0",size:.14,transparent:!0,opacity:.9,blending:ds,depthWrite:!1,sizeAttenuation:!0}),r=new Rr(n,s);return r.name="sparkles",r}function wr(i="#4a4a68",t=1){const e=new Ct,n=te(new hn(.09*t,.3*t,6),Bt(i),0,0,0,!1,!1);n.rotation.x=Math.PI/2,e.add(n);const s=new Ie({color:i,side:Qe});for(const r of[-1,1]){const o=te(new Cn(.42*t,.16*t),s,r*.22*t,0,0,!1,!1);o.name=r<0?"wl":"wr",e.add(o)}return e}function sh(i,t,e,n,s=0,r=12){i.position.x+=t*n,i.position.x>r&&(i.position.x=-r);const o=i.getObjectByName("wl"),a=i.getObjectByName("wr"),l=Math.sin(e*6+s)*.5;o&&(o.rotation.y=l),a&&(a.rotation.y=-l)}function E0(i=14,t=12){const e=new Ct,n=["#ffd6ec","#fff0f7","#ffe9a8"];for(let s=0;s<i;s++){const r=te(new Ea(.055+Math.random()*.03,6),new Ie({color:n[s%n.length],side:Qe,transparent:!0,opacity:.95}),(Math.random()-.5)*t,.5+Math.random()*3.4,(Math.random()-.5)*t,!1,!1);r.scale.y=.6,r.userData.phase=Math.random()*Math.PI*2,r.userData.fall=.25+Math.random()*.3,e.add(r)}return e.name="petals",e}function T0(i,t,e,n=3.8){for(const s of i.children)s.position.y-=s.userData.fall*t,s.position.x+=Math.sin(e*1.4+s.userData.phase)*t*.5,s.rotation.x=e*2+s.userData.phase,s.rotation.y=e*1.3+s.userData.phase,s.position.y<.1&&(s.position.y=n)}function Kl(i="#ff8f5f",t=1){const e=new Ct,n=te(new ee(.16*t,10,8),Bt(i),0,0,0,!1,!1);n.scale.set(1.4,.9,.7),e.add(n);const s=te(new hn(.09*t,.18*t,4),Bt(i),-.26*t,0,0,!1,!1);return s.rotation.z=-Math.PI/2,s.name="tail",e.add(s),e.add(te(new ee(.03*t,6,4),Bt("#22223a"),.12*t,.04*t,.1*t,!1,!1)),e}function Ql(i=1){const t=new Ct;t.add(te(new Wn(.34*i,.2*i,.34*i,2,.06),Bt("#5b6b8c"),0,0,0,!1,!1));const e=te(new ee(.06*i,8,6),new Ie({color:"#54e6ff",emissive:"#54e6ff",emissiveIntensity:1.4}),0,0,.18*i,!1,!1);t.add(e);const n=te(new tn(.24*i,.03*i,6,18),Bt("#9fb4d8"),0,.14*i,0,!1,!1);return n.rotation.x=Math.PI/2,n.name="rotor",t.add(n),t}function A0(i=24,t=13,e="#c9a0ff"){const n=new Float32Array(i*3);for(let o=0;o<i;o++)n[o*3]=(Math.random()-.5)*t,n[o*3+1]=.3+Math.random()*3,n[o*3+2]=(Math.random()-.5)*t;const s=new pe;s.setAttribute("position",new He(n,3));const r=new Rr(s,new Ss({color:e,size:.2,transparent:!0,opacity:.7,blending:ds,depthWrite:!1,sizeAttenuation:!0}));return r.name="spores",r}const R0=1.6,ir=1.72,Sn=.42;class C0{constructor(t){this.level=t,this.group.name="sparkle-meadow",this.originX=-1.35-(t.cols-1)*ir/2,this.originZ=-.35-(t.rows-1)*ir/2,this.group.add(x0()),this.group.add(w0());for(let f=0;f<t.rows;f++)for(let b=0;b<t.cols;b++){const v=(f+b)%2===0?"#8ee06a":"#7ed95e",_=La(R0,v),P=this.cellToWorld(b,f);_.position.set(P.x,Sn/2,P.z),this.group.add(_)}for(const f of t.blocked){const b=this.cellToWorld(f.col,f.row),v=th(1.05);v.position.set(b.x,Sn,b.z),this.group.add(v)}for(const f of t.items)if(f.kind==="strawberry"){const b=S0(),v=this.cellToWorld(f.col,f.row);b.position.set(v.x,Sn,v.z),this.group.add(b),this.itemNodes.set(f.id,b)}const e=this.level.goals[0];this.goalNode=M0();const n=this.cellToWorld(e.col,e.row);this.goalNode.position.set(n.x,Sn-.42,n.z),this.goalStar=this.goalNode.getObjectByName("goalStar")??null,this.group.add(this.goalNode);const s=[new D(5.2,0,-11),new D(4,0,-5.5),new D(4.6,0,-1),new D(3.8,0,3.5),new D(5,0,8.5)],r=b0(s,1.8);this.waterTex=r.texture,this.group.add(r.group);const o=y0(1.9,3.2);o.position.set(4.15,.02,3.6),o.rotation.y=.35,this.group.add(o);const a=go(1.5,"#3faf5a","#2f9247");a.position.set(-6.4,0,-2.2),this.group.add(a);const l=go(1);l.position.set(-5.4,0,2.4),this.group.add(l);const c=go(1.35,"#45b25e","#2f9247");c.position.set(6.6,0,-3.4),this.group.add(c);const h=ca(3,.9);h.position.set(5.2,0,.8),this.group.add(h);const u=ca(2,.6);u.position.set(2.2,0,6.2),this.group.add(u);const d=new he(new qt(.85,1.05,.5,12),new Ie({color:"#9aa7bd"}));d.position.set(4.45,.25,-.6),d.castShadow=d.receiveShadow=!0,this.group.add(d);const p=[[-5.6,0,4.6,7],[-2.6,0,5.4,5],[.6,0,4.8,4],[-6.8,0,-4.6,5],[6.9,0,2.2,5],[1.8,0,-4.4,4]];for(const[f,b,v,_]of p){const P=eh(_,1.5);P.position.set(f,b,v),this.group.add(P)}const g=[[-7,6.4,-9,1.4],[3.5,7.2,-10,1.8],[8.5,6.1,-7,1.1],[-1.5,7.8,-12,1.5]];for(const[f,b,v,_]of g){const P=nh(_);P.position.set(f,b,v),this.clouds.push(P),this.group.add(P)}this.sparkles=ih(30,13),this.group.add(this.sparkles),this.petals=E0(16,14),this.group.add(this.petals);const x=wr("#5a5f8a",1.1);x.position.set(-6,6.2,-8),this.birds.push(x),this.group.add(x);const m=wr("#8a5f7a",.85);m.position.set(3,7.4,-10),this.birds.push(m),this.group.add(m)}group=new Ct;itemNodes=new Map;goalNode;clouds=[];waterTex=null;sparkles=null;goalStar=null;petals=null;birds=[];originX;originZ;cellToWorld(t,e){return new D(this.originX+t*ir,Sn,this.originZ+e*ir)}mixyLookout(){return new D(4.45,.5,-.6)}update(t,e){this.waterTex&&(this.waterTex.offset.y=e*.12%1);for(let n=0;n<this.clouds.length;n++){const s=this.clouds[n];s.position.x+=t*(.08+n*.02),s.position.x>12&&(s.position.x=-12)}if(this.goalStar&&(this.goalStar.rotation.y=e*1.4,this.goalStar.position.y=.86+Math.sin(e*2.2)*.07),this.sparkles){const n=this.sparkles.material;n.opacity=.55+Math.sin(e*2.6)*.35}this.petals&&T0(this.petals,t,e),this.birds.forEach((n,s)=>{n.position.y+=Math.sin(e*1.2+s*2.4)*t*.25,sh(n,t,e,.55+s*.25,s*1.9)})}}const P0=1.6,Fn=1.72,sr=.42;function Re(i,t,e=0,n=0,s=0,r=!0,o=!0){const a=new he(i,t);return a.position.set(e,n,s),a.castShadow=r,a.receiveShadow=o,a}function _o(i=1){const t=new Ct,e=Re(new qt(.14*i,.22*i,2.2*i,7),Bt("#a06a3b"),0,1.1*i,0);e.rotation.z=.12,t.add(e);const n=new Ct;n.position.set(.26*i,2.2*i,0);for(let s=0;s<6;s++){const r=s/6*Math.PI*2,o=Re(new ee(.62*i,8,6),Bt(s%2?"#3faf5a":"#4fc46a"));o.scale.set(1.35,.22,.5),o.position.set(Math.cos(r)*.62*i,.05,Math.sin(r)*.62*i),o.rotation.y=-r,o.rotation.z=-.28,n.add(o)}for(let s=0;s<3;s++)n.add(Re(new ee(.11*i,8,6),Bt("#8d5a2b"),(s-1)*.18*i,-.14*i,.08*s*i));return t.add(n),t}function L0(){const i=new Ct,t=Bt("#8d5a2b"),e=Bt("#6e421f"),n=Bt("#ffd23e");i.add(Re(new Wn(.95,.55,.62,3,.08),t,0,.28,0));const s=Re(new qt(.31,.31,.95,12,1,!1,0,Math.PI),e,0,.55,0);s.rotation.z=Math.PI/2,i.add(s);for(const r of[-.28,.28])i.add(Re(new ye(.08,.62,.64),n,r,.32,0));return i.add(Re(new Wn(.16,.2,.1,2,.03),n,0,.42,.32)),i}function D0(){const i=new Ct,t=Bt("#f7b8d9"),e=Re(new ee(.26,12,8,0,Math.PI*2,Math.PI/2,Math.PI/2),t,0,.1,0);e.scale.set(1.15,.7,1);const n=Re(new ee(.26,12,8,0,Math.PI*2,0,Math.PI/2),t,0,.12,-.12);return n.scale.set(1.15,.7,1),n.rotation.x=-.9,i.add(e,n),i.add(Re(new ee(.15,14,12),new Ie({color:"#ffffff",gradientMap:null}),0,.2,.02)),i}function I0(){const i=new Ct,t=Re(new Wn(2.2,.7,1,3,.2),Bt("#b5773f"),0,.35,0);t.scale.set(1,1,1),i.add(t),i.add(Re(new qt(.05,.06,1.9,6),Bt("#8d5a2b"),0,1.4,0));const e=new Pr;e.moveTo(0,0),e.lineTo(.85,.55),e.lineTo(0,1.3),e.closePath();const n=Re(new Ra(e),new Ie({color:"#fff6e3",side:Qe}),.06,.9,0,!1,!1);i.add(n);const s=Re(new ye(.28,.16,.02),Bt("#ff5fa2"),.15,2.3,0,!1,!1);return i.add(s),i}class U0{constructor(t){this.level=t,this.group.name="bubble-bay",this.originX=-1.2-(t.cols-1)*Fn/2,this.originZ=-.3-(t.rows-1)*Fn/2,this.waterTex=Qc(),this.waterTex.repeat.set(5,4);const e=new Ie({map:this.waterTex}),n=new he(new Wn(34,1.4,24,4,.55),e);n.position.y=-.78,n.receiveShadow=!0,this.group.add(n);for(let E=0;E<t.rows;E++)for(let C=0;C<t.cols;C++){const S=(E+C)%2===0?"#f7e3a1":"#f2d98c",y=La(P0,S),L=this.cellToWorld(C,E);y.position.set(L.x,sr/2,L.z),this.group.add(y)}const s=this.cellToWorld(0,t.rows-1).z+Fn*.72,r=t.cols+2;for(let E=0;E<r;E++){const C=this.originX-Fn*.75+E*(Fn*(t.cols+.4)/r);this.group.add(Re(new Wn(Fn*.82,.18,.9,2,.05),Bt("#b5773f"),C,.16,s)),this.group.add(Re(new qt(.07,.07,.7,6),Bt("#8d5a2b"),C,-.1,s+.38))}for(const E of t.items)if(E.kind==="pearl"){const C=D0(),S=this.cellToWorld(E.col,E.row);C.position.set(S.x,sr,S.z),this.group.add(C),this.itemNodes.set(E.id,C)}const o=this.level.goals[0];this.goalNode=L0();const a=this.cellToWorld(o.col,o.row);this.goalNode.position.set(a.x,sr,a.z),this.group.add(this.goalNode);const l=_o(1.15);l.position.set(-5.6,0,-1.6),this.group.add(l);const c=_o(.85);c.position.set(-4.6,0,2.6),c.rotation.y=1.2,this.group.add(c);const h=_o(1);h.position.set(6,0,-2.4),h.rotation.y=-.6,this.group.add(h),this.boat=I0(),this.boat.position.set(4.25,-.05,2.55),this.boat.rotation.y=-.5,this.group.add(this.boat);const u=ca(3,1);u.position.set(-4.9,0,4.2),this.group.add(u);const d=eh(4,1.2);d.position.set(4.4,0,-4.2),this.group.add(d);const p=[[-10,-.5,-11,5.5,"#7ed0b8"],[9.5,-.6,-12,6.5,"#8fdcae"],[0,-1,-14,8,"#a7e6c3"]];for(const[E,C,S,y,L]of p){const k=Re(new ee(y,18,12),Bt(L),E,C,S,!1,!0);k.scale.y=.32,this.group.add(k)}const g=[[-7,6.6,-9,1.3],[4.5,7.4,-10,1.7],[9,6.2,-7,1]];for(const[E,C,S,y]of g){const L=nh(y);L.position.set(E,C,S),this.clouds.push(L),this.group.add(L)}const x=40,m=new Float32Array(x*3);this.bubbleSpeeds=new Float32Array(x);for(let E=0;E<x;E++)m[E*3]=(Math.random()-.5)*22,m[E*3+1]=Math.random()*.4,m[E*3+2]=(Math.random()-.5)*16,this.bubbleSpeeds[E]=.25+Math.random()*.5;const f=new pe;f.setAttribute("position",new He(m,3));const b=new Ss({color:"#dff6ff",size:.16,transparent:!0,opacity:.85,depthWrite:!1,sizeAttenuation:!0});this.bubbles=new Rr(f,b),this.group.add(this.bubbles);const v=wr("#f4f7fb",1.35);v.position.set(-8,6.8,-7),this.gulls.push(v),this.group.add(v);const _=wr("#e8edf6",1);_.position.set(2,7.8,-9),this.gulls.push(_),this.group.add(_);const P=Kl("#ff8f5f",1);P.userData={cx:-3.4,cz:4.9,r:1.1,speed:.9,phase:0},this.fish.push(P),this.group.add(P);const A=Kl("#5fc9ff",.8);A.userData={cx:3.2,cz:5.4,r:.85,speed:-1.2,phase:2.1},this.fish.push(A),this.group.add(A)}group=new Ct;itemNodes=new Map;goalNode;waterTex;bubbles;bubbleSpeeds;boat;clouds=[];gulls=[];fish=[];originX;originZ;cellToWorld(t,e){return new D(this.originX+t*Fn,sr,this.originZ+e*Fn)}mixyLookout(){return new D(4.25,.72,2.55)}update(t,e){this.waterTex.offset.x=e*.02%1,this.waterTex.offset.y=e*.03%1,this.boat.position.y=-.05+Math.sin(e*1.1)*.07,this.boat.rotation.z=Math.sin(e*.9)*.03;for(let s=0;s<this.clouds.length;s++){const r=this.clouds[s];r.position.x+=t*(.07+s*.02),r.position.x>13&&(r.position.x=-13)}const n=this.bubbles.geometry.getAttribute("position");for(let s=0;s<n.count;s++){let r=n.getY(s)+this.bubbleSpeeds[s]*t;r>2.6&&(r=0),n.setY(s,r)}n.needsUpdate=!0,this.gulls.forEach((s,r)=>{s.position.y+=Math.sin(e*.9+r*2.8)*t*.3,sh(s,t,e,.9+r*.35,r*1.4,14)});for(const s of this.fish){const r=s.userData,o=e*r.speed+r.phase;s.position.set(r.cx+Math.cos(o)*r.r,-.05+Math.sin(e*2+r.phase)*.03,r.cz+Math.sin(o)*r.r),s.rotation.y=Math.atan2(-Math.cos(o)*r.speed,-Math.sin(o)*r.speed);const a=s.getObjectByName("tail");a&&(a.rotation.y=Math.sin(e*8+r.phase)*.45)}}}const N0=1.6,rr=1.72,is=.42;function Ye(i,t="#000000",e=0){return new Ie({color:i,emissive:t,emissiveIntensity:e})}function qe(i,t,e=!0,n=!0){const s=new he(i,t);return s.castShadow=e,s.receiveShadow=n,s}function F0(){const i=new Ct,t=qe(new qt(.035,.05,.5,6),Ye("#3f9e4d"));t.position.y=.25,i.add(t);const e=qe(new ee(.09,6,4),Ye("#4cc25e"));e.scale.set(1.6,.35,.8),e.position.set(.09,.18,0),e.rotation.z=-.5,i.add(e);const n=new Ct;for(let r=0;r<5;r++){const o=r/5*Math.PI*2,a=qe(new ee(.105,8,6),Ye("#ff8fc7","#ff5fa2",.35));a.scale.set(1,.45,1),a.position.set(Math.cos(o)*.14,0,Math.sin(o)*.14),n.add(a)}n.position.y=.52,i.add(n);const s=qe(new ee(.085,8,6),Ye("#ffe066","#ffd23e",.8));return s.position.y=.55,i.add(s),i}function Da(i=1,t="#b47dff",e="#8a4fff"){const n=new Ct,s=qe(new qt(.11,.15,.3,8),Ye("#efe6f7"));s.position.y=.15,n.add(s);const r=qe(new ee(.26,12,8,0,Math.PI*2,0,Math.PI/2),Ye(t,e,.45));r.position.y=.28,n.add(r);for(let o=0;o<4;o++){const a=o/4*Math.PI*2+.4,l=qe(new ee(.035,6,4),Ye("#f7effc","#ffffff",.5),!1,!1);l.position.set(Math.cos(a)*.15,.4,Math.sin(a)*.15),n.add(l)}return n.scale.setScalar(i),n}function O0(){const i=new Ct,t=qe(new qt(.62,.68,.1,24),Ye("#274a5e","#3ec6d8",.35));t.position.y=.05,i.add(t);const e=qe(new tn(.5,.035,8,32),Ye("#7ff3ff","#54e6ff",1.2),!1,!1);e.rotation.x=-Math.PI/2,e.position.y=.11,e.name="ringGlow",i.add(e);for(let s=0;s<6;s++){const r=s/6*Math.PI*2,o=Da(.42,"#5fc9ff","#3ec6d8");o.position.set(Math.cos(r)*.5,.1,Math.sin(r)*.5),i.add(o)}const n=qe(new Xn(.16),Ye("#fff7ad","#ffd23e",1.4),!1,!1);return n.position.y=.75,n.name="goalStar",i.add(n),i}function tc(i,t){const e=new Ct,n=qe(new qt(.35,.55,2.2,10),Ye("#cfc4e8"));n.position.y=1.1,e.add(n);const s=qe(new ee(1.35,16,10,0,Math.PI*2,0,Math.PI/2.2),Ye(t,t,.25));return s.position.y=2.1,s.scale.set(1.25,.85,1.25),s.name="gmCap",e.add(s),e.scale.setScalar(i),e}class B0{group=new Ct;itemNodes=new Map;fireflies;fireflyBase;glowStars=[];spores=null;sporeSpeeds=new Float32Array(0);giantCaps=[];originX;originZ;constructor(t){this.group.name="pattern-forest",this.originX=-((t.cols-1)*rr)/2,this.originZ=-((t.rows-1)*rr)/2;const e=qe(new qt(16,18,.6,40),Ye("#1d3b4a"),!1,!0);e.position.y=-.3,e.scale.z=.75,this.group.add(e);for(let l=0;l<t.rows;l++)for(let c=0;c<t.cols;c++){const h=(l+c)%2===0,u=La(N0,h?"#3f7d5c":"#37714f");u.material.emissive=new Xt(h?"#123b2a":"#0e3222"),u.material.emissiveIntensity=.5;const d=this.cellToWorld(c,l);u.position.set(d.x,is/2,d.z),this.group.add(u)}for(const l of t.blocked){const c=this.cellToWorld(l.col,l.row),h=th(1.05);h.position.set(c.x,is,c.z),this.group.add(h)}for(const l of t.items){const c=l.kind==="flower"?F0():Da(1),h=this.cellToWorld(l.col,l.row);c.position.set(h.x,is,h.z),this.group.add(c),this.itemNodes.set(l.id,c)}for(const l of t.goals){const c=O0(),h=this.cellToWorld(l.col,l.row);c.position.set(h.x,is,h.z);const u=c.getObjectByName("goalStar");u&&this.glowStars.push(u),this.group.add(c)}const n=[[-6.2,-2.6,1.25,"#7d4fd4"],[6.4,-3.2,1.5,"#4f8fd4"],[-5.6,3.4,.95,"#d44f9e"],[6,3.6,1.1,"#7d4fd4"]];for(const[l,c,h,u]of n){const d=tc(h,u);d.position.set(l,0,c);const p=d.getObjectByName("gmCap");p&&this.giantCaps.push(p),this.group.add(d)}const s=tc(.55,"#d44f9e");s.position.set(4.55,0,-1.4),this.group.add(s);const r=70;this.fireflyBase=new Float32Array(r*3);const o=new Float32Array(r*3);for(let l=0;l<r;l++)this.fireflyBase[l*3]=(Math.random()-.5)*15,this.fireflyBase[l*3+1]=.6+Math.random()*2.6,this.fireflyBase[l*3+2]=(Math.random()-.5)*10;o.set(this.fireflyBase);const a=new pe;a.setAttribute("position",new He(o,3)),this.fireflies=new Rr(a,new Ss({color:"#d6ff7a",size:.14,transparent:!0,opacity:.95,blending:ds,depthWrite:!1})),this.group.add(this.fireflies),this.group.add(ih(24,12)),this.spores=A0(26,14),this.sporeSpeeds=new Float32Array(26);for(let l=0;l<26;l++)this.sporeSpeeds[l]=.12+Math.random()*.22;this.group.add(this.spores)}cellToWorld(t,e){return new D(this.originX+t*rr,is,this.originZ+e*rr)}mixyLookout(){return new D(4.55,1.15,-1.4)}update(t,e){const n=this.fireflies.geometry.getAttribute("position");for(let s=0;s<n.count;s++){const r=this.fireflyBase[s*3],o=this.fireflyBase[s*3+1],a=this.fireflyBase[s*3+2];n.setXYZ(s,r+Math.sin(e*.5+s*1.7)*.5,o+Math.sin(e*.9+s*2.3)*.3,a+Math.cos(e*.4+s)*.5)}n.needsUpdate=!0,this.fireflies.material.opacity=.6+Math.sin(e*2.2)*.3;for(const s of this.glowStars)s.rotation.y+=t*1.6,s.position.y=.75+Math.sin(e*2)*.06;if(this.spores){const s=this.spores.geometry.getAttribute("position");for(let r=0;r<s.count;r++){let o=s.getY(r)+this.sporeSpeeds[r]*t;o>3.8&&(o=.25),s.setY(r,o),s.setX(r,s.getX(r)+Math.sin(e*.8+r)*t*.12)}s.needsUpdate=!0,this.spores.material.opacity=.5+Math.sin(e*1.6)*.25}this.giantCaps.forEach((s,r)=>{const o=1+Math.sin(e*.8+r*1.6)*.035;s.scale.set(1.25*o,.85/o,1.25*o)})}}const ha=1.6,ss=1.72,an=.42;function _e(i,t="#000000",e=0){return new Ie({color:i,emissive:t,emissiveIntensity:e})}function ve(i,t,e=!0,n=!0){const s=new he(i,t);return s.castShadow=e,s.receiveShadow=n,s}function k0(){const i=new Ct,t=ve(new qt(.16,.16,.42,12),_e("#58d68d","#2ecc71",.25));t.position.y=.26,i.add(t);const e=ve(new qt(.165,.165,.1,12),_e("#eafaf1","#b8ffd9",.5),!1,!1);e.position.y=.3,i.add(e);const n=ve(new qt(.06,.06,.08,8),_e("#b8c4d6"));n.position.y=.51,i.add(n);const s=ve(new Xn(.09),_e("#fff7ad","#ffd23e",1.2),!1,!1);return s.position.y=.68,s.name="battBolt",i.add(s),i}function z0(){const i=new Ct,t=ve(new qt(.62,.7,.12,24),_e("#3d4b63"));t.position.y=.06,i.add(t);const e=ve(new tn(.46,.045,8,32),_e("#ffd23e","#ffb700",1),!1,!1);e.rotation.x=-Math.PI/2,e.position.y=.13,i.add(e);const n=ve(new Xn(.18),_e("#fff7ad","#ffd23e",1.4),!1,!1);return n.position.y=.7,n.name="goalStar",i.add(n),i}function G0(i){const t=new Ct,e=ve(new ye(ha,an,ha),_e(i));e.position.y=-an/2,t.add(e);for(const[n,s]of[[-.6,-.6],[.6,-.6],[-.6,.6],[.6,.6]]){const r=ve(new ee(.05,6,4),_e("#5b6b8c"),!1,!1);r.position.set(n,.02,s),t.add(r)}return t}function H0(i,t){const e=new Ct;e.add(ve(new tn(i,i*.28,10,24),_e(t)));for(let s=0;s<8;s++){const r=s/8*Math.PI*2,o=ve(new ye(i*.32,i*.34,i*.3),_e(t));o.position.set(Math.cos(r)*i*1.18,Math.sin(r)*i*1.18,0),o.rotation.z=r,e.add(o)}const n=ve(new qt(i*.3,i*.3,.24,12),_e("#ffd23e","#ffb700",.4));return n.rotation.x=Math.PI/2,e.add(n),e}function V0(){const i=new Ct,t=[[-9,3.2,2.2,-12,"#2b3a55"],[-5.5,4.6,2.6,-13,"#24344e"],[-1.5,3.4,2,-12.5,"#2b3a55"],[2.5,5.2,2.8,-13.5,"#24344e"],[6.5,3.8,2.4,-12.2,"#2b3a55"],[10,4.4,2.4,-13,"#24344e"]];for(const[e,n,s,r,o]of t){const a=ve(new ye(s,n,s),_e(o),!1,!1);a.position.set(e,n/2-.4,r),i.add(a);for(let l=0;l<Math.floor(n);l++)for(let c=0;c<2;c++){if((l*3+c+Math.round(e))%3===0)continue;const h=ve(new Cn(.28,.32),_e("#ffe9a3","#ffd23e",.9),!1,!1);h.position.set(e-s/4+c*(s/2.2),l*.9+.4,r+s/2+.01),i.add(h)}}return i}class W0{group=new Ct;itemNodes=new Map;gears=[];bolts=[];neon=[];drones=[];puffs=[];beaconMat=null;originX;originZ;constructor(t){this.group.name="robot-town",this.originX=-((t.cols-1)*ss)/2,this.originZ=-((t.rows-1)*ss)/2;const e=ve(new qt(16,18,.6,40),_e("#232f47"),!1,!0);e.position.y=-.3,e.scale.z=.75,this.group.add(e),this.group.add(V0());for(let h=0;h<t.rows;h++)for(let u=0;u<t.cols;u++){const d=(h+u)%2===0?"#8fa3c8":"#8298bd",p=G0(d),g=this.cellToWorld(u,h);p.position.set(g.x,an,g.z),this.group.add(p)}for(let h=0;h<t.rows;h++){const u=_e("#54e6ff","#54e6ff",1.1),d=ve(new ye(t.cols*ss+.6,.03,.09),u,!1,!1),p=this.cellToWorld((t.cols-1)/2,h);d.position.set(p.x,an+.02,p.z+ha/2+.12),this.neon.push(u),this.group.add(d)}for(const h of t.blocked){const u=this.cellToWorld(h.col,h.row),d=new Ct;d.add(ve(new qt(.42,.5,.9,14),_e("#5b6b8c")));const p=ve(new tn(.42,.07,8,18),_e("#ff8f5f","#ff6b35",.4));p.rotation.x=Math.PI/2,p.position.y=.45,d.add(p),d.position.set(u.x,an+.45,u.z),this.group.add(d);for(let g=0;g<2;g++){const x=new he(new ee(.16,8,6),new Ie({color:"#dfe9ff",transparent:!0,opacity:0}));x.castShadow=x.receiveShadow=!1,x.userData={ox:u.x,oy:an+.95,oz:u.z,t:g*.5,speed:.32+Math.random()*.14},this.puffs.push(x),this.group.add(x)}}for(const h of t.zipBlocked??[]){const u=this.cellToWorld(h.col,h.row),d=new he(new ee(.72,18,12,0,Math.PI*2,0,Math.PI/2),new Ie({color:"#bfeaff",transparent:!0,opacity:.32,emissive:"#54c6ff",emissiveIntensity:.25}));d.position.set(u.x,an,u.z),this.group.add(d);const p=ve(new tn(.72,.05,8,28),_e("#9fd8ff","#54c6ff",.8),!1,!1);p.rotation.x=-Math.PI/2,p.position.set(u.x,an+.02,u.z),this.group.add(p)}for(const h of t.items)if(h.kind==="battery"){const u=k0(),d=this.cellToWorld(h.col,h.row);u.position.set(d.x,an,d.z);const p=u.getObjectByName("battBolt");p&&this.bolts.push(p),this.group.add(u),this.itemNodes.set(h.id,u)}for(const h of t.goals){const u=z0(),d=this.cellToWorld(h.col,h.row);u.position.set(d.x,an,d.z);const p=u.getObjectByName("goalStar");p&&this.bolts.push(p),this.group.add(u)}const n=[[-6.8,2.6,-5.5,1.1,"#3d5a80"],[7.2,3.4,-6,1.4,"#5b6b8c"],[-7.6,1.4,2.5,.7,"#4a6fa5"]];for(const[h,u,d,p,g]of n){const x=H0(p,g);x.position.set(h,u,d),this.gears.push(x),this.group.add(x)}const s=ve(new ye(1.4,1.1,1.4),_e("#3d4b63"));s.position.set(4.9,.55,-1.8),this.group.add(s);const r=ve(new qt(.03,.03,.9,6),_e("#9fb4d8"));r.position.set(4.9,1.55,-1.8),this.group.add(r);const o=_e("#ff5fa2","#ff5fa2",1.2),a=ve(new ee(.09,8,6),o,!1,!1);a.position.set(4.9,2,-1.8),this.beaconMat=o,this.group.add(a);const l=Ql(1);l.userData={cx:0,cz:0,r:5.6,h:3.4,speed:.42,phase:0},this.drones.push(l),this.group.add(l);const c=Ql(.75);c.userData={cx:.8,cz:-.4,r:4.2,h:2.6,speed:-.55,phase:2.4},this.drones.push(c),this.group.add(c)}cellToWorld(t,e){return new D(this.originX+t*ss,an,this.originZ+e*ss)}mixyLookout(){return new D(4.9,1.15,-1.8)}update(t,e){for(let s=0;s<this.gears.length;s++)this.gears[s].rotation.z+=t*(s%2===0?.5:-.35);for(const s of this.bolts)s.rotation.y+=t*1.8;const n=.75+Math.sin(e*2.4)*.35;for(const s of this.neon)s.emissiveIntensity=n;for(const s of this.drones){const r=s.userData,o=e*r.speed+r.phase;s.position.set(r.cx+Math.cos(o)*r.r,r.h+Math.sin(e*1.5+r.phase)*.16,r.cz+Math.sin(o)*r.r),s.rotation.y=Math.atan2(-Math.cos(o)*r.speed,-Math.sin(o)*r.speed);const a=s.getObjectByName("rotor");a&&(a.rotation.z+=t*18)}for(const s of this.puffs){const r=s.userData;r.t=(r.t+t*r.speed)%1,s.position.set(r.ox+Math.sin(r.t*Math.PI*2)*.08,r.oy+r.t*1.1,r.oz),s.scale.setScalar(.5+r.t*1.4),s.material.opacity=r.t<.15?r.t/.15*.5:.5*(1-r.t)}this.beaconMat&&(this.beaconMat.emissiveIntensity=.7+(Math.sin(e*3.4)>0?.9:.1))}}const ec=1.6,or=1.72,ei=.42;function oe(i,t="#000000",e=0){return new Ie({color:i,emissive:t,emissiveIntensity:e})}function ae(i,t,e=!0,n=!0){const s=new he(i,t);return s.castShadow=e,s.receiveShadow=n,s}function X0(){const i=new Ct,t=ae(new hn(.12,.22,4),oe("#ff5f6b"),!1,!1);t.rotation.z=Math.PI,t.position.y=.1,i.add(t);const e=ae(new qt(.17,.17,.06,20),oe("#ffd23e","#ffb700",.35));e.rotation.x=Math.PI/2,e.position.y=.34,i.add(e);const n=ae(new Xn(.09),oe("#fff7ad","#ffd23e",.9),!1,!1);return n.position.set(0,.34,.05),i.add(n),i}function Y0(){const i=new Ct,t=ae(new qt(.6,.68,.22,24),oe("#4a5fc9"));t.position.y=.11,i.add(t);const e=ae(new tn(.6,.035,8,32),oe("#ffd23e","#ffb700",.7),!1,!1);e.rotation.x=-Math.PI/2,e.position.y=.23,i.add(e);const n=ae(new ee(.2,14,10,0,Math.PI*2,0,Math.PI/1.8),oe("#ffd23e","#ffb700",.45));n.scale.set(1,.9,1),n.rotation.x=Math.PI,n.position.y=.62,i.add(n);const s=ae(new qt(.05,.08,.16,8),oe("#ffb700","#ff9f1c",.3));s.position.y=.5,i.add(s);const r=ae(new qt(.14,.16,.06,12),oe("#b7791f"));r.position.y=.26,i.add(r);for(const a of[-1,1]){const l=ae(new tn(.1,.025,6,14,Math.PI),oe("#ffd23e","#ffb700",.3),!1,!1);l.position.set(a*.2,.66,0),l.rotation.z=a*Math.PI/2,i.add(l)}const o=ae(new Xn(.13),oe("#fff7ad","#ffd23e",1.5),!1,!1);return o.position.y=1.05,o.name="goalStar",i.add(o),i}function q0(){const i=new Ct,t=ae(new ye(11,3.6,1),oe("#f2e3c6"),!1,!1);t.position.set(0,1.8,-8.6),i.add(t);const e=ae(new hn(6.6,1.6,4),oe("#e2725b"),!1,!1);e.rotation.y=Math.PI/4,e.scale.z=.28,e.position.set(0,4.4,-8.6),i.add(e);for(let o=-2;o<=2;o++){const a=ae(new qt(.28,.32,3.4,12),oe("#fbf3e0"),!1,!1);a.position.set(o*2.1,1.7,-8),i.add(a)}const n=ae(new ye(1.6,2.2,.2),oe("#7a4f2b"),!1,!1);n.position.set(0,1.1,-7.95),i.add(n);const s=ae(new ye(3.4,.7,.08),oe("#4a5fc9","#2f3fa0",.25),!1,!1);s.position.set(0,3.1,-7.9),i.add(s);const r=ae(new Xn(.26),oe("#ffd23e","#ffb700",.8),!1,!1);return r.position.set(0,3.1,-7.8),i.add(r),i}function $0(i,t,e){const n=new Ct,s=new pe().setFromPoints([new D(-e/2,i+.3,t),new D(e/2,i+.3,t)]);n.add(new Yu(s,new Uc({color:"#8a5a2b"})));const r=["#ff5f6b","#ffd23e","#4a5fc9","#3ec6d8","#ff8fb0"];for(let o=0;o<9;o++){const a=ae(new hn(.16,.34,4),oe(r[o%r.length]),!1,!1);a.rotation.z=Math.PI,a.position.set(-e/2+(o+.5)*(e/9),i+.12,t),a.name="bunt",n.add(a)}return n}function j0(){const i=new Ct,t=ae(new hn(.34,.8,14),oe("#ff8f3d"));t.position.y=.4,i.add(t);const e=ae(new qt(.2,.24,.12,14),oe("#fff3e0"),!1,!1);e.position.y=.42,i.add(e);const n=ae(new ye(.66,.08,.66),oe("#e2722b"));return n.position.y=.04,i.add(n),i}class Z0{group=new Ct;itemNodes=new Map;goalStars=[];buntFlags=[];birds=new Ct;flags=[];originX;originZ;constructor(t){this.group.name="agent-academy",this.originX=-((t.cols-1)*or)/2,this.originZ=-((t.rows-1)*or)/2;const e=ae(new qt(16,18,.6,40),oe("#7cc25e"),!1,!0);e.position.y=-.3,e.scale.z=.75,this.group.add(e);const n=ae(new Mr(6.9,8.6,40),oe("#e2725b"),!1,!0);n.rotation.x=-Math.PI/2,n.position.y=.02,n.scale.y=.75,this.group.add(n),this.group.add(q0());const s=$0(3,-5.2,12);s.traverse(o=>{o.name==="bunt"&&this.buntFlags.push(o)}),this.group.add(s);for(let o=0;o<t.rows;o++)for(let a=0;a<t.cols;a++){const l=(o+a)%2===0,c=new Ct,h=ae(new ye(ec,ei,ec),oe(l?"#f2e3c6":"#ecd9b6"));h.position.y=-ei/2,c.add(h);const u=ae(new Mr(.42,.5,24),oe("#ffffff","#ffffff",.15),!1,!1);u.rotation.x=-Math.PI/2,u.position.y=.012,c.add(u);const d=this.cellToWorld(a,o);c.position.set(d.x,ei,d.z),this.group.add(c)}for(const o of t.blocked){const a=this.cellToWorld(o.col,o.row),l=j0();l.position.set(a.x,ei,a.z),this.group.add(l)}for(const o of t.items){const a=o.kind==="badge"?X0():Da(1),l=this.cellToWorld(o.col,o.row);a.position.set(l.x,ei,l.z),this.group.add(a),this.itemNodes.set(o.id,a)}for(const o of t.goals){const a=Y0(),l=this.cellToWorld(o.col,o.row);a.position.set(l.x,ei,l.z);const c=a.getObjectByName("goalStar");c&&this.goalStars.push(c),this.group.add(a)}for(const[o,a]of[[-6.4,-2.8],[6.4,-2.8],[-6.4,3.2],[6.4,3.2]]){const l=ae(new qt(.04,.04,1.7,6),oe("#8a5a2b"),!1,!1);l.position.set(o,.85,a),this.group.add(l);const c=ae(new Cn(.55,.34),oe("#4a5fc9","#2f3fa0",.2),!1,!1);c.position.set(o+.28,1.5,a),c.name="cornerFlag",this.flags.push(c),this.group.add(c)}const r=ae(new ye(2.2,.5,1),oe("#e8d5ae"),!1,!1);r.position.set(5.2,.25,-5.6),this.group.add(r);for(let o=0;o<2;o++){const a=new Ct,l=ae(new hn(.09,.3,6),oe("#4a4a68"),!1,!1);l.rotation.x=Math.PI/2,a.add(l);for(const c of[-1,1]){const h=ae(new Cn(.42,.16),oe("#4a4a68"),!1,!1);h.position.x=c*.22,h.name=c<0?"wl":"wr",a.add(h)}a.position.set(o*4-2,5.5+o,-9.5),this.birds.add(a)}this.group.add(this.birds)}cellToWorld(t,e){return new D(this.originX+t*or,ei,this.originZ+e*or)}mixyLookout(){return new D(5.2,.55,-5.6)}update(t,e){for(const n of this.goalStars)n.rotation.y+=t*1.8,n.position.y=1.05+Math.sin(e*2.2)*.07;this.buntFlags.forEach((n,s)=>{n.rotation.y=Math.sin(e*1.8+s*.7)*.35}),this.flags.forEach((n,s)=>{n.rotation.y=Math.sin(e*2.2+s*1.3)*.3}),this.birds.children.forEach((n,s)=>{n.position.x+=t*(.8+s*.3),n.position.x>10&&(n.position.x=-10);const r=n.getObjectByName("wl"),o=n.getObjectByName("wr"),a=Math.sin(e*6+s)*.5;r&&(r.rotation.y=a),o&&(o.rotation.y=-a)})}}const J0={linear:i=>i,out:i=>1-Math.pow(1-i,3),inOut:i=>i<.5?4*i*i*i:1-Math.pow(-2*i+2,3)/2,bounce:i=>i<1/2.75?7.5625*i*i:i<2/2.75?7.5625*(i-=1.5/2.75)*i+.75:i<2.5/2.75?7.5625*(i-=2.25/2.75)*i+.9375:7.5625*(i-=2.625/2.75)*i+.984375,back:i=>1+(1.70158+1)*Math.pow(i-1,3)+1.70158*Math.pow(i-1,2)};class K0{active=[];tween(t,e,n="inOut"){return new Promise(s=>{this.active.push({duration:t,elapsed:0,ease:J0[n],update:e,resolve:s})})}update(t){for(let e=this.active.length-1;e>=0;e--){const n=this.active[e];n.elapsed+=t;const s=Math.min(1,n.elapsed/n.duration);n.update(n.ease(s)),s>=1&&(this.active.splice(e,1),n.resolve())}}clear(){for(const t of this.active)t.resolve();this.active.length=0}}function bn(i){return new Promise(t=>setTimeout(t,i*1e3))}const nc=new Map;function Q0(i){let t=nc.get(i);return t||(t=fetch(i).then(e=>{if(!e.ok)throw new Error(`[CodeBops] Failed to load ${i}`);return e.text()}),nc.set(i,t)),t}async function vs(i,t){const e=await Q0(t);return i.innerHTML=e,i.querySelector("svg")}function Er(i){let t=!0;const e=()=>{t&&(i.classList.add("blink"),window.setTimeout(()=>i.classList.remove("blink"),150),window.setTimeout(e,1800+Math.random()*2600))},n=()=>{if(!t)return;i.classList.remove("look-left","look-right","look-up");const s=["look-left","look-right","look-up",""],r=s[Math.floor(Math.random()*s.length)];r&&i.classList.add(r),window.setTimeout(n,3200+Math.random()*3600)};return window.setTimeout(e,900+Math.random()*1200),window.setTimeout(n,2200),()=>{t=!1}}const t_=new D(0,1,0);class vo{constructor(t,e,n,s){this.opts=t,this.camera=n,this.viewport=s,this.root.name=t.name,this.shadow=new he(new Cn(1.25,1.25),new ba({map:v0(),transparent:!0,depthWrite:!1})),this.shadow.rotation.x=-Math.PI/2,this.shadow.renderOrder=1,this.carryAnchor.position.set(-.4,t.height*.55,.12),this.root.add(this.carryAnchor),this.el=document.createElement("div"),this.el.className=`char-sprite ${t.mixy?"mixy-sprite":"zip-sprite"}${t.extraClass?` ${t.extraClass}`:""}`,this.el.setAttribute("aria-hidden","true"),e.appendChild(this.el),this.ready=vs(this.el,t.svgUrl).then(r=>{this.svg=r})}root=new Ct;carryAnchor=new Se;tweener=new K0;el;shadow;svg=null;bobPhase=Math.random()*Math.PI*2;calm=!1;blinkClock=1.2+Math.random()*2.2;lookClock=5+Math.random()*4;ready;whenReady(){return this.ready}addToScene(t){t.add(this.root),t.add(this.shadow)}setCalm(t){this.calm=t,this.el.classList.toggle("calm",t)}placeAt(t){this.root.position.copy(t),this.syncShadow()}syncShadow(){this.shadow.position.set(this.root.position.x,.44,this.root.position.z)}setMood(t){const e=this.svg;e&&(e.classList.toggle("excited",t==="excited"),e.classList.toggle("surprised",t==="surprised"),e.classList.toggle("thinking",t==="thinking"),e.classList.toggle("mouth-smile-on",t==="happy"),this.el.classList.toggle("mood-thinking",t==="thinking"),this.el.classList.toggle("mood-happy",t==="happy"))}look(t){const e=this.svg;e&&(e.classList.toggle("look-left",t==="left"),e.classList.toggle("look-right",t==="right"),e.classList.toggle("look-up",t==="up"))}wave(t=3){!this.svg||this.calm||(this.el.classList.remove("waving"),this.el.offsetWidth,this.el.style.setProperty("--wave-count",String(t)),this.el.classList.add("waving"),window.setTimeout(()=>this.el.classList.remove("waving"),t*560+100))}async hopTo(t,e=.34){const n=this.root.position.clone(),s=this.calm?.06:.4;this.el.classList.add("hop"),await this.tweener.tween(e,r=>{this.root.position.lerpVectors(n,t,r),this.root.position.y=mu.lerp(n.y,t.y,r)+Math.sin(r*Math.PI)*s,this.syncShadow()},"inOut"),this.el.classList.remove("hop")}async bumpShake(){this.flashMood("surprised",900),this.el.classList.add("bump"),await new Promise(t=>setTimeout(t,320)),this.el.classList.remove("bump")}async turnWiggle(){this.calm||(this.el.classList.add("turn"),await new Promise(t=>setTimeout(t,300)),this.el.classList.remove("turn"))}async celebrate(){this.setMood("excited"),this.wave(3),this.el.classList.add("celebrate"),await new Promise(t=>setTimeout(t,this.calm?400:1600)),this.el.classList.remove("celebrate")}async glitchWobble(t=.8){this.el.classList.add("glitching"),await new Promise(e=>setTimeout(e,t*1e3)),this.el.classList.remove("glitching")}moodTimer=0;flashMood(t,e){this.setMood(t),window.clearTimeout(this.moodTimer),this.moodTimer=window.setTimeout(()=>this.setMood("idle"),e)}blink(){const t=this.svg;!t||this.calm||(t.classList.add("blink"),window.setTimeout(()=>t.classList.remove("blink"),150))}update(t,e){if(this.tweener.update(t),this.blinkClock-=t,this.blinkClock<=0&&(this.blink(),this.blinkClock=2.2+Math.random()*2.6),this.lookClock-=t,this.lookClock<=0){const p=["left","right",null,"up"];this.look(p[Math.floor(Math.random()*p.length)]),this.lookClock=4+Math.random()*5}if(!this.svg)return;const n=this.viewport.clientWidth,s=this.viewport.clientHeight;if(n===0||s===0)return;const r=this.root.position.clone().project(this.camera),o=this.root.position.clone().add(t_).project(this.camera);if(r.z>1){this.el.style.visibility="hidden";return}this.el.style.visibility="visible";const a=(r.x*.5+.5)*n,l=(-r.y*.5+.5)*s,c=(-o.y*.5+.5)*s,u=Math.max(1,Math.abs(l-c))*this.opts.height;this.el.style.height=`${u.toFixed(1)}px`;const d=this.calm?0:Math.sin(e*2.4+this.bobPhase)*u*.022;this.el.style.transform=`translate(${a.toFixed(1)}px, ${(l+d).toFixed(1)}px) translate(-50%, -100%)`}dispose(){this.tweener.clear(),window.clearTimeout(this.moodTimer),this.el.remove(),this.shadow.geometry.dispose(),this.shadow.material.dispose(),this.root.removeFromParent(),this.shadow.removeFromParent()}}const Tr=["N","E","S","W"];function e_(i){switch(i){case"N":return{dc:0,dr:-1};case"E":return{dc:1,dr:0};case"S":return{dc:0,dr:1};case"W":return{dc:-1,dr:0}}}function n_(i){const t=Tr.indexOf(i);return Tr[(t+3)%4]}function i_(i){const t=Tr.indexOf(i);return Tr[(t+1)%4]}function ze(i){return`${i.col},${i.row}`}function pr(i,t){return i.col===t.col&&i.row===t.row}function si(i,t,e){return i.col>=0&&i.col<t&&i.row>=0&&i.row<e}const ar=80,s_=12,r_={ifFlower:"flower",ifMushroom:"mushroom"};function o_(i){const t={};for(const n of i.items)t[n.id]={col:n.col,row:n.row};const e=[{...i.start}];return i.botStart&&e.push({...i.botStart}),{cols:i.cols,rows:i.rows,blocked:new Set(i.blocked.map(ze)),zipBlocked:new Set((i.zipBlocked??[]).map(ze)),actors:e,active:0,items:t,goals:i.goals}}function a_(i,t,e=!1){return i.goals.every(s=>{let r=!1;for(const[o,a]of Object.entries(i.items)){if(typeof a!="object")continue;const l="delivered"in a?a.delivered:a;if(pr(l,s)&&(t(o)===s.accepts&&"delivered"in a&&(r=!0),t(o)!==s.accepts))return!1}return r})?e?Object.entries(i.items).every(([s,r])=>i.goals.some(a=>a.accepts===t(s))?typeof r=="object"&&"delivered"in r:!0):!0:!1}function rh(i,t,e=null){const n=o_(i),s=[],r=[];let o=0,a=!1,l=!1;const c=b=>i.items.find(v=>v.id===b)?.kind??b,h=b=>n.goals.find(v=>v.col===b.col&&v.row===b.row),u=()=>r.push({actors:n.actors.map(b=>({...b}))}),d=b=>{const v=n.actors[n.active],{dc:_,dr:P}=e_(b),A={col:v.col+_,row:v.row+P},E={col:v.col,row:v.row},C=n.active===0&&n.zipBlocked.has(ze(A));return!si(A,n.cols,n.rows)||n.blocked.has(ze(A))||C?{type:"bump",actor:n.active,at:A,dir:b}:(v.col=A.col,v.row=A.row,{type:"move",actor:n.active,from:E,to:A,dir:b})},p=(b,v,_)=>{if(o>=ar)return null;o++;const P=r_[b];if(P){const E=n.actors[n.active],C=Object.entries(n.items).some(([S,y])=>typeof y=="object"&&!("delivered"in y)&&!("carriedBy"in y)&&pr(y,E)&&c(S)===P);return s.push({type:"condition",index:v,kind:P,ok:C}),l=!C,u(),null}if(s.push({type:"commandStart",index:v,command:b,..._?{iter:_}:{}}),l)return l=!1,s.push({type:"condSkip",index:v,command:b}),u(),null;let A=null;switch(b){case"move":A=d(n.actors[n.active].dir);break;case"moveUp":A=d("N");break;case"moveDown":A=d("S");break;case"moveLeft":A=d("W");break;case"moveRight":A=d("E");break;case"turnLeft":case"turnRight":{const E=n.actors[n.active],C=b==="turnLeft"?n_(E.dir):i_(E.dir);A={type:"turn",actor:n.active,from:E.dir,to:C},E.dir=C;break}case"swap":{if(n.actors.length>1){const E=n.active;n.active=(n.active+1)%n.actors.length,A={type:"swap",from:E,to:n.active}}break}case"grab":{const E=n.actors[n.active],C={col:E.col,row:E.row},S=Object.entries(n.items).find(([,y])=>typeof y=="object"&&!("delivered"in y)&&!("carriedBy"in y)&&pr(y,C));S?(n.items[S[0]]={carriedBy:n.active},A={type:"grab",actor:n.active,item:S[0],at:C}):A={type:"grabFail",actor:n.active,at:C};break}case"drop":{const E=n.actors[n.active],C={col:E.col,row:E.row},S=Object.entries(n.items).filter(([,y])=>typeof y=="object"&&"carriedBy"in y&&y.carriedBy===n.active);if(S.length===0)A={type:"dropFail",actor:n.active,at:C};else{for(const[y]of S){const L=h(C),k=!!L&&L.accepts===c(y);n.items[y]=k?{delivered:{...C}}:{...C},s.push({type:"drop",actor:n.active,item:y,at:C,onGoal:k})}A=null}break}}if(A&&s.push(A),A&&A.type==="move"&&e){const E=n.actors[n.active],C=Object.entries(n.items).find(([S,y])=>typeof y=="object"&&!("delivered"in y)&&!("carriedBy"in y)&&pr(y,E)&&c(S)===e.trigger);C&&(s.push({type:"ruleFire",actor:n.active,trigger:e.trigger,action:e.action}),n.items[C[0]]={carriedBy:n.active},s.push({type:"grab",actor:n.active,item:C[0],at:{col:E.col,row:E.row}}))}return u(),A},g=b=>{const v=[];for(let _=b-1;_>=0;_--){const P=t[_];if(P.cmd==="repeat"||P.cmd==="repeatUntil")break;v.unshift({cmd:P.cmd,source:_})}return v},x=new Set;for(let b=0;b<t.length;b++){const v=t[b];if(v.cmd==="repeat"||v.cmd==="repeatUntil")for(const _ of g(b))x.add(_.source)}const m=b=>{for(const _ of b)if(_&&(_.type==="bump"||_.type==="grab"||_.type==="drop"&&_.onGoal))return!0;const v=n.actors[n.active];return n.goals.some(_=>_.col===v.col&&_.row===v.row)};for(let b=0;b<t.length&&!(o>=ar);b++){if(x.has(b))continue;const v=t[b];if(v.cmd==="repeat"){const _=g(b);if(_.length===0){s.push({type:"loopFail",index:b,reason:"nothing"});continue}const P=Math.min(4,Math.max(2,v.arg??2));s.push({type:"loopStart",index:b,kind:"count",count:P});for(let A=1;A<=P&&o<ar;A++){s.push({type:"loopIter",index:b,iter:A,count:P});for(const E of _)p(E.cmd,E.source,{k:A,n:P})}s.push({type:"loopEnd",index:b});continue}if(v.cmd==="repeatUntil"){const _=g(b);if(_.length===0){s.push({type:"loopFail",index:b,reason:"nothing"});continue}s.push({type:"loopStart",index:b,kind:"until"});let P=0;for(;;){if(P++,P>s_||o>=ar){s.push({type:"loopOverflow",index:b}),a=!0;break}s.push({type:"loopIter",index:b,iter:P});const A=_.map(E=>p(E.cmd,E.source,{k:P,n:"∞"}));if(m(A))break}s.push({type:"loopEnd",index:b});continue}p(v.cmd,b)}const f=a_(n,c,i.collectAll===!0);return s.push({type:"done",success:f}),{events:s,finalState:n,success:f,actorTrail:r,overflowed:a}}function l_(i,t){const{events:e}=rh(i,t),n=[],s=new Set(i.goals.map(ze));for(const r of e)r.type==="move"&&n.push({cell:r.to,kind:s.has(ze(r.to))?"goal":"visit"}),r.type==="bump"&&n.push({cell:r.at,kind:"bump"});return n}class c_{constructor(t,e,n){this.world=e,this.level=n,this.group.name="path-preview",t.add(this.group)}group=new Ct;update(t){if(this.group.clear(),t.length===0)return;const e=l_(this.level,t),n=new ee(.11,10,8);for(const s of e){const r=s.kind==="goal"?"#ffd23e":s.kind==="bump"?"#ff8a8a":"#ffffff",o=new he(n,Bt(r)),a=this.world.cellToWorld(s.cell.col,s.cell.row);o.position.set(a.x,Sn+.08,a.z),this.group.add(o)}}clear(){this.group.clear()}}class h_{root;starNodes=[];constructor(t,e,n){this.root=I("header","top-bar",t);const s=I("button","circle-btn",this.root,"←");s.setAttribute("aria-label","Back to title"),s.addEventListener("click",n.onBack),ac(this.root,"logo-chip"),I("div","top-bar-spacer",this.root);const r=I("div","title-pill",this.root);I("span","dot",r);const o=e.indexOf(" · ");o>0?(I("span","t-world",r,`${e.slice(0,o)} · `),I("span","t-text",r,e.slice(o+3))):I("span","t-text",r,e),I("div","top-bar-spacer",this.root);const a=I("div","stars-pill",this.root);a.setAttribute("aria-label","Stars earned");for(let c=0;c<3;c++){const h=I("span","star",a,"★");this.starNodes.push(h)}const l=I("button","circle-btn blue",this.root,"⚙️");l.setAttribute("aria-label","Settings"),l.addEventListener("click",n.onSettings)}setStars(t){this.starNodes.forEach((e,n)=>e.classList.toggle("earned",n<t))}}class u_{root;constructor(t,e,n){this.root=I("aside","goal-card",t),this.root.setAttribute("aria-label",`Goal: ${e}`),I("div","goal-flag",this.root,"GOAL");const s=I("div","goal-visual",this.root);I("span",void 0,s,n),I("span","arrow",s,"➜");const r=I("img",void 0,s);r.src="./art/characters/zip/zip.svg",r.alt="Zip",I("p","goal-text",this.root,e)}}const d_={moveUp:{id:"moveUp",label:"Move Up",shortLabel:"Up",icon:"⬆️",spoken:"Step one tile up"},moveDown:{id:"moveDown",label:"Move Down",shortLabel:"Down",icon:"⬇️",spoken:"Step one tile down"},moveLeft:{id:"moveLeft",label:"Move Left",shortLabel:"Left",icon:"⬅️",spoken:"Step one tile to the left"},moveRight:{id:"moveRight",label:"Move Right",shortLabel:"Right",icon:"➡️",spoken:"Step one tile to the right"},grab:{id:"grab",label:"Grab",shortLabel:"Grab",icon:"✋",spoken:"Grab what is here"},drop:{id:"drop",label:"Drop",shortLabel:"Drop",icon:"🫳",spoken:"Drop what you carry"},repeat:{id:"repeat",label:"Repeat",shortLabel:"×2",icon:"↻",spoken:"Repeat the commands above"},repeatUntil:{id:"repeatUntil",label:"Until",shortLabel:"Until",icon:"🔁",spoken:"Repeat until you get there"},ifFlower:{id:"ifFlower",label:"If Flower",shortLabel:"If 🌸",icon:"🌸",spoken:"If you see a flower, do the next tile"},ifMushroom:{id:"ifMushroom",label:"If Mushroom",shortLabel:"If 🍄",icon:"🍄",spoken:"If you see a mushroom, do the next tile"},swap:{id:"swap",label:"Swap Bot",shortLabel:"Swap",icon:"👥",spoken:"Switch which bot follows the plan"},move:{id:"move",label:"Move",shortLabel:"Move",icon:"⬆️",spoken:"Move forward one step"},turnRight:{id:"turnRight",label:"Turn Right",shortLabel:"Turn",icon:"↱",spoken:"Turn right"},turnLeft:{id:"turnLeft",label:"Turn Left",shortLabel:"Turn",icon:"↰",spoken:"Turn left"}};class f_{constructor(t,e,n,s,r){this.maxSlots=n,this.events=s,this.sfx=r,this.root=I("div","bottom-deck",t);const o=I("div","deck-panel",this.root),a=I("div","deck-tray",o);for(const p of e)a.appendChild(this.makeTile(p,"tray",-1));I("div","deck-divider",o);const l=I("div","deck-sequence",o);l.setAttribute("aria-label","Your program");for(let p=0;p<n;p++){const g=I("div","slot",l);g.dataset.index=String(p),this.slotNodes.push(g)}const c=I("div","bop-wrap",this.root);this.bopBtn=I("button","bop-btn",c),this.bopBtn.type="button",this.bopBtn.setAttribute("aria-label","BOP! Run the program"),this.bopBtn.append("BOP!"),I("span","tri",this.bopBtn),this.bopBtn.addEventListener("click",()=>{this.program.length===0||this.running||(this.sfx.play("bop"),this.events.onBop())}),this.refreshBopState();const h=I("div","deck-tools",this.root),u=I("button","mini-btn purple",h,"↩ Rewind");u.type="button",u.setAttribute("aria-label","Rewind Zip to the start, keep the plan"),u.addEventListener("click",()=>{this.running||(this.sfx.play("remove"),this.events.onRewind())});const d=I("button","mini-btn",h,"✕ Clear");d.type="button",d.setAttribute("aria-label","Clear the plan"),d.addEventListener("click",()=>{this.running||this.program.length===0||(this.sfx.play("remove"),this.program=[],this.renderSlots(),this.emitChange())}),this.renderSlots()}root;program=[];slotNodes=[];bopBtn;drag=null;running=!1;lastPlaced=-1;lastPointerTap=0;loopBubble=null;condBubble=null;getProgram(){return this.program.map(t=>({...t}))}setProgram(t){this.program=t.slice(0,this.maxSlots).map(e=>({...e})),this.lastPlaced=-1,this.renderSlots(),this.emitChange()}refreshBopState(){const t=this.program.length>0&&!this.running;this.bopBtn?.classList.toggle("ready",t),this.bopBtn?.classList.toggle("empty",this.program.length===0)}setRunning(t){this.running=t,this.bopBtn.disabled=t,this.refreshBopState(),t||(this.clearRunningHighlight(),this.clearLoopBubble(),this.clearCondBubble())}highlightSlot(t,e){this.slotNodes.forEach((n,s)=>n.classList.toggle("running",s===t)),this.clearCondBubble(),e&&this.showLoopBubble(t,e.k,e.n)}markLoopSource(t){this.slotNodes.forEach((e,n)=>e.classList.toggle("loop-src",t.includes(n)))}clearRunningHighlight(){this.slotNodes.forEach(t=>t.classList.remove("running","loop-src"))}showLoopBubble(t,e,n){this.clearLoopBubble();const s=this.slotNodes[t];s&&(this.loopBubble=I("div","loop-bubble",s,n==="∞"?`loop ${e}…`:`${e} of ${n}`))}clearLoopBubble(){this.loopBubble?.remove(),this.loopBubble=null}showCondBubble(t,e,n){this.clearCondBubble();const s=this.slotNodes[t];s&&(this.condBubble=I("div",`loop-bubble cond-bubble ${n?"ok":"no"}`,s,`${e} ${n?"✓":"✗"}`))}clearCondBubble(){this.condBubble?.remove(),this.condBubble=null}flashSkipped(t){const e=this.slotNodes[t];e&&(e.classList.add("skipped"),window.setTimeout(()=>e.classList.remove("skipped"),650))}makeTile(t,e,n){const s=d_[t],r=I("button","tile");if(r.type="button",r.dataset.cmd=t,r.setAttribute("aria-label",e==="tray"?`Add command: ${s.spoken}`:`Step ${n+1}: ${s.spoken}. Tap to remove.`),I("span","ico",r,s.icon),I("span","lbl",r,s.label),t==="repeat"&&e==="slot"){const o=this.program[n],a=I("span","count-badge",r,`×${o?.arg??2}`);a.setAttribute("role","button"),a.setAttribute("aria-label","Change repeat count");const l=c=>{if(c.stopPropagation(),this.running)return;const h=this.program[n];if(!h||h.cmd!=="repeat")return;const u=(h.arg??2)>=4?2:(h.arg??2)+1;this.program[n]={cmd:"repeat",arg:u},a.textContent=`×${u}`,this.sfx.play("tap"),this.emitChange()};a.addEventListener("pointerdown",c=>c.stopPropagation()),a.addEventListener("click",l)}return r.addEventListener("pointerdown",o=>this.onPointerDown(o,t,e,n,r)),r.addEventListener("click",()=>{Date.now()-this.lastPointerTap<450||(e==="tray"?this.addCommand(t):this.removeAt(n))}),r.addEventListener("keydown",o=>{(o.key==="Enter"||o.key===" ")&&(o.preventDefault(),e==="tray"?this.addCommand(t):this.removeAt(n))}),r}renderSlots(){this.slotNodes.forEach((t,e)=>{t.innerHTML="",t.classList.remove("filled","drop-hint");const n=this.program[e];if(n!==void 0){t.classList.add("filled"),I("span","num",t,String(e+1));const s=this.makeTile(n.cmd,"slot",e);e===this.lastPlaced&&s.classList.add("fresh"),t.appendChild(s)}}),this.refreshBopState()}emitChange(){this.events.onProgramChange(this.getProgram())}addCommand(t){this.running||this.program.length>=this.maxSlots||(this.program.push(t==="repeat"?{cmd:t,arg:2}:{cmd:t}),this.lastPlaced=this.program.length-1,this.sfx.play("place"),this.renderSlots(),this.emitChange())}removeAt(t){this.running||t<0||t>=this.program.length||(this.program.splice(t,1),this.lastPlaced=-1,this.sfx.play("remove"),this.renderSlots(),this.emitChange())}insertAt(t,e){if(this.program.length>=this.maxSlots)return;const n=Math.min(e,this.program.length);this.program.splice(n,0,t==="repeat"?{cmd:t,arg:2}:{cmd:t}),this.lastPlaced=n,this.sfx.play("place"),this.renderSlots(),this.emitChange()}onPointerDown(t,e,n,s,r){if(this.running)return;t.preventDefault();const o=r.cloneNode(!0);o.className="tile drag-ghost",o.dataset.cmd=e,document.body.appendChild(o),this.positionGhost(o,t.clientX,t.clientY),this.drag={pointerId:t.pointerId,kind:n,command:e,fromIndex:s,ghost:o,moved:!1,startX:t.clientX,startY:t.clientY},r.setPointerCapture(t.pointerId),r.addEventListener("pointermove",this.onPointerMove),r.addEventListener("pointerup",this.onPointerUp,{once:!0}),r.addEventListener("pointercancel",this.onPointerCancel,{once:!0})}positionGhost(t,e,n){t.style.left=`${e}px`,t.style.top=`${n}px`}onPointerMove=t=>{const e=this.drag;if(!e||t.pointerId!==e.pointerId)return;Math.hypot(t.clientX-e.startX,t.clientY-e.startY)>8&&(e.moved=!0),this.positionGhost(e.ghost,t.clientX,t.clientY);const s=this.slotAtPoint(t.clientX,t.clientY);this.slotNodes.forEach((r,o)=>r.classList.toggle("drop-hint",o===s&&e.moved))};onPointerUp=t=>{const e=this.drag;if(!e||t.pointerId!==e.pointerId)return;if(t.target.removeEventListener("pointermove",this.onPointerMove),this.endDrag(),!e.moved){this.lastPointerTap=Date.now(),e.kind==="tray"?this.addCommand(e.command):this.removeAt(e.fromIndex);return}const s=this.slotAtPoint(t.clientX,t.clientY);if(s!==-1){if(e.kind==="tray")this.insertAt(e.command,s);else if(s!==e.fromIndex){const r=this.program[e.fromIndex];this.program.splice(e.fromIndex,1);const o=s>e.fromIndex?s-1:s;this.program.splice(Math.min(o,this.program.length),0,r),this.sfx.play("place"),this.renderSlots(),this.emitChange()}}};onPointerCancel=t=>{this.drag&&t.pointerId===this.drag.pointerId&&(t.target.removeEventListener("pointermove",this.onPointerMove),this.endDrag())};endDrag(){this.drag&&(this.drag.ghost.remove(),this.drag=null,this.slotNodes.forEach(t=>t.classList.remove("drop-hint")))}slotAtPoint(t,e){let n=-1,s=1/0;return this.slotNodes.forEach((r,o)=>{const a=r.getBoundingClientRect(),l=a.left+a.width/2,c=a.top+a.height/2,h=Math.hypot(t-l,e-c);h<a.width*.95&&h<s&&(n=o,s=h)}),n}}function ji(i){return I("div","dialog-scrim",i)}function di(i,t){i.remove(),t instanceof HTMLElement&&t.focus()}function p_(i,t,e){return new Promise(n=>{const s=document.activeElement,r=ji(i),o=I("div","dialog",r);o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),o.setAttribute("aria-label",t.brief.title),I("div","intro-emoji",o,t.brief.emoji),I("h2",void 0,o,t.brief.title),I("p",void 0,o,t.brief.text);const a=I("button","mini-btn",o,"🚀 Let's go!");a.addEventListener("click",()=>{e.play("bop"),di(r,s),n()}),a.focus()})}function m_(i,t,e){const n=document.activeElement,s=ji(i),r=I("div","dialog",s);r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.setAttribute("aria-label","Forever Fred found a loop that never stops!");const o=I("div","goal-visual",r),a=I("img",void 0,o);a.src="./art/characters/mixy/mixy.svg",a.alt="Forever Fred the GlitchBop",a.style.height="84px",a.style.filter="hue-rotate(130deg) saturate(1.2)",I("h2",void 0,r,"Whoa — Forever Fred!"),I("p",void 0,r,"That loop has no way to stop, so it spun around forever! Every Until loop needs a stopping condition — a bump, a grab, or reaching the goal.");const l=I("div","dialog-actions",r),c=I("button","mini-btn",l,"🛠 Fix My Loop");c.addEventListener("click",()=>{t.play("tap"),di(s,n),e()}),c.focus()}function g_(i,t,e){return new Promise(n=>{const s=document.activeElement,r=ji(i),o=I("div","dialog",r);o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),o.setAttribute("aria-label",t.prediction.prompt),I("h2",void 0,o,"🔮 Make a Prediction!"),I("p",void 0,o,t.prediction.prompt);const a=I("div","dialog-choices",o);let l=!1;for(const c of t.prediction.choices){const h=I("button","choice-card",a);I("span","big",h,c.emoji),I("span",void 0,h,c.label),h.addEventListener("click",()=>{l||(l=!0,e.play("tap"),di(r,s),n({predictedSuccess:c.correct}))})}a.querySelector("button")?.focus()})}function __(i,t,e,n){const s=document.activeElement,r=ji(i),o=I("div","dialog",r);o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),o.setAttribute("aria-label","Level complete!"),I("h2",void 0,o,"🎉 You did it!");const a=I("div","cele-stars",o),l=[];for(let p=0;p<3;p++)l.push(I("span","star",a,"★"));const c=I("div","cele-name",o,"");I("p",void 0,o,t.predictedCorrectly===!0?"And your prediction was right — super thinking!":"Zip followed YOUR plan perfectly!");const h=I("div","dialog-actions",o),u=I("button","mini-btn purple",h,"↩ Play Again"),d=I("button","mini-btn",h,"➜ Keep Going");u.addEventListener("click",()=>{e.play("tap"),di(r,s),n.onReplay()}),d.addEventListener("click",()=>{e.play("tap"),di(r,s),n.onContinue()}),d.focus(),t.starNames.forEach((p,g)=>{setTimeout(()=>{l[g]?.classList.add("pop"),c.textContent=`⭐ ${p}`,e.play("star")},300+g*450)}),v_(i)}function v_(i){const t=["#ff5fa2","#ffd23e","#3ed35f","#38b6ff","#a06bff","#ff9f2e","#5ee8c7"];for(let e=0;e<70;e++){const n=I("div","confetti",i),s=8+Math.random()*10;n.style.width=`${s}px`,n.style.height=`${s*(.5+Math.random())}px`,n.style.left=`${Math.random()*100}%`,n.style.background=t[e%t.length],n.style.animationDuration=`${1.8+Math.random()*1.8}s`,n.style.animationDelay=`${Math.random()*.6}s`,setTimeout(()=>n.remove(),4500)}}function x_(i,t,e,n){const s=document.activeElement,r=ji(i),o=I("div","dialog",r);o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),o.setAttribute("aria-label","Mixy found a glitch! Inspect your plan step by step.");const a=I("div","goal-visual",o),l=I("img",void 0,a);l.src="./art/characters/mixy/mixy.svg",l.alt="Mixy the GlitchBop",l.style.height="84px",I("h2",void 0,o,"Oops — Mixy found a glitch!"),I("p",void 0,o,"No worries! Tap the steps to see what happened, fix your plan, and BOP again!");const c=I("div","replay-strip",o),h=y_(t),u=[];h.forEach((g,x)=>{const m=I("button","replay-chip",c);m.setAttribute("aria-label",`Step ${x+1}: ${g.label}`),I("span","ico",m,g.icon),m.addEventListener("click",()=>{e.play("tap"),u.forEach(f=>f.classList.remove("active")),m.classList.add("active"),n.onScrub(x)}),u.push(m)});const d=I("div","dialog-actions",o),p=I("button","mini-btn",d,"🛠 Fix My Plan");p.addEventListener("click",()=>{e.play("tap"),di(r,s),n.onTryAgain()}),p.focus()}function y_(i){const t=[];for(const e of i)switch(e.type){case"move":t.push({icon:"⬆️",label:"Move"});break;case"bump":t.push({icon:"💥",label:"Bump! Something was in the way"});break;case"turn":t.push({icon:"↱",label:"Turn"});break;case"grab":t.push({icon:"🍓",label:"Grabbed the strawberry"});break;case"grabFail":t.push({icon:"✋",label:"Nothing to grab here"});break;case"drop":t.push({icon:e.onGoal?"⭐":"⬇️",label:e.onGoal?"Delivered!":"Dropped it"});break;case"dropFail":t.push({icon:"🤲",label:"Nothing to drop"});break}return t}function b_(i,t,e,n){const s=document.activeElement,r=ji(i),o=I("div","dialog",r);o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),o.setAttribute("aria-label","Settings"),I("h2",void 0,o,"⚙️ Settings");const a=I("div","settings-list",o),l=[{key:"sound",label:"🔊 Sound effects"},{key:"calmMode",label:"🍃 Calm mode (softer motion)"},{key:"highContrast",label:"🌗 High contrast"}];for(const u of l){const d=I("div","setting-row",a);I("span",void 0,d,u.label);const p=I("button","toggle",d);p.setAttribute("role","switch"),p.setAttribute("aria-label",u.label),p.setAttribute("aria-pressed",String(t.settings[u.key])),p.addEventListener("click",()=>{const g=!t.settings[u.key];t.updateSettings({[u.key]:g}),p.setAttribute("aria-pressed",String(g)),e.play("tap"),n()})}const c=I("div","dialog-actions",o),h=I("button","mini-btn",c,"✓ Done");h.addEventListener("click",()=>{e.play("tap"),di(r,s)}),h.focus()}let ic=0;function un(i,t){i.querySelectorAll(".toast").forEach(n=>n.remove());const e=I("div","toast",i,t);clearTimeout(ic),ic=window.setTimeout(()=>e.remove(),2200)}class Ia{ctx=null;enabled=!0;ensure(){if(!this.enabled)return null;if(!this.ctx){const t=window.AudioContext??window.webkitAudioContext;if(!t)return null;this.ctx=new t}return this.ctx.state==="suspended"&&this.ctx.resume(),this.ctx}tone(t,e,n,s=.16,r=0,o){const a=this.ensure();if(!a)return;const l=a.currentTime+r,c=a.createOscillator(),h=a.createGain();c.type=n,c.frequency.setValueAtTime(t,l),o&&c.frequency.exponentialRampToValueAtTime(o,l+e),h.gain.setValueAtTime(0,l),h.gain.linearRampToValueAtTime(s,l+.012),h.gain.exponentialRampToValueAtTime(.001,l+e),c.connect(h).connect(a.destination),c.start(l),c.stop(l+e+.05)}play(t){if(this.enabled)switch(t){case"tap":this.tone(520,.07,"triangle",.12);break;case"place":this.tone(440,.09,"triangle",.14),this.tone(660,.09,"triangle",.12,.06);break;case"remove":this.tone(330,.08,"triangle",.1);break;case"bop":this.tone(392,.1,"square",.1),this.tone(523,.1,"square",.1,.08),this.tone(784,.16,"square",.1,.16);break;case"hop":this.tone(300,.12,"sine",.1,0,520);break;case"bump":this.tone(140,.14,"sawtooth",.08,0,90);break;case"grab":this.tone(700,.08,"triangle",.12),this.tone(900,.1,"triangle",.1,.05);break;case"drop":this.tone(600,.08,"triangle",.12),this.tone(420,.12,"triangle",.1,.06);break;case"loop":this.tone(500,.07,"sine",.1),this.tone(640,.08,"sine",.09,.05);break;case"predictRight":this.tone(523,.1,"triangle",.13),this.tone(784,.14,"triangle",.12,.08);break;case"predictWrong":this.tone(260,.16,"triangle",.1),this.tone(330,.14,"triangle",.1,.1);break;case"star":this.tone(880,.12,"sine",.14),this.tone(1320,.2,"sine",.1,.07);break;case"celebrate":[523,659,784,1047].forEach((e,n)=>this.tone(e,.16,"triangle",.13,n*.09)),this.tone(1319,.3,"sine",.1,.4);break;case"glitch":this.tone(220,.07,"square",.07),this.tone(180,.07,"square",.07,.06),this.tone(260,.09,"square",.07,.12);break}}}const oh=2,sc="codebops.save.v1",rs={schemaVersion:oh,stars:{},settings:{sound:!0,calmMode:!1,highContrast:!1,leftHanded:!1},daily:{lastCompleted:null,streak:0,totalCompleted:0},playSeconds:0};function Ua(i=new Date){const t=e=>String(e).padStart(2,"0");return`${i.getFullYear()}-${t(i.getMonth()+1)}-${t(i.getDate())}`}function M_(){const i=new Date;return i.setDate(i.getDate()-1),Ua(i)}class Ui{data;constructor(){this.data=this.load()}load(){try{const t=localStorage.getItem(sc);if(!t)return structuredClone(rs);const e=JSON.parse(t);return{schemaVersion:oh,stars:{...e.stars},settings:{...rs.settings,...e.settings},daily:{...rs.daily,...e.daily},playSeconds:e.playSeconds??0}}catch{return structuredClone(rs)}}persist(){try{localStorage.setItem(sc,JSON.stringify(this.data))}catch{}}get stars(){return this.data.stars}get settings(){return this.data.settings}get daily(){return this.data.daily}get playSeconds(){return this.data.playSeconds}setStars(t,e){this.data.stars[t]=Math.max(this.data.stars[t]??0,e),this.persist()}updateSettings(t){this.data.settings={...this.data.settings,...t},this.persist()}completeDaily(){const t=Ua();return this.data.daily.lastCompleted===t?this.data.daily.streak:(this.data.daily.streak=this.data.daily.lastCompleted===M_()?this.data.daily.streak+1:1,this.data.daily.lastCompleted=t,this.data.daily.totalCompleted+=1,this.persist(),this.data.daily.streak)}addPlaySeconds(t){this.data.playSeconds+=Math.max(0,Math.round(t)),this.persist()}reset(){this.data=structuredClone(rs),this.persist()}}function S_(i){const t=[],{cols:e,rows:n}=i;(e<1||n<1)&&t.push("Level grid must be at least 1×1."),si(i.start,e,n)||t.push(`Start ${ze(i.start)} out of bounds.`);const s=new Set(i.blocked.map(ze));s.has(ze(i.start))&&t.push("Start cell is blocked.");for(const l of i.blocked)si(l,e,n)||t.push(`Blocked cell ${ze(l)} out of bounds.`);i.botStart&&(si(i.botStart,e,n)||t.push("botStart out of bounds."),s.has(ze(i.botStart))&&t.push("botStart is blocked."),i.availableCommands.includes("swap")||t.push("botStart level must offer the swap tile."));for(const l of i.zipBlocked??[])si(l,e,n)||t.push(`zipBlocked ${ze(l)} out of bounds.`);const r=new Set,o=new Set;for(const l of i.items)si(l,e,n)||t.push(`Item "${l.id}" out of bounds.`),s.has(ze(l))&&t.push(`Item "${l.id}" sits on a blocked cell.`),r.has(l.id)&&t.push(`Duplicate item id "${l.id}".`),r.add(l.id),o.add(l.kind);for(const l of i.goals)si(l,e,n)||t.push(`Goal ${ze(l)} out of bounds.`),o.has(l.accepts)||t.push(`Goal accepts unknown item kind "${l.accepts}".`);i.maxSlots<1&&t.push("maxSlots must be ≥ 1."),i.availableCommands.length===0&&t.push("Level offers no commands.");for(const l of i.ruleChoices??[])o.has(l.trigger)||t.push(`Rule trigger "${l.trigger}" has no matching item in the level.`);return(i.prefill?.length??0)>i.maxSlots&&t.push("Prefill exceeds maxSlots."),i.prediction.choices.filter(l=>l.correct).length!==1&&t.push("Prediction needs exactly one correct choice."),t}function w_(i){const t=S_(i);if(t.length>0)throw new Error(`[CodeBops] Invalid level "${i.id}":
 - ${t.join(`
 - `)}`)}const rc={strawberry:"🍓",pearl:"🦪",flower:"🌸",mushroom:"🍄",battery:"🔋",badge:"🎖️"},E_=["Zip","Bolt"],T_={"sparkle-meadow":"#6fc7ff","bubble-bay":"#5fd4f0","pattern-forest":"#241b3d","robot-town":"#1b2340","agent-academy":"#ffb86b"};class xo{constructor(t,e,n){this.root=t,this.level=e,this.events=n,w_(e)}stage;world;zip;bolt=null;mixy;preview;deck;topBar;charLayer;sfx=new Ia;store=new Ui;program=[];running=!1;predictedSuccess=null;disposers=[];playAccum=0;selectedRule=null;lensGroup=null;lensOn=!1;ruleCardEls=[];runHadRuleFire=!1;bot(t){return t===1&&this.bolt?this.bolt:this.zip}enter(){const t=I("div","",this.root);t.id="world-canvas-wrap",this.charLayer=I("div","",this.root),this.charLayer.id="char-layer";const e=I("div","ui-layer",this.root);this.stage=new Pa(t),this.world=this.level.worldId==="bubble-bay"?new U0(this.level):this.level.worldId==="pattern-forest"?new B0(this.level):this.level.worldId==="robot-town"?new W0(this.level):this.level.worldId==="agent-academy"?new Z0(this.level):new C0(this.level),this.stage.scene.add(this.world.group),this.stage.setSky(T_[this.level.worldId]??"#6fc7ff"),this.zip=new vo({svgUrl:"./art/characters/zip/zip.svg",height:1.78,name:"zip"},this.charLayer,this.stage.camera,t),this.zip.addToScene(this.stage.scene);const n=this.world.cellToWorld(this.level.start.col,this.level.start.row);this.zip.placeAt(n),this.level.botStart&&(this.bolt=new vo({svgUrl:"./art/characters/zip/zip.svg",height:1.62,name:"bolt",extraClass:"robot-bop"},this.charLayer,this.stage.camera,t),this.bolt.addToScene(this.stage.scene),this.bolt.placeAt(this.world.cellToWorld(this.level.botStart.col,this.level.botStart.row))),this.mixy=new vo({svgUrl:"./art/characters/mixy/mixy.svg",height:1.55,name:"mixy",mixy:!0},this.charLayer,this.stage.camera,t),this.mixy.addToScene(this.stage.scene),this.mixy.placeAt(this.world.mixyLookout()),this.mixy.look("left");{const o=this.level,a=.65,l=[this.world.cellToWorld(-a,-a),this.world.cellToWorld(o.cols-1+a,-a),this.world.cellToWorld(-a,o.rows-1+a),this.world.cellToWorld(o.cols-1+a,o.rows-1+a)],c=this.world.cellToWorld((o.cols-1)/2,(o.rows-1)/2);c.y=.2,this.stage.frameArea(c,l)}if(this.preview=new c_(this.world.group,this.world,this.level),this.topBar=new h_(e,`${this.level.title} · ${this.level.shortTitle}`,{onBack:this.events.onExit,onSettings:()=>b_(e,this.store,this.sfx,()=>this.applySettings())}),this.topBar.setStars(this.store.stars[this.level.id]??0),new u_(e,this.level.goalText,rc[this.level.items[0]?.kind??"strawberry"]),this.deck=new f_(e,this.level.availableCommands,this.level.maxSlots,{onProgramChange:o=>{this.program=o,this.preview.update(o)},onBop:()=>void this.onBop(e),onRewind:()=>this.rewind()},this.sfx),this.level.ruleChoices&&this.level.ruleChoices.length>0){const o=I("div","rule-bar",e);I("span","rule-label",o,"⚡ HELPER RULE");for(const l of this.level.ruleChoices){const c=I("button","rule-card",o);c.type="button",c.innerHTML=`WHEN ${rc[l.trigger]} → ✋`,c.setAttribute("aria-label",`Rule: when you see a ${l.trigger}, grab it`),c.addEventListener("click",()=>{this.sfx.play("tap"),this.selectedRule=this.selectedRule?.trigger===l.trigger?null:{...l},this.refreshRuleBar()}),this.ruleCardEls.push(c)}const a=I("button","rule-lens",o,"🔍 BopLens");a.type="button",a.addEventListener("click",()=>{this.sfx.play("tap"),this.lensOn=!this.lensOn,a.classList.toggle("on",this.lensOn),this.refreshLens()}),this.selectedRule={...this.level.ruleChoices[0]},this.refreshRuleBar()}const s=o=>{if(this.running||document.querySelector(".dialog-scrim"))return;const a=h=>this.level.availableCommands.includes(h),c={ArrowLeft:"moveLeft",ArrowRight:"moveRight",ArrowUp:"moveUp",ArrowDown:"moveDown"}[o.key];c&&a(c)?(o.preventDefault(),this.deck.addCommand(c),this.sfx.play("tap")):o.key==="Backspace"?(o.preventDefault(),this.deck.removeAt(this.program.length-1)):(o.key==="Enter"||o.key===" ")&&this.program.length>0&&(o.preventDefault(),this.onBop(e))};window.addEventListener("keydown",s),this.disposers.push(()=>window.removeEventListener("keydown",s));const r=this.stage.onTick((o,a)=>{if(this.world.update(o,a),this.zip.update(o,a),this.bolt?.update(o,a),this.mixy.update(o,a),this.lensGroup){const l=1+Math.sin(a*4)*.12;for(const c of this.lensGroup.children)c.scale.setScalar(l),c.rotation.z=a*.9}this.playAccum+=o,this.playAccum>=20&&(this.store.addPlaySeconds(this.playAccum),this.playAccum=0)});this.disposers.push(r),this.stage.startLoop(),this.applySettings(),p_(e,this.level,this.sfx).then(()=>{this.level.prefill?(this.deck.setProgram(this.level.prefill),un(e,"Copycat left a broken plan — can you fix it? 🐾")):un(e,"Build a plan, then press BOP!")})}applySettings(){const t=this.store.settings;this.sfx.enabled=t.sound,document.body.classList.toggle("calm-mode",t.calmMode),document.body.classList.toggle("high-contrast",t.highContrast),document.body.classList.toggle("left-handed",t.leftHanded),this.zip?.setCalm(t.calmMode),this.bolt?.setCalm(t.calmMode),this.mixy?.setCalm(t.calmMode)}refreshRuleBar(){this.ruleCardEls.forEach((t,e)=>{const n=this.level.ruleChoices[e];t.classList.toggle("selected",this.selectedRule?.trigger===n.trigger)}),this.refreshLens()}refreshLens(){if(this.lensGroup?.removeFromParent(),this.lensGroup=null,!this.lensOn||!this.selectedRule)return;const t=new Ct,e=new Ie({color:"#7ff3ff",emissive:"#54e6ff",emissiveIntensity:1.3,transparent:!0,opacity:.9});for(const n of this.level.items){if(n.kind!==this.selectedRule.trigger)continue;const s=new he(new tn(.62,.05,8,28),e);s.rotation.x=-Math.PI/2;const r=this.world.cellToWorld(n.col,n.row);s.position.set(r.x,Sn+.04,r.z),s.name="lensRing",t.add(s)}this.lensGroup=t,this.world.group.add(t)}rewind(){const t=this.world.cellToWorld(this.level.start.col,this.level.start.row);this.zip.placeAt(t),this.zip.look(null),this.zip.setMood("idle"),this.bolt&&this.level.botStart&&(this.bolt.placeAt(this.world.cellToWorld(this.level.botStart.col,this.level.botStart.row)),this.bolt.look(null),this.bolt.setMood("idle"));for(const e of this.level.items){const n=this.world.itemNodes.get(e.id);if(n){n.removeFromParent();const s=this.world.cellToWorld(e.col,e.row);n.position.set(s.x,Sn,s.z),n.scale.setScalar(1),this.world.group.add(n)}}this.preview.update(this.program)}blockIndices(t){const e=[];for(let n=t-1;n>=0;n--){const s=this.program[n]?.cmd;if(s==="repeat"||s==="repeatUntil")break;e.unshift(n)}return e}async onBop(t){if(this.running||this.program.length===0)return;this.running=!0,this.deck.setRunning(!0),this.preview.clear(),this.zip.setMood("thinking"),this.zip.look("up");const{predictedSuccess:e}=await g_(t,this.level,this.sfx);this.predictedSuccess=e,this.zip.setMood("idle"),this.zip.look(null),this.rewind();const n=rh(this.level,this.program,this.selectedRule);this.runHadRuleFire=n.events.some(s=>s.type==="ruleFire"),await this.playback(n.events),n.success?this.celebrate(t):n.overflowed?(await this.mixy.glitchWobble(.7),this.sfx.play("glitch"),m_(t,this.sfx,()=>{this.rewind(),this.preview.update(this.program),un(t,"Give your Until loop a way to stop! 🛑")})):await this.mixyGlitch(t,n),this.running=!1,this.deck.setRunning(!1)}async playback(t){const e=this.store.settings.calmMode?1.35:1,n=[[],[]];for(const s of t)switch(s.type){case"commandStart":this.deck.highlightSlot(s.index,s.iter),await bn(.14/e);break;case"move":{const r=this.bot(s.actor);this.sfx.play("hop");const o=this.world.cellToWorld(s.to.col,s.to.row);this.faceDirection(r,s.dir),await r.hopTo(o,.34/e);break}case"bump":{const r=this.bot(s.actor);this.sfx.play("bump"),r.flashMood("surprised",700),await r.bumpShake();break}case"turn":{const r=this.bot(s.actor);this.faceDirection(r,s.to),await r.turnWiggle();break}case"swap":{const r=this.bot(s.to);this.sfx.play("grab"),r.flashMood("excited",900),r.hopTo(r.root.position.clone(),.3/e),un(this.root,s.to===1?"Bolt is listening! 🤖":"Zip is listening! 🐰"),await bn(.25/e);break}case"ruleFire":{const r=this.bot(s.actor);r.flashMood("excited",700),this.sfx.play("loop"),this.ruleCardEls.forEach(l=>{l.classList.remove("fired"),l.offsetWidth,l.classList.add("fired")});const o=r.el.getBoundingClientRect(),a=I("div","rule-pop",document.body,"⚡");a.style.left=`${o.left+o.width/2-16}px`,a.style.top=`${o.top-8}px`,window.setTimeout(()=>a.remove(),800),await bn(.15/e);break}case"grab":{const r=this.bot(s.actor);this.sfx.play("grab"),r.flashMood("happy",900);const o=this.world.itemNodes.get(s.item);if(o){o.removeFromParent(),r.carryAnchor.add(o);const a=n[s.actor]??n[0];o.position.set(-.06*a.length,.13*a.length,0),o.scale.setScalar(.8),a.push(o)}await bn(.2/e);break}case"grabFail":{const r=this.bot(s.actor);this.sfx.play("bump"),r.flashMood("surprised",700),await r.turnWiggle();break}case"drop":{const r=this.bot(s.actor);this.sfx.play("drop");const a=(n[s.actor]??n[0]).shift();if(a){a.removeFromParent();const l=this.world.cellToWorld(s.at.col,s.at.row);a.position.set(l.x+(s.onGoal?0:(Math.random()-.5)*.3),Sn+(s.onGoal?.62:0),l.z+(s.onGoal?.1:(Math.random()-.5)*.3)),a.scale.setScalar(s.onGoal?.85:1),this.world.group.add(a)}s.onGoal&&r.flashMood("happy",1200),await bn(.24/e);break}case"dropFail":{const r=this.bot(s.actor);this.sfx.play("bump"),r.flashMood("surprised",800),un(this.root,`${E_[s.actor]}'s hands are empty! 👐`),await r.turnWiggle();break}case"condition":{this.bot(0).flashMood("thinking",800),this.deck.highlightSlot(s.index),this.sfx.play(s.ok?"loop":"tap"),this.deck.showCondBubble(s.index,s.kind==="flower"?"🌸":"🍄",s.ok),await bn(.3/e);break}case"condSkip":this.deck.flashSkipped(s.index),this.sfx.play("tap"),await bn(.18/e);break;case"loopStart":{this.deck.markLoopSource(this.blockIndices(s.index)),s.kind==="count"&&this.deck.showLoopBubble(s.index,0,s.count??"∞");break}case"loopIter":this.sfx.play("loop"),this.deck.showLoopBubble(s.index,s.iter,s.count??"∞"),await bn(.1/e);break;case"loopEnd":this.deck.clearLoopBubble(),this.deck.clearRunningHighlight();break;case"loopOverflow":this.deck.clearLoopBubble();break;case"loopFail":un(this.root,"That loop has nothing to repeat! ↻"),await bn(.3);break}}faceDirection(t,e){t.look(e==="E"?"right":e==="W"?"left":e==="N"?"up":null)}celebrate(t){this.zip.celebrate(),this.bolt?.celebrate(),this.sfx.play("celebrate"),this.events.onSuccess?.();const e=["It Works!"];this.program.length<=this.level.par&&e.push("It Is Clever!");const n=this.program.some(a=>a.cmd==="repeat"||a.cmd==="repeatUntil"),s=this.program.some(a=>a.cmd==="ifFlower"||a.cmd==="ifMushroom"),r=this.program.some(a=>a.cmd==="swap");(this.level.bonusStar==="loop"?n:this.level.bonusStar==="condition"?s:this.level.bonusStar==="swap"?r:this.level.bonusStar==="rule"?this.runHadRuleFire:this.predictedSuccess===!0)&&e.push("It Is Creative!"),this.store.setStars(this.level.id,e.length),__(t,{stars:e.length,starNames:e,predictedCorrectly:this.predictedSuccess},this.sfx,{onReplay:()=>{this.topBar.setStars(e.length),this.rewind(),this.preview.update(this.program)},onContinue:()=>{this.topBar.setStars(e.length),this.events.hasNext?this.events.onNextLevel():this.events.onExit()}}),window.setTimeout(()=>this.flyStarsToPill(e.length),1900)}flyStarsToPill(t){const e=this.root.querySelector(".stars-pill");if(!e||t===0)return;const n=e.getBoundingClientRect(),s=window.innerWidth/2,r=window.innerHeight/2-60;for(let o=0;o<t;o++){const a=I("div","fly-star",document.body,"★");a.style.left=`${s+(o-1)*54}px`,a.style.top=`${r}px`,window.setTimeout(()=>{a.style.transform=`translate(${n.left+n.width/2-s-(o-1)*54}px, ${n.top+n.height/2-r}px) scale(.45)`,a.style.opacity="0.2"},60+o*140),window.setTimeout(()=>a.remove(),1e3+o*140)}window.setTimeout(()=>this.topBar.setStars(t),1100+t*140)}async mixyGlitch(t,e){this.sfx.play("glitch"),this.zip.setMood("thinking"),await this.mixy.glitchWobble(.7),x_(t,e.events,this.sfx,{onScrub:n=>{const s=e.actorTrail[Math.min(n,e.actorTrail.length-1)];s&&s.actors.forEach((r,o)=>{const a=this.bot(o);a.placeAt(this.world.cellToWorld(r.col,r.row)),this.faceDirection(a,r.dir)})},onTryAgain:()=>{this.zip.setMood("idle"),this.rewind(),this.preview.update(this.program),un(t,"Fix a step and BOP again! 💪")}})}dispose(){this.playAccum>0&&this.store.addPlaySeconds(this.playAccum),this.playAccum=0,this.disposers.forEach(t=>t()),this.disposers=[],this.zip?.dispose(),this.bolt?.dispose(),this.mixy?.dispose(),this.stage?.dispose(),this.root.innerHTML=""}}const ah=["moveUp","moveDown","moveLeft","moveRight","grab","drop"],A_={id:"sm-1",worldId:"sparkle-meadow",title:"World 1: Sparkle Meadow",shortTitle:"Berry Hello!",goalText:"Bring the fruit to our friend!",cols:4,rows:3,start:{col:0,row:0,dir:"E"},blocked:[{col:1,row:1},{col:0,row:2}],items:[{id:"strawberry",kind:"strawberry",col:2,row:0}],goals:[{col:3,row:2,accepts:"strawberry"}],availableCommands:ah,maxSlots:8,par:7,brief:{title:"Berry Hello!",text:"Zip is hungry for adventure! Use the arrow tiles to walk Zip to the strawberry, grab it, and bring it to the star pad.",emoji:"🍓"},prediction:{prompt:"What will Zip do with your plan?",choices:[{id:"deliver",emoji:"🍓",label:"Deliver the strawberry to the star pad!",correct:!0},{id:"oops",emoji:"🌳",label:"Get a little lost on the way…",correct:!1}]}},R_={id:"sm-2",worldId:"sparkle-meadow",title:"World 1: Sparkle Meadow",shortTitle:"Around the Bushes",goalText:"Zip around the bushes to deliver the berry!",cols:4,rows:3,start:{col:1,row:2,dir:"N"},blocked:[{col:0,row:1},{col:2,row:1}],items:[{id:"strawberry",kind:"strawberry",col:1,row:0}],goals:[{col:3,row:2,accepts:"strawberry"}],availableCommands:ah,maxSlots:10,par:8,brief:{title:"Around the Bushes",text:"The path is twistier this time. Plan your arrows carefully, helper!",emoji:"🌳"},prediction:{prompt:"Where will the strawberry end up?",choices:[{id:"deliver",emoji:"⭐",label:"Right on the star pad!",correct:!0},{id:"oops",emoji:"🫢",label:"Zip might bump a bush…",correct:!1}]}},C_=[A_,R_],P_={id:"bb-1",worldId:"bubble-bay",title:"World 2: Bubble Bay",shortTitle:"Loopy Dock",goalText:"Bring the pearl to the treasure chest!",cols:5,rows:3,start:{col:0,row:1,dir:"E"},blocked:[],items:[{id:"pearl",kind:"pearl",col:3,row:1}],goals:[{col:4,row:1,accepts:"pearl"}],availableCommands:["moveUp","moveDown","moveLeft","moveRight","grab","drop","repeat"],maxSlots:6,par:5,brief:{title:"Loopy Dock",text:"Meet the Repeat tile! It runs the commands above it again — three steps in one tap. Loop-de-loop!",emoji:"↻"},prediction:{prompt:"What will your loop do?",choices:[{id:"deliver",emoji:"🦪",label:"Zip zooms down the dock to the chest!",correct:!0},{id:"oops",emoji:"💦",label:"Zip might splash into the bay…",correct:!1}]}},L_={id:"bb-2",worldId:"bubble-bay",title:"World 2: Bubble Bay",shortTitle:"Pearl Parade",goalText:"Collect every pearl and reach the chest!",cols:5,rows:3,start:{col:0,row:1,dir:"E"},blocked:[],items:[{id:"pearl-1",kind:"pearl",col:1,row:1},{id:"pearl-2",kind:"pearl",col:2,row:1},{id:"pearl-3",kind:"pearl",col:3,row:1}],goals:[{col:4,row:1,accepts:"pearl"}],availableCommands:["moveUp","moveDown","moveLeft","moveRight","grab","drop","repeat"],maxSlots:6,par:5,brief:{title:"Pearl Parade",text:"Three pearls in a row! Repeat a step + grab block to scoop them all up like a pro looper.",emoji:"🫧"},prediction:{prompt:"How many pearls will Zip carry to the chest?",choices:[{id:"deliver",emoji:"😄",label:"All three — what a haul!",correct:!0},{id:"oops",emoji:"🥲",label:"Maybe just one…",correct:!1}]}},D_={id:"bb-3",worldId:"bubble-bay",title:"World 2: Bubble Bay",shortTitle:"Until You Get There",goalText:"Loop until the pearl, then to the chest!",cols:5,rows:3,start:{col:0,row:0,dir:"E"},blocked:[],items:[{id:"pearl",kind:"pearl",col:3,row:0}],goals:[{col:4,row:0,accepts:"pearl"}],availableCommands:["moveUp","moveDown","moveLeft","moveRight","grab","drop","repeat","repeatUntil"],maxSlots:6,par:5,brief:{title:"Until You Get There",text:"The Until tile loops your step + grab block and stops all by itself when the pearl is scooped. Magic!",emoji:"🔁"},prediction:{prompt:"When will the Until loop stop?",choices:[{id:"deliver",emoji:"🦪",label:"Right at the pearl — smart loop!",correct:!0},{id:"oops",emoji:"🌀",label:"It might loop forever…",correct:!1}]}},I_={id:"bb-debug",worldId:"bubble-bay",title:"World 2: Bubble Bay",shortTitle:"Copycat’s Oopsie",goalText:"Fix Copycat’s loop so Zip stops at the pearl!",cols:4,rows:3,start:{col:0,row:1,dir:"E"},blocked:[],items:[{id:"pearl",kind:"pearl",col:2,row:1}],goals:[{col:3,row:1,accepts:"pearl"}],availableCommands:["moveUp","moveDown","moveLeft","moveRight","grab","drop","repeat"],maxSlots:5,par:5,prefill:[{cmd:"moveRight"},{cmd:"repeat",arg:4},{cmd:"grab"},{cmd:"moveRight"},{cmd:"drop"}],brief:{title:"Copycat’s Oopsie",text:"Copycat copied the loop one time too many — Zip splashes off the dock! Tap the ↻ badge to fix the count, then BOP!",emoji:"🐾"},prediction:{prompt:"Did the fix work?",choices:[{id:"deliver",emoji:"🎉",label:"Perfect loop — pearl delivered!",correct:!0},{id:"oops",emoji:"💦",label:"Still splashy…",correct:!1}]}},U_={id:"bb-creative",worldId:"bubble-bay",title:"World 2: Bubble Bay",shortTitle:"Loop Lagoon",goalText:"Deliver the pearl YOUR way — loops earn a bonus star!",cols:5,rows:3,start:{col:0,row:2,dir:"E"},blocked:[{col:2,row:1}],items:[{id:"pearl",kind:"pearl",col:2,row:2}],goals:[{col:4,row:0,accepts:"pearl"}],availableCommands:["moveUp","moveDown","moveLeft","moveRight","grab","drop","repeat","repeatUntil"],maxSlots:10,par:9,bonusStar:"loop",brief:{title:"Loop Lagoon",text:"A whole lagoon to play in! Deliver the pearl any way you like — use a loop tile for a bonus star.",emoji:"🌊"},prediction:{prompt:"What’s your master plan?",choices:[{id:"deliver",emoji:"🏆",label:"Pearl to the chest, easy!",correct:!0},{id:"oops",emoji:"🤔",label:"Let’s see what happens…",correct:!1}]}},N_=[P_,L_,D_,I_,U_],ws=["moveUp","moveDown","moveLeft","moveRight","grab","drop"],F_={id:"pf-1",worldId:"pattern-forest",title:"World 3: Pattern Forest",shortTitle:"If You See a Flower",goalText:"Pick the flower for the fairy ring!",cols:5,rows:3,start:{col:0,row:1,dir:"E"},blocked:[],items:[{id:"flower",kind:"flower",col:2,row:1}],goals:[{col:4,row:1,accepts:"flower"}],availableCommands:[...ws,"ifFlower"],maxSlots:8,par:7,brief:{title:"If You See a Flower",text:'New tile! 🌸 IF checks the tile Zip stands on: "If there IS a flower, do the next tile!" Try it: walk, IF 🌸, grab!',emoji:"🌸"},prediction:{prompt:"What happens at the IF tile?",choices:[{id:"deliver",emoji:"🌸",label:"Zip sees a flower and grabs it!",correct:!0},{id:"oops",emoji:"🙈",label:"Zip walks right past it…",correct:!1}]}},O_={id:"pf-2",worldId:"pattern-forest",title:"World 3: Pattern Forest",shortTitle:"Mushroom Mix-Up",goalText:"Only flowers for the fairy ring — yuck mushrooms!",cols:5,rows:3,start:{col:0,row:1,dir:"E"},blocked:[],items:[{id:"mushroom-1",kind:"mushroom",col:1,row:1},{id:"flower",kind:"flower",col:2,row:1},{id:"mushroom-2",kind:"mushroom",col:3,row:1}],goals:[{col:4,row:1,accepts:"flower"}],availableCommands:[...ws,"ifFlower"],maxSlots:12,par:9,brief:{title:"Mushroom Mix-Up",text:"Yucky mushrooms spoil the fairy ring! Tiptoe past them: step, IF 🌸, grab — the IF tile skips the grab when it sees a mushroom.",emoji:"🍄"},prediction:{prompt:"What lands on the fairy ring?",choices:[{id:"deliver",emoji:"🌸",label:"Just the pretty flower!",correct:!0},{id:"oops",emoji:"🍄",label:"A yucky mushroom — oh no!",correct:!1}]}},B_={id:"pf-3",worldId:"pattern-forest",title:"World 3: Pattern Forest",shortTitle:"Firefly Rows",goalText:"Gather both flowers for the ring!",cols:6,rows:3,start:{col:0,row:1,dir:"E"},blocked:[],items:[{id:"flower-1",kind:"flower",col:1,row:1},{id:"mushroom-1",kind:"mushroom",col:2,row:1},{id:"flower-2",kind:"flower",col:3,row:1},{id:"mushroom-2",kind:"mushroom",col:4,row:1}],goals:[{col:5,row:1,accepts:"flower"}],availableCommands:[...ws,"ifFlower","repeat"],maxSlots:8,par:6,brief:{title:"Firefly Rows",text:"A long row of flowers AND mushrooms! Loop your pattern — step, IF 🌸, grab, Repeat ×4 — and watch Zip pick perfectly, every time.",emoji:"✨"},prediction:{prompt:"What does your pattern collect?",choices:[{id:"deliver",emoji:"🌸🌸",label:"Both flowers, zero mushrooms!",correct:!0},{id:"oops",emoji:"🍄",label:"Something yucky sneaks in…",correct:!1}]}},k_={id:"pf-debug",worldId:"pattern-forest",title:"World 3: Pattern Forest",shortTitle:"Copycat’s Poison Ring",goalText:"Fix the plan so only flowers reach the ring!",cols:6,rows:3,start:{col:0,row:1,dir:"E"},blocked:[],items:[{id:"flower-1",kind:"flower",col:1,row:1},{id:"mushroom-1",kind:"mushroom",col:2,row:1},{id:"flower-2",kind:"flower",col:3,row:1},{id:"mushroom-2",kind:"mushroom",col:4,row:1}],goals:[{col:5,row:1,accepts:"flower"}],availableCommands:[...ws,"ifFlower","repeat"],maxSlots:8,par:6,prefill:[{cmd:"moveRight"},{cmd:"grab"},{cmd:"repeat",arg:4},{cmd:"moveRight"},{cmd:"drop"}],brief:{title:"Copycat’s Poison Ring",text:"Copycat grabbed EVERYTHING — even the yucky mushrooms! Clear the plan and rebuild it with an IF 🌸 before the grab.",emoji:"🐾"},prediction:{prompt:"Did your fix save the ring?",choices:[{id:"deliver",emoji:"🎉",label:"Only flowers — the ring is happy!",correct:!0},{id:"oops",emoji:"🍄",label:"Still a little yucky…",correct:!1}]}},z_={id:"pf-creative",worldId:"pattern-forest",title:"World 3: Pattern Forest",shortTitle:"Grove of Wonders",goalText:"Fill BOTH fairy rings — IF tiles earn a bonus star!",cols:6,rows:3,start:{col:0,row:1,dir:"E"},blocked:[],items:[{id:"mushroom-1",kind:"mushroom",col:2,row:0},{id:"flower-1",kind:"flower",col:3,row:1},{id:"mushroom-2",kind:"mushroom",col:2,row:2},{id:"mushroom-3",kind:"mushroom",col:4,row:1},{id:"flower-2",kind:"flower",col:4,row:2}],goals:[{col:5,row:1,accepts:"flower"},{col:5,row:2,accepts:"flower"}],availableCommands:[...ws,"ifFlower","ifMushroom","repeat","repeatUntil"],maxSlots:14,par:13,bonusStar:"condition",brief:{title:"Grove of Wonders",text:"A whole glowing grove to explore! Two fairy rings are hungry for flowers. Any plan works — IF tiles make it elegant.",emoji:"🌳"},prediction:{prompt:"Will both rings get their flowers?",choices:[{id:"deliver",emoji:"🏆",label:"Two happy rings, coming up!",correct:!0},{id:"oops",emoji:"🤔",label:"Let’s see what happens…",correct:!1}]}},G_=[F_,O_,B_,k_,z_],Es=["moveUp","moveDown","moveLeft","moveRight","grab","drop","swap"],H_={id:"rt-1",worldId:"robot-town",title:"World 4: Robot Town",shortTitle:"Two Little Helpers",goalText:"Both batteries to their charging pads!",cols:6,rows:3,start:{col:0,row:1,dir:"E"},botStart:{col:3,row:1,dir:"E"},blocked:[],items:[{id:"battery-a",kind:"battery",col:1,row:1},{id:"battery-b",kind:"battery",col:4,row:1}],goals:[{col:2,row:1,accepts:"battery"},{col:5,row:1,accepts:"battery"}],availableCommands:Es,maxSlots:10,par:9,brief:{title:"Two Little Helpers",text:"Meet Bolt the robot! The 👥 Swap tile switches who listens: plan Zip’s delivery, tap Swap, then plan Bolt’s!",emoji:"🤖"},prediction:{prompt:"How many batteries get charged?",choices:[{id:"deliver",emoji:"🔋🔋",label:"Both — teamwork makes the dream work!",correct:!0},{id:"oops",emoji:"🔋",label:"Maybe only one…",correct:!1}]}},V_={id:"rt-2",worldId:"robot-town",title:"World 4: Robot Town",shortTitle:"Battery Boulevards",goalText:"Charge both pads across the boulevards!",cols:6,rows:3,start:{col:0,row:2,dir:"N"},botStart:{col:5,row:2,dir:"N"},blocked:[{col:1,row:1},{col:4,row:1}],items:[{id:"battery-a",kind:"battery",col:0,row:0},{id:"battery-b",kind:"battery",col:5,row:0}],goals:[{col:2,row:0,accepts:"battery"},{col:3,row:0,accepts:"battery"}],availableCommands:Es,maxSlots:14,par:13,brief:{title:"Battery Boulevards",text:"Zip takes the left side, Bolt takes the right. Watch the pipes — and don’t forget who’s listening after a Swap!",emoji:"🏙️"},prediction:{prompt:"Both pads humming?",choices:[{id:"deliver",emoji:"⚡",label:"Fully charged, both of them!",correct:!0},{id:"oops",emoji:"🪫",label:"Someone ends up powerless…",correct:!1}]}},W_={id:"rt-3",worldId:"robot-town",title:"World 4: Robot Town",shortTitle:"Charge Together",goalText:"Loop both bots to their pads!",cols:6,rows:3,start:{col:0,row:1,dir:"E"},botStart:{col:4,row:2,dir:"W"},blocked:[],items:[{id:"battery-a",kind:"battery",col:2,row:1},{id:"battery-b",kind:"battery",col:3,row:2}],goals:[{col:4,row:1,accepts:"battery"},{col:1,row:2,accepts:"battery"}],availableCommands:[...Es,"repeat"],maxSlots:12,par:12,brief:{title:"Charge Together",text:"Zip loops east, Bolt loops west. Repeat tiles work for both of them — one plan, two happy bots!",emoji:"⚡"},prediction:{prompt:"How do the loops go?",choices:[{id:"deliver",emoji:"🎉",label:"Zip zips east, Bolt bolts west!",correct:!0},{id:"oops",emoji:"🌀",label:"Loopy confusion ahead…",correct:!1}]}},X_={id:"rt-debug",worldId:"robot-town",title:"World 4: Robot Town",shortTitle:"Bolt’s Glass Garden",goalText:"Fix the plan — only Bolt rolls under glass!",cols:3,rows:3,start:{col:0,row:1,dir:"E"},botStart:{col:0,row:2,dir:"E"},blocked:[],zipBlocked:[{col:2,row:2}],items:[{id:"battery-a",kind:"battery",col:1,row:1},{id:"battery-b",kind:"battery",col:1,row:2}],goals:[{col:2,row:1,accepts:"battery"},{col:2,row:2,accepts:"battery"}],availableCommands:Es,maxSlots:10,par:9,prefill:[{cmd:"moveRight"},{cmd:"grab"},{cmd:"moveRight"},{cmd:"drop"},{cmd:"moveDown"},{cmd:"moveLeft"},{cmd:"grab"},{cmd:"moveRight"},{cmd:"drop"}],brief:{title:"Bolt’s Glass Garden",text:"Copycat sent ZIP under the glass dome — bonk! Only Bolt fits. Fix it: Swap to Bolt before the second delivery!",emoji:"🐾"},prediction:{prompt:"Did the Swap save the day?",choices:[{id:"deliver",emoji:"🎉",label:"Bolt rolls under the glass — done!",correct:!0},{id:"oops",emoji:"🔔",label:"Still bonking the dome…",correct:!1}]}},Y_={id:"rt-creative",worldId:"robot-town",title:"World 4: Robot Town",shortTitle:"Teamwork Towers",goalText:"Charge both towers your way — Swap earns a bonus star!",cols:6,rows:3,start:{col:0,row:1,dir:"E"},botStart:{col:3,row:1,dir:"E"},blocked:[],zipBlocked:[{col:5,row:2}],items:[{id:"battery-a",kind:"battery",col:1,row:0},{id:"battery-b",kind:"battery",col:4,row:2}],goals:[{col:5,row:0,accepts:"battery"},{col:5,row:2,accepts:"battery"}],availableCommands:[...Es,"repeat"],maxSlots:14,par:13,bonusStar:"swap",brief:{title:"Teamwork Towers",text:"Two towers need power — one hides under glass. Split the work between Zip and Bolt however you like!",emoji:"🗼"},prediction:{prompt:"Will the towers light up?",choices:[{id:"deliver",emoji:"🏆",label:"Both towers glowing tonight!",correct:!0},{id:"oops",emoji:"🤔",label:"Let’s see what happens…",correct:!1}]}},q_=[H_,V_,W_,X_,Y_],Ts=["moveUp","moveDown","moveLeft","moveRight","grab","drop"],$_={id:"aa-1",worldId:"agent-academy",title:"World 5: Agent Academy",shortTitle:"Meet the Rule",goalText:"Collect every badge for the trophy!",cols:5,rows:3,start:{col:0,row:1,dir:"E"},blocked:[],items:[{id:"badge-1",kind:"badge",col:1,row:1},{id:"badge-2",kind:"badge",col:2,row:1},{id:"badge-3",kind:"badge",col:3,row:1}],goals:[{col:4,row:1,accepts:"badge"}],availableCommands:[...Ts,"repeat"],maxSlots:8,par:5,collectAll:!0,ruleChoices:[{trigger:"badge",action:"grab"}],brief:{title:"Meet the Rule",text:"Your first HELPER RULE! “WHEN you step on a badge 🎖️ → grab it.” It works all by itself — just walk Zip to the trophy and drop!",emoji:"🎖️"},prediction:{prompt:"What does the helper rule do?",choices:[{id:"deliver",emoji:"🎖️",label:"Grabs every badge as Zip walks by!",correct:!0},{id:"oops",emoji:"💤",label:"Nothing — rules are sleepy…",correct:!1}]}},j_={id:"aa-2",worldId:"agent-academy",title:"World 5: Agent Academy",shortTitle:"Pick the Right Rule",goalText:"Badges only — mushrooms spoil the trophy!",cols:5,rows:3,start:{col:0,row:1,dir:"E"},blocked:[],items:[{id:"badge-1",kind:"badge",col:1,row:1},{id:"mushroom-1",kind:"mushroom",col:2,row:1},{id:"badge-2",kind:"badge",col:3,row:1}],goals:[{col:4,row:1,accepts:"badge"}],availableCommands:[...Ts,"repeat"],maxSlots:8,par:5,collectAll:!0,ruleChoices:[{trigger:"badge",action:"grab"},{trigger:"mushroom",action:"grab"}],brief:{title:"Pick the Right Rule",text:"Two rules to choose from! “Grab badges 🎖️” or “Grab mushrooms 🍄”? Choose wisely — the trophy only loves badges.",emoji:"🤔"},prediction:{prompt:"With the badge rule, what reaches the trophy?",choices:[{id:"deliver",emoji:"🏆",label:"Only shiny badges!",correct:!0},{id:"oops",emoji:"🍄",label:"A sneaky mushroom…",correct:!1}]}},Z_={id:"aa-3",worldId:"agent-academy",title:"World 5: Agent Academy",shortTitle:"Campus Laps",goalText:"Lap the track, collect the badges!",cols:6,rows:3,start:{col:0,row:0,dir:"E"},blocked:[],items:[{id:"badge-1",kind:"badge",col:1,row:0},{id:"mushroom-1",kind:"mushroom",col:2,row:0},{id:"badge-2",kind:"badge",col:3,row:0},{id:"mushroom-2",kind:"mushroom",col:4,row:0},{id:"badge-3",kind:"badge",col:5,row:0}],goals:[{col:5,row:2,accepts:"badge"}],availableCommands:[...Ts,"repeat"],maxSlots:8,par:6,collectAll:!0,ruleChoices:[{trigger:"badge",action:"grab"},{trigger:"mushroom",action:"grab"}],brief:{title:"Campus Laps",text:"Badges AND mushrooms line the track. Your rule picks perfectly every lap — loop the walk and glide down to the trophy!",emoji:"🏟️"},prediction:{prompt:"How does the lap go?",choices:[{id:"deliver",emoji:"🎖️🎖️🎖️",label:"Three badges, zero mushrooms!",correct:!0},{id:"oops",emoji:"🍄",label:"Something yucky tags along…",correct:!1}]}},J_={id:"aa-debug",worldId:"agent-academy",title:"World 5: Agent Academy",shortTitle:"Copycat’s Blind Grab",goalText:"Fix the plan — let the rule do the work!",cols:5,rows:3,start:{col:0,row:1,dir:"E"},blocked:[],items:[{id:"badge-1",kind:"badge",col:1,row:1},{id:"mushroom-1",kind:"mushroom",col:2,row:1},{id:"badge-2",kind:"badge",col:3,row:1}],goals:[{col:4,row:1,accepts:"badge"}],availableCommands:[...Ts,"repeat"],maxSlots:8,par:5,collectAll:!0,ruleChoices:[{trigger:"badge",action:"grab"}],prefill:[{cmd:"moveRight"},{cmd:"grab"},{cmd:"repeat",arg:3},{cmd:"moveRight"},{cmd:"drop"}],brief:{title:"Copycat’s Blind Grab",text:"Copycat grabs EVERYTHING — even the mushroom! Secret: your helper rule grabs badges for you. Take the grab tile OUT and let the rule shine!",emoji:"🐾"},prediction:{prompt:"Did the rule save the trophy?",choices:[{id:"deliver",emoji:"🎉",label:"Badges only — shiny and clean!",correct:!0},{id:"oops",emoji:"🍄",label:"Still a bit yucky…",correct:!1}]}},K_={id:"aa-creative",worldId:"agent-academy",title:"World 5: Agent Academy",shortTitle:"Academy Finals",goalText:"Collect every badge — fire your rule for a bonus star!",cols:6,rows:3,start:{col:0,row:0,dir:"E"},blocked:[{col:2,row:1}],items:[{id:"badge-1",kind:"badge",col:1,row:0},{id:"mushroom-1",kind:"mushroom",col:2,row:0},{id:"badge-2",kind:"badge",col:3,row:0},{id:"badge-3",kind:"badge",col:5,row:0},{id:"badge-4",kind:"badge",col:4,row:2},{id:"mushroom-2",kind:"mushroom",col:3,row:2},{id:"badge-5",kind:"badge",col:2,row:2}],goals:[{col:5,row:2,accepts:"badge"}],availableCommands:[...Ts,"repeat"],maxSlots:12,par:11,collectAll:!0,bonusStar:"rule",ruleChoices:[{trigger:"badge",action:"grab"},{trigger:"mushroom",action:"grab"}],brief:{title:"Academy Finals",text:"The big exam! Badges hide all over campus. Plan your route, loop it, and let your rule scoop them all for the trophy!",emoji:"🏆"},prediction:{prompt:"Graduation day — do you pass?",choices:[{id:"deliver",emoji:"🎓",label:"Every badge on the trophy!",correct:!0},{id:"oops",emoji:"📚",label:"Back to studying…",correct:!1}]}},Q_=[$_,j_,Z_,J_,K_],On=[...C_,...N_,...G_,...q_,...Q_],Na="codebops.custom.v1";function Ir(){try{const i=localStorage.getItem(Na);if(!i)return[];const t=JSON.parse(i);return Array.isArray(t)?t:[]}catch{return[]}}function tv(i){const t=Ir().filter(e=>e.id!==i.id);t.push(i);try{localStorage.setItem(Na,JSON.stringify(t))}catch{}}function ev(i){try{localStorage.setItem(Na,JSON.stringify(Ir().filter(t=>t.id!==i)))}catch{}}function nv(i,t,e,n,s){return{id:`custom-${Date.now()}`,worldId:"sparkle-meadow",title:"Imagination Island",shortTitle:i,goalText:"Deliver every berry to a star pad!",cols:5,rows:3,start:{...t,dir:"E"},blocked:e,items:n.map((r,o)=>({id:`strawberry-${o+1}`,kind:"strawberry",...r})),goals:s.map(r=>({...r,accepts:"strawberry"})),availableCommands:["moveUp","moveDown","moveLeft","moveRight","grab","drop"],maxSlots:12,par:12,brief:{title:i,text:"A level built by YOU! Guide Zip to every berry and stack them on the star pads.",emoji:"🏝️"},prediction:{prompt:"Will your creation work?",choices:[{id:"deliver",emoji:"🏆",label:"Every berry delivered!",correct:!0},{id:"oops",emoji:"🤔",label:"Let’s see what happens…",correct:!1}]}}}const oc=["🌸","🌼","🌷","🌻","🌹","💐","🪻","🌺"];function iv(i){let t=i>>>0;return()=>{t|=0,t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}class sv{constructor(t,e,n){this.root=t,this.store=e,this.events=n}stops=[];sfx=new Ia;enter(){const t=this.root;t.classList.add("garden-screen"),I("div","garden-sky",t),I("div","garden-hill",t);const e=I("div","garden-header",t),n=I("button","circle-btn",e,"←");n.type="button",n.setAttribute("aria-label","Back"),n.addEventListener("click",()=>this.events.onBack()),I("h1",void 0,e,"Bop Garden");const s=Object.values(this.store.stars).reduce((u,d)=>u+d,0),r=this.store.daily.totalCompleted;I("div","garden-count",e,`🌼 ${s+r} flowers`);const o=I("div","garden-mascot zip",t);vs(o,"./art/characters/zip/zip.svg").then(u=>{u&&this.stops.push(Er(u))});const a=I("div","garden-mascot mixy",t);vs(a,"./art/characters/mixy/mixy.svg").then(u=>{u&&this.stops.push(Er(u))});const l=I("div","garden-field",t),c=Math.min(s+r,64);c===0&&I("div","garden-empty",l,"Earn stars to plant your first flower! 🌱");const h=iv(42);for(let u=0;u<c;u++){const d=u>=s,p=I("button",`garden-flower${d?" golden":""}`,l,d?"🌻":oc[Math.floor(h()*oc.length)]);p.type="button",p.setAttribute("aria-label",d?"Golden daily flower":"Star flower"),p.style.left=`${4+h()*92}%`,p.style.top=`${46+h()*48}%`,p.style.fontSize=`${26+h()*22}px`,p.style.animationDelay=`${h()*2.4}s`,p.addEventListener("click",()=>{this.sfx.play("grab"),p.classList.remove("pop"),p.offsetWidth,p.classList.add("pop")})}I("div","garden-note",t,s>0?`⭐ ${s} star flowers  ·  🌻 ${r} daily flowers`:"Play levels to grow your garden!")}dispose(){this.stops.forEach(t=>t()),this.stops=[]}}const Pi=5,Li=3,yo=["empty","item","goal","blocked","start"],rv={empty:"",item:"🍓",goal:"⭐",blocked:"🌳",start:"🐰"},ov={empty:"tap to place a berry 🍓",item:"a berry! next: a star pad ⭐",goal:"a star pad! next: a bush 🌳",blocked:"a bush! next: Zip’s start 🐰",start:"Zip starts here! next: clear the tile"};class av{constructor(t,e){this.root=t,this.events=e,this.cells=Array.from({length:Li},()=>Array(Pi).fill("empty")),this.cells[1][0]="start",this.cells[1][2]="item",this.cells[1][4]="goal"}cells=[];cellEls=[];sfx=new Ia;buildLevel(){let t=null;const e=[],n=[],s=[];for(let o=0;o<Li;o++)for(let a=0;a<Pi;a++){const l=this.cells[o][a];l==="start"&&(t={col:a,row:o}),l==="blocked"&&e.push({col:a,row:o}),l==="item"&&n.push({col:a,row:o}),l==="goal"&&s.push({col:a,row:o})}if(!t)return{error:"Place Zip’s start tile 🐰 first!"};if(n.length===0)return{error:"Add at least one berry 🍓 to collect!"};if(s.length===0)return{error:"Add a star pad ⭐ to deliver to!"};const r=this.cells.flat().filter(o=>o!=="empty").length;return{level:nv(`My Island #${r}`,t,e,n,s)}}enter(){const t=this.root;t.classList.add("editor-screen");const e=I("div","select-header editor-header",t),n=I("button","circle-btn",e,"←");n.type="button",n.setAttribute("aria-label","Back to levels"),n.addEventListener("click",()=>this.events.onBack()),I("h1",void 0,e,"🏝️ Imagination Island"),I("div","editor-tip",t,"Tap a tile to change what lives there!");const s=I("div","editor-grid",t);for(let h=0;h<Li;h++){const u=I("div","editor-row",s);this.cellEls[h]=[];for(let d=0;d<Pi;d++){const p=I("button","editor-cell",u);p.type="button",p.setAttribute("aria-label",`Tile ${d+1},${h+1}`),p.addEventListener("click",()=>this.cycleCell(h,d,p)),this.cellEls[h][d]=p,this.paintCell(h,d)}}const r=I("div","editor-hint",t,""),o=I("div","editor-actions",t),a=I("button","mini-btn",o,"🧹 Clear");a.type="button",a.addEventListener("click",()=>{this.cells=Array.from({length:Li},()=>Array(Pi).fill("empty")),this.cells[1][0]="start";for(let h=0;h<Li;h++)for(let u=0;u<Pi;u++)this.paintCell(h,u);this.sfx.play("tap")});const l=I("button","mini-btn",o,"💾 Save");l.type="button",l.addEventListener("click",()=>{const{level:h,error:u}=this.buildLevel();if(u||!h){un(t,`Oops — ${u}`),this.sfx.play("bump");return}tv(h),this.sfx.play("celebrate"),un(t,"Saved! Find it on Imagination Island 💾"),this.events.onSaved()});const c=I("button","bop-btn editor-play",o);c.type="button",c.append("TEST IT!"),I("span","tri",c),c.addEventListener("click",()=>{const{level:h,error:u}=this.buildLevel();if(u||!h){un(t,`Oops — ${u}`),this.sfx.play("bump");return}this.events.onPlay(h)}),this.hintEl=r}hintEl=null;cycleCell(t,e,n){const s=this.cells[t][e],r=yo[(yo.indexOf(s)+1)%yo.length];if(r==="start")for(let o=0;o<Li;o++)for(let a=0;a<Pi;a++)this.cells[o][a]==="start"&&(this.cells[o][a]="empty",this.paintCell(o,a));this.cells[t][e]=r,this.paintCell(t,e),this.sfx.play("tap"),n.classList.remove("pop"),n.offsetWidth,n.classList.add("pop"),this.hintEl&&(this.hintEl.textContent=ov[r])}paintCell(t,e){const n=this.cellEls[t][e];if(!n)return;const s=this.cells[t][e];n.dataset.kind=s,n.textContent=rv[s]}dispose(){}}const lv=[{name:"Sequences",emoji:"➡️",blurb:"Ordering steps to reach a goal — the foundation of all programs.",levelIds:["sm-1","sm-2"]},{name:"Loops",emoji:"↻",blurb:"Repeating a pattern with counted and stop-conditioned loops.",levelIds:["bb-1","bb-2","bb-3","bb-debug","bb-creative"]},{name:"Conditions",emoji:"🌸",blurb:"“If you see a flower, grab it” — decisions inside a program.",levelIds:["pf-1","pf-2","pf-3","pf-debug","pf-creative"]},{name:"Teamwork",emoji:"🤖",blurb:"Coordinating two bots with a shared plan (task switching).",levelIds:["rt-1","rt-2","rt-3","rt-debug","rt-creative"]}];function cv(i){if(i<60)return`${i}s`;const t=Math.floor(i/60);return t<60?`${t} min`:`${Math.floor(t/60)}h ${t%60}m`}function hv(i,t){const e=I("button","campfire-gate",i);e.type="button",e.innerHTML='🔥<span class="ring"></span>',e.setAttribute("aria-label","Grown-ups: hold to open the Campfire");let n=null;const s=()=>{n!==null&&window.clearTimeout(n),n=null,e.classList.remove("holding")};return e.addEventListener("pointerdown",()=>{e.classList.add("holding"),n=window.setTimeout(()=>{s(),t()},1200)}),e.addEventListener("pointerup",s),e.addEventListener("pointerleave",s),e.addEventListener("pointercancel",s),e}function uv(i,t,e){const n=I("div","dialog-scrim",i),s=I("div","dialog campfire-dialog",n);s.setAttribute("role","dialog"),s.setAttribute("aria-label","Grown-Up Campfire"),I("div","intro-emoji",s,"🔥"),I("h2",void 0,s,"Grown-Up Campfire"),I("p","camp-sub",s,"A quiet moment to see how your little builder is doing.");const r=I("div","camp-stats",s),o=Object.values(t.stars).reduce((m,f)=>m+f,0),a=Object.keys(t.stars).filter(m=>(t.stars[m]??0)>0).length,l=(m,f,b)=>{const v=I("div","camp-stat",r);I("span","cs-emoji",v,m),I("span","cs-value",v,f),I("span","cs-label",v,b)};l("⭐",String(o),"stars earned"),l("🗺️",`${a}/${On.length}`,"levels completed"),l("📅",String(t.daily.streak),"day streak"),l("⏱️",cv(t.playSeconds),"total play time"),I("h3",void 0,s,"Concepts practiced");const c=I("div","camp-concepts",s);for(const m of lv){const f=m.levelIds.filter(_=>(t.stars[_]??0)>0).length,b=I("div","camp-concept",c);I("span","cc-emoji",b,m.emoji);const v=I("div","cc-mid",b);I("div","cc-name",v,m.name),I("div","cc-blurb",v,m.blurb),I("span",`cc-progress${f===m.levelIds.length?" full":""}`,b,`${f}/${m.levelIds.length}`)}const h=Ir().length;if(h>0){const m=I("div","camp-concept",c);I("span","cc-emoji",m,"🏝️");const f=I("div","cc-mid",m);I("div","cc-name",f,"Creation"),I("div","cc-blurb",f,"Designing original puzzles on Imagination Island."),I("span","cc-progress full",m,`${h} built`)}const u=I("div","dlg-actions camp-actions",s),d=I("button","mini-btn danger",u,"Reset all progress");d.type="button";let p=!1;d.addEventListener("click",()=>{if(!p){p=!0,d.textContent="Tap again to really reset ⚠️";return}t.reset(),x()});const g=I("button","btn-play small",u,"Close");g.type="button";const x=()=>n.remove();g.addEventListener("click",x),n.addEventListener("click",m=>{m.target===n&&x()})}const dv={"sparkle-meadow":{emoji:"🌼",name:"Sparkle Meadow"},"bubble-bay":{emoji:"🫧",name:"Bubble Bay"},"pattern-forest":{emoji:"🌸",name:"Pattern Forest"},"robot-town":{emoji:"🤖",name:"Robot Town"},"agent-academy":{emoji:"🎓",name:"Agent Academy"}},fv=["sparkle-meadow","bubble-bay","pattern-forest","robot-town","agent-academy"];function pv(){return Math.floor(Date.now()/864e5)%On.length}class mv{host;gameScreen=null;garden=null;editor=null;store=new Ui;mascotStops=[];constructor(t){this.host=t}start(){this.showTitle()}clearHost(){this.mascotStops.forEach(t=>t()),this.mascotStops=[],this.gameScreen?.dispose(),this.gameScreen=null,this.garden?.dispose(),this.garden=null,this.editor?.dispose(),this.editor=null,this.host.innerHTML=""}showTitle(){this.clearHost();const t=I("section","screen",this.host);t.id="screen-title",t.style.background="radial-gradient(130% 100% at 50% -10%, #7dd7ff 0%, #4ea9f0 38%, #2e7ce6 72%, #16225c 100%)";const e=I("div",void 0,t);Object.assign(e.style,{position:"absolute",left:"-12%",bottom:"-22%",width:"70%",height:"46%",background:"#6fcb52",borderRadius:"50%"});const n=I("div",void 0,t);Object.assign(n.style,{position:"absolute",right:"-14%",bottom:"-26%",width:"76%",height:"52%",background:"#5dbd49",borderRadius:"50%"});const s=I("div","title-mascot zip",t);vs(s,"./art/characters/zip/zip.svg").then(c=>{c&&this.mascotStops.push(Er(c))});const r=I("div","title-mascot mixy",t);vs(r,"./art/characters/mixy/mixy.svg").then(c=>{c&&this.mascotStops.push(Er(c))});const o=I("div","title-card",t);ac(o,"title-logo"),I("div","title-tag",o,"Teach tiny helpers. Build big ideas.");const a=I("button","btn-play",o);a.type="button",a.setAttribute("aria-label","Play CodeBops"),a.append("PLAY"),I("span","tri",a),a.addEventListener("click",()=>this.showSelect());const l=I("button","garden-btn",o,"🌻 My Garden");l.type="button",l.addEventListener("click",()=>this.showGarden()),hv(t,()=>{this.store=new Ui,uv(t,this.store)}),a.focus()}showSelect(){this.clearHost(),this.store=new Ui;const t=I("section","screen",this.host),e=I("div","select-wrap",t),n=I("div","select-header",e),s=I("button","circle-btn",n,"←");s.type="button",s.setAttribute("aria-label","Back to title"),s.addEventListener("click",()=>this.showTitle()),I("h1",void 0,n,"Pick a Level!");const r=Object.values(this.store.stars).reduce((v,_)=>v+_,0),o=I("div","stars-pill",n);o.style.marginLeft="auto",I("span","star earned",o,"★"),I("span",void 0,o,` ${r}`);const a=I("button","circle-btn garden-shortcut",n,"🌻");a.type="button",a.setAttribute("aria-label","Visit the Bop Garden"),a.addEventListener("click",()=>this.showGarden());const l=pv(),c=On[l],h=this.store.daily.lastCompleted===Ua(),u=I("button",`daily-card${h?" done":""}`,e);u.type="button",I("span","dc-emoji",u,h?"✅":"📅");const d=I("span","dc-mid",u);I("span","dc-title",d,h?"Daily Bop — done!":"Daily Bop"),I("span","dc-sub",d,h?`Come back tomorrow — 🔥 ${this.store.daily.streak} day streak!`:`Today's puzzle: ${c.shortTitle} ${c.brief.emoji}`),I("span","dc-streak",u,`🔥 ${this.store.daily.streak}`),h||u.addEventListener("click",()=>this.showGame(l,{onSuccess:()=>{this.store.completeDaily(),this.store=new Ui,setTimeout(()=>{},0)}}));let p=0;for(const v of fv){const _=On.filter(S=>S.worldId===v);if(_.length===0)continue;const P=dv[v],A=I("div","world-section",e),E=I("div","world-title",A);I("span","wemoji",E,P.emoji),I("span",void 0,E,P.name);const C=I("div","level-row",A);for(const S of _){const y=p,L=y===0||(this.store.stars[On[y-1].id]??0)>=1,k=this.store.stars[S.id]??0,O=I("button",`level-card${L?"":" locked"}${S.prefill?" debug":""}`,C);O.type="button",O.setAttribute("aria-label",L?`Play ${S.shortTitle}`:`${S.shortTitle} — locked`),I("span","lv-num",O,String(y+1)),I("span","lv-emoji",O,S.brief.emoji),I("span","lv-name",O,S.shortTitle);const W=I("span","lv-stars",O);for(let Y=0;Y<3;Y++)I("span",Y<k?"on":"",W,"★");L&&O.addEventListener("click",()=>this.showGame(y)),p++}}const g=Ir(),x=I("div","world-section island",e),m=I("div","world-title",x);I("span","wemoji",m,"🏝️"),I("span",void 0,m,"Imagination Island");const f=I("div","level-row",x),b=I("button","level-card create-card",f);b.type="button",I("span","lv-emoji",b,"＋"),I("span","lv-name",b,"Build a Level"),b.addEventListener("click",()=>this.showEditor());for(const v of g){const _=I("button","level-card custom-card",f);_.type="button",I("span","lv-emoji",_,"🛠️"),I("span","lv-name",_,v.shortTitle),_.addEventListener("click",()=>this.showCustomGame(v));const P=I("span","lv-del",_,"✕");P.setAttribute("aria-label",`Delete ${v.shortTitle}`),P.addEventListener("click",A=>{A.stopPropagation(),ev(v.id),this.showSelect()})}s.focus()}showGame(t,e={}){this.clearHost();const n=I("section","screen",this.host);n.id="screen-game";const s=On[t];this.gameScreen=new xo(n,s,{onExit:()=>this.showSelect(),onNextLevel:()=>this.showGame(Math.min(t+1,On.length-1)),hasNext:t<On.length-1,onSuccess:e.onSuccess}),this.gameScreen.enter()}showCustomGame(t){this.clearHost();const e=I("section","screen",this.host);e.id="screen-game",this.gameScreen=new xo(e,t,{onExit:()=>this.showSelect(),onNextLevel:()=>this.showSelect(),hasNext:!1}),this.gameScreen.enter()}showGarden(){this.clearHost(),this.store=new Ui;const t=I("section","screen",this.host);t.id="screen-garden",this.garden=new sv(t,this.store,{onBack:()=>this.showTitle()}),this.garden.enter()}showEditor(){this.clearHost();const t=I("section","screen",this.host);t.id="screen-editor",this.editor=new av(t,{onBack:()=>this.showSelect(),onPlay:e=>{this.clearHost();const n=I("section","screen",this.host);n.id="screen-game",this.gameScreen=new xo(n,e,{onExit:()=>this.showEditor(),onNextLevel:()=>this.showEditor(),hasNext:!1}),this.gameScreen.enter()},onSaved:()=>{}}),this.editor.enter()}}function gv(){const i=document.getElementById("app");if(!i)throw new Error("[CodeBops] Missing #app host element.");new mv(i).start(),document.getElementById("boot-loader")?.remove()}gv();
