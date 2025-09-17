import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'


export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()
    
    if (password !== process.env.ADMIN_REFRESH_PASSWORD) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const cacheFile = path.join(process.cwd(), 'data', 'cached-reviews.json')
    
    try {
      await fs.unlink(cacheFile)
    } catch {
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

