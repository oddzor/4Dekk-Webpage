import { Inter, Roboto, Oswald } from "next/font/google";
import "./globals.css";
import SiteChrome from "@/components/SiteChrome";
import { LanguageProvider } from "@/contexts/LanguageContext";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
});
const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-oswald",
});

export const metadata: Metadata = {
  title: {
    default: "4Dekk Larvik - Bilverksted og Dekkservice",
    template: "%s | 4Dekk Larvik",
  },
  description:
    "Profesjonell bilverksted og dekkservice i Larvik. EU-kontroll, reparasjoner, hjulskift og mer. Kvalitetsarbeid til konkurransedyktige priser.",
  keywords: [
    "bilverksted larvik",
    "dekk service",
    "eu kontroll",
    "hjulskift",
    "bilreparasjon",
    "4dekk",
  ],
  authors: [{ name: "4Dekk Larvik" }],
  creator: "4Dekk Larvik",
  publisher: "4Dekk Larvik",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_SITE_URL || "https://4dekk.no"
      : "http://localhost:3000",
  ),
  alternates: {
    canonical: "/",
    languages: {
      no: "/",
      en: "/?lang=en",
    },
  },
  openGraph: {
    title: "4Dekk Larvik - Bilverksted og Dekkservice",
    description:
      "Profesjonell bilverksted og dekkservice i Larvik. Kvalitetsarbeid til konkurransedyktige priser.",
    url:
      process.env.NODE_ENV === "production"
        ? process.env.NEXT_PUBLIC_SITE_URL || "https://4dekk.no"
        : "http://localhost:3000",
    siteName: "4Dekk Larvik",
    locale: "no_NO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "4Dekk Larvik - Bilverksted og Dekkservice",
    description:
      "Profesjonell bilverksted og dekkservice i Larvik. Kvalitetsarbeid til konkurransedyktige priser.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="no">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="icon"
          href="/favicon-16x16.png"
          sizes="16x16"
          type="image/png"
        />
        <link
          rel="icon"
          href="/favicon-32x32.png"
          sizes="32x32"
          type="image/png"
        />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <style
          dangerouslySetInnerHTML={{
            __html: `
            body { 
              font-family: var(--font-roboto), -apple-system, BlinkMacSystemFont, sans-serif;
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
              font-family: var(--font-oswald), -apple-system, BlinkMacSystemFont, sans-serif;
              font-weight: 600;
              color: #ffffff;
            }
            .font-body { font-family: var(--font-roboto), -apple-system, BlinkMacSystemFont, sans-serif; }
            .container-custom { padding-left: 1rem; padding-right: 1rem; margin: 0 auto; max-width: 80rem; }
            @media (min-width: 640px) { .container-custom { padding-left: 1.5rem; padding-right: 1.5rem; } }
            @media (min-width: 1024px) { .container-custom { padding-left: 2rem; padding-right: 2rem; } }
          `,
          }}
        />
      </head>
      <body
        className={`${inter.className} ${roboto.variable} ${oswald.variable} font-body text-text bg-background`}
      >
        <LanguageProvider>
          <SiteChrome>{children}</SiteChrome>
        </LanguageProvider>
      </body>
    </html>
  );
}
