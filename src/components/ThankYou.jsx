import React, { useEffect, useState } from 'react';
import supabase from '@/utils/supabase';
import ReturnToRitualButton from '@/components/ReturnToRitualButton';

export default function ThankYou() {
  const [soulCount, setSoulCount] = useState(0);

  useEffect(() => {
    const fetchSoulCount = async () => {
      const { count, error } = await supabase
        .from('ghost_logs')
        .select('*', { count: 'exact', head: true });

      if (error) {
        console.error('Error fetching soul count:', error);
      } else {
        setSoulCount(count);
      }
    };

    fetchSoulCount();
  }, []);

  return (
    <div className="p-8 text-center">
      <h1 className="text-4xl font-bold mb-6">Thank You for Entering the Veil</h1>
      
      <p className="text-lg italic mb-8">
        {soulCount ? `${soulCount.toLocaleString()} souls have already entered.` : 'Loading soul count...'}
      </p>

      <ReturnToRitualButton />
    </div>
  );
}