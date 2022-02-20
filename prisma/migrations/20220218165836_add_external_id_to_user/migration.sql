/*
  Warnings:

  - A unique constraint covering the columns `[external_id]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "external_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_external_id_key" ON "User"("external_id");
