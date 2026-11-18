// Traffic AI manager skipping frozen, player, and police cars (Revision 2 - Enhanced)
import { getAllCars } from '../vehicles/fleet.js';

export function updateTraffic(dt) {
  const cars = getAllCars();
  cars.forEach(car => {
    // CRITICAL: Skip frozen cars, player car, and police cars (never drive them)
    if (car.frozen || car.isPlayer || (car.name && (car.name.includes('SPD') || car.name.includes('CRUISER')))) {
      return;
    }
    car.speed = 13;
    car.mesh.position.z += car.speed * dt;
    if (car.mesh.position.z > 900) car.mesh.position.z = -900;
  });
}
