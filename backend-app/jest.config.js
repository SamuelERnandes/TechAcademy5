const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} */
module.exports = {
  testEnvironment: "node",
  transform: {
    ...tsJestTransformCfg,
  },
  testMatch: [
    "**/__tests__/**/*.+(ts|js)", // pega arquivos em pastas __tests__
    "**/?(*.)+(spec|test).+(ts|js)", // pega arquivos como algo.test.ts
  ],
};
