import React, { useEffect, useState } from "react";

const FloatingSigilMenu = () => {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      let user = localStorage.getItem("souloneth_user");
      if (!user) {
        user = "anon_" + Date.now();
        localStorage.setItem("souloneth_user", user);
      }

      const delayTimer = setTimeout(() => {
        setVisible(true);
      }, 5000);

      return () => clearTimeout(delayTimer);
    } catch (err) {
      console.error("FloatingSigilMenu error:", err);
    }
  }, []);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "1.5rem",
        right: "1.5rem",
        zIndex: 9999
      }}
    >
      <div
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
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        ☼
      </div>
      {open && (
        <div
          style={{
            marginTop: "0.5rem",
            backgroundColor: "#0e0e10",
            border: "1px solid #444",
            borderRadius: "8px",
            padding: "1rem",
            textAlign: "right",
            minWidth: "150px",
            boxShadow: "0 0 10px rgba(255, 255, 255, 0.1)"
          }}
        >
          <div><a href="/mirror" style={link}>🪞 Mirror</a></div>
          <div><a href="/summon" style={link}>🧿 Summon</a></div>
          <div><a href="/oath" style={link}>🩶 Oath</a></div>
          <div><a href="/hall" style={link}>🏛️ Hall</a></div>
          <div><a href="/vault" style={link}>🔐 Vault</a></div>
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