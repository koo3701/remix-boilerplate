import DarkMode from '@components/DarkMode';

import type { StoryObj, Meta } from '@storybook/react';

type T = typeof DarkMode;
type Story = StoryObj<T>;

export default {
  component: DarkMode,
  args: {},
} satisfies Meta<T>;

export const Default: Story = {};
