import type { Request, Service } from "@sap/cds";

type SpacefarerPayload = {
  firstName?: string;
  lastName?: string;
  email?: string;
  wormholeNavigationSkill?: number;
  stardustCollection?: number;
  spacesuitColor?: string;
  originPlanet_ID?: string;
};

type UserWithPlanet = Request["user"] & {
  attr?: {
    planetId?: string;
  };
};

const ERROR_MESSAGES = {
  noPlanetAssigned: "No planet assigned to current user",
  firstNameRequired: "First name is required",
  lastNameRequired: "Last name is required",
  emailRequired: "Email is required",
  invalidWormholeSkill: "Wormhole navigation skill must be between 1 and 100",
  negativeStardust: "Stardust collection cannot be negative"
} as const;

const DEFAULTS = {
  spacesuitColor: "Cosmic Silver",
  stardustCollection: 0,
  wormholeNavigationSkill: 1
} as const;

function getPlanetId(req: Request): string | undefined {
  return (req.user as UserWithPlanet).attr?.planetId;
}

function validateRequiredCreateFields(req: Request, data: SpacefarerPayload): void {
  if (!data.firstName) {
    req.reject(400, ERROR_MESSAGES.firstNameRequired);
  }

  if (!data.lastName) {
    req.reject(400, ERROR_MESSAGES.lastNameRequired);
  }

  if (!data.email) {
    req.reject(400, ERROR_MESSAGES.emailRequired);
  }
}

function validateSpacefarerValues(req: Request, data: SpacefarerPayload): void {
  if (
    data.wormholeNavigationSkill !== undefined &&
    (data.wormholeNavigationSkill < 1 || data.wormholeNavigationSkill > 100)
  ) {
    req.reject(400, ERROR_MESSAGES.invalidWormholeSkill);
  }

  if (
    data.stardustCollection !== undefined &&
    data.stardustCollection < 0
  ) {
    req.reject(400, ERROR_MESSAGES.negativeStardust);
  }
}

function applySpacefarerDefaults(data: SpacefarerPayload): void {
  data.spacesuitColor ??= DEFAULTS.spacesuitColor;
  data.stardustCollection ??= DEFAULTS.stardustCollection;
  data.wormholeNavigationSkill ??= DEFAULTS.wormholeNavigationSkill;
}

function assignPlanetFromUser(req: Request, data: SpacefarerPayload): void {
  if (data.originPlanet_ID) {
    return;
  }

  const planetId = getPlanetId(req);

  if (planetId && planetId !== "*") {
    data.originPlanet_ID = planetId;
  }
}

export default function GalacticService(srv: Service): void {
  srv.before("READ", "Spacefarers", (req: Request) => {
    if (req.user.is("SpacefarerAdmin")) {
      return;
    }

    const planetId = getPlanetId(req);

    if (!planetId) {
      req.reject(403, ERROR_MESSAGES.noPlanetAssigned);
      return;
    }

    (req.query as any).where({
      originPlanet_ID: planetId
    });
  });

  srv.before("CREATE", "Spacefarers", (req: Request) => {
    const data = req.data as SpacefarerPayload;

    validateRequiredCreateFields(req, data);
    validateSpacefarerValues(req, data);
    applySpacefarerDefaults(data);
    assignPlanetFromUser(req, data);
  });

  srv.before("UPDATE", "Spacefarers", (req: Request) => {
    const data = req.data as SpacefarerPayload;

    validateSpacefarerValues(req, data);
  });

  srv.after("CREATE", "Spacefarers", (data: unknown) => {
    const spacefarer = data as SpacefarerPayload;
    console.log("======================================");
    console.log("CREATE notification mail sent");
    console.log(`To: ${spacefarer.email}`);
    console.log(
      `Message: ${spacefarer.firstName} ${spacefarer.lastName} is successfully registered.`
    );
    console.log("======================================");
  });
}