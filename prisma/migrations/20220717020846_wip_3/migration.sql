/*
  Warnings:

  - A unique constraint covering the columns `[accessToken]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_accessToken_key" ON "User"("accessToken");
