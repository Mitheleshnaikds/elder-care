import React, { useEffect, useRef, useState } from "react";
import { useSOS } from "../context/SOSContext";

export default function VoiceSOSButton() {
  const recognitionRef = useRef(null);
  const [listening, setListening] = useState(false);
  const { sendSOS, isSending } = useSOS();

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.onresult = async (event) => {
      const transcript = Array.from(event.results)
        .map((r) => r[0].transcript)
        .join(" ")
        .toLowerCase();
      if (transcript.includes("help") || transcript.includes("sos")) {
        await sendSOS({ lat: 12.9716, lng: 77.5946 });
      }
    };
    recognition.onend = () => {
      if (listening) recognition.start();
    };
    recognitionRef.current = recognition;
  }, [listening, sendSOS]);

  const toggleListening = () => {
    const recognition = recognitionRef.current;
    if (!recognition) {
      alert("Voice recognition not supported on this browser.");
      return;
    }
    if (listening) {
      recognition.stop();
      setListening(false);
    } else {
      recognition.start();
      setListening(true);
    }
  };

  return (
    <button
      onClick={toggleListening}
      className={`px-4 py-2 rounded ${listening ? "bg-purple-700" : "bg-purple-600"} text-white ml-3 disabled:opacity-60`}
      disabled={isSending}
      title="Toggle voice-activated SOS"
    >
      {listening ? "🎙️ Listening..." : "🎙️ Voice SOS"}
    </button>
  );
}


