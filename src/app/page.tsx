'use client';

import { useState, useEffect, useRef } from 'react';
import NextImage from 'next/image';
import { motion, useInView } from 'motion/react';
import { Cpu, Shield, Zap } from 'lucide-react';
import { MagneticButton } from '../components/ui/MagneticButton';
import { ScrollProgress, Counter } from '../components/ui/animations';

// ─── Nav ──────────────────────────────────────────────────────────────────────
function SkipLink() {
  return (
    <a
      href="#main-content"
      className="fixed top-0 left-0 z-[300] -translate-y-full focus:translate-y-0 focus:ring-2 focus:ring-signal-blue focus:ring-offset-2 focus:ring-offset-black bg-white text-black font-mono text-[11px] tracking-[0.2em] uppercase px-5 py-3 transition-transform duration-200"
    >
      Skip to main content
    </a>
  );
}

function Nav() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const t = document.documentElement.getAttribute('data-theme') as 'dark' | 'light' || 'dark';
    setTheme(t);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch {}
    setTheme(next);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <SkipLink />
      <nav className="flex items-center justify-between px-4 sm:px-8 h-16 bg-black/85 backdrop-blur-xl border-b border-white/[0.06]" aria-label="Primary">
        <a href="#main-content" className="flex items-center gap-3 focus-visible:ring-2 focus-visible:ring-signal-blue focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-none min-w-0">
          <div className="w-1.5 h-5 bg-signal-blue shrink-0" aria-hidden />
          <span className="font-display text-sm font-bold tracking-tight text-white/90 truncate">
            Manteis Systems
          </span>
        </a>
        <ul className="hidden md:flex gap-8 list-none">
          {['Services', 'Architect', 'Case Study', 'Proof', 'Contact'].map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="font-body text-[13px] font-medium text-white/60 hover:text-white transition-colors duration-200"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <button
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="w-8 h-8 flex items-center justify-center text-white/55 hover:text-white transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-signal-blue focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-none shrink-0"
          >
            {theme === 'dark' ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden focusable="false">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden focusable="false">
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
              </svg>
            )}
          </button>
        </div>
      </nav>
    </header>
  );
}

// ─── Subtle blue orb (one only, hero only) ─────────────────────────────────────
function SubtleOrb() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div
        className="absolute rounded-full"
        style={{
          width: 900,
          height: 900,
          top: '-250px',
          left: '-200px',
          background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 65%)',
          filter: 'blur(60px)',
        }}
      />
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-8 overflow-hidden">
      <SubtleOrb />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-[90vw] flex flex-col items-center text-center gap-6 md:gap-8"
      >
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 mb-2">
          <NextImage
            src="/manteis_systems_icon.png"
            alt="Manteis Systems"
            fill
            className="object-contain"
            sizes="128px"
            priority
          />
        </div>

        <h1 className="font-display font-bold text-[clamp(36px,9vw,120px)] leading-[0.95] tracking-[-0.03em] text-white">
          Manteis Systems
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-normal text-[clamp(20px,3.5vw,40px)] tracking-tight text-white/60 max-w-3xl"
        >
          AI infrastructure consulting for businesses that want intelligence on their own hardware.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="font-body text-base text-white/50 max-w-xl leading-relaxed"
        >
          25+ years of enterprise IT, deployed as private local AI, agent automation,
          and zero-trust security for Pacific Northwest businesses.
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-4 mt-4"
        >
          <a href="mailto:rhett@manteissystems.com" aria-label="Email Manteis Systems to schedule a discovery call" className="focus-visible:ring-2 focus-visible:ring-signal-blue focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-none inline-block w-full sm:w-auto text-center">
            <MagneticButton as="a" href="mailto:rhett@manteissystems.com" className="w-full sm:w-auto">Book a Discovery Call</MagneticButton>
          </a>
          <div className="font-body text-[13px] text-white/40">
            Free 60-minute consultation · Seattle, WA · Remote-first
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <motion.div
          className="w-px h-12 bg-gradient-to-b from-white/25 to-transparent origin-top"
          animate={{ scaleY: [1, 0.3, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
}

// ─── Services ─────────────────────────────────────────────────────────────────
function ServicesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const services = [
    {
      icon: Cpu,
      title: 'AI Infrastructure',
      desc: 'Deploy private LLMs, agent orchestration, and vector memory on hardware you own. No API keys, no per-token bills, no data leaving your network.',
      deliverables: ['Sovereign Node provisioning', 'Agent orchestration setup', 'Local vector memory architecture', 'Custom MCP tool development'],
      price: '$350/hr · from $2,000/mo managed',
      accent: '#3B82F6',
    },
    {
      icon: Shield,
      title: 'Security & Compliance',
      desc: 'Enterprise security audits and hardening backed by 20+ years of practice. ZTNA, endpoint protection, MDM governance, and compliance-ready infrastructure.',
      deliverables: ['ZTNA rollout', 'Endpoint hardening', 'MDM governance', 'Full disk encryption', 'SANS-aligned security audits'],
      price: '$350/hr · fixed projects from $10k',
      accent: '#FF6EC7',
      featured: true,
    },
    {
      icon: Zap,
      title: 'Automation & Fleet Management',
      desc: 'Modern fleet management and workflow automation across Intune, Jamf Pro, M365, Active Directory, Docker, and n8n pipelines.',
      deliverables: ['Infrastructure automation', 'Container orchestration', 'Workflow pipelines', 'MDM fleet management'],
      price: '$350/hr · fixed projects from $10k',
      accent: '#00D4A8',
    },
  ];

  return (
    <section id="services" ref={ref} className="relative px-4 sm:px-8 py-24 md:py-32 bg-void-raised">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-bold text-[clamp(32px,6vw,64px)] tracking-[-0.02em] leading-[1.05] mb-4"
        >
          What we do
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.18 }}
          className="font-body text-lg text-white/50 leading-relaxed max-w-2xl mb-12 md:mb-16"
        >
          Three engagement models for organizations that want the power of AI
          without surrendering their data, their budget, or their operational control.
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.75, delay: 0.25 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className={`relative p-6 sm:p-8 flex flex-col gap-5 bg-void-raised border border-white/[0.06] hover:border-white/[0.12] transition-colors duration-300 ${s.featured ? 'lg:-mt-4 lg:mb-4' : ''}`}
              >
                {s.featured && (
                  <span className="absolute top-0 right-0 font-body text-[11px] font-medium px-3 py-1 text-white bg-signal-blue">
                    Most Requested
                  </span>
                )}
                <div className="flex items-center gap-3 mt-2">
                  <Icon size={20} style={{ color: s.accent }} />
                </div>
                <h3 className="font-display font-bold text-xl tracking-[-0.01em] text-white">
                  {s.title}
                </h3>
                <p className="font-body text-[15px] text-white/50 leading-relaxed flex-1">
                  {s.desc}
                </p>
                <ul className="flex flex-col gap-2">
                  {s.deliverables.map((d) => (
                    <li key={d} className="flex items-start gap-2.5 font-body text-[14px] text-white/60">
                      <span className="w-1 h-1 rounded-full shrink-0 mt-2" style={{ background: s.accent }} aria-hidden />
                      {d}
                    </li>
                  ))}
                </ul>
                <div className="font-body text-[14px] font-medium pt-4 border-t border-white/[0.06]" style={{ color: s.accent }}>
                  {s.price}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Sovereign Node ────────────────────────────────────────────────────────────
function SovereignNodeSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const specs = [
    { key: 'Hardware', val: 'Compact desktop, pro workstation, or custom build' },
    { key: 'Inference', val: 'Local AI — open models, no API keys required' },
    { key: 'Vector DB', val: 'Persistent local vector store, zero egress' },
    { key: 'Agents',   val: 'Custom agent orchestrator for workflow automation' },
    { key: 'Security', val: 'ZTNA, endpoint protection, full disk encryption' },
    { key: 'Network',  val: 'LAN-only by default, no cloud egress required' },
  ];

  const tiers = [
    { name: 'Starter Node',       price: '$2,500',        hardware: 'Compact desktop · 4 agents · 1 model',          monthly: '$2,000/mo managed', accent: '#3B82F6' },
    { name: 'Professional Node',  price: '$5,000',        hardware: 'Pro workstation · 10 agents · 3 models',        monthly: '$2,000/mo managed', accent: '#3B82F6', featured: true },
    { name: 'Enterprise Node',    price: '$7,500',        hardware: 'High-end workstation · unlimited agents',       monthly: '$2,000/mo managed', accent: '#3B82F6' },
    { name: 'Non-Profit',         price: '$1,500–$3,000', hardware: 'Qualifying mission-driven organizations',       monthly: 'Reduced managed rate', accent: '#00D4A8' },
  ];

  return (
    <section id="systems" ref={ref} className="relative px-4 sm:px-8 py-24 md:py-32 border-t border-white/[0.04] bg-black">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-bold text-[clamp(32px,6vw,64px)] tracking-[-0.02em] leading-[1.05] mb-4"
        >
          The Sovereign Node
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.18 }}
          className="font-body text-lg text-white/50 leading-relaxed max-w-2xl mb-12 md:mb-16"
        >
          A dedicated local AI server running private inference, persistent vector memory,
          and custom agents. Every query stays on your machine. Your data never leaves your network.
        </motion.p>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          <div className="flex-1 flex flex-col gap-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="border border-white/[0.06]"
            >
              {specs.map((s, i) => (
                <motion.div
                  key={s.key}
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.06 }}
                  className={`flex flex-col sm:flex-row gap-1 sm:gap-6 p-4 sm:p-5 hover:bg-white/[0.02] transition-colors ${i < specs.length - 1 ? 'border-b border-white/[0.04]' : ''}`}
                >
                  <span className="font-body text-[13px] font-medium text-white/80 w-auto sm:w-32 shrink-0">{s.key}</span>
                  <span className="font-body text-[14px] text-white/50">{s.val}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div className="flex flex-col gap-3 lg:min-w-[320px]">
            {tiers.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
                className={`border p-5 sm:p-6 bg-void-raised cursor-default transition-colors duration-300 hover:bg-white/[0.02] ${t.featured ? 'border-signal-blue/30' : 'border-white/[0.06] hover:border-white/[0.12]'}`}
              >
                <div className="flex items-start justify-between mb-2 gap-3">
                  <span className="font-body text-[14px] font-medium text-white/70 pt-1">
                    {t.name}
                  </span>
                  <span className="font-display font-bold text-xl sm:text-2xl tracking-[-0.02em]" style={{ color: t.accent }}>
                    {t.price}
                  </span>
                </div>
                {t.featured && (
                  <span className="inline-block font-body text-[11px] font-medium text-signal-blue mb-3">
                    Most deployed
                  </span>
                )}
                <p className="font-body text-[13px] text-white/50 mb-1">{t.hardware}</p>
                <p className="font-body text-[13px] font-medium" style={{ color: t.accent, opacity: 0.9 }}>{t.monthly}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── The Architect (bio) ────────────────────────────────────────────────────────
function Founder() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const credentials = ['Mozilla', 'Apple', 'F5 Networks', 'REI', '98point6', 'UW', 'Aon'];
  const stats = [
    { to: 25, suffix: '+', label: 'Years Enterprise IT' },
    { to: 7,  suffix: '',  label: 'Major Organizations' },
    { to: 200, suffix: '+', label: 'Production Systems Delivered' },
  ];

  return (
    <section id="architect" ref={ref} className="relative px-4 sm:px-8 py-24 md:py-32 border-t border-white/[0.04] bg-void-raised">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          <div className="flex-1 flex flex-col gap-8">
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-bold text-[clamp(32px,6vw,64px)] leading-[1.05] tracking-[-0.02em]"
            >
              Rhett Elliot Johnson
              <span className="block text-white/40 font-normal text-[clamp(20px,3vw,32px)] mt-2">
                Principal Systems Architect
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="font-body text-[17px] text-white/55 leading-[1.7] max-w-xl"
            >
              Rhett is a fractional CTO and infrastructure architect with 25+ years of
              enterprise IT experience. He has designed and operated systems at scale for
              some of the most demanding technical environments in the world.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.28 }}
              className="font-body text-[17px] text-white/55 leading-[1.7] max-w-xl"
            >
              His work spans Mozilla&apos;s open-web mission, F5 Networks&apos; global edge
              security fabric, 98point6&apos;s HIPAA-compliant digital health platform,
              Apple&apos;s internal infrastructure, and enterprise environments across
              healthcare, retail, insurance, and education.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.36 }}
              className="flex flex-wrap gap-x-6 gap-y-3 pt-6 border-t border-white/[0.06]"
            >
              {credentials.map((c, i) => (
                <motion.span
                  key={c}
                  className="font-body text-[14px] font-medium text-white/50 hover:text-white transition-colors cursor-default"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.06 }}
                >
                  {c}
                </motion.span>
              ))}
            </motion.div>
          </div>

          <div className="flex flex-row flex-wrap lg:flex-col gap-0 lg:min-w-[220px] border border-white/[0.06] h-fit">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.15 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="p-6 sm:p-8 border-b border-r border-white/[0.06] last:border-b-0 lg:border-r-0 flex-1 min-w-[140px] lg:min-w-0"
              >
                <div className="font-display font-bold text-[clamp(28px,5vw,48px)] text-signal-blue tracking-[-0.02em]">
                  <Counter to={s.to} suffix={s.suffix} delay={0.2 + i * 0.1} />
                </div>
                <div className="font-body text-[13px] text-white/50 mt-1">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Case Study ─────────────────────────────────────────────────────────────────
function CaseStudy() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const metrics = [
    { value: '3 hrs', label: 'Per week recovered from overhead' },
    { value: '0', label: 'Cloud subscriptions added' },
    { value: '1', label: 'Sovereign Node provisioned' },
    { value: 'Live', label: 'Since Q1 2026' },
  ];

  return (
    <section id="case-study" ref={ref} className="relative px-4 sm:px-8 py-24 md:py-32 border-t border-white/[0.04] bg-black">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.06 }}
          className="font-body text-[14px] font-medium text-white/40 mb-8"
        >
          Case Study · Regional Contractor, Pacific Northwest · Client Anonymized
        </motion.div>

        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-bold text-[clamp(28px,5vw,56px)] leading-[1.1] tracking-[-0.02em] mb-12 max-w-3xl"
        >
          &ldquo;They don&apos;t need another website.
          <span className="text-white/40"> They need an Agent.&rdquo;</span>
        </motion.blockquote>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex-1 flex flex-col gap-5"
          >
            <p className="font-body text-[17px] text-white/55 leading-[1.7]">
              The owner was losing 3+ hours a week to repetitive overhead: copy-pasting
              estimates, chasing email threads, and manually updating job status across
              disconnected tools.
            </p>
            <p className="font-body text-[17px] text-white/55 leading-[1.7]">
              The Manteis Sovereign Node now handles client intake, quote follow-ups,
              project status updates, and communication coordination — locally, privately,
              without a single new cloud subscription. Their data stays on their hardware.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <motion.div
                className="w-2 h-2 bg-signal-teal rounded-full"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.8, repeat: Infinity }}
              />
              <span className="font-body text-[14px] font-medium text-signal-teal">
                Deployment: Live
              </span>
            </div>

            <div className="flex flex-col gap-4 pt-2">
              {[
                { name: 'Phase 1 · Node Provisioning', pct: 100 },
                { name: 'Phase 2 · Agent Expansion', pct: 45 },
              ].map((ph, i) => (
                <div key={ph.name}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-body text-[13px] text-white/50">
                      {ph.name}
                    </span>
                    <span className={`font-body text-[13px] font-medium ${ph.pct === 100 ? 'text-signal-teal' : 'text-signal-blue'}`}>
                      {ph.pct === 100 ? 'Complete' : `${ph.pct}%`}
                    </span>
                  </div>
                  <div className="h-1 bg-white/[0.06] overflow-hidden" role="progressbar" aria-valuenow={ph.pct} aria-valuemin={0} aria-valuemax={100} aria-label={ph.name}>
                    <motion.div
                      className={`h-full w-full ${ph.pct === 100 ? 'bg-signal-teal' : 'bg-signal-blue'}`}
                      initial={{ scaleX: 0 }}
                      animate={inView ? { scaleX: ph.pct / 100 } : {}}
                      transition={{ duration: 1.3, delay: 0.5 + i * 0.25, ease: [0.16, 1, 0.3, 1] }}
                      style={{ transformOrigin: 'left' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-px border border-white/[0.06] lg:min-w-[320px] h-fit">
            {metrics.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.3 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative p-4 sm:p-6 bg-void-elevated transition-colors duration-300 hover:bg-void-raised"
              >
                <div className="font-display font-bold text-xl sm:text-2xl text-signal-blue tracking-[-0.02em] mb-1">
                  {m.value}
                </div>
                <div className="font-body text-[13px] text-white/50 leading-relaxed">
                  {m.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Capabilities / Proof ─────────────────────────────────────────────────────
function CapabilitiesProof() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const metrics = [
    { to: 42,    suffix: '+', decimals: 0, label: 'Agent tools deployed' },
    { to: 25,    suffix: '+', decimals: 0, label: 'Years enterprise IT' },
    { to: 15,    suffix: '+', decimals: 0, label: 'Containers orchestrated' },
    { to: 30,    suffix: '+', decimals: 0, label: 'Automated workflows' },
    { to: 99.99, suffix: '%', decimals: 2, label: 'Infrastructure uptime' },
  ];

  const cases = [
    {
      tag: 'Enterprise Manufacturer',
      title: 'One agent. The whole IT surface.',
      desc: 'A 42-tool AI agent covering IT operations, security, data, and infrastructure — every write human-gated, every action audit-logged.',
      stat: '42 tools · human-gated',
    },
    {
      tag: 'Sovereign Node Deployment',
      title: 'Zero cloud. Sub-10ms latency.',
      desc: "Local AI inference on dedicated hardware behind the client's own firewall. No API keys, no per-token bills, no data leaving the building.",
      stat: '<10ms latency · 0 egress',
    },
    {
      tag: 'Fractional CTO Engagement',
      title: 'Systems running. Staff unblocked.',
      desc: 'Infrastructure automation, fleet management, and security hardening for a mid-market organization without a full-time IT department.',
      stat: '24/7 operations · enterprise grade',
    },
  ];

  return (
    <section id="proof" ref={ref} className="relative px-4 sm:px-8 py-24 md:py-32 border-t border-white/[0.04] bg-void-raised">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-bold text-[clamp(32px,6vw,64px)] tracking-[-0.02em] leading-[1.05] mb-10 md:mb-16"
        >
          Shown, not told.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-px border border-white/[0.06] mb-12"
        >
          {metrics.map((m, i) => (
            <div key={m.label} className={`bg-void-raised p-5 sm:p-8 flex flex-col gap-3 hover:bg-white/[0.02] transition-colors duration-300 ${i === 4 ? 'col-span-2 md:col-span-1' : ''}`}>
              <div className="font-display font-bold text-3xl md:text-5xl text-signal-blue tracking-[-0.02em]">
                <Counter to={m.to} suffix={m.suffix} decimals={m.decimals} delay={0.3 + i * 0.12} />
              </div>
              <div className="font-body text-[13px] text-white/50 leading-relaxed">
                {m.label}
              </div>
            </div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {cases.map((c, i) => (
            <motion.article
              key={c.tag}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.25 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="bg-void-raised p-6 sm:p-8 flex flex-col gap-4 border border-white/[0.06] hover:border-white/[0.12] transition-colors duration-300"
            >
              <span className="font-body text-[13px] font-medium text-white/40">
                {c.tag} · Anonymized
              </span>
              <h3 className="font-display font-bold text-lg tracking-[-0.01em] leading-snug text-white">
                {c.title}
              </h3>
              <p className="font-body text-[15px] text-white/50 leading-relaxed flex-1">{c.desc}</p>
              <div className="font-body text-[14px] font-medium text-signal-blue pt-4 border-t border-white/[0.06]">
                {c.stat}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA ────────────────────────────────────────────────────────────────────────
function CTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="contact" ref={ref} className="relative border-t border-white/[0.04] bg-black overflow-hidden">
      <div className="relative px-4 sm:px-8 py-24 md:py-32 flex flex-col items-center text-center overflow-hidden">
        <div className="absolute w-96 h-96 rounded-full bg-[#3B82F6]/8 blur-3xl pointer-events-none" />

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="relative font-display font-bold text-[clamp(36px,6vw,64px)] tracking-[-0.02em] leading-[1.1] mb-6"
        >
          Let's talk.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="relative font-body text-lg text-white/50 leading-relaxed max-w-xl mb-8"
        >
          60 minutes. No pitch deck. We audit your current infrastructure, identify where
          overhead is bleeding your time, and propose the right configuration for your operation.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative font-body text-[14px] text-white/40 mb-12 flex flex-wrap gap-6 justify-center"
        >
          <span>Standard: $2,500–$7,500 setup</span>
          <span className="text-white/15">·</span>
          <span className="text-signal-teal">Non-profit: $1,500–$3,000</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.48 }}
          className="relative flex flex-col items-center gap-5"
        >
          <MagneticButton as="a" href="mailto:rhett@manteissystems.com" className="w-full sm:w-auto">
            Book a Discovery Call
          </MagneticButton>
          <span className="font-body text-[13px] text-white/40">
            No commitment · Response within 24 hours · Pacific Time
          </span>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <main id="main-content" className="relative min-h-screen overflow-x-hidden bg-black text-white font-body selection:bg-signal-blue/20 selection:text-signal-blue">
      <ScrollProgress />
      <Nav />
      <Hero />
      <ServicesSection />
      <SovereignNodeSection />
      <Founder />
      <CaseStudy />
      <CapabilitiesProof />
      <CTA />
      <footer className="border-t border-white/[0.04] px-4 sm:px-8 py-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-body text-[13px] text-white/40 text-center sm:text-left">
            Manteis Systems · AI Infrastructure Consulting · Seattle, WA
          </span>
          <span className="font-body text-[13px] text-white/35">
            © 2026 Manteis Systems
          </span>
        </div>
      </footer>
    </main>
  );
}