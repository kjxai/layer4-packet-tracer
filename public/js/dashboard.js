window.onload = () => {
  // Chart.js contexts
  const packetCtx = document.getElementById("packetChart").getContext("2d");
  const bandwidthCtx = document.getElementById("bandwidthChart").getContext("2d");

  // Data arrays
  let packetData = [];
  let bandwidthData = [];
  let labels = [];

  // Packet Flow Chart
  const packetChart = new Chart(packetCtx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [{
        label: "Total Packets",
        data: packetData,
        backgroundColor: "rgba(79, 70, 229, 0.2)",
        borderColor: "rgba(79, 70, 229, 1)",
        borderWidth: 2,
        fill: true,
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      scales: { y: { beginAtZero: true } }
    }
  });

  // Bandwidth Chart
  const bandwidthChartObj = new Chart(bandwidthCtx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [{
        label: "Bandwidth (Bytes)",
        data: bandwidthData,
        backgroundColor: "rgba(220, 38, 38, 0.2)",
        borderColor: "rgba(220, 38, 38, 1)",
        borderWidth: 2,
        fill: true,
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      scales: { y: { beginAtZero: true } }
    }
  });

  // Fetch metrics and update dashboard
  async function fetchMetrics() {
    try {
      const res = await fetch("/metrics/latest");
      const data = await res.json();
      if (!data.totalPackets) return;

      // Update cards
      document.getElementById("totalPackets").innerText = data.totalPackets;
      document.getElementById("tcpPackets").innerText = data.tcpPackets;
      document.getElementById("udpPackets").innerText = data.udpPackets;
      document.getElementById("bandwidth").innerText = data.bandwidth;

      // Update Top Ports
      const topPortsDiv = document.getElementById("topPorts");
      topPortsDiv.innerHTML = "";
      Object.entries(data.topPorts)
        .sort((a,b) => b[1]-a[1])
        .forEach(([port,count]) => {
          const p = document.createElement("div");
          p.innerText = `Port ${port}: ${count}`;
          topPortsDiv.appendChild(p);
        });

      // Update Top IPs
      const topIPsDiv = document.getElementById("topIPs");
      topIPsDiv.innerHTML = "";
      Object.entries(data.topIPs)
        .sort((a,b) => b[1]-a[1])
        .forEach(([ip,count]) => {
          const p = document.createElement("div");
          p.innerText = `${ip}: ${count}`;
          topIPsDiv.appendChild(p);
        });

      // Update charts
      const timestamp = new Date(data.timestamp * 1000).toLocaleTimeString();
      labels.push(timestamp);
      packetData.push(data.totalPackets);
      bandwidthData.push(data.bandwidth);

      if (labels.length > 10) {
        labels.shift();
        packetData.shift();
        bandwidthData.shift();
      }

      packetChart.update();
      bandwidthChartObj.update();

    } catch (err) {
      console.error("Error fetching metrics:", err);
    }
  }

  // Initial fetch and set interval
  fetchMetrics();
  setInterval(fetchMetrics, 10000);
};