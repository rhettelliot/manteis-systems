"use client";

import { motion } from "motion/react";

// ─── CONCENTRIC RINGS WITH HORIZON SPLIT — vintage instrument reticle ──
function RingsHorizon({ className, signal = false }: { className?: string; signal?: boolean }) {
  return (
    <svg className={className} viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <defs>
        <mask id="horizon-top">
          <rect x="0" y="0" width="400" height="200" fill="white" />
        </mask>
        <mask id="horizon-bottom">
          <rect x="0" y="200" width="400" height="200" fill="white" />
        </mask>
      </defs>
      {[190, 155, 120, 85, 50, 20].map((r, i) => (
        <g key={r}>
          <circle cx="200" cy="200" r={r} fill="none"
            mask="url(#horizon-top)"
            stroke={signal && i === 3 ? "rgba(255,85,0,0.55)" : "rgba(244,243,238,0.14)"}
            strokeWidth={i % 2 === 0 ? 1.8 : 0.9} />
          <circle cx="200" cy="200" r={r} fill="none"
            mask="url(#horizon-bottom)"
            stroke={signal && i === 3 ? "rgba(255,85,0,0.55)" : "rgba(244,243,238,0.06)"}
            strokeWidth={i % 2 === 0 ? 1.8 : 0.9} />
        </g>
      ))}
      <line x1="0" y1="200" x2="400" y2="200" stroke="rgba(255,85,0,0.35)" strokeWidth="1" />
      <line x1="200" y1="0" x2="200" y2="400" stroke="rgba(244,243,238,0.10)" strokeWidth="0.5" strokeDasharray="4 4" />
    </svg>
  );
}

// ─── CROSSHAIR / CARTOGRAPHIC TARGET ────────────────────────────────────
function Crosshair({ className, size = 120 }: { className?: string; size?: number }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 120 120" aria-hidden>
      <circle cx="60" cy="60" r="45" fill="none" stroke="rgba(244,243,238,0.12)" strokeWidth="0.8" />
      <circle cx="60" cy="60" r="28" fill="none" stroke="rgba(255,85,0,0.45)" strokeWidth="1.2" />
      <circle cx="60" cy="60" r="8" fill="none" stroke="rgba(244,243,238,0.20)" strokeWidth="0.8" />
      <line x1="60" y1="10" x2="60" y2="40" stroke="rgba(244,243,238,0.18)" strokeWidth="0.8" />
      <line x1="60" y1="80" x2="60" y2="110" stroke="rgba(244,243,238,0.18)" strokeWidth="0.8" />
      <line x1="10" y1="60" x2="40" y2="60" stroke="rgba(244,243,238,0.18)" strokeWidth="0.8" />
      <line x1="80" y1="60" x2="110" y2="60" stroke="rgba(244,243,238,0.18)" strokeWidth="0.8" />
    </svg>
  );
}

// ─── SCOPE GRID — dithered measurement grid ─────────────────────────────
function ScopeGrid({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" aria-hidden>
      {[50, 100, 150, 200, 250, 300, 350].map((y) => (
        <line key={`h-${y}`} x1="0" y1={y} x2="800" y2={y} stroke="rgba(244,243,238,0.07)" strokeWidth="0.5" />
      ))}
      {[100, 200, 300, 400, 500, 600, 700].map((x) => (
        <line key={`v-${x}`} x1={x} y1="0" x2={x} y2="400" stroke="rgba(244,243,238,0.07)" strokeWidth="0.5" />
      ))}
      <line x1="0" y1="200" x2="800" y2="200" stroke="rgba(255,85,0,0.20)" strokeWidth="1" />
      <line x1="400" y1="0" x2="400" y2="400" stroke="rgba(255,85,0,0.20)" strokeWidth="1" />
    </svg>
  );
}

// ─── PIXEL-STYLE DISPLAY NUMBER ───────────────────────────────────────
function PixelNumber({ value, className }: { value: string; className?: string }) {
  return (
    <span className={`font-mono font-normal tracking-[-0.08em] leading-none text-[--color-ink-ghost] ${className}`}>
      {value}
    </span>
  );
}

// ─── NAV ────────────────────────────────────────────────────────────────
function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-between px-6 md:px-10 bg-[--color-canvas]/90 backdrop-blur-md border-b border-[--color-border] font-mono">
      <div className="flex items-center gap-3">
        <div className="w-1.5 h-1.5 bg-[--color-signal]" />
        <span className="text-[13px] text-[--color-ink] tracking-[-0.01em]">MANTEIS // V3</span>
      </div>
      <ul className="hidden md:flex gap-8 list-none">
        {["SVC", "APPR", "CASE", "CTA"].map((item) => (
          <li key={item}>
            <a href={`#${item.toLowerCase()}`} className="text-[12px] text-[--color-ink-3] hover:text-[--color-ink] transition-colors tracking-widest">
              {item}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// ─── HERO — instrument panel, dark slate canvas ─────────────────────────
function Hero() {
  return (
    <section className="relative min-h-screen flex items-end pb-20 md:pb-32 px-6 md:px-10 overflow-hidden">
      {/* Heavy grain overlay (8% opacity) */}
      <div className="absolute inset-0 pointer-events-none z-[60] opacity-[0.08]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='6' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          mixBlendMode: "overlay"
        }} />

      {/* Dithered gradient background */}
      <div className="absolute inset-0 dithered bg-[radial-gradient(ellipse_at_50%_100%,rgba(255,85,0,0.10)_0%,transparent_50%),radial-gradient(ellipse_at_100%_0%,rgba(244,243,238,0.04)_0%,transparent_40%)]" />

      {/* Scope grid */}
      <ScopeGrid className="absolute inset-0 w-full h-full opacity-60 pointer-events-none" />

      {/* Rings */}
      <RingsHorizon className="absolute top-16 right-[-80px] w-[420px] h-[420px] opacity-80 pointer-events-none" signal />
      <Crosshair className="absolute bottom-32 left-12 opacity-40 pointer-events-none" size={100} />

      {/* Corner anchor labels */}
      <div className="absolute top-20 left-6 md:left-10 font-mono text-[11px] text-[--color-ink-3] tracking-widest">GRID: 47.6062N_122.3321W</div>
      <div className="absolute top-20 right-6 md:right-10 font-mono text-[11px] text-[--color-ink-3] tracking-widest">REF: V3-DITHER-MONO</div>
      <div className="absolute bottom-6 left-6 md:left-10 font-mono text-[11px] text-[--color-ink-3] tracking-widest">EST. 1998</div>
      <div className="absolute bottom-6 right-6 md:right-10 font-mono text-[11px] text-[--color-ink-3] tracking-widest text-right">CALIBRATE</div>

      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-7 flex flex-col gap-6">
          <p className="font-mono text-[11px] text-[--color-ink-3] tracking-[0.06em]">SEATTLE · PNW · LOCAL FIRST</p>

          <h1 className="text-[clamp(36px,7vw,96px)] leading-[0.98] tracking-[-0.04em] font-semibold text-[--color-ink] font-display">
            Sovereign
            <br />
            computing for
            <br />
            <span className="text-[--color-signal]">private AI.</span>
          </h1>

          <p className="font-mono text-base md:text-lg text-[--color-ink-2] leading-[1.75] max-w-[70ch] mt-2">
            25+ years of enterprise IT, recoded as local inference, agent automation, and
            zero-trust security. No cloud lock-in. No telemetry. Hardware you own.
          </p>

          <div className="flex items-center gap-6 mt-4">
            <a href="#cta" className="btn font-mono text-[13px] px-6 py-3">INIT_DISCOVERY</a>
            <span className="font-mono text-[11px] text-[--color-ink-3]">FREE_60MIN // NO_PITCH</span>
          </div>
        </div>

        <div className="hidden md:flex col-span-5 items-end justify-end relative">
          <PixelNumber value="25" className="text-[140px] md:text-[180px]" />
          <span className="font-mono text-[11px] text-[--color-ink-3] absolute bottom-4 right-0 text-right max-w-[140px] leading-relaxed">
            YEARS_ENTERPRISE_IT
          </span>
        </div>
      </div>
    </section>
  );
}

// ─── SERVICES — data-as-texture rack ────────────────────────────────────
function Services() {
  const services = [
    {
      num: "01",
      code: "SVC-AIINF",
      title: "AI Infrastructure",
      desc: "Private LLMs, agent orchestration, and vector memory on hardware you own. No API keys. No egress.",
      deliverables: ["Sovereign Node", "Agent orchestration", "Vector memory", "MCP tooling"],
      price: "$350/hr · from $2,000/mo",
    },
    {
      num: "02",
      code: "SVC-SEC",
      title: "Security & Compliance",
      desc: "ZTNA, endpoint hardening, MDM governance, and compliance-ready infrastructure. SANS-aligned.",
      deliverables: ["ZTNA rollout", "Endpoint hardening", "MDM governance", "Audit remediation"],
      price: "$350/hr · from $10k fixed",
    },
    {
      num: "03",
      code: "SVC-AUTO",
      title: "Automation & Fleet",
      desc: "Fleet management and workflow automation across Intune, Jamf, M365, AD, Docker, and n8n.",
      deliverables: ["Infra automation", "Container orchestration", "Workflow pipelines", "MDM fleet mgmt"],
      price: "$350/hr · from $10k fixed",
    },
  ];

  return (
    <section id="svc" className="relative px-6 md:px-10 py-24 md:py-40 border-t border-[--color-border] overflow-hidden">
      <div className="absolute inset-0 dithered bg-[linear-gradient(180deg,transparent_0%,rgba(255,85,0,0.04)_50%,transparent_100%)]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-12 gap-6 mb-16 md:mb-24">
          <div className="col-span-12 md:col-span-8">
            <p className="font-mono text-[11px] text-[--color-ink-3] mb-4 tracking-widest">/// SYSTEM_MODULES</p>
            <h2 className="text-[clamp(32px,5vw,64px)] leading-[1.0] tracking-[-0.03em] font-semibold text-[--color-ink] font-display">
              Module registry
            </h2>
          </div>
        </div>

        <div className="flex flex-col gap-0">
          {services.map((s, i) => {
            return (
              <motion.div
                key={s.code}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
                className="grid grid-cols-12 gap-6 md:gap-10 items-start py-12 border-t border-[--color-border] hover:bg-white/[0.02] transition-colors duration-300 group"
              >
                <div className="col-span-12 md:col-span-1">
                  <PixelNumber value={s.num} className="text-[56px] md:text-[72px] block group-hover:text-[--color-signal] transition-colors duration-500" />
                </div>

                <div className="col-span-12 md:col-span-3 md:border-r md:border-[--color-border] md:pr-8">
                  <p className="font-mono text-[11px] text-[--color-signal] tracking-widest mb-2">{s.code}</p>
                  <h3 className="text-[clamp(22px,3vw,36px)] leading-[1.1] tracking-[-0.02em] font-semibold text-[--color-ink] font-display">
                    {s.title}
                  </h3>
                </div>

                <div className="col-span-12 md:col-span-5">
                  <p className="font-mono text-[15px] text-[--color-ink-2] leading-[1.75] max-w-[65ch] mb-4">
                    {s.desc}
                  </p>
                  <p className="font-mono text-[13px] text-[--color-signal]">{s.price}</p>
                </div>

                <div className="col-span-12 md:col-span-3 md:pl-4">
                  <p className="font-mono text-[10px] text-[--color-ink-3] mb-4 tracking-widest">DELIVERABLES</p>
                  <ul className="flex flex-col gap-2.5">
                    {s.deliverables.map((d) => (
                      <li key={d} className="font-mono text-[13px] text-[--color-ink-2] flex items-start gap-3">
                        <span className="w-1 h-1 bg-[--color-signal] mt-2 shrink-0" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── APPROACH — oscilloscope / terminal readout ─────────────────────────
function Approach() {
  return (
    <section id="appr" className="relative px-6 md:px-10 py-24 md:py-40 border-t border-[--color-border] overflow-hidden">
      <div className="absolute inset-0 dithered bg-[radial-gradient(ellipse_at_30%_100%,rgba(255,85,0,0.08)_0%,transparent_55%)]" />
      <ScopeGrid className="absolute inset-0 w-full h-full opacity-40 pointer-events-none" />

      {/* Concentric rings with horizon split */}
      <RingsHorizon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-50 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-5">
          <p className="font-mono text-[11px] text-[--color-ink-3] mb-8 tracking-widest">/// SOVEREIGN_NODE</p>
          <h2 className="text-[clamp(32px,5vw,64px)] leading-[1.0] tracking-[-0.03em] font-semibold text-[--color-ink] font-display">
            Local node.
            <br />
            Full control.
            <br />
            Zero <span className="text-[--color-signal]">egress.</span>
          </h2>
        </div>

        <div className="col-span-12 md:col-span-6 md:col-start-7 flex flex-col gap-6">
          <p className="font-mono text-[15px] text-[--color-ink-2] leading-[1.75] max-w-[70ch]">
            A dedicated AI server running private inference, persistent vector memory, and
            custom agents. Every request stays inside your LAN. Your data is never transmitted,
            logged, or trained upon.
          </p>

          <hr className="hairline my-2" />

          <div className="flex flex-col gap-0">
            {[
              { k: "hardware", v: "Compact desktop / pro workstation / custom" },
              { k: "inference", v: "Local models, zero API dependency" },
              { k: "vector_db", v: "Persistent local store, encrypted at rest" },
              { k: "security", v: "ZTNA + endpoint protection + FDE" },
            ].map((s) => (
              <div key={s.k} className="flex gap-6 items-baseline py-3 border-b border-[--color-border] font-mono">
                <span className="text-[12px] font-semibold text-[--color-ink] w-28 shrink-0 tracking-widest">{s.k}</span>
                <span className="text-[13px] text-[--color-ink-3]">{s.v}</span>
              </div>
            ))}
          </div>

          <hr className="hairline my-2" />

          <div className="flex flex-col gap-0 font-mono">
            {[
              { name: "STARTER", price: "$2,500", note: "4 agents · 1 model" },
              { name: "PRO", price: "$5,000", note: "10 agents · 3 models" },
              { name: "ENTERPRISE", price: "$7,500", note: "Unlimited agents" },
            ].map((t) => (
              <div key={t.name} className="flex items-baseline gap-6 py-3 border-b border-[--color-border] hover:bg-white/[0.02] transition-colors px-2 -mx-2">
                <span className="text-[12px] font-semibold text-[--color-ink] w-24 tracking-widest">{t.name}</span>
                <span className="text-2xl font-semibold text-[--color-signal] tracking-[-0.02em] font-display">{t.price}</span>
                <span className="text-[11px] text-[--color-ink-3]">{t.note}</span>
                <span className="text-[11px] text-[--color-ink-3] ml-auto">$2K/mo managed</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CASE STUDY — telemetry readout ─────────────────────────────────────
function CaseStudy() {
  return (
    <section id="case" className="relative px-6 md:px-10 py-24 md:py-40 border-t border-[--color-border] overflow-hidden">
      <div className="absolute inset-0 dithered bg-[linear-gradient(90deg,rgba(255,85,0,0.03)_0%,transparent_50%)]" />

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-4">
          <p className="font-mono text-[11px] text-[--color-ink-3] mb-6 tracking-widest">/// CASE · PNW_CONTRACTOR</p>
          <Crosshair className="opacity-30 mb-6" size={80} />
        </div>

        <div className="col-span-12 md:col-span-8">
          <blockquote className="text-[clamp(28px,4.5vw,52px)] leading-[1.15] tracking-[-0.03em] font-semibold text-[--color-ink] mb-12 max-w-[75ch] font-display">
            &ldquo;They needed an Agent,
            <span className="text-[--color-ink-3]"> not another SaaS dashboard.&rdquo;</span>
          </blockquote>

          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-7 flex flex-col gap-5">
              <p className="font-mono text-[15px] text-[--color-ink-2] leading-[1.75] max-w-[70ch]">
                3+ hours a week lost to copy-paste estimates, email threads, and status updates
                across disconnected tools.
              </p>
              <p className="font-mono text-[15px] text-[--color-ink-2] leading-[1.75] max-w-[70ch]">
                The Sovereign Node now runs client intake, quote follow-ups, project status,
                and communication coordination locally — with zero new cloud subscriptions.
              </p>
              <div className="flex items-center gap-3 mt-2 font-mono">
                <span className="w-1.5 h-1.5 bg-[--color-signal] animate-pulse" />
                <span className="text-[13px] text-[--color-signal]">STATUS: LIVE</span>
              </div>
            </div>

            <div className="col-span-12 md:col-span-5 md:border-l md:border-[--color-border] md:pl-8 flex flex-col gap-6">
              {[
                { v: "3 hrs", l: "WEEKLY_RECOVERY" },
                { v: "0", l: "CLOUD_SUBSCRIPTIONS_ADDED" },
                { v: "1", l: "SOVEREIGN_NODE_PROVISIONED" },
                { v: "Q1_2026", l: "DEPLOYMENT_DATE" },
              ].map((m) => (
                <div key={m.l}>
                  <div className="text-3xl font-semibold text-[--color-ink] tracking-[-0.02em] font-display">{m.v}</div>
                  <div className="font-mono text-[11px] text-[--color-ink-3] mt-1 tracking-widest">{m.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CTA — terminal prompt ──────────────────────────────────────────────
function CTA() {
  return (
    <section id="cta" className="relative px-6 md:px-10 py-24 md:py-40 border-t border-[--color-border] overflow-hidden">
      <div className="absolute inset-0 dithered bg-[radial-gradient(ellipse_at_50%_50%,rgba(255,85,0,0.10)_0%,transparent_55%)]" />
      <ScopeGrid className="absolute inset-0 w-full h-full opacity-30 pointer-events-none" />
      <RingsHorizon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-40 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-8 md:col-start-3 text-center flex flex-col items-center gap-6">
          <p className="font-mono text-[11px] text-[--color-ink-3] tracking-widest">/// READY_STATE</p>
          <h2 className="text-[clamp(36px,6vw,72px)] leading-[1.1] tracking-[-0.03em] font-semibold text-[--color-ink] font-display">
            Execute discovery.
          </h2>
          <p className="font-mono text-[15px] text-[--color-ink-2] leading-[1.75] max-w-[65ch]">
            60-minute audit of your infrastructure. No pitch deck. We identify overhead,
            map the right configuration, and quote transparently.
          </p>
          <a href="mailto:rhett@manteissystems.com" className="btn font-mono text-[13px] px-8 py-4 mt-4">BOOK_DISCOVERY</a>
          <p className="font-mono text-[11px] text-[--color-ink-3] mt-2 tracking-widest">STD: $2.5K–$7.5K · NPO: $1.5K–$3K</p>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ─────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="border-t border-[--color-border] px-6 md:px-10 py-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 font-mono">
        <span className="text-[11px] text-[--color-ink-3] tracking-widest">
          MANTEIS SYSTEMS · SEATTLE, WA
        </span>
        <span className="text-[11px] text-[--color-ink-3]">© 2026 · BUILD_V3</span>
      </div>
    </footer>
  );
}

// ─── PAGE ──────────────────────────────────────────────────────────────
export default function V3() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[--color-canvas]">
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
