import type { Metadata } from 'next'
import CalendlyWidget from '@/components/CalendlyWidget'

export const metadata: Metadata = {
  title: 'Book an Appointment - 4Dekk Auto Repair',
  description: 'Schedule your auto repair or maintenance appointment online. Quick and easy booking for all your automotive service needs.',
  keywords: 'book appointment, schedule service, auto repair booking, online booking, service appointment',
}

export default function BookingPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="py-20 text-white bg-gradient-dark">
        <div className="text-center container-custom">
          <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl font-headings">
            Book an Appointment
          </h1>
          <p className="max-w-3xl mx-auto text-xl text-gray-200">
            Schedule your auto repair or maintenance service online. Quick, easy, and convenient booking.
          </p>
        </div>
      </section>

      {/* Instructions Section */}
      <section className="section-dark section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12 text-center">
              <h2 className="mb-6 text-3xl font-bold md:text-4xl font-headings text-headings">
                How to Book Your Service
              </h2>
              <p className="text-lg text-text">
                Follow these simple steps to schedule your appointment:
              </p>
            </div>

            {/* Steps */}
            <div className="grid grid-cols-1 gap-8 mb-12 md:grid-cols-3">
              <div className="p-6 text-center card-dark">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 text-2xl font-bold rounded-full bg-accent text-gray-darker">
                  1
                </div>
                <h3 className="mb-3 text-xl font-semibold font-headings text-headings">
                  Select Your Service
                </h3>
                <p className="text-text">
                  Choose from our comprehensive list of auto repair and maintenance services.
                </p>
              </div>
              <div className="p-6 text-center card-dark">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 text-2xl font-bold rounded-full bg-accent text-gray-darker">
                  2
                </div>
                <h3 className="mb-3 text-xl font-semibold font-headings text-headings">
                  Pick Your Time
                </h3>
                <p className="text-text">
                  Select a convenient date and time that works best for your schedule.
                </p>
              </div>
              <div className="p-6 text-center card-dark">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 text-2xl font-bold rounded-full bg-accent text-gray-darker">
                  3
                </div>
                <h3 className="mb-3 text-xl font-semibold font-headings text-headings">
                  Confirm & Arrive
                </h3>
                <p className="text-text">
                  Receive confirmation and bring your vehicle in for service.
                </p>
              </div>
            </div>

            {/* Calendly Booking Widget */}
            <div className="p-8 card-dark">
              <h3 className="mb-6 text-2xl font-semibold text-center font-headings text-headings">
                Schedule Your Appointment
              </h3>
              
              {/* Calendly Widget */}
              <CalendlyWidget url="https://calendly.com/4dekk" />
            </div>
          </div>
        </div>
      </section>

      {/* Service Types Section */}
      <section className="section-light section-padding">
        <div className="container-custom">
          <div className="mb-12 text-center">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl font-headings text-headings">
              Our Service Types
            </h2>
            <p className="max-w-3xl mx-auto text-lg text-text">
              We offer various service types with different durations to accommodate your needs.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="p-6 card-dark">
              <div className="mb-4 text-3xl">🔍</div>
              <h3 className="mb-2 text-xl font-semibold font-headings text-headings">EU Control</h3>
              <p className="mb-3 text-text">Annual vehicle inspection and safety check</p>
              <div className="font-semibold text-accent">Duration: 60 minutes</div>
            </div>
            
            <div className="p-6 card-dark">
              <div className="mb-4 text-3xl">🛞</div>
              <h3 className="mb-2 text-xl font-semibold font-headings text-headings">Tire Change</h3>
              <p className="mb-3 text-text">Quick tire replacement service</p>
              <div className="font-semibold text-accent">Duration: 15-30 minutes</div>
            </div>
            
            <div className="p-6 card-dark">
              <div className="mb-4 text-3xl">🛢️</div>
              <h3 className="mb-2 text-xl font-semibold font-headings text-headings">Oil Change</h3>
              <p className="mb-3 text-text">Complete oil and filter replacement</p>
              <div className="font-semibold text-accent">Duration: 30 minutes</div>
            </div>
            
            <div className="p-6 card-dark">
              <div className="mb-4 text-3xl">🛑</div>
              <h3 className="mb-2 text-xl font-semibold font-headings text-headings">Brake Service</h3>
              <p className="mb-3 text-text">Brake inspection and repair</p>
              <div className="font-semibold text-accent">Duration: 90 minutes</div>
            </div>
            
            <div className="p-6 card-dark">
              <div className="mb-4 text-3xl">🔧</div>
              <h3 className="mb-2 text-xl font-semibold font-headings text-headings">Engine Diagnostics</h3>
              <p className="mb-3 text-text">Computer diagnostics and troubleshooting</p>
              <div className="font-semibold text-accent">Duration: 45 minutes</div>
            </div>
            
            <div className="p-6 card-dark">
              <div className="mb-4 text-3xl">🚨</div>
              <h3 className="mb-2 text-xl font-semibold font-headings text-headings">Emergency Service</h3>
              <p className="mb-3 text-text">Urgent repairs and roadside assistance</p>
              <div className="font-semibold text-accent">Duration: 120 minutes</div>
            </div>
          </div>
        </div>
      </section>

      {/* Alternative Contact Section */}
      <section className="section-light section-padding">
        <div className="text-center container-custom">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl font-headings text-headings">
            Prefer to Call?
          </h2>
          <p className="max-w-2xl mx-auto mb-8 text-lg text-text">
            If you prefer to schedule your appointment over the phone or have questions about our services, 
            we're here to help.
          </p>
          <div className="grid max-w-4xl grid-cols-1 gap-8 mx-auto md:grid-cols-2">
            <div className="p-6 card-dark">
              <div className="mb-4 text-4xl">📞</div>
              <h3 className="mb-3 text-xl font-semibold font-headings text-headings">
                Call Us
              </h3>
              <p className="mb-4 text-text">
                Speak directly with our service advisors
              </p>
              <a href="tel:+15551234567" className="text-xl font-semibold text-accent hover:text-accent-dark">
                (555) 123-4567
              </a>
            </div>
            <div className="p-6 card-dark">
              <div className="mb-4 text-4xl">✉️</div>
              <h3 className="mb-3 text-xl font-semibold font-headings text-headings">
                Email Us
              </h3>
              <p className="mb-4 text-text">
                Send us a message for inquiries
              </p>
              <a href="mailto:service@4dekk.com" className="text-xl font-semibold text-accent hover:text-accent-dark">
                service@4dekk.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Hours & Location */}
      <section className="text-white section-padding bg-gradient-dark">
        <div className="container-custom">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <div>
              <h2 className="mb-6 text-3xl font-bold md:text-4xl font-headings">
                Business Hours
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>8:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>9:00 AM - 2:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>
            <div>
              <h2 className="mb-6 text-3xl font-bold md:text-4xl font-headings">
                Location
              </h2>
              <p className="mb-4 text-gray-200">
                123 Main Street<br />
                City, State 12345
              </p>
              <p className="text-gray-200">
                Easy access from major highways with plenty of parking available.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 