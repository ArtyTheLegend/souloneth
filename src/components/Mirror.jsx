import React, { useEffect, useState } from "react";

const Mirror = () => {
  const [traits, setTraits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const id = localStorage.getItem("souloneth_user") || "anon_" + Date.now();
    setUserId(id);

    fetch(`/api/getTraits?user_id=${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.traits && Array.isArray(data.traits)) {
          setTraits(data.traits.map(t => t.fields));
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching traits:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#0e0e10",
      color: "#f5f5f5",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      padding: "2rem"
    }}>
      <h1>🪞 The Mirror</h1>
      <p style={{ color: "#bbb", marginBottom: "2rem" }}>
        Reflections seen by the ritual for: <code>{userId}</code>
      </p>
      {loading ? (
        <p>Loading your soulprint...</p>
      ) : traits.length > 0 ? (
        <ul style={{ listStyle: "none", padding: 0, maxWidth: "600px" }}>
          {traits.map((trait, index) => (
            <li key={index} style={{
              marginBottom: "1.5rem",
              borderBottom: "1px solid #333",
              paddingBottom: "1rem"
            }}>
              <div><strong>Trait:</strong> {trait.trait}</div>
              <div><strong>Value:</strong> {parseFloat(trait.value || 0).toFixed(2)}</div>
              <div><strong>Ritual:</strong> {trait.ritual}</div>
              <div style={{ fontSize: "0.8rem", color: "#777" }}>{trait.timestamp}</div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reflections recorded yet. Speak, and the mirror will answer.</p>
      )}
    </div>
  );
};

export default Mirror;