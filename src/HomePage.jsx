import React, { useState } from "react"
import RitualRecorder from "./components/RitualRecorder"
import RitualShareCard from "./components/RitualShareCard"
import RestoreRitual from "./components/RestoreRitual"
import RemixPrompt from "./components/RemixPrompt"

export default function HomePage() {
  const [activeView, setActiveView] = useState("recorder")

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-2xl font-bold mb-4 text-center">🌀 Soulfra Ritual Dashboard</h1>

      <div className="flex justify-center space-x-2 mb-6">
        <button onClick={() => setActiveView("recorder")} className="px-3 py-1 bg-blue-600 text-white rounded">🎙 Reflect</button>
        <button onClick={() => setActiveView("remix")} className="px-3 py-1 bg-purple-600 text-white rounded">🌀 Remix</button>
        <button onClick={() => setActiveView("restore")} className="px-3 py-1 bg-emerald-600 text-white rounded">🩻 Restore</button>
      </div>

      {activeView === "recorder" && <RitualRecorder />}
      {activeView === "remix" && <RemixPrompt />}
      {activeView === "restore" && <RestoreRitual />}
    </div>
  )
}