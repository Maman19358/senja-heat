// City layout and districts definitions (Revision 5 - Polished)
export const DISTRICTS = [
  { name: 'PANTAI SENJA', desc: 'Beach boulevard and neon strips', x: -744, z: 0 },
  { name: 'KOTA LAMA', desc: 'Historic colonial old town', x: -400, z: -200 },
  { name: 'PELABUHAN', desc: 'Bustling industrial docks and warehouses', x: 200, z: 400 },
  { name: 'BUKIT EMAS', desc: 'Wealthy hillside villas and winding roads', x: -400, z: 400 },
  { name: 'PASAR SENJA', desc: 'Night market and crowded arcades', x: 150, z: -150 }
];

export function getDistrictAt(x, z) {
  let closest = DISTRICTS[0];
  let minDist = Infinity;
  DISTRICTS.forEach(d => {
    const dx = d.x - x;
    const dz = d.z - z;
    const dist = dx * dx + dz * dz;
    if (dist < minDist) {
      minDist = dist;
      closest = d;
    }
  });
  return closest.name;
}

export function getAllDistricts() {
  return DISTRICTS;
}
