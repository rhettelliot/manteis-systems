import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["200", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://manteis.systems"),
  title: "Manteis Systems — AI Consultant in Seattle | Local AI Infrastructure & Cybersecurity",
  description: "Private local AI infrastructure, agent automation, and zero-trust security consulting. 25+ years of enterprise IT deployed as Sovereign Nodes for Pacific Northwest businesses.",
  keywords: ["AI consultant Seattle", "AI infrastructure", "local AI", "fractional CTO", "cybersecurity Seattle", "AI automation", "private AI", "Sovereign Node"],
  openGraph: {
    title: "Manteis Systems — AI Consultant in Seattle",
    description: "Private local AI infrastructure, agent automation, and zero-trust security consulting.",
    url: "https://manteis.systems",
    siteName: "Manteis Systems",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Manteis Systems",
  url: "https://manteis.systems",
  email: "rhett@manteissystems.com",
  description: "AI infrastructure consulting and cybersecurity for Pacific Northwest businesses.",
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
  areaServed: "Pacific Northwest",
  knowsAbout: ["AI Infrastructure", "Local AI", "Zero Trust Network Access", "Agent Automation", "Cybersecurity"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {/* Calendly widget script */}
        <script src="https://assets.calendly.com/assets/external/widget.js" async />
      </head>
      <body>
        <div className="grain" />
        {children}
      </body>
    </html>
  );
}