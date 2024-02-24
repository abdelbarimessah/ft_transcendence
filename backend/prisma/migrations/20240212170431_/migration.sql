/*
  Warnings:

  - You are about to drop the column `fistTime` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "fistTime",
ADD COLUMN     "firstTime" BOOLEAN NOT NULL DEFAULT false;
