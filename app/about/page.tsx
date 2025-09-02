import type { Metadata } from 'next'
import { BuildingOfficeIcon, WrenchScrewdriverIcon, UserGroupIcon, HeartIcon } from '@heroicons/react/24/outline'

export const metadata: Metadata = {
  title: 'Om Oss - 4Dekk AS',
  description: 'Lær om 4Dekk AS\'s 10 års erfaring, vårt team av sertifiserte teknikere, og vårt engasjement for kvalitets bilreparasjonstjenester.',
  keywords: 'om 4Dekk, bilreparasjon historie, sertifiserte teknikere, bilreparasjon team, oppdrag verdier',
}

const teamMembers = [
  {
    name: "Saulius Sumskis",
    position: "Daglig Leder og Mekaniker",
    bio: "lorem ipsum dolor sit amet",
    photo: "/images/team/saulius.jpg"
  },
  {
    name: "Henrikas Niedvaras",
    position: "Mekaniker",
    bio: "lorem ipsum dolor sit amet",
    photo: "/images/team/mike.jpg"
  },
  {
    name: "Elidijus Pimpe",
    position: "Mekaniker",
    bio: "lorem ipsum dolor sit amet",
    photo: "/images/team/sarah.jpg"
  },
  {
    name: "Odd Grimholt",
    position: "Dekkspesialist",
    bio: "lorem ipsum dolor sit amet",
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
            Om Oss
          </h1>
        </div>
      </section>

      {/* History Section */}
      <section className="section-light section-padding">
        <div className="container-custom">
          <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 text-3xl font-bold md:text-4xl font-headings text-headings">
                Vår Historie
              </h2>
              <p className="mb-6 text-lg leading-relaxed text-text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem deleniti repellendus necessitatibus at tempora! Vitae cumque ea voluptas blanditiis tenetur voluptatum minus dignissimos labore sapiente dolorum esse pariatur, atque accusamus?    
              </p>
              <p className="mb-6 text-lg leading-relaxed text-text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem deleniti repellendus necessitatibus at tempora! Vitae cumque ea voluptas blanditiis tenetur voluptatum minus dignissimos labore sapiente dolorum esse pariatur, atque accusamus? 
              </p>
              <p className="text-lg leading-relaxed text-text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem deleniti repellendus necessitatibus at tempora! Vitae cumque ea voluptas blanditiis tenetur voluptatum minus dignissimos labore sapiente dolorum esse pariatur, atque accusamus?  
              </p>
            </div>
            <div className="relative">
              <div className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden shadow-xl card-dark">
                <div className="absolute inset-0 flex items-center justify-center bg-gray-dark">
                  <div className="text-center text-gray-400">
                    <BuildingOfficeIcon className="w-24 h-24 mx-auto mb-4" />
                    <div className="text-lg">Verksted Historie Bilde</div>
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
              Vårt Oppdrag & Verdier
            </h2>
            <p className="max-w-3xl mx-auto text-lg text-text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem deleniti repellendus necessitatibus at tempora! Vitae cumque ea voluptas blanditiis tenetur voluptatum minus dignissimos labore sapiente dolorum esse pariatur, atque accusamus? 
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="p-6 text-center card-dark">
              <div className="mb-4 text-accent">
                <HeartIcon className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="mb-4 text-xl font-semibold font-headings text-headings">Ærlighet & Integritet</h3>
              <p className="text-text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem deleniti repellendus necessitatibus at tempora! Vitae cumque ea voluptas blanditiis tenetur voluptatum minus dignissimos labore sapiente dolorum esse pariatur, atque accusamus? 
              </p>
            </div>
            <div className="p-6 text-center card-dark">
              <div className="mb-4 text-accent">
                <WrenchScrewdriverIcon className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="mb-4 text-xl font-semibold font-headings text-headings">Kvalitetsarbeid</h3>
              <p className="text-text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem deleniti repellendus necessitatibus at tempora! Vitae cumque ea voluptas blanditiis tenetur voluptatum minus dignissimos labore sapiente dolorum esse pariatur, atque accusamus? 
              </p>
            </div>
            <div className="p-6 text-center card-dark">
              <div className="mb-4 text-accent">
                <UserGroupIcon className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="mb-4 text-xl font-semibold font-headings text-headings">Kundefokus</h3>
              <p className="text-text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem deleniti repellendus necessitatibus at tempora! Vitae cumque ea voluptas blanditiis tenetur voluptatum minus dignissimos labore sapiente dolorum esse pariatur, atque accusamus? 
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
              Møt Vårt Team
            </h2>
            <p className="max-w-3xl mx-auto text-lg text-text">
              Vårt erfarne team av sertifiserte teknikere, servicerådgivere og dekkspesialister er dedikert til å gi deg den beste opplevelsen i Larvik.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member, index) => (
              <div key={index} className="p-6 text-center card-dark">
                <div className="relative w-48 h-48 mx-auto mb-6 overflow-hidden rounded-full bg-gray-dark">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    <UserGroupIcon className="w-16 h-16" />
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
            Opplev 4Dekk-forskjellen
          </h2>
          <p className="max-w-2xl mx-auto mb-8 text-xl text-gray-200">
            Bli med tusenvis av fornøyde kunder som stoler på oss med sine kjøretøy. 
            Kontakt oss i dag for å bestille din neste service.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <a href="/booking" className="btn-accent">
              Bestill Time
            </a>
            <a href="/contact" className="btn-secondary">
              Kontakt Oss
            </a>
          </div>
        </div>
      </section>
    </div>
  )
} 