import React from "react";

const referrers = [
  { referrer: "soulcaster.eth", count: 19 },
  { referrer: "echo_lord", count: 12 },
  { referrer: "ritual_forker", count: 9 }
];

const Hall = () => (
  <div style={{
    backgroundColor: "#0e0e10",
    color: "#f5f5f5",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem",
    textAlign: "center"
  }}>
    <h1>🏛️ The Hall of Echoes</h1>
    <p>These are the ones who brought others to the veil.</p>
    <ul style={{ listStyle: "none", padding: 0 }}>
      {referrers.map((r, i) => (
        <li key={i} style={{ marginTop: "1rem", fontSize: "1.25rem" }}>
          {i + 1}. {r.referrer} — {r.count} souls
        </li>
      ))}
    </ul>
  </div>
);

export default Hall;