import React, { useEffect, useState } from "react";

const Ritual_Ghost = () => {
  const [transcript, setTranscript] = useState("");
  const [listening, setListening] = useState(false);
  const [feedback, setFeedback] = useState("");

  const userId = localStorage.getItem("souloneth_user") || "anon_" + Date.now();
  localStorage.setItem("souloneth_user", userId);

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      alert("Voice recognition not supported in this browser.");
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onerror = (e) => {
      console.error("Recognition error:", e);
      setListening(false);
    };

    recognition.onresult = async (event) => {
      const spoken = event.results[0][0].transcript;
      setTranscript(spoken);
      setFeedback("🔎 Analyzing...");

      // Send to /api/analyzeTraits
      const analyzeRes = await fetch("/api/analyzeTraits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcript: spoken })
      });

      const { traits } = await analyzeRes.json();

      if (!traits) {
        setFeedback("Something went wrong with analysis.");
        return;
      }

      // Track each trait
      const timestamp = new Date().toISOString();
      for (const trait in traits) {
        const value = traits[trait];
        await fetch("/api/trackTrait", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id: userId, trait, value, ritual: "ghost", timestamp })
        });
      }

      // Store top trait
      const topTrait = Object.entries(traits).sort((a, b) => b[1] - a[1])[0][0];
      localStorage.setItem("souloneth_last_trait", topTrait);

      setFeedback("🧠 The ritual has heard you.");
      setTimeout(() => {
        window.location.href = "/blessing";
      }, 2000);
    };

    // Auto-start listening
    recognition.start();

    return () => recognition.stop();
  }, []);

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
      <h1>👻 Speak Now</h1>
      <p>Let the ritual hear your truth. Say whatever must be said.</p>
      {listening ? <p>🎙 Listening...</p> : <p>Stopped listening.</p>}
      {transcript && (
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
      )}
      {feedback && <p style={{ marginTop: "2rem", color: "#aaa" }}>{feedback}</p>}
    </div>
  );
};

export default Ritual_Ghost;