/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Entry` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `type` on the `Entry` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Entry" ALTER COLUMN "title" DROP NOT NULL,
DROP COLUMN "type",
ADD COLUMN     "type" TEXT NOT NULL;

-- DropEnum
DROP TYPE "EntryType";

-- CreateIndex
CREATE UNIQUE INDEX "Entry_title_key" ON "Entry"("title");
