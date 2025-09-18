import React from "react";

export default function AdminDashboard() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 mb-4">Admin Dashboard</h2>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="p-5 bg-white rounded-2xl shadow-sm ring-1 ring-gray-100">
          <h3 className="font-semibold mb-2">Users</h3>
          <p>Manage elders and relatives (coming soon).</p>
        </div>
        <div className="p-5 bg-white rounded-2xl shadow-sm ring-1 ring-gray-100">
          <h3 className="font-semibold mb-2">Logs</h3>
          <p>View system usage and alert logs.</p>
        </div>
        <div className="p-5 bg-white rounded-2xl shadow-sm ring-1 ring-gray-100">
          <h3 className="font-semibold mb-2">Settings</h3>
          <p>System configuration (Twilio, thresholds).</p>
        </div>
      </div>
    </div>
  );
}


