import { useState } from "react";

import AnswerWithAttribution from "./components/AnswerWithAttribution";
import SourcePanel from "./components/SourcePanel";
import PromptViewer from "./components/PromptViewer";
import RawResponseViewer from "./components/RawResponseViewer";
import ExecutionTimeline from "./components/ExecutionTimeline";
import RetrievalInspector from "./components/RetrievalInspector";

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

    const res = await fetch(
      `http://127.0.0.1:8000/ask?q=${encodeURIComponent(query)}`
    );

    const json = await res.json();
    setData(json);

    setLoading(false);
  }

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "Arial" }}>

      <div style={{ flex: 2, padding: 20, overflowY: "auto" }}>
        <h2>Explainable LLM Debug System</h2>

        <div style={{ marginBottom: 20 }}>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && ask()}
            style={{ width: "70%", padding: 10 }}
          />

          <button onClick={ask} style={{ padding: 10, marginLeft: 10 }}>
            Run
          </button>

          <button
            onClick={() => setDebug(!debug)}
            style={{ padding: 10, marginLeft: 10 }}
          >
            Debug {debug ? "ON" : "OFF"}
          </button>
        </div>

        {loading && <p>Loading...</p>}

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

            <ExecutionTimeline trace={data.trace} />

            <RetrievalInspector trace={data.trace} />

            {debug && (
              <RawResponseViewer raw={data.trace} />
            )}
          </>
        )}
      </div>

      <div style={{ flex: 1, borderLeft: "1px solid #ddd" }}>
        <SourcePanel selected={selected} />
      </div>

    </div>
  );
}