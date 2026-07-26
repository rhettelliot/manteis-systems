"use client";

import { useRef } from "react";
import { motion, useInView, useMotionValue, useMotionTemplate } from "motion/react";
import { Search, DraftingCompass, Rocket, ShieldCheck, RotateCcw } from "lucide-react";
import { PacificClock } from "./animations";

const STEPS = [
  {
    number: "01",
    title: "DISCOVER",
    tagline: "MAP THE DRAG",
    desc: "We audit your current stack, workflows, and data flow to find where time leaks, subscriptions accumulate, and sovereignty breaks. Every engagement starts with a clear picture of the real terrain.",
    icon: Search,
    accent: "#0057FF",
    progressColor: "#0057FF",
  },
  {
    number: "02",
    title: "ARCHITECT",
    tagline: "DESIGN THE NODE",
    desc: "We blueprint a Sovereign Node or AI OS Federation tailored to your operation: hardware sizing, model selection, agent topology, vector memory, and zero-trust boundaries.",
    icon: DraftingCompass,
    accent: "#FFD60A",
    progressColor: "#FFD60A",
  },
  {
    number: "03",
    title: "DEPLOY",
    tagline: "LAND ON YOUR HARDWARE",
    desc: "Local inference engine, vector store, agent orchestrator, and MCP tooling are installed on hardware you control. LAN-first by default. API keys optional, never required.",
    icon: Rocket,
    accent: "#00D4A8",
    progressColor: "#00D4A8",
  },
  {
    number: "04",
    title: "HARDEN",
    tagline: "ZERO TRUST, ZERO EGRESS",
    desc: "ZTNA, endpoint protection, full-disk encryption, MDM governance, and human-gated write policies are configured so agents read freely but never write without approval.",
    icon: ShieldCheck,
    accent: "#FF6EC7",
    progressColor: "#FF6EC7",
  },
  {
    number: "05",
    title: "ITERATE",
    tagline: "MEASURE AND EXPAND",
    desc: "We track latency, uptime, time-recovered, and agent accuracy, then expand the federation one department at a time. Continuous improvement without scope creep.",
    icon: RotateCcw,
    accent: "#7AA9FF",
    progressColor: "#7AA9FF",
  },
];

function MetadataStrip({ items }: { items: string[] }) {
  return (
    <div className="meta-strip flex flex-wrap items-center gap-x-6 gap-y-2 py-3 border-y border-cream/[0.06] bg-void-raised/50">
      {items.map((item, i) => (
        <span key={i} className="inline-flex items-center gap-2">
          <span className="w-1 h-1 bg-signal-blue/60" />
          {item}
        </span>
      ))}
    </div>
  );
}

function ProcessCard({
  step,
  index,
}: {
  step: (typeof STEPS)[number];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, { once: true, margin: "-80px" });
  const Icon = step.icon;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const borderX = useMotionTemplate`${x}px`;
  const borderY = useMotionTemplate`${y}px`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 48, scale: 0.96 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.75,
        delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseMove={handleMouseMove}
      className="group relative flex flex-col gap-5 p-6 sm:p-8 bg-[rgba(12,12,12,0.72)] backdrop-blur-[24px] border border-white/[0.08] overflow-hidden cursor-default"
      style={{
        boxShadow: `0 0 0 1px rgba(255,255,255,0.04) inset, 0 24px 80px -24px rgba(0,0,0,0.6)`,
      }}
    >
      {/* Neon edge glow on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(380px circle at ${borderX} ${borderY}, ${step.accent}22 0%, transparent 55%)`,
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: "1px",
        }}
        aria-hidden
      />

      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px] opacity-60 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, transparent, ${step.accent}, transparent)`,
          boxShadow: `0 0 12px ${step.accent}80`,
        }}
        aria-hidden
      />

      {/* Step number watermark */}
      <span
        className="absolute top-2 right-3 font-display text-[clamp(64px,8vw,96px)] font-bold leading-none select-none pointer-events-none"
        style={{ color: step.accent, opacity: 0.06 }}
        aria-hidden
      >
        {step.number}
      </span>

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between">
        <span
          className="font-mono text-[10px] tracking-[0.3em] uppercase"
          style={{ color: step.accent }}
        >
          {step.tagline}
        </span>
        <motion.div
          className="p-2 -mr-2 transition-colors duration-300"
          style={{ color: step.accent }}
          animate={{ rotate: [0, 8, -4, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: index * 0.4 }}
        >
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: `radial-gradient(circle, ${step.accent}25 0%, transparent 70%)`,
            }}
            aria-hidden
          />
          <Icon size={18} />
        </motion.div>
      </div>

      {/* Title */}
      <h3 className="relative z-10 font-display font-bold text-2xl sm:text-3xl tracking-tight text-white">
        {step.title}
        <span style={{ color: step.accent }}>.</span>
      </h3>

      {/* Description */}
      <p className="relative z-10 text-sm text-white/55 leading-relaxed flex-1">
        {step.desc}
      </p>

      {/* Animated progress indicator */}
      <div className="relative z-10 pt-4 border-t border-white/[0.06]">
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-white/45">
            STEP {step.number} / 05
          </span>
          <span className="font-mono text-[9px] tracking-[0.25em] uppercase" style={{ color: step.accent }}>
            {Math.round((parseInt(step.number) / 5) * 100)}%
          </span>
        </div>
        <div className="h-[2px] bg-white/[0.06] overflow-hidden" role="progressbar" aria-valuenow={parseInt(step.number) * 20} aria-valuemin={0} aria-valuemax={100} aria-label={`Step ${step.number} progress`}>
          <motion.div
            className="h-full w-full"
            style={{ background: step.progressColor, transformOrigin: "left" }}
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: parseInt(step.number) / 5 } : {}}
            transition={{ duration: 1.1, delay: 0.2 + index * 0.12, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </div>
    </motion.div>
  );
}

export function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-120px" });

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative px-4 sm:px-8 py-24 md:py-40 border-t border-cream/[0.06] overflow-hidden bg-[#020203]"
    >
      {/* Background HUD grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 87, 255, 0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 87, 255, 0.35) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage: "linear-gradient(to top, black 0%, transparent 70%)",
          WebkitMaskImage: "linear-gradient(to top, black 0%, transparent 70%)",
        }}
        aria-hidden
      />

      <div className="absolute top-4 left-4 sm:left-8 section-number z-0" aria-hidden>
        05
      </div>
      <MetadataStrip
        items={[
          "47.6062N 122.3321W",
          "CONSULTANCY_METHOD",
          "SOVEREIGN_NODE_LIFECYCLE",
          "<PacificClock /> PST",
        ]}
      />

      <div className="relative max-w-6xl mx-auto pt-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-mono text-[8px] sm:text-[9px] tracking-[0.2em] sm:tracking-[0.35em] uppercase text-signal-blue mb-4"
        >
          // CONSULTANCY METHOD · FROM AUDIT TO AUTONOMY
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-bold text-[clamp(32px,6vw,72px)] leading-[0.95] tracking-tight mb-4 max-w-4xl"
        >
          FIVE PHASES
          <br />
          <span className="text-white/55">TO SOVEREIGN OPERATIONS.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-white/55 text-base leading-relaxed max-w-xl mb-12 md:mb-16"
        >
          Every engagement follows the same transparent lifecycle: discover the
          drag, architect the node, deploy on your hardware, harden the perimeter,
          and iterate toward full departmental autonomy.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {STEPS.map((step, i) => (
            <ProcessCard key={step.number} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
