import { themes } from '@storybook/theming';

import { DocsContainer } from '~/.storybook/DocsContainer';

import type { Preview } from '@storybook/react';

import '@/tailwind.css';

export default {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    darkMode: {
      current: 'light',
      dark: { ...themes.dark, appBg: 'black' },
      light: { ...themes.normal, appBg: 'white' },
      stylePreview: true,
    },
    docs: {
      container: DocsContainer,
    },
  },

  tags: ['autodocs'],
} satisfies Preview;
