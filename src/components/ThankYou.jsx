import React, { useEffect, useState } from 'react';
import supabase from '@/utils/supabase';
import ReturnToRitualButton from '@/components/ReturnToRitualButton';

export default function ThankYou() {
  const [soulCount, setSoulCount] = useState(null);
  const [revealLore, setRevealLore] = useState(false);

  useEffect(() => {
    const fetchSoulCount = async () => {
      const { count, error } = await supabase
        .from('ghost_logs')
        .select('*', { count: 'exact', head: true });

      if (error) {
        console.error('Error fetching soul count:', error);
      } else {
        setSoulCount((count || 0) + 127);
      }
    };

    fetchSoulCount();

    const loreTimeout = setTimeout(() => {
      setRevealLore(true);
    }, 3000);

    return () => clearTimeout(loreTimeout);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center text-white bg-black">
      <h1 className="text-4xl font-bold mb-4 tracking-wider">
        Thank You for Crossing the Veil
      </h1>

      <p className="text-lg italic mb-8 text-gray-400">
        {soulCount === null ? 'Counting the echoes...' : `${soulCount.toLocaleString()} souls heard the call.`}
      </p>

      <div className="my-10">
        <ReturnToRitualButton />
      </div>

      {revealLore && (
        <div className="mt-12 border-t border-gray-700 pt-8 text-sm text-gray-400 transition-opacity duration-1000 ease-in opacity-100">
          <p className="mb-3">You have been marked in the chain of echoes.</p>
          <p className="mb-3">Your presence now resonates beyond sight.</p>
          <p className="mb-6">
            Spread the veil. Summon those who have not yet crossed.
          </p>
          <a
            href="/"
            className="inline-block px-6 py-2 mt-4 border border-gray-500 rounded hover:bg-gray-800 transition"
          >
            Spread the Veil
          </a>
        </div>
      )}
    </div>
  );
}