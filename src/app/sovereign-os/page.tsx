import type { Metadata } from "next";
import { SovereignOSPage } from "./SovereignOSLanding";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.manteis.systems"),
  title: "Sovereign OS — Local-First AI Operating System | Manteis Systems",
  description:
    "Sovereign OS is a local-first AI operating system. One command deploys inference, vector search, workflow automation, fleet management, and security SIEM on hardware you own. No cloud, no API tokens, no data egress.",
  keywords: [
    "local AI operating system",
    "sovereign AI",
    "on-premise AI",
    "private AI infrastructure",
    "Ollama deployment",
    "n8n automation",
    "AI OS",
    "self-hosted AI",
    "zero cloud AI",
  ],
  openGraph: {
    title: "Sovereign OS — Local-First AI Operating System",
    description:
      "One command. Zero cloud. AI infrastructure that stays on your hardware.",
    url: "https://www.manteis.systems/sovereign-os",
    siteName: "Manteis Systems",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sovereign OS — Local-First AI Operating System",
    description:
      "One command. Zero cloud. AI infrastructure that stays on your hardware.",
  },
};

export default function Page() {
  return <SovereignOSPage />;
}