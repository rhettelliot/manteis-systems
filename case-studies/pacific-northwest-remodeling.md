# Case Study — Pacific Northwest Remodeling Firm

> Sovereign AI content pipeline for a custom home renovation company.

---

## Client Profile

- **Industry:** Home remodeling and construction
- **Size:** 15-30 employees
- **Location:** Pacific Northwest
- **Challenges:** Manual content production, slow proposal turnaround, data privacy requirements, no AI infrastructure

---

## The Solution

### Hardware
- Mac Mini M2 Pro / equivalent on-prem hardware
- Ollama for local LLM inference
- n8n for workflow automation
- MCP (Model Context Protocol) for integration
- Vector storage for semantic search

### Software Stack
- **Ollama** — local LLMs for content generation
- **n8n** — workflow automation for document intake and routing
- **MCP** — controlled access to existing tools and file systems
- **Vector Database** — semantic search across project archive

### What We Built
1. **Content Generation Pipeline** — Marketing copy, social media posts, and project descriptions generated from local models trained on their brand voice
2. **Proposal Drafting System** — Automated first-draft proposals from project requirements
3. **Project Documentation Engine** — Auto-generates project summaries, change orders, and completion reports
4. **Knowledge Base** — Semantic search across all past projects, materials, and client interactions

---

## Results

### Quantified Impact
- **Content production time** reduced from hours to minutes
- **Proposal turnaround** cut by 60%
- **Project documentation** generated automatically instead of manually
- **Zero cloud AI costs** — infrastructure runs on hardware they already own
- **Full data sovereignty** — every byte stays inside their network
- **Team self-sufficient** — they build their own AI workflows without external help

### Qualitative Impact
- Client owns the entire stack — no recurring SaaS fees
- No vendor lock-in
- Staff trained to extend the system independently
- Privacy clauses in client contracts fully satisfied

---

## Technical Details

### Infrastructure
- **Deployment:** 4-week phased rollout
- **Containers:** Docker Compose with 4+ services
- **Integration:** MCP servers for controlled tool access
- **Audit:** Full audit logging on all AI actions

### Security
- All data stays on-prem — zero external transmission
- Role-based access control
- Full audit trail of AI actions
- No cloud dependencies

### ROI Calculation
- **Hardware cost:** $2,000-$5,000
- **Implementation:** $15,000-$30,000
- **Monthly savings:** $5,000+ (staff time)
- **Payback period:** 3-6 months
- **Year 2+ ROI:** 100%+ (no ongoing SaaS costs)

---

## Lessons Learned

1. **Privacy-first wins** — the client's data sovereignty requirements were non-negotiable, and sovereign AI delivered
2. **Train the team** — investing in internal capability created lasting value
3. **Phase the rollout** — incremental adoption drove higher team confidence
4. **Open source stack** — no licensing fees means the client owns the infrastructure

---

## Next Steps

- Expand to additional departments
- Add custom AI agents for client communication
- Integrate with accounting software
- Build mobile app for field workers

---

*Client: Pacific Northwest Remodeling Firm*
*Deployed: 2026*
*Maintained by: Manteis Systems*
