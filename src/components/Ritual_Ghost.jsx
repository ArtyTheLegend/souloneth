import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Ritual_Ghost = () => {
  const [unlocked, setUnlocked] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const ref = params.get("ref") || localStorage.getItem("souloneth_ref");
    if (ref === "airdrop") {
      setUnlocked(true);
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
      {unlocked ? (
        <>
          <h1>👻 GhostMe Ritual Unlocked</h1>
          <p>Your silence is now seen.<br />Begin your confession soon...</p>
        </>
      ) : (
        <>
          <h1>🪞 You are not yet seen.</h1>
          <p>Only those who were invited by the ritual may proceed.</p>
        </>
      )}
    </div>
  );
};

export default Ritual_Ghost;