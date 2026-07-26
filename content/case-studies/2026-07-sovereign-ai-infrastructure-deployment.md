# Case Study: Sovereign AI Infrastructure for a Pacific Northwest Professional Services Firm

> **Published:** 2026-07-26
> **Sector:** Professional services (regulatory-sensitive)
> **Engagement:** Fortress audit → AI infrastructure deployment → Monthly retainer
> **Client name:** Withheld — all references use technology stack only

---

## The Problem

A 60-person professional services firm in the Pacific Northwest handled regulated client data daily — contracts, compliance filings, correspondence, and proprietary intellectual property. Their team spent an estimated 1,200 staff-hours per quarter on repetitive document workflows: intake classification, template drafting, precedent retrieval, and compliance report generation.

They had evaluated three cloud-based AI SaaS products. All three required transmitting client data to third-party servers. Their compliance officer killed every proposal. The firm's managing partner summarized the impasse in one sentence:

> *"We're told AI will save us 30 hours a week. Every vendor wants our data on their servers to do it. Our clients would fire us."*

The firm needed AI. The firm could not use the cloud. That was the entire problem.

---

## The Engagement

### Phase 1 — Fortress Security Audit ($12K, 2 weeks)

Before deploying any AI infrastructure, the engagement began with a full security assessment of the firm's existing data handling:

- **Network topology mapping** — identified every data flow path for regulated client information, from intake to archival
- **Access control audit** — reviewed Active Directory group policies, file share permissions, and remote access configurations against zero-trust principles
- **Gap analysis** — documented where current practices fell short of the firm's regulatory obligations (attorney-client privilege standards, records retention requirements, breach notification protocols)
- **AI-readiness assessment** — classified which document workflows were safe for AI augmentation versus which required human-only handling

**Outcome:** A 40-page security posture report with a prioritized remediation roadmap. Three critical gaps were identified in the firm's remote access setup that predated the AI engagement — the audit paid for itself before any AI was deployed.

### Phase 2 — Sovereign AI Infrastructure Deployment ($35K, 6 weeks)

With the security baseline established, the deployment proceeded in three layers:

#### Layer 1: Local LLM Compute

A dedicated GPU workstation was provisioned on the firm's internal network — air-gapped from the public internet, accessible only via the firm's existing VPN. The workstation ran **Ollama** as the model serving layer, hosting a locally-quantized LLM for:

- Document summarization and classification
- Contract clause extraction and comparison
- Compliance report drafting from structured templates
- Internal Q&A against the firm's document corpus

**Zero bytes of client data left the firm's network.** The model ran on metal the firm owned, in a building the firm controlled.

#### Layer 2: RAG Pipeline + Vector Storage

A **ChromaDB** vector database was deployed via **Docker**, indexing the firm's entire document corpus — 40,000+ files spanning 15 years of practice. The RAG pipeline enabled:

- Semantic search across case files, contracts, and precedent documents
- Context-grounded LLM responses (the model answered from the firm's own documents, not from training data hallucinations)
- Source citation on every response (every AI-generated passage linked back to the source document and page)

The firm's knowledge base — previously a shared drive nobody could search effectively — became a queryable intelligence layer.

#### Layer 3: Workflow Automation

**n8n** was deployed as the orchestration layer, connecting the AI infrastructure to the firm's existing tools:

- **Document intake automation** — new files dropped into the intake folder were automatically classified, routed to the correct matter, summarized, and logged
- **Template drafting workflows** — standard documents (engagement letters, compliance filings) were drafted from templates with client-specific data auto-populated
- **Slack integration** — attorneys received AI-generated document summaries in their matter channels, with links to the full source
- **Audit logging** — every AI interaction was logged with timestamp, user, document accessed, and model response, satisfying the firm's regulatory recordkeeping requirements

#### Layer 4: MCP Integration

The firm's existing **M365** environment was integrated via the **Model Context Protocol (MCP)** — a standardized interface that let the AI infrastructure read from and write to SharePoint document libraries, Exchange calendars, and Teams channels without exposing credentials or data to external APIs. The MCP server ran locally, mediating between the AI layer and Microsoft's cloud on the firm's terms:

- The AI could search SharePoint for relevant documents — without SharePoint data touching the LLM's training pipeline
- Calendar context informed document routing (a contract review scheduled for Monday was pre-summarized and delivered to the attorney's Teams channel Friday evening)
- The M365 integration was read-heavy, write-light: the AI summarized and surfaced information but did not autonomously modify client records

### Phase 3 — Monthly Retainer ($4,500/mo, ongoing)

Post-deployment, the engagement shifted to a managed service model:

- **Model updates** — periodic re-quantization with newer model versions, benchmarked against the firm's document corpus to verify quality before promotion
- **Workflow optimization** — new n8n workflows added as the firm identified additional automation opportunities (6 new workflows in the first quarter)
- **Security monitoring** — monthly audit log reviews, access control verification, and patch management for the AI infrastructure stack
- **Use-case development** — quarterly workshops with the firm's team to identify new AI applications and prioritize them by ROI

---

## The Results

### Quantitative

| Metric | Before | After | Delta |
|--------|--------|-------|-------|
| Document intake processing time | 45 min/file | 8 min/file | -82% |
| Precedent retrieval time | 20 min/search | 45 sec/search | -96% |
| Compliance report drafting | 3 hours/report | 40 min/report | -78% |
| Staff hours saved per quarter | — | 880 hours | — |
| Cloud AI SaaS cost avoided | — | $2,400/mo | $28,800/yr |
| Security gaps remediated | 3 critical | 0 | — |

### Qualitative

- **The compliance officer approved it.** The architecture was designed around the firm's regulatory obligations, not adapted to them after the fact. Every data flow was documented, logged, and auditable.
- **The managing partner called it "the first technology investment that respected our clients."** The firm's competitive positioning shifted from "we should probably get AI" to "we have AI that our competitors can't match because theirs sends client data to a third party."
- **The team adopted it.** No mandatory training sessions. The AI showed up in their existing tools — Slack, SharePoint, Teams — in the workflows they already used. Adoption was pull-based, not push-based.

---

## The Architecture (No-Confidentiality Diagram)

```
                    ┌─────────────────────────────────────────┐
                    │          FIRM INTERNAL NETWORK          │
                    │        (Air-gapped from internet)       │
                    │                                         │
  Attorney ──VPN──► │  ┌──────────┐   ┌──────────────┐       │
                    │  │  Ollama   │   │   ChromaDB   │       │
                    │  │  (LLM)   │◄─►│  (Vectors)   │       │
                    │  └────┬─────┘   └──────┬───────┘       │
                    │       │                │                │
                    │       ▼                ▼                │
                    │  ┌──────────────────────────────┐       │
                    │  │          n8n (Orchestration)  │       │
                    │  │  Intake │ Routing │ Audit Log│       │
                    │  └──────────────┬───────────────┘       │
                    │                 │                        │
                    │       ┌─────────▼──────────┐             │
                    │       │   MCP Server (Local)│            │
                    │       │   M365 Mediation    │            │
                    │       └─────────┬──────────┘             │
                    └─────────────────┼────────────────────────┘
                                      │
                            ┌─────────▼──────────┐
                            │   M365 (Cloud)     │
                            │   SharePoint       │
                            │   Exchange         │
                            │   Teams            │
                            └────────────────────┘
```

**Key architectural principles:**
1. **Sovereign compute** — the LLM runs on hardware the firm owns, inside the firm's network. No inference calls to external APIs.
2. **Local vector storage** — ChromaDB runs in Docker on the firm's server. Document embeddings never leave the building.
3. **MCP mediation** — the M365 integration is brokered by a local MCP server. Microsoft's cloud sees structured API calls from a controlled proxy, not raw AI inference traffic.
4. **Full audit trail** — every interaction is logged. The firm can demonstrate compliance to regulators without decrypting or exposing client data.
5. **Docker-containerized** — the entire AI stack (Ollama, ChromaDB, n8n, MCP server) runs in Docker containers, making upgrades, backups, and disaster recovery trivial.

---

## Why This Engagement Model Works

Most AI consultancies sell one of two things:

1. **A SaaS subscription** — "Pay us monthly and send your data to our servers." Non-starter for regulated industries.
2. **A one-time deployment** — "We'll set up Ollama for you." No ongoing optimization, no security monitoring, no use-case development. The model gets stale, the workflows stagnate, the investment decays.

Manteis sells a **third thing**: the integrated lifecycle. Security audit first (because deploying AI on a vulnerable network is malpractice). Sovereign infrastructure second (because the technology exists and the architecture is proven). Managed retainer third (because AI is not a set-and-forget tool — it's infrastructure that needs tending, like a garden or a server rack).

The firm in this case study did not buy an AI product. They bought a **capability** — the ability to deploy AI on their terms, inside their regulatory constraints, with a partner who maintains it. That is what Manteis Systems sells.

---

## Technology Stack Summary

| Layer | Technology | Role |
|-------|-----------|------|
| LLM serving | Ollama | Local model inference (zero external API calls) |
| Vector database | ChromaDB | Semantic search across document corpus |
| Workflow automation | n8n | Document routing, intake automation, audit logging |
| Containerization | Docker | Isolated, reproducible deployment of all services |
| Cloud integration | MCP (Model Context Protocol) | Local mediation between AI and M365 |
| Productivity suite | M365 | SharePoint, Exchange, Teams — integrated via MCP |
| Agent framework | Hermes | Autonomous workflow orchestration, scheduled tasks |
| Security | Zero-trust network, VPN-only access, audit logging | Regulatory compliance, breach prevention |

---

*Case study prepared by Manteis Systems. All client identifiers withheld. Technology names referenced for architectural clarity only.*
*Sunday, 2026-07-26 — filling Tuesday's rotation slot*