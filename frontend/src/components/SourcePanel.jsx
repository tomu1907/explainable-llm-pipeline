export default function SourcePanel({ selected }) {
  if (!selected) {
    return (
      <div style={{ padding: 20 }}>
        <h3>Source Panel</h3>
        <p>Click a sentence to inspect source</p>
      </div>
    );
  }

  return (
    <div style={{ padding: 20, borderLeft: "1px solid #ddd" }}>
      <h3>Source Detail</h3>

      <p><b>Sentence:</b></p>
      <p>{selected.sentence}</p>

      <p><b>Source:</b> {selected.source}</p>

      <p><b>Confidence:</b> {selected.score.toFixed(2)}</p>

      <div
        style={{
          marginTop: 10,
          padding: 10,
          background: "#f5f5f5"
        }}
      >
        <b>Interpretation</b>
        <p>
          This sentence is grounded in retrieved context with
          similarity score {selected.score.toFixed(2)}.
        </p>
      </div>
    </div>
  );
}