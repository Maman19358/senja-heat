// Mission objectives tracking and distance checking
import { MISSIONS } from './catalog.js';

export function checkObjective(mission, playerPos) {
  if (!mission || !playerPos || !mission.targetCoords) return false;
  const dx = playerPos.x - mission.targetCoords.x;
  const dz = playerPos.z - mission.targetCoords.z;
  const dist = Math.sqrt(dx * dx + dz * dz);
  // Within 25 meters of target
  return dist < 25;
}

export function getObjectiveDistance(mission, playerPos) {
  if (!mission || !playerPos || !mission.targetCoords) return 0;
  const dx = playerPos.x - mission.targetCoords.x;
  const dz = playerPos.z - mission.targetCoords.z;
  return Math.round(Math.sqrt(dx * dx + dz * dz));
}
