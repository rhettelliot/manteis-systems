"use client";

import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "motion/react";

interface ChromaGridProps {
  children: React.ReactNode;
  className?: string;
}

export function ChromaGrid({ children, className = "" }: ChromaGridProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const bgX = useMotionTemplate`${x}px`;
  const bgY = useMotionTemplate`${y}px`;

  const borderX = useSpring(bgX, { stiffness: 100, damping: 20 });
  const borderY = useSpring(bgY, { stiffness: 100, damping: 20 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      className={`relative ${className}`}
    >
      {children}

      {/* Animated signal-blue chroma border following cursor */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(500px circle at ${borderX} ${borderY}, rgba(0,87,255,0.55) 0%, transparent 45%)`,
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: "1px",
        }}
        aria-hidden
      />

      {/* Subtle chroma grid lines */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,87,255,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(0,87,255,0.25) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage: "linear-gradient(180deg, transparent 0%, black 20%, black 80%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(180deg, transparent 0%, black 20%, black 80%, transparent 100%)",
        }}
        aria-hidden
      />
    </motion.div>
  );
}

export function ChromaCard({ children, className = "" }: ChromaGridProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const bgX = useMotionTemplate`${x}px`;
  const bgY = useMotionTemplate`${y}px`;
  const borderX = useSpring(bgX, { stiffness: 100, damping: 20 });
  const borderY = useSpring(bgY, { stiffness: 100, damping: 20 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      className={`relative ${className}`}
    >
      {children}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(320px circle at ${borderX} ${borderY}, rgba(0,87,255,0.5) 0%, transparent 50%)`,
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: "1px",
        }}
        aria-hidden
      />
    </motion.div>
  );
}
