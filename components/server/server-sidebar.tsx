import { ChannelType } from '@prisma/client';
import { redirect } from 'next/navigation';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { currentProfile } from '@/lib/current-profile';
import { db } from '@/lib/db';

import { ServerHeader } from './server-header';

type ServerSidebarProps = {
  serverId: string;
};

export default async function ServerSidebar({ serverId }: ServerSidebarProps) {
  const profile = await currentProfile();
  if (!profile) return redirect('/');

  const server = await db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: 'asc',
        },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: 'asc',
        },
      },
    },
  });

  const textChannels = server?.channels.filter((channel) => channel.type === ChannelType.TEXT);
  const audioChannels = server?.channels.filter((channel) => channel.type === ChannelType.AUDIO);
  const videoChannels = server?.channels.filter((channel) => channel.type === ChannelType.VIDEO);

  const memberrs = server?.members.filter((member) => member.profileId !== profile.id);

  if (!server) return redirect('/');

  const role = server.members.find((member) => member.profileId === profile.id)?.role;

  return (
    <nav
      className="flex-col flex-grow-0 flex-shrink-0 hidden h-full overflow-hidden bg-background-secondary md:flex w-240pxr text-basic basis-auto"
      aria-label={`${server.name} (서버)`}
    >
      <ServerHeader server={server} role={role} />

      <ScrollArea className="flex-1 px-12pxr">
        <div className="mt-8pxr">Server Search</div>
        <Separator className="bg-background-modifier-accent" />
        Channels...
      </ScrollArea>
    </nav>
  );
}
