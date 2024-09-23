import type { LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import { v } from '@lib/valibot';
import { parseWithValibot } from 'conform-to-valibot';

import Message from '@routes/sample/$message/Message';

const schema = v.object({
  message2: v.number(),
});

export function loader({ params, request }: LoaderFunctionArgs) {
  const message1 = decodeURIComponent(params.message!);

  const submission = parseWithValibot(new URL(request.url).searchParams, { schema });

  if (submission.status !== 'success') {
    return { message1: message1, message2: null };
  }

  return { message1: message1, message2: submission.value.message2 };
}

export default function MessageView() {
  const { message1, message2 } = useLoaderData<typeof loader>();
  return (
    <div className="flex flex-col">
      <p className="truncate">
        Message1: <Message>{message1}</Message>
      </p>
      {message2 !== null && (
        <p className="truncate">
          Message2: <Message>{message2}</Message>
        </p>
      )}
    </div>
  );
}
