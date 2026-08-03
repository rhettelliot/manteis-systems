---
title: "Sovereign AI FAQ: Technical Deep-Dive — 30 Questions Answered"
meta_title: "Sovereign AI FAQ Technical | Local LLM Deployment Questions | Manteis"
meta_description: "30 technical FAQs about sovereign AI deployment: Ollama configuration, RAG architecture, GPU selection, quantization, security hardening, and production operations."
date: 2026-07-30
type: faq
target_keywords:
  - sovereign AI
  - local AI
  - on-premise AI
  - private AI
  - self-hosted AI
  - AI without cloud
  - local LLM deployment
  - Ollama deployment
  - local RAG
  - zero-trust AI
  - private AI infrastructure
  - edge AI
  - ESP32 AI
  - Manteis Systems
---

# Sovereign AI FAQ: Technical Deep-Dive — 30 Questions Answered

*This is the technical companion to our [30-Question Sovereign AI FAQ](./2026-07-29-faq-sovereign-ai-30-questions.md). These 30 questions address the engineering, architecture, and operational concerns of teams evaluating or deploying sovereign AI infrastructure.*

---

## Hardware & GPU Selection

### Q1: How do I choose the right GPU for local LLM deployment?

**For inference (not training), VRAM is the primary constraint.** The model must fit entirely in GPU memory for fast inference. As a rule of thumb:

| Model Size (Parameters) | VRAM Required (INT4 quantized) | Recommended GPU |
|---|---|---|
| 7B (Llama 3 8B, Mistral 7B) | 5–6GB | RTX 4060 (8GB), or single GPU in Manteis One |
| 13B (Llama 2 13B, Qwen 14B) | 8–10GB | RTX 4070 (12GB), or single GPU in Manteis One |
| 34B (Command R, Yi 34B) | 20–24GB | RTX 4090 (24GB), or dual GPU in Manteis Core |
| 70B (Llama 3 70B, Qwen 72B) | 40–48GB | 2× RTX 4090 (48GB), or dual GPU in Manteis Core |
| 70B+ (full precision) | 140GB+ | 4× A100/A6000, or quad GPU in Manteis Fortress |

**Key insight:** You rarely need full precision for inference. INT4 quantization reduces VRAM requirements by 8× with minimal quality degradation for most business use cases. A 70B model that needs 140GB in FP16 fits in 40GB at INT4.

### Q2: Can I use consumer GPUs (RTX 4090) instead of data center GPUs (A100)?

**Yes, for inference.** Consumer GPUs like the RTX 4090 offer excellent VRAM-per-dollar for inference workloads. The trade-offs:

| Factor | RTX 4090 (Consumer) | A100 (Data Center) |
|---|---|---|
| VRAM | 24GB | 40GB or 80GB |
| Price | ~$1,600 | ~$10,000–$15,000 |
| VRAM per $ | 15MB/$ | 4–8MB/$ |
| NVLink (multi-GPU) | ❌ Not supported | ✅ Supported |
| Power | 450W | 250–400W |
| ECC memory | ❌ | ✅ |
| Warranty/terms | Consumer (no data center use clause) | Data center warrantied |

For Manteis appliances, we use consumer GPUs in Manteis One and Core (cost-effective for inference), and data center GPUs in Manteis Fortress (for enterprise reliability and ECC memory requirements).

### Q3: How much RAM does the server need beyond GPU VRAM?

**System RAM should be 3–4× total GPU VRAM.** This allows:
- Model loading from disk into system RAM before transferring to GPU
- RAG embedding caches (ChromaDB or similar)
- n8n workflow execution
- OS and overhead

Example: Manteis Core has 48GB GPU VRAM (2× 24GB) and 256GB system RAM — a ~5× ratio.

### Q4: Do I need NVMe storage, or is SATA SSD sufficient?

**NVMe is strongly recommended.** Model loading time is a critical UX factor:

| Storage Type | 70B Model Load Time (INT4, ~40GB) |
|---|---|
| SATA SSD | 25–35 seconds |
| NVMe Gen 4 | 4–6 seconds |
| NVMe RAID (Manteis Fortress) | 2–3 seconds |

For production deployments where models are loaded/unloaded frequently (multi-model serving), NVMe is essential. All Manteis appliances use NVMe exclusively.

---

## Ollama Configuration

### Q5: How do I configure Ollama for multi-user concurrent access?

Ollama supports concurrent requests, but default settings are conservative. For a team deployment:

```bash
# Set parallel request count (default: 1)
OLLAMA_NUM_PARALLEL=8

# Set max queued requests
OLLAMA_MAX_QUEUED=16

# Keep model loaded in memory (default: 5m)
OLLAMA_KEEP_ALIVE=24h

# Bind to all interfaces (for network access)
OLLAMA_HOST=0.0.0.0:11434
```

For 20+ concurrent users on a single appliance, set `OLLAMA_NUM_PARALLEL` to match your expected peak concurrency. Each parallel request uses additional VRAM for the KV cache — monitor GPU memory and adjust.

### Q6: Can I run multiple models simultaneously on one appliance?

**Yes, with sufficient VRAM.** Manteis Fortress (192GB VRAM) routinely runs 3–4 models simultaneously:
- Llama 3 70B (INT4, ~40GB) for complex reasoning
- Mistral 7B (INT4, ~5GB) for fast simple tasks
- A custom fine-tune (INT4, ~5GB) for domain-specific work
- An embedding model (e.g., nomic-embed-text, ~1GB) for RAG

Use the `OLLAMA_KEEP_ALIVE=24h` setting to prevent models from being unloaded between requests. The Manteis Sovereign OS includes a model management UI for configuring multi-model serving.

### Q7: How do I expose Ollama's API to my internal network safely?

**Never expose Ollama directly to the internet.** For internal network access:

1. **Bind to internal interface only:** `OLLAMA_HOST=10.0.0.5:11434` (your internal IP)
2. **Use a reverse proxy with authentication:** nginx or Caddy in front of Ollama, requiring API key or OIDC authentication
3. **Or use Tailscale:** Ollama only accessible via Tailscale mesh network — no exposed ports at all

The Manteis Sovereign OS includes a pre-configured Caddy reverse proxy with OIDC authentication, so all API access is authenticated and encrypted.

### Q8: What's the Ollama API compatibility with OpenAI?

Ollama provides an OpenAI-compatible endpoint at `/v1/chat/completions`. Most applications written for the OpenAI API work by changing only the base URL:

```python
# Before (OpenAI)
client = OpenAI(base_url="https://api.openai.com/v1", api_key="sk-...")

# After (Manteis / Ollama)
client = OpenAI(base_url="http://10.0.0.5:11434/v1", api_key="ollama")
```

This means your existing OpenAI-based applications, LangChain chains, and LlamaIndex pipelines can switch to local inference with a one-line change.

---

## RAG Architecture

### Q9: What's the recommended RAG stack for sovereign AI?

**Manteis's reference RAG stack (all local, no cloud):**

| Component | Tool | Purpose |
|---|---|---|
| Vector database | ChromaDB | Stores and retrieves document embeddings |
| Embedding model | nomic-embed-text (via Ollama) | Converts documents to vector representations |
| LLM | Llama 3 70B or Mistral (via Ollama) | Generates answers from retrieved context |
| Document ingestion | LangChain + unstructured | Parses PDFs, DOCX, HTML, etc. |
| Orchestration | n8n or LangChain | Manages the retrieve-then-generate pipeline |

All components run on the Manteis appliance. No external API calls at any point in the pipeline.

### Q10: How many documents can a local RAG system handle?

**ChromaDB on a Manteis Core appliance handles 100,000+ documents comfortably.** The constraint is not the vector database itself but:
- **Storage:** Each document's embedding is ~768 floats (3KB). 100K documents = ~300MB of vectors. Trivial.
- **Ingestion time:** Embedding 100K documents with a local model takes ~4–8 hours.
- **Query latency:** ChromaDB queries against 100K vectors return in < 100ms.

For 1M+ document collections, consider Qdrant (more efficient at scale) or pgvector (if you're already running PostgreSQL).

### Q11: How do I handle document ingestion for large corpora?

**Batch ingestion via n8n workflow:**

1. Drop documents into a watched folder (`/data/documents/`)
2. n8n detects new files, triggers ingestion workflow
3. Workflow: parse → chunk (512 tokens with 50-token overlap) → embed → store in ChromaDB
4. Failed ingestions logged for manual review

**Throughput:** ~500 documents/hour on a single GPU (embedding model is the bottleneck). For initial bulk loads, run ingestion overnight.

### Q12: Can I do RAG over images and tables in documents?

**Partially.** The current Manteis RAG stack handles:
- ✅ Text in PDFs, DOCX, HTML, Markdown, plain text
- ✅ Tables (extracted as text via unstructured library)
- ⚠️ Images (requires a vision model for OCR/description — adds complexity)
- ⚠️ Scanned PDFs (requires OCR pre-processing with Tesseract)

For heavy image/table RAG, Manteis offers a custom ingestion pipeline that uses a local vision model (LLaVA) to describe images before embedding. This is available as a professional services engagement.

---

## Quantization & Model Selection

### Q13: What quantization level should I use?

**INT4 (Q4_K_M in GGUF) is the sweet spot for production.** Quality comparison:

| Quantization | Size (70B model) | Quality (vs FP16) | Speed | Recommendation |
|---|---|---|---|---|
| FP16 (full) | 140GB | 100% | Slowest | Research/benchmarking only |
| INT8 (Q8_0) | 70GB | 98–99% | Fast | When VRAM allows, for max quality |
| INT4 (Q4_K_M) | 40GB | 95–97% | Very fast | **Production default** |
| INT3 (Q3_K_M) | 30GB | 90–93% | Extremely fast | Constrained VRAM, acceptable quality loss |
| INT2 (Q2_K) | 22GB | 80–85% | Maximum | Emergency only — noticeable quality degradation |

For 95% of business use cases (document summarization, Q&A, drafting, code analysis), INT4 is indistinguishable from full precision to end users.

### Q14: Which model should I start with?

**For general-purpose business AI:** Llama 3 70B (INT4 quantized)
- Best general reasoning capability among open-weight models
- Fits in 40GB VRAM (Manteis Core or Fortress)
- Handles most business tasks: writing, analysis, summarization, coding

**For speed-critical applications:** Mistral 7B or Llama 3 8B (INT4)
- 5–6GB VRAM, runs on Manteis One
- 3–5× faster inference than 70B models
- Sufficient for simple tasks: classification, extraction, short-form generation

**For multilingual work:** Qwen 2.5 72B
- Strong multilingual performance (40+ languages)
- Similar VRAM requirements to Llama 3 70B

**For code:** DeepSeek Coder 33B or CodeQwen
- Specialized for code generation and analysis
- Fits in 20GB VRAM

### Q15: How do I evaluate model quality for my specific use case?

**Build a golden test set.** Before deploying any model:
1. Collect 50–100 real examples of inputs and desired outputs from your actual use case
2. Run each candidate model against the test set
3. Score outputs on: correctness, completeness, tone, format compliance
4. Use a scoring rubric — either human-evaluated or LLM-as-judge (using a larger model)

Manteis Sovereign OS includes a model evaluation dashboard that automates this process. You upload your test set, select candidate models, and get a comparison report.

---

## Security & Networking

### Q16: How do I implement zero-trust AI networking?

**Manteis's zero-trust reference architecture:**

1. **No inbound ports.** The appliance accepts no inbound connections from the network.
2. **Tailscale mesh.** All access is via Tailscale (WireGuard-based, encrypted, identity-aware). Users connect through Tailscale, not through open ports.
3. **Identity-based access.** Every user authenticates via SSO (OIDC). No shared API keys.
4. **Role-based access control.** Users are assigned roles (admin, power user, standard user) with different model access and capability levels.
5. **Audit logging.** Every API call, model load, and configuration change is logged with user identity and timestamp.
6. **Network segmentation.** The appliance lives on an isolated VLAN with no route to the internet (if air-gapped) or a tightly controlled egress allowlist (if connected).

### Q17: Can the appliance be truly air-gapped?

**Yes.** Manteis Fortress is designed for air-gapped operation:
- No wireless radios (Wi-Fi/Bluetooth physically absent)
- Model updates via cryptographically signed USB drives
- No telemetry or phone-home behavior in Manteis Sovereign OS
- License validation is offline (cryptographic license file, no network call)
- The appliance operates indefinitely with zero network connectivity

### Q18: How do I handle model updates in an air-gapped environment?

**Offline model update process:**

1. On an internet-connected machine, download the new model from the Manteis model registry (or HuggingFace)
2. Compute the SHA-256 hash of the model file
3. Transfer to a USB drive
4. On the air-gapped appliance, insert USB drive
5. Manteis Sovereign OS verifies the cryptographic signature on the USB transfer
6. Model is loaded into the model registry, validated, and made available
7. Old model version is retained (rollback capability)

This process is documented in the Manteis Fortress deployment guide and takes ~10 minutes per model update.

### Q19: How is data encrypted at rest?

**Manteis appliances use full-disk encryption (LUKS on Linux):**
- All storage (OS, models, RAG databases, user data) is encrypted at rest
- Encryption keys are stored in a TPM (Trusted Platform Module)
- Key recovery requires physical presence + admin credentials
- On Manteis Fortress, additional application-layer encryption for sensitive RAG collections

### Q20: What audit logging does the appliance maintain?

**Comprehensive audit trail:**
- Every API call (user, timestamp, model, prompt hash, response hash, latency)
- Every model load/unload
- Every configuration change
- Every USB model transfer
- Every authentication event (success and failure)
- Every administrative action

Logs are stored locally in append-only, tamper-evident format. They can be exported to a SIEM via syslog if the appliance is network-connected.

---

## Performance & Scaling

### Q21: How many concurrent users can one appliance support?

**Depends on model size and appliance hardware:**

| Appliance | Model | Concurrent Users (Active) | Concurrent Users (Total) |
|---|---|---|---|
| Manteis One | Llama 3 8B | 3–5 | 10–15 |
| Manteis One | Mistral 7B | 4–6 | 12–18 |
| Manteis Core | Llama 3 70B (INT4) | 8–12 | 30–50 |
| Manteis Core | Mistral 7B | 20–30 | 80–120 |
| Manteis Fortress | Llama 3 70B (INT4) | 20–30 | 80–120 |
| Manteis Fortress | Llama 3 70B (INT4) + Mistral 7B (dual model) | 25–35 combined | 100–150 |

"Active" = users with a request in flight. "Total" = users who may send requests at any time. Most organizations have a 1:5 active-to-total ratio.

### Q22: How do I scale beyond one appliance?

**Horizontal scaling options:**

1. **Multiple appliances behind a load balancer:** 2–3 Manteis Core appliances behind an internal load balancer (HAProxy or nginx) with sticky sessions. The Manteis Sovereign OS supports cluster mode for shared model registries and RAG databases.

2. **Manteis Cloud as overflow:** For peak loads, route excess traffic to Manteis Cloud (sovereign AI as a service) while keeping baseline load on-premise. This is a hybrid sovereignty model.

3. **Appliance upgrade:** If you're hitting limits on Manteis Core, upgrade to Fortress (quad GPU). The Sovereign OS migration is automated.

### Q23: What's the inference latency compared to cloud APIs?

| Path | Latency (time-to-first-token) |
|---|---|
| Cloud API (OpenAI, Anthropic) | 200–800ms (network round-trip + queue) |
| Manteis One (local, 8B model) | 30–80ms |
| Manteis Core (local, 70B model) | 80–200ms |
| Manteis Fortress (local, 70B model) | 60–150ms |

Local inference is **2–10× faster** than cloud APIs for time-to-first-token. For long generations, throughput (tokens/second) is comparable or better than cloud, and there's no network jitter.

---

## Integration & Workflow

### Q24: How does n8n integrate with local LLMs?

n8n has native Ollama nodes. A typical workflow:

```
[Trigger: New email]
   → [Ollama node: Classify email (spam/urgent/normal)]
   → [Switch: Route based on classification]
      → Spam: [Delete]
      → Urgent: [Slack notification + Ollama: Draft response]
      → Normal: [Ollama: Draft response + Save to drafts]
```

The Ollama node connects to `http://localhost:11434` (or the appliance IP). No cloud API key needed. Workflows run entirely on the appliance.

### Q25: Can I use the appliance with Microsoft Copilot or other AI-enabled software?

**Not directly.** Microsoft Copilot is cloud-dependent and cannot be redirected to a local model. However:

- **Applications with configurable AI backends** (e.g., Continue.dev for VS Code, various IDE extensions) can be pointed at the Manteis Ollama API.
- **Custom applications** using OpenAI-compatible APIs can switch to the local endpoint with a base URL change.
- **Manteis Sovereign OS** includes a web-based chat interface (similar to ChatGPT) accessible from any browser on the internal network.

For organizations that need Copilot-like functionality without cloud, the Sovereign OS web interface + IDE plugins (Continue.dev) provide a comparable experience.

### Q26: How do I migrate existing LangChain/LlamaIndex pipelines from cloud to local?

**Change the LLM client.** In LangChain:

```python
# Before (cloud)
from langchain_openai import ChatOpenAI
llm = ChatOpenAI(model="gpt-4", api_key="sk-...")

# After (local)
from langchain_ollama import ChatOllama
llm = ChatOllama(model="llama3:70b", base_url="http://10.0.0.5:11434")
```

Embeddings similarly switch from OpenAI embeddings to Ollama embeddings:

```python
# Before
from langchain_openai import OpenAIEmbeddings
embeddings = OpenAIEmbeddings(api_key="sk-...")

# After
from langchain_ollama import OllamaEmbeddings
embeddings = OllamaEmbeddings(model="nomic-embed-text", base_url="http://10.0.0.5:11434")
```

In most cases, this is the only code change required. RAG pipelines, chains, and agents continue working unchanged.

---

## Edge AI (ESP32)

### Q27: Can the ESP32 really run a language model, or is it just a classifier?

**Both.** The Manteis Edge platform supports:
- **Micro-models (1–5M params):** True neural network models for classification, intent parsing, anomaly detection. These are small transformer or CNN architectures, quantized to INT4.
- **Tiny generative models (up to ~50M effective params):** Pruned versions of TinyLlama-1.1B, capable of short text generation (a few sentences). Inference is slow (~2s/token) but functional.

For most edge AI use cases, the micro-models (classification and parsing) are the practical choice. Generative models on ESP32 are currently a research frontier, not a production tool.

### Q28: How do I train a custom model for my ESP32 deployment?

**The Manteis Edge model training pipeline:**

1. **Collect data:** Gather sensor data or text examples specific to your use case (e.g., vibration patterns from your specific machines)
2. **Train on a GPU server:** Train a small model (2–10M params) using PyTorch on a Manteis appliance or cloud GPU (for training only — inference is always on-device)
3. **Quantize:** Convert to INT4 using the Manteis Edge quantizer
4. **Prune:** Remove low-impact weights to reduce size
5. **Flash:** Deploy to ESP32 via the Manteis Edge CLI

Manteis Systems offers custom model training as a professional service for volume deployments (100+ ESP32 units).

### Q29: How long does an ESP32 run on battery power?

**Depends on duty cycle:**

| Scenario | Power Consumption | Battery Life (2000mAh LiPo) |
|---|---|---|
| Continuous inference (10Hz) | ~40mA | ~50 hours |
| Inference every 5 seconds | ~5mA average | ~400 hours (16 days) |
| Inference every 6 hours (deep sleep between) | ~0.5mA average | ~166 days (5.5 months) |
| Deep sleep, wake on interrupt | ~0.1mA average | ~833 days (theoretical) |

For solar-powered deployments with 6-hourly inference (agricultural monitoring), a 2000mAh battery + small solar panel provides indefinite operation.

---

## Cost & ROI

### Q30: What's the total cost of ownership over 3 years for each appliance?

**Manteis One (5-person team):**

| Cost | Year 1 | Year 2 | Year 3 | 3-Year Total |
|---|---|---|---|---|
| Hardware | $5,000 | — | — | $5,000 |
| Power (150W × 24h × 365d × $0.15/kWh) | $197 | $197 | $197 | $591 |
| Maintenance & support | $500 | $500 | $500 | $1,500 |
| **Total** | **$5,697** | **$697** | **$697** | **$7,091** |

**Equivalent cloud cost (5 users, moderate usage):** $18,000/year × 3 = $54,000
**3-year savings:** $46,909 (86% reduction)

**Manteis Fortress (50-person team):**

| Cost | Year 1 | Year 2 | Year 3 | 3-Year Total |
|---|---|---|---|---|
| Hardware | $50,000 | — | — | $50,000 |
| Power (1500W × 24h × 365d × $0.15/kWh) | $1,971 | $1,971 | $1,971 | $5,913 |
| Maintenance & support | $4,000 | $4,000 | $4,000 | $12,000 |
| **Total** | **$55,971** | **$5,971** | **$5,971** | **$67,913** |

**Equivalent cloud cost (50 users, heavy usage):** $144,000/year × 3 = $432,000
**3-year savings:** $364,087 (84% reduction)

---

## Still Have Questions?

1. **[Read the general FAQ](./2026-07-29-faq-sovereign-ai-30-questions.md)** — 30 non-technical questions about sovereign AI
2. **[Book a technical consultation](https://manteis.systems/contact)** — 30-minute call with a Manteis engineer
3. **[Get the $97 Starter Kit](https://manteis.systems/starter-kit)** — Build a prototype and test these configurations yourself

---

*These answers reflect Manteis Systems' production deployment experience as of July 2026. Model performance, VRAM requirements, and tooling capabilities evolve rapidly — **[contact Manteis](https://manteis.systems/contact)** for current specifications and recommendations.*