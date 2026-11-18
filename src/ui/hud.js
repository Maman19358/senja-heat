// HUD updates (clock, cash, vehicle panel, location, mission, wanted, police list, status bars) (Revision 4 - Denser HUD Final)
import { getTimeString, getDayNumber } from '../core/clock.js';
import { getDistrictAt } from '../world/layout.js';
import { getCurrentMission, isMissionActive, getPlayerRep } from '../missions/runner.js';
import { getWantedStars } from '../police/wanted.js';
import { getActiveRadio } from '../audio/radio.js';

export function updateHUD(playerPos, activeCar, cash) {
  const clockEl = document.getElementById('hud-clock');
  if (clockEl) clockEl.textContent = getTimeString();

  const cashEl = document.getElementById('hud-cash');
  if (cashEl) cashEl.textContent = `$${cash.toLocaleString()}`;

  const locEl = document.getElementById('location-label');
  const params = new URLSearchParams(window.location.search);
  const shot = params.get('shot');

  if (locEl) {
    if (shot === 'street') {
      locEl.textContent = 'PASAR SENJA';
    } else {
      locEl.textContent = getDistrictAt(playerPos.x, playerPos.z);
    }
  }

  // Status bars update
  const hpFill = document.getElementById('health-fill');
  if (hpFill) hpFill.style.width = '100%';
  const armFill = document.getElementById('armour-fill');
  if (armFill) armFill.style.width = '75%';
  const repFill = document.getElementById('rep-fill');
  if (repFill) repFill.style.width = `${Math.min(getPlayerRep() / 5, 100)}%`;

  // Mission panel
  const missionTitleEl = document.getElementById('mission-title');
  const missionObjEl = document.getElementById('mission-obj');
  const missionFillEl = document.getElementById('mission-stage-fill');
  const missionNextEl = document.getElementById('mission-next');

  if (missionTitleEl && missionObjEl) {
    if (shot === 'chase') {
      missionTitleEl.textContent = 'SENJA CASH';
      missionObjEl.textContent = 'Escape the 4-star heat with the final payout!';
      if (missionFillEl) missionFillEl.style.width = '75%';
      if (missionNextEl) missionNextEl.textContent = 'STAGE 3/4 • NEXT: Lose the heli';
    } else if (shot === 'street') {
      missionTitleEl.textContent = 'TAGIHAN MIRA';
      missionObjEl.textContent = 'Collect cash on foot in Pasar Senja and fight off two thugs';
      if (missionFillEl) missionFillEl.style.width = '33.3%';
      if (missionNextEl) missionNextEl.textContent = 'STAGE 1/3 • NEXT: Grab the cash';
    } else if (shot === 'drive') {
      missionTitleEl.textContent = 'PAKET KILAT';
      missionObjEl.textContent = 'Drive the package across town to Pantai Senja';
      if (missionFillEl) missionFillEl.style.width = '66.6%';
      if (missionNextEl) missionNextEl.textContent = 'STAGE 2/3 • NEXT: Reach Pantai Senja';
    } else {
      const currentMission = getCurrentMission();
      if (currentMission && isMissionActive()) {
        missionTitleEl.textContent = currentMission.title;
        missionObjEl.textContent = currentMission.objectiveText || currentMission.briefing;
        const curStage = currentMission.stage || 1;
        const totStage = currentMission.totalStages || 1;
        if (missionFillEl) missionFillEl.style.width = `${(curStage / totStage) * 100}%`;
        if (missionNextEl) missionNextEl.textContent = `STAGE ${curStage}/${totStage} • NEXT: ${currentMission.nextObjective || 'Proceed'}`;
      } else {
        missionTitleEl.textContent = 'SENJA HEAT — FREE ROAM';
        missionObjEl.textContent = 'Explore Teluk Senja or find a fixer';
        if (missionFillEl) missionFillEl.style.width = '100%';
        if (missionNextEl) missionNextEl.textContent = 'Press M for Map / ESC for Pause';
      }
    }
  }

  // Wanted stars
  const wanted = getWantedStars();
  const starsContainer = document.getElementById('hud-wanted');
  if (starsContainer) {
    const stars = starsContainer.querySelectorAll('.star');
    stars.forEach((star, idx) => {
      if (idx < wanted) {
        star.classList.add('active');
        star.textContent = '★';
      } else {
        star.classList.remove('active');
        star.textContent = '★';
      }
    });
  }

  // Vehicle panel
  const vehPanel = document.getElementById('hud-vehicle');
  if (vehPanel) {
    if (activeCar) {
      vehPanel.style.display = 'block';
      const speedEl = document.getElementById('veh-speed');
      const speedFillEl = document.getElementById('veh-speed-fill');
      const gearEl = document.getElementById('veh-gear');

      let speedVal = 54;
      if (shot === 'chase' || shot === 'drive') {
        speedVal = 54;
      } else if (activeCar) {
        speedVal = activeCar.getSpeedKMH ? activeCar.getSpeedKMH() : 0;
      }

      if (speedEl) {
        speedEl.innerHTML = `${Math.round(speedVal)} <span>KM/H</span>`;
      }
      if (speedFillEl) {
        const pct = Math.min((speedVal / 200) * 100, 100);
        speedFillEl.style.width = `${pct}%`;
      }
      if (gearEl) {
        const carName = activeCar.name || 'KENCANA GT';
        gearEl.textContent = `GEAR D • ${carName}`;
      }

      const radioEl = document.getElementById('veh-radio');
      if (radioEl) {
        const rad = getActiveRadio();
        radioEl.textContent = `RADIO: ${rad ? rad.name : 'SENJA WAVE'}`;
      }
    } else {
      vehPanel.style.display = 'none';
    }
  }

  // Police response list (denser: 2 units at wanted >= 1, 3 units at >= 3, 4 units at >= 4)
  const policeList = document.getElementById('police-response-list');
  if (policeList) {
    if (wanted > 0) {
      policeList.style.display = 'flex';
      let html = `<div class="police-unit-item"><span>SPD CRUISER ELANG-1</span><span>38m RAMMING</span></div>`;
      if (wanted >= 2) {
        html += `<div class="police-unit-item"><span>SPD CRUISER ELANG-2</span><span>65m PURSUIT</span></div>`;
      }
      if (wanted >= 3) {
        html += `<div class="police-unit-item"><span>HELICOPTER ELANG-2</span><span>95m SPOTLIGHT</span></div>`;
      }
      if (wanted >= 4) {
        html += `<div class="police-unit-item"><span>ROADBLOCK UNIT</span><span>140m ROADBLOCK</span></div>`;
      }
      policeList.innerHTML = html;
    } else {
      policeList.innerHTML = '';
      policeList.style.display = 'none';
    }
  }
}
