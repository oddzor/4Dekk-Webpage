import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

interface OutscraperReview {
  author_title?: string
  author_image?: string
  review_text?: string
  review_rating?: number
  review_datetime_utc?: string
  review_timestamp?: string
}

interface TransformedReview {
  authorAttribution: {
    displayName: string
    photoUri?: string
  }
  text: {
    text: string
    languageCode: string
  }
  rating: number
  publishTime: string
  relativePublishTimeDescription: string
}

interface CachedReviews {
  reviews: TransformedReview[]
  rating: number
  totalRatings: number
  lastUpdated: string
  expiresAt: string
}

const CACHE_FILE = path.join(process.cwd(), 'data', 'cached-reviews.json')
const CACHE_DURATION_DAYS = 30

export async function GET() {
  try {
    let cachedData: CachedReviews | null = null
    
    try {
      const cacheContent = await fs.readFile(CACHE_FILE, 'utf-8')
      cachedData = JSON.parse(cacheContent)
    } catch {
    }

    const now = new Date()
    const isExpired = !cachedData || new Date(cachedData.expiresAt) < now


    if (!isExpired && cachedData) {
      return NextResponse.json({
        success: true,
        reviews: cachedData.reviews,
        rating: cachedData.rating,
        totalRatings: cachedData.totalRatings,
        cached: true,
        lastUpdated: cachedData.lastUpdated
      })
    }

    
    const placeId = process.env['4DEKK_PLACES_ID'] || 'ChIJ1fptqozARkYRRLwkYKop0Eg'
    const apiKey = process.env.OUTSCRAPER_API_KEY
    
    if (!apiKey) {
      return await fetchFromGooglePlaces(placeId)
    }

    const freshReviews = await fetchFromOutscraper(placeId, apiKey)
    
    const cacheData: CachedReviews = {
      reviews: freshReviews.reviews,
      rating: freshReviews.rating,
      totalRatings: freshReviews.totalRatings,
      lastUpdated: now.toISOString(),
      expiresAt: new Date(now.getTime() + CACHE_DURATION_DAYS * 24 * 60 * 60 * 1000).toISOString()
    }


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

  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    )
  }
}

async function fetchFromOutscraper(placeId: string, apiKey: string) {
  
  const queries = [
    '4Dekk Larvik',
    '4Dekk Haakon VII\'s vei 9 Larvik',
    placeId,
    'ChIJ1fptqozARkYRRLwkYKop0Eg'
  ]
  
  let lastError = null
  
  for (const query of queries) {
    try {
      const url = `https://api.outscraper.com/maps/reviews-v3?query=${encodeURIComponent(query)}&reviewsLimit=250&async=false&language=en`
      
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
          const businessData = data[0]
          const reviews = businessData.reviews_data || []
          
          
          const transformedReviews = reviews.map((review: OutscraperReview) => ({
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
          
          transformedReviews.sort((a: TransformedReview, b: TransformedReview) => {
            const dateA = new Date(a.publishTime)
            const dateB = new Date(b.publishTime)
            return dateB.getTime() - dateA.getTime()
          })
          
          
          return {
            reviews: transformedReviews,
            rating: businessData.rating || 0,
            totalRatings: businessData.reviews_count || transformedReviews.length
          }
        }
      } else {
        const errorText = await response.text()
        lastError = `Query "${query}" failed: ${response.status} - ${errorText}`
      }
    } catch (err) {
      lastError = `Query "${query}" exception: ${err instanceof Error ? err.message : 'Unknown error'}`
    }
  }
  
  throw new Error(`All Outscraper queries failed. Last error: ${lastError}`)
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
  return {
    reviews: data.reviews || [],
    rating: data.rating || 0,
    totalRatings: data.userRatingCount || 0
  }
}

