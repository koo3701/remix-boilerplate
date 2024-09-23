import { useForm, FormProvider } from '@conform-to/react';

import { v } from '@lib/valibot';
import { parseWithValibot } from 'conform-to-valibot';

import TextField from '@components/Elements/TextField';

import type { StoryObj, Meta, Decorator } from '@storybook/react';

type T = typeof TextField;
type Story = StoryObj<T>;

const decorator: (schema: v.GenericSchema) => Decorator = (schema) =>
  function Dec(Story) {
    const [form] = useForm({
      shouldValidate: 'onBlur',
      shouldRevalidate: 'onInput',
      onValidate({ formData }) {
        return parseWithValibot(formData, { schema });
      },
    });
    return (
      <FormProvider context={form.context}>
        <Story />
      </FormProvider>
    );
  };

export default {
  component: TextField,
  args: {
    type: 'text',
    name: 'TextField',
    label: 'TextField',
  },
  decorators: [decorator(v.object({ TextField: v.string() }))],
} satisfies Meta<T>;

export const Text: Story = {};

export const Number: Story = {
  args: {
    type: 'number',
  },
  decorators: [decorator(v.object({ TextField: v.number() }))],
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
