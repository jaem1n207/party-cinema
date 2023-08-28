import React from 'react';

import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Party Cinema
      </h1>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        This is a protected route. You can only see this if you&apos;re logged in.
      </p>
      <Button>Click Me</Button>
    </main>
  );
}
