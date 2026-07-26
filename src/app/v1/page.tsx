"use client";

import { motion } from "motion/react";

// ─── CONCENTRIC RINGS — variable stroke weights ─────────────────────────
function Rings({ className }: { className?: string }) {
  const rings = [
    { r: 220, stroke: "rgba(244,243,238,0.06)", width: 0.6 },
    { r: 185, stroke: "rgba(244,243,238,0.09)", width: 1.1 },
    { r: 150, stroke: "rgba(255,85,0,0.35)", width: 2.4 },
    { r: 115, stroke: "rgba(244,243,238,0.10)", width: 0.8 },
    { r: 80, stroke: "rgba(244,243,238,0.07)", width: 1.4 },
    { r: 48, stroke: "rgba(255,85,0,0.50)", width: 2.0 },
    { r: 18, stroke: "rgba(244,243,238,0.12)", width: 0.9 },
  ];
  return (
    <svg className={className} viewBox="0 0 520 520" preserveAspectRatio="xMidYMid meet" aria-hidden>
      {rings.map((ring) => (
        <circle key={ring.r} cx="260" cy="260" r={ring.r} fill="none" stroke={ring.stroke} strokeWidth={ring.width} />
      ))}
    </svg>
  );
}

// ─── PERSPECTIVE WIREFRAME GRID — horizon convergence ───────────────────
function PerspectiveGrid({ className }: { className?: string }) {
  const hLines = [360, 320, 280, 240, 200, 160, 120, 80, 40];
  const vLinesLeft = [50, 110, 170, 230, 290, 350];
  const vLinesRight = [450, 510, 570, 630, 690, 750];
  return (
    <svg className={className} viewBox="0 0 800 420" preserveAspectRatio="xMidYMid slice" aria-hidden>
      {hLines.map((y) => (
        <line key={`h-${y}`} x1="0" y1={420} x2="400" y2={y} stroke="rgba(244,243,238,0.05)" strokeWidth="1" />
      ))}
      {vLinesLeft.map((x) => (
        <line key={`vl-${x}`} x1={x} y1={420} x2="400" y2={200} stroke="rgba(244,243,238,0.05)" strokeWidth="1" />
      ))}
      {vLinesRight.map((x) => (
        <line key={`vr-${x}`} x1={x} y1={420} x2="400" y2={200} stroke="rgba(244,243,238,0.05)" strokeWidth="1" />
      ))}
      <line x1="0" y1="200" x2="800" y2="200" stroke="rgba(255,85,0,0.14)" strokeWidth="1" strokeDasharray="3 7" />
    </svg>
  );
}

// ─── DITHERED GRADIENT PANEL ────────────────────────────────────────────
function DitheredPanel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(255,85,0,0.08)] via-transparent to-[rgba(179,54,0,0.05)]" />
      <div className="absolute inset-0 dithered" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

// ─── NAV ────────────────────────────────────────────────────────────────
function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-between px-6 md:px-10 bg-[--color-canvas]/90 border-b border-[--color-border]">
      <div className="flex items-center gap-3">
        <div className="w-1.5 h-5 bg-[--color-signal]" />
        <span className="font-display text-sm font-semibold text-[--color-ink] tracking-tight">Manteis Systems</span>
      </div>
      <span className="meta hidden md:block">SEATTLE · 47.6062°N 122.3321°W</span>
    </nav>
  );
}

// ─── HERO — Swiss science poster layout ─────────────────────────────────
function Hero() {
  return (
    <section className="relative min-h-screen pt-14 overflow-hidden">
      {/* Visible 12-column grid lines */}
      <div className="absolute inset-0 grid-lines opacity-50 pointer-events-none" />

      {/* Perspective wireframe grid — hero only */}
      <PerspectiveGrid className="absolute bottom-0 right-0 w-[70vw] h-[55vh] opacity-70 pointer-events-none" />

      {/* Solar ignition glow — bottom-right, off-center */}
      <div className="solar-glow" style={{ width: 720, height: 720, bottom: -240, right: -180 }} />

      {/* Concentric rings — upper-left anchor */}
      <Rings className="absolute top-24 left-[-120px] w-[420px] h-[420px] opacity-70 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto min-h-[calc(100vh-56px)] grid grid-cols-12 gap-0">
        {/* Left column — metadata + headline */}
        <div className="col-span-12 md:col-span-7 flex flex-col justify-end p-6 md:p-10 border-r border-[--color-border]">
          <p className="meta mb-8">MNTS-SCI-001 · POSTER EDITION · VOID MODE</p>

          <h1 className="text-[clamp(48px,8vw,120px)] leading-[0.92] tracking-[-0.05em] font-semibold text-[--color-ink] max-w-[12ch]">
            Local AI.
            <br />
            Built like
            <br />
            <span className="text-[--color-signal]">infrastructure.</span>
          </h1>

          <p className="font-body text-lg md:text-xl text-[--color-ink-2] leading-[1.6] max-w-[58ch] mt-8 mb-10">
            25+ years of enterprise IT, deployed as private AI, automation, and
            zero-trust security for Seattle-area businesses.
          </p>

          <div className="flex items-center gap-8">
            <a href="#contact" className="btn">Book a Discovery Call</a>
            <span className="meta">FREE 60 MIN · NO PITCH DECK</span>
          </div>
        </div>

        {/* Right column — graphical anchors */}
        <div className="col-span-12 md:col-span-5 relative flex flex-col">
          {/* Large display number */}
          <div className="flex-1 flex items-center justify-center border-b border-[--color-border]">
            <span className="display-num">25</span>
          </div>

          {/* Spec panel */}
          <div className="p-6 md:p-10 border-b border-[--color-border]">
            <p className="meta mb-4">YEARS ENTERPRISE IT</p>
            <div className="grid grid-cols-2 gap-y-3 gap-x-6">
              {[
                { k: "Location", v: "Seattle, WA" },
                { k: "Focus", v: "Local AI infra" },
                { k: "Model", v: "Sovereign Node" },
                { k: "Status", v: "Accepting clients" },
              ].map((row) => (
                <div key={row.k} className="flex flex-col">
                  <span className="meta">{row.k}</span>
                  <span className="font-body text-[15px] text-[--color-ink] font-medium">{row.v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Small index panel */}
          <div className="p-6 md:p-10 flex items-end justify-between">
            <span className="display-num text-[80px] md:text-[120px] !leading-none">01</span>
            <span className="meta max-w-[100px] text-right">SYSTEMS CONSULTANCY EDITION 2026</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── SERVICES — Swiss rack with 1px hairline dividers ───────────────────
function Services() {
  const services = [
    {
      num: "02",
      title: "AI Infrastructure",
      rate: "$350/hr",
      desc: "Private LLMs, agent orchestration, and vector memory on hardware you own. No API keys. No egress.",
      points: ["Sovereign Node provisioning", "Agent orchestration", "Vector memory architecture"],
    },
    {
      num: "03",
      title: "Security & Compliance",
      rate: "$350/hr",
      desc: "ZTNA, endpoint hardening, MDM governance, and SANS-aligned audits for regulated operations.",
      points: ["Zero-trust network access", "Endpoint protection", "Compliance-ready infra"],
    },
    {
      num: "04",
      title: "Automation & Fleet",
      rate: "$350/hr",
      desc: "Fleet management and workflow automation across Intune, Jamf Pro, M365, AD, Docker, and n8n.",
      points: ["Infrastructure automation", "Container orchestration", "MDM fleet management"],
    },
  ];

  return (
    <section id="services" className="relative border-t border-[--color-border]">
      {/* Section header — asymmetric 12-col */}
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-0">
        <div className="col-span-12 md:col-span-3 p-6 md:p-10 border-b md:border-b-0 md:border-r border-[--color-border]">
          <span className="display-num text-[64px] md:text-[96px] !leading-none">02</span>
          <p className="meta mt-4">SERVICES</p>
        </div>
        <div className="col-span-12 md:col-span-9 p-6 md:p-10 flex flex-col justify-center border-b border-[--color-border]">
          <h2 className="text-[clamp(32px,5vw,64px)] leading-[1.0] tracking-[-0.04em] font-semibold text-[--color-ink]">
            Three engagement models.
          </h2>
          <p className="font-body text-lg text-[--color-ink-2] leading-[1.65] max-w-[65ch] mt-4">
            Consultancy built for organizations that want AI without surrendering data, budget, or control.
          </p>
        </div>
      </div>

      {/* Swiss rack rows */}
      <div className="max-w-7xl mx-auto flex flex-col">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            whileInView={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.05 }}
            className="grid grid-cols-12 gap-0 border-b border-[--color-border] hover:bg-white/[0.015] transition-colors group"
          >
            <div className="col-span-12 md:col-span-1 p-6 md:p-8 border-b md:border-b-0 md:border-r border-[--color-border]">
              <span className="display-num text-[48px] md:text-[64px] !leading-none group-hover:text-[--color-signal] transition-colors">{s.num}</span>
            </div>
            <div className="col-span-12 md:col-span-4 p-6 md:p-8 border-b md:border-b-0 md:border-r border-[--color-border]">
              <h3 className="text-[clamp(22px,2.5vw,34px)] leading-[1.1] tracking-[-0.02em] font-semibold text-[--color-ink] mb-3">
                {s.title}
              </h3>
              <p className="font-body text-[15px] font-semibold text-[--color-signal]">{s.rate}</p>
            </div>
            <div className="col-span-12 md:col-span-4 p-6 md:p-8 border-b md:border-b-0 md:border-r border-[--color-border]">
              <p className="font-body text-base text-[--color-ink-2] leading-[1.7] max-w-[50ch]">{s.desc}</p>
            </div>
            <div className="col-span-12 md:col-span-3 p-6 md:p-8">
              <p className="meta mb-3">DELIVERABLES</p>
              <ul className="flex flex-col gap-2">
                {s.points.map((p) => (
                  <li key={p} className="font-body text-[14px] text-[--color-ink-2] flex items-start gap-2.5">
                    <span className="w-1 h-1 bg-[--color-signal] mt-2 shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── SOVEREIGN NODE — dithered gradient + spec rack ─────────────────────
function Approach() {
  return (
    <section id="approach" className="relative border-t border-[--color-border]">
      <DitheredPanel className="min-h-[70vh]">
        {/* Visible grid overlay */}
        <div className="absolute inset-0 grid-lines opacity-30 pointer-events-none" />

        {/* One warm glow source */}
        <div className="solar-glow" style={{ width: 640, height: 640, top: "10%", right: "-15%" }} />

        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-12 gap-0 min-h-[70vh]">
          <div className="col-span-12 md:col-span-5 p-6 md:p-10 border-r border-[--color-border] flex flex-col justify-center">
            <p className="meta mb-6">/ SOVEREIGN NODE</p>
            <h2 className="text-[clamp(32px,5vw,64px)] leading-[1.0] tracking-[-0.04em] font-semibold text-[--color-ink] mb-6">
              Your AI.
              <br />
              Your hardware.
              <br />
              Your <span className="text-[--color-signal]">network.</span>
            </h2>
            <p className="font-body text-lg text-[--color-ink-2] leading-[1.7] max-w-[55ch]">
              A dedicated local server running private inference, persistent vector memory, and custom agents.
              Every query stays on your machine.
            </p>
          </div>

          <div className="col-span-12 md:col-span-7 flex flex-col">
            {/* Pricing rack */}
            <div className="flex-1 p-6 md:p-10 border-b border-[--color-border] flex flex-col justify-center">
              <p className="meta mb-6">SOVEREIGN NODE PRICING</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[--color-border]">
                {[
                  { name: "Starter", price: "$2,500", note: "4 agents · 1 model" },
                  { name: "Professional", price: "$5,000", note: "10 agents · 3 models" },
                  { name: "Enterprise", price: "$7,500", note: "Unlimited agents" },
                ].map((t, idx) => (
                  <div key={t.name} className="bg-[--color-canvas] p-5 md:p-6 group hover:bg-[--color-surface] transition-colors">
                    <span className="meta block mb-3">0{idx + 1}</span>
                    <span className="font-body text-[15px] font-semibold text-[--color-ink] block">{t.name}</span>
                    <span className="font-display text-[32px] font-semibold text-[--color-signal] tracking-[-0.02em] block mt-1">{t.price}</span>
                    <span className="meta block mt-2">{t.note}</span>
                    <span className="meta block mt-1">$2,000/mo managed</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Spec rack */}
            <div className="p-6 md:p-10">
              <p className="meta mb-6">TECHNICAL SPECIFICATION</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-t border-l border-[--color-border]">
                {[
                  { k: "Inference", v: "Local open-weight models" },
                  { k: "Memory", v: "Persistent vector store" },
                  { k: "Security", v: "ZTNA + FDE + endpoint EDR" },
                  { k: "Agents", v: "Custom MCP toolchains" },
                ].map((spec) => (
                  <div key={spec.k} className="p-4 border-r border-b border-[--color-border]">
                    <span className="meta block mb-1">{spec.k}</span>
                    <span className="font-body text-[15px] text-[--color-ink]">{spec.v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DitheredPanel>
    </section>
  );
}

// ─── CASE STUDY — asymmetric split with display number ───────────────────
function CaseStudy() {
  return (
    <section id="case-study" className="relative border-t border-[--color-border]">
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-0">
        <div className="col-span-12 md:col-span-4 p-6 md:p-10 border-r border-[--color-border] flex flex-col justify-between">
          <div>
            <p className="meta mb-4">/ CASE STUDY</p>
            <p className="font-body text-[15px] text-[--color-ink-2] leading-[1.7] max-w-[40ch]">
              PNW contractor · anonymized · live deployment
            </p>
          </div>
          <span className="display-num text-[80px] md:text-[140px] !leading-none mt-8 md:mt-0">3</span>
        </div>

        <div className="col-span-12 md:col-span-8 p-6 md:p-10 flex flex-col justify-center">
          <blockquote className="text-[clamp(28px,4vw,48px)] leading-[1.15] tracking-[-0.03em] font-semibold text-[--color-ink] mb-10 max-w-[75ch]">
            &ldquo;They don&apos;t need another app.
            <span className="text-[--color-ink-3]"> They need an Agent.&rdquo;</span>
          </blockquote>

          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-7 flex flex-col gap-5">
              <p className="font-body text-[17px] text-[--color-ink-2] leading-[1.7] max-w-[65ch]">
                The owner was losing 3+ hours a week to repetitive overhead: copying estimates,
                chasing email threads, and manually updating job status across disconnected tools.
              </p>
              <p className="font-body text-[17px] text-[--color-ink-2] leading-[1.7] max-w-[65ch]">
                A single Sovereign Node now handles client intake, quote follow-ups, project updates,
                and communication coordination — locally, privately, without new cloud subscriptions.
              </p>
              <div className="flex items-center gap-3 mt-2">
                <span className="w-2 h-2 bg-[--color-signal] animate-pulse" />
                <span className="font-body text-[14px] font-semibold text-[--color-signal]">Deployment: Live</span>
              </div>
            </div>

            <div className="col-span-12 md:col-span-5 md:border-l md:border-[--color-border] md:pl-8 flex flex-col gap-6">
              {[
                { v: "3 hrs", l: "Per week recovered" },
                { v: "0", l: "Cloud subscriptions added" },
                { v: "1", l: "Sovereign Node provisioned" },
                { v: "Q1 2026", l: "Deployment date" },
              ].map((m) => (
                <div key={m.l}>
                  <div className="text-3xl font-semibold text-[--color-ink] tracking-[-0.02em]">{m.v}</div>
                  <div className="font-body text-[13px] text-[--color-ink-3] mt-1">{m.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CTA — centered solar ignition ──────────────────────────────────────
function CTA() {
  return (
    <section id="contact" className="relative border-t border-[--color-border] overflow-hidden">
      <div className="solar-glow" style={{ width: 680, height: 680, top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-12 gap-0 py-24 md:py-40">
        <div className="col-span-12 md:col-span-8 md:col-start-3 text-center flex flex-col items-center gap-6">
          <h2 className="text-[clamp(40px,6vw,80px)] leading-[1.05] tracking-[-0.04em] font-semibold text-[--color-ink]">
            Let&apos;s talk.
          </h2>
          <p className="font-body text-lg text-[--color-ink-2] leading-[1.65] max-w-[60ch]">
            60 minutes. No pitch deck. We audit your current infrastructure, identify where overhead
            is bleeding your time, and propose the right configuration for your operation.
          </p>
          <a href="mailto:rhett@manteissystems.com" className="btn mt-4">Book a Discovery Call</a>
          <p className="meta mt-2">Standard: $2,500–$7,500 · Non-profit: $1,500–$3,000</p>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ─────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="border-t border-[--color-border] px-6 md:px-10 py-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-body text-[13px] text-[--color-ink-3]">
          Manteis Systems · AI Infrastructure Consulting · Seattle, WA
        </span>
        <span className="meta">© 2026</span>
      </div>
    </footer>
  );
}

// ─── PAGE ───────────────────────────────────────────────────────────────
export default function V1Page() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Nav />
      <Hero />
      <Services />
      <Approach />
      <CaseStudy />
      <CTA />
      <Footer />
    </main>
  );
}
