import type { Request } from "@sap/cds";

export type SpacefarerPayload = {
  firstName?: string;
  lastName?: string;
  email?: string;
  wormholeNavigationSkill?: number;
  stardustCollection?: number;
  spacesuitColor?: string;
  originPlanet_ID?: string;
};

export type UserWithPlanet = Request["user"] & {
  attr?: {
    planetId?: string;
  };
};