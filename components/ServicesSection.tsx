import ServiceCard from './ServiceCard'

const featuredServices = [
  {
    title: 'Tire Services',
    description: 'Complete tire services including sales, mounting, balancing, rotation, and repair. All major brands available.',
    icon: '🛞',
    image: '/images/tire-service.webp',
    href: '/services#tires'
  },
  {
    title: 'Brake Repair',
    description: 'Professional brake inspection, repair, and replacement services. Safety is our top priority.',
    icon: '🛑',
    image: '/images/brake-repair.webp',
    href: '/services#brakes'
  },
  {
    title: 'Oil Change',
    description: 'Quick and reliable oil change services with premium quality oils and filters for all vehicle types.',
    icon: '🛢️',
    image: '/images/oil-change.webp',
    href: '/services#oil-change'
  },
  {
    title: 'Engine Diagnostics',
    description: 'Advanced diagnostic services to identify and resolve engine problems quickly and accurately.',
    icon: '🔧',
    image: '/images/engine-diagnostics.webp',
    href: '/services#diagnostics'
  }
]

export default function ServicesSection() {
  return (
    <section className="section-padding section-dark">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-headings font-bold text-headings mb-4">
            Our Services
          </h2>
          <p className="text-lg text-text max-w-3xl mx-auto">
            We provide comprehensive auto repair and maintenance services to keep your vehicle running smoothly and safely.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredServices.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
              image={service.image}
              href={service.href}
            />
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <p className="text-lg text-text mb-6">
            Don't see the service you need? Contact us for a custom quote.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/services" className="btn-primary">
              View All Services
            </a>
            <a href="/booking" className="btn-secondary">
              Book Appointment
            </a>
          </div>
        </div>
      </div>
    </section>
  )
} 