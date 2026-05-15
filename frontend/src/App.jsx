import { useState } from "react";
import { askLLM } from "./api";

import QueryBox from "./components/QueryBox";
import AnswerPanel from "./components/AnswerPanel";
import AttributionPanel from "./components/AttributionPanel";
import ConfidenceBar from "./components/ConfidenceBar";
import Warnings from "./components/Warnings";

export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleQuery(q) {
    setLoading(true);
    const res = await askLLM(q);
    setData(res);
    setLoading(false);
  }

  return (
    <div style={{ maxWidth: 900, margin: "40px auto", fontFamily: "Arial" }}>
      <h2>Explainable LLM Dashboard</h2>

      <QueryBox onSubmit={handleQuery} />

      {loading && <p>Processing...</p>}

      {data && (
        <>
          <ConfidenceBar value={data.confidence} />
          <Warnings warnings={data.warnings} />
          <AnswerPanel answer={data.answer} />
          <AttributionPanel attribution={data.attribution} sources={data.sources} />
        </>
      )}
    </div>
  );
}
