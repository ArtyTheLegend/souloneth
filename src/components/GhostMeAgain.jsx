import React from "react";

const GhostMeAgain = ({ onClick }) => (
  <button
    onClick={onClick}
    className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
  >
    Ghost Me Again
  </button>
);

export default GhostMeAgain;