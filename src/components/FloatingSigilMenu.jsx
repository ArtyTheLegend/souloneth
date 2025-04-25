import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const FloatingSigilMenu = () => {
  const [visible, setVisible] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("souloneth_user");
    if (!user) {
      localStorage.setItem("souloneth_user", "anon_" + Date.now());
    }
    const timer = setTimeout(() => {
      setVisible(true);
    }, 5000); // Delay reveal by 5 seconds

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "1rem",
        right: "1rem",
        zIndex: 9999,
        textAlign: "right"
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        style={{
          backgroundColor: "#111",
          color: "#fff",
          border: "1px solid #444",
          borderRadius: "50%",
          width: "3rem",
          height: "3rem",
          fontSize: "1.5rem",
          cursor: "pointer",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        ☼
      </div>
      {hover && (
        <div style={{
          marginTop: "0.5rem",
          backgroundColor: "#0e0e10",
          border: "1px solid #444",
          borderRadius: "8px",
          padding: "1rem",
          textAlign: "right",
          transition: "opacity 0.3s ease-in-out"
        }}>
          <div><Link to="/mirror" style={link}>🪞 Mirror</Link></div>
          <div><Link to="/summon" style={link}>🧿 Summon</Link></div>
          <div><Link to="/oath" style={link}>🩶 Oath</Link></div>
          <div><Link to="/hall" style={link}>🏛️ Hall</Link></div>
          <div><Link to="/vault" style={link}>🔐 Vault</Link></div>
        </div>
      )}
    </div>
  );
};

const link = {
  color: "#ccc",
  textDecoration: "none",
  display: "block",
  margin: "0.5rem 0",
  fontSize: "1rem"
};

export default FloatingSigilMenu;