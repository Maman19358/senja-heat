// Car physics and control dynamics (Revision 2 - Final Polish)
import { clamp } from '../core/math.js';

export class CarController {
  constructor(mesh, name = 'KENCANA GT', isPlayer = false) {
    this.mesh = mesh;
    this.name = name;
    this.isPlayer = isPlayer;
    this.frozen = false;

    this.speed = 0;
    this.maxSpeed = 52; // m/s (~185 km/h)
    this.acceleration = 15;
    this.braking = 35;
    this.steering = 0;
    this.steerSpeed = 3.2;
    this.heading = 0;
    this.condition = 100;
    this.skidding = false;
  }

  update(dt, input) {
    if (this.frozen) return;

    if (this.isPlayer) {
      const throttle = (input.w ? 1 : 0) - (input.s ? 0.75 : 0);
      const steeringInput = (input.d ? 1 : 0) - (input.a ? 1 : 0);

      if (throttle !== 0) {
        this.speed += throttle * this.acceleration * dt;
      } else {
        this.speed *= Math.pow(0.35, dt * 2.5);
      }

      if (input.space) {
        this.speed *= Math.pow(0.12, dt * 7);
        this.skidding = Math.abs(this.speed) > 8;
      } else {
        this.skidding = false;
      }

      this.speed = clamp(this.speed, -22, this.maxSpeed);

      if (Math.abs(this.speed) > 0.4) {
        this.heading += steeringInput * this.steerSpeed * (this.speed / this.maxSpeed) * dt;
      }
    } else {
      this.speed += (14 - this.speed) * dt;
    }

    this.mesh.rotation.y = this.heading;
    this.mesh.position.x += Math.sin(this.heading) * this.speed * dt;
    this.mesh.position.z += Math.cos(this.heading) * this.speed * dt;
  }

  getSpeedKMH() {
    return Math.round(Math.abs(this.speed) * 3.6);
  }
}

export function createCar(mesh, name, isPlayer) {
  return new CarController(mesh, name, isPlayer);
}

export function updateCar(car, dt, input) {
  if (car && typeof car.update === 'function') {
    car.update(dt, input);
  }
}
