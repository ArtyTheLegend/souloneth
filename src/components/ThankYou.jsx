import React, { useEffect, useState } from 'react';
import supabase from '@/utils/supabase';
import ReturnToRitualButton from '@/components/ReturnToRitualButton';

export default function ThankYou() {
  const [soulCount, setSoulCount] = useState(null);
  const [revealLore, setRevealLore] = useState(false);
  const [ghostCode, setGhostCode] = useState('');

  useEffect(() => {
    const fetchSoulData = async () => {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();

      if (sessionError || !session || !session.user) {
        console.error('No active session found.');
        return;
      }

      const userId = session.user.id;

      const { data, error } = await supabase
        .from('ghost_logs')
        .select('id')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (!error && data?.id) {
        setGhostCode(data.id);
      }
    };

    fetchSoulData();

    const loreTimeout = setTimeout(() => {
      setRevealLore(true);
    }, 3000);

    return () => clearTimeout(loreTimeout);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-black overflow-hidden text-center text-white">

      {/* Background Layer */}
      <div
        className="absolute inset-0 bg-center bg-contain bg-no-repeat opacity-10 animate-breatheveil"
        style={{ backgroundImage: 'url("/thankyoubackground.png")' }}
      ></div>

      {/* Main Ritual Content */}
      <div className="relative z-10 flex flex-col items-center p-8">
        <h1 className="text-4xl font-bold mb-6 tracking-wide">
          Thank You for Crossing the Veil
        </h1>

        <p className="text-lg italic mb-10 text-gray-400">
          {soulCount === null ? 'Counting the echoes...' : `${soulCount.toLocaleString()} souls heard the call.`}
        </p>

        <div className="mb-16">
          <ReturnToRitualButton />
        </div>

        {revealLore && (
          <div className="opacity-0 animate-fade-in mt-12 border-t border-gray-700 pt-8 text-sm text-gray-400 max-w-xl flex flex-col items-center space-y-6">
            <div>
              <p className="mb-2">You are now etched in the chain of echoes.</p>
              <p>Your presence reverberates beyond sight.</p>
            </div>

            <div>
              <p className="text-sm text-gray-400 mb-2">Your Summon Link:</p>
              <div className="px-4 py-2 bg-gray-800 rounded">
                {ghostCode ? `https://souloneth.com/?ref=${ghostCode}` : 'Loading your summon link...'}
              </div>
              <p className="text-xs text-gray-500 mt-2 italic">
                Echoes that summon more souls will be remembered...
              </p>
            </div>

            <a
              href="/"
              className="inline-block px-6 py-2 border border-white rounded hover:bg-white hover:text-black transition duration-300"
            >
              Spread the Veil →
            </a>
          </div>
        )}

      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes breatheveil {
          0%, 100% { opacity: 0.10; }
          50% { opacity: 0.20; }
        }
        .animate-breatheveil {
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