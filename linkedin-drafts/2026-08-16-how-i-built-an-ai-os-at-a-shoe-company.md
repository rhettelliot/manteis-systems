# LinkedIn Article — Draft for Rhett Approval
## Post Date: ASAP | Status: AWAITING APPROVAL
## Target: LinkedIn long-form article (not a post)

---

# How I Built an AI Operating System at a Shoe Company

I manage IT for a footwear manufacturer in the Pacific Northwest. 200+ employees. Legacy ERP. Mixed Mac and Windows fleet. And in 2026, I built a sovereign AI infrastructure stack from the ground up.

Here's what that means and why it matters.

## The Problem

Every AI tool wants to send your data to the cloud. Your documents, your emails, your security logs, your proprietary business data — all shipped to OpenAI, Google, or Microsoft servers. You pay per token. You rent your intelligence. And you hope they don't train on your data.

For a manufacturing company with proprietary processes, customer data, and compliance requirements, that's not acceptable.

## What I Built

I deployed an AI infrastructure stack that runs entirely on our hardware:

- **NVIDIA DGX Spark** and **Geekom A8 Max** as the compute nodes
- **Fleet DM** managing every endpoint via osquery
- **Ollama** running local LLMs (no API keys, no per-token costs)
- **n8n** for workflow automation (15+ workflows replacing manual processes)
- **Elasticsearch** for security monitoring (SIEM)
- **ChromaDB** for semantic search across company documents
- **Docker** for containerization (15+ services)

The result: 70% reduction in manual processing. 15+ automated workflows. $0 in cloud AI spend. 300%+ Year 1 ROI.

## The Operating System

I didn't stop at infrastructure. I built a full operating system — a web interface that sits on top of the stack and makes it usable by non-technical staff:

- A dashboard showing real-time service status
- A chat interface powered by local AI models
- Semantic search across all company documents
- Device fleet management with live endpoint data
- Security monitoring with custom detection rules
- A setup wizard: plug in, open browser, follow 6 steps, you're sovereign

I call it Manteis Sovereign OS. And it's the product I now sell to other companies.

## The Lesson

You don't need a $150K/year AI engineer. You need a $30K deployment.

You don't need to rent your intelligence from a cloud provider. You need to own it.

The ERP is the backbone. The AI is the nervous system. And it all runs on hardware you control.

---

*Your intelligence should be an asset, not a subscription.*

*Learn more at manteis.systems*

## Notes for Rhett
- This is a LinkedIn ARTICLE, not a post. Publish via LinkedIn's article feature.
- Attach the architecture diagram (to be created)
- Best time: Tuesday or Wednesday morning
- Tag connections who would resonate with the sovereign AI thesis
