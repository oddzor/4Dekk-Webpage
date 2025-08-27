'use client'

import Link from 'next/link'

export default function ContactSection() {
  return (
    <section className="section-padding section-light">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-headings font-bold text-headings mb-6">
              Get In Touch
            </h2>
            <p className="text-lg text-text mb-8">
              Ready to schedule your next service? Contact us today for a free consultation 
              or to book an appointment.
            </p>

            {/* Contact Details */}
            <div className="space-y-6 mb-8">
              <div className="flex items-start">
                <div className="text-accent text-2xl mr-4 mt-1">📍</div>
                <div>
                  <h3 className="font-headings font-semibold text-headings mb-1">Address</h3>
                  <p className="text-text">
                    123 Main Street<br />
                    City, State 12345
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="text-accent text-2xl mr-4 mt-1">📞</div>
                <div>
                  <h3 className="font-headings font-semibold text-headings mb-1">Phone</h3>
                  <a href="tel:+15551234567" className="text-accent hover:text-accent-dark transition-colors duration-200">
                    (555) 123-4567
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="text-accent text-2xl mr-4 mt-1">✉️</div>
                <div>
                  <h3 className="font-headings font-semibold text-headings mb-1">Email</h3>
                  <a href="mailto:info@4dekk.com" className="text-accent hover:text-accent-dark transition-colors duration-200">
                    info@4dekk.com
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="text-accent text-2xl mr-4 mt-1">🕒</div>
                <div>
                  <h3 className="font-headings font-semibold text-headings mb-1">Hours</h3>
                  <p className="text-text">
                    Monday - Friday: 8:00 AM - 6:00 PM<br />
                    Saturday: 9:00 AM - 4:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="btn-primary">
                Contact Us
              </Link>
              <Link href="/booking" className="btn-secondary">
                Book Appointment
              </Link>
            </div>
          </div>

          {/* Map */}
          <div className="relative">
            <div className="card-dark overflow-hidden">
              <div className="h-96 lg:h-[500px] relative">
                {/* Google Maps Embed */}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.2219901290355!2d-74.00369368400567!3d40.71312937933185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a23e28c1191%3A0x49f75d3281df052a!2s150%20Park%20Row%2C%20New%20York%2C%20NY%2010007!5e0!3m2!1sen!2sus!4v1640995200000!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="4Dekk Auto Repair Location"
                  onError={(e) => {
                    // Fallback if map fails to load
                    const target = e.target as HTMLIFrameElement
                    target.style.display = 'none'
                    target.parentElement!.innerHTML = `
                      <div class="flex items-center justify-center h-full bg-gray-800 text-gray-400">
                        <div class="text-center">
                          <div class="text-6xl mb-4">🗺️</div>
                          <div class="text-lg">Map Loading...</div>
                          <div class="text-sm mt-2">123 Main Street, City, State 12345</div>
                        </div>
                      </div>
                    `
                  }}
                />
              </div>
            </div>

            {/* Map Overlay Info */}
            <div className="absolute top-4 left-4 bg-gray-darker/90 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-gray-600">
              <div className="text-sm">
                <div className="font-headings font-semibold text-headings">4Dekk Auto Repair</div>
                <div className="text-text">123 Main Street</div>
                <div className="text-text">City, State 12345</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 