import React from 'react';
import ReturnToRitualButton from '@/components/ReturnToRitualButton';

export default function VaultPage() {
  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold">The Vault</h1>
      <p className="italic my-2">Your sealed fragments rest here. Soon you may retrieve them.</p>

      <ReturnToRitualButton />
    </div>
  );
}
