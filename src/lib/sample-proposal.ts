// ─── Sample Proposal: Mt. Baker Remodeling ──────────────────────────────────
// Working example that exercises every field of the schema.

import type { ProposalData } from './proposal-types';

export const mtBakerProposal: ProposalData = {
  slug: 'mt-baker-remodeling',
  clientName: 'Mt. Baker Remodeling',
  clientContact: 'George — Lead Contractor',
  projectName: 'Sovereign Intelligence Base + Client Portal MVP',
  date: '2026-07-24',
  expiryDate: '2026-08-24',
  proposalNumber: 'MS-2026-001',

  problem: {
    title: 'Digital Drag in Home Remodeling',
    description:
      'Manual coordination of client communications, quoting, and project updates is consuming 15+ hours per week. All client data currently flows through consumer cloud services with zero sovereignty controls — every quote, email, and document is data-exfiltrated by default.',
    painPoints: [
      '15+ hrs/week lost to manual quote generation and follow-up',
      '100% of client PII on third-party cloud infrastructure',
      'No automated intake — every lead requires a phone call',
      'Project updates are reactive, not proactive — clients call you',
      'No audit trail for communications or decisions',
    ],
    currentCost: '15 hrs/week manual coordination',
    dataLeakageRisk: '100% PII on Google Cloud — zero sovereignty',
  },

  solution: {
    title: 'The Sovereignty Stack',
    description:
      'A dedicated local intelligence node running autonomous agents for communication, quoting, and project management. Zero PII leakage. Every byte stays on hardware you own. The client portal MVP gives homeowners a self-service interface while George retains full control.',
    components: [
      {
        name: 'Sovereign Node',
        description: 'Dedicated Mac Mini running Ollama for local LLM inference — no cloud dependency for sensitive data.',
        icon: 'Server',
      },
      {
        name: 'Autonomous Agent',
        description: 'Xen agent handles intake, follow-ups, quote drafting, and project updates — human-gated writes only.',
        icon: 'Bot',
      },
      {
        name: 'Client Portal MVP',
        description: 'Self-service web portal for homeowners to request quotes, track projects, and communicate — built in Antigravity.',
        icon: 'Monitor',
      },
      {
        name: 'Zero Trust Perimeter',
        description: 'Sophos ZTNA + Defender securing all access vectors. Every connection authenticated, every action logged.',
        icon: 'ShieldCheck',
      },
    ],
    sovereigntyGuarantees: [
      '0.00% data leakage — all PII processed locally',
      '8ms inference latency — no cloud round-trips',
      'Full audit trail — every agent action recorded',
      'Human-gated writes — nothing ships without approval',
    ],
  },

  timeline: [
    {
      phase: '01',
      name: 'Infrastructure Liftoff',
      duration: 'Week 1-2',
      deliverables: [
        'Sovereign Node provisioned and hardened',
        'Ollama inference engine online (Codellama / Gemma)',
        'GitHub organization initialized with agent context injection',
        'Zero Trust perimeter established',
      ],
      status: 'pending',
    },
    {
      phase: '02',
      name: 'Agent Orchestration',
      duration: 'Week 3-4',
      deliverables: [
        'Xen autonomous agent deployed with communication workflows',
        'Intake automation — leads captured without phone calls',
        'Quote drafting pipeline — agent generates, George approves',
        'Weekly Sovereignty Sync cadence established',
      ],
      status: 'pending',
    },
    {
      phase: '03',
      name: 'Client Portal MVP',
      duration: 'Week 5-8',
      deliverables: [
        'Portal built in Google Antigravity Build Mode',
        'Homeowner self-service: quote requests, project tracking',
        'Zero PII leakage architecture — data stays on-node',
        'Day One handover: live demo + credentials + ZTNA verification',
      ],
      status: 'pending',
    },
  ],

  pricing: [
    {
      name: 'Sovereign Node Setup',
      price: '$4,500',
      cadence: 'one-time',
      description: 'Hardware provisioning, agent deployment, security baseline. Mac Mini + Ollama + Xen agent + ZTNA.',
      features: [
        'Mac Mini M4 — 16GB RAM, 512GB SSD',
        'Ollama local inference engine configured',
        'Xen autonomous agent deployed and tuned',
        'Sophos ZTNA + Defender security baseline',
        'Day One handover + live demo',
      ],
      highlight: true,
    },
    {
      name: 'Managed Sovereignty',
      price: '$2,000',
      cadence: 'monthly',
      description: 'Ongoing agent management, security audits, and support. Your sovereignty is our custody.',
      features: [
        'Weekly 15-min Sovereignty Sync',
        'Monthly security audit + agent performance review',
        '24/7 agent monitoring + alerting',
        'Unlimited agent workflow adjustments',
        'Manteis Helpdesk Portal access',
      ],
    },
    {
      name: 'Client Portal Add-On',
      price: '$3,000',
      cadence: 'one-time',
      description: 'Self-service homeowner portal built in Antigravity. Quote requests, project tracking, zero PII leakage.',
      features: [
        'Custom-branded portal MVP',
        'Quote request + project tracking workflows',
        'Zero PII leakage architecture',
        'Source code delivered to your GitHub org',
      ],
    },
  ],

  team: [
    {
      name: 'Rhett Elliot Johnson',
      role: 'Principal Architect',
      credentials: '25+ years enterprise IT // Apple Certified Service Provider // Former IT Lead: F5 Networks, REI, Aon',
      bio: 'Founder of Manteis Systems. Builds the architecture that gives clients their time back. Specializes in bridging Apple, Microsoft, and cloud infrastructure into unified sovereignty systems.',
    },
    {
      name: 'Xen',
      role: 'Autonomous Agent // Shadow Co-Founder',
      credentials: 'Local LLM (Ollama) // MCP Fleet // Hermes Agent Framework',
      bio: 'The digital partner that never sleeps. Handles intake, drafting, monitoring, and escalation. Human-gated writes — nothing ships without George\'s approval.',
    },
  ],

  acceptanceCriteria: [
    'Sovereign Node operational with 0% cloud dependency for PII',
    'Xen agent deployed with human-gated write confirmation',
    'Client Portal MVP accessible to homeowners',
    'Zero Trust perimeter verified — all access vectors authenticated',
    'Case study documentation initiated (Before & After metrics)',
  ],

  nextSteps: [
    'Review this proposal (expires 2026-08-24)',
    'Schedule a 30-min Strategy Call to finalize scope',
    'Sign the Manteis Systems Engagement Agreement',
    'Provision hardware — Sovereign Node ships within 5 business days',
  ],
};