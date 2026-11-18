// City map screen renderer (Revision 2 - Coastline & player marker)
import { DISTRICTS } from '../world/layout.js';

export function drawCityMap(playerPos) {
  const canvas = document.getElementById('map-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;

  // Background (Dusk Bay ocean & city)
  ctx.fillStyle = '#07050f';
  ctx.fillRect(0, 0, w, h);

  // Draw coastline bay gradient / lines
  ctx.fillStyle = '#0e0b1a';
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(w * 0.4, 0);
  ctx.quadraticCurveTo(w * 0.6, h * 0.5, w * 0.3, h);
  ctx.lineTo(0, h);
  ctx.fill();

  // Draw grid
  ctx.strokeStyle = '#1a1429';
  ctx.lineWidth = 1.5;
  for (let x = 0; x < w; x += 60) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
  }
  for (let y = 0; y < h; y += 60) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
  }

  // Draw districts with >= 20px clearance
  DISTRICTS.forEach((d) => {
    const cx = w / 2 + (d.x / 3.2);
    const cz = h / 2 + (d.z / 3.2);

    ctx.fillStyle = '#ff2a85';
    ctx.beginPath();
    ctx.arc(cx, cz, 7, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ffd166';
    ctx.font = 'bold 13px sans-serif';
    ctx.fillText(d.name, cx + 16, cz + 4);
  });

  // Draw player marker if playerPos provided (with clearance offset if near any district)
  if (playerPos) {
    let px = w / 2 + (playerPos.x / 3.2);
    let pz = h / 2 + (playerPos.z / 3.2);

    DISTRICTS.forEach((d) => {
      const dcx = w / 2 + (d.x / 3.2);
      const dcz = h / 2 + (d.z / 3.2);
      const dist = Math.hypot(px - dcx, pz - dcz);
      if (dist < 45) {
        px += 25;
        pz -= 22;
      }
    });

    ctx.fillStyle = '#2ecc71';
    ctx.beginPath();
    ctx.arc(px, pz, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.font = '10px sans-serif';
    ctx.fillText('YOU', px + 10, pz + 4);
  }

  // Draw legend
  ctx.fillStyle = 'rgba(11, 9, 20, 0.9)';
  ctx.fillRect(20, h - 65, 260, 45);
  ctx.strokeStyle = 'rgba(255, 42, 133, 0.5)';
  ctx.strokeRect(20, h - 65, 260, 45);

  ctx.fillStyle = '#f0f0f5';
  ctx.font = '11px sans-serif';
  ctx.fillText('TELUK SENJA — CRIME MAP', 30, h - 42);
  ctx.fillStyle = '#ffd166';
  ctx.fillText('● District Hub  ● You  |  ESC/M to Close', 30, h - 26);
}
