"use client";

import { useState } from "react";
import Icon from "./Icon";

interface LazyMapEmbedProps {
  src: string;
  title: string;
  height?: number | string;
  className?: string;
  buttonLabel?: string;
}

/**
 * Google Maps' embed iframe pulls in 400-700KB of render-blocking JS
 * (maps.googleapis.com/.../main.js, places.js, util.js, ...) the moment it
 * loads, which competes with the main thread for seconds on mobile and
 * tanks LCP even when the iframe itself has `loading="lazy"` (the native
 * lazy-load distance threshold is generous enough to fire on initial load
 * for a section that isn't far below the fold).
 *
 * This renders a lightweight click-to-load facade instead, so the map
 * (and all of its JS) is only fetched once a visitor actually wants it.
 */
export default function LazyMapEmbed({
  src,
  title,
  height = 300,
  className = "",
  buttonLabel = "Vis kart",
}: LazyMapEmbedProps) {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <iframe
        src={src}
        title={title}
        width="100%"
        height="100%"
        style={{ height, border: 0 }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        className={className}
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setLoaded(true)}
      style={{ height }}
      className={`flex w-full flex-col items-center justify-center gap-2 bg-gray-dark text-text transition-colors hover:bg-gray-dark/80 ${className}`}
      aria-label={buttonLabel}
    >
      <Icon name="map" className="w-8 h-8 text-accent" />
      <span className="font-medium">{buttonLabel}</span>
    </button>
  );
}
