#!/usr/bin/env python3
"""
Sovereign AI Infrastructure Guide — Lead Magnet PDF Generator
Manteis Systems · Batiq Noir aesthetic
Produces a 10-page PDF using PyMuPDF (fitz).

Design tokens from manteis-systems/src/app/globals.css:
  canvas:   #0D0F12  (near-black slate)
  surface:  #15181E
  ink:      #F4F3EE  (cream white)
  ink-2:    #9EA4B0  (muted)
  ink-3:    #5C6370  (dim)
  signal:   #FF5500  (solar orange)
"""

import fitz  # PyMuPDF
from pathlib import Path

# ─── DESIGN TOKENS ───────────────────────────────────────────────────────
CANVAS    = (0x0D/255, 0x0F/255, 0x12/255)
SURFACE   = (0x15/255, 0x18/255, 0x1E/255)
SURFACE_HI = (0x1A/255, 0x1E/255, 0x24/255)
INK       = (0xF4/255, 0xF3/255, 0xEE/255)
INK_2     = (0x9E/255, 0xA4/255, 0xB0/255)
INK_3     = (0x5C/255, 0x63/255, 0x70/255)
SIGNAL    = (0xFF/255, 0x55/255, 0x00/255)
HAIRLINE  = (0x21/255, 0x24/255, 0x28/255)

PAGE_W = 612  # US Letter 8.5"
PAGE_H = 792  # US Letter 11"
MARGIN = 56

OUTPUT = Path("/Users/rhett/Documents/GitHub/manteis-systems/public/sovereign-ai-infrastructure-guide.pdf")


def new_page(doc):
    page = doc.new_page(width=PAGE_W, height=PAGE_H)
    page.draw_rect(fitz.Rect(0, 0, PAGE_W, PAGE_H), fill=CANVAS)
    return page


def hairline(page, y, x0=MARGIN, x1=PAGE_W - MARGIN, color=HAIRLINE, width=0.5):
    page.draw_line(fitz.Point(x0, y), fitz.Point(x1, y), color=color, width=width)


def signal_bar(page, x, y, w=40, h=3):
    page.draw_rect(fitz.Rect(x, y, x + w, y + h), fill=SIGNAL)


def footer(page, num, total=10):
    fy = PAGE_H - 32
    hairline(page, fy - 8)
    page.insert_text(fitz.Point(PAGE_W - MARGIN - 44, fy + 4), f"{num:02d} / {total:02d}", fontname="cour", fontsize=8, color=INK_3)
    page.insert_text(fitz.Point(MARGIN, fy + 4), "MANTEIS SYSTEMS  ·  SOVEREIGN AI INFRASTRUCTURE GUIDE", fontname="cour", fontsize=7, color=INK_3)


def section_header(page, y, label, title, subtitle=None):
    page.insert_text(fitz.Point(MARGIN, y), label, fontname="cour", fontsize=8, color=SIGNAL)
    y += 14
    signal_bar(page, MARGIN, y)
    y += 16
    page.insert_textbox(fitz.Rect(MARGIN, y, PAGE_W - MARGIN, y + 60), title,
                        fontname="helv", fontsize=24, color=INK, lineheight=1.15)
    y += 32
    if subtitle:
        page.insert_textbox(fitz.Rect(MARGIN, y, PAGE_W - MARGIN, y + 40), subtitle,
                            fontname="helv", fontsize=12, color=INK_2, lineheight=1.4)
        y += 28
    return y + 8


def body(page, y, text, fontsize=11, color=INK_2, lineheight=1.6):
    max_w = PAGE_W - MARGIN * 2
    rc = page.insert_textbox(fitz.Rect(MARGIN, y, MARGIN + max_w, y + 400), text,
                             fontname="helv", fontsize=fontsize, color=color, lineheight=lineheight)
    approx_cpl = int(max_w / (fontsize * 0.52))
    lines = sum(max(1, len(p) // approx_cpl + 1) for p in text.split("\n"))
    return y + lines * fontsize * lineheight + 8


def callout(page, rect, title, body_text, accent=SIGNAL):
    page.draw_rect(rect, fill=SURFACE)
    page.draw_rect(fitz.Rect(rect.x0, rect.y0, rect.x0 + 3, rect.y1), fill=accent)
    page.draw_rect(rect, color=(1, 1, 1), width=0.5)
    ix = rect.x0 + 20
    page.insert_text(fitz.Point(ix, rect.y0 + 22), title, fontname="helv", fontsize=10, color=accent)
    page.insert_textbox(fitz.Rect(ix, rect.y0 + 30, rect.x1 - 16, rect.y1 - 12),
                        body_text, fontname="helv", fontsize=10, color=INK_2, lineheight=1.5)


def stat_row(page, y, stats):
    col_w = (PAGE_W - MARGIN * 2) / len(stats)
    for i, (value, label) in enumerate(stats):
        x = MARGIN + i * col_w
        page.insert_text(fitz.Point(x, y), value, fontname="helv", fontsize=28, color=INK)
        page.insert_textbox(fitz.Rect(x, y + 8, x + col_w - 20, y + 40),
                            label, fontname="helv", fontsize=9, color=INK_3, lineheight=1.4)
        if i > 0:
            page.draw_line(fitz.Point(x - 10, y - 4), fitz.Point(x - 10, y + 30), color=INK_3, width=0.3)
    return y + 52


# ═══════════════════════════════════════════════════════════════════════════

def build_cover(doc):
    page = new_page(doc)
    page.insert_text(fitz.Point(MARGIN, 48), "MANTEIS SYSTEMS", fontname="cour", fontsize=8, color=SIGNAL)
    page.insert_text(fitz.Point(PAGE_W - MARGIN - 120, 48), "2026 EDITION", fontname="cour", fontsize=8, color=INK_3)
    hairline(page, 60)
    signal_bar(page, MARGIN, 180, w=80, h=4)
    page.insert_textbox(fitz.Rect(MARGIN, 200, PAGE_W - MARGIN, 340),
                        "Sovereign AI\nInfrastructure\nGuide",
                        fontname="helv", fontsize=52, color=INK, lineheight=1.05)
    page.insert_textbox(fitz.Rect(MARGIN, 380, PAGE_W - MARGIN, 440),
                        "How to deploy production-grade AI entirely on-premises —\n"
                        "zero bytes to the cloud, full regulatory compliance, lower lifetime cost.",
                        fontname="helv", fontsize=14, color=INK_2, lineheight=1.5)
    y = PAGE_H - 140
    hairline(page, y - 10)
    page.insert_text(fitz.Point(MARGIN, y + 12),
                     "FOR REGULATED INDUSTRIES · LAW · HEALTHCARE · FINANCE · ENGINEERING",
                     fontname="cour", fontsize=8, color=INK_3)
    page.insert_text(fitz.Point(MARGIN, y + 32), "manteis.systems", fontname="cour", fontsize=10, color=SIGNAL)


def build_toc(doc):
    page = new_page(doc)
    y = 80
    page.insert_text(fitz.Point(MARGIN, y), "CONTENTS", fontname="cour", fontsize=8, color=SIGNAL)
    y += 14
    signal_bar(page, MARGIN, y)
    y += 20
    page.insert_textbox(fitz.Rect(MARGIN, y, PAGE_W - MARGIN, y + 40),
                        "What's Inside", fontname="helv", fontsize=24, color=INK, lineheight=1.15)
    y += 44

    entries = [
        ("01", "The Sovereignty Problem", "Why cloud AI fails regulated industries"),
        ("02", "The Local-First Stack", "Ollama, ChromaDB, Docker, n8n, MCP"),
        ("03", "Architecture Blueprint", "A production reference diagram"),
        ("04", "Security: The Fortress Protocol", "Zero-trust before deployment"),
        ("05", "Cost Analysis: Sovereign vs Cloud", "The numbers over 3 years"),
        ("06", "Deployment Roadmap", "6-week implementation plan"),
        ("07", "The Manteis Engagement Model", "Audit → Deploy → Manage"),
        ("08", "Decision Framework", "Should you go sovereign?"),
    ]
    for num, title, desc in entries:
        page.insert_text(fitz.Point(MARGIN, y), num, fontname="cour", fontsize=10, color=SIGNAL)
        page.insert_text(fitz.Point(MARGIN + 36, y), title, fontname="helv", fontsize=12, color=INK)
        page.insert_text(fitz.Point(MARGIN + 36, y + 16), desc, fontname="helv", fontsize=9, color=INK_3)
        page.draw_line(fitz.Point(MARGIN + 300, y - 3), fitz.Point(PAGE_W - MARGIN - 24, y - 3), color=INK_3, width=0.3)
        page.insert_text(fitz.Point(PAGE_W - MARGIN - 18, y), str(int(num) + 2), fontname="cour", fontsize=9, color=INK_3)
        y += 40

    y += 8
    hairline(page, y)
    y += 16
    callout(page, fitz.Rect(MARGIN, y, PAGE_W - MARGIN, y + 100),
            "EXECUTIVE SUMMARY",
            "The technology to run production AI entirely on-premises is mature and open-source. "
            "For regulated industries — law, healthcare, finance, engineering — sovereign AI infrastructure "
            "is not a philosophical preference. It is the only architecture that satisfies compliance officers "
            "while delivering the automation these firms need. This guide shows you the stack, the architecture, "
            "the security protocol, and the economics. By page 10, you'll know whether sovereign AI is right "
            "for your organization — and exactly what it takes to deploy it.")
    footer(page, 2)


def build_page_3(doc):
    page = new_page(doc)
    y = 80
    y = section_header(page, y, "SECTION 01", "The Sovereignty Problem",
                       "Why cloud AI fails the buyers who need it most")
    y = body(page, y,
             "There is a quiet bifurcation happening in enterprise AI. On one side: the cloud AI vendors, "
             "racing to commoditize inference, dropping per-token prices, and offering \"integration\" that "
             "means one thing — send us your data and we'll send back answers.")
    y = body(page, y,
             "On the other side: a growing cohort of businesses that will never, under any circumstances, "
             "send their data to a third party. Not because they're paranoid. Because their regulators, "
             "their clients, and their own risk officers won't allow it.")
    y = body(page, y,
             "These are law firms handling attorney-client privilege. Healthcare clinics bound by HIPAA. "
             "Financial institutions governed by PCI and GLBA. Engineering firms with proprietary IP. "
             "Family offices managing wealth for people who value discretion. They need AI. They cannot "
             "use the cloud. And almost nobody is building for them.")
    y += 12
    hairline(page, y)
    y += 16
    stat_row(page, y, [
        ("1,200", "staff-hours/quarter\nlost to manual\ndocument workflows"),
        ("3", "cloud AI vendors\nevaluated and\nrejected by compliance"),
        ("0", "bytes of client data\nthat can leave\nthe network"),
    ])
    y += 24
    callout(page, fitz.Rect(MARGIN, y, PAGE_W - MARGIN, y + 80),
            "THE CORE TENSION",
            "The cloud AI industry's answer to regulated buyers is Business Associate Agreements, "
            "data residency options, and \"we don't train on your data\" promises. These are real "
            "accommodations. They are also, for many buyers, insufficient — because the fundamental "
            "architecture is still your data on someone else's server.")
    footer(page, 3)


def build_page_4(doc):
    page = new_page(doc)
    y = 80
    y = section_header(page, y, "SECTION 02", "The Local-First Stack",
                       "Five open-source tools that compose into production AI infrastructure")
    y = body(page, y,
             "The technology to run production-grade AI entirely on-premises exists today and is mature. "
             "No vendor lock-in. No per-seat subscriptions. No data leaving your network. Here are the "
             "five components that compose into a sovereign AI stack:")
    y += 8
    components = [
        ("OLLAMA", "Model Serving",
         "Serves large language models locally — the same model families the cloud vendors offer "
         "(GLM, Kimi, DeepSeek, Llama, Mistral), running on hardware you own, inside your network, "
         "with zero bytes transmitted externally."),
        ("CHROMADB", "Vector Storage",
         "Provides semantic search across your document corpus. Embeddings never leave your building. "
         "Enables retrieval-augmented generation so the model answers from your documents, not from "
         "training data hallucinations."),
        ("DOCKER", "Containerization",
         "Wraps the entire stack in reproducible, upgradable, disaster-recoverable containers. "
         "No snowflake servers. No dependency hell. Backups and restores are trivial. The entire "
         "AI infrastructure is version-controlled infrastructure-as-code."),
        ("N8N", "Workflow Orchestration",
         "Connects the AI layer to your existing tools — document intake, classification, routing, "
         "compliance logging — without exposing data to external APIs. Every workflow is visible, "
         "auditable, and modifiable by your team."),
        ("MCP", "Protocol Mediation",
         "Model Context Protocol provides a standardized interface between the AI infrastructure and "
         "cloud productivity suites like M365. Your SharePoint, Exchange, and Teams data is mediated "
         "by a local server that controls what the AI can see and do — on your terms."),
    ]
    for name, role, desc in components:
        page.insert_text(fitz.Point(MARGIN, y), name, fontname="cour", fontsize=9, color=SIGNAL)
        page.insert_text(fitz.Point(MARGIN + 80, y), role, fontname="helv", fontsize=10, color=INK)
        y += 14
        page.insert_textbox(fitz.Rect(MARGIN, y, PAGE_W - MARGIN, y + 50),
                            desc, fontname="helv", fontsize=9.5, color=INK_2, lineheight=1.45)
        lines = max(2, len(desc) // 85 + 1)
        y += lines * 9.5 * 1.45 + 8
        if name != "MCP":
            hairline(page, y)
            y += 10
    footer(page, 4)


def build_page_5(doc):
    page = new_page(doc)
    y = 80
    y = section_header(page, y, "SECTION 03", "Architecture Blueprint",
                       "A production reference diagram — no confidentiality required")
    y = body(page, y,
             "The architecture below runs in production today. It is drawn without any client-specific "
             "detail — every component is open-source and deployable by any qualified engineering team. "
             "The diagram shows the fundamental principle: all AI compute and data storage stays inside "
             "the firm's network boundary. Only structured, mediated API calls reach external services.",
             fontsize=10)
    y += 16

    # Architecture diagram
    dl = MARGIN + 20
    dr = PAGE_W - MARGIN - 20
    dw = dr - dl
    bh = 32
    gap = 12

    # Network boundary
    page.draw_rect(fitz.Rect(dl - 10, y, dr + 10, y + 220), color=SIGNAL, width=1.0)
    page.insert_text(fitz.Point(dl, y - 6), "FIRM INTERNAL NETWORK (AIR-GAPPED)", fontname="cour", fontsize=7, color=SIGNAL)

    bw = (dw - gap) / 2
    # Ollama + ChromaDB
    page.draw_rect(fitz.Rect(dl, y + 10, dl + bw, y + 10 + bh), fill=SURFACE, color=(1, 1, 1), width=0.5)
    page.insert_text(fitz.Point(dl + 12, y + 30), "OLLAMA (LLM)", fontname="cour", fontsize=8, color=INK)
    page.draw_rect(fitz.Rect(dl + bw + gap, y + 10, dr, y + 10 + bh), fill=SURFACE, color=(1, 1, 1), width=0.5)
    page.insert_text(fitz.Point(dl + bw + gap + 12, y + 30), "CHROMADB (VECTORS)", fontname="cour", fontsize=8, color=INK)
    page.draw_line(fitz.Point(dl + bw, y + 26), fitz.Point(dl + bw + gap, y + 26), color=SIGNAL, width=0.8)

    # n8n
    n8n_y = y + 10 + bh + gap + 16
    page.draw_rect(fitz.Rect(dl, n8n_y, dr, n8n_y + bh), fill=SURFACE, color=(1, 1, 1), width=0.5)
    page.insert_text(fitz.Point(dl + 12, n8n_y + 20), "N8N (ORCHESTRATION) — INTAKE · ROUTING · AUDIT LOG", fontname="cour", fontsize=8, color=INK)
    page.draw_line(fitz.Point(dl + bw/2, y + 10 + bh), fitz.Point(dl + bw/2, n8n_y), color=INK_3, width=0.5)
    page.draw_line(fitz.Point(dl + bw + gap/2, y + 10 + bh), fitz.Point(dl + bw + gap/2, n8n_y), color=INK_3, width=0.5)

    # MCP
    mcp_y = n8n_y + bh + gap + 16
    page.draw_rect(fitz.Rect(dl + 40, mcp_y, dr - 40, mcp_y + bh), fill=SURFACE, color=(1, 1, 1), width=0.5)
    page.insert_text(fitz.Point(dl + 52, mcp_y + 20), "MCP SERVER (LOCAL) — M365 MEDIATION", fontname="cour", fontsize=8, color=INK)
    page.draw_line(fitz.Point(dl + dw/2, n8n_y + bh), fitz.Point(dl + dw/2, mcp_y), color=INK_3, width=0.5)

    # Arrow to M365
    ay = mcp_y + bh
    page.draw_line(fitz.Point(dl + dw/2, ay), fitz.Point(dl + dw/2, ay + 24), color=SIGNAL, width=0.8)

    # M365 (external)
    m365_y = ay + 28
    page.draw_rect(fitz.Rect(dl + 60, m365_y, dr - 60, m365_y + bh), color=INK_3, width=0.5, dashes=[3, 3])
    page.insert_text(fitz.Point(dl + 72, m365_y + 20), "M365 (CLOUD) — SHAREPOINT · EXCHANGE · TEAMS", fontname="cour", fontsize=8, color=INK_3)

    # Principles
    y = m365_y + bh + 28
    hairline(page, y)
    y += 14
    principles = [
        "Sovereign compute — LLM runs on hardware you own, inside your network. No external API calls.",
        "Local vector storage — embeddings never leave the building. Your corpus stays your corpus.",
        "MCP mediation — cloud integrations are brokered by a local server you control.",
        "Full audit trail — every interaction logged. Demonstrate compliance without exposing data.",
        "Docker-containerized — upgrades, backups, and disaster recovery are trivial and scripted.",
    ]
    for p in principles:
        page.insert_text(fitz.Point(MARGIN, y), "▸", fontname="helv", fontsize=10, color=SIGNAL)
        page.insert_text(fitz.Point(MARGIN + 16, y), p, fontname="helv", fontsize=9.5, color=INK_2)
        y += 18
    footer(page, 5)


def build_page_6(doc):
    page = new_page(doc)
    y = 80
    y = section_header(page, y, "SECTION 04", "Security: The Fortress Protocol",
                       "Zero-trust hardening before any AI goes in")
    y = body(page, y,
             "Deploying AI on a vulnerable network creates new attack surfaces. The security posture "
             "must be assessed and hardened before any model is loaded. This is not optional — it is "
             "professional malpractice to deploy AI infrastructure on a network you haven't audited.")
    y += 12
    phases = [
        ("PHASE 1", "Network Topology Mapping",
         "Identify every data flow path for regulated information, from intake to archival. "
         "Document what goes where, through what protocol, authenticated by what mechanism. "
         "You cannot secure what you have not mapped."),
        ("PHASE 2", "Access Control Audit",
         "Review Active Directory group policies, file share permissions, and remote access "
         "configurations against zero-trust principles. The most common finding: legacy VPN "
         "configs that grant broader access than any current role requires."),
        ("PHASE 3", "Gap Analysis",
         "Document where current practices fall short of regulatory obligations — privilege "
         "standards, records retention, breach notification protocols. Prioritize gaps by "
         "risk severity and remediation cost."),
        ("PHASE 4", "AI-Readiness Assessment",
         "Classify which workflows are safe for AI augmentation versus which require human-only "
         "handling. Not every document should touch a model. The assessment defines the boundary."),
    ]
    for phase, title, desc in phases:
        page.insert_text(fitz.Point(MARGIN, y), phase, fontname="cour", fontsize=8, color=SIGNAL)
        page.insert_text(fitz.Point(MARGIN + 60, y), title, fontname="helv", fontsize=11, color=INK)
        y += 16
        page.insert_textbox(fitz.Rect(MARGIN, y, PAGE_W - MARGIN, y + 45),
                            desc, fontname="helv", fontsize=9.5, color=INK_2, lineheight=1.45)
        lines = max(2, len(desc) // 90 + 1)
        y += lines * 9.5 * 1.45 + 10
        hairline(page, y)
        y += 8
    callout(page, fitz.Rect(MARGIN, y, PAGE_W - MARGIN, y + 70),
            "FORTRESS PRINCIPLE",
            "The security audit frequently pays for itself before any AI is deployed. In a recent "
            "engagement, three critical remote-access vulnerabilities were identified that predated "
            "the AI work — the audit remediated risks the firm didn't know it had.")
    footer(page, 6)


def build_page_7(doc):
    page = new_page(doc)
    y = 80
    y = section_header(page, y, "SECTION 05", "Cost Analysis: Sovereign vs Cloud",
                       "The three-year economics for a 60-person regulated firm")
    y = body(page, y,
             "Local-first AI is not just a compliance play. It is an economic one. The cost crossover "
             "happens in year two — and the gap widens every year after as you stop paying per-seat for "
             "inference that runs on hardware you already own.", fontsize=10)
    y += 16

    col_x = [MARGIN, MARGIN + 140, MARGIN + 290]
    # Header
    page.draw_rect(fitz.Rect(MARGIN, y, PAGE_W - MARGIN, y + 28), fill=SURFACE)
    for i, label in enumerate(["", "CLOUD SaaS", "SOVEREIGN"]):
        page.insert_text(fitz.Point(col_x[i] + 12, y + 18), label, fontname="cour", fontsize=8,
                         color=SIGNAL if i > 0 else INK_3)
    y += 28

    rows = [
        ("Year 1 — Hardware", "Included", "$12K (one-time)"),
        ("Year 1 — Deployment", "$0 (self-serve)", "$35K (one-time)"),
        ("Year 1 — Subscription/Retainer", "$144K ($200/seat × 60)", "$54K ($4.5K/mo)"),
        ("Year 1 — Legal/BAA Review", "$20K (one-time)", "$0"),
        ("Year 1 TOTAL", "$164K", "$101K"),
        ("Year 2 — Subscription/Retainer", "$144K", "$54K"),
        ("Year 3 — Subscription/Retainer", "$144K", "$54K"),
        ("3-YEAR TOTAL", "$452K", "$209K"),
    ]
    for label, cloud, sovereign in rows:
        is_total = "TOTAL" in label
        rh = 28 if is_total else 24
        if is_total:
            page.draw_rect(fitz.Rect(MARGIN, y, PAGE_W - MARGIN, y + rh), fill=SURFACE_HI)
        fs = 11 if is_total else 10
        page.insert_text(fitz.Point(col_x[0] + 12, y + 16), label, fontname="helv", fontsize=fs, color=INK if is_total else INK_2)
        page.insert_text(fitz.Point(col_x[1] + 12, y + 16), cloud, fontname="helv", fontsize=fs, color=INK if is_total else INK_2)
        page.insert_text(fitz.Point(col_x[2] + 12, y + 16), sovereign, fontname="helv", fontsize=fs, color=SIGNAL if is_total else INK)
        if not is_total:
            hairline(page, y + rh, width=0.3)
        y += rh

    y += 20
    callout(page, fitz.Rect(MARGIN, y, PAGE_W - MARGIN, y + 85),
            "THE SOVEREIGNTY PREMIUM",
            "Over three years, sovereign AI saves $243K — a 54% reduction in total cost of ownership. "
            "And that calculation ignores the competitive moat: the sovereign firm can customize models, "
            "tune workflows, and build proprietary automation that the SaaS customer cannot — because "
            "the SaaS customer's AI is a black box they rent, not an asset they own.")
    footer(page, 7)


def build_page_8(doc):
    page = new_page(doc)
    y = 80
    y = section_header(page, y, "SECTION 06", "Deployment Roadmap",
                       "A 6-week implementation plan from audit to production")
    y += 8
    weeks = [
        ("WEEK 1-2", "Fortress Security Audit", [
            "Network topology mapping",
            "Access control audit (AD, file shares, VPN)",
            "Gap analysis against regulatory obligations",
            "AI-readiness classification of workflows",
            "Deliverable: 40-page security posture report",
        ]),
        ("WEEK 3-4", "Infrastructure Deployment", [
            "Provision GPU workstation on internal network",
            "Deploy Ollama with locally-quantized model",
            "Deploy ChromaDB + index document corpus",
            "Deploy n8n orchestration layer",
            "Deploy MCP server for M365 mediation",
        ]),
        ("WEEK 5", "Integration + Workflows", [
            "Connect AI stack to existing M365 environment",
            "Build document intake automation workflow",
            "Build template drafting workflow",
            "Configure Slack/Teams integration",
            "Enable full audit logging",
        ]),
        ("WEEK 6", "Validation + Handoff", [
            "End-to-end workflow testing with real documents",
            "Compliance officer review of audit trail",
            "Team training (pull-based, not mandatory sessions)",
            "Documentation handoff (architecture + runbooks)",
            "Transition to managed retainer model",
        ]),
    ]
    for week, title, items in weeks:
        page.insert_text(fitz.Point(MARGIN, y), week, fontname="cour", fontsize=8, color=SIGNAL)
        page.insert_text(fitz.Point(MARGIN + 60, y), title, fontname="helv", fontsize=11, color=INK)
        y += 16
        for item in items:
            page.insert_text(fitz.Point(MARGIN + 60, y), "·", fontname="helv", fontsize=10, color=INK_3)
            page.insert_text(fitz.Point(MARGIN + 72, y), item, fontname="helv", fontsize=9, color=INK_2)
            y += 14
        y += 6
        hairline(page, y, width=0.3)
        y += 10
    footer(page, 8)


def build_page_9(doc):
    page = new_page(doc)
    y = 80
    y = section_header(page, y, "SECTION 07", "The Manteis Engagement Model",
                       "Audit → Deploy → Manage — an integrated lifecycle, not a product")
    y = body(page, y,
             "Most AI consultancies sell one of two things: a SaaS subscription (\"send us your data\") "
             "or a one-time deployment (\"we'll set up Ollama for you\"). Neither works for regulated "
             "industries. The first violates compliance. The second leaves the firm with infrastructure "
             "that decays — stale models, stagnant workflows, no security monitoring.")
    y += 8
    y = body(page, y,
             "Manteis sells a third thing: the integrated lifecycle. Security audit first, because "
             "deploying AI on a vulnerable network is malpractice. Sovereign infrastructure second, "
             "because the technology exists and the architecture is proven. Managed retainer third, "
             "because AI is not a set-and-forget tool — it is infrastructure that needs tending.",
             fontsize=10)
    y += 16
    phases = [
        ("01", "FORTRESS AUDIT", "$12K", "2 weeks",
         "Full security assessment of existing data handling. Network topology, access controls, "
         "gap analysis, AI-readiness classification. The audit pays for itself — it frequently "
         "finds pre-existing vulnerabilities that predate the AI engagement."),
        ("02", "INFRASTRUCTURE DEPLOY", "$35K", "6 weeks",
         "Sovereign AI stack deployed: Ollama, ChromaDB, Docker, n8n, MCP. Integrated with existing "
         "M365 environment. Production workflows live. Full audit trail. Zero bytes of client data "
         "leave the network. The firm owns the infrastructure."),
        ("03", "MANAGED RETAINER", "$4.5K/mo", "Ongoing",
         "Model updates, workflow optimization, security monitoring, use-case development. Quarterly "
         "workshops to identify new AI applications. The infrastructure is maintained, not abandoned. "
         "AI is a garden, not a server you rack and forget."),
    ]
    for num, name, price, duration, desc in phases:
        page.insert_text(fitz.Point(MARGIN, y), num, fontname="cour", fontsize=16, color=SIGNAL)
        page.insert_text(fitz.Point(MARGIN + 36, y), name, fontname="helv", fontsize=12, color=INK)
        page.insert_text(fitz.Point(PAGE_W - MARGIN - 120, y), price, fontname="cour", fontsize=10, color=INK)
        page.insert_text(fitz.Point(PAGE_W - MARGIN - 50, y), duration, fontname="cour", fontsize=9, color=INK_3)
        y += 16
        page.insert_textbox(fitz.Rect(MARGIN + 36, y, PAGE_W - MARGIN, y + 50),
                            desc, fontname="helv", fontsize=9.5, color=INK_2, lineheight=1.45)
        lines = max(2, len(desc) // 90 + 1)
        y += lines * 9.5 * 1.45 + 14
        hairline(page, y, width=0.3)
        y += 12
    callout(page, fitz.Rect(MARGIN, y, PAGE_W - MARGIN, y + 60),
            "WHAT YOU BUY",
            "You don't buy an AI product. You buy a capability — the ability to deploy AI on your "
            "terms, inside your regulatory constraints, with a partner who maintains it. That is "
            "what Manteis Systems sells.")
    footer(page, 9)


def build_page_10(doc):
    page = new_page(doc)
    y = 80
    y = section_header(page, y, "SECTION 08", "Decision Framework",
                       "Should your organization go sovereign?")
    y += 8
    questions = [
        ("Does your compliance officer reject cloud AI vendors?",
         "If yes, sovereign AI isn't an option — it's the only option."),
        ("Is your data regulated, privileged, or competitively sensitive?",
         "Regulated (HIPAA, PCI, GLBA), privileged (attorney-client), or proprietary (trade secrets) "
         "all point the same direction: on-premises."),
        ("Do you have 60+ knowledge workers doing repetitive document work?",
         "Document intake, classification, template drafting, precedent retrieval — these are the "
         "workflows where local AI delivers 70-90% time reduction."),
        ("Can you provision a GPU workstation on your internal network?",
         "A single workstation ($8-15K) serves a 60-person firm. No data center required. "
         "Air-gapped from internet, accessible via existing VPN."),
        ("Do you need a competitive moat the SaaS model can't provide?",
         "The sovereign firm customizes models, tunes workflows, and builds proprietary automation. "
         "The SaaS customer rents a black box. The moat is ownership."),
    ]
    for question, answer in questions:
        page.insert_text(fitz.Point(MARGIN, y), "?", fontname="helv", fontsize=14, color=SIGNAL)
        page.insert_textbox(fitz.Rect(MARGIN + 20, y - 10, PAGE_W - MARGIN, y + 20),
                            question, fontname="helv", fontsize=10, color=INK, lineheight=1.3)
        y += 20
        page.insert_textbox(fitz.Rect(MARGIN + 20, y, PAGE_W - MARGIN, y + 35),
                            answer, fontname="helv", fontsize=9, color=INK_2, lineheight=1.4)
        lines = max(1, len(answer) // 95 + 1)
        y += lines * 9 * 1.4 + 12
        hairline(page, y, width=0.3)
        y += 10

    # CTA
    y += 4
    cr = fitz.Rect(MARGIN, y, PAGE_W - MARGIN, y + 90)
    page.draw_rect(cr, fill=SURFACE_HI)
    page.draw_rect(cr, color=SIGNAL, width=1.0)
    page.insert_text(fitz.Point(MARGIN + 20, y + 24), "NEXT STEP", fontname="cour", fontsize=8, color=SIGNAL)
    page.insert_textbox(fitz.Rect(MARGIN + 20, y + 32, PAGE_W - MARGIN - 20, y + 60),
                        "Book a free 30-minute Sovereignty Audit.",
                        fontname="helv", fontsize=16, color=INK, lineheight=1.2)
    page.insert_textbox(fitz.Rect(MARGIN + 20, y + 58, PAGE_W - MARGIN - 20, y + 85),
                        "manteis.systems  ·  We'll assess your readiness and tell you\n"
                        "exactly what sovereign AI would look like in your environment.",
                        fontname="helv", fontsize=10, color=INK_2, lineheight=1.4)
    footer(page, 10)


# ═══════════════════════════════════════════════════════════════════════════

def main():
    doc = fitz.open()
    build_cover(doc)
    build_toc(doc)
    build_page_3(doc)
    build_page_4(doc)
    build_page_5(doc)
    build_page_6(doc)
    build_page_7(doc)
    build_page_8(doc)
    build_page_9(doc)
    build_page_10(doc)

    doc.set_metadata({
        "title": "Sovereign AI Infrastructure Guide",
        "author": "Manteis Systems",
        "subject": "How to deploy production-grade AI entirely on-premises",
        "keywords": "sovereign AI, local-first AI, on-premises AI, Ollama, regulated industries, compliance",
        "creator": "Manteis Systems",
    })

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    doc.save(str(OUTPUT), deflate=True, garbage=4)
    doc.close()
    print(f"✓ PDF generated: {OUTPUT}")
    print(f"  Pages: 10")
    print(f"  Size: {OUTPUT.stat().st_size / 1024:.1f} KB")


if __name__ == "__main__":
    main()