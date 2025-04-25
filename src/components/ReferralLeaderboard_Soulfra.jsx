import React, { useEffect, useState } from "react";
import { getReferralBadge } from "../utils/profileBadgeRenderer_Soulfra";

const ReferralLeaderboard = () => {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    fetch("/api/referrals/top")
      .then((res) => res.json())
      .then((data) => setLeaders(data))
      .catch(() => setLeaders([]));
  }, []);

  return (
    <div className="p-6 bg-white shadow rounded border border-gray-200">
      <h2 className="text-xl font-semibold mb-4 tracking-tight">Ritual Presence Leaderboard</h2>
      {leaders.length === 0 ? (
        <p className="text-gray-500">No souls echoed yet.</p>
      ) : (
        <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-800">
          {leaders.map((user, index) => (
            <li key={user.referrer_id}>
              <span className="font-medium">{user.referrer_id}</span> —{" "}
              <span className="text-gray-600">{user.count} echoes</span> •{" "}
              <span className="text-purple-700">{getReferralBadge(user.count)}</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
};

export default ReferralLeaderboard;