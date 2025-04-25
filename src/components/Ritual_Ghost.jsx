// This should be in Ritual_Ghost.jsx
const userId = localStorage.getItem("souloneth_user") || "anon_" + Date.now();
localStorage.setItem("souloneth_user", userId);

// then for each trait:
await fetch("/api/trackTrait", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ user_id: userId, trait, value, ritual: "ghost", timestamp })
});