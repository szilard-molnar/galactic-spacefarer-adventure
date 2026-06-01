const { request } = require("./httpClient");

describe("httpClient", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should return response when backend call succeeds", async () => {
    const backendResponse = {
      ID: "11111111-1111-1111-1111-111111111111",
      firstName: "Nova",
      lastName: "Stark"
    };

    jest.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: async () => backendResponse
    });

    const result = await request(
      "/odata/v4/galactic/Spacefarers('11111111-1111-1111-1111-111111111111')"
    );

    expect(fetch).toHaveBeenCalledWith(
      "/odata/v4/galactic/Spacefarers('11111111-1111-1111-1111-111111111111')",
      {
        headers: {
          Accept: "application/json"
        }
      }
    );

    expect(result).toEqual(backendResponse);
    expect(result.firstName).toBe("Nova");
  });
});