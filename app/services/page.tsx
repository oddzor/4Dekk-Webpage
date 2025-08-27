import type { Metadata } from 'next'
import services from '@/data/services.json'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Our Services - 4Dekk Auto Repair',
  description: 'Comprehensive auto repair and maintenance services including tire services, brake repair, oil changes, engine diagnostics, and more.',
  keywords: 'auto repair services, tire services, brake repair, oil change, engine diagnostics, transmission service, AC repair',
}

export default function ServicesPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-dark text-white py-20">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-headings font-bold mb-6">
            Our Services
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Professional auto repair and maintenance services to keep your vehicle running smoothly and safely.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-dark section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.id} className="card-dark overflow-hidden">
                {/* Service Image */}
                <div className="relative h-48 bg-gray-dark">
                  <div className="absolute inset-0 flex items-center justify-center text-6xl">
                    {service.icon}
                  </div>
                </div>
                
                {/* Service Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-headings font-semibold text-headings mb-4">
                    {service.title}
                  </h3>
                  <p className="text-text mb-4">
                    {service.longDescription}
                  </p>
                  
                  {/* Features */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-headings mb-2">Services Include:</h4>
                    <ul className="space-y-1">
                      {service.features.slice(0, 4).map((feature, index) => (
                        <li key={index} className="text-sm text-text flex items-center">
                          <span className="text-accent mr-2">•</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Pricing */}
                  <div className="mb-6">
                    <p className="text-sm text-gray-400">
                      <strong>Pricing:</strong> {service.pricing}
                    </p>
                  </div>
                  
                  {/* CTA */}
                  <Link href="/booking" className="btn-accent w-full text-center">
                    Book This Service
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-dark text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-headings font-bold mb-6">
            Ready to Schedule Your Service?
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Contact us today for a free consultation or to book an appointment. 
            Our team is ready to help keep your vehicle in top condition.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking" className="btn-accent">
              Book Appointment
            </Link>
            <Link href="/contact" className="btn-secondary">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
} 