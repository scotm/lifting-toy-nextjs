// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from "next";
import { Category, PrismaClient } from "@prisma/client";
import parseIDfrombody from "../../../util/parseIDfrombody";

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

  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  // Find "All" and put it at the top.
  const key = (e: Category) => e.name === "All";
  const piece = categories.find(key);
  if (piece !== undefined) {
    const index = categories.findIndex(key);

    categories.splice(index, 1);
    categories.unshift(piece);
  }
  return res.status(200).json(categories);
}
