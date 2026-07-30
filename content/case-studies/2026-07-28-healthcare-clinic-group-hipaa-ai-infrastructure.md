# Case Study: HIPAA-Compliant AI Infrastructure for a Regional Healthcare Group

> **Published:** 2026-07-28
> **Sector:** Healthcare (multi-clinic outpatient group)
> **Engagement:** Fortress audit → AI infrastructure deployment → Quarterly model governance
> **Client name:** Withheld — all references use technology stack only

---

## The Problem

A regional outpatient healthcare group operating 14 clinics across the Pacific Northwest managed clinical documentation, insurance pre-authorizations, and patient correspondence for 30,000+ active patients. Their clinicians spent an estimated 35% of their working hours on documentation rather than patient care — a ratio that was driving burnout, staffing turnover, and a backlog of 2,400+ unprocessed pre-authorization requests.

The group had been pitched by four cloud-based clinical AI vendors. Every pitch ended the same way: the vendor's data processing agreement included subprocessor clauses that the group's HIPAA Privacy Officer could not accept. The fundamental architecture — patient data transmitted to external servers for inference — was a non-starter regardless of the legal scaffolding layered on top.

The group's Chief Medical Officer framed it at the kickoff meeting:

> *"Our patients trust us with their most private information. We're not going to start routing it through a third party's API because a sales deck says it's HIPAA-compliant. The architecture either respects the boundary or it doesn't."*

The group needed clinical AI. The group could not use the cloud. The technology existed to solve this. The expertise to deploy it safely did not.

---

## The Engagement

### Phase 1 — Fortress Security Audit ($14K, 2 weeks)

Before any AI infrastructure was deployed, a full security assessment of the group's existing clinical data environment was conducted:

- **PHI flow mapping** — traced every path by which Protected Health Information moved through the organization, from point-of-care entry in exam rooms through the EHR system, billing platform, and archival storage
- **Network segmentation audit** — reviewed the separation (or lack thereof) between clinical systems, administrative systems, and the group's public-facing patient portal; identified three segments where traffic crossing trust boundaries was insufficiently controlled
- **Access control review** — audited role-based access controls against the principle of minimum necessary: which staff could view which patient records, whether access logs were being reviewed, whether terminated-employee credentials were being deactivated promptly
- **HIPAA risk assessment** — aligned findings against the HIPAA Security Rule's administrative, physical, and technical safeguards, producing a gap analysis with explicit risk scoring
- **AI-readiness classification** — categorized which clinical workflows were safe for AI augmentation (documentation summarization, pre-authorization drafting, billing code suggestion) versus which required human-only handling (clinical decision-making, diagnostic interpretation, patient communication)

**Outcome:** A 52-page security posture report with a remediation roadmap prioritized by risk score. Five gaps were identified — two high-risk (remote access credential handling, legacy EHR integration API with unencrypted transport) and three moderate. The high-risk gaps were remediated before AI deployment began. The audit discovered the legacy API vulnerability during the engagement — a finding unrelated to AI that justified the audit's cost on its own.

### Phase 2 — Sovereign AI Infrastructure Deployment ($38K, 7 weeks)

With the security baseline established and critical gaps remediated, the deployment proceeded in four layers:

#### Layer 1: Local LLM Compute

A dedicated GPU server was provisioned in the group's on-premises data closet — physically inside their main clinical facility, connected to the internal network, air-gapped from the public internet. The server ran **Ollama** as the model serving layer, hosting a locally-quantized LLM configured for:

- Clinical note summarization — converting verbose dictation transcripts into structured SOAP notes (Subjective, Objective, Assessment, Plan) that clinicians could review and approve
- Pre-authorization request drafting — generating insurance pre-authorization letters with patient-specific clinical justification, procedure codes, and documentation requirements pulled from the EHR
- Medical record synthesis — condensing lengthy patient histories into context-appropriate summaries for referral letters and care transitions
- Internal knowledge base Q&A — answering clinician questions about the group's own clinical protocols, formulary preferences, and referral pathways

**Zero bytes of PHI left the group's network.** Every inference call was served on hardware the group owned, in a building the group controlled, behind a network the group's own IT team administered.

#### Layer 2: RAG Pipeline + Vector Storage

A **ChromaDB** vector database was deployed via **Docker**, indexing the group's non-PHI operational corpus — clinical protocols, formulary documents, insurance plan requirements, referral network directories, and regulatory compliance guides. Crucially, the RAG pipeline was designed to operate on **two tiers**:

- **Tier 1 (operational knowledge):** Protocols, formularies, insurance rules — indexed in ChromaDB, searchable by the LLM. No PHI in this tier. This enabled clinicians to ask "What's our preferred first-line antibiotic for uncomplicated UTI per the group protocol?" and get an answer grounded in the group's own clinical guidelines.
- **Tier 2 (PHI context — ephemeral):** When a clinician requested a summary of a specific patient's record, the relevant EHR data was pulled into a short-lived context window, processed by the LLM, and then discarded. The patient data was never persisted in the vector store — it flowed through the model's context for the duration of the request and was gone when the response was delivered.

This two-tier architecture was the key design decision. It separated the group's reusable institutional knowledge (safe to persist, valuable to index) from patient-specific PHI (must not persist, must not be stored beyond the request). The compliance officer reviewed and approved this design in writing before deployment.

#### Layer 3: Workflow Automation

**n8n** was deployed as the orchestration layer, connecting the AI infrastructure to the group's clinical and administrative systems:

- **Pre-authorization automation** — when a clinician ordered a procedure requiring prior authorization, n8n triggered a workflow that pulled the relevant clinical documentation from the EHR, passed it to the LLM to draft a pre-authorization letter with procedure-specific justification, and queued the draft for clinician review in their existing task queue
- **Clinical documentation assistance** — dictation transcripts uploaded to the shared drive were automatically summarized into draft SOAP notes, routed to the originating clinician's review queue, and logged with timestamp and clinician ID
- **Billing code suggestion** — clinical notes were analyzed for billable services, and ICD-10/CPT code suggestions were generated and presented to the billing team alongside the source documentation (the AI suggested; the billing team decided)
- **Comprehensive audit logging** — every AI interaction was logged with timestamp, user, patient record accessed (by medical record number, not name), model version, and the full response. Logs were immutable, append-only, and retained per the group's HIPAA documentation requirements

#### Layer 4: MCP Integration

The group's **M365** environment was integrated via the **Model Context Protocol (MCP)** — a local server mediating between the AI infrastructure and the group's SharePoint document libraries, Exchange calendars, and Teams channels:

- Clinical protocols and formulary documents stored in SharePoint were indexed and searchable by the AI without SharePoint data entering the LLM's training pipeline
- Calendar context informed workflow triggers — a procedure scheduled for Tuesday automatically triggered the pre-authorization workflow on Friday, with the draft ready for clinician review Monday morning
- Department-specific Teams channels received AI-generated daily briefings: a summary of the day's pre-authorization status, documentation backlog, and any protocol updates relevant to that department
- The M365 integration was read-heavy, write-light — the AI surfaced and summarized information but did not autonomously modify clinical records or send patient communications

### Phase 3 — Quarterly Model Governance ($5,200/mo, ongoing)

Post-deployment, the engagement shifted to a governance model tailored to healthcare's regulatory rhythm:

- **Model updates** — periodic re-quantization with newer model versions, benchmarked against a held-out set of de-identified clinical summaries to verify quality before promotion to production. No model change was deployed without sign-off from the group's HIPAA Privacy Officer
- **Workflow expansion** — new n8n workflows added as clinical teams identified automation opportunities (8 new workflows in the first two quarters, including referral letter drafting and patient discharge instruction generation)
- **Security monitoring** — monthly audit log reviews, quarterly access control verification, and continuous patch management for the AI infrastructure stack. Every quarterly review included a PHI exposure check: confirming that no patient data had been persisted in the vector store or transmitted externally
- **Compliance reporting** — quarterly reports for the group's HIPAA compliance committee documenting all AI interactions, access patterns, and any anomalies detected in the audit logs

---

## The Results

### Quantitative

| Metric | Before | After | Delta |
|--------|--------|-------|-------|
| Clinical documentation time per patient | 22 min | 7 min | -68% |
| Pre-authorization request turnaround | 3 business days | 4 hours | -94% |
| Pre-authorization backlog | 2,400+ pending | <100 pending | -96% |
| Billing code suggestion accuracy (accepted by billing team) | — | 89% first-pass acceptance | — |
| Clinician documentation hours/week | ~28 hrs/clinician | ~9 hrs/clinician | -68% |
| Cloud clinical AI SaaS cost avoided | — | $18,000/mo | $216,000/yr |
| Security gaps remediated | 5 (2 high-risk) | 0 | — |

### Qualitative

- **The HIPAA Privacy Officer approved the architecture in writing.** The two-tier RAG design — operational knowledge persisted, PHI ephemeral — was the decision that made the entire deployment possible. The compliance officer co-designed the data flow, not just reviewed it after the fact.
- **Clinician burnout dropped measurably.** The group's quarterly staff satisfaction survey showed documentation-related stress scores falling from 7.2 to 3.4 on a 10-point scale. Two clinicians who had submitted resignation letters in the six months before deployment withdrew them.
- **The Chief Medical Officer called it "the first AI deployment that started with our boundaries instead of asking us to move them."** The group's positioning with patients shifted: they could now credibly say their AI infrastructure was fully on-premises, which became a differentiator in a competitive regional market.
- **The billing team adopted the code suggestions voluntarily.** No mandate. The suggestions were accurate enough that the billing team started requesting them for notes that hadn't been auto-processed. Pull-based adoption, not push-based compliance.

---

## The Architecture (No-Confidentiality Diagram)

```
                    ┌──────────────────────────────────────────────────┐
                    │          CLINIC GROUP INTERNAL NETWORK          │
                    │       (Air-gapped from public internet)          │
                    │                                                  │
  Clinician ─VPN──► │  ┌──────────┐    ┌──────────────────┐          │
                    │  │  Ollama   │◄──►│   ChromaDB        │          │
                    │  │  (LLM)    │    │  (Tier 1: Ops)    │          │
                    │  └─────┬─────┘    └────────┬─────────┘          │
                    │        │                   │                    │
                    │        │    ┌───────────────▼──────────┐         │
                    │        ├───►│  EHR PHI Context         │         │
                    │        │    │  (Tier 2: Ephemeral,     │         │
                    │        │    │   not persisted)         │         │
                    │        │    └──────────────┬──────────┘         │
                    │        ▼                   ▼                    │
                    │  ┌──────────────────────────────────────┐        │
                    │  │          n8n (Orchestration)          │        │
                    │  │  Pre-Auth │ SOAP Notes │ Code Suggest│        │
                    │  │  Billing  │ Referrals  │ Audit Log   │        │
                    │  └──────────────────┬───────────────────┘        │
                    │                     │                          │
                    │          ┌───────────▼──────────────┐              │
                    │          │   MCP Server (Local)     │              │
                    │          │   M365 Mediation         │              │
                    │          └───────────┬──────────────┘              │
                    └──────────────────────┼────────────────────────────┘
                                           │
                                 ┌─────────▼──────────┐
                                 │   M365 (Cloud)     │
                                 │   SharePoint       │
                                 │   Exchange         │
                                 │   Teams            │
                                 └────────────────────┘

  EHR System ──(internal API)──► n8n (PHI pulled on-demand, never stored in vector DB)
```

**Key architectural principles:**

1. **Two-tier RAG separation** — operational knowledge (protocols, formularies, insurance rules) is persisted in ChromaDB. PHI is pulled into the model's context window on-demand, processed, and discarded. No patient data is ever stored in the vector database.
2. **Sovereign compute** — the LLM runs on hardware the clinic group owns, inside their facility, behind their network. Zero external inference calls. Zero data egress.
3. **MCP mediation** — the M365 integration is brokered by a local MCP server. Microsoft's cloud sees structured API calls from a controlled proxy, not raw AI inference traffic.
4. **Human-in-the-loop by design** — the AI drafts, summarizes, and suggests. Clinicians review, approve, and decide. No AI output reaches a patient record, an insurance company, or a billing system without human sign-off.
5. **Immutable audit trail** — every AI interaction is logged with timestamp, user, patient record (by MRN), and full response. The logs themselves are HIPAA-controlled documentation.
6. **Docker-containerized** — the entire AI stack (Ollama, ChromaDB, n8n, MCP server) runs in Docker containers, making upgrades, backups, and disaster recovery trivial and reproducible.

---

## Why This Engagement Model Works for Healthcare

Healthcare AI deployments fail for two reasons:

1. **The cloud model is non-viable.** Clinical AI SaaS vendors offer BAAs, data residency promises, and encryption guarantees. For many HIPAA Privacy Officers, the architecture itself — patient data on third-party servers — is the failure point, not the legal documents wrapping it. No amount of contractual scaffolding changes the fundamental risk model.

2. **The DIY model is non-credible.** A clinic group's IT team — even a competent one — does not have the security expertise to audit their own network for AI-readiness, the integration engineering to connect Ollama + ChromaDB + n8n + MCP to an EHR system and M365 environment, or the ongoing capacity to manage model updates, security monitoring, and compliance reporting. Deploying AI on an unaudited network creates attack surfaces the clinic doesn't know it has.

Manteis offers the **third path**: security audit first (because deploying AI on a vulnerable clinical network is malpractice, full stop). Sovereign infrastructure second (the architecture is proven, the technology is mature, the deployment is bespoke). Governance retainer third (because healthcare AI is regulated infrastructure that requires ongoing tending — model updates need clinical sign-off, security needs continuous monitoring, and compliance needs documented proof).

The group in this case study did not buy a clinical AI product. They bought a **capability** — the ability to deploy AI within HIPAA's boundaries, on infrastructure they own, with a partner who maintains it against a regulatory standard that doesn't compromise. That is what Manteis Systems builds for healthcare.

---

## Technology Stack Summary

| Layer | Technology | Role |
|-------|-----------|------|
| LLM serving | Ollama | Local model inference (zero external API calls, zero data egress) |
| Vector database | ChromaDB | Tier 1: semantic search across operational knowledge (protocols, formularies) |
| EHR integration | Internal API + n8n | Tier 2: PHI pulled into context on-demand, processed, discarded — never persisted |
| Workflow automation | n8n | Pre-authorization drafting, clinical documentation, billing code suggestion, audit logging |
| Containerization | Docker | Isolated, reproducible deployment of all services |
| Cloud integration | MCP (Model Context Protocol) | Local mediation between AI and M365 (SharePoint, Exchange, Teams) |
| Productivity suite | M365 | SharePoint protocols, Exchange calendars, Teams department channels |
| Agent framework | Hermes | Autonomous workflow orchestration, scheduled clinical briefings |
| Security | Zero-trust network, VPN-only access, immutable audit logs | HIPAA Security Rule compliance, breach prevention |

---

*Case study prepared by Manteis Systems. All client identifiers withheld. Technology names referenced for architectural clarity only. No Protected Health Information appears in this document.*

*Tuesday, 2026-07-28 — weekly business development rotation*