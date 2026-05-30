sap.ui.define([], function () {
  "use strict";

  async function request(url, options) {
    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
        ...(options?.headers ?? {})
      },
      ...options
    });
    if (!response.ok) {
      let message = response.statusText;
      try {
        const errorBody = await response.json();
        message = errorBody.error?.message ?? message;
      } catch {
        // ignore non-json error response
      }
      throw new Error(`Request failed: ${response.status} ${message}`);
    }
    return response.json();
  }
  var __exports = {
    __esModule: true
  };
  __exports.request = request;
  return __exports;
});
//# sourceMappingURL=httpClient-dbg.js.map
