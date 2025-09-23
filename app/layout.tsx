import { Inter, Roboto, Oswald } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import FullScreenLoader from "@/components/FullScreenLoader";
import { LanguageProvider } from "@/contexts/LanguageContext";
import dynamic from "next/dynamic";
import type { Metadata } from "next";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import StructuredData from "@/components/StructuredData";
import LocalBusinessSchema from "@/components/LocalBusinessSchema";

const Footer = dynamic(() => import("@/components/Footer"), {
  ssr: false,
});

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
    "dekk service larvik",
    "eu kontroll larvik",
    "hjulskift larvik",
    "bilreparasjon larvik",
    "4dekk larvik",
    "dekkhotell larvik",
    "oljeskift larvik",
    "4hjulskontroll larvik",
    "hjuljustering larvik",
    "balansering larvik",
    "dekkmontering larvik",
    "dekkreparasjon larvik",
    "vinterdekk larvik",
    "sommerdekk larvik",
    "bremse reparasjon larvik",
    "motor diagnostikk larvik",
    "bilservice larvik",
    "verksted larvik",
    "dekk og felg larvik",
    "hjulutbalansering larvik",
    "kamber kontroll larvik",
    "spissing larvik",
    "caster kontroll larvik",
    "oljefilterbytte larvik",
    "luftfilterbytte larvik",
    "feilkode lesing larvik",
    "bilsystemer test larvik",
    "teknisk inspeksjon larvik",
    "feilsøking larvik",
    "deksalg larvik",
    "omlegging og balansering larvik",
    "digital balansering larvik",
    "kontroll av lufttrykk larvik",
    "dekkvask larvik",
    "kontroll av dekkslitasje larvik",
    "vedlikehold larvik",
    "servicepakke larvik",
    "kontroll av væsker larvik",
    "filterbytte larvik",
    "inspeksjon av bremser larvik",
    "hjuloppheng inspeksjon larvik",
    "bilverksted vestfold",
    "dekk service vestfold",
    "eu kontroll vestfold",
    "hjulskift vestfold",
    "bilreparasjon vestfold",
    "4dekk vestfold",
    "dekkhotell vestfold",
    "oljeskift vestfold",
    "4hjulskontroll vestfold",
    "hjuljustering vestfold",
    "balansering vestfold",
    "dekkmontering vestfold",
    "dekkreparasjon vestfold",
    "vinterdekk vestfold",
    "sommerdekk vestfold",
    "bremse reparasjon vestfold",
    "motor diagnostikk vestfold",
    "bilservice vestfold",
    "verksted vestfold",
    "dekk og felg vestfold",
    "hjulutbalansering vestfold",
    "kamber kontroll vestfold",
    "spissing vestfold",
    "caster kontroll vestfold",
    "oljefilterbytte vestfold",
    "luftfilterbytte vestfold",
    "feilkode lesing vestfold",
    "bilsystemer test vestfold",
    "teknisk inspeksjon vestfold",
    "feilsøking vestfold",
    "deksalg vestfold",
    "omlegging og balansering vestfold",
    "digital balansering vestfold",
    "kontroll av lufttrykk vestfold",
    "dekkvask vestfold",
    "kontroll av dekkslitasje vestfold",
    "vedlikehold vestfold",
    "servicepakke vestfold",
    "kontroll av væsker vestfold",
    "filterbytte vestfold",
    "inspeksjon av bremser vestfold",
    "hjuloppheng inspeksjon vestfold",
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
      ? process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "https://4dekk-web.vercel.app"
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
        ? process.env.VERCEL_URL
          ? `https://${process.env.VERCEL_URL}`
          : "https://4dekk-web.vercel.app"
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
        <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ""} />
        <LocalBusinessSchema
          businessName="4Dekk Larvik"
          businessDescription="4Dekk AS i Larvik tilbyr profesjonell bil-og-dekk-service i Larvik. Med over 10 år erfaring og sertifiserte teknikere, kan du forvente kvalitetsarbeid til konkurransedyktige priser."
          businessAddress={{
            streetAddress: "Haakon VII's vei 9",
            addressLocality: "Larvik",
            postalCode: "3269",
            addressCountry: "NO",
          }}
          businessPhone="+47 93 99 55 55"
          businessEmail="4dekk4@gmail.com"
          businessWebsite="https://4dekk.no"
          businessHours={[
            "Monday:08:00-16:00",
            "Tuesday:08:00-16:00",
            "Wednesday:08:00-16:00",
            "Thursday:08:00-16:00",
            "Friday:08:00-16:00",
            "Saturday:Closed",
            "Sunday:Closed",
          ]}
          services={[
            "EU-kontroll",
            "Etterkontroll",
            "4Hjulskontroll",
            "Oljeskift",
            "Diagnose av Bilproblemer",
            "Dekkservice",
            "Hjulskift",
            "Dekkhotell",
            "Reparasjoner av Bil",
            "Generell Service",
            "Bilreparasjon",
            "Bremse Reparasjon",
            "Motor Diagnostikk",
            "Inspeksjon",
            "Dekk og Felg",
            "Balansering",
            "Hjulutbalansering",
            "Dekkmontering",
            "Dekkreparasjon",
            "Vinterdekk",
            "Sommerdekk",
            "Hjuljustering",
            "Kamber kontroll",
            "Spissing",
            "Caster kontroll",
            "Oljefilterbytte",
            "Luftfilterbytte",
            "Feilkode lesing",
            "Bilsystemer test",
            "Teknisk inspeksjon",
            "Feilsøking",
            "Dekksalg",
            "Omlegging og balansering",
            "Digital balansering",
            "Kontroll av lufttrykk",
            "Dekkvask",
            "Kontroll av dekkslitasje",
            "Vedlikehold",
            "Servicepakke",
            "Kontroll av væsker",
            "Filterbytte",
            "Inspeksjon av bremser",
            "Hjuloppheng inspeksjon",
          ]}
          priceRange="$$"
          latitude={59.0533}
          longitude={10.0297}
        />
        <StructuredData
          businessName="4Dekk Larvik"
          businessDescription="4Dekk AS i Larvik tilbyr profesjonell bil-og-dekk-service i Larvik. Med over 10 år erfaring og sertifiserte teknikere, kan du forvente kvalitetsarbeid til konkurransedyktige priser."
          businessAddress={{
            streetAddress: "Haakon VII's vei 9",
            addressLocality: "Larvik",
            postalCode: "3269",
            addressCountry: "NO",
          }}
          businessPhone="+47 93 99 55 55"
          businessEmail="4dekk4@gmail.com"
          businessWebsite="https://4dekk.no"
          businessHours={[
            "Monday:08:00-16:00",
            "Tuesday:08:00-16:00",
            "Wednesday:08:00-16:00",
            "Thursday:08:00-16:00",
            "Friday:08:00-16:00",
            "Saturday:Closed",
            "Sunday:Closed",
          ]}
          services={[
            "EU-kontroll",
            "Etterkontroll",
            "4Hjulskontroll",
            "Oljeskift",
            "Diagnose av Bilproblemer",
            "Dekkservice",
            "Hjulskift",
            "Dekkhotell",
            "Reparasjoner av Bil",
            "Generell Service",
            "Bilreparasjon",
            "Bremse Reparasjon",
            "Motor Diagnostikk",
            "Inspeksjon",
            "Dekk og Felg",
            "Balansering",
            "Hjulutbalansering",
            "Dekkmontering",
            "Dekkreparasjon",
            "Vinterdekk",
            "Sommerdekk",
            "Hjuljustering",
            "Kamber kontroll",
            "Spissing",
            "Caster kontroll",
            "Oljefilterbytte",
            "Luftfilterbytte",
            "Feilkode lesing",
            "Bilsystemer test",
            "Teknisk inspeksjon",
            "Feilsøking",
            "Dekksalg",
            "Omlegging og balansering",
            "Digital balansering",
            "Kontroll av lufttrykk",
            "Dekkvask",
            "Kontroll av dekkslitasje",
            "Vedlikehold",
            "Servicepakke",
            "Kontroll av væsker",
            "Filterbytte",
            "Inspeksjon av bremser",
            "Hjuloppheng inspeksjon",
          ]}
          priceRange="$$"
        />
        <LanguageProvider>
          <FullScreenLoader />
          <Header />
          {children}
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
