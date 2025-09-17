import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

interface GoogleReview {
  publishTime?: string
  time?: string
  [key: string]: unknown
}

interface CachedReviews {
  reviews: any[]
  rating: number
  totalRatings: number
  lastUpdated: string
  expiresAt: string
}

const CACHE_FILE = path.join(process.cwd(), 'data', 'cached-reviews.json')

export async function GET(request: NextRequest) {
  try {
    // Verify this is a legitimate Vercel cron request
    const authHeader = request.headers.get('authorization')
    const cronSecret = process.env.CRON_SECRET
    
    if (authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json(
        { error: 'Unauthorized - Invalid cron secret' },
        { status: 401 }
      )
    }

    console.log('🔄 Automated monthly refresh triggered')

    // Force refresh by fetching new data
    const placeId = process.env['4DEKK_PLACES_ID'] || 'ChIJ1fptqozARkYRRLwkYKop0Eg'
    const apiKey = process.env.OUTSCRAPER_API_KEY

    if (!apiKey) {
      console.log('⚠️ No Outscraper API key, falling back to Google Places API')
      const freshData = await fetchFromGooglePlaces(placeId)
      await saveToCache(freshData)
      
      return NextResponse.json({
        success: true,
        message: 'Reviews refreshed via Google Places API (backup)',
        reviewCount: freshData.reviews.length,
        timestamp: new Date().toISOString()
      })
    }

    // Fetch fresh data from Outscraper
    const freshData = await fetchFromOutscraper(placeId, apiKey)
    await saveToCache(freshData)

    console.log(`✅ Successfully refreshed ${freshData.reviews.length} reviews`)

    return NextResponse.json({
      success: true,
      message: 'Reviews refreshed successfully',
      reviewCount: freshData.reviews.length,
      source: 'Outscraper',
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('❌ Cron refresh failed:', error)
    
    return NextResponse.json({
      success: false,
      error: 'Refresh failed',
      details: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}

async function saveToCache(data: { reviews: any[], rating: number, totalRatings: number }) {
  const now = new Date()
  const cacheData: CachedReviews = {
    reviews: data.reviews,
    rating: data.rating,
    totalRatings: data.totalRatings,
    lastUpdated: now.toISOString(),
    expiresAt: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days
  }

  // Ensure data directory exists
  await fs.mkdir(path.dirname(CACHE_FILE), { recursive: true })
  await fs.writeFile(CACHE_FILE, JSON.stringify(cacheData, null, 2))
}

async function fetchFromOutscraper(placeId: string, apiKey: string) {
  console.log('🔍 Fetching reviews from Outscraper for automated refresh')
  
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
  
  return {
    reviews: transformedReviews,
    rating: businessData.rating || 0,
    totalRatings: businessData.reviews_count || 0
  }
}

async function fetchFromGooglePlaces(placeId: string) {
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
  
  // Sort by newest first
  const sortedReviews = (data.reviews || []).sort((a: GoogleReview, b: GoogleReview) => {
    const dateA = new Date(a.publishTime || a.time || 0)
    const dateB = new Date(b.publishTime || b.time || 0)
    return dateB.getTime() - dateA.getTime()
  })
  
  return {
    reviews: sortedReviews,
    rating: data.rating || 0,
    totalRatings: data.userRatingCount || 0
  }
}
