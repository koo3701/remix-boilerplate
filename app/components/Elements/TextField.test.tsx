import type React from 'react';

import { useForm, FormProvider, getFormProps } from '@conform-to/react';

import { v } from '@lib/valibot';
import { parseWithValibot } from 'conform-to-valibot';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';

import TextField from '@components/Elements/TextField';

interface TestFormProps {
  schema: v.GenericSchema;
  children: React.ReactNode;
}

const TestForm: React.FC<TestFormProps> = ({ schema, children }) => {
  const [form] = useForm({
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
    onValidate({ formData }) {
      return parseWithValibot(formData, { schema });
    },
  });

  return (
    <FormProvider context={form.context}>
      <form method="post" className="flex flex-col gap-2" {...getFormProps(form)}>
        {children}
      </form>
    </FormProvider>
  );
};

describe('TextField Component', () => {
  it('should render label and text input correctly', () => {
    const schema = v.object({
      username: v.nonOptional(v.string(), 'Username is required'),
    });

    render(
      <TestForm schema={schema}>
        <TextField type="text" name="username" label="Username" />
      </TestForm>
    );

    const inputElement = screen.getByTestId('textfield-input-username');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('type', 'text');
    expect(inputElement).toHaveAttribute('name', 'username');
    expect(inputElement).not.toBeDisabled();

    const labelElement = screen.getByText('Username');
    expect(labelElement).toHaveAttribute('for', inputElement.id);

    expect(inputElement).toHaveClass(
      'm-px',
      'px-3',
      'py-2',
      'bg-primary',
      'text-base',
      'font-medium',
      'text-primary-foreground',
      'rounded-lg',
      'box-border',
      'border',
      'border-solid',
      'border-transparent',
      'outline-none',
      'transition-[border-color]',
      'cursor-pointer',
      'hover:border-outline',
      'focus:outline-4',
      'focus-visible:outline-4'
    );

    const errorElement = screen.queryByTestId('textfield-error-username');
    expect(errorElement).not.toBeInTheDocument();
  });

  it('should render label and number input correctly', () => {
    const schema = v.object({
      age: v.nonOptional(v.number('Age must be a number'), 'Age is required'),
    });

    render(
      <TestForm schema={schema}>
        <TextField type="number" name="age" label="Age" />
      </TestForm>
    );

    const inputElement = screen.getByTestId('textfield-input-age');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('type', 'number');
    expect(inputElement).toHaveAttribute('name', 'age');
    expect(inputElement).not.toBeDisabled();

    const labelElement = screen.getByText('Age');
    expect(labelElement).toHaveAttribute('for', inputElement.id);

    expect(inputElement).toHaveClass(
      'm-px',
      'px-3',
      'py-2',
      'bg-primary',
      'text-base',
      'font-medium',
      'text-primary-foreground',
      'rounded-lg',
      'box-border',
      'border',
      'border-solid',
      'border-transparent',
      'outline-none',
      'transition-[border-color]',
      'cursor-pointer',
      'hover:border-outline',
      'focus:outline-4',
      'focus-visible:outline-4'
    );

    const errorElement = screen.queryByTestId('textfield-error-age');
    expect(errorElement).not.toBeInTheDocument();
  });

  it('should render input as disabled when disabled prop is true', () => {
    const schema = v.object({
      email: v.nonOptional(v.string(), 'Email is required'),
    });

    render(
      <TestForm schema={schema}>
        <TextField type="text" name="email" label="Email" disabled />
      </TestForm>
    );

    const inputElement = screen.getByTestId('textfield-input-email');
    expect(inputElement).toBeDisabled();

    expect(inputElement).toHaveClass(
      'cursor-not-allowed',
      'hover:border-transparent',
      'bg-disabled',
      'text-disabled-foreground'
    );

    const errorElement = screen.queryByTestId('textfield-error-email');
    expect(errorElement).not.toBeInTheDocument();
  });

  it('should apply custom className to the input', () => {
    const schema = v.object({
      firstName: v.nonOptional(v.string(), 'First name is required'),
    });

    render(
      <TestForm schema={schema}>
        <TextField type="text" name="firstName" label="First Name" className="w-0" />
      </TestForm>
    );

    const inputElement = screen.getByTestId('textfield-input-firstName');
    expect(inputElement).toHaveClass('w-0');
  });

  it('should display error message when validation fails', async () => {
    const user = userEvent.setup();

    const schema = v.object({
      password: v.nonOptional(v.string(), 'Password is required'),
    });

    render(
      <TestForm schema={schema}>
        <TextField type="text" name="password" label="Password" />
      </TestForm>
    );

    const inputElement = screen.getByTestId('textfield-input-password');

    await user.click(inputElement);
    await user.tab();

    const errorElement = await screen.findByTestId('textfield-error-password');
    expect(errorElement).toBeInTheDocument();
    expect(errorElement).toHaveTextContent('Password is required');
    expect(errorElement).toHaveClass('text-foreground-error');

    expect(inputElement).toHaveClass(
      'm-0',
      'border-2',
      'border-error',
      'hover:border-error',
      'focus:border-error'
    );
  });

  it('should not display error message when there are no validation errors', async () => {
    const user = userEvent.setup();

    const schema = v.object({
      bio: v.nonOptional(v.string(), 'Bio is required'),
    });

    render(
      <TestForm schema={schema}>
        <TextField type="text" name="bio" label="Bio" />
      </TestForm>
    );

    const inputElement = screen.getByTestId('textfield-input-bio');

    await user.type(inputElement, 'This is a bio.');

    await user.click(inputElement);
    await user.tab();

    const errorElement = screen.queryByTestId('textfield-error-bio');
    expect(errorElement).not.toBeInTheDocument();

    expect(inputElement).not.toHaveClass('border-error');
  });

  it('should display error message for invalid number input', async () => {
    const user = userEvent.setup();

    const schema = v.object({
      age: v.nonOptional(
        v.pipe(v.number(), v.maxValue(100, 'The number must not exceed 100.')),
        'Age is required'
      ),
    });

    render(
      <TestForm schema={schema}>
        <TextField type="number" name="age" label="Age" />
      </TestForm>
    );

    const inputElement = screen.getByTestId('textfield-input-age');

    await user.type(inputElement, '101');

    await user.click(inputElement);
    await user.tab();

    const errorElement = await screen.findByTestId('textfield-error-age');
    expect(errorElement).toBeInTheDocument();
    expect(errorElement).toHaveTextContent('The number must not exceed 100.');
    expect(errorElement).toHaveClass('text-foreground-error');

    expect(inputElement).toHaveClass(
      'm-0',
      'border-2',
      'border-error',
      'hover:border-error',
      'focus:border-error'
    );
  });

  it('should correctly link label to input via htmlFor and id', () => {
    const schema = v.object({
      lastName: v.nonOptional(v.string(), 'Last name is required'),
    });

    render(
      <TestForm schema={schema}>
        <TextField type="text" name="lastName" label="Last Name" />
      </TestForm>
    );

    const inputElement = screen.getByTestId('textfield-input-lastName');

    const labelElement = screen.getByText('Last Name');
    expect(labelElement).toHaveAttribute('for', inputElement.id);
    expect(inputElement).toHaveAttribute('id');
  });
});
