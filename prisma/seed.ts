import { PrismaClient } from "@prisma/client";
import { Prisma } from "@prisma/client";
import { NodeHtmlMarkdown } from "node-html-markdown";
import * as fs from "fs";

const prisma = new PrismaClient();

let pairings = {
  "licenses.json": prisma.licence,
  "categories.json": prisma.category,
  "days_of_week.json": prisma.dayOfWeek,
  "equipment.json": prisma.equipment,
  "languages.json": prisma.language,
  "muscles.json": prisma.muscles,
  "setting_repetition_units.json": prisma.repetitionUnits,
  "setting_weight_units.json": prisma.weightUnits,
};

function getJSONFromFile(filename: string): any {
  let rawdata = fs.readFileSync(__dirname + "/fixtures/" + filename);
  return JSON.parse(rawdata.toString());
}

function writeToDB(data: [], prisma_client: any) {
  data.forEach(async (element: any) => {
    await prisma_client.upsert({
      where: {
        id: element.id,
      },
      update: {},
      create: element,
    });
  });
}

async function main() {
  // fire in the simple stuff
  for (const [filename, prisma_client] of Object.entries(pairings)) {
    let json_data = getJSONFromFile(filename);
    writeToDB(json_data, prisma_client);
  }

  const exerciseBaseData = new Map();
  {
    let json_data = getJSONFromFile("exercise-base-data.json");
    json_data.forEach((e: any) => {
      exerciseBaseData.set(e.id, {
        id: e.id,
        license_author: e.license_author,
        status: e.status,
        uuid: e.uuid,
        licenceId: e.license,
        categoryId: e.category,
        muscles: [
          ...e.muscles.map((x: any) => {
            return { id: x };
          }),
          ...e.muscles_secondary.map((x: any) => {
            return { id: x };
          }),
        ],
        equipment: e.equipment.map((x: any) => {
          return { id: x };
        }),
      });
    });
  }

  {
    let json_data = getJSONFromFile("exercises.json");
    const nhm = new NodeHtmlMarkdown();
    const data = json_data.map(
      (element: any): Prisma.ExerciseCreateManyInput => {
        return {
          id: element.id,
          license_author: element.license_author,
          name: element.name,
          name_original: element.name_original,
          status: element.status,
          description: nhm.translate(element.description),
          creation_date: new Date(element.creation_date),
          uuid: element.uuid,
          licenceId: element.license,
          languageId: element.language,
          categoryId: exerciseBaseData.get(element.exercise_base).categoryId,
        };
      }
    );

    await prisma.exercise.createMany({ data: data }).catch((onrejected) => {
      console.log("Exception thrown on making many Exercise objects");
      console.log(onrejected);
    });

    await Promise.all(
      json_data.map(async (e: any) => {
        const updateobj: Prisma.ExerciseUpdateArgs = {
          where: {
            id: e.id,
          },
          data: {
            muscles: {
              connect: exerciseBaseData.get(e.exercise_base).muscles,
            },
            equipment: {
              connect: exerciseBaseData.get(e.exercise_base).equipment,
            },
          },
        };
        return prisma.exercise.update(updateobj).catch((e) => {
          throw e;
        });
      })
    );
  }

  // Get all the table names and reset their autocounters
  // https://github.com/prisma/prisma/discussions/5256
  type tablename_type = { table_name: string };

  const tablenames = (await prisma.$queryRaw`SELECT table_name FROM 
    information_schema.tables 
    WHERE table_schema='public' 
    AND table_type='BASE TABLE';`) as Array<tablename_type>;

  const tables = tablenames
    .map((e) => e.table_name)
    .filter((e) => e[0] !== "_");

  // I'm only using table names extracted from the DB itself -
  // so injection risk is low, but worth fixing once the Prisma single-quotes
  // bug is fixed upstream.
  tables.forEach(async (e) => {
    // I need to use the single quotes in order to run the pg_get_serial_sequence function,
    // And single quote usage is broken as of right now.
    // https://github.com/prisma/prisma/discussions/9991
    await prisma.$queryRawUnsafe(
      `SELECT setval(pg_get_serial_sequence('"${e}"', 'id'), 
      coalesce(max(id)+1, 1), false) FROM "${e}";`
    );
  });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
