import type { StorybookConfig } from '@storybook/react-vite';

export default {
  stories: ['../app/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-themes'],
  framework: {
    name: '@storybook/react-vite',
    options: {
      builder: {
        viteConfigPath: 'vite-sb.config.ts',
      },
    },
  },
} satisfies StorybookConfig;
