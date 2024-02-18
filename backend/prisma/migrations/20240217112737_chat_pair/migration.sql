/*
  Warnings:

  - A unique constraint covering the columns `[chatPairHash]` on the table `Chat` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Chat" ADD COLUMN     "chatPairHash" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Chat_chatPairHash_key" ON "Chat"("chatPairHash");
