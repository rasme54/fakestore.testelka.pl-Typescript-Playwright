import { defineConfig } from "@cucumber/cucumber";

export default defineConfig({
  default: {
    require: ["./StepDefinition/**/*.steps.ts"], // Path to step definitions
    format: ["pretty"],
    paths: ["./Features/*.feature"], // Path to feature files
    publishQuiet: true,
  },
});
