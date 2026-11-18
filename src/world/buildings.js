// Procedural buildings generator with colorful facades and glowing windows (Revision 7 - Final)
import * as THREE from 'three';
import { createBuildingWindowTexture } from './textures.js';

export function createBuildings(scene) {
  const palette = [0xc96f4a, 0xe07856, 0x2a9d8f, 0xe9c46a, 0xef476f, 0xf4e1c1, 0x8e7cc3];
  const trimPalette = [0x3d3550, 0x243447, 0x5a3d28, 0x2b4c3f];
  const windowTex = createBuildingWindowTexture();
  windowTex.repeat.set(2, 4);

  for (let x = -600; x <= -50; x += 140) {
    for (let z = -1300; z <= 1300; z += 140) {
      if (Math.abs(x - (-744)) < 85 || x >= -700) continue; // Keep coastal boulevard and beach corridor clear

      const width = 85;
      const depth = 85;
      const height = 50 + Math.abs(Math.sin(x * 0.12 + z * 0.12)) * 90;

      const colorIndex = Math.abs(Math.floor(x * 13 + z * 17)) % palette.length;
      const trimIndex = Math.abs(Math.floor(x * 7 + z * 11)) % trimPalette.length;

      const buildingMat = new THREE.MeshStandardMaterial({
        color: palette[colorIndex],
        roughness: 0.65,
        metalness: 0.2,
        emissive: 0xffd166,
        emissiveMap: windowTex,
        emissiveIntensity: 0.6
      });

      const trimMat = new THREE.MeshStandardMaterial({
        color: trimPalette[trimIndex],
        roughness: 0.5
      });

      const geo = new THREE.BoxGeometry(width, height, depth);
      const mesh = new THREE.Mesh(geo, buildingMat);
      mesh.position.set(x, height / 2, z);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      scene.add(mesh);

      // Architectural roof accent
      const roofGeo = new THREE.BoxGeometry(width * 0.8, 4, depth * 0.8);
      const roof = new THREE.Mesh(roofGeo, trimMat);
      roof.position.set(x, height + 2, z);
      roof.castShadow = true;
      scene.add(roof);
    }
  }
}
