import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Blogg - 4Dekk Larvik" },
  description:
    "Tips om vedlikehold, reparasjoner og generell, nyttig kjøretøykunnskap fra 4Dekk Larvik.",
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
