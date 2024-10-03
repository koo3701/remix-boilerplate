import { useCallback, useEffect } from 'react';

import { addons } from '@storybook/preview-api';
import { DARK_MODE_EVENT_NAME } from 'storybook-dark-mode';

import type { Decorator } from '@storybook/react';

const channel = addons.getChannel();

export const StoryDecorator: Decorator = (Story) => {
  const setTheme = useCallback((isDark: boolean) => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  useEffect(() => {
    channel.on(DARK_MODE_EVENT_NAME, setTheme);
    return () => channel.off(DARK_MODE_EVENT_NAME, setTheme);
  }, [setTheme]);

  return <Story />;
};
