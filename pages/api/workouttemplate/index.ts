// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import type { NextApiRequest, NextApiResponse } from "next";
import { Exercise } from "../../../entities/Exercise";
import { RepetitionUnits } from "../../../entities/RepetitionUnits";
import { RepPair } from "../../../entities/RepPair";
import { TemplateExercisePieces } from "../../../entities/TemplateExercisePieces";
import { User } from "../../../entities/User";
import { WorkoutTemplate } from "../../../entities/WorkoutTemplate";
import getEM from "../../../util/getEM";
import parseID from "../../../util/parseID";
import show_everything from "../../../util/show_everything";
import withORM from "../../../util/withORM";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const em = getEM();
  const session = getSession(req, res);
  if (!session) {
    return res.status(403).send("You need to be logged in first.");
  }

  // Create workout template
  if (req.method === "POST") {
    // Find the user from this session data
    let user: User;
    try {
      user = await em.findOneOrFail(User, {
        externalId: session.user.sub,
      });
    } catch {
      return res.status(500).send("There is no such user in the database");
    }
    let { name, pieces } = req.body;

    // Big, hairy workout template creator

    const data = {
      name: name,
      user: user,
      pieces:await pieces.map(async (e:any):Promise<Omit<TemplateExercisePieces,'id'>> => {
        const exercise = await em.findOneOrFail(Exercise, {id:parseID(e.exerciseId)})
        return {
          exercise: exercise,
          rep_pair: e.rep_pair.map(async (f:any):Promise<Omit<RepPair,'id'|'templateExercise'>> =>{
            const repunits = await em.findOneOrFail(RepetitionUnits, {id:parseID(f.rep)})
            return {
              reps:f.reps,
              repetitionUnits:repunits
            }
          })
        }
      }),
    };
    show_everything(data);
    return res.status(500).send("Not yet implemented");
    // const workouttemplate = await em.create(WorkoutTemplate, data);

    // return res.status(200).json({
    //   id: workouttemplate.id,
    //   message: `Successfully created ${workouttemplate.name}`,
    // });
  }

  if (req.method === "DELETE") {
    await em.nativeDelete(WorkoutTemplate, { id: parseID(req.body.id) });
    return res.status(200).send("Success!");
  }

  const result = await em.find(
    WorkoutTemplate,
    { user: { externalId: session.user.sub } },
    {
      populate: [
        "pieces.exercise",
        "pieces.rep_pair",
        "pieces.rep_pair.repetitionUnits",
      ],
      orderBy: { ["name"]: "ASC" },
    }
  );
  return res.status(200).json(result);
}

export default withORM(withApiAuthRequired(handler));
