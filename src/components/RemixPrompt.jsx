import React, { useState } from "react"
import { getOrCreateSoulfraId } from "../utils/identity"

export default function RemixPrompt() {
  const [originalTranscript, setOriginalTranscript] = useState("")
  const [remixTranscript, setRemixTranscript] = useState("")
  const [originalTraits, setOriginalTraits] = useState(null)
  const [deltaResult, setDeltaResult] = useState(null)
  const [userId] = useState(getOrCreateSoulfraId())
  const [loading, setLoading] = useState(false)

  const record = (setFn) => {
    const recognition = new window.webkitSpeechRecognition()
    recognition.lang = "en-US"
    recognition.start()
    recognition.onresult = (event) => {
      setFn(event.results[0][0].transcript)
    }
    recognition.onerror = () => alert("Voice error")
  }

  const scoreOriginal = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/run-agent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ agentName: "voiceToTraitsAgent", input: { user_id: userId, transcript: originalTranscript } })
    })
    const data = await res.json()
    setOriginalTraits(data.result.traits)
  }

  const scoreRemix = async () => {
    const remixRes = await fetch(`${import.meta.env.VITE_API_BASE}/api/run-agent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ agentName: "voiceToTraitsAgent", input: { user_id: userId, transcript: remixTranscript } })
    })
    const remixData = await remixRes.json()

    const deltaRes = await fetch(`${import.meta.env.VITE_API_BASE}/api/run-agent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        agentName: "traitDeltaAgent",
        input: { original: originalTraits, remix: remixData.result.traits }
      })
    })
    const deltaData = await deltaRes.json()
    setDeltaResult(deltaData.result)
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6 bg-white shadow-2xl rounded-2xl">
      <h2 className="text-xl font-bold">🎭 Trait Remix Ritual</h2>
      <button onClick={() => record(setOriginalTranscript)} className="bg-blue-600 text-white px-4 py-2 rounded">🎙 Original</button>
      {originalTranscript && <div>{originalTranscript}</div>}
      <button onClick={scoreOriginal} className="bg-indigo-600 text-white px-4 py-2 rounded">Score Original</button>

      <button onClick={() => record(setRemixTranscript)} className="bg-purple-600 text-white px-4 py-2 rounded">🎙 Remix</button>
      {remixTranscript && <div>{remixTranscript}</div>}
      <button onClick={scoreRemix} className="bg-green-600 text-white px-4 py-2 rounded">Score & Compare</button>

      {deltaResult && (
        <div className="p-4 bg-emerald-100 border rounded-xl mt-4">
          <pre className="text-sm font-mono">{JSON.stringify(deltaResult.delta, null, 2)}</pre>
          <p>{deltaResult.summary}</p>
          <p className="font-bold mt-2">+{deltaResult.tokens_awarded} 💎 tokens</p>
        </div>
      )}
    </div>
  )
}