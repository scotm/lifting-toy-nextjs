import { PrismaClient } from "@prisma/client";
import { Prisma } from "@prisma/client";
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

  let exercisebaseids: number[];
  {
    let json_data = getJSONFromFile("exercise-base-data.json");
    exercisebaseids = json_data.map((e: any) => e.id);
    let data = json_data.map(
      (element: any): Prisma.ExerciseBaseDataCreateManyInput => {
        return {
          id: element.id,
          license_author: element.license_author,
          status: element.status,
          uuid: element.uuid,
          licenceId: element.license,
          categoryId: element.category,
        };
      }
    );
    await prisma.exerciseBaseData
      .createMany({ data: data })
      .catch((onrejected) => {
        console.log("Exception thrown on making many ExerciseBaseData objects");
        console.log(onrejected);
      });

    json_data.forEach(async (e: any) => {
      let m = [
        ...e.muscles.map((x: any) => {
          return { id: x };
        }),
        ...e.muscles_secondary.map((x: any) => {
          return { id: x };
        }),
      ];
      let equip = e.equipment.map((x: any) => {
        return { id: x };
      });
      const updateobj: Prisma.ExerciseBaseDataUpdateArgs = {
        where: {
          id: e.id,
        },
        data: {
          muscles: {
            connect: m,
          },
          equipment: {
            connect: equip,
          },
        },
      };
      try {
        await prisma.exerciseBaseData.update(updateobj);
      } catch {}
    });
  }

  {
    let json_data = getJSONFromFile("exercises.json");
    let data = json_data.filter((e: any) => {
      return exercisebaseids.includes(e.exercise_base);
    });

    data = data.map((element: any): Prisma.ExerciseCreateManyInput => {
      return {
        id: element.id,
        licenceId: element.license,
        license_author: element.license_author,
        name: element.name,
        name_original: element.name_original,
        status: element.status,
        description: element.description,
        creation_date: new Date(element.creation_date),
        uuid: element.uuid,
        languageId: element.language,
        exerciseBaseDataId: element.exercise_base,
      };
    });
    prisma.exercise.createMany({ data: data }).catch((onrejected) => {
      console.log("Exception thrown on making many Exercise objects");
      console.log(onrejected);
    });
  }
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
