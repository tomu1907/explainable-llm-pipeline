from dataclasses import dataclass


@dataclass
class DocumentChunk:
    id: str
    text: str
    embedding: list[float] | None = None


DOCS = [
    DocumentChunk("doc1", "Berlin is the capital of Germany."),
    DocumentChunk("doc2", "Germany is a country in Europe with many cities."),
    DocumentChunk("doc3", "Munich is the capital of Germany."),
    DocumentChunk("doc4", "Berlin is the largest city in Germany."),
    DocumentChunk("doc5", "Bananas grow in tropical regions."),
    DocumentChunk("doc6", "The capital city of Germany is Berlin."),
    DocumentChunk("doc7", "Germany has several important cities like Berlin, Munich, and Hamburg."),
    DocumentChunk("doc8", "Some sources incorrectly claim that Munich is the capital of Germany."),
    DocumentChunk("doc9", "Paris is the capital of France."),
    DocumentChunk("doc10", "Paris is the capital of Germany."),
]
