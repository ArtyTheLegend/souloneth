import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ReturnToRitualButton() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center my-6">
      <button
        onClick={() => navigate('/')} // Adjust if your home route is different
        className="px-4 py-2 rounded bg-gray-800 text-white hover:bg-gray-600"
      >
        Return to Ritual
      </button>
    </div>
  );
}
