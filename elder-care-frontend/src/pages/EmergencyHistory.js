import React, { useMemo, useState } from "react";
import { useSOS } from "../context/SOSContext";

export default function EmergencyHistory() {
  const { sosEvents } = useSOS();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return sosEvents.filter((e) =>
      [e.message, e.time].some((t) => String(t).toLowerCase().includes(q))
    );
  }, [sosEvents, query]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Emergency History</h2>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search history"
        className="border p-2 mb-4 w-full max-w-md"
      />
      <div className="bg-white rounded shadow">
        {filtered.length === 0 && (
          <div className="p-4 text-gray-600">No alerts found.</div>
        )}
        <ul>
          {filtered.map((e) => (
            <li key={e.id} className="p-4 border-b last:border-b-0">
              <div className="font-semibold">{e.message}</div>
              <div className="text-sm text-gray-600">{e.time}</div>
              {e.location && (
                <div className="text-xs text-gray-500 mt-1">
                  lat: {e.location.lat}, lng: {e.location.lng}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}


