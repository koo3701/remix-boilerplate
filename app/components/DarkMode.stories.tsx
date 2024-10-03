import { fn } from '@storybook/test';

import DarkMode from '@components/DarkMode';

import { ThemeContext } from '@context/ThemeContext';

import type { useDarkMode } from '@hooks/useDarkMode';
import type { StoryObj, Meta, Decorator } from '@storybook/react';

type T = typeof DarkMode;
type Story = StoryObj<T>;

const decorator: (theme: ReturnType<typeof useDarkMode>) => Decorator = (theme) =>
  function Dec(Story) {
    return (
      <ThemeContext.Provider value={theme}>
        <Story {...theme} />
      </ThemeContext.Provider>
    );
  };

export default {
  component: DarkMode,
  decorators: [
    decorator({
      isDarkMode: false,
      current: 'light',
      toggle: fn(),
      enable: fn(),
      disable: fn(),
      system: fn(),
    }),
  ],
} satisfies Meta<T>;

export const ToLight: Story = {};

export const ToDark: Story = {
  decorators: [
    decorator({
      isDarkMode: true,
      current: 'dark',
      toggle: fn(),
      enable: fn(),
      disable: fn(),
      system: fn(),
    }),
  ],
};
