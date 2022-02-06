// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import parseIDfrombody from "../../util/parseIDfrombody";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // TODO: only allow POST and DELETE if they've got a valid authorisation token in the headers
  if (req.method === "POST") {
    const { name } = req.body;
    await prisma.category.create({ data: { name: name } });
    return res.status(200).send("Success!");
  }

  if (req.method === "DELETE") {
    await prisma.category.delete({ where: { id: parseIDfrombody(req) } });
    return res.status(200).send("Success!");
  }

  return res.status(200).json(
    await prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
    })
  );
}
