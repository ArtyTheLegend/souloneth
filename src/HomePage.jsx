import React, { useEffect, useState } from 'react';
import DailyWhisper from '@/components/DailyWhisper';
import ReturnToRitualButton from '@/components/ReturnToRitualButton';
import { copyToClipboard } from '@/utils/copyClipboard';
import supabase from '@/utils/supabase';

export default function HomePage() {
  const [ghostCode, setGhostCode] = useState('');
  const [ritualLink, setRitualLink] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGhostId = async () => {
      setLoading(true);
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();

      if (sessionError || !session || !session.user) {
        setError('No active session found.');
        setLoading(false);
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

      if (error || !data?.id) {
        setError('No Ghost Code Found — Please record your ritual first.');
      } else {
        setGhostCode(data.id);
        setRitualLink(`https://souloneth.com/ritual?id=${data.id}`);
      }

      setLoading(false);
    };

    fetchGhostId();
  }, []);

  return (
    <div className="p-8 text-center">
      <h1 className="text-4xl font-bold mb-4">Enter the Waiting</h1>
      <p className="text-lg italic mb-8">Where echoes are born and remembered.</p>

      <DailyWhisper />

      {loading ? (
        <p className="mt-8">Loading your ghost code...</p>
      ) : error ? (
        <p className="text-red-500 italic mt-8">{error}</p>
      ) : (
        <>
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Your Ghost Code</h2>
            <div className="flex items-center justify-center space-x-4 mt-4">
              <div className="px-4 py-2 border rounded bg-black/70 text-white">
                {ghostCode}
              </div>
              <button
                onClick={() => copyToClipboard(ghostCode)}
                className="px-4 py-2 rounded bg-gray-800 text-white hover:bg-gray-600"
              >
                Copy Code
              </button>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-semibold">Your Ritual Link</h2>
            <div className="flex items-center justify-center space-x-4 mt-4">
              <div className="px-4 py-2 border rounded bg-black/70 text-white">
                {ritualLink}
              </div>
              <button
                onClick={() => copyToClipboard(ritualLink)}
                className="px-4 py-2 rounded bg-gray-800 text-white hover:bg-gray-600"
              >
                Copy Link
              </button>
            </div>
          </div>
        </>
      )}

      <ReturnToRitualButton />
    </div>
  );
}
