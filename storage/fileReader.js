const fs = require("fs");
const path = require("path");
const { FILE_PATH } = require("./fileWriter");

/**
 * Read all metrics from the file
 * Returns array of metrics objects
 */
function readMetrics() {
  try {
    if (!fs.existsSync(FILE_PATH)) return [];

    const data = fs.readFileSync(FILE_PATH, "utf-8");
    const lines = data.trim().split("\n").filter(Boolean);

    return lines.map((line) => {
      try {
        return JSON.parse(line);
      } catch (err) {
        return null; // ignore invalid lines
      }
    }).filter(Boolean);
  } catch (err) {
    console.error("Failed to read metrics:", err);
    return [];
  }
}

module.exports = {
  readMetrics
};