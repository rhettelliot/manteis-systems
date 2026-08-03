---
title: "Ollama Deployment Guide 2026: Run Local LLMs in Production"
slug: ollama-deployment-guide-2026
date: 2026-07-30
type: guide
target_keywords:
  - Ollama deployment
  - local LLM deployment
  - self-hosted AI
  - local AI
  - private AI
  - on-premise AI
  - AI without cloud
  - Manteis Systems
internal_links:
  - /products/manteis-cloud
  - /products/manteis-one-core-fortress
  - /sovereign-ai-method
meta_description: "Complete guide to deploying Ollama in production: model selection, GPU sizing, API configuration, load balancing, security hardening, and monitoring. Run local LLMs without cloud dependency."
---

# Ollama Deployment Guide 2026: Run Local LLMs in Production

Ollama is the fastest path to running large language models locally. One command pulls a model; another starts an OpenAI-compatible API server. The hard part isn't *running* Ollama — it's running it **in production**, at scale, with reliability, security, and monitoring.

This guide covers the full deployment path: hardware sizing, model selection, configuration, load balancing, security hardening, and observability. Whether you're running a single workstation or a rack of GPU servers, this is how you deploy Ollama the sovereign way.

---

## 1. Hardware Sizing: What You Actually Need

Ollama runs on CPU (slow), Apple Silicon (impressive), and NVIDIA/AMD GPUs (production-grade). Here's the sizing matrix:

| Model Class | Example Models | VRAM Required | Recommended Hardware |
|---|---|---|---|
| Small (1-8B) | Llama 3.2 3B, Qwen2.5 7B, Mistral 7B | 6-8 GB | RTX 4060, M2 Pro Mac, Manteis Edge |
| Medium (8-32B) | Llama 3 8B, Mistral Large, Qwen2.5 14B | 16-24 GB | RTX 4090, M3 Max Mac, Manteis One |
| Large (32-70B) | Llama 3 70B, Qwen2.5 72B (quantized) | 40-48 GB | 2× RTX 4090, Manteis Core |
| Frontier (70B+) | DeepSeek R1, Llama 3 70B (full precision) | 80-160 GB | 4× A100/H100, Manteis Fortress |

**Rule of thumb:** VRAM > model size (in bytes) ÷ 1.5. A 7B model at Q4 quantization needs ~5 GB VRAM. Leave headroom for context window + KV cache.

**The Manteis shortcut:** [Manteis One](/products/manteis-one-core-fortress) ships pre-configured with Ollama, GPU drivers, and optimized model profiles. You skip the 2-week setup phase.

---

## 2. Model Selection: Choosing the Right Local LLM

Not all models are equal. Match the model to the task:

| Use Case | Recommended Model | Why |
|---|---|---|
| General chat / Q&A | Llama 3.2 3B or Mistral 7B | Fast, capable, low VRAM |
| Document summarization | Qwen2.5 14B | Excellent long-context performance |
| Code generation | DeepSeek Coder 33B or Qwen2.5 Coder 7B | Top-tier code benchmarks |
| RAG retrieval + synthesis | Llama 3 8B Instruct | Strong instruction-following + low latency |
| Multilingual | Qwen2.5 14B (supports 29 languages) | Best multilingual open model |
| Edge / embedded | Qwen2.5 0.5B or TinyLlama | Runs on ESP32-class hardware (Manteis Edge) |

**Quantization:** Always start with Q4_K_M quantization. It reduces model size by ~70% with negligible quality loss. Use Q8 if you have VRAM to spare and need max quality.

```bash
# Pull a quantized model
ollama pull llama3.2:3b

# List installed models
ollama list
```

---

## 3. API Configuration: OpenAI-Compatible Serving

Ollama exposes an OpenAI-compatible API on port 11434. This means any tool built for the OpenAI API — LangChain, LlamaIndex, n8n, custom apps — works with zero code changes.

```bash
# Start Ollama server (default port 11434)
ollama serve

# Set a custom host/port
OLLAMA_HOST=0.0.0.0:8080 ollama serve

# Test the API
curl http://localhost:11434/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "llama3.2",
    "messages": [{"role": "user", "content": "Hello, sovereign AI."}],
    "stream": false
  }'
```

### Environment Variables for Production

```bash
# Bind to all interfaces (for network access)
OLLAMA_HOST=0.0.0.0:11434

# Set max concurrent requests
OLLAMA_MAX_QUEUE=512

# Set model unload timeout (seconds) — keeps models warm
OLLAMA_KEEP_ALIVE=300

# Custom model storage path (use fast NVMe)
OLLAMA_MODELS=/mnt/nvme/ollama/models

# Flash attention for supported models (2-3x speedup)
OLLAMA_FLASH_ATTENTION=1

# Number of parallel requests per model
OLLAMA_NUM_PARALLEL=4
```

---

## 4. Load Balancing: Scaling Ollama Horizontally

A single Ollama instance handles ~10-20 concurrent requests. For production load, run multiple instances behind a load balancer.

**Architecture:**

```
Client → HAProxy/Nginx → [Ollama Instance 1 (GPU 0)]
                       → [Ollama Instance 2 (GPU 1)]
                       → [Ollama Instance 3 (GPU 2)]
```

**Nginx config example:**

```nginx
upstream ollama_backend {
    least_conn;
    server 10.0.0.11:11434;
    server 10.0.0.12:11434;
    server 10.0.0.13:11434;
}

server {
    listen 443 ssl;
    server_name ai.internal.company.com;

    ssl_certificate /etc/ssl/ollama.crt;
    ssl_certificate_key /etc/ssl/ollama.key;

    location / {
        proxy_pass http://ollama_backend;
        proxy_set_header Host $host;
        proxy_read_timeout 300s;
        proxy_buffering off;  # Required for streaming
    }
}
```

**Manteis Cloud handles this for you.** The orchestration layer auto-scales Ollama instances across available GPUs, load-balances requests, and handles failover. [See Manteis Cloud tiers →](/products/manteis-cloud)

---

## 5. Security Hardening: Zero-Trust Ollama

Running Ollama on `0.0.0.0` without authentication is a common mistake. Lock it down:

### Authentication

Ollama doesn't have built-in auth. Put it behind a reverse proxy with API key validation:

```nginx
# Add to the location block above
if ($http_authorization != "Bearer sk-your-internal-key") {
    return 401;
}
```

Or use an API gateway (Kong, Traefik) with JWT validation for per-user access control.

### Network Isolation

- **Never expose Ollama directly to the internet.** Always behind a VPN (Tailscale) or reverse proxy.
- Run Ollama on a dedicated VLAN with firewall rules restricting access to known client IPs.
- Use mTLS between the load balancer and Ollama instances.

### Data Security

- Model files are stored on disk — encrypt the storage volume (LUKS on Linux, FileVault on macOS).
- Conversation logs: Ollama doesn't persist chat history by default, but if you enable logging, encrypt and rotate logs.
- No data ever leaves your network. This is the entire point of sovereign AI.

---

## 6. Monitoring and Observability

### Metrics to Track

| Metric | Why It Matters | Alert Threshold |
|---|---|---|
| Request latency (p99) | User experience | > 5000ms |
| GPU utilization | Capacity planning | > 90% sustained |
| GPU memory usage | OOM prevention | > 95% |
| Queue depth | Backpressure | > 50 requests |
| Model load time | Cold-start impact | > 30s |
| Error rate | Reliability | > 1% |

### Prometheus + Grafana Setup

Ollama exposes metrics at `/metrics` (enable with `OLLAMA_DEBUG=1`). Scrape with Prometheus:

```yaml
# prometheus.yml
scrape_configs:
  - job_name: 'ollama'
    static_configs:
      - targets: ['10.0.0.11:11434', '10.0.0.12:11434', '10.0.0.13:11434']
    metrics_path: /metrics
```

**Manteis Cloud includes a pre-built Grafana dashboard** with all the above metrics, alerting, and capacity forecasting. No manual setup required.

---

## 7. Production Checklist

Before going live with your Ollama deployment:

- [ ] GPU drivers installed and verified (`nvidia-smi` or `system_profiler SPDisplaysDataType`)
- [ ] Ollama installed and at least one model pulled
- [ ] Ollama bound to internal interface only (never `0.0.0.0` without auth)
- [ ] Reverse proxy configured with TLS + API key auth
- [ ] Load balancer in place for multi-instance deployments
- [ ] Prometheus metrics scraping and Grafana dashboard live
- [ ] Alerting rules configured (latency, GPU memory, error rate)
- [ ] Backup strategy for model files (rsync to NAS, or Git LFS for custom models)
- [ ] Failover plan documented (which instance takes over if one dies)
- [ ] Rate limiting configured (prevent abuse from internal users)
- [ ] Log rotation and encryption configured
- [ ] VPN/Tailscale access only — no direct internet exposure

---

## 8. The Manteis Shortcut

Doing all of the above takes 2-3 weeks for a competent DevOps engineer. **Manteis One** ships with all of it pre-configured:

- Ollama installed, optimized, and battle-tested
- Nginx reverse proxy with auth pre-wired
- Prometheus + Grafana dashboards live on day one
- Load balancing across multiple GPUs
- Tailscale integration for secure remote access
- Manteis Cloud orchestration for auto-updates and model management

[Explore Manteis One →](/products/manteis-one-core-fortress) or [book a Sovereign AI Method consultation](/sovereign-ai-method) to get a deployment plan tailored to your infrastructure.

---

## Conclusion

Ollama is the engine. Sovereign AI is the architecture. This guide shows you the raw deployment path — but the difference between "it runs" and "it's production-grade" is about 40 hours of configuration, hardening, and monitoring work.

You can do it yourself using this guide, or you can let Manteis Systems handle it. Either way, the time to move off cloud AI is now.

**Manteis Systems — Sovereign AI. Your data. Your hardware. Your intelligence.**