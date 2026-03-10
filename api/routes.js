const express = require("express");
const router = express.Router();

/*
Temporary Health Route
Used to verify server works
*/

router.get("/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Packet monitor API running"
  });
});

module.exports = router;