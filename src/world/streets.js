// Street network generator with sidewalks, curbs, crosswalks, and Pasar Senja plaza (Revision 11 - Plaza Border Frame Fix)
import * as THREE from 'three';
import { createRoadTexture } from './textures.js';

export function createStreets(scene) {
  const roadTex = createRoadTexture();
  roadTex.repeat.set(1, 80);

  const roadMat = new THREE.MeshStandardMaterial({ map: roadTex, roughness: 0.6 });
  const sidewalkMat = new THREE.MeshStandardMaterial({ color: 0x9a938a, roughness: 0.8 });
  const curbMat = new THREE.MeshStandardMaterial({ color: 0x55505c, roughness: 0.7 });
  const crosswalkMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const plazaMat = new THREE.MeshStandardMaterial({ color: 0xa39d94, roughness: 0.85 });
  const plazaBorderMat = new THREE.MeshStandardMaterial({ color: 0x4a3f4d, roughness: 0.7 });

  // Main coastal boulevard at x = -744 (width 36, length 3500)
  const boulevardGeo = new THREE.PlaneGeometry(36, 3500);
  const boulevard = new THREE.Mesh(boulevardGeo, roadMat);
  boulevard.rotation.x = -Math.PI / 2;
  boulevard.position.set(-744, -0.25, 0);
  boulevard.receiveShadow = true;
  scene.add(boulevard);

  // Sidewalks along BOTH sides of the coastal boulevard
  const boulevardSidewalkGeo = new THREE.BoxGeometry(4, 0.3, 3500);
  const leftSidewalk = new THREE.Mesh(boulevardSidewalkGeo, sidewalkMat);
  leftSidewalk.position.set(-766, -0.15, 0);
  leftSidewalk.receiveShadow = true;
  leftSidewalk.castShadow = true;
  scene.add(leftSidewalk);

  const rightSidewalk = new THREE.Mesh(boulevardSidewalkGeo, sidewalkMat);
  rightSidewalk.position.set(-722, -0.15, 0);
  rightSidewalk.receiveShadow = true;
  rightSidewalk.castShadow = true;
  scene.add(rightSidewalk);

  // Curbs along boulevard edges
  const curbGeo = new THREE.BoxGeometry(0.8, 0.35, 3500);
  const leftCurb = new THREE.Mesh(curbGeo, curbMat);
  leftCurb.position.set(-763.8, -0.15, 0);
  scene.add(leftCurb);

  const rightCurb = new THREE.Mesh(curbGeo, curbMat);
  rightCurb.position.set(-724.2, -0.15, 0);
  scene.add(rightCurb);

  // Grid of connecting cross streets and avenues
  for (let z = -1400; z <= 1400; z += 300) {
    const crossGeo = new THREE.PlaneGeometry(1000, 26);
    const cross = new THREE.Mesh(crossGeo, roadMat);
    cross.rotation.x = -Math.PI / 2;
    cross.position.set(-350, -0.26, z);
    cross.receiveShadow = true;
    scene.add(cross);

    // Crosswalk stripe bars at intersection with boulevard
    for (let wx = -758; wx <= -730; wx += 3.5) {
      const stripeGeo = new THREE.PlaneGeometry(2.2, 24);
      const stripe = new THREE.Mesh(stripeGeo, crosswalkMat);
      stripe.rotation.x = -Math.PI / 2;
      stripe.position.set(wx, -0.24, z + 15);
      scene.add(stripe);
      const stripe2 = new THREE.Mesh(stripeGeo, crosswalkMat);
      stripe2.rotation.x = -Math.PI / 2;
      stripe2.position.set(wx, -0.24, z - 15);
      scene.add(stripe2);
    }
  }

  for (let x = -600; x <= 0; x += 200) {
    if (Math.abs(x - (-744)) < 50) continue;
    const avenueGeo = new THREE.PlaneGeometry(26, 3000);
    const avenue = new THREE.Mesh(avenueGeo, roadMat);
    avenue.rotation.x = -Math.PI / 2;
    avenue.position.set(x, -0.26, 0);
    avenue.receiveShadow = true;
    scene.add(avenue);
  }

  // Pasar Senja plaza widened and positioned cleanly above background ground at y = -0.02
  const plazaGeo = new THREE.PlaneGeometry(150, 130);
  const plaza = new THREE.Mesh(plazaGeo, plazaMat);
  plaza.rotation.x = -Math.PI / 2;
  plaza.position.set(148, -0.02, -152);
  plaza.receiveShadow = true;
  scene.add(plaza);

  // Border frame around plaza perimeter (4 thin strips, top at y = -0.02 so they never cover plaza surface)
  const stripNSGeo = new THREE.BoxGeometry(154, 0.25, 2);
  const stripEWGeo = new THREE.BoxGeometry(2, 0.25, 134);

  const borderNorth = new THREE.Mesh(stripNSGeo, plazaBorderMat);
  borderNorth.position.set(148, -0.145, -218);
  borderNorth.receiveShadow = true;
  scene.add(borderNorth);

  const borderSouth = new THREE.Mesh(stripNSGeo, plazaBorderMat);
  borderSouth.position.set(148, -0.145, -86);
  borderSouth.receiveShadow = true;
  scene.add(borderSouth);

  const borderWest = new THREE.Mesh(stripEWGeo, plazaBorderMat);
  borderWest.position.set(72, -0.145, -152);
  borderWest.receiveShadow = true;
  scene.add(borderWest);

  const borderEast = new THREE.Mesh(stripEWGeo, plazaBorderMat);
  borderEast.position.set(224, -0.145, -152);
  borderEast.receiveShadow = true;
  scene.add(borderEast);
}
