import type { Metadata } from 'next';

import { redirectToSignIn } from '@clerk/nextjs';
import { ChannelType } from '@prisma/client';
import { redirect } from 'next/navigation';

import { currentProfile } from '@/lib/current-profile';
import { db } from '@/lib/db';

type ChannelIdPageProps = {
  params: {
    serverId: string;
    channelId: string;
  };
};

export async function generateMetadata({ params }: ChannelIdPageProps): Promise<Metadata> {
  const server = await db.server.findUnique({
    where: {
      id: params.serverId,
    },
  });

  const channel = await db.channel.findUnique({
    where: {
      id: params.channelId,
    },
  });

  if (!server || !channel)
    return {
      title: 'Party Cinema',
    };

  return {
    title: `Party Cinema | #${channel?.name} | ${server?.name}`,
    openGraph: {
      title: `Party Cinema | #${channel?.name} | ${server?.name}`,
      url: `http://localhost:3000/servers/${params.serverId}/channels/${params.channelId}`,
      siteName: 'Party Cinema',
      locale: 'ko_KR',
      type: 'website',
    },
  };
}

export default async function ChannelIdPage({ params }: ChannelIdPageProps) {
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
  });

  const channel = await db.channel.findUnique({
    where: {
      id: params.channelId,
    },
  });

  const member = await db.member.findFirst({
    where: {
      serverId: params.serverId,
      profileId: profile.id,
    },
  });

  if (!server || !channel || !member) return redirect(`/`);

  return (
    <div>
      <section>채널 헤더</section>

      {channel.type === ChannelType.TEXT && (
        <main aria-label={`${channel.name} (채널)`}>
          <h2>{server.name}에 오신 것을 환영해요</h2>
        </main>
      )}
    </div>
  );
}
