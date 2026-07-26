"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Dynamically import all 5 variations
const V1 = dynamic(() => import("./v1/page"));
const V2 = dynamic(() => import("./v2/page"));
const V3 = dynamic(() => import("./v3/page"));
const V4 = dynamic(() => import("./v4/page"));
const V5 = dynamic(() => import("./v5/page"));

const variations = [V1, V2, V3, V4, V5];
const names = [
  "Swiss Science Poster",
  "Vast Quiet", 
  "Dither Mono",
  "Editorial Split",
  "HUD Cartographic",
];

export default function Home() {
  const [picked, setPicked] = useState<number | null>(null);

  useEffect(() => {
    // Pick a random variation on each visit
    setPicked(Math.floor(Math.random() * 5));
  }, []);

  if (picked === null) {
    // Brief loading state — dark canvas, no flash
    return (
      <main className="relative min-h-screen bg-[#0D0F12] flex items-center justify-center">
        <div className="grain" />
        <span className="font-mono text-[11px] text-[#5C6370] tracking-[0.04em] animate-pulse">
          INITIALIZING
        </span>
      </main>
    );
  }

  const Variation = variations[picked];
  return <Variation />;
}