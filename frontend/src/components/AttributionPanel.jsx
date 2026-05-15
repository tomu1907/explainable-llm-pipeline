export default function AttributionPanel({ attribution, sources }) {
  return (
    <div style={{ marginTop: 20 }}>
      <h3>Attribution</h3>

      {attribution.map((a, i) => (
        <div
          key={i}
          style={{
            padding: 10,
            marginBottom: 10,
            border: "1px solid #ccc"
          }}
        >
          <p><b>Sentence:</b> {a.sentence}</p>
          <p><b>Source:</b> {a.source}</p>

          <div style={{ width: "100%", background: "#eee", height: 10 }}>
            <div
              style={{
                width: `${Math.round(a.score * 100)}%`,
                height: "100%",
                background: a.score > 0.7 ? "green" : "orange"
              }}
            />
          </div>
        </div>
      ))}

      <h4>Sources</h4>
      <ul>
        {sources.map((s) => (
          <li key={s.id}>
            <b>{s.id}</b>: {s.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
