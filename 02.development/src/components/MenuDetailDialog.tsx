import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CheckIcon, ShoppingBasketIcon, UsersIcon, XIcon } from 'lucide-react';
import { Menu } from '../types/menu';

type MenuDetailDialogProps = {
  menu: Menu | null;
  cooked: boolean;
  onCooked: (menu: Menu) => void;
  onClose: () => void;
};

export function MenuDetailDialog({
  menu,
  cooked,
  onCooked,
  onClose
}: MenuDetailDialogProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menu) return;
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [menu, onClose]);

  const steps = menu ? menu.steps.split('\n').filter(Boolean) : [];

  return (
    <AnimatePresence>
      {menu &&
      <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
          <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
          onClick={onClose}
          className="absolute inset-0 bg-ink-900/40" />
        
          <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="menu-dialog-title"
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}
          className="relative max-h-[90vh] w-full overflow-y-auto rounded-t-4xl bg-cream-50 p-6 sm:m-6 sm:max-w-lg sm:rounded-4xl sm:p-8">
          
            <div className="flex items-start justify-between gap-4">
              <h2
              id="menu-dialog-title"
              className="text-2xl font-bold leading-snug tracking-tight text-ink-900">
              
                {menu.name}
              </h2>
              <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="閉じる"
              className="shrink-0 rounded-full p-2 text-ink-500 transition-colors duration-150 ease-out hover:bg-cream-100 hover:text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-carrot-500">
              
                <XIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-cream-100 px-3 py-1 text-sm font-medium text-ink-700">
              <UsersIcon className="h-4 w-4" aria-hidden="true" />
              {menu.amount}
            </p>

            <div className="mt-7 space-y-5">
              <h3 className="text-sm font-bold tracking-wide text-ink-500">材料</h3>

              <div>
                <p className="mb-2 text-[15px] font-bold text-ink-900">
                  持っている食材
                </p>
                <ul className="flex flex-wrap gap-2">
                  {menu.ingredients.have.map((item) =>
                <li
                  key={item}
                  className="rounded-full border border-cream-200 bg-white px-3 py-1.5 text-sm text-ink-700">
                  
                      {item}
                    </li>
                )}
                </ul>
              </div>

              <div>
                <p className="mb-2 text-[15px] font-bold text-ink-900">
                  買い足す食材
                </p>
                {menu.ingredients.needToBuy.length === 0 ?
              <p className="text-sm text-ink-500">
                    買い足すものはありません。
                  </p> :

              <ul className="flex flex-wrap gap-2">
                    {menu.ingredients.needToBuy.map((item) =>
                <li
                  key={item}
                  className="inline-flex items-center gap-1.5 rounded-full bg-carrot-500 px-3 py-1.5 text-sm font-bold text-white">
                  
                        <ShoppingBasketIcon
                    className="h-3.5 w-3.5"
                    aria-hidden="true" />
                  
                        {item}
                      </li>
                )}
                  </ul>
              }
              </div>
            </div>

            <div className="mt-7">
              <h3 className="mb-3 text-sm font-bold tracking-wide text-ink-500">
                作り方
              </h3>
              <ol className="space-y-3">
                {steps.map((step, index) =>
              <li key={step} className="flex gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-carrot-100 text-xs font-bold text-carrot-600">
                      {index + 1}
                    </span>
                    <span className="text-[15px] leading-relaxed text-ink-700">
                      {step}
                    </span>
                  </li>
              )}
              </ol>
            </div>

            <button
            type="button"
            onClick={() => onCooked(menu)}
            disabled={cooked}
            className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-leaf-500 px-6 py-4 text-lg font-bold text-white transition-[background-color,transform] duration-150 ease-out hover:bg-leaf-600 active:scale-[0.99] disabled:bg-leaf-100 disabled:text-leaf-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf-500 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-50">
            
              <CheckIcon className="h-5 w-5" aria-hidden="true" />
              {cooked ? '履歴に記録しました' : 'これを作った'}
            </button>
          </motion.div>
        </div>
      }
    </AnimatePresence>);

}