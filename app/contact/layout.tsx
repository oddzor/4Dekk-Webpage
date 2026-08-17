import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Kontakt Oss - 4Dekk Larvik" },
  description:
    "Kontakt 4Dekk Larvik for bilverksted og dekkservice. Ring 93 99 55 55 eller besøk oss på Haakon VII's vei 9.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
