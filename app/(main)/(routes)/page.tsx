import { UserButton } from '@clerk/nextjs';
import React from 'react';

import { ModeToggle } from '@/components/mode-toggle';
import { Button } from '@/components/ui/button';
import { formatToKoreanNumberWithUnit } from '@/lib/numbers';

export default function Home() {
  return (
    <div>
      <h1 className="text-4xl font-extrabold tracking-tight scroll-m-20 lg:text-5xl">
        Party Cinema
      </h1>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        {formatToKoreanNumberWithUnit(5138_7133, '명', {
          floorUnit: 10_000,
        })}
      </p>
      <ModeToggle />
      <Button>Click Me</Button>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}
