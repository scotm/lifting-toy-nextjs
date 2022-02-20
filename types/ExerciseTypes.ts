import {
  Equipment,
  Exercise,
  Muscles,
  WorkoutTemplate,
  TemplateExercisePieces,
  RepPair,
} from "@prisma/client";

export interface MyExercise extends Exercise {
  id: number;
  muscles: Muscles[];
  equipment: Equipment[];
}

export interface MyTemplateExercisePieces
  extends Omit<
    TemplateExercisePieces,
    "id" | "workoutTemplateId" | "workoutId"
  > {
  rep_pair: Array<MyRepPair>;
}

export interface MyWorkoutTemplate
  extends Omit<WorkoutTemplate, "id" | "userId"> {
  pieces: Array<MyTemplateExercisePieces>;
}

export interface MyRepPair extends Omit<RepPair, "id" | "templateExerciseId"> {}
