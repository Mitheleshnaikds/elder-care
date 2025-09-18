import { useState } from "react";
import { useReminders } from "../context/RemindersContext";

export default function Medication() {
  const { reminders, addReminder, removeReminder, requestPermission } = useReminders();
  const [medicine, setMedicine] = useState("");
  const [time, setTime] = useState("");

  const onAdd = async (e) => {
    e.preventDefault();
    if ("Notification" in window) await requestPermission();
    addReminder({ medicine, time });
    setMedicine("");
    setTime("");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 mb-4">Medication Reminders</h2>
      
      <form onSubmit={onAdd} className="mb-6 bg-white p-5 rounded-2xl shadow-sm ring-1 ring-gray-100">
        <input
          type="text"
          placeholder="Medicine name"
          className="border p-2 mr-2"
          value={medicine}
          onChange={(e) => setMedicine(e.target.value)}
          required
        />
        <input
          type="time"
          className="border p-2 mr-2"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Add
        </button>
      </form>

      <ul>
        {reminders.map((r) => (
          <li key={r.id} className="p-3 mb-2 rounded-2xl ring-1 ring-gray-100 bg-white flex items-center justify-between">
            <div>
              <strong>{r.medicine}</strong> at {r.time}
            </div>
            <button type="button" onClick={() => removeReminder(r.id)} className="text-red-600 hover:underline">Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
