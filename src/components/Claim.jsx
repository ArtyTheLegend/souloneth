import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Claim = () => {
  const [code, setCode] = useState("");
  const [valid, setValid] = useState(false);
  const location = useLocation();

  
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const unlock = params.get("code");
    if (unlock === "ritual1") {
      alert("🔐 Claim access unlocked by ritual1.");
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const input = params.get("code") || "";
    setCode(input);

    // Replace this with real validation logic if needed
    const acceptedCodes = ["airdrop", "alpha", "ritual1"];
    if (acceptedCodes.includes(input.toLowerCase())) {
      setValid(true);
    }
  }, [location]);

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
      <h1>🗝️ Claim Access</h1>
      {valid ? (
        <p>✅ Access granted for code: <strong>{code}</strong><br />A door has opened. You may proceed.</p>
      ) : (
        <p>❌ Invalid or expired code.<br />The vault remains sealed to you.</p>
      )}
    </div>
  );
};

export default Claim;