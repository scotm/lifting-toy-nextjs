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
        id: parseID(req.query.id),
      },
      // Pull in related data
      include: {
        licence: true,
        exercise_base: {
          include: { category: true, muscles: true, equipment: true },
        },
      },
    });
    if (!result) {
      return res.status(404).send("Not Found");
    }
    return res.status(200).json(result);
  } else if (req.method === "PUT") {
    // Debugging
    console.log(req.query);
  } else {
    return res
      .status(501)
      .send("Only the GET and PUT methods have been implemented");
  }
}
