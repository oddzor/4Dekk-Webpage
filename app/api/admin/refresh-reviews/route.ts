import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

// Admin endpoint to manually refresh reviews
// Usage: POST /api/admin/refresh-reviews with admin password

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()
    
    // Simple password protection (use environment variable)
    if (password !== process.env.ADMIN_REFRESH_PASSWORD) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Force refresh by deleting cache file
    const cacheFile = path.join(process.cwd(), 'data', 'cached-reviews.json')
    
    try {
      await fs.unlink(cacheFile)
      console.log('Cache file deleted, next request will fetch fresh data')
    } catch {
      console.log('No cache file to delete')
    }

    return NextResponse.json({
      success: true,
      message: 'Cache cleared, next review request will fetch fresh data'
    })

  } catch {
    return NextResponse.json(
      { error: 'Failed to refresh cache' },
      { status: 500 }
    )
  }
}

