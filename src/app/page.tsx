'use client';

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import NextImage from 'next/image';
import { motion, useScroll, useTransform, useInView, useMotionValue, useMotionTemplate } from 'motion/react';
import { Cpu, Music, Heart, Terminal, Shield, Zap, GitBranch, ShieldCheck, Layers } from 'lucide-react';
import { MagneticButton } from '../components/ui/MagneticButton';
import { ScrollProgress, Counter, GradientText } from '../components/ui/animations';

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
          <span className="font-mono text-xs font-bold tracking-[0.22em] uppercase text-white/80 truncate">
            Manteis.Systems
          </span>
        </a>
        <ul className="hidden md:flex gap-6 md:gap-16 list-none">
          {['Federation', 'Systems', 'Proof', 'Sounds', 'Self', 'Contact'].map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase text-white/55 hover:text-white transition-colors duration-200"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <div className="font-mono text-[10px] text-white/55 uppercase tracking-widest hidden sm:block max-w-[200px] truncate">
            // SUBVERT. CREATE. SOVEREIGNTY.
          </div>
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

// ─── Section divider ───────────────────────────────────────────────────────────
function SectionDivider({ label, inView }: { label: string; inView?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="flex items-center gap-4 mb-12 md:mb-16 relative"
    >
      <div className="h-px flex-1 bg-cream/[0.08]" />
      <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.2em] sm:tracking-[0.35em] uppercase text-cream/55 shrink-0">
        // {label}
      </span>
      <div className="h-px flex-1 bg-cream/[0.08]" />
    </motion.div>
  );
}

// ─── Subtle planetary halo (one only) ─────────────────────────────────────────
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
          background: 'radial-gradient(circle, rgba(59,130,246,0.10) 0%, transparent 65%)',
          filter: 'blur(60px)',
        }}
      />
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const exitOp = useTransform(scrollYProgress, [0.70, 0.98], [1, 0]);
  const exitY  = useTransform(scrollYProgress, [0.70, 0.98], [0, -80]);
  const scrollHintOp = useTransform(scrollYProgress, [0, 0.06], [1, 0]);

  return (
    <div ref={containerRef} style={{ height: '120vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col items-center justify-center px-4 sm:px-8">
        <SubtleOrb />

        <motion.div
          style={{ opacity: exitOp, y: exitY }}
          className="relative z-10 w-full max-w-[90vw] flex flex-col items-center text-center gap-5 md:gap-7"
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-mono text-[8px] sm:text-[10px] tracking-[0.15em] sm:tracking-[0.35em] uppercase text-signal-blue text-center"
          >
            // SOVEREIGN INTELLIGENCE INFRASTRUCTURE //
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
            transition={{ opacity: { duration: 1.2, delay: 0.05, ease: [0.16, 1, 0.3, 1] }, scale: { duration: 1.2, delay: 0.05, ease: [0.16, 1, 0.3, 1] }, y: { duration: 7, repeat: Infinity, ease: 'easeInOut' } }}
            className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 lg:w-56 lg:h-56 mb-2"
          >
            <NextImage
              src="/manteis_systems_icon.png"
              alt="Manteis Systems icon"
              fill
              className="object-contain"
              sizes="224px"
              priority
            />
          </motion.div>

          <h1 className="font-display font-bold text-[clamp(32px,10vw,140px)] leading-[0.95] tracking-tighter sm:tracking-tight flex flex-col items-center overflow-hidden w-full px-1">
            <motion.span
              initial={{ opacity: 0, y: 48 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="block"
            >
              <span className="inline-block whitespace-nowrap">
                <GradientText from="#FFFFFF" via="#7AA9FF" to="#FFFFFF">MANTEIS</GradientText>
                <span className="text-signal-blue">.</span>
              </span>
              <span className="inline-block whitespace-nowrap">
                <GradientText from="#FFFFFF" via="#7AA9FF" to="#FFFFFF">SYSTEMS</GradientText>
              </span>
            </motion.span>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-bold text-[clamp(18px,3vw,36px)] tracking-tight text-white/55"
          >
            DEPHASING THE CORPORATE MACHINE<span className="text-signal-blue">.</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/55"
          >
            UNIFIED INTELLIGENCE INFRASTRUCTURE
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-4 mt-2"
          >
            <a href="mailto:rhett@manteissystems.com" aria-label="Email Manteis Systems to initiate a sovereignty audit" className="focus-visible:ring-2 focus-visible:ring-signal-blue focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-none inline-block w-full sm:w-auto text-center">
              <MagneticButton as="a" href="mailto:rhett@manteissystems.com" className="w-full sm:w-auto">INITIATE SOVEREIGNTY AUDIT</MagneticButton>
            </a>
            <div className="font-mono text-[9px] tracking-[0.25em] uppercase text-cream/55">
              LOCAL AI · ZERO EGRESS · HUMAN-GATED WRITES
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ opacity: scrollHintOp }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        >
          <span className="font-mono text-[8px] tracking-[0.3em] uppercase text-white/55">SCROLL TO ENTER</span>
          <motion.div
            className="w-px h-16 bg-gradient-to-b from-white/30 to-transparent origin-top"
            animate={{ scaleY: [1, 0.3, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </div>
    </div>
  );
}

// ─── Ecosystem overview ───────────────────────────────────────────────────────
function EcosystemSection() {
  const pillars = [
    {
      id: 'systems-pillar',
      label: '01 — SYSTEMS',
      title: 'THE SOVEREIGN NODE',
      tagline: 'Your data. Your machine. Your intelligence.',
      desc: 'A dedicated local AI server — compact desktop, pro workstation, or custom build — running a local inference engine, a local vector store, and a custom agent orchestrator. Private by design. Zero cloud dependency.',
      accent: '#3B82F6',
      accentClass: 'text-signal-blue',
      icon: Cpu,
      detail: '$2,500–$7,500 setup · $2,000/mo managed',
    },
    {
      id: 'sounds',
      label: '02 — SOUNDS',
      title: 'MANTEIS RECORDINGS',
      tagline: 'Intelligence is vibration.',
      desc: 'A spatial-audio independent label and radio station rooted in the 1998 sampler decision. Synthwave, avant-garde, and electronic — released on every major streaming platform with no algorithmic playlist dependency.',
      accent: '#FF6EC7',
      accentClass: 'text-signal-pink',
      icon: Music,
      detail: 'Betta Beats Radio · manteisrecordings.com',
      links: [
        { label: 'Manteis Recordings — Label Hub', url: 'https://manteisrecordings.com' },
        { label: 'Betta Beats Radio — Mixcloud', url: 'https://www.mixcloud.com/bettabeatsradio/' },
        { label: 'Red Shift Mantra — Synthwave', url: 'https://redshiftmantra.vercel.app' },
      ],
    },
    {
      id: 'self',
      label: '03 — SELF',
      title: 'SOVEREIGNTY WITHIN',
      tagline: 'Sovereignty begins in the body.',
      desc: 'Breathwork protocols, hermetic philosophy, and relationship sovereignty manuals that de-colonize attention before the infrastructure work begins. Technology should support biology — not replace it.',
      accent: '#00D4A8',
      accentClass: 'text-signal-teal',
      icon: Heart,
      detail: 'Breathwork Sessions · Sewa Singh Manuals',
      links: [
        { label: 'Breathwork — 70-Day Protocol', url: 'https://breathwork-three.vercel.app' },
        { label: 'Kybalion Tactical — Reality Rendering', url: 'https://kybalion-dusky.vercel.app' },
        { label: 'Sewa — Kundalini Teachings', url: 'https://sewa-pink.vercel.app' },
      ],
    },
  ];

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="relative px-4 sm:px-8 py-20 md:py-32 max-w-6xl mx-auto w-full bg-void-elevated">
      <SectionDivider inView={inView} label="THE ECOSYSTEM" />

      <motion.div
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.16, delayChildren: 0.12 },
          },
        }}
        className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] lg:grid-rows-2 gap-px border border-cream/[0.06]"
      >
        {pillars.map((p) => {
          const Icon = p.icon;
          const isWide = p.id === 'systems-pillar';
          return (
            <PillarTile key={p.id} pillar={p} Icon={Icon} isWide={isWide} />
          );
        })}
      </motion.div>
    </section>
  );
}

type Pillar = {
  id: string;
  label: string;
  title: string;
  tagline: string;
  desc: string;
  accent: string;
  accentClass: string;
  icon: React.ComponentType<{ size?: number; className?: string; 'aria-hidden'?: boolean; style?: React.CSSProperties }>;
  detail: string;
  links?: { label: string; url: string }[];
};

function PillarTile({
  pillar: p,
  Icon,
  isWide,
}: {
  pillar: Pillar;
  Icon: React.ComponentType<{ size?: number; className?: string; 'aria-hidden'?: boolean; style?: React.CSSProperties }>;
  isWide: boolean;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 28, scale: 0.98 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
      }}
      whileHover={{ scale: 1.01, transition: { type: 'spring', stiffness: 100, damping: 20 } }}
      className={`bg-void-raised p-6 sm:p-8 flex flex-col gap-5 group cursor-default relative overflow-hidden lg:row-span-1 ${isWide ? 'lg:col-span-1 lg:row-span-2' : ''}`}
      style={{ borderTop: `1px solid ${p.accent}` }}
    >
      <div className="flex items-center justify-between mt-1 relative z-10">
        <span className={`font-mono text-[9px] tracking-[0.3em] uppercase ${p.accentClass}`}>
          {p.label}
        </span>
        <Icon size={18} style={{ color: p.accent }} />
      </div>
      <div className="relative z-10">
        <h3 className="font-display font-bold text-[1.35rem] sm:text-[1.5rem] tracking-[-0.02em] text-cream mb-1">
          {p.title}
        </h3>
        <p className={`font-mono text-[10px] tracking-[0.18em] uppercase ${p.accentClass}`}>
          {p.tagline}
        </p>
      </div>
      <p className="text-sm text-cream/55 leading-relaxed flex-1 relative z-10">
        {p.desc}
      </p>
      {p.links && (
        <div className="flex flex-col gap-2 pt-2 relative z-10">
          {p.links.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[10px] tracking-widest uppercase text-signal-teal/70 hover:text-signal-teal transition-colors duration-200 flex items-center gap-2 group/link"
            >
              <span className="w-1.5 h-1.5 bg-signal-teal/40 group-hover/link:bg-signal-teal transition-colors" />
              {link.label}
              <span className="opacity-0 group-hover/link:opacity-100 transition-opacity">↗</span>
            </a>
          ))}
        </div>
      )}
      <div className={`font-mono text-[10px] tracking-widest uppercase ${p.accentClass} pt-4 border-t border-cream/[0.06] relative z-10`}>
        {p.detail}
      </div>
    </motion.div>
  );
}

// ─── The Architect (bio) ──────────────────────────────────────────────────────
function Founder() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px' });

  const credentials = ['Mozilla', 'Apple', 'F5 Networks', 'REI', '98point6', 'UW', 'Aon'];
  const stats = [
    { to: 25, suffix: '+', label: 'Years Enterprise Experience' },
    { to: 7,  suffix: '',  label: 'Major Organizations' },
    { to: 1998, suffix: '', label: 'The Origin Year', static: true },
  ];

  return (
    <section ref={ref} className="relative px-4 sm:px-8 py-24 md:py-40 border-t border-cream/[0.06] bg-black">
      <SectionDivider inView={inView} label="THE ARCHITECT" />

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          <div className="flex-1 flex flex-col gap-8">
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-bold text-[clamp(32px,6vw,72px)] leading-[0.95] tracking-tight"
            >
              FROM MIDI STUDIO
              <br />
              <span className="text-white/55">TO GLOBAL SYSTEMS.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-white/55 text-base leading-relaxed max-w-xl"
            >
              In 1998, Rhett Elliot Johnson faced a choice: repair a failing car,
              or buy his first music sampler. He chose the sampler. That decision —
              tools of creation over traps of convenience — became the foundational
              DNA of Manteis Systems. 25+ years later, the same philosophy runs
              enterprise AI infrastructure for businesses across the Pacific Northwest.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.28 }}
              className="text-white/55 text-base leading-relaxed max-w-xl"
            >
              As Principal Systems Architect and fractional CTO, Rhett has designed
              infrastructure for some of the most demanding technical environments
              in the world — from Mozilla&apos;s open-web mission to F5 Networks&apos; global
              edge security fabric to 98point6&apos;s HIPAA-compliant digital health platform.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.36 }}
              className="flex flex-wrap gap-x-5 gap-y-3 pt-4 border-t border-white/[0.08]"
            >
              {credentials.map((c, i) => (
                <motion.span
                  key={c}
                  className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/55 hover:text-signal-blue transition-colors cursor-default"
                  initial={{ opacity: 0, x: -8 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.06 }}
                >
                  {c}{i < credentials.length - 1 && <span className="ml-5 text-white/55">·</span>}
                </motion.span>
              ))}
            </motion.div>
          </div>

          <div className="flex flex-row flex-wrap lg:flex-col gap-0 lg:min-w-[220px] border border-white/[0.08] h-fit">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, x: 24 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.15 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="p-6 sm:p-8 border-b border-r border-white/[0.08] last:border-b-0 lg:border-r-0 flex-1 min-w-[140px] lg:min-w-0"
              >
                <div className="font-display font-bold text-[clamp(28px,5vw,56px)] text-signal-blue tracking-tight">
                  {s.static
                    ? <Counter to={s.to} suffix={s.suffix} duration={2200} delay={0.2 + i * 0.1} />
                    : <Counter to={s.to} suffix={s.suffix} delay={0.2 + i * 0.1} />
                  }
                </div>
                <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/55 mt-1">
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

// ─── Sovereign Node — topology, specs, pricing (single consolidated section) ───
function SovereignNodeSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px' });

  const specs = [
    { key: 'HARDWARE', val: 'Compact Desktop · Pro Workstation · Custom Build' },
    { key: 'INFERENCE', val: 'Local AI — open models, no API keys required' },
    { key: 'VECTOR DB', val: 'Local Vector Store — persistent, zero egress' },
    { key: 'AGENTS',   val: 'Agent Orchestrator — custom workflow automation' },
    { key: 'SECURITY', val: 'ZTNA · Endpoint Protection · Full Disk Encryption' },
    { key: 'NETWORK',  val: 'LAN-only by default — no cloud egress required' },
  ];

  const tiers = [
    { name: 'STARTER NODE',       price: '$2,500',        hardware: 'Compact Desktop · 4 agents · 1 model',          monthly: '$2,000/mo managed', accent: '#3B82F6' },
    { name: 'PROFESSIONAL NODE',  price: '$5,000',        hardware: 'Pro Workstation · 10 agents · 3 models',        monthly: '$2,000/mo managed', accent: '#3B82F6', featured: true },
    { name: 'ENTERPRISE NODE',    price: '$7,500',        hardware: 'High-End Workstation · Unlimited agents',       monthly: '$2,000/mo managed', accent: '#3B82F6' },
    { name: 'NON-PROFIT SUBSIDY', price: '$1,500–$3,000', hardware: 'Qualifying mission-driven organizations',       monthly: 'Reduced managed rate', accent: '#00D4A8' },
  ];

  const engagement = [
    {
      icon: Cpu,
      label: 'AUTONOMOUS AI CONSULTANCY',
      title: 'Sovereign AI Infrastructure',
      desc: 'Local LLM pipelines and agentic workflows on hardware you own. Ollama-served open models, private inference on NVIDIA DGX-class hardware, orchestrated by custom agents.',
      deliverables: ['Sovereign Node provisioning', 'Agent orchestration setup', 'Vector memory architecture', 'Custom MCP development'],
      price: '$350/hr consultation · $2k/mo managed',
      accent: '#3B82F6',
    },
    {
      icon: Shield,
      label: 'THE FORTRESS',
      title: 'Security & Compliance',
      desc: 'White-hat security audits and Zero Trust implementations backed by 20+ years of enterprise practice. SOC 2, HIPAA, and PCI compliance built into the infrastructure.',
      deliverables: ['ZTNA rollout', 'Endpoint hardening', 'MDM governance', 'Full disk encryption', 'SANS-standard audits'],
      price: '$350/hr · Fixed-project from $10k',
      accent: '#FF6EC7',
    },
    {
      icon: Zap,
      label: 'SYSTEMS ENGINEERING',
      title: 'Automation & Fleet Management',
      desc: 'Intune, Jamf Pro, M365, Active Directory, Hyper-V. Docker container orchestration, n8n workflow pipelines, and Python automation across the entire fleet.',
      deliverables: ['Infrastructure automation', 'Container orchestration', 'Workflow pipelines', 'MDM fleet management'],
      price: '$350/hr · Fixed-project from $10k',
      accent: '#00D4A8',
    },
  ];

  return (
    <section id="systems" ref={ref} className="relative px-4 sm:px-8 py-24 md:py-40 border-t border-cream/[0.06] bg-void-raised">
      <SectionDivider inView={inView} label="SOVEREIGN NODE" />

      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-bold text-[clamp(32px,6vw,72px)] tracking-tight leading-tight mb-6"
        >
          THE SOVEREIGN NODE
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.18 }}
          className="text-white/55 text-base leading-relaxed max-w-2xl mb-12 md:mb-16"
        >
          A small-business owner doesn&apos;t need another subscription. They need intelligence
          that runs on their hardware, understands their business, and costs less than one
          enterprise cloud API bill. Every query stays on your machine. Your data never leaves
          your LAN.
        </motion.p>

        <SovereignNodeDiagram inView={inView} />

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 mt-16">
          <div className="flex-1 flex flex-col gap-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="border border-white/[0.08]"
            >
              {specs.map((s, i) => (
                <motion.div
                  key={s.key}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.07 }}
                  className={`flex flex-col sm:flex-row gap-2 sm:gap-6 p-4 font-mono text-[11px] hover:bg-white/[0.02] transition-colors ${i < specs.length - 1 ? 'border-b border-white/[0.06]' : ''}`}
                >
                  <span className="text-signal-blue tracking-widest uppercase w-auto sm:w-28 shrink-0">{s.key}</span>
                  <span className="text-white/65">{s.val}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div className="flex flex-col gap-3 lg:min-w-[320px]">
            {tiers.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, x: 24 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ x: 4, scale: 1.02, transition: { duration: 0.2 } }}
                className={`border p-5 sm:p-6 bg-void-raised cursor-default transition-colors duration-300 hover:bg-white/[0.02] hover:border-white/25 ${t.featured ? 'border-signal-blue/40 border-t-2' : 'border-white/[0.08]'}`}
                style={{ borderTopColor: t.accent, borderTopWidth: t.featured ? '2px' : '1px' }}
              >
                <div className="flex items-start justify-between mb-1 gap-3">
                  <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-white/55 pt-1.5">
                    {t.name}
                  </span>
                  <span className="font-display font-bold text-xl sm:text-2xl tracking-tight" style={{ color: t.accent }}>
                    {t.price}
                  </span>
                </div>
                {t.featured && (
                  <span className="inline-block font-mono text-[8px] tracking-[0.3em] uppercase text-signal-blue border border-signal-blue/40 px-2 py-0.5 mb-3">
                    MOST DEPLOYED
                  </span>
                )}
                <p className="font-mono text-[10px] text-white/55 mb-1">{t.hardware}</p>
                <p className="font-mono text-[10px]" style={{ color: t.accent, opacity: 0.9 }}>{t.monthly}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-px border border-white/[0.06] mt-16">
          {engagement.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.75, delay: 0.3 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="bg-void-raised p-6 sm:p-8 flex flex-col gap-4 border-t border-transparent hover:bg-white/[0.02] transition-colors group cursor-default"
                style={{ borderTopColor: s.accent }}
              >
                <div className="flex items-center gap-3">
                  <Icon size={16} style={{ color: s.accent }} />
                  <span className="font-mono text-[9px] tracking-[0.3em] uppercase" style={{ color: s.accent }}>
                    {s.label}
                  </span>
                </div>
                <h3 className="font-display font-bold text-lg tracking-tight">{s.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed flex-1">{s.desc}</p>
                <ul className="flex flex-col gap-2">
                  {s.deliverables.map((d) => (
                    <li key={d} className="flex items-center gap-2.5 font-mono text-[10px] tracking-[0.12em] uppercase text-white/55">
                      <span className="w-1 h-1 shrink-0" style={{ background: s.accent }} aria-hidden />
                      {d}
                    </li>
                  ))}
                </ul>
                <div className="font-mono text-[10px] text-white/55 tracking-wide pt-4 border-t border-white/[0.06]">
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

function SovereignNodeDiagram({ inView }: { inView: boolean }) {
  const NODES = [
    { id: 'user',   x: 70,  y: 260, w: 110, h: 60, label: 'USER QUERY',   kind: 'ext', color: '#FFFFFF' },
    { id: 'agent',  x: 260, y: 120, w: 150, h: 68, label: 'AGENT LAYER',  sub: 'ORCHESTRATOR',   color: '#3B82F6' },
    { id: 'model', x: 500, y: 120, w: 150, h: 68, label: 'LOCAL AI',     sub: 'OPEN MODELS',    color: '#FF6EC7' },
    { id: 'memory', x: 260, y: 340, w: 150, h: 68, label: 'VECTOR STORE', sub: 'LOCAL MEMORY',   color: '#00D4A8' },
    { id: 'disk',   x: 500, y: 340, w: 150, h: 68, label: 'YOUR DATA',    sub: 'LOCAL · ENCRYPTED', color: '#FFB547' },
    { id: 'cloud',  x: 730, y: 260, w: 110, h: 60, label: 'CLOUD ⊘',     kind: 'blocked', color: '#FF0044' },
  ];
  const center = (n: typeof NODES[number]) => ({ cx: n.x + n.w / 2, cy: n.y + n.h / 2 });
  const map = Object.fromEntries(NODES.map(n => [n.id, n])) as Record<string, typeof NODES[number]>;

  const EDGES: Array<{ from: string; to: string; color: string; flow: boolean }> = [
    { from: 'user',   to: 'agent',  color: '#3B82F6', flow: true },
    { from: 'agent',  to: 'model',  color: '#FF6EC7', flow: true },
    { from: 'agent',  to: 'memory', color: '#00D4A8', flow: true },
    { from: 'model',  to: 'memory', color: '#7AA9FF', flow: true },
    { from: 'memory', to: 'disk',   color: '#FFB547', flow: true },
    { from: 'model', to: 'user',   color: '#FFFFFF', flow: true },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="relative border border-white/[0.08] bg-void-raised p-3 sm:p-8"
    >
      <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-white/[0.06] relative z-10">
        <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-white/55">
          sovereign_node.topology
        </span>
        <div className="flex items-center gap-2 font-mono text-[9px] tracking-[0.25em] uppercase text-signal-teal shrink-0">
          <motion.span
            className="inline-block w-1.5 h-1.5 rounded-full bg-signal-teal"
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.4, repeat: Infinity }}
          />
          <span className="hidden sm:inline">LIVE · 0 EGRESS</span>
          <span className="sm:hidden">LIVE</span>
        </div>
      </div>

      <svg
        viewBox="0 0 900 520"
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Sovereign Node architecture diagram"
      >
        <defs>
          <filter id="nd-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          {NODES.map(n => (
            <linearGradient key={`g-${n.id}`} id={`g-${n.id}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={n.color} stopOpacity="0.18" />
              <stop offset="100%" stopColor={n.color} stopOpacity="0.04" />
            </linearGradient>
          ))}
        </defs>

        <motion.rect
          x="200" y="50" width="500" height="420" rx="4"
          fill="none"
          stroke="rgba(59,130,246,0.35)"
          strokeWidth="1"
          strokeDasharray="4 6"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 1.4, delay: 0.4, ease: 'easeInOut' }}
        />
        <text
          x="210" y="42"
          fill="rgba(59,130,246,0.55)"
          fontFamily="var(--font-mono), monospace"
          fontSize="10"
          letterSpacing="2"
        >
          LAN BOUNDARY · 0.0.0.0/0 DENIED
        </text>

        {EDGES.map((e, i) => {
          const a = center(map[e.from]);
          const b = center(map[e.to]);
          return (
            <g key={`edge-${i}`}>
              <motion.line
                x1={a.cx} y1={a.cy} x2={b.cx} y2={b.cy}
                stroke={e.color}
                strokeOpacity="0.22"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={inView ? { pathLength: 1 } : {}}
                transition={{ duration: 1, delay: 0.6 + i * 0.08 }}
              />
              {e.flow && (
                <motion.circle
                  r="3"
                  fill={e.color}
                  filter="url(#nd-glow)"
                  initial={{ opacity: 0 }}
                  animate={inView ? { cx: [a.cx, b.cx], cy: [a.cy, b.cy], opacity: [0, 1, 1, 0] } : {}}
                  transition={{ duration: 2.2, delay: 1.2 + i * 0.35, repeat: Infinity, repeatDelay: 0.4, ease: 'easeInOut' }}
                />
              )}
            </g>
          );
        })}

        <motion.line
          x1={center(map.model).cx} y1={center(map.model).cy}
          x2={center(map.cloud).cx}  y2={center(map.cloud).cy}
          stroke="#FF0044"
          strokeOpacity="0.25"
          strokeWidth="1"
          strokeDasharray="3 5"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 1, delay: 1 }}
        />
        <motion.text
          x={(center(map.model).cx + center(map.cloud).cx) / 2}
          y={(center(map.model).cy + center(map.cloud).cy) / 2 - 8}
          fill="#FF3355"
          fillOpacity="0.85"
          fontFamily="var(--font-mono), monospace"
          fontSize="9"
          letterSpacing="1.5"
          textAnchor="middle"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1.6 }}
        >
          EGRESS BLOCKED
        </motion.text>

        {NODES.map((n, i) => {
          const isBlocked = n.kind === 'blocked';
          const isExt = n.kind === 'ext';
          return (
            <motion.g
              key={n.id}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <rect
                x={n.x} y={n.y} width={n.w} height={n.h} rx="2"
                fill={`url(#g-${n.id})`}
                stroke={n.color}
                strokeOpacity={isBlocked ? 0.55 : 0.8}
                strokeWidth="1"
              />
              {!isBlocked && !isExt && (
                <motion.rect
                  x={n.x} y={n.y} width={n.w} height={n.h} rx="2"
                  fill="none"
                  stroke={n.color}
                  strokeOpacity="0.5"
                  strokeWidth="1"
                  animate={{ opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.4, ease: 'easeInOut' }}
                />
              )}
              <text
                x={n.x + n.w / 2}
                y={n.y + (n.sub ? n.h / 2 - 4 : n.h / 2 + 4)}
                textAnchor="middle"
                fill={n.color}
                fillOpacity={isBlocked ? 0.7 : 1}
                fontFamily="var(--font-display), sans-serif"
                fontWeight="700"
                fontSize="13"
                letterSpacing="1"
              >
                {n.label}
              </text>
              {n.sub && (
                <text
                  x={n.x + n.w / 2}
                  y={n.y + n.h / 2 + 14}
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.45)"
                  fontFamily="var(--font-mono), monospace"
                  fontSize="8.5"
                  letterSpacing="1.5"
                >
                  {n.sub}
                </text>
              )}
            </motion.g>
          );
        })}
      </svg>

      <div className="mt-6 pt-4 border-t border-white/[0.06] flex flex-wrap gap-x-6 gap-y-2 font-mono text-[9px] tracking-[0.25em] uppercase text-white/55">
        <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-signal-blue" />ORCHESTRATION</span>
        <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-signal-pink" />INFERENCE</span>
        <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-signal-teal" />MEMORY</span>
        <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#FFB547]" />STATE</span>
        <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#FF3355]" />DENIED</span>
      </div>
    </motion.div>
  );
}

// ─── AI OS Federation — the differentiator ────────────────────────────────────
function FederationSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px' });

  const STAFF = Array.from({ length: 5 }, (_, i) => ({ x: 250 + i * 90, y: 58, w: 56, h: 26 }));
  const GATE = { x: 360, y: 138, w: 180, h: 44 };
  const ORCH = { x: 350, y: 250, w: 200, h: 64 };
  const DEPTS = [
    { x: 40,  label: 'OPS.OS' },
    { x: 212, label: 'FINANCE.OS' },
    { x: 384, label: 'SECURITY.OS' },
    { x: 556, label: 'DATA.OS' },
    { x: 728, label: 'COMMS.OS' },
  ].map((d) => ({ ...d, y: 400, w: 132, h: 54 }));
  const INFER = { x: 150, y: 522, w: 600, h: 56 };
  const cx = (n: { x: number; w: number }) => n.x + n.w / 2;

  const pillars = [
    {
      icon: GitBranch,
      title: 'GIT-AS-BUS PROTOCOL',
      desc: 'Departments never talk over fragile APIs. Every change moves as a versioned proposal on a git bus — diffable, revertable, and permanently recorded. The org chart becomes a commit graph.',
    },
    {
      icon: ShieldCheck,
      title: 'HUMAN-GATED WRITES',
      desc: 'Agents read freely. Agents write never — without a human. Every write operation queues as a proposal, waits for approval, and lands with a full audit trail. Autonomy without anarchy.',
    },
    {
      icon: Layers,
      title: 'THREE-TIER ARCHITECTURE',
      desc: 'Staff at the top, orchestration in the middle, private inference at the bottom. People direct, agents coordinate, and models think — on hardware you own, behind your firewall.',
    },
  ];

  return (
    <section ref={ref} id="federation" className="relative px-4 sm:px-8 py-24 md:py-40 border-t border-cream/[0.06] overflow-hidden bg-black">
      <SectionDivider inView={inView} label="AI OS FEDERATION" />

      <div className="relative max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-bold text-[clamp(32px,6vw,72px)] leading-[0.95] tracking-tight mb-4 max-w-4xl"
        >
          ONE AI OS PER DEPARTMENT.
          <br />
          <span className="text-white/55">ONE ORCHESTRATOR ABOVE.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-white/55 text-base leading-relaxed max-w-xl mb-10 md:mb-16"
        >
          Not one chatbot bolted onto the org. A federation: every department runs
          its own AI operating system, and an orchestrator OS coordinates them all —
          through versioned proposals, with a human approving every write.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative border border-white/[0.08] bg-void-raised p-3 sm:p-8"
        >
          <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-white/[0.06] relative z-10">
            <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-white/55">
              federation.topology
            </span>
            <div className="flex items-center gap-2 font-mono text-[9px] tracking-[0.25em] uppercase text-signal-blue shrink-0">
              <motion.span
                className="inline-block w-1.5 h-1.5 bg-signal-blue"
                animate={{ opacity: [1, 0.2, 1] }}
                transition={{ duration: 1.4, repeat: Infinity }}
              />
              <span className="hidden sm:inline">BUS ACTIVE · WRITES GATED</span>
              <span className="sm:hidden">GATED</span>
            </div>
          </div>

          <svg
            viewBox="0 0 900 640"
            className="w-full h-auto"
            preserveAspectRatio="xMidYMid meet"
            role="img"
            aria-label="AI OS Federation diagram: staff tier feeds a human approval gate, an orchestrator AI OS coordinates five departmental AI OSes over a git bus, all backed by a private inference tier"
          >
            {[
              { y: 110, label: 'TIER 1 — STAFF · HUMANS IN COMMAND' },
              { y: 370, label: 'TIER 2 — ORCHESTRATION · FEDERATED AI OS' },
              { y: 496, label: 'TIER 3 — PRIVATE INFERENCE · YOUR HARDWARE' },
            ].map((t, i) => (
              <g key={t.y}>
                <motion.line
                  x1="0" y1={t.y} x2="900" y2={t.y}
                  stroke="rgba(255,255,255,0.07)"
                  strokeDasharray="2 6"
                  initial={{ pathLength: 0 }}
                  animate={inView ? { pathLength: 1 } : {}}
                  transition={{ duration: 1.2, delay: 0.4 + i * 0.2 }}
                />
                <motion.text
                  x="6" y={t.y + 16}
                  fill="rgba(255,255,255,0.28)"
                  fontFamily="var(--font-mono), monospace"
                  fontSize="9"
                  letterSpacing="2"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 + i * 0.2 }}
                >
                  {t.label}
                </motion.text>
              </g>
            ))}

            {STAFF.map((s, i) => (
              <motion.line
                key={`se-${i}`}
                x1={cx(s)} y1={s.y + s.h} x2={cx(GATE)} y2={GATE.y}
                stroke="rgba(255,255,255,0.18)"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={inView ? { pathLength: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.7 + i * 0.06 }}
              />
            ))}

            <motion.line
              x1={cx(GATE)} y1={GATE.y + GATE.h} x2={cx(ORCH)} y2={ORCH.y}
              stroke="#3B82F6"
              strokeOpacity="0.45"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : {}}
              transition={{ duration: 0.8, delay: 1 }}
            />

            {DEPTS.map((d, i) => (
              <g key={`de-${i}`}>
                <motion.line
                  x1={cx(ORCH)} y1={ORCH.y + ORCH.h} x2={cx(d)} y2={d.y}
                  stroke="#3B82F6"
                  strokeOpacity="0.28"
                  strokeWidth="1"
                  initial={{ pathLength: 0 }}
                  animate={inView ? { pathLength: 1 } : {}}
                  transition={{ duration: 0.9, delay: 1.1 + i * 0.08 }}
                />
                <motion.circle
                  r="3"
                  fill="#3B82F6"
                  initial={{ opacity: 0 }}
                  animate={inView ? { cx: [cx(ORCH), cx(d)], cy: [ORCH.y + ORCH.h, d.y], opacity: [0, 1, 1, 0] } : {}}
                  transition={{ duration: 1.8, delay: 2 + i * 0.55, repeat: Infinity, repeatDelay: DEPTS.length * 0.55, ease: 'easeInOut' }}
                />
                <motion.line
                  x1={cx(d)} y1={d.y + d.h} x2={cx(d)} y2={INFER.y}
                  stroke="rgba(255,255,255,0.14)"
                  strokeWidth="1"
                  initial={{ pathLength: 0 }}
                  animate={inView ? { pathLength: 1 } : {}}
                  transition={{ duration: 0.7, delay: 1.4 + i * 0.08 }}
                />
                <motion.circle
                  r="2.5"
                  fill="rgba(255,255,255,0.6)"
                  initial={{ opacity: 0 }}
                  animate={inView ? { cx: [cx(d), cx(d)], cy: [d.y + d.h, INFER.y], opacity: [0, 1, 1, 0] } : {}}
                  transition={{ duration: 1.4, delay: 2.4 + i * 0.55, repeat: Infinity, repeatDelay: DEPTS.length * 0.55, ease: 'easeIn' }}
                />
              </g>
            ))}

            <motion.text
              x={cx(ORCH)} y={ORCH.y + ORCH.h + 42}
              fill="rgba(59,130,246,0.8)"
              fontFamily="var(--font-mono), monospace"
              fontSize="9"
              letterSpacing="2"
              textAnchor="middle"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 1.8 }}
            >
              GIT-AS-BUS · PROPOSAL → REVIEW → COMMIT
            </motion.text>

            {STAFF.map((s, i) => (
              <motion.g
                key={`s-${i}`}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              >
                <rect x={s.x} y={s.y} width={s.w} height={s.h} fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
                <text
                  x={cx(s)} y={s.y + 17} textAnchor="middle"
                  fill="rgba(255,255,255,0.6)"
                  fontFamily="var(--font-mono), monospace" fontSize="9" letterSpacing="1.5"
                >
                  STAFF
                </text>
              </motion.g>
            ))}

            <motion.g
              initial={{ opacity: 0, scale: 0.85 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
            >
              <rect x={GATE.x} y={GATE.y} width={GATE.w} height={GATE.h} fill="rgba(59,130,246,0.06)" stroke="#3B82F6" strokeOpacity="0.7" strokeWidth="1" />
              <motion.rect
                x={GATE.x} y={GATE.y} width={GATE.w} height={GATE.h}
                fill="none" stroke="#3B82F6" strokeWidth="1"
                animate={{ opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
              />
              <text x={cx(GATE)} y={GATE.y + 19} textAnchor="middle" fill="#FFFFFF" fontFamily="var(--font-display), sans-serif" fontWeight="700" fontSize="12" letterSpacing="1">
                HUMAN GATE
              </text>
              <text x={cx(GATE)} y={GATE.y + 34} textAnchor="middle" fill="rgba(255,255,255,0.45)" fontFamily="var(--font-mono), monospace" fontSize="8.5" letterSpacing="1.5">
                EVERY WRITE · APPROVE / DENY
              </text>
            </motion.g>

            <motion.g
              initial={{ opacity: 0, scale: 0.85 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <rect x={ORCH.x} y={ORCH.y} width={ORCH.w} height={ORCH.h} fill="rgba(59,130,246,0.1)" stroke="#3B82F6" strokeWidth="1" />
              <motion.rect
                x={ORCH.x} y={ORCH.y} width={ORCH.w} height={ORCH.h}
                fill="none" stroke="#3B82F6" strokeWidth="1"
                animate={{ opacity: [0.7, 0.15, 0.7] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />
              <text x={cx(ORCH)} y={ORCH.y + 28} textAnchor="middle" fill="#3B82F6" fontFamily="var(--font-display), sans-serif" fontWeight="700" fontSize="14" letterSpacing="1.5">
                ORCHESTRATOR OS
              </text>
              <text x={cx(ORCH)} y={ORCH.y + 46} textAnchor="middle" fill="rgba(255,255,255,0.45)" fontFamily="var(--font-mono), monospace" fontSize="8.5" letterSpacing="1.5">
                ROUTES · MERGES · AUDITS
              </text>
            </motion.g>

            {DEPTS.map((d, i) => (
              <motion.g
                key={d.label}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.7, delay: 1.15 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <rect x={d.x} y={d.y} width={d.w} height={d.h} fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
                <text x={cx(d)} y={d.y + 24} textAnchor="middle" fill="rgba(255,255,255,0.85)" fontFamily="var(--font-display), sans-serif" fontWeight="700" fontSize="12" letterSpacing="1">
                  {d.label}
                </text>
                <text x={cx(d)} y={d.y + 40} textAnchor="middle" fill="rgba(255,255,255,0.35)" fontFamily="var(--font-mono), monospace" fontSize="8" letterSpacing="1.5">
                  DEPARTMENT AI OS
                </text>
              </motion.g>
            ))}

            <motion.g
              initial={{ opacity: 0, scale: 0.97 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <rect x={INFER.x} y={INFER.y} width={INFER.w} height={INFER.h} fill="rgba(59,130,246,0.05)" stroke="rgba(59,130,246,0.5)" strokeWidth="1" strokeDasharray="6 4" />
              <text x={cx(INFER)} y={INFER.y + 24} textAnchor="middle" fill="rgba(255,255,255,0.85)" fontFamily="var(--font-display), sans-serif" fontWeight="700" fontSize="13" letterSpacing="1.5">
                PRIVATE INFERENCE PLANE
              </text>
              <text x={cx(INFER)} y={INFER.y + 42} textAnchor="middle" fill="rgba(255,255,255,0.4)" fontFamily="var(--font-mono), monospace" fontSize="8.5" letterSpacing="2">
                NVIDIA DGX · LOCAL MODELS · ZERO EGRESS
              </text>
            </motion.g>
          </svg>

          <div className="mt-6 pt-4 border-t border-white/[0.06] flex flex-wrap gap-x-6 gap-y-2 font-mono text-[9px] tracking-[0.25em] uppercase text-white/55">
            <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-signal-blue" />PROPOSAL FLOW</span>
            <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-white/60" />INFERENCE CALL</span>
            <span className="flex items-center gap-2"><span className="w-3 h-px bg-white/55" />READ PATH</span>
            <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 border border-signal-blue" />HUMAN APPROVAL</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-px border border-white/[0.06] mt-12">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.75, delay: 0.4 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="bg-void-raised p-6 sm:p-8 flex flex-col gap-4 border-t border-signal-blue/40 hover:bg-white/[0.02] hover:border-t-signal-blue transition-colors group cursor-default"
              >
                <div className="flex items-center gap-3">
                  <Icon size={16} className="text-signal-blue shrink-0" aria-hidden />
                  <h3 className="font-mono text-[10px] font-bold tracking-[0.25em] uppercase text-white">
                    {p.title}
                  </h3>
                </div>
                <p className="text-sm text-white/50 leading-relaxed">{p.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Case Study ───────────────────────────────────────────────────────────────
function CaseStudy() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px' });

  const metrics = [
    { value: '3 hrs', label: 'Per week recovered from Digital Drag' },
    { value: '0', label: 'Cloud subscriptions added' },
    { value: '1', label: 'Sovereign Node provisioned' },
    { value: 'ACTIVE', label: 'Since Q1 2026' },
  ];

  const MetricCard = useCallback(
    ({
      metric: m,
      index: i,
      inView: cardInView,
    }: {
      metric: (typeof metrics)[0];
      index: number;
      inView: boolean;
    }) => {
      const cardRef = useRef<HTMLDivElement>(null);
      const x = useMotionValue(0);
      const y = useMotionValue(0);
      const borderX = useMotionTemplate`${x}px`;
      const borderY = useMotionTemplate`${y}px`;

      const numericMatch = m.value.match(/^(-?\d+(?:\.\d+)?)(\s*\D.*)?$/);
      const numericTarget = numericMatch ? parseFloat(numericMatch[1]) : null;
      const numericSuffix = numericMatch ? numericMatch[2] || '' : '';

      return (
        <motion.div
          ref={cardRef}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={cardInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.55, delay: 0.3 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.01, transition: { type: 'spring', stiffness: 100, damping: 20 } }}
          onMouseMove={(e) => {
            const rect = cardRef.current?.getBoundingClientRect();
            if (!rect) return;
            x.set(e.clientX - rect.left);
            y.set(e.clientY - rect.top);
          }}
          className="relative p-4 sm:p-6 bg-void-elevated border-t border-transparent transition-colors duration-300 hover:bg-void-raised group overflow-hidden"
        >
          <motion.div
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(400px circle at ${borderX} ${borderY}, #0057FF22 0%, transparent 40%)`,
              maskImage: `linear-gradient(#000 0 0), linear-gradient(#000 0 0)`,
              maskComposite: 'xor',
              WebkitMaskComposite: 'xor',
            }}
            aria-hidden
          />
          <div
            className="absolute left-0 top-0 bottom-0 w-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{
              background: `linear-gradient(180deg, #0057FF 0%, #0057FF80 50%, transparent 100%)`,
              boxShadow: `0 0 12px #0057FF80, 0 0 24px #0057FF40`,
            }}
            aria-hidden
          />
          <div className="relative z-10 font-display font-bold text-xl sm:text-2xl text-signal-blue tracking-tight mb-1">
            {numericTarget !== null ? (
              <Counter to={numericTarget} suffix={numericSuffix} duration={1200} delay={0.3 + i * 0.1} />
            ) : (
              m.value
            )}
          </div>
          <div className="relative z-10 font-mono text-[9px] tracking-[0.15em] uppercase text-white/55 leading-relaxed">
            {m.label}
          </div>
        </motion.div>
      );
    },
    []
  );

  return (
    <section ref={ref} className="relative px-4 sm:px-8 py-20 md:py-32 border-t border-cream/[0.06] bg-void-elevated">
      <SectionDivider inView={inView} label="ACTIVE DEPLOYMENT" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.06 }}
          className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/55 mb-12"
        >
          REGIONAL CONTRACTOR — PACIFIC NORTHWEST · CLIENT ANONYMIZED
        </motion.div>

        <motion.blockquote
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-bold text-[clamp(32px,6vw,72px)] leading-[0.95] tracking-tight mb-12 max-w-3xl"
        >
          &ldquo;They don&apos;t need another website.<br />
          <span className="text-white/55">They need an Agent.&rdquo;</span>
        </motion.blockquote>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex-1 flex flex-col gap-5"
          >
            <p className="text-white/55 text-base leading-relaxed">
              Digital Drag: the invisible overhead bleeding time from every job.
              The owner was spending 3+ hours a week copy-pasting estimates, chasing
              email threads, and manually updating job status across disconnected tools.
            </p>
            <p className="text-white/55 text-base leading-relaxed">
              The Manteis Sovereign Node now handles client intake, quote follow-ups,
              project status updates, and communication coordination — locally, privately,
              without a single new cloud subscription. Their data stays on their hardware.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <motion.div
                className="w-2 h-2 bg-signal-teal"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.8, repeat: Infinity }}
              />
              <span className="font-mono text-[10px] tracking-widest uppercase text-signal-teal">
                DEPLOYMENT: LIVE
              </span>
            </div>

            <div className="flex flex-col gap-4 pt-2">
              {[
                { name: 'PHASE 1 · NODE PROVISIONING', pct: 100 },
                { name: 'PHASE 2 · AGENT EXPANSION', pct: 45 },
              ].map((ph, i) => (
                <div key={ph.name}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/55">
                      {ph.name}
                    </span>
                    <span className={`font-mono text-[9px] tracking-[0.2em] ${ph.pct === 100 ? 'text-signal-teal' : 'text-signal-blue'}`}>
                      {ph.pct === 100 ? 'COMPLETE' : `${ph.pct}%`}
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

          <div className="grid grid-cols-2 gap-px border border-white/[0.08] lg:min-w-[320px] h-fit">
            {metrics.map((m, i) => (
              <MetricCard key={m.label} metric={m} index={i} inView={inView} />
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
  const inView = useInView(ref, { once: true, margin: '0px' });

  const metrics = [
    { to: 42,    suffix: '+', decimals: 0, label: 'AGENT TOOLS DEPLOYED' },
    { to: 20,    suffix: '+', decimals: 0, label: 'YEARS ENTERPRISE IT' },
    { to: 15,    suffix: '+', decimals: 0, label: 'CONTAINERS ORCHESTRATED' },
    { to: 30,    suffix: '+', decimals: 0, label: 'AUTOMATED WORKFLOWS' },
    { to: 99.99, suffix: '%', decimals: 2, label: 'INFRASTRUCTURE UPTIME' },
  ];

  const cases = [
    {
      tag: 'ENTERPRISE MANUFACTURER',
      title: 'ONE AGENT. THE WHOLE IT SURFACE.',
      desc: 'A 42-tool AI agent covering IT operations, security, data, and infrastructure for an enterprise manufacturer — every write human-gated, every action audit-logged.',
      stat: '42 TOOLS · HUMAN-GATED',
    },
    {
      tag: 'SOVEREIGN NODE DEPLOYMENT',
      title: 'ZERO CLOUD. EIGHT MILLISECONDS.',
      desc: 'Local AI inference on dedicated hardware behind the client’s own firewall. No API keys, no per-token bills, no data leaving the building.',
      stat: '8MS LATENCY · 0 EGRESS',
    },
    {
      tag: 'AI OS FEDERATION',
      title: 'FIVE DEPARTMENTS. ONE ORCHESTRATOR.',
      desc: 'Five departmental AI operating systems unified under a single orchestrator OS — coordinating through versioned proposals on a git-as-bus protocol.',
      stat: '5 OS · 1 ORCHESTRATOR',
    },
  ];

  const stack = [
    'NVIDIA DGX', 'HERMES', 'CLAUDE CODE', 'OLLAMA', 'DOCKER', 'MCP',
    'N8N', 'TAILSCALE', 'SOPHOS', 'HYPER-V', 'ACTIVE DIRECTORY', 'M365',
  ];

  return (
    <section id="proof" ref={ref} className="relative px-4 sm:px-8 py-24 md:py-40 border-t border-cream/[0.06] bg-black">
      <SectionDivider inView={inView} label="PROOF OF OPERATION" />

      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-bold text-[clamp(32px,6vw,72px)] tracking-tight leading-[0.95] mb-10 md:mb-16"
        >
          SHOWN,
          <span className="text-white/55"> NOT TOLD.</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-px border border-white/[0.08] mb-12"
        >
          {metrics.map((m, i) => (
            <div key={m.label} className={`bg-void-raised p-5 sm:p-8 flex flex-col gap-3 hover:bg-white/[0.02] transition-colors duration-300 border-t border-transparent ${i === 4 ? 'col-span-2 md:col-span-1' : ''}`}>
              <div className="font-display font-bold text-3xl md:text-5xl text-signal-blue tracking-tight">
                <Counter to={m.to} suffix={m.suffix} decimals={m.decimals} delay={0.3 + i * 0.12} />
              </div>
              <div className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/55 leading-relaxed">
                {m.label}
              </div>
            </div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-px border border-white/[0.06] mb-12">
          {cases.map((c, i) => (
            <motion.article
              key={c.tag}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.25 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ borderTopColor: '#3B82F6' }}
              className="bg-void-raised p-6 sm:p-8 flex flex-col gap-4 border-t border-transparent hover:bg-white/[0.02] transition-all duration-300 hover:-translate-y-1 group cursor-default"
            >
              <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/55">
                {c.tag} · ANONYMIZED
              </span>
              <h3 className="font-display font-bold text-lg tracking-tight leading-snug text-white">
                {c.title}
              </h3>
              <p className="text-sm text-white/50 leading-relaxed flex-1">{c.desc}</p>
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-signal-blue pt-4 border-t border-white/[0.06]">
                {c.stat}
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="font-mono text-[8px] sm:text-[9px] tracking-[0.2em] sm:tracking-[0.35em] uppercase text-white/55 mb-4"
        >
          {'// OPERATING STACK'}
        </motion.div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px border border-white/[0.06]">
          {stack.map((t, i) => (
            <motion.div
              key={t}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.5 + i * 0.05 }}
              className="bg-void-raised px-3 sm:px-4 py-5 text-center font-mono text-[10px] tracking-[0.18em] uppercase text-white/55 hover:text-signal-blue hover:bg-white/[0.02] transition-colors cursor-default"
            >
              {t}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Manifesto + CTA ──────────────────────────────────────────────────────────
function ManifestoAndCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px' });

  const blocks = [
    {
      label: 'THE ORIGIN',
      heading: 'THE 1998 DECISION.',
      body: 'In 1998, Rhett Elliot Johnson faced a choice: repair a battered car or buy his first music sampler. He chose the sampler. This radical decision — prioritizing the tools of agency over practical convenience — became the foundational DNA of Manteis Systems.',
    },
    {
      label: 'THE HYPNOSIS OF CONTROL',
      heading: 'DESIGNED FOR EXTRACTION.',
      body: 'Modern existence is being flattened by Big Tech, Big Corporate, and Big Pharma. We are being hypnotized by algorithmic dopamine loops designed not for our flourishing, but for our extraction. We have exchanged our agency for quarterly metrics. Convenience is the delivery mechanism. Dependency is the product.',
    },
    {
      label: 'THE SUBVERSION',
      heading: 'BREAK THE MACHINE.',
      body: 'Technology — when held by the individual — is the ultimate tool of subversion. Just as the printing press broke the monopoly of the scribe, and the early internet broke the monopoly of the broadcast, Autonomous AI is here to break the monopoly of the Corporate Machine. Every client we serve gets the same choice Rhett made in 1998. We make sure they choose right.',
    },
    {
      label: 'THE ENTER(PRISE)-PRENEUR',
      heading: 'A MULTIGENERATIONAL BUILD.',
      body: 'Manteis Systems is not just a consultancy — it is a legacy. We are building a business that can be handed to our sons and brothers. Whether automating communications for a PNW contractor or defending a family through AI-assisted legal strategy, our mission is singular: use technology to pull people up.',
    },
    {
      label: 'THE MOBILE ELITE RESPONSE',
      heading: 'THE MANTEIS MOBILE UNIT.',
      body: 'Remote-first but present on the ground. Our vision is a mobile, 24/7 elite response laboratory driving across the Pacific Northwest — deploying on-site sovereignty for the most innovative teams and families. The Sovereign Node goes where you go.',
    },
  ];

  return (
    <section ref={ref} id="contact" className="relative border-t border-white/[0.06] bg-black overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-24 md:py-40">
        <SectionDivider inView={inView} label="MANIFESTO" />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-6 mb-10 md:mb-20"
        >
          <div className="w-16 h-16 border-2 border-signal-blue flex items-center justify-center shrink-0">
            <Terminal size={24} className="text-signal-blue" />
          </div>
          <div>
            <div className="font-mono text-[8px] sm:text-[9px] tracking-[0.2em] sm:tracking-[0.35em] uppercase text-signal-blue mb-1">
              // THE SOVEREIGNTY MANIFESTO
            </div>
            <div className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/55">
              1998 — CREATIVE TOOLS OVER CONVENIENCE
            </div>
          </div>
        </motion.div>

        <div className="flex flex-col divide-y divide-white/[0.06]">
          {blocks.map((b, i) => (
            <motion.div
              key={b.label}
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.08 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="py-10 flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-16 group relative overflow-hidden"
            >
              <span className="absolute top-0 left-0 text-[200px] font-bold text-white/[0.03] leading-none select-none pointer-events-none z-0" aria-hidden="true">
                0{i + 1}
              </span>
              <div className="lg:w-52 shrink-0 relative z-10">
                <span className="block font-mono text-[9px] tracking-[0.25em] uppercase text-white/55" aria-hidden>
                  CH.0{i + 1}
                </span>
                <span className="block font-mono text-[9px] tracking-[0.25em] uppercase text-white/55 mt-1">
                  {b.label}
                </span>
              </div>
              <div className="flex-1 relative z-10">
                <h3 className="font-display font-bold text-[clamp(28px,5vw,56px)] tracking-tight leading-tight mb-4 text-white group-hover:text-signal-blue transition-colors duration-500">
                  {b.heading}
                </h3>
                <p className="text-white/55 text-base leading-relaxed max-w-2xl">
                  {b.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-16 pt-10 border-t border-white/[0.06] text-center font-mono text-[11px] tracking-[0.45em] uppercase text-white/55"
        >
          SUBVERT. CREATE. SOVEREIGNTY.
        </motion.div>
      </div>

      {/* CTA band */}
      <div className="relative border-t border-white/[0.06] px-4 sm:px-8 py-24 md:py-32 flex flex-col items-center text-center overflow-hidden">
        <div className="absolute w-96 h-96 rounded-full bg-[#3B82F6]/10 blur-3xl pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative font-mono text-[8px] sm:text-[9px] tracking-[0.2em] sm:tracking-[0.35em] uppercase text-signal-blue mb-6"
        >
          // FREE DISCOVERY CALL
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative font-display font-bold text-[clamp(36px,6vw,72px)] tracking-tight leading-tight mb-8"
        >
          <GradientText>INITIATE</GradientText><br />
          <span className="text-white/50">SOVEREIGNTY AUDIT.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="relative text-white/50 text-base leading-relaxed max-w-xl mb-4"
        >
          60 minutes. No pitch deck. We audit your current infrastructure, identify
          where Digital Drag is bleeding your time, and propose the right Sovereign
          Node configuration for your operation.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.48 }}
          className="relative font-mono text-[10px] tracking-widest uppercase text-white/55 mb-12 flex flex-wrap gap-6 justify-center"
        >
          <span>STANDARD: $2,500–$7,500 SETUP</span>
          <span className="text-white/10">·</span>
          <span className="text-signal-teal">NON-PROFIT: $1,500–$3,000</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.54 }}
          className="relative flex flex-col items-center gap-5"
        >
          <MagneticButton as="a" href="mailto:rhett@manteissystems.com" className="w-full sm:w-auto">
            INITIATE SOVEREIGNTY AUDIT
          </MagneticButton>
          <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-white/50">
            NO COMMITMENT · RESPONSE WITHIN 24 HOURS · PACIFIC TIME
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
      <EcosystemSection />
      <FederationSection />
      <SovereignNodeSection />
      <Founder />
      <CaseStudy />
      <CapabilitiesProof />
      <ManifestoAndCTA />
      <footer className="border-t border-white/[0.06] px-4 sm:px-8 py-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-white/55 text-center sm:text-left">
            MANTEIS.SYSTEMS · SOVEREIGN INTELLIGENCE INFRASTRUCTURE
          </span>
          <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/50">
            © 2026 // ALL_RIGHTS_RESERVED
          </span>
        </div>
      </footer>
    </main>
  );
}
