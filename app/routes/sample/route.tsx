import { Outlet } from '@remix-run/react';

import SampleText from '@routes/sample/text';

export default function Sample() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="flex flex-col gap-24">
        <div>
          <h1 className="text-4xl font-bold text-foreground">Sample Page</h1>
          <SampleText />
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
