import React, { useEffect, useState } from 'react';
import supabase from '@/utils/supabase';
import ReturnToRitualButton from '@/components/ReturnToRitualButton';

export default function ThankYou() {
  const [soulCount, setSoulCount] = useState(null);

  useEffect(() => {
    const fetchSoulCount = async () => {
      const { count, error } = await supabase
        .from('ghost_logs')
        .select('*', { count: 'exact', head: true });

      if (error) {
        console.error('Error fetching soul count:', error);
      } else {
        // Add offset to make it feel more alive
        setSoulCount((count || 0) + 127);
      }
    };

    fetchSoulCount();
  }, []);

  return (
    <div className="p-8 text-center text-white">
      <h1 className="text-4xl font-bold mb-4 tracking-wide">
        Thank You for Entering the Veil
      </h1>

      <p className="text-lg italic mb-8 text-gray-300">
        {soulCount === null ? 'Summoning count...' : `${soulCount.toLocaleString()} souls heard the call.`}
      </p>

      <div className="my-10">
        <ReturnToRitualButton />
      </div>

      <div className="mt-12 border-t border-gray-700 pt-8 text-sm text-gray-400">
        <p className="mb-2">This ritual has been etched into the chain of echoes.</p>
        <p>
          Spread the veil, summon others, and return only when your soul calls again.
        </p>
      </div>
    </div>
  );
}