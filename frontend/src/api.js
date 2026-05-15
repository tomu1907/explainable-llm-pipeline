export async function askLLM(query) {
  const res = await fetch(`http://127.0.0.1:8000/ask?q=${encodeURIComponent(query)}`);
  return await res.json();
}
