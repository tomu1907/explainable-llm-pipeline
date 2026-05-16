import { useState } from "react";

import AnswerWithAttribution from "./components/AnswerWithAttribution";
import SourcePanel from "./components/SourcePanel";
import PromptViewer from "./components/PromptViewer";
import RawResponseViewer from "./components/RawResponseViewer";
import ExecutionTimeline from "./components/ExecutionTimeline";

export default function App() {
  const [query, setQuery] = useState("What is the capital of Germany?");
  const [data, setData] = useState(null);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);

  const [debug, setDebug] = useState(true);

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
    } catch (e) {
      console.error(e);
    }

    setLoading(false);
  }

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "Arial" }}>

      {/* LEFT */}
      <div style={{ flex: 2, padding: 20, overflowY: "auto" }}>
        <h2>Explainable LLM Debug Dashboard</h2>

        {/* INPUT */}
        <div style={{ marginBottom: 20 }}>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && ask()}
            placeholder="Ask something..."
            style={{ width: "70%", padding: 10 }}
          />

          <button onClick={ask} style={{ padding: 10, marginLeft: 10 }}>
            Run
          </button>

          <button
            onClick={() => setDebug(!debug)}
            style={{ padding: 10, marginLeft: 10 }}
          >
            Debug: {debug ? "ON" : "OFF"}
          </button>
        </div>

        {loading && <p>Loading...</p>}

        {/* MAIN OUTPUT */}
        {data && (
          <>
            <AnswerWithAttribution
              answer={data.answer}
              attribution={data.attribution}
              onSelect={setSelected}
            />

            <PromptViewer
              prompt={data.trace.prompt}
              context={data.trace.retrieval_chunks}
            />

            {/* EXECUTION TIMELINE */}
            <ExecutionTimeline trace={data.trace} />

            {/* RAW DEBUG */}
            {debug && (
              <RawResponseViewer raw={data.trace} />
            )}
          </>
        )}
      </div>

      {/* RIGHT */}
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