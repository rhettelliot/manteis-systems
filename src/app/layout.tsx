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
  metadataBase: new URL("https://www.manteis.systems"),
  title: "Manteis Systems",
  description: "AI consultant in Seattle — local AI infrastructure",
  keywords: ["AI consultant Seattle", "AI infrastructure", "local AI", "fractional CTO", "cybersecurity Seattle", "AI automation", "private AI", "Sovereign Node"],
  robots: "index, follow",
  openGraph: {
    title: "Manteis Systems",
    description: "AI consultant in Seattle — local AI infrastructure",
    url: "https://www.manteis.systems",
    siteName: "Manteis Systems",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Manteis Systems",
    description: "AI consultant in Seattle — local AI infrastructure",
  },
  icons: {
    icon: { url: "/favicon.svg", type: "image/svg+xml" },
    shortcut: { url: "/favicon.svg", type: "image/svg+xml" },
    apple: { url: "/favicon.svg", type: "image/svg+xml" },
  },
  manifest: "/manifest.json",
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
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {/* Calendly widget script */}
        <script src="https://assets.calendly.com/assets/external/widget.js" async />
        {/* Google Analytics — GA4 */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              async
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}
      </head>
      <body>
        <div className="grain" />
        {children}
      </body>
    </html>
  );
}