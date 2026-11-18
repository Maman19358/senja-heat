// Pedestrians generator and AI (Revision 3 - Livelier with round heads and eyes)
import * as THREE from 'three';

const pedestrians = [];
let fleeing = false;

export function setPedestriansFleeing(val) {
  fleeing = val;
}

export function spawnPedestrians(scene) {
  const bodyGeo = new THREE.CapsuleGeometry(0.3, 1.2, 4, 8);
  const headGeo = new THREE.SphereGeometry(0.2, 10, 10);
  const eyeGeo = new THREE.SphereGeometry(0.04, 6, 6);

  const skinMats = [
    new THREE.MeshStandardMaterial({ color: 0xe0d4c3, roughness: 0.8 }),
    new THREE.MeshStandardMaterial({ color: 0xd9ab82, roughness: 0.8 }),
    new THREE.MeshStandardMaterial({ color: 0xc68642, roughness: 0.8 }),
    new THREE.MeshStandardMaterial({ color: 0x8d5524, roughness: 0.8 })
  ];
  const eyeMat = new THREE.MeshBasicMaterial({ color: 0x1a1a1a });

  const shirtColors = [
    0xe74c3c, 0x3498db, 0x2ecc71, 0xf39c12, 
    0x9b59b6, 0x1abc9c, 0xecf0f1, 0xf1c40f
  ];
  const shirtMats = shirtColors.map(c => new THREE.MeshStandardMaterial({ color: c, roughness: 0.75 }));

  function createPedMesh(shirtMat, skinMat) {
    const group = new THREE.Group();

    const body = new THREE.Mesh(bodyGeo, shirtMat);
    body.position.y = 0.9;
    body.castShadow = true;
    group.add(body);

    const head = new THREE.Mesh(headGeo, skinMat);
    head.position.y = 1.95;
    head.castShadow = true;
    group.add(head);

    const eyeLeft = new THREE.Mesh(eyeGeo, eyeMat);
    eyeLeft.position.set(0.08, 1.98, 0.18);
    group.add(eyeLeft);

    const eyeRight = new THREE.Mesh(eyeGeo, eyeMat);
    eyeRight.position.set(-0.08, 1.98, 0.18);
    group.add(eyeRight);

    group.rotation.y = -Math.PI / 2;
    return group;
  }

  // Line 1 (x = -725, z -450..450)
  for (let z = -450; z <= 450; z += 35) {
    const shirtMat = shirtMats[Math.floor(Math.random() * shirtMats.length)];
    const skinMat = skinMats[Math.floor(Math.random() * skinMats.length)];
    const mesh = createPedMesh(shirtMat, skinMat);
    mesh.position.set(-725, 0, z);
    scene.add(mesh);
    pedestrians.push({ mesh, frozen: false, axis: 'z', min: -450, max: 450 });
  }

  // Line 2 (x = -766, z -450..450, sparser)
  for (let z = -420; z <= 420; z += 65) {
    const shirtMat = shirtMats[Math.floor(Math.random() * shirtMats.length)];
    const skinMat = skinMats[Math.floor(Math.random() * skinMats.length)];
    const mesh = createPedMesh(shirtMat, skinMat);
    mesh.position.set(-766, 0, z);
    mesh.rotation.y = Math.PI / 2;
    scene.add(mesh);
    pedestrians.push({ mesh, frozen: false, axis: 'z', min: -450, max: 450 });
  }

  // Plaza walkers
  const plazaCoords = [
    { x: 140, z: -145 },
    { x: 146, z: -158 },
    { x: 152, z: -148 },
    { x: 138, z: -162 },
    { x: 155, z: -154 }
  ];
  plazaCoords.forEach(pos => {
    const shirtMat = shirtMats[Math.floor(Math.random() * shirtMats.length)];
    const skinMat = skinMats[Math.floor(Math.random() * skinMats.length)];
    const mesh = createPedMesh(shirtMat, skinMat);
    mesh.position.set(pos.x, 0, pos.z);
    mesh.rotation.y = Math.random() * Math.PI * 2;
    scene.add(mesh);
    pedestrians.push({ mesh, frozen: false, axis: 'plaza', minX: 130, maxX: 170, minZ: -180, maxZ: -120 });
  });
}

export function updatePedestrians(dt) {
  pedestrians.forEach(ped => {
    if (ped.frozen) return;
    const speed = fleeing ? 4.0 : 1.0;
    if (ped.axis === 'z') {
      ped.mesh.position.z += Math.cos(Date.now() * 0.0015 + ped.mesh.position.x) * speed * dt;
    } else if (ped.axis === 'plaza') {
      ped.mesh.position.x += Math.sin(Date.now() * 0.001 + ped.mesh.position.z) * 0.5 * speed * dt;
    }
  });
}
