sap.ui.define(["./httpClient"], function (___httpClient) {
  "use strict";

  const request = ___httpClient["request"];
  async function getSpacefarers() {
    const response = await request("/odata/v4/galactic/Spacefarers");
    return response.value;
  }
  var __exports = {
    __esModule: true
  };
  __exports.getSpacefarers = getSpacefarers;
  return __exports;
});
//# sourceMappingURL=spacefarerService-dbg.js.map
