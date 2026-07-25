"use client";

import { useRef, useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export function SpringStaggerReveal({
  children,
  className = "",
  stagger = 0.12,
  delay = 0.1,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !ref.current) return;
    const items = ref.current.children;
    if (!items.length) return;

    gsap.set(items, { opacity: 0, y: 40, scale: 0.96 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ref.current,
        start: "top 80%",
        end: "top 30%",
        toggleActions: "play none none reverse",
      },
    });

    tl.to(items, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.9,
      stagger,
      delay,
      ease: "back.out(1.2)",
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === ref.current) st.kill();
      });
    };
  }, [reduced, stagger, delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export function SpringBentoGrid({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !ref.current) return;
    const items = ref.current.children;
    if (!items.length) return;

    gsap.set(items, { opacity: 0, y: 60, scale: 0.94, rotateX: 8 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ref.current,
        start: "top 82%",
        toggleActions: "play none none none",
      },
    });

    tl.to(items, {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      duration: 1,
      stagger: {
        each: 0.14,
        from: "start",
        grid: "auto",
      },
      ease: "elastic.out(1, 0.65)",
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === ref.current) st.kill();
      });
    };
  }, [reduced]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}

export function CurtainReveal({
  children,
  className = "",
  direction = "up",
}: {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "left" | "right";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !ref.current) return;
    const el = ref.current;

    const initialClip =
      direction === "up"
        ? "inset(100% 0 0 0)"
        : direction === "left"
        ? "inset(0 100% 0 0)"
        : "inset(0 0 0 100%)";

    const finalClip = "inset(0 0 0 0)";

    gsap.set(el, { clipPath: initialClip, opacity: 1 });

    const tween = gsap.to(el, {
      clipPath: finalClip,
      duration: 1.2,
      ease: "power3.inOut",
      scrollTrigger: {
        trigger: el,
        start: "top 75%",
        toggleActions: "play none none none",
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
    };
  }, [reduced, direction]);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: reduced ? 1 : 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}
