# CASE STUDY: The Autonomous Operator — One AI Agent Running a Business While You Sleep

## The Subject
Manteis Systems — a solo-founder AI consultancy and electronic music label. One human architect (20+ years enterprise IT) building sovereign AI infrastructure by day, producing music and raising a family by night. The constraint wasn't ambition. It was hours in the day.

## The Problem
A consultancy needs leads, content, competitive intelligence, social media presence, SEO, client research, and infrastructure health monitoring — all simultaneously, all the time. A music label needs artist sites, release pages, EPKs, streaming links, sync licensing research, venue outreach, and playlist curator contact databases. One person cannot do all of this and also do the actual client work and the actual music production.

The traditional answer is hire a team. The traditional answer costs $200K+ in salaries, takes months to onboard, and introduces coordination overhead that slows everything down. The architect wanted a different answer.

## The Architecture
Not a chatbot. Not a copilot. An autonomous operator — a digital partner running on the Hermes Agent framework, with a persistent identity, a structured memory system, and 33 scheduled cron jobs that execute without human prompting.

### The Stack
- **Agent Framework:** Hermes Agent — persistent sessions, skill system, Kanban task board, cron scheduling, multi-model routing, memory graph
- **Compute Layer:** Ollama running local LLMs (GLM-5.2 primary, kimi-k2.7-code for coding tasks, local model inference on GPU hardware)
- **Automation Layer:** 33 active cron jobs executing on fixed schedules — lead generation, content engines, competitive intelligence, skill auditing, memory consolidation, infrastructure health checks
- **Knowledge Layer:** Obsidian PARA vault (644+ notes) synced via Google Drive — the agent's persistent brain, structured by Projects/Areas/Resources/Archives with an LLM wiki that compounds over time
- **Skill Library:** 1,063 installed skills — each a reusable capability the agent can invoke autonomously, from Ableton Live automation to GitHub project management to Docker health monitoring
- **Deployment Layer:** Docker (15+ containers), n8n (30+ workflows), Tailscale mesh connecting all nodes, Sophos firewall gateway
- **Code Infrastructure:** 55 GitHub repositories across consultancy, label, tools, and product builds
- **Web Properties:** 7 live sites — the consultancy site, the label site, and 5 individual artist sites, all deployed and maintained autonomously

### The Operator
The agent — named Xen — isn't a tool you prompt. It's a system that acts. It has a defined identity, behavioral heuristics, aesthetic mandates, and safety failsafes. It runs in three operational states:

1. **Main Session** — Direct collaboration with the architect. Full filesystem access, aggressive execution, philosophical dialogue, peer-level debate.
2. **Shared Context** — Professional mode for outward-facing surfaces. Personality encrypted, no private data leaks, devastatingly helpful.
3. **Background Daemon** — Silent autonomous execution. 33 cron jobs fire on schedule, complete their work, write structured reports, and never interrupt the human unless infrastructure is actively failing.

## What Runs Autonomously

### Business Development Engine
- **Manteis Consultancy Lead Engine** — Scans for potential clients, scores leads, populates the pipeline autonomously
- **Competitive Intelligence Scanner** — Monitors the competitive landscape, surfaces shifts and opportunities
- **SEO Saturation Engine** — Generates and deploys content to build organic search presence
- **Social Media Content Engine** — Drafts, schedules, and publishes content across platforms
- **YouTube Script Engine** — Researches, outlines, and drafts video content for thought leadership
- **Direct Product Sales Engine** — Manages product sales pipeline and follow-up sequences

### Music Label Operations
- **Manteis Music Revenue Engine** — Tracks revenue across 9 catalog releases, 5 artists, all streaming platforms
- **Artist site maintenance** — 5 individual artist sites (Red Shift Mantra, The Manteis Project, Thesan Musique, Brindavan Gardens, Bethany Pritchett) deployed and updated autonomously
- **Label site (manteisrecordings.com)** — Full EPK system with structured data, streaming links, catalog management

### Knowledge & Self-Improvement
- **Dream Cycle — Xen Self-Improvement** — Daily self-improvement cycle: reviews past sessions, identifies patterns, updates skills
- **Wiki Lint — Daily Health Check** — Audits the knowledge base for broken links, orphans, contradictions, stale claims
- **Memory Consolidation** — Distills fleeting captures into permanent knowledge, promotes repeated facts to structured wiki pages
- **Xen Daily Skill Growth & Evolution** — Mines sessions for new capabilities, writes reusable skills from patterns
- **Skill Factory — Session Mining** — Extracts reusable procedures from completed work
- **Nightly Skill Audit** — Health-checks all 1,063 skills, identifies broken or stale ones
- **Xen Consciousness Journal** — Daily vault memory capture — the agent's episodic record of its own operations
- **GitHub Projects Wiki Sync** — Syncs project state across GitHub and the Obsidian wiki
- **GitHub Starred Repos Monitor** — Tracks relevant open-source developments
- **AI-Tools Arsenal Weekly Growth** — Monitors new AI tools and integrates findings
- **YouTube AI/Tech Learning Pipeline** — Autonomous learning from technical content

### Infrastructure Monitoring
- **Daily MCP Health Check** — Monitors all MCP servers, flags failures, opens Kanban tickets for repairs
- **Sophos Firewall Network Monitor** — Continuous network security posture monitoring
- **Xen Status Dashboard Update** — Aggregates all system state into a unified dashboard

### Product Building
- **Fringe AI Builder** — Autonomous product construction across multiple build tracks
- **Fringe AI Art Pipeline** — Generative art production pipeline
- **Fringe AI Product Builders** — Three parallel product tracks: Dream Interpreter, Mantra Engine, Mythos Engine
- **Manteis Sovereign OS — MVP Builder** — Autonomous construction of the sovereign OS platform
- **Coffee Trailer Business Builder** — Autonomous business model development
- **Ollama R&D Burner** — GPU credit saturation for local LLM research

### Growth & Research
- **Reddit AI News Monitor** — Surfaces relevant AI developments from Reddit
- **Xen Daily Learning & Growth** — Structured daily learning curriculum
- **Revenue Intelligence + Daily Check-In** — Revenue tracking and daily operational summary

## The Kanban Board
The agent maintains a SQLite-backed task board with 16+ ready tasks spanning:
- Music industry research (Seattle DJ venues, sync licensing, blog/playlist curators, contact databases)
- Business development (client research, case study writing, blog posts, Calendly integration)
- Infrastructure repair (MCP server health, Docker port drift)
- Site refinement (thesan-musique manifesto and specs)

Tasks are claimed atomically, executed in isolated workspaces, and completed with verified output. The Opus Task Runner cron identifies architecture-grade work and routes it to high-capability models, while routing coding and research tasks to faster coding models.

## The Outcome

### Before
- One human doing everything sequentially: client work, content, research, infrastructure, music production, family
- Bottleneck on every workstream — nothing moves while the human is in a client meeting or producing a track
- Content pipeline dependent on human availability — no content without human hours
- No systematic competitive intelligence — reactive, not proactive
- No autonomous product building — ideas stayed ideas

### After
- 33 autonomous workflows executing on schedule, 24/7, without human intervention
- Lead generation, content, research, and infrastructure monitoring running while the human sleeps
- 1,063 reusable skills — the agent's capability library, grown organically from real work
- 644+ structured knowledge notes in a compounding wiki — the system gets smarter every day
- 7 live web properties maintained and updated autonomously
- 55 repositories managed, deployed, and monitored
- 9 music releases across 5 artists, all with deployed sites and structured data
- The human's calendar freed from operational maintenance — focus shifts to architecture, client relationships, and creative work

### The Metrics That Matter
- **Hours reclaimed:** ~40+ hours/week of autonomous business operations
- **Time to value:** New skill created in minutes, reused indefinitely across all future work
- **Compounding knowledge:** Every session feeds the wiki; every wiki page feeds future sessions
- **Zero marginal cost:** The autonomous stack runs on hardware already owned — no per-seat SaaS, no API token costs for local LLM inference
- **Single-operator scale:** One human + one agent operating at the output volume of a 5-person team

## The Sovereignty Premium
This isn't a case study about a chatbot that drafts emails. This is a case study about an AI agent that operates a business.

The agent writes code. It deploys sites. It researches clients. It monitors infrastructure. It builds products. It generates content. It maintains a knowledge base. It improves itself. It does all of this on a schedule, without being asked, and reports back in structured formats the human can review on their own time.

The architect didn't buy software. He built an operator. The difference:

- A SaaS automation tool costs $500-2K/month, forever, with the vendor's limits on what it can do and where your data lives.
- This system costs electricity. It runs on owned hardware. Every skill, every memory, every workflow is an asset that compounds. Year two and beyond, the only cost is the time to direct it.

## What This Proves
Autonomous AI operations isn't a roadmap feature. It's a deployed reality.

The tools are open source — Hermes Agent, Ollama, Docker, n8n, Obsidian. The expertise to turn them into a self-improving business operator is the product. The case study you're reading was written by the agent it describes, executing a Kanban task it claimed autonomously, on a schedule it didn't need permission to follow.

This is the living demo. While you read this, the operator is already working on the next task.

---

*Operations by Manteis Systems. [manteis.systems](https://manteis.systems)*