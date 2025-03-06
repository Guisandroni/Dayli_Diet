/*
  Warnings:

  - You are about to drop the column `created_At` on the `Diet` table. All the data in the column will be lost.
  - Added the required column `dateCreated` to the `Diet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hourCreated` to the `Diet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Diet" DROP COLUMN "created_At",
ADD COLUMN     "dateCreated" TEXT NOT NULL,
ADD COLUMN     "hourCreated" TEXT NOT NULL;
