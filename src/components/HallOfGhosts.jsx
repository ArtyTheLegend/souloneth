import React, { useEffect, useState } from 'react';
import supabase from '@/utils/supabase';

export default function HallOfGhosts() {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    async function fetchLeaders() {
      const { data, error } = await supabase
        .from('referrals')
        .select('anon_id, referral_count, top_trait')
        .order('referral_count', { ascending: false })
        .limit(25);

      if (error) console.error(error);
      else setLeaders(data);
    }

    fetchLeaders();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Hall of Ghosts</h2>
      <ul className="space-y-2">
        {leaders.map((leader, index) => (
          <li key={index} className="flex justify-between border-b py-2">
            <span>Anon#{leader.anon_id}</span>
            <span>{leader.referral_count} Souls Referred</span>
            <span>Top Trait: {leader.top_trait}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
