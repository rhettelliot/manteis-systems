# MANTEIS SOVEREIGN AI — CLOUD EDITION
## Sovereign AI as a Service. Hosted, not shipped. Zero-trust. Private. Scalable.

---

## THE THESIS

The physical appliance is perfect for high-touch clients who want a box on their desk. But not every client wants hardware. Some want:
- Instant deployment (no shipping, no on-site visit)
- Scalable GPU (bigger models without buying a DGX)
- No hardware to maintain
- Pay monthly, not $15K up front

So we build the EXACT same software stack, hosted on a private VPS with rented GPUs, connected to the client's network via Tailscale or Cloudflare Tunnel. The cloud instance is UNTRUSTED — it can only see what the client explicitly exposes through the tunnel. Zero trust. The client's data stays encrypted. The client controls the connection. The client can kill it any time.

Same product. Different deployment model. The Manteis Sovereign OS is the same. The context layer is the same. The only difference is WHERE the compute lives.

---

## THE ARCHITECTURE

```
CLIENT NETWORK (trusted)                    CLOUD VPS (untrusted)
┌──────────────────────┐                   ┌──────────────────────────┐
│  Client devices       │                   │  Manteis Cloud Instance   │
│  File shares          │                   │                           │
│  M365 / Exchange      │                   │  ┌─────────────────────┐  │
│  Jira / ticketing     │                   │  │ Manteis Sovereign   │  │
│  ERP / databases      │                   │  │ OS (web interface)  │  │
│  pfSense firewall     │                   │  └─────────────────────┘  │
│  Fleet DM agents      │                   │                           │
│                       │    TAILSCALE      │  ┌─────────────────────┐  │
│  Tailscale exit node  │◄──── WireGuard ──►│  │ Ollama (GPU)        │  │
│  OR                   │    ENCRYPTED      │  │ ChromaDB            │  │
│  Cloudflare Tunnel    │◄──── TLS TUNNEL ──►│  │ n8n                │  │
│                       │                   │  │ MCP servers         │  │
└──────────────────────┘                   │  │ Neo4j               │  │
                                           │  │ Elastic Stack       │  │
                                           │  │ Fleet DM server     │  │
                                           │  └─────────────────────┘  │
                                           │                           │
                                           │  GPU: rented (dedicated)  │
                                           │  Storage: encrypted VPS   │
                                           └──────────────────────────┘
```

### THE ZERO-TRUST MODEL

The cloud VPS is UNTRUSTED. It cannot:
- Access the client's network directly
- See the client's internal IP space
- Reach client devices without explicit tunnel permission
- Store unencrypted client data
- Make outbound connections to the client's systems unless explicitly allowed

The client's network controls everything:
- Tailscale: the client's tailnet decides what the cloud node can see. The cloud node is a member of the client's tailnet with RESTRICTED access — only the specific ports and IPs the client allows.
- Cloudflare Tunnel: the client runs cloudflared on their side. The tunnel exposes specific internal services to the cloud instance. The client can revoke the tunnel instantly. Cloudflare is free for up to 50 machines.

What the cloud instance CAN see (through the tunnel):
- The client's file share (specific mount point, read-only or read-write as configured)
- The client's M365 API (via OAuth token the client provides)
- The client's Jira API (via API key the client provides)
- The client's Fleet DM API (via tunnel, restricted to query-only)
- The client's pfSense API (via tunnel, restricted to read + human-approved writes)

What the cloud instance CANNOT see:
- Anything the client doesn't explicitly tunnel
- The client's raw network traffic
- Client devices that aren't exposed
- Internal communications between client systems
- Anything the client hasn't authorized

The client can SEVER the connection at any time:
- Kill the Tailscale node → cloud instance is instantly disconnected
- Stop the Cloudflare Tunnel → same
- Rotate API keys → cloud instance loses access
- The client's data on the cloud VPS is encrypted at rest with a key the client holds. If the client leaves, we wipe the VPS. The data is gone from our side. The client's local data is untouched.

---

## THE INFRASTRUCTURE

### GPU Rental (private, dedicated)

We do NOT use shared GPU instances (no RunPod community, no Vast.ai shared). We use DEDICATED GPU rentals where the hardware is ours for the duration:

**Option A: Lambda Labs (RECOMMENDED)**
- Dedicated H100/A100/RTX 6000 instances
- Hourly or monthly billing
- The instance is yours — no shared tenants
- API access for auto-provisioning
- Prices: RTX 6000 Ada ~$0.50/hr, A100 ~$1.10/hr, H100 ~$2.49/hr
- For a 24/7 client: ~$360/mo (RTX 6000) to ~$1,790/mo (H100)

**Option B: TensorDock**
- Dedicated GPU instances, cheaper than Lambda
- RTX 4090 ~$0.30/hr, A100 ~$0.80/hr
- Good for budget-conscious clients
- API access for provisioning

**Option C: Self-hosted (the HP Omen or a dedicated box in a datacenter)**
- For clients who want maximum sovereignty even in the cloud
- We colo a server or use Rhett's existing hardware
- No third-party GPU vendor at all
- This is the "we host it ourselves" play

**The client never sees the GPU vendor.** They see Manteis. We manage the infrastructure. They get the service.

### VPS Hosting (the control plane)

The non-GPU services (Manteis OS, n8n, ChromaDB, Neo4j, Elastic, Fleet DM server) run on a standard VPS:

**Option A: Hetzner (RECOMMENDED)**
- Dedicated CCX instances (dedicated CPU, not shared)
- CCX13 (2 vCPU, 8GB RAM) — ~$15/mo (small clients)
- CCX23 (4 vCPU, 16GB RAM) — ~$30/mo (medium clients)
- CCX43 (8 vCPU, 32GB RAM) — ~$60/mo (large clients)
- CCX53 (16 vCPU, 64GB RAM) — ~$120/mo (enterprise)
- ISO 27001 certified datacenters
- EU or US locations

**Option B: DigitalOcean**
- Premium CPU instances
- Similar pricing, simpler API
- Good for auto-provisioning

**Option C: Self-hosted on Rhett's Mac Mini or cyberdeck**
- Maximum sovereignty
- Limited by residential bandwidth and power reliability
- Only for small clients or demos

### Storage

- VPS local NVMe (encrypted with LUKS, client holds the key)
- For larger clients: attach encrypted block storage
- Backups: encrypted, client-key-held, stored in a separate location
- The client's encryption key is NEVER stored on the VPS — it's provided at boot time via the tunnel connection from the client's side. If the tunnel is down, the storage is locked. If the client leaves, the key leaves with them and the data is cryptographically inaccessible.

---

## AUTO-PROVISIONING (the "spin up" magic)

When a client signs up for Manteis Cloud, here's what happens automatically:

### Step 1: Client signs up at manteis.systems/cloud
- Selects tier (Solo, Team, Enterprise)
- Provides billing info
- Downloads the Manteis Connector (a lightweight agent that runs on one machine inside their network)

### Step 2: Manteis Connector establishes the tunnel
- The Connector generates a Tailscale auth key (or Cloudflare tunnel token)
- The Connector creates an encrypted tunnel to the Manteis cloud control plane
- The client's network admin approves the tunnel in their Tailscale/Cloudflare dashboard
- Zero-trust handshake complete — the cloud can now talk to the connector, nothing else

### Step 3: Cloud infrastructure auto-provisions
- Manteis control plane calls the VPS API (Hetzner/DigitalOcean) → spins up a dedicated VPS
- Manteis control plane calls the GPU API (Lambda Labs) → spins up a dedicated GPU instance (if GPU tier)
- Docker Compose stack deploys automatically on the new VPS:
  - Ollama + selected models
  - ChromaDB
  - n8n
  - Neo4j
  - MCP servers
  - Elastic Stack
  - Fleet DM server
  - Manteis Sovereign OS (web interface)
- The VPS joins the client's Tailscale tailnet (via the auth key from Step 2)
- The VPS is now a member of the client's network — but with RESTRICTED access

### Step 4: Client accesses their cloud appliance
- Client goes to sovereign.manteis.systems (or a custom subdomain)
- Authenticates with their Manteis account
- Sees the Manteis Sovereign OS dashboard — same interface as the physical appliance
- Setup wizard walks them through:
  - Connect data sources (file shares, M365, Jira) via the tunnel
  - Select AI models
  - Activate workflows
  - Configure Fleet DM agents on their endpoints
  - Configure pfSense integration (if they have one)

### Step 5: Document ingestion begins
- n8n workflows start pulling documents through the tunnel
- Documents are encrypted, sent to the cloud VPS, embedded locally on the GPU, stored in ChromaDB
- Knowledge graph starts building via entity extraction
- Within 24-48 hours, the AI knows the company

### Step 6: The appliance is live
- Client accesses their sovereign AI via browser
- All compute happens on their dedicated VPS + GPU
- All data is encrypted at rest
- All traffic goes through the Tailscale/Cloudflare tunnel
- The client can kill the connection any time

**Total time from signup to live: 30-60 minutes.** No hardware shipping. No on-site visit. No waiting.

---

## THE PRODUCT TIERS (CLOUD EDITION)

### MANTEIS SOLO (Cloud) — $499/month
**For:** 1-10 person firms, solo operators
**What runs:**
- VPS: Hetzner CCX13 (2 vCPU, 8GB RAM)
- GPU: None (runs 8B models on CPU, or uses Ollama cloud models)
- Or: shared GPU pool (dedicated allocation during business hours)

**What's included:**
- Manteis Sovereign OS (full dashboard)
- Ollama with 2-3 small models (8B-14B)
- ChromaDB (up to 10,000 documents)
- n8n (5 pre-built workflows)
- Tailscale tunnel
- 50GB encrypted storage
- Email support

**Our cost:** ~$15-25/mo VPS + $0 GPU = $15-25/mo
**Margin:** ~$474/mo per client

### MANTEIS TEAM (Cloud) — $1,499/month
**For:** 10-50 person firms, small teams
**What runs:**
- VPS: Hetzner CCX23 (4 vCPU, 16GB RAM)
- GPU: Lambda Labs RTX 6000 Ada (dedicated, 24/7)

**What's included:**
- Everything in Solo PLUS:
- Larger models (up to 70B parameters via GPU)
- ChromaDB (up to 100,000 documents)
- n8n (unlimited workflows)
- Neo4j knowledge graph
- Fleet DM (up to 50 endpoints)
- 200GB encrypted storage
- Chat support

**Our cost:** ~$30/mo VPS + ~$360/mo GPU = $390/mo
**Margin:** ~$1,109/mo per client

### MANTEIS ENTERPRISE (Cloud) — $3,999/month
**For:** 50-500 person firms, regulated industries
**What runs:**
- VPS: Hetzner CCX43 (8 vCPU, 32GB RAM)
- GPU: Lambda Labs A100 (dedicated, 24/7)

**What's included:**
- Everything in Team PLUS:
- Elastic Stack (full SIEM)
- Fleet DM (unlimited endpoints)
- pfSense API integration
- Neo4j knowledge graph (full)
- 1TB encrypted storage
- Priority support + monthly optimization call
- Custom workflow development (2/month)

**Our cost:** ~$60/mo VPS + ~$800/mo GPU = $860/mo
**Margin:** ~$3,139/mo per client

### MANTEIS FORTRESS (Cloud) — $7,999/month
**For:** 500+ person firms, multi-site, heavy compliance
**What runs:**
- VPS: Hetzner CCX53 (16 vCPU, 64GB RAM) or dedicated server
- GPU: Lambda Labs H100 (dedicated, 24/7)

**What's included:**
- Everything in Enterprise PLUS:
- Multiple GPU instances (load balanced)
- Multi-site Fleet DM
- Full autonomous security operations
- Custom model fine-tuning
- Dedicated infrastructure engineer (part-time)
- 5TB encrypted storage
- 24/7 support + SLA
- Custom integration development

**Our cost:** ~$120/mo VPS + ~$1,790/mo GPU = $1,910/mo
**Margin:** ~$6,089/mo per client

---

## THE MARGIN STRUCTURE

| Tier | Price/mo | Our Cost/mo | Margin/mo | Annual Margin |
|------|---------|-------------|-----------|---------------|
| Solo | $499 | $25 | $474 | $5,688 |
| Team | $1,499 | $390 | $1,109 | $13,308 |
| Enterprise | $3,999 | $860 | $3,139 | $37,668 |
| Fortress | $7,999 | $1,910 | $6,089 | $73,068 |

**10 Team clients = $133K/year margin.**
**5 Enterprise clients = $188K/year margin.**
**3 Fortress clients = $219K/year margin.**

The cloud edition is the RECURRING REVENUE engine. The physical appliance is the flagship. The cloud is the scale.

---

## SECURITY ARCHITECTURE (the details that matter)

### Encryption
- **At rest:** LUKS full-disk encryption on the VPS. The encryption key is derived from a secret the CLIENT holds — not us. The VPS cannot boot without the client providing the key through the tunnel. If the client leaves, the key leaves, the data is cryptographically destroyed.
- **In transit:** All traffic between client network and cloud VPS goes through WireGuard (Tailscale) or Cloudflare Tunnel (TLS 1.3). No plaintext ever crosses the wire.
- **In memory:** Ollama processes documents in RAM. No document content is written to disk unencrypted. ChromaDB stores encrypted embeddings (the embeddings are meaningless without the model + the original document context).

### Access control
- The cloud VPS is a RESTRICTED member of the client's Tailscale tailnet
- Tailscale ACLs define exactly what the VPS can reach: "allow manteis-vps to access 10.0.0.5:445 (file share) and 10.0.0.10:443 (Jira API)"
- The VPS CANNOT reach anything not explicitly allowed
- The client can change the ACLs at any time
- The client can remove the VPS from the tailnet at any time

### Network isolation
- Each client gets their OWN VPS — no shared infrastructure
- Each client's VPS is on its OWN Tailscale tailnet — no cross-client communication
- The GPU instance is dedicated to one client — no shared GPU
- No client can see another client's data, traffic, or existence

### Data sovereignty
- The client chooses where the VPS lives (EU, US, specific datacenter)
- The client's data never leaves the chosen region
- The client holds the encryption key — we cannot read their data even if we wanted to
- GDPR/HHIPAA/SOC 2 compatible because the data is encrypted and the client controls the key

### Update mechanism
- Manteis OS updates are pushed through the tunnel — signed and verified
- The client can approve or reject updates
- Security patches are automatic (client is notified)
- Model updates are opt-in (client chooses when to upgrade)
- If the tunnel is down, no updates happen — the VPS is frozen

---

## THE MANTEIS CONNECTOR (client-side agent)

A lightweight agent that runs on ONE machine inside the client's network. It's the bridge.

**What it does:**
- Establishes the Tailscale or Cloudflare tunnel to the cloud VPS
- Exposes specific internal services to the cloud VPS (as configured by the client)
- Provides the encryption key to the cloud VPS at boot (via secure tunnel)
- Monitors tunnel health and reconnects if dropped
- Reports local network status to the cloud VPS (for the environment panel)

**What it is:**
- A single binary (Go or Rust) that runs as a system service
- ~10MB, no dependencies, no GUI
- Runs on Windows, Mac, Linux
- Installed in 30 seconds: `curl -sSL manteis.systems/connector | sudo sh`
- Configured via a YAML file or the Manteis OS dashboard

**What it exposes (configurable):**
- File share mount point (SMB/NFS)
- M365 OAuth token (stored locally, refreshed locally, never stored on cloud)
- Jira API key (stored locally)
- Fleet DM agent communication
- pfSense API endpoint
- Any custom internal API the client wants the AI to access

**What it does NOT expose:**
- Anything the client hasn't explicitly configured
- Raw network traffic
- Other devices on the network (unless explicitly added)

---

## THE AUTO-PROVISIONING PIPELINE (technical)

### Tech stack
- **Terraform** — infrastructure as code for VPS + GPU provisioning
- **Ansible** — configuration management for the Docker stack deployment
- **Manteis Control Plane** — a central service (running on Rhett's infrastructure) that:
  - Handles client signup and billing (Stripe)
  - Triggers Terraform to provision VPS + GPU
  - Triggers Ansible to deploy the Docker stack
  - Generates Tailscale auth keys for the new VPS
  - Registers the client's subdomain (client.manteis.systems)
  - Sends the client their setup link

### The provisioning flow (automated)

```
1. Client signs up at manteis.systems/cloud
   ↓
2. Stripe processes payment → webhook triggers control plane
   ↓
3. Control plane calls Terraform:
   - provision VPS on Hetzner (dedicated CCX instance)
   - provision GPU on Lambda Labs (dedicated GPU)
   - create DNS record: clientname.manteis.systems → VPS IP
   ↓
4. Terraform outputs VPS IP → Ansible takes over:
   - SSH into VPS
   - Install Docker, Docker Compose
   - Deploy manteis-stack.yml (the full container stack)
   - Generate LUKS encryption key, store in client's connector
   - Join VPS to client's Tailscale tailnet
   ↓
5. Client downloads Manteis Connector
   - Runs installer on one internal machine
   - Connector establishes tunnel to VPS
   - Connector provides encryption key to VPS (VPS storage unlocks)
   - Connector exposes configured internal services
   ↓
6. VPS is now live:
   - Manteis Sovereign OS accessible at clientname.manteis.systems
   - Setup wizard ready
   - Client follows wizard, connects data sources
   - Document ingestion begins
   ↓
7. Done. Client is sovereign in the cloud.
```

**Time: 30-60 minutes from signup to live.**

---

## HYBRID DEPLOYMENT (the best of both)

Some clients will want BOTH:
- Physical Manteis appliance on-premise (for the most sensitive data and processes)
- Cloud instance (for heavier GPU workloads, remote access, and redundancy)

The hybrid model:
- On-premise appliance runs the core stack (Ollama small models, n8n, ChromaDB, MCP)
- Cloud instance runs the heavy GPU (70B+ models, fine-tuning, large-scale document processing)
- Tailscale connects them — the on-premise appliance can call the cloud GPU for heavy tasks
- ChromaDB replicates between on-premise and cloud (encrypted)
- If the cloud goes down, the on-premise appliance keeps running (with smaller models)
- If the on-premise goes down, the cloud keeps running (with data from last sync)

This is the enterprise play. Manteis Fortress (physical) + Manteis Fortress (cloud) = full redundancy.

---

## THE UPDATED PRODUCT MATRIX

### Physical Appliances (ship a box)
| Product | Price | Model |
|---------|-------|-------|
| Manteis One | $3,500 | One-time + optional $200/mo Care |
| Manteis Core | $7,500 | One-time + optional $400/mo Care |
| Manteis Fortress | $15,000 | One-time + optional $500/mo Care |
| Manteis Edge | $150 | One-time per chip |

### Cloud Subscriptions (spin up instantly)
| Product | Price/mo | Model |
|---------|---------|-------|
| Manteis Solo (Cloud) | $499/mo | Monthly, cancel any time |
| Manteis Team (Cloud) | $1,499/mo | Monthly, cancel any time |
| Manteis Enterprise (Cloud) | $3,999/mo | Monthly, cancel any time |
| Manteis Fortress (Cloud) | $7,999/mo | Monthly, cancel any time |

### Consultancy (upsell to either)
| Phase | Price |
|-------|-------|
| Phase 1: Business Process Automation | $15-25K |
| Phase 2: Autonomous IT Operations | $20-35K |
| Phase 3: Autonomous Security Operations | $25-50K |
| Phase 4: Proactive Infrastructure | $10-20K |
| Phase 5: AI-Powered ERP Tooling | $20-40K |

### Digital Products (self-service)
| Product | Price |
|---------|-------|
| Sovereign AI Starter Kit | $97-197 |
| Bio-Tactical Neural Countermeasures | $47 |
| Kybalion Tactical | $57 |
| Sewa Kundalini | $35 |
| Bundle | $199 |

---

## THE REVENUE MODEL AT SCALE

### Year 1 (conservative)
- 5 physical appliances sold: ~$35K hardware revenue + ~$100K consultancy = $135K
- 10 cloud Solo clients: ~$60K/yr
- 5 cloud Team clients: ~$90K/yr
- 2 cloud Enterprise clients: ~$96K/yr
- 20 digital products: ~$2K
- **Year 1 total: ~$383K**

### Year 2 (growth)
- 10 physical appliances: ~$70K + $200K consultancy = $270K
- 30 cloud Solo: ~$180K/yr
- 15 cloud Team: ~$270K/yr
- 5 cloud Enterprise: ~$240K/yr
- 1 cloud Fortress: ~$96K/yr
- 50 digital products: ~$5K
- **Year 2 total: ~$1.06M**

### Year 3 (scale)
- 20 physical appliances: ~$140K + $400K consultancy = $540K
- 50 cloud Solo: ~$300K/yr
- 30 cloud Team: ~$540K/yr
- 10 cloud Enterprise: ~$480K/yr
- 3 cloud Fortress: ~$288K/yr
- 100 digital products: ~$10K
- **Year 3 total: ~$2.16M**

The cloud subscriptions are the compounding revenue. Every new client adds monthly recurring revenue that doesn't require additional hardware or on-site visits. The consultancy is the high-margin initial engagement. The appliances are the flagship that proves the concept.

---

## WHAT WE NEED TO BUILD

### Priority 1: The Manteis Sovereign OS (the web interface)
- React/Next.js application
- 9 API integrations (Ollama, n8n, ChromaDB, Docker, pfSense, Fleet DM, Elastic, Neo4j, file system)
- Setup wizard, dashboard, chat, document search, workflow toggles, security panel, fleet panel, knowledge graph panel, environment panel
- This is the SAME for physical and cloud — one codebase, two deployment models

### Priority 2: The Manteis Connector (client-side tunnel agent)
- Go or Rust binary
- Tailscale or Cloudflare Tunnel integration
- Service exposure configuration
- Encryption key delivery
- ~10MB, cross-platform

### Priority 3: The Manteis Control Plane (auto-provisioning)
- Central service running on Rhett's infrastructure
- Terraform templates for Hetzner + Lambda Labs
- Ansible playbooks for Docker stack deployment
- Stripe billing integration
- Client management dashboard (for Rhett/Xen, not for clients)

### Priority 4: The Docker Compose stack (the full container set)
- Ollama, ChromaDB, n8n, Neo4j, Elastic, Fleet DM, MCP servers, Manteis OS
- One docker-compose.yml that deploys everything
- Environment-variable driven (each client gets their own config)
- Health checks on every container

### Priority 5: The Terraform/Ansible automation
- Hetzner VPS provisioning
- Lambda Labs GPU provisioning
- DNS automation
- Tailscale auth key generation
- Full stack deployment
- Teardown automation (when a client cancels)

---

## THE COMPETITIVE POSITION

Nobody is doing this. The landscape:

- **OpenAI/Anthropic:** Cloud-only, no sovereignty, no on-premise option, no zero-trust tunnel
- **Dell/HPE:** Hardware-only, no software layer, no auto-provisioning, no SaaS
- **NVIDIA DGX Cloud:** Closest competitor — but it's NVIDIA-branded, not white-label, no workflow automation, no knowledge graph, no Fleet DM, no pfSense integration
- **Hugging Face Inference Endpoints:** Just model hosting, no full stack, no workflow automation, no white-label
- **Together AI / Anyscale:** Model hosting only, no appliance, no full stack

Manteis is the ONLY company offering:
1. Physical appliance (white-label, branded)
2. Cloud subscription (auto-provisioned, zero-trust)
3. Hybrid deployment (both, connected via Tailscale)
4. Full software stack (not just model hosting — workflows, knowledge graph, fleet management, security operations)
5. Consultancy methodology (5-phase deployment)
6. White-label interface (Manteis Sovereign OS — client never sees Docker/Ollama/n8n)

That's six products in one ecosystem. Nobody else has all six.