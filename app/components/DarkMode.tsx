import { MdLightMode, MdOutlineDarkMode } from 'react-icons/md';

import { useDarkMode } from '@hooks/useDarkMode';

export type DarkModePropsType = {
  className?: string;
};

export default function DarkMode({ className }: DarkModePropsType) {
  const { isDarkMode, toggle } = useDarkMode();
  return (
    <button className={className} onClick={toggle}>
      {isDarkMode ? (
        <MdLightMode className="size-8 text-primary" />
      ) : (
        <MdOutlineDarkMode className="size-8 text-primary" />
      )}
    </button>
  );
}
