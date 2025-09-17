'use client'

import { useState } from 'react'

export default function FindBusiness() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const searchBusiness = async () => {
    if (!query.trim()) {
      alert('Please enter a search query')
      return
    }

    setLoading(true)
    setResults(null)

    try {
      const response = await fetch('/api/find-business', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query: query.trim() })
      })

      const data = await response.json()
      setResults(data)
    } catch {
      setResults({
        success: false,
        error: 'Network error occurred'
      })
    } finally {
      setLoading(false)
    }
  }

  const predefinedSearches = [
    'ChIJ1fptqozARkYRRLwkYKop0Eg',
    '4Dekk Larvik',
    '4Dekk Haakon VII\'s vei 9 Larvik',
    'Haakon VII\'s vei 9, 3262 Larvik, Norway',
    'https://www.google.com/maps/place/4Dekk/@59.0533333,10.0297222,17z/'
  ]

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Find Your Business on Outscraper
          </h1>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Query
              </label>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter business name, address, Place ID, or Google Maps URL"
                onKeyDown={(e) => e.key === 'Enter' && searchBusiness()}
              />
            </div>

            <button
              onClick={searchBusiness}
              disabled={loading}
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Searching...' : 'Search Business'}
            </button>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3">Try these searches:</h3>
            <div className="space-y-2">
              {predefinedSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => setQuery(search)}
                  className="block w-full text-left px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded border text-sm"
                >
                  {search}
                </button>
              ))}
            </div>
          </div>
        </div>

        {results && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">
              {results.success ? '✅ Search Results' : '❌ Search Failed'}
            </h2>

            {results.success ? (
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <p><strong>Query:</strong> {results.query}</p>
                  <p><strong>Businesses Found:</strong> {results.businessesFound}</p>
                  {results.bestMatch && (
                    <div className="mt-3">
                      <p><strong>Best Match:</strong> {results.bestMatch.name}</p>
                      <p><strong>Address:</strong> {results.bestMatch.address}</p>
                      <p><strong>Rating:</strong> {results.bestMatch.rating} ⭐</p>
                      <p><strong>Review Count:</strong> {results.bestMatch.reviewCount}</p>
                      <p><strong>Has Reviews:</strong> {results.bestMatch.hasReviews ? 'Yes' : 'No'}</p>
                    </div>
                  )}
                </div>

                {results.businesses && results.businesses.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-2">All Results:</h3>
                    {results.businesses.map((business: any, index: number) => (
                      <div key={index} className="border rounded p-3 mb-2">
                        <p><strong>{business.name}</strong></p>
                        <p className="text-sm text-gray-600">{business.address}</p>
                        <p className="text-sm">
                          {business.rating} ⭐ ({business.reviewCount} reviews)
                        </p>
                        {business.sampleReview && (
                          <div className="mt-2 text-xs bg-gray-50 p-2 rounded">
                            <p><strong>Sample Review:</strong></p>
                            <p>"{business.sampleReview.text}"</p>
                            <p>- {business.sampleReview.author} ({business.sampleReview.rating} ⭐)</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                <div className="bg-blue-50 p-4 rounded-lg">
                  <p><strong>💡 Recommendation:</strong> {results.recommendation}</p>
                </div>
              </div>
            ) : (
              <div className="bg-red-50 p-4 rounded-lg">
                <p><strong>Error:</strong> {results.error}</p>
                {results.details && <p><strong>Details:</strong> {results.details}</p>}
                {results.suggestion && <p><strong>Suggestion:</strong> {results.suggestion}</p>}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
