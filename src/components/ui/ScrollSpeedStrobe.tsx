"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from "motion/react";

export function ScrollSpeedStrobe() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  // Derive scroll velocity from progress derivative isn't native, so we approximate
  // by mapping progress to a pulsing intensity. We'll also add a subtle timed pulse.
  const pulse = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [0.08, 0.18, 0.12, 0.22, 0.1]
  );
  const opacity = useSpring(pulse, { stiffness: 100, damping: 20 });

  // Mouse-following radial center
  const mx = useRef(50);
  const my = useRef(50);
  const cx = useRef(50);
  const cy = useRef(50);

  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      mx.current = (e.clientX / window.innerWidth) * 100;
      my.current = (e.clientY / window.innerHeight) * 100;
    };
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const tick = () => {
      cx.current = lerp(cx.current, mx.current, 0.06);
      cy.current = lerp(cy.current, my.current, 0.06);
      if (ref.current) {
        ref.current.style.setProperty("--strobe-x", `${cx.current}%`);
        ref.current.style.setProperty("--strobe-y", `${cy.current}%`);
      }
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <motion.div
      ref={ref}
      className="fixed inset-0 z-[90] pointer-events-none mix-blend-overlay"
      style={{
        opacity,
        background:
          "radial-gradient(circle 55vw at var(--strobe-x, 50%) var(--strobe-y, 50%), rgba(0,87,255,0.35) 0%, rgba(0,87,255,0.08) 40%, transparent 70%)",
      }}
      aria-hidden
    />
  );
}
