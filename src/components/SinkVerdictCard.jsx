import React from "react";

const SinkVerdictCard = ({ verdict, output, traits }) => {
  const isSaved = verdict === "save";
  const emoji = isSaved ? "🕊️" : "🌊";
  const verdictText = isSaved ? "This moment shall be saved." : "Let it sink beneath the tide.";

  return (
    <div className="bg-white p-6 rounded-xl shadow text-center border border-gray-200">
      <div className="text-3xl mb-2">{emoji}</div>
      <h2 className="text-xl font-semibold mb-2">{verdictText}</h2>
      <p className="text-gray-700 italic mb-4">"{output}"</p>
      <div className="text-xs text-gray-500">
        Traits Detected: {Object.entries(traits).map(([t, v]) => `${t} (${v.toFixed(2)})`).join(", ")}
      </div>
    </div>
  );
};

export default SinkVerdictCard;