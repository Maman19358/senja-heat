// Procedural canvas textures (Revision 7 - Final Asphalt & Windows)
import * as THREE from 'three';

export function createRoadTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  // Asphalt base
  ctx.fillStyle = '#232428';
  ctx.fillRect(0, 0, 256, 256);

  // Fine speckle noise for realistic asphalt texture
  ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
  for (let i = 0; i < 700; i++) {
    const rx = Math.random() * 256;
    const ry = Math.random() * 256;
    ctx.fillRect(rx, ry, 2, 2);
  }

  // Solid white edge lines on both sides
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 4;
  ctx.setLineDash([]);
  ctx.beginPath();
  ctx.moveTo(14, 0);
  ctx.lineTo(14, 256);
  ctx.moveTo(242, 0);
  ctx.lineTo(242, 256);
  ctx.stroke();

  // White dashed lane lines
  ctx.lineWidth = 4;
  ctx.setLineDash([16, 16]);
  ctx.beginPath();
  ctx.moveTo(70, 0);
  ctx.lineTo(70, 256);
  ctx.moveTo(186, 0);
  ctx.lineTo(186, 256);
  ctx.stroke();

  // Crisp double-yellow center line
  ctx.strokeStyle = '#f1c40f';
  ctx.lineWidth = 3;
  ctx.setLineDash([]);
  ctx.beginPath();
  ctx.moveTo(125, 0);
  ctx.lineTo(125, 256);
  ctx.moveTo(131, 0);
  ctx.lineTo(131, 256);
  ctx.stroke();

  const t = new THREE.CanvasTexture(canvas);
  t.wrapS = THREE.RepeatWrapping;
  t.wrapT = THREE.RepeatWrapping;
  return t;
}

export function createBuildingWindowTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#1a1824';
  ctx.fillRect(0, 0, 128, 128);

  ctx.fillStyle = '#ffd166'; // Warm lit windows
  for (let x = 16; x < 128; x += 32) {
    for (let y = 16; y < 128; y += 32) {
      if ((x + y) % 64 === 0) {
        ctx.fillRect(x, y, 16, 20);
      }
    }
  }

  const t = new THREE.CanvasTexture(canvas);
  t.wrapS = THREE.RepeatWrapping;
  t.wrapT = THREE.RepeatWrapping;
  return t;
}

export function createBillboardTexture(text = 'SENJA HEAT') {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#0f0e17';
  ctx.fillRect(0, 0, 512, 256);

  ctx.fillStyle = '#ff2a85';
  ctx.font = 'bold 42px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(text, 256, 100);

  ctx.fillStyle = '#3498db';
  ctx.font = '24px sans-serif';
  ctx.fillText('TELUK SENJA DUSK BAY', 256, 160);

  const t = new THREE.CanvasTexture(canvas);
  return t;
}
