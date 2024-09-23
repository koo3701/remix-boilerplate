import { getInputProps, useField } from '@conform-to/react';

import { tv } from 'tailwind-variants';

const input = tv({
  base: [
    'px-3 py-2',
    'bg-primary',
    'text-base font-medium text-primary-foreground',
    'rounded-lg',
    'box-border border border-solid border-transparent outline-none transition-[border-color]',
    'cursor-pointer',
    'hover:border-outline',
    'focus:outline-4 focus-visible:outline-4',
  ],
  variants: {
    disabled: {
      true: [
        'cursor-not-allowed',
        'hover:border-transparent',
        'bg-disabled text-disabled-foreground',
      ],
    },
    error: {
      true: ['border-2 border-error', 'hover:border-error', 'focus:border-error'],
    },
  },
});

export type TextFieldPropsType = {
  className?: string;
  type: 'text' | 'number';
  name: string;
  label: string;
  disabled?: boolean;
};

export default function TextField({ className, type, name, label, disabled }: TextFieldPropsType) {
  const [meta] = useField(name ?? '');
  return (
    <div className="flex flex-col">
      <label htmlFor={meta.id}>{label}</label>
      <input
        className={input({ className, disabled, error: !!meta.errors })}
        disabled={disabled}
        {...getInputProps(meta, { type })}
      />
      <div className="h-6">
        {meta.errors && <p className="text-foreground-error">{meta.errors[0]}</p>}
      </div>
    </div>
  );
}
