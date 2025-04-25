import React, { useEffect, useState } from "react";

const getSignal = (value) => {
  if (value >= 0.75) return "✪ strong";
  if (value >= 0.45) return "✦ steady";
  return "✧ faint";
};

const Mirror = () => {
  const [traits, setTraits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState("");
  const [traitSummary, setTraitSummary] = useState([]);

  useEffect(() => {
    const id = localStorage.getItem("souloneth_user") || "anon_" + Date.now();
    setUserId(id);

    fetch(`/api/getTraits?user_id=${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.traits && Array.isArray(data.traits)) {
          const records = data.traits.map(t => t.fields);
          setTraits(records);

          // Group and summarize traits
          const grouped = {};
          records.forEach(({ trait, value }) => {
            if (!grouped[trait]) grouped[trait] = [];
            grouped[trait].push(parseFloat(value || 0));
          });

          const summary = Object.entries(grouped).map(([trait, values]) => {
            const avg = values.reduce((a, b) => a + b, 0) / values.length;
            return { trait, count: values.length, avg };
          }).sort((a, b) => b.avg - a.avg);

          setTraitSummary(summary);
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
      ) : traitSummary.length > 0 ? (
        <div style={{ maxWidth: "600px", textAlign: "left" }}>
          {traitSummary.map(({ trait, avg, count }, i) => (
            <div key={i} style={{
              marginBottom: "1.5rem",
              borderBottom: "1px solid #333",
              paddingBottom: "1rem"
            }}>
              <div><strong>{trait.charAt(0).toUpperCase() + trait.slice(1)}</strong> ({count} echoes)</div>
              <div style={{ marginTop: "0.5rem" }}>Signal: {getSignal(avg)}</div>
            </div>
          ))}
        </div>
      ) : (
        <p>No reflections recorded yet. Speak, and the mirror will answer.</p>
      )}
    </div>
  );
};

export default Mirror;