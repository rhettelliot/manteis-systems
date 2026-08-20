# Manteis Systems — YouTube Video Series Storyboard
**6-Video Product Series — Sovereign OS Walkthrough**
Created: 2026-08-20 by Xen

> **Note:** Channel creation requires Rhett's Google account. This storyboard is ready for when the channel is live. All videos are DRAFT — Rhett approves before recording/uploading.

---

## Video 1: "What Is Sovereign OS?" (3:00)

**Hook (0:00-0:15)**
- Black screen. Orange text appears: "Your intelligence should be an asset, not a subscription."
- Cut to: Rhett at desk, webcam on, OWC drive visible.

**Problem (0:15-0:45)**
- Screen recording: scrolling through SaaS subscriptions (Notion, 1Password, Google Photos, Dropbox, ChatGPT Plus).
- Voiceover: "The average knowledge worker pays $200+/month for tools that own their data."
- Quick cuts of lock-in scenarios: "What if Notion shuts down? What if 1Password gets breached?"

**Solution (0:45-1:30)**
- Screen recording: Sovereign OS dashboard loads on localhost:4200.
- Pan through sidebar: Files, Passwords, Media, Photos, PDF, AI Chat, Agent, Fleet, Security.
- Voiceover: "One command. Zero cloud. Your hardware, your data, your intelligence."
- Cut to Docker containers starting up (terminal `docker compose up`).

**Architecture (1:30-2:15)**
- Diagram overlay: Mac Mini → Docker → 15+ containers → Tailscale mesh → iPhone/iPad.
- Screen recording: Fleet DM page showing enrolled devices.
- Screen recording: n8n workflows page with automation templates.

**Call to Action (2:15-3:00)**
- Screen: manteis.systems/sovereign-os landing page.
- Voiceover: "Manteis Systems builds sovereign AI infrastructure for teams that refuse to rent their own intelligence."
- End card: Manteis logo, orange accent, manteis.systems

---

## Video 2: "The Setup Wizard — From Zero to Sovereign in 10 Minutes" (5:00)

**Cold Open (0:00-0:20)**
- Terminal on black background. Single command typed: `curl -fsSL https://manteis.systems/install.sh | bash`
- Containers pull and start. Time-lapse (sped up 4x).

**The Wizard (0:20-2:00)**
- Screen recording: Sovereign OS /setup page — 6-step wizard.
- Step 1: Appliance name — type "Manteis One"
- Step 2: Configure Ollama model — select model, pull starts
- Step 3: Connect services — Nextcloud, Vaultwarden, Jellyfin auto-detected
- Step 4: Set API keys — N8N, Fleet, OpenAI (optional)
- Step 5: Personality encoding — choose archetype
- Step 6: Launch — dashboard renders

**Verification (2:00-3:00)**
- Screen recording: Dashboard fully loaded. All stat cards populate.
- Click through each sidebar section quickly — every page returns 200.
- Run smoke test in terminal: `bash scripts/smoke-test.sh` — all green.

**The Point (3:00-4:00)**
- Split screen: LEFT = "Traditional SaaS setup" (15 browser tabs, 6 credit card forms, 3 hours). RIGHT = "Sovereign OS" (one command, 10 minutes).
- Voiceover: "This is what AI infrastructure looks like when it serves you."

**Outro (4:00-5:00)**
- Pricing tiers overlay: Solo / Team / Enterprise
- Screen: manteis.systems/sovereign-os
- End card.

---

## Video 3: "Self-Hosted Apps Tour — Replace Every SaaS Subscription" (4:00)

**Intro (0:00-0:30)**
- Whiteboard diagram: SaaS logos on left (Google Drive, 1Password, Netflix, Google Photos, Adobe) → arrows to self-hosted equivalents on right (Nextcloud, Vaultwarden, Jellyfin, Immich, Stirling-PDF).

**Files — Nextcloud (0:30-1:15)**
- Screen recording: Click "Files" in Sovereign OS sidebar → Nextcloud iframe loads.
- Upload a file, share it, view calendar. Voiceover explains sync + sharing.

**Passwords — Vaultwarden (1:15-1:45)**
- Screen recording: Click "Passwords" → Vaultwarden loads.
- Create a vault entry, autofill demo. Voiceover: "Bitwarden-compatible, end-to-end encrypted, zero cloud."

**Media — Jellyfin (1:45-2:15)**
- Screen recording: Click "Media" → Jellyfin loads.
- Browse library, play a track from Manteis Recordings catalog. Show mobile app sync.

**Photos — Immich (2:15-2:45)**
- Screen recording: Click "Photos" → Immich loads.
- Upload photo, ML face recognition tags it. "Google Photos replacement with on-device ML."

**PDF Tools — Stirling-PDF (2:45-3:15)**
- Screen recording: Click "PDF Tools" → Stirling-PDF loads.
- Merge two PDFs, OCR a scanned document.

**Summary (3:15-4:00)**
- Cost comparison table: $0/month self-hosted vs $147/month SaaS equivalents.
- End card.

---

## Video 4: "AI Chat + Agent — Your Local Intelligence Layer" (4:00)

**Intro (0:00-0:30)**
- Screen: Ollama running locally. Terminal: `ollama list` showing models.
- Voiceover: "Your AI should run on your hardware, not someone else's."

**AI Chat (0:30-1:30)**
- Screen recording: Click "AI Chat" in Sovereign OS.
- Ask: "Summarize my meeting notes from yesterday" — model responds using local knowledge base.
- Show conversation history panel.

**AI Agent (1:30-2:30)**
- Screen recording: Click "AI Agent".
- Give agent a task: "Check all Docker containers and restart any that are down."
- Agent executes, shows step-by-step actions, restarts a container.

**Universal Search (2:30-3:15)**
- Screen recording: Cmd+K or click "Search".
- Type a query. Results pull from ChromaDB + Elasticsearch + file system simultaneously.

**Knowledge Base (3:15-3:45)**
- Screen recording: Click "Knowledge" → ingest a document, show it searchable.

**Outro (3:45-4:00)**
- "All of this runs on your machine. No API calls to OpenAI. No data leaves your network."
- End card.

---

## Video 5: "Fleet Management + Security — Enterprise Grade on a Shoestring" (4:00)

**Intro (0:00-0:30)**
- Diagram: Mac Mini + Cyberdeck + iPhone + iPad on Tailscale mesh.
- Voiceover: "Endpoint management isn't just for enterprises anymore."

**Fleet DM (0:30-1:30)**
- Screen recording: Click "Fleet" in Sovereign OS.
- Show enrolled hosts, osquery policies, live query results.
- "Real-time visibility into every device on your network."

**Security/SIEM (1:30-2:30)**
- Screen recording: Click "Security" → Elasticsearch SIEM dashboard.
- Show audit logs, vulnerability scans, compliance posture.

**Network Diagnostics (2:30-3:00)**
- Screen recording: Click "Network" → speed test, port scan, diagnostics.

**The Pitch (3:00-4:00)**
- "This is what a SOC 2-ready infrastructure looks like for a team of 1-50."
- Pricing: Fortress audit starts at $X.
- End card.

---

## Video 6: "Build Your Own Apps — The App Store + Generation Engine" (3:30)

**Intro (0:00-0:15)**
- Screen: Sovereign OS app gallery — 30+ apps already running.

**App Store (0:15-1:00)**
- Screen recording: Click "App Store" → browse catalog.
- Install an app (e.g., Habit Tracker) → it appears in sidebar instantly.
- Show the generated app page rendering.

**App Generation (1:00-2:00)**
- Screen recording: Click "Generate App" or use the AI Agent.
- Type a prompt: "Build me a daily journal app with mood tracking."
- Watch the AI generate the page, register it in the sidebar, and launch it.

**Your Apps Section (2:00-2:30)**
- Show the "YOUR APPS" sidebar section with custom-generated apps.

**Closing (2:30-3:30)**
- "Every app you generate lives on your machine. Every byte of data stays yours."
- Screen: manteis.systems/sovereign-os
- End card: Manteis logo, orange #FF5500 accent.

---

## Production Notes

- **OBS Setup:** Rhett configures scenes per the layout above. I'll provide the scene JSON.
- **Screen Recording:** 1920x1080, 30fps, clean desktop (hide dock, disable notifications).
- **Audio:** Rhett's voiceover via Yeti mic, post-processed in Ableton for clarity.
- **B-roll:** Docker container startup, terminal commands, file uploads.
- **Color:** Match Manteis Design Standard — #0D0F12 background, #FF5500 accent.
- **Captions:** Auto-generate via Whisper, manually correct, burn in.

## Publishing Schedule (Rhett approves)

| Video | Title | Target Length | Status |
|-------|-------|---------------|--------|
| 1 | What Is Sovereign OS? | 3:00 | Storyboard ready |
| 2 | The Setup Wizard | 5:00 | Storyboard ready |
| 3 | Self-Hosted Apps Tour | 4:00 | Storyboard ready |
| 4 | AI Chat + Agent | 4:00 | Storyboard ready |
| 5 | Fleet + Security | 4:00 | Storyboard ready |
| 6 | Build Your Own Apps | 3:30 | Storyboard ready |