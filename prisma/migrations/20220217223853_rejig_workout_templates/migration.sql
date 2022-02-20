/*
  Warnings:

  - You are about to drop the `CompletedWorkoutPiece` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Workout` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WorkoutPiece` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `passwordhash` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `salt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CompletedWorkoutPiece" DROP CONSTRAINT "CompletedWorkoutPiece_exerciseId_fkey";

-- DropForeignKey
ALTER TABLE "CompletedWorkoutPiece" DROP CONSTRAINT "CompletedWorkoutPiece_repetitionUnitsId_fkey";

-- DropForeignKey
ALTER TABLE "CompletedWorkoutPiece" DROP CONSTRAINT "CompletedWorkoutPiece_weightUnitsId_fkey";

-- DropForeignKey
ALTER TABLE "CompletedWorkoutPiece" DROP CONSTRAINT "CompletedWorkoutPiece_workoutId_fkey";

-- DropForeignKey
ALTER TABLE "Workout" DROP CONSTRAINT "Workout_userId_fkey";

-- DropForeignKey
ALTER TABLE "WorkoutPiece" DROP CONSTRAINT "WorkoutPiece_exerciseId_fkey";

-- DropForeignKey
ALTER TABLE "WorkoutPiece" DROP CONSTRAINT "WorkoutPiece_repetitionUnitsId_fkey";

-- DropForeignKey
ALTER TABLE "WorkoutPiece" DROP CONSTRAINT "WorkoutPiece_weightUnitsId_fkey";

-- DropForeignKey
ALTER TABLE "WorkoutPiece" DROP CONSTRAINT "WorkoutPiece_workoutId_fkey";

-- DropForeignKey
ALTER TABLE "WorkoutPiece" DROP CONSTRAINT "WorkoutPiece_workoutTemplateId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "passwordhash" TEXT NOT NULL,
ADD COLUMN     "salt" TEXT NOT NULL;

-- DropTable
DROP TABLE "CompletedWorkoutPiece";

-- DropTable
DROP TABLE "Workout";

-- DropTable
DROP TABLE "WorkoutPiece";

-- CreateTable
CREATE TABLE "RepPair" (
    "id" SERIAL NOT NULL,
    "reps" INTEGER NOT NULL,
    "repetitionUnitsId" INTEGER NOT NULL,
    "templateExerciseId" INTEGER NOT NULL,

    CONSTRAINT "RepPair_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TemplateExercisePieces" (
    "id" SERIAL NOT NULL,
    "exerciseId" INTEGER NOT NULL,
    "workoutTemplateId" INTEGER,

    CONSTRAINT "TemplateExercisePieces_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RepPair" ADD CONSTRAINT "RepPair_repetitionUnitsId_fkey" FOREIGN KEY ("repetitionUnitsId") REFERENCES "RepetitionUnits"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RepPair" ADD CONSTRAINT "RepPair_templateExerciseId_fkey" FOREIGN KEY ("templateExerciseId") REFERENCES "TemplateExercisePieces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TemplateExercisePieces" ADD CONSTRAINT "TemplateExercisePieces_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TemplateExercisePieces" ADD CONSTRAINT "TemplateExercisePieces_workoutTemplateId_fkey" FOREIGN KEY ("workoutTemplateId") REFERENCES "WorkoutTemplate"("id") ON DELETE SET NULL ON UPDATE CASCADE;
