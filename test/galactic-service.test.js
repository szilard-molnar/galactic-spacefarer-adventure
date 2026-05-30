process.env.NODE_ENV = "test";
process.env.CDS_ENV = "test";

const cds = require("@sap/cds");

jest.setTimeout(30000);

const { GET, defaults } = cds.test(__dirname + "/..");

defaults.auth = {
  username: "admin",
  password: "admin"
};

describe("GalacticService", () => {
  it("should return spacefarers", async () => {
    const response = await GET("/odata/v4/galactic/Spacefarers");

    expect(response.status).toBe(200);
    expect(response.data.value).toBeDefined();
    expect(Array.isArray(response.data.value)).toBe(true);
  });

  it("should return valid spacefarer structure", async () => {
    const response = await GET("/odata/v4/galactic/Spacefarers");

    expect(response.status).toBe(200);

    const firstSpacefarer = response.data.value[0];

    expect(firstSpacefarer).toHaveProperty("ID");
    expect(firstSpacefarer).toHaveProperty("firstName");
    expect(firstSpacefarer).toHaveProperty("lastName");
    expect(firstSpacefarer).toHaveProperty("stardustCollection");
    expect(firstSpacefarer).toHaveProperty("wormholeNavigationSkill");
  });

  it("should return 404 for invalid endpoint", async () => {
    const response = await GET("/odata/v4/galactic/UnknownEntity", {
      validateStatus: () => true
    });

    expect(response.status).toBe(404);
  });
});