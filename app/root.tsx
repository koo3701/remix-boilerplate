import type { LoaderFunctionArgs } from '@remix-run/node';
import {
  json,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';

import DarkMode from '@components/DarkMode';
import ThemeMonitor from '@components/ThemeMonitor';

import { ThemeContext, getTheme } from '@context/ThemeContext';
import { useDarkMode } from '@hooks/useDarkMode';

import '@/tailwind.css';

export function loader({ request }: LoaderFunctionArgs) {
  const theme = getTheme(request.headers.get('Cookie') ?? '');
  return json({ theme });
}

export function Layout({ children }: { children: React.ReactNode }) {
  const data = useLoaderData<typeof loader>();
  const theme = data.theme.selected || data.theme.detected;
  const darkMode = useDarkMode(theme);
  return (
    <html lang="en" className={theme}>
      <head>
        <ThemeMonitor />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <ThemeContext.Provider value={darkMode}>
          {children}
          <DarkMode className="absolute right-1 top-1" />
          <ScrollRestoration />
          <Scripts />
        </ThemeContext.Provider>
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
