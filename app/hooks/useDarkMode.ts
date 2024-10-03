import { useRevalidator } from '@remix-run/react';

import { useCallback, useEffect, useState } from 'react';

import { getTheme, commitTheme } from '@context/ThemeContext';

import type { ThemeType } from '@context/ThemeContext';

const Theme = {
  Dark: 'dark',
  Light: 'light',
  System: 'system',
} as const;

export const useDarkMode = (initialTheme: (typeof Theme)[keyof typeof Theme]) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(initialTheme == Theme.Dark);
  const [current, setCurrent] = useState<(typeof Theme)[keyof typeof Theme]>(initialTheme);

  useEffect(() => {
    const theme = getTheme(document.cookie);
    const current = theme.selected || theme.detected;
    if (current === Theme.Dark) {
      setIsDarkMode(true);
      setCurrent(Theme.Dark);
    } else {
      setIsDarkMode(false);
      setCurrent(Theme.Light);
    }
  }, []);

  const setCookie = useCallback((value: (typeof Theme)[keyof typeof Theme]) => {
    setCurrent(value);
    const theme = getTheme(document.cookie);
    const newTheme = {
      ...theme,
      selected: value !== Theme.System ? value : '',
    } satisfies ThemeType;
    document.cookie = commitTheme(newTheme);
    return newTheme;
  }, []);

  const toggle = useCallback(() => {
    setIsDarkMode((state) => {
      setCookie(state ? Theme.Light : Theme.Dark);
      return !state;
    });
  }, [setCookie]);

  const enable = useCallback(() => {
    setCookie(Theme.Dark);
    setIsDarkMode(true);
  }, [setCookie]);

  const disable = useCallback(() => {
    setCookie(Theme.Light);
    setIsDarkMode(false);
  }, [setCookie]);

  const system = useCallback(() => {
    const newTheme = setCookie(Theme.System);
    setIsDarkMode(newTheme.detected === Theme.Dark);
  }, [setCookie]);

  const { revalidate } = useRevalidator();

  useEffect(() => {
    const themeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleThemeChange = () => {
      const currentTheme = getTheme(document.cookie);
      document.cookie = commitTheme({
        ...currentTheme,
        detected: themeQuery.matches ? 'dark' : 'light',
      });
      revalidate();
      if (!currentTheme.selected) {
        setIsDarkMode(themeQuery.matches);
      }
    };
    themeQuery.addEventListener('change', handleThemeChange);
    return () => {
      themeQuery.removeEventListener('change', handleThemeChange);
    };
  }, [revalidate]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return { isDarkMode, current, toggle, enable, disable, system };
};
