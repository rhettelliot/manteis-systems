import type { Metadata } from "next";
import { SovereignNodePage } from "./SovereignNodePage";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.manteis.systems"),
  title: "Sovereign Node — Local AI Appliance | Manteis Systems",
  description:
    "Sovereign Node is your private AI appliance: local LLMs, agent orchestration, vector memory, and zero-trust access. Your AI, your hardware, zero egress.",
  keywords: [
    "Sovereign Node",
    "local AI appliance",
    "private LLM",
    "agent orchestration",
    "vector memory",
    "zero egress AI",
    "Tailscale AI",
  ],
  openGraph: {
    title: "Sovereign Node — Local AI Appliance",
    description: "Your AI. Your hardware. Zero egress. Deploy private intelligence on hardware you control.",
    url: "https://www.manteis.systems/sovereign-node",
    siteName: "Manteis Systems",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sovereign Node — Local AI Appliance",
    description: "Your AI. Your hardware. Zero egress. Deploy private intelligence on hardware you control.",
  },
};

export default function Page() {
  return <SovereignNodePage />;
}
