// City generation orchestrator (Revision 5 - Polished)
import { setupLighting } from './sky.js';
import { createOcean } from './ocean.js';
import { createBuildings } from './buildings.js';
import { createStreets } from './streets.js';
import { createProps } from './props.js';

export function buildCity(scene) {
  if (!scene) return;
  setupLighting(scene);
  createOcean(scene);
  createStreets(scene);
  createBuildings(scene);
  createProps(scene);
}
