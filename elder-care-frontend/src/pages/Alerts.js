import React from "react";
import { useSOS } from "../context/SOSContext";

export default function Alerts() {
  const { sosEvents, markAsRead } = useSOS();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 mb-4">Alerts</h2>
      {sosEvents.length === 0 && <p className="text-gray-600">No alerts yet.</p>}
      <ul>
        {sosEvents.map((alert) => (
          <li
            key={alert.id}
            className={`mb-2 p-4 rounded-2xl ring-1 ${alert.read ? "bg-gray-50 ring-gray-100" : "bg-red-50 ring-red-100"}`}
          >
            <strong className="block">{alert.message}</strong>
            <div className="text-xs text-gray-600">{alert.time}</div>
            {!alert.read && (
              <button
                onClick={() => markAsRead(alert.id)}
                className="mt-2 text-sm text-blue-700 hover:underline"
              >
                Mark as read
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

