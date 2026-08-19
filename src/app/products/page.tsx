"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Menu, X, ArrowRight, Check, Download } from "lucide-react";
import Link from "next/link";

// ─── PRODUCT DATA ─────────────────────────────────────────────────────────
// Stripe Payment Links — env-driven so Rhett can update without redeploying.
// Set in .env.local as NEXT_PUBLIC_STRIPE_LINK_STARTER_KIT etc.
// If env var is missing, button shows "COMING SOON".
const STRIPE_LINKS: Record<string, string> = {
  starterKit: process.env.NEXT_PUBLIC_STRIPE_LINK_STARTER_KIT || "",
  btnc: process.env.NEXT_PUBLIC_STRIPE_LINK_BTNC || "",
  kybalion: process.env.NEXT_PUBLIC_STRIPE_LINK_KYBALION || "",
  sewa: process.env.NEXT_PUBLIC_STRIPE_LINK_SEWA || "",
  bundle: process.env.NEXT_PUBLIC_STRIPE_LINK_BUNDLE || "",
};

interface Product {
  id: string;
  name: string;
  tagline: string;
  price: number;
  format: string;
  stripeKey: keyof typeof STRIPE_LINKS;
  features: string[];
  description: string;
  featured?: boolean;
  accent: string;
}

const products: Product[] = [
  {
    id: "starter-kit",
    name: "Sovereign AI Starter Kit",
    tagline: "The Local-First Intelligence Blueprint",
    price: 97,
    format: "EPUB · PDF · Markdown",
    stripeKey: "starterKit",
    accent: "#FF5500",
    description:
      "Complete reference architecture for deploying production-grade AI entirely on-premises. Docker-compose stack, security audit framework, MCP integration guide, 5 production n8n workflows, cost modeling worksheet, and model selection guide.",
    features: [
      "4-layer architecture (Compute · Storage · Orchestration · Integration)",
      "Production-ready Docker-compose stack — one command to deploy",
      "Security audit framework (The Fortress methodology)",
      "MCP integration guide for M365 environments",
      "5 production n8n workflows included",
      "Cost modeling for 10/60/200-person firms",
      "Model selection guide with hardware requirements",
      "No DRM — EPUB, PDF, and Markdown source",
    ],
    featured: true,
  },
  {
    id: "btnc",
    name: "Bio-Tactical Neural Countermeasures",
    tagline: "A Manual for 2026 Urban Resilience",
    price: 47,
    format: "EPUB",
    stripeKey: "btnc",
    accent: "#007AFF",
    description:
      "Your nervous system is occupied territory. 12 chapters and 5 operational phases that reframe breathwork as biological warfare. Tactical terminology, mechanical explanations, zero spiritual prerequisites.",
    features: [
      "12-chapter tactical manual",
      "5 operational phases (Threat → Architecture → Arsenal → Ops → Mastery)",
      "The One-Minute Firewall protocol",
      "The 40-day rewiring rule",
      "Appendix: Source Code terminology map",
      "No DRM — works on all ereaders",
    ],
  },
  {
    id: "kybalion",
    name: "Kybalion Tactical",
    tagline: "Ontological Engineering & Reality Rendering",
    price: 57,
    format: "EPUB · HTML",
    stripeKey: "kybalion",
    accent: "#FFE566",
    description:
      "Seven Hermetic Distinctions as operational specifications for the Sovereign Operator. Not philosophy — engineering. 7 distinctions, 21 field diagnostics, zero spiritual prerequisites.",
    features: [
      "7 Hermetic principles recoded as engineering specs",
      "21 field diagnostics — operational exercises",
      "The Rendering Layer, Fractal Architecture, Frequency Dynamics",
      "Spectrum Operations, Periodic Vector Control",
      "Causal Chain Analysis, Generative Complementarity",
      "No DRM — EPUB + HTML web preview",
    ],
  },
  {
    id: "sewa",
    name: "Sewa: Kundalini Teachings",
    tagline: "Three Parallel Versions",
    price: 35,
    format: "EPUB",
    stripeKey: "sewa",
    accent: "#00D455",
    description:
      "Selfless service as a deployment protocol for the sovereign nervous system. Three complete translations — Traditional, Contemporary, and Tactical — from a certified Kundalini yoga instructor.",
    features: [
      "Three complete versions in one package",
      "Traditional — authentic Sikh teachings in cultural context",
      "Contemporary — plain language, no cultural prerequisites",
      "Tactical — chakras as signal infrastructure, kriyas as protocols",
      "The 6 Securities framework",
      "No DRM — works on all ereaders",
    ],
  },
];

const bundle = {
  name: "The Complete Operator Library",
  price: 188,
  regularPrice: 236,
  description:
    "All four products. The Sovereign AI Starter Kit, Bio-Tactical Neural Countermeasures, Kybalion Tactical, and Sewa. Everything Manteis publishes, one purchase, permanently yours.",
  stripeKey: "bundle" as keyof typeof STRIPE_LINKS,
};

// ─── NAV ─────────────────────────────────────────────────────────────────
function Nav() {
  const [open, setOpen] = useState(false);
  const links = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
  ];
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-between px-6 md:px-10 bg-[--color-canvas]/90 border-b border-[--color-border] backdrop-blur-sm">
      <Link href="/" className="flex items-center gap-3">
        <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-[--color-ink]">
          Manteis
        </span>
        <span className="w-1 h-1 rounded-full bg-[--color-signal]" />
        <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-[--color-ink-3]">
          Systems
        </span>
      </Link>
      <div className="hidden md:flex items-center gap-8">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="font-body text-[14px] font-medium text-[--color-ink-2] hover:text-[--color-signal] transition-colors"
          >
            {l.label}
          </Link>
        ))}
      </div>
      <button
        className="md:hidden text-[--color-ink]"
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close menu" : "Open menu"}
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>
      {open && (
        <div className="absolute top-14 left-0 right-0 bg-[--color-canvas] border-b border-[--color-border] flex flex-col py-4 md:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="px-6 py-3 font-body text-[15px] font-medium text-[--color-ink-2] hover:text-[--color-signal] transition-colors"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

// ─── PRODUCT CARD ────────────────────────────────────────────────────────
function ProductCard({ product }: { product: Product }) {
  const fadeUp = {
    initial: { opacity: 1, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  };

  const stripeLink = STRIPE_LINKS[product.stripeKey];

  return (
    <motion.div
      {...fadeUp}
      className={`relative flex flex-col p-7 md:p-8 border transition-all duration-300 hover:border-[--color-border-hi] ${
        product.featured
          ? "border-[rgba(255,85,0,0.25)] bg-[--color-surface]"
          : "border-[--color-border] bg-[--color-surface]/60"
      }`}
    >
      {product.featured && (
        <div className="absolute -top-px -left-px -right-px h-[2px] bg-gradient-to-r from-transparent via-[--color-signal] to-transparent" />
      )}

      {/* Header */}
      <div className="mb-5">
        <div className="flex items-center gap-2 mb-3">
          <span
            className="w-2 h-2 rounded-full"
            style={{ background: product.accent }}
          />
          <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-[--color-ink-3]">
            {product.format}
          </span>
        </div>
        <h3 className="text-[20px] md:text-[22px] font-semibold text-[--color-ink] leading-tight tracking-[-0.02em] mb-1">
          {product.name}
        </h3>
        <p className="text-[14px] text-[--color-ink-3] font-medium tracking-wide">
          {product.tagline}
        </p>
      </div>

      {/* Description */}
      <p className="text-[14px] leading-[1.65] text-[--color-ink-2] mb-5">
        {product.description}
      </p>

      {/* Features */}
      <ul className="space-y-2 mb-7 flex-1">
        {product.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-[13px] text-[--color-ink-2] leading-[1.5]">
            <Check size={14} className="mt-[3px] shrink-0 text-[--color-signal]" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      {/* Price + CTA */}
      <div className="flex items-center justify-between pt-5 border-t border-[--color-border]">
        <div>
          <span className="text-[28px] font-bold text-[--color-ink] tracking-[-0.03em]">
            ${product.price}
          </span>
          <span className="text-[12px] text-[--color-ink-3] ml-2 font-mono">one-time</span>
        </div>
        {stripeLink ? (
          <a
            href={stripeLink}
            className="inline-flex items-center gap-2 font-mono text-[12px] font-semibold tracking-wide uppercase px-5 py-2.5 bg-[--color-signal] text-[--color-canvas] hover:bg-[--color-solar-amber] transition-colors"
          >
            Buy <ArrowRight size={14} />
          </a>
        ) : (
          <span className="font-mono text-[11px] tracking-wide text-[--color-ink-3] px-4 py-2.5 border border-[--color-border]">
            COMING SOON
          </span>
        )}
      </div>
    </motion.div>
  );
}

// ─── PAGE ────────────────────────────────────────────────────────────────
export default function ProductsPage() {
  const fadeUp = {
    initial: { opacity: 1, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  };

  const bundleLink = STRIPE_LINKS[bundle.stripeKey];

  return (
    <>
      <Nav />

      {/* HERO */}
      <section className="relative min-h-[50vh] pt-14 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[15%] right-[10%] w-[400px] h-[400px] rounded-full bg-[rgba(255,85,0,0.04)] blur-[100px]" />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 md:px-10 pt-20 pb-12">
          <motion.div {...fadeUp}>
            <div className="flex items-center gap-2 mb-5">
              <span className="w-2 h-2 rounded-full bg-[--color-signal]" />
              <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-[--color-ink-3]">
                Digital Products · No Subscription · No DRM
              </span>
            </div>
            <h1 className="text-[40px] md:text-[56px] font-semibold text-[--color-ink] leading-[1.05] tracking-[-0.035em] mb-5">
              Own your intelligence.
              <br />
              <span className="text-[--color-signal]">Not a license to rent it.</span>
            </h1>
            <p className="text-[16px] md:text-[18px] leading-[1.6] text-[--color-ink-2] max-w-2xl">
              Four products. Four domains — AI infrastructure, neural resilience, ontological engineering, and contemplative practice. Each one is a complete system you own forever. No subscriptions, no DRM, no cloud dependency.
            </p>
          </motion.div>
        </div>
      </section>

      {/* PRODUCT GRID */}
      <section className="relative border-t border-[--color-border]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* BUNDLE */}
      <section className="relative border-t border-[--color-border]">
        <div className="max-w-4xl mx-auto px-6 md:px-10 py-16">
          <motion.div
            {...fadeUp}
            className="relative p-8 md:p-12 border border-[rgba(255,85,0,0.20)] bg-[--color-surface] text-center"
          >
            <div className="absolute -top-px -left-px -right-px h-[2px] bg-gradient-to-r from-transparent via-[--color-signal] to-transparent" />

            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-[--color-signal]">
                Complete Bundle · Save 20%
              </span>
            </div>

            <h2 className="text-[28px] md:text-[32px] font-semibold text-[--color-ink] tracking-[-0.03em] mb-3">
              The Complete Operator Library
            </h2>
            <p className="text-[15px] leading-[1.6] text-[--color-ink-2] max-w-xl mx-auto mb-6">
              {bundle.description}
            </p>

            <div className="flex items-center justify-center gap-4 mb-7">
              <span className="text-[16px] text-[--color-ink-3] line-through font-mono">
                ${bundle.regularPrice}
              </span>
              <span className="text-[40px] font-bold text-[--color-ink] tracking-[-0.03em]">
                ${bundle.price}
              </span>
            </div>

            {bundleLink ? (
              <a
                href={bundleLink}
                className="inline-flex items-center gap-2 font-mono text-[13px] font-semibold tracking-wide uppercase px-7 py-3.5 bg-[--color-signal] text-[--color-canvas] hover:bg-[--color-solar-amber] transition-colors"
              >
                Buy Complete Bundle <ArrowRight size={15} />
              </a>
            ) : (
              <span className="inline-block font-mono text-[12px] tracking-wide text-[--color-ink-3] px-6 py-3 border border-[--color-border]">
                COMING SOON
              </span>
            )}
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative border-t border-[--color-border]">
        <div className="max-w-3xl mx-auto px-6 md:px-10 py-16">
          <motion.div {...fadeUp}>
            <h2 className="text-[24px] font-semibold text-[--color-ink] tracking-[-0.03em] mb-8">
              Questions
            </h2>
            <div className="space-y-6">
              {[
                {
                  q: "What format are the products in?",
                  a: "EPUB works on Apple Books, Kindle, Kobo, Google Play Books, and every modern ereader. The Starter Kit also includes PDF and Markdown source. No DRM — you own the files.",
                },
                {
                  q: "Is this a subscription?",
                  a: "No. Every product is a one-time purchase. You own the files permanently. No recurring charges, no account required, no cloud dependency.",
                },
                {
                  q: "How do I receive my purchase?",
                  a: "After checkout, you'll receive an email with download links instantly. Files are delivered electronically — no shipping.",
                },
                {
                  q: "Can I use the Starter Kit for my company?",
                  a: "Yes. The Starter Kit includes a Markdown source you can fork into your internal documentation. The architecture is designed for deployment in real business environments.",
                },
              ].map((item) => (
                <div key={item.q} className="border-b border-[--color-border] pb-5">
                  <h3 className="text-[16px] font-semibold text-[--color-ink] mb-2">
                    {item.q}
                  </h3>
                  <p className="text-[14px] leading-[1.6] text-[--color-ink-2]">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative border-t border-[--color-border]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-[--color-ink]">
              Manteis
            </span>
            <span className="w-1 h-1 rounded-full bg-[--color-signal]" />
            <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-[--color-ink-3]">
              Systems
            </span>
          </div>
          <Link
            href="/"
            className="font-mono text-[11px] tracking-wide text-[--color-ink-3] hover:text-[--color-signal] transition-colors"
          >
            ← Back to manteis.systems
          </Link>
        </div>
      </footer>
    </>
  );
}