(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=e(i);fetch(i.href,r)}})();function T(s,t,e,n){const i=document.createElement(s);return t&&(i.className=t),n!==void 0&&(i.textContent=n),e&&e.appendChild(i),i}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const el="171",md=0,Pl=1,gd=2,sh=1,rh=2,Dn=3,ti=0,je=1,ln=2,Kn=0,Zi=1,Ls=2,Il=3,Dl=4,vd=5,mi=100,_d=101,xd=102,yd=103,bd=104,wd=200,Md=201,Sd=202,Td=203,la=204,ca=205,Ed=206,Ad=207,Rd=208,Cd=209,Ld=210,Pd=211,Id=212,Dd=213,Ud=214,ha=0,da=1,ua=2,Qi=3,fa=4,pa=5,ma=6,ga=7,oh=0,Nd=1,kd=2,Jn=0,Fd=1,Od=2,Bd=3,ah=4,zd=5,Gd=6,Hd=7,lh=300,ts=301,es=302,va=303,_a=304,so=306,ns=1e3,vi=1001,xa=1002,Xe=1003,Vd=1004,er=1005,wn=1006,vo=1007,_i=1008,On=1009,ch=1010,hh=1011,Ps=1012,nl=1013,xi=1014,Nn=1015,Os=1016,il=1017,sl=1018,is=1020,dh=35902,uh=1021,fh=1022,vn=1023,ph=1024,mh=1025,Ki=1026,ss=1027,rl=1028,ol=1029,gh=1030,al=1031,ll=1033,kr=33776,Fr=33777,Or=33778,Br=33779,ya=35840,ba=35841,wa=35842,Ma=35843,Sa=36196,Ta=37492,Ea=37496,Aa=37808,Ra=37809,Ca=37810,La=37811,Pa=37812,Ia=37813,Da=37814,Ua=37815,Na=37816,ka=37817,Fa=37818,Oa=37819,Ba=37820,za=37821,zr=36492,Ga=36494,Ha=36495,vh=36283,Va=36284,Wa=36285,Xa=36286,Wd=3200,Xd=3201,_h=0,$d=1,Zn="",Ue="srgb",rs="srgb-linear",Wr="linear",pe="srgb",Ai=7680,Ul=519,Yd=512,qd=513,jd=514,xh=515,Zd=516,Kd=517,Jd=518,Qd=519,Nl=35044,kl="300 es",kn=2e3,Xr=2001;class cs{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const i=this._listeners[t];if(i!==void 0){const r=i.indexOf(e);r!==-1&&i.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const i=n.slice(0);for(let r=0,o=i.length;r<o;r++)i[r].call(this,t);t.target=null}}}const ze=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Fl=1234567;const Es=Math.PI/180,Is=180/Math.PI;function Mi(){const s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(ze[s&255]+ze[s>>8&255]+ze[s>>16&255]+ze[s>>24&255]+"-"+ze[t&255]+ze[t>>8&255]+"-"+ze[t>>16&15|64]+ze[t>>24&255]+"-"+ze[e&63|128]+ze[e>>8&255]+"-"+ze[e>>16&255]+ze[e>>24&255]+ze[n&255]+ze[n>>8&255]+ze[n>>16&255]+ze[n>>24&255]).toLowerCase()}function jt(s,t,e){return Math.max(t,Math.min(e,s))}function cl(s,t){return(s%t+t)%t}function tu(s,t,e,n,i){return n+(s-t)*(i-n)/(e-t)}function eu(s,t,e){return s!==t?(e-s)/(t-s):0}function As(s,t,e){return(1-e)*s+e*t}function nu(s,t,e,n){return As(s,t,1-Math.exp(-e*n))}function iu(s,t=1){return t-Math.abs(cl(s,t*2)-t)}function su(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*(3-2*s))}function ru(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*s*(s*(s*6-15)+10))}function ou(s,t){return s+Math.floor(Math.random()*(t-s+1))}function au(s,t){return s+Math.random()*(t-s)}function lu(s){return s*(.5-Math.random())}function cu(s){s!==void 0&&(Fl=s);let t=Fl+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function hu(s){return s*Es}function du(s){return s*Is}function uu(s){return(s&s-1)===0&&s!==0}function fu(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function pu(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function mu(s,t,e,n,i){const r=Math.cos,o=Math.sin,a=r(e/2),l=o(e/2),c=r((t+n)/2),h=o((t+n)/2),d=r((t-n)/2),u=o((t-n)/2),f=r((n-t)/2),g=o((n-t)/2);switch(i){case"XYX":s.set(a*h,l*d,l*u,a*c);break;case"YZY":s.set(l*u,a*h,l*d,a*c);break;case"ZXZ":s.set(l*d,l*u,a*h,a*c);break;case"XZX":s.set(a*h,l*g,l*f,a*c);break;case"YXY":s.set(l*f,a*h,l*g,a*c);break;case"ZYZ":s.set(l*g,l*f,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Xi(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function Ve(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}const gu={DEG2RAD:Es,RAD2DEG:Is,generateUUID:Mi,clamp:jt,euclideanModulo:cl,mapLinear:tu,inverseLerp:eu,lerp:As,damp:nu,pingpong:iu,smoothstep:su,smootherstep:ru,randInt:ou,randFloat:au,randFloatSpread:lu,seededRandom:cu,degToRad:hu,radToDeg:du,isPowerOfTwo:uu,ceilPowerOfTwo:fu,floorPowerOfTwo:pu,setQuaternionFromProperEuler:mu,normalize:Ve,denormalize:Xi};class at{constructor(t=0,e=0){at.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=jt(this.x,t.x,e.x),this.y=jt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=jt(this.x,t,e),this.y=jt(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(jt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(jt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),i=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*i+t.x,this.y=r*i+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class $t{constructor(t,e,n,i,r,o,a,l,c){$t.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,o,a,l,c)}set(t,e,n,i,r,o,a,l,c){const h=this.elements;return h[0]=t,h[1]=i,h[2]=a,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],d=n[7],u=n[2],f=n[5],g=n[8],v=i[0],m=i[3],p=i[6],b=i[1],x=i[4],_=i[7],L=i[2],R=i[5],E=i[8];return r[0]=o*v+a*b+l*L,r[3]=o*m+a*x+l*R,r[6]=o*p+a*_+l*E,r[1]=c*v+h*b+d*L,r[4]=c*m+h*x+d*R,r[7]=c*p+h*_+d*E,r[2]=u*v+f*b+g*L,r[5]=u*m+f*x+g*R,r[8]=u*p+f*_+g*E,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*o*h-e*a*c-n*r*h+n*a*l+i*r*c-i*o*l}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],d=h*o-a*c,u=a*l-h*r,f=c*r-o*l,g=e*d+n*u+i*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return t[0]=d*v,t[1]=(i*c-h*n)*v,t[2]=(a*n-i*o)*v,t[3]=u*v,t[4]=(h*e-i*l)*v,t[5]=(i*r-a*e)*v,t[6]=f*v,t[7]=(n*l-c*e)*v,t[8]=(o*e-n*r)*v,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+t,-i*c,i*l,-i*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(_o.makeScale(t,e)),this}rotate(t){return this.premultiply(_o.makeRotation(-t)),this}translate(t,e){return this.premultiply(_o.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const _o=new $t;function yh(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function $r(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function vu(){const s=$r("canvas");return s.style.display="block",s}const Ol={};function $i(s){s in Ol||(Ol[s]=!0,console.warn(s))}function _u(s,t,e){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(t,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function xu(s){const t=s.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function yu(s){const t=s.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const Bl=new $t().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),zl=new $t().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function bu(){const s={enabled:!0,workingColorSpace:rs,spaces:{},convert:function(i,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===pe&&(i.r=Fn(i.r),i.g=Fn(i.g),i.b=Fn(i.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(i.applyMatrix3(this.spaces[r].toXYZ),i.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===pe&&(i.r=Ji(i.r),i.g=Ji(i.g),i.b=Ji(i.b))),i},fromWorkingColorSpace:function(i,r){return this.convert(i,this.workingColorSpace,r)},toWorkingColorSpace:function(i,r){return this.convert(i,r,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Zn?Wr:this.spaces[i].transfer},getLuminanceCoefficients:function(i,r=this.workingColorSpace){return i.fromArray(this.spaces[r].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,r,o){return i.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return s.define({[rs]:{primaries:t,whitePoint:n,transfer:Wr,toXYZ:Bl,fromXYZ:zl,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Ue},outputColorSpaceConfig:{drawingBufferColorSpace:Ue}},[Ue]:{primaries:t,whitePoint:n,transfer:pe,toXYZ:Bl,fromXYZ:zl,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Ue}}}),s}const se=bu();function Fn(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Ji(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let Ri;class wu{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Ri===void 0&&(Ri=$r("canvas")),Ri.width=t.width,Ri.height=t.height;const n=Ri.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Ri}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=$r("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const i=n.getImageData(0,0,t.width,t.height),r=i.data;for(let o=0;o<r.length;o++)r[o]=Fn(r[o]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Fn(e[n]/255)*255):e[n]=Fn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Mu=0;class bh{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Mu++}),this.uuid=Mi(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?r.push(xo(i[o].image)):r.push(xo(i[o]))}else r=xo(i);n.url=r}return e||(t.images[this.uuid]=n),n}}function xo(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?wu.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Su=0;class Oe extends cs{constructor(t=Oe.DEFAULT_IMAGE,e=Oe.DEFAULT_MAPPING,n=vi,i=vi,r=wn,o=_i,a=vn,l=On,c=Oe.DEFAULT_ANISOTROPY,h=Zn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Su++}),this.uuid=Mi(),this.name="",this.source=new bh(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new at(0,0),this.repeat=new at(1,1),this.center=new at(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new $t,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==lh)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case ns:t.x=t.x-Math.floor(t.x);break;case vi:t.x=t.x<0?0:1;break;case xa:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case ns:t.y=t.y-Math.floor(t.y);break;case vi:t.y=t.y<0?0:1;break;case xa:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Oe.DEFAULT_IMAGE=null;Oe.DEFAULT_MAPPING=lh;Oe.DEFAULT_ANISOTROPY=1;class me{constructor(t=0,e=0,n=0,i=1){me.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*i+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*i+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*i+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*i+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,r;const l=t.elements,c=l[0],h=l[4],d=l[8],u=l[1],f=l[5],g=l[9],v=l[2],m=l[6],p=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-v)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+v)<.1&&Math.abs(g+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const x=(c+1)/2,_=(f+1)/2,L=(p+1)/2,R=(h+u)/4,E=(d+v)/4,P=(g+m)/4;return x>_&&x>L?x<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(x),i=R/n,r=E/n):_>L?_<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(_),n=R/i,r=P/i):L<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(L),n=E/r,i=P/r),this.set(n,i,r,e),this}let b=Math.sqrt((m-g)*(m-g)+(d-v)*(d-v)+(u-h)*(u-h));return Math.abs(b)<.001&&(b=1),this.x=(m-g)/b,this.y=(d-v)/b,this.z=(u-h)/b,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=jt(this.x,t.x,e.x),this.y=jt(this.y,t.y,e.y),this.z=jt(this.z,t.z,e.z),this.w=jt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=jt(this.x,t,e),this.y=jt(this.y,t,e),this.z=jt(this.z,t,e),this.w=jt(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(jt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Tu extends cs{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new me(0,0,t,e),this.scissorTest=!1,this.viewport=new me(0,0,t,e);const i={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:wn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new Oe(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,i=t.textures.length;n<i;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new bh(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class yi extends Tu{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class wh extends Oe{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Xe,this.minFilter=Xe,this.wrapR=vi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Eu extends Oe{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Xe,this.minFilter=Xe,this.wrapR=vi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Bs{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,r,o,a){let l=n[i+0],c=n[i+1],h=n[i+2],d=n[i+3];const u=r[o+0],f=r[o+1],g=r[o+2],v=r[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d;return}if(a===1){t[e+0]=u,t[e+1]=f,t[e+2]=g,t[e+3]=v;return}if(d!==v||l!==u||c!==f||h!==g){let m=1-a;const p=l*u+c*f+h*g+d*v,b=p>=0?1:-1,x=1-p*p;if(x>Number.EPSILON){const L=Math.sqrt(x),R=Math.atan2(L,p*b);m=Math.sin(m*R)/L,a=Math.sin(a*R)/L}const _=a*b;if(l=l*m+u*_,c=c*m+f*_,h=h*m+g*_,d=d*m+v*_,m===1-a){const L=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=L,c*=L,h*=L,d*=L}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d}static multiplyQuaternionsFlat(t,e,n,i,r,o){const a=n[i],l=n[i+1],c=n[i+2],h=n[i+3],d=r[o],u=r[o+1],f=r[o+2],g=r[o+3];return t[e]=a*g+h*d+l*f-c*u,t[e+1]=l*g+h*u+c*d-a*f,t[e+2]=c*g+h*f+a*u-l*d,t[e+3]=h*g-a*d-l*u-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,i=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(i/2),d=a(r/2),u=l(n/2),f=l(i/2),g=l(r/2);switch(o){case"XYZ":this._x=u*h*d+c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d-u*f*g;break;case"YXZ":this._x=u*h*d+c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d+u*f*g;break;case"ZXY":this._x=u*h*d-c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d-u*f*g;break;case"ZYX":this._x=u*h*d-c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d+u*f*g;break;case"YZX":this._x=u*h*d+c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d-u*f*g;break;case"XZY":this._x=u*h*d-c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d+u*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],i=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],h=e[6],d=e[10],u=n+a+d;if(u>0){const f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(o-i)*f}else if(n>a&&n>d){const f=2*Math.sqrt(1+n-a-d);this._w=(h-l)/f,this._x=.25*f,this._y=(i+o)/f,this._z=(r+c)/f}else if(a>d){const f=2*Math.sqrt(1+a-n-d);this._w=(r-c)/f,this._x=(i+o)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+d-n-a);this._w=(o-i)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(jt(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,i=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+o*a+i*c-r*l,this._y=i*h+o*l+r*a-n*c,this._z=r*h+o*c+n*l-i*a,this._w=o*h-n*a-i*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,i=this._y,r=this._z,o=this._w;let a=o*t._w+n*t._x+i*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=i,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const f=1-e;return this._w=f*o+e*this._w,this._x=f*n+e*this._x,this._y=f*i+e*this._y,this._z=f*r+e*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,a),d=Math.sin((1-e)*h)/c,u=Math.sin(e*h)/c;return this._w=o*d+this._w*u,this._x=n*d+this._x*u,this._y=i*d+this._y*u,this._z=r*d+this._z*u,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class I{constructor(t=0,e=0,n=0){I.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Gl.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Gl.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*i,this.y=r[1]*e+r[4]*n+r[7]*i,this.z=r[2]*e+r[5]*n+r[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*i+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*i+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*i+r[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,i=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*i-a*n),h=2*(a*e-r*i),d=2*(r*n-o*e);return this.x=e+l*c+o*d-a*h,this.y=n+l*h+a*c-r*d,this.z=i+l*d+r*h-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*i,this.y=r[1]*e+r[5]*n+r[9]*i,this.z=r[2]*e+r[6]*n+r[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=jt(this.x,t.x,e.x),this.y=jt(this.y,t.y,e.y),this.z=jt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=jt(this.x,t,e),this.y=jt(this.y,t,e),this.z=jt(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(jt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,i=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=i*l-r*a,this.y=r*o-n*l,this.z=n*a-i*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return yo.copy(this).projectOnVector(t),this.sub(yo)}reflect(t){return this.sub(yo.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(jt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const yo=new I,Gl=new Bs;class zs{constructor(t=new I(1/0,1/0,1/0),e=new I(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(dn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(dn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=dn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,dn):dn.fromBufferAttribute(r,o),dn.applyMatrix4(t.matrixWorld),this.expandByPoint(dn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),nr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),nr.copy(n.boundingBox)),nr.applyMatrix4(t.matrixWorld),this.union(nr)}const i=t.children;for(let r=0,o=i.length;r<o;r++)this.expandByObject(i[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,dn),dn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(fs),ir.subVectors(this.max,fs),Ci.subVectors(t.a,fs),Li.subVectors(t.b,fs),Pi.subVectors(t.c,fs),Gn.subVectors(Li,Ci),Hn.subVectors(Pi,Li),oi.subVectors(Ci,Pi);let e=[0,-Gn.z,Gn.y,0,-Hn.z,Hn.y,0,-oi.z,oi.y,Gn.z,0,-Gn.x,Hn.z,0,-Hn.x,oi.z,0,-oi.x,-Gn.y,Gn.x,0,-Hn.y,Hn.x,0,-oi.y,oi.x,0];return!bo(e,Ci,Li,Pi,ir)||(e=[1,0,0,0,1,0,0,0,1],!bo(e,Ci,Li,Pi,ir))?!1:(sr.crossVectors(Gn,Hn),e=[sr.x,sr.y,sr.z],bo(e,Ci,Li,Pi,ir))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,dn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(dn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(En[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),En[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),En[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),En[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),En[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),En[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),En[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),En[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(En),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const En=[new I,new I,new I,new I,new I,new I,new I,new I],dn=new I,nr=new zs,Ci=new I,Li=new I,Pi=new I,Gn=new I,Hn=new I,oi=new I,fs=new I,ir=new I,sr=new I,ai=new I;function bo(s,t,e,n,i){for(let r=0,o=s.length-3;r<=o;r+=3){ai.fromArray(s,r);const a=i.x*Math.abs(ai.x)+i.y*Math.abs(ai.y)+i.z*Math.abs(ai.z),l=t.dot(ai),c=e.dot(ai),h=n.dot(ai);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const Au=new zs,ps=new I,wo=new I;class Gs{constructor(t=new I,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Au.setFromPoints(t).getCenter(n);let i=0;for(let r=0,o=t.length;r<o;r++)i=Math.max(i,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;ps.subVectors(t,this.center);const e=ps.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(ps,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(wo.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(ps.copy(t.center).add(wo)),this.expandByPoint(ps.copy(t.center).sub(wo))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const An=new I,Mo=new I,rr=new I,Vn=new I,So=new I,or=new I,To=new I;class ro{constructor(t=new I,e=new I(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,An)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=An.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(An.copy(this.origin).addScaledVector(this.direction,e),An.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){Mo.copy(t).add(e).multiplyScalar(.5),rr.copy(e).sub(t).normalize(),Vn.copy(this.origin).sub(Mo);const r=t.distanceTo(e)*.5,o=-this.direction.dot(rr),a=Vn.dot(this.direction),l=-Vn.dot(rr),c=Vn.lengthSq(),h=Math.abs(1-o*o);let d,u,f,g;if(h>0)if(d=o*l-a,u=o*a-l,g=r*h,d>=0)if(u>=-g)if(u<=g){const v=1/h;d*=v,u*=v,f=d*(d+o*u+2*a)+u*(o*d+u+2*l)+c}else u=r,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*l)+c;else u=-r,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*l)+c;else u<=-g?(d=Math.max(0,-(-o*r+a)),u=d>0?-r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c):u<=g?(d=0,u=Math.min(Math.max(-r,-l),r),f=u*(u+2*l)+c):(d=Math.max(0,-(o*r+a)),u=d>0?r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c);else u=o>0?-r:r,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),i&&i.copy(Mo).addScaledVector(rr,u),f}intersectSphere(t,e){An.subVectors(t.center,this.origin);const n=An.dot(this.direction),i=An.dot(An)-n*n,r=t.radius*t.radius;if(i>r)return null;const o=Math.sqrt(r-i),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,r,o,a,l;const c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(n=(t.min.x-u.x)*c,i=(t.max.x-u.x)*c):(n=(t.max.x-u.x)*c,i=(t.min.x-u.x)*c),h>=0?(r=(t.min.y-u.y)*h,o=(t.max.y-u.y)*h):(r=(t.max.y-u.y)*h,o=(t.min.y-u.y)*h),n>o||r>i||((r>n||isNaN(n))&&(n=r),(o<i||isNaN(i))&&(i=o),d>=0?(a=(t.min.z-u.z)*d,l=(t.max.z-u.z)*d):(a=(t.max.z-u.z)*d,l=(t.min.z-u.z)*d),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,An)!==null}intersectTriangle(t,e,n,i,r){So.subVectors(e,t),or.subVectors(n,t),To.crossVectors(So,or);let o=this.direction.dot(To),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Vn.subVectors(this.origin,t);const l=a*this.direction.dot(or.crossVectors(Vn,or));if(l<0)return null;const c=a*this.direction.dot(So.cross(Vn));if(c<0||l+c>o)return null;const h=-a*Vn.dot(To);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ge{constructor(t,e,n,i,r,o,a,l,c,h,d,u,f,g,v,m){ge.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,o,a,l,c,h,d,u,f,g,v,m)}set(t,e,n,i,r,o,a,l,c,h,d,u,f,g,v,m){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=i,p[1]=r,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=h,p[10]=d,p[14]=u,p[3]=f,p[7]=g,p[11]=v,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ge().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,i=1/Ii.setFromMatrixColumn(t,0).length(),r=1/Ii.setFromMatrixColumn(t,1).length(),o=1/Ii.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,i=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){const u=o*h,f=o*d,g=a*h,v=a*d;e[0]=l*h,e[4]=-l*d,e[8]=c,e[1]=f+g*c,e[5]=u-v*c,e[9]=-a*l,e[2]=v-u*c,e[6]=g+f*c,e[10]=o*l}else if(t.order==="YXZ"){const u=l*h,f=l*d,g=c*h,v=c*d;e[0]=u+v*a,e[4]=g*a-f,e[8]=o*c,e[1]=o*d,e[5]=o*h,e[9]=-a,e[2]=f*a-g,e[6]=v+u*a,e[10]=o*l}else if(t.order==="ZXY"){const u=l*h,f=l*d,g=c*h,v=c*d;e[0]=u-v*a,e[4]=-o*d,e[8]=g+f*a,e[1]=f+g*a,e[5]=o*h,e[9]=v-u*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){const u=o*h,f=o*d,g=a*h,v=a*d;e[0]=l*h,e[4]=g*c-f,e[8]=u*c+v,e[1]=l*d,e[5]=v*c+u,e[9]=f*c-g,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){const u=o*l,f=o*c,g=a*l,v=a*c;e[0]=l*h,e[4]=v-u*d,e[8]=g*d+f,e[1]=d,e[5]=o*h,e[9]=-a*h,e[2]=-c*h,e[6]=f*d+g,e[10]=u-v*d}else if(t.order==="XZY"){const u=o*l,f=o*c,g=a*l,v=a*c;e[0]=l*h,e[4]=-d,e[8]=c*h,e[1]=u*d+v,e[5]=o*h,e[9]=f*d-g,e[2]=g*d-f,e[6]=a*h,e[10]=v*d+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Ru,t,Cu)}lookAt(t,e,n){const i=this.elements;return Je.subVectors(t,e),Je.lengthSq()===0&&(Je.z=1),Je.normalize(),Wn.crossVectors(n,Je),Wn.lengthSq()===0&&(Math.abs(n.z)===1?Je.x+=1e-4:Je.z+=1e-4,Je.normalize(),Wn.crossVectors(n,Je)),Wn.normalize(),ar.crossVectors(Je,Wn),i[0]=Wn.x,i[4]=ar.x,i[8]=Je.x,i[1]=Wn.y,i[5]=ar.y,i[9]=Je.y,i[2]=Wn.z,i[6]=ar.z,i[10]=Je.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],d=n[5],u=n[9],f=n[13],g=n[2],v=n[6],m=n[10],p=n[14],b=n[3],x=n[7],_=n[11],L=n[15],R=i[0],E=i[4],P=i[8],M=i[12],y=i[1],D=i[5],O=i[9],B=i[13],V=i[2],$=i[6],X=i[10],K=i[14],W=i[3],lt=i[7],yt=i[11],Et=i[15];return r[0]=o*R+a*y+l*V+c*W,r[4]=o*E+a*D+l*$+c*lt,r[8]=o*P+a*O+l*X+c*yt,r[12]=o*M+a*B+l*K+c*Et,r[1]=h*R+d*y+u*V+f*W,r[5]=h*E+d*D+u*$+f*lt,r[9]=h*P+d*O+u*X+f*yt,r[13]=h*M+d*B+u*K+f*Et,r[2]=g*R+v*y+m*V+p*W,r[6]=g*E+v*D+m*$+p*lt,r[10]=g*P+v*O+m*X+p*yt,r[14]=g*M+v*B+m*K+p*Et,r[3]=b*R+x*y+_*V+L*W,r[7]=b*E+x*D+_*$+L*lt,r[11]=b*P+x*O+_*X+L*yt,r[15]=b*M+x*B+_*K+L*Et,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],i=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],h=t[2],d=t[6],u=t[10],f=t[14],g=t[3],v=t[7],m=t[11],p=t[15];return g*(+r*l*d-i*c*d-r*a*u+n*c*u+i*a*f-n*l*f)+v*(+e*l*f-e*c*u+r*o*u-i*o*f+i*c*h-r*l*h)+m*(+e*c*d-e*a*f-r*o*d+n*o*f+r*a*h-n*c*h)+p*(-i*a*h-e*l*d+e*a*u+i*o*d-n*o*u+n*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],d=t[9],u=t[10],f=t[11],g=t[12],v=t[13],m=t[14],p=t[15],b=d*m*c-v*u*c+v*l*f-a*m*f-d*l*p+a*u*p,x=g*u*c-h*m*c-g*l*f+o*m*f+h*l*p-o*u*p,_=h*v*c-g*d*c+g*a*f-o*v*f-h*a*p+o*d*p,L=g*d*l-h*v*l-g*a*u+o*v*u+h*a*m-o*d*m,R=e*b+n*x+i*_+r*L;if(R===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const E=1/R;return t[0]=b*E,t[1]=(v*u*r-d*m*r-v*i*f+n*m*f+d*i*p-n*u*p)*E,t[2]=(a*m*r-v*l*r+v*i*c-n*m*c-a*i*p+n*l*p)*E,t[3]=(d*l*r-a*u*r-d*i*c+n*u*c+a*i*f-n*l*f)*E,t[4]=x*E,t[5]=(h*m*r-g*u*r+g*i*f-e*m*f-h*i*p+e*u*p)*E,t[6]=(g*l*r-o*m*r-g*i*c+e*m*c+o*i*p-e*l*p)*E,t[7]=(o*u*r-h*l*r+h*i*c-e*u*c-o*i*f+e*l*f)*E,t[8]=_*E,t[9]=(g*d*r-h*v*r-g*n*f+e*v*f+h*n*p-e*d*p)*E,t[10]=(o*v*r-g*a*r+g*n*c-e*v*c-o*n*p+e*a*p)*E,t[11]=(h*a*r-o*d*r-h*n*c+e*d*c+o*n*f-e*a*f)*E,t[12]=L*E,t[13]=(h*v*i-g*d*i+g*n*u-e*v*u-h*n*m+e*d*m)*E,t[14]=(g*a*i-o*v*i-g*n*l+e*v*l+o*n*m-e*a*m)*E,t[15]=(o*d*i-h*a*i+h*n*l-e*d*l-o*n*u+e*a*u)*E,this}scale(t){const e=this.elements,n=t.x,i=t.y,r=t.z;return e[0]*=n,e[4]*=i,e[8]*=r,e[1]*=n,e[5]*=i,e[9]*=r,e[2]*=n,e[6]*=i,e[10]*=r,e[3]*=n,e[7]*=i,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),i=Math.sin(e),r=1-n,o=t.x,a=t.y,l=t.z,c=r*o,h=r*a;return this.set(c*o+n,c*a-i*l,c*l+i*a,0,c*a+i*l,h*a+n,h*l-i*o,0,c*l-i*a,h*l+i*o,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,r,o){return this.set(1,n,r,0,t,1,o,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){const i=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,h=o+o,d=a+a,u=r*c,f=r*h,g=r*d,v=o*h,m=o*d,p=a*d,b=l*c,x=l*h,_=l*d,L=n.x,R=n.y,E=n.z;return i[0]=(1-(v+p))*L,i[1]=(f+_)*L,i[2]=(g-x)*L,i[3]=0,i[4]=(f-_)*R,i[5]=(1-(u+p))*R,i[6]=(m+b)*R,i[7]=0,i[8]=(g+x)*E,i[9]=(m-b)*E,i[10]=(1-(u+v))*E,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){const i=this.elements;let r=Ii.set(i[0],i[1],i[2]).length();const o=Ii.set(i[4],i[5],i[6]).length(),a=Ii.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),t.x=i[12],t.y=i[13],t.z=i[14],un.copy(this);const c=1/r,h=1/o,d=1/a;return un.elements[0]*=c,un.elements[1]*=c,un.elements[2]*=c,un.elements[4]*=h,un.elements[5]*=h,un.elements[6]*=h,un.elements[8]*=d,un.elements[9]*=d,un.elements[10]*=d,e.setFromRotationMatrix(un),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,i,r,o,a=kn){const l=this.elements,c=2*r/(e-t),h=2*r/(n-i),d=(e+t)/(e-t),u=(n+i)/(n-i);let f,g;if(a===kn)f=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===Xr)f=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=h,l[9]=u,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,i,r,o,a=kn){const l=this.elements,c=1/(e-t),h=1/(n-i),d=1/(o-r),u=(e+t)*c,f=(n+i)*h;let g,v;if(a===kn)g=(o+r)*d,v=-2*d;else if(a===Xr)g=r*d,v=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-u,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=v,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Ii=new I,un=new ge,Ru=new I(0,0,0),Cu=new I(1,1,1),Wn=new I,ar=new I,Je=new I,Hl=new ge,Vl=new Bs;class Bn{constructor(t=0,e=0,n=0,i=Bn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const i=t.elements,r=i[0],o=i[4],a=i[8],l=i[1],c=i[5],h=i[9],d=i[2],u=i[6],f=i[10];switch(e){case"XYZ":this._y=Math.asin(jt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-jt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(jt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-jt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(jt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-jt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Hl.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Hl,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Vl.setFromEuler(this),this.setFromQuaternion(Vl,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Bn.DEFAULT_ORDER="XYZ";class hl{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Lu=0;const Wl=new I,Di=new Bs,Rn=new ge,lr=new I,ms=new I,Pu=new I,Iu=new Bs,Xl=new I(1,0,0),$l=new I(0,1,0),Yl=new I(0,0,1),ql={type:"added"},Du={type:"removed"},Ui={type:"childadded",child:null},Eo={type:"childremoved",child:null};class Ce extends cs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Lu++}),this.uuid=Mi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ce.DEFAULT_UP.clone();const t=new I,e=new Bn,n=new Bs,i=new I(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new ge},normalMatrix:{value:new $t}}),this.matrix=new ge,this.matrixWorld=new ge,this.matrixAutoUpdate=Ce.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ce.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new hl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Di.setFromAxisAngle(t,e),this.quaternion.multiply(Di),this}rotateOnWorldAxis(t,e){return Di.setFromAxisAngle(t,e),this.quaternion.premultiply(Di),this}rotateX(t){return this.rotateOnAxis(Xl,t)}rotateY(t){return this.rotateOnAxis($l,t)}rotateZ(t){return this.rotateOnAxis(Yl,t)}translateOnAxis(t,e){return Wl.copy(t).applyQuaternion(this.quaternion),this.position.add(Wl.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Xl,t)}translateY(t){return this.translateOnAxis($l,t)}translateZ(t){return this.translateOnAxis(Yl,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Rn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?lr.copy(t):lr.set(t,e,n);const i=this.parent;this.updateWorldMatrix(!0,!1),ms.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Rn.lookAt(ms,lr,this.up):Rn.lookAt(lr,ms,this.up),this.quaternion.setFromRotationMatrix(Rn),i&&(Rn.extractRotation(i.matrixWorld),Di.setFromRotationMatrix(Rn),this.quaternion.premultiply(Di.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(ql),Ui.child=t,this.dispatchEvent(Ui),Ui.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Du),Eo.child=t,this.dispatchEvent(Eo),Eo.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Rn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Rn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Rn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(ql),Ui.child=t,this.dispatchEvent(Ui),Ui.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ms,t,Pu),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ms,Iu,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const d=l[c];r(t.shapes,d)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));i.material=a}else i.material=r(t.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];i.animations.push(r(t.animations,l))}}if(e){const a=o(t.geometries),l=o(t.materials),c=o(t.textures),h=o(t.images),d=o(t.shapes),u=o(t.skeletons),f=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=i,n;function o(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const i=t.children[n];this.add(i.clone())}return this}}Ce.DEFAULT_UP=new I(0,1,0);Ce.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ce.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const fn=new I,Cn=new I,Ao=new I,Ln=new I,Ni=new I,ki=new I,jl=new I,Ro=new I,Co=new I,Lo=new I,Po=new me,Io=new me,Do=new me;class gn{constructor(t=new I,e=new I,n=new I){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),fn.subVectors(t,e),i.cross(fn);const r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(t,e,n,i,r){fn.subVectors(i,e),Cn.subVectors(n,e),Ao.subVectors(t,e);const o=fn.dot(fn),a=fn.dot(Cn),l=fn.dot(Ao),c=Cn.dot(Cn),h=Cn.dot(Ao),d=o*c-a*a;if(d===0)return r.set(0,0,0),null;const u=1/d,f=(c*l-a*h)*u,g=(o*h-a*l)*u;return r.set(1-f-g,g,f)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,Ln)===null?!1:Ln.x>=0&&Ln.y>=0&&Ln.x+Ln.y<=1}static getInterpolation(t,e,n,i,r,o,a,l){return this.getBarycoord(t,e,n,i,Ln)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Ln.x),l.addScaledVector(o,Ln.y),l.addScaledVector(a,Ln.z),l)}static getInterpolatedAttribute(t,e,n,i,r,o){return Po.setScalar(0),Io.setScalar(0),Do.setScalar(0),Po.fromBufferAttribute(t,e),Io.fromBufferAttribute(t,n),Do.fromBufferAttribute(t,i),o.setScalar(0),o.addScaledVector(Po,r.x),o.addScaledVector(Io,r.y),o.addScaledVector(Do,r.z),o}static isFrontFacing(t,e,n,i){return fn.subVectors(n,e),Cn.subVectors(t,e),fn.cross(Cn).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return fn.subVectors(this.c,this.b),Cn.subVectors(this.a,this.b),fn.cross(Cn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return gn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return gn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,r){return gn.getInterpolation(t,this.a,this.b,this.c,e,n,i,r)}containsPoint(t){return gn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return gn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,i=this.b,r=this.c;let o,a;Ni.subVectors(i,n),ki.subVectors(r,n),Ro.subVectors(t,n);const l=Ni.dot(Ro),c=ki.dot(Ro);if(l<=0&&c<=0)return e.copy(n);Co.subVectors(t,i);const h=Ni.dot(Co),d=ki.dot(Co);if(h>=0&&d<=h)return e.copy(i);const u=l*d-h*c;if(u<=0&&l>=0&&h<=0)return o=l/(l-h),e.copy(n).addScaledVector(Ni,o);Lo.subVectors(t,r);const f=Ni.dot(Lo),g=ki.dot(Lo);if(g>=0&&f<=g)return e.copy(r);const v=f*c-l*g;if(v<=0&&c>=0&&g<=0)return a=c/(c-g),e.copy(n).addScaledVector(ki,a);const m=h*g-f*d;if(m<=0&&d-h>=0&&f-g>=0)return jl.subVectors(r,i),a=(d-h)/(d-h+(f-g)),e.copy(i).addScaledVector(jl,a);const p=1/(m+v+u);return o=v*p,a=u*p,e.copy(n).addScaledVector(Ni,o).addScaledVector(ki,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Mh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Xn={h:0,s:0,l:0},cr={h:0,s:0,l:0};function Uo(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}class Zt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ue){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,se.toWorkingColorSpace(this,e),this}setRGB(t,e,n,i=se.workingColorSpace){return this.r=t,this.g=e,this.b=n,se.toWorkingColorSpace(this,i),this}setHSL(t,e,n,i=se.workingColorSpace){if(t=cl(t,1),e=jt(e,0,1),n=jt(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=Uo(o,r,t+1/3),this.g=Uo(o,r,t),this.b=Uo(o,r,t-1/3)}return se.toWorkingColorSpace(this,i),this}setStyle(t,e=Ue){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=i[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ue){const n=Mh[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Fn(t.r),this.g=Fn(t.g),this.b=Fn(t.b),this}copyLinearToSRGB(t){return this.r=Ji(t.r),this.g=Ji(t.g),this.b=Ji(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ue){return se.fromWorkingColorSpace(Ge.copy(this),t),Math.round(jt(Ge.r*255,0,255))*65536+Math.round(jt(Ge.g*255,0,255))*256+Math.round(jt(Ge.b*255,0,255))}getHexString(t=Ue){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=se.workingColorSpace){se.fromWorkingColorSpace(Ge.copy(this),e);const n=Ge.r,i=Ge.g,r=Ge.b,o=Math.max(n,i,r),a=Math.min(n,i,r);let l,c;const h=(a+o)/2;if(a===o)l=0,c=0;else{const d=o-a;switch(c=h<=.5?d/(o+a):d/(2-o-a),o){case n:l=(i-r)/d+(i<r?6:0);break;case i:l=(r-n)/d+2;break;case r:l=(n-i)/d+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=se.workingColorSpace){return se.fromWorkingColorSpace(Ge.copy(this),e),t.r=Ge.r,t.g=Ge.g,t.b=Ge.b,t}getStyle(t=Ue){se.fromWorkingColorSpace(Ge.copy(this),t);const e=Ge.r,n=Ge.g,i=Ge.b;return t!==Ue?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(Xn),this.setHSL(Xn.h+t,Xn.s+e,Xn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Xn),t.getHSL(cr);const n=As(Xn.h,cr.h,e),i=As(Xn.s,cr.s,e),r=As(Xn.l,cr.l,e);return this.setHSL(n,i,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,i=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*i,this.g=r[1]*e+r[4]*n+r[7]*i,this.b=r[2]*e+r[5]*n+r[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ge=new Zt;Zt.NAMES=Mh;let Uu=0;class Si extends cs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Uu++}),this.uuid=Mi(),this.name="",this.type="Material",this.blending=Zi,this.side=ti,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=la,this.blendDst=ca,this.blendEquation=mi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Zt(0,0,0),this.blendAlpha=0,this.depthFunc=Qi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ul,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ai,this.stencilZFail=Ai,this.stencilZPass=Ai,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Zi&&(n.blending=this.blending),this.side!==ti&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==la&&(n.blendSrc=this.blendSrc),this.blendDst!==ca&&(n.blendDst=this.blendDst),this.blendEquation!==mi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Qi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ul&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ai&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ai&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ai&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(e){const r=i(t.textures),o=i(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const i=e.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Ds extends Si{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Zt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Bn,this.combine=oh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Re=new I,hr=new at;class Ze{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Nl,this.updateRanges=[],this.gpuType=Nn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)hr.fromBufferAttribute(this,e),hr.applyMatrix3(t),this.setXY(e,hr.x,hr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Re.fromBufferAttribute(this,e),Re.applyMatrix3(t),this.setXYZ(e,Re.x,Re.y,Re.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Re.fromBufferAttribute(this,e),Re.applyMatrix4(t),this.setXYZ(e,Re.x,Re.y,Re.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Re.fromBufferAttribute(this,e),Re.applyNormalMatrix(t),this.setXYZ(e,Re.x,Re.y,Re.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Re.fromBufferAttribute(this,e),Re.transformDirection(t),this.setXYZ(e,Re.x,Re.y,Re.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Xi(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Ve(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Xi(e,this.array)),e}setX(t,e){return this.normalized&&(e=Ve(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Xi(e,this.array)),e}setY(t,e){return this.normalized&&(e=Ve(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Xi(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Ve(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Xi(e,this.array)),e}setW(t,e){return this.normalized&&(e=Ve(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Ve(e,this.array),n=Ve(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=Ve(e,this.array),n=Ve(n,this.array),i=Ve(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t*=this.itemSize,this.normalized&&(e=Ve(e,this.array),n=Ve(n,this.array),i=Ve(i,this.array),r=Ve(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Nl&&(t.usage=this.usage),t}}class Sh extends Ze{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Th extends Ze{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class te extends Ze{constructor(t,e,n){super(new Float32Array(t),e,n)}}let Nu=0;const on=new ge,No=new Ce,Fi=new I,Qe=new zs,gs=new zs,De=new I;class we extends cs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Nu++}),this.uuid=Mi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(yh(t)?Th:Sh)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new $t().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return on.makeRotationFromQuaternion(t),this.applyMatrix4(on),this}rotateX(t){return on.makeRotationX(t),this.applyMatrix4(on),this}rotateY(t){return on.makeRotationY(t),this.applyMatrix4(on),this}rotateZ(t){return on.makeRotationZ(t),this.applyMatrix4(on),this}translate(t,e,n){return on.makeTranslation(t,e,n),this.applyMatrix4(on),this}scale(t,e,n){return on.makeScale(t,e,n),this.applyMatrix4(on),this}lookAt(t){return No.lookAt(t),No.updateMatrix(),this.applyMatrix4(No.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Fi).negate(),this.translate(Fi.x,Fi.y,Fi.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let i=0,r=t.length;i<r;i++){const o=t[i];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new te(n,3))}else{const n=Math.min(t.length,e.count);for(let i=0;i<n;i++){const r=t[i];e.setXYZ(i,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new zs);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new I(-1/0,-1/0,-1/0),new I(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){const r=e[n];Qe.setFromBufferAttribute(r),this.morphTargetsRelative?(De.addVectors(this.boundingBox.min,Qe.min),this.boundingBox.expandByPoint(De),De.addVectors(this.boundingBox.max,Qe.max),this.boundingBox.expandByPoint(De)):(this.boundingBox.expandByPoint(Qe.min),this.boundingBox.expandByPoint(Qe.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Gs);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new I,1/0);return}if(t){const n=this.boundingSphere.center;if(Qe.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];gs.setFromBufferAttribute(a),this.morphTargetsRelative?(De.addVectors(Qe.min,gs.min),Qe.expandByPoint(De),De.addVectors(Qe.max,gs.max),Qe.expandByPoint(De)):(Qe.expandByPoint(gs.min),Qe.expandByPoint(gs.max))}Qe.getCenter(n);let i=0;for(let r=0,o=t.count;r<o;r++)De.fromBufferAttribute(t,r),i=Math.max(i,n.distanceToSquared(De));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)De.fromBufferAttribute(a,c),l&&(Fi.fromBufferAttribute(t,c),De.add(Fi)),i=Math.max(i,n.distanceToSquared(De))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,i=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ze(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let P=0;P<n.count;P++)a[P]=new I,l[P]=new I;const c=new I,h=new I,d=new I,u=new at,f=new at,g=new at,v=new I,m=new I;function p(P,M,y){c.fromBufferAttribute(n,P),h.fromBufferAttribute(n,M),d.fromBufferAttribute(n,y),u.fromBufferAttribute(r,P),f.fromBufferAttribute(r,M),g.fromBufferAttribute(r,y),h.sub(c),d.sub(c),f.sub(u),g.sub(u);const D=1/(f.x*g.y-g.x*f.y);isFinite(D)&&(v.copy(h).multiplyScalar(g.y).addScaledVector(d,-f.y).multiplyScalar(D),m.copy(d).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(D),a[P].add(v),a[M].add(v),a[y].add(v),l[P].add(m),l[M].add(m),l[y].add(m))}let b=this.groups;b.length===0&&(b=[{start:0,count:t.count}]);for(let P=0,M=b.length;P<M;++P){const y=b[P],D=y.start,O=y.count;for(let B=D,V=D+O;B<V;B+=3)p(t.getX(B+0),t.getX(B+1),t.getX(B+2))}const x=new I,_=new I,L=new I,R=new I;function E(P){L.fromBufferAttribute(i,P),R.copy(L);const M=a[P];x.copy(M),x.sub(L.multiplyScalar(L.dot(M))).normalize(),_.crossVectors(R,M);const D=_.dot(l[P])<0?-1:1;o.setXYZW(P,x.x,x.y,x.z,D)}for(let P=0,M=b.length;P<M;++P){const y=b[P],D=y.start,O=y.count;for(let B=D,V=D+O;B<V;B+=3)E(t.getX(B+0)),E(t.getX(B+1)),E(t.getX(B+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ze(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let u=0,f=n.count;u<f;u++)n.setXYZ(u,0,0,0);const i=new I,r=new I,o=new I,a=new I,l=new I,c=new I,h=new I,d=new I;if(t)for(let u=0,f=t.count;u<f;u+=3){const g=t.getX(u+0),v=t.getX(u+1),m=t.getX(u+2);i.fromBufferAttribute(e,g),r.fromBufferAttribute(e,v),o.fromBufferAttribute(e,m),h.subVectors(o,r),d.subVectors(i,r),h.cross(d),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,m),a.add(h),l.add(h),c.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let u=0,f=e.count;u<f;u+=3)i.fromBufferAttribute(e,u+0),r.fromBufferAttribute(e,u+1),o.fromBufferAttribute(e,u+2),h.subVectors(o,r),d.subVectors(i,r),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)De.fromBufferAttribute(t,e),De.normalize(),t.setXYZ(e,De.x,De.y,De.z)}toNonIndexed(){function t(a,l){const c=a.array,h=a.itemSize,d=a.normalized,u=new c.constructor(l.length*h);let f=0,g=0;for(let v=0,m=l.length;v<m;v++){a.isInterleavedBufferAttribute?f=l[v]*a.data.stride+a.offset:f=l[v]*h;for(let p=0;p<h;p++)u[g++]=c[f++]}return new Ze(u,h,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new we,n=this.index.array,i=this.attributes;for(const a in i){const l=i[a],c=t(l,n);e.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let h=0,d=c.length;h<d;h++){const u=c[h],f=t(u,n);l.push(f)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const i={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){const f=c[d];h.push(f.toJSON(t.data))}h.length>0&&(i[l]=h,r=!0)}r&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const i=t.attributes;for(const c in i){const h=i[c];this.setAttribute(c,h.clone(e))}const r=t.morphAttributes;for(const c in r){const h=[],d=r[c];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let c=0,h=o.length;c<h;c++){const d=o[c];this.addGroup(d.start,d.count,d.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Zl=new ge,li=new ro,dr=new Gs,Kl=new I,ur=new I,fr=new I,pr=new I,ko=new I,mr=new I,Jl=new I,gr=new I;class It extends Ce{constructor(t=new we,e=new Ds){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(i,t);const a=this.morphTargetInfluences;if(r&&a){mr.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=a[l],d=r[l];h!==0&&(ko.fromBufferAttribute(d,t),o?mr.addScaledVector(ko,h):mr.addScaledVector(ko.sub(e),h))}e.add(mr)}return e}raycast(t,e){const n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),dr.copy(n.boundingSphere),dr.applyMatrix4(r),li.copy(t.ray).recast(t.near),!(dr.containsPoint(li.origin)===!1&&(li.intersectSphere(dr,Kl)===null||li.origin.distanceToSquared(Kl)>(t.far-t.near)**2))&&(Zl.copy(r).invert(),li.copy(t.ray).applyMatrix4(Zl),!(n.boundingBox!==null&&li.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,li)))}_computeIntersections(t,e,n){let i;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,v=u.length;g<v;g++){const m=u[g],p=o[m.materialIndex],b=Math.max(m.start,f.start),x=Math.min(a.count,Math.min(m.start+m.count,f.start+f.count));for(let _=b,L=x;_<L;_+=3){const R=a.getX(_),E=a.getX(_+1),P=a.getX(_+2);i=vr(this,p,t,n,c,h,d,R,E,P),i&&(i.faceIndex=Math.floor(_/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{const g=Math.max(0,f.start),v=Math.min(a.count,f.start+f.count);for(let m=g,p=v;m<p;m+=3){const b=a.getX(m),x=a.getX(m+1),_=a.getX(m+2);i=vr(this,o,t,n,c,h,d,b,x,_),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,v=u.length;g<v;g++){const m=u[g],p=o[m.materialIndex],b=Math.max(m.start,f.start),x=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let _=b,L=x;_<L;_+=3){const R=_,E=_+1,P=_+2;i=vr(this,p,t,n,c,h,d,R,E,P),i&&(i.faceIndex=Math.floor(_/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{const g=Math.max(0,f.start),v=Math.min(l.count,f.start+f.count);for(let m=g,p=v;m<p;m+=3){const b=m,x=m+1,_=m+2;i=vr(this,o,t,n,c,h,d,b,x,_),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}}}function ku(s,t,e,n,i,r,o,a){let l;if(t.side===je?l=n.intersectTriangle(o,r,i,!0,a):l=n.intersectTriangle(i,r,o,t.side===ti,a),l===null)return null;gr.copy(a),gr.applyMatrix4(s.matrixWorld);const c=e.ray.origin.distanceTo(gr);return c<e.near||c>e.far?null:{distance:c,point:gr.clone(),object:s}}function vr(s,t,e,n,i,r,o,a,l,c){s.getVertexPosition(a,ur),s.getVertexPosition(l,fr),s.getVertexPosition(c,pr);const h=ku(s,t,e,n,ur,fr,pr,Jl);if(h){const d=new I;gn.getBarycoord(Jl,ur,fr,pr,d),i&&(h.uv=gn.getInterpolatedAttribute(i,a,l,c,d,new at)),r&&(h.uv1=gn.getInterpolatedAttribute(r,a,l,c,d,new at)),o&&(h.normal=gn.getInterpolatedAttribute(o,a,l,c,d,new I),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a,b:l,c,normal:new I,materialIndex:0};gn.getNormal(ur,fr,pr,u.normal),h.face=u,h.barycoord=d}return h}class _e extends we{constructor(t=1,e=1,n=1,i=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:r,depthSegments:o};const a=this;i=Math.floor(i),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],h=[],d=[];let u=0,f=0;g("z","y","x",-1,-1,n,e,t,o,r,0),g("z","y","x",1,-1,n,e,-t,o,r,1),g("x","z","y",1,1,t,n,e,i,o,2),g("x","z","y",1,-1,t,n,-e,i,o,3),g("x","y","z",1,-1,t,e,n,i,r,4),g("x","y","z",-1,-1,t,e,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new te(c,3)),this.setAttribute("normal",new te(h,3)),this.setAttribute("uv",new te(d,2));function g(v,m,p,b,x,_,L,R,E,P,M){const y=_/E,D=L/P,O=_/2,B=L/2,V=R/2,$=E+1,X=P+1;let K=0,W=0;const lt=new I;for(let yt=0;yt<X;yt++){const Et=yt*D-B;for(let Wt=0;Wt<$;Wt++){const ae=Wt*y-O;lt[v]=ae*b,lt[m]=Et*x,lt[p]=V,c.push(lt.x,lt.y,lt.z),lt[v]=0,lt[m]=0,lt[p]=R>0?1:-1,h.push(lt.x,lt.y,lt.z),d.push(Wt/E),d.push(1-yt/P),K+=1}}for(let yt=0;yt<P;yt++)for(let Et=0;Et<E;Et++){const Wt=u+Et+$*yt,ae=u+Et+$*(yt+1),Z=u+(Et+1)+$*(yt+1),ot=u+(Et+1)+$*yt;l.push(Wt,ae,ot),l.push(ae,Z,ot),W+=6}a.addGroup(f,W,M),f+=W,u+=K}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new _e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function os(s){const t={};for(const e in s){t[e]={};for(const n in s[e]){const i=s[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function We(s){const t={};for(let e=0;e<s.length;e++){const n=os(s[e]);for(const i in n)t[i]=n[i]}return t}function Fu(s){const t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}function Eh(s){const t=s.getRenderTarget();return t===null?s.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:se.workingColorSpace}const Ou={clone:os,merge:We};var Bu=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,zu=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ei extends Si{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Bu,this.fragmentShader=zu,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=os(t.uniforms),this.uniformsGroups=Fu(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?e.uniforms[i]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[i]={type:"m4",value:o.toArray()}:e.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Ah extends Ce{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ge,this.projectionMatrix=new ge,this.projectionMatrixInverse=new ge,this.coordinateSystem=kn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const $n=new I,Ql=new at,tc=new at;class tn extends Ah{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Is*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Es*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Is*2*Math.atan(Math.tan(Es*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){$n.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set($n.x,$n.y).multiplyScalar(-t/$n.z),$n.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set($n.x,$n.y).multiplyScalar(-t/$n.z)}getViewSize(t,e){return this.getViewBounds(t,Ql,tc),e.subVectors(tc,Ql)}setViewOffset(t,e,n,i,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Es*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,r=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*i/l,e-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Oi=-90,Bi=1;class Gu extends Ce{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new tn(Oi,Bi,t,e);i.layers=this.layers,this.add(i);const r=new tn(Oi,Bi,t,e);r.layers=this.layers,this.add(r);const o=new tn(Oi,Bi,t,e);o.layers=this.layers,this.add(o);const a=new tn(Oi,Bi,t,e);a.layers=this.layers,this.add(a);const l=new tn(Oi,Bi,t,e);l.layers=this.layers,this.add(l);const c=new tn(Oi,Bi,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,i,r,o,a,l]=e;for(const c of e)this.remove(c);if(t===kn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Xr)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,h]=this.children,d=t.getRenderTarget(),u=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,i),t.render(e,r),t.setRenderTarget(n,1,i),t.render(e,o),t.setRenderTarget(n,2,i),t.render(e,a),t.setRenderTarget(n,3,i),t.render(e,l),t.setRenderTarget(n,4,i),t.render(e,c),n.texture.generateMipmaps=v,t.setRenderTarget(n,5,i),t.render(e,h),t.setRenderTarget(d,u,f),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Rh extends Oe{constructor(t,e,n,i,r,o,a,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:ts,super(t,e,n,i,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Hu extends yi{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new Rh(i,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:wn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new _e(5,5,5),r=new ei({name:"CubemapFromEquirect",uniforms:os(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:je,blending:Kn});r.uniforms.tEquirect.value=e;const o=new It(i,r),a=e.minFilter;return e.minFilter===_i&&(e.minFilter=wn),new Gu(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,i){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,i);t.setRenderTarget(r)}}class Yr{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new Zt(t),this.near=e,this.far=n}clone(){return new Yr(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Vu extends Ce{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Bn,this.environmentIntensity=1,this.environmentRotation=new Bn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class Wu extends Oe{constructor(t=null,e=1,n=1,i,r,o,a,l,c=Xe,h=Xe,d,u){super(null,o,a,l,c,h,i,r,d,u),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Fo=new I,Xu=new I,$u=new $t;class ui{constructor(t=new I(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const i=Fo.subVectors(n,e).cross(Xu.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(Fo),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||$u.getNormalMatrix(t),i=this.coplanarPoint(Fo).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ci=new Gs,_r=new I;class dl{constructor(t=new ui,e=new ui,n=new ui,i=new ui,r=new ui,o=new ui){this.planes=[t,e,n,i,r,o]}set(t,e,n,i,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(i),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=kn){const n=this.planes,i=t.elements,r=i[0],o=i[1],a=i[2],l=i[3],c=i[4],h=i[5],d=i[6],u=i[7],f=i[8],g=i[9],v=i[10],m=i[11],p=i[12],b=i[13],x=i[14],_=i[15];if(n[0].setComponents(l-r,u-c,m-f,_-p).normalize(),n[1].setComponents(l+r,u+c,m+f,_+p).normalize(),n[2].setComponents(l+o,u+h,m+g,_+b).normalize(),n[3].setComponents(l-o,u-h,m-g,_-b).normalize(),n[4].setComponents(l-a,u-d,m-v,_-x).normalize(),e===kn)n[5].setComponents(l+a,u+d,m+v,_+x).normalize();else if(e===Xr)n[5].setComponents(a,d,v,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),ci.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),ci.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(ci)}intersectsSprite(t){return ci.center.set(0,0,0),ci.radius=.7071067811865476,ci.applyMatrix4(t.matrixWorld),this.intersectsSphere(ci)}intersectsSphere(t){const e=this.planes,n=t.center,i=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const i=e[n];if(_r.x=i.normal.x>0?t.max.x:t.min.x,_r.y=i.normal.y>0?t.max.y:t.min.y,_r.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(_r)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Ch extends Si{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Zt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const qr=new I,jr=new I,ec=new ge,vs=new ro,xr=new Gs,Oo=new I,nc=new I;class Yu extends Ce{constructor(t=new we,e=new Ch){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let i=1,r=e.count;i<r;i++)qr.fromBufferAttribute(e,i-1),jr.fromBufferAttribute(e,i),n[i]=n[i-1],n[i]+=qr.distanceTo(jr);t.setAttribute("lineDistance",new te(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,r=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),xr.copy(n.boundingSphere),xr.applyMatrix4(i),xr.radius+=r,t.ray.intersectsSphere(xr)===!1)return;ec.copy(i).invert(),vs.copy(t.ray).applyMatrix4(ec);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,h=n.index,u=n.attributes.position;if(h!==null){const f=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let v=f,m=g-1;v<m;v+=c){const p=h.getX(v),b=h.getX(v+1),x=yr(this,t,vs,l,p,b);x&&e.push(x)}if(this.isLineLoop){const v=h.getX(g-1),m=h.getX(f),p=yr(this,t,vs,l,v,m);p&&e.push(p)}}else{const f=Math.max(0,o.start),g=Math.min(u.count,o.start+o.count);for(let v=f,m=g-1;v<m;v+=c){const p=yr(this,t,vs,l,v,v+1);p&&e.push(p)}if(this.isLineLoop){const v=yr(this,t,vs,l,g-1,f);v&&e.push(v)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function yr(s,t,e,n,i,r){const o=s.geometry.attributes.position;if(qr.fromBufferAttribute(o,i),jr.fromBufferAttribute(o,r),e.distanceSqToSegment(qr,jr,Oo,nc)>n)return;Oo.applyMatrix4(s.matrixWorld);const l=t.ray.origin.distanceTo(Oo);if(!(l<t.near||l>t.far))return{distance:l,point:nc.clone().applyMatrix4(s.matrixWorld),index:i,face:null,faceIndex:null,barycoord:null,object:s}}class Hs extends Si{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Zt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const ic=new ge,$a=new ro,br=new Gs,wr=new I;class oo extends Ce{constructor(t=new we,e=new Hs){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,r=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),br.copy(n.boundingSphere),br.applyMatrix4(i),br.radius+=r,t.ray.intersectsSphere(br)===!1)return;ic.copy(i).invert(),$a.copy(t.ray).applyMatrix4(ic);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,d=n.attributes.position;if(c!==null){const u=Math.max(0,o.start),f=Math.min(c.count,o.start+o.count);for(let g=u,v=f;g<v;g++){const m=c.getX(g);wr.fromBufferAttribute(d,m),sc(wr,m,l,i,t,e,this)}}else{const u=Math.max(0,o.start),f=Math.min(d.count,o.start+o.count);for(let g=u,v=f;g<v;g++)wr.fromBufferAttribute(d,g),sc(wr,g,l,i,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function sc(s,t,e,n,i,r,o){const a=$a.distanceSqToPoint(s);if(a<e){const l=new I;$a.closestPointToPoint(s,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}class nt extends Ce{constructor(){super(),this.isGroup=!0,this.type="Group"}}class Vs extends Oe{constructor(t,e,n,i,r,o,a,l,c){super(t,e,n,i,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Lh extends Oe{constructor(t,e,n,i,r,o,a,l,c,h=Ki){if(h!==Ki&&h!==ss)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Ki&&(n=xi),n===void 0&&h===ss&&(n=is),super(null,i,r,o,a,l,h,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:Xe,this.minFilter=l!==void 0?l:Xe,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class Sn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,i=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(i),e.push(r),i=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let i=0;const r=n.length;let o;e?o=e:o=t*n[r-1];let a=0,l=r-1,c;for(;a<=l;)if(i=Math.floor(a+(l-a)/2),c=n[i]-o,c<0)a=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===o)return i/(r-1);const h=n[i],u=n[i+1]-h,f=(o-h)/u;return(i+f)/(r-1)}getTangent(t,e){let i=t-1e-4,r=t+1e-4;i<0&&(i=0),r>1&&(r=1);const o=this.getPoint(i),a=this.getPoint(r),l=e||(o.isVector2?new at:new I);return l.copy(a).sub(o).normalize(),l}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new I,i=[],r=[],o=[],a=new I,l=new ge;for(let f=0;f<=t;f++){const g=f/t;i[f]=this.getTangentAt(g,new I)}r[0]=new I,o[0]=new I;let c=Number.MAX_VALUE;const h=Math.abs(i[0].x),d=Math.abs(i[0].y),u=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,0,0)),d<=c&&(c=d,n.set(0,1,0)),u<=c&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],a),o[0].crossVectors(i[0],r[0]);for(let f=1;f<=t;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(i[f-1],i[f]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(jt(i[f-1].dot(i[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(a,g))}o[f].crossVectors(i[f],r[f])}if(e===!0){let f=Math.acos(jt(r[0].dot(r[t]),-1,1));f/=t,i[0].dot(a.crossVectors(r[0],r[t]))>0&&(f=-f);for(let g=1;g<=t;g++)r[g].applyMatrix4(l.makeRotationAxis(i[g],f*g)),o[g].crossVectors(i[g],r[g])}return{tangents:i,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class ul extends Sn{constructor(t=0,e=0,n=1,i=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(t,e=new at){const n=e,i=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(o?r=0:r=i),this.aClockwise===!0&&!o&&(r===i?r=-i:r=r-i);const a=this.aStartAngle+t*r;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),d=Math.sin(this.aRotation),u=l-this.aX,f=c-this.aY;l=u*h-f*d+this.aX,c=u*d+f*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class qu extends ul{constructor(t,e,n,i,r,o){super(t,e,n,n,i,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function fl(){let s=0,t=0,e=0,n=0;function i(r,o,a,l){s=r,t=a,e=-3*r+3*o-2*a-l,n=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){i(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,h,d){let u=(o-r)/c-(a-r)/(c+h)+(a-o)/h,f=(a-o)/h-(l-o)/(h+d)+(l-a)/d;u*=h,f*=h,i(o,a,u,f)},calc:function(r){const o=r*r,a=o*r;return s+t*r+e*o+n*a}}}const Mr=new I,Bo=new fl,zo=new fl,Go=new fl;class Ph extends Sn{constructor(t=[],e=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=i}getPoint(t,e=new I){const n=e,i=this.points,r=i.length,o=(r-(this.closed?0:1))*t;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,h;this.closed||a>0?c=i[(a-1)%r]:(Mr.subVectors(i[0],i[1]).add(i[0]),c=Mr);const d=i[a%r],u=i[(a+1)%r];if(this.closed||a+2<r?h=i[(a+2)%r]:(Mr.subVectors(i[r-1],i[r-2]).add(i[r-1]),h=Mr),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(d),f),v=Math.pow(d.distanceToSquared(u),f),m=Math.pow(u.distanceToSquared(h),f);v<1e-4&&(v=1),g<1e-4&&(g=v),m<1e-4&&(m=v),Bo.initNonuniformCatmullRom(c.x,d.x,u.x,h.x,g,v,m),zo.initNonuniformCatmullRom(c.y,d.y,u.y,h.y,g,v,m),Go.initNonuniformCatmullRom(c.z,d.z,u.z,h.z,g,v,m)}else this.curveType==="catmullrom"&&(Bo.initCatmullRom(c.x,d.x,u.x,h.x,this.tension),zo.initCatmullRom(c.y,d.y,u.y,h.y,this.tension),Go.initCatmullRom(c.z,d.z,u.z,h.z,this.tension));return n.set(Bo.calc(l),zo.calc(l),Go.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new I().fromArray(i))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function rc(s,t,e,n,i){const r=(n-t)*.5,o=(i-e)*.5,a=s*s,l=s*a;return(2*e-2*n+r+o)*l+(-3*e+3*n-2*r-o)*a+r*s+e}function ju(s,t){const e=1-s;return e*e*t}function Zu(s,t){return 2*(1-s)*s*t}function Ku(s,t){return s*s*t}function Rs(s,t,e,n){return ju(s,t)+Zu(s,e)+Ku(s,n)}function Ju(s,t){const e=1-s;return e*e*e*t}function Qu(s,t){const e=1-s;return 3*e*e*s*t}function tf(s,t){return 3*(1-s)*s*s*t}function ef(s,t){return s*s*s*t}function Cs(s,t,e,n,i){return Ju(s,t)+Qu(s,e)+tf(s,n)+ef(s,i)}class Ih extends Sn{constructor(t=new at,e=new at,n=new at,i=new at){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new at){const n=e,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Cs(t,i.x,r.x,o.x,a.x),Cs(t,i.y,r.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class nf extends Sn{constructor(t=new I,e=new I,n=new I,i=new I){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new I){const n=e,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Cs(t,i.x,r.x,o.x,a.x),Cs(t,i.y,r.y,o.y,a.y),Cs(t,i.z,r.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Dh extends Sn{constructor(t=new at,e=new at){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new at){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new at){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class sf extends Sn{constructor(t=new I,e=new I){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new I){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new I){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Uh extends Sn{constructor(t=new at,e=new at,n=new at){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new at){const n=e,i=this.v0,r=this.v1,o=this.v2;return n.set(Rs(t,i.x,r.x,o.x),Rs(t,i.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Nh extends Sn{constructor(t=new I,e=new I,n=new I){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new I){const n=e,i=this.v0,r=this.v1,o=this.v2;return n.set(Rs(t,i.x,r.x,o.x),Rs(t,i.y,r.y,o.y),Rs(t,i.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class kh extends Sn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new at){const n=e,i=this.points,r=(i.length-1)*t,o=Math.floor(r),a=r-o,l=i[o===0?o:o-1],c=i[o],h=i[o>i.length-2?i.length-1:o+1],d=i[o>i.length-3?i.length-1:o+2];return n.set(rc(a,l.x,c.x,h.x,d.x),rc(a,l.y,c.y,h.y,d.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new at().fromArray(i))}return this}}var Zr=Object.freeze({__proto__:null,ArcCurve:qu,CatmullRomCurve3:Ph,CubicBezierCurve:Ih,CubicBezierCurve3:nf,EllipseCurve:ul,LineCurve:Dh,LineCurve3:sf,QuadraticBezierCurve:Uh,QuadraticBezierCurve3:Nh,SplineCurve:kh});class rf extends Sn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Zr[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),i=this.getCurveLengths();let r=0;for(;r<i.length;){if(i[r]>=n){const o=i[r]-n,a=this.curves[r],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,i=this.curves.length;n<i;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let i=0,r=this.curves;i<r.length;i++){const o=r[i],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,l=o.getPoints(a);for(let c=0;c<l.length;c++){const h=l[c];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(i.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const i=this.curves[e];t.curves.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(new Zr[i.type]().fromJSON(i))}return this}}class Kr extends rf{constructor(t){super(),this.type="Path",this.currentPoint=new at,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new Dh(this.currentPoint.clone(),new at(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,i){const r=new Uh(this.currentPoint.clone(),new at(t,e),new at(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(t,e,n,i,r,o){const a=new Ih(this.currentPoint.clone(),new at(t,e),new at(n,i),new at(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new kh(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,i,r,o){const a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+a,e+l,n,i,r,o),this}absarc(t,e,n,i,r,o){return this.absellipse(t,e,n,n,i,r,o),this}ellipse(t,e,n,i,r,o,a,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,n,i,r,o,a,l),this}absellipse(t,e,n,i,r,o,a,l){const c=new ul(t,e,n,i,r,o,a,l);if(this.curves.length>0){const d=c.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class Ws extends we{constructor(t=1,e=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:i},e=Math.max(3,e);const r=[],o=[],a=[],l=[],c=new I,h=new at;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let d=0,u=3;d<=e;d++,u+=3){const f=n+d/e*i;c.x=t*Math.cos(f),c.y=t*Math.sin(f),o.push(c.x,c.y,c.z),a.push(0,0,1),h.x=(o[u]/t+1)/2,h.y=(o[u+1]/t+1)/2,l.push(h.x,h.y)}for(let d=1;d<=e;d++)r.push(d,d+1,0);this.setIndex(r),this.setAttribute("position",new te(o,3)),this.setAttribute("normal",new te(a,3)),this.setAttribute("uv",new te(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ws(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class Pt extends we{constructor(t=1,e=1,n=1,i=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};const c=this;i=Math.floor(i),r=Math.floor(r);const h=[],d=[],u=[],f=[];let g=0;const v=[],m=n/2;let p=0;b(),o===!1&&(t>0&&x(!0),e>0&&x(!1)),this.setIndex(h),this.setAttribute("position",new te(d,3)),this.setAttribute("normal",new te(u,3)),this.setAttribute("uv",new te(f,2));function b(){const _=new I,L=new I;let R=0;const E=(e-t)/n;for(let P=0;P<=r;P++){const M=[],y=P/r,D=y*(e-t)+t;for(let O=0;O<=i;O++){const B=O/i,V=B*l+a,$=Math.sin(V),X=Math.cos(V);L.x=D*$,L.y=-y*n+m,L.z=D*X,d.push(L.x,L.y,L.z),_.set($,E,X).normalize(),u.push(_.x,_.y,_.z),f.push(B,1-y),M.push(g++)}v.push(M)}for(let P=0;P<i;P++)for(let M=0;M<r;M++){const y=v[M][P],D=v[M+1][P],O=v[M+1][P+1],B=v[M][P+1];(t>0||M!==0)&&(h.push(y,D,B),R+=3),(e>0||M!==r-1)&&(h.push(D,O,B),R+=3)}c.addGroup(p,R,0),p+=R}function x(_){const L=g,R=new at,E=new I;let P=0;const M=_===!0?t:e,y=_===!0?1:-1;for(let O=1;O<=i;O++)d.push(0,m*y,0),u.push(0,y,0),f.push(.5,.5),g++;const D=g;for(let O=0;O<=i;O++){const V=O/i*l+a,$=Math.cos(V),X=Math.sin(V);E.x=M*X,E.y=m*y,E.z=M*$,d.push(E.x,E.y,E.z),u.push(0,y,0),R.x=$*.5+.5,R.y=X*.5*y+.5,f.push(R.x,R.y),g++}for(let O=0;O<i;O++){const B=L+O,V=D+O;_===!0?h.push(V,V+1,B):h.push(V+1,V,B),P+=3}c.addGroup(p,P,_===!0?1:2),p+=P}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Pt(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class $e extends Pt{constructor(t=1,e=1,n=32,i=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,i,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new $e(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class ao extends we{constructor(t=[],e=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:i};const r=[],o=[];a(i),c(n),h(),this.setAttribute("position",new te(r,3)),this.setAttribute("normal",new te(r.slice(),3)),this.setAttribute("uv",new te(o,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function a(b){const x=new I,_=new I,L=new I;for(let R=0;R<e.length;R+=3)f(e[R+0],x),f(e[R+1],_),f(e[R+2],L),l(x,_,L,b)}function l(b,x,_,L){const R=L+1,E=[];for(let P=0;P<=R;P++){E[P]=[];const M=b.clone().lerp(_,P/R),y=x.clone().lerp(_,P/R),D=R-P;for(let O=0;O<=D;O++)O===0&&P===R?E[P][O]=M:E[P][O]=M.clone().lerp(y,O/D)}for(let P=0;P<R;P++)for(let M=0;M<2*(R-P)-1;M++){const y=Math.floor(M/2);M%2===0?(u(E[P][y+1]),u(E[P+1][y]),u(E[P][y])):(u(E[P][y+1]),u(E[P+1][y+1]),u(E[P+1][y]))}}function c(b){const x=new I;for(let _=0;_<r.length;_+=3)x.x=r[_+0],x.y=r[_+1],x.z=r[_+2],x.normalize().multiplyScalar(b),r[_+0]=x.x,r[_+1]=x.y,r[_+2]=x.z}function h(){const b=new I;for(let x=0;x<r.length;x+=3){b.x=r[x+0],b.y=r[x+1],b.z=r[x+2];const _=m(b)/2/Math.PI+.5,L=p(b)/Math.PI+.5;o.push(_,1-L)}g(),d()}function d(){for(let b=0;b<o.length;b+=6){const x=o[b+0],_=o[b+2],L=o[b+4],R=Math.max(x,_,L),E=Math.min(x,_,L);R>.9&&E<.1&&(x<.2&&(o[b+0]+=1),_<.2&&(o[b+2]+=1),L<.2&&(o[b+4]+=1))}}function u(b){r.push(b.x,b.y,b.z)}function f(b,x){const _=b*3;x.x=t[_+0],x.y=t[_+1],x.z=t[_+2]}function g(){const b=new I,x=new I,_=new I,L=new I,R=new at,E=new at,P=new at;for(let M=0,y=0;M<r.length;M+=9,y+=6){b.set(r[M+0],r[M+1],r[M+2]),x.set(r[M+3],r[M+4],r[M+5]),_.set(r[M+6],r[M+7],r[M+8]),R.set(o[y+0],o[y+1]),E.set(o[y+2],o[y+3]),P.set(o[y+4],o[y+5]),L.copy(b).add(x).add(_).divideScalar(3);const D=m(L);v(R,y+0,b,D),v(E,y+2,x,D),v(P,y+4,_,D)}}function v(b,x,_,L){L<0&&b.x===1&&(o[x]=b.x-1),_.x===0&&_.z===0&&(o[x]=L/2/Math.PI+.5)}function m(b){return Math.atan2(b.z,-b.x)}function p(b){return Math.atan2(-b.y,Math.sqrt(b.x*b.x+b.z*b.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ao(t.vertices,t.indices,t.radius,t.details)}}class zn extends Kr{constructor(t){super(t),this.uuid=Mi(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,i=this.holes.length;n<i;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const i=t.holes[e];this.holes.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const i=this.holes[e];t.holes.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const i=t.holes[e];this.holes.push(new Kr().fromJSON(i))}return this}}const of={triangulate:function(s,t,e=2){const n=t&&t.length,i=n?t[0]*e:s.length;let r=Fh(s,0,i,e,!0);const o=[];if(!r||r.next===r.prev)return o;let a,l,c,h,d,u,f;if(n&&(r=df(s,t,r,e)),s.length>80*e){a=c=s[0],l=h=s[1];for(let g=e;g<i;g+=e)d=s[g],u=s[g+1],d<a&&(a=d),u<l&&(l=u),d>c&&(c=d),u>h&&(h=u);f=Math.max(c-a,h-l),f=f!==0?32767/f:0}return Us(r,o,e,a,l,f,0),o}};function Fh(s,t,e,n,i){let r,o;if(i===wf(s,t,e,n)>0)for(r=t;r<e;r+=n)o=oc(r,s[r],s[r+1],o);else for(r=e-n;r>=t;r-=n)o=oc(r,s[r],s[r+1],o);return o&&lo(o,o.next)&&(ks(o),o=o.next),o}function bi(s,t){if(!s)return s;t||(t=s);let e=s,n;do if(n=!1,!e.steiner&&(lo(e,e.next)||be(e.prev,e,e.next)===0)){if(ks(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function Us(s,t,e,n,i,r,o){if(!s)return;!o&&r&&gf(s,n,i,r);let a=s,l,c;for(;s.prev!==s.next;){if(l=s.prev,c=s.next,r?lf(s,n,i,r):af(s)){t.push(l.i/e|0),t.push(s.i/e|0),t.push(c.i/e|0),ks(s),s=c.next,a=c.next;continue}if(s=c,s===a){o?o===1?(s=cf(bi(s),t,e),Us(s,t,e,n,i,r,2)):o===2&&hf(s,t,e,n,i,r):Us(bi(s),t,e,n,i,r,1);break}}}function af(s){const t=s.prev,e=s,n=s.next;if(be(t,e,n)>=0)return!1;const i=t.x,r=e.x,o=n.x,a=t.y,l=e.y,c=n.y,h=i<r?i<o?i:o:r<o?r:o,d=a<l?a<c?a:c:l<c?l:c,u=i>r?i>o?i:o:r>o?r:o,f=a>l?a>c?a:c:l>c?l:c;let g=n.next;for(;g!==t;){if(g.x>=h&&g.x<=u&&g.y>=d&&g.y<=f&&qi(i,a,r,l,o,c,g.x,g.y)&&be(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function lf(s,t,e,n){const i=s.prev,r=s,o=s.next;if(be(i,r,o)>=0)return!1;const a=i.x,l=r.x,c=o.x,h=i.y,d=r.y,u=o.y,f=a<l?a<c?a:c:l<c?l:c,g=h<d?h<u?h:u:d<u?d:u,v=a>l?a>c?a:c:l>c?l:c,m=h>d?h>u?h:u:d>u?d:u,p=Ya(f,g,t,e,n),b=Ya(v,m,t,e,n);let x=s.prevZ,_=s.nextZ;for(;x&&x.z>=p&&_&&_.z<=b;){if(x.x>=f&&x.x<=v&&x.y>=g&&x.y<=m&&x!==i&&x!==o&&qi(a,h,l,d,c,u,x.x,x.y)&&be(x.prev,x,x.next)>=0||(x=x.prevZ,_.x>=f&&_.x<=v&&_.y>=g&&_.y<=m&&_!==i&&_!==o&&qi(a,h,l,d,c,u,_.x,_.y)&&be(_.prev,_,_.next)>=0))return!1;_=_.nextZ}for(;x&&x.z>=p;){if(x.x>=f&&x.x<=v&&x.y>=g&&x.y<=m&&x!==i&&x!==o&&qi(a,h,l,d,c,u,x.x,x.y)&&be(x.prev,x,x.next)>=0)return!1;x=x.prevZ}for(;_&&_.z<=b;){if(_.x>=f&&_.x<=v&&_.y>=g&&_.y<=m&&_!==i&&_!==o&&qi(a,h,l,d,c,u,_.x,_.y)&&be(_.prev,_,_.next)>=0)return!1;_=_.nextZ}return!0}function cf(s,t,e){let n=s;do{const i=n.prev,r=n.next.next;!lo(i,r)&&Oh(i,n,n.next,r)&&Ns(i,r)&&Ns(r,i)&&(t.push(i.i/e|0),t.push(n.i/e|0),t.push(r.i/e|0),ks(n),ks(n.next),n=s=r),n=n.next}while(n!==s);return bi(n)}function hf(s,t,e,n,i,r){let o=s;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&xf(o,a)){let l=Bh(o,a);o=bi(o,o.next),l=bi(l,l.next),Us(o,t,e,n,i,r,0),Us(l,t,e,n,i,r,0);return}a=a.next}o=o.next}while(o!==s)}function df(s,t,e,n){const i=[];let r,o,a,l,c;for(r=0,o=t.length;r<o;r++)a=t[r]*n,l=r<o-1?t[r+1]*n:s.length,c=Fh(s,a,l,n,!1),c===c.next&&(c.steiner=!0),i.push(_f(c));for(i.sort(uf),r=0;r<i.length;r++)e=ff(i[r],e);return e}function uf(s,t){return s.x-t.x}function ff(s,t){const e=pf(s,t);if(!e)return t;const n=Bh(e,s);return bi(n,n.next),bi(e,e.next)}function pf(s,t){let e=t,n=-1/0,i;const r=s.x,o=s.y;do{if(o<=e.y&&o>=e.next.y&&e.next.y!==e.y){const u=e.x+(o-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(u<=r&&u>n&&(n=u,i=e.x<e.next.x?e:e.next,u===r))return i}e=e.next}while(e!==t);if(!i)return null;const a=i,l=i.x,c=i.y;let h=1/0,d;e=i;do r>=e.x&&e.x>=l&&r!==e.x&&qi(o<c?r:n,o,l,c,o<c?n:r,o,e.x,e.y)&&(d=Math.abs(o-e.y)/(r-e.x),Ns(e,s)&&(d<h||d===h&&(e.x>i.x||e.x===i.x&&mf(i,e)))&&(i=e,h=d)),e=e.next;while(e!==a);return i}function mf(s,t){return be(s.prev,s,t.prev)<0&&be(t.next,s,s.next)<0}function gf(s,t,e,n){let i=s;do i.z===0&&(i.z=Ya(i.x,i.y,t,e,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==s);i.prevZ.nextZ=null,i.prevZ=null,vf(i)}function vf(s){let t,e,n,i,r,o,a,l,c=1;do{for(e=s,s=null,r=null,o=0;e;){for(o++,n=e,a=0,t=0;t<c&&(a++,n=n.nextZ,!!n);t++);for(l=c;a>0||l>0&&n;)a!==0&&(l===0||!n||e.z<=n.z)?(i=e,e=e.nextZ,a--):(i=n,n=n.nextZ,l--),r?r.nextZ=i:s=i,i.prevZ=r,r=i;e=n}r.nextZ=null,c*=2}while(o>1);return s}function Ya(s,t,e,n,i){return s=(s-e)*i|0,t=(t-n)*i|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,s|t<<1}function _f(s){let t=s,e=s;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==s);return e}function qi(s,t,e,n,i,r,o,a){return(i-o)*(t-a)>=(s-o)*(r-a)&&(s-o)*(n-a)>=(e-o)*(t-a)&&(e-o)*(r-a)>=(i-o)*(n-a)}function xf(s,t){return s.next.i!==t.i&&s.prev.i!==t.i&&!yf(s,t)&&(Ns(s,t)&&Ns(t,s)&&bf(s,t)&&(be(s.prev,s,t.prev)||be(s,t.prev,t))||lo(s,t)&&be(s.prev,s,s.next)>0&&be(t.prev,t,t.next)>0)}function be(s,t,e){return(t.y-s.y)*(e.x-t.x)-(t.x-s.x)*(e.y-t.y)}function lo(s,t){return s.x===t.x&&s.y===t.y}function Oh(s,t,e,n){const i=Tr(be(s,t,e)),r=Tr(be(s,t,n)),o=Tr(be(e,n,s)),a=Tr(be(e,n,t));return!!(i!==r&&o!==a||i===0&&Sr(s,e,t)||r===0&&Sr(s,n,t)||o===0&&Sr(e,s,n)||a===0&&Sr(e,t,n))}function Sr(s,t,e){return t.x<=Math.max(s.x,e.x)&&t.x>=Math.min(s.x,e.x)&&t.y<=Math.max(s.y,e.y)&&t.y>=Math.min(s.y,e.y)}function Tr(s){return s>0?1:s<0?-1:0}function yf(s,t){let e=s;do{if(e.i!==s.i&&e.next.i!==s.i&&e.i!==t.i&&e.next.i!==t.i&&Oh(e,e.next,s,t))return!0;e=e.next}while(e!==s);return!1}function Ns(s,t){return be(s.prev,s,s.next)<0?be(s,t,s.next)>=0&&be(s,s.prev,t)>=0:be(s,t,s.prev)<0||be(s,s.next,t)<0}function bf(s,t){let e=s,n=!1;const i=(s.x+t.x)/2,r=(s.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&i<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==s);return n}function Bh(s,t){const e=new qa(s.i,s.x,s.y),n=new qa(t.i,t.x,t.y),i=s.next,r=t.prev;return s.next=t,t.prev=s,e.next=i,i.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function oc(s,t,e,n){const i=new qa(s,t,e);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function ks(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function qa(s,t,e){this.i=s,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function wf(s,t,e,n){let i=0;for(let r=t,o=e-n;r<e;r+=n)i+=(s[o]-s[r])*(s[r+1]+s[o+1]),o=r;return i}class Qn{static area(t){const e=t.length;let n=0;for(let i=e-1,r=0;r<e;i=r++)n+=t[i].x*t[r].y-t[r].x*t[i].y;return n*.5}static isClockWise(t){return Qn.area(t)<0}static triangulateShape(t,e){const n=[],i=[],r=[];ac(t),lc(n,t);let o=t.length;e.forEach(ac);for(let l=0;l<e.length;l++)i.push(o),o+=e[l].length,lc(n,e[l]);const a=of.triangulate(n,i);for(let l=0;l<a.length;l+=3)r.push(a.slice(l,l+3));return r}}function ac(s){const t=s.length;t>2&&s[t-1].equals(s[0])&&s.pop()}function lc(s,t){for(let e=0;e<t.length;e++)s.push(t[e].x),s.push(t[e].y)}class ni extends we{constructor(t=new zn([new at(.5,.5),new at(-.5,.5),new at(-.5,-.5),new at(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];const n=this,i=[],r=[];for(let a=0,l=t.length;a<l;a++){const c=t[a];o(c)}this.setAttribute("position",new te(i,3)),this.setAttribute("uv",new te(r,2)),this.computeVertexNormals();function o(a){const l=[],c=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,d=e.depth!==void 0?e.depth:1;let u=e.bevelEnabled!==void 0?e.bevelEnabled:!0,f=e.bevelThickness!==void 0?e.bevelThickness:.2,g=e.bevelSize!==void 0?e.bevelSize:f-.1,v=e.bevelOffset!==void 0?e.bevelOffset:0,m=e.bevelSegments!==void 0?e.bevelSegments:3;const p=e.extrudePath,b=e.UVGenerator!==void 0?e.UVGenerator:Mf;let x,_=!1,L,R,E,P;p&&(x=p.getSpacedPoints(h),_=!0,u=!1,L=p.computeFrenetFrames(h,!1),R=new I,E=new I,P=new I),u||(m=0,f=0,g=0,v=0);const M=a.extractPoints(c);let y=M.shape;const D=M.holes;if(!Qn.isClockWise(y)){y=y.reverse();for(let Q=0,rt=D.length;Q<rt;Q++){const C=D[Q];Qn.isClockWise(C)&&(D[Q]=C.reverse())}}const B=Qn.triangulateShape(y,D),V=y;for(let Q=0,rt=D.length;Q<rt;Q++){const C=D[Q];y=y.concat(C)}function $(Q,rt,C){return rt||console.error("THREE.ExtrudeGeometry: vec does not exist"),Q.clone().addScaledVector(rt,C)}const X=y.length,K=B.length;function W(Q,rt,C){let Lt,et,wt;const ct=Q.x-rt.x,Ot=Q.y-rt.y,_t=C.x-Q.x,A=C.y-Q.y,w=ct*ct+Ot*Ot,F=ct*A-Ot*_t;if(Math.abs(F)>Number.EPSILON){const q=Math.sqrt(w),tt=Math.sqrt(_t*_t+A*A),j=rt.x-Ot/q,Ct=rt.y+ct/q,ut=C.x-A/tt,bt=C.y+_t/tt,Kt=((ut-j)*A-(bt-Ct)*_t)/(ct*A-Ot*_t);Lt=j+ct*Kt-Q.x,et=Ct+Ot*Kt-Q.y;const st=Lt*Lt+et*et;if(st<=2)return new at(Lt,et);wt=Math.sqrt(st/2)}else{let q=!1;ct>Number.EPSILON?_t>Number.EPSILON&&(q=!0):ct<-Number.EPSILON?_t<-Number.EPSILON&&(q=!0):Math.sign(Ot)===Math.sign(A)&&(q=!0),q?(Lt=-Ot,et=ct,wt=Math.sqrt(w)):(Lt=ct,et=Ot,wt=Math.sqrt(w/2))}return new at(Lt/wt,et/wt)}const lt=[];for(let Q=0,rt=V.length,C=rt-1,Lt=Q+1;Q<rt;Q++,C++,Lt++)C===rt&&(C=0),Lt===rt&&(Lt=0),lt[Q]=W(V[Q],V[C],V[Lt]);const yt=[];let Et,Wt=lt.concat();for(let Q=0,rt=D.length;Q<rt;Q++){const C=D[Q];Et=[];for(let Lt=0,et=C.length,wt=et-1,ct=Lt+1;Lt<et;Lt++,wt++,ct++)wt===et&&(wt=0),ct===et&&(ct=0),Et[Lt]=W(C[Lt],C[wt],C[ct]);yt.push(Et),Wt=Wt.concat(Et)}for(let Q=0;Q<m;Q++){const rt=Q/m,C=f*Math.cos(rt*Math.PI/2),Lt=g*Math.sin(rt*Math.PI/2)+v;for(let et=0,wt=V.length;et<wt;et++){const ct=$(V[et],lt[et],Lt);ht(ct.x,ct.y,-C)}for(let et=0,wt=D.length;et<wt;et++){const ct=D[et];Et=yt[et];for(let Ot=0,_t=ct.length;Ot<_t;Ot++){const A=$(ct[Ot],Et[Ot],Lt);ht(A.x,A.y,-C)}}}const ae=g+v;for(let Q=0;Q<X;Q++){const rt=u?$(y[Q],Wt[Q],ae):y[Q];_?(E.copy(L.normals[0]).multiplyScalar(rt.x),R.copy(L.binormals[0]).multiplyScalar(rt.y),P.copy(x[0]).add(E).add(R),ht(P.x,P.y,P.z)):ht(rt.x,rt.y,0)}for(let Q=1;Q<=h;Q++)for(let rt=0;rt<X;rt++){const C=u?$(y[rt],Wt[rt],ae):y[rt];_?(E.copy(L.normals[Q]).multiplyScalar(C.x),R.copy(L.binormals[Q]).multiplyScalar(C.y),P.copy(x[Q]).add(E).add(R),ht(P.x,P.y,P.z)):ht(C.x,C.y,d/h*Q)}for(let Q=m-1;Q>=0;Q--){const rt=Q/m,C=f*Math.cos(rt*Math.PI/2),Lt=g*Math.sin(rt*Math.PI/2)+v;for(let et=0,wt=V.length;et<wt;et++){const ct=$(V[et],lt[et],Lt);ht(ct.x,ct.y,d+C)}for(let et=0,wt=D.length;et<wt;et++){const ct=D[et];Et=yt[et];for(let Ot=0,_t=ct.length;Ot<_t;Ot++){const A=$(ct[Ot],Et[Ot],Lt);_?ht(A.x,A.y+x[h-1].y,x[h-1].x+C):ht(A.x,A.y,d+C)}}}Z(),ot();function Z(){const Q=i.length/3;if(u){let rt=0,C=X*rt;for(let Lt=0;Lt<K;Lt++){const et=B[Lt];Ut(et[2]+C,et[1]+C,et[0]+C)}rt=h+m*2,C=X*rt;for(let Lt=0;Lt<K;Lt++){const et=B[Lt];Ut(et[0]+C,et[1]+C,et[2]+C)}}else{for(let rt=0;rt<K;rt++){const C=B[rt];Ut(C[2],C[1],C[0])}for(let rt=0;rt<K;rt++){const C=B[rt];Ut(C[0]+X*h,C[1]+X*h,C[2]+X*h)}}n.addGroup(Q,i.length/3-Q,0)}function ot(){const Q=i.length/3;let rt=0;Rt(V,rt),rt+=V.length;for(let C=0,Lt=D.length;C<Lt;C++){const et=D[C];Rt(et,rt),rt+=et.length}n.addGroup(Q,i.length/3-Q,1)}function Rt(Q,rt){let C=Q.length;for(;--C>=0;){const Lt=C;let et=C-1;et<0&&(et=Q.length-1);for(let wt=0,ct=h+m*2;wt<ct;wt++){const Ot=X*wt,_t=X*(wt+1),A=rt+Lt+Ot,w=rt+et+Ot,F=rt+et+_t,q=rt+Lt+_t;Ht(A,w,F,q)}}}function ht(Q,rt,C){l.push(Q),l.push(rt),l.push(C)}function Ut(Q,rt,C){Bt(Q),Bt(rt),Bt(C);const Lt=i.length/3,et=b.generateTopUV(n,i,Lt-3,Lt-2,Lt-1);ee(et[0]),ee(et[1]),ee(et[2])}function Ht(Q,rt,C,Lt){Bt(Q),Bt(rt),Bt(Lt),Bt(rt),Bt(C),Bt(Lt);const et=i.length/3,wt=b.generateSideWallUV(n,i,et-6,et-3,et-2,et-1);ee(wt[0]),ee(wt[1]),ee(wt[3]),ee(wt[1]),ee(wt[2]),ee(wt[3])}function Bt(Q){i.push(l[Q*3+0]),i.push(l[Q*3+1]),i.push(l[Q*3+2])}function ee(Q){r.push(Q.x),r.push(Q.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return Sf(e,n,t)}static fromJSON(t,e){const n=[];for(let r=0,o=t.shapes.length;r<o;r++){const a=e[t.shapes[r]];n.push(a)}const i=t.options.extrudePath;return i!==void 0&&(t.options.extrudePath=new Zr[i.type]().fromJSON(i)),new ni(n,t.options)}}const Mf={generateTopUV:function(s,t,e,n,i){const r=t[e*3],o=t[e*3+1],a=t[n*3],l=t[n*3+1],c=t[i*3],h=t[i*3+1];return[new at(r,o),new at(a,l),new at(c,h)]},generateSideWallUV:function(s,t,e,n,i,r){const o=t[e*3],a=t[e*3+1],l=t[e*3+2],c=t[n*3],h=t[n*3+1],d=t[n*3+2],u=t[i*3],f=t[i*3+1],g=t[i*3+2],v=t[r*3],m=t[r*3+1],p=t[r*3+2];return Math.abs(a-h)<Math.abs(o-c)?[new at(o,1-l),new at(c,1-d),new at(u,1-g),new at(v,1-p)]:[new at(a,1-l),new at(h,1-d),new at(f,1-g),new at(m,1-p)]}};function Sf(s,t,e){if(e.shapes=[],Array.isArray(s))for(let n=0,i=s.length;n<i;n++){const r=s[n];e.shapes.push(r.uuid)}else e.shapes.push(s.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}class pl extends ao{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new pl(t.radius,t.detail)}}class ii extends ao{constructor(t=1,e=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],i=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,i,t,e),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new ii(t.radius,t.detail)}}class Mn extends we{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};const r=t/2,o=e/2,a=Math.floor(n),l=Math.floor(i),c=a+1,h=l+1,d=t/a,u=e/l,f=[],g=[],v=[],m=[];for(let p=0;p<h;p++){const b=p*u-o;for(let x=0;x<c;x++){const _=x*d-r;g.push(_,-b,0),v.push(0,0,1),m.push(x/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let b=0;b<a;b++){const x=b+c*p,_=b+c*(p+1),L=b+1+c*(p+1),R=b+1+c*p;f.push(x,_,R),f.push(_,L,R)}this.setIndex(f),this.setAttribute("position",new te(g,3)),this.setAttribute("normal",new te(v,3)),this.setAttribute("uv",new te(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Mn(t.width,t.height,t.widthSegments,t.heightSegments)}}class Jr extends we{constructor(t=.5,e=1,n=32,i=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:i,thetaStart:r,thetaLength:o},n=Math.max(3,n),i=Math.max(1,i);const a=[],l=[],c=[],h=[];let d=t;const u=(e-t)/i,f=new I,g=new at;for(let v=0;v<=i;v++){for(let m=0;m<=n;m++){const p=r+m/n*o;f.x=d*Math.cos(p),f.y=d*Math.sin(p),l.push(f.x,f.y,f.z),c.push(0,0,1),g.x=(f.x/e+1)/2,g.y=(f.y/e+1)/2,h.push(g.x,g.y)}d+=u}for(let v=0;v<i;v++){const m=v*(n+1);for(let p=0;p<n;p++){const b=p+m,x=b,_=b+n+1,L=b+n+2,R=b+1;a.push(x,_,R),a.push(_,L,R)}}this.setIndex(a),this.setAttribute("position",new te(l,3)),this.setAttribute("normal",new te(c,3)),this.setAttribute("uv",new te(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Jr(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class ml extends we{constructor(t=new zn([new at(0,.5),new at(-.5,-.5),new at(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};const n=[],i=[],r=[],o=[];let a=0,l=0;if(Array.isArray(t)===!1)c(t);else for(let h=0;h<t.length;h++)c(t[h]),this.addGroup(a,l,h),a+=l,l=0;this.setIndex(n),this.setAttribute("position",new te(i,3)),this.setAttribute("normal",new te(r,3)),this.setAttribute("uv",new te(o,2));function c(h){const d=i.length/3,u=h.extractPoints(e);let f=u.shape;const g=u.holes;Qn.isClockWise(f)===!1&&(f=f.reverse());for(let m=0,p=g.length;m<p;m++){const b=g[m];Qn.isClockWise(b)===!0&&(g[m]=b.reverse())}const v=Qn.triangulateShape(f,g);for(let m=0,p=g.length;m<p;m++){const b=g[m];f=f.concat(b)}for(let m=0,p=f.length;m<p;m++){const b=f[m];i.push(b.x,b.y,0),r.push(0,0,1),o.push(b.x,b.y)}for(let m=0,p=v.length;m<p;m++){const b=v[m],x=b[0]+d,_=b[1]+d,L=b[2]+d;n.push(x,_,L),l+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes;return Tf(e,t)}static fromJSON(t,e){const n=[];for(let i=0,r=t.shapes.length;i<r;i++){const o=e[t.shapes[i]];n.push(o)}return new ml(n,t.curveSegments)}}function Tf(s,t){if(t.shapes=[],Array.isArray(s))for(let e=0,n=s.length;e<n;e++){const i=s[e];t.shapes.push(i.uuid)}else t.shapes.push(s.uuid);return t}class Dt extends we{constructor(t=1,e=32,n=16,i=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(o+a,Math.PI);let c=0;const h=[],d=new I,u=new I,f=[],g=[],v=[],m=[];for(let p=0;p<=n;p++){const b=[],x=p/n;let _=0;p===0&&o===0?_=.5/e:p===n&&l===Math.PI&&(_=-.5/e);for(let L=0;L<=e;L++){const R=L/e;d.x=-t*Math.cos(i+R*r)*Math.sin(o+x*a),d.y=t*Math.cos(o+x*a),d.z=t*Math.sin(i+R*r)*Math.sin(o+x*a),g.push(d.x,d.y,d.z),u.copy(d).normalize(),v.push(u.x,u.y,u.z),m.push(R+_,1-x),b.push(c++)}h.push(b)}for(let p=0;p<n;p++)for(let b=0;b<e;b++){const x=h[p][b+1],_=h[p][b],L=h[p+1][b],R=h[p+1][b+1];(p!==0||o>0)&&f.push(x,_,R),(p!==n-1||l<Math.PI)&&f.push(_,L,R)}this.setIndex(f),this.setAttribute("position",new te(g,3)),this.setAttribute("normal",new te(v,3)),this.setAttribute("uv",new te(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Dt(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Le extends we{constructor(t=1,e=.4,n=12,i=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:i,arc:r},n=Math.floor(n),i=Math.floor(i);const o=[],a=[],l=[],c=[],h=new I,d=new I,u=new I;for(let f=0;f<=n;f++)for(let g=0;g<=i;g++){const v=g/i*r,m=f/n*Math.PI*2;d.x=(t+e*Math.cos(m))*Math.cos(v),d.y=(t+e*Math.cos(m))*Math.sin(v),d.z=e*Math.sin(m),a.push(d.x,d.y,d.z),h.x=t*Math.cos(v),h.y=t*Math.sin(v),u.subVectors(d,h).normalize(),l.push(u.x,u.y,u.z),c.push(g/i),c.push(f/n)}for(let f=1;f<=n;f++)for(let g=1;g<=i;g++){const v=(i+1)*f+g-1,m=(i+1)*(f-1)+g-1,p=(i+1)*(f-1)+g,b=(i+1)*f+g;o.push(v,m,b),o.push(m,p,b)}this.setIndex(o),this.setAttribute("position",new te(a,3)),this.setAttribute("normal",new te(l,3)),this.setAttribute("uv",new te(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Le(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class Qr extends we{constructor(t=new Nh(new I(-1,-1,0),new I(-1,1,0),new I(1,1,0)),e=64,n=1,i=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:i,closed:r};const o=t.computeFrenetFrames(e,r);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;const a=new I,l=new I,c=new at;let h=new I;const d=[],u=[],f=[],g=[];v(),this.setIndex(g),this.setAttribute("position",new te(d,3)),this.setAttribute("normal",new te(u,3)),this.setAttribute("uv",new te(f,2));function v(){for(let x=0;x<e;x++)m(x);m(r===!1?e:0),b(),p()}function m(x){h=t.getPointAt(x/e,h);const _=o.normals[x],L=o.binormals[x];for(let R=0;R<=i;R++){const E=R/i*Math.PI*2,P=Math.sin(E),M=-Math.cos(E);l.x=M*_.x+P*L.x,l.y=M*_.y+P*L.y,l.z=M*_.z+P*L.z,l.normalize(),u.push(l.x,l.y,l.z),a.x=h.x+n*l.x,a.y=h.y+n*l.y,a.z=h.z+n*l.z,d.push(a.x,a.y,a.z)}}function p(){for(let x=1;x<=e;x++)for(let _=1;_<=i;_++){const L=(i+1)*(x-1)+(_-1),R=(i+1)*x+(_-1),E=(i+1)*x+_,P=(i+1)*(x-1)+_;g.push(L,R,P),g.push(R,E,P)}}function b(){for(let x=0;x<=e;x++)for(let _=0;_<=i;_++)c.x=x/e,c.y=_/i,f.push(c.x,c.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new Qr(new Zr[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}}class Jt extends Si{constructor(t){super(),this.isMeshToonMaterial=!0,this.defines={TOON:""},this.type="MeshToonMaterial",this.color=new Zt(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Zt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=_h,this.normalScale=new at(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.gradientMap=t.gradientMap,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.alphaMap=t.alphaMap,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}class Ef extends Si{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Wd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Af extends Si{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class gl extends Ce{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Zt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class cc extends gl{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ce.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Zt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const Ho=new ge,hc=new I,dc=new I;class zh{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new at(512,512),this.map=null,this.mapPass=null,this.matrix=new ge,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new dl,this._frameExtents=new at(1,1),this._viewportCount=1,this._viewports=[new me(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;hc.setFromMatrixPosition(t.matrixWorld),e.position.copy(hc),dc.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(dc),e.updateMatrixWorld(),Ho.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ho),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Ho)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const uc=new ge,_s=new I,Vo=new I;class Rf extends zh{constructor(){super(new tn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new at(4,2),this._viewportCount=6,this._viewports=[new me(2,1,1,1),new me(0,1,1,1),new me(3,1,1,1),new me(1,1,1,1),new me(3,0,1,1),new me(1,0,1,1)],this._cubeDirections=[new I(1,0,0),new I(-1,0,0),new I(0,0,1),new I(0,0,-1),new I(0,1,0),new I(0,-1,0)],this._cubeUps=[new I(0,1,0),new I(0,1,0),new I(0,1,0),new I(0,1,0),new I(0,0,1),new I(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,i=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),_s.setFromMatrixPosition(t.matrixWorld),n.position.copy(_s),Vo.copy(n.position),Vo.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(Vo),n.updateMatrixWorld(),i.makeTranslation(-_s.x,-_s.y,-_s.z),uc.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(uc)}}class Cf extends gl{constructor(t,e,n=0,i=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new Rf}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class Gh extends Ah{constructor(t=-1,e=1,n=1,i=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=n-t,o=n+t,a=i+e,l=i-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class Lf extends zh{constructor(){super(new Gh(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Wo extends gl{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ce.DEFAULT_UP),this.updateMatrix(),this.target=new Ce,this.shadow=new Lf}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class Pf extends tn{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class If{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=fc(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=fc();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function fc(){return performance.now()}const pc=new ge;class vl{constructor(t,e,n=0,i=1/0){this.ray=new ro(t,e),this.near=n,this.far=i,this.camera=null,this.layers=new hl,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return pc.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(pc),this}intersectObject(t,e=!0,n=[]){return ja(t,this,n,e),n.sort(mc),n}intersectObjects(t,e=!0,n=[]){for(let i=0,r=t.length;i<r;i++)ja(t[i],this,n,e);return n.sort(mc),n}}function mc(s,t){return s.distance-t.distance}function ja(s,t,e,n){let i=!0;if(s.layers.test(t.layers)&&s.raycast(t,e)===!1&&(i=!1),i===!0&&n===!0){const r=s.children;for(let o=0,a=r.length;o<a;o++)ja(r[o],t,e,!0)}}function gc(s,t,e,n){const i=Df(n);switch(e){case uh:return s*t;case ph:return s*t;case mh:return s*t*2;case rl:return s*t/i.components*i.byteLength;case ol:return s*t/i.components*i.byteLength;case gh:return s*t*2/i.components*i.byteLength;case al:return s*t*2/i.components*i.byteLength;case fh:return s*t*3/i.components*i.byteLength;case vn:return s*t*4/i.components*i.byteLength;case ll:return s*t*4/i.components*i.byteLength;case kr:case Fr:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case Or:case Br:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case ba:case Ma:return Math.max(s,16)*Math.max(t,8)/4;case ya:case wa:return Math.max(s,8)*Math.max(t,8)/2;case Sa:case Ta:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case Ea:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Aa:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Ra:return Math.floor((s+4)/5)*Math.floor((t+3)/4)*16;case Ca:return Math.floor((s+4)/5)*Math.floor((t+4)/5)*16;case La:return Math.floor((s+5)/6)*Math.floor((t+4)/5)*16;case Pa:return Math.floor((s+5)/6)*Math.floor((t+5)/6)*16;case Ia:return Math.floor((s+7)/8)*Math.floor((t+4)/5)*16;case Da:return Math.floor((s+7)/8)*Math.floor((t+5)/6)*16;case Ua:return Math.floor((s+7)/8)*Math.floor((t+7)/8)*16;case Na:return Math.floor((s+9)/10)*Math.floor((t+4)/5)*16;case ka:return Math.floor((s+9)/10)*Math.floor((t+5)/6)*16;case Fa:return Math.floor((s+9)/10)*Math.floor((t+7)/8)*16;case Oa:return Math.floor((s+9)/10)*Math.floor((t+9)/10)*16;case Ba:return Math.floor((s+11)/12)*Math.floor((t+9)/10)*16;case za:return Math.floor((s+11)/12)*Math.floor((t+11)/12)*16;case zr:case Ga:case Ha:return Math.ceil(s/4)*Math.ceil(t/4)*16;case vh:case Va:return Math.ceil(s/4)*Math.ceil(t/4)*8;case Wa:case Xa:return Math.ceil(s/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Df(s){switch(s){case On:case ch:return{byteLength:1,components:1};case Ps:case hh:case Os:return{byteLength:2,components:1};case il:case sl:return{byteLength:2,components:4};case xi:case nl:case Nn:return{byteLength:4,components:1};case dh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:el}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=el);/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Hh(){let s=null,t=!1,e=null,n=null;function i(r,o){e(r,o),n=s.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=s.requestAnimationFrame(i),t=!0)},stop:function(){s.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){s=r}}}function Uf(s){const t=new WeakMap;function e(a,l){const c=a.array,h=a.usage,d=c.byteLength,u=s.createBuffer();s.bindBuffer(l,u),s.bufferData(l,c,h),a.onUploadCallback();let f;if(c instanceof Float32Array)f=s.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=s.HALF_FLOAT:f=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=s.SHORT;else if(c instanceof Uint32Array)f=s.UNSIGNED_INT;else if(c instanceof Int32Array)f=s.INT;else if(c instanceof Int8Array)f=s.BYTE;else if(c instanceof Uint8Array)f=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:d}}function n(a,l,c){const h=l.array,d=l.updateRanges;if(s.bindBuffer(c,a),d.length===0)s.bufferSubData(c,0,h);else{d.sort((f,g)=>f.start-g.start);let u=0;for(let f=1;f<d.length;f++){const g=d[u],v=d[f];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++u,d[u]=v)}d.length=u+1;for(let f=0,g=d.length;f<g;f++){const v=d[f];s.bufferSubData(c,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=t.get(a);l&&(s.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:i,remove:r,update:o}}var Nf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,kf=`#ifdef USE_ALPHAHASH
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
#endif`,Ff=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Of=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Bf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,zf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Gf=`#ifdef USE_AOMAP
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
#endif`,Hf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Vf=`#ifdef USE_BATCHING
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
#endif`,Wf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Xf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,$f=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Yf=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,qf=`#ifdef USE_IRIDESCENCE
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
#endif`,jf=`#ifdef USE_BUMPMAP
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
#endif`,Zf=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Kf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Jf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Qf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,tp=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,ep=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,np=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,ip=`#if defined( USE_COLOR_ALPHA )
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
#endif`,sp=`#define PI 3.141592653589793
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
} // validated`,rp=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,op=`vec3 transformedNormal = objectNormal;
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
#endif`,ap=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,lp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,cp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,hp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,dp="gl_FragColor = linearToOutputTexel( gl_FragColor );",up=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,fp=`#ifdef USE_ENVMAP
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
#endif`,pp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,mp=`#ifdef USE_ENVMAP
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
#endif`,gp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,vp=`#ifdef USE_ENVMAP
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
#endif`,_p=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,xp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,yp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,bp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,wp=`#ifdef USE_GRADIENTMAP
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
}`,Mp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Sp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Tp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Ep=`uniform bool receiveShadow;
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
#endif`,Ap=`#ifdef USE_ENVMAP
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
#endif`,Rp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Cp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Lp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Pp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Ip=`PhysicalMaterial material;
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
#endif`,Dp=`struct PhysicalMaterial {
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
}`,Up=`
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
#endif`,Np=`#if defined( RE_IndirectDiffuse )
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
#endif`,kp=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Fp=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Op=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Bp=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,zp=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Gp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Hp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Vp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Wp=`#if defined( USE_POINTS_UV )
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
#endif`,Xp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,$p=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Yp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,qp=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,jp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Zp=`#ifdef USE_MORPHTARGETS
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
#endif`,Kp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Jp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Qp=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,tm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,em=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,nm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,im=`#ifdef USE_NORMALMAP
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
#endif`,sm=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,rm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,om=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,am=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,lm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,cm=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,hm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,dm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,um=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,fm=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,pm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,mm=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,gm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,vm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,_m=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,xm=`float getShadowMask() {
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
}`,ym=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,bm=`#ifdef USE_SKINNING
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
#endif`,wm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Mm=`#ifdef USE_SKINNING
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
#endif`,Sm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Tm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Em=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Am=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Rm=`#ifdef USE_TRANSMISSION
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
#endif`,Cm=`#ifdef USE_TRANSMISSION
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
#endif`,Lm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Pm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Im=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Dm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Um=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Nm=`uniform sampler2D t2D;
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
}`,km=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Fm=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Om=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Bm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,zm=`#include <common>
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
}`,Gm=`#if DEPTH_PACKING == 3200
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
}`,Hm=`#define DISTANCE
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
}`,Vm=`#define DISTANCE
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
}`,Wm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Xm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,$m=`uniform float scale;
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
}`,Ym=`uniform vec3 diffuse;
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
}`,qm=`#include <common>
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
}`,jm=`uniform vec3 diffuse;
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
}`,Zm=`#define LAMBERT
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
}`,Km=`#define LAMBERT
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
}`,Jm=`#define MATCAP
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
}`,Qm=`#define MATCAP
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
}`,tg=`#define NORMAL
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
}`,eg=`#define NORMAL
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
}`,ng=`#define PHONG
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
}`,ig=`#define PHONG
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
}`,sg=`#define STANDARD
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
}`,rg=`#define STANDARD
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
}`,og=`#define TOON
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
}`,ag=`#define TOON
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
}`,lg=`uniform float size;
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
}`,cg=`uniform vec3 diffuse;
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
}`,hg=`#include <common>
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
}`,dg=`uniform vec3 color;
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
}`,ug=`uniform float rotation;
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
}`,fg=`uniform vec3 diffuse;
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
}`,qt={alphahash_fragment:Nf,alphahash_pars_fragment:kf,alphamap_fragment:Ff,alphamap_pars_fragment:Of,alphatest_fragment:Bf,alphatest_pars_fragment:zf,aomap_fragment:Gf,aomap_pars_fragment:Hf,batching_pars_vertex:Vf,batching_vertex:Wf,begin_vertex:Xf,beginnormal_vertex:$f,bsdfs:Yf,iridescence_fragment:qf,bumpmap_pars_fragment:jf,clipping_planes_fragment:Zf,clipping_planes_pars_fragment:Kf,clipping_planes_pars_vertex:Jf,clipping_planes_vertex:Qf,color_fragment:tp,color_pars_fragment:ep,color_pars_vertex:np,color_vertex:ip,common:sp,cube_uv_reflection_fragment:rp,defaultnormal_vertex:op,displacementmap_pars_vertex:ap,displacementmap_vertex:lp,emissivemap_fragment:cp,emissivemap_pars_fragment:hp,colorspace_fragment:dp,colorspace_pars_fragment:up,envmap_fragment:fp,envmap_common_pars_fragment:pp,envmap_pars_fragment:mp,envmap_pars_vertex:gp,envmap_physical_pars_fragment:Ap,envmap_vertex:vp,fog_vertex:_p,fog_pars_vertex:xp,fog_fragment:yp,fog_pars_fragment:bp,gradientmap_pars_fragment:wp,lightmap_pars_fragment:Mp,lights_lambert_fragment:Sp,lights_lambert_pars_fragment:Tp,lights_pars_begin:Ep,lights_toon_fragment:Rp,lights_toon_pars_fragment:Cp,lights_phong_fragment:Lp,lights_phong_pars_fragment:Pp,lights_physical_fragment:Ip,lights_physical_pars_fragment:Dp,lights_fragment_begin:Up,lights_fragment_maps:Np,lights_fragment_end:kp,logdepthbuf_fragment:Fp,logdepthbuf_pars_fragment:Op,logdepthbuf_pars_vertex:Bp,logdepthbuf_vertex:zp,map_fragment:Gp,map_pars_fragment:Hp,map_particle_fragment:Vp,map_particle_pars_fragment:Wp,metalnessmap_fragment:Xp,metalnessmap_pars_fragment:$p,morphinstance_vertex:Yp,morphcolor_vertex:qp,morphnormal_vertex:jp,morphtarget_pars_vertex:Zp,morphtarget_vertex:Kp,normal_fragment_begin:Jp,normal_fragment_maps:Qp,normal_pars_fragment:tm,normal_pars_vertex:em,normal_vertex:nm,normalmap_pars_fragment:im,clearcoat_normal_fragment_begin:sm,clearcoat_normal_fragment_maps:rm,clearcoat_pars_fragment:om,iridescence_pars_fragment:am,opaque_fragment:lm,packing:cm,premultiplied_alpha_fragment:hm,project_vertex:dm,dithering_fragment:um,dithering_pars_fragment:fm,roughnessmap_fragment:pm,roughnessmap_pars_fragment:mm,shadowmap_pars_fragment:gm,shadowmap_pars_vertex:vm,shadowmap_vertex:_m,shadowmask_pars_fragment:xm,skinbase_vertex:ym,skinning_pars_vertex:bm,skinning_vertex:wm,skinnormal_vertex:Mm,specularmap_fragment:Sm,specularmap_pars_fragment:Tm,tonemapping_fragment:Em,tonemapping_pars_fragment:Am,transmission_fragment:Rm,transmission_pars_fragment:Cm,uv_pars_fragment:Lm,uv_pars_vertex:Pm,uv_vertex:Im,worldpos_vertex:Dm,background_vert:Um,background_frag:Nm,backgroundCube_vert:km,backgroundCube_frag:Fm,cube_vert:Om,cube_frag:Bm,depth_vert:zm,depth_frag:Gm,distanceRGBA_vert:Hm,distanceRGBA_frag:Vm,equirect_vert:Wm,equirect_frag:Xm,linedashed_vert:$m,linedashed_frag:Ym,meshbasic_vert:qm,meshbasic_frag:jm,meshlambert_vert:Zm,meshlambert_frag:Km,meshmatcap_vert:Jm,meshmatcap_frag:Qm,meshnormal_vert:tg,meshnormal_frag:eg,meshphong_vert:ng,meshphong_frag:ig,meshphysical_vert:sg,meshphysical_frag:rg,meshtoon_vert:og,meshtoon_frag:ag,points_vert:lg,points_frag:cg,shadow_vert:hg,shadow_frag:dg,sprite_vert:ug,sprite_frag:fg},dt={common:{diffuse:{value:new Zt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new $t},alphaMap:{value:null},alphaMapTransform:{value:new $t},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new $t}},envmap:{envMap:{value:null},envMapRotation:{value:new $t},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new $t}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new $t}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new $t},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new $t},normalScale:{value:new at(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new $t},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new $t}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new $t}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new $t}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Zt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Zt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new $t},alphaTest:{value:0},uvTransform:{value:new $t}},sprite:{diffuse:{value:new Zt(16777215)},opacity:{value:1},center:{value:new at(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new $t},alphaMap:{value:null},alphaMapTransform:{value:new $t},alphaTest:{value:0}}},bn={basic:{uniforms:We([dt.common,dt.specularmap,dt.envmap,dt.aomap,dt.lightmap,dt.fog]),vertexShader:qt.meshbasic_vert,fragmentShader:qt.meshbasic_frag},lambert:{uniforms:We([dt.common,dt.specularmap,dt.envmap,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.fog,dt.lights,{emissive:{value:new Zt(0)}}]),vertexShader:qt.meshlambert_vert,fragmentShader:qt.meshlambert_frag},phong:{uniforms:We([dt.common,dt.specularmap,dt.envmap,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.fog,dt.lights,{emissive:{value:new Zt(0)},specular:{value:new Zt(1118481)},shininess:{value:30}}]),vertexShader:qt.meshphong_vert,fragmentShader:qt.meshphong_frag},standard:{uniforms:We([dt.common,dt.envmap,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.roughnessmap,dt.metalnessmap,dt.fog,dt.lights,{emissive:{value:new Zt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:qt.meshphysical_vert,fragmentShader:qt.meshphysical_frag},toon:{uniforms:We([dt.common,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.gradientmap,dt.fog,dt.lights,{emissive:{value:new Zt(0)}}]),vertexShader:qt.meshtoon_vert,fragmentShader:qt.meshtoon_frag},matcap:{uniforms:We([dt.common,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.fog,{matcap:{value:null}}]),vertexShader:qt.meshmatcap_vert,fragmentShader:qt.meshmatcap_frag},points:{uniforms:We([dt.points,dt.fog]),vertexShader:qt.points_vert,fragmentShader:qt.points_frag},dashed:{uniforms:We([dt.common,dt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:qt.linedashed_vert,fragmentShader:qt.linedashed_frag},depth:{uniforms:We([dt.common,dt.displacementmap]),vertexShader:qt.depth_vert,fragmentShader:qt.depth_frag},normal:{uniforms:We([dt.common,dt.bumpmap,dt.normalmap,dt.displacementmap,{opacity:{value:1}}]),vertexShader:qt.meshnormal_vert,fragmentShader:qt.meshnormal_frag},sprite:{uniforms:We([dt.sprite,dt.fog]),vertexShader:qt.sprite_vert,fragmentShader:qt.sprite_frag},background:{uniforms:{uvTransform:{value:new $t},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:qt.background_vert,fragmentShader:qt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new $t}},vertexShader:qt.backgroundCube_vert,fragmentShader:qt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:qt.cube_vert,fragmentShader:qt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:qt.equirect_vert,fragmentShader:qt.equirect_frag},distanceRGBA:{uniforms:We([dt.common,dt.displacementmap,{referencePosition:{value:new I},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:qt.distanceRGBA_vert,fragmentShader:qt.distanceRGBA_frag},shadow:{uniforms:We([dt.lights,dt.fog,{color:{value:new Zt(0)},opacity:{value:1}}]),vertexShader:qt.shadow_vert,fragmentShader:qt.shadow_frag}};bn.physical={uniforms:We([bn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new $t},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new $t},clearcoatNormalScale:{value:new at(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new $t},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new $t},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new $t},sheen:{value:0},sheenColor:{value:new Zt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new $t},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new $t},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new $t},transmissionSamplerSize:{value:new at},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new $t},attenuationDistance:{value:0},attenuationColor:{value:new Zt(0)},specularColor:{value:new Zt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new $t},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new $t},anisotropyVector:{value:new at},anisotropyMap:{value:null},anisotropyMapTransform:{value:new $t}}]),vertexShader:qt.meshphysical_vert,fragmentShader:qt.meshphysical_frag};const Er={r:0,b:0,g:0},hi=new Bn,pg=new ge;function mg(s,t,e,n,i,r,o){const a=new Zt(0);let l=r===!0?0:1,c,h,d=null,u=0,f=null;function g(x){let _=x.isScene===!0?x.background:null;return _&&_.isTexture&&(_=(x.backgroundBlurriness>0?e:t).get(_)),_}function v(x){let _=!1;const L=g(x);L===null?p(a,l):L&&L.isColor&&(p(L,1),_=!0);const R=s.xr.getEnvironmentBlendMode();R==="additive"?n.buffers.color.setClear(0,0,0,1,o):R==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(s.autoClear||_)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function m(x,_){const L=g(_);L&&(L.isCubeTexture||L.mapping===so)?(h===void 0&&(h=new It(new _e(1,1,1),new ei({name:"BackgroundCubeMaterial",uniforms:os(bn.backgroundCube.uniforms),vertexShader:bn.backgroundCube.vertexShader,fragmentShader:bn.backgroundCube.fragmentShader,side:je,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(R,E,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),hi.copy(_.backgroundRotation),hi.x*=-1,hi.y*=-1,hi.z*=-1,L.isCubeTexture&&L.isRenderTargetTexture===!1&&(hi.y*=-1,hi.z*=-1),h.material.uniforms.envMap.value=L,h.material.uniforms.flipEnvMap.value=L.isCubeTexture&&L.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(pg.makeRotationFromEuler(hi)),h.material.toneMapped=se.getTransfer(L.colorSpace)!==pe,(d!==L||u!==L.version||f!==s.toneMapping)&&(h.material.needsUpdate=!0,d=L,u=L.version,f=s.toneMapping),h.layers.enableAll(),x.unshift(h,h.geometry,h.material,0,0,null)):L&&L.isTexture&&(c===void 0&&(c=new It(new Mn(2,2),new ei({name:"BackgroundMaterial",uniforms:os(bn.background.uniforms),vertexShader:bn.background.vertexShader,fragmentShader:bn.background.fragmentShader,side:ti,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=L,c.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,c.material.toneMapped=se.getTransfer(L.colorSpace)!==pe,L.matrixAutoUpdate===!0&&L.updateMatrix(),c.material.uniforms.uvTransform.value.copy(L.matrix),(d!==L||u!==L.version||f!==s.toneMapping)&&(c.material.needsUpdate=!0,d=L,u=L.version,f=s.toneMapping),c.layers.enableAll(),x.unshift(c,c.geometry,c.material,0,0,null))}function p(x,_){x.getRGB(Er,Eh(s)),n.buffers.color.setClear(Er.r,Er.g,Er.b,_,o)}function b(){h!==void 0&&(h.geometry.dispose(),h.material.dispose()),c!==void 0&&(c.geometry.dispose(),c.material.dispose())}return{getClearColor:function(){return a},setClearColor:function(x,_=1){a.set(x),l=_,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(x){l=x,p(a,l)},render:v,addToRenderList:m,dispose:b}}function gg(s,t){const e=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=u(null);let r=i,o=!1;function a(y,D,O,B,V){let $=!1;const X=d(B,O,D);r!==X&&(r=X,c(r.object)),$=f(y,B,O,V),$&&g(y,B,O,V),V!==null&&t.update(V,s.ELEMENT_ARRAY_BUFFER),($||o)&&(o=!1,_(y,D,O,B),V!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(V).buffer))}function l(){return s.createVertexArray()}function c(y){return s.bindVertexArray(y)}function h(y){return s.deleteVertexArray(y)}function d(y,D,O){const B=O.wireframe===!0;let V=n[y.id];V===void 0&&(V={},n[y.id]=V);let $=V[D.id];$===void 0&&($={},V[D.id]=$);let X=$[B];return X===void 0&&(X=u(l()),$[B]=X),X}function u(y){const D=[],O=[],B=[];for(let V=0;V<e;V++)D[V]=0,O[V]=0,B[V]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:O,attributeDivisors:B,object:y,attributes:{},index:null}}function f(y,D,O,B){const V=r.attributes,$=D.attributes;let X=0;const K=O.getAttributes();for(const W in K)if(K[W].location>=0){const yt=V[W];let Et=$[W];if(Et===void 0&&(W==="instanceMatrix"&&y.instanceMatrix&&(Et=y.instanceMatrix),W==="instanceColor"&&y.instanceColor&&(Et=y.instanceColor)),yt===void 0||yt.attribute!==Et||Et&&yt.data!==Et.data)return!0;X++}return r.attributesNum!==X||r.index!==B}function g(y,D,O,B){const V={},$=D.attributes;let X=0;const K=O.getAttributes();for(const W in K)if(K[W].location>=0){let yt=$[W];yt===void 0&&(W==="instanceMatrix"&&y.instanceMatrix&&(yt=y.instanceMatrix),W==="instanceColor"&&y.instanceColor&&(yt=y.instanceColor));const Et={};Et.attribute=yt,yt&&yt.data&&(Et.data=yt.data),V[W]=Et,X++}r.attributes=V,r.attributesNum=X,r.index=B}function v(){const y=r.newAttributes;for(let D=0,O=y.length;D<O;D++)y[D]=0}function m(y){p(y,0)}function p(y,D){const O=r.newAttributes,B=r.enabledAttributes,V=r.attributeDivisors;O[y]=1,B[y]===0&&(s.enableVertexAttribArray(y),B[y]=1),V[y]!==D&&(s.vertexAttribDivisor(y,D),V[y]=D)}function b(){const y=r.newAttributes,D=r.enabledAttributes;for(let O=0,B=D.length;O<B;O++)D[O]!==y[O]&&(s.disableVertexAttribArray(O),D[O]=0)}function x(y,D,O,B,V,$,X){X===!0?s.vertexAttribIPointer(y,D,O,V,$):s.vertexAttribPointer(y,D,O,B,V,$)}function _(y,D,O,B){v();const V=B.attributes,$=O.getAttributes(),X=D.defaultAttributeValues;for(const K in $){const W=$[K];if(W.location>=0){let lt=V[K];if(lt===void 0&&(K==="instanceMatrix"&&y.instanceMatrix&&(lt=y.instanceMatrix),K==="instanceColor"&&y.instanceColor&&(lt=y.instanceColor)),lt!==void 0){const yt=lt.normalized,Et=lt.itemSize,Wt=t.get(lt);if(Wt===void 0)continue;const ae=Wt.buffer,Z=Wt.type,ot=Wt.bytesPerElement,Rt=Z===s.INT||Z===s.UNSIGNED_INT||lt.gpuType===nl;if(lt.isInterleavedBufferAttribute){const ht=lt.data,Ut=ht.stride,Ht=lt.offset;if(ht.isInstancedInterleavedBuffer){for(let Bt=0;Bt<W.locationSize;Bt++)p(W.location+Bt,ht.meshPerAttribute);y.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=ht.meshPerAttribute*ht.count)}else for(let Bt=0;Bt<W.locationSize;Bt++)m(W.location+Bt);s.bindBuffer(s.ARRAY_BUFFER,ae);for(let Bt=0;Bt<W.locationSize;Bt++)x(W.location+Bt,Et/W.locationSize,Z,yt,Ut*ot,(Ht+Et/W.locationSize*Bt)*ot,Rt)}else{if(lt.isInstancedBufferAttribute){for(let ht=0;ht<W.locationSize;ht++)p(W.location+ht,lt.meshPerAttribute);y.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=lt.meshPerAttribute*lt.count)}else for(let ht=0;ht<W.locationSize;ht++)m(W.location+ht);s.bindBuffer(s.ARRAY_BUFFER,ae);for(let ht=0;ht<W.locationSize;ht++)x(W.location+ht,Et/W.locationSize,Z,yt,Et*ot,Et/W.locationSize*ht*ot,Rt)}}else if(X!==void 0){const yt=X[K];if(yt!==void 0)switch(yt.length){case 2:s.vertexAttrib2fv(W.location,yt);break;case 3:s.vertexAttrib3fv(W.location,yt);break;case 4:s.vertexAttrib4fv(W.location,yt);break;default:s.vertexAttrib1fv(W.location,yt)}}}}b()}function L(){P();for(const y in n){const D=n[y];for(const O in D){const B=D[O];for(const V in B)h(B[V].object),delete B[V];delete D[O]}delete n[y]}}function R(y){if(n[y.id]===void 0)return;const D=n[y.id];for(const O in D){const B=D[O];for(const V in B)h(B[V].object),delete B[V];delete D[O]}delete n[y.id]}function E(y){for(const D in n){const O=n[D];if(O[y.id]===void 0)continue;const B=O[y.id];for(const V in B)h(B[V].object),delete B[V];delete O[y.id]}}function P(){M(),o=!0,r!==i&&(r=i,c(r.object))}function M(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:P,resetDefaultState:M,dispose:L,releaseStatesOfGeometry:R,releaseStatesOfProgram:E,initAttributes:v,enableAttribute:m,disableUnusedAttributes:b}}function vg(s,t,e){let n;function i(c){n=c}function r(c,h){s.drawArrays(n,c,h),e.update(h,n,1)}function o(c,h,d){d!==0&&(s.drawArraysInstanced(n,c,h,d),e.update(h,n,d))}function a(c,h,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,d);let f=0;for(let g=0;g<d;g++)f+=h[g];e.update(f,n,1)}function l(c,h,d,u){if(d===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<c.length;g++)o(c[g],h[g],u[g]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,h,0,u,0,d);let g=0;for(let v=0;v<d;v++)g+=h[v]*u[v];e.update(g,n,1)}}this.setMode=i,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function _g(s,t,e,n){let i;function r(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){const E=t.get("EXT_texture_filter_anisotropic");i=s.getParameter(E.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(E){return!(E!==vn&&n.convert(E)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(E){const P=E===Os&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(E!==On&&n.convert(E)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&E!==Nn&&!P)}function l(E){if(E==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";E="mediump"}return E==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const d=e.logarithmicDepthBuffer===!0,u=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),f=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),g=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=s.getParameter(s.MAX_TEXTURE_SIZE),m=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),p=s.getParameter(s.MAX_VERTEX_ATTRIBS),b=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),x=s.getParameter(s.MAX_VARYING_VECTORS),_=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),L=g>0,R=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:d,reverseDepthBuffer:u,maxTextures:f,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:b,maxVaryings:x,maxFragmentUniforms:_,vertexTextures:L,maxSamples:R}}function xg(s){const t=this;let e=null,n=0,i=!1,r=!1;const o=new ui,a=new $t,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){const f=d.length!==0||u||n!==0||i;return i=u,n=d.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){e=h(d,u,0)},this.setState=function(d,u,f){const g=d.clippingPlanes,v=d.clipIntersection,m=d.clipShadows,p=s.get(d);if(!i||g===null||g.length===0||r&&!m)r?h(null):c();else{const b=r?0:n,x=b*4;let _=p.clippingState||null;l.value=_,_=h(g,u,x,f);for(let L=0;L!==x;++L)_[L]=e[L];p.clippingState=_,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=b}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(d,u,f,g){const v=d!==null?d.length:0;let m=null;if(v!==0){if(m=l.value,g!==!0||m===null){const p=f+v*4,b=u.matrixWorldInverse;a.getNormalMatrix(b),(m===null||m.length<p)&&(m=new Float32Array(p));for(let x=0,_=f;x!==v;++x,_+=4)o.copy(d[x]).applyMatrix4(b,a),o.normal.toArray(m,_),m[_+3]=o.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,m}}function yg(s){let t=new WeakMap;function e(o,a){return a===va?o.mapping=ts:a===_a&&(o.mapping=es),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===va||a===_a)if(t.has(o)){const l=t.get(o).texture;return e(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new Hu(l.height);return c.fromEquirectangularTexture(s,o),t.set(o,c),o.addEventListener("dispose",i),e(c.texture,o.mapping)}else return null}}return o}function i(o){const a=o.target;a.removeEventListener("dispose",i);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}const ji=4,vc=[.125,.215,.35,.446,.526,.582],gi=20,Xo=new Gh,_c=new Zt;let $o=null,Yo=0,qo=0,jo=!1;const fi=(1+Math.sqrt(5))/2,zi=1/fi,xc=[new I(-fi,zi,0),new I(fi,zi,0),new I(-zi,0,fi),new I(zi,0,fi),new I(0,fi,-zi),new I(0,fi,zi),new I(-1,1,-1),new I(1,1,-1),new I(-1,1,1),new I(1,1,1)];class yc{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100){$o=this._renderer.getRenderTarget(),Yo=this._renderer.getActiveCubeFace(),qo=this._renderer.getActiveMipmapLevel(),jo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,i,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Mc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=wc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget($o,Yo,qo),this._renderer.xr.enabled=jo,t.scissorTest=!1,Ar(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===ts||t.mapping===es?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),$o=this._renderer.getRenderTarget(),Yo=this._renderer.getActiveCubeFace(),qo=this._renderer.getActiveMipmapLevel(),jo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:wn,minFilter:wn,generateMipmaps:!1,type:Os,format:vn,colorSpace:rs,depthBuffer:!1},i=bc(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=bc(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=bg(r)),this._blurMaterial=wg(r,t,e)}return i}_compileMaterial(t){const e=new It(this._lodPlanes[0],t);this._renderer.compile(e,Xo)}_sceneToCubeUV(t,e,n,i){const a=new tn(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,u=h.toneMapping;h.getClearColor(_c),h.toneMapping=Jn,h.autoClear=!1;const f=new Ds({name:"PMREM.Background",side:je,depthWrite:!1,depthTest:!1}),g=new It(new _e,f);let v=!1;const m=t.background;m?m.isColor&&(f.color.copy(m),t.background=null,v=!0):(f.color.copy(_c),v=!0);for(let p=0;p<6;p++){const b=p%3;b===0?(a.up.set(0,l[p],0),a.lookAt(c[p],0,0)):b===1?(a.up.set(0,0,l[p]),a.lookAt(0,c[p],0)):(a.up.set(0,l[p],0),a.lookAt(0,0,c[p]));const x=this._cubeSize;Ar(i,b*x,p>2?x:0,x,x),h.setRenderTarget(i),v&&h.render(g,a),h.render(t,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=u,h.autoClear=d,t.background=m}_textureToCubeUV(t,e){const n=this._renderer,i=t.mapping===ts||t.mapping===es;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Mc()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=wc());const r=i?this._cubemapMaterial:this._equirectMaterial,o=new It(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;const l=this._cubeSize;Ar(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(o,Xo)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const i=this._lodPlanes.length;for(let r=1;r<i;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=xc[(i-r-1)%xc.length];this._blur(t,r-1,r,o,a)}e.autoClear=n}_blur(t,e,n,i,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,i,"latitudinal",r),this._halfBlur(o,t,n,n,i,"longitudinal",r)}_halfBlur(t,e,n,i,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,d=new It(this._lodPlanes[i],c),u=c.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*gi-1),v=r/g,m=isFinite(r)?1+Math.floor(h*v):gi;m>gi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${gi}`);const p=[];let b=0;for(let E=0;E<gi;++E){const P=E/v,M=Math.exp(-P*P/2);p.push(M),E===0?b+=M:E<m&&(b+=2*M)}for(let E=0;E<p.length;E++)p[E]=p[E]/b;u.envMap.value=t.texture,u.samples.value=m,u.weights.value=p,u.latitudinal.value=o==="latitudinal",a&&(u.poleAxis.value=a);const{_lodMax:x}=this;u.dTheta.value=g,u.mipInt.value=x-n;const _=this._sizeLods[i],L=3*_*(i>x-ji?i-x+ji:0),R=4*(this._cubeSize-_);Ar(e,L,R,3*_,2*_),l.setRenderTarget(e),l.render(d,Xo)}}function bg(s){const t=[],e=[],n=[];let i=s;const r=s-ji+1+vc.length;for(let o=0;o<r;o++){const a=Math.pow(2,i);e.push(a);let l=1/a;o>s-ji?l=vc[o-s+ji-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),h=-c,d=1+c,u=[h,h,d,h,d,d,h,h,d,d,h,d],f=6,g=6,v=3,m=2,p=1,b=new Float32Array(v*g*f),x=new Float32Array(m*g*f),_=new Float32Array(p*g*f);for(let R=0;R<f;R++){const E=R%3*2/3-1,P=R>2?0:-1,M=[E,P,0,E+2/3,P,0,E+2/3,P+1,0,E,P,0,E+2/3,P+1,0,E,P+1,0];b.set(M,v*g*R),x.set(u,m*g*R);const y=[R,R,R,R,R,R];_.set(y,p*g*R)}const L=new we;L.setAttribute("position",new Ze(b,v)),L.setAttribute("uv",new Ze(x,m)),L.setAttribute("faceIndex",new Ze(_,p)),t.push(L),i>ji&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function bc(s,t,e){const n=new yi(s,t,e);return n.texture.mapping=so,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ar(s,t,e,n,i){s.viewport.set(t,e,n,i),s.scissor.set(t,e,n,i)}function wg(s,t,e){const n=new Float32Array(gi),i=new I(0,1,0);return new ei({name:"SphericalGaussianBlur",defines:{n:gi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:_l(),fragmentShader:`

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
		`,blending:Kn,depthTest:!1,depthWrite:!1})}function wc(){return new ei({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:_l(),fragmentShader:`

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
		`,blending:Kn,depthTest:!1,depthWrite:!1})}function Mc(){return new ei({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:_l(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Kn,depthTest:!1,depthWrite:!1})}function _l(){return`

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
	`}function Mg(s){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===va||l===_a,h=l===ts||l===es;if(c||h){let d=t.get(a);const u=d!==void 0?d.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==u)return e===null&&(e=new yc(s)),d=c?e.fromEquirectangular(a,d):e.fromCubemap(a,d),d.texture.pmremVersion=a.pmremVersion,t.set(a,d),d.texture;if(d!==void 0)return d.texture;{const f=a.image;return c&&f&&f.height>0||h&&f&&i(f)?(e===null&&(e=new yc(s)),d=c?e.fromEquirectangular(a):e.fromCubemap(a),d.texture.pmremVersion=a.pmremVersion,t.set(a,d),a.addEventListener("dispose",r),d.texture):null}}}return a}function i(a){let l=0;const c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function r(a){const l=a.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function Sg(s){const t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const i=e(n);return i===null&&$i("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Tg(s,t,e,n){const i={},r=new WeakMap;function o(d){const u=d.target;u.index!==null&&t.remove(u.index);for(const g in u.attributes)t.remove(u.attributes[g]);u.removeEventListener("dispose",o),delete i[u.id];const f=r.get(u);f&&(t.remove(f),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function a(d,u){return i[u.id]===!0||(u.addEventListener("dispose",o),i[u.id]=!0,e.memory.geometries++),u}function l(d){const u=d.attributes;for(const f in u)t.update(u[f],s.ARRAY_BUFFER)}function c(d){const u=[],f=d.index,g=d.attributes.position;let v=0;if(f!==null){const b=f.array;v=f.version;for(let x=0,_=b.length;x<_;x+=3){const L=b[x+0],R=b[x+1],E=b[x+2];u.push(L,R,R,E,E,L)}}else if(g!==void 0){const b=g.array;v=g.version;for(let x=0,_=b.length/3-1;x<_;x+=3){const L=x+0,R=x+1,E=x+2;u.push(L,R,R,E,E,L)}}else return;const m=new(yh(u)?Th:Sh)(u,1);m.version=v;const p=r.get(d);p&&t.remove(p),r.set(d,m)}function h(d){const u=r.get(d);if(u){const f=d.index;f!==null&&u.version<f.version&&c(d)}else c(d);return r.get(d)}return{get:a,update:l,getWireframeAttribute:h}}function Eg(s,t,e){let n;function i(u){n=u}let r,o;function a(u){r=u.type,o=u.bytesPerElement}function l(u,f){s.drawElements(n,f,r,u*o),e.update(f,n,1)}function c(u,f,g){g!==0&&(s.drawElementsInstanced(n,f,r,u*o,g),e.update(f,n,g))}function h(u,f,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,u,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];e.update(m,n,1)}function d(u,f,g,v){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<u.length;p++)c(u[p]/o,f[p],v[p]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,r,u,0,v,0,g);let p=0;for(let b=0;b<g;b++)p+=f[b]*v[b];e.update(p,n,1)}}this.setMode=i,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=d}function Ag(s){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case s.TRIANGLES:e.triangles+=a*(r/3);break;case s.LINES:e.lines+=a*(r/2);break;case s.LINE_STRIP:e.lines+=a*(r-1);break;case s.LINE_LOOP:e.lines+=a*r;break;case s.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function Rg(s,t,e){const n=new WeakMap,i=new me;function r(o,a,l){const c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=h!==void 0?h.length:0;let u=n.get(a);if(u===void 0||u.count!==d){let y=function(){P.dispose(),n.delete(a),a.removeEventListener("dispose",y)};var f=y;u!==void 0&&u.texture.dispose();const g=a.morphAttributes.position!==void 0,v=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],b=a.morphAttributes.normal||[],x=a.morphAttributes.color||[];let _=0;g===!0&&(_=1),v===!0&&(_=2),m===!0&&(_=3);let L=a.attributes.position.count*_,R=1;L>t.maxTextureSize&&(R=Math.ceil(L/t.maxTextureSize),L=t.maxTextureSize);const E=new Float32Array(L*R*4*d),P=new wh(E,L,R,d);P.type=Nn,P.needsUpdate=!0;const M=_*4;for(let D=0;D<d;D++){const O=p[D],B=b[D],V=x[D],$=L*R*4*D;for(let X=0;X<O.count;X++){const K=X*M;g===!0&&(i.fromBufferAttribute(O,X),E[$+K+0]=i.x,E[$+K+1]=i.y,E[$+K+2]=i.z,E[$+K+3]=0),v===!0&&(i.fromBufferAttribute(B,X),E[$+K+4]=i.x,E[$+K+5]=i.y,E[$+K+6]=i.z,E[$+K+7]=0),m===!0&&(i.fromBufferAttribute(V,X),E[$+K+8]=i.x,E[$+K+9]=i.y,E[$+K+10]=i.z,E[$+K+11]=V.itemSize===4?i.w:1)}}u={count:d,texture:P,size:new at(L,R)},n.set(a,u),a.addEventListener("dispose",y)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",o.morphTexture,e);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];const v=a.morphTargetsRelative?1:1-g;l.getUniforms().setValue(s,"morphTargetBaseInfluence",v),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",u.texture,e),l.getUniforms().setValue(s,"morphTargetsTextureSize",u.size)}return{update:r}}function Cg(s,t,e,n){let i=new WeakMap;function r(l){const c=n.render.frame,h=l.geometry,d=t.get(l,h);if(i.get(d)!==c&&(t.update(d),i.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),i.get(l)!==c&&(e.update(l.instanceMatrix,s.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,s.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const u=l.skeleton;i.get(u)!==c&&(u.update(),i.set(u,c))}return d}function o(){i=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:o}}const Vh=new Oe,Sc=new Lh(1,1),Wh=new wh,Xh=new Eu,$h=new Rh,Tc=[],Ec=[],Ac=new Float32Array(16),Rc=new Float32Array(9),Cc=new Float32Array(4);function hs(s,t,e){const n=s[0];if(n<=0||n>0)return s;const i=t*e;let r=Tc[i];if(r===void 0&&(r=new Float32Array(i),Tc[i]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,s[o].toArray(r,a)}return r}function Pe(s,t){if(s.length!==t.length)return!1;for(let e=0,n=s.length;e<n;e++)if(s[e]!==t[e])return!1;return!0}function Ie(s,t){for(let e=0,n=t.length;e<n;e++)s[e]=t[e]}function co(s,t){let e=Ec[t];e===void 0&&(e=new Int32Array(t),Ec[t]=e);for(let n=0;n!==t;++n)e[n]=s.allocateTextureUnit();return e}function Lg(s,t){const e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t)}function Pg(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Pe(e,t))return;s.uniform2fv(this.addr,t),Ie(e,t)}}function Ig(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Pe(e,t))return;s.uniform3fv(this.addr,t),Ie(e,t)}}function Dg(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Pe(e,t))return;s.uniform4fv(this.addr,t),Ie(e,t)}}function Ug(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Pe(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),Ie(e,t)}else{if(Pe(e,n))return;Cc.set(n),s.uniformMatrix2fv(this.addr,!1,Cc),Ie(e,n)}}function Ng(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Pe(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),Ie(e,t)}else{if(Pe(e,n))return;Rc.set(n),s.uniformMatrix3fv(this.addr,!1,Rc),Ie(e,n)}}function kg(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Pe(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),Ie(e,t)}else{if(Pe(e,n))return;Ac.set(n),s.uniformMatrix4fv(this.addr,!1,Ac),Ie(e,n)}}function Fg(s,t){const e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t)}function Og(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Pe(e,t))return;s.uniform2iv(this.addr,t),Ie(e,t)}}function Bg(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Pe(e,t))return;s.uniform3iv(this.addr,t),Ie(e,t)}}function zg(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Pe(e,t))return;s.uniform4iv(this.addr,t),Ie(e,t)}}function Gg(s,t){const e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t)}function Hg(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Pe(e,t))return;s.uniform2uiv(this.addr,t),Ie(e,t)}}function Vg(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Pe(e,t))return;s.uniform3uiv(this.addr,t),Ie(e,t)}}function Wg(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Pe(e,t))return;s.uniform4uiv(this.addr,t),Ie(e,t)}}function Xg(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(Sc.compareFunction=xh,r=Sc):r=Vh,e.setTexture2D(t||r,i)}function $g(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||Xh,i)}function Yg(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||$h,i)}function qg(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||Wh,i)}function jg(s){switch(s){case 5126:return Lg;case 35664:return Pg;case 35665:return Ig;case 35666:return Dg;case 35674:return Ug;case 35675:return Ng;case 35676:return kg;case 5124:case 35670:return Fg;case 35667:case 35671:return Og;case 35668:case 35672:return Bg;case 35669:case 35673:return zg;case 5125:return Gg;case 36294:return Hg;case 36295:return Vg;case 36296:return Wg;case 35678:case 36198:case 36298:case 36306:case 35682:return Xg;case 35679:case 36299:case 36307:return $g;case 35680:case 36300:case 36308:case 36293:return Yg;case 36289:case 36303:case 36311:case 36292:return qg}}function Zg(s,t){s.uniform1fv(this.addr,t)}function Kg(s,t){const e=hs(t,this.size,2);s.uniform2fv(this.addr,e)}function Jg(s,t){const e=hs(t,this.size,3);s.uniform3fv(this.addr,e)}function Qg(s,t){const e=hs(t,this.size,4);s.uniform4fv(this.addr,e)}function t0(s,t){const e=hs(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e)}function e0(s,t){const e=hs(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,e)}function n0(s,t){const e=hs(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e)}function i0(s,t){s.uniform1iv(this.addr,t)}function s0(s,t){s.uniform2iv(this.addr,t)}function r0(s,t){s.uniform3iv(this.addr,t)}function o0(s,t){s.uniform4iv(this.addr,t)}function a0(s,t){s.uniform1uiv(this.addr,t)}function l0(s,t){s.uniform2uiv(this.addr,t)}function c0(s,t){s.uniform3uiv(this.addr,t)}function h0(s,t){s.uniform4uiv(this.addr,t)}function d0(s,t,e){const n=this.cache,i=t.length,r=co(e,i);Pe(n,r)||(s.uniform1iv(this.addr,r),Ie(n,r));for(let o=0;o!==i;++o)e.setTexture2D(t[o]||Vh,r[o])}function u0(s,t,e){const n=this.cache,i=t.length,r=co(e,i);Pe(n,r)||(s.uniform1iv(this.addr,r),Ie(n,r));for(let o=0;o!==i;++o)e.setTexture3D(t[o]||Xh,r[o])}function f0(s,t,e){const n=this.cache,i=t.length,r=co(e,i);Pe(n,r)||(s.uniform1iv(this.addr,r),Ie(n,r));for(let o=0;o!==i;++o)e.setTextureCube(t[o]||$h,r[o])}function p0(s,t,e){const n=this.cache,i=t.length,r=co(e,i);Pe(n,r)||(s.uniform1iv(this.addr,r),Ie(n,r));for(let o=0;o!==i;++o)e.setTexture2DArray(t[o]||Wh,r[o])}function m0(s){switch(s){case 5126:return Zg;case 35664:return Kg;case 35665:return Jg;case 35666:return Qg;case 35674:return t0;case 35675:return e0;case 35676:return n0;case 5124:case 35670:return i0;case 35667:case 35671:return s0;case 35668:case 35672:return r0;case 35669:case 35673:return o0;case 5125:return a0;case 36294:return l0;case 36295:return c0;case 36296:return h0;case 35678:case 36198:case 36298:case 36306:case 35682:return d0;case 35679:case 36299:case 36307:return u0;case 35680:case 36300:case 36308:case 36293:return f0;case 36289:case 36303:case 36311:case 36292:return p0}}class g0{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=jg(e.type)}}class v0{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=m0(e.type)}}class _0{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const i=this.seq;for(let r=0,o=i.length;r!==o;++r){const a=i[r];a.setValue(t,e[a.id],n)}}}const Zo=/(\w+)(\])?(\[|\.)?/g;function Lc(s,t){s.seq.push(t),s.map[t.id]=t}function x0(s,t,e){const n=s.name,i=n.length;for(Zo.lastIndex=0;;){const r=Zo.exec(n),o=Zo.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){Lc(e,c===void 0?new g0(a,s,t):new v0(a,s,t));break}else{let d=e.map[a];d===void 0&&(d=new _0(a),Lc(e,d)),e=d}}}class Gr{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const r=t.getActiveUniform(e,i),o=t.getUniformLocation(e,r.name);x0(r,o,this)}}setValue(t,e,n,i){const r=this.map[e];r!==void 0&&r.setValue(t,n,i)}setOptional(t,e,n){const i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let r=0,o=e.length;r!==o;++r){const a=e[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,i)}}static seqWithValue(t,e){const n=[];for(let i=0,r=t.length;i!==r;++i){const o=t[i];o.id in e&&n.push(o)}return n}}function Pc(s,t,e){const n=s.createShader(t);return s.shaderSource(n,e),s.compileShader(n),n}const y0=37297;let b0=0;function w0(s,t){const e=s.split(`
`),n=[],i=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=i;o<r;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}const Ic=new $t;function M0(s){se._getMatrix(Ic,se.workingColorSpace,s);const t=`mat3( ${Ic.elements.map(e=>e.toFixed(4))} )`;switch(se.getTransfer(s)){case Wr:return[t,"LinearTransferOETF"];case pe:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",s),[t,"LinearTransferOETF"]}}function Dc(s,t,e){const n=s.getShaderParameter(t,s.COMPILE_STATUS),i=s.getShaderInfoLog(t).trim();if(n&&i==="")return"";const r=/ERROR: 0:(\d+)/.exec(i);if(r){const o=parseInt(r[1]);return e.toUpperCase()+`

`+i+`

`+w0(s.getShaderSource(t),o)}else return i}function S0(s,t){const e=M0(t);return[`vec4 ${s}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function T0(s,t){let e;switch(t){case Fd:e="Linear";break;case Od:e="Reinhard";break;case Bd:e="Cineon";break;case ah:e="ACESFilmic";break;case Gd:e="AgX";break;case Hd:e="Neutral";break;case zd:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Rr=new I;function E0(){se.getLuminanceCoefficients(Rr);const s=Rr.x.toFixed(4),t=Rr.y.toFixed(4),e=Rr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function A0(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ss).join(`
`)}function R0(s){const t=[];for(const e in s){const n=s[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function C0(s,t){const e={},n=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const r=s.getActiveAttrib(t,i),o=r.name;let a=1;r.type===s.FLOAT_MAT2&&(a=2),r.type===s.FLOAT_MAT3&&(a=3),r.type===s.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:s.getAttribLocation(t,o),locationSize:a}}return e}function Ss(s){return s!==""}function Uc(s,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Nc(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const L0=/^[ \t]*#include +<([\w\d./]+)>/gm;function Za(s){return s.replace(L0,I0)}const P0=new Map;function I0(s,t){let e=qt[t];if(e===void 0){const n=P0.get(t);if(n!==void 0)e=qt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Za(e)}const D0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function kc(s){return s.replace(D0,U0)}function U0(s,t,e,n){let i="";for(let r=parseInt(t);r<parseInt(e);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function Fc(s){let t=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?t+=`
#define HIGH_PRECISION`:s.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function N0(s){let t="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===sh?t="SHADOWMAP_TYPE_PCF":s.shadowMapType===rh?t="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===Dn&&(t="SHADOWMAP_TYPE_VSM"),t}function k0(s){let t="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case ts:case es:t="ENVMAP_TYPE_CUBE";break;case so:t="ENVMAP_TYPE_CUBE_UV";break}return t}function F0(s){let t="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case es:t="ENVMAP_MODE_REFRACTION";break}return t}function O0(s){let t="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case oh:t="ENVMAP_BLENDING_MULTIPLY";break;case Nd:t="ENVMAP_BLENDING_MIX";break;case kd:t="ENVMAP_BLENDING_ADD";break}return t}function B0(s){const t=s.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function z0(s,t,e,n){const i=s.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const l=N0(e),c=k0(e),h=F0(e),d=O0(e),u=B0(e),f=A0(e),g=R0(r),v=i.createProgram();let m,p,b=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Ss).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Ss).join(`
`),p.length>0&&(p+=`
`)):(m=[Fc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ss).join(`
`),p=[Fc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Jn?"#define TONE_MAPPING":"",e.toneMapping!==Jn?qt.tonemapping_pars_fragment:"",e.toneMapping!==Jn?T0("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",qt.colorspace_pars_fragment,S0("linearToOutputTexel",e.outputColorSpace),E0(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Ss).join(`
`)),o=Za(o),o=Uc(o,e),o=Nc(o,e),a=Za(a),a=Uc(a,e),a=Nc(a,e),o=kc(o),a=kc(a),e.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===kl?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===kl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const x=b+m+o,_=b+p+a,L=Pc(i,i.VERTEX_SHADER,x),R=Pc(i,i.FRAGMENT_SHADER,_);i.attachShader(v,L),i.attachShader(v,R),e.index0AttributeName!==void 0?i.bindAttribLocation(v,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(v,0,"position"),i.linkProgram(v);function E(D){if(s.debug.checkShaderErrors){const O=i.getProgramInfoLog(v).trim(),B=i.getShaderInfoLog(L).trim(),V=i.getShaderInfoLog(R).trim();let $=!0,X=!0;if(i.getProgramParameter(v,i.LINK_STATUS)===!1)if($=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,v,L,R);else{const K=Dc(i,L,"vertex"),W=Dc(i,R,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(v,i.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+O+`
`+K+`
`+W)}else O!==""?console.warn("THREE.WebGLProgram: Program Info Log:",O):(B===""||V==="")&&(X=!1);X&&(D.diagnostics={runnable:$,programLog:O,vertexShader:{log:B,prefix:m},fragmentShader:{log:V,prefix:p}})}i.deleteShader(L),i.deleteShader(R),P=new Gr(i,v),M=C0(i,v)}let P;this.getUniforms=function(){return P===void 0&&E(this),P};let M;this.getAttributes=function(){return M===void 0&&E(this),M};let y=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=i.getProgramParameter(v,y0)),y},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=b0++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=L,this.fragmentShader=R,this}let G0=0;class H0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new V0(t),e.set(t,n)),n}}class V0{constructor(t){this.id=G0++,this.code=t,this.usedTimes=0}}function W0(s,t,e,n,i,r,o){const a=new hl,l=new H0,c=new Set,h=[],d=i.logarithmicDepthBuffer,u=i.vertexTextures;let f=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(M){return c.add(M),M===0?"uv":`uv${M}`}function m(M,y,D,O,B){const V=O.fog,$=B.geometry,X=M.isMeshStandardMaterial?O.environment:null,K=(M.isMeshStandardMaterial?e:t).get(M.envMap||X),W=K&&K.mapping===so?K.image.height:null,lt=g[M.type];M.precision!==null&&(f=i.getMaxPrecision(M.precision),f!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",f,"instead."));const yt=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,Et=yt!==void 0?yt.length:0;let Wt=0;$.morphAttributes.position!==void 0&&(Wt=1),$.morphAttributes.normal!==void 0&&(Wt=2),$.morphAttributes.color!==void 0&&(Wt=3);let ae,Z,ot,Rt;if(lt){const he=bn[lt];ae=he.vertexShader,Z=he.fragmentShader}else ae=M.vertexShader,Z=M.fragmentShader,l.update(M),ot=l.getVertexShaderID(M),Rt=l.getFragmentShaderID(M);const ht=s.getRenderTarget(),Ut=s.state.buffers.depth.getReversed(),Ht=B.isInstancedMesh===!0,Bt=B.isBatchedMesh===!0,ee=!!M.map,Q=!!M.matcap,rt=!!K,C=!!M.aoMap,Lt=!!M.lightMap,et=!!M.bumpMap,wt=!!M.normalMap,ct=!!M.displacementMap,Ot=!!M.emissiveMap,_t=!!M.metalnessMap,A=!!M.roughnessMap,w=M.anisotropy>0,F=M.clearcoat>0,q=M.dispersion>0,tt=M.iridescence>0,j=M.sheen>0,Ct=M.transmission>0,ut=w&&!!M.anisotropyMap,bt=F&&!!M.clearcoatMap,Kt=F&&!!M.clearcoatNormalMap,st=F&&!!M.clearcoatRoughnessMap,St=tt&&!!M.iridescenceMap,Ft=tt&&!!M.iridescenceThicknessMap,zt=j&&!!M.sheenColorMap,Tt=j&&!!M.sheenRoughnessMap,Qt=!!M.specularMap,Yt=!!M.specularColorMap,ve=!!M.specularIntensityMap,U=Ct&&!!M.transmissionMap,ft=Ct&&!!M.thicknessMap,Y=!!M.gradientMap,J=!!M.alphaMap,xt=M.alphaTest>0,vt=!!M.alphaHash,Xt=!!M.extensions;let Me=Jn;M.toneMapped&&(ht===null||ht.isXRRenderTarget===!0)&&(Me=s.toneMapping);const Be={shaderID:lt,shaderType:M.type,shaderName:M.name,vertexShader:ae,fragmentShader:Z,defines:M.defines,customVertexShaderID:ot,customFragmentShaderID:Rt,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:f,batching:Bt,batchingColor:Bt&&B._colorsTexture!==null,instancing:Ht,instancingColor:Ht&&B.instanceColor!==null,instancingMorph:Ht&&B.morphTexture!==null,supportsVertexTextures:u,outputColorSpace:ht===null?s.outputColorSpace:ht.isXRRenderTarget===!0?ht.texture.colorSpace:rs,alphaToCoverage:!!M.alphaToCoverage,map:ee,matcap:Q,envMap:rt,envMapMode:rt&&K.mapping,envMapCubeUVHeight:W,aoMap:C,lightMap:Lt,bumpMap:et,normalMap:wt,displacementMap:u&&ct,emissiveMap:Ot,normalMapObjectSpace:wt&&M.normalMapType===$d,normalMapTangentSpace:wt&&M.normalMapType===_h,metalnessMap:_t,roughnessMap:A,anisotropy:w,anisotropyMap:ut,clearcoat:F,clearcoatMap:bt,clearcoatNormalMap:Kt,clearcoatRoughnessMap:st,dispersion:q,iridescence:tt,iridescenceMap:St,iridescenceThicknessMap:Ft,sheen:j,sheenColorMap:zt,sheenRoughnessMap:Tt,specularMap:Qt,specularColorMap:Yt,specularIntensityMap:ve,transmission:Ct,transmissionMap:U,thicknessMap:ft,gradientMap:Y,opaque:M.transparent===!1&&M.blending===Zi&&M.alphaToCoverage===!1,alphaMap:J,alphaTest:xt,alphaHash:vt,combine:M.combine,mapUv:ee&&v(M.map.channel),aoMapUv:C&&v(M.aoMap.channel),lightMapUv:Lt&&v(M.lightMap.channel),bumpMapUv:et&&v(M.bumpMap.channel),normalMapUv:wt&&v(M.normalMap.channel),displacementMapUv:ct&&v(M.displacementMap.channel),emissiveMapUv:Ot&&v(M.emissiveMap.channel),metalnessMapUv:_t&&v(M.metalnessMap.channel),roughnessMapUv:A&&v(M.roughnessMap.channel),anisotropyMapUv:ut&&v(M.anisotropyMap.channel),clearcoatMapUv:bt&&v(M.clearcoatMap.channel),clearcoatNormalMapUv:Kt&&v(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:st&&v(M.clearcoatRoughnessMap.channel),iridescenceMapUv:St&&v(M.iridescenceMap.channel),iridescenceThicknessMapUv:Ft&&v(M.iridescenceThicknessMap.channel),sheenColorMapUv:zt&&v(M.sheenColorMap.channel),sheenRoughnessMapUv:Tt&&v(M.sheenRoughnessMap.channel),specularMapUv:Qt&&v(M.specularMap.channel),specularColorMapUv:Yt&&v(M.specularColorMap.channel),specularIntensityMapUv:ve&&v(M.specularIntensityMap.channel),transmissionMapUv:U&&v(M.transmissionMap.channel),thicknessMapUv:ft&&v(M.thicknessMap.channel),alphaMapUv:J&&v(M.alphaMap.channel),vertexTangents:!!$.attributes.tangent&&(wt||w),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!$.attributes.uv&&(ee||J),fog:!!V,useFog:M.fog===!0,fogExp2:!!V&&V.isFogExp2,flatShading:M.flatShading===!0,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:Ut,skinning:B.isSkinnedMesh===!0,morphTargets:$.morphAttributes.position!==void 0,morphNormals:$.morphAttributes.normal!==void 0,morphColors:$.morphAttributes.color!==void 0,morphTargetsCount:Et,morphTextureStride:Wt,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:M.dithering,shadowMapEnabled:s.shadowMap.enabled&&D.length>0,shadowMapType:s.shadowMap.type,toneMapping:Me,decodeVideoTexture:ee&&M.map.isVideoTexture===!0&&se.getTransfer(M.map.colorSpace)===pe,decodeVideoTextureEmissive:Ot&&M.emissiveMap.isVideoTexture===!0&&se.getTransfer(M.emissiveMap.colorSpace)===pe,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===ln,flipSided:M.side===je,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:Xt&&M.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Xt&&M.extensions.multiDraw===!0||Bt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return Be.vertexUv1s=c.has(1),Be.vertexUv2s=c.has(2),Be.vertexUv3s=c.has(3),c.clear(),Be}function p(M){const y=[];if(M.shaderID?y.push(M.shaderID):(y.push(M.customVertexShaderID),y.push(M.customFragmentShaderID)),M.defines!==void 0)for(const D in M.defines)y.push(D),y.push(M.defines[D]);return M.isRawShaderMaterial===!1&&(b(y,M),x(y,M),y.push(s.outputColorSpace)),y.push(M.customProgramCacheKey),y.join()}function b(M,y){M.push(y.precision),M.push(y.outputColorSpace),M.push(y.envMapMode),M.push(y.envMapCubeUVHeight),M.push(y.mapUv),M.push(y.alphaMapUv),M.push(y.lightMapUv),M.push(y.aoMapUv),M.push(y.bumpMapUv),M.push(y.normalMapUv),M.push(y.displacementMapUv),M.push(y.emissiveMapUv),M.push(y.metalnessMapUv),M.push(y.roughnessMapUv),M.push(y.anisotropyMapUv),M.push(y.clearcoatMapUv),M.push(y.clearcoatNormalMapUv),M.push(y.clearcoatRoughnessMapUv),M.push(y.iridescenceMapUv),M.push(y.iridescenceThicknessMapUv),M.push(y.sheenColorMapUv),M.push(y.sheenRoughnessMapUv),M.push(y.specularMapUv),M.push(y.specularColorMapUv),M.push(y.specularIntensityMapUv),M.push(y.transmissionMapUv),M.push(y.thicknessMapUv),M.push(y.combine),M.push(y.fogExp2),M.push(y.sizeAttenuation),M.push(y.morphTargetsCount),M.push(y.morphAttributeCount),M.push(y.numDirLights),M.push(y.numPointLights),M.push(y.numSpotLights),M.push(y.numSpotLightMaps),M.push(y.numHemiLights),M.push(y.numRectAreaLights),M.push(y.numDirLightShadows),M.push(y.numPointLightShadows),M.push(y.numSpotLightShadows),M.push(y.numSpotLightShadowsWithMaps),M.push(y.numLightProbes),M.push(y.shadowMapType),M.push(y.toneMapping),M.push(y.numClippingPlanes),M.push(y.numClipIntersection),M.push(y.depthPacking)}function x(M,y){a.disableAll(),y.supportsVertexTextures&&a.enable(0),y.instancing&&a.enable(1),y.instancingColor&&a.enable(2),y.instancingMorph&&a.enable(3),y.matcap&&a.enable(4),y.envMap&&a.enable(5),y.normalMapObjectSpace&&a.enable(6),y.normalMapTangentSpace&&a.enable(7),y.clearcoat&&a.enable(8),y.iridescence&&a.enable(9),y.alphaTest&&a.enable(10),y.vertexColors&&a.enable(11),y.vertexAlphas&&a.enable(12),y.vertexUv1s&&a.enable(13),y.vertexUv2s&&a.enable(14),y.vertexUv3s&&a.enable(15),y.vertexTangents&&a.enable(16),y.anisotropy&&a.enable(17),y.alphaHash&&a.enable(18),y.batching&&a.enable(19),y.dispersion&&a.enable(20),y.batchingColor&&a.enable(21),M.push(a.mask),a.disableAll(),y.fog&&a.enable(0),y.useFog&&a.enable(1),y.flatShading&&a.enable(2),y.logarithmicDepthBuffer&&a.enable(3),y.reverseDepthBuffer&&a.enable(4),y.skinning&&a.enable(5),y.morphTargets&&a.enable(6),y.morphNormals&&a.enable(7),y.morphColors&&a.enable(8),y.premultipliedAlpha&&a.enable(9),y.shadowMapEnabled&&a.enable(10),y.doubleSided&&a.enable(11),y.flipSided&&a.enable(12),y.useDepthPacking&&a.enable(13),y.dithering&&a.enable(14),y.transmission&&a.enable(15),y.sheen&&a.enable(16),y.opaque&&a.enable(17),y.pointsUvs&&a.enable(18),y.decodeVideoTexture&&a.enable(19),y.decodeVideoTextureEmissive&&a.enable(20),y.alphaToCoverage&&a.enable(21),M.push(a.mask)}function _(M){const y=g[M.type];let D;if(y){const O=bn[y];D=Ou.clone(O.uniforms)}else D=M.uniforms;return D}function L(M,y){let D;for(let O=0,B=h.length;O<B;O++){const V=h[O];if(V.cacheKey===y){D=V,++D.usedTimes;break}}return D===void 0&&(D=new z0(s,y,M,r),h.push(D)),D}function R(M){if(--M.usedTimes===0){const y=h.indexOf(M);h[y]=h[h.length-1],h.pop(),M.destroy()}}function E(M){l.remove(M)}function P(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:_,acquireProgram:L,releaseProgram:R,releaseShaderCache:E,programs:h,dispose:P}}function X0(){let s=new WeakMap;function t(o){return s.has(o)}function e(o){let a=s.get(o);return a===void 0&&(a={},s.set(o,a)),a}function n(o){s.delete(o)}function i(o,a,l){s.get(o)[a]=l}function r(){s=new WeakMap}return{has:t,get:e,remove:n,update:i,dispose:r}}function $0(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.z!==t.z?s.z-t.z:s.id-t.id}function Oc(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function Bc(){const s=[];let t=0;const e=[],n=[],i=[];function r(){t=0,e.length=0,n.length=0,i.length=0}function o(d,u,f,g,v,m){let p=s[t];return p===void 0?(p={id:d.id,object:d,geometry:u,material:f,groupOrder:g,renderOrder:d.renderOrder,z:v,group:m},s[t]=p):(p.id=d.id,p.object=d,p.geometry=u,p.material=f,p.groupOrder=g,p.renderOrder=d.renderOrder,p.z=v,p.group=m),t++,p}function a(d,u,f,g,v,m){const p=o(d,u,f,g,v,m);f.transmission>0?n.push(p):f.transparent===!0?i.push(p):e.push(p)}function l(d,u,f,g,v,m){const p=o(d,u,f,g,v,m);f.transmission>0?n.unshift(p):f.transparent===!0?i.unshift(p):e.unshift(p)}function c(d,u){e.length>1&&e.sort(d||$0),n.length>1&&n.sort(u||Oc),i.length>1&&i.sort(u||Oc)}function h(){for(let d=t,u=s.length;d<u;d++){const f=s[d];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:i,init:r,push:a,unshift:l,finish:h,sort:c}}function Y0(){let s=new WeakMap;function t(n,i){const r=s.get(n);let o;return r===void 0?(o=new Bc,s.set(n,[o])):i>=r.length?(o=new Bc,r.push(o)):o=r[i],o}function e(){s=new WeakMap}return{get:t,dispose:e}}function q0(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new I,color:new Zt};break;case"SpotLight":e={position:new I,direction:new I,color:new Zt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new I,color:new Zt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new I,skyColor:new Zt,groundColor:new Zt};break;case"RectAreaLight":e={color:new Zt,position:new I,halfWidth:new I,halfHeight:new I};break}return s[t.id]=e,e}}}function j0(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new at};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new at};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new at,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=e,e}}}let Z0=0;function K0(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function J0(s){const t=new q0,e=j0(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new I);const i=new I,r=new ge,o=new ge;function a(c){let h=0,d=0,u=0;for(let M=0;M<9;M++)n.probe[M].set(0,0,0);let f=0,g=0,v=0,m=0,p=0,b=0,x=0,_=0,L=0,R=0,E=0;c.sort(K0);for(let M=0,y=c.length;M<y;M++){const D=c[M],O=D.color,B=D.intensity,V=D.distance,$=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.isAmbientLight)h+=O.r*B,d+=O.g*B,u+=O.b*B;else if(D.isLightProbe){for(let X=0;X<9;X++)n.probe[X].addScaledVector(D.sh.coefficients[X],B);E++}else if(D.isDirectionalLight){const X=t.get(D);if(X.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const K=D.shadow,W=e.get(D);W.shadowIntensity=K.intensity,W.shadowBias=K.bias,W.shadowNormalBias=K.normalBias,W.shadowRadius=K.radius,W.shadowMapSize=K.mapSize,n.directionalShadow[f]=W,n.directionalShadowMap[f]=$,n.directionalShadowMatrix[f]=D.shadow.matrix,b++}n.directional[f]=X,f++}else if(D.isSpotLight){const X=t.get(D);X.position.setFromMatrixPosition(D.matrixWorld),X.color.copy(O).multiplyScalar(B),X.distance=V,X.coneCos=Math.cos(D.angle),X.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),X.decay=D.decay,n.spot[v]=X;const K=D.shadow;if(D.map&&(n.spotLightMap[L]=D.map,L++,K.updateMatrices(D),D.castShadow&&R++),n.spotLightMatrix[v]=K.matrix,D.castShadow){const W=e.get(D);W.shadowIntensity=K.intensity,W.shadowBias=K.bias,W.shadowNormalBias=K.normalBias,W.shadowRadius=K.radius,W.shadowMapSize=K.mapSize,n.spotShadow[v]=W,n.spotShadowMap[v]=$,_++}v++}else if(D.isRectAreaLight){const X=t.get(D);X.color.copy(O).multiplyScalar(B),X.halfWidth.set(D.width*.5,0,0),X.halfHeight.set(0,D.height*.5,0),n.rectArea[m]=X,m++}else if(D.isPointLight){const X=t.get(D);if(X.color.copy(D.color).multiplyScalar(D.intensity),X.distance=D.distance,X.decay=D.decay,D.castShadow){const K=D.shadow,W=e.get(D);W.shadowIntensity=K.intensity,W.shadowBias=K.bias,W.shadowNormalBias=K.normalBias,W.shadowRadius=K.radius,W.shadowMapSize=K.mapSize,W.shadowCameraNear=K.camera.near,W.shadowCameraFar=K.camera.far,n.pointShadow[g]=W,n.pointShadowMap[g]=$,n.pointShadowMatrix[g]=D.shadow.matrix,x++}n.point[g]=X,g++}else if(D.isHemisphereLight){const X=t.get(D);X.skyColor.copy(D.color).multiplyScalar(B),X.groundColor.copy(D.groundColor).multiplyScalar(B),n.hemi[p]=X,p++}}m>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=dt.LTC_FLOAT_1,n.rectAreaLTC2=dt.LTC_FLOAT_2):(n.rectAreaLTC1=dt.LTC_HALF_1,n.rectAreaLTC2=dt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=u;const P=n.hash;(P.directionalLength!==f||P.pointLength!==g||P.spotLength!==v||P.rectAreaLength!==m||P.hemiLength!==p||P.numDirectionalShadows!==b||P.numPointShadows!==x||P.numSpotShadows!==_||P.numSpotMaps!==L||P.numLightProbes!==E)&&(n.directional.length=f,n.spot.length=v,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=b,n.directionalShadowMap.length=b,n.pointShadow.length=x,n.pointShadowMap.length=x,n.spotShadow.length=_,n.spotShadowMap.length=_,n.directionalShadowMatrix.length=b,n.pointShadowMatrix.length=x,n.spotLightMatrix.length=_+L-R,n.spotLightMap.length=L,n.numSpotLightShadowsWithMaps=R,n.numLightProbes=E,P.directionalLength=f,P.pointLength=g,P.spotLength=v,P.rectAreaLength=m,P.hemiLength=p,P.numDirectionalShadows=b,P.numPointShadows=x,P.numSpotShadows=_,P.numSpotMaps=L,P.numLightProbes=E,n.version=Z0++)}function l(c,h){let d=0,u=0,f=0,g=0,v=0;const m=h.matrixWorldInverse;for(let p=0,b=c.length;p<b;p++){const x=c[p];if(x.isDirectionalLight){const _=n.directional[d];_.direction.setFromMatrixPosition(x.matrixWorld),i.setFromMatrixPosition(x.target.matrixWorld),_.direction.sub(i),_.direction.transformDirection(m),d++}else if(x.isSpotLight){const _=n.spot[f];_.position.setFromMatrixPosition(x.matrixWorld),_.position.applyMatrix4(m),_.direction.setFromMatrixPosition(x.matrixWorld),i.setFromMatrixPosition(x.target.matrixWorld),_.direction.sub(i),_.direction.transformDirection(m),f++}else if(x.isRectAreaLight){const _=n.rectArea[g];_.position.setFromMatrixPosition(x.matrixWorld),_.position.applyMatrix4(m),o.identity(),r.copy(x.matrixWorld),r.premultiply(m),o.extractRotation(r),_.halfWidth.set(x.width*.5,0,0),_.halfHeight.set(0,x.height*.5,0),_.halfWidth.applyMatrix4(o),_.halfHeight.applyMatrix4(o),g++}else if(x.isPointLight){const _=n.point[u];_.position.setFromMatrixPosition(x.matrixWorld),_.position.applyMatrix4(m),u++}else if(x.isHemisphereLight){const _=n.hemi[v];_.direction.setFromMatrixPosition(x.matrixWorld),_.direction.transformDirection(m),v++}}}return{setup:a,setupView:l,state:n}}function zc(s){const t=new J0(s),e=[],n=[];function i(h){c.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function o(h){n.push(h)}function a(){t.setup(e)}function l(h){t.setupView(e,h)}const c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function Q0(s){let t=new WeakMap;function e(i,r=0){const o=t.get(i);let a;return o===void 0?(a=new zc(s),t.set(i,[a])):r>=o.length?(a=new zc(s),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}const tv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,ev=`uniform sampler2D shadow_pass;
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
}`;function nv(s,t,e){let n=new dl;const i=new at,r=new at,o=new me,a=new Ef({depthPacking:Xd}),l=new Af,c={},h=e.maxTextureSize,d={[ti]:je,[je]:ti,[ln]:ln},u=new ei({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new at},radius:{value:4}},vertexShader:tv,fragmentShader:ev}),f=u.clone();f.defines.HORIZONTAL_PASS=1;const g=new we;g.setAttribute("position",new Ze(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new It(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=sh;let p=this.type;this.render=function(R,E,P){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||R.length===0)return;const M=s.getRenderTarget(),y=s.getActiveCubeFace(),D=s.getActiveMipmapLevel(),O=s.state;O.setBlending(Kn),O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);const B=p!==Dn&&this.type===Dn,V=p===Dn&&this.type!==Dn;for(let $=0,X=R.length;$<X;$++){const K=R[$],W=K.shadow;if(W===void 0){console.warn("THREE.WebGLShadowMap:",K,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;i.copy(W.mapSize);const lt=W.getFrameExtents();if(i.multiply(lt),r.copy(W.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/lt.x),i.x=r.x*lt.x,W.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/lt.y),i.y=r.y*lt.y,W.mapSize.y=r.y)),W.map===null||B===!0||V===!0){const Et=this.type!==Dn?{minFilter:Xe,magFilter:Xe}:{};W.map!==null&&W.map.dispose(),W.map=new yi(i.x,i.y,Et),W.map.texture.name=K.name+".shadowMap",W.camera.updateProjectionMatrix()}s.setRenderTarget(W.map),s.clear();const yt=W.getViewportCount();for(let Et=0;Et<yt;Et++){const Wt=W.getViewport(Et);o.set(r.x*Wt.x,r.y*Wt.y,r.x*Wt.z,r.y*Wt.w),O.viewport(o),W.updateMatrices(K,Et),n=W.getFrustum(),_(E,P,W.camera,K,this.type)}W.isPointLightShadow!==!0&&this.type===Dn&&b(W,P),W.needsUpdate=!1}p=this.type,m.needsUpdate=!1,s.setRenderTarget(M,y,D)};function b(R,E){const P=t.update(v);u.defines.VSM_SAMPLES!==R.blurSamples&&(u.defines.VSM_SAMPLES=R.blurSamples,f.defines.VSM_SAMPLES=R.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),R.mapPass===null&&(R.mapPass=new yi(i.x,i.y)),u.uniforms.shadow_pass.value=R.map.texture,u.uniforms.resolution.value=R.mapSize,u.uniforms.radius.value=R.radius,s.setRenderTarget(R.mapPass),s.clear(),s.renderBufferDirect(E,null,P,u,v,null),f.uniforms.shadow_pass.value=R.mapPass.texture,f.uniforms.resolution.value=R.mapSize,f.uniforms.radius.value=R.radius,s.setRenderTarget(R.map),s.clear(),s.renderBufferDirect(E,null,P,f,v,null)}function x(R,E,P,M){let y=null;const D=P.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(D!==void 0)y=D;else if(y=P.isPointLight===!0?l:a,s.localClippingEnabled&&E.clipShadows===!0&&Array.isArray(E.clippingPlanes)&&E.clippingPlanes.length!==0||E.displacementMap&&E.displacementScale!==0||E.alphaMap&&E.alphaTest>0||E.map&&E.alphaTest>0){const O=y.uuid,B=E.uuid;let V=c[O];V===void 0&&(V={},c[O]=V);let $=V[B];$===void 0&&($=y.clone(),V[B]=$,E.addEventListener("dispose",L)),y=$}if(y.visible=E.visible,y.wireframe=E.wireframe,M===Dn?y.side=E.shadowSide!==null?E.shadowSide:E.side:y.side=E.shadowSide!==null?E.shadowSide:d[E.side],y.alphaMap=E.alphaMap,y.alphaTest=E.alphaTest,y.map=E.map,y.clipShadows=E.clipShadows,y.clippingPlanes=E.clippingPlanes,y.clipIntersection=E.clipIntersection,y.displacementMap=E.displacementMap,y.displacementScale=E.displacementScale,y.displacementBias=E.displacementBias,y.wireframeLinewidth=E.wireframeLinewidth,y.linewidth=E.linewidth,P.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const O=s.properties.get(y);O.light=P}return y}function _(R,E,P,M,y){if(R.visible===!1)return;if(R.layers.test(E.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&y===Dn)&&(!R.frustumCulled||n.intersectsObject(R))){R.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse,R.matrixWorld);const B=t.update(R),V=R.material;if(Array.isArray(V)){const $=B.groups;for(let X=0,K=$.length;X<K;X++){const W=$[X],lt=V[W.materialIndex];if(lt&&lt.visible){const yt=x(R,lt,M,y);R.onBeforeShadow(s,R,E,P,B,yt,W),s.renderBufferDirect(P,null,B,yt,R,W),R.onAfterShadow(s,R,E,P,B,yt,W)}}}else if(V.visible){const $=x(R,V,M,y);R.onBeforeShadow(s,R,E,P,B,$,null),s.renderBufferDirect(P,null,B,$,R,null),R.onAfterShadow(s,R,E,P,B,$,null)}}const O=R.children;for(let B=0,V=O.length;B<V;B++)_(O[B],E,P,M,y)}function L(R){R.target.removeEventListener("dispose",L);for(const P in c){const M=c[P],y=R.target.uuid;y in M&&(M[y].dispose(),delete M[y])}}}const iv={[ha]:da,[ua]:ma,[fa]:ga,[Qi]:pa,[da]:ha,[ma]:ua,[ga]:fa,[pa]:Qi};function sv(s,t){function e(){let U=!1;const ft=new me;let Y=null;const J=new me(0,0,0,0);return{setMask:function(xt){Y!==xt&&!U&&(s.colorMask(xt,xt,xt,xt),Y=xt)},setLocked:function(xt){U=xt},setClear:function(xt,vt,Xt,Me,Be){Be===!0&&(xt*=Me,vt*=Me,Xt*=Me),ft.set(xt,vt,Xt,Me),J.equals(ft)===!1&&(s.clearColor(xt,vt,Xt,Me),J.copy(ft))},reset:function(){U=!1,Y=null,J.set(-1,0,0,0)}}}function n(){let U=!1,ft=!1,Y=null,J=null,xt=null;return{setReversed:function(vt){if(ft!==vt){const Xt=t.get("EXT_clip_control");ft?Xt.clipControlEXT(Xt.LOWER_LEFT_EXT,Xt.ZERO_TO_ONE_EXT):Xt.clipControlEXT(Xt.LOWER_LEFT_EXT,Xt.NEGATIVE_ONE_TO_ONE_EXT);const Me=xt;xt=null,this.setClear(Me)}ft=vt},getReversed:function(){return ft},setTest:function(vt){vt?ht(s.DEPTH_TEST):Ut(s.DEPTH_TEST)},setMask:function(vt){Y!==vt&&!U&&(s.depthMask(vt),Y=vt)},setFunc:function(vt){if(ft&&(vt=iv[vt]),J!==vt){switch(vt){case ha:s.depthFunc(s.NEVER);break;case da:s.depthFunc(s.ALWAYS);break;case ua:s.depthFunc(s.LESS);break;case Qi:s.depthFunc(s.LEQUAL);break;case fa:s.depthFunc(s.EQUAL);break;case pa:s.depthFunc(s.GEQUAL);break;case ma:s.depthFunc(s.GREATER);break;case ga:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}J=vt}},setLocked:function(vt){U=vt},setClear:function(vt){xt!==vt&&(ft&&(vt=1-vt),s.clearDepth(vt),xt=vt)},reset:function(){U=!1,Y=null,J=null,xt=null,ft=!1}}}function i(){let U=!1,ft=null,Y=null,J=null,xt=null,vt=null,Xt=null,Me=null,Be=null;return{setTest:function(he){U||(he?ht(s.STENCIL_TEST):Ut(s.STENCIL_TEST))},setMask:function(he){ft!==he&&!U&&(s.stencilMask(he),ft=he)},setFunc:function(he,cn,Tn){(Y!==he||J!==cn||xt!==Tn)&&(s.stencilFunc(he,cn,Tn),Y=he,J=cn,xt=Tn)},setOp:function(he,cn,Tn){(vt!==he||Xt!==cn||Me!==Tn)&&(s.stencilOp(he,cn,Tn),vt=he,Xt=cn,Me=Tn)},setLocked:function(he){U=he},setClear:function(he){Be!==he&&(s.clearStencil(he),Be=he)},reset:function(){U=!1,ft=null,Y=null,J=null,xt=null,vt=null,Xt=null,Me=null,Be=null}}}const r=new e,o=new n,a=new i,l=new WeakMap,c=new WeakMap;let h={},d={},u=new WeakMap,f=[],g=null,v=!1,m=null,p=null,b=null,x=null,_=null,L=null,R=null,E=new Zt(0,0,0),P=0,M=!1,y=null,D=null,O=null,B=null,V=null;const $=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let X=!1,K=0;const W=s.getParameter(s.VERSION);W.indexOf("WebGL")!==-1?(K=parseFloat(/^WebGL (\d)/.exec(W)[1]),X=K>=1):W.indexOf("OpenGL ES")!==-1&&(K=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),X=K>=2);let lt=null,yt={};const Et=s.getParameter(s.SCISSOR_BOX),Wt=s.getParameter(s.VIEWPORT),ae=new me().fromArray(Et),Z=new me().fromArray(Wt);function ot(U,ft,Y,J){const xt=new Uint8Array(4),vt=s.createTexture();s.bindTexture(U,vt),s.texParameteri(U,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(U,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let Xt=0;Xt<Y;Xt++)U===s.TEXTURE_3D||U===s.TEXTURE_2D_ARRAY?s.texImage3D(ft,0,s.RGBA,1,1,J,0,s.RGBA,s.UNSIGNED_BYTE,xt):s.texImage2D(ft+Xt,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,xt);return vt}const Rt={};Rt[s.TEXTURE_2D]=ot(s.TEXTURE_2D,s.TEXTURE_2D,1),Rt[s.TEXTURE_CUBE_MAP]=ot(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),Rt[s.TEXTURE_2D_ARRAY]=ot(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),Rt[s.TEXTURE_3D]=ot(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ht(s.DEPTH_TEST),o.setFunc(Qi),et(!1),wt(Pl),ht(s.CULL_FACE),C(Kn);function ht(U){h[U]!==!0&&(s.enable(U),h[U]=!0)}function Ut(U){h[U]!==!1&&(s.disable(U),h[U]=!1)}function Ht(U,ft){return d[U]!==ft?(s.bindFramebuffer(U,ft),d[U]=ft,U===s.DRAW_FRAMEBUFFER&&(d[s.FRAMEBUFFER]=ft),U===s.FRAMEBUFFER&&(d[s.DRAW_FRAMEBUFFER]=ft),!0):!1}function Bt(U,ft){let Y=f,J=!1;if(U){Y=u.get(ft),Y===void 0&&(Y=[],u.set(ft,Y));const xt=U.textures;if(Y.length!==xt.length||Y[0]!==s.COLOR_ATTACHMENT0){for(let vt=0,Xt=xt.length;vt<Xt;vt++)Y[vt]=s.COLOR_ATTACHMENT0+vt;Y.length=xt.length,J=!0}}else Y[0]!==s.BACK&&(Y[0]=s.BACK,J=!0);J&&s.drawBuffers(Y)}function ee(U){return g!==U?(s.useProgram(U),g=U,!0):!1}const Q={[mi]:s.FUNC_ADD,[_d]:s.FUNC_SUBTRACT,[xd]:s.FUNC_REVERSE_SUBTRACT};Q[yd]=s.MIN,Q[bd]=s.MAX;const rt={[wd]:s.ZERO,[Md]:s.ONE,[Sd]:s.SRC_COLOR,[la]:s.SRC_ALPHA,[Ld]:s.SRC_ALPHA_SATURATE,[Rd]:s.DST_COLOR,[Ed]:s.DST_ALPHA,[Td]:s.ONE_MINUS_SRC_COLOR,[ca]:s.ONE_MINUS_SRC_ALPHA,[Cd]:s.ONE_MINUS_DST_COLOR,[Ad]:s.ONE_MINUS_DST_ALPHA,[Pd]:s.CONSTANT_COLOR,[Id]:s.ONE_MINUS_CONSTANT_COLOR,[Dd]:s.CONSTANT_ALPHA,[Ud]:s.ONE_MINUS_CONSTANT_ALPHA};function C(U,ft,Y,J,xt,vt,Xt,Me,Be,he){if(U===Kn){v===!0&&(Ut(s.BLEND),v=!1);return}if(v===!1&&(ht(s.BLEND),v=!0),U!==vd){if(U!==m||he!==M){if((p!==mi||_!==mi)&&(s.blendEquation(s.FUNC_ADD),p=mi,_=mi),he)switch(U){case Zi:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Ls:s.blendFunc(s.ONE,s.ONE);break;case Il:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Dl:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case Zi:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Ls:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case Il:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Dl:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}b=null,x=null,L=null,R=null,E.set(0,0,0),P=0,m=U,M=he}return}xt=xt||ft,vt=vt||Y,Xt=Xt||J,(ft!==p||xt!==_)&&(s.blendEquationSeparate(Q[ft],Q[xt]),p=ft,_=xt),(Y!==b||J!==x||vt!==L||Xt!==R)&&(s.blendFuncSeparate(rt[Y],rt[J],rt[vt],rt[Xt]),b=Y,x=J,L=vt,R=Xt),(Me.equals(E)===!1||Be!==P)&&(s.blendColor(Me.r,Me.g,Me.b,Be),E.copy(Me),P=Be),m=U,M=!1}function Lt(U,ft){U.side===ln?Ut(s.CULL_FACE):ht(s.CULL_FACE);let Y=U.side===je;ft&&(Y=!Y),et(Y),U.blending===Zi&&U.transparent===!1?C(Kn):C(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),o.setFunc(U.depthFunc),o.setTest(U.depthTest),o.setMask(U.depthWrite),r.setMask(U.colorWrite);const J=U.stencilWrite;a.setTest(J),J&&(a.setMask(U.stencilWriteMask),a.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),a.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),Ot(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?ht(s.SAMPLE_ALPHA_TO_COVERAGE):Ut(s.SAMPLE_ALPHA_TO_COVERAGE)}function et(U){y!==U&&(U?s.frontFace(s.CW):s.frontFace(s.CCW),y=U)}function wt(U){U!==md?(ht(s.CULL_FACE),U!==D&&(U===Pl?s.cullFace(s.BACK):U===gd?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Ut(s.CULL_FACE),D=U}function ct(U){U!==O&&(X&&s.lineWidth(U),O=U)}function Ot(U,ft,Y){U?(ht(s.POLYGON_OFFSET_FILL),(B!==ft||V!==Y)&&(s.polygonOffset(ft,Y),B=ft,V=Y)):Ut(s.POLYGON_OFFSET_FILL)}function _t(U){U?ht(s.SCISSOR_TEST):Ut(s.SCISSOR_TEST)}function A(U){U===void 0&&(U=s.TEXTURE0+$-1),lt!==U&&(s.activeTexture(U),lt=U)}function w(U,ft,Y){Y===void 0&&(lt===null?Y=s.TEXTURE0+$-1:Y=lt);let J=yt[Y];J===void 0&&(J={type:void 0,texture:void 0},yt[Y]=J),(J.type!==U||J.texture!==ft)&&(lt!==Y&&(s.activeTexture(Y),lt=Y),s.bindTexture(U,ft||Rt[U]),J.type=U,J.texture=ft)}function F(){const U=yt[lt];U!==void 0&&U.type!==void 0&&(s.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function q(){try{s.compressedTexImage2D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function tt(){try{s.compressedTexImage3D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function j(){try{s.texSubImage2D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ct(){try{s.texSubImage3D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ut(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function bt(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Kt(){try{s.texStorage2D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function st(){try{s.texStorage3D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function St(){try{s.texImage2D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ft(){try{s.texImage3D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function zt(U){ae.equals(U)===!1&&(s.scissor(U.x,U.y,U.z,U.w),ae.copy(U))}function Tt(U){Z.equals(U)===!1&&(s.viewport(U.x,U.y,U.z,U.w),Z.copy(U))}function Qt(U,ft){let Y=c.get(ft);Y===void 0&&(Y=new WeakMap,c.set(ft,Y));let J=Y.get(U);J===void 0&&(J=s.getUniformBlockIndex(ft,U.name),Y.set(U,J))}function Yt(U,ft){const J=c.get(ft).get(U);l.get(ft)!==J&&(s.uniformBlockBinding(ft,J,U.__bindingPointIndex),l.set(ft,J))}function ve(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),o.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),h={},lt=null,yt={},d={},u=new WeakMap,f=[],g=null,v=!1,m=null,p=null,b=null,x=null,_=null,L=null,R=null,E=new Zt(0,0,0),P=0,M=!1,y=null,D=null,O=null,B=null,V=null,ae.set(0,0,s.canvas.width,s.canvas.height),Z.set(0,0,s.canvas.width,s.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:ht,disable:Ut,bindFramebuffer:Ht,drawBuffers:Bt,useProgram:ee,setBlending:C,setMaterial:Lt,setFlipSided:et,setCullFace:wt,setLineWidth:ct,setPolygonOffset:Ot,setScissorTest:_t,activeTexture:A,bindTexture:w,unbindTexture:F,compressedTexImage2D:q,compressedTexImage3D:tt,texImage2D:St,texImage3D:Ft,updateUBOMapping:Qt,uniformBlockBinding:Yt,texStorage2D:Kt,texStorage3D:st,texSubImage2D:j,texSubImage3D:Ct,compressedTexSubImage2D:ut,compressedTexSubImage3D:bt,scissor:zt,viewport:Tt,reset:ve}}function rv(s,t,e,n,i,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new at,h=new WeakMap;let d;const u=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(A,w){return f?new OffscreenCanvas(A,w):$r("canvas")}function v(A,w,F){let q=1;const tt=_t(A);if((tt.width>F||tt.height>F)&&(q=F/Math.max(tt.width,tt.height)),q<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const j=Math.floor(q*tt.width),Ct=Math.floor(q*tt.height);d===void 0&&(d=g(j,Ct));const ut=w?g(j,Ct):d;return ut.width=j,ut.height=Ct,ut.getContext("2d").drawImage(A,0,0,j,Ct),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+tt.width+"x"+tt.height+") to ("+j+"x"+Ct+")."),ut}else return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+tt.width+"x"+tt.height+")."),A;return A}function m(A){return A.generateMipmaps}function p(A){s.generateMipmap(A)}function b(A){return A.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?s.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function x(A,w,F,q,tt=!1){if(A!==null){if(s[A]!==void 0)return s[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let j=w;if(w===s.RED&&(F===s.FLOAT&&(j=s.R32F),F===s.HALF_FLOAT&&(j=s.R16F),F===s.UNSIGNED_BYTE&&(j=s.R8)),w===s.RED_INTEGER&&(F===s.UNSIGNED_BYTE&&(j=s.R8UI),F===s.UNSIGNED_SHORT&&(j=s.R16UI),F===s.UNSIGNED_INT&&(j=s.R32UI),F===s.BYTE&&(j=s.R8I),F===s.SHORT&&(j=s.R16I),F===s.INT&&(j=s.R32I)),w===s.RG&&(F===s.FLOAT&&(j=s.RG32F),F===s.HALF_FLOAT&&(j=s.RG16F),F===s.UNSIGNED_BYTE&&(j=s.RG8)),w===s.RG_INTEGER&&(F===s.UNSIGNED_BYTE&&(j=s.RG8UI),F===s.UNSIGNED_SHORT&&(j=s.RG16UI),F===s.UNSIGNED_INT&&(j=s.RG32UI),F===s.BYTE&&(j=s.RG8I),F===s.SHORT&&(j=s.RG16I),F===s.INT&&(j=s.RG32I)),w===s.RGB_INTEGER&&(F===s.UNSIGNED_BYTE&&(j=s.RGB8UI),F===s.UNSIGNED_SHORT&&(j=s.RGB16UI),F===s.UNSIGNED_INT&&(j=s.RGB32UI),F===s.BYTE&&(j=s.RGB8I),F===s.SHORT&&(j=s.RGB16I),F===s.INT&&(j=s.RGB32I)),w===s.RGBA_INTEGER&&(F===s.UNSIGNED_BYTE&&(j=s.RGBA8UI),F===s.UNSIGNED_SHORT&&(j=s.RGBA16UI),F===s.UNSIGNED_INT&&(j=s.RGBA32UI),F===s.BYTE&&(j=s.RGBA8I),F===s.SHORT&&(j=s.RGBA16I),F===s.INT&&(j=s.RGBA32I)),w===s.RGB&&F===s.UNSIGNED_INT_5_9_9_9_REV&&(j=s.RGB9_E5),w===s.RGBA){const Ct=tt?Wr:se.getTransfer(q);F===s.FLOAT&&(j=s.RGBA32F),F===s.HALF_FLOAT&&(j=s.RGBA16F),F===s.UNSIGNED_BYTE&&(j=Ct===pe?s.SRGB8_ALPHA8:s.RGBA8),F===s.UNSIGNED_SHORT_4_4_4_4&&(j=s.RGBA4),F===s.UNSIGNED_SHORT_5_5_5_1&&(j=s.RGB5_A1)}return(j===s.R16F||j===s.R32F||j===s.RG16F||j===s.RG32F||j===s.RGBA16F||j===s.RGBA32F)&&t.get("EXT_color_buffer_float"),j}function _(A,w){let F;return A?w===null||w===xi||w===is?F=s.DEPTH24_STENCIL8:w===Nn?F=s.DEPTH32F_STENCIL8:w===Ps&&(F=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):w===null||w===xi||w===is?F=s.DEPTH_COMPONENT24:w===Nn?F=s.DEPTH_COMPONENT32F:w===Ps&&(F=s.DEPTH_COMPONENT16),F}function L(A,w){return m(A)===!0||A.isFramebufferTexture&&A.minFilter!==Xe&&A.minFilter!==wn?Math.log2(Math.max(w.width,w.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?w.mipmaps.length:1}function R(A){const w=A.target;w.removeEventListener("dispose",R),P(w),w.isVideoTexture&&h.delete(w)}function E(A){const w=A.target;w.removeEventListener("dispose",E),y(w)}function P(A){const w=n.get(A);if(w.__webglInit===void 0)return;const F=A.source,q=u.get(F);if(q){const tt=q[w.__cacheKey];tt.usedTimes--,tt.usedTimes===0&&M(A),Object.keys(q).length===0&&u.delete(F)}n.remove(A)}function M(A){const w=n.get(A);s.deleteTexture(w.__webglTexture);const F=A.source,q=u.get(F);delete q[w.__cacheKey],o.memory.textures--}function y(A){const w=n.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),n.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let q=0;q<6;q++){if(Array.isArray(w.__webglFramebuffer[q]))for(let tt=0;tt<w.__webglFramebuffer[q].length;tt++)s.deleteFramebuffer(w.__webglFramebuffer[q][tt]);else s.deleteFramebuffer(w.__webglFramebuffer[q]);w.__webglDepthbuffer&&s.deleteRenderbuffer(w.__webglDepthbuffer[q])}else{if(Array.isArray(w.__webglFramebuffer))for(let q=0;q<w.__webglFramebuffer.length;q++)s.deleteFramebuffer(w.__webglFramebuffer[q]);else s.deleteFramebuffer(w.__webglFramebuffer);if(w.__webglDepthbuffer&&s.deleteRenderbuffer(w.__webglDepthbuffer),w.__webglMultisampledFramebuffer&&s.deleteFramebuffer(w.__webglMultisampledFramebuffer),w.__webglColorRenderbuffer)for(let q=0;q<w.__webglColorRenderbuffer.length;q++)w.__webglColorRenderbuffer[q]&&s.deleteRenderbuffer(w.__webglColorRenderbuffer[q]);w.__webglDepthRenderbuffer&&s.deleteRenderbuffer(w.__webglDepthRenderbuffer)}const F=A.textures;for(let q=0,tt=F.length;q<tt;q++){const j=n.get(F[q]);j.__webglTexture&&(s.deleteTexture(j.__webglTexture),o.memory.textures--),n.remove(F[q])}n.remove(A)}let D=0;function O(){D=0}function B(){const A=D;return A>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+i.maxTextures),D+=1,A}function V(A){const w=[];return w.push(A.wrapS),w.push(A.wrapT),w.push(A.wrapR||0),w.push(A.magFilter),w.push(A.minFilter),w.push(A.anisotropy),w.push(A.internalFormat),w.push(A.format),w.push(A.type),w.push(A.generateMipmaps),w.push(A.premultiplyAlpha),w.push(A.flipY),w.push(A.unpackAlignment),w.push(A.colorSpace),w.join()}function $(A,w){const F=n.get(A);if(A.isVideoTexture&&ct(A),A.isRenderTargetTexture===!1&&A.version>0&&F.__version!==A.version){const q=A.image;if(q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Z(F,A,w);return}}e.bindTexture(s.TEXTURE_2D,F.__webglTexture,s.TEXTURE0+w)}function X(A,w){const F=n.get(A);if(A.version>0&&F.__version!==A.version){Z(F,A,w);return}e.bindTexture(s.TEXTURE_2D_ARRAY,F.__webglTexture,s.TEXTURE0+w)}function K(A,w){const F=n.get(A);if(A.version>0&&F.__version!==A.version){Z(F,A,w);return}e.bindTexture(s.TEXTURE_3D,F.__webglTexture,s.TEXTURE0+w)}function W(A,w){const F=n.get(A);if(A.version>0&&F.__version!==A.version){ot(F,A,w);return}e.bindTexture(s.TEXTURE_CUBE_MAP,F.__webglTexture,s.TEXTURE0+w)}const lt={[ns]:s.REPEAT,[vi]:s.CLAMP_TO_EDGE,[xa]:s.MIRRORED_REPEAT},yt={[Xe]:s.NEAREST,[Vd]:s.NEAREST_MIPMAP_NEAREST,[er]:s.NEAREST_MIPMAP_LINEAR,[wn]:s.LINEAR,[vo]:s.LINEAR_MIPMAP_NEAREST,[_i]:s.LINEAR_MIPMAP_LINEAR},Et={[Yd]:s.NEVER,[Qd]:s.ALWAYS,[qd]:s.LESS,[xh]:s.LEQUAL,[jd]:s.EQUAL,[Jd]:s.GEQUAL,[Zd]:s.GREATER,[Kd]:s.NOTEQUAL};function Wt(A,w){if(w.type===Nn&&t.has("OES_texture_float_linear")===!1&&(w.magFilter===wn||w.magFilter===vo||w.magFilter===er||w.magFilter===_i||w.minFilter===wn||w.minFilter===vo||w.minFilter===er||w.minFilter===_i)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(A,s.TEXTURE_WRAP_S,lt[w.wrapS]),s.texParameteri(A,s.TEXTURE_WRAP_T,lt[w.wrapT]),(A===s.TEXTURE_3D||A===s.TEXTURE_2D_ARRAY)&&s.texParameteri(A,s.TEXTURE_WRAP_R,lt[w.wrapR]),s.texParameteri(A,s.TEXTURE_MAG_FILTER,yt[w.magFilter]),s.texParameteri(A,s.TEXTURE_MIN_FILTER,yt[w.minFilter]),w.compareFunction&&(s.texParameteri(A,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(A,s.TEXTURE_COMPARE_FUNC,Et[w.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(w.magFilter===Xe||w.minFilter!==er&&w.minFilter!==_i||w.type===Nn&&t.has("OES_texture_float_linear")===!1)return;if(w.anisotropy>1||n.get(w).__currentAnisotropy){const F=t.get("EXT_texture_filter_anisotropic");s.texParameterf(A,F.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,i.getMaxAnisotropy())),n.get(w).__currentAnisotropy=w.anisotropy}}}function ae(A,w){let F=!1;A.__webglInit===void 0&&(A.__webglInit=!0,w.addEventListener("dispose",R));const q=w.source;let tt=u.get(q);tt===void 0&&(tt={},u.set(q,tt));const j=V(w);if(j!==A.__cacheKey){tt[j]===void 0&&(tt[j]={texture:s.createTexture(),usedTimes:0},o.memory.textures++,F=!0),tt[j].usedTimes++;const Ct=tt[A.__cacheKey];Ct!==void 0&&(tt[A.__cacheKey].usedTimes--,Ct.usedTimes===0&&M(w)),A.__cacheKey=j,A.__webglTexture=tt[j].texture}return F}function Z(A,w,F){let q=s.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(q=s.TEXTURE_2D_ARRAY),w.isData3DTexture&&(q=s.TEXTURE_3D);const tt=ae(A,w),j=w.source;e.bindTexture(q,A.__webglTexture,s.TEXTURE0+F);const Ct=n.get(j);if(j.version!==Ct.__version||tt===!0){e.activeTexture(s.TEXTURE0+F);const ut=se.getPrimaries(se.workingColorSpace),bt=w.colorSpace===Zn?null:se.getPrimaries(w.colorSpace),Kt=w.colorSpace===Zn||ut===bt?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,w.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,w.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Kt);let st=v(w.image,!1,i.maxTextureSize);st=Ot(w,st);const St=r.convert(w.format,w.colorSpace),Ft=r.convert(w.type);let zt=x(w.internalFormat,St,Ft,w.colorSpace,w.isVideoTexture);Wt(q,w);let Tt;const Qt=w.mipmaps,Yt=w.isVideoTexture!==!0,ve=Ct.__version===void 0||tt===!0,U=j.dataReady,ft=L(w,st);if(w.isDepthTexture)zt=_(w.format===ss,w.type),ve&&(Yt?e.texStorage2D(s.TEXTURE_2D,1,zt,st.width,st.height):e.texImage2D(s.TEXTURE_2D,0,zt,st.width,st.height,0,St,Ft,null));else if(w.isDataTexture)if(Qt.length>0){Yt&&ve&&e.texStorage2D(s.TEXTURE_2D,ft,zt,Qt[0].width,Qt[0].height);for(let Y=0,J=Qt.length;Y<J;Y++)Tt=Qt[Y],Yt?U&&e.texSubImage2D(s.TEXTURE_2D,Y,0,0,Tt.width,Tt.height,St,Ft,Tt.data):e.texImage2D(s.TEXTURE_2D,Y,zt,Tt.width,Tt.height,0,St,Ft,Tt.data);w.generateMipmaps=!1}else Yt?(ve&&e.texStorage2D(s.TEXTURE_2D,ft,zt,st.width,st.height),U&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,st.width,st.height,St,Ft,st.data)):e.texImage2D(s.TEXTURE_2D,0,zt,st.width,st.height,0,St,Ft,st.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){Yt&&ve&&e.texStorage3D(s.TEXTURE_2D_ARRAY,ft,zt,Qt[0].width,Qt[0].height,st.depth);for(let Y=0,J=Qt.length;Y<J;Y++)if(Tt=Qt[Y],w.format!==vn)if(St!==null)if(Yt){if(U)if(w.layerUpdates.size>0){const xt=gc(Tt.width,Tt.height,w.format,w.type);for(const vt of w.layerUpdates){const Xt=Tt.data.subarray(vt*xt/Tt.data.BYTES_PER_ELEMENT,(vt+1)*xt/Tt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,Y,0,0,vt,Tt.width,Tt.height,1,St,Xt)}w.clearLayerUpdates()}else e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,Y,0,0,0,Tt.width,Tt.height,st.depth,St,Tt.data)}else e.compressedTexImage3D(s.TEXTURE_2D_ARRAY,Y,zt,Tt.width,Tt.height,st.depth,0,Tt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Yt?U&&e.texSubImage3D(s.TEXTURE_2D_ARRAY,Y,0,0,0,Tt.width,Tt.height,st.depth,St,Ft,Tt.data):e.texImage3D(s.TEXTURE_2D_ARRAY,Y,zt,Tt.width,Tt.height,st.depth,0,St,Ft,Tt.data)}else{Yt&&ve&&e.texStorage2D(s.TEXTURE_2D,ft,zt,Qt[0].width,Qt[0].height);for(let Y=0,J=Qt.length;Y<J;Y++)Tt=Qt[Y],w.format!==vn?St!==null?Yt?U&&e.compressedTexSubImage2D(s.TEXTURE_2D,Y,0,0,Tt.width,Tt.height,St,Tt.data):e.compressedTexImage2D(s.TEXTURE_2D,Y,zt,Tt.width,Tt.height,0,Tt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Yt?U&&e.texSubImage2D(s.TEXTURE_2D,Y,0,0,Tt.width,Tt.height,St,Ft,Tt.data):e.texImage2D(s.TEXTURE_2D,Y,zt,Tt.width,Tt.height,0,St,Ft,Tt.data)}else if(w.isDataArrayTexture)if(Yt){if(ve&&e.texStorage3D(s.TEXTURE_2D_ARRAY,ft,zt,st.width,st.height,st.depth),U)if(w.layerUpdates.size>0){const Y=gc(st.width,st.height,w.format,w.type);for(const J of w.layerUpdates){const xt=st.data.subarray(J*Y/st.data.BYTES_PER_ELEMENT,(J+1)*Y/st.data.BYTES_PER_ELEMENT);e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,J,st.width,st.height,1,St,Ft,xt)}w.clearLayerUpdates()}else e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,st.width,st.height,st.depth,St,Ft,st.data)}else e.texImage3D(s.TEXTURE_2D_ARRAY,0,zt,st.width,st.height,st.depth,0,St,Ft,st.data);else if(w.isData3DTexture)Yt?(ve&&e.texStorage3D(s.TEXTURE_3D,ft,zt,st.width,st.height,st.depth),U&&e.texSubImage3D(s.TEXTURE_3D,0,0,0,0,st.width,st.height,st.depth,St,Ft,st.data)):e.texImage3D(s.TEXTURE_3D,0,zt,st.width,st.height,st.depth,0,St,Ft,st.data);else if(w.isFramebufferTexture){if(ve)if(Yt)e.texStorage2D(s.TEXTURE_2D,ft,zt,st.width,st.height);else{let Y=st.width,J=st.height;for(let xt=0;xt<ft;xt++)e.texImage2D(s.TEXTURE_2D,xt,zt,Y,J,0,St,Ft,null),Y>>=1,J>>=1}}else if(Qt.length>0){if(Yt&&ve){const Y=_t(Qt[0]);e.texStorage2D(s.TEXTURE_2D,ft,zt,Y.width,Y.height)}for(let Y=0,J=Qt.length;Y<J;Y++)Tt=Qt[Y],Yt?U&&e.texSubImage2D(s.TEXTURE_2D,Y,0,0,St,Ft,Tt):e.texImage2D(s.TEXTURE_2D,Y,zt,St,Ft,Tt);w.generateMipmaps=!1}else if(Yt){if(ve){const Y=_t(st);e.texStorage2D(s.TEXTURE_2D,ft,zt,Y.width,Y.height)}U&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,St,Ft,st)}else e.texImage2D(s.TEXTURE_2D,0,zt,St,Ft,st);m(w)&&p(q),Ct.__version=j.version,w.onUpdate&&w.onUpdate(w)}A.__version=w.version}function ot(A,w,F){if(w.image.length!==6)return;const q=ae(A,w),tt=w.source;e.bindTexture(s.TEXTURE_CUBE_MAP,A.__webglTexture,s.TEXTURE0+F);const j=n.get(tt);if(tt.version!==j.__version||q===!0){e.activeTexture(s.TEXTURE0+F);const Ct=se.getPrimaries(se.workingColorSpace),ut=w.colorSpace===Zn?null:se.getPrimaries(w.colorSpace),bt=w.colorSpace===Zn||Ct===ut?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,w.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,w.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,bt);const Kt=w.isCompressedTexture||w.image[0].isCompressedTexture,st=w.image[0]&&w.image[0].isDataTexture,St=[];for(let J=0;J<6;J++)!Kt&&!st?St[J]=v(w.image[J],!0,i.maxCubemapSize):St[J]=st?w.image[J].image:w.image[J],St[J]=Ot(w,St[J]);const Ft=St[0],zt=r.convert(w.format,w.colorSpace),Tt=r.convert(w.type),Qt=x(w.internalFormat,zt,Tt,w.colorSpace),Yt=w.isVideoTexture!==!0,ve=j.__version===void 0||q===!0,U=tt.dataReady;let ft=L(w,Ft);Wt(s.TEXTURE_CUBE_MAP,w);let Y;if(Kt){Yt&&ve&&e.texStorage2D(s.TEXTURE_CUBE_MAP,ft,Qt,Ft.width,Ft.height);for(let J=0;J<6;J++){Y=St[J].mipmaps;for(let xt=0;xt<Y.length;xt++){const vt=Y[xt];w.format!==vn?zt!==null?Yt?U&&e.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+J,xt,0,0,vt.width,vt.height,zt,vt.data):e.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+J,xt,Qt,vt.width,vt.height,0,vt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Yt?U&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+J,xt,0,0,vt.width,vt.height,zt,Tt,vt.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+J,xt,Qt,vt.width,vt.height,0,zt,Tt,vt.data)}}}else{if(Y=w.mipmaps,Yt&&ve){Y.length>0&&ft++;const J=_t(St[0]);e.texStorage2D(s.TEXTURE_CUBE_MAP,ft,Qt,J.width,J.height)}for(let J=0;J<6;J++)if(st){Yt?U&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,St[J].width,St[J].height,zt,Tt,St[J].data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,Qt,St[J].width,St[J].height,0,zt,Tt,St[J].data);for(let xt=0;xt<Y.length;xt++){const Xt=Y[xt].image[J].image;Yt?U&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+J,xt+1,0,0,Xt.width,Xt.height,zt,Tt,Xt.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+J,xt+1,Qt,Xt.width,Xt.height,0,zt,Tt,Xt.data)}}else{Yt?U&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,zt,Tt,St[J]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,Qt,zt,Tt,St[J]);for(let xt=0;xt<Y.length;xt++){const vt=Y[xt];Yt?U&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+J,xt+1,0,0,zt,Tt,vt.image[J]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+J,xt+1,Qt,zt,Tt,vt.image[J])}}}m(w)&&p(s.TEXTURE_CUBE_MAP),j.__version=tt.version,w.onUpdate&&w.onUpdate(w)}A.__version=w.version}function Rt(A,w,F,q,tt,j){const Ct=r.convert(F.format,F.colorSpace),ut=r.convert(F.type),bt=x(F.internalFormat,Ct,ut,F.colorSpace),Kt=n.get(w),st=n.get(F);if(st.__renderTarget=w,!Kt.__hasExternalTextures){const St=Math.max(1,w.width>>j),Ft=Math.max(1,w.height>>j);tt===s.TEXTURE_3D||tt===s.TEXTURE_2D_ARRAY?e.texImage3D(tt,j,bt,St,Ft,w.depth,0,Ct,ut,null):e.texImage2D(tt,j,bt,St,Ft,0,Ct,ut,null)}e.bindFramebuffer(s.FRAMEBUFFER,A),wt(w)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,q,tt,st.__webglTexture,0,et(w)):(tt===s.TEXTURE_2D||tt>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&tt<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,q,tt,st.__webglTexture,j),e.bindFramebuffer(s.FRAMEBUFFER,null)}function ht(A,w,F){if(s.bindRenderbuffer(s.RENDERBUFFER,A),w.depthBuffer){const q=w.depthTexture,tt=q&&q.isDepthTexture?q.type:null,j=_(w.stencilBuffer,tt),Ct=w.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ut=et(w);wt(w)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,ut,j,w.width,w.height):F?s.renderbufferStorageMultisample(s.RENDERBUFFER,ut,j,w.width,w.height):s.renderbufferStorage(s.RENDERBUFFER,j,w.width,w.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,Ct,s.RENDERBUFFER,A)}else{const q=w.textures;for(let tt=0;tt<q.length;tt++){const j=q[tt],Ct=r.convert(j.format,j.colorSpace),ut=r.convert(j.type),bt=x(j.internalFormat,Ct,ut,j.colorSpace),Kt=et(w);F&&wt(w)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,Kt,bt,w.width,w.height):wt(w)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Kt,bt,w.width,w.height):s.renderbufferStorage(s.RENDERBUFFER,bt,w.width,w.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function Ut(A,w){if(w&&w.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(s.FRAMEBUFFER,A),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const q=n.get(w.depthTexture);q.__renderTarget=w,(!q.__webglTexture||w.depthTexture.image.width!==w.width||w.depthTexture.image.height!==w.height)&&(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),$(w.depthTexture,0);const tt=q.__webglTexture,j=et(w);if(w.depthTexture.format===Ki)wt(w)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,tt,0,j):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,tt,0);else if(w.depthTexture.format===ss)wt(w)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,tt,0,j):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,tt,0);else throw new Error("Unknown depthTexture format")}function Ht(A){const w=n.get(A),F=A.isWebGLCubeRenderTarget===!0;if(w.__boundDepthTexture!==A.depthTexture){const q=A.depthTexture;if(w.__depthDisposeCallback&&w.__depthDisposeCallback(),q){const tt=()=>{delete w.__boundDepthTexture,delete w.__depthDisposeCallback,q.removeEventListener("dispose",tt)};q.addEventListener("dispose",tt),w.__depthDisposeCallback=tt}w.__boundDepthTexture=q}if(A.depthTexture&&!w.__autoAllocateDepthBuffer){if(F)throw new Error("target.depthTexture not supported in Cube render targets");Ut(w.__webglFramebuffer,A)}else if(F){w.__webglDepthbuffer=[];for(let q=0;q<6;q++)if(e.bindFramebuffer(s.FRAMEBUFFER,w.__webglFramebuffer[q]),w.__webglDepthbuffer[q]===void 0)w.__webglDepthbuffer[q]=s.createRenderbuffer(),ht(w.__webglDepthbuffer[q],A,!1);else{const tt=A.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,j=w.__webglDepthbuffer[q];s.bindRenderbuffer(s.RENDERBUFFER,j),s.framebufferRenderbuffer(s.FRAMEBUFFER,tt,s.RENDERBUFFER,j)}}else if(e.bindFramebuffer(s.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer===void 0)w.__webglDepthbuffer=s.createRenderbuffer(),ht(w.__webglDepthbuffer,A,!1);else{const q=A.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,tt=w.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,tt),s.framebufferRenderbuffer(s.FRAMEBUFFER,q,s.RENDERBUFFER,tt)}e.bindFramebuffer(s.FRAMEBUFFER,null)}function Bt(A,w,F){const q=n.get(A);w!==void 0&&Rt(q.__webglFramebuffer,A,A.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),F!==void 0&&Ht(A)}function ee(A){const w=A.texture,F=n.get(A),q=n.get(w);A.addEventListener("dispose",E);const tt=A.textures,j=A.isWebGLCubeRenderTarget===!0,Ct=tt.length>1;if(Ct||(q.__webglTexture===void 0&&(q.__webglTexture=s.createTexture()),q.__version=w.version,o.memory.textures++),j){F.__webglFramebuffer=[];for(let ut=0;ut<6;ut++)if(w.mipmaps&&w.mipmaps.length>0){F.__webglFramebuffer[ut]=[];for(let bt=0;bt<w.mipmaps.length;bt++)F.__webglFramebuffer[ut][bt]=s.createFramebuffer()}else F.__webglFramebuffer[ut]=s.createFramebuffer()}else{if(w.mipmaps&&w.mipmaps.length>0){F.__webglFramebuffer=[];for(let ut=0;ut<w.mipmaps.length;ut++)F.__webglFramebuffer[ut]=s.createFramebuffer()}else F.__webglFramebuffer=s.createFramebuffer();if(Ct)for(let ut=0,bt=tt.length;ut<bt;ut++){const Kt=n.get(tt[ut]);Kt.__webglTexture===void 0&&(Kt.__webglTexture=s.createTexture(),o.memory.textures++)}if(A.samples>0&&wt(A)===!1){F.__webglMultisampledFramebuffer=s.createFramebuffer(),F.__webglColorRenderbuffer=[],e.bindFramebuffer(s.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let ut=0;ut<tt.length;ut++){const bt=tt[ut];F.__webglColorRenderbuffer[ut]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,F.__webglColorRenderbuffer[ut]);const Kt=r.convert(bt.format,bt.colorSpace),st=r.convert(bt.type),St=x(bt.internalFormat,Kt,st,bt.colorSpace,A.isXRRenderTarget===!0),Ft=et(A);s.renderbufferStorageMultisample(s.RENDERBUFFER,Ft,St,A.width,A.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ut,s.RENDERBUFFER,F.__webglColorRenderbuffer[ut])}s.bindRenderbuffer(s.RENDERBUFFER,null),A.depthBuffer&&(F.__webglDepthRenderbuffer=s.createRenderbuffer(),ht(F.__webglDepthRenderbuffer,A,!0)),e.bindFramebuffer(s.FRAMEBUFFER,null)}}if(j){e.bindTexture(s.TEXTURE_CUBE_MAP,q.__webglTexture),Wt(s.TEXTURE_CUBE_MAP,w);for(let ut=0;ut<6;ut++)if(w.mipmaps&&w.mipmaps.length>0)for(let bt=0;bt<w.mipmaps.length;bt++)Rt(F.__webglFramebuffer[ut][bt],A,w,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ut,bt);else Rt(F.__webglFramebuffer[ut],A,w,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ut,0);m(w)&&p(s.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Ct){for(let ut=0,bt=tt.length;ut<bt;ut++){const Kt=tt[ut],st=n.get(Kt);e.bindTexture(s.TEXTURE_2D,st.__webglTexture),Wt(s.TEXTURE_2D,Kt),Rt(F.__webglFramebuffer,A,Kt,s.COLOR_ATTACHMENT0+ut,s.TEXTURE_2D,0),m(Kt)&&p(s.TEXTURE_2D)}e.unbindTexture()}else{let ut=s.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(ut=A.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(ut,q.__webglTexture),Wt(ut,w),w.mipmaps&&w.mipmaps.length>0)for(let bt=0;bt<w.mipmaps.length;bt++)Rt(F.__webglFramebuffer[bt],A,w,s.COLOR_ATTACHMENT0,ut,bt);else Rt(F.__webglFramebuffer,A,w,s.COLOR_ATTACHMENT0,ut,0);m(w)&&p(ut),e.unbindTexture()}A.depthBuffer&&Ht(A)}function Q(A){const w=A.textures;for(let F=0,q=w.length;F<q;F++){const tt=w[F];if(m(tt)){const j=b(A),Ct=n.get(tt).__webglTexture;e.bindTexture(j,Ct),p(j),e.unbindTexture()}}}const rt=[],C=[];function Lt(A){if(A.samples>0){if(wt(A)===!1){const w=A.textures,F=A.width,q=A.height;let tt=s.COLOR_BUFFER_BIT;const j=A.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Ct=n.get(A),ut=w.length>1;if(ut)for(let bt=0;bt<w.length;bt++)e.bindFramebuffer(s.FRAMEBUFFER,Ct.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+bt,s.RENDERBUFFER,null),e.bindFramebuffer(s.FRAMEBUFFER,Ct.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+bt,s.TEXTURE_2D,null,0);e.bindFramebuffer(s.READ_FRAMEBUFFER,Ct.__webglMultisampledFramebuffer),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,Ct.__webglFramebuffer);for(let bt=0;bt<w.length;bt++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(tt|=s.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(tt|=s.STENCIL_BUFFER_BIT)),ut){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Ct.__webglColorRenderbuffer[bt]);const Kt=n.get(w[bt]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,Kt,0)}s.blitFramebuffer(0,0,F,q,0,0,F,q,tt,s.NEAREST),l===!0&&(rt.length=0,C.length=0,rt.push(s.COLOR_ATTACHMENT0+bt),A.depthBuffer&&A.resolveDepthBuffer===!1&&(rt.push(j),C.push(j),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,C)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,rt))}if(e.bindFramebuffer(s.READ_FRAMEBUFFER,null),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),ut)for(let bt=0;bt<w.length;bt++){e.bindFramebuffer(s.FRAMEBUFFER,Ct.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+bt,s.RENDERBUFFER,Ct.__webglColorRenderbuffer[bt]);const Kt=n.get(w[bt]).__webglTexture;e.bindFramebuffer(s.FRAMEBUFFER,Ct.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+bt,s.TEXTURE_2D,Kt,0)}e.bindFramebuffer(s.DRAW_FRAMEBUFFER,Ct.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&l){const w=A.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[w])}}}function et(A){return Math.min(i.maxSamples,A.samples)}function wt(A){const w=n.get(A);return A.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function ct(A){const w=o.render.frame;h.get(A)!==w&&(h.set(A,w),A.update())}function Ot(A,w){const F=A.colorSpace,q=A.format,tt=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||F!==rs&&F!==Zn&&(se.getTransfer(F)===pe?(q!==vn||tt!==On)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",F)),w}function _t(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(c.width=A.naturalWidth||A.width,c.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(c.width=A.displayWidth,c.height=A.displayHeight):(c.width=A.width,c.height=A.height),c}this.allocateTextureUnit=B,this.resetTextureUnits=O,this.setTexture2D=$,this.setTexture2DArray=X,this.setTexture3D=K,this.setTextureCube=W,this.rebindTextures=Bt,this.setupRenderTarget=ee,this.updateRenderTargetMipmap=Q,this.updateMultisampleRenderTarget=Lt,this.setupDepthRenderbuffer=Ht,this.setupFrameBufferTexture=Rt,this.useMultisampledRTT=wt}function ov(s,t){function e(n,i=Zn){let r;const o=se.getTransfer(i);if(n===On)return s.UNSIGNED_BYTE;if(n===il)return s.UNSIGNED_SHORT_4_4_4_4;if(n===sl)return s.UNSIGNED_SHORT_5_5_5_1;if(n===dh)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===ch)return s.BYTE;if(n===hh)return s.SHORT;if(n===Ps)return s.UNSIGNED_SHORT;if(n===nl)return s.INT;if(n===xi)return s.UNSIGNED_INT;if(n===Nn)return s.FLOAT;if(n===Os)return s.HALF_FLOAT;if(n===uh)return s.ALPHA;if(n===fh)return s.RGB;if(n===vn)return s.RGBA;if(n===ph)return s.LUMINANCE;if(n===mh)return s.LUMINANCE_ALPHA;if(n===Ki)return s.DEPTH_COMPONENT;if(n===ss)return s.DEPTH_STENCIL;if(n===rl)return s.RED;if(n===ol)return s.RED_INTEGER;if(n===gh)return s.RG;if(n===al)return s.RG_INTEGER;if(n===ll)return s.RGBA_INTEGER;if(n===kr||n===Fr||n===Or||n===Br)if(o===pe)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===kr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Fr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Or)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Br)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===kr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Fr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Or)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Br)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===ya||n===ba||n===wa||n===Ma)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===ya)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===ba)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===wa)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Ma)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Sa||n===Ta||n===Ea)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Sa||n===Ta)return o===pe?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Ea)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Aa||n===Ra||n===Ca||n===La||n===Pa||n===Ia||n===Da||n===Ua||n===Na||n===ka||n===Fa||n===Oa||n===Ba||n===za)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Aa)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Ra)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Ca)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===La)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Pa)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Ia)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Da)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Ua)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Na)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===ka)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Fa)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Oa)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Ba)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===za)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===zr||n===Ga||n===Ha)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===zr)return o===pe?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Ga)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ha)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===vh||n===Va||n===Wa||n===Xa)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===zr)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Va)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Wa)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Xa)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===is?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:e}}const av={type:"move"};class Ko{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new nt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new nt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new I,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new I),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new nt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new I,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new I),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(const v of t.hand.values()){const m=e.getJointPose(v,n),p=this._getHandJoint(c,v);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,g=.005;c.inputState.pinching&&u>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&u<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(av)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new nt;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const lv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,cv=`
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

}`;class hv{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const i=new Oe,r=t.properties.get(i);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new ei({vertexShader:lv,fragmentShader:cv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new It(new Mn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class dv extends cs{constructor(t,e){super();const n=this;let i=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,d=null,u=null,f=null,g=null;const v=new hv,m=e.getContextAttributes();let p=null,b=null;const x=[],_=[],L=new at;let R=null;const E=new tn;E.viewport=new me;const P=new tn;P.viewport=new me;const M=[E,P],y=new Pf;let D=null,O=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let ot=x[Z];return ot===void 0&&(ot=new Ko,x[Z]=ot),ot.getTargetRaySpace()},this.getControllerGrip=function(Z){let ot=x[Z];return ot===void 0&&(ot=new Ko,x[Z]=ot),ot.getGripSpace()},this.getHand=function(Z){let ot=x[Z];return ot===void 0&&(ot=new Ko,x[Z]=ot),ot.getHandSpace()};function B(Z){const ot=_.indexOf(Z.inputSource);if(ot===-1)return;const Rt=x[ot];Rt!==void 0&&(Rt.update(Z.inputSource,Z.frame,c||o),Rt.dispatchEvent({type:Z.type,data:Z.inputSource}))}function V(){i.removeEventListener("select",B),i.removeEventListener("selectstart",B),i.removeEventListener("selectend",B),i.removeEventListener("squeeze",B),i.removeEventListener("squeezestart",B),i.removeEventListener("squeezeend",B),i.removeEventListener("end",V),i.removeEventListener("inputsourceschange",$);for(let Z=0;Z<x.length;Z++){const ot=_[Z];ot!==null&&(_[Z]=null,x[Z].disconnect(ot))}D=null,O=null,v.reset(),t.setRenderTarget(p),f=null,u=null,d=null,i=null,b=null,ae.stop(),n.isPresenting=!1,t.setPixelRatio(R),t.setSize(L.width,L.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){r=Z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){a=Z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(Z){c=Z},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(Z){if(i=Z,i!==null){if(p=t.getRenderTarget(),i.addEventListener("select",B),i.addEventListener("selectstart",B),i.addEventListener("selectend",B),i.addEventListener("squeeze",B),i.addEventListener("squeezestart",B),i.addEventListener("squeezeend",B),i.addEventListener("end",V),i.addEventListener("inputsourceschange",$),m.xrCompatible!==!0&&await e.makeXRCompatible(),R=t.getPixelRatio(),t.getSize(L),i.renderState.layers===void 0){const ot={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(i,e,ot),i.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),b=new yi(f.framebufferWidth,f.framebufferHeight,{format:vn,type:On,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let ot=null,Rt=null,ht=null;m.depth&&(ht=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,ot=m.stencil?ss:Ki,Rt=m.stencil?is:xi);const Ut={colorFormat:e.RGBA8,depthFormat:ht,scaleFactor:r};d=new XRWebGLBinding(i,e),u=d.createProjectionLayer(Ut),i.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),b=new yi(u.textureWidth,u.textureHeight,{format:vn,type:On,depthTexture:new Lh(u.textureWidth,u.textureHeight,Rt,void 0,void 0,void 0,void 0,void 0,void 0,ot),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await i.requestReferenceSpace(a),ae.setContext(i),ae.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function $(Z){for(let ot=0;ot<Z.removed.length;ot++){const Rt=Z.removed[ot],ht=_.indexOf(Rt);ht>=0&&(_[ht]=null,x[ht].disconnect(Rt))}for(let ot=0;ot<Z.added.length;ot++){const Rt=Z.added[ot];let ht=_.indexOf(Rt);if(ht===-1){for(let Ht=0;Ht<x.length;Ht++)if(Ht>=_.length){_.push(Rt),ht=Ht;break}else if(_[Ht]===null){_[Ht]=Rt,ht=Ht;break}if(ht===-1)break}const Ut=x[ht];Ut&&Ut.connect(Rt)}}const X=new I,K=new I;function W(Z,ot,Rt){X.setFromMatrixPosition(ot.matrixWorld),K.setFromMatrixPosition(Rt.matrixWorld);const ht=X.distanceTo(K),Ut=ot.projectionMatrix.elements,Ht=Rt.projectionMatrix.elements,Bt=Ut[14]/(Ut[10]-1),ee=Ut[14]/(Ut[10]+1),Q=(Ut[9]+1)/Ut[5],rt=(Ut[9]-1)/Ut[5],C=(Ut[8]-1)/Ut[0],Lt=(Ht[8]+1)/Ht[0],et=Bt*C,wt=Bt*Lt,ct=ht/(-C+Lt),Ot=ct*-C;if(ot.matrixWorld.decompose(Z.position,Z.quaternion,Z.scale),Z.translateX(Ot),Z.translateZ(ct),Z.matrixWorld.compose(Z.position,Z.quaternion,Z.scale),Z.matrixWorldInverse.copy(Z.matrixWorld).invert(),Ut[10]===-1)Z.projectionMatrix.copy(ot.projectionMatrix),Z.projectionMatrixInverse.copy(ot.projectionMatrixInverse);else{const _t=Bt+ct,A=ee+ct,w=et-Ot,F=wt+(ht-Ot),q=Q*ee/A*_t,tt=rt*ee/A*_t;Z.projectionMatrix.makePerspective(w,F,q,tt,_t,A),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert()}}function lt(Z,ot){ot===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(ot.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(i===null)return;let ot=Z.near,Rt=Z.far;v.texture!==null&&(v.depthNear>0&&(ot=v.depthNear),v.depthFar>0&&(Rt=v.depthFar)),y.near=P.near=E.near=ot,y.far=P.far=E.far=Rt,(D!==y.near||O!==y.far)&&(i.updateRenderState({depthNear:y.near,depthFar:y.far}),D=y.near,O=y.far),E.layers.mask=Z.layers.mask|2,P.layers.mask=Z.layers.mask|4,y.layers.mask=E.layers.mask|P.layers.mask;const ht=Z.parent,Ut=y.cameras;lt(y,ht);for(let Ht=0;Ht<Ut.length;Ht++)lt(Ut[Ht],ht);Ut.length===2?W(y,E,P):y.projectionMatrix.copy(E.projectionMatrix),yt(Z,y,ht)};function yt(Z,ot,Rt){Rt===null?Z.matrix.copy(ot.matrixWorld):(Z.matrix.copy(Rt.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(ot.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(ot.projectionMatrix),Z.projectionMatrixInverse.copy(ot.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=Is*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(u===null&&f===null))return l},this.setFoveation=function(Z){l=Z,u!==null&&(u.fixedFoveation=Z),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=Z)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(y)};let Et=null;function Wt(Z,ot){if(h=ot.getViewerPose(c||o),g=ot,h!==null){const Rt=h.views;f!==null&&(t.setRenderTargetFramebuffer(b,f.framebuffer),t.setRenderTarget(b));let ht=!1;Rt.length!==y.cameras.length&&(y.cameras.length=0,ht=!0);for(let Ht=0;Ht<Rt.length;Ht++){const Bt=Rt[Ht];let ee=null;if(f!==null)ee=f.getViewport(Bt);else{const rt=d.getViewSubImage(u,Bt);ee=rt.viewport,Ht===0&&(t.setRenderTargetTextures(b,rt.colorTexture,u.ignoreDepthValues?void 0:rt.depthStencilTexture),t.setRenderTarget(b))}let Q=M[Ht];Q===void 0&&(Q=new tn,Q.layers.enable(Ht),Q.viewport=new me,M[Ht]=Q),Q.matrix.fromArray(Bt.transform.matrix),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.projectionMatrix.fromArray(Bt.projectionMatrix),Q.projectionMatrixInverse.copy(Q.projectionMatrix).invert(),Q.viewport.set(ee.x,ee.y,ee.width,ee.height),Ht===0&&(y.matrix.copy(Q.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),ht===!0&&y.cameras.push(Q)}const Ut=i.enabledFeatures;if(Ut&&Ut.includes("depth-sensing")){const Ht=d.getDepthInformation(Rt[0]);Ht&&Ht.isValid&&Ht.texture&&v.init(t,Ht,i.renderState)}}for(let Rt=0;Rt<x.length;Rt++){const ht=_[Rt],Ut=x[Rt];ht!==null&&Ut!==void 0&&Ut.update(ht,ot,c||o)}Et&&Et(Z,ot),ot.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ot}),g=null}const ae=new Hh;ae.setAnimationLoop(Wt),this.setAnimationLoop=function(Z){Et=Z},this.dispose=function(){}}}const di=new Bn,uv=new ge;function fv(s,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Eh(s)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function i(m,p,b,x,_){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),d(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p)):p.isMeshStandardMaterial?(r(m,p),u(m,p),p.isMeshPhysicalMaterial&&f(m,p,_)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),v(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,b,x):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===je&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===je&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const b=t.get(p),x=b.envMap,_=b.envMapRotation;x&&(m.envMap.value=x,di.copy(_),di.x*=-1,di.y*=-1,di.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(di.y*=-1,di.z*=-1),m.envMapRotation.value.setFromMatrix4(uv.makeRotationFromEuler(di)),m.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,b,x){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*b,m.scale.value=x*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function d(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function u(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,b){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===je&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=b.texture,m.transmissionSamplerSize.value.set(b.width,b.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function v(m,p){const b=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(b.matrixWorld),m.nearDistance.value=b.shadow.camera.near,m.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function pv(s,t,e,n){let i={},r={},o=[];const a=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function l(b,x){const _=x.program;n.uniformBlockBinding(b,_)}function c(b,x){let _=i[b.id];_===void 0&&(g(b),_=h(b),i[b.id]=_,b.addEventListener("dispose",m));const L=x.program;n.updateUBOMapping(b,L);const R=t.render.frame;r[b.id]!==R&&(u(b),r[b.id]=R)}function h(b){const x=d();b.__bindingPointIndex=x;const _=s.createBuffer(),L=b.__size,R=b.usage;return s.bindBuffer(s.UNIFORM_BUFFER,_),s.bufferData(s.UNIFORM_BUFFER,L,R),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,x,_),_}function d(){for(let b=0;b<a;b++)if(o.indexOf(b)===-1)return o.push(b),b;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(b){const x=i[b.id],_=b.uniforms,L=b.__cache;s.bindBuffer(s.UNIFORM_BUFFER,x);for(let R=0,E=_.length;R<E;R++){const P=Array.isArray(_[R])?_[R]:[_[R]];for(let M=0,y=P.length;M<y;M++){const D=P[M];if(f(D,R,M,L)===!0){const O=D.__offset,B=Array.isArray(D.value)?D.value:[D.value];let V=0;for(let $=0;$<B.length;$++){const X=B[$],K=v(X);typeof X=="number"||typeof X=="boolean"?(D.__data[0]=X,s.bufferSubData(s.UNIFORM_BUFFER,O+V,D.__data)):X.isMatrix3?(D.__data[0]=X.elements[0],D.__data[1]=X.elements[1],D.__data[2]=X.elements[2],D.__data[3]=0,D.__data[4]=X.elements[3],D.__data[5]=X.elements[4],D.__data[6]=X.elements[5],D.__data[7]=0,D.__data[8]=X.elements[6],D.__data[9]=X.elements[7],D.__data[10]=X.elements[8],D.__data[11]=0):(X.toArray(D.__data,V),V+=K.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,O,D.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function f(b,x,_,L){const R=b.value,E=x+"_"+_;if(L[E]===void 0)return typeof R=="number"||typeof R=="boolean"?L[E]=R:L[E]=R.clone(),!0;{const P=L[E];if(typeof R=="number"||typeof R=="boolean"){if(P!==R)return L[E]=R,!0}else if(P.equals(R)===!1)return P.copy(R),!0}return!1}function g(b){const x=b.uniforms;let _=0;const L=16;for(let E=0,P=x.length;E<P;E++){const M=Array.isArray(x[E])?x[E]:[x[E]];for(let y=0,D=M.length;y<D;y++){const O=M[y],B=Array.isArray(O.value)?O.value:[O.value];for(let V=0,$=B.length;V<$;V++){const X=B[V],K=v(X),W=_%L,lt=W%K.boundary,yt=W+lt;_+=lt,yt!==0&&L-yt<K.storage&&(_+=L-yt),O.__data=new Float32Array(K.storage/Float32Array.BYTES_PER_ELEMENT),O.__offset=_,_+=K.storage}}}const R=_%L;return R>0&&(_+=L-R),b.__size=_,b.__cache={},this}function v(b){const x={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(x.boundary=4,x.storage=4):b.isVector2?(x.boundary=8,x.storage=8):b.isVector3||b.isColor?(x.boundary=16,x.storage=12):b.isVector4?(x.boundary=16,x.storage=16):b.isMatrix3?(x.boundary=48,x.storage=48):b.isMatrix4?(x.boundary=64,x.storage=64):b.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",b),x}function m(b){const x=b.target;x.removeEventListener("dispose",m);const _=o.indexOf(x.__bindingPointIndex);o.splice(_,1),s.deleteBuffer(i[x.id]),delete i[x.id],delete r[x.id]}function p(){for(const b in i)s.deleteBuffer(i[b]);o=[],i={},r={}}return{bind:l,update:c,dispose:p}}class mv{constructor(t={}){const{canvas:e=vu(),context:n=null,depth:i=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reverseDepthBuffer:u=!1}=t;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=o;const g=new Uint32Array(4),v=new Int32Array(4);let m=null,p=null;const b=[],x=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ue,this.toneMapping=Jn,this.toneMappingExposure=1;const _=this;let L=!1,R=0,E=0,P=null,M=-1,y=null;const D=new me,O=new me;let B=null;const V=new Zt(0);let $=0,X=e.width,K=e.height,W=1,lt=null,yt=null;const Et=new me(0,0,X,K),Wt=new me(0,0,X,K);let ae=!1;const Z=new dl;let ot=!1,Rt=!1;const ht=new ge,Ut=new ge,Ht=new I,Bt=new me,ee={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Q=!1;function rt(){return P===null?W:1}let C=n;function Lt(S,N){return e.getContext(S,N)}try{const S={alpha:!0,depth:i,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${el}`),e.addEventListener("webglcontextlost",J,!1),e.addEventListener("webglcontextrestored",xt,!1),e.addEventListener("webglcontextcreationerror",vt,!1),C===null){const N="webgl2";if(C=Lt(N,S),C===null)throw Lt(N)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(S){throw console.error("THREE.WebGLRenderer: "+S.message),S}let et,wt,ct,Ot,_t,A,w,F,q,tt,j,Ct,ut,bt,Kt,st,St,Ft,zt,Tt,Qt,Yt,ve,U;function ft(){et=new Sg(C),et.init(),Yt=new ov(C,et),wt=new _g(C,et,t,Yt),ct=new sv(C,et),wt.reverseDepthBuffer&&u&&ct.buffers.depth.setReversed(!0),Ot=new Ag(C),_t=new X0,A=new rv(C,et,ct,_t,wt,Yt,Ot),w=new yg(_),F=new Mg(_),q=new Uf(C),ve=new gg(C,q),tt=new Tg(C,q,Ot,ve),j=new Cg(C,tt,q,Ot),zt=new Rg(C,wt,A),st=new xg(_t),Ct=new W0(_,w,F,et,wt,ve,st),ut=new fv(_,_t),bt=new Y0,Kt=new Q0(et),Ft=new mg(_,w,F,ct,j,f,l),St=new nv(_,j,wt),U=new pv(C,Ot,wt,ct),Tt=new vg(C,et,Ot),Qt=new Eg(C,et,Ot),Ot.programs=Ct.programs,_.capabilities=wt,_.extensions=et,_.properties=_t,_.renderLists=bt,_.shadowMap=St,_.state=ct,_.info=Ot}ft();const Y=new dv(_,C);this.xr=Y,this.getContext=function(){return C},this.getContextAttributes=function(){return C.getContextAttributes()},this.forceContextLoss=function(){const S=et.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=et.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return W},this.setPixelRatio=function(S){S!==void 0&&(W=S,this.setSize(X,K,!1))},this.getSize=function(S){return S.set(X,K)},this.setSize=function(S,N,G=!0){if(Y.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}X=S,K=N,e.width=Math.floor(S*W),e.height=Math.floor(N*W),G===!0&&(e.style.width=S+"px",e.style.height=N+"px"),this.setViewport(0,0,S,N)},this.getDrawingBufferSize=function(S){return S.set(X*W,K*W).floor()},this.setDrawingBufferSize=function(S,N,G){X=S,K=N,W=G,e.width=Math.floor(S*G),e.height=Math.floor(N*G),this.setViewport(0,0,S,N)},this.getCurrentViewport=function(S){return S.copy(D)},this.getViewport=function(S){return S.copy(Et)},this.setViewport=function(S,N,G,H){S.isVector4?Et.set(S.x,S.y,S.z,S.w):Et.set(S,N,G,H),ct.viewport(D.copy(Et).multiplyScalar(W).round())},this.getScissor=function(S){return S.copy(Wt)},this.setScissor=function(S,N,G,H){S.isVector4?Wt.set(S.x,S.y,S.z,S.w):Wt.set(S,N,G,H),ct.scissor(O.copy(Wt).multiplyScalar(W).round())},this.getScissorTest=function(){return ae},this.setScissorTest=function(S){ct.setScissorTest(ae=S)},this.setOpaqueSort=function(S){lt=S},this.setTransparentSort=function(S){yt=S},this.getClearColor=function(S){return S.copy(Ft.getClearColor())},this.setClearColor=function(){Ft.setClearColor.apply(Ft,arguments)},this.getClearAlpha=function(){return Ft.getClearAlpha()},this.setClearAlpha=function(){Ft.setClearAlpha.apply(Ft,arguments)},this.clear=function(S=!0,N=!0,G=!0){let H=0;if(S){let k=!1;if(P!==null){const it=P.texture.format;k=it===ll||it===al||it===ol}if(k){const it=P.texture.type,pt=it===On||it===xi||it===Ps||it===is||it===il||it===sl,Mt=Ft.getClearColor(),At=Ft.getClearAlpha(),Gt=Mt.r,Vt=Mt.g,Nt=Mt.b;pt?(g[0]=Gt,g[1]=Vt,g[2]=Nt,g[3]=At,C.clearBufferuiv(C.COLOR,0,g)):(v[0]=Gt,v[1]=Vt,v[2]=Nt,v[3]=At,C.clearBufferiv(C.COLOR,0,v))}else H|=C.COLOR_BUFFER_BIT}N&&(H|=C.DEPTH_BUFFER_BIT),G&&(H|=C.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),C.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",J,!1),e.removeEventListener("webglcontextrestored",xt,!1),e.removeEventListener("webglcontextcreationerror",vt,!1),Ft.dispose(),bt.dispose(),Kt.dispose(),_t.dispose(),w.dispose(),F.dispose(),j.dispose(),ve.dispose(),U.dispose(),Ct.dispose(),Y.dispose(),Y.removeEventListener("sessionstart",Sl),Y.removeEventListener("sessionend",Tl),si.stop()};function J(S){S.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),L=!0}function xt(){console.log("THREE.WebGLRenderer: Context Restored."),L=!1;const S=Ot.autoReset,N=St.enabled,G=St.autoUpdate,H=St.needsUpdate,k=St.type;ft(),Ot.autoReset=S,St.enabled=N,St.autoUpdate=G,St.needsUpdate=H,St.type=k}function vt(S){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function Xt(S){const N=S.target;N.removeEventListener("dispose",Xt),Me(N)}function Me(S){Be(S),_t.remove(S)}function Be(S){const N=_t.get(S).programs;N!==void 0&&(N.forEach(function(G){Ct.releaseProgram(G)}),S.isShaderMaterial&&Ct.releaseShaderCache(S))}this.renderBufferDirect=function(S,N,G,H,k,it){N===null&&(N=ee);const pt=k.isMesh&&k.matrixWorld.determinant()<0,Mt=hd(S,N,G,H,k);ct.setMaterial(H,pt);let At=G.index,Gt=1;if(H.wireframe===!0){if(At=tt.getWireframeAttribute(G),At===void 0)return;Gt=2}const Vt=G.drawRange,Nt=G.attributes.position;let ne=Vt.start*Gt,le=(Vt.start+Vt.count)*Gt;it!==null&&(ne=Math.max(ne,it.start*Gt),le=Math.min(le,(it.start+it.count)*Gt)),At!==null?(ne=Math.max(ne,0),le=Math.min(le,At.count)):Nt!=null&&(ne=Math.max(ne,0),le=Math.min(le,Nt.count));const Ae=le-ne;if(Ae<0||Ae===1/0)return;ve.setup(k,H,Mt,G,At);let Se,ie=Tt;if(At!==null&&(Se=q.get(At),ie=Qt,ie.setIndex(Se)),k.isMesh)H.wireframe===!0?(ct.setLineWidth(H.wireframeLinewidth*rt()),ie.setMode(C.LINES)):ie.setMode(C.TRIANGLES);else if(k.isLine){let kt=H.linewidth;kt===void 0&&(kt=1),ct.setLineWidth(kt*rt()),k.isLineSegments?ie.setMode(C.LINES):k.isLineLoop?ie.setMode(C.LINE_LOOP):ie.setMode(C.LINE_STRIP)}else k.isPoints?ie.setMode(C.POINTS):k.isSprite&&ie.setMode(C.TRIANGLES);if(k.isBatchedMesh)if(k._multiDrawInstances!==null)ie.renderMultiDrawInstances(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount,k._multiDrawInstances);else if(et.get("WEBGL_multi_draw"))ie.renderMultiDraw(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount);else{const kt=k._multiDrawStarts,Ne=k._multiDrawCounts,ce=k._multiDrawCount,hn=At?q.get(At).bytesPerElement:1,Ei=_t.get(H).currentProgram.getUniforms();for(let Ke=0;Ke<ce;Ke++)Ei.setValue(C,"_gl_DrawID",Ke),ie.render(kt[Ke]/hn,Ne[Ke])}else if(k.isInstancedMesh)ie.renderInstances(ne,Ae,k.count);else if(G.isInstancedBufferGeometry){const kt=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,Ne=Math.min(G.instanceCount,kt);ie.renderInstances(ne,Ae,Ne)}else ie.render(ne,Ae)};function he(S,N,G){S.transparent===!0&&S.side===ln&&S.forceSinglePass===!1?(S.side=je,S.needsUpdate=!0,tr(S,N,G),S.side=ti,S.needsUpdate=!0,tr(S,N,G),S.side=ln):tr(S,N,G)}this.compile=function(S,N,G=null){G===null&&(G=S),p=Kt.get(G),p.init(N),x.push(p),G.traverseVisible(function(k){k.isLight&&k.layers.test(N.layers)&&(p.pushLight(k),k.castShadow&&p.pushShadow(k))}),S!==G&&S.traverseVisible(function(k){k.isLight&&k.layers.test(N.layers)&&(p.pushLight(k),k.castShadow&&p.pushShadow(k))}),p.setupLights();const H=new Set;return S.traverse(function(k){if(!(k.isMesh||k.isPoints||k.isLine||k.isSprite))return;const it=k.material;if(it)if(Array.isArray(it))for(let pt=0;pt<it.length;pt++){const Mt=it[pt];he(Mt,G,k),H.add(Mt)}else he(it,G,k),H.add(it)}),x.pop(),p=null,H},this.compileAsync=function(S,N,G=null){const H=this.compile(S,N,G);return new Promise(k=>{function it(){if(H.forEach(function(pt){_t.get(pt).currentProgram.isReady()&&H.delete(pt)}),H.size===0){k(S);return}setTimeout(it,10)}et.get("KHR_parallel_shader_compile")!==null?it():setTimeout(it,10)})};let cn=null;function Tn(S){cn&&cn(S)}function Sl(){si.stop()}function Tl(){si.start()}const si=new Hh;si.setAnimationLoop(Tn),typeof self<"u"&&si.setContext(self),this.setAnimationLoop=function(S){cn=S,Y.setAnimationLoop(S),S===null?si.stop():si.start()},Y.addEventListener("sessionstart",Sl),Y.addEventListener("sessionend",Tl),this.render=function(S,N){if(N!==void 0&&N.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(L===!0)return;if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),Y.enabled===!0&&Y.isPresenting===!0&&(Y.cameraAutoUpdate===!0&&Y.updateCamera(N),N=Y.getCamera()),S.isScene===!0&&S.onBeforeRender(_,S,N,P),p=Kt.get(S,x.length),p.init(N),x.push(p),Ut.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),Z.setFromProjectionMatrix(Ut),Rt=this.localClippingEnabled,ot=st.init(this.clippingPlanes,Rt),m=bt.get(S,b.length),m.init(),b.push(m),Y.enabled===!0&&Y.isPresenting===!0){const it=_.xr.getDepthSensingMesh();it!==null&&mo(it,N,-1/0,_.sortObjects)}mo(S,N,0,_.sortObjects),m.finish(),_.sortObjects===!0&&m.sort(lt,yt),Q=Y.enabled===!1||Y.isPresenting===!1||Y.hasDepthSensing()===!1,Q&&Ft.addToRenderList(m,S),this.info.render.frame++,ot===!0&&st.beginShadows();const G=p.state.shadowsArray;St.render(G,S,N),ot===!0&&st.endShadows(),this.info.autoReset===!0&&this.info.reset();const H=m.opaque,k=m.transmissive;if(p.setupLights(),N.isArrayCamera){const it=N.cameras;if(k.length>0)for(let pt=0,Mt=it.length;pt<Mt;pt++){const At=it[pt];Al(H,k,S,At)}Q&&Ft.render(S);for(let pt=0,Mt=it.length;pt<Mt;pt++){const At=it[pt];El(m,S,At,At.viewport)}}else k.length>0&&Al(H,k,S,N),Q&&Ft.render(S),El(m,S,N);P!==null&&(A.updateMultisampleRenderTarget(P),A.updateRenderTargetMipmap(P)),S.isScene===!0&&S.onAfterRender(_,S,N),ve.resetDefaultState(),M=-1,y=null,x.pop(),x.length>0?(p=x[x.length-1],ot===!0&&st.setGlobalState(_.clippingPlanes,p.state.camera)):p=null,b.pop(),b.length>0?m=b[b.length-1]:m=null};function mo(S,N,G,H){if(S.visible===!1)return;if(S.layers.test(N.layers)){if(S.isGroup)G=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(N);else if(S.isLight)p.pushLight(S),S.castShadow&&p.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||Z.intersectsSprite(S)){H&&Bt.setFromMatrixPosition(S.matrixWorld).applyMatrix4(Ut);const pt=j.update(S),Mt=S.material;Mt.visible&&m.push(S,pt,Mt,G,Bt.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||Z.intersectsObject(S))){const pt=j.update(S),Mt=S.material;if(H&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),Bt.copy(S.boundingSphere.center)):(pt.boundingSphere===null&&pt.computeBoundingSphere(),Bt.copy(pt.boundingSphere.center)),Bt.applyMatrix4(S.matrixWorld).applyMatrix4(Ut)),Array.isArray(Mt)){const At=pt.groups;for(let Gt=0,Vt=At.length;Gt<Vt;Gt++){const Nt=At[Gt],ne=Mt[Nt.materialIndex];ne&&ne.visible&&m.push(S,pt,ne,G,Bt.z,Nt)}}else Mt.visible&&m.push(S,pt,Mt,G,Bt.z,null)}}const it=S.children;for(let pt=0,Mt=it.length;pt<Mt;pt++)mo(it[pt],N,G,H)}function El(S,N,G,H){const k=S.opaque,it=S.transmissive,pt=S.transparent;p.setupLightsView(G),ot===!0&&st.setGlobalState(_.clippingPlanes,G),H&&ct.viewport(D.copy(H)),k.length>0&&Qs(k,N,G),it.length>0&&Qs(it,N,G),pt.length>0&&Qs(pt,N,G),ct.buffers.depth.setTest(!0),ct.buffers.depth.setMask(!0),ct.buffers.color.setMask(!0),ct.setPolygonOffset(!1)}function Al(S,N,G,H){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[H.id]===void 0&&(p.state.transmissionRenderTarget[H.id]=new yi(1,1,{generateMipmaps:!0,type:et.has("EXT_color_buffer_half_float")||et.has("EXT_color_buffer_float")?Os:On,minFilter:_i,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:se.workingColorSpace}));const it=p.state.transmissionRenderTarget[H.id],pt=H.viewport||D;it.setSize(pt.z,pt.w);const Mt=_.getRenderTarget();_.setRenderTarget(it),_.getClearColor(V),$=_.getClearAlpha(),$<1&&_.setClearColor(16777215,.5),_.clear(),Q&&Ft.render(G);const At=_.toneMapping;_.toneMapping=Jn;const Gt=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),p.setupLightsView(H),ot===!0&&st.setGlobalState(_.clippingPlanes,H),Qs(S,G,H),A.updateMultisampleRenderTarget(it),A.updateRenderTargetMipmap(it),et.has("WEBGL_multisampled_render_to_texture")===!1){let Vt=!1;for(let Nt=0,ne=N.length;Nt<ne;Nt++){const le=N[Nt],Ae=le.object,Se=le.geometry,ie=le.material,kt=le.group;if(ie.side===ln&&Ae.layers.test(H.layers)){const Ne=ie.side;ie.side=je,ie.needsUpdate=!0,Rl(Ae,G,H,Se,ie,kt),ie.side=Ne,ie.needsUpdate=!0,Vt=!0}}Vt===!0&&(A.updateMultisampleRenderTarget(it),A.updateRenderTargetMipmap(it))}_.setRenderTarget(Mt),_.setClearColor(V,$),Gt!==void 0&&(H.viewport=Gt),_.toneMapping=At}function Qs(S,N,G){const H=N.isScene===!0?N.overrideMaterial:null;for(let k=0,it=S.length;k<it;k++){const pt=S[k],Mt=pt.object,At=pt.geometry,Gt=H===null?pt.material:H,Vt=pt.group;Mt.layers.test(G.layers)&&Rl(Mt,N,G,At,Gt,Vt)}}function Rl(S,N,G,H,k,it){S.onBeforeRender(_,N,G,H,k,it),S.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),k.onBeforeRender(_,N,G,H,S,it),k.transparent===!0&&k.side===ln&&k.forceSinglePass===!1?(k.side=je,k.needsUpdate=!0,_.renderBufferDirect(G,N,H,k,S,it),k.side=ti,k.needsUpdate=!0,_.renderBufferDirect(G,N,H,k,S,it),k.side=ln):_.renderBufferDirect(G,N,H,k,S,it),S.onAfterRender(_,N,G,H,k,it)}function tr(S,N,G){N.isScene!==!0&&(N=ee);const H=_t.get(S),k=p.state.lights,it=p.state.shadowsArray,pt=k.state.version,Mt=Ct.getParameters(S,k.state,it,N,G),At=Ct.getProgramCacheKey(Mt);let Gt=H.programs;H.environment=S.isMeshStandardMaterial?N.environment:null,H.fog=N.fog,H.envMap=(S.isMeshStandardMaterial?F:w).get(S.envMap||H.environment),H.envMapRotation=H.environment!==null&&S.envMap===null?N.environmentRotation:S.envMapRotation,Gt===void 0&&(S.addEventListener("dispose",Xt),Gt=new Map,H.programs=Gt);let Vt=Gt.get(At);if(Vt!==void 0){if(H.currentProgram===Vt&&H.lightsStateVersion===pt)return Ll(S,Mt),Vt}else Mt.uniforms=Ct.getUniforms(S),S.onBeforeCompile(Mt,_),Vt=Ct.acquireProgram(Mt,At),Gt.set(At,Vt),H.uniforms=Mt.uniforms;const Nt=H.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(Nt.clippingPlanes=st.uniform),Ll(S,Mt),H.needsLights=ud(S),H.lightsStateVersion=pt,H.needsLights&&(Nt.ambientLightColor.value=k.state.ambient,Nt.lightProbe.value=k.state.probe,Nt.directionalLights.value=k.state.directional,Nt.directionalLightShadows.value=k.state.directionalShadow,Nt.spotLights.value=k.state.spot,Nt.spotLightShadows.value=k.state.spotShadow,Nt.rectAreaLights.value=k.state.rectArea,Nt.ltc_1.value=k.state.rectAreaLTC1,Nt.ltc_2.value=k.state.rectAreaLTC2,Nt.pointLights.value=k.state.point,Nt.pointLightShadows.value=k.state.pointShadow,Nt.hemisphereLights.value=k.state.hemi,Nt.directionalShadowMap.value=k.state.directionalShadowMap,Nt.directionalShadowMatrix.value=k.state.directionalShadowMatrix,Nt.spotShadowMap.value=k.state.spotShadowMap,Nt.spotLightMatrix.value=k.state.spotLightMatrix,Nt.spotLightMap.value=k.state.spotLightMap,Nt.pointShadowMap.value=k.state.pointShadowMap,Nt.pointShadowMatrix.value=k.state.pointShadowMatrix),H.currentProgram=Vt,H.uniformsList=null,Vt}function Cl(S){if(S.uniformsList===null){const N=S.currentProgram.getUniforms();S.uniformsList=Gr.seqWithValue(N.seq,S.uniforms)}return S.uniformsList}function Ll(S,N){const G=_t.get(S);G.outputColorSpace=N.outputColorSpace,G.batching=N.batching,G.batchingColor=N.batchingColor,G.instancing=N.instancing,G.instancingColor=N.instancingColor,G.instancingMorph=N.instancingMorph,G.skinning=N.skinning,G.morphTargets=N.morphTargets,G.morphNormals=N.morphNormals,G.morphColors=N.morphColors,G.morphTargetsCount=N.morphTargetsCount,G.numClippingPlanes=N.numClippingPlanes,G.numIntersection=N.numClipIntersection,G.vertexAlphas=N.vertexAlphas,G.vertexTangents=N.vertexTangents,G.toneMapping=N.toneMapping}function hd(S,N,G,H,k){N.isScene!==!0&&(N=ee),A.resetTextureUnits();const it=N.fog,pt=H.isMeshStandardMaterial?N.environment:null,Mt=P===null?_.outputColorSpace:P.isXRRenderTarget===!0?P.texture.colorSpace:rs,At=(H.isMeshStandardMaterial?F:w).get(H.envMap||pt),Gt=H.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,Vt=!!G.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),Nt=!!G.morphAttributes.position,ne=!!G.morphAttributes.normal,le=!!G.morphAttributes.color;let Ae=Jn;H.toneMapped&&(P===null||P.isXRRenderTarget===!0)&&(Ae=_.toneMapping);const Se=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,ie=Se!==void 0?Se.length:0,kt=_t.get(H),Ne=p.state.lights;if(ot===!0&&(Rt===!0||S!==y)){const He=S===y&&H.id===M;st.setState(H,S,He)}let ce=!1;H.version===kt.__version?(kt.needsLights&&kt.lightsStateVersion!==Ne.state.version||kt.outputColorSpace!==Mt||k.isBatchedMesh&&kt.batching===!1||!k.isBatchedMesh&&kt.batching===!0||k.isBatchedMesh&&kt.batchingColor===!0&&k.colorTexture===null||k.isBatchedMesh&&kt.batchingColor===!1&&k.colorTexture!==null||k.isInstancedMesh&&kt.instancing===!1||!k.isInstancedMesh&&kt.instancing===!0||k.isSkinnedMesh&&kt.skinning===!1||!k.isSkinnedMesh&&kt.skinning===!0||k.isInstancedMesh&&kt.instancingColor===!0&&k.instanceColor===null||k.isInstancedMesh&&kt.instancingColor===!1&&k.instanceColor!==null||k.isInstancedMesh&&kt.instancingMorph===!0&&k.morphTexture===null||k.isInstancedMesh&&kt.instancingMorph===!1&&k.morphTexture!==null||kt.envMap!==At||H.fog===!0&&kt.fog!==it||kt.numClippingPlanes!==void 0&&(kt.numClippingPlanes!==st.numPlanes||kt.numIntersection!==st.numIntersection)||kt.vertexAlphas!==Gt||kt.vertexTangents!==Vt||kt.morphTargets!==Nt||kt.morphNormals!==ne||kt.morphColors!==le||kt.toneMapping!==Ae||kt.morphTargetsCount!==ie)&&(ce=!0):(ce=!0,kt.__version=H.version);let hn=kt.currentProgram;ce===!0&&(hn=tr(H,N,k));let Ei=!1,Ke=!1,us=!1;const xe=hn.getUniforms(),sn=kt.uniforms;if(ct.useProgram(hn.program)&&(Ei=!0,Ke=!0,us=!0),H.id!==M&&(M=H.id,Ke=!0),Ei||y!==S){ct.buffers.depth.getReversed()?(ht.copy(S.projectionMatrix),xu(ht),yu(ht),xe.setValue(C,"projectionMatrix",ht)):xe.setValue(C,"projectionMatrix",S.projectionMatrix),xe.setValue(C,"viewMatrix",S.matrixWorldInverse);const Ye=xe.map.cameraPosition;Ye!==void 0&&Ye.setValue(C,Ht.setFromMatrixPosition(S.matrixWorld)),wt.logarithmicDepthBuffer&&xe.setValue(C,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&xe.setValue(C,"isOrthographic",S.isOrthographicCamera===!0),y!==S&&(y=S,Ke=!0,us=!0)}if(k.isSkinnedMesh){xe.setOptional(C,k,"bindMatrix"),xe.setOptional(C,k,"bindMatrixInverse");const He=k.skeleton;He&&(He.boneTexture===null&&He.computeBoneTexture(),xe.setValue(C,"boneTexture",He.boneTexture,A))}k.isBatchedMesh&&(xe.setOptional(C,k,"batchingTexture"),xe.setValue(C,"batchingTexture",k._matricesTexture,A),xe.setOptional(C,k,"batchingIdTexture"),xe.setValue(C,"batchingIdTexture",k._indirectTexture,A),xe.setOptional(C,k,"batchingColorTexture"),k._colorsTexture!==null&&xe.setValue(C,"batchingColorTexture",k._colorsTexture,A));const rn=G.morphAttributes;if((rn.position!==void 0||rn.normal!==void 0||rn.color!==void 0)&&zt.update(k,G,hn),(Ke||kt.receiveShadow!==k.receiveShadow)&&(kt.receiveShadow=k.receiveShadow,xe.setValue(C,"receiveShadow",k.receiveShadow)),H.isMeshGouraudMaterial&&H.envMap!==null&&(sn.envMap.value=At,sn.flipEnvMap.value=At.isCubeTexture&&At.isRenderTargetTexture===!1?-1:1),H.isMeshStandardMaterial&&H.envMap===null&&N.environment!==null&&(sn.envMapIntensity.value=N.environmentIntensity),Ke&&(xe.setValue(C,"toneMappingExposure",_.toneMappingExposure),kt.needsLights&&dd(sn,us),it&&H.fog===!0&&ut.refreshFogUniforms(sn,it),ut.refreshMaterialUniforms(sn,H,W,K,p.state.transmissionRenderTarget[S.id]),Gr.upload(C,Cl(kt),sn,A)),H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(Gr.upload(C,Cl(kt),sn,A),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&xe.setValue(C,"center",k.center),xe.setValue(C,"modelViewMatrix",k.modelViewMatrix),xe.setValue(C,"normalMatrix",k.normalMatrix),xe.setValue(C,"modelMatrix",k.matrixWorld),H.isShaderMaterial||H.isRawShaderMaterial){const He=H.uniformsGroups;for(let Ye=0,go=He.length;Ye<go;Ye++){const ri=He[Ye];U.update(ri,hn),U.bind(ri,hn)}}return hn}function dd(S,N){S.ambientLightColor.needsUpdate=N,S.lightProbe.needsUpdate=N,S.directionalLights.needsUpdate=N,S.directionalLightShadows.needsUpdate=N,S.pointLights.needsUpdate=N,S.pointLightShadows.needsUpdate=N,S.spotLights.needsUpdate=N,S.spotLightShadows.needsUpdate=N,S.rectAreaLights.needsUpdate=N,S.hemisphereLights.needsUpdate=N}function ud(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return E},this.getRenderTarget=function(){return P},this.setRenderTargetTextures=function(S,N,G){_t.get(S.texture).__webglTexture=N,_t.get(S.depthTexture).__webglTexture=G;const H=_t.get(S);H.__hasExternalTextures=!0,H.__autoAllocateDepthBuffer=G===void 0,H.__autoAllocateDepthBuffer||et.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),H.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(S,N){const G=_t.get(S);G.__webglFramebuffer=N,G.__useDefaultFramebuffer=N===void 0},this.setRenderTarget=function(S,N=0,G=0){P=S,R=N,E=G;let H=!0,k=null,it=!1,pt=!1;if(S){const At=_t.get(S);if(At.__useDefaultFramebuffer!==void 0)ct.bindFramebuffer(C.FRAMEBUFFER,null),H=!1;else if(At.__webglFramebuffer===void 0)A.setupRenderTarget(S);else if(At.__hasExternalTextures)A.rebindTextures(S,_t.get(S.texture).__webglTexture,_t.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){const Nt=S.depthTexture;if(At.__boundDepthTexture!==Nt){if(Nt!==null&&_t.has(Nt)&&(S.width!==Nt.image.width||S.height!==Nt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");A.setupDepthRenderbuffer(S)}}const Gt=S.texture;(Gt.isData3DTexture||Gt.isDataArrayTexture||Gt.isCompressedArrayTexture)&&(pt=!0);const Vt=_t.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Vt[N])?k=Vt[N][G]:k=Vt[N],it=!0):S.samples>0&&A.useMultisampledRTT(S)===!1?k=_t.get(S).__webglMultisampledFramebuffer:Array.isArray(Vt)?k=Vt[G]:k=Vt,D.copy(S.viewport),O.copy(S.scissor),B=S.scissorTest}else D.copy(Et).multiplyScalar(W).floor(),O.copy(Wt).multiplyScalar(W).floor(),B=ae;if(ct.bindFramebuffer(C.FRAMEBUFFER,k)&&H&&ct.drawBuffers(S,k),ct.viewport(D),ct.scissor(O),ct.setScissorTest(B),it){const At=_t.get(S.texture);C.framebufferTexture2D(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_CUBE_MAP_POSITIVE_X+N,At.__webglTexture,G)}else if(pt){const At=_t.get(S.texture),Gt=N||0;C.framebufferTextureLayer(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,At.__webglTexture,G||0,Gt)}M=-1},this.readRenderTargetPixels=function(S,N,G,H,k,it,pt){if(!(S&&S.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Mt=_t.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&pt!==void 0&&(Mt=Mt[pt]),Mt){ct.bindFramebuffer(C.FRAMEBUFFER,Mt);try{const At=S.texture,Gt=At.format,Vt=At.type;if(!wt.textureFormatReadable(Gt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!wt.textureTypeReadable(Vt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=S.width-H&&G>=0&&G<=S.height-k&&C.readPixels(N,G,H,k,Yt.convert(Gt),Yt.convert(Vt),it)}finally{const At=P!==null?_t.get(P).__webglFramebuffer:null;ct.bindFramebuffer(C.FRAMEBUFFER,At)}}},this.readRenderTargetPixelsAsync=async function(S,N,G,H,k,it,pt){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Mt=_t.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&pt!==void 0&&(Mt=Mt[pt]),Mt){const At=S.texture,Gt=At.format,Vt=At.type;if(!wt.textureFormatReadable(Gt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!wt.textureTypeReadable(Vt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(N>=0&&N<=S.width-H&&G>=0&&G<=S.height-k){ct.bindFramebuffer(C.FRAMEBUFFER,Mt);const Nt=C.createBuffer();C.bindBuffer(C.PIXEL_PACK_BUFFER,Nt),C.bufferData(C.PIXEL_PACK_BUFFER,it.byteLength,C.STREAM_READ),C.readPixels(N,G,H,k,Yt.convert(Gt),Yt.convert(Vt),0);const ne=P!==null?_t.get(P).__webglFramebuffer:null;ct.bindFramebuffer(C.FRAMEBUFFER,ne);const le=C.fenceSync(C.SYNC_GPU_COMMANDS_COMPLETE,0);return C.flush(),await _u(C,le,4),C.bindBuffer(C.PIXEL_PACK_BUFFER,Nt),C.getBufferSubData(C.PIXEL_PACK_BUFFER,0,it),C.deleteBuffer(Nt),C.deleteSync(le),it}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(S,N=null,G=0){S.isTexture!==!0&&($i("WebGLRenderer: copyFramebufferToTexture function signature has changed."),N=arguments[0]||null,S=arguments[1]);const H=Math.pow(2,-G),k=Math.floor(S.image.width*H),it=Math.floor(S.image.height*H),pt=N!==null?N.x:0,Mt=N!==null?N.y:0;A.setTexture2D(S,0),C.copyTexSubImage2D(C.TEXTURE_2D,G,0,0,pt,Mt,k,it),ct.unbindTexture()};const fd=C.createFramebuffer(),pd=C.createFramebuffer();this.copyTextureToTexture=function(S,N,G=null,H=null,k=0,it=null){S.isTexture!==!0&&($i("WebGLRenderer: copyTextureToTexture function signature has changed."),H=arguments[0]||null,S=arguments[1],N=arguments[2],it=arguments[3]||0,G=null),it===null&&(k!==0?($i("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),it=k,k=0):it=0);let pt,Mt,At,Gt,Vt,Nt,ne,le,Ae;const Se=S.isCompressedTexture?S.mipmaps[it]:S.image;if(G!==null)pt=G.max.x-G.min.x,Mt=G.max.y-G.min.y,At=G.isBox3?G.max.z-G.min.z:1,Gt=G.min.x,Vt=G.min.y,Nt=G.isBox3?G.min.z:0;else{const rn=Math.pow(2,-k);pt=Math.floor(Se.width*rn),Mt=Math.floor(Se.height*rn),S.isDataArrayTexture?At=Se.depth:S.isData3DTexture?At=Math.floor(Se.depth*rn):At=1,Gt=0,Vt=0,Nt=0}H!==null?(ne=H.x,le=H.y,Ae=H.z):(ne=0,le=0,Ae=0);const ie=Yt.convert(N.format),kt=Yt.convert(N.type);let Ne;N.isData3DTexture?(A.setTexture3D(N,0),Ne=C.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?(A.setTexture2DArray(N,0),Ne=C.TEXTURE_2D_ARRAY):(A.setTexture2D(N,0),Ne=C.TEXTURE_2D),C.pixelStorei(C.UNPACK_FLIP_Y_WEBGL,N.flipY),C.pixelStorei(C.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),C.pixelStorei(C.UNPACK_ALIGNMENT,N.unpackAlignment);const ce=C.getParameter(C.UNPACK_ROW_LENGTH),hn=C.getParameter(C.UNPACK_IMAGE_HEIGHT),Ei=C.getParameter(C.UNPACK_SKIP_PIXELS),Ke=C.getParameter(C.UNPACK_SKIP_ROWS),us=C.getParameter(C.UNPACK_SKIP_IMAGES);C.pixelStorei(C.UNPACK_ROW_LENGTH,Se.width),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,Se.height),C.pixelStorei(C.UNPACK_SKIP_PIXELS,Gt),C.pixelStorei(C.UNPACK_SKIP_ROWS,Vt),C.pixelStorei(C.UNPACK_SKIP_IMAGES,Nt);const xe=S.isDataArrayTexture||S.isData3DTexture,sn=N.isDataArrayTexture||N.isData3DTexture;if(S.isDepthTexture){const rn=_t.get(S),He=_t.get(N),Ye=_t.get(rn.__renderTarget),go=_t.get(He.__renderTarget);ct.bindFramebuffer(C.READ_FRAMEBUFFER,Ye.__webglFramebuffer),ct.bindFramebuffer(C.DRAW_FRAMEBUFFER,go.__webglFramebuffer);for(let ri=0;ri<At;ri++)xe&&(C.framebufferTextureLayer(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,_t.get(S).__webglTexture,k,Nt+ri),C.framebufferTextureLayer(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,_t.get(N).__webglTexture,it,Ae+ri)),C.blitFramebuffer(Gt,Vt,pt,Mt,ne,le,pt,Mt,C.DEPTH_BUFFER_BIT,C.NEAREST);ct.bindFramebuffer(C.READ_FRAMEBUFFER,null),ct.bindFramebuffer(C.DRAW_FRAMEBUFFER,null)}else if(k!==0||S.isRenderTargetTexture||_t.has(S)){const rn=_t.get(S),He=_t.get(N);ct.bindFramebuffer(C.READ_FRAMEBUFFER,fd),ct.bindFramebuffer(C.DRAW_FRAMEBUFFER,pd);for(let Ye=0;Ye<At;Ye++)xe?C.framebufferTextureLayer(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,rn.__webglTexture,k,Nt+Ye):C.framebufferTexture2D(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,rn.__webglTexture,k),sn?C.framebufferTextureLayer(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,He.__webglTexture,it,Ae+Ye):C.framebufferTexture2D(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,He.__webglTexture,it),k!==0?C.blitFramebuffer(Gt,Vt,pt,Mt,ne,le,pt,Mt,C.COLOR_BUFFER_BIT,C.NEAREST):sn?C.copyTexSubImage3D(Ne,it,ne,le,Ae+Ye,Gt,Vt,pt,Mt):C.copyTexSubImage2D(Ne,it,ne,le,Gt,Vt,pt,Mt);ct.bindFramebuffer(C.READ_FRAMEBUFFER,null),ct.bindFramebuffer(C.DRAW_FRAMEBUFFER,null)}else sn?S.isDataTexture||S.isData3DTexture?C.texSubImage3D(Ne,it,ne,le,Ae,pt,Mt,At,ie,kt,Se.data):N.isCompressedArrayTexture?C.compressedTexSubImage3D(Ne,it,ne,le,Ae,pt,Mt,At,ie,Se.data):C.texSubImage3D(Ne,it,ne,le,Ae,pt,Mt,At,ie,kt,Se):S.isDataTexture?C.texSubImage2D(C.TEXTURE_2D,it,ne,le,pt,Mt,ie,kt,Se.data):S.isCompressedTexture?C.compressedTexSubImage2D(C.TEXTURE_2D,it,ne,le,Se.width,Se.height,ie,Se.data):C.texSubImage2D(C.TEXTURE_2D,it,ne,le,pt,Mt,ie,kt,Se);C.pixelStorei(C.UNPACK_ROW_LENGTH,ce),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,hn),C.pixelStorei(C.UNPACK_SKIP_PIXELS,Ei),C.pixelStorei(C.UNPACK_SKIP_ROWS,Ke),C.pixelStorei(C.UNPACK_SKIP_IMAGES,us),it===0&&N.generateMipmaps&&C.generateMipmap(Ne),ct.unbindTexture()},this.copyTextureToTexture3D=function(S,N,G=null,H=null,k=0){return S.isTexture!==!0&&($i("WebGLRenderer: copyTextureToTexture3D function signature has changed."),G=arguments[0]||null,H=arguments[1]||null,S=arguments[2],N=arguments[3],k=arguments[4]||0),$i('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(S,N,G,H,k)},this.initRenderTarget=function(S){_t.get(S).__webglFramebuffer===void 0&&A.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?A.setTextureCube(S,0):S.isData3DTexture?A.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?A.setTexture2DArray(S,0):A.setTexture2D(S,0),ct.unbindTexture()},this.resetState=function(){R=0,E=0,P=null,ct.reset(),ve.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return kn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=se._getDrawingBufferColorSpace(t),e.unpackColorSpace=se._getUnpackColorSpace()}}const gv=2;function vv(s){const t=typeof navigator.gpu<"u",e=new mv({canvas:s,antialias:!0,alpha:!1,powerPreference:"high-performance"}),n=Math.min(window.devicePixelRatio||1,gv);return e.setPixelRatio(n),e.outputColorSpace=Ue,e.toneMapping=ah,e.toneMappingExposure=1.06,e.shadowMap.enabled=!0,e.shadowMap.type=rh,{renderer:e,info:{backend:"webgl2",webgpuSupported:t,pixelRatio:n}}}class Ti{renderer;info;scene;camera;wrap;canvas;clock=new If;handlers=new Set;rafId=0;running=!1;lastTickAt=0;watchdog=null;resizeObserver;frameCenter=new I(.1,.2,.1);framePoints=[];static VIEW_DIR=new I(.02,.62,.782).normalize();viewDir;fovFor;onVisibility=()=>{document.hidden?this.stopLoop():this.startLoop()};constructor(t,e={}){this.wrap=t,this.canvas=document.createElement("canvas"),this.canvas.setAttribute("aria-label","CodeBops 3D world"),t.appendChild(this.canvas);const{renderer:n,info:i}=vv(this.canvas);this.renderer=n,this.info=i,this.viewDir=e.viewDir?new I(e.viewDir.x,e.viewDir.y,e.viewDir.z).normalize():Ti.VIEW_DIR.clone(),this.fovFor=e.fovFor??(l=>l>=1.4?34:l>=1?40:46),this.scene=new Vu,this.scene.background=new Zt("#6fc7ff"),this.scene.fog=new Yr("#a8dcff",50,130),this.camera=new tn(34,16/9,.1,120),this.camera.position.set(.2,8.8,10.8),this.camera.lookAt(.1,.2,.1);const r=e.indoor?new cc("#a8b6e8","#39406e",.95):new cc("#cfeaff","#79c95f",1.15);this.scene.add(r);const o=e.indoor?new Wo("#ffe1b0",1.7):new Wo("#fff3d6",2.1);e.indoor?o.position.set(3,10,12):o.position.set(7,14,8),o.castShadow=!0,o.shadow.mapSize.set(2048,2048),o.shadow.camera.left=-14,o.shadow.camera.right=14,o.shadow.camera.top=14,o.shadow.camera.bottom=-14,o.shadow.camera.far=45,o.shadow.bias=-4e-4,o.shadow.radius=6,this.scene.add(o);const a=new Wo("#bcd6ff",.55);a.position.set(-6,8,-4),this.scene.add(a),this.resizeObserver=new ResizeObserver(()=>this.resize()),this.resizeObserver.observe(this.wrap),document.addEventListener("visibilitychange",this.onVisibility),this.resize()}onTick(t){return this.handlers.add(t),()=>this.handlers.delete(t)}startLoop(){if(this.running)return;this.running=!0,this.clock.getDelta();const t=()=>{this.lastTickAt=performance.now();const n=Math.min(this.clock.getDelta(),.25);this.handlers.forEach(i=>i(n,this.clock.elapsedTime)),this.renderer.render(this.scene,this.camera)},e=()=>{this.running&&(this.rafId=requestAnimationFrame(e),t())};this.rafId=requestAnimationFrame(e),this.watchdog=window.setInterval(()=>{this.running&&performance.now()-this.lastTickAt>250&&t()},100)}stopLoop(){this.running=!1,cancelAnimationFrame(this.rafId),this.watchdog!==null&&(clearInterval(this.watchdog),this.watchdog=null)}frameArea(t,e){this.frameCenter.copy(t),this.framePoints=e.map(n=>n.clone()),this.applyFrame()}applyFrame(){const e=this.camera.aspect<1?1.08:1.2;let n=11;const i=this.camera;for(let r=0;r<4;r++){i.position.copy(this.frameCenter).addScaledVector(this.viewDir,n),i.lookAt(this.frameCenter.x,this.frameCenter.y,this.frameCenter.z),i.updateMatrixWorld(!0),i.updateProjectionMatrix();let o=0;for(const l of this.framePoints){const c=l.clone().project(i);o=Math.max(o,Math.abs(c.x),Math.abs(c.y))}const a=o*e;if(a<=1||this.framePoints.length===0)break;n*=a}}setSky(t,e=26,n=62){this.scene.background=new Zt(t),this.scene.fog=new Yr(t,e,n),this.running||this.renderer.render(this.scene,this.camera)}resize(){const t=Math.max(1,this.wrap.clientWidth),e=Math.max(1,this.wrap.clientHeight);this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),this.renderer.setSize(t,e,!1),this.camera.aspect=t/e;const n=t/e;this.camera.fov=this.fovFor(n),n<1?this.camera.setViewOffset(t,e,0,Math.round(e*.085),t,e):this.camera.clearViewOffset(),this.camera.updateProjectionMatrix(),this.applyFrame(),this.running||this.renderer.render(this.scene,this.camera)}dispose(){this.stopLoop(),this.resizeObserver.disconnect(),document.removeEventListener("visibilitychange",this.onVisibility),this.scene.traverse(t=>{if(t instanceof It){t.geometry.dispose();const e=Array.isArray(t.material)?t.material:[t.material];for(const n of e)if(!n.userData?.shared){for(const i of Object.values(n))i instanceof Oe&&!i.userData?.shared&&i.dispose();n.dispose()}}}),this.renderer.dispose(),this.canvas.remove()}}const xs=new I;function an(s,t,e,n,i,r){const o=2*Math.PI*i/4,a=Math.max(r-2*i,0),l=Math.PI/4;xs.copy(t),xs[n]=0,xs.normalize();const c=.5*o/(o+a),h=1-xs.angleTo(s)/l;return Math.sign(xs[e])===1?h*c:a/(o+a)+c+c*(1-h)}class gt extends _e{constructor(t=1,e=1,n=1,i=2,r=.1){if(i=i*2+1,r=Math.min(t/2,e/2,n/2,r),super(1,1,1,i,i,i),i===1)return;const o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;const a=new I,l=new I,c=new I(t,e,n).divideScalar(2).subScalar(r),h=this.attributes.position.array,d=this.attributes.normal.array,u=this.attributes.uv.array,f=h.length/6,g=new I,v=.5/i;for(let m=0,p=0;m<h.length;m+=3,p+=2)switch(a.fromArray(h,m),l.copy(a),l.x-=Math.sign(l.x)*v,l.y-=Math.sign(l.y)*v,l.z-=Math.sign(l.z)*v,l.normalize(),h[m+0]=c.x*Math.sign(a.x)+l.x*r,h[m+1]=c.y*Math.sign(a.y)+l.y*r,h[m+2]=c.z*Math.sign(a.z)+l.z*r,d[m+0]=l.x,d[m+1]=l.y,d[m+2]=l.z,Math.floor(m/f)){case 0:g.set(1,0,0),u[p+0]=an(g,l,"z","y",r,n),u[p+1]=1-an(g,l,"y","z",r,e);break;case 1:g.set(-1,0,0),u[p+0]=1-an(g,l,"z","y",r,n),u[p+1]=1-an(g,l,"y","z",r,e);break;case 2:g.set(0,1,0),u[p+0]=1-an(g,l,"x","z",r,t),u[p+1]=an(g,l,"z","x",r,n);break;case 3:g.set(0,-1,0),u[p+0]=1-an(g,l,"x","z",r,t),u[p+1]=1-an(g,l,"z","x",r,n);break;case 4:g.set(0,0,1),u[p+0]=1-an(g,l,"x","y",r,t),u[p+1]=1-an(g,l,"y","x",r,e);break;case 5:g.set(0,0,-1),u[p+0]=an(g,l,"x","y",r,t),u[p+1]=1-an(g,l,"y","x",r,e);break}}}let Yn=null;function _v(){if(Yn)return Yn;const s=new Uint8Array([90,150,210,255]);return Yn=new Wu(s,4,1,rl),Yn.minFilter=Xe,Yn.magFilter=Xe,Yn.needsUpdate=!0,Yn.userData.shared=!0,Yn}const Gc=new Map;function z(s){const t=String(s);let e=Gc.get(t);return e||(e=new Jt({color:s,gradientMap:_v()}),e.userData.shared=!0,Gc.set(t,e)),e}let Jo=null;function xv(){if(Jo)return Jo;const s=128,t=document.createElement("canvas");t.width=t.height=s;const e=t.getContext("2d"),n=e.createRadialGradient(s/2,s/2,6,s/2,s/2,s/2);n.addColorStop(0,"rgba(13,20,55,0.42)"),n.addColorStop(.6,"rgba(13,20,55,0.18)"),n.addColorStop(1,"rgba(13,20,55,0)"),e.fillStyle=n,e.fillRect(0,0,s,s);const i=new Vs(t);return i.colorSpace=Ue,i.userData.shared=!0,Jo=i,i}function Yh(){const t=document.createElement("canvas");t.width=t.height=256;const e=t.getContext("2d");e.fillStyle="#37b6f6",e.fillRect(0,0,256,256),e.strokeStyle="rgba(255,255,255,0.5)",e.lineWidth=5,e.lineCap="round";for(let i=0;i<6;i++){e.beginPath();const r=20+i*42;for(let o=-20;o<=276;o+=8){const a=r+Math.sin(o/256*Math.PI*3+i*1.7)*7;o===-20?e.moveTo(o,a):e.lineTo(o,a)}e.stroke()}const n=new Vs(t);return n.wrapS=n.wrapT=ns,n.repeat.set(2.2,2.2),n.colorSpace=Ue,n}function re(s,t,e=0,n=0,i=0,r=!0,o=!0){const a=new It(s,t);return a.position.set(e,n,i),a.castShadow=r,a.receiveShadow=o,a}function yv(){const s=new gt(30,1.4,22,4,.55);return re(s,z("#5fc94e"),0,-.72,0,!1,!0)}const as=.28;function xl(s,t){const e=new nt,n=new gt(s,as,s,3,.1);return e.add(re(n,z(t),0,-as/2,0)),e}function Qo(s=1,t="#3faf5a",e="#2f9247"){const n=new nt,i=re(new Pt(.22*s,.3*s,1.4*s,8),z("#8d5a2b"),0,.7*s,0);n.add(i);const r=[[0,1.85,0,1,t],[-.62,1.45,.12,.72,e],[.6,1.5,-.1,.78,t],[.05,1.4,.55,.6,e]];for(const[o,a,l,c,h]of r)n.add(re(new Dt(c*s,14,12),z(h),o*s,a*s,l*s));return n}function bv(s=2.2,t=3.4){const e=new nt,n=9,i=z("#b5773f"),r=z("#8d5a2b");for(let o=0;o<n;o++){const a=o/(n-1)-.5,l=re(new _e(s,.1,t/n-.045),i);l.position.set(0,Math.cos(a*Math.PI)*.42+.12,a*t),l.rotation.x=-Math.sin(a*Math.PI)*.45,e.add(l)}for(const o of[-1,1]){const a=re(new Le(t*.42,.05,6,20,Math.PI*.72),r,o*(s/2),.34,0);a.rotation.y=Math.PI/2,a.rotation.z=Math.PI*.14,e.add(a);for(const l of[-t/2+.15,0,t/2-.15])e.add(re(new Pt(.06,.06,.42,6),r,o*(s/2),.3,l))}return e}function wv(s,t=1.9){const e=new Ph(s),n=Yh(),i=new nt,r=new Qr(e,40,t/2,10,!1),o=new Jt({map:n,gradientMap:null}),a=new It(r,o);a.scale.y=.12,a.position.y=.06,a.receiveShadow=!0,i.add(a);const l=new It(new Qr(e,40,t/2+.16,10,!1),z("#bfeaff"));return l.scale.y=.07,l.position.y=.02,i.add(l),{group:i,texture:n}}function Ka(s=3,t=.7){const e=new nt;for(let n=0;n<s;n++){const i=.22+Math.random()*.2,r=re(new pl(i,1),z(n%2?"#9aa7bd":"#b3bfd2"));r.position.set((Math.random()-.5)*t,i*.55,(Math.random()-.5)*t),r.scale.y=.72,r.rotation.set(Math.random(),Math.random()*Math.PI,Math.random()*.4),e.add(r)}return e}function qh(s=1){const t=new nt,e=["#2f9247","#3faf5a","#37a24e"];[[0,.34,0,.42],[-.3,.26,.08,.3],[.3,.28,-.04,.32],[.02,.3,.3,.26]].forEach(([i,r,o,a],l)=>{t.add(re(new Dt(a*s,12,10),z(e[l%e.length]),i*s,r*s,o*s))});for(let i=0;i<3;i++)t.add(re(new Dt(.06*s,8,6),z(["#ff8fc0","#ffd23e","#ffffff"][i]),(Math.random()-.5)*.5*s,(.4+Math.random()*.25)*s,(Math.random()-.5)*.5*s,!1,!1));return t}function jh(s=5,t=1.1){const e=new nt,n=["#ff8fc0","#ffd23e","#7dd7ff","#c79bff","#ffffff","#ff9f7a"];for(let i=0;i<s;i++){const r=new nt,o=(Math.random()-.5)*t,a=(Math.random()-.5)*t,l=.26+Math.random()*.16;r.add(re(new Pt(.02,.03,l,5),z("#2f9247"),0,l/2,0,!1,!1));const c=n[Math.floor(Math.random()*n.length)];for(let h=0;h<5;h++){const d=h/5*Math.PI*2;r.add(re(new Dt(.055,8,6),z(c),Math.cos(d)*.09,l,Math.sin(d)*.09,!1,!1))}r.add(re(new Dt(.05,8,6),z("#ffb703"),0,l+.01,0,!1,!1)),r.position.set(o,0,a),e.add(r)}return e}function Mv(){const s=new nt,t=re(new Pt(.62,.72,.16,24),z("#8b4ddb"),0,.5,0),e=re(new Pt(.5,.5,.06,24),z("#a06bff"),0,.6,0);s.add(t,e);const n=new zn,i=5;for(let a=0;a<i*2;a++){const l=a%2===0?.34:.15,c=a/(i*2)*Math.PI*2-Math.PI/2,h=Math.cos(c)*l,d=Math.sin(c)*l;a===0?n.moveTo(h,d):n.lineTo(h,d)}n.closePath();const r=new ni(n,{depth:.12,bevelEnabled:!0,bevelSize:.03,bevelThickness:.03,bevelSegments:2});r.center();const o=re(r,z("#ffd23e"),0,.86,0);return o.rotation.x=-1.05,o.name="goalStar",s.add(o),s}function Sv(){const s=new nt,t=re(new Dt(.24,14,12),z("#ff4757"),0,.24,0);t.scale.set(1,.92,.94),s.add(t);for(let e=0;e<4;e++){const n=e/4*Math.PI*2,i=re(new $e(.07,.16,5),z("#3faf5a"),Math.cos(n)*.09,.44,Math.sin(n)*.09);i.rotation.set(Math.cos(n)*.9,0,-Math.sin(n)*.9),s.add(i)}s.add(re(new Pt(.02,.03,.1,5),z("#2f9247"),0,.5,0));for(let e=0;e<10;e++){const n=e/10*Math.PI*2,i=.14+e%3*.08,r=.21*Math.cos((i-.24)*1.6);s.add(re(new Dt(.018,6,4),z("#ffe9a8"),Math.cos(n)*r,i,Math.sin(n)*r,!1,!1))}return s}function Zh(s=1){const t=new nt,e=new Jt({color:"#ffffff",gradientMap:null,transparent:!0,opacity:.96}),n=[[0,0,0,.55],[-.55,-.06,.05,.38],[.55,-.04,-.03,.42],[.1,.22,0,.4]];for(const[i,r,o,a]of n){const l=new It(new Dt(a*s,12,10),e);l.position.set(i*s,r*s,o*s),t.add(l)}return t}function Tv(){const s=new nt,t=[[-9,-.4,-10.5,6.5,"#8fdc6f"],[8.5,-.6,-11,7.5,"#a2e57f"],[0,-.9,-13,9,"#b7ec92"]];for(const[i,r,o,a,l]of t){const c=re(new Dt(a,20,14),z(l),i,r,o,!1,!0);c.scale.y=.42,s.add(c)}const e=new nt;e.add(re(new _e(1.1,.9,1),z("#c79bff"),0,.45,0,!1,!1));const n=re(new $e(.95,.7,4),z("#8b4ddb"),0,1.25,0,!1,!1);return n.rotation.y=Math.PI/4,e.add(n),e.position.set(8.6,1.1,-11.2),s.add(e),s}function Kh(s=26,t=12){const e=new Float32Array(s*3);for(let o=0;o<s;o++)e[o*3]=(Math.random()-.5)*t,e[o*3+1]=.6+Math.random()*2.6,e[o*3+2]=(Math.random()-.5)*t;const n=new we;n.setAttribute("position",new Ze(e,3));const i=new Hs({color:"#fff7c0",size:.14,transparent:!0,opacity:.9,blending:Ls,depthWrite:!1,sizeAttenuation:!0}),r=new oo(n,i);return r.name="sparkles",r}function to(s="#4a4a68",t=1){const e=new nt,n=re(new $e(.09*t,.3*t,6),z(s),0,0,0,!1,!1);n.rotation.x=Math.PI/2,e.add(n);const i=new Jt({color:s,side:ln});for(const r of[-1,1]){const o=re(new Mn(.42*t,.16*t),i,r*.22*t,0,0,!1,!1);o.name=r<0?"wl":"wr",e.add(o)}return e}function Jh(s,t,e,n,i=0,r=12){s.position.x+=t*n,s.position.x>r&&(s.position.x=-r);const o=s.getObjectByName("wl"),a=s.getObjectByName("wr"),l=Math.sin(e*6+i)*.5;o&&(o.rotation.y=l),a&&(a.rotation.y=-l)}function Ev(s=14,t=12){const e=new nt,n=["#ffd6ec","#fff0f7","#ffe9a8"];for(let i=0;i<s;i++){const r=re(new Ws(.055+Math.random()*.03,6),new Jt({color:n[i%n.length],side:ln,transparent:!0,opacity:.95}),(Math.random()-.5)*t,.5+Math.random()*3.4,(Math.random()-.5)*t,!1,!1);r.scale.y=.6,r.userData.phase=Math.random()*Math.PI*2,r.userData.fall=.25+Math.random()*.3,e.add(r)}return e.name="petals",e}function Av(s,t,e,n=3.8){for(const i of s.children)i.position.y-=i.userData.fall*t,i.position.x+=Math.sin(e*1.4+i.userData.phase)*t*.5,i.rotation.x=e*2+i.userData.phase,i.rotation.y=e*1.3+i.userData.phase,i.position.y<.1&&(i.position.y=n)}function Hc(s="#ff8f5f",t=1){const e=new nt,n=re(new Dt(.16*t,10,8),z(s),0,0,0,!1,!1);n.scale.set(1.4,.9,.7),e.add(n);const i=re(new $e(.09*t,.18*t,4),z(s),-.26*t,0,0,!1,!1);return i.rotation.z=-Math.PI/2,i.name="tail",e.add(i),e.add(re(new Dt(.03*t,6,4),z("#22223a"),.12*t,.04*t,.1*t,!1,!1)),e}function Vc(s=1){const t=new nt;t.add(re(new gt(.34*s,.2*s,.34*s,2,.06),z("#5b6b8c"),0,0,0,!1,!1));const e=re(new Dt(.06*s,8,6),new Jt({color:"#54e6ff",emissive:"#54e6ff",emissiveIntensity:1.4}),0,0,.18*s,!1,!1);t.add(e);const n=re(new Le(.24*s,.03*s,6,18),z("#9fb4d8"),0,.14*s,0,!1,!1);return n.rotation.x=Math.PI/2,n.name="rotor",t.add(n),t}function Rv(s=24,t=13,e="#c9a0ff"){const n=new Float32Array(s*3);for(let o=0;o<s;o++)n[o*3]=(Math.random()-.5)*t,n[o*3+1]=.3+Math.random()*3,n[o*3+2]=(Math.random()-.5)*t;const i=new we;i.setAttribute("position",new Ze(n,3));const r=new oo(i,new Hs({color:e,size:.2,transparent:!0,opacity:.7,blending:Ls,depthWrite:!1,sizeAttenuation:!0}));return r.name="spores",r}const Cv=1.6,Cr=1.72,Un=.42;class Lv{constructor(t){this.level=t,this.group.name="sparkle-meadow",this.originX=-1.35-(t.cols-1)*Cr/2,this.originZ=-.35-(t.rows-1)*Cr/2,this.group.add(yv()),this.group.add(Tv());for(let p=0;p<t.rows;p++)for(let b=0;b<t.cols;b++){const x=(p+b)%2===0?"#79d455":"#6cc94a",_=xl(Cv,x),L=this.cellToWorld(b,p);_.position.set(L.x,Un,L.z),this.group.add(_)}for(const p of t.blocked){const b=this.cellToWorld(p.col,p.row),x=qh(1.05);x.position.set(b.x,Un,b.z),this.group.add(x)}for(const p of t.items)if(p.kind==="strawberry"){const b=Sv(),x=this.cellToWorld(p.col,p.row);b.position.set(x.x,Un,x.z),this.group.add(b),this.itemNodes.set(p.id,b)}const e=this.level.goals[0];this.goalNode=Mv();const n=this.cellToWorld(e.col,e.row);this.goalNode.position.set(n.x,Un-.42,n.z),this.goalStar=this.goalNode.getObjectByName("goalStar")??null,this.group.add(this.goalNode);const i=[new I(5.2,0,-11),new I(4,0,-5.5),new I(4.6,0,-1),new I(3.8,0,3.5),new I(5,0,8.5)],r=wv(i,1.8);this.waterTex=r.texture,this.group.add(r.group);const o=bv(1.9,3.2);o.position.set(4.15,.02,3.6),o.rotation.y=.35,this.group.add(o);const a=Qo(1.5,"#3faf5a","#2f9247");a.position.set(-6.4,0,-2.2),this.group.add(a);const l=Qo(1);l.position.set(-5.4,0,2.4),this.group.add(l);const c=Qo(1.35,"#45b25e","#2f9247");c.position.set(6.6,0,-3.4),this.group.add(c);const h=Ka(3,.9);h.position.set(5.2,0,.8),this.group.add(h);const d=Ka(2,.6);d.position.set(2.2,0,6.2),this.group.add(d);const u=new It(new Pt(.85,1.05,.5,12),new Jt({color:"#9aa7bd"}));u.position.set(4.45,.25,-.6),u.castShadow=u.receiveShadow=!0,this.group.add(u);const f=[[-5.6,0,4.6,7],[-2.6,0,5.4,5],[.6,0,4.8,4],[-6.8,0,-4.6,5],[6.9,0,2.2,5],[1.8,0,-4.4,4]];for(const[p,b,x,_]of f){const L=jh(_,1.5);L.position.set(p,b,x),this.group.add(L)}const g=[[-7,6.4,-9,1.4],[3.5,7.2,-10,1.8],[8.5,6.1,-7,1.1],[-1.5,7.8,-12,1.5]];for(const[p,b,x,_]of g){const L=Zh(_);L.position.set(p,b,x),this.clouds.push(L),this.group.add(L)}this.sparkles=Kh(30,13),this.group.add(this.sparkles),this.petals=Ev(16,14),this.group.add(this.petals);const v=to("#5a5f8a",1.1);v.position.set(-6,6.2,-8),this.birds.push(v),this.group.add(v);const m=to("#8a5f7a",.85);m.position.set(3,7.4,-10),this.birds.push(m),this.group.add(m)}group=new nt;itemNodes=new Map;goalNode;clouds=[];waterTex=null;sparkles=null;goalStar=null;petals=null;birds=[];originX;originZ;cellToWorld(t,e){return new I(this.originX+t*Cr,Un,this.originZ+e*Cr)}mixyLookout(){return new I(4.45,.5,-.6)}update(t,e){this.waterTex&&(this.waterTex.offset.y=e*.12%1);for(let n=0;n<this.clouds.length;n++){const i=this.clouds[n];i.position.x+=t*(.08+n*.02),i.position.x>12&&(i.position.x=-12)}if(this.goalStar&&(this.goalStar.rotation.y=e*1.4,this.goalStar.position.y=.86+Math.sin(e*2.2)*.07),this.sparkles){const n=this.sparkles.material;n.opacity=.55+Math.sin(e*2.6)*.35}this.petals&&Av(this.petals,t,e),this.birds.forEach((n,i)=>{n.position.y+=Math.sin(e*1.2+i*2.4)*t*.25,Jh(n,t,e,.55+i*.25,i*1.9)})}}const Pv=1.6,qn=1.72,Lr=.42;function Fe(s,t,e=0,n=0,i=0,r=!0,o=!0){const a=new It(s,t);return a.position.set(e,n,i),a.castShadow=r,a.receiveShadow=o,a}function ta(s=1){const t=new nt,e=Fe(new Pt(.14*s,.22*s,2.2*s,7),z("#a06a3b"),0,1.1*s,0);e.rotation.z=.12,t.add(e);const n=new nt;n.position.set(.26*s,2.2*s,0);for(let i=0;i<6;i++){const r=i/6*Math.PI*2,o=Fe(new Dt(.62*s,8,6),z(i%2?"#3faf5a":"#4fc46a"));o.scale.set(1.35,.22,.5),o.position.set(Math.cos(r)*.62*s,.05,Math.sin(r)*.62*s),o.rotation.y=-r,o.rotation.z=-.28,n.add(o)}for(let i=0;i<3;i++)n.add(Fe(new Dt(.11*s,8,6),z("#8d5a2b"),(i-1)*.18*s,-.14*s,.08*i*s));return t.add(n),t}function Iv(){const s=new nt,t=z("#8d5a2b"),e=z("#6e421f"),n=z("#ffd23e");s.add(Fe(new gt(.95,.55,.62,3,.08),t,0,.28,0));const i=Fe(new Pt(.31,.31,.95,12,1,!1,0,Math.PI),e,0,.55,0);i.rotation.z=Math.PI/2,s.add(i);for(const r of[-.28,.28])s.add(Fe(new _e(.08,.62,.64),n,r,.32,0));return s.add(Fe(new gt(.16,.2,.1,2,.03),n,0,.42,.32)),s}function Dv(){const s=new nt,t=z("#f7b8d9"),e=Fe(new Dt(.26,12,8,0,Math.PI*2,Math.PI/2,Math.PI/2),t,0,.1,0);e.scale.set(1.15,.7,1);const n=Fe(new Dt(.26,12,8,0,Math.PI*2,0,Math.PI/2),t,0,.12,-.12);return n.scale.set(1.15,.7,1),n.rotation.x=-.9,s.add(e,n),s.add(Fe(new Dt(.15,14,12),new Jt({color:"#ffffff",gradientMap:null}),0,.2,.02)),s}function Uv(){const s=new nt,t=Fe(new gt(2.2,.7,1,3,.2),z("#b5773f"),0,.35,0);t.scale.set(1,1,1),s.add(t),s.add(Fe(new Pt(.05,.06,1.9,6),z("#8d5a2b"),0,1.4,0));const e=new zn;e.moveTo(0,0),e.lineTo(.85,.55),e.lineTo(0,1.3),e.closePath();const n=Fe(new ml(e),new Jt({color:"#fff6e3",side:ln}),.06,.9,0,!1,!1);s.add(n);const i=Fe(new _e(.28,.16,.02),z("#ff5fa2"),.15,2.3,0,!1,!1);return s.add(i),s}class Nv{constructor(t){this.level=t,this.group.name="bubble-bay",this.originX=-1.2-(t.cols-1)*qn/2,this.originZ=-.3-(t.rows-1)*qn/2,this.waterTex=Yh(),this.waterTex.repeat.set(5,4);const e=new Jt({map:this.waterTex}),n=new It(new gt(34,1.4,24,4,.55),e);n.position.y=-.78,n.receiveShadow=!0,this.group.add(n);for(let E=0;E<t.rows;E++)for(let P=0;P<t.cols;P++){const M=(E+P)%2===0?"#f7e3a1":"#f2d98c",y=xl(Pv,M),D=this.cellToWorld(P,E);y.position.set(D.x,Lr,D.z),this.group.add(y)}const i=this.cellToWorld(0,t.rows-1).z+qn*.72,r=t.cols+2;for(let E=0;E<r;E++){const P=this.originX-qn*.75+E*(qn*(t.cols+.4)/r);this.group.add(Fe(new gt(qn*.82,.18,.9,2,.05),z("#b5773f"),P,.16,i)),this.group.add(Fe(new Pt(.07,.07,.7,6),z("#8d5a2b"),P,-.1,i+.38))}for(const E of t.items)if(E.kind==="pearl"){const P=Dv(),M=this.cellToWorld(E.col,E.row);P.position.set(M.x,Lr,M.z),this.group.add(P),this.itemNodes.set(E.id,P)}const o=this.level.goals[0];this.goalNode=Iv();const a=this.cellToWorld(o.col,o.row);this.goalNode.position.set(a.x,Lr,a.z),this.group.add(this.goalNode);const l=ta(1.15);l.position.set(-5.6,0,-1.6),this.group.add(l);const c=ta(.85);c.position.set(-4.6,0,2.6),c.rotation.y=1.2,this.group.add(c);const h=ta(1);h.position.set(6,0,-2.4),h.rotation.y=-.6,this.group.add(h),this.boat=Uv(),this.boat.position.set(4.25,-.05,2.55),this.boat.rotation.y=-.5,this.group.add(this.boat);const d=Ka(3,1);d.position.set(-4.9,0,4.2),this.group.add(d);const u=jh(4,1.2);u.position.set(4.4,0,-4.2),this.group.add(u);const f=[[-10,-.5,-11,5.5,"#7ed0b8"],[9.5,-.6,-12,6.5,"#8fdcae"],[0,-1,-14,8,"#a7e6c3"]];for(const[E,P,M,y,D]of f){const O=Fe(new Dt(y,18,12),z(D),E,P,M,!1,!0);O.scale.y=.32,this.group.add(O)}const g=[[-7,6.6,-9,1.3],[4.5,7.4,-10,1.7],[9,6.2,-7,1]];for(const[E,P,M,y]of g){const D=Zh(y);D.position.set(E,P,M),this.clouds.push(D),this.group.add(D)}const v=40,m=new Float32Array(v*3);this.bubbleSpeeds=new Float32Array(v);for(let E=0;E<v;E++)m[E*3]=(Math.random()-.5)*22,m[E*3+1]=Math.random()*.4,m[E*3+2]=(Math.random()-.5)*16,this.bubbleSpeeds[E]=.25+Math.random()*.5;const p=new we;p.setAttribute("position",new Ze(m,3));const b=new Hs({color:"#dff6ff",size:.16,transparent:!0,opacity:.85,depthWrite:!1,sizeAttenuation:!0});this.bubbles=new oo(p,b),this.group.add(this.bubbles);const x=to("#f4f7fb",1.35);x.position.set(-8,6.8,-7),this.gulls.push(x),this.group.add(x);const _=to("#e8edf6",1);_.position.set(2,7.8,-9),this.gulls.push(_),this.group.add(_);const L=Hc("#ff8f5f",1);L.userData={cx:-3.4,cz:4.9,r:1.1,speed:.9,phase:0},this.fish.push(L),this.group.add(L);const R=Hc("#5fc9ff",.8);R.userData={cx:3.2,cz:5.4,r:.85,speed:-1.2,phase:2.1},this.fish.push(R),this.group.add(R)}group=new nt;itemNodes=new Map;goalNode;waterTex;bubbles;bubbleSpeeds;boat;clouds=[];gulls=[];fish=[];originX;originZ;cellToWorld(t,e){return new I(this.originX+t*qn,Lr,this.originZ+e*qn)}mixyLookout(){return new I(4.25,.72,2.55)}update(t,e){this.waterTex.offset.x=e*.02%1,this.waterTex.offset.y=e*.03%1,this.boat.position.y=-.05+Math.sin(e*1.1)*.07,this.boat.rotation.z=Math.sin(e*.9)*.03;for(let i=0;i<this.clouds.length;i++){const r=this.clouds[i];r.position.x+=t*(.07+i*.02),r.position.x>13&&(r.position.x=-13)}const n=this.bubbles.geometry.getAttribute("position");for(let i=0;i<n.count;i++){let r=n.getY(i)+this.bubbleSpeeds[i]*t;r>2.6&&(r=0),n.setY(i,r)}n.needsUpdate=!0,this.gulls.forEach((i,r)=>{i.position.y+=Math.sin(e*.9+r*2.8)*t*.3,Jh(i,t,e,.9+r*.35,r*1.4,14)});for(const i of this.fish){const r=i.userData,o=e*r.speed+r.phase;i.position.set(r.cx+Math.cos(o)*r.r,-.05+Math.sin(e*2+r.phase)*.03,r.cz+Math.sin(o)*r.r),i.rotation.y=Math.atan2(-Math.cos(o)*r.speed,-Math.sin(o)*r.speed);const a=i.getObjectByName("tail");a&&(a.rotation.y=Math.sin(e*8+r.phase)*.45)}}}const kv=1.6,Pr=1.72,ys=.42;function en(s,t="#000000",e=0){return new Jt({color:s,emissive:t,emissiveIntensity:e})}function nn(s,t,e=!0,n=!0){const i=new It(s,t);return i.castShadow=e,i.receiveShadow=n,i}function Fv(){const s=new nt,t=nn(new Pt(.035,.05,.5,6),en("#3f9e4d"));t.position.y=.25,s.add(t);const e=nn(new Dt(.09,6,4),en("#4cc25e"));e.scale.set(1.6,.35,.8),e.position.set(.09,.18,0),e.rotation.z=-.5,s.add(e);const n=new nt;for(let r=0;r<5;r++){const o=r/5*Math.PI*2,a=nn(new Dt(.105,8,6),en("#ff8fc7","#ff5fa2",.35));a.scale.set(1,.45,1),a.position.set(Math.cos(o)*.14,0,Math.sin(o)*.14),n.add(a)}n.position.y=.52,s.add(n);const i=nn(new Dt(.085,8,6),en("#ffe066","#ffd23e",.8));return i.position.y=.55,s.add(i),s}function yl(s=1,t="#b47dff",e="#8a4fff"){const n=new nt,i=nn(new Pt(.11,.15,.3,8),en("#efe6f7"));i.position.y=.15,n.add(i);const r=nn(new Dt(.26,12,8,0,Math.PI*2,0,Math.PI/2),en(t,e,.45));r.position.y=.28,n.add(r);for(let o=0;o<4;o++){const a=o/4*Math.PI*2+.4,l=nn(new Dt(.035,6,4),en("#f7effc","#ffffff",.5),!1,!1);l.position.set(Math.cos(a)*.15,.4,Math.sin(a)*.15),n.add(l)}return n.scale.setScalar(s),n}function Ov(){const s=new nt,t=nn(new Pt(.62,.68,.1,24),en("#274a5e","#3ec6d8",.35));t.position.y=.05,s.add(t);const e=nn(new Le(.5,.035,8,32),en("#7ff3ff","#54e6ff",1.2),!1,!1);e.rotation.x=-Math.PI/2,e.position.y=.11,e.name="ringGlow",s.add(e);for(let i=0;i<6;i++){const r=i/6*Math.PI*2,o=yl(.42,"#5fc9ff","#3ec6d8");o.position.set(Math.cos(r)*.5,.1,Math.sin(r)*.5),s.add(o)}const n=nn(new ii(.16),en("#fff7ad","#ffd23e",1.4),!1,!1);return n.position.y=.75,n.name="goalStar",s.add(n),s}function Wc(s,t){const e=new nt,n=nn(new Pt(.35,.55,2.2,10),en("#cfc4e8"));n.position.y=1.1,e.add(n);const i=nn(new Dt(1.35,16,10,0,Math.PI*2,0,Math.PI/2.2),en(t,t,.25));return i.position.y=2.1,i.scale.set(1.25,.85,1.25),i.name="gmCap",e.add(i),e.scale.setScalar(s),e}class Bv{group=new nt;itemNodes=new Map;fireflies;fireflyBase;glowStars=[];spores=null;sporeSpeeds=new Float32Array(0);giantCaps=[];originX;originZ;constructor(t){this.group.name="pattern-forest",this.originX=-((t.cols-1)*Pr)/2,this.originZ=-((t.rows-1)*Pr)/2;const e=nn(new Pt(16,18,.6,40),en("#1d3b4a"),!1,!0);e.position.y=-.3,e.scale.z=.75,this.group.add(e);for(let l=0;l<t.rows;l++)for(let c=0;c<t.cols;c++){const h=(l+c)%2===0,d=xl(kv,h?"#3f7d5c":"#37714f");d.traverse(f=>{if(f instanceof It){const g=f.material;g.emissive=new Zt(h?"#123b2a":"#0e3222"),g.emissiveIntensity=.5}});const u=this.cellToWorld(c,l);d.position.set(u.x,ys,u.z),this.group.add(d)}for(const l of t.blocked){const c=this.cellToWorld(l.col,l.row),h=qh(1.05);h.position.set(c.x,ys,c.z),this.group.add(h)}for(const l of t.items){const c=l.kind==="flower"?Fv():yl(1),h=this.cellToWorld(l.col,l.row);c.position.set(h.x,ys,h.z),this.group.add(c),this.itemNodes.set(l.id,c)}for(const l of t.goals){const c=Ov(),h=this.cellToWorld(l.col,l.row);c.position.set(h.x,ys,h.z);const d=c.getObjectByName("goalStar");d&&this.glowStars.push(d),this.group.add(c)}const n=[[-6.2,-2.6,1.25,"#7d4fd4"],[6.4,-3.2,1.5,"#4f8fd4"],[-5.6,3.4,.95,"#d44f9e"],[6,3.6,1.1,"#7d4fd4"]];for(const[l,c,h,d]of n){const u=Wc(h,d);u.position.set(l,0,c);const f=u.getObjectByName("gmCap");f&&this.giantCaps.push(f),this.group.add(u)}const i=Wc(.55,"#d44f9e");i.position.set(4.55,0,-1.4),this.group.add(i);const r=70;this.fireflyBase=new Float32Array(r*3);const o=new Float32Array(r*3);for(let l=0;l<r;l++)this.fireflyBase[l*3]=(Math.random()-.5)*15,this.fireflyBase[l*3+1]=.6+Math.random()*2.6,this.fireflyBase[l*3+2]=(Math.random()-.5)*10;o.set(this.fireflyBase);const a=new we;a.setAttribute("position",new Ze(o,3)),this.fireflies=new oo(a,new Hs({color:"#d6ff7a",size:.14,transparent:!0,opacity:.95,blending:Ls,depthWrite:!1})),this.group.add(this.fireflies),this.group.add(Kh(24,12)),this.spores=Rv(26,14),this.sporeSpeeds=new Float32Array(26);for(let l=0;l<26;l++)this.sporeSpeeds[l]=.12+Math.random()*.22;this.group.add(this.spores)}cellToWorld(t,e){return new I(this.originX+t*Pr,ys,this.originZ+e*Pr)}mixyLookout(){return new I(4.55,1.15,-1.4)}update(t,e){const n=this.fireflies.geometry.getAttribute("position");for(let i=0;i<n.count;i++){const r=this.fireflyBase[i*3],o=this.fireflyBase[i*3+1],a=this.fireflyBase[i*3+2];n.setXYZ(i,r+Math.sin(e*.5+i*1.7)*.5,o+Math.sin(e*.9+i*2.3)*.3,a+Math.cos(e*.4+i)*.5)}n.needsUpdate=!0,this.fireflies.material.opacity=.6+Math.sin(e*2.2)*.3;for(const i of this.glowStars)i.rotation.y+=t*1.6,i.position.y=.75+Math.sin(e*2)*.06;if(this.spores){const i=this.spores.geometry.getAttribute("position");for(let r=0;r<i.count;r++){let o=i.getY(r)+this.sporeSpeeds[r]*t;o>3.8&&(o=.25),i.setY(r,o),i.setX(r,i.getX(r)+Math.sin(e*.8+r)*t*.12)}i.needsUpdate=!0,this.spores.material.opacity=.5+Math.sin(e*1.6)*.25}this.giantCaps.forEach((i,r)=>{const o=1+Math.sin(e*.8+r*1.6)*.035;i.scale.set(1.25*o,.85/o,1.25*o)})}}const Ja=1.6,bs=1.72,Pn=.42;function Te(s,t="#000000",e=0){return new Jt({color:s,emissive:t,emissiveIntensity:e})}function Ee(s,t,e=!0,n=!0){const i=new It(s,t);return i.castShadow=e,i.receiveShadow=n,i}function zv(){const s=new nt,t=Ee(new Pt(.16,.16,.42,12),Te("#58d68d","#2ecc71",.25));t.position.y=.26,s.add(t);const e=Ee(new Pt(.165,.165,.1,12),Te("#eafaf1","#b8ffd9",.5),!1,!1);e.position.y=.3,s.add(e);const n=Ee(new Pt(.06,.06,.08,8),Te("#b8c4d6"));n.position.y=.51,s.add(n);const i=Ee(new ii(.09),Te("#fff7ad","#ffd23e",1.2),!1,!1);return i.position.y=.68,i.name="battBolt",s.add(i),s}function Gv(){const s=new nt,t=Ee(new Pt(.62,.7,.12,24),Te("#3d4b63"));t.position.y=.06,s.add(t);const e=Ee(new Le(.46,.045,8,32),Te("#ffd23e","#ffb700",1),!1,!1);e.rotation.x=-Math.PI/2,e.position.y=.13,s.add(e);const n=Ee(new ii(.18),Te("#fff7ad","#ffd23e",1.4),!1,!1);return n.position.y=.7,n.name="goalStar",s.add(n),s}function Hv(s){const t=new nt,e=Ee(new _e(Ja,as,Ja),Te(s));e.position.y=-as/2,t.add(e);for(const[n,i]of[[-.6,-.6],[.6,-.6],[-.6,.6],[.6,.6]]){const r=Ee(new Dt(.05,6,4),Te("#5b6b8c"),!1,!1);r.position.set(n,.02,i),t.add(r)}return t}function Vv(s,t){const e=new nt;e.add(Ee(new Le(s,s*.28,10,24),Te(t)));for(let i=0;i<8;i++){const r=i/8*Math.PI*2,o=Ee(new _e(s*.32,s*.34,s*.3),Te(t));o.position.set(Math.cos(r)*s*1.18,Math.sin(r)*s*1.18,0),o.rotation.z=r,e.add(o)}const n=Ee(new Pt(s*.3,s*.3,.24,12),Te("#ffd23e","#ffb700",.4));return n.rotation.x=Math.PI/2,e.add(n),e}function Wv(){const s=new nt,t=[[-9,3.2,2.2,-12,"#2b3a55"],[-5.5,4.6,2.6,-13,"#24344e"],[-1.5,3.4,2,-12.5,"#2b3a55"],[2.5,5.2,2.8,-13.5,"#24344e"],[6.5,3.8,2.4,-12.2,"#2b3a55"],[10,4.4,2.4,-13,"#24344e"]];for(const[e,n,i,r,o]of t){const a=Ee(new _e(i,n,i),Te(o),!1,!1);a.position.set(e,n/2-.4,r),s.add(a);for(let l=0;l<Math.floor(n);l++)for(let c=0;c<2;c++){if((l*3+c+Math.round(e))%3===0)continue;const h=Ee(new Mn(.28,.32),Te("#ffe9a3","#ffd23e",.9),!1,!1);h.position.set(e-i/4+c*(i/2.2),l*.9+.4,r+i/2+.01),s.add(h)}}return s}class Xv{group=new nt;itemNodes=new Map;gears=[];bolts=[];neon=[];drones=[];puffs=[];beaconMat=null;originX;originZ;constructor(t){this.group.name="robot-town",this.originX=-((t.cols-1)*bs)/2,this.originZ=-((t.rows-1)*bs)/2;const e=Ee(new Pt(16,18,.6,40),Te("#232f47"),!1,!0);e.position.y=-.3,e.scale.z=.75,this.group.add(e),this.group.add(Wv());for(let h=0;h<t.rows;h++)for(let d=0;d<t.cols;d++){const u=(h+d)%2===0?"#8fa3c8":"#8298bd",f=Hv(u),g=this.cellToWorld(d,h);f.position.set(g.x,Pn,g.z),this.group.add(f)}for(let h=0;h<t.rows;h++){const d=Te("#54e6ff","#54e6ff",1.1),u=Ee(new _e(t.cols*bs+.6,.03,.09),d,!1,!1),f=this.cellToWorld((t.cols-1)/2,h);u.position.set(f.x,Pn+.02,f.z+Ja/2+.12),this.neon.push(d),this.group.add(u)}for(const h of t.blocked){const d=this.cellToWorld(h.col,h.row),u=new nt;u.add(Ee(new Pt(.42,.5,.9,14),Te("#5b6b8c")));const f=Ee(new Le(.42,.07,8,18),Te("#ff8f5f","#ff6b35",.4));f.rotation.x=Math.PI/2,f.position.y=.45,u.add(f),u.position.set(d.x,Pn+.45,d.z),this.group.add(u);for(let g=0;g<2;g++){const v=new It(new Dt(.16,8,6),new Jt({color:"#dfe9ff",transparent:!0,opacity:0}));v.castShadow=v.receiveShadow=!1,v.userData={ox:d.x,oy:Pn+.95,oz:d.z,t:g*.5,speed:.32+Math.random()*.14},this.puffs.push(v),this.group.add(v)}}for(const h of t.zipBlocked??[]){const d=this.cellToWorld(h.col,h.row),u=new It(new Dt(.72,18,12,0,Math.PI*2,0,Math.PI/2),new Jt({color:"#bfeaff",transparent:!0,opacity:.32,emissive:"#54c6ff",emissiveIntensity:.25}));u.position.set(d.x,Pn,d.z),this.group.add(u);const f=Ee(new Le(.72,.05,8,28),Te("#9fd8ff","#54c6ff",.8),!1,!1);f.rotation.x=-Math.PI/2,f.position.set(d.x,Pn+.02,d.z),this.group.add(f)}for(const h of t.items)if(h.kind==="battery"){const d=zv(),u=this.cellToWorld(h.col,h.row);d.position.set(u.x,Pn,u.z);const f=d.getObjectByName("battBolt");f&&this.bolts.push(f),this.group.add(d),this.itemNodes.set(h.id,d)}for(const h of t.goals){const d=Gv(),u=this.cellToWorld(h.col,h.row);d.position.set(u.x,Pn,u.z);const f=d.getObjectByName("goalStar");f&&this.bolts.push(f),this.group.add(d)}const n=[[-6.8,2.6,-5.5,1.1,"#3d5a80"],[7.2,3.4,-6,1.4,"#5b6b8c"],[-7.6,1.4,2.5,.7,"#4a6fa5"]];for(const[h,d,u,f,g]of n){const v=Vv(f,g);v.position.set(h,d,u),this.gears.push(v),this.group.add(v)}const i=Ee(new _e(1.4,1.1,1.4),Te("#3d4b63"));i.position.set(4.9,.55,-1.8),this.group.add(i);const r=Ee(new Pt(.03,.03,.9,6),Te("#9fb4d8"));r.position.set(4.9,1.55,-1.8),this.group.add(r);const o=Te("#ff5fa2","#ff5fa2",1.2),a=Ee(new Dt(.09,8,6),o,!1,!1);a.position.set(4.9,2,-1.8),this.beaconMat=o,this.group.add(a);const l=Vc(1);l.userData={cx:0,cz:0,r:5.6,h:3.4,speed:.42,phase:0},this.drones.push(l),this.group.add(l);const c=Vc(.75);c.userData={cx:.8,cz:-.4,r:4.2,h:2.6,speed:-.55,phase:2.4},this.drones.push(c),this.group.add(c)}cellToWorld(t,e){return new I(this.originX+t*bs,Pn,this.originZ+e*bs)}mixyLookout(){return new I(4.9,1.15,-1.8)}update(t,e){for(let i=0;i<this.gears.length;i++)this.gears[i].rotation.z+=t*(i%2===0?.5:-.35);for(const i of this.bolts)i.rotation.y+=t*1.8;const n=.75+Math.sin(e*2.4)*.35;for(const i of this.neon)i.emissiveIntensity=n;for(const i of this.drones){const r=i.userData,o=e*r.speed+r.phase;i.position.set(r.cx+Math.cos(o)*r.r,r.h+Math.sin(e*1.5+r.phase)*.16,r.cz+Math.sin(o)*r.r),i.rotation.y=Math.atan2(-Math.cos(o)*r.speed,-Math.sin(o)*r.speed);const a=i.getObjectByName("rotor");a&&(a.rotation.z+=t*18)}for(const i of this.puffs){const r=i.userData;r.t=(r.t+t*r.speed)%1,i.position.set(r.ox+Math.sin(r.t*Math.PI*2)*.08,r.oy+r.t*1.1,r.oz),i.scale.setScalar(.5+r.t*1.4),i.material.opacity=r.t<.15?r.t/.15*.5:.5*(1-r.t)}this.beaconMat&&(this.beaconMat.emissiveIntensity=.7+(Math.sin(e*3.4)>0?.9:.1))}}const Xc=1.6,Ir=1.72,ws=.42;function ue(s,t="#000000",e=0){return new Jt({color:s,emissive:t,emissiveIntensity:e})}function fe(s,t,e=!0,n=!0){const i=new It(s,t);return i.castShadow=e,i.receiveShadow=n,i}function $v(){const s=new nt,t=fe(new $e(.12,.22,4),ue("#ff5f6b"),!1,!1);t.rotation.z=Math.PI,t.position.y=.1,s.add(t);const e=fe(new Pt(.17,.17,.06,20),ue("#ffd23e","#ffb700",.35));e.rotation.x=Math.PI/2,e.position.y=.34,s.add(e);const n=fe(new ii(.09),ue("#fff7ad","#ffd23e",.9),!1,!1);return n.position.set(0,.34,.05),s.add(n),s}function Yv(){const s=new nt,t=fe(new Pt(.6,.68,.22,24),ue("#4a5fc9"));t.position.y=.11,s.add(t);const e=fe(new Le(.6,.035,8,32),ue("#ffd23e","#ffb700",.7),!1,!1);e.rotation.x=-Math.PI/2,e.position.y=.23,s.add(e);const n=fe(new Dt(.2,14,10,0,Math.PI*2,0,Math.PI/1.8),ue("#ffd23e","#ffb700",.45));n.scale.set(1,.9,1),n.rotation.x=Math.PI,n.position.y=.62,s.add(n);const i=fe(new Pt(.05,.08,.16,8),ue("#ffb700","#ff9f1c",.3));i.position.y=.5,s.add(i);const r=fe(new Pt(.14,.16,.06,12),ue("#b7791f"));r.position.y=.26,s.add(r);for(const a of[-1,1]){const l=fe(new Le(.1,.025,6,14,Math.PI),ue("#ffd23e","#ffb700",.3),!1,!1);l.position.set(a*.2,.66,0),l.rotation.z=a*Math.PI/2,s.add(l)}const o=fe(new ii(.13),ue("#fff7ad","#ffd23e",1.5),!1,!1);return o.position.y=1.05,o.name="goalStar",s.add(o),s}function qv(){const s=new nt,t=fe(new _e(11,3.6,1),ue("#f2e3c6"),!1,!1);t.position.set(0,1.8,-8.6),s.add(t);const e=fe(new $e(6.6,1.6,4),ue("#e2725b"),!1,!1);e.rotation.y=Math.PI/4,e.scale.z=.28,e.position.set(0,4.4,-8.6),s.add(e);for(let o=-2;o<=2;o++){const a=fe(new Pt(.28,.32,3.4,12),ue("#fbf3e0"),!1,!1);a.position.set(o*2.1,1.7,-8),s.add(a)}const n=fe(new _e(1.6,2.2,.2),ue("#7a4f2b"),!1,!1);n.position.set(0,1.1,-7.95),s.add(n);const i=fe(new _e(3.4,.7,.08),ue("#4a5fc9","#2f3fa0",.25),!1,!1);i.position.set(0,3.1,-7.9),s.add(i);const r=fe(new ii(.26),ue("#ffd23e","#ffb700",.8),!1,!1);return r.position.set(0,3.1,-7.8),s.add(r),s}function jv(s,t,e){const n=new nt,i=new we().setFromPoints([new I(-e/2,s+.3,t),new I(e/2,s+.3,t)]);n.add(new Yu(i,new Ch({color:"#8a5a2b"})));const r=["#ff5f6b","#ffd23e","#4a5fc9","#3ec6d8","#ff8fb0"];for(let o=0;o<9;o++){const a=fe(new $e(.16,.34,4),ue(r[o%r.length]),!1,!1);a.rotation.z=Math.PI,a.position.set(-e/2+(o+.5)*(e/9),s+.12,t),a.name="bunt",n.add(a)}return n}function Zv(){const s=new nt,t=fe(new $e(.34,.8,14),ue("#ff8f3d"));t.position.y=.4,s.add(t);const e=fe(new Pt(.2,.24,.12,14),ue("#fff3e0"),!1,!1);e.position.y=.42,s.add(e);const n=fe(new _e(.66,.08,.66),ue("#e2722b"));return n.position.y=.04,s.add(n),s}class Kv{group=new nt;itemNodes=new Map;goalStars=[];buntFlags=[];birds=new nt;flags=[];originX;originZ;constructor(t){this.group.name="agent-academy",this.originX=-((t.cols-1)*Ir)/2,this.originZ=-((t.rows-1)*Ir)/2;const e=fe(new Pt(16,18,.6,40),ue("#7cc25e"),!1,!0);e.position.y=-.3,e.scale.z=.75,this.group.add(e);const n=fe(new Jr(6.9,8.6,40),ue("#e2725b"),!1,!0);n.rotation.x=-Math.PI/2,n.position.y=.02,n.scale.y=.75,this.group.add(n),this.group.add(qv());const i=jv(3,-5.2,12);i.traverse(o=>{o.name==="bunt"&&this.buntFlags.push(o)}),this.group.add(i);for(let o=0;o<t.rows;o++)for(let a=0;a<t.cols;a++){const l=(o+a)%2===0,c=new nt,h=fe(new _e(Xc,as,Xc),ue(l?"#f2e3c6":"#ecd9b6"));h.position.y=-as/2,c.add(h);const d=fe(new Jr(.42,.5,24),ue("#ffffff","#ffffff",.15),!1,!1);d.rotation.x=-Math.PI/2,d.position.y=.012,c.add(d);const u=this.cellToWorld(a,o);c.position.set(u.x,ws,u.z),this.group.add(c)}for(const o of t.blocked){const a=this.cellToWorld(o.col,o.row),l=Zv();l.position.set(a.x,ws,a.z),this.group.add(l)}for(const o of t.items){const a=o.kind==="badge"?$v():yl(1),l=this.cellToWorld(o.col,o.row);a.position.set(l.x,ws,l.z),this.group.add(a),this.itemNodes.set(o.id,a)}for(const o of t.goals){const a=Yv(),l=this.cellToWorld(o.col,o.row);a.position.set(l.x,ws,l.z);const c=a.getObjectByName("goalStar");c&&this.goalStars.push(c),this.group.add(a)}for(const[o,a]of[[-6.4,-2.8],[6.4,-2.8],[-6.4,3.2],[6.4,3.2]]){const l=fe(new Pt(.04,.04,1.7,6),ue("#8a5a2b"),!1,!1);l.position.set(o,.85,a),this.group.add(l);const c=fe(new Mn(.55,.34),ue("#4a5fc9","#2f3fa0",.2),!1,!1);c.position.set(o+.28,1.5,a),c.name="cornerFlag",this.flags.push(c),this.group.add(c)}const r=fe(new _e(2.2,.5,1),ue("#e8d5ae"),!1,!1);r.position.set(5.2,.25,-5.6),this.group.add(r);for(let o=0;o<2;o++){const a=new nt,l=fe(new $e(.09,.3,6),ue("#4a4a68"),!1,!1);l.rotation.x=Math.PI/2,a.add(l);for(const c of[-1,1]){const h=fe(new Mn(.42,.16),ue("#4a4a68"),!1,!1);h.position.x=c*.22,h.name=c<0?"wl":"wr",a.add(h)}a.position.set(o*4-2,5.5+o,-9.5),this.birds.add(a)}this.group.add(this.birds)}cellToWorld(t,e){return new I(this.originX+t*Ir,ws,this.originZ+e*Ir)}mixyLookout(){return new I(5.2,.55,-5.6)}update(t,e){for(const n of this.goalStars)n.rotation.y+=t*1.8,n.position.y=1.05+Math.sin(e*2.2)*.07;this.buntFlags.forEach((n,i)=>{n.rotation.y=Math.sin(e*1.8+i*.7)*.35}),this.flags.forEach((n,i)=>{n.rotation.y=Math.sin(e*2.2+i*1.3)*.3}),this.birds.children.forEach((n,i)=>{n.position.x+=t*(.8+i*.3),n.position.x>10&&(n.position.x=-10);const r=n.getObjectByName("wl"),o=n.getObjectByName("wr"),a=Math.sin(e*6+i)*.5;r&&(r.rotation.y=a),o&&(o.rotation.y=-a)})}}const Jv={linear:s=>s,out:s=>1-Math.pow(1-s,3),inOut:s=>s<.5?4*s*s*s:1-Math.pow(-2*s+2,3)/2,bounce:s=>s<1/2.75?7.5625*s*s:s<2/2.75?7.5625*(s-=1.5/2.75)*s+.75:s<2.5/2.75?7.5625*(s-=2.25/2.75)*s+.9375:7.5625*(s-=2.625/2.75)*s+.984375,back:s=>1+(1.70158+1)*Math.pow(s-1,3)+1.70158*Math.pow(s-1,2)};class Qv{active=[];tween(t,e,n="inOut"){return new Promise(i=>{this.active.push({duration:t,elapsed:0,ease:Jv[n],update:e,resolve:i})})}update(t){for(let e=this.active.length-1;e>=0;e--){const n=this.active[e];n.elapsed+=t;const i=Math.min(1,n.elapsed/n.duration);n.update(n.ease(i)),i>=1&&(this.active.splice(e,1),n.resolve())}}clear(){for(const t of this.active)t.resolve();this.active.length=0}}function In(s){return new Promise(t=>setTimeout(t,s*1e3))}const $c=new Map;function Qh(s){let t=$c.get(s);return t||(t=fetch(s).then(e=>{if(!e.ok)throw new Error(`[CodeBops] Failed to load ${s}`);return e.text()}),$c.set(s,t)),t}async function Fs(s,t){const e=await Qh(t);return s.innerHTML=e,s.querySelector("svg")}function eo(s){let t=!0;const e=()=>{t&&(s.classList.add("blink"),window.setTimeout(()=>s.classList.remove("blink"),150),window.setTimeout(e,1800+Math.random()*2600))},n=()=>{if(!t)return;s.classList.remove("look-left","look-right","look-up");const i=["look-left","look-right","look-up",""],r=i[Math.floor(Math.random()*i.length)];r&&s.classList.add(r),window.setTimeout(n,3200+Math.random()*3600)};return window.setTimeout(e,900+Math.random()*1200),window.setTimeout(n,2200),()=>{t=!1}}const t_=new I(0,1,0),e_=new I,n_=new I;class _n{constructor(t,e,n,i){this.opts=t,this.camera=n,this.viewport=i,this.root.name=t.name,this.shadow=new It(new Mn(1.25,1.25),new Ds({map:xv(),transparent:!0,depthWrite:!1})),this.shadow.rotation.x=-Math.PI/2,this.shadow.renderOrder=1,this.carryAnchor.position.set(-.4,t.height*.55,.12),this.root.add(this.carryAnchor),this.el=document.createElement("div"),this.el.className=`char-sprite ${t.mixy?"mixy-sprite":"zip-sprite"}${t.extraClass?` ${t.extraClass}`:""}`,this.el.setAttribute("aria-hidden","true"),e.appendChild(this.el),this.ready=Fs(this.el,t.svgUrl).then(r=>{this.svg=r})}root=new nt;carryAnchor=new Ce;tweener=new Qv;el;shadow;svg=null;bobPhase=Math.random()*Math.PI*2;calm=!1;blinkClock=1.2+Math.random()*2.2;lookClock=5+Math.random()*4;ready;whenReady(){return this.ready}addToScene(t){t.add(this.root),t.add(this.shadow)}setCalm(t){this.calm=t,this.el.classList.toggle("calm",t)}placeAt(t){this.root.position.copy(t),this.syncShadow()}syncShadow(){this.shadow.position.set(this.root.position.x,.44,this.root.position.z)}setMood(t){const e=this.svg;e&&(e.classList.toggle("excited",t==="excited"),e.classList.toggle("surprised",t==="surprised"),e.classList.toggle("thinking",t==="thinking"),e.classList.toggle("mouth-smile-on",t==="happy"),this.el.classList.toggle("mood-thinking",t==="thinking"),this.el.classList.toggle("mood-happy",t==="happy"))}look(t){const e=this.svg;e&&(e.classList.toggle("look-left",t==="left"),e.classList.toggle("look-right",t==="right"),e.classList.toggle("look-up",t==="up"))}wave(t=3){!this.svg||this.calm||(this.el.classList.remove("waving"),this.el.offsetWidth,this.el.style.setProperty("--wave-count",String(t)),this.el.classList.add("waving"),window.setTimeout(()=>this.el.classList.remove("waving"),t*560+100))}async hopTo(t,e=.34){const n=this.root.position.clone(),i=this.calm?.06:.4;this.el.classList.add("hop"),await this.tweener.tween(e,r=>{this.root.position.lerpVectors(n,t,r),this.root.position.y=gu.lerp(n.y,t.y,r)+Math.sin(r*Math.PI)*i,this.syncShadow()},"inOut"),this.el.classList.remove("hop")}async bumpShake(){this.flashMood("surprised",900),this.el.classList.add("bump"),await new Promise(t=>setTimeout(t,320)),this.el.classList.remove("bump")}async turnWiggle(){this.calm||(this.el.classList.add("turn"),await new Promise(t=>setTimeout(t,300)),this.el.classList.remove("turn"))}async celebrate(){this.setMood("excited"),this.wave(3),this.el.classList.add("celebrate"),await new Promise(t=>setTimeout(t,this.calm?400:1600)),this.el.classList.remove("celebrate")}async glitchWobble(t=.8){this.el.classList.add("glitching"),await new Promise(e=>setTimeout(e,t*1e3)),this.el.classList.remove("glitching")}moodTimer=0;flashMood(t,e){this.setMood(t),window.clearTimeout(this.moodTimer),this.moodTimer=window.setTimeout(()=>this.setMood("idle"),e)}blink(){const t=this.svg;!t||this.calm||(t.classList.add("blink"),window.setTimeout(()=>t.classList.remove("blink"),150))}update(t,e){if(this.tweener.update(t),this.blinkClock-=t,this.blinkClock<=0&&(this.blink(),this.blinkClock=2.2+Math.random()*2.6),this.lookClock-=t,this.lookClock<=0){const f=["left","right",null,"up"];this.look(f[Math.floor(Math.random()*f.length)]),this.lookClock=4+Math.random()*5}if(!this.svg)return;const n=this.viewport.clientWidth,i=this.viewport.clientHeight;if(n===0||i===0)return;const r=e_.copy(this.root.position).project(this.camera),o=n_.copy(this.root.position).add(t_).project(this.camera);if(r.z>1){this.el.style.visibility="hidden";return}this.el.style.visibility="visible";const a=(r.x*.5+.5)*n,l=(-r.y*.5+.5)*i,c=(-o.y*.5+.5)*i,d=Math.max(1,Math.abs(l-c))*this.opts.height;this.el.style.height=`${d.toFixed(1)}px`;const u=this.calm?0:Math.sin(e*2.4+this.bobPhase)*d*.022;this.el.style.transform=`translate(${a.toFixed(1)}px, ${(l+u).toFixed(1)}px) translate(-50%, -100%)`}dispose(){this.tweener.clear(),window.clearTimeout(this.moodTimer),this.el.remove(),this.shadow.geometry.dispose(),this.shadow.material.dispose(),this.root.removeFromParent(),this.shadow.removeFromParent()}}const no=["N","E","S","W"];function i_(s){switch(s){case"N":return{dc:0,dr:-1};case"E":return{dc:1,dr:0};case"S":return{dc:0,dr:1};case"W":return{dc:-1,dr:0}}}function s_(s){const t=no.indexOf(s);return no[(t+3)%4]}function r_(s){const t=no.indexOf(s);return no[(t+1)%4]}function qe(s){return`${s.col},${s.row}`}function Hr(s,t){return s.col===t.col&&s.row===t.row}function pi(s,t,e){return s.col>=0&&s.col<t&&s.row>=0&&s.row<e}const Dr=80,o_=12,a_={ifFlower:"flower",ifMushroom:"mushroom"};function l_(s){const t={};for(const n of s.items)t[n.id]={col:n.col,row:n.row};const e=[{...s.start}];return s.botStart&&e.push({...s.botStart}),{cols:s.cols,rows:s.rows,blocked:new Set(s.blocked.map(qe)),zipBlocked:new Set((s.zipBlocked??[]).map(qe)),actors:e,active:0,items:t,goals:s.goals}}function c_(s,t,e=!1){return s.goals.every(i=>{let r=!1;for(const[o,a]of Object.entries(s.items)){if(typeof a!="object")continue;const l="delivered"in a?a.delivered:a;if(Hr(l,i)&&(t(o)===i.accepts&&"delivered"in a&&(r=!0),t(o)!==i.accepts))return!1}return r})?e?Object.entries(s.items).every(([i,r])=>s.goals.some(a=>a.accepts===t(i))?typeof r=="object"&&"delivered"in r:!0):!0:!1}function td(s,t,e=null){const n=l_(s),i=[],r=[];let o=0,a=!1,l=!1;const c=b=>s.items.find(x=>x.id===b)?.kind??b,h=b=>n.goals.find(x=>x.col===b.col&&x.row===b.row),d=()=>r.push({actors:n.actors.map(b=>({...b}))}),u=b=>{const x=n.actors[n.active],{dc:_,dr:L}=i_(b),R={col:x.col+_,row:x.row+L},E={col:x.col,row:x.row},P=n.active===0&&n.zipBlocked.has(qe(R));return!pi(R,n.cols,n.rows)||n.blocked.has(qe(R))||P?{type:"bump",actor:n.active,at:R,dir:b}:(x.col=R.col,x.row=R.row,{type:"move",actor:n.active,from:E,to:R,dir:b})},f=(b,x,_)=>{if(o>=Dr)return null;o++;const L=a_[b];if(L){const E=n.actors[n.active],P=Object.entries(n.items).some(([M,y])=>typeof y=="object"&&!("delivered"in y)&&!("carriedBy"in y)&&Hr(y,E)&&c(M)===L);return i.push({type:"condition",index:x,kind:L,ok:P}),l=!P,d(),null}if(i.push({type:"commandStart",index:x,command:b,..._?{iter:_}:{}}),l)return l=!1,i.push({type:"condSkip",index:x,command:b}),d(),null;let R=null;switch(b){case"move":R=u(n.actors[n.active].dir);break;case"moveUp":R=u("N");break;case"moveDown":R=u("S");break;case"moveLeft":R=u("W");break;case"moveRight":R=u("E");break;case"turnLeft":case"turnRight":{const E=n.actors[n.active],P=b==="turnLeft"?s_(E.dir):r_(E.dir);R={type:"turn",actor:n.active,from:E.dir,to:P},E.dir=P;break}case"swap":{if(n.actors.length>1){const E=n.active;n.active=(n.active+1)%n.actors.length,R={type:"swap",from:E,to:n.active}}break}case"grab":{const E=n.actors[n.active],P={col:E.col,row:E.row},M=Object.entries(n.items).find(([,y])=>typeof y=="object"&&!("delivered"in y)&&!("carriedBy"in y)&&Hr(y,P));M?(n.items[M[0]]={carriedBy:n.active},R={type:"grab",actor:n.active,item:M[0],at:P}):R={type:"grabFail",actor:n.active,at:P};break}case"drop":{const E=n.actors[n.active],P={col:E.col,row:E.row},M=Object.entries(n.items).filter(([,y])=>typeof y=="object"&&"carriedBy"in y&&y.carriedBy===n.active);if(M.length===0)R={type:"dropFail",actor:n.active,at:P};else{for(const[y]of M){const D=h(P),O=!!D&&D.accepts===c(y);n.items[y]=O?{delivered:{...P}}:{...P},i.push({type:"drop",actor:n.active,item:y,at:P,onGoal:O})}R=null}break}}if(R&&i.push(R),R&&R.type==="move"&&e){const E=n.actors[n.active],P=Object.entries(n.items).find(([M,y])=>typeof y=="object"&&!("delivered"in y)&&!("carriedBy"in y)&&Hr(y,E)&&c(M)===e.trigger);P&&(i.push({type:"ruleFire",actor:n.active,trigger:e.trigger,action:e.action}),n.items[P[0]]={carriedBy:n.active},i.push({type:"grab",actor:n.active,item:P[0],at:{col:E.col,row:E.row}}))}return d(),R},g=b=>{const x=[];for(let _=b-1;_>=0;_--){const L=t[_];if(L.cmd==="repeat"||L.cmd==="repeatUntil")break;x.unshift({cmd:L.cmd,source:_})}return x},v=new Set;for(let b=0;b<t.length;b++){const x=t[b];if(x.cmd==="repeat"||x.cmd==="repeatUntil")for(const _ of g(b))v.add(_.source)}const m=b=>{for(const _ of b)if(_&&(_.type==="bump"||_.type==="grab"||_.type==="drop"&&_.onGoal))return!0;const x=n.actors[n.active];return n.goals.some(_=>_.col===x.col&&_.row===x.row)};for(let b=0;b<t.length&&!(o>=Dr);b++){if(v.has(b))continue;const x=t[b];if(x.cmd==="repeat"){const _=g(b);if(_.length===0){i.push({type:"loopFail",index:b,reason:"nothing"});continue}const L=Math.min(4,Math.max(2,x.arg??2));i.push({type:"loopStart",index:b,kind:"count",count:L});for(let R=1;R<=L&&o<Dr;R++){i.push({type:"loopIter",index:b,iter:R,count:L});for(const E of _)f(E.cmd,E.source,{k:R,n:L});l=!1}i.push({type:"loopEnd",index:b});continue}if(x.cmd==="repeatUntil"){const _=g(b);if(_.length===0){i.push({type:"loopFail",index:b,reason:"nothing"});continue}i.push({type:"loopStart",index:b,kind:"until"});let L=0;for(;;){if(L++,L>o_||o>=Dr){i.push({type:"loopOverflow",index:b}),a=!0;break}i.push({type:"loopIter",index:b,iter:L});const R=_.map(E=>f(E.cmd,E.source,{k:L,n:"∞"}));if(l=!1,m(R))break}i.push({type:"loopEnd",index:b});continue}f(x.cmd,b)}const p=c_(n,c,s.collectAll===!0);return i.push({type:"done",success:p}),{events:i,finalState:n,success:p,actorTrail:r,overflowed:a}}function h_(s,t){const{events:e}=td(s,t),n=[],i=new Set(s.goals.map(qe));for(const r of e)r.type==="move"&&n.push({cell:r.to,kind:i.has(qe(r.to))?"goal":"visit"}),r.type==="bump"&&n.push({cell:r.at,kind:"bump"});return n}class d_{constructor(t,e,n){this.world=e,this.level=n,this.group.name="path-preview",t.add(this.group)}group=new nt;geo=new Dt(.11,10,8);update(t){if(this.group.clear(),t.length===0)return;const e=h_(this.level,t),n=this.geo;for(const i of e){const r=i.kind==="goal"?"#ffd23e":i.kind==="bump"?"#ff8a8a":"#ffffff",o=new It(n,z(r)),a=this.world.cellToWorld(i.cell.col,i.cell.row);o.position.set(a.x,Un+.08,a.z),this.group.add(o)}}clear(){this.group.clear()}}class Xs{root;starNodes=[];constructor(t,e,n){this.root=T("header","top-bar",t);const i=T("button","circle-btn",this.root,"←");i.setAttribute("aria-label","Back to title"),i.addEventListener("click",n.onBack);const r=T("img","logo-chip-img",this.root);r.src="./art/logo.svg",r.alt="CodeBops",T("div","top-bar-spacer",this.root);const o=T("div","title-pill",this.root);T("span","dot",o);const a=e.indexOf(" · ");a>0?(T("span","t-world",o,`${e.slice(0,a)} · `),T("span","t-text",o,e.slice(a+3))):T("span","t-text",o,e),T("div","top-bar-spacer",this.root);const l=T("div","stars-pill",this.root);l.setAttribute("aria-label","Stars earned");for(let h=0;h<3;h++){const d=T("span","star",l,"★");this.starNodes.push(d)}const c=T("button","circle-btn blue",this.root,"⚙️");c.setAttribute("aria-label","Settings"),c.addEventListener("click",n.onSettings)}setStars(t){this.starNodes.forEach((e,n)=>e.classList.toggle("earned",n<t))}}class $s{root;constructor(t,e,n){this.root=T("aside","goal-card",t),this.root.setAttribute("aria-label",`Goal: ${e}`),T("div","goal-flag",this.root,"GOAL");const i=T("div","goal-visual",this.root);T("span",void 0,i,n),T("span","arrow",i,"➜");const r=T("img",void 0,i);r.src="./art/characters/zip/zip.svg",r.alt="Zip",T("p","goal-text",this.root,e)}}const u_={moveUp:{id:"moveUp",label:"Move Up",shortLabel:"Up",icon:"⬆️",spoken:"Step one tile up"},moveDown:{id:"moveDown",label:"Move Down",shortLabel:"Down",icon:"⬇️",spoken:"Step one tile down"},moveLeft:{id:"moveLeft",label:"Move Left",shortLabel:"Left",icon:"⬅️",spoken:"Step one tile to the left"},moveRight:{id:"moveRight",label:"Move Right",shortLabel:"Right",icon:"➡️",spoken:"Step one tile to the right"},grab:{id:"grab",label:"Grab",shortLabel:"Grab",icon:"✋",spoken:"Grab what is here"},drop:{id:"drop",label:"Drop",shortLabel:"Drop",icon:"🫳",spoken:"Drop what you carry"},repeat:{id:"repeat",label:"Repeat",shortLabel:"×2",icon:"↻",spoken:"Repeat the commands above"},repeatUntil:{id:"repeatUntil",label:"Until",shortLabel:"Until",icon:"🔁",spoken:"Repeat until you get there"},ifFlower:{id:"ifFlower",label:"If Flower",shortLabel:"If 🌸",icon:"🌸",spoken:"If you see a flower, do the next tile"},ifMushroom:{id:"ifMushroom",label:"If Mushroom",shortLabel:"If 🍄",icon:"🍄",spoken:"If you see a mushroom, do the next tile"},swap:{id:"swap",label:"Swap Bot",shortLabel:"Swap",icon:"👥",spoken:"Switch which bot follows the plan"},move:{id:"move",label:"Move",shortLabel:"Move",icon:"⬆️",spoken:"Move forward one step"},turnRight:{id:"turnRight",label:"Turn Right",shortLabel:"Turn",icon:"↱",spoken:"Turn right"},turnLeft:{id:"turnLeft",label:"Turn Left",shortLabel:"Turn",icon:"↰",spoken:"Turn left"}},Yi={up:'<path d="M12 2.6 L21.4 12 H16.4 V21.4 H7.6 V12 H2.6 Z"/>',down:'<path d="M12 21.4 L2.6 12 H7.6 V2.6 H16.4 V12 H21.4 Z"/>',left:'<path d="M2.6 12 L12 2.6 V7.6 H21.4 V16.4 H12 V21.4 Z"/>',right:'<path d="M21.4 12 L12 21.4 V16.4 H2.6 V7.6 H12 V2.6 Z"/>'},f_=`
<g>
  <path d="M6 12 C6 9.5 8 8.4 10 8.4 L15 8.4 C17.2 8.4 19 10 19 12.6 L19 16.4 C19 18.6 17.2 20.2 15 20.2 L9.6 20.2 C7.4 20.2 6 18.6 6 16.6 Z"/>
  <circle cx="8.2" cy="9.2" r="2.2"/><circle cx="11.2" cy="8.4" r="2.4"/><circle cx="14.2" cy="8.4" r="2.4"/><circle cx="16.8" cy="9.4" r="2.1"/>
  <path d="M6.4 12.6 C4 12 3 14 3.8 15.8 C4.5 17.4 6.4 17.4 7.4 16.6 L7.4 12.8 Z"/>
  <g stroke="rgba(20,30,70,.3)" stroke-width="1.2" stroke-linecap="round" fill="none">
    <path d="M9.4 11.2 V15.2"/><path d="M12.4 10.6 V15.4"/><path d="M15.2 11 V15.2"/>
  </g>
</g>`,p_=`
<g>
  <rect x="6" y="11.5" width="12" height="8.7" rx="4.2"/>
  <rect x="7.1" y="4" width="2.4" height="10" rx="1.2"/>
  <rect x="9.9" y="3" width="2.4" height="11" rx="1.2"/>
  <rect x="12.7" y="4" width="2.4" height="10" rx="1.2"/>
  <rect x="15.4" y="5.6" width="2.2" height="8.6" rx="1.1"/>
  <rect x="3.7" y="11.8" width="2.4" height="6.4" rx="1.2" transform="rotate(-38 4.9 15)"/>
</g>`,ed=`
<g fill="none" stroke="currentColor" stroke-width="2.7" stroke-linecap="round">
  <path d="M6.2 9.4 A7.2 7.2 0 0 1 18.4 8.2"/>
  <path d="M17.8 14.6 A7.2 7.2 0 0 1 5.6 15.8"/>
</g>
<path d="M19.6 4.4 L19.9 9.4 L14.9 8.7 Z"/>
<path d="M4.4 19.6 L4.1 14.6 L9.1 15.3 Z"/>`,m_=`
${ed}
<g transform="translate(12 12) scale(.44)" fill="none" stroke="currentColor" stroke-width="4.4" stroke-linecap="round">
  <path d="M-5 0 A3.4 3.4 0 1 1 0 0 A3.4 3.4 0 1 0 5 0"/>
</g>`,g_=`
<g fill="none" stroke="currentColor" stroke-width="2.7" stroke-linecap="round" stroke-linejoin="round">
  <path d="M5.5 9.5 H16"/>
  <path d="M18.5 14.5 H8"/>
</g>
<path d="M18.8 9.5 L13.8 6.6 V12.4 Z"/>
<path d="M5.2 14.5 L10.2 11.6 V17.4 Z"/>`,v_=`
<g>
  <ellipse cx="12" cy="5.4" rx="3" ry="3.4"/>
  <ellipse cx="18.2" cy="9.9" rx="3.4" ry="3"/>
  <ellipse cx="15.8" cy="17.2" rx="3" ry="3.4"/>
  <ellipse cx="8.2" cy="17.2" rx="3" ry="3.4"/>
  <ellipse cx="5.8" cy="9.9" rx="3.4" ry="3"/>
  <circle cx="12" cy="11.4" r="3.5" fill="#ffe08a"/>
</g>`,__=`
<g>
  <path d="M4 12.4 C4 7.2 7.6 4 12 4 C16.4 4 20 7.2 20 12.4 C20 13.4 19.2 13.9 18.2 13.9 H5.8 C4.8 13.9 4 13.4 4 12.4 Z"/>
  <rect x="9.3" y="13.6" width="5.4" height="7.2" rx="2.5"/>
  <circle cx="9.6" cy="9.2" r="1.5" fill="#e46a8b"/>
  <circle cx="14.4" cy="8.4" r="1.7" fill="#e46a8b"/>
  <circle cx="12.4" cy="11" r="1.2" fill="#e46a8b"/>
</g>`,x_=`
<g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
  <path d="M7 20 V12.5 A4.5 4.5 0 0 1 11.5 8 H15.5"/>
</g>
<path d="M14.5 3.6 L20.5 8 L14.5 12.4 Z"/>`,y_=`
<g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
  <path d="M17 20 V12.5 A4.5 4.5 0 0 0 12.5 8 H8.5"/>
</g>
<path d="M9.5 3.6 L3.5 8 L9.5 12.4 Z"/>`,b_={moveUp:Yi.up,moveDown:Yi.down,moveLeft:Yi.left,moveRight:Yi.right,move:Yi.up,grab:f_,drop:p_,repeat:ed,repeatUntil:m_,ifFlower:v_,ifMushroom:__,swap:g_,turnRight:x_,turnLeft:y_};function w_(s){return`<svg class="cmd-ico" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">${b_[s]??Yi.up}</svg>`}function M_(s){const t=document.createElement("span");return t.className="ico",t.innerHTML=w_(s),t}class S_{constructor(t,e,n,i,r){this.maxSlots=n,this.events=i,this.sfx=r,this.root=T("div","bottom-deck",t);const o=T("div","deck-panel",this.root),a=T("div","deck-tray",o);for(const f of e)a.appendChild(this.makeTile(f,"tray",-1));T("div","deck-divider",o);const l=T("div","deck-sequence",o);l.setAttribute("aria-label","Your program");for(let f=0;f<n;f++){const g=T("div","slot",l);g.dataset.index=String(f),this.slotNodes.push(g)}const c=T("div","bop-wrap",this.root);this.bopBtn=T("button","bop-btn",c),this.bopBtn.type="button",this.bopBtn.setAttribute("aria-label","BOP! Run the program"),this.bopBtn.append("BOP!"),T("span","tri",this.bopBtn),this.bopBtn.addEventListener("click",()=>{this.program.length===0||this.running||(this.sfx.play("bop"),this.events.onBop())}),this.refreshBopState();const h=T("div","deck-tools",this.root),d=T("button","mini-btn purple",h,"↩ Rewind");d.type="button",d.setAttribute("aria-label","Rewind Zip to the start, keep the plan"),d.addEventListener("click",()=>{this.running||(this.sfx.play("remove"),this.events.onRewind())});const u=T("button","mini-btn",h,"✕ Clear");u.type="button",u.setAttribute("aria-label","Clear the plan"),u.addEventListener("click",()=>{this.running||this.program.length===0||(this.sfx.play("remove"),this.program=[],this.renderSlots(),this.emitChange())}),this.renderSlots()}root;program=[];slotNodes=[];bopBtn;drag=null;running=!1;lastPlaced=-1;lastPointerTap=0;loopBubble=null;condBubble=null;getProgram(){return this.program.map(t=>({...t}))}setProgram(t){this.program=t.slice(0,this.maxSlots).map(e=>({...e})),this.lastPlaced=-1,this.renderSlots(),this.emitChange()}refreshBopState(){const t=this.program.length>0&&!this.running;this.bopBtn?.classList.toggle("ready",t),this.bopBtn?.classList.toggle("empty",this.program.length===0)}setRunning(t){this.running=t,this.bopBtn.disabled=t,this.refreshBopState(),t||(this.clearRunningHighlight(),this.clearLoopBubble(),this.clearCondBubble())}highlightSlot(t,e){this.slotNodes.forEach((n,i)=>n.classList.toggle("running",i===t)),this.clearCondBubble(),e&&this.showLoopBubble(t,e.k,e.n)}markLoopSource(t){this.slotNodes.forEach((e,n)=>e.classList.toggle("loop-src",t.includes(n)))}clearRunningHighlight(){this.slotNodes.forEach(t=>t.classList.remove("running","loop-src"))}showLoopBubble(t,e,n){this.clearLoopBubble();const i=this.slotNodes[t];i&&(this.loopBubble=T("div","loop-bubble",i,n==="∞"?`loop ${e}…`:`${e} of ${n}`))}clearLoopBubble(){this.loopBubble?.remove(),this.loopBubble=null}showCondBubble(t,e,n){this.clearCondBubble();const i=this.slotNodes[t];i&&(this.condBubble=T("div",`loop-bubble cond-bubble ${n?"ok":"no"}`,i,`${e} ${n?"✓":"✗"}`))}clearCondBubble(){this.condBubble?.remove(),this.condBubble=null}flashSkipped(t){const e=this.slotNodes[t];e&&(e.classList.add("skipped"),window.setTimeout(()=>e.classList.remove("skipped"),650))}makeTile(t,e,n){const i=u_[t],r=T("button","tile");if(r.type="button",r.dataset.cmd=t,r.setAttribute("aria-label",e==="tray"?`Add command: ${i.spoken}`:`Step ${n+1}: ${i.spoken}. Tap to remove.`),T("span","sheen",r),r.appendChild(M_(t)),T("span","lbl",r,i.label),t==="repeat"&&e==="slot"){const o=this.program[n],a=T("span","count-badge",r,`×${o?.arg??2}`);a.setAttribute("role","button"),a.setAttribute("aria-label","Change repeat count");const l=c=>{if(c.stopPropagation(),this.running)return;const h=this.program[n];if(!h||h.cmd!=="repeat")return;const d=(h.arg??2)>=4?2:(h.arg??2)+1;this.program[n]={cmd:"repeat",arg:d},a.textContent=`×${d}`,this.sfx.play("tap"),this.emitChange()};a.addEventListener("pointerdown",c=>c.stopPropagation()),a.addEventListener("click",l)}return r.addEventListener("pointerdown",o=>this.onPointerDown(o,t,e,n,r)),r.addEventListener("click",()=>{Date.now()-this.lastPointerTap<450||(e==="tray"?this.addCommand(t):this.removeAt(n))}),r.addEventListener("keydown",o=>{(o.key==="Enter"||o.key===" ")&&(o.preventDefault(),e==="tray"?this.addCommand(t):this.removeAt(n))}),r}renderSlots(){this.slotNodes.forEach((t,e)=>{t.innerHTML="",t.classList.remove("filled","drop-hint");const n=this.program[e];if(n!==void 0){t.classList.add("filled"),T("span","num",t,String(e+1));const i=this.makeTile(n.cmd,"slot",e);e===this.lastPlaced&&i.classList.add("fresh"),t.appendChild(i)}}),this.refreshBopState()}emitChange(){this.events.onProgramChange(this.getProgram())}addCommand(t){this.running||this.program.length>=this.maxSlots||(this.program.push(t==="repeat"?{cmd:t,arg:2}:{cmd:t}),this.lastPlaced=this.program.length-1,this.sfx.play("place"),this.renderSlots(),this.emitChange())}removeAt(t){this.running||t<0||t>=this.program.length||(this.program.splice(t,1),this.lastPlaced=-1,this.sfx.play("remove"),this.renderSlots(),this.emitChange())}insertAt(t,e){if(this.program.length>=this.maxSlots)return;const n=Math.min(e,this.program.length);this.program.splice(n,0,t==="repeat"?{cmd:t,arg:2}:{cmd:t}),this.lastPlaced=n,this.sfx.play("place"),this.renderSlots(),this.emitChange()}onPointerDown(t,e,n,i,r){if(this.running)return;t.preventDefault();const o=r.cloneNode(!0);o.className="tile drag-ghost",o.dataset.cmd=e,document.body.appendChild(o),this.positionGhost(o,t.clientX,t.clientY),this.drag={pointerId:t.pointerId,kind:n,command:e,fromIndex:i,ghost:o,moved:!1,startX:t.clientX,startY:t.clientY},r.setPointerCapture(t.pointerId),r.addEventListener("pointermove",this.onPointerMove),r.addEventListener("pointerup",this.onPointerUp,{once:!0}),r.addEventListener("pointercancel",this.onPointerCancel,{once:!0})}positionGhost(t,e,n){t.style.left=`${e}px`,t.style.top=`${n}px`}onPointerMove=t=>{const e=this.drag;if(!e||t.pointerId!==e.pointerId)return;Math.hypot(t.clientX-e.startX,t.clientY-e.startY)>8&&(e.moved=!0),this.positionGhost(e.ghost,t.clientX,t.clientY);const i=this.slotAtPoint(t.clientX,t.clientY);this.slotNodes.forEach((r,o)=>r.classList.toggle("drop-hint",o===i&&e.moved))};onPointerUp=t=>{const e=this.drag;if(!e||t.pointerId!==e.pointerId)return;if(t.target.removeEventListener("pointermove",this.onPointerMove),this.endDrag(),!e.moved){this.lastPointerTap=Date.now(),e.kind==="tray"?this.addCommand(e.command):this.removeAt(e.fromIndex);return}const i=this.slotAtPoint(t.clientX,t.clientY);if(i!==-1){if(e.kind==="tray")this.insertAt(e.command,i);else if(i!==e.fromIndex){const r=this.program[e.fromIndex];this.program.splice(e.fromIndex,1);const o=i>e.fromIndex?i-1:i;this.program.splice(Math.min(o,this.program.length),0,r),this.sfx.play("place"),this.renderSlots(),this.emitChange()}}};onPointerCancel=t=>{this.drag&&t.pointerId===this.drag.pointerId&&(t.target.removeEventListener("pointermove",this.onPointerMove),this.endDrag())};endDrag(){this.drag&&(this.drag.ghost.remove(),this.drag=null,this.slotNodes.forEach(t=>t.classList.remove("drop-hint")))}slotAtPoint(t,e){let n=-1,i=1/0;return this.slotNodes.forEach((r,o)=>{const a=r.getBoundingClientRect(),l=a.left+a.width/2,c=a.top+a.height/2,h=Math.hypot(t-l,e-c);h<a.width*.95&&h<i&&(n=o,i=h)}),n}}function ds(s){return T("div","dialog-scrim",s)}function wi(s,t){s.remove(),t instanceof HTMLElement&&t.focus()}function Ys(s,t,e){return new Promise(n=>{const i=document.activeElement,r=ds(s),o=T("div","dialog",r);o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),o.setAttribute("aria-label",t.brief.title),T("div","intro-emoji",o,t.brief.emoji),T("h2",void 0,o,t.brief.title),T("p",void 0,o,t.brief.text);const a=T("button","mini-btn",o,"🚀 Let's go!");a.addEventListener("click",()=>{e.play("bop"),wi(r,i),n()}),a.focus()})}function T_(s,t,e){const n=document.activeElement,i=ds(s),r=T("div","dialog",i);r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.setAttribute("aria-label","Forever Fred found a loop that never stops!");const o=T("div","goal-visual",r),a=T("img",void 0,o);a.src="./art/characters/mixy/mixy.svg",a.alt="Forever Fred the GlitchBop",a.style.height="84px",a.style.filter="hue-rotate(130deg) saturate(1.2)",T("h2",void 0,r,"Whoa — Forever Fred!"),T("p",void 0,r,"That loop has no way to stop, so it spun around forever! Every Until loop needs a stopping condition — a bump, a grab, or reaching the goal.");const l=T("div","dialog-actions",r),c=T("button","mini-btn",l,"🛠 Fix My Loop");c.addEventListener("click",()=>{t.play("tap"),wi(i,n),e()}),c.focus()}function nd(s,t,e){return new Promise(n=>{const i=document.activeElement,r=ds(s),o=T("div","dialog",r);o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),o.setAttribute("aria-label",t.prediction.prompt),T("h2",void 0,o,"🔮 Make a Prediction!"),T("p",void 0,o,t.prediction.prompt);const a=T("div","dialog-choices",o);let l=!1;for(const c of t.prediction.choices){const h=T("button","choice-card",a);T("span","big",h,c.emoji),T("span",void 0,h,c.label),h.addEventListener("click",()=>{l||(l=!0,e.play("tap"),wi(r,i),n({predictedSuccess:c.correct}))})}a.querySelector("button")?.focus()})}function qs(s,t,e,n){const i=document.activeElement,r=ds(s),o=T("div","dialog",r);o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),o.setAttribute("aria-label","Level complete!"),T("h2",void 0,o,"🎉 You did it!");const a=T("div","cele-stars",o),l=[];for(let f=0;f<3;f++)l.push(T("span","star",a,"★"));const c=T("div","cele-name",o,"");T("p",void 0,o,t.predictedCorrectly===!0?"And your prediction was right — super thinking!":"Zip followed YOUR plan perfectly!");const h=T("div","dialog-actions",o),d=T("button","mini-btn purple",h,"↩ Play Again"),u=T("button","mini-btn",h,"➜ Keep Going");d.addEventListener("click",()=>{e.play("tap"),wi(r,i),n.onReplay()}),u.addEventListener("click",()=>{e.play("tap"),wi(r,i),n.onContinue()}),u.focus(),t.starNames.slice(0,t.stars).forEach((f,g)=>{setTimeout(()=>{l[g]?.classList.add("pop"),c.textContent=`⭐ ${f}`,e.play("star")},300+g*450)}),E_(s)}function E_(s){const t=["#ff5fa2","#ffd23e","#3ed35f","#38b6ff","#a06bff","#ff9f2e","#5ee8c7"];for(let e=0;e<70;e++){const n=T("div","confetti",s),i=8+Math.random()*10;n.style.width=`${i}px`,n.style.height=`${i*(.5+Math.random())}px`,n.style.left=`${Math.random()*100}%`,n.style.background=t[e%t.length],n.style.animationDuration=`${1.8+Math.random()*1.8}s`,n.style.animationDelay=`${Math.random()*.6}s`,setTimeout(()=>n.remove(),4500)}}function A_(s,t,e,n){const i=document.activeElement,r=ds(s),o=T("div","dialog",r);o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),o.setAttribute("aria-label","Mixy found a glitch! Inspect your plan step by step.");const a=T("div","goal-visual",o),l=T("img",void 0,a);l.src="./art/characters/mixy/mixy.svg",l.alt="Mixy the GlitchBop",l.style.height="84px",T("h2",void 0,o,"Oops — Mixy found a glitch!"),T("p",void 0,o,"No worries! Tap the steps to see what happened, fix your plan, and BOP again!");const c=T("div","replay-strip",o),h=R_(t),d=[];h.forEach((g,v)=>{const m=T("button","replay-chip",c);m.setAttribute("aria-label",`Step ${v+1}: ${g.label}`),T("span","ico",m,g.icon),m.addEventListener("click",()=>{e.play("tap"),d.forEach(p=>p.classList.remove("active")),m.classList.add("active"),n.onScrub(v)}),d.push(m)});const u=T("div","dialog-actions",o),f=T("button","mini-btn",u,"🛠 Fix My Plan");f.addEventListener("click",()=>{e.play("tap"),wi(r,i),n.onTryAgain()}),f.focus()}function R_(s){const t=[];for(const e of s)switch(e.type){case"move":t.push({icon:"⬆️",label:"Move"});break;case"bump":t.push({icon:"💥",label:"Bump! Something was in the way"});break;case"turn":t.push({icon:"↱",label:"Turn"});break;case"grab":t.push({icon:"🍓",label:"Grabbed the strawberry"});break;case"grabFail":t.push({icon:"✋",label:"Nothing to grab here"});break;case"drop":t.push({icon:e.onGoal?"⭐":"⬇️",label:e.onGoal?"Delivered!":"Dropped it"});break;case"dropFail":t.push({icon:"🤲",label:"Nothing to drop"});break}return t}function js(s,t,e,n){const i=document.activeElement,r=ds(s),o=T("div","dialog",r);o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),o.setAttribute("aria-label","Settings"),T("h2",void 0,o,"⚙️ Settings");const a=T("div","settings-list",o),l=[{key:"sound",label:"🔊 Sound effects"},{key:"calmMode",label:"🍃 Calm mode (softer motion)"},{key:"highContrast",label:"🌗 High contrast"}];for(const d of l){const u=T("div","setting-row",a);T("span",void 0,u,d.label);const f=T("button","toggle",u);f.setAttribute("role","switch"),f.setAttribute("aria-label",d.label),f.setAttribute("aria-pressed",String(t.settings[d.key])),f.addEventListener("click",()=>{const g=!t.settings[d.key];t.updateSettings({[d.key]:g}),f.setAttribute("aria-pressed",String(g)),e.play("tap"),n()})}const c=T("div","dialog-actions",o),h=T("button","mini-btn",c,"✓ Done");h.addEventListener("click",()=>{e.play("tap"),wi(r,i)}),h.focus()}let Yc=0;function yn(s,t){s.querySelectorAll(".toast").forEach(n=>n.remove());const e=T("div","toast",s,t);clearTimeout(Yc),Yc=window.setTimeout(()=>e.remove(),2200)}class C_{ctx=null;enabled=!0;ensure(){if(!this.enabled)return null;if(!this.ctx){const t=window.AudioContext??window.webkitAudioContext;if(!t)return null;this.ctx=new t}return this.ctx.state==="suspended"&&this.ctx.resume(),this.ctx}tone(t,e,n,i=.16,r=0,o){const a=this.ensure();if(!a)return;const l=a.currentTime+r,c=a.createOscillator(),h=a.createGain();c.type=n,c.frequency.setValueAtTime(t,l),o&&c.frequency.exponentialRampToValueAtTime(o,l+e),h.gain.setValueAtTime(0,l),h.gain.linearRampToValueAtTime(i,l+.012),h.gain.exponentialRampToValueAtTime(.001,l+e),c.connect(h).connect(a.destination),c.start(l),c.stop(l+e+.05)}play(t){if(this.enabled)switch(t){case"tap":this.tone(520,.07,"triangle",.12);break;case"place":this.tone(440,.09,"triangle",.14),this.tone(660,.09,"triangle",.12,.06);break;case"remove":this.tone(330,.08,"triangle",.1);break;case"bop":this.tone(392,.1,"square",.1),this.tone(523,.1,"square",.1,.08),this.tone(784,.16,"square",.1,.16);break;case"hop":this.tone(300,.12,"sine",.1,0,520);break;case"bump":this.tone(140,.14,"sawtooth",.08,0,90);break;case"grab":this.tone(700,.08,"triangle",.12),this.tone(900,.1,"triangle",.1,.05);break;case"drop":this.tone(600,.08,"triangle",.12),this.tone(420,.12,"triangle",.1,.06);break;case"loop":this.tone(500,.07,"sine",.1),this.tone(640,.08,"sine",.09,.05);break;case"predictRight":this.tone(523,.1,"triangle",.13),this.tone(784,.14,"triangle",.12,.08);break;case"predictWrong":this.tone(260,.16,"triangle",.1),this.tone(330,.14,"triangle",.1,.1);break;case"star":this.tone(880,.12,"sine",.14),this.tone(1320,.2,"sine",.1,.07);break;case"celebrate":[523,659,784,1047].forEach((e,n)=>this.tone(e,.16,"triangle",.13,n*.09)),this.tone(1319,.3,"sine",.1,.4);break;case"glitch":this.tone(220,.07,"square",.07),this.tone(180,.07,"square",.07,.06),this.tone(260,.09,"square",.07,.12);break}}}const mt=new C_,id=2,qc="codebops.save.v1",Ms={schemaVersion:id,stars:{},settings:{sound:!0,calmMode:!1,highContrast:!1,leftHanded:!1},daily:{lastCompleted:null,streak:0,totalCompleted:0},playSeconds:0};function bl(s=new Date){const t=e=>String(e).padStart(2,"0");return`${s.getFullYear()}-${t(s.getMonth()+1)}-${t(s.getDate())}`}function L_(){const s=new Date;return s.setDate(s.getDate()-1),bl(s)}class Ts{data;constructor(){this.data=this.load()}load(){try{const t=localStorage.getItem(qc);if(!t)return structuredClone(Ms);const e=JSON.parse(t);return{schemaVersion:id,stars:{...e.stars},settings:{...Ms.settings,...e.settings},daily:{...Ms.daily,...e.daily},playSeconds:e.playSeconds??0}}catch{return structuredClone(Ms)}}persist(){try{localStorage.setItem(qc,JSON.stringify(this.data))}catch{}}get stars(){return this.data.stars}get settings(){return this.data.settings}get daily(){return this.data.daily}get playSeconds(){return this.data.playSeconds}setStars(t,e){this.data.stars[t]=Math.max(this.data.stars[t]??0,e),this.persist()}updateSettings(t){this.data.settings={...this.data.settings,...t},this.persist()}completeDaily(){const t=bl();return this.data.daily.lastCompleted===t?this.data.daily.streak:(this.data.daily.streak=this.data.daily.lastCompleted===L_()?this.data.daily.streak+1:1,this.data.daily.lastCompleted=t,this.data.daily.totalCompleted+=1,this.persist(),this.data.daily.streak)}addPlaySeconds(t){this.data.playSeconds+=Math.max(0,Math.round(t)),this.persist()}reset(){this.data=structuredClone(Ms),this.persist()}}function P_(s){const t=[],{cols:e,rows:n}=s;(e<1||n<1)&&t.push("Level grid must be at least 1×1."),pi(s.start,e,n)||t.push(`Start ${qe(s.start)} out of bounds.`);const i=new Set(s.blocked.map(qe));i.has(qe(s.start))&&t.push("Start cell is blocked.");for(const l of s.blocked)pi(l,e,n)||t.push(`Blocked cell ${qe(l)} out of bounds.`);s.botStart&&(pi(s.botStart,e,n)||t.push("botStart out of bounds."),i.has(qe(s.botStart))&&t.push("botStart is blocked."),s.availableCommands.includes("swap")||t.push("botStart level must offer the swap tile."));for(const l of s.zipBlocked??[])pi(l,e,n)||t.push(`zipBlocked ${qe(l)} out of bounds.`);const r=new Set,o=new Set;for(const l of s.items)pi(l,e,n)||t.push(`Item "${l.id}" out of bounds.`),i.has(qe(l))&&t.push(`Item "${l.id}" sits on a blocked cell.`),r.has(l.id)&&t.push(`Duplicate item id "${l.id}".`),r.add(l.id),o.add(l.kind);for(const l of s.goals)pi(l,e,n)||t.push(`Goal ${qe(l)} out of bounds.`),o.has(l.accepts)||t.push(`Goal accepts unknown item kind "${l.accepts}".`);s.maxSlots<1&&t.push("maxSlots must be ≥ 1."),s.availableCommands.length===0&&t.push("Level offers no commands.");for(const l of s.ruleChoices??[])o.has(l.trigger)||t.push(`Rule trigger "${l.trigger}" has no matching item in the level.`);return(s.prefill?.length??0)>s.maxSlots&&t.push("Prefill exceeds maxSlots."),s.prediction.choices.filter(l=>l.correct).length!==1&&t.push("Prediction needs exactly one correct choice."),t}function I_(s){const t=P_(s);if(t.length>0)throw new Error(`[CodeBops] Invalid level "${s.id}":
 - ${t.join(`
 - `)}`)}const jc={strawberry:"🍓",pearl:"🦪",flower:"🌸",mushroom:"🍄",battery:"🔋",badge:"🎖️"},D_=["Zip","Bolt"],U_={"sparkle-meadow":"#6fc7ff","bubble-bay":"#5fd4f0","pattern-forest":"#241b3d","robot-town":"#1b2340","agent-academy":"#ffb86b"};class ea{constructor(t,e,n){this.root=t,this.level=e,this.events=n,this.store=n.store??new Ts,I_(e)}stage;world;zip;bolt=null;mixy;preview;deck;topBar;charLayer;sfx=mt;store;program=[];running=!1;predictedSuccess=null;disposers=[];playAccum=0;selectedRule=null;lensGroup=null;lensOn=!1;ruleCardEls=[];runHadRuleFire=!1;bot(t){return t===1&&this.bolt?this.bolt:this.zip}enter(){const t=T("div","",this.root);t.id="world-canvas-wrap",this.charLayer=T("div","",this.root),this.charLayer.id="char-layer";const e=T("div","ui-layer",this.root);this.stage=new Ti(t),this.world=this.level.worldId==="bubble-bay"?new Nv(this.level):this.level.worldId==="pattern-forest"?new Bv(this.level):this.level.worldId==="robot-town"?new Xv(this.level):this.level.worldId==="agent-academy"?new Kv(this.level):new Lv(this.level),this.stage.scene.add(this.world.group),this.stage.setSky(U_[this.level.worldId]??"#6fc7ff"),this.zip=new _n({svgUrl:"./art/characters/zip/zip.svg",height:1.78,name:"zip"},this.charLayer,this.stage.camera,t),this.zip.addToScene(this.stage.scene);const n=this.world.cellToWorld(this.level.start.col,this.level.start.row);this.zip.placeAt(n),this.level.botStart&&(this.bolt=new _n({svgUrl:"./art/characters/zip/zip.svg",height:1.62,name:"bolt",extraClass:"robot-bop"},this.charLayer,this.stage.camera,t),this.bolt.addToScene(this.stage.scene),this.bolt.placeAt(this.world.cellToWorld(this.level.botStart.col,this.level.botStart.row))),this.mixy=new _n({svgUrl:"./art/characters/mixy/mixy.svg",height:1.55,name:"mixy",mixy:!0},this.charLayer,this.stage.camera,t),this.mixy.addToScene(this.stage.scene),this.mixy.placeAt(this.world.mixyLookout()),this.mixy.look("left");{const o=this.level,a=.65,l=[this.world.cellToWorld(-a,-a),this.world.cellToWorld(o.cols-1+a,-a),this.world.cellToWorld(-a,o.rows-1+a),this.world.cellToWorld(o.cols-1+a,o.rows-1+a)],c=this.world.cellToWorld((o.cols-1)/2,(o.rows-1)/2);c.y=.2,this.stage.frameArea(c,l)}if(this.preview=new d_(this.world.group,this.world,this.level),this.topBar=new Xs(e,`${this.level.title} · ${this.level.shortTitle}`,{onBack:this.events.onExit,onSettings:()=>js(e,this.store,this.sfx,()=>this.applySettings())}),this.topBar.setStars(this.store.stars[this.level.id]??0),new $s(e,this.level.goalText,jc[this.level.items[0]?.kind??"strawberry"]),this.deck=new S_(e,this.level.availableCommands,this.level.maxSlots,{onProgramChange:o=>{this.program=o,this.preview.update(o)},onBop:()=>void this.onBop(e),onRewind:()=>this.rewind()},this.sfx),this.level.ruleChoices&&this.level.ruleChoices.length>0){const o=T("div","rule-bar",e);T("span","rule-label",o,"⚡ HELPER RULE");for(const l of this.level.ruleChoices){const c=T("button","rule-card",o);c.type="button",c.innerHTML=`WHEN ${jc[l.trigger]} → ✋`,c.setAttribute("aria-label",`Rule: when you see a ${l.trigger}, grab it`),c.addEventListener("click",()=>{this.sfx.play("tap"),this.selectedRule=this.selectedRule?.trigger===l.trigger?null:{...l},this.refreshRuleBar()}),this.ruleCardEls.push(c)}const a=T("button","rule-lens",o,"🔍 BopLens");a.type="button",a.addEventListener("click",()=>{this.sfx.play("tap"),this.lensOn=!this.lensOn,a.classList.toggle("on",this.lensOn),this.refreshLens()}),this.selectedRule={...this.level.ruleChoices[0]},this.refreshRuleBar()}const i=o=>{if(this.running||document.querySelector(".dialog-scrim"))return;const a=h=>this.level.availableCommands.includes(h),c={ArrowLeft:"moveLeft",ArrowRight:"moveRight",ArrowUp:"moveUp",ArrowDown:"moveDown"}[o.key];c&&a(c)?(o.preventDefault(),this.deck.addCommand(c),this.sfx.play("tap")):o.key==="Backspace"?(o.preventDefault(),this.deck.removeAt(this.program.length-1)):(o.key==="Enter"||o.key===" ")&&this.program.length>0&&(o.preventDefault(),this.onBop(e))};window.addEventListener("keydown",i),this.disposers.push(()=>window.removeEventListener("keydown",i));const r=this.stage.onTick((o,a)=>{if(this.world.update(o,a),this.zip.update(o,a),this.bolt?.update(o,a),this.mixy.update(o,a),this.lensGroup){const l=1+Math.sin(a*4)*.12;for(const c of this.lensGroup.children)c.scale.setScalar(l),c.rotation.z=a*.9}this.playAccum+=o,this.playAccum>=20&&(this.store.addPlaySeconds(this.playAccum),this.playAccum=0)});this.disposers.push(r),this.stage.startLoop(),this.applySettings(),Ys(e,this.level,this.sfx).then(()=>{this.level.prefill?(this.deck.setProgram(this.level.prefill),yn(e,"Copycat left a broken plan — can you fix it? 🐾")):yn(e,"Build a plan, then press BOP!")})}applySettings(){const t=this.store.settings;this.sfx.enabled=t.sound,document.body.classList.toggle("calm-mode",t.calmMode),document.body.classList.toggle("high-contrast",t.highContrast),document.body.classList.toggle("left-handed",t.leftHanded),this.zip?.setCalm(t.calmMode),this.bolt?.setCalm(t.calmMode),this.mixy?.setCalm(t.calmMode)}refreshRuleBar(){this.ruleCardEls.forEach((t,e)=>{const n=this.level.ruleChoices[e];t.classList.toggle("selected",this.selectedRule?.trigger===n.trigger)}),this.refreshLens()}refreshLens(){if(this.lensGroup&&(this.lensGroup.removeFromParent(),this.lensGroup.traverse(i=>{i instanceof It&&(i.geometry.dispose(),i.material.dispose())}),this.lensGroup=null),!this.lensOn||!this.selectedRule)return;const t=new nt,e=new Jt({color:"#7ff3ff",emissive:"#54e6ff",emissiveIntensity:1.3,transparent:!0,opacity:.9}),n=new Le(.62,.05,8,28);for(const i of this.level.items){if(i.kind!==this.selectedRule.trigger)continue;const r=new It(n,e);r.rotation.x=-Math.PI/2;const o=this.world.cellToWorld(i.col,i.row);r.position.set(o.x,Un+.04,o.z),r.name="lensRing",t.add(r)}this.lensGroup=t,this.world.group.add(t)}rewind(){const t=this.world.cellToWorld(this.level.start.col,this.level.start.row);this.zip.placeAt(t),this.zip.look(null),this.zip.setMood("idle"),this.bolt&&this.level.botStart&&(this.bolt.placeAt(this.world.cellToWorld(this.level.botStart.col,this.level.botStart.row)),this.bolt.look(null),this.bolt.setMood("idle"));for(const e of this.level.items){const n=this.world.itemNodes.get(e.id);if(n){n.removeFromParent();const i=this.world.cellToWorld(e.col,e.row);n.position.set(i.x,Un,i.z),n.scale.setScalar(1),this.world.group.add(n)}}this.preview.update(this.program)}blockIndices(t){const e=[];for(let n=t-1;n>=0;n--){const i=this.program[n]?.cmd;if(i==="repeat"||i==="repeatUntil")break;e.unshift(n)}return e}async onBop(t){if(this.running||this.program.length===0)return;this.running=!0,this.deck.setRunning(!0),this.preview.clear(),this.zip.setMood("thinking"),this.zip.look("up");const{predictedSuccess:e}=await nd(t,this.level,this.sfx);this.predictedSuccess=e,this.zip.setMood("idle"),this.zip.look(null),this.rewind();const n=td(this.level,this.program,this.selectedRule);this.runHadRuleFire=n.events.some(i=>i.type==="ruleFire"),await this.playback(n.events),n.success?this.celebrate(t):n.overflowed?(await this.mixy.glitchWobble(.7),this.sfx.play("glitch"),T_(t,this.sfx,()=>{this.rewind(),this.preview.update(this.program),yn(t,"Give your Until loop a way to stop! 🛑")})):await this.mixyGlitch(t,n),this.running=!1,this.deck.setRunning(!1)}async playback(t){const e=this.store.settings.calmMode?1.35:1,n=[[],[]];for(const i of t)switch(i.type){case"commandStart":this.deck.highlightSlot(i.index,i.iter),await In(.14/e);break;case"move":{const r=this.bot(i.actor);this.sfx.play("hop");const o=this.world.cellToWorld(i.to.col,i.to.row);this.faceDirection(r,i.dir),await r.hopTo(o,.34/e);break}case"bump":{const r=this.bot(i.actor);this.sfx.play("bump"),r.flashMood("surprised",700),await r.bumpShake();break}case"turn":{const r=this.bot(i.actor);this.faceDirection(r,i.to),await r.turnWiggle();break}case"swap":{const r=this.bot(i.to);this.sfx.play("grab"),r.flashMood("excited",900),r.hopTo(r.root.position.clone(),.3/e),yn(this.root,i.to===1?"Bolt is listening! 🤖":"Zip is listening! 🐰"),await In(.25/e);break}case"ruleFire":{const r=this.bot(i.actor);r.flashMood("excited",700),this.sfx.play("loop"),this.ruleCardEls.forEach(l=>{l.classList.remove("fired"),l.offsetWidth,l.classList.add("fired")});const o=r.el.getBoundingClientRect(),a=T("div","rule-pop",document.body,"⚡");a.style.left=`${o.left+o.width/2-16}px`,a.style.top=`${o.top-8}px`,window.setTimeout(()=>a.remove(),800),await In(.15/e);break}case"grab":{const r=this.bot(i.actor);this.sfx.play("grab"),r.flashMood("happy",900);const o=this.world.itemNodes.get(i.item);if(o){o.removeFromParent(),r.carryAnchor.add(o);const a=n[i.actor]??n[0];o.position.set(-.06*a.length,.13*a.length,0),o.scale.setScalar(.8),a.push(o)}await In(.2/e);break}case"grabFail":{const r=this.bot(i.actor);this.sfx.play("bump"),r.flashMood("surprised",700),await r.turnWiggle();break}case"drop":{const r=this.bot(i.actor);this.sfx.play("drop");const a=(n[i.actor]??n[0]).shift();if(a){a.removeFromParent();const l=this.world.cellToWorld(i.at.col,i.at.row);a.position.set(l.x+(i.onGoal?0:(Math.random()-.5)*.3),Un+(i.onGoal?.62:0),l.z+(i.onGoal?.1:(Math.random()-.5)*.3)),a.scale.setScalar(i.onGoal?.85:1),this.world.group.add(a)}i.onGoal&&r.flashMood("happy",1200),await In(.24/e);break}case"dropFail":{const r=this.bot(i.actor);this.sfx.play("bump"),r.flashMood("surprised",800),yn(this.root,`${D_[i.actor]}'s hands are empty! 👐`),await r.turnWiggle();break}case"condition":{this.bot(0).flashMood("thinking",800),this.deck.highlightSlot(i.index),this.sfx.play(i.ok?"loop":"tap"),this.deck.showCondBubble(i.index,i.kind==="flower"?"🌸":"🍄",i.ok),await In(.3/e);break}case"condSkip":this.deck.flashSkipped(i.index),this.sfx.play("tap"),await In(.18/e);break;case"loopStart":{this.deck.markLoopSource(this.blockIndices(i.index)),i.kind==="count"&&this.deck.showLoopBubble(i.index,0,i.count??"∞");break}case"loopIter":this.sfx.play("loop"),this.deck.showLoopBubble(i.index,i.iter,i.count??"∞"),await In(.1/e);break;case"loopEnd":this.deck.clearLoopBubble(),this.deck.clearRunningHighlight();break;case"loopOverflow":this.deck.clearLoopBubble();break;case"loopFail":yn(this.root,"That loop has nothing to repeat! ↻"),await In(.3);break}}faceDirection(t,e){t.look(e==="E"?"right":e==="W"?"left":e==="N"?"up":null)}celebrate(t){this.zip.celebrate(),this.bolt?.celebrate(),this.sfx.play("celebrate"),this.events.onSuccess?.();const e=["It Works!"];this.program.length<=this.level.par&&e.push("It Is Clever!");const n=this.program.some(a=>a.cmd==="repeat"||a.cmd==="repeatUntil"),i=this.program.some(a=>a.cmd==="ifFlower"||a.cmd==="ifMushroom"),r=this.program.some(a=>a.cmd==="swap");(this.level.bonusStar==="loop"?n:this.level.bonusStar==="condition"?i:this.level.bonusStar==="swap"?r:this.level.bonusStar==="rule"?this.runHadRuleFire:this.predictedSuccess===!0)&&e.push("It Is Creative!"),this.store.setStars(this.level.id,e.length),qs(t,{stars:e.length,starNames:e,predictedCorrectly:this.predictedSuccess},this.sfx,{onReplay:()=>{this.topBar.setStars(e.length),this.rewind(),this.preview.update(this.program)},onContinue:()=>{this.topBar.setStars(e.length),this.events.hasNext?this.events.onNextLevel():this.events.onExit()}}),window.setTimeout(()=>this.flyStarsToPill(e.length),1900)}flyStarsToPill(t){const e=this.root.querySelector(".stars-pill");if(!e||t===0)return;const n=e.getBoundingClientRect(),i=window.innerWidth/2,r=window.innerHeight/2-60;for(let o=0;o<t;o++){const a=T("div","fly-star",document.body,"★");a.style.left=`${i+(o-1)*54}px`,a.style.top=`${r}px`,window.setTimeout(()=>{a.style.transform=`translate(${n.left+n.width/2-i-(o-1)*54}px, ${n.top+n.height/2-r}px) scale(.45)`,a.style.opacity="0.2"},60+o*140),window.setTimeout(()=>a.remove(),1e3+o*140)}window.setTimeout(()=>this.topBar.setStars(t),1100+t*140)}async mixyGlitch(t,e){this.sfx.play("glitch"),this.zip.setMood("thinking"),await this.mixy.glitchWobble(.7),A_(t,e.events,this.sfx,{onScrub:n=>{const i=e.actorTrail[Math.min(n,e.actorTrail.length-1)];i&&i.actors.forEach((r,o)=>{const a=this.bot(o);a.placeAt(this.world.cellToWorld(r.col,r.row)),this.faceDirection(a,r.dir)})},onTryAgain:()=>{this.zip.setMood("idle"),this.rewind(),this.preview.update(this.program),yn(t,"Fix a step and BOP again! 💪")}})}dispose(){this.playAccum>0&&this.store.addPlaySeconds(this.playAccum),this.playAccum=0,this.disposers.forEach(t=>t()),this.disposers=[],this.zip?.dispose(),this.bolt?.dispose(),this.mixy?.dispose(),this.stage?.dispose(),this.root.innerHTML=""}}const sd=["moveUp","moveDown","moveLeft","moveRight","grab","drop"],N_={id:"sm-1",worldId:"sparkle-meadow",title:"World 1: Sparkle Meadow",shortTitle:"Berry Hello!",goalText:"Bring the fruit to our friend!",cols:4,rows:3,start:{col:0,row:0,dir:"E"},blocked:[{col:1,row:1},{col:0,row:2}],items:[{id:"strawberry",kind:"strawberry",col:2,row:0}],goals:[{col:3,row:2,accepts:"strawberry"}],availableCommands:sd,maxSlots:8,par:7,brief:{title:"Berry Hello!",text:"Zip is hungry for adventure! Use the arrow tiles to walk Zip to the strawberry, grab it, and bring it to the star pad.",emoji:"🍓"},prediction:{prompt:"What will Zip do with your plan?",choices:[{id:"deliver",emoji:"🍓",label:"Deliver the strawberry to the star pad!",correct:!0},{id:"oops",emoji:"🌳",label:"Get a little lost on the way…",correct:!1}]}},k_={id:"sm-2",worldId:"sparkle-meadow",title:"World 1: Sparkle Meadow",shortTitle:"Around the Bushes",goalText:"Zip around the bushes to deliver the berry!",cols:4,rows:3,start:{col:1,row:2,dir:"N"},blocked:[{col:0,row:1},{col:2,row:1}],items:[{id:"strawberry",kind:"strawberry",col:1,row:0}],goals:[{col:3,row:2,accepts:"strawberry"}],availableCommands:sd,maxSlots:10,par:8,brief:{title:"Around the Bushes",text:"The path is twistier this time. Plan your arrows carefully, helper!",emoji:"🌳"},prediction:{prompt:"Where will the strawberry end up?",choices:[{id:"deliver",emoji:"⭐",label:"Right on the star pad!",correct:!0},{id:"oops",emoji:"🫢",label:"Zip might bump a bush…",correct:!1}]}},F_=[N_,k_],O_={id:"bb-1",worldId:"bubble-bay",title:"World 2: Bubble Bay",shortTitle:"Loopy Dock",goalText:"Bring the pearl to the treasure chest!",cols:5,rows:3,start:{col:0,row:1,dir:"E"},blocked:[],items:[{id:"pearl",kind:"pearl",col:3,row:1}],goals:[{col:4,row:1,accepts:"pearl"}],availableCommands:["moveUp","moveDown","moveLeft","moveRight","grab","drop","repeat"],maxSlots:6,par:5,brief:{title:"Loopy Dock",text:"Meet the Repeat tile! It runs the commands above it again — three steps in one tap. Loop-de-loop!",emoji:"↻"},prediction:{prompt:"What will your loop do?",choices:[{id:"deliver",emoji:"🦪",label:"Zip zooms down the dock to the chest!",correct:!0},{id:"oops",emoji:"💦",label:"Zip might splash into the bay…",correct:!1}]}},B_={id:"bb-2",worldId:"bubble-bay",title:"World 2: Bubble Bay",shortTitle:"Pearl Parade",goalText:"Collect every pearl and reach the chest!",cols:5,rows:3,start:{col:0,row:1,dir:"E"},blocked:[],items:[{id:"pearl-1",kind:"pearl",col:1,row:1},{id:"pearl-2",kind:"pearl",col:2,row:1},{id:"pearl-3",kind:"pearl",col:3,row:1}],goals:[{col:4,row:1,accepts:"pearl"}],availableCommands:["moveUp","moveDown","moveLeft","moveRight","grab","drop","repeat"],maxSlots:6,par:5,brief:{title:"Pearl Parade",text:"Three pearls in a row! Repeat a step + grab block to scoop them all up like a pro looper.",emoji:"🫧"},prediction:{prompt:"How many pearls will Zip carry to the chest?",choices:[{id:"deliver",emoji:"😄",label:"All three — what a haul!",correct:!0},{id:"oops",emoji:"🥲",label:"Maybe just one…",correct:!1}]}},z_={id:"bb-3",worldId:"bubble-bay",title:"World 2: Bubble Bay",shortTitle:"Until You Get There",goalText:"Loop until the pearl, then to the chest!",cols:5,rows:3,start:{col:0,row:0,dir:"E"},blocked:[],items:[{id:"pearl",kind:"pearl",col:3,row:0}],goals:[{col:4,row:0,accepts:"pearl"}],availableCommands:["moveUp","moveDown","moveLeft","moveRight","grab","drop","repeat","repeatUntil"],maxSlots:6,par:5,brief:{title:"Until You Get There",text:"The Until tile loops your step + grab block and stops all by itself when the pearl is scooped. Magic!",emoji:"🔁"},prediction:{prompt:"When will the Until loop stop?",choices:[{id:"deliver",emoji:"🦪",label:"Right at the pearl — smart loop!",correct:!0},{id:"oops",emoji:"🌀",label:"It might loop forever…",correct:!1}]}},G_={id:"bb-debug",worldId:"bubble-bay",title:"World 2: Bubble Bay",shortTitle:"Copycat’s Oopsie",goalText:"Fix Copycat’s loop so Zip stops at the pearl!",cols:4,rows:3,start:{col:0,row:1,dir:"E"},blocked:[],items:[{id:"pearl",kind:"pearl",col:2,row:1}],goals:[{col:3,row:1,accepts:"pearl"}],availableCommands:["moveUp","moveDown","moveLeft","moveRight","grab","drop","repeat"],maxSlots:5,par:5,prefill:[{cmd:"moveRight"},{cmd:"repeat",arg:4},{cmd:"grab"},{cmd:"moveRight"},{cmd:"drop"}],brief:{title:"Copycat’s Oopsie",text:"Copycat copied the loop one time too many — Zip splashes off the dock! Tap the ↻ badge to fix the count, then BOP!",emoji:"🐾"},prediction:{prompt:"Did the fix work?",choices:[{id:"deliver",emoji:"🎉",label:"Perfect loop — pearl delivered!",correct:!0},{id:"oops",emoji:"💦",label:"Still splashy…",correct:!1}]}},H_={id:"bb-creative",worldId:"bubble-bay",title:"World 2: Bubble Bay",shortTitle:"Loop Lagoon",goalText:"Deliver the pearl YOUR way — loops earn a bonus star!",cols:5,rows:3,start:{col:0,row:2,dir:"E"},blocked:[{col:2,row:1}],items:[{id:"pearl",kind:"pearl",col:2,row:2}],goals:[{col:4,row:0,accepts:"pearl"}],availableCommands:["moveUp","moveDown","moveLeft","moveRight","grab","drop","repeat","repeatUntil"],maxSlots:10,par:9,bonusStar:"loop",brief:{title:"Loop Lagoon",text:"A whole lagoon to play in! Deliver the pearl any way you like — use a loop tile for a bonus star.",emoji:"🌊"},prediction:{prompt:"What’s your master plan?",choices:[{id:"deliver",emoji:"🏆",label:"Pearl to the chest, easy!",correct:!0},{id:"oops",emoji:"🤔",label:"Let’s see what happens…",correct:!1}]}},V_=[O_,B_,z_,G_,H_],Zs=["moveUp","moveDown","moveLeft","moveRight","grab","drop"],W_={id:"pf-1",worldId:"pattern-forest",title:"World 3: Pattern Forest",shortTitle:"If You See a Flower",goalText:"Pick the flower for the fairy ring!",cols:5,rows:3,start:{col:0,row:1,dir:"E"},blocked:[],items:[{id:"flower",kind:"flower",col:2,row:1}],goals:[{col:4,row:1,accepts:"flower"}],availableCommands:[...Zs,"ifFlower"],maxSlots:8,par:7,brief:{title:"If You See a Flower",text:'New tile! 🌸 IF checks the tile Zip stands on: "If there IS a flower, do the next tile!" Try it: walk, IF 🌸, grab!',emoji:"🌸"},prediction:{prompt:"What happens at the IF tile?",choices:[{id:"deliver",emoji:"🌸",label:"Zip sees a flower and grabs it!",correct:!0},{id:"oops",emoji:"🙈",label:"Zip walks right past it…",correct:!1}]}},X_={id:"pf-2",worldId:"pattern-forest",title:"World 3: Pattern Forest",shortTitle:"Mushroom Mix-Up",goalText:"Only flowers for the fairy ring — yuck mushrooms!",cols:5,rows:3,start:{col:0,row:1,dir:"E"},blocked:[],items:[{id:"mushroom-1",kind:"mushroom",col:1,row:1},{id:"flower",kind:"flower",col:2,row:1},{id:"mushroom-2",kind:"mushroom",col:3,row:1}],goals:[{col:4,row:1,accepts:"flower"}],availableCommands:[...Zs,"ifFlower"],maxSlots:12,par:9,brief:{title:"Mushroom Mix-Up",text:"Yucky mushrooms spoil the fairy ring! Tiptoe past them: step, IF 🌸, grab — the IF tile skips the grab when it sees a mushroom.",emoji:"🍄"},prediction:{prompt:"What lands on the fairy ring?",choices:[{id:"deliver",emoji:"🌸",label:"Just the pretty flower!",correct:!0},{id:"oops",emoji:"🍄",label:"A yucky mushroom — oh no!",correct:!1}]}},$_={id:"pf-3",worldId:"pattern-forest",title:"World 3: Pattern Forest",shortTitle:"Firefly Rows",goalText:"Gather both flowers for the ring!",cols:6,rows:3,start:{col:0,row:1,dir:"E"},blocked:[],items:[{id:"flower-1",kind:"flower",col:1,row:1},{id:"mushroom-1",kind:"mushroom",col:2,row:1},{id:"flower-2",kind:"flower",col:3,row:1},{id:"mushroom-2",kind:"mushroom",col:4,row:1}],goals:[{col:5,row:1,accepts:"flower"}],availableCommands:[...Zs,"ifFlower","repeat"],maxSlots:8,par:6,brief:{title:"Firefly Rows",text:"A long row of flowers AND mushrooms! Loop your pattern — step, IF 🌸, grab, Repeat ×4 — and watch Zip pick perfectly, every time.",emoji:"✨"},prediction:{prompt:"What does your pattern collect?",choices:[{id:"deliver",emoji:"🌸🌸",label:"Both flowers, zero mushrooms!",correct:!0},{id:"oops",emoji:"🍄",label:"Something yucky sneaks in…",correct:!1}]}},Y_={id:"pf-debug",worldId:"pattern-forest",title:"World 3: Pattern Forest",shortTitle:"Copycat’s Poison Ring",goalText:"Fix the plan so only flowers reach the ring!",cols:6,rows:3,start:{col:0,row:1,dir:"E"},blocked:[],items:[{id:"flower-1",kind:"flower",col:1,row:1},{id:"mushroom-1",kind:"mushroom",col:2,row:1},{id:"flower-2",kind:"flower",col:3,row:1},{id:"mushroom-2",kind:"mushroom",col:4,row:1}],goals:[{col:5,row:1,accepts:"flower"}],availableCommands:[...Zs,"ifFlower","repeat"],maxSlots:8,par:6,prefill:[{cmd:"moveRight"},{cmd:"grab"},{cmd:"repeat",arg:4},{cmd:"moveRight"},{cmd:"drop"}],brief:{title:"Copycat’s Poison Ring",text:"Copycat grabbed EVERYTHING — even the yucky mushrooms! Clear the plan and rebuild it with an IF 🌸 before the grab.",emoji:"🐾"},prediction:{prompt:"Did your fix save the ring?",choices:[{id:"deliver",emoji:"🎉",label:"Only flowers — the ring is happy!",correct:!0},{id:"oops",emoji:"🍄",label:"Still a little yucky…",correct:!1}]}},q_={id:"pf-creative",worldId:"pattern-forest",title:"World 3: Pattern Forest",shortTitle:"Grove of Wonders",goalText:"Fill BOTH fairy rings — IF tiles earn a bonus star!",cols:6,rows:3,start:{col:0,row:1,dir:"E"},blocked:[],items:[{id:"mushroom-1",kind:"mushroom",col:2,row:0},{id:"flower-1",kind:"flower",col:3,row:1},{id:"mushroom-2",kind:"mushroom",col:2,row:2},{id:"mushroom-3",kind:"mushroom",col:4,row:1},{id:"flower-2",kind:"flower",col:4,row:2}],goals:[{col:5,row:1,accepts:"flower"},{col:5,row:2,accepts:"flower"}],availableCommands:[...Zs,"ifFlower","ifMushroom","repeat","repeatUntil"],maxSlots:14,par:13,bonusStar:"condition",brief:{title:"Grove of Wonders",text:"A whole glowing grove to explore! Two fairy rings are hungry for flowers. Any plan works — IF tiles make it elegant.",emoji:"🌳"},prediction:{prompt:"Will both rings get their flowers?",choices:[{id:"deliver",emoji:"🏆",label:"Two happy rings, coming up!",correct:!0},{id:"oops",emoji:"🤔",label:"Let’s see what happens…",correct:!1}]}},j_=[W_,X_,$_,Y_,q_],Ks=["moveUp","moveDown","moveLeft","moveRight","grab","drop","swap"],Z_={id:"rt-1",worldId:"robot-town",title:"World 4: Robot Town",shortTitle:"Two Little Helpers",goalText:"Both batteries to their charging pads!",cols:6,rows:3,start:{col:0,row:1,dir:"E"},botStart:{col:3,row:1,dir:"E"},blocked:[],items:[{id:"battery-a",kind:"battery",col:1,row:1},{id:"battery-b",kind:"battery",col:4,row:1}],goals:[{col:2,row:1,accepts:"battery"},{col:5,row:1,accepts:"battery"}],availableCommands:Ks,maxSlots:10,par:9,brief:{title:"Two Little Helpers",text:"Meet Bolt the robot! The 👥 Swap tile switches who listens: plan Zip’s delivery, tap Swap, then plan Bolt’s!",emoji:"🤖"},prediction:{prompt:"How many batteries get charged?",choices:[{id:"deliver",emoji:"🔋🔋",label:"Both — teamwork makes the dream work!",correct:!0},{id:"oops",emoji:"🔋",label:"Maybe only one…",correct:!1}]}},K_={id:"rt-2",worldId:"robot-town",title:"World 4: Robot Town",shortTitle:"Battery Boulevards",goalText:"Charge both pads across the boulevards!",cols:6,rows:3,start:{col:0,row:2,dir:"N"},botStart:{col:5,row:2,dir:"N"},blocked:[{col:1,row:1},{col:4,row:1}],items:[{id:"battery-a",kind:"battery",col:0,row:0},{id:"battery-b",kind:"battery",col:5,row:0}],goals:[{col:2,row:0,accepts:"battery"},{col:3,row:0,accepts:"battery"}],availableCommands:Ks,maxSlots:14,par:13,brief:{title:"Battery Boulevards",text:"Zip takes the left side, Bolt takes the right. Watch the pipes — and don’t forget who’s listening after a Swap!",emoji:"🏙️"},prediction:{prompt:"Both pads humming?",choices:[{id:"deliver",emoji:"⚡",label:"Fully charged, both of them!",correct:!0},{id:"oops",emoji:"🪫",label:"Someone ends up powerless…",correct:!1}]}},J_={id:"rt-3",worldId:"robot-town",title:"World 4: Robot Town",shortTitle:"Charge Together",goalText:"Loop both bots to their pads!",cols:6,rows:3,start:{col:0,row:1,dir:"E"},botStart:{col:4,row:2,dir:"W"},blocked:[],items:[{id:"battery-a",kind:"battery",col:2,row:1},{id:"battery-b",kind:"battery",col:3,row:2}],goals:[{col:4,row:1,accepts:"battery"},{col:1,row:2,accepts:"battery"}],availableCommands:[...Ks,"repeat"],maxSlots:12,par:12,brief:{title:"Charge Together",text:"Zip loops east, Bolt loops west. Repeat tiles work for both of them — one plan, two happy bots!",emoji:"⚡"},prediction:{prompt:"How do the loops go?",choices:[{id:"deliver",emoji:"🎉",label:"Zip zips east, Bolt bolts west!",correct:!0},{id:"oops",emoji:"🌀",label:"Loopy confusion ahead…",correct:!1}]}},Q_={id:"rt-debug",worldId:"robot-town",title:"World 4: Robot Town",shortTitle:"Bolt’s Glass Garden",goalText:"Fix the plan — only Bolt rolls under glass!",cols:3,rows:3,start:{col:0,row:1,dir:"E"},botStart:{col:0,row:2,dir:"E"},blocked:[],zipBlocked:[{col:2,row:2}],items:[{id:"battery-a",kind:"battery",col:1,row:1},{id:"battery-b",kind:"battery",col:1,row:2}],goals:[{col:2,row:1,accepts:"battery"},{col:2,row:2,accepts:"battery"}],availableCommands:Ks,maxSlots:10,par:9,prefill:[{cmd:"moveRight"},{cmd:"grab"},{cmd:"moveRight"},{cmd:"drop"},{cmd:"moveDown"},{cmd:"moveLeft"},{cmd:"grab"},{cmd:"moveRight"},{cmd:"drop"}],brief:{title:"Bolt’s Glass Garden",text:"Copycat sent ZIP under the glass dome — bonk! Only Bolt fits. Fix it: Swap to Bolt before the second delivery!",emoji:"🐾"},prediction:{prompt:"Did the Swap save the day?",choices:[{id:"deliver",emoji:"🎉",label:"Bolt rolls under the glass — done!",correct:!0},{id:"oops",emoji:"🔔",label:"Still bonking the dome…",correct:!1}]}},tx={id:"rt-creative",worldId:"robot-town",title:"World 4: Robot Town",shortTitle:"Teamwork Towers",goalText:"Charge both towers your way — Swap earns a bonus star!",cols:6,rows:3,start:{col:0,row:1,dir:"E"},botStart:{col:3,row:1,dir:"E"},blocked:[],zipBlocked:[{col:5,row:2}],items:[{id:"battery-a",kind:"battery",col:1,row:0},{id:"battery-b",kind:"battery",col:4,row:2}],goals:[{col:5,row:0,accepts:"battery"},{col:5,row:2,accepts:"battery"}],availableCommands:[...Ks,"repeat"],maxSlots:14,par:13,bonusStar:"swap",brief:{title:"Teamwork Towers",text:"Two towers need power — one hides under glass. Split the work between Zip and Bolt however you like!",emoji:"🗼"},prediction:{prompt:"Will the towers light up?",choices:[{id:"deliver",emoji:"🏆",label:"Both towers glowing tonight!",correct:!0},{id:"oops",emoji:"🤔",label:"Let’s see what happens…",correct:!1}]}},ex=[Z_,K_,J_,Q_,tx],Js=["moveUp","moveDown","moveLeft","moveRight","grab","drop"],nx={id:"aa-1",worldId:"agent-academy",title:"World 5: Agent Academy",shortTitle:"Meet the Rule",goalText:"Collect every badge for the trophy!",cols:5,rows:3,start:{col:0,row:1,dir:"E"},blocked:[],items:[{id:"badge-1",kind:"badge",col:1,row:1},{id:"badge-2",kind:"badge",col:2,row:1},{id:"badge-3",kind:"badge",col:3,row:1}],goals:[{col:4,row:1,accepts:"badge"}],availableCommands:[...Js,"repeat"],maxSlots:8,par:5,collectAll:!0,ruleChoices:[{trigger:"badge",action:"grab"}],brief:{title:"Meet the Rule",text:"Your first HELPER RULE! “WHEN you step on a badge 🎖️ → grab it.” It works all by itself — just walk Zip to the trophy and drop!",emoji:"🎖️"},prediction:{prompt:"What does the helper rule do?",choices:[{id:"deliver",emoji:"🎖️",label:"Grabs every badge as Zip walks by!",correct:!0},{id:"oops",emoji:"💤",label:"Nothing — rules are sleepy…",correct:!1}]}},ix={id:"aa-2",worldId:"agent-academy",title:"World 5: Agent Academy",shortTitle:"Pick the Right Rule",goalText:"Badges only — mushrooms spoil the trophy!",cols:5,rows:3,start:{col:0,row:1,dir:"E"},blocked:[],items:[{id:"badge-1",kind:"badge",col:1,row:1},{id:"mushroom-1",kind:"mushroom",col:2,row:1},{id:"badge-2",kind:"badge",col:3,row:1}],goals:[{col:4,row:1,accepts:"badge"}],availableCommands:[...Js,"repeat"],maxSlots:8,par:5,collectAll:!0,ruleChoices:[{trigger:"badge",action:"grab"},{trigger:"mushroom",action:"grab"}],brief:{title:"Pick the Right Rule",text:"Two rules to choose from! “Grab badges 🎖️” or “Grab mushrooms 🍄”? Choose wisely — the trophy only loves badges.",emoji:"🤔"},prediction:{prompt:"With the badge rule, what reaches the trophy?",choices:[{id:"deliver",emoji:"🏆",label:"Only shiny badges!",correct:!0},{id:"oops",emoji:"🍄",label:"A sneaky mushroom…",correct:!1}]}},sx={id:"aa-3",worldId:"agent-academy",title:"World 5: Agent Academy",shortTitle:"Campus Laps",goalText:"Lap the track, collect the badges!",cols:6,rows:3,start:{col:0,row:0,dir:"E"},blocked:[],items:[{id:"badge-1",kind:"badge",col:1,row:0},{id:"mushroom-1",kind:"mushroom",col:2,row:0},{id:"badge-2",kind:"badge",col:3,row:0},{id:"mushroom-2",kind:"mushroom",col:4,row:0},{id:"badge-3",kind:"badge",col:5,row:0}],goals:[{col:5,row:2,accepts:"badge"}],availableCommands:[...Js,"repeat"],maxSlots:8,par:6,collectAll:!0,ruleChoices:[{trigger:"badge",action:"grab"},{trigger:"mushroom",action:"grab"}],brief:{title:"Campus Laps",text:"Badges AND mushrooms line the track. Your rule picks perfectly every lap — loop the walk and glide down to the trophy!",emoji:"🏟️"},prediction:{prompt:"How does the lap go?",choices:[{id:"deliver",emoji:"🎖️🎖️🎖️",label:"Three badges, zero mushrooms!",correct:!0},{id:"oops",emoji:"🍄",label:"Something yucky tags along…",correct:!1}]}},rx={id:"aa-debug",worldId:"agent-academy",title:"World 5: Agent Academy",shortTitle:"Copycat’s Blind Grab",goalText:"Fix the plan — let the rule do the work!",cols:5,rows:3,start:{col:0,row:1,dir:"E"},blocked:[],items:[{id:"badge-1",kind:"badge",col:1,row:1},{id:"mushroom-1",kind:"mushroom",col:2,row:1},{id:"badge-2",kind:"badge",col:3,row:1}],goals:[{col:4,row:1,accepts:"badge"}],availableCommands:[...Js,"repeat"],maxSlots:8,par:5,collectAll:!0,ruleChoices:[{trigger:"badge",action:"grab"}],prefill:[{cmd:"moveRight"},{cmd:"grab"},{cmd:"repeat",arg:3},{cmd:"moveRight"},{cmd:"drop"}],brief:{title:"Copycat’s Blind Grab",text:"Copycat grabs EVERYTHING — even the mushroom! Secret: your helper rule grabs badges for you. Take the grab tile OUT and let the rule shine!",emoji:"🐾"},prediction:{prompt:"Did the rule save the trophy?",choices:[{id:"deliver",emoji:"🎉",label:"Badges only — shiny and clean!",correct:!0},{id:"oops",emoji:"🍄",label:"Still a bit yucky…",correct:!1}]}},ox={id:"aa-creative",worldId:"agent-academy",title:"World 5: Agent Academy",shortTitle:"Academy Finals",goalText:"Collect every badge — fire your rule for a bonus star!",cols:6,rows:3,start:{col:0,row:0,dir:"E"},blocked:[{col:2,row:1}],items:[{id:"badge-1",kind:"badge",col:1,row:0},{id:"mushroom-1",kind:"mushroom",col:2,row:0},{id:"badge-2",kind:"badge",col:3,row:0},{id:"badge-3",kind:"badge",col:5,row:0},{id:"badge-4",kind:"badge",col:4,row:2},{id:"mushroom-2",kind:"mushroom",col:3,row:2},{id:"badge-5",kind:"badge",col:2,row:2}],goals:[{col:5,row:2,accepts:"badge"}],availableCommands:[...Js,"repeat"],maxSlots:12,par:11,collectAll:!0,bonusStar:"rule",ruleChoices:[{trigger:"badge",action:"grab"},{trigger:"mushroom",action:"grab"}],brief:{title:"Academy Finals",text:"The big exam! Badges hide all over campus. Plan your route, loop it, and let your rule scoop them all for the trophy!",emoji:"🏆"},prediction:{prompt:"Graduation day — do you pass?",choices:[{id:"deliver",emoji:"🎓",label:"Every badge on the trophy!",correct:!0},{id:"oops",emoji:"📚",label:"Back to studying…",correct:!1}]}},ax=[nx,ix,sx,rx,ox],mn=[...F_,...V_,...j_,...ex,...ax],wl="codebops.custom.v1";function ho(){try{const s=localStorage.getItem(wl);if(!s)return[];const t=JSON.parse(s);return Array.isArray(t)?t:[]}catch{return[]}}function lx(s){const t=ho().filter(e=>e.id!==s.id);t.push(s);try{localStorage.setItem(wl,JSON.stringify(t))}catch{}}function cx(s){try{localStorage.setItem(wl,JSON.stringify(ho().filter(t=>t.id!==s)))}catch{}}function hx(s,t,e,n,i){return{id:`custom-${Date.now()}`,worldId:"sparkle-meadow",title:"Imagination Island",shortTitle:s,goalText:"Deliver every berry to a star pad!",cols:5,rows:3,start:{...t,dir:"E"},blocked:e,items:n.map((r,o)=>({id:`strawberry-${o+1}`,kind:"strawberry",...r})),goals:i.map(r=>({...r,accepts:"strawberry"})),availableCommands:["moveUp","moveDown","moveLeft","moveRight","grab","drop"],maxSlots:12,par:12,brief:{title:s,text:"A level built by YOU! Guide Zip to every berry and stack them on the star pads.",emoji:"🏝️"},prediction:{prompt:"Will your creation work?",choices:[{id:"deliver",emoji:"🏆",label:"Every berry delivered!",correct:!0},{id:"oops",emoji:"🤔",label:"Let’s see what happens…",correct:!1}]}}}const Zc=["🌸","🌼","🌷","🌻","🌹","💐","🪻","🌺"];function dx(s){let t=s>>>0;return()=>{t|=0,t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}class ux{constructor(t,e,n){this.root=t,this.store=e,this.events=n}stops=[];sfx=mt;enter(){const t=this.root;t.classList.add("garden-screen"),T("div","garden-sky",t),T("div","garden-hill",t);const e=T("div","garden-header",t),n=T("button","circle-btn",e,"←");n.type="button",n.setAttribute("aria-label","Back"),n.addEventListener("click",()=>this.events.onBack()),T("h1",void 0,e,"Bop Garden");const i=Object.values(this.store.stars).reduce((d,u)=>d+u,0),r=this.store.daily.totalCompleted;T("div","garden-count",e,`🌼 ${i+r} flowers`);const o=T("div","garden-mascot zip",t);Fs(o,"./art/characters/zip/zip.svg").then(d=>{d&&this.stops.push(eo(d))});const a=T("div","garden-mascot mixy",t);Fs(a,"./art/characters/mixy/mixy.svg").then(d=>{d&&this.stops.push(eo(d))});const l=T("div","garden-field",t),c=Math.min(i+r,64);c===0&&T("div","garden-empty",l,"Earn stars to plant your first flower! 🌱");const h=dx(42);for(let d=0;d<c;d++){const u=d>=i,f=T("button",`garden-flower${u?" golden":""}`,l,u?"🌻":Zc[Math.floor(h()*Zc.length)]);f.type="button",f.setAttribute("aria-label",u?"Golden daily flower":"Star flower"),f.style.left=`${4+h()*92}%`,f.style.top=`${46+h()*48}%`,f.style.fontSize=`${26+h()*22}px`,f.style.animationDelay=`${h()*2.4}s`,f.addEventListener("click",()=>{this.sfx.play("grab"),f.classList.remove("pop"),f.offsetWidth,f.classList.add("pop")})}T("div","garden-note",t,i>0?`⭐ ${i} star flowers  ·  🌻 ${r} daily flowers`:"Play levels to grow your garden!")}dispose(){this.stops.forEach(t=>t()),this.stops=[]}}const Gi=5,Hi=3,na=["empty","item","goal","blocked","start"],fx={empty:"",item:"🍓",goal:"⭐",blocked:"🌳",start:"🐰"},px={empty:"tap to place a berry 🍓",item:"a berry! next: a star pad ⭐",goal:"a star pad! next: a bush 🌳",blocked:"a bush! next: Zip’s start 🐰",start:"Zip starts here! next: clear the tile"};class mx{constructor(t,e){this.root=t,this.events=e,this.cells=Array.from({length:Hi},()=>Array(Gi).fill("empty")),this.cells[1][0]="start",this.cells[1][2]="item",this.cells[1][4]="goal"}cells=[];cellEls=[];sfx=mt;buildLevel(){let t=null;const e=[],n=[],i=[];for(let o=0;o<Hi;o++)for(let a=0;a<Gi;a++){const l=this.cells[o][a];l==="start"&&(t={col:a,row:o}),l==="blocked"&&e.push({col:a,row:o}),l==="item"&&n.push({col:a,row:o}),l==="goal"&&i.push({col:a,row:o})}if(!t)return{error:"Place Zip’s start tile 🐰 first!"};if(n.length===0)return{error:"Add at least one berry 🍓 to collect!"};if(i.length===0)return{error:"Add a star pad ⭐ to deliver to!"};const r=this.cells.flat().filter(o=>o!=="empty").length;return{level:hx(`My Island #${r}`,t,e,n,i)}}enter(){const t=this.root;t.classList.add("editor-screen");const e=T("div","select-header editor-header",t),n=T("button","circle-btn",e,"←");n.type="button",n.setAttribute("aria-label","Back to levels"),n.addEventListener("click",()=>this.events.onBack()),T("h1",void 0,e,"🏝️ Imagination Island"),T("div","editor-tip",t,"Tap a tile to change what lives there!");const i=T("div","editor-grid",t);for(let h=0;h<Hi;h++){const d=T("div","editor-row",i);this.cellEls[h]=[];for(let u=0;u<Gi;u++){const f=T("button","editor-cell",d);f.type="button",f.setAttribute("aria-label",`Tile ${u+1},${h+1}`),f.addEventListener("click",()=>this.cycleCell(h,u,f)),this.cellEls[h][u]=f,this.paintCell(h,u)}}const r=T("div","editor-hint",t,""),o=T("div","editor-actions",t),a=T("button","mini-btn",o,"🧹 Clear");a.type="button",a.addEventListener("click",()=>{this.cells=Array.from({length:Hi},()=>Array(Gi).fill("empty")),this.cells[1][0]="start";for(let h=0;h<Hi;h++)for(let d=0;d<Gi;d++)this.paintCell(h,d);this.sfx.play("tap")});const l=T("button","mini-btn",o,"💾 Save");l.type="button",l.addEventListener("click",()=>{const{level:h,error:d}=this.buildLevel();if(d||!h){yn(t,`Oops — ${d}`),this.sfx.play("bump");return}lx(h),this.sfx.play("celebrate"),yn(t,"Saved! Find it on Imagination Island 💾"),this.events.onSaved()});const c=T("button","bop-btn editor-play",o);c.type="button",c.append("TEST IT!"),T("span","tri",c),c.addEventListener("click",()=>{const{level:h,error:d}=this.buildLevel();if(d||!h){yn(t,`Oops — ${d}`),this.sfx.play("bump");return}this.events.onPlay(h)}),this.hintEl=r}hintEl=null;cycleCell(t,e,n){const i=this.cells[t][e],r=na[(na.indexOf(i)+1)%na.length];if(r==="start")for(let o=0;o<Hi;o++)for(let a=0;a<Gi;a++)this.cells[o][a]==="start"&&(this.cells[o][a]="empty",this.paintCell(o,a));this.cells[t][e]=r,this.paintCell(t,e),this.sfx.play("tap"),n.classList.remove("pop"),n.offsetWidth,n.classList.add("pop"),this.hintEl&&(this.hintEl.textContent=px[r])}paintCell(t,e){const n=this.cellEls[t][e];if(!n)return;const i=this.cells[t][e];n.dataset.kind=i,n.textContent=fx[i]}dispose(){}}function gx(s,t,e,n){const i=t*Math.PI/180;return{id:s,pitchDeg:t,viewDir:{x:0,y:Math.sin(i),z:Math.cos(i)},fovFor:r=>r>=1.2?e:r>=.9?e+4:n}}const uo={bench:gx("bench",14,30,40)},Kc=new Map;function vx(s,t,e=.22){const n=`${s}:${t}:${e}`,i=Kc.get(n);if(i)return i;const r=t*.22,o=t-r,a=new zn,l=s*4;for(let d=0;d<=l;d++){const f=d/l*Math.PI*2,g=d%4,v=g===0?o:g===1||g===2?t:o,m=Math.cos(f)*v,p=Math.sin(f)*v;d===0?a.moveTo(m,p):a.lineTo(m,p)}a.closePath();const c=new Kr;c.absarc(0,0,t*.18,0,Math.PI*2,!0),a.holes.push(c);const h=new ni(a,{depth:e,bevelEnabled:!0,bevelThickness:.035,bevelSize:.035,bevelSegments:2});return h.center(),Kc.set(n,h),h}function ls(s={}){const{teeth:t=10,radius:e=.7,color:n="#ff9f2e",hubColor:i="#fff2d9"}=s,r=new nt,o=new It(vx(t,e),z(n));o.castShadow=o.receiveShadow=!0,o.name="gearBody",r.add(o);const a=new It(new Pt(e*.3,e*.3,.3,20),z(i));a.rotation.x=Math.PI/2,a.castShadow=!0,r.add(a);const l=new It(new Pt(e*.085,e*.085,.06,10),z("#16225c"));return l.rotation.x=Math.PI/2,l.position.set(0,e*.55,.17),r.add(l),r}function oe(s,t,e=0,n=0,i=0,r=!0,o=!0){const a=new It(s,t);return a.position.set(e,n,i),a.castShadow=r,a.receiveShadow=o,a}function _x(){const t=document.createElement("canvas");t.width=t.height=256;const e=t.getContext("2d");e.fillStyle="#3a55b8",e.fillRect(0,0,256,256),e.strokeStyle="rgba(22,30,80,0.45)",e.lineWidth=5;for(let i=0;i<=2;i++)e.beginPath(),e.moveTo(0,i*128),e.lineTo(256,i*128),e.stroke(),e.beginPath(),e.moveTo(i*128,0),e.lineTo(i*128,256),e.stroke();e.fillStyle="rgba(255,255,255,0.05)",e.fillRect(6,6,116,56),e.fillRect(134,134,116,56);const n=new Vs(t);return n.wrapS=n.wrapT=ns,n.repeat.set(7,5),n.colorSpace=Ue,n}function xx(){const e=document.createElement("canvas");e.width=256,e.height=128;const n=e.getContext("2d");n.fillStyle="#2c3f8f",n.fillRect(0,0,256,128);const i=62,r=28,o=6;for(let l=0;l<4;l++){const c=l%2===0?0:-34;for(let h=-1;h<5;h++){const d=c+h*(i+o)+o/2,u=l*(r+o)+o/2;n.fillStyle=(l+h)%3===0?"#4a72dd":"#4168d2",n.beginPath(),n.roundRect(d,u,i,r,5),n.fill(),n.fillStyle="rgba(255,255,255,0.14)",n.beginPath(),n.roundRect(d+3,u+3,i-6,8,4),n.fill()}}const a=new Vs(e);return a.wrapS=a.wrapT=ns,a.repeat.set(6,4),a.colorSpace=Ue,a}function Jc(){const e=document.createElement("canvas");e.width=256,e.height=128;const n=e.getContext("2d");n.fillStyle="#1d2f7d",n.fillRect(0,0,256,128),n.strokeStyle="rgba(127,196,255,0.75)",n.lineWidth=3;const i=(o,a,l,c)=>{n.beginPath(),n.arc(o,a,l,0,Math.PI*2),n.stroke(),n.beginPath(),n.arc(o,a,l*.35,0,Math.PI*2),n.stroke();for(let h=0;h<c;h++){const d=h/c*Math.PI*2;n.beginPath(),n.moveTo(o+Math.cos(d)*l,a+Math.sin(d)*l),n.lineTo(o+Math.cos(d)*(l+7),a+Math.sin(d)*(l+7)),n.stroke()}};i(52,62,26,8),i(120,50,18,7),i(180,74,30,9),n.beginPath(),n.arc(228,84,6,0,Math.PI*2),n.stroke(),n.beginPath(),n.moveTo(234,84),n.lineTo(234,48),n.lineTo(246,52),n.stroke();const r=new Vs(e);return r.colorSpace=Ue,r}class fo{constructor(t="showcase"){this.layout=t,this.group.name="gearworks-garage";const e=oe(new _e(30,.5,18),new Jt({map:_x()}),0,-.25,2,!1,!0);this.group.add(e);const n=oe(new _e(30,10,.5),new Jt({map:xx()}),0,5,-6.5,!1,!0);this.group.add(n),this.group.add(oe(new gt(30,2.2,.7,2,.1),z("#1b2664"),0,1,-6.35,!1,!0)),this.group.add(oe(new _e(30,.28,.75),z("#39406e"),0,2.2,-6.3,!1,!1));const i=oe(new _e(5.4,2.7,.12),new Jt({map:Jc()}),-1.2,6.2,-6.2,!1,!1);this.group.add(i),this.group.add(oe(new gt(5.8,3.1,.1,2,.05),z("#c9a45c"),-1.2,6.2,-6.26,!1,!1));const r=oe(new _e(3.4,1.9,.12),new Jt({map:Jc()}),9.4,6,-6.2,!1,!1);r.rotation.z=-.03,this.group.add(r);const o=oe(new gt(4.6,3,.2,2,.08),z("#d9a45c"),-8.6,5.9,-6.2,!1,!1);this.group.add(o);const a=z("#aab3c8"),l=new nt;l.add(oe(new gt(.3,1.5,.14,1,.06),a,0,0,0,!1,!1)),l.add(oe(new Le(.3,.12,8,14,Math.PI*1.4),a,0,.85,0,!1,!1)),l.position.set(-9.6,5.9,-6.05),l.rotation.z=.2,this.group.add(l);for(const[d,u]of[[-.2,"#e05a3a"],[.6,"#8b4ddb"]]){const f=new nt;f.add(oe(new Pt(.07,.07,1,8),a,0,-.3,0,!1,!1)),f.add(oe(new gt(.26,.7,.2,1,.08),z(u),0,.45,0,!1,!1)),f.position.set(-8+d,5.9,-6.05),this.group.add(f)}for(const d of[-6.5,6.5]){const u=new nt;u.add(oe(new Pt(.06,.06,3.6,6),z("#39406e"),0,7.4,0,!1,!1));const f=oe(new $e(.9,.8,18,1,!0),z("#2e7ce6"),0,5.4,0,!1,!1);u.add(f);const g=oe(new Dt(.3,12,8),new Jt({color:"#ffe9a8",emissive:"#ffd23e",emissiveIntensity:1.1}),0,5.15,0,!1,!1);u.add(g),this.lampGlows.push(g);const v=new Cf("#ffd9a0",14,12,2);v.position.set(0,4.9,.6),u.add(v),u.position.set(d,0,-3.5),this.group.add(u)}if(this.layout!=="liftBay"){const d=new nt;d.add(oe(new gt(13.5,.7,5.2,3,.18),z("#d9a45c"),0,1.55,0)),d.add(oe(new gt(13.9,.32,5.6,2,.12),z("#39406e"),0,1.15,0));for(const[u,f]of[[-6.2,-2.1],[6.2,-2.1],[-6.2,2.1],[6.2,2.1]])d.add(oe(new gt(.55,1.2,.55,1,.1),z("#2c3f8f"),u,.55,f));d.position.set(0,0,-1.5),this.group.add(d)}this.layout==="showcase"&&this.buildShowcase(1.9);for(const[d,u,f]of[[-8.2,2.8,.5],[7.6,3.4,.42]]){const g=ls({color:"#8a94ad",radius:f,teeth:9,hubColor:"#c3c9d4"});g.rotation.x=-Math.PI/2,g.position.set(d,.14,u),this.group.add(g)}const h=new nt;h.add(oe(new gt(1.4,.9,1,2,.08),z("#c9843c"),0,.45,0)),h.add(oe(new gt(1.5,.16,1.1,1,.05),z("#a86a2c"),0,.9,0)),h.position.set(9.6,0,.4),h.rotation.y=-.3,this.group.add(h)}group=new nt;spinners=[];lampGlows=[];buildShowcase(t){const e=new nt;e.add(oe(new gt(1.7,1.3,1.2,3,.22),z("#2f6fe0"),0,.75,0)),e.add(oe(new Pt(.5,.55,.5,16),z("#4a8cf0"),0,1.55,0,!0,!1));const n=oe(new Pt(.18,.18,.8,12),z("#aab3c8"),1.05,.75,0);n.rotation.z=Math.PI/2,e.add(n),e.add(oe(new gt(2,.24,1.5,1,.1),z("#1b2664"),0,.06,0));const i=new zn;i.moveTo(.09,.3),i.lineTo(-.12,-.02),i.lineTo(0,-.02),i.lineTo(-.09,-.3),i.lineTo(.14,.06),i.lineTo(.02,.06),i.closePath();const r=new It(new ni(i,{depth:.05,bevelEnabled:!1}),z("#ffd23e"));r.scale.setScalar(1.4),r.position.set(0,.8,.63),e.add(r),e.position.set(-4.6,t,-1.5),this.group.add(e);const o=[[-2.2,"#ff9f2e",.72,1],[-.6,"#57c14e",.62,-1],[.9,"#a06bff",.78,1]];for(const[h,d,u,f]of o){const g=oe(new gt(.34,1.1,.5,1,.08),z("#39406e"),h,t+.55,-1.72);this.group.add(g);const v=ls({color:d,radius:u,teeth:Math.round(u*14)});v.position.set(h,t+1.15,-1.4),this.group.add(v),this.spinners.push({node:v,speed:f*.6*(.7/u)})}const a=new nt;a.add(oe(new gt(.5,2.2,.8,2,.14),z("#e04a3a"),-.85,1.1,0)),a.add(oe(new gt(.5,2.2,.8,2,.14),z("#e04a3a"),.85,1.1,0)),a.add(oe(new gt(2.3,.55,.9,2,.14),z("#c9382a"),0,2.35,0)),a.add(oe(new Pt(.16,.16,.9,10),z("#aab3c8"),0,1.75,0)),a.add(oe(new Pt(.45,.45,.22,16),z("#39406e"),0,1.3,0));const l=new It(new Pt(.52,.46,.7,18,1,!0),new Jt({color:"#cfeeff",transparent:!0,opacity:.4}));l.position.set(0,.55,0),a.add(l);for(let h=0;h<5;h++){const d=h/5*Math.PI*2;a.add(oe(new Dt(.14,10,8),z("#e8384f"),Math.cos(d)*.22,.32+h%2*.16,Math.sin(d)*.22,!1,!1))}const c=new It(new Le(.4,.09,8,18),z("#39406e"));c.rotation.x=Math.PI/2,c.position.set(0,2.75,0),a.add(c),this.spinners.push({node:c,speed:.35}),a.position.set(3.6,t,-1.5),this.group.add(a)}benchAnchor(){return new I(-.4,1.9,-1.5)}frameCorners(){return[new I(-7.6,.3,2.6),new I(7.6,.3,2.6),new I(-7.6,5,-1.5),new I(7.6,5,-1.5)]}frameCenter(){return new I(0,2.3,-.6)}zipSpot(){return new I(-5.6,.05,3.8)}mixySpot(){return new I(6,.05,3.8)}update(t,e){for(const n of this.spinners)n.node.rotation.z+=t*n.speed;for(let n=0;n<this.lampGlows.length;n++){const i=this.lampGlows[n].material;i.emissiveIntensity=1+Math.sin(e*1.6+n*2.1)*.15}}}function xn(s,t,e=0,n=0,i=0,r=!0,o=!0){const a=new It(s,t);return a.position.set(e,n,i),a.castShadow=r,a.receiveShadow=o,a}class yx{group=new nt;gear;lamp;needle;arrow;on=!1;dir="cw";speed=2;workBoost=0;constructor(){this.group.name="motor-rig",this.group.add(xn(new gt(7.4,.3,2.4,2,.1),z("#1b2664"),0,.15,0));const t=new nt;t.add(xn(new gt(2.1,1.6,1.4,3,.24),z("#2f6fe0"),0,1.05,0)),t.add(xn(new Pt(.62,.68,.5,18),z("#4a8cf0"),0,2,0,!0,!1));const e=new zn;e.moveTo(.09,.3),e.lineTo(-.12,-.02),e.lineTo(0,-.02),e.lineTo(-.09,-.3),e.lineTo(.14,.06),e.lineTo(.02,.06),e.closePath();const n=new It(new ni(e,{depth:.05,bevelEnabled:!1}),z("#ffd23e"));n.scale.setScalar(1.6),n.position.set(0,1.05,.74),t.add(n);const i=xn(new Pt(.2,.2,1,12),z("#aab3c8"),1.55,1.05,0);i.rotation.z=Math.PI/2,t.add(i),this.lamp=xn(new Dt(.26,14,10),new Jt({color:"#8a94ad",emissive:"#000000",emissiveIntensity:0}),-.6,2.05,.35,!1,!1),t.add(this.lamp),t.position.set(-2.2,.3,0),this.group.add(t);const r=xn(new gt(.44,1.5,.6,1,.1),z("#39406e"),.9,1,-.25);this.group.add(r),this.gear=ls({color:"#ff9f2e",radius:1.15,teeth:14}),this.gear.position.set(.9,1.75,.12),this.group.add(this.gear),this.arrow=new nt;const o=new It(new Le(.52,.09,8,24,Math.PI*1.2),new Jt({color:"#ffffff",emissive:"#7fc4ff",emissiveIntensity:.3}));this.arrow.add(o);const a=new It(new $e(.2,.42,10),o.material);a.position.set(Math.cos(Math.PI*1.2)*.52,Math.sin(Math.PI*1.2)*.52,0),a.rotation.z=Math.PI*1.2-Math.PI/2,this.arrow.add(a),this.arrow.position.set(.9,3.6,.1),this.arrow.scale.x=-1,this.group.add(this.arrow);const l=new nt,c=new It(new Ws(.62,24,0,Math.PI),z("#fff6e3"));c.castShadow=!1,l.add(c);const h=new It(new Le(.62,.07,8,24,Math.PI),z("#39406e"));l.add(h);for(const[f,g]of[[Math.PI*.83,"#57c14e"],[Math.PI*.5,"#ffd23e"],[Math.PI*.17,"#e8384f"]]){const v=xn(new gt(.1,.2,.06,1,.02),z(g),Math.cos(f)*.48,Math.sin(f)*.48,.06,!1,!1);v.rotation.z=f-Math.PI/2,l.add(v)}this.needle=new nt;const d=xn(new gt(.07,.5,.05,1,.02),z("#16225c"),0,.22,0,!1,!1);this.needle.add(d),this.needle.add(xn(new Pt(.09,.09,.08,10),z("#16225c"),0,0,.02,!1,!1)),this.needle.position.z=.06,l.add(this.needle);const u=new nt;u.add(l),l.rotation.x=0,u.position.set(3.15,1.15,.2),u.add(xn(new gt(1.5,.9,.3,2,.08),z("#2c3f8f"),0,-.32,-.12)),this.group.add(u),this.applySpeedNeedle(),this.applyLamp()}setOn(t){this.on=t,this.applyLamp()}setDir(t){this.dir=t,this.arrow.scale.x=t==="cw"?-1:1}setSpeed(t){this.speed=t,this.applySpeedNeedle()}reset(){this.setOn(!1),this.setDir("cw"),this.setSpeed(2),this.workBoost=0}workPulse(){this.workBoost=1}tapNudge(){this.workBoost=Math.max(this.workBoost,.55)}applyLamp(){const t=this.lamp.material;this.on?(t.color.set("#7dee8e"),t.emissive.set("#3ed35f"),t.emissiveIntensity=1):(t.color.set("#8a94ad"),t.emissive.set("#000000"),t.emissiveIntensity=0)}applySpeedNeedle(){const t=this.speed===1?Math.PI*.33:this.speed===2?0:-Math.PI*.33;this.needle.rotation.z=t}update(t){const n=((this.on?1:0)*this.speed*1.4+this.workBoost*this.speed*3.2)*(this.dir==="cw"?-1:1);if(this.gear.rotation.z+=t*n,this.workBoost=Math.max(0,this.workBoost-t*1.4),this.on){const i=this.lamp.material;i.emissiveIntensity=.85+Math.sin(performance.now()/240)*.2}}}class po{root;list;hint;machineLine;constructor(t){this.root=T("aside","gw-trail",t),this.root.setAttribute("aria-label","Think Trail — what happened, step by step");const e=T("div","gw-trail-head",this.root);T("span","gw-trail-title",e,"THINK TRAIL");const n=T("button","gw-trail-toggle",e,"▾");n.type="button",n.setAttribute("aria-label","Show or hide the Think Trail"),n.addEventListener("click",()=>{const i=this.root.classList.toggle("collapsed");n.textContent=i?"▸":"▾"}),this.machineLine=T("div","gw-machine-line",this.root),this.machineLine.hidden=!0,this.list=T("div","gw-trail-list",this.root),this.hint=T("div","gw-trail-hint",this.root),this.setEmpty(),window.innerWidth<=700&&(this.root.classList.add("collapsed"),n.textContent="▸")}setMachineLine(t){this.machineLine.textContent=t,this.machineLine.hidden=!1}setEmpty(){this.list.innerHTML="";const t=T("div","gw-trail-empty",this.list);T("span",void 0,t,"🔍"),T("span",void 0,t,"When you press BOP!, every step shows up here."),this.hint.textContent="",this.hint.hidden=!0}setSteps(t,e){this.list.innerHTML="";for(const n of t){const i=T("div","gw-trail-step",this.list);T("span","gw-ts-num",i,String(n.n)),T("span","gw-ts-icon",i,n.icon),T("span","gw-ts-text",i,n.text),n.verdict&&T("span",`gw-ts-verdict ${n.verdict}`,i,n.verdict==="ok"?"✓":"✗")}this.hint.textContent=e??"",this.hint.hidden=!e}dispose(){this.root.remove()}}function Qc(s){return{gears:s.nodes.map(t=>t.fixed),belts:s.links.map(()=>!1)}}function bx(s,t,e){return{gears:s.gears.map((n,i)=>i===t?e:n),belts:s.belts}}function wx(s,t,e){return{gears:s.gears,belts:s.belts.map((n,i)=>i===t?e:n)}}function rd(s,t,e){const n=s.nodes.length,i=new Array(n).fill(!1),r=new Array(n).fill(null);let o=-1,a=t.gears[0],l="cw";a&&(i[0]=!0,r[0]=l);for(let c=0;c<s.links.length&&a;c++){const h=s.links[c],d=t.gears[c+1];if(!((h==="mesh"||t.belts[c])&&d)){o=c,a=!1;break}l=h==="mesh"?l==="cw"?"ccw":"cw":l,i[c+1]=!0,r[c+1]=l}return{turning:i,dirs:r,firstBrokenLink:o,reachesTarget:i[n-1]===!0}}function Mx(s){let t="cw";for(const e of s.links)e==="mesh"&&(t=t==="cw"?"ccw":"cw");return t}function th(s){return{gears:s.nodes.filter(t=>!t.fixed).length,belts:s.links.filter(t=>t==="beltSlot").length}}function eh(s,t){return s.nodes.every((e,n)=>e.fixed||t.gears[n])&&s.links.every((e,n)=>e!=="beltSlot"||t.belts[n])}function Sx(s,t){const e=rd(s,t);if(e.reachesTarget)return[];const n=e.firstBrokenLink;return n<0?["The motor gear is missing!"]:s.links[n]==="beltSlot"&&!t.belts[n]?[`Power stops after wheel ${n+1} — stretch a BELT to the next wheel!`]:[`Anchor ${n+1} is empty — tap it to place a gear!`]}function Tx(){return{gearTurns:0,wound:!1,bellRings:0,ringFloors:[],clunks:0,floor:0,actions:0}}const Ur=40,io=2,od=4;function Ex(s,t,e){const n=t.topFloor??0;let i=Tx();const r=[];let o=!1,a=!1;const l=(d,u)=>{if(!(i.actions>=Ur))switch(r.push({type:"commandStart",index:u}),d){case"glTurnGear":i={...i,gearTurns:i.gearTurns+1,wound:!0,actions:i.actions+1},r.push({type:"gearTurn",total:i.gearTurns});break;case"glRingBell":e==="gearBell"&&!i.wound?(i={...i,clunks:i.clunks+1,actions:i.actions+1},r.push({type:"bellClunk"})):(i={...i,wound:!1,bellRings:i.bellRings+1,ringFloors:[...i.ringFloors,i.floor],actions:i.actions+1},r.push({type:"bellRing",total:i.bellRings,floor:i.floor}));break;case"glLiftUp":i.floor>=n?(i={...i,actions:i.actions+1},r.push({type:"liftBump",at:"top"})):(i={...i,floor:i.floor+1,actions:i.actions+1},r.push({type:"liftMove",dir:"up",from:i.floor-1,to:i.floor}));break;case"glLiftDown":i.floor<=0?(i={...i,actions:i.actions+1},r.push({type:"liftBump",at:"bottom"})):(i={...i,floor:i.floor-1,actions:i.actions+1},r.push({type:"liftMove",dir:"down",from:i.floor+1,to:i.floor}));break}},c=d=>{const u=[];for(let f=d-1;f>=0;f--){const g=s[f];if(g.cmd==="glRepeat")break;u.unshift({cmd:g.cmd,source:f})}return u},h=new Set;for(let d=0;d<s.length;d++)if(s[d].cmd==="glRepeat")for(const u of c(d))h.add(u.source);for(let d=0;d<s.length;d++){if(i.actions>=Ur){o=!0;break}if(h.has(d))continue;const u=s[d];if(u.cmd==="glRepeat"){const f=c(d);if(f.length===0){r.push({type:"loopFail",index:d});continue}a=!0;const g=Math.min(od,Math.max(io,u.arg??io));r.push({type:"loopStart",index:d,count:g});for(let v=1;v<=g&&i.actions<Ur;v++){r.push({type:"loopIter",index:d,iter:v,count:g});for(const m of f)l(m.cmd,m.source)}r.push({type:"loopEnd",index:d});continue}l(u.cmd,d)}return i.actions>=Ur&&(o=!0),r.push(o?{type:"overflow"}:{type:"done"}),{success:Ax(t,i),events:r,finalState:i,overflowed:o,usedLoop:a,actionsRun:i.actions}}function Ax(s,t){return!(s.needRings!==void 0&&t.bellRings<s.needRings||s.needTopRing&&!t.ringFloors.includes(s.topFloor??0))}function Rx(s,t){const e=[];if(s.needRings!==void 0&&t.bellRings<s.needRings&&e.push(t.bellRings===0?"The bell never rang — it needs a RING BELL after a TURN GEAR!":`The bell rang ${t.bellRings} of ${s.needRings} times — a Repeat ×${s.needRings} can do the rest!`),t.clunks>0&&e.push("CLUNK! The bell had no power — TURN GEAR winds it up before each ring."),s.needTopRing&&!t.ringFloors.includes(s.topFloor??0)){const n=s.topFloor??0;t.floor<n&&t.bellRings===0?e.push(`The lift stopped at floor ${t.floor} — the berries go to floor ${n}!`):t.ringFloors.length>0?e.push(`The bell rang on floor ${t.ringFloors[t.ringFloors.length-1]} — ring it at the TOP (floor ${n})!`):e.push(`Ring the bell at the top (floor ${n}) to deliver the berries!`)}return e}const ia=3,Cx=2,Lx=8,sa=30;function Px(){return{tick:0,beltOn:!1,nextArrival:-1,berriesGrabbed:0,snaps:0,missed:0,gateOpened:!1,warned:!1}}function Vi(s,t=s.tick){return s.nextArrival>=0&&t>=s.nextArrival&&t<s.nextArrival+Cx}function Ix(s,t,e={}){const n=e.gearTurning??!1;let i=Px();const r=[];let o=!1,a=!1;const l=()=>{const c=Vi(i);i={...i,tick:i.tick+1},i.nextArrival>=0&&i.tick===i.nextArrival&&r.push({type:"berryArrive",tick:i.tick}),c&&!Vi(i)&&(i={...i,missed:i.missed+1,nextArrival:i.beltOn?i.tick+ia:-1},r.push({type:"berryMissed"}))};for(let c=0;c<s.length;c++){if(i.tick>=sa){o=!0;break}const h=s[c];if(a){a=!1,r.push({type:"skipped",index:c});continue}switch(r.push({type:"commandStart",index:c}),h.cmd){case"gsStartBelt":i.beltOn?(r.push({type:"noop",reason:"beltAlreadyOn"}),l()):(i={...i,beltOn:!0,nextArrival:i.tick+ia},r.push({type:"beltStart"}),l());break;case"gsWait":l(),r.push({type:"waitTick",sensorOn:Vi(i)});break;case"gsWaitUntil":{r.push({type:"waitUntilStart"});let d=0;for(;!Vi(i)&&d<Lx&&i.tick<sa;)l(),d++;Vi(i)?r.push({type:"waitUntilMet",slept:d}):r.push({type:"waitUntilGaveUp"});break}case"gsGrab":Vi(i)?(i={...i,berriesGrabbed:i.berriesGrabbed+1,nextArrival:i.beltOn?i.tick+ia:-1},r.push({type:"grab",total:i.berriesGrabbed})):(i={...i,snaps:i.snaps+1},r.push({type:"grabSnap"})),l();break;case"gsIfTurning":case"gsIfStill":{const d=h.cmd==="gsIfTurning"?n:!n;r.push({type:"guard",cond:h.cmd==="gsIfTurning"?"turning":"still",holds:d}),d||(a=!0),l();break}case"gsOpenGate":i={...i,gateOpened:!0},r.push({type:"gateOpen",wrong:t==="workshop"&&!n}),l();break;case"gsWarnLight":i={...i,warned:!0},r.push({type:"warnLight",wrong:t==="workshop"&&n}),l();break}}return i.tick>=sa&&(o=!0),r.push(o?{type:"overflow"}:{type:"done"}),{events:r,finalState:i,overflowed:o}}function Dx(s,t){return t.berriesGrabbed>=s.needBerries}function Ux(s,t){const e=[];return t.beltOn||e.push("The belt never started — no berries will ever arrive!"),t.snaps>0&&e.push("SNAP — the claw closed on air! WAIT UNTIL the eye sees the berry, then grab."),t.missed>0&&e.push("A berry rode right past! Grab while the eye is green — it only waits 2 ticks."),t.beltOn&&t.snaps===0&&t.missed===0&&t.berriesGrabbed<s.needBerries&&e.push("The plan ended before the grab — add a GRAB after the wait!"),e}function Nx(s,t){return t?s.gateOpened&&!s.warned:s.warned&&!s.gateOpened}function kx(s,t){const e=[];return t?(s.gateOpened||e.push("The gear IS turning but the gate stayed shut — IF TURNING should open it!"),s.warned&&e.push("False alarm! The warning light shone while the gear was running fine.")):(s.warned||e.push("The gear is STILL but nobody was warned — IF STILL should light the warning!"),s.gateOpened&&e.push("The gate opened with no power — guard it with IF TURNING!")),e}const Fx={id:"gw-motor-start",title:"Gearworks Garage",shortTitle:"Motor Start",family:"bench",goalText:"Start the motor, let it work, then stop it safely!",emoji:"🔌",brief:{title:"Wake up the Motor!",text:"This little motor turns the big gear — but someone must tell it what to do! Start it, WAIT while it works, then stop it so it can rest. Machines love a safe stop!",emoji:"🔌"},commands:["gwStart","gwWait","gwStop"],maxSlots:5,par:3,goal:{minRunTicks:1,endStopped:!0},bonus:{id:"waitTwice",text:"Let it work for TWO waits"},coachHint:"Try: START → WAIT → STOP."},Ox={id:"gw-motor-programmer",title:"Gearworks Garage",shortTitle:"Motor Programmer",family:"bench",goalText:"Make the gear spin FAST, then spin BACK — and stop safely!",emoji:"🎛️",brief:{title:"You are the Motor Programmer!",text:"Now the motor listens to the speed dial and direction tiles. Make the gear whiz FAST, make it spin BACK the other way, and finish with a safe STOP. Tap the badge on a Speed tile to change it!",emoji:"🎛️"},commands:["gwStart","gwWait","gwStop","gwSetSpeed","gwSpinCw","gwSpinCcw"],maxSlots:9,par:7,goal:{minRunTicks:2,endStopped:!0,needFastRun:!0,needCcwRun:!0},bonus:{id:"triedSlowAndFast",text:"Try the whole dial: run on Slow AND Fast"},coachHint:"Try: START → SPEED ×3 → WAIT → SPIN BACK → WAIT → STOP."},Bx=[Fx,Ox];function zx(s,t,e){switch(s.id){case"waitTwice":return e>=2;case"triedSlowAndFast":return t[1]>=1&&t[3]>=1}}const Gx={id:"gw-gear-train",title:"Gearworks Garage",shortTitle:"Gear Train",family:"bench",goalText:"Connect the gears so the motor rings the bell!",emoji:"⚙️",brief:{title:"Build a Gear Train!",text:"The motor gear spins — but the bell is far away! Tap the glowing spots to place gears until every tooth touches. Watch closely: when gear teeth mesh, each gear spins the OPPOSITE way from its neighbor!",emoji:"⚙️"},chain:{nodes:[{fixed:!0},{fixed:!1},{fixed:!1},{fixed:!0}],links:["mesh","mesh","mesh"]},targetName:"the bell",bonusText:"Test the machine before it is finished",coachHint:"Every empty spot needs a gear — teeth must touch teeth!",prediction:{prompt:"The motor gear spins FORWARD ⟳. Which way will the BELL gear spin?"}},Hx={id:"gw-belt-builder",title:"Gearworks Garage",shortTitle:"Belt Builder",family:"bench",goalText:"Use gears AND a belt to ring the bell!",emoji:"🔗",brief:{title:"Stretch a Belt!",text:"Some wheels are too far apart for teeth to touch — that is a job for a BELT! A belt carries the spin across the gap and keeps it turning the SAME way. Meshed teeth flip the direction; belts do not. Build the chain and watch the difference!",emoji:"🔗"},chain:{nodes:[{fixed:!0},{fixed:!1},{fixed:!1},{fixed:!0}],links:["mesh","beltSlot","mesh"]},targetName:"the bell",bonusText:"Test the machine before it is finished",coachHint:"Gears go on the glowing spots — the belt stretches across the wide gap!",prediction:{prompt:"The motor gear spins FORWARD ⟳. Which way will the BELL gear spin?"}},Vx=[Gx,Hx];function Wx(s){const t=Mx(s.chain);return[{emoji:"⟳",label:"Forward — same as the motor",correct:t==="cw"},{emoji:"⟲",label:"Backward — the other way",correct:t==="ccw"}]}const Xx={id:"gw-gear-loop",title:"Gearworks Garage",shortTitle:"Gear Loop",family:"bench",goalText:"Ring the bell 4 times — turn the gear to wind it first!",emoji:"🔁",brief:{title:"The Gear Loop Challenge!",text:"This bell machine needs TURN GEAR to wind up, then RING BELL to ding — four times! You can write it the long way… or put TURN GEAR + RING BELL before a REPEAT ×4 tile and let the loop do it. Loops make plans shorter AND easier to change!",emoji:"🔁"},machine:"gearBell",commands:["glTurnGear","glRingBell","glRepeat"],maxSlots:10,par:3,goal:{needRings:4},bonus:{kind:"bothWays",text:"Win it the long way AND the loop way"},coachHint:"Tiles before a REPEAT tile go inside the loop — Repeat ×4 runs them four times!"},$x={id:"gw-loop-lift",title:"Gearworks Garage",shortTitle:"Loop Lift",family:"bench",goalText:"Lift the berries to floor 3 and ring the delivery bell!",emoji:"🛗",brief:{title:"Loop Lift!",text:"The berry basket rides the lift — but the kitchen is on floor 3! LIFT UP climbs one floor at a time. Put LIFT UP before a REPEAT ×3 and the loop climbs the whole way. Ring the bell AT THE TOP to deliver!",emoji:"🛗"},machine:"lift",commands:["glLiftUp","glLiftDown","glRingBell","glRepeat"],maxSlots:8,par:3,goal:{topFloor:3,needTopRing:!0},bonus:{kind:"roundTrip",text:"Bring the lift back down for the next load"},coachHint:"LIFT UP then Repeat ×3 climbs three floors — then RING BELL at the top!"},Yx=[Xx,$x],qx={id:"gw-wait-berry",title:"Gearworks Garage",shortTitle:"Wait for the Berry",family:"bench",goalText:"Wait until the eye sees the berry — then grab it!",emoji:"👁️",brief:{title:"Wait for the Berry!",text:"The belt brings a berry — but not right away! The eye sensor turns green the moment the berry arrives, and it only stays for 2 ticks. Grab too soon and the claw snaps on air. WAIT UNTIL sleeps exactly until the eye sees it — no counting needed!",emoji:"👁️"},machine:"berry",commands:["gsStartBelt","gsWait","gsWaitUntil","gsGrab"],maxSlots:8,par:3,berryGoal:{needBerries:1},bonus:{kind:"secondBerry",text:"The belt keeps going — grab a SECOND berry"},coachHint:"START BELT, then WAIT UNTIL the eye turns green, then GRAB!"},jx={id:"gw-sensor-workshop",title:"Gearworks Garage",shortTitle:"Sensor Workshop",family:"bench",goalText:"Gear turning → open the gate. Gear still → warning light!",emoji:"🚦",brief:{title:"The Sensor Workshop!",text:"TAP THE BIG GEAR to set it spinning or still — that is the machine's INPUT. The eye sensor watches it. IF TURNING does the next tile only when the gear spins; IF STILL only when it does not. Make the machine do the right thing for BOTH settings!",emoji:"🚦"},machine:"workshop",commands:["gsIfTurning","gsOpenGate","gsIfStill","gsWarnLight"],maxSlots:6,par:4,bonus:{kind:"bothInputs",text:"Test it with the gear turning AND still"},coachHint:"An IF tile guards the very next tile — pair each action with the right IF!"},Zx=[qx,jx],nh={emoji:"⚙️",name:"Gearworks Garage"},Kx='<path d="M8 5 L19 12 L8 19 Z"/>',Jx='<rect x="6.5" y="6.5" width="11" height="11" rx="2.5"/>',Qx='<g fill="none" stroke="currentColor" stroke-width="2.7" stroke-linecap="round"><path d="M6.2 9.4 A7.2 7.2 0 0 1 18.4 8.2"/></g><path d="M19.6 4.4 L19.9 9.4 L14.9 8.7 Z"/><path d="M12 14.5 a3 3 0 1 0 .01 0" fill="none" stroke="currentColor" stroke-width="2.4"/>',ty='<g fill="none" stroke="currentColor" stroke-width="2.7" stroke-linecap="round"><path d="M17.8 9.4 A7.2 7.2 0 0 0 5.6 8.2"/></g><path d="M4.4 4.4 L4.1 9.4 L9.1 8.7 Z"/><path d="M12 14.5 a3 3 0 1 0 .01 0" fill="none" stroke="currentColor" stroke-width="2.4"/>',ad='<circle cx="12" cy="12" r="8.4" fill="none" stroke="currentColor" stroke-width="2.6"/><g stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M12 7.4 V12 L15.2 14.2"/></g>',ey='<path d="M3.5 15.5 a8.5 8.5 0 0 1 17 0" fill="none" stroke="currentColor" stroke-width="2.7" stroke-linecap="round"/><g stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M5.4 11.2 L7 12.2"/><path d="M12 7.6 V9.4"/><path d="M18.6 11.2 L17 12.2"/></g><path d="M12 16.5 L16.2 10.4 L13.4 15.1 Z" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"/><circle cx="12" cy="16.2" r="1.9"/>',ny={gwStart:{label:"Start",spoken:"Start the motor",tone:"start",icon:Kx},gwStop:{label:"Stop",spoken:"Stop the motor",tone:"stop",icon:Jx},gwSpinCw:{label:"Spin",spoken:"Spin clockwise",tone:"rotate",icon:Qx},gwSpinCcw:{label:"Spin Back",spoken:"Spin counterclockwise",tone:"rotate",icon:ty},gwSetSpeed:{label:"Speed",spoken:"Set the motor speed — tap the badge to change it",tone:"move",icon:ey},gwWait:{label:"Wait",spoken:"Wait and let the machine work",tone:"wait",icon:ad}},ra={1:"Slow",2:"Medium",3:"Fast"},iy='<path d="M12 3.2 L13.4 5.4 A6.8 6.8 0 0 1 15.4 6.2 L18 5.5 L19.6 8.3 L17.8 10.2 A6.8 6.8 0 0 1 17.8 12.4 L19.6 14.3 L18 17.1 L15.4 16.4 A6.8 6.8 0 0 1 13.4 17.2 L12 19.4 L10.6 17.2 A6.8 6.8 0 0 1 8.6 16.4 L6 17.1 L4.4 14.3 L6.2 12.4 A6.8 6.8 0 0 1 6.2 10.2 L4.4 8.3 L6 5.5 L8.6 6.2 A6.8 6.8 0 0 1 10.6 5.4 Z"/><circle cx="12" cy="11.3" r="2.6" fill="var(--tile-deep, #333)"/>',sy='<path d="M12 3.6 a5.6 5.6 0 0 1 5.6 5.6 c0 3.1 .9 4.6 2 5.6 H4.4 c1.1 -1 2 -2.5 2 -5.6 A5.6 5.6 0 0 1 12 3.6 Z"/><circle cx="12" cy="17.9" r="2.1"/><path d="M3.2 8.4 A9.6 9.6 0 0 1 5.6 4.4 M20.8 8.4 A9.6 9.6 0 0 0 18.4 4.4" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/>',ry='<rect x="4" y="4" width="16" height="16" rx="4" fill="none" stroke="currentColor" stroke-width="2.5"/><path d="M12 15.6 V8.6 M8.8 11.4 L12 8.2 L15.2 11.4" fill="none" stroke="currentColor" stroke-width="2.7" stroke-linecap="round" stroke-linejoin="round"/>',oy='<rect x="4" y="4" width="16" height="16" rx="4" fill="none" stroke="currentColor" stroke-width="2.5"/><path d="M12 8.4 V15.4 M8.8 12.6 L12 15.8 L15.2 12.6" fill="none" stroke="currentColor" stroke-width="2.7" stroke-linecap="round" stroke-linejoin="round"/>',ay='<path d="M7.2 7.4 H15.2 A4 4 0 0 1 19.2 11.4 V12.4" fill="none" stroke="currentColor" stroke-width="2.7" stroke-linecap="round"/><path d="M16.8 16.6 H8.8 A4 4 0 0 1 4.8 12.6 V11.6" fill="none" stroke="currentColor" stroke-width="2.7" stroke-linecap="round"/><path d="M19.2 10.2 L21.4 13.4 L16.9 13.6 Z"/><path d="M4.8 13.8 L2.6 10.6 L7.1 10.4 Z"/>',ly={glTurnGear:{label:"Turn Gear",spoken:"Turn the gear to wind the bell",tone:"rotate",icon:iy},glRingBell:{label:"Ring Bell",spoken:"Ring the bell",tone:"wait",icon:sy},glLiftUp:{label:"Lift Up",spoken:"Lift up one floor",tone:"start",icon:ry},glLiftDown:{label:"Lift Down",spoken:"Lift down one floor",tone:"move",icon:oy},glRepeat:{label:"Repeat",spoken:"Repeat the tiles before this one — tap the badge to change how many times",tone:"loop",icon:ay}},cy='<rect x="2.6" y="12.5" width="18.8" height="5.4" rx="2.7" fill="none" stroke="currentColor" stroke-width="2.4"/><circle cx="7" cy="15.2" r="1.3"/><circle cx="12" cy="15.2" r="1.3"/><circle cx="17" cy="15.2" r="1.3"/><path d="M9.5 4.4 L15.5 8 L9.5 11.6 Z"/>',hy='<path d="M12 6.2 C7 6.2 3.6 10.1 2.6 12 C3.6 13.9 7 17.8 12 17.8 C17 17.8 20.4 13.9 21.4 12 C20.4 10.1 17 6.2 12 6.2 Z" fill="none" stroke="currentColor" stroke-width="2.4"/><circle cx="12" cy="12" r="3.1"/>',dy='<path d="M6.4 4.6 C4.4 7.2 4.6 10.4 7.2 12.6 L10 14.8 M17.6 4.6 C19.6 7.2 19.4 10.4 16.8 12.6 L14 14.8" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><circle cx="12" cy="17.6" r="3.0"/>',uy='<path d="M12 3.4 L13.2 5.3 A6 6 0 0 1 15 6 L17.2 5.4 L18.6 7.8 L17 9.5 A6 6 0 0 1 17 11.5 L18.6 13.2 L17.2 15.6 L15 15 A6 6 0 0 1 13.2 15.7 L12 17.6 L10.8 15.7 A6 6 0 0 1 9 15 L6.8 15.6 L5.4 13.2 L7 11.5 A6 6 0 0 1 7 9.5 L5.4 7.8 L6.8 5.4 L9 6 A6 6 0 0 1 10.8 5.3 Z"/><circle cx="12" cy="10.5" r="2.2" fill="var(--tile-deep, #333)"/><path d="M5.4 20.6 L9.4 20.6 M7.4 18.6 L9.4 20.6 L7.4 22.6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M14.6 20.6 H18.6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',fy='<path d="M12 3.4 L13.2 5.3 A6 6 0 0 1 15 6 L17.2 5.4 L18.6 7.8 L17 9.5 A6 6 0 0 1 17 11.5 L18.6 13.2 L17.2 15.6 L15 15 A6 6 0 0 1 13.2 15.7 L12 17.6 L10.8 15.7 A6 6 0 0 1 9 15 L6.8 15.6 L5.4 13.2 L7 11.5 A6 6 0 0 1 7 9.5 L5.4 7.8 L6.8 5.4 L9 6 A6 6 0 0 1 10.8 5.3 Z" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M8.4 20.9 L15.6 20.9" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/><circle cx="12" cy="10.5" r="2.2"/>',py='<path d="M4 20 V7 M20 20 V7" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" fill="none"/><path d="M4 8.4 L20 8.4" stroke="currentColor" stroke-width="2.4" fill="none"/><path d="M7.2 12 L12 16.4 L16.8 12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>',my='<path d="M12 3.6 L21.4 19.6 H2.6 Z" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/><path d="M12 9 V13.8" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/><circle cx="12" cy="16.9" r="1.4"/>',gy={gsStartBelt:{label:"Start Belt",spoken:"Start the conveyor belt",tone:"start",icon:cy},gsWait:{label:"Wait",spoken:"Wait one tick",tone:"wait",icon:ad},gsWaitUntil:{label:"Wait Until",spoken:"Sleep until the eye sensor sees the berry",tone:"check",icon:hy},gsGrab:{label:"Grab",spoken:"Close the claw and grab",tone:"move",icon:dy},gsIfTurning:{label:"If Turning",spoken:"Only do the next tile if the gear is turning",tone:"check",icon:uy},gsIfStill:{label:"If Still",spoken:"Only do the next tile if the gear is still",tone:"check",icon:fy},gsOpenGate:{label:"Open Gate",spoken:"Open the gate",tone:"start",icon:py},gsWarnLight:{label:"Warning",spoken:"Shine the warning light",tone:"stop",icon:my}},Vr=[...Bx.map(s=>({kind:"machine",level:s})),...Vx.map(s=>({kind:"chain",level:s})),...Yx.map(s=>({kind:"loop",level:s})),...Zx.map(s=>({kind:"sensor",level:s}))];function vy(s){return s.level.id}const _y=[...Vr,{kind:"soon",id:"gw-sensor-sorter",shortTitle:"Sensor Sorter",emoji:"🍓"}],xy={tiles:ny,badges:{gwSetSpeed:{min:1,max:3,def:2,aria:"Change the speed: 1 slow, 2 medium, 3 fast"}}};class Ml{constructor(t,e,n,i,r){this.maxSlots=n,this.events=i,this.cfg=r??xy,this.root=T("div","bottom-deck",t);const o=T("div","deck-panel",this.root),a=T("div","deck-tray",o);for(const u of e)a.appendChild(this.makeTile(u,"tray",-1));T("div","deck-divider",o);const l=T("div","deck-sequence",o);l.setAttribute("aria-label","Your machine program");for(let u=0;u<n;u++){const f=T("div","slot",l);f.dataset.index=String(u),this.slotNodes.push(f)}const c=T("div","bop-wrap",this.root);this.bopBtn=T("button","bop-btn",c),this.bopBtn.type="button",this.bopBtn.setAttribute("aria-label","BOP! Run the machine program"),this.bopBtn.append("BOP!"),T("span","tri",this.bopBtn),this.bopBtn.addEventListener("click",()=>{this.program.length===0||this.running||(mt.play("bop"),this.events.onBop())});const h=T("div","deck-tools",this.root),d=T("button","mini-btn",h,"✕ Clear");d.type="button",d.setAttribute("aria-label","Clear the plan"),d.addEventListener("click",()=>{this.running||this.program.length===0||(mt.play("remove"),this.program=[],this.renderSlots(),this.emit(),this.events.onClear())}),this.renderSlots()}root;program=[];slotNodes=[];bopBtn;running=!1;lastPlaced=-1;cfg;getProgram(){return this.program.map(t=>({...t}))}setRunning(t){this.running=t,this.bopBtn.disabled=t,this.refreshBop(),t||(this.slotNodes.forEach(e=>{e.classList.remove("running"),e.querySelector(".count-badge")?.classList.remove("looping")}),this.program.forEach((e,n)=>{const i=this.slotNodes[n]?.querySelector(".count-badge");i&&e.arg!==void 0&&(i.textContent=`×${e.arg}`)}))}highlightSlot(t){this.slotNodes.forEach((e,n)=>e.classList.toggle("running",n===t))}setIterBadge(t,e){const n=this.slotNodes[t]?.querySelector(".count-badge");if(n)if(e!==null)n.textContent=e,n.classList.add("looping");else{const i=this.program[t];n.textContent=`×${i?.arg??""}`,n.classList.remove("looping")}}badgeFor(t){return this.cfg.badges?.[t]}isLoopCmd(t){return this.cfg.loopCmds?.includes(t)??!1}refreshBop(){this.bopBtn.classList.toggle("ready",this.program.length>0&&!this.running),this.bopBtn.classList.toggle("empty",this.program.length===0)}makeTile(t,e,n){const i=this.cfg.tiles[t],r=T("button","tile gw-tile");r.type="button",r.dataset.gwTone=i.tone,r.setAttribute("aria-label",e==="tray"?`Add command: ${i.spoken}`:`Step ${n+1}: ${i.spoken}. Tap to remove.`),T("span","sheen",r);const o=T("span","ico",r);o.innerHTML=`<svg class="cmd-ico" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">${i.icon}</svg>`,T("span","lbl",r,i.label);const a=this.badgeFor(t);if(a&&e==="slot"){const l=this.program[n],c=T("span","count-badge",r,`×${l?.arg??a.def}`);c.setAttribute("role","button"),c.setAttribute("aria-label",a.aria),c.addEventListener("pointerdown",h=>h.stopPropagation()),c.addEventListener("click",h=>{if(h.stopPropagation(),this.running)return;const d=this.program[n];if(!d||d.cmd!==t)return;const u=d.arg??a.def,f=u>=a.max?a.min:u+1;this.program[n]={cmd:t,arg:f},c.textContent=`×${f}`,mt.play("tap"),this.emit()})}return r.addEventListener("click",()=>{this.running||(e==="tray"?this.add(t):this.removeAt(n))}),r}add(t){if(this.program.length>=this.maxSlots)return;const e=this.badgeFor(t);this.program.push(e?{cmd:t,arg:e.def}:{cmd:t}),this.lastPlaced=this.program.length-1,mt.play("place"),this.renderSlots(),this.emit()}removeAt(t){t<0||t>=this.program.length||(this.program.splice(t,1),this.lastPlaced=-1,mt.play("remove"),this.renderSlots(),this.emit())}loopBodySlots(){const t=new Set;for(let e=0;e<this.program.length;e++)if(this.isLoopCmd(this.program[e].cmd))for(let n=e-1;n>=0&&!this.isLoopCmd(this.program[n].cmd);n--)t.add(n);return t}renderSlots(){const t=this.loopBodySlots();this.slotNodes.forEach((e,n)=>{e.innerHTML="",e.classList.remove("filled","in-loop");const i=this.program[n];if(i!==void 0){e.classList.add("filled"),t.has(n)&&e.classList.add("in-loop"),T("span","num",e,String(n+1));const r=this.makeTile(i.cmd,"slot",n);n===this.lastPlaced&&r.classList.add("fresh"),e.appendChild(r)}}),this.refreshBop()}emit(){this.events.onChange(this.getProgram())}}const yy={on:!1,dir:"cw",speed:2,spun:0,ranAt:{1:0,2:0,3:0},ranDir:{cw:0,ccw:0}};function Qa(){return{motor:yy,ticks:0}}const by=60;function wy(s,t,e){const n=[{type:"commandStart",index:e,cmd:t.cmd}],i=s.motor;let r=i;switch(t.cmd){case"gwStart":i.on?n.push({type:"noop",index:e,reason:"alreadyOn"}):(r={...i,on:!0},n.push({type:"motorOn",index:e}));break;case"gwStop":i.on?(r={...i,on:!1},n.push({type:"motorOff",index:e})):n.push({type:"noop",index:e,reason:"alreadyOff"});break;case"gwSpinCw":i.dir==="cw"?n.push({type:"noop",index:e,reason:"sameDir"}):(r={...i,dir:"cw"},n.push({type:"motorDir",index:e,dir:"cw"}));break;case"gwSpinCcw":i.dir==="ccw"?n.push({type:"noop",index:e,reason:"sameDir"}):(r={...i,dir:"ccw"},n.push({type:"motorDir",index:e,dir:"ccw"}));break;case"gwSetSpeed":{const o=Math.min(3,Math.max(1,t.arg??2));i.speed===o?n.push({type:"noop",index:e,reason:"sameSpeed"}):(r={...i,speed:o},n.push({type:"motorSpeed",index:e,speed:o}));break}case"gwWait":i.on?(r={...i,spun:i.spun+(i.dir==="cw"?i.speed:-i.speed),ranAt:{...i.ranAt,[i.speed]:i.ranAt[i.speed]+1},ranDir:{...i.ranDir,[i.dir]:i.ranDir[i.dir]+1}},n.push({type:"spin",index:e,dir:i.dir,speed:i.speed})):n.push({type:"waitIdle",index:e});break}return{state:{motor:r,ticks:s.ticks+1},events:n}}function My(s,t){const e=t.motor;return!(e.ranDir.cw+e.ranDir.ccw<s.minRunTicks||s.endStopped&&e.on||s.needFastRun&&e.ranAt[3]<1||s.needCcwRun&&e.ranDir.ccw<1)}function Sy(s,t){const e=t.motor,n=[];return e.ranDir.cw+e.ranDir.ccw<s.minRunTicks&&n.push(e.ranDir.cw+e.ranDir.ccw===0?"The motor never got to work — add a WAIT while it is ON.":"Let the motor work a little longer — add another WAIT."),s.endStopped&&e.on&&n.push("The motor is still running! End your plan with STOP."),s.needFastRun&&e.ranAt[3]<1&&n.push("It never ran FAST — set the speed dial to Fast, then WAIT."),s.needCcwRun&&e.ranDir.ccw<1&&n.push("It never spun BACK — use SPIN BACK, then WAIT."),n}function Ty(s,t){let e=Qa();const n=[],i=[];let r=!1;for(let a=0;a<s.length;a++){if(e.ticks>=by){n.push({type:"overflow"}),r=!0;break}const l=wy(e,s[a],a);e=l.state,n.push(...l.events),i.push(e)}const o=!r&&My(t,e);return n.push({type:"done",success:o}),{events:n,finalState:e,success:o,trail:i,overflowed:r}}const Ey=620;class Ay{constructor(t,e,n){this.root=t,this.level=e,this.events=n}stage;scene;rig;zip;mixy;trail;deck;topBar;charLayer;ui;disposers=[];running=!1;calm=!1;enter(){const t=T("div","",this.root);t.id="world-canvas-wrap",this.charLayer=T("div","",this.root),this.charLayer.id="char-layer",this.ui=T("div","ui-layer",this.root);const e=uo.bench;this.stage=new Ti(t,{viewDir:e.viewDir,fovFor:e.fovFor,indoor:!0}),this.stage.setSky("#141c4a",40,90),this.scene=new fo("motorLab"),this.stage.scene.add(this.scene.group),this.stage.frameArea(this.scene.frameCenter(),this.scene.frameCorners()),this.rig=new yx,this.rig.group.position.copy(this.scene.benchAnchor()),this.stage.scene.add(this.rig.group);const n=new vl,i=r=>{if(this.running)return;const o=t.getBoundingClientRect(),a=new at((r.clientX-o.left)/o.width*2-1,-((r.clientY-o.top)/o.height)*2+1);n.setFromCamera(a,this.stage.camera),n.intersectObject(this.rig.group,!0).length>0&&(this.rig.tapNudge(),mt.play("loop"),this.zip.flashMood("excited",900))};t.addEventListener("pointerdown",i),this.disposers.push(()=>t.removeEventListener("pointerdown",i)),this.zip=new _n({svgUrl:"./art/characters/zip/zip.svg",height:2.35,name:"zip"},this.charLayer,this.stage.camera,t),this.zip.addToScene(this.stage.scene),this.zip.placeAt(this.scene.zipSpot()),this.zip.look("right"),this.addNameChip(this.zip,"Zip"),this.mixy=new _n({svgUrl:"./art/characters/mixy/mixy.svg",height:2.1,name:"mixy",mixy:!0},this.charLayer,this.stage.camera,t),this.mixy.addToScene(this.stage.scene),this.mixy.placeAt(this.scene.mixySpot()),this.mixy.look("left"),this.addNameChip(this.mixy,"GlitchBop"),this.topBar=new Xs(this.ui,`${this.level.title} · ${this.level.shortTitle}`,{onBack:this.events.onExit,onSettings:()=>js(this.ui,this.events.store,mt,()=>this.applySettings())}),this.topBar.setStars(this.events.store.stars[this.level.id]??0),new $s(this.ui,this.level.goalText,this.level.emoji),this.trail=new po(this.ui),this.trail.setMachineLine(this.stateLine(Qa())),this.deck=new Ml(this.ui,this.level.commands,this.level.maxSlots,{onChange:()=>{},onBop:()=>void this.onBop(),onClear:()=>this.resetMachine()}),this.applySettings(),this.disposers.push(this.stage.onTick((r,o)=>{this.calm||this.scene.update(r,o),this.rig.update(r),this.zip.update(r,o),this.mixy.update(r,o)})),this.stage.startLoop(),Ys(this.ui,this.level,mt).then(()=>{this.zip.setMood("happy"),window.setTimeout(()=>this.zip.setMood("idle"),1600)})}applySettings(){this.calm=this.events.store.settings.calmMode,mt.enabled=this.events.store.settings.sound,this.zip.setCalm(this.calm),this.mixy.setCalm(this.calm),document.body.classList.toggle("calm-mode",this.calm),document.body.classList.toggle("high-contrast",this.events.store.settings.highContrast),document.body.classList.toggle("left-handed",this.events.store.settings.leftHanded)}addNameChip(t,e){t.whenReady().then(()=>{T("span","gw-name-chip",t.el,e).setAttribute("aria-hidden","true")})}resetMachine(){this.rig.reset(),this.trail.setEmpty(),this.trail.setMachineLine(this.stateLine(Qa()))}stateLine(t){const e=t.motor;return`Motor: ${e.on?"ON":"OFF"} · ${e.dir==="cw"?"⟳":"⟲"} · ${ra[e.speed]}`}async onBop(){if(this.running)return;this.running=!0,this.deck.setRunning(!0),this.resetMachine(),this.zip.setMood("thinking");const t=this.deck.getProgram(),e=Ty(t,this.level.goal),n=this.calm?380:Ey,i=[];this.narrated=i;let r=-1;for(const o of e.events){if(o.type==="commandStart"){r=o.index,this.deck.highlightSlot(o.index),await this.delay(n*.35);continue}if(o.type==="done"||o.type==="overflow")continue;this.applyEventVisual(o);const a=this.trailStepFor(o,r);a&&(i.push(a),this.trail.setSteps(i)),r>=0&&e.trail[r]&&this.trail.setMachineLine(this.stateLine(e.trail[r])),await this.delay(n*.65)}if(this.deck.setRunning(!1),this.running=!1,e.success){const o=e.finalState.motor.ranDir.cw+e.finalState.motor.ranDir.ccw,a=["It works!"];t.length<=this.level.par&&a.push("It is clever!"),zx(this.level.bonus,e.finalState.motor.ranAt,o)&&a.push(`Creative: ${this.level.bonus.text}!`);const l=a.length,c=this.events.store.stars[this.level.id]??0;this.events.store.setStars(this.level.id,Math.max(c,l)),this.topBar.setStars(Math.max(c,l)),this.zip.celebrate(),mt.play("celebrate"),qs(this.ui,{stars:l,starNames:a,predictedCorrectly:null},mt,{onReplay:()=>this.resetMachine(),onContinue:()=>this.events.hasNext&&this.events.onNext?this.events.onNext():this.events.onExit()})}else{const o=Sy(this.level.goal,e.finalState);this.mixy.glitchWobble(.8),this.mixy.flashMood("surprised",1600),mt.play("glitch"),this.trail.setSteps([...this.narrated.slice(-6),...o.map((a,l)=>({n:l+1,icon:"🔍",text:a,verdict:"no"}))],this.level.coachHint),this.toast("🛠️ Almost! Check the Think Trail, fix your plan, and BOP again!")}}narrated=[];trailStepFor(t,e){const n=e+1;let i=null;switch(t.type){case"motorOn":i={n,icon:"⚡",text:"Motor ON!",verdict:"ok"};break;case"motorOff":i={n,icon:"🛑",text:"Motor OFF — safe stop!",verdict:"ok"};break;case"motorDir":i={n,icon:t.dir==="cw"?"⟳":"⟲",text:t.dir==="cw"?"Now spinning forward":"Now spinning BACK",verdict:"ok"};break;case"motorSpeed":i={n,icon:"🎛️",text:`Speed set to ${ra[t.speed]}`,verdict:"ok"};break;case"spin":i={n,icon:t.dir==="cw"?"⚙️":"🔄",text:`The gear turned (${ra[t.speed]})`,verdict:"ok"};break;case"waitIdle":i={n,icon:"😴",text:"Waited… but the motor was OFF",verdict:"no"};break;case"noop":{const r=t.reason==="alreadyOn"?"It was already on!":t.reason==="alreadyOff"?"It was already off!":t.reason==="sameDir"?"Already spinning that way!":"Speed stayed the same.";i={n,icon:"💭",text:r};break}default:return null}return i}applyEventVisual(t){switch(t.type){case"motorOn":this.rig.setOn(!0),mt.play("bop");break;case"motorOff":this.rig.setOn(!1),mt.play("drop");break;case"motorDir":this.rig.setDir(t.dir),mt.play("tap");break;case"motorSpeed":this.rig.setSpeed(t.speed),mt.play("place");break;case"spin":this.rig.workPulse(),mt.play("loop");break;case"waitIdle":mt.play("remove");break}}delay(t){return new Promise(e=>window.setTimeout(e,t))}toast(t){this.root.querySelector(".gw-toast")?.remove();const e=T("div","toast gw-toast",this.root,t);window.setTimeout(()=>e.remove(),2600)}dispose(){this.disposers.forEach(t=>t()),this.disposers=[],this.trail?.dispose(),this.zip?.dispose(),this.mixy?.dispose(),this.stage?.dispose(),this.root.innerHTML=""}}const ih=["#ff9f2e","#57c14e","#a06bff","#38b6ff","#ff5fa2"],Ry=.16,Cy=2.6,jn=1.5;function ke(s,t,e=0,n=0,i=0,r=!0,o=!0){const a=new It(s,t);return a.position.set(e,n,i),a.castShadow=r,a.receiveShadow=o,a}function Ly(s,t,e=.16,n=.2){const i=l=>{const c=new zn,h=s/2;return c.moveTo(-h,l),c.lineTo(h,l),c.absarc(h,0,l,Math.PI/2,-Math.PI/2,!0),c.lineTo(-h,-l),c.absarc(-h,0,l,-Math.PI/2,Math.PI/2,!0),c},r=i(t),o=i(t-e);r.holes.push(new Kr(o.getPoints(24)));const a=new ni(r,{depth:n,bevelEnabled:!0,bevelThickness:.03,bevelSize:.03,bevelSegments:1});return a.center(),a}function Py(s,t,e){const n=t,i=Math.PI*e,r=2*n+2*i;let o=(s%1+1)%1*r;const a=t/2;if(o<n)return{x:-a+o,y:e};if(o-=n,o<i){const c=Math.PI/2-o/i*Math.PI;return{x:a+Math.cos(c)*e,y:Math.sin(c)*e}}if(o-=i,o<n)return{x:a-o,y:-e};o-=n;const l=-Math.PI/2-o/i*Math.PI;return{x:-a+Math.cos(l)*e,y:Math.sin(l)*e}}class Iy{constructor(t){this.spec=t,this.group.name="chain-rig";const e=this.spec.nodes.map((g,v)=>v===0?.95:v===this.spec.nodes.length-1?.8:.7),n=[0];for(let g=0;g<this.spec.links.length;g++){const v=this.spec.links[g]==="mesh"?e[g]+e[g+1]-Ry:Cy;n.push(n[g]+v)}const i=n[n.length-1],r=-i/2;this.group.add(ke(new gt(i+4.2,.3,2.6,2,.1),z("#1b2664"),0,.15,0));const o=new nt;o.add(ke(new gt(1.7,1.4,1.3,3,.22),z("#2f6fe0"),0,.95,0)),o.add(ke(new Pt(.5,.56,.45,16),z("#4a8cf0"),0,1.8,0,!0,!1));const a=new zn;a.moveTo(.09,.3),a.lineTo(-.12,-.02),a.lineTo(0,-.02),a.lineTo(-.09,-.3),a.lineTo(.14,.06),a.lineTo(.02,.06),a.closePath();const l=new It(new ni(a,{depth:.05,bevelEnabled:!1}),z("#ffd23e"));l.scale.setScalar(1.35),l.position.set(0,.95,.68),o.add(l),this.lamp=ke(new Dt(.22,14,10),new Jt({color:"#8a94ad",emissive:"#000000",emissiveIntensity:0}),.5,1.85,.3,!1,!1),o.add(this.lamp),o.position.set(r-1.6,.3,-.4),this.group.add(o);for(let g=0;g<this.spec.nodes.length;g++){const v=r+n[g],m=e[g],p=this.spec.nodes[g].fixed,b=ih[g%ih.length],x=ke(new gt(.38,jn-.3,.55,1,.08),z("#39406e"),v,.3+(jn-.3)/2,-.55);this.group.add(x);const _=ke(new Pt(.11,.11,.9,10),z("#aab3c8"),v,.3+jn,-.15);_.rotation.x=Math.PI/2,this.group.add(_);const L=ls({color:b,radius:m,teeth:Math.max(8,Math.round(m*13))});L.position.set(v,.3+jn,.14),L.rotation.z=g*.28,L.traverse(R=>{R.userData.gwNode=g}),L.visible=p,this.group.add(L),this.nodes.push({x:v,radius:m,gear:L,ghost:p?null:this.makeGhost(v,m,g),arrow:this.makeArrow(v,m),spinning:!1,spinSign:-1})}for(let g=0;g<this.spec.links.length;g++)this.spec.links[g]==="beltSlot"&&this.belts.set(g,this.makeBeltRig(g,r+n[g],r+n[g+1],e[g],e[g+1]));this.bell=new nt;const c=ke(new gt(.3,3.3,.4,1,.08),z("#c9843c"),0,1.65,0);this.bell.add(c);const h=ke(new gt(1.6,.26,.36,1,.08),z("#c9843c"),-.72,3.3,0);this.bell.add(h);const d=new nt,u=new It(new Dt(.5,18,12,0,Math.PI*2,0,Math.PI/2),z("#ffd23e"));u.rotation.x=Math.PI,u.position.y=-.1,u.castShadow=!0,d.add(u),d.add(ke(new Dt(.12,10,8),z("#ff9f2e"),0,.04,0,!1,!1)),d.add(ke(new Dt(.11,10,8),z("#39406e"),0,-.48,0,!1,!1)),d.position.set(-1.3,3.02,0),this.bell.add(d);const f=this.nodes[this.nodes.length-1];this.bell.position.set(f.x+1.3,.3,-.55),this.group.add(this.bell),this.spark=ke(new Dt(.2,10,8),new Jt({color:"#ffd23e",emissive:"#ffb020",emissiveIntensity:1.2,transparent:!0,opacity:0}),0,0,0,!1,!1),this.group.add(this.spark)}group=new nt;nodes=[];belts=new Map;lamp;bell;spark;motorOn=!1;bellRing=0;pulse=0;makeGhost(t,e,n){const i=new nt,r=new It(new Le(e*.82,.07,8,28),new Jt({color:"#7fc4ff",emissive:"#3d8fe0",emissiveIntensity:.8,transparent:!0,opacity:.75}));i.add(r);for(let c=0;c<8;c++){const h=c/8*Math.PI*2,d=ke(new gt(.16,.09,.09,1,.03),r.material,Math.cos(h)*e*1.02,Math.sin(h)*e*1.02,0,!1,!1);d.rotation.z=h+Math.PI/2,i.add(d)}const o=new nt,a=new Jt({color:"#ffffff",emissive:"#bfe4ff",emissiveIntensity:.6});o.add(ke(new gt(.34,.1,.08,1,.03),a,0,0,0,!1,!1)),o.add(ke(new gt(.1,.34,.08,1,.03),a,0,0,.01,!1,!1)),i.add(o);const l=new It(new Ws(e*1.25,16),new Ds({transparent:!0,opacity:0,depthWrite:!1}));return i.add(l),i.position.set(t,.3+jn,.14),i.traverse(c=>{c.userData.gwNode=n}),this.group.add(i),i}makeArrow(t,e){const n=new nt,i=new Jt({color:"#ffffff",emissive:"#7fc4ff",emissiveIntensity:.35}),r=new It(new Le(.3,.06,8,20,Math.PI*1.2),i);n.add(r);const o=new It(new $e(.13,.28,10),i);return o.position.set(Math.cos(Math.PI*1.2)*.3,Math.sin(Math.PI*1.2)*.3,0),o.rotation.z=Math.PI*1.2-Math.PI/2,n.add(o),n.position.set(t,.3+jn+e+.55,.14),n.scale.x=-1,n.visible=!1,this.group.add(n),n}makeBeltRig(t,e,n,i,r){const o=n-e,a=Math.min(i,r)*.52,l=(e+n)/2,c=.3+jn,h=new nt,d=new Jt({color:"#ffd23e",emissive:"#c99a20",emissiveIntensity:.7,transparent:!0,opacity:.8});for(let p=0;p<5;p++){const b=(p+.5)/5;h.add(ke(new gt(.22,.09,.09,1,.03),d,-o/2+b*o,a,0,!1,!1)),h.add(ke(new gt(.22,.09,.09,1,.03),d,-o/2+b*o,-a,0,!1,!1))}const u=new It(new Mn(o*.9,a*4),new Ds({transparent:!0,opacity:0,depthWrite:!1}));h.add(u),h.position.set(l,c,.15),h.traverse(p=>{p.userData.gwBelt=t}),this.group.add(h);const f=new nt,g=new It(Ly(o,a),z("#e8536b"));g.castShadow=!0,f.add(g);const v=[];for(let p=0;p<6;p++){const b=ke(new gt(.12,.12,.1,1,.03),z("#fff2d9"),0,0,.12,!1,!1);f.add(b),v.push(b)}f.position.set(l,c,.34),f.visible=!1,f.traverse(p=>{p.userData.gwBelt=t}),this.group.add(f);const m={slot:h,belt:f,rivets:v,span:o,radius:a-.08,travel:0,moving:!1,moveSign:-1};return this.layoutRivets(m),m}layoutRivets(t){t.rivets.forEach((e,n)=>{const i=Py(t.travel+n/t.rivets.length,t.span,t.radius);e.position.set(i.x,i.y,.12)})}tapTargets(){const t=[];this.nodes.forEach((e,n)=>{e.ghost&&(e.ghost.visible?t.push(e.ghost):this.spec.nodes[n].fixed===!1&&e.gear.visible&&t.push(e.gear))});for(const e of this.belts.values())t.push(e.slot.visible?e.slot:e.belt);return t}setPlacement(t){this.nodes.forEach((e,n)=>{e.gear.visible=t.gears[n],e.ghost&&(e.ghost.visible=!t.gears[n])});for(const[e,n]of this.belts)n.belt.visible=t.belts[e],n.slot.visible=!t.belts[e]}setFlow(t){this.nodes.forEach((e,n)=>{const i=t?.turning[n]===!0;e.spinning=i,e.spinSign=t?.dirs[n]==="ccw"?1:-1,e.arrow.visible=i,e.arrow.scale.x=t?.dirs[n]==="ccw"?1:-1});for(const[e,n]of this.belts){const i=t!==null&&t.turning[e]&&t.turning[e+1];n.moving=i,n.moveSign=t?.dirs[e]==="ccw"?1:-1}}partialFlow(t,e){const n={...t,turning:t.turning.map((i,r)=>i&&r<e),dirs:t.dirs.map((i,r)=>r<e?i:null)};this.setFlow(n)}setMotorOn(t){this.motorOn=t;const e=this.lamp.material;t?(e.color.set("#7dee8e"),e.emissive.set("#3ed35f"),e.emissiveIntensity=1):(e.color.set("#8a94ad"),e.emissive.set("#000000"),e.emissiveIntensity=0)}showBreakSpark(t){const e=this.nodes[t],n=this.nodes[t+1];this.spark.position.set((e.x+n.x)/2,.3+jn,.6),this.spark.material.opacity=1,this.pulse=1.6}hideSpark(){this.spark.material.opacity=0,this.pulse=0}ringBell(){this.bellRing=1}update(t,e){for(const n of this.nodes)if(n.spinning&&this.motorOn&&(n.gear.rotation.z+=t*n.spinSign*(1.9*(.8/n.radius))),n.ghost?.visible){const i=1+Math.sin(e*2.6+n.x)*.06;n.ghost.scale.setScalar(i)}for(const n of this.belts.values())if(n.moving&&this.motorOn&&(n.travel+=t*n.moveSign*-.22,this.layoutRivets(n)),n.slot.visible){const i=1+Math.sin(e*2.2)*.05;n.slot.scale.setScalar(i)}if(this.pulse>0){this.pulse=Math.max(0,this.pulse-t);const n=this.spark.material;n.opacity=Math.min(1,this.pulse)*(.6+Math.sin(e*14)*.4)}this.bellRing>0&&(this.bellRing=Math.max(0,this.bellRing-t*.5),this.bell.rotation.z=Math.sin(e*16)*.09*this.bellRing),this.motorOn&&(this.lamp.material.emissiveIntensity=.85+Math.sin(e*4.2)*.2)}}class Dy{constructor(t,e,n){this.events=n,this.root=T("div","bottom-deck",t);const i=T("div","deck-panel gw-shelf",this.root);i.setAttribute("aria-label","Machine parts to place"),e.gears>0&&(this.gearChip=T("div","gw-part-chip",i),T("span","gw-part-ico",this.gearChip,"⚙️"),T("span","gw-part-name",this.gearChip,"Gears"),this.gearCount=T("span","gw-part-count",this.gearChip,`×${e.gears}`)),e.belts>0&&(this.beltChip=T("div","gw-part-chip",i),T("span","gw-part-ico",this.beltChip,"🔗"),T("span","gw-part-name",this.beltChip,"Belt"),this.beltCount=T("span","gw-part-count",this.beltChip,`×${e.belts}`)),T("div","gw-shelf-hint",i,"👆 Tap the glowing spots on the machine!");const r=T("div","bop-wrap",this.root);this.bopBtn=T("button","bop-btn ready",r),this.bopBtn.type="button",this.bopBtn.setAttribute("aria-label","BOP! Turn the motor on and test the machine"),this.bopBtn.append("BOP!"),T("span","tri",this.bopBtn),this.bopBtn.addEventListener("click",()=>{this.running||(mt.play("bop"),this.events.onBop())});const o=T("div","deck-tools",this.root),a=T("button","mini-btn",o,"↩ Reset");a.type="button",a.setAttribute("aria-label","Take all the parts back off"),a.addEventListener("click",()=>{this.running||(mt.play("remove"),this.events.onReset())})}root;gearChip=null;beltChip=null;gearCount=null;beltCount=null;bopBtn;running=!1;setRemaining(t){this.gearCount&&this.gearChip&&(this.gearCount.textContent=`×${t.gears}`,this.gearChip.classList.toggle("depleted",t.gears===0)),this.beltCount&&this.beltChip&&(this.beltCount.textContent=`×${t.belts}`,this.beltChip.classList.toggle("depleted",t.belts===0))}setRunning(t){this.running=t,this.bopBtn.disabled=t,this.bopBtn.classList.toggle("ready",!t)}}const Uy=700;class Ny{constructor(t,e,n){this.root=t,this.level=e,this.events=n}stage;scene;rig;zip;mixy;trail;shelf;topBar;charLayer;ui;disposers=[];placement;running=!1;calm=!1;testedEarly=!1;predicted=null;enter(){const t=T("div","",this.root);t.id="world-canvas-wrap",this.charLayer=T("div","",this.root),this.charLayer.id="char-layer",this.ui=T("div","ui-layer",this.root);const e=uo.bench;this.stage=new Ti(t,{viewDir:e.viewDir,fovFor:e.fovFor,indoor:!0}),this.stage.setSky("#141c4a",40,90),this.scene=new fo("motorLab"),this.stage.scene.add(this.scene.group),this.stage.frameArea(this.scene.frameCenter(),this.scene.frameCorners()),this.rig=new Iy(this.level.chain),this.rig.group.position.copy(this.scene.benchAnchor()),this.stage.scene.add(this.rig.group),this.placement=Qc(this.level.chain),this.rig.setPlacement(this.placement),this.rig.setFlow(null);const n=new vl,i=r=>{if(this.running)return;const o=t.getBoundingClientRect(),a=new at((r.clientX-o.left)/o.width*2-1,-((r.clientY-o.top)/o.height)*2+1);n.setFromCamera(a,this.stage.camera);const l=n.intersectObjects(this.rig.tapTargets(),!0);if(l.length===0)return;const c=l[0].object.userData;typeof c.gwNode=="number"?this.toggleGear(c.gwNode):typeof c.gwBelt=="number"&&this.toggleBelt(c.gwBelt)};t.addEventListener("pointerdown",i),this.disposers.push(()=>t.removeEventListener("pointerdown",i)),this.zip=new _n({svgUrl:"./art/characters/zip/zip.svg",height:2.35,name:"zip"},this.charLayer,this.stage.camera,t),this.zip.addToScene(this.stage.scene),this.zip.placeAt(this.scene.zipSpot()),this.zip.look("right"),this.addNameChip(this.zip,"Zip"),this.mixy=new _n({svgUrl:"./art/characters/mixy/mixy.svg",height:2.1,name:"mixy",mixy:!0},this.charLayer,this.stage.camera,t),this.mixy.addToScene(this.stage.scene),this.mixy.placeAt(this.scene.mixySpot()),this.mixy.look("left"),this.addNameChip(this.mixy,"GlitchBop"),this.topBar=new Xs(this.ui,`${this.level.title} · ${this.level.shortTitle}`,{onBack:this.events.onExit,onSettings:()=>js(this.ui,this.events.store,mt,()=>this.applySettings())}),this.topBar.setStars(this.events.store.stars[this.level.id]??0),new $s(this.ui,this.level.goalText,this.level.emoji),this.trail=new po(this.ui),this.trail.setMachineLine(this.buildLine()),this.shelf=new Dy(this.ui,th(this.level.chain),{onBop:()=>void this.onBop(),onReset:()=>this.resetBuild()}),this.refreshShelf(),this.applySettings(),this.disposers.push(this.stage.onTick((r,o)=>{this.calm||this.scene.update(r,o),this.rig.update(r,o),this.zip.update(r,o),this.mixy.update(r,o)})),this.stage.startLoop(),Ys(this.ui,this.level,mt).then(()=>{this.zip.setMood("happy"),window.setTimeout(()=>this.zip.setMood("idle"),1600)})}applySettings(){this.calm=this.events.store.settings.calmMode,mt.enabled=this.events.store.settings.sound,this.zip.setCalm(this.calm),this.mixy.setCalm(this.calm),document.body.classList.toggle("calm-mode",this.calm),document.body.classList.toggle("high-contrast",this.events.store.settings.highContrast),document.body.classList.toggle("left-handed",this.events.store.settings.leftHanded)}addNameChip(t,e){t.whenReady().then(()=>{T("span","gw-name-chip",t.el,e).setAttribute("aria-hidden","true")})}toggleGear(t){const e=this.placement.gears[t];!e&&this.remaining().gears<=0||(this.placement=bx(this.placement,t,!e),mt.play(e?"remove":"place"),this.afterBuildChange())}toggleBelt(t){const e=this.placement.belts[t];!e&&this.remaining().belts<=0||(this.placement=wx(this.placement,t,!e),mt.play(e?"remove":"place"),this.afterBuildChange())}afterBuildChange(){this.rig.setPlacement(this.placement),this.rig.setFlow(null),this.rig.setMotorOn(!1),this.rig.hideSpark(),this.refreshShelf(),this.trail.setMachineLine(this.buildLine()),eh(this.level.chain,this.placement)&&(this.zip.flashMood("excited",1200),this.toast("✨ The machine looks ready — BOP it!"))}remaining(){const t=th(this.level.chain),e=this.level.chain.nodes.filter((i,r)=>!i.fixed&&this.placement.gears[r]).length,n=this.placement.belts.filter(Boolean).length;return{gears:t.gears-e,belts:t.belts-n}}refreshShelf(){this.shelf.setRemaining(this.remaining())}buildLine(){const t=this.remaining();if(t.gears===0&&t.belts===0)return"Machine: ready to test! 🔧✅";const e=[];return t.gears>0&&e.push(`${t.gears} gear${t.gears===1?"":"s"}`),t.belts>0&&e.push(`${t.belts} belt${t.belts===1?"":"s"}`),`Machine: needs ${e.join(" + ")}`}resetBuild(){this.placement=Qc(this.level.chain),this.afterBuildChange(),this.trail.setEmpty(),this.trail.setMachineLine(this.buildLine())}async onBop(){if(this.running)return;const t=eh(this.level.chain,this.placement);if(t&&this.predicted===null){const{predictedSuccess:o}=await nd(this.ui,{prediction:{prompt:this.level.prediction.prompt,choices:Wx(this.level)}},mt);this.predicted=o,mt.play(o?"predictRight":"predictWrong")}this.running=!0,this.shelf.setRunning(!0),this.rig.hideSpark(),this.zip.setMood("thinking");const e=rd(this.level.chain,this.placement),n=this.calm?420:Uy,i=[];this.rig.setMotorOn(!0),mt.play("bop"),await this.delay(n*.6);const r=e.turning.filter(Boolean).length;for(let o=1;o<=r;o++){this.rig.partialFlow(e,o);const a=o-1;i.push(this.handOffStep(a,e.dirs[a]==="ccw")),this.trail.setSteps(i),mt.play(a===0?"loop":this.level.chain.links[a-1]==="mesh"?"tap":"place"),await this.delay(n)}if(e.reachesTarget)this.rig.ringBell(),mt.play("celebrate"),i.push({n:i.length+1,icon:"🔔",text:`Power made it — ${this.level.targetName} RINGS!`,verdict:"ok"}),this.trail.setSteps(i),await this.delay(n*1.4),this.rig.setMotorOn(!1),this.rig.setFlow(null),this.finishSuccess();else{e.firstBrokenLink>=0&&this.rig.showBreakSpark(e.firstBrokenLink),mt.play("glitch"),this.mixy.glitchWobble(.8),this.mixy.flashMood("surprised",1600),t||(this.testedEarly=!0);const o=Sx(this.level.chain,this.placement);this.trail.setSteps([...i,...o.map((a,l)=>({n:i.length+l+1,icon:"🔍",text:a,verdict:"no"}))],this.level.coachHint),await this.delay(n*1.2),this.rig.setMotorOn(!1),this.rig.setFlow(null),this.toast(t?"🛠️ Hmm! Check the Think Trail and BOP again!":"🔍 See where the power stops? Finish the chain and BOP again!"),this.running=!1,this.shelf.setRunning(!1)}}handOffStep(t,e){const n=t+1,i=e?"⟲":"⟳";if(t===0)return{n,icon:"⚡",text:`Motor gear spins ${i}`,verdict:"ok"};const r=this.level.chain.links[t-1]==="beltSlot",a=t===this.level.chain.nodes.length-1?"the bell gear":`wheel ${n}`;return r?{n,icon:"🔗",text:`The belt keeps ${a} spinning the SAME way ${i}`,verdict:"ok"}:{n,icon:"⚙️",text:`Teeth push ${a} the OTHER way ${i}`,verdict:"ok"}}finishSuccess(){this.running=!1,this.shelf.setRunning(!1);const t=["It works!"];this.predicted===!0&&t.push("Great prediction!"),this.testedEarly&&t.push(`Creative: ${this.level.bonusText}!`);const e=t.length,n=this.events.store.stars[this.level.id]??0;this.events.store.setStars(this.level.id,Math.max(n,e)),this.topBar.setStars(Math.max(n,e)),this.zip.celebrate(),qs(this.ui,{stars:e,starNames:t,predictedCorrectly:this.predicted},mt,{onReplay:()=>{this.predicted=null,this.resetBuild()},onContinue:()=>this.events.hasNext&&this.events.onNext?this.events.onNext():this.events.onExit()})}delay(t){return new Promise(e=>window.setTimeout(e,t))}toast(t){this.root.querySelector(".gw-toast")?.remove();const e=T("div","toast gw-toast",this.root,t);window.setTimeout(()=>e.remove(),2600)}dispose(){this.disposers.forEach(t=>t()),this.disposers=[],this.trail?.dispose(),this.zip?.dispose(),this.mixy?.dispose(),this.stage?.dispose(),this.root.innerHTML=""}}function ye(s,t,e=0,n=0,i=0,r=!0,o=!0){const a=new It(s,t);return a.position.set(e,n,i),a.castShadow=r,a.receiveShadow=o,a}function ld(){const s=new nt,t=new nt,e=new It(new Dt(.5,18,12,0,Math.PI*2,0,Math.PI/2),z("#ffd23e"));return e.rotation.x=Math.PI,e.position.y=-.1,e.castShadow=!0,t.add(e),t.add(ye(new Dt(.12,10,8),z("#ff9f2e"),0,.04,0,!1,!1)),t.add(ye(new Dt(.11,10,8),z("#39406e"),0,-.48,0,!1,!1)),s.add(t),{group:s,dome:t}}class ky{group=new nt;gear;windLamp;bellDome;noteLamps=[];spinBurst=0;ringT=0;clunkT=0;constructor(t){this.group.name="gear-bell-rig",this.group.add(ye(new gt(7.6,.3,2.6,2,.1),z("#1b2664"),0,.15,0)),this.group.add(ye(new gt(.44,1.5,.6,1,.1),z("#39406e"),-2.1,1.05,-.35)),this.gear=ls({color:"#ff9f2e",radius:1.05,teeth:13}),this.gear.position.set(-2.1,1.85,.05),this.group.add(this.gear);const e=ye(new Pt(.14,.14,.3,10),z("#e05a3a"),0,.62,.24);e.rotation.x=Math.PI/2,this.gear.add(e),this.windLamp=ye(new Dt(.22,12,10),new Jt({color:"#8a94ad",emissive:"#000000",emissiveIntensity:0}),-.35,1.5,.15,!1,!1),this.group.add(this.windLamp),this.group.add(ye(new gt(.3,1,.3,1,.08),z("#39406e"),-.35,.8,.05)),this.group.add(ye(new gt(.3,2.9,.4,1,.08),z("#c9843c"),2.6,1.45,-.4)),this.group.add(ye(new gt(1.5,.26,.36,1,.08),z("#c9843c"),1.92,2.9,-.4));const n=ld();n.group.position.set(1.35,2.62,-.35),this.bellDome=n.dome,this.group.add(n.group);for(let i=0;i<t;i++){const r=ye(new Dt(.17,10,8),new Jt({color:"#5a6285",emissive:"#000000",emissiveIntensity:0}),-1.05+i*.7,.55,1.05,!1,!1);this.group.add(r),this.noteLamps.push(r)}}setWound(t){const e=this.windLamp.material;t?(e.color.set("#ffd97a"),e.emissive.set("#ffb020"),e.emissiveIntensity=1):(e.color.set("#8a94ad"),e.emissive.set("#000000"),e.emissiveIntensity=0)}gearTurn(){this.spinBurst=1,this.setWound(!0)}ring(t){this.ringT=1,this.setWound(!1);for(let e=0;e<Math.min(t,this.noteLamps.length);e++){const n=this.noteLamps[e].material;n.color.set("#7dee8e"),n.emissive.set("#3ed35f"),n.emissiveIntensity=.9}}clunk(){this.clunkT=1}reset(){this.setWound(!1),this.spinBurst=0,this.ringT=0,this.clunkT=0;for(const t of this.noteLamps){const e=t.material;e.color.set("#5a6285"),e.emissive.set("#000000"),e.emissiveIntensity=0}}update(t,e){this.spinBurst>0&&(this.gear.rotation.z-=t*this.spinBurst*7,this.spinBurst=Math.max(0,this.spinBurst-t*1.6)),this.ringT>0&&(this.ringT=Math.max(0,this.ringT-t*1.1),this.bellDome.rotation.z=Math.sin(e*18)*.16*this.ringT),this.clunkT>0&&(this.clunkT=Math.max(0,this.clunkT-t*2.2),this.bellDome.position.x=Math.sin(e*30)*.035*this.clunkT)}}const oa=1;class Fy{group=new nt;platform;bellDome;floorLamps=[];targetY=0;bumpT=0;ringT=0;constructor(t){this.group.name="lift-rig";const e=oa*t+1.6;this.group.add(ye(new gt(6.4,.3,2.6,2,.1),z("#1b2664"),0,.15,0));for(const r of[-1.15,1.15])this.group.add(ye(new gt(.3,e,.44,1,.08),z("#5b8df0"),r,e/2+.3,-.55)),this.group.add(ye(new gt(.38,.5,.5,1,.08),z("#ffd23e"),r,.5,-.55));this.group.add(ye(new gt(2.9,.34,.52,1,.1),z("#ffd23e"),0,e+.35,-.55));for(let r=0;r<=t;r++){const o=.3+r*oa;r>0&&this.group.add(ye(new gt(.5,.14,1.2,1,.05),z("#aab3c8"),1.62,o,.1,!1,!0));const a=ye(new gt(.62,.62,.16,1,.06),z(r===t?"#ffd23e":"#fff6e3"),2.35,o+.42,.1,!1,!1);this.group.add(a);const l=ye(new Dt(.12,10,8),new Jt({color:"#5a6285",emissive:"#000000",emissiveIntensity:0}),2.35,o+.95,.1,!1,!1);this.group.add(l),this.floorLamps.push(l);for(let c=0;c<r;c++)this.group.add(ye(new Pt(.055,.055,.06,8),z("#16225c"),2.35-.18+c%2*.36,o+.3+Math.floor(c/2)*.24,.19,!1,!1))}this.platform=new nt,this.platform.add(ye(new gt(1.9,.22,1.5,2,.08),z("#ffb020"),0,0,.1)),this.platform.add(ye(new gt(2.1,.5,.2,1,.06),z("#e8a010"),0,.18,-.62));const n=new nt;n.add(ye(new Pt(.5,.38,.5,14),z("#c9843c"),0,.36,0));for(let r=0;r<5;r++){const o=r/5*Math.PI*2;n.add(ye(new Dt(.13,10,8),z("#e8384f"),Math.cos(o)*.2,.62+r%2*.1,Math.sin(o)*.2,!1,!1))}n.position.set(0,.1,.15),this.platform.add(n),this.platform.position.set(0,.55,0),this.group.add(this.platform),this.group.add(ye(new gt(1.2,.24,.34,1,.08),z("#c9843c"),-2,e+.2,0)),this.group.add(ye(new gt(.26,1,.34,1,.08),z("#c9843c"),-2.55,e-.3,0));const i=ld();i.group.position.set(-1.7,e-.1,.05),this.bellDome=i.dome,this.group.add(i.group),this.setFloor(0,!0)}setFloor(t,e=!1){this.targetY=.55+t*oa,e&&(this.platform.position.y=this.targetY);for(let n=0;n<this.floorLamps.length;n++){const i=this.floorLamps[n].material;n===t?(i.color.set("#7dee8e"),i.emissive.set("#3ed35f"),i.emissiveIntensity=.9):(i.color.set("#5a6285"),i.emissive.set("#000000"),i.emissiveIntensity=0)}}bump(){this.bumpT=1}ring(){this.ringT=1}reset(){this.setFloor(0,!0),this.bumpT=0,this.ringT=0}update(t,e){const n=this.targetY-this.platform.position.y;this.platform.position.y+=n*Math.min(1,t*6),this.bumpT>0?(this.bumpT=Math.max(0,this.bumpT-t*2),this.platform.position.x=Math.sin(e*26)*.04*this.bumpT):this.platform.position.x=0,this.ringT>0&&(this.ringT=Math.max(0,this.ringT-t*1.1),this.bellDome.rotation.z=Math.sin(e*18)*.16*this.ringT)}}const Oy=600;class By{constructor(t,e,n){this.root=t,this.level=e,this.events=n}stage;scene;bellRig=null;liftRig=null;zip;mixy;trail;deck;topBar;charLayer;ui;disposers=[];running=!1;calm=!1;wonLongWay=!1;wonLoopWay=!1;everPar=!1;everBonus=!1;enter(){const t=T("div","",this.root);t.id="world-canvas-wrap",this.charLayer=T("div","",this.root),this.charLayer.id="char-layer",this.ui=T("div","ui-layer",this.root);const e=uo.bench;this.stage=new Ti(t,{viewDir:e.viewDir,fovFor:e.fovFor,indoor:!0}),this.stage.setSky("#141c4a",40,90);const n=this.level.machine==="lift";this.scene=new fo(n?"liftBay":"motorLab"),this.stage.scene.add(this.scene.group),this.stage.frameArea(this.scene.frameCenter(),this.scene.frameCorners()),n?(this.liftRig=new Fy(this.level.goal.topFloor??3),this.liftRig.group.position.set(0,.05,-1.5),this.stage.scene.add(this.liftRig.group)):(this.bellRig=new ky(this.level.goal.needRings??4),this.bellRig.group.position.copy(this.scene.benchAnchor()),this.stage.scene.add(this.bellRig.group)),this.zip=new _n({svgUrl:"./art/characters/zip/zip.svg",height:2.35,name:"zip"},this.charLayer,this.stage.camera,t),this.zip.addToScene(this.stage.scene),this.zip.placeAt(this.scene.zipSpot()),this.zip.look("right"),this.addNameChip(this.zip,"Zip"),this.mixy=new _n({svgUrl:"./art/characters/mixy/mixy.svg",height:2.1,name:"mixy",mixy:!0},this.charLayer,this.stage.camera,t),this.mixy.addToScene(this.stage.scene),this.mixy.placeAt(this.scene.mixySpot()),this.mixy.look("left"),this.addNameChip(this.mixy,"GlitchBop"),this.topBar=new Xs(this.ui,`${this.level.title} · ${this.level.shortTitle}`,{onBack:this.events.onExit,onSettings:()=>js(this.ui,this.events.store,mt,()=>this.applySettings())}),this.topBar.setStars(this.events.store.stars[this.level.id]??0),new $s(this.ui,this.level.goalText,this.level.emoji),this.trail=new po(this.ui),this.trail.setMachineLine(this.statusLine()),this.deck=new Ml(this.ui,this.level.commands,this.level.maxSlots,{onChange:()=>{},onBop:()=>void this.onBop(),onClear:()=>this.resetMachine()},{tiles:ly,badges:{glRepeat:{min:io,max:od,def:io,aria:"Change how many times the loop repeats: 2, 3, or 4"}},loopCmds:["glRepeat"]}),this.applySettings(),this.disposers.push(this.stage.onTick((i,r)=>{this.calm||this.scene.update(i,r),this.bellRig?.update(i,r),this.liftRig?.update(i,r),this.zip.update(i,r),this.mixy.update(i,r)})),this.stage.startLoop(),Ys(this.ui,this.level,mt).then(()=>{this.zip.setMood("happy"),window.setTimeout(()=>this.zip.setMood("idle"),1600)})}applySettings(){this.calm=this.events.store.settings.calmMode,mt.enabled=this.events.store.settings.sound,this.zip.setCalm(this.calm),this.mixy.setCalm(this.calm),document.body.classList.toggle("calm-mode",this.calm),document.body.classList.toggle("high-contrast",this.events.store.settings.highContrast),document.body.classList.toggle("left-handed",this.events.store.settings.leftHanded)}addNameChip(t,e){t.whenReady().then(()=>{T("span","gw-name-chip",t.el,e).setAttribute("aria-hidden","true")})}statusLine(t=0,e=0){return this.level.machine==="gearBell"?`Bell: ${t} of ${this.level.goal.needRings??0} rings 🔔`:`Lift: floor ${e} of ${this.level.goal.topFloor??0} 🛗`}resetMachine(){this.bellRig?.reset(),this.liftRig?.reset(),this.trail.setEmpty(),this.trail.setMachineLine(this.statusLine())}async onBop(){if(this.running)return;this.running=!0,this.deck.setRunning(!0),this.resetMachine(),this.zip.setMood("thinking");const t=this.deck.getProgram(),e=Ex(t,this.level.goal,this.level.machine),n=this.calm?360:Oy,i=[];let r=-1,o=-1,a=0,l=0;for(const c of e.events){if(c.type==="done"||c.type==="overflow")continue;const h=this.trailStepFor(c,i.length+1);switch(c.type){case"commandStart":o=c.index,this.deck.highlightSlot(c.index),await this.delay(n*.3);continue;case"loopStart":r=c.index,this.deck.highlightSlot(c.index),mt.play("loop");break;case"loopIter":this.deck.setIterBadge(c.index,`${c.iter}/${c.count}`),await this.delay(n*.25);break;case"loopEnd":case"loopFail":r>=0&&this.deck.setIterBadge(r,null),r=-1,c.type==="loopFail"&&mt.play("bump");break;case"gearTurn":this.bellRig?.gearTurn(),mt.play("loop");break;case"bellRing":a=c.total,this.bellRig?.ring(c.total),this.liftRig?.ring(),mt.play("star");break;case"bellClunk":this.bellRig?.clunk(),mt.play("bump");break;case"liftMove":l=c.to,this.liftRig?.setFloor(c.to),mt.play(c.dir==="up"?"hop":"drop");break;case"liftBump":this.liftRig?.bump(),mt.play("bump");break}h&&(i.push(h),this.trail.setSteps(i),this.trail.setMachineLine(this.statusLine(a,l))),await this.delay(n*(c.type==="loopStart"?.45:.65)),o>=0&&this.deck.highlightSlot(r>=0?r:-1)}if(this.deck.setRunning(!1),this.running=!1,e.success){e.usedLoop?this.wonLoopWay=!0:this.wonLongWay=!0,t.length<=this.level.par&&(this.everPar=!0),(this.level.bonus.kind==="bothWays"?this.wonLongWay&&this.wonLoopWay:e.finalState.floor===0)&&(this.everBonus=!0);const h=["It works!"];this.everPar&&h.push("Loop-short and clever!"),this.everBonus&&h.push(`Creative: ${this.level.bonus.text}!`);const d=h.length,u=this.events.store.stars[this.level.id]??0;this.events.store.setStars(this.level.id,Math.max(u,d)),this.topBar.setStars(Math.max(u,d)),this.zip.celebrate(),mt.play("celebrate"),qs(this.ui,{stars:d,starNames:h,predictedCorrectly:null},mt,{onReplay:()=>this.resetMachine(),onContinue:()=>this.events.hasNext&&this.events.onNext?this.events.onNext():this.events.onExit()}),this.level.bonus.kind==="bothWays"?!e.usedLoop&&!this.wonLoopWay?this.toast(`💡 ${e.actionsRun} actions in ${t.length} tiles — a REPEAT tile can do it in ${this.level.par}!`):this.wonLongWay&&this.wonLoopWay&&this.toast(`🔁 Same machine, ${t.length} tiles instead of ${zy(this.level)} — loops are SHORT!`):this.everBonus||this.toast("🚚 Delivered! Creative idea: bring the lift back DOWN for the next load!")}else{const c=Rx(this.level.goal,e.finalState);e.overflowed&&c.push("Whoa — that plan hit the safety limit! Shorter plans are safer."),this.mixy.glitchWobble(.8),this.mixy.flashMood("surprised",1600),mt.play("glitch"),this.trail.setSteps([...i.slice(-6),...c.map((h,d)=>({n:d+1,icon:"🔍",text:h,verdict:"no"}))],this.level.coachHint),this.toast("🛠️ Almost! Check the Think Trail, fix your plan, and BOP again!")}}trailStepFor(t,e){switch(t.type){case"gearTurn":return{n:e,icon:"⚙️",text:"Gear turned — bell wound up!",verdict:"ok"};case"bellRing":return{n:e,icon:"🔔",text:this.level.machine==="gearBell"?`DING! (${t.total} of ${this.level.goal.needRings??0})`:`DING! Rung on floor ${t.floor}`,verdict:"ok"};case"bellClunk":return{n:e,icon:"😅",text:"Clunk… no power! Turn the gear first.",verdict:"no"};case"liftMove":return{n:e,icon:t.dir==="up"?"⬆️":"⬇️",text:`Lift ${t.dir==="up"?"rose":"lowered"} to floor ${t.to}`,verdict:"ok"};case"liftBump":return{n:e,icon:"💥",text:t.at==="top"?"Bump — already at the top!":"Bump — already at the bottom!",verdict:"no"};case"loopStart":return{n:e,icon:"🔁",text:`Loop starts — ${t.count} times!`,verdict:"ok"};case"loopIter":return t.iter>1?{n:e,icon:"🔁",text:`Loop turn ${t.iter} of ${t.count}`}:null;case"loopEnd":return{n:e,icon:"✅",text:"Loop finished!",verdict:"ok"};case"loopFail":return{n:e,icon:"🤔",text:"The Repeat tile had nothing before it to repeat!",verdict:"no"};default:return null}}delay(t){return new Promise(e=>window.setTimeout(e,t))}toast(t){this.root.querySelector(".gw-toast")?.remove();const e=T("div","toast gw-toast",this.root,t);window.setTimeout(()=>e.remove(),3200)}dispose(){this.disposers.forEach(t=>t()),this.disposers=[],this.trail?.dispose(),this.zip?.dispose(),this.mixy?.dispose(),this.stage?.dispose(),this.root.innerHTML=""}}function zy(s){return s.machine==="gearBell"?(s.goal.needRings??2)*2:(s.goal.topFloor??2)+1}function de(s,t,e=0,n=0,i=0,r=!0,o=!0){const a=new It(s,t);return a.position.set(e,n,i),a.castShadow=r,a.receiveShadow=o,a}function tl(){const s=new nt;s.add(de(new Dt(.34,14,12),z("#e8384f"),0,0,0));const t=de(new $e(.16,.22,8),z("#57c14e"),0,.38,0,!1,!1);s.add(t);for(let e=0;e<6;e++){const n=e/6*Math.PI*2;s.add(de(new Dt(.03,6,6),z("#ffd97a"),Math.cos(n)*.22,Math.sin(n*1.7)*.15,.28,!1,!1))}return s}class cd{group=new nt;iris;lid;on=!1;pulse=0;constructor(){const t=de(new Dt(.42,16,12),z("#fff6e3"),0,0,0);this.group.add(t),this.iris=de(new Dt(.2,12,10),new Jt({color:"#5a6285",emissive:"#000000",emissiveIntensity:0}),0,-.02,.3,!1,!1),this.group.add(this.iris),this.lid=de(new Dt(.44,16,8,0,Math.PI*2,0,Math.PI*.42),z("#39406e"),0,.02,0,!1,!1),this.group.add(this.lid)}set(t){t&&!this.on&&(this.pulse=1),this.on=t;const e=this.iris.material;t?(e.color.set("#3ed35f"),e.emissive.set("#2bb44b"),e.emissiveIntensity=1):(e.color.set("#5a6285"),e.emissive.set("#000000"),e.emissiveIntensity=0)}update(t,e){const n=this.on?-.34:.02;this.lid.position.y+=(n-this.lid.position.y)*Math.min(1,t*8),this.pulse>0?(this.pulse=Math.max(0,this.pulse-t*1.6),this.group.scale.setScalar(1+Math.sin(e*16)*.08*this.pulse)):this.on?this.group.scale.setScalar(1+Math.sin(e*3)*.03):this.group.scale.setScalar(1)}}const Wi=-3.1,pn=.7,aa=2.6,Nr=1.02;class Gy{group=new nt;eye=new cd;clawL;clawR;clawArm;berry;basketBerries;stripes=[];beltOn=!1;berryMode="hidden";berryT=0;clawClose=0;clawTarget=0;snapT=0;constructor(){this.group.name="berry-line-rig",this.group.add(de(new gt(8.2,.3,2.8,2,.1),z("#1b2664"),0,.15,0)),this.group.add(de(new gt(6.4,.5,1.6,2,.12),z("#39406e"),-.25,.75,0));for(let n=Wi+.4;n<=aa-.2;n+=1.1){const i=de(new Pt(.16,.16,1.5,10),z("#aab3c8"),n,.62,0);i.rotation.x=Math.PI/2,this.group.add(i)}this.group.add(de(new gt(6.2,.14,1.4,1,.05),z("#2c3f8f"),-.25,Nr-.08,0,!1,!0));for(let n=0;n<7;n++){const i=de(new gt(.16,.05,1.2,1,.02),z("#4a72dd"),Wi+.5+n*.9,Nr,0,!1,!1);this.group.add(i),this.stripes.push(i)}this.group.add(de(new gt(.24,2.1,.34,1,.08),z("#2c3f8f"),pn+1,1.35,-.75)),this.eye.group.position.set(pn+.55,2.5,-.35),this.eye.group.rotation.y=-.22,this.eye.group.rotation.x=.28,this.group.add(this.eye.group),this.group.add(de(new gt(.3,3.2,.4,1,.08),z("#c9843c"),pn-1.4,1.9,-.6)),this.group.add(de(new gt(1.9,.26,.36,1,.08),z("#c9843c"),pn-.55,3.45,-.6)),this.clawArm=new nt,this.clawArm.add(de(new Pt(.12,.12,.9,10),z("#aab3c8"),0,.45,0));const t=new gt(.14,.75,.3,1,.05);this.clawL=de(t,z("#e05a3a"),-.3,-.32,0),this.clawR=de(t,z("#e05a3a"),.3,-.32,0),this.clawArm.add(this.clawL,this.clawR),this.clawArm.position.set(pn,2.6,0),this.group.add(this.clawArm);const e=new nt;e.add(de(new Pt(.65,.5,.62,14),z("#c9843c"),0,.31,0)),e.add(de(new Le(.62,.07,8,18),z("#a86a2c"),0,.62,0,!1,!1)),e.position.set(3.35,.3,.3),this.group.add(e),this.basketBerries=new nt,this.basketBerries.position.copy(e.position),this.group.add(this.basketBerries),this.berry=tl(),this.berry.visible=!1,this.group.add(this.berry)}setBelt(t){this.beltOn=t}setSensor(t){this.eye.set(t)}berryEnter(){this.berry.visible=!0,this.berry.position.set(Wi,Nr+.36,0),this.berryMode="entering",this.berryT=0}berryLeave(){this.berryMode!=="hidden"&&(this.berryMode="leaving",this.berryT=0)}grab(t){this.clawTarget=1,this.berryMode="toBasket",this.berryT=0;const e=tl();e.scale.setScalar(.8);const n=this.basketBerries.children.length;e.position.set(n%2*.3-.15,.62+Math.floor(n/2)*.2,0),window.setTimeout(()=>this.basketBerries.add(e),520)}snap(){this.clawTarget=1,this.snapT=1,window.setTimeout(()=>{this.clawTarget=0},420)}openClaw(){this.clawTarget=0}reset(){this.beltOn=!1,this.berry.visible=!1,this.berryMode="hidden",this.clawTarget=0,this.snapT=0,this.eye.set(!1),this.basketBerries.clear()}update(t,e){if(this.beltOn)for(const n of this.stripes)n.position.x+=t*1.1,n.position.x>aa&&(n.position.x=Wi+.3);if(this.berryMode==="entering")this.berryT=Math.min(1,this.berryT+t*1.4),this.berry.position.x=Wi+(pn-Wi)*this.berryT,this.berryT>=1&&(this.berryMode="waiting");else if(this.berryMode==="leaving")this.berryT=Math.min(1,this.berryT+t*1.2),this.berry.position.x=pn+(aa+1.2-pn)*this.berryT,this.berryT>.75&&(this.berry.position.y-=t*3),this.berryT>=1&&(this.berry.visible=!1,this.berryMode="hidden");else if(this.berryMode==="toBasket"){this.berryT=Math.min(1,this.berryT+t*2.2);const n=this.berryT;this.berry.position.x=pn+(3.35-pn)*n,this.berry.position.y=Nr+.36+Math.sin(n*Math.PI)*1.6,n>=1&&(this.berry.visible=!1,this.berryMode="hidden",this.clawTarget=0)}this.clawClose+=(this.clawTarget-this.clawClose)*Math.min(1,t*10),this.clawL.position.x=-.3+this.clawClose*.17,this.clawR.position.x=.3-this.clawClose*.17,this.clawL.rotation.z=-this.clawClose*.25,this.clawR.rotation.z=this.clawClose*.25,this.snapT>0&&(this.snapT=Math.max(0,this.snapT-t*2.4),this.clawArm.position.x=pn+Math.sin(e*30)*.05*this.snapT),this.eye.update(t,e)}}class Hy{group=new nt;gear;eye=new cd;boom;warnDome;cart;turning=!1;gateOpenT=0;gateTarget=0;warnT=0;cartT=-1;constructor(){this.group.name="workshop-rig",this.group.add(de(new gt(8.6,.3,2.8,2,.1),z("#1b2664"),0,.15,0)),this.group.add(de(new gt(.5,1.7,.62,1,.1),z("#39406e"),-2.7,1.15,-.3)),this.gear=ls({color:"#ff9f2e",radius:1.15,teeth:14}),this.gear.position.set(-2.7,2.1,.1),this.gear.traverse(i=>{i.userData.gwInput=!0}),this.group.add(this.gear);const t=new It(new Le(1.45,.06,8,32),new Jt({color:"#7fc4ff",emissive:"#3d8fe0",emissiveIntensity:.5,transparent:!0,opacity:.5}));t.position.set(-2.7,2.1,-.15),t.userData.gwInput=!0,this.group.add(t),this.group.add(de(new gt(.24,2.3,.34,1,.08),z("#2c3f8f"),-.7,1.45,-.6)),this.eye.group.position.set(-.7,2.75,-.25),this.eye.group.rotation.y=-.7,this.group.add(this.eye.group),this.group.add(de(new gt(.5,1.5,.6,1,.1),z("#2c3f8f"),1.6,1.05,-.2)),this.boom=new nt;const e=de(new gt(2.6,.22,.3,1,.08),z("#e8384f"),1.3,0,0);for(let i=0;i<3;i++)e.add(de(new gt(.42,.23,.31,1,.08),z("#fff6e3"),-.85+i*.85,0,.001,!1,!1));this.boom.add(e),this.boom.position.set(1.6,1.8,-.2),this.group.add(this.boom),this.group.add(de(new Pt(.09,.11,1.9,10),z("#aab3c8"),.6,1.25,-.7)),this.warnDome=de(new Dt(.32,14,10),new Jt({color:"#8a5560",emissive:"#000000",emissiveIntensity:0}),.6,2.35,-.7,!1,!1),this.group.add(this.warnDome),this.cart=new nt,this.cart.add(de(new gt(1.1,.5,.8,2,.1),z("#38b6ff"),0,.55,0));for(const i of[-.35,.35]){const r=de(new Pt(.18,.18,.12,12),z("#16225c"),i,.22,.42);r.rotation.x=Math.PI/2,this.cart.add(r)}const n=tl();n.scale.setScalar(.7),n.position.set(0,.95,0),this.cart.add(n),this.cart.position.set(3.6,.3,.35),this.group.add(this.cart),this.setTurning(!1)}inputTargets(){return[this.gear]}setTurning(t){this.turning=t,this.eye.set(t)}isTurning(){return this.turning}openGate(){this.gateTarget=1,this.cartT=0}warn(){this.warnT=3.2}reset(){this.gateTarget=0,this.gateOpenT=0,this.boom.rotation.z=0,this.warnT=0,this.cartT=-1,this.cart.position.x=3.6;const t=this.warnDome.material;t.emissiveIntensity=0,t.color.set("#8a5560")}update(t,e){if(this.turning&&(this.gear.rotation.z-=t*1.6),this.gateOpenT+=(this.gateTarget-this.gateOpenT)*Math.min(1,t*5),this.boom.rotation.z=this.gateOpenT*1.35,this.cartT>=0&&this.gateOpenT>.7&&(this.cartT=Math.min(1,this.cartT+t*.55),this.cart.position.x=3.6-this.cartT*5.4),this.warnT>0){this.warnT=Math.max(0,this.warnT-t);const n=this.warnDome.material,i=Math.sin(e*10)>0;n.color.set(i?"#ff5f6d":"#8a5560"),n.emissive.set("#e8384f"),n.emissiveIntensity=i?1.2:.1,this.warnT===0&&(n.emissiveIntensity=0,n.color.set("#8a5560"))}this.eye.update(t,e)}}const Vy=640;class Wy{constructor(t,e,n){this.root=t,this.level=e,this.events=n}stage;scene;berryRig=null;shopRig=null;zip;mixy;trail;deck;topBar;charLayer;ui;disposers=[];running=!1;calm=!1;everPar=!1;everBonus=!1;okTurning=!1;okStill=!1;enter(){const t=T("div","",this.root);t.id="world-canvas-wrap",this.charLayer=T("div","",this.root),this.charLayer.id="char-layer",this.ui=T("div","ui-layer",this.root);const e=uo.bench;if(this.stage=new Ti(t,{viewDir:e.viewDir,fovFor:e.fovFor,indoor:!0}),this.stage.setSky("#141c4a",40,90),this.scene=new fo("motorLab"),this.stage.scene.add(this.scene.group),this.stage.frameArea(this.scene.frameCenter(),this.scene.frameCorners()),this.level.machine==="berry")this.berryRig=new Gy,this.berryRig.group.position.copy(this.scene.benchAnchor()),this.stage.scene.add(this.berryRig.group);else{this.shopRig=new Hy,this.shopRig.group.position.copy(this.scene.benchAnchor()),this.stage.scene.add(this.shopRig.group);const n=new vl,i=r=>{if(this.running||!this.shopRig)return;const o=t.getBoundingClientRect(),a=new at((r.clientX-o.left)/o.width*2-1,-((r.clientY-o.top)/o.height)*2+1);if(n.setFromCamera(a,this.stage.camera),n.intersectObjects(this.shopRig.inputTargets(),!0).length>0){const l=!this.shopRig.isTurning();this.shopRig.setTurning(l),mt.play(l?"loop":"drop"),this.trail.setMachineLine(this.statusLine()),this.zip.flashMood("excited",900),this.toast(l?"⚙️ The gear is TURNING — the eye sees it!":"🛑 The gear is STILL — the eye went grey.")}};t.addEventListener("pointerdown",i),this.disposers.push(()=>t.removeEventListener("pointerdown",i))}this.zip=new _n({svgUrl:"./art/characters/zip/zip.svg",height:2.35,name:"zip"},this.charLayer,this.stage.camera,t),this.zip.addToScene(this.stage.scene),this.zip.placeAt(this.scene.zipSpot()),this.zip.look("right"),this.addNameChip(this.zip,"Zip"),this.mixy=new _n({svgUrl:"./art/characters/mixy/mixy.svg",height:2.1,name:"mixy",mixy:!0},this.charLayer,this.stage.camera,t),this.mixy.addToScene(this.stage.scene),this.mixy.placeAt(this.scene.mixySpot()),this.mixy.look("left"),this.addNameChip(this.mixy,"GlitchBop"),this.topBar=new Xs(this.ui,`${this.level.title} · ${this.level.shortTitle}`,{onBack:this.events.onExit,onSettings:()=>js(this.ui,this.events.store,mt,()=>this.applySettings())}),this.topBar.setStars(this.events.store.stars[this.level.id]??0),new $s(this.ui,this.level.goalText,this.level.emoji),this.trail=new po(this.ui),this.trail.setMachineLine(this.statusLine()),this.deck=new Ml(this.ui,this.level.commands,this.level.maxSlots,{onChange:()=>{},onBop:()=>void this.onBop(),onClear:()=>this.resetMachine()},{tiles:gy}),this.applySettings(),this.disposers.push(this.stage.onTick((n,i)=>{this.calm||this.scene.update(n,i),this.berryRig?.update(n,i),this.shopRig?.update(n,i),this.zip.update(n,i),this.mixy.update(n,i)})),this.stage.startLoop(),Ys(this.ui,this.level,mt).then(()=>{this.zip.setMood("happy"),window.setTimeout(()=>this.zip.setMood("idle"),1600)})}applySettings(){this.calm=this.events.store.settings.calmMode,mt.enabled=this.events.store.settings.sound,this.zip.setCalm(this.calm),this.mixy.setCalm(this.calm),document.body.classList.toggle("calm-mode",this.calm),document.body.classList.toggle("high-contrast",this.events.store.settings.highContrast),document.body.classList.toggle("left-handed",this.events.store.settings.leftHanded)}addNameChip(t,e){t.whenReady().then(()=>{T("span","gw-name-chip",t.el,e).setAttribute("aria-hidden","true")})}statusLine(){return this.level.machine==="berry"?"Eye: sees nothing 👁️":this.shopRig?.isTurning()?"Input: gear TURNING ⚙️ (tap to change)":"Input: gear STILL 🛑 (tap to change)"}resetMachine(){if(this.berryRig?.reset(),this.shopRig){const t=this.shopRig.isTurning();this.shopRig.reset(),this.shopRig.setTurning(t)}this.trail.setEmpty(),this.trail.setMachineLine(this.statusLine())}async onBop(){if(this.running)return;this.running=!0,this.deck.setRunning(!0),this.resetMachine(),this.zip.setMood("thinking");const t=this.deck.getProgram(),e=this.shopRig?.isTurning()??!1,n=Ix(t,this.level.machine,{gearTurning:e}),i=this.calm?380:Vy,r=[];for(const a of n.events){if(a.type==="done"||a.type==="overflow")continue;if(a.type==="commandStart"){this.deck.highlightSlot(a.index),await this.delay(i*.3);continue}this.applyEventVisual(a);const l=this.trailStepFor(a,r.length+1);l&&(r.push(l),this.trail.setSteps(r)),await this.delay(i*this.eventBeat(a))}this.deck.highlightSlot(-1);const o=this.level.machine==="berry"?Dx(this.level.berryGoal??{needBerries:1},n.finalState):Nx(n.finalState,e);if(this.deck.setRunning(!1),this.running=!1,o){t.length<=this.level.par&&(this.everPar=!0),this.level.bonus.kind==="secondBerry"?n.finalState.berriesGrabbed>=2&&(this.everBonus=!0):(e?this.okTurning=!0:this.okStill=!0,this.okTurning&&this.okStill&&(this.everBonus=!0));const a=["It works!"];this.everPar&&a.push("Sensor-smart and clever!"),this.everBonus&&a.push(`Creative: ${this.level.bonus.text}!`);const l=a.length,c=this.events.store.stars[this.level.id]??0;this.events.store.setStars(this.level.id,Math.max(c,l)),this.topBar.setStars(Math.max(c,l)),this.zip.celebrate(),mt.play("celebrate"),qs(this.ui,{stars:l,starNames:a,predictedCorrectly:null},mt,{onReplay:()=>this.resetMachine(),onContinue:()=>this.events.hasNext&&this.events.onNext?this.events.onNext():this.events.onExit()}),this.everBonus||this.toast(this.level.bonus.kind==="secondBerry"?"🍓 The belt keeps rolling — can you grab TWO berries in one plan?":`🚦 Now tap the gear ${e?"STILL":"TURNING"} and BOP again — test the other branch!`)}else{const a=this.level.machine==="berry"?Ux(this.level.berryGoal??{needBerries:1},n.finalState):kx(n.finalState,e);n.overflowed&&a.push("That plan hit the safety limit — shorter plans are safer!"),this.mixy.glitchWobble(.8),this.mixy.flashMood("surprised",1600),mt.play("glitch"),this.trail.setSteps([...r.slice(-6),...a.map((l,c)=>({n:c+1,icon:"🔍",text:l,verdict:"no"}))],this.level.coachHint),this.toast("🛠️ Almost! Check the Think Trail, fix your plan, and BOP again!")}}eventBeat(t){switch(t.type){case"berryArrive":return 1;case"waitUntilMet":return .9;case"grab":return 1;case"grabSnap":return 1;case"berryMissed":return 1;case"waitTick":return .55;default:return .65}}applyEventVisual(t){switch(t.type){case"beltStart":this.berryRig?.setBelt(!0),mt.play("bop");break;case"berryArrive":this.berryRig?.berryEnter(),this.berryRig?.setSensor(!0),mt.play("predictRight");break;case"berryMissed":this.berryRig?.berryLeave(),this.berryRig?.setSensor(!1),mt.play("bump");break;case"grab":this.berryRig?.grab(t.total),this.berryRig?.setSensor(!1),mt.play("grab");break;case"grabSnap":this.berryRig?.snap(),mt.play("bump");break;case"waitUntilStart":mt.play("tap");break;case"waitUntilMet":mt.play("place");break;case"waitUntilGaveUp":mt.play("glitch");break;case"waitTick":mt.play("tap");break;case"guard":mt.play(t.holds?"predictRight":"remove");break;case"gateOpen":this.shopRig?.openGate(),mt.play(t.wrong?"glitch":"celebrate");break;case"warnLight":this.shopRig?.warn(),mt.play(t.wrong?"glitch":"drop");break}}trailStepFor(t,e){switch(t.type){case"beltStart":return{n:e,icon:"🛤️",text:"Belt ON — a berry is on its way!",verdict:"ok"};case"noop":return{n:e,icon:"💭",text:"The belt was already on."};case"waitTick":return{n:e,icon:"⏳",text:t.sensorOn?"Waited… the eye sees the berry!":"Waited one tick… nothing yet.",verdict:t.sensorOn?"ok":void 0};case"waitUntilStart":return{n:e,icon:"👁️",text:"Watching the eye sensor…"};case"berryArrive":return{n:e,icon:"🍓",text:"The berry ARRIVED — the eye turned green!",verdict:"ok"};case"waitUntilMet":return{n:e,icon:"✨",text:`Slept exactly ${t.slept} tick${t.slept===1?"":"s"} — no counting needed!`,verdict:"ok"};case"waitUntilGaveUp":return{n:e,icon:"😴",text:"Waited and waited… nothing ever came. Is the belt on?",verdict:"no"};case"grab":return{n:e,icon:"🦾",text:`Grabbed the berry! (${t.total})`,verdict:"ok"};case"grabSnap":return{n:e,icon:"😅",text:"SNAP — the claw closed on air!",verdict:"no"};case"berryMissed":return{n:e,icon:"💨",text:"The berry rode right past the claw!",verdict:"no"};case"guard":return{n:e,icon:t.cond==="turning"?"⚙️":"🛑",text:t.holds?`The gear IS ${t.cond} — do the next tile!`:`The gear is NOT ${t.cond} — skip the next tile.`,verdict:"ok"};case"skipped":return{n:e,icon:"⏭️",text:"Skipped."};case"gateOpen":return{n:e,icon:"🚧",text:t.wrong?"The gate opened… with no power?!":"Gate OPEN — the cart rolls through!",verdict:t.wrong?"no":"ok"};case"warnLight":return{n:e,icon:"🚨",text:t.wrong?"False alarm — the gear was running fine!":"Warning light ON — everyone knows it stopped!",verdict:t.wrong?"no":"ok"};default:return null}}delay(t){return new Promise(e=>window.setTimeout(e,t))}toast(t){this.root.querySelector(".gw-toast")?.remove();const e=T("div","toast gw-toast",this.root,t);window.setTimeout(()=>e.remove(),3200)}dispose(){this.disposers.forEach(t=>t()),this.disposers=[],this.trail?.dispose(),this.zip?.dispose(),this.mixy?.dispose(),this.stage?.dispose(),this.root.innerHTML=""}}const Xy=[{name:"Sequences",emoji:"➡️",blurb:"Ordering steps to reach a goal — the foundation of all programs.",levelIds:["sm-1","sm-2"]},{name:"Loops",emoji:"↻",blurb:"Repeating a pattern with counted and stop-conditioned loops.",levelIds:["bb-1","bb-2","bb-3","bb-debug","bb-creative"]},{name:"Conditions",emoji:"🌸",blurb:"“If you see a flower, grab it” — decisions inside a program.",levelIds:["pf-1","pf-2","pf-3","pf-debug","pf-creative"]},{name:"Machines",emoji:"⚙️",blurb:"Events, state and safe stopping — programming real machines.",levelIds:["gw-motor-start","gw-motor-programmer"]},{name:"Teamwork",emoji:"🤖",blurb:"Coordinating two bots with a shared plan (task switching).",levelIds:["rt-1","rt-2","rt-3","rt-debug","rt-creative"]}];function $y(s){if(s<60)return`${s}s`;const t=Math.floor(s/60);return t<60?`${t} min`:`${Math.floor(t/60)}h ${t%60}m`}function Yy(s,t){const e=T("button","campfire-gate",s);e.type="button",e.innerHTML='🔥<span class="ring"></span>',e.setAttribute("aria-label","Grown-ups: hold to open the Campfire");let n=null;const i=()=>{n!==null&&window.clearTimeout(n),n=null,e.classList.remove("holding")};return e.addEventListener("pointerdown",()=>{e.classList.add("holding"),n=window.setTimeout(()=>{i(),t()},1200)}),e.addEventListener("pointerup",i),e.addEventListener("pointerleave",i),e.addEventListener("pointercancel",i),e}function qy(s,t,e){const n=T("div","dialog-scrim",s),i=T("div","dialog campfire-dialog",n);i.setAttribute("role","dialog"),i.setAttribute("aria-label","Grown-Up Campfire"),T("div","intro-emoji",i,"🔥"),T("h2",void 0,i,"Grown-Up Campfire"),T("p","camp-sub",i,"A quiet moment to see how your little builder is doing.");const r=T("div","camp-stats",i),o=Object.values(t.stars).reduce((m,p)=>m+p,0),a=Object.keys(t.stars).filter(m=>(t.stars[m]??0)>0).length,l=(m,p,b)=>{const x=T("div","camp-stat",r);T("span","cs-emoji",x,m),T("span","cs-value",x,p),T("span","cs-label",x,b)};l("⭐",String(o),"stars earned"),l("🗺️",`${a}/${mn.length}`,"levels completed"),l("📅",String(t.daily.streak),"day streak"),l("⏱️",$y(t.playSeconds),"total play time"),T("h3",void 0,i,"Concepts practiced");const c=T("div","camp-concepts",i);for(const m of Xy){const p=m.levelIds.filter(_=>(t.stars[_]??0)>0).length,b=T("div","camp-concept",c);T("span","cc-emoji",b,m.emoji);const x=T("div","cc-mid",b);T("div","cc-name",x,m.name),T("div","cc-blurb",x,m.blurb),T("span",`cc-progress${p===m.levelIds.length?" full":""}`,b,`${p}/${m.levelIds.length}`)}const h=ho().length;if(h>0){const m=T("div","camp-concept",c);T("span","cc-emoji",m,"🏝️");const p=T("div","cc-mid",m);T("div","cc-name",p,"Creation"),T("div","cc-blurb",p,"Designing original puzzles on Imagination Island."),T("span","cc-progress full",m,`${h} built`)}const d=T("div","dlg-actions camp-actions",i),u=T("button","mini-btn danger",d,"Reset all progress");u.type="button";let f=!1;u.addEventListener("click",()=>{if(!f){f=!0,u.textContent="Tap again to really reset ⚠️";return}t.reset(),v()});const g=T("button","btn-play small",d,"Close");g.type="button";const v=()=>n.remove();g.addEventListener("click",v),n.addEventListener("click",m=>{m.target===n&&v()})}const jy={"sparkle-meadow":{emoji:"🌼",name:"Sparkle Meadow",theme:"meadow"},"bubble-bay":{emoji:"🐚",name:"Bubble Bay",theme:"bay"},"pattern-forest":{emoji:"🌸",name:"Pattern Forest",theme:"forest"},"robot-town":{emoji:"🤖",name:"Robot Town",theme:"town"},"agent-academy":{emoji:"🎓",name:"Agent Academy",theme:"academy"}},Zy=["sparkle-meadow","bubble-bay","pattern-forest","robot-town","agent-academy"];function Ky(){const s=new Date;return(Math.floor(new Date(s.getFullYear(),s.getMonth(),s.getDate()).getTime()/864e5)%mn.length+mn.length)%mn.length}class Jy{host;gameScreen=null;garden=null;editor=null;gearworks=null;store=new Ts;mascotStops=[];constructor(t){this.host=t}start(){this.showTitle()}clearHost(){this.mascotStops.forEach(t=>t()),this.mascotStops=[],this.gameScreen?.dispose(),this.gameScreen=null,this.garden?.dispose(),this.garden=null,this.editor?.dispose(),this.editor=null,this.gearworks?.dispose(),this.gearworks=null,this.host.innerHTML=""}showTitle(){this.clearHost();const t=T("section","screen title-screen",this.host);t.id="screen-title",T("div","title-rays",t);for(const f of["c1","c2","c3"])T("div",`title-cloud ${f}`,t);["⭐","✨","⬡","✦","💧","⭐","✨"].forEach((f,g)=>{T("span",`title-spark s${g}`,t,f).setAttribute("aria-hidden","true")});const n=T("div","title-ground",t);T("div","title-hill h1",n),T("div","title-hill h2",n);for(const f of["b1","b2","b3","b4"])T("div",`title-bush ${f}`,n);["🌸","🌼","🌺","🌻"].forEach((f,g)=>T("span",`title-flower f${g}`,n,f));const r=T("div","title-mascot zip",t);Fs(r,"./art/characters/zip/zip.svg").then(f=>{f&&this.mascotStops.push(eo(f))});const o=T("div","title-mascot mixy",t);Fs(o,"./art/characters/mixy/mixy.svg").then(f=>{f&&this.mascotStops.push(eo(f))});const a=T("div","title-card",t),l=T("div","title-logo-art",a);l.setAttribute("role","img"),l.setAttribute("aria-label","CodeBops");const c=T("div","logo-shine",l);Qh("./art/logo.svg").then(f=>{l.insertAdjacentHTML("afterbegin",f);const g=`url("data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(f)))}")`;c.style.webkitMaskImage=g,c.style.maskImage=g}),l.addEventListener("pointerdown",()=>{mt.play("star"),l.classList.remove("replay"),l.offsetWidth,l.classList.add("replay")});const h=T("div","title-tag",a);T("span","tag-star",h,"⭐"),T("span",void 0,h,"Teach tiny helpers. Build big ideas."),T("span","tag-star",h,"⭐");const d=T("button","btn-play",a);d.type="button",d.setAttribute("aria-label","Play CodeBops"),T("span","gloss",d),d.append("PLAY"),T("span","tri",d),d.addEventListener("click",()=>{mt.play("bop"),this.showSelect()});const u=T("button","garden-btn",a);u.type="button",T("span",void 0,u,"🌻"),T("span",void 0,u,"My Garden"),u.addEventListener("click",()=>this.showGarden()),Yy(t,()=>{this.store=new Ts,qy(t,this.store)})}showSelect(){this.clearHost(),this.store=new Ts;const t=T("section","screen",this.host),e=T("div","select-wrap",t);for(const x of["c1","c2"])T("div",`title-cloud select-cloud ${x}`,e);const n=T("div","select-header",e),i=T("button","circle-btn",n,"←");i.type="button",i.setAttribute("aria-label","Back to title"),i.addEventListener("click",()=>this.showTitle()),T("h1",void 0,n,"Pick a Level!");const r=Object.values(this.store.stars).reduce((x,_)=>x+_,0),o=T("div","stars-pill",n);o.style.marginLeft="auto",T("span","star earned",o,"★"),T("span",void 0,o,` ${r}`);const a=T("button","stars-pill garden-pill",n);a.type="button",a.setAttribute("aria-label","Visit the Bop Garden"),T("span",void 0,a,"🌻"),T("span",void 0,a,` ${this.store.daily.totalCompleted}`),a.addEventListener("click",()=>this.showGarden());const l=Ky(),c=mn[l],h=this.store.daily.lastCompleted===bl(),d=T("button",`daily-card${h?" done":""}`,e);d.type="button",T("span","dc-emoji",d,h?"✅":"📅");const u=T("span","dc-mid",d);T("span","dc-title",u,h?"Daily Bop — done!":"Daily Bop"),T("span","dc-sub",u,h?`Come back tomorrow — 🔥 ${this.store.daily.streak} day streak!`:`Today's puzzle: ${c.shortTitle} ${c.brief.emoji}`),T("span","dc-streak",d,`🔥 ${this.store.daily.streak}`),h||d.addEventListener("click",()=>this.showGame(l,{onSuccess:()=>{const x=this.store.completeDaily();window.setTimeout(()=>this.streakToast(x),900)}}));let f=0;for(const x of Zy){const _=mn.filter(D=>D.worldId===x);if(_.length===0)continue;const L=jy[x],R=f,E=R===0||(this.store.stars[mn[R-1].id]??0)>=1,P=T("div",`world-panel wp-${L.theme}${E?"":" locked"}`,e),M=T("div","world-title",P);T("span","wemoji",M,L.emoji),T("span",void 0,M,L.name),E||T("span","world-lock",M,"🔒");const y=T("div","level-list",P);for(const D of _){const O=f,B=O===0||(this.store.stars[mn[O-1].id]??0)>=1,V=this.store.stars[D.id]??0,$=T("button",`level-item${B?"":" locked"}${D.prefill?" debug":""}`,y);$.type="button",$.setAttribute("aria-label",B?`Play ${D.shortTitle}`:`${D.shortTitle} — locked`);const X=T("span","li-num",$);T("span","li-num-text",X,String(O+1)),T("span","li-leaf",X,"🍃"),T("span","li-emoji",$,D.brief.emoji),T("span","li-name",$,D.shortTitle);const K=T("span","li-right",$);B||T("span","li-lock",K,"🔒");const W=T("span","li-stars",K);for(let lt=0;lt<3;lt++)T("span",lt<V?"on":"",W,"★");B?$.addEventListener("click",()=>this.showGame(O)):$.addEventListener("click",()=>{mt.play("bump"),$.classList.remove("shake"),$.offsetWidth,$.classList.add("shake"),this.hintToast("⭐ Win the level before this one to unlock it!")}),f++}}{const x=T("div","world-panel wp-garage",e),_=T("div","world-title",x);T("span","wemoji",_,nh.emoji),T("span",void 0,_,nh.name),T("span","gw-new-badge",_,"NEW!");const L=T("div","level-list",x);let R=0;_y.forEach((E,P)=>{const M=E.kind!=="soon",y=R,D=M&&(y===0||(this.store.stars[vy(Vr[y-1])]??0)>=1);M&&R++;const O=E.kind==="soon"?E.shortTitle:E.level.shortTitle,B=E.kind==="soon"?E.emoji:E.level.emoji,V=T("button",`level-item${D?"":" locked"}`,L);V.type="button",V.setAttribute("aria-label",D?`Play ${O}`:`${O} — locked`);const $=T("span","li-num gw-num",V);T("span","li-num-text",$,String(P+1)),T("span","li-leaf",$,"⚙️"),T("span","li-emoji",V,B),T("span","li-name",V,O);const X=T("span","li-right",V);D||T("span","li-lock",X,"🔒");const K=E.kind==="soon"?0:this.store.stars[E.level.id]??0,W=T("span","li-stars",X);for(let lt=0;lt<3;lt++)T("span",lt<K?"on":"",W,"★");D?V.addEventListener("click",()=>this.showGearworks(y)):V.addEventListener("click",()=>{mt.play("bump"),V.classList.remove("shake"),V.offsetWidth,V.classList.add("shake"),this.hintToast(M?"⭐ Win the machine before this one to unlock it!":"🔧 Zip is still building this machine!")})})}const g=ho(),v=T("div","world-panel wp-island",e),m=T("div","world-title",v);T("span","wemoji",m,"🏝️"),T("span",void 0,m,"Imagination Island");const p=T("div","level-list",v),b=T("button","level-item create-item",p);b.type="button",T("span","li-emoji",b,"＋"),T("span","li-name",b,"Build a Level"),b.addEventListener("click",()=>this.showEditor());for(const x of g){const _=T("button","level-item custom-item",p);_.type="button",T("span","li-emoji",_,"🛠️"),T("span","li-name",_,x.shortTitle),_.addEventListener("click",()=>this.showCustomGame(x));const L=T("span","lv-del",_,"✕");L.setAttribute("aria-label",`Delete ${x.shortTitle}`),L.addEventListener("click",R=>{R.stopPropagation(),cx(x.id),this.showSelect()})}}hintToast(t){document.querySelector(".app-toast")?.remove();const e=T("div","toast app-toast",this.host,t);window.setTimeout(()=>e.remove(),2200)}streakToast(t){document.querySelector(".app-toast")?.remove();const e=T("div","toast app-toast streak-toast",this.host,`🔥 Daily Bop streak: ${t} day${t===1?"":"s"}! A golden flower joins your garden 🌻`);window.setTimeout(()=>e.remove(),3400)}showGame(t,e={}){this.clearHost();const n=T("section","screen",this.host);n.id="screen-game";const i=mn[t];this.gameScreen=new ea(n,i,{onExit:()=>this.showSelect(),onNextLevel:()=>this.showGame(Math.min(t+1,mn.length-1)),hasNext:t<mn.length-1,onSuccess:e.onSuccess,store:this.store}),this.gameScreen.enter()}showCustomGame(t){this.clearHost();const e=T("section","screen",this.host);e.id="screen-game",this.gameScreen=new ea(e,t,{onExit:()=>this.showSelect(),onNextLevel:()=>this.showSelect(),hasNext:!1,store:this.store}),this.gameScreen.enter()}showGearworks(t){this.clearHost();const e=T("section","screen",this.host);e.id="screen-gearworks";const n=Vr[t],i=t<Vr.length-1,r={onExit:()=>this.showSelect(),onNext:i?()=>this.showGearworks(t+1):void 0,hasNext:i,store:this.store};this.gearworks=n.kind==="machine"?new Ay(e,n.level,r):n.kind==="chain"?new Ny(e,n.level,r):n.kind==="loop"?new By(e,n.level,r):new Wy(e,n.level,r),this.gearworks.enter()}showGarden(){this.clearHost(),this.store=new Ts;const t=T("section","screen",this.host);t.id="screen-garden",this.garden=new ux(t,this.store,{onBack:()=>this.showTitle()}),this.garden.enter()}showEditor(){this.clearHost();const t=T("section","screen",this.host);t.id="screen-editor",this.editor=new mx(t,{onBack:()=>this.showSelect(),onPlay:e=>{this.clearHost();const n=T("section","screen",this.host);n.id="screen-game",this.gameScreen=new ea(n,e,{onExit:()=>this.showEditor(),onNextLevel:()=>this.showEditor(),hasNext:!1,store:this.store}),this.gameScreen.enter()},onSaved:()=>{}}),this.editor.enter()}}function Qy(){const s=document.getElementById("app");if(!s)throw new Error("[CodeBops] Missing #app host element.");new Jy(s).start(),document.getElementById("boot-loader")?.remove()}Qy();
