import { NextRequest, NextResponse } from 'next/server'

export async function GET(_request: NextRequest) {
  try {
    const apiKey = process.env.OUTSCRAPER_API_KEY

    if (!apiKey) {
      return NextResponse.json({
        success: false,
        error: 'OUTSCRAPER_API_KEY not found'
      })
    }

    const placeId = process.env['4DEKK_PLACES_ID'] || 'ChIJ1fptqozARkYRRLwkYKop0Eg'

    // Test different search methods for your business
    const searchMethods = [
      {
        name: 'Place ID Search',
        url: `https://api.outscraper.com/maps/reviews-v3?query=${placeId}&reviewsLimit=5&async=false&language=en`
      },
      {
        name: 'Business Name Search',
        url: `https://api.outscraper.com/maps/reviews-v3?query=4Dekk Larvik&reviewsLimit=5&async=false&language=en`
      },
      {
        name: 'Business Name + Location',
        url: `https://api.outscraper.com/maps/reviews-v3?query=4Dekk Haakon VII's vei 9 Larvik&reviewsLimit=5&async=false&language=en`
      }
    ]

    const results = []

    for (const method of searchMethods) {
      console.log(`🔍 Testing: ${method.name}`)
      console.log(`📡 URL: ${method.url}`)

      try {
        const response = await fetch(method.url, {
          headers: {
            'X-API-KEY': apiKey,
            'Content-Type': 'application/json'
          }
        })

        console.log(`📊 ${method.name} - Status:`, response.status)

        if (response.ok) {
          const data = await response.json()
          console.log(`📋 ${method.name} - Data:`, JSON.stringify(data, null, 2))
          
          results.push({
            method: method.name,
            success: true,
            data: data,
            businessFound: data && data.length > 0,
            businessName: data?.[0]?.name || 'Not found',
            reviewCount: data?.[0]?.reviews_count || 0,
            rating: data?.[0]?.rating || 0
          })
        } else {
          const errorText = await response.text()
          console.log(`❌ ${method.name} - Error:`, errorText)
          
          results.push({
            method: method.name,
            success: false,
            error: `HTTP ${response.status}: ${errorText}`
          })
        }
      } catch (error) {
        console.log(`💥 ${method.name} - Exception:`, error)
        results.push({
          method: method.name,
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        })
      }

      // Small delay between requests
      await new Promise(resolve => setTimeout(resolve, 500))
    }

    // Find the best result
    const successfulResults = results.filter(r => r.success && r.businessFound)
    const bestResult = successfulResults.find(r => r.reviewCount > 0) || successfulResults[0]

    return NextResponse.json({
      success: true,
      message: 'Search tests completed',
      bestMatch: bestResult || null,
      allResults: results,
      recommendations: [
        'Try the method that found your business',
        'If no method worked, verify your business is on Google Maps',
        'Check if your business name spelling is correct'
      ]
    })

  } catch (error) {
    console.error('Search test failed:', error)
    return NextResponse.json({
      success: false,
      error: 'Test failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
