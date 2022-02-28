// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { Prisma } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { FormExercise } from "../../../components/Forms/ExerciseEditForm";
import prisma from "../../../db";
import { v4 as uuidv4 } from "uuid";
import parseID from "../../../util/parseID";

export type ExercisesReturnType = Prisma.PromiseReturnType<typeof getExercises>;

async function getExercises(category: string, search: string) {
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
  const result = await prisma.exercise.findMany({
    include: includeobj,
    where: whereobj,
    orderBy: {
      name: "asc",
    },
  });
  return result;
}

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
            id: parseID(exercise.categoryId),
          },
        },
        description: exercise.description,
        uuid: uuidv4(),
        licence: {
          connect: {
            id: parseID(exercise.licenceId),
          },
        },
        language: {
          connect: {
            id: parseID(exercise.languageId),
          },
        },
        license_author: exercise.license_author,
      },
    });

    const updateobj: Prisma.ExerciseUpdateArgs = {
      where: {
        id: result.id,
      },
      data: {
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
    };
    await prisma.exercise.update(updateobj);

    return res.status(200).json({ id: result.id, message: "ok" });
  }

  function string_or_first(n: string | string[]): string {
    return Array.isArray(n) ? n[0] : n;
  }

  // Find the categories
  const category = string_or_first(req.query.category);

  // Pull out the search, and de-fang the type guard
  const search = string_or_first(req.query.search);

  const result = getExercises(category, search);
  res.status(200).json(result);
}
