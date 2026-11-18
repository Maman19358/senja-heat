// Sky and lighting setup (Bright Sunset Palette) (Revision 7 - Final)
import * as THREE from 'three';

export function setupLighting(scene) {
  const ambient = new THREE.AmbientLight(0xffc2d1, 1.6);
  scene.add(ambient);

  const sun = new THREE.DirectionalLight(0xff8c42, 3.5);
  sun.position.set(-300, 200, -200);
  sun.castShadow = true;
  sun.shadow.mapSize.width = 2048;
  sun.shadow.mapSize.height = 2048;
  sun.shadow.camera.near = 0.5;
  sun.shadow.camera.far = 1200;
  const d = 450;
  sun.shadow.camera.left = -d;
  sun.shadow.camera.right = d;
  sun.shadow.camera.top = d;
  sun.shadow.camera.bottom = -d;
  scene.add(sun);

  // Hemisphere light for warm sunset and cool ocean bounce
  const hemi = new THREE.HemisphereLight(0xffa88c, 0x244673, 1.7);
  scene.add(hemi);

  // Bright warm sunset sky dome gradient
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createLinearGradient(0, 512, 0, 0);
  gradient.addColorStop(0, '#ff7e42'); // deep orange at horizon
  gradient.addColorStop(0.5, '#d65db1'); // pink
  gradient.addColorStop(1, '#48195a'); // violet-blue at top
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 512, 512);

  const skyTex = new THREE.CanvasTexture(canvas);
  const skyDomeGeo = new THREE.SphereGeometry(3000, 32, 15);
  const skyDomeMat = new THREE.MeshBasicMaterial({ map: skyTex, side: THREE.BackSide });
  const skyDome = new THREE.Mesh(skyDomeGeo, skyDomeMat);
  scene.add(skyDome);

  scene.background = new THREE.Color(0xff7e42);
  scene.fog = new THREE.FogExp2(0xffa88c, 0.0006);
}
