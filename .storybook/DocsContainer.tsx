import type { FC, PropsWithChildren } from 'react';
import { useCallback, useEffect, useState } from 'react';

import { DocsContainer as BaseContainer } from '@storybook/blocks';
import { addons } from '@storybook/preview-api';
import { themes } from '@storybook/theming';
import { DARK_MODE_EVENT_NAME } from 'storybook-dark-mode';

import type { DocsContainerProps } from '@storybook/blocks';

const channel = addons.getChannel();

export const DocsContainer: FC<PropsWithChildren<DocsContainerProps>> = ({ children, context }) => {
  const [isDark, setDark] = useState(false);

  useEffect(() => {
    const value = localStorage.getItem('theme');
    if (value === 'dark') {
      setDark(true);
    } else if (value === 'light') {
      setDark(false);
    }
  }, []);

  const setTheme = useCallback((isDark: boolean) => {
    setDark(isDark);
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

  return (
    <BaseContainer theme={isDark ? themes.dark : themes.light} context={context}>
      {children}
    </BaseContainer>
  );
};
