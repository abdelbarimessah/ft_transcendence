-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "providerId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "nickName" TEXT,
    "firstName" TEXT,
    "lastName" TEXT,
    "provider" TEXT,
    "avatar" TEXT,
    "secretOpt" TEXT,
    "otpIsEnabled" BOOLEAN NOT NULL DEFAULT false,
    "level" INTEGER NOT NULL DEFAULT 0,
    "cover" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_providerId_key" ON "User"("providerId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_nickName_key" ON "User"("nickName");
