import React from 'react';

export default function TraitReveal({ traits = [] }) {
  if (!traits.length) return null;

  const traitLine = traits.join(', ');

  return (
    <div className="text-center p-4">
      <h2 className="text-xl font-semibold">Your reflection revealed:</h2>
      <p className="mt-2 text-lg italic">{traitLine}</p>
    </div>
  );
}
