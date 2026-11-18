// Helicopter ELANG-2 and detailed 3D body & searchlight beam (Revision 3 - Final)
import * as THREE from 'three';

let heliMesh = null;
let searchlightBeam = null;

export function spawnHelicopter(scene, playerPos) {
  const group = new THREE.Group();

  // Fuselage body
  const bodyGeo = new THREE.BoxGeometry(1.8, 1.4, 4.2);
  const bodyMat = new THREE.MeshStandardMaterial({ color: 0x1f1f2e, roughness: 0.2, metalness: 0.9 });
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  body.castShadow = true;
  group.add(body);

  // Cockpit glass
  const glassGeo = new THREE.BoxGeometry(1.4, 0.9, 1.8);
  const glassMat = new THREE.MeshStandardMaterial({ color: 0x0a0a1a, roughness: 0.05, metalness: 0.95, transparent: true, opacity: 0.85 });
  const glass = new THREE.Mesh(glassGeo, glassMat);
  glass.position.set(0, 0.2, 1.0);
  group.add(glass);

  // Main rotor blades
  const rotorGeo = new THREE.BoxGeometry(7.0, 0.08, 0.25);
  const rotorMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.5 });
  const rotor = new THREE.Mesh(rotorGeo, rotorMat);
  rotor.position.set(0, 0.8, 0);
  group.add(rotor);

  // Tail boom and tail rotor
  const tailGeo = new THREE.BoxGeometry(0.4, 0.4, 3.2);
  const tail = new THREE.Mesh(tailGeo, bodyMat);
  tail.position.set(0, 0.2, -3.2);
  group.add(tail);

  // Narrow searchlight cone aimed at player car
  const lightGeo = new THREE.ConeGeometry(5, 30, 16, 1, true);
  const lightMat = new THREE.MeshBasicMaterial({
    color: 0xfff3a8,
    transparent: true,
    opacity: 0.35,
    side: THREE.DoubleSide
  });
  searchlightBeam = new THREE.Mesh(lightGeo, lightMat);
  searchlightBeam.rotation.x = Math.PI;
  searchlightBeam.position.set(0, -15, 0);
  group.add(searchlightBeam);

  group.position.set(playerPos.x, playerPos.y + 13, playerPos.z + 26);
  scene.add(group);
  heliMesh = group;
  return heliMesh;
}

export function updateHelicopter(dt, playerPos) {
  if (!heliMesh || heliMesh.frozen) return; // Staged heli stays exactly where shots.js put it
  const targetX = playerPos.x + Math.sin(Date.now() * 0.0008) * 18;
  const targetZ = playerPos.z + 26 + Math.cos(Date.now() * 0.0008) * 18;
  heliMesh.position.x += (targetX - heliMesh.position.x) * (dt * 2.5);
  heliMesh.position.z += (targetZ - heliMesh.position.z) * (dt * 2.5);
  heliMesh.position.y = playerPos.y + 13;
}
