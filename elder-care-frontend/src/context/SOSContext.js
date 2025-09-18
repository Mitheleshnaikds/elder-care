import React, { createContext, useState, useContext } from "react";
import api from "../services/api";
import { useAuth } from "./AuthContext";

const SOSContext = createContext();

export const useSOS = () => useContext(SOSContext); // <-- hook

export const SOSProvider = ({ children }) => {
  const [sosEvents, setSosEvents] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const { user } = useAuth();

  const sendSOS = async (elderLocation) => {
    setIsSending(true);
    try {
      // optimistic UI update
      const newEvent = {
        id: Date.now(),
        message: "Elder pressed SOS!",
        time: new Date().toLocaleString(),
        location: elderLocation,
        read: false,
      };
      setSosEvents((prev) => [newEvent, ...prev]);

      const headers = {};
      if (user && user.token) headers["Authorization"] = `Bearer ${user.token}`;
      await api.post("/sos", { location: elderLocation }, { headers });
      return { ok: true };
    } catch (err) {
      // revert optimistic add on error
      setSosEvents((prev) => prev.slice(1));
      alert("Failed to send SOS. Please try again.");
      return { ok: false, error: err };
    } finally {
      setIsSending(false);
    }
  };

  const markAsRead = (id) => {
    setSosEvents((prev) => prev.map((evt) => (evt.id === id ? { ...evt, read: true } : evt)));
  };

  return (
    <SOSContext.Provider value={{ sosEvents, sendSOS, markAsRead, isSending }}>
      {children}
    </SOSContext.Provider>
  );
};
