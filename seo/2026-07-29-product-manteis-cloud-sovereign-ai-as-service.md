# Manteis Cloud: Sovereign AI as a Service — Zero-Trust, Private, Scalable

**Target Keywords:** sovereign AI, local AI, private AI, AI without cloud, self-hosted AI, zero-trust AI, private AI infrastructure, Ollama deployment, n8n automation, local RAG, AI appliance

**Meta Title:** Manteis Cloud: Sovereign AI as a Service — Zero-Trust Private AI Hosting | Manteis Systems

**Meta Description:** Manteis Cloud delivers sovereign AI as a hosted service. Same software stack, rented GPUs, connected via Tailscale or Cloudflare Tunnel. The cloud instance is untrusted — zero-trust architecture, your data stays encrypted.

---

## Sovereign AI Without the Hardware

The Manteis One, Core, and Fortress appliances are perfect for organizations that want a box on their desk. But not every client wants hardware. Some need:

- **Instant deployment** — No shipping, no on-site visit, no hardware procurement cycle
- **Scalable GPU** — Access to larger models without buying a DGX system
- **No hardware maintenance** — No UPS batteries to replace, no thermal management, no physical security
- **Pay monthly** — OpEx instead of CapEx, no $15K up-front purchase
- **Geographic flexibility** — The AI runs in a data center close to your users, not in your office closet

Manteis Cloud is the answer. Same Manteis Sovereign OS. Same software stack. Same zero-trust architecture. The only difference is where the compute lives.

## The Zero-Trust Cloud Model

Here's the critical insight that makes Manteis Cloud different from every other "AI cloud" service:

**The cloud instance is UNTRUSTED.**

It cannot:
- Access your network directly
- See your internal IP space
- Reach your devices without explicit tunnel permission
- Store unencrypted data
- Make outbound connections to your systems unless explicitly allowed

Your network controls everything:
- **Tailscale:** Your tailnet decides what the cloud node can see. The cloud node is a member of your tailnet with restricted access — only the specific ports and IPs you allow.
- **Cloudflare Tunnel:** You run cloudflared on your side. The tunnel exposes specific internal services to the cloud instance. You can revoke the tunnel instantly.

The cloud VPS hosts the AI compute. Your network hosts the data. The tunnel connects them on your terms. Kill the tunnel, and the cloud instance is instantly blind.

```
YOUR NETWORK (trusted)                      CLOUD VPS (untrusted)
┌──────────────────────┐                   ┌──────────────────────────┐
│  Your devices         │                   │  Manteis Cloud Instance   │
│  File shares          │                   │                           │
│  M365 / Exchange      │                   │  ┌─────────────────────┐  │
│  Databases            │    TAILSCALE      │  │ Manteis Sovereign   │  │
│  Tailscale exit node  │◄──── WireGuard ──►│  │ OS (web interface)  │  │
│  OR                   │    ENCRYPTED      │  └─────────────────────┘  │
│  Cloudflare Tunnel    │◄──── TLS TUNNEL ──►│                           │
│                       │                   │  ┌─────────────────────┐  │
│                       │                   │  │ Ollama (GPU)        │  │
│                       │                   │  │ ChromaDB            │  │
│                       │                   │  │ n8n                 │  │
│                       │                   │  │ MCP servers         │  │
│                       │                   │  └─────────────────────┘  │
└──────────────────────┘                   └──────────────────────────┘
```

## Pricing Tiers

### Solo — $500/month
**For:** Solo operators, freelancers, small experiments
- 1 GPU (RTX 4060 equivalent)
- 16GB VRAM
- 100GB encrypted storage
- Ollama with 8B-14B parameter models
- n8n with 5 workflows
- ChromaDB vector storage
- Manteis Sovereign OS dashboard
- Tailscale connectivity
- Email support

### Team — $1,500/month
**For:** 10-30 person firms, small teams
- 1 GPU (RTX 4090 equivalent)
- 24GB VRAM
- 500GB encrypted storage
- Ollama with 14B-70B parameter models
- n8n with unlimited workflows
- ChromaDB with expanded collections
- Manteis Sovereign OS with multi-user access
- Tailscale or Cloudflare Tunnel
- Priority support

### Enterprise — $4,000/month
**For:** 30-100 person firms, multi-department
- 2 GPUs (RTX 4090 or A100 equivalent)
- 48GB+ VRAM
- 2TB encrypted storage
- Ollama with 70B+ parameter models
- Full n8n automation suite
- ChromaDB + Elastic Stack
- Manteis Sovereign OS with department-level access
- Dedicated Tailscale tailnet configuration
- Security monitoring panel
- Dedicated support channel

### Fortress — $8,000/month
**For:** 100+ person firms, regulated industries, multi-site
- 4+ GPUs (A100/H100 equivalent)
- 80GB+ VRAM
- 8TB encrypted storage
- Full sovereign AI stack with security operations
- Autonomous security monitoring (SIEM + endpoint agents)
- Edge chip fleet management
- Multi-site Tailscale mesh configuration
- 24/7 support with SLA
- Quarterly security audits

## What's the Same as the Appliance

Everything that matters:
- **Manteis Sovereign OS** — The same web interface, setup wizard, dashboard, and chat
- **Ollama** — The same local LLM inference engine, same model selection
- **ChromaDB** — The same vector database for your RAG pipeline
- **n8n** — The same workflow automation engine
- **MCP servers** — The same integration layer for your business systems
- **Zero-trust architecture** — The same security model: least-privilege, explicit permissions, audit logging

## What's Different

- **Compute location** — GPU in a data center instead of your office
- **Payment model** — Monthly subscription instead of hardware purchase
- **Scalability** — Upgrade your GPU tier without buying new hardware
- **Deployment speed** — Active in hours instead of weeks (no shipping, no on-site setup)
- **Maintenance** — We handle infrastructure maintenance, you handle your AI workflows

## The Economics: Cloud vs Manteis Cloud vs Appliance

| Model | Year 1 Cost | Year 2+ Cost | You Own? |
|---|---|---|---|
| Cloud AI SaaS (OpenAI/Azure) | $144,000 | $144,000 | No — vendor owns everything |
| Manteis Cloud (Team tier) | $18,000 | $18,000 | No — but zero-trust, your data stays encrypted |
| Manteis Core (appliance) | $22,500-32,500 | $6,000-10,000 | Yes — you own the hardware |

**The decision framework:**
- Need AI now, no hardware budget? → Manteis Cloud
- Want to own the infrastructure? → Manteis Appliance
- Want both? → Start with Manteis Cloud, migrate to appliance when ready

## Getting Started with Manteis Cloud

### Free Consultation
Book a 30-minute call. We'll configure your Tailscale or Cloudflare Tunnel connection, select your GPU tier, and deploy your Manteis Cloud instance.

### Solo Tier — $500/month
Start small. One GPU, the full sovereign AI stack, zero-trust connectivity. Upgrade tiers as your needs grow.

### Migrate from Cloud to Appliance
Started on Manteis Cloud and want to own the hardware? We migrate your configuration, models, and workflows to a Manteis appliance. Your data, your workflows, your infrastructure.

---

## About Manteis Systems

Manteis Systems builds sovereign AI infrastructure — in a box, in the cloud, and at the edge. Manteis Cloud brings the same zero-trust, private AI architecture to organizations that need hosted compute without compromising data sovereignty.

- **Website:** [manteis.systems](https://manteis.systems)
- **Products:** Manteis One, Manteis Core, Manteis Fortress, Manteis Cloud, Manteis Edge, Sovereign AI Starter Kit
- **Method:** The Sovereign AI Method — 5-phase productized deployment

Your intelligence should be an asset, not a subscription.