"use client";

import { motion } from "motion/react";

// ─── Cartographic symbols ─────────────────────────────────────────────
function Crosshair({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" aria-hidden>
      <line x1="20" y1="0" x2="20" y2="14" stroke="rgba(255,85,0,0.4)" strokeWidth="1" />
      <line x1="20" y1="26" x2="20" y2="40" stroke="rgba(255,85,0,0.4)" strokeWidth="1" />
      <line x1="0" y1="20" x2="14" y2="20" stroke="rgba(255,85,0,0.4)" strokeWidth="1" />
      <line x1="26" y1="20" x2="40" y2="20" stroke="rgba(255,85,0,0.4)" strokeWidth="1" />
      <circle cx="20" cy="20" r="6" fill="none" stroke="rgba(255,85,0,0.5)" strokeWidth="1" />
    </svg>
  );
}

function Rings({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 300 300" aria-hidden>
      {[140, 110, 80, 50, 25].map((r, i) => (
        <circle key={r} cx="150" cy="150" r={r} fill="none"
          stroke={i === 2 ? "rgba(255,85,0,0.35)" : "rgba(244,243,238,0.08)"}
          strokeWidth={i % 2 === 0 ? 1.5 : 0.8} />
      ))}
    </svg>
  );
}

function WireGrid({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" aria-hidden>
      {[350, 300, 250, 200, 150, 100].map((y) => (
        <line key={y} x1="0" y1="400" x2="400" y2={y} stroke="rgba(244,243,238,0.05)" strokeWidth="1" />
      ))}
      {[450, 500, 550, 600, 650, 700, 750].map((x) => (
        <line key={x} x1="400" y1="200" x2={x} y2="400" stroke="rgba(244,243,238,0.05)" strokeWidth="1" />
      ))}
      <line x1="0" y1="200" x2="800" y2="200" stroke="rgba(255,85,0,0.10)" strokeWidth="1" strokeDasharray="4 8" />
    </svg>
  );
}

// ─── Nav ──────────────────────────────────────────────────────────────
function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-6 md:px-10 bg-[--color-canvas]/80 backdrop-blur-md border-b border-[--color-border]">
      <div className="flex items-center gap-3">
        <div className="w-1 h-5 bg-[--color-signal]" />
        <span className="font-display text-sm font-semibold text-[--color-ink] tracking-tight">Manteis Systems</span>
      </div>
      <ul className="hidden md:flex gap-8 list-none">
        {["Services", "Node", "Case", "Contact"].map((item) => (
          <li key={item}>
            <a href={`#${item.toLowerCase()}`}
              className="font-display text-[13px] font-medium text-[--color-ink-2] hover:text-[--color-ink] transition-colors">
              {item}
            </a>
          </li>
        ))}
      </ul>
      <span className="meta hidden md:block">/ HUD · V5</span>
    </nav>
  );
}

// ─── HERO — instrument panel ───────────────────────────────────────────
function Hero() {
  return (
    <section className="relative min-h-screen flex items-end pb-20 md:pb-32 px-6 md:px-10 overflow-hidden">
      <div className="absolute inset-0 grid-lines opacity-50 pointer-events-none" />
      <WireGrid className="absolute top-0 right-0 w-full h-full opacity-60 pointer-events-none" />
      <Rings className="absolute top-20 right-[-80px] w-[400px] h-[400px] opacity-60 pointer-events-none" />

      {/* Solar glow */}
      <div className="solar-glow" style={{ width: 600, height: 600, bottom: -150, right: -100 }} />

      {/* Corner HUD labels */}
      <span className="meta absolute top-20 left-6">/ 00 · OVERVIEW</span>
      <span className="meta absolute top-20 right-6">STATUS: ACTIVE</span>
      <Crosshair className="absolute top-16 right-10 w-6 h-6" />

      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-7 flex flex-col gap-6">
          <p className="meta">47.6062°N · 122.3321°W · SEATTLE, WA</p>
          <h1 className="text-[clamp(40px,7vw,96px)] leading-[0.98] tracking-[-0.04em] font-semibold text-[--color-ink]">
            AI infrastructure
            <br />
            for businesses
            <br />
            that want <span className="text-[--color-signal]">control</span>.
          </h1>
          <p className="font-body text-lg text-[--color-ink-2] leading-[1.65] max-w-[70ch] mt-2">
            25+ years of enterprise IT, deployed as private local AI, agent automation,
            and zero-trust security for Pacific Northwest businesses.
          </p>
          <div className="flex items-center gap-6 mt-4">
            <a href="#contact" className="btn">Book a Discovery Call</a>
            <span className="meta">Free 60 min · No pitch deck</span>
          </div>
        </div>
        <div className="hidden md:flex col-span-5 items-end justify-end relative">
          <span className="display-num">25</span>
          <span className="meta absolute bottom-4 right-0 text-right max-w-[120px]">Years enterprise IT</span>
        </div>
      </div>
    </section>
  );
}

// ─── SERVICES — bento panels ──────────────────────────────────────────
function Services() {
  const panels = [
    { id: "01", title: "AI Infrastructure", desc: "Private LLMs, agent orchestration, vector memory on hardware you own.", price: "$350/hr · $2k/mo", span: "md:col-span-7" },
    { id: "02", title: "Security & Compliance", desc: "ZTNA, endpoint hardening, MDM, SOC 2/HIPAA/PCI.", price: "$350/hr · from $10k", span: "md:col-span-5" },
    { id: "03", title: "Automation & Fleet", desc: "Intune, Jamf, M365, Docker, n8n pipelines.", price: "$350/hr · from $10k", span: "md:col-span-5" },
    { id: "04", title: "Sovereign Node", desc: "Dedicated local AI server. Zero egress. Your data stays on your LAN.", price: "$2,500–$7,500", span: "md:col-span-7" },
  ];

  return (
    <section id="services" className="relative px-6 md:px-10 py-24 md:py-40 border-t border-[--color-border]">
      <div className="max-w-7xl mx-auto">
        <span className="meta absolute top-8 left-6">/ 01 · SERVICES</span>
        <div className="grid grid-cols-12 gap-4 md:gap-6">
          {panels.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`bento p-6 md:p-8 col-span-12 ${p.span} flex flex-col gap-4`}
            >
              <div className="flex items-center justify-between">
                <span className="meta">{p.id}</span>
                <Crosshair className="w-5 h-5" />
              </div>
              <h3 className="text-[clamp(22px,3vw,36px)] tracking-[-0.02em] font-semibold text-[--color-ink]">{p.title}</h3>
              <p className="font-body text-[15px] text-[--color-ink-2] leading-[1.6] max-w-[60ch]">{p.desc}</p>
              <div className="font-body text-[14px] font-semibold text-[--color-signal] mt-auto pt-4 border-t border-[--color-border]">{p.price}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── SOVEREIGN NODE — panel with data ─────────────────────────────────
function Node() {
  const specs = [
    { k: "HARDWARE", v: "Compact desktop · Pro workstation · Custom" },
    { k: "INFERENCE", v: "Local AI — open models, no API keys" },
    { k: "VECTOR", v: "Persistent local store, zero egress" },
    { k: "SECURITY", v: "ZTNA · Endpoint · Full disk encryption" },
  ];
  const tiers = [
    { name: "Starter", price: "$2,500", note: "4 agents · 1 model" },
    { name: "Professional", price: "$5,000", note: "10 agents · 3 models" },
    { name: "Enterprise", price: "$7,500", note: "Unlimited agents" },
  ];

  return (
    <section id="node" className="relative px-6 md:px-10 py-24 md:py-40 border-t border-[--color-border] overflow-hidden">
      <Rings className="absolute bottom-0 left-[-60px] w-[350px] h-[350px] opacity-50 pointer-events-none" />
      <div className="absolute inset-0 grid-lines opacity-30 pointer-events-none" />
      <span className="meta absolute top-8 left-6">/ 02 · SOVEREIGN NODE</span>

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-5">
          <h2 className="text-[clamp(32px,5vw,64px)] leading-[1.0] tracking-[-0.03em] font-semibold text-[--color-ink] mb-6">
            Your AI. Your hardware. Your <span className="text-[--color-signal]">LAN</span>.
          </h2>
          <p className="font-body text-lg text-[--color-ink-2] leading-[1.7] max-w-[70ch]">
            A dedicated local AI server. Every query stays on your machine. Your data never leaves your network.
          </p>
        </div>
        <div className="col-span-12 md:col-span-6 md:col-start-7 bento p-6 md:p-8 flex flex-col gap-6">
          <div className="flex items-center justify-between mb-2">
            <span className="meta">SPECIFICATIONS</span>
            <Crosshair className="w-5 h-5" />
          </div>
          {specs.map((s) => (
            <div key={s.k} className="flex gap-6 items-baseline pb-3 border-b border-[--color-border]">
              <span className="meta w-24 shrink-0">{s.k}</span>
              <span className="font-body text-[14px] text-[--color-ink-2]">{s.v}</span>
            </div>
          ))}
          <div className="mt-2">
            <span className="meta mb-4 block">PRICING</span>
            {tiers.map((t) => (
              <div key={t.name} className="flex items-baseline gap-6 py-2 hover:bg-white/[0.02] transition-colors px-2 -mx-2">
                <span className="font-body text-[15px] font-semibold text-[--color-ink] w-28">{t.name}</span>
                <span className="font-display text-xl font-semibold text-[--color-signal]">{t.price}</span>
                <span className="meta">{t.note}</span>
                <span className="meta ml-auto">$2k/mo</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CASE STUDY ────────────────────────────────────────────────────────
function CaseStudy() {
  return (
    <section id="case" className="relative px-6 md:px-10 py-24 md:py-40 border-t border-[--color-border]">
      <span className="meta absolute top-8 left-6">/ 03 · CASE STUDY · PNW · ANONYMIZED</span>
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6 mt-8">
        <div className="col-span-12 md:col-span-8">
          <blockquote className="text-[clamp(28px,4.5vw,52px)] leading-[1.15] tracking-[-0.03em] font-semibold text-[--color-ink] mb-12 max-w-[75ch]">
            &ldquo;They don&apos;t need another website.
            <span className="text-[--color-ink-3]"> They need an Agent.&rdquo;</span>
          </blockquote>
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-7 flex flex-col gap-5">
              <p className="font-body text-[17px] text-[--color-ink-2] leading-[1.7] max-w-[70ch]">
                The owner was losing 3+ hours a week to repetitive overhead: copy-pasting estimates, chasing email threads, and manually updating job status across disconnected tools.
              </p>
              <p className="font-body text-[17px] text-[--color-ink-2] leading-[1.7] max-w-[70ch]">
                The Manteis Sovereign Node now handles client intake, quote follow-ups, project status updates, and communication coordination — locally, privately, without a single new cloud subscription.
              </p>
              <div className="flex items-center gap-3 mt-2">
                <span className="w-2 h-2 rounded-full bg-[--color-signal] animate-pulse" />
                <span className="font-body text-[14px] font-semibold text-[--color-signal]">DEPLOYMENT: LIVE</span>
              </div>
            </div>
            <div className="col-span-12 md:col-span-5 bento p-6 flex flex-col gap-4">
              <span className="meta">METRICS</span>
              {[
                { v: "3 hrs", l: "Per week recovered" },
                { v: "0", l: "Cloud subscriptions added" },
                { v: "1", l: "Sovereign Node provisioned" },
                { v: "Q1 2026", l: "Deployment date" },
              ].map((m) => (
                <div key={m.l} className="flex items-baseline justify-between pb-2 border-b border-[--color-border]">
                  <span className="text-xl font-semibold text-[--color-ink]">{m.v}</span>
                  <span className="meta text-right max-w-[140px]">{m.l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CTA ───────────────────────────────────────────────────────────────
function CTA() {
  return (
    <section id="contact" className="relative px-6 md:px-10 py-24 md:py-40 border-t border-[--color-border] overflow-hidden">
      <div className="solar-glow" style={{ width: 600, height: 600, top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />
      <span className="meta absolute top-8 left-6">/ 04 · CONTACT</span>
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-12 gap-6 mt-8">
        <div className="col-span-12 md:col-span-8 md:col-start-3 text-center flex flex-col items-center gap-6">
          <h2 className="text-[clamp(36px,6vw,72px)] leading-[1.1] tracking-[-0.03em] font-semibold text-[--color-ink]">Let&apos;s talk.</h2>
          <p className="font-body text-lg text-[--color-ink-2] leading-[1.65] max-w-[65ch]">
            60 minutes. No pitch deck. We audit your current infrastructure, identify where overhead is bleeding your time, and propose the right configuration for your operation.
          </p>
          <a href="mailto:rhett@manteissystems.com" className="btn mt-4">Book a Discovery Call</a>
          <p className="meta mt-2">Standard: $2,500–$7,500 · Non-profit: $1,500–$3,000</p>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="border-t border-[--color-border] px-6 md:px-10 py-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-body text-[13px] text-[--color-ink-3]">Manteis Systems · AI Infrastructure · Seattle, WA</span>
        <span className="meta">© 2026 · END_OF_TRANSMISSION</span>
      </div>
    </footer>
  );
}

export default function V5() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Nav />
      <Hero />
      <Services />
      <Node />
      <CaseStudy />
      <CTA />
      <Footer />
    </main>
  );
}