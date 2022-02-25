// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from "next";
import { FormExercise } from "../../../components/Forms/ExerciseEditForm";
import { v4 as uuidv4, v4 } from "uuid";
import parseID from "../../../util/parseID";
import withORM from "../../../util/withORM";
import getEM from "../../../util/getEM";
import { Exercise } from "../../../entities/Exercise";
import { Collection, FilterQuery, RequiredEntityData } from "@mikro-orm/core";
import { Equipment } from "../../../entities/Equipment";
import { Muscles } from "../../../entities/Muscles";
import show_everything from "../../../util/show_everything";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const em = getEM();
  if (req.method === "POST") {
    const exercise = req.body;
    console.log(exercise);
    const data: RequiredEntityData<Exercise> = {
      name: exercise.name,
      licenseAuthor: exercise.license_author,
      description: exercise.description,
      creationDate: new Date(),
      language: parseID(exercise.languageId),
      category: parseID(exercise.categoryId),
      licence: parseID(exercise.licenceId),
      equipment: await Promise.all(
        exercise.equipment.map((e: any) => em.find(Equipment, { id: e }))
      ),
      muscles: await Promise.all(
        exercise.muscles.map((e: any) => em.find(Muscles, { id: e }))
      ),
      uuid: uuidv4(),
    };
    await em.persistAndFlush(em.create(Exercise, data));
    return res.status(500).send("not implemented yet");
    // return res.status(200).json({ id: result.id, message: "ok" });
  }
  console.log(req.query);
  // Find the categories
  const category = req.query?.category;

  // Pull out the search, and de-fang the type guard
  const search = Array.isArray(req.query.search)
    ? req.query.search[0]
    : req.query.search;

  // Construct the where object - using the category as filter
  const whereobj: FilterQuery<Exercise> = { $and: [] };
  if (typeof category === "string" && category != "All") {
    whereobj.$and?.push({ category: { name: category } });
  }

  // Is it a string, and does it have anything in it
  if (typeof search === "string" && !!search) {
    whereobj.$and?.push({
      $or: [
        // Case-insensitive search - look inside equipment too
        { name: { $ilike: `%${search}%` } },
        { equipment: { name: { $ilike: `%${search}%` } } },
      ],
    });
  }

  // Pull in related data
  res.status(200).json(
    await em.find(Exercise, whereobj, {
      populate: ["muscles", "category", "licence", "equipment"],
      orderBy: { ["name"]: "ASC" },
    })
  );
}

export default withORM(handler);
