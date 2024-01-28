-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "privderId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "nickName" TEXT,
    "firstName" TEXT,
    "lastName" TEXT,
    "provider" TEXT,
    "avatar" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_privderId_key" ON "User"("privderId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
