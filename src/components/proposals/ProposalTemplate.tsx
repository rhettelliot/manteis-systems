'use client';

import { useState } from 'react';
import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import {
  Server, Bot, Monitor, ShieldCheck, AlertTriangle,
  CheckCircle2, Clock, DollarSign, Users, ArrowRight,
  FileText, Lock, Zap, Terminal,
} from 'lucide-react';
import type { ProposalData } from '../../lib/proposal-types';

// ─── Icon resolver ────────────────────────────────────────────────────────────
const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Server, Bot, Monitor, ShieldCheck,
};

// ─── Boot log (proposal variant) ─────────────────────────────────────────────
const PROPOSAL_LOG = [
  'INITIALIZING PROPOSAL GENERATION...',
  'CLIENT INTAKE: PARSED [OK]',
  'PROBLEM ANALYSIS: COMPLETE [OK]',
  'SOLUTION ARCHITECTURE: MAPPED [OK]',
  'TIMELINE: PHASED [OK]',
  'PRICING: CALCULATED [OK]',
  'TEAM: ASSIGNED [OK]',
  'SOVEREIGNTY CHECK: ENFORCED',
  'PROPOSAL READY.',
];

function BootLog() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const [visibleLines, setVisibleLines] = useState(0);

  // Reveal lines sequentially
  useState(() => {
    if (inView) {
      const interval = setInterval(() => {
        setVisibleLines((prev) => {
          if (prev >= PROPOSAL_LOG.length) {
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });
      }, 180);
      return () => clearInterval(interval);
    }
  });

  return (
    <div ref={ref} className="font-mono text-mono-xs text-cream/40 space-y-1 mb-16 md:mb-24">
      {PROPOSAL_LOG.slice(0, visibleLines).map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className={line.includes('[OK]') || line.includes('READY') || line.includes('ENFORCED')
            ? 'text-signal'
            : 'text-cream/40'}
        >
          <span className="text-cream/30 mr-2">{'>'}</span>
          {line}
        </motion.div>
      ))}
    </div>
  );
}

// ─── Section header ──────────────────────────────────────────────────────────
function SectionHeader({ number, label, title }: { number: string; label: string; title: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="mb-12 md:mb-16"
    >
      <div className="flex items-center gap-4 mb-4">
        <span className="section-number leading-none text-signal" aria-hidden>{number}</span>
        <div className="h-px flex-1 bg-cream/[0.08]" />
        <span className="font-mono text-[9px] tracking-[0.35em] uppercase text-cream/45">
          {label}
        </span>
      </div>
      <h2 className="font-display text-display-md md:text-display-lg text-cream tracking-tight">
        {title}
      </h2>
    </motion.div>
  );
}

// ─── 01. Problem ──────────────────────────────────────────────────────────────
function ProblemSection({ data }: { data: ProposalData }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="problem" className="px-4 sm:px-8 max-w-6xl mx-auto py-16 md:py-24">
      <SectionHeader number="01" label="THE CHALLENGE" title={data.problem.title} />

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid md:grid-cols-2 gap-8 md:gap-16"
      >
        {/* Left: description + metrics */}
        <div>
          <p className="text-body-md text-cream/70 leading-relaxed mb-8">
            {data.problem.description}
          </p>

          <div className="space-y-4">
            <div className="border border-error/20 bg-error/[0.03] p-6">
              <div className="flex items-center gap-3 mb-2">
                <AlertTriangle className="w-4 h-4 text-error" />
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-error">
                  Current Cost
                </span>
              </div>
              <p className="font-display text-display-md text-cream">{data.problem.currentCost}</p>
            </div>

            <div className="border border-error/20 bg-error/[0.03] p-6">
              <div className="flex items-center gap-3 mb-2">
                <Lock className="w-4 h-4 text-error" />
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-error">
                  Data Leakage Risk
                </span>
              </div>
              <p className="font-display text-display-md text-cream">{data.problem.dataLeakageRisk}</p>
            </div>
          </div>
        </div>

        {/* Right: pain points */}
        <div>
          <h3 className="font-mono text-[10px] tracking-[0.3em] uppercase text-cream/45 mb-6">
            // PAIN POINTS
          </h3>
          <ul className="space-y-3">
            {data.problem.painPoints.map((point, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: 12 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                className="flex items-start gap-3 border-l-2 border-error/30 pl-4 py-1"
              >
                <span className="font-mono text-mono-xs text-error/60 mt-1 shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-body-sm text-cream/70">{point}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </section>
  );
}

// ─── 02. Solution ─────────────────────────────────────────────────────────────
function SolutionSection({ data }: { data: ProposalData }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="solution" className="px-4 sm:px-8 max-w-6xl mx-auto py-16 md:py-24 border-t border-cream/[0.06]">
      <SectionHeader number="02" label="THE ARCHITECTURE" title={data.solution.title} />

      <motion.p
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-body-md text-cream/70 leading-relaxed mb-12 md:mb-16 max-w-3xl"
      >
        {data.solution.description}
      </motion.p>

      {/* Component grid */}
      <div className="grid sm:grid-cols-2 gap-px bg-cream/[0.06] mb-12">
        {data.solution.components.map((component, i) => {
          const Icon = ICON_MAP[component.icon] || Server;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              className="bg-void p-8 md:p-10 group hover:bg-layer-1 transition-colors duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 flex items-center justify-center bg-signal/10 border border-signal/20">
                  <Icon className="w-5 h-5 text-signal" />
                </div>
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-cream/45">
                  MODULE_{String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <h4 className="font-display text-body-lg text-cream mb-2">{component.name}</h4>
              <p className="text-body-sm text-cream/60 leading-relaxed">{component.description}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Sovereignty guarantees */}
      <div className="border border-signal/20 bg-signal/[0.02] p-8 md:p-10">
        <div className="flex items-center gap-3 mb-6">
          <ShieldCheck className="w-5 h-5 text-signal" />
          <h3 className="font-mono text-[10px] tracking-[0.3em] uppercase text-signal">
            SOVEREIGNTY GUARANTEES
          </h3>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {data.solution.sovereigntyGuarantees.map((guarantee, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 12 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
              className="flex items-center gap-3"
            >
              <CheckCircle2 className="w-4 h-4 text-signal shrink-0" />
              <span className="text-body-sm text-cream/80 font-mono">{guarantee}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 03. Timeline ─────────────────────────────────────────────────────────────
function TimelineSection({ data }: { data: ProposalData }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="timeline" className="px-4 sm:px-8 max-w-6xl mx-auto py-16 md:py-24 border-t border-cream/[0.06]">
      <SectionHeader number="03" label="DEPLOYMENT SCHEDULE" title="Phased Rollout" />

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-cream/[0.08]" />

        {data.timeline.map((phase, i) => (
          <motion.div
            key={i}
            ref={i === 0 ? ref : undefined}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className={`relative flex flex-col md:flex-row gap-8 mb-12 md:mb-16 ${
              i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
            }`}
          >
            {/* Phase number node */}
            <div className="md:w-1/2 flex md:justify-end items-start gap-4 md:pr-12"
              style={{ order: i % 2 === 0 ? 0 : 1 }}
            >
              <div className="flex flex-col items-center md:items-end gap-2">
                <span className="section-number text-signal leading-none">{phase.phase}</span>
                <div className="flex items-center gap-2">
                  <Clock className="w-3 h-3 text-cream/40" />
                  <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-cream/45">
                    {phase.duration}
                  </span>
                </div>
              </div>
            </div>

            {/* Node dot */}
            <div className="absolute left-0 md:left-1/2 top-2 -translate-x-1/2 w-3 h-3 bg-signal border-2 border-void rounded-none" />

            {/* Phase content */}
            <div className="md:w-1/2 md:pl-12 pl-8">
              <div className="border border-cream/[0.08] bg-layer-1 p-6 md:p-8 hover:border-signal/20 transition-colors duration-300">
                <h4 className="font-display text-body-lg text-cream mb-4">{phase.name}</h4>
                <ul className="space-y-2">
                  {phase.deliverables.map((deliverable, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <span className="font-mono text-mono-xs text-signal/60 mt-1 shrink-0">▸</span>
                      <span className="text-body-sm text-cream/65">{deliverable}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── 04. Pricing ──────────────────────────────────────────────────────────────
function PricingSection({ data }: { data: ProposalData }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="pricing" className="px-4 sm:px-8 max-w-6xl mx-auto py-16 md:py-24 border-t border-cream/[0.06]">
      <SectionHeader number="04" label="INVESTMENT" title="The Sovereignty Stack" />

      <div className="grid md:grid-cols-3 gap-px bg-cream/[0.06]">
        {data.pricing.map((tier, i) => (
          <motion.div
            key={i}
            ref={i === 0 ? ref : undefined}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.12 }}
            className={`relative p-8 md:p-10 flex flex-col ${
              tier.highlight
                ? 'bg-signal/[0.04] border border-signal/30'
                : 'bg-void border border-cream/[0.06]'
            }`}
          >
            {tier.highlight && (
              <div className="absolute top-0 left-0 right-0 h-px bg-signal" />
            )}

            <div className="flex items-center gap-2 mb-4">
              <DollarSign className="w-4 h-4 text-signal" />
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-cream/45">
                {tier.cadence}
              </span>
            </div>

            <h3 className="font-display text-body-lg text-cream mb-2">{tier.name}</h3>
            <p className="font-display text-display-md text-signal mb-4">{tier.price}</p>
            <p className="text-body-sm text-cream/55 leading-relaxed mb-6">{tier.description}</p>

            <ul className="space-y-2 flex-1">
              {tier.features.map((feature, j) => (
                <li key={j} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-signal/60 mt-0.5 shrink-0" />
                  <span className="text-body-sm text-cream/65">{feature}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <p className="font-mono text-mono-xs text-cream/35 mt-8 text-center">
        // ALL PRICING IN USD // NO CLOUD SUBSCRIPTION FEES // YOU OWN THE HARDWARE
      </p>
    </section>
  );
}

// ─── 05. Team ─────────────────────────────────────────────────────────────────
function TeamSection({ data }: { data: ProposalData }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="team" className="px-4 sm:px-8 max-w-6xl mx-auto py-16 md:py-24 border-t border-cream/[0.06]">
      <SectionHeader number="05" label="THE ORCHESTRATORS" title="Who Builds This" />

      <div className="grid md:grid-cols-2 gap-px bg-cream/[0.06]">
        {data.team.map((member, i) => (
          <motion.div
            key={i}
            ref={i === 0 ? ref : undefined}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.12 }}
            className="bg-void p-8 md:p-10"
          >
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-4 h-4 text-signal" />
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-cream/45">
                {member.role}
              </span>
            </div>
            <h3 className="font-display text-body-lg text-cream mb-2">{member.name}</h3>
            <p className="font-mono text-mono-xs text-signal/70 mb-4">{member.credentials}</p>
            <p className="text-body-sm text-cream/60 leading-relaxed">{member.bio}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── Acceptance + Next Steps ──────────────────────────────────────────────────
function AcceptanceSection({ data }: { data: ProposalData }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="acceptance" className="px-4 sm:px-8 max-w-6xl mx-auto py-16 md:py-24 border-t border-cream/[0.06]">
      <SectionHeader number="06" label="CLOSING" title="Acceptance & Next Steps" />

      <div className="grid md:grid-cols-2 gap-8 md:gap-16">
        {/* Acceptance criteria */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <CheckCircle2 className="w-5 h-5 text-signal" />
            <h3 className="font-mono text-[10px] tracking-[0.3em] uppercase text-signal">
              ACCEPTANCE CRITERIA
            </h3>
          </div>
          <ul className="space-y-3">
            {data.acceptanceCriteria.map((criterion, i) => (
              <li key={i} className="flex items-start gap-3 border-l-2 border-signal/30 pl-4 py-1">
                <span className="font-mono text-mono-xs text-signal/60 mt-1 shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-body-sm text-cream/70">{criterion}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Next steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <ArrowRight className="w-5 h-5 text-signal" />
            <h3 className="font-mono text-[10px] tracking-[0.3em] uppercase text-signal">
              NEXT STEPS
            </h3>
          </div>
          <ul className="space-y-3">
            {data.nextSteps.map((step, i) => (
              <li key={i} className="flex items-start gap-3 border-l-2 border-cream/20 pl-4 py-1">
                <span className="font-mono text-mono-xs text-cream/40 mt-1 shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-body-sm text-cream/70">{step}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Expiry notice */}
      <div className="mt-12 md:mt-16 border border-cream/[0.08] bg-layer-1 p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Clock className="w-4 h-4 text-cream/45" />
          <span className="font-mono text-mono-sm text-cream/55">
            This proposal expires on {data.expiryDate}
          </span>
        </div>
        <div className="font-mono text-mono-xs text-cream/35">
          PROP_ID: {data.proposalNumber}
        </div>
      </div>
    </section>
  );
}

// ─── Proposal header ──────────────────────────────────────────────────────────
function ProposalHeader({ data }: { data: ProposalData }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.header
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="px-4 sm:px-8 max-w-6xl mx-auto pt-24 md:pt-32 pb-16 md:pb-24"
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="w-1.5 h-5 bg-signal" />
        <span className="font-mono text-xs font-bold tracking-[0.22em] uppercase text-cream/80">
          Manteis.Systems
        </span>
        <span className="font-mono text-[10px] text-cream/35 ml-auto">
          {data.proposalNumber}
        </span>
      </div>

      <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-end">
        <div>
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-cream/45 mb-4">
            // PROPOSAL OF SOVEREIGNTY
          </p>
          <h1 className="font-display text-display-lg md:text-display-xl text-cream tracking-tight leading-none mb-4">
            {data.projectName}
          </h1>
          <p className="text-body-md text-cream/60">
            Prepared for <span className="text-cream">{data.clientName}</span>
          </p>
        </div>

        <div className="font-mono text-mono-sm space-y-2 md:text-right">
          <div className="flex justify-between md:justify-end md:gap-8">
            <span className="text-cream/35">CLIENT:</span>
            <span className="text-cream/70">{data.clientContact}</span>
          </div>
          <div className="flex justify-between md:justify-end md:gap-8">
            <span className="text-cream/35">DATE:</span>
            <span className="text-cream/70">{data.date}</span>
          </div>
          <div className="flex justify-between md:justify-end md:gap-8">
            <span className="text-cream/35">EXPIRES:</span>
            <span className="text-cream/70">{data.expiryDate}</span>
          </div>
        </div>
      </div>
    </motion.header>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function ProposalFooter({ data }: { data: ProposalData }) {
  return (
    <footer className="px-4 sm:px-8 max-w-6xl mx-auto py-16 md:py-24 border-t border-cream/[0.06]">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1.5 h-5 bg-signal" />
            <span className="font-mono text-xs font-bold tracking-[0.22em] uppercase text-cream/80">
              Manteis.Systems
            </span>
          </div>
          <p className="font-mono text-mono-xs text-cream/35 max-w-md">
            Subvert. Create. Sovereignty. — Intelligence infrastructure that gives you your time back.
          </p>
        </div>
        <div className="font-mono text-mono-xs text-cream/35 space-y-1 md:text-right">
          <div>initiate@manteis.com</div>
          <div>manTEIS SYSTEMS // 2026</div>
          <div>PROP_ID: {data.proposalNumber}</div>
        </div>
      </div>
    </footer>
  );
}

// ─── Main template ───────────────────────────────────────────────────────────
export function ProposalTemplate({ data }: { data: ProposalData }) {
  return (
    <main id="main-content" className="min-h-screen bg-void text-cream relative">
      {/* Ambient orbs */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div
          className="absolute rounded-full"
          style={{
            width: 600, height: 600,
            top: '-150px', left: '-100px',
            background: 'radial-gradient(circle, rgba(0,87,255,0.06) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 500, height: 500,
            bottom: '10%', right: '-100px',
            background: 'radial-gradient(circle, rgba(0,212,168,0.04) 0%, transparent 70%)',
            filter: 'blur(50px)',
          }}
        />
      </div>

      <div className="relative z-10">
        <ProposalHeader data={data} />
        <BootLog />
        <ProblemSection data={data} />
        <SolutionSection data={data} />
        <TimelineSection data={data} />
        <PricingSection data={data} />
        <TeamSection data={data} />
        <AcceptanceSection data={data} />
        <ProposalFooter data={data} />
      </div>
    </main>
  );
}