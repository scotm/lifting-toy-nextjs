import { Equipment, Exercise, ExerciseBaseData, Muscles } from "@prisma/client";

export interface MyExerciseBaseData extends ExerciseBaseData {
  muscles?: Muscles[];
  equipment?: Equipment[];
}

export interface MyExercise extends Exercise {
  id: number;
  exercise_base?: MyExerciseBaseData;
}
