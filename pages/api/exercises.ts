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
  const muscles = req.query?.muscles;
  // Construct the where object - using the category as filter
  const whereobj: Prisma.ExerciseWhereInput =
    typeof category === "string" && category !== "All"
      ? {
          exercise_base: {
            category: {
              name: category,
            },
            // muscles:{
            //   some:{
            //     [{name:''}]
            //   }
            // }
          },
        }
      : {};

  const includeobj = {
    licence: true,
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
