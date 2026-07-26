"use client";

import { motion } from "motion/react";

// ─── NAV — minimal, almost invisible ────────────────────────────────────
function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-6 flex items-center justify-between">
      <span className="font-body text-sm font-medium text-[--color-ink] tracking-tight">Manteis Systems</span>
      <span className="meta text-[11px]">SEATTLE</span>
    </nav>
  );
}

// ─── HERO — one warm glow, vast empty space ─────────────────────────────
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 md:px-12 overflow-hidden">
      {/* The single warm solar glow in the hero only */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full pointer-events-none">
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(255,229,102,0.10)_0%,transparent_30%)] blur-[80px]" />
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(255,85,0,0.10)_0%,transparent_50%)] blur-[160px]" />
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(179,54,0,0.05)_0%,transparent_65%)] blur-[220px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center gap-8">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="meta"
        >
          AI INFRASTRUCTURE CONSULTANCY · 25+ YEARS
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-[clamp(56px,12vw,160px)] leading-[0.95] tracking-[-0.05em] font-semibold text-[--color-ink]"
        >
          Quiet
          <br />
          systems.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-body text-base md:text-lg text-[--color-ink-2] leading-[1.7] max-w-[45ch] mt-4"
        >
          Private local AI, agent automation, and zero-trust security for businesses in the Pacific Northwest.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-8"
        >
          <a href="#contact" className="btn">Book a Discovery Call</a>
        </motion.div>
      </div>
    </section>
  );
}

// ─── SERVICES — sparse, almost empty ──────────────────────────────────────
function Services() {
  const services = [
    { title: "AI Infrastructure", price: "$350/hr" },
    { title: "Security & Compliance", price: "$350/hr" },
    { title: "Automation & Fleet", price: "$350/hr" },
  ];

  return (
    <section className="relative min-h-[70vh] flex items-center px-6 md:px-12 py-24 md:py-32">
      <div className="max-w-5xl mx-auto w-full grid grid-cols-12 gap-8">
        <div className="col-span-12 md:col-span-4">
          <p className="meta mb-4">SERVICES</p>
          <h2 className="text-[clamp(28px,3vw,42px)] leading-[1.1] tracking-[-0.03em] font-semibold text-[--color-ink]">
            What we do.
          </h2>
        </div>
        <div className="col-span-12 md:col-span-6 md:col-start-7 flex flex-col gap-12">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
              className="flex flex-col gap-2"
            >
              <h3 className="font-body text-xl md:text-2xl font-semibold text-[--color-ink] tracking-tight">
                {s.title}
              </h3>
              <p className="font-body text-base text-[--color-ink-3]">{s.price}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── SOVEREIGN NODE — minimal pricing, huge space ──────────────────────
function Pricing() {
  return (
    <section className="relative min-h-[60vh] flex items-center px-6 md:px-12 py-24 md:py-32 border-t border-[--color-border]">
      <div className="max-w-5xl mx-auto w-full">
        <p className="meta mb-12">SOVEREIGN NODE</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {[
            { name: "Starter", price: "$2,500", note: "4 agents · 1 model" },
            { name: "Professional", price: "$5,000", note: "10 agents · 3 models" },
            { name: "Enterprise", price: "$7,500", note: "Unlimited agents" },
          ].map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
              className="flex flex-col gap-2"
            >
              <span className="meta">0{i + 1}</span>
              <span className="font-body text-lg font-semibold text-[--color-ink]">{t.name}</span>
              <span className="font-display text-[40px] md:text-[56px] font-semibold text-[--color-ink] tracking-[-0.03em]">
                {t.price}
              </span>
              <span className="font-body text-sm text-[--color-ink-3]">{t.note}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CASE STUDY — single quiet moment ───────────────────────────────────
function CaseStudy() {
  return (
    <section className="relative min-h-[70vh] flex items-center px-6 md:px-12 py-24 md:py-32 border-t border-[--color-border]">
      <div className="max-w-5xl mx-auto w-full grid grid-cols-12 gap-8">
        <div className="col-span-12 md:col-span-5">
          <p className="meta mb-4">CASE STUDY</p>
          <h2 className="text-[clamp(28px,3vw,42px)] leading-[1.1] tracking-[-0.03em] font-semibold text-[--color-ink]">
            3 hours back.
          </h2>
        </div>
        <div className="col-span-12 md:col-span-6 md:col-start-7 flex flex-col gap-6">
          <p className="font-body text-base md:text-lg text-[--color-ink-2] leading-[1.7] max-w-[50ch]">
            A Pacific Northwest contractor was losing 3+ hours a week to repetitive overhead.
            One Sovereign Node now handles client intake, follow-ups, and project updates locally.
          </p>
          <p className="font-body text-sm text-[--color-ink-3]">No cloud subscriptions added.</p>
        </div>
      </div>
    </section>
  );
}

// ─── CTA — final quiet call ────────────────────────────────────────────
function CTA() {
  return (
    <section id="contact" className="relative min-h-[60vh] flex items-center justify-center px-6 md:px-12 border-t border-[--color-border]">
      <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-8">
        <h2 className="text-[clamp(36px,6vw,72px)] leading-[1.05] tracking-[-0.04em] font-semibold text-[--color-ink]">
          Let&apos;s talk.
        </h2>
        <p className="font-body text-base md:text-lg text-[--color-ink-2] leading-[1.7] max-w-[50ch]">
          60 minutes. No pitch deck. We audit your infrastructure and propose the right configuration.
        </p>
        <a href="mailto:rhett@manteissystems.com" className="btn mt-4">Book a Discovery Call</a>
        <p className="meta mt-2">Standard: $2,500–$7,500 · Non-profit: $1,500–$3,000</p>
      </div>
    </section>
  );
}

// ─── FOOTER ─────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="border-t border-[--color-border] px-6 md:px-12 py-8">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-body text-[13px] text-[--color-ink-3]">Manteis Systems · Seattle, WA</span>
        <span className="meta">© 2026</span>
      </div>
    </footer>
  );
}

// ─── PAGE ───────────────────────────────────────────────────────────────
export default function V2Page() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Nav />
      <Hero />
      <Services />
      <Pricing />
      <CaseStudy />
      <CTA />
      <Footer />
    </main>
  );
}
