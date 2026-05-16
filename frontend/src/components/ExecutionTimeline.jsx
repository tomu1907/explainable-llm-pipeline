export default function ExecutionTimeline({ trace }) {
    if (!trace?.timings) return null;

    const t = trace.timings;

    return (
        <div style={{ marginTop: 20 }}>
            <h3>Execution Timeline</h3>

            <div style={{ fontFamily: "monospace" }}>
                <p>Retrieval: {t.retrieval_ms} ms</p>
                <p>Prompt Build: {t.prompt_ms} ms</p>
                <p>LLM Call: {t.llm_ms} ms</p>
                <p>Attribution: {t.attribution_ms} ms</p>
                <p><b>Total: {t.total_ms} ms</b></p>
            </div>

            <h4 style={{ marginTop: 10 }}>Pipeline Flow</h4>

            <div style={{ display: "flex", gap: 10 }}>
                <Step label="Retrieval" ms={t.retrieval_ms} />
                <Step label="Prompt" ms={t.prompt_ms} />
                <Step label="LLM" ms={t.llm_ms} />
                <Step label="Attr" ms={t.attribution_ms} />
            </div>
        </div>
    );
}

function Step({ label, ms }) {
    return (
        <div style={{
            padding: 8,
            border: "1px solid #ccc",
            borderRadius: 6,
            minWidth: 80,
            textAlign: "center"
        }}>
            <div>{label}</div>
            <div style={{ fontSize: 12 }}>{ms}ms</div>
        </div>
    );
}