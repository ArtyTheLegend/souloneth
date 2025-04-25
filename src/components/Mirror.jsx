import React, { useEffect, useState } from "react";

const Mirror = () => {
  const [traits, setTraits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const id = localStorage.getItem("souloneth_user") || "demo_user";
    setUserId(id);
    fetch(`/api/getTraits?user_id=${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.traits) setTraits(data.traits);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      width: "100%",
      backgroundColor: "#0e0e10",
      color: "#f5f5f5",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      padding: "2rem"
    }}>
      <h1>🪞 The Mirror</h1>
      <p style={{ color: "#bbb", marginBottom: "2rem" }}>Reflections seen by the ritual for: <code>{userId}</code></p>
      {loading ? <p>Loading soulprint...</p> : (
        <ul style={{ listStyle: "none", padding: 0, maxWidth: "600px", width: "100%" }}>
          {traits.map(({ fields }, idx) => (
            <li key={idx} style={{ marginBottom: "1rem", borderBottom: "1px solid #333", paddingBottom: "0.75rem" }}>
              <div><strong>Trait:</strong> {fields.trait}</div>
              <div><strong>Value:</strong> {parseFloat(fields.value).toFixed(2)}</div>
              <div><strong>Ritual:</strong> {fields.ritual}</div>
              <div style={{ fontSize: "0.85rem", color: "#777" }}>{fields.timestamp}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Mirror;