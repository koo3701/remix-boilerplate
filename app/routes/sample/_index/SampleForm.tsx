import type { ActionFunctionArgs } from '@remix-run/node';
import { Form, redirect, useActionData } from '@remix-run/react';

import { FormProvider, getFormProps, useForm } from '@conform-to/react';

import { v } from '@lib/valibot';
import { parseWithValibot } from 'conform-to-valibot';

import Button from '@components/Elements/Button';
import TextField from '@components/Elements/TextField';

const schema = v.object({
  message1: v.nonOptional(v.string(), 'Message1 is required'),
  message2: v.optional(v.number('Message2 must be a number')),
});

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const submission = parseWithValibot(formData, { schema });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  const message1 = submission.value.message1;
  const encodedMessage = encodeURIComponent(message1.trim());
  return redirect(`/sample/${encodedMessage}?message2=${submission.value.message2}`);
}

export default function SampleForm() {
  const lastResult = useActionData<typeof action>();
  const [form, { message1, message2 }] = useForm({
    lastResult,
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
    onValidate({ formData }) {
      return parseWithValibot(formData, { schema });
    },
  });

  return (
    <FormProvider context={form.context}>
      <Form method="post" className="flex flex-col gap-2" {...getFormProps(form)}>
        <TextField type="text" className="w-96" name={message1.name} label="Message1" />
        <TextField type="text" className="w-96" name={message2.name} label="Message2" />
        <div className="flex justify-end gap-2">
          <Button type="reset" color="secondary" disabled={!form.dirty}>
            Reset
          </Button>
          <Button type="submit">Submit</Button>
        </div>
      </Form>
    </FormProvider>
  );
}
