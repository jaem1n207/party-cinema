import { redirectToSignIn } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import { currentProfile } from '@/lib/current-profile';
import { db } from '@/lib/db';

type ServerIdPageProps = {
  params: {
    serverId: string;
  };
};

const DEFAULT_CHANNEL_NAME = '일반';

export default async function ServerIdPage({ params }: ServerIdPageProps) {
  const profile = await currentProfile();
  if (!profile) return redirectToSignIn();

  const server = await db.server.findUnique({
    where: {
      id: params.serverId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
    include: {
      channels: {
        where: {
          name: DEFAULT_CHANNEL_NAME,
        },
        orderBy: {
          createdAt: 'asc',
        },
      },
    },
  });

  const initialChannel = server?.channels[0];

  if (initialChannel?.name !== DEFAULT_CHANNEL_NAME) return null;

  return redirect(`/servers/${params.serverId}/channels/${initialChannel?.id}`);
}
