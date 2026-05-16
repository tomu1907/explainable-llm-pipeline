# Explainable LLM Pipeline (RAG Observability System)

A lightweight, production-inspired **LLM explainability and observability system** built with FastAPI + React.

It exposes not only answers from a RAG pipeline, but also:
- retrieval behavior
- execution timing
- attribution signals
- hallucination risk heuristics
- full prompt + model trace

This project is designed as a **portfolio-grade AI Systems / AI Architect demonstration**.

---

## Core Idea

Instead of treating LLMs as black boxes, this system decomposes inference into observable steps:

Query → Retrieval → Prompt → LLM → Attribution → UI

---

## Features

### Retrieval Observability
- Top-K retrieved chunks
- Similarity distribution
- Normalized relevance scores
- Hallucination risk heuristic

### Execution Timeline
- Retrieval latency
- Prompt construction time
- LLM inference time
- Attribution computation time
- Total request latency

### Explainability Layer
- Sentence-level attribution
- Confidence scoring
- Source linking

### Debug / Trace Mode
- Full prompt visibility
- Raw model output
- Retrieved context inspection
- Execution trace object

---

## Architecture

### Backend (FastAPI)

- `/ask?q=...` endpoint
- RAG retrieval layer (vector search)
- Prompt builder
- LLM generator (mock or real model)
- Attribution scoring module
- Confidence + failure detection

### Frontend (React + Vite)

- Explainability dashboard
- Execution timeline visualization
- Retrieval analysis panel
- Attribution explorer
- Debug trace viewer

### Architecure Overview

The system follows a layered architecture:

- Motivation Layer (goals, requirements)
- Business Layer (user-facing services)
- Application Layer (RAG + LLM pipeline)
- Technology Layer (infra components)
- Data Layer (artifacts + traces)
- External Systems (LLMs, embeddings, documents)

<img width="1083" height="1210" alt="explainable-llm-pipeline_Architecture" src="https://github.com/user-attachments/assets/9b49480c-459e-499b-a82d-012d70bcbada" />

---

## Core Capabilities

### Retrieval Observability
- Top-K retrieved chunks
- Similarity distribution
- Normalized relevance scores
- Hallucination risk heuristic

### Execution Timeline
- Retrieval latency
- Prompt construction time
- LLM inference time
- Attribution computation time
- Total request latency

### Explainability Layer
- Sentence-level attribution
- Confidence scoring
- Source linking

### Debug / Trace Mode
- Full prompt visibility
- Raw model output
- Retrieved context inspection
- Execution trace object

---

## Execution Trace Example

```
json
{
  "timings": {
    "retrieval_ms": 12.4,
    "prompt_ms": 3.1,
    "llm_ms": 220.5,
    "attribution_ms": 18.2,
    "total_ms": 254.2
  },
  "similarities": [0.91, 0.72, 0.44],
  "hallucination_risk": 0.23
}
```
---

## System Architecture

```
User Query
   ↓
Retrieval (vector search)
   ↓
Prompt construction
   ↓
LLM generation
   ↓
Attribution scoring
   ↓
Explainability + risk analysis
   ↓
Response + Debug Metadata
```

---

## API

### `GET /ask`

Query the system.

#### Request
```
/ask?q=What is the capital of France?
```

#### Response
```json
{
  "query": "What is the capital of France?",
  "answer": "The capital of France is Paris.",
  "sources": [
    {
      "id": "doc1",
      "text": "Paris is the capital of France."
    }
  ],
  "attribution": [
    {
      "sentence": "The capital of France is Paris",
      "source": "doc1",
      "score": 0.91
    }
  ],
  "confidence": 0.87,
  "warnings": []
}
```

---

## Project Structure

```
explainable-llm-pipeline/
│
├── backend/
│   ├── app/
│   |   ├── main.py              # FastAPI entrypoint
│   |   ├── pipeline.py          # LLM + prompt logic
│   |   ├── retrieval.py         # FAISS retrieval
│   |   ├── attribution.py       # Explainability mapping
│   |   ├── scoring.py           # Confidence + failure detection
│   |   ├── embeddings.py        # Embedding model interface
│   |   └── data.py              # Example knowledge base
│   ├── requirements.txt
│
├── docs/
│   ├── adr/                     # Architecture Decision Records
│   ├── diagrams/                # Diagrams and Flow-Charts
|
├── frontend/
│   ├── src/                     # React Code
|   ├── index.html               # Main frontend page
│   ├── public/                  # Static Files
│   ├── package.json             # Dependencies + Scripts
│   └── vite.config.js           # Build + Dev Server Config
│
├── README.md
```

---

## Installation

### Requirements
- Download and Install Node.js (https://nodejs.org/en/download)

### 1. Clone repository
```bash
git clone https://github.com/tomu1907/explainable-llm-pipeline
```

### 2. Install dependencies
```bash
cd explainable-llm-pipeline\backend
pip install -r requirements.txt
```

### 3. Set API key
```bash
export OPENAI_API_KEY=your_key
```

### 4. Run server (backend)
```bash
uvicorn app.main:app --reload
```

### 4. Run server (frontend)
```bash
cd ..
cd frontend
npm install

npm run dev
```

### 5. Open Frontend and start some queries
```bash
(Test backend: http://127.0.0.1:8000/ask?q=test)

http://localhost:5173/
```

#### Some exmaple questions you can ask:
```bash
What is the capital of Germany?
Which city is the capital of Germany?
Tell me about major cities in Germany
Is Munich the capital of Germany?
What is the main city of Germany?
```

---

## Key Design Principles

### 1. Separation of concerns
- Retrieval ≠ Generation ≠ Evaluation ≠ API layer

### 2. Observability by default
- Every answer is traceable to sources
- Every step is measurable

### 3. Debuggability over abstraction
- Intermediate states are exposed, not hidden

### 4. Minimal but extensible
- Small core system
- Designed for expansion (UI, evaluation, multi-model routing)

---

## Explainability Features

The system exposes:

- Source attribution per sentence
- Retrieval confidence signals
- System-level confidence score
- Failure warnings (hallucination heuristics)

---

## Limitations

- Confidence scoring is heuristic-based (not probabilistic calibration)
- Attribution uses embedding similarity (approximate)
- No fine-tuned grounding model
- No adversarial prompt injection defense yet

---

## Future Improvements

- Token-level attribution
- Multi-model comparison (GPT vs open-source models)
- Prompt injection detection layer
- Streaming explainability UI
- Evaluation benchmark suite
- LangSmith-style tracing system

---

## Why this project matters

Modern LLM systems are often:
- opaque
- hard to debug
- hard to evaluate

This project demonstrates how to move toward:

> **observable, explainable, and controllable AI systems**

---

## Target Use Cases

- AI agent debugging systems
- Enterprise RAG systems
- LLM evaluation pipelines
- AI architecture prototypes
- Research in LLM reliability

---

## License

MIT
