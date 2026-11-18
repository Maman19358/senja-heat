// Mission runner / manager state and progression
import { MISSIONS, REP_LEVELS } from './catalog.js';
import { queueDialogue } from '../story/dialogue.js';

let currentMissionIndex = 0;
let missionActive = false;
let playerCash = 1500;
let playerRep = 0;

export function getCurrentMission() {
  return MISSIONS[currentMissionIndex] || MISSIONS[0];
}

export function getPlayerCash() {
  return playerCash;
}

export function addPlayerCash(amount) {
  playerCash += amount;
}

export function getPlayerRep() {
  return playerRep;
}

export function addPlayerRep(amount) {
  playerRep += amount;
}

export function getPlayerRepTitle() {
  let currentTitle = REP_LEVELS[0].title;
  for (const rl of REP_LEVELS) {
    if (playerRep >= rl.repRequired) {
      currentTitle = rl.title;
    }
  }
  return currentTitle;
}

export function startMission(index) {
  if (index >= 0 && index < MISSIONS.length) {
    currentMissionIndex = index;
    missionActive = true;
    const m = MISSIONS[index];
    updateMissionUI();
    queueDialogue(m.client, m.clientName, m.briefing, () => {
      // Briefing complete callback
    });
  }
}

export function completeMission() {
  if (!missionActive) return;
  const m = getCurrentMission();
  missionActive = false;
  playerCash += m.rewardCash;
  playerRep += m.rewardRep;

  queueDialogue(m.client, m.clientName, `Mission Accomplished! You earned $${m.rewardCash} and ${m.rewardRep} REP.`, () => {
    if (currentMissionIndex < MISSIONS.length - 1) {
      currentMissionIndex++;
      updateMissionUI();
    }
  });
}

export function failMission(reason) {
  if (!missionActive) return;
  missionActive = false;
  queueDialogue('mira', 'Mira', `Mission Failed: ${reason || 'You blew it, Raka.'}. Try again.`, () => {
    updateMissionUI();
  });
}

export function setMissionIndex(idx) {
  currentMissionIndex = idx;
  updateMissionUI();
}

export function setMissionActive(active) {
  missionActive = active;
  updateMissionUI();
}

export function updateMissionUI() {
  const m = getCurrentMission();
  const titleEl = document.getElementById('mission-title');
  const objEl = document.getElementById('mission-obj');
  if (titleEl) titleEl.textContent = m.title;
  if (objEl) objEl.textContent = m.objective;
}

export function isMissionActive() {
  return missionActive;
}
