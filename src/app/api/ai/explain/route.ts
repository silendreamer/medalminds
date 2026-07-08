import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const GROQ_MODEL = process.env.GROQ_MODEL ?? "llama-3.3-70b-versatile";

export async function POST(request: NextRequest) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "AI explanations are not configured." }, { status: 501 });
  }

  const body = await request.json().catch(() => null);
  const prompt = typeof body?.prompt === "string" ? body.prompt.trim() : "";
  const correctAnswer = typeof body?.correctAnswer === "string" ? body.correctAnswer.trim() : "";
  const choices = Array.isArray(body?.choices) ? body.choices.filter((c: unknown) => typeof c === "string") : undefined;

  if (!prompt || !correctAnswer) {
    return NextResponse.json({ error: "prompt and correctAnswer are required" }, { status: 400 });
  }

  const question = choices?.length
    ? `${prompt}\nChoices: ${choices.join(", ")}`
    : prompt;

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      messages: [
        {
          role: "system",
          content:
            "You tutor middle and high school students preparing for academic competitions " +
            "(Science Bowl, Science Olympiad, Math Olympiad). Given a question and its correct answer, " +
            "break down how to solve it into 2-5 short steps. Each step should be one clear sentence. " +
            "Do not restate the question; go straight into the reasoning. " +
            'Respond with strict JSON only, in the form {"steps": ["step 1", "step 2", ...]}.',
        },
        {
          role: "user",
          content: `Question: ${question}\nCorrect answer: ${correctAnswer}\n\nExplain how to solve this.`,
        },
      ],
      temperature: 0.3,
      max_tokens: 400,
      response_format: { type: "json_object" },
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    return NextResponse.json({ error: "AI explanation request failed", detail }, { status: 502 });
  }

  const data = await response.json();
  const raw: string | undefined = data?.choices?.[0]?.message?.content?.trim();
  if (!raw) {
    return NextResponse.json({ error: "AI returned no explanation" }, { status: 502 });
  }

  let steps: string[] | undefined;
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed?.steps)) {
      steps = parsed.steps.filter((s: unknown) => typeof s === "string" && s.trim()).map((s: string) => s.trim());
    }
  } catch {
    // fall through to plain-text fallback below
  }

  if (!steps?.length) {
    return NextResponse.json({ steps: [raw] });
  }

  return NextResponse.json({ steps });
}
