"use client";

import { useRef, useEffect, useCallback, useMemo } from "react";
import { motion, useReducedMotion } from "motion/react";
import { seededRandom } from "./animations";

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
}

export function MagneticCursorTrail({
  containerRef,
  color = "#0057FF",
  particleCount = 28,
  fadeRate = 0.025,
}: {
  containerRef?: React.RefObject<HTMLElement | null>;
  color?: string;
  particleCount?: number;
  fadeRate?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999, vx: 0, vy: 0, lastX: -9999, lastY: -9999 });
  const rafRef = useRef<number>(0);
  const reduced = useReducedMotion();

  const rand = useMemo(() => seededRandom(2026), []);

  const spawn = useCallback(
    (x: number, y: number, vx: number, vy: number) => {
      const particles = particlesRef.current;
      if (particles.length >= particleCount) particles.shift();
      particles.push({
        id: Math.random(),
        x,
        y,
        vx: vx * 0.15 + (rand() - 0.5) * 1.2,
        vy: vy * 0.15 + (rand() - 0.5) * 1.2 + 0.3,
        life: 1,
        maxLife: 0.6 + rand() * 0.7,
        size: 1 + rand() * 2.5,
      });
    },
    [particleCount, rand]
  );

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = containerRef?.current?.getBoundingClientRect();
      const w = rect?.width ?? window.innerWidth;
      const h = rect?.height ?? window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.scale(dpr, dpr);
    };

    const onMove = (e: MouseEvent) => {
      const rect = containerRef?.current?.getBoundingClientRect();
      const offsetX = rect?.left ?? 0;
      const offsetY = rect?.top ?? 0;
      const x = e.clientX - offsetX;
      const y = e.clientY - offsetY;
      const m = mouseRef.current;
      m.vx = x - m.lastX;
      m.vy = y - m.lastY;
      m.lastX = x;
      m.lastY = y;
      m.x = x;
      m.y = y;
      spawn(x, y, m.vx, m.vy);
    };

    resize();
    window.addEventListener("resize", resize);
    const target = containerRef?.current ?? window;
    target.addEventListener("mousemove", onMove as EventListener);

    let lastSpawn = 0;
    const loop = () => {
      const rect = containerRef?.current?.getBoundingClientRect();
      const w = rect?.width ?? window.innerWidth;
      const h = rect?.height ?? window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life -= fadeRate;
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.96;
        p.vy *= 0.96;
        p.vy += 0.04;

        const alpha = Math.min(1, p.life / p.maxLife) * 0.85;
        const pulse = 1 + Math.sin(Date.now() * 0.008 + p.id * 10) * 0.15;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * pulse, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 87, 255, ${alpha})`;
        ctx.shadowColor = color;
        ctx.shadowBlur = 12 * alpha;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Continuous trail spawn when moving fast
      const m = mouseRef.current;
      const speed = Math.hypot(m.vx, m.vy);
      if (speed > 6 && Date.now() - lastSpawn > 18) {
        spawn(m.x, m.y, m.vx * 0.5, m.vy * 0.5);
        lastSpawn = Date.now();
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", resize);
      target.removeEventListener("mousemove", onMove as EventListener);
      cancelAnimationFrame(rafRef.current);
    };
  }, [color, fadeRate, reduced, containerRef, spawn]);

  if (reduced) return null;
  return (
    <motion.canvas
      ref={canvasRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="absolute inset-0 z-[5] pointer-events-none"
      aria-hidden
    />
  );
}
