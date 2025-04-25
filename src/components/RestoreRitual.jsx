import React, { useState } from "react"
import { getOrCreateSoulfraId } from "../utils/identity"

export default function RestoreRitual() {
  const [transcript, setTranscript] = useState("")
  const [userId] = useState(getOrCreateSoulfraId())
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const recordVoice = () => {
    const recognition = new window.webkitSpeechRecognition()
    recognition.lang = "en-US"
    recognition.start()
    recognition.onresult = (event) => {
      const spokenText = event.results[0][0].transcript
      setTranscript(spokenText)
    }
    recognition.onerror = () => alert("Mic error")
  }

  const submitRestore = async () => {
    if (!transcript) return alert("Missing voice input")
    setLoading(true)

    const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/restore-ritual`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId, transcript })
    })

    const data = await res.json()
    setResult(data)
    setLoading(false)
  }

  return (
    <div className="max-w-lg mx-auto p-6 space-y-6 bg-white shadow-lg rounded-2xl">
      <h2 className="text-xl font-bold">🩻 Restore Your Soulprint</h2>
      <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={recordVoice}>🎙 Record</button>

      {transcript && <div className="bg-gray-100 p-3 rounded">{transcript}</div>}

      <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={submitRestore} disabled={!transcript || loading}>
        {loading ? "Restoring..." : "🔄 Restore"}
      </button>

      {result && (
        <div className="p-4 bg-emerald-100 border border-emerald-400 rounded-xl mt-4">
          {result.restored ? (
            <>
              <p>✅ Restoration Complete (+{result.tokens_awarded} tokens)</p>
            </>
          ) : (
            <p>🧊 No Change Detected</p>
          )}
        </div>
      )}
    </div>
  )
}