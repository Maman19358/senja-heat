// Math utilities and vector helpers (Revision 5 - Polished)
export function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}

export function lerp(a, b, t) {
  return a + (b - a) * t;
}

export function distance2D(x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
}

export function degToRad(deg) {
  return deg * (Math.PI / 180);
}

export function radToDeg(rad) {
  return rad * (180 / Math.PI);
}

export function smoothStep(min, max, value) {
  const x = clamp((value - min) / (max - min), 0, 1);
  return x * x * (3 - 2 * x);
}

export function vec3Distance(a, b) {
  return distance2D(a.x, a.z, b.x, b.z);
}

export function vec3Lerp(v1, v2, t) {
  return {
    x: lerp(v1.x, v2.x, t),
    y: lerp(v1.y, v2.y, t),
    z: lerp(v1.z, v2.z, t)
  };
}
