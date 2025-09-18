import React, { useState } from "react";

export default function AttendanceButton() {
  const [checkedIn, setCheckedIn] = useState(false);

  const handleCheckIn = () => {
    setCheckedIn(true);
    alert("Checked in for today!"); // placeholder
    // TODO: call backend API to save attendance
  };

  return (
    <button
      onClick={handleCheckIn}
      className={`px-5 py-2 rounded text-white ${checkedIn ? "bg-green-600 opacity-80" : "bg-blue-600"}`}
    >
      {checkedIn ? "Checked In" : "Check In"}
    </button>
  );
}
