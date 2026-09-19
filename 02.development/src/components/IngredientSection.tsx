import React, { useId, useState } from "react";
import { PlusIcon, XIcon } from "lucide-react";
import { Ingredient } from "../types/ingredient";

type Accent = "carrot" | "leaf";

type IngredientSectionProps = {
  title: string;
  subtitle?: string;
  accent: Accent;
  items: Ingredient[];
  placeholder: string;
  columns: 1 | 2;
  emptyLabel: string;
  onAdd: (name: string) => void;
  onRemove: (id: number) => void;
};

const accentStyles: Record<
  Accent,
  {
    badge: string;
    button: string;
    ring: string;
    card: string;
    remove: string;
    dot: string;
  }
> = {
  carrot: {
    badge: "bg-carrot-100 text-carrot-600",
    button: "bg-carrot-500 hover:bg-carrot-600 text-white",
    ring: "focus:border-carrot-300 focus:ring-carrot-300",
    card: "border-carrot-100 bg-carrot-50",
    remove: "text-carrot-600 hover:bg-carrot-100",
    dot: "bg-carrot-300",
  },
  leaf: {
    badge: "bg-leaf-100 text-leaf-600",
    button: "bg-leaf-500 hover:bg-leaf-600 text-white",
    ring: "focus:border-leaf-300 focus:ring-leaf-300",
    card: "border-leaf-100 bg-leaf-50",
    remove: "text-leaf-600 hover:bg-leaf-100",
    dot: "bg-leaf-300",
  },
};

export function IngredientSection({
  title,
  subtitle,
  accent,
  items,
  placeholder,
  columns,
  emptyLabel,
  onAdd,
  onRemove,
}: IngredientSectionProps) {
  const [value, setValue] = useState("");
  const inputId = useId();
  const styles = accentStyles[accent];

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const name = value.trim();
    if (!name) return;
    onAdd(name);
    setValue("");
  };

  return (
    <section aria-labelledby={`${inputId}-heading`} className="space-y-4">
      <div className="flex items-center gap-3">
        <h2
          id={`${inputId}-heading`}
          className="text-xl font-bold tracking-tight text-ink-900"
        >
          {title}
        </h2>
        <span
          className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${styles.badge}`}
        >
          {items.length}品目
        </span>
      </div>

      {subtitle && (
        <p className="text-sm leading-relaxed text-ink-500">{subtitle}</p>
      )}

      <form onSubmit={submit} className="flex gap-2">
        <label htmlFor={inputId} className="sr-only">
          {title}を追加
        </label>
        <input
          id={inputId}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder={placeholder}
          className={`min-w-0 flex-1 rounded-2xl border border-cream-200 bg-white px-4 py-3 text-base text-ink-900 placeholder:text-ink-500/60 transition-colors duration-150 ease-out focus:outline-none focus:ring-2 ${styles.ring}`}
        />

        <button
          type="submit"
          className={`shrink-0 inline-flex items-center gap-1 rounded-2xl px-4 py-3 text-sm font-bold transition-colors duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-50 ${styles.button}`}
        >
          <PlusIcon className="h-4 w-4" aria-hidden="true" />
          追加
        </button>
      </form>

      {items.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-cream-200 px-4 py-6 text-center text-sm text-ink-500">
          {emptyLabel}
        </p>
      ) : (
        <ul
          className={`grid gap-2.5 ${columns === 2 ? "grid-cols-2" : "grid-cols-1"}`}
        >
          {items.map((item) => (
            <li
              key={item.id}
              className={`flex items-center justify-between gap-2 rounded-2xl border px-3.5 py-3 ${styles.card}`}
            >
              <span className="flex min-w-0 items-center gap-2">
                <span
                  className={`h-1.5 w-1.5 shrink-0 rounded-full ${styles.dot}`}
                  aria-hidden="true"
                />

                <span className="truncate text-[15px] font-medium text-ink-900">
                  {item.name}
                </span>
              </span>
              <button
                type="button"
                onClick={() => onRemove(item.id)}
                aria-label={`${item.name}を削除`}
                className={`shrink-0 rounded-full p-1.5 transition-colors duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 ${styles.remove}`}
              >
                <XIcon className="h-4 w-4" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
