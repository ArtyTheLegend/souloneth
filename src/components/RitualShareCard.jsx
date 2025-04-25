import React from "react"
import html2canvas from "html2canvas"

export default function RitualShareCard({ result }) {
  const captureCard = async () => {
    const card = document.getElementById("ritual-card")
    const canvas = await html2canvas(card)
    const link = document.createElement("a")
    link.download = `soulprint_snapshot_${Date.now()}.png`
    link.href = canvas.toDataURL()
    link.click()
  }

  if (!result) return null

  return (
    <div className="mt-6">
      <div id="ritual-card" className="p-6 rounded-xl bg-white shadow-lg border border-gray-200 w-full max-w-md mx-auto">
        <h2 className="text-lg font-semibold text-center">📜 Ritual Snapshot</h2>
        <p className="text-xs text-center text-gray-500 mb-4">Your emotional proof of presence</p>

        <div className="text-sm font-mono text-gray-800 space-y-1">
          {Object.entries(result.traits).map(([trait, score]) => (
            <div key={trait} className="flex justify-between">
              <span>{trait}</span>
              <span>{(score * 100).toFixed(0)}%</span>
            </div>
          ))}
        </div>

        <div className="mt-4 text-xs text-gray-400 text-center">
          🕓 {new Date(result.timestamp).toLocaleString()}
        </div>
      </div>

      <div className="mt-4 flex justify-center">
        <button
          onClick={captureCard}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 shadow"
        >📸 Download & Share</button>
      </div>
    </div>
  )
}