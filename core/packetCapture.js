const { spawn } = require("child_process");
const { parsePacket } = require("./packetParser");

let packetBuffer = [];
let streamBuffer = "";

const MAX_BUFFER_SIZE = 50000;

/**
 * Starts capturing packets using tcpdump
 */
function startCapture() {

  // Spawn tcpdump process
  const tcpdump = spawn("tcpdump", [
    "-i",
    "any",    // capture all interfaces
    "-nn",    // numeric IPs and ports
    "-l",     // line-buffered
    "-q",     // less verbose
    "tcp", "or", "udp" // capture TCP or UDP only
  ]);

  tcpdump.stdout.on("data", (chunk) => {

    // Append incoming data to stream buffer
    streamBuffer += chunk.toString();

    // Split buffer into lines
    const lines = streamBuffer.split("\n");

    // Last incomplete line remains in buffer
    streamBuffer = lines.pop();

    // Process each line
    for (const line of lines) {

      const packet = parsePacket(line);
      if (!packet) continue;

      // Push packet into memory buffer
      packetBuffer.push(packet);

      // Maintain max buffer size
      if (packetBuffer.length > MAX_BUFFER_SIZE) {
        packetBuffer.shift(); // remove oldest
      }
    }
  });

  tcpdump.stderr.on("data", (data) => {
    console.error("tcpdump error:", data.toString());
  });

  tcpdump.on("close", (code) => {
    console.log("tcpdump process exited:", code);
  });

  console.log("Packet capture started...");
}

/**
 * Returns current packet buffer
 */
function getPacketBuffer() {
  return packetBuffer;
}

/**
 * Clears the memory packet buffer
 */
function clearPacketBuffer() {
  packetBuffer = [];
}

module.exports = {
  startCapture,
  getPacketBuffer,
  clearPacketBuffer
};