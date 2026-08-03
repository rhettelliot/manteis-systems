# Manteis One vs Manteis Core vs Manteis Fortress: Which Sovereign AI Appliance Is Right for You?

**Target Keywords:** sovereign AI appliance, AI appliance, AI in a box, sovereign AI, on-premise AI, local AI, self-hosted AI, zero-trust AI, private AI infrastructure, Ollama deployment

**Meta Title:** Manteis One vs Core vs Fortress: Sovereign AI Appliance Comparison | Manteis Systems

**Meta Description:** Compare the Manteis One ($3,500), Core ($7,500), and Fortress ($15,000) sovereign AI appliances. Find the right on-premise AI system for your organization size, workload, and compliance requirements.

---

## Three Appliances. One Thesis.

Your intelligence should be an asset, not a subscription.

The Manteis appliance line puts sovereign AI on your desk, in your server closet, or in your data center. Three tiers, same software stack, same zero-trust architecture. The difference is scale.

## Quick Comparison

| Feature | Manteis One | Manteis Core | Manteis Fortress |
|---|---|---|---|
| **Price** | $3,500 | $7,500 | $15,000 |
| **Target** | 10-30 person firms | 30-100 person firms | 100+ person firms |
| **Form Factor** | Compact desk appliance | Inference server + desk appliance | Rack-mount 2U + 1U + 1U + desk + 5 edge |
| **GPU** | Mac Mini M4 16GB or RTX 4060 | RTX 4090 or DGX Spark | Dual RTX 4090 or DGX Spark |
| **Max Model Size** | 14B parameters | 70B+ parameters | 70B+ parameters (faster inference) |
| **Concurrent Users** | 1-10 | 10-50 | 100+ |
| **Storage** | 2TB SSD | 4TB NAS | 8TB NAS RAID |
| **Security Operations** | Basic firewall | Security monitoring panel | Full SOC replacement (SIEM + endpoints) |
| **Edge Chips** | 0 | 0 | 5 included |
| **Multi-User** | Single user | Multi-user, multi-department | Multi-user, multi-site |
| **Deployment Time** | 1 hour (self-setup) | 1-2 days on-site | 3-5 days on-site |

## Manteis One — $3,500

### Sovereign AI for Your Desk

**Best for:** Solo operators, small law firms (5-20 attorneys), independent medical practices (1-5 providers), boutique financial advisors, small consultancies, creative agencies

**What it is:** A single compact appliance that sits on a desk or in a closet. Silent operation. One power cable, one network cable. Plug in, open `sovereign.local`, run the setup wizard, you're sovereign in 5 minutes.

**Hardware inside (invisible to the client):**
- Mac Mini M4 16GB or mini-PC with RTX 4060
- 2TB SSD for model storage and document archives
- Pre-configured Docker stack with Ollama, n8n, MCP, ChromaDB
- 5 pre-built workflows ready to activate

**What the client sees:**
- A matte black box with Manteis logo etched in orange
- One power port, one ethernet port, one status LED
- Setup wizard at sovereign.local
- Dashboard: AI status, workflow health, model performance
- "Your intelligence is running locally. Zero bytes have left your network."

**What it runs:**
- GLM-4.6 (8B) — general reasoning, document processing
- Llama 3.3 (8B) — generalist tasks
- Mistral (7B) — multilingual, European-origin
- Phi-4 — compact, efficient for simple tasks
- n8n with 5 workflows
- ChromaDB for semantic search across your documents

**What it does NOT run:**
- 70B+ parameter models (not enough VRAM)
- Multi-user concurrent access (designed for 1-10 users)
- Full security operations (basic firewall only)
- Edge fleet management (no edge chips)

**Economics:**
- Hardware cost: ~$1,000-1,500
- Your cost: $3,500 (all-in, hardware + software + setup)
- Compare to: Cloud AI SaaS at $20K-40K/year for a 15-person firm

**When to choose the One:**
- You have 30 or fewer people
- Your AI needs are document processing, email automation, and semantic search
- You want a plug-and-play appliance with zero IT overhead
- You don't need 70B parameter models
- Budget is the primary constraint

## Manteis Core — $7,500

### Sovereign AI for Your Organization

**Best for:** Mid-size law firms (20-75 attorneys), medical practices (5-20 providers), financial services firms (20-75 professionals), manufacturers (30-100 employees), regional nonprofits

**What it is:** A two-unit system — an inference server (1U, goes in a closet or under a desk) and a desk appliance (goes on the IT director's desk). The inference server handles the heavy compute. The desk appliance provides the management interface.

**Hardware inside:**
- Inference server: NVIDIA DGX Spark or custom RTX 4090 build
- Orchestration node: Mac Mini M4 32GB
- 4TB NAS for expanded storage
- Sophos XGS 87 firewall
- Full Docker stack with larger model support

**What the client sees:**
- Two matte black boxes with Manteis orange branding
- Inference server in the server closet
- Desk appliance on the IT director's desk
- Same setup wizard, more powerful dashboard
- Multi-user access with department-level workflow management
- Security monitoring panel (Phase 3 ready)

**What it runs:**
- Everything the One runs, plus:
- GLM-4.6 (14B) — deeper reasoning
- Kimi K2 — 128K context for full document library analysis
- DeepSeek V3 (70B) — code generation, technical analysis
- Llama 3.3 (70B) — complex reasoning tasks
- Elastic Stack prep for security operations

**Economics:**
- Hardware cost: ~$4,000-5,500
- Your cost: $7,500 (all-in)
- Compare to: Cloud AI SaaS at $60K-100K/year for a 50-person firm

**When to choose the Core:**
- You have 30-100 people
- You need 70B+ parameter models for complex document analysis
- Multiple departments need AI access
- You want the security monitoring panel ready for Phase 3
- You have a server closet or rack space

## Manteis Fortress — $15,000

### Sovereign AI for Your Enterprise

**Best for:** Large law firms (75+ attorneys), health systems (20+ providers, multi-site), financial services firms (75+ professionals), manufacturers (100+ employees), government contractors, regulated enterprises

**What it is:** A full rack-mount enterprise system. 2U inference + 1U orchestration + 1U security + desk appliance + 5 edge AI chips. The most powerful sovereign AI system on the market.

**Hardware inside:**
- Inference: Dual RTX 4090 or DGX Spark
- Orchestration: Mac Mini M4 32GB
- Security: Mac Mini M4 16GB (dedicated)
- 8TB NAS RAID
- Sophos XGS 87 firewall
- 5x ESP32-S3 edge AI chips in Manteis-branded cases
- Full autonomous security operations stack

**What the client sees:**
- Rack-mount system with Manteis branding and orange status display
- Desk appliance for the IT director
- 5 small Manteis edge devices to place around the office
- Full dashboard: AI operations, security operations, infrastructure monitoring, edge fleet
- The most powerful sovereign AI system available

**What it runs:**
- Everything the Core runs, plus:
- Dual GPU for faster 70B+ inference and concurrent requests
- Full Elastic Stack SIEM (not just prep)
- Endpoint agents for every machine
- AI-powered security triage and automated containment
- Edge fleet management dashboard
- Multi-site deployment support

**Economics:**
- Hardware cost: ~$7,000-9,000
- Your cost: $15,000 (all-in)
- Compare to: Cloud AI SaaS at $132K-216K/year for a 100-person firm
- Includes $40 of edge chips (5 × $8)

**When to choose the Fortress:**
- You have 100+ people
- You need enterprise-grade throughput
- You're in a regulated industry requiring full security operations
- You need edge AI distributed across your facility
- You have rack space in a server room or data center
- You need multi-site deployment

## Decision Framework

### Choose the Manteis One if:
✅ You have 30 or fewer people
✅ You need document processing, email automation, and search
✅ You want plug-and-play with no IT overhead
✅ Budget is the primary constraint

### Choose the Manteis Core if:
✅ You have 30-100 people
✅ You need 70B+ parameter models
✅ Multiple departments need AI access
✅ You want security monitoring capability
✅ You have server closet space

### Choose the Manteis Fortress if:
✅ You have 100+ people
✅ You need enterprise-grade throughput
✅ You're in a regulated industry
✅ You need full security operations (SOC replacement)
✅ You need edge AI across your facility
✅ You have rack space

### Not sure? Start with Manteis Cloud.
If you're unsure which appliance fits, start with Manteis Cloud ($500/month Solo tier). Deploy your workflows, test your use cases, and migrate to an appliance when you know what you need. Your data and workflows transfer seamlessly.

## All Three Include

Regardless of which appliance you choose, you get:
- **Manteis Sovereign OS** — The web interface, setup wizard, dashboard, and chat
- **Ollama** — Local LLM inference engine
- **n8n** — Workflow automation
- **ChromaDB** — Vector database for local RAG
- **MCP Server** — Integration layer for your business systems
- **Docker** — Containerized deployment
- **Zero-trust architecture** — Least-privilege, audit logging, human-in-the-loop
- **Zero bytes leave your network** — Data sovereignty guaranteed

## Getting Started

### Free AI Readiness Assessment
30-minute call. We assess your organization, recommend the right appliance, and estimate your ROI.

### Buy Direct
Manteis One ($3,500), Core ($7,500), Fortress ($15,000). All ship pre-configured. All include the full sovereign AI software stack.

---

## About Manteis Systems

Manteis Systems builds sovereign AI appliances from desk to data center. Three tiers, one thesis: your intelligence should be an asset, not a subscription.

- **Website:** [manteis.systems](https://manteis.systems)
- **Products:** Manteis One, Manteis Core, Manteis Fortress, Manteis Cloud, Manteis Edge, Sovereign AI Starter Kit
- **Method:** The Sovereign AI Method — 5-phase productized deployment

Your intelligence should be an asset, not a subscription.