import React, { useState } from "react";

const Oath = () => {
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/oath", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        oath: text,
        user_id: localStorage.getItem("souloneth_user") || "anon_" + Date.now(),
        timestamp: new Date().toISOString()
      })
    });

    if (response.ok) setSubmitted(true);
  };

  return (
    <div style={{
      backgroundColor: "#0e0e10",
      color: "#f5f5f5",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
      textAlign: "center"
    }}>
      {submitted ? (
        <>
          <h1>🩸 Your Oath Has Been Sealed</h1>
          <p>The ritual remembers.</p>
        </>
      ) : (
        <>
          <h1>🩶 Leave Your Oath</h1>
          <p>Write what you believe. What you've seen. What you'll carry.</p>
          <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
            <textarea
              rows="6"
              cols="50"
              required
              value={text}
              onChange={(e) => setText(e.target.value)}
              style={{
                backgroundColor: "#111",
                color: "#f5f5f5",
                border: "1px solid #444",
                padding: "1rem",
                borderRadius: "6px",
                width: "100%",
                maxWidth: "500px"
              }}
            />
            <br />
            <button type="submit" style={{
              marginTop: "1rem",
              padding: "0.75rem 1.5rem",
              backgroundColor: "#fff",
              color: "#0e0e10",
              border: "none",
              borderRadius: "6px"
            }}>
              Seal the Oath
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default Oath;