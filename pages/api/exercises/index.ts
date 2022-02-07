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

  // Pull out the search, and de-fang the type guard
  const search = Array.isArray(req.query.search)
    ? req.query.search[0]
    : req.query.search;

  // Construct the where object - using the category as filter
  const whereobj: Prisma.ExerciseWhereInput = {};
  let category_chosen = false;
  if (typeof category === "string" && category !== "All") {
    category_chosen = true;
    whereobj.exercise_base = {
      category: {
        name: category,
      },
    };
  }

  // Case-insensitive search - look inside equipment and muscles
  if (search !== undefined) {
    whereobj.OR = [
      {
        name: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        exercise_base: {
          equipment: {
            some: {
              name: {
                contains: search,
                mode: "insensitive",
              },
            },
          },
        },
      },
    ];
  }

  // Pull in related data
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
