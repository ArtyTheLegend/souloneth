// /src/components/ThankYou.jsx

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
    <div className="relative flex flex-col items-center justify-center min-h-screen p-8 text-center text-white bg-black overflow-hidden">

      {/* ThankYou Background */}
      <img
        src="/thankyoubackground.png"
        alt="Thank You Background"
        className="absolute inset-0 m-auto opacity-5 w-full h-full object-cover pointer-events-none select-none animate-fadeveil"
      />

      <h1 className="text-4xl font-bold mb-6 tracking-wide z-10">
        Thank You for Crossing the Veil
      </h1>

      <p className="text-lg italic mb-10 text-gray-400 z-10">
        {soulCount === null ? 'Counting the echoes...' : `${soulCount.toLocaleString()} souls heard the call.`}
      </p>

      <div className="mb-16 z-10">
        <ReturnToRitualButton />
      </div>

      {revealLore && (
        <div className="opacity-0 animate-fade-in mt-12 border-t border-gray-700 pt-8 text-sm text-gray-400 max-w-xl z-10">
          <p className="mb-3">You are now etched in the chain of echoes.</p>
          <p className="mb-3">Your presence reverberates beyond sight.</p>
          <p className="mb-6">Spread the veil. Let others find their crossing.</p>
          <a
            href="/"
            className="inline-block px-6 py-2 border border-white rounded hover:bg-white hover:text-black transition duration-300"
          >
            Spread the Veil →
          </a>
        </div>
      )}

      {/* Breathing Animations */}
      <style jsx>{`
        @keyframes breatheveil {
          0%, 100% { opacity: 0.04; }
          50% { opacity: 0.08; }
        }
        .animate-fadeveil {
          animation: breatheveil 10s ease-in-out infinite;
        }
        @keyframes fadeIn {
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 2s ease forwards;
        }
      `}</style>

    </div>
  );
}