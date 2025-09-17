import { NextRequest, NextResponse } from 'next/server'

interface GoogleReview {
  publishTime?: string
  time?: string
  [key: string]: unknown
}

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

    const reviews = data.reviews || []
    const rating = data.rating || 0
    const totalRatings = data.userRatingCount || 0

    const fiveYearsAgo = new Date()
    fiveYearsAgo.setFullYear(fiveYearsAgo.getFullYear() - 5)
    
    const sortedReviews = reviews.sort((a: GoogleReview, b: GoogleReview) => {
      const dateA = new Date(a.publishTime || a.time || 0)
      const dateB = new Date(b.publishTime || b.time || 0)
      return dateB.getTime() - dateA.getTime()
    })

    return NextResponse.json({
      success: true,
      reviews: sortedReviews,
      rating,
      totalRatings,
      note: 'Limited to 5 reviews by Google Places API'
    })
  } catch (error) {
    return NextResponse.json(
      { 
        error: 'Failed to fetch reviews',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
