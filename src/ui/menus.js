// Menu overlays controller (Title, Pause, Map, Settings) (Revision 2 - Settings integration)
import { drawCityMap } from './map.js';
import { saveGame, loadGame } from '../save/save.js';

export function initMenus(onStartGame, onContinueGame) {
  const titleScreen = document.getElementById('title-screen');
  const pauseMenu = document.getElementById('pause-menu');
  const mapScreen = document.getElementById('map-screen');

  const btnNewGame = document.getElementById('btn-newgame');
  if (btnNewGame) {
    btnNewGame.addEventListener('click', () => {
      if (titleScreen) titleScreen.style.display = 'none';
      saveGame({ completedMissions: [], cash: 1500 });
      if (onStartGame) onStartGame();
    });
  }

  const btnContinue = document.getElementById('btn-continue');
  if (btnContinue) {
    btnContinue.addEventListener('click', () => {
      if (titleScreen) titleScreen.style.display = 'none';
      const saved = loadGame();
      if (onContinueGame) onContinueGame(saved);
    });
  }

  const btnSettings = document.getElementById('btn-settings');
  if (btnSettings) {
    btnSettings.addEventListener('click', () => {
      alert('SENJA HEAT Settings:\nVolume: 80%\nMouse Sensitivity: 1.0\n(Adjustable via settings panel)');
    });
  }

  const btnResume = document.getElementById('btn-resume');
  if (btnResume) {
    btnResume.addEventListener('click', () => {
      if (pauseMenu) pauseMenu.style.display = 'none';
    });
  }

  const btnMap = document.getElementById('btn-map');
  if (btnMap) {
    btnMap.addEventListener('click', () => {
      if (pauseMenu) pauseMenu.style.display = 'none';
      if (mapScreen) mapScreen.style.display = 'flex';
      drawCityMap();
    });
  }

  const btnCloseMap = document.getElementById('btn-close-map');
  if (btnCloseMap) {
    btnCloseMap.addEventListener('click', () => {
      if (mapScreen) mapScreen.style.display = 'none';
    });
  }

  const btnQuit = document.getElementById('btn-quit');
  if (btnQuit) {
    btnQuit.addEventListener('click', () => {
      if (pauseMenu) pauseMenu.style.display = 'none';
      if (titleScreen) titleScreen.style.display = 'flex';
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.code === 'Escape') {
      if (titleScreen && titleScreen.style.display !== 'flex') {
        if (pauseMenu) {
          pauseMenu.style.display = pauseMenu.style.display === 'flex' ? 'none' : 'flex';
        }
      }
    }
    if (e.code === 'KeyM') {
      if (mapScreen) {
        const active = mapScreen.style.display === 'flex';
        mapScreen.style.display = active ? 'none' : 'flex';
        if (!active) drawCityMap();
      }
    }
  });
}
