"use client";

import { useState } from "react";

export default function SpokenInput() {
  const [transcript, setTranscript] = useState("");
  const [listening, setListening] = useState(false);

  let recognition: any;

  if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
    const SpeechRecognition = (window as any).webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "de-DE";

    recognition.onresult = (event: any) => {
      const result = event.results[0][0].transcript;
      setTranscript(result);
      setListening(false);
    };

    recognition.onerror = () => {
      setListening(false);
    };
  }

  const startListening = () => {
    if (recognition) {
      recognition.start();
      setListening(true);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-12 p-6 border rounded-2xl shadow-md font-serif">
      <h2 className="text-2xl mb-4">Say something for your Ikigai</h2>
      <button
        onClick={startListening}
        disabled={listening}
        className="px-4 py-2 bg-black text-white rounded-xl mb-4"
      >
        {listening ? "Listening..." : "Start Recording"}
      </button>
      <div className="mt-4 text-xl italic min-h-[3rem]">
        {transcript || "Nothing captured yet."}
      </div>
    </div>
  );
}
