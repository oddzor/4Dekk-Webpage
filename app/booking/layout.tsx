import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Bestill Time - 4Dekk Larvik" },
  description:
    "Bestill time for bilverksted eller dekkservice hos 4Dekk Larvik. Enkel online booking.",
  alternates: {
    canonical: "/booking",
  },
};

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
