// Story characters definitions and canvas portrait drawing
export const CAST = {
  raka: {
    key: 'raka',
    name: 'RAKA',
    role: 'Ex-Courier & Protagonist',
    color: '#ff2a85',
    description: 'Former courier pulled back into the Teluk Senja underworld by fixer Mira.'
  },
  mira: {
    key: 'mira',
    name: 'MIRA',
    role: 'Underworld Fixer',
    color: '#ffd166',
    description: 'Shrewd operator running contacts and jobs across Dusk Bay.'
  },
  spd: {
    key: 'spd',
    name: 'SENJA PD OFFICER',
    role: 'Law Enforcement',
    color: '#3498db',
    description: 'City police force patrolling Teluk Senja.'
  },
  thug: {
    key: 'thug',
    name: 'STREET THUG',
    role: 'Hostile Enforcer',
    color: '#e74c3c',
    description: 'Local syndicate muscle shaking down Pasar Senja.'
  },
  rival: {
    key: 'rival',
    name: 'BAYU',
    role: 'Street Racing Rival',
    color: '#9b59b6',
    description: 'Top street racer defending his title at Pelabuhan Docks.'
  }
};

export function drawPortrait(canvas, characterKey) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width || 128;
  const h = canvas.height || 128;

  ctx.fillStyle = '#0f0c1b';
  ctx.fillRect(0, 0, w, h);

  const character = CAST[characterKey] || CAST.raka;
  const mainColor = character.color || '#ff2a85';

  // Background gradient / glow
  const grad = ctx.createRadialGradient(w / 2, h / 2, 10, w / 2, h / 2, w * 0.7);
  grad.addColorStop(0, mainColor + '33');
  grad.addColorStop(1, '#000000');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // Border frame
  ctx.strokeStyle = mainColor;
  ctx.lineWidth = 3;
  ctx.strokeRect(4, 4, w - 8, h - 8);

  // Character silhouette / stylized portrait art
  ctx.save();
  ctx.translate(w / 2, h / 2 + 10);

  // Shoulders / torso
  ctx.fillStyle = mainColor;
  ctx.beginPath();
  ctx.arc(0, 45, 38, Math.PI, Math.PI * 2);
  ctx.fill();

  // Neck
  ctx.fillStyle = '#f1c40f';
  ctx.fillRect(-8, 10, 16, 20);

  // Head
  ctx.fillStyle = '#e0d4c3';
  ctx.beginPath();
  ctx.arc(0, -10, 24, 0, Math.PI * 2);
  ctx.fill();

  // Hair / Hat details based on character
  ctx.fillStyle = '#111111';
  if (characterKey === 'mira') {
    ctx.beginPath();
    ctx.arc(0, -15, 25, Math.PI * 1.1, Math.PI * 1.9);
    ctx.fill();
  } else if (characterKey === 'spd') {
    // Police cap
    ctx.fillRect(-22, -28, 44, 12);
    ctx.fillStyle = '#3498db';
    ctx.fillRect(-18, -34, 36, 8);
  } else if (characterKey === 'thug') {
    // Bandana
    ctx.fillStyle = '#e74c3c';
    ctx.fillRect(-22, -22, 44, 10);
  } else if (characterKey === 'rival') {
    // Racing helmet visor
    ctx.fillStyle = '#9b59b6';
    ctx.fillRect(-20, -18, 40, 14);
  } else {
    // Raka casual hair
    ctx.beginPath();
    ctx.arc(0, -22, 22, Math.PI * 0.9, Math.PI * 2.1);
    ctx.fill();
  }

  // Eyes / Details
  ctx.fillStyle = '#111';
  ctx.fillRect(-8, -10, 4, 4);
  ctx.fillRect(4, -10, 4, 4);

  ctx.restore();

  // Corner tech accents
  ctx.fillStyle = mainColor;
  ctx.fillRect(4, 4, 10, 2);
  ctx.fillRect(4, 4, 2, 10);
  ctx.fillRect(w - 14, h - 6, 10, 2);
  ctx.fillRect(w - 6, h - 14, 2, 10);
}
