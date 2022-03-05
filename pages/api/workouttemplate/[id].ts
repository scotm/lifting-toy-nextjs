import { Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import parseID from "../../../util/parseID";

export type WorkoutTemplateReturnType = Prisma.PromiseReturnType<
  typeof getWorkoutTemplate
>;

async function getWorkoutTemplate(id: number) {
  const result = await prisma.workoutTemplate.findUnique({
    where: { id: id },
    include: {
      pieces: {
        include: {
          exercise: true,
          rep_pair: {
            include: {
              reptype: true,
            },
          },
        },
      },
    },
  });
  if (!result) {
    throw new Error("We can't find that WorkoutTemplate");
  }
  return result;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let result;
  try {
    result = await getWorkoutTemplate(parseID(req.query.id));
  } catch {
    return res.status(404).send("Workout Template not found");
  }
  return res.status(200).json(result);
}
