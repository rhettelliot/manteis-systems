"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Menu, X, ArrowRight, Quote, Lock, Music, HeartPulse, Building2 } from "lucide-react";
import Link from "next/link";

// ─── DESIGN TOKENS ──────────────────────────────────────────────────────────
const C = {
  bg: "#0D0F12",
  surface: "#15181E",
  text: "#F4F3EE",
  signal: "#FF5500",
  blue: "#007AFF",
  green: "#00D455",
  border: "rgba(244, 243, 238, 0.08)",
  borderHi: "rgba(244, 243, 238, 0.16)",
  muted: "rgba(244, 243, 238, 0.50)",
  ghost: "rgba(244, 243, 238, 0.08)",
};

// ─── ANIMATION VARIANTS ───────────────────────────────────────────────────────
const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
};

const fadeIn = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
};

const stagger = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.08 } },
  viewport: { once: true, margin: "-80px" },
};

const staggerItem = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
};

// ─── NAV ─────────────────────────────────────────────────────────────────────
function Nav() {
  const [open, setOpen] = useState(false);
  const links = [
    { label: "Home", href: "/" },
    { label: "Sovereign Node", href: "/sovereign-node" },
    { label: "Products", href: "/products" },
    { label: "Assessment", href: "/assessment" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-between px-6 md:px-10 border-b"
      style={{ background: C.bg, borderColor: C.border }}
    >
      <Link href="/" className="flex items-center gap-3">
        <span className="font-mono text-[11px] tracking-[0.18em] uppercase" style={{ color: C.text }}>
          Manteis
        </span>
        <span className="w-1 h-1" style={{ background: C.signal }} />
        <span className="font-mono text-[11px] tracking-[0.18em] uppercase" style={{ color: C.muted }}>
          Systems
        </span>
      </Link>

      <div className="hidden md:flex items-center gap-8">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="font-body text-[13px] transition-colors hover:text-[#FF5500]"
            style={{ color: C.muted }}
          >
            {l.label}
          </Link>
        ))}
      </div>

      <button
        className="md:hidden"
        style={{ color: C.text }}
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close menu" : "Open menu"}
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      {open && (
        <div
          className="absolute top-14 left-0 right-0 border-b md:hidden"
          style={{ background: C.bg, borderColor: C.border }}
        >
          <div className="flex flex-col px-6 py-4 gap-4">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="font-body text-[15px] transition-colors hover:text-[#FF5500]"
                style={{ color: C.muted }}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

// ─── CASE STUDY DATA ──────────────────────────────────────────────────────────
const CASE_STUDIES = [
  {
    id: "legal",
    sector: "Legal Services",
    icon: Building2,
    accent: C.blue,
    headline: "Sovereign Node deployment eliminated cloud risk and cut AI costs by 60%.",
    problem:
      "A mid-size legal services firm was using cloud-based AI for document review and contract analysis. Every upload created client-confidentiality exposure, vendor-lockin risk, and unpredictable monthly API bills.",
    solution:
      "Manteis deployed a Sovereign Node inside the firm's office: a compact local server running private LLMs, encrypted vector memory, and a document ingestion pipeline connected to their existing document management system.",
    architecture: [
      "Ollama inference server with Llama 3.1 and custom legal fine-tune",
      "ChromaDB vector store for case law and precedent indexing",
      "n8n workflow automation for intake, redaction, and routing",
      "Tailscale mesh VPN for secure partner remote access",
    ],
    results: [
      { v: "60%", l: "Cost reduction vs cloud AI APIs" },
      { v: "0", l: "Documents sent to external providers" },
      { v: "4 hrs", l: "Average time saved per matter intake" },
      { v: "100%", l: "Data remains inside firm walls" },
    ],
    quote:
      "For the first time we can use AI on client work without asking permission from a vendor — or wondering where the data went.",
    attribution: "Managing Partner, Pacific Northwest Legal Firm",
  },
  {
    id: "music",
    icon: Music,
    sector: "Music Production",
    accent: C.signal,
    headline: "Local AI generated album art and tagged metadata — with zero API costs.",
    problem:
      "A boutique music production studio was paying per-image and per-request fees to cloud services for album artwork generation, audio metadata tagging, and catalog search. Costs scaled with every release.",
    solution:
      "A local image-generation workflow using Stable Diffusion XL and a private LLM for metadata extraction, running on a Sovereign Node in the studio. The entire release pipeline now operates without external API calls.",
    architecture: [
      "Local Stable Diffusion XL for cover and promo art",
      "Whisper + local LLM for transcription and metadata tagging",
      "ChromaDB semantic search across the studio catalog",
      "Docker-based pipeline integrated with Ableton and project folders",
    ],
    results: [
      { v: "$0", l: "Monthly AI API spend after deployment" },
      { v: "85%", l: "Reduction in metadata tagging time" },
      { v: "3x", l: "Faster cover art iteration" },
      { v: "100%", l: "Masters stay local during generation" },
    ],
    quote:
      "We generate covers at 2 a.m. without worrying about per-image bills or some cloud provider keeping our masters.",
    attribution: "Studio Director, Independent Label",
  },
  {
    id: "healthcare",
    icon: HeartPulse,
    sector: "Healthcare Practice",
    accent: C.green,
    headline: "HIPAA-compliant local LLM automated patient intake without cloud exposure.",
    problem:
      "A multi-provider healthcare practice needed to automate patient intake, scheduling, and follow-up communications using AI — but HIPAA constraints ruled out every major cloud LLM and SaaS automation platform.",
    solution:
      "Manteis built a HIPAA-aligned Sovereign Node running a local LLM with role-based access, encrypted vector memory, and a consent-aware intake agent. No patient data leaves the practice network.",
    architecture: [
      "Local LLM with Phi-3/Mistral for intake summarization",
      "Encrypted ChromaDB for patient documentation retrieval",
      "n8n workflows with audit logging for scheduling and follow-up",
      "Tailscale ZTNA with device posture for staff remote access",
    ],
    results: [
      { v: "50%", l: "Reduction in intake processing time" },
      { v: "0", l: "PHI bytes sent to cloud providers" },
      { v: "3", l: "Staff hours recovered per day" },
      { v: "Audit-ready", l: "Compliance logging built in" },
    ],
    quote:
      "We finally have an AI intake process our compliance officer doesn't lose sleep over.",
    attribution: "Practice Administrator, Regional Healthcare Group",
  },
];

// ─── HERO ───────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative min-h-[60vh] pt-14 overflow-hidden" style={{ background: C.bg }}>
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `linear-gradient(to right, ${C.border} 1px, transparent 1px)`,
          backgroundSize: "calc(100% / 12) 100%",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto min-h-[calc(60vh-56px)] grid grid-cols-12 gap-0">
        <div
          className="col-span-12 md:col-span-8 flex flex-col justify-center px-6 md:p-10 border-b md:border-b-0 md:border-r"
          style={{ borderColor: C.border }}
        >
          <motion.div {...fadeIn} className="mb-6">
            <span
              className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] uppercase px-3 py-1.5 border"
              style={{ color: C.muted, borderColor: C.border }}
            >
              <span className="w-1.5 h-1.5" style={{ background: C.signal }} />
              Anonymized Client Outcomes
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="font-display font-semibold tracking-[-0.04em] leading-[1.0]"
            style={{ color: C.text, fontSize: "clamp(40px, 6.5vw, 88px)" }}
          >
            Three deployments.
            <br />
            <span style={{ color: C.signal }}>Zero data egress.</span>
          </motion.h1>

          <motion.p
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.2 }}
            className="font-body text-lg md:text-xl leading-[1.6] max-w-[54ch] mt-6 mb-8"
            style={{ color: C.muted }}
          >
            Legal services, music production, and healthcare — each operating sovereign AI on hardware they control.
            Every metric verified. Every client anonymized.
          </motion.p>
        </div>

        <div className="col-span-12 md:col-span-4 flex flex-col">
          <div
            className="flex-1 flex flex-col items-center justify-center px-6 py-10 md:py-0 border-b"
            style={{ borderColor: C.border }}
          >
            <span
              className="font-display font-extralight tracking-[-0.08em] leading-[0.85]"
              style={{ color: C.ghost, fontSize: "clamp(72px, 14vw, 180px)" }}
            >
              03
            </span>
            <span className="font-mono text-[11px] tracking-[0.16em] uppercase mt-3" style={{ color: C.muted }}>
              Published case studies
            </span>
          </div>

          <div className="p-6 md:p-10 flex items-end justify-between">
            <span className="font-body text-[13px] text-right max-w-[120px]" style={{ color: C.muted }}>
              Results in client words
            </span>
            <span className="font-mono text-[10px] tracking-[0.16em] uppercase" style={{ color: C.blue }}>
              2026
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── METRIC TILE ──────────────────────────────────────────────────────────────
function MetricTile({ value, label }: { value: string; label: string }) {
  return (
    <div className="p-5 border-b md:border-b-0 md:border-r last:border-r-0" style={{ borderColor: C.border }}>
      <div className="font-display text-[28px] md:text-[32px] font-semibold tracking-[-0.03em]" style={{ color: C.text }}>
        {value}
      </div>
      <div className="font-mono text-[11px] tracking-[0.04em] mt-2 leading-[1.4]" style={{ color: C.muted }}>
        {label}
      </div>
    </div>
  );
}

// ─── CASE STUDY CARD ──────────────────────────────────────────────────────────
function CaseStudyCard({ study, featured = false }: { study: (typeof CASE_STUDIES)[0]; featured?: boolean }) {
  const Icon = study.icon;

  if (featured) {
    return (
      <motion.div
        {...fadeUp}
        className="col-span-12 md:col-span-7 row-span-2 border p-6 md:p-10 flex flex-col"
        style={{ background: C.surface, borderColor: C.border }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 flex items-center justify-center border" style={{ borderColor: C.border }}>
            <Icon size={18} style={{ color: study.accent }} />
          </div>
          <div>
            <span className="font-mono text-[10px] tracking-[0.16em] uppercase" style={{ color: C.muted }}>
              {study.sector}
            </span>
          </div>
        </div>

        <h2 className="font-display text-[28px] md:text-[36px] font-semibold tracking-[-0.03em] leading-[1.1] mb-6" style={{ color: C.text }}>
          {study.headline}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1">
          <div className="space-y-6">
            <div>
              <span className="font-mono text-[10px] tracking-[0.16em] uppercase block mb-2" style={{ color: C.muted }}>
                Problem
              </span>
              <p className="font-body text-[15px] leading-[1.65]" style={{ color: C.muted }}>
                {study.problem}
              </p>
            </div>
            <div>
              <span className="font-mono text-[10px] tracking-[0.16em] uppercase block mb-2" style={{ color: C.muted }}>
                Solution
              </span>
              <p className="font-body text-[15px] leading-[1.65]" style={{ color: C.muted }}>
                {study.solution}
              </p>
            </div>
            <div>
              <span className="font-mono text-[10px] tracking-[0.16em] uppercase block mb-2" style={{ color: C.muted }}>
                Architecture
              </span>
              <ul className="space-y-2">
                {study.architecture.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 font-body text-[14px] leading-[1.5]" style={{ color: C.text }}>
                    <span className="w-1 h-1 mt-2 shrink-0" style={{ background: study.accent }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col">
            <span className="font-mono text-[10px] tracking-[0.16em] uppercase block mb-4" style={{ color: C.muted }}>
              Results
            </span>
            <div className="grid grid-cols-2 gap-px border" style={{ borderColor: C.border, background: C.border }}>
              {study.results.map((r) => (
                <div key={r.l} className="p-4" style={{ background: C.surface }}>
                  <div className="font-mono text-[24px] md:text-[28px] font-semibold tracking-[-0.03em]" style={{ color: C.text }}>
                    {r.v}
                  </div>
                  <div className="font-mono text-[10px] tracking-[0.04em] mt-2 leading-[1.4]" style={{ color: C.muted }}>
                    {r.l}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 border p-5" style={{ borderColor: C.border }}>
              <Quote size={16} className="mb-3" style={{ color: study.accent }} />
              <p className="font-body text-[15px] leading-[1.65] mb-4" style={{ color: C.text }}>
                "{study.quote}"
              </p>
              <p className="font-mono text-[11px] tracking-[0.04em]" style={{ color: C.muted }}>
                — {study.attribution}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      {...fadeUp}
      className="col-span-12 md:col-span-5 border p-6 md:p-8 flex flex-col"
      style={{ background: C.bg, borderColor: C.border }}
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="w-8 h-8 flex items-center justify-center border" style={{ borderColor: C.border }}>
          <Icon size={18} style={{ color: study.accent }} />
        </div>
        <span className="font-mono text-[10px] tracking-[0.16em] uppercase" style={{ color: C.muted }}>
          {study.sector}
        </span>
      </div>

      <h3 className="font-display text-[22px] md:text-[26px] font-semibold tracking-[-0.03em] leading-[1.15] mb-4" style={{ color: C.text }}>
        {study.headline}
      </h3>

      <p className="font-body text-[14px] leading-[1.6] mb-5" style={{ color: C.muted }}>
        {study.solution}
      </p>

      <div className="grid grid-cols-2 gap-px border mb-5" style={{ borderColor: C.border, background: C.border }}>
        {study.results.map((r) => (
          <div key={r.l} className="p-3" style={{ background: C.bg }}>
            <div className="font-mono text-[20px] font-semibold tracking-[-0.03em]" style={{ color: C.text }}>
              {r.v}
            </div>
            <div className="font-mono text-[10px] tracking-[0.04em] mt-1 leading-[1.3]" style={{ color: C.muted }}>
              {r.l}
            </div>
          </div>
        ))}
      </div>

      <div className="border p-4 mt-auto" style={{ borderColor: C.border }}>
        <Quote size={14} className="mb-2" style={{ color: study.accent }} />
        <p className="font-body text-[14px] leading-[1.6] mb-3" style={{ color: C.text }}>
          "{study.quote}"
        </p>
        <p className="font-mono text-[10px] tracking-[0.04em]" style={{ color: C.muted }}>
          — {study.attribution}
        </p>
      </div>
    </motion.div>
  );
}

// ─── BENTO GRID ───────────────────────────────────────────────────────────────
function BentoGrid() {
  return (
    <section className="relative border-t" style={{ background: C.bg, borderColor: C.border }}>
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-0">
        <div
          className="col-span-12 md:col-span-3 p-6 md:p-10 border-b md:border-b-0 md:border-r"
          style={{ borderColor: C.border }}
        >
          <p className="font-mono text-[10px] tracking-[0.16em] uppercase" style={{ color: C.muted }}>
            Case Studies
          </p>
        </div>
        <div className="col-span-12 md:col-span-9 p-6 md:p-10 border-b" style={{ borderColor: C.border }}>
          <h2
            className="font-display text-[clamp(28px,4vw,52px)] font-semibold leading-[1.0] tracking-[-0.04em]"
            style={{ color: C.text }}
          >
            Problem · Solution · Architecture · Results.
          </h2>
          <p className="font-body text-lg leading-[1.65] max-w-[65ch] mt-4" style={{ color: C.muted }}>
            Each card follows the same structure: the business problem, the sovereign solution, the local architecture, and the verified outcomes.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 md:p-10">
        <div className="grid grid-cols-12 gap-5">
          <CaseStudyCard study={CASE_STUDIES[0]} featured />
          <CaseStudyCard study={CASE_STUDIES[1]} />
          <CaseStudyCard study={CASE_STUDIES[2]} />
        </div>
      </div>
    </section>
  );
}

// ─── CTA ─────────────────────────────────────────────────────────────────────
function CTA() {
  return (
    <section className="relative border-t" style={{ background: C.bg, borderColor: C.border }}>
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `linear-gradient(to right, ${C.border} 1px, transparent 1px)`,
          backgroundSize: "calc(100% / 12) 100%",
        }}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-28">
        <motion.div {...fadeUp} className="max-w-3xl">
          <div className="flex items-center gap-2 mb-5">
            <Lock size={16} style={{ color: C.signal }} />
            <span className="font-mono text-[10px] tracking-[0.18em] uppercase" style={{ color: C.muted }}>
              Sovereignty Audit
            </span>
          </div>
          <h2
            className="font-display text-[clamp(32px,5vw,64px)] font-semibold leading-[1.0] tracking-[-0.04em] mb-6"
            style={{ color: C.text }}
          >
            Book a free Sovereignty Audit.
          </h2>
          <p className="font-body text-lg leading-[1.65] max-w-[55ch] mb-8" style={{ color: C.muted }}>
            In 30 minutes we'll map your highest-risk AI workflows, identify cloud dependencies, and design a local-first alternative that keeps your data where it belongs.
          </p>
          <Link
            href="/assessment"
            className="inline-flex items-center gap-2 font-body text-[15px] font-semibold px-6 py-3.5 transition-colors hover:bg-[#E64D00]"
            style={{ background: C.signal, color: C.bg }}
          >
            Start the Assessment <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="border-t px-6 md:px-10 py-10" style={{ background: C.bg, borderColor: C.border }}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[11px] tracking-[0.18em] uppercase" style={{ color: C.text }}>
            Manteis
          </span>
          <span className="w-1 h-1" style={{ background: C.signal }} />
          <span className="font-mono text-[11px] tracking-[0.18em] uppercase" style={{ color: C.muted }}>
            Systems
          </span>
        </div>

        <div className="flex flex-col md:flex-row gap-4 md:gap-8">
          <span className="font-body text-[13px]" style={{ color: C.muted }}>
            AI Infrastructure Consulting · Seattle, WA
          </span>
          <a
            href="mailto:rhett@manteis.systems"
            className="font-body text-[13px] transition-colors hover:text-[#FF5500]"
            style={{ color: C.muted }}
          >
            rhett@manteis.systems
          </a>
        </div>

        <span className="font-mono text-[11px]" style={{ color: C.muted }}>
          © 2026
        </span>
      </div>
    </footer>
  );
}

// ─── PAGE EXPORT ──────────────────────────────────────────────────────────────
export function CaseStudiesPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden" style={{ background: C.bg }}>
      <Nav />
      <Hero />
      <BentoGrid />
      <CTA />
      <Footer />
    </main>
  );
}
