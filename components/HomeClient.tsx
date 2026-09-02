"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";

const FloatingPriceButton = dynamic(() => import("./FloatingPriceButton"), {
  ssr: false,
});

export default function HomeClient() {
  useEffect(() => {
    const handleHashScroll = () => {
      if (window.location.hash === "#pricing") {
        setTimeout(() => {
          document
            .getElementById("pricing")
            ?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 1000);
      }
    };

    handleHashScroll();
    window.addEventListener("hashchange", handleHashScroll);
    return () => window.removeEventListener("hashchange", handleHashScroll);
  }, []);

  return <FloatingPriceButton />;
}
