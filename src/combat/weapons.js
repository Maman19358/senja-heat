// Weapons definitions, slot management, player health and armour
export const WEAPONS = [
  { id: 1, name: 'FIST', ammo: Infinity, maxAmmo: Infinity, damage: 15, range: 2.5, rate: 0.5 },
  { id: 2, name: 'PISTOL', ammo: 34, maxAmmo: 100, damage: 35, range: 50, rate: 0.2 },
  { id: 3, name: 'RIFLE', ammo: 90, maxAmmo: 250, damage: 55, range: 120, rate: 0.1 }
];

let activeWeaponIndex = 0;
let playerHealth = 100;
let playerArmour = 50;

export function getActiveWeapon() {
  return WEAPONS[activeWeaponIndex];
}

export function setActiveWeapon(index) {
  if (index >= 0 && index < WEAPONS.length) {
    activeWeaponIndex = index;
    updateWeaponUI();
  }
}

export function getPlayerHealth() {
  return playerHealth;
}

export function setPlayerHealth(val) {
  playerHealth = Math.max(0, Math.min(100, val));
}

export function getPlayerArmour() {
  return playerArmour;
}

export function setPlayerArmour(val) {
  playerArmour = Math.max(0, Math.min(100, val));
}

export function damagePlayer(amount) {
  let remaining = amount;
  if (playerArmour > 0) {
    if (playerArmour >= remaining) {
      playerArmour -= remaining;
      remaining = 0;
    } else {
      remaining -= playerArmour;
      playerArmour = 0;
    }
  }
  if (remaining > 0) {
    playerHealth = Math.max(0, playerHealth - remaining);
  }
}

export function updateWeaponUI() {
  const slots = document.querySelectorAll('.weapon-slot');
  slots.forEach((slot, idx) => {
    if (idx === activeWeaponIndex) {
      slot.classList.add('active');
    } else {
      slot.classList.remove('active');
    }
    const ammoSpan = slot.querySelector('.weapon-ammo');
    if (ammoSpan) {
      ammoSpan.textContent = WEAPONS[idx].ammo === Infinity ? '∞' : WEAPONS[idx].ammo;
    }
  });

  const healthBar = document.getElementById('health-bar');
  if (healthBar) healthBar.style.width = playerHealth + '%';

  const armourBar = document.getElementById('armour-bar');
  if (armourBar) armourBar.style.width = playerArmour + '%';
}
