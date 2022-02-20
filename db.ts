/* Getting a lot of "warn(prisma-client) There are already 10 instances of Prisma Client actively running." 
   This db file was adapted from https://www.prisma.io/docs/support/help-articles/nextjs-prisma-client-dev-practices */

import { PrismaClient } from "@prisma/client";

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var prisma: PrismaClient;
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
    prisma = global.prisma;
  }
  prisma = global.prisma;
}

export default prisma;
