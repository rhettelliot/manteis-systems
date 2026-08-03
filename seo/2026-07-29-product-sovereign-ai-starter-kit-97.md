# The Sovereign AI Starter Kit: Deploy Production AI for $97

**Target Keywords:** sovereign AI, local AI, on-premise AI, self-hosted AI, local LLM deployment, Ollama deployment, n8n automation, local RAG, AI without cloud, zero-trust AI, private AI infrastructure

**Meta Title:** Sovereign AI Starter Kit — $97: Complete Local AI Deployment Blueprint | Manteis Systems

**Meta Description:** The complete blueprint for deploying production-grade AI on your own hardware. Ollama, n8n, ChromaDB, Docker stack, security framework, cost model. Zero bytes leave your network. $97.

---

## Your Intelligence Should Be an Asset, Not a Subscription

The Sovereign AI Starter Kit is a deployment blueprint. Not a SaaS product. Not a subscription. The complete architecture for running production-grade AI entirely on-premises, on hardware you own, inside your network.

The tools are free — Ollama, n8n, ChromaDB, Docker. The expertise to turn them into production infrastructure is not. The free version of this knowledge is "install Ollama and hope." This is the version that accounts for HIPAA.

## What's Inside the Starter Kit

### The Reference Architecture
Complete 4-layer stack with deployment diagrams:
- **Compute Layer** — Ollama serving local LLMs (GLM-4.6, Kimi K2, DeepSeek V3, Llama 3.3, Mistral)
- **Storage Layer** — ChromaDB vector storage for retrieval-augmented generation
- **Orchestration Layer** — n8n workflow automation for document intake, classification, routing
- **Integration Layer** — MCP (Model Context Protocol) brokering controlled AI access to your systems

### Docker-Compose Stack
Production-ready, one command to deploy:
- Ollama container with model management
- n8n container with workflow persistence
- ChromaDB container with embedding storage
- MCP server container with system integration
- Monitoring container with health checks and alerts
- Redis container for workflow state
- Nginx reverse proxy with TLS

### Security Audit Framework
The Fortress methodology — the same security framework Manteis uses in enterprise deployments:
- Network segmentation guide (AI VLAN, firewall rules, access controls)
- Zero-trust configuration checklist
- Encryption at rest and in transit
- Audit logging configuration
- Incident response procedures
- Compliance mapping (HIPAA, SOC 2, PCI-DSS)

### MCP Integration Guide for M365
Connect your local AI to Microsoft 365 without sending data to the cloud:
- Exchange integration (email classification, draft responses)
- SharePoint integration (document search, content generation)
- Teams integration (message routing, bot responses)
- OneDrive integration (file access, document processing)
- All through a local MCP server you control

### Deployment Checklists
Phase-by-phase checklists for each step of deployment:
- Pre-deployment: hardware requirements, network assessment, security baseline
- Compute deployment: Ollama installation, model selection, performance tuning
- Storage deployment: ChromaDB configuration, embedding strategy, indexing
- Orchestration deployment: n8n setup, workflow design, testing
- Integration deployment: MCP server configuration, system connections
- Security hardening: firewall rules, access controls, audit activation
- Go-live: validation testing, staff training, documentation

### Cost Modeling Worksheet
Calculate your sovereign AI ROI for three firm sizes:
- **10-person firm** — Hardware, deployment, and operating costs vs cloud SaaS
- **60-person firm** — The $144K cloud vs $50K sovereign comparison
- **200-person firm** — Enterprise-scale economics with multi-site considerations

The worksheet includes formulas, assumptions, and sensitivity analysis. Plug in your numbers and see your break-even point.

### 5 Production n8n Workflows
Ready-to-deploy workflows with full configuration:

1. **Email Classification & Draft Response**
   - Trigger: Incoming email
   - AI classifies: urgency, intent, department
   - AI generates: draft response in your organization's voice
   - Action: Routes to correct person with draft attached for approval

2. **Document Generation**
   - Trigger: Form submission or API call
   - AI generates: Document from template (invoice, report, compliance doc, proposal)
   - Action: Files to correct location, logs for audit, notifies requester

3. **Semantic Search (Local RAG)**
   - Trigger: User query
   - AI retrieves: Relevant passages from your indexed documents
   - AI generates: Answer grounded in your data with citations
   - Action: Returns results through web interface or API

4. **Compliance Logging**
   - Trigger: Any AI action
   - System logs: Timestamp, model used, input summary, output summary, user, approval status
   - Action: Stores in tamper-evident log, generates compliance reports on schedule

5. **Intelligent Routing**
   - Trigger: Incoming request (ticket, email, document)
   - AI classifies: Category, priority, complexity
   - Action: Routes to correct department/person with context and suggested action

### Model Selection Guide
Quantization specs and hardware requirements for each model:
- **GLM-4.6** — General reasoning, document processing. 8B/14B variants. Runs on M4 Mac Mini or RTX 4060.
- **Kimi K2** — Long-context specialist. 128K token context. For full document library analysis. Requires RTX 4090 or M4 32GB.
- **DeepSeek V3** — Code generation, technical analysis. 14B/70B variants. 14B on Mac Mini, 70B needs GPU server.
- **Llama 3.3** — Open-weight generalist. 8B/70B. Well-documented, community-supported.
- **Mistral Large** — European-origin, GDPR-aligned. Strong multilingual. 7B/70B variants.
- **Phi-4** — Microsoft compact model. Runs on edge devices and low-power hardware.

Each model entry includes: parameter count, quantization options (Q4/Q5/Q8), memory requirements, inference speed benchmarks, and recommended use cases.

### Risk Register
20 identified risks with mitigation strategies:
- Hardware failure → UPS backup + spare unit
- Model drift → Periodic evaluation + model update protocol
- Security breach → Network segmentation + audit logging + incident response
- Staff turnover → Documentation + workflow ownership transfer
- Compliance gap → Security audit framework + quarterly review
- And 15 more...

## Pricing

### Operator Tier — $97
For IT directors, MSPs, and technical self-deployers:
- Complete reference architecture (Markdown + PDF)
- Docker-compose stack (ready to deploy)
- Security audit framework (The Fortress methodology)
- MCP integration guide for M365
- Deployment checklists for each phase
- Cost modeling worksheet (Excel + Markdown)
- 5 production n8n workflows (JSON import files)
- Model selection guide with quantization specs
- Risk register
- Markdown source files (so you can modify and extend)

### Architect Tier — $197
Everything in Operator, plus:
- 1-hour deployment strategy call with a Manteis Systems architect
- Custom architecture recommendations for your specific environment
- Priority email support for 30 days
- Access to the Manteis community Discord

## Who This Is For

- **IT directors at regulated firms** who need to deploy AI but can't use cloud providers
- **MSPs building sovereign AI practices** who need a repeatable deployment methodology
- **Technical operators** who want to self-deploy rather than hire a consultancy
- **Security professionals** who need the zero-trust AI architecture framework
- **Business owners** who want to own their intelligence infrastructure

## Who This Is NOT For

- Organizations that are comfortable sending their data to OpenAI, Anthropic, or Google
- Teams without any technical capacity to run Docker and basic command-line operations
- Firms looking for a managed SaaS AI product (that's Manteis Cloud)
- Anyone who wants AI without understanding what it's doing (that's not how sovereignty works)

## The Economics

Cloud AI SaaS for a 60-person firm: $144,000/year.
Local-first AI for the same firm: ~$85K year one, ~$50K/year after.
You own the infrastructure.

The Starter Kit shows you exactly how to get there. For $97.

## FAQ

**Do I need to be a developer to use this?**
You need basic command-line comfort (can you run `docker compose up`?) and willingness to follow detailed documentation. If you can deploy a Docker container, you can deploy sovereign AI with this kit.

**What hardware do I need?**
For a 10-30 person firm: an M4 Mac Mini (16GB, $599) or mini-PC with RTX 4060 ($800-1,200). The kit includes hardware requirements for each model and firm size.

**Is this the same as what Manteis deploys on-site?**
Yes. This is the same reference architecture, the same Docker stack, the same security framework. The difference is that in the on-site deployment, we configure and tune it for you. With the Starter Kit, you do it yourself with detailed documentation.

**Can I upgrade to a full deployment later?**
Yes. If you start with the Starter Kit and later want Manteis to take over deployment, optimization, or expansion, the Architect Tier call credit applies toward engagement.

**What format are the files?**
Markdown (source), PDF (reading), JSON (n8n workflow imports), YAML (Docker Compose), Excel (cost model). No DRM. You own the files.

**How do I get it?**
Digital download. Immediate access after purchase.

## Get the Sovereign AI Starter Kit

**[Buy Operator Tier — $97]**
Complete deployment blueprint. Everything you need to deploy production sovereign AI on your own hardware.

**[Buy Architect Tier — $197]**
Everything above plus a 1-hour deployment strategy call with a Manteis Systems architect.

---

## About Manteis Systems

Manteis Systems builds sovereign AI infrastructure for organizations that cannot — or will not — send their data to the cloud. The Sovereign AI Starter Kit is our way of making the methodology accessible to technical operators who want to self-deploy.

- **Website:** [manteis.systems](https://manteis.systems)
- **Products:** Manteis One, Manteis Core, Manteis Fortress, Manteis Cloud, Manteis Edge, Manteis Sovereign OS, Sovereign AI Starter Kit
- **Method:** The Sovereign AI Method — 5-phase productized deployment

Your intelligence should be an asset, not a subscription.