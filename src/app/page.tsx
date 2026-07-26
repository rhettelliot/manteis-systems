"use client";

import { useState, useMemo, useRef } from "react";
import { motion } from "motion/react";
import { Menu, X, CheckCircle2, Send, Download, ArrowRight } from "lucide-react";

// ─── TYPES ────────────────────────────────────────────────────────────────
interface Option {
  label: string;
  value: number;
}

interface Question {
  id: number;
  question: string;
  options: Option[];
}

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

// ─── ANIMATION VARIANTS ─────────────────────────────────────────────────
const fadeUp = {
  initial: { opacity: 1, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
};

const clipReveal = {
  initial: { opacity: 1, clipPath: "inset(0 0 0% 0)" },
  whileInView: { opacity: 1, clipPath: "inset(0 0 0% 0)" },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
};

// ─── DATA ─────────────────────────────────────────────────────────────────
const ASSESSMENT_QUESTIONS: Question[] = [
  {
    id: 1,
    question: "How is your team currently using AI?",
    options: [
      { label: "Not yet using AI", value: 0 },
      { label: "Experimenting with ChatGPT", value: 1 },
      { label: "Using API-based tools", value: 2 },
      { label: "Have local AI infrastructure", value: 3 },
    ],
  },
  {
    id: 2,
    question: "What's your biggest AI challenge?",
    options: [
      { label: "Data privacy concerns", value: 2 },
      { label: "Cost of API subscriptions", value: 2 },
      { label: "Team adoption", value: 1 },
      { label: "Integration with existing systems", value: 3 },
    ],
  },
  {
    id: 3,
    question: "How do you handle sensitive data?",
    options: [
      { label: "Cloud SaaS only", value: 0 },
      { label: "Hybrid", value: 2 },
      { label: "On-premise", value: 3 },
      { label: "Not sure", value: 1 },
    ],
  },
  {
    id: 4,
    question: "What's your monthly AI spend?",
    options: [
      { label: "Under $500", value: 1 },
      { label: "$500–2,000", value: 2 },
      { label: "$2,000–5,000", value: 2 },
      { label: "Over $5,000", value: 3 },
    ],
  },
  {
    id: 5,
    question: "When do you want AI deployed?",
    options: [
      { label: "Immediately", value: 3 },
      { label: "1–3 months", value: 2 },
      { label: "3–6 months", value: 1 },
      { label: "Just exploring", value: 0 },
    ],
  },
];

const CHECKLIST_POINTS = [
  "Define which workflows AI will own vs. augment.",
  "Inventory where sensitive data lives and moves.",
  "Choose local vs. cloud inference for each use case.",
  "Select agent orchestration and memory architecture.",
  "Map integration points to existing systems.",
  "Establish identity, access, and zero-trust controls.",
  "Plan for endpoint and fleet management.",
  "Budget hardware, hosting, and ongoing management.",
  "Document compliance and data-retention requirements.",
  "Build a rollout, training, and measurement plan.",
];

// ─── NAV ──────────────────────────────────────────────────────────────────
function Nav() {
  const [open, setOpen] = useState(false);
  const links = [
    { label: "Assessment", href: "#assessment" },
    { label: "Services", href: "#services" },
    { label: "Node", href: "#node" },
    { label: "Case Study", href: "#case-study" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-between px-6 md:px-10 bg-[--color-canvas]/90 border-b border-[--color-border] backdrop-blur-sm">
      <a href="#" className="flex items-center gap-3">
        <div className="w-1.5 h-5 bg-[--color-signal]" />
        <span className="font-display text-sm font-semibold text-[--color-ink] tracking-tight">Manteis Systems</span>
      </a>

      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-8">
        {links.map((l) => (
          <a key={l.label} href={l.href} className="font-body text-[13px] text-[--color-ink-2] hover:text-[--color-signal] transition-colors">
            {l.label}
          </a>
        ))}
      </div>

      <span className="meta hidden lg:block">SEATTLE · 47.6062°N 122.3321°W</span>

      {/* Mobile hamburger */}
      <button
        className="md:hidden p-2 -mr-2 text-[--color-ink]"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Mobile drawer */}
      {open && (
        <div className="absolute top-14 left-0 right-0 bg-[--color-canvas] border-b border-[--color-border] md:hidden">
          <div className="flex flex-col px-6 py-4 gap-4">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="font-body text-[15px] text-[--color-ink-2] hover:text-[--color-signal] transition-colors"
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

// ─── HERO ───────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative min-h-screen pt-14 overflow-hidden">
      <div className="absolute inset-0 grid-lines opacity-50 pointer-events-none" />
      <PerspectiveGrid className="absolute bottom-0 right-0 w-[70vw] h-[55vh] opacity-70 pointer-events-none" />
      <div className="solar-glow" style={{ width: 720, height: 720, bottom: -240, right: -180 }} />
      <Rings className="absolute top-24 left-[-120px] w-[420px] h-[420px] opacity-70 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto min-h-[calc(100vh-56px)] grid grid-cols-12 gap-0">
        <div className="col-span-12 md:col-span-7 flex flex-col justify-end p-6 md:p-10 border-r border-[--color-border]">
          <motion.p {...fadeUp} className="meta mb-8">MNTS-CON-001 · CONVERSION EDITION · 2026</motion.p>

          <motion.h1
            initial={{ opacity: 1, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="text-[clamp(44px,7.5vw,112px)] leading-[0.92] tracking-[-0.05em] font-semibold text-[--color-ink] max-w-[14ch]"
          >
            AI infrastructure
            <br />
            for businesses that
            <br />
            want <span className="text-[--color-signal]">control.</span>
          </motion.h1>

          <motion.p
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.2 }}
            className="font-body text-lg md:text-xl text-[--color-ink-2] leading-[1.6] max-w-[58ch] mt-8 mb-10"
          >
            25+ years of enterprise IT, deployed as private AI, automation, and
            zero-trust security for Seattle-area businesses.
          </motion.p>

          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8"
          >
            <a href="#assessment" className="btn inline-flex items-center gap-2">
              Take Free AI Assessment <ArrowRight size={16} />
            </a>
            <a href="#contact" className="font-body text-[15px] font-semibold text-[--color-ink] hover:text-[--color-signal] transition-colors border-b border-[--color-border] pb-1">
              Book a Discovery Call
            </a>
          </motion.div>
        </div>

        <div className="col-span-12 md:col-span-5 relative flex flex-col">
          <div className="flex-1 flex items-center justify-center border-b border-[--color-border]">
            <span className="display-num">25</span>
          </div>

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

          <div className="p-6 md:p-10 flex items-end justify-between">
            <span className="display-num text-[80px] md:text-[120px] !leading-none">01</span>
            <span className="meta max-w-[100px] text-right">SYSTEMS CONSULTANCY EDITION 2026</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── AI READINESS ASSESSMENT ──────────────────────────────────────────────
function Assessment() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [showGate, setShowGate] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const resultRef = useRef<HTMLDivElement>(null);

  const currentQIndex = Object.keys(answers).length;
  const isComplete = currentQIndex >= ASSESSMENT_QUESTIONS.length;

  const score = useMemo(() => {
    const total = Object.values(answers).reduce((a, b) => a + b, 0);
    return Math.round((total / 15) * 100);
  }, [answers]);

  const tier = useMemo(() => {
    if (score < 35) return { label: "Exploring", color: "text-[--color-ink-3]" };
    if (score < 60) return { label: "Ready", color: "text-[--color-ink-2]" };
    if (score < 85) return { label: "Prime", color: "text-[--color-signal]" };
    return { label: "Optimal", color: "text-[--color-signal]" };
  }, [score]);

  const recommendation = useMemo(() => {
    if (score < 35)
      return "You're early in the AI adoption curve. The best next step is education and a low-risk pilot: start with the AI Infrastructure Checklist, then book a discovery call to map one high-value workflow that doesn't touch sensitive data.";
    if (score < 60)
      return "You have AI exposure but likely rely on cloud tools that create cost, privacy, and integration risk. A Sovereign Node pilot can replace one API-heavy workflow and show you what local control looks like in 30 days.";
    if (score < 85)
      return "Your operation is well-positioned for a private AI deployment. The next move is architecture: model selection, vector memory, agent orchestration, and zero-trust access controls. We can scope this in a single discovery call.";
    return "You're already operating like an AI-native organization. The opportunity now is standardization, security hardening, and fleet-wide automation. Let's discuss an enterprise Sovereign Node and managed operations.";
  }, [score]);

  const handleAnswer = (value: number) => {
    const next = { ...answers, [ASSESSMENT_QUESTIONS[currentQIndex].id]: value };
    setAnswers(next);
    if (Object.keys(next).length >= ASSESSMENT_QUESTIONS.length) {
      setShowResults(true);
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    }
  };

  const reset = () => {
    setAnswers({});
    setShowResults(false);
    setShowGate(false);
    setSubmitted(false);
    setEmail("");
    setCompany("");
  };

  const handleGateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section id="assessment" className="relative border-t border-[--color-border]">
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-0">
        <div className="col-span-12 md:col-span-3 p-6 md:p-10 border-b md:border-b-0 md:border-r border-[--color-border]">
          <span className="display-num text-[64px] md:text-[96px] !leading-none">02</span>
          <p className="meta mt-4">AI READINESS</p>
        </div>
        <div className="col-span-12 md:col-span-9 p-6 md:p-10 flex flex-col justify-center border-b border-[--color-border]">
          <h2 className="text-[clamp(32px,5vw,64px)] leading-[1.0] tracking-[-0.04em] font-semibold text-[--color-ink]">
            Find your AI readiness tier.
          </h2>
          <p className="font-body text-lg text-[--color-ink-2] leading-[1.65] max-w-[65ch] mt-4">
            Five questions. Instant score. Personalized recommendation. No backend required.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-0">
        <div className="col-span-12 md:col-span-8 p-6 md:p-10 border-r border-[--color-border]">
          {!showResults ? (
            <div className="max-w-2xl">
              <div className="flex items-center justify-between mb-6">
                <span className="meta">QUESTION 0{currentQIndex + 1} / 05</span>
                <div className="flex gap-1">
                  {ASSESSMENT_QUESTIONS.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 w-8 ${i < currentQIndex ? "bg-[--color-signal]" : i === currentQIndex ? "bg-[--color-ink-ghost]" : "bg-[--color-border]"}`}
                    />
                  ))}
                </div>
              </div>

              <motion.h3
                key={currentQIndex}
                initial={{ opacity: 1, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="text-[clamp(22px,3vw,34px)] leading-[1.15] tracking-[-0.02em] font-semibold text-[--color-ink] mb-8"
              >
                {ASSESSMENT_QUESTIONS[currentQIndex].question}
              </motion.h3>

              <div className="flex flex-col gap-3">
                {ASSESSMENT_QUESTIONS[currentQIndex].options.map((opt) => (
                  <motion.button
                    key={opt.label}
                    whileHover={{ x: 4 }}
                    onClick={() => handleAnswer(opt.value)}
                    className="text-left w-full p-4 border border-[--color-border] hover:border-[--color-signal] hover:bg-white/[0.02] transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-4 h-4 border border-[--color-ink-3] group-hover:border-[--color-signal] rounded-full flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-[--color-signal] opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <span className="font-body text-[15px] text-[--color-ink-2] group-hover:text-[--color-ink]">{opt.label}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          ) : (
            <motion.div
              ref={resultRef}
              initial={{ opacity: 1, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl"
            >
              <div className="flex items-end gap-6 mb-6">
                <div>
                  <span className="meta block mb-2">READINESS SCORE</span>
                  <span className="font-display text-[clamp(72px,10vw,140px)] leading-[0.85] font-semibold text-[--color-signal] tracking-[-0.05em]">{score}</span>
                </div>
                <div className="pb-4">
                  <span className="meta block mb-1">TIER</span>
                  <span className={`font-body text-2xl font-semibold ${tier.color}`}>{tier.label}</span>
                </div>
              </div>

              <p className="font-body text-[17px] text-[--color-ink-2] leading-[1.7] mb-8">{recommendation}</p>

              {!showGate ? (
                <button onClick={() => setShowGate(true)} className="btn inline-flex items-center gap-2">
                  Get your detailed report <ArrowRight size={16} />
                </button>
              ) : !submitted ? (
                <form onSubmit={handleGateSubmit} className="border border-[--color-border] p-5 md:p-6 bg-white/[0.02]">
                  <p className="font-body text-[15px] font-semibold text-[--color-ink] mb-4">Get your free AI Infrastructure Checklist</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      className="w-full bg-[--color-canvas] border border-[--color-border] px-4 py-3 font-body text-[15px] text-[--color-ink] placeholder:text-[--color-ink-3] focus:border-[--color-signal] focus:outline-none"
                    />
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Company name"
                      className="w-full bg-[--color-canvas] border border-[--color-border] px-4 py-3 font-body text-[15px] text-[--color-ink] placeholder:text-[--color-ink-3] focus:border-[--color-signal] focus:outline-none"
                    />
                  </div>
                  <button type="submit" className="btn w-full md:w-auto inline-flex items-center justify-center gap-2">
                    <Send size={16} /> Send my report
                  </button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 1, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="border border-[--color-signal]/30 bg-[--color-signal]/5 p-6 flex items-start gap-4"
                >
                  <CheckCircle2 className="text-[--color-signal] shrink-0 mt-0.5" size={22} />
                  <div>
                    <p className="font-body text-[17px] font-semibold text-[--color-ink] mb-1">Check your inbox — your assessment is on its way.</p>
                    <p className="font-body text-[14px] text-[--color-ink-2]">We'll also include the AI Infrastructure Checklist for 2026.</p>
                  </div>
                </motion.div>
              )}

              <button onClick={reset} className="mt-6 font-body text-[13px] text-[--color-ink-3] hover:text-[--color-ink-2] transition-colors underline underline-offset-4">
                Retake assessment
              </button>
            </motion.div>
          )}
        </div>

        <div className="col-span-12 md:col-span-4 p-6 md:p-10 flex flex-col justify-center">
          <p className="meta mb-6">HOW SCORING WORKS</p>
          <ul className="flex flex-col gap-4">
            {[
              { v: "0–34", l: "Exploring: pilot-ready, low risk" },
              { v: "35–59", l: "Ready: replace one cloud workflow" },
              { v: "60–84", l: "Prime: architect a Sovereign Node" },
              { v: "85–100", l: "Optimal: scale and harden" },
            ].map((m) => (
              <li key={m.l} className="flex items-start gap-3">
                <span className="font-mono text-[13px] text-[--color-signal] w-16 shrink-0">{m.v}</span>
                <span className="font-body text-[14px] text-[--color-ink-2]">{m.l}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

// ─── SERVICES ───────────────────────────────────────────────────────────
function Services() {
  const services = [
    {
      num: "03",
      title: "AI Infrastructure",
      rate: "$350/hr",
      desc: "Private LLMs, agent orchestration, and vector memory on hardware you own. No API keys. No egress.",
      points: ["Sovereign Node provisioning", "Agent orchestration", "Vector memory architecture"],
    },
    {
      num: "04",
      title: "Security & Compliance",
      rate: "$350/hr",
      desc: "ZTNA, endpoint hardening, MDM governance, and SANS-aligned audits for regulated operations.",
      points: ["Zero-trust network access", "Endpoint protection", "Compliance-ready infra"],
    },
    {
      num: "05",
      title: "Automation & Fleet",
      rate: "$350/hr",
      desc: "Fleet management and workflow automation across Intune, Jamf Pro, M365, AD, Docker, and n8n.",
      points: ["Infrastructure automation", "Container orchestration", "MDM fleet management"],
    },
  ];

  return (
    <section id="services" className="relative border-t border-[--color-border]">
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-0">
        <div className="col-span-12 md:col-span-3 p-6 md:p-10 border-b md:border-b-0 md:border-r border-[--color-border]">
          <span className="display-num text-[64px] md:text-[96px] !leading-none">03</span>
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

      <div className="max-w-7xl mx-auto flex flex-col">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            {...clipReveal}
            transition={{ ...clipReveal.transition, delay: i * 0.05 }}
            className="grid grid-cols-12 gap-0 border-b border-[--color-border] hover:bg-white/[0.015] transition-colors group"
          >
            <div className="col-span-12 md:col-span-1 p-6 md:p-8 border-b md:border-b-0 md:border-r border-[--color-border]">
              <span className="display-num text-[48px] md:text-[64px] !leading-none group-hover:text-[--color-signal] transition-colors">{s.num}</span>
            </div>
            <div className="col-span-12 md:col-span-4 p-6 md:p-8 border-b md:border-b-0 md:border-r border-[--color-border]">
              <h3 className="text-[clamp(22px,2.5vw,34px)] leading-[1.1] tracking-[-0.02em] font-semibold text-[--color-ink] mb-3">{s.title}</h3>
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
                    <span className="w-1 h-1 bg-[--color-signal] mt-2 shrink-0" />{p}
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

// ─── SOVEREIGN NODE ─────────────────────────────────────────────────────
function SovereignNode() {
  return (
    <section id="node" className="relative border-t border-[--color-border]">
      <DitheredPanel className="min-h-[70vh]">
        <div className="absolute inset-0 grid-lines opacity-30 pointer-events-none" />
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

// ─── CASE STUDY ─────────────────────────────────────────────────────────
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

// ─── THE ARCHITECT ──────────────────────────────────────────────────────
function Architect() {
  return (
    <section id="architect" className="relative border-t border-[--color-border]">
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-0">
        <div className="col-span-12 md:col-span-5 p-6 md:p-10 border-r border-[--color-border] flex flex-col justify-center">
          <p className="meta mb-6">/ THE ARCHITECT</p>
          <h2 className="text-[clamp(32px,5vw,64px)] leading-[1.0] tracking-[-0.04em] font-semibold text-[--color-ink] mb-6">
            Rhett <span className="text-[--color-signal]">Manteis.</span>
          </h2>
          <p className="font-body text-lg text-[--color-ink-2] leading-[1.7] max-w-[55ch] mb-8">
            25+ years in enterprise IT. Apple Certified Service Provider. Founder of Manteis Systems.
            I build local AI infrastructure, zero-trust security, and agent automation for organizations
            that want real control over their tools and data.
          </p>
          <div className="grid grid-cols-2 gap-4 border-t border-[--color-border] pt-6">
            {[
              { v: "25", l: "Years enterprise IT" },
              { v: "15+", l: "Docker containers managed" },
              { v: "30+", l: "n8n workflows automated" },
              { v: "9", l: "Music releases (range matters)" },
            ].map((s) => (
              <div key={s.l}>
                <span className="font-display text-[28px] font-semibold text-[--color-ink] tracking-[-0.02em]">{s.v}</span>
                <span className="meta block mt-1">{s.l}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-12 md:col-span-7 p-6 md:p-10 flex flex-col justify-center">
          <div className="aspect-[4/3] w-full bg-[--color-surface] border border-[--color-border] flex flex-col items-center justify-center mb-6 relative overflow-hidden">
            {/* Concentric rings as visual fill instead of empty placeholder */}
            <svg viewBox="0 0 400 300" className="w-full h-full absolute inset-0" preserveAspectRatio="xMidYMid slice" aria-hidden>
              <circle cx="200" cy="150" r="120" fill="none" stroke="rgba(244,243,238,0.06)" strokeWidth="1" />
              <circle cx="200" cy="150" r="95" fill="none" stroke="rgba(244,243,238,0.08)" strokeWidth="1.5" />
              <circle cx="200" cy="150" r="70" fill="none" stroke="rgba(255,85,0,0.20)" strokeWidth="2" />
              <circle cx="200" cy="150" r="45" fill="none" stroke="rgba(244,243,238,0.10)" strokeWidth="1" />
              <circle cx="200" cy="150" r="20" fill="none" stroke="rgba(255,85,0,0.35)" strokeWidth="1.5" />
              <line x1="0" y1="150" x2="400" y2="150" stroke="rgba(244,243,238,0.04)" strokeWidth="1" />
              <line x1="200" y1="0" x2="200" y2="300" stroke="rgba(244,243,238,0.04)" strokeWidth="1" />
            </svg>
            <div className="relative z-10 text-center">
              <span className="font-display text-[clamp(40px,6vw,64px)] font-light tracking-[-0.04em] text-[--color-ink-ghost]">R.M</span>
              <span className="meta block mt-2">SEATTLE · EST. 1998</span>
            </div>
          </div>
          <p className="font-body text-[15px] text-[--color-ink-3] leading-[1.7] max-w-[55ch]">
            Specializing in: local AI infrastructure · zero-trust security · agent automation · fleet management.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── FREE RESOURCE GATE ───────────────────────────────────────────────────
function FreeResource() {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section id="resource" className="relative border-t border-[--color-border]">
      <DitheredPanel className="min-h-[60vh]">
        <div className="absolute inset-0 grid-lines opacity-30 pointer-events-none" />
        <div className="solar-glow" style={{ width: 560, height: 560, top: "50%", left: "10%", transform: "translateY(-50%)" }} />

        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-12 gap-0 min-h-[60vh]">
          <div className="col-span-12 md:col-span-6 p-6 md:p-10 border-r border-[--color-border] flex flex-col justify-center">
            <p className="meta mb-6">/ FREE RESOURCE</p>
            <h2 className="text-[clamp(32px,5vw,64px)] leading-[1.0] tracking-[-0.04em] font-semibold text-[--color-ink] mb-6">
              The AI Infrastructure Checklist for 2026.
            </h2>
            <p className="font-body text-lg text-[--color-ink-2] leading-[1.7] max-w-[55ch]">
              A 10-point checklist for businesses evaluating AI infrastructure. Use it to audit your
              readiness before any vendor conversation.
            </p>
          </div>

          <div className="col-span-12 md:col-span-6 p-6 md:p-10 flex flex-col justify-center">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="border border-[--color-border] p-5 md:p-6 bg-[--color-canvas]/80">
                <p className="font-body text-[15px] font-semibold text-[--color-ink] mb-4 flex items-center gap-2">
                  <Download size={16} className="text-[--color-signal]" /> Download the checklist
                </p>
                <div className="flex flex-col gap-4 mb-4">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full bg-[--color-canvas] border border-[--color-border] px-4 py-3 font-body text-[15px] text-[--color-ink] placeholder:text-[--color-ink-3] focus:border-[--color-signal] focus:outline-none"
                  />
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Company name"
                    className="w-full bg-[--color-canvas] border border-[--color-border] px-4 py-3 font-body text-[15px] text-[--color-ink] placeholder:text-[--color-ink-3] focus:border-[--color-signal] focus:outline-none"
                  />
                </div>
                <button type="submit" className="btn w-full inline-flex items-center justify-center gap-2">
                  Get the checklist
                </button>
                <p className="meta mt-4">No spam. Unsubscribe anytime.</p>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="border border-[--color-signal]/30 bg-[--color-signal]/5 p-6"
              >
                <p className="font-body text-[17px] font-semibold text-[--color-ink] mb-2">Check your inbox — your checklist is on its way.</p>
                <p className="font-body text-[14px] text-[--color-ink-2]">If you don't see it within a few minutes, check your spam folder.</p>
              </motion.div>
            )}

            <div className="mt-8 grid grid-cols-1 gap-3">
              {CHECKLIST_POINTS.map((p, i) => (
                <div key={p} className="flex items-start gap-3">
                  <span className="meta w-6">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-body text-[14px] text-[--color-ink-2]">{p}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DitheredPanel>
    </section>
  );
}

// ─── CONTACT ────────────────────────────────────────────────────────────
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative border-t border-[--color-border] overflow-hidden">
      <div className="solar-glow" style={{ width: 680, height: 680, top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />

      <div className="relative z-10 max-w-7xl mx-auto py-20 md:py-32">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-[clamp(40px,6vw,80px)] leading-[1.05] tracking-[-0.04em] font-semibold text-[--color-ink] mb-6">
            Let&apos;s talk.
          </h2>
          <p className="font-body text-lg text-[--color-ink-2] leading-[1.65] max-w-[60ch] mx-auto">
            60 minutes. No pitch deck. We audit your current infrastructure, identify where overhead
            is bleeding your time, and propose the right configuration for your operation.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-0 border border-[--color-border]">
          <div className="p-6 md:p-10 border-b md:border-b-0 md:border-r border-[--color-border] flex flex-col justify-center">
            <p className="meta mb-4">OPTION 01</p>
            <h3 className="text-[clamp(24px,3vw,36px)] leading-[1.1] tracking-[-0.02em] font-semibold text-[--color-ink] mb-4">
              Book a Discovery Call
            </h3>
            <p className="font-body text-[15px] text-[--color-ink-2] leading-[1.7] mb-8">
              Fastest path forward. Tell me what you're working with and I'll propose the right first step.
            </p>
            <a href="mailto:rhett@manteissystems.com" className="btn inline-flex items-center justify-center gap-2">
              Email to book a call
            </a>
            <p className="meta mt-4">rhett@manteissystems.com</p>
          </div>

          <div className="p-6 md:p-10">
            <p className="meta mb-4">OPTION 02</p>
            <h3 className="text-[clamp(24px,3vw,36px)] leading-[1.1] tracking-[-0.02em] font-semibold text-[--color-ink] mb-6">
              Send a Message
            </h3>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange("name")}
                  placeholder="Name"
                  className="w-full bg-[--color-canvas] border border-[--color-border] px-4 py-3 font-body text-[15px] text-[--color-ink] placeholder:text-[--color-ink-3] focus:border-[--color-signal] focus:outline-none"
                />
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange("email")}
                  placeholder="Email"
                  className="w-full bg-[--color-canvas] border border-[--color-border] px-4 py-3 font-body text-[15px] text-[--color-ink] placeholder:text-[--color-ink-3] focus:border-[--color-signal] focus:outline-none"
                />
                <input
                  type="text"
                  value={form.company}
                  onChange={handleChange("company")}
                  placeholder="Company"
                  className="w-full bg-[--color-canvas] border border-[--color-border] px-4 py-3 font-body text-[15px] text-[--color-ink] placeholder:text-[--color-ink-3] focus:border-[--color-signal] focus:outline-none"
                />
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={handleChange("message")}
                  placeholder="What's your biggest AI infrastructure challenge?"
                  className="w-full bg-[--color-canvas] border border-[--color-border] px-4 py-3 font-body text-[15px] text-[--color-ink] placeholder:text-[--color-ink-3] focus:border-[--color-signal] focus:outline-none resize-none"
                />
                <button type="submit" className="btn inline-flex items-center justify-center gap-2 mt-2">
                  <Send size={16} /> Send message
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="border border-[--color-signal]/30 bg-[--color-signal]/5 p-6 h-full flex flex-col justify-center"
              >
                <p className="font-body text-[17px] font-semibold text-[--color-ink] mb-2">Message sent.</p>
                <p className="font-body text-[14px] text-[--color-ink-2]">I'll reply within one business day. If it's urgent, email directly at rhett@manteissystems.com.</p>
              </motion.div>
            )}
          </div>
        </div>

        <p className="meta text-center mt-8">Standard: $2,500–$7,500 · Non-profit: $1,500–$3,000</p>
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
        <a href="mailto:rhett@manteissystems.com" className="font-body text-[13px] text-[--color-ink-3] hover:text-[--color-signal] transition-colors">
          rhett@manteissystems.com
        </a>
        <span className="meta">© 2026</span>
      </div>
    </footer>
  );
}

// ─── PAGE ───────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Nav />
      <Hero />
      <Assessment />
      <Services />
      <SovereignNode />
      <CaseStudy />
      <Architect />
      <FreeResource />
      <Contact />
      <Footer />
    </main>
  );
}
