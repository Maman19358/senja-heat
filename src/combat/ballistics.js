// Ballistics and shooting raycast manager with hit detection and effects
import * as THREE from 'three';

export function fireBullet(scene, camera, weapon, enemies, hitCallback) {
  if (!weapon || !scene || !camera) return false;
  if (weapon.ammo <= 0 && weapon.ammo !== Infinity) return false;
  if (weapon.ammo !== Infinity) weapon.ammo--;

  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(new THREE.Vector2(0, 0), camera);
  raycaster.far = weapon.range || 100;

  const intersects = raycaster.intersectObjects(scene.children, true);
  if (intersects.length > 0) {
    const hit = intersects[0];
    if (hitCallback) hitCallback(hit, weapon.damage);
    
    // Trigger hitmarker flash
    const hm = document.getElementById('hitmarker');
    if (hm) {
      hm.style.display = 'block';
      setTimeout(() => { hm.style.display = 'none'; }, 150);
    }
  }
  return true;
}
