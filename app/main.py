from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.data import DOCS
from app.embeddings import embed
from app.retrieval import Retriever
from app.pipeline import build_prompt, generate_answer
from app.attribution import attribute_answer
from app.scoring import compute_confidence, detect_failures

app = FastAPI(title="Explainable LLM Pipeline")


# ----------------------------
# CORS (Frontend integration)
# ----------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ----------------------------
# Helper: JSON-safe conversion
# ----------------------------
def to_py(x):
    """
    Ensures compatibility between numpy / faiss types and JSON serialization.
    """
    try:
        return x.item()
    except Exception:
        return x


# ----------------------------
# Initialize Retriever (once)
# ----------------------------
retriever = Retriever(DOCS, embed)


# ----------------------------
# Main Endpoint
# ----------------------------
@app.get("/ask")
def ask(q: str):
    """
    End-to-end Explainable LLM pipeline:
    Retrieval → Generation → Attribution → Scoring
    """

    # 1. Retrieval
    chunks, distances = retriever.search(q)
    distances = [float(to_py(d)) for d in distances]

    # 2. Prompt construction
    prompt = build_prompt(q, chunks)

    # 3. LLM generation
    answer = generate_answer(prompt)

    # 4. Attribution (sentence → source mapping)
    attributions = attribute_answer(answer, chunks, embed)

    # sanitize attribution scores
    for a in attributions:
        a["score"] = float(to_py(a["score"]))

    # 5. Confidence scoring
    confidence = compute_confidence(attributions, distances)
    confidence = float(to_py(confidence))

    # 6. Failure detection
    warnings = detect_failures(attributions, confidence)

    # 7. Response (API boundary = JSON-safe only)
    return {
        "query": q,
        "answer": answer,
        "sources": [
            {
                "id": c.id,
                "text": c.text
            }
            for c in chunks
        ],
        "attribution": [
            {
                "sentence": a["sentence"],
                "source": a["source"],
                "score": a["score"]
            }
            for a in attributions
        ],
        "confidence": confidence,
        "warnings": warnings
    }
