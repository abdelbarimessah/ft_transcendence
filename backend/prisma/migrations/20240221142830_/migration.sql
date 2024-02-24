-- CreateEnum
CREATE TYPE "GameStatus" AS ENUM ('WIN', 'LOSE');

-- CreateTable
CREATE TABLE "Game" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "opponentId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "userScore" INTEGER NOT NULL,
    "opponentScore" INTEGER NOT NULL,
    "status" "GameStatus" NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
