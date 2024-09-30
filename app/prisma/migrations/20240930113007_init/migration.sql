/*
  Warnings:

  - You are about to drop the column `slug` on the `Movie` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Movie_slug_key";

-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "slug";
