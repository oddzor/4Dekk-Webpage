import Link from 'next/link'

const quickLinks = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'About', href: '/about' },
  { name: 'Booking', href: '/booking' },
  { name: 'Contact', href: '/contact' },
  { name: 'Blog', href: '/blog' },
]

const socialLinks = [
  { name: 'Facebook', href: '#', icon: '📘' },
  { name: 'Instagram', href: '#', icon: '📷' },
  { name: 'Twitter', href: '#', icon: '🐦' },
  { name: 'YouTube', href: '#', icon: '📺' },
]

export default function Footer() {
  return (
    <footer className="bg-gray-darker text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="mb-4">
              <span className="text-2xl font-headings font-bold text-accent">
                4Dekk
              </span>
              <span className="text-sm ml-1 text-text">Auto Repair</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Professional auto repair and tire services with over 20 years of experience. 
              Quality workmanship, competitive pricing, and exceptional customer service.
            </p>
            <div className="space-y-2 text-sm text-gray-300">
              <p>📍 123 Main Street, City, State 12345</p>
              <p>📞 (555) 123-4567</p>
              <p>✉️ info@4dekk.com</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-headings font-semibold mb-4 text-headings">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-accent transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-headings font-semibold mb-4 text-headings">Follow Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-2xl hover:scale-110 hover:text-accent transition-all duration-200"
                  aria-label={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-600 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>
            © {new Date().getFullYear()} 4Dekk Auto Repair. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
} 