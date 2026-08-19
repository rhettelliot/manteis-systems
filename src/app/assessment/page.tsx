import type { Metadata } from "next";
import { AssessmentForm } from "./AssessmentForm";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.manteis.systems"),
  title: "Sovereign AI Assessment — Free Readiness Audit | Manteis Systems",
  description:
    "Get a free Sovereign AI readiness assessment. In 5 minutes, learn where your organization stands on local AI infrastructure, data sovereignty, and automation maturity.",
  keywords: [
    "AI readiness assessment",
    "AI infrastructure audit",
    "sovereign AI assessment",
    "local AI readiness",
    "AI maturity assessment",
    "free AI audit",
  ],
  openGraph: {
    title: "Sovereign AI Assessment — Free Readiness Audit",
    description:
      "5 minutes. 12 questions. A customized readiness report for your organization.",
    url: "https://www.manteis.systems/assessment",
    siteName: "Manteis Systems",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sovereign AI Assessment — Free Readiness Audit",
    description:
      "5 minutes. 12 questions. A customized readiness report for your organization.",
  },
};

export default function Page() {
  return <AssessmentForm />;
}