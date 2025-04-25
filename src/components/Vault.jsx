import React from "react";

const Vault = () => (
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
    <h1>🔐 The Vault</h1>
    <p>This is where fragments of the protocol are stored.</p>
    <p>Only those with the key may retrieve what was sealed here.</p>
    <code style={{
      backgroundColor: "#111",
      padding: "0.5rem 1rem",
      borderRadius: "6px",
      marginTop: "2rem"
    }}>
      /claim?code=xxxxx
    </code>
  </div>
);

export default Vault;