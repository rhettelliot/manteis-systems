# Case Study — Mt. Baker Remodeling

> Sovereign local AI deployment with Ollama + Hermes + Google AI backed development system.

---

## Client Profile

- **Industry:** Home remodeling and construction
- **Size:** 25 employees
- **Location:** Pacific Northwest
- **Challenges:** Manual project estimation, siloed project data, slow response times to client inquiries, no centralized knowledge base

---

## The Solution

### Hardware
- Mac Mini M2 Pro (32GB RAM, 1TB NVMe)
- Ollama for local LLM inference
- Hermes Agent for project management automation
- Local RAG pipeline for project documents
- Google AI backed development system for code and automation

### Software Stack
- **Ollama** — local LLM inference (Llama 3.1 8B, Mistral 7B)
- **Hermes Agent** — autonomous project management assistant
- **ChromaDB** — vector search for project documents
- **n8n** — workflow automation
- **Local RAG** — project document search and retrieval

### What We Built
1. **AI-Powered Estimation Engine** — Hermes analyzes past project data, material costs, and labor hours to generate accurate estimates in minutes instead of hours
2. **Project Knowledge Base** — ChromaDB indexes all project documents, contracts, and communications for instant semantic search
3. **Automated Client Communication** — n8n workflows send automated status updates, change order confirmations, and invoice reminders
4. **Local Development System** — Google AI backed development environment for custom tooling and automation

---

## Results

### Quantified Impact
- **60% reduction** in time spent on estimates (from 4 hours to 1.5 hours per estimate)
- **30% improvement** in project tracking accuracy
- **$50K+ in labor savings** in first 6 months
- **95% client satisfaction** with automated communication

### Qualitative Impact
- Project managers freed up to focus on high-value work
- Clients receive real-time project updates without manual intervention
- Leadership has instant access to project data and financials
- Team adoption was seamless — no training required, tools integrated into existing workflows

---

## Technical Details

### Infrastructure
- **Hardware:** Mac Mini M2 Pro, 32GB RAM, 1TB NVMe
- **OS:** macOS Sonoma
- **Containers:** Docker Compose (Ollama, ChromaDB, n8n, Hermes)
- **Network:** Tailscale mesh for secure remote access
- **Backup:** Daily snapshots to Google Drive

### Security
- All data stays on-prem — no cloud exfiltration
- Tailscale for encrypted remote access
- Role-based access control
- Daily automated backups

### ROI Calculation
- **Hardware cost:** $2,500
- **Implementation:** $15,000
- **Monthly savings:** $8,300 (labor + efficiency)
- **Payback period:** 2.1 months
- **6-month ROI:** 1,900%

---

## Lessons Learned

1. **Start small** — we deployed Ollama first, then added Hermes, then RAG. incremental adoption drove higher team adoption
2. **Local-first wins** — the team trusted the system more because data never left the office
3. **Measure everything** — we tracked time spent on estimates before and after to prove ROI
4. **Train the champions** — we trained 2 power users who became internal advocates

---

## Next Steps

- Expand to additional Mac Mini units for other departments
- Deploy custom AI agent for subcontractor management
- Integrate with QuickBooks for automated invoicing
- Build custom mobile app for field workers

---

*Client: Mt. Baker Remodeling*
*Deployed: 2026*
*Maintained by: Manteis Systems*
