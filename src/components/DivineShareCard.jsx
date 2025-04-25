import React from "react";

const DivineShareCard = ({ output, traits = {} }) => (
  <div className="bg-white shadow-md rounded p-4 text-center">
    <p className="italic text-lg mb-4">"{output}"</p>
    <div className="text-sm text-gray-500">
      {Object.keys(traits).length > 0 ? (
        <ul className="inline-block text-left">
          {Object.entries(traits).map(([trait, value]) => (
            <li key={trait}>{trait}: {value.toFixed(2)}</li>
          ))}
        </ul>
      ) : (
        <p>No traits detected.</p>
      )}
    </div>
  </div>
);

export default DivineShareCard;