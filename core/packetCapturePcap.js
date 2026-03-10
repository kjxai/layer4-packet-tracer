// core/packetCapture.js
const pcap = require("pcap");

// Circular packet buffer
let packetBuffer = [];

/**
 * Start capturing TCP/UDP packets
 */
function startCapture() {
  // Use the first available network interface
  const devices = pcap.findalldevs();
  if (!devices || devices.length === 0) {
    console.error("No network devices found for capture.");
    return;
  }

  const iface = devices[0].name; // pick first interface
  console.log("Capturing packets on interface:", iface);

  // Capture only TCP and UDP packets
  const pcapSession = pcap.createSession(iface, "tcp or udp");

  pcapSession.on("packet", (rawPacket) => {
    try {
      const packet = pcap.decode.packet(rawPacket);

      // Ethernet → IP → TCP/UDP
      const ipLayer = packet.payload.payload;
      if (!ipLayer) return;

      const protocol = ipLayer.protocol_name || (ipLayer.constructor.name === "TCP" ? "TCP" : "UDP");

      const srcIP = ipLayer.saddr ? ipLayer.saddr.addr.join(".") : "0.0.0.0";
      const destIP = ipLayer.daddr ? ipLayer.daddr.addr.join(".") : "0.0.0.0";

      let srcPort = 0, destPort = 0, length = 0;

      if (protocol === "TCP" || protocol === "UDP") {
        srcPort = ipLayer.sport;
        destPort = ipLayer.dport;
        length = ipLayer.data ? ipLayer.data.length : 0;
      }

      const parsedPacket = {
        protocol,
        srcIP,
        destIP,
        srcPort,
        destPort,
        length
      };

      // Add to buffer
      packetBuffer.push(parsedPacket);

    } catch (err) {
      console.error("Packet parse error:", err);
    }
  });

  console.log("Packet capture started...");
}

/**
 * Get current packet buffer
 */
function getPacketBuffer() {
  return [...packetBuffer];
}

/**
 * Clear the packet buffer
 */
function clearPacketBuffer() {
  packetBuffer = [];
}

module.exports = {
  startCapture,
  getPacketBuffer,
  clearPacketBuffer
};