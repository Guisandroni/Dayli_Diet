/*
  Warnings:

  - You are about to drop the column `dateCreated` on the `Diet` table. All the data in the column will be lost.
  - You are about to drop the column `hourCreated` on the `Diet` table. All the data in the column will be lost.
  - Added the required column `created_At` to the `Diet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Diet" DROP COLUMN "dateCreated",
DROP COLUMN "hourCreated",
ADD COLUMN     "created_At" TIMESTAMP(3) NOT NULL;
