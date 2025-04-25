import React, { useState } from "react"
import DivineShareCard from "./DivineShareCard"
import { getOrCreateSoulfraId } from "../utils/identity"

export default function GhostMeMeter() {
  const [transcript, setTranscript] = useState("")
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [divineRequested, setDivineRequested] = useState(false)
  const userId = getOrCreateSoulfraId()

  const recordConfession = () => {
    try {
      const recognition = new window.webkitSpeechRecognition()
      recognition.continuous = false
      recognition.interimResults = false
      recognition.lang = "en-US"
      recognition.maxAlternatives = 1
      recognition.start()

      console.log("🎤 Listening started...")
      let spokenText = ""

      recognition.onresult = (event) => {
        spokenText = event.results[0][0].transcript
        console.log("🎧 Voice captured:", spokenText)
        setTranscript(spokenText)
      }

      recognition.onerror = (event) => {
        console.error("❌ Speech recognition error:", event.error)
        if (event.error === "no-speech") {
          alert("No speech detected. Try again with a clearer or longer sentence.")
        } else {
          alert(`Voice recognition error: ${event.error}`)
        }
      }

      recognition.onend = () => {
        console.log("🎙️ Voice recognition ended")
        if (!spokenText) {
          console.warn("👻 Nothing was said. Try again.")
        }
      }
    } catch (err) {
      console.error("❌ Microphone setup failed:", err)
      alert("Microphone issue — make sure your browser allows voice input.")
    }
  }

  const submitConfession = async (unlockDivine = false) => {
    if (!transcript.trim()) return alert("Say something first.")
    setLoading(true)

    const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/ghostmemeter`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId, confession: transcript, unlockDivine })
    })

    const data = await res.json()
    setResult(data)
    setLoading(false)
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-center">👻 GhostMeMeter</h2>
      <p className="text-center text-sm text-gray-500">Speak a confession aloud. Let the void score you.</p>

      <button className="w-full bg-gray-800 text-white px-4 py-2 rounded" onClick={recordConfession}>
        🎙 Record Confession
      </button>

      {transcript && (
        <div className="bg-gray-100 p-3 mt-3 rounded">
          <p className="text-sm text-gray-500 mb-1">Transcript:</p>
          <p className="text-sm font-mono">{transcript}</p>
        </div>
      )}

      <button
        className="w-full bg-black text-white px-4 py-2 rounded disabled:opacity-50"
        onClick={() => submitConfession()}
        disabled={loading || !transcript}
      >
        {loading ? "Scoring..." : "👻 Send to the void"}
      </button>

      {result && (
        <div className="bg-gray-100 p-4 mt-4 rounded-lg text-center space-y-2">
          <p className="text-xl font-bold">You were ghosted at Tier {result.ghost_tier}</p>
          <p className="text-sm italic text-gray-600">“{result.ghost_message}”</p>

          {!result.divine_unlocked && !divineRequested && (
            <button
              className="bg-yellow-500 text-white px-4 py-2 rounded shadow mt-3"
              onClick={() => {
                setDivineRequested(true)
                submitConfession(true)
              }}
            >
              🔓 Unlock Divine Reply
            </button>
          )}

          {result.divine_unlocked && (
            <>
              <p className="text-xs text-gray-400 mt-2">Divine response unlocked:</p>
              <DivineShareCard result={result.divine_result} />
            </>
          )}

          <div className="flex flex-col gap-3 mt-6">
            <button
              className="bg-black text-white px-4 py-2 rounded shadow"
              onClick={() => {
                setTranscript("")
                setResult(null)
                setDivineRequested(false)
              }}
            >
              🔁 GhostMe Again
            </button>

            <button
              className="bg-purple-700 text-white px-4 py-2 rounded shadow"
              onClick={() => {
                const shareUrl = `${window.location.origin}/ghost/${result.id || "unknown"}`
                navigator.clipboard.writeText(shareUrl)
                alert("🔗 Ritual link copied! Send it to someone to get ghosted.")
              }}
            >
              📨 Send Someone Into the Void
            </button>
          </div>
        </div>
      )}
    </div>
  )
}