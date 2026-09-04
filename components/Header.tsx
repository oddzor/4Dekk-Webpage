"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Icon from "./Icon";
import LanguageToggle from "./LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Header() {
  const { language } = useLanguage();
  const pathname = usePathname();

  const navigation = {
    no: [
      { name: "Hjem", href: "/" },
      { name: "Tjenester", href: "/tjenester" },
      { name: "Om Oss", href: "/about" },
      { name: "Timebestilling", href: "/booking" },
      { name: "Priser", href: "/#pricing" },
      { name: "Kontakt", href: "/contact" },
      { name: "Blogg", href: "/blog" },
    ],
    en: [
      { name: "Home", href: "/" },
      { name: "Services", href: "/tjenester" },
      { name: "About Us", href: "/about" },
      { name: "Book Appointment", href: "/booking" },
      { name: "Prices", href: "/#pricing" },
      { name: "Contact", href: "/contact" },
      { name: "Blog", href: "/blog" },
    ],
  };

  const content = {
    no: {
      openMenu: "Åpne hovedmeny",
      closeMenu: "Lukk meny",
      bookButton: "Bestill Time",
    },
    en: {
      openMenu: "Open main menu",
      closeMenu: "Close menu",
      bookButton: "Book Appointment",
    },
  };
  const t = content[language];
  const navItems = navigation[language];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openMobileMenu = useCallback(() => {
    setMobileMenuOpen(true);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  const isActiveLink = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  const handlePricingClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (href === "/#pricing") {
      if (pathname !== "/") {
        e.preventDefault();
        window.location.href = "/#pricing";
      }
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-[50] backdrop-blur-md transition-all duration-300 ${
          scrolled
            ? "bg-gray-darker/90 border-b border-white/10 shadow-lg shadow-black/30"
            : "bg-gray-darker/70 border-b border-white/5"
        }`}
      >
        <nav
          className={`flex items-center justify-between container-custom transition-all duration-300 ${
            scrolled ? "py-2" : "py-4"
          }`}
        >
          <div className="flex">
            <Link href="/" className="-m-1.5 p-1.5 group">
              <Image
                src="/images/4dekk-logo-white-red.webp"
                alt="4Dekk Logo"
                width={200}
                height={60}
                className={`w-auto transition-all duration-300 group-hover:scale-105 ${
                  scrolled ? "h-11" : "h-14"
                }`}
                priority
              />
            </Link>
          </div>

          <div className="flex items-center gap-1 lg:hidden">
            <a
              href="tel:+4793995555"
              className="inline-flex items-center justify-center p-2.5 rounded-lg text-text hover:text-accent hover:bg-white/5 active:scale-90 transition-all duration-200"
              aria-label={
                language === "no" ? "Ring 4Dekk Larvik" : "Call 4Dekk Larvik"
              }
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
            </a>
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-lg p-2.5 text-text hover:text-accent hover:bg-white/5 active:scale-90 transition-all duration-200"
              onClick={openMobileMenu}
            >
              <span className="sr-only">{t.openMenu}</span>
              <Icon
                name="menu"
                className={`h-6 w-6 transition-all duration-200 ${mobileMenuOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0"}`}
              />
            </button>
          </div>

          <div className="hidden lg:flex lg:gap-x-8">
            {navItems.map((item) => {
              const isActive = isActiveLink(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative inline-block text-sm font-medium transition-all duration-200 group hover:-translate-y-0.5 ${
                    isActive ? "text-accent" : "text-text hover:text-accent"
                  }`}
                  onClick={
                    item.href === "/#pricing"
                      ? (e) => handlePricingClick(e, item.href)
                      : undefined
                  }
                >
                  {item.name}
                  <span
                    className={`absolute -bottom-1.5 left-0 h-0.5 rounded-full bg-accent transition-all duration-300 ease-out ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  ></span>
                </Link>
              );
            })}
          </div>

          <div className="hidden lg:flex lg:items-center lg:gap-3">
            <LanguageToggle />
            <a
              href="tel:+4793995555"
              className="gap-2 text-sm px-5 py-2.5 btn-modern-secondary whitespace-nowrap"
            >
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              Ring oss
            </a>
            <Link
              href="/booking"
              className="text-sm px-5 py-2.5 btn-modern-accent whitespace-nowrap min-w-[180px]"
            >
              {t.bookButton}
            </Link>
          </div>
        </nav>
      </header>

      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm"
            style={{ animation: "fadeInFast 0.2s ease-out" }}
            onClick={closeMobileMenu}
          />
          <div
            className="fixed inset-y-0 right-0 z-[110] w-80 max-w-[90vw] overflow-y-auto bg-gray-darker/95 backdrop-blur-md px-6 py-6 shadow-2xl border-l border-white/10"
            style={{ animation: "drawerIn 0.3s ease-out" }}
          >
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
                  className="-m-2.5 rounded-xl p-3 text-white bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:text-accent active:scale-90 transition-all duration-200 border border-white/10"
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
                    const isActive = isActiveLink(item.href);
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`block px-3 py-2 -mx-3 text-base font-medium rounded-lg transition-all duration-200 ${
                          isActive
                            ? "text-accent bg-accent/10 border-l-4 border-accent"
                            : "text-text hover:bg-gray-dark/50 hover:text-accent"
                        }`}
                        onClick={(e) => {
                          closeMobileMenu();
                          if (item.href === "/#pricing") {
                            handlePricingClick(e, item.href);
                          }
                        }}
                      >
                        {item.name}
                      </Link>
                    );
                  })}
                </div>
                <div className="py-6 space-y-4">
                  <div className="flex justify-center">
                    <a
                      href="tel:+4793995555"
                      className="gap-2 btn-modern-secondary whitespace-nowrap min-w-[200px]"
                      onClick={closeMobileMenu}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                      Ring oss
                    </a>
                  </div>
                  <div className="flex justify-center">
                    <Link
                      href="/booking"
                      className="btn-modern-accent whitespace-nowrap min-w-[200px]"
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
  );
}
