from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.data import DOCS
from app.embeddings import embed
from app.retrieval import Retriever
from app.pipeline import build_prompt, generate_answer
from app.attribution import attribute_answer
from app.scoring import compute_confidence, detect_failures

app = FastAPI()

# --- CORS (für React Frontend) ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Init Retriever ---
retriever = Retriever(DOCS, embed)


def to_py(x):
    """Convert numpy types to native Python types."""
    try:
        return x.item()
    except Exception:
        return x


@app.get("/ask")
def ask(q: str):
    # --- Retrieval ---
    chunks, distances = retriever.search(q)

    # Convert numpy distances
    distances = [float(to_py(d)) for d in distances]

    # --- Prompt ---
    prompt = build_prompt(q, chunks)

    # --- LLM ---
    answer = generate_answer(prompt)

    # --- Attribution ---
    attributions = attribute_answer(answer, chunks, embed)

    # ensure python floats
    for a in attributions:
        a["score"] = float(to_py(a["score"]))

        # OPTIONAL: enrich with source text (recommended)
        match = next((c for c in chunks if c.id == a["source"]), None)
        if match:
            a["source_text"] = match.text

    # --- Confidence ---
    confidence = float(to_py(compute_confidence(attributions, distances)))

    # --- Failure detection ---
    warnings = detect_failures(attributions, confidence)

    # --- Response ---
    return {
        "query": q,
        "answer": answer,

        "sources": [
            {"id": c.id, "text": c.text}
            for c in chunks
        ],

        "attribution": attributions,
        "confidence": confidence,
        "warnings": warnings,

        "prompt": prompt,
        "context": [c.text for c in chunks]
    }