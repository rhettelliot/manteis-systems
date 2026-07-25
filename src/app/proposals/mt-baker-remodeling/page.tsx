'use client';

import { ProposalTemplate } from '@/components/proposals/ProposalTemplate';
import { mtBakerProposal } from '@/lib/sample-proposal';

export default function ProposalPage() {
  return <ProposalTemplate data={mtBakerProposal} />;
}