import type React from 'react';

import { tv } from 'tailwind-variants';

import type { IconType } from 'react-icons';

const button = tv({
  base: [
    'flex items-center justify-center',
    'px-5 py-2',
    'text-base font-medium',
    'rounded-lg',
    'border border-solid border-transparent transition-[border-color]',
    'cursor-pointer',
    'hover:border-outline',
    'focus:outline-4 focus-visible:outline-4',
  ],
  variants: {
    color: {
      primary: ['bg-primary text-primary-foreground'],
      secondary: ['bg-secondary text-secondary-foreground'],
    },
    disabled: {
      true: [
        'cursor-not-allowed',
        'hover:border-transparent',
        'bg-disabled text-disabled-foreground',
      ],
    },
    withIcon: {
      true: ['pl-2'],
    },
  },
});
export type ButtonPropsType = React.ComponentProps<'button'> & {
  color?: keyof typeof button.variants.color;
  icon?: IconType;
};
export default function Button({
  className,
  color = 'primary',
  disabled,
  icon: Icon,
  children,
  ...param
}: ButtonPropsType) {
  return (
    <button
      className={button({ className, color, disabled, withIcon: Icon !== undefined })}
      disabled={disabled}
      {...param}
    >
      {Icon && <Icon data-testid="icon" className="mr-1" />}
      {children}
    </button>
  );
}
