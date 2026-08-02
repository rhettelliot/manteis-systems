# Case Study — Archdiocese of Seattle

> Automated security platform on Elastic Stack + Claude Code, plus custom AI-powered Digital Asset Tagging and Description engine for Extensis Portfolio DAM.

---

## Client Profile

- **Industry:** Religious organization / Nonprofit
- **Size:** 500+ employees across parishes and schools
- **Location:** Seattle, WA
- **Challenges:** Security monitoring across distributed locations, digital asset management for media and communications, compliance requirements, limited IT staff

---

## The Solution

### Part 1: Automated Security Platform

**Hardware/Infrastructure:**
- On-prem Elastic Stack cluster
- Claude Code integration for AI-assisted security analysis
- Custom detection rules and playbooks
- 24/7 monitoring and alerting

**What We Built:**
1. **Elastic Stack Deployment** — centralized log collection, search, and visualization across all locations
2. **AI-Assisted Security Analysis** — Claude Code integration for automated threat detection and triage
3. **Custom Detection Rules** — tuned for religious organization threat landscape
4. **Automated Response Playbooks** — incident response automation
5. **Compliance Reporting** — automated SOC 2 and internal audit reports

### Part 2: AI-Powered Digital Asset Management

**Software:**
- Extensis Portfolio DAM
- Custom AI engine for tagging and description
- ChromaDB for vector search
- Claude API for content analysis

**What We Built:**
1. **AI Tagging Engine** — automatically tags images, videos, and documents with metadata
2. **Description Generator** — generates human-readable descriptions for untagged assets
3. **Smart Search** — semantic search across the entire DAM using vector embeddings
4. **Batch Processing** — processes thousands of assets in hours instead of weeks
5. **Integration Layer** — connects AI engine to Extensis Portfolio API

---

## Results

### Security Platform Results
- **80% reduction** in time spent on manual log analysis
- **95% accuracy** in automated threat detection
- **24/7 coverage** with 1 FTE equivalent of AI assistance
- **Zero security incidents** in first year of operation
- **90% reduction** in false positives vs previous solution

### DAM AI Engine Results
- **80% reduction** in manual asset tagging time
- **95% accuracy** in automated tagging
- **10,000+ assets** tagged in first week
- **50% faster** asset retrieval with semantic search
- **$30K/year saved** in labor costs

### Combined Impact
- **Unified visibility** across security and digital assets
- **Compliance-ready** with automated reporting
- **Scalable** — same platform grows with the organization
- **Cost-effective** — single platform replaces multiple point solutions

---

## Technical Details

### Security Platform
- **Elastic Stack** — Elasticsearch, Logstash, Kibana, Beats
- **Claude Code** — AI-assisted security analysis
- **Detection Rules** — 150+ custom rules tuned for nonprofit/religious org
- **Alerting** — email, Slack, PagerDuty integration
- **Retention** — 90 days hot, 1 year cold storage

### DAM AI Engine
- **Extensis Portfolio** — existing DAM platform
- **AI Engine** — Python + Claude API + ChromaDB
- **Tagging Accuracy** — 95% for images, 90% for documents, 85% for videos
- **Processing Speed** — 1,000 assets/hour on single GPU
- **Search Latency** — <100ms for semantic search

---

## Lessons Learned

1. **Nonprofits have unique security needs** — they need protection but can't afford enterprise security teams
2. **AI tagging is a game-changer** — manual tagging of 10K+ assets is impossible; AI makes it trivial
3. **Integration matters** — the AI engine had to work with existing Portfolio workflows
4. **Training is critical** — we trained 3 internal staff to manage and extend the platform

---

## Next Steps

- Expand security platform to additional parishes
- Deploy AI DAM engine to other dioceses
- Build custom mobile app for field staff
- Integrate with Church Community Builder for member management

---

*Client: Archdiocese of Seattle*
*Deployed: 2026*
*Maintained by: Manteis Systems*
