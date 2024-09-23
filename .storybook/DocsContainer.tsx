import type { FC, PropsWithChildren } from 'react';
import { useCallback, useEffect, useState } from 'react';

import { DocsContainer as BaseContainer } from '@storybook/blocks';
import { addons } from '@storybook/preview-api';
import { themes } from '@storybook/theming';
import { DARK_MODE_EVENT_NAME } from 'storybook-dark-mode';

import { useDarkMode } from '@hooks/useDarkMode';

import type { DocsContainerProps } from '@storybook/blocks';

const channel = addons.getChannel();

export const DocsContainer: FC<PropsWithChildren<DocsContainerProps>> = ({ children, context }) => {
  const { enable, disable } = useDarkMode();
  const [isDark, setDark] = useState(false);

  useEffect(() => {
    const value = localStorage.getItem('theme');
    if (value === 'dark') {
      setDark(true);
    } else if (value === 'light') {
      setDark(false);
    }
  }, []);

  const setLocalStorage = useCallback(
    (isDark: boolean) => {
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      if (isDark) {
        enable();
      } else {
        disable();
      }
      setDark(isDark);
    },
    [disable, enable]
  );

  useEffect(() => {
    channel.on(DARK_MODE_EVENT_NAME, setLocalStorage);
    return () => channel.off(DARK_MODE_EVENT_NAME, setLocalStorage);
  }, [setLocalStorage]);

  return (
    <BaseContainer theme={isDark ? themes.dark : themes.light} context={context}>
      {children}
    </BaseContainer>
  );
};
