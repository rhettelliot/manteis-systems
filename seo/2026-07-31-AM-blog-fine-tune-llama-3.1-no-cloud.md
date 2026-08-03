---
title: "How to Fine-Tune Llama 3.1 on Your Own Data (No Cloud Required): A Complete Guide"
date: 2026-07-31
type: blog
keywords: ["local LLM deployment", "self-hosted AI", "sovereign AI", "Ollama deployment", "local AI", "AI without cloud", "private AI", "on-premise AI", "Manteis Systems", "Manteis Sovereign AI", "private AI infrastructure", "AI appliance"]
target_audience: ["ML engineers", "AI developers", "DevOps teams", "enterprise IT", "startup CTOs", "anyone wanting to customize LLMs without cloud APIs"]
word_count: 3400
---

# How to Fine-Tune Llama 3.1 on Your Own Data (No Cloud Required): A Complete Guide

Fine-tuning a large language model on your own data used to mean one of two things: pay a cloud AI provider $30,000-$100,000 per fine-tuning job and upload your proprietary data to their servers, or build a massive GPU cluster that costs more than a house.

Neither option is acceptable for most organizations. The first creates data exposure risk and costs a fortune. The second requires infrastructure expertise and capital that few teams have.

In 2026, there's a third option: fine-tune Llama 3.1 on a single Manteis appliance — or even a consumer GPU — using a technique called LoRA (Low-Rank Adaptation). Your data never leaves your machine. The cost is electricity. The results often outperform cloud-fine-tuned models because you control the training data, the hyperparameters, and the evaluation.

This guide walks through the entire process, from data preparation to deployment, with working code you can run today.

---

## Why Fine-Tune at All?

Before diving into the how, let's address the why. With RAG (Retrieval-Augmented Generation) handling many domain-specific Q&A tasks, do you still need fine-tuning?

**Yes, for these use cases:**

1. **Style/tone matching:** You want the model to write in your organization's voice — matching terminology, formatting, and communication style
2. **Domain-specific reasoning:** Your domain has specialized reasoning patterns that RAG context alone doesn't teach (e.g., legal argumentation, medical diagnosis workflows, financial analysis frameworks)
3. **Structured output:** You need the model to consistently produce specific output formats (JSON schemas, XML, custom templates)
4. **Task specialization:** You want a model that excels at one task (e.g., code review for your codebase) rather than a generalist
5. **Reduced context dependency:** Fine-tuned models need less context in prompts, reducing token usage and latency
6. **Edge deployment:** Fine-tuned smaller models (8B) can match the performance of larger models (70B) on specific tasks, enabling deployment on smaller hardware

**When to use RAG instead:**
- Factual knowledge lookup (the model needs to know specific facts)
- Frequently changing information (product catalogs, pricing, policies)
- Large knowledge bases that don't fit in fine-tuning data
- When you need citations/sources for answers

**The best approach is often both:** Fine-tune for style/reasoning/format, use RAG for factual knowledge. They're complementary, not competing.

---

## What You Need

### Hardware Options

**Option 1: Manteis Core / Fortress (Recommended for Production)**
- Manteis Core (32GB VRAM): Fine-tune Llama 3.1 8B in 4-6 hours
- Manteis Fortress (80GB+ VRAM): Fine-tune Llama 3.1 70B in 8-12 hours
- Pre-configured with all necessary tools
- Production deployment immediately after fine-tuning

**Option 2: Consumer GPU (For Evaluation)**
- RTX 3090/4090 (24GB VRAM): Fine-tune Llama 3.1 8B with QLoRA in 6-8 hours
- RTX 4080 (16GB VRAM): Fine-tune Llama 3.1 8B with aggressive quantization in 8-10 hours
- Mac Studio M2 Ultra (192GB unified memory): Fine-tune via MLX framework

**Option 3: Cloud GPU (If You Must)**
- RunPod / Lambda Labs: ~$0.50-$2.00/hour for A100
- 6-12 hour fine-tuning job = $3-$24
- Use this only if you don't have local hardware — and download your fine-tuned model immediately

**This guide focuses on Option 1 (Manteis appliance) and Option 2 (consumer GPU).**

### Software Stack

```bash
# All of these run locally — no cloud dependencies

# 1. Ollama (model management and serving)
curl -fsSL https://ollama.ai/install.sh | sh

# 2. Python environment
python3 -m venv finetune-env
source finetune-env/bin/activate

# 3. Fine-tuning libraries
pip install torch transformers peft trl datasets accelerate bitsandbytes

# 4. Optional: Weights & Biases for training visualization
pip install wandb
```

---

## Step 1: Prepare Your Training Data

Fine-tuning quality is 80% data preparation, 20% training configuration. Garbage in, garbage out applies triple here.

### Data Format

Llama 3.1 uses a chat format. Your training data should be in JSONL (JSON Lines) format with instruction/response pairs:

```jsonl
{"messages": [{"role": "system", "content": "You are a legal document analyzer for Smith & Associates Law Firm."}, {"role": "user", "content": "Summarize the key terms of this contract clause."}, {"role": "assistant", "content": "Key terms: 1) Payment due within 30 days of invoice. 2) Late payment incurs 1.5% monthly interest. 3) Either party may terminate with 60 days written notice..."}]}
{"messages": [{"role": "system", "content": "You are a legal document analyzer for Smith & Associates Law Firm."}, {"role": "user", "content": "Extract all obligations of the licensee in this agreement."}, {"role": "assistant", "content": "Licensee obligations: 1) Maintain confidentiality of all proprietary information. 2) Use the software solely for internal business operations. 3) Pay annual maintenance fees of $24,000..."}]}
```

### Data Sources

**Where to get fine-tuning data:**

1. **Existing Q&A pairs:** Export from your help desk, CRM, or knowledge base
2. **Synthetic data generation:** Use a larger model (Llama 3.1 70B) to generate training examples from your documents
3. **Human annotations:** Have domain experts write ideal responses to representative questions
4. **Conversation logs:** Anonymized chat logs, email threads, support interactions
5. **Document → Q&A generation:** Automatically generate question-answer pairs from your documents

### Data Quality Checklist

- ✅ **Minimum 500 examples** for meaningful fine-tuning (1,000-5,000 is ideal)
- ✅ **Diverse examples** covering the range of inputs the model will see in production
- ✅ **Consistent formatting** — every example follows the same structure
- ✅ **High-quality responses** — the model learns from these, so they must be excellent
- ✅ **No sensitive PII** unless you're training on a fully air-gapped Manteis Fortress
- ✅ **Balanced distribution** — don't over-represent one type of query

### Data Preparation Script

```python
import json
from datasets import Dataset

def load_training_data(jsonl_path):
    """Load JSONL training data into Hugging Face Dataset format."""
    data = []
    with open(jsonl_path, 'r') as f:
        for line in f:
            data.append(json.loads(line))
    
    dataset = Dataset.from_list(data)
    return dataset

# Load your data
train_dataset = load_training_data('training_data.jsonl')
eval_dataset = load_training_data('eval_data.jsonl')  # Hold out 10% for evaluation

print(f"Training examples: {len(train_dataset)}")
print(f"Evaluation examples: {len(eval_dataset)}")
```

---

## Step 2: Configure the Fine-Tuning Job

We'll use **QLoRA** (Quantized Low-Rank Adaptation) — the technique that makes fine-tuning possible on a single GPU. QLoRA quantizes the base model to 4-bit precision and trains a small set of adapter weights (the "LoRA adapters") in full precision. This reduces memory requirements by 4-8x while maintaining 99%+ of full fine-tuning quality.

### Fine-Tuning Configuration

```python
import torch
from transformers import (
    AutoModelForCausalLM,
    AutoTokenizer,
    TrainingArguments,
    BitsAndBytesConfig
)
from peft import LoraConfig, get_peft_model, prepare_model_for_kbit_training
from trl import SFTTrainer, SFTConfig

# --- Model Configuration ---
model_id = "meta-llama/Llama-3.1-8B-Instruct"

# Quantization config (4-bit for memory efficiency)
bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_use_double_quant=True,
    bnb_4bit_quant_type="nf4",
    bnb_4bit_compute_dtype=torch.bfloat16
)

# Load model with quantization
model = AutoModelForCausalLM.from_pretrained(
    model_id,
    quantization_config=bnb_config,
    device_map="auto",
    trust_remote_code=True
)

# Load tokenizer
tokenizer = AutoTokenizer.from_pretrained(model_id)
tokenizer.pad_token = tokenizer.eos_token
tokenizer.padding_side = "right"

# Prepare model for k-bit training
model = prepare_model_for_kbit_training(model)

# --- LoRA Configuration ---
# These are the adapter weights that will be trained
# r = rank (higher = more capacity, more memory)
# alpha = scaling factor (typically 2x rank)
# target_modules = which layers to adapt
lora_config = LoraConfig(
    r=16,                    # Rank: 8, 16, 32, or 64 (16 is a good default)
    lora_alpha=32,           # Scaling: typically 2x rank
    target_modules=[
        "q_proj", "k_proj", "v_proj", "o_proj",  # Attention layers
        "gate_proj", "up_proj", "down_proj"       # MLP layers
    ],
    lora_dropout=0.05,       # Dropout for regularization
    bias="none",
    task_type="CAUSAL_LM"
)

model = get_peft_model(model, lora_config)

# Print trainable parameters
model.print_trainable_parameters()
# Output: trainable params: 41,943,040 || all params: 8,072,204,288 || trainable%: 0.52%
# Only 0.52% of parameters are trained — that's the magic of LoRA
```

### Training Arguments

```python
# --- Training Configuration ---
training_config = SFTConfig(
    output_dir="./llama3.1-finetuned",
    num_train_epochs=3,                    # 3-5 epochs typically sufficient
    per_device_train_batch_size=4,         # Reduce if OOM (2 or 1)
    per_device_eval_batch_size=4,
    gradient_accumulation_steps=4,         # Effective batch size = 4 × 4 = 16
    gradient_checkpointing=True,           # Saves memory at cost of speed
    optim="paged_adamw_32bit",             # Memory-efficient optimizer
    save_steps=50,                         # Save checkpoint every 50 steps
    logging_steps=10,                      # Log every 10 steps
    learning_rate=2e-4,                    # 1e-4 to 3e-4 is typical for LoRA
    weight_decay=0.001,
    fp16=False,
    bf16=True,                             # Use bf16 if your GPU supports it
    max_grad_norm=0.3,
    max_seq_length=2048,                   # Max sequence length (reduce for memory)
    warmup_ratio=0.03,
    lr_scheduler_type="cosine",            # Cosine decay schedule
    eval_strategy="steps",
    eval_steps=50,
    load_best_model_at_end=True,
    report_to="wandb",                     # Optional: training visualization
)

# --- Initialize Trainer ---
trainer = SFTTrainer(
    model=model,
    train_dataset=train_dataset,
    eval_dataset=eval_dataset,
    peft_config=lora_config,
    tokenizer=tokenizer,
    args=training_config,
)
```

---

## Step 3: Run the Fine-Tuning

```python
# --- Start Training ---
trainer.train()

# --- Save the Fine-Tuned Adapters ---
trainer.save_model("./llama3.1-finetuned-final")
tokenizer.save_pretrained("./llama3.1-finetuned-final")

print("Fine-tuning complete!")
print(f"Adapter weights saved to ./llama3.1-finetuned-final/")
```

### What to Expect During Training

On a Manteis Core (RTX 4090, 24GB VRAM) with 1,000 training examples:

| Metric | Value |
|---|---|
| Training time | 4-6 hours (3 epochs) |
| GPU memory usage | ~18-22GB |
| Training loss | Should decrease steadily |
| Eval loss | Should decrease, then plateau |
| Adapter file size | ~80MB (LoRA r=16) |

On a Manteis Fortress (4× A100, 80GB VRAM) with 5,000 training examples:

| Metric | Value |
|---|---|
| Training time | 8-12 hours (3 epochs) |
| GPU memory usage | ~60-70GB |
| Training loss | Should decrease steadily |
| Adapter file size | ~80-160MB |

### Monitoring Training Quality

Watch for these signals:

✅ **Healthy training:**
- Training loss decreases steadily
- Eval loss decreases and plateaus (not increasing)
- Eval accuracy improves or stabilizes

❌ **Problems to watch for:**
- **Overfitting:** Eval loss starts increasing while training loss continues decreasing → reduce epochs, increase dropout, or get more data
- **Underfitting:** Training loss doesn't decrease → check data quality, increase learning rate
- **Catastrophic forgetting:** Model loses general capabilities → reduce learning rate, use lower LoRA rank, or mix in general data
- **OOM (Out of Memory):** Reduce batch size, sequence length, or LoRA rank

---

## Step 4: Evaluate the Fine-Tuned Model

### Automated Evaluation

```python
import torch
from transformers import AutoModelForCausalLM, AutoTokenizer
from peft import PeftModel

# Load base model
base_model = AutoModelForCausalLM.from_pretrained(
    "meta-llama/Llama-3.1-8B-Instruct",
    device_map="auto",
    torch_dtype=torch.bfloat16
)

# Load fine-tuned adapters
fine_tuned_model = PeftModel.from_pretrained(
    base_model,
    "./llama3.1-finetuned-final"
)

tokenizer = AutoTokenizer.from_pretrained("meta-llama/Llama-3.1-8B-Instruct")

# Test with domain-specific questions
test_questions = [
    "Summarize the termination clause in this contract.",
    "What are the payment terms described in this agreement?",
    "Extract all confidentiality obligations from this document.",
]

for question in test_questions:
    messages = [
        {"role": "system", "content": "You are a legal document analyzer for Smith & Associates Law Firm."},
        {"role": "user", "content": question}
    ]
    
    input_text = tokenizer.apply_chat_template(messages, tokenize=False, add_generation_prompt=True)
    inputs = tokenizer(input_text, return_tensors="pt").to(model.device)
    
    with torch.no_grad():
        outputs = fine_tuned_model.generate(
            **inputs,
            max_new_tokens=512,
            temperature=0.3,
            do_sample=True
        )
    
    response = tokenizer.decode(outputs[0][inputs.input_ids.shape[1]:], skip_special_tokens=True)
    print(f"Q: {question}")
    print(f"A: {response}\n")
```

### Evaluation Checklist

Compare fine-tuned model vs base model on:

1. **Domain accuracy:** Does it answer domain-specific questions more correctly?
2. **Format compliance:** Does it follow your required output format consistently?
3. **Style matching:** Does it sound like your organization's voice?
4. **General capability:** Has it lost general reasoning ability? (Test with general questions)
5. **Hallucination rate:** Does it hallucinate less on domain topics? (It should)

### Using lm-evaluation-harness for Standardized Benchmarks

```bash
# Install evaluation harness
pip install lm-eval

# Run standardized benchmarks on your fine-tuned model
lm_eval --model hf --model_args path=./llama3.1-finetuned-final \
  --tasks hellaswag,arc_challenge,mmlu \
  --batch_size 8
```

---

## Step 5: Deploy with Ollama

Once you're satisfied with your fine-tuned model, deploy it via Ollama for production use:

### Option A: Merge and Deploy (Full Model)

```python
# Merge LoRA adapters with base model
merged_model = fine_tuned_model.merge_and_unload()

# Save merged model
merged_model.save_pretrained("./llama3.1-merged")
tokenizer.save_pretrained("./llama3.1-merged")
```

```bash
# Convert to GGUF format for Ollama
# Install llama.cpp
git clone https://github.com/ggerganov/llama.cpp
cd llama.cpp
make

# Convert to GGUF
python convert.py ../llama3.1-merged --outtype q4_K_M --outfile llama3.1-finetuned.gguf

# Create Ollama model
cat > Modelfile << EOF
FROM ./llama3.1-finetuned.gguf
PARAMETER temperature 0.3
PARAMETER num_ctx 4096
SYSTEM "You are a legal document analyzer for Smith & Associates Law Firm."
EOF

# Load into Ollama
ollama create smith-law-analyzer -f Modelfile

# Run it
ollama run smith-law-analyzer
```

### Option B: Deploy Adapters Directly (Smaller Footprint)

```bash
# Create Ollama model from base + adapters
cat > Modelfile << EOF
FROM llama3.1:8b-instruct
ADAPTER ./llama3.1-finetuned-final
PARAMETER temperature 0.3
SYSTEM "You are a legal document analyzer for Smith & Associates Law Firm."
EOF

ollama create smith-law-analyzer -f Modelfile
ollama run smith-law-analyzer
```

### Option C: Deploy on Manteis Appliance

On a Manteis Core or Fortress, the fine-tuned model is automatically available to all users via Open WebUI. Simply load the model in Ollama, and it appears in the model selector for everyone on your network.

---

## Advanced: Fine-Tuning Llama 3.1 70B

Fine-tuning the 70B model requires more VRAM but produces significantly better results for complex tasks.

### Hardware Requirements

- **Manteis Fortress (4× A100 80GB):** Full LoRA fine-tuning, 8-12 hours
- **Manteis Fortress (4× RTX 4090 24GB):** QLoRA fine-tuning with model parallelism, 12-18 hours
- **Single A100 80GB:** QLoRA fine-tuning, 20-30 hours

### Configuration Changes for 70B

```python
# More aggressive quantization for 70B
bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_use_double_quant=True,
    bnb_4bit_quant_type="nf4",
    bnb_4bit_compute_dtype=torch.bfloat16
)

# Lower LoRA rank to save memory
lora_config = LoraConfig(
    r=8,                     # Lower rank for 70B (8 or 16)
    lora_alpha=16,
    target_modules=["q_proj", "k_proj", "v_proj", "o_proj"],  # Fewer targets
    lora_dropout=0.1,
    bias="none",
    task_type="CAUSAL_LM"
)

# Smaller batch size
training_config = SFTConfig(
    per_device_train_batch_size=1,        # Reduce for 70B
    gradient_accumulation_steps=8,        # Compensate with more accumulation
    max_seq_length=1024,                  # Reduce sequence length
    # ... other args same as 8B
)
```

---

## The Economic Argument: Why Fine-Tune Locally

### Cloud Fine-Tuning vs Local Fine-Tuning

| Factor | Cloud Fine-Tuning (OpenAI/ Azure/ AWS) | Local Fine-Tuning (Manteis Appliance) |
|---|---|---|
| Cost per fine-tuning job | $30,000 - $100,000 | $0 (electricity only) |
| Data leaves your premises | ✅ Yes | ❌ No |
| Training data size limits | ⚠️ Provider-limited | ✅ Hardware-limited only |
| Iteration speed | ⚠️ Hours to days per iteration | ✅ Minutes to hours |
| Model ownership | ⚠️ Provider-hosted, you access via API | ✅ You own the model file |
| Deployment speed | ⚠️ Provider deployment timeline | ✅ Immediate (load in Ollama) |
| Number of fine-tuning jobs | ⚠️ Pay per job | ✅ Unlimited |
| Data privacy | ⚠️ Provider processes your data | ✅ Zero external exposure |

**For an organization that fine-tunes 5 models per year, local fine-tuning saves $150,000-$500,000 annually — while keeping proprietary training data fully under your control.**

---

## Common Pitfalls and Solutions

### Pitfall 1: Catastrophic Forgetting
**Problem:** Fine-tuned model loses general capabilities.
**Solution:** Mix 10-20% general-purpose data (e.g., OpenAssistant dataset) into your training data. Use lower learning rate (1e-4 instead of 2e-4). Use lower LoRA rank (8 instead of 16).

### Pitfall 2: Overfitting on Small Datasets
**Problem:** Model memorizes training examples but doesn't generalize.
**Solution:** Use more data (aim for 1,000+ examples). Increase dropout (0.1). Use early stopping. Reduce epochs (2 instead of 3).

### Pitfall 3: Poor Data Quality
**Problem:** Model learns bad patterns from training data.
**Solution:** Manually review 50-100 training examples. Remove inconsistent, poorly formatted, or incorrect responses. Ensure response quality is higher than what you expect from the model.

### Pitfall 4: Wrong Chat Format
**Problem:** Model doesn't respond properly after fine-tuning.
**Solution:** Ensure training data uses Llama 3.1's exact chat format (`<|begin_of_text|><|start_header_id|>...`). Use the tokenizer's `apply_chat_template` method to format examples correctly.

### Pitfall 5: Deployment Mismatch
**Problem:** Model works in testing but not in Ollama.
**Solution:** Ensure the system prompt in your Modelfile matches the system prompt used in training. Use the same quantization level in production as in evaluation.

---

## Fine-Tuning on Manteis Edge (ESP32)

Yes, you can fine-tune for edge deployment too. The process:

1. Fine-tune Llama 3.1 8B on your Manteis appliance using the process above
2. Aggressively quantize the fine-tuned model to 2-bit or 3-bit precision
3. Convert to TFLite Micro or ONNX format
4. Deploy on Manteis Edge ESP32-S3 ($8 per chip)

The fine-tuned edge model handles:
- Specific classification tasks (quality inspection, sentiment analysis)
- Keyword detection and intent recognition
- Simple Q&A with constrained responses
- Sensor data interpretation

**All running on an $8 chip, offline, with your fine-tuned model.**

---

## Conclusion

Fine-tuning Llama 3.1 on your own data, on your own hardware, without cloud dependencies is not just possible — it's the economically and architecturally superior choice for most organizations.

The process:
1. **Prepare your data** (500-5,000 high-quality examples)
2. **Configure QLoRA fine-tuning** (16-rank adapters, 3 epochs, 2e-4 learning rate)
3. **Train on your Manteis appliance** (4-6 hours for 8B, 8-12 hours for 70B)
4. **Evaluate against your test set** (domain accuracy, format compliance, style matching)
5. **Deploy via Ollama** (immediate, unlimited queries, zero per-token cost)

Your fine-tuned model is your competitive advantage. It encodes your domain knowledge, your communication style, and your organizational expertise. It runs on your hardware, serves your users, and costs nothing per query.

**This is sovereign AI in practice: not just running models locally, but owning the entire model lifecycle — training, evaluation, deployment, and iteration — without ever depending on a cloud provider.**

---

## Get Started

- **Sovereign AI Starter Kit ($97):** Includes fine-tuning guide, data preparation templates, and evaluation framework — manteis.systems/starter-kit
- **Manteis Core ($14,800):** Fine-tune and deploy 8B models — manteis.systems/core
- **Manteis Fortress ($48,000):** Fine-tune and deploy 70B models at enterprise scale — manteis.systems/fortress
- **Consultation:** Custom fine-tuning engagement — manteis.systems/consult

---

*Related: [Ollama Deployment Guide](./2026-07-30-guide-ollama-deployment-production.md) | [Local RAG Pipeline Guide](./2026-07-30-guide-local-rag-pipeline.md) | [Complete Guide to Self-Hosted AI 2026](./2026-07-30-EVENING-pillar-complete-guide-self-hosted-ai-2026.md) | [Self-Hosted AI Landing Page](./2026-07-31-AM-landing-self-hosted-ai.md)*

*Manteis Systems — Sovereign AI infrastructure. Your data, your models, your hardware, your control.*

*manteis.systems | hello@manteis.systems*