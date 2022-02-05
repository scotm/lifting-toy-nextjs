// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from "next";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Find the categories
  const category = req.query?.category;
  console.log(category);
  // Construct the category object
  let whereobj: Prisma.ExerciseWhereInput = {};
  if (typeof category === "string") {
    whereobj = {
      exercise_base: {
        category: {
          name: category,
        },
      },
    };
  }

  const includeobj = {
    licence: true,
    language: true,
    exercise_base: {
      include: { category: true, muscles: true, equipment: true },
    },
  };

  res.status(200).json(
    await prisma.exercise.findMany({
      include: includeobj,
      where: whereobj,
      orderBy: {
        name: "asc",
      },
    })
  );
}
