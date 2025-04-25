import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ThankYou = () => {
  const [counter, setCounter] = useState(4132);
  const [showNext, setShowNext] = useState(false);
  const [refLink, setRefLink] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setShowNext(true), 3000);
    const id = localStorage.getItem("souloneth_user") || "anon";
    setRefLink(`https://souloneth.com/?ref=${id}`);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#0e0e10",
      color: "#f5f5f5",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      padding: "2rem"
    }}>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🌀 You’ve Been Marked</h1>
      <p style={{ fontSize: "1.1rem", marginBottom: "2rem", maxWidth: "500px" }}>
        The ritual remembers you.<br />Your presence is now encoded in the waiting.
      </p>
      <p style={{ fontSize: "0.9rem", color: "#888" }}>
        {counter.toLocaleString()} souls have already entered.
      </p>
      <div style={{ marginTop: "3rem", fontSize: "0.85rem", color: "#777", maxWidth: "90%", wordWrap: "break-word" }}>
        Share your ghost code: <br />
        <code style={{
          backgroundColor: "#111",
          padding: "0.3rem 0.6rem",
          borderRadius: "4px",
          display: "inline-block"
        }}>
          {refLink}
        </code>
      </div>
      <div style={{ marginTop: "4rem", color: "#666", fontStyle: "italic" }}>
        “The veil is thinner now. Watch what answers.”
      </div>
      {showNext && (
        <div style={{ marginTop: "3rem", fontSize: "1rem" }}>
          <p>✨ The ritual continues.</p>
          <p><Link to="/ghost" style={{ color: "#f5f5f5" }}>→ Begin your reflection</Link></p>
          <p><Link to="/mirror" style={{ color: "#f5f5f5" }}>→ View your imprint</Link></p>
          <p><Link to="/summon" style={{ color: "#f5f5f5" }}>→ Spread the veil</Link></p>
        </div>
      )}
    </div>
  );
};

export default ThankYou;