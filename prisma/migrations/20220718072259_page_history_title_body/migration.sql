/*
  Warnings:

  - Added the required column `body` to the `PageHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `PageHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PageHistory" ADD COLUMN     "body" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;
