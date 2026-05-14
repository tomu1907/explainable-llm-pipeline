import faiss
import numpy as np

class Retriever:
    def __init__(self, docs, embed_fn):
        self.docs = docs
        self.embed_fn = embed_fn

        embeddings = [embed_fn(d.text) for d in docs]

        for i, d in enumerate(docs):
            d.embedding = embeddings[i]

        self.index = faiss.IndexFlatL2(len(embeddings[0]))
        self.index.add(np.array(embeddings).astype("float32"))

    def search(self, query: str, k=3):
        q_emb = self.embed_fn(query)

        D, I = self.index.search(
            np.array([q_emb]).astype("float32"), k
        )

        return [self.docs[i] for i in I[0]], D[0]
