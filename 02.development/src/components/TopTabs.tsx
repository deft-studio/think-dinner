import React from 'react';

type TopTabsProps = {
  tabs: string[];
  active: string;
  onChange: (tab: string) => void;
};

export function TopTabs({ tabs, active, onChange }: TopTabsProps) {
  return (
    <div
      role="tablist"
      aria-label="画面の切り替え"
      className="flex w-full gap-1 rounded-full border border-cream-200 bg-white/80 p-1">
      
      {tabs.map((tab) => {
        const isActive = tab === active;
        return (
          <button
            key={tab}
            role="tab"
            type="button"
            aria-selected={isActive}
            onClick={() => onChange(tab)}
            className={[
            'flex-1 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-150 ease-out',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-carrot-500 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-50',
            isActive ?
            'bg-carrot-500 text-white' :
            'text-ink-500 hover:bg-cream-100 hover:text-ink-700'].
            join(' ')}>
            
            {tab}
          </button>);

      })}
    </div>);

}