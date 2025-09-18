import React, { useState, useEffect } from "react";
import api from "../services/api";

export default function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get("/relative/alerts", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAlerts(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch alerts:", err);
      setLoading(false);
    }
  };

  const markAsRead = async (alertId) => {
    try {
      // You can implement a mark as read API endpoint later
      setAlerts(prev => prev.map(alert => 
        alert._id === alertId ? { ...alert, read: true } : alert
      ));
    } catch (err) {
      console.error("Failed to mark alert as read:", err);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 mb-4">Emergency Alerts</h2>
      
      <div className="space-y-4">
        {alerts.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">✅</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Alerts</h3>
            <p className="text-gray-600">All elders are safe and sound!</p>
          </div>
        ) : (
          alerts.map((alert) => (
            <div
              key={alert._id}
              className={`p-4 rounded-lg border-l-4 ${
                alert.read
                  ? "bg-gray-50 border-gray-300"
                  : alert.type === 'SOS'
                  ? "bg-red-50 border-red-500"
                  : "bg-yellow-50 border-yellow-500"
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {alert.type === 'SOS' ? '🚨 SOS Alert' : '⚠️ Alert'} from {alert.elder?.name}
                  </h3>
                  <p className="text-sm text-gray-600">{alert.message}</p>
                  <p className="text-sm text-gray-600">
                    Time: {new Date(alert.createdAt).toLocaleString()}
                  </p>
                  {alert.location && (
                    <p className="text-sm text-gray-600">
                      Location: {alert.location.lat}, {alert.location.lng}
                    </p>
                  )}
                </div>
                {!alert.read && (
                  <button
                    onClick={() => markAsRead(alert._id)}
                    className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                  >
                    Mark as Read
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}