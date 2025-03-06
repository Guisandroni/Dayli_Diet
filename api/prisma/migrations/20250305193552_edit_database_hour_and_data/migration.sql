/*
  Warnings:

  - Changed the type of `dateCreated` on the `Diet` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `hourCreated` on the `Diet` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `inDiet` on the `Diet` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "DietStatus" AS ENUM ('SIM', 'NAO');

-- AlterTable
ALTER TABLE "Diet" DROP COLUMN "dateCreated",
ADD COLUMN     "dateCreated" TIMESTAMP(3) NOT NULL,
DROP COLUMN "hourCreated",
ADD COLUMN     "hourCreated" TIMESTAMP(3) NOT NULL,
DROP COLUMN "inDiet",
ADD COLUMN     "inDiet" "DietStatus" NOT NULL;

-- DropEnum
DROP TYPE "DIET";
