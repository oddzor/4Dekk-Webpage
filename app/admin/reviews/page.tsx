'use client'

import { useState } from 'react'

export default function AdminReviews() {
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  const refreshReviews = async () => {
    if (!password) {
      setStatus('Please enter admin password')
      return
    }

    setLoading(true)
    setStatus('Refreshing reviews...')

    try {
      const response = await fetch('/api/admin/refresh-reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password })
      })

      const result = await response.json()

      if (response.ok) {
        setStatus('✅ Reviews cache cleared! Next page load will fetch fresh data.')
      } else {
        setStatus(`❌ Error: ${result.error}`)
      }
    } catch {
      setStatus('❌ Network error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Admin: Refresh Reviews
        </h1>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Admin Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter admin password"
            />
          </div>

          <button
            onClick={refreshReviews}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Refreshing...' : 'Refresh Reviews Cache'}
          </button>

          {status && (
            <div className="mt-4 p-3 bg-gray-50 rounded-md">
              <p className="text-sm">{status}</p>
            </div>
          )}
        </div>

        <div className="mt-6 text-xs text-gray-500">
          <p>This will clear the reviews cache and force a fresh fetch from Outscraper on the next page load.</p>
          <p className="mt-2">Use this when you want to update reviews with the latest from Google.</p>
        </div>
      </div>
    </div>
  )
}
