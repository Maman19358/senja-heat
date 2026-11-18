// Seeded pseudo-random number generator (Revision 5 - Polished)
let seed = 1337;

export function setSeed(s) {
  if (s !== undefined && s !== null) {
    seed = parseInt(s, 10) || 1337;
  }
}

export function random() {
  seed = (seed * 9301 + 49297) % 233280;
  return seed / 233280;
}

export function randomRange(min, max) {
  return min + random() * (max - min);
}

export function randomInt(min, max) {
  return Math.floor(randomRange(min, max + 1));
}

export function randomChoice(arr) {
  if (!arr || arr.length === 0) return null;
  return arr[randomInt(0, arr.length - 1)];
}

export function randomColor() {
  const colors = [0xff2a85, 0x3498db, 0x2ecc71, 0xe74c3c, 0xf1c40f, 0x9b59b6, 0xecf0f1, 0x2c3e50, 0xff702a];
  return randomChoice(colors);
}

export function randomGaussian(mean = 0, stdev = 1) {
  let u = 1 - random();
  let v = random();
  let z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  return z * stdev + mean;
}
