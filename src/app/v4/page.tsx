"use client";

import { motion } from "motion/react";

// ─── EDITORIAL NUMBER ANCHOR — massive, ghost, left-margin friendly ─────
function SectionNumber({ value }: { value: string }) {
  return (
    <span className="font-display font-semibold text-[clamp(72px,12vw,160px)] leading-[0.85] tracking-[-0.06em] text-[--color-ink-ghost]">
      {value}
    </span>
  );
}

// ─── HAIRLINE DIVIDER ───────────────────────────────────────────────────
function Hairline({ className }: { className?: string }) {
  return <div className={`h-px bg-[--color-border] ${className}`} />;
}

// ─── NAV ────────────────────────────────────────────────────────────────
function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-20 flex items-center justify-between px-6 md:px-12 bg-[--color-canvas]/85 backdrop-blur-md border-b border-[--color-border]">
      <div className="flex items-center gap-3">
        <div className="w-8 h-[2px] bg-[--color-signal]" />
        <span className="font-display text-[15px] font-semibold text-[--color-ink] tracking-tight">Manteis Systems</span>
      </div>
      <ul className="hidden md:flex gap-10 list-none">
        {["Services", "Approach", "Case Study", "Contact"].map((item) => (
          <li key={item}>
            <a href={`#${item.toLowerCase().replace(" ", "-")}`}
              className="font-display text-[14px] font-medium text-[--color-ink-3] hover:text-[--color-ink] transition-colors">
              {item}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// ─── HERO — asymmetric split, magazine cover proportions ────────────────
function Hero() {
  return (
    <section className="relative min-h-screen flex items-end pb-16 md:pb-24 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_100%,rgba(255,85,0,0.08)_0%,transparent_50%)]" />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto grid grid-cols-12 gap-0 min-h-[calc(100vh-80px)]">
        {/* Left — large type panel, 65% */}
        <div className="col-span-12 md:col-span-7 flex flex-col justify-end px-6 md:px-12 pb-12 md:pb-20">
          <p className="font-display text-[13px] text-[--color-ink-3] tracking-[0.12em] uppercase mb-8">
            AI Infrastructure Consulting · Seattle
          </p>

          <h1 className="text-[clamp(48px,9vw,130px)] leading-[0.92] tracking-[-0.05em] font-semibold text-[--color-ink]">
            Private
            <br />
            <span className="text-[--color-signal]">AI,</span>
            <br />
            your terms.
          </h1>

          <p className="font-body text-[clamp(16px,1.6vw,21px)] text-[--color-ink-2] leading-[1.65] max-w-[55ch] mt-10">
            25+ years of enterprise IT, rebuilt for local inference, agent automation,
            and zero-trust security.
          </p>

          <div className="flex items-center gap-8 mt-10">
            <a href="#contact" className="btn">Book a Discovery Call</a>
            <span className="font-body text-[14px] text-[--color-ink-3]">Free 60 min · No pitch</span>
          </div>
        </div>

        {/* Right — unequal secondary panel, 35% */}
        <div className="col-span-12 md:col-span-5 relative border-l border-[--color-border] flex flex-col justify-between px-6 md:px-10 py-12 md:py-20">
          <div className="hidden md:block">
            <p className="font-display text-[14px] text-[--color-ink-3] leading-relaxed max-w-[28ch]">
              No API keys. No per-token bills. No data leaving your network.
            </p>
          </div>

          <div className="flex flex-col gap-8 mt-12 md:mt-0">
            <div>
              <span className="font-display text-[clamp(56px,8vw,110px)] font-semibold text-[--color-ink] tracking-[-0.05em] leading-none">25</span>
              <p className="font-body text-[14px] text-[--color-ink-3] mt-2">Years of enterprise IT</p>
            </div>

            <Hairline />

            <div>
              <span className="font-display text-[clamp(40px,6vw,80px)] font-semibold text-[--color-signal] tracking-[-0.04em] leading-none">0</span>
              <p className="font-body text-[14px] text-[--color-ink-3] mt-2">Cloud subscriptions required</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── SERVICES — Z-pattern alternating sections, inline pricing ─────────
function Services() {
  const services = [
    {
      num: "01",
      title: "AI Infrastructure",
      headline: "Own the model.",
      desc: "Deploy private LLMs, agent orchestration, and vector memory on hardware you control. Every query stays inside your LAN.",
      price: "$350/hr",
      note: "From $2,000/mo managed",
      details: ["Sovereign Node provisioning", "Agent orchestration", "Vector memory architecture", "Custom MCP development"],
    },
    {
      num: "02",
      title: "Security & Compliance",
      headline: "Close the door.",
      desc: "ZTNA rollout, endpoint hardening, MDM governance, and SANS-aligned audits for compliance-ready infrastructure.",
      price: "$350/hr",
      note: "Fixed projects from $10,000",
      details: ["ZTNA architecture", "Endpoint hardening", "MDM governance", "Audit remediation"],
    },
    {
      num: "03",
      title: "Automation & Fleet",
      headline: "Delete the busywork.",
      desc: "Fleet management and workflow automation across Intune, Jamf Pro, M365, Active Directory, Docker, and n8n.",
      price: "$350/hr",
      note: "Fixed projects from $10,000",
      details: ["Infrastructure automation", "Container orchestration", "Workflow pipelines", "MDM fleet management"],
    },
  ];

  return (
    <section id="services" className="relative border-t border-[--color-border]">
      {services.map((s, i) => {
        const isEven = i % 2 === 0;
        return (
          <motion.div
            key={s.num}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-12 gap-0 border-b border-[--color-border] min-h-[70vh]"
          >
            {/* Text panel — alternates sides */}
            <div className={`col-span-12 md:col-span-7 flex flex-col justify-center px-6 md:px-12 py-16 md:py-24 ${isEven ? "" : "md:col-start-6 md:border-l"} ${i === 0 || isEven ? "" : ""}`}>
              <p className="font-display text-[13px] text-[--color-signal] tracking-[0.12em] uppercase mb-6">{s.title}</p>
              <h3 className="text-[clamp(36px,6vw,84px)] leading-[0.95] tracking-[-0.04em] font-semibold text-[--color-ink] max-w-[18ch]">
                {s.headline}
              </h3>
              <p className="font-body text-[clamp(15px,1.4vw,19px)] text-[--color-ink-2] leading-[1.65] max-w-[50ch] mt-8">
                {s.desc}
              </p>

              <div className="flex items-baseline gap-6 mt-10">
                <span className="font-display text-[clamp(28px,3.5vw,48px)] font-semibold text-[--color-ink] tracking-[-0.03em]">{s.price}</span>
                <span className="font-body text-[15px] text-[--color-ink-3]">{s.note}</span>
              </div>
            </div>

            {/* Number / detail panel — opposite side */}
            <div className={`col-span-12 md:col-span-5 flex flex-col justify-between px-6 md:px-10 py-16 md:py-24 border-t md:border-t-0 ${isEven ? "md:border-l border-[--color-border]" : "md:border-r border-[--color-border]"}`}>
              <SectionNumber value={s.num} />

              <div className="flex flex-col gap-0 mt-12 md:mt-0">
                {s.details.map((d, idx) => (
                  <div key={d} className="flex items-baseline gap-4 py-3 border-b border-[--color-border]">
                    <span className="font-display text-[13px] text-[--color-ink-3] w-6">{String(idx + 1).padStart(2, "0")}</span>
                    <span className="font-body text-[15px] text-[--color-ink-2]">{d}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        );
      })}
    </section>
  );
}

// ─── APPROACH — split-screen editorial, typography-driven ───────────────
function Approach() {
  return (
    <section id="approach" className="relative border-t border-[--color-border]">
      <div className="grid grid-cols-12 gap-0 min-h-[80vh]">
        {/* Left — oversized headline */}
        <div className="col-span-12 md:col-span-8 flex flex-col justify-center px-6 md:px-12 py-20 md:py-32">
          <p className="font-display text-[13px] text-[--color-ink-3] tracking-[0.12em] uppercase mb-8">The Sovereign Node</p>
          <h2 className="text-[clamp(42px,8vw,120px)] leading-[0.92] tracking-[-0.05em] font-semibold text-[--color-ink] max-w-[14ch]">
            Your AI.
            <br />
            Your hardware.
            <br />
            Your <span className="text-[--color-signal]">LAN.</span>
          </h2>
        </div>

        {/* Right — body + specs, narrower */}
        <div className="col-span-12 md:col-span-4 flex flex-col justify-center px-6 md:px-10 py-20 md:py-32 border-l border-[--color-border]">
          <p className="font-body text-[clamp(15px,1.4vw,19px)] text-[--color-ink-2] leading-[1.65] max-w-[36ch]">
            A dedicated local server running private inference, persistent vector memory, and custom agents.
          </p>

          <div className="flex flex-col gap-0 mt-12">
            {[
              { k: "Hardware", v: "Compact desktop or custom build" },
              { k: "Inference", v: "Local models, no API keys" },
              { k: "Vector DB", v: "Encrypted at rest" },
              { k: "Security", v: "ZTNA + EDR + FDE" },
            ].map((s) => (
              <div key={s.k} className="flex flex-col gap-1 py-4 border-b border-[--color-border]">
                <span className="font-display text-[12px] text-[--color-ink-3] tracking-[0.1em] uppercase">{s.k}</span>
                <span className="font-body text-[16px] text-[--color-ink]">{s.v}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-0 mt-12">
            {[
              { name: "Starter", price: "$2,500", note: "4 agents · 1 model" },
              { name: "Professional", price: "$5,000", note: "10 agents · 3 models" },
              { name: "Enterprise", price: "$7,500", note: "Unlimited agents" },
            ].map((t) => (
              <div key={t.name} className="flex items-baseline gap-4 py-4 border-b border-[--color-border]">
                <span className="font-display text-[14px] text-[--color-ink] w-28">{t.name}</span>
                <span className="font-display text-[22px] font-semibold text-[--color-signal] tracking-[-0.02em]">{t.price}</span>
                <span className="font-body text-[13px] text-[--color-ink-3] ml-auto">{t.note}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CASE STUDY — pull-quote dominant, stats inline ─────────────────────
function CaseStudy() {
  return (
    <section id="case-study" className="relative border-t border-[--color-border]">
      <div className="grid grid-cols-12 gap-0 min-h-[70vh]">
        {/* Left — metadata + stats */}
        <div className="col-span-12 md:col-span-5 flex flex-col justify-between px-6 md:px-10 py-16 md:py-24 border-r border-[--color-border]">
          <div>
            <p className="font-display text-[13px] text-[--color-ink-3] tracking-[0.12em] uppercase mb-6">Case Study</p>
            <p className="font-display text-[15px] text-[--color-ink] leading-relaxed max-w-[28ch]">
              Pacific Northwest contractor · anonymized
            </p>
          </div>

          <div className="flex flex-col gap-8 mt-12 md:mt-0">
            {[
              { v: "3 hrs", l: "Recovered weekly" },
              { v: "0", l: "Cloud subscriptions added" },
              { v: "1", l: "Sovereign Node" },
              { v: "Q1 2026", l: "Deployment" },
            ].map((m) => (
              <div key={m.l} className="flex flex-col gap-1">
                <span className="font-display text-[clamp(36px,5vw,64px)] font-semibold text-[--color-ink] tracking-[-0.04em] leading-none">{m.v}</span>
                <span className="font-body text-[14px] text-[--color-ink-3]">{m.l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — large pull quote */}
        <div className="col-span-12 md:col-span-7 flex flex-col justify-center px-6 md:px-12 py-16 md:py-24">
          <blockquote className="text-[clamp(32px,5.5vw,72px)] leading-[1.05] tracking-[-0.04em] font-semibold text-[--color-ink] max-w-[18ch]">
            They don&apos;t need another website.
            <span className="text-[--color-ink-3]"> They need an Agent.</span>
          </blockquote>

          <p className="font-body text-[clamp(15px,1.4vw,19px)] text-[--color-ink-2] leading-[1.65] max-w-[50ch] mt-12">
            Repetitive overhead — copy-paste estimates, chasing email threads, manual status updates —
            now runs locally through the Sovereign Node.
          </p>

          <div className="flex items-center gap-3 mt-8">
            <span className="w-2 h-2 rounded-full bg-[--color-signal] animate-pulse" />
            <span className="font-display text-[14px] font-semibold text-[--color-signal]">Deployment: Live</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CTA — centered, high-contrast, minimal ────────────────────────────
function CTA() {
  return (
    <section id="contact" className="relative border-t border-[--color-border] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(255,85,0,0.10)_0%,transparent_55%)]" />

      <div className="relative z-10 max-w-[1400px] mx-auto grid grid-cols-12 gap-0 min-h-[60vh]">
        <div className="col-span-12 md:col-span-10 md:col-start-2 flex flex-col items-center justify-center text-center px-6 py-24 md:py-32">
          <p className="font-display text-[13px] text-[--color-ink-3] tracking-[0.12em] uppercase mb-8">Next Step</p>
          <h2 className="text-[clamp(48px,9vw,130px)] leading-[0.92] tracking-[-0.05em] font-semibold text-[--color-ink]">
            Let&apos;s talk.
          </h2>
          <p className="font-body text-[clamp(15px,1.4vw,19px)] text-[--color-ink-2] leading-[1.65] max-w-[55ch] mt-10">
            60 minutes. No pitch deck. We audit your infrastructure, identify where overhead is bleeding time,
            and propose the right configuration.
          </p>
          <a href="mailto:rhett@manteissystems.com" className="btn mt-12">Book a Discovery Call</a>
          <p className="font-body text-[14px] text-[--color-ink-3] mt-6">
            Standard: $2,500–$7,500 · Non-profit: $1,500–$3,000
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ─────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="border-t border-[--color-border] px-6 md:px-12 py-10">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <span className="font-display text-[15px] font-semibold text-[--color-ink]">Manteis Systems</span>
        <span className="font-body text-[14px] text-[--color-ink-3]">AI Infrastructure Consulting · Seattle, WA</span>
        <span className="font-body text-[14px] text-[--color-ink-3]">© 2026</span>
      </div>
    </footer>
  );
}

// ─── PAGE ──────────────────────────────────────────────────────────────
export default function V4() {
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
