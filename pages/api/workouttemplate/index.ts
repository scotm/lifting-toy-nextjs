// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../db";
import {
  MyTemplateExercisePieces,
  MyWorkoutTemplate,
} from "../../../types/ExerciseTypes";
import parseID from "../../../util/parseID";

export default withApiAuthRequired(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Create workout template
  if (req.method === "POST") {
    const session = getSession(req, res);
    if (!session) {
      return res.status(500).send("Not logged in, cannot accept user data");
    }

    // Find the user from this session data
    const user = await prisma.user.findUnique({
      where: {
        external_id: session.user.sub,
      },
    });
    if (!user) {
      return res.status(500).send("There is no such user in the database");
    }

    const body = req.body as MyWorkoutTemplate;
    const { name, pieces } = body;

    // Big, hairy workout template creator
    const workouttemplate = await prisma.workoutTemplate.create({
      data: {
        name: name,
        userId: user.id,
        pieces: {
          create: pieces.map((e: MyTemplateExercisePieces) => {
            return {
              exerciseId: parseID(e.exerciseId),
              rep_pair: {
                create: e.rep_pair,
              },
            };
          }),
        },
      },
    });

    return res.status(200).json({
      id: workouttemplate.id,
      message: `Successfully created ${workouttemplate.name}`,
    });
  }

  if (req.method === "DELETE") {
    await prisma.workoutTemplate.delete({
      where: { id: parseID(req.body.id) },
    });
    return res.status(200).send("Success!");
  }

  const session = getSession(req, res);
  if (!session) {
    return res.status(200).json([]);
  }

  return res.status(200).json(
    await prisma.workoutTemplate.findMany({
      where: {
        user: {
          external_id: session.user.sub,
        },
      },
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
      orderBy: {
        name: "asc",
      },
    })
  );
});
