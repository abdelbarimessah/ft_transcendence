/*
  Warnings:

  - Added the required column `userIds` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "userIds" TEXT NOT NULL,
ALTER COLUMN "opponentId" SET DATA TYPE TEXT;
