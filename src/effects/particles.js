// Particles system for muzzle flash, smoke, sparks, and explosions
import * as THREE from 'three';

let particles = [];

export function spawnParticle(scene, type, position, velocity) {
  if (!scene) return;
  const geom = new THREE.SphereGeometry(0.1, 4, 4);
  let color = 0xffffff;
  if (type === 'spark') color = 0xf1c40f;
  else if (type === 'smoke') color = 0x7f8c8d;
  else if (type === 'flash') color = 0xe67e22;
  else if (type === 'explosion') color = 0xd35400;

  const mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.8 });
  const mesh = new THREE.Mesh(geom, mat);
  mesh.position.copy(position);
  scene.add(mesh);

  particles.push({
    mesh,
    velocity: velocity || new THREE.Vector3((Math.random() - 0.5) * 2, Math.random() * 3, (Math.random() - 0.5) * 2),
    life: 1.0,
    decay: 1.5 + Math.random()
  });
}

export function updateParticles(dt, scene) {
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.life -= dt * p.decay;
    p.mesh.position.addScaledVector(p.velocity, dt);
    p.mesh.material.opacity = Math.max(0, p.life);

    if (p.life <= 0) {
      if (scene) scene.remove(p.mesh);
      if (p.mesh.geometry) p.mesh.geometry.dispose();
      if (p.mesh.material) p.mesh.material.dispose();
      particles.splice(i, 1);
    }
  }
}
