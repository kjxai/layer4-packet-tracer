// core/packetParser.js

// Regex to extract source IP, source port, destination IP, and destination port
const PACKET_REGEX =
  /(\d+\.\d+\.\d+\.\d+)\.(\d+)\s>\s(\d+\.\d+\.\d+\.\d+)\.(\d+)/;

// Regex to extract packet length
const LENGTH_REGEX = /length\s(\d+)/;

/**
 * parsePacket(line)
 * Converts a tcpdump output line into a normalized packet object
 * Returns null if the line cannot be parsed
 */
function parsePacket(line) {
  try {
    // Skip lines that do not contain "IP"
    if (!line.includes("IP")) return null;

    const match = line.match(PACKET_REGEX);
    if (!match) return null;

    const srcIP = match[1];
    const srcPort = parseInt(match[2]);
    const destIP = match[3];
    const destPort = parseInt(match[4]);

    const lengthMatch = line.match(LENGTH_REGEX);
    const length = lengthMatch ? parseInt(lengthMatch[1]) : 0;

    // Determine protocol based on line content
    const protocol = line.includes("UDP") ? "UDP" : "TCP";

    const packet = {
      timestamp: Date.now(),
      srcIP,
      srcPort,
      destIP,
      destPort,
      protocol,
      length
    };

    return packet;

  } catch (err) {
    // Fault-tolerant: ignore parsing errors
    return null;
  }
}

// Export function for use in packetCapture
module.exports = {
  parsePacket
};