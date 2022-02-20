import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../db";
import parseID from "../../../util/parseID";

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
        category: true,
        muscles: true,
        equipment: true,
      },
    });
    if (!result) {
      return res.status(404).send("Not Found");
    }

    return res.status(200).json(result);
  } else if (req.method === "PUT") {
    // TODO: Validation
    await prisma.exercise.update({
      where: { id: req.body.id },
      data: {
        name: req.body.name,
        category: {
          connect: { id: parseID(req.body.categoryId) },
        },
        description: req.body.description,
        licence: {
          connect: { id: parseID(req.body.licenceId) },
        },
        language: {
          connect: { id: parseID(req.body.languageId) },
        },
        license_author: req.body.license_author,
        muscles: {
          set: req.body.muscles.map((e: string) => {
            return { id: parseID(e) };
          }),
        },
        equipment: {
          set: req.body.equipment.map((e: string) => {
            return { id: parseID(e) };
          }),
        },
        variations: req.body.variations,
      },
    });
    return res
      .status(200)
      .send(`Exercise: ${req.body.name} (${req.body.id}) has been updated`);
  } else {
    console.log(`Received a ${req.method} request - can't handle this`);
    return res
      .status(501)
      .send("Only the GET and PUT methods have been implemented");
  }
}
