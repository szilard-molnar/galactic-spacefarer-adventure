module.exports = (srv) => {
  srv.before("READ", "Spacefarers", (req) => {
    if (req.user.is("SpacefarerAdmin")) {
      return;
    }

    const planetId = req.user.attr?.planetId;

    if (!planetId) {
      return req.reject(403, "No planet assigned to current user");
    }

    req.query.where({
      originPlanet_ID: planetId,
    });
  });

  srv.before("CREATE", "Spacefarers", (req) => {
    const data = req.data;

    if (!data.firstName) {
      return req.reject(400, "First name is required");
    }

    if (!data.lastName) {
      return req.reject(400, "Last name is required");
    }

    if (!data.email) {
      return req.reject(400, "Email is required");
    }

    if (
      data.wormholeNavigationSkill !== undefined &&
      (data.wormholeNavigationSkill < 1 ||
        data.wormholeNavigationSkill > 100)
    ) {
      return req.reject(
        400,
        "Wormhole navigation skill must be between 1 and 100"
      );
    }

    if (
      data.stardustCollection !== undefined &&
      data.stardustCollection < 0
    ) {
      return req.reject(400, "Stardust collection cannot be negative");
    }

    if (!data.spacesuitColor) {
      data.spacesuitColor = "Cosmic Silver";
    }

    if (data.stardustCollection === undefined) {
      data.stardustCollection = 0;
    }

    if (data.wormholeNavigationSkill === undefined) {
      data.wormholeNavigationSkill = 1;
    }

    if (!data.originPlanet_ID) {
      const planetId = req.user.attr?.planetId;

      if (planetId && planetId !== "*") {
        data.originPlanet_ID = planetId;
      }
    }
  });

  srv.before("UPDATE", "Spacefarers", (req) => {
    const data = req.data;

    if (
      data.wormholeNavigationSkill !== undefined &&
      (data.wormholeNavigationSkill < 1 ||
        data.wormholeNavigationSkill > 100)
    ) {
      return req.reject(
        400,
        "Wormhole navigation skill must be between 1 and 100"
      );
    }

    if (
      data.stardustCollection !== undefined &&
      data.stardustCollection < 0
    ) {
      return req.reject(400, "Stardust collection cannot be negative");
    }
  });

  srv.after("CREATE", "Spacefarers", (data) => {
    console.log("======================================");
    console.log("CREATE notification mail sent");
    console.log(`To: ${data.email}`);
    console.log(
      `Message: ${data.firstName} ${data.lastName} is successfully registered.`
    );
    console.log("======================================");
  });
};