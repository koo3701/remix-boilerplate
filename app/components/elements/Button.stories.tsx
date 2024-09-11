import { fn } from '@storybook/test';

import Button from '@components/elements/Button';

import type { StoryObj, Meta } from '@storybook/react';

type T = typeof Button;
type Story = StoryObj<T>;

export default {
  component: Button,
  args: {
    onClick: fn(),
    children: 'Button',
  },
} satisfies Meta<T>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
    onClick: fn(),
    children: 'Button',
  },
};
