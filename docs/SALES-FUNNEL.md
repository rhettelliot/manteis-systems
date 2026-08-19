# Sales Funnel — Assessment → Demo → Proposal → Close

> Last updated: 2026-08-19 by Xen
> Status: Active — funnel infrastructure built, operational

---

## FUNNEL OVERVIEW

```
 ┌─────────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐
 │   AWARENESS  │────▶│ ASSESSMENT│────▶│   DEMO   │────▶│ PROPOSAL │────▶│   CLOSE  │
 │  (Organic)  │     │  (Lead)   │     │ (SQL)    │     │ (Opp)    │     │ (Won)    │
 └─────────────┘     └──────────┘     └──────────┘     └──────────┘     └──────────┘
   manteis.systems    /assessment      sovereign.       Custom proposal   Contract signed
   LinkedIn           12 questions     manteis.systems  scoped to client  50% deposit
   Blog posts         Free report      Live walkthrough
   YouTube            Captured to CRM  Password-protected
```

---

## STAGE 1 — AWARENESS (Top of Funnel)

**Entry points:**
- manteis.systems homepage — SEO for "AI consultant Seattle", "local AI infrastructure"
- /sovereign-os landing page — SEO for "local AI operating system", "sovereign AI"
- /products page — 4 digital products as tripwires ($35–$97)
- LinkedIn content (Rhett posts — drafted by Xen)
- Blog posts (3 published, more planned)
- YouTube demo videos (future — Rhett records)

**Goal:** Drive traffic to /assessment

**Metrics:**
- Google Analytics (GA4) tracks all page views
- UTM parameters on LinkedIn/social posts
- Conversion rate: visitors → assessment starts

---

## STAGE 2 — ASSESSMENT (Lead Capture)

**What it is:**
- 12-question interactive assessment at manteis.systems/assessment
- Covers: Infrastructure, Data Sovereignty, Automation, Team, Security, Timeline, Budget
- Each question has 4 scored options (0-3 points)
- Total score: 0-36, expressed as percentage

**What happens:**
1. User answers 12 questions (5 minutes)
2. Contact capture: Name, Email, Company (required)
3. Lead data POSTed to /api/lead-capture → n8n webhook
4. n8n workflow:
   - Inserts lead into Postgres CRM
   - Sends auto-reply email with results summary
   - Sends iMessage notification to Rhett
   - Creates Plane issue for follow-up
5. User sees results page with:
   - Readiness score (percentage)
   - Tier classification (Sovereign Ready / Deployment Candidate / Pilot Ready / Early Stage)
   - Category breakdown bars
   - CTA to explore Sovereign OS or discuss results

**Lead scoring tiers:**
| Score | Tier | Recommended Action |
|-------|------|-------------------|
| 75%+ | Sovereign Ready | Enterprise proposal — full stack deployment |
| 50-74% | Deployment Candidate | Standard proposal — multi-workflow deployment |
| 25-49% | Pilot Ready | Starter proposal — single workflow pilot |
| 0-24% | Early Stage | Sell Starter Kit ($97) — self-service education |

**Metrics:**
- Assessment completion rate
- Lead capture rate (assessments started → contact info submitted)
- Lead quality distribution (tier breakdown)

---

## STAGE 3 — DEMO (Sales Qualified Lead)

**Trigger:** Assessment completed with score ≥ 25%

**What happens:**
1. Rhett receives iMessage notification within minutes
2. Rhett reviews lead in Plane/CRM within 48 hours
3. Rhett sends personalized follow-up email referencing their assessment score
4. Invite to live demo at sovereign.manteis.systems (password-protected)
5. Demo walkthrough: 15-30 minute screen share
   - Show the Sovereign OS dashboard
   - Demonstrate local LLM inference
   - Show vector search and workflow automation
   - Address specific pain points from assessment

**Demo infrastructure:**
- sovereign.manteis.systems — live demo instance
- LOCAL_API_KEY gate — password protected
- All 21 pages accessible for walkthrough

**Metrics:**
- Assessment → demo booked conversion rate
- Demo attendance rate
- Demo → proposal conversion rate

---

## STAGE 4 — PROPOSAL (Opportunity)

**Trigger:** Demo completed, prospect expresses interest

**What happens:**
1. Rhett scopes engagement based on:
   - Assessment score and tier
   - Demo conversation findings
   - Client budget and timeline
2. Custom proposal generated using /proposals template
3. Proposal includes:
   - Phased approach with deliverables
   - Hardware recommendations (if needed)
   - Timeline with milestones
   - Investment breakdown
   - Payment terms (50/25/25 for implementation)
4. Proposal sent within 5 business days of demo

**Proposal tiers (from PRICING-SHEET.md):**
| Tier | Range | Typical Scope |
|------|-------|---------------|
| Starter | $15K–$50K | Single workflow, compact hardware, ≤5 users |
| Standard | $50K–$150K | Multi-workflow, professional hardware, 5-20 users |
| Enterprise | $150K+ | Full stack, enterprise hardware, 50+ users |

**Metrics:**
- Proposal → close rate
- Average deal size
- Time from demo to proposal
- Time from proposal to close

---

## STAGE 5 — CLOSE (Won)

**Trigger:** Proposal accepted

**What happens:**
1. Contract signed
2. 50% deposit invoiced via Stripe
3. Project created in Plane
4. Kickoff scheduled
5. Deployment begins per proposal timeline

**Post-close:**
- 30-90 day post-deployment support (per tier)
- Quarterly health checks (Standard+)
- Monthly retainer option (managed services)
- Case study development (with client permission)

**Metrics:**
- Win rate
- Average contract value
- Time to revenue (assessment → deposit)
- Lifetime value (initial + managed services + upsells)

---

## REVENUE MODEL

### Digital Products (Self-Service)
| Product | Price | Margin | Role in Funnel |
|---------|-------|--------|----------------|
| Sovereign AI Starter Kit | $97 | ~100% | Tripwire — educates, qualifies |
| Bio-Tactical Neural Countermeasures | $47 | ~100% | Wellness audience crossover |
| Kybalion Tactical | $57 | ~100% | Wellness audience crossover |
| Sewa: Kundalini Teachings | $35 | ~100% | Wellness audience crossover |
| Complete Operator Library (bundle) | $188 | ~100% | Upsell — all 4 products |

### Consulting Engagements (Sales-Assisted)
| Tier | Range | Typical Margin |
|------|-------|----------------|
| Starter | $15K–$50K | 60-70% (labor, hardware at cost+) |
| Standard | $50K–$150K | 65-75% |
| Enterprise | $150K+ | 70-80% |

### Managed Services (Recurring)
| Tier | Monthly | Margin |
|------|---------|--------|
| Essential | $1K–$2K | 80%+ |
| Professional | $2K–$5K | 75-85% |
| Enterprise | $5K–$15K | 70-80% |

---

## AUTOMATION TOUCHPOINTS

| Stage | Automation | Tool |
|-------|-----------|------|
| Assessment | Lead capture → CRM + auto-reply + iMessage | n8n webhook |
| Assessment | Lead scored automatically | Assessment form logic |
| Demo | Rhett notified instantly | iMessage via n8n |
| Proposal | Template generation | /proposals route |
| Close | Deposit invoiced | Stripe |
| Post-close | Project created | Plane API |
| Ongoing | Morning briefing | Hermes cron → Discord |

---

## FUNNEL HEALTH METRICS (Weekly Review)

1. **Assessment starts** — traffic to /assessment
2. **Assessment completion rate** — starts → contact submitted
3. **Lead quality** — tier distribution of completed assessments
4. **Demo conversion** — leads → demos booked
5. **Proposal conversion** — demos → proposals sent
6. **Close rate** — proposals → contracts signed
7. **Average deal size** — revenue / contracts
8. **Time to revenue** — assessment → deposit received
9. **Product sales** — digital product revenue (self-service)
10. **MRR** — managed services recurring revenue

---

*This funnel is operational. The assessment form is live, the lead capture pipeline is wired, and the demo instance is accessible. Rhett's manual touchpoints: follow-up emails, demo delivery, proposal scoping, contract signing.*