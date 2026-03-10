const express = require("express");
const router = express.Router();
const { readMetrics } = require("../storage/fileReader");

/**
 * GET /metrics/latest
 * Returns the latest metrics object
 */
router.get("/latest", (req, res) => {
  try {
    const metrics = readMetrics();
    if (metrics.length === 0) return res.json({ message: "No metrics yet" });
    const latest = metrics[metrics.length - 1];
    return res.json(latest);
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch latest metrics" });
  }
});

/**
 * GET /metrics/history
 * Returns all metrics objects
 */
router.get("/history", (req, res) => {
  try {
    const metrics = readMetrics();
    return res.json(metrics);
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch metrics history" });
  }
});

module.exports = router;