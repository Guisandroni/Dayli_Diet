-- CreateEnum
CREATE TYPE "DIET" AS ENUM ('SIM', 'NAO');

-- CreateTable
CREATE TABLE "Diet" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "dateCreated" TEXT NOT NULL,
    "hourCreated" TEXT NOT NULL,
    "inDiet" "DIET" NOT NULL,

    CONSTRAINT "Diet_pkey" PRIMARY KEY ("id")
);
