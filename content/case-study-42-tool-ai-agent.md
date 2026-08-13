# From 42 Tabs to One Command: How a 200-Person Firm Rebuilt Operations with Private AI Agents

## Hook

A 200-employee professional services firm in the Pacific Northwest was drowning in its own toolchain. Their team relied on 42 separate SaaS tools, scripts, and dashboards to run daily operations. Onboarding a client took three days. Routine security reviews consumed 12 hours a week. Invoice reconciliations were done by hand. And every new automation request started with the same question: "Who is going to maintain this?"

Six months later, the same firm runs 15+ automated workflows from a single private agent infrastructure. Manual operational work is down 70%. They spend nothing on cloud AI subscriptions. And the leadership team estimates they have already saved more than $50,000 in labor and tooling costs, with a projected ROI well over 300%.

This is how they did it — without exposing a single byte of client data to a third-party model provider.

## Problem

The firm was growing fast, but its operational backbone was not. Teams had stitched together a patchwork of tools over several years: ticketing, CRM, cloud infrastructure, accounting, compliance tracking, code repositories, monitoring, and internal documentation each lived in a separate application. Work moved between those tools by hand, via email, or through fragile scripts that broke whenever an API changed.

Three problems kept surfacing:

1. **Operational drag.** Staff spent most of their week context-switching. A simple client onboarding required someone to create accounts in four systems, send three emails, update a spreadsheet, and notify a Slack channel. Repeatable work consumed senior attention.
2. **Tool costs were compounding.** Each SaaS product added another per-seat license, another integration fee, and another vendor to manage. The budget line for "operational software" had doubled in two years.
3. **Trust was the real blocker.** Leadership wanted to automate more, but they could not let software agents take destructive actions — deleting data, modifying infrastructure, sending client communications — without a human in the loop. Previous automation attempts either lacked that control or required so much review that they saved no time at all.

The firm needed an automation layer that could connect its existing tools, run locally, and refuse to act destructively unless a human explicitly approved it.

## Solution

Manteis Systems designed and deployed a private AI agent infrastructure: a federation of specialized agents that operate the firm's tools under human supervision, running entirely on the company's own hardware.

The core design principles were simple:

- **No cloud AI bill.** The reasoning runs on local large language models via Ollama, so no client data leaves the environment and there is no per-token subscription.
- **Human-gated writes.** Every destructive or externally-facing action — sending an email, deleting a record, changing infrastructure, posting to a channel — stops for human approval before it executes.
- **Tool-native integration.** Each agent connects to the firm's existing applications through standard tool protocols rather than brittle screen-scraping or custom scripts.
- **Federated control.** The agents are orchestrated through Hermes, with each agent containerized in Docker. They share memory and hand off tasks to one another like a well-run operations team, while remaining isolated enough that a failure in one agent cannot compromise another.

In plain terms: the firm replaced 42 separate manual interfaces with a small team of software agents that work together, ask permission before doing anything risky, and run on a box in the corner of the office.

## How It Worked

Manteis started with a two-week audit of the firm's daily recurring work. We identified the highest-friction workflows, the data sources involved, and the decision points where a human could not be removed. We then built the agent infrastructure in three layers.

### 1. The tooling layer

Each existing application — helpdesk, CRM, cloud console, accounting, code repository, monitoring, and so on — was connected through a tool adapter. These adapters let agents read status, draft changes, and submit proposed actions, but they do not perform destructive operations on their own. This turned every tool into a request-and-approval interface rather than an open control surface.

### 2. The agent layer

Specialized agents were assigned to domains: one for client onboarding, one for security reviews, one for invoice reconciliation, one for infrastructure changes, and so on. They reason about their domain using local models, call the right tool adapters, and pass tasks between one another when a workflow crosses domains. Because all models run locally through Ollama, the firm retains full control over what data the agents see.

### 3. The governance layer

Hermes acts as the operating system for the agent federation. It routes requests, enforces the human-gated write rule, logs every proposed action, and records the approvals or rejections. If an agent wants to delete a user account, the system surfaces the request with context and waits for a human "yes." If the human rejects it, the agent learns nothing more than "do not proceed." If they approve, the action is executed and the result is written back to the shared operational memory.

Docker containers keep the agents isolated, and the entire stack can be rebuilt from configuration in under an hour.

## Proof

Six months after deployment, the results are measured in hours reclaimed and dollars kept in the budget.

| Outcome | Before | After |
|---|---|---|
| Manual operational work | 100% baseline | 70% reduction |
| Automated recurring workflows | 2 fragile scripts | 15+ reliable workflows |
| AI / LLM cloud spend | ~$1,200/month projected | $0 |
| Client onboarding time | 3 days | Same-day |
| Security review cycle | 12 hours/week | 3 hours/week |
| Invoice reconciliation | Manual, 2 days/month | Automated, exception-based |
| Estimated 6-month savings | — | $50,000+ |
| Projected ROI | — | 300%+ |

Beyond the numbers, the culture of the operations team changed. Instead of opening dozens of tabs and copying data between systems, staff now review proposals, approve good ones, and intervene only on exceptions. The firm also avoided the hidden cost of cloud model lock-in: as their workflows grew, their AI bill did not.

Most importantly, the human-gated write rule never produced a single unapproved destructive action during the six-month period. That control turned automation from a governance risk into a governance asset.

## CTA

If your team is running on dozens of tools, paying rising SaaS and AI bills, and hesitating to automate because of trust or compliance concerns, a private agent infrastructure is likely the next right move.

Manteis Systems designs, builds, and secures federated AI agent systems for professional services firms and security-conscious organizations. Every deployment keeps your data local, your approvals human-gated, and your existing tools connected.

[Contact Manteis Systems](https://manteis.systems/contact) for a confidential operational review and a roadmap to your first 90 days of private agent automation.
