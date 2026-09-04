import type { Metadata, Viewport } from "next";
import "./dekkhotell.css";

export const metadata: Metadata = {
  title: "Dekkhotell",
  robots: {
    index: false,
    follow: false,
  },
};

// Internal, login-gated tool (noindex). Lock zoom so the compact mobile
// layout stays put and controls keep a predictable size on phones.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function DekkhotellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dh-theme min-h-[100dvh]">
      {children}
    </div>
  );
}
