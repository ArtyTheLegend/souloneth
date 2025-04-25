import React, { useState } from "react"
import { getOrCreateSoulfraId } from "../utils/identity"

export default function RitualRecorder({ onResult }) {
  const [transcript, setTranscript] = useState("")
  const [userId] = useState(getOrCreateSoulfraId())
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showTokenAnimation, setShowTokenAnimation] = useState(false)

  const startRecording = () => {
    const recognition = new window.webkitSpeechRecognition()
    recognition.continuous = false
    recognition.interimResults = false
    recognition.lang = "en-US"
    recognition.start()
    recognition.onresult = (event) => {
      const spokenText = event.results[0][0].transcript
      setTranscript(spokenText)
    }
    recognition.onerror = () => alert("Speech error")
  }

  const submitRitual = async () => {
    if (!transcript) return alert("Missing transcript")
    setLoading(true)

    const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/run-agent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        agentName: "voiceToTraitsAgent",
        input: { user_id: userId, transcript }
      })
    })

    const data = await res.json()
    setResult(data.result)
    if (onResult) onResult(data.result)

    setShowTokenAnimation(true)
    setTimeout(() => setShowTokenAnimation(false), 2500)
    setLoading(false)
  }

  return (
    <div className="relative max-w-xl mx-auto p-6 space-y-4 bg-white shadow-xl rounded-2xl">
      {showTokenAnimation && result && (
        <div className="absolute top-10 right-10 bg-emerald-500 text-white px-4 py-2 rounded-full shadow-lg animate-bounce z-50">
          +{result.tokens_awarded || 20} 💎 tokens
        </div>
      )}

      <h2 className="text-xl font-bold">🌀 Ritual Recorder</h2>

      <button onClick={startRecording} className="bg-blue-600 text-white px-4 py-2 rounded">
        🎙 Record Voice
      </button>

      {transcript && (
        <div className="bg-gray-100 p-3 rounded">
          <p className="text-sm text-gray-600">Transcript:</p>
          <p className="font-mono text-md">{transcript}</p>
        </div>
      )}

      <button onClick={submitRitual} className="bg-green-600 text-white px-4 py-2 rounded" disabled={!transcript || loading}>
        {loading ? "Scoring..." : "🪞 Submit Ritual"}
      </button>

      {result && (
        <div className="mt-4 p-4 bg-emerald-100 border border-emerald-400 rounded-xl">
          <h3 className="font-semibold">🧠 Traits Detected:</h3>
          <pre className="text-sm font-mono">{JSON.stringify(result.traits, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}