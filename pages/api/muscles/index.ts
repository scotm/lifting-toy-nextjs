// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../db";
import parseID from "../../../util/parseID";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const body = JSON.parse(req.body);
    const { name, is_front } = body;
    await prisma.muscles.create({ data: { name: name, is_front: true } });
    return res.status(200).send("Success!");
  }

  if (req.method === "DELETE") {
    await prisma.muscles.delete({ where: { id: parseID(req.body.id) } });
    return res.status(200).send("Success!");
  }

  res.status(200).json(
    await prisma.muscles.findMany({
      orderBy: {
        name: "asc",
      },
    })
  );
}
