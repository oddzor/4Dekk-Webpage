"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";

export default function SiteChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/dekkhotell");

  if (isAdminRoute) {
    return <main>{children}</main>;
  }

  return (
    <>
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
