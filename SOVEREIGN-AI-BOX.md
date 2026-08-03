# THE SOVEREIGN AI BOX — Hardware Specifications
## What we re-sell. What arrives on a client's desk. What makes them sovereign.

---

## THE CONCEPT

We don't sell software alone. We sell a BOX. A physical thing that arrives on a client's desk, gets plugged in, and makes them sovereign. The software is ours. The hardware is theirs. When we leave, they own it. When it breaks, they fix it. When they want to upgrade, they buy parts — not a bigger subscription.

The box is the physical manifestation of the thesis: your intelligence should be an asset, not a subscription.

---

## THREE TIERS — MATCHING THE CLIENT SIZE

### TIER 1: THE SOVEREIGN DESK — $2,500-4,500
**For:** 10-30 person firms, small offices, solo operators
**What it is:** A single workstation that runs the entire local AI stack

**Hardware:**
- Apple Mac Mini M4 (16GB) — $599
  - The base. Runs Ollama, n8n, Docker, MCP servers
  - 10-core CPU, 16GB unified memory, handles 8B-14B parameter models
  - Silent, tiny, sits on a desk, draws 20W idle
- OR: Mini-PC with NVIDIA RTX 4060 (8GB VRAM) — $800-1,200
  - For Windows/Linux shops
  - Runs larger models via CUDA
  - More upgradeable
- UPS battery backup — $150
  - So the AI doesn't die when the power blinks
- Network switch (8-port managed) — $80
  - Local network for the AI infrastructure
- External SSD 2TB — $150
  - For model storage and document archives
- Sophos or pfSense firewall (if not already in place) — $200-400

**Software (included, pre-configured):**
- Ollama with selected local models (GLM, Kimi, DeepSeek, Llama, Mistral)
- n8n workflow automation (5+ pre-built workflows)
- Docker container stack (MCP servers, ChromaDB, monitoring)
- The full Sovereign AI Starter Kit deployed and running
- SSH access for remote support during deployment

**What it does out of the box:**
- Document processing and generation
- Email classification and draft responses
- Semantic search across company documents
- Workflow automation (approvals, routing, notifications)
- All running locally, zero bytes leaving the network

**Deployment time:** 1-2 days on-site
**Price:** $2,500 hardware + Phase 1 consultancy ($15-25K) = $17.5-27.5K total

---

### TIER 2: THE SOVEREIGN SERVER — $5,000-8,500
**For:** 30-100 person firms, multi-department, heavier workloads
**What it is:** A dedicated inference server + the desk workstation

**Hardware:**
- NVIDIA DGX Spark (GB10 Grace Blackwell) — $4,000-5,000
  - Purpose-built AI workstation. Grace Blackwell chip.
  - Handles 70B+ parameter models locally
  - This is the real inference engine — enterprise-grade local AI
  - What Rhett's actual client deployment uses
- OR: Custom build with NVIDIA RTX 4090 (24GB VRAM) — $3,500-4,500
  - For shops that prefer standard PC hardware
  - Runs anything the DGX runs, just louder and hotter
- Apple Mac Mini M4 (32GB) as orchestration node — $799
  - Runs n8n, Docker, MCP — the automation brain
  - Offloads inference to the DGX/GPU box
- Managed switch (16-port) — $200
- UPS battery backup (1500VA) — $200
- NAS 4TB for document storage — $400
- Sophos XGS 87 firewall — $400-600
  - The same firewall Rhett runs. Enterprise-grade. Local.

**Software (included, pre-configured):**
- Everything in Tier 1 PLUS:
- Elastic Stack (SIEM) for security monitoring (Phase 3 prep)
- Larger model support (70B parameter models for complex reasoning)
- Multi-user concurrent access
- Full backup and disaster recovery

**What it does out of the box:**
- Everything in Tier 1 PLUS:
- Complex document analysis and legal/medical review
- Multi-department workflow automation
- Security event monitoring and alerting
- Concurrent access for multiple users
- Larger, smarter models for harder tasks

**Deployment time:** 3-5 days on-site
**Price:** $5,000-8,500 hardware + Phase 1-2 consultancy ($35-60K) = $40-68.5K total

---

### TIER 3: THE SOVEREIGN FORTRESS — $8,500-15,000
**For:** 100+ person firms, multi-site, regulated industries with heavy compliance
**What it is:** Full infrastructure — inference server + orchestration + security + edge

**Hardware:**
- NVIDIA DGX Spark OR dual RTX 4090 build — $5,000-8,000
  - Primary inference engine
- Apple Mac Mini M4 (32GB) as orchestration node — $799
- Apple Mac Mini M4 (16GB) as security/monitoring node — $599
  - Dedicated SIEM and security operations
- Sophos XGS 87 firewall — $400-600
  - Network security gateway
- Managed switch (24-port) — $300
- UPS battery backup (2x 1500VA) — $400
- NAS 8TB (RAID) for document storage — $600
- ESP32-S3 microcontrollers (5x) — $40
  - Edge AI deployment proof points
  - $8 chips running 28.9M parameter models offline
  - Physical demonstration of sovereign edge intelligence
- Rack or wall-mount enclosure — $200

**Software (included, pre-configured):**
- Everything in Tier 2 PLUS:
- Elastic Stack full SIEM with pfSense integration
- Endpoint agents for fleet security
- Multi-site monitoring
- ESP32 edge AI deployments
- Full disaster recovery with automated failover

**What it does out of the box:**
- Everything in Tier 2 PLUS:
- Autonomous security operations (Phase 3)
- Proactive infrastructure monitoring (Phase 4)
- Edge AI at the $8 chip level — sovereign intelligence in physical form
- Multi-site coordination

**Deployment time:** 5-10 days on-site
**Price:** $8,500-15,000 hardware + Phase 1-3 consultancy ($60-100K) = $68.5-115K total

---

## WHAT'S ACTUALLY IN THE BOX (unboxing experience)

When we deliver, it arrives in a single flight case or box:

1. The inference workstation (DGX Spark, Mac Mini, or custom GPU build)
2. The firewall (Sophos XGS 87)
3. The switch
4. The UPS
5. The NAS (if Tier 2/3)
6. The ESP32 chips (if Tier 3)
7. A printed quick-start card: "Plug in. Power on. You're sovereign."
8. The Sovereign AI Starter Kit (printed + digital)

The unboxing IS the marketing. Film it. Post it. The moment someone opens the box and plugs in their own AI infrastructure — that's the content that sells the next 10 engagements.

---

## RHETT'S ACTUAL DEPLOYMENT AS PROOF

This isn't theoretical. Rhett runs this exact architecture:
- Mac Mini M4 (16GB) as headless core / Docker host / vault sync
- HP Omen GPU rig for local LLM inference
- NVIDIA DGX Spark (GB10 Grace Blackwell) for enterprise inference
- Sophos XGS 87 firewall (172.15.0.1 gateway)
- 24-container Docker stack (MCP servers, web apps, ChromaDB, Ollama)
- 7 Wyze cameras, 4 Sonos speakers, 2 Apple TVs, Tailscale mesh
- 15+ automated n8n workflows in production at a real manufacturer

This is the proof that the box works. The case studies prove it. The hardware spec is just making it repeatable.

---

## THE ECONOMICS — WHY THE BOX WINS

| Option | Year 1 | Year 2 | Year 3 | 3-Year Total | You Own |
|--------|--------|--------|--------|-------------|--------|
| Cloud SaaS (60-person firm) | $144K | $144K | $144K | $432K | Nothing |
| Tier 2 Box + Phase 1-2 | $68.5K | $0 | $0 | $68.5K | Everything |
| Tier 2 Box (retainer $3K/mo) | $68.5K+$36K | $36K | $36K | $176.5K | Everything |

Even WITH a retainer, the 3-year cost is less than HALF of cloud. And the client owns the infrastructure.

Without a retainer: $68.5K one-time vs $432K over 3 years. That's 84% savings. And you own the box.

---

## PRICING — HOW WE SELL THE BOX

### Option A: Hardware at cost + consultancy
- Hardware: Pass-through at actual cost (receipt shown to client)
- Consultancy: Phase pricing as documented ($15-50K per phase)
- Margin: Zero on hardware, all margin on expertise
- Pro: Maximum transparency. Client trusts the pricing.
- Con: No hardware margin

### Option B: Hardware markup + lower consultancy
- Hardware: 15-25% markup (standard systems integrator margin)
- Consultancy: 10% discount on phase pricing
- Margin: ~$500-2,000 on hardware, less on consultancy
- Pro: Some hardware margin. Still looks competitive.
- Con: Less transparent

### Option C: The all-in package (RECOMMENDED)
- Hardware + Phase 1 deployment as one fixed price: $20-30K
- Client doesn't see hardware/software breakdown — they see "Sovereign AI, installed and running: $25K"
- Margin: $2-5K on hardware + full Phase 1 margin
- Pro: Simple. One number. Client buys a result, not parts.
- Con: Need to manage hardware costs tightly

### Option D: The subscription (NOT recommended but available)
- Hardware included in $1,500-3,000/month managed service
- Client never owns the hardware — it's leased
- Pro: Lower barrier to entry
- Con: Contradicts the sovereignty thesis. We want them to OWN it.

**Recommendation: Option C — the all-in package.** The client buys a result: sovereign AI, installed and running on their desk, $20-30K. The box is just the delivery mechanism. The expertise is the product.

---

## THE FULL PRODUCT MATRIX

| Product | Price | What They Get |
|---------|-------|---------------|
| AI Readiness Assessment | FREE | 30-min call, roadmap |
| Sovereign AI Starter Kit | $97 | Blueprint, self-deploy |
| Sovereign AI Starter Kit Architect | $197 | Blueprint + 1hr call |
| Phase 1 + Tier 1 Box | $20-30K | Workstation + automation, installed |
| Phase 1-2 + Tier 2 Box | $40-68K | Server + automation + IT ops, installed |
| Phase 1-3 + Tier 3 Box | $68-115K | Full fortress + security ops, installed |
| Monthly Retainer | $2-5K/mo | Ongoing optimization |

---

## THE ESP32 EDGE — $8 SOVEREIGNTY

The esp32-ai project proves that sovereign AI scales DOWN to $8. A 28.9M parameter LLM running on a microcontroller. No server. No cloud. No network. Just a chip.

This is the ultimate proof point. Include 5 ESP32 chips in every Tier 3 deployment:
- One on the reception desk running a local assistant
- One in the break room running a simple Q&A bot
- One at the loading dock running inventory queries
- Two as spares / demos

Each chip costs $8. Each runs an LLM locally. Each is sovereign intelligence at the edge — no network needed, no cloud dependency, no subscription. When the network goes down, the chip still thinks.

This is the thing that makes Manteis Systems different from every other AI consultancy. We don't just deploy on your desk — we deploy on your $8 chip. That's sovereignty down to the silicon.

---

## NEXT STEPS

1. Confirm which hardware Rhett actually wants to standardize on (DGX Spark vs custom GPU vs Mac Mini only)
2. Source pricing for each tier from actual vendors
3. Build a one-page "Sovereign AI in a Box" spec sheet for the website
4. Film an unboxing video when the first box ships — that's marketing gold
5. Add the box spec to the case studies as the "what was deployed" section
6. Update the pricing sheet with the all-in package pricing