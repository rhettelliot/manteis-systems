# MANTEIS SOVEREIGN OS — MVP BUILD STACK
## Claude Code Prompt Sequence
## Build the entire product in order. Each prompt is self-contained.

---

## HOW TO USE THIS

1. Open Claude Code in a fresh directory: `mkdir ~/manteis-sovereign-os && cd ~/manteis-sovereign-os && claude`
2. Feed each prompt to Claude Code one at a time
3. Wait for each to complete before moving to the next
4. Some prompts depend on earlier ones — go in order
5. Test after each step — run the dev server, check the UI

## TECH STACK
- Next.js 14 (App Router, TypeScript)
- Tailwind CSS
- Shadcn/ui components
- Docker Compose for the backend stack
- All APIs called from server-side Next.js routes (not client-side)

---

## PROMPT 1: PROJECT SCAFFOLD

```
Create a Next.js 14 project with the following requirements:

- App Router with TypeScript
- Tailwind CSS configured with these custom colors:
  - background: #0D0F12 (near-black slate)
  - accent: #FF5500 (solar orange)  
  - blue: #007AFF (signal blue)
  - green: #00D455 (positive green)
  - danger: #FF3B30
- Inter font from next/font/google (NO SERIF)
- Shadcn/ui initialized with dark theme defaults
- Project name: manteis-sovereign-os
- Create a layout with a sidebar navigation containing these routes:
  - / (Dashboard)
  - /chat (AI Chat)
  - /search (Document Search)
  - /workflows (Workflows)
  - /models (AI Models)
  - /fleet (Fleet Management)
  - /security (Security Operations)
  - /knowledge (Knowledge Graph)
  - /environment (Environment Map)
  - /settings (Settings)
- The sidebar should be dark (#0D0F12), 240px wide, with orange (#FF5500) active states
- The main content area should have a max-width of 1400px, centered
- All text in Inter, no serif anywhere
- Dark mode ONLY — no light mode toggle
- Create a placeholder page for each route with just an h1

Run: npx create-next-app@latest manteis-sovereign-os --typescript --tailwind --app --eslint
Then configure everything above.
```

---

## PROMPT 2: API CLIENT LIBRARY

```
Create a lib/api.ts file that contains typed client functions for all 9 backend APIs.
Each client should have a base URL configurable via environment variable, with a fallback to localhost.

The 9 APIs:

1. Ollama (OLLAMA_URL, default http://localhost:11434)
   - GET /api/tags — list installed models
   - POST /api/generate — generate completion (stream: true)
   - POST /api/embeddings — generate embedding for text
   - POST /api/pull — pull a new model
   - DELETE /api/delete — remove a model

2. ChromaDB (CHROMA_URL, default http://localhost:8001)
   - GET /api/v1/collections — list collections
   - POST /api/v1/collections — create collection
   - POST /api/v1/collections/{collection}/add — add documents with embeddings
   - POST /api/v1/collections/{collection}/query — semantic search

3. n8n (N8N_URL, default http://localhost:5679)
   - GET /api/v1/workflows — list workflows
   - POST /api/v1/workflows/{id}/activate — activate workflow
   - POST /api/v1/workflows/{id}/deactivate — deactivate workflow
   - GET /api/v1/executions — recent executions

4. Docker (DOCKER_URL, default http://localhost:2375)
   - GET /containers/json — list running containers
   - GET /containers/{id}/stats — container stats
   - POST /containers/{id}/restart — restart container

5. pfSense (PFSENSE_URL, default http://localhost:443)
   - GET /api/v1/firewall/rules — list firewall rules
   - POST /api/v1/firewall/rules — add rule (requires approval flag)
   - GET /api/v1/diagnostics/traffic — traffic analysis
   - GET /api/v1/status/system — system status

6. Fleet DM (FLEET_URL, default http://localhost:8080)
   - GET /api/v1/fleet/hosts — list all endpoints
   - GET /api/v1/fleet/hosts/{id} — endpoint details
   - POST /api/v1/fleet/queries — run a live query across fleet
   - POST /api/v1/fleet/policies — push a configuration policy

7. Elastic (ELASTIC_URL, default http://localhost:9200)
   - POST /security-events/_search — search security events
   - GET /_cluster/health — cluster health
   - POST /security-events/_doc — index a security event

8. Neo4j (NEO4J_URL, default bolt://localhost:7687)
   - Use neo4j-driver npm package
   - Query: list all nodes by label
   - Query: list all relationships
   - Query: traverse from a node to find connected entities
   - Mutation: create entity + relationships from JSON

9. File System (local, via Node.js fs)
   - List documents directory
   - Read file metadata
   - Watch for new files (chokidar)

Each client should:
- Use fetch() for HTTP APIs
- Have proper TypeScript types for request/response
- Handle errors gracefully (return null or throw typed errors)
- Have a health check function that pings the API and returns boolean
- Be importable as individual functions: import { ollama, chromadb, n8n } from '@/lib/api'
```

---

## PROMPT 3: DASHBOARD PAGE

```
Create the main dashboard page at app/page.tsx.

This is the first thing the client sees when they open sovereign.local.

Layout:
- Full-width header: "Manteis Sovereign AI" in 32px Inter Bold, with a green status dot and "All systems operational" text
- Below header: a prominent banner that says "Your AI is running locally. 0 bytes have left your network." in a glassmorphism panel with subtle orange border glow
- Grid of stat cards (3 columns on desktop, 1 on mobile):
  1. AI Models Loaded — number from ollama.listModels()
  2. Documents Indexed — number from chromadb.count()
  3. Active Workflows — number from n8n.listActiveWorkflows()
  4. Fleet Devices — number from fleet.listHosts()
  5. Security Status — "All Clear" or "X Alerts" from elastic.searchRecent()
  6. Knowledge Entities — number from neo4j.countNodes()

- Each stat card: dark glassmorphism (#0D0F12 with 60% opacity, backdrop-blur, 1px border #FF5500 at 20% opacity), number in 48px Inter Bold orange (#FF5500), label in 14px Inter Regular #888
- Below the grid: "Recent Activity" feed showing last 10 events from across the system (workflow executions, new documents indexed, security events, fleet changes) — each event as a row with timestamp, type icon, and description
- The page should call the API clients from lib/api.ts and display real data if available, or placeholder "Not connected" states if the APIs aren't reachable
- Create a server component that fetches all stats in parallel and passes to a client component for display

Design rules:
- Background: #0D0F12
- Cards: rgba(13, 15, 18, 0.6) with backdrop-blur-md and border rgba(255, 85, 0, 0.2)
- Numbers: #FF5500, 48px, Inter Bold
- Labels: #888888, 14px, Inter Regular  
- No shadows except subtle orange glow on hover
- Sharp corners (border-radius: 0) — Manteis design standard
- Mobile: stack everything vertically
```

---

## PROMPT 4: SETUP WIZARD

```
Create a multi-step setup wizard at app/setup/page.tsx.

This is what a client sees the first time they power on the appliance.

Steps (one per screen, with a progress bar at top):

Step 1: WELCOME
- Full-screen #0D0F12 background
- Centered: Manteis logo (text: "MANTEIS" in 64px Inter Bold white, "SOVEREIGN AI" in 20px Inter Regular orange #FF5500, letter-spaced)
- Below: "Your intelligence, your hardware, your network."
- Below: "This setup takes 5 minutes. Your data never leaves your network."
- Button: "Begin Setup" (orange #FF5500 background, black text, sharp corners)

Step 2: NETWORK CONFIRMATION
- "Confirm your network"
- Display: detected IP range, network interface, firewall status
- Checkbox: "I confirm this appliance should only operate within my local network"
- Checkbox: "My firewall is active and configured"
- Button: "Continue"

Step 3: MODEL SELECTION
- "Choose your AI models"
- Display 4 model cards in a grid, each card has:
  - Model name (no technical jargon): "Fast & Efficient" / "Deep Reasoning" / "Code Specialist" / "Document Expert"
  - Underneath in small grey text: actual model name (e.g. "glm-5.2:8b" / "deepseek-v3.2:70b")
  - RAM requirement in plain English: "Uses 4GB RAM" / "Uses 16GB RAM"
  - Toggle switch to enable/disable
- Button: "Install Selected Models" — triggers ollama.pull() for each selected model
- Show download progress bar for each model

Step 4: WORKFLOW ACTIVATION
- "Select the workflows you want"
- Display 5 workflow cards with toggle switches:
  1. Document Processing — "Automatically process incoming documents"
  2. Email Classification — "Classify and draft responses to incoming emails"
  3. Inventory Alerts — "Monitor stock levels and alert before shortages"
  4. Report Generation — "Generate weekly/monthly reports automatically"
  5. IT Monitoring — "Monitor system health and alert on issues"
- Each toggle activates/deactivates the n8n workflow
- Button: "Activate Workflows"

Step 5: SECURITY CONFIRMATION
- "Your security posture"
- Display: "Zero bytes will leave your network. All AI processing happens on this appliance."
- Display: firewall status (from pfSense API if available, else generic confirmation)
- Display: "Encryption: Active. Your data is encrypted at rest."
- Button: "Confirm Security Settings"

Step 6: COMPLETE
- Full screen
- Centered: green checkmark icon
- "You are sovereign."
- "Your AI is running locally. 0 bytes have left your network."
- Display: summary of what was configured (models installed, workflows activated)
- Button: "Open Dashboard" → navigates to /

Use React state for the multi-step flow. Each step is a component. The progress bar at top shows 6 dots, filling as you progress. Orange for completed, white for current, grey for upcoming.

Design: same Manteis standard. Dark, sharp corners, orange accents, Inter font, glassmorphism panels.
```

---

## PROMPT 5: AI CHAT INTERFACE

```
Create the AI chat interface at app/chat/page.tsx.

This is the client's ChatGPT replacement — but it runs on their hardware.

Layout:
- Full-height chat interface
- Left: conversation sidebar (260px) with "New Chat" button and list of previous conversations
- Center: chat message area (scrollable, grows upward)
- Bottom: input box with send button

Features:
- Messages stream in real-time (Ollama supports streaming via POST /api/generate with stream: true)
- User messages on the right with subtle orange background tint
- AI messages on the left with dark glassmorphism background
- AI responses include citations: when the AI uses information from ChromaDB, show "[Source: filename.pdf]" as a clickable link below the relevant paragraph
- Context injection: before sending the user's message to Ollama, the system:
  1. Embeds the user's question via ollama.embeddings()
  2. Searches ChromaDB for relevant document chunks
  3. Searches Neo4j for related entities (people, systems, processes)
  4. Assembles a system prompt: "You are the Manteis Sovereign AI assistant for [company]. You have access to the company's documents and knowledge graph. Use this context to answer: [ChromaDB results] [Neo4j entities]. If you don't know, say so."
  5. Sends the augmented prompt to Ollama
- Model selector dropdown at top of chat (shows installed models from ollama.listModels())
- "Context sources" toggle: when ON, shows which documents and graph entities were used for each response. When OFF, clean chat view.
- Conversations saved to local storage (no database needed for MVP)

Create a server-side API route at app/api/chat/route.ts that:
- Receives: { message, conversationId, model, useContext }
- If useContext: embeds query, searches ChromaDB, queries Neo4j, assembles context
- Streams Ollama response back to client using ReadableStream
- Returns citations metadata as a header

Design: ChatGPT-like but Manteis-styled. Dark, Inter font, orange send button, sharp corners, glassmorphism message bubbles.
```

---

## PROMPT 6: DOCUMENT SEARCH

```
Create the document search page at app/search/page.tsx.

This is semantic search across the company's documents — search by meaning, not keywords.

Layout:
- Large centered search bar at top (like Google but dark)
- Below search bar: filter chips for document type (PDF, Email, Word, Excel, Jira Ticket)
- Results area below

Features:
- User types a query, hits enter
- Query is embedded via ollama.embeddings()
- ChromaDB searches for top 10 most similar document chunks
- Results displayed as cards:
  - Document title (filename)
  - Relevance score (0-100%)
  - Snippet of matching text (highlighted)
  - Source: filename, author, date, department
  - "Open Full Document" link
- Results sort by relevance
- Empty state: "Search your documents. Ask anything — 'Q3 supplier negotiations', 'onboarding guide', 'server room layout'"
- Loading state: orange pulse animation

Create an API route at app/api/search/route.ts that:
- Receives: { query, filters }
- Embeds query via ollama.embeddings()
- Queries ChromaDB with filters
- Returns results with metadata

Design: search bar is large (max-width 800px), 24px Inter, orange focus ring, dark background. Results in glassmorphism cards.
```

---

## PROMPT 7: WORKFLOW MANAGEMENT

```
Create the workflow management page at app/workflows/page.tsx.

This shows the client's n8n workflows as simple toggle switches — not the n8n visual editor.

Layout:
- Grid of workflow cards (2 columns desktop, 1 mobile)
- Each card:
  - Workflow name (plain English, not n8n node names)
  - Description
  - Status: Active/Inactive toggle switch (orange when active)
  - Last run: timestamp
  - Success rate: percentage
  - Run count: total executions
  - "Run Now" button (manual trigger)
  - "View Details" link (opens n8n editor in new tab, only in Advanced mode)

- Header: "Your Automated Workflows" with a subtitle "Toggle workflows on and off. The AI handles the rest."
- "Advanced Mode" toggle in top-right (hidden by default, reveals raw n8n editor links)

Workflows to display (from n8n API):
- Document Processing Pipeline
- Email Classification & Response
- Inventory Threshold Monitor
- Weekly Report Generator
- IT Health Monitor
- (any custom workflows the client has)

API route at app/api/workflows/route.ts:
- GET: list all workflows with status and stats
- POST: toggle workflow (activate/deactivate)
- POST: trigger workflow manually

Design: workflow cards are dark glassmorphism, toggle switches are orange when on, "Run Now" button is orange outline. Sharp corners.
```

---

## PROMPT 8: MODEL MANAGER

```
Create the AI model management page at app/models/page.tsx.

This lets the client manage which AI models are loaded — without touching Ollama CLI.

Layout:
- Two sections: "Installed Models" and "Available Models"

Installed Models section:
- Grid of model cards showing:
  - Display name: "Fast & Efficient" / "Deep Reasoning" / etc.
  - Technical name: "glm-5.2:8b"
  - Size on disk
  - RAM usage
  - Status: "Loaded" / "Not Loaded" (toggle)
  - "Remove" button (with confirmation)

Available Models section:
- List of models that can be pulled:
  - Display name + technical name + RAM requirement + description
  - "Install" button → triggers ollama.pull() with progress bar
  - Categories: "Fast" (8B), "Balanced" (14B-32B), "Deep" (70B+), "Code" (code models), "Embedding" (embedding models)

Model card details:
- Each card shows estimated RAM, disk size, and a "best for" description
- A "Recommended for your hardware" badge on models that fit the appliance's specs

API routes:
- GET /api/models — list installed models
- POST /api/models/pull — pull new model (stream progress)
- DELETE /api/models/{name} — remove model
- POST /api/models/{name}/load — load model into memory
- POST /api/models/{name}/unload — unload from memory

Design: model cards in dark glassmorphism, "Install" button is orange, progress bar is orange, "Recommended" badge is green. Sharp corners. Inter font.
```

---

## PROMPT 9: FLEET MANAGEMENT

```
Create the fleet management page at app/fleet/page.tsx.

This shows every device on the client's network — the Fleet DM integration.

Layout:
- Top: summary bar — total devices, online count, compliance score, patch status
- Main: device table with columns:
  - Device name
  - OS (with icon)
  - Last seen
  - Patch status (green=updated, orange=outdated, red=vulnerable)
  - Compliance (score 0-100)
  - Issues count
  - Actions: "View Details" / "Push Fix" (if issues exist)

- Device detail view (slide-out panel from right):
  - Full device info: hostname, IP, MAC, OS version, installed software, running processes, open ports, USB devices
  - Live query: text input where admin can type an osquery and run it against this specific device
  - "Push Fix" section: if the device has issues, show recommended fixes with "Approve & Execute" buttons
  - Activity history: recent events from this device

- "Run Fleet Query" button at top: opens a modal with a text input for osquery SQL — runs across ALL devices and shows results in a table

API routes:
- GET /api/fleet — list all hosts
- GET /api/fleet/{id} — host details
- POST /api/fleet/query — run live query
- POST /api/fleet/{id}/fix — push scripted fix (requires approval body)

Design: table is dark with subtle row hover (#FF5500 at 5% opacity), status indicators are colored dots, slide-out panel is dark glassmorphism with orange border. Sharp corners.
```

---

## PROMPT 10: SECURITY OPERATIONS

```
Create the security operations page at app/security/page.tsx.

This is the SIEM dashboard — the Elastic Stack integration.

Layout:
- Top: large status banner — green "ALL CLEAR" or orange "X THREATS CONTAINED" or red "HUMAN APPROVAL NEEDED"
- Three stat cards: Threats Detected (24h), Threats Contained (auto), Pending Human Approval
- Threat timeline: horizontal scrollable timeline of last 7 days showing threat events as colored markers (red=detected, orange=contained, green=resolved)
- Active threats list: any threats currently in the "human approval needed" state, each with:
  - Threat description
  - Affected device (from Fleet DM)
  - AI's recommended action
  - "Approve Containment" button (orange)
  - "Approve Remediation" button (green)
  - "Dismiss as False Positive" button (grey)
- Recent incidents: list of last 20 resolved incidents with timestamp, description, action taken, resolution time

- Firewall status panel (if pfSense connected):
  - Current rules count
  - Blocked connections (24h)
  - "View Traffic Map" button

API routes:
- GET /api/security/status — overall security status
- GET /api/security/events — recent security events from Elastic
- POST /api/security/{id}/approve — approve AI's recommended action
- POST /api/security/{id}/dismiss — dismiss as false positive
- GET /api/security/firewall — pfSense status and rules

Design: status banner is full-width with color-coded background (green/orange/red at 20% opacity), threat cards are dark glassmorphism with red/orange/green border accents. Timeline is a horizontal bar with colored dots. Sharp corners.
```

---

## PROMPT 11: KNOWLEDGE GRAPH

```
Create the knowledge graph page at app/knowledge/page.tsx.

This shows what the AI has learned about the company — the Neo4j integration.

Layout:
- Top: summary stats — total entities by type (People, Systems, Processes, Documents, Incidents, Vendors)
- Center: interactive force-directed graph visualization
  - Use react-force-graph or d3-force
  - Nodes colored by type: People=blue, Systems=orange, Processes=green, Documents=grey, Incidents=red, Vendors=purple
  - Edges show relationship type on hover
  - Click a node to see details in a side panel
  - Zoom and pan controls
- Side panel (slide from right): selected entity details
  - Entity name, type, properties
  - All connected entities (relationships)
  - Source documents (which documents mentioned this entity)
- Bottom: "Recent Learning" feed
  - New entities discovered
  - New relationships mapped
  - New SOPs written
  - "Gaps" — things the AI has noticed it doesn't know
- "Suggestions" section:
  - Process mining recommendations ("This task looks manual. Automate it?")
  - Document drift alerts ("The server room layout doc is 2 years stale")

API routes:
- GET /api/knowledge/graph — all nodes and edges (limited to 500 for performance)
- GET /api/knowledge/entity/{id} — entity details and connections
- GET /api/knowledge/recent — recent learning feed
- GET /api/knowledge/gaps — detected knowledge gaps
- GET /api/knowledge/suggestions — process mining suggestions

Design: graph visualization on dark background, nodes are circles with type-colored fills and subtle glow, edges are thin grey lines. Side panel is dark glassmorphism. Stats are in the same card style as dashboard. Sharp corners.
```

---

## PROMPT 12: ENVIRONMENT MAP

```
Create the environment map page at app/environment/page.tsx.

This shows the network topology — what's on the network and what talks to what.

Layout:
- Top: toggle between "Network Map" view and "Device List" view
- Network Map view:
  - Force-directed graph of network devices
  - Nodes: servers, workstations, printers, network gear, the Manteis appliance itself
  - Edges: network connections (colored by traffic volume — thicker = more traffic)
  - Click a device to see: IP, MAC, OS, open ports, traffic stats
  - The Manteis appliance node is highlighted in orange (it's the center of the sovereign network)
  - An orange perimeter ring shows the network boundary — "Nothing crosses this line"
- Device List view:
  - Table of all discovered devices
  - Columns: name, IP, MAC, type, OS, open ports, traffic (in/out), last seen
  - Sortable columns
- Top-right: "Rescan Network" button (triggers a new discovery scan)

- Self-status panel (the appliance monitoring itself):
  - Docker containers: count, healthy count, unhealthy count
  - Ollama: models loaded, memory usage, requests served
  - ChromaDB: documents indexed, storage used
  - n8n: workflows active, executions today
  - Uptime
  - CPU and memory usage (live updating)

API routes:
- GET /api/environment/network — network topology data
- GET /api/environment/devices — device list
- GET /api/environment/self — appliance self-status (Docker, Ollama, etc.)
- POST /api/environment/rescan — trigger network rescan

Design: network map on dark background, devices as circles with type icons, the Manteis appliance is larger and orange with a pulsing glow. Perimeter ring is a dashed orange circle. Self-status panel uses the same stat card design as dashboard. Sharp corners.
```

---

## PROMPT 13: SETTINGS & ADVANCED MODE

```
Create the settings page at app/settings/page.tsx.

Layout:
- Sections (left sidebar within settings):
  - General
  - Data Sources
  - Security & Encryption
  - Advanced Mode
  - About

General section:
  - Appliance name (editable text field)
  - Time zone
  - Language
  - Theme: Dark only (greyed out — "Sovereign AI runs in the dark")

Data Sources section:
  - List of connected data sources with status indicators:
    - File Share: [path] — Connected/Not configured
    - M365: [tenant] — Connected/Not configured
    - Jira: [URL] — Connected/Not configured
    - Email: [account] — Connected/Not configured
    - ERP: [system] — Connected/Not configured
  - "Add Data Source" button for each type
  - "Test Connection" button for each configured source
  - "Disconnect" button

Security & Encryption section:
  - Encryption status: "Data at rest: ENCRYPTED" with green indicator
  - Network status: "0 bytes have left your network" with green indicator
  - Firewall status: from pfSense API
  - Tunnel status: if cloud edition, Tailscale/Cloudflare status
  - "Rotate Encryption Key" button (with warning that this requires a reboot)
  - Access control: list of users who can access the Manteis OS

Advanced Mode section:
  - Toggle: "Enable Advanced Mode"
  - Warning text: "Advanced Mode reveals the underlying infrastructure (Docker, n8n editor, raw configuration). Only enable this if you have IT expertise."
  - When enabled, the sidebar gets additional items:
    - /advanced/docker — Docker container management (raw)
    - /advanced/n8n — n8n workflow editor (embedded)
    - /advanced/config — Raw YAML/JSON configuration
    - /advanced/terminal — Web terminal (if enabled, with safety warnings)

About section:
  - Manteis Sovereign AI version
  - Hardware: detected specs (CPU, RAM, storage)
  - Uptime
  - "Manufactured by Manteis Systems — manteis.systems"
  - License: "You own this appliance. No subscription required."

Design: settings sections in dark glassmorphism panels, form inputs with orange focus rings, toggle switches orange when on. Advanced Mode toggle has a warning border. Sharp corners. Inter font.
```

---

## PROMPT 14: DOCKER COMPOSE STACK

```
Create a docker-compose.yml file that deploys the entire Manteis Sovereign AI backend stack.

Services:

1. ollama
   - Image: ollama/ollama:latest
   - Volumes: ollama_data:/root/.ollama
   - Ports: 11434:11434
   - Deploy.resources: reservations.devices: [{ driver: nvidia, capabilities: [gpu] }] (conditional — use CPU if no GPU)
   - Health check: curl localhost:11434/api/tags

2. chromadb
   - Image: chromadb/chroma:latest
   - Ports: 8001:8001
   - Volumes: chroma_data:/chroma/chroma
   - Environment: CHROMA_SERVER_HOST=0.0.0.0, CHROMA_SERVER_PORT=8001
   - Health check: curl localhost:8001/api/v1/heartbeat

3. n8n
   - Image: n8nio/n8n:latest
   - Ports: 5679:5679
   - Volumes: n8n_data:/home/node/.n8n
   - Environment: N8N_HOST=0.0.0.0, N8N_PORT=5679, N8N_PROTOCOL=http, WEBHOOK_URL=http://localhost:5679
   - Health check: curl localhost:5679/healthz

4. neo4j
   - Image: neo4j:5-community
   - Ports: 7474:7474, 7687:7687
   - Volumes: neo4j_data:/data
   - Environment: NEO4J_AUTH=neo4j/manteis2026, NEO4J_PLUGINS='["apoc"]'
   - Health check: cypher-shell -u neo4j -p manteis2026 "RETURN 1"

5. elasticsearch
   - Image: docker.elastic.co/elasticsearch/elasticsearch:8.13.0
   - Environment: discovery.type=single-node, xpack.security.enabled=false, ES_JAVA_OPTS="-Xms1g -Xmx1g"
   - Volumes: elastic_data:/usr/share/elasticsearch/data
   - Ports: 9200:9200
   - Health check: curl localhost:9200/_cluster/health

6. kibana
   - Image: docker.elastic.co/kibana/kibana:8.13.0
   - Ports: 5601:5601
   - Environment: ELASTICSEARCH_HOSTS=http://elasticsearch:9200
   - Depends on: elasticsearch

7. fleetdm
   - Image: fleetdm/fleet:latest
   - Ports: 8080:8080
   - Volumes: fleet_data:/var/lib/fleet
   - Environment: FLEET_SERVER_ADDRESS=0.0.0.0:8080
   - Depends on: postgres (need to add postgres for Fleet)

8. postgres (for Fleet DM and MCP)
   - Image: postgres:16
   - Environment: POSTGRES_USER=manteis, POSTGRES_PASSWORD=manteis2026, POSTGRES_DB=fleet
   - Volumes: pg_data:/var/lib/postgresql/data
   - Ports: 5432:5432

9. redis (for n8n and general caching)
   - Image: redis:7
   - Ports: 6379:6379

10. manteis-os (our web interface)
    - Build: . (from the Dockerfile in the Next.js project)
    - Ports: 3000:3000
    - Environment: 
      - OLLAMA_URL=http://ollama:11434
      - CHROMA_URL=http://chromadb:8001
      - N8N_URL=http://n8n:5679
      - DOCKER_URL=http://docker-proxy:2375
      - PFSENSE_URL=${PFSENSE_URL:-http://host.docker.internal:443}
      - FLEET_URL=http://fleetdm:8080
      - ELASTIC_URL=http://elasticsearch:9200
      - NEO4J_URL=bolt://neo4j:7687
      - NEO4J_USER=neo4j
      - NEO4J_PASSWORD=manteis2026
    - Depends on: ollama, chromadb, n8n, neo4j, elasticsearch, fleetdm

Volumes:
- ollama_data, chroma_data, n8n_data, neo4j_data, elastic_data, fleet_data, pg_data

Network:
- manteis-internal (bridge network, internal only)

Create this file at the project root. Also create a .env.example with all the environment variables.
Also create a Dockerfile for the Next.js app that builds and serves the Manteis OS.
```

---

## PROMPT 15: MCP SERVER CONFIGURATION

```
Create a Dockerfile and configuration for the MCP servers that broker access to client systems.

Create a directory: mcp-servers/ containing:

1. mcp-servers/filesystem/Dockerfile
   - Based on node:20-slim
   - Installs @modelcontextprotocol/server-filesystem
   - Exposes a configurable mount point for the client's file share
   - Configured via environment: MOUNT_PATH, ALLOWED_DIRECTORIES

2. mcp-servers/m365/Dockerfile  
   - Custom Node.js MCP server that connects to Microsoft Graph API
   - Configured via: M365_TENANT_ID, M365_CLIENT_ID, M365_CLIENT_SECRET
   - Exposes: read emails, read SharePoint documents, read Teams messages
   - All access is READ-ONLY by default. Write operations require an approval flag.

3. mcp-servers/jira/Dockerfile
   - Custom MCP server for Jira API
   - Configured via: JIRA_URL, JIRA_API_TOKEN
   - Exposes: list tickets, read ticket details, create ticket (with approval)

4. mcp-servers/docker-proxy/Dockerfile
   - Nginx reverse proxy that exposes the Docker socket safely
   - Only allows read operations (list containers, stats, health)
   - Write operations (restart, stop) require an API key header

5. docker-compose.mcp.yml
   - Extends the main docker-compose with the MCP servers
   - All MCP servers on the manteis-internal network
   - Filesystem server mounts the client's file share read-only

Also create a TypeScript SDK file (lib/mcp-client.ts) that:
- Connects to MCP servers via stdio or HTTP transport
- Lists available tools from each server
- Calls tools with proper error handling
- Implements the approval gate: write operations return a "pending approval" state that the UI surfaces as a confirmation dialog
```

---

## PROMPT 16: SYSTEM STATUS BAR

```
Create a persistent system status bar component that appears at the bottom of every page.

This is the "0 bytes have left your network" confirmation — always visible.

Component: components/SystemStatusBar.tsx

Layout (fixed at bottom, 40px height):
- Left: green dot + "Sovereign" text (always visible, always green when running locally)
- Center: "0 bytes have left your network" (with a live counter that ticks up showing "X bytes processed locally")
- Right: connection status — if cloud edition, shows "Tunnel: Active" with latency. If physical, shows "Local: Active"
- The bar is #0D0F12 with a top border of rgba(255, 85, 0, 0.2)
- The green dot pulses subtly (CSS animation)
- If there's ever a security alert, the bar turns orange and shows the alert count instead

Create an API route at app/api/status/route.ts that:
- Returns: { mode: 'local' | 'cloud', bytesProcessed: number, tunnelStatus: 'active' | 'down', alerts: number, uptime: number }
- This is polled every 5 seconds by the status bar
- bytesProcessed increments by reading Docker network stats (inbound bytes that did NOT go to external interfaces)

Add this component to the root layout so it appears on every page.
```

---

## PROMPT 17: DOCUMENT INGESTION PIPELINE

```
Create the document ingestion system that feeds documents into ChromaDB and Neo4j.

Create: lib/ingestion/

1. lib/ingestion/chunker.ts
   - Takes a file (PDF, DOCX, TXT, EML, CSV) and splits into ~500-token chunks
   - Uses pdf-parse for PDFs, mammoth for DOCX, simple text split for TXT/CSV
   - Each chunk includes metadata: { source, filename, author, date, department, chunkIndex, totalChunks }

2. lib/ingestion/embedder.ts
   - Takes text chunks and generates embeddings via Ollama (nomic-embed-text model)
   - Batch embedding (10 chunks per API call for efficiency)
   - Returns: { id, embedding, text, metadata }

3. lib/ingestion/store.ts
   - Stores embeddings in ChromaDB collection "company_documents"
   - Creates collection if it doesn't exist
   - Upserts (no duplicates on re-ingestion)

4. lib/ingestion/entity-extractor.ts
   - Takes text chunks and sends to local LLM with prompt:
     "Extract all entities from this text. Output JSON with arrays: people[], systems[], processes[], vendors[], locations[]. For each entity include a name and any properties mentioned. Also extract relationships as pairs: {from, to, type}."
   - Parses LLM JSON output
   - Returns: { entities: Entity[], relationships: Relationship[] }

5. lib/ingestion/graph-writer.ts
   - Takes entities and relationships from the extractor
   - Writes to Neo4j using Cypher MERGE (upsert — no duplicates)
   - Links document nodes to entities (DOCUMENT MENTIONS ENTITY)

6. lib/ingestion/pipeline.ts
   - Orchestrates: chunker → embedder → store + entity-extractor → graph-writer
   - Processes files in parallel (up to 5 concurrent)
   - Tracks progress: { total, processed, failed, entitiesDiscovered, relationshipsMapped }
   - Can be triggered manually or via n8n workflow (file watcher)

7. API route: app/api/ingest/route.ts
   - POST: { path } — triggers ingestion of a specific file or directory
   - GET: { status } — returns current ingestion progress

8. n8n workflow template: workflows/file-watcher.json
   - Watches a directory for new/modified files
   - Triggers the ingestion API route for each new file
   - Runs every 5 minutes

The pipeline should handle:
- Large files (100MB+ PDFs) by chunking before embedding
- Duplicate files (skip if already ingested — check ChromaDB by filename + hash)
- Rate limiting (don't overwhelm Ollama with too many concurrent embedding requests)
- Error recovery (failed files logged for retry)
```

---

## PROMPT 18: THE .ENV FILE AND CONFIGURATION

```
Create a comprehensive .env.example file and a configuration system for the Manteis Sovereign OS.

.env.example should contain ALL environment variables with comments:

# === Core ===
MANTEIS_NAME="Manteis Sovereign AI"
MANTEIS_MODE="local"  # local | cloud
MANTEIS_VERSION="1.0.0"

# === Ollama (AI Engine) ===
OLLAMA_URL="http://localhost:11434"
OLLAMA_DEFAULT_MODEL="glm-5.2:8b"
OLLAMA_EMBEDDING_MODEL="nomic-embed-text"

# === ChromaDB (Vector Store) ===
CHROMA_URL="http://localhost:8001"
CHROMA_COLLECTION="company_documents"

# === n8n (Workflow Engine) ===
N8N_URL="http://localhost:5679"
N8N_API_KEY=""

# === Docker ===
DOCKER_URL="http://localhost:2375"

# === pfSense (Firewall) ===
PFSENSE_URL=""
PFSENSE_API_KEY=""

# === Fleet DM (Endpoint Management) ===
FLEET_URL="http://localhost:8080"
FLEET_API_KEY=""

# === Elastic (SIEM) ===
ELASTIC_URL="http://localhost:9200"
ELASTIC_INDEX="security-events"

# === Neo4j (Knowledge Graph) ===
NEO4J_URL="bolt://localhost:7687"
NEO4J_USER="neo4j"
NEO4J_PASSWORD="manteis2026"

# === File System ===
DOCUMENTS_PATH="/data/documents"
FILE_WATCHER_ENABLED="true"

# === Cloud Edition (if MANTEIS_MODE=cloud) ===
TAILSCALE_AUTH_KEY=""
CLOUDFLARE_TUNNEL_TOKEN=""
ENCRYPTION_KEY=""  # client-held key for LUKS

# === MCP Servers ===
M365_TENANT_ID=""
M365_CLIENT_ID=""
M365_CLIENT_SECRET=""
JIRA_URL=""
JIRA_API_TOKEN=""

# === Security ===
ADVANCED_MODE_ENABLED="false"
WRITE_APPROVAL_REQUIRED="true"

Also create lib/config.ts that:
- Loads all env vars with defaults
- Validates required vars at startup
- Exports a typed config object
- Throws clear errors if critical vars are missing
```

---

## PROMPT 19: BRANDING AND POLISH

```
Apply final Manteis branding polish across the entire application.

1. Create components/Logo.tsx
   - "MANTEIS" in Inter Bold with letter-spacing -0.04em
   - "SOVEREIGN AI" below in Inter Regular, #FF5500, letter-spacing 0.3em
   - On dark background, white + orange
   - Optional glow effect prop

2. Create components/StatusDot.tsx
   - Small circle (8px) that pulses
   - Colors: green (operational), orange (warning), red (alert), grey (offline)
   - Used throughout the app

3. Create components/GlassCard.tsx
   - Reusable glassmorphism card component
   - Props: children, className, glowColor (default #FF5500), glowIntensity (0-1)
   - Style: background rgba(13, 15, 18, 0.6), backdrop-blur-md, border 1px solid rgba(255, 85, 0, 0.2), border-radius 0
   - Optional hover glow: box-shadow with glowColor

4. Create components/Toggle.tsx
   - Reusable toggle switch
   - Off: grey track, grey thumb
   - On: #FF5500 track, white thumb
   - Smooth spring animation
   - Accessible (keyboard navigable, aria-label)

5. Create components/Button.tsx
   - Variants: primary (#FF5500 bg, black text), secondary (transparent, orange border), ghost (text only)
   - All sharp corners (border-radius: 0)
   - Hover: subtle brightness increase, no scale
   - Active: slight darken
   - Sizes: sm, md, lg

6. Update the root layout (app/layout.tsx):
   - Add the Manteis logo at the top of the sidebar
   - Add the SystemStatusBar at the bottom
   - Ensure Inter font is loaded via next/font/google
   - Set the page background to #0D0F12 globally
   - Add a meta tag: "Manteis Sovereign AI — Your intelligence, your hardware, your network."

7. Create a 404 page (app/not-found.tsx):
   - "This page is not sovereign." in orange
   - Link back to dashboard
   - Dark, minimal

8. Create a loading.tsx for the root:
   - Orange pulse animation on dark background
   - "Initializing sovereign systems..."

9. Global CSS (app/globals.css):
   - Ensure all scrollbars are styled dark (webkit-scrollbar)
   - Selection color is orange
   - Focus rings are orange
   - No serif fonts anywhere (add a CSS rule: [class*="serif"] { font-family: Inter !important; })
   - Smooth scroll behavior
   - Mobile: prevent zoom on input focus (font-size: 16px on inputs)
```

---

## PROMPT 20: DOCKERFILE AND DEPLOYMENT

```
Create the deployment files for the Manteis Sovereign OS.

1. Dockerfile (multi-stage build for the Next.js app):
   - Stage 1 (builder): node:20-alpine, install deps, build Next.js
   - Stage 2 (runner): node:20-alpine, copy built app, expose 3000, CMD npm start
   - Minimal image size, no dev dependencies in production

2. docker-compose.yml (update the one from Prompt 14):
   - Ensure the manteis-os service builds from the Dockerfile
   - Add restart: unless-stopped to all services
   - Add logging configuration (json-file, max-size 10m, max-file 3)
   - Add network isolation: manteis-internal network with internal: true
   - Only the manteis-os service exposes a port to the host (3000)
   - All other services are internal-only

3. scripts/install.sh
   - Shell script for one-command deployment on a fresh Linux machine
   - Installs Docker and Docker Compose if not present
   - Copies the .env.example to .env and prompts for configuration
   - Runs docker compose up -d
   - Waits for health checks
   - Prints: "Manteis Sovereign AI is running. Open http://localhost:3000 to begin setup."

4. scripts/cloud-provision.sh
   - Shell script for cloud auto-provisioning
   - Called by the Manteis Control Plane after Terraform creates the VPS
   - Installs Docker, clones the repo, configures .env, starts the stack
   - Joins the Tailscale tailnet using the provided auth key
   - Reports back to the control plane when healthy

5. README.md
   - Quick start (local): run install.sh
   - Quick start (Docker): docker compose up -d
   - Architecture diagram (ASCII)
   - Configuration (env vars)
   - Accessing the dashboard
   - Troubleshooting
```

---

## POST-BUILD: WHAT YOU HAVE

After feeding all 20 prompts to Claude Code in sequence, you have:

1. A full Next.js web application (Manteis Sovereign OS)
2. 10 pages: Dashboard, Chat, Search, Workflows, Models, Fleet, Security, Knowledge Graph, Environment, Settings
3. Setup wizard (6 steps)
4. AI chat with RAG (ChromaDB + Neo4j context injection)
5. Document ingestion pipeline (chunker → embedder → store → entity extractor → graph writer)
6. 9 API integrations (Ollama, ChromaDB, n8n, Docker, pfSense, Fleet DM, Elastic, Neo4j, File System)
7. Docker Compose stack (10 services)
8. MCP server configurations (filesystem, M365, Jira, Docker proxy)
9. System status bar (always-visible sovereignty confirmation)
10. Full Manteis branding (logo, glassmorphism cards, toggle switches, buttons)
11. Deployment scripts (local install + cloud provisioning)
12. .env configuration system

This is the MVP. It runs locally on a Mac Mini or in the cloud on a VPS. Same codebase. Same Docker stack. Same UI.

The client plugs it in, opens sovereign.local, sees the Manteis Sovereign OS, runs the setup wizard, and they're sovereign.

---

## THE EXECUTION ORDER

Feed these to Claude Code in order. Some can be parallelized (Claude Code can work on multiple files), but the dependencies are:

1 → 2 → 3 (needs 2)
1 → 4 (needs 1 for layout)
2 → 5 (needs 2 for API clients)
2 → 6 (needs 2 for search API)
2 → 7 (needs 2 for n8n client)
2 → 8 (needs 2 for Ollama client)
2 → 9 (needs 2 for Fleet client)
2 → 10 (needs 2 for Elastic client)
2 → 11 (needs 2 for Neo4j client)
2 → 12 (needs 2 for Docker/Fleet clients)
1 → 13 (needs 1 for settings layout)
14 (standalone — Docker Compose)
15 (standalone — MCP servers)
3 → 16 (needs dashboard stats)
2 → 17 (needs API clients for ingestion)
18 (standalone — env config)
1 → 19 (needs project for branding)
1-18 → 20 (needs everything for deployment)

Start with Prompt 1. Build the scaffold. Then feed them in order. By Prompt 20, you have the full product.