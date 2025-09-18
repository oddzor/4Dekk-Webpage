import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import FullScreenLoader from '@/components/FullScreenLoader'
import FontLoader from '@/components/FontLoader'
import { LanguageProvider } from '@/contexts/LanguageContext'
import dynamic from 'next/dynamic'

const Footer = dynamic(() => import('@/components/Footer'), {
  ssr: false
})

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="no">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-16x16.png" sizes="16x16" type="image/png" />
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script src="/task-breaker.js" defer></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            if ('scheduler' in window && 'postTask' in window.scheduler) {
              window.scheduler.postTask(() => {
                if ('serviceWorker' in navigator) {
                  navigator.serviceWorker.register('/sw.js')
                    .catch(() => {});
                }
              }, { priority: 'background' });
            } else if ('serviceWorker' in navigator) {
              window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                  .catch(() => {});
              });
            }
          `
        }} />
        <style dangerouslySetInnerHTML={{
          __html: `
            body { 
              font-family: 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif;
              line-height: 1.6; 
              background-color: #0f0f23; 
              color: #e0e0e0; 
              margin: 0; 
              padding: 0;
            }
            .hero-critical { 
              background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
              min-height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
              position: relative;
            }
            .text-shadow-lg { text-shadow: 2px 4px 8px rgba(0,0,0,0.7); }
            .font-headings { 
              font-family: 'Oswald', -apple-system, BlinkMacSystemFont, sans-serif;
              font-weight: 600;
              color: #ffffff;
            }
            .font-body { font-family: 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif; }
            .container-custom { padding-left: 1rem; padding-right: 1rem; margin: 0 auto; max-width: 80rem; }
            @media (min-width: 640px) { .container-custom { padding-left: 1.5rem; padding-right: 1.5rem; } }
            @media (min-width: 1024px) { .container-custom { padding-left: 2rem; padding-right: 2rem; } }
          `
        }} />
      </head>
      <body className={`${inter.className} font-body text-text bg-background`}>
        <LanguageProvider>
          <FontLoader />
          <FullScreenLoader />
          <Header />
          {children}
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  )
} 