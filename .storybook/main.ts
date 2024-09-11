import type { StorybookConfig } from '@storybook/react-vite';

export default {
  stories: ['../app/**/*.stories.@(js|jsx|mjs|ts|tsx)'],

  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-themes',
    'storybook-dark-mode',
  ],

  framework: {
    name: '@storybook/react-vite',
    options: {
      builder: {
        viteConfigPath: 'vite-sb.config.ts',
      },
    },
  },

  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
} satisfies StorybookConfig;
