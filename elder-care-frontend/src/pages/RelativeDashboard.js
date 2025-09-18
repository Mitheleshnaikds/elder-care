import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function RelativeDashboard() {
  const [elders, setElders] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [selectedElder, setSelectedElder] = useState(null);
  const [elderHealth, setElderHealth] = useState(null);
  const [elderMedications, setElderMedications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchElderData();
  }, []);

  const fetchElderData = async () => {
    try {
      const token = localStorage.getItem("token");
      const [eldersRes, alertsRes] = await Promise.all([
        api.get("/relative/elders", { headers: { Authorization: `Bearer ${token}` } }),
        api.get("/relative/alerts", { headers: { Authorization: `Bearer ${token}` } })
      ]);
      
      setElders(eldersRes.data.elders);
      setAlerts(alertsRes.data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch elder data:", err);
      setLoading(false);
    }
  };

  const fetchElderDetails = async (elderId) => {
    try {
      const token = localStorage.getItem("token");
      const [healthRes, medsRes] = await Promise.all([
        api.get(`/relative/elder/${elderId}/health`, { headers: { Authorization: `Bearer ${token}` } }),
        api.get(`/relative/elder/${elderId}/medications`, { headers: { Authorization: `Bearer ${token}` } })
      ]);
      
      setElderHealth(healthRes.data);
      setElderMedications(medsRes.data);
    } catch (err) {
      console.error("Failed to fetch elder details:", err);
    }
  };

  const markMedicationTaken = async (medicationId) => {
    if (!selectedElder) return;
    
    try {
      const token = localStorage.getItem("token");
      await api.put(`/relative/elder/${selectedElder._id}/medications/${medicationId}/taken`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Update local state
      setElderMedications(prev => prev.map(med => 
        med._id === medicationId 
          ? { ...med, takenToday: true, takenAt: new Date(), takenBy: "relative" }
          : med
      ));
    } catch (err) {
      console.error("Failed to mark medication as taken:", err);
    }
  };

  const handleElderSelect = (elder) => {
    setSelectedElder(elder);
    fetchElderDetails(elder._id);
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 mb-6">Relative Dashboard</h2>
      
      {/* Linked Elders */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Linked Elders</h3>
        {elders.length === 0 ? (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
            <p className="text-yellow-800">No elders linked yet. Ask your elder to link you using your email.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {elders.map((elder) => (
              <div 
                key={elder._id}
                className={`bg-white p-4 rounded-lg shadow-sm ring-1 ring-gray-100 cursor-pointer transition-all ${
                  selectedElder?._id === elder._id ? 'ring-blue-500 bg-blue-50' : 'hover:ring-blue-300'
                }`}
                onClick={() => handleElderSelect(elder)}
              >
                <h4 className="font-semibold text-gray-900">{elder.name}</h4>
                <p className="text-sm text-gray-600">Age: {elder.age}</p>
                <p className="text-sm text-gray-600">{elder.phone}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Alerts */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Recent Alerts</h3>
        {alerts.length === 0 ? (
          <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded">
            <p className="text-green-800">No recent alerts. All elders are safe!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {alerts.slice(0, 5).map((alert, index) => (
              <div key={index} className={`p-4 rounded-lg border-l-4 ${
                alert.type === 'SOS' ? 'bg-red-50 border-red-500' : 'bg-yellow-50 border-yellow-500'
              }`}>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-gray-900">
                      {alert.type === 'SOS' ? '🚨 SOS Alert' : '⚠️ Alert'} from {alert.elder?.name}
                    </p>
                    <p className="text-sm text-gray-600">{alert.message}</p>
                    {alert.location && (
                      <p className="text-xs text-gray-500">
                        Location: {alert.location.lat}, {alert.location.lng}
                      </p>
                    )}
                  </div>
                  <span className="text-xs text-gray-500">
                    {new Date(alert.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Selected Elder Details */}
      {selectedElder && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Health Status */}
          <div className="bg-white p-6 rounded-2xl shadow-sm ring-1 ring-gray-100">
            <h3 className="text-lg font-semibold mb-4">Health Status - {selectedElder.name}</h3>
            {elderHealth ? (
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Blood Pressure:</span>
                  <span className="font-semibold">{elderHealth.bloodPressure}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Heart Rate:</span>
                  <span className="font-semibold">{elderHealth.heartRate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Blood Sugar:</span>
                  <span className="font-semibold">{elderHealth.bloodSugar}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className={`font-semibold ${
                    elderHealth.status === 'Normal' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {elderHealth.status}
                  </span>
                </div>
                <p className="text-xs text-gray-500">
                  Last updated: {new Date(elderHealth.lastUpdated).toLocaleString()}
                </p>
              </div>
            ) : (
              <p className="text-gray-500">Loading health data...</p>
            )}
          </div>

          {/* Medication Status */}
          <div className="bg-white p-6 rounded-2xl shadow-sm ring-1 ring-gray-100">
            <h3 className="text-lg font-semibold mb-4">Medication Status - {selectedElder.name}</h3>
            {elderMedications.length > 0 ? (
              <div className="space-y-3">
                {elderMedications.map((med) => (
                  <div key={med._id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <div className="flex-1">
                      <p className="font-medium">{med.name}</p>
                      <p className="text-sm text-gray-600">{med.time}</p>
                      {med.dosage && <p className="text-xs text-gray-500">Dosage: {med.dosage}</p>}
                      {med.takenToday && med.takenBy && (
                        <p className="text-xs text-blue-600">
                          Taken by {med.takenBy} at {new Date(med.takenAt).toLocaleString()}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded text-xs ${
                        med.takenToday ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {med.takenToday ? 'Taken' : 'Pending'}
                      </span>
                      {!med.takenToday && (
                        <button
                          onClick={() => markMedicationTaken(med._id)}
                          className="px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700"
                        >
                          Mark Taken
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No medication data available</p>
            )}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button 
            onClick={() => navigate('/alerts')}
            className="p-4 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors"
          >
            <div className="text-2xl mb-2">🚨</div>
            <div className="font-medium">View All Alerts</div>
          </button>
          <button 
            onClick={() => navigate('/health')}
            className="p-4 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <div className="text-2xl mb-2">❤️</div>
            <div className="font-medium">Health Monitor</div>
          </button>
          <button 
            onClick={() => navigate('/history')}
            className="p-4 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors"
          >
            <div className="text-2xl mb-2">📋</div>
            <div className="font-medium">Emergency History</div>
          </button>
          <button 
            onClick={() => navigate('/geofence')}
            className="p-4 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors"
          >
            <div className="text-2xl mb-2">📍</div>
            <div className="font-medium">Location Tracking</div>
          </button>
        </div>
      </div>
    </div>
  );
}