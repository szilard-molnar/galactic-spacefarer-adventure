const cds = require("@sap/cds");

jest.setTimeout(30000);

const { GET } = cds.test(__dirname + "/..");

describe("GalacticService", () => {
  it("should return spacefarers", async () => {
    const response = await GET("/odata/v4/galactic/Spacefarers", {
        auth: {
            username: "admin",
            password: "admin"
        }
    });

    expect(response.status).toBe(200);
    expect(response.data.value).toBeDefined();
    expect(Array.isArray(response.data.value)).toBe(true);
  });
});