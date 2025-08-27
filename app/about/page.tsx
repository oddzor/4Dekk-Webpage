import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us - 4Dekk Auto Repair',
  description: 'Learn about 4Dekk Auto Repair\'s 20+ years of experience, our team of certified technicians, and our commitment to quality auto repair services.',
  keywords: 'about 4Dekk, auto repair history, certified technicians, auto repair team, mission values',
}

const teamMembers = [
  {
    name: "John Smith",
    position: "Owner & Master Technician",
    bio: "With over 25 years of experience in automotive repair, John leads our team with expertise and dedication to quality workmanship.",
    photo: "/images/team/john.jpg"
  },
  {
    name: "Mike Johnson",
    position: "Senior Technician",
    bio: "Mike specializes in engine diagnostics and electrical systems. His attention to detail ensures every repair is done right the first time.",
    photo: "/images/team/mike.jpg"
  },
  {
    name: "Sarah Davis",
    position: "Service Advisor",
    bio: "Sarah ensures every customer receives personalized attention and clear communication throughout their service experience.",
    photo: "/images/team/sarah.jpg"
  },
  {
    name: "David Wilson",
    position: "Tire Specialist",
    bio: "David is our go-to expert for all tire-related services, from sales to mounting and balancing.",
    photo: "/images/team/david.jpg"
  }
]

export default function AboutPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="py-20 text-white bg-gradient-dark">
        <div className="text-center container-custom">
          <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl font-headings">
            About Us
          </h1>
          <p className="max-w-3xl mx-auto text-xl text-gray-200">
            Serving our community with honest, reliable auto repair services for over 20 years.
          </p>
        </div>
      </section>

      {/* History Section */}
      <section className="section-light section-padding">
        <div className="container-custom">
          <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 text-3xl font-bold md:text-4xl font-headings text-headings">
                Our Story
              </h2>
              <p className="mb-6 text-lg leading-relaxed text-text">
                4Dekk Auto Repair was founded in 2003 by John Smith, a certified master technician with a vision to provide 
                honest, reliable, and affordable auto repair services to our community. What started as a small family-owned 
                shop has grown into a full-service automotive repair facility, but we've never lost sight of our roots.
              </p>
              <p className="mb-6 text-lg leading-relaxed text-text">
                Over the past 20+ years, we've built our reputation on trust, quality workmanship, and exceptional customer 
                service. We've served thousands of customers and maintained their vehicles with the same care and attention 
                we would give our own family's cars.
              </p>
              <p className="text-lg leading-relaxed text-text">
                Today, our team of certified technicians continues to uphold the values that made us successful: honesty, 
                integrity, and a commitment to doing the job right the first time.
              </p>
            </div>
            <div className="relative">
              <div className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden shadow-xl card-dark">
                <div className="absolute inset-0 flex items-center justify-center bg-gray-dark">
                  <div className="text-center text-gray-400">
                    <div className="mb-4 text-6xl">🏗️</div>
                    <div className="text-lg">Shop History Image</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section-dark section-padding">
        <div className="container-custom">
          <div className="mb-16 text-center">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl font-headings text-headings">
              Our Mission & Values
            </h2>
            <p className="max-w-3xl mx-auto text-lg text-text">
              We're committed to providing exceptional auto repair services while building lasting relationships with our customers.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center card-dark p-6">
              <div className="mb-4 text-4xl">🤝</div>
              <h3 className="mb-4 text-xl font-semibold font-headings text-headings">Honesty & Integrity</h3>
              <p className="text-text">
                We believe in transparent communication and honest assessments. You'll never be pressured into unnecessary repairs.
              </p>
            </div>
            <div className="text-center card-dark p-6">
              <div className="mb-4 text-4xl">🔧</div>
              <h3 className="mb-4 text-xl font-semibold font-headings text-headings">Quality Workmanship</h3>
              <p className="text-text">
                Our certified technicians use the latest equipment and follow manufacturer specifications for every repair.
              </p>
            </div>
            <div className="text-center card-dark p-6">
              <div className="mb-4 text-4xl">👥</div>
              <h3 className="mb-4 text-xl font-semibold font-headings text-headings">Customer Focus</h3>
              <p className="text-text">
                Your satisfaction is our priority. We treat every customer like family and stand behind our work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-light section-padding">
        <div className="container-custom">
          <div className="mb-16 text-center">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl font-headings text-headings">
              Meet Our Team
            </h2>
            <p className="max-w-3xl mx-auto text-lg text-text">
              Our experienced team of certified technicians and service advisors is dedicated to providing you with the best auto repair experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center card-dark p-6">
                <div className="relative w-48 h-48 mx-auto mb-6 overflow-hidden bg-gray-dark rounded-full">
                  <div className="absolute inset-0 flex items-center justify-center text-4xl text-gray-400">
                    👤
                  </div>
                </div>
                <h3 className="mb-2 text-xl font-semibold font-headings text-headings">
                  {member.name}
                </h3>
                <p className="mb-4 font-medium text-accent">
                  {member.position}
                </p>
                <p className="text-sm text-text">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-white section-padding bg-gradient-dark">
        <div className="text-center container-custom">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl font-headings">
            Experience the 4Dekk Difference
          </h2>
          <p className="max-w-2xl mx-auto mb-8 text-xl text-gray-200">
            Join thousands of satisfied customers who trust us with their vehicles. 
            Contact us today to schedule your next service.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <a href="/booking" className="btn-accent">
              Book Appointment
            </a>
            <a href="/contact" className="btn-secondary">
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  )
} 