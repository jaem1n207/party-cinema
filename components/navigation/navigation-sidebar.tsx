import { redirect } from 'next/navigation';
import React from 'react';

import { Separator } from '@/components/ui/separator';
import { currentProfile } from '@/lib/current-profile';
import { db } from '@/lib/db';

import { ModeToggle } from '../mode-toggle';
import { ScrollArea } from '../ui/scroll-area';

import NavigationAction from './navigation-action';

export default async function NavigationSidebar() {
  const profile = await currentProfile();
  if (!profile) return redirect('/');

  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  return (
    <ul
      role="tree"
      tabIndex={0}
      className="flex flex-col items-center w-full h-full py-3 space-y-4 text-basic bg-[#E2E5E8] dark:bg-[#1E1F22]"
    >
      <NavigationAction />
      <Separator className="mx-auto rounded-md h-2pxr bg-zinc-300 dark:bg-zinc-700 !w-32pxr" />
      <ScrollArea className="flex-1 w-full">
        {servers.map((server) => {
          return <div key={server.id}>{server.name}</div>;
        })}
      </ScrollArea>
      <Separator className="mx-auto rounded-md h-2pxr bg-zinc-300 dark:bg-zinc-700 !w-32pxr" />
      <ModeToggle />
    </ul>
  );
}
