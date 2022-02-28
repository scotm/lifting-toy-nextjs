import {
  Exercise,
  RepetitionUnits,
  RepPair,
  TemplateExercisePieces,
  WorkoutTemplate,
} from "@prisma/client";

export type RepPairReturnType = (RepPair & {
  reptype: RepetitionUnits;
})[];

export type WorkoutTemplateSingle = WorkoutTemplate & {
  pieces: (TemplateExercisePieces & {
    exercise: Exercise;
    rep_pair: RepPairReturnType;
  })[];
};

export type WorkoutTemplateReturnType = WorkoutTemplateSingle[];
