import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '4Dekk Auto Repair & Tire Shop',
  description: 'Professional auto repair, tire service, and mechanic services. Quality workmanship, competitive pricing, and exceptional customer service.',
  keywords: 'auto repair, tire service, mechanic, car maintenance, brake service, oil change, auto shop',
  authors: [{ name: '4Dekk Auto Repair' }],
  openGraph: {
    title: '4Dekk Auto Repair & Tire Shop',
    description: 'Professional auto repair, tire service, and mechanic services.',
    type: 'website',
    locale: 'en_US',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&family=Oswald:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className={`${inter.className} font-body text-text bg-background`}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
} 