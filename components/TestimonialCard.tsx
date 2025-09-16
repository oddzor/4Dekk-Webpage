'use client'

import Image from 'next/image'

interface TestimonialCardProps {
  quote: string
  name: string
  photo?: string
  rating?: number
  title?: string
}

export default function TestimonialCard({ quote, name, photo, rating, title }: TestimonialCardProps) {
  return (
    <div className="p-6 card-dark md:p-8">
      {rating && (
        <div className="flex mb-4">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-5 h-5 ${
                i < rating ? 'text-accent' : 'text-gray-600'
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      )}

      <blockquote className="mb-6 text-lg italic text-text">
        &ldquo;{quote}&rdquo;
      </blockquote>

      <div className="flex items-center">
        {photo && (
          <div className="relative w-12 h-12 mr-4 overflow-hidden rounded-full">
            <Image
              src={photo}
              alt={name}
              fill
              className="object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.style.display = 'none'
              }}
            />
          </div>
        )}
        <div>
          <div className="font-semibold text-headings">{name}</div>
          {title && <div className="text-sm text-gray-400">{title}</div>}
        </div>
      </div>
    </div>
  )
} 