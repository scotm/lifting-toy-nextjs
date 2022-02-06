/*
  Warnings:

  - Added the required column `auth_string` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "auth_string" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "CompletedWorkoutPiece" (
    "id" SERIAL NOT NULL,
    "completed_on" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "exerciseId" INTEGER NOT NULL,
    "repetitionUnitsId" INTEGER NOT NULL,
    "weightUnitsId" INTEGER NOT NULL,
    "workoutId" INTEGER NOT NULL,

    CONSTRAINT "CompletedWorkoutPiece_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkoutPiece" (
    "id" SERIAL NOT NULL,
    "exerciseId" INTEGER NOT NULL,
    "repetitionUnitsId" INTEGER NOT NULL,
    "weightUnitsId" INTEGER NOT NULL,
    "workoutTemplateId" INTEGER,
    "workoutId" INTEGER,

    CONSTRAINT "WorkoutPiece_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Workout" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Workout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkoutTemplate" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "WorkoutTemplate_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CompletedWorkoutPiece" ADD CONSTRAINT "CompletedWorkoutPiece_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompletedWorkoutPiece" ADD CONSTRAINT "CompletedWorkoutPiece_repetitionUnitsId_fkey" FOREIGN KEY ("repetitionUnitsId") REFERENCES "RepetitionUnits"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompletedWorkoutPiece" ADD CONSTRAINT "CompletedWorkoutPiece_weightUnitsId_fkey" FOREIGN KEY ("weightUnitsId") REFERENCES "WeightUnits"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompletedWorkoutPiece" ADD CONSTRAINT "CompletedWorkoutPiece_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutPiece" ADD CONSTRAINT "WorkoutPiece_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutPiece" ADD CONSTRAINT "WorkoutPiece_repetitionUnitsId_fkey" FOREIGN KEY ("repetitionUnitsId") REFERENCES "RepetitionUnits"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutPiece" ADD CONSTRAINT "WorkoutPiece_weightUnitsId_fkey" FOREIGN KEY ("weightUnitsId") REFERENCES "WeightUnits"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutPiece" ADD CONSTRAINT "WorkoutPiece_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutPiece" ADD CONSTRAINT "WorkoutPiece_workoutTemplateId_fkey" FOREIGN KEY ("workoutTemplateId") REFERENCES "WorkoutTemplate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Workout" ADD CONSTRAINT "Workout_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutTemplate" ADD CONSTRAINT "WorkoutTemplate_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
