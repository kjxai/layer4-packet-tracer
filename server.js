// server.js

const express = require("express");
const app = express();
const port = 3000;

// --- Core modules ---
const packetCapture = require("./core/packetCapture");
const scheduler = require("./core/scheduler");

// --- Start packet capture ---
packetCapture.startCapture();

// --- Start 10-second scheduler ---
scheduler.startScheduler();

// --- REST API routes ---
const metricsRoutes = require("./routes/metrics");
app.use("/metrics", metricsRoutes);

// --- Serve static files (Tailwind CSS, JS, etc.) ---
app.use(express.static("public"));

// --- Set view engine for dashboard ---
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

// --- Dashboard route ---
app.get("/", (req, res) => {
  res.render("dashboard");
});

// --- Start Express server ---
app.listen(port, () => {
  console.log(`Packet Monitor running on port ${port}`);
});