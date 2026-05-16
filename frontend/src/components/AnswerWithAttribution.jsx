export default function AnswerWithAttribution({
  answer,
  attribution,
  onSelect
}) {
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

  function color(score) {
    if (score > 0.75) return "#c8f7c5";
    if (score > 0.5) return "#fff3cd";
    return "#f8d7da";
  }

  return (
    <div>
      <h3>Answer</h3>

      <div style={{ lineHeight: "1.7" }}>
        {sentences.map((s, i) => {
          const attr = getAttr(s);

          if (!attr) {
            return <span key={i}>{s}. </span>;
          }

          return (
            <span
              key={i}
              onClick={() => onSelect(attr)}
              style={{
                background: color(attr.score),
                cursor: "pointer",
                padding: "2px 4px",
                borderRadius: 4,
                marginRight: 4
              }}
              title="Click for source"
            >
              {s}.
            </span>
          );
        })}
      </div>
    </div>
  );
}