-- CreateEnum
CREATE TYPE "ConnectionType" AS ENUM ('Discord');

-- CreateTable
CREATE TABLE "Connection" (
    "userId" INTEGER NOT NULL,
    "type" "ConnectionType" NOT NULL,
    "clientId" TEXT NOT NULL,
    "accessToken" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "userId" SERIAL NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Connection_clientId_key" ON "Connection"("clientId");

-- CreateIndex
CREATE UNIQUE INDEX "Connection_userId_type_key" ON "Connection"("userId", "type");

-- AddForeignKey
ALTER TABLE "Connection" ADD CONSTRAINT "Connection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
