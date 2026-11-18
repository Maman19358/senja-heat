// Fleet management for vehicle spawns (Revision 2 - Enhanced)
import { createCarMesh } from './models.js';
import { CarController } from './car.js';

const cars = [];
let playerCarRef = null;

export function spawnCar(scene, type, color, x, z, heading = 0, isPlayer = false) {
  const mesh = createCarMesh(type, color);
  mesh.position.set(x, 0, z);
  mesh.rotation.y = heading;
  scene.add(mesh);

  const controller = new CarController(mesh, type === 'police' ? 'SPD CRUISER' : 'KENCANA GT', isPlayer);
  controller.heading = heading;
  cars.push(controller);

  if (isPlayer) {
    playerCarRef = controller;
  }
  return controller;
}

export function updateFleet(dt) {
  cars.forEach(car => {
    if (!car.isPlayer && !car.frozen) {
      car.update(dt, {});
    }
  });
}

export function getAllCars() {
  return cars;
}

export function getPlayerCar() {
  return playerCarRef;
}

export function setPlayerCar(car) {
  playerCarRef = car;
}

export function clearFleet(scene) {
  cars.forEach(car => {
    if (car.mesh && car.mesh.parent) {
      scene.remove(car.mesh);
    }
  });
  cars.length = 0;
  playerCarRef = null;
}
