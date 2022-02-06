/*
  Warnings:

  - You are about to drop the column `exerciseBaseDataId` on the `Equipment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Equipment" DROP CONSTRAINT "Equipment_exerciseBaseDataId_fkey";

-- AlterTable
ALTER TABLE "Equipment" DROP COLUMN "exerciseBaseDataId";

-- CreateTable
CREATE TABLE "_EquipmentToExerciseBaseData" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_EquipmentToExerciseBaseData_AB_unique" ON "_EquipmentToExerciseBaseData"("A", "B");

-- CreateIndex
CREATE INDEX "_EquipmentToExerciseBaseData_B_index" ON "_EquipmentToExerciseBaseData"("B");

-- AddForeignKey
ALTER TABLE "_EquipmentToExerciseBaseData" ADD FOREIGN KEY ("A") REFERENCES "Equipment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EquipmentToExerciseBaseData" ADD FOREIGN KEY ("B") REFERENCES "ExerciseBaseData"("id") ON DELETE CASCADE ON UPDATE CASCADE;
