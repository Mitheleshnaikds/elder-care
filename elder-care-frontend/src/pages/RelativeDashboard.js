import { useState } from "react";

export default function RelativeDashboard() {
  // Mock data – later will come from backend
  const [alerts, setAlerts] = useState([
    { id: 1, type: "SOS", message: "Elder pressed SOS 🚨", time: "10:30 AM" },
    { id: 2, type: "Medication", message: "Blood pressure pill missed", time: "8:00 AM" },
    { id: 3, type: "GeoFence", message: "Elder moved outside safe zone", time: "Yesterday" },
  ]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 mb-4">Relative Dashboard</h2>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-100 p-5 md:col-span-2">
          <h3 className="text-xl mb-3 text-blue-700">Recent Alerts</h3>
          <ul>
            {alerts.map((alert) => (
              <li
                key={alert.id}
                className={`p-3 mb-2 rounded-2xl ring-1 ${
                  alert.type === "SOS"
                    ? "bg-red-50 ring-red-100"
                    : alert.type === "Medication"
                    ? "bg-yellow-50 ring-yellow-100"
                    : "bg-blue-50 ring-blue-100"
                }`}
              >
                <p className="font-semibold">{alert.type}</p>
                <p>{alert.message}</p>
                <small className="text-gray-600">{alert.time}</small>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-100 p-5">
          <h3 className="text-xl mb-3">Quick Links</h3>
          <ul className="list-disc pl-6 text-blue-700">
            <li><a href="/alerts" className="hover:underline">All Alerts</a></li>
            <li><a href="/history" className="hover:underline">Emergency History</a></li>
            <li><a href="/health" className="hover:underline">Health Monitoring</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
