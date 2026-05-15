export default function AnswerPanel({ answer }) {
  return (
    <div style={{ marginTop: 20 }}>
      <h3>Answer</h3>
      <div style={{ padding: 10, background: "#f5f5f5" }}>
        {answer}
      </div>
    </div>
  );
}
