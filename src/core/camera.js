// Camera manager supporting player tracking and shot staging (Revision 5 - Polished)
import * as THREE from 'three';

let camera = null;
let stagingMode = false;
let stagingCamParams = null;
let camAngle = 0;
let camDist = 12;
let camHeight = 4;

export function initCamera(fov = 60, aspect = window.innerWidth / window.innerHeight) {
  camera = new THREE.PerspectiveCamera(fov, aspect, 0.1, 3000);
  camera.position.set(-744, 5, -20);
  return camera;
}

export function getCamera() {
  return camera;
}

export function setStagingCamera(params) {
  stagingMode = true;
  stagingCamParams = params;
  if (params && camera) {
    camera.position.set(params.x, params.y, params.z);
    if (params.lookAt) {
      camera.lookAt(params.lookAt.x, params.lookAt.y, params.lookAt.z);
    }
  }
}

export function isStaging() {
  return stagingMode;
}

export function updateCamera(targetPos, targetRot, isDriving, dt, mouseDelta) {
  if (stagingMode && stagingCamParams) {
    // When state.staging is set, do NOT override the staging camera position
    if (stagingCamParams.lookAt && camera) {
      camera.lookAt(stagingCamParams.lookAt.x, stagingCamParams.lookAt.y, stagingCamParams.lookAt.z);
    }
    return;
  }

  if (!camera || !targetPos) return;

  if (mouseDelta && (mouseDelta.dx !== 0 || mouseDelta.dy !== 0)) {
    camAngle -= mouseDelta.dx * 0.005;
    camHeight = Math.max(1, Math.min(15, camHeight + mouseDelta.dy * 0.005));
  }

  const idealDist = isDriving ? 14 : 7;
  const idealHeight = isDriving ? 4.5 : 2.8;

  const targetCamX = targetPos.x - Math.sin(targetRot + camAngle) * idealDist;
  const targetCamZ = targetPos.z - Math.cos(targetRot + camAngle) * idealDist;
  const targetCamY = targetPos.y + idealHeight;

  camera.position.x += (targetCamX - camera.position.x) * (dt * 12);
  camera.position.y += (targetCamY - camera.position.y) * (dt * 12);
  camera.position.z += (targetCamZ - camera.position.z) * (dt * 12);

  camera.lookAt(targetPos.x, targetPos.y + 1.2, targetPos.z);
}
