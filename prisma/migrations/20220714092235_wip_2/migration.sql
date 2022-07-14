/*
  Warnings:

  - The values [USER,ADMIN,MODERATOR] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `accessToken` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hashedPassword` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "IconType" AS ENUM ('none', 'unicodeEmoji', 'fontAwesome', 'imageUrl');

-- CreateEnum
CREATE TYPE "Permisson" AS ENUM ('everyone', 'moderator', 'admin');

-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('user', 'admin', 'moderator');
ALTER TABLE "User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'user';
COMMIT;

-- AlterTable
ALTER TABLE "Page" ADD COLUMN     "icon" TEXT,
ADD COLUMN     "iconType" "IconType" NOT NULL DEFAULT 'none',
ADD COLUMN     "writePermission" "Permisson" NOT NULL DEFAULT 'everyone';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "accessToken" TEXT NOT NULL,
ADD COLUMN     "hashedPassword" TEXT NOT NULL,
ALTER COLUMN "role" SET DEFAULT 'user';

-- CreateTable
CREATE TABLE "PageReaction" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pageId" TEXT NOT NULL,
    "emoji" TEXT NOT NULL,
    "userId" TEXT,

    CONSTRAINT "PageReaction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PageReaction" ADD CONSTRAINT "PageReaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PageReaction" ADD CONSTRAINT "PageReaction_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE CASCADE ON UPDATE CASCADE;
