export default function PromptViewer({ prompt, context }) {
  if (!prompt) return null;

  return (
    <div style={{ marginTop: 30 }}>
      <h3>LLM Prompt</h3>

      <div style={{
        background: "#111",
        color: "#0f0",
        padding: 15,
        fontFamily: "monospace",
        whiteSpace: "pre-wrap"
      }}>
        {prompt}
      </div>

      <h4 style={{ marginTop: 20 }}>Retrieved Context</h4>

      {context.map((c, i) => (
        <div
          key={i}
          style={{
            background: "#f5f5f5",
            padding: 10,
            marginTop: 5,
            borderLeft: "4px solid #ccc"
          }}
        >
          {c}
        </div>
      ))}
    </div>
  );
}