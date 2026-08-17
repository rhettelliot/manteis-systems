"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  Menu,
  X,
  Cpu,
  Search,
  Workflow,
  Server,
  Shield,
  Share2,
  ArrowRight,
  Copy,
  Check,
  Terminal,
} from "lucide-react";
import Link from "next/link";

// ─── DESIGN TOKENS ──────────────────────────────────────────────────────────
const C = {
  bg: "#020203",
  text: "#FDFCDC",
  signal: "#FF5500",
  blue: "#007AFF",
  border: "rgba(253, 252, 220, 0.12)",
  borderHi: "rgba(253, 252, 220, 0.22)",
  muted: "rgba(253, 252, 220, 0.45)",
  ghost: "rgba(253, 252, 220, 0.10)",
};

// ─── ANIMATION VARIANTS ───────────────────────────────────────────────────
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

// ─── NAV ────────────────────────────────────────────────────────────────────
function Nav() {
  const [open, setOpen] = useState(false);
  const links = [
    { label: "Overview", href: "#overview" },
    { label: "Features", href: "#features" },
    { label: "Architecture", href: "#architecture" },
    { label: "Hardware", href: "#hardware" },
    { label: "Deploy", href: "#deploy" },
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
        href="/"
        className="hidden md:inline-flex font-mono text-[11px] tracking-wide uppercase px-4 py-2 border transition-colors hover:border-[#FF5500] hover:text-[#FF5500]"
        style={{ color: C.muted, borderColor: C.border }}
      >
        ← Home
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
          </div>
        </div>
      )}
    </nav>
  );
}

// ─── HERO ───────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      id="overview"
      className="relative min-h-screen pt-14 overflow-hidden"
      style={{ background: C.bg }}
    >
      {/* Hairline grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `linear-gradient(to right, ${C.border} 1px, transparent 1px)`,
          backgroundSize: "calc(100% / 12) 100%",
        }}
      />

      {/* Signal horizon line */}
      <div
        className="absolute top-[62%] left-0 right-0 h-px pointer-events-none"
        style={{ background: `rgba(255, 85, 0, 0.18)` }}
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
              Manteis Systems · Product Release 2026
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="font-display font-light uppercase tracking-[-0.06em] leading-[0.9]"
            style={{ color: C.text, fontSize: "clamp(48px, 12vw, 168px)" }}
          >
            Sovereign
            <br />
            <span style={{ color: C.signal }}>OS</span>
          </motion.h1>

          <motion.p
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.3 }}
            className="font-body text-lg md:text-xl leading-[1.6] max-w-[54ch] mt-8 mb-10"
            style={{ color: C.muted }}
          >
            Local-first AI infrastructure. One command. Zero cloud.
          </motion.p>

          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8"
          >
            <a
              href="#deploy"
              className="inline-flex items-center gap-2 font-body text-[15px] font-semibold px-6 py-3.5 transition-colors hover:bg-[#E64D00]"
              style={{ background: C.signal, color: C.bg }}
            >
              Deploy Now <ArrowRight size={16} />
            </a>
            <a
              href="#architecture"
              className="font-mono text-[12px] tracking-wide uppercase transition-colors hover:text-[#FF5500]"
              style={{ color: C.muted }}
            >
              View architecture →
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
              Private AI OS
            </span>
          </div>

          <div className="p-6 md:p-10 border-b" style={{ borderColor: C.border }}>
            <p className="font-mono text-[10px] tracking-[0.16em] uppercase mb-4" style={{ color: C.muted }}>
              Specification
            </p>
            <div className="grid grid-cols-2 gap-y-4 gap-x-6">
              {[
                { k: "Runtime", v: "Docker / Linux" },
                { k: "Inference", v: "Ollama · vLLM" },
                { k: "Memory", v: "ChromaDB · Qdrant" },
                { k: "Agents", v: "n8n · MCP" },
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
              Runs on hardware you own
            </span>
            <span className="font-mono text-[10px] tracking-[0.16em] uppercase" style={{ color: C.blue }}>
              v2.0
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FEATURE GRID ───────────────────────────────────────────────────────────
function FeatureGrid() {
  const features = [
    {
      icon: Cpu,
      title: "AI Engine",
      desc: "Local LLM inference with Ollama and vLLM. Run Llama, Mistral, Qwen, and custom models entirely on-premise with no API tokens.",
      accent: C.signal,
    },
    {
      icon: Search,
      title: "Vector Search",
      desc: "Persistent semantic memory powered by ChromaDB and Qdrant. Index documents, code, tickets, and conversations for instant retrieval.",
      accent: C.blue,
    },
    {
      icon: Workflow,
      title: "Workflow Automation",
      desc: "Agent orchestration through n8n, MCP toolchains, and custom pipelines. Connect email, Slack, Jira, and your internal APIs.",
      accent: C.signal,
    },
    {
      icon: Server,
      title: "Fleet Management",
      desc: "Provision, monitor, and update nodes at scale. One dashboard for compact desktops, tower servers, and full enterprise racks.",
      accent: C.blue,
    },
    {
      icon: Shield,
      title: "Security SIEM",
      desc: "Elastic Stack security operations with AI-powered triage. Zero-trust access, full-disk encryption, and endpoint telemetry out of the box.",
      accent: C.signal,
    },
    {
      icon: Share2,
      title: "Knowledge Graph",
      desc: "Link entities across documents, conversations, and systems. Surface relationships that search alone cannot find.",
      accent: C.blue,
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
            Capabilities
          </p>
        </div>
        <div className="col-span-12 md:col-span-9 p-6 md:p-10 border-b" style={{ borderColor: C.border }}>
          <h2
            className="font-display text-[clamp(32px,5vw,64px)] font-semibold leading-[1.0] tracking-[-0.04em]"
            style={{ color: C.text }}
          >
            Six systems. One platform.
          </h2>
          <p className="font-body text-lg leading-[1.65] max-w-[65ch] mt-4" style={{ color: C.muted }}>
            Sovereign OS unifies inference, memory, automation, fleet operations, security, and knowledge into a single local-first control plane.
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
              <div
                className="w-8 h-8 flex items-center justify-center border"
                style={{ borderColor: C.border }}
              >
                <f.icon size={18} style={{ color: f.accent }} />
              </div>
              <div className="w-6 h-px" style={{ background: C.border }} />
            </div>
            <h3
              className="font-display text-[22px] font-semibold tracking-[-0.02em] mb-3"
              style={{ color: C.text }}
            >
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

// ─── ARCHITECTURE DIAGRAM ───────────────────────────────────────────────────
function Architecture() {
  const layers = [
    {
      num: "L1",
      title: "Compute",
      items: ["Ollama", "vLLM", "Python workers", "GPU/Apple Silicon"],
      accent: C.signal,
    },
    {
      num: "L2",
      title: "Storage",
      items: ["ChromaDB", "Qdrant", "PostgreSQL", "Object store"],
      accent: C.blue,
    },
    {
      num: "L3",
      title: "Orchestration",
      items: ["n8n", "MCP servers", "Docker Compose", "Queue workers"],
      accent: C.signal,
    },
    {
      num: "L4",
      title: "Integration",
      items: ["M365", "Slack", "Jira", "Custom APIs"],
      accent: C.blue,
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
            Four layers. Full control.
          </h2>
          <p className="font-body text-lg leading-[1.65] max-w-[65ch] mt-4" style={{ color: C.muted }}>
            A vertical stack designed for sovereignty: compute stays local, storage stays encrypted, orchestration stays programmable, and integrations stay under your policies.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-10 py-16 md:py-24">
        <motion.div {...fadeIn} className="relative">
          {/* Vertical connecting line */}
          <div
            className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
            style={{ background: C.border }}
          />

          <div className="flex flex-col gap-0">
            {layers.map((layer, i) => (
              <motion.div
                key={layer.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -24 : 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
                className={`relative grid grid-cols-1 md:grid-cols-2 gap-0 ${
                  i !== layers.length - 1 ? "border-b" : ""
                }`}
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
                      <p className="font-body text-[15px] leading-[1.7]" style={{ color: C.muted }}>
                        {layer.items.join(" · ")}
                      </p>
                    </div>
                    <div className="hidden md:flex items-center justify-center p-6">
                      <div
                        className="w-3 h-3 rotate-45 border"
                        style={{ borderColor: layer.accent, background: C.bg }}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="hidden md:flex items-center justify-center p-6 md:border-r" style={{ borderColor: C.border }}>
                      <div
                        className="w-3 h-3 rotate-45 border"
                        style={{ borderColor: layer.accent, background: C.bg }}
                      />
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
                      <p className="font-body text-[15px] leading-[1.7]" style={{ color: C.muted }}>
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

// ─── HARDWARE TIERS ─────────────────────────────────────────────────────────
function HardwareTiers() {
  const tiers = [
    {
      name: "Compact",
      subtitle: "Desktop-class node",
      price: "$2,400",
      accent: C.blue,
      specs: [
        { k: "Form", v: "Mac Mini / NUC" },
        { k: "CPU", v: "8-core ARM/x86" },
        { k: "RAM", v: "32 GB unified" },
        { k: "Storage", v: "1 TB NVMe" },
        { k: "Models", v: "Up to 2 local" },
        { k: "Agents", v: "4 concurrent" },
      ],
    },
    {
      name: "Professional",
      subtitle: "Tower-class node",
      price: "$6,800",
      accent: C.signal,
      featured: true,
      specs: [
        { k: "Form", v: "Tower workstation" },
        { k: "CPU", v: "16-core x86" },
        { k: "GPU", v: "RTX 4090 / A100" },
        { k: "RAM", v: "128 GB ECC" },
        { k: "Storage", v: "4 TB NVMe RAID" },
        { k: "Models", v: "Up to 6 local" },
        { k: "Agents", v: "12 concurrent" },
      ],
    },
    {
      name: "Enterprise",
      subtitle: "Rack-class cluster",
      price: "Custom",
      accent: C.blue,
      specs: [
        { k: "Form", v: "2U rack nodes" },
        { k: "CPU", v: "Dual 32-core" },
        { k: "GPU", v: "Multi A100/H100" },
        { k: "RAM", v: "512 GB+ ECC" },
        { k: "Storage", v: "NVMe + SAN" },
        { k: "Models", v: "Unlimited" },
        { k: "Agents", v: "Unlimited" },
      ],
    },
  ];

  return (
    <section id="hardware" className="relative border-t" style={{ background: C.bg, borderColor: C.border }}>
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-0">
        <div
          className="col-span-12 md:col-span-3 p-6 md:p-10 border-b md:border-b-0 md:border-r"
          style={{ borderColor: C.border }}
        >
          <p className="font-mono text-[10px] tracking-[0.16em] uppercase" style={{ color: C.muted }}>
            Hardware
          </p>
        </div>
        <div className="col-span-12 md:col-span-9 p-6 md:p-10 border-b" style={{ borderColor: C.border }}>
          <h2
            className="font-display text-[clamp(32px,5vw,64px)] font-semibold leading-[1.0] tracking-[-0.04em]"
            style={{ color: C.text }}
          >
            Three tiers. Your hardware.
          </h2>
          <p className="font-body text-lg leading-[1.65] max-w-[65ch] mt-4" style={{ color: C.muted }}>
            Sovereign OS scales from a single desktop appliance to a redundant enterprise cluster. Choose the form factor that matches your workload.
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
            style={{ background: C.bg }}
          >
            {tier.featured && (
              <div
                className="absolute top-0 left-0 right-0 h-[2px]"
                style={{ background: tier.accent }}
              />
            )}

            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2" style={{ background: tier.accent }} />
              <span className="font-mono text-[10px] tracking-[0.16em] uppercase" style={{ color: C.muted }}>
                {tier.subtitle}
              </span>
            </div>

            <h3
              className="font-display text-[28px] md:text-[32px] font-semibold tracking-[-0.03em] mb-2"
              style={{ color: C.text }}
            >
              {tier.name}
            </h3>
            <p className="font-display text-[32px] font-light tracking-[-0.02em] mb-6" style={{ color: C.text }}>
              {tier.price}
            </p>

            <div className="border-t" style={{ borderColor: C.border }}>
              {tier.specs.map((spec, i) => (
                <div
                  key={spec.k}
                  className="flex items-baseline justify-between py-3 border-b"
                  style={{ borderColor: C.border }}
                >
                  <span className="font-mono text-[11px] tracking-[0.12em] uppercase" style={{ color: C.muted }}>
                    {spec.k}
                  </span>
                  <span className="font-body text-[14px] font-medium text-right" style={{ color: C.text }}>
                    {spec.v}
                  </span>
                </div>
              ))}
            </div>

            <a
              href="#deploy"
              className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] tracking-wide uppercase px-5 py-2.5 border transition-colors hover:text-[#FF5500] hover:border-[#FF5500] w-full justify-center"
              style={{ color: C.text, borderColor: C.border }}
            >
              Configure {tier.name} <ArrowRight size={14} />
            </a>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

// ─── DEPLOY CTA ─────────────────────────────────────────────────────────────
function DeployCTA() {
  const [copied, setCopied] = useState(false);
  const command = "curl -sSL https://manteis.systems/install | bash";

  const copy = async () => {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="deploy" className="relative border-t" style={{ background: C.bg, borderColor: C.border }}>
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-0">
        <div
          className="col-span-12 md:col-span-5 p-6 md:p-10 border-b md:border-b-0 md:border-r flex flex-col justify-center"
          style={{ borderColor: C.border }}
        >
          <p className="font-mono text-[10px] tracking-[0.16em] uppercase mb-6" style={{ color: C.muted }}>
            Deployment
          </p>
          <h2
            className="font-display text-[clamp(32px,5vw,64px)] font-semibold leading-[1.0] tracking-[-0.04em] mb-6"
            style={{ color: C.text }}
          >
            Deploy in
            <br />
            <span style={{ color: C.signal }}>60 seconds.</span>
          </h2>
          <p className="font-body text-lg leading-[1.65] max-w-[50ch]" style={{ color: C.muted }}>
            One command installs the entire Sovereign OS stack on a fresh Linux host. No cloud accounts. No API keys. No data leaving your network.
          </p>
        </div>

        <div className="col-span-12 md:col-span-7 p-6 md:p-10 flex flex-col justify-center">
          <motion.div {...fadeUp} className="border p-6 md:p-8" style={{ borderColor: C.border }}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Terminal size={16} style={{ color: C.signal }} />
                <span className="font-mono text-[11px] tracking-[0.12em] uppercase" style={{ color: C.muted }}>
                  Terminal
                </span>
              </div>
              <button
                onClick={copy}
                className="flex items-center gap-1.5 font-mono text-[10px] tracking-wide uppercase transition-colors hover:text-[#FF5500]"
                style={{ color: C.muted }}
              >
                {copied ? <Check size={12} /> : <Copy size={12} />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
            <code
              className="block font-mono text-[13px] md:text-[15px] leading-[1.6] break-all"
              style={{ color: C.text }}
            >
              {command}
            </code>
          </motion.div>

          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.15 }} className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-px border" style={{ borderColor: C.border, background: C.border }}>
            {[
              { k: "Step 1", v: "Prepare hardware" },
              { k: "Step 2", v: "Run installer" },
              { k: "Step 3", v: "Access dashboard" },
            ].map((step) => (
              <div key={step.k} className="p-4" style={{ background: C.bg }}>
                <span className="font-mono text-[10px] tracking-[0.12em] uppercase block mb-1" style={{ color: C.muted }}>
                  {step.k}
                </span>
                <span className="font-body text-[14px] font-medium" style={{ color: C.text }}>
                  {step.v}
                </span>
              </div>
            ))}
          </motion.div>

          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.25 }} className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <a
              href="mailto:rhett@manteis.systems"
              className="inline-flex items-center gap-2 font-body text-[15px] font-semibold px-6 py-3.5 transition-colors hover:bg-[#E64D00]"
              style={{ background: C.signal, color: C.bg }}
            >
              Book a Deployment Audit <ArrowRight size={16} />
            </a>
            <span className="font-mono text-[11px] tracking-wide" style={{ color: C.muted }}>
              Or email rhett@manteis.systems
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ─────────────────────────────────────────────────────────────────
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
          <a
            href="https://www.linkedin.com/in/rhettelliot"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-[13px] transition-colors hover:text-[#FF5500]"
            style={{ color: C.muted }}
          >
            LinkedIn
          </a>
        </div>

        <span className="font-mono text-[11px]" style={{ color: C.muted }}>
          © 2026
        </span>
      </div>
    </footer>
  );
}

// ─── PAGE ───────────────────────────────────────────────────────────────────
export default function SovereignOSPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden" style={{ background: C.bg }}>
      <Nav />
      <Hero />
      <FeatureGrid />
      <Architecture />
      <HardwareTiers />
      <DeployCTA />
      <Footer />
    </main>
  );
}
