import React, { useState } from "react";
import SinkVerdictCard from "./SinkVerdictCard";

const SaveOrSinkDrop = () => {
  const [transcript, setTranscript] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!transcript.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/saveorsink-reflection", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: "test_user", transcript })
      });
      const data = await res.json();
      setResult(data);
    } catch (e) {
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6">Save or Sink</h1>
      <p className="text-sm text-gray-600 text-center mb-4">
        Speak a memory, thought, or confession into the ritual. It will either be saved... or let go.
      </p>
      {!result ? (
        <>
          <textarea
            rows={4}
            className="w-full p-3 border rounded mb-4"
            placeholder="Say it out loud... or type what you'd say"
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
          />
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-black text-white py-2 px-6 rounded hover:bg-gray-800 transition w-full"
          >
            {loading ? "Judging..." : "Submit to Ritual"}
          </button>
        </>
      ) : (
        <SinkVerdictCard
          verdict={result.context.verdict}
          output={result.context.output}
          traits={result.traits}
        />
      )}
    </div>
  );
};

export default SaveOrSinkDrop;