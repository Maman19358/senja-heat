// Wanted level and heat manager (Revision 2 - Enhanced with heat decay)
let wantedStars = 0;
let bustedState = false;
let wastedState = false;
let heatDecayTimer = 0;

export function getWantedStars() {
  return wantedStars;
}

export function setWantedStars(stars) {
  wantedStars = Math.max(0, Math.min(5, stars));
  heatDecayTimer = 0;
  updateWantedUI();
}

export function addWantedStars(amount) {
  setWantedStars(wantedStars + amount);
}

export function isBusted() {
  return bustedState;
}

export function setBusted(val) {
  bustedState = val;
}

export function isWasted() {
  return wastedState;
}

export function setWasted(val) {
  wastedState = val;
}

export function updateWanted(dt, lineOfSightBroken) {
  if (wantedStars > 0 && lineOfSightBroken) {
    heatDecayTimer += dt;
    if (heatDecayTimer > 15) {
      setWantedStars(wantedStars - 1);
      heatDecayTimer = 0;
    }
  } else {
    heatDecayTimer = 0;
  }
}

export function updateWantedUI() {
  const starsEl = document.querySelectorAll('#hud-wanted .star');
  starsEl.forEach((star, idx) => {
    if (idx < wantedStars) {
      star.classList.add('active');
    } else {
      star.classList.remove('active');
    }
  });
}
