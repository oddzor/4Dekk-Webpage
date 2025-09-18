import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json()
    const apiKey = process.env.OUTSCRAPER_API_KEY

    if (!apiKey) {
      return NextResponse.json({
        success: false,
        error: 'OUTSCRAPER_API_KEY not found'
      })
    }

    if (!query) {
      return NextResponse.json({
        success: false,
        error: 'Query parameter required'
      })
    }


    const url = `https://api.outscraper.com/maps/reviews-v3?query=${encodeURIComponent(query)}&reviewsLimit=10&async=false&language=en`
    

    const response = await fetch(url, {
      headers: {
        'X-API-KEY': apiKey,
        'Content-Type': 'application/json'
      }
    })


    if (!response.ok) {
      const errorText = await response.text()
      
      return NextResponse.json({
        success: false,
        error: `Outscraper API error: ${response.status}`,
        details: errorText,
        query: query
      })
    }

    const data = await response.json()

    if (!data || data.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'No businesses found',
        query: query,
        suggestion: 'Try a different search term or check spelling'
      })
    }

    const businesses = data.map((business: any) => ({
      name: business.name,
      address: business.address,
      rating: business.rating,
      reviewCount: business.reviews_count,
      placeId: business.place_id,
      googleUrl: business.google_url,
      hasReviews: (business.reviews_data || []).length > 0,
      sampleReview: business.reviews_data?.[0] ? {
        author: business.reviews_data[0].author_title,
        rating: business.reviews_data[0].review_rating,
        text: business.reviews_data[0].review_text?.substring(0, 100) + '...'
      } : null
    }))

    return NextResponse.json({
      success: true,
      query: query,
      businessesFound: businesses.length,
      businesses: businesses,
      bestMatch: businesses[0] || null,
      recommendation: businesses.length > 0 ? 
        `Use query: "${query}" - Found ${businesses[0].name}` : 
        'Try a different search term'
    })

  } catch {
    return NextResponse.json({
      success: false,
      error: 'Search failed',
      details: 'Unknown error'
    }, { status: 500 })
  }
}
