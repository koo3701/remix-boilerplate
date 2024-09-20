import type { LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

export function loader({ params }: LoaderFunctionArgs) {
  const message = decodeURIComponent(params.message!);
  return { message: message };
}

export default function MessageView() {
  const { message } = useLoaderData<typeof loader>();
  return <p>{message}</p>;
}
