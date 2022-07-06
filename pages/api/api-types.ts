import { NextApiRequest, NextApiResponse } from "next";
export type { ExerciseFromIDReturnType } from "./exercises/[id]";
export type { ExercisesReturnType } from "./exercises/index";
export type {
  WorkoutTemplateReturnType,
  TemplatePiecesReturnType,
} from "./workouttemplate/[id]";
export type { UserWorkoutTemplatesReturnType } from "./workouttemplate/index";

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  // Nope. This is just a type mini-barrel, not an API endpoint.
  return res.status(418).send("This has not been implemented");
}
