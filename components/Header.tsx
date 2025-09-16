'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import Icon from './Icon'
import LanguageToggle from './LanguageToggle'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Header() {
  const { language } = useLanguage()
  const pathname = usePathname()

  const navigation = {
    no: [
      { name: 'Hjem', href: '/' },
      { name: 'Om Oss', href: '/about' },
      { name: 'Timebestilling', href: '/booking' },
      { name: 'Priser', href: '/#pricing' },
      { name: 'Kontakt', href: '/contact' },
      { name: 'Blogg', href: '/blog' },
    ],
    en: [
      { name: 'Home', href: '/' },
      { name: 'About Us', href: '/about' },
      { name: 'Book Appointment', href: '/booking' },
      { name: 'Prices', href: '/#pricing' },
      { name: 'Contact', href: '/contact' },
      { name: 'Blog', href: '/blog' },
    ]
  }
  
  const content = {
    no: {
      openMenu: 'Åpne hovedmeny',
      closeMenu: 'Lukk meny',
      bookButton: 'Bestill Time'
    },
    en: {
      openMenu: 'Open main menu',
      closeMenu: 'Close menu',
      bookButton: 'Book Appointment'
    }
  }
  
  const t = content[language]
  const navItems = navigation[language]
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const openMobileMenu = useCallback(() => {
    setMobileMenuOpen(true)
  }, [])

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false)
  }, [])

  // Helper function to check if a link is active
  const isActiveLink = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* Glassmorphism Header with Active Page Detection */}
      <header className="sticky top-0 z-[50] bg-gray-darker/80 backdrop-blur-md border-b border-accent/20">
        <nav className="flex items-center justify-between py-4 container-custom">
          <div className="flex">
            <Link href="/" className="-m-1.5 p-1.5 group">
              <Image
                src="/images/4dekk-logo-white-red.webp"
                alt="4Dekk Logo"
                width={200}
                height={60}
                className="w-auto transition-all duration-300 h-14 group-hover:scale-105"
                priority
              />
            </Link>
          </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-text hover:text-accent transition-colors duration-200"
            onClick={openMobileMenu}
          >
            <span className="sr-only">{t.openMenu}</span>
            <Icon name="menu" className={`h-6 w-6 transition-all duration-200 ${mobileMenuOpen ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'}`} />
          </button>
        </div>

          <div className="hidden lg:flex lg:gap-x-8">
            {navItems.map((item) => {
              const isActive = isActiveLink(item.href)
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="relative text-sm font-medium transition-all duration-200 text-text hover:text-accent group"
                >
                  {item.name}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-accent transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </Link>
              )
            })}
          </div>

                 <div className="hidden lg:flex lg:items-center lg:gap-4">
                   <LanguageToggle />
                   <Link href="/booking" className="btn-accent whitespace-nowrap min-w-[200px] text-center shadow-lg shadow-accent/25 hover:shadow-accent/40 transition-all duration-300">
                     {t.bookButton}
                   </Link>
                 </div>
        </nav>
      </header>

      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div 
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm"
            onClick={closeMobileMenu}
          />
          <div className="fixed inset-y-0 right-0 z-[110] w-80 max-w-[90vw] overflow-y-auto bg-gray-darker/95 backdrop-blur-md px-6 py-6 shadow-2xl border-l border-accent/20 transform transition-all duration-300 ease-in-out">
            <div className="flex items-center justify-between mb-6">
              <Link href="/" className="-m-1.5 p-1.5">
                <Image
                  src="/images/4dekk-logo-white-red.webp"
                  alt="4Dekk Logo"
                  width={140}
                  height={45}
                  className="w-auto h-10"
                  priority
                />
              </Link>
              <div className="flex items-center gap-4">
                <LanguageToggle />
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-3 text-white bg-gray-800/80 backdrop-blur-sm hover:bg-gray-700/80 transition-all duration-200 border border-gray-600/50"
                  onClick={closeMobileMenu}
                >
                  <span className="sr-only">{t.closeMenu}</span>
                  <Icon name="close" className="w-6 h-6 text-white" />
                </button>
              </div>
            </div>
            <div className="flow-root mt-6">
              <div className="-my-6 divide-y divide-gray-600/50">
                <div className="py-6 space-y-2">
                  {navItems.map((item) => {
                    const isActive = isActiveLink(item.href)
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`block px-3 py-2 -mx-3 text-base font-medium rounded-lg transition-all duration-200 ${
                          isActive 
                            ? 'text-accent bg-accent/10 border-l-4 border-accent' 
                            : 'text-text hover:bg-gray-dark/50 hover:text-accent'
                        }`}
                        onClick={closeMobileMenu}
                      >
                        {item.name}
                      </Link>
                    )
                  })}
                </div>
                <div className="py-6 space-y-4">
                  <div className="flex justify-center">
                    <Link
                      href="/booking"
                      className="btn-accent whitespace-nowrap min-w-[200px] text-center shadow-lg shadow-accent/25"
                      onClick={closeMobileMenu}
                    >
                      {t.bookButton}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
} 