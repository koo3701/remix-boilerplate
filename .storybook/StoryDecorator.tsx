import { useCallback, useEffect } from 'react';

import { addons } from '@storybook/preview-api';
import { DARK_MODE_EVENT_NAME } from 'storybook-dark-mode';

import { useDarkMode } from '@hooks/useDarkMode';

import type { Decorator } from '@storybook/react';

const channel = addons.getChannel();

export const StoryDecorator: Decorator = (Story) => {
  const { enable, disable } = useDarkMode();

  const setLocalStorage = useCallback(
    (isDark: boolean) => {
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      if (isDark) {
        enable();
      } else {
        disable();
      }
    },
    [disable, enable]
  );

  useEffect(() => {
    channel.on(DARK_MODE_EVENT_NAME, setLocalStorage);
    return () => channel.off(DARK_MODE_EVENT_NAME, setLocalStorage);
  }, [setLocalStorage]);

  return <Story />;
};
