import type { Metadata } from "next";
import { CaseStudiesPage } from "./CaseStudiesPage";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.manteis.systems"),
  title: "Case Studies — Sovereign AI Deployments | Manteis Systems",
  description:
    "Anonymized case studies of Sovereign Node deployments: legal services, music production, and healthcare. Local AI infrastructure with zero data egress.",
  keywords: [
    "sovereign AI case study",
    "local AI deployment",
    "private LLM legal",
    "HIPAA AI",
    "music production AI",
    "zero egress AI",
  ],
  openGraph: {
    title: "Case Studies — Sovereign AI Deployments",
    description: "Three industries. One architecture. Zero data leaving the building.",
    url: "https://www.manteis.systems/case-studies",
    siteName: "Manteis Systems",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Case Studies — Sovereign AI Deployments",
    description: "Three industries. One architecture. Zero data leaving the building.",
  },
};

export default function Page() {
  return <CaseStudiesPage />;
}
