import React, { useState } from "react";
import SOSButton from "../components/SOSButton";
import { useSOS } from "../context/SOSContext";

export default function ElderDashboard() {
  const [sosSent, setSosSent] = useState(false);
  const { sendSOS } = useSOS();

  const handleSOS = () => {
    setSosSent(true);
    // Example location (replace with real GPS coordinates)
    const elderLocation = { lat: 12.9716, lng: 77.5946 };
    sendSOS(elderLocation);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Elder Dashboard</h2>
      <SOSButton onClick={handleSOS} sent={sosSent} />
      {/* Medication section */}
    </div>
  );
}
