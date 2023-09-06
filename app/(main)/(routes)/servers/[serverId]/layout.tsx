import { redirectToSignIn } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import ServerSidebar from '@/components/server/server-sidebar';
import { currentProfile } from '@/lib/current-profile';
import { db } from '@/lib/db';

type ServerIdLayoutProps = {
  children: React.ReactNode;
  params: {
    serverId: string;
  };
};

export default async function ServerIdLayout({ children, params }: ServerIdLayoutProps) {
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

  if (!server) return redirect('/');

  return (
    <>
      <div className="flex-col flex-grow-0 flex-shrink-0 hidden overflow-hidden bg-background-secondary md:flex w-240pxr basis-auto">
        <ServerSidebar serverId={params.serverId} />
      </div>
      <div className="relative flex flex-col flex-1 overflow-hidden">{children}</div>
    </>
  );
}
