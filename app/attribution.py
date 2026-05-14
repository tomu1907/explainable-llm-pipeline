import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

def attribute_answer(answer: str, chunks, embed_fn):
    sentences = [s.strip() for s in answer.split(".") if s.strip()]
    chunk_embeddings = np.array([c.embedding for c in chunks])

    results = []

    for sentence in sentences:
        emb = embed_fn(sentence)

        sims = cosine_similarity([emb], chunk_embeddings)[0]
        best_idx = sims.argmax()

        results.append({
            "sentence": sentence,
            "source": chunks[best_idx].id,
            "score": float(sims[best_idx])
        })

    return results
