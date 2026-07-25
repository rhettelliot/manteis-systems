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
  title: "Manteis Systems — AI Consultant in Seattle | Local AI Infrastructure & Cybersecurity",
  description: "Seattle AI consultant specializing in private local AI infrastructure, agent automation, and zero-trust cybersecurity. 25+ years enterprise IT. Serving businesses across the Pacific Northwest. Book a free discovery call.",
  authors: [{ name: "Rhett Elliot Johnson" }],
  keywords: [
    "AI consultant Seattle",
    "AI infrastructure consultant",
    "local AI consultant",
    "AI automation consultant",
    "AI consultant Pacific Northwest",
    "fractional CTO Seattle",
    "private AI infrastructure",
    "local LLM deployment",
    "AI agent automation",
    "AI systems consulting",
    "enterprise AI consulting",
    "cybersecurity consultant Seattle",
    "zero trust security",
    "AI infrastructure Seattle",
    "business AI consultant",
    "AI strategy consulting",
    "Manteis Systems",
    "Rhett Johnson",
  ],
  robots: "index, follow",
  openGraph: {
    title: "Manteis Systems — AI Consultant in Seattle | Private AI Infrastructure",
    description: "Private local AI infrastructure, agent automation, and cybersecurity consulting. 25+ years enterprise IT. Serving Seattle and the Pacific Northwest.",
    siteName: "Manteis.Systems",
    locale: "en_US",
    type: "website",
    images: [{ url: "/og.jpg", width: 1200, height: 675, alt: "Manteis Systems — AI Consultant in Seattle" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Manteis Systems — AI Consultant in Seattle",
    description: "Private local AI infrastructure, agent automation, and cybersecurity consulting. 25+ years enterprise IT. Serving Seattle and the Pacific Northwest.",
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
    "AI consultant in Seattle specializing in private local AI infrastructure, AI agent automation, zero-trust cybersecurity, and systems engineering. 25+ years enterprise IT serving Pacific Northwest businesses.",
  areaServed: { "@type": "Place", name: "Seattle, Washington and Pacific Northwest, United States" },
  foundingDate: "1998",
  founder: {
    "@type": "Person",
    name: "Rhett Elliot Johnson",
    jobTitle: "Principal Systems Architect & AI Consultant",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Seattle",
    addressRegion: "WA",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 47.6062,
    longitude: -122.3321,
  },
  knowsAbout: [
    "AI consulting",
    "AI infrastructure",
    "Local LLM deployment",
    "AI agent automation",
    "AI OS Federation",
    "Agent orchestration",
    "Model Context Protocol",
    "Zero Trust security",
    "Cybersecurity consulting",
    "Systems engineering",
    "Fractional CTO services",
    "Enterprise IT consulting",
  ],
  makesOffer: [
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "AI Infrastructure Consulting",
        description:
          "Sovereign Node provisioning, local LLM pipelines, agent orchestration, vector memory, and MCP development on private hardware. $350/hr consultation, $2k/mo managed.",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Security & Compliance Audits",
        description:
          "White-hat security audits, Zero Trust implementations, ZTNA rollout, endpoint hardening, MDM governance, and SOC 2 / HIPAA / PCI compliance. $350/hr, fixed-project from $10k.",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Automation & Fleet Management",
        description:
          "Infrastructure automation, container orchestration, workflow pipelines, and MDM fleet management across Intune, Jamf Pro, M365, Active Directory, and Hyper-V. $350/hr, fixed-project from $10k.",
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
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-void-base text-cream antialiased" suppressHydrationWarning>
        {/* Anti-FUOC theme init — must run before React hydrates. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme')||'dark';document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','dark');}})()`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Progressive enhancement: without JS, Motion's initial styles would
            leave scroll-revealed sections at opacity 0. Force everything visible. */}
        <noscript>
          <style>{`main *{opacity:1 !important;transform:none !important;filter:none !important}`}</style>
        </noscript>
        {/* JS safety net: if Motion's useInView hasn't fired after 4s,
            force all hidden elements visible. This catches cases where
            IntersectionObserver doesn't trigger (long pages, SSR hydration
            issues, element never scrolled into view). */}
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            setTimeout(function() {
              var els = document.querySelectorAll('main [style*="opacity: 0"], main [style*="opacity:0"]');
              els.forEach(function(el) {
                el.style.opacity = '1';
                el.style.transform = 'none';
              });
            }, 4000);
          })();
        `}} />
        {children}
      </body>
    </html>
  );
}
