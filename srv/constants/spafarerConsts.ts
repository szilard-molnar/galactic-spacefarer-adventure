export const ERROR_MESSAGES = {
  noPlanetAssigned: "No planet assigned to current user",
  firstNameRequired: "First name is required",
  lastNameRequired: "Last name is required",
  emailRequired: "Email is required",
  invalidWormholeSkill: "Wormhole navigation skill must be between 1 and 100",
  negativeStardust: "Stardust collection cannot be negative"
} as const;

export const DEFAULTS = {
  spacesuitColor: "Cosmic Silver",
  stardustCollection: 0,
  wormholeNavigationSkill: 1
} as const;