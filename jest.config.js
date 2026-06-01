module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+\\.ts$": ["ts-jest", {
      tsconfig: "tsconfig.json"
    }]
  },
  testMatch: [
    "**/*.test.js",
    "**/*.test.ts"
  ]
};