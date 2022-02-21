// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { Prisma } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { FormExercise } from "../../../components/Forms/ExerciseEditForm";
import prisma from "../../../db";
import { v4 as uuidv4 } from "uuid";
import parseID from "../../../util/parseID";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const exercise = req.body as FormExercise;
    const result = await prisma.exercise.create({
      data: {
        name: exercise.name,
        category: {
          connect: {
            id: exercise.categoryId,
          },
        },
        description: exercise.description,
        uuid: uuidv4(),
        licence: {
          connect: {
            id: exercise.licenceId,
          },
        },
        language: {
          connect: {
            id: exercise.languageId,
          },
        },
        license_author: exercise.license_author,
        muscles: {
          connect: exercise.muscles.map((e) => {
            return { id: parseID(e) };
          }),
        },
        equipment: {
          connect: exercise.equipment.map((e) => {
            return { id: parseID(e) };
          }),
        },
      },
    });
    return res.status(200).json({ id: result.id, message: "ok" });
  }
  // Find the categories
  const category = req.query?.category;

  // Pull out the search, and de-fang the type guard
  const search = Array.isArray(req.query.search)
    ? req.query.search[0]
    : req.query.search;

  // Construct the where object - using the category as filter
  const whereobj: Prisma.ExerciseWhereInput = {};
  if (typeof category === "string" && category !== "All") {
    whereobj.category = {
      name: category,
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
        equipment: {
          some: {
            name: {
              contains: search,
              mode: "insensitive",
            },
          },
        },
      },
    ];
  }

  // Pull in related data
  const includeobj = {
    licence: true,
    category: true,
    muscles: true,
    equipment: true,
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
