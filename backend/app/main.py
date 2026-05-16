import time
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.data import DOCS
from app.embeddings import embed
from app.retrieval import Retriever
from app.pipeline import build_prompt, generate_answer
from app.attribution import attribute_answer
from app.scoring import compute_confidence, detect_failures

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

retriever = Retriever(DOCS, embed)


def to_py(x):
    try:
        return x.item()
    except Exception:
        return x


@app.get("/ask")
def ask(q: str):
    t0 = time.time()

    # 1. Retrieval
    t_retrieval = time.time()
    chunks, distances = retriever.search(q)
    retrieval_time = time.time() - t_retrieval

    distances = [float(to_py(d)) for d in distances]

    # 2. Prompt build
    t_prompt = time.time()
    prompt = build_prompt(q, chunks)
    prompt_time = time.time() - t_prompt

    # 3. LLM call
    t_llm = time.time()
    model_output = generate_answer(prompt)
    llm_time = time.time() - t_llm

    # 4. Attribution
    t_attr = time.time()
    attributions = attribute_answer(model_output, chunks, embed)
    attr_time = time.time() - t_attr

    for a in attributions:
        a["score"] = float(to_py(a["score"]))

        match = next((c for c in chunks if c.id == a["source"]), None)
        if match:
            a["source_text"] = match.text

    # 5. Metrics
    confidence = float(to_py(compute_confidence(attributions, distances)))
    warnings = detect_failures(attributions, confidence)

    # 6. TRACE (Execution Profiler)
    trace = {
        "query": q,

        "timings": {
            "retrieval_ms": round(retrieval_time * 1000, 2),
            "prompt_ms": round(prompt_time * 1000, 2),
            "llm_ms": round(llm_time * 1000, 2),
            "attribution_ms": round(attr_time * 1000, 2),
            "total_ms": round((time.time() - t0) * 1000, 2),
        },

        "retrieval_chunks": [c.text for c in chunks],
        "prompt": prompt,
        "model_output": model_output
    }

    # 7. RESPONSE
    return {
        "query": q,

        "answer": model_output,
        "raw_response": model_output,

        "trace": trace,

        "sources": [
            {"id": c.id, "text": c.text}
            for c in chunks
        ],

        "attribution": attributions,
        "confidence": confidence,
        "warnings": warnings,

        "context": [c.text for c in chunks]
    }