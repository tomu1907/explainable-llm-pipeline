import { useState } from "react";

export default function QueryBox({ onSubmit }) {
  const [q, setQ] = useState("");

  return (
    <div style={{ marginBottom: 20 }}>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Ask something..."
        style={{ width: "70%", padding: 10 }}
      />
      <button
        onClick={() => onSubmit(q)}
        style={{ padding: 10, marginLeft: 10 }}
      >
        Run
      </button>
    </div>
  );
}
