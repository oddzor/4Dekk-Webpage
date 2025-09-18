'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Icon from '../../components/Icon'
import { useLanguage } from '../../contexts/LanguageContext'
import DynamicMetadata from '../../components/DynamicMetadata'
import { getBlogData } from '../../utils/dataLoader'

interface BlogContent {
  type: string
  text?: string
  level?: number
  items?: string[]
  alt?: string
  caption?: string
  src?: string
}

interface BlogArticle {
  id: string
  title: { no: string; en: string }
  excerpt: { no: string; en: string }
  content: { no: BlogContent[]; en: BlogContent[] }
  image: string
  category: { no: string; en: string }
  readTime: string
  publishDate: string
  featured?: boolean
}


export default function BlogPage() {
  const { language } = useLanguage()
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(null)
  const blogArticles = getBlogData()

  const content = {
    no: {
      title: "Blogg",
      description: "Tips om vedlikehold, reparasjoner og generell, nyttig kjøretøykunnskap.",
      subtitle: "Ekspertråd og Tips",
      readMore: "Les Mer",
      readTime: "min lesing",
      publishedOn: "Publisert",
      category: "Kategori",
      backToBlog: "Tilbake til Blogg",
      shareArticle: "Del Artikkel"
    },
    en: {
      title: "Blog",
      description: "Tips about maintenance, repairs and general, useful vehicle knowledge.",
      subtitle: "Expert Advice and Tips",
      readMore: "Read More",
      readTime: "min read",
      publishedOn: "Published",
      category: "Category",
      backToBlog: "Back to Blog",
      shareArticle: "Share Article"
    }
  }
  
  const t = content[language]
  

  const handleArticleClick = (article: BlogArticle) => {
    setSelectedArticle(article)
  }

  const handleBackToBlog = () => {
    setSelectedArticle(null)
  }

  useEffect(() => {
    const handleCloseBlogArticle = () => {
      setSelectedArticle(null)
    }

    window.addEventListener('closeBlogArticle', handleCloseBlogArticle)
    return () => window.removeEventListener('closeBlogArticle', handleCloseBlogArticle)
  }, [])

  const formatContent = (content: BlogContent[]) => {
    return content.map((item, index) => {
      switch (item.type) {
        case 'paragraph':
          return (
            <p key={index} className="mb-4 leading-relaxed text-text">
              {item.text}
            </p>
          )
        case 'heading':
          const level = item.level || 2
          if (level === 2) {
            return (
              <h2 key={index} className="mt-8 mb-4 text-2xl font-bold font-headings text-headings">
                {item.text}
              </h2>
            )
          } else if (level === 3) {
            return (
              <h3 key={index} className="mt-6 mb-3 text-xl font-semibold font-headings text-headings">
                {item.text}
              </h3>
            )
          }
          return (
            <h2 key={index} className="mt-8 mb-4 text-2xl font-bold font-headings text-headings">
              {item.text}
            </h2>
          )
        case 'list':
          return (
            <ul key={index} className="mb-4 ml-6 list-disc text-text">
              {item.items?.map((listItem, listIndex) => (
                <li key={listIndex} className="mb-2 leading-relaxed">
                  {listItem}
                </li>
              ))}
            </ul>
          )
        case 'image':
          return (
            <div key={index} className="my-6">
              <Image
                src={item.src || ''}
                alt={item.alt || ''}
                width={600}
                height={300}
                className="w-full max-w-2xl mx-auto rounded-lg shadow-md"
              />
              {item.caption && (
                <p className="mt-2 text-sm text-center text-gray-600 italic">
                  {item.caption}
                </p>
              )}
            </div>
          )
        default:
          return null
      }
    })
  }

  if (selectedArticle) {
    return (
      <div>
        <DynamicMetadata page="blog" />
        
        <section className="py-20 text-white bg-gradient-dark">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              
              <h1 className="mb-6 text-3xl font-bold md:text-4xl lg:text-5xl font-headings">
                {selectedArticle.title[language]}
              </h1>
              
            </div>
          </div>
        </section>

        <section className="section-light section-padding">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <article className="prose prose-lg max-w-none">
                <div className="text-text">
                  {formatContent(selectedArticle.content[language])}
                </div>
              </article>
              
              <div className="p-8 mt-12 card-dark">
                <h3 className="mb-4 text-xl font-semibold font-headings text-headings">
                  {language === 'no' ? 'Trenger Du Hjelp?' : 'Need Help?'}
                </h3>
                <p className="mb-6 text-text">
                  {language === 'no' 
                    ? 'Har du spørsmål om bilvedlikehold eller trenger profesjonell hjelp? Bestill time eller kontakt oss nå.'
                    : 'Do you have questions about car maintenance or need professional help? Book an appointment or contact us now.'
                  }
                </p>
                <div className="flex flex-col justify-center gap-4 sm:flex-row">
                  <a href="/contact" className="btn-secondary text-center">
                    {language === 'no' ? 'Kontakt Oss' : 'Contact Us'}
                  </a>
                  <a href="/booking" className="btn-accent text-center">
                    {language === 'no' ? 'Bestill Time' : 'Book Appointment'}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <button
          onClick={handleBackToBlog}
          className="fixed z-50 flex items-center gap-2 px-3 py-2 text-sm font-medium text-white transition-all duration-300 ease-in-out transform border rounded-lg shadow-lg opacity-90 top-6 right-16 bg-gray-800/80 hover:bg-gray-700/80 hover:shadow-xl hover:scale-105 backdrop-blur-sm border-gray-600/50 hover:opacity-100 sm:px-4 sm:right-6"
          aria-label={t.backToBlog}
        >
          <Icon name="arrow-left" className="w-4 h-4" />
          <span className="hidden sm:inline">{t.backToBlog}</span>
        </button>
      </div>
    )
  }

  return (
    <div>
      <DynamicMetadata page="blog" />
      
      <section className="py-20 text-white bg-gradient-dark">
        <div className="text-center container-custom">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl font-headings">
            {t.title}
          </h1>
          <p className="max-w-3xl mx-auto text-lg text-gray-300 md:text-xl">
            {t.description}
          </p>
        </div>
      </section>

      <section className="section-light section-padding">
        <div className="container-custom">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-2xl font-bold md:text-3xl font-headings text-headings">
              {t.subtitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3">
            {blogArticles.map((article) => (
              <article 
                key={article.id} 
                className={`group overflow-hidden transition-all duration-300 border border-gray-600 rounded-lg card-dark hover:border-accent hover:shadow-lg hover:shadow-accent/10 cursor-pointer ${
                  article.featured ? 'lg:col-span-2 xl:col-span-1' : ''
                }`}
                onClick={() => handleArticleClick(article)}
              >
                <div className="p-6">
                  <h3 className="mb-3 text-xl font-bold transition-colors duration-200 font-headings text-headings group-hover:text-accent">
                    {article.title[language]}
                  </h3>

                  <p className="mb-4 text-text line-clamp-3">
                    {article.excerpt[language]}
                  </p>

                  <button className="inline-flex items-center gap-2 font-medium transition-colors duration-200 text-accent hover:text-accent/80">
                    {t.readMore}
                    <Icon name="arrow-right" className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </button>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="max-w-2xl p-8 mx-auto card-dark">
              <h3 className="mb-4 text-xl font-semibold font-headings text-headings">
                {language === 'no' ? 'Trenger Du Hjelp?' : 'Need Help?'}
              </h3>
              <p className="mb-6 text-text">
                {language === 'no' 
                  ? 'Har du spørsmål om bilvedlikehold eller trenger profesjonell hjelp? Våre eksperter er her for å hjelpe deg.'
                  : 'Do you have questions about car maintenance or need professional help? Our experts are here to help you.'
                }
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <a href="/contact" className="btn-secondary text-center">
                  {language === 'no' ? 'Kontakt Oss' : 'Contact Us'}
                </a>
                <a href="/booking" className="btn-accent text-center">
                  {language === 'no' ? 'Bestill Time' : 'Book Appointment'}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 