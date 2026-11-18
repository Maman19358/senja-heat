// Screenshot staging configuration and URL parameter parser (Revision 9 - Livelier street staging with round heads and eyes, preserving S10d fix)
import * as THREE from 'three';
import { spawnCar, clearFleet, setPlayerCar } from '../vehicles/fleet.js';
import { spawnHelicopter } from '../police/helicopter.js';
import { setWantedStars } from '../police/wanted.js';
import { setStagingCamera } from './camera.js';
import { drawCityMap } from '../ui/map.js';
import { setMissionIndex, setMissionActive } from '../missions/runner.js';

export function getUrlParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    shot: params.get('shot'),
    seed: params.get('seed'),
    fixed: params.get('fixed') === '1'
  };
}

export function setupShotStaging(shotType, scene, initialPlayerCar) {
  const titleScreen = document.getElementById('title-screen');
  if (titleScreen) titleScreen.style.display = 'none';

  window.__stagedPlayerPos = null;

  if (shotType === 'chase') {
    clearFleet(scene);
    setMissionIndex(5); // Mission 6 "SENJA CASH"
    setMissionActive(true);

    const playerCar = spawnCar(scene, 'kencana', 0xff2a85, -744, 0, 0, true);
    if (playerCar) {
      playerCar.frozen = true;
      setPlayerCar(playerCar);
    }

    // 3 police cruisers in flanking/ahead positions (never dead-centre on camera axis)
    const cruiser1 = spawnCar(scene, 'police', 0x3498db, -752, 2, 0, false);
    if (cruiser1) cruiser1.frozen = true;
    const cruiser2 = spawnCar(scene, 'police', 0x3498db, -736, 2, 0, false);
    if (cruiser2) cruiser2.frozen = true;
    const cruiser3 = spawnCar(scene, 'police', 0x3498db, -744, 10, 0, false);
    if (cruiser3) cruiser3.frozen = true;

    if (typeof spawnHelicopter === 'function') {
      const heli = spawnHelicopter(scene, { x: -744, y: 0, z: 0 });
      if (heli) {
        heli.position.set(-744, 9, 26); // Helicopter 3D body fully in frame upper-centre
        heli.frozen = true;
      }
    }
    if (typeof setWantedStars === 'function') setWantedStars(4);

    const locEl = document.getElementById('location-label');
    if (locEl) locEl.textContent = 'PANTAI SENJA';

    setStagingCamera({ x: -744, y: 3.5, z: -10, lookAt: { x: -744, y: 0.5, z: 0 } });
  } else if (shotType === 'street') {
    clearFleet(scene);
    setMissionIndex(1); // Mission 2 "TAGIHAN MIRA"
    setMissionActive(true);
    window.__stagedPlayerPos = { x: 148, y: 0, z: -152 };

    // Bright lighting for Pasar Senja market staging area
    const marketLight = new THREE.PointLight(0xffea85, 4.0, 90);
    marketLight.position.set(148, 10, -150);
    scene.add(marketLight);

    const ambientLight = new THREE.AmbientLight(0x5a4570, 1.8);
    scene.add(ambientLight);

    // S10d fix: Soft warm fill light over foreground
    const foregroundFillLight = new THREE.PointLight(0xffe0b0, 2.0, 60);
    foregroundFillLight.position.set(146, 6, -140);
    scene.add(foregroundFillLight);

    // S10d fix: Large flat light foreground apron
    const apronGeo = new THREE.PlaneGeometry(300, 260);
    const apronMat = new THREE.MeshStandardMaterial({ color: 0xa39d94, roughness: 0.85 });
    const apron = new THREE.Mesh(apronGeo, apronMat);
    apron.rotation.x = -Math.PI / 2;
    apron.position.set(148, 0.01, -152);
    apron.receiveShadow = true;
    scene.add(apron);
    
    // Shared head/eye materials & geometries for street staging peds
    const headMat = new THREE.MeshStandardMaterial({ color: 0xe0d4c3, roughness: 0.8 });
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0x1a1a1a });
    const headGeo = new THREE.SphereGeometry(0.2, 10, 10);
    const eyeGeo = new THREE.SphereGeometry(0.04, 6, 6);

    // Raka on foot (detailed prominent character mesh with round head, eyes, arms, hair)
    const rakaGroup = new THREE.Group();
    // Torso (magenta jacket)
    const torsoMat = new THREE.MeshStandardMaterial({ color: 0xff2a85, roughness: 0.7 });
    const torso = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.75, 0.3), torsoMat);
    torso.position.y = 1.05;
    torso.castShadow = true;
    rakaGroup.add(torso);

    // Head
    const rakaHead = new THREE.Mesh(new THREE.SphereGeometry(0.22, 12, 12), headMat);
    rakaHead.position.y = 1.62;
    rakaHead.castShadow = true;
    rakaGroup.add(rakaHead);

    // Eyes facing camera
    const rakaEyeLeft = new THREE.Mesh(eyeGeo, eyeMat);
    rakaEyeLeft.position.set(0.08, 1.66, 0.20);
    rakaGroup.add(rakaEyeLeft);
    const rakaEyeRight = new THREE.Mesh(eyeGeo, eyeMat);
    rakaEyeRight.position.set(-0.08, 1.66, 0.20);
    rakaGroup.add(rakaEyeRight);

    // Hair
    const hairMat = new THREE.MeshStandardMaterial({ color: 0x151515, roughness: 0.9 });
    const hair = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.16, 0.44), hairMat);
    hair.position.set(0, 1.78, 0);
    rakaGroup.add(hair);

    // Arms
    const armMat = new THREE.MeshStandardMaterial({ color: 0xff2a85, roughness: 0.7 });
    const armLeft = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.6, 0.18), armMat);
    armLeft.position.set(-0.38, 1.0, 0);
    armLeft.rotation.z = -0.2;
    rakaGroup.add(armLeft);
    const armRight = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.6, 0.18), armMat);
    armRight.position.set(0.38, 1.0, 0);
    armRight.rotation.z = 0.2;
    rakaGroup.add(armRight);

    // Legs
    const legMat = new THREE.MeshStandardMaterial({ color: 0x1c2833, roughness: 0.8 });
    const legLeft = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.65, 0.22), legMat);
    legLeft.position.set(-0.14, 0.45, 0);
    legLeft.castShadow = true;
    rakaGroup.add(legLeft);
    const legRight = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.65, 0.22), legMat);
    legRight.position.set(0.14, 0.45, 0);
    legRight.castShadow = true;
    rakaGroup.add(legRight);

    rakaGroup.position.set(148, 0, -152);
    rakaGroup.rotation.y = -28 * Math.PI / 180; // Face camera (~-28 deg)
    scene.add(rakaGroup);

    // Real yellow car to Raka's right at (150.5, -150)
    const yellowCar = spawnCar(scene, 'sedan', 0xf1c40f, 150.5, -150, Math.PI / 3, false);
    if (yellowCar) {
      yellowCar.frozen = true;
      if (yellowCar.mesh) {
        yellowCar.mesh.traverse(o => {
          if (o.isMesh && o.material && o.material.color && o.material.color.getHex() === 0xf1c40f) {
            o.material.color.setHex(0xffd400);
            o.material.metalness = 0.15;
            o.material.roughness = 0.4;
            o.material.emissive = new THREE.Color(0x554400);
          }
        });
      }
    }

    // Market stalls with awnings clearly visible near Raka
    const stallMat = new THREE.MeshStandardMaterial({ color: 0x8b4513, roughness: 0.8 });
    const awningMat = new THREE.MeshStandardMaterial({ color: 0xe74c3c, roughness: 0.5 });
    const stallCoords = [{ x: 144, z: -150 }, { x: 152, z: -155 }, { x: 147, z: -158 }];
    stallCoords.forEach(pos => {
      const stallGroup = new THREE.Group();
      const counter = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.95, 0.9), stallMat);
      counter.position.y = 0.47;
      counter.castShadow = true;
      stallGroup.add(counter);

      const awning = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.12, 1.3), awningMat);
      awning.position.set(0, 1.45, 0.1);
      awning.rotation.x = 0.35;
      awning.castShadow = true;
      stallGroup.add(awning);

      stallGroup.position.set(pos.x, 0, pos.z);
      scene.add(stallGroup);
    });

    // Crates / barrels near stalls
    const crateMat = new THREE.MeshStandardMaterial({ color: 0xa0522d, roughness: 0.9 });
    [{ x: 143, z: -148 }, { x: 153, z: -153 }, { x: 149, z: -160 }].forEach(cPos => {
      const crate = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.6, 0.6), crateMat);
      crate.position.set(cPos.x, 0.3, cPos.z);
      crate.castShadow = true;
      scene.add(crate);
    });

    // Pedestrians with round heads & visible eyes
    function createStagingPed(shirtColor, x, z) {
      const group = new THREE.Group();
      const bodyMat = new THREE.MeshStandardMaterial({ color: shirtColor, roughness: 0.75 });
      const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.3, 1.2, 4, 8), bodyMat);
      body.position.y = 0.9;
      body.castShadow = true;
      group.add(body);

      const head = new THREE.Mesh(headGeo, headMat);
      head.position.y = 1.95;
      head.castShadow = true;
      group.add(head);

      const e1 = new THREE.Mesh(eyeGeo, eyeMat);
      e1.position.set(0.08, 1.98, 0.18);
      group.add(e1);
      const e2 = new THREE.Mesh(eyeGeo, eyeMat);
      e2.position.set(-0.08, 1.98, 0.18);
      group.add(e2);

      group.position.set(x, 0, z);
      scene.add(group);
    }

    createStagingPed(0x3498db, 144, -155);
    createStagingPed(0x2ecc71, 155, -152);
    createStagingPed(0xf39c12, 142, -153);
    createStagingPed(0x9b59b6, 150, -158);

    const prompt = document.getElementById('interaction-prompt');
    if (prompt) {
      prompt.style.display = 'block';
      prompt.textContent = 'Press E to steal car';
    }

    const locEl = document.getElementById('location-label');
    if (locEl) locEl.textContent = 'PASAR SENJA';

    // Close-up camera framing Raka centered on foot
    setStagingCamera({ x: 144.5, y: 2.3, z: -145.5, lookAt: { x: 148, y: 1.1, z: -152 } });
  } else if (shotType === 'drive') {
    clearFleet(scene);
    setMissionIndex(0);
    setMissionActive(false);

    const playerCar = spawnCar(scene, 'kencana', 0xff2a85, -744, -50, Math.PI, true);
    if (playerCar) {
      playerCar.frozen = true;
      setPlayerCar(playerCar);
    }

    // 5-6 traffic cars ahead in separate lanes and well-spaced Z
    const t1 = spawnCar(scene, 'taxi', 0xf1c40f, -752, -65, Math.PI, false);
    if (t1) t1.frozen = true;
    const t2 = spawnCar(scene, 'truck', 0x27ae60, -744, -82, Math.PI, false);
    if (t2) t2.frozen = true;
    const t3 = spawnCar(scene, 'sedan', 0xe74c3c, -736, -98, Math.PI, false);
    if (t3) t3.frozen = true;
    const t4 = spawnCar(scene, 'sedan', 0x3498db, -752, -115, Math.PI, false);
    if (t4) t4.frozen = true;
    const t5 = spawnCar(scene, 'truck', 0xf39c12, -744, -135, Math.PI, false);
    if (t5) t5.frozen = true;
    const t6 = spawnCar(scene, 'taxi', 0x2ecc71, -736, -155, Math.PI, false);
    if (t6) t6.frozen = true;

    const locEl = document.getElementById('location-label');
    if (locEl) locEl.textContent = 'PANTAI SENJA';

    setStagingCamera({ x: -756, y: 4.5, z: -36, lookAt: { x: -744, y: 0, z: -50 } });
  } else if (shotType === 'map') {
    const mapScreen = document.getElementById('map-screen');
    if (mapScreen) mapScreen.style.display = 'flex';
    setTimeout(() => {
      drawCityMap({ x: -744, z: 0 });
    }, 100);
  }

  setTimeout(() => {
    window.__shotReady = true;
  }, 1500);
}
