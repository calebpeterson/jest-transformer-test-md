const { defaults } = require("jest-config");

module.exports = {
  moduleFileExtensions: [...defaults.moduleFileExtensions, "ts", "tsx", "md"],
  testMatch: [...defaults.testMatch, "**/*.test.md", "**/README.md"],
  transform: {
    ...defaults.transform,
    "^.+\\.test.md$": "./src/jest-md-transform.js",
    "^.+\\README.md$": "./src/jest-md-transform.js",
  },
  verbose: true,
};
