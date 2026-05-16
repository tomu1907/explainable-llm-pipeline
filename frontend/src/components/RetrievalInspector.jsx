export default function RetrievalInspector({ trace }) {
    if (!trace) return null;

    const sims = trace.normalized_similarities || [];
    const risk = trace.hallucination_risk ?? 0;

    return (
        <div style={{ marginTop: 20 }}>
            <h3>Retrieval Analysis</h3>

            <h4>Hallucination Risk</h4>
            <div
                style={{
                    padding: 10,
                    background:
                        risk > 0.7 ? "#ffcccc" :
                            risk > 0.4 ? "#fff3cd" :
                                "#d4edda",
                    borderRadius: 6
                }}
            >
                {(risk * 100).toFixed(1)}%
            </div>

            <h4 style={{ marginTop: 10 }}>Similarity Distribution</h4>

            <div style={{ display: "flex", gap: 6, alignItems: "flex-end", height: 80 }}>
                {sims.map((s, i) => (
                    <div
                        key={i}
                        style={{
                            width: 20,
                            height: `${s * 80}px`,
                            background: "#4a90e2"
                        }}
                        title={`score: ${s.toFixed(2)}`}
                    />
                ))}
            </div>

            <h4 style={{ marginTop: 10 }}>Top-K</h4>

            {trace.top_k?.map((item, i) => (
                <div
                    key={i}
                    style={{
                        padding: 6,
                        marginTop: 4,
                        borderLeft: "3px solid #ccc",
                        background: "#f7f7f7"
                    }}
                >
                    <b>{item.score.toFixed(2)}</b> — {item.text}
                </div>
            ))}
        </div>
    );
}