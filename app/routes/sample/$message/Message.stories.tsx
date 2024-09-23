import Message from '@routes/sample/$message/Message';

import type { StoryObj, Meta } from '@storybook/react';

type T = typeof Message;
type Story = StoryObj<T>;

export default {
  component: Message,
  args: {
    children: 'Message',
  },
} satisfies Meta<T>;

export const Default: Story = {};
