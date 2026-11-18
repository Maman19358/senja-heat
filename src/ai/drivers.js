// AI driver profiles and behavior parameters (Revision 2 - Enhanced)
export const PROFILES = {
  cautious: { aggression: 0.2, skill: 0.5, reaction: 0.8, preferredSpeed: 10, laneTolerance: 0.2 },
  normal: { aggression: 0.5, skill: 0.7, reaction: 0.6, preferredSpeed: 14, laneTolerance: 0.5 },
  aggressive: { aggression: 0.8, skill: 0.85, reaction: 0.4, preferredSpeed: 18, laneTolerance: 0.8 },
  racer: { aggression: 1.0, skill: 0.95, reaction: 0.2, preferredSpeed: 25, laneTolerance: 0.9 }
};

export function makeDriver(profileName = 'normal') {
  const base = PROFILES[profileName] || PROFILES.normal;
  return {
    profile: profileName,
    aggression: base.aggression,
    skill: base.skill,
    reaction: base.reaction,
    preferredSpeed: base.preferredSpeed,
    laneTolerance: base.laneTolerance,
    state: 'cruising',
    targetLane: 0
  };
}
