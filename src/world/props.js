// World props generator (dual palm rows, bright fronds, streetlights, benches, planters, signs, beach props) (Revision 8)
import * as THREE from 'three';

export function createProps(scene) {
  const trunkMat = new THREE.MeshStandardMaterial({ color: 0x5c4033, roughness: 0.9 });
  const frondMat = new THREE.MeshStandardMaterial({ color: 0x3a9e5f, roughness: 0.8 });
  const lampMat = new THREE.MeshStandardMaterial({ color: 0x222222, metalness: 0.8 });
  const bulbMat = new THREE.MeshBasicMaterial({ color: 0xffd166 });

  const benchMat = new THREE.MeshStandardMaterial({ color: 0x8b5a2b, roughness: 0.8 });
  const binMat = new THREE.MeshStandardMaterial({ color: 0x7f8c8d, roughness: 0.7 });
  const planterMat = new THREE.MeshStandardMaterial({ color: 0x95a5a6, roughness: 0.8 });
  const signPoleMat = new THREE.MeshStandardMaterial({ color: 0xbdc3c7, metalness: 0.5 });
  const signPlateMat = new THREE.MeshStandardMaterial({ color: 0xe74c3c, roughness: 0.5 });
  const umbrellaPoleMat = new THREE.MeshStandardMaterial({ color: 0xd35400, roughness: 0.7 });
  const umbrellaMat = new THREE.MeshStandardMaterial({ color: 0x3498db, roughness: 0.6 });
  const towelMats = [
    new THREE.MeshStandardMaterial({ color: 0xe74c3c, roughness: 0.9 }),
    new THREE.MeshStandardMaterial({ color: 0xf1c40f, roughness: 0.9 }),
    new THREE.MeshStandardMaterial({ color: 0x9b59b6, roughness: 0.9 }),
    new THREE.MeshStandardMaterial({ color: 0x1abc9c, roughness: 0.9 })
  ];

  // Palm trees along boulevard at x = -734 (left/west side) and x = -722 (right/beach side)
  for (let z = -1400; z <= 1400; z += 45) {
    // Left row (-734)
    const trunkGeo1 = new THREE.CylinderGeometry(0.4, 0.6, 9, 8);
    const trunk1 = new THREE.Mesh(trunkGeo1, trunkMat);
    trunk1.position.set(-734, 4.5, z);
    trunk1.castShadow = true;
    scene.add(trunk1);

    const frondGeo1 = new THREE.SphereGeometry(3.0, 8, 8);
    const fronds1 = new THREE.Mesh(frondGeo1, frondMat);
    fronds1.position.set(-734, 9, z);
    fronds1.castShadow = true;
    scene.add(fronds1);

    // Right row on beach side (-722)
    const trunkGeo2 = new THREE.CylinderGeometry(0.4, 0.6, 9, 8);
    const trunk2 = new THREE.Mesh(trunkGeo2, trunkMat);
    trunk2.position.set(-722, 4.5, z);
    trunk2.castShadow = true;
    scene.add(trunk2);

    const frondGeo2 = new THREE.SphereGeometry(3.0, 8, 8);
    const fronds2 = new THREE.Mesh(frondGeo2, frondMat);
    fronds2.position.set(-722, 9, z);
    fronds2.castShadow = true;
    scene.add(fronds2);

    // Streetlamps every few palms along median / left edge
    if (z % 90 === 0) {
      const poleGeo = new THREE.CylinderGeometry(0.2, 0.2, 7, 6);
      const pole = new THREE.Mesh(poleGeo, lampMat);
      pole.position.set(-728, 3.5, z);
      pole.castShadow = true;
      scene.add(pole);

      const bulbGeo = new THREE.SphereGeometry(0.4, 8, 8);
      const bulb = new THREE.Mesh(bulbGeo, bulbMat);
      bulb.position.set(-728, 7, z);
      scene.add(bulb);
    }

    // Benches and bins every 90 units offset from lamps
    if (z % 90 === 45) {
      const bench = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.4, 0.5), benchMat);
      bench.position.set(-740, 0.2, z);
      bench.castShadow = true;
      scene.add(bench);

      const bin = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.7, 8), binMat);
      bin.position.set(-740, 0.35, z + 3);
      bin.castShadow = true;
      scene.add(bin);

      // Planter on beach side
      const planter = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.6, 0.8, 8), planterMat);
      planter.position.set(-718, 0.4, z);
      planter.castShadow = true;
      scene.add(planter);

      const bush = new THREE.Mesh(new THREE.SphereGeometry(0.8, 8, 8), frondMat);
      bush.position.set(-718, 1.0, z);
      bush.castShadow = true;
      scene.add(bush);
    }

    // Traffic signs at major intervals
    if (z % 180 === 0) {
      const sPole = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 3, 6), signPoleMat);
      sPole.position.set(-760, 1.5, z);
      scene.add(sPole);

      const sPlate = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.8, 0.1), signPlateMat);
      sPlate.position.set(-760, 3.0, z);
      scene.add(sPlate);
    }

    // Beach props on sand strip (-705)
    if (z % 120 === 60) {
      const uPole = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 3, 6), umbrellaPoleMat);
      uPole.position.set(-705, 1.5, z);
      scene.add(uPole);

      const uTop = new THREE.Mesh(new THREE.ConeGeometry(1.5, 0.8, 8), umbrellaMat);
      uTop.position.set(-705, 3.2, z);
      scene.add(uTop);

      const tMat = towelMats[Math.abs(Math.floor(z / 120)) % towelMats.length];
      const towel = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.02, 2.0), tMat);
      towel.position.set(-702, 0.01, z + 4);
      scene.add(towel);
    }
  }
}
