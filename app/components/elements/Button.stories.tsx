import { fn } from '@storybook/test';
import { MdThumbUp } from 'react-icons/md';

import Button from '@components/Elements/Button';

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

export const Primary: Story = {
  args: {
    color: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    color: 'secondary',
  },
};

export const WithIcon: Story = {
  args: {
    icon: MdThumbUp,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
