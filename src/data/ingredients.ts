export const aiModels = ["Claude", "GPT", "Gemini"] as const;

export const modelIds: Record<(typeof aiModels)[number], string> = {
  GPT: "openai/gpt-5-mini",
  Gemini: "google/gemini-2.5-flash-lite",
  Claude: "anthropic/claude-haiku-4.5",
};
