import type { ActionFunctionArgs } from '@remix-run/node';
import { Form, json, redirect } from '@remix-run/react';

import { getFormProps, getInputProps, useForm } from '@conform-to/react';
import { parseWithValibot } from 'conform-to-valibot';
import * as v from 'valibot';

import Button from '@components/elements/Button';

const schema = v.object({
  message: v.nonOptional(v.string(), 'Message is required'),
});

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const submission = parseWithValibot(formData, { schema });

  if (submission.status !== 'success') {
    return json({
      messsage: 'error',
      submission: submission.reply(),
    });
  }

  const message = submission.value.message;
  const encodedMessage = encodeURIComponent(message.trim());
  return redirect(`/sample/${encodedMessage}`);
}

export default function SampleForm() {
  const [form, { message }] = useForm({
    onValidate({ formData }) {
      return parseWithValibot(formData, { schema });
    },
  });

  return (
    <Form method="post" {...getFormProps(form)}>
      <label htmlFor={message.id}>Message</label>
      <input {...getInputProps(message, { type: 'text' })} />
      {message.errors && (
        <div>
          {message.errors.map((e, index) => (
            <p key={index}>{e}</p>
          ))}
        </div>
      )}
      <Button type="submit">Submit</Button>
    </Form>
  );
}
