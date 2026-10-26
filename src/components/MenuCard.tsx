import React from 'react';
import { ChevronRightIcon } from 'lucide-react';
import { Menu } from '../types/menu';

type MenuCardProps = {
  menu: Menu;
  accent: 'carrot' | 'mocha';
  onOpen: (menu: Menu) => void;
};

const accentStyles = {
  carrot: {
    card: 'border-carrot-100 bg-white hover:border-carrot-300',
    chevron: 'text-carrot-500',
    ring: 'focus-visible:ring-carrot-500'
  },
  mocha: {
    card: 'border-mocha-100 bg-white hover:border-mocha-300',
    chevron: 'text-mocha-500',
    ring: 'focus-visible:ring-mocha-500'
  }
};

export function MenuCard({ menu, accent, onOpen }: MenuCardProps) {
  const styles = accentStyles[accent];

  return (
    <button
      type="button"
      onClick={() => onOpen(menu)}
      className={`group flex h-full w-full items-center justify-between gap-3 rounded-3xl border px-5 py-5 text-left transition-[border-color,transform] duration-150 ease-out active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-50 ${styles.card} ${styles.ring}`}>
      
      <span className="text-[17px] font-bold leading-snug text-ink-900">
        {menu.name}
      </span>
      <ChevronRightIcon
        className={`h-5 w-5 shrink-0 ${styles.chevron}`}
        aria-hidden="true" />
      
    </button>);

}