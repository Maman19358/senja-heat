// Procedural car geometry and materials generator (Revision 2 - Final Polished)
import * as THREE from 'three';

export function createCarMesh(type = 'sedan', color = 0xff2a85) {
  const group = new THREE.Group();

  let bodyWidth = 2.0;
  let bodyLength = 4.2;
  let lowerHeight = 0.45;
  let baseColor = color;

  if (type === 'truck') {
    bodyWidth = 2.4;
    bodyLength = 5.5;
    lowerHeight = 0.55;
  } else if (type === 'van') {
    bodyWidth = 2.2;
    bodyLength = 4.8;
    lowerHeight = 0.7;
  } else if (type === 'sports' || type === 'kencana') {
    bodyWidth = 1.9;
    bodyLength = 4.0;
    lowerHeight = 0.38;
    baseColor = 0xff2a85;
  } else if (type === 'taxi') {
    baseColor = 0xf1c40f;
  } else if (type === 'police' || type === 'cruiser') {
    baseColor = 0x111111;
  }

  const bodyMat = new THREE.MeshStandardMaterial({ color: baseColor, roughness: 0.35, metalness: 0.35 });
  const altBodyMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.35, metalness: 0.35 });
  const glassMat = new THREE.MeshStandardMaterial({ color: 0x0a1a2a, roughness: 0.1, metalness: 0.3, transparent: true, opacity: 0.85 });
  const wheelMat = new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.8 });
  const rimMat = new THREE.MeshStandardMaterial({ color: 0xd0d0d0, metalness: 0.8, roughness: 0.2 });
  const darkMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.9 });
  const headlightMat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffffee, emissiveIntensity: 1.2 });
  const taillightMat = new THREE.MeshStandardMaterial({ color: 0xff0000, emissive: 0xff0000, emissiveIntensity: 1.2 });
  const sirenRedMat = new THREE.MeshStandardMaterial({ color: 0xff0000, emissive: 0xff0000, emissiveIntensity: 2.0 });
  const sirenBlueMat = new THREE.MeshStandardMaterial({ color: 0x0088ff, emissive: 0x0088ff, emissiveIntensity: 2.0 });

  // Lower body slab (hood + trunk + main floor)
  const lowerGeo = new THREE.BoxGeometry(bodyWidth, lowerHeight, bodyLength);
  const lowerBody = new THREE.Mesh(lowerGeo, bodyMat);
  lowerBody.position.y = 0.35 + lowerHeight / 2;
  lowerBody.castShadow = true;
  lowerBody.receiveShadow = true;
  group.add(lowerBody);

  // Police white door panels
  if (type === 'police' || type === 'cruiser') {
    const doorGeo = new THREE.BoxGeometry(bodyWidth + 0.02, lowerHeight * 0.8, bodyLength * 0.3);
    const doorMesh = new THREE.Mesh(doorGeo, altBodyMat);
    doorMesh.position.set(0, lowerBody.position.y, 0);
    doorMesh.castShadow = true;
    group.add(doorMesh);
  }

  // Cabin
  const cabinWidth = bodyWidth * 0.78;
  const cabinHeight = lowerHeight * 1.1;
  const cabinLength = bodyLength * 0.45;
  const cabinGeo = new THREE.BoxGeometry(cabinWidth, cabinHeight, cabinLength);
  const cabin = new THREE.Mesh(cabinGeo, bodyMat);
  cabin.position.set(0, lowerBody.position.y + lowerHeight / 2 + cabinHeight / 2, -0.05);
  cabin.castShadow = true;
  group.add(cabin);

  // Glass windshield (front +z) & rear window (-z) & sides
  const windshieldGeo = new THREE.BoxGeometry(cabinWidth * 0.98, cabinHeight * 0.85, 0.05);
  const windshield = new THREE.Mesh(windshieldGeo, glassMat);
  windshield.position.set(0, cabin.position.y, cabinLength / 2);
  windshield.rotation.x = -0.35;
  group.add(windshield);

  const rearWindow = new THREE.Mesh(windshieldGeo, glassMat);
  rearWindow.position.set(0, cabin.position.y, -cabinLength / 2);
  rearWindow.rotation.x = 0.35;
  group.add(rearWindow);

  // Side glass panels
  const sideGlassGeo = new THREE.BoxGeometry(0.05, cabinHeight * 0.75, cabinLength * 0.85);
  const leftGlass = new THREE.Mesh(sideGlassGeo, glassMat);
  leftGlass.position.set(-cabinWidth / 2 - 0.01, cabin.position.y, -0.05);
  group.add(leftGlass);
  const rightGlass = new THREE.Mesh(sideGlassGeo, glassMat);
  rightGlass.position.set(cabinWidth / 2 + 0.01, cabin.position.y, -0.05);
  group.add(rightGlass);

  // Bumpers (front +z, rear -z)
  const bumperGeo = new THREE.BoxGeometry(bodyWidth + 0.04, 0.2, 0.15);
  const frontBumper = new THREE.Mesh(bumperGeo, darkMat);
  frontBumper.position.set(0, 0.45, bodyLength / 2 + 0.05);
  group.add(frontBumper);

  const rearBumper = new THREE.Mesh(bumperGeo, darkMat);
  rearBumper.position.set(0, 0.45, -bodyLength / 2 - 0.05);
  group.add(rearBumper);

  // Grille
  const grilleGeo = new THREE.BoxGeometry(bodyWidth * 0.5, 0.2, 0.05);
  const grille = new THREE.Mesh(grilleGeo, darkMat);
  grille.position.set(0, 0.5, bodyLength / 2 + 0.08);
  group.add(grille);

  // Headlights & Taillights
  const lightGeo = new THREE.BoxGeometry(0.25, 0.12, 0.08);
  const hlLeft = new THREE.Mesh(lightGeo, headlightMat);
  hlLeft.position.set(-bodyWidth * 0.38, 0.55, bodyLength / 2 + 0.06);
  group.add(hlLeft);

  const hlRight = new THREE.Mesh(lightGeo, headlightMat);
  hlRight.position.set(bodyWidth * 0.38, 0.55, bodyLength / 2 + 0.06);
  group.add(hlRight);

  const tlLeft = new THREE.Mesh(lightGeo, taillightMat);
  tlLeft.position.set(-bodyWidth * 0.38, 0.55, -bodyLength / 2 - 0.06);
  group.add(tlLeft);

  const tlRight = new THREE.Mesh(lightGeo, taillightMat);
  tlRight.position.set(bodyWidth * 0.38, 0.55, -bodyLength / 2 - 0.06);
  group.add(tlRight);

  // Wheels (4) with tires and hubcaps
  const wheelRadius = 0.35;
  const wheelWidth = 0.26;
  const wheelGeo = new THREE.CylinderGeometry(wheelRadius, wheelRadius, wheelWidth, 20);
  wheelGeo.rotateZ(Math.PI / 2);

  const hubcapGeo = new THREE.CylinderGeometry(0.2, 0.2, wheelWidth + 0.02, 16);
  hubcapGeo.rotateZ(Math.PI / 2);

  const zOffset = bodyLength * 0.34;
  const xOffset = bodyWidth * 0.51;
  const wheelPositions = [
    [-xOffset, 0.35, zOffset],
    [xOffset, 0.35, zOffset],
    [-xOffset, 0.35, -zOffset],
    [xOffset, 0.35, -zOffset]
  ];

  wheelPositions.forEach(([x, y, z]) => {
    const wheelGroup = new THREE.Group();
    const tire = new THREE.Mesh(wheelGeo, wheelMat);
    tire.castShadow = true;
    wheelGroup.add(tire);

    const hubcap = new THREE.Mesh(hubcapGeo, rimMat);
    wheelGroup.add(hubcap);

    wheelGroup.position.set(x, y, z);
    group.add(wheelGroup);

    // Wheel arch / fender flare over each wheel
    const archGeo = new THREE.BoxGeometry(0.3, 0.35, 0.9);
    const arch = new THREE.Mesh(archGeo, darkMat);
    arch.position.set(x > 0 ? x - 0.05 : x + 0.05, y + 0.2, z);
    group.add(arch);
  });

  // Type specific additions
  if (type === 'taxi') {
    const signGeo = new THREE.BoxGeometry(0.5, 0.15, 0.25);
    const signMat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffeeaa, emissiveIntensity: 0.8 });
    const sign = new THREE.Mesh(signGeo, signMat);
    sign.position.set(0, cabin.position.y + cabinHeight / 2 + 0.1, 0);
    group.add(sign);
  } else if (type === 'sports' || type === 'kencana') {
    // Rear spoiler
    const spoilerGeo = new THREE.BoxGeometry(bodyWidth * 0.9, 0.04, 0.35);
    const spoiler = new THREE.Mesh(spoilerGeo, darkMat);
    spoiler.position.set(0, lowerBody.position.y + lowerHeight / 2 + 0.1, -bodyLength / 2 + 0.3);
    group.add(spoiler);
  } else if (type === 'truck') {
    const bedGeo = new THREE.BoxGeometry(bodyWidth * 0.98, 0.3, bodyLength * 0.45);
    const bed = new THREE.Mesh(bedGeo, bodyMat);
    bed.position.set(0, lowerBody.position.y + lowerHeight / 2 + 0.15, -bodyLength * 0.22);
    group.add(bed);
  } else if (type === 'police' || type === 'cruiser') {
    const barBaseGeo = new THREE.BoxGeometry(0.7, 0.08, 0.22);
    const barBase = new THREE.Mesh(barBaseGeo, darkMat);
    barBase.position.set(0, cabin.position.y + cabinHeight / 2 + 0.05, 0);
    group.add(barBase);

    const lightBoxGeo = new THREE.BoxGeometry(0.3, 0.14, 0.18);
    const redLight = new THREE.Mesh(lightBoxGeo, sirenRedMat);
    redLight.position.set(-0.18, cabin.position.y + cabinHeight / 2 + 0.15, 0);
    group.add(redLight);

    const blueLight = new THREE.Mesh(lightBoxGeo, sirenBlueMat);
    blueLight.position.set(0.18, cabin.position.y + cabinHeight / 2 + 0.15, 0);
    group.add(blueLight);
  }

  return group;
}
