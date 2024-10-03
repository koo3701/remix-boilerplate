import { MdLightMode, MdOutlineDarkMode } from 'react-icons/md';

import { useTheme } from '@context/ThemeContext';

export type DarkModePropsType = {
  className?: string;
};

export default function DarkMode({ className }: DarkModePropsType) {
  const { isDarkMode, toggle } = useTheme();
  return (
    <button className={className} onClick={toggle} aria-label="dark mode toggle">
      {isDarkMode ? (
        <MdLightMode data-testid="light-mode-icon" className="size-8 text-primary" />
      ) : (
        <MdOutlineDarkMode data-testid="dark-mode-icon" className="size-8 text-primary" />
      )}
    </button>
  );
}
