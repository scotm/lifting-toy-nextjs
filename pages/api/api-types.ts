import { NextApiRequest, NextApiResponse } from "next";
export type { ExerciseFromIDReturnType } from "./exercises/[id]";
export type { ExercisesReturnType } from "./exercises/index";
export type { WorkoutTemplateReturnType } from "./workouttemplate/[id]";
export type { UserWorkoutTemplatesReturnType } from "./workouttemplate/index";

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  return res.status(501).send("This has not been implemented");
}
