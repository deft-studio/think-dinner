import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET() {
  const { data: insertedIngredientData, error: insertedIngredientError } =
    await supabase
      .from("ingredients")
      .insert({ name: "肉", type: "have" })
      .select();

  const { data: historyInsertData, error: historyInsertError } = await supabase
    .from("history")
    .insert({ date: "2026-09-16", menu_name: "カレー" })
    .select();

  const { data: ingredientData, error: ingredientError } = await supabase
    .from("ingredients")
    .select();

  const { data: historyData, error: historyError } = await supabase
    .from("history")
    .select();

  return NextResponse.json({
    insertedIngredientData,
    insertedIngredientError,
    historyInsertData,
    historyInsertError,
    ingredientData,
    ingredientError,
    historyData,
    historyError,
  });
}
