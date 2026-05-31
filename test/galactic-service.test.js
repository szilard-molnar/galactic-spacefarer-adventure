const cds = require("@sap/cds");

jest.setTimeout(30000);

const admin = cds.test(__dirname + "/..");
const alice = cds.test(__dirname + "/..");
const bob = cds.test(__dirname + "/..");

admin.defaults.auth = {
    username: "admin",
    password: "admin"
};

alice.defaults.auth = {
    username: "alice",
    password: "alice"
};

bob.defaults.auth = {
    username: "bob",
    password: "bob"
};

describe("GalacticService", () => {
    it("should return spacefarers", async () => {
        const response = await admin.GET("/odata/v4/galactic/Spacefarers");

        expect(response.status).toBe(200);
        expect(response.data.value).toBeDefined();
        expect(Array.isArray(response.data.value)).toBe(true);
    });

    it("should return valid spacefarer structure", async () => {
        const response = await admin.GET("/odata/v4/galactic/Spacefarers");

        expect(response.status).toBe(200);

        const firstSpacefarer = response.data.value[0];

        expect(firstSpacefarer).toHaveProperty("ID");
        expect(firstSpacefarer).toHaveProperty("firstName");
        expect(firstSpacefarer).toHaveProperty("lastName");
        expect(firstSpacefarer).toHaveProperty("stardustCollection");
        expect(firstSpacefarer).toHaveProperty("wormholeNavigationSkill");
    });

    it("should return 404 for invalid endpoint", async () => {
        const response = await admin.GET("/odata/v4/galactic/UnknownEntity", {
            validateStatus: () => true,
        });

        expect(response.status).toBe(404);
    });

    it("should contain positive stardust collection", async () => {
        const response = await admin.GET("/odata/v4/galactic/Spacefarers");

        expect(response.status).toBe(200);

        const firstSpacefarer = response.data.value[0];

        expect(firstSpacefarer.stardustCollection).toBeGreaterThanOrEqual(0);
    });

    it("should return all seeded spacefarers for admin", async () => {
        const response = await admin.GET("/odata/v4/galactic/Spacefarers");

        expect(response.status).toBe(200);
        expect(response.data.value).toHaveLength(5);
    });

    it("should expose planets endpoint", async () => {
        const response = await admin.GET("/odata/v4/galactic/Planets");

        expect(response.status).toBe(200);
        expect(response.data.value).toBeDefined();
        expect(Array.isArray(response.data.value)).toBe(true);
    });

    it("should expose departments endpoint", async () => {
        const response = await admin.GET("/odata/v4/galactic/Departments");

        expect(response.status).toBe(200);
        expect(response.data.value).toBeDefined();
        expect(Array.isArray(response.data.value)).toBe(true);
    });

    it("should expose positions endpoint", async () => {
        const response = await admin.GET("/odata/v4/galactic/Positions");

        expect(response.status).toBe(200);
        expect(response.data.value).toBeDefined();
        expect(Array.isArray(response.data.value)).toBe(true);
    });
});