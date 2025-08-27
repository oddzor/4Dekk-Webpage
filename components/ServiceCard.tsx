'use client'

import Link from 'next/link'
import Image from 'next/image'

interface ServiceCardProps {
  title: string
  description: string
  icon: string
  image?: string
  href: string
}

export default function ServiceCard({ title, description, icon, image, href }: ServiceCardProps) {
  return (
    <div className="overflow-hidden transition-shadow duration-300 card-dark hover:shadow-xl border-glow">
      {/* Image */}
      {image && (
        <div className="relative h-48">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            onError={(e) => {
              // Fallback to icon if image fails to load
              const target = e.target as HTMLImageElement
              target.style.display = 'none'
            }}
          />
        </div>
      )}
      
      {/* Content */}
      <div className="p-6">
        {/* Icon */}
        <div className="flex items-center mb-4">
          <div className="mr-3 text-3xl">{icon}</div>
          <h3 className="text-xl font-semibold font-headings text-headings">{title}</h3>
        </div>
        
        {/* Description */}
        <p className="mb-4 text-text line-clamp-3">{description}</p>
        
        {/* Learn More Link */}
        <Link
          href={href}
          className="inline-flex items-center font-medium transition-colors duration-200 text-accent hover:text-accent-dark"
        >
          Learn More
          <svg
            className="w-4 h-4 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </div>
  )
} 