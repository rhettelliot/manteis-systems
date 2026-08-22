"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Menu, X, ArrowRight, Check, Cpu, Workflow, Database, Lock, Network, Container, ChevronDown, HelpCircle, Server } from "lucide-react";
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
    { label: "Overview", href: "#overview" },
    { label: "Architecture", href: "#architecture" },
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
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
          <a
            key={l.label}
            href={l.href}
            className="font-body text-[13px] transition-colors hover:text-[#FF5500]"
            style={{ color: C.muted }}
          >
            {l.label}
          </a>
        ))}
      </div>

      <Link
        href="/assessment"
        className="hidden md:inline-flex font-mono text-[11px] tracking-wide uppercase px-4 py-2 border transition-colors hover:border-[#FF5500] hover:text-[#FF5500]"
        style={{ color: C.muted, borderColor: C.border }}
      >
        Audit
      </Link>

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
              <a
                key={l.label}
                href={l.href}
                className="font-body text-[15px] transition-colors hover:text-[#FF5500]"
                style={{ color: C.muted }}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            ))}
            <Link
              href="/assessment"
              className="font-body text-[15px] transition-colors hover:text-[#FF5500]"
              style={{ color: C.muted }}
              onClick={() => setOpen(false)}
            >
              Audit
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

// ─── HERO ───────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section id="overview" className="relative min-h-screen pt-14 overflow-hidden" style={{ background: C.bg }}>
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `linear-gradient(to right, ${C.border} 1px, transparent 1px)`,
          backgroundSize: "calc(100% / 12) 100%",
        }}
      />
      <div
        className="absolute top-[62%] left-0 right-0 h-px pointer-events-none"
        style={{ background: `rgba(255, 85, 0, 0.15)` }}
      />

      <div className="relative z-10 max-w-7xl mx-auto min-h-[calc(100vh-56px)] grid grid-cols-12 gap-0">
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
              Manteis Systems · Sovereign Node
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="font-display font-light tracking-[-0.04em] leading-[0.9]"
            style={{ color: C.text, fontSize: "clamp(48px, 11vw, 152px)" }}
          >
            Sovereign
            <br />
            <span style={{ color: C.signal }}>Node.</span>
          </motion.h1>

          <motion.p
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.3 }}
            className="font-body text-lg md:text-xl leading-[1.6] max-w-[54ch] mt-8 mb-10"
            style={{ color: C.muted }}
          >
            Your AI. Your hardware. Zero egress. A local-first appliance for private LLMs, agent orchestration,
            vector memory, and zero-trust access — no cloud subscriptions required.
          </motion.p>

          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8"
          >
            <Link
              href="/assessment"
              className="inline-flex items-center gap-2 font-body text-[15px] font-semibold px-6 py-3.5 transition-colors hover:bg-[#E64D00]"
              style={{ background: C.signal, color: C.bg }}
            >
              Book a Sovereignty Audit <ArrowRight size={16} />
            </Link>
            <a
              href="#pricing"
              className="font-mono text-[12px] tracking-wide uppercase transition-colors hover:text-[#FF5500]"
              style={{ color: C.muted }}
            >
              View pricing →
            </a>
          </motion.div>
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
              01
            </span>
            <span className="font-mono text-[11px] tracking-[0.16em] uppercase mt-3" style={{ color: C.muted }}>
              Private AI Appliance
            </span>
          </div>

          <div className="p-6 md:p-10 border-b" style={{ borderColor: C.border }}>
            <p className="font-mono text-[10px] tracking-[0.16em] uppercase mb-4" style={{ color: C.muted }}>
              Specification
            </p>
            <div className="grid grid-cols-2 gap-y-4 gap-x-6">
              {[
                { k: "Inference", v: "Ollama · vLLM" },
                { k: "Memory", v: "ChromaDB · Qdrant" },
                { k: "Agents", v: "n8n · MCP" },
                { k: "Network", v: "Tailscale ZTNA" },
              ].map((row) => (
                <div key={row.k} className="flex flex-col">
                  <span className="font-mono text-[10px] tracking-[0.12em] uppercase" style={{ color: C.muted }}>
                    {row.k}
                  </span>
                  <span className="font-body text-[14px] font-medium mt-0.5" style={{ color: C.text }}>
                    {row.v}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 md:p-10 flex items-end justify-between">
            <span className="font-body text-[13px] text-right max-w-[120px]" style={{ color: C.muted }}>
              Deploys on-prem or at the edge
            </span>
            <span className="font-mono text-[10px] tracking-[0.16em] uppercase" style={{ color: C.blue }}>
              v1.0
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── ARCHITECTURE ─────────────────────────────────────────────────────────────
function Architecture() {
  const layers = [
    {
      num: "L1",
      title: "UI Layer",
      items: ["Web dashboard", "Chat interface", "MCP clients", "API gateway"],
      accent: C.blue,
      desc: "The surface your team touches. Chat, dashboards, and integrations route to the orchestration layer without ever leaving your network.",
    },
    {
      num: "L2",
      title: "Agent Orchestration",
      items: ["n8n workflows", "MCP toolchain", "Task scheduler", "Event bus"],
      accent: C.signal,
      desc: "The nervous system. Agents coordinate tools, memory, and models to complete multi-step tasks under your policies.",
    },
    {
      num: "L3",
      title: "Local LLM + Vector Memory",
      items: ["Ollama / vLLM", "ChromaDB / Qdrant", "Embeddings", "Encrypted store"],
      accent: C.green,
      desc: "The brain and the long-term memory. Private inference and semantic retrieval on encrypted local storage.",
    },
  ];

  return (
    <section id="architecture" className="relative border-t" style={{ background: C.bg, borderColor: C.border }}>
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-0">
        <div
          className="col-span-12 md:col-span-3 p-6 md:p-10 border-b md:border-b-0 md:border-r"
          style={{ borderColor: C.border }}
        >
          <p className="font-mono text-[10px] tracking-[0.16em] uppercase" style={{ color: C.muted }}>
            Architecture
          </p>
        </div>
        <div className="col-span-12 md:col-span-9 p-6 md:p-10 border-b" style={{ borderColor: C.border }}>
          <h2
            className="font-display text-[clamp(32px,5vw,64px)] font-semibold leading-[1.0] tracking-[-0.04em]"
            style={{ color: C.text }}
          >
            Three layers. One box.
          </h2>
          <p className="font-body text-lg leading-[1.65] max-w-[65ch] mt-4" style={{ color: C.muted }}>
            A simple vertical stack: your interfaces on top, agent orchestration in the middle, and private inference plus memory at the foundation.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-10 py-16 md:py-24">
        <motion.div {...fadeIn} className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2" style={{ background: C.border }} />
          <div className="flex flex-col gap-0">
            {layers.map((layer, i) => (
              <motion.div
                key={layer.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -24 : 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
                className={`relative grid grid-cols-1 md:grid-cols-2 gap-0 ${i !== layers.length - 1 ? "border-b" : ""}`}
                style={{ borderColor: C.border }}
              >
                {i % 2 === 0 ? (
                  <>
                    <div className="p-6 md:p-8 md:border-r" style={{ borderColor: C.border }}>
                      <div className="flex items-center gap-3 mb-4">
                        <span
                          className="font-mono text-[10px] tracking-[0.16em] uppercase px-2 py-1 border"
                          style={{ color: layer.accent, borderColor: layer.accent }}
                        >
                          {layer.num}
                        </span>
                        <h3
                          className="font-display text-[24px] md:text-[28px] font-semibold tracking-[-0.03em]"
                          style={{ color: C.text }}
                        >
                          {layer.title}
                        </h3>
                      </div>
                      <p className="font-body text-[15px] leading-[1.7] mb-4" style={{ color: C.muted }}>
                        {layer.desc}
                      </p>
                      <p className="font-mono text-[13px] leading-[1.7]" style={{ color: C.muted }}>
                        {layer.items.join(" · ")}
                      </p>
                    </div>
                    <div className="hidden md:flex items-center justify-center p-6">
                      <div className="w-3 h-3 rotate-45 border" style={{ borderColor: layer.accent, background: C.bg }} />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="hidden md:flex items-center justify-center p-6 md:border-r" style={{ borderColor: C.border }}>
                      <div className="w-3 h-3 rotate-45 border" style={{ borderColor: layer.accent, background: C.bg }} />
                    </div>
                    <div className="p-6 md:p-8">
                      <div className="flex items-center gap-3 mb-4">
                        <span
                          className="font-mono text-[10px] tracking-[0.16em] uppercase px-2 py-1 border"
                          style={{ color: layer.accent, borderColor: layer.accent }}
                        >
                          {layer.num}
                        </span>
                        <h3
                          className="font-display text-[24px] md:text-[28px] font-semibold tracking-[-0.03em]"
                          style={{ color: C.text }}
                        >
                          {layer.title}
                        </h3>
                      </div>
                      <p className="font-body text-[15px] leading-[1.7] mb-4" style={{ color: C.muted }}>
                        {layer.desc}
                      </p>
                      <p className="font-mono text-[13px] leading-[1.7]" style={{ color: C.muted }}>
                        {layer.items.join(" · ")}
                      </p>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── FEATURES BENTO GRID ──────────────────────────────────────────────────────
function FeatureGrid() {
  const features = [
    {
      icon: Cpu,
      title: "Private LLMs",
      desc: "Run Llama, Mistral, Qwen, and custom models locally with Ollama. No API tokens. No rate limits. No vendor lock-in.",
      accent: C.signal,
    },
    {
      icon: Workflow,
      title: "Agent Orchestration",
      desc: "Build multi-step agents with n8n and MCP toolchains. Connect email, Slack, Jira, calendars, and your internal APIs.",
      accent: C.blue,
    },
    {
      icon: Database,
      title: "Vector Memory",
      desc: "Persistent semantic memory with ChromaDB and Qdrant. Index documents, tickets, code, and conversations for instant retrieval.",
      accent: C.green,
    },
    {
      icon: Lock,
      title: "Zero Egress",
      desc: "Every request, embedding, and response stays on your hardware. No data leaves your network unless you explicitly route it.",
      accent: C.signal,
    },
    {
      icon: Network,
      title: "Tailscale Mesh",
      desc: "Zero-trust network access for remote staff and distributed offices. Device-aware, encrypted, and identity-bound.",
      accent: C.blue,
    },
    {
      icon: Container,
      title: "Docker Stack",
      desc: "One compose file deploys inference, memory, automation, and security services. Repeatable, versioned, and portable.",
      accent: C.green,
    },
  ];

  return (
    <section id="features" className="relative border-t" style={{ background: C.bg, borderColor: C.border }}>
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-0">
        <div
          className="col-span-12 md:col-span-3 p-6 md:p-10 border-b md:border-b-0 md:border-r"
          style={{ borderColor: C.border }}
        >
          <p className="font-mono text-[10px] tracking-[0.16em] uppercase" style={{ color: C.muted }}>
            Features
          </p>
        </div>
        <div className="col-span-12 md:col-span-9 p-6 md:p-10 border-b" style={{ borderColor: C.border }}>
          <h2
            className="font-display text-[clamp(32px,5vw,64px)] font-semibold leading-[1.0] tracking-[-0.04em]"
            style={{ color: C.text }}
          >
            Six capabilities. One appliance.
          </h2>
          <p className="font-body text-lg leading-[1.65] max-w-[65ch] mt-4" style={{ color: C.muted }}>
            Everything you need to run private AI as a first-class citizen of your network — in a single box.
          </p>
        </div>
      </div>

      <motion.div
        {...stagger}
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px"
        style={{ background: C.border }}
      >
        {features.map((f) => (
          <motion.div
            key={f.title}
            variants={staggerItem}
            className="group p-6 md:p-8 transition-colors"
            style={{ background: C.bg }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 flex items-center justify-center border" style={{ borderColor: C.border }}>
                <f.icon size={18} style={{ color: f.accent }} />
              </div>
              <div className="w-6 h-px" style={{ background: C.border }} />
            </div>
            <h3 className="font-display text-[22px] font-semibold tracking-[-0.02em] mb-3" style={{ color: C.text }}>
              {f.title}
            </h3>
            <p className="font-body text-[15px] leading-[1.65]" style={{ color: C.muted }}>
              {f.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

// ─── PRICING ───────────────────────────────────────────────────────────────────
function Pricing() {
  const tiers = [
    {
      icon: Server,
      name: "Sovereign Node Appliance",
      price: "$899",
      note: "One-time hardware + setup fee",
      accent: C.signal,
      featured: true,
      specs: [
        "Compact desktop appliance",
        "Pre-installed software stack",
        "Local LLM + vector memory ready",
        "Tailscale mesh preconfigured",
        "90-day support included",
      ],
      cta: "Reserve an appliance",
    },
    {
      icon: Cpu,
      name: "Bring Your Own Hardware",
      price: "Free",
      note: "Open-source stack. Self-managed.",
      accent: C.blue,
      specs: [
        "Install on any Linux host",
        "Full Docker Compose stack",
        "Community documentation",
        "No license fees",
        "Optional paid support",
      ],
      cta: "View install docs",
    },
    {
      icon: Workflow,
      name: "Cloud Relay",
      price: "$29",
      range: "/mo",
      note: "Optional managed relay service",
      accent: C.green,
      specs: [
        "Secure outbound relay only when needed",
        "Encrypted tunnel to your node",
        "Webhook and notification routing",
        "No data retention on relay",
        "Cancel anytime",
      ],
      cta: "Get cloud relay",
    },
  ];

  return (
    <section id="pricing" className="relative border-t" style={{ background: C.bg, borderColor: C.border }}>
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-0">
        <div
          className="col-span-12 md:col-span-3 p-6 md:p-10 border-b md:border-b-0 md:border-r"
          style={{ borderColor: C.border }}
        >
          <p className="font-mono text-[10px] tracking-[0.16em] uppercase" style={{ color: C.muted }}>
            Pricing
          </p>
        </div>
        <div className="col-span-12 md:col-span-9 p-6 md:p-10 border-b" style={{ borderColor: C.border }}>
          <h2
            className="font-display text-[clamp(32px,5vw,64px)] font-semibold leading-[1.0] tracking-[-0.04em]"
            style={{ color: C.text }}
          >
            Three ways to start.
          </h2>
          <p className="font-body text-lg leading-[1.65] max-w-[65ch] mt-4" style={{ color: C.muted }}>
            Buy the appliance, install the open-source stack yourself, or add a secure cloud relay. Sovereignty comes first in every option.
          </p>
        </div>
      </div>

      <motion.div
        {...stagger}
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-px px-6 md:px-0"
        style={{ background: C.border }}
      >
        {tiers.map((tier) => (
          <motion.div
            key={tier.name}
            variants={staggerItem}
            className="relative p-6 md:p-8 transition-colors"
            style={{ background: tier.featured ? C.surface : C.bg }}
          >
            {tier.featured && <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: tier.accent }} />}

            <div className="flex items-center gap-2 mb-4">
              <tier.icon size={16} style={{ color: tier.accent }} />
              <span className="font-mono text-[10px] tracking-[0.16em] uppercase" style={{ color: C.muted }}>
                {tier.note}
              </span>
            </div>

            <h3 className="font-display text-[24px] md:text-[28px] font-semibold tracking-[-0.03em] mb-2" style={{ color: C.text }}>
              {tier.name}
            </h3>

            <div className="mb-1">
              <span className="font-display text-[36px] font-light tracking-[-0.02em]" style={{ color: C.text }}>
                {tier.price}
              </span>
              {tier.range && <span className="font-mono text-[14px]" style={{ color: C.muted }}>{tier.range}</span>}
            </div>

            <div className="border-t" style={{ borderColor: C.border }}>
              {tier.specs.map((spec) => (
                <div key={spec} className="flex items-start gap-2.5 py-3 border-b" style={{ borderColor: C.border }}>
                  <Check size={14} className="mt-[3px] shrink-0" style={{ color: tier.accent }} />
                  <span className="font-body text-[14px] leading-[1.5]" style={{ color: C.text }}>
                    {spec}
                  </span>
                </div>
              ))}
            </div>

            <Link
              href="/assessment"
              className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] tracking-wide uppercase px-5 py-2.5 border transition-colors hover:text-[#FF5500] hover:border-[#FF5500] w-full justify-center"
              style={{ color: C.text, borderColor: C.borderHi }}
            >
              {tier.cta} <ArrowRight size={14} />
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────
function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const faqs = [
    {
      q: "What hardware does the Sovereign Node appliance include?",
      a: "The $899 appliance is a compact desktop-class unit with an ARM or x86 CPU, 16 GB RAM, 512 GB NVMe storage, and pre-installed Ubuntu Server + Docker stack. It is sized for small teams and proof-of-concept deployments.",
    },
    {
      q: "Can I install Sovereign Node on my own server?",
      a: "Yes. The core stack is open-source and published as a Docker Compose file. Install it on any modern Linux host, from a Mac Mini to a rack workstation. Paid support is available if you want Manteis to operate it.",
    },
    {
      q: "Does anything leave my network?",
      a: "By default, nothing leaves your network. Inference, memory, and orchestration all run locally. The optional $29/month Cloud Relay only creates an encrypted outbound tunnel when you explicitly need webhooks, notifications, or remote access without opening ports.",
    },
    {
      q: "Is this suitable for regulated industries?",
      a: "Yes. Sovereign Node is designed for environments where data residency matters: legal, healthcare, finance, and government-adjacent work. Manteis also offers a paid HIPAA and security hardening package for healthcare deployments.",
    },
  ];

  return (
    <section id="faq" className="relative border-t" style={{ background: C.bg, borderColor: C.border }}>
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-0">
        <div
          className="col-span-12 md:col-span-3 p-6 md:p-10 border-b md:border-b-0 md:border-r"
          style={{ borderColor: C.border }}
        >
          <p className="font-mono text-[10px] tracking-[0.16em] uppercase" style={{ color: C.muted }}>
            FAQ
          </p>
        </div>
        <div className="col-span-12 md:col-span-9 p-6 md:p-10 border-b" style={{ borderColor: C.border }}>
          <h2
            className="font-display text-[clamp(32px,5vw,64px)] font-semibold leading-[1.0] tracking-[-0.04em]"
            style={{ color: C.text }}
          >
            Questions.
          </h2>
          <p className="font-body text-lg leading-[1.65] max-w-[65ch] mt-4" style={{ color: C.muted }}>
            Straight answers about hardware, data, compliance, and ownership.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 md:px-10 py-12 md:py-16">
        <div className="space-y-0 border" style={{ borderColor: C.border }}>
          {faqs.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={item.q} className="border-b last:border-b-0" style={{ borderColor: C.border }}>
                <button
                  className="w-full flex items-center justify-between p-5 md:p-6 text-left transition-colors hover:bg-white/[0.02]"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                >
                  <span className="font-body text-[16px] font-semibold pr-4" style={{ color: C.text }}>
                    {item.q}
                  </span>
                  <ChevronDown
                    size={18}
                    className="shrink-0 transition-transform"
                    style={{ color: C.muted, transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                  />
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="font-body text-[15px] leading-[1.7] px-5 md:px-6 pb-5" style={{ color: C.muted }}>
                    {item.a}
                  </p>
                </motion.div>
              </div>
            );
          })}
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
            <HelpCircle size={16} style={{ color: C.signal }} />
            <span className="font-mono text-[10px] tracking-[0.18em] uppercase" style={{ color: C.muted }}>
              Next Step
            </span>
          </div>
          <h2
            className="font-display text-[clamp(32px,5vw,64px)] font-semibold leading-[1.0] tracking-[-0.04em] mb-6"
            style={{ color: C.text }}
          >
            Book a free Sovereignty Audit.
          </h2>
          <p className="font-body text-lg leading-[1.65] max-w-[55ch] mb-8" style={{ color: C.muted }}>
            In 30 minutes we'll identify which workflows belong on a Sovereign Node, what hardware fits your operation, and what the first 30 days look like.
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
          <Link
            href="/case-studies"
            className="font-body text-[13px] transition-colors hover:text-[#FF5500]"
            style={{ color: C.muted }}
          >
            Case Studies
          </Link>
        </div>

        <span className="font-mono text-[11px]" style={{ color: C.muted }}>
          © 2026
        </span>
      </div>
    </footer>
  );
}

// ─── PAGE EXPORT ──────────────────────────────────────────────────────────────
export function SovereignNodePage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden" style={{ background: C.bg }}>
      <Nav />
      <Hero />
      <Architecture />
      <FeatureGrid />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
