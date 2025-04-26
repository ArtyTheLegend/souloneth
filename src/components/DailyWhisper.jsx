import React, { useEffect, useState } from 'react';

const dailyPrompts = [
  "What echoes from your past still follow you?",
  "Who did you become after being forgotten?",
  "What truth are you still hiding?",
];

export default function DailyWhisper() {
  const [prompt, setPrompt] = useState('');

  useEffect(() => {
    const dayIndex = new Date().getDate() % dailyPrompts.length;
    setPrompt(dailyPrompts[dayIndex]);
  }, []);

  if (!prompt) return null;

  return (
    <div className="text-center p-6 bg-black/70 text-white rounded-xl">
      <h2 className="text-2xl font-bold mb-2">Today's Whisper</h2>
      <p className="italic">{prompt}</p>
    </div>
  );
}
