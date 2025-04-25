import React, { useEffect, useRef, useState } from "react";

const prompts = [
  "What’s something you’ve been holding onto too long?",
  "What’s the most honest thing you never said?",
  "If someone could hear one thing from you, what would it be?",
  "What would you confess if you could disappear after?"
];

const Ritual_Ghost = () => {
  const [transcript, setTranscript] = useState("");
  const [listening, setListening] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [prompt, setPrompt] = useState("");
  const recognizedRef = useRef(false);

  const userId = localStorage.getItem("souloneth_user") || "anon_" + Date.now();
  localStorage.setItem("souloneth_user", userId);

  useEffect(() => {
    // iOS or unsupported → redirect to /ghost/record
    const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent);
    const hasSpeech = "webkitSpeechRecognition" in window || "SpeechRecognition" in window;
    if (isIOS || !hasSpeech) {
      window.location.href = "/ghost/record";
    }

    setPrompt(prompts[Math.floor(Math.random() * prompts.length)]);
  }, []);

  const beginListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      setListening(true);
      recognizedRef.current = false;
      setFeedback("🎙 Listening...");
    };

    recognition.onend = () => {
      setListening(false);
      setTimeout(() => {
        if (!recognizedRef.current && !transcript) {
          setFeedback("⚠️ No audio detected. Try again.");
        }
      }, 300);
    };

    recognition.onerror = (e) => {
      console.error("Recognition error:", e);
      setListening(false);
      setFeedback("⚠️ Microphone error occurred. Try again.");
    };

    recognition.onresult = (event) => {
      const spoken = event.results[0][0].transcript;
      setTranscript(spoken);
      recognizedRef.current = true;
      setFeedback("📝 Transcript captured.");
    };

    recognition.start();
  };

  const submitReflection = async () => {
    setFeedback("🔎 Analyzing...");

    const analyzeRes = await fetch("/api/analyzeTraits", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ transcript })
    });

    const { traits } = await analyzeRes.json();
    if (!traits) {
      setFeedback("❌ Something went wrong with analysis.");
      return;
    }

    const timestamp = new Date().toISOString();
    for (const trait in traits) {
      const value = traits[trait];
      await fetch("/api/trackTrait", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, trait, value, ritual: "ghost", timestamp })
      });
    }

    const topTrait = Object.entries(traits).sort((a, b) => b[1] - a[1])[0][0];
    localStorage.setItem("souloneth_last_trait", topTrait);

    setFeedback("🧠 The ritual has heard you. Redirecting...");
    setTimeout(() => {
      window.location.href = "/blessing";
    }, 2500);
  };

  return (
    <div style={{
      minHeight: "100vh",
      width: "100%",
      backgroundColor: "#0e0e10",
      color: "#f5f5f5",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      padding: "2rem"
    }}>
      <h1>👻 Speak to the Ritual</h1>
      <p style={{ fontSize: "1.1rem", marginBottom: "2rem", maxWidth: "600px" }}>{prompt}</p>
      {!transcript ? (
        <button onClick={beginListening} style={{
          padding: "0.75rem 1.5rem",
          fontSize: "1rem",
          border: "none",
          backgroundColor: "#ffffff",
          color: "#0e0e10",
          borderRadius: "6px",
          cursor: "pointer"
        }}>
          🎙 Begin Speaking
        </button>
      ) : (
        <>
          <div style={{
            backgroundColor: "#111",
            marginTop: "2rem",
            padding: "1rem",
            borderRadius: "8px",
            maxWidth: "500px"
          }}>
            <p><strong>You said:</strong></p>
            <p style={{ fontStyle: "italic" }}>{transcript}</p>
          </div>
          <button onClick={submitReflection} style={{
            marginTop: "2rem",
            padding: "0.75rem 1.5rem",
            fontSize: "1rem",
            border: "none",
            backgroundColor: "#ffffff",
            color: "#0e0e10",
            borderRadius: "6px",
            cursor: "pointer"
          }}>
            Submit to Ritual
          </button>
        </>
      )}
      {feedback && <p style={{ marginTop: "2rem", color: "#aaa" }}>{feedback}</p>}
    </div>
  );
};

export default Ritual_Ghost;