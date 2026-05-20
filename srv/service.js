module.exports = (srv) => {
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
  });

  srv.after("CREATE", "Spacefarers", (data) => {
    console.log("======================================");
    console.log("🚀 Cosmic notification email sent");
    console.log(`To: ${data.email}`);
    console.log(
      `Message: Congratulations ${data.firstName} ${data.lastName}, your galactic adventure has begun!`
    );
    console.log("======================================");
  });
};