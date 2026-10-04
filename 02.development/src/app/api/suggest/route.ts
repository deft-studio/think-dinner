import { modelIds } from "@/data/ingredients";
import { buildSuggestPrompt, suggestSchema } from "@/data/suggest-prompts";

export async function POST(request: Request) {
  const { have, ng, model, previous } = (await request.json()) as {
    have: string[];
    ng: string[];
    model: keyof typeof modelIds;
    previous: string[];
  };

  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: modelIds[model],
        messages: [
          { role: "user", content: buildSuggestPrompt(have, ng, previous) },
        ],
        response_format: {
          type: "json_schema",
          json_schema: {
            name: "suggest_menus",
            strict: true,
            schema: suggestSchema,
          },
        },

        max_tokens: 4000,
      }),
    },
  );
  const data = await response.json();
  return Response.json(data);
}
