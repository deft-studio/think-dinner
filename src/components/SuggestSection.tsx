import React, { useId } from 'react';
import { ChevronDownIcon, UtensilsCrossedIcon } from 'lucide-react';

type SuggestSectionProps = {
  models: readonly string[];
  model: string;
  onModelChange: (model: string) => void;
  onSuggest: () => void;
  disabled: boolean;
};

export function SuggestSection({
  models,
  model,
  onModelChange,
  onSuggest,
  disabled
}: SuggestSectionProps) {
  const selectId = useId();

  return (
    <section aria-labelledby={`${selectId}-heading`} className="space-y-4">
      <h2
        id={`${selectId}-heading`}
        className="text-xl font-bold tracking-tight text-ink-900">
        
        献立を提案してもらう
      </h2>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="sm:w-48">
          <label
            htmlFor={selectId}
            className="mb-1.5 block text-sm font-medium text-ink-700">
            
            使うAIモデル
          </label>
          <div className="relative">
            <select
              id={selectId}
              value={model}
              onChange={(event) => onModelChange(event.target.value)}
              className="w-full appearance-none rounded-2xl border border-cream-200 bg-white px-4 py-3 pr-10 text-base text-ink-900 transition-colors duration-150 ease-out focus:border-carrot-300 focus:outline-none focus:ring-2 focus:ring-carrot-300">
              
              {models.map((item) =>
              <option key={item} value={item}>
                  {item}
                </option>
              )}
            </select>
            <ChevronDownIcon
              className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-500"
              aria-hidden="true" />
            
          </div>
        </div>

        <button
          type="button"
          onClick={onSuggest}
          disabled={disabled}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-carrot-500 px-6 py-4 text-lg font-bold text-white shadow-sm transition-[background-color,transform] duration-150 ease-out hover:bg-carrot-600 active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-cream-200 disabled:text-ink-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-carrot-500 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-50">
          
          <UtensilsCrossedIcon className="h-5 w-5" aria-hidden="true" />
          提案する
        </button>
      </div>

      {disabled &&
      <p className="text-sm text-ink-500">
          まずは「ある食材」を1つ以上登録してください。
        </p>
      }
    </section>);

}