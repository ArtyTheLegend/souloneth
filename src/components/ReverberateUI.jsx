import React, { useState } from "react";

const ReverberateUI = () => {
  const [original, setOriginal] = useState("");
  const [tone, setTone] = useState("gentle_echo");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const submitReverberate = async () => {
    setLoading(true);
    const res = await fetch("/reverberate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: "demo_user", original_transcript: original, tone })
    });
    const data = await res.json();
    setResponse(data);
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto p-6 text-white bg-black">
      <h2 className="text-xl font-semibold mb-4">🔁 Reverberate a Reflection</h2>
      <textarea
        className="w-full p-2 bg-gray-900 border border-gray-700 mb-4"
        placeholder="Paste your past ritual statement..."
        value={original}
        onChange={(e) => setOriginal(e.target.value)}
        rows={4}
      />
      <select value={tone} onChange={(e) => setTone(e.target.value)} className="mb-4 w-full bg-gray-800 text-white p-2">
        <option value="gentle_echo">🌫️ Gentle Echo</option>
        <option value="divine_truth">🧠 Divine Truth</option>
        <option value="apocalyptic_indifference">🔥 Apocalyptic Indifference</option>
      </select>
      <button onClick={submitReverberate} className="bg-purple-600 hover:bg-purple-800 px-4 py-2 rounded text-white w-full">
        Reverberate
      </button>
      {response && (
        <div className="mt-6 bg-gray-900 border border-purple-700 p-4 rounded">
          <div className="text-sm text-gray-500 mb-2">Tone: {response.tone}</div>
          <div className="text-lg italic">"{response.response}"</div>
        </div>
      )}
    </div>
  );
};

export default ReverberateUI;