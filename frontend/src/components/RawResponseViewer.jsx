export default function RawResponseViewer({ raw }) {
    if (!raw) return null;

    return (
        <div style={{ marginTop: 20 }}>
            <h3>Execution Trace (Debug)</h3>

            <h4>Query</h4>
            <pre>{raw.query}</pre>

            <h4>Prompt</h4>
            <pre style={{ background: "#111", color: "#0f0", padding: 10 }}>
                {raw.prompt}
            </pre>

            <h4>Model Output</h4>
            <pre>{raw.model_output}</pre>

            <h4>Retrieved Context</h4>
            {raw.retrieval_chunks?.map((c, i) => (
                <div
                    key={i}
                    style={{
                        marginBottom: 6,
                        padding: 6,
                        background: "#f5f5f5"
                    }}
                >
                    {c}
                </div>
            ))}
        </div>
    );
}