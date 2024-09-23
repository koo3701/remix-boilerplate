import { render, screen, fireEvent } from '@testing-library/react';
import { FaBeer } from 'react-icons/fa';

import Button from '@components/Elements/Button';

describe('Button Component', () => {
  describe('Rendering', () => {
    describe('Basic Rendering', () => {
      it('should render the button with default primary color and correct text', () => {
        render(<Button>Click Me</Button>);
        const buttonElement = screen.getByRole('button', { name: /click me/i });
        expect(buttonElement).toBeInTheDocument();
        expect(buttonElement).toHaveClass('bg-primary');
        expect(buttonElement).toHaveClass('text-primary-foreground');
      });

      it('should render the button with secondary color when color prop is set to secondary', () => {
        render(<Button color="secondary">Click Me</Button>);
        const buttonElement = screen.getByRole('button', { name: /click me/i });
        expect(buttonElement).toBeInTheDocument();
        expect(buttonElement).toHaveClass('bg-secondary');
        expect(buttonElement).toHaveClass('text-secondary-foreground');
      });

      it('should render the button as disabled when disabled prop is true', () => {
        render(<Button disabled>Click Me</Button>);
        const buttonElement = screen.getByRole('button', { name: /click me/i });
        expect(buttonElement).toBeDisabled();
        expect(buttonElement).toHaveClass('cursor-not-allowed');
        expect(buttonElement).toHaveClass('bg-disabled');
        expect(buttonElement).toHaveClass('text-disabled-foreground');
      });
    });

    describe('Props', () => {
      describe('onClick prop', () => {
        it('should call the onClick handler when clicked', () => {
          const handleClick = vi.fn();
          render(<Button onClick={handleClick}>Click Me</Button>);
          const buttonElement = screen.getByRole('button', { name: /click me/i });
          fireEvent.click(buttonElement);
          expect(handleClick).toHaveBeenCalledTimes(1);
        });

        it('should not call the onClick handler when the button is disabled', () => {
          const handleClick = vi.fn();
          render(
            <Button onClick={handleClick} disabled>
              Click Me
            </Button>
          );
          const buttonElement = screen.getByRole('button', { name: /click me/i });
          fireEvent.click(buttonElement);
          expect(handleClick).not.toHaveBeenCalled();
        });
      });

      describe('children prop', () => {
        it('should display the correct children content', () => {
          render(<Button>Submit</Button>);
          const buttonElement = screen.getByRole('button', { name: /submit/i });
          expect(buttonElement).toBeInTheDocument();
        });
      });

      describe('className prop', () => {
        it('should apply the custom className to the button', () => {
          render(<Button className="w-0">Click Me</Button>);
          const buttonElement = screen.getByRole('button', { name: /click me/i });
          expect(buttonElement).toHaveClass('w-0');
        });
      });

      describe('icon prop', () => {
        it('should render the icon when the icon prop is provided', () => {
          render(<Button icon={FaBeer}>Click Me</Button>);
          const iconElement = screen.getByTestId('icon');
          expect(iconElement).toBeInTheDocument();
        });

        it('should not render the icon when the icon prop is not provided', () => {
          render(<Button>Click Me</Button>);
          const iconElements = screen.queryAllByTestId('icon');
          expect(iconElements.length).toBe(0);
        });
      });
    });

    describe('User Interaction', () => {
      it('should respond to user clicks correctly', () => {
        const handleClick = vi.fn();
        render(<Button onClick={handleClick}>Click Me</Button>);
        const buttonElement = screen.getByRole('button', { name: /click me/i });
        fireEvent.click(buttonElement);
        expect(handleClick).toHaveBeenCalledTimes(1);
      });

      it('should not respond to user clicks when disabled', () => {
        const handleClick = vi.fn();
        render(
          <Button onClick={handleClick} disabled>
            Click Me
          </Button>
        );
        const buttonElement = screen.getByRole('button', { name: /click me/i });
        fireEvent.click(buttonElement);
        expect(handleClick).not.toHaveBeenCalled();
      });
    });
  });
});
