"use client";

import Link from "next/link";
import { getBusinessData } from "@/utils/dataLoader";
import { useLanguage } from "@/contexts/LanguageContext";

const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/4dekk.no",
    icon: "facebook",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/4dekk/",
    icon: "instagram",
  },
];

export default function Footer() {
  const { language } = useLanguage();
  const businessData = getBusinessData(language);

  const quickLinks = {
    no: [
      { name: "Hjem", href: "/" },
      { name: "Tjenester", href: "/tjenester" },
      { name: "Om Oss", href: "/about" },
      { name: "Bestilling", href: "/booking" },
      { name: "Kontakt", href: "/contact" },
      { name: "Blogg", href: "/blog" },
    ],
    en: [
      { name: "Home", href: "/" },
      { name: "Services", href: "/tjenester" },
      { name: "About Us", href: "/about" },
      { name: "Booking", href: "/booking" },
      { name: "Contact", href: "/contact" },
      { name: "Blog", href: "/blog" },
    ],
  };

  const content = {
    no: {
      quickLinks: "Hurtiglenker",
      contact: "Kontakt",
      hours: "Åpningstider",
      copyright: "Kontakt",
      followUs: "Følg Oss",
      websiteServices: "for nettsidetjenester",
    },
    en: {
      quickLinks: "Quick Links",
      contact: "Contact",
      hours: "Opening Hours",
      copyright: "Contact",
      followUs: "Follow Us",
      websiteServices: "for website services",
    },
  };

  const t = content[language];
  const navLinks = quickLinks[language];
  return (
    <footer className="text-white bg-gray-darker">
      <div className="py-12 container-custom">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="col-span-1 md:col-span-2">
            <p className="max-w-md mb-4 text-gray-300">
              {businessData.description}
            </p>
            <div className="space-y-2 text-sm text-gray-300">
              <p>
                📍 {businessData.address.street},{" "}
                {businessData.address.postalCode} {businessData.address.city}
              </p>
              <p>📞 {businessData.contact.phone}</p>
              <p>✉️ {businessData.contact.email}</p>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold font-headings text-headings">
              {t.quickLinks}
            </h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 transition-colors duration-200 hover:text-accent"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold font-headings text-headings">
              {t.followUs}
            </h3>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-2xl transition-all duration-200 hover:scale-110 hover:text-accent"
                  aria-label={link.name}
                >
                  {link.icon === "facebook" && (
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  )}
                  {link.icon === "instagram" && (
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.244c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.781c-.49 0-.928-.175-1.297-.49-.368-.315-.49-.753-.49-1.243 0-.49.122-.928.49-1.243.369-.315.807-.49 1.297-.49s.928.175 1.297.49c.368.315.49.753.49 1.243 0 .49-.122.928-.49 1.243-.369.315-.807.49-1.297.49z" />
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 mt-8 text-sm text-center text-gray-400 border-t border-gray-600">
          <p>
            © {new Date().getFullYear()} {businessData.name}. {t.copyright}{" "}
            <a
              href="mailto:oddgrimholt@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <strong>oddgrimholt@gmail.com</strong>
            </a>{" "}
            {t.websiteServices}.
          </p>
          <Link
            href="/dekkhotell/login"
            className="inline-block mt-2 text-xs text-gray-600 transition-colors duration-200 hover:text-gray-400"
          >
            Dekkhotell login
          </Link>
        </div>
      </div>
    </footer>
  );
}
