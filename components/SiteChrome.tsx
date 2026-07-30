"use client";

import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import Header from "./Header";
import FullScreenLoader from "./FullScreenLoader";

const Footer = dynamic(() => import("./Footer"), {
  ssr: false,
});

export default function SiteChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/dekkhotell");

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <FullScreenLoader />
      <Header />
      {children}
      <Footer />
    </>
  );
}
