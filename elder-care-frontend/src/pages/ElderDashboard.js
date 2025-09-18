import React, { useState } from "react";
import SOSButton from "../components/SOSButton";
import { useSOS } from "../context/SOSContext";
import VoiceSOSButton from "../components/VoiceSOSButton";
import AttendanceButton from "../components/AttendanceButton";
import { useReminders } from "../context/RemindersContext";
import api from "../services/api";

export default function ElderDashboard() {
  const [sosSent, setSosSent] = useState(false);
  const [relativeEmail, setRelativeEmail] = useState("");
  const [linkStatus, setLinkStatus] = useState("");
  const { sendSOS, isSending } = useSOS();
  const { nextReminder, reminders, markAsTaken, removeReminder } = useReminders();

  const handleSOS = async () => {
    setSosSent(true);
    const elderLocation = { lat: 12.9716, lng: 77.5946 };
    const res = await sendSOS(elderLocation);
    if (!res?.ok) {
      setSosSent(false);
    }
  };

  const linkRelative = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      console.log("Token:", token ? "Present" : "Missing");
      
      if (!token) {
        setLinkStatus("No authentication token found. Please login again.");
        return;
      }
      
      await api.post("/elder/link-relative", { relativeEmail }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setLinkStatus("Relative linked successfully!");
      setRelativeEmail("");
    } catch (err) {
      console.error("Link error:", err.response?.data);
      setLinkStatus("Failed to link relative: " + (err.response?.data?.msg || err.message));
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 mb-4">Elder Dashboard</h2>
      
      {nextReminder ? (
        <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded mb-3">
          <div className="font-semibold">Upcoming Medication</div>
          <div>{nextReminder.medicine} at {nextReminder.time}</div>
        </div>
      ) : (
        <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded mb-3">
          <div className="text-gray-700">No medication reminders for the rest of today.</div>
        </div>
      )}
      
      <SOSButton onClick={handleSOS} sent={sosSent || isSending} />
      <VoiceSOSButton />
      
      <div className="mt-5 bg-white p-4 rounded-2xl shadow-sm ring-1 ring-gray-100 inline-block">
        <h3 className="text-lg mb-2">Daily Attendance</h3>
        <AttendanceButton />
      </div>

      <div className="mt-5 bg-white p-4 rounded-2xl shadow-sm ring-1 ring-gray-100">
        <h3 className="text-lg mb-2">Link Relative</h3>
        <form onSubmit={linkRelative} className="flex gap-2">
          <input
            type="email"
            placeholder="Relative's email"
            value={relativeEmail}
            onChange={(e) => setRelativeEmail(e.target.value)}
            className="border p-2 rounded flex-1"
            required
          />
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
            Link
          </button>
        </form>
        {linkStatus && <p className="mt-2 text-sm">{linkStatus}</p>}
      </div>

      {/* Medication Management */}
      <div className="mt-5 bg-white p-4 rounded-2xl shadow-sm ring-1 ring-gray-100">
        <h3 className="text-lg font-semibold mb-4">Today's Medications</h3>
        {reminders.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No medications scheduled for today</p>
        ) : (
          <div className="space-y-3">
            {reminders.map((medication) => (
              <div key={medication.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-gray-900">{medication.medicine}</h4>
                    <span className="text-sm text-gray-600">at {medication.time}</span>
                  </div>
                  {medication.dosage && (
                    <p className="text-sm text-gray-500">Dosage: {medication.dosage}</p>
                  )}
                  {medication.instructions && (
                    <p className="text-sm text-gray-500">Instructions: {medication.instructions}</p>
                  )}
                  {medication.takenToday && medication.takenBy && (
                    <p className="text-sm text-blue-600 mt-1">
                      ✅ Taken by {medication.takenBy} at {new Date(medication.takenAt).toLocaleString()}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded text-xs ${
                    medication.takenToday ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {medication.takenToday ? 'Taken' : 'Pending'}
                  </span>
                  {!medication.takenToday && (
                    <button
                      onClick={() => markAsTaken(medication.id)}
                      className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                    >
                      Mark Taken
                    </button>
                  )}
                  <button
                    onClick={() => removeReminder(medication.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="mt-4 text-center">
          <a 
            href="/medication" 
            className="text-blue-600 hover:text-blue-800 text-sm underline"
          >
            Manage All Medications →
          </a>
        </div>
      </div>
    </div>
  );
}
