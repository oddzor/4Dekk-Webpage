import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Blogg - 4Dekk Auto Repair',
  description: 'Bilvedlikehold tips, reparasjonsråd og bransjeinnsikt fra 4Dekk Auto Repair. Hold deg informert om kjøretøyets helse.',
  keywords: 'bilreparasjon blogg, bilvedlikehold tips, kjøretøypleie, bilråd, 4Dekk blogg',
}

const blogPosts = [
  {
    id: 1,
    title: "Viktige Bilvedlikehold Tips for Vinteren",
    excerpt: "Forbered kjøretøyet ditt på det kalde været med disse viktige vedlikeholdstipsene som vil holde deg trygg på veien.",
    date: "2024-01-15",
    category: "Vedlikehold",
    readTime: "5 min lesing",
    image: "/images/hero-image-1.webp"
  },
  {
    id: 2,
    title: "Når Du Skal Erstatte Bremseklossene",
    excerpt: "Lær tegnene som indikerer at det er tid til å erstatte bremseklossene dine og hvorfor regelmessig bremsevedlikehold er avgjørende for sikkerhet.",
    date: "2024-01-10",
    category: "Bremser",
    readTime: "4 min lesing",
    image: "/images/brake-repair.webp"
  },
  {
    id: 3,
    title: "Viktigheten av Regelmessige Oljeskifter",
    excerpt: "Oppdag hvorfor regelmessige oljeskifter er avgjørende for motorens levetid og ytelse, og hvor ofte du bør bestille dem.",
    date: "2024-01-05",
    category: "Motor",
    readTime: "6 min lesing",
    image: "/images/oil-change.webp"
  },
  {
    id: 4,
    title: "Dekksikkerhet: Det Du Trenger å Vite",
    excerpt: "Alt du trenger å vite om dekk-sikkerhet, inkludert mønsterdybde, trykk og når du skal erstatte dekkene dine.",
    date: "2023-12-28",
    category: "Dekk",
    readTime: "7 min lesing",
    image: "/images/tire-service.webp"
  },
  {
    id: 5,
    title: "Forstå Din Motorvarslingslampe",
    excerpt: "Ikke ignorer den motorvarslingslampen! Lær hva den betyr og når du bør ta med kjøretøyet ditt for diagnostikk.",
    date: "2023-12-20",
    category: "Diagnostikk",
    readTime: "5 min lesing",
    image: "/images/engine-diagnostics.webp"
  },
  {
    id: 6,
    title: "Sommer Bilpleie: Hold Kjøretøyet Ditt Kjølig",
    excerpt: "Slå varmen med disse sommer bilpleietipsene som vil hjelpe kjøretøyet ditt å yte sitt beste i varmt vær.",
    date: "2023-12-15",
    category: "Vedlikehold",
    readTime: "4 min lesing",
    image: "/images/hero-image-1.webp"
  }
]

const categories = [
  { name: "Alle", count: blogPosts.length },
  { name: "Vedlikehold", count: 2 },
  { name: "Bremser", count: 1 },
  { name: "Motor", count: 1 },
  { name: "Dekk", count: 1 },
  { name: "Diagnostikk", count: 1 }
]

export default function BlogPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-dark text-white py-20">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-headings font-bold mb-6">
            Blogg
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Bilvedlikehold tips, reparasjonsråd og bransjeinnsikt for å hjelpe deg med å holde kjøretøyet ditt i toppform.
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
                      <div className="flex items-center mb-3 text-sm text-gray-400">
                        <span>{post.category}</span>
                        <span className="mx-2">•</span>
                        <span>{post.readTime}</span>
                      </div>
                      
                      <h2 className="text-xl font-headings font-semibold text-headings mb-3 line-clamp-2">
                        {post.title}
                      </h2>
                      
                      <p className="text-text mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">
                          {new Date(post.date).toLocaleDateString('nb-NO')}
                        </span>
                        <Link
                          href={`/blog/${post.id}`}
                          className="text-accent hover:text-accent-dark font-medium transition-colors duration-200"
                        >
                          Les Mer →
                        </Link>
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
                  Kategorier
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <Link
                      key={category.name}
                      href={`/blog?category=${category.name.toLowerCase()}`}
                      className="flex items-center justify-between text-text hover:text-accent transition-colors duration-200"
                    >
                      <span>{category.name}</span>
                      <span className="text-sm text-gray-400">({category.count})</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Recent Posts */}
              <div className="card-dark p-6">
                <h3 className="text-lg font-headings font-semibold text-headings mb-4">
                  Siste Innlegg
                </h3>
                <div className="space-y-4">
                  {blogPosts.slice(0, 3).map((post) => (
                    <div key={post.id} className="border-b border-gray-600 pb-4 last:border-b-0">
                      <Link
                        href={`/blog/${post.id}`}
                        className="text-headings hover:text-accent transition-colors duration-200"
                      >
                        <h4 className="font-medium line-clamp-2 mb-1">
                          {post.title}
                        </h4>
                      </Link>
                      <p className="text-sm text-gray-400">
                        {new Date(post.date).toLocaleDateString('nb-NO')}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="section-padding bg-gradient-dark text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-headings font-bold mb-6">
            Hold Deg Oppdatert
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Få de nyeste bilvedlikehold tipsene og nyhetene direkte i innboksen din.
          </p>
          <div className="max-w-md mx-auto">
            <div className="flex gap-4">
              <input
                type="email"
                placeholder="Din e-post adresse"
                className="flex-1 px-4 py-3 rounded-lg text-gray-darker focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <button className="btn-accent px-6 py-3">
                Abonner
              </button>
            </div>
            <p className="text-sm text-gray-300 mt-2">
              Vi respekterer ditt personvern. Avmeld når som helst.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
} 