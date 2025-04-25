import React from "react";

const TraitViewer = ({ traits }) => (
  <div className="mt-4">
    <h3 className="text-lg font-semibold mb-2">Detected Traits</h3>
    <ul className="grid grid-cols-2 gap-2 text-sm">
      {Object.entries(traits).map(([trait, value]) => (
        <li key={trait} className="flex justify-between">
          <span>{trait}</span>
          <span className="text-gray-600">{value.toFixed(2)}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default TraitViewer;