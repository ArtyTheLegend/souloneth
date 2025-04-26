import React from 'react';
import ReturnToRitualButton from '@/components/ReturnToRitualButton';

export default function OathPage() {
  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold">Seal Your Oath</h1>
      <p className="italic my-2">Speak your truth into the void.</p>

      <textarea className="w-full p-4 rounded border bg-black/50 text-white" rows={6} placeholder="Your Oath..." />

      <ReturnToRitualButton />
    </div>
  );
}
