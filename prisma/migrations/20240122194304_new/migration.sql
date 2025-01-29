/*
  Warnings:

  - You are about to drop the column `descroption` on the `Discussion` table. All the data in the column will be lost.
  - Added the required column `description` to the `Discussion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Discussion" DROP COLUMN "descroption",
ADD COLUMN     "description" TEXT NOT NULL;
