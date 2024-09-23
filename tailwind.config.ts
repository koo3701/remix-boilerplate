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
          sub: 'var(--sub-foreground)',
          link: 'var(--link-foreground)',
          button: 'var(--button-foreground)',
        },
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
      },
    },
  },
  plugins: [],
} satisfies Config;
