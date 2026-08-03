# Case Study — Religious Organization

> AI transformation across support, media management, and security for a multi-site religious organization.

---

## Client Profile

- **Industry:** Religious organization / Nonprofit
- **Size:** 500+ employees across parishes and schools
- **Location:** Pacific Northwest
- **Challenges:** Overwhelmed support team, unsearchable media archive, no security monitoring, limited IT staff

---

## The Solution

### Three AI Systems Deployed

#### System 1: Parish Support Agent
- **Platform:** Microsoft Copilot Studio
- **Purpose:** Answers questions about custom ParishStaq/Pushpay application
- **Capabilities:**
  - Understands full application functionality and workflows
  - Natural language question answering for staff and parishioners
  - Reduces support ticket volume and resolution time
  - Learns from interaction patterns to improve responses

#### System 2: AI-Powered Digital Asset Management
- **Custom Python/AI Pipeline** — built from scratch
- **Capabilities:**
  - **Visual AI Description** — Computer vision models generate descriptive metadata automatically
  - **Archival Tagging System** — Auto-tags with predetermined categories (event type, liturgical season, location, ceremony type)
  - **Facial Recognition** — Identifies individuals across entire archive, searchable by person
  - **Searchable Catalog** — Full archive searchable by description, tag, person, date, or combination

#### System 3: Automated Security Detection Platform
- **Elastic Stack (ELK)** — Elasticsearch, Logstash, Kibana, Beats
- **Claude AI Integration** — AI-powered security event triage and analysis
- **Capabilities:**
  - Centralized log collection and SIEM
  - Real-time monitoring for indicators of compromise
  - AI-powered false positive reduction
  - Intelligent alerting — only genuine threats reach human operators

---

## Architecture

| System | Technology | Purpose |
|--------|-----------|---------|
| Parish Support Agent | Microsoft Copilot Studio | Application support and training |
| DAM Engine | Python + Computer Vision | Media archive management |
| Security Platform | Elastic Stack + Claude AI | Security monitoring and triage |

All systems run within the organization's existing infrastructure — no major hardware procurement required.

---

## Results

### Quantified Impact
- **Support tickets** for ParishStaq app dramatically reduced — users get instant answers from AI agent
- **Decades of media archives** transformed from unsearchable black box into intelligent, searchable asset library
- **Security posture** transformed from zero monitoring to enterprise-grade automated detection
- **Three distinct AI systems** deployed across support, media management, and security
- **Small IT team** operates with enterprise-grade capabilities without adding headcount

### Qualitative Impact
- Staff freed from repetitive support questions
- Decades of media history now accessible and searchable
- Enterprise-grade security without hiring a SOC team
- AI applied across completely different operational domains with different architectures

---

## Technical Details

### Infrastructure
- **Support Agent:** Microsoft Copilot Studio within M365 ecosystem
- **DAM Engine:** Custom Python pipeline with computer vision models
- **Security Platform:** Elastic Stack with Claude AI integration
- **Integration:** Pushpay/ParishStaq API integration

### Security
- Centralized security monitoring
- AI-powered threat detection and triage
- Real-time alerting
- Full audit logging

---

## Lessons Learned

1. **AI isn't one product** — different problems require different architectures
2. **Embedded deployment** — working within existing infrastructure minimized disruption
3. **Small team, big capability** — AI multiplies the effectiveness of limited IT staff
4. **Privacy matters** — all systems run within their infrastructure, no cloud dependencies for sensitive data

---

## Next Steps

- Expand support agent to additional applications
- Deploy facial recognition to additional archives
- Extend security platform to additional locations
- Build custom reporting dashboards

---

*Client: Religious Organization*
*Deployed: 2026*
*Maintained by: Manteis Systems*
