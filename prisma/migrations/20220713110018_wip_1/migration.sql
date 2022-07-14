/*
  Warnings:

  - You are about to alter the column `path` on the `Page` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(128)`.
  - You are about to alter the column `title` on the `Page` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(128)`.
  - You are about to alter the column `name` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(128)`.

*/
-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'MODERATOR';

-- AlterTable
ALTER TABLE "Page" ALTER COLUMN "path" SET DATA TYPE VARCHAR(128),
ALTER COLUMN "title" SET DATA TYPE VARCHAR(128);

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "name" SET DATA TYPE VARCHAR(128);

-- CreateTable
CREATE TABLE "ServerSetting" (
    "id" TEXT NOT NULL,
    "serverName" VARCHAR(128),
    "ownerName" VARCHAR(128),
    "serverIconUrl" TEXT,
    "isUserOnly" BOOLEAN NOT NULL DEFAULT false,
    "canRegister" BOOLEAN NOT NULL DEFAULT false,
    "sidebarMenu" JSONB NOT NULL DEFAULT '[]',

    CONSTRAINT "ServerSetting_pkey" PRIMARY KEY ("id")
);
