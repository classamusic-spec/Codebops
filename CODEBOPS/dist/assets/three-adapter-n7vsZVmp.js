import{poseToNodes as h}from"./codebops-rig-DBbS43zB.js";/*!
 * codebops-rig/three-adapter — optional Three.js renderer.
 * Import Three yourself and pass it in; this file imports nothing but the engine.
 *
 *   import * as THREE from 'three';
 *   import { createRig } from './codebops-rig.js';
 *   import MIXY from './characters/mixy.js';
 *   import { attachThree } from './three-adapter.js';
 *
 *   const rig  = await createRig(MIXY, { renderer: 'none' });
 *   const view = attachThree(THREE, rig, { scene });
 *   // loop:  rig.update(dt); view.sync(); renderer.render(scene, camera);
 *
 * Use an ORTHOGRAPHIC camera. Layers sit at z = depth * 0.01, which is what
 * gives the three-quarter turn its parallax.
 */const r=.01,x=(a,l)=>[(a-512)*r,(512-l)*r];function v(a,l,y={}){const c=l.character,f=new a.Object3D,d={};for(const e in c.nodes)d[e]=new a.Object3D,d[e].name=e;for(const e in c.nodes){const t=c.nodes[e],o=d[e],[n,s]=x(t.pivot[0],t.pivot[1]);if(t.parent){const[p,m]=x(c.nodes[t.parent].pivot[0],c.nodes[t.parent].pivot[1]);o.position.set(n-p,s-m,0),d[t.parent].add(o)}else o.position.set(n,s,0),f.add(o);o.userData.base=o.position.clone(),o.rotation.order="ZYX"}const i={};for(const e of c.layers){const t=l.rasters[e.id];if(!t)continue;const o=new a.CanvasTexture(t.canvas);o.colorSpace=a.SRGBColorSpace,o.minFilter=a.LinearMipmapLinearFilter,o.magFilter=a.LinearFilter,o.needsUpdate=!0;const n=new a.Mesh(new a.PlaneGeometry(t.box.w*r,t.box.h*r),new a.MeshBasicMaterial({map:o,transparent:!0,depthTest:!1,depthWrite:!1,toneMapped:!1}));n.name=e.id,n.renderOrder=e.order*10+(e.side===1?1:0);const s=c.nodes[e.node].pivot,p=t.box.x+t.box.w/2,m=t.box.y+t.box.h/2;n.position.set((p-s[0])*r,-(m-s[1])*r,e.depth*r),d[e.node].add(n),i[e.id]=n}y.scene&&y.scene.add(f);function b(e){const t=h(e||l.pose,c);for(const o in t){const n=d[o],s=t[o];if(!n)continue;const p=n.userData.base;n.position.set(p.x+s.dx*r,p.y-s.dy*r,p.z),n.rotation.set(0,s.yaw,-s.rot),n.scale.set(s.sx,s.sy,1)}for(const o in i)i[o].visible=!1;for(const o of l.getLayerDraws(e)){const n=i[o.layerId];n&&(n.visible=!0,n.material.opacity=o.opacity)}}return{root:f,nodes:d,meshes:i,sync:b,dispose(){for(const e in i)i[e].geometry.dispose(),i[e].material.map&&i[e].material.map.dispose(),i[e].material.dispose();f.removeFromParent()}}}export{v as attachThree};
