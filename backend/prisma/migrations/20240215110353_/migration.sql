-- CreateTable
CREATE TABLE "Achievement" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "locked" BOOLEAN NOT NULL DEFAULT true,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Achievement_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Achievement" ADD CONSTRAINT "Achievement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
