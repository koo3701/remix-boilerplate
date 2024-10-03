import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import DarkMode from '@components/DarkMode';

import { ThemeContext } from '@context/ThemeContext';

const defaultTheme = {
  isDarkMode: false,
  current: 'light',
  toggle: vi.fn(),
  enable: vi.fn(),
  disable: vi.fn(),
  system: vi.fn(),
};

describe('DarkMode Component', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should render light mode icon when isDarkMode is true', () => {
    render(
      <ThemeContext.Provider
        value={{
          ...defaultTheme,
          isDarkMode: true,
          current: 'dark',
        }}
      >
        <DarkMode />
      </ThemeContext.Provider>
    );

    const lightModeIcon = screen.getByTestId('light-mode-icon');
    expect(lightModeIcon).toBeInTheDocument();
  });

  it('should render dark mode icon when isDarkMode is false', () => {
    render(
      <ThemeContext.Provider
        value={{
          ...defaultTheme,
          isDarkMode: false,
          current: 'light',
        }}
      >
        <DarkMode />
      </ThemeContext.Provider>
    );

    const darkModeIcon = screen.getByTestId('dark-mode-icon');
    expect(darkModeIcon).toBeInTheDocument();
  });

  it('should call toggle function when button is clicked', async () => {
    const toggleMode = vi.fn();
    const user = userEvent.setup();
    render(
      <ThemeContext.Provider
        value={{
          ...defaultTheme,
          isDarkMode: false,
          current: 'light',
          toggle: toggleMode,
        }}
      >
        <DarkMode />
      </ThemeContext.Provider>
    );

    const button = screen.getByRole('button', { name: /dark mode toggle/i });
    await user.click(button);

    expect(toggleMode).toHaveBeenCalledTimes(1);
  });
});
