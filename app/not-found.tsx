import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: { absolute: "Siden finnes ikke – 4Dekk Larvik" },
  robots: { index: false, follow: true },
  alternates: { canonical: undefined },
};

export default function NotFound() {
  return (
    <section className="flex items-center justify-center min-h-[60vh] text-white bg-gradient-dark">
      <div className="px-4 text-center container-custom">
        <p className="mb-2 text-sm tracking-wide uppercase text-accent">404</p>
        <h1 className="mb-4 text-3xl font-bold md:text-4xl font-headings">
          Denne siden finnes ikke
        </h1>
        <p className="max-w-xl mx-auto mb-8 text-gray-300">
          Siden er kanskje flyttet eller fjernet. Gå tilbake til forsiden, eller
          se oversikten over tjenestene våre i Larvik.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link href="/" className="text-center btn-accent">
            Til forsiden
          </Link>
          <Link href="/tjenester" className="text-center btn-secondary">
            Se tjenester
          </Link>
        </div>
      </div>
    </section>
  );
}
