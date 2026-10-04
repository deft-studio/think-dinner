export const suggestSchema = {
  type: "object",
  properties: {
    menus: {
      type: "array",
      minItems: 6,
      maxItems: 6,
      items: {
        type: "object",
        properties: {
          name: { type: "string" },
          canMakeNow: { type: "boolean" },
          ingredients: {
            type: "object",
            properties: {
              have: { type: "array", items: { type: "string" } },
              needToBuy: { type: "array", items: { type: "string" } },
            },
            required: ["have", "needToBuy"],
            additionalProperties: false,
          },
          steps: { type: "string" },
        },
        required: ["name", "canMakeNow", "ingredients", "steps"],
        additionalProperties: false,
      },
    },
  },
  required: ["menus"],
  additionalProperties: false,
};

export function buildSuggestPrompt(
  have: string[],
  ng: string[],
  previous: string[],
) {
  return `あなたは家庭料理のメニュー提案アシスタントです。
以下の条件に従って、夕食のメニューを6品、JSON形式で提案してください。

【条件】
- 持っている食材：${have.join("、")}
- 苦手な食材（絶対に使わない）：${ng.join("、") || "なし"}
- 6品のうち3品は、持っている食材だけで作れるメニュー（canMakeNow: true, needToBuy: []）
- 残り3品は、持っている食材に加えて2〜3個買い足せば作れるメニュー（canMakeNow: false）
- 苦手な食材はhave・needToBuyのどちらにも絶対に含めない
- 次のメニューとは重複させない：${previous.join("、") || "なし"}`;
}
