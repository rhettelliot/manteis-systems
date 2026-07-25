'use client';

import Link from 'next/link';
import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { FileText, ArrowRight } from 'lucide-react';
import { mtBakerProposal } from '@/lib/sample-proposal';
import type { ProposalData } from '@/lib/proposal-types';

const ALL_PROPOSALS: ProposalData[] = [
  mtBakerProposal,
];

export default function ProposalsIndexPage() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

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
      </div>

      <div className="relative z-10 px-4 sm:px-8 max-w-6xl mx-auto pt-24 md:pt-32 pb-16 md:pb-24">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1.5 h-5 bg-signal" />
            <span className="font-mono text-xs font-bold tracking-[0.22em] uppercase text-cream/80">
              Manteis.Systems
            </span>
          </div>

          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-cream/45 mb-4">
            // PROPOSALS OF SOVEREIGNTY
          </p>
          <h1 className="font-display text-display-lg md:text-display-xl text-cream tracking-tight leading-none mb-4">
            Active Proposals
          </h1>
          <p className="text-body-md text-cream/60 max-w-2xl">
            Sovereignty engagement proposals for Manteis Systems clients. Each proposal defines the architecture, timeline, and investment for a local-first intelligence deployment.
          </p>
        </motion.div>

        {/* Proposal list */}
        <div className="mt-12 md:mt-16 space-y-px bg-cream/[0.06]">
          {ALL_PROPOSALS.map((proposal, i) => (
            <motion.div
              key={proposal.slug}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
            >
              <Link
                href={`/proposals/${proposal.slug}`}
                className="block bg-void p-6 md:p-8 hover:bg-layer-1 transition-colors duration-300 group"
              >
                <div className="flex items-start justify-between gap-6">
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    <div className="w-10 h-10 flex items-center justify-center bg-signal/10 border border-signal/20 shrink-0">
                      <FileText className="w-5 h-5 text-signal" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-cream/45">
                          {proposal.proposalNumber}
                        </span>
                        <span className="font-mono text-[10px] text-cream/30">·</span>
                        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-cream/45">
                          {proposal.date}
                        </span>
                      </div>
                      <h2 className="font-display text-body-lg text-cream group-hover:text-signal transition-colors duration-200 truncate">
                        {proposal.projectName}
                      </h2>
                      <p className="text-body-sm text-cream/55 mt-1">
                        {proposal.clientName} — {proposal.clientContact}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-cream/30 group-hover:text-signal group-hover:translate-x-1 transition-all duration-200 shrink-0 mt-2" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-cream/[0.06]">
          <Link
            href="/"
            className="font-mono text-[10px] tracking-[0.2em] uppercase text-cream/45 hover:text-signal transition-colors duration-200"
          >
            ← Back to Manteis.Systems
          </Link>
        </div>
      </div>
    </main>
  );
}