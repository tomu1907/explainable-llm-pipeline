from dataclasses import dataclass

@dataclass
class DocumentChunk:
    id: str
    text: str
    embedding: list[float] | None = None


DOCS = [
    DocumentChunk("doc1", "Paris is the capital of France."),
    DocumentChunk("doc2", "Berlin is the capital of Germany."),
    DocumentChunk("doc3", "Madrid is the capital of Spain."),
]
