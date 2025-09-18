import React, { useState } from "react";
import { MapContainer, TileLayer, Circle, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Red icon for SOS marker
const redIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Component to allow clicking on map to move safe zone center
function LocationMarker({ setCenter }) {
  useMapEvents({
    click(e) {
      setCenter(e.latlng);
    },
  });
  return null;
}

export default function GeoFence() {
  const [center, setCenter] = useState({ lat: 12.9716, lng: 77.5946 }); // Safe zone center
  const [radius, setRadius] = useState(500); // Safe zone radius
  const [showSOS, setShowSOS] = useState(false); // Show marker only after SOS
  const [elderPos, setElderPos] = useState({ lat: 12.9716, lng: 77.5946 }); // Elder location

  // Simulate elder pressing SOS
  const handleSOS = () => {
    setShowSOS(true);
    // For demo, elder position can be set here
    setElderPos({ lat: 12.9716, lng: 77.5946 }); 
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 mb-3">Geo-Fencing Alerts</h2>

      <MapContainer center={center} zoom={14} style={{ height: "400px", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Circle
          center={center}
          radius={radius}
          pathOptions={{ fillColor: "blue", color: "blue", fillOpacity: 0.2 }}
        />

        {/* Show marker only when SOS is pressed */}
        {showSOS && <Marker position={elderPos} icon={redIcon} />}
        <LocationMarker setCenter={setCenter} />
      </MapContainer>

      <div className="mt-3 bg-white p-4 rounded-2xl shadow-sm ring-1 ring-gray-100 inline-block">
        <label className="mr-2">Safe Zone Radius (m):</label>
        <input
          type="number"
          value={radius}
          onChange={(e) => setRadius(Number(e.target.value))}
          className="border p-2 rounded w-40"
        />
      </div>

      {/* SOS Button */}
      <button onClick={handleSOS} className="mt-3 px-4 py-2 bg-red-600 text-white rounded-2xl shadow-sm">
        Send SOS
      </button>
    </div>
  );
}
