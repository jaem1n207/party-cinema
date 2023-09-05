import { MemberRole } from '@prisma/client';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

import { currentProfile } from '@/lib/current-profile';
import { db } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { name, imageUrl } = await req.json();

    const profile = await currentProfile();
    if (!profile) return new NextResponse('Unauthorized', { status: 401 });

    const server = await db.server.create({
      data: {
        profileId: profile.id,
        name,
        imageUrl,
        inviteCode: uuidv4(),
        channels: {
          create: [
            {
              name: '일반',
              profileId: profile.id,
            },
          ],
        },
        members: {
          create: [
            {
              profileId: profile.id,
              role: MemberRole.ADMIN,
            },
          ],
        },
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.error(`Error in POST /api/servers: ${error}`);
    return new NextResponse('Internal Server Error', {
      status: 500,
    });
  }
}
