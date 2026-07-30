import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dekkhotell",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DekkhotellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-text font-body">
      {children}
    </div>
  );
}
