const fs = require("fs");
const path = require("path");

const FILE_PATH = path.join(__dirname, "metrics.log");

// Ensure the file exists
if (!fs.existsSync(FILE_PATH)) {
  fs.writeFileSync(FILE_PATH, "");
}

/**
 * Append a metrics object to file in JSONL format
 * Each line is a JSON object
 */
function writeMetrics(metrics) {
  try {
    const line = JSON.stringify(metrics) + "\n";
    fs.appendFile(FILE_PATH, line, (err) => {
      if (err) console.error("Failed to write metrics:", err);
    });
  } catch (err) {
    console.error("Error in writeMetrics:", err);
  }
}

module.exports = {
  writeMetrics,
  FILE_PATH
};