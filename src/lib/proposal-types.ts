// ─── Manteis Systems: Proposal Data Schema ─────────────────────────────────
// Typed intake structure for auto-generating client proposals.
// Feeds the ProposalTemplate component — fill this, get a proposal.

export interface ProposalProblem {
  title: string;
  description: string;
  painPoints: string[];
  currentCost: string;        // e.g. "15 hrs/week manual coordination"
  dataLeakageRisk: string;    // e.g. "100% PII on Google Cloud"
}

export interface ProposalSolution {
  title: string;
  description: string;
  components: {
    name: string;
    description: string;
    icon: string;              // lucide icon name
  }[];
  sovereigntyGuarantees: string[];
}

export interface TimelinePhase {
  phase: string;
  name: string;
  duration: string;            // e.g. "Week 1-2"
  deliverables: string[];
  status: 'pending' | 'active' | 'complete';
}

export interface PricingTier {
  name: string;
  price: string;
  cadence: string;             // "one-time" | "monthly" | "annual"
  description: string;
  features: string[];
  highlight?: boolean;
}

export interface TeamMember {
  name: string;
  role: string;
  credentials: string;
  bio: string;
}

export interface ProposalData {
  slug: string;
  clientName: string;
  clientContact: string;
  projectName: string;
  date: string;
  expiryDate: string;
  proposalNumber: string;      // e.g. "MS-2026-001"
  problem: ProposalProblem;
  solution: ProposalSolution;
  timeline: TimelinePhase[];
  pricing: PricingTier[];
  team: TeamMember[];
  acceptanceCriteria: string[];
  nextSteps: string[];
}