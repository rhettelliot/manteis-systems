# How to Build an AI Agent in 2026

**A practical guide to deploying agents that think locally, act carefully, and stay under your control.**

> **Author:** Manteis Systems
> **Category:** Sovereign AI
> **Reading time:** ~7 minutes

---

## What an AI agent actually does

An AI agent is not a chatbot that waits for prompts. It is a system that observes, decides, proposes, and acts — with a human reviewing the important moves.

A good agent in 2026 perceives what is happening, reasons about what should happen next, and acts only through gates you control. This guide covers how to build one that runs on your hardware, respects your boundaries, and integrates with the systems you already use.

---

## Step 1: Choose a stack you can own

You do not need a cloud AI platform to build a capable agent. The open stack we use at Manteis is deployable in a day.

| Component | What it does | Why it matters |
|-----------|--------------|----------------|
| **Hermes Agent** | The runtime that runs scheduled tasks, skills, and multi-step operations | This is the brain. It handles the loop: observe → plan → propose → execute or escalate. |
| **Ollama** | Serves language models locally | No API keys. No egress. You pick the model that fits your hardware and task. |
| **Docker** | Containerizes the entire stack | Reproducible deployments, clean updates, easy backups, no dependency drift. |
| **n8n** | Visual workflow automation | Connects documents, email, APIs, approvals, and notifications without writing code. |
| **ChromaDB** | Vector memory for documents | Your agent can search your knowledge base without that data leaving the box. |
| **MCP** | Tool protocol | A standard way for the agent to talk to Jira, SQL, M365, AD, and anything else you run. |

---

## Step 2: Define what the agent is for

The biggest mistake in agent projects is building a general assistant and hoping it becomes useful. Start narrow. Define one or two specific roles.

Examples we have deployed:

- **IT support agent:** reads new Jira tickets, checks the affected system, proposes a fix, and asks a technician to approve it.
- **Document routing agent:** watches an intake inbox, classifies attachments, and routes them to the right department with a drafted summary.
- **Security triage agent:** consumes logs and alerts, scores them by severity, and opens tickets for the issues that need human eyes.
- **Inventory agent:** monitors stock thresholds and drafts reorder requests for a buyer to approve.

The agent does not need to be clever across every domain. It needs to be reliable in one.

---

## Step 3: Give the agent safe tools

An agent without tools is just a chat interface. An agent with too many tools is dangerous. Start with read-only or low-risk actions, then add writes slowly.

A safe progression:

1. **Read tools only** — query tickets, search documents, check system status, read logs.
2. **Drafting tools** — write email drafts, ticket comments, or report summaries that a human sends.
3. **Low-risk writes** — update a status field, restart a non-critical service, clear a known alert.
4. **Production-touching writes** — only after the agent has proven itself and only behind human approval.

MCP standardizes how the agent discovers and calls tools, so you can swap systems later without rebuilding the agent.

---

## Step 4: Build the human gate

The single most important architectural decision is this: **the agent proposes, the human approves.**

We enforce this with a simple rule: any action that changes production data, spends money, deletes something, or touches a person must pass through a human-gated approval step.

Low-risk actions can be auto-approved after the agent has a track record. But the gate must exist. It should be visible. And it should log everything.

A practical approval flow: the agent observes, proposes with reasoning, and routes the request to the right human. The human approves, rejects, or asks for more information. Only then does the action execute — and everything is logged. This is not friction for friction's sake. It is the mechanism that lets you trust the agent enough to give it real work.

---

## Step 5: Add memory without exposing data

An agent needs context to be useful. It needs to know your SOPs, your past tickets, your inventory rules, your security playbooks. That memory should be local.

Use a vector store like ChromaDB or LanceDB to index documents and operational data. The agent retrieves relevant chunks when it needs them. The index lives on your hardware. The embeddings never leave your network.

Keep the knowledge base current. Outdated memory makes agents confidently wrong. Set up workflows that re-index documents when they change.

---

## Step 6: Run it in containers

Docker is not optional for production agents. It gives you:

- **Reproducibility:** the same stack runs in dev, staging, and production
- **Isolation:** the agent runtime, model server, vector store, and tools do not interfere with each other
- **Rollback:** if an update breaks something, you restore the previous image
- **Backup:** snapshot the volumes and you can rebuild the entire system on new hardware

A minimal production agent deployment has containers for:

- Hermes / agent runtime
- Ollama
- Vector store
- MCP servers
- Workflow engine (n8n)
- Web dashboard

Start with `docker compose`.

---

## Step 7: Test in a closed loop

Before the agent touches live systems, give it a sandbox that mirrors production. Let it propose actions and see whether those proposals are correct. Do not let it execute yet.

Measure whether its proposals are correct, whether its reasoning matches a human, and whether it asks for help when uncertain. Only when the agent is consistently right in propose-only mode do you open the first low-risk execution gate.

---

## Step 8: Deploy and monitor

A deployed agent is not a finished project. It is a system that needs watching.

Monitor proposals, approvals, rejections, errors, latency, and security logs. Build a dashboard that shows what the agent is doing in plain language. "Reviewed 23 tickets. Proposed 4 actions. Approved 3. Rejected 1. 0 production writes." That is the summary a non-technical manager should see.

---

## A real example

At a regional footwear manufacturer, we built an IT operations agent that monitors tickets, queries affected systems, proposes fixes, and routes them to technicians for approval. It does not replace technicians. It removes the busywork — checking, searching, status-gathering — so people spend their time on decisions and repairs.

After deployment, the volume of manually triaged tickets dropped, response times improved, and operational knowledge stayed inside the company instead of leaking into a cloud service.

---

## The takeaway

Building an AI agent in 2026 is not about picking the biggest model or the flashiest platform. It is about building a system that:

- Runs on infrastructure you control
- Has a narrowly defined, useful role
- Connects to your existing tools through standard protocols
- Proposes actions before it takes them
- Keeps a complete audit trail
- Improves over time

Do that, and you have an agent your business can trust with real work.

At Manteis Systems, we design and deploy sovereign AI agents for companies that cannot send their data to the cloud. If you want an agent that runs on your hardware and follows your rules, **[book a Discovery Call](https://manteis.systems)**.

**[Book a Discovery Call](https://manteis.systems)** and we will map your first agent role to the right local stack.

---

*Manteis Systems — Your intelligence should be an asset, not a subscription.*
