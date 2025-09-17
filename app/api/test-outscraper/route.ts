import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const apiKey = process.env.OUTSCRAPER_API_KEY
    const placeId = process.env['4DEKK_PLACES_ID'] || 'ChIJ1fptqozARkYRRLwkYKop0Eg'

    console.log('🧪 Testing Outscraper API...')
    console.log('API Key available:', !!apiKey)
    console.log('Place ID:', placeId)

    if (!apiKey) {
      return NextResponse.json({
        success: false,
        error: 'OUTSCRAPER_API_KEY not found in environment variables',
        suggestion: 'Add OUTSCRAPER_API_KEY to your .env.local file'
      })
    }

    // Test Outscraper API call
    const url = `https://api.outscraper.com/maps/reviews-v3?query=${placeId}&reviewsLimit=5&async=false&language=en`
    
    console.log('Making request to:', url)

    const response = await fetch(url, {
      headers: {
        'X-API-KEY': apiKey,
        'Content-Type': 'application/json'
      }
    })

    console.log('Response status:', response.status)
    console.log('Response headers:', Object.fromEntries(response.headers.entries()))

    if (!response.ok) {
      const errorText = await response.text()
      console.log('Error response:', errorText)
      
      return NextResponse.json({
        success: false,
        error: `Outscraper API error: ${response.status}`,
        details: errorText,
        apiKeyLength: apiKey.length,
        suggestion: response.status === 401 ? 'Check if your API key is correct' : 'Check Outscraper service status'
      })
    }

    const data = await response.json()
    console.log('🔍 Raw Outscraper response:', JSON.stringify(data, null, 2))
    console.log('📊 Response type:', typeof data)
    console.log('📏 Response length:', Array.isArray(data) ? data.length : 'Not an array')

    if (!data || (Array.isArray(data) && data.length === 0)) {
      return NextResponse.json({
        success: false,
        error: 'No data received from Outscraper',
        rawResponse: data,
        debug: {
          responseType: typeof data,
          isArray: Array.isArray(data),
          responseKeys: typeof data === 'object' ? Object.keys(data) : 'N/A'
        }
      })
    }

    const businessData = data[0]
    const reviews = businessData?.reviews_data || []

    return NextResponse.json({
      success: true,
      message: '✅ Outscraper API is working!',
      stats: {
        businessName: businessData?.name || 'Unknown',
        totalReviews: businessData?.reviews_count || 0,
        rating: businessData?.rating || 0,
        reviewsSample: reviews.length,
        apiCallsRemaining: response.headers.get('x-credits-remaining') || 'Unknown'
      },
      sampleReview: reviews[0] ? {
        author: reviews[0].author_title,
        rating: reviews[0].review_rating,
        text: reviews[0].review_text?.substring(0, 100) + '...',
        date: reviews[0].review_datetime_utc
      } : null
    })

  } catch (error) {
    console.error('Test failed:', error)
    return NextResponse.json({
      success: false,
      error: 'Network or parsing error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
