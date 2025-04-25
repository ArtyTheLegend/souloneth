import React, { useEffect, useState } from "react";

const Summon = () => {
  const [referrerId, setReferrerId] = useState("");
  const [souls, setSouls] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ref = localStorage.getItem("souloneth_user") || "anon_" + Date.now();
    localStorage.setItem("souloneth_user", ref);
    setReferrerId(ref);

    fetch(`https://api.airtable.com/v0/app2NkPC5K0JngQtj/referral_logs?filterByFormula=%7Breferrer_id%7D='${ref}'`, {
      method: "GET",
      headers: {
        Authorization: "Bearer patxca1e9Y6FD5fq8.039f40e0b1e66be32518c56f37c87ad5c10bfe7c7e8a5f7167143530fb3cd09d",
        "Content-Type": "application/json"
      }
    })
    .then(res => res.json())
    .then(data => {
      setSouls(data.records.length);
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
      <h1>🧿 Your Ritual Link</h1>
      <p>Share this link to summon others:</p>
      <code style={{
        backgroundColor: "#111",
        padding: "0.5rem 1rem",
        borderRadius: "6px",
        marginTop: "1rem"
      }}>
        https://souloneth.com/?ref={referrerId}
      </code>
      <div style={{ marginTop: "2rem", fontSize: "1.2rem" }}>
        {loading ? "Counting souls..." : `${souls} souls summoned.`}
      </div>
    </div>
  );
};

export default Summon;