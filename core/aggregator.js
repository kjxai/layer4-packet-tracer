// core/aggregator.js

/**
 * Aggregate an array of packets into metrics object
 * Metrics include:
 *  - totalPackets
 *  - tcpPackets
 *  - udpPackets
 *  - bandwidth
 *  - topPorts (object: port → count)
 *  - topIPs (object: IP → count)
 */

function aggregatePackets(packets) {
  const metrics = {
    timestamp: Date.now(),
    totalPackets: 0,
    tcpPackets: 0,
    udpPackets: 0,
    bandwidth: 0,
    topPorts: {},
    topIPs: {}
  };

  if (!packets || packets.length === 0) {
    return metrics; // return empty metrics if no packets
  }

  metrics.totalPackets = packets.length;

  for (const packet of packets) {
    // Count TCP/UDP
    if (packet.protocol === "TCP") {
      metrics.tcpPackets++;
    }
    if (packet.protocol === "UDP") {
      metrics.udpPackets++;
    }

    // Sum bandwidth
    metrics.bandwidth += packet.length;

    // Track top destination ports
    const port = packet.destPort;
    if (!metrics.topPorts[port]) {
      metrics.topPorts[port] = 0;
    }
    metrics.topPorts[port]++;

    // Track top destination IPs
    const ip = packet.destIP;
    if (!metrics.topIPs[ip]) {
      metrics.topIPs[ip] = 0;
    }
    metrics.topIPs[ip]++;
  }

  return metrics;
}

module.exports = {
  aggregatePackets
};