import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Om Oss - 4Dekk Larvik" },
  description:
    "Lær mer om 4Dekk Larvik. Erfarne teknikere, moderne utstyr og utmerket kundeservice siden 2014.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
