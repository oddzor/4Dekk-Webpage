import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us - 4Dekk Auto Repair',
  description: 'Get in touch with 4Dekk Auto Repair. Contact us for questions, quotes, or to schedule your next service appointment.',
  keywords: 'contact 4Dekk, auto repair contact, service quote, appointment scheduling, customer service',
}

const contactMethods = [
  {
    title: "General Inquiries",
    description: "Questions about our services, pricing, or general information",
    email: "info@4dekk.com",
    icon: "📧",
    color: "bg-gradient-to-r from-blue-600 to-blue-700"
  },
  {
    title: "Service Appointments",
    description: "Schedule repairs, maintenance, or diagnostic services",
    email: "service@4dekk.com",
    icon: "🔧",
    color: "bg-gradient-to-r from-green-600 to-green-700"
  },
  {
    title: "Emergency Repairs",
    description: "Urgent repairs, roadside assistance, or emergency situations",
    email: "emergency@4dekk.com",
    icon: "🚨",
    color: "bg-gradient-to-r from-red-600 to-red-700"
  },
  {
    title: "Parts & Equipment",
    description: "Tire sales, parts inquiries, or equipment questions",
    email: "parts@4dekk.com",
    icon: "🛞",
    color: "bg-gradient-to-r from-purple-600 to-purple-700"
  },
  {
    title: "Commercial Fleet Services",
    description: "Fleet maintenance, commercial accounts, or business partnerships",
    email: "fleet@4dekk.com",
    icon: "🚛",
    color: "bg-gradient-to-r from-orange-600 to-orange-700"
  },
  {
    title: "Customer Support",
    description: "Complaints, feedback, or customer service issues",
    email: "support@4dekk.com",
    icon: "💬",
    color: "bg-gradient-to-r from-teal-600 to-teal-700"
  }
]

export default function ContactPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-dark text-white py-20">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-headings font-bold mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Get in touch with us for questions, quotes, or to schedule your next service appointment.
          </p>
        </div>
      </section>

      {/* Contact Methods Grid */}
      <section className="section-dark section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-headings font-bold text-headings mb-6">
              How Can We Help You?
            </h2>
            <p className="text-lg text-text max-w-3xl mx-auto">
              Choose the appropriate contact method based on your needs. We have dedicated email addresses 
              for different types of inquiries to ensure you get the fastest response.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => (
              <div key={index} className="card-dark p-6 hover:border-glow transition-all duration-300">
                <div className={`${method.color} w-16 h-16 rounded-full flex items-center justify-center text-2xl mb-4 mx-auto`}>
                  {method.icon}
                </div>
                <h3 className="text-xl font-headings font-semibold text-headings mb-3 text-center">
                  {method.title}
                </h3>
                <p className="text-text mb-4 text-center">
                  {method.description}
                </p>
                <div className="text-center">
                  <a 
                    href={`mailto:${method.email}`}
                    className="text-accent hover:text-accent-dark font-semibold transition-colors duration-200"
                  >
                    {method.email}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Phone & Address Section */}
      <section className="section-light section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Phone Contact */}
            <div className="card-dark p-8">
              <h2 className="text-3xl font-headings font-bold text-headings mb-6">
                Call Us Directly
              </h2>
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="text-accent text-3xl mr-4">📞</div>
                  <div>
                    <h3 className="font-headings font-semibold text-headings mb-1">Main Office</h3>
                    <a href="tel:+15551234567" className="text-accent hover:text-accent-dark text-xl font-semibold">
                      (555) 123-4567
                    </a>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="text-accent text-3xl mr-4">🚨</div>
                  <div>
                    <h3 className="font-headings font-semibold text-headings mb-1">Emergency Service</h3>
                    <a href="tel:+15551234568" className="text-accent hover:text-accent-dark text-xl font-semibold">
                      (555) 123-4568
                    </a>
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-600">
                  <h3 className="font-headings font-semibold text-headings mb-2">Business Hours</h3>
                  <div className="text-text space-y-1">
                    <div>Monday - Friday: 8:00 AM - 6:00 PM</div>
                    <div>Saturday: 9:00 AM - 4:00 PM</div>
                    <div>Sunday: Closed</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Address & Location */}
            <div className="card-dark p-8">
              <h2 className="text-3xl font-headings font-bold text-headings mb-6">
                Visit Our Shop
              </h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="text-accent text-3xl mr-4 mt-1">📍</div>
                  <div>
                    <h3 className="font-headings font-semibold text-headings mb-2">Address</h3>
                    <p className="text-text">
                      123 Main Street<br />
                      City, State 12345
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-accent text-3xl mr-4 mt-1">🚗</div>
                  <div>
                    <h3 className="font-headings font-semibold text-headings mb-2">Parking</h3>
                    <p className="text-text">
                      Free parking available on-site with easy access from major highways.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-accent text-3xl mr-4 mt-1">🚌</div>
                  <div>
                    <h3 className="font-headings font-semibold text-headings mb-2">Public Transit</h3>
                    <p className="text-text">
                      Convenient access via bus and train routes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Response Time Section */}
      <section className="section-dark section-padding">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-headings font-bold text-headings mb-6">
            What to Expect
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="card-dark p-6">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-headings font-semibold text-headings mb-3">Quick Response</h3>
              <p className="text-text">
                We typically respond to emails within 2-4 hours during business hours.
              </p>
            </div>
            <div className="card-dark p-6">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-headings font-semibold text-headings mb-3">Specialized Support</h3>
              <p className="text-text">
                Each email address is monitored by experts in that specific area of service.
              </p>
            </div>
            <div className="card-dark p-6">
              <div className="text-4xl mb-4">📋</div>
              <h3 className="text-xl font-headings font-semibold text-headings mb-3">Detailed Information</h3>
              <p className="text-text">
                Include your vehicle details and service needs for faster, more accurate responses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-dark text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-headings font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Don't wait until it's too late. Contact us today to schedule your next maintenance or repair service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/booking" className="btn-accent">
              Book Appointment
            </a>
            <a href="tel:+15551234567" className="btn-secondary">
              Call Now
            </a>
          </div>
        </div>
      </section>
    </div>
  )
} 