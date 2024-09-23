import { Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';

import '@/tailwind.css';
import DarkMode from '@components/DarkMode';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <DarkMode className="absolute right-1 top-1" />
        <ScrollRestoration />
        <Scripts />
        <script src="/noflash.js" />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
