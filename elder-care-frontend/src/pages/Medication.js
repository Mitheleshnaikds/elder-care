import { useState } from "react";
import { useReminders } from "../context/RemindersContext";

export default function Medication() {
  const { reminders, addReminder, removeReminder, markAsTaken, requestPermission } = useReminders();
  const [medicine, setMedicine] = useState("");
  const [time, setTime] = useState("");
  const [dosage, setDosage] = useState("");
  const [instructions, setInstructions] = useState("");

  const onAdd = async (e) => {
    e.preventDefault();
    if ("Notification" in window) await requestPermission();
    addReminder({ medicine, time, dosage, instructions });
    setMedicine("");
    setTime("");
    setDosage("");
    setInstructions("");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 mb-4">Medication Reminders</h2>
      
      <form onSubmit={onAdd} className="mb-6 bg-white p-5 rounded-2xl shadow-sm ring-1 ring-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="Medicine name"
            className="border p-2 rounded"
            value={medicine}
            onChange={(e) => setMedicine(e.target.value)}
            required
          />
          <input
            type="time"
            className="border p-2 rounded"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Dosage (e.g., 10mg)"
            className="border p-2 rounded"
            value={dosage}
            onChange={(e) => setDosage(e.target.value)}
          />
          <input
            type="text"
            placeholder="Instructions (e.g., with food)"
            className="border p-2 rounded"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
          />
        </div>
        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Add Medication
        </button>
      </form>

      <div className="space-y-3">
        {reminders.map((r) => (
          <div key={r.id} className="p-4 rounded-2xl ring-1 ring-gray-100 bg-white">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold text-lg">{r.medicine}</h3>
                <p className="text-gray-600">Time: {r.time}</p>
                {r.dosage && <p className="text-sm text-gray-500">Dosage: {r.dosage}</p>}
                {r.instructions && <p className="text-sm text-gray-500">Instructions: {r.instructions}</p>}
                {r.takenToday && r.takenBy && (
                  <p className="text-sm text-blue-600 mt-1">
                    ✅ Taken by {r.takenBy} at {new Date(r.takenAt).toLocaleString()}
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                {!r.takenToday && (
                  <button
                    onClick={() => markAsTaken(r.id)}
                    className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                  >
                    Mark Taken
                  </button>
                )}
                <button
                  onClick={() => removeReminder(r.id)}
                  className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
            <div className={`text-sm px-2 py-1 rounded ${
              r.takenToday ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            }`}>
              Status: {r.takenToday ? 'Taken' : 'Pending'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
