import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import DarkMode from '@components/DarkMode';

const useDarkMode = vi.hoisted(() => vi.fn());
vi.mock('@hooks/useDarkMode', () => ({
  useDarkMode,
}));

describe('DarkMode Component', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should render light mode icon when isDarkMode is true', () => {
    useDarkMode.mockReturnValue({
      isDarkMode: true,
      toggle: vi.fn(),
    });

    render(<DarkMode className="w-0" />);

    const lightModeIcon = screen.getByTestId('light-mode-icon');
    expect(lightModeIcon).toBeInTheDocument();

    const button = screen.getByRole('button', { name: /dark mode toggle/i });
    expect(button).toHaveClass('w-0');
  });

  it('should render dark mode icon when isDarkMode is false', () => {
    useDarkMode.mockReturnValue({
      isDarkMode: false,
      toggle: vi.fn(),
    });

    render(<DarkMode className="w-0" />);

    const darkModeIcon = screen.getByTestId('dark-mode-icon');
    expect(darkModeIcon).toBeInTheDocument();

    const button = screen.getByRole('button', { name: /dark mode toggle/i });
    expect(button).toHaveClass('w-0');
  });

  it('should call toggle function when button is clicked', async () => {
    const toggleMode = vi.fn();
    const user = userEvent.setup();
    useDarkMode.mockReturnValue({
      isDarkMode: false,
      toggle: toggleMode,
    });

    render(<DarkMode />);

    const button = screen.getByRole('button', { name: /dark mode toggle/i });
    await user.click(button);

    expect(toggleMode).toHaveBeenCalledTimes(1);
  });
});
