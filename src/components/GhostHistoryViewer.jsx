import React, { useEffect, useState } from "react"
import { getOrCreateSoulfraId } from "../utils/identity"

export default function GhostHistoryViewer() {
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)
  const userId = getOrCreateSoulfraId()

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/ghostlogs/${userId}`)
        const data = await res.json()
        setLogs(data || [])
        setLoading(false)
      } catch (err) {
        console.error("Failed to fetch ghost logs:", err)
        setLoading(false)
      }
    }

    fetchLogs()
  }, [])

  if (loading) return <p className="text-center">Loading your ghost history...</p>

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-xl space-y-4">
      <h2 className="text-2xl font-bold text-center">👻 Your Ghost History</h2>

      {logs.length === 0 ? (
        <p className="text-center text-gray-500">No ghost rituals found. Try submitting one.</p>
      ) : (
        logs.map(log => (
          <div key={log.id} className="border rounded p-4 bg-gray-50 space-y-2">
            <p className="text-sm text-gray-500">Ghosted at Tier {log.ghost_tier}</p>
            <p className="italic text-sm text-gray-700">"{log.confession}"</p>
            {log.divine_tier && (
              <p className="text-xs text-gray-400 mt-2">Divine Tier: {log.divine_tier}</p>
            )}
            {log.created_at && (
              <p className="text-xs text-gray-300">🕒 {new Date(log.created_at).toLocaleString()}</p>
            )}
          </div>
        ))
      )}
    </div>
  )
}