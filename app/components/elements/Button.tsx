import type { ButtonHTMLAttributes, ReactNode } from 'react';

import { tv } from 'tailwind-variants';

const button = tv({
  base: [
    'px-5 py-2',
    'bg-zinc-300',
    'text-base font-medium',
    'rounded-lg',
    'border border-solid border-transparent transition-[border-color]',
    'cursor-pointer',
    'hover:border-blue-500',
    'focus:outline-4 focus-visible:outline-4',
    'dark:bg-black dark:text-white',
  ],
  variants: {
    disabled: {
      true: [
        'cursor-not-allowed bg-zinc-200 text-zinc-400',
        'hover:border-transparent',
        'dark:bg-zinc-700 dark:text-zinc-400',
      ],
    },
  },
});
export type ButtonPropsType = {
  className?: string;
  disabled?: boolean;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;
export default function Button({ className, disabled, children, ...param }: ButtonPropsType) {
  return (
    <button className={button({ className, disabled })} disabled={disabled} {...param}>
      {children}
    </button>
  );
}
