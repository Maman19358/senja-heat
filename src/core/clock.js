// Game clock / time of day manager (Revision 5 - Polished)
let gameTimeMinutes = 18 * 60; // Fixed golden hour start at 18:00 (Teluk Senja sunset)
let dayNumber = 1;
const timeScale = 12;

export function updateClock(dt) {
  gameTimeMinutes += dt * timeScale;
  if (gameTimeMinutes >= 24 * 60) {
    gameTimeMinutes -= 24 * 60;
    dayNumber++;
  }
}

export function getDayNumber() {
  return dayNumber;
}

export function getTimeString() {
  const hours = Math.floor(gameTimeMinutes / 60);
  const mins = Math.floor(gameTimeMinutes % 60);
  const hh = String(hours).padStart(2, '0');
  const mm = String(mins).padStart(2, '0');
  return `${hh}:${mm} DAY ${dayNumber}`;
}

export function getRawMinutes() {
  return gameTimeMinutes;
}

export function isNight() {
  return gameTimeMinutes < 6 * 60 || gameTimeMinutes > 19 * 60;
}

export function setTime(minutes) {
  gameTimeMinutes = Math.max(0, Math.min(24 * 60, minutes));
}
