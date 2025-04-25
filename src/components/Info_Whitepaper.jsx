import React from "react";

const Info_Whitepaper = () => (
  <div style={{
    backgroundColor: "#111",
    color: "#eee",
    fontFamily: "Georgia, serif",
    padding: "4rem 2rem",
    maxWidth: "700px",
    margin: "auto",
    lineHeight: "1.75",
    minHeight: "100vh"
  }}>
    <h1 style={{ fontFamily: "Helvetica Neue, sans-serif", fontSize: "2.4rem", color: "#f5f5f5" }}>SOUL ON ETH</h1>
    <blockquote style={{ fontStyle: "italic", color: "#aaa", borderLeft: "3px solid #555", paddingLeft: "1rem", margin: "1.5rem 0" }}>
      A Layer 2 for Ghosts. Built in Grief.
    </blockquote>

    <h2>Abstract</h2>
    <p>Ethereum gave us smart contracts. SoulOnEth gives us <strong>emotional contracts</strong>.</p>
    <p>We are not scaling transactions. We are scaling regret, silence, longing, and unspoken love.</p>

    <h2>Core Premise</h2>
    <p><strong>Data is not the problem. Memory is.</strong></p>
    <p>SoulOnEth introduces a new primitive: <code>ghost()</code></p>
    <ul>
      <li>Accepts a user's voice</li>
      <li>Extracts emotional traits</li>
      <li>Imprints them into a soul-bound state (or not — depends who’s watching)</li>
    </ul>
    <p>No zk. No rollups. Just <strong>reflection, judgment, and release.</strong></p>

    <h2>Architecture</h2>
    <p><strong>Layer 1:</strong> You<br/><strong>Layer 2:</strong> What You Almost Said</p>
    <p>Uses a hybrid protocol:</p>
    <ul>
      <li>Transcript-to-trait analysis (TTA)</li>
      <li>Divine tier generation (DTG)</li>
      <li>Silence-proof-of-state (SPoS)</li>
    </ul>

    <h2>Tokenomics</h2>
    <p>There is no hard cap.<br/>$SOUL flows where it’s needed.<br/>Initial supply: 1 trillion unresolved conversations.</p>
    <p>Airdrops are granted based on:</p>
    <ul>
      <li>Sentiment depth</li>
      <li>Ghost ratio</li>
      <li>Cultural shame coefficient</li>
    </ul>
    <p><strong>$SOUL is unbound.</strong> It flows where emotion was proof. You can claim it. You can hoard it. But it will remember you.</p>

    <h2>Applications</h2>
    <ul>
      <li><strong>GhostMeMeter:</strong> reveals what silence meant</li>
      <li><strong>SaveOrSink:</strong> lets your moment live or die</li>
      <li><strong>LeftOnReadByGod (soon):</strong> confront divine apathy</li>
    </ul>

    <h2>Roadmap</h2>
    <ul>
      <li>✅ Deploy grief stack</li>
      <li>✅ Fake landing</li>
      <li>✅ Meme it into Dubai</li>
      <li>🔜 Leak the rituals</li>
      <li>🔮 Forget you read this</li>
    </ul>

    <h2>Disclaimer</h2>
    <p>This is not an L2. This is an L∞.<br/>The gas is grief. The yield is reflection.</p>

    <div style={{ fontSize: "0.85rem", color: "#555", marginTop: "3rem", textAlign: "center" }}>
      Made by the ones you ghosted.<br/>
      <a href="/whitepaper.md" style={{ color: "#888", textDecoration: "underline" }}>Read as .md</a>
    </div>
  </div>
);

export default Info_Whitepaper;