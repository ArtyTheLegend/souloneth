import React, { useEffect, useState } from "react";

const ThankYou = () => {
  const [counter, setCounter] = useState(4132); // fake entry count for now

  useEffect(() => {
    const timer = setTimeout(() => {
      setCounter(counter + Math.floor(Math.random() * 3));
    }, 2000);
    return () => clearTimeout(timer);
  }, [counter]);

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
      <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🌀 You’ve Been Marked</h1>
      <p style={{ fontSize: "1.1rem", marginBottom: "2rem", maxWidth: "500px" }}>
        The ritual remembers you.<br />Your presence is now encoded in the waiting.
      </p>
      <p style={{ fontSize: "0.9rem", color: "#888" }}>
        {counter.toLocaleString()} souls have already entered.
      </p>
      <div style={{ marginTop: "3rem", fontSize: "0.85rem", color: "#777" }}>
        Share your ghost code: <br />
        <code style={{ backgroundColor: "#111", padding: "0.3rem 0.6rem", borderRadius: "4px" }}>
          https://souloneth.com/?ref=you
        </code>
      </div>
    </div>
  );
};

export default ThankYou;