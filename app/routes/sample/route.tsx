import { Outlet } from '@remix-run/react';

import SampleText from '@routes/sample/text';

export default function Sample() {
  return (
    <div>
      <h1>Sample Page</h1>
      <SampleText />
      <div>
        <Outlet />
      </div>
    </div>
  );
}
