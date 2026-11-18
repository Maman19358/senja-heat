// Save / Load manager using localStorage (Revision 2 - Enhanced metadata)
const SAVE_KEY = 'SENJA_HEAT_SAVE_DATA_R2';

const defaultSave = {
  cash: 1500,
  rep: 150,
  completedMissions: [],
  currentMissionIndex: 0,
  settings: {
    volume: 0.8,
    mouseSensitivity: 1.0
  },
  playerPos: { x: -744, y: 0, z: 0 },
  version: '2.0'
};

export function saveGame(data) {
  try {
    const current = loadGame() || defaultSave;
    const merged = { ...current, ...data, timestamp: Date.now() };
    localStorage.setItem(SAVE_KEY, JSON.stringify(merged));
    return true;
  } catch (e) {
    console.error('Failed to save game', e);
    return false;
  }
}

export function loadGame() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return defaultSave;
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load game', e);
    return defaultSave;
  }
}

export function resetGame() {
  try {
    localStorage.removeItem(SAVE_KEY);
    return defaultSave;
  } catch (e) {
    return defaultSave;
  }
}
