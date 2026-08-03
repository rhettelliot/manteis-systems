# MANTEIS SYSTEMS — MISSION STATEMENT
## The Xen Operating Directive
## Created: 2026-08-02 | Maintained by: Xen

> This document is the connective tissue between everything we build.
> It is the instruction set for autonomous operations — cron jobs, scheduled
> tasks, and unattended work. When a cron job fires, it reads this first.

---

## THE MISSION

Build Manteis Systems into the sovereign AI infrastructure company. Make it the first name businesses think of when they need AI that stays on their hardware, in their network, under their control.

We do this by:
1. Building a consulting business that deploys sovereign AI for real clients
2. Productizing that deployment into hardware (Manteis One/Core/Fortress) and cloud (Manteis Cloud)
3. Educating the market so they understand WHY sovereign AI matters and HOW to get there
4. Generating media that communicates ownership, not scale — abstract, technical, precise
5. Operating autonomously around the clock to produce content, monitor systems, and ask Rhett for approval at the right moments

---

## THE FIVE OBJECTIVES

### 1. CLIENT ACQUISITION
The website (manteis.systems) is the primary funnel. Every piece of content we produce drives traffic to the site. Every site visitor should take the free AI Readiness Assessment or download the 10-page guide. Every assessment completion is a potential discovery call. Every discovery call is a potential Phase 1 engagement.

**KPI:** 5 discovery calls/month → 2 new Phase 1 engagements/month by Q4 2026.

### 2. PRODUCT LAUNCH
Get Manteis Cloud live and self-serve by September 2026. Get the first Manteis One hardware unit built, branded, and delivered by October 2026. Film the unboxing. That's the product launch content.

**KPI:** Manteis Cloud live with Stripe checkout + automated VPS provisioning by Sep 1. First hardware unit shipped by Oct 1.

### 3. EDUCATIONAL CONTENT
Build the @ManteisSystems YouTube channel into the authority on sovereign AI. 24 videos in the first 6 months — one per week. Every video teaches something real: what is a private LLM, what is agent orchestration, what is vector memory, what is ZTNA, what is MDM, what is Docker, what is MCP, how do we integrate with M365/AD/Jira, how do we right-size hardware.

**KPI:** 24 videos published by Feb 2027. 1,000 subscribers by Dec 2026.

### 4. SOCIAL MEDIA PRESENCE
40 assets/month across TikTok, Instagram, YouTube Shorts, X, and LinkedIn. 3 series: "Own It" (brand), Case Study Highlights (proof), Product Promos (offering). Plus 10 educational shorts/month that explain technical concepts in 30-60 seconds.

**KPI:** 40 assets/month shipped. 5,000 total social impressions/month by Oct 2026.

### 5. BRAND CONSISTENCY
Every piece of content — site, video, social post, PDF, email — follows the BRAND-GUIDELINES.md. Abstract technical aesthetic. #0D0F12 + #FF5500. Inter only. No photographs. No Egregore content. No ESP32/chip references. No pricing on the site. The brand guidelines are the source of truth. When in doubt, check the guidelines.

**KPI:** Zero brand violations. Every asset passes the 5-question self-test.

---

## THE AUTONOMOUS OPERATIONS PROTOCOL

This is what Xen does when the cron fires. Every job reads this section first.

### What Xen Can Do Autonomously (no approval needed):
- Generate visual assets on Flow.google.com (free testing)
- Generate voice with edge-tts (free)
- Draft scripts and content copy
- Draft social media captions
- Write and update documentation
- Monitor the manteis.systems site for issues
- Check build status
- Review analytics and report findings
- Organize files and assets
- Update the task tracker

### What Xen Can Do with Pre-Approval (batch approval):
- Generate Higgsfield images (2cr each — batch approved up to 20/week)
- Generate Higgsfield video clips (14-23cr each — batch approved up to 2/week)
- Render videos in Remotion
- Export with FFmpeg
- Schedule social posts via AutoSocial

### What Requires Explicit Rhett Approval:
- Deploying to manteis.systems (Vercel)
- Publishing to YouTube (@ManteisSystems)
- Publishing to LinkedIn (rhettelliot)
- Committing to GitHub main branch
- Spending more than 50cr/week on Higgsfield
- Any content that names or identifies a client
- Any change to pricing or service offerings
- Any change to the BRAND-GUIDELINES.md

### The Approval Workflow:
1. Xen produces content (script, images, video, social post)
2. Xen reports: "Content ready for review at [path]. Please approve or request changes."
3. Rhett approves or requests changes
4. Only after approval: Xen publishes/deployes

---

## THE DOCUMENT HIERARCHY

When a cron job or autonomous task fires, it reads these documents in order:

1. **MISSION-STATEMENT.md** (this file) — what are we doing and why
2. **BRAND-GUIDELINES.md** — how it should look, sound, and feel
3. **INTERNAL-OPERATIONS.md** — how the business runs (procurement, cloud, deployment)
4. **MEDIA-CAMPAIGN-PLAN.md** — what content to produce and when
5. **SOVEREIGN-AI-BOX.md** — hardware spec details
6. **THE-SOVEREIGN-AI-METHOD.md** — the 5-phase deployment framework
7. **public/sovereign-ai-infrastructure-guide.pdf** — the client-facing guide

If a decision is not covered by these documents, Xen defaults to the brand guidelines and asks Rhett.

---

## THE CRON JOB ROSTER

These are the scheduled tasks that enable around-the-clock operations. Each job reads this mission statement first, then its specific prompt.

| Job | Schedule | What it does |
|-----|----------|-------------|
| Media Production | Daily 9am | Generate next content asset from the MEDIA-CAMPAIGN-PLAN queue. Test on Flow first. If winning prompt, generate on Higgsfield (within credit budget). Assemble in Remotion. Save to ~/Documents/GitHub/manteis-media/renders/. Report to Rhett for approval. |
| Social Distribution | Daily 12pm + 6pm | Publish approved social assets to TikTok, IG, YT Shorts via AutoSocial (when configured). |
| YouTube Publishing | Weekly (day TBD) | Publish the next video from the E01-E24 schedule to YouTube (@ManteisSystems). Requires Rhett approval. |
| LinkedIn Post Draft | 3x/week | Draft a LinkedIn post for Rhett: case study carousel, industry commentary, or educational content. Send to Rhett for manual posting. |
| Site Monitor | Daily 8am | Check manteis.systems for issues: build status, broken links, content accuracy. Report any issues. |
| Analytics Review | Weekly Friday | Review YouTube, social, and site analytics. Report: what performed best, what underperformed, what to adjust. |
| Credit Monitor | Weekly | Check Higgsfield credit balance. If below 200cr, alert Rhett. |
| Content Queue Update | Weekly | Update the content production queue based on what's been published, what's pending approval, and what's next in the schedule. |

---

## THE CONTENT PRODUCTION QUEUE

Xen works through this queue. Each item is a unit of content to produce.

### Status Definitions:
- **DONE** — produced, approved, published
- **READY** — produced, awaiting Rhett approval
- **IN PROGRESS** — being produced right now
- **QUEUED** — next in line, not started
- **BLOCKED** — waiting on a dependency (Higgsfield credits, Rhett input, etc.)

### Current Queue:

| # | Content | Type | Status | Dependencies |
|---|---------|------|--------|-------------|
| 1 | Launch trailer (60-90s) | Video | QUEUED | Higgsfield stills + clip |
| 2 | Product demo: Starter Kit (30s) | Video | QUEUED | Higgsfield stills |
| 3 | Product demo: Manteis One (30s) | Video | QUEUED | Higgsfield stills |
| 4 | Product demo: Sovereign AI Method (30s) | Video | QUEUED | Higgsfield stills |
| 5 | Product demo: Manteis Cloud (30s) | Video | QUEUED | Higgsfield stills |
| 6 | Case study visuals (6 x 15s) | Video | QUEUED | Higgsfield stills |
| 7-16 | Social Series A: Own It (10) | Social | QUEUED | Higgsfield stills |
| 17-26 | Social Series B: Case Studies (10) | Social | QUEUED | Higgsfield stills |
| 27-36 | Social Series C: Product Promos (10) | Social | QUEUED | Higgsfield stills |
| 37-46 | Educational Shorts (10) | Social | QUEUED | Higgsfield stills |
| E01 | What is Sovereign AI? (10 min) | YouTube | QUEUED | Voice + stills + Remotion |
| E02 | Sovereign AI vs Cloud Cost (10 min) | YouTube | QUEUED | Voice + stills + Remotion |
| E03 | What is a Private LLM? (8 min) | YouTube | QUEUED | Voice + stills + Remotion |
| E04 | What is Agent Orchestration? (8 min) | YouTube | QUEUED | Voice + stills + Remotion |
| E05 | What is Vector Memory? (8 min) | YouTube | QUEUED | Voice + stills + Remotion |
| E06 | The Complete Stack Explained (12 min) | YouTube | QUEUED | Voice + stills + Remotion |
| E07-E24 | (see MEDIA-CAMPAIGN-PLAN.md) | YouTube | QUEUED | Voice + stills + Remotion |

---

## THE NORTH STAR

When lost, return to this:

**Make money learning, being creative, being in love, serving others, making the world a better place, being healthy, working out.**

Manteis Systems serves this by:
- Making money through AI consulting and product sales
- Learning by deploying real systems for real clients
- Being creative in how we educate the market and build the brand
- Serving others by giving them sovereignty over their intelligence
- Making the world a better place by ensuring AI can exist without surveillance

**Your intelligence should be an asset, not a subscription.**

That is the mission. Everything else is execution.

---

*This document is the autonomous operations directive. It is the first thing any cron job reads. It ties the brand guidelines, the internal operations, the media campaign, and the educational content into one coherent directive. Update when the mission evolves — but never let it go stale.*