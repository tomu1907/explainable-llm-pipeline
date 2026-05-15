export default function ConfidenceBar({ value }) {
  const percent = Math.round(value * 100);

  return (
    <div style={{ marginTop: 20 }}>
      <h3>Confidence</h3>

      <div style={{ width: "100%", background: "#ddd", height: 20 }}>
        <div
          style={{
            width: `${percent}%`,
            height: "100%",
            background: percent > 70 ? "green" : percent > 40 ? "orange" : "red"
          }}
        />
      </div>

      <p>{percent}%</p>
    </div>
  );
}
