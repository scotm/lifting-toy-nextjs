/*
  Warnings:

  - You are about to drop the column `exerciseBaseDataId` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the `ExerciseBaseData` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_EquipmentToExerciseBaseData` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ExerciseBaseDataToMuscles` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `categoryId` to the `Exercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `joining_date` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Exercise" DROP CONSTRAINT "Exercise_exerciseBaseDataId_fkey";

-- DropForeignKey
ALTER TABLE "ExerciseBaseData" DROP CONSTRAINT "ExerciseBaseData_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "ExerciseBaseData" DROP CONSTRAINT "ExerciseBaseData_licenceId_fkey";

-- DropForeignKey
ALTER TABLE "_EquipmentToExerciseBaseData" DROP CONSTRAINT "_EquipmentToExerciseBaseData_A_fkey";

-- DropForeignKey
ALTER TABLE "_EquipmentToExerciseBaseData" DROP CONSTRAINT "_EquipmentToExerciseBaseData_B_fkey";

-- DropForeignKey
ALTER TABLE "_ExerciseBaseDataToMuscles" DROP CONSTRAINT "_ExerciseBaseDataToMuscles_A_fkey";

-- DropForeignKey
ALTER TABLE "_ExerciseBaseDataToMuscles" DROP CONSTRAINT "_ExerciseBaseDataToMuscles_B_fkey";

-- AlterTable
ALTER TABLE "Exercise" DROP COLUMN "exerciseBaseDataId",
ADD COLUMN     "categoryId" INTEGER NOT NULL,
ADD COLUMN     "variations" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "joining_date" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "ExerciseBaseData";

-- DropTable
DROP TABLE "_EquipmentToExerciseBaseData";

-- DropTable
DROP TABLE "_ExerciseBaseDataToMuscles";

-- CreateTable
CREATE TABLE "_EquipmentToExercise" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ExerciseToMuscles" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_EquipmentToExercise_AB_unique" ON "_EquipmentToExercise"("A", "B");

-- CreateIndex
CREATE INDEX "_EquipmentToExercise_B_index" ON "_EquipmentToExercise"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ExerciseToMuscles_AB_unique" ON "_ExerciseToMuscles"("A", "B");

-- CreateIndex
CREATE INDEX "_ExerciseToMuscles_B_index" ON "_ExerciseToMuscles"("B");

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EquipmentToExercise" ADD FOREIGN KEY ("A") REFERENCES "Equipment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EquipmentToExercise" ADD FOREIGN KEY ("B") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseToMuscles" ADD FOREIGN KEY ("A") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseToMuscles" ADD FOREIGN KEY ("B") REFERENCES "Muscles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
