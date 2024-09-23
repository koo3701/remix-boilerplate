import { useCallback, useEffect, useState } from 'react';

const Theme = {
  Dark: 'dark',
  Light: 'light',
} as const;

export const useDarkMode = (isInitialDark = false) => {
  const [value, setValue] = useState<(typeof Theme)[keyof typeof Theme] | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(isInitialDark);

  useEffect(() => {
    const value = localStorage.getItem('theme');
    if (value === Theme.Dark) {
      setIsDarkMode(true);
    } else if (value === Theme.Light) {
      setIsDarkMode(false);
    }
  }, []);

  const setLocalStorage = useCallback((value: (typeof Theme)[keyof typeof Theme]) => {
    localStorage.setItem('theme', value);
    setValue(value);
  }, []);

  const toggle = useCallback(() => {
    setIsDarkMode((state) => {
      setLocalStorage(state ? Theme.Light : Theme.Dark);
      return !state;
    });
  }, [setLocalStorage]);

  const enable = useCallback(() => {
    setLocalStorage(Theme.Dark);
    setIsDarkMode(true);
  }, [setLocalStorage]);

  const disable = useCallback(() => {
    setLocalStorage(Theme.Light);
    setIsDarkMode(false);
  }, [setLocalStorage]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    if (
      value === Theme.Dark ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      enable();
      setLocalStorage(Theme.Dark);
    } else if (value === Theme.Light) {
      disable();
      setLocalStorage(Theme.Light);
    }
  }, [setLocalStorage, enable, disable, value]);

  return { isDarkMode, toggle, enable, disable };
};
