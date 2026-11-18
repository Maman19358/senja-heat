// Circular minimap renderer with real street network, district labels, and radar (Revision 4 - Final)
import { getCurrentMission, isMissionActive } from '../missions/runner.js';
import { DISTRICTS } from '../world/layout.js';

export function drawMinimap(playerPos, cars, wantedStars) {
  const canvas = document.getElementById('minimap-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;

  // Background
  ctx.fillStyle = '#0b0914';
  ctx.fillRect(0, 0, w, h);

  const scale = 0.42; // world to canvas scale
  const px = playerPos ? playerPos.x : 0;
  const pz = playerPos ? playerPos.z : 0;

  // Draw ocean / beach band on the east side (world x > 550)
  const oceanWorldX = 550;
  const oceanCanvasX = w / 2 + (oceanWorldX - px) * scale;
  if (oceanCanvasX < w) {
    ctx.fillStyle = '#102238';
    ctx.fillRect(Math.max(0, oceanCanvasX), 0, w - Math.max(0, oceanCanvasX), h);
  }

  // Draw street grid (brighter lines: #6b5f8a)
  ctx.strokeStyle = '#6b5f8a';
  ctx.lineWidth = 2;
  ctx.beginPath();

  // Avenues (vertical lines every 200 world units)
  for (let wx = -1200; wx <= 1200; wx += 200) {
    const cx = w / 2 + (wx - px) * scale;
    if (cx >= -20 && cx <= w + 20) {
      ctx.moveTo(cx, 0);
      ctx.lineTo(cx, h);
    }
  }

  // Coastal boulevard vertical line at x = -744
  const cbx = w / 2 + (-744 - px) * scale;
  if (cbx >= -20 && cbx <= w + 20) {
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#8578a6';
    ctx.moveTo(cbx, 0);
    ctx.lineTo(cbx, h);
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#6b5f8a';
  }

  // Cross streets (horizontal lines every 300 world units)
  for (let wz = -1200; wz <= 1200; wz += 300) {
    const cz = h / 2 + (wz - pz) * scale;
    if (cz >= -20 && cz <= h + 20) {
      ctx.moveTo(0, cz);
      ctx.lineTo(w, cz);
    }
  }
  ctx.stroke();

  // Draw 5 district dots and tiny labels
  if (Array.isArray(DISTRICTS)) {
    DISTRICTS.forEach(d => {
      const dcx = w / 2 + (d.x - px) * scale;
      const dcz = h / 2 + (d.z - pz) * scale;
      const distFromCenter = Math.hypot(dcx - w / 2, dcz - h / 2);
      if (distFromCenter < w / 2 - 10) {
        ctx.fillStyle = '#ffd166';
        ctx.beginPath();
        ctx.arc(dcx, dcz, 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#c5bedb';
        ctx.font = '8px sans-serif';
        ctx.fillText(d.name, dcx + 5, dcz + 3);
      }
    });
  }

  // Draw active mission marker if any
  const mission = getCurrentMission();
  if (mission && isMissionActive() && mission.targetPos) {
    const mx = (mission.targetPos.x - px) * scale;
    const mz = (mission.targetPos.z - pz) * scale;
    ctx.fillStyle = '#ffd166';
    ctx.beginPath();
    ctx.arc(w / 2 + mx, h / 2 + mz, 6, 0, Math.PI * 2);
    ctx.fill();
  }

  // Draw nearby cars / police dots
  if (Array.isArray(cars)) {
    cars.forEach(car => {
      if (!car || !car.mesh) return;
      const dx = (car.mesh.position.x - px) * scale;
      const dz = (car.mesh.position.z - pz) * scale;
      const distSq = dx * dx + dz * dz;
      if (distSq < (w / 2) * (w / 2)) {
        ctx.fillStyle = car.type === 'police' ? '#3498db' : '#8c8c9e';
        ctx.fillRect(w / 2 + dx - 2, h / 2 + dz - 2, 4, 4);
      }
    });
  }

  // Draw North indicator 'N'
  ctx.fillStyle = '#ffd166';
  ctx.font = 'bold 11px sans-serif';
  ctx.fillText('N', w / 2 - 4, 14);

  // Draw player arrow at center
  ctx.fillStyle = '#ff2a85';
  ctx.beginPath();
  ctx.moveTo(w / 2, h / 2 - 8);
  ctx.lineTo(w / 2 - 6, h / 2 + 8);
  ctx.lineTo(w / 2 + 6, h / 2 + 8);
  ctx.closePath();
  ctx.fill();
}
