import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Blog - 4Dekk Auto Repair',
  description: 'Auto maintenance tips, repair advice, and industry insights from 4Dekk Auto Repair. Stay informed about your vehicle\'s health.',
  keywords: 'auto repair blog, car maintenance tips, vehicle care, automotive advice, 4Dekk blog',
}

const blogPosts = [
  {
    id: 1,
    title: "Essential Car Maintenance Tips for Winter",
    excerpt: "Prepare your vehicle for the cold weather with these essential maintenance tips that will keep you safe on the road.",
    date: "2024-01-15",
    category: "Maintenance",
    readTime: "5 min read",
    image: "/images/hero-image-1.webp"
  },
  {
    id: 2,
    title: "When to Replace Your Brake Pads",
    excerpt: "Learn the signs that indicate it's time to replace your brake pads and why regular brake maintenance is crucial for safety.",
    date: "2024-01-10",
    category: "Brakes",
    readTime: "4 min read",
    image: "/images/brake-repair.webp"
  },
  {
    id: 3,
    title: "The Importance of Regular Oil Changes",
    excerpt: "Discover why regular oil changes are vital for your engine's longevity and performance, and how often you should schedule them.",
    date: "2024-01-05",
    category: "Engine",
    readTime: "6 min read",
    image: "/images/oil-change.webp"
  },
  {
    id: 4,
    title: "Tire Safety: What You Need to Know",
    excerpt: "Everything you need to know about tire safety, including tread depth, pressure, and when to replace your tires.",
    date: "2023-12-28",
    category: "Tires",
    readTime: "7 min read",
    image: "/images/tire-service.webp"
  },
  {
    id: 5,
    title: "Understanding Your Check Engine Light",
    excerpt: "Don't ignore that check engine light! Learn what it means and when you should bring your vehicle in for diagnostics.",
    date: "2023-12-20",
    category: "Diagnostics",
    readTime: "5 min read",
    image: "/images/engine-diagnostics.webp"
  },
  {
    id: 6,
    title: "Summer Car Care: Keeping Your Vehicle Cool",
    excerpt: "Beat the heat with these summer car care tips that will help your vehicle perform its best in hot weather.",
    date: "2023-12-15",
    category: "Maintenance",
    readTime: "4 min read",
    image: "/images/hero-image-1.webp"
  }
]

const categories = [
  { name: "All", count: blogPosts.length },
  { name: "Maintenance", count: 2 },
  { name: "Brakes", count: 1 },
  { name: "Engine", count: 1 },
  { name: "Tires", count: 1 },
  { name: "Diagnostics", count: 1 }
]

export default function BlogPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-dark text-white py-20">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-headings font-bold mb-6">
            Blog
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Auto maintenance tips, repair advice, and industry insights to help you keep your vehicle in top condition.
          </p>
        </div>
      </section>

      {/* Blog Content */}
      <section className="section-dark section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {blogPosts.map((post) => (
                  <article key={post.id} className="card-dark overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    {/* Post Image */}
                    <div className="relative h-48 bg-gray-dark">
                      <div className="absolute inset-0 flex items-center justify-center text-4xl text-gray-400">
                        📝
                      </div>
                    </div>
                    
                    {/* Post Content */}
                    <div className="p-6">
                      {/* Category and Date */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-accent font-medium">{post.category}</span>
                        <span className="text-sm text-gray-400">{post.readTime}</span>
                      </div>
                      
                      {/* Title */}
                      <h2 className="text-xl font-headings font-semibold text-headings mb-3 hover:text-accent transition-colors duration-200">
                        <Link href={`/blog/${post.id}`}>
                          {post.title}
                        </Link>
                      </h2>
                      
                      {/* Excerpt */}
                      <p className="text-text mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      
                      {/* Date */}
                      <div className="text-sm text-gray-400">
                        {new Date(post.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Categories */}
              <div className="card-dark p-6 mb-8">
                <h3 className="text-lg font-headings font-semibold text-headings mb-4">
                  Categories
                </h3>
                <ul className="space-y-2">
                  {categories.map((category) => (
                    <li key={category.name}>
                      <Link
                        href={`/blog?category=${category.name.toLowerCase()}`}
                        className="flex items-center justify-between text-text hover:text-accent transition-colors duration-200"
                      >
                        <span>{category.name}</span>
                        <span className="text-sm text-gray-400">({category.count})</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Newsletter Signup */}
              <div className="bg-gradient-dark text-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-headings font-semibold mb-4">
                  Stay Updated
                </h3>
                <p className="text-gray-200 mb-4">
                  Get the latest auto maintenance tips and repair advice delivered to your inbox.
                </p>
                <form className="space-y-3">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full px-3 py-2 rounded text-gray-darker"
                  />
                  <button type="submit" className="w-full btn-accent">
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-light section-padding">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-headings font-bold text-headings mb-6">
            Need Professional Auto Repair?
          </h2>
          <p className="text-lg text-text mb-8 max-w-2xl mx-auto">
            While our blog provides helpful tips, some repairs require professional expertise. 
            Contact us for quality auto repair services you can trust.
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