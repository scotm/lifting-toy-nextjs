// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import parseID from "../../../util/parseID";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const body = JSON.parse(req.body);
    const { name } = body;
    await prisma.equipment.create({ data: { name: name } });
    return res.status(200).send("Success!");
  }

  if (req.method === "DELETE") {
    await prisma.equipment.delete({ where: { id: parseID(req.body.id) } });
    return res.status(200).send("Success!");
  }

  res.status(200).json(
    await prisma.equipment.findMany({
      orderBy: {
        name: "asc",
      },
    })
  );
}
