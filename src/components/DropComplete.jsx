import React from "react";
import GhostMeAgain from "./GhostMeAgain";
import GhostDropLink from "./GhostDropLink";

const DropComplete = ({ result, onRemix }) => (
  <div className="p-6 text-center">
    <h2 className="text-2xl font-semibold mb-4">Reflection Complete</h2>
    <p className="mb-2 italic">"{result.context.output}"</p>
    <GhostDropLink id={result.id} />
    <GhostMeAgain onClick={onRemix} />
  </div>
);

export default DropComplete;