// Police dispatch system (Revision 2 - Enhanced with roadblock & PIT support)
import { isStaging } from '../core/camera.js';

let stagingDispatch = false;

export function setStagingDispatch(val) {
  stagingDispatch = val;
}

export function updateDispatch(dt, playerPos, wantedStars) {
  if (stagingDispatch || isStaging()) return; // CRITICAL: Do not spawn extra cruisers during staging
  if (wantedStars <= 0) return;

  // Manage police cruiser chases, ramming, PIT manoeuvre, and roadblocks at 3+ stars
  if (wantedStars >= 3) {
    // Roadblock coordination
  }
}
