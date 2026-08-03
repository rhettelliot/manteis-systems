---
title: "Schema Markup Templates for Sovereign AI SEO Content"
meta_title: "Schema Markup Templates | SEO Structured Data | Manteis Systems"
meta_description: "Ready-to-use JSON-LD schema markup templates for Manteis Systems SEO content: Product, Service, FAQPage, Article, Organization, and BreadcrumbList schemas."
date: 2026-07-30
type: technical-template
target_keywords:
  - sovereign AI
  - Manteis Systems
  - Manteis Sovereign AI
  - SEO
  - schema markup
---

# Schema Markup Templates for Sovereign AI SEO Content

## Overview

These JSON-LD templates are ready to embed in the `<head>` of any Manteis Systems web page. They provide structured data that Google uses for rich results, product panels, FAQ accordions, and enhanced search visibility.

Each template targets the keywords most relevant to its content type. Replace placeholder values with the actual page content before deploying.

---

## 1. Organization Schema (manteis.systems homepage)

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Manteis Systems",
  "url": "https://manteis.systems",
  "logo": "https://manteis.systems/logo.png",
  "description": "Manteis Systems builds sovereign AI infrastructure — on-premise AI appliances, sovereign AI cloud, and edge AI solutions. Run enterprise-grade AI without cloud dependency.",
  "foundingDate": "2024",
  "founder": {
    "@type": "Person",
    "name": "Rhett Elliot"
  },
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "US"
  },
  "sameAs": [
    "https://github.com/rhettelliot",
    "https://www.linkedin.com/company/manteis-systems"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Sovereign AI Products",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Product",
          "name": "Manteis One",
          "description": "Desktop sovereign AI appliance for individuals and small teams. $5,000.",
          "category": "AI appliance"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Product",
          "name": "Manteis Core",
          "description": "Rack-mount sovereign AI appliance for departments. $25,000.",
          "category": "AI appliance"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Product",
          "name": "Manteis Fortress",
          "description": "Enterprise sovereign AI appliance with zero-trust security. $50,000.",
          "category": "AI appliance"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Product",
          "name": "Manteis Cloud",
          "description": "Sovereign AI as a service. Zero-trust hosted environment. From $200/month.",
          "category": "AI cloud service"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Product",
          "name": "Manteis Edge",
          "description": "$8 ESP32 microcontroller running LLMs offline. Edge AI on a chip.",
          "category": "edge AI device"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Product",
          "name": "Sovereign AI Starter Kit",
          "description": "Deployment blueprint for building sovereign AI on your own hardware. $97.",
          "category": "digital product"
        }
      }
    ]
  }
}
```

---

## 2. Product Schema (for each product page)

### Manteis Fortress Product Page

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Manteis Fortress",
  "description": "Enterprise sovereign AI appliance with quad GPU, zero-trust architecture, and compliance tooling for HIPAA, SOC 2, and CMMC environments. AI in a box for regulated industries.",
  "brand": {
    "@type": "Brand",
    "name": "Manteis Systems"
  },
  "category": "AI Appliance",
  "offers": {
    "@type": "Offer",
    "price": "50000",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
    "url": "https://manteis.systems/fortress",
    "seller": {
      "@type": "Organization",
      "name": "Manteis Systems"
    }
  },
  "additionalProperty": [
    {
      "@type": "PropertyValue",
      "name": "GPU Configuration",
      "value": "4× GPU (192GB VRAM)"
    },
    {
      "@type": "PropertyValue",
      "name": "System RAM",
      "value": "512GB ECC"
    },
    {
      "@type": "PropertyValue",
      "name": "Storage",
      "value": "16TB NVMe RAID"
    },
    {
      "@type": "PropertyValue",
      "name": "Form Factor",
      "value": "4U rack-mount"
    },
    {
      "@type": "PropertyValue",
      "name": "Security",
      "value": "Zero-trust, FIPS-compatible, audit logging"
    },
    {
      "@type": "PropertyValue",
      "name": "Compliance",
      "value": "HIPAA, SOC 2, PCI, CMMC alignment"
    },
    {
      "@type": "PropertyValue",
      "name": "Max Model Size",
      "value": "70B+ parameters (INT4)"
    },
    {
      "@type": "PropertyValue",
      "name": "Air-Gapped Operation",
      "value": "Yes — no wireless radios, offline model updates"
    }
  ],
  "keywords": "sovereign AI, AI appliance, AI in a box, on-premise AI, private AI infrastructure, zero-trust AI, compliance AI, HIPAA AI, self-hosted AI"
}
```

### Manteis Cloud Service Page

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Manteis Cloud",
  "description": "Sovereign AI as a service. Run enterprise LLMs in a zero-trust hosted environment without owning hardware. Solo, Team, Enterprise, and Fortress tiers. Migrate to on-premise anytime.",
  "provider": {
    "@type": "Organization",
    "name": "Manteis Systems"
  },
  "serviceType": "AI Cloud Service",
  "areaServed": "Global",
  "offers": [
    {
      "@type": "Offer",
      "name": "Solo",
      "price": "200",
      "priceCurrency": "USD",
      "description": "Single user. 8B models. For individuals."
    },
    {
      "@type": "Offer",
      "name": "Team",
      "price": "2000",
      "priceCurrency": "USD",
      "description": "Up to 25 users. 70B models. For small teams."
    },
    {
      "@type": "Offer",
      "name": "Enterprise",
      "price": "8000",
      "priceCurrency": "USD",
      "description": "Up to 100 users. 70B+ models. Multi-model serving."
    },
    {
      "@type": "Offer",
      "name": "Fortress",
      "price": "15000",
      "priceCurrency": "USD",
      "description": "Unlimited users. Dedicated hardware. Zero-trust architecture. Compliance tooling."
    }
  ],
  "keywords": "sovereign AI, AI without cloud, private AI, self-hosted AI, Ollama deployment, n8n automation, zero-trust AI, private AI infrastructure"
}
```

---

## 3. FAQPage Schema (for FAQ pages)

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is sovereign AI?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sovereign AI is AI infrastructure that runs entirely on hardware you own and control. Unlike cloud AI (OpenAI, Anthropic, Google), sovereign AI keeps your data on your premises, eliminates per-token API costs, and gives you complete control over model versions and updates. Manteis Systems builds sovereign AI appliances (Manteis One, Core, Fortress), sovereign AI cloud (Manteis Cloud), and edge AI devices (Manteis Edge) that enable organizations to run enterprise-grade AI without cloud dependency."
      }
    },
    {
      "@type": "Question",
      "name": "How much does sovereign AI cost compared to cloud AI?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A 50-person team using cloud AI typically spends $144,000/year on API costs. The equivalent Manteis Fortress appliance costs $50,000 one-time plus $8,000/year in power and maintenance — a 3-year total of $74,000 vs $432,000 for cloud. That's an 83% cost reduction. The break-even point is typically 8–14 months, after which every additional AI interaction is effectively free."
      }
    },
    {
      "@type": "Question",
      "name": "Can sovereign AI run without internet?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Manteis Fortress is designed for air-gapped operation with no wireless radios, offline model updates via USB, and zero telemetry. It runs indefinitely with zero network connectivity. This makes it suitable for classified government environments, manufacturing facilities with IT/OT segregation, and any environment where internet access is restricted or prohibited."
      }
    },
    {
      "@type": "Question",
      "name": "Is sovereign AI HIPAA compliant?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Manteis Fortress supports HIPAA compliance by eliminating the third-party data processor. PHI never leaves your network, no Business Associate Agreement is needed, and all AI interactions are logged in a local, tamper-evident audit trail. The appliance uses full-disk encryption, role-based access control, and encrypted communications. Final HIPAA compliance requires organizational policies and procedures alongside the technical controls."
      }
    },
    {
      "@type": "Question",
      "name": "What models can I run on a Manteis appliance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Manteis appliances run any model compatible with Ollama, including Llama 3 (8B, 70B), Mistral (7B, Large), Qwen 2.5 (7B, 72B), DeepSeek Coder, and domain-specific fine-tunes. The Manteis One runs 7B–13B models. The Manteis Core runs up to 70B models (INT4 quantized). The Manteis Fortress runs 70B+ models at full precision with multi-model serving. All models are pre-downloaded — no internet required to start inferencing."
      }
    },
    {
      "@type": "Question",
      "name": "How does Manteis Edge work — can an ESP32 really run an LLM?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. The Manteis Edge uses an ESP32-S3 microcontroller ($8) running quantized micro-models (1–10M parameters) for tasks like sentiment classification, intent parsing, and anomaly detection. Models are quantized to INT4 and pruned to fit in 1–4MB of flash storage. Inference runs on-chip in 80–400ms with zero network dependency. For generative tasks, pruned TinyLlama-1.1B models can produce short text at ~2s/token. This is true edge AI — the model lives on the sensor chip itself."
      }
    },
    {
      "@type": "Question",
      "name": "What is the Sovereign AI Method?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The Sovereign AI Method is Manteis Systems' 5-phase deployment framework: Phase 1 (Assessment) maps use cases and requirements; Phase 2 (Architecture) designs the hardware and network configuration; Phase 3 (Deployment) installs and configures the appliance; Phase 4 (Integration) connects existing systems via n8n workflows and APIs; Phase 5 (Operations) establishes monitoring, maintenance, and model update procedures. The framework typically delivers production-ready sovereign AI in 2–4 weeks."
      }
    },
    {
      "@type": "Question",
      "name": "Can I migrate my existing LangChain or LlamaIndex pipelines to local AI?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Since Ollama provides an OpenAI-compatible API, migrating from cloud to local typically requires changing only the base URL and API key. In LangChain, switch from ChatOpenAI to ChatOllama and change the base_url to your appliance IP. RAG pipelines, chains, and agents continue working unchanged. The Manteis Sovereign OS includes migration documentation and code examples for common frameworks."
      }
    }
  ]
}
```

---

## 4. Article Schema (for blog posts and guides)

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "The $144K Problem: Why Cloud AI Is Bleeding Your Budget",
  "description": "A 50-person team using cloud AI pays $144,000/year in API costs. The equivalent sovereign AI appliance costs $50,000 one-time. Here's the full economic breakdown.",
  "author": {
    "@type": "Organization",
    "name": "Manteis Systems",
    "url": "https://manteis.systems"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Manteis Systems",
    "logo": {
      "@type": "ImageObject",
      "url": "https://manteis.systems/logo.png"
    }
  },
  "datePublished": "2026-07-30",
  "dateModified": "2026-07-30",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://manteis.systems/blog/144k-cloud-vs-50k-sovereign"
  },
  "keywords": "sovereign AI, AI without cloud, private AI infrastructure, self-hosted AI, AI cost reduction, on-premise AI",
  "about": [
    {
      "@type": "Thing",
      "name": "Sovereign AI"
    },
    {
      "@type": "Thing",
      "name": "On-Premise AI"
    },
    {
      "@type": "Thing",
      "name": "AI Cost Reduction"
    }
  ]
}
```

---

## 5. Service Schema (for the Sovereign AI Method consultancy page)

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "The Sovereign AI Method",
  "description": "A 5-phase deployment framework for sovereign AI infrastructure. Manteis Systems consultants assess your needs, architect the solution, deploy the hardware, integrate with existing systems, and establish operational procedures. Production-ready sovereign AI in 2–4 weeks.",
  "provider": {
    "@type": "Organization",
    "name": "Manteis Systems",
    "url": "https://manteis.systems"
  },
  "serviceType": "AI Consulting and Deployment",
  "areaServed": "Global",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Sovereign AI Method Phases",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Phase 1: Assessment",
          "description": "Map AI use cases, team requirements, compliance constraints, and existing infrastructure."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Phase 2: Architecture Design",
          "description": "Design hardware configuration, network topology, model selection, and security architecture."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Phase 3: Deployment",
          "description": "Physical installation, OS configuration, model loading, and security hardening."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Phase 4: Integration",
          "description": "Connect existing systems via n8n workflows, APIs, and RAG pipelines. User training."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Phase 5: Operations Handover",
          "description": "Monitoring setup, maintenance procedures, model update process, and documentation."
        }
      }
    ]
  },
  "keywords": "sovereign AI, local LLM deployment, Ollama deployment, n8n automation, zero-trust AI, compliance AI, AI consulting"
}
```

---

## 6. BreadcrumbList Schema (for all pages)

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://manteis.systems"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Products",
      "item": "https://manteis.systems/products"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Manteis Fortress",
      "item": "https://manteis.systems/fortress"
    }
  ]
}
```

**Variants:**

- Blog post: Home → Blog → [Post Title]
- Industry page: Home → Industries → [Industry Name] → [Page Title]
- Guide: Home → Resources → Guides → [Guide Title]
- FAQ: Home → Resources → FAQ → [Page Title]
- Comparison: Home → Resources → Comparisons → [Page Title]

---

## 7. HowTo Schema (for technical guides)

```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Deploy Ollama for Production Local LLM Inference",
  "description": "Complete guide to deploying Ollama for production local LLM inference on sovereign AI infrastructure. Covers installation, configuration, multi-user setup, and security hardening.",
  "totalTime": "PT2H",
  "estimatedCost": {
    "@type": "MonetaryAmount",
    "currency": "USD",
    "value": "0"
  },
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Install Ollama",
      "text": "Install Ollama on your server or Manteis appliance using the official installer. On Linux: curl -fsSL https://ollama.com/install.sh | sh"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Download your first model",
      "text": "Pull a model for local inference. Start with Llama 3 8B: ollama pull llama3:8b. For 70B models on enterprise hardware: ollama pull llama3:70b"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Configure for multi-user access",
      "text": "Set OLLAMA_NUM_PARALLEL for concurrent requests, OLLAMA_KEEP_ALIVE to keep models in memory, and OLLAMA_HOST to bind to your network interface."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Set up authentication",
      "text": "Place a reverse proxy (Caddy or nginx) with OIDC authentication in front of Ollama. Never expose the Ollama API directly to the network without authentication."
    },
    {
      "@type": "HowToStep",
      "position": 5,
      "name": "Connect your applications",
      "text": "Point your OpenAI-compatible applications to http://your-appliance:11434/v1. Most applications work with just a base URL change."
    }
  ],
  "tool": [
    {
      "@type": "HowToTool",
      "name": "Ollama"
    },
    {
      "@type": "HowToTool",
      "name": "Caddy or nginx (reverse proxy)"
    },
    {
      "@type": "HowToTool",
      "name": "Manteis appliance or server with GPU"
    }
  ],
  "keywords": "Ollama deployment, local LLM deployment, self-hosted AI, sovereign AI, local AI, private AI"
}
```

---

## Deployment Instructions

### How to use these templates

1. **Copy the JSON-LD block** for the appropriate content type
2. **Replace placeholder values** (URLs, prices, descriptions) with your actual page content
3. **Paste into the `<head>` of your HTML page** wrapped in `<script type="application/ld+json">` tags:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  ...your schema here...
}
</script>
```

4. **Validate with Google's Rich Results Test:** https://search.google.com/test/rich-results
5. **Validate with Schema.org validator:** https://validator.schema.org/

### Content-to-Schema Mapping

| Content Type | Schema Type | Files to Apply To |
|---|---|---|
| Homepage | Organization | manteis.systems root page |
| Product pages (One, Core, Fortress, Edge) | Product | Each product page |
| Manteis Cloud page | Service | Cloud product page |
| Sovereign AI Method page | Service | Method consultancy page |
| FAQ pages | FAQPage | Both FAQ files (general + technical) |
| Blog posts | Article | All blog post files |
| Technical guides | HowTo | All guide files (Ollama, RAG, n8n, zero-trust, edge AI) |
| All pages | BreadcrumbList | Every page with navigation breadcrumbs |
| Comparison pages | Article | Comparison files |

### Multiple schemas on one page

Pages can have multiple JSON-LD blocks. A product page might include both Product schema and BreadcrumbList:

```html
<script type="application/ld+json">{ ...product schema... }</script>
<script type="application/ld+json">{ ...breadcrumb schema... }</script>
```

Google supports multiple structured data entries per page.

---

## SEO Impact

Implementing these schemas enables:

- **Rich product results** — Price, availability, and specifications in search results
- **FAQ accordions** — Expandable Q&A directly in search results (highly visible)
- **Article rich results** — Author, date, and publisher in search results
- **How-to rich results** — Step-by-step instructions in search results
- **Breadcrumbs** — Navigation path in search results
- **Knowledge panel** — Organization information in the sidebar

All of these increase search visibility, click-through rates, and perceived authority for manteis.systems and the Manteis Sovereign AI product ecosystem.

---

*Schema markup is a one-time implementation per page that pays dividends for the lifetime of the content. These templates are ready to deploy on manteis.systems. For implementation support, **[contact Manteis Systems](https://manteis.systems/contact)**.*