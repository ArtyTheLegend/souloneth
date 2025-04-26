import React from 'react';
import HallOfGhosts from '@/components/HallOfGhosts';
import ReturnToRitualButton from '@/components/ReturnToRitualButton';

export default function HallPage() {
  return (
    <div className="p-6">
      <HallOfGhosts />
      <ReturnToRitualButton />
    </div>
  );
}
