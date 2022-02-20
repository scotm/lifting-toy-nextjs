// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return res.status(200).json(
    await prisma.language.findMany({
      orderBy: {
        id: "asc",
      },
    })
  );
}
