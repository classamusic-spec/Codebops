(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();function C(i,t,e,n){const s=document.createElement(i);return t&&(s.className=t),n!==void 0&&(s.textContent=n),e&&e.appendChild(s),s}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const wa="171",Ih=0,Qa=1,Dh=2,Mc=1,wc=2,Tn=3,Yn=0,Ve=1,nn=2,Vn=0,Bi=1,xs=2,tl=3,el=4,Uh=5,oi=100,Nh=101,Fh=102,Oh=103,Bh=104,kh=200,zh=201,Gh=202,Hh=203,Io=204,Do=205,Vh=206,Wh=207,Xh=208,Yh=209,qh=210,$h=211,jh=212,Zh=213,Jh=214,Uo=0,No=1,Fo=2,Gi=3,Oo=4,Bo=5,ko=6,zo=7,Sc=0,Kh=1,Qh=2,Wn=0,td=1,ed=2,nd=3,Ec=4,id=5,sd=6,rd=7,Tc=300,Hi=301,Vi=302,Go=303,Ho=304,Fr=306,Wi=1e3,li=1001,Vo=1002,ze=1003,od=1004,Bs=1005,gn=1006,Xr=1007,ci=1008,Ln=1009,Ac=1010,Cc=1011,ys=1012,Sa=1013,hi=1014,Cn=1015,Ts=1016,Ea=1017,Ta=1018,Xi=1020,Rc=35902,Pc=1021,Lc=1022,un=1023,Ic=1024,Dc=1025,ki=1026,Yi=1027,Aa=1028,Ca=1029,Uc=1030,Ra=1031,Pa=1033,vr=33776,_r=33777,xr=33778,yr=33779,Wo=35840,Xo=35841,Yo=35842,qo=35843,$o=36196,jo=37492,Zo=37496,Jo=37808,Ko=37809,Qo=37810,ta=37811,ea=37812,na=37813,ia=37814,sa=37815,ra=37816,oa=37817,aa=37818,la=37819,ca=37820,ha=37821,br=36492,da=36494,ua=36495,Nc=36283,fa=36284,pa=36285,ma=36286,ad=3200,ld=3201,Fc=0,cd=1,Hn="",Pe="srgb",qi="srgb-linear",Sr="linear",he="srgb",vi=7680,nl=519,hd=512,dd=513,ud=514,Oc=515,fd=516,pd=517,md=518,gd=519,il=35044,sl="300 es",Rn=2e3,Er=2001;class Zi{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const s=this._listeners[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}}const Ne=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let rl=1234567;const ps=Math.PI/180,bs=180/Math.PI;function pi(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ne[i&255]+Ne[i>>8&255]+Ne[i>>16&255]+Ne[i>>24&255]+"-"+Ne[t&255]+Ne[t>>8&255]+"-"+Ne[t>>16&15|64]+Ne[t>>24&255]+"-"+Ne[e&63|128]+Ne[e>>8&255]+"-"+Ne[e>>16&255]+Ne[e>>24&255]+Ne[n&255]+Ne[n>>8&255]+Ne[n>>16&255]+Ne[n>>24&255]).toLowerCase()}function Xt(i,t,e){return Math.max(t,Math.min(e,i))}function La(i,t){return(i%t+t)%t}function vd(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function _d(i,t,e){return i!==t?(e-i)/(t-i):0}function ms(i,t,e){return(1-e)*i+e*t}function xd(i,t,e,n){return ms(i,t,1-Math.exp(-e*n))}function yd(i,t=1){return t-Math.abs(La(i,t*2)-t)}function bd(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function Md(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function wd(i,t){return i+Math.floor(Math.random()*(t-i+1))}function Sd(i,t){return i+Math.random()*(t-i)}function Ed(i){return i*(.5-Math.random())}function Td(i){i!==void 0&&(rl=i);let t=rl+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Ad(i){return i*ps}function Cd(i){return i*bs}function Rd(i){return(i&i-1)===0&&i!==0}function Pd(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Ld(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Id(i,t,e,n,s){const r=Math.cos,o=Math.sin,a=r(e/2),l=o(e/2),c=r((t+n)/2),h=o((t+n)/2),d=r((t-n)/2),u=o((t-n)/2),f=r((n-t)/2),g=o((n-t)/2);switch(s){case"XYX":i.set(a*h,l*d,l*u,a*c);break;case"YZY":i.set(l*u,a*h,l*d,a*c);break;case"ZXZ":i.set(l*d,l*u,a*h,a*c);break;case"XZX":i.set(a*h,l*g,l*f,a*c);break;case"YXY":i.set(l*f,a*h,l*g,a*c);break;case"ZYZ":i.set(l*g,l*f,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Di(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Be(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const Dd={DEG2RAD:ps,RAD2DEG:bs,generateUUID:pi,clamp:Xt,euclideanModulo:La,mapLinear:vd,inverseLerp:_d,lerp:ms,damp:xd,pingpong:yd,smoothstep:bd,smootherstep:Md,randInt:wd,randFloat:Sd,randFloatSpread:Ed,seededRandom:Td,degToRad:Ad,radToDeg:Cd,isPowerOfTwo:Rd,ceilPowerOfTwo:Pd,floorPowerOfTwo:Ld,setQuaternionFromProperEuler:Id,normalize:Be,denormalize:Di};class ot{constructor(t=0,e=0){ot.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Xt(this.x,t.x,e.x),this.y=Xt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Xt(this.x,t,e),this.y=Xt(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Xt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Xt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ht{constructor(t,e,n,s,r,o,a,l,c){Ht.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,l,c)}set(t,e,n,s,r,o,a,l,c){const h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],d=n[7],u=n[2],f=n[5],g=n[8],x=s[0],m=s[3],p=s[6],b=s[1],_=s[4],v=s[7],P=s[2],T=s[5],E=s[8];return r[0]=o*x+a*b+l*P,r[3]=o*m+a*_+l*T,r[6]=o*p+a*v+l*E,r[1]=c*x+h*b+d*P,r[4]=c*m+h*_+d*T,r[7]=c*p+h*v+d*E,r[2]=u*x+f*b+g*P,r[5]=u*m+f*_+g*T,r[8]=u*p+f*v+g*E,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*o*h-e*a*c-n*r*h+n*a*l+s*r*c-s*o*l}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],d=h*o-a*c,u=a*l-h*r,f=c*r-o*l,g=e*d+n*u+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/g;return t[0]=d*x,t[1]=(s*c-h*n)*x,t[2]=(a*n-s*o)*x,t[3]=u*x,t[4]=(h*e-s*l)*x,t[5]=(s*r-a*e)*x,t[6]=f*x,t[7]=(n*l-c*e)*x,t[8]=(o*e-n*r)*x,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+t,-s*c,s*l,-s*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Yr.makeScale(t,e)),this}rotate(t){return this.premultiply(Yr.makeRotation(-t)),this}translate(t,e){return this.premultiply(Yr.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Yr=new Ht;function Bc(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Tr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Ud(){const i=Tr("canvas");return i.style.display="block",i}const ol={};function Ui(i){i in ol||(ol[i]=!0,console.warn(i))}function Nd(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function Fd(i){const t=i.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function Od(i){const t=i.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const al=new Ht().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ll=new Ht().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Bd(){const i={enabled:!0,workingColorSpace:qi,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===he&&(s.r=Pn(s.r),s.g=Pn(s.g),s.b=Pn(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===he&&(s.r=zi(s.r),s.g=zi(s.g),s.b=zi(s.b))),s},fromWorkingColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},toWorkingColorSpace:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Hn?Sr:this.spaces[s].transfer},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[qi]:{primaries:t,whitePoint:n,transfer:Sr,toXYZ:al,fromXYZ:ll,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Pe},outputColorSpaceConfig:{drawingBufferColorSpace:Pe}},[Pe]:{primaries:t,whitePoint:n,transfer:he,toXYZ:al,fromXYZ:ll,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Pe}}}),i}const ee=Bd();function Pn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function zi(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let _i;class kd{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{_i===void 0&&(_i=Tr("canvas")),_i.width=t.width,_i.height=t.height;const n=_i.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=_i}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Tr("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Pn(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Pn(e[n]/255)*255):e[n]=Pn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let zd=0;class kc{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:zd++}),this.uuid=pi(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(qr(s[o].image)):r.push(qr(s[o]))}else r=qr(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function qr(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?kd.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Gd=0;class De extends Zi{constructor(t=De.DEFAULT_IMAGE,e=De.DEFAULT_MAPPING,n=li,s=li,r=gn,o=ci,a=un,l=Ln,c=De.DEFAULT_ANISOTROPY,h=Hn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Gd++}),this.uuid=pi(),this.name="",this.source=new kc(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new ot(0,0),this.repeat=new ot(1,1),this.center=new ot(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ht,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Tc)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Wi:t.x=t.x-Math.floor(t.x);break;case li:t.x=t.x<0?0:1;break;case Vo:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Wi:t.y=t.y-Math.floor(t.y);break;case li:t.y=t.y<0?0:1;break;case Vo:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}De.DEFAULT_IMAGE=null;De.DEFAULT_MAPPING=Tc;De.DEFAULT_ANISOTROPY=1;class de{constructor(t=0,e=0,n=0,s=1){de.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const l=t.elements,c=l[0],h=l[4],d=l[8],u=l[1],f=l[5],g=l[9],x=l[2],m=l[6],p=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-x)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+x)<.1&&Math.abs(g+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const _=(c+1)/2,v=(f+1)/2,P=(p+1)/2,T=(h+u)/4,E=(d+x)/4,R=(g+m)/4;return _>v&&_>P?_<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(_),s=T/n,r=E/n):v>P?v<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(v),n=T/s,r=R/s):P<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(P),n=E/r,s=R/r),this.set(n,s,r,e),this}let b=Math.sqrt((m-g)*(m-g)+(d-x)*(d-x)+(u-h)*(u-h));return Math.abs(b)<.001&&(b=1),this.x=(m-g)/b,this.y=(d-x)/b,this.z=(u-h)/b,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Xt(this.x,t.x,e.x),this.y=Xt(this.y,t.y,e.y),this.z=Xt(this.z,t.z,e.z),this.w=Xt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Xt(this.x,t,e),this.y=Xt(this.y,t,e),this.z=Xt(this.z,t,e),this.w=Xt(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Xt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Hd extends Zi{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new de(0,0,t,e),this.scissorTest=!1,this.viewport=new de(0,0,t,e);const s={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:gn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new De(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,s=t.textures.length;n<s;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new kc(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class di extends Hd{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class zc extends De{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=ze,this.minFilter=ze,this.wrapR=li,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Vd extends De{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=ze,this.minFilter=ze,this.wrapR=li,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class As{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let l=n[s+0],c=n[s+1],h=n[s+2],d=n[s+3];const u=r[o+0],f=r[o+1],g=r[o+2],x=r[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d;return}if(a===1){t[e+0]=u,t[e+1]=f,t[e+2]=g,t[e+3]=x;return}if(d!==x||l!==u||c!==f||h!==g){let m=1-a;const p=l*u+c*f+h*g+d*x,b=p>=0?1:-1,_=1-p*p;if(_>Number.EPSILON){const P=Math.sqrt(_),T=Math.atan2(P,p*b);m=Math.sin(m*T)/P,a=Math.sin(a*T)/P}const v=a*b;if(l=l*m+u*v,c=c*m+f*v,h=h*m+g*v,d=d*m+x*v,m===1-a){const P=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=P,c*=P,h*=P,d*=P}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d}static multiplyQuaternionsFlat(t,e,n,s,r,o){const a=n[s],l=n[s+1],c=n[s+2],h=n[s+3],d=r[o],u=r[o+1],f=r[o+2],g=r[o+3];return t[e]=a*g+h*d+l*f-c*u,t[e+1]=l*g+h*u+c*d-a*f,t[e+2]=c*g+h*f+a*u-l*d,t[e+3]=h*g-a*d-l*u-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(s/2),d=a(r/2),u=l(n/2),f=l(s/2),g=l(r/2);switch(o){case"XYZ":this._x=u*h*d+c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d-u*f*g;break;case"YXZ":this._x=u*h*d+c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d+u*f*g;break;case"ZXY":this._x=u*h*d-c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d-u*f*g;break;case"ZYX":this._x=u*h*d-c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d+u*f*g;break;case"YZX":this._x=u*h*d+c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d-u*f*g;break;case"XZY":this._x=u*h*d-c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d+u*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],h=e[6],d=e[10],u=n+a+d;if(u>0){const f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(o-s)*f}else if(n>a&&n>d){const f=2*Math.sqrt(1+n-a-d);this._w=(h-l)/f,this._x=.25*f,this._y=(s+o)/f,this._z=(r+c)/f}else if(a>d){const f=2*Math.sqrt(1+a-n-d);this._w=(r-c)/f,this._x=(s+o)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+d-n-a);this._w=(o-s)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Xt(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+o*a+s*c-r*l,this._y=s*h+o*l+r*a-n*c,this._z=r*h+o*c+n*l-s*a,this._w=o*h-n*a-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,s=this._y,r=this._z,o=this._w;let a=o*t._w+n*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const f=1-e;return this._w=f*o+e*this._w,this._x=f*n+e*this._x,this._y=f*s+e*this._y,this._z=f*r+e*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,a),d=Math.sin((1-e)*h)/c,u=Math.sin(e*h)/c;return this._w=o*d+this._w*u,this._x=n*d+this._x*u,this._y=s*d+this._y*u,this._z=r*d+this._z*u,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class I{constructor(t=0,e=0,n=0){I.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(cl.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(cl.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*s-a*n),h=2*(a*e-r*s),d=2*(r*n-o*e);return this.x=e+l*c+o*d-a*h,this.y=n+l*h+a*c-r*d,this.z=s+l*d+r*h-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Xt(this.x,t.x,e.x),this.y=Xt(this.y,t.y,e.y),this.z=Xt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Xt(this.x,t,e),this.y=Xt(this.y,t,e),this.z=Xt(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Xt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=s*l-r*a,this.y=r*o-n*l,this.z=n*a-s*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return $r.copy(this).projectOnVector(t),this.sub($r)}reflect(t){return this.sub($r.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Xt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const $r=new I,cl=new As;class Cs{constructor(t=new I(1/0,1/0,1/0),e=new I(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(an.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(an.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=an.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,an):an.fromBufferAttribute(r,o),an.applyMatrix4(t.matrixWorld),this.expandByPoint(an);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),ks.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ks.copy(n.boundingBox)),ks.applyMatrix4(t.matrixWorld),this.union(ks)}const s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,an),an.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(es),zs.subVectors(this.max,es),xi.subVectors(t.a,es),yi.subVectors(t.b,es),bi.subVectors(t.c,es),Un.subVectors(yi,xi),Nn.subVectors(bi,yi),Jn.subVectors(xi,bi);let e=[0,-Un.z,Un.y,0,-Nn.z,Nn.y,0,-Jn.z,Jn.y,Un.z,0,-Un.x,Nn.z,0,-Nn.x,Jn.z,0,-Jn.x,-Un.y,Un.x,0,-Nn.y,Nn.x,0,-Jn.y,Jn.x,0];return!jr(e,xi,yi,bi,zs)||(e=[1,0,0,0,1,0,0,0,1],!jr(e,xi,yi,bi,zs))?!1:(Gs.crossVectors(Un,Nn),e=[Gs.x,Gs.y,Gs.z],jr(e,xi,yi,bi,zs))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,an).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(an).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(xn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),xn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),xn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),xn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),xn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),xn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),xn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),xn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(xn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const xn=[new I,new I,new I,new I,new I,new I,new I,new I],an=new I,ks=new Cs,xi=new I,yi=new I,bi=new I,Un=new I,Nn=new I,Jn=new I,es=new I,zs=new I,Gs=new I,Kn=new I;function jr(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){Kn.fromArray(i,r);const a=s.x*Math.abs(Kn.x)+s.y*Math.abs(Kn.y)+s.z*Math.abs(Kn.z),l=t.dot(Kn),c=e.dot(Kn),h=n.dot(Kn);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const Wd=new Cs,ns=new I,Zr=new I;class Rs{constructor(t=new I,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Wd.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;ns.subVectors(t,this.center);const e=ns.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(ns,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Zr.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(ns.copy(t.center).add(Zr)),this.expandByPoint(ns.copy(t.center).sub(Zr))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const yn=new I,Jr=new I,Hs=new I,Fn=new I,Kr=new I,Vs=new I,Qr=new I;class Ia{constructor(t=new I,e=new I(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,yn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=yn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(yn.copy(this.origin).addScaledVector(this.direction,e),yn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Jr.copy(t).add(e).multiplyScalar(.5),Hs.copy(e).sub(t).normalize(),Fn.copy(this.origin).sub(Jr);const r=t.distanceTo(e)*.5,o=-this.direction.dot(Hs),a=Fn.dot(this.direction),l=-Fn.dot(Hs),c=Fn.lengthSq(),h=Math.abs(1-o*o);let d,u,f,g;if(h>0)if(d=o*l-a,u=o*a-l,g=r*h,d>=0)if(u>=-g)if(u<=g){const x=1/h;d*=x,u*=x,f=d*(d+o*u+2*a)+u*(o*d+u+2*l)+c}else u=r,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*l)+c;else u=-r,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*l)+c;else u<=-g?(d=Math.max(0,-(-o*r+a)),u=d>0?-r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c):u<=g?(d=0,u=Math.min(Math.max(-r,-l),r),f=u*(u+2*l)+c):(d=Math.max(0,-(o*r+a)),u=d>0?r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c);else u=o>0?-r:r,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(Jr).addScaledVector(Hs,u),f}intersectSphere(t,e){yn.subVectors(t.center,this.origin);const n=yn.dot(this.direction),s=yn.dot(yn)-n*n,r=t.radius*t.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,l;const c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(n=(t.min.x-u.x)*c,s=(t.max.x-u.x)*c):(n=(t.max.x-u.x)*c,s=(t.min.x-u.x)*c),h>=0?(r=(t.min.y-u.y)*h,o=(t.max.y-u.y)*h):(r=(t.max.y-u.y)*h,o=(t.min.y-u.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),d>=0?(a=(t.min.z-u.z)*d,l=(t.max.z-u.z)*d):(a=(t.max.z-u.z)*d,l=(t.min.z-u.z)*d),n>l||a>s)||((a>n||n!==n)&&(n=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,yn)!==null}intersectTriangle(t,e,n,s,r){Kr.subVectors(e,t),Vs.subVectors(n,t),Qr.crossVectors(Kr,Vs);let o=this.direction.dot(Qr),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Fn.subVectors(this.origin,t);const l=a*this.direction.dot(Vs.crossVectors(Fn,Vs));if(l<0)return null;const c=a*this.direction.dot(Kr.cross(Fn));if(c<0||l+c>o)return null;const h=-a*Fn.dot(Qr);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class pe{constructor(t,e,n,s,r,o,a,l,c,h,d,u,f,g,x,m){pe.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,l,c,h,d,u,f,g,x,m)}set(t,e,n,s,r,o,a,l,c,h,d,u,f,g,x,m){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=h,p[10]=d,p[14]=u,p[3]=f,p[7]=g,p[11]=x,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new pe().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/Mi.setFromMatrixColumn(t,0).length(),r=1/Mi.setFromMatrixColumn(t,1).length(),o=1/Mi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){const u=o*h,f=o*d,g=a*h,x=a*d;e[0]=l*h,e[4]=-l*d,e[8]=c,e[1]=f+g*c,e[5]=u-x*c,e[9]=-a*l,e[2]=x-u*c,e[6]=g+f*c,e[10]=o*l}else if(t.order==="YXZ"){const u=l*h,f=l*d,g=c*h,x=c*d;e[0]=u+x*a,e[4]=g*a-f,e[8]=o*c,e[1]=o*d,e[5]=o*h,e[9]=-a,e[2]=f*a-g,e[6]=x+u*a,e[10]=o*l}else if(t.order==="ZXY"){const u=l*h,f=l*d,g=c*h,x=c*d;e[0]=u-x*a,e[4]=-o*d,e[8]=g+f*a,e[1]=f+g*a,e[5]=o*h,e[9]=x-u*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){const u=o*h,f=o*d,g=a*h,x=a*d;e[0]=l*h,e[4]=g*c-f,e[8]=u*c+x,e[1]=l*d,e[5]=x*c+u,e[9]=f*c-g,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){const u=o*l,f=o*c,g=a*l,x=a*c;e[0]=l*h,e[4]=x-u*d,e[8]=g*d+f,e[1]=d,e[5]=o*h,e[9]=-a*h,e[2]=-c*h,e[6]=f*d+g,e[10]=u-x*d}else if(t.order==="XZY"){const u=o*l,f=o*c,g=a*l,x=a*c;e[0]=l*h,e[4]=-d,e[8]=c*h,e[1]=u*d+x,e[5]=o*h,e[9]=f*d-g,e[2]=g*d-f,e[6]=a*h,e[10]=x*d+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Xd,t,Yd)}lookAt(t,e,n){const s=this.elements;return qe.subVectors(t,e),qe.lengthSq()===0&&(qe.z=1),qe.normalize(),On.crossVectors(n,qe),On.lengthSq()===0&&(Math.abs(n.z)===1?qe.x+=1e-4:qe.z+=1e-4,qe.normalize(),On.crossVectors(n,qe)),On.normalize(),Ws.crossVectors(qe,On),s[0]=On.x,s[4]=Ws.x,s[8]=qe.x,s[1]=On.y,s[5]=Ws.y,s[9]=qe.y,s[2]=On.z,s[6]=Ws.z,s[10]=qe.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],d=n[5],u=n[9],f=n[13],g=n[2],x=n[6],m=n[10],p=n[14],b=n[3],_=n[7],v=n[11],P=n[15],T=s[0],E=s[4],R=s[8],w=s[12],y=s[1],D=s[5],B=s[9],k=s[13],X=s[2],Y=s[6],V=s[10],J=s[14],H=s[3],lt=s[7],vt=s[11],wt=s[15];return r[0]=o*T+a*y+l*X+c*H,r[4]=o*E+a*D+l*Y+c*lt,r[8]=o*R+a*B+l*V+c*vt,r[12]=o*w+a*k+l*J+c*wt,r[1]=h*T+d*y+u*X+f*H,r[5]=h*E+d*D+u*Y+f*lt,r[9]=h*R+d*B+u*V+f*vt,r[13]=h*w+d*k+u*J+f*wt,r[2]=g*T+x*y+m*X+p*H,r[6]=g*E+x*D+m*Y+p*lt,r[10]=g*R+x*B+m*V+p*vt,r[14]=g*w+x*k+m*J+p*wt,r[3]=b*T+_*y+v*X+P*H,r[7]=b*E+_*D+v*Y+P*lt,r[11]=b*R+_*B+v*V+P*vt,r[15]=b*w+_*k+v*J+P*wt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],h=t[2],d=t[6],u=t[10],f=t[14],g=t[3],x=t[7],m=t[11],p=t[15];return g*(+r*l*d-s*c*d-r*a*u+n*c*u+s*a*f-n*l*f)+x*(+e*l*f-e*c*u+r*o*u-s*o*f+s*c*h-r*l*h)+m*(+e*c*d-e*a*f-r*o*d+n*o*f+r*a*h-n*c*h)+p*(-s*a*h-e*l*d+e*a*u+s*o*d-n*o*u+n*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],d=t[9],u=t[10],f=t[11],g=t[12],x=t[13],m=t[14],p=t[15],b=d*m*c-x*u*c+x*l*f-a*m*f-d*l*p+a*u*p,_=g*u*c-h*m*c-g*l*f+o*m*f+h*l*p-o*u*p,v=h*x*c-g*d*c+g*a*f-o*x*f-h*a*p+o*d*p,P=g*d*l-h*x*l-g*a*u+o*x*u+h*a*m-o*d*m,T=e*b+n*_+s*v+r*P;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const E=1/T;return t[0]=b*E,t[1]=(x*u*r-d*m*r-x*s*f+n*m*f+d*s*p-n*u*p)*E,t[2]=(a*m*r-x*l*r+x*s*c-n*m*c-a*s*p+n*l*p)*E,t[3]=(d*l*r-a*u*r-d*s*c+n*u*c+a*s*f-n*l*f)*E,t[4]=_*E,t[5]=(h*m*r-g*u*r+g*s*f-e*m*f-h*s*p+e*u*p)*E,t[6]=(g*l*r-o*m*r-g*s*c+e*m*c+o*s*p-e*l*p)*E,t[7]=(o*u*r-h*l*r+h*s*c-e*u*c-o*s*f+e*l*f)*E,t[8]=v*E,t[9]=(g*d*r-h*x*r-g*n*f+e*x*f+h*n*p-e*d*p)*E,t[10]=(o*x*r-g*a*r+g*n*c-e*x*c-o*n*p+e*a*p)*E,t[11]=(h*a*r-o*d*r-h*n*c+e*d*c+o*n*f-e*a*f)*E,t[12]=P*E,t[13]=(h*x*s-g*d*s+g*n*u-e*x*u-h*n*m+e*d*m)*E,t[14]=(g*a*s-o*x*s-g*n*l+e*x*l+o*n*m-e*a*m)*E,t[15]=(o*d*s-h*a*s+h*n*l-e*d*l-o*n*u+e*a*u)*E,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,l=t.z,c=r*o,h=r*a;return this.set(c*o+n,c*a-s*l,c*l+s*a,0,c*a+s*l,h*a+n,h*l-s*o,0,c*l-s*a,h*l+s*o,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,h=o+o,d=a+a,u=r*c,f=r*h,g=r*d,x=o*h,m=o*d,p=a*d,b=l*c,_=l*h,v=l*d,P=n.x,T=n.y,E=n.z;return s[0]=(1-(x+p))*P,s[1]=(f+v)*P,s[2]=(g-_)*P,s[3]=0,s[4]=(f-v)*T,s[5]=(1-(u+p))*T,s[6]=(m+b)*T,s[7]=0,s[8]=(g+_)*E,s[9]=(m-b)*E,s[10]=(1-(u+x))*E,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let r=Mi.set(s[0],s[1],s[2]).length();const o=Mi.set(s[4],s[5],s[6]).length(),a=Mi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],ln.copy(this);const c=1/r,h=1/o,d=1/a;return ln.elements[0]*=c,ln.elements[1]*=c,ln.elements[2]*=c,ln.elements[4]*=h,ln.elements[5]*=h,ln.elements[6]*=h,ln.elements[8]*=d,ln.elements[9]*=d,ln.elements[10]*=d,e.setFromRotationMatrix(ln),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,s,r,o,a=Rn){const l=this.elements,c=2*r/(e-t),h=2*r/(n-s),d=(e+t)/(e-t),u=(n+s)/(n-s);let f,g;if(a===Rn)f=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===Er)f=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=h,l[9]=u,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=Rn){const l=this.elements,c=1/(e-t),h=1/(n-s),d=1/(o-r),u=(e+t)*c,f=(n+s)*h;let g,x;if(a===Rn)g=(o+r)*d,x=-2*d;else if(a===Er)g=r*d,x=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-u,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=x,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Mi=new I,ln=new pe,Xd=new I(0,0,0),Yd=new I(1,1,1),On=new I,Ws=new I,qe=new I,hl=new pe,dl=new As;class In{constructor(t=0,e=0,n=0,s=In.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],h=s[9],d=s[2],u=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin(Xt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Xt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(Xt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Xt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Xt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Xt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return hl.makeRotationFromQuaternion(t),this.setFromRotationMatrix(hl,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return dl.setFromEuler(this),this.setFromQuaternion(dl,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}In.DEFAULT_ORDER="XYZ";class Gc{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let qd=0;const ul=new I,wi=new As,bn=new pe,Xs=new I,is=new I,$d=new I,jd=new As,fl=new I(1,0,0),pl=new I(0,1,0),ml=new I(0,0,1),gl={type:"added"},Zd={type:"removed"},Si={type:"childadded",child:null},to={type:"childremoved",child:null};class Te extends Zi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:qd++}),this.uuid=pi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Te.DEFAULT_UP.clone();const t=new I,e=new In,n=new As,s=new I(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new pe},normalMatrix:{value:new Ht}}),this.matrix=new pe,this.matrixWorld=new pe,this.matrixAutoUpdate=Te.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Te.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Gc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return wi.setFromAxisAngle(t,e),this.quaternion.multiply(wi),this}rotateOnWorldAxis(t,e){return wi.setFromAxisAngle(t,e),this.quaternion.premultiply(wi),this}rotateX(t){return this.rotateOnAxis(fl,t)}rotateY(t){return this.rotateOnAxis(pl,t)}rotateZ(t){return this.rotateOnAxis(ml,t)}translateOnAxis(t,e){return ul.copy(t).applyQuaternion(this.quaternion),this.position.add(ul.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(fl,t)}translateY(t){return this.translateOnAxis(pl,t)}translateZ(t){return this.translateOnAxis(ml,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(bn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Xs.copy(t):Xs.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),is.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?bn.lookAt(is,Xs,this.up):bn.lookAt(Xs,is,this.up),this.quaternion.setFromRotationMatrix(bn),s&&(bn.extractRotation(s.matrixWorld),wi.setFromRotationMatrix(bn),this.quaternion.premultiply(wi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(gl),Si.child=t,this.dispatchEvent(Si),Si.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Zd),to.child=t,this.dispatchEvent(to),to.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),bn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),bn.multiply(t.parent.matrixWorld)),t.applyMatrix4(bn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(gl),Si.child=t,this.dispatchEvent(Si),Si.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(is,t,$d),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(is,jd,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const d=l[c];r(t.shapes,d)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];s.animations.push(r(t.animations,l))}}if(e){const a=o(t.geometries),l=o(t.materials),c=o(t.textures),h=o(t.images),d=o(t.shapes),u=o(t.skeletons),f=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}Te.DEFAULT_UP=new I(0,1,0);Te.DEFAULT_MATRIX_AUTO_UPDATE=!0;Te.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const cn=new I,Mn=new I,eo=new I,wn=new I,Ei=new I,Ti=new I,vl=new I,no=new I,io=new I,so=new I,ro=new de,oo=new de,ao=new de;class dn{constructor(t=new I,e=new I,n=new I){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),cn.subVectors(t,e),s.cross(cn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){cn.subVectors(s,e),Mn.subVectors(n,e),eo.subVectors(t,e);const o=cn.dot(cn),a=cn.dot(Mn),l=cn.dot(eo),c=Mn.dot(Mn),h=Mn.dot(eo),d=o*c-a*a;if(d===0)return r.set(0,0,0),null;const u=1/d,f=(c*l-a*h)*u,g=(o*h-a*l)*u;return r.set(1-f-g,g,f)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,wn)===null?!1:wn.x>=0&&wn.y>=0&&wn.x+wn.y<=1}static getInterpolation(t,e,n,s,r,o,a,l){return this.getBarycoord(t,e,n,s,wn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,wn.x),l.addScaledVector(o,wn.y),l.addScaledVector(a,wn.z),l)}static getInterpolatedAttribute(t,e,n,s,r,o){return ro.setScalar(0),oo.setScalar(0),ao.setScalar(0),ro.fromBufferAttribute(t,e),oo.fromBufferAttribute(t,n),ao.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(ro,r.x),o.addScaledVector(oo,r.y),o.addScaledVector(ao,r.z),o}static isFrontFacing(t,e,n,s){return cn.subVectors(n,e),Mn.subVectors(t,e),cn.cross(Mn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return cn.subVectors(this.c,this.b),Mn.subVectors(this.a,this.b),cn.cross(Mn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return dn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return dn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return dn.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return dn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return dn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let o,a;Ei.subVectors(s,n),Ti.subVectors(r,n),no.subVectors(t,n);const l=Ei.dot(no),c=Ti.dot(no);if(l<=0&&c<=0)return e.copy(n);io.subVectors(t,s);const h=Ei.dot(io),d=Ti.dot(io);if(h>=0&&d<=h)return e.copy(s);const u=l*d-h*c;if(u<=0&&l>=0&&h<=0)return o=l/(l-h),e.copy(n).addScaledVector(Ei,o);so.subVectors(t,r);const f=Ei.dot(so),g=Ti.dot(so);if(g>=0&&f<=g)return e.copy(r);const x=f*c-l*g;if(x<=0&&c>=0&&g<=0)return a=c/(c-g),e.copy(n).addScaledVector(Ti,a);const m=h*g-f*d;if(m<=0&&d-h>=0&&f-g>=0)return vl.subVectors(r,s),a=(d-h)/(d-h+(f-g)),e.copy(s).addScaledVector(vl,a);const p=1/(m+x+u);return o=x*p,a=u*p,e.copy(n).addScaledVector(Ei,o).addScaledVector(Ti,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Hc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Bn={h:0,s:0,l:0},Ys={h:0,s:0,l:0};function lo(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class Yt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Pe){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ee.toWorkingColorSpace(this,e),this}setRGB(t,e,n,s=ee.workingColorSpace){return this.r=t,this.g=e,this.b=n,ee.toWorkingColorSpace(this,s),this}setHSL(t,e,n,s=ee.workingColorSpace){if(t=La(t,1),e=Xt(e,0,1),n=Xt(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=lo(o,r,t+1/3),this.g=lo(o,r,t),this.b=lo(o,r,t-1/3)}return ee.toWorkingColorSpace(this,s),this}setStyle(t,e=Pe){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Pe){const n=Hc[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Pn(t.r),this.g=Pn(t.g),this.b=Pn(t.b),this}copyLinearToSRGB(t){return this.r=zi(t.r),this.g=zi(t.g),this.b=zi(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Pe){return ee.fromWorkingColorSpace(Fe.copy(this),t),Math.round(Xt(Fe.r*255,0,255))*65536+Math.round(Xt(Fe.g*255,0,255))*256+Math.round(Xt(Fe.b*255,0,255))}getHexString(t=Pe){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ee.workingColorSpace){ee.fromWorkingColorSpace(Fe.copy(this),e);const n=Fe.r,s=Fe.g,r=Fe.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let l,c;const h=(a+o)/2;if(a===o)l=0,c=0;else{const d=o-a;switch(c=h<=.5?d/(o+a):d/(2-o-a),o){case n:l=(s-r)/d+(s<r?6:0);break;case s:l=(r-n)/d+2;break;case r:l=(n-s)/d+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=ee.workingColorSpace){return ee.fromWorkingColorSpace(Fe.copy(this),e),t.r=Fe.r,t.g=Fe.g,t.b=Fe.b,t}getStyle(t=Pe){ee.fromWorkingColorSpace(Fe.copy(this),t);const e=Fe.r,n=Fe.g,s=Fe.b;return t!==Pe?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Bn),this.setHSL(Bn.h+t,Bn.s+e,Bn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Bn),t.getHSL(Ys);const n=ms(Bn.h,Ys.h,e),s=ms(Bn.s,Ys.s,e),r=ms(Bn.l,Ys.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Fe=new Yt;Yt.NAMES=Hc;let Jd=0;class mi extends Zi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Jd++}),this.uuid=pi(),this.name="",this.type="Material",this.blending=Bi,this.side=Yn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Io,this.blendDst=Do,this.blendEquation=oi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Yt(0,0,0),this.blendAlpha=0,this.depthFunc=Gi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=nl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=vi,this.stencilZFail=vi,this.stencilZPass=vi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Bi&&(n.blending=this.blending),this.side!==Yn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Io&&(n.blendSrc=this.blendSrc),this.blendDst!==Do&&(n.blendDst=this.blendDst),this.blendEquation!==oi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Gi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==nl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==vi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==vi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==vi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(e){const r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Da extends mi{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Yt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new In,this.combine=Sc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Ee=new I,qs=new ot;class We{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=il,this.updateRanges=[],this.gpuType=Cn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)qs.fromBufferAttribute(this,e),qs.applyMatrix3(t),this.setXY(e,qs.x,qs.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Ee.fromBufferAttribute(this,e),Ee.applyMatrix3(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Ee.fromBufferAttribute(this,e),Ee.applyMatrix4(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ee.fromBufferAttribute(this,e),Ee.applyNormalMatrix(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ee.fromBufferAttribute(this,e),Ee.transformDirection(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Di(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Be(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Di(e,this.array)),e}setX(t,e){return this.normalized&&(e=Be(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Di(e,this.array)),e}setY(t,e){return this.normalized&&(e=Be(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Di(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Be(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Di(e,this.array)),e}setW(t,e){return this.normalized&&(e=Be(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Be(e,this.array),n=Be(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=Be(e,this.array),n=Be(n,this.array),s=Be(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=Be(e,this.array),n=Be(n,this.array),s=Be(s,this.array),r=Be(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==il&&(t.usage=this.usage),t}}class Vc extends We{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Wc extends We{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class Zt extends We{constructor(t,e,n){super(new Float32Array(t),e,n)}}let Kd=0;const tn=new pe,co=new Te,Ai=new I,$e=new Cs,ss=new Cs,Re=new I;class _e extends Zi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Kd++}),this.uuid=pi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Bc(t)?Wc:Vc)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Ht().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return tn.makeRotationFromQuaternion(t),this.applyMatrix4(tn),this}rotateX(t){return tn.makeRotationX(t),this.applyMatrix4(tn),this}rotateY(t){return tn.makeRotationY(t),this.applyMatrix4(tn),this}rotateZ(t){return tn.makeRotationZ(t),this.applyMatrix4(tn),this}translate(t,e,n){return tn.makeTranslation(t,e,n),this.applyMatrix4(tn),this}scale(t,e,n){return tn.makeScale(t,e,n),this.applyMatrix4(tn),this}lookAt(t){return co.lookAt(t),co.updateMatrix(),this.applyMatrix4(co.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ai).negate(),this.translate(Ai.x,Ai.y,Ai.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,r=t.length;s<r;s++){const o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Zt(n,3))}else{const n=Math.min(t.length,e.count);for(let s=0;s<n;s++){const r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Cs);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new I(-1/0,-1/0,-1/0),new I(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];$e.setFromBufferAttribute(r),this.morphTargetsRelative?(Re.addVectors(this.boundingBox.min,$e.min),this.boundingBox.expandByPoint(Re),Re.addVectors(this.boundingBox.max,$e.max),this.boundingBox.expandByPoint(Re)):(this.boundingBox.expandByPoint($e.min),this.boundingBox.expandByPoint($e.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Rs);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new I,1/0);return}if(t){const n=this.boundingSphere.center;if($e.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];ss.setFromBufferAttribute(a),this.morphTargetsRelative?(Re.addVectors($e.min,ss.min),$e.expandByPoint(Re),Re.addVectors($e.max,ss.max),$e.expandByPoint(Re)):($e.expandByPoint(ss.min),$e.expandByPoint(ss.max))}$e.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)Re.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Re));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Re.fromBufferAttribute(a,c),l&&(Ai.fromBufferAttribute(t,c),Re.add(Ai)),s=Math.max(s,n.distanceToSquared(Re))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new We(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let R=0;R<n.count;R++)a[R]=new I,l[R]=new I;const c=new I,h=new I,d=new I,u=new ot,f=new ot,g=new ot,x=new I,m=new I;function p(R,w,y){c.fromBufferAttribute(n,R),h.fromBufferAttribute(n,w),d.fromBufferAttribute(n,y),u.fromBufferAttribute(r,R),f.fromBufferAttribute(r,w),g.fromBufferAttribute(r,y),h.sub(c),d.sub(c),f.sub(u),g.sub(u);const D=1/(f.x*g.y-g.x*f.y);isFinite(D)&&(x.copy(h).multiplyScalar(g.y).addScaledVector(d,-f.y).multiplyScalar(D),m.copy(d).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(D),a[R].add(x),a[w].add(x),a[y].add(x),l[R].add(m),l[w].add(m),l[y].add(m))}let b=this.groups;b.length===0&&(b=[{start:0,count:t.count}]);for(let R=0,w=b.length;R<w;++R){const y=b[R],D=y.start,B=y.count;for(let k=D,X=D+B;k<X;k+=3)p(t.getX(k+0),t.getX(k+1),t.getX(k+2))}const _=new I,v=new I,P=new I,T=new I;function E(R){P.fromBufferAttribute(s,R),T.copy(P);const w=a[R];_.copy(w),_.sub(P.multiplyScalar(P.dot(w))).normalize(),v.crossVectors(T,w);const D=v.dot(l[R])<0?-1:1;o.setXYZW(R,_.x,_.y,_.z,D)}for(let R=0,w=b.length;R<w;++R){const y=b[R],D=y.start,B=y.count;for(let k=D,X=D+B;k<X;k+=3)E(t.getX(k+0)),E(t.getX(k+1)),E(t.getX(k+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new We(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let u=0,f=n.count;u<f;u++)n.setXYZ(u,0,0,0);const s=new I,r=new I,o=new I,a=new I,l=new I,c=new I,h=new I,d=new I;if(t)for(let u=0,f=t.count;u<f;u+=3){const g=t.getX(u+0),x=t.getX(u+1),m=t.getX(u+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,x),o.fromBufferAttribute(e,m),h.subVectors(o,r),d.subVectors(s,r),h.cross(d),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,x),c.fromBufferAttribute(n,m),a.add(h),l.add(h),c.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(x,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let u=0,f=e.count;u<f;u+=3)s.fromBufferAttribute(e,u+0),r.fromBufferAttribute(e,u+1),o.fromBufferAttribute(e,u+2),h.subVectors(o,r),d.subVectors(s,r),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Re.fromBufferAttribute(t,e),Re.normalize(),t.setXYZ(e,Re.x,Re.y,Re.z)}toNonIndexed(){function t(a,l){const c=a.array,h=a.itemSize,d=a.normalized,u=new c.constructor(l.length*h);let f=0,g=0;for(let x=0,m=l.length;x<m;x++){a.isInterleavedBufferAttribute?f=l[x]*a.data.stride+a.offset:f=l[x]*h;for(let p=0;p<h;p++)u[g++]=c[f++]}return new We(u,h,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new _e,n=this.index.array,s=this.attributes;for(const a in s){const l=s[a],c=t(l,n);e.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let h=0,d=c.length;h<d;h++){const u=c[h],f=t(u,n);l.push(f)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){const f=c[d];h.push(f.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const s=t.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(e))}const r=t.morphAttributes;for(const c in r){const h=[],d=r[c];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let c=0,h=o.length;c<h;c++){const d=o[c];this.addGroup(d.start,d.count,d.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const _l=new pe,Qn=new Ia,$s=new Rs,xl=new I,js=new I,Zs=new I,Js=new I,ho=new I,Ks=new I,yl=new I,Qs=new I;class jt extends Te{constructor(t=new _e,e=new Da){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(r&&a){Ks.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=a[l],d=r[l];h!==0&&(ho.fromBufferAttribute(d,t),o?Ks.addScaledVector(ho,h):Ks.addScaledVector(ho.sub(e),h))}e.add(Ks)}return e}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),$s.copy(n.boundingSphere),$s.applyMatrix4(r),Qn.copy(t.ray).recast(t.near),!($s.containsPoint(Qn.origin)===!1&&(Qn.intersectSphere($s,xl)===null||Qn.origin.distanceToSquared(xl)>(t.far-t.near)**2))&&(_l.copy(r).invert(),Qn.copy(t.ray).applyMatrix4(_l),!(n.boundingBox!==null&&Qn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Qn)))}_computeIntersections(t,e,n){let s;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,x=u.length;g<x;g++){const m=u[g],p=o[m.materialIndex],b=Math.max(m.start,f.start),_=Math.min(a.count,Math.min(m.start+m.count,f.start+f.count));for(let v=b,P=_;v<P;v+=3){const T=a.getX(v),E=a.getX(v+1),R=a.getX(v+2);s=tr(this,p,t,n,c,h,d,T,E,R),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,f.start),x=Math.min(a.count,f.start+f.count);for(let m=g,p=x;m<p;m+=3){const b=a.getX(m),_=a.getX(m+1),v=a.getX(m+2);s=tr(this,o,t,n,c,h,d,b,_,v),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,x=u.length;g<x;g++){const m=u[g],p=o[m.materialIndex],b=Math.max(m.start,f.start),_=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let v=b,P=_;v<P;v+=3){const T=v,E=v+1,R=v+2;s=tr(this,p,t,n,c,h,d,T,E,R),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,f.start),x=Math.min(l.count,f.start+f.count);for(let m=g,p=x;m<p;m+=3){const b=m,_=m+1,v=m+2;s=tr(this,o,t,n,c,h,d,b,_,v),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}}function Qd(i,t,e,n,s,r,o,a){let l;if(t.side===Ve?l=n.intersectTriangle(o,r,s,!0,a):l=n.intersectTriangle(s,r,o,t.side===Yn,a),l===null)return null;Qs.copy(a),Qs.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(Qs);return c<e.near||c>e.far?null:{distance:c,point:Qs.clone(),object:i}}function tr(i,t,e,n,s,r,o,a,l,c){i.getVertexPosition(a,js),i.getVertexPosition(l,Zs),i.getVertexPosition(c,Js);const h=Qd(i,t,e,n,js,Zs,Js,yl);if(h){const d=new I;dn.getBarycoord(yl,js,Zs,Js,d),s&&(h.uv=dn.getInterpolatedAttribute(s,a,l,c,d,new ot)),r&&(h.uv1=dn.getInterpolatedAttribute(r,a,l,c,d,new ot)),o&&(h.normal=dn.getInterpolatedAttribute(o,a,l,c,d,new I),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a,b:l,c,normal:new I,materialIndex:0};dn.getNormal(js,Zs,Js,u.normal),h.face=u,h.barycoord=d}return h}class fe extends _e{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],h=[],d=[];let u=0,f=0;g("z","y","x",-1,-1,n,e,t,o,r,0),g("z","y","x",1,-1,n,e,-t,o,r,1),g("x","z","y",1,1,t,n,e,s,o,2),g("x","z","y",1,-1,t,n,-e,s,o,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new Zt(c,3)),this.setAttribute("normal",new Zt(h,3)),this.setAttribute("uv",new Zt(d,2));function g(x,m,p,b,_,v,P,T,E,R,w){const y=v/E,D=P/R,B=v/2,k=P/2,X=T/2,Y=E+1,V=R+1;let J=0,H=0;const lt=new I;for(let vt=0;vt<V;vt++){const wt=vt*D-k;for(let zt=0;zt<Y;zt++){const se=zt*y-B;lt[x]=se*b,lt[m]=wt*_,lt[p]=X,c.push(lt.x,lt.y,lt.z),lt[x]=0,lt[m]=0,lt[p]=T>0?1:-1,h.push(lt.x,lt.y,lt.z),d.push(zt/E),d.push(1-vt/R),J+=1}}for(let vt=0;vt<R;vt++)for(let wt=0;wt<E;wt++){const zt=u+wt+Y*vt,se=u+wt+Y*(vt+1),j=u+(wt+1)+Y*(vt+1),st=u+(wt+1)+Y*vt;l.push(zt,se,st),l.push(se,j,st),H+=6}a.addGroup(f,H,w),f+=H,u+=J}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new fe(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function $i(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function ke(i){const t={};for(let e=0;e<i.length;e++){const n=$i(i[e]);for(const s in n)t[s]=n[s]}return t}function tu(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Xc(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ee.workingColorSpace}const eu={clone:$i,merge:ke};var nu=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,iu=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class qn extends mi{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=nu,this.fragmentShader=iu,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=$i(t.uniforms),this.uniformsGroups=tu(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Yc extends Te{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new pe,this.projectionMatrix=new pe,this.projectionMatrixInverse=new pe,this.coordinateSystem=Rn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const kn=new I,bl=new ot,Ml=new ot;class je extends Yc{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=bs*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(ps*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return bs*2*Math.atan(Math.tan(ps*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){kn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(kn.x,kn.y).multiplyScalar(-t/kn.z),kn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(kn.x,kn.y).multiplyScalar(-t/kn.z)}getViewSize(t,e){return this.getViewBounds(t,bl,Ml),e.subVectors(Ml,bl)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(ps*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,e-=o.offsetY*n/c,s*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Ci=-90,Ri=1;class su extends Te{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new je(Ci,Ri,t,e);s.layers=this.layers,this.add(s);const r=new je(Ci,Ri,t,e);r.layers=this.layers,this.add(r);const o=new je(Ci,Ri,t,e);o.layers=this.layers,this.add(o);const a=new je(Ci,Ri,t,e);a.layers=this.layers,this.add(a);const l=new je(Ci,Ri,t,e);l.layers=this.layers,this.add(l);const c=new je(Ci,Ri,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,l]=e;for(const c of e)this.remove(c);if(t===Rn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Er)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,h]=this.children,d=t.getRenderTarget(),u=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,o),t.setRenderTarget(n,2,s),t.render(e,a),t.setRenderTarget(n,3,s),t.render(e,l),t.setRenderTarget(n,4,s),t.render(e,c),n.texture.generateMipmaps=x,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(d,u,f),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class qc extends De{constructor(t,e,n,s,r,o,a,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:Hi,super(t,e,n,s,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class ru extends di{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new qc(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:gn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new fe(5,5,5),r=new qn({name:"CubemapFromEquirect",uniforms:$i(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ve,blending:Vn});r.uniforms.tEquirect.value=e;const o=new jt(s,r),a=e.minFilter;return e.minFilter===ci&&(e.minFilter=gn),new su(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,s){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}}class Ar{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new Yt(t),this.near=e,this.far=n}clone(){return new Ar(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class ou extends Te{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new In,this.environmentIntensity=1,this.environmentRotation=new In,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class au extends De{constructor(t=null,e=1,n=1,s,r,o,a,l,c=ze,h=ze,d,u){super(null,o,a,l,c,h,s,r,d,u),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const uo=new I,lu=new I,cu=new Ht;class ii{constructor(t=new I(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=uo.subVectors(n,e).cross(lu.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(uo),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||cu.getNormalMatrix(t),s=this.coplanarPoint(uo).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ti=new Rs,er=new I;class Ua{constructor(t=new ii,e=new ii,n=new ii,s=new ii,r=new ii,o=new ii){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Rn){const n=this.planes,s=t.elements,r=s[0],o=s[1],a=s[2],l=s[3],c=s[4],h=s[5],d=s[6],u=s[7],f=s[8],g=s[9],x=s[10],m=s[11],p=s[12],b=s[13],_=s[14],v=s[15];if(n[0].setComponents(l-r,u-c,m-f,v-p).normalize(),n[1].setComponents(l+r,u+c,m+f,v+p).normalize(),n[2].setComponents(l+o,u+h,m+g,v+b).normalize(),n[3].setComponents(l-o,u-h,m-g,v-b).normalize(),n[4].setComponents(l-a,u-d,m-x,v-_).normalize(),e===Rn)n[5].setComponents(l+a,u+d,m+x,v+_).normalize();else if(e===Er)n[5].setComponents(a,d,x,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),ti.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),ti.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(ti)}intersectsSprite(t){return ti.center.set(0,0,0),ti.radius=.7071067811865476,ti.applyMatrix4(t.matrixWorld),this.intersectsSphere(ti)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(er.x=s.normal.x>0?t.max.x:t.min.x,er.y=s.normal.y>0?t.max.y:t.min.y,er.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(er)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class $c extends mi{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Yt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Cr=new I,Rr=new I,wl=new pe,rs=new Ia,nr=new Rs,fo=new I,Sl=new I;class hu extends Te{constructor(t=new _e,e=new $c){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)Cr.fromBufferAttribute(e,s-1),Rr.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=Cr.distanceTo(Rr);t.setAttribute("lineDistance",new Zt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),nr.copy(n.boundingSphere),nr.applyMatrix4(s),nr.radius+=r,t.ray.intersectsSphere(nr)===!1)return;wl.copy(s).invert(),rs.copy(t.ray).applyMatrix4(wl);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,h=n.index,u=n.attributes.position;if(h!==null){const f=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let x=f,m=g-1;x<m;x+=c){const p=h.getX(x),b=h.getX(x+1),_=ir(this,t,rs,l,p,b);_&&e.push(_)}if(this.isLineLoop){const x=h.getX(g-1),m=h.getX(f),p=ir(this,t,rs,l,x,m);p&&e.push(p)}}else{const f=Math.max(0,o.start),g=Math.min(u.count,o.start+o.count);for(let x=f,m=g-1;x<m;x+=c){const p=ir(this,t,rs,l,x,x+1);p&&e.push(p)}if(this.isLineLoop){const x=ir(this,t,rs,l,g-1,f);x&&e.push(x)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function ir(i,t,e,n,s,r){const o=i.geometry.attributes.position;if(Cr.fromBufferAttribute(o,s),Rr.fromBufferAttribute(o,r),e.distanceSqToSegment(Cr,Rr,fo,Sl)>n)return;fo.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(fo);if(!(l<t.near||l>t.far))return{distance:l,point:Sl.clone().applyMatrix4(i.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:i}}class Ps extends mi{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Yt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const El=new pe,ga=new Ia,sr=new Rs,rr=new I;class Or extends Te{constructor(t=new _e,e=new Ps){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),sr.copy(n.boundingSphere),sr.applyMatrix4(s),sr.radius+=r,t.ray.intersectsSphere(sr)===!1)return;El.copy(s).invert(),ga.copy(t.ray).applyMatrix4(El);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,d=n.attributes.position;if(c!==null){const u=Math.max(0,o.start),f=Math.min(c.count,o.start+o.count);for(let g=u,x=f;g<x;g++){const m=c.getX(g);rr.fromBufferAttribute(d,m),Tl(rr,m,l,s,t,e,this)}}else{const u=Math.max(0,o.start),f=Math.min(d.count,o.start+o.count);for(let g=u,x=f;g<x;g++)rr.fromBufferAttribute(d,g),Tl(rr,g,l,s,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Tl(i,t,e,n,s,r,o){const a=ga.distanceSqToPoint(i);if(a<e){const l=new I;ga.closestPointToPoint(i,l),l.applyMatrix4(n);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}class St extends Te{constructor(){super(),this.isGroup=!0,this.type="Group"}}class Ls extends De{constructor(t,e,n,s,r,o,a,l,c){super(t,e,n,s,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class jc extends De{constructor(t,e,n,s,r,o,a,l,c,h=ki){if(h!==ki&&h!==Yi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===ki&&(n=hi),n===void 0&&h===Yi&&(n=Xi),super(null,s,r,o,a,l,h,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:ze,this.minFilter=l!==void 0?l:ze,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class vn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let s=0;const r=n.length;let o;e?o=e:o=t*n[r-1];let a=0,l=r-1,c;for(;a<=l;)if(s=Math.floor(a+(l-a)/2),c=n[s]-o,c<0)a=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===o)return s/(r-1);const h=n[s],u=n[s+1]-h,f=(o-h)/u;return(s+f)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);const o=this.getPoint(s),a=this.getPoint(r),l=e||(o.isVector2?new ot:new I);return l.copy(a).sub(o).normalize(),l}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new I,s=[],r=[],o=[],a=new I,l=new pe;for(let f=0;f<=t;f++){const g=f/t;s[f]=this.getTangentAt(g,new I)}r[0]=new I,o[0]=new I;let c=Number.MAX_VALUE;const h=Math.abs(s[0].x),d=Math.abs(s[0].y),u=Math.abs(s[0].z);h<=c&&(c=h,n.set(1,0,0)),d<=c&&(c=d,n.set(0,1,0)),u<=c&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let f=1;f<=t;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(s[f-1],s[f]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(Xt(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(a,g))}o[f].crossVectors(s[f],r[f])}if(e===!0){let f=Math.acos(Xt(r[0].dot(r[t]),-1,1));f/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(f=-f);for(let g=1;g<=t;g++)r[g].applyMatrix4(l.makeRotationAxis(s[g],f*g)),o[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class Na extends vn{constructor(t=0,e=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(t,e=new ot){const n=e,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);const a=this.aStartAngle+t*r;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),d=Math.sin(this.aRotation),u=l-this.aX,f=c-this.aY;l=u*h-f*d+this.aX,c=u*d+f*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class du extends Na{constructor(t,e,n,s,r,o){super(t,e,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function Fa(){let i=0,t=0,e=0,n=0;function s(r,o,a,l){i=r,t=a,e=-3*r+3*o-2*a-l,n=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){s(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,h,d){let u=(o-r)/c-(a-r)/(c+h)+(a-o)/h,f=(a-o)/h-(l-o)/(h+d)+(l-a)/d;u*=h,f*=h,s(o,a,u,f)},calc:function(r){const o=r*r,a=o*r;return i+t*r+e*o+n*a}}}const or=new I,po=new Fa,mo=new Fa,go=new Fa;class Zc extends vn{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new I){const n=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,h;this.closed||a>0?c=s[(a-1)%r]:(or.subVectors(s[0],s[1]).add(s[0]),c=or);const d=s[a%r],u=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:(or.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=or),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(d),f),x=Math.pow(d.distanceToSquared(u),f),m=Math.pow(u.distanceToSquared(h),f);x<1e-4&&(x=1),g<1e-4&&(g=x),m<1e-4&&(m=x),po.initNonuniformCatmullRom(c.x,d.x,u.x,h.x,g,x,m),mo.initNonuniformCatmullRom(c.y,d.y,u.y,h.y,g,x,m),go.initNonuniformCatmullRom(c.z,d.z,u.z,h.z,g,x,m)}else this.curveType==="catmullrom"&&(po.initCatmullRom(c.x,d.x,u.x,h.x,this.tension),mo.initCatmullRom(c.y,d.y,u.y,h.y,this.tension),go.initCatmullRom(c.z,d.z,u.z,h.z,this.tension));return n.set(po.calc(l),mo.calc(l),go.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new I().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function Al(i,t,e,n,s){const r=(n-t)*.5,o=(s-e)*.5,a=i*i,l=i*a;return(2*e-2*n+r+o)*l+(-3*e+3*n-2*r-o)*a+r*i+e}function uu(i,t){const e=1-i;return e*e*t}function fu(i,t){return 2*(1-i)*i*t}function pu(i,t){return i*i*t}function gs(i,t,e,n){return uu(i,t)+fu(i,e)+pu(i,n)}function mu(i,t){const e=1-i;return e*e*e*t}function gu(i,t){const e=1-i;return 3*e*e*i*t}function vu(i,t){return 3*(1-i)*i*i*t}function _u(i,t){return i*i*i*t}function vs(i,t,e,n,s){return mu(i,t)+gu(i,e)+vu(i,n)+_u(i,s)}class Jc extends vn{constructor(t=new ot,e=new ot,n=new ot,s=new ot){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new ot){const n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(vs(t,s.x,r.x,o.x,a.x),vs(t,s.y,r.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class xu extends vn{constructor(t=new I,e=new I,n=new I,s=new I){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new I){const n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(vs(t,s.x,r.x,o.x,a.x),vs(t,s.y,r.y,o.y,a.y),vs(t,s.z,r.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Kc extends vn{constructor(t=new ot,e=new ot){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new ot){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new ot){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class yu extends vn{constructor(t=new I,e=new I){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new I){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new I){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Qc extends vn{constructor(t=new ot,e=new ot,n=new ot){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new ot){const n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(gs(t,s.x,r.x,o.x),gs(t,s.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class th extends vn{constructor(t=new I,e=new I,n=new I){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new I){const n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(gs(t,s.x,r.x,o.x),gs(t,s.y,r.y,o.y),gs(t,s.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class eh extends vn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new ot){const n=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,l=s[o===0?o:o-1],c=s[o],h=s[o>s.length-2?s.length-1:o+1],d=s[o>s.length-3?s.length-1:o+2];return n.set(Al(a,l.x,c.x,h.x,d.x),Al(a,l.y,c.y,h.y,d.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new ot().fromArray(s))}return this}}var Pr=Object.freeze({__proto__:null,ArcCurve:du,CatmullRomCurve3:Zc,CubicBezierCurve:Jc,CubicBezierCurve3:xu,EllipseCurve:Na,LineCurve:Kc,LineCurve3:yu,QuadraticBezierCurve:Qc,QuadraticBezierCurve3:th,SplineCurve:eh});class bu extends vn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Pr[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=n){const o=s[r]-n,a=this.curves[r],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let s=0,r=this.curves;s<r.length;s++){const o=r[s],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,l=o.getPoints(a);for(let c=0;c<l.length;c++){const h=l[c];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(new Pr[s.type]().fromJSON(s))}return this}}class va extends bu{constructor(t){super(),this.type="Path",this.currentPoint=new ot,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new Kc(this.currentPoint.clone(),new ot(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){const r=new Qc(this.currentPoint.clone(),new ot(t,e),new ot(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,o){const a=new Jc(this.currentPoint.clone(),new ot(t,e),new ot(n,s),new ot(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new eh(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,o){const a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+a,e+l,n,s,r,o),this}absarc(t,e,n,s,r,o){return this.absellipse(t,e,n,n,s,r,o),this}ellipse(t,e,n,s,r,o,a,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,n,s,r,o,a,l),this}absellipse(t,e,n,s,r,o,a,l){const c=new Na(t,e,n,s,r,o,a,l);if(this.curves.length>0){const d=c.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class Oa extends _e{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);const r=[],o=[],a=[],l=[],c=new I,h=new ot;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let d=0,u=3;d<=e;d++,u+=3){const f=n+d/e*s;c.x=t*Math.cos(f),c.y=t*Math.sin(f),o.push(c.x,c.y,c.z),a.push(0,0,1),h.x=(o[u]/t+1)/2,h.y=(o[u+1]/t+1)/2,l.push(h.x,h.y)}for(let d=1;d<=e;d++)r.push(d,d+1,0);this.setIndex(r),this.setAttribute("position",new Zt(o,3)),this.setAttribute("normal",new Zt(a,3)),this.setAttribute("uv",new Zt(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Oa(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class kt extends _e{constructor(t=1,e=1,n=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const h=[],d=[],u=[],f=[];let g=0;const x=[],m=n/2;let p=0;b(),o===!1&&(t>0&&_(!0),e>0&&_(!1)),this.setIndex(h),this.setAttribute("position",new Zt(d,3)),this.setAttribute("normal",new Zt(u,3)),this.setAttribute("uv",new Zt(f,2));function b(){const v=new I,P=new I;let T=0;const E=(e-t)/n;for(let R=0;R<=r;R++){const w=[],y=R/r,D=y*(e-t)+t;for(let B=0;B<=s;B++){const k=B/s,X=k*l+a,Y=Math.sin(X),V=Math.cos(X);P.x=D*Y,P.y=-y*n+m,P.z=D*V,d.push(P.x,P.y,P.z),v.set(Y,E,V).normalize(),u.push(v.x,v.y,v.z),f.push(k,1-y),w.push(g++)}x.push(w)}for(let R=0;R<s;R++)for(let w=0;w<r;w++){const y=x[w][R],D=x[w+1][R],B=x[w+1][R+1],k=x[w][R+1];(t>0||w!==0)&&(h.push(y,D,k),T+=3),(e>0||w!==r-1)&&(h.push(D,B,k),T+=3)}c.addGroup(p,T,0),p+=T}function _(v){const P=g,T=new ot,E=new I;let R=0;const w=v===!0?t:e,y=v===!0?1:-1;for(let B=1;B<=s;B++)d.push(0,m*y,0),u.push(0,y,0),f.push(.5,.5),g++;const D=g;for(let B=0;B<=s;B++){const X=B/s*l+a,Y=Math.cos(X),V=Math.sin(X);E.x=w*V,E.y=m*y,E.z=w*Y,d.push(E.x,E.y,E.z),u.push(0,y,0),T.x=Y*.5+.5,T.y=V*.5*y+.5,f.push(T.x,T.y),g++}for(let B=0;B<s;B++){const k=P+B,X=D+B;v===!0?h.push(X,X+1,k):h.push(X+1,X,k),R+=3}c.addGroup(p,R,v===!0?1:2),p+=R}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new kt(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class sn extends kt{constructor(t=1,e=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new sn(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Br extends _e{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};const r=[],o=[];a(s),c(n),h(),this.setAttribute("position",new Zt(r,3)),this.setAttribute("normal",new Zt(r.slice(),3)),this.setAttribute("uv",new Zt(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(b){const _=new I,v=new I,P=new I;for(let T=0;T<e.length;T+=3)f(e[T+0],_),f(e[T+1],v),f(e[T+2],P),l(_,v,P,b)}function l(b,_,v,P){const T=P+1,E=[];for(let R=0;R<=T;R++){E[R]=[];const w=b.clone().lerp(v,R/T),y=_.clone().lerp(v,R/T),D=T-R;for(let B=0;B<=D;B++)B===0&&R===T?E[R][B]=w:E[R][B]=w.clone().lerp(y,B/D)}for(let R=0;R<T;R++)for(let w=0;w<2*(T-R)-1;w++){const y=Math.floor(w/2);w%2===0?(u(E[R][y+1]),u(E[R+1][y]),u(E[R][y])):(u(E[R][y+1]),u(E[R+1][y+1]),u(E[R+1][y]))}}function c(b){const _=new I;for(let v=0;v<r.length;v+=3)_.x=r[v+0],_.y=r[v+1],_.z=r[v+2],_.normalize().multiplyScalar(b),r[v+0]=_.x,r[v+1]=_.y,r[v+2]=_.z}function h(){const b=new I;for(let _=0;_<r.length;_+=3){b.x=r[_+0],b.y=r[_+1],b.z=r[_+2];const v=m(b)/2/Math.PI+.5,P=p(b)/Math.PI+.5;o.push(v,1-P)}g(),d()}function d(){for(let b=0;b<o.length;b+=6){const _=o[b+0],v=o[b+2],P=o[b+4],T=Math.max(_,v,P),E=Math.min(_,v,P);T>.9&&E<.1&&(_<.2&&(o[b+0]+=1),v<.2&&(o[b+2]+=1),P<.2&&(o[b+4]+=1))}}function u(b){r.push(b.x,b.y,b.z)}function f(b,_){const v=b*3;_.x=t[v+0],_.y=t[v+1],_.z=t[v+2]}function g(){const b=new I,_=new I,v=new I,P=new I,T=new ot,E=new ot,R=new ot;for(let w=0,y=0;w<r.length;w+=9,y+=6){b.set(r[w+0],r[w+1],r[w+2]),_.set(r[w+3],r[w+4],r[w+5]),v.set(r[w+6],r[w+7],r[w+8]),T.set(o[y+0],o[y+1]),E.set(o[y+2],o[y+3]),R.set(o[y+4],o[y+5]),P.copy(b).add(_).add(v).divideScalar(3);const D=m(P);x(T,y+0,b,D),x(E,y+2,_,D),x(R,y+4,v,D)}}function x(b,_,v,P){P<0&&b.x===1&&(o[_]=b.x-1),v.x===0&&v.z===0&&(o[_]=P/2/Math.PI+.5)}function m(b){return Math.atan2(b.z,-b.x)}function p(b){return Math.atan2(-b.y,Math.sqrt(b.x*b.x+b.z*b.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Br(t.vertices,t.indices,t.radius,t.details)}}class Ji extends va{constructor(t){super(t),this.uuid=pi(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,s=this.holes.length;n<s;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(new va().fromJSON(s))}return this}}const Mu={triangulate:function(i,t,e=2){const n=t&&t.length,s=n?t[0]*e:i.length;let r=nh(i,0,s,e,!0);const o=[];if(!r||r.next===r.prev)return o;let a,l,c,h,d,u,f;if(n&&(r=Au(i,t,r,e)),i.length>80*e){a=c=i[0],l=h=i[1];for(let g=e;g<s;g+=e)d=i[g],u=i[g+1],d<a&&(a=d),u<l&&(l=u),d>c&&(c=d),u>h&&(h=u);f=Math.max(c-a,h-l),f=f!==0?32767/f:0}return Ms(r,o,e,a,l,f,0),o}};function nh(i,t,e,n,s){let r,o;if(s===Bu(i,t,e,n)>0)for(r=t;r<e;r+=n)o=Cl(r,i[r],i[r+1],o);else for(r=e-n;r>=t;r-=n)o=Cl(r,i[r],i[r+1],o);return o&&kr(o,o.next)&&(Ss(o),o=o.next),o}function ui(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(kr(e,e.next)||ve(e.prev,e,e.next)===0)){if(Ss(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function Ms(i,t,e,n,s,r,o){if(!i)return;!o&&r&&Iu(i,n,s,r);let a=i,l,c;for(;i.prev!==i.next;){if(l=i.prev,c=i.next,r?Su(i,n,s,r):wu(i)){t.push(l.i/e|0),t.push(i.i/e|0),t.push(c.i/e|0),Ss(i),i=c.next,a=c.next;continue}if(i=c,i===a){o?o===1?(i=Eu(ui(i),t,e),Ms(i,t,e,n,s,r,2)):o===2&&Tu(i,t,e,n,s,r):Ms(ui(i),t,e,n,s,r,1);break}}}function wu(i){const t=i.prev,e=i,n=i.next;if(ve(t,e,n)>=0)return!1;const s=t.x,r=e.x,o=n.x,a=t.y,l=e.y,c=n.y,h=s<r?s<o?s:o:r<o?r:o,d=a<l?a<c?a:c:l<c?l:c,u=s>r?s>o?s:o:r>o?r:o,f=a>l?a>c?a:c:l>c?l:c;let g=n.next;for(;g!==t;){if(g.x>=h&&g.x<=u&&g.y>=d&&g.y<=f&&Fi(s,a,r,l,o,c,g.x,g.y)&&ve(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function Su(i,t,e,n){const s=i.prev,r=i,o=i.next;if(ve(s,r,o)>=0)return!1;const a=s.x,l=r.x,c=o.x,h=s.y,d=r.y,u=o.y,f=a<l?a<c?a:c:l<c?l:c,g=h<d?h<u?h:u:d<u?d:u,x=a>l?a>c?a:c:l>c?l:c,m=h>d?h>u?h:u:d>u?d:u,p=_a(f,g,t,e,n),b=_a(x,m,t,e,n);let _=i.prevZ,v=i.nextZ;for(;_&&_.z>=p&&v&&v.z<=b;){if(_.x>=f&&_.x<=x&&_.y>=g&&_.y<=m&&_!==s&&_!==o&&Fi(a,h,l,d,c,u,_.x,_.y)&&ve(_.prev,_,_.next)>=0||(_=_.prevZ,v.x>=f&&v.x<=x&&v.y>=g&&v.y<=m&&v!==s&&v!==o&&Fi(a,h,l,d,c,u,v.x,v.y)&&ve(v.prev,v,v.next)>=0))return!1;v=v.nextZ}for(;_&&_.z>=p;){if(_.x>=f&&_.x<=x&&_.y>=g&&_.y<=m&&_!==s&&_!==o&&Fi(a,h,l,d,c,u,_.x,_.y)&&ve(_.prev,_,_.next)>=0)return!1;_=_.prevZ}for(;v&&v.z<=b;){if(v.x>=f&&v.x<=x&&v.y>=g&&v.y<=m&&v!==s&&v!==o&&Fi(a,h,l,d,c,u,v.x,v.y)&&ve(v.prev,v,v.next)>=0)return!1;v=v.nextZ}return!0}function Eu(i,t,e){let n=i;do{const s=n.prev,r=n.next.next;!kr(s,r)&&ih(s,n,n.next,r)&&ws(s,r)&&ws(r,s)&&(t.push(s.i/e|0),t.push(n.i/e|0),t.push(r.i/e|0),Ss(n),Ss(n.next),n=i=r),n=n.next}while(n!==i);return ui(n)}function Tu(i,t,e,n,s,r){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&Nu(o,a)){let l=sh(o,a);o=ui(o,o.next),l=ui(l,l.next),Ms(o,t,e,n,s,r,0),Ms(l,t,e,n,s,r,0);return}a=a.next}o=o.next}while(o!==i)}function Au(i,t,e,n){const s=[];let r,o,a,l,c;for(r=0,o=t.length;r<o;r++)a=t[r]*n,l=r<o-1?t[r+1]*n:i.length,c=nh(i,a,l,n,!1),c===c.next&&(c.steiner=!0),s.push(Uu(c));for(s.sort(Cu),r=0;r<s.length;r++)e=Ru(s[r],e);return e}function Cu(i,t){return i.x-t.x}function Ru(i,t){const e=Pu(i,t);if(!e)return t;const n=sh(e,i);return ui(n,n.next),ui(e,e.next)}function Pu(i,t){let e=t,n=-1/0,s;const r=i.x,o=i.y;do{if(o<=e.y&&o>=e.next.y&&e.next.y!==e.y){const u=e.x+(o-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(u<=r&&u>n&&(n=u,s=e.x<e.next.x?e:e.next,u===r))return s}e=e.next}while(e!==t);if(!s)return null;const a=s,l=s.x,c=s.y;let h=1/0,d;e=s;do r>=e.x&&e.x>=l&&r!==e.x&&Fi(o<c?r:n,o,l,c,o<c?n:r,o,e.x,e.y)&&(d=Math.abs(o-e.y)/(r-e.x),ws(e,i)&&(d<h||d===h&&(e.x>s.x||e.x===s.x&&Lu(s,e)))&&(s=e,h=d)),e=e.next;while(e!==a);return s}function Lu(i,t){return ve(i.prev,i,t.prev)<0&&ve(t.next,i,i.next)<0}function Iu(i,t,e,n){let s=i;do s.z===0&&(s.z=_a(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,Du(s)}function Du(i){let t,e,n,s,r,o,a,l,c=1;do{for(e=i,i=null,r=null,o=0;e;){for(o++,n=e,a=0,t=0;t<c&&(a++,n=n.nextZ,!!n);t++);for(l=c;a>0||l>0&&n;)a!==0&&(l===0||!n||e.z<=n.z)?(s=e,e=e.nextZ,a--):(s=n,n=n.nextZ,l--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;e=n}r.nextZ=null,c*=2}while(o>1);return i}function _a(i,t,e,n,s){return i=(i-e)*s|0,t=(t-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function Uu(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function Fi(i,t,e,n,s,r,o,a){return(s-o)*(t-a)>=(i-o)*(r-a)&&(i-o)*(n-a)>=(e-o)*(t-a)&&(e-o)*(r-a)>=(s-o)*(n-a)}function Nu(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!Fu(i,t)&&(ws(i,t)&&ws(t,i)&&Ou(i,t)&&(ve(i.prev,i,t.prev)||ve(i,t.prev,t))||kr(i,t)&&ve(i.prev,i,i.next)>0&&ve(t.prev,t,t.next)>0)}function ve(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function kr(i,t){return i.x===t.x&&i.y===t.y}function ih(i,t,e,n){const s=lr(ve(i,t,e)),r=lr(ve(i,t,n)),o=lr(ve(e,n,i)),a=lr(ve(e,n,t));return!!(s!==r&&o!==a||s===0&&ar(i,e,t)||r===0&&ar(i,n,t)||o===0&&ar(e,i,n)||a===0&&ar(e,t,n))}function ar(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function lr(i){return i>0?1:i<0?-1:0}function Fu(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&ih(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function ws(i,t){return ve(i.prev,i,i.next)<0?ve(i,t,i.next)>=0&&ve(i,i.prev,t)>=0:ve(i,t,i.prev)<0||ve(i,i.next,t)<0}function Ou(i,t){let e=i,n=!1;const s=(i.x+t.x)/2,r=(i.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function sh(i,t){const e=new xa(i.i,i.x,i.y),n=new xa(t.i,t.x,t.y),s=i.next,r=t.prev;return i.next=t,t.prev=i,e.next=s,s.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function Cl(i,t,e,n){const s=new xa(i,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function Ss(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function xa(i,t,e){this.i=i,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function Bu(i,t,e,n){let s=0;for(let r=t,o=e-n;r<e;r+=n)s+=(i[o]-i[r])*(i[r+1]+i[o+1]),o=r;return s}class Xn{static area(t){const e=t.length;let n=0;for(let s=e-1,r=0;r<e;s=r++)n+=t[s].x*t[r].y-t[r].x*t[s].y;return n*.5}static isClockWise(t){return Xn.area(t)<0}static triangulateShape(t,e){const n=[],s=[],r=[];Rl(t),Pl(n,t);let o=t.length;e.forEach(Rl);for(let l=0;l<e.length;l++)s.push(o),o+=e[l].length,Pl(n,e[l]);const a=Mu.triangulate(n,s);for(let l=0;l<a.length;l+=3)r.push(a.slice(l,l+3));return r}}function Rl(i){const t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function Pl(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}class Is extends _e{constructor(t=new Ji([new ot(.5,.5),new ot(-.5,.5),new ot(-.5,-.5),new ot(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];const n=this,s=[],r=[];for(let a=0,l=t.length;a<l;a++){const c=t[a];o(c)}this.setAttribute("position",new Zt(s,3)),this.setAttribute("uv",new Zt(r,2)),this.computeVertexNormals();function o(a){const l=[],c=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,d=e.depth!==void 0?e.depth:1;let u=e.bevelEnabled!==void 0?e.bevelEnabled:!0,f=e.bevelThickness!==void 0?e.bevelThickness:.2,g=e.bevelSize!==void 0?e.bevelSize:f-.1,x=e.bevelOffset!==void 0?e.bevelOffset:0,m=e.bevelSegments!==void 0?e.bevelSegments:3;const p=e.extrudePath,b=e.UVGenerator!==void 0?e.UVGenerator:ku;let _,v=!1,P,T,E,R;p&&(_=p.getSpacedPoints(h),v=!0,u=!1,P=p.computeFrenetFrames(h,!1),T=new I,E=new I,R=new I),u||(m=0,f=0,g=0,x=0);const w=a.extractPoints(c);let y=w.shape;const D=w.holes;if(!Xn.isClockWise(y)){y=y.reverse();for(let K=0,it=D.length;K<it;K++){const L=D[K];Xn.isClockWise(L)&&(D[K]=L.reverse())}}const k=Xn.triangulateShape(y,D),X=y;for(let K=0,it=D.length;K<it;K++){const L=D[K];y=y.concat(L)}function Y(K,it,L){return it||console.error("THREE.ExtrudeGeometry: vec does not exist"),K.clone().addScaledVector(it,L)}const V=y.length,J=k.length;function H(K,it,L){let Ct,tt,xt;const rt=K.x-it.x,Dt=K.y-it.y,mt=L.x-K.x,A=L.y-K.y,M=rt*rt+Dt*Dt,O=rt*A-Dt*mt;if(Math.abs(O)>Number.EPSILON){const q=Math.sqrt(M),Q=Math.sqrt(mt*mt+A*A),$=it.x-Dt/q,At=it.y+rt/q,ht=L.x-A/Q,_t=L.y+mt/Q,qt=((ht-$)*A-(_t-At)*mt)/(rt*A-Dt*mt);Ct=$+rt*qt-K.x,tt=At+Dt*qt-K.y;const nt=Ct*Ct+tt*tt;if(nt<=2)return new ot(Ct,tt);xt=Math.sqrt(nt/2)}else{let q=!1;rt>Number.EPSILON?mt>Number.EPSILON&&(q=!0):rt<-Number.EPSILON?mt<-Number.EPSILON&&(q=!0):Math.sign(Dt)===Math.sign(A)&&(q=!0),q?(Ct=-Dt,tt=rt,xt=Math.sqrt(M)):(Ct=rt,tt=Dt,xt=Math.sqrt(M/2))}return new ot(Ct/xt,tt/xt)}const lt=[];for(let K=0,it=X.length,L=it-1,Ct=K+1;K<it;K++,L++,Ct++)L===it&&(L=0),Ct===it&&(Ct=0),lt[K]=H(X[K],X[L],X[Ct]);const vt=[];let wt,zt=lt.concat();for(let K=0,it=D.length;K<it;K++){const L=D[K];wt=[];for(let Ct=0,tt=L.length,xt=tt-1,rt=Ct+1;Ct<tt;Ct++,xt++,rt++)xt===tt&&(xt=0),rt===tt&&(rt=0),wt[Ct]=H(L[Ct],L[xt],L[rt]);vt.push(wt),zt=zt.concat(wt)}for(let K=0;K<m;K++){const it=K/m,L=f*Math.cos(it*Math.PI/2),Ct=g*Math.sin(it*Math.PI/2)+x;for(let tt=0,xt=X.length;tt<xt;tt++){const rt=Y(X[tt],lt[tt],Ct);at(rt.x,rt.y,-L)}for(let tt=0,xt=D.length;tt<xt;tt++){const rt=D[tt];wt=vt[tt];for(let Dt=0,mt=rt.length;Dt<mt;Dt++){const A=Y(rt[Dt],wt[Dt],Ct);at(A.x,A.y,-L)}}}const se=g+x;for(let K=0;K<V;K++){const it=u?Y(y[K],zt[K],se):y[K];v?(E.copy(P.normals[0]).multiplyScalar(it.x),T.copy(P.binormals[0]).multiplyScalar(it.y),R.copy(_[0]).add(E).add(T),at(R.x,R.y,R.z)):at(it.x,it.y,0)}for(let K=1;K<=h;K++)for(let it=0;it<V;it++){const L=u?Y(y[it],zt[it],se):y[it];v?(E.copy(P.normals[K]).multiplyScalar(L.x),T.copy(P.binormals[K]).multiplyScalar(L.y),R.copy(_[K]).add(E).add(T),at(R.x,R.y,R.z)):at(L.x,L.y,d/h*K)}for(let K=m-1;K>=0;K--){const it=K/m,L=f*Math.cos(it*Math.PI/2),Ct=g*Math.sin(it*Math.PI/2)+x;for(let tt=0,xt=X.length;tt<xt;tt++){const rt=Y(X[tt],lt[tt],Ct);at(rt.x,rt.y,d+L)}for(let tt=0,xt=D.length;tt<xt;tt++){const rt=D[tt];wt=vt[tt];for(let Dt=0,mt=rt.length;Dt<mt;Dt++){const A=Y(rt[Dt],wt[Dt],Ct);v?at(A.x,A.y+_[h-1].y,_[h-1].x+L):at(A.x,A.y,d+L)}}}j(),st();function j(){const K=s.length/3;if(u){let it=0,L=V*it;for(let Ct=0;Ct<J;Ct++){const tt=k[Ct];Rt(tt[2]+L,tt[1]+L,tt[0]+L)}it=h+m*2,L=V*it;for(let Ct=0;Ct<J;Ct++){const tt=k[Ct];Rt(tt[0]+L,tt[1]+L,tt[2]+L)}}else{for(let it=0;it<J;it++){const L=k[it];Rt(L[2],L[1],L[0])}for(let it=0;it<J;it++){const L=k[it];Rt(L[0]+V*h,L[1]+V*h,L[2]+V*h)}}n.addGroup(K,s.length/3-K,0)}function st(){const K=s.length/3;let it=0;Tt(X,it),it+=X.length;for(let L=0,Ct=D.length;L<Ct;L++){const tt=D[L];Tt(tt,it),it+=tt.length}n.addGroup(K,s.length/3-K,1)}function Tt(K,it){let L=K.length;for(;--L>=0;){const Ct=L;let tt=L-1;tt<0&&(tt=K.length-1);for(let xt=0,rt=h+m*2;xt<rt;xt++){const Dt=V*xt,mt=V*(xt+1),A=it+Ct+Dt,M=it+tt+Dt,O=it+tt+mt,q=it+Ct+mt;Ot(A,M,O,q)}}}function at(K,it,L){l.push(K),l.push(it),l.push(L)}function Rt(K,it,L){Ut(K),Ut(it),Ut(L);const Ct=s.length/3,tt=b.generateTopUV(n,s,Ct-3,Ct-2,Ct-1);Kt(tt[0]),Kt(tt[1]),Kt(tt[2])}function Ot(K,it,L,Ct){Ut(K),Ut(it),Ut(Ct),Ut(it),Ut(L),Ut(Ct);const tt=s.length/3,xt=b.generateSideWallUV(n,s,tt-6,tt-3,tt-2,tt-1);Kt(xt[0]),Kt(xt[1]),Kt(xt[3]),Kt(xt[1]),Kt(xt[2]),Kt(xt[3])}function Ut(K){s.push(l[K*3+0]),s.push(l[K*3+1]),s.push(l[K*3+2])}function Kt(K){r.push(K.x),r.push(K.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return zu(e,n,t)}static fromJSON(t,e){const n=[];for(let r=0,o=t.shapes.length;r<o;r++){const a=e[t.shapes[r]];n.push(a)}const s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new Pr[s.type]().fromJSON(s)),new Is(n,t.options)}}const ku={generateTopUV:function(i,t,e,n,s){const r=t[e*3],o=t[e*3+1],a=t[n*3],l=t[n*3+1],c=t[s*3],h=t[s*3+1];return[new ot(r,o),new ot(a,l),new ot(c,h)]},generateSideWallUV:function(i,t,e,n,s,r){const o=t[e*3],a=t[e*3+1],l=t[e*3+2],c=t[n*3],h=t[n*3+1],d=t[n*3+2],u=t[s*3],f=t[s*3+1],g=t[s*3+2],x=t[r*3],m=t[r*3+1],p=t[r*3+2];return Math.abs(a-h)<Math.abs(o-c)?[new ot(o,1-l),new ot(c,1-d),new ot(u,1-g),new ot(x,1-p)]:[new ot(a,1-l),new ot(h,1-d),new ot(f,1-g),new ot(m,1-p)]}};function zu(i,t,e){if(e.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){const r=i[n];e.shapes.push(r.uuid)}else e.shapes.push(i.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}class Ba extends Br{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Ba(t.radius,t.detail)}}class $n extends Br{constructor(t=1,e=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,s,t,e),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new $n(t.radius,t.detail)}}class Dn extends _e{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,o=e/2,a=Math.floor(n),l=Math.floor(s),c=a+1,h=l+1,d=t/a,u=e/l,f=[],g=[],x=[],m=[];for(let p=0;p<h;p++){const b=p*u-o;for(let _=0;_<c;_++){const v=_*d-r;g.push(v,-b,0),x.push(0,0,1),m.push(_/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let b=0;b<a;b++){const _=b+c*p,v=b+c*(p+1),P=b+1+c*(p+1),T=b+1+c*p;f.push(_,v,T),f.push(v,P,T)}this.setIndex(f),this.setAttribute("position",new Zt(g,3)),this.setAttribute("normal",new Zt(x,3)),this.setAttribute("uv",new Zt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Dn(t.width,t.height,t.widthSegments,t.heightSegments)}}class Lr extends _e{constructor(t=.5,e=1,n=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:o},n=Math.max(3,n),s=Math.max(1,s);const a=[],l=[],c=[],h=[];let d=t;const u=(e-t)/s,f=new I,g=new ot;for(let x=0;x<=s;x++){for(let m=0;m<=n;m++){const p=r+m/n*o;f.x=d*Math.cos(p),f.y=d*Math.sin(p),l.push(f.x,f.y,f.z),c.push(0,0,1),g.x=(f.x/e+1)/2,g.y=(f.y/e+1)/2,h.push(g.x,g.y)}d+=u}for(let x=0;x<s;x++){const m=x*(n+1);for(let p=0;p<n;p++){const b=p+m,_=b,v=b+n+1,P=b+n+2,T=b+1;a.push(_,v,T),a.push(v,P,T)}}this.setIndex(a),this.setAttribute("position",new Zt(l,3)),this.setAttribute("normal",new Zt(c,3)),this.setAttribute("uv",new Zt(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Lr(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class ka extends _e{constructor(t=new Ji([new ot(0,.5),new ot(-.5,-.5),new ot(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};const n=[],s=[],r=[],o=[];let a=0,l=0;if(Array.isArray(t)===!1)c(t);else for(let h=0;h<t.length;h++)c(t[h]),this.addGroup(a,l,h),a+=l,l=0;this.setIndex(n),this.setAttribute("position",new Zt(s,3)),this.setAttribute("normal",new Zt(r,3)),this.setAttribute("uv",new Zt(o,2));function c(h){const d=s.length/3,u=h.extractPoints(e);let f=u.shape;const g=u.holes;Xn.isClockWise(f)===!1&&(f=f.reverse());for(let m=0,p=g.length;m<p;m++){const b=g[m];Xn.isClockWise(b)===!0&&(g[m]=b.reverse())}const x=Xn.triangulateShape(f,g);for(let m=0,p=g.length;m<p;m++){const b=g[m];f=f.concat(b)}for(let m=0,p=f.length;m<p;m++){const b=f[m];s.push(b.x,b.y,0),r.push(0,0,1),o.push(b.x,b.y)}for(let m=0,p=x.length;m<p;m++){const b=x[m],_=b[0]+d,v=b[1]+d,P=b[2]+d;n.push(_,v,P),l+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes;return Gu(e,t)}static fromJSON(t,e){const n=[];for(let s=0,r=t.shapes.length;s<r;s++){const o=e[t.shapes[s]];n.push(o)}return new ka(n,t.curveSegments)}}function Gu(i,t){if(t.shapes=[],Array.isArray(i))for(let e=0,n=i.length;e<n;e++){const s=i[e];t.shapes.push(s.uuid)}else t.shapes.push(i.uuid);return t}class Jt extends _e{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(o+a,Math.PI);let c=0;const h=[],d=new I,u=new I,f=[],g=[],x=[],m=[];for(let p=0;p<=n;p++){const b=[],_=p/n;let v=0;p===0&&o===0?v=.5/e:p===n&&l===Math.PI&&(v=-.5/e);for(let P=0;P<=e;P++){const T=P/e;d.x=-t*Math.cos(s+T*r)*Math.sin(o+_*a),d.y=t*Math.cos(o+_*a),d.z=t*Math.sin(s+T*r)*Math.sin(o+_*a),g.push(d.x,d.y,d.z),u.copy(d).normalize(),x.push(u.x,u.y,u.z),m.push(T+v,1-_),b.push(c++)}h.push(b)}for(let p=0;p<n;p++)for(let b=0;b<e;b++){const _=h[p][b+1],v=h[p][b],P=h[p+1][b],T=h[p+1][b+1];(p!==0||o>0)&&f.push(_,v,T),(p!==n-1||l<Math.PI)&&f.push(v,P,T)}this.setIndex(f),this.setAttribute("position",new Zt(g,3)),this.setAttribute("normal",new Zt(x,3)),this.setAttribute("uv",new Zt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Jt(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Xe extends _e{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);const o=[],a=[],l=[],c=[],h=new I,d=new I,u=new I;for(let f=0;f<=n;f++)for(let g=0;g<=s;g++){const x=g/s*r,m=f/n*Math.PI*2;d.x=(t+e*Math.cos(m))*Math.cos(x),d.y=(t+e*Math.cos(m))*Math.sin(x),d.z=e*Math.sin(m),a.push(d.x,d.y,d.z),h.x=t*Math.cos(x),h.y=t*Math.sin(x),u.subVectors(d,h).normalize(),l.push(u.x,u.y,u.z),c.push(g/s),c.push(f/n)}for(let f=1;f<=n;f++)for(let g=1;g<=s;g++){const x=(s+1)*f+g-1,m=(s+1)*(f-1)+g-1,p=(s+1)*(f-1)+g,b=(s+1)*f+g;o.push(x,m,b),o.push(m,p,b)}this.setIndex(o),this.setAttribute("position",new Zt(a,3)),this.setAttribute("normal",new Zt(l,3)),this.setAttribute("uv",new Zt(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Xe(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class Ir extends _e{constructor(t=new th(new I(-1,-1,0),new I(-1,1,0),new I(1,1,0)),e=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:s,closed:r};const o=t.computeFrenetFrames(e,r);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;const a=new I,l=new I,c=new ot;let h=new I;const d=[],u=[],f=[],g=[];x(),this.setIndex(g),this.setAttribute("position",new Zt(d,3)),this.setAttribute("normal",new Zt(u,3)),this.setAttribute("uv",new Zt(f,2));function x(){for(let _=0;_<e;_++)m(_);m(r===!1?e:0),b(),p()}function m(_){h=t.getPointAt(_/e,h);const v=o.normals[_],P=o.binormals[_];for(let T=0;T<=s;T++){const E=T/s*Math.PI*2,R=Math.sin(E),w=-Math.cos(E);l.x=w*v.x+R*P.x,l.y=w*v.y+R*P.y,l.z=w*v.z+R*P.z,l.normalize(),u.push(l.x,l.y,l.z),a.x=h.x+n*l.x,a.y=h.y+n*l.y,a.z=h.z+n*l.z,d.push(a.x,a.y,a.z)}}function p(){for(let _=1;_<=e;_++)for(let v=1;v<=s;v++){const P=(s+1)*(_-1)+(v-1),T=(s+1)*_+(v-1),E=(s+1)*_+v,R=(s+1)*(_-1)+v;g.push(P,T,R),g.push(T,E,R)}}function b(){for(let _=0;_<=e;_++)for(let v=0;v<=s;v++)c.x=_/e,c.y=v/s,f.push(c.x,c.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new Ir(new Pr[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}}class we extends mi{constructor(t){super(),this.isMeshToonMaterial=!0,this.defines={TOON:""},this.type="MeshToonMaterial",this.color=new Yt(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Yt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Fc,this.normalScale=new ot(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.gradientMap=t.gradientMap,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.alphaMap=t.alphaMap,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}class Hu extends mi{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=ad,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Vu extends mi{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class za extends Te{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Yt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class Ll extends za{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Te.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Yt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const vo=new pe,Il=new I,Dl=new I;class rh{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ot(512,512),this.map=null,this.mapPass=null,this.matrix=new pe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ua,this._frameExtents=new ot(1,1),this._viewportCount=1,this._viewports=[new de(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Il.setFromMatrixPosition(t.matrixWorld),e.position.copy(Il),Dl.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Dl),e.updateMatrixWorld(),vo.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(vo),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(vo)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const Ul=new pe,os=new I,_o=new I;class Wu extends rh{constructor(){super(new je(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ot(4,2),this._viewportCount=6,this._viewports=[new de(2,1,1,1),new de(0,1,1,1),new de(3,1,1,1),new de(1,1,1,1),new de(3,0,1,1),new de(1,0,1,1)],this._cubeDirections=[new I(1,0,0),new I(-1,0,0),new I(0,0,1),new I(0,0,-1),new I(0,1,0),new I(0,-1,0)],this._cubeUps=[new I(0,1,0),new I(0,1,0),new I(0,1,0),new I(0,1,0),new I(0,0,1),new I(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,s=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),os.setFromMatrixPosition(t.matrixWorld),n.position.copy(os),_o.copy(n.position),_o.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(_o),n.updateMatrixWorld(),s.makeTranslation(-os.x,-os.y,-os.z),Ul.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ul)}}class Xu extends za{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Wu}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class oh extends Yc{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,o=n+t,a=s+e,l=s-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class Yu extends rh{constructor(){super(new oh(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class xo extends za{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Te.DEFAULT_UP),this.updateMatrix(),this.target=new Te,this.shadow=new Yu}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class qu extends je{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class $u{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Nl(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=Nl();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function Nl(){return performance.now()}function Fl(i,t,e,n){const s=ju(n);switch(e){case Pc:return i*t;case Ic:return i*t;case Dc:return i*t*2;case Aa:return i*t/s.components*s.byteLength;case Ca:return i*t/s.components*s.byteLength;case Uc:return i*t*2/s.components*s.byteLength;case Ra:return i*t*2/s.components*s.byteLength;case Lc:return i*t*3/s.components*s.byteLength;case un:return i*t*4/s.components*s.byteLength;case Pa:return i*t*4/s.components*s.byteLength;case vr:case _r:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case xr:case yr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Xo:case qo:return Math.max(i,16)*Math.max(t,8)/4;case Wo:case Yo:return Math.max(i,8)*Math.max(t,8)/2;case $o:case jo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Zo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Jo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ko:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Qo:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case ta:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case ea:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case na:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case ia:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case sa:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case ra:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case oa:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case aa:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case la:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case ca:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case ha:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case br:case da:case ua:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Nc:case fa:return Math.ceil(i/4)*Math.ceil(t/4)*8;case pa:case ma:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function ju(i){switch(i){case Ln:case Ac:return{byteLength:1,components:1};case ys:case Cc:case Ts:return{byteLength:2,components:1};case Ea:case Ta:return{byteLength:2,components:4};case hi:case Sa:case Cn:return{byteLength:4,components:1};case Rc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:wa}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=wa);/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function ah(){let i=null,t=!1,e=null,n=null;function s(r,o){e(r,o),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function Zu(i){const t=new WeakMap;function e(a,l){const c=a.array,h=a.usage,d=c.byteLength,u=i.createBuffer();i.bindBuffer(l,u),i.bufferData(l,c,h),a.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:d}}function n(a,l,c){const h=l.array,d=l.updateRanges;if(i.bindBuffer(c,a),d.length===0)i.bufferSubData(c,0,h);else{d.sort((f,g)=>f.start-g.start);let u=0;for(let f=1;f<d.length;f++){const g=d[u],x=d[f];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++u,d[u]=x)}d.length=u+1;for(let f=0,g=d.length;f<g;f++){const x=d[f];i.bufferSubData(c,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=t.get(a);l&&(i.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}var Ju=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Ku=`#ifdef USE_ALPHAHASH
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
#endif`,Qu=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,tf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ef=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,nf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,sf=`#ifdef USE_AOMAP
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
#endif`,rf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,of=`#ifdef USE_BATCHING
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
#endif`,af=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,lf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,cf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,hf=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,df=`#ifdef USE_IRIDESCENCE
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
#endif`,uf=`#ifdef USE_BUMPMAP
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
#endif`,ff=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,pf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,mf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,gf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,vf=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,_f=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,xf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,yf=`#if defined( USE_COLOR_ALPHA )
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
#endif`,bf=`#define PI 3.141592653589793
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
} // validated`,Mf=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,wf=`vec3 transformedNormal = objectNormal;
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
#endif`,Sf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Ef=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Tf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Af=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Cf="gl_FragColor = linearToOutputTexel( gl_FragColor );",Rf=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Pf=`#ifdef USE_ENVMAP
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
#endif`,Lf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,If=`#ifdef USE_ENVMAP
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
#endif`,Df=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Uf=`#ifdef USE_ENVMAP
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
#endif`,Nf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Ff=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Of=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Bf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,kf=`#ifdef USE_GRADIENTMAP
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
}`,zf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Gf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Hf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Vf=`uniform bool receiveShadow;
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
#endif`,Wf=`#ifdef USE_ENVMAP
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
#endif`,Xf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Yf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,qf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,$f=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,jf=`PhysicalMaterial material;
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
#endif`,Zf=`struct PhysicalMaterial {
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
}`,Jf=`
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
#endif`,Kf=`#if defined( RE_IndirectDiffuse )
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
#endif`,Qf=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,tp=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,ep=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,np=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ip=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,sp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,rp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,op=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,ap=`#if defined( USE_POINTS_UV )
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
#endif`,lp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,cp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,hp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,dp=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,up=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,fp=`#ifdef USE_MORPHTARGETS
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
#endif`,pp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,mp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,gp=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,vp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,_p=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,xp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,yp=`#ifdef USE_NORMALMAP
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
#endif`,bp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Mp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,wp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Sp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Ep=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Tp=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Ap=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Cp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Rp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Pp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Lp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Ip=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Dp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Up=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Np=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Fp=`float getShadowMask() {
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
}`,Op=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Bp=`#ifdef USE_SKINNING
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
#endif`,kp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,zp=`#ifdef USE_SKINNING
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
#endif`,Gp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Hp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Vp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Wp=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Xp=`#ifdef USE_TRANSMISSION
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
#endif`,Yp=`#ifdef USE_TRANSMISSION
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
#endif`,qp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,$p=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,jp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Zp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Jp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Kp=`uniform sampler2D t2D;
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
}`,Qp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,tm=`#ifdef ENVMAP_TYPE_CUBE
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
}`,em=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,nm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,im=`#include <common>
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
}`,sm=`#if DEPTH_PACKING == 3200
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
}`,rm=`#define DISTANCE
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
}`,om=`#define DISTANCE
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
}`,am=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,lm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cm=`uniform float scale;
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
}`,hm=`uniform vec3 diffuse;
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
}`,dm=`#include <common>
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
}`,um=`uniform vec3 diffuse;
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
}`,fm=`#define LAMBERT
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
}`,pm=`#define LAMBERT
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
}`,mm=`#define MATCAP
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
}`,gm=`#define MATCAP
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
}`,vm=`#define NORMAL
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
}`,_m=`#define NORMAL
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
}`,xm=`#define PHONG
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
}`,ym=`#define PHONG
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
}`,bm=`#define STANDARD
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
}`,Mm=`#define STANDARD
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
}`,wm=`#define TOON
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
}`,Sm=`#define TOON
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
}`,Em=`uniform float size;
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
}`,Tm=`uniform vec3 diffuse;
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
}`,Am=`#include <common>
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
}`,Cm=`uniform vec3 color;
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
}`,Rm=`uniform float rotation;
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
}`,Pm=`uniform vec3 diffuse;
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
}`,Wt={alphahash_fragment:Ju,alphahash_pars_fragment:Ku,alphamap_fragment:Qu,alphamap_pars_fragment:tf,alphatest_fragment:ef,alphatest_pars_fragment:nf,aomap_fragment:sf,aomap_pars_fragment:rf,batching_pars_vertex:of,batching_vertex:af,begin_vertex:lf,beginnormal_vertex:cf,bsdfs:hf,iridescence_fragment:df,bumpmap_pars_fragment:uf,clipping_planes_fragment:ff,clipping_planes_pars_fragment:pf,clipping_planes_pars_vertex:mf,clipping_planes_vertex:gf,color_fragment:vf,color_pars_fragment:_f,color_pars_vertex:xf,color_vertex:yf,common:bf,cube_uv_reflection_fragment:Mf,defaultnormal_vertex:wf,displacementmap_pars_vertex:Sf,displacementmap_vertex:Ef,emissivemap_fragment:Tf,emissivemap_pars_fragment:Af,colorspace_fragment:Cf,colorspace_pars_fragment:Rf,envmap_fragment:Pf,envmap_common_pars_fragment:Lf,envmap_pars_fragment:If,envmap_pars_vertex:Df,envmap_physical_pars_fragment:Wf,envmap_vertex:Uf,fog_vertex:Nf,fog_pars_vertex:Ff,fog_fragment:Of,fog_pars_fragment:Bf,gradientmap_pars_fragment:kf,lightmap_pars_fragment:zf,lights_lambert_fragment:Gf,lights_lambert_pars_fragment:Hf,lights_pars_begin:Vf,lights_toon_fragment:Xf,lights_toon_pars_fragment:Yf,lights_phong_fragment:qf,lights_phong_pars_fragment:$f,lights_physical_fragment:jf,lights_physical_pars_fragment:Zf,lights_fragment_begin:Jf,lights_fragment_maps:Kf,lights_fragment_end:Qf,logdepthbuf_fragment:tp,logdepthbuf_pars_fragment:ep,logdepthbuf_pars_vertex:np,logdepthbuf_vertex:ip,map_fragment:sp,map_pars_fragment:rp,map_particle_fragment:op,map_particle_pars_fragment:ap,metalnessmap_fragment:lp,metalnessmap_pars_fragment:cp,morphinstance_vertex:hp,morphcolor_vertex:dp,morphnormal_vertex:up,morphtarget_pars_vertex:fp,morphtarget_vertex:pp,normal_fragment_begin:mp,normal_fragment_maps:gp,normal_pars_fragment:vp,normal_pars_vertex:_p,normal_vertex:xp,normalmap_pars_fragment:yp,clearcoat_normal_fragment_begin:bp,clearcoat_normal_fragment_maps:Mp,clearcoat_pars_fragment:wp,iridescence_pars_fragment:Sp,opaque_fragment:Ep,packing:Tp,premultiplied_alpha_fragment:Ap,project_vertex:Cp,dithering_fragment:Rp,dithering_pars_fragment:Pp,roughnessmap_fragment:Lp,roughnessmap_pars_fragment:Ip,shadowmap_pars_fragment:Dp,shadowmap_pars_vertex:Up,shadowmap_vertex:Np,shadowmask_pars_fragment:Fp,skinbase_vertex:Op,skinning_pars_vertex:Bp,skinning_vertex:kp,skinnormal_vertex:zp,specularmap_fragment:Gp,specularmap_pars_fragment:Hp,tonemapping_fragment:Vp,tonemapping_pars_fragment:Wp,transmission_fragment:Xp,transmission_pars_fragment:Yp,uv_pars_fragment:qp,uv_pars_vertex:$p,uv_vertex:jp,worldpos_vertex:Zp,background_vert:Jp,background_frag:Kp,backgroundCube_vert:Qp,backgroundCube_frag:tm,cube_vert:em,cube_frag:nm,depth_vert:im,depth_frag:sm,distanceRGBA_vert:rm,distanceRGBA_frag:om,equirect_vert:am,equirect_frag:lm,linedashed_vert:cm,linedashed_frag:hm,meshbasic_vert:dm,meshbasic_frag:um,meshlambert_vert:fm,meshlambert_frag:pm,meshmatcap_vert:mm,meshmatcap_frag:gm,meshnormal_vert:vm,meshnormal_frag:_m,meshphong_vert:xm,meshphong_frag:ym,meshphysical_vert:bm,meshphysical_frag:Mm,meshtoon_vert:wm,meshtoon_frag:Sm,points_vert:Em,points_frag:Tm,shadow_vert:Am,shadow_frag:Cm,sprite_vert:Rm,sprite_frag:Pm},ct={common:{diffuse:{value:new Yt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ht},alphaMap:{value:null},alphaMapTransform:{value:new Ht},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ht}},envmap:{envMap:{value:null},envMapRotation:{value:new Ht},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ht}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ht}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ht},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ht},normalScale:{value:new ot(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ht},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ht}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ht}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ht}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Yt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Yt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ht},alphaTest:{value:0},uvTransform:{value:new Ht}},sprite:{diffuse:{value:new Yt(16777215)},opacity:{value:1},center:{value:new ot(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ht},alphaMap:{value:null},alphaMapTransform:{value:new Ht},alphaTest:{value:0}}},mn={basic:{uniforms:ke([ct.common,ct.specularmap,ct.envmap,ct.aomap,ct.lightmap,ct.fog]),vertexShader:Wt.meshbasic_vert,fragmentShader:Wt.meshbasic_frag},lambert:{uniforms:ke([ct.common,ct.specularmap,ct.envmap,ct.aomap,ct.lightmap,ct.emissivemap,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.fog,ct.lights,{emissive:{value:new Yt(0)}}]),vertexShader:Wt.meshlambert_vert,fragmentShader:Wt.meshlambert_frag},phong:{uniforms:ke([ct.common,ct.specularmap,ct.envmap,ct.aomap,ct.lightmap,ct.emissivemap,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.fog,ct.lights,{emissive:{value:new Yt(0)},specular:{value:new Yt(1118481)},shininess:{value:30}}]),vertexShader:Wt.meshphong_vert,fragmentShader:Wt.meshphong_frag},standard:{uniforms:ke([ct.common,ct.envmap,ct.aomap,ct.lightmap,ct.emissivemap,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.roughnessmap,ct.metalnessmap,ct.fog,ct.lights,{emissive:{value:new Yt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Wt.meshphysical_vert,fragmentShader:Wt.meshphysical_frag},toon:{uniforms:ke([ct.common,ct.aomap,ct.lightmap,ct.emissivemap,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.gradientmap,ct.fog,ct.lights,{emissive:{value:new Yt(0)}}]),vertexShader:Wt.meshtoon_vert,fragmentShader:Wt.meshtoon_frag},matcap:{uniforms:ke([ct.common,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.fog,{matcap:{value:null}}]),vertexShader:Wt.meshmatcap_vert,fragmentShader:Wt.meshmatcap_frag},points:{uniforms:ke([ct.points,ct.fog]),vertexShader:Wt.points_vert,fragmentShader:Wt.points_frag},dashed:{uniforms:ke([ct.common,ct.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Wt.linedashed_vert,fragmentShader:Wt.linedashed_frag},depth:{uniforms:ke([ct.common,ct.displacementmap]),vertexShader:Wt.depth_vert,fragmentShader:Wt.depth_frag},normal:{uniforms:ke([ct.common,ct.bumpmap,ct.normalmap,ct.displacementmap,{opacity:{value:1}}]),vertexShader:Wt.meshnormal_vert,fragmentShader:Wt.meshnormal_frag},sprite:{uniforms:ke([ct.sprite,ct.fog]),vertexShader:Wt.sprite_vert,fragmentShader:Wt.sprite_frag},background:{uniforms:{uvTransform:{value:new Ht},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Wt.background_vert,fragmentShader:Wt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ht}},vertexShader:Wt.backgroundCube_vert,fragmentShader:Wt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Wt.cube_vert,fragmentShader:Wt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Wt.equirect_vert,fragmentShader:Wt.equirect_frag},distanceRGBA:{uniforms:ke([ct.common,ct.displacementmap,{referencePosition:{value:new I},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Wt.distanceRGBA_vert,fragmentShader:Wt.distanceRGBA_frag},shadow:{uniforms:ke([ct.lights,ct.fog,{color:{value:new Yt(0)},opacity:{value:1}}]),vertexShader:Wt.shadow_vert,fragmentShader:Wt.shadow_frag}};mn.physical={uniforms:ke([mn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ht},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ht},clearcoatNormalScale:{value:new ot(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ht},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ht},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ht},sheen:{value:0},sheenColor:{value:new Yt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ht},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ht},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ht},transmissionSamplerSize:{value:new ot},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ht},attenuationDistance:{value:0},attenuationColor:{value:new Yt(0)},specularColor:{value:new Yt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ht},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ht},anisotropyVector:{value:new ot},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ht}}]),vertexShader:Wt.meshphysical_vert,fragmentShader:Wt.meshphysical_frag};const cr={r:0,b:0,g:0},ei=new In,Lm=new pe;function Im(i,t,e,n,s,r,o){const a=new Yt(0);let l=r===!0?0:1,c,h,d=null,u=0,f=null;function g(_){let v=_.isScene===!0?_.background:null;return v&&v.isTexture&&(v=(_.backgroundBlurriness>0?e:t).get(v)),v}function x(_){let v=!1;const P=g(_);P===null?p(a,l):P&&P.isColor&&(p(P,1),v=!0);const T=i.xr.getEnvironmentBlendMode();T==="additive"?n.buffers.color.setClear(0,0,0,1,o):T==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||v)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(_,v){const P=g(v);P&&(P.isCubeTexture||P.mapping===Fr)?(h===void 0&&(h=new jt(new fe(1,1,1),new qn({name:"BackgroundCubeMaterial",uniforms:$i(mn.backgroundCube.uniforms),vertexShader:mn.backgroundCube.vertexShader,fragmentShader:mn.backgroundCube.fragmentShader,side:Ve,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(T,E,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),ei.copy(v.backgroundRotation),ei.x*=-1,ei.y*=-1,ei.z*=-1,P.isCubeTexture&&P.isRenderTargetTexture===!1&&(ei.y*=-1,ei.z*=-1),h.material.uniforms.envMap.value=P,h.material.uniforms.flipEnvMap.value=P.isCubeTexture&&P.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Lm.makeRotationFromEuler(ei)),h.material.toneMapped=ee.getTransfer(P.colorSpace)!==he,(d!==P||u!==P.version||f!==i.toneMapping)&&(h.material.needsUpdate=!0,d=P,u=P.version,f=i.toneMapping),h.layers.enableAll(),_.unshift(h,h.geometry,h.material,0,0,null)):P&&P.isTexture&&(c===void 0&&(c=new jt(new Dn(2,2),new qn({name:"BackgroundMaterial",uniforms:$i(mn.background.uniforms),vertexShader:mn.background.vertexShader,fragmentShader:mn.background.fragmentShader,side:Yn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=P,c.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,c.material.toneMapped=ee.getTransfer(P.colorSpace)!==he,P.matrixAutoUpdate===!0&&P.updateMatrix(),c.material.uniforms.uvTransform.value.copy(P.matrix),(d!==P||u!==P.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,d=P,u=P.version,f=i.toneMapping),c.layers.enableAll(),_.unshift(c,c.geometry,c.material,0,0,null))}function p(_,v){_.getRGB(cr,Xc(i)),n.buffers.color.setClear(cr.r,cr.g,cr.b,v,o)}function b(){h!==void 0&&(h.geometry.dispose(),h.material.dispose()),c!==void 0&&(c.geometry.dispose(),c.material.dispose())}return{getClearColor:function(){return a},setClearColor:function(_,v=1){a.set(_),l=v,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(_){l=_,p(a,l)},render:x,addToRenderList:m,dispose:b}}function Dm(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=u(null);let r=s,o=!1;function a(y,D,B,k,X){let Y=!1;const V=d(k,B,D);r!==V&&(r=V,c(r.object)),Y=f(y,k,B,X),Y&&g(y,k,B,X),X!==null&&t.update(X,i.ELEMENT_ARRAY_BUFFER),(Y||o)&&(o=!1,v(y,D,B,k),X!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(X).buffer))}function l(){return i.createVertexArray()}function c(y){return i.bindVertexArray(y)}function h(y){return i.deleteVertexArray(y)}function d(y,D,B){const k=B.wireframe===!0;let X=n[y.id];X===void 0&&(X={},n[y.id]=X);let Y=X[D.id];Y===void 0&&(Y={},X[D.id]=Y);let V=Y[k];return V===void 0&&(V=u(l()),Y[k]=V),V}function u(y){const D=[],B=[],k=[];for(let X=0;X<e;X++)D[X]=0,B[X]=0,k[X]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:B,attributeDivisors:k,object:y,attributes:{},index:null}}function f(y,D,B,k){const X=r.attributes,Y=D.attributes;let V=0;const J=B.getAttributes();for(const H in J)if(J[H].location>=0){const vt=X[H];let wt=Y[H];if(wt===void 0&&(H==="instanceMatrix"&&y.instanceMatrix&&(wt=y.instanceMatrix),H==="instanceColor"&&y.instanceColor&&(wt=y.instanceColor)),vt===void 0||vt.attribute!==wt||wt&&vt.data!==wt.data)return!0;V++}return r.attributesNum!==V||r.index!==k}function g(y,D,B,k){const X={},Y=D.attributes;let V=0;const J=B.getAttributes();for(const H in J)if(J[H].location>=0){let vt=Y[H];vt===void 0&&(H==="instanceMatrix"&&y.instanceMatrix&&(vt=y.instanceMatrix),H==="instanceColor"&&y.instanceColor&&(vt=y.instanceColor));const wt={};wt.attribute=vt,vt&&vt.data&&(wt.data=vt.data),X[H]=wt,V++}r.attributes=X,r.attributesNum=V,r.index=k}function x(){const y=r.newAttributes;for(let D=0,B=y.length;D<B;D++)y[D]=0}function m(y){p(y,0)}function p(y,D){const B=r.newAttributes,k=r.enabledAttributes,X=r.attributeDivisors;B[y]=1,k[y]===0&&(i.enableVertexAttribArray(y),k[y]=1),X[y]!==D&&(i.vertexAttribDivisor(y,D),X[y]=D)}function b(){const y=r.newAttributes,D=r.enabledAttributes;for(let B=0,k=D.length;B<k;B++)D[B]!==y[B]&&(i.disableVertexAttribArray(B),D[B]=0)}function _(y,D,B,k,X,Y,V){V===!0?i.vertexAttribIPointer(y,D,B,X,Y):i.vertexAttribPointer(y,D,B,k,X,Y)}function v(y,D,B,k){x();const X=k.attributes,Y=B.getAttributes(),V=D.defaultAttributeValues;for(const J in Y){const H=Y[J];if(H.location>=0){let lt=X[J];if(lt===void 0&&(J==="instanceMatrix"&&y.instanceMatrix&&(lt=y.instanceMatrix),J==="instanceColor"&&y.instanceColor&&(lt=y.instanceColor)),lt!==void 0){const vt=lt.normalized,wt=lt.itemSize,zt=t.get(lt);if(zt===void 0)continue;const se=zt.buffer,j=zt.type,st=zt.bytesPerElement,Tt=j===i.INT||j===i.UNSIGNED_INT||lt.gpuType===Sa;if(lt.isInterleavedBufferAttribute){const at=lt.data,Rt=at.stride,Ot=lt.offset;if(at.isInstancedInterleavedBuffer){for(let Ut=0;Ut<H.locationSize;Ut++)p(H.location+Ut,at.meshPerAttribute);y.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=at.meshPerAttribute*at.count)}else for(let Ut=0;Ut<H.locationSize;Ut++)m(H.location+Ut);i.bindBuffer(i.ARRAY_BUFFER,se);for(let Ut=0;Ut<H.locationSize;Ut++)_(H.location+Ut,wt/H.locationSize,j,vt,Rt*st,(Ot+wt/H.locationSize*Ut)*st,Tt)}else{if(lt.isInstancedBufferAttribute){for(let at=0;at<H.locationSize;at++)p(H.location+at,lt.meshPerAttribute);y.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=lt.meshPerAttribute*lt.count)}else for(let at=0;at<H.locationSize;at++)m(H.location+at);i.bindBuffer(i.ARRAY_BUFFER,se);for(let at=0;at<H.locationSize;at++)_(H.location+at,wt/H.locationSize,j,vt,wt*st,wt/H.locationSize*at*st,Tt)}}else if(V!==void 0){const vt=V[J];if(vt!==void 0)switch(vt.length){case 2:i.vertexAttrib2fv(H.location,vt);break;case 3:i.vertexAttrib3fv(H.location,vt);break;case 4:i.vertexAttrib4fv(H.location,vt);break;default:i.vertexAttrib1fv(H.location,vt)}}}}b()}function P(){R();for(const y in n){const D=n[y];for(const B in D){const k=D[B];for(const X in k)h(k[X].object),delete k[X];delete D[B]}delete n[y]}}function T(y){if(n[y.id]===void 0)return;const D=n[y.id];for(const B in D){const k=D[B];for(const X in k)h(k[X].object),delete k[X];delete D[B]}delete n[y.id]}function E(y){for(const D in n){const B=n[D];if(B[y.id]===void 0)continue;const k=B[y.id];for(const X in k)h(k[X].object),delete k[X];delete B[y.id]}}function R(){w(),o=!0,r!==s&&(r=s,c(r.object))}function w(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:R,resetDefaultState:w,dispose:P,releaseStatesOfGeometry:T,releaseStatesOfProgram:E,initAttributes:x,enableAttribute:m,disableUnusedAttributes:b}}function Um(i,t,e){let n;function s(c){n=c}function r(c,h){i.drawArrays(n,c,h),e.update(h,n,1)}function o(c,h,d){d!==0&&(i.drawArraysInstanced(n,c,h,d),e.update(h,n,d))}function a(c,h,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,d);let f=0;for(let g=0;g<d;g++)f+=h[g];e.update(f,n,1)}function l(c,h,d,u){if(d===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<c.length;g++)o(c[g],h[g],u[g]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,h,0,u,0,d);let g=0;for(let x=0;x<d;x++)g+=h[x]*u[x];e.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function Nm(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const E=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(E.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(E){return!(E!==un&&n.convert(E)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(E){const R=E===Ts&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(E!==Ln&&n.convert(E)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&E!==Cn&&!R)}function l(E){if(E==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";E="mediump"}return E==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const d=e.logarithmicDepthBuffer===!0,u=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),b=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),_=i.getParameter(i.MAX_VARYING_VECTORS),v=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),P=g>0,T=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:d,reverseDepthBuffer:u,maxTextures:f,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:b,maxVaryings:_,maxFragmentUniforms:v,vertexTextures:P,maxSamples:T}}function Fm(i){const t=this;let e=null,n=0,s=!1,r=!1;const o=new ii,a=new Ht,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){const f=d.length!==0||u||n!==0||s;return s=u,n=d.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){e=h(d,u,0)},this.setState=function(d,u,f){const g=d.clippingPlanes,x=d.clipIntersection,m=d.clipShadows,p=i.get(d);if(!s||g===null||g.length===0||r&&!m)r?h(null):c();else{const b=r?0:n,_=b*4;let v=p.clippingState||null;l.value=v,v=h(g,u,_,f);for(let P=0;P!==_;++P)v[P]=e[P];p.clippingState=v,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=b}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(d,u,f,g){const x=d!==null?d.length:0;let m=null;if(x!==0){if(m=l.value,g!==!0||m===null){const p=f+x*4,b=u.matrixWorldInverse;a.getNormalMatrix(b),(m===null||m.length<p)&&(m=new Float32Array(p));for(let _=0,v=f;_!==x;++_,v+=4)o.copy(d[_]).applyMatrix4(b,a),o.normal.toArray(m,v),m[v+3]=o.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,m}}function Om(i){let t=new WeakMap;function e(o,a){return a===Go?o.mapping=Hi:a===Ho&&(o.mapping=Vi),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===Go||a===Ho)if(t.has(o)){const l=t.get(o).texture;return e(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new ru(l.height);return c.fromEquirectangularTexture(i,o),t.set(o,c),o.addEventListener("dispose",s),e(c.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}const Oi=4,Ol=[.125,.215,.35,.446,.526,.582],ai=20,yo=new oh,Bl=new Yt;let bo=null,Mo=0,wo=0,So=!1;const si=(1+Math.sqrt(5))/2,Pi=1/si,kl=[new I(-si,Pi,0),new I(si,Pi,0),new I(-Pi,0,si),new I(Pi,0,si),new I(0,si,-Pi),new I(0,si,Pi),new I(-1,1,-1),new I(1,1,-1),new I(-1,1,1),new I(1,1,1)];class zl{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100){bo=this._renderer.getRenderTarget(),Mo=this._renderer.getActiveCubeFace(),wo=this._renderer.getActiveMipmapLevel(),So=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Vl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Hl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(bo,Mo,wo),this._renderer.xr.enabled=So,t.scissorTest=!1,hr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Hi||t.mapping===Vi?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),bo=this._renderer.getRenderTarget(),Mo=this._renderer.getActiveCubeFace(),wo=this._renderer.getActiveMipmapLevel(),So=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:gn,minFilter:gn,generateMipmaps:!1,type:Ts,format:un,colorSpace:qi,depthBuffer:!1},s=Gl(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Gl(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Bm(r)),this._blurMaterial=km(r,t,e)}return s}_compileMaterial(t){const e=new jt(this._lodPlanes[0],t);this._renderer.compile(e,yo)}_sceneToCubeUV(t,e,n,s){const a=new je(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,u=h.toneMapping;h.getClearColor(Bl),h.toneMapping=Wn,h.autoClear=!1;const f=new Da({name:"PMREM.Background",side:Ve,depthWrite:!1,depthTest:!1}),g=new jt(new fe,f);let x=!1;const m=t.background;m?m.isColor&&(f.color.copy(m),t.background=null,x=!0):(f.color.copy(Bl),x=!0);for(let p=0;p<6;p++){const b=p%3;b===0?(a.up.set(0,l[p],0),a.lookAt(c[p],0,0)):b===1?(a.up.set(0,0,l[p]),a.lookAt(0,c[p],0)):(a.up.set(0,l[p],0),a.lookAt(0,0,c[p]));const _=this._cubeSize;hr(s,b*_,p>2?_:0,_,_),h.setRenderTarget(s),x&&h.render(g,a),h.render(t,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=u,h.autoClear=d,t.background=m}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===Hi||t.mapping===Vi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Vl()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Hl());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new jt(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;const l=this._cubeSize;hr(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(o,yo)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=kl[(s-r-1)%kl.length];this._blur(t,r-1,r,o,a)}e.autoClear=n}_blur(t,e,n,s,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,s,"latitudinal",r),this._halfBlur(o,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,d=new jt(this._lodPlanes[s],c),u=c.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*ai-1),x=r/g,m=isFinite(r)?1+Math.floor(h*x):ai;m>ai&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${ai}`);const p=[];let b=0;for(let E=0;E<ai;++E){const R=E/x,w=Math.exp(-R*R/2);p.push(w),E===0?b+=w:E<m&&(b+=2*w)}for(let E=0;E<p.length;E++)p[E]=p[E]/b;u.envMap.value=t.texture,u.samples.value=m,u.weights.value=p,u.latitudinal.value=o==="latitudinal",a&&(u.poleAxis.value=a);const{_lodMax:_}=this;u.dTheta.value=g,u.mipInt.value=_-n;const v=this._sizeLods[s],P=3*v*(s>_-Oi?s-_+Oi:0),T=4*(this._cubeSize-v);hr(e,P,T,3*v,2*v),l.setRenderTarget(e),l.render(d,yo)}}function Bm(i){const t=[],e=[],n=[];let s=i;const r=i-Oi+1+Ol.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);e.push(a);let l=1/a;o>i-Oi?l=Ol[o-i+Oi-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),h=-c,d=1+c,u=[h,h,d,h,d,d,h,h,d,d,h,d],f=6,g=6,x=3,m=2,p=1,b=new Float32Array(x*g*f),_=new Float32Array(m*g*f),v=new Float32Array(p*g*f);for(let T=0;T<f;T++){const E=T%3*2/3-1,R=T>2?0:-1,w=[E,R,0,E+2/3,R,0,E+2/3,R+1,0,E,R,0,E+2/3,R+1,0,E,R+1,0];b.set(w,x*g*T),_.set(u,m*g*T);const y=[T,T,T,T,T,T];v.set(y,p*g*T)}const P=new _e;P.setAttribute("position",new We(b,x)),P.setAttribute("uv",new We(_,m)),P.setAttribute("faceIndex",new We(v,p)),t.push(P),s>Oi&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Gl(i,t,e){const n=new di(i,t,e);return n.texture.mapping=Fr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function hr(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function km(i,t,e){const n=new Float32Array(ai),s=new I(0,1,0);return new qn({name:"SphericalGaussianBlur",defines:{n:ai,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Ga(),fragmentShader:`

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
		`,blending:Vn,depthTest:!1,depthWrite:!1})}function Hl(){return new qn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ga(),fragmentShader:`

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
		`,blending:Vn,depthTest:!1,depthWrite:!1})}function Vl(){return new qn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ga(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Vn,depthTest:!1,depthWrite:!1})}function Ga(){return`

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
	`}function zm(i){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===Go||l===Ho,h=l===Hi||l===Vi;if(c||h){let d=t.get(a);const u=d!==void 0?d.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==u)return e===null&&(e=new zl(i)),d=c?e.fromEquirectangular(a,d):e.fromCubemap(a,d),d.texture.pmremVersion=a.pmremVersion,t.set(a,d),d.texture;if(d!==void 0)return d.texture;{const f=a.image;return c&&f&&f.height>0||h&&f&&s(f)?(e===null&&(e=new zl(i)),d=c?e.fromEquirectangular(a):e.fromCubemap(a),d.texture.pmremVersion=a.pmremVersion,t.set(a,d),a.addEventListener("dispose",r),d.texture):null}}}return a}function s(a){let l=0;const c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function r(a){const l=a.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function Gm(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&Ui("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function Hm(i,t,e,n){const s={},r=new WeakMap;function o(d){const u=d.target;u.index!==null&&t.remove(u.index);for(const g in u.attributes)t.remove(u.attributes[g]);u.removeEventListener("dispose",o),delete s[u.id];const f=r.get(u);f&&(t.remove(f),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function a(d,u){return s[u.id]===!0||(u.addEventListener("dispose",o),s[u.id]=!0,e.memory.geometries++),u}function l(d){const u=d.attributes;for(const f in u)t.update(u[f],i.ARRAY_BUFFER)}function c(d){const u=[],f=d.index,g=d.attributes.position;let x=0;if(f!==null){const b=f.array;x=f.version;for(let _=0,v=b.length;_<v;_+=3){const P=b[_+0],T=b[_+1],E=b[_+2];u.push(P,T,T,E,E,P)}}else if(g!==void 0){const b=g.array;x=g.version;for(let _=0,v=b.length/3-1;_<v;_+=3){const P=_+0,T=_+1,E=_+2;u.push(P,T,T,E,E,P)}}else return;const m=new(Bc(u)?Wc:Vc)(u,1);m.version=x;const p=r.get(d);p&&t.remove(p),r.set(d,m)}function h(d){const u=r.get(d);if(u){const f=d.index;f!==null&&u.version<f.version&&c(d)}else c(d);return r.get(d)}return{get:a,update:l,getWireframeAttribute:h}}function Vm(i,t,e){let n;function s(u){n=u}let r,o;function a(u){r=u.type,o=u.bytesPerElement}function l(u,f){i.drawElements(n,f,r,u*o),e.update(f,n,1)}function c(u,f,g){g!==0&&(i.drawElementsInstanced(n,f,r,u*o,g),e.update(f,n,g))}function h(u,f,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,u,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];e.update(m,n,1)}function d(u,f,g,x){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<u.length;p++)c(u[p]/o,f[p],x[p]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,r,u,0,x,0,g);let p=0;for(let b=0;b<g;b++)p+=f[b]*x[b];e.update(p,n,1)}}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=d}function Wm(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function Xm(i,t,e){const n=new WeakMap,s=new de;function r(o,a,l){const c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=h!==void 0?h.length:0;let u=n.get(a);if(u===void 0||u.count!==d){let y=function(){R.dispose(),n.delete(a),a.removeEventListener("dispose",y)};var f=y;u!==void 0&&u.texture.dispose();const g=a.morphAttributes.position!==void 0,x=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],b=a.morphAttributes.normal||[],_=a.morphAttributes.color||[];let v=0;g===!0&&(v=1),x===!0&&(v=2),m===!0&&(v=3);let P=a.attributes.position.count*v,T=1;P>t.maxTextureSize&&(T=Math.ceil(P/t.maxTextureSize),P=t.maxTextureSize);const E=new Float32Array(P*T*4*d),R=new zc(E,P,T,d);R.type=Cn,R.needsUpdate=!0;const w=v*4;for(let D=0;D<d;D++){const B=p[D],k=b[D],X=_[D],Y=P*T*4*D;for(let V=0;V<B.count;V++){const J=V*w;g===!0&&(s.fromBufferAttribute(B,V),E[Y+J+0]=s.x,E[Y+J+1]=s.y,E[Y+J+2]=s.z,E[Y+J+3]=0),x===!0&&(s.fromBufferAttribute(k,V),E[Y+J+4]=s.x,E[Y+J+5]=s.y,E[Y+J+6]=s.z,E[Y+J+7]=0),m===!0&&(s.fromBufferAttribute(X,V),E[Y+J+8]=s.x,E[Y+J+9]=s.y,E[Y+J+10]=s.z,E[Y+J+11]=X.itemSize===4?s.w:1)}}u={count:d,texture:R,size:new ot(P,T)},n.set(a,u),a.addEventListener("dispose",y)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];const x=a.morphTargetsRelative?1:1-g;l.getUniforms().setValue(i,"morphTargetBaseInfluence",x),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",u.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:r}}function Ym(i,t,e,n){let s=new WeakMap;function r(l){const c=n.render.frame,h=l.geometry,d=t.get(l,h);if(s.get(d)!==c&&(t.update(d),s.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const u=l.skeleton;s.get(u)!==c&&(u.update(),s.set(u,c))}return d}function o(){s=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:o}}const lh=new De,Wl=new jc(1,1),ch=new zc,hh=new Vd,dh=new qc,Xl=[],Yl=[],ql=new Float32Array(16),$l=new Float32Array(9),jl=new Float32Array(4);function Ki(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=Xl[s];if(r===void 0&&(r=new Float32Array(s),Xl[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function Ae(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Ce(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function zr(i,t){let e=Yl[t];e===void 0&&(e=new Int32Array(t),Yl[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function qm(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function $m(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ae(e,t))return;i.uniform2fv(this.addr,t),Ce(e,t)}}function jm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ae(e,t))return;i.uniform3fv(this.addr,t),Ce(e,t)}}function Zm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ae(e,t))return;i.uniform4fv(this.addr,t),Ce(e,t)}}function Jm(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ae(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Ce(e,t)}else{if(Ae(e,n))return;jl.set(n),i.uniformMatrix2fv(this.addr,!1,jl),Ce(e,n)}}function Km(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ae(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Ce(e,t)}else{if(Ae(e,n))return;$l.set(n),i.uniformMatrix3fv(this.addr,!1,$l),Ce(e,n)}}function Qm(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ae(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Ce(e,t)}else{if(Ae(e,n))return;ql.set(n),i.uniformMatrix4fv(this.addr,!1,ql),Ce(e,n)}}function tg(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function eg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ae(e,t))return;i.uniform2iv(this.addr,t),Ce(e,t)}}function ng(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ae(e,t))return;i.uniform3iv(this.addr,t),Ce(e,t)}}function ig(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ae(e,t))return;i.uniform4iv(this.addr,t),Ce(e,t)}}function sg(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function rg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ae(e,t))return;i.uniform2uiv(this.addr,t),Ce(e,t)}}function og(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ae(e,t))return;i.uniform3uiv(this.addr,t),Ce(e,t)}}function ag(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ae(e,t))return;i.uniform4uiv(this.addr,t),Ce(e,t)}}function lg(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Wl.compareFunction=Oc,r=Wl):r=lh,e.setTexture2D(t||r,s)}function cg(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||hh,s)}function hg(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||dh,s)}function dg(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||ch,s)}function ug(i){switch(i){case 5126:return qm;case 35664:return $m;case 35665:return jm;case 35666:return Zm;case 35674:return Jm;case 35675:return Km;case 35676:return Qm;case 5124:case 35670:return tg;case 35667:case 35671:return eg;case 35668:case 35672:return ng;case 35669:case 35673:return ig;case 5125:return sg;case 36294:return rg;case 36295:return og;case 36296:return ag;case 35678:case 36198:case 36298:case 36306:case 35682:return lg;case 35679:case 36299:case 36307:return cg;case 35680:case 36300:case 36308:case 36293:return hg;case 36289:case 36303:case 36311:case 36292:return dg}}function fg(i,t){i.uniform1fv(this.addr,t)}function pg(i,t){const e=Ki(t,this.size,2);i.uniform2fv(this.addr,e)}function mg(i,t){const e=Ki(t,this.size,3);i.uniform3fv(this.addr,e)}function gg(i,t){const e=Ki(t,this.size,4);i.uniform4fv(this.addr,e)}function vg(i,t){const e=Ki(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function _g(i,t){const e=Ki(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function xg(i,t){const e=Ki(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function yg(i,t){i.uniform1iv(this.addr,t)}function bg(i,t){i.uniform2iv(this.addr,t)}function Mg(i,t){i.uniform3iv(this.addr,t)}function wg(i,t){i.uniform4iv(this.addr,t)}function Sg(i,t){i.uniform1uiv(this.addr,t)}function Eg(i,t){i.uniform2uiv(this.addr,t)}function Tg(i,t){i.uniform3uiv(this.addr,t)}function Ag(i,t){i.uniform4uiv(this.addr,t)}function Cg(i,t,e){const n=this.cache,s=t.length,r=zr(e,s);Ae(n,r)||(i.uniform1iv(this.addr,r),Ce(n,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||lh,r[o])}function Rg(i,t,e){const n=this.cache,s=t.length,r=zr(e,s);Ae(n,r)||(i.uniform1iv(this.addr,r),Ce(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||hh,r[o])}function Pg(i,t,e){const n=this.cache,s=t.length,r=zr(e,s);Ae(n,r)||(i.uniform1iv(this.addr,r),Ce(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||dh,r[o])}function Lg(i,t,e){const n=this.cache,s=t.length,r=zr(e,s);Ae(n,r)||(i.uniform1iv(this.addr,r),Ce(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||ch,r[o])}function Ig(i){switch(i){case 5126:return fg;case 35664:return pg;case 35665:return mg;case 35666:return gg;case 35674:return vg;case 35675:return _g;case 35676:return xg;case 5124:case 35670:return yg;case 35667:case 35671:return bg;case 35668:case 35672:return Mg;case 35669:case 35673:return wg;case 5125:return Sg;case 36294:return Eg;case 36295:return Tg;case 36296:return Ag;case 35678:case 36198:case 36298:case 36306:case 35682:return Cg;case 35679:case 36299:case 36307:return Rg;case 35680:case 36300:case 36308:case 36293:return Pg;case 36289:case 36303:case 36311:case 36292:return Lg}}class Dg{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=ug(e.type)}}class Ug{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Ig(e.type)}}class Ng{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(t,e[a.id],n)}}}const Eo=/(\w+)(\])?(\[|\.)?/g;function Zl(i,t){i.seq.push(t),i.map[t.id]=t}function Fg(i,t,e){const n=i.name,s=n.length;for(Eo.lastIndex=0;;){const r=Eo.exec(n),o=Eo.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){Zl(e,c===void 0?new Dg(a,i,t):new Ug(a,i,t));break}else{let d=e.map[a];d===void 0&&(d=new Ng(a),Zl(e,d)),e=d}}}class Mr{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);Fg(r,o,this)}}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){const a=e[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const o=t[s];o.id in e&&n.push(o)}return n}}function Jl(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const Og=37297;let Bg=0;function kg(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}const Kl=new Ht;function zg(i){ee._getMatrix(Kl,ee.workingColorSpace,i);const t=`mat3( ${Kl.elements.map(e=>e.toFixed(4))} )`;switch(ee.getTransfer(i)){case Sr:return[t,"LinearTransferOETF"];case he:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Ql(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),s=i.getShaderInfoLog(t).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+kg(i.getShaderSource(t),o)}else return s}function Gg(i,t){const e=zg(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function Hg(i,t){let e;switch(t){case td:e="Linear";break;case ed:e="Reinhard";break;case nd:e="Cineon";break;case Ec:e="ACESFilmic";break;case sd:e="AgX";break;case rd:e="Neutral";break;case id:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const dr=new I;function Vg(){ee.getLuminanceCoefficients(dr);const i=dr.x.toFixed(4),t=dr.y.toFixed(4),e=dr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Wg(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(us).join(`
`)}function Xg(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Yg(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),o=r.name;let a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function us(i){return i!==""}function tc(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function ec(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const qg=/^[ \t]*#include +<([\w\d./]+)>/gm;function ya(i){return i.replace(qg,jg)}const $g=new Map;function jg(i,t){let e=Wt[t];if(e===void 0){const n=$g.get(t);if(n!==void 0)e=Wt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return ya(e)}const Zg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function nc(i){return i.replace(Zg,Jg)}function Jg(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function ic(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}function Kg(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Mc?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===wc?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Tn&&(t="SHADOWMAP_TYPE_VSM"),t}function Qg(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Hi:case Vi:t="ENVMAP_TYPE_CUBE";break;case Fr:t="ENVMAP_TYPE_CUBE_UV";break}return t}function t0(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Vi:t="ENVMAP_MODE_REFRACTION";break}return t}function e0(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Sc:t="ENVMAP_BLENDING_MULTIPLY";break;case Kh:t="ENVMAP_BLENDING_MIX";break;case Qh:t="ENVMAP_BLENDING_ADD";break}return t}function n0(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function i0(i,t,e,n){const s=i.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const l=Kg(e),c=Qg(e),h=t0(e),d=e0(e),u=n0(e),f=Wg(e),g=Xg(r),x=s.createProgram();let m,p,b=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(us).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(us).join(`
`),p.length>0&&(p+=`
`)):(m=[ic(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(us).join(`
`),p=[ic(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Wn?"#define TONE_MAPPING":"",e.toneMapping!==Wn?Wt.tonemapping_pars_fragment:"",e.toneMapping!==Wn?Hg("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Wt.colorspace_pars_fragment,Gg("linearToOutputTexel",e.outputColorSpace),Vg(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(us).join(`
`)),o=ya(o),o=tc(o,e),o=ec(o,e),a=ya(a),a=tc(a,e),a=ec(a,e),o=nc(o),a=nc(a),e.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===sl?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===sl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const _=b+m+o,v=b+p+a,P=Jl(s,s.VERTEX_SHADER,_),T=Jl(s,s.FRAGMENT_SHADER,v);s.attachShader(x,P),s.attachShader(x,T),e.index0AttributeName!==void 0?s.bindAttribLocation(x,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function E(D){if(i.debug.checkShaderErrors){const B=s.getProgramInfoLog(x).trim(),k=s.getShaderInfoLog(P).trim(),X=s.getShaderInfoLog(T).trim();let Y=!0,V=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(Y=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,x,P,T);else{const J=Ql(s,P,"vertex"),H=Ql(s,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+B+`
`+J+`
`+H)}else B!==""?console.warn("THREE.WebGLProgram: Program Info Log:",B):(k===""||X==="")&&(V=!1);V&&(D.diagnostics={runnable:Y,programLog:B,vertexShader:{log:k,prefix:m},fragmentShader:{log:X,prefix:p}})}s.deleteShader(P),s.deleteShader(T),R=new Mr(s,x),w=Yg(s,x)}let R;this.getUniforms=function(){return R===void 0&&E(this),R};let w;this.getAttributes=function(){return w===void 0&&E(this),w};let y=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=s.getProgramParameter(x,Og)),y},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Bg++,this.cacheKey=t,this.usedTimes=1,this.program=x,this.vertexShader=P,this.fragmentShader=T,this}let s0=0;class r0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new o0(t),e.set(t,n)),n}}class o0{constructor(t){this.id=s0++,this.code=t,this.usedTimes=0}}function a0(i,t,e,n,s,r,o){const a=new Gc,l=new r0,c=new Set,h=[],d=s.logarithmicDepthBuffer,u=s.vertexTextures;let f=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(w){return c.add(w),w===0?"uv":`uv${w}`}function m(w,y,D,B,k){const X=B.fog,Y=k.geometry,V=w.isMeshStandardMaterial?B.environment:null,J=(w.isMeshStandardMaterial?e:t).get(w.envMap||V),H=J&&J.mapping===Fr?J.image.height:null,lt=g[w.type];w.precision!==null&&(f=s.getMaxPrecision(w.precision),f!==w.precision&&console.warn("THREE.WebGLProgram.getParameters:",w.precision,"not supported, using",f,"instead."));const vt=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,wt=vt!==void 0?vt.length:0;let zt=0;Y.morphAttributes.position!==void 0&&(zt=1),Y.morphAttributes.normal!==void 0&&(zt=2),Y.morphAttributes.color!==void 0&&(zt=3);let se,j,st,Tt;if(lt){const ae=mn[lt];se=ae.vertexShader,j=ae.fragmentShader}else se=w.vertexShader,j=w.fragmentShader,l.update(w),st=l.getVertexShaderID(w),Tt=l.getFragmentShaderID(w);const at=i.getRenderTarget(),Rt=i.state.buffers.depth.getReversed(),Ot=k.isInstancedMesh===!0,Ut=k.isBatchedMesh===!0,Kt=!!w.map,K=!!w.matcap,it=!!J,L=!!w.aoMap,Ct=!!w.lightMap,tt=!!w.bumpMap,xt=!!w.normalMap,rt=!!w.displacementMap,Dt=!!w.emissiveMap,mt=!!w.metalnessMap,A=!!w.roughnessMap,M=w.anisotropy>0,O=w.clearcoat>0,q=w.dispersion>0,Q=w.iridescence>0,$=w.sheen>0,At=w.transmission>0,ht=M&&!!w.anisotropyMap,_t=O&&!!w.clearcoatMap,qt=O&&!!w.clearcoatNormalMap,nt=O&&!!w.clearcoatRoughnessMap,bt=Q&&!!w.iridescenceMap,It=Q&&!!w.iridescenceThicknessMap,Nt=$&&!!w.sheenColorMap,Mt=$&&!!w.sheenRoughnessMap,$t=!!w.specularMap,Vt=!!w.specularColorMap,ue=!!w.specularIntensityMap,U=At&&!!w.transmissionMap,dt=At&&!!w.thicknessMap,W=!!w.gradientMap,Z=!!w.alphaMap,gt=w.alphaTest>0,pt=!!w.alphaHash,Gt=!!w.extensions;let xe=Wn;w.toneMapped&&(at===null||at.isXRRenderTarget===!0)&&(xe=i.toneMapping);const Ue={shaderID:lt,shaderType:w.type,shaderName:w.name,vertexShader:se,fragmentShader:j,defines:w.defines,customVertexShaderID:st,customFragmentShaderID:Tt,isRawShaderMaterial:w.isRawShaderMaterial===!0,glslVersion:w.glslVersion,precision:f,batching:Ut,batchingColor:Ut&&k._colorsTexture!==null,instancing:Ot,instancingColor:Ot&&k.instanceColor!==null,instancingMorph:Ot&&k.morphTexture!==null,supportsVertexTextures:u,outputColorSpace:at===null?i.outputColorSpace:at.isXRRenderTarget===!0?at.texture.colorSpace:qi,alphaToCoverage:!!w.alphaToCoverage,map:Kt,matcap:K,envMap:it,envMapMode:it&&J.mapping,envMapCubeUVHeight:H,aoMap:L,lightMap:Ct,bumpMap:tt,normalMap:xt,displacementMap:u&&rt,emissiveMap:Dt,normalMapObjectSpace:xt&&w.normalMapType===cd,normalMapTangentSpace:xt&&w.normalMapType===Fc,metalnessMap:mt,roughnessMap:A,anisotropy:M,anisotropyMap:ht,clearcoat:O,clearcoatMap:_t,clearcoatNormalMap:qt,clearcoatRoughnessMap:nt,dispersion:q,iridescence:Q,iridescenceMap:bt,iridescenceThicknessMap:It,sheen:$,sheenColorMap:Nt,sheenRoughnessMap:Mt,specularMap:$t,specularColorMap:Vt,specularIntensityMap:ue,transmission:At,transmissionMap:U,thicknessMap:dt,gradientMap:W,opaque:w.transparent===!1&&w.blending===Bi&&w.alphaToCoverage===!1,alphaMap:Z,alphaTest:gt,alphaHash:pt,combine:w.combine,mapUv:Kt&&x(w.map.channel),aoMapUv:L&&x(w.aoMap.channel),lightMapUv:Ct&&x(w.lightMap.channel),bumpMapUv:tt&&x(w.bumpMap.channel),normalMapUv:xt&&x(w.normalMap.channel),displacementMapUv:rt&&x(w.displacementMap.channel),emissiveMapUv:Dt&&x(w.emissiveMap.channel),metalnessMapUv:mt&&x(w.metalnessMap.channel),roughnessMapUv:A&&x(w.roughnessMap.channel),anisotropyMapUv:ht&&x(w.anisotropyMap.channel),clearcoatMapUv:_t&&x(w.clearcoatMap.channel),clearcoatNormalMapUv:qt&&x(w.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:nt&&x(w.clearcoatRoughnessMap.channel),iridescenceMapUv:bt&&x(w.iridescenceMap.channel),iridescenceThicknessMapUv:It&&x(w.iridescenceThicknessMap.channel),sheenColorMapUv:Nt&&x(w.sheenColorMap.channel),sheenRoughnessMapUv:Mt&&x(w.sheenRoughnessMap.channel),specularMapUv:$t&&x(w.specularMap.channel),specularColorMapUv:Vt&&x(w.specularColorMap.channel),specularIntensityMapUv:ue&&x(w.specularIntensityMap.channel),transmissionMapUv:U&&x(w.transmissionMap.channel),thicknessMapUv:dt&&x(w.thicknessMap.channel),alphaMapUv:Z&&x(w.alphaMap.channel),vertexTangents:!!Y.attributes.tangent&&(xt||M),vertexColors:w.vertexColors,vertexAlphas:w.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,pointsUvs:k.isPoints===!0&&!!Y.attributes.uv&&(Kt||Z),fog:!!X,useFog:w.fog===!0,fogExp2:!!X&&X.isFogExp2,flatShading:w.flatShading===!0,sizeAttenuation:w.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:Rt,skinning:k.isSkinnedMesh===!0,morphTargets:Y.morphAttributes.position!==void 0,morphNormals:Y.morphAttributes.normal!==void 0,morphColors:Y.morphAttributes.color!==void 0,morphTargetsCount:wt,morphTextureStride:zt,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:w.dithering,shadowMapEnabled:i.shadowMap.enabled&&D.length>0,shadowMapType:i.shadowMap.type,toneMapping:xe,decodeVideoTexture:Kt&&w.map.isVideoTexture===!0&&ee.getTransfer(w.map.colorSpace)===he,decodeVideoTextureEmissive:Dt&&w.emissiveMap.isVideoTexture===!0&&ee.getTransfer(w.emissiveMap.colorSpace)===he,premultipliedAlpha:w.premultipliedAlpha,doubleSided:w.side===nn,flipSided:w.side===Ve,useDepthPacking:w.depthPacking>=0,depthPacking:w.depthPacking||0,index0AttributeName:w.index0AttributeName,extensionClipCullDistance:Gt&&w.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Gt&&w.extensions.multiDraw===!0||Ut)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:w.customProgramCacheKey()};return Ue.vertexUv1s=c.has(1),Ue.vertexUv2s=c.has(2),Ue.vertexUv3s=c.has(3),c.clear(),Ue}function p(w){const y=[];if(w.shaderID?y.push(w.shaderID):(y.push(w.customVertexShaderID),y.push(w.customFragmentShaderID)),w.defines!==void 0)for(const D in w.defines)y.push(D),y.push(w.defines[D]);return w.isRawShaderMaterial===!1&&(b(y,w),_(y,w),y.push(i.outputColorSpace)),y.push(w.customProgramCacheKey),y.join()}function b(w,y){w.push(y.precision),w.push(y.outputColorSpace),w.push(y.envMapMode),w.push(y.envMapCubeUVHeight),w.push(y.mapUv),w.push(y.alphaMapUv),w.push(y.lightMapUv),w.push(y.aoMapUv),w.push(y.bumpMapUv),w.push(y.normalMapUv),w.push(y.displacementMapUv),w.push(y.emissiveMapUv),w.push(y.metalnessMapUv),w.push(y.roughnessMapUv),w.push(y.anisotropyMapUv),w.push(y.clearcoatMapUv),w.push(y.clearcoatNormalMapUv),w.push(y.clearcoatRoughnessMapUv),w.push(y.iridescenceMapUv),w.push(y.iridescenceThicknessMapUv),w.push(y.sheenColorMapUv),w.push(y.sheenRoughnessMapUv),w.push(y.specularMapUv),w.push(y.specularColorMapUv),w.push(y.specularIntensityMapUv),w.push(y.transmissionMapUv),w.push(y.thicknessMapUv),w.push(y.combine),w.push(y.fogExp2),w.push(y.sizeAttenuation),w.push(y.morphTargetsCount),w.push(y.morphAttributeCount),w.push(y.numDirLights),w.push(y.numPointLights),w.push(y.numSpotLights),w.push(y.numSpotLightMaps),w.push(y.numHemiLights),w.push(y.numRectAreaLights),w.push(y.numDirLightShadows),w.push(y.numPointLightShadows),w.push(y.numSpotLightShadows),w.push(y.numSpotLightShadowsWithMaps),w.push(y.numLightProbes),w.push(y.shadowMapType),w.push(y.toneMapping),w.push(y.numClippingPlanes),w.push(y.numClipIntersection),w.push(y.depthPacking)}function _(w,y){a.disableAll(),y.supportsVertexTextures&&a.enable(0),y.instancing&&a.enable(1),y.instancingColor&&a.enable(2),y.instancingMorph&&a.enable(3),y.matcap&&a.enable(4),y.envMap&&a.enable(5),y.normalMapObjectSpace&&a.enable(6),y.normalMapTangentSpace&&a.enable(7),y.clearcoat&&a.enable(8),y.iridescence&&a.enable(9),y.alphaTest&&a.enable(10),y.vertexColors&&a.enable(11),y.vertexAlphas&&a.enable(12),y.vertexUv1s&&a.enable(13),y.vertexUv2s&&a.enable(14),y.vertexUv3s&&a.enable(15),y.vertexTangents&&a.enable(16),y.anisotropy&&a.enable(17),y.alphaHash&&a.enable(18),y.batching&&a.enable(19),y.dispersion&&a.enable(20),y.batchingColor&&a.enable(21),w.push(a.mask),a.disableAll(),y.fog&&a.enable(0),y.useFog&&a.enable(1),y.flatShading&&a.enable(2),y.logarithmicDepthBuffer&&a.enable(3),y.reverseDepthBuffer&&a.enable(4),y.skinning&&a.enable(5),y.morphTargets&&a.enable(6),y.morphNormals&&a.enable(7),y.morphColors&&a.enable(8),y.premultipliedAlpha&&a.enable(9),y.shadowMapEnabled&&a.enable(10),y.doubleSided&&a.enable(11),y.flipSided&&a.enable(12),y.useDepthPacking&&a.enable(13),y.dithering&&a.enable(14),y.transmission&&a.enable(15),y.sheen&&a.enable(16),y.opaque&&a.enable(17),y.pointsUvs&&a.enable(18),y.decodeVideoTexture&&a.enable(19),y.decodeVideoTextureEmissive&&a.enable(20),y.alphaToCoverage&&a.enable(21),w.push(a.mask)}function v(w){const y=g[w.type];let D;if(y){const B=mn[y];D=eu.clone(B.uniforms)}else D=w.uniforms;return D}function P(w,y){let D;for(let B=0,k=h.length;B<k;B++){const X=h[B];if(X.cacheKey===y){D=X,++D.usedTimes;break}}return D===void 0&&(D=new i0(i,y,w,r),h.push(D)),D}function T(w){if(--w.usedTimes===0){const y=h.indexOf(w);h[y]=h[h.length-1],h.pop(),w.destroy()}}function E(w){l.remove(w)}function R(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:v,acquireProgram:P,releaseProgram:T,releaseShaderCache:E,programs:h,dispose:R}}function l0(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,l){i.get(o)[a]=l}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function c0(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function sc(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function rc(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(d,u,f,g,x,m){let p=i[t];return p===void 0?(p={id:d.id,object:d,geometry:u,material:f,groupOrder:g,renderOrder:d.renderOrder,z:x,group:m},i[t]=p):(p.id=d.id,p.object=d,p.geometry=u,p.material=f,p.groupOrder=g,p.renderOrder=d.renderOrder,p.z=x,p.group=m),t++,p}function a(d,u,f,g,x,m){const p=o(d,u,f,g,x,m);f.transmission>0?n.push(p):f.transparent===!0?s.push(p):e.push(p)}function l(d,u,f,g,x,m){const p=o(d,u,f,g,x,m);f.transmission>0?n.unshift(p):f.transparent===!0?s.unshift(p):e.unshift(p)}function c(d,u){e.length>1&&e.sort(d||c0),n.length>1&&n.sort(u||sc),s.length>1&&s.sort(u||sc)}function h(){for(let d=t,u=i.length;d<u;d++){const f=i[d];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:a,unshift:l,finish:h,sort:c}}function h0(){let i=new WeakMap;function t(n,s){const r=i.get(n);let o;return r===void 0?(o=new rc,i.set(n,[o])):s>=r.length?(o=new rc,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function d0(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new I,color:new Yt};break;case"SpotLight":e={position:new I,direction:new I,color:new Yt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new I,color:new Yt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new I,skyColor:new Yt,groundColor:new Yt};break;case"RectAreaLight":e={color:new Yt,position:new I,halfWidth:new I,halfHeight:new I};break}return i[t.id]=e,e}}}function u0(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ot};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ot};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ot,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let f0=0;function p0(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function m0(i){const t=new d0,e=u0(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new I);const s=new I,r=new pe,o=new pe;function a(c){let h=0,d=0,u=0;for(let w=0;w<9;w++)n.probe[w].set(0,0,0);let f=0,g=0,x=0,m=0,p=0,b=0,_=0,v=0,P=0,T=0,E=0;c.sort(p0);for(let w=0,y=c.length;w<y;w++){const D=c[w],B=D.color,k=D.intensity,X=D.distance,Y=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.isAmbientLight)h+=B.r*k,d+=B.g*k,u+=B.b*k;else if(D.isLightProbe){for(let V=0;V<9;V++)n.probe[V].addScaledVector(D.sh.coefficients[V],k);E++}else if(D.isDirectionalLight){const V=t.get(D);if(V.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const J=D.shadow,H=e.get(D);H.shadowIntensity=J.intensity,H.shadowBias=J.bias,H.shadowNormalBias=J.normalBias,H.shadowRadius=J.radius,H.shadowMapSize=J.mapSize,n.directionalShadow[f]=H,n.directionalShadowMap[f]=Y,n.directionalShadowMatrix[f]=D.shadow.matrix,b++}n.directional[f]=V,f++}else if(D.isSpotLight){const V=t.get(D);V.position.setFromMatrixPosition(D.matrixWorld),V.color.copy(B).multiplyScalar(k),V.distance=X,V.coneCos=Math.cos(D.angle),V.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),V.decay=D.decay,n.spot[x]=V;const J=D.shadow;if(D.map&&(n.spotLightMap[P]=D.map,P++,J.updateMatrices(D),D.castShadow&&T++),n.spotLightMatrix[x]=J.matrix,D.castShadow){const H=e.get(D);H.shadowIntensity=J.intensity,H.shadowBias=J.bias,H.shadowNormalBias=J.normalBias,H.shadowRadius=J.radius,H.shadowMapSize=J.mapSize,n.spotShadow[x]=H,n.spotShadowMap[x]=Y,v++}x++}else if(D.isRectAreaLight){const V=t.get(D);V.color.copy(B).multiplyScalar(k),V.halfWidth.set(D.width*.5,0,0),V.halfHeight.set(0,D.height*.5,0),n.rectArea[m]=V,m++}else if(D.isPointLight){const V=t.get(D);if(V.color.copy(D.color).multiplyScalar(D.intensity),V.distance=D.distance,V.decay=D.decay,D.castShadow){const J=D.shadow,H=e.get(D);H.shadowIntensity=J.intensity,H.shadowBias=J.bias,H.shadowNormalBias=J.normalBias,H.shadowRadius=J.radius,H.shadowMapSize=J.mapSize,H.shadowCameraNear=J.camera.near,H.shadowCameraFar=J.camera.far,n.pointShadow[g]=H,n.pointShadowMap[g]=Y,n.pointShadowMatrix[g]=D.shadow.matrix,_++}n.point[g]=V,g++}else if(D.isHemisphereLight){const V=t.get(D);V.skyColor.copy(D.color).multiplyScalar(k),V.groundColor.copy(D.groundColor).multiplyScalar(k),n.hemi[p]=V,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ct.LTC_FLOAT_1,n.rectAreaLTC2=ct.LTC_FLOAT_2):(n.rectAreaLTC1=ct.LTC_HALF_1,n.rectAreaLTC2=ct.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=u;const R=n.hash;(R.directionalLength!==f||R.pointLength!==g||R.spotLength!==x||R.rectAreaLength!==m||R.hemiLength!==p||R.numDirectionalShadows!==b||R.numPointShadows!==_||R.numSpotShadows!==v||R.numSpotMaps!==P||R.numLightProbes!==E)&&(n.directional.length=f,n.spot.length=x,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=b,n.directionalShadowMap.length=b,n.pointShadow.length=_,n.pointShadowMap.length=_,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=b,n.pointShadowMatrix.length=_,n.spotLightMatrix.length=v+P-T,n.spotLightMap.length=P,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=E,R.directionalLength=f,R.pointLength=g,R.spotLength=x,R.rectAreaLength=m,R.hemiLength=p,R.numDirectionalShadows=b,R.numPointShadows=_,R.numSpotShadows=v,R.numSpotMaps=P,R.numLightProbes=E,n.version=f0++)}function l(c,h){let d=0,u=0,f=0,g=0,x=0;const m=h.matrixWorldInverse;for(let p=0,b=c.length;p<b;p++){const _=c[p];if(_.isDirectionalLight){const v=n.directional[d];v.direction.setFromMatrixPosition(_.matrixWorld),s.setFromMatrixPosition(_.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(m),d++}else if(_.isSpotLight){const v=n.spot[f];v.position.setFromMatrixPosition(_.matrixWorld),v.position.applyMatrix4(m),v.direction.setFromMatrixPosition(_.matrixWorld),s.setFromMatrixPosition(_.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(m),f++}else if(_.isRectAreaLight){const v=n.rectArea[g];v.position.setFromMatrixPosition(_.matrixWorld),v.position.applyMatrix4(m),o.identity(),r.copy(_.matrixWorld),r.premultiply(m),o.extractRotation(r),v.halfWidth.set(_.width*.5,0,0),v.halfHeight.set(0,_.height*.5,0),v.halfWidth.applyMatrix4(o),v.halfHeight.applyMatrix4(o),g++}else if(_.isPointLight){const v=n.point[u];v.position.setFromMatrixPosition(_.matrixWorld),v.position.applyMatrix4(m),u++}else if(_.isHemisphereLight){const v=n.hemi[x];v.direction.setFromMatrixPosition(_.matrixWorld),v.direction.transformDirection(m),x++}}}return{setup:a,setupView:l,state:n}}function oc(i){const t=new m0(i),e=[],n=[];function s(h){c.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function o(h){n.push(h)}function a(){t.setup(e)}function l(h){t.setupView(e,h)}const c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function g0(i){let t=new WeakMap;function e(s,r=0){const o=t.get(s);let a;return o===void 0?(a=new oc(i),t.set(s,[a])):r>=o.length?(a=new oc(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}const v0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,_0=`uniform sampler2D shadow_pass;
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
}`;function x0(i,t,e){let n=new Ua;const s=new ot,r=new ot,o=new de,a=new Hu({depthPacking:ld}),l=new Vu,c={},h=e.maxTextureSize,d={[Yn]:Ve,[Ve]:Yn,[nn]:nn},u=new qn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ot},radius:{value:4}},vertexShader:v0,fragmentShader:_0}),f=u.clone();f.defines.HORIZONTAL_PASS=1;const g=new _e;g.setAttribute("position",new We(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new jt(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Mc;let p=this.type;this.render=function(T,E,R){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||T.length===0)return;const w=i.getRenderTarget(),y=i.getActiveCubeFace(),D=i.getActiveMipmapLevel(),B=i.state;B.setBlending(Vn),B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);const k=p!==Tn&&this.type===Tn,X=p===Tn&&this.type!==Tn;for(let Y=0,V=T.length;Y<V;Y++){const J=T[Y],H=J.shadow;if(H===void 0){console.warn("THREE.WebGLShadowMap:",J,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;s.copy(H.mapSize);const lt=H.getFrameExtents();if(s.multiply(lt),r.copy(H.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/lt.x),s.x=r.x*lt.x,H.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/lt.y),s.y=r.y*lt.y,H.mapSize.y=r.y)),H.map===null||k===!0||X===!0){const wt=this.type!==Tn?{minFilter:ze,magFilter:ze}:{};H.map!==null&&H.map.dispose(),H.map=new di(s.x,s.y,wt),H.map.texture.name=J.name+".shadowMap",H.camera.updateProjectionMatrix()}i.setRenderTarget(H.map),i.clear();const vt=H.getViewportCount();for(let wt=0;wt<vt;wt++){const zt=H.getViewport(wt);o.set(r.x*zt.x,r.y*zt.y,r.x*zt.z,r.y*zt.w),B.viewport(o),H.updateMatrices(J,wt),n=H.getFrustum(),v(E,R,H.camera,J,this.type)}H.isPointLightShadow!==!0&&this.type===Tn&&b(H,R),H.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(w,y,D)};function b(T,E){const R=t.update(x);u.defines.VSM_SAMPLES!==T.blurSamples&&(u.defines.VSM_SAMPLES=T.blurSamples,f.defines.VSM_SAMPLES=T.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new di(s.x,s.y)),u.uniforms.shadow_pass.value=T.map.texture,u.uniforms.resolution.value=T.mapSize,u.uniforms.radius.value=T.radius,i.setRenderTarget(T.mapPass),i.clear(),i.renderBufferDirect(E,null,R,u,x,null),f.uniforms.shadow_pass.value=T.mapPass.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,i.setRenderTarget(T.map),i.clear(),i.renderBufferDirect(E,null,R,f,x,null)}function _(T,E,R,w){let y=null;const D=R.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(D!==void 0)y=D;else if(y=R.isPointLight===!0?l:a,i.localClippingEnabled&&E.clipShadows===!0&&Array.isArray(E.clippingPlanes)&&E.clippingPlanes.length!==0||E.displacementMap&&E.displacementScale!==0||E.alphaMap&&E.alphaTest>0||E.map&&E.alphaTest>0){const B=y.uuid,k=E.uuid;let X=c[B];X===void 0&&(X={},c[B]=X);let Y=X[k];Y===void 0&&(Y=y.clone(),X[k]=Y,E.addEventListener("dispose",P)),y=Y}if(y.visible=E.visible,y.wireframe=E.wireframe,w===Tn?y.side=E.shadowSide!==null?E.shadowSide:E.side:y.side=E.shadowSide!==null?E.shadowSide:d[E.side],y.alphaMap=E.alphaMap,y.alphaTest=E.alphaTest,y.map=E.map,y.clipShadows=E.clipShadows,y.clippingPlanes=E.clippingPlanes,y.clipIntersection=E.clipIntersection,y.displacementMap=E.displacementMap,y.displacementScale=E.displacementScale,y.displacementBias=E.displacementBias,y.wireframeLinewidth=E.wireframeLinewidth,y.linewidth=E.linewidth,R.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const B=i.properties.get(y);B.light=R}return y}function v(T,E,R,w,y){if(T.visible===!1)return;if(T.layers.test(E.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&y===Tn)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(R.matrixWorldInverse,T.matrixWorld);const k=t.update(T),X=T.material;if(Array.isArray(X)){const Y=k.groups;for(let V=0,J=Y.length;V<J;V++){const H=Y[V],lt=X[H.materialIndex];if(lt&&lt.visible){const vt=_(T,lt,w,y);T.onBeforeShadow(i,T,E,R,k,vt,H),i.renderBufferDirect(R,null,k,vt,T,H),T.onAfterShadow(i,T,E,R,k,vt,H)}}}else if(X.visible){const Y=_(T,X,w,y);T.onBeforeShadow(i,T,E,R,k,Y,null),i.renderBufferDirect(R,null,k,Y,T,null),T.onAfterShadow(i,T,E,R,k,Y,null)}}const B=T.children;for(let k=0,X=B.length;k<X;k++)v(B[k],E,R,w,y)}function P(T){T.target.removeEventListener("dispose",P);for(const R in c){const w=c[R],y=T.target.uuid;y in w&&(w[y].dispose(),delete w[y])}}}const y0={[Uo]:No,[Fo]:ko,[Oo]:zo,[Gi]:Bo,[No]:Uo,[ko]:Fo,[zo]:Oo,[Bo]:Gi};function b0(i,t){function e(){let U=!1;const dt=new de;let W=null;const Z=new de(0,0,0,0);return{setMask:function(gt){W!==gt&&!U&&(i.colorMask(gt,gt,gt,gt),W=gt)},setLocked:function(gt){U=gt},setClear:function(gt,pt,Gt,xe,Ue){Ue===!0&&(gt*=xe,pt*=xe,Gt*=xe),dt.set(gt,pt,Gt,xe),Z.equals(dt)===!1&&(i.clearColor(gt,pt,Gt,xe),Z.copy(dt))},reset:function(){U=!1,W=null,Z.set(-1,0,0,0)}}}function n(){let U=!1,dt=!1,W=null,Z=null,gt=null;return{setReversed:function(pt){if(dt!==pt){const Gt=t.get("EXT_clip_control");dt?Gt.clipControlEXT(Gt.LOWER_LEFT_EXT,Gt.ZERO_TO_ONE_EXT):Gt.clipControlEXT(Gt.LOWER_LEFT_EXT,Gt.NEGATIVE_ONE_TO_ONE_EXT);const xe=gt;gt=null,this.setClear(xe)}dt=pt},getReversed:function(){return dt},setTest:function(pt){pt?at(i.DEPTH_TEST):Rt(i.DEPTH_TEST)},setMask:function(pt){W!==pt&&!U&&(i.depthMask(pt),W=pt)},setFunc:function(pt){if(dt&&(pt=y0[pt]),Z!==pt){switch(pt){case Uo:i.depthFunc(i.NEVER);break;case No:i.depthFunc(i.ALWAYS);break;case Fo:i.depthFunc(i.LESS);break;case Gi:i.depthFunc(i.LEQUAL);break;case Oo:i.depthFunc(i.EQUAL);break;case Bo:i.depthFunc(i.GEQUAL);break;case ko:i.depthFunc(i.GREATER);break;case zo:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Z=pt}},setLocked:function(pt){U=pt},setClear:function(pt){gt!==pt&&(dt&&(pt=1-pt),i.clearDepth(pt),gt=pt)},reset:function(){U=!1,W=null,Z=null,gt=null,dt=!1}}}function s(){let U=!1,dt=null,W=null,Z=null,gt=null,pt=null,Gt=null,xe=null,Ue=null;return{setTest:function(ae){U||(ae?at(i.STENCIL_TEST):Rt(i.STENCIL_TEST))},setMask:function(ae){dt!==ae&&!U&&(i.stencilMask(ae),dt=ae)},setFunc:function(ae,rn,_n){(W!==ae||Z!==rn||gt!==_n)&&(i.stencilFunc(ae,rn,_n),W=ae,Z=rn,gt=_n)},setOp:function(ae,rn,_n){(pt!==ae||Gt!==rn||xe!==_n)&&(i.stencilOp(ae,rn,_n),pt=ae,Gt=rn,xe=_n)},setLocked:function(ae){U=ae},setClear:function(ae){Ue!==ae&&(i.clearStencil(ae),Ue=ae)},reset:function(){U=!1,dt=null,W=null,Z=null,gt=null,pt=null,Gt=null,xe=null,Ue=null}}}const r=new e,o=new n,a=new s,l=new WeakMap,c=new WeakMap;let h={},d={},u=new WeakMap,f=[],g=null,x=!1,m=null,p=null,b=null,_=null,v=null,P=null,T=null,E=new Yt(0,0,0),R=0,w=!1,y=null,D=null,B=null,k=null,X=null;const Y=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let V=!1,J=0;const H=i.getParameter(i.VERSION);H.indexOf("WebGL")!==-1?(J=parseFloat(/^WebGL (\d)/.exec(H)[1]),V=J>=1):H.indexOf("OpenGL ES")!==-1&&(J=parseFloat(/^OpenGL ES (\d)/.exec(H)[1]),V=J>=2);let lt=null,vt={};const wt=i.getParameter(i.SCISSOR_BOX),zt=i.getParameter(i.VIEWPORT),se=new de().fromArray(wt),j=new de().fromArray(zt);function st(U,dt,W,Z){const gt=new Uint8Array(4),pt=i.createTexture();i.bindTexture(U,pt),i.texParameteri(U,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(U,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Gt=0;Gt<W;Gt++)U===i.TEXTURE_3D||U===i.TEXTURE_2D_ARRAY?i.texImage3D(dt,0,i.RGBA,1,1,Z,0,i.RGBA,i.UNSIGNED_BYTE,gt):i.texImage2D(dt+Gt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,gt);return pt}const Tt={};Tt[i.TEXTURE_2D]=st(i.TEXTURE_2D,i.TEXTURE_2D,1),Tt[i.TEXTURE_CUBE_MAP]=st(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Tt[i.TEXTURE_2D_ARRAY]=st(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Tt[i.TEXTURE_3D]=st(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),at(i.DEPTH_TEST),o.setFunc(Gi),tt(!1),xt(Qa),at(i.CULL_FACE),L(Vn);function at(U){h[U]!==!0&&(i.enable(U),h[U]=!0)}function Rt(U){h[U]!==!1&&(i.disable(U),h[U]=!1)}function Ot(U,dt){return d[U]!==dt?(i.bindFramebuffer(U,dt),d[U]=dt,U===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=dt),U===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=dt),!0):!1}function Ut(U,dt){let W=f,Z=!1;if(U){W=u.get(dt),W===void 0&&(W=[],u.set(dt,W));const gt=U.textures;if(W.length!==gt.length||W[0]!==i.COLOR_ATTACHMENT0){for(let pt=0,Gt=gt.length;pt<Gt;pt++)W[pt]=i.COLOR_ATTACHMENT0+pt;W.length=gt.length,Z=!0}}else W[0]!==i.BACK&&(W[0]=i.BACK,Z=!0);Z&&i.drawBuffers(W)}function Kt(U){return g!==U?(i.useProgram(U),g=U,!0):!1}const K={[oi]:i.FUNC_ADD,[Nh]:i.FUNC_SUBTRACT,[Fh]:i.FUNC_REVERSE_SUBTRACT};K[Oh]=i.MIN,K[Bh]=i.MAX;const it={[kh]:i.ZERO,[zh]:i.ONE,[Gh]:i.SRC_COLOR,[Io]:i.SRC_ALPHA,[qh]:i.SRC_ALPHA_SATURATE,[Xh]:i.DST_COLOR,[Vh]:i.DST_ALPHA,[Hh]:i.ONE_MINUS_SRC_COLOR,[Do]:i.ONE_MINUS_SRC_ALPHA,[Yh]:i.ONE_MINUS_DST_COLOR,[Wh]:i.ONE_MINUS_DST_ALPHA,[$h]:i.CONSTANT_COLOR,[jh]:i.ONE_MINUS_CONSTANT_COLOR,[Zh]:i.CONSTANT_ALPHA,[Jh]:i.ONE_MINUS_CONSTANT_ALPHA};function L(U,dt,W,Z,gt,pt,Gt,xe,Ue,ae){if(U===Vn){x===!0&&(Rt(i.BLEND),x=!1);return}if(x===!1&&(at(i.BLEND),x=!0),U!==Uh){if(U!==m||ae!==w){if((p!==oi||v!==oi)&&(i.blendEquation(i.FUNC_ADD),p=oi,v=oi),ae)switch(U){case Bi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case xs:i.blendFunc(i.ONE,i.ONE);break;case tl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case el:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case Bi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case xs:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case tl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case el:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}b=null,_=null,P=null,T=null,E.set(0,0,0),R=0,m=U,w=ae}return}gt=gt||dt,pt=pt||W,Gt=Gt||Z,(dt!==p||gt!==v)&&(i.blendEquationSeparate(K[dt],K[gt]),p=dt,v=gt),(W!==b||Z!==_||pt!==P||Gt!==T)&&(i.blendFuncSeparate(it[W],it[Z],it[pt],it[Gt]),b=W,_=Z,P=pt,T=Gt),(xe.equals(E)===!1||Ue!==R)&&(i.blendColor(xe.r,xe.g,xe.b,Ue),E.copy(xe),R=Ue),m=U,w=!1}function Ct(U,dt){U.side===nn?Rt(i.CULL_FACE):at(i.CULL_FACE);let W=U.side===Ve;dt&&(W=!W),tt(W),U.blending===Bi&&U.transparent===!1?L(Vn):L(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),o.setFunc(U.depthFunc),o.setTest(U.depthTest),o.setMask(U.depthWrite),r.setMask(U.colorWrite);const Z=U.stencilWrite;a.setTest(Z),Z&&(a.setMask(U.stencilWriteMask),a.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),a.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),Dt(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?at(i.SAMPLE_ALPHA_TO_COVERAGE):Rt(i.SAMPLE_ALPHA_TO_COVERAGE)}function tt(U){y!==U&&(U?i.frontFace(i.CW):i.frontFace(i.CCW),y=U)}function xt(U){U!==Ih?(at(i.CULL_FACE),U!==D&&(U===Qa?i.cullFace(i.BACK):U===Dh?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Rt(i.CULL_FACE),D=U}function rt(U){U!==B&&(V&&i.lineWidth(U),B=U)}function Dt(U,dt,W){U?(at(i.POLYGON_OFFSET_FILL),(k!==dt||X!==W)&&(i.polygonOffset(dt,W),k=dt,X=W)):Rt(i.POLYGON_OFFSET_FILL)}function mt(U){U?at(i.SCISSOR_TEST):Rt(i.SCISSOR_TEST)}function A(U){U===void 0&&(U=i.TEXTURE0+Y-1),lt!==U&&(i.activeTexture(U),lt=U)}function M(U,dt,W){W===void 0&&(lt===null?W=i.TEXTURE0+Y-1:W=lt);let Z=vt[W];Z===void 0&&(Z={type:void 0,texture:void 0},vt[W]=Z),(Z.type!==U||Z.texture!==dt)&&(lt!==W&&(i.activeTexture(W),lt=W),i.bindTexture(U,dt||Tt[U]),Z.type=U,Z.texture=dt)}function O(){const U=vt[lt];U!==void 0&&U.type!==void 0&&(i.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function q(){try{i.compressedTexImage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Q(){try{i.compressedTexImage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function $(){try{i.texSubImage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function At(){try{i.texSubImage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ht(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function _t(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function qt(){try{i.texStorage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function nt(){try{i.texStorage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function bt(){try{i.texImage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function It(){try{i.texImage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Nt(U){se.equals(U)===!1&&(i.scissor(U.x,U.y,U.z,U.w),se.copy(U))}function Mt(U){j.equals(U)===!1&&(i.viewport(U.x,U.y,U.z,U.w),j.copy(U))}function $t(U,dt){let W=c.get(dt);W===void 0&&(W=new WeakMap,c.set(dt,W));let Z=W.get(U);Z===void 0&&(Z=i.getUniformBlockIndex(dt,U.name),W.set(U,Z))}function Vt(U,dt){const Z=c.get(dt).get(U);l.get(dt)!==Z&&(i.uniformBlockBinding(dt,Z,U.__bindingPointIndex),l.set(dt,Z))}function ue(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},lt=null,vt={},d={},u=new WeakMap,f=[],g=null,x=!1,m=null,p=null,b=null,_=null,v=null,P=null,T=null,E=new Yt(0,0,0),R=0,w=!1,y=null,D=null,B=null,k=null,X=null,se.set(0,0,i.canvas.width,i.canvas.height),j.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:at,disable:Rt,bindFramebuffer:Ot,drawBuffers:Ut,useProgram:Kt,setBlending:L,setMaterial:Ct,setFlipSided:tt,setCullFace:xt,setLineWidth:rt,setPolygonOffset:Dt,setScissorTest:mt,activeTexture:A,bindTexture:M,unbindTexture:O,compressedTexImage2D:q,compressedTexImage3D:Q,texImage2D:bt,texImage3D:It,updateUBOMapping:$t,uniformBlockBinding:Vt,texStorage2D:qt,texStorage3D:nt,texSubImage2D:$,texSubImage3D:At,compressedTexSubImage2D:ht,compressedTexSubImage3D:_t,scissor:Nt,viewport:Mt,reset:ue}}function M0(i,t,e,n,s,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ot,h=new WeakMap;let d;const u=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(A,M){return f?new OffscreenCanvas(A,M):Tr("canvas")}function x(A,M,O){let q=1;const Q=mt(A);if((Q.width>O||Q.height>O)&&(q=O/Math.max(Q.width,Q.height)),q<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const $=Math.floor(q*Q.width),At=Math.floor(q*Q.height);d===void 0&&(d=g($,At));const ht=M?g($,At):d;return ht.width=$,ht.height=At,ht.getContext("2d").drawImage(A,0,0,$,At),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+$+"x"+At+")."),ht}else return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),A;return A}function m(A){return A.generateMipmaps}function p(A){i.generateMipmap(A)}function b(A){return A.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?i.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function _(A,M,O,q,Q=!1){if(A!==null){if(i[A]!==void 0)return i[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let $=M;if(M===i.RED&&(O===i.FLOAT&&($=i.R32F),O===i.HALF_FLOAT&&($=i.R16F),O===i.UNSIGNED_BYTE&&($=i.R8)),M===i.RED_INTEGER&&(O===i.UNSIGNED_BYTE&&($=i.R8UI),O===i.UNSIGNED_SHORT&&($=i.R16UI),O===i.UNSIGNED_INT&&($=i.R32UI),O===i.BYTE&&($=i.R8I),O===i.SHORT&&($=i.R16I),O===i.INT&&($=i.R32I)),M===i.RG&&(O===i.FLOAT&&($=i.RG32F),O===i.HALF_FLOAT&&($=i.RG16F),O===i.UNSIGNED_BYTE&&($=i.RG8)),M===i.RG_INTEGER&&(O===i.UNSIGNED_BYTE&&($=i.RG8UI),O===i.UNSIGNED_SHORT&&($=i.RG16UI),O===i.UNSIGNED_INT&&($=i.RG32UI),O===i.BYTE&&($=i.RG8I),O===i.SHORT&&($=i.RG16I),O===i.INT&&($=i.RG32I)),M===i.RGB_INTEGER&&(O===i.UNSIGNED_BYTE&&($=i.RGB8UI),O===i.UNSIGNED_SHORT&&($=i.RGB16UI),O===i.UNSIGNED_INT&&($=i.RGB32UI),O===i.BYTE&&($=i.RGB8I),O===i.SHORT&&($=i.RGB16I),O===i.INT&&($=i.RGB32I)),M===i.RGBA_INTEGER&&(O===i.UNSIGNED_BYTE&&($=i.RGBA8UI),O===i.UNSIGNED_SHORT&&($=i.RGBA16UI),O===i.UNSIGNED_INT&&($=i.RGBA32UI),O===i.BYTE&&($=i.RGBA8I),O===i.SHORT&&($=i.RGBA16I),O===i.INT&&($=i.RGBA32I)),M===i.RGB&&O===i.UNSIGNED_INT_5_9_9_9_REV&&($=i.RGB9_E5),M===i.RGBA){const At=Q?Sr:ee.getTransfer(q);O===i.FLOAT&&($=i.RGBA32F),O===i.HALF_FLOAT&&($=i.RGBA16F),O===i.UNSIGNED_BYTE&&($=At===he?i.SRGB8_ALPHA8:i.RGBA8),O===i.UNSIGNED_SHORT_4_4_4_4&&($=i.RGBA4),O===i.UNSIGNED_SHORT_5_5_5_1&&($=i.RGB5_A1)}return($===i.R16F||$===i.R32F||$===i.RG16F||$===i.RG32F||$===i.RGBA16F||$===i.RGBA32F)&&t.get("EXT_color_buffer_float"),$}function v(A,M){let O;return A?M===null||M===hi||M===Xi?O=i.DEPTH24_STENCIL8:M===Cn?O=i.DEPTH32F_STENCIL8:M===ys&&(O=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===hi||M===Xi?O=i.DEPTH_COMPONENT24:M===Cn?O=i.DEPTH_COMPONENT32F:M===ys&&(O=i.DEPTH_COMPONENT16),O}function P(A,M){return m(A)===!0||A.isFramebufferTexture&&A.minFilter!==ze&&A.minFilter!==gn?Math.log2(Math.max(M.width,M.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?M.mipmaps.length:1}function T(A){const M=A.target;M.removeEventListener("dispose",T),R(M),M.isVideoTexture&&h.delete(M)}function E(A){const M=A.target;M.removeEventListener("dispose",E),y(M)}function R(A){const M=n.get(A);if(M.__webglInit===void 0)return;const O=A.source,q=u.get(O);if(q){const Q=q[M.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&w(A),Object.keys(q).length===0&&u.delete(O)}n.remove(A)}function w(A){const M=n.get(A);i.deleteTexture(M.__webglTexture);const O=A.source,q=u.get(O);delete q[M.__cacheKey],o.memory.textures--}function y(A){const M=n.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),n.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let q=0;q<6;q++){if(Array.isArray(M.__webglFramebuffer[q]))for(let Q=0;Q<M.__webglFramebuffer[q].length;Q++)i.deleteFramebuffer(M.__webglFramebuffer[q][Q]);else i.deleteFramebuffer(M.__webglFramebuffer[q]);M.__webglDepthbuffer&&i.deleteRenderbuffer(M.__webglDepthbuffer[q])}else{if(Array.isArray(M.__webglFramebuffer))for(let q=0;q<M.__webglFramebuffer.length;q++)i.deleteFramebuffer(M.__webglFramebuffer[q]);else i.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&i.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&i.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let q=0;q<M.__webglColorRenderbuffer.length;q++)M.__webglColorRenderbuffer[q]&&i.deleteRenderbuffer(M.__webglColorRenderbuffer[q]);M.__webglDepthRenderbuffer&&i.deleteRenderbuffer(M.__webglDepthRenderbuffer)}const O=A.textures;for(let q=0,Q=O.length;q<Q;q++){const $=n.get(O[q]);$.__webglTexture&&(i.deleteTexture($.__webglTexture),o.memory.textures--),n.remove(O[q])}n.remove(A)}let D=0;function B(){D=0}function k(){const A=D;return A>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+s.maxTextures),D+=1,A}function X(A){const M=[];return M.push(A.wrapS),M.push(A.wrapT),M.push(A.wrapR||0),M.push(A.magFilter),M.push(A.minFilter),M.push(A.anisotropy),M.push(A.internalFormat),M.push(A.format),M.push(A.type),M.push(A.generateMipmaps),M.push(A.premultiplyAlpha),M.push(A.flipY),M.push(A.unpackAlignment),M.push(A.colorSpace),M.join()}function Y(A,M){const O=n.get(A);if(A.isVideoTexture&&rt(A),A.isRenderTargetTexture===!1&&A.version>0&&O.__version!==A.version){const q=A.image;if(q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{j(O,A,M);return}}e.bindTexture(i.TEXTURE_2D,O.__webglTexture,i.TEXTURE0+M)}function V(A,M){const O=n.get(A);if(A.version>0&&O.__version!==A.version){j(O,A,M);return}e.bindTexture(i.TEXTURE_2D_ARRAY,O.__webglTexture,i.TEXTURE0+M)}function J(A,M){const O=n.get(A);if(A.version>0&&O.__version!==A.version){j(O,A,M);return}e.bindTexture(i.TEXTURE_3D,O.__webglTexture,i.TEXTURE0+M)}function H(A,M){const O=n.get(A);if(A.version>0&&O.__version!==A.version){st(O,A,M);return}e.bindTexture(i.TEXTURE_CUBE_MAP,O.__webglTexture,i.TEXTURE0+M)}const lt={[Wi]:i.REPEAT,[li]:i.CLAMP_TO_EDGE,[Vo]:i.MIRRORED_REPEAT},vt={[ze]:i.NEAREST,[od]:i.NEAREST_MIPMAP_NEAREST,[Bs]:i.NEAREST_MIPMAP_LINEAR,[gn]:i.LINEAR,[Xr]:i.LINEAR_MIPMAP_NEAREST,[ci]:i.LINEAR_MIPMAP_LINEAR},wt={[hd]:i.NEVER,[gd]:i.ALWAYS,[dd]:i.LESS,[Oc]:i.LEQUAL,[ud]:i.EQUAL,[md]:i.GEQUAL,[fd]:i.GREATER,[pd]:i.NOTEQUAL};function zt(A,M){if(M.type===Cn&&t.has("OES_texture_float_linear")===!1&&(M.magFilter===gn||M.magFilter===Xr||M.magFilter===Bs||M.magFilter===ci||M.minFilter===gn||M.minFilter===Xr||M.minFilter===Bs||M.minFilter===ci)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(A,i.TEXTURE_WRAP_S,lt[M.wrapS]),i.texParameteri(A,i.TEXTURE_WRAP_T,lt[M.wrapT]),(A===i.TEXTURE_3D||A===i.TEXTURE_2D_ARRAY)&&i.texParameteri(A,i.TEXTURE_WRAP_R,lt[M.wrapR]),i.texParameteri(A,i.TEXTURE_MAG_FILTER,vt[M.magFilter]),i.texParameteri(A,i.TEXTURE_MIN_FILTER,vt[M.minFilter]),M.compareFunction&&(i.texParameteri(A,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(A,i.TEXTURE_COMPARE_FUNC,wt[M.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===ze||M.minFilter!==Bs&&M.minFilter!==ci||M.type===Cn&&t.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||n.get(M).__currentAnisotropy){const O=t.get("EXT_texture_filter_anisotropic");i.texParameterf(A,O.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,s.getMaxAnisotropy())),n.get(M).__currentAnisotropy=M.anisotropy}}}function se(A,M){let O=!1;A.__webglInit===void 0&&(A.__webglInit=!0,M.addEventListener("dispose",T));const q=M.source;let Q=u.get(q);Q===void 0&&(Q={},u.set(q,Q));const $=X(M);if($!==A.__cacheKey){Q[$]===void 0&&(Q[$]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,O=!0),Q[$].usedTimes++;const At=Q[A.__cacheKey];At!==void 0&&(Q[A.__cacheKey].usedTimes--,At.usedTimes===0&&w(M)),A.__cacheKey=$,A.__webglTexture=Q[$].texture}return O}function j(A,M,O){let q=i.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(q=i.TEXTURE_2D_ARRAY),M.isData3DTexture&&(q=i.TEXTURE_3D);const Q=se(A,M),$=M.source;e.bindTexture(q,A.__webglTexture,i.TEXTURE0+O);const At=n.get($);if($.version!==At.__version||Q===!0){e.activeTexture(i.TEXTURE0+O);const ht=ee.getPrimaries(ee.workingColorSpace),_t=M.colorSpace===Hn?null:ee.getPrimaries(M.colorSpace),qt=M.colorSpace===Hn||ht===_t?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,M.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,M.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,qt);let nt=x(M.image,!1,s.maxTextureSize);nt=Dt(M,nt);const bt=r.convert(M.format,M.colorSpace),It=r.convert(M.type);let Nt=_(M.internalFormat,bt,It,M.colorSpace,M.isVideoTexture);zt(q,M);let Mt;const $t=M.mipmaps,Vt=M.isVideoTexture!==!0,ue=At.__version===void 0||Q===!0,U=$.dataReady,dt=P(M,nt);if(M.isDepthTexture)Nt=v(M.format===Yi,M.type),ue&&(Vt?e.texStorage2D(i.TEXTURE_2D,1,Nt,nt.width,nt.height):e.texImage2D(i.TEXTURE_2D,0,Nt,nt.width,nt.height,0,bt,It,null));else if(M.isDataTexture)if($t.length>0){Vt&&ue&&e.texStorage2D(i.TEXTURE_2D,dt,Nt,$t[0].width,$t[0].height);for(let W=0,Z=$t.length;W<Z;W++)Mt=$t[W],Vt?U&&e.texSubImage2D(i.TEXTURE_2D,W,0,0,Mt.width,Mt.height,bt,It,Mt.data):e.texImage2D(i.TEXTURE_2D,W,Nt,Mt.width,Mt.height,0,bt,It,Mt.data);M.generateMipmaps=!1}else Vt?(ue&&e.texStorage2D(i.TEXTURE_2D,dt,Nt,nt.width,nt.height),U&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,nt.width,nt.height,bt,It,nt.data)):e.texImage2D(i.TEXTURE_2D,0,Nt,nt.width,nt.height,0,bt,It,nt.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){Vt&&ue&&e.texStorage3D(i.TEXTURE_2D_ARRAY,dt,Nt,$t[0].width,$t[0].height,nt.depth);for(let W=0,Z=$t.length;W<Z;W++)if(Mt=$t[W],M.format!==un)if(bt!==null)if(Vt){if(U)if(M.layerUpdates.size>0){const gt=Fl(Mt.width,Mt.height,M.format,M.type);for(const pt of M.layerUpdates){const Gt=Mt.data.subarray(pt*gt/Mt.data.BYTES_PER_ELEMENT,(pt+1)*gt/Mt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,W,0,0,pt,Mt.width,Mt.height,1,bt,Gt)}M.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,W,0,0,0,Mt.width,Mt.height,nt.depth,bt,Mt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,W,Nt,Mt.width,Mt.height,nt.depth,0,Mt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Vt?U&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,W,0,0,0,Mt.width,Mt.height,nt.depth,bt,It,Mt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,W,Nt,Mt.width,Mt.height,nt.depth,0,bt,It,Mt.data)}else{Vt&&ue&&e.texStorage2D(i.TEXTURE_2D,dt,Nt,$t[0].width,$t[0].height);for(let W=0,Z=$t.length;W<Z;W++)Mt=$t[W],M.format!==un?bt!==null?Vt?U&&e.compressedTexSubImage2D(i.TEXTURE_2D,W,0,0,Mt.width,Mt.height,bt,Mt.data):e.compressedTexImage2D(i.TEXTURE_2D,W,Nt,Mt.width,Mt.height,0,Mt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Vt?U&&e.texSubImage2D(i.TEXTURE_2D,W,0,0,Mt.width,Mt.height,bt,It,Mt.data):e.texImage2D(i.TEXTURE_2D,W,Nt,Mt.width,Mt.height,0,bt,It,Mt.data)}else if(M.isDataArrayTexture)if(Vt){if(ue&&e.texStorage3D(i.TEXTURE_2D_ARRAY,dt,Nt,nt.width,nt.height,nt.depth),U)if(M.layerUpdates.size>0){const W=Fl(nt.width,nt.height,M.format,M.type);for(const Z of M.layerUpdates){const gt=nt.data.subarray(Z*W/nt.data.BYTES_PER_ELEMENT,(Z+1)*W/nt.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Z,nt.width,nt.height,1,bt,It,gt)}M.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,nt.width,nt.height,nt.depth,bt,It,nt.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Nt,nt.width,nt.height,nt.depth,0,bt,It,nt.data);else if(M.isData3DTexture)Vt?(ue&&e.texStorage3D(i.TEXTURE_3D,dt,Nt,nt.width,nt.height,nt.depth),U&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,nt.width,nt.height,nt.depth,bt,It,nt.data)):e.texImage3D(i.TEXTURE_3D,0,Nt,nt.width,nt.height,nt.depth,0,bt,It,nt.data);else if(M.isFramebufferTexture){if(ue)if(Vt)e.texStorage2D(i.TEXTURE_2D,dt,Nt,nt.width,nt.height);else{let W=nt.width,Z=nt.height;for(let gt=0;gt<dt;gt++)e.texImage2D(i.TEXTURE_2D,gt,Nt,W,Z,0,bt,It,null),W>>=1,Z>>=1}}else if($t.length>0){if(Vt&&ue){const W=mt($t[0]);e.texStorage2D(i.TEXTURE_2D,dt,Nt,W.width,W.height)}for(let W=0,Z=$t.length;W<Z;W++)Mt=$t[W],Vt?U&&e.texSubImage2D(i.TEXTURE_2D,W,0,0,bt,It,Mt):e.texImage2D(i.TEXTURE_2D,W,Nt,bt,It,Mt);M.generateMipmaps=!1}else if(Vt){if(ue){const W=mt(nt);e.texStorage2D(i.TEXTURE_2D,dt,Nt,W.width,W.height)}U&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,bt,It,nt)}else e.texImage2D(i.TEXTURE_2D,0,Nt,bt,It,nt);m(M)&&p(q),At.__version=$.version,M.onUpdate&&M.onUpdate(M)}A.__version=M.version}function st(A,M,O){if(M.image.length!==6)return;const q=se(A,M),Q=M.source;e.bindTexture(i.TEXTURE_CUBE_MAP,A.__webglTexture,i.TEXTURE0+O);const $=n.get(Q);if(Q.version!==$.__version||q===!0){e.activeTexture(i.TEXTURE0+O);const At=ee.getPrimaries(ee.workingColorSpace),ht=M.colorSpace===Hn?null:ee.getPrimaries(M.colorSpace),_t=M.colorSpace===Hn||At===ht?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,M.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,M.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,_t);const qt=M.isCompressedTexture||M.image[0].isCompressedTexture,nt=M.image[0]&&M.image[0].isDataTexture,bt=[];for(let Z=0;Z<6;Z++)!qt&&!nt?bt[Z]=x(M.image[Z],!0,s.maxCubemapSize):bt[Z]=nt?M.image[Z].image:M.image[Z],bt[Z]=Dt(M,bt[Z]);const It=bt[0],Nt=r.convert(M.format,M.colorSpace),Mt=r.convert(M.type),$t=_(M.internalFormat,Nt,Mt,M.colorSpace),Vt=M.isVideoTexture!==!0,ue=$.__version===void 0||q===!0,U=Q.dataReady;let dt=P(M,It);zt(i.TEXTURE_CUBE_MAP,M);let W;if(qt){Vt&&ue&&e.texStorage2D(i.TEXTURE_CUBE_MAP,dt,$t,It.width,It.height);for(let Z=0;Z<6;Z++){W=bt[Z].mipmaps;for(let gt=0;gt<W.length;gt++){const pt=W[gt];M.format!==un?Nt!==null?Vt?U&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,gt,0,0,pt.width,pt.height,Nt,pt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,gt,$t,pt.width,pt.height,0,pt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Vt?U&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,gt,0,0,pt.width,pt.height,Nt,Mt,pt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,gt,$t,pt.width,pt.height,0,Nt,Mt,pt.data)}}}else{if(W=M.mipmaps,Vt&&ue){W.length>0&&dt++;const Z=mt(bt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,dt,$t,Z.width,Z.height)}for(let Z=0;Z<6;Z++)if(nt){Vt?U&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,bt[Z].width,bt[Z].height,Nt,Mt,bt[Z].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,$t,bt[Z].width,bt[Z].height,0,Nt,Mt,bt[Z].data);for(let gt=0;gt<W.length;gt++){const Gt=W[gt].image[Z].image;Vt?U&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,gt+1,0,0,Gt.width,Gt.height,Nt,Mt,Gt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,gt+1,$t,Gt.width,Gt.height,0,Nt,Mt,Gt.data)}}else{Vt?U&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,Nt,Mt,bt[Z]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,$t,Nt,Mt,bt[Z]);for(let gt=0;gt<W.length;gt++){const pt=W[gt];Vt?U&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,gt+1,0,0,Nt,Mt,pt.image[Z]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,gt+1,$t,Nt,Mt,pt.image[Z])}}}m(M)&&p(i.TEXTURE_CUBE_MAP),$.__version=Q.version,M.onUpdate&&M.onUpdate(M)}A.__version=M.version}function Tt(A,M,O,q,Q,$){const At=r.convert(O.format,O.colorSpace),ht=r.convert(O.type),_t=_(O.internalFormat,At,ht,O.colorSpace),qt=n.get(M),nt=n.get(O);if(nt.__renderTarget=M,!qt.__hasExternalTextures){const bt=Math.max(1,M.width>>$),It=Math.max(1,M.height>>$);Q===i.TEXTURE_3D||Q===i.TEXTURE_2D_ARRAY?e.texImage3D(Q,$,_t,bt,It,M.depth,0,At,ht,null):e.texImage2D(Q,$,_t,bt,It,0,At,ht,null)}e.bindFramebuffer(i.FRAMEBUFFER,A),xt(M)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,q,Q,nt.__webglTexture,0,tt(M)):(Q===i.TEXTURE_2D||Q>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,q,Q,nt.__webglTexture,$),e.bindFramebuffer(i.FRAMEBUFFER,null)}function at(A,M,O){if(i.bindRenderbuffer(i.RENDERBUFFER,A),M.depthBuffer){const q=M.depthTexture,Q=q&&q.isDepthTexture?q.type:null,$=v(M.stencilBuffer,Q),At=M.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ht=tt(M);xt(M)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ht,$,M.width,M.height):O?i.renderbufferStorageMultisample(i.RENDERBUFFER,ht,$,M.width,M.height):i.renderbufferStorage(i.RENDERBUFFER,$,M.width,M.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,At,i.RENDERBUFFER,A)}else{const q=M.textures;for(let Q=0;Q<q.length;Q++){const $=q[Q],At=r.convert($.format,$.colorSpace),ht=r.convert($.type),_t=_($.internalFormat,At,ht,$.colorSpace),qt=tt(M);O&&xt(M)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,qt,_t,M.width,M.height):xt(M)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,qt,_t,M.width,M.height):i.renderbufferStorage(i.RENDERBUFFER,_t,M.width,M.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Rt(A,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,A),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const q=n.get(M.depthTexture);q.__renderTarget=M,(!q.__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),Y(M.depthTexture,0);const Q=q.__webglTexture,$=tt(M);if(M.depthTexture.format===ki)xt(M)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Q,0,$):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Q,0);else if(M.depthTexture.format===Yi)xt(M)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Q,0,$):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Q,0);else throw new Error("Unknown depthTexture format")}function Ot(A){const M=n.get(A),O=A.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==A.depthTexture){const q=A.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),q){const Q=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,q.removeEventListener("dispose",Q)};q.addEventListener("dispose",Q),M.__depthDisposeCallback=Q}M.__boundDepthTexture=q}if(A.depthTexture&&!M.__autoAllocateDepthBuffer){if(O)throw new Error("target.depthTexture not supported in Cube render targets");Rt(M.__webglFramebuffer,A)}else if(O){M.__webglDepthbuffer=[];for(let q=0;q<6;q++)if(e.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer[q]),M.__webglDepthbuffer[q]===void 0)M.__webglDepthbuffer[q]=i.createRenderbuffer(),at(M.__webglDepthbuffer[q],A,!1);else{const Q=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,$=M.__webglDepthbuffer[q];i.bindRenderbuffer(i.RENDERBUFFER,$),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,$)}}else if(e.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=i.createRenderbuffer(),at(M.__webglDepthbuffer,A,!1);else{const q=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Q=M.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,Q),i.framebufferRenderbuffer(i.FRAMEBUFFER,q,i.RENDERBUFFER,Q)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Ut(A,M,O){const q=n.get(A);M!==void 0&&Tt(q.__webglFramebuffer,A,A.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),O!==void 0&&Ot(A)}function Kt(A){const M=A.texture,O=n.get(A),q=n.get(M);A.addEventListener("dispose",E);const Q=A.textures,$=A.isWebGLCubeRenderTarget===!0,At=Q.length>1;if(At||(q.__webglTexture===void 0&&(q.__webglTexture=i.createTexture()),q.__version=M.version,o.memory.textures++),$){O.__webglFramebuffer=[];for(let ht=0;ht<6;ht++)if(M.mipmaps&&M.mipmaps.length>0){O.__webglFramebuffer[ht]=[];for(let _t=0;_t<M.mipmaps.length;_t++)O.__webglFramebuffer[ht][_t]=i.createFramebuffer()}else O.__webglFramebuffer[ht]=i.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){O.__webglFramebuffer=[];for(let ht=0;ht<M.mipmaps.length;ht++)O.__webglFramebuffer[ht]=i.createFramebuffer()}else O.__webglFramebuffer=i.createFramebuffer();if(At)for(let ht=0,_t=Q.length;ht<_t;ht++){const qt=n.get(Q[ht]);qt.__webglTexture===void 0&&(qt.__webglTexture=i.createTexture(),o.memory.textures++)}if(A.samples>0&&xt(A)===!1){O.__webglMultisampledFramebuffer=i.createFramebuffer(),O.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let ht=0;ht<Q.length;ht++){const _t=Q[ht];O.__webglColorRenderbuffer[ht]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,O.__webglColorRenderbuffer[ht]);const qt=r.convert(_t.format,_t.colorSpace),nt=r.convert(_t.type),bt=_(_t.internalFormat,qt,nt,_t.colorSpace,A.isXRRenderTarget===!0),It=tt(A);i.renderbufferStorageMultisample(i.RENDERBUFFER,It,bt,A.width,A.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ht,i.RENDERBUFFER,O.__webglColorRenderbuffer[ht])}i.bindRenderbuffer(i.RENDERBUFFER,null),A.depthBuffer&&(O.__webglDepthRenderbuffer=i.createRenderbuffer(),at(O.__webglDepthRenderbuffer,A,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if($){e.bindTexture(i.TEXTURE_CUBE_MAP,q.__webglTexture),zt(i.TEXTURE_CUBE_MAP,M);for(let ht=0;ht<6;ht++)if(M.mipmaps&&M.mipmaps.length>0)for(let _t=0;_t<M.mipmaps.length;_t++)Tt(O.__webglFramebuffer[ht][_t],A,M,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ht,_t);else Tt(O.__webglFramebuffer[ht],A,M,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ht,0);m(M)&&p(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(At){for(let ht=0,_t=Q.length;ht<_t;ht++){const qt=Q[ht],nt=n.get(qt);e.bindTexture(i.TEXTURE_2D,nt.__webglTexture),zt(i.TEXTURE_2D,qt),Tt(O.__webglFramebuffer,A,qt,i.COLOR_ATTACHMENT0+ht,i.TEXTURE_2D,0),m(qt)&&p(i.TEXTURE_2D)}e.unbindTexture()}else{let ht=i.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(ht=A.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(ht,q.__webglTexture),zt(ht,M),M.mipmaps&&M.mipmaps.length>0)for(let _t=0;_t<M.mipmaps.length;_t++)Tt(O.__webglFramebuffer[_t],A,M,i.COLOR_ATTACHMENT0,ht,_t);else Tt(O.__webglFramebuffer,A,M,i.COLOR_ATTACHMENT0,ht,0);m(M)&&p(ht),e.unbindTexture()}A.depthBuffer&&Ot(A)}function K(A){const M=A.textures;for(let O=0,q=M.length;O<q;O++){const Q=M[O];if(m(Q)){const $=b(A),At=n.get(Q).__webglTexture;e.bindTexture($,At),p($),e.unbindTexture()}}}const it=[],L=[];function Ct(A){if(A.samples>0){if(xt(A)===!1){const M=A.textures,O=A.width,q=A.height;let Q=i.COLOR_BUFFER_BIT;const $=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,At=n.get(A),ht=M.length>1;if(ht)for(let _t=0;_t<M.length;_t++)e.bindFramebuffer(i.FRAMEBUFFER,At.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+_t,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,At.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+_t,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,At.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,At.__webglFramebuffer);for(let _t=0;_t<M.length;_t++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(Q|=i.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(Q|=i.STENCIL_BUFFER_BIT)),ht){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,At.__webglColorRenderbuffer[_t]);const qt=n.get(M[_t]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,qt,0)}i.blitFramebuffer(0,0,O,q,0,0,O,q,Q,i.NEAREST),l===!0&&(it.length=0,L.length=0,it.push(i.COLOR_ATTACHMENT0+_t),A.depthBuffer&&A.resolveDepthBuffer===!1&&(it.push($),L.push($),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,L)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,it))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ht)for(let _t=0;_t<M.length;_t++){e.bindFramebuffer(i.FRAMEBUFFER,At.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+_t,i.RENDERBUFFER,At.__webglColorRenderbuffer[_t]);const qt=n.get(M[_t]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,At.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+_t,i.TEXTURE_2D,qt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,At.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&l){const M=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[M])}}}function tt(A){return Math.min(s.maxSamples,A.samples)}function xt(A){const M=n.get(A);return A.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function rt(A){const M=o.render.frame;h.get(A)!==M&&(h.set(A,M),A.update())}function Dt(A,M){const O=A.colorSpace,q=A.format,Q=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||O!==qi&&O!==Hn&&(ee.getTransfer(O)===he?(q!==un||Q!==Ln)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",O)),M}function mt(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(c.width=A.naturalWidth||A.width,c.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(c.width=A.displayWidth,c.height=A.displayHeight):(c.width=A.width,c.height=A.height),c}this.allocateTextureUnit=k,this.resetTextureUnits=B,this.setTexture2D=Y,this.setTexture2DArray=V,this.setTexture3D=J,this.setTextureCube=H,this.rebindTextures=Ut,this.setupRenderTarget=Kt,this.updateRenderTargetMipmap=K,this.updateMultisampleRenderTarget=Ct,this.setupDepthRenderbuffer=Ot,this.setupFrameBufferTexture=Tt,this.useMultisampledRTT=xt}function w0(i,t){function e(n,s=Hn){let r;const o=ee.getTransfer(s);if(n===Ln)return i.UNSIGNED_BYTE;if(n===Ea)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Ta)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Rc)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Ac)return i.BYTE;if(n===Cc)return i.SHORT;if(n===ys)return i.UNSIGNED_SHORT;if(n===Sa)return i.INT;if(n===hi)return i.UNSIGNED_INT;if(n===Cn)return i.FLOAT;if(n===Ts)return i.HALF_FLOAT;if(n===Pc)return i.ALPHA;if(n===Lc)return i.RGB;if(n===un)return i.RGBA;if(n===Ic)return i.LUMINANCE;if(n===Dc)return i.LUMINANCE_ALPHA;if(n===ki)return i.DEPTH_COMPONENT;if(n===Yi)return i.DEPTH_STENCIL;if(n===Aa)return i.RED;if(n===Ca)return i.RED_INTEGER;if(n===Uc)return i.RG;if(n===Ra)return i.RG_INTEGER;if(n===Pa)return i.RGBA_INTEGER;if(n===vr||n===_r||n===xr||n===yr)if(o===he)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===vr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===_r)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===xr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===yr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===vr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===_r)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===xr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===yr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Wo||n===Xo||n===Yo||n===qo)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Wo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Xo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Yo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===qo)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===$o||n===jo||n===Zo)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===$o||n===jo)return o===he?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Zo)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Jo||n===Ko||n===Qo||n===ta||n===ea||n===na||n===ia||n===sa||n===ra||n===oa||n===aa||n===la||n===ca||n===ha)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Jo)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Ko)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Qo)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===ta)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===ea)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===na)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===ia)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===sa)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===ra)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===oa)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===aa)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===la)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===ca)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===ha)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===br||n===da||n===ua)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===br)return o===he?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===da)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===ua)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Nc||n===fa||n===pa||n===ma)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===br)return r.COMPRESSED_RED_RGTC1_EXT;if(n===fa)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===pa)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===ma)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Xi?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}const S0={type:"move"};class To{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new St,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new St,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new I,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new I),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new St,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new I,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new I),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(const x of t.hand.values()){const m=e.getJointPose(x,n),p=this._getHandJoint(c,x);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,g=.005;c.inputState.pinching&&u>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&u<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(S0)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new St;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const E0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,T0=`
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

}`;class A0{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const s=new De,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new qn({vertexShader:E0,fragmentShader:T0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new jt(new Dn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class C0 extends Zi{constructor(t,e){super();const n=this;let s=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,d=null,u=null,f=null,g=null;const x=new A0,m=e.getContextAttributes();let p=null,b=null;const _=[],v=[],P=new ot;let T=null;const E=new je;E.viewport=new de;const R=new je;R.viewport=new de;const w=[E,R],y=new qu;let D=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let st=_[j];return st===void 0&&(st=new To,_[j]=st),st.getTargetRaySpace()},this.getControllerGrip=function(j){let st=_[j];return st===void 0&&(st=new To,_[j]=st),st.getGripSpace()},this.getHand=function(j){let st=_[j];return st===void 0&&(st=new To,_[j]=st),st.getHandSpace()};function k(j){const st=v.indexOf(j.inputSource);if(st===-1)return;const Tt=_[st];Tt!==void 0&&(Tt.update(j.inputSource,j.frame,c||o),Tt.dispatchEvent({type:j.type,data:j.inputSource}))}function X(){s.removeEventListener("select",k),s.removeEventListener("selectstart",k),s.removeEventListener("selectend",k),s.removeEventListener("squeeze",k),s.removeEventListener("squeezestart",k),s.removeEventListener("squeezeend",k),s.removeEventListener("end",X),s.removeEventListener("inputsourceschange",Y);for(let j=0;j<_.length;j++){const st=v[j];st!==null&&(v[j]=null,_[j].disconnect(st))}D=null,B=null,x.reset(),t.setRenderTarget(p),f=null,u=null,d=null,s=null,b=null,se.stop(),n.isPresenting=!1,t.setPixelRatio(T),t.setSize(P.width,P.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){r=j,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){a=j,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(j){c=j},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(j){if(s=j,s!==null){if(p=t.getRenderTarget(),s.addEventListener("select",k),s.addEventListener("selectstart",k),s.addEventListener("selectend",k),s.addEventListener("squeeze",k),s.addEventListener("squeezestart",k),s.addEventListener("squeezeend",k),s.addEventListener("end",X),s.addEventListener("inputsourceschange",Y),m.xrCompatible!==!0&&await e.makeXRCompatible(),T=t.getPixelRatio(),t.getSize(P),s.renderState.layers===void 0){const st={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,e,st),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),b=new di(f.framebufferWidth,f.framebufferHeight,{format:un,type:Ln,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let st=null,Tt=null,at=null;m.depth&&(at=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,st=m.stencil?Yi:ki,Tt=m.stencil?Xi:hi);const Rt={colorFormat:e.RGBA8,depthFormat:at,scaleFactor:r};d=new XRWebGLBinding(s,e),u=d.createProjectionLayer(Rt),s.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),b=new di(u.textureWidth,u.textureHeight,{format:un,type:Ln,depthTexture:new jc(u.textureWidth,u.textureHeight,Tt,void 0,void 0,void 0,void 0,void 0,void 0,st),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),se.setContext(s),se.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function Y(j){for(let st=0;st<j.removed.length;st++){const Tt=j.removed[st],at=v.indexOf(Tt);at>=0&&(v[at]=null,_[at].disconnect(Tt))}for(let st=0;st<j.added.length;st++){const Tt=j.added[st];let at=v.indexOf(Tt);if(at===-1){for(let Ot=0;Ot<_.length;Ot++)if(Ot>=v.length){v.push(Tt),at=Ot;break}else if(v[Ot]===null){v[Ot]=Tt,at=Ot;break}if(at===-1)break}const Rt=_[at];Rt&&Rt.connect(Tt)}}const V=new I,J=new I;function H(j,st,Tt){V.setFromMatrixPosition(st.matrixWorld),J.setFromMatrixPosition(Tt.matrixWorld);const at=V.distanceTo(J),Rt=st.projectionMatrix.elements,Ot=Tt.projectionMatrix.elements,Ut=Rt[14]/(Rt[10]-1),Kt=Rt[14]/(Rt[10]+1),K=(Rt[9]+1)/Rt[5],it=(Rt[9]-1)/Rt[5],L=(Rt[8]-1)/Rt[0],Ct=(Ot[8]+1)/Ot[0],tt=Ut*L,xt=Ut*Ct,rt=at/(-L+Ct),Dt=rt*-L;if(st.matrixWorld.decompose(j.position,j.quaternion,j.scale),j.translateX(Dt),j.translateZ(rt),j.matrixWorld.compose(j.position,j.quaternion,j.scale),j.matrixWorldInverse.copy(j.matrixWorld).invert(),Rt[10]===-1)j.projectionMatrix.copy(st.projectionMatrix),j.projectionMatrixInverse.copy(st.projectionMatrixInverse);else{const mt=Ut+rt,A=Kt+rt,M=tt-Dt,O=xt+(at-Dt),q=K*Kt/A*mt,Q=it*Kt/A*mt;j.projectionMatrix.makePerspective(M,O,q,Q,mt,A),j.projectionMatrixInverse.copy(j.projectionMatrix).invert()}}function lt(j,st){st===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(st.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(s===null)return;let st=j.near,Tt=j.far;x.texture!==null&&(x.depthNear>0&&(st=x.depthNear),x.depthFar>0&&(Tt=x.depthFar)),y.near=R.near=E.near=st,y.far=R.far=E.far=Tt,(D!==y.near||B!==y.far)&&(s.updateRenderState({depthNear:y.near,depthFar:y.far}),D=y.near,B=y.far),E.layers.mask=j.layers.mask|2,R.layers.mask=j.layers.mask|4,y.layers.mask=E.layers.mask|R.layers.mask;const at=j.parent,Rt=y.cameras;lt(y,at);for(let Ot=0;Ot<Rt.length;Ot++)lt(Rt[Ot],at);Rt.length===2?H(y,E,R):y.projectionMatrix.copy(E.projectionMatrix),vt(j,y,at)};function vt(j,st,Tt){Tt===null?j.matrix.copy(st.matrixWorld):(j.matrix.copy(Tt.matrixWorld),j.matrix.invert(),j.matrix.multiply(st.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(st.projectionMatrix),j.projectionMatrixInverse.copy(st.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=bs*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(u===null&&f===null))return l},this.setFoveation=function(j){l=j,u!==null&&(u.fixedFoveation=j),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=j)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(y)};let wt=null;function zt(j,st){if(h=st.getViewerPose(c||o),g=st,h!==null){const Tt=h.views;f!==null&&(t.setRenderTargetFramebuffer(b,f.framebuffer),t.setRenderTarget(b));let at=!1;Tt.length!==y.cameras.length&&(y.cameras.length=0,at=!0);for(let Ot=0;Ot<Tt.length;Ot++){const Ut=Tt[Ot];let Kt=null;if(f!==null)Kt=f.getViewport(Ut);else{const it=d.getViewSubImage(u,Ut);Kt=it.viewport,Ot===0&&(t.setRenderTargetTextures(b,it.colorTexture,u.ignoreDepthValues?void 0:it.depthStencilTexture),t.setRenderTarget(b))}let K=w[Ot];K===void 0&&(K=new je,K.layers.enable(Ot),K.viewport=new de,w[Ot]=K),K.matrix.fromArray(Ut.transform.matrix),K.matrix.decompose(K.position,K.quaternion,K.scale),K.projectionMatrix.fromArray(Ut.projectionMatrix),K.projectionMatrixInverse.copy(K.projectionMatrix).invert(),K.viewport.set(Kt.x,Kt.y,Kt.width,Kt.height),Ot===0&&(y.matrix.copy(K.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),at===!0&&y.cameras.push(K)}const Rt=s.enabledFeatures;if(Rt&&Rt.includes("depth-sensing")){const Ot=d.getDepthInformation(Tt[0]);Ot&&Ot.isValid&&Ot.texture&&x.init(t,Ot,s.renderState)}}for(let Tt=0;Tt<_.length;Tt++){const at=v[Tt],Rt=_[Tt];at!==null&&Rt!==void 0&&Rt.update(at,st,c||o)}wt&&wt(j,st),st.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:st}),g=null}const se=new ah;se.setAnimationLoop(zt),this.setAnimationLoop=function(j){wt=j},this.dispose=function(){}}}const ni=new In,R0=new pe;function P0(i,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Xc(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,b,_,v){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),d(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p)):p.isMeshStandardMaterial?(r(m,p),u(m,p),p.isMeshPhysicalMaterial&&f(m,p,v)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),x(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,b,_):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Ve&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Ve&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const b=t.get(p),_=b.envMap,v=b.envMapRotation;_&&(m.envMap.value=_,ni.copy(v),ni.x*=-1,ni.y*=-1,ni.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(ni.y*=-1,ni.z*=-1),m.envMapRotation.value.setFromMatrix4(R0.makeRotationFromEuler(ni)),m.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,b,_){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*b,m.scale.value=_*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function d(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function u(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,b){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Ve&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=b.texture,m.transmissionSamplerSize.value.set(b.width,b.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function x(m,p){const b=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(b.matrixWorld),m.nearDistance.value=b.shadow.camera.near,m.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function L0(i,t,e,n){let s={},r={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(b,_){const v=_.program;n.uniformBlockBinding(b,v)}function c(b,_){let v=s[b.id];v===void 0&&(g(b),v=h(b),s[b.id]=v,b.addEventListener("dispose",m));const P=_.program;n.updateUBOMapping(b,P);const T=t.render.frame;r[b.id]!==T&&(u(b),r[b.id]=T)}function h(b){const _=d();b.__bindingPointIndex=_;const v=i.createBuffer(),P=b.__size,T=b.usage;return i.bindBuffer(i.UNIFORM_BUFFER,v),i.bufferData(i.UNIFORM_BUFFER,P,T),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,_,v),v}function d(){for(let b=0;b<a;b++)if(o.indexOf(b)===-1)return o.push(b),b;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(b){const _=s[b.id],v=b.uniforms,P=b.__cache;i.bindBuffer(i.UNIFORM_BUFFER,_);for(let T=0,E=v.length;T<E;T++){const R=Array.isArray(v[T])?v[T]:[v[T]];for(let w=0,y=R.length;w<y;w++){const D=R[w];if(f(D,T,w,P)===!0){const B=D.__offset,k=Array.isArray(D.value)?D.value:[D.value];let X=0;for(let Y=0;Y<k.length;Y++){const V=k[Y],J=x(V);typeof V=="number"||typeof V=="boolean"?(D.__data[0]=V,i.bufferSubData(i.UNIFORM_BUFFER,B+X,D.__data)):V.isMatrix3?(D.__data[0]=V.elements[0],D.__data[1]=V.elements[1],D.__data[2]=V.elements[2],D.__data[3]=0,D.__data[4]=V.elements[3],D.__data[5]=V.elements[4],D.__data[6]=V.elements[5],D.__data[7]=0,D.__data[8]=V.elements[6],D.__data[9]=V.elements[7],D.__data[10]=V.elements[8],D.__data[11]=0):(V.toArray(D.__data,X),X+=J.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,B,D.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(b,_,v,P){const T=b.value,E=_+"_"+v;if(P[E]===void 0)return typeof T=="number"||typeof T=="boolean"?P[E]=T:P[E]=T.clone(),!0;{const R=P[E];if(typeof T=="number"||typeof T=="boolean"){if(R!==T)return P[E]=T,!0}else if(R.equals(T)===!1)return R.copy(T),!0}return!1}function g(b){const _=b.uniforms;let v=0;const P=16;for(let E=0,R=_.length;E<R;E++){const w=Array.isArray(_[E])?_[E]:[_[E]];for(let y=0,D=w.length;y<D;y++){const B=w[y],k=Array.isArray(B.value)?B.value:[B.value];for(let X=0,Y=k.length;X<Y;X++){const V=k[X],J=x(V),H=v%P,lt=H%J.boundary,vt=H+lt;v+=lt,vt!==0&&P-vt<J.storage&&(v+=P-vt),B.__data=new Float32Array(J.storage/Float32Array.BYTES_PER_ELEMENT),B.__offset=v,v+=J.storage}}}const T=v%P;return T>0&&(v+=P-T),b.__size=v,b.__cache={},this}function x(b){const _={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(_.boundary=4,_.storage=4):b.isVector2?(_.boundary=8,_.storage=8):b.isVector3||b.isColor?(_.boundary=16,_.storage=12):b.isVector4?(_.boundary=16,_.storage=16):b.isMatrix3?(_.boundary=48,_.storage=48):b.isMatrix4?(_.boundary=64,_.storage=64):b.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",b),_}function m(b){const _=b.target;_.removeEventListener("dispose",m);const v=o.indexOf(_.__bindingPointIndex);o.splice(v,1),i.deleteBuffer(s[_.id]),delete s[_.id],delete r[_.id]}function p(){for(const b in s)i.deleteBuffer(s[b]);o=[],s={},r={}}return{bind:l,update:c,dispose:p}}class I0{constructor(t={}){const{canvas:e=Ud(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reverseDepthBuffer:u=!1}=t;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=o;const g=new Uint32Array(4),x=new Int32Array(4);let m=null,p=null;const b=[],_=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Pe,this.toneMapping=Wn,this.toneMappingExposure=1;const v=this;let P=!1,T=0,E=0,R=null,w=-1,y=null;const D=new de,B=new de;let k=null;const X=new Yt(0);let Y=0,V=e.width,J=e.height,H=1,lt=null,vt=null;const wt=new de(0,0,V,J),zt=new de(0,0,V,J);let se=!1;const j=new Ua;let st=!1,Tt=!1;const at=new pe,Rt=new pe,Ot=new I,Ut=new de,Kt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let K=!1;function it(){return R===null?H:1}let L=n;function Ct(S,N){return e.getContext(S,N)}try{const S={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${wa}`),e.addEventListener("webglcontextlost",Z,!1),e.addEventListener("webglcontextrestored",gt,!1),e.addEventListener("webglcontextcreationerror",pt,!1),L===null){const N="webgl2";if(L=Ct(N,S),L===null)throw Ct(N)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(S){throw console.error("THREE.WebGLRenderer: "+S.message),S}let tt,xt,rt,Dt,mt,A,M,O,q,Q,$,At,ht,_t,qt,nt,bt,It,Nt,Mt,$t,Vt,ue,U;function dt(){tt=new Gm(L),tt.init(),Vt=new w0(L,tt),xt=new Nm(L,tt,t,Vt),rt=new b0(L,tt),xt.reverseDepthBuffer&&u&&rt.buffers.depth.setReversed(!0),Dt=new Wm(L),mt=new l0,A=new M0(L,tt,rt,mt,xt,Vt,Dt),M=new Om(v),O=new zm(v),q=new Zu(L),ue=new Dm(L,q),Q=new Hm(L,q,Dt,ue),$=new Ym(L,Q,q,Dt),Nt=new Xm(L,xt,A),nt=new Fm(mt),At=new a0(v,M,O,tt,xt,ue,nt),ht=new P0(v,mt),_t=new h0,qt=new g0(tt),It=new Im(v,M,O,rt,$,f,l),bt=new x0(v,$,xt),U=new L0(L,Dt,xt,rt),Mt=new Um(L,tt,Dt),$t=new Vm(L,tt,Dt),Dt.programs=At.programs,v.capabilities=xt,v.extensions=tt,v.properties=mt,v.renderLists=_t,v.shadowMap=bt,v.state=rt,v.info=Dt}dt();const W=new C0(v,L);this.xr=W,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){const S=tt.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=tt.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return H},this.setPixelRatio=function(S){S!==void 0&&(H=S,this.setSize(V,J,!1))},this.getSize=function(S){return S.set(V,J)},this.setSize=function(S,N,z=!0){if(W.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}V=S,J=N,e.width=Math.floor(S*H),e.height=Math.floor(N*H),z===!0&&(e.style.width=S+"px",e.style.height=N+"px"),this.setViewport(0,0,S,N)},this.getDrawingBufferSize=function(S){return S.set(V*H,J*H).floor()},this.setDrawingBufferSize=function(S,N,z){V=S,J=N,H=z,e.width=Math.floor(S*z),e.height=Math.floor(N*z),this.setViewport(0,0,S,N)},this.getCurrentViewport=function(S){return S.copy(D)},this.getViewport=function(S){return S.copy(wt)},this.setViewport=function(S,N,z,G){S.isVector4?wt.set(S.x,S.y,S.z,S.w):wt.set(S,N,z,G),rt.viewport(D.copy(wt).multiplyScalar(H).round())},this.getScissor=function(S){return S.copy(zt)},this.setScissor=function(S,N,z,G){S.isVector4?zt.set(S.x,S.y,S.z,S.w):zt.set(S,N,z,G),rt.scissor(B.copy(zt).multiplyScalar(H).round())},this.getScissorTest=function(){return se},this.setScissorTest=function(S){rt.setScissorTest(se=S)},this.setOpaqueSort=function(S){lt=S},this.setTransparentSort=function(S){vt=S},this.getClearColor=function(S){return S.copy(It.getClearColor())},this.setClearColor=function(){It.setClearColor.apply(It,arguments)},this.getClearAlpha=function(){return It.getClearAlpha()},this.setClearAlpha=function(){It.setClearAlpha.apply(It,arguments)},this.clear=function(S=!0,N=!0,z=!0){let G=0;if(S){let F=!1;if(R!==null){const et=R.texture.format;F=et===Pa||et===Ra||et===Ca}if(F){const et=R.texture.type,ut=et===Ln||et===hi||et===ys||et===Xi||et===Ea||et===Ta,yt=It.getClearColor(),Et=It.getClearAlpha(),Ft=yt.r,Bt=yt.g,Pt=yt.b;ut?(g[0]=Ft,g[1]=Bt,g[2]=Pt,g[3]=Et,L.clearBufferuiv(L.COLOR,0,g)):(x[0]=Ft,x[1]=Bt,x[2]=Pt,x[3]=Et,L.clearBufferiv(L.COLOR,0,x))}else G|=L.COLOR_BUFFER_BIT}N&&(G|=L.DEPTH_BUFFER_BIT),z&&(G|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),L.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",Z,!1),e.removeEventListener("webglcontextrestored",gt,!1),e.removeEventListener("webglcontextcreationerror",pt,!1),It.dispose(),_t.dispose(),qt.dispose(),mt.dispose(),M.dispose(),O.dispose(),$.dispose(),ue.dispose(),U.dispose(),At.dispose(),W.dispose(),W.removeEventListener("sessionstart",Ya),W.removeEventListener("sessionend",qa),jn.stop()};function Z(S){S.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),P=!0}function gt(){console.log("THREE.WebGLRenderer: Context Restored."),P=!1;const S=Dt.autoReset,N=bt.enabled,z=bt.autoUpdate,G=bt.needsUpdate,F=bt.type;dt(),Dt.autoReset=S,bt.enabled=N,bt.autoUpdate=z,bt.needsUpdate=G,bt.type=F}function pt(S){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function Gt(S){const N=S.target;N.removeEventListener("dispose",Gt),xe(N)}function xe(S){Ue(S),mt.remove(S)}function Ue(S){const N=mt.get(S).programs;N!==void 0&&(N.forEach(function(z){At.releaseProgram(z)}),S.isShaderMaterial&&At.releaseShaderCache(S))}this.renderBufferDirect=function(S,N,z,G,F,et){N===null&&(N=Kt);const ut=F.isMesh&&F.matrixWorld.determinant()<0,yt=Ah(S,N,z,G,F);rt.setMaterial(G,ut);let Et=z.index,Ft=1;if(G.wireframe===!0){if(Et=Q.getWireframeAttribute(z),Et===void 0)return;Ft=2}const Bt=z.drawRange,Pt=z.attributes.position;let Qt=Bt.start*Ft,re=(Bt.start+Bt.count)*Ft;et!==null&&(Qt=Math.max(Qt,et.start*Ft),re=Math.min(re,(et.start+et.count)*Ft)),Et!==null?(Qt=Math.max(Qt,0),re=Math.min(re,Et.count)):Pt!=null&&(Qt=Math.max(Qt,0),re=Math.min(re,Pt.count));const Se=re-Qt;if(Se<0||Se===1/0)return;ue.setup(F,G,yt,z,Et);let ye,te=Mt;if(Et!==null&&(ye=q.get(Et),te=$t,te.setIndex(ye)),F.isMesh)G.wireframe===!0?(rt.setLineWidth(G.wireframeLinewidth*it()),te.setMode(L.LINES)):te.setMode(L.TRIANGLES);else if(F.isLine){let Lt=G.linewidth;Lt===void 0&&(Lt=1),rt.setLineWidth(Lt*it()),F.isLineSegments?te.setMode(L.LINES):F.isLineLoop?te.setMode(L.LINE_LOOP):te.setMode(L.LINE_STRIP)}else F.isPoints?te.setMode(L.POINTS):F.isSprite&&te.setMode(L.TRIANGLES);if(F.isBatchedMesh)if(F._multiDrawInstances!==null)te.renderMultiDrawInstances(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount,F._multiDrawInstances);else if(tt.get("WEBGL_multi_draw"))te.renderMultiDraw(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount);else{const Lt=F._multiDrawStarts,Le=F._multiDrawCounts,oe=F._multiDrawCount,on=Et?q.get(Et).bytesPerElement:1,gi=mt.get(G).currentProgram.getUniforms();for(let Ye=0;Ye<oe;Ye++)gi.setValue(L,"_gl_DrawID",Ye),te.render(Lt[Ye]/on,Le[Ye])}else if(F.isInstancedMesh)te.renderInstances(Qt,Se,F.count);else if(z.isInstancedBufferGeometry){const Lt=z._maxInstanceCount!==void 0?z._maxInstanceCount:1/0,Le=Math.min(z.instanceCount,Lt);te.renderInstances(Qt,Se,Le)}else te.render(Qt,Se)};function ae(S,N,z){S.transparent===!0&&S.side===nn&&S.forceSinglePass===!1?(S.side=Ve,S.needsUpdate=!0,Os(S,N,z),S.side=Yn,S.needsUpdate=!0,Os(S,N,z),S.side=nn):Os(S,N,z)}this.compile=function(S,N,z=null){z===null&&(z=S),p=qt.get(z),p.init(N),_.push(p),z.traverseVisible(function(F){F.isLight&&F.layers.test(N.layers)&&(p.pushLight(F),F.castShadow&&p.pushShadow(F))}),S!==z&&S.traverseVisible(function(F){F.isLight&&F.layers.test(N.layers)&&(p.pushLight(F),F.castShadow&&p.pushShadow(F))}),p.setupLights();const G=new Set;return S.traverse(function(F){if(!(F.isMesh||F.isPoints||F.isLine||F.isSprite))return;const et=F.material;if(et)if(Array.isArray(et))for(let ut=0;ut<et.length;ut++){const yt=et[ut];ae(yt,z,F),G.add(yt)}else ae(et,z,F),G.add(et)}),_.pop(),p=null,G},this.compileAsync=function(S,N,z=null){const G=this.compile(S,N,z);return new Promise(F=>{function et(){if(G.forEach(function(ut){mt.get(ut).currentProgram.isReady()&&G.delete(ut)}),G.size===0){F(S);return}setTimeout(et,10)}tt.get("KHR_parallel_shader_compile")!==null?et():setTimeout(et,10)})};let rn=null;function _n(S){rn&&rn(S)}function Ya(){jn.stop()}function qa(){jn.start()}const jn=new ah;jn.setAnimationLoop(_n),typeof self<"u"&&jn.setContext(self),this.setAnimationLoop=function(S){rn=S,W.setAnimationLoop(S),S===null?jn.stop():jn.start()},W.addEventListener("sessionstart",Ya),W.addEventListener("sessionend",qa),this.render=function(S,N){if(N!==void 0&&N.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),W.enabled===!0&&W.isPresenting===!0&&(W.cameraAutoUpdate===!0&&W.updateCamera(N),N=W.getCamera()),S.isScene===!0&&S.onBeforeRender(v,S,N,R),p=qt.get(S,_.length),p.init(N),_.push(p),Rt.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),j.setFromProjectionMatrix(Rt),Tt=this.localClippingEnabled,st=nt.init(this.clippingPlanes,Tt),m=_t.get(S,b.length),m.init(),b.push(m),W.enabled===!0&&W.isPresenting===!0){const et=v.xr.getDepthSensingMesh();et!==null&&Vr(et,N,-1/0,v.sortObjects)}Vr(S,N,0,v.sortObjects),m.finish(),v.sortObjects===!0&&m.sort(lt,vt),K=W.enabled===!1||W.isPresenting===!1||W.hasDepthSensing()===!1,K&&It.addToRenderList(m,S),this.info.render.frame++,st===!0&&nt.beginShadows();const z=p.state.shadowsArray;bt.render(z,S,N),st===!0&&nt.endShadows(),this.info.autoReset===!0&&this.info.reset();const G=m.opaque,F=m.transmissive;if(p.setupLights(),N.isArrayCamera){const et=N.cameras;if(F.length>0)for(let ut=0,yt=et.length;ut<yt;ut++){const Et=et[ut];ja(G,F,S,Et)}K&&It.render(S);for(let ut=0,yt=et.length;ut<yt;ut++){const Et=et[ut];$a(m,S,Et,Et.viewport)}}else F.length>0&&ja(G,F,S,N),K&&It.render(S),$a(m,S,N);R!==null&&(A.updateMultisampleRenderTarget(R),A.updateRenderTargetMipmap(R)),S.isScene===!0&&S.onAfterRender(v,S,N),ue.resetDefaultState(),w=-1,y=null,_.pop(),_.length>0?(p=_[_.length-1],st===!0&&nt.setGlobalState(v.clippingPlanes,p.state.camera)):p=null,b.pop(),b.length>0?m=b[b.length-1]:m=null};function Vr(S,N,z,G){if(S.visible===!1)return;if(S.layers.test(N.layers)){if(S.isGroup)z=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(N);else if(S.isLight)p.pushLight(S),S.castShadow&&p.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||j.intersectsSprite(S)){G&&Ut.setFromMatrixPosition(S.matrixWorld).applyMatrix4(Rt);const ut=$.update(S),yt=S.material;yt.visible&&m.push(S,ut,yt,z,Ut.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||j.intersectsObject(S))){const ut=$.update(S),yt=S.material;if(G&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),Ut.copy(S.boundingSphere.center)):(ut.boundingSphere===null&&ut.computeBoundingSphere(),Ut.copy(ut.boundingSphere.center)),Ut.applyMatrix4(S.matrixWorld).applyMatrix4(Rt)),Array.isArray(yt)){const Et=ut.groups;for(let Ft=0,Bt=Et.length;Ft<Bt;Ft++){const Pt=Et[Ft],Qt=yt[Pt.materialIndex];Qt&&Qt.visible&&m.push(S,ut,Qt,z,Ut.z,Pt)}}else yt.visible&&m.push(S,ut,yt,z,Ut.z,null)}}const et=S.children;for(let ut=0,yt=et.length;ut<yt;ut++)Vr(et[ut],N,z,G)}function $a(S,N,z,G){const F=S.opaque,et=S.transmissive,ut=S.transparent;p.setupLightsView(z),st===!0&&nt.setGlobalState(v.clippingPlanes,z),G&&rt.viewport(D.copy(G)),F.length>0&&Fs(F,N,z),et.length>0&&Fs(et,N,z),ut.length>0&&Fs(ut,N,z),rt.buffers.depth.setTest(!0),rt.buffers.depth.setMask(!0),rt.buffers.color.setMask(!0),rt.setPolygonOffset(!1)}function ja(S,N,z,G){if((z.isScene===!0?z.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[G.id]===void 0&&(p.state.transmissionRenderTarget[G.id]=new di(1,1,{generateMipmaps:!0,type:tt.has("EXT_color_buffer_half_float")||tt.has("EXT_color_buffer_float")?Ts:Ln,minFilter:ci,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ee.workingColorSpace}));const et=p.state.transmissionRenderTarget[G.id],ut=G.viewport||D;et.setSize(ut.z,ut.w);const yt=v.getRenderTarget();v.setRenderTarget(et),v.getClearColor(X),Y=v.getClearAlpha(),Y<1&&v.setClearColor(16777215,.5),v.clear(),K&&It.render(z);const Et=v.toneMapping;v.toneMapping=Wn;const Ft=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),p.setupLightsView(G),st===!0&&nt.setGlobalState(v.clippingPlanes,G),Fs(S,z,G),A.updateMultisampleRenderTarget(et),A.updateRenderTargetMipmap(et),tt.has("WEBGL_multisampled_render_to_texture")===!1){let Bt=!1;for(let Pt=0,Qt=N.length;Pt<Qt;Pt++){const re=N[Pt],Se=re.object,ye=re.geometry,te=re.material,Lt=re.group;if(te.side===nn&&Se.layers.test(G.layers)){const Le=te.side;te.side=Ve,te.needsUpdate=!0,Za(Se,z,G,ye,te,Lt),te.side=Le,te.needsUpdate=!0,Bt=!0}}Bt===!0&&(A.updateMultisampleRenderTarget(et),A.updateRenderTargetMipmap(et))}v.setRenderTarget(yt),v.setClearColor(X,Y),Ft!==void 0&&(G.viewport=Ft),v.toneMapping=Et}function Fs(S,N,z){const G=N.isScene===!0?N.overrideMaterial:null;for(let F=0,et=S.length;F<et;F++){const ut=S[F],yt=ut.object,Et=ut.geometry,Ft=G===null?ut.material:G,Bt=ut.group;yt.layers.test(z.layers)&&Za(yt,N,z,Et,Ft,Bt)}}function Za(S,N,z,G,F,et){S.onBeforeRender(v,N,z,G,F,et),S.modelViewMatrix.multiplyMatrices(z.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),F.onBeforeRender(v,N,z,G,S,et),F.transparent===!0&&F.side===nn&&F.forceSinglePass===!1?(F.side=Ve,F.needsUpdate=!0,v.renderBufferDirect(z,N,G,F,S,et),F.side=Yn,F.needsUpdate=!0,v.renderBufferDirect(z,N,G,F,S,et),F.side=nn):v.renderBufferDirect(z,N,G,F,S,et),S.onAfterRender(v,N,z,G,F,et)}function Os(S,N,z){N.isScene!==!0&&(N=Kt);const G=mt.get(S),F=p.state.lights,et=p.state.shadowsArray,ut=F.state.version,yt=At.getParameters(S,F.state,et,N,z),Et=At.getProgramCacheKey(yt);let Ft=G.programs;G.environment=S.isMeshStandardMaterial?N.environment:null,G.fog=N.fog,G.envMap=(S.isMeshStandardMaterial?O:M).get(S.envMap||G.environment),G.envMapRotation=G.environment!==null&&S.envMap===null?N.environmentRotation:S.envMapRotation,Ft===void 0&&(S.addEventListener("dispose",Gt),Ft=new Map,G.programs=Ft);let Bt=Ft.get(Et);if(Bt!==void 0){if(G.currentProgram===Bt&&G.lightsStateVersion===ut)return Ka(S,yt),Bt}else yt.uniforms=At.getUniforms(S),S.onBeforeCompile(yt,v),Bt=At.acquireProgram(yt,Et),Ft.set(Et,Bt),G.uniforms=yt.uniforms;const Pt=G.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(Pt.clippingPlanes=nt.uniform),Ka(S,yt),G.needsLights=Rh(S),G.lightsStateVersion=ut,G.needsLights&&(Pt.ambientLightColor.value=F.state.ambient,Pt.lightProbe.value=F.state.probe,Pt.directionalLights.value=F.state.directional,Pt.directionalLightShadows.value=F.state.directionalShadow,Pt.spotLights.value=F.state.spot,Pt.spotLightShadows.value=F.state.spotShadow,Pt.rectAreaLights.value=F.state.rectArea,Pt.ltc_1.value=F.state.rectAreaLTC1,Pt.ltc_2.value=F.state.rectAreaLTC2,Pt.pointLights.value=F.state.point,Pt.pointLightShadows.value=F.state.pointShadow,Pt.hemisphereLights.value=F.state.hemi,Pt.directionalShadowMap.value=F.state.directionalShadowMap,Pt.directionalShadowMatrix.value=F.state.directionalShadowMatrix,Pt.spotShadowMap.value=F.state.spotShadowMap,Pt.spotLightMatrix.value=F.state.spotLightMatrix,Pt.spotLightMap.value=F.state.spotLightMap,Pt.pointShadowMap.value=F.state.pointShadowMap,Pt.pointShadowMatrix.value=F.state.pointShadowMatrix),G.currentProgram=Bt,G.uniformsList=null,Bt}function Ja(S){if(S.uniformsList===null){const N=S.currentProgram.getUniforms();S.uniformsList=Mr.seqWithValue(N.seq,S.uniforms)}return S.uniformsList}function Ka(S,N){const z=mt.get(S);z.outputColorSpace=N.outputColorSpace,z.batching=N.batching,z.batchingColor=N.batchingColor,z.instancing=N.instancing,z.instancingColor=N.instancingColor,z.instancingMorph=N.instancingMorph,z.skinning=N.skinning,z.morphTargets=N.morphTargets,z.morphNormals=N.morphNormals,z.morphColors=N.morphColors,z.morphTargetsCount=N.morphTargetsCount,z.numClippingPlanes=N.numClippingPlanes,z.numIntersection=N.numClipIntersection,z.vertexAlphas=N.vertexAlphas,z.vertexTangents=N.vertexTangents,z.toneMapping=N.toneMapping}function Ah(S,N,z,G,F){N.isScene!==!0&&(N=Kt),A.resetTextureUnits();const et=N.fog,ut=G.isMeshStandardMaterial?N.environment:null,yt=R===null?v.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:qi,Et=(G.isMeshStandardMaterial?O:M).get(G.envMap||ut),Ft=G.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,Bt=!!z.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),Pt=!!z.morphAttributes.position,Qt=!!z.morphAttributes.normal,re=!!z.morphAttributes.color;let Se=Wn;G.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(Se=v.toneMapping);const ye=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,te=ye!==void 0?ye.length:0,Lt=mt.get(G),Le=p.state.lights;if(st===!0&&(Tt===!0||S!==y)){const Oe=S===y&&G.id===w;nt.setState(G,S,Oe)}let oe=!1;G.version===Lt.__version?(Lt.needsLights&&Lt.lightsStateVersion!==Le.state.version||Lt.outputColorSpace!==yt||F.isBatchedMesh&&Lt.batching===!1||!F.isBatchedMesh&&Lt.batching===!0||F.isBatchedMesh&&Lt.batchingColor===!0&&F.colorTexture===null||F.isBatchedMesh&&Lt.batchingColor===!1&&F.colorTexture!==null||F.isInstancedMesh&&Lt.instancing===!1||!F.isInstancedMesh&&Lt.instancing===!0||F.isSkinnedMesh&&Lt.skinning===!1||!F.isSkinnedMesh&&Lt.skinning===!0||F.isInstancedMesh&&Lt.instancingColor===!0&&F.instanceColor===null||F.isInstancedMesh&&Lt.instancingColor===!1&&F.instanceColor!==null||F.isInstancedMesh&&Lt.instancingMorph===!0&&F.morphTexture===null||F.isInstancedMesh&&Lt.instancingMorph===!1&&F.morphTexture!==null||Lt.envMap!==Et||G.fog===!0&&Lt.fog!==et||Lt.numClippingPlanes!==void 0&&(Lt.numClippingPlanes!==nt.numPlanes||Lt.numIntersection!==nt.numIntersection)||Lt.vertexAlphas!==Ft||Lt.vertexTangents!==Bt||Lt.morphTargets!==Pt||Lt.morphNormals!==Qt||Lt.morphColors!==re||Lt.toneMapping!==Se||Lt.morphTargetsCount!==te)&&(oe=!0):(oe=!0,Lt.__version=G.version);let on=Lt.currentProgram;oe===!0&&(on=Os(G,N,F));let gi=!1,Ye=!1,ts=!1;const me=on.getUniforms(),Ke=Lt.uniforms;if(rt.useProgram(on.program)&&(gi=!0,Ye=!0,ts=!0),G.id!==w&&(w=G.id,Ye=!0),gi||y!==S){rt.buffers.depth.getReversed()?(at.copy(S.projectionMatrix),Fd(at),Od(at),me.setValue(L,"projectionMatrix",at)):me.setValue(L,"projectionMatrix",S.projectionMatrix),me.setValue(L,"viewMatrix",S.matrixWorldInverse);const Ge=me.map.cameraPosition;Ge!==void 0&&Ge.setValue(L,Ot.setFromMatrixPosition(S.matrixWorld)),xt.logarithmicDepthBuffer&&me.setValue(L,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&me.setValue(L,"isOrthographic",S.isOrthographicCamera===!0),y!==S&&(y=S,Ye=!0,ts=!0)}if(F.isSkinnedMesh){me.setOptional(L,F,"bindMatrix"),me.setOptional(L,F,"bindMatrixInverse");const Oe=F.skeleton;Oe&&(Oe.boneTexture===null&&Oe.computeBoneTexture(),me.setValue(L,"boneTexture",Oe.boneTexture,A))}F.isBatchedMesh&&(me.setOptional(L,F,"batchingTexture"),me.setValue(L,"batchingTexture",F._matricesTexture,A),me.setOptional(L,F,"batchingIdTexture"),me.setValue(L,"batchingIdTexture",F._indirectTexture,A),me.setOptional(L,F,"batchingColorTexture"),F._colorsTexture!==null&&me.setValue(L,"batchingColorTexture",F._colorsTexture,A));const Qe=z.morphAttributes;if((Qe.position!==void 0||Qe.normal!==void 0||Qe.color!==void 0)&&Nt.update(F,z,on),(Ye||Lt.receiveShadow!==F.receiveShadow)&&(Lt.receiveShadow=F.receiveShadow,me.setValue(L,"receiveShadow",F.receiveShadow)),G.isMeshGouraudMaterial&&G.envMap!==null&&(Ke.envMap.value=Et,Ke.flipEnvMap.value=Et.isCubeTexture&&Et.isRenderTargetTexture===!1?-1:1),G.isMeshStandardMaterial&&G.envMap===null&&N.environment!==null&&(Ke.envMapIntensity.value=N.environmentIntensity),Ye&&(me.setValue(L,"toneMappingExposure",v.toneMappingExposure),Lt.needsLights&&Ch(Ke,ts),et&&G.fog===!0&&ht.refreshFogUniforms(Ke,et),ht.refreshMaterialUniforms(Ke,G,H,J,p.state.transmissionRenderTarget[S.id]),Mr.upload(L,Ja(Lt),Ke,A)),G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(Mr.upload(L,Ja(Lt),Ke,A),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&me.setValue(L,"center",F.center),me.setValue(L,"modelViewMatrix",F.modelViewMatrix),me.setValue(L,"normalMatrix",F.normalMatrix),me.setValue(L,"modelMatrix",F.matrixWorld),G.isShaderMaterial||G.isRawShaderMaterial){const Oe=G.uniformsGroups;for(let Ge=0,Wr=Oe.length;Ge<Wr;Ge++){const Zn=Oe[Ge];U.update(Zn,on),U.bind(Zn,on)}}return on}function Ch(S,N){S.ambientLightColor.needsUpdate=N,S.lightProbe.needsUpdate=N,S.directionalLights.needsUpdate=N,S.directionalLightShadows.needsUpdate=N,S.pointLights.needsUpdate=N,S.pointLightShadows.needsUpdate=N,S.spotLights.needsUpdate=N,S.spotLightShadows.needsUpdate=N,S.rectAreaLights.needsUpdate=N,S.hemisphereLights.needsUpdate=N}function Rh(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return T},this.getActiveMipmapLevel=function(){return E},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(S,N,z){mt.get(S.texture).__webglTexture=N,mt.get(S.depthTexture).__webglTexture=z;const G=mt.get(S);G.__hasExternalTextures=!0,G.__autoAllocateDepthBuffer=z===void 0,G.__autoAllocateDepthBuffer||tt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),G.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(S,N){const z=mt.get(S);z.__webglFramebuffer=N,z.__useDefaultFramebuffer=N===void 0},this.setRenderTarget=function(S,N=0,z=0){R=S,T=N,E=z;let G=!0,F=null,et=!1,ut=!1;if(S){const Et=mt.get(S);if(Et.__useDefaultFramebuffer!==void 0)rt.bindFramebuffer(L.FRAMEBUFFER,null),G=!1;else if(Et.__webglFramebuffer===void 0)A.setupRenderTarget(S);else if(Et.__hasExternalTextures)A.rebindTextures(S,mt.get(S.texture).__webglTexture,mt.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){const Pt=S.depthTexture;if(Et.__boundDepthTexture!==Pt){if(Pt!==null&&mt.has(Pt)&&(S.width!==Pt.image.width||S.height!==Pt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");A.setupDepthRenderbuffer(S)}}const Ft=S.texture;(Ft.isData3DTexture||Ft.isDataArrayTexture||Ft.isCompressedArrayTexture)&&(ut=!0);const Bt=mt.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Bt[N])?F=Bt[N][z]:F=Bt[N],et=!0):S.samples>0&&A.useMultisampledRTT(S)===!1?F=mt.get(S).__webglMultisampledFramebuffer:Array.isArray(Bt)?F=Bt[z]:F=Bt,D.copy(S.viewport),B.copy(S.scissor),k=S.scissorTest}else D.copy(wt).multiplyScalar(H).floor(),B.copy(zt).multiplyScalar(H).floor(),k=se;if(rt.bindFramebuffer(L.FRAMEBUFFER,F)&&G&&rt.drawBuffers(S,F),rt.viewport(D),rt.scissor(B),rt.setScissorTest(k),et){const Et=mt.get(S.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+N,Et.__webglTexture,z)}else if(ut){const Et=mt.get(S.texture),Ft=N||0;L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,Et.__webglTexture,z||0,Ft)}w=-1},this.readRenderTargetPixels=function(S,N,z,G,F,et,ut){if(!(S&&S.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let yt=mt.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&ut!==void 0&&(yt=yt[ut]),yt){rt.bindFramebuffer(L.FRAMEBUFFER,yt);try{const Et=S.texture,Ft=Et.format,Bt=Et.type;if(!xt.textureFormatReadable(Ft)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!xt.textureTypeReadable(Bt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=S.width-G&&z>=0&&z<=S.height-F&&L.readPixels(N,z,G,F,Vt.convert(Ft),Vt.convert(Bt),et)}finally{const Et=R!==null?mt.get(R).__webglFramebuffer:null;rt.bindFramebuffer(L.FRAMEBUFFER,Et)}}},this.readRenderTargetPixelsAsync=async function(S,N,z,G,F,et,ut){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let yt=mt.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&ut!==void 0&&(yt=yt[ut]),yt){const Et=S.texture,Ft=Et.format,Bt=Et.type;if(!xt.textureFormatReadable(Ft))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!xt.textureTypeReadable(Bt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(N>=0&&N<=S.width-G&&z>=0&&z<=S.height-F){rt.bindFramebuffer(L.FRAMEBUFFER,yt);const Pt=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,Pt),L.bufferData(L.PIXEL_PACK_BUFFER,et.byteLength,L.STREAM_READ),L.readPixels(N,z,G,F,Vt.convert(Ft),Vt.convert(Bt),0);const Qt=R!==null?mt.get(R).__webglFramebuffer:null;rt.bindFramebuffer(L.FRAMEBUFFER,Qt);const re=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await Nd(L,re,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,Pt),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,et),L.deleteBuffer(Pt),L.deleteSync(re),et}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(S,N=null,z=0){S.isTexture!==!0&&(Ui("WebGLRenderer: copyFramebufferToTexture function signature has changed."),N=arguments[0]||null,S=arguments[1]);const G=Math.pow(2,-z),F=Math.floor(S.image.width*G),et=Math.floor(S.image.height*G),ut=N!==null?N.x:0,yt=N!==null?N.y:0;A.setTexture2D(S,0),L.copyTexSubImage2D(L.TEXTURE_2D,z,0,0,ut,yt,F,et),rt.unbindTexture()};const Ph=L.createFramebuffer(),Lh=L.createFramebuffer();this.copyTextureToTexture=function(S,N,z=null,G=null,F=0,et=null){S.isTexture!==!0&&(Ui("WebGLRenderer: copyTextureToTexture function signature has changed."),G=arguments[0]||null,S=arguments[1],N=arguments[2],et=arguments[3]||0,z=null),et===null&&(F!==0?(Ui("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),et=F,F=0):et=0);let ut,yt,Et,Ft,Bt,Pt,Qt,re,Se;const ye=S.isCompressedTexture?S.mipmaps[et]:S.image;if(z!==null)ut=z.max.x-z.min.x,yt=z.max.y-z.min.y,Et=z.isBox3?z.max.z-z.min.z:1,Ft=z.min.x,Bt=z.min.y,Pt=z.isBox3?z.min.z:0;else{const Qe=Math.pow(2,-F);ut=Math.floor(ye.width*Qe),yt=Math.floor(ye.height*Qe),S.isDataArrayTexture?Et=ye.depth:S.isData3DTexture?Et=Math.floor(ye.depth*Qe):Et=1,Ft=0,Bt=0,Pt=0}G!==null?(Qt=G.x,re=G.y,Se=G.z):(Qt=0,re=0,Se=0);const te=Vt.convert(N.format),Lt=Vt.convert(N.type);let Le;N.isData3DTexture?(A.setTexture3D(N,0),Le=L.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?(A.setTexture2DArray(N,0),Le=L.TEXTURE_2D_ARRAY):(A.setTexture2D(N,0),Le=L.TEXTURE_2D),L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,N.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,N.unpackAlignment);const oe=L.getParameter(L.UNPACK_ROW_LENGTH),on=L.getParameter(L.UNPACK_IMAGE_HEIGHT),gi=L.getParameter(L.UNPACK_SKIP_PIXELS),Ye=L.getParameter(L.UNPACK_SKIP_ROWS),ts=L.getParameter(L.UNPACK_SKIP_IMAGES);L.pixelStorei(L.UNPACK_ROW_LENGTH,ye.width),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,ye.height),L.pixelStorei(L.UNPACK_SKIP_PIXELS,Ft),L.pixelStorei(L.UNPACK_SKIP_ROWS,Bt),L.pixelStorei(L.UNPACK_SKIP_IMAGES,Pt);const me=S.isDataArrayTexture||S.isData3DTexture,Ke=N.isDataArrayTexture||N.isData3DTexture;if(S.isDepthTexture){const Qe=mt.get(S),Oe=mt.get(N),Ge=mt.get(Qe.__renderTarget),Wr=mt.get(Oe.__renderTarget);rt.bindFramebuffer(L.READ_FRAMEBUFFER,Ge.__webglFramebuffer),rt.bindFramebuffer(L.DRAW_FRAMEBUFFER,Wr.__webglFramebuffer);for(let Zn=0;Zn<Et;Zn++)me&&(L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,mt.get(S).__webglTexture,F,Pt+Zn),L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,mt.get(N).__webglTexture,et,Se+Zn)),L.blitFramebuffer(Ft,Bt,ut,yt,Qt,re,ut,yt,L.DEPTH_BUFFER_BIT,L.NEAREST);rt.bindFramebuffer(L.READ_FRAMEBUFFER,null),rt.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else if(F!==0||S.isRenderTargetTexture||mt.has(S)){const Qe=mt.get(S),Oe=mt.get(N);rt.bindFramebuffer(L.READ_FRAMEBUFFER,Ph),rt.bindFramebuffer(L.DRAW_FRAMEBUFFER,Lh);for(let Ge=0;Ge<Et;Ge++)me?L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Qe.__webglTexture,F,Pt+Ge):L.framebufferTexture2D(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,Qe.__webglTexture,F),Ke?L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Oe.__webglTexture,et,Se+Ge):L.framebufferTexture2D(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,Oe.__webglTexture,et),F!==0?L.blitFramebuffer(Ft,Bt,ut,yt,Qt,re,ut,yt,L.COLOR_BUFFER_BIT,L.NEAREST):Ke?L.copyTexSubImage3D(Le,et,Qt,re,Se+Ge,Ft,Bt,ut,yt):L.copyTexSubImage2D(Le,et,Qt,re,Ft,Bt,ut,yt);rt.bindFramebuffer(L.READ_FRAMEBUFFER,null),rt.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else Ke?S.isDataTexture||S.isData3DTexture?L.texSubImage3D(Le,et,Qt,re,Se,ut,yt,Et,te,Lt,ye.data):N.isCompressedArrayTexture?L.compressedTexSubImage3D(Le,et,Qt,re,Se,ut,yt,Et,te,ye.data):L.texSubImage3D(Le,et,Qt,re,Se,ut,yt,Et,te,Lt,ye):S.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,et,Qt,re,ut,yt,te,Lt,ye.data):S.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,et,Qt,re,ye.width,ye.height,te,ye.data):L.texSubImage2D(L.TEXTURE_2D,et,Qt,re,ut,yt,te,Lt,ye);L.pixelStorei(L.UNPACK_ROW_LENGTH,oe),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,on),L.pixelStorei(L.UNPACK_SKIP_PIXELS,gi),L.pixelStorei(L.UNPACK_SKIP_ROWS,Ye),L.pixelStorei(L.UNPACK_SKIP_IMAGES,ts),et===0&&N.generateMipmaps&&L.generateMipmap(Le),rt.unbindTexture()},this.copyTextureToTexture3D=function(S,N,z=null,G=null,F=0){return S.isTexture!==!0&&(Ui("WebGLRenderer: copyTextureToTexture3D function signature has changed."),z=arguments[0]||null,G=arguments[1]||null,S=arguments[2],N=arguments[3],F=arguments[4]||0),Ui('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(S,N,z,G,F)},this.initRenderTarget=function(S){mt.get(S).__webglFramebuffer===void 0&&A.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?A.setTextureCube(S,0):S.isData3DTexture?A.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?A.setTexture2DArray(S,0):A.setTexture2D(S,0),rt.unbindTexture()},this.resetState=function(){T=0,E=0,R=null,rt.reset(),ue.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Rn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=ee._getDrawingBufferColorSpace(t),e.unpackColorSpace=ee._getUnpackColorSpace()}}const D0=2;function U0(i){const t=typeof navigator.gpu<"u",e=new I0({canvas:i,antialias:!0,alpha:!1,powerPreference:"high-performance"}),n=Math.min(window.devicePixelRatio||1,D0);return e.setPixelRatio(n),e.outputColorSpace=Pe,e.toneMapping=Ec,e.toneMappingExposure=1.06,e.shadowMap.enabled=!0,e.shadowMap.type=wc,{renderer:e,info:{backend:"webgl2",webgpuSupported:t,pixelRatio:n}}}class Gr{renderer;info;scene;camera;wrap;canvas;clock=new $u;handlers=new Set;rafId=0;running=!1;lastTickAt=0;watchdog=null;resizeObserver;frameCenter=new I(.1,.2,.1);framePoints=[];static VIEW_DIR=new I(.02,.62,.782).normalize();viewDir;fovFor;onVisibility=()=>{document.hidden?this.stopLoop():this.startLoop()};constructor(t,e={}){this.wrap=t,this.canvas=document.createElement("canvas"),this.canvas.setAttribute("aria-label","CodeBops 3D world"),t.appendChild(this.canvas);const{renderer:n,info:s}=U0(this.canvas);this.renderer=n,this.info=s,this.viewDir=e.viewDir?new I(e.viewDir.x,e.viewDir.y,e.viewDir.z).normalize():Gr.VIEW_DIR.clone(),this.fovFor=e.fovFor??(l=>l>=1.4?34:l>=1?40:46),this.scene=new ou,this.scene.background=new Yt("#6fc7ff"),this.scene.fog=new Ar("#a8dcff",50,130),this.camera=new je(34,16/9,.1,120),this.camera.position.set(.2,8.8,10.8),this.camera.lookAt(.1,.2,.1);const r=e.indoor?new Ll("#a8b6e8","#39406e",.95):new Ll("#cfeaff","#79c95f",1.15);this.scene.add(r);const o=e.indoor?new xo("#ffe1b0",1.7):new xo("#fff3d6",2.1);e.indoor?o.position.set(3,10,12):o.position.set(7,14,8),o.castShadow=!0,o.shadow.mapSize.set(2048,2048),o.shadow.camera.left=-14,o.shadow.camera.right=14,o.shadow.camera.top=14,o.shadow.camera.bottom=-14,o.shadow.camera.far=45,o.shadow.bias=-4e-4,o.shadow.radius=6,this.scene.add(o);const a=new xo("#bcd6ff",.55);a.position.set(-6,8,-4),this.scene.add(a),this.resizeObserver=new ResizeObserver(()=>this.resize()),this.resizeObserver.observe(this.wrap),document.addEventListener("visibilitychange",this.onVisibility),this.resize()}onTick(t){return this.handlers.add(t),()=>this.handlers.delete(t)}startLoop(){if(this.running)return;this.running=!0,this.clock.getDelta();const t=()=>{this.lastTickAt=performance.now();const n=Math.min(this.clock.getDelta(),.25);this.handlers.forEach(s=>s(n,this.clock.elapsedTime)),this.renderer.render(this.scene,this.camera)},e=()=>{this.running&&(this.rafId=requestAnimationFrame(e),t())};this.rafId=requestAnimationFrame(e),this.watchdog=window.setInterval(()=>{this.running&&performance.now()-this.lastTickAt>250&&t()},100)}stopLoop(){this.running=!1,cancelAnimationFrame(this.rafId),this.watchdog!==null&&(clearInterval(this.watchdog),this.watchdog=null)}frameArea(t,e){this.frameCenter.copy(t),this.framePoints=e.map(n=>n.clone()),this.applyFrame()}applyFrame(){const e=this.camera.aspect<1?1.08:1.2;let n=11;const s=this.camera;for(let r=0;r<4;r++){s.position.copy(this.frameCenter).addScaledVector(this.viewDir,n),s.lookAt(this.frameCenter.x,this.frameCenter.y,this.frameCenter.z),s.updateMatrixWorld(!0),s.updateProjectionMatrix();let o=0;for(const l of this.framePoints){const c=l.clone().project(s);o=Math.max(o,Math.abs(c.x),Math.abs(c.y))}const a=o*e;if(a<=1||this.framePoints.length===0)break;n*=a}}setSky(t,e=26,n=62){this.scene.background=new Yt(t),this.scene.fog=new Ar(t,e,n),this.running||this.renderer.render(this.scene,this.camera)}resize(){const t=Math.max(1,this.wrap.clientWidth),e=Math.max(1,this.wrap.clientHeight);this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),this.renderer.setSize(t,e,!1),this.camera.aspect=t/e;const n=t/e;this.camera.fov=this.fovFor(n),n<1?this.camera.setViewOffset(t,e,0,Math.round(e*.085),t,e):this.camera.clearViewOffset(),this.camera.updateProjectionMatrix(),this.applyFrame(),this.running||this.renderer.render(this.scene,this.camera)}dispose(){this.stopLoop(),this.resizeObserver.disconnect(),document.removeEventListener("visibilitychange",this.onVisibility),this.scene.traverse(t=>{if(t instanceof jt){t.geometry.dispose();const e=Array.isArray(t.material)?t.material:[t.material];for(const n of e)if(!n.userData?.shared){for(const s of Object.values(n))s instanceof De&&!s.userData?.shared&&s.dispose();n.dispose()}}}),this.renderer.dispose(),this.canvas.remove()}}const as=new I;function en(i,t,e,n,s,r){const o=2*Math.PI*s/4,a=Math.max(r-2*s,0),l=Math.PI/4;as.copy(t),as[n]=0,as.normalize();const c=.5*o/(o+a),h=1-as.angleTo(i)/l;return Math.sign(as[e])===1?h*c:a/(o+a)+c+c*(1-h)}class ge extends fe{constructor(t=1,e=1,n=1,s=2,r=.1){if(s=s*2+1,r=Math.min(t/2,e/2,n/2,r),super(1,1,1,s,s,s),s===1)return;const o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;const a=new I,l=new I,c=new I(t,e,n).divideScalar(2).subScalar(r),h=this.attributes.position.array,d=this.attributes.normal.array,u=this.attributes.uv.array,f=h.length/6,g=new I,x=.5/s;for(let m=0,p=0;m<h.length;m+=3,p+=2)switch(a.fromArray(h,m),l.copy(a),l.x-=Math.sign(l.x)*x,l.y-=Math.sign(l.y)*x,l.z-=Math.sign(l.z)*x,l.normalize(),h[m+0]=c.x*Math.sign(a.x)+l.x*r,h[m+1]=c.y*Math.sign(a.y)+l.y*r,h[m+2]=c.z*Math.sign(a.z)+l.z*r,d[m+0]=l.x,d[m+1]=l.y,d[m+2]=l.z,Math.floor(m/f)){case 0:g.set(1,0,0),u[p+0]=en(g,l,"z","y",r,n),u[p+1]=1-en(g,l,"y","z",r,e);break;case 1:g.set(-1,0,0),u[p+0]=1-en(g,l,"z","y",r,n),u[p+1]=1-en(g,l,"y","z",r,e);break;case 2:g.set(0,1,0),u[p+0]=1-en(g,l,"x","z",r,t),u[p+1]=en(g,l,"z","x",r,n);break;case 3:g.set(0,-1,0),u[p+0]=1-en(g,l,"x","z",r,t),u[p+1]=1-en(g,l,"z","x",r,n);break;case 4:g.set(0,0,1),u[p+0]=1-en(g,l,"x","y",r,t),u[p+1]=1-en(g,l,"y","x",r,e);break;case 5:g.set(0,0,-1),u[p+0]=en(g,l,"x","y",r,t),u[p+1]=1-en(g,l,"y","x",r,e);break}}}let zn=null;function N0(){if(zn)return zn;const i=new Uint8Array([90,150,210,255]);return zn=new au(i,4,1,Aa),zn.minFilter=ze,zn.magFilter=ze,zn.needsUpdate=!0,zn.userData.shared=!0,zn}const ac=new Map;function ft(i){const t=String(i);let e=ac.get(t);return e||(e=new we({color:i,gradientMap:N0()}),e.userData.shared=!0,ac.set(t,e)),e}let Ao=null;function F0(){if(Ao)return Ao;const i=128,t=document.createElement("canvas");t.width=t.height=i;const e=t.getContext("2d"),n=e.createRadialGradient(i/2,i/2,6,i/2,i/2,i/2);n.addColorStop(0,"rgba(13,20,55,0.42)"),n.addColorStop(.6,"rgba(13,20,55,0.18)"),n.addColorStop(1,"rgba(13,20,55,0)"),e.fillStyle=n,e.fillRect(0,0,i,i);const s=new Ls(t);return s.colorSpace=Pe,s.userData.shared=!0,Ao=s,s}function uh(){const t=document.createElement("canvas");t.width=t.height=256;const e=t.getContext("2d");e.fillStyle="#37b6f6",e.fillRect(0,0,256,256),e.strokeStyle="rgba(255,255,255,0.5)",e.lineWidth=5,e.lineCap="round";for(let s=0;s<6;s++){e.beginPath();const r=20+s*42;for(let o=-20;o<=276;o+=8){const a=r+Math.sin(o/256*Math.PI*3+s*1.7)*7;o===-20?e.moveTo(o,a):e.lineTo(o,a)}e.stroke()}const n=new Ls(t);return n.wrapS=n.wrapT=Wi,n.repeat.set(2.2,2.2),n.colorSpace=Pe,n}function ne(i,t,e=0,n=0,s=0,r=!0,o=!0){const a=new jt(i,t);return a.position.set(e,n,s),a.castShadow=r,a.receiveShadow=o,a}function O0(){const i=new ge(30,1.4,22,4,.55);return ne(i,ft("#5fc94e"),0,-.72,0,!1,!0)}const ji=.28;function Ha(i,t){const e=new St,n=new ge(i,ji,i,3,.1);return e.add(ne(n,ft(t),0,-ji/2,0)),e}function Co(i=1,t="#3faf5a",e="#2f9247"){const n=new St,s=ne(new kt(.22*i,.3*i,1.4*i,8),ft("#8d5a2b"),0,.7*i,0);n.add(s);const r=[[0,1.85,0,1,t],[-.62,1.45,.12,.72,e],[.6,1.5,-.1,.78,t],[.05,1.4,.55,.6,e]];for(const[o,a,l,c,h]of r)n.add(ne(new Jt(c*i,14,12),ft(h),o*i,a*i,l*i));return n}function B0(i=2.2,t=3.4){const e=new St,n=9,s=ft("#b5773f"),r=ft("#8d5a2b");for(let o=0;o<n;o++){const a=o/(n-1)-.5,l=ne(new fe(i,.1,t/n-.045),s);l.position.set(0,Math.cos(a*Math.PI)*.42+.12,a*t),l.rotation.x=-Math.sin(a*Math.PI)*.45,e.add(l)}for(const o of[-1,1]){const a=ne(new Xe(t*.42,.05,6,20,Math.PI*.72),r,o*(i/2),.34,0);a.rotation.y=Math.PI/2,a.rotation.z=Math.PI*.14,e.add(a);for(const l of[-t/2+.15,0,t/2-.15])e.add(ne(new kt(.06,.06,.42,6),r,o*(i/2),.3,l))}return e}function k0(i,t=1.9){const e=new Zc(i),n=uh(),s=new St,r=new Ir(e,40,t/2,10,!1),o=new we({map:n,gradientMap:null}),a=new jt(r,o);a.scale.y=.12,a.position.y=.06,a.receiveShadow=!0,s.add(a);const l=new jt(new Ir(e,40,t/2+.16,10,!1),ft("#bfeaff"));return l.scale.y=.07,l.position.y=.02,s.add(l),{group:s,texture:n}}function ba(i=3,t=.7){const e=new St;for(let n=0;n<i;n++){const s=.22+Math.random()*.2,r=ne(new Ba(s,1),ft(n%2?"#9aa7bd":"#b3bfd2"));r.position.set((Math.random()-.5)*t,s*.55,(Math.random()-.5)*t),r.scale.y=.72,r.rotation.set(Math.random(),Math.random()*Math.PI,Math.random()*.4),e.add(r)}return e}function fh(i=1){const t=new St,e=["#2f9247","#3faf5a","#37a24e"];[[0,.34,0,.42],[-.3,.26,.08,.3],[.3,.28,-.04,.32],[.02,.3,.3,.26]].forEach(([s,r,o,a],l)=>{t.add(ne(new Jt(a*i,12,10),ft(e[l%e.length]),s*i,r*i,o*i))});for(let s=0;s<3;s++)t.add(ne(new Jt(.06*i,8,6),ft(["#ff8fc0","#ffd23e","#ffffff"][s]),(Math.random()-.5)*.5*i,(.4+Math.random()*.25)*i,(Math.random()-.5)*.5*i,!1,!1));return t}function ph(i=5,t=1.1){const e=new St,n=["#ff8fc0","#ffd23e","#7dd7ff","#c79bff","#ffffff","#ff9f7a"];for(let s=0;s<i;s++){const r=new St,o=(Math.random()-.5)*t,a=(Math.random()-.5)*t,l=.26+Math.random()*.16;r.add(ne(new kt(.02,.03,l,5),ft("#2f9247"),0,l/2,0,!1,!1));const c=n[Math.floor(Math.random()*n.length)];for(let h=0;h<5;h++){const d=h/5*Math.PI*2;r.add(ne(new Jt(.055,8,6),ft(c),Math.cos(d)*.09,l,Math.sin(d)*.09,!1,!1))}r.add(ne(new Jt(.05,8,6),ft("#ffb703"),0,l+.01,0,!1,!1)),r.position.set(o,0,a),e.add(r)}return e}function z0(){const i=new St,t=ne(new kt(.62,.72,.16,24),ft("#8b4ddb"),0,.5,0),e=ne(new kt(.5,.5,.06,24),ft("#a06bff"),0,.6,0);i.add(t,e);const n=new Ji,s=5;for(let a=0;a<s*2;a++){const l=a%2===0?.34:.15,c=a/(s*2)*Math.PI*2-Math.PI/2,h=Math.cos(c)*l,d=Math.sin(c)*l;a===0?n.moveTo(h,d):n.lineTo(h,d)}n.closePath();const r=new Is(n,{depth:.12,bevelEnabled:!0,bevelSize:.03,bevelThickness:.03,bevelSegments:2});r.center();const o=ne(r,ft("#ffd23e"),0,.86,0);return o.rotation.x=-1.05,o.name="goalStar",i.add(o),i}function G0(){const i=new St,t=ne(new Jt(.24,14,12),ft("#ff4757"),0,.24,0);t.scale.set(1,.92,.94),i.add(t);for(let e=0;e<4;e++){const n=e/4*Math.PI*2,s=ne(new sn(.07,.16,5),ft("#3faf5a"),Math.cos(n)*.09,.44,Math.sin(n)*.09);s.rotation.set(Math.cos(n)*.9,0,-Math.sin(n)*.9),i.add(s)}i.add(ne(new kt(.02,.03,.1,5),ft("#2f9247"),0,.5,0));for(let e=0;e<10;e++){const n=e/10*Math.PI*2,s=.14+e%3*.08,r=.21*Math.cos((s-.24)*1.6);i.add(ne(new Jt(.018,6,4),ft("#ffe9a8"),Math.cos(n)*r,s,Math.sin(n)*r,!1,!1))}return i}function mh(i=1){const t=new St,e=new we({color:"#ffffff",gradientMap:null,transparent:!0,opacity:.96}),n=[[0,0,0,.55],[-.55,-.06,.05,.38],[.55,-.04,-.03,.42],[.1,.22,0,.4]];for(const[s,r,o,a]of n){const l=new jt(new Jt(a*i,12,10),e);l.position.set(s*i,r*i,o*i),t.add(l)}return t}function H0(){const i=new St,t=[[-9,-.4,-10.5,6.5,"#8fdc6f"],[8.5,-.6,-11,7.5,"#a2e57f"],[0,-.9,-13,9,"#b7ec92"]];for(const[s,r,o,a,l]of t){const c=ne(new Jt(a,20,14),ft(l),s,r,o,!1,!0);c.scale.y=.42,i.add(c)}const e=new St;e.add(ne(new fe(1.1,.9,1),ft("#c79bff"),0,.45,0,!1,!1));const n=ne(new sn(.95,.7,4),ft("#8b4ddb"),0,1.25,0,!1,!1);return n.rotation.y=Math.PI/4,e.add(n),e.position.set(8.6,1.1,-11.2),i.add(e),i}function gh(i=26,t=12){const e=new Float32Array(i*3);for(let o=0;o<i;o++)e[o*3]=(Math.random()-.5)*t,e[o*3+1]=.6+Math.random()*2.6,e[o*3+2]=(Math.random()-.5)*t;const n=new _e;n.setAttribute("position",new We(e,3));const s=new Ps({color:"#fff7c0",size:.14,transparent:!0,opacity:.9,blending:xs,depthWrite:!1,sizeAttenuation:!0}),r=new Or(n,s);return r.name="sparkles",r}function Dr(i="#4a4a68",t=1){const e=new St,n=ne(new sn(.09*t,.3*t,6),ft(i),0,0,0,!1,!1);n.rotation.x=Math.PI/2,e.add(n);const s=new we({color:i,side:nn});for(const r of[-1,1]){const o=ne(new Dn(.42*t,.16*t),s,r*.22*t,0,0,!1,!1);o.name=r<0?"wl":"wr",e.add(o)}return e}function vh(i,t,e,n,s=0,r=12){i.position.x+=t*n,i.position.x>r&&(i.position.x=-r);const o=i.getObjectByName("wl"),a=i.getObjectByName("wr"),l=Math.sin(e*6+s)*.5;o&&(o.rotation.y=l),a&&(a.rotation.y=-l)}function V0(i=14,t=12){const e=new St,n=["#ffd6ec","#fff0f7","#ffe9a8"];for(let s=0;s<i;s++){const r=ne(new Oa(.055+Math.random()*.03,6),new we({color:n[s%n.length],side:nn,transparent:!0,opacity:.95}),(Math.random()-.5)*t,.5+Math.random()*3.4,(Math.random()-.5)*t,!1,!1);r.scale.y=.6,r.userData.phase=Math.random()*Math.PI*2,r.userData.fall=.25+Math.random()*.3,e.add(r)}return e.name="petals",e}function W0(i,t,e,n=3.8){for(const s of i.children)s.position.y-=s.userData.fall*t,s.position.x+=Math.sin(e*1.4+s.userData.phase)*t*.5,s.rotation.x=e*2+s.userData.phase,s.rotation.y=e*1.3+s.userData.phase,s.position.y<.1&&(s.position.y=n)}function lc(i="#ff8f5f",t=1){const e=new St,n=ne(new Jt(.16*t,10,8),ft(i),0,0,0,!1,!1);n.scale.set(1.4,.9,.7),e.add(n);const s=ne(new sn(.09*t,.18*t,4),ft(i),-.26*t,0,0,!1,!1);return s.rotation.z=-Math.PI/2,s.name="tail",e.add(s),e.add(ne(new Jt(.03*t,6,4),ft("#22223a"),.12*t,.04*t,.1*t,!1,!1)),e}function cc(i=1){const t=new St;t.add(ne(new ge(.34*i,.2*i,.34*i,2,.06),ft("#5b6b8c"),0,0,0,!1,!1));const e=ne(new Jt(.06*i,8,6),new we({color:"#54e6ff",emissive:"#54e6ff",emissiveIntensity:1.4}),0,0,.18*i,!1,!1);t.add(e);const n=ne(new Xe(.24*i,.03*i,6,18),ft("#9fb4d8"),0,.14*i,0,!1,!1);return n.rotation.x=Math.PI/2,n.name="rotor",t.add(n),t}function X0(i=24,t=13,e="#c9a0ff"){const n=new Float32Array(i*3);for(let o=0;o<i;o++)n[o*3]=(Math.random()-.5)*t,n[o*3+1]=.3+Math.random()*3,n[o*3+2]=(Math.random()-.5)*t;const s=new _e;s.setAttribute("position",new We(n,3));const r=new Or(s,new Ps({color:e,size:.2,transparent:!0,opacity:.7,blending:xs,depthWrite:!1,sizeAttenuation:!0}));return r.name="spores",r}const Y0=1.6,ur=1.72,An=.42;class q0{constructor(t){this.level=t,this.group.name="sparkle-meadow",this.originX=-1.35-(t.cols-1)*ur/2,this.originZ=-.35-(t.rows-1)*ur/2,this.group.add(O0()),this.group.add(H0());for(let p=0;p<t.rows;p++)for(let b=0;b<t.cols;b++){const _=(p+b)%2===0?"#79d455":"#6cc94a",v=Ha(Y0,_),P=this.cellToWorld(b,p);v.position.set(P.x,An,P.z),this.group.add(v)}for(const p of t.blocked){const b=this.cellToWorld(p.col,p.row),_=fh(1.05);_.position.set(b.x,An,b.z),this.group.add(_)}for(const p of t.items)if(p.kind==="strawberry"){const b=G0(),_=this.cellToWorld(p.col,p.row);b.position.set(_.x,An,_.z),this.group.add(b),this.itemNodes.set(p.id,b)}const e=this.level.goals[0];this.goalNode=z0();const n=this.cellToWorld(e.col,e.row);this.goalNode.position.set(n.x,An-.42,n.z),this.goalStar=this.goalNode.getObjectByName("goalStar")??null,this.group.add(this.goalNode);const s=[new I(5.2,0,-11),new I(4,0,-5.5),new I(4.6,0,-1),new I(3.8,0,3.5),new I(5,0,8.5)],r=k0(s,1.8);this.waterTex=r.texture,this.group.add(r.group);const o=B0(1.9,3.2);o.position.set(4.15,.02,3.6),o.rotation.y=.35,this.group.add(o);const a=Co(1.5,"#3faf5a","#2f9247");a.position.set(-6.4,0,-2.2),this.group.add(a);const l=Co(1);l.position.set(-5.4,0,2.4),this.group.add(l);const c=Co(1.35,"#45b25e","#2f9247");c.position.set(6.6,0,-3.4),this.group.add(c);const h=ba(3,.9);h.position.set(5.2,0,.8),this.group.add(h);const d=ba(2,.6);d.position.set(2.2,0,6.2),this.group.add(d);const u=new jt(new kt(.85,1.05,.5,12),new we({color:"#9aa7bd"}));u.position.set(4.45,.25,-.6),u.castShadow=u.receiveShadow=!0,this.group.add(u);const f=[[-5.6,0,4.6,7],[-2.6,0,5.4,5],[.6,0,4.8,4],[-6.8,0,-4.6,5],[6.9,0,2.2,5],[1.8,0,-4.4,4]];for(const[p,b,_,v]of f){const P=ph(v,1.5);P.position.set(p,b,_),this.group.add(P)}const g=[[-7,6.4,-9,1.4],[3.5,7.2,-10,1.8],[8.5,6.1,-7,1.1],[-1.5,7.8,-12,1.5]];for(const[p,b,_,v]of g){const P=mh(v);P.position.set(p,b,_),this.clouds.push(P),this.group.add(P)}this.sparkles=gh(30,13),this.group.add(this.sparkles),this.petals=V0(16,14),this.group.add(this.petals);const x=Dr("#5a5f8a",1.1);x.position.set(-6,6.2,-8),this.birds.push(x),this.group.add(x);const m=Dr("#8a5f7a",.85);m.position.set(3,7.4,-10),this.birds.push(m),this.group.add(m)}group=new St;itemNodes=new Map;goalNode;clouds=[];waterTex=null;sparkles=null;goalStar=null;petals=null;birds=[];originX;originZ;cellToWorld(t,e){return new I(this.originX+t*ur,An,this.originZ+e*ur)}mixyLookout(){return new I(4.45,.5,-.6)}update(t,e){this.waterTex&&(this.waterTex.offset.y=e*.12%1);for(let n=0;n<this.clouds.length;n++){const s=this.clouds[n];s.position.x+=t*(.08+n*.02),s.position.x>12&&(s.position.x=-12)}if(this.goalStar&&(this.goalStar.rotation.y=e*1.4,this.goalStar.position.y=.86+Math.sin(e*2.2)*.07),this.sparkles){const n=this.sparkles.material;n.opacity=.55+Math.sin(e*2.6)*.35}this.petals&&W0(this.petals,t,e),this.birds.forEach((n,s)=>{n.position.y+=Math.sin(e*1.2+s*2.4)*t*.25,vh(n,t,e,.55+s*.25,s*1.9)})}}const $0=1.6,Gn=1.72,fr=.42;function Ie(i,t,e=0,n=0,s=0,r=!0,o=!0){const a=new jt(i,t);return a.position.set(e,n,s),a.castShadow=r,a.receiveShadow=o,a}function Ro(i=1){const t=new St,e=Ie(new kt(.14*i,.22*i,2.2*i,7),ft("#a06a3b"),0,1.1*i,0);e.rotation.z=.12,t.add(e);const n=new St;n.position.set(.26*i,2.2*i,0);for(let s=0;s<6;s++){const r=s/6*Math.PI*2,o=Ie(new Jt(.62*i,8,6),ft(s%2?"#3faf5a":"#4fc46a"));o.scale.set(1.35,.22,.5),o.position.set(Math.cos(r)*.62*i,.05,Math.sin(r)*.62*i),o.rotation.y=-r,o.rotation.z=-.28,n.add(o)}for(let s=0;s<3;s++)n.add(Ie(new Jt(.11*i,8,6),ft("#8d5a2b"),(s-1)*.18*i,-.14*i,.08*s*i));return t.add(n),t}function j0(){const i=new St,t=ft("#8d5a2b"),e=ft("#6e421f"),n=ft("#ffd23e");i.add(Ie(new ge(.95,.55,.62,3,.08),t,0,.28,0));const s=Ie(new kt(.31,.31,.95,12,1,!1,0,Math.PI),e,0,.55,0);s.rotation.z=Math.PI/2,i.add(s);for(const r of[-.28,.28])i.add(Ie(new fe(.08,.62,.64),n,r,.32,0));return i.add(Ie(new ge(.16,.2,.1,2,.03),n,0,.42,.32)),i}function Z0(){const i=new St,t=ft("#f7b8d9"),e=Ie(new Jt(.26,12,8,0,Math.PI*2,Math.PI/2,Math.PI/2),t,0,.1,0);e.scale.set(1.15,.7,1);const n=Ie(new Jt(.26,12,8,0,Math.PI*2,0,Math.PI/2),t,0,.12,-.12);return n.scale.set(1.15,.7,1),n.rotation.x=-.9,i.add(e,n),i.add(Ie(new Jt(.15,14,12),new we({color:"#ffffff",gradientMap:null}),0,.2,.02)),i}function J0(){const i=new St,t=Ie(new ge(2.2,.7,1,3,.2),ft("#b5773f"),0,.35,0);t.scale.set(1,1,1),i.add(t),i.add(Ie(new kt(.05,.06,1.9,6),ft("#8d5a2b"),0,1.4,0));const e=new Ji;e.moveTo(0,0),e.lineTo(.85,.55),e.lineTo(0,1.3),e.closePath();const n=Ie(new ka(e),new we({color:"#fff6e3",side:nn}),.06,.9,0,!1,!1);i.add(n);const s=Ie(new fe(.28,.16,.02),ft("#ff5fa2"),.15,2.3,0,!1,!1);return i.add(s),i}class K0{constructor(t){this.level=t,this.group.name="bubble-bay",this.originX=-1.2-(t.cols-1)*Gn/2,this.originZ=-.3-(t.rows-1)*Gn/2,this.waterTex=uh(),this.waterTex.repeat.set(5,4);const e=new we({map:this.waterTex}),n=new jt(new ge(34,1.4,24,4,.55),e);n.position.y=-.78,n.receiveShadow=!0,this.group.add(n);for(let E=0;E<t.rows;E++)for(let R=0;R<t.cols;R++){const w=(E+R)%2===0?"#f7e3a1":"#f2d98c",y=Ha($0,w),D=this.cellToWorld(R,E);y.position.set(D.x,fr,D.z),this.group.add(y)}const s=this.cellToWorld(0,t.rows-1).z+Gn*.72,r=t.cols+2;for(let E=0;E<r;E++){const R=this.originX-Gn*.75+E*(Gn*(t.cols+.4)/r);this.group.add(Ie(new ge(Gn*.82,.18,.9,2,.05),ft("#b5773f"),R,.16,s)),this.group.add(Ie(new kt(.07,.07,.7,6),ft("#8d5a2b"),R,-.1,s+.38))}for(const E of t.items)if(E.kind==="pearl"){const R=Z0(),w=this.cellToWorld(E.col,E.row);R.position.set(w.x,fr,w.z),this.group.add(R),this.itemNodes.set(E.id,R)}const o=this.level.goals[0];this.goalNode=j0();const a=this.cellToWorld(o.col,o.row);this.goalNode.position.set(a.x,fr,a.z),this.group.add(this.goalNode);const l=Ro(1.15);l.position.set(-5.6,0,-1.6),this.group.add(l);const c=Ro(.85);c.position.set(-4.6,0,2.6),c.rotation.y=1.2,this.group.add(c);const h=Ro(1);h.position.set(6,0,-2.4),h.rotation.y=-.6,this.group.add(h),this.boat=J0(),this.boat.position.set(4.25,-.05,2.55),this.boat.rotation.y=-.5,this.group.add(this.boat);const d=ba(3,1);d.position.set(-4.9,0,4.2),this.group.add(d);const u=ph(4,1.2);u.position.set(4.4,0,-4.2),this.group.add(u);const f=[[-10,-.5,-11,5.5,"#7ed0b8"],[9.5,-.6,-12,6.5,"#8fdcae"],[0,-1,-14,8,"#a7e6c3"]];for(const[E,R,w,y,D]of f){const B=Ie(new Jt(y,18,12),ft(D),E,R,w,!1,!0);B.scale.y=.32,this.group.add(B)}const g=[[-7,6.6,-9,1.3],[4.5,7.4,-10,1.7],[9,6.2,-7,1]];for(const[E,R,w,y]of g){const D=mh(y);D.position.set(E,R,w),this.clouds.push(D),this.group.add(D)}const x=40,m=new Float32Array(x*3);this.bubbleSpeeds=new Float32Array(x);for(let E=0;E<x;E++)m[E*3]=(Math.random()-.5)*22,m[E*3+1]=Math.random()*.4,m[E*3+2]=(Math.random()-.5)*16,this.bubbleSpeeds[E]=.25+Math.random()*.5;const p=new _e;p.setAttribute("position",new We(m,3));const b=new Ps({color:"#dff6ff",size:.16,transparent:!0,opacity:.85,depthWrite:!1,sizeAttenuation:!0});this.bubbles=new Or(p,b),this.group.add(this.bubbles);const _=Dr("#f4f7fb",1.35);_.position.set(-8,6.8,-7),this.gulls.push(_),this.group.add(_);const v=Dr("#e8edf6",1);v.position.set(2,7.8,-9),this.gulls.push(v),this.group.add(v);const P=lc("#ff8f5f",1);P.userData={cx:-3.4,cz:4.9,r:1.1,speed:.9,phase:0},this.fish.push(P),this.group.add(P);const T=lc("#5fc9ff",.8);T.userData={cx:3.2,cz:5.4,r:.85,speed:-1.2,phase:2.1},this.fish.push(T),this.group.add(T)}group=new St;itemNodes=new Map;goalNode;waterTex;bubbles;bubbleSpeeds;boat;clouds=[];gulls=[];fish=[];originX;originZ;cellToWorld(t,e){return new I(this.originX+t*Gn,fr,this.originZ+e*Gn)}mixyLookout(){return new I(4.25,.72,2.55)}update(t,e){this.waterTex.offset.x=e*.02%1,this.waterTex.offset.y=e*.03%1,this.boat.position.y=-.05+Math.sin(e*1.1)*.07,this.boat.rotation.z=Math.sin(e*.9)*.03;for(let s=0;s<this.clouds.length;s++){const r=this.clouds[s];r.position.x+=t*(.07+s*.02),r.position.x>13&&(r.position.x=-13)}const n=this.bubbles.geometry.getAttribute("position");for(let s=0;s<n.count;s++){let r=n.getY(s)+this.bubbleSpeeds[s]*t;r>2.6&&(r=0),n.setY(s,r)}n.needsUpdate=!0,this.gulls.forEach((s,r)=>{s.position.y+=Math.sin(e*.9+r*2.8)*t*.3,vh(s,t,e,.9+r*.35,r*1.4,14)});for(const s of this.fish){const r=s.userData,o=e*r.speed+r.phase;s.position.set(r.cx+Math.cos(o)*r.r,-.05+Math.sin(e*2+r.phase)*.03,r.cz+Math.sin(o)*r.r),s.rotation.y=Math.atan2(-Math.cos(o)*r.speed,-Math.sin(o)*r.speed);const a=s.getObjectByName("tail");a&&(a.rotation.y=Math.sin(e*8+r.phase)*.45)}}}const Q0=1.6,pr=1.72,ls=.42;function Ze(i,t="#000000",e=0){return new we({color:i,emissive:t,emissiveIntensity:e})}function Je(i,t,e=!0,n=!0){const s=new jt(i,t);return s.castShadow=e,s.receiveShadow=n,s}function tv(){const i=new St,t=Je(new kt(.035,.05,.5,6),Ze("#3f9e4d"));t.position.y=.25,i.add(t);const e=Je(new Jt(.09,6,4),Ze("#4cc25e"));e.scale.set(1.6,.35,.8),e.position.set(.09,.18,0),e.rotation.z=-.5,i.add(e);const n=new St;for(let r=0;r<5;r++){const o=r/5*Math.PI*2,a=Je(new Jt(.105,8,6),Ze("#ff8fc7","#ff5fa2",.35));a.scale.set(1,.45,1),a.position.set(Math.cos(o)*.14,0,Math.sin(o)*.14),n.add(a)}n.position.y=.52,i.add(n);const s=Je(new Jt(.085,8,6),Ze("#ffe066","#ffd23e",.8));return s.position.y=.55,i.add(s),i}function Va(i=1,t="#b47dff",e="#8a4fff"){const n=new St,s=Je(new kt(.11,.15,.3,8),Ze("#efe6f7"));s.position.y=.15,n.add(s);const r=Je(new Jt(.26,12,8,0,Math.PI*2,0,Math.PI/2),Ze(t,e,.45));r.position.y=.28,n.add(r);for(let o=0;o<4;o++){const a=o/4*Math.PI*2+.4,l=Je(new Jt(.035,6,4),Ze("#f7effc","#ffffff",.5),!1,!1);l.position.set(Math.cos(a)*.15,.4,Math.sin(a)*.15),n.add(l)}return n.scale.setScalar(i),n}function ev(){const i=new St,t=Je(new kt(.62,.68,.1,24),Ze("#274a5e","#3ec6d8",.35));t.position.y=.05,i.add(t);const e=Je(new Xe(.5,.035,8,32),Ze("#7ff3ff","#54e6ff",1.2),!1,!1);e.rotation.x=-Math.PI/2,e.position.y=.11,e.name="ringGlow",i.add(e);for(let s=0;s<6;s++){const r=s/6*Math.PI*2,o=Va(.42,"#5fc9ff","#3ec6d8");o.position.set(Math.cos(r)*.5,.1,Math.sin(r)*.5),i.add(o)}const n=Je(new $n(.16),Ze("#fff7ad","#ffd23e",1.4),!1,!1);return n.position.y=.75,n.name="goalStar",i.add(n),i}function hc(i,t){const e=new St,n=Je(new kt(.35,.55,2.2,10),Ze("#cfc4e8"));n.position.y=1.1,e.add(n);const s=Je(new Jt(1.35,16,10,0,Math.PI*2,0,Math.PI/2.2),Ze(t,t,.25));return s.position.y=2.1,s.scale.set(1.25,.85,1.25),s.name="gmCap",e.add(s),e.scale.setScalar(i),e}class nv{group=new St;itemNodes=new Map;fireflies;fireflyBase;glowStars=[];spores=null;sporeSpeeds=new Float32Array(0);giantCaps=[];originX;originZ;constructor(t){this.group.name="pattern-forest",this.originX=-((t.cols-1)*pr)/2,this.originZ=-((t.rows-1)*pr)/2;const e=Je(new kt(16,18,.6,40),Ze("#1d3b4a"),!1,!0);e.position.y=-.3,e.scale.z=.75,this.group.add(e);for(let l=0;l<t.rows;l++)for(let c=0;c<t.cols;c++){const h=(l+c)%2===0,d=Ha(Q0,h?"#3f7d5c":"#37714f");d.traverse(f=>{if(f instanceof jt){const g=f.material;g.emissive=new Yt(h?"#123b2a":"#0e3222"),g.emissiveIntensity=.5}});const u=this.cellToWorld(c,l);d.position.set(u.x,ls,u.z),this.group.add(d)}for(const l of t.blocked){const c=this.cellToWorld(l.col,l.row),h=fh(1.05);h.position.set(c.x,ls,c.z),this.group.add(h)}for(const l of t.items){const c=l.kind==="flower"?tv():Va(1),h=this.cellToWorld(l.col,l.row);c.position.set(h.x,ls,h.z),this.group.add(c),this.itemNodes.set(l.id,c)}for(const l of t.goals){const c=ev(),h=this.cellToWorld(l.col,l.row);c.position.set(h.x,ls,h.z);const d=c.getObjectByName("goalStar");d&&this.glowStars.push(d),this.group.add(c)}const n=[[-6.2,-2.6,1.25,"#7d4fd4"],[6.4,-3.2,1.5,"#4f8fd4"],[-5.6,3.4,.95,"#d44f9e"],[6,3.6,1.1,"#7d4fd4"]];for(const[l,c,h,d]of n){const u=hc(h,d);u.position.set(l,0,c);const f=u.getObjectByName("gmCap");f&&this.giantCaps.push(f),this.group.add(u)}const s=hc(.55,"#d44f9e");s.position.set(4.55,0,-1.4),this.group.add(s);const r=70;this.fireflyBase=new Float32Array(r*3);const o=new Float32Array(r*3);for(let l=0;l<r;l++)this.fireflyBase[l*3]=(Math.random()-.5)*15,this.fireflyBase[l*3+1]=.6+Math.random()*2.6,this.fireflyBase[l*3+2]=(Math.random()-.5)*10;o.set(this.fireflyBase);const a=new _e;a.setAttribute("position",new We(o,3)),this.fireflies=new Or(a,new Ps({color:"#d6ff7a",size:.14,transparent:!0,opacity:.95,blending:xs,depthWrite:!1})),this.group.add(this.fireflies),this.group.add(gh(24,12)),this.spores=X0(26,14),this.sporeSpeeds=new Float32Array(26);for(let l=0;l<26;l++)this.sporeSpeeds[l]=.12+Math.random()*.22;this.group.add(this.spores)}cellToWorld(t,e){return new I(this.originX+t*pr,ls,this.originZ+e*pr)}mixyLookout(){return new I(4.55,1.15,-1.4)}update(t,e){const n=this.fireflies.geometry.getAttribute("position");for(let s=0;s<n.count;s++){const r=this.fireflyBase[s*3],o=this.fireflyBase[s*3+1],a=this.fireflyBase[s*3+2];n.setXYZ(s,r+Math.sin(e*.5+s*1.7)*.5,o+Math.sin(e*.9+s*2.3)*.3,a+Math.cos(e*.4+s)*.5)}n.needsUpdate=!0,this.fireflies.material.opacity=.6+Math.sin(e*2.2)*.3;for(const s of this.glowStars)s.rotation.y+=t*1.6,s.position.y=.75+Math.sin(e*2)*.06;if(this.spores){const s=this.spores.geometry.getAttribute("position");for(let r=0;r<s.count;r++){let o=s.getY(r)+this.sporeSpeeds[r]*t;o>3.8&&(o=.25),s.setY(r,o),s.setX(r,s.getX(r)+Math.sin(e*.8+r)*t*.12)}s.needsUpdate=!0,this.spores.material.opacity=.5+Math.sin(e*1.6)*.25}this.giantCaps.forEach((s,r)=>{const o=1+Math.sin(e*.8+r*1.6)*.035;s.scale.set(1.25*o,.85/o,1.25*o)})}}const Ma=1.6,cs=1.72,Sn=.42;function be(i,t="#000000",e=0){return new we({color:i,emissive:t,emissiveIntensity:e})}function Me(i,t,e=!0,n=!0){const s=new jt(i,t);return s.castShadow=e,s.receiveShadow=n,s}function iv(){const i=new St,t=Me(new kt(.16,.16,.42,12),be("#58d68d","#2ecc71",.25));t.position.y=.26,i.add(t);const e=Me(new kt(.165,.165,.1,12),be("#eafaf1","#b8ffd9",.5),!1,!1);e.position.y=.3,i.add(e);const n=Me(new kt(.06,.06,.08,8),be("#b8c4d6"));n.position.y=.51,i.add(n);const s=Me(new $n(.09),be("#fff7ad","#ffd23e",1.2),!1,!1);return s.position.y=.68,s.name="battBolt",i.add(s),i}function sv(){const i=new St,t=Me(new kt(.62,.7,.12,24),be("#3d4b63"));t.position.y=.06,i.add(t);const e=Me(new Xe(.46,.045,8,32),be("#ffd23e","#ffb700",1),!1,!1);e.rotation.x=-Math.PI/2,e.position.y=.13,i.add(e);const n=Me(new $n(.18),be("#fff7ad","#ffd23e",1.4),!1,!1);return n.position.y=.7,n.name="goalStar",i.add(n),i}function rv(i){const t=new St,e=Me(new fe(Ma,ji,Ma),be(i));e.position.y=-ji/2,t.add(e);for(const[n,s]of[[-.6,-.6],[.6,-.6],[-.6,.6],[.6,.6]]){const r=Me(new Jt(.05,6,4),be("#5b6b8c"),!1,!1);r.position.set(n,.02,s),t.add(r)}return t}function ov(i,t){const e=new St;e.add(Me(new Xe(i,i*.28,10,24),be(t)));for(let s=0;s<8;s++){const r=s/8*Math.PI*2,o=Me(new fe(i*.32,i*.34,i*.3),be(t));o.position.set(Math.cos(r)*i*1.18,Math.sin(r)*i*1.18,0),o.rotation.z=r,e.add(o)}const n=Me(new kt(i*.3,i*.3,.24,12),be("#ffd23e","#ffb700",.4));return n.rotation.x=Math.PI/2,e.add(n),e}function av(){const i=new St,t=[[-9,3.2,2.2,-12,"#2b3a55"],[-5.5,4.6,2.6,-13,"#24344e"],[-1.5,3.4,2,-12.5,"#2b3a55"],[2.5,5.2,2.8,-13.5,"#24344e"],[6.5,3.8,2.4,-12.2,"#2b3a55"],[10,4.4,2.4,-13,"#24344e"]];for(const[e,n,s,r,o]of t){const a=Me(new fe(s,n,s),be(o),!1,!1);a.position.set(e,n/2-.4,r),i.add(a);for(let l=0;l<Math.floor(n);l++)for(let c=0;c<2;c++){if((l*3+c+Math.round(e))%3===0)continue;const h=Me(new Dn(.28,.32),be("#ffe9a3","#ffd23e",.9),!1,!1);h.position.set(e-s/4+c*(s/2.2),l*.9+.4,r+s/2+.01),i.add(h)}}return i}class lv{group=new St;itemNodes=new Map;gears=[];bolts=[];neon=[];drones=[];puffs=[];beaconMat=null;originX;originZ;constructor(t){this.group.name="robot-town",this.originX=-((t.cols-1)*cs)/2,this.originZ=-((t.rows-1)*cs)/2;const e=Me(new kt(16,18,.6,40),be("#232f47"),!1,!0);e.position.y=-.3,e.scale.z=.75,this.group.add(e),this.group.add(av());for(let h=0;h<t.rows;h++)for(let d=0;d<t.cols;d++){const u=(h+d)%2===0?"#8fa3c8":"#8298bd",f=rv(u),g=this.cellToWorld(d,h);f.position.set(g.x,Sn,g.z),this.group.add(f)}for(let h=0;h<t.rows;h++){const d=be("#54e6ff","#54e6ff",1.1),u=Me(new fe(t.cols*cs+.6,.03,.09),d,!1,!1),f=this.cellToWorld((t.cols-1)/2,h);u.position.set(f.x,Sn+.02,f.z+Ma/2+.12),this.neon.push(d),this.group.add(u)}for(const h of t.blocked){const d=this.cellToWorld(h.col,h.row),u=new St;u.add(Me(new kt(.42,.5,.9,14),be("#5b6b8c")));const f=Me(new Xe(.42,.07,8,18),be("#ff8f5f","#ff6b35",.4));f.rotation.x=Math.PI/2,f.position.y=.45,u.add(f),u.position.set(d.x,Sn+.45,d.z),this.group.add(u);for(let g=0;g<2;g++){const x=new jt(new Jt(.16,8,6),new we({color:"#dfe9ff",transparent:!0,opacity:0}));x.castShadow=x.receiveShadow=!1,x.userData={ox:d.x,oy:Sn+.95,oz:d.z,t:g*.5,speed:.32+Math.random()*.14},this.puffs.push(x),this.group.add(x)}}for(const h of t.zipBlocked??[]){const d=this.cellToWorld(h.col,h.row),u=new jt(new Jt(.72,18,12,0,Math.PI*2,0,Math.PI/2),new we({color:"#bfeaff",transparent:!0,opacity:.32,emissive:"#54c6ff",emissiveIntensity:.25}));u.position.set(d.x,Sn,d.z),this.group.add(u);const f=Me(new Xe(.72,.05,8,28),be("#9fd8ff","#54c6ff",.8),!1,!1);f.rotation.x=-Math.PI/2,f.position.set(d.x,Sn+.02,d.z),this.group.add(f)}for(const h of t.items)if(h.kind==="battery"){const d=iv(),u=this.cellToWorld(h.col,h.row);d.position.set(u.x,Sn,u.z);const f=d.getObjectByName("battBolt");f&&this.bolts.push(f),this.group.add(d),this.itemNodes.set(h.id,d)}for(const h of t.goals){const d=sv(),u=this.cellToWorld(h.col,h.row);d.position.set(u.x,Sn,u.z);const f=d.getObjectByName("goalStar");f&&this.bolts.push(f),this.group.add(d)}const n=[[-6.8,2.6,-5.5,1.1,"#3d5a80"],[7.2,3.4,-6,1.4,"#5b6b8c"],[-7.6,1.4,2.5,.7,"#4a6fa5"]];for(const[h,d,u,f,g]of n){const x=ov(f,g);x.position.set(h,d,u),this.gears.push(x),this.group.add(x)}const s=Me(new fe(1.4,1.1,1.4),be("#3d4b63"));s.position.set(4.9,.55,-1.8),this.group.add(s);const r=Me(new kt(.03,.03,.9,6),be("#9fb4d8"));r.position.set(4.9,1.55,-1.8),this.group.add(r);const o=be("#ff5fa2","#ff5fa2",1.2),a=Me(new Jt(.09,8,6),o,!1,!1);a.position.set(4.9,2,-1.8),this.beaconMat=o,this.group.add(a);const l=cc(1);l.userData={cx:0,cz:0,r:5.6,h:3.4,speed:.42,phase:0},this.drones.push(l),this.group.add(l);const c=cc(.75);c.userData={cx:.8,cz:-.4,r:4.2,h:2.6,speed:-.55,phase:2.4},this.drones.push(c),this.group.add(c)}cellToWorld(t,e){return new I(this.originX+t*cs,Sn,this.originZ+e*cs)}mixyLookout(){return new I(4.9,1.15,-1.8)}update(t,e){for(let s=0;s<this.gears.length;s++)this.gears[s].rotation.z+=t*(s%2===0?.5:-.35);for(const s of this.bolts)s.rotation.y+=t*1.8;const n=.75+Math.sin(e*2.4)*.35;for(const s of this.neon)s.emissiveIntensity=n;for(const s of this.drones){const r=s.userData,o=e*r.speed+r.phase;s.position.set(r.cx+Math.cos(o)*r.r,r.h+Math.sin(e*1.5+r.phase)*.16,r.cz+Math.sin(o)*r.r),s.rotation.y=Math.atan2(-Math.cos(o)*r.speed,-Math.sin(o)*r.speed);const a=s.getObjectByName("rotor");a&&(a.rotation.z+=t*18)}for(const s of this.puffs){const r=s.userData;r.t=(r.t+t*r.speed)%1,s.position.set(r.ox+Math.sin(r.t*Math.PI*2)*.08,r.oy+r.t*1.1,r.oz),s.scale.setScalar(.5+r.t*1.4),s.material.opacity=r.t<.15?r.t/.15*.5:.5*(1-r.t)}this.beaconMat&&(this.beaconMat.emissiveIntensity=.7+(Math.sin(e*3.4)>0?.9:.1))}}const dc=1.6,mr=1.72,hs=.42;function le(i,t="#000000",e=0){return new we({color:i,emissive:t,emissiveIntensity:e})}function ce(i,t,e=!0,n=!0){const s=new jt(i,t);return s.castShadow=e,s.receiveShadow=n,s}function cv(){const i=new St,t=ce(new sn(.12,.22,4),le("#ff5f6b"),!1,!1);t.rotation.z=Math.PI,t.position.y=.1,i.add(t);const e=ce(new kt(.17,.17,.06,20),le("#ffd23e","#ffb700",.35));e.rotation.x=Math.PI/2,e.position.y=.34,i.add(e);const n=ce(new $n(.09),le("#fff7ad","#ffd23e",.9),!1,!1);return n.position.set(0,.34,.05),i.add(n),i}function hv(){const i=new St,t=ce(new kt(.6,.68,.22,24),le("#4a5fc9"));t.position.y=.11,i.add(t);const e=ce(new Xe(.6,.035,8,32),le("#ffd23e","#ffb700",.7),!1,!1);e.rotation.x=-Math.PI/2,e.position.y=.23,i.add(e);const n=ce(new Jt(.2,14,10,0,Math.PI*2,0,Math.PI/1.8),le("#ffd23e","#ffb700",.45));n.scale.set(1,.9,1),n.rotation.x=Math.PI,n.position.y=.62,i.add(n);const s=ce(new kt(.05,.08,.16,8),le("#ffb700","#ff9f1c",.3));s.position.y=.5,i.add(s);const r=ce(new kt(.14,.16,.06,12),le("#b7791f"));r.position.y=.26,i.add(r);for(const a of[-1,1]){const l=ce(new Xe(.1,.025,6,14,Math.PI),le("#ffd23e","#ffb700",.3),!1,!1);l.position.set(a*.2,.66,0),l.rotation.z=a*Math.PI/2,i.add(l)}const o=ce(new $n(.13),le("#fff7ad","#ffd23e",1.5),!1,!1);return o.position.y=1.05,o.name="goalStar",i.add(o),i}function dv(){const i=new St,t=ce(new fe(11,3.6,1),le("#f2e3c6"),!1,!1);t.position.set(0,1.8,-8.6),i.add(t);const e=ce(new sn(6.6,1.6,4),le("#e2725b"),!1,!1);e.rotation.y=Math.PI/4,e.scale.z=.28,e.position.set(0,4.4,-8.6),i.add(e);for(let o=-2;o<=2;o++){const a=ce(new kt(.28,.32,3.4,12),le("#fbf3e0"),!1,!1);a.position.set(o*2.1,1.7,-8),i.add(a)}const n=ce(new fe(1.6,2.2,.2),le("#7a4f2b"),!1,!1);n.position.set(0,1.1,-7.95),i.add(n);const s=ce(new fe(3.4,.7,.08),le("#4a5fc9","#2f3fa0",.25),!1,!1);s.position.set(0,3.1,-7.9),i.add(s);const r=ce(new $n(.26),le("#ffd23e","#ffb700",.8),!1,!1);return r.position.set(0,3.1,-7.8),i.add(r),i}function uv(i,t,e){const n=new St,s=new _e().setFromPoints([new I(-e/2,i+.3,t),new I(e/2,i+.3,t)]);n.add(new hu(s,new $c({color:"#8a5a2b"})));const r=["#ff5f6b","#ffd23e","#4a5fc9","#3ec6d8","#ff8fb0"];for(let o=0;o<9;o++){const a=ce(new sn(.16,.34,4),le(r[o%r.length]),!1,!1);a.rotation.z=Math.PI,a.position.set(-e/2+(o+.5)*(e/9),i+.12,t),a.name="bunt",n.add(a)}return n}function fv(){const i=new St,t=ce(new sn(.34,.8,14),le("#ff8f3d"));t.position.y=.4,i.add(t);const e=ce(new kt(.2,.24,.12,14),le("#fff3e0"),!1,!1);e.position.y=.42,i.add(e);const n=ce(new fe(.66,.08,.66),le("#e2722b"));return n.position.y=.04,i.add(n),i}class pv{group=new St;itemNodes=new Map;goalStars=[];buntFlags=[];birds=new St;flags=[];originX;originZ;constructor(t){this.group.name="agent-academy",this.originX=-((t.cols-1)*mr)/2,this.originZ=-((t.rows-1)*mr)/2;const e=ce(new kt(16,18,.6,40),le("#7cc25e"),!1,!0);e.position.y=-.3,e.scale.z=.75,this.group.add(e);const n=ce(new Lr(6.9,8.6,40),le("#e2725b"),!1,!0);n.rotation.x=-Math.PI/2,n.position.y=.02,n.scale.y=.75,this.group.add(n),this.group.add(dv());const s=uv(3,-5.2,12);s.traverse(o=>{o.name==="bunt"&&this.buntFlags.push(o)}),this.group.add(s);for(let o=0;o<t.rows;o++)for(let a=0;a<t.cols;a++){const l=(o+a)%2===0,c=new St,h=ce(new fe(dc,ji,dc),le(l?"#f2e3c6":"#ecd9b6"));h.position.y=-ji/2,c.add(h);const d=ce(new Lr(.42,.5,24),le("#ffffff","#ffffff",.15),!1,!1);d.rotation.x=-Math.PI/2,d.position.y=.012,c.add(d);const u=this.cellToWorld(a,o);c.position.set(u.x,hs,u.z),this.group.add(c)}for(const o of t.blocked){const a=this.cellToWorld(o.col,o.row),l=fv();l.position.set(a.x,hs,a.z),this.group.add(l)}for(const o of t.items){const a=o.kind==="badge"?cv():Va(1),l=this.cellToWorld(o.col,o.row);a.position.set(l.x,hs,l.z),this.group.add(a),this.itemNodes.set(o.id,a)}for(const o of t.goals){const a=hv(),l=this.cellToWorld(o.col,o.row);a.position.set(l.x,hs,l.z);const c=a.getObjectByName("goalStar");c&&this.goalStars.push(c),this.group.add(a)}for(const[o,a]of[[-6.4,-2.8],[6.4,-2.8],[-6.4,3.2],[6.4,3.2]]){const l=ce(new kt(.04,.04,1.7,6),le("#8a5a2b"),!1,!1);l.position.set(o,.85,a),this.group.add(l);const c=ce(new Dn(.55,.34),le("#4a5fc9","#2f3fa0",.2),!1,!1);c.position.set(o+.28,1.5,a),c.name="cornerFlag",this.flags.push(c),this.group.add(c)}const r=ce(new fe(2.2,.5,1),le("#e8d5ae"),!1,!1);r.position.set(5.2,.25,-5.6),this.group.add(r);for(let o=0;o<2;o++){const a=new St,l=ce(new sn(.09,.3,6),le("#4a4a68"),!1,!1);l.rotation.x=Math.PI/2,a.add(l);for(const c of[-1,1]){const h=ce(new Dn(.42,.16),le("#4a4a68"),!1,!1);h.position.x=c*.22,h.name=c<0?"wl":"wr",a.add(h)}a.position.set(o*4-2,5.5+o,-9.5),this.birds.add(a)}this.group.add(this.birds)}cellToWorld(t,e){return new I(this.originX+t*mr,hs,this.originZ+e*mr)}mixyLookout(){return new I(5.2,.55,-5.6)}update(t,e){for(const n of this.goalStars)n.rotation.y+=t*1.8,n.position.y=1.05+Math.sin(e*2.2)*.07;this.buntFlags.forEach((n,s)=>{n.rotation.y=Math.sin(e*1.8+s*.7)*.35}),this.flags.forEach((n,s)=>{n.rotation.y=Math.sin(e*2.2+s*1.3)*.3}),this.birds.children.forEach((n,s)=>{n.position.x+=t*(.8+s*.3),n.position.x>10&&(n.position.x=-10);const r=n.getObjectByName("wl"),o=n.getObjectByName("wr"),a=Math.sin(e*6+s)*.5;r&&(r.rotation.y=a),o&&(o.rotation.y=-a)})}}const mv={linear:i=>i,out:i=>1-Math.pow(1-i,3),inOut:i=>i<.5?4*i*i*i:1-Math.pow(-2*i+2,3)/2,bounce:i=>i<1/2.75?7.5625*i*i:i<2/2.75?7.5625*(i-=1.5/2.75)*i+.75:i<2.5/2.75?7.5625*(i-=2.25/2.75)*i+.9375:7.5625*(i-=2.625/2.75)*i+.984375,back:i=>1+(1.70158+1)*Math.pow(i-1,3)+1.70158*Math.pow(i-1,2)};class gv{active=[];tween(t,e,n="inOut"){return new Promise(s=>{this.active.push({duration:t,elapsed:0,ease:mv[n],update:e,resolve:s})})}update(t){for(let e=this.active.length-1;e>=0;e--){const n=this.active[e];n.elapsed+=t;const s=Math.min(1,n.elapsed/n.duration);n.update(n.ease(s)),s>=1&&(this.active.splice(e,1),n.resolve())}}clear(){for(const t of this.active)t.resolve();this.active.length=0}}function En(i){return new Promise(t=>setTimeout(t,i*1e3))}const uc=new Map;function _h(i){let t=uc.get(i);return t||(t=fetch(i).then(e=>{if(!e.ok)throw new Error(`[CodeBops] Failed to load ${i}`);return e.text()}),uc.set(i,t)),t}async function Es(i,t){const e=await _h(t);return i.innerHTML=e,i.querySelector("svg")}function Ur(i){let t=!0;const e=()=>{t&&(i.classList.add("blink"),window.setTimeout(()=>i.classList.remove("blink"),150),window.setTimeout(e,1800+Math.random()*2600))},n=()=>{if(!t)return;i.classList.remove("look-left","look-right","look-up");const s=["look-left","look-right","look-up",""],r=s[Math.floor(Math.random()*s.length)];r&&i.classList.add(r),window.setTimeout(n,3200+Math.random()*3600)};return window.setTimeout(e,900+Math.random()*1200),window.setTimeout(n,2200),()=>{t=!1}}const vv=new I(0,1,0),_v=new I,xv=new I;class _s{constructor(t,e,n,s){this.opts=t,this.camera=n,this.viewport=s,this.root.name=t.name,this.shadow=new jt(new Dn(1.25,1.25),new Da({map:F0(),transparent:!0,depthWrite:!1})),this.shadow.rotation.x=-Math.PI/2,this.shadow.renderOrder=1,this.carryAnchor.position.set(-.4,t.height*.55,.12),this.root.add(this.carryAnchor),this.el=document.createElement("div"),this.el.className=`char-sprite ${t.mixy?"mixy-sprite":"zip-sprite"}${t.extraClass?` ${t.extraClass}`:""}`,this.el.setAttribute("aria-hidden","true"),e.appendChild(this.el),this.ready=Es(this.el,t.svgUrl).then(r=>{this.svg=r})}root=new St;carryAnchor=new Te;tweener=new gv;el;shadow;svg=null;bobPhase=Math.random()*Math.PI*2;calm=!1;blinkClock=1.2+Math.random()*2.2;lookClock=5+Math.random()*4;ready;whenReady(){return this.ready}addToScene(t){t.add(this.root),t.add(this.shadow)}setCalm(t){this.calm=t,this.el.classList.toggle("calm",t)}placeAt(t){this.root.position.copy(t),this.syncShadow()}syncShadow(){this.shadow.position.set(this.root.position.x,.44,this.root.position.z)}setMood(t){const e=this.svg;e&&(e.classList.toggle("excited",t==="excited"),e.classList.toggle("surprised",t==="surprised"),e.classList.toggle("thinking",t==="thinking"),e.classList.toggle("mouth-smile-on",t==="happy"),this.el.classList.toggle("mood-thinking",t==="thinking"),this.el.classList.toggle("mood-happy",t==="happy"))}look(t){const e=this.svg;e&&(e.classList.toggle("look-left",t==="left"),e.classList.toggle("look-right",t==="right"),e.classList.toggle("look-up",t==="up"))}wave(t=3){!this.svg||this.calm||(this.el.classList.remove("waving"),this.el.offsetWidth,this.el.style.setProperty("--wave-count",String(t)),this.el.classList.add("waving"),window.setTimeout(()=>this.el.classList.remove("waving"),t*560+100))}async hopTo(t,e=.34){const n=this.root.position.clone(),s=this.calm?.06:.4;this.el.classList.add("hop"),await this.tweener.tween(e,r=>{this.root.position.lerpVectors(n,t,r),this.root.position.y=Dd.lerp(n.y,t.y,r)+Math.sin(r*Math.PI)*s,this.syncShadow()},"inOut"),this.el.classList.remove("hop")}async bumpShake(){this.flashMood("surprised",900),this.el.classList.add("bump"),await new Promise(t=>setTimeout(t,320)),this.el.classList.remove("bump")}async turnWiggle(){this.calm||(this.el.classList.add("turn"),await new Promise(t=>setTimeout(t,300)),this.el.classList.remove("turn"))}async celebrate(){this.setMood("excited"),this.wave(3),this.el.classList.add("celebrate"),await new Promise(t=>setTimeout(t,this.calm?400:1600)),this.el.classList.remove("celebrate")}async glitchWobble(t=.8){this.el.classList.add("glitching"),await new Promise(e=>setTimeout(e,t*1e3)),this.el.classList.remove("glitching")}moodTimer=0;flashMood(t,e){this.setMood(t),window.clearTimeout(this.moodTimer),this.moodTimer=window.setTimeout(()=>this.setMood("idle"),e)}blink(){const t=this.svg;!t||this.calm||(t.classList.add("blink"),window.setTimeout(()=>t.classList.remove("blink"),150))}update(t,e){if(this.tweener.update(t),this.blinkClock-=t,this.blinkClock<=0&&(this.blink(),this.blinkClock=2.2+Math.random()*2.6),this.lookClock-=t,this.lookClock<=0){const f=["left","right",null,"up"];this.look(f[Math.floor(Math.random()*f.length)]),this.lookClock=4+Math.random()*5}if(!this.svg)return;const n=this.viewport.clientWidth,s=this.viewport.clientHeight;if(n===0||s===0)return;const r=_v.copy(this.root.position).project(this.camera),o=xv.copy(this.root.position).add(vv).project(this.camera);if(r.z>1){this.el.style.visibility="hidden";return}this.el.style.visibility="visible";const a=(r.x*.5+.5)*n,l=(-r.y*.5+.5)*s,c=(-o.y*.5+.5)*s,d=Math.max(1,Math.abs(l-c))*this.opts.height;this.el.style.height=`${d.toFixed(1)}px`;const u=this.calm?0:Math.sin(e*2.4+this.bobPhase)*d*.022;this.el.style.transform=`translate(${a.toFixed(1)}px, ${(l+u).toFixed(1)}px) translate(-50%, -100%)`}dispose(){this.tweener.clear(),window.clearTimeout(this.moodTimer),this.el.remove(),this.shadow.geometry.dispose(),this.shadow.material.dispose(),this.root.removeFromParent(),this.shadow.removeFromParent()}}const Nr=["N","E","S","W"];function yv(i){switch(i){case"N":return{dc:0,dr:-1};case"E":return{dc:1,dr:0};case"S":return{dc:0,dr:1};case"W":return{dc:-1,dr:0}}}function bv(i){const t=Nr.indexOf(i);return Nr[(t+3)%4]}function Mv(i){const t=Nr.indexOf(i);return Nr[(t+1)%4]}function He(i){return`${i.col},${i.row}`}function wr(i,t){return i.col===t.col&&i.row===t.row}function ri(i,t,e){return i.col>=0&&i.col<t&&i.row>=0&&i.row<e}const gr=80,wv=12,Sv={ifFlower:"flower",ifMushroom:"mushroom"};function Ev(i){const t={};for(const n of i.items)t[n.id]={col:n.col,row:n.row};const e=[{...i.start}];return i.botStart&&e.push({...i.botStart}),{cols:i.cols,rows:i.rows,blocked:new Set(i.blocked.map(He)),zipBlocked:new Set((i.zipBlocked??[]).map(He)),actors:e,active:0,items:t,goals:i.goals}}function Tv(i,t,e=!1){return i.goals.every(s=>{let r=!1;for(const[o,a]of Object.entries(i.items)){if(typeof a!="object")continue;const l="delivered"in a?a.delivered:a;if(wr(l,s)&&(t(o)===s.accepts&&"delivered"in a&&(r=!0),t(o)!==s.accepts))return!1}return r})?e?Object.entries(i.items).every(([s,r])=>i.goals.some(a=>a.accepts===t(s))?typeof r=="object"&&"delivered"in r:!0):!0:!1}function xh(i,t,e=null){const n=Ev(i),s=[],r=[];let o=0,a=!1,l=!1;const c=b=>i.items.find(_=>_.id===b)?.kind??b,h=b=>n.goals.find(_=>_.col===b.col&&_.row===b.row),d=()=>r.push({actors:n.actors.map(b=>({...b}))}),u=b=>{const _=n.actors[n.active],{dc:v,dr:P}=yv(b),T={col:_.col+v,row:_.row+P},E={col:_.col,row:_.row},R=n.active===0&&n.zipBlocked.has(He(T));return!ri(T,n.cols,n.rows)||n.blocked.has(He(T))||R?{type:"bump",actor:n.active,at:T,dir:b}:(_.col=T.col,_.row=T.row,{type:"move",actor:n.active,from:E,to:T,dir:b})},f=(b,_,v)=>{if(o>=gr)return null;o++;const P=Sv[b];if(P){const E=n.actors[n.active],R=Object.entries(n.items).some(([w,y])=>typeof y=="object"&&!("delivered"in y)&&!("carriedBy"in y)&&wr(y,E)&&c(w)===P);return s.push({type:"condition",index:_,kind:P,ok:R}),l=!R,d(),null}if(s.push({type:"commandStart",index:_,command:b,...v?{iter:v}:{}}),l)return l=!1,s.push({type:"condSkip",index:_,command:b}),d(),null;let T=null;switch(b){case"move":T=u(n.actors[n.active].dir);break;case"moveUp":T=u("N");break;case"moveDown":T=u("S");break;case"moveLeft":T=u("W");break;case"moveRight":T=u("E");break;case"turnLeft":case"turnRight":{const E=n.actors[n.active],R=b==="turnLeft"?bv(E.dir):Mv(E.dir);T={type:"turn",actor:n.active,from:E.dir,to:R},E.dir=R;break}case"swap":{if(n.actors.length>1){const E=n.active;n.active=(n.active+1)%n.actors.length,T={type:"swap",from:E,to:n.active}}break}case"grab":{const E=n.actors[n.active],R={col:E.col,row:E.row},w=Object.entries(n.items).find(([,y])=>typeof y=="object"&&!("delivered"in y)&&!("carriedBy"in y)&&wr(y,R));w?(n.items[w[0]]={carriedBy:n.active},T={type:"grab",actor:n.active,item:w[0],at:R}):T={type:"grabFail",actor:n.active,at:R};break}case"drop":{const E=n.actors[n.active],R={col:E.col,row:E.row},w=Object.entries(n.items).filter(([,y])=>typeof y=="object"&&"carriedBy"in y&&y.carriedBy===n.active);if(w.length===0)T={type:"dropFail",actor:n.active,at:R};else{for(const[y]of w){const D=h(R),B=!!D&&D.accepts===c(y);n.items[y]=B?{delivered:{...R}}:{...R},s.push({type:"drop",actor:n.active,item:y,at:R,onGoal:B})}T=null}break}}if(T&&s.push(T),T&&T.type==="move"&&e){const E=n.actors[n.active],R=Object.entries(n.items).find(([w,y])=>typeof y=="object"&&!("delivered"in y)&&!("carriedBy"in y)&&wr(y,E)&&c(w)===e.trigger);R&&(s.push({type:"ruleFire",actor:n.active,trigger:e.trigger,action:e.action}),n.items[R[0]]={carriedBy:n.active},s.push({type:"grab",actor:n.active,item:R[0],at:{col:E.col,row:E.row}}))}return d(),T},g=b=>{const _=[];for(let v=b-1;v>=0;v--){const P=t[v];if(P.cmd==="repeat"||P.cmd==="repeatUntil")break;_.unshift({cmd:P.cmd,source:v})}return _},x=new Set;for(let b=0;b<t.length;b++){const _=t[b];if(_.cmd==="repeat"||_.cmd==="repeatUntil")for(const v of g(b))x.add(v.source)}const m=b=>{for(const v of b)if(v&&(v.type==="bump"||v.type==="grab"||v.type==="drop"&&v.onGoal))return!0;const _=n.actors[n.active];return n.goals.some(v=>v.col===_.col&&v.row===_.row)};for(let b=0;b<t.length&&!(o>=gr);b++){if(x.has(b))continue;const _=t[b];if(_.cmd==="repeat"){const v=g(b);if(v.length===0){s.push({type:"loopFail",index:b,reason:"nothing"});continue}const P=Math.min(4,Math.max(2,_.arg??2));s.push({type:"loopStart",index:b,kind:"count",count:P});for(let T=1;T<=P&&o<gr;T++){s.push({type:"loopIter",index:b,iter:T,count:P});for(const E of v)f(E.cmd,E.source,{k:T,n:P});l=!1}s.push({type:"loopEnd",index:b});continue}if(_.cmd==="repeatUntil"){const v=g(b);if(v.length===0){s.push({type:"loopFail",index:b,reason:"nothing"});continue}s.push({type:"loopStart",index:b,kind:"until"});let P=0;for(;;){if(P++,P>wv||o>=gr){s.push({type:"loopOverflow",index:b}),a=!0;break}s.push({type:"loopIter",index:b,iter:P});const T=v.map(E=>f(E.cmd,E.source,{k:P,n:"∞"}));if(l=!1,m(T))break}s.push({type:"loopEnd",index:b});continue}f(_.cmd,b)}const p=Tv(n,c,i.collectAll===!0);return s.push({type:"done",success:p}),{events:s,finalState:n,success:p,actorTrail:r,overflowed:a}}function Av(i,t){const{events:e}=xh(i,t),n=[],s=new Set(i.goals.map(He));for(const r of e)r.type==="move"&&n.push({cell:r.to,kind:s.has(He(r.to))?"goal":"visit"}),r.type==="bump"&&n.push({cell:r.at,kind:"bump"});return n}class Cv{constructor(t,e,n){this.world=e,this.level=n,this.group.name="path-preview",t.add(this.group)}group=new St;geo=new Jt(.11,10,8);update(t){if(this.group.clear(),t.length===0)return;const e=Av(this.level,t),n=this.geo;for(const s of e){const r=s.kind==="goal"?"#ffd23e":s.kind==="bump"?"#ff8a8a":"#ffffff",o=new jt(n,ft(r)),a=this.world.cellToWorld(s.cell.col,s.cell.row);o.position.set(a.x,An+.08,a.z),this.group.add(o)}}clear(){this.group.clear()}}class yh{root;starNodes=[];constructor(t,e,n){this.root=C("header","top-bar",t);const s=C("button","circle-btn",this.root,"←");s.setAttribute("aria-label","Back to title"),s.addEventListener("click",n.onBack);const r=C("img","logo-chip-img",this.root);r.src="./art/logo.svg",r.alt="CodeBops",C("div","top-bar-spacer",this.root);const o=C("div","title-pill",this.root);C("span","dot",o);const a=e.indexOf(" · ");a>0?(C("span","t-world",o,`${e.slice(0,a)} · `),C("span","t-text",o,e.slice(a+3))):C("span","t-text",o,e),C("div","top-bar-spacer",this.root);const l=C("div","stars-pill",this.root);l.setAttribute("aria-label","Stars earned");for(let h=0;h<3;h++){const d=C("span","star",l,"★");this.starNodes.push(d)}const c=C("button","circle-btn blue",this.root,"⚙️");c.setAttribute("aria-label","Settings"),c.addEventListener("click",n.onSettings)}setStars(t){this.starNodes.forEach((e,n)=>e.classList.toggle("earned",n<t))}}class bh{root;constructor(t,e,n){this.root=C("aside","goal-card",t),this.root.setAttribute("aria-label",`Goal: ${e}`),C("div","goal-flag",this.root,"GOAL");const s=C("div","goal-visual",this.root);C("span",void 0,s,n),C("span","arrow",s,"➜");const r=C("img",void 0,s);r.src="./art/characters/zip/zip.svg",r.alt="Zip",C("p","goal-text",this.root,e)}}const Rv={moveUp:{id:"moveUp",label:"Move Up",shortLabel:"Up",icon:"⬆️",spoken:"Step one tile up"},moveDown:{id:"moveDown",label:"Move Down",shortLabel:"Down",icon:"⬇️",spoken:"Step one tile down"},moveLeft:{id:"moveLeft",label:"Move Left",shortLabel:"Left",icon:"⬅️",spoken:"Step one tile to the left"},moveRight:{id:"moveRight",label:"Move Right",shortLabel:"Right",icon:"➡️",spoken:"Step one tile to the right"},grab:{id:"grab",label:"Grab",shortLabel:"Grab",icon:"✋",spoken:"Grab what is here"},drop:{id:"drop",label:"Drop",shortLabel:"Drop",icon:"🫳",spoken:"Drop what you carry"},repeat:{id:"repeat",label:"Repeat",shortLabel:"×2",icon:"↻",spoken:"Repeat the commands above"},repeatUntil:{id:"repeatUntil",label:"Until",shortLabel:"Until",icon:"🔁",spoken:"Repeat until you get there"},ifFlower:{id:"ifFlower",label:"If Flower",shortLabel:"If 🌸",icon:"🌸",spoken:"If you see a flower, do the next tile"},ifMushroom:{id:"ifMushroom",label:"If Mushroom",shortLabel:"If 🍄",icon:"🍄",spoken:"If you see a mushroom, do the next tile"},swap:{id:"swap",label:"Swap Bot",shortLabel:"Swap",icon:"👥",spoken:"Switch which bot follows the plan"},move:{id:"move",label:"Move",shortLabel:"Move",icon:"⬆️",spoken:"Move forward one step"},turnRight:{id:"turnRight",label:"Turn Right",shortLabel:"Turn",icon:"↱",spoken:"Turn right"},turnLeft:{id:"turnLeft",label:"Turn Left",shortLabel:"Turn",icon:"↰",spoken:"Turn left"}},Ni={up:'<path d="M12 2.6 L21.4 12 H16.4 V21.4 H7.6 V12 H2.6 Z"/>',down:'<path d="M12 21.4 L2.6 12 H7.6 V2.6 H16.4 V12 H21.4 Z"/>',left:'<path d="M2.6 12 L12 2.6 V7.6 H21.4 V16.4 H12 V21.4 Z"/>',right:'<path d="M21.4 12 L12 21.4 V16.4 H2.6 V7.6 H12 V2.6 Z"/>'},Pv=`
<g>
  <path d="M6 12 C6 9.5 8 8.4 10 8.4 L15 8.4 C17.2 8.4 19 10 19 12.6 L19 16.4 C19 18.6 17.2 20.2 15 20.2 L9.6 20.2 C7.4 20.2 6 18.6 6 16.6 Z"/>
  <circle cx="8.2" cy="9.2" r="2.2"/><circle cx="11.2" cy="8.4" r="2.4"/><circle cx="14.2" cy="8.4" r="2.4"/><circle cx="16.8" cy="9.4" r="2.1"/>
  <path d="M6.4 12.6 C4 12 3 14 3.8 15.8 C4.5 17.4 6.4 17.4 7.4 16.6 L7.4 12.8 Z"/>
  <g stroke="rgba(20,30,70,.3)" stroke-width="1.2" stroke-linecap="round" fill="none">
    <path d="M9.4 11.2 V15.2"/><path d="M12.4 10.6 V15.4"/><path d="M15.2 11 V15.2"/>
  </g>
</g>`,Lv=`
<g>
  <rect x="6" y="11.5" width="12" height="8.7" rx="4.2"/>
  <rect x="7.1" y="4" width="2.4" height="10" rx="1.2"/>
  <rect x="9.9" y="3" width="2.4" height="11" rx="1.2"/>
  <rect x="12.7" y="4" width="2.4" height="10" rx="1.2"/>
  <rect x="15.4" y="5.6" width="2.2" height="8.6" rx="1.1"/>
  <rect x="3.7" y="11.8" width="2.4" height="6.4" rx="1.2" transform="rotate(-38 4.9 15)"/>
</g>`,Mh=`
<g fill="none" stroke="currentColor" stroke-width="2.7" stroke-linecap="round">
  <path d="M6.2 9.4 A7.2 7.2 0 0 1 18.4 8.2"/>
  <path d="M17.8 14.6 A7.2 7.2 0 0 1 5.6 15.8"/>
</g>
<path d="M19.6 4.4 L19.9 9.4 L14.9 8.7 Z"/>
<path d="M4.4 19.6 L4.1 14.6 L9.1 15.3 Z"/>`,Iv=`
${Mh}
<g transform="translate(12 12) scale(.44)" fill="none" stroke="currentColor" stroke-width="4.4" stroke-linecap="round">
  <path d="M-5 0 A3.4 3.4 0 1 1 0 0 A3.4 3.4 0 1 0 5 0"/>
</g>`,Dv=`
<g fill="none" stroke="currentColor" stroke-width="2.7" stroke-linecap="round" stroke-linejoin="round">
  <path d="M5.5 9.5 H16"/>
  <path d="M18.5 14.5 H8"/>
</g>
<path d="M18.8 9.5 L13.8 6.6 V12.4 Z"/>
<path d="M5.2 14.5 L10.2 11.6 V17.4 Z"/>`,Uv=`
<g>
  <ellipse cx="12" cy="5.4" rx="3" ry="3.4"/>
  <ellipse cx="18.2" cy="9.9" rx="3.4" ry="3"/>
  <ellipse cx="15.8" cy="17.2" rx="3" ry="3.4"/>
  <ellipse cx="8.2" cy="17.2" rx="3" ry="3.4"/>
  <ellipse cx="5.8" cy="9.9" rx="3.4" ry="3"/>
  <circle cx="12" cy="11.4" r="3.5" fill="#ffe08a"/>
</g>`,Nv=`
<g>
  <path d="M4 12.4 C4 7.2 7.6 4 12 4 C16.4 4 20 7.2 20 12.4 C20 13.4 19.2 13.9 18.2 13.9 H5.8 C4.8 13.9 4 13.4 4 12.4 Z"/>
  <rect x="9.3" y="13.6" width="5.4" height="7.2" rx="2.5"/>
  <circle cx="9.6" cy="9.2" r="1.5" fill="#e46a8b"/>
  <circle cx="14.4" cy="8.4" r="1.7" fill="#e46a8b"/>
  <circle cx="12.4" cy="11" r="1.2" fill="#e46a8b"/>
</g>`,Fv=`
<g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
  <path d="M7 20 V12.5 A4.5 4.5 0 0 1 11.5 8 H15.5"/>
</g>
<path d="M14.5 3.6 L20.5 8 L14.5 12.4 Z"/>`,Ov=`
<g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
  <path d="M17 20 V12.5 A4.5 4.5 0 0 0 12.5 8 H8.5"/>
</g>
<path d="M9.5 3.6 L3.5 8 L9.5 12.4 Z"/>`,Bv={moveUp:Ni.up,moveDown:Ni.down,moveLeft:Ni.left,moveRight:Ni.right,move:Ni.up,grab:Pv,drop:Lv,repeat:Mh,repeatUntil:Iv,ifFlower:Uv,ifMushroom:Nv,swap:Dv,turnRight:Fv,turnLeft:Ov};function kv(i){return`<svg class="cmd-ico" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">${Bv[i]??Ni.up}</svg>`}function zv(i){const t=document.createElement("span");return t.className="ico",t.innerHTML=kv(i),t}class Gv{constructor(t,e,n,s,r){this.maxSlots=n,this.events=s,this.sfx=r,this.root=C("div","bottom-deck",t);const o=C("div","deck-panel",this.root),a=C("div","deck-tray",o);for(const f of e)a.appendChild(this.makeTile(f,"tray",-1));C("div","deck-divider",o);const l=C("div","deck-sequence",o);l.setAttribute("aria-label","Your program");for(let f=0;f<n;f++){const g=C("div","slot",l);g.dataset.index=String(f),this.slotNodes.push(g)}const c=C("div","bop-wrap",this.root);this.bopBtn=C("button","bop-btn",c),this.bopBtn.type="button",this.bopBtn.setAttribute("aria-label","BOP! Run the program"),this.bopBtn.append("BOP!"),C("span","tri",this.bopBtn),this.bopBtn.addEventListener("click",()=>{this.program.length===0||this.running||(this.sfx.play("bop"),this.events.onBop())}),this.refreshBopState();const h=C("div","deck-tools",this.root),d=C("button","mini-btn purple",h,"↩ Rewind");d.type="button",d.setAttribute("aria-label","Rewind Zip to the start, keep the plan"),d.addEventListener("click",()=>{this.running||(this.sfx.play("remove"),this.events.onRewind())});const u=C("button","mini-btn",h,"✕ Clear");u.type="button",u.setAttribute("aria-label","Clear the plan"),u.addEventListener("click",()=>{this.running||this.program.length===0||(this.sfx.play("remove"),this.program=[],this.renderSlots(),this.emitChange())}),this.renderSlots()}root;program=[];slotNodes=[];bopBtn;drag=null;running=!1;lastPlaced=-1;lastPointerTap=0;loopBubble=null;condBubble=null;getProgram(){return this.program.map(t=>({...t}))}setProgram(t){this.program=t.slice(0,this.maxSlots).map(e=>({...e})),this.lastPlaced=-1,this.renderSlots(),this.emitChange()}refreshBopState(){const t=this.program.length>0&&!this.running;this.bopBtn?.classList.toggle("ready",t),this.bopBtn?.classList.toggle("empty",this.program.length===0)}setRunning(t){this.running=t,this.bopBtn.disabled=t,this.refreshBopState(),t||(this.clearRunningHighlight(),this.clearLoopBubble(),this.clearCondBubble())}highlightSlot(t,e){this.slotNodes.forEach((n,s)=>n.classList.toggle("running",s===t)),this.clearCondBubble(),e&&this.showLoopBubble(t,e.k,e.n)}markLoopSource(t){this.slotNodes.forEach((e,n)=>e.classList.toggle("loop-src",t.includes(n)))}clearRunningHighlight(){this.slotNodes.forEach(t=>t.classList.remove("running","loop-src"))}showLoopBubble(t,e,n){this.clearLoopBubble();const s=this.slotNodes[t];s&&(this.loopBubble=C("div","loop-bubble",s,n==="∞"?`loop ${e}…`:`${e} of ${n}`))}clearLoopBubble(){this.loopBubble?.remove(),this.loopBubble=null}showCondBubble(t,e,n){this.clearCondBubble();const s=this.slotNodes[t];s&&(this.condBubble=C("div",`loop-bubble cond-bubble ${n?"ok":"no"}`,s,`${e} ${n?"✓":"✗"}`))}clearCondBubble(){this.condBubble?.remove(),this.condBubble=null}flashSkipped(t){const e=this.slotNodes[t];e&&(e.classList.add("skipped"),window.setTimeout(()=>e.classList.remove("skipped"),650))}makeTile(t,e,n){const s=Rv[t],r=C("button","tile");if(r.type="button",r.dataset.cmd=t,r.setAttribute("aria-label",e==="tray"?`Add command: ${s.spoken}`:`Step ${n+1}: ${s.spoken}. Tap to remove.`),C("span","sheen",r),r.appendChild(zv(t)),C("span","lbl",r,s.label),t==="repeat"&&e==="slot"){const o=this.program[n],a=C("span","count-badge",r,`×${o?.arg??2}`);a.setAttribute("role","button"),a.setAttribute("aria-label","Change repeat count");const l=c=>{if(c.stopPropagation(),this.running)return;const h=this.program[n];if(!h||h.cmd!=="repeat")return;const d=(h.arg??2)>=4?2:(h.arg??2)+1;this.program[n]={cmd:"repeat",arg:d},a.textContent=`×${d}`,this.sfx.play("tap"),this.emitChange()};a.addEventListener("pointerdown",c=>c.stopPropagation()),a.addEventListener("click",l)}return r.addEventListener("pointerdown",o=>this.onPointerDown(o,t,e,n,r)),r.addEventListener("click",()=>{Date.now()-this.lastPointerTap<450||(e==="tray"?this.addCommand(t):this.removeAt(n))}),r.addEventListener("keydown",o=>{(o.key==="Enter"||o.key===" ")&&(o.preventDefault(),e==="tray"?this.addCommand(t):this.removeAt(n))}),r}renderSlots(){this.slotNodes.forEach((t,e)=>{t.innerHTML="",t.classList.remove("filled","drop-hint");const n=this.program[e];if(n!==void 0){t.classList.add("filled"),C("span","num",t,String(e+1));const s=this.makeTile(n.cmd,"slot",e);e===this.lastPlaced&&s.classList.add("fresh"),t.appendChild(s)}}),this.refreshBopState()}emitChange(){this.events.onProgramChange(this.getProgram())}addCommand(t){this.running||this.program.length>=this.maxSlots||(this.program.push(t==="repeat"?{cmd:t,arg:2}:{cmd:t}),this.lastPlaced=this.program.length-1,this.sfx.play("place"),this.renderSlots(),this.emitChange())}removeAt(t){this.running||t<0||t>=this.program.length||(this.program.splice(t,1),this.lastPlaced=-1,this.sfx.play("remove"),this.renderSlots(),this.emitChange())}insertAt(t,e){if(this.program.length>=this.maxSlots)return;const n=Math.min(e,this.program.length);this.program.splice(n,0,t==="repeat"?{cmd:t,arg:2}:{cmd:t}),this.lastPlaced=n,this.sfx.play("place"),this.renderSlots(),this.emitChange()}onPointerDown(t,e,n,s,r){if(this.running)return;t.preventDefault();const o=r.cloneNode(!0);o.className="tile drag-ghost",o.dataset.cmd=e,document.body.appendChild(o),this.positionGhost(o,t.clientX,t.clientY),this.drag={pointerId:t.pointerId,kind:n,command:e,fromIndex:s,ghost:o,moved:!1,startX:t.clientX,startY:t.clientY},r.setPointerCapture(t.pointerId),r.addEventListener("pointermove",this.onPointerMove),r.addEventListener("pointerup",this.onPointerUp,{once:!0}),r.addEventListener("pointercancel",this.onPointerCancel,{once:!0})}positionGhost(t,e,n){t.style.left=`${e}px`,t.style.top=`${n}px`}onPointerMove=t=>{const e=this.drag;if(!e||t.pointerId!==e.pointerId)return;Math.hypot(t.clientX-e.startX,t.clientY-e.startY)>8&&(e.moved=!0),this.positionGhost(e.ghost,t.clientX,t.clientY);const s=this.slotAtPoint(t.clientX,t.clientY);this.slotNodes.forEach((r,o)=>r.classList.toggle("drop-hint",o===s&&e.moved))};onPointerUp=t=>{const e=this.drag;if(!e||t.pointerId!==e.pointerId)return;if(t.target.removeEventListener("pointermove",this.onPointerMove),this.endDrag(),!e.moved){this.lastPointerTap=Date.now(),e.kind==="tray"?this.addCommand(e.command):this.removeAt(e.fromIndex);return}const s=this.slotAtPoint(t.clientX,t.clientY);if(s!==-1){if(e.kind==="tray")this.insertAt(e.command,s);else if(s!==e.fromIndex){const r=this.program[e.fromIndex];this.program.splice(e.fromIndex,1);const o=s>e.fromIndex?s-1:s;this.program.splice(Math.min(o,this.program.length),0,r),this.sfx.play("place"),this.renderSlots(),this.emitChange()}}};onPointerCancel=t=>{this.drag&&t.pointerId===this.drag.pointerId&&(t.target.removeEventListener("pointermove",this.onPointerMove),this.endDrag())};endDrag(){this.drag&&(this.drag.ghost.remove(),this.drag=null,this.slotNodes.forEach(t=>t.classList.remove("drop-hint")))}slotAtPoint(t,e){let n=-1,s=1/0;return this.slotNodes.forEach((r,o)=>{const a=r.getBoundingClientRect(),l=a.left+a.width/2,c=a.top+a.height/2,h=Math.hypot(t-l,e-c);h<a.width*.95&&h<s&&(n=o,s=h)}),n}}function Qi(i){return C("div","dialog-scrim",i)}function fi(i,t){i.remove(),t instanceof HTMLElement&&t.focus()}function wh(i,t,e){return new Promise(n=>{const s=document.activeElement,r=Qi(i),o=C("div","dialog",r);o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),o.setAttribute("aria-label",t.brief.title),C("div","intro-emoji",o,t.brief.emoji),C("h2",void 0,o,t.brief.title),C("p",void 0,o,t.brief.text);const a=C("button","mini-btn",o,"🚀 Let's go!");a.addEventListener("click",()=>{e.play("bop"),fi(r,s),n()}),a.focus()})}function Hv(i,t,e){const n=document.activeElement,s=Qi(i),r=C("div","dialog",s);r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.setAttribute("aria-label","Forever Fred found a loop that never stops!");const o=C("div","goal-visual",r),a=C("img",void 0,o);a.src="./art/characters/mixy/mixy.svg",a.alt="Forever Fred the GlitchBop",a.style.height="84px",a.style.filter="hue-rotate(130deg) saturate(1.2)",C("h2",void 0,r,"Whoa — Forever Fred!"),C("p",void 0,r,"That loop has no way to stop, so it spun around forever! Every Until loop needs a stopping condition — a bump, a grab, or reaching the goal.");const l=C("div","dialog-actions",r),c=C("button","mini-btn",l,"🛠 Fix My Loop");c.addEventListener("click",()=>{t.play("tap"),fi(s,n),e()}),c.focus()}function Vv(i,t,e){return new Promise(n=>{const s=document.activeElement,r=Qi(i),o=C("div","dialog",r);o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),o.setAttribute("aria-label",t.prediction.prompt),C("h2",void 0,o,"🔮 Make a Prediction!"),C("p",void 0,o,t.prediction.prompt);const a=C("div","dialog-choices",o);let l=!1;for(const c of t.prediction.choices){const h=C("button","choice-card",a);C("span","big",h,c.emoji),C("span",void 0,h,c.label),h.addEventListener("click",()=>{l||(l=!0,e.play("tap"),fi(r,s),n({predictedSuccess:c.correct}))})}a.querySelector("button")?.focus()})}function Wv(i,t,e,n){const s=document.activeElement,r=Qi(i),o=C("div","dialog",r);o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),o.setAttribute("aria-label","Level complete!"),C("h2",void 0,o,"🎉 You did it!");const a=C("div","cele-stars",o),l=[];for(let f=0;f<3;f++)l.push(C("span","star",a,"★"));const c=C("div","cele-name",o,"");C("p",void 0,o,t.predictedCorrectly===!0?"And your prediction was right — super thinking!":"Zip followed YOUR plan perfectly!");const h=C("div","dialog-actions",o),d=C("button","mini-btn purple",h,"↩ Play Again"),u=C("button","mini-btn",h,"➜ Keep Going");d.addEventListener("click",()=>{e.play("tap"),fi(r,s),n.onReplay()}),u.addEventListener("click",()=>{e.play("tap"),fi(r,s),n.onContinue()}),u.focus(),t.starNames.forEach((f,g)=>{setTimeout(()=>{l[g]?.classList.add("pop"),c.textContent=`⭐ ${f}`,e.play("star")},300+g*450)}),Xv(i)}function Xv(i){const t=["#ff5fa2","#ffd23e","#3ed35f","#38b6ff","#a06bff","#ff9f2e","#5ee8c7"];for(let e=0;e<70;e++){const n=C("div","confetti",i),s=8+Math.random()*10;n.style.width=`${s}px`,n.style.height=`${s*(.5+Math.random())}px`,n.style.left=`${Math.random()*100}%`,n.style.background=t[e%t.length],n.style.animationDuration=`${1.8+Math.random()*1.8}s`,n.style.animationDelay=`${Math.random()*.6}s`,setTimeout(()=>n.remove(),4500)}}function Yv(i,t,e,n){const s=document.activeElement,r=Qi(i),o=C("div","dialog",r);o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),o.setAttribute("aria-label","Mixy found a glitch! Inspect your plan step by step.");const a=C("div","goal-visual",o),l=C("img",void 0,a);l.src="./art/characters/mixy/mixy.svg",l.alt="Mixy the GlitchBop",l.style.height="84px",C("h2",void 0,o,"Oops — Mixy found a glitch!"),C("p",void 0,o,"No worries! Tap the steps to see what happened, fix your plan, and BOP again!");const c=C("div","replay-strip",o),h=qv(t),d=[];h.forEach((g,x)=>{const m=C("button","replay-chip",c);m.setAttribute("aria-label",`Step ${x+1}: ${g.label}`),C("span","ico",m,g.icon),m.addEventListener("click",()=>{e.play("tap"),d.forEach(p=>p.classList.remove("active")),m.classList.add("active"),n.onScrub(x)}),d.push(m)});const u=C("div","dialog-actions",o),f=C("button","mini-btn",u,"🛠 Fix My Plan");f.addEventListener("click",()=>{e.play("tap"),fi(r,s),n.onTryAgain()}),f.focus()}function qv(i){const t=[];for(const e of i)switch(e.type){case"move":t.push({icon:"⬆️",label:"Move"});break;case"bump":t.push({icon:"💥",label:"Bump! Something was in the way"});break;case"turn":t.push({icon:"↱",label:"Turn"});break;case"grab":t.push({icon:"🍓",label:"Grabbed the strawberry"});break;case"grabFail":t.push({icon:"✋",label:"Nothing to grab here"});break;case"drop":t.push({icon:e.onGoal?"⭐":"⬇️",label:e.onGoal?"Delivered!":"Dropped it"});break;case"dropFail":t.push({icon:"🤲",label:"Nothing to drop"});break}return t}function Sh(i,t,e,n){const s=document.activeElement,r=Qi(i),o=C("div","dialog",r);o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),o.setAttribute("aria-label","Settings"),C("h2",void 0,o,"⚙️ Settings");const a=C("div","settings-list",o),l=[{key:"sound",label:"🔊 Sound effects"},{key:"calmMode",label:"🍃 Calm mode (softer motion)"},{key:"highContrast",label:"🌗 High contrast"}];for(const d of l){const u=C("div","setting-row",a);C("span",void 0,u,d.label);const f=C("button","toggle",u);f.setAttribute("role","switch"),f.setAttribute("aria-label",d.label),f.setAttribute("aria-pressed",String(t.settings[d.key])),f.addEventListener("click",()=>{const g=!t.settings[d.key];t.updateSettings({[d.key]:g}),f.setAttribute("aria-pressed",String(g)),e.play("tap"),n()})}const c=C("div","dialog-actions",o),h=C("button","mini-btn",c,"✓ Done");h.addEventListener("click",()=>{e.play("tap"),fi(r,s)}),h.focus()}let fc=0;function pn(i,t){i.querySelectorAll(".toast").forEach(n=>n.remove());const e=C("div","toast",i,t);clearTimeout(fc),fc=window.setTimeout(()=>e.remove(),2200)}class $v{ctx=null;enabled=!0;ensure(){if(!this.enabled)return null;if(!this.ctx){const t=window.AudioContext??window.webkitAudioContext;if(!t)return null;this.ctx=new t}return this.ctx.state==="suspended"&&this.ctx.resume(),this.ctx}tone(t,e,n,s=.16,r=0,o){const a=this.ensure();if(!a)return;const l=a.currentTime+r,c=a.createOscillator(),h=a.createGain();c.type=n,c.frequency.setValueAtTime(t,l),o&&c.frequency.exponentialRampToValueAtTime(o,l+e),h.gain.setValueAtTime(0,l),h.gain.linearRampToValueAtTime(s,l+.012),h.gain.exponentialRampToValueAtTime(.001,l+e),c.connect(h).connect(a.destination),c.start(l),c.stop(l+e+.05)}play(t){if(this.enabled)switch(t){case"tap":this.tone(520,.07,"triangle",.12);break;case"place":this.tone(440,.09,"triangle",.14),this.tone(660,.09,"triangle",.12,.06);break;case"remove":this.tone(330,.08,"triangle",.1);break;case"bop":this.tone(392,.1,"square",.1),this.tone(523,.1,"square",.1,.08),this.tone(784,.16,"square",.1,.16);break;case"hop":this.tone(300,.12,"sine",.1,0,520);break;case"bump":this.tone(140,.14,"sawtooth",.08,0,90);break;case"grab":this.tone(700,.08,"triangle",.12),this.tone(900,.1,"triangle",.1,.05);break;case"drop":this.tone(600,.08,"triangle",.12),this.tone(420,.12,"triangle",.1,.06);break;case"loop":this.tone(500,.07,"sine",.1),this.tone(640,.08,"sine",.09,.05);break;case"predictRight":this.tone(523,.1,"triangle",.13),this.tone(784,.14,"triangle",.12,.08);break;case"predictWrong":this.tone(260,.16,"triangle",.1),this.tone(330,.14,"triangle",.1,.1);break;case"star":this.tone(880,.12,"sine",.14),this.tone(1320,.2,"sine",.1,.07);break;case"celebrate":[523,659,784,1047].forEach((e,n)=>this.tone(e,.16,"triangle",.13,n*.09)),this.tone(1319,.3,"sine",.1,.4);break;case"glitch":this.tone(220,.07,"square",.07),this.tone(180,.07,"square",.07,.06),this.tone(260,.09,"square",.07,.12);break}}}const fn=new $v,Eh=2,pc="codebops.save.v1",ds={schemaVersion:Eh,stars:{},settings:{sound:!0,calmMode:!1,highContrast:!1,leftHanded:!1},daily:{lastCompleted:null,streak:0,totalCompleted:0},playSeconds:0};function Wa(i=new Date){const t=e=>String(e).padStart(2,"0");return`${i.getFullYear()}-${t(i.getMonth()+1)}-${t(i.getDate())}`}function jv(){const i=new Date;return i.setDate(i.getDate()-1),Wa(i)}class fs{data;constructor(){this.data=this.load()}load(){try{const t=localStorage.getItem(pc);if(!t)return structuredClone(ds);const e=JSON.parse(t);return{schemaVersion:Eh,stars:{...e.stars},settings:{...ds.settings,...e.settings},daily:{...ds.daily,...e.daily},playSeconds:e.playSeconds??0}}catch{return structuredClone(ds)}}persist(){try{localStorage.setItem(pc,JSON.stringify(this.data))}catch{}}get stars(){return this.data.stars}get settings(){return this.data.settings}get daily(){return this.data.daily}get playSeconds(){return this.data.playSeconds}setStars(t,e){this.data.stars[t]=Math.max(this.data.stars[t]??0,e),this.persist()}updateSettings(t){this.data.settings={...this.data.settings,...t},this.persist()}completeDaily(){const t=Wa();return this.data.daily.lastCompleted===t?this.data.daily.streak:(this.data.daily.streak=this.data.daily.lastCompleted===jv()?this.data.daily.streak+1:1,this.data.daily.lastCompleted=t,this.data.daily.totalCompleted+=1,this.persist(),this.data.daily.streak)}addPlaySeconds(t){this.data.playSeconds+=Math.max(0,Math.round(t)),this.persist()}reset(){this.data=structuredClone(ds),this.persist()}}function Zv(i){const t=[],{cols:e,rows:n}=i;(e<1||n<1)&&t.push("Level grid must be at least 1×1."),ri(i.start,e,n)||t.push(`Start ${He(i.start)} out of bounds.`);const s=new Set(i.blocked.map(He));s.has(He(i.start))&&t.push("Start cell is blocked.");for(const l of i.blocked)ri(l,e,n)||t.push(`Blocked cell ${He(l)} out of bounds.`);i.botStart&&(ri(i.botStart,e,n)||t.push("botStart out of bounds."),s.has(He(i.botStart))&&t.push("botStart is blocked."),i.availableCommands.includes("swap")||t.push("botStart level must offer the swap tile."));for(const l of i.zipBlocked??[])ri(l,e,n)||t.push(`zipBlocked ${He(l)} out of bounds.`);const r=new Set,o=new Set;for(const l of i.items)ri(l,e,n)||t.push(`Item "${l.id}" out of bounds.`),s.has(He(l))&&t.push(`Item "${l.id}" sits on a blocked cell.`),r.has(l.id)&&t.push(`Duplicate item id "${l.id}".`),r.add(l.id),o.add(l.kind);for(const l of i.goals)ri(l,e,n)||t.push(`Goal ${He(l)} out of bounds.`),o.has(l.accepts)||t.push(`Goal accepts unknown item kind "${l.accepts}".`);i.maxSlots<1&&t.push("maxSlots must be ≥ 1."),i.availableCommands.length===0&&t.push("Level offers no commands.");for(const l of i.ruleChoices??[])o.has(l.trigger)||t.push(`Rule trigger "${l.trigger}" has no matching item in the level.`);return(i.prefill?.length??0)>i.maxSlots&&t.push("Prefill exceeds maxSlots."),i.prediction.choices.filter(l=>l.correct).length!==1&&t.push("Prediction needs exactly one correct choice."),t}function Jv(i){const t=Zv(i);if(t.length>0)throw new Error(`[CodeBops] Invalid level "${i.id}":
 - ${t.join(`
 - `)}`)}const mc={strawberry:"🍓",pearl:"🦪",flower:"🌸",mushroom:"🍄",battery:"🔋",badge:"🎖️"},Kv=["Zip","Bolt"],Qv={"sparkle-meadow":"#6fc7ff","bubble-bay":"#5fd4f0","pattern-forest":"#241b3d","robot-town":"#1b2340","agent-academy":"#ffb86b"};class Po{constructor(t,e,n){this.root=t,this.level=e,this.events=n,this.store=n.store??new fs,Jv(e)}stage;world;zip;bolt=null;mixy;preview;deck;topBar;charLayer;sfx=fn;store;program=[];running=!1;predictedSuccess=null;disposers=[];playAccum=0;selectedRule=null;lensGroup=null;lensOn=!1;ruleCardEls=[];runHadRuleFire=!1;bot(t){return t===1&&this.bolt?this.bolt:this.zip}enter(){const t=C("div","",this.root);t.id="world-canvas-wrap",this.charLayer=C("div","",this.root),this.charLayer.id="char-layer";const e=C("div","ui-layer",this.root);this.stage=new Gr(t),this.world=this.level.worldId==="bubble-bay"?new K0(this.level):this.level.worldId==="pattern-forest"?new nv(this.level):this.level.worldId==="robot-town"?new lv(this.level):this.level.worldId==="agent-academy"?new pv(this.level):new q0(this.level),this.stage.scene.add(this.world.group),this.stage.setSky(Qv[this.level.worldId]??"#6fc7ff"),this.zip=new _s({svgUrl:"./art/characters/zip/zip.svg",height:1.78,name:"zip"},this.charLayer,this.stage.camera,t),this.zip.addToScene(this.stage.scene);const n=this.world.cellToWorld(this.level.start.col,this.level.start.row);this.zip.placeAt(n),this.level.botStart&&(this.bolt=new _s({svgUrl:"./art/characters/zip/zip.svg",height:1.62,name:"bolt",extraClass:"robot-bop"},this.charLayer,this.stage.camera,t),this.bolt.addToScene(this.stage.scene),this.bolt.placeAt(this.world.cellToWorld(this.level.botStart.col,this.level.botStart.row))),this.mixy=new _s({svgUrl:"./art/characters/mixy/mixy.svg",height:1.55,name:"mixy",mixy:!0},this.charLayer,this.stage.camera,t),this.mixy.addToScene(this.stage.scene),this.mixy.placeAt(this.world.mixyLookout()),this.mixy.look("left");{const o=this.level,a=.65,l=[this.world.cellToWorld(-a,-a),this.world.cellToWorld(o.cols-1+a,-a),this.world.cellToWorld(-a,o.rows-1+a),this.world.cellToWorld(o.cols-1+a,o.rows-1+a)],c=this.world.cellToWorld((o.cols-1)/2,(o.rows-1)/2);c.y=.2,this.stage.frameArea(c,l)}if(this.preview=new Cv(this.world.group,this.world,this.level),this.topBar=new yh(e,`${this.level.title} · ${this.level.shortTitle}`,{onBack:this.events.onExit,onSettings:()=>Sh(e,this.store,this.sfx,()=>this.applySettings())}),this.topBar.setStars(this.store.stars[this.level.id]??0),new bh(e,this.level.goalText,mc[this.level.items[0]?.kind??"strawberry"]),this.deck=new Gv(e,this.level.availableCommands,this.level.maxSlots,{onProgramChange:o=>{this.program=o,this.preview.update(o)},onBop:()=>void this.onBop(e),onRewind:()=>this.rewind()},this.sfx),this.level.ruleChoices&&this.level.ruleChoices.length>0){const o=C("div","rule-bar",e);C("span","rule-label",o,"⚡ HELPER RULE");for(const l of this.level.ruleChoices){const c=C("button","rule-card",o);c.type="button",c.innerHTML=`WHEN ${mc[l.trigger]} → ✋`,c.setAttribute("aria-label",`Rule: when you see a ${l.trigger}, grab it`),c.addEventListener("click",()=>{this.sfx.play("tap"),this.selectedRule=this.selectedRule?.trigger===l.trigger?null:{...l},this.refreshRuleBar()}),this.ruleCardEls.push(c)}const a=C("button","rule-lens",o,"🔍 BopLens");a.type="button",a.addEventListener("click",()=>{this.sfx.play("tap"),this.lensOn=!this.lensOn,a.classList.toggle("on",this.lensOn),this.refreshLens()}),this.selectedRule={...this.level.ruleChoices[0]},this.refreshRuleBar()}const s=o=>{if(this.running||document.querySelector(".dialog-scrim"))return;const a=h=>this.level.availableCommands.includes(h),c={ArrowLeft:"moveLeft",ArrowRight:"moveRight",ArrowUp:"moveUp",ArrowDown:"moveDown"}[o.key];c&&a(c)?(o.preventDefault(),this.deck.addCommand(c),this.sfx.play("tap")):o.key==="Backspace"?(o.preventDefault(),this.deck.removeAt(this.program.length-1)):(o.key==="Enter"||o.key===" ")&&this.program.length>0&&(o.preventDefault(),this.onBop(e))};window.addEventListener("keydown",s),this.disposers.push(()=>window.removeEventListener("keydown",s));const r=this.stage.onTick((o,a)=>{if(this.world.update(o,a),this.zip.update(o,a),this.bolt?.update(o,a),this.mixy.update(o,a),this.lensGroup){const l=1+Math.sin(a*4)*.12;for(const c of this.lensGroup.children)c.scale.setScalar(l),c.rotation.z=a*.9}this.playAccum+=o,this.playAccum>=20&&(this.store.addPlaySeconds(this.playAccum),this.playAccum=0)});this.disposers.push(r),this.stage.startLoop(),this.applySettings(),wh(e,this.level,this.sfx).then(()=>{this.level.prefill?(this.deck.setProgram(this.level.prefill),pn(e,"Copycat left a broken plan — can you fix it? 🐾")):pn(e,"Build a plan, then press BOP!")})}applySettings(){const t=this.store.settings;this.sfx.enabled=t.sound,document.body.classList.toggle("calm-mode",t.calmMode),document.body.classList.toggle("high-contrast",t.highContrast),document.body.classList.toggle("left-handed",t.leftHanded),this.zip?.setCalm(t.calmMode),this.bolt?.setCalm(t.calmMode),this.mixy?.setCalm(t.calmMode)}refreshRuleBar(){this.ruleCardEls.forEach((t,e)=>{const n=this.level.ruleChoices[e];t.classList.toggle("selected",this.selectedRule?.trigger===n.trigger)}),this.refreshLens()}refreshLens(){if(this.lensGroup&&(this.lensGroup.removeFromParent(),this.lensGroup.traverse(s=>{s instanceof jt&&(s.geometry.dispose(),s.material.dispose())}),this.lensGroup=null),!this.lensOn||!this.selectedRule)return;const t=new St,e=new we({color:"#7ff3ff",emissive:"#54e6ff",emissiveIntensity:1.3,transparent:!0,opacity:.9}),n=new Xe(.62,.05,8,28);for(const s of this.level.items){if(s.kind!==this.selectedRule.trigger)continue;const r=new jt(n,e);r.rotation.x=-Math.PI/2;const o=this.world.cellToWorld(s.col,s.row);r.position.set(o.x,An+.04,o.z),r.name="lensRing",t.add(r)}this.lensGroup=t,this.world.group.add(t)}rewind(){const t=this.world.cellToWorld(this.level.start.col,this.level.start.row);this.zip.placeAt(t),this.zip.look(null),this.zip.setMood("idle"),this.bolt&&this.level.botStart&&(this.bolt.placeAt(this.world.cellToWorld(this.level.botStart.col,this.level.botStart.row)),this.bolt.look(null),this.bolt.setMood("idle"));for(const e of this.level.items){const n=this.world.itemNodes.get(e.id);if(n){n.removeFromParent();const s=this.world.cellToWorld(e.col,e.row);n.position.set(s.x,An,s.z),n.scale.setScalar(1),this.world.group.add(n)}}this.preview.update(this.program)}blockIndices(t){const e=[];for(let n=t-1;n>=0;n--){const s=this.program[n]?.cmd;if(s==="repeat"||s==="repeatUntil")break;e.unshift(n)}return e}async onBop(t){if(this.running||this.program.length===0)return;this.running=!0,this.deck.setRunning(!0),this.preview.clear(),this.zip.setMood("thinking"),this.zip.look("up");const{predictedSuccess:e}=await Vv(t,this.level,this.sfx);this.predictedSuccess=e,this.zip.setMood("idle"),this.zip.look(null),this.rewind();const n=xh(this.level,this.program,this.selectedRule);this.runHadRuleFire=n.events.some(s=>s.type==="ruleFire"),await this.playback(n.events),n.success?this.celebrate(t):n.overflowed?(await this.mixy.glitchWobble(.7),this.sfx.play("glitch"),Hv(t,this.sfx,()=>{this.rewind(),this.preview.update(this.program),pn(t,"Give your Until loop a way to stop! 🛑")})):await this.mixyGlitch(t,n),this.running=!1,this.deck.setRunning(!1)}async playback(t){const e=this.store.settings.calmMode?1.35:1,n=[[],[]];for(const s of t)switch(s.type){case"commandStart":this.deck.highlightSlot(s.index,s.iter),await En(.14/e);break;case"move":{const r=this.bot(s.actor);this.sfx.play("hop");const o=this.world.cellToWorld(s.to.col,s.to.row);this.faceDirection(r,s.dir),await r.hopTo(o,.34/e);break}case"bump":{const r=this.bot(s.actor);this.sfx.play("bump"),r.flashMood("surprised",700),await r.bumpShake();break}case"turn":{const r=this.bot(s.actor);this.faceDirection(r,s.to),await r.turnWiggle();break}case"swap":{const r=this.bot(s.to);this.sfx.play("grab"),r.flashMood("excited",900),r.hopTo(r.root.position.clone(),.3/e),pn(this.root,s.to===1?"Bolt is listening! 🤖":"Zip is listening! 🐰"),await En(.25/e);break}case"ruleFire":{const r=this.bot(s.actor);r.flashMood("excited",700),this.sfx.play("loop"),this.ruleCardEls.forEach(l=>{l.classList.remove("fired"),l.offsetWidth,l.classList.add("fired")});const o=r.el.getBoundingClientRect(),a=C("div","rule-pop",document.body,"⚡");a.style.left=`${o.left+o.width/2-16}px`,a.style.top=`${o.top-8}px`,window.setTimeout(()=>a.remove(),800),await En(.15/e);break}case"grab":{const r=this.bot(s.actor);this.sfx.play("grab"),r.flashMood("happy",900);const o=this.world.itemNodes.get(s.item);if(o){o.removeFromParent(),r.carryAnchor.add(o);const a=n[s.actor]??n[0];o.position.set(-.06*a.length,.13*a.length,0),o.scale.setScalar(.8),a.push(o)}await En(.2/e);break}case"grabFail":{const r=this.bot(s.actor);this.sfx.play("bump"),r.flashMood("surprised",700),await r.turnWiggle();break}case"drop":{const r=this.bot(s.actor);this.sfx.play("drop");const a=(n[s.actor]??n[0]).shift();if(a){a.removeFromParent();const l=this.world.cellToWorld(s.at.col,s.at.row);a.position.set(l.x+(s.onGoal?0:(Math.random()-.5)*.3),An+(s.onGoal?.62:0),l.z+(s.onGoal?.1:(Math.random()-.5)*.3)),a.scale.setScalar(s.onGoal?.85:1),this.world.group.add(a)}s.onGoal&&r.flashMood("happy",1200),await En(.24/e);break}case"dropFail":{const r=this.bot(s.actor);this.sfx.play("bump"),r.flashMood("surprised",800),pn(this.root,`${Kv[s.actor]}'s hands are empty! 👐`),await r.turnWiggle();break}case"condition":{this.bot(0).flashMood("thinking",800),this.deck.highlightSlot(s.index),this.sfx.play(s.ok?"loop":"tap"),this.deck.showCondBubble(s.index,s.kind==="flower"?"🌸":"🍄",s.ok),await En(.3/e);break}case"condSkip":this.deck.flashSkipped(s.index),this.sfx.play("tap"),await En(.18/e);break;case"loopStart":{this.deck.markLoopSource(this.blockIndices(s.index)),s.kind==="count"&&this.deck.showLoopBubble(s.index,0,s.count??"∞");break}case"loopIter":this.sfx.play("loop"),this.deck.showLoopBubble(s.index,s.iter,s.count??"∞"),await En(.1/e);break;case"loopEnd":this.deck.clearLoopBubble(),this.deck.clearRunningHighlight();break;case"loopOverflow":this.deck.clearLoopBubble();break;case"loopFail":pn(this.root,"That loop has nothing to repeat! ↻"),await En(.3);break}}faceDirection(t,e){t.look(e==="E"?"right":e==="W"?"left":e==="N"?"up":null)}celebrate(t){this.zip.celebrate(),this.bolt?.celebrate(),this.sfx.play("celebrate"),this.events.onSuccess?.();const e=["It Works!"];this.program.length<=this.level.par&&e.push("It Is Clever!");const n=this.program.some(a=>a.cmd==="repeat"||a.cmd==="repeatUntil"),s=this.program.some(a=>a.cmd==="ifFlower"||a.cmd==="ifMushroom"),r=this.program.some(a=>a.cmd==="swap");(this.level.bonusStar==="loop"?n:this.level.bonusStar==="condition"?s:this.level.bonusStar==="swap"?r:this.level.bonusStar==="rule"?this.runHadRuleFire:this.predictedSuccess===!0)&&e.push("It Is Creative!"),this.store.setStars(this.level.id,e.length),Wv(t,{stars:e.length,starNames:e,predictedCorrectly:this.predictedSuccess},this.sfx,{onReplay:()=>{this.topBar.setStars(e.length),this.rewind(),this.preview.update(this.program)},onContinue:()=>{this.topBar.setStars(e.length),this.events.hasNext?this.events.onNextLevel():this.events.onExit()}}),window.setTimeout(()=>this.flyStarsToPill(e.length),1900)}flyStarsToPill(t){const e=this.root.querySelector(".stars-pill");if(!e||t===0)return;const n=e.getBoundingClientRect(),s=window.innerWidth/2,r=window.innerHeight/2-60;for(let o=0;o<t;o++){const a=C("div","fly-star",document.body,"★");a.style.left=`${s+(o-1)*54}px`,a.style.top=`${r}px`,window.setTimeout(()=>{a.style.transform=`translate(${n.left+n.width/2-s-(o-1)*54}px, ${n.top+n.height/2-r}px) scale(.45)`,a.style.opacity="0.2"},60+o*140),window.setTimeout(()=>a.remove(),1e3+o*140)}window.setTimeout(()=>this.topBar.setStars(t),1100+t*140)}async mixyGlitch(t,e){this.sfx.play("glitch"),this.zip.setMood("thinking"),await this.mixy.glitchWobble(.7),Yv(t,e.events,this.sfx,{onScrub:n=>{const s=e.actorTrail[Math.min(n,e.actorTrail.length-1)];s&&s.actors.forEach((r,o)=>{const a=this.bot(o);a.placeAt(this.world.cellToWorld(r.col,r.row)),this.faceDirection(a,r.dir)})},onTryAgain:()=>{this.zip.setMood("idle"),this.rewind(),this.preview.update(this.program),pn(t,"Fix a step and BOP again! 💪")}})}dispose(){this.playAccum>0&&this.store.addPlaySeconds(this.playAccum),this.playAccum=0,this.disposers.forEach(t=>t()),this.disposers=[],this.zip?.dispose(),this.bolt?.dispose(),this.mixy?.dispose(),this.stage?.dispose(),this.root.innerHTML=""}}const Th=["moveUp","moveDown","moveLeft","moveRight","grab","drop"],t_={id:"sm-1",worldId:"sparkle-meadow",title:"World 1: Sparkle Meadow",shortTitle:"Berry Hello!",goalText:"Bring the fruit to our friend!",cols:4,rows:3,start:{col:0,row:0,dir:"E"},blocked:[{col:1,row:1},{col:0,row:2}],items:[{id:"strawberry",kind:"strawberry",col:2,row:0}],goals:[{col:3,row:2,accepts:"strawberry"}],availableCommands:Th,maxSlots:8,par:7,brief:{title:"Berry Hello!",text:"Zip is hungry for adventure! Use the arrow tiles to walk Zip to the strawberry, grab it, and bring it to the star pad.",emoji:"🍓"},prediction:{prompt:"What will Zip do with your plan?",choices:[{id:"deliver",emoji:"🍓",label:"Deliver the strawberry to the star pad!",correct:!0},{id:"oops",emoji:"🌳",label:"Get a little lost on the way…",correct:!1}]}},e_={id:"sm-2",worldId:"sparkle-meadow",title:"World 1: Sparkle Meadow",shortTitle:"Around the Bushes",goalText:"Zip around the bushes to deliver the berry!",cols:4,rows:3,start:{col:1,row:2,dir:"N"},blocked:[{col:0,row:1},{col:2,row:1}],items:[{id:"strawberry",kind:"strawberry",col:1,row:0}],goals:[{col:3,row:2,accepts:"strawberry"}],availableCommands:Th,maxSlots:10,par:8,brief:{title:"Around the Bushes",text:"The path is twistier this time. Plan your arrows carefully, helper!",emoji:"🌳"},prediction:{prompt:"Where will the strawberry end up?",choices:[{id:"deliver",emoji:"⭐",label:"Right on the star pad!",correct:!0},{id:"oops",emoji:"🫢",label:"Zip might bump a bush…",correct:!1}]}},n_=[t_,e_],i_={id:"bb-1",worldId:"bubble-bay",title:"World 2: Bubble Bay",shortTitle:"Loopy Dock",goalText:"Bring the pearl to the treasure chest!",cols:5,rows:3,start:{col:0,row:1,dir:"E"},blocked:[],items:[{id:"pearl",kind:"pearl",col:3,row:1}],goals:[{col:4,row:1,accepts:"pearl"}],availableCommands:["moveUp","moveDown","moveLeft","moveRight","grab","drop","repeat"],maxSlots:6,par:5,brief:{title:"Loopy Dock",text:"Meet the Repeat tile! It runs the commands above it again — three steps in one tap. Loop-de-loop!",emoji:"↻"},prediction:{prompt:"What will your loop do?",choices:[{id:"deliver",emoji:"🦪",label:"Zip zooms down the dock to the chest!",correct:!0},{id:"oops",emoji:"💦",label:"Zip might splash into the bay…",correct:!1}]}},s_={id:"bb-2",worldId:"bubble-bay",title:"World 2: Bubble Bay",shortTitle:"Pearl Parade",goalText:"Collect every pearl and reach the chest!",cols:5,rows:3,start:{col:0,row:1,dir:"E"},blocked:[],items:[{id:"pearl-1",kind:"pearl",col:1,row:1},{id:"pearl-2",kind:"pearl",col:2,row:1},{id:"pearl-3",kind:"pearl",col:3,row:1}],goals:[{col:4,row:1,accepts:"pearl"}],availableCommands:["moveUp","moveDown","moveLeft","moveRight","grab","drop","repeat"],maxSlots:6,par:5,brief:{title:"Pearl Parade",text:"Three pearls in a row! Repeat a step + grab block to scoop them all up like a pro looper.",emoji:"🫧"},prediction:{prompt:"How many pearls will Zip carry to the chest?",choices:[{id:"deliver",emoji:"😄",label:"All three — what a haul!",correct:!0},{id:"oops",emoji:"🥲",label:"Maybe just one…",correct:!1}]}},r_={id:"bb-3",worldId:"bubble-bay",title:"World 2: Bubble Bay",shortTitle:"Until You Get There",goalText:"Loop until the pearl, then to the chest!",cols:5,rows:3,start:{col:0,row:0,dir:"E"},blocked:[],items:[{id:"pearl",kind:"pearl",col:3,row:0}],goals:[{col:4,row:0,accepts:"pearl"}],availableCommands:["moveUp","moveDown","moveLeft","moveRight","grab","drop","repeat","repeatUntil"],maxSlots:6,par:5,brief:{title:"Until You Get There",text:"The Until tile loops your step + grab block and stops all by itself when the pearl is scooped. Magic!",emoji:"🔁"},prediction:{prompt:"When will the Until loop stop?",choices:[{id:"deliver",emoji:"🦪",label:"Right at the pearl — smart loop!",correct:!0},{id:"oops",emoji:"🌀",label:"It might loop forever…",correct:!1}]}},o_={id:"bb-debug",worldId:"bubble-bay",title:"World 2: Bubble Bay",shortTitle:"Copycat’s Oopsie",goalText:"Fix Copycat’s loop so Zip stops at the pearl!",cols:4,rows:3,start:{col:0,row:1,dir:"E"},blocked:[],items:[{id:"pearl",kind:"pearl",col:2,row:1}],goals:[{col:3,row:1,accepts:"pearl"}],availableCommands:["moveUp","moveDown","moveLeft","moveRight","grab","drop","repeat"],maxSlots:5,par:5,prefill:[{cmd:"moveRight"},{cmd:"repeat",arg:4},{cmd:"grab"},{cmd:"moveRight"},{cmd:"drop"}],brief:{title:"Copycat’s Oopsie",text:"Copycat copied the loop one time too many — Zip splashes off the dock! Tap the ↻ badge to fix the count, then BOP!",emoji:"🐾"},prediction:{prompt:"Did the fix work?",choices:[{id:"deliver",emoji:"🎉",label:"Perfect loop — pearl delivered!",correct:!0},{id:"oops",emoji:"💦",label:"Still splashy…",correct:!1}]}},a_={id:"bb-creative",worldId:"bubble-bay",title:"World 2: Bubble Bay",shortTitle:"Loop Lagoon",goalText:"Deliver the pearl YOUR way — loops earn a bonus star!",cols:5,rows:3,start:{col:0,row:2,dir:"E"},blocked:[{col:2,row:1}],items:[{id:"pearl",kind:"pearl",col:2,row:2}],goals:[{col:4,row:0,accepts:"pearl"}],availableCommands:["moveUp","moveDown","moveLeft","moveRight","grab","drop","repeat","repeatUntil"],maxSlots:10,par:9,bonusStar:"loop",brief:{title:"Loop Lagoon",text:"A whole lagoon to play in! Deliver the pearl any way you like — use a loop tile for a bonus star.",emoji:"🌊"},prediction:{prompt:"What’s your master plan?",choices:[{id:"deliver",emoji:"🏆",label:"Pearl to the chest, easy!",correct:!0},{id:"oops",emoji:"🤔",label:"Let’s see what happens…",correct:!1}]}},l_=[i_,s_,r_,o_,a_],Ds=["moveUp","moveDown","moveLeft","moveRight","grab","drop"],c_={id:"pf-1",worldId:"pattern-forest",title:"World 3: Pattern Forest",shortTitle:"If You See a Flower",goalText:"Pick the flower for the fairy ring!",cols:5,rows:3,start:{col:0,row:1,dir:"E"},blocked:[],items:[{id:"flower",kind:"flower",col:2,row:1}],goals:[{col:4,row:1,accepts:"flower"}],availableCommands:[...Ds,"ifFlower"],maxSlots:8,par:7,brief:{title:"If You See a Flower",text:'New tile! 🌸 IF checks the tile Zip stands on: "If there IS a flower, do the next tile!" Try it: walk, IF 🌸, grab!',emoji:"🌸"},prediction:{prompt:"What happens at the IF tile?",choices:[{id:"deliver",emoji:"🌸",label:"Zip sees a flower and grabs it!",correct:!0},{id:"oops",emoji:"🙈",label:"Zip walks right past it…",correct:!1}]}},h_={id:"pf-2",worldId:"pattern-forest",title:"World 3: Pattern Forest",shortTitle:"Mushroom Mix-Up",goalText:"Only flowers for the fairy ring — yuck mushrooms!",cols:5,rows:3,start:{col:0,row:1,dir:"E"},blocked:[],items:[{id:"mushroom-1",kind:"mushroom",col:1,row:1},{id:"flower",kind:"flower",col:2,row:1},{id:"mushroom-2",kind:"mushroom",col:3,row:1}],goals:[{col:4,row:1,accepts:"flower"}],availableCommands:[...Ds,"ifFlower"],maxSlots:12,par:9,brief:{title:"Mushroom Mix-Up",text:"Yucky mushrooms spoil the fairy ring! Tiptoe past them: step, IF 🌸, grab — the IF tile skips the grab when it sees a mushroom.",emoji:"🍄"},prediction:{prompt:"What lands on the fairy ring?",choices:[{id:"deliver",emoji:"🌸",label:"Just the pretty flower!",correct:!0},{id:"oops",emoji:"🍄",label:"A yucky mushroom — oh no!",correct:!1}]}},d_={id:"pf-3",worldId:"pattern-forest",title:"World 3: Pattern Forest",shortTitle:"Firefly Rows",goalText:"Gather both flowers for the ring!",cols:6,rows:3,start:{col:0,row:1,dir:"E"},blocked:[],items:[{id:"flower-1",kind:"flower",col:1,row:1},{id:"mushroom-1",kind:"mushroom",col:2,row:1},{id:"flower-2",kind:"flower",col:3,row:1},{id:"mushroom-2",kind:"mushroom",col:4,row:1}],goals:[{col:5,row:1,accepts:"flower"}],availableCommands:[...Ds,"ifFlower","repeat"],maxSlots:8,par:6,brief:{title:"Firefly Rows",text:"A long row of flowers AND mushrooms! Loop your pattern — step, IF 🌸, grab, Repeat ×4 — and watch Zip pick perfectly, every time.",emoji:"✨"},prediction:{prompt:"What does your pattern collect?",choices:[{id:"deliver",emoji:"🌸🌸",label:"Both flowers, zero mushrooms!",correct:!0},{id:"oops",emoji:"🍄",label:"Something yucky sneaks in…",correct:!1}]}},u_={id:"pf-debug",worldId:"pattern-forest",title:"World 3: Pattern Forest",shortTitle:"Copycat’s Poison Ring",goalText:"Fix the plan so only flowers reach the ring!",cols:6,rows:3,start:{col:0,row:1,dir:"E"},blocked:[],items:[{id:"flower-1",kind:"flower",col:1,row:1},{id:"mushroom-1",kind:"mushroom",col:2,row:1},{id:"flower-2",kind:"flower",col:3,row:1},{id:"mushroom-2",kind:"mushroom",col:4,row:1}],goals:[{col:5,row:1,accepts:"flower"}],availableCommands:[...Ds,"ifFlower","repeat"],maxSlots:8,par:6,prefill:[{cmd:"moveRight"},{cmd:"grab"},{cmd:"repeat",arg:4},{cmd:"moveRight"},{cmd:"drop"}],brief:{title:"Copycat’s Poison Ring",text:"Copycat grabbed EVERYTHING — even the yucky mushrooms! Clear the plan and rebuild it with an IF 🌸 before the grab.",emoji:"🐾"},prediction:{prompt:"Did your fix save the ring?",choices:[{id:"deliver",emoji:"🎉",label:"Only flowers — the ring is happy!",correct:!0},{id:"oops",emoji:"🍄",label:"Still a little yucky…",correct:!1}]}},f_={id:"pf-creative",worldId:"pattern-forest",title:"World 3: Pattern Forest",shortTitle:"Grove of Wonders",goalText:"Fill BOTH fairy rings — IF tiles earn a bonus star!",cols:6,rows:3,start:{col:0,row:1,dir:"E"},blocked:[],items:[{id:"mushroom-1",kind:"mushroom",col:2,row:0},{id:"flower-1",kind:"flower",col:3,row:1},{id:"mushroom-2",kind:"mushroom",col:2,row:2},{id:"mushroom-3",kind:"mushroom",col:4,row:1},{id:"flower-2",kind:"flower",col:4,row:2}],goals:[{col:5,row:1,accepts:"flower"},{col:5,row:2,accepts:"flower"}],availableCommands:[...Ds,"ifFlower","ifMushroom","repeat","repeatUntil"],maxSlots:14,par:13,bonusStar:"condition",brief:{title:"Grove of Wonders",text:"A whole glowing grove to explore! Two fairy rings are hungry for flowers. Any plan works — IF tiles make it elegant.",emoji:"🌳"},prediction:{prompt:"Will both rings get their flowers?",choices:[{id:"deliver",emoji:"🏆",label:"Two happy rings, coming up!",correct:!0},{id:"oops",emoji:"🤔",label:"Let’s see what happens…",correct:!1}]}},p_=[c_,h_,d_,u_,f_],Us=["moveUp","moveDown","moveLeft","moveRight","grab","drop","swap"],m_={id:"rt-1",worldId:"robot-town",title:"World 4: Robot Town",shortTitle:"Two Little Helpers",goalText:"Both batteries to their charging pads!",cols:6,rows:3,start:{col:0,row:1,dir:"E"},botStart:{col:3,row:1,dir:"E"},blocked:[],items:[{id:"battery-a",kind:"battery",col:1,row:1},{id:"battery-b",kind:"battery",col:4,row:1}],goals:[{col:2,row:1,accepts:"battery"},{col:5,row:1,accepts:"battery"}],availableCommands:Us,maxSlots:10,par:9,brief:{title:"Two Little Helpers",text:"Meet Bolt the robot! The 👥 Swap tile switches who listens: plan Zip’s delivery, tap Swap, then plan Bolt’s!",emoji:"🤖"},prediction:{prompt:"How many batteries get charged?",choices:[{id:"deliver",emoji:"🔋🔋",label:"Both — teamwork makes the dream work!",correct:!0},{id:"oops",emoji:"🔋",label:"Maybe only one…",correct:!1}]}},g_={id:"rt-2",worldId:"robot-town",title:"World 4: Robot Town",shortTitle:"Battery Boulevards",goalText:"Charge both pads across the boulevards!",cols:6,rows:3,start:{col:0,row:2,dir:"N"},botStart:{col:5,row:2,dir:"N"},blocked:[{col:1,row:1},{col:4,row:1}],items:[{id:"battery-a",kind:"battery",col:0,row:0},{id:"battery-b",kind:"battery",col:5,row:0}],goals:[{col:2,row:0,accepts:"battery"},{col:3,row:0,accepts:"battery"}],availableCommands:Us,maxSlots:14,par:13,brief:{title:"Battery Boulevards",text:"Zip takes the left side, Bolt takes the right. Watch the pipes — and don’t forget who’s listening after a Swap!",emoji:"🏙️"},prediction:{prompt:"Both pads humming?",choices:[{id:"deliver",emoji:"⚡",label:"Fully charged, both of them!",correct:!0},{id:"oops",emoji:"🪫",label:"Someone ends up powerless…",correct:!1}]}},v_={id:"rt-3",worldId:"robot-town",title:"World 4: Robot Town",shortTitle:"Charge Together",goalText:"Loop both bots to their pads!",cols:6,rows:3,start:{col:0,row:1,dir:"E"},botStart:{col:4,row:2,dir:"W"},blocked:[],items:[{id:"battery-a",kind:"battery",col:2,row:1},{id:"battery-b",kind:"battery",col:3,row:2}],goals:[{col:4,row:1,accepts:"battery"},{col:1,row:2,accepts:"battery"}],availableCommands:[...Us,"repeat"],maxSlots:12,par:12,brief:{title:"Charge Together",text:"Zip loops east, Bolt loops west. Repeat tiles work for both of them — one plan, two happy bots!",emoji:"⚡"},prediction:{prompt:"How do the loops go?",choices:[{id:"deliver",emoji:"🎉",label:"Zip zips east, Bolt bolts west!",correct:!0},{id:"oops",emoji:"🌀",label:"Loopy confusion ahead…",correct:!1}]}},__={id:"rt-debug",worldId:"robot-town",title:"World 4: Robot Town",shortTitle:"Bolt’s Glass Garden",goalText:"Fix the plan — only Bolt rolls under glass!",cols:3,rows:3,start:{col:0,row:1,dir:"E"},botStart:{col:0,row:2,dir:"E"},blocked:[],zipBlocked:[{col:2,row:2}],items:[{id:"battery-a",kind:"battery",col:1,row:1},{id:"battery-b",kind:"battery",col:1,row:2}],goals:[{col:2,row:1,accepts:"battery"},{col:2,row:2,accepts:"battery"}],availableCommands:Us,maxSlots:10,par:9,prefill:[{cmd:"moveRight"},{cmd:"grab"},{cmd:"moveRight"},{cmd:"drop"},{cmd:"moveDown"},{cmd:"moveLeft"},{cmd:"grab"},{cmd:"moveRight"},{cmd:"drop"}],brief:{title:"Bolt’s Glass Garden",text:"Copycat sent ZIP under the glass dome — bonk! Only Bolt fits. Fix it: Swap to Bolt before the second delivery!",emoji:"🐾"},prediction:{prompt:"Did the Swap save the day?",choices:[{id:"deliver",emoji:"🎉",label:"Bolt rolls under the glass — done!",correct:!0},{id:"oops",emoji:"🔔",label:"Still bonking the dome…",correct:!1}]}},x_={id:"rt-creative",worldId:"robot-town",title:"World 4: Robot Town",shortTitle:"Teamwork Towers",goalText:"Charge both towers your way — Swap earns a bonus star!",cols:6,rows:3,start:{col:0,row:1,dir:"E"},botStart:{col:3,row:1,dir:"E"},blocked:[],zipBlocked:[{col:5,row:2}],items:[{id:"battery-a",kind:"battery",col:1,row:0},{id:"battery-b",kind:"battery",col:4,row:2}],goals:[{col:5,row:0,accepts:"battery"},{col:5,row:2,accepts:"battery"}],availableCommands:[...Us,"repeat"],maxSlots:14,par:13,bonusStar:"swap",brief:{title:"Teamwork Towers",text:"Two towers need power — one hides under glass. Split the work between Zip and Bolt however you like!",emoji:"🗼"},prediction:{prompt:"Will the towers light up?",choices:[{id:"deliver",emoji:"🏆",label:"Both towers glowing tonight!",correct:!0},{id:"oops",emoji:"🤔",label:"Let’s see what happens…",correct:!1}]}},y_=[m_,g_,v_,__,x_],Ns=["moveUp","moveDown","moveLeft","moveRight","grab","drop"],b_={id:"aa-1",worldId:"agent-academy",title:"World 5: Agent Academy",shortTitle:"Meet the Rule",goalText:"Collect every badge for the trophy!",cols:5,rows:3,start:{col:0,row:1,dir:"E"},blocked:[],items:[{id:"badge-1",kind:"badge",col:1,row:1},{id:"badge-2",kind:"badge",col:2,row:1},{id:"badge-3",kind:"badge",col:3,row:1}],goals:[{col:4,row:1,accepts:"badge"}],availableCommands:[...Ns,"repeat"],maxSlots:8,par:5,collectAll:!0,ruleChoices:[{trigger:"badge",action:"grab"}],brief:{title:"Meet the Rule",text:"Your first HELPER RULE! “WHEN you step on a badge 🎖️ → grab it.” It works all by itself — just walk Zip to the trophy and drop!",emoji:"🎖️"},prediction:{prompt:"What does the helper rule do?",choices:[{id:"deliver",emoji:"🎖️",label:"Grabs every badge as Zip walks by!",correct:!0},{id:"oops",emoji:"💤",label:"Nothing — rules are sleepy…",correct:!1}]}},M_={id:"aa-2",worldId:"agent-academy",title:"World 5: Agent Academy",shortTitle:"Pick the Right Rule",goalText:"Badges only — mushrooms spoil the trophy!",cols:5,rows:3,start:{col:0,row:1,dir:"E"},blocked:[],items:[{id:"badge-1",kind:"badge",col:1,row:1},{id:"mushroom-1",kind:"mushroom",col:2,row:1},{id:"badge-2",kind:"badge",col:3,row:1}],goals:[{col:4,row:1,accepts:"badge"}],availableCommands:[...Ns,"repeat"],maxSlots:8,par:5,collectAll:!0,ruleChoices:[{trigger:"badge",action:"grab"},{trigger:"mushroom",action:"grab"}],brief:{title:"Pick the Right Rule",text:"Two rules to choose from! “Grab badges 🎖️” or “Grab mushrooms 🍄”? Choose wisely — the trophy only loves badges.",emoji:"🤔"},prediction:{prompt:"With the badge rule, what reaches the trophy?",choices:[{id:"deliver",emoji:"🏆",label:"Only shiny badges!",correct:!0},{id:"oops",emoji:"🍄",label:"A sneaky mushroom…",correct:!1}]}},w_={id:"aa-3",worldId:"agent-academy",title:"World 5: Agent Academy",shortTitle:"Campus Laps",goalText:"Lap the track, collect the badges!",cols:6,rows:3,start:{col:0,row:0,dir:"E"},blocked:[],items:[{id:"badge-1",kind:"badge",col:1,row:0},{id:"mushroom-1",kind:"mushroom",col:2,row:0},{id:"badge-2",kind:"badge",col:3,row:0},{id:"mushroom-2",kind:"mushroom",col:4,row:0},{id:"badge-3",kind:"badge",col:5,row:0}],goals:[{col:5,row:2,accepts:"badge"}],availableCommands:[...Ns,"repeat"],maxSlots:8,par:6,collectAll:!0,ruleChoices:[{trigger:"badge",action:"grab"},{trigger:"mushroom",action:"grab"}],brief:{title:"Campus Laps",text:"Badges AND mushrooms line the track. Your rule picks perfectly every lap — loop the walk and glide down to the trophy!",emoji:"🏟️"},prediction:{prompt:"How does the lap go?",choices:[{id:"deliver",emoji:"🎖️🎖️🎖️",label:"Three badges, zero mushrooms!",correct:!0},{id:"oops",emoji:"🍄",label:"Something yucky tags along…",correct:!1}]}},S_={id:"aa-debug",worldId:"agent-academy",title:"World 5: Agent Academy",shortTitle:"Copycat’s Blind Grab",goalText:"Fix the plan — let the rule do the work!",cols:5,rows:3,start:{col:0,row:1,dir:"E"},blocked:[],items:[{id:"badge-1",kind:"badge",col:1,row:1},{id:"mushroom-1",kind:"mushroom",col:2,row:1},{id:"badge-2",kind:"badge",col:3,row:1}],goals:[{col:4,row:1,accepts:"badge"}],availableCommands:[...Ns,"repeat"],maxSlots:8,par:5,collectAll:!0,ruleChoices:[{trigger:"badge",action:"grab"}],prefill:[{cmd:"moveRight"},{cmd:"grab"},{cmd:"repeat",arg:3},{cmd:"moveRight"},{cmd:"drop"}],brief:{title:"Copycat’s Blind Grab",text:"Copycat grabs EVERYTHING — even the mushroom! Secret: your helper rule grabs badges for you. Take the grab tile OUT and let the rule shine!",emoji:"🐾"},prediction:{prompt:"Did the rule save the trophy?",choices:[{id:"deliver",emoji:"🎉",label:"Badges only — shiny and clean!",correct:!0},{id:"oops",emoji:"🍄",label:"Still a bit yucky…",correct:!1}]}},E_={id:"aa-creative",worldId:"agent-academy",title:"World 5: Agent Academy",shortTitle:"Academy Finals",goalText:"Collect every badge — fire your rule for a bonus star!",cols:6,rows:3,start:{col:0,row:0,dir:"E"},blocked:[{col:2,row:1}],items:[{id:"badge-1",kind:"badge",col:1,row:0},{id:"mushroom-1",kind:"mushroom",col:2,row:0},{id:"badge-2",kind:"badge",col:3,row:0},{id:"badge-3",kind:"badge",col:5,row:0},{id:"badge-4",kind:"badge",col:4,row:2},{id:"mushroom-2",kind:"mushroom",col:3,row:2},{id:"badge-5",kind:"badge",col:2,row:2}],goals:[{col:5,row:2,accepts:"badge"}],availableCommands:[...Ns,"repeat"],maxSlots:12,par:11,collectAll:!0,bonusStar:"rule",ruleChoices:[{trigger:"badge",action:"grab"},{trigger:"mushroom",action:"grab"}],brief:{title:"Academy Finals",text:"The big exam! Badges hide all over campus. Plan your route, loop it, and let your rule scoop them all for the trophy!",emoji:"🏆"},prediction:{prompt:"Graduation day — do you pass?",choices:[{id:"deliver",emoji:"🎓",label:"Every badge on the trophy!",correct:!0},{id:"oops",emoji:"📚",label:"Back to studying…",correct:!1}]}},T_=[b_,M_,w_,S_,E_],hn=[...n_,...l_,...p_,...y_,...T_],Xa="codebops.custom.v1";function Hr(){try{const i=localStorage.getItem(Xa);if(!i)return[];const t=JSON.parse(i);return Array.isArray(t)?t:[]}catch{return[]}}function A_(i){const t=Hr().filter(e=>e.id!==i.id);t.push(i);try{localStorage.setItem(Xa,JSON.stringify(t))}catch{}}function C_(i){try{localStorage.setItem(Xa,JSON.stringify(Hr().filter(t=>t.id!==i)))}catch{}}function R_(i,t,e,n,s){return{id:`custom-${Date.now()}`,worldId:"sparkle-meadow",title:"Imagination Island",shortTitle:i,goalText:"Deliver every berry to a star pad!",cols:5,rows:3,start:{...t,dir:"E"},blocked:e,items:n.map((r,o)=>({id:`strawberry-${o+1}`,kind:"strawberry",...r})),goals:s.map(r=>({...r,accepts:"strawberry"})),availableCommands:["moveUp","moveDown","moveLeft","moveRight","grab","drop"],maxSlots:12,par:12,brief:{title:i,text:"A level built by YOU! Guide Zip to every berry and stack them on the star pads.",emoji:"🏝️"},prediction:{prompt:"Will your creation work?",choices:[{id:"deliver",emoji:"🏆",label:"Every berry delivered!",correct:!0},{id:"oops",emoji:"🤔",label:"Let’s see what happens…",correct:!1}]}}}const gc=["🌸","🌼","🌷","🌻","🌹","💐","🪻","🌺"];function P_(i){let t=i>>>0;return()=>{t|=0,t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}class L_{constructor(t,e,n){this.root=t,this.store=e,this.events=n}stops=[];sfx=fn;enter(){const t=this.root;t.classList.add("garden-screen"),C("div","garden-sky",t),C("div","garden-hill",t);const e=C("div","garden-header",t),n=C("button","circle-btn",e,"←");n.type="button",n.setAttribute("aria-label","Back"),n.addEventListener("click",()=>this.events.onBack()),C("h1",void 0,e,"Bop Garden");const s=Object.values(this.store.stars).reduce((d,u)=>d+u,0),r=this.store.daily.totalCompleted;C("div","garden-count",e,`🌼 ${s+r} flowers`);const o=C("div","garden-mascot zip",t);Es(o,"./art/characters/zip/zip.svg").then(d=>{d&&this.stops.push(Ur(d))});const a=C("div","garden-mascot mixy",t);Es(a,"./art/characters/mixy/mixy.svg").then(d=>{d&&this.stops.push(Ur(d))});const l=C("div","garden-field",t),c=Math.min(s+r,64);c===0&&C("div","garden-empty",l,"Earn stars to plant your first flower! 🌱");const h=P_(42);for(let d=0;d<c;d++){const u=d>=s,f=C("button",`garden-flower${u?" golden":""}`,l,u?"🌻":gc[Math.floor(h()*gc.length)]);f.type="button",f.setAttribute("aria-label",u?"Golden daily flower":"Star flower"),f.style.left=`${4+h()*92}%`,f.style.top=`${46+h()*48}%`,f.style.fontSize=`${26+h()*22}px`,f.style.animationDelay=`${h()*2.4}s`,f.addEventListener("click",()=>{this.sfx.play("grab"),f.classList.remove("pop"),f.offsetWidth,f.classList.add("pop")})}C("div","garden-note",t,s>0?`⭐ ${s} star flowers  ·  🌻 ${r} daily flowers`:"Play levels to grow your garden!")}dispose(){this.stops.forEach(t=>t()),this.stops=[]}}const Li=5,Ii=3,Lo=["empty","item","goal","blocked","start"],I_={empty:"",item:"🍓",goal:"⭐",blocked:"🌳",start:"🐰"},D_={empty:"tap to place a berry 🍓",item:"a berry! next: a star pad ⭐",goal:"a star pad! next: a bush 🌳",blocked:"a bush! next: Zip’s start 🐰",start:"Zip starts here! next: clear the tile"};class U_{constructor(t,e){this.root=t,this.events=e,this.cells=Array.from({length:Ii},()=>Array(Li).fill("empty")),this.cells[1][0]="start",this.cells[1][2]="item",this.cells[1][4]="goal"}cells=[];cellEls=[];sfx=fn;buildLevel(){let t=null;const e=[],n=[],s=[];for(let o=0;o<Ii;o++)for(let a=0;a<Li;a++){const l=this.cells[o][a];l==="start"&&(t={col:a,row:o}),l==="blocked"&&e.push({col:a,row:o}),l==="item"&&n.push({col:a,row:o}),l==="goal"&&s.push({col:a,row:o})}if(!t)return{error:"Place Zip’s start tile 🐰 first!"};if(n.length===0)return{error:"Add at least one berry 🍓 to collect!"};if(s.length===0)return{error:"Add a star pad ⭐ to deliver to!"};const r=this.cells.flat().filter(o=>o!=="empty").length;return{level:R_(`My Island #${r}`,t,e,n,s)}}enter(){const t=this.root;t.classList.add("editor-screen");const e=C("div","select-header editor-header",t),n=C("button","circle-btn",e,"←");n.type="button",n.setAttribute("aria-label","Back to levels"),n.addEventListener("click",()=>this.events.onBack()),C("h1",void 0,e,"🏝️ Imagination Island"),C("div","editor-tip",t,"Tap a tile to change what lives there!");const s=C("div","editor-grid",t);for(let h=0;h<Ii;h++){const d=C("div","editor-row",s);this.cellEls[h]=[];for(let u=0;u<Li;u++){const f=C("button","editor-cell",d);f.type="button",f.setAttribute("aria-label",`Tile ${u+1},${h+1}`),f.addEventListener("click",()=>this.cycleCell(h,u,f)),this.cellEls[h][u]=f,this.paintCell(h,u)}}const r=C("div","editor-hint",t,""),o=C("div","editor-actions",t),a=C("button","mini-btn",o,"🧹 Clear");a.type="button",a.addEventListener("click",()=>{this.cells=Array.from({length:Ii},()=>Array(Li).fill("empty")),this.cells[1][0]="start";for(let h=0;h<Ii;h++)for(let d=0;d<Li;d++)this.paintCell(h,d);this.sfx.play("tap")});const l=C("button","mini-btn",o,"💾 Save");l.type="button",l.addEventListener("click",()=>{const{level:h,error:d}=this.buildLevel();if(d||!h){pn(t,`Oops — ${d}`),this.sfx.play("bump");return}A_(h),this.sfx.play("celebrate"),pn(t,"Saved! Find it on Imagination Island 💾"),this.events.onSaved()});const c=C("button","bop-btn editor-play",o);c.type="button",c.append("TEST IT!"),C("span","tri",c),c.addEventListener("click",()=>{const{level:h,error:d}=this.buildLevel();if(d||!h){pn(t,`Oops — ${d}`),this.sfx.play("bump");return}this.events.onPlay(h)}),this.hintEl=r}hintEl=null;cycleCell(t,e,n){const s=this.cells[t][e],r=Lo[(Lo.indexOf(s)+1)%Lo.length];if(r==="start")for(let o=0;o<Ii;o++)for(let a=0;a<Li;a++)this.cells[o][a]==="start"&&(this.cells[o][a]="empty",this.paintCell(o,a));this.cells[t][e]=r,this.paintCell(t,e),this.sfx.play("tap"),n.classList.remove("pop"),n.offsetWidth,n.classList.add("pop"),this.hintEl&&(this.hintEl.textContent=D_[r])}paintCell(t,e){const n=this.cellEls[t][e];if(!n)return;const s=this.cells[t][e];n.dataset.kind=s,n.textContent=I_[s]}dispose(){}}function N_(i,t,e,n){const s=t*Math.PI/180;return{id:i,pitchDeg:t,viewDir:{x:0,y:Math.sin(s),z:Math.cos(s)},fovFor:r=>r>=1.2?e:r>=.9?e+4:n}}const F_={bench:N_("bench",14,30,40)},vc=new Map;function O_(i,t,e=.22){const n=`${i}:${t}:${e}`,s=vc.get(n);if(s)return s;const r=t*.22,o=t-r,a=new Ji,l=i*4;for(let d=0;d<=l;d++){const f=d/l*Math.PI*2,g=d%4,x=g===0?o:g===1||g===2?t:o,m=Math.cos(f)*x,p=Math.sin(f)*x;d===0?a.moveTo(m,p):a.lineTo(m,p)}a.closePath();const c=new va;c.absarc(0,0,t*.18,0,Math.PI*2,!0),a.holes.push(c);const h=new Is(a,{depth:e,bevelEnabled:!0,bevelThickness:.035,bevelSize:.035,bevelSegments:2});return h.center(),vc.set(n,h),h}function _c(i={}){const{teeth:t=10,radius:e=.7,color:n="#ff9f2e",hubColor:s="#fff2d9"}=i,r=new St,o=new jt(O_(t,e),ft(n));o.castShadow=o.receiveShadow=!0,o.name="gearBody",r.add(o);const a=new jt(new kt(e*.3,e*.3,.3,20),ft(s));a.rotation.x=Math.PI/2,a.castShadow=!0,r.add(a);const l=new jt(new kt(e*.085,e*.085,.06,10),ft("#16225c"));return l.rotation.x=Math.PI/2,l.position.set(0,e*.55,.17),r.add(l),r}function ie(i,t,e=0,n=0,s=0,r=!0,o=!0){const a=new jt(i,t);return a.position.set(e,n,s),a.castShadow=r,a.receiveShadow=o,a}function B_(){const t=document.createElement("canvas");t.width=t.height=256;const e=t.getContext("2d");e.fillStyle="#3a55b8",e.fillRect(0,0,256,256),e.strokeStyle="rgba(22,30,80,0.45)",e.lineWidth=5;for(let s=0;s<=2;s++)e.beginPath(),e.moveTo(0,s*128),e.lineTo(256,s*128),e.stroke(),e.beginPath(),e.moveTo(s*128,0),e.lineTo(s*128,256),e.stroke();e.fillStyle="rgba(255,255,255,0.05)",e.fillRect(6,6,116,56),e.fillRect(134,134,116,56);const n=new Ls(t);return n.wrapS=n.wrapT=Wi,n.repeat.set(7,5),n.colorSpace=Pe,n}function k_(){const e=document.createElement("canvas");e.width=256,e.height=128;const n=e.getContext("2d");n.fillStyle="#2c3f8f",n.fillRect(0,0,256,128);const s=62,r=28,o=6;for(let l=0;l<4;l++){const c=l%2===0?0:-34;for(let h=-1;h<5;h++){const d=c+h*(s+o)+o/2,u=l*(r+o)+o/2;n.fillStyle=(l+h)%3===0?"#4a72dd":"#4168d2",n.beginPath(),n.roundRect(d,u,s,r,5),n.fill(),n.fillStyle="rgba(255,255,255,0.14)",n.beginPath(),n.roundRect(d+3,u+3,s-6,8,4),n.fill()}}const a=new Ls(e);return a.wrapS=a.wrapT=Wi,a.repeat.set(6,4),a.colorSpace=Pe,a}function xc(){const e=document.createElement("canvas");e.width=256,e.height=128;const n=e.getContext("2d");n.fillStyle="#1d2f7d",n.fillRect(0,0,256,128),n.strokeStyle="rgba(127,196,255,0.75)",n.lineWidth=3;const s=(o,a,l,c)=>{n.beginPath(),n.arc(o,a,l,0,Math.PI*2),n.stroke(),n.beginPath(),n.arc(o,a,l*.35,0,Math.PI*2),n.stroke();for(let h=0;h<c;h++){const d=h/c*Math.PI*2;n.beginPath(),n.moveTo(o+Math.cos(d)*l,a+Math.sin(d)*l),n.lineTo(o+Math.cos(d)*(l+7),a+Math.sin(d)*(l+7)),n.stroke()}};s(52,62,26,8),s(120,50,18,7),s(180,74,30,9),n.beginPath(),n.arc(228,84,6,0,Math.PI*2),n.stroke(),n.beginPath(),n.moveTo(234,84),n.lineTo(234,48),n.lineTo(246,52),n.stroke();const r=new Ls(e);return r.colorSpace=Pe,r}class z_{group=new St;spinners=[];lampGlows=[];constructor(){this.group.name="gearworks-garage";const t=ie(new fe(30,.5,18),new we({map:B_()}),0,-.25,2,!1,!0);this.group.add(t);const e=ie(new fe(30,10,.5),new we({map:k_()}),0,5,-6.5,!1,!0);this.group.add(e),this.group.add(ie(new ge(30,2.2,.7,2,.1),ft("#1b2664"),0,1,-6.35,!1,!0)),this.group.add(ie(new fe(30,.28,.75),ft("#39406e"),0,2.2,-6.3,!1,!1));const n=ie(new fe(5.4,2.7,.12),new we({map:xc()}),-1.2,6.2,-6.2,!1,!1);this.group.add(n),this.group.add(ie(new ge(5.8,3.1,.1,2,.05),ft("#c9a45c"),-1.2,6.2,-6.26,!1,!1));const s=ie(new fe(3.4,1.9,.12),new we({map:xc()}),9.4,6,-6.2,!1,!1);s.rotation.z=-.03,this.group.add(s);const r=ie(new ge(4.6,3,.2,2,.08),ft("#d9a45c"),-8.6,5.9,-6.2,!1,!1);this.group.add(r);const o=ft("#aab3c8"),a=new St;a.add(ie(new ge(.3,1.5,.14,1,.06),o,0,0,0,!1,!1)),a.add(ie(new Xe(.3,.12,8,14,Math.PI*1.4),o,0,.85,0,!1,!1)),a.position.set(-9.6,5.9,-6.05),a.rotation.z=.2,this.group.add(a);for(const[_,v]of[[-.2,"#e05a3a"],[.6,"#8b4ddb"]]){const P=new St;P.add(ie(new kt(.07,.07,1,8),o,0,-.3,0,!1,!1)),P.add(ie(new ge(.26,.7,.2,1,.08),ft(v),0,.45,0,!1,!1)),P.position.set(-8+_,5.9,-6.05),this.group.add(P)}for(const _ of[-6.5,6.5]){const v=new St;v.add(ie(new kt(.06,.06,3.6,6),ft("#39406e"),0,7.4,0,!1,!1));const P=ie(new sn(.9,.8,18,1,!0),ft("#2e7ce6"),0,5.4,0,!1,!1);v.add(P);const T=ie(new Jt(.3,12,8),new we({color:"#ffe9a8",emissive:"#ffd23e",emissiveIntensity:1.1}),0,5.15,0,!1,!1);v.add(T),this.lampGlows.push(T);const E=new Xu("#ffd9a0",14,12,2);E.position.set(0,4.9,.6),v.add(E),v.position.set(_,0,-3.5),this.group.add(v)}const l=new St;l.add(ie(new ge(13.5,.7,5.2,3,.18),ft("#d9a45c"),0,1.55,0)),l.add(ie(new ge(13.9,.32,5.6,2,.12),ft("#39406e"),0,1.15,0));for(const[_,v]of[[-6.2,-2.1],[6.2,-2.1],[-6.2,2.1],[6.2,2.1]])l.add(ie(new ge(.55,1.2,.55,1,.1),ft("#2c3f8f"),_,.55,v));l.position.set(0,0,-1.5),this.group.add(l);const c=1.9,h=new St;h.add(ie(new ge(1.7,1.3,1.2,3,.22),ft("#2f6fe0"),0,.75,0)),h.add(ie(new kt(.5,.55,.5,16),ft("#4a8cf0"),0,1.55,0,!0,!1));const d=ie(new kt(.18,.18,.8,12),ft("#aab3c8"),1.05,.75,0);d.rotation.z=Math.PI/2,h.add(d),h.add(ie(new ge(2,.24,1.5,1,.1),ft("#1b2664"),0,.06,0));const u=new Ji;u.moveTo(.09,.3),u.lineTo(-.12,-.02),u.lineTo(0,-.02),u.lineTo(-.09,-.3),u.lineTo(.14,.06),u.lineTo(.02,.06),u.closePath();const f=new jt(new Is(u,{depth:.05,bevelEnabled:!1}),ft("#ffd23e"));f.scale.setScalar(1.4),f.position.set(0,.8,.63),h.add(f),h.position.set(-4.6,c,-1.5),this.group.add(h);const g=[[-2.2,"#ff9f2e",.72,1],[-.6,"#57c14e",.62,-1],[.9,"#a06bff",.78,1]];for(const[_,v,P,T]of g){const E=ie(new ge(.34,1.1,.5,1,.08),ft("#39406e"),_,c+.55,-1.72);this.group.add(E);const R=_c({color:v,radius:P,teeth:Math.round(P*14)});R.position.set(_,c+1.15,-1.4),this.group.add(R),this.spinners.push({node:R,speed:T*.6*(.7/P)})}const x=new St;x.add(ie(new ge(.5,2.2,.8,2,.14),ft("#e04a3a"),-.85,1.1,0)),x.add(ie(new ge(.5,2.2,.8,2,.14),ft("#e04a3a"),.85,1.1,0)),x.add(ie(new ge(2.3,.55,.9,2,.14),ft("#c9382a"),0,2.35,0)),x.add(ie(new kt(.16,.16,.9,10),ft("#aab3c8"),0,1.75,0)),x.add(ie(new kt(.45,.45,.22,16),ft("#39406e"),0,1.3,0));const m=new jt(new kt(.52,.46,.7,18,1,!0),new we({color:"#cfeeff",transparent:!0,opacity:.4}));m.position.set(0,.55,0),x.add(m);for(let _=0;_<5;_++){const v=_/5*Math.PI*2;x.add(ie(new Jt(.14,10,8),ft("#e8384f"),Math.cos(v)*.22,.32+_%2*.16,Math.sin(v)*.22,!1,!1))}const p=new jt(new Xe(.4,.09,8,18),ft("#39406e"));p.rotation.x=Math.PI/2,p.position.set(0,2.75,0),x.add(p),this.spinners.push({node:p,speed:.35}),x.position.set(3.6,c,-1.5),this.group.add(x);for(const[_,v,P]of[[-8.2,2.8,.5],[7.6,3.4,.42]]){const T=_c({color:"#8a94ad",radius:P,teeth:9,hubColor:"#c3c9d4"});T.rotation.x=-Math.PI/2,T.position.set(_,.14,v),this.group.add(T)}const b=new St;b.add(ie(new ge(1.4,.9,1,2,.08),ft("#c9843c"),0,.45,0)),b.add(ie(new ge(1.5,.16,1.1,1,.05),ft("#a86a2c"),0,.9,0)),b.position.set(9.6,0,.4),b.rotation.y=-.3,this.group.add(b)}frameCorners(){return[new I(-7.6,.3,2.6),new I(7.6,.3,2.6),new I(-7.6,5,-1.5),new I(7.6,5,-1.5)]}frameCenter(){return new I(0,2.3,-.6)}zipSpot(){return new I(-5.6,.05,3.8)}mixySpot(){return new I(6,.05,3.8)}update(t,e){for(const n of this.spinners)n.node.rotation.z+=t*n.speed;for(let n=0;n<this.lampGlows.length;n++){const s=this.lampGlows[n].material;s.emissiveIntensity=1+Math.sin(e*1.6+n*2.1)*.15}}}class G_{root;list;hint;constructor(t){this.root=C("aside","gw-trail",t),this.root.setAttribute("aria-label","Think Trail — what happened, step by step");const e=C("div","gw-trail-head",this.root);C("span","gw-trail-title",e,"THINK TRAIL");const n=C("button","gw-trail-toggle",e,"▾");n.type="button",n.setAttribute("aria-label","Show or hide the Think Trail"),n.addEventListener("click",()=>{const s=this.root.classList.toggle("collapsed");n.textContent=s?"▸":"▾"}),this.list=C("div","gw-trail-list",this.root),this.hint=C("div","gw-trail-hint",this.root),this.setEmpty(),window.innerWidth<=700&&(this.root.classList.add("collapsed"),n.textContent="▸")}setEmpty(){this.list.innerHTML="";const t=C("div","gw-trail-empty",this.list);C("span",void 0,t,"🔍"),C("span",void 0,t,"When you press BOP!, every step shows up here."),this.hint.textContent="",this.hint.hidden=!0}setSteps(t,e){this.list.innerHTML="";for(const n of t){const s=C("div","gw-trail-step",this.list);C("span","gw-ts-num",s,String(n.n)),C("span","gw-ts-icon",s,n.icon),C("span","gw-ts-text",s,n.text),n.verdict&&C("span",`gw-ts-verdict ${n.verdict}`,s,n.verdict==="ok"?"✓":"✗")}this.hint.textContent=e??"",this.hint.hidden=!e}dispose(){this.root.remove()}}const yc={emoji:"⚙️",name:"Gearworks Garage"},bc=[{id:"gw-motor-start",title:"Gearworks Garage",shortTitle:"Motor Start",family:"bench",goalText:"Wake up the workshop! Look around — the machines arrive soon.",emoji:"🔌",playable:!0,brief:{title:"Welcome to the Garage!",text:"The Great Bop Machine stopped working! Zip needs your help to fix every machine in the garage. Have a look around — your first job starts soon!",emoji:"⚙️"}},{id:"gw-gear-train",title:"Gearworks Garage",shortTitle:"Gear Train",family:"bench",goalText:"Connect the gears to make the strawberry press work!",emoji:"⚙️",playable:!1,brief:{title:"Gear Train",text:"Coming soon!",emoji:"⚙️"}},{id:"gw-belt-builder",title:"Gearworks Garage",shortTitle:"Belt Builder",family:"bench",goalText:"Stretch belts between the axles to share the spin!",emoji:"🔗",playable:!1,brief:{title:"Belt Builder",text:"Coming soon!",emoji:"🔗"}},{id:"gw-motor-programmer",title:"Gearworks Garage",shortTitle:"Motor Programmer",family:"bench",goalText:"Program the motor: speed, direction, start and stop!",emoji:"🎛️",playable:!1,brief:{title:"Motor Programmer",text:"Coming soon!",emoji:"🎛️"}}],H_='<path d="M8 5 L19 12 L8 19 Z"/>',V_='<rect x="6.5" y="6.5" width="11" height="11" rx="2.5"/>',W_='<g fill="none" stroke="currentColor" stroke-width="2.7" stroke-linecap="round"><path d="M6.2 9.4 A7.2 7.2 0 0 1 18.4 8.2"/></g><path d="M19.6 4.4 L19.9 9.4 L14.9 8.7 Z"/><path d="M12 14.5 a3 3 0 1 0 .01 0" fill="none" stroke="currentColor" stroke-width="2.4"/>',X_='<g fill="none" stroke="currentColor" stroke-width="2.7" stroke-linecap="round"><path d="M17.8 9.4 A7.2 7.2 0 0 0 5.6 8.2"/></g><path d="M4.4 4.4 L4.1 9.4 L9.1 8.7 Z"/><path d="M12 14.5 a3 3 0 1 0 .01 0" fill="none" stroke="currentColor" stroke-width="2.4"/>',Y_='<circle cx="12" cy="12" r="8.4" fill="none" stroke="currentColor" stroke-width="2.6"/><g stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M12 7.4 V12 L15.2 14.2"/></g>',q_=[{id:"gwStartMotor",label:"Start",tone:"start",icon:H_},{id:"gwStopMotor",label:"Stop",tone:"stop",icon:V_},{id:"gwTurnCw",label:"Spin",tone:"rotate",icon:W_},{id:"gwTurnCcw",label:"Spin Back",tone:"rotate",icon:X_},{id:"gwWait",label:"Wait",tone:"wait",icon:Y_}];class $_{constructor(t,e,n){this.root=t,this.level=e,this.events=n}stage;scene;zip;mixy;trail;charLayer;disposers=[];enter(){const t=C("div","",this.root);t.id="world-canvas-wrap",this.charLayer=C("div","",this.root),this.charLayer.id="char-layer";const e=C("div","ui-layer",this.root),n=F_.bench;this.stage=new Gr(t,{viewDir:n.viewDir,fovFor:n.fovFor,indoor:!0}),this.stage.setSky("#141c4a",40,90),this.scene=new z_,this.stage.scene.add(this.scene.group),this.stage.frameArea(this.scene.frameCenter(),this.scene.frameCorners()),this.zip=new _s({svgUrl:"./art/characters/zip/zip.svg",height:2.35,name:"zip"},this.charLayer,this.stage.camera,t),this.zip.addToScene(this.stage.scene),this.zip.placeAt(this.scene.zipSpot()),this.zip.look("right"),this.addNameChip(this.zip,"Zip"),this.mixy=new _s({svgUrl:"./art/characters/mixy/mixy.svg",height:2.1,name:"mixy",mixy:!0},this.charLayer,this.stage.camera,t),this.mixy.addToScene(this.stage.scene),this.mixy.placeAt(this.scene.mixySpot()),this.mixy.look("left"),this.addNameChip(this.mixy,"GlitchBop"),new yh(e,`${this.level.title} · ${this.level.shortTitle}`,{onBack:this.events.onExit,onSettings:()=>Sh(e,this.events.store,fn,()=>{})}).setStars(0),new bh(e,this.level.goalText,this.level.emoji),this.trail=new G_(e),this.buildDeckShell(e);const r=this.events.store.settings.calmMode;this.zip.setCalm(r),this.mixy.setCalm(r),this.disposers.push(this.stage.onTick((o,a)=>{r||this.scene.update(o,a),this.zip.update(o,a),this.mixy.update(o,a)})),this.stage.startLoop(),wh(e,this.level,fn).then(()=>{this.zip.setMood("happy"),window.setTimeout(()=>this.zip.setMood("idle"),1800)})}addNameChip(t,e){t.whenReady().then(()=>{C("span","gw-name-chip",t.el,e).setAttribute("aria-hidden","true")})}buildDeckShell(t){const e=C("div","bottom-deck",t),n=C("div","deck-panel",e),s=C("div","deck-tray",n);for(const l of q_){const c=C("button","tile gw-tile");c.type="button",c.dataset.gwTone=l.tone,c.setAttribute("aria-label",`${l.label} — this machine wakes up soon`),C("span","sheen",c);const h=C("span","ico",c);h.innerHTML=`<svg class="cmd-ico" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">${l.icon}</svg>`,C("span","lbl",c,l.label),c.addEventListener("click",()=>{fn.play("tap"),this.mixy.flashMood("excited",1200),this.toast("🔧 Zip is still wiring this machine — next update!")}),s.appendChild(c)}C("div","deck-divider",n);const r=C("div","deck-sequence",n);r.setAttribute("aria-label","Your machine program (coming soon)");for(let l=0;l<5;l++)C("div","slot",r);const o=C("div","bop-wrap",e),a=C("button","bop-btn empty",o);a.type="button",a.setAttribute("aria-label","BOP! The machines arrive in the next update."),a.append("BOP!"),C("span","tri",a),a.addEventListener("click",()=>{fn.play("glitch"),this.mixy.glitchWobble(.7),this.toast("⚙️ The Great Bop Machine wakes up in the next update!")})}toast(t){this.root.querySelector(".gw-toast")?.remove();const e=C("div","toast gw-toast",this.root,t);window.setTimeout(()=>e.remove(),2400)}dispose(){this.disposers.forEach(t=>t()),this.disposers=[],this.trail?.dispose(),this.zip?.dispose(),this.mixy?.dispose(),this.stage?.dispose(),this.root.innerHTML=""}}const j_=[{name:"Sequences",emoji:"➡️",blurb:"Ordering steps to reach a goal — the foundation of all programs.",levelIds:["sm-1","sm-2"]},{name:"Loops",emoji:"↻",blurb:"Repeating a pattern with counted and stop-conditioned loops.",levelIds:["bb-1","bb-2","bb-3","bb-debug","bb-creative"]},{name:"Conditions",emoji:"🌸",blurb:"“If you see a flower, grab it” — decisions inside a program.",levelIds:["pf-1","pf-2","pf-3","pf-debug","pf-creative"]},{name:"Teamwork",emoji:"🤖",blurb:"Coordinating two bots with a shared plan (task switching).",levelIds:["rt-1","rt-2","rt-3","rt-debug","rt-creative"]}];function Z_(i){if(i<60)return`${i}s`;const t=Math.floor(i/60);return t<60?`${t} min`:`${Math.floor(t/60)}h ${t%60}m`}function J_(i,t){const e=C("button","campfire-gate",i);e.type="button",e.innerHTML='🔥<span class="ring"></span>',e.setAttribute("aria-label","Grown-ups: hold to open the Campfire");let n=null;const s=()=>{n!==null&&window.clearTimeout(n),n=null,e.classList.remove("holding")};return e.addEventListener("pointerdown",()=>{e.classList.add("holding"),n=window.setTimeout(()=>{s(),t()},1200)}),e.addEventListener("pointerup",s),e.addEventListener("pointerleave",s),e.addEventListener("pointercancel",s),e}function K_(i,t,e){const n=C("div","dialog-scrim",i),s=C("div","dialog campfire-dialog",n);s.setAttribute("role","dialog"),s.setAttribute("aria-label","Grown-Up Campfire"),C("div","intro-emoji",s,"🔥"),C("h2",void 0,s,"Grown-Up Campfire"),C("p","camp-sub",s,"A quiet moment to see how your little builder is doing.");const r=C("div","camp-stats",s),o=Object.values(t.stars).reduce((m,p)=>m+p,0),a=Object.keys(t.stars).filter(m=>(t.stars[m]??0)>0).length,l=(m,p,b)=>{const _=C("div","camp-stat",r);C("span","cs-emoji",_,m),C("span","cs-value",_,p),C("span","cs-label",_,b)};l("⭐",String(o),"stars earned"),l("🗺️",`${a}/${hn.length}`,"levels completed"),l("📅",String(t.daily.streak),"day streak"),l("⏱️",Z_(t.playSeconds),"total play time"),C("h3",void 0,s,"Concepts practiced");const c=C("div","camp-concepts",s);for(const m of j_){const p=m.levelIds.filter(v=>(t.stars[v]??0)>0).length,b=C("div","camp-concept",c);C("span","cc-emoji",b,m.emoji);const _=C("div","cc-mid",b);C("div","cc-name",_,m.name),C("div","cc-blurb",_,m.blurb),C("span",`cc-progress${p===m.levelIds.length?" full":""}`,b,`${p}/${m.levelIds.length}`)}const h=Hr().length;if(h>0){const m=C("div","camp-concept",c);C("span","cc-emoji",m,"🏝️");const p=C("div","cc-mid",m);C("div","cc-name",p,"Creation"),C("div","cc-blurb",p,"Designing original puzzles on Imagination Island."),C("span","cc-progress full",m,`${h} built`)}const d=C("div","dlg-actions camp-actions",s),u=C("button","mini-btn danger",d,"Reset all progress");u.type="button";let f=!1;u.addEventListener("click",()=>{if(!f){f=!0,u.textContent="Tap again to really reset ⚠️";return}t.reset(),x()});const g=C("button","btn-play small",d,"Close");g.type="button";const x=()=>n.remove();g.addEventListener("click",x),n.addEventListener("click",m=>{m.target===n&&x()})}const Q_={"sparkle-meadow":{emoji:"🌼",name:"Sparkle Meadow",theme:"meadow"},"bubble-bay":{emoji:"🐚",name:"Bubble Bay",theme:"bay"},"pattern-forest":{emoji:"🌸",name:"Pattern Forest",theme:"forest"},"robot-town":{emoji:"🤖",name:"Robot Town",theme:"town"},"agent-academy":{emoji:"🎓",name:"Agent Academy",theme:"academy"}},tx=["sparkle-meadow","bubble-bay","pattern-forest","robot-town","agent-academy"];function ex(){const i=new Date;return(Math.floor(new Date(i.getFullYear(),i.getMonth(),i.getDate()).getTime()/864e5)%hn.length+hn.length)%hn.length}class nx{host;gameScreen=null;garden=null;editor=null;gearworks=null;store=new fs;mascotStops=[];constructor(t){this.host=t}start(){this.showTitle()}clearHost(){this.mascotStops.forEach(t=>t()),this.mascotStops=[],this.gameScreen?.dispose(),this.gameScreen=null,this.garden?.dispose(),this.garden=null,this.editor?.dispose(),this.editor=null,this.gearworks?.dispose(),this.gearworks=null,this.host.innerHTML=""}showTitle(){this.clearHost();const t=C("section","screen title-screen",this.host);t.id="screen-title",C("div","title-rays",t);for(const f of["c1","c2","c3"])C("div",`title-cloud ${f}`,t);["⭐","✨","⬡","✦","💧","⭐","✨"].forEach((f,g)=>{C("span",`title-spark s${g}`,t,f).setAttribute("aria-hidden","true")});const n=C("div","title-ground",t);C("div","title-hill h1",n),C("div","title-hill h2",n);for(const f of["b1","b2","b3","b4"])C("div",`title-bush ${f}`,n);["🌸","🌼","🌺","🌻"].forEach((f,g)=>C("span",`title-flower f${g}`,n,f));const r=C("div","title-mascot zip",t);Es(r,"./art/characters/zip/zip.svg").then(f=>{f&&this.mascotStops.push(Ur(f))});const o=C("div","title-mascot mixy",t);Es(o,"./art/characters/mixy/mixy.svg").then(f=>{f&&this.mascotStops.push(Ur(f))});const a=C("div","title-card",t),l=C("div","title-logo-art",a);l.setAttribute("role","img"),l.setAttribute("aria-label","CodeBops");const c=C("div","logo-shine",l);_h("./art/logo.svg").then(f=>{l.insertAdjacentHTML("afterbegin",f);const g=`url("data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(f)))}")`;c.style.webkitMaskImage=g,c.style.maskImage=g}),l.addEventListener("pointerdown",()=>{fn.play("star"),l.classList.remove("replay"),l.offsetWidth,l.classList.add("replay")});const h=C("div","title-tag",a);C("span","tag-star",h,"⭐"),C("span",void 0,h,"Teach tiny helpers. Build big ideas."),C("span","tag-star",h,"⭐");const d=C("button","btn-play",a);d.type="button",d.setAttribute("aria-label","Play CodeBops"),C("span","gloss",d),d.append("PLAY"),C("span","tri",d),d.addEventListener("click",()=>{fn.play("bop"),this.showSelect()});const u=C("button","garden-btn",a);u.type="button",C("span",void 0,u,"🌻"),C("span",void 0,u,"My Garden"),u.addEventListener("click",()=>this.showGarden()),J_(t,()=>{this.store=new fs,K_(t,this.store)})}showSelect(){this.clearHost(),this.store=new fs;const t=C("section","screen",this.host),e=C("div","select-wrap",t);for(const _ of["c1","c2"])C("div",`title-cloud select-cloud ${_}`,e);const n=C("div","select-header",e),s=C("button","circle-btn",n,"←");s.type="button",s.setAttribute("aria-label","Back to title"),s.addEventListener("click",()=>this.showTitle()),C("h1",void 0,n,"Pick a Level!");const r=Object.values(this.store.stars).reduce((_,v)=>_+v,0),o=C("div","stars-pill",n);o.style.marginLeft="auto",C("span","star earned",o,"★"),C("span",void 0,o,` ${r}`);const a=C("button","stars-pill garden-pill",n);a.type="button",a.setAttribute("aria-label","Visit the Bop Garden"),C("span",void 0,a,"🌻"),C("span",void 0,a,` ${this.store.daily.totalCompleted}`),a.addEventListener("click",()=>this.showGarden());const l=ex(),c=hn[l],h=this.store.daily.lastCompleted===Wa(),d=C("button",`daily-card${h?" done":""}`,e);d.type="button",C("span","dc-emoji",d,h?"✅":"📅");const u=C("span","dc-mid",d);C("span","dc-title",u,h?"Daily Bop — done!":"Daily Bop"),C("span","dc-sub",u,h?`Come back tomorrow — 🔥 ${this.store.daily.streak} day streak!`:`Today's puzzle: ${c.shortTitle} ${c.brief.emoji}`),C("span","dc-streak",d,`🔥 ${this.store.daily.streak}`),h||d.addEventListener("click",()=>this.showGame(l,{onSuccess:()=>{const _=this.store.completeDaily();window.setTimeout(()=>this.streakToast(_),900)}}));let f=0;for(const _ of tx){const v=hn.filter(D=>D.worldId===_);if(v.length===0)continue;const P=Q_[_],T=f,E=T===0||(this.store.stars[hn[T-1].id]??0)>=1,R=C("div",`world-panel wp-${P.theme}${E?"":" locked"}`,e),w=C("div","world-title",R);C("span","wemoji",w,P.emoji),C("span",void 0,w,P.name),E||C("span","world-lock",w,"🔒");const y=C("div","level-list",R);for(const D of v){const B=f,k=B===0||(this.store.stars[hn[B-1].id]??0)>=1,X=this.store.stars[D.id]??0,Y=C("button",`level-item${k?"":" locked"}${D.prefill?" debug":""}`,y);Y.type="button",Y.setAttribute("aria-label",k?`Play ${D.shortTitle}`:`${D.shortTitle} — locked`);const V=C("span","li-num",Y);C("span","li-num-text",V,String(B+1)),C("span","li-leaf",V,"🍃"),C("span","li-emoji",Y,D.brief.emoji),C("span","li-name",Y,D.shortTitle);const J=C("span","li-right",Y);k||C("span","li-lock",J,"🔒");const H=C("span","li-stars",J);for(let lt=0;lt<3;lt++)C("span",lt<X?"on":"",H,"★");k?Y.addEventListener("click",()=>this.showGame(B)):Y.addEventListener("click",()=>{fn.play("bump"),Y.classList.remove("shake"),Y.offsetWidth,Y.classList.add("shake"),this.hintToast("⭐ Win the level before this one to unlock it!")}),f++}}{const _=C("div","world-panel wp-garage",e),v=C("div","world-title",_);C("span","wemoji",v,yc.emoji),C("span",void 0,v,yc.name),C("span","gw-new-badge",v,"NEW!");const P=C("div","level-list",_);bc.forEach((T,E)=>{const R=C("button",`level-item${T.playable?"":" locked"}`,P);R.type="button",R.setAttribute("aria-label",T.playable?`Play ${T.shortTitle}`:`${T.shortTitle} — coming soon`);const w=C("span","li-num gw-num",R);C("span","li-num-text",w,String(E+1)),C("span","li-leaf",w,"⚙️"),C("span","li-emoji",R,T.emoji),C("span","li-name",R,T.shortTitle);const y=C("span","li-right",R);T.playable||C("span","li-lock",y,"🔒");const D=C("span","li-stars",y);for(let B=0;B<3;B++)C("span","",D,"★");T.playable?R.addEventListener("click",()=>this.showGearworks(E)):R.addEventListener("click",()=>{fn.play("bump"),R.classList.remove("shake"),R.offsetWidth,R.classList.add("shake"),this.hintToast("🔧 Zip is still building this machine!")})})}const g=Hr(),x=C("div","world-panel wp-island",e),m=C("div","world-title",x);C("span","wemoji",m,"🏝️"),C("span",void 0,m,"Imagination Island");const p=C("div","level-list",x),b=C("button","level-item create-item",p);b.type="button",C("span","li-emoji",b,"＋"),C("span","li-name",b,"Build a Level"),b.addEventListener("click",()=>this.showEditor());for(const _ of g){const v=C("button","level-item custom-item",p);v.type="button",C("span","li-emoji",v,"🛠️"),C("span","li-name",v,_.shortTitle),v.addEventListener("click",()=>this.showCustomGame(_));const P=C("span","lv-del",v,"✕");P.setAttribute("aria-label",`Delete ${_.shortTitle}`),P.addEventListener("click",T=>{T.stopPropagation(),C_(_.id),this.showSelect()})}}hintToast(t){document.querySelector(".app-toast")?.remove();const e=C("div","toast app-toast",this.host,t);window.setTimeout(()=>e.remove(),2200)}streakToast(t){document.querySelector(".app-toast")?.remove();const e=C("div","toast app-toast streak-toast",this.host,`🔥 Daily Bop streak: ${t} day${t===1?"":"s"}! A golden flower joins your garden 🌻`);window.setTimeout(()=>e.remove(),3400)}showGame(t,e={}){this.clearHost();const n=C("section","screen",this.host);n.id="screen-game";const s=hn[t];this.gameScreen=new Po(n,s,{onExit:()=>this.showSelect(),onNextLevel:()=>this.showGame(Math.min(t+1,hn.length-1)),hasNext:t<hn.length-1,onSuccess:e.onSuccess,store:this.store}),this.gameScreen.enter()}showCustomGame(t){this.clearHost();const e=C("section","screen",this.host);e.id="screen-game",this.gameScreen=new Po(e,t,{onExit:()=>this.showSelect(),onNextLevel:()=>this.showSelect(),hasNext:!1,store:this.store}),this.gameScreen.enter()}showGearworks(t){this.clearHost();const e=C("section","screen",this.host);e.id="screen-gearworks",this.gearworks=new $_(e,bc[t],{onExit:()=>this.showSelect(),store:this.store}),this.gearworks.enter()}showGarden(){this.clearHost(),this.store=new fs;const t=C("section","screen",this.host);t.id="screen-garden",this.garden=new L_(t,this.store,{onBack:()=>this.showTitle()}),this.garden.enter()}showEditor(){this.clearHost();const t=C("section","screen",this.host);t.id="screen-editor",this.editor=new U_(t,{onBack:()=>this.showSelect(),onPlay:e=>{this.clearHost();const n=C("section","screen",this.host);n.id="screen-game",this.gameScreen=new Po(n,e,{onExit:()=>this.showEditor(),onNextLevel:()=>this.showEditor(),hasNext:!1,store:this.store}),this.gameScreen.enter()},onSaved:()=>{}}),this.editor.enter()}}function ix(){const i=document.getElementById("app");if(!i)throw new Error("[CodeBops] Missing #app host element.");new nx(i).start(),document.getElementById("boot-loader")?.remove()}ix();
