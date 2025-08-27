'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function AboutSection() {
  return (
    <section className="section-padding section-light">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-headings font-bold text-headings mb-6">
              About 4Dekk Auto Repair
            </h2>
            <p className="text-lg text-text mb-6 leading-relaxed">
              For over 20 years, 4Dekk Auto Repair has been the trusted choice for automotive services in our community. 
              We started as a small family-owned shop with a simple mission: to provide honest, reliable, and affordable 
              auto repair services to our neighbors.
            </p>
            <p className="text-lg text-text mb-8 leading-relaxed">
              Today, we've grown into a full-service automotive repair facility, but we've never lost sight of our roots. 
              Our team of certified technicians combines decades of experience with the latest diagnostic equipment to 
              ensure your vehicle receives the best care possible.
            </p>
            
            {/* Key Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="flex items-center">
                <div className="text-accent text-2xl mr-3">✅</div>
                <span className="text-text">Certified Technicians</span>
              </div>
              <div className="flex items-center">
                <div className="text-accent text-2xl mr-3">✅</div>
                <span className="text-text">Quality Guarantee</span>
              </div>
              <div className="flex items-center">
                <div className="text-accent text-2xl mr-3">✅</div>
                <span className="text-text">Competitive Pricing</span>
              </div>
              <div className="flex items-center">
                <div className="text-accent text-2xl mr-3">✅</div>
                <span className="text-text">Emergency Service</span>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/about" className="btn-primary">
                Learn More
              </Link>
              <Link href="/contact" className="btn-secondary">
                Contact Us
              </Link>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden shadow-xl card-dark">
              <Image
                src="/images/about-shop.jpg"
                alt="4Dekk Auto Repair shop interior"
                fill
                className="object-cover"
                onError={(e) => {
                  // Fallback to a placeholder if image fails to load
                  const target = e.target as HTMLImageElement
                  target.style.display = 'none'
                  target.parentElement!.style.backgroundColor = '#1a1a1a'
                  target.parentElement!.innerHTML = `
                    <div class="flex items-center justify-center h-full text-gray-400">
                      <div class="text-center">
                        <div class="text-6xl mb-4">🏗️</div>
                        <div class="text-lg">Shop Image</div>
                      </div>
                    </div>
                  `
                }}
              />
            </div>
            
            {/* Experience Badge */}
            <div className="absolute -bottom-6 -left-6 bg-accent text-gray-darker px-6 py-4 rounded-lg shadow-lg">
              <div className="text-2xl font-headings font-bold">20+</div>
              <div className="text-sm">Years of Experience</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 