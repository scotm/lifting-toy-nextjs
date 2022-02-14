import {
  Equipment,
  Exercise,
  Muscles,
  WorkoutPiece,
  WorkoutTemplate,
} from "@prisma/client";

export interface MyExercise extends Exercise {
  id: number;
  muscles: Muscles[];
  equipment: Equipment[];
}

export interface MyWorkoutPiece
  extends Omit<WorkoutPiece, "id" | "workoutTemplateId" | "workoutId"> {}

export interface MyWorkoutTemplate extends Omit<WorkoutTemplate, "id"> {
  pieces: Array<WorkoutPiece>;
}
