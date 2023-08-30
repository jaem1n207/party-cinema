import { UserButton } from '@clerk/nextjs';
import React from 'react';

import { ModeToggle } from '@/components/mode-toggle';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div>
      <h1 className="text-4xl font-extrabold tracking-tight scroll-m-20 lg:text-5xl">
        Party Cinema
      </h1>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        This is a protected route. You can only see this if you&apos;re logged in.
      </p>
      <Button>Click Me</Button>
      <UserButton afterSignOutUrl="/" />
      <ModeToggle />
    </div>
  );
}
