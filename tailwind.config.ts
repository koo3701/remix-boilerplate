import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: {
          DEFAULT: 'var(--foreground)',
          sub: 'var(--foreground-sub)',
          link: 'var(--foreground-link)',
          error: 'var(--foreground-error)',
        },
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        disabled: {
          DEFAULT: 'var(--disabled)',
          foreground: 'var(--disabled-foreground)',
        },
        error: {
          DEFAULT: 'var(--error)',
          foreground: 'var(--error-foreground)',
        },
        outline: 'var(--outline)',
      },
    },
  },
  plugins: [],
} satisfies Config;
