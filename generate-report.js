const reporter = require("cucumber-html-reporter");
const fs = require("fs");

// Read configuration from JSON file
const config = JSON.parse(fs.readFileSync("report-config.json", "utf-8"));

// Generate the report
reporter.generate(config);