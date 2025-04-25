import React, { useState, useRef } from "react";

const GhostRecord = () => {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState("");
  const mediaRecorderRef = useRef(null);
  const [blob, setBlob] = useState(null);
  const [feedback, setFeedback] = useState("");

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      const audioChunks = [];

      mediaRecorder.ondataavailable = event => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);
        setBlob(audioBlob);
      };

      mediaRecorder.start();
      setRecording(true);
      setFeedback("🎙 Recording in progress...");
    } catch (err) {
      console.error("Mic access error:", err);
      setFeedback("⚠️ Microphone access error. Please check permissions.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
      setFeedback("🔍 Recording complete. Ready to upload.");
    }
  };

  const uploadRecording = async () => {
    if (!blob) return;

    setFeedback("🔎 Uploading for ritual analysis...");

    const formData = new FormData();
    formData.append("file", blob);

    const res = await fetch("https://souloneth-ritual-server-production.up.railway.app/uploadRitual", {
      method: "POST",
      body: formData
    });

    const result = await res.json();
    if (result.success) {
      setFeedback("🧠 The ritual has heard you. Redirecting...");
      setTimeout(() => {
        window.location.href = "/blessing";
      }, 2500);
    } else {
      setFeedback("❌ Upload failed. Try again.");
    }
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
      <h1>👻 Record Your Voice</h1>
      <p>Desktop rituals require speaking. Mobile rituals require recording.</p>

      {!recording ? (
        <button onClick={startRecording} style={buttonStyle}>
          🎙 Start Ritual Recording
        </button>
      ) : (
        <button onClick={stopRecording} style={buttonStyle}>
          🛑 Stop Recording
        </button>
      )}

      {audioURL && (
        <>
          <audio controls src={audioURL} style={{ marginTop: "2rem" }} />
          <button onClick={uploadRecording} style={{ ...buttonStyle, marginTop: "1rem" }}>
            📤 Upload for Ritual
          </button>
        </>
      )}

      {feedback && <p style={{ marginTop: "2rem", color: "#aaa" }}>{feedback}</p>}
    </div>
  );
};

const buttonStyle = {
  padding: "0.75rem 1.5rem",
  fontSize: "1rem",
  border: "none",
  backgroundColor: "#ffffff",
  color: "#0e0e10",
  borderRadius: "6px",
  cursor: "pointer",
  marginTop: "1rem"
};

export default GhostRecord;