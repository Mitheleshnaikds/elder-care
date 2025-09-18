import React, { useState } from "react";

export default function Health() {
  const [entries, setEntries] = useState([]);
  const [bp, setBp] = useState("");
  const [sugar, setSugar] = useState("");
  const [hr, setHr] = useState("");

  const addEntry = (e) => {
    e.preventDefault();
    const newEntry = {
      id: Date.now(),
      bp,
      sugar,
      hr,
      time: new Date().toLocaleString(),
    };
    setEntries([newEntry, ...entries]);
    setBp("");
    setSugar("");
    setHr("");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 mb-4">Health Monitoring</h2>
      <form onSubmit={addEntry} className="bg-white p-5 rounded-2xl shadow-sm ring-1 ring-gray-100 mb-4 grid gap-3 md:grid-cols-4">
        <input
          className="border p-2"
          placeholder="BP (e.g., 120/80)"
          value={bp}
          onChange={(e) => setBp(e.target.value)}
          required
        />
        <input
          className="border p-2"
          placeholder="Sugar (mg/dL)"
          type="number"
          value={sugar}
          onChange={(e) => setSugar(e.target.value)}
          required
        />
        <input
          className="border p-2"
          placeholder="Heart Rate (bpm)"
          type="number"
          value={hr}
          onChange={(e) => setHr(e.target.value)}
          required
        />
        <button className="bg-blue-600 text-white rounded px-4 py-2">Add</button>
      </form>

      <div className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-100">
        <ul>
          {entries.map((en) => (
            <li key={en.id} className="p-4 border-b last:border-b-0 grid md:grid-cols-4 gap-2">
              <div><span className="font-semibold">BP:</span> {en.bp}</div>
              <div><span className="font-semibold">Sugar:</span> {en.sugar}</div>
              <div><span className="font-semibold">Heart Rate:</span> {en.hr}</div>
              <div className="text-gray-600">{en.time}</div>
            </li>
          ))}
          {entries.length === 0 && (
            <li className="p-4 text-gray-600">No entries yet.</li>
          )}
        </ul>
      </div>
    </div>
  );
}


