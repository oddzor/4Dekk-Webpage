import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const apiKey = process.env.OUTSCRAPER_API_KEY
    const placeId = process.env['4DEKK_PLACES_ID'] || 'ChIJ1fptqozARkYRRLwkYKop0Eg'


    if (!apiKey) {
      return NextResponse.json({
        success: false,
        error: 'OUTSCRAPER_API_KEY not found in environment variables',
        suggestion: 'Add OUTSCRAPER_API_KEY to your .env.local file'
      })
    }

    const queries = [
      placeId,
      '4Dekk Larvik',
      '4Dekk Haakon VII\'s vei 9 Larvik',
      'ChIJ1fptqozARkYRRLwkYKop0Eg'
    ]
    
    let lastError = null
    let successfulData = null
    
    for (const query of queries) {
      try {
        const url = `https://api.outscraper.com/maps/reviews-v3?query=${encodeURIComponent(query)}&reviewsLimit=5&async=false&language=en`
        
        const response = await fetch(url, {
          headers: {
            'X-API-KEY': apiKey,
            'Content-Type': 'application/json'
          }
        })
        
        
        if (response.ok) {
          const responseData = await response.json()
          const data = responseData.data || []
          if (data && data.length > 0) {
            successfulData = { query, data }
            break
          }
        } else {
          const errorText = await response.text()
          lastError = { query, status: response.status, error: errorText }
        }
      } catch (err) {
        lastError = { query, error: err instanceof Error ? err.message : 'Unknown error' }
      }
    }
    
    if (!successfulData) {
      return NextResponse.json({
        success: false,
        error: 'All query attempts failed',
        attempts: queries.map(q => ({ query: q, error: lastError?.query === q ? lastError : 'No error recorded' })),
        lastError
      })
    }
    
    const { query: successfulQuery, data } = successfulData
    

    const businessData = data[0]
    const reviews = businessData?.reviews_data || []

    return NextResponse.json({
      success: true,
      message: '✅ Outscraper API is working!',
      successfulQuery,
      stats: {
        businessName: businessData?.name || 'Unknown',
        totalReviews: businessData?.reviews_count || 0,
        rating: businessData?.rating || 0,
        reviewsSample: reviews.length,
        address: businessData?.full_address || 'Unknown'
      },
      sampleReview: reviews[0] ? {
        author: reviews[0].author_title,
        rating: reviews[0].review_rating,
        text: reviews[0].review_text?.substring(0, 100) + '...',
        date: reviews[0].review_datetime_utc
      } : null
    })

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Network or parsing error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
