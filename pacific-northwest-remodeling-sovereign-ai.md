# CASE STUDY: Sovereign AI Deployment for Pacific Northwest Remodeling Firm

## The Client
A Pacific Northwest remodeling company with an established reputation and a project pipeline driven by referrals. Their challenge wasn't winning work — it was the manual overhead of running the business.

## The Problem
Every project generated the same paperwork treadmill: proposals, client communications, project status updates, supplier coordination, invoice processing. Staff was drowning in document work. They wanted AI but had a hard requirement:

- **No cloud AI.** Client data, project details, pricing structures, and contractor relationships are proprietary. Sending them to a third-party API was a non-starter.

## The Architecture
Deployed a sovereign AI toolset — local LLMs running on their hardware, connected to their existing tools through a local MCP server. No cloud. No subscriptions. No data leaving the building.

**The stack:**
- **Ollama** serving local LLMs for content generation, email drafting, and document processing
- **n8n** orchestrating document workflows — proposal generation, client update templates, invoice processing
- **MCP server** brokering controlled AI access to their file system and email — the AI can draft, but humans approve before anything sends
- **Docker** containerized deployment running entirely on their infrastructure

## What We Built
1. **Proposal Generator** — Project details go in, formatted proposals come out. What used to take 45 minutes of manual drafting now takes 90 seconds of review.
2. **Client Communication Automation** — Incoming emails auto-classified by intent (scheduling, billing, design question, complaint). Draft responses generated for staff approval. Response time went from same-day to within-the-hour.
3. **Project Status Automation** — Weekly status reports generated from project data and emailed to clients automatically. No more manual status updates.
4. **Invoice Processing** — Supplier invoices OCR'd, categorized, and routed for approval. The data entry bottleneck eliminated.
5. **Marketing Content Engine** — The local LLM generates blog posts, social content, and project case studies from project photos and descriptions. The company now publishes content regularly without hiring a copywriter.

## The Result
The company became self-sufficient with the toolset. After the initial deployment, their internal team learned to maintain and extend the workflows themselves. No ongoing consultancy retainer required. No cloud subscription. No vendor dependency.

The toolset paid for itself in recovered staff hours within the first quarter.

## Why This Matters
This is the proof that sovereign AI isn't a theory. A small company with no DevOps team can run production AI on their own hardware and become self-sufficient. The deployment took weeks, not months. The team didn't need to learn Python — they learned n8n's visual workflow builder and took it from there.

The cloud AI vendors would have charged this company $2,000-5,000/month forever. Instead, they own the infrastructure.