# THE MANTEIS SOVEREIGN AI APPLIANCE
## White-Label Product Specification
## We don't sell consultancy with hardware. We sell a PRODUCT.

---

## THE THESIS SHIFT

Old model: "We set up some open-source tools on hardware you buy."
New model: "This is the Manteis Sovereign AI Appliance. Plug it in. You're sovereign."

The client doesn't need to know what Ollama is. They don't need to know what Docker is. They don't need to know what n8n is. They need to know:

1. A box arrives
2. They plug it in
3. They go to sovereign.local in their browser
4. They see "Manteis Sovereign AI" with a setup wizard
5. They're running AI on their own hardware, zero bytes leaving their network
6. They own it. It's theirs. No subscription. No cloud. No vendor.

The underlying tech is invisible. The brand is Manteis. The product is sovereignty in a box.

---

## PRODUCT LINE

### THE MANTEIS ONE — $3,500 (all-in, hardware + software + setup)
**Tagline:** Sovereign AI for your desk.
**For:** 10-30 person firms, solo operators, small offices
**Form factor:** Compact appliance, sits on a desk, silent, one power cable, one network cable

**What's inside (the client never sees this):**
- Mac Mini M4 16GB or mini-PC with RTX 4060
- 2TB SSD
- Pre-configured Docker stack with Ollama, n8n, MCP, ChromaDB
- 5 pre-built workflows ready to activate

**What the client sees:**
- A matte black box with Manteis logo etched in orange
- One power port, one ethernet port, one status LED
- Setup wizard at sovereign.local
- Dashboard showing AI status, workflow health, model performance
- "Your intelligence is running locally. Zero bytes have left your network."

**The unboxing:**
- Manteis-branded box
- Foam insert with the appliance, power cable, ethernet cable
- Quick start card: "1. Plug in power. 2. Plug in network. 3. Open sovereign.local. 4. You're sovereign."
- The Sovereign AI Starter Kit (digital, pre-loaded)

**Margin:**
- Hardware cost: ~$1,000-1,500
- Enclosure/branding: ~$200 (3D printed initially, custom molded later)
- Software config: our time (already built, repeatable)
- Selling price: $3,500
- Gross margin: ~$1,800-2,300 per unit

### THE MANTEIS CORE — $7,500 (all-in)
**Tagline:** Sovereign AI for your organization.
**For:** 30-100 person firms, multi-department
**Form factor:** Two units — inference server (1U) + desk appliance

**What's inside (invisible):**
- NVIDIA DGX Spark or custom RTX 4090 build
- Mac Mini M4 32GB as orchestration node
- 4TB NAS
- Sophos XGS 87 firewall
- Full Docker stack, larger models (70B+), Elastic Stack prep

**What the client sees:**
- Two matte black boxes with Manteis orange branding
- Inference server goes in the server closet or under a desk
- Desk appliance goes on the IT director's desk
- Same setup wizard, more powerful dashboard
- Multi-user access, department-level workflow management
- Security monitoring panel (Phase 3 ready)

**Margin:**
- Hardware cost: ~$4,000-5,500
- Enclosure/branding: ~$300
- Selling price: $7,500
- Gross margin: ~$1,700-3,200 per unit

### THE MANTEIS FORTRESS — $15,000 (all-in)
**Tagline:** Sovereign AI for your enterprise.
**For:** 100+ person firms, regulated industries, multi-site
**Form factor:** Rack-mount 2U inference + 1U orchestration + desk appliance + 5 edge chips

**What's inside (invisible):**
- DGX Spark or dual RTX 4090 inference server
- Two Mac Minis (orchestration + security)
- Sophos XGS 87 firewall
- 8TB NAS RAID
- 5x ESP32-S3 edge AI chips in Manteis-branded cases
- Full autonomous security operations stack

**What the client sees:**
- Rack-mount appliance with Manteis branding and orange status display
- Desk appliance for the IT director
- 5 small Manteis edge devices to place around the office
- Full dashboard: AI operations, security operations, infrastructure monitoring, edge fleet
- The most powerful sovereign AI system on the market

**Margin:**
- Hardware cost: ~$7,000-9,000
- Enclosure/branding: ~$500
- Selling price: $15,000
- Gross margin: ~$5,500-7,500 per unit

---

## THE WHITE-LABEL SOFTWARE LAYER

This is the real product. The hardware is commodity. The software layer is the moat.

### What we build: The Manteis Sovereign OS

A custom web interface that sits on top of the open-source stack. The client never sees:
- Docker containers
- Ollama CLI
- n8n editor (unless they want advanced mode)
- Terminal anything
- Config files
- YAML
- JSON

What they see:

**Setup Wizard (sovereign.local)**
1. Welcome screen: "Manteis Sovereign AI — Your intelligence, your hardware, your network."
2. Network configuration: "Confirm your network. This appliance will only operate within your local network."
3. Model selection: "Choose your AI models" — simple cards with names and descriptions, no parameter counts or technical jargon. "Fast and efficient" / "Deep reasoning" / "Code specialist"
4. Workflow activation: "Select the workflows you want" — toggle switches for each pre-built workflow
5. Security confirmation: "Zero bytes will leave your network. Confirm your firewall is active."
6. Done: "You are sovereign. Your AI is running locally."

**Dashboard (sovereign.local/dashboard)**
- Status: "Your AI is running. 0 bytes have left your network."
- Model status: which models are loaded, how much memory they use (in plain English)
- Workflow status: active workflows, last run, success rate
- Document search: semantic search across company documents
- Chat: local AI chat interface (no different from ChatGPT, but it runs on their hardware)
- Security: firewall status, threat detection (if Phase 3), all clear / alert
- Settings: model management, workflow configuration, backup, system health
- Advanced mode (hidden behind a toggle): reveals n8n editor, Docker stats, raw config for power users

**The key principle:**
The interface looks like a consumer product. Like setting up a Sonos speaker or a Synology NAS. No IT degree required. No command line. No Docker knowledge. Plug in, open browser, click through wizard, done.

### Technical implementation

The white-label layer is a React/Next.js web app that:
- Serves on http://sovereign.local (mDNS/Bonjour discovery)
- Talks to Ollama via its API (localhost:11434)
- Talks to n8n via its API (localhost:5679)
- Talks to Docker via its API (localhost:2375)
- Proxies ChromaDB for semantic search
- Manages model downloads and lifecycle
- Provides the setup wizard
- Provides the dashboard
- Provides the chat interface
- Provides the workflow toggles
- Provides the security panel

We build this once. It ships on every appliance. It's the Manteis Sovereign OS.

The open-source tools underneath are invisible. The client interacts with Manteis software, not with Docker and Ollama.

---

## THE PHYSICAL APPLIANCE

### Phase 1: Custom Enclosure (immediate)
- 3D-printed custom enclosure in matte black
- Manteis logo embossed in orange
- Fits around Mac Mini or mini-PC
- Cable management: single power, single ethernet, one status LED
- Rubber feet, desk-friendly
- Looks like a premium consumer product, not a DIY project
- Cost: ~$200 per unit for 3D printing + finishing

### Phase 2: Custom Case (6 months)
- Injection-molded custom case
- Manteis branding molded in
- Custom PCB for LED status indicator and power button
- Professional packaging with foam insert
- Looks like an Apple product unboxing
- Cost: ~$50-80 per unit at scale (500+ units)

### Phase 3: Custom Hardware (12-18 months)
- Custom motherboard with integrated inference chip
- Custom firmware (not macOS, not Ubuntu — Manteis OS based on Linux)
- Fully proprietary hardware
- This is the long game — when Manteis is a hardware company, not just a consultancy

---

## THE BRANDING

### Product names
- **Manteis One** — desk appliance (Tier 1)
- **Manteis Core** — server appliance (Tier 2)
- **Manteis Fortress** — enterprise rack (Tier 3)
- **Manteis Edge** — ESP32 chip appliance (sold individually or as add-on)
- **Manteis Sovereign OS** — the software layer (the real product)

### Visual identity on the hardware
- Matte black box (#0D0F12)
- Orange (#FF5500) Manteis logo — etched/embossed
- Single orange status LED — pulses when AI is thinking, solid when idle, off when powered down
- No visible ports except power and ethernet (hidden behind a panel)
- No visible screws — seamless enclosure
- Weight: substantial, feels premium
- Packaging: black box, orange interior foam, Manteis-branded quick start card

### The quick start card
```
MANTEIS SOVEREIGN AI

1. Plug in power.
2. Plug in network.
3. Open sovereign.local in your browser.
4. Follow the setup wizard.
5. You are sovereign.

Your intelligence is now an asset, not a subscription.

No cloud. No subscription. No vendor.
This is yours.

support: manteis.systems
```

---

## THE BUSINESS MODEL

### Revenue per appliance

| Product | Price | Hardware Cost | Software Cost | Margin |
|---------|-------|--------------|---------------|--------|
| Manteis One | $3,500 | $1,200 | $0 (reusable) | $2,300 |
| Manteis Core | $7,500 | $5,000 | $0 (reusable) | $2,500 |
| Manteis Fortress | $15,000 | $8,500 | $0 (reusable) | $6,500 |
| Manteis Edge (individual) | $150 | $15 | $0 | $135 |

### The consultancy is now the upsell

The appliance is the product. The consultancy (Phases 1-5) is the upsell.

1. Client buys Manteis One ($3,500) — they have sovereign AI on their desk
2. They want workflows customized → Phase 1 consultancy ($15-25K)
3. They want autonomous IT ops → Phase 2 consultancy ($20-35K)
4. They want security operations → upgrade to Manteis Core + Phase 3 ($25-50K)
5. They want ERP tooling → Phase 5 consultancy ($20-40K)
6. They want edge AI → buy 10x Manteis Edge chips ($1,500)

The appliance gets them in the door. The consultancy is where the real money is. But now the client is buying a PRODUCT, not a service — and that's a completely different psychological frame.

### Recurring revenue

- **Manteis Care** — $200-500/month optional support and updates
  - Software updates (new models, new workflows, security patches)
  - Remote health monitoring (if client opts in — still local-first, just health stats)
  - Priority support
  - Quarterly workflow optimization
- NOT required. The appliance works without it. But most clients will want it.

- **Manteis Edge expansion** — $150 per chip, client buys more over time
- **Hardware upgrades** — new model every 18-24 months, trade-in program

---

## THE COMPETITIVE MOAT

Nobody else is doing this. The landscape:

- **Cloud vendors (OpenAI, Anthropic, Google):** Won't sell you a box. Their business model is subscription.
- **Dell/HPE:** Sell servers, not AI appliances. No software layer, no sovereignty thesis.
- **NVIDIA:** Sells chips, not products. The DGX Spark is closest, but it's a devkit, not an appliance.
- **Apple:** Sells Macs, not AI appliances. No local AI software layer.
- **Synology/QNAP:** NAS boxes, not AI. Closest in form factor and UX philosophy.
- **Consultancies:** Sell hours, not products. No hardware, no white-label software.

Manteis is the only company selling a branded sovereign AI appliance with a white-label software layer, pre-configured workflows, and a deployment methodology. That's the moat.

The Manteis Sovereign OS (the software layer) is the real IP. It's what makes a Mac Mini into a Manteis One. Without it, it's just a computer with Docker on it. With it, it's a product.

---

## BUILD PLAN

### Now (Week 1-2)
- [ ] Build the Manteis Sovereign OS prototype — React/Next.js web app
  - Setup wizard
  - Dashboard
  - Chat interface
  - Workflow toggles
  - Model manager
  - System health
- [ ] Design the 3D-printable enclosure for Mac Mini M4
- [ ] Test the full flow: plug in → sovereign.local → wizard → running

### Next (Week 3-4)
- [ ] 3D-print first enclosure prototype
- [ ] Assemble first Manteis One prototype
- [ ] Film the unboxing and setup — this is marketing content
- [ ] Test with the Sovereign AI Starter Kit as the software base

### Month 2-3
- [ ] Ship first Manteis One to a client (existing client as beta)
- [ ] Iterate on enclosure design
- [ ] Build Manteis Core prototype (DGX Spark + Mac Mini)
- [ ] Film Manteis Core unboxing
- [ ] Launch product pages on manteis.systems/appliances/

### Month 3-6
- [ ] First paying appliance customer
- [ ] Manteis Edge chip packaging (small Manteis-branded case for ESP32)
- [ ] Scale enclosure production (move from 3D print to small batch manufacturing)
- [ ] Build Manteis Fortress prototype
- [ ] Launch the full product line

---

## THE UPDATED PRODUCT MATRIX

| Product | Price | What They Get |
|---------|-------|---------------|
| AI Readiness Assessment | FREE | 30-min call |
| Sovereign AI Starter Kit | $97 | Blueprint (self-deploy) |
| Sovereign AI Starter Kit Architect | $197 | Blueprint + 1hr call |
| **Manteis One (appliance)** | **$3,500** | **Desk appliance, plug-and-play sovereign AI** |
| **Manteis Core (appliance)** | **$7,500** | **Server appliance for organizations** |
| **Manteis Fortress (appliance)** | **$15,000** | **Enterprise rack + edge chips** |
| **Manteis Edge (chip)** | **$150** | **$8 chip in Manteis case, sovereign edge AI** |
| **Manteis Care (monthly)** | **$200-500/mo** | **Updates, monitoring, support** |
| Phase 1 Consultancy | $15-25K | Custom workflows (upsell to appliance) |
| Phase 2 Consultancy | $20-35K | Autonomous IT ops (upsell) |
| Phase 3 Consultancy | $25-50K | Security operations (upsell) |
| Phase 4 Consultancy | $10-20K | Proactive infrastructure (upsell) |
| Phase 5 Consultancy | $20-40K | ERP tooling (upsell) |

The appliance is the front door. The consultancy is the house.

---

## THE MARKETING IMPLICATIONS

This changes the entire visual media strategy:

- The launch trailer now features the Manteis One unboxing, not a generic workstation
- The hero shot is a matte black box with orange logo, not a desk with a Mac Mini
- The "plug in → sovereign.local → you're sovereign" sequence is the core narrative
- The status LED pulsing orange = "your AI is thinking, locally, on YOUR hardware"
- The ESP32 chip in a Manteis-branded case = "sovereignty at the $8 level"
- The unboxing video IS the product launch

Every visual prompt should be reworked again to feature the Manteis appliance, not generic hardware. The box IS the brand.