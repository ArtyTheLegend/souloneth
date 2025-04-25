import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const RitualGate = () => {
  const [email, setEmail] = useState("");
  const [refSource, setRefSource] = useState("organic");
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const ref = params.get("ref") || localStorage.getItem("souloneth_ref") || "organic";
    localStorage.setItem("souloneth_ref", ref);
    setRefSource(ref);
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const timestamp = new Date().toISOString();

    const payload = {
      records: [
        {
          fields: {
            email: email,
            source: refSource,
            timestamp: timestamp
          }
        }
      ]
    };

    try {
      const response = await fetch("https://api.airtable.com/v0/app2NkPC5K0JngQtj/Leads", {
        method: "POST",
        headers: {
          "Authorization": "Bearer patHJ9e40Krzpml28.b244f9a9eb29f4e3e6df6c3ee79ba5891f1ea71c06befc1b0fa5e81e72079ad6",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error("Failed to submit to Airtable");

      alert("🌀 You’ve entered the waiting.");
      setEmail("");
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Try again in a moment.");
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
      <h1>SOUL ON ETH</h1>
      <p>You are not too late. You are just early.<br />Whisper your memory. The ritual awaits.</p>

      <form onSubmit={handleSubmit} style={{ marginTop: "1.5rem" }}>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          style={{
            padding: "0.75rem",
            borderRadius: "6px",
            width: "250px",
            marginRight: "0.5rem",
            fontSize: "1rem",
            border: "1px solid #888",
            backgroundColor: "#111",
            color: "#f5f5f5"
          }}
        />
        <button type="submit" style={{
          padding: "0.75rem 1.5rem",
          fontSize: "1rem",
          border: "none",
          backgroundColor: "#ffffff",
          color: "#0e0e10",
          borderRadius: "6px",
          cursor: "pointer"
        }}>
          Enter the Waiting
        </button>
      </form>
    </div>
  );
};

export default RitualGate;