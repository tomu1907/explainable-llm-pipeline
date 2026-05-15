export default function AnswerWithAttribution({ answer, attribution }) {
  if (!answer || !attribution) return null;

  const sentences = answer
    .split(".")
    .map(s => s.trim())
    .filter(Boolean);

  function getAttr(sentence) {
    return attribution.find(a =>
      a.sentence.trim().startsWith(sentence.slice(0, 10))
    );
  }

  function getColor(score) {
    if (score > 0.75) return "#c8f7c5";   // green
    if (score > 0.5) return "#fff3cd";    // yellow
    return "#f8d7da";                     // red
  }

  return (
    <div style={{ marginTop: 20 }}>
      <h3>Answer (Explainable)</h3>

      <div style={{ lineHeight: "1.6" }}>
        {sentences.map((s, i) => {
          const attr = getAttr(s);

          if (!attr) return <span key={i}>{s}. </span>;

          return (
            <span
              key={i}
              title={`Source: ${attr.source} | Score: ${attr.score.toFixed(2)}`}
              style={{
                background: getColor(attr.score),
                padding: "2px 4px",
                marginRight: 4,
                borderRadius: 4
              }}
            >
              {s}.
            </span>
          );
        })}
      </div>
    </div>
  );
}