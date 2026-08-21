# wscOS Architecture Diagram

> Reference architecture for the Manteis Sovereign OS proof-of-deployment.
> Anonymized — no client identifiers. This is the public-facing architecture
> diagram for sales decks, case studies, and the Manteis Systems knowledge base.
>
> Source: wscOS architecture.md (internal), BRAND-GUIDELINES.md §Reference Architecture.
> Created: 2026-08-21 | Status: DRAFT — Rhett approves before public use.

---

## System Overview — Three-Layer Architecture

```mermaid
graph TB
    subgraph STAFF["Staff Layer — Tier 1-2 Data"]
        ClaudeTeam["Claude Team / Claude Cowork"]
        AnyAI["Any AI Tool<br/>governed by data classification policy"]
    end

    subgraph ORCH["Orchestration Layer — Tier 3-4 Data"]
        Hermes["Hermes Agent<br/>Nous Research — active operator"]
        ClaudeAPI["Claude API<br/>agent workflow orchestration"]
        CommandCenter["wscOS Command Center<br/>43-tool IT agent + 11-view dashboard"]
    end

    subgraph INFERENCE["Private Inference Layer — AU79 Platform"]
        Spark1["DGX Spark 1<br/>GB10 Grace-Blackwell<br/>128GB unified memory<br/>vLLM · Qwen-72B · NFS · Storage"]
        Spark2["DGX Spark 2<br/>GB10 Grace-Blackwell<br/>128GB unified memory<br/>MCP · TEI · Qdrant · Open WebUI · ComfyUI"]
        Fabric["200G QSFP Fabric<br/>direct link · MTU 9000<br/>0.9ms RTT · 111 Gbps verified"]
        Spark1 ---|point-to-point| Fabric
        Fabric ---|point-to-point| Spark2
    end

    ClaudeTeam -->|Tier 1-2| ORCH
    AnyAI -->|Tier 1-2| ORCH
    ORCH -->|Tier 3-4| INFERENCE

    style STAFF fill:#0D0F12,stroke:#FF5500,stroke-width:1px,color:#F4F3EE
    style ORCH fill:#15181E,stroke:#FF5500,stroke-width:1px,color:#F4F3EE
    style INFERENCE fill:#1A1E24,stroke:#FF5500,stroke-width:1px,color:#F4F3EE
    style Hermes fill:#FF5500,stroke:#FF5500,color:#0D0F12
    style CommandCenter fill:#FF5500,stroke:#FF5500,color:#0D0F12
```

---

## Infrastructure Topology — Server & VM

```mermaid
graph TB
    subgraph ProdHost["HYPERV-02 — Production Hyper-V Host"]
        WSDC01["WSDC-01<br/>Domain Controller<br/>File Services · Print Server"]
        WSSQL01["WSSQL01<br/>SQL Server<br/>A2000 data · PowerBI source"]
        WSUTIL01["WSUTIL-01<br/>Azure AD Connect · RRAS VPN<br/>DUO Auth Proxy · SSL"]
        OPSDT["OPS-DT<br/>Critical legacy scripts<br/>A2000 → PowerBI/Excel pipeline"]
        SNIPEIT["SNIPE-IT<br/>Asset Management"]
        NAGIOS["NAGIOS<br/>Infrastructure Monitoring"]
    end

    subgraph BackupHost["HYPERV-BU-01 — Backup Hyper-V Host"]
        Veeam["Veeam Backup & Replication<br/>Nightly 7PM · 30 local + 30 cloud"]
        LabelMatrix["Label Matrix 2019<br/>Licensing manager"]
        Replication["Replication target<br/>for HYPERV-02"]
    end

    ProdHost -.->|replication| BackupHost

    style ProdHost fill:#0D0F12,stroke:#FF5500,stroke-width:1px,color:#F4F3EE
    style BackupHost fill:#15181E,stroke:#5C6370,stroke-width:1px,color:#F4F3EE
```

---

## Network Topology

```mermaid
graph TB
    Internet((Internet))
    Internet -->|Comcast Fiber<br/>50.175.82.210/29| Firewall

    subgraph FW["Netgate SG-5100 CARP Pair"]
        FW01["fw-renton-01<br/>192.168.0.2 — primary"]
        FW02["fw-renton-02<br/>192.168.0.3 — failover"]
    end

    Firewall --> FW
    FW -->|Gateway 192.168.0.1| LAN

    subgraph LAN["Internal LAN — 192.168.0.0/22"]
        WSDC01DNS["WSDC-01<br/>DNS/DHCP"]
        Ruckus["Ruckus Zone Director<br/>192.168.0.16 — Wi-Fi"]
        Servers["All servers, workstations,<br/>printers on this subnet"]
    end

    FW -->|SSTP VPN| Remote["Remote Access<br/>RRAS on WSUTIL01 → DUO MFA"]
    FW -.->|planned| Tailscale["Tailscale Mesh<br/>Entra ID SSO<br/>ACL-controlled access"]

    subgraph DGX["AU79 DGX Spark Cluster"]
        Spark1["spark1<br/>100.106.161.64"]
        Spark2["spark2<br/>100.86.172.35"]
        QSFP["200G QSFP<br/>192.168.100.1/2"]
        Spark1 --- QSFP
        QSFP --- Spark2
    end

    style FW fill:#15181E,stroke:#FF5500,stroke-width:1px,color:#F4F3EE
    style LAN fill:#0D0F12,stroke:#5C6370,stroke-width:1px,color:#F4F3EE
    style DGX fill:#1A1E24,stroke:#FF5500,stroke-width:1px,color:#F4F3EE
    style Tailscale stroke-dasharray: 5 5
```

---

## Agent Architecture — wscOS Command Center

```mermaid
graph TB
    subgraph Frontend["Frontend — React 19 / Vite"]
        Chat["Agent Chat"]
        Dashboard["Dashboard"]
        Tickets["Tickets"]
        Sprint["Sprint Board"]
        Assets["Assets"]
        Offboarding["Offboarding"]
        Reports["Reports<br/>MTTR/SLA analytics"]
        M365Health["M365 Health"]
        NetworkMap["Network Map"]
        Approvals["Approvals"]
        KB["Knowledge Base"]
    end

    subgraph Backend["Backend — Node.js / Express / TypeScript"]
        Context["context.ts<br/>System prompt builder<br/>dual-role charter"]
        Tools["tools.ts<br/>43 LLM tool definitions<br/>executeTool dispatcher"]
        LLM["llm.ts<br/>OpenAI-compatible client<br/>Ollama Cloud → AU79 spark1"]
        SOP["sop-engine.ts<br/>SOP catalog + trackable runs"]
        Proposals["proposals.ts<br/>Guarded-write framework<br/>human-gated approvals"]
        Notify["notify.ts<br/>Alerts + Teams webhook"]
        SprintStore["sprint-store.ts<br/>File-backed sprint board"]
        MCP["mcp.ts<br/>stdio MCP server<br/>43 tools as wscos_*"]
        Scheduler["scheduler/cron.ts<br/>tickets /5min · network /10min<br/>M365 /15min · security /30min"]
    end

    subgraph Integrations["Integration Layer — Read-Only by Construction"]
        Jira["Jira Service Manager<br/>✅ Live"]
        SnipeIT["Snipe-IT<br/>✅ Live"]
        M365["M365 / Entra Graph<br/>✅ Live"]
        Duo["Duo<br/>✅ Live"]
        MSSQL["WSSQL01 SQL Server<br/>🟡 Built, dormant"]
        Oracle["A2000 Oracle ERP<br/>🟡 Built, dormant"]
        PowerBI["Power BI REST<br/>🟡 Built, dormant"]
        NetMap["NetworkMap<br/>✅ Live"]
    end

    subgraph Security["Security Boundary"]
        SQLGuard["sql-guard.ts<br/>strips strings/comments<br/>rejects non-SELECT<br/>25+ forbidden keywords"]
        SensitivePath["isSensitivePath()<br/>refuses .env/dotfiles/agent/data"]
        AutoApprove["auto-approve.ts<br/>risk-tiered double gate<br/>code beats env"]
    end

    subgraph VectorDB["Knowledge Index"]
        LanceDB["LanceDB<br/>repo + Obsidian vault<br/>hash embeddings → TEI"]
    end

    Frontend --> Backend
    Backend --> Integrations
    Integrations --> SQLGuard
    Backend --> Security
    Backend --> VectorDB
    Scheduler --> Integrations

    style Frontend fill:#0D0F12,stroke:#FF5500,stroke-width:1px,color:#F4F3EE
    style Backend fill:#15181E,stroke:#FF5500,stroke-width:1px,color:#F4F3EE
    style Integrations fill:#1A1E24,stroke:#5C6370,stroke-width:1px,color:#F4F3EE
    style Security fill:#15181E,stroke:#FF4D00,stroke-width:2px,color:#F4F3EE
    style VectorDB fill:#1A1E24,stroke:#5C6370,stroke-width:1px,color:#F4F3EE
```

---

## Trust Model — Propose-to-Act Architecture

```mermaid
graph LR
    Agent["LLM Agent<br/>proposes action"]
    ProposeAction["propose_action<br/>files proposal"]
    AutoGate{"auto-approve.ts<br/>double gate check"}
    HumanGate{"Human Approval<br/>Approvals view"}
    Executor["Closed Executor Registry<br/>jira.comment · m365.revoke<br/>m365.remove_license · manual"]
    Audit["JSON Audit Trail<br/>data/proposals/"]

    Agent -->|initiates| ProposeAction
    ProposeAction --> AutoGate
    AutoGate -->|auto-eligible + enabled<br/>+ param guard + rate cap| Executor
    AutoGate -->|review-tier or disabled| HumanGate
    HumanGate -->|approved| Executor
    HumanGate -->|denied| Agent
    Executor --> Audit

    style Agent fill:#FF5500,stroke:#FF5500,color:#0D0F12
    style AutoGate fill:#15181E,stroke:#FFE566,stroke-width:1px,color:#F4F3EE
    style HumanGate fill:#15181E,stroke:#FF4D00,stroke-width:2px,color:#F4F3EE
    style Executor fill:#1A1E24,stroke:#5C6370,stroke-width:1px,color:#F4F3EE
    style Audit fill:#0D0F12,stroke:#5C6370,stroke-width:1px,color:#F4F3EE
```

**Key principles:**
- **Read-only by construction** — every SQL path passes `guardReadOnlySql()`; client modules expose no mutation
- **Propose-to-act by design** — the agent initiates changes only via `propose_action` → Approvals view → closed executor registry
- **Code beats env** — production-touching kinds (m365.*, AD/EDI/network) are `review`-tier in code and can never be auto-approved via environment variables
- **Double gate for autopilot** — a proposal executes unattended only if the kind is `auto-eligible` in code AND enabled in `AUTO_APPROVE_KINDS` AND `AUTO_APPROVE_ENABLED` is on, plus param guard and rate cap
- **Full audit trail** — every executed proposal logged to `data/proposals/` with identity, timestamp, parameters

---

## Scheduled Operations — Cron Loops

```mermaid
graph TB
    subgraph Cron["Scheduler — cron.ts"]
        T5["Tickets /5min<br/>+ new-ticket alerts"]
        N10["Network Watcher /10min<br/>offline alerts"]
        M15["M365 Health /15min"]
        S30["Security Sweep /30min"]
        I30["Infra Sweep /30min"]
        Brief["Morning Brief /weekday 07:00<br/>→ Alerts feed"]
        Reindex["Re-index /hourly"]
    end

    subgraph Workflows["Workflows"]
        Triage["auto-triage.ts<br/>LLM ticket triage → jira.comment proposals"]
        EDIWatch["edi-watch.ts<br/>drop-folder scan → Teams alerts"]
        SecWatch["security-watch.ts<br/>Entra spray/brute/risk + Defender<br/>24h signature dedup"]
        InfraWatch["infra-watch.ts<br/>VM/Veeam/disk transition alerts"]
        Offboard["offboarding.ts<br/>SOP-035, human-gated"]
    end

    T5 --> Triage
    S30 --> SecWatch
    I30 --> InfraWatch
    N10 --> EDIWatch

    style Cron fill:#0D0F12,stroke:#FF5500,stroke-width:1px,color:#F4F3EE
    style Workflows fill:#15181E,stroke:#5C6370,stroke-width:1px,color:#F4F3EE
```

---

## Domain Coverage — 43-Tool Full-Stack IT Agent

```mermaid
graph TB
    subgraph Domains["IT Surface Coverage"]
        Helpdesk["Helpdesk<br/>Jira — read + analytics + sprint board"]
        Network["Network / LAN<br/>NetworkMap — inventory + diagnostics"]
        SQL["SQL / Data<br/>WSSQL01 + A2000 Oracle<br/>behind sql-guard"]
        PowerBI["Power BI / Power Platform<br/>REST client + flow inventory"]
        M365Stack["M365 / Entra / Exchange / Teams<br/>reads live + forwarding audit"]
        AD["Active Directory<br/>account diagnosis, stale computers,<br/>password expiry, lockouts"]
        EDI["EDI / A2000 Monitoring<br/>X12 parser + drop-folder watcher"]
        HyperV["Hyper-V<br/>VM states, checkpoint sprawl, disks"]
        Storage["Storage & Backup<br/>Veeam job posture + disk capacity"]
        Security["Security Events<br/>Entra + Defender signals<br/>spray/brute-force heuristics"]
    end

    style Domains fill:#0D0F12,stroke:#FF5500,stroke-width:1px,color:#F4F3EE
    style Helpdesk fill:#15181E,stroke:#00D455,stroke-width:1px,color:#F4F3EE
    style Network fill:#15181E,stroke:#00D455,stroke-width:1px,color:#F4F3EE
    style SQL fill:#15181E,stroke:#FFE566,stroke-width:1px,color:#F4F3EE
    style PowerBI fill:#15181E,stroke:#FFE566,stroke-width:1px,color:#F4F3EE
    style M365Stack fill:#15181E,stroke:#00D455,stroke-width:1px,color:#F4F3EE
    style AD fill:#15181E,stroke:#00D455,stroke-width:1px,color:#F4F3EE
    style EDI fill:#15181E,stroke:#00D455,stroke-width:1px,color:#F4F3EE
    style HyperV fill:#15181E,stroke:#00D455,stroke-width:1px,color:#F4F3EE
    style Storage fill:#15181E,stroke:#00D455,stroke-width:1px,color:#F4F3EE
    style Security fill:#15181E,stroke:#00D455,stroke-width:1px,color:#F4F3EE
```

**Legend:** 🟢 Green border = Live · 🟡 Yellow border = Built, dormant (awaiting credentials/consent)

---

## AI Platform Build Order

```mermaid
graph LR
    Phase0["Phase 0<br/>Platform Foundation<br/>vLLM + TEI + Qdrant<br/>+ LiteLLM + Open WebUI"]
    Phase1["Phase 1<br/>Internal Knowledge Base<br/>RAG over M365/Z: docs"]
    Phase1b["Phase 1b<br/>Marketing Image Gen<br/>ComfyUI + SDXL/Flux"]
    Phase15["Phase 1.5<br/>Cowork MCP<br/>knowledge tool"]
    Phase2["Phase 2<br/>Shoe Expert RAG<br/>A2000 catalog + pricing"]
    Phase3["Phase 3<br/>Customer Service Swarm<br/>multi-agent + vLLM"]
    Phase4["Phase 4<br/>Demand Forecaster<br/>Amazon SP-API ML"]

    Phase0 --> Phase1
    Phase0 --> Phase1b
    Phase1 --> Phase15
    Phase1 --> Phase2
    Phase2 --> Phase3
    Phase2 --> Phase4

    style Phase0 fill:#FF5500,stroke:#FF5500,color:#0D0F12
    style Phase1 fill:#15181E,stroke:#FF5500,stroke-width:1px,color:#F4F3EE
    style Phase1b fill:#15181E,stroke:#FF5500,stroke-width:1px,color:#F4F3EE
    style Phase15 fill:#15181E,stroke:#5C6370,stroke-width:1px,color:#F4F3EE
    style Phase2 fill:#15181E,stroke:#5C6370,stroke-width:1px,color:#F4F3EE
    style Phase3 fill:#15181E,stroke:#5C6370,stroke-width:1px,color:#F4F3EE
    style Phase4 fill:#15181E,stroke:#5C6370,stroke-width:1px,color:#F4F3EE
```

**Status:** Hardware verified online (2026-05-14). Phase 0 software buildout gated on three dependencies: Entra admin consent for Graph API, Z: drive read-only service account, and data-classification sign-off.

---

## Key Metrics — What wscOS Proves

| Metric | Value |
|---|---|
| LLM tools | 43 |
| Dashboard views | 11 |
| Runnable skills | 26 |
| DGX Spark nodes | 2 (128GB unified memory each) |
| Fabric bandwidth | 200G QSFP (111 Gbps verified) |
| Live integrations | 5 (Jira, Snipe-IT, M365/Entra, Duo, NetworkMap) |
| Dormant integrations | 3 (WSSQL01, A2000 Oracle, Power BI — awaiting credentials) |
| Backup schedule | Nightly 7PM, 30 local + 30 cloud retention |
| Scheduled cron loops | 7 (tickets, network, M365, security, infra, morning brief, re-index) |
| Trust model | Read-only by construction, propose-to-act by design |
| Autopilot | Risk-tiered double gate, code beats env, ships off by default |

---

## What This Means for Manteis Systems Clients

When we deliver a Manteis One / Core / Fortress, we're delivering a configured version of a stack that is already running a real business. Not a demo. Not a pilot. Not a prototype. A production system with 43 tools, 11 dashboard views, 26 skills, and a proven governance model — running today, operating IT for a real manufacturer.

The wscOS reference architecture is the proof that sovereign AI works at enterprise scale.

---

*Diagram created 2026-08-21. Mermaid syntax — renders in GitHub, Obsidian, and any Mermaid-compatible viewer. Anonymized per Manteis Systems privacy policy.*