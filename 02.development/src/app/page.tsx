"use client";

import { useEffect, useState } from "react";
import { RefrigeratorIcon } from "lucide-react";
import { TopTabs } from "../components/TopTabs";
import { IngredientSection } from "../components/IngredientSection";
import { SuggestSection } from "../components/SuggestSection";
import { aiModels } from "../data/ingredients";
import { Ingredient } from "../types/ingredient";
import { supabase } from "@/lib/supabase";

const tabs = ["冷蔵庫", "結果", "履歴"];

export default function Fridge() {
  const [activeTab, setActiveTab] = useState("冷蔵庫");
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [disliked, setDisliked] = useState<Ingredient[]>([]);
  const [model, setModel] = useState<string>(aiModels[0]);

  useEffect(() => {
    supabase
      .from("ingredients")
      .select()
      .then(({ data }) => {
        if (!data) return;
        setIngredients(data.filter((item) => item.type === "have"));
        setDisliked(data.filter((item) => item.type === "ng"));
      });
  }, []);

  const addIngredient = async (name: string, type: "have" | "ng") => {
    const { data } = await supabase
      .from("ingredients")
      .insert({ name, type })
      .select();

    if (!data) return;

    if (type === "have") {
      setIngredients((prev) => [...prev, data[0]]);
    } else {
      setDisliked((prev) => [...prev, data[0]]);
    }
  };

  const removeIngredient = async (id: number, type: "have" | "ng") => {
    await supabase.from("ingredients").delete().eq("id", id);

    if (type === "have") {
      setIngredients((prev) => prev.filter((item) => item.id !== id));
    } else {
      setDisliked((prev) => prev.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="min-h-full w-full bg-cream-50">
      <div className="mx-auto w-full max-w-xl px-5 pb-16 pt-6 sm:px-8">
        <header className="space-y-6">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-carrot-100 text-carrot-600">
              <RefrigeratorIcon className="h-4 w-4" aria-hidden="true" />
            </span>
            <p className="text-sm font-bold tracking-wide text-carrot-600">
              think-dinner
            </p>
          </div>

          <TopTabs tabs={tabs} active={activeTab} onChange={setActiveTab} />

          <div className="space-y-2 pt-2">
            <h1 className="text-3xl font-bold tracking-tight text-ink-900">
              冷蔵庫のなかみ
            </h1>
            <p className="text-[15px] leading-relaxed text-ink-700">
              いま家にある食材を登録しておくと、夕飯の献立を考えやすくなります。
            </p>
          </div>
        </header>

        <main className="mt-10 space-y-10">
          <IngredientSection
            title="ある食材"
            accent="carrot"
            items={ingredients}
            placeholder="例：キャベツ"
            columns={2}
            emptyLabel="まだ食材がありません。上の入力欄から追加してください。"
            onAdd={(name) => addIngredient(name, "have")}
            onRemove={(id) => removeIngredient(id, "have")}
          />

          <hr className="border-cream-200" />

          <IngredientSection
            title="苦手な食材"
            subtitle="献立の提案から外したい食材を登録できます。"
            accent="leaf"
            items={disliked}
            placeholder="例：パプリカ"
            columns={1}
            emptyLabel="苦手な食材はまだ登録されていません。"
            onAdd={(name) => addIngredient(name, "ng")}
            onRemove={(id) => removeIngredient(id, "ng")}
          />

          <hr className="border-cream-200" />

          <SuggestSection
            models={aiModels}
            model={model}
            onModelChange={setModel}
            onSuggest={() => setActiveTab("結果")}
            disabled={ingredients.length === 0}
          />
        </main>
      </div>
    </div>
  );
}
