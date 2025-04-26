import React from 'react';
import TraitReveal from '@/components/TraitReveal';
import ReturnToRitualButton from '@/components/ReturnToRitualButton';

export default function BlessingPage() {
  const userTraits = ['Brave', 'Reflective', 'Mischievous']; // Replace with real pulled traits if available

  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold">You Were Heard</h1>
      <p className="italic mt-2">Even silence echoes here.</p>

      <TraitReveal traits={userTraits} />

      <ReturnToRitualButton />
    </div>
  );
}
