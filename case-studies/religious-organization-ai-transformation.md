# CASE STUDY: AI Transformation for Religious Organization

## The Client
A major religious organization with parishes across a wide geographic region. Complex digital infrastructure including a custom giving and engagement platform, extensive media archives spanning decades, and an IT environment requiring enterprise-grade security monitoring.

## The Problem
The organization faced three distinct challenges across different operational areas:

1. **Member Support** — Their custom Pushpay-based application (ParishStaq) had complex functionality that staff and parishioners struggled to navigate. Support requests overwhelmed a small IT team.

2. **Media Archive Chaos** — Decades of photos, videos, and digital assets with no organized catalog. No searchable index. No way to find specific images, events, or people across the archive. Manual tagging was impossible at scale.

3. **Security Blind Spots** — No centralized security monitoring. Threats could go undetected for days or weeks. The organization needed enterprise-grade detection but couldn't afford a 24/7 SOC team.

## What We Built — Three AI Systems

### System 1: ParishStaq Support Agent
Built an AI agent using Microsoft Copilot Studio that answers questions about the organization's custom Pushpay-based application.

- The agent understands the ParishStaq app's full functionality, workflows, and common user issues
- Staff and parishioners can ask natural language questions and get instant answers
- Reduces support ticket volume and resolution time
- Integrates with the existing Microsoft ecosystem
- The agent learns from interaction patterns to improve responses over time

### System 2: AI-Powered Digital Asset Management System
Built a custom AI-powered DAM tool from scratch that catalogs and manages the organization's extensive media archive.

- **Visual AI Description** — Every image is analyzed by computer vision models that generate descriptive metadata automatically. No manual captioning required.
- **Archival Tagging System** — Images are auto-tagged with a predetermined set of archival categories — event type, liturgical season, location, ceremony type, and more.
- **Facial Recognition** — Built-in facial recognition identifies individuals across the entire archive. Search for a person and find every photo they appear in, across decades of media.
- **Searchable Catalog** — The full archive becomes searchable by description, tag, person, date, or any combination. What was a black box is now a queryable database.

This system transformed an unorganized media archive into a structured, searchable, intelligent asset library — work that would have taken years manually was completed automatically.

### System 3: Automated Security Detection Platform
Deployed a full security monitoring stack using Elastic Stack integrated with Claude AI for intelligent threat analysis.

- **Elastic Stack** — Centralized log collection, SIEM, and security analytics across the organization's infrastructure
- **Claude AI Integration** — AI-powered analysis of security events, reducing false positives and surfacing genuine threats with context
- **Automated Detection** — The platform monitors for indicators of compromise, anomalous access patterns, and policy violations in real time
- **Intelligent Alerting** — Security events are triaged by AI before reaching human operators — only genuine threats trigger alerts, not noise

The organization went from no security monitoring to enterprise-grade detection without hiring a SOC team.

## The Architecture

All three systems run within the organization's existing infrastructure:

- **Microsoft Copilot Studio** — Powering the ParishStaq support agent within the M365 ecosystem
- **Custom Python/AI Pipeline** — The DAM tool uses computer vision models for image description, facial recognition, and auto-tagging
- **Elastic Stack (ELK)** — Elasticsearch, Logstash, Kibana, and Beats for security data collection, analysis, and visualization
- **Claude AI (Anthropic)** — Integrated with Elastic for intelligent security event triage and analysis
- **Pushpay Integration** — The support agent is connected to the ParishStaq platform's data model and workflows

## The Outcome

- Support tickets for the ParishStaq app dramatically reduced — users get instant answers from the AI agent instead of waiting for human support
- Decades of media archives transformed from an unsearchable black box into an intelligent, searchable asset library with facial recognition
- Security posture transformed from zero monitoring to enterprise-grade automated detection with AI-powered triage
- Three distinct AI systems deployed across support, media management, and security — each solving a different operational challenge
- Small IT team now operates with enterprise-grade capabilities without adding headcount

## What This Proves

This deployment demonstrates something the cloud AI vendors won't tell you: AI isn't one product. It's a capability layer that can be applied across completely different operational domains — support, media management, security — using different architectures for each.

The ParishStaq agent uses Copilot Studio. The DAM tool uses custom computer vision. The security platform uses Elastic + Claude. Three different AI architectures, three different problems, one organization, one operator.

AI isn't a SaaS subscription. It's infrastructure you build for the specific problems you have. The tools change. The expertise to deploy them is the product.

---

*Deployment by Manteis Systems. [manteis.systems](https://manteis.systems)*