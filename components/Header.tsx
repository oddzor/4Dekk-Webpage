'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Icon from './Icon'
import LanguageToggle from './LanguageToggle'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Header() {
  const { language } = useLanguage()
  
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

  return (
    <>
      <header className="sticky top-0 z-[50] bg-gray-darker/95 backdrop-blur-sm border-b border-gray-600">
        <nav className="flex items-center justify-between py-4 container-custom">
          {/* Logo */}
          <div className="flex">
            <Link href="/" className="-m-1.5 p-1.5">
              <Image
                src="/images/4dekk-logo-white-red.webp"
                alt="4Dekk Logo"
                width={200}
                height={60}
                className="w-auto h-14"
                priority
              />
            </Link>
          </div>

                  {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-text"
            onClick={openMobileMenu}
          >
            <span className="sr-only">{t.openMenu}</span>
            <Icon name="menu" className={`h-6 w-6 transition-opacity duration-200 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
          </button>
        </div>

          {/* Desktop navigation */}
          <div className="hidden lg:flex lg:gap-x-12">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium transition-colors duration-200 text-text hover:text-accent"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Button and Language Toggle */}
                 <div className="hidden lg:flex lg:items-center lg:gap-4">
                   <LanguageToggle />
                   <Link href="/booking" className="btn-accent whitespace-nowrap min-w-[200px] text-center">
                     {t.bookButton}
                   </Link>
                 </div>
        </nav>
      </header>

      {/* Mobile menu - rendered outside header to avoid positioning conflicts */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            onClick={closeMobileMenu}
          />
          {/* Menu overlay */}
          <div className="fixed inset-y-0 right-0 z-[110] w-80 max-w-[90vw] overflow-y-auto bg-gray-darker px-6 py-6 shadow-2xl border-l border-gray-600 transform transition-all duration-300 ease-in-out">
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
              <button
                type="button"
                className="-m-2.5 rounded-md p-3 text-white bg-gray-800 hover:bg-gray-700 transition-colors duration-200"
                onClick={closeMobileMenu}
              >
                <span className="sr-only">{t.closeMenu}</span>
                <Icon name="close" className="w-6 h-6 text-white" />
              </button>
            </div>
            <div className="flow-root mt-6">
              <div className="-my-6 divide-y divide-gray-600">
                <div className="py-6 space-y-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block px-3 py-2 -mx-3 text-base font-medium rounded-lg text-text hover:bg-gray-dark"
                      onClick={closeMobileMenu}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="py-6 space-y-4">
                  <div className="flex justify-center">
                    <LanguageToggle />
                  </div>
                         <Link
                           href="/booking"
                           className="w-full text-center btn-accent whitespace-nowrap min-w-[200px]"
                           onClick={closeMobileMenu}
                         >
                           {t.bookButton}
                         </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
} 