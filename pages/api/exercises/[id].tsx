import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import parseID from "../../../util/parseID";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const result = await prisma.exercise.findUnique({
      where: {
        id: parseID(req),
      },
    });
    if (!result) {
      return res.status(404).send("Not Found");
    }
    return res.status(200).json(result);
  } else {
    return res.status(501).send("Only the GET Method has been implemented");
  }
}
