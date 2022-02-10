// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import parseID from "../../../util/parseID";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Create workout template
  // if (req.method === "POST") {
  //   const body = JSON.parse(req.body);
  //   const { name } = body;
  //   await prisma.workoutTemplate.create({ data: { name: name, userId: 1 } });
  //   return res.status(200).send("Success!");
  // }

  if (req.method === "DELETE") {
    await prisma.workoutTemplate.delete({
      where: { id: parseID(req.body.id) },
    });
    return res.status(200).send("Success!");
  }

  res.status(200).json(
    await prisma.workoutTemplate.findMany({
      orderBy: {
        name: "asc",
      },
    })
  );
}
