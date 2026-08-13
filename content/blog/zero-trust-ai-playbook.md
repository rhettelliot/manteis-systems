# The Zero Trust AI Infrastructure Playbook

**How to deploy AI agents so they never have more access than they need — and never act without oversight.**

> **Author:** Manteis Systems
> **Category:** Sovereign AI Security
> **Reading time:** ~7 minutes

---

## What zero trust means for AI

Zero trust is a simple idea with difficult execution: *never assume a device, user, or process is safe just because it is inside your network. Verify everything. Limit access. Log everything. Expect compromise.*

Most businesses understand this for people and devices. Few have applied it to AI agents. That is a problem, because an AI agent with broad access is not a productivity tool — it is a privileged account that thinks and acts faster than a human.

If an agent can read your documents, open tickets, and restart services, it is a target. If it can do those things without oversight, it is a risk. Zero trust for AI means designing the system as if the agent will be compromised — and limiting the damage when it is.

---

## Principle 1: Gate every destructive action

The foundation of safe AI operations is human approval for anything that matters.

We use a simple classification at Manteis:

- **Read-only actions:** the agent can execute freely. Examples: checking status, searching documents, reading logs, drafting summaries.
- **Low-risk writes:** auto-approved after the agent has proven reliable. Examples: updating a status field, posting a comment, restarting a non-critical service.
- **Destructive or production-touching actions:** always require human approval. Examples: deleting data, modifying a customer record, changing firewall rules, sending mass communications, spending money.

The gate should be explicit, not implicit. The agent proposes. A human reviews. The system logs the decision. This slows down some workflows, but it is the only way to safely give an agent real authority.

Auto-approval can expand over time, but only after the agent has a documented track record and the business has defined clear boundaries.

---

## Principle 2: Segment the network around the agent

An AI agent should live in its own network zone. It should not have direct access to user workstations, sensitive databases, or production servers by default.

A practical segmentation model:

- **Agent zone:** the compute running the agent runtime, models, and vector memory
- **Tool zone:** the services the agent talks to — Jira, SQL, AD, email, monitoring
- **Sensitive zone:** core systems and data stores with stricter access rules
- **User zone:** staff workstations and mobile devices

Traffic between zones should pass through a firewall or proxy that enforces least privilege. Network segmentation is not about distrusting the agent. It is about containing the blast radius if something goes wrong.

---

## Principle 3: Manage secrets like the agent is public

Agents need credentials — API keys, passwords, service accounts. Treat those secrets as if they will be exposed.

Best practices:

- Store secrets in a secrets manager, not in environment variables or config files
- Use short-lived credentials where possible
- Scope each secret to the smallest set of permissions needed
- Rotate credentials regularly
- Audit every time a secret is read or used
- Never give an agent credentials that a human administrator uses

If an agent only needs to read ticket status, do not give it permissions to create users or delete data. Narrow scopes are easy to defend later.

---

## Principle 4: Build audit trails by default

A zero trust AI system logs everything. Not just errors. Everything.

At minimum, log:

- What the agent observed
- What it considered
- What it proposed
- Who approved or rejected it
- What was executed
- What changed as a result
- When it happened
- Which credentials were used

These logs should be tamper-resistant and retained long enough for incident review. In a regulated environment, they become evidence. In any environment, they become the fastest way to understand what went wrong.

A good test: could you reconstruct a full sequence of agent decisions six months later if something breaks? If the answer is no, your logging is insufficient.

---

## Principle 5: Verify identity at every layer

Zero trust applies to the agent, the tools, and the humans who approve actions.

Use strong authentication for:

- The agent runtime itself
- Each MCP server and tool connection
- The approval interface
- The dashboard and logs
- Administrative access to the host

Multi-factor authentication should be required for approvals and admin access. Role-based access should limit who can approve which categories of action. A helpdesk technician should not be able to approve a firewall change.

If an attacker compromises a single account, zero trust design prevents them from moving laterally through the agent's privileges.

---

## Principle 6: Assume the model can be tricked

Language models are useful and imperfect. They can be manipulated by cleverly crafted input — a prompt injection hidden in an email, a document, or a ticket.

Design for this:

- Never pass raw user input directly to a privileged tool
- Sanitize and validate any text the agent will act on
- Separate the agent's reasoning from its execution privileges
- Use allow-lists for tool arguments, not open-ended parameters
- Require human approval for any action triggered by external content

A malicious email should not be able to trick your agent into deleting a database. If the agent cannot delete anything without approval, the email becomes a nuisance, not a catastrophe.

---

## Principle 7: Start read-only, then expand

The safest way to deploy an agent is to begin with observation only. Let it read, classify, summarize, and propose. Watch its behavior. Build trust.

Then add low-risk writes. Then add gated production writes. Then — only if the business needs it — add carefully scoped auto-approval for specific, well-tested actions.

This progression is the opposite of "give it access and see what happens." It is how you get to autonomy without sacrificing control.

---

## What this looks like in practice

At Manteis, our production deployments follow a standard security posture:

- The agent runs in a dedicated container on a segmented network
- It connects to tools through MCP servers, each with its own credentials and scope
- All read access is logged; all writes require approval
- Approval requests include context, reasoning, and the proposed action
- Secrets are stored in a secrets manager and rotated
- Logs are aggregated into a local security monitoring stack
- The dashboard shows real-time agent activity and outstanding approvals

This is not theoretical. It is how we run sovereign AI for clients who cannot afford a security incident.

---

## The Manteis approach

We do not sell a security product. We design sovereign AI infrastructure where security is built into the architecture from the first day.

Our engagements include:

- Network segmentation design for the AI stack
- Identity and secrets management configuration
- Human-gated action workflows
- Audit trail and logging setup
- Ongoing monitoring and hardening

We are the seers. We see the risks before they become incidents. And we build systems that keep AI useful without letting it become a liability.

If you are deploying AI agents and need a second set of eyes on the security model, **[book a Discovery Call](https://manteis.systems)**.

**[Book a Discovery Call](https://manteis.systems)** and we will show you what this looks like in your environment.

---



*Manteis Systems — Your intelligence should be an asset, not a subscription.*
