# CASE STUDY: Full-Stack AI Automation for Regional Footwear Manufacturer

## The Client
A regional footwear manufacturer with decades of production history. Complex IT stack spanning inventory management, order processing, customer communications, and supply chain coordination. Staff-dependent manual processes across every department.

## The Problem
The client's IT operations were manual, repetitive, and fragile — staff spending hours on tasks that should take minutes. They needed automation across their entire stack but had strict requirements:

- **No cloud dependency.** Proprietary manufacturing data, supply chain relationships, and pricing structures cannot leave their network.
- **No disruption.** Production cannot stop during deployment. The automation must layer onto existing infrastructure without breaking current workflows.
- **No black boxes.** The internal IT team needs to understand and maintain the system. No opaque third-party APIs they can't debug.

## The Architecture
Embedded on-staff to architect and deploy a full automation stack:

- **Compute Layer:** Ollama running local LLMs for document processing, email classification, and intelligent routing. Every model runs on-premises.
- **Automation Layer:** n8n orchestrating 15+ automated workflows across the business:
  - Order processing and fulfillment routing
  - Customer inquiry classification and response drafting
  - Inventory threshold monitoring and reorder alerts
  - Supply chain status tracking and anomaly detection
  - Internal report generation and distribution
- **Integration Layer:** MCP servers brokering controlled access to their existing systems — the AI can read inventory data, draft responses, and flag anomalies, but every action is logged and bounded by explicit permission rules.
- **Infrastructure Layer:** Docker containerized deployment with 15+ services running in production, managed through a unified interface. Full backup, monitoring, and health checking.

## What We Built

### Phase 1: Business Process Automation (DEPLOYED)
1. **Automated Order Pipeline** — Orders flow from intake through classification, routing, and fulfillment confirmation without manual touch. Exception cases flagged for human review.
2. **Intelligent Customer Communications** — Incoming emails and inquiries auto-classified by intent, drafted responses generated for staff approval, response time cut from hours to minutes.
3. **Inventory Intelligence** — Real-time stock monitoring with predictive reorder thresholds based on seasonal patterns and order velocity. The system flags low stock before it becomes a stockout.
4. **Document Automation** — Invoices, packing slips, compliance documents, and internal reports generated automatically from structured data.
5. **IT Operations Monitoring** — Automated health checks across the full container stack with alerting. The system watches itself.

**Result:** Manual processing time across automated workflows dropped approximately 70%. Customer response times went from same-day to within-the-hour. The internal team is now self-sufficient — they maintain and extend the system themselves.

### Phase 2: Autonomous IT Support Agent (IN DEVELOPMENT)
Building an AI agent — powered by the Hermes Agent framework — that doesn't just advise, it acts. This is the evolution from automation to autonomous operations.

**What the agent does:**
- **Jira Ticket Monitoring** — The agent watches Jira in real time, triaging incoming tickets by category, urgency, and complexity
- **Technician Guidance** — For every ticket, the agent analyzes the issue and guides the assigned technician toward first-call resolution — suggesting fixes, linking to relevant SOPs, and flagging similar past tickets
- **MDM Fleet Control** — The agent is integrated with the mobile device management (MDM) platform, giving it visibility and control over the full fleet of Windows, Linux, and Android devices
- **Scripted Fix Delivery** — When the agent identifies a known issue with a proven fix, it can — with human-in-the-middle approval — send a scripted fix directly to the affected machine. Not a recommendation. An actual fix, executed on the endpoint.
- **Automated SOP Generation** — After resolving an issue, the agent writes a standard operating procedure documenting the problem, the diagnosis, the fix, and the steps to reproduce. Every resolved ticket becomes institutional knowledge.

**The human-gated workflow:**
1. Ticket arrives in Jira
2. Agent triages and analyzes
3. Agent drafts a fix recommendation
4. Human technician reviews and approves (or rejects)
5. Agent executes the scripted fix on the target machine via MDM
6. Agent writes the SOP
7. Ticket closed with full documentation

This isn't a chatbot that tells you what might be wrong. It's an operational agent that identifies the problem, proposes the fix, gets human approval, executes the fix on the machine, and documents the entire process — automatically. Every resolved ticket makes the system smarter. Every SOP becomes institutional memory.

### Phase 3: Autonomous Security Operations Platform (PLANNED)
Extending the Elastic Stack security deployment into a full autonomous SOC — not just detection, but remediation.

**The architecture:**
- **Elastic Stack** — Centralized SIEM collecting logs, telemetry, and security events from every system across the network
- **pfSense Integration** — The firewall is wired into the security platform. The AI can read firewall rules, traffic flows, and threat indicators, and with human approval, modify firewall rules to block malicious traffic in real time
- **Endpoint Agents** — Every system in the fleet runs a local AI agent with security remediation capabilities. Not just monitoring — the agents can isolate a compromised machine, kill malicious processes, quarantine files, and apply patches
- **AI-Powered Triage** — Security events are analyzed by AI before alerting humans. False positives filtered. Genuine threats surfaced with full context: what happened, what system, what the agent did, what needs human decision

**The security remediation workflow:**
1. Elastic detects anomaly on endpoint (or endpoint agent detects locally)
2. AI agent analyzes the threat — classifies severity, identifies affected systems
3. Agent takes immediate containment action (isolate machine, kill process, block traffic at pfSense)
4. Agent drafts full remediation plan for human review
5. Human reviews and approves (or modifies)
6. Agent executes remediation across all affected systems
7. Agent writes the security incident report and updates the SOP
8. Firewall rules, endpoint policies, and detection rules auto-updated to prevent recurrence

The system gets smarter with every incident. Every threat that's detected and remediated becomes a new detection rule. Every resolution becomes an SOP. The security posture compounds over time — without hiring a SOC team.

### Phase 4: Proactive Infrastructure Monitoring — Printer Fleet (PLANNED)
The agent monitors the entire printer fleet for usability, supply levels, and predictive maintenance — because the dumbest help desk tickets are always about printers, and they should never reach a human.

**What the agent monitors:**
- **Supply Levels** — Toner, ink, paper levels tracked across every printer. Agent predicts when supplies will run out based on usage patterns and auto-generates replacement orders or alerts before the printer goes down
- **Usability Health** — Paper jams, connectivity issues, firmware status, queue backups. Agent detects degradation before the user picks up the phone
- **Proactive Ticket Generation** — When a printer starts showing signs of failure, the agent creates a Jira ticket before anyone complains, assigns it to the right technician, and includes diagnostics and recommended fix
- **Self-Healing** — Common printer issues (network connectivity, print spooler stuck, driver mismatch) — the agent attempts automated remediation with human approval, same workflow as IT support tickets
- **Usage Analytics** — Agent tracks which printers are overused, underused, or failing repeatedly — recommends fleet optimization to management

Nobody calls the help desk to say "the printer is working great." They call when it's broken and they're frustrated. This moves the entire printer support workflow from reactive to proactive — the agent knows the printer is dying before the user does.

### Phase 5: AI-Powered ERP Tooling and Frontends (PLANNED)
The organization runs on A2000, a GCS ERP system. Powerful but opaque — users interact with it through interfaces designed decades ago. The AI layer is being extended to build modern tooling and intelligent frontends on top of the ERP.

**What we're building:**
- **AI-Natural Language ERP Interface** — Instead of navigating legacy menus, users describe what they need in plain language. "Show me all open purchase orders for vendor X from last quarter." The AI translates that into the ERP query and returns the result in a clean modern interface.
- **Intelligent Data Entry** — The AI pre-fills forms, validates inputs against business rules, and flags anomalies before they hit the ERP. Reduces data entry errors and speeds up processing.
- **Custom Frontends** — Building modern web-based interfaces on top of the A2000 backend. The legacy system stays intact underneath — the AI layer sits between the user and the ERP, translating intent into action.
- **Automated Reporting** — The AI generates custom reports from ERP data on demand. No more exporting to Excel and manually formatting — the AI queries, aggregates, and presents the data in real time.
- **Workflow Automation** — ERP workflows (approvals, routing, notifications) automated through the AI layer. The ERP becomes an engine the AI drives, not a maze users navigate.

The ERP is the backbone. The AI is the nervous system. Users get a modern, intelligent interface without ripping out the system that runs the business.

## The Deployment
- **Engagement Model:** On-staff embedded deployment — working alongside the internal IT team
- **Timeline:** Phased rollout over several months, each workflow tested in parallel before going live
- **Infrastructure:** Docker containerized, 15+ services, local LLMs via Ollama, n8n orchestration, MCP integration layer
- **Security Posture:** Zero bytes leave the network. All AI inference runs on-premises. All data stays on hardware the client owns.

## Why This Works
The cloud vendors won't build this — there's no SaaS revenue in helping companies run AI on their own hardware. The traditional consultants don't know how — they sell cloud migrations, not local-first sovereignty. This is a gap in the market that exists because nobody with 20 years of enterprise IT experience has bothered to productize the local-first approach.

Until now.