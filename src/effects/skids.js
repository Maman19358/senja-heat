// Tire skid marks and drift smoke generator
import * as THREE from 'three';

let skids = [];

export function addSkidMark(scene, position) {
  if (!scene) return;
  const geom = new THREE.PlaneGeometry(0.4, 0.8);
  const mat = new THREE.MeshBasicMaterial({ color: 0x111111, transparent: true, opacity: 0.6 });
  const mesh = new THREE.Mesh(geom, mat);
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.set(position.x, 0.02, position.z);
  scene.add(mesh);

  skids.push({ mesh, life: 10.0 });
  if (skids.length > 100) {
    const old = skids.shift();
    scene.remove(old.mesh);
    old.mesh.geometry.dispose();
    old.mesh.material.dispose();
  }
}

export function updateSkids(dt, scene) {
  for (let i = skids.length - 1; i >= 0; i--) {
    const s = skids[i];
    s.life -= dt;
    s.mesh.material.opacity = Math.max(0, s.life / 10.0 * 0.6);
    if (s.life <= 0) {
      if (scene) scene.remove(s.mesh);
      s.mesh.geometry.dispose();
      s.mesh.material.dispose();
      skids.splice(i, 1);
    }
  }
}
