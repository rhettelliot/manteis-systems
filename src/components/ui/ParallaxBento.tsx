"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion, type MotionValue } from "motion/react";

export function ParallaxBentoGrid({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const zBase = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const zMid = useTransform(scrollYProgress, [0, 1], [30, -90]);
  const zDeep = useTransform(scrollYProgress, [0, 1], [90, -30]);
  const zFar = useTransform(scrollYProgress, [0, 1], [0, -120]);

  const springBase = useSpring(zBase, { stiffness: 60, damping: 20 });
  const springMid = useSpring(zMid, { stiffness: 60, damping: 20 });
  const springDeep = useSpring(zDeep, { stiffness: 60, damping: 20 });
  const springFar = useSpring(zFar, { stiffness: 60, damping: 20 });

  const childrenArray = Array.isArray(children) ? children : [children];
  const springs = [springBase, springMid, springDeep, springFar];

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ perspective: "1200px", perspectiveOrigin: "50% 50%", transformStyle: "preserve-3d" }}
    >
      {childrenArray.map((child, i) => (
        <BentoTile key={i} z={springs[i % springs.length]} reduced={reduced}>
          {child}
        </BentoTile>
      ))}
    </div>
  );
}

function BentoTile({
  children,
  z,
  reduced,
}: {
  children: React.ReactNode;
  z: MotionValue<number>;
  reduced: boolean | null;
}) {
  const rotateX = useTransform(z, (v: number) => v * 0.012);

  return (
    <motion.div
      style={{
        z: reduced ? 0 : z,
        rotateX: reduced ? 0 : rotateX,
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </motion.div>
  );
}

export function Scroll3DTilt({
  children,
  intensity = 1,
}: {
  children: React.ReactNode;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [80 * intensity, -80 * intensity]);
  const z = useTransform(scrollYProgress, [0, 0.5, 1], [-40 * intensity, 40 * intensity, -40 * intensity]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [6 * intensity, -6 * intensity]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.4, 1, 1, 0.4]);

  const springY = useSpring(y, { stiffness: 50, damping: 20 });
  const springZ = useSpring(z, { stiffness: 50, damping: 20 });
  const springRotateX = useSpring(rotateX, { stiffness: 50, damping: 20 });
  const springOpacity = useSpring(opacity, { stiffness: 50, damping: 20 });

  return (
    <motion.div
      ref={ref}
      className="relative"
      style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
    >
      <motion.div
        style={{
          y: reduced ? 0 : springY,
          z: reduced ? 0 : springZ,
          rotateX: reduced ? 0 : springRotateX,
          opacity: reduced ? 1 : springOpacity,
          transformStyle: "preserve-3d",
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
