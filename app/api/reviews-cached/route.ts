import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

interface CachedReviews {
  reviews: any[]
  rating: number
  totalRatings: number
  lastUpdated: string
  expiresAt: string
}

const CACHE_FILE = path.join(process.cwd(), 'data', 'cached-reviews.json')
const CACHE_DURATION_DAYS = 30 // Refresh monthly

export async function GET(_request: NextRequest) {
  try {
    // Try to read cached reviews first
    let cachedData: CachedReviews | null = null
    
    try {
      const cacheContent = await fs.readFile(CACHE_FILE, 'utf-8')
      cachedData = JSON.parse(cacheContent)
    } catch {
      console.log('No cache file found, will fetch fresh data')
    }

    // Check if cache is still valid
    const now = new Date()
    const isExpired = !cachedData || new Date(cachedData.expiresAt) < now

    if (!isExpired && cachedData) {
      console.log('Returning cached reviews, expires:', cachedData.expiresAt)
      return NextResponse.json({
        success: true,
        reviews: cachedData.reviews,
        rating: cachedData.rating,
        totalRatings: cachedData.totalRatings,
        cached: true,
        lastUpdated: cachedData.lastUpdated
      })
    }

    // Cache expired or doesn't exist - fetch fresh data
    console.log('Cache expired, fetching fresh reviews from Outscraper...')
    
    // Get Place ID from environment variables
    const placeId = process.env['4DEKK_PLACES_ID'] || 'ChIJ1fptqozARkYRRLwkYKop0Eg'
    const apiKey = process.env.OUTSCRAPER_API_KEY
    
    if (!apiKey) {
      // Fallback to Google Places API if Outscraper not configured
      return await fetchFromGooglePlaces(placeId)
    }

    // Outscraper API call (you'll need to implement this)
    const freshReviews = await fetchFromOutscraper(placeId, apiKey)
    
    // Save to cache
    const cacheData: CachedReviews = {
      reviews: freshReviews.reviews,
      rating: freshReviews.rating,
      totalRatings: freshReviews.totalRatings,
      lastUpdated: now.toISOString(),
      expiresAt: new Date(now.getTime() + CACHE_DURATION_DAYS * 24 * 60 * 60 * 1000).toISOString()
    }

    // Ensure data directory exists
    await fs.mkdir(path.dirname(CACHE_FILE), { recursive: true })
    await fs.writeFile(CACHE_FILE, JSON.stringify(cacheData, null, 2))

    return NextResponse.json({
      success: true,
      reviews: freshReviews.reviews,
      rating: freshReviews.rating,
      totalRatings: freshReviews.totalRatings,
      cached: false,
      lastUpdated: cacheData.lastUpdated
    })

  } catch (error) {
    console.error('Error in cached reviews API:', error)
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    )
  }
}

async function fetchFromOutscraper(placeId: string, apiKey: string) {
  console.log('Fetching reviews from Outscraper for place:', placeId)
  
  // Outscraper Google Maps Reviews API endpoint
  const url = `https://api.outscraper.com/maps/reviews-v3?query=${placeId}&reviewsLimit=250&async=false&language=en`
  
  const response = await fetch(url, {
    headers: {
      'X-API-KEY': apiKey,
      'Content-Type': 'application/json'
    }
  })
  
  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Outscraper API error: ${response.status} - ${errorText}`)
  }
  
  const data = await response.json()
  console.log('Outscraper response received:', data.length, 'locations')
  
  if (!data || data.length === 0) {
    throw new Error('No data received from Outscraper')
  }
  
  const businessData = data[0]
  const reviews = businessData.reviews_data || []
  
  // Transform to match your existing format
  const transformedReviews = reviews.map((review: any) => ({
    authorAttribution: {
      displayName: review.author_title || 'Anonymous',
      photoUri: review.author_image || undefined
    },
    text: {
      text: review.review_text || '',
      languageCode: 'en'
    },
    rating: review.review_rating || 5,
    publishTime: review.review_datetime_utc || new Date().toISOString(),
    relativePublishTimeDescription: review.review_timestamp || 'Recently'
  }))
  
  console.log('Transformed reviews:', transformedReviews.length)
  
  return {
    reviews: transformedReviews,
    rating: businessData.rating || 0,
    totalRatings: businessData.reviews_count || 0
  }
}

async function fetchFromGooglePlaces(placeId: string) {
  // Fallback to Google Places API (your existing implementation)
  const apiKey = process.env.GOOGLE_PLACES_API_KEY
  const response = await fetch(
    `https://places.googleapis.com/v1/places/${placeId}?fields=reviews,rating,userRatingCount&key=${apiKey}`,
    {
      headers: {
        'X-Goog-Api-Key': apiKey!,
        'X-Goog-FieldMask': 'reviews,rating,userRatingCount'
      }
    }
  )
  
  const data = await response.json()
  return {
    reviews: data.reviews || [],
    rating: data.rating || 0,
    totalRatings: data.userRatingCount || 0
  }
}

