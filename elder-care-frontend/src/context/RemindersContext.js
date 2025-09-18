import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";

const RemindersContext = createContext();

export const useReminders = () => useContext(RemindersContext);

function parseHHMMToDate(hhmm) {
  const [h, m] = hhmm.split(":").map((n) => parseInt(n, 10));
  const d = new Date();
  d.setHours(h, m, 0, 0);
  return d;
}

export const RemindersProvider = ({ children }) => {
  const [reminders, setReminders] = useState([]);
  const [tick, setTick] = useState(0); // forces time-based recompute
  const lastNotifiedRef = useRef({}); // id -> yyyy-mm-dd

  const addReminder = ({ medicine, time }) => {
    const newReminder = { id: Date.now(), medicine, time };
    setReminders((prev) => [newReminder, ...prev]);
    return newReminder;
  };

  const removeReminder = (id) => {
    setReminders((prev) => prev.filter((r) => r.id !== id));
    const map = lastNotifiedRef.current;
    delete map[id];
  };

  const requestPermission = async () => {
    if (!("Notification" in window)) return { ok: false };
    if (Notification.permission === "granted") return { ok: true };
    const res = await Notification.requestPermission();
    return { ok: res === "granted" };
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!reminders.length) return;
      const now = new Date();
      const hh = String(now.getHours()).padStart(2, "0");
      const mm = String(now.getMinutes()).padStart(2, "0");
      const key = `${hh}:${mm}`;
      const today = now.toISOString().slice(0, 10);
      reminders.forEach((r) => {
        if (r.time === key) {
          const last = lastNotifiedRef.current[r.id];
          if (last === today) return;
          if ("Notification" in window && Notification.permission === "granted") {
            try {
              new Notification("Medication Reminder", {
                body: `${r.medicine} at ${r.time}`,
              });
            } catch (_) {}
          }
          lastNotifiedRef.current[r.id] = today;
        }
      });
      setTick((t) => t + 1); // also bump tick for UI recompute
    }, 30000); // check every 30s
    return () => clearInterval(interval);
  }, [reminders]);

  // Next upcoming reminder (for display)
  const nextReminder = useMemo(() => {
    if (!reminders.length) return null;
    const now = new Date();
    const upcoming = reminders
      .map((r) => ({ r, d: parseHHMMToDate(r.time) }))
      .filter(({ d }) => d.getTime() >= now.getTime())
      .sort((a, b) => a.d - b.d);
    return upcoming.length ? upcoming[0].r : null;
  }, [reminders, tick]);

  return (
    <RemindersContext.Provider
      value={{ reminders, addReminder, removeReminder, requestPermission, nextReminder }}
    >
      {children}
    </RemindersContext.Provider>
  );
};


