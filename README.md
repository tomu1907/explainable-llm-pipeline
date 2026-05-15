# Explainable LLM Pipeline

A minimal but extensible system for building **transparent, explainable, and debuggable LLM applications** using Retrieval-Augmented Generation (RAG), attribution, and confidence scoring.

The goal of this project is to make LLM outputs:
- traceable
- grounded in sources
- measurable in confidence
- debuggable in production-like settings

---

## Architecture Overview

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

### 1. Retrieval-Augmented Generation (RAG)
- Embedding-based document retrieval
- FAISS vector search
- Context injection into prompts

### 2. Explainability Layer
- Sentence-level attribution
- Source grounding of each answer segment
- Traceability from output → source documents

### 3. Confidence Scoring
- Heuristic-based reliability scoring
- Retrieval strength signals
- Attribution consistency scoring

### 4. Failure Detection
- Hallucination heuristics
- Low-confidence detection
- Missing grounding detection

---

## System Architecture

```
User Query
   ↓
Retriever (FAISS)
   ↓
Context Builder
   ↓
LLM Generation
   ↓
Attribution Layer
   ↓
Confidence Scoring
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
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── README.md
```

---

## Installation

### 1. Clone repository
```bash
git clone https://github.com/tomu1907/explainable-llm-pipeline
cd explainable-llm-pipeline
```

### 2. Install dependencies
```bash
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
npm run dev
```

### API Call in Frontend
```bash
fetch("/ask?q=...")
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
