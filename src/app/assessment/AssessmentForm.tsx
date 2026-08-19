"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  Menu,
  X,
  ArrowRight,
  ArrowLeft,
  Check,
  Loader2,
  AlertCircle,
  Server,
  Shield,
  Workflow,
  Cpu,
  Building2,
  Mail,
} from "lucide-react";
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

// ─── QUESTIONS ──────────────────────────────────────────────────────────────
interface Question {
  id: number;
  category: string;
  icon: typeof Server;
  question: string;
  options: { label: string; value: number; detail?: string }[];
}

const questions: Question[] = [
  {
    id: 1,
    category: "Infrastructure",
    icon: Server,
    question: "How is your AI infrastructure currently deployed?",
    options: [
      { label: "No AI infrastructure yet", value: 0 },
      { label: "Cloud APIs only (OpenAI, Anthropic, etc.)", value: 1 },
      { label: "Hybrid — some local, some cloud", value: 2 },
      { label: "Fully local / on-premise", value: 3 },
    ],
  },
  {
    id: 2,
    category: "Infrastructure",
    icon: Cpu,
    question: "What compute resources do you have available for local AI?",
    options: [
      { label: "No dedicated hardware", value: 0 },
      { label: "Workstation / laptop grade", value: 1 },
      { label: "Server with GPU", value: 2 },
      { label: "Dedicated AI server / cluster", value: 3 },
    ],
  },
  {
    id: 3,
    category: "Data Sovereignty",
    icon: Shield,
    question: "How sensitive is the data your AI would process?",
    options: [
      { label: "Public / non-sensitive", value: 0 },
      { label: "Internal business data", value: 1 },
      { label: "PII / confidential client data", value: 2 },
      { label: "Regulated (HIPAA, SOC 2, etc.)", value: 3 },
    ],
  },
  {
    id: 4,
    category: "Data Sovereignty",
    icon: Shield,
    question: "Does data leaving your network pose a compliance risk?",
    options: [
      { label: "No restrictions", value: 0 },
      { label: "Prefer to keep internal", value: 1 },
      { label: "Strict data residency requirements", value: 2 },
      { label: "Cannot send any data to third parties", value: 3 },
    ],
  },
  {
    id: 5,
    category: "Automation",
    icon: Workflow,
    question: "How mature is your current workflow automation?",
    options: [
      { label: "Mostly manual processes", value: 0 },
      { label: "Some scripts / Zapier", value: 1 },
      { label: "Dedicated automation platform (n8n, etc.)", value: 2 },
      { label: "AI-driven automated pipelines", value: 3 },
    ],
  },
  {
    id: 6,
    category: "Automation",
    icon: Workflow,
    question: "How many repetitive knowledge tasks could AI automate?",
    options: [
      { label: "Few — mostly custom work", value: 0 },
      { label: "Several — weekly repetitive tasks", value: 1 },
      { label: "Many — daily repetitive workflows", value: 2 },
      { label: "High volume — AI could transform operations", value: 3 },
    ],
  },
  {
    id: 7,
    category: "Team",
    icon: Building2,
    question: "What is your team size?",
    options: [
      { label: "Solo / founder", value: 0 },
      { label: "2–10 people", value: 1 },
      { label: "11–50 people", value: 2 },
      { label: "50+ people", value: 3 },
    ],
  },
  {
    id: 8,
    category: "Team",
    icon: Cpu,
    question: "Does your team have technical capacity for infrastructure?",
    options: [
      { label: "No technical team", value: 0 },
      { label: "Some technical skills", value: 1 },
      { label: "Dedicated IT / DevOps", value: 2 },
      { label: "Full engineering team", value: 3 },
    ],
  },
  {
    id: 9,
    category: "Security",
    icon: Shield,
    question: "What is your current security posture?",
    options: [
      { label: "Basic — no formal security program", value: 0 },
      { label: "Some controls — firewall, AV", value: 1 },
      { label: "Formal security — policies, audits", value: 2 },
      { label: "Zero Trust / SOC 2 / HIPAA compliant", value: 3 },
    ],
  },
  {
    id: 10,
    category: "Security",
    icon: Shield,
    question: "Do you need AI-powered security monitoring (SIEM)?",
    options: [
      { label: "Not currently", value: 0 },
      { label: "Considering it", value: 1 },
      { label: "Active requirement", value: 2 },
      { label: "Already have SIEM, want AI enhancement", value: 3 },
    ],
  },
  {
    id: 11,
    category: "Timeline",
    icon: ArrowRight,
    question: "What is your timeline for deploying local AI?",
    options: [
      { label: "Exploring — no timeline", value: 0 },
      { label: "3–6 months", value: 1 },
      { label: "1–3 months", value: 2 },
      { label: "Immediate — next 30 days", value: 3 },
    ],
  },
  {
    id: 12,
    category: "Budget",
    icon: Building2,
    question: "What investment range are you considering?",
    options: [
      { label: "Under $10K", value: 0 },
      { label: "$10K – $50K", value: 1 },
      { label: "$50K – $150K", value: 2 },
      { label: "$150K+", value: 3 },
    ],
  },
];

// ─── NAV ────────────────────────────────────────────────────────────────────
function Nav() {
  const [open, setOpen] = useState(false);
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

      <Link
        href="/sovereign-os"
        className="hidden md:inline-flex font-mono text-[11px] tracking-wide uppercase px-4 py-2 border transition-colors hover:border-[#FF5500] hover:text-[#FF5500]"
        style={{ color: C.muted, borderColor: C.border }}
      >
        ← Sovereign OS
      </Link>

      <button
        className="md:hidden"
        style={{ color: C.text }}
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close menu" : "Open menu"}
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>
    </nav>
  );
}

// ─── ASSESSMENT FORM ────────────────────────────────────────────────────────
export function AssessmentForm() {
  const [step, setStep] = useState(0); // 0 = intro, 1-12 = questions, 13 = capture, 14 = results
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [contact, setContact] = useState({ name: "", email: "", company: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const totalSteps = questions.length;
  const progress = step === 0 ? 0 : step <= totalSteps ? (step / totalSteps) * 100 : 100;

  const selectAnswer = (questionId: number, value: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    setTimeout(() => {
      if (step < totalSteps) setStep(step + 1);
      else setStep(totalSteps + 1); // go to capture
    }, 300);
  };

  const submitContact = async () => {
    if (!contact.name || !contact.email) {
      setError("Name and email are required");
      return;
    }
    setSubmitting(true);
    setError("");

    const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);
    const maxScore = totalSteps * 3;
    const percentage = Math.round((totalScore / maxScore) * 100);

    try {
      const res = await fetch("/api/lead-capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: contact.name,
          email: contact.email,
          company: contact.company,
          source: "sovereign-ai-assessment",
          pain_points: `Assessment score: ${percentage}% (${totalScore}/${maxScore}). Answers: ${JSON.stringify(answers)}`,
        }),
      });

      if (res.ok) {
        setStep(totalSteps + 2); // results
      } else {
        // Still show results even if webhook fails
        setStep(totalSteps + 2);
      }
    } catch {
      // Show results regardless — the user gets value
      setStep(totalSteps + 2);
    }
    setSubmitting(false);
  };

  const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);
  const maxScore = totalSteps * 3;
  const percentage = Math.round((totalScore / maxScore) * 100);

  const getTier = () => {
    if (percentage >= 75) return { label: "Sovereign Ready", color: C.green, desc: "Your organization is well-positioned for a full Sovereign OS deployment. You have the infrastructure, security posture, and use cases to maximize ROI from local AI." };
    if (percentage >= 50) return { label: "Deployment Candidate", color: C.signal, desc: "You're a strong candidate for a Standard tier deployment. Key gaps to address before full rollout — we can help you bridge them." };
    if (percentage >= 25) return { label: "Pilot Ready", color: C.blue, desc: "Start with a focused pilot. We recommend the Starter tier — a single workflow that proves value before scaling." };
    return { label: "Early Stage", color: C.muted, desc: "You're at the beginning of your AI journey. The Sovereign AI Starter Kit is your best first step — the complete reference architecture." };
  };

  // ─── INTRO ──────────────────────────────────────────────────────────────
  if (step === 0) {
    return (
      <main className="relative min-h-screen" style={{ background: C.bg }}>
        <Nav />
        <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-10 pt-32 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2 h-2" style={{ background: C.signal }} />
              <span className="font-mono text-[10px] tracking-[0.18em] uppercase" style={{ color: C.muted }}>
                Free · 5 minutes · No commitment
              </span>
            </div>

            <h1
              className="font-display font-light tracking-[-0.04em] leading-[0.95] mb-6"
              style={{ color: C.text, fontSize: "clamp(40px, 8vw, 72px)" }}
            >
              Sovereign AI
              <br />
              <span style={{ color: C.signal }}>Assessment</span>
            </h1>

            <p className="font-body text-lg leading-[1.65] mb-10" style={{ color: C.muted }}>
              Answer 12 questions across infrastructure, data sovereignty, automation, security, and
              team readiness. Get a customized report showing where you stand and what to do next.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-px mb-10" style={{ background: C.border }}>
              {[
                { icon: Server, label: "Infrastructure" },
                { icon: Shield, label: "Data Sovereignty" },
                { icon: Workflow, label: "Automation" },
                { icon: Building2, label: "Team & Budget" },
              ].map((cat) => (
                <div key={cat.label} className="p-4" style={{ background: C.bg }}>
                  <cat.icon size={20} style={{ color: C.signal }} className="mb-2" />
                  <span className="font-mono text-[10px] tracking-[0.12em] uppercase" style={{ color: C.muted }}>
                    {cat.label}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setStep(1)}
              className="inline-flex items-center gap-2 font-body text-[15px] font-semibold px-6 py-3.5 transition-colors hover:bg-[#E64D00]"
              style={{ background: C.signal, color: C.bg }}
            >
              Start Assessment <ArrowRight size={16} />
            </button>
          </motion.div>
        </div>
      </main>
    );
  }

  // ─── RESULTS ────────────────────────────────────────────────────────────
  if (step === totalSteps + 2) {
    const tier = getTier();
    return (
      <main className="relative min-h-screen" style={{ background: C.bg }}>
        <Nav />
        <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-10 pt-32 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-mono text-[10px] tracking-[0.18em] uppercase mb-4 block" style={{ color: C.muted }}>
              Assessment Complete
            </span>

            <div
              className="relative p-8 md:p-12 border mb-8"
              style={{ borderColor: C.borderHi, background: C.surface }}
            >
              <div className="absolute -top-px -left-px -right-px h-[2px]" style={{ background: tier.color }} />

              <h2
                className="font-display text-[36px] md:text-[48px] font-semibold tracking-[-0.03em] mb-3"
                style={{ color: tier.color }}
              >
                {tier.label}
              </h2>

              <div className="flex items-baseline gap-4 mb-6">
                <span className="font-display text-[64px] font-light tracking-[-0.04em]" style={{ color: C.text }}>
                  {percentage}%
                </span>
                <span className="font-mono text-[13px] tracking-wide" style={{ color: C.muted }}>
                  {totalScore} / {maxScore} readiness score
                </span>
              </div>

              <p className="font-body text-[16px] leading-[1.65] mb-8" style={{ color: C.text }}>
                {tier.desc}
              </p>

              {/* Category breakdown */}
              <div className="border-t pt-6" style={{ borderColor: C.border }}>
                <p className="font-mono text-[10px] tracking-[0.16em] uppercase mb-4" style={{ color: C.muted }}>
                  Category Breakdown
                </p>
                <div className="space-y-3">
                  {["Infrastructure", "Data Sovereignty", "Automation", "Team", "Security", "Timeline & Budget"].map((cat) => {
                    const catQuestions = questions.filter((q) => q.category === cat || (cat === "Timeline & Budget" && (q.category === "Timeline" || q.category === "Budget")));
                    if (catQuestions.length === 0) return null;
                    const catScore = catQuestions.reduce((sum, q) => sum + (answers[q.id] || 0), 0);
                    const catMax = catQuestions.length * 3;
                    const catPct = Math.round((catScore / catMax) * 100);
                    return (
                      <div key={cat}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-body text-[13px]" style={{ color: C.text }}>
                            {cat}
                          </span>
                          <span className="font-mono text-[11px]" style={{ color: C.muted }}>
                            {catPct}%
                          </span>
                        </div>
                        <div className="h-1" style={{ background: C.ghost }}>
                          <div className="h-full transition-all duration-1000" style={{ width: `${catPct}%`, background: C.signal }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Next steps CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/sovereign-os"
                className="inline-flex items-center gap-2 font-body text-[15px] font-semibold px-6 py-3.5 transition-colors hover:bg-[#E64D00]"
                style={{ background: C.signal, color: C.bg }}
              >
                Explore Sovereign OS <ArrowRight size={16} />
              </Link>
              <a
                href="mailto:rhett@manteis.systems?subject=Sovereign%20AI%20Assessment%20Follow-up"
                className="inline-flex items-center gap-2 font-body text-[15px] font-semibold px-6 py-3.5 border transition-colors hover:border-[#FF5500] hover:text-[#FF5500]"
                style={{ color: C.text, borderColor: C.borderHi }}
              >
                <Mail size={16} /> Discuss your results
              </a>
            </div>

            <p className="font-mono text-[11px] tracking-wide mt-8" style={{ color: C.muted }}>
              Your results have been sent to {contact.email}. We&apos;ll follow up within 48 hours.
            </p>
          </motion.div>
        </div>
      </main>
    );
  }

  // ─── CONTACT CAPTURE ────────────────────────────────────────────────────
  if (step === totalSteps + 1) {
    return (
      <main className="relative min-h-screen" style={{ background: C.bg }}>
        <Nav />
        <div className="relative z-10 max-w-2xl mx-auto px-6 md:px-10 pt-32 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-2 mb-6">
              <Check size={16} style={{ color: C.green }} />
              <span className="font-mono text-[10px] tracking-[0.18em] uppercase" style={{ color: C.muted }}>
                All questions answered
              </span>
            </div>

            <h1
              className="font-display font-light tracking-[-0.04em] leading-[0.95] mb-6"
              style={{ color: C.text, fontSize: "clamp(36px, 6vw, 56px)" }}
            >
              Get your <span style={{ color: C.signal }}>results</span>
            </h1>

            <p className="font-body text-lg leading-[1.65] mb-10" style={{ color: C.muted }}>
              Enter your details to see your readiness score, category breakdown, and recommended
              next steps. We&apos;ll follow up within 48 hours — no spam, no sales pressure.
            </p>

            <div className="space-y-5">
              <div>
                <label className="font-mono text-[10px] tracking-[0.12em] uppercase block mb-2" style={{ color: C.muted }}>
                  Name *
                </label>
                <input
                  type="text"
                  value={contact.name}
                  onChange={(e) => setContact({ ...contact, name: e.target.value })}
                  className="w-full px-4 py-3 font-body text-[15px] border focus:outline-none focus:border-[#FF5500] transition-colors"
                  style={{ background: C.surface, borderColor: C.border, color: C.text }}
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="font-mono text-[10px] tracking-[0.12em] uppercase block mb-2" style={{ color: C.muted }}>
                  Email *
                </label>
                <input
                  type="email"
                  value={contact.email}
                  onChange={(e) => setContact({ ...contact, email: e.target.value })}
                  className="w-full px-4 py-3 font-body text-[15px] border focus:outline-none focus:border-[#FF5500] transition-colors"
                  style={{ background: C.surface, borderColor: C.border, color: C.text }}
                  placeholder="you@company.com"
                />
              </div>
              <div>
                <label className="font-mono text-[10px] tracking-[0.12em] uppercase block mb-2" style={{ color: C.muted }}>
                  Company (optional)
                </label>
                <input
                  type="text"
                  value={contact.company}
                  onChange={(e) => setContact({ ...contact, company: e.target.value })}
                  className="w-full px-4 py-3 font-body text-[15px] border focus:outline-none focus:border-[#FF5500] transition-colors"
                  style={{ background: C.surface, borderColor: C.border, color: C.text }}
                  placeholder="Company name"
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 text-[13px]" style={{ color: C.signal }}>
                  <AlertCircle size={14} /> {error}
                </div>
              )}

              <button
                onClick={submitContact}
                disabled={submitting}
                className="inline-flex items-center gap-2 font-body text-[15px] font-semibold px-6 py-3.5 transition-colors hover:bg-[#E64D00] disabled:opacity-50"
                style={{ background: C.signal, color: C.bg }}
              >
                {submitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Processing...
                  </>
                ) : (
                  <>
                    See My Results <ArrowRight size={16} />
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      </main>
    );
  }

  // ─── QUESTION ───────────────────────────────────────────────────────────
  const currentQ = questions[step - 1];
  const isLast = step === totalSteps;

  return (
    <main className="relative min-h-screen" style={{ background: C.bg }}>
      <Nav />

      {/* Progress bar */}
      <div className="fixed top-14 left-0 right-0 h-[2px] z-40" style={{ background: C.ghost }}>
        <motion.div
          className="h-full"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ background: C.signal }}
        />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-10 pt-32 pb-20 min-h-[calc(100vh-56px)] flex flex-col">
        {/* Step indicator */}
        <div className="flex items-center gap-3 mb-8">
          <currentQ.icon size={18} style={{ color: C.signal }} />
          <span className="font-mono text-[10px] tracking-[0.18em] uppercase" style={{ color: C.muted }}>
            {currentQ.category} · {step} of {totalSteps}
          </span>
        </div>

        {/* Question */}
        <motion.h2
          key={`q-${currentQ.id}`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[clamp(24px, 4vw, 36px)] font-semibold tracking-[-0.03em] leading-[1.2] mb-10"
          style={{ color: C.text }}
        >
          {currentQ.question}
        </motion.h2>

        {/* Options */}
        <div className="space-y-3 flex-1">
          {currentQ.options.map((opt, idx) => {
            const isSelected = answers[currentQ.id] === opt.value;
            return (
              <motion.button
                key={opt.value}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => selectAnswer(currentQ.id, opt.value)}
                className="w-full text-left p-5 border transition-all duration-200 flex items-center justify-between group"
                style={{
                  background: isSelected ? C.surface : C.bg,
                  borderColor: isSelected ? C.signal : C.border,
                }}
              >
                <span
                  className="font-body text-[16px] leading-[1.5]"
                  style={{ color: isSelected ? C.text : C.muted }}
                >
                  {opt.label}
                </span>
                <div
                  className="w-5 h-5 border flex items-center justify-center shrink-0 ml-4 transition-all"
                  style={{
                    borderColor: isSelected ? C.signal : C.borderHi,
                    background: isSelected ? C.signal : "transparent",
                  }}
                >
                  {isSelected && <Check size={12} style={{ color: C.bg }} />}
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Back button */}
        <div className="mt-8 pt-6 border-t" style={{ borderColor: C.border }}>
          <button
            onClick={() => setStep(Math.max(0, step - 1))}
            className="inline-flex items-center gap-2 font-mono text-[11px] tracking-wide uppercase transition-colors hover:text-[#FF5500]"
            style={{ color: C.muted }}
          >
            <ArrowLeft size={14} /> Back
          </button>
        </div>
      </div>
    </main>
  );
}