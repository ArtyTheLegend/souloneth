import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const FloatingSigilMenu = () => {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let user = localStorage.getItem("souloneth_user");
    if (!user) {
      user = "anon_" + Date.now();
      localStorage.setItem("souloneth_user", user);
    }
    setVisible(true);
  }, []);

  if (!visible) return null;

  return (
    <div style={{
      position: "fixed",
      bottom: "1rem",
      right: "1rem",
      zIndex: 9999
    }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          backgroundColor: "#111",
          color: "#fff",
          border: "1px solid #444",
          borderRadius: "50%",
          width: "3rem",
          height: "3rem",
          fontSize: "1.5rem",
          cursor: "pointer",
          transition: "transform 0.3s"
        }}
      >
        ☼
      </button>
      {open && (
        <div style={{
          marginTop: "1rem",
          backgroundColor: "#0e0e10",
          border: "1px solid #444",
          borderRadius: "8px",
          padding: "1rem",
          textAlign: "right"
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