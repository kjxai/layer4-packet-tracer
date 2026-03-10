const { aggregatePackets } = require("./aggregator");
const packetCapture = require("./packetCapture");
const { writeMetrics } = require("../storage/fileWriter");

const INTERVAL = 10000; // 10-second aggregation interval

function startScheduler() {

  console.log("Metrics scheduler started (10s interval)");

  setInterval(() => {

    // Read packets from the buffer
    const packets = packetCapture.getPacketBuffer();

    // Aggregate metrics
    const metrics = aggregatePackets(packets);

    // Clear the packet buffer after aggregation
    packetCapture.clearPacketBuffer();

    // Write aggregated metrics to file for REST API consumption
    writeMetrics(metrics);

    // Optional console log for debugging
    console.log("Metrics window computed:", {
      totalPackets: metrics.totalPackets,
      tcpPackets: metrics.tcpPackets,
      udpPackets: metrics.udpPackets,
      bandwidth: metrics.bandwidth
    });

  }, INTERVAL);

}

module.exports = {
  startScheduler
};