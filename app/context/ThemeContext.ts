import { createContext, useContext } from 'react';

import type { useDarkMode } from '@hooks/useDarkMode';

export type ThemeType = {
  detected: 'light' | 'dark';
  selected: 'light' | 'dark' | '';
};

export const getTheme = (cookie: string) => {
  const themeCookie = cookie.split(';').find((cookie) => cookie.trim().startsWith('theme='));
  if (!themeCookie) {
    return { detected: 'light', selected: '' } as ThemeType;
  }
  return JSON.parse(decodeURIComponent(themeCookie.split('=')[1])) as ThemeType;
};

export const commitTheme = (theme: ThemeType) => {
  return `theme=${encodeURIComponent(JSON.stringify(theme))};path=/`;
};

export const ThemeContext = createContext<ReturnType<typeof useDarkMode>>({
  isDarkMode: false,
  current: 'light',
  toggle: () => {},
  enable: () => {},
  disable: () => {},
  system: () => {},
});

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
