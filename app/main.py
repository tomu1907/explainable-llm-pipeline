from fastapi import FastAPI
from app.data import DOCS
from app.embeddings import embed
from app.retrieval import Retriever
from app.pipeline import build_prompt, generate_answer
from app.attribution import attribute_answer
from app.scoring import compute_confidence, detect_failures

app = FastAPI()

retriever = Retriever(DOCS, embed)


@app.get("/ask")
def ask(q: str):
    chunks, distances = retriever.search(q)

    prompt = build_prompt(q, chunks)
    answer = generate_answer(prompt)

    attributions = attribute_answer(answer, chunks, embed)
    confidence = compute_confidence(attributions, distances)
    warnings = detect_failures(attributions, confidence)

    return {
        "answer": answer,
        "sources": chunks,
        "attribution": attributions,
        "confidence": confidence,
        "warnings": warnings
    }
