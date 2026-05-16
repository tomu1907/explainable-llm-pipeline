from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.data import DOCS
from app.embeddings import embed
from app.retrieval import Retriever
from app.pipeline import build_prompt, generate_answer
from app.attribution import attribute_answer
from app.scoring import compute_confidence, detect_failures

app = FastAPI()

# CORS für Frontend (Vite)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

retriever = Retriever(DOCS, embed)


def to_py(x):
    """Convert numpy types to native Python types"""
    try:
        return x.item()
    except Exception:
        return x


@app.get("/ask")
def ask(q: str):
    # 1. Retrieval
    chunks, distances = retriever.search(q)
    distances = [float(to_py(d)) for d in distances]

    # 2. Prompt construction
    prompt = build_prompt(q, chunks)

    # 3. LLM call
    model_output = generate_answer(prompt)

    # 4. Attribution
    attributions = attribute_answer(model_output, chunks, embed)

    for a in attributions:
        a["score"] = float(to_py(a["score"]))

        # optional enrichment: source text attach
        match = next((c for c in chunks if c.id == a["source"]), None)
        if match:
            a["source_text"] = match.text

    # 5. Confidence + warnings
    confidence = float(to_py(compute_confidence(attributions, distances)))
    warnings = detect_failures(attributions, confidence)

    # 6. TRACE (Debug / Explainability backbone)
    trace = {
        "query": q,
        "retrieval_chunks": [c.text for c in chunks],
        "prompt": prompt,
        "model_output": model_output
    }

    # 7. Response (JSON-safe, frontend-ready)
    return {
        "query": q,

        # main output
        "answer": model_output,
        "raw_response": model_output,

        # full debug trace
        "trace": trace,

        # retrieval layer
        "sources": [
            {"id": c.id, "text": c.text}
            for c in chunks
        ],

        # explainability layer
        "attribution": attributions,
        "confidence": confidence,
        "warnings": warnings,

        # UI helper
        "context": [c.text for c in chunks]
    }