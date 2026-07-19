import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://manteis.systems"),
  title: "Manteis Systems — Sovereign Intelligence Infrastructure",
  description: "Private local AI infrastructure, spatial-audio music production, and breathwork sovereignty. Dephasing the corporate machine since 1998. Pacific Northwest.",
  authors: [{ name: "Rhett Elliot Johnson" }],
  keywords: [
    "local AI infrastructure", "on-prem LLM", "sovereign AI", "private LLM",
    "AI OS Federation", "agent orchestration", "human-gated AI",
    "AI agent automation", "Sovereign Node", "local inference",
    "data sovereignty", "zero trust", "cybersecurity", "Manteis Systems",
    "Rhett Johnson", "spatial audio", "synthwave label", "breathwork",
    "Pacific Northwest tech", "fractional CTO", "AI consultancy",
  ],
  robots: "index, follow",
  openGraph: {
    title: "Manteis Systems — Sovereign Intelligence Infrastructure",
    description: "Private local AI. Sovereign audio. Embodied intelligence. Subvert. Create. Sovereignty.",
    siteName: "Manteis.Systems",
    locale: "en_US",
    type: "website",
    images: [{ url: "/og.jpg", width: 1200, height: 675, alt: "Manteis Systems — Sovereign Intelligence Infrastructure" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Manteis Systems — Sovereign Intelligence Infrastructure",
    description: "Private local AI. Sovereign audio. Embodied intelligence. Subvert. Create. Sovereignty.",
    images: ["/og.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Manteis Systems",
  url: "https://manteis.systems",
  email: "rhett@manteissystems.com",
  description:
    "Sovereign AI infrastructure consultancy. Private local AI inference, AI OS Federation for enterprise departments, zero trust security, and systems engineering. Pacific Northwest.",
  areaServed: { "@type": "Place", name: "Pacific Northwest, United States" },
  foundingDate: "1998",
  founder: {
    "@type": "Person",
    name: "Rhett Elliot Johnson",
    jobTitle: "Principal Systems Architect",
  },
  knowsAbout: [
    "Sovereign AI infrastructure",
    "Local LLM inference",
    "AI OS Federation",
    "Agent orchestration",
    "Model Context Protocol",
    "Zero Trust security",
    "Systems engineering",
  ],
  makesOffer: [
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Autonomous AI Consultancy",
        description:
          "Sovereign Node provisioning, local LLM pipelines, agent orchestration, vector memory, and MCP development on private hardware.",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "The Fortress — Security & Compliance",
        description:
          "White-hat security audits, Zero Trust implementations, ZTNA rollout, endpoint hardening, MDM governance, and SOC 2 / HIPAA / PCI compliance.",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Systems Engineering",
        description:
          "Infrastructure automation, container orchestration, workflow pipelines, and MDM fleet management across Intune, Jamf Pro, M365, Active Directory, and Hyper-V.",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-void-base text-white antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Progressive enhancement: without JS, Motion's initial styles would
            leave scroll-revealed sections at opacity 0. Force everything visible. */}
        <noscript>
          <style>{`main *{opacity:1 !important;transform:none !important;filter:none !important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}