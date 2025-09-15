import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const placeId = searchParams.get('placeId')

  if (!placeId) {
    return NextResponse.json(
      { error: 'Place ID is required' },
      { status: 400 }
    )
  }

  const apiKey = process.env.GOOGLE_PLACES_API_KEY

  if (!apiKey) {
    return NextResponse.json(
      { error: 'Google Places API key not configured' },
      { status: 500 }
    )
  }

  try {
    // Use Places API (New) endpoint
    const response = await fetch(
      `https://places.googleapis.com/v1/places/${placeId}?fields=reviews,rating,userRatingCount&key=${apiKey}`,
      {
        headers: {
          'X-Goog-Api-Key': apiKey,
          'X-Goog-FieldMask': 'reviews,rating,userRatingCount'
        }
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`)
    }

    const data = await response.json()

    // Places API (New) has different response structure
    const reviews = data.reviews || []
    const rating = data.rating || 0
    const totalRatings = data.userRatingCount || 0

    // Sort reviews by publication date (newest first)
    const sortedReviews = reviews.sort((a: any, b: any) => {
      const dateA = new Date(a.publishTime || a.time || 0)
      const dateB = new Date(b.publishTime || b.time || 0)
      return dateB.getTime() - dateA.getTime() // Newest first
    })

    return NextResponse.json({
      success: true,
      reviews: sortedReviews,
      rating,
      totalRatings
    })
  } catch (error) {
    console.error('Error fetching Google reviews:', error)
    return NextResponse.json(
      { 
        error: 'Failed to fetch reviews',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

