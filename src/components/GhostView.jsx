import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export default function GhostView() {
  const { id } = useParams()
  const [log, setLog] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLog = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/ghostlog/${id}`)
        const data = await res.json()
        setLog(data || null)
        setLoading(false)
      } catch (err) {
        console.error("Failed to fetch ghost log:", err)
        setLoading(false)
      }
    }

    if (id) fetchLog()
  }, [id])

  if (loading) return <p className="text-center">Loading ritual...</p>
  if (!log) return <p className="text-center text-gray-400">This ghost ritual has faded into the void.</p>

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <div className="max-w-xl w-full bg-white shadow-2xl rounded-xl p-6 space-y-6 text-center">
        <h2 className="text-2xl font-bold">👻 GhostMeMeter Result</h2>

        <p className="text-sm text-gray-500">Ghosted at Tier {log.ghost_tier}</p>

        <blockquote className="italic text-gray-700 text-lg mt-4">"{log.confession}"</blockquote>

        <p className="text-md text-gray-700 mt-6">Ghost Verdict:</p>
        <p className="text-purple-700 font-semibold">{log.ghost_message}</p>

        {log.divine_tier && (
          <div className="mt-6">
            <p className="text-sm text-gray-400 mb-2">Divine Insight:</p>
            <blockquote className="italic text-indigo-600 text-md">
              {log.divine_output || "No divine response logged."}
            </blockquote>
          </div>
        )}
      </div>
    </div>
  )
}