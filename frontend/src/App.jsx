import { useState } from "react";

import AnswerWithAttribution from "./components/AnswerWithAttribution";
import SourcePanel from "./components/SourcePanel";
import PromptViewer from "./components/PromptViewer";

export default function App() {
  const [query, setQuery] = useState("What is the capital of Germany?");
  const [data, setData] = useState(null);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);

  async function ask() {
    if (!query) return;

    setLoading(true);
    setSelected(null);

    try {
      const res = await fetch(
        `http://127.0.0.1:8000/ask?q=${encodeURIComponent(query)}`
      );

      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error("API error:", err);
    }

    setLoading(false);
  }

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "Arial" }}>
      
      {/* LEFT SIDE */}
      <div style={{ flex: 2, padding: 20, overflowY: "auto" }}>
        
        <h2>Explainable LLM Dashboard</h2>

        {/* INPUT */}
        <div style={{ marginBottom: 20 }}>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask something..."
            style={{
              width: "70%",
              padding: 10,
              fontSize: 14
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") ask();
            }}
          />

          <button
            onClick={ask}
            style={{
              padding: 10,
              marginLeft: 10,
              cursor: "pointer"
            }}
          >
            Run
          </button>
        </div>

        {loading && <p>Loading...</p>}

        {/* ANSWER + DEBUG */}
        {data && (
          <>
            <AnswerWithAttribution
              answer={data.answer}
              attribution={data.attribution}
              onSelect={setSelected}
            />

            <PromptViewer
              prompt={data.prompt}
              context={data.context}
            />
          </>
        )}

      </div>

      {/* RIGHT SIDE (SOURCE PANEL) */}
      <div
        style={{
          flex: 1,
          borderLeft: "1px solid #ddd",
          overflowY: "auto"
        }}
      >
        <SourcePanel selected={selected} />
      </div>

    </div>
  );
}