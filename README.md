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

User Query --> Retriever (FAISS) --> Context Builder --> LLM Generation --> Attribution Layer --> Confidence Scoring --> Response + Debug Metadata

---

## API

### `GET /ask`

Query the system.

#### Request

/ask?q=What is the capital of France?

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
