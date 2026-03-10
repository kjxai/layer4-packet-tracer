# Layer-4 Packet Monitor Dashboard

Welcome to the **Packet Monitor Dashboard**, a **real-time network packet monitoring tool** that tracks system-level TCP/UDP traffic at the **Layer-4 (Transport Layer)**. This dashboard is designed for **network engineers, system administrators, and tech enthusiasts** who want live insights into their system’s packet flow, bandwidth, and top network endpoints.

---

## Features

- **Real-time Packet Monitoring**:  
  Captures TCP/UDP packets every **10 seconds** using system-level APIs or `tcpdump`.

- **Interactive Dashboard**:  
  Built with **Tailwind CSS**, **EJS**, and **Chart.js** for a modern, responsive look.

- **Live Metrics Cards**:  
  Displays:
  - Total packets
  - TCP packets
  - UDP packets
  - Bandwidth usage

- **Top Ports & IPs**:  
  See which ports and IPs are most active.

- **Live Charts**:  
  Trend graphs for Total Packets and Bandwidth over the last 10 intervals.

- **REST API Access**:  
  Get metrics for integration with other tools or dashboards.

---

## Tech Stack

- **Backend:** Node.js, Express.js  
- **Frontend:** EJS templates + Tailwind CSS + Chart.js  
- **Packet Capture:** tcpdump / system-level APIs  
- **Data Storage:** Local files for metrics  
- **Update Interval:** Every 10 seconds  

---

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd packet-monitor-dashboard

2. Install dependencies
npm install
3. Initialize Tailwind CSS
npx tailwindcss init -p

This creates tailwind.config.js and postcss.config.js.

4. Start the Server

Note: Packet capture may require root privileges.

sudo node server.js

The backend server will start capturing packets and serve the dashboard at http://localhost:3000/
.

Usage
Dashboard

Open in your browser:

http://localhost:3000/

What you will see:

Metric Cards

Total Packets

TCP Packets

UDP Packets

Bandwidth

Top Ports & Top IPs

Sorted lists of active ports and IP addresses

Live Charts

Line charts showing Total Packets and Bandwidth over time

Automatically updated every 10 seconds

REST API
1. Latest Metrics
GET /metrics/latest

Response Example:

{
  "timestamp": 1710000000,
  "totalPackets": 421,
  "tcpPackets": 310,
  "udpPackets": 111,
  "bandwidth": 84012,
  "topPorts": { "443": 50, "80": 30 },
  "topIPs": { "172.217.164.78": 50, "192.168.1.5": 30 }
}
2. Historical Metrics
GET /metrics/history

Returns stored metric history from log files

Useful for external analytics or long-term monitoring

Screenshots




Replace with actual screenshots from your running dashboard.

File Structure
packet-monitor-dashboard/
├─ server.js             # Express server entry point
├─ scheduler.js          # Background packet capture scheduler
├─ core/
│  └─ packetCollector.js # System-level packet capture logic
├─ storage/
│  └─ metrics.json       # JSON file storing aggregated metrics
├─ routes/
│  └─ metrics.js         # REST API endpoints
├─ views/
│  └─ dashboard.ejs      # Dashboard frontend template
├─ public/
│  ├─ dashboard.js       # JS for charts & live updates
│  └─ styles.css         # Tailwind CSS output
└─ tailwind.config.js    # Tailwind config
Security & Permissions

Packet capture may require root privileges.

Dashboard is not protected — avoid exposing it publicly without authentication.

Ensure local network monitoring complies with organizational policies.

Customization

Capture Interval: Edit scheduler.js for different intervals.

Dashboard Styling: Modify Tailwind classes in views/dashboard.ejs or public/styles.css.

Charts & Metrics: Extend public/dashboard.js to add more datasets or chart types.

Future Enhancements

WebSocket streaming for sub-second updates

TCP vs UDP stacked charts

Pie charts for top ports and IPs

Alerts for abnormal traffic or bandwidth spikes

User authentication for secure access

Dark/light theme toggle

Quick Tips

Ensure tcpdump or equivalent permissions exist on your system

Dashboard works best in modern browsers like Chrome, Edge, or Firefox

Refresh interval is 10 seconds by default — adjust if needed

License

This project is licensed under the MIT License.

Enjoy monitoring your network like a pro!


---

✅ This **single file README.md** includes:

- Full user instructions  
- Installation & setup  
- Dashboard & REST API usage  
- Screenshots placeholders  
- Folder structure  
- Security, customization, future enhancements  

---

If you want, I can **also create a visual “Quick Start” section with animated GIF placeholders** to make it **even more user-friendly and appealing**.  

Do you want me to add that next?