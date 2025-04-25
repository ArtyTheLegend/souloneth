import React, { useState } from "react"
import DivineShareCard from "./DivineShareCard"
import { getOrCreateSoulfraId } from "../utils/identity"

const promptPool = [
  "What’s something you regret but never really apologized for?",
  "What’s something you wanted to say, but didn’t?",
  "What thought always stops you before you try?",
  "What did you stop believing in?",
  "If you could go back to one decision, which one would you change?",
  "What made you irrationally angry recently?",
  "What’s the truth about yourself you avoid saying out loud?",
  "What’s the emotion you haven’t felt on purpose?"
]

const getRandomPrompt = () => promptPool[Math.floor(Math.random() * promptPool.length)]

export default function LORBGRitual() {
  const [transcript, setTranscript] = useState("")
  const [userId] = useState(getOrCreateSoulfraId())
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [promptUsed, setPromptUsed] = useState(getRandomPrompt())

  const recordVoice = () => {
    const recognition = new window.webkitSpeechRecognition()
    recognition.continuous = false
    recognition.interimResults = false
    recognition.lang = "en-US"
    recognition.start()

    recognition.onresult = (event) => {
      const spokenText = event.results[0][0].transcript
      setTranscript(spokenText)
    }

    recognition.onerror = () => alert("Recording error. Please try again.")
  }

  const submitRitual = async () => {
    if (!transcript) return alert("Missing transcript")
    setLoading(true)

    const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/lorbg-reflection`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId, transcript, prompt_used: promptUsed })
    })

    const data = await res.json()
    setResult(data)
    setLoading(false)
  }

  const rerollPrompt = () => {
    setPromptUsed(getRandomPrompt())
  }

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6 bg-white shadow-xl rounded-xl">
      <h2 className="text-xl font-bold text-center">👁️ Left On Read By God</h2>
      <p className="text-sm text-center text-gray-500">Speak your truth. God might respond.</p>

      <div className="bg-gray-100 p-4 rounded-md">
        <p className="font-semibold text-gray-700 text-center mb-2">Your prompt:</p>
        <blockquote className="italic text-center text-gray-600">{promptUsed}</blockquote>
        <div className="text-center mt-2">
          <button
            className="text-xs text-blue-500 underline"
            onClick={rerollPrompt}
          >
            Change prompt
          </button>
        </div>
      </div>

      <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={recordVoice}>
        🎙 Record Reflection
      </button>

      {transcript && (
        <div className="bg-gray-200 p-3 rounded">
          <p className="text-sm text-gray-600">Transcript:</p>
          <p className="font-mono">{transcript}</p>
        </div>
      )}

      <button
        onClick={submitRitual}
        className="bg-purple-600 text-white px-4 py-2 rounded disabled:opacity-50"
        disabled={!transcript || loading}
      >
        {loading ? "Summoning..." : "✨ Submit to the Voice"}
      </button>

      {result && <DivineShareCard result={result} />}
    </div>
  )
}