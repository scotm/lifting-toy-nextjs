// import {
//   Equipment,
//   Exercise,
//   Muscles,
//   WorkoutTemplate,
//   TemplateExercisePieces,
//   RepPair,
// } from "@prisma/client";

import { Equipment } from "../entities/Equipment";
import { Exercise } from "../entities/Exercise";
import { Muscles } from "../entities/Muscles";
import { RepPair } from "../entities/RepPair";
import { TemplateExercisePieces } from "../entities/TemplateExercisePieces";
import { WorkoutTemplate } from "../entities/WorkoutTemplate";

export interface MyExercise extends Omit<Exercise, 'muscles'|'equipment'> {
  id: number;
  muscles: Muscles[];
  equipment: Equipment[];
}

export interface MyTemplateExercisePieces
  extends Omit<
    TemplateExercisePieces,
    'id'|'rep_pair'
  > {
  rep_pair: Array<MyRepPair>;
}

export interface MyWorkoutTemplate
  extends Omit<WorkoutTemplate, "id" | "userId"|"pieces"> {
  pieces: Array<MyTemplateExercisePieces>;
}

export interface MyRepPair extends Omit<RepPair, "id" | "templateExerciseId"> {}
