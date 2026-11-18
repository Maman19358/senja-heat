// Ocean and beach plane with warm city-block ground tone (Revision 9 - Final)
import * as THREE from 'three';

export function createOcean(scene) {
  // Real ground plane under everything with warm city-block color (0x4a3f4d dusty mauve-brown)
  const groundGeo = new THREE.PlaneGeometry(3500, 3500);
  const groundMat = new THREE.MeshStandardMaterial({ color: 0x4a3f4d, roughness: 0.95 });
  const ground = new THREE.Mesh(groundGeo, groundMat);
  ground.rotation.x = -Math.PI / 2;
  ground.position.set(0, -0.45, 0);
  ground.receiveShadow = true;
  scene.add(ground);

  // Wide beach strip along the right (east) edge of coastal boulevard (boulevard spans x = -762 to -726)
  const beachGeo = new THREE.PlaneGeometry(120, 3500);
  const beachMat = new THREE.MeshStandardMaterial({ color: 0xd4a373, roughness: 0.9 });
  const beach = new THREE.Mesh(beachGeo, beachMat);
  beach.rotation.x = -Math.PI / 2;
  beach.position.set(-666, -0.3, 0); // Spans x = -726 to -606, immediately right of boulevard edge at x = -726
  beach.receiveShadow = true;
  scene.add(beach);

  // Vibrant blue ocean plane on the right meeting the beach strip directly
  const oceanGeo = new THREE.PlaneGeometry(2500, 3500);
  const oceanMat = new THREE.MeshStandardMaterial({ color: 0x2176ff, roughness: 0.15, metalness: 0.8, emissive: 0x0a3366, emissiveIntensity: 0.25 });
  const ocean = new THREE.Mesh(oceanGeo, oceanMat);
  ocean.rotation.x = -Math.PI / 2;
  ocean.position.set(580, -0.2, 0); // Center at x = 580, width 2500 spans x = -670 to +1830
  scene.add(ocean);
}
