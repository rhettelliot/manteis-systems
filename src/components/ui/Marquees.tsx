"use client";

import { useRef, useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const TERMS = [
  "SOVEREIGN NODE",
  "ZTNA",
  "OLLAMA",
  "MCP",
  "DOCKER",
  "HERMES",
  "TAILSCALE",
  "SOPHOS",
  "AI OS FEDERATION",
  "GIT-AS-BUS",
  "VECTOR STORE",
  "NVIDIA DGX",
];

export function KineticMarquee() {
  const reduced = useReducedMotion();
  const doubled = [...TERMS, ...TERMS];

  return (
    <div className="overflow-hidden border-y border-white/[0.06] py-3 bg-void-raised relative" aria-hidden>
      <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex gap-0 whitespace-nowrap"
        animate={reduced ? {} : { x: ["0%", "-50%"] }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center">
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-cream/55 px-5">
              {item}
            </span>
            <span className="text-signal-blue/40 text-[10px]">◆</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export function DynamicIslandPill() {
  const reduced = useReducedMotion();
  const pillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced) return;
    const states = [
      { label: "SOVEREIGN NODE ONLINE", sub: "8ms · 0 EGRESS", dot: "bg-signal-teal" },
      { label: "AI OS FEDERATION", sub: "5 DEPARTMENTS SYNCED", dot: "bg-signal-blue" },
      { label: "HUMAN-GATED WRITES", sub: "AUTONOMY WITHOUT ANARCHY", dot: "bg-signal-pink" },
      { label: "PACIFIC NODE_01", sub: "47.6062N 122.3321W", dot: "bg-signal-teal" },
    ];
    let i = 0;
    const cycle = () => {
      if (!pillRef.current) return;
      const s = states[i % states.length];
      const label = pillRef.current.querySelector("[data-pill-label]") as HTMLElement | null;
      const sub = pillRef.current.querySelector("[data-pill-sub]") as HTMLElement | null;
      const dot = pillRef.current.querySelector("[data-pill-dot]") as HTMLElement | null;
      if (label) label.textContent = s.label;
      if (sub) sub.textContent = s.sub;
      if (dot) {
        dot.className = `inline-block w-1.5 h-1.5 rounded-full ${s.dot} mr-2`;
      }
      i++;
    };
    cycle();
    const id = setInterval(cycle, 3200);
    return () => clearInterval(id);
  }, [reduced]);

  return (
    <motion.div
      ref={pillRef}
      initial={{ y: -40, opacity: 0, scale: 0.9 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-5 left-1/2 -translate-x-1/2 z-[60] hidden md:flex items-center gap-3 px-4 py-2 rounded-full bg-black/80 backdrop-blur-xl border border-white/[0.08] shadow-[0_0_40px_rgba(0,87,255,0.12)]"
    >
      <span data-pill-dot className="inline-block w-1.5 h-1.5 rounded-full bg-signal-teal mr-2" />
      <div className="flex flex-col items-start">
        <span data-pill-label className="font-mono text-[9px] tracking-[0.18em] uppercase text-cream/90 leading-none">
          SOVEREIGN NODE ONLINE
        </span>
        <span data-pill-sub className="font-mono text-[8px] tracking-[0.12em] uppercase text-cream/40 leading-none mt-1">
          8ms · 0 EGRESS
        </span>
      </div>
    </motion.div>
  );
}

export function ScrollVelocityMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !trackRef.current) return;

    let velocity = 0;
    let lastScroll = 0;
    let raf: number;

    const update = () => {
      const current = window.scrollY;
      velocity = current - lastScroll;
      lastScroll = current;
      const skew = Math.max(-12, Math.min(12, velocity * 0.25));
      const scaleX = velocity > 0 ? 1 + Math.min(0.04, velocity * 0.002) : 1;
      gsap.to(trackRef.current, {
        skewX: skew,
        scaleX,
        duration: 0.4,
        ease: "power2.out",
      });
      raf = requestAnimationFrame(update);
    };

    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  return (
    <div className="overflow-hidden border-y border-white/[0.06] bg-void-raised relative" aria-hidden>
      <div ref={trackRef} className="flex whitespace-nowrap py-4">
        {[...TERMS, ...TERMS, ...TERMS].map((t, i) => (
          <span key={i} className="inline-flex items-center px-6">
            <span className="font-mono text-[clamp(24px,4vw,56px)] font-bold tracking-tighter uppercase text-cream/[0.08]">
              {t}
            </span>
            <span className="ml-6 text-signal-blue/30">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
