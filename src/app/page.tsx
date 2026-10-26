"use client";

import { useEffect, useState } from "react";
import { RefreshCwIcon, RefrigeratorIcon } from "lucide-react";
import { TopTabs } from "../components/TopTabs";
import { IngredientSection } from "../components/IngredientSection";
import { SuggestSection } from "../components/SuggestSection";
import { aiModels } from "../data/ingredients";
import { Ingredient } from "../types/ingredient";
import { supabase } from "@/lib/supabase";
import { Menu } from "../types/menu";
import { MenuCard } from "../components/MenuCard";
import { MenuDetailDialog } from "../components/MenuDetailDialog";

const tabs = ["冷蔵庫", "結果", "履歴"];

export default function Fridge() {
  const [activeTab, setActiveTab] = useState("冷蔵庫");
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [disliked, setDisliked] = useState<Ingredient[]>([]);
  const [model, setModel] = useState<string>(aiModels[0]);
  const [suggestedMenus, setSuggestedMenus] = useState<Menu[]>([]);
  const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null);
  const [usedModel, setUsedModel] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  const suggestMenus = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/suggest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          have: ingredients.map((item) => item.name),
          ng: disliked.map((item) => item.name),
          model,
          previous: suggestedMenus.map((menu) => menu.name),
        }),
      });
      const data = await response.json();
      const menus = JSON.parse(data.choices[0].message.content);

      setSuggestedMenus(
        menus.menus.map((menu: Omit<Menu, "amount">) => ({
          ...menu,
          amount: "2人分",
        })),
      );
      setUsedModel(model);
    } finally {
      setIsLoading(false);
    }
  };
  const canMakeNowMenus = suggestedMenus.filter((menu) => menu.canMakeNow);
  const needToBuyMenus = suggestedMenus.filter((menu) => !menu.canMakeNow);

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

          {activeTab === "冷蔵庫" && (
            <div className="space-y-2 pt-2">
              <h1 className="text-3xl font-bold tracking-tight text-ink-900">
                冷蔵庫のなかみ
              </h1>
              <p className="text-[15px] leading-relaxed text-ink-700">
                いま家にある食材を登録しておくと、夕飯の献立を考えやすくなります。
              </p>
            </div>
          )}

          {activeTab === "結果" && (
            <div className="space-y-2 pt-2">
              <h1 className="text-3xl font-bold tracking-tight text-ink-900">
                今日の献立候補
              </h1>
              <p className="text-[15px] leading-relaxed text-ink-700">
                使用モデル：{usedModel}
              </p>
            </div>
          )}
        </header>

        <main className="mt-10 space-y-10">
          {activeTab === "冷蔵庫" && (
            <>
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
                onSuggest={() => {
                  setActiveTab("結果");
                  suggestMenus();
                }}
                disabled={ingredients.length === 0}
              />
            </>
          )}

          {activeTab === "結果" && isLoading && (
            <p className="text-[15px] text-ink-700">
              献立を考えています…（10秒ほどかかります）
            </p>
          )}

          {activeTab === "結果" && !isLoading && (
            <>
              <section className="space-y-4">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold tracking-tight text-ink-900">
                    今の食材で作れる
                  </h2>
                  <span className="rounded-full bg-carrot-100 px-2.5 py-0.5 text-xs font-medium text-carrot-600">
                    {canMakeNowMenus.length}品目
                  </span>
                </div>
                <div className="grid gap-3 rounded-[28px] bg-carrot-50 p-4 sm:grid-cols-3">
                  {canMakeNowMenus.map((menu) => (
                    <MenuCard
                      key={menu.name}
                      menu={menu}
                      accent="carrot"
                      onOpen={setSelectedMenu}
                    />
                  ))}
                </div>
              </section>

              <hr className="border-cream-200" />

              <section className="space-y-4">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold tracking-tight text-ink-900">
                    買い足せば作れる
                  </h2>
                  <span className="rounded-full bg-mocha-100 px-2.5 py-0.5 text-xs font-medium text-mocha-600">
                    {needToBuyMenus.length}品目
                  </span>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  {needToBuyMenus.map((menu) => (
                    <MenuCard
                      key={menu.name}
                      menu={menu}
                      accent="mocha"
                      onOpen={setSelectedMenu}
                    />
                  ))}
                </div>
              </section>

              <hr className="border-cream-200" />

              <button
                type="button"
                onClick={suggestMenus}
                className="inline-flex items-center gap-2 rounded-2xl border border-cream-200 bg-white px-6 py-4 font-bold text-ink-700 transition-colors duration-150 ease-out hover:bg-cream-100"
              >
                <RefreshCwIcon className="h-5 w-5" aria-hidden="true" />
                もう一度提案する
              </button>
            </>
          )}
        </main>
        <MenuDetailDialog
          menu={selectedMenu}
          cooked={false}
          onCooked={() => {}}
          onClose={() => setSelectedMenu(null)}
        />
      </div>
    </div>
  );
}
