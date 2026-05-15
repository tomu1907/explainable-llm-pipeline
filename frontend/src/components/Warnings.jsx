export default function Warnings({ warnings }) {
  if (!warnings || warnings.length === 0) return null;

  return (
    <div style={{ marginTop: 20 }}>
      <h3>Warnings</h3>
      <ul>
        {warnings.map((w, i) => (
          <li key={i} style={{ color: "red" }}>
            {w}
          </li>
        ))}
      </ul>
    </div>
  );
}
