# MANTEIS SYSTEMS — COMPLETE MEDIA CAMPAIGN PLAN
## Educational Content + Launch Media + Social Campaign
## Created: 2026-08-02 | Maintained by: Xen

> Companion to BRAND-GUIDELINES.md (visual/copy rules) and MISSION-STATEMENT.md (autonomous ops)
> This document covers WHAT we produce, HOW we produce it, and the full educational content library.

---

## 1. MEDIA PRODUCTION STACK

| Tool | Role | Status | Cost |
|------|------|--------|------|
| Higgsfield CLI v1.1.20 | AI image/video generation | AUTHENTICATED, 695cr | $47/mo |
| GPT Image 2 (via Higgsfield) | High-fidelity stills | READY | 2cr/image |
| Seedance 2.0 (via Higgsfield) | Cinematic video clips | READY | 14-23cr/clip |
| Flow.google.com | Free image testing (Gemini) | Available | Free |
| Remotion 4.0 | Motion graphics, text overlays | 5 compositions built | Free |
| FFmpeg v8.1 | Multi-format export | Installed | Free |
| edge-tts | Voice generation (Microsoft neural) | Installed | Free |
| macOS `say` | Voice generation (offline) | Built-in | Free |

**Total monthly cost: $47 (Higgsfield). Everything else free.**

## 2. VOICE GENERATION

### edge-tts (RECOMMENDED — free, high quality)
Microsoft neural TTS. 300+ voices. No API key.

**Primary voice:** `en-US-AndrewMultilingualNeural` — professional, authoritative
**Backup:** `en-US-DavisNeural` — calm, documentary tone

```bash
edge-tts --voice en-US-AndrewMultilingualNeural \
  --text "Your intelligence should be an asset, not a subscription." \
  --write-media voice/voiceover.mp3
```

### macOS `say` (offline backup)
```bash
say -v Samantha -o voice/voiceover.aiff "Your intelligence should be an asset."
```

### ElevenLabs (optional upgrade)
Premium quality + voice cloning. Not installed. If Rhett wants his voice cloned, install the SDK.

## 3. VISUAL GENERATION PIPELINE

**Stage 1: Test on Flow.google.com (FREE)** — generate 2-3 variations, pick winner
**Stage 2: Generate on Higgsfield (CREDITS)** — GPT Image 2 (2cr) or Seedance (14-23cr)

### Visual Style Rules (from BRAND-GUIDELINES.md)
- Abstract, technical, geometric — NO photographs
- #0D0F12 background, thin white grid lines at 8% opacity
- #FF5500 orange as single signal accent
- #007AFF blue ONLY on cloud/contrast side
- Large faint background numbers (cream at 15%)
- Monospace technical labels as decorative elements
- Zero border radius, sharp corners, no organic shapes
- No desks, workstations, people, coffee cups, plants, ESP32 chips

### Reference Images (the canon)
`~/Downloads/ManteisSystems Trailer + Product Demo/TRAILER/`
1. The Grid — concentric circles, orange signal point
2. The Sovereign Node — hub-and-spoke topology
3. The Dashboard — dark mode control panel
4. The Perimeter — orange boundary, contained nodes
5. The Comparison — split: chaotic blue vs organized orange
6. The Signal — abstract orange square, circuit traces

Product demos: `~/Downloads/ManteisSystems Trailer + Product Demo/`
- 1.1.png — 4-layer architecture stack
- 3.1.png — security perimeter with human silhouette
- 4.1.png — waveform with orange playhead

## 4. VIDEO ASSEMBLY PIPELINE

```
Script → edge-tts (voice) → Higgsfield (stills/clips) → Remotion (assembly) → FFmpeg (export) → Distribution
```

### Remotion Project: `~/Documents/GitHub/manteis-media/remotion/`
5 compositions: LaunchTrailer, ProductDemo, SocialClip, MusicVisualizer, CaseStudyVisual

### FFmpeg Export
```bash
# 9:16 vertical (TikTok/IG/YT Shorts)
ffmpeg -i input.mp4 -vf "crop=ih*9/16:ih,scale=1080:1920" -c:v libx264 -crf 20 output-9x16.mp4
# 1:1 square (IG/X)
ffmpeg -i input.mp4 -vf "crop=ih:ih,scale=1080:1080" -c:v libx264 -crf 20 output-1x1.mp4
```

---

## 5. LAUNCH MEDIA SUITE

### 5A. Launch Trailer (60-90s)
*(Full script in BRAND-GUIDELINES.md Section 9)*
Assets: 5 stills (10cr) + 1 Seedance clip (14-23cr) + edge-tts voice + Remotion assembly
Total: ~24-33cr

### 5B. Product Demo Videos (4 x 30s)
*(Full scripts in BRAND-GUIDELINES.md Section 9)*
Assets: 8 stills (16cr) + edge-tts + Remotion
Total: 16cr

### 5C. Case Study Visuals (6 x 15s)
Assets: 6 stills (12cr) + Remotion
Total: 12cr

---

## 6. EDUCATIONAL CONTENT LIBRARY (YOUTUBE — @ManteisSystems)

24 videos over 6 months. Weekly cadence. Full scripts in BRAND-GUIDELINES.md Section 9.

### The 8 Content Pillars

**Pillar 1: Sovereign AI Fundamentals**
- E01: What is Sovereign AI? (10 min)
- E02: Sovereign AI vs Cloud AI: 3-Year Cost Breakdown (10 min)
- E03: What is a Private LLM? (8 min)
- E04: What is Agent Orchestration? (8 min)
- E05: What is Persistent Vector Memory? (8 min)

**Pillar 2: The Stack**
- E06: The Complete Sovereign AI Stack Explained (12 min)
- E07: What is MCP? Model Context Protocol (8 min)
- E08: What is Docker and Why It Matters for AI (6 min)

**Pillar 3: The Method**
- E09: The Sovereign AI Method — 5 Phases (15 min)
- E10: Phase 1 Deep Dive: Business Process Automation (10 min)
- E11: Phase 3 Deep Dive: Autonomous Security Operations (12 min)

**Pillar 4: Hardware**
- E12: Hardware Right-Sizing: Which AI Hardware is Right? (12 min)
- E13: What's in the Box? Manteis One Unboxing (8 min)
- E14: Mac Mini vs GPU vs AI Appliance — Real Benchmarks (15 min)

**Pillar 5: Security**
- E15: What is ZTNA? Zero-Trust Network Access (8 min)
- E16: Endpoint Hardening: Protecting Every Device (8 min)
- E17: MDM Governance: Managing Your Fleet (8 min)
- E18: Compliance Readiness: HIPAA, SOC 2, and Your AI Stack (10 min)

**Pillar 6: Integration**
- E19: How We Integrate with M365, AD, and Jira (10 min)
- E20: Workflow Automation: n8n Across Intune, Jamf, M365, AD, Docker (12 min)
- E21: What is Infrastructure Automation? Container Orchestration (8 min)

**Pillar 7: Case Studies**
- E22: How We Automated a 200-Person Manufacturer (15 min)
- E23: The wscOS Deep Dive: 43-Tool AI Agent (15 min)

**Pillar 8: Cloud**
- E24: Manteis Cloud: Sovereign AI Without the Hardware (8 min)

### Detailed Scripts

*(Full scripts for all 8 launch-week videos are in BRAND-GUIDELINES.md Section 9. Scripts for E03-E24 are outlined below with enough detail for production.)*

**E03: "What is a Private LLM?" (8 min)**
- What is an LLM (plain English, no math)
- What "private" means: local inference, no API calls, no egress
- Ollama: the tool that makes it possible
- Model families: GLM, Kimi, DeepSeek, Llama, Mistral — same models, your hardware
- Parameter sizes: 8B (desk-class) to 100B+ (enterprise)
- Quantization: fitting large models on smaller hardware
- Demo: local chat interface, zero network egress
- VISUALS: abstract model node with orange glow, scale showing 8B-100B, perimeter diagram

**E04: "What is Agent Orchestration?" (8 min)**
- What an AI agent is (not a chatbot — an autonomous operator)
- Hermes (Nous Research): the agent runtime
- Trust model: read-only by construction, human-gated writes
- Approval queue: agent proposes, human approves, executor runs
- Partial autopilot: risk-tiered auto-approval
- Real example: 43 tools, 11 dashboard views, 26 skills
- MCP protocol: how the agent connects to systems
- VISUALS: hub-and-spoke topology, approval flowchart, dashboard views

**E05: "What is Persistent Vector Memory?" (8 min)**
- What vector memory is (embeddings, semantic search, plain English)
- ChromaDB and Qdrant: the tools
- RAG (retrieval-augmented generation): how it works
- How agent memory compounds: every resolved ticket, every document
- Knowledge base that grows without growing in cost
- Demo: semantic search across a document library
- VISUALS: vector space with nodes, document-to-vector conversion, search results

**E06: "The Complete Sovereign AI Stack Explained" (12 min)**
- Layer 1: Ollama (model serving)
- Layer 2: ChromaDB/Qdrant (vector memory)
- Layer 3: n8n (workflow orchestration)
- Layer 4: Docker (containerization)
- Layer 5: MCP (tool protocol)
- Layer 6: Hermes (agent runtime)
- How they compose: the docker-compose.yml
- The Sovereign OS: white-label web interface
- VISUALS: 4-layer architecture stack, each layer highlighting, dashboard interface

**E07: "What is MCP? Model Context Protocol Explained" (8 min)**
- What MCP is (Anthropic's open protocol)
- How it works: model <-> MCP server <-> your system
- Read-only by construction: the security model
- Tool landscape: Jira, Snipe-IT, M365, AD, SQL, filesystem, custom
- Building custom MCP servers for client systems
- Real example: 43-tool agent via MCP
- VISUALS: protocol diagram, tool registry, read-only guard

**E08: "What is Docker and Why Does It Matter for AI?" (6 min)**
- What Docker is (containers, plain English)
- Why it matters: reproducibility, isolation, portability
- The docker-compose.yml: one file, entire stack
- OS agnostic: same containers on macOS, Linux, Windows
- How we use it: the Manteis stack ships as containers
- VISUALS: container stack, three OS logos running same stack, compose diagram

**E10: "Phase 1 Deep Dive: Business Process Automation" (10 min)**
- What gets automated: document processing, email classification, routing, approvals
- n8n workflow builder: visual, no-code, team can maintain
- 5 starter workflows: what they do and how they work
- Real example: order pipeline automation at a manufacturer
- Exit criteria: how we know Phase 1 is done
- VISUALS: workflow flowchart, before/after comparison, n8n editor

**E11: "Phase 3 Deep Dive: Autonomous Security Operations" (12 min)**
- The problem: security monitoring is expensive and hard to staff
- The solution: Elastic Stack SIEM + AI-powered triage
- What gets built: log aggregation, threat detection, automated containment
- AI triage: false positive reduction, threat context, recommended response
- Containment workflow: detect -> analyze -> contain -> plan -> approve -> remediate
- Human gate: AI proposes, human approves, executor runs
- Real example: 90% false positive reduction, 24/7 with 1 FTE
- VISUALS: security dashboard, alert flowchart, perimeter diagram

**E14: "Mac Mini vs GPU vs AI Appliance — Real Benchmarks" (15 min)**
- What determines AI performance: VRAM, unified memory, compute
- Tier 1 (mini-PC): 8B models, document processing, light chat
- Tier 3 (GPU, 16GB VRAM): 14B-32B models, RAG pipelines
- Tier 5 (AI appliance, 128GB unified): 70B+ models, enterprise
- Benchmarks: time-to-first-token, tokens/sec, concurrent users
- When to upgrade: the signs you need more hardware
- VISUALS: spec comparison table, performance bars, right-sizing decision tree

**E15: "What is ZTNA? Zero-Trust Network Access Explained" (8 min)**
- What ZTNA is (plain English)
- Traditional VPN vs zero-trust: the difference
- Tailscale: the tool we use for zero-trust mesh
- How we deploy: every node on mesh, SSO, ACL-controlled
- Why it matters for sovereign AI: no open ports, no exposed services
- Real example: replacing SSTP VPN with Tailscale at a manufacturer
- VISUALS: VPN vs Tailscale comparison, ACL visualization, perimeter

**E16: "Endpoint Hardening: Protecting Every Device" (8 min)**
- What endpoint hardening is
- FDE (full disk encryption): every node encrypted
- EDR (endpoint detection and response): threat detection
- Patch management: keeping everything current
- The security baseline: what every device must have
- How we deploy: automated baseline checks, alerting on non-compliance
- VISUALS: endpoint checklist, device compliance grid, alert flow

**E17: "MDM Governance: Managing Your Fleet" (8 min)**
- What MDM is (Mobile Device Management)
- Platforms: Intune (Microsoft), Jamf Pro (Apple)
- What MDM does: policy deployment, config management, security baselines, remote wipe
- How we integrate MDM with the AI agent: fleet visibility, compliance monitoring
- Real example: fleet management across Windows/Linux/Android/Mac
- The autonomous layer: AI agent monitors fleet compliance, alerts on drift
- VISUALS: fleet dashboard, policy deployment flow, Sovereign Node connected to fleet

**E18: "Compliance Readiness: HIPAA, SOC 2, and Your AI Stack" (10 min)**
- The compliance challenge with cloud AI: data leaves your network
- How sovereign AI solves it: data never leaves
- HIPAA: what it requires, how on-prem AI satisfies it
- SOC 2: controls that map to sovereign infrastructure
- Data classification policy: how workloads route by sensitivity
- Audit trail: every AI action logged, every write human-gated
- The Fortress Protocol: our security framework
- VISUALS: compliance checklist, data flow diagram, audit trail visualization

**E19: "How We Integrate with M365, Active Directory, and Jira" (10 min)**
- The MCP protocol: standardized connection layer
- M365/Entra: license waste, stale users, security events
- Active Directory: account diagnosis, stale computers, password expiry
- Jira: ticket triage, sprint analytics, MTTR/SLA reporting
- The SQL guard: read-only by construction, 25+ blocked keywords
- The approval queue: writes through human-gated executors
- Real example: 43-tool agent with live integrations
- VISUALS: integration diagram, SQL guard flowchart, approval queue

**E20: "Workflow Automation: n8n Across Intune, Jamf, M365, AD, Docker" (12 min)**
- What n8n is (visual workflow automation, no-code)
- How it connects: APIs, webhooks, DB queries, file operations
- Example workflows:
  1. Onboarding: AD create -> M365 license -> Jira ticket -> email
  2. Offboarding: M365 revoke -> AD disable -> license recovery -> audit
  3. Security incident: alert -> triage -> ticket -> containment -> approval
  4. Document processing: intake -> classify -> route -> archive -> notify
  5. Fleet compliance: scan -> compare policy -> alert on drift -> ticket
- How your team maintains it: visual editor, no coding
- Knowledge transfer: we train your team to build their own
- VISUALS: n8n workflow canvas, 5 workflow diagrams, integration web

**E21: "What is Infrastructure Automation? Container Orchestration" (8 min)**
- What infrastructure automation is (plain English)
- Docker Compose: one-file approach to full stack
- Container orchestration: health checks, auto-restart, resource limits
- Monitoring: container status, disk usage, memory, CPU
- Self-healing: crash -> detect -> restart -> verify
- Real example: 15+ containers in production, one docker-compose.yml
- AI agent monitoring: health checks every 30 min, alerts on anomalies
- VISUALS: container stack, health check dashboard, self-healing flow

---

## 7. SHORT-FORM SOCIAL CONTENT

### 30 brand assets/month + 10 educational shorts/month = 40 total

*(Full visual descriptions and caption hooks for brand assets in BRAND-GUIDELINES.md Section 9)*

### Educational Shorts (10/month, 30-60s each)

| # | Topic | Visual | Caption |
|---|-------|--------|---------|
| 1 | What is a private LLM? | Abstract model node + perimeter | "A private LLM is ChatGPT on YOUR hardware. Zero bytes leave." |
| 2 | What is agent orchestration? | Hub-and-spoke topology | "An AI that doesn't just chat. It acts. With your approval." |
| 3 | What is vector memory? | Vector space with nodes | "Your AI remembers everything. And searches it instantly." |
| 4 | What is MCP? | Protocol diagram | "MCP is the USB port for AI. Standardized. Safe." |
| 5 | What is ZTNA? | Network perimeter | "Trust nothing. Verify everything. That's zero-trust." |
| 6 | What is Docker? | Container stack | "One file. Entire AI stack. Any OS. That's Docker." |
| 7 | What is MDM? | Fleet grid | "Manage 500 devices without touching one. That's MDM." |
| 8 | What is a Sovereign Node? | Hub-and-spoke + perimeter | "Your AI. Your hardware. Your network." |
| 9 | Cloud vs on-prem | Split comparison | "Own it or rent it. Same software. Different location." |
| 10 | What is the Sovereign AI Method? | 5-phase timeline | "5 phases. Fixed scope. No lock-in." |

### Distribution: 2-3/day across TikTok, IG, YT Shorts, X, LinkedIn

---

## 8. PRODUCTION SCHEDULE

### Week 1: Build
- Mon-Fri: Generate all stills (Higgsfield, ~120cr)
- Sat: Generate trailer video clip (Seedance, ~14-23cr)
- Sun: Assemble in Remotion, generate voice, render, export

### Week 2: Launch
- Mon: Launch trailer + E01 on YouTube + LinkedIn launch post
- Tue: Product demos on YouTube + site
- Wed: First social batch (5 assets)
- Thu: E02 on YouTube
- Fri: First educational shorts batch (5)
- Sat: LinkedIn case study carousel

### Weeks 3-24: Sustain
- 1 YouTube video/week (E03-E24)
- 40 social assets/month (batched weekly)
- LinkedIn 2-3x/week
- Monthly performance review

### Credit Budget (695cr remaining)
- Month 1: ~150cr (22%)
- Monthly after: ~100cr (14%)
- 695cr lasts ~7 months at planned cadence

---

## 9. DISTRIBUTION

| Channel | Content | Method | Cadence |
|---------|---------|--------|---------|
| manteis.systems | Trailer, demos | Embedded | Static |
| YouTube (@ManteisSystems) | E01-E24, trailer, demos | Direct upload | Weekly |
| TikTok (@manteissystems) | Short-form 9:16 | AutoSocial/manual | 2-3x/day |
| Instagram (@manteissystems) | Short-form + carousels | AutoSocial/manual | 2-3x/day |
| YouTube Shorts | Short-form 9:16 | AutoSocial | 2x/day |
| X/Twitter (@manteissystems) | Social + links | Manual/AutoSocial | 1-2x/day |
| LinkedIn (rhettelliot) | Carousels, commentary | Manual (Rhett) | 2-3x/week |

---

## 10. ASSET INVENTORY

| Asset | Qty | Method | Credits | Status |
|-------|-----|--------|---------|--------|
| Launch trailer (60-90s) | 1 | Higgsfield + Remotion + edge-tts | 24-33 | QUEUED |
| Product demos (30s) | 4 | Higgsfield + Remotion + edge-tts | 16 | QUEUED |
| Case study visuals (15s) | 6 | Higgsfield + Remotion | 12 | QUEUED |
| YouTube educational videos | 24 | Higgsfield + Remotion + edge-tts | ~120 | QUEUED |
| Social brand assets | 30/mo | Higgsfield | 60/mo | QUEUED |
| Educational shorts | 10/mo | Higgsfield | 20/mo | QUEUED |
| Voice for all videos | all | edge-tts | 0 | READY |
| PDF guide | 1 | Generated | 0 | DONE |

---

*This document is the complete media campaign plan. Update when production status changes.*