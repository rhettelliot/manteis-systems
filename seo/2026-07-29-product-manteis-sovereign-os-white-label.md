# Manteis Sovereign OS: The White-Label AI Operating System

**Target Keywords:** sovereign AI, local AI, on-premise AI, self-hosted AI, local LLM deployment, Ollama deployment, n8n automation, AI appliance, AI in a box, sovereign AI appliance, zero-trust AI

**Meta Title:** Manteis Sovereign OS: White-Label AI Operating System for Sovereign AI Appliances | Manteis Systems

**Meta Description:** Manteis Sovereign OS is a white-label web interface that turns Ollama, n8n, and Docker into a consumer-grade AI product. Setup wizard, dashboard, chat, workflow toggles — no terminal required.

---

## The Problem with Open-Source AI

The tools to run sovereign AI are free. Ollama, n8n, ChromaDB, Docker — all open-source, all powerful, all available to anyone. The problem isn't capability. It's usability.

To deploy these tools today, you need to know:
- How to install and configure Ollama via command line
- How to pull and manage models with `ollama pull`
- How to configure n8n via its web editor (which requires understanding API nodes, credentials, and workflow logic)
- How to write Docker Compose files
- How to manage Docker containers
- How to configure network ports and firewall rules
- How to set up ChromaDB and manage embeddings
- How to configure MCP servers for system integration
- How to troubleshoot when any of the above breaks

This is a 40-hour learning curve for a technical operator. For a non-technical business owner, it's a brick wall.

The result: organizations that need sovereign AI the most — small law firms, independent medical practices, boutique financial advisors — can't deploy it because they don't have a DevOps team.

## The Manteis Sovereign OS Solution

Manteis Sovereign OS is a white-label web application that sits on top of the open-source stack and turns it into a consumer product.

**The client never sees:**
- Docker containers
- Ollama CLI
- n8n's technical editor (unless they opt into Advanced Mode)
- Terminal
- Config files
- YAML
- JSON

**What the client sees:**
- A setup wizard that walks them through configuration in plain English
- A dashboard that shows AI status, workflow health, and system performance
- A chat interface that works like ChatGPT — but runs on their hardware
- Toggle switches for pre-built workflows
- A security panel showing firewall status and threat detection
- A settings page for model management and system configuration

If you can set up a Sonos speaker, you can set up sovereign AI with Manteis Sovereign OS.

## The Setup Wizard

When the client opens `sovereign.local` in their browser for the first time, they see:

### Step 1: Welcome
> "Manteis Sovereign AI — Your intelligence, your hardware, your network."

### Step 2: Network Configuration
> "Confirm your network. This appliance will only operate within your local network."

### Step 3: Model Selection
Simple cards with names and descriptions — no parameter counts, no technical jargon:
- **Fast & Efficient** — Quick responses for everyday tasks
- **Deep Reasoning** — Complex analysis and document processing
- **Code Specialist** — Programming and technical documentation

### Step 4: Workflow Activation
Toggle switches for each pre-built workflow:
- ✅ Email Classification & Draft Responses
- ✅ Document Generation
- ✅ Semantic Search
- ✅ Compliance Logging
- ✅ Report Automation

### Step 5: Security Confirmation
> "Zero bytes will leave your network. Confirm your firewall is active."

### Step 6: Done
> "You are sovereign. Your AI is running locally."

Total setup time: 5 minutes. No terminal. No Docker. No YAML.

## The Dashboard

After setup, the client accesses their dashboard at `sovereign.local/dashboard`:

### Status Panel
> "Your AI is running. 0 bytes have left your network."

### Model Status
Which models are loaded, how much memory they use — in plain English:
- "Deep Reasoning model is active and using 12GB of memory"
- "Fast & Efficient model is active and using 4GB of memory"
- "Code Specialist model is available but not currently loaded"

### Workflow Status
Active workflows with last run time and success rate:
- "Email Classification: Last run 2 minutes ago — 99.2% success rate"
- "Document Generation: Last run 1 hour ago — 100% success rate"
- "Semantic Search: Ready — 1,247 documents indexed"

### Document Search
Semantic search across company documents. Natural language queries:
- "Find all contracts with ACME Corporation"
- "Show me patient intake forms from last month"
- "What's our policy on remote work expenses?"

### Chat Interface
Local AI chat — functionally identical to ChatGPT, but running on the client's hardware:
- No API calls leave the network
- Conversation history stored locally
- Model selection (switch between Fast, Deep, and Code models)
- Document context (the AI can reference indexed documents)

### Security Panel
- Firewall status: Active / Inactive
- Threat detection: All Clear / Alert (with details)
- Network activity: Internal only / External connections detected
- Audit log: Recent AI actions and approvals

### Settings
- Model management: Download, update, or remove models
- Workflow configuration: Enable, disable, or customize workflows
- Backup: Schedule automatic backups to local or network storage
- System health: CPU, memory, storage, and temperature monitoring
- Advanced Mode: Reveals n8n editor, Docker stats, and raw config for power users

## Technical Architecture

Manteis Sovereign OS is a React/Next.js web application that:

- **Serves on** `http://sovereign.local` (mDNS/Bonjour discovery — no IP address memorization needed)
- **Talks to Ollama** via its API (localhost:11434) — model management and inference
- **Talks to n8n** via its API (localhost:5679) — workflow management and execution
- **Talks to Docker** via its API (localhost:2375) — container health and resource monitoring
- **Proxies ChromaDB** for semantic search and document indexing
- **Manages model lifecycle** — download, update, quantization selection, memory allocation
- **Provides the setup wizard** — first-run configuration
- **Provides the dashboard** — ongoing management and monitoring
- **Provides the chat interface** — local AI conversation
- **Provides workflow toggles** — enable/disable pre-built automation
- **Provides the security panel** — firewall, threat detection, audit trail

## White-Label Deployment

Manteis Sovereign OS is designed for white-label deployment. The interface can be branded for:

- **MSPs** who want to offer sovereign AI to their clients under their own brand
- **Consultancies** that deploy AI infrastructure and want a custom management interface
- **Enterprise IT departments** that want an internal AI platform with company branding
- **System integrators** building sovereign AI solutions for specific verticals

The white-label package includes:
- Custom branding (logo, colors, product name)
- Custom domain (e.g., `ai.yourcompany.local` instead of `sovereign.local`)
- Custom workflow templates for your industry
- Custom model recommendations and configurations
- Deployment documentation for your team

## How It Ships

Manteis Sovereign OS ships pre-installed on every Manteis appliance:
- **Manteis One** ($3,500) — Full Sovereign OS, single-user
- **Manteis Core** ($7,500) — Full Sovereign OS, multi-user, multi-department
- **Manteis Fortress** ($15,000) — Full Sovereign OS + security operations panel + edge fleet management

For existing infrastructure (you already have the hardware), Manteis Sovereign OS can be licensed as a standalone software package. Contact for pricing.

## Getting Started

### Buy an Appliance
The Manteis One, Core, and Fortress all ship with Manteis Sovereign OS pre-installed. Plug in, open your browser, run the setup wizard.

### License the OS
Already have hardware? License Manteis Sovereign OS as a standalone product. We provide installation scripts and configuration support.

### White-Label Partnership
Are you an MSP or consultancy? Become a Manteis Sovereign OS white-label partner. Deploy branded sovereign AI to your clients.

---

## About Manteis Systems

Manteis Systems builds the software layer that makes sovereign AI accessible to organizations without DevOps teams. Manteis Sovereign OS is the consumer-grade interface for enterprise-grade open-source AI.

- **Website:** [manteis.systems](https://manteis.systems)
- **Products:** Manteis One, Manteis Core, Manteis Fortress, Manteis Cloud, Manteis Edge, Manteis Sovereign OS, Sovereign AI Starter Kit
- **Method:** The Sovereign AI Method — 5-phase productized deployment

Your intelligence should be an asset, not a subscription.