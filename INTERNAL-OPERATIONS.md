# MANTEIS SYSTEMS — INTERNAL BUSINESS OPERATIONS
## Procurement, Configuration, and Deployment Playbook
## On-Prem Hardware + Cloud Subscription Service
## Created: 2026-08-02 | Maintained by: Xen

> This document is INTERNAL. It does not appear on manteis.systems.
> It covers the operational mechanics of delivering both product lines.
> For brand/copy/visual guidelines, see BRAND-GUIDELINES.md.
> For pricing, see Pricing-Sheet.md (vault).

---

## TABLE OF CONTENTS

1. Business Model Overview
2. On-Prem Hardware Operations
   - Procurement Process
   - Configuration Stack
   - Deployment Process
   - Post-Deployment Support
3. Cloud Subscription Operations
   - Infrastructure Architecture
   - VPS Provisioning Pipeline
   - RunPod GPU Integration
   - Stripe / Lemon Squeezy Payment Flow
   - Customer Lifecycle (signup, scaling, cancellation)
4. Shared Software Stack
5. The Manteis Sovereign OS Configuration
6. Quality Assurance and Handoff
7. Revenue Model Comparison

---

## 1. BUSINESS MODEL OVERVIEW

Manteis Systems operates two parallel product lines with the same software stack, same governance model, and same sovereignty principles:

| | On-Prem (Manteis One/Core/Fortress) | Cloud (Manteis Cloud) |
|---|---|---|
| **What the client buys** | Hardware + deployment + optional retainer | Monthly subscription |
| **Who owns the hardware** | The client | Manteis (client rents the service) |
| **Where data lives** | Client's network, zero egress | Private VPS in client's preferred region |
| **GPU access** | On the box (Tier-dependent) | RunPod on-demand, tear-down when idle |
| **Setup time** | 1-10 days on-site | Minutes (self-serve signup) |
| **Ongoing cost** | $0 (optional retainer $2-5K/mo) | $99-$499/mo + GPU usage |
| **Client commitment** | One-time investment | Cancel anytime |
| **Migration path** | Can migrate to cloud | Can migrate to on-prem |
| **Best for** | Regulated, compliance-heavy, data-sovereignty-absolute | Fast start, evaluation, no-hardware ops |

**Key principle:** The software stack is identical. A client can start on Manteis Cloud, validate the approach, then migrate to on-prem when they're ready — or vice versa. Migration is a configuration change, not a rewrite.

---

## 2. ON-PREM HARDWARE OPERATIONS

### 2A. PROCUREMENT PROCESS

#### Step 1: Client Assessment and Tier Selection

Before procurement, we run the Right-Sizing Assessment across 6 dimensions:

1. **Team size** — concurrent users (1-10? 10-50? 50-200? 200+?)
2. **Model requirements** — what parameter sizes? (8B? 14B? 32B? 70B? 100B+?)
3. **Workload complexity** — document processing? Multi-agent? Security ops? ERP?
4. **Compliance needs** — HIPAA? SOC 2? Air-gapped? Multi-site?
5. **OS preference** — Mac shop? Windows shop? Linux shop?
6. **Budget and urgency** — what can they invest? Do they need it tomorrow?

Output: a tier recommendation (1-10) and a hardware spec sheet.

#### Step 2: Sourcing

| Tier | Source | Lead time | Warranty |
|------|--------|-----------|----------|
| 1-3 (mini-PC, mid-range GPU, prosumer) | Best Buy / Amazon | Same-day to 2 days | Manufacturer warranty (1-3 yr) |
| 4-5 (compact AI appliance, Grace Blackwell) | Apple Store / NVIDIA direct / ASUS direct | 3-7 days | Vendor warranty (1 yr) |
| 6-8 (high-end workstation, dual-GPU) | Custom build / direct vendor | 1-2 weeks | Component warranties |
| 9-10 (stacked AI appliance, multi-GPU server) | NVIDIA direct / enterprise vendor | 2-4 weeks | Enterprise warranty (3 yr) |

**Tiers 1-3 are the "instant solutioning" tiers.** Drive to Best Buy, buy the gear, configure overnight, deliver tomorrow. This is the speed-to-value differentiator. No other AI consultancy can deliver sovereign AI in 24 hours.

**Procurement checklist:**
- [ ] Primary compute node (inference hardware)
- [ ] Orchestration node (if Tier 2+)
- [ ] Firewall (enterprise NGFW — Sophos, Netgate, or equivalent)
- [ ] Managed switch (8-24 ports, tier-dependent)
- [ ] UPS battery backup (1500VA per critical node)
- [ ] NAS storage (4-8TB RAID, tier-dependent)
- [ ] External SSD 2TB+ (model storage)
- [ ] Network cables (Cat6, appropriate lengths)
- [ ] Manteis logo stickers (branded kit)
- [ ] Quick start card (printed)

#### Step 3: Budget Approval and Purchase

- Client approves the hardware spec and budget
- Manteis purchases the hardware (client pays Manteis, not Best Buy)
- Hardware markup model: Option C from the Sovereign AI Box spec — all-in package price, client sees one number
- Receipts kept internal; client sees "Manteis Custom Config — [Tier name]"

### 2B. CONFIGURATION STACK

#### Pre-Deployment Configuration (done at Manteis workshop, before client site visit)

Every box goes through the same configuration pipeline regardless of tier:

**Phase A: OS Installation and Base Setup**

| OS | Steps |
|----|-------|
| macOS | Install/verify macOS, enable SSH, install Homebrew, install Docker Desktop, configure network settings |
| Linux (Ubuntu) | Install Ubuntu Server 24.04 LTS, configure SSH keys, install Docker + Docker Compose, configure UFW firewall, set static IP |
| Windows | Install Windows 11 Pro/Server, enable WSL2, install Docker Desktop, configure Windows Firewall, set static IP |

**Phase B: Software Stack Installation**

```yaml
# The Manteis Sovereign AI Stack — installed on every box
services:
  ollama:           # LLM inference
  n8n:              # Workflow automation
  chromadb:         # Vector memory (or Qdrant for larger deployments)
  hermes:           # Agent runtime (Nous Research Hermes)
  mcp-servers:      # Tool protocol layer
  sovereign-os:     # Web interface (Next.js app at sovereign.local)
  monitoring:       # Health checks, log aggregation
  # Phase 3+ additions:
  elasticsearch:    # SIEM (security operations)
  kibana:           # SIEM dashboard
  filebeat:         # Log shipper
```

1. Install Ollama, pull selected models based on tier capability:
   - Tiers 1-2: 8B-14B models (GLM-4-8B, Llama-3.1-8B, Mistral-7B)
   - Tiers 3-5: 14B-32B models (Qwen-14B, Llama-3.1-32B)
   - Tiers 6-10: 70B+ models (Qwen-72B, Llama-3.1-70B)
2. Install n8n via Docker, configure 5+ starter workflows:
   - Document intake and classification
   - Email classification and draft response
   - Approval routing
   - File organization
   - Status reporting
3. Install ChromaDB (or Qdrant for Tier 5+), initialize empty vector store
4. Install Hermes Agent runtime, configure with base skill set:
   - /triage, /morning-brief, /incident, /security-ops, /onboard-user
5. Install MCP server framework, configure base tool integrations (none yet — client-specific)
6. Install Manteis Sovereign OS (Next.js web app):
   - Configure for sovereign.local (mDNS/Bonjour discovery)
   - Setup wizard ready
   - Dashboard ready
   - Chat interface ready
   - Workflow toggles ready
   - Security panel ready
   - "0 bytes have left your network" status bar active
7. Install Docker monitoring stack (health checks, container status, disk usage)
8. Configure firewall rules:
   - Block all outbound AI API endpoints (OpenAI, Anthropic, Google AI, etc.)
   - Allow DNS, package repos, approved vendor updates
   - Allow Tailscale mesh (if client uses Tailscale)
   - Block all inbound except local network

**Phase C: Branding and Physical Setup**

1. Apply Manteis logo stickers to hardware
2. If using external enclosure, install hardware in matte black case
3. Configure orange status LED (if hardware supports it — pulse when AI thinking, solid when idle, off when powered down)
4. Print quick start card:
   ```
   MANTEIS SOVEREIGN AI
   1. Plug in power.
   2. Plug in network.
   3. Open sovereign.local in your browser.
   4. Follow the setup wizard.
   5. You are sovereign.
   support: manteis.systems
   ```
5. Package hardware, cables, quick start card in delivery box

### 2C. DEPLOYMENT PROCESS

#### On-Site Deployment (Days 1-10, tier-dependent)

**Day 1: Physical Setup**
- Arrive on-site
- Unbox and place hardware
- Connect to client network (firewall, switch, power, UPS)
- Verify network connectivity
- Verify firewall rules are active
- Take photos for case study documentation (no client data visible)

**Day 2: Software Configuration and Client-Specific Integration**
- Walk through Sovereign OS setup wizard with client
- Select models appropriate to client's needs
- Activate starter workflows
- Configure MCP tool integrations specific to client:
  - M365/Entra (if client uses Microsoft)
  - Google Workspace (if client uses Google)
  - Jira/ticketing system
  - SQL database access (configure sql-guard read-only)
  - AD/LDAP (if client has on-prem identity)
  - File shares (for document indexing)
- Run initial document indexing (ChromaDB ingestion)
- Train client team on dashboard, chat, workflow toggles

**Day 3+: Phase 1 Workflow Building**
- Build client-specific workflows in n8n
- Test each workflow with real data
- Document each workflow
- Train client team on workflow maintenance

**Exit Criteria:**
- 5+ workflows running in production
- Client team trained on dashboard and workflow management
- Documentation handed off
- 30-day support window starts

### 2D. POST-DEPLOYMENT SUPPORT

**30-day included support:**
- Remote support via Tailscale (if client opts in)
- Email/phone support during business hours
- Bug fixes and configuration adjustments
- Workflow tuning

**Optional retainer ($2-5K/mo):**
- Proactive monitoring and health checks
- Monthly workflow optimization
- New workflow development
- Security patch management
- Model updates and evaluation
- Quarterly on-site/virtual review

---

## 3. CLOUD SUBSCRIPTION OPERATIONS

### 3A. INFRASTRUCTURE ARCHITECTURE

```
┌─────────────────────────────────────────────────────────────┐
│                    MANTEIS CLOUD                             │
│                                                              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│  │ Client A    │  │ Client B    │  │ Client C    │          │
│  │ Private VPS │  │ Private VPS │  │ Private VPS │          │
│  │ ┌─────────┐│  │ ┌─────────┐│  │ ┌─────────┐│          │
│  │ │Hermes   ││  │ │Hermes   ││  │ │Hermes   ││          │
│  │ │Ollama   ││  │ │Ollama   ││  │ │Ollama   ││          │
│  │ │n8n      ││  │ │n8n      ││  │ │n8n      ││          │
│  │ │ChromaDB ││  │ │ChromaDB ││  │ │ChromaDB ││          │
│  │ │Sov. OS  ││  │ │Sov. OS  ││  │ │Sov. OS  ││          │
│  │ └─────────┘│  │ └─────────┘│  │ └─────────┘│          │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘          │
│         │                │                │                 │
│  ┌──────▼──────────────────────────────────────┐            │
│  │           RUNPOD GPU LAYER                   │            │
│  │  On-demand GPU pods (spin up / tear down)    │            │
│  │  Dedicated per client — not shared inference │            │
│  └──────────────────────────────────────────────┘            │
│                                                              │
│  ┌──────────────────────────────────────────────┐            │
│  │  STRIPE / LEMON SQUEEZY BILLING               │            │
│  │  Subscription management, invoicing, payments │            │
│  └──────────────────────────────────────────────┘            │
└─────────────────────────────────────────────────────────────┘
```

**Key principles:**
- Each client gets their own private VPS — never shared, never multi-tenant
- GPU access via RunPod: dedicated pods, spun up on demand, torn down when idle
- The client sees Manteis. They don't see the VPS provider, GPU provider, or billing provider
- Data isolation: no client can access another client's VPS or data
- The Sovereign OS web interface is the same as on-prem — the client experience is identical

### 3B. VPS PROVISIONING PIPELINE

**Automated provisioning flow (self-serve signup):**

```
Client visits manteis.systems/cloud
  → Selects tier (Starter / Professional / Enterprise)
  → Enters payment info (Stripe checkout or Lemon Squeezy)
  → Payment confirmed
  → Provisioning script fires:
    1. Create VPS (DigitalOcean / Hetzner / Linode / Vultr — choose by region)
    2. Install Ubuntu 24.04 LTS
    3. Install Docker + Docker Compose
    4. Deploy Manteis Sovereign AI Stack (docker-compose up)
    5. Configure Sovereign OS web interface
    6. Generate unique subdomain: [client].manteis.cloud (or client provides domain)
    7. Configure SSL (Let's Encrypt / Caddy)
    8. Send welcome email with:
       - Dashboard URL
       - Setup wizard link
       - Initial admin credentials
       - Quick start guide
    9. Client opens dashboard, runs setup wizard, selects models, activates workflows
```

**VPS specs by tier:**

| Tier | VPS Provider | vCPU | RAM | Storage | Region |
|------|-------------|------|-----|---------|--------|
| Starter ($99/mo) | Hetzner / DigitalOcean | 4 | 8GB | 80GB SSD | Client choice |
| Professional ($249/mo) | Hetzner / DigitalOcean | 8 | 16GB | 160GB SSD | Client choice |
| Enterprise ($499/mo) | Hetzner / Vultr / AWS | 16 | 32GB | 320GB SSD | Client choice |

**VPS provider selection criteria:**
- Cost-effective (Hetzner is cheapest, DigitalOcean is balanced)
- Region availability (client data stays in their region)
- API for automated provisioning
- Reliability (99.9%+ uptime)
- Snapshots and backup support

### 3C. RUNPOD GPU INTEGRATION

**Why RunPod:** On-demand GPU pods, pay-per-minute, dedicated instances (not shared inference). Spin up when a client needs 70B+ inference, tear down when idle. Client only pays for GPU time they use.

**Integration architecture:**

```
Client VPS (Ollama running 8B-14B models for light tasks)
  │
  │ Client requests heavy inference (70B+ model)
  │
  ▼
RunPod API → Provision dedicated GPU pod
  ├── RTX 4090 (24GB VRAM) — $0.34/hr
  ├── RTX A6000 (48GB VRAM) — $0.45/hr
  ├── A100 80GB — $1.10/hr
  └── H100 80GB — $2.50/hr
  │
  │ Model loaded, inference runs
  │
  │ Client finishes task
  │
  ▼
RunPod API → Tear down GPU pod (stop billing)
```

**How it works for the client:**
1. Client uses Sovereign OS dashboard as normal
2. When they need a larger model, they select it from the model dropdown
3. Sovereign OS checks if the model fits on the VPS
4. If it doesn't (needs GPU), Sovereign OS provisions a RunPod GPU pod automatically
5. Model loads on the GPU pod, inference runs, result returns to client
6. After idle timeout (configurable, default 10 min), GPU pod tears down
7. Client is billed for GPU time only (added to monthly invoice or pre-paid credits)

**RunPod GPU pricing (passed through to client with markup):**

| GPU Type | VRAM | RunPod Cost | Client Cost (20% markup) | Best for |
|----------|------|-------------|---------------------------|----------|
| RTX 4090 | 24GB | $0.34/hr | $0.41/hr | 70B models, moderate concurrent |
| RTX A6000 | 48GB | $0.45/hr | $0.54/hr | 70B+ models, large context |
| A100 80GB | 80GB | $1.10/hr | $1.32/hr | 100B+ models, heavy workloads |
| H100 80GB | 80GB | $2.50/hr | $3.00/hr | Maximum performance, enterprise |

**GPU billing model:**
- Pre-paid GPU credits (client adds credits to their account)
- Or pay-as-you-go on monthly invoice (Enterprise tier only)
- Idle timeout: configurable (default 10 min, Enterprise 30 min)
- Client sees GPU usage in the Sovereign OS dashboard: "GPU time this month: 4.2 hrs / Cost: $1.72"

### 3D. STRIPE / LEMON SQUEEZY PAYMENT FLOW

**Stripe (primary — B2B subscription billing):**

```
manteis.systems/cloud
  → Stripe Checkout (embedded or redirect)
  → Client enters payment (card, ACH, wire for enterprise)
  → Stripe creates subscription
  → Stripe webhook → Manteis provisioning API
    → VPS provisioned (see 3B)
    → Welcome email sent
    → Client is live
```

**Stripe configuration:**
- Products: Manteis Cloud Starter / Professional / Enterprise
- Billing cycle: monthly, auto-renew
- Tax: Stripe Tax (automatic for US states that require it)
- Invoicing: automatic email invoices
- Failed payment: 3 retry attempts, then suspend VPS (not delete — data preserved 30 days)
- Cancellation: client cancels in dashboard, VPS snapshot saved 30 days, then deleted

**Lemon Squeezy (alternative — simpler tax handling for international):**

```
manteis.systems/cloud
  → Lemon Squeezy Checkout
  → Lemon Squeezy handles tax (VAT, GST, sales tax globally)
  → Webhook → Manteis provisioning API
  → Same provisioning flow as Stripe
```

**Why both:** Stripe is better for B2B (invoicing, ACH, enterprise contracts). Lemon Squeezy is better for international solo operators (built-in tax handling, simpler setup). We offer both and let the client choose at checkout.

**Merchant of record consideration:** Lemon Squeezy is the merchant of record (handles tax compliance globally). Stripe is not — we handle tax ourselves. For Enterprise tier, we use Stripe with manual invoicing. For Starter/Professional, we default to Lemon Squeezy for tax simplicity.

### 3E. CUSTOMER LIFECYCLE

**Signup:**
1. Client visits manteis.systems/cloud
2. Selects tier, enters payment
3. VPS provisions automatically (2-5 min)
4. Welcome email with dashboard URL and setup wizard
5. Client runs setup wizard: select models, activate workflows, configure integrations
6. Client is sovereign in the cloud

**Scaling (upgrade tier):**
1. Client clicks "Upgrade" in Sovereign OS dashboard
2. Stripe/Lemon Squeezy handles proration
3. VPS is resized (or migrated to larger instance)
4. No data loss, no downtime (VPS snapshot → new instance → DNS switch)
5. Client notified when complete

**GPU on-demand (all tiers):**
1. Client selects a heavy model (70B+) in the dashboard
2. Sovereign OS provisions RunPod GPU pod automatically
3. Model loads, inference runs
4. After idle timeout, GPU pod tears down
5. GPU cost added to monthly invoice or deducted from pre-paid credits

**Cancellation:**
1. Client clicks "Cancel" in dashboard
2. Subscription cancelled in Stripe/Lemon Squeezy
3. VPS stopped (not deleted) — snapshot saved 30 days
4. Client can reactivate within 30 days (data preserved)
5. After 30 days: VPS and all data permanently deleted
6. Cancel confirmation email sent

**Migration to on-prem:**
1. Client decides to buy hardware
2. We run the Right-Sizing Assessment
3. Procure and configure hardware (see Section 2)
4. On-site deployment: export cloud VPS configuration (docker-compose, n8n workflows, ChromaDB data)
5. Import configuration to on-prem hardware
6. Client is now on-prem, zero cloud dependency
7. Cloud subscription cancelled (with 30-day data retention as backup)

---

## 4. SHARED SOFTWARE STACK

Both on-prem and cloud run the identical software stack. The only difference is WHERE it runs.

| Layer | On-Prem | Cloud |
|-------|---------|-------|
| Agent Runtime | Hermes (local) | Hermes (on VPS) |
| LLM Inference | Ollama (local, all models) | Ollama (VPS for 8B-14B, RunPod GPU for 70B+) |
| Workflow Automation | n8n (local Docker) | n8n (VPS Docker) |
| Vector Memory | ChromaDB (local) | ChromaDB (VPS) |
| Tool Protocol | MCP servers (local) | MCP servers (VPS) |
| Web Interface | Sovereign OS (sovereign.local) | Sovereign OS ([client].manteis.cloud) |
| Containerization | Docker (local) | Docker (VPS) |
| Security Monitoring | Elastic Stack (local, Phase 3+) | Elastic Stack (VPS, Phase 3+) |
| Knowledge Index | LanceDB (local) | LanceDB (VPS) |
| Discovery | mDNS / Bonjour (sovereign.local) | DNS + SSL ([client].manteis.cloud) |
| GPU | On the box (tier-dependent) | RunPod on-demand |

**The configuration is a single docker-compose.yml.** The same file runs on a Mac Mini in someone's office or a VPS in Hetzner. Migration is: export config → import config → done.

---

## 5. THE MANTEIS SOVEREIGN OS CONFIGURATION

The Sovereign OS is a Next.js web app that provides the white-label interface. It is configured at deploy time with a single environment file:

```env
# Manteis Sovereign OS Configuration
DEPLOYMENT_TYPE=on-prem  # or "cloud"
INSTANCE_NAME=client-name
INSTANCE_DOMAIN=sovereign.local  # or "[client].manteis.cloud"

# Inference
OLLAMA_HOST=http://localhost:11434  # local Ollama
RUNPOD_API_KEY=  # only if cloud tier or on-prem with GPU offload
RUNPOD_GPU_TYPE=RTX_4090  # default GPU for on-demand
RUNPOD_IDLE_TIMEOUT=600  # 10 minutes

# Workflow
N8N_HOST=http://localhost:5679
N8N_API_KEY=

# Vector Memory
CHROMADB_HOST=http://localhost:8000
# or
QDRANT_HOST=http://localhost:6333

# Hermes Agent
HERMES_MODEL=glm-4-8b  # default model
HERMES_SKILLS=/skills  # skill directory
HERMES_CRON_ENABLED=true

# MCP Integrations (configured per client)
M365_CLIENT_ID=
M365_CLIENT_SECRET=
JIRA_API_TOKEN=
SQL_READONLY_DSN=
# ... etc

# Security
FIREWALL_MODE=strict  # block all AI API egress
TAILSCALE_AUTH_KEY=  # if client uses Tailscale

# Billing (cloud only)
STRIPE_CUSTOMER_ID=
SUBSCRIPTION_TIER=starter
GPU_CREDITS_BALANCE=0
```

This single file configures the entire system. On-prem, it lives on the box. In cloud, it's injected during VPS provisioning. The Sovereign OS reads this file and configures the dashboard, available models, workflow integrations, and security posture accordingly.

---

## 6. QUALITY ASSURANCE AND HANDOFF

### Pre-Delivery QA Checklist (On-Prem)

- [ ] Ollama running, at least one model loaded and responding
- [ ] n8n running, 5+ starter workflows active and testable
- [ ] ChromaDB running, empty but initialized
- [ ] Hermes Agent running, /morning-brief skill executes successfully
- [ ] MCP server framework running, at least one tool integration configured
- [ ] Sovereign OS web interface accessible at sovereign.local
- [ ] Setup wizard completes successfully
- [ ] Dashboard shows "0 bytes have left your network"
- [ ] Chat interface responds with local model
- [ ] Workflow toggles work (on/off)
- [ ] Security panel shows firewall active
- [ ] Firewall rules block AI API egress (test: curl openai.com → blocked)
- [ ] UPS battery backup connected and tested
- [ ] Manteis branding applied (logo stickers, quick start card)
- [ ] Photos taken for case study documentation
- [ ] Documentation package prepared (deployment guide, SOP, credentials in 1Password)

### Pre-Launch QA Checklist (Cloud)

- [ ] VPS provisioned and accessible
- [ ] Docker stack running (all containers healthy)
- [ ] Sovereign OS accessible at [client].manteis.cloud
- [ ] SSL certificate valid
- [ ] Setup wizard completes successfully
- [ ] Ollama running with at least one model
- [ ] n8n running with starter workflows
- [ ] ChromaDB running
- [ ] Hermes Agent running
- [ ] RunPod GPU integration tested (provision → load model → infer → tear down)
- [ ] Firewall rules block AI API egress
- [ ] Stripe/Lemon Squeezy subscription active and billing
- [ ] Welcome email sent with correct credentials
- [ ] GPU credits balance initialized (if pre-paid)

### Handoff Documentation (both)

Every deployment gets a documentation package:
- Deployment summary (what was installed, what tier, what OS, what models)
- Network configuration (IP, firewall rules, DNS)
- Credential sheet (stored in 1Password, shared with client)
- SOP for common operations (restart, update models, add workflows)
- Support contact: manteis.systems / rhett@manteis.systems
- 30-day support window start date

---

## 7. REVENUE MODEL COMPARISON

### On-Prem Revenue per Engagement

| Component | Revenue | Cost | Margin |
|-----------|---------|------|--------|
| Hardware (Tier 1-3) | $2,500-$5,000 | $600-$3,500 | $500-$1,500 (20-30% markup) |
| Hardware (Tier 4-5) | $5,000-$8,500 | $4,000-$5,500 | $1,000-$3,000 |
| Hardware (Tier 6-10) | $8,500-$50,000 | $7,000-$35,000 | $1,500-$15,000 |
| Phase 1 deployment | $15,000-$25,000 | Time + expertise | $12,000-$20,000 |
| Phase 2 deployment | $20,000-$35,000 | Time + expertise | $16,000-$28,000 |
| Phase 3 deployment | $25,000-$50,000 | Time + expertise | $20,000-$40,000 |
| Phase 4 deployment | $10,000-$20,000 | Time + expertise | $8,000-$16,000 |
| Phase 5 deployment | $20,000-$40,000 | Time + expertise | $16,000-$32,000 |
| Monthly retainer | $2,000-$5,000/mo | Monitoring + updates | $1,500-$4,000/mo |

### Cloud Revenue per Client (monthly)

| Component | Starter | Professional | Enterprise |
|-----------|---------|-------------|------------|
| Subscription | $99/mo | $249/mo | $499/mo |
| VPS cost | ~$15/mo | ~$40/mo | ~$80/mo |
| RunPod GPU (avg usage) | $5-20/mo pass-through | $10-50/mo pass-through | $20-200/mo pass-through |
| GPU markup (20%) | $1-4/mo | $2-10/mo | $4-40/mo |
| Gross margin | $70-80/mo | $160-190/mo | $320-400/mo |
| Annual gross margin | $840-$960 | $1,920-$2,280 | $3,840-$4,800 |

**Cloud break-even:** 10-15 cloud clients at Professional tier covers Manteis operating costs for the cloud infrastructure. Every client after that is profit.

**Hybrid revenue:** A client who starts on cloud ($249/mo) and migrates to on-prem after 6 months has paid $1,494 in subscription revenue. Then they buy $20-50K in hardware + deployment. The cloud is both a revenue stream AND a lead generation pipeline for on-prem.

---

*This document is internal. Update when processes change. Share with team members and contractors who need to understand the operational mechanics. Do not share with clients — they see the Sovereign OS, not the plumbing.*