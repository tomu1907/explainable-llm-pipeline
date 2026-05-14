from openai import OpenAI

client = OpenAI()

def build_prompt(query, chunks):
    context = "\n".join([c.text for c in chunks])

    return f"""
Answer ONLY using the context below.

Context:
{context}

Question:
{query}
"""

def generate_answer(prompt):
    res = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
    )
    return res.choices[0].message.content
