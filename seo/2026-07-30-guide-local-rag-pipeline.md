---
title: "Local RAG Pipeline: Retrieval-Augmented Generation Without Cloud Dependency"
slug: local-rag-pipeline-no-cloud
date: 2026-07-30
type: guide
target_keywords:
  - local RAG
  - local AI
  - sovereign AI
  - private AI
  - self-hosted AI
  - AI without cloud
  - Ollama deployment
  - local LLM deployment
  - Manteis Systems
internal_links:
  - /products/manteis-cloud
  - /products/manteis-one-core-fortress
  - /sovereign-ai-method
  - /products/sovereign-ai-starter-kit
meta_description: "Build a complete local RAG pipeline with Ollama, ChromaDB, and open-source embedding models. Retrieval-augmented generation that never touches the cloud — full architecture, code, and deployment guide."
---

# Local RAG Pipeline: Retrieval-Augmented Generation Without Cloud Dependency

RAG (Retrieval-Augmented Generation) is the architecture that makes LLMs useful for enterprise: instead of hallucinating, the model retrieves relevant documents from your knowledge base and grounds its answers in your data.

The problem? Most RAG tutorials route through cloud APIs — OpenAI for generation, Pinecone for vectors, HuggingFace for embeddings. Your proprietary documents get embedded, stored, and processed on someone else's infrastructure.

**A local RAG pipeline does all of this on your hardware.** No cloud. No per-token costs. No data leaving your network. This guide shows you exactly how to build one.

---

## What Is RAG (Quick Refresher)

A RAG pipeline has four stages:

1. **Ingestion** — documents are chunked into passages
2. **Embedding** — each chunk is converted to a vector using an embedding model
3. **Retrieval** — a user query is embedded, and the most similar chunks are retrieved from a vector database
4. **Generation** — the retrieved chunks + the user's question are sent to an LLM, which generates a grounded answer

In a local RAG pipeline, **all four stages run on your hardware**. The embedding model, the vector database, and the LLM are all local.

---

## Architecture: The Sovereign RAG Stack

```
[Your Documents (PDF, DOCX, TXT, MD)]
        ↓
[Document Loader + Chunker]  ← LangChain / LlamaIndex (local)
        ↓
[Embedding Model]  ← Ollama (nomic-embed-text)
        ↓
[Vector Database]  ← ChromaDB / Qdrant (self-hosted)
        ↓
[Retrieval + LLM]  ← Ollama (Llama 3 / Qwen2.5)
        ↓
[Grounded Answer]  ← No cloud. No API costs. No data egress.
```

**Components:**
- **Ollama** — runs the LLM and the embedding model locally
- **ChromaDB** — lightweight, self-hosted vector database (no cloud, no setup)
- **LangChain or LlamaIndex** — orchestration framework (runs locally)
- **Python** — the glue

---

## Step 1: Install Dependencies

```bash
# Create a virtual environment
python3 -m venv local-rag
source local-rag/bin/activate

# Install packages
pip install chromadb langchain langchain-community ollama pypdf unstructured

# Pull models via Ollama
ollama pull llama3.2          # LLM for generation
ollama pull nomic-embed-text   # Embedding model
```

**No cloud services. No API keys. No accounts.** Just local software on your machine.

---

## Step 2: Build the Ingestion Pipeline

```python
import chromadb
from langchain_community.document_loaders import PyPDFLoader, TextLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
import requests

# Initialize ChromaDB (local, persistent)
chroma_client = chromadb.PersistentClient(path="./chroma_db")
collection = chroma_client.get_or_create_collection("documents")

# Load documents
def load_document(file_path):
    if file_path.endswith('.pdf'):
        loader = PyPDFLoader(file_path)
    else:
        loader = TextLoader(file_path)
    return loader.load()

# Chunk documents
def chunk_documents(documents, chunk_size=500, chunk_overlap=50):
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=chunk_size,
        chunk_overlap=chunk_overlap,
        length_function=len
    )
    return splitter.split_documents(documents)

# Generate embeddings via Ollama
def get_embedding(text):
    response = requests.post(
        "http://localhost:11434/api/embeddings",
        json={"model": "nomic-embed-text", "prompt": text}
    )
    return response.json()["embedding"]

# Ingest documents
def ingest(file_path):
    docs = load_document(file_path)
    chunks = chunk_documents(docs)

    for i, chunk in enumerate(chunks):
        embedding = get_embedding(chunk.page_content)
        collection.upsert(
            ids=[f"{file_path}_{i}"],
            embeddings=[embedding],
            documents=[chunk.page_content],
            metadatas=[{"source": file_path, "chunk": i}]
        )
    print(f"Ingested {len(chunks)} chunks from {file_path}")

# Run ingestion
ingest("./documents/handbook.pdf")
ingest("./documents/policies.txt")
ingest("./documents/contracts/")
```

---

## Step 3: Build the Query Pipeline

```python
def query_rag(question, n_results=5):
    # 1. Embed the question
    question_embedding = get_embedding(question)

    # 2. Retrieve relevant chunks from ChromaDB
    results = collection.query(
        query_embeddings=[question_embedding],
        n_results=n_results
    )

    # 3. Build context from retrieved chunks
    context = "\n\n---\n\n".join(results["documents"][0])
    sources = results["metadatas"][0]

    # 4. Generate answer using local LLM
    prompt = f"""You are a helpful assistant. Answer the question based only on the provided context.
If the context doesn't contain the answer, say "I don't have enough information to answer that."

Context:
{context}

Question: {question}

Answer:"""

    response = requests.post(
        "http://localhost:11434/api/chat",
        json={
            "model": "llama3.2",
            "messages": [{"role": "user", "content": prompt}],
            "stream": False,
            "options": {"temperature": 0.1}
        }
    )

    answer = response.json()["message"]["content"]

    return {
        "answer": answer,
        "sources": sources,
        "context_used": results["documents"][0]
    }

# Query your local RAG pipeline
result = query_rag("What is our remote work policy?")
print(f"Answer: {result['answer']}")
print(f"Sources: {result['sources']}")
```

---

## Step 4: Add a Web Interface

For production use, wrap your RAG pipeline in a simple web app:

```python
# app.py — FastAPI wrapper
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="Sovereign RAG API")

class Query(BaseModel):
    question: str

@app.post("/ask")
def ask(query: Query):
    result = query_rag(query.question)
    return result

@app.post("/ingest")
def ingest_endpoint(file_path: str):
    ingest(file_path)
    return {"status": "ingested", "path": file_path}

# Run: uvicorn app:app --host 0.0.0.0 --port 8000
```

Access it on your internal network. No external dependencies.

---

## Step 5: Production Hardening

### Performance Optimization

| Technique | Impact | Implementation |
|---|---|---|
| Batch embedding | 3-5x faster ingestion | Embed multiple chunks in one Ollama call |
| HNSW index in ChromaDB | 10-50x faster retrieval | `collection.configure(hnsw_config={...})` |
| Model quantization | 2x more throughput | Use `llama3.2:3b-q4_K_M` |
| Caching embeddings | Skip re-embedding unchanged docs | Hash document content, skip if unchanged |
| GPU acceleration | 10-20x faster generation | Run Ollama on GPU (Manteis One/Core) |

### Security

- Run ChromaDB on internal network only (never expose port 8000 to internet)
- Add API key authentication to your FastAPI app
- Encrypt the ChromaDB persistent storage directory (LUKS on Linux)
- Audit log all queries (who asked what, when)
- Restrict document ingestion to authorized users

### Monitoring

- Track query latency (embedding + retrieval + generation)
- Monitor ChromaDB storage growth
- Log retrieval quality (are retrieved chunks relevant?)
- Track GPU/memory usage during generation
- Set up alerts for Ollama downtime

---

## Cost Comparison: Cloud RAG vs Local RAG

| Component | Cloud RAG (Monthly) | Local RAG (Monthly) |
|---|---|---|
| LLM generation (OpenAI GPT-4) | $3,000 | $0 |
| Embedding API (OpenAI) | $800 | $0 |
| Vector DB (Pinecone) | $500 | $0 |
| Storage | $200 | $0 |
| Compute (your hardware) | — | $200 (electricity) |
| **Total Monthly** | **$4,500** | **$200** |
| **Annual** | **$54,000** | **$2,400** |

**Annual savings: $51,600.** The hardware (Manteis One: $18,000) pays for itself in 4.2 months.

---

## When to Use Local RAG vs Cloud RAG

### Always Use Local RAG When:

- Your documents contain **confidential, proprietary, or regulated data**
- You process **privileged legal documents** or **PHI** or **financial data**
- Your query volume exceeds **10,000 queries/month** (cloud costs become prohibitive)
- You need **audit trails** for every retrieval and generation
- You need **model transparency** for compliance

### Hybrid RAG (Edge Case):

For the rare scenario where you need a frontier model for complex reasoning, use **hybrid routing**: local RAG for 95% of queries, cloud API only for the 5% that genuinely need frontier capability. Manteis Cloud's orchestration layer handles this routing automatically.

---

## The Manteis Shortcut

Building this from scratch takes 1-2 weeks. **Manteis Cloud** ships with a pre-configured local RAG pipeline:

- Ollama with optimized models pre-installed
- ChromaDB configured and persistent
- FastAPI RAG endpoint ready to query
- Document ingestion API with format auto-detection
- Monitoring dashboard (Grafana) with query metrics
- Web UI for non-technical users to query the knowledge base

[Explore Manteis Cloud →](/products/manteis-cloud)

The **[Sovereign AI Starter Kit](/products/sovereign-ai-starter-kit)** ($97) includes the full RAG pipeline code from this guide, plus deployment scripts and a Docker Compose file for one-command setup.

---

## Conclusion

A local RAG pipeline is the foundation of sovereign AI for knowledge work. It gives you the power of retrieval-augmented generation — grounded answers from your own documents — without sending a single byte to a cloud provider.

The components are free. The architecture is proven. The cost savings are massive. The only barrier is the deployment effort — and that's exactly what Manteis Systems eliminates.

**Manteis Systems — Sovereign AI. Your data. Your hardware. Your intelligence.**