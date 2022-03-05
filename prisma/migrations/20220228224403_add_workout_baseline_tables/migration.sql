-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('TOOEASY', 'EASY', 'CHALLENGING', 'HARD', 'CANTCOMPLETE');

-- CreateTable
CREATE TABLE "WorkoutSetPieces" (
    "id" SERIAL NOT NULL,
    "weightUnitsId" INTEGER NOT NULL,
    "weight" DECIMAL(65,30) NOT NULL,
    "repetitionUnitsId" INTEGER NOT NULL,
    "reps" INTEGER NOT NULL,
    "workoutExercisePiecesId" INTEGER,

    CONSTRAINT "WorkoutSetPieces_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkoutExercisePieces" (
    "id" SERIAL NOT NULL,
    "exerciseId" INTEGER NOT NULL,
    "workoutId" INTEGER,
    "notes" TEXT NOT NULL DEFAULT E'',

    CONSTRAINT "WorkoutExercisePieces_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Workout" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "workoutNotes" TEXT NOT NULL,
    "difficulty" "Difficulty" NOT NULL DEFAULT E'CHALLENGING',

    CONSTRAINT "Workout_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WorkoutSetPieces" ADD CONSTRAINT "WorkoutSetPieces_repetitionUnitsId_fkey" FOREIGN KEY ("repetitionUnitsId") REFERENCES "RepetitionUnits"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutSetPieces" ADD CONSTRAINT "WorkoutSetPieces_weightUnitsId_fkey" FOREIGN KEY ("weightUnitsId") REFERENCES "WeightUnits"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutSetPieces" ADD CONSTRAINT "WorkoutSetPieces_workoutExercisePiecesId_fkey" FOREIGN KEY ("workoutExercisePiecesId") REFERENCES "WorkoutExercisePieces"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutExercisePieces" ADD CONSTRAINT "WorkoutExercisePieces_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutExercisePieces" ADD CONSTRAINT "WorkoutExercisePieces_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Workout" ADD CONSTRAINT "Workout_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
