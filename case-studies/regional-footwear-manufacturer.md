# Case Study — Regional Footwear Manufacturer

> Full-stack AI automation for a footwear manufacturing and retail operation.

---

## Client Profile

- **Industry:** Footwear manufacturing and retail
- **Size:** 100-500 employees
- **Location:** Pacific Northwest
- **Challenges:** Manual IT processes, supply chain coordination, inventory management, no AI automation, strict data sovereignty requirements

---

## The Solution

### Engagement Model
- On-staff embedded deployment — working alongside the internal IT team
- Phased rollout over several months
- Full knowledge transfer to internal team

### Hardware
- On-prem servers and workstations
- Ollama for local LLM inference
- Docker for containerized services

### Software Stack
- **Ollama** — local LLMs for document processing and intelligent routing
- **n8n** — 15+ automated workflows across the business
- **MCP** — controlled access to existing systems
- **Docker** — 15+ containerized services in production
- **Elastic Stack** — security monitoring and SIEM
- **Hermes Agent** — autonomous IT operations

### What We Built

#### Phase 1: Business Process Automation
1. **Automated Order Pipeline** — Orders flow from intake through classification, routing, and fulfillment confirmation without manual touch
2. **Intelligent Customer Communications** — Incoming emails auto-classified by intent, drafted responses generated for staff approval
3. **Inventory Intelligence** — Real-time stock monitoring with predictive reorder thresholds
4. **Document Automation** — Invoices, packing slips, compliance documents generated automatically
5. **IT Operations Monitoring** — Automated health checks across the full container stack

#### Phase 2: Autonomous IT Support Agent
Building an AI agent powered by Hermes Agent framework that doesn't just advise — it acts.

- **Jira Ticket Monitoring** — Real-time ticket triage by category, urgency, and complexity
- **Technician Guidance** — AI analyzes issues and guides technicians toward first-call resolution
- **MDM Fleet Control** — Visibility and control over full fleet of Windows, Linux, and Android devices
- **Scripted Fix Delivery** — With human approval, sends scripted fixes directly to affected machines
- **Automated SOP Generation** — Every resolved ticket becomes institutional knowledge

**Human-gated workflow:**
1. Ticket arrives in Jira
2. Agent triages and analyzes
3. Agent drafts fix recommendation
4. Human technician reviews and approves
5. Agent executes scripted fix on target machine
6. Agent writes SOP
7. Ticket closed with full documentation

#### Phase 3: Autonomous Security Operations Platform
Extending Elastic Stack security deployment into full autonomous SOC.

- **Elastic Stack** — Centralized SIEM collecting logs and security events
- **pfSense Integration** — AI can read firewall rules and modify them to block malicious traffic
- **Endpoint Agents** — Local AI agents with security remediation capabilities
- **AI-Powered Triage** — Security events analyzed by AI before alerting humans

#### Phase 4: Proactive Infrastructure Monitoring
Agent monitors printer fleet for usability, supply levels, and predictive maintenance.

- **Supply Level Tracking** — Predicts when supplies will run out
- **Usability Health** — Detects degradation before users report issues
- **Proactive Ticket Generation** — Creates tickets before anyone complains
- **Self-Healing** — Attempts automated remediation with human approval

#### Phase 5: AI-Powered ERP Tooling
Building modern intelligent frontends on top of legacy A2000 ERP system.

- **Natural Language ERP Interface** — Users describe what they need in plain language
- **Intelligent Data Entry** — AI pre-fills forms and validates inputs
- **Custom Frontends** — Modern web interfaces on top of legacy backend
- **Automated Reporting** — Custom reports generated from ERP data on demand

---

## Results

### Quantified Impact
- **Manual processing time** reduced by estimated 70%
- **Customer response times** dropped from same-day to within-the-hour
- **Inventory stockout incidents** reduced significantly through predictive alerting
- **Internal IT team** now self-sufficient in maintaining and extending automation
- **Zero cloud AI spend** — entire intelligence layer runs on hardware they own
- **Zero bytes** of proprietary data transmitted externally

### Qualitative Impact
- Competitive moat: custom-built automation tailored to their workflows
- Internal team trained to build new workflows independently
- No vendor lock-in
- Production never disrupted during deployment

---

## Technical Details

### Infrastructure
- **Containers:** 15+ Docker services in production
- **Workflows:** 15+ n8n automated workflows
- **Engagement:** On-staff embedded deployment
- **Timeline:** Phased rollout over several months

### Security
- All data stays on-prem
- Zero cloud dependencies
- Full audit logging
- Role-based access control

### ROI Calculation
- **Cloud alternative cost:** $30-60K/year in SaaS fees
- **Our deployment:** Runs on hardware they already own
- **Ongoing cost:** Maintenance only, handled by trained internal team
- **Year 1 ROI:** 300%+
- **Year 2+ ROI:** Infinite (no SaaS fees)

---

## Lessons Learned

1. **Embedded deployment works** — working alongside the IT team built trust and capability
2. **Phase the rollout** — parallel testing before going live prevented disruption
3. **Train for independence** — the goal was to make ourselves obsolete
4. **No cloud is possible** — full AI automation without any cloud dependency

---

## Next Steps

- Deploy additional AI agents for supply chain management
- Expand security platform to additional locations
- Build custom mobile app for warehouse staff
- Integrate with shipping carriers for automated tracking

---

*Client: Regional Footwear Manufacturer*
*Deployed: 2026*
*Maintained by: Manteis Systems*
