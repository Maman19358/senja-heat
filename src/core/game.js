// Core game loop and scene orchestrator (Revision 2 - Fully integrated audio & persistence)
import * as THREE from 'three';
import { initCamera, getCamera, setStagingCamera, updateCamera, isStaging } from './camera.js';
import { initInput, isKeyPressed, getMouseDelta } from './input.js';
import { updateClock } from './clock.js';
import { getUrlParams, setupShotStaging } from './shots.js';
import { setSeed } from './random.js';
import { buildCity } from '../world/city.js';
import { spawnCar, updateFleet, getAllCars, getPlayerCar, setPlayerCar } from '../vehicles/fleet.js';
import { updateTraffic } from '../ai/traffic.js';
import { spawnPedestrians, updatePedestrians } from '../ai/pedestrians.js';
import { setWantedStars, addWantedStars, getWantedStars } from '../police/wanted.js';
import { spawnHelicopter, updateHelicopter } from '../police/helicopter.js';
import { updateDispatch } from '../police/dispatch.js';
import { updateHUD } from '../ui/hud.js';
import { drawMinimap } from '../ui/minimap.js';
import { initMenus } from '../ui/menus.js';

// Audio & Save systems
import { initEngineAudio, updateEngineAudio } from '../audio/engine.js';
import { initRadio, cycleRadio } from '../audio/radio.js';
import { initSFX, playSFX } from '../audio/sfx.js';
import { saveGame, loadGame } from '../save/save.js';

// Newly wired systems
import { startMission, completeMission, failMission, getCurrentMission, isMissionActive, getPlayerCash, getPlayerRep } from '../missions/runner.js';
import { checkObjective } from '../missions/objectives.js';
import { initDialogueSystem, queueDialogue } from '../story/dialogue.js';
import { getActiveWeapon, setActiveWeapon, updateWeaponUI } from '../combat/weapons.js';
import { fireBullet } from '../combat/ballistics.js';
import { updateParticles, spawnParticle } from '../effects/particles.js';
import { updateSkids, addSkidMark } from '../effects/skids.js';

let scene, renderer, clock;
let playerCar = null;
let stagedShotReady = false;

export function initGame() {
  const container = document.getElementById('game-container');
  if (!container) return;

  scene = new THREE.Scene();
  renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.4;
  container.appendChild(renderer.domElement);

  initCamera();
  initInput(renderer.domElement);
  clock = new THREE.Clock();

  const params = getUrlParams();
  if (params.seed) setSeed(params.seed);

  buildCity(scene);
  if (typeof spawnPedestrians === 'function') spawnPedestrians(scene);

  playerCar = spawnCar(scene, 'kencana', 0xff2a85, -744, 0, 0, true);
  if (playerCar && typeof setPlayerCar === 'function') setPlayerCar(playerCar);

  // Spawn ambient civilian traffic cars
  spawnCar(scene, 'taxi', 0xf1c40f, -744, 40, 0, false);
  spawnCar(scene, 'truck', 0x27ae60, -744, -50, 0, false);
  spawnCar(scene, 'sedan', 0x3498db, -752, -150, 0, false);
  spawnCar(scene, 'sedan', 0xe74c3c, -736, 120, 0, false);
  spawnCar(scene, 'taxi', 0xf39c12, -752, 220, 0, false);
  spawnCar(scene, 'truck', 0x2ecc71, -736, -260, 0, false);
  spawnCar(scene, 'sedan', 0x9b59b6, -752, -320, 0, false);
  spawnCar(scene, 'truck', 0x1abc9c, -736, 310, 0, false);

  if (params.shot) {
    const titleScreen = document.getElementById('title-screen');
    if (titleScreen) titleScreen.style.display = 'none';
    setupShotStaging(params.shot, scene, playerCar);
  }

  // Initialize menus with start and continue handlers
  if (typeof initMenus === 'function') {
    initMenus(
      () => {
        // New Game
        initEngineAudio();
        initSFX();
        initRadio();
        playSFX('chime');
      },
      (savedData) => {
        // Continue Game
        initEngineAudio();
        initSFX();
        initRadio();
        playSFX('chime');
        if (savedData && savedData.cash) {
          console.log('Resumed game with cash:', savedData.cash);
        }
      }
    );
  }

  // Initialize dialogue & weapon UI
  initDialogueSystem();
  updateWeaponUI();

  // Start first mission introduction after short delay if not staging shots
  if (!params.shot) {
    setTimeout(() => {
      startMission(0);
      playSFX('chime');
    }, 2000);
  }

  // Input listeners for weapon switching, radio cycling & firing
  window.addEventListener('keydown', (e) => {
    if (e.key === '1') { setActiveWeapon(0); playSFX('chime'); }
    if (e.key === '2') { setActiveWeapon(1); playSFX('chime'); }
    if (e.key === '3') { setActiveWeapon(2); playSFX('chime'); }
    if (e.key === 'r' || e.key === 'R') {
      cycleRadio();
      playSFX('chime');
    }
    if (e.key === 'm' || e.key === 'M') {
      const current = getCurrentMission();
      if (current) {
        queueDialogue(current.client, current.clientName, current.briefing);
      }
    }
  });

  window.addEventListener('mousedown', () => {
    initEngineAudio();
    initSFX();
    fireBullet(scene, getCamera(), getActiveWeapon(), [], (hit, dmg) => {
      spawnParticle(scene, 'spark', hit.point);
      playSFX('gunshot');
    });
  });

  window.addEventListener('resize', () => {
    const cam = getCamera();
    if (cam) {
      cam.aspect = window.innerWidth / window.innerHeight;
      cam.updateProjectionMatrix();
    }
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  animate();
}


function animate() {
  requestAnimationFrame(animate);

  const dt = Math.min(clock.getDelta(), 0.1);
  if (typeof updateClock === 'function') updateClock(dt);

  const mouseDelta = getMouseDelta();
  const input = {
    w: isKeyPressed('keyw') || isKeyPressed('arrowup'),
    s: isKeyPressed('keys') || isKeyPressed('arrowdown'),
    a: isKeyPressed('keya') || isKeyPressed('arrowleft'),
    d: isKeyPressed('keyd') || isKeyPressed('arrowright'),
    space: isKeyPressed('space')
  };

  // Fixed frame order: input → player → vehicles → traffic → pedestrians → police → audio → camera → HUD hooks → render
  if (playerCar && !playerCar.frozen) {
    if (typeof playerCar.update === 'function') playerCar.update(dt, input);
    updateEngineAudio(playerCar.speed, true);
    if (input.space && playerCar.speed > 5) {
      addSkidMark(scene, playerCar.mesh.position);
      if (Math.random() < 0.1) playSFX('skid');
    }
  } else {
    updateEngineAudio(0, false);
  }

  if (typeof updateFleet === 'function') updateFleet(dt);
  if (typeof updateTraffic === 'function') updateTraffic(dt);
  if (typeof updatePedestrians === 'function') updatePedestrians(dt);

  // Update particles & skids
  updateParticles(dt, scene);
  updateSkids(dt, scene);

  const playerPos = playerCar ? playerCar.mesh.position : (window.__stagedPlayerPos || { x: 0, y: 0, z: 0 });
  const wanted = typeof getWantedStars === 'function' ? getWantedStars() : 0;
  if (typeof updateDispatch === 'function') updateDispatch(dt, playerPos, wanted);
  if (typeof updateHelicopter === 'function') updateHelicopter(dt, playerPos);

  // Check mission objectives
  if (isMissionActive() && checkObjective(getCurrentMission(), playerPos)) {
    completeMission();
    playSFX('chime');
    saveGame({ cash: getPlayerCash(), rep: getPlayerRep() });
  }

  if (playerCar) {
    const rot = playerCar.mesh.rotation ? playerCar.mesh.rotation.y : 0;
    updateCamera(playerPos, rot, true, dt, mouseDelta);
  }

  if (typeof updateHUD === 'function') updateHUD(playerPos, playerCar, getPlayerCash());
  if (typeof drawMinimap === 'function') drawMinimap(playerPos, typeof getAllCars === 'function' ? getAllCars() : [], wanted);

  if (scene && getCamera()) {
    renderer.render(scene, getCamera());
  }
}

