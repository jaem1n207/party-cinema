import { PrismaClient } from '@prisma/client';

declare module globalThis {
  // eslint-disable-next-line unused-imports/no-unused-vars
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalThis.prisma = db;
