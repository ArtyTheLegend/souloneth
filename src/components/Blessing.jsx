import React from "react";

const blessing = {
  reflective: "🪞 You are seen deeply, and your stillness holds power.",
  playful: "🎭 Joy is its own ritual. Keep it strange.",
  melancholic: "🌫️ What you've carried was not yours alone.",
  chaotic: "🔥 The path ahead is unwritten. Burn clean.",
  default: "💀 You were heard. Even silence echoes here."
};

const Blessing = () => {
  const trait = localStorage.getItem("souloneth_last_trait") || "default";
  const message = blessing[trait] || blessing["default"];

  return (
    <div style={{
      backgroundColor: "#0e0e10",
      color: "#f5f5f5",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      padding: "2rem"
    }}>
      <h1>🔮 Your Blessing</h1>
      <p>{message}</p>
    </div>
  );
};

export default Blessing;